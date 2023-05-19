package com.longcode.colorRecogniser.models.requests;

import com.longcode.colorRecogniser.utils.RegexUtils;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class RegisterRequest {
    @Pattern(regexp = RegexUtils.USERNAME)
    private String username;

    @Pattern(regexp = RegexUtils.EMAIL)
    private String email;

    @Pattern(regexp = RegexUtils.PASSWORD)
    private String password;
}
