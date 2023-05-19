package com.longcode.colorRecogniser.controllers;

import com.longcode.colorRecogniser.config.ApiException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice // To Handle Exceptions
public class ExceptionController {
    //// ...........

    @ExceptionHandler({ApiException.class})
    @ResponseBody
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    Map<String, String> unauthorizedAccess(Exception e) {
        Map<String, String> exception = new HashMap<>();
        exception.put("reason", e.getMessage());
        return exception;
    }
}