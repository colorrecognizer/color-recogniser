package com.longcode.colorRecogniser.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.*;

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
}
