package com.longcode.colorRecogniser.controllers;

import com.longcode.colorRecogniser.models.shallowModels.User;
import jakarta.validation.constraints.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api")
public class ApiController {
    @GetMapping("/test")
    public ResponseEntity<String> test(@RequestParam String longParameter) {
        return ResponseEntity.ok("OK!");
    }

    @GetMapping("/recognise")
    public ResponseEntity<String> recognise(@RequestParam @Min(0) @Max(255) short red,
                                            @RequestParam @Min(0) @Max(255) short green,
                                            @RequestParam @Min(0) @Max(255) short blue) {
        return ResponseEntity.ok("#ababab");
    }

    @GetMapping("/find-current-user")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<User> findCurrentUser(Principal principal) {
        User user = User.builder()
                .email(principal.toString())
                .build();

        return ResponseEntity.ok(user);
    }
}
