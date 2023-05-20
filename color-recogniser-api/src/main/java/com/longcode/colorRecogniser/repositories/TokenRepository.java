package com.longcode.colorRecogniser.repositories;


import com.longcode.colorRecogniser.models.Token;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TokenRepository extends BaseModelRepository<Token> {

    @Query(value = """
            SELECT * FROM Token
            where userId = :userId and (expired = false or revoked = false)
            ;
            """, nativeQuery = true)
    List<Token> findAllValidTokensByUserId(Long userId);

    Optional<Token> findByToken(String token);
}
