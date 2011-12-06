<?xml version="1.0" encoding="utf-8" ?>
<%@ page import="uk.tripbrush.util.Constant"%>
<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<%@taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%
    String result = (String) request.getAttribute(Constant.REQUEST_MESSAGE);
    if (result==null) result="";
%>
<response>
    <result><%=result%></result>
    <messages>
        <logic:messagesPresent message="true">
            <html:messages id="message" message="true" property="message">
                <message><bean:write name="message"/></message>
            </html:messages>
            <html:messages id="message" message="true" property="error">
                <error><bean:write name="message"/></error>
            </html:messages>
        </logic:messagesPresent>
    </messages>
</response>