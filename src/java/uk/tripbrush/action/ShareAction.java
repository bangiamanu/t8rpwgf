/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package uk.tripbrush.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.struts.action.ActionErrors;
import uk.tripbrush.util.Constant;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.action.ActionMessage;
import org.apache.struts.util.MessageResources;
import uk.tripbrush.form.ShareForm;
import uk.tripbrush.model.core.Plan;
import uk.tripbrush.model.core.User;
import uk.tripbrush.service.PlanService;
import uk.tripbrush.util.CommandConstant;
import uk.tripbrush.view.MResult;

/**
 *
 * @author Samir
 */
public class ShareAction extends org.apache.struts.action.Action {

    @Override
    public ActionForward execute(ActionMapping mapping, ActionForm form,HttpServletRequest request, HttpServletResponse response) throws Exception {
        ShareForm qform = (ShareForm)form;

        ActionErrors errors = new ActionErrors();   
        
        String command = qform.getCommand();
        String keypass = qform.getKeypass();
        if (CommandConstant.GET_USER_BYPLANKEY.equals(command)) {   
            String fid = qform.getFid();
            Plan plan = (Plan)request.getSession().getAttribute(Constant.SESSION_PLAN);
            plan.setEditable(fid.equals(plan.getUser().getReference()));
            request.getSession().setAttribute(Constant.SESSION_PLAN, plan);
            return mapping.findForward("pland");
        }
        else {
            MResult result = PlanService.getPlan(keypass);
            if (result.getCode()==MResult.RESULT_OK) {
                Plan plan = (Plan)result.getObject();
                if (plan!=null) {
                    request.setAttribute(Constant.REQUEST_MESSAGE, plan.getUser().getReference());
                    plan.setVerify(true);
                    request.getSession().setAttribute(Constant.SESSION_PLAN, plan);
                }
            }
            else {
                errors.add(CommandConstant.ERROR, new ActionMessage("share.error"));
            }   
        }
        if (!errors.isEmpty()) {
            this.saveMessages(request, errors);
        }
        return mapping.findForward(Constant.MAPPING_SUCCESS);  
    }
}
