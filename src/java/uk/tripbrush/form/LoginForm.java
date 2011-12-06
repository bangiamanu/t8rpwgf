/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package uk.tripbrush.form;

import javax.servlet.http.HttpServletRequest;
import org.apache.struts.action.ActionErrors;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.action.ActionMessage;
import uk.tripbrush.service.EmailService;
import uk.tripbrush.util.CommandConstant;
import uk.tripbrush.util.StringUtil;


/**
 *
 * @author Samir
 */
public class LoginForm extends BaseForm {

    private String keypass;

    private String destination;
    private String fromdate;
    private int howlong;

    private String email;
    private String password;
    private String newpassword;
    private String newpassword1;
    private String code;
    

    /**
     * @return the keypass
     */
    public String getKeypass() {
        return keypass;
    }

    /**
     * @param keypass the keypass to set
     */
    public void setKeypass(String keypass) {
        this.keypass = keypass;
    }

    /**
     * @return the destination
     */
    public String getDestination() {
        return destination;
    }

    /**
     * @param destination the destination to set
     */
    public void setDestination(String destination) {
        this.destination = destination;
    }

    /**
     * @return the fromdate
     */
    public String getFromdate() {
        return fromdate;
    }

    /**
     * @param fromdate the fromdate to set
     */
    public void setFromdate(String fromdate) {
        this.fromdate = fromdate;
    }

    /**
     * @return the howlong
     */
    public int getHowlong() {
        return howlong;
    }

    /**
     * @param howlong the howlong to set
     */
    public void setHowlong(int howlong) {
        this.howlong = howlong;
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
     * @return the newpassword
     */
    public String getNewpassword() {
        return newpassword;
    }

    /**
     * @param newpassword the newpassword to set
     */
    public void setNewpassword(String newpassword) {
        this.newpassword = newpassword;
    }

    /**
     * @return the newpassword1
     */
    public String getNewpassword1() {
        return newpassword1;
    }

    /**
     * @param newpassword1 the newpassword1 to set
     */
    public void setNewpassword1(String newpassword1) {
        this.newpassword1 = newpassword1;
    }

    /**
     * @return the code
     */
    public String getCode() {
        return code;
    }

    /**
     * @param code the code to set
     */
    public void setCode(String code) {
        this.code = code;
    }


    @Override
    public ActionErrors validate(ActionMapping mapping, HttpServletRequest request) {
        ActionErrors errors = new ActionErrors();


        if (CommandConstant.LOGIN_USER.equals(getCommand())) {
            validateEmail(errors);
            validatePassword(errors,password,getResources().getMessage("form.password"));
        } else if (CommandConstant.FORGOT_USER.equals(getCommand())) {
            validateEmail(errors);
        } else if (CommandConstant.VERIFY_USER.equals(getCommand())) {
            validateEmail(errors);
            validateCode(errors);
        } else if (CommandConstant.NEW_USER.equals(getCommand())) {
            validateEmail(errors);
            validatePassword(errors,newpassword,getResources().getMessage("form.password"));
            validatePassword(errors,newpassword1,getResources().getMessage("form.cpassword"));
            if (!getNewpassword().equals(getNewpassword1())) {
                errors.add(CommandConstant.ERROR, new ActionMessage("error.pmatch"));
            }
        } else if (CommandConstant.CHANGE_PASSWORD.equals(getCommand())) {
            validatePassword(errors,password,getResources().getMessage("form.oldpassword"));
            validatePassword(errors,newpassword,getResources().getMessage("form.newpassword"));
            validatePassword(errors,newpassword1,getResources().getMessage("form.newpassword1"));
            if (!getNewpassword().equals(getNewpassword1())) {
                errors.add(CommandConstant.ERROR, new ActionMessage("error.pmatch"));
            }
        }
        return errors;
    }

    private void validateEmail(ActionErrors errors) {
        if (!StringUtil.validateRequired(email)) {
            errors.add(CommandConstant.ERROR, new ActionMessage("error.required", getResources().getMessage("form.email")));
        }
        else if (!StringUtil.validateLength(email,StringUtil.MAX_TEXT_LENGTH)) {
            errors.add(CommandConstant.ERROR, new ActionMessage("error.slength", getResources().getMessage("form.email")));
        }
        else if (!EmailService.isValidEmail(email)) {
            errors.add(CommandConstant.ERROR, new ActionMessage("error.email"));
        }

    }

    private void validateCode(ActionErrors errors) {
        if (!StringUtil.validateRequired(code)) {
            errors.add(CommandConstant.ERROR, new ActionMessage("error.required", getResources().getMessage("form.code")));
        }
        if (!StringUtil.validateLength(code,StringUtil.MAX_TEXT_LENGTH)) {
            errors.add(CommandConstant.ERROR, new ActionMessage("error.slength", getResources().getMessage("form.code")));
        }
    }

    private void validatePassword(ActionErrors errors,String password,String key) {
        if (!StringUtil.validateRequired(password)) {
            errors.add(CommandConstant.ERROR, new ActionMessage("error.required", key));
        }
        if (!StringUtil.validateLength(password,StringUtil.MAX_TEXT_LENGTH)) {
            errors.add(CommandConstant.ERROR, new ActionMessage("error.slength", key));
        }
    }

}
