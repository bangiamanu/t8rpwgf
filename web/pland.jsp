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
    out.println("<planx id=\"" + result.getId() + "\" editable=\"" + result.isEditable() + "\" startdate=\"" + result.getStartdateString() + "\" numdays=\"" + result.getLength() +"\" home_post_code=\"" + result.getHome_post_code() + "\"></planx>");
    for (Event event: result.getEvents()) {
        out.println("<pevent attractionUniqueId=\"" + event.getAttraction().getUniqueId() + "\" id=\"" + event.getId() + "\" fromdate=\"" + DateUtil.formateDateTime(event.getStartdate().getTime()) + "\" enddate=\"" + DateUtil.formateDateTime(event.getEnddate().getTime()) + "\"></pevent>");
    }    
    out.println("");
%>
</result>