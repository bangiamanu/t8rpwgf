<?xml version="1.0" encoding="utf-8" ?>
<%@page import="uk.tripbrush.util.DateUtil"%>
<%@ page import="uk.tripbrush.util.Constant"%>
<%@ page import="uk.tripbrush.model.core.*"%>
<%@ page import="uk.tripbrush.view.*"%>
<%@ page import="java.util.*"%>
<result>
<%
    List<Plan> result = (List<Plan>)request.getAttribute(Constant.REQUEST_MESSAGE);
    out.println("<plans>");
    for (Plan c: result) {
        out.println("<plan id=\"" + c.getId() + "\" name=\"" + c.getTitle() + "\" location=\"" + c.getLocation().getName() + "\"  fromdate=\"" + DateUtil.getDay(c.getStartdate()) + "\" enddate=\"" + DateUtil.getDay(c.getEnddate()) + "\" numevents=\"" + c.getNumevents() + "\"/>");
    }    
    out.println("</plans>");
%>
</result>