// JavaScript Document
window.onload = function(){
};

function getElement(name) {
    return document.getElementById(name);
}

function showElement(name) {
    getElement(name).style.display = 'block';
}

function hideElement(name) {
    getElement(name).style.display = 'none';
}

function showLoginWindow(){
	showElement("loginblackoverlay");
	showElement("loginwhitecontent");
    var newDate = new Date();
    day = newDate.getDay();
    if (day<5) {
        newDate.setDate(newDate.getDate()+(5-day))
    }
    if (day>5) {
        newDate.setDate(newDate.getDate()+(7-day))
    }
    $( "#fromdate" ).val(getPad(newDate.getDate())+"/"+getPad(newDate.getMonth()+1)+"/"+newDate.getFullYear());
    $( "#fromdate" ).datepicker({ dateFormat: 'dd/mm/yy' ,"defaultDate" : newDate});
    //$( "#fromdate" ).datepicker( "setDate" , newDate)

}

function getPad(input) {
    if (input<10) return "0"+input;
    return input;
}

function hideLoginWindow(){
    hideElement("loginblackoverlay");
    hideElement("loginwhitecontent");
}

function selectlondon() {
    if ($("#destination").val()=="Other") {
        $("#destination").val("London");
    }
}

function verifypassword() {
    var password = $("#alpha_password").val();
    $("#alpha_password").val("XXX");
    var params = "command=validate&password="+password;
    $.ajax({
        type: "POST",
        url: "QueryAction.do",
        cache: false,
        data: params,
        success: function(xml) {

                $(xml).find("result").each(function() {
                    var result= $(this).text();
                    if (result=="OK") {
                        loadPage();
                    }
                    else {
                        unloadPage();
                        alert("Sorry. Wrong Password. Are you sure you're supposed to be here");
                        window.location = "index.html"
                    }
                });
        }
    });
}

