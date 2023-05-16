package com.longcode.colorRecogniser.utils;

import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Root;

public class SpecificationUtils {
    public static Path<?> getPath(Root root, String keyString) {
        String[] keys = keyString.split("\\.");
        Path<?> key = root;
        for(var k : keys) {
            key = key.get(k);
        }

        return key;
    }
}
