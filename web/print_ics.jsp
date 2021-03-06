<%@ page import="uk.tripbrush.util.Constant"%>
<%@ page import="uk.tripbrush.model.core.*"%>
<%@ page import="uk.tripbrush.service.*"%>
<%@ page import="java.io.*"%>

<html>
    <body>
       
<%
        Plan plan = (Plan)session.getAttribute(Constant.SESSION_PLAN);
        if (plan!=null) {
            Database.beginTransaction();
            String filename = PlanService.createICSFile(plan);
            Database.commitTransaction();

            OutputStream outStream = response.getOutputStream();
            if (!filename.equals("")) {
                File file = new File(filename);
                response.setContentType( "text/calendar" );
                //response.setContentType( "application/octet-stream" );

                response.setContentLength((int)file.length());
                response.setHeader("Content-Disposition","attachment; filename=\"Calendar.ics\"");

                response.setHeader("Cache-Control", "no-cache");
                //response.setHeader("Cache-Control", "max-age=60");
                byte[] buf = new byte[8192];
                FileInputStream inStream = new FileInputStream(file);
                int sizeRead = 0;
                while ((sizeRead = inStream.read(buf, 0, buf.length)) > 0) {
                    outStream.write(buf, 0, sizeRead);
                }
                inStream.close();
                outStream.close();
            }
        }
%>

</body>
</html>
