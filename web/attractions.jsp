<?xml version="1.0" encoding="utf-8" ?>
<%@ page import="uk.tripbrush.util.Constant"%>
<%@ page import="uk.tripbrush.model.travel.*"%>
<%@ page import="uk.tripbrush.view.*"%>
<%@ page import="java.net.URLEncoder"%>
<%@ page import="java.util.*"%>
<result>
<%
    List<Attraction> result = (List<Attraction>)request.getAttribute(Constant.REQUEST_MESSAGE);
    int counter = 0;
    for (Attraction c: result) {
        out.println("<attraction id=\"" + (counter++) + "\" aid=\"" + c.getId() + "\">");
        out.println("<category>" + c.getCategory().getName() + "</category>");                        
        out.println("<title>" + URLEncoder.encode(c.getName()) + "</title>");
        if (c.getDescription_short().length()>100) {
            out.println("<description_short>" + URLEncoder.encode(c.getDescription_short().substring(0,100)) + "...</description_short>");
        }
        else {
            out.println("<description_short>" + URLEncoder.encode(c.getDescription_short()) + "</description_short>");
        }
        out.println("<description_long>" + URLEncoder.encode(c.getDescription()) + "</description_long>");
        out.println("<image_file_name_small>" + c.getImageFileName_small() + "</image_file_name_small>");
        out.println("<image_file_name_large>" + c.getImageFileName() + "</image_file_name_large>");
        out.println("<postcode>" + c.getPostcode() + "</postcode>");
        out.println("<other_links>");
        for (String link: c.getOtherlinks().split(";")) {
            String[] linksplit = link.split(",");
            if (linksplit.length==2) {
                out.println("<link name=\"" + linksplit[0] + "\" url=\"" + linksplit[1] + "\"/>");  
            }                    
        }
        out.println("</other_links>");
        out.println("<opening_hours>");
        for (AttractionOpenView aov: c.getOpeningTimes()) {
             out.println(" <open description=\"" + aov.getDescription() + "\" fromy=\"" + aov.getFrom().get(Calendar.YEAR) + "\" fromm=\"" + aov.getFrom().get(Calendar.MONTH) + "\""
                + " fromd=\"" + aov.getFrom().get(Calendar.DAY_OF_MONTH) + "\" fromh=\"" + aov.getFrom().get(Calendar.HOUR_OF_DAY) + "\""
                + " fromn=\"" + aov.getFrom().get(Calendar.MINUTE) + "\""
                + " toy=\"" + aov.getTo().get(Calendar.YEAR) + "\" tom=\"" + aov.getTo().get(Calendar.MONTH) + "\""
                + " tod=\"" + aov.getTo().get(Calendar.DAY_OF_MONTH) + "\" toh=\"" + aov.getTo().get(Calendar.HOUR_OF_DAY) + "\""
                + " ton=\"" + aov.getTo().get(Calendar.MINUTE) + "\"/>");
        }
        out.println("</opening_hours>");               
        out.println("<wikipedia_url>" + c.getWikiurl() + "</wikipedia_url>");
        out.println("</attraction>");
    }    
%>
</result>