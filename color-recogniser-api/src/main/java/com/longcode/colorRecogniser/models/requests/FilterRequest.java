package com.longcode.colorRecogniser.models.requests;

import com.longcode.colorRecogniser.models.enums.FieldType;
import com.longcode.colorRecogniser.models.enums.Operator;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Builder
@Getter
@Setter
public class FilterRequest {
    private String key;
    private Operator operator;
    private FieldType fieldType;
    private transient Object value;
    private transient Object valueTo;
    private transient List<Object> values;
}
