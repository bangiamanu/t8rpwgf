<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>tripbrush - Paint yourself a trip!</title>


<!-- The above code doesn't work in Internet Explorer 6. To address this, we use a conditional comment to specify an alternative style sheet for IE 6 -->
<!--[if IE 6]>
    <style type="text/css">
        html {overflow-y:hidden;}
        body {overflow-y:auto;}
        #page-background {position:absolute; z-index:-1;}
        #content {position:static;padding:10px;}
    </style>
<![endif]-->

<!-- Link to index.css -->
<link rel="stylesheet" type="text/css" href="includes/css/index.css" />
<link rel='stylesheet' type='text/css' href='includes/css/jquery-ui-1.8.16.custom.css' />
<!-- Link to index.js-->

<script type='text/javascript' src='libs/jquery-1.4.4.min.js'></script>
<script type="text/javascript" src="includes/js/index.js"></script>
<script type='text/javascript' src='libs/jquery-ui-1.8.11.custom.min.js'></script>
    <script type='text/javascript' src="includes/js/acct_management.js"></script> <!-- acct_management APIJS -->

<!-- Google Analytics Script -->
<script type="text/javascript">
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-22565085-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
</script>

</head>
<body>
	
    <!-- background picture -->
    <div id="page-background"><img src="includes/images/Back.jpg" width="100%" height="100%">
    </div> <!-- background picture -->

	<!-- Content -->
	<div id="content" align="center">
            
            <div id="index_login_and_signup">
                <table cellpadding="0" cellspacing="5" height="40px" border="0px">
                    <tr>
                        <td align="center"><a href="javascript:acct_management_signIn()"><img src="includes/images/sign_in_icon.png"  /></a></td>
                        <td><a href="javascript:acct_management_signIn()">Log in</a></td>
                    </tr><tr>
                        <td align="center"><a href="javascript:acct_management_signUp()"><img src="includes/images/sign_up_icon.png"  /></a></td>
                        <td><a href="javascript:acct_management_signUp()">Sign up</a></td>
                    </tr>
                </table>                
            </div>

            <div id="facebook">
                <iframe src="http://www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.facebook.com%2Fpages%2FTripbrush%2F144328425633175&amp;layout=box_count&amp;show_faces=true&amp;width=50&amp;action=like&amp;font&amp;colorscheme=light&amp;height=65" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:50px; height:65px;" allowTransparency="true"></iframe>
            </div> <!-- facbebook likes -->


            <div id="logo">
                <img src="includes/images/TripBrushLogo.jpg">
            </div> <!-- logo -->


            <div id="login">
                            <input type="button" value="Let's Paint!" onclick="javascript:showLoginWindow()"  />
            </div> 
        <!-- launching soon -->
	
        </div> <!-- Content -->

		<!-- Login page -->
        <div id="loginblackoverlay">
        </div>  <!-- blackoverlay -->
		<div id="loginwhitecontent">
        <!--[if IE]>
	        <div> <p> We do not support Internet Explorer. Please consider using <a href='http://www.google.com/chrome/' target='_new'>Google Chrome</a>.</p><br/>
	            <p> Over the years, Internet Explorer has become very complex and diverged from web standards. We are a small startup and don't have the resources to support it. However, we do realize that many people still use the browser and intend to support it in a future release</p><br/>
	            <p> Meanwhile, please feel free to use any other browser (like Chrome, FireFox or Safari)</p><br/>

        <input type="button" name="Close" id="Close" value="Close" onclick="javascript:hideLoginWindow()" />
            </div>
        <![endif]-->
        <![if !IE]>
            <div id="dictionary_text">
                  <p>tripbrush <img src="includes/images/speaker.jpg"/> <span style="font-family:Verdana, Geneva, sans-serif;font-weight:normal;font-style:italic"> [trip-bruhsh] </span></p>
                  <p>noun</p>
                  <ol>
                    <li>An exquisite tool that crafts a magical holiday with just a few strokes</li>
                    <li>An implement consisting of bristles attached to a handle that is used for painting, cleaning, and planning vacations</li>
                  </ol>
            </div>
              <div id="loginform">
                  <form action="LoginAction.do" method="post">
                      <input type="hidden" name="command" value="confirm"/>
              <table><tr><td align="right">
                <label for="destination">Destination:</label>
                </td><td>
                <select name="destination" id="destination" onchange="javascript:selectlondon()">
                	<option value="London" selected="selected">London</option>
                        <option value="Dublin">Dublin</option>
                	<option value="Other">Other cities coming soon!</option>
                </select>
                </td></tr><tr><td align="right">
                <label for="fromdate">Start Date:</label>
                </td><td>
                <input type="text" name="fromdate" id="fromdate" value=""/>
                </td></tr><tr><td align="right">
                <label for="howlong">Duration:</label>
                </td><td>
                <select name="howlong" id="howlong" >
                	<option value="1">1 day</option>
                	<option value="2">2 days</option>
                	<option value="3" selected="selected">3 days</option>
                	<option value="4">4 days</option>
                	<option value="5">5 days</option>
                	<option value="6">6 days</option>
                	<option value="7">7 days</option>
                </select>
                </td></tr><tr><td align="right">
                <label for="alpha_password">Password*:</label>
                </td><td>
                <input type="password" name="alpha_password" id="alpha_password" />
               </td></tr></table>
                  
              </div>
              <!-- signupform-->
              <p id="submitbuttons">
                <input type="button" name="Cancel" id="Cancel" value="Cancel" onclick="javascript:hideLoginWindow()" />
                <input type="submit" name="Lets Paint >" id="Lets Paint >" value="Lets Paint >" onclick="return verifypassword()"/>
                <input type="submit" style="display:none" id="realsubmit"/>
              </p>
              </form>
              <br/>
              <p id="footnote">* Would you like a trial account? <a href="mailto:contact@tripbrush.com">Email us</a></p>
            <![endif]>        
          </div><!-- whitecontent -->


          
        <div id="white_out">
        </div><!-- white_out -->

        <div id="sign_in" class="white_dialog">
            <div id="loginmessage"></div>
            <div id="loginerror"></div>
            <div id='loginclose'><img src='includes/images/close.png' id='close_image' onClick='clearAllDialogs()'/></div>
                <form name="sign_in" method="post" id="sign_in" onSubmit="return backend_signIn()">
                        <p style="text-align:center; font-weight:bold; font-size:12px;">Log In</p><br/><br/>
                                        <table cellpadding="0" cellspacing="3" style="margin: 0px auto;">
                                                <tr>
                                                        <td align="right">Email:</td>
                                                        <td><input type=text name="lemail" id="lemail"/></td>
                                                </tr>
                                                <tr>
                                                        <td align="right">Password:</td>
                                                        <td><input type="password" name="lpassword" id="lpassword"/></td>
                                                </tr>
                                                <tr>
                                                        <td colspan="2" align="center">
                                                                <input type="submit" name="Submit" value="Submit" style="font-size:10px"/>
                                                                <input type="button" name="Cancel" value="Cancel" style="font-size:10px" onClick="clearAllDialogs()"/>
                                                        </td>
                                                </tr>
                                                <tr>
                                                        <td colspan="2" align="center">&nbsp; <!-- Error text goes here -->  </td>
                                                </tr>
                                                <tr>
                                                        <td colspan="2" align="center"> ------ OR ------</td>
                                                </tr>
                                                <tr>
                                                        <td colspan="2" align="center">&nbsp;  </td>
                                                </tr>
                                                <tr>
                                                        <td colspan="2" align="center"><a href="javascript:loginfb()"><img src="includes/images/sign_in_with_facebook.png" /></a></td>
                                                </tr>
                                        </table>
                                        <br/><br/>
                                        <p style="text-align:center">Dont have an account? <a href="javascript:acct_management_signUp()">Sign up</a> for one</p>
                                        <p style="text-align:center">I <a href="javascript:acct_management_forgotPassword()">forgot my password</a></p>
                                        <br/>
                </form>
        </div><!-- sign_in -->

        <div id="verify" class="white_dialog">
            <div id='verifyclose'><img src='includes/images/close.png' id='close_image' onClick='clearAllDialogs()'/></div>
            <div id="verifymessage"></div>
            <div id="verifyerror"></div>
            <form name="verify" method="post" id="verify" onSubmit="return backend_verify()">
                        <p style="text-align:center; font-weight:bold; font-size:12px;">Verify Account</p><br/><br/>
                        <div> An email has been sent with a code. Please enter the code</div>                
                        <table cellpadding="0" cellspacing="3" style="margin: 0px auto;">
                                                <tr>
                                                        <td align="right">Email:</td>
                                                        <td><input type=text name="vemail" id="vemail"/></td>
                                                </tr>
                                                <tr>
                                                        <td align="right">Code:</td>
                                                        <td><input type=text name="vcode" id="vcode"/></td>
                                                </tr>
                                                <tr>
                                                        <td colspan="2" align="center">
                                                                <input type="submit" name="Submit" value="Submit" style="font-size:10px"/>
                                                        </td>
                                                </tr>
                                        </table>
                </form>
        </div><!-- verify -->        
        
        <div id="sign_up" class="white_dialog">
            <div id='registerclose'><img src='includes/images/close.png' id='close_image' onClick='clearAllDialogs()'/></div>
            <div id="registermessage"></div>
            <div id="registererror"></div>            
                <form action="LoginAction.do" name="sign_up" method="post" id="sign_up" onSubmit="return backend_signUp()">
                        <input type="hidden" name="command" value="NewUser"/>
                        <p style="text-align:center; font-weight:bold; font-size:12px;">Sign up</p><br/><br/>
                        <table cellpadding="0" cellspacing="3" style="margin: 0px auto;">
                                <tr>
                                        <td align="right">Name:</td>
                                        <td><input type=text name="rname" id="rname"/></td>
                                </tr>
                                <tr>
                                        <td align="right">Email*:</td>
                                        <td><input type=text name="remail" id="remail"/></td>
                                </tr>
                                <tr>
                                        <td align="right">Password*:</td>
                                        <td><input type="password" name="rpassword" id="rpassword"/></td>
                                </tr>
                                <tr>
                                        <td align="right">Password Confirmation*:</td>
                                        <td><input type="password" name="rpassword1" id="rpassword1"/></td>
                                </tr>
                                <tr>
                                        <td colspan="2" align="center">
                                                <input type="submit" name="Submit" value="Submit" style="font-size:10px"/>
                                                <input type="button" name="Cancel" value="Cancel" style="font-size:10px" onClick="clearAllDialogs()"/>
                                        </td>
                                </tr>
                                <tr>
                                        <td colspan="2" align="center">&nbsp;  </td>
                                </tr>
                                <tr>
                                        <td colspan="2" align="center"> ------ OR ------</td>
                                </tr>
                                <tr>
                                        <td colspan="2" align="center">&nbsp;  </td>
                                </tr>
                                <tr>
                                        <td colspan="2" align="center"><img src="includes/images/sign_up_with_facebook.png" /></td>
                                </tr>
                        </table>
                        <br/><br/>
                        <p style="text-align:center">Already have an account? <a href="javascript:acct_management_signIn()">Log in</a></p>
                        <br/>
                </form>
        </div><!-- signUp -->

        <div id="forgot_password" class="white_dialog">
            <div id='forgotclose'><img src='includes/images/close.png' id='close_image' onClick='clearAllDialogs()'/></div>
            <div id="forgotmessage"></div>
            <div id="forgoterror"></div>    
            <form name="forgot_password" method="post" id="forgot_password" onSubmit="return backend_forgotPassword()">
                        <p style="text-align:center; font-weight:bold; font-size:12px;">Forgotten Password</p><br/><br/>
                        <table cellpadding="0" cellspacing="3" style="margin: 0px auto;">
                                <tr>
                                        <td align="center">Please enter the email used while creating an account and we will send you a temporary password<br/></td>
                                </tr>
                                <tr>
                                        <td align="center">Email: <input type=text name="femail" id="femail"/></td>
                                </tr>
                                <tr>
                                        <td align="center">
                                                <input type="submit" name="Submit" value="Submit" style="font-size:10px"/>
                                                <input type="button" name="Cancel" value="Cancel" style="font-size:10px" onClick="clearAllDialogs()"/>
                                        </td>
                                </tr>
                                <tr>
                                        <td align="center">&nbsp; <!-- Error / confirmation text goes here -->  </td>
                                </tr>
                        </table>
                        <p style="text-align:center">&nbsp;</p>
                </form>
        </div><!-- forgot_password -->
          
    
</body>
</html>
