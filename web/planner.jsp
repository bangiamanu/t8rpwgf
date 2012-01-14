<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Tripbrush - paint yourself a trip!</title>

    <!-- Stylesheet -->
    <link rel="stylesheet" href="includes/css/plannerv10.css" />

    <!-- Javascript -->
    <script type="application/javascript" src="includes/js/plannerv10.js"></script> <!-- Standard JS -->
    <script type='text/javascript' src="includes/js/data_loader.js"></script> <!-- Event Data-->
    <script type='text/javascript' src="includes/js/calendar_helper.js"></script> <!-- Calendar Helper JS -->
    <script type='text/javascript' src="includes/js/calendar_and_map_api.js"></script> <!-- Calendar and map APIJS -->
    <script type='text/javascript' src="includes/js/list_api.js"></script> <!-- List APIJS -->
    <script type='text/javascript' src="includes/js/print_api.js"></script> <!-- Print APIJS -->
    <script type='text/javascript' src="includes/js/done_button_api.js"></script> <!-- Print APIJS -->
    <script type='text/javascript' src="includes/js/directions_api.js"></script> <!-- Directions APIJS -->
    <script type='text/javascript' src="includes/js/directions_cache.js"></script> <!-- Directions APIJS -->
    <script type='text/javascript' src="includes/js/sizing.js"></script> <!-- Sizing APIJS -->
    <script type='text/javascript' src="includes/js/back_end.js"></script> <!-- Sizing APIJS -->
    <script type='text/javascript' src="includes/js/acct_management.js"></script> <!-- acct_management APIJS -->

    <!-- Feedback button from UserVoice
             URL: www.uservoice.com Commented because it takes forever to load. Will / should uncomment upon deployment
    <script type="text/javascript">
      var uvOptions = {};
      (function() {
            var uv = document.createElement('script'); uv.type = 'text/javascript'; uv.async = true;
            uv.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'widget.uservoice.com/l3uTJFGEljmmexUUy9dZmg.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(uv, s);
      })();
    </script>-->


    <!-- JQuery Calendar Files -->
    <!-- URL: https://github.com/themouette/jquery-week-calendar/tree/gh-pages -->

    <!-- JQuery calendar CSS -->
    <link rel='stylesheet' type='text/css' href='libs/css/smoothness/jquery-ui-1.8.11.custom.css' />
    <link rel='stylesheet' type='text/css' href='libs/css/jquery.weekcalendar.css' />
    <link rel="stylesheet" type="text/css" href="includes/css/skins/default.css" />
    <link rel="stylesheet" type="text/css" href="includes/css/skins/gcalendar.css" />

    <!-- JQuery calendar JS -->
    <script type='text/javascript' src='libs/jquery-1.4.4.min.js'></script>
    <script type='text/javascript' src='libs/jquery-ui-1.8.11.custom.min.js'></script>
    <script type="text/javascript" src="libs/date.js"></script>
    <script type='text/javascript' src='libs/jquery.weekcalendar.js'></script>


    <!-- Google Maps Javascripts -->
    <script type="text/javascript"
        src="http://maps.googleapis.com/maps/api/js?sensor=false">
    </script>

    <!-- Javascript date formatting library
		 URL: http://www.svendtofte.com/javascript/javascript-date-string-formatting/
		 PHP formats: http://uk3.php.net/manual/en/function.date.php -->
    <script type='text/javascript' src="libs/formatdate.js"></script> <!-- Calendar JS -->

    <script type="text/javascript">
            /********************** Window onload and resize code **********************/

            window.onload = function(){
                    // For some reason, the stupid calendar hgeight doesnt work on ready and has to be called on window.load. Dont knwo why.
                    $('#calendar').weekCalendar("option","height", function($calendar){
                            return window.innerHeight - 0.45*window.innerHeight - 80;
                    });

            };

            // using document.ready instead of window.onload
            $(document).ready(function() {
                    // calling ready functions of APIs and other javascript files
                    calendar_and_map_api_ready();
                    sizing_ready();
                    backend_ready();
                    acct_management_ready();
                    done_button_api_ready();
                    directions_api_ready();
            });


            window.onresize = function(){
                    sizing_divsResize();
            };
    </script>

