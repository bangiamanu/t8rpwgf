/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package uk.tripbrush.service;

import java.io.Serializable;
import uk.tripbrush.util.PojoConstant;
import uk.tripbrush.view.MResult;
import org.hibernate.classic.Session;
import org.hibernate.criterion.Restrictions;
import uk.tripbrush.model.core.User;

/**
 *
 * @author Samir
 */
public class UserService implements Serializable {

    private static final String USER_PARENT = "user";
    private static final String ID = "id";

    public static final int TEMP_USER = -1;
    public static final int NORMAL_USER = 0;
    public static final int FORGOT_PASSWORD = 1;
    public static final int NEED_VERIFY = 2;

    public static void saveUser(User user) {
        Session session = Database.getSession();
        session.saveOrUpdate(user);
    }

    public static MResult resetUser(String email) {
        Session session = Database.getSession();
        User user = (User)session.createCriteria(PojoConstant.USER_MODEL).add(Restrictions.eq("email",email)).uniqueResult();
        MResult result = new MResult();
        if (user==null || user.getStatus()==NEED_VERIFY) {
            result.setCode(MResult.RESULT_NOTOK);
        }
        else {
            String password = CommonService.genererateReferenceNumber();
            user.setPassword(password);
            user.setStatus(FORGOT_PASSWORD);
            EmailService.sendResetPassword(user);
            UserService.saveUser(user);
            result.setCode(MResult.RESULT_OK);
        }
        return result;
    }

    public static MResult verifyUser(String email,String code) {
        Session session = Database.getSession();
        User user = (User)session.createCriteria(PojoConstant.USER_MODEL).add(Restrictions.eq("email",email)).add(Restrictions.eq(CommonService.REFERENCE,code)).uniqueResult();
        MResult result = new MResult();
        if (user==null || user.getStatus()!=NEED_VERIFY) {
            result.setCode(MResult.RESULT_NOTOK);
        }
        else {
            user.setStatus(NORMAL_USER);
            UserService.saveUser(user);
            result.setCode(MResult.RESULT_OK);
            result.setObject(user);
        }
        return result;
    }

    public static MResult newUser(User user) {
        Session session = Database.getSession();
        User dbuser = (User)session.createCriteria(PojoConstant.USER_MODEL).add(Restrictions.eq("email",user.getEmail())).uniqueResult();
        MResult result = new MResult();
        if (dbuser!=null) {
            result.setCode(MResult.RESULT_NOTOK);
            result.setMessage("User exists");
        }
        else {
            user.setStatus(NEED_VERIFY);
            String code = CommonService.genererateReferenceNumber(PojoConstant.USER_MODEL);
            user.setReference(code);
            UserService.saveUser(user);
            result.setCode(MResult.RESULT_OK);
            EmailService.sendVerify(user);
        }
        return result;
    }

    public static User getUser(int id) {
        Session session = Database.getSession();
        return (User)session.createCriteria(PojoConstant.USER_MODEL).add(Restrictions.eq("id",id)).uniqueResult();
    }
    
    public static User createTempUser() {
        User user = new User();
        Session session = Database.getSession();
        String userId = null;
        while (true) {
            userId = CommonService.genererateTemporaryUser();
            Object userD = session.createCriteria(PojoConstant.USER_MODEL).add(Restrictions.eq("reference",userId)).uniqueResult();
            if (userD==null) break;
        }
        user.setReference(userId);
        user.setPassword(CommonService.genererateReferenceNumber());
        user.setStatus(TEMP_USER);
        session.save(user);
        return user;
    }
}
