package uk.tripbrush.service;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.hibernate.classic.Session;

public class Database {

    private static SessionFactory sessionFactory;

   public static boolean createSessionFactory() {
    	if (sessionFactory == null) {
            try {
                sessionFactory = new Configuration().configure("hibernate.cfg.xml").buildSessionFactory();
                return true;
            } catch (Throwable ex) {
                ex.printStackTrace();
                throw new RuntimeException(ex);
            }
        }
    	return false;
    }

    public static Session getSession() {
    	if(sessionFactory== null)
    		createSessionFactory();
    	return sessionFactory.getCurrentSession();
    }

    public static void shutdown() {
    	// Close caches and connection pools
    	if (sessionFactory!=null) {
	    	sessionFactory.close();
	    	sessionFactory=null;
    	}
    }

    public static void beginTransaction() {
    	getSession().beginTransaction();
    }

    public static void commitTransaction(){
    	getSession().getTransaction().commit();
    }

    public static boolean isActiveTransaction() {
    	return getSession().getTransaction().isActive();
    }

    public static void rollbackTransaction() {
        getSession().getTransaction().rollback();
    }

    public static void flushAll() {
        getSession().flush();
    }
}

