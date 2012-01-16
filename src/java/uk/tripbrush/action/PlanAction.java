/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package uk.tripbrush.action;

import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import uk.tripbrush.form.QueryForm;
import uk.tripbrush.util.CommandConstant;
import uk.tripbrush.util.Constant;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import uk.tripbrush.model.travel.Attraction;
import uk.tripbrush.model.travel.Category;
import uk.tripbrush.service.CalendarService;
import uk.tripbrush.service.UploadService;

/**
 *
 * @author Samir
 */
public class PlanAction extends org.apache.struts.action.Action {

    @Override
    public ActionForward execute(ActionMapping mapping, ActionForm form,HttpServletRequest request, HttpServletResponse response) throws Exception {
        QueryForm qform = (QueryForm)form;

        if (CommandConstant.LOAD_CATEGORY.equals(qform.getCommand())) {
            List<Category> categories = CalendarService.getCategories();
            request.setAttribute(Constant.REQUEST_MESSAGE, categories);
            return mapping.findForward("categories");
        }
        else if (CommandConstant.GET_ATTRACTIONS.equals(qform.getCommand())) {
            List<Attraction> attractions = CalendarService.getAttractions(null);
            request.setAttribute(Constant.REQUEST_MESSAGE, attractions);
            return mapping.findForward("attractions");
        }
        else if (CommandConstant.RELOAD.equals(qform.getCommand())) {
            if (qform.getFile()!=null) {
                UploadService.process(qform.getFile().getInputStream());
            }
            request.setAttribute(Constant.REQUEST_MESSAGE,"OK");
        }
        return mapping.findForward(Constant.MAPPING_MESSAGE);
    }
}
