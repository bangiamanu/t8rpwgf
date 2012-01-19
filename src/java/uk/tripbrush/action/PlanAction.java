/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package uk.tripbrush.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.struts.action.ActionErrors;
import uk.tripbrush.util.CommandConstant;
import uk.tripbrush.util.Constant;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.action.ActionMessage;
import uk.tripbrush.form.PlanForm;
import uk.tripbrush.model.core.Plan;
import uk.tripbrush.model.core.User;
import uk.tripbrush.model.travel.Event;
import uk.tripbrush.service.CommonService;
import uk.tripbrush.service.EmailService;
import uk.tripbrush.service.EventService;
import uk.tripbrush.service.PlanService;
import uk.tripbrush.util.DateUtil;
import uk.tripbrush.view.MResult;

/**
 *
 * @author Samir
 */
public class PlanAction extends org.apache.struts.action.Action {

    @Override
    public ActionForward execute(ActionMapping mapping, ActionForm form,HttpServletRequest request, HttpServletResponse response) throws Exception {
        PlanForm pform = (PlanForm)form;

        User user = (User)request.getSession().getAttribute(Constant.SESSION_USER);
        if (CommandConstant.LOAD_PLANS.equals(pform.getCommand())) {
            if (user!=null) {
                if (user.getPlans().size()==0) {
                    PlanService.loadPlans(user);
                }
                request.setAttribute(Constant.REQUEST_MESSAGE,  user.getPlans());
                return mapping.findForward("plans");
            }            
        }
        else if (CommandConstant.LOAD_PLAN.equals(pform.getCommand())) {
            MResult result = PlanService.getPlan(user, pform.getId());
            if (result.getCode()==MResult.RESULT_OK) {
                Plan plan = (Plan)result.getObject();
                request.getSession().setAttribute(Constant.SESSION_PLAN, plan);
                return mapping.findForward("pland");
            }
            else {
                request.setAttribute(Constant.REQUEST_MESSAGE,"NOTOK");
            }
            
        }
        else if (CommandConstant.ADD_EVENT.equals(pform.getCommand())) {
            Plan plan = (Plan)request.getSession().getAttribute(Constant.SESSION_PLAN);
            Event event = new Event();            
            event.setPlan(plan);
            event.getStartdate().setTime(DateUtil.parseDateTime(pform.getFromTime()));
            event.getEnddate().setTime(DateUtil.parseDateTime(pform.getToTime()));
            event.setAttraction(CommonService.getAttraction(pform.getAttractionId()));
            EventService.saveEvent(event);
            plan.getEvents().add(event);
            request.setAttribute(Constant.REQUEST_MESSAGE,""+event.getId());
        }
        else if (CommandConstant.UPDATE_EVENT.equals(pform.getCommand())) {
            Plan plan = (Plan)request.getSession().getAttribute(Constant.SESSION_PLAN);
            Event event = plan.getEvent(pform.getId()); 
            if (event!=null) {
                event.getStartdate().setTime(DateUtil.parseDateTime(pform.getFromTime()));
                event.getEnddate().setTime(DateUtil.parseDateTime(pform.getToTime()));
                EventService.saveEvent(event);
                request.setAttribute(Constant.REQUEST_MESSAGE,""+event.getId());
            }
        }
        else if (CommandConstant.DELETE_EVENT.equals(pform.getCommand())) {
            Plan plan = (Plan)request.getSession().getAttribute(Constant.SESSION_PLAN);
            Event event = plan.deleteEvent(pform.getId());
            if (event!=null) {
                EventService.deleteEvent(event.getId());
            }
            
        }
        else if (CommandConstant.EMAIL_PLAN.equals(pform.getCommand())) {
            Plan plan = (Plan)request.getSession().getAttribute(Constant.SESSION_PLAN);
            PlanService.sendPlan(plan);
            ActionErrors errors = new ActionErrors();
            errors.add(CommandConstant.MESSAGE, new ActionMessage("email.ok"));
            if (!errors.isEmpty()) {
                this.saveMessages(request, errors);
            }            
        }
        return mapping.findForward(Constant.MAPPING_MESSAGE);
    }
}
