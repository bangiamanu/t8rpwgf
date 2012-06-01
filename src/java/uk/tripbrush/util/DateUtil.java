/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package uk.tripbrush.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 *
 * @author Samir
 */
public class DateUtil {

    private static SimpleDateFormat sdf_slash = new SimpleDateFormat("dd:MM:yyyy:HH:mm");

    private static SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm");
    private static SimpleDateFormat sdf_day = new SimpleDateFormat("dd/MM/yyyy");
    private static SimpleDateFormat sdf_time = new SimpleDateFormat("HH:mm");
    private static SimpleDateFormat sdf_time_full = new SimpleDateFormat("HH:mm a");
    private static SimpleDateFormat sdf_day_full = new SimpleDateFormat("E MMM dd yyyy");

    private static final String SPACE = " ";
    public static final String START_DAY = "00:00";
    public static final String END_DAY = "23:59";

    public static Date parseDateTime(String input) throws ParseException {
        return sdf_slash.parse(input);
    }

    public static String formateDateTime(Date input) throws ParseException {
        return sdf_slash.format(input);
    }    
    
    public static String getTime(Calendar cal) {
        return sdf_time.format(cal.getTime());
    }
    
    public static String getFullTime(Calendar cal) {
        return sdf_time_full.format(cal.getTime());
    }
    
    public static String getFullDay(Calendar cal) {
        return sdf_day_full.format(cal.getTime());
    }

    public static String getDay(Calendar cal) {
        return sdf_day.format(cal.getTime());
    }
    

    public static void setDay(Calendar cal,String date) {
        try {
            cal.setTime(sdf.parse(date + SPACE + "00:00"));
        }
        catch (ParseException pe) {}
    }

    public static void setDay(Calendar cal,String date,String time) {
        try {
            cal.setTime(sdf.parse(date + SPACE + time));
        }
        catch (ParseException pe) {}
    }

    public static boolean isValidDay(String date) {
        try {
            sdf_day.setLenient(Boolean.TRUE);
            sdf_day.parse(date);
            return true;
        }
        catch (ParseException e) {
            return false;
        }
    }

    public static boolean isValidTime(String time) {
        try {
            sdf_time.setLenient(Boolean.TRUE);
            sdf_time.parse(time);
            return true;
        }
        catch (ParseException e) {
            return false;
        }
    }

    public static Date formatDate(String date) {
        try {
            return sdf_day.parse(date);
        }
        catch (Exception e) {}
        return null;
    }

    public static boolean sameday(Calendar cal,Calendar cal2) {
        return (cal.get(Calendar.YEAR)==cal2.get(Calendar.YEAR) && 
            cal.get(Calendar.MONTH)==cal2.get(Calendar.MONTH) && 
            cal.get(Calendar.DAY_OF_MONTH)==cal2.get(Calendar.DAY_OF_MONTH));
    }
}
