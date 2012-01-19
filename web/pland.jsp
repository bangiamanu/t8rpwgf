<?xml version="1.0" encoding="utf-8" ?>
<%@page import="uk.tripbrush.util.DateUtil"%>
<%@ page import="uk.tripbrush.util.Constant"%>
<%@ page import="uk.tripbrush.model.core.*"%>
<%@ page import="uk.tripbrush.model.travel.*"%>
<%@ page import="uk.tripbrush.view.*"%>
<%@ page import="java.util.*"%>
<result>
<%
    Plan result = (Plan)request.getSession().getAttribute(Constant.SESSION_PLAN);
    out.println("<plan id=\"" + result.getId() + "\" editable=\"" + result.isEditable() + "\">");
    for (Event event: result.getEvents()) {
        out.println("<pevent aid=\"" + event.getAttraction().getId() + "\" id=\"" + event.getId() + "\" fromdate=\"" + DateUtil.formateDateTime(event.getStartdate().getTime()) + "\" enddate=\"" + DateUtil.formateDateTime(event.getEnddate().getTime()) + "\"></pevent>");
    }    
    out.println("</plan>");
%>
</result>