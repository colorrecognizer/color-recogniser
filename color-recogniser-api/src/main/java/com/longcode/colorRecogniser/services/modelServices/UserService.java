package com.longcode.colorRecogniser.services.modelServices;

import com.longcode.colorRecogniser.config.ApiException;
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
    // Methods

    public AuthenticationResponse register(RegisterRequest registerRequest) {
        User user = null;
        try {
            user = findByEmail(registerRequest.getEmail());
        } catch (Exception ignored) {
        }

        if (user != null) {
            throw new ApiException("Email [%s] has been used!".formatted(registerRequest.getEmail()));
        }

        try {
            user = findByUsername(registerRequest.getUsername());
        } catch (Exception ignored) {
        }

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

    private User findByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ApiException("Cannot find user with username [%s]!".formatted(username)));
    }

    private User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ApiException("Cannot find user with email [%s]!".formatted(email)));
    }

    @Transactional
    public AuthenticationResponse login(LoginRequest loginRequest) {
        var user = findByUsernameOrEmail(loginRequest.getUsernameOrEmail());

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            user.getEmail(),
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

    private User findByUsernameOrEmail(String usernameOrEmail) {
        return userRepository.findByUsernameOrEmail(usernameOrEmail)
                .orElseThrow(() -> new ApiException("Cannot find user with username or email [%s]!".formatted(usernameOrEmail)));
    }

    public User findCurrentUser() {
        return null;
    }
}
