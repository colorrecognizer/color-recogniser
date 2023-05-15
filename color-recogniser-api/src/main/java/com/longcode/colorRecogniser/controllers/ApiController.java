package com.longcode.colorRecogniser.controllers;

import jakarta.validation.constraints.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ApiController {
    @GetMapping("/recognise")
    public ResponseEntity<String> recognise(@RequestParam @Min(0) @Max(255) short red,
                                            @RequestParam @Min(0) @Max(255) short green,
                                            @RequestParam @Min(0) @Max(255) short blue) {
        return ResponseEntity.ok("#ababab");
    }
}
