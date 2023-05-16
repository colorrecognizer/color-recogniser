package com.longcode.colorRecogniser.models.requests;

import com.longcode.colorRecogniser.models.enums.SortDirection;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class SortRequest {
    private String key;
    private SortDirection direction;
}
