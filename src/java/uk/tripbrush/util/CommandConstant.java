/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package uk.tripbrush.util;

import java.io.Serializable;

/**
 *
 * @author Samir
 */
public class CommandConstant implements Serializable {

    public static final String FB_LOGIN="FBLogin";
    public static final String FB_LOGOUT="FBLogout";
    
    public static final String VALIDATE_PASSWORD="validate";
    public static final String CONFIRM_PASSWORD="confirm";
    public static final String LOAD_CATEGORY="loadCategory";
    public static final String GET_ATTRACTIONS="getAttractions";

    public static final String LOGOUT_USER ="Logout";
    public static final String LOGIN_USER ="Login";
    public static final String GET_USER ="GetUser";
    public static final String LOGIN_USER_MAIN ="LoginUser";
    public static final String NEW_USER ="NewUser";
    public static final String FORGOT_USER ="ForgotUser";
    public static final String VERIFY_USER ="VerifyUser";
    public static final String CHANGE_PASSWORD ="ChangePassword";
    public static final String CHANGE_NAME ="ChangeName";
    public static final String SET_HOME ="SetHome";
    

    public static final String NEW_PLAN="NewPlan";
    public static final String LOAD_PLANS="GetPlans";
    public static final String LOAD_PLAN="GetPlan";
    public static final String DELETE_PLAN="DeletePlan";
    public static final String ADD_EVENT="AddEvent";
    public static final String UPDATE_EVENT="UpdateEvent";
    public static final String DELETE_EVENT="DeleteEvent";
    public static final String EMAIL_PLAN="EmailPlan";
    public static final String GET_USER_BYPLANKEY ="GetUserByPlanKey";
    
    public static final String RELOAD="reload";
    public static final String LOG="Log";
    public static final String EMAIL="email";
    
    public static final String ERROR ="error";
    public static final String MESSAGE ="message";    

}
