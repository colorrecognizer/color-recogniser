package com.longcode.colorRecogniser.utils;

import java.util.concurrent.ThreadLocalRandom;

public class RandomUtils {
    public static int randIntRange(int min, int max) {
        return ThreadLocalRandom.current().nextInt(min, max + 1);
    }
}
