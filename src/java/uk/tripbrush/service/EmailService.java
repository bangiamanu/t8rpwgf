/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package uk.tripbrush.service;

import java.io.BufferedReader;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMultipart;
import net.fortuna.ical4j.data.CalendarOutputter;
import net.fortuna.ical4j.model.component.VEvent;
import net.fortuna.ical4j.model.property.CalScale;
import net.fortuna.ical4j.model.property.Location;
import net.fortuna.ical4j.model.property.ProdId;
import net.fortuna.ical4j.model.property.Version;
import net.fortuna.ical4j.util.UidGenerator;
import uk.tripbrush.model.core.Plan;
import uk.tripbrush.model.core.User;
import uk.tripbrush.model.travel.Event;
import uk.tripbrush.util.StringUtil;

/**
 *
 * @author Samir
 */
public class EmailService {

    public static String EMAIL_FROM = "admin@tripbrush.com";

    public static void sendResetPassword(User user) {
        String message = "Your password has been reset to " + user.getPassword();
        sendEmail(user.getEmail(),"Password Reset",message,null);
    }

    public static void sendVerify(User user) {
        String message = "Your code is " + user.getReference();
        sendEmail(user.getEmail(),"Verify Account",message,null);
    }

    public static void sendEmail(String email,String subject,String file,String body,List<String> attach) {
        String fullbody = loadEmail(file);
        fullbody = fullbody.replaceAll("%TABLE%", body.toString());
        sendEmail(email,subject,fullbody,attach);
    }
    
    public static void sendEmail(String email,String subject,String body,List<String> attach) {
        try
        {
            //Set the host smtp address
            Properties props = new Properties();
            props.put("mail.smtp.host", "k2smtpout.secureserver.net");

            // create some properties and get the default Session
            Session session = Session.getDefaultInstance(props, null);
            session.setDebug(false);

            // create a message
            javax.mail.internet.MimeMessage msg = new javax.mail.internet.MimeMessage(session);

            // set the from and to address
            InternetAddress addressFrom = new InternetAddress(EMAIL_FROM);
            msg.setFrom(addressFrom);

            /*List<String> emailAdds = email.getEmail();

            InternetAddress[] addressTo = new InternetAddress[emailAdds.size()];
            for (int i = 0; i < emailAdds.size(); i++) {
                addressTo[i] = new InternetAddress((String)emailAdds.get(i));
            }*/
            InternetAddress[] addressTo = new InternetAddress[1];
            addressTo[0]= new InternetAddress(email);
            msg.setRecipients(javax.mail.Message.RecipientType.TO, addressTo);

            InternetAddress[] addressBCC = new InternetAddress[1];
            addressBCC[0] = new InternetAddress(EMAIL_FROM);
            msg.setRecipients(javax.mail.Message.RecipientType.BCC, addressBCC);



            // Setting the Subject and Content Type
            msg.setSubject(subject);
            

            if (attach == null || attach.size() == 0) {
                msg.setContent(body, "text/html");
            } else {
                // create the message part 
                MimeBodyPart messageBodyPart = new MimeBodyPart();

                //fill message
                messageBodyPart.setContent(body, "text/html");

                Multipart multipart = new MimeMultipart();
                multipart.addBodyPart(messageBodyPart);

                // Part two is attachment
                for (String file : attach) {
                    messageBodyPart = new MimeBodyPart();
                    DataSource source =
                            new FileDataSource(file);
                    messageBodyPart.setDataHandler(
                            new DataHandler(source));
                    messageBodyPart.setFileName(file);
                    multipart.addBodyPart(messageBodyPart);
                }
                msg.setContent(multipart);
            }            
            
            Transport.send(msg);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        catch (Throwable ex) {
            ex.printStackTrace();
        }
    }
    
    public static boolean isValidEmail(String email) {
        boolean result = true;
        try {
            InternetAddress emailAddr = new InternetAddress(email);
            if ( ! hasNameAndDomain(email) ) {
                result = false;
            }
        }
        catch (AddressException ex){
            result = false;
        }
        return result;
    }
    
    private static boolean hasNameAndDomain(String aEmailAddress){
        String[] tokens = aEmailAddress.split("@");
        return
            tokens.length == 2 &&
            !StringUtil.isEmpty(tokens[0]) &&
            !StringUtil.isEmpty(tokens[1]);
    }
    
    public static String loadEmail(String type) {
        String results = "";
        try {

            BufferedReader bf = new BufferedReader(new FileReader(ConfigService.getRoot() + type));
            StringBuffer body = new StringBuffer();
            String input = "";
            while (true) {
                input = bf.readLine();
                if (input == null) {
                    break;
                }
                body.append(input);
            }
            results = body.toString();
        } catch (IOException ioe) {
            ioe.printStackTrace();
        }
        return results;
    }
}


