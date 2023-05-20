package com.longcode.colorRecogniser.repositories;

import com.longcode.colorRecogniser.models.User;

import java.util.Optional;

public interface UserRepository extends BaseModelRepository<User> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);

    Optional<User> findByUsernameOrEmail(String usernameOrEmail);
}
