/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package uk.tripbrush.service;

import java.io.Serializable;


import uk.tripbrush.util.PojoConstant;
import org.hibernate.classic.Session;
import org.hibernate.criterion.Restrictions;
import uk.tripbrush.model.core.Config;

/**
 *
 * @author Samir
 */
public class ConfigService implements Serializable {

    public static Config getConfig(String key) {
        Session session = Database.getSession();
        return (Config)session.createCriteria(PojoConstant.CONFIG_MODEL).add(Restrictions.eq("name",key)).uniqueResult();
    }

    public static String getValue(String key,String def) {
        Config config = getConfig(key);
        if (config!=null) {
            return config.getValue();
        }
        return def;
    }

    public static String getRoot() {
        return getValue("ROOT_FOLDER","c:/");
    }

    public static String getUrl() {
        return getValue("WEB_URL","http://localhost:8084/tripbrush/");
    }

    public static int getMaxWalking() {
        return Integer.parseInt(getValue("MAX_WALKING","20"));
    }
}
