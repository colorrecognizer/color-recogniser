package com.longcode.colorRecogniser.models.requests;

import jakarta.validation.constraints.Min;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Builder
@Getter
@Setter
public class SearchRequest {
    private List<FilterRequest> filters;
    private List<SortRequest> sorts;

    @Min(0)
    private int page;

    @Min(0)
    private int size;
}
