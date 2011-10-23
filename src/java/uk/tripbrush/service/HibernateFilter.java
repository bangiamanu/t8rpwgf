/*
 * HibernateFilter.java
 *
 * Created on June 26, 2008, 8:59 PM
 *
 * To change this template, choose Tools | Template Manager
 * and open the template in the editor.
 */

package uk.tripbrush.service;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

/**
 *
 * @author SAMIR
 */
public class HibernateFilter implements Filter {

    public void doFilter(ServletRequest request, ServletResponse response,FilterChain chain) throws IOException, ServletException
    {
        try {
            Database.beginTransaction();
            chain.doFilter(request, response);
            Database.commitTransaction();
        } catch (Exception e) {
            e.printStackTrace();
        } catch (Throwable ex) {
            ex.printStackTrace();
            try {
                if (Database.isActiveTransaction()) {
                    Database.rollbackTransaction();
                }
            } catch (Throwable rbEx) {
                rbEx.printStackTrace();
            }
        }
    }

    public void init(FilterConfig filterConfig) {
    }

    public void destroy() {
    	Database.shutdown();
    }
}

