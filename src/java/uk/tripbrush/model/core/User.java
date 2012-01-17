/*
 * User.java
 *
 * Created on November 23, 2008, 5:31 PM
 *
 * To change this template, choose Tools | Template Manager
 * and open the template in the editor.
 */

package uk.tripbrush.model.core;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author SSeetal
 */
public class User implements Serializable {

    private String password;
    private int status;

    private String name;
    
    private int id;
    private String email;
    private String reference;
    private String sessionID;

    private List<Plan> plans;
    
    public User(User tusr) {
        setStatus(tusr.getStatus());
        setId(tusr.getId());
    }
    
    /** Creates a new instance of User */
    public User() {
        plans = new ArrayList<Plan>();
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
     * @return the email
     */
    public String getEmail() {
        return email;
    }

    /**
     * @param email the email to set
     */
    public void setEmail(String email) {
        this.email = email;
    }



    /**
     * @return the plans
     */
    public List<Plan> getPlans() {
        return plans;
    }

    /**
     * @param plans the plans to set
     */
    public void setPlans(List<Plan> plans) {
        this.plans = plans;
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
     * @return the password
     */
    public String getPassword() {
        return password;
    }

    /**
     * @param password the password to set
     */
    public void setPassword(String password) {
        this.password = password;
    }


    /**
     * @return the status
     */
    public int getStatus() {
        return status;
    }

    /**
     * @param status the status to set
     */
    public void setStatus(int status) {
        this.status = status;
    }

    public boolean isLoggedIn() {
        return true;
    }

    /**
     * @return the sessionID
     */
    public String getSessionID() {
        return sessionID;
    }

    /**
     * @param sessionID the sessionID to set
     */
    public void setSessionID(String sessionID) {
        this.sessionID = sessionID;
    }


    /**
     * @return the name
     */
    public String getName() {
        return name;
    }

    /**
     * @param name the name to set
     */
    public void setName(String name) {
        this.name = name;
    }
}
