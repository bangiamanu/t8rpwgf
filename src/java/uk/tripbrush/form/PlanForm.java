/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package uk.tripbrush.form;

/**
 *
 * @author Samir
 */
public class PlanForm extends BaseForm {

   
    private int id;
    
    private String fromTime;
    private String toTime;
    private int attractionId;

    /**
     * @return the id
     */
    public int getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId(int id) {
        this.id = id;
    }

    /**
     * @return the fromTime
     */
    public String getFromTime() {
        return fromTime;
    }

    /**
     * @return the toTime
     */
    public String getToTime() {
        return toTime;
    }

    /**
     * @return the attractionId
     */
    public int getAttractionId() {
        return attractionId;
    }

    /**
     * @param fromTime the fromTime to set
     */
    public void setFromTime(String fromTime) {
        this.fromTime = fromTime;
    }

    /**
     * @param toTime the toTime to set
     */
    public void setToTime(String toTime) {
        this.toTime = toTime;
    }

    /**
     * @param attractionId the attractionId to set
     */
    public void setAttractionId(int attractionId) {
        this.attractionId = attractionId;
    }

}