</head><!-- head -->


<body>

    <div id="container">

        <div id="toolbar">
            <img id="logo" src="includes/images/tripbrushlogo_inverted_small.png" alt="Logo" width="138" height="30" />
            <div id="loginactions">
				<div id="signed_in" class="signed_in_or_out" style="display:none;">
					<table cellpadding="0" cellspacing="3" height="40px" border="0px">
						<tr>
							<td><a href="javascript:acct_management_signIn()"><img src="includes/images/sign_in_icon.png" /></a></td>
							<td><a href="javascript:acct_management_signIn()">Log in</a></td>
							<td width="20px">&nbsp;</td>
							<td><a href="javascript:acct_management_signUp()"><img src="includes/images/sign_up_icon.png" /></a></td>
							<td><a href="javascript:acct_management_signUp()">Sign up</a></td>
						</tr>
					</table>
				</div>
				<div id="signed_out" class="signed_in_or_out">
					<table cellpadding="0" cellspacing="3" height="40px" border="0px">
						<tr>
							<td>Welcome <div id="user_first_name"></div></td>
							<td width="20px">&nbsp;</td>
							<td class="saved_trips"><a href="javascript:acct_management_showSavedTrips()"><img src="includes/images/saved_trips_icon.png"/></a></td>
							<td class="saved_trips"><a href="javascript:acct_management_showSavedTrips()">Saved trips</a></td>
							<td width="20px">&nbsp;</td>
							<td><a href="javascript:acct_management_showProfile()"><img src="includes/images/profile_icon.png" /></a></td>
							<td><a href="javascript:acct_management_showProfile()">Profile</a></td>
							<td width="20px">&nbsp;</td>
							<td><a href="javascript:acct_management_logOut()"><img src="includes/images/log_out_icon.png" /></a></td>
							<td><a href="javascript:acct_management_logOut()">Log out</a></td>
						</tr>
					</table>
				</div>
	        </div><!-- loginactions -->
		</div><!-- toolbar -->

        <div id="categorynamecolumn">
          <div class="headingtext">
            What would you like to do?
          </div>

          <div id="divider"></div>

			<div id="categories_list"></div> <!-- this is populated by the populateCategories() function -->


          <form id="categoryform">
            <input type="hidden" id="selectedcategory" value=""/>
          </form>

        </div><!-- categorynamecolumn -->

        <div id="categorydescriptionheading">
          <div class="headingtext">
            Where would you like to go?
          </div> <!-- headingtext -->
        </div> <!-- destinationheadingtext -->

        <div id="categorydescriptioncolumn">
                <ul>
                        <div id="destinations_list"></div> <!-- this is populated by the populateDestinations(category) function -->
                </ul>
        </div><!-- categorydescriptioncolumn-->

        <div id="destination_details_pane">
                <img src="includes/images/close.png" onclick="javascript:sizing_expand()" id="close_image" width="15px" height="15px"/>
                <div id="tab_container" style="width:100%; height:100%;">
                        <div class="tab-box">
                        <a href="javascript:;" class="tabLink activeLink" id="cont-1">Details</a>
                        <a href="javascript:;" class="tabLink " id="cont-2">Hours</a>
                        <a href="javascript:;" class="tabLink " id="cont-3">Images</a>
                        </div>

                        <div class="tabcontent" id="cont-1-1">
                                <div id="destination_details"></div>
                        </div>

                        <div class="tabcontent hide" id="cont-2-1">
                                <p>This attaraction is open during the following times:</p>
                                <div id="destination_hours"></div>
                        </div>

                        <div class="tabcontent hide" id="cont-3-1">
                        </div>
                </div>
        </div><!-- destination_details_pane-->

        <div id="calendarcontainer" onMouseOver="done_button_api_showDoneButton()" onMouseOut="done_button_api_hideDoneButton()">
			<div id="done_button">
				<img src="includes/images/done_button.png" onMouseOver="done_button_api_setDoneToOpaque()" onMouseOut="done_button_api_setDoneToTranslucent()" onClick="done_button_api_toggleDoneMenu()" />
			</div>
			<div id="done_menu" onMouseOver="done_button_api_setDoneToOpaque()" onMouseOut="done_button_api_setDoneToTranslucent()" >
				<img src="includes/images/close.png" id="done_close_button" onClick="done_button_api_hideDoneMenu()"/>
				<table cellpadding="0" cellspacing="3">
					<tr>
                        <td align="center"><a href="javascript:print_api_printEvents()"><img src="includes/images/print_icon.png" width="30" height="28" /></a></td>
						<td><a href="javascript:print_api_printEvents()">Print</a></td>
					</tr>
					<tr>
						<td align="center"><img src="includes/images/email_icon.png" width="28" height="28" /></td>
						<td>Email</td>
					</tr>
					<tr>
						<td align="center"><img src="includes/images/save_icon.png" width="24" height="28" /></td>
						<td>Save</td>
					</tr>
					<tr>
						<td align="center"><img src="includes/images/facebook_icon.png" width="24" height="28" /></td>
						<td>Share on facebook</td>
					</tr>
				</table>
			</div>
            <div id='calendar'></div>
        </div><!-- calendarcontainer -->

        <div id="mapcontainer">
			<div id="map_canvas" style="width:100%; height:100%; float:left;"></div>
	</div><!-- mapcontainer -->

        <div id="white_out">
        </div><!-- white_out -->

        <div id="sign_in" class="white_dialog">
                <form name="sign_in" method="post" id="sign_in" onSubmit="backend_signIn()">
                        <p style="text-align:center; font-weight:bold; font-size:12px;">Log In</p><br/><br/>
                                        <table cellpadding="0" cellspacing="3" style="margin: 0px auto;">
                                                <tr>
                                                        <td align="right">Email:</td>
                                                        <td><input type=text name="email" id="email"/></td>
                                                </tr>
                                                <tr>
                                                        <td align="right">Password:</td>
                                                        <td><input type=text name="Password" id="password"/></td>
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
                                                        <td colspan="2" align="center"><img src="includes/images/sign_in_with_facebook.png" /></td>
                                                </tr>
                                        </table>
                                        <br/><br/>
                                        <p style="text-align:center">Dont have an account? <a href="javascript:acct_management_signUp()">Sign up</a> for one</p>
                                        <p style="text-align:center">I <a href="javascript:acct_management_forgotPassword()">forgot my password</a></p>
                                        <br/>
                </form>
        </div><!-- sign_in -->

        <div id="sign_up" class="white_dialog">
                <form name="sign_up" method="post" id="sign_up" onSubmit="backend_signUp()">
                        <p style="text-align:center; font-weight:bold; font-size:12px;">Sign up</p><br/><br/>
                        <table cellpadding="0" cellspacing="3" style="margin: 0px auto;">
                                <tr>
                                        <td align="right">Name:</td>
                                        <td><input type=text name="user_first_name" id="user_first_name"/></td>
                                </tr>
                                <tr>
                                        <td align="right">Email*:</td>
                                        <td><input type=text name="email" id="email"/></td>
                                </tr>
                                <tr>
                                        <td align="right">Password*:</td>
                                        <td><input type=text name="Password" id="password"/></td>
                                </tr>
                                <tr>
                                        <td align="right">Password Confirmation*:</td>
                                        <td><input type=text name="Password1" id="password1"/></td>
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
                <form name="forgot_password" method="post" id="forgot_password" onSubmit="backend_forgotPassword()">
                        <p style="text-align:center; font-weight:bold; font-size:12px;">Forgotten Password</p><br/><br/>
                        <table cellpadding="0" cellspacing="3" style="margin: 0px auto;">
                                <tr>
                                        <td align="center">Please enter the email used while creating an account and we will send you a temporary password<br/></td>
                                </tr>
                                <tr>
                                        <td align="center">Email: <input type=text name="email" id="email"/></td>
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

        <div id="saved_trips" class="white_dialog">

        </div><!-- saved_trips -->

        <div id="profile" class="white_dialog">
                <table>
                        <tr>
                                <td colspan="2"> <b>Change password</b></td>
                        </tr>
                        <tr>
                                <td>Old password</td>
                                <td><input type="text" id="old_password" name="old_password" /></td>
                        </tr>
                        <tr>
                                <td>New password</td>
                                <td><input type="text" id="new_password" name="new_password" /></td>
                        </tr>
                        <tr>
                                <td>New password (confirmation)</td>
                                <td><input type="text" id="new_password1" name="new_password1" /></td>
                        </tr>
                        <tr>
                                <td colspan="2" align="center">
                                        <input type="submit" name="Submit" value="Submit" style="font-size:10px"/>
                                        <input type="button" name="Cancel" value="Cancel" style="font-size:10px" onClick="clearAllDialogs()"/>
                                </td>
                        </tr>
                        <tr>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                        </tr>
                        <tr>
                                <td colspan="2"> <b>Change Name</b></td>
                        </tr>
                        <tr>
                                <td>Name</td>
                                <td><input type="text" id="user_first_name" name="user_first_name" /></td>
                        </tr>
                        <tr>
                                <td colspan="2" align="center">
                                        <input type="submit" name="Submit" value="Submit" style="font-size:10px"/>
                                        <input type="button" name="Cancel" value="Cancel" style="font-size:10px" onClick="clearAllDialogs()"/>
                                </td>
                        </tr>
                        <tr>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                        </tr>
                        <tr>
                                <td colspan="2"> <b>Add / Remove facebook account</b></td>
                        </tr>
                        <tr>
                                <td>Facebook stuff goes here</td>
                                <td>Facebook stuff goes here</td>
                        </tr>
                        <tr>
                                <td colspan="2" align="center">
                                        <input type="submit" name="Submit" value="Submit" style="font-size:10px"/>
                                        <input type="button" name="Cancel" value="Cancel" style="font-size:10px" onClick="clearAllDialogs()"/>
                                </td>
                        </tr>
                </table>
        </div><!-- profile -->

    </div><!-- container -->

    <!-- **************** guideboxes **************** -->
    <div id="guidebox1">
	</div>
    <div id="guidebox1text">
        <p style="color:#36c" align="center"><b>Step 1</b></p><br />
        <p style="padding-bottom:2px">&lt;&lt; Choose what you would like to do</p>
        <p style="font-size:10px;padding-bottom:2px">(hint: select "All destinations" to see all options)</p><br />
        <p style="font-size:10px">I already know how to use this website - <a href="javascript:endTutorial()">End Tutorial</a></p>
    </div>

    <div id="guidebox2">
	</div>
    <div id="guidebox2text">
        <p style="color:#36c" align="center"><b>Step 2</b></p><br />
        <p style="padding-bottom:2px">&lt;&lt; Choose where you would like to go</p>
        <p style="font-size:10px">(hint: select "All destinations" if you dont see anything)</p>
    </div>

    <div id="guidebox3">
	</div>
    <div id="guidebox3text">
        <p style="color:#36c" align="center"><b>Step 3</b></p><br />
        <p style="padding-bottom:2px"> Read the description below and click "Add"</p>
        <p style="font-size:10px">(hint: check out the other tabs such as Pics, Reviews etc.)</p>
    </div>

    <div id="guidebox4text">
        <p style="padding-bottom:2px;color:#36c" align="center"><b>Your calendar was updated. Some tips:</b></p>
        <ul>
        	<li>Scroll the calendar to see your events</li>
        	<li>You can drag the events around using your mouse</li>
        	<li>You can make them longer or shorter</li>
        	<li>Click settings link at the top for more options</li>
        </ul>
        <p style="padding-bottom:2px;color:#36c" align="center">Happy Planning!</p>
        <p style="font-size:10px"><a href="javascript:endTutorial()">Close</a></p
    ></div>

</body>
</html>
