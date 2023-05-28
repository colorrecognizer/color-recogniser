package com.longcode.colorRecogniser.models;

import com.longcode.colorRecogniser.models.shallowModels.CMYKColor;
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

    public CMYKColor getCMYK() {
        if (red == 0 && green == 0 && blue == 0) {
            return CMYKColor.builder()
                    .cyan(0)
                    .magenta(0)
                    .yellow(0)
                    .black(1)
                    .build();
        }

        double computedC = 1 - red * 1.0 / 255;
        double computedM = 1 - green * 1.0 / 255;
        double computedY = 1 - blue * 1.0 / 255;

        var minCMY = Math.min(computedC,
                Math.min(computedM, computedY));
        computedC = (computedC - minCMY) / (1 - minCMY);
        computedM = (computedM - minCMY) / (1 - minCMY);
        computedY = (computedY - minCMY) / (1 - minCMY);
        return CMYKColor.builder()
                .cyan(computedC)
                .magenta(computedM)
                .yellow(computedY)
                .black(minCMY)
                .build();
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
