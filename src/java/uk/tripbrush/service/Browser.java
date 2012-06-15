/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package uk.tripbrush.service;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;

/**
 *
 * @author Samir
 */
public class Browser {

    public static StringBuffer getPage(String page) throws Exception {
        StringBuffer result = new StringBuffer();

        URL yahoo = new URL(page);
        URLConnection yc = yahoo.openConnection();
        InputStream is = yc.getInputStream();


        BufferedReader in = new BufferedReader(
                new InputStreamReader(
                yc.getInputStream(),"UTF-8"));
        String inputLine;

        while ((inputLine = in.readLine()) != null) {
            result.append(inputLine);
        }
        in.close();
        return result;
    }

    public static void main(String[] args) throws Exception {
        System.out.println(getPage("http://www.tsn.ca"));
    }
}
