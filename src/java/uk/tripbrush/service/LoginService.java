/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package uk.tripbrush.service;

import uk.tripbrush.util.PojoConstant;
import uk.tripbrush.view.MResult;
import org.hibernate.classic.Session;
import org.hibernate.criterion.Restrictions;
import uk.tripbrush.model.core.User;

/**
 *
 * @author Samir
 */
public class LoginService {

    public static MResult logOut(User user) {
        MResult result = new MResult();
        Session session = Database.getSession();
        user.setSessionID(CommonService.generateXcharacters(8));
        session.saveOrUpdate(user);
        result.setCode(MResult.RESULT_OK);
        return result;
    }

    public static MResult logIn(String username,String password) {
        MResult result = new MResult();
        Session session = Database.getSession();
        User user = (User)session.createCriteria(PojoConstant.USER_MODEL).add(Restrictions.eq("email",username)).add(Restrictions.eq("password",password)).uniqueResult();
        if (user==null) {
            result.setCode(MResult.RESULT_NOTOK);
        }
        else {
            user.setSessionID(CommonService.generateXcharacters(8));
            session.saveOrUpdate(user);
            result.setCode(MResult.RESULT_OK);
            result.setObject(user);
        }
        /*
        if (result.getCode()==MResult.RESULT_OK) {
            //check to see if user is loaded in database            
            try {                
                if (user==null) {
                    user = new User();
                    user.setEmail(username);
                    session.saveOrUpdate(user);
                }
                result.setObject(user);
            }
            catch (HibernateException he) {
                he.printStackTrace();
            }
        }*/
        return result;
    }
}
