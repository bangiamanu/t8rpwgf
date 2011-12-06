package uk.tripbrush.model.core;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import uk.tripbrush.model.travel.Event;
import uk.tripbrush.util.DateUtil;


/** @author Hibernate CodeGenerator */
public class Plan implements Serializable {

    private int id;

    private boolean editable;

    private User user;

    private String reference;

    private String title;

    private String description;

    private Calendar startdate;

    private Calendar enddate;

    private int view;

    private List<Event> events;

    private Location location;


    public Plan() {
        setEvents(new ArrayList<Event>());
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

    /**
     * @return the reference
     */
    public String getReference() {
        return reference;
    }

    /**
     * @param reference the reference to set
     */
    public void setReference(String reference) {
        this.reference = reference;
    }

    /**
     * @return the startdate
     */
    public Calendar getStartdate() {
        return startdate;
    }

    public String getStartdateString() {
        return DateUtil.getDay(startdate);
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

    public String getEnddateString() {
        return DateUtil.getDay(enddate);
    }

    /**
     * @param enddate the enddate to set
     */
    public void setEnddate(Calendar enddate) {
        this.enddate = enddate;
    }

    /**
     * @return the user
     */
    public User getUser() {
        return user;
    }

    /**
     * @param user the user to set
     */
    public void setUser(User user) {
        this.user = user;
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
     * @return the title
     */
    public String getTitle() {
        return title;
    }

    /**
     * @param title the title to set
     */
    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * @return the view
     */
    public int getView() {
        return view;
    }

    /**
     * @param view the view to set
     */
    public void setView(int view) {
        this.view = view;
    }



    /**
     * @return the editable
     */
    public boolean isEditable() {
        return editable;
    }

    /**
     * @param editable the editable to set
     */
    public void setEditable(boolean editable) {
        this.editable = editable;
    }

    /**
     * @return the events
     */
    public List<Event> getEvents() {
        return events;
    }

    /**
     * @param events the events to set
     */
    public void setEvents(List<Event> events) {
        this.events = events;
    }

    /**
     * @return the location
     */
    public Location getLocation() {
        return location;
    }

    /**
     * @param location the location to set
     */
    public void setLocation(Location location) {
        this.location = location;
    }


}
