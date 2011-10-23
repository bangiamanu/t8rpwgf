/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package uk.tripbrush.util;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

/**
 *
 * @author Samir
 */
public class HTTPObject {
    public ActionMapping mapping;
    public ActionForm form;
    public HttpServletRequest request;
    public HttpServletResponse response;
}
