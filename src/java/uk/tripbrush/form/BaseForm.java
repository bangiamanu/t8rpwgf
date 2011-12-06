/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package uk.tripbrush.form;

import org.apache.struts.action.ActionForm;
import org.apache.struts.util.MessageResources;

/**
 *
 * @author Samir
 */
public class BaseForm extends ActionForm {

    private String command;
    private MessageResources resources;

    /**
     * @return the command
     */
    public String getCommand() {
        return command;
    }

    /**
     * @param command the command to set
     */
    public void setCommand(String command) {
        this.command = command;
    }

    /**
     * @return the resources
     */
    public MessageResources getResources() {
        return resources;
    }

    /**
     * @param resources the resources to set
     */
    public void setResources(MessageResources resources) {
        this.resources = resources;
    }


}
