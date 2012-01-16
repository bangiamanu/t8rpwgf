/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package uk.tripbrush.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import uk.tripbrush.model.core.Plan;
import uk.tripbrush.util.PojoConstant;
import uk.tripbrush.view.MResult;
import org.hibernate.classic.Session;
import org.hibernate.criterion.Restrictions;
import uk.tripbrush.model.core.User;

/**
 *
 * @author Samir
 */
public class PlanService {


    public static void loadPlans(User user) {
        Session session = Database.getSession();
        List<Plan> plans = session.createCriteria("uk.tripbrush.model.core.Plan").add(Restrictions.eq("user",user)).list();
        if (plans!=null) {
            user.setPlans(plans);
        }
    }

    public static void createPlan(User user,Plan plan) {
        Session session = Database.getSession();
        plan.setReference(CommonService.genererateReferenceNumber(PojoConstant.PLAN_MODEL));
        plan.setUser(user);
        session.save(plan);
    }

    public static MResult deletePlan(User user,int id) {
        MResult result = new MResult();
        Session session = Database.getSession();
        Plan plan = (Plan)session.createCriteria(PojoConstant.PLAN_MODEL).add(Restrictions.eq("user",user)).add(Restrictions.eq("id",id)).uniqueResult();
        if (plan!=null) {
            session.delete(plan);
            result.setCode(MResult.RESULT_OK);
        }
        else {
            result.setCode(MResult.RESULT_NOTOK);
            result.setMessage("delete.error");
        }
        return result;
    }

    public static MResult getPlan(User user,int id) {
        MResult result = new MResult();
        Session session = Database.getSession();
        Plan plan = (Plan)session.createCriteria(PojoConstant.PLAN_MODEL).add(Restrictions.eq("user",user)).add(Restrictions.eq("id",id)).uniqueResult();
        if (plan!=null) {
            result.setObject(plan);
            plan.setEvents(session.createCriteria(PojoConstant.EVENT_MODEL).add(Restrictions.eq("plan",plan)).list());
            result.setCode(MResult.RESULT_OK);
        }
        else {
            result.setCode(MResult.RESULT_NOTOK);
            result.setMessage("delete.error");
        }
        plan.setEvents(EventService.getEvents(plan));
        return result;
    }

    public static MResult updatePlan(Plan plan) {
        MResult result = new MResult();
        result.setCode(MResult.RESULT_OK);
        Session session = Database.getSession();
        session.saveOrUpdate(plan);
        return result;
    }

    public static void savePlan(Plan plan) {
        Session session = Database.getSession();
        session.saveOrUpdate(plan);
    }
    
    public static Plan createNewPlan(String dest,String from,int length) {
        Plan plan = new Plan();
        plan.setLocation(CommonService.getLocation(dest));
        plan.setEditable(true);
        plan.setLength(length);
        Calendar cal = Calendar.getInstance();
        cal.setTime(CommonService.getDate(from));
        Calendar ecal = cal.getInstance();
        ecal.setTime(cal.getTime());
        ecal.add(Calendar.DAY_OF_MONTH, length);
        String dateto = CommonService.getSDate(ecal.getTime());
        plan.setTitle("Trip to " + dest + "(" + from + "-" + dateto + ")");     
        plan.setStartdate(cal);
        plan.setEnddate(ecal);
        return plan;
    }
}
