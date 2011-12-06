/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package uk.tripbrush.service;

import java.io.Serializable;
import java.util.List;
import uk.tripbrush.model.core.Plan;
import uk.tripbrush.model.travel.Attraction;
import uk.tripbrush.model.travel.Category;
import uk.tripbrush.util.PojoConstant;
import org.hibernate.classic.Session;
import org.hibernate.criterion.Restrictions;
import uk.tripbrush.model.travel.Event;

/**
 *
 * @author Samir
 */
public class EventService implements Serializable {

    private static final String ID = "id";
    private static final String NAME = "name";
    private static final String CATEGORY = "category";

    public static Category getCategory(int cat) {
        Session session = Database.getSession();
        return (Category)session.createCriteria(PojoConstant.CATEGORY_MODEL).add(Restrictions.eq(ID, cat)).uniqueResult();
    }

    public static Attraction getAttraction(int id) {
        Session session = Database.getSession();
        return (Attraction)session.createCriteria(PojoConstant.ATTRACTION_MODEL).add(Restrictions.eq(ID, id)).uniqueResult();
    }

    public static void saveEvent(Event event) {
        Session session = Database.getSession();
        session.saveOrUpdate(event);
    }

    public static Event getEvent(int id) {
        Session session = Database.getSession();
        return (Event)session.createCriteria(PojoConstant.EVENT_MODEL).add(Restrictions.eq(ID, id)).uniqueResult();
    }

    public static List<Event> getEvents(Plan plan) {
        Session session = Database.getSession();
        List<Event> events = session.createCriteria(PojoConstant.EVENT_MODEL).add(Restrictions.eq("plan", plan)).list();
        return events;
    }

    public static void deleteEvent(int eventId) {
        Session session = Database.getSession();
        Event event = (Event)session.createCriteria(PojoConstant.EVENT_MODEL).add(Restrictions.eq("id", eventId)).uniqueResult();
        session.delete(event);
    }
}
