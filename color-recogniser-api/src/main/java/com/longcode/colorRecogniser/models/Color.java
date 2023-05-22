package com.longcode.colorRecogniser.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.*;
import org.apache.commons.lang3.StringUtils;

@Entity
@Table(uniqueConstraints = {
        @UniqueConstraint(name = "UK_Color_name_red_green_blue", columnNames = {"name", "red", "green", "blue"})
})
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Color extends BaseModel {
    @Column(nullable = false)
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

    // Methods
    public String getHexValue() {
        return "#%s%s%s".formatted(
                StringUtils.leftPad(Integer.toHexString(red), 2, "0"),
                StringUtils.leftPad(Integer.toHexString(green), 2, "0"),
                StringUtils.leftPad(Integer.toHexString(blue), 2, "0")
        );
    }

    @Override
    public String toString() {
        return "Color{" +
                "name='" + name + '\'' +
                ", red=" + red +
                ", green=" + green +
                ", blue=" + blue +
                '}';
    }
}
