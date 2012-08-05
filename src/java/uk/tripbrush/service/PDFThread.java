/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package uk.tripbrush.service;

import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import net.fortuna.ical4j.data.CalendarOutputter;
import net.fortuna.ical4j.model.component.VEvent;
import net.fortuna.ical4j.model.property.CalScale;
import net.fortuna.ical4j.model.property.Location;
import net.fortuna.ical4j.model.property.ProdId;
import net.fortuna.ical4j.model.property.Version;
import net.fortuna.ical4j.util.UidGenerator;
import uk.tripbrush.model.core.Plan;
import uk.tripbrush.model.travel.Event;

/**
 *
 * @author user
 */
public class PDFThread implements Runnable {

    private Thread t;
    private Plan plan;

    public void init() {
        t = new Thread(this);
        t.start();
    }


    public void run() {
        try {
            Database.beginTransaction();
            List<String> files = new ArrayList<String>();
            files.add(PDFService.createPlan(getPlan()));
            files.add(PlanService.createICSFile(getPlan()));
            EmailService.sendEmail(getPlan().getUser().getEmail(), "Your Trip Calendar to " + getPlan().getLocation().getName(), "calendar.htm", "Please find attached your Calendar and .ICS file", files);
            Database.commitTransaction();
        }
        catch (Exception e) {
            e.printStackTrace();
        }
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
}
