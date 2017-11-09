package com.example.carrentsys;

import java.util.Objects;
import java.util.regex.Pattern;

public class Utils {
    public static boolean isNumeric(String str) {
        Pattern pattern = Pattern.compile("^[-\\+]?[\\d]*$");
        return !Objects.equals(str, "") && pattern.matcher(str).matches();
    }
}
