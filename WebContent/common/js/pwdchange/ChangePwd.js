function submitFn() {
	if ($("#old_pwd_txt_fake").html() != null && $("#old_pwd_txt_fake").val() == "") {
		_showErrorMsg(fill_old_pwd_msg_key);
	} else if ($("#new_pwd_txt_fake").val() == ""
			|| $("#confirm_pwd_txt_fake").val() == "") {
		_showErrorMsg(fill_both_msg_key);
	}

	else {
		//BMO security resolution
		$("#old_pwd_txt").val($("#old_pwd_txt_fake").val());
		$("#new_pwd_txt").val($("#new_pwd_txt_fake").val());
		$("#confirm_pwd_txt").val($("#confirm_pwd_txt_fake").val());
		$("#old_pwd_txt_fake").val('');
		$("#new_pwd_txt_fake").val('');
		$("#confirm_pwd_txt_fake").val('');
		var _params = $("#changePwdForm").serialize();
		//check if capthca tr is hidden or not.
		var attr = document.getElementById("captchaTR").getAttribute("hidden");
		if(attr==null)
		{
			_params += '&captchaText=1'
		}
		var url = jQuery.contextPath + "/pwdchange/updatePwdAction";
		if($("#showHeaderOptions").val() === "true")
		{
			_showProgressBar(true)
			url = jQuery.contextPath+ "/pathdesktop/portalDashboardAction_updatePwd"
			$.postJSON(url,_params,function(data, textStatus, jqXHR) {
					_showProgressBar(false);
					if (data._error == null)
					{
						$("#pwdDiv").dialog('close');
					}else
					{
						//on error show captcha if it is enabled
						if(data["captchaEnabled"] == "1")
				    	{
				    		document.getElementById("captchaTR").removeAttribute("hidden");
					    	document.getElementById("captchaImageTR").removeAttribute("hidden");
					    	document.getElementById("captchaTR").removeAttribute("style");
					    	document.getElementById("captchaImageTR").removeAttribute("style");
				    	}
						if(document.getElementById("captchaTR").getAttribute("hidden") == null)
						{
							reloadCaptcha();
						}
					}
			});

		}
		else
		{
				$.post(
						url,
						_params,
						function(data, textStatus, jqXHR) {
							if (data._error == null) {
								$('#changePwdForm')
										.attr(
												"action",
												jQuery.contextPath + '/pwdchange/reloginAction');
								submitEncryptedData('changePwdForm');
							}else
							{
								//on errro show captcha if it is enabled
								if(data["model"]["captchaEnabled"] == "1")
						    	{
						    		document.getElementById("captchaTR").removeAttribute("hidden");
							    	document.getElementById("captchaImageTR").removeAttribute("hidden");
							    	document.getElementById("captchaTR").removeAttribute("style");
							    	document.getElementById("captchaImageTR").removeAttribute("style");
						    	}
								if(document.getElementById("captchaTR").getAttribute("hidden") == null)
								{
									reloadCaptcha();
								}
							}
						}, "json");
		}
	}

}

function checkOldPwd() {

	var url = jQuery.contextPath + "/pwdchange/checkOldPwdAction";
	params = {};
	params["oldPwd"] = $("#old_pwd_txt_fake").val();
	$.postJSON(url, params, function(data, status, xhr) {
	    if(typeof data["_error"] != "undefined" && data["_error"] != null)
		{
			// on error show captcha if it is enabled
	    	if(data["model"]["captchaEnabled"] == "1")
	    	{
	    		document.getElementById("captchaTR").removeAttribute("hidden");
		    	document.getElementById("captchaImageTR").removeAttribute("hidden");
		    	document.getElementById("captchaTR").removeAttribute("style");
		    	document.getElementById("captchaImageTR").removeAttribute("style");
	    	}
	    	$("#old_pwd_txt_fake").val("");
		}
	});
}

function relogin() {
	$('#changePwdForm').attr("action",
			jQuery.contextPath + '/j_spring_security_logout');
	submitEncryptedData('changePwdForm');
}
jQuery(document).ready(function() {
	$('#continueLoginBtn').focus();
});

//BMO security and penetration testing, function added to overcome saving of password in browsers
function preparePassChrome()
{
	var elem = document.getElementById('old_pwd_txt_fake')
	if(elem)
	{
		var theParentNode = elem.parentNode;
		theParentNode.removeChild(elem);
	}
	var elem = document.getElementById('new_pwd_txt_fake')
	//on success change password the jsp will reload with only relogin button thus the element will be null.
	if(elem)
	{
		var theParentNode = elem.parentNode;
		theParentNode.removeChild(elem);
	}
	var elem = document.getElementById('confirm_pwd_txt_fake')
	if(elem)
	{
		var theParentNode = elem.parentNode;
		theParentNode.removeChild(elem);
	}
	if($("#old_pwd_txt"))
	{
		$("#old_pwd_txt").after("<input type='text' class='textCompSize ui-state-focus ui-corner-all pwdinput' maxlength='15' id='old_pwd_txt_fake' onchange='checkOldPwd()' autocomplete='off'/>");
	}
	$("#new_pwd_txt").after("<input type='text' class='textCompSize ui-state-focus ui-corner-all pwdinput' maxlength='15' id='new_pwd_txt_fake' autocomplete='off'/>");
	$("#confirm_pwd_txt").after("<input type='text' class='textCompSize ui-state-focus ui-corner-all pwdinput' maxlength='15' id='confirm_pwd_txt_fake' autocomplete='off'/>");
}
// reload captcha image and reset the capthca user text
function reloadCaptcha()
{
	var img = document.getElementById('captchaImage_id');// captcha_id is the id attribute of your caprtcha img
	 var d = new Date();
	img.src = jQuery.contextPath +'/login/unSecureAction_loadCaptcha?'+d.getTime();
	document.getElementById("captchaText_id").value = '';
}

function preventPasteOnPass()
{
	var passArray = ["confirm_pwd_txt_fake","new_pwd_txt_fake","old_pwd_txt_fake"];
	for(var x = 0 ;x<passArray.length; x++)
	{
		var elem = document.getElementById(passArray[x])
		if(elem)
		{
			$(elem).bind({
			    paste: function(event) {event.preventDefault();},
			    drop:function(){return false;},
			    dragstart:function(){return false;},
			    cut:function(event){event.preventDefault();},
			    copy:function(event){event.preventDefault();}
			});
		}
	}
}
