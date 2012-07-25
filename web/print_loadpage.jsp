<%-- 
    Document   : print_loadpage
    Created on : 25-Jul-2012, 16:05:45
    Author     : Manu
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Printing . . .</title>
        <script type='text/javascript' src='libs/jquery-1.4.4.min.js'></script>
    </head>
    <body align="center">
        <img src="http://classicprocessing.en.ecplaza.net/mainl.gif" />
        <p>The bigger the plan, the longer it takes to generate a printout. This could take upto 3 minutes. Please wait!</p>
        <script type="text/javascript">
            $(window).load(function(){
                window.location = "./print.jsp"; 
            })            
        </script>
        
    </body>
</html>
