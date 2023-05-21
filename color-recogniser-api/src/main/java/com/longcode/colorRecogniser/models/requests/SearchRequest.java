package com.longcode.colorRecogniser.models.requests;

import jakarta.validation.constraints.Min;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Builder
@Getter
@Setter
public class SearchRequest {
    @Builder.Default
    private List<FilterRequest> filters = new ArrayList<>();

    @Builder.Default
    private List<SortRequest> sorts = new ArrayList<>();

    @Min(0)
    private int page;

    @Min(1)
    @Builder.Default
    private int size = 10;
}
