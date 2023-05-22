package com.longcode.colorRecogniser.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.*;
import org.apache.commons.lang3.StringUtils;

@Entity
@Table
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Color extends BaseModel {
    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false)
    @Min(0)
    @Max(255)
    private short red;

    @Column(nullable = false)
    @Min(0)
    @Max(255)
    private short green;

    @Column(nullable = false)
    @Min(0)
    @Max(255)
    private short blue;

    // Transient
    public String getHexValue() {
        return "#%s%s%s".formatted(
                StringUtils.leftPad(Integer.toHexString(red), 2, "0"),
                StringUtils.leftPad(Integer.toHexString(green), 2, "0"),
                StringUtils.leftPad(Integer.toHexString(blue), 2, "0")
        );
    }
}
