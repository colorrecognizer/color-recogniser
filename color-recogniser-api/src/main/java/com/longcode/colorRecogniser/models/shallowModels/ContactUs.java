package com.longcode.colorRecogniser.models.shallowModels;

import com.longcode.colorRecogniser.models.BaseModel;
import com.longcode.colorRecogniser.utils.RegexUtils;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ContactUs extends BaseModel {
    @NotNull
    private String name;

    @Pattern(regexp = RegexUtils.EMAIL)
    private String email;

    private String companyName;

    @NotNull
    private String message;
}
