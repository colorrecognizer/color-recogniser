package com.longcode.colorRecogniser.services.modelServices;

import com.longcode.colorRecogniser.config.ApiException;
import com.longcode.colorRecogniser.config.AuthenticationFacade;
import com.longcode.colorRecogniser.models.Token;
import com.longcode.colorRecogniser.models.User;
import com.longcode.colorRecogniser.models.enums.UserRole;
import com.longcode.colorRecogniser.models.requests.LoginRequest;
import com.longcode.colorRecogniser.models.requests.RegisterRequest;
import com.longcode.colorRecogniser.models.responses.AuthenticationResponse;
import com.longcode.colorRecogniser.repositories.BaseModelRepository;
import com.longcode.colorRecogniser.repositories.UserRepository;
import com.longcode.colorRecogniser.services.JwtService;
import jakarta.transaction.Transactional;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Getter
public class UserService extends BaseModelService<User> {
    private UserRepository userRepository;

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserService(BaseModelRepository<User> baseModelRepository) {
        super(baseModelRepository);
    }

    private PasswordEncoder passwordEncoder;

    @Autowired
    public void setPasswordEncoder(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    private JwtService jwtService;

    @Autowired
    public void setJwtService(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    private TokenService tokenService;

    @Autowired
    public void setTokenService(TokenService tokenService) {
        this.tokenService = tokenService;
    }

    private AuthenticationManager authenticationManager;

    @Autowired
    public void setAuthenticationManager(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    private AuthenticationFacade authenticationFacade;

    @Autowired
    public void setAuthenticationFacade(AuthenticationFacade authenticationFacade) {
        this.authenticationFacade = authenticationFacade;
    }
    // Methods

    public AuthenticationResponse register(RegisterRequest registerRequest) {
        User user = getByEmail(registerRequest.getEmail());
        if (user != null) {
            throw new ApiException("Email [%s] has been used!".formatted(registerRequest.getEmail()));
        }

        user = getByUsername(registerRequest.getUsername());
        if (user != null) {
            throw new ApiException("Username [%s] has been used!".formatted(registerRequest.getUsername()));
        }

        user = User.builder()
                .email(registerRequest.getEmail())
                .username(registerRequest.getUsername())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .roles(List.of(UserRole.USER))
                .build();

        insert(user);
        var jwtToken = jwtService.generateToken(user);

        // Save jwt token
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .build();

        tokenService.insert(token);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    private User getByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }

    private User getByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    @Transactional
    public AuthenticationResponse login(LoginRequest loginRequest) {
        var user = getByUsernameOrEmail(loginRequest.getUsernameOrEmail());

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            user.getUsername(),
                            loginRequest.getPassword()
                    )
            );
        } catch (Exception e) {
            throw new ApiException("Invalid username, email or password!");
        }

        var jwtToken = jwtService.generateToken(user);
        revokeAllUserTokens(user);

        tokenService.insert(Token.builder()
                .token(jwtToken)
                .user(user)
                .build());

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    @Transactional
    private void revokeAllUserTokens(User user) {
        var validUserTokens = tokenService.findAllValidTokensByUserId(user.getId());
        if (validUserTokens.isEmpty())
            return;

        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
            tokenService.update(token);
        });
    }

    private User getByUsernameOrEmail(String usernameOrEmail) {
        User user = userRepository.findByUsername(usernameOrEmail).orElse(null);
        if (user == null) {
            user = userRepository.findByEmail(usernameOrEmail).orElse(null);
        }

        if (user == null)
            throw new ApiException("Cannot find user with email [%s]!".formatted(usernameOrEmail));

        return user;
    }

    public User getCurrentUser() {
        Authentication authentication = authenticationFacade.getAuthentication();
        if (authentication == null)
            return null;

        String username = authentication.getName();
        if (!authentication.isAuthenticated() || username == null)
            return null;

        return getByUsername(username);
    }
}
