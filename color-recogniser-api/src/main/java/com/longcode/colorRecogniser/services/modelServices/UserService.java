package com.longcode.colorRecogniser.services.modelServices;

import com.longcode.colorRecogniser.models.Token;
import com.longcode.colorRecogniser.models.User;
import com.longcode.colorRecogniser.models.enums.UserRole;
import com.longcode.colorRecogniser.models.requests.LoginRequest;
import com.longcode.colorRecogniser.models.requests.RegisterRequest;
import com.longcode.colorRecogniser.models.responses.AuthenticationResponse;
import com.longcode.colorRecogniser.repositories.BaseModelRepository;
import com.longcode.colorRecogniser.repositories.UserRepository;
import com.longcode.colorRecogniser.services.JwtService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

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

    // Methods
    @Transactional
    public AuthenticationResponse register(RegisterRequest registerRequest) {
        try {
            findByEmail(registerRequest.getEmail());
        } catch (Exception ignored) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Email [%s] has been used!".formatted(registerRequest.getEmail()));
        }

        try {
            findByUsername(registerRequest.getEmail());
        } catch (Exception ignored) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Email [%s] has been used!".formatted(registerRequest.getEmail()));
        }

        User user = User.builder()
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
        return userRepository.findByUsername(username).orElseThrow();
    }

    private User findByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow();
    }

    public AuthenticationResponse login(LoginRequest loginRequest) {
        return null;
    }

    public User findCurrentUser() {
        return null;
    }
}
