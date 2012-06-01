/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package uk.tripbrush.util;

/**
 *
 * @author Samir
 */
public class StringUtil {

    public static final int MAX_TEXT_LENGTH = 255;
    public static final int MAX_LONG_TEXT_LENGTH = 5000;

    public static boolean validateRequired(String input) {
        return !isEmpty(input);
    }

    public static boolean validateLength(String input, int length) {
        if (input!=null) {
            return input.length()<length;
        }
        return true;
    }

    public static boolean isEmpty(String input) {
        return null==input || "".equals(input);
    }
}
