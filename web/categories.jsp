<?xml version="1.0" encoding="utf-8" ?>
<%@ page import="uk.tripbrush.util.Constant"%>
<%@ page import="uk.tripbrush.model.travel.Category"%>
<%@ page import="java.util.List"%>
<response>
<%
    List<Category> result = (List<Category>)request.getAttribute(Constant.REQUEST_MESSAGE);
    for (Category c: result) {
        out.println("<category id=\"" + c.getId() + "\">");
        out.println("<name>" + c.getName() + "</name>");
        out.println("<title>" + c.getDescription() + "</title>");
        out.println("<imagefile>" + c.getIcon() + "</imagefile>");
        out.println("</category>");
    }
%>  
</response>
