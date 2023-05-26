package com.longcode.colorRecogniser.models.shallowModels;

import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Line {
    private Point p1;
    private Point p2;
}
