package com.longcode.colorRecogniser.controllers;


import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.longcode.colorRecogniser.models.enums.UserRole;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@Getter
public class AdminController {
    private FirebaseAuth firebaseAuth;

    @Autowired
    public void setFirebaseAuth(FirebaseAuth firebaseAuth) {
        this.firebaseAuth = firebaseAuth;
    }

    @PostMapping(path = "/user-claims")
    public void setUserClaims(
            @RequestParam String uid,
            @RequestBody List<UserRole> requestedClaims
    ) throws FirebaseAuthException {
        List<String> roles = requestedClaims
                .stream()
                .map(Enum::toString)
                .toList();

        Map<String, Object> claims = Map.of("custom_claims", roles);
        firebaseAuth.setCustomUserClaims(uid, claims);
    }
}