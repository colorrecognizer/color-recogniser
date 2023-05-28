package com.longcode.colorRecogniser.models.shallowModels;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CMYKColor {
    private double cyan;
    private double magenta;
    private double yellow;
    private double black;
}
