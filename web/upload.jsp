<%-- 
    Document   : index
    Created on : Aug 13, 2011, 10:45:36 PM
    Author     : sseetal
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Data Loader</title>
    </head>
    <body>
<FORM  ENCTYPE="multipart/form-data" ACTION=
"QueryAction.do" METHOD=POST>
    <input type="hidden" name="command" value="reload"/>
                <br><br><br>
          <center><table border="2" >
                    <tr><center><td colspan="2"><p align=
"center"><B>DATA LOADER</B><center></td></tr>
                            
                    <tr><td><b>Choose the file To Upload:</b>
</td>
                    <td><INPUT NAME="file" TYPE="file"></td></tr>
                                        <tr><td colspan="2">
<p align="right"><INPUT TYPE="submit" VALUE="Upload" ></p></td></tr>
             <table>
     </center>      
     </FORM>
    </body>
</html>
