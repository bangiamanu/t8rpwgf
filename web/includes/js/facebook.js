function loadFacebook() {
    FB.init({
        appId      : '329137340449337', // App ID
        channelUrl : '//www.tripbrush.com/channel.html',
        status     : true, // check login status
        cookie     : true, // enable cookies to allow the server to access the session
        xfbml      : true  // parse XFBML
    });
    // Additional initialization code here
}

// Load the SDK Asynchronously
(function(d){
    var js, id = 'facebook-jssdk';
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement('script');
    js.id = id;
    js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    d.getElementsByTagName('head')[0].appendChild(js);
}(document));



function checkLogin() {
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            // the user is logged in and connected to your
            // app, and response.authResponse supplies
            // the user's ID, a valid access token, a signed
            // request, and the time the access token
            // and signed request each expire
            var uid = response.authResponse.userID;
            //var accessToken = response.authResponse.accessToken;
            $("#fbid").val(uid);
            
            //console.log('U' + uid);
            
            var params = "command=FBLogin&code="+uid+"&name=&email=";
            $.ajax({
                type: "POST",
                url: "LoginAction.do",
                cache: false,
                data: params,
                success: parseFBLogin
            });                        
        } else if (response.status === 'not_authorized') {
            // the user is logged in to Facebook,
            //but not connected to the app
            // console.log('NOT');
        } else {
            //console.log('NOT LOGGED');
            // the user isn't even logged in to Facebook.
        }
    });
}

function parseFBLogin(xml) {
    $.xmlDOM( xml ).find("result").each(function() {
        var user = $(this).text();
        $("#user_first_name").html(user);
        $("#loggedin").val("facebook");
        $("#cname").html(user);
 	$(".signed_in_or_out").toggle(); // this changes the toolbar from signed out to signed in and vice versa.
        clearAllDialogs();
        backend_populateSavedTrips();             
    });    
}

function validatePlan() {
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            var uid = response.authResponse.userID;
            $("#fbid").val(uid);
            var params = "command=FBLogin&code="+uid+"&name=&email=";
            $.ajax({
                type: "POST",
                url: "LoginAction.do",
                cache: false,
                data: params,
                success: function(xml) {
                    parseFBLogin(xml);
                    validateFriend();
                }
            });             
            
        } else if (response.status === 'not_authorized') {
            alert("You must authorize this application for use. Please log-in to facebook to modify your privacy settings")
        } else {
            loginfriend();
        }
    });    
}

function loginfriend() {
    FB.login(function(response) {
        if (response.authResponse) {
            user = response.authResponse.userID;
            $("#fbid").val(user);
            validateFriend();
        } else {
            $("#container").html("Not authorised");
        }
    }, {
        scope: 'email,publish_stream'
    });

}

function validateFriend() {
    keypass = $("#ofbid").val();
    loadPlanB = false;
    if ($("#fbid").val()==keypass) {
        loadPlanB = true;
    }
    else {
        FB.api(  
        {  
            method: 'fql.query', 
            query: 'SELECT uid1 FROM friend WHERE uid2='+$("#fbid").val() 
        }, 
        function(response) { 
            //once we get the response of above select query we are going to parse them 
            for(i=0;i<response.length;i++) 
            { 
                if (keypass==response[i].uid1) {
                    loadPlan = true;
                    break;
                }
            }
        });
    }
    if (loadPlanB) {
        alert("You are not authorised to see this plan");        
    }
    else {
        var params = "command=GetUserByPlanKey&fid="+$("#fbid").val();
        $.ajax({
            type: "POST",
            url: "ShareAction.do",
            cache: false,
            data: params,
            success: processLoadPlan
        }); 
    }
}
    
function postToFacebook(picture,message,link) {
    console.log("Facebook" + message + " " + link);
    /*FB.api('/me/feed', 'post', {
        message: message,
        picture: picture,
        link: link
    }, function(response) {
        if (!response || response.error) {
            console.log('Error occured' + response.error.message);
        } else {
            console.log('Post ID: ' + response);
        }
    }); */   
}

function loginfb() {
    FB.login(function(response) {
        if (response.authResponse) {
            //console.log('Welcome!  Fetching your information.... ');
            user = response.authResponse.userID;
            //token = response.authResponse.accessToken;
            $("#fbid").val(user);
            FB.api('/me', function(response) {
                var params = "command=FBLogin&name="+response.name+"&email="+response.email+"&code="+user;
                $.ajax({
                    type: "POST",
                    url: "LoginAction.do",
                    cache: false,
                    data: params,
                    success: parseFBLogin
                });  
                postToFacebook("",response.name +" is now using tripbrush","http://www.tripbrush.com");
                //console.log('Good to see you, ' + response.name + '.' + response.email + '.' + user + '.' + token);
            });
        } else {
            console.log('User cancelled login or did not fully authorize.');
        }
    }, {
        scope: 'email,publish_stream'
    });

}

function logoutfb() {
    FB.logout(function(response) {
        //console.log('Logged out.');
        var params = "command=FBLogout";
        $.ajax({
            type: "POST",
            url: "LoginAction.do",
            cache: false,
            data: params,
            success: parseFBLogout
        });  
    });
}

function parseFBLogout(xml) {
    processLogout(xml);
}