/*
 * DatabasePlugin.java
 *
 * Created on November 23, 2008, 9:30 PM
 *
 * To change this template, choose Tools | Template Manager
 * and open the template in the editor.
 */

package uk.tripbrush.service;

import org.apache.struts.action.ActionServlet;
import org.apache.struts.action.PlugIn;
import org.apache.struts.config.ModuleConfig;

/**
 *
 * @author SSeetal
 */
public class DatabasePlugIn implements PlugIn {

    public void destroy() {
        try {
            Database.shutdown();
        } catch (Exception e) {
        }
    }

    public void init(ActionServlet servlet, ModuleConfig config) {
        try {
            Database.createSessionFactory();
        } catch (Throwable t) {
        }
    }
}

