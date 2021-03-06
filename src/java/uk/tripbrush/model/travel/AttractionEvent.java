package uk.tripbrush.model.travel;

import java.io.Serializable;
import java.util.Calendar;


/** @author Hibernate CodeGenerator */
public class AttractionEvent  implements Serializable {

    private int id;

    private Attraction attraction;

    private Calendar hday;

    private int starthour;

    private int startminute;

    private int endhour;

    private int endminute;
    
    private String description;

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
     * @return the attraction
     */
    public Attraction getAttraction() {
        return attraction;
    }

    /**
     * @param attraction the attraction to set
     */
    public void setAttraction(Attraction attraction) {
        this.attraction = attraction;
    }

    /**
     * @return the starthour
     */
    public int getStarthour() {
        return starthour;
    }

    /**
     * @param starthour the starthour to set
     */
    public void setStarthour(int starthour) {
        this.starthour = starthour;
    }

    /**
     * @return the startminute
     */
    public int getStartminute() {
        return startminute;
    }

    /**
     * @param startminute the startminute to set
     */
    public void setStartminute(int startminute) {
        this.startminute = startminute;
    }

    /**
     * @return the endhour
     */
    public int getEndhour() {
        return endhour;
    }

    /**
     * @param endhour the endhour to set
     */
    public void setEndhour(int endhour) {
        this.endhour = endhour;
    }

    /**
     * @return the endminute
     */
    public int getEndminute() {
        return endminute;
    }

    /**
     * @param endminute the endminute to set
     */
    public void setEndminute(int endminute) {
        this.endminute = endminute;
    }

    /**
     * @return the hday
     */
    public Calendar getHday() {
        return hday;
    }

    /**
     * @param hday the hday to set
     */
    public void setHday(Calendar hday) {
        this.hday = hday;
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
