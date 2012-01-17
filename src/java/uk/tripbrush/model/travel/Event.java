package uk.tripbrush.model.travel;

import java.io.Serializable;
import java.util.Calendar;
import java.util.List;
import uk.tripbrush.model.core.Plan;

/** @author Hibernate CodeGenerator */
public class Event implements Serializable {

    private int id;
    private Calendar startdate;
    private Calendar enddate;
    private Attraction attraction;
    private String note;
    private Plan plan;
    private int timeslotId;

    /** default constructor */
    public Event() {
        startdate = Calendar.getInstance();
        enddate = Calendar.getInstance();
    }

    /**
     * @return the startdate
     */
    public Calendar getStartdate() {
        return startdate;
    }

    /**
     * @param startdate the startdate to set
     */
    public void setStartdate(Calendar startdate) {
        this.startdate = startdate;
    }

    /**
     * @return the enddate
     */
    public Calendar getEnddate() {
        return enddate;
    }

    /**
     * @param enddate the enddate to set
     */
    public void setEnddate(Calendar enddate) {
        this.enddate = enddate;
    }

    /**
     * @return the note
     */
    public String getNote() {
        return note;
    }

    /**
     * @param note the note to set
     */
    public void setNote(String note) {
        this.note = note;
    }

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
     * @return the plan
     */
    public Plan getPlan() {
        return plan;
    }

    /**
     * @param plan the plan to set
     */
    public void setPlan(Plan plan) {
        this.plan = plan;
    }

    public void initDates() {
        setStartdate(Calendar.getInstance());
        setEnddate(Calendar.getInstance());
    }

    /**
     * @return the timeslotId
     */
    public int getTimeslotId() {
        return timeslotId;
    }

    /**
     * @param timeslotId the timeslotId to set
     */
    public void setTimeslotId(int timeslotId) {
        this.timeslotId = timeslotId;
    }
}
