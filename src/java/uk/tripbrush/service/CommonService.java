/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package uk.tripbrush.service;

import java.io.Serializable;
import java.util.Random;
import org.hibernate.Criteria;
import org.hibernate.classic.Session;
import org.hibernate.criterion.Restrictions;

/**
 *
 * @author Samir
 */
public class CommonService implements Serializable {

    private static Random rdm = new Random();
    private static final int PREFIX_START = 65;
    private static final int PREFIX_LETTERS = 26;

    private static final int PREFIX_START_N = 1;
    private static final int PREFIX_NUMBERS = 10;
    
    private static final int NUM_CHARS = 10;
    private static final int NUM_NUMBERS = 6;

    public static final String REFERENCE = "reference";

    public static String generateXNumbers(int x)
    {
        StringBuffer result = new StringBuffer();
        for (int counter=0;counter<x;counter++)
        {
            int xrdm = PREFIX_START_N+rdm.nextInt(PREFIX_NUMBERS);
            result.append(xrdm);
        }
        return result.toString();
    }

    public static String generateXcharacters(int x)
    {
        StringBuffer result = new StringBuffer();
        for (int counter=1;counter<x;counter++)
        {
            int xrdm = PREFIX_START+rdm.nextInt(PREFIX_LETTERS);
            result.append((char)xrdm);
        }
        return result.toString();
    }

    public static String genererateReferenceNumber(String pojo) {
        Session session = Database.getSession();
        while (true) {
            String reference = generateXcharacters(NUM_CHARS);
            if (session.createCriteria(pojo).add(Restrictions.eq(REFERENCE,reference)).list().size()==0) {
                return reference;
            }

        }
    }

    public static String genererateReferenceNumber() {
        String reference = generateXcharacters(NUM_CHARS);
        return reference;
    }

    public static String genererateTemporaryUser() {
        String reference = generateXNumbers(NUM_NUMBERS);
        return reference;
    }


    public static void main(String[] args) {
        System.out.println(generateXNumbers(6));
    }

    public static void save(Object object) {
        Session session = Database.getSession();
        session.save(object);
    }
}
