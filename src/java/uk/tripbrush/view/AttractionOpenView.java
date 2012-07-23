/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package uk.tripbrush.view;

import java.util.Calendar;

/**
 *
 * @author sseetal
 */
public class AttractionOpenView {

    private Calendar from;
    private Calendar to;
    private String description; 
   

    public AttractionOpenView() {
        from = Calendar.getInstance();
        to = Calendar.getInstance();
        description = "";
    }
    
    /**
     * 
     * @return the from
     */
    public Calendar getFrom() {
        return from;
    }

    /**
     * @param from the from to set
     */
    public void setFrom(Calendar from) {
        this.from = from;
    }

    /**
     * @return the to
     */
    public Calendar getTo() {
        return to;
    }

    /**
     * @param to the to to set
     */
    public void setTo(Calendar to) {
        this.to = to;
    }

    /**
     * @return the description
     */
    public String getDescription() {
        return description;
    }

    /**
     * @param description the description to set
     */
    public void setDescription(String description) {
        this.description = description;
    }
}
