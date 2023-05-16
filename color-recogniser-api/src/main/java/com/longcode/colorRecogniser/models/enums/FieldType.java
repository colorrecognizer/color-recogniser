package com.longcode.colorRecogniser.models.enums;

public enum FieldType {
    BOOLEAN {
        public Object parse(String value) {
            return Boolean.valueOf(value);
        }
    };

    public abstract Object parse(String value);
}
