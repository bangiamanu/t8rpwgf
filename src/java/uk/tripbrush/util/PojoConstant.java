/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package uk.tripbrush.util;

import java.io.Serializable;

/**
 *
 * @author Samir
 */
public class PojoConstant implements Serializable {
    public static final String MODEL = "uk.tripbrush.model.";
  
    public static final String LOCATION = "core.Location";
    public static final String LOCATION_MODEL = MODEL+LOCATION;

    public static final String CATEGORY = "travel.Category";
    public static final String CATEGORY_MODEL = MODEL+CATEGORY;
    public static final String ATTRACTION = "travel.Attraction";
    public static final String ATTRACTION_MODEL = MODEL+ATTRACTION;
    public static final String ATTRACTIONTIME = "travel.AttractionTime";
    public static final String ATTRACTIONTIME_MODEL = MODEL+ATTRACTIONTIME;
    public static final String ATTRACTIONEVENT = "travel.AttractionEvent";
    public static final String ATTRACTIONEVENT_MODEL = MODEL+ATTRACTIONEVENT;
    public static final String ATTRACTIONSEASON = "travel.AttractionSeason";
    public static final String ATTRACTIONSEASON_MODEL = MODEL+ATTRACTIONSEASON;

    public static final String USER = "core.User";
    public static final String USER_MODEL = MODEL+USER;

    public static final String PLAN = "core.Plan";
    public static final String PLAN_MODEL = MODEL+PLAN;

    public static final String EVENT = "travel.Event";
    public static final String EVENT_MODEL = MODEL+EVENT;

    public static void main(String[] args) {
        System.out.println("IDD");
    }
}
