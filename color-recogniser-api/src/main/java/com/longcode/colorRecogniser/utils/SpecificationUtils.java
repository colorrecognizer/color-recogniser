package com.longcode.colorRecogniser.utils;

import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Root;

public class SpecificationUtils {
    public static <T> Path<T> getPath(Root<T> root, String keyString) {
        String[] keys = keyString.split("\\.");
        Path<T> key = root;
        for(var k : keys) {
            key = key.get(k);
        }

        return key;
    }
}
