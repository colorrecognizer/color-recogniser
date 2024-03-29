package com.longcode.colorRecogniser.controllers;

import com.longcode.colorRecogniser.models.User;
import com.longcode.colorRecogniser.models.requests.LoginRequest;
import com.longcode.colorRecogniser.models.requests.RegisterRequest;
import com.longcode.colorRecogniser.models.responses.AuthenticationResponse;
import com.longcode.colorRecogniser.services.modelServices.UserService;
import jakarta.validation.Valid;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@Getter
public class UserController extends BaseModelController<User> {
    private UserService userService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    // Methods
    @PostMapping("/register")
    @Transactional
    public ResponseEntity<AuthenticationResponse> register(@Valid @RequestBody RegisterRequest user) {
        return ResponseEntity.ok(userService.register(user));
    }

    @PostMapping(value = "/login")
    public ResponseEntity<AuthenticationResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(userService.login(loginRequest));
    }

    @GetMapping("/get-current-user")
    public ResponseEntity<User> getCurrentUser() {
        return ResponseEntity.ok(userService.getCurrentUser());
    }

//    @GetMapping("/get-admin-contacts")
//    public ResponseEntity<List<User>> getAdminContacts() {
//        return ResponseEntity.ok(userService.getAdminContacts());
//    }
}

