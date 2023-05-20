package com.longcode.colorRecogniser.services.modelServices;

import com.longcode.colorRecogniser.models.Token;
import com.longcode.colorRecogniser.repositories.BaseModelRepository;
import com.longcode.colorRecogniser.repositories.TokenRepository;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Getter
public class TokenService extends BaseModelService<Token> {
    private TokenRepository tokenRepository;

    @Autowired
    public void setTokenRepository(TokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    public TokenService(BaseModelRepository<Token> baseModelRepository) {
        super(baseModelRepository);
    }

    public List<Token> findAllValidTokensByUserId(Long userId) {
        return tokenRepository.findAllValidTokensByUserId(userId);
    }

    // Methods
}
