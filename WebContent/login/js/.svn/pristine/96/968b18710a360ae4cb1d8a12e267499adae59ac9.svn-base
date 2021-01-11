var globalVar = null;
		
function loadVKScript(contextPath)
{
	var vkChecked = document.getElementById("enableVKeyboard").checked;
	//check if VKI_attach is undefined that mean the keyboard.js is not loaded yet.
	//and verify if the checkbox is already checked 
	if(typeof VKI_attach === 'undefined' && vkChecked)
	{
		var head = document.getElementsByTagName('head')[0];
		
		//load the css file
		var vkCss = document.createElement('link');
	    vkCss.rel = 'StyleSheet';
	    vkCss.type = 'text/css';
	    vkCss.href= contextPath + '/login/style/keyboard.css';
	    vkCss.media = 'screen';
	    head.appendChild(vkCss);
	    
		//load the js file
		var vkScript = document.createElement('script');
		vkScript.type = 'text/javascript';
		vkScript.src = contextPath + '/login/js/keyboard.js';
		head.appendChild(vkScript);
		
		var userName = document.getElementById("j_username"); 
		userName.onclick = function() { linkClick(userName) };
		
		var password = document.getElementById("passwordInp");
		password.onclick = function() { linkClick(password); };
	}
}

function linkClick(theElement)
{
	var x = document.getElementById("enableVKeyboard").checked;
	
	if(globalVar != theElement)
	{
		VKI_close();
	}
	
	if(x && globalVar!=theElement)
	{
		var child = theElement.nextSibling;
		if (navigator.appName == "Microsoft Internet Explorer")
		{
			child.onclick(event);
		}
		else
		{
			child.onclick(MouseEvent);
		}
		globalVar = theElement;
	}
}
		

function handleSessionToken(login_sessionTimeoutValue,contextPath)
{
	if(!isNaN(login_sessionTimeoutValue))
	{	
		login_sessionTimeoutValue = parseInt(login_sessionTimeoutValue);
		if(login_sessionTimeoutValue > 10)
		{
			login_sessionTimeoutValue = (login_sessionTimeoutValue -10) * 1000;
			setTimeout(function(){ window.location.href = contextPath + "/"; }, login_sessionTimeoutValue);
		}
	}
}

function loginInitialize()
{
	var passInp = document.getElementById("passwordInp") 
	passInp.addEventListener("paste",function(e){e.preventDefault();});
	passInp.addEventListener("drop",function(e){e.preventDefault();});
	passInp.addEventListener("dragstart",function(e){e.preventDefault();});
	passInp.addEventListener("copy",function(e){e.preventDefault();});
	passInp.addEventListener("cut",function(e){e.preventDefault();});
	
	var isInIframe = window.frameElement
	&& window.frameElement.nodeName == "IFRAME" 
	&& window.name && window.name.indexOf("extScreenFrame") == 0;
	if (isInIframe)
	{
		var elem1 = document.getElementById('loginElementsToBeHidden');
		var elem2 = document.getElementById('passwordInp');
		var elem3 = document.getElementById('passwordInptosend');
		var elem4 = document.getElementById('j_username');
		var elem5 = document.getElementById('Login_NameID');
		var elem6 = document.getElementById('test1');
		
		var theParentNode1 = elem1.parentNode;
		var theParentNode2 = elem2.parentNode;
		var theParentNode3 = elem3.parentNode;
		var theParentNode4 = elem4.parentNode;
		var theParentNode5 = elem5.parentNode;
		var theParentNode6 = elem6.parentNode;
		
		theParentNode1.removeChild(elem1);
		theParentNode2.removeChild(elem2);
		theParentNode3.removeChild(elem3);
		theParentNode4.removeChild(elem4);
		theParentNode5.removeChild(elem5);
		theParentNode6.removeChild(elem6);
		if(document.getElementById('captcha_id')!=null)
		{
			removeCaptcha();
		}

	}
	
	
}

function removeCaptcha()
{
	 	var elem1 = document.getElementById('captcha_id');
		var elem2 = document.getElementById('captchaText_id');
		var elem3 = document.getElementById('captchaImage_id');
		var elem4 = document.getElementById('space_id');
		//var elem5= document.getElementById('refreshCaptchaId');

		
		var theParentNode1 = elem1.parentNode;
		var theParentNode2 = elem2.parentNode;
		var theParentNode3 = elem3.parentNode;
		var theParentNode4 = elem4.parentNode;
		//var theParentNode5 = elem5.parentNode;
		
		theParentNode2.removeChild(elem2);
		theParentNode1.removeChild(elem1);
		theParentNode3.removeChild(elem3);
		theParentNode4.removeChild(elem4);
		//theParentNode5.removeChild(elem5);
}

function reloadCaptcha(contextPath)
{
	var img = document.getElementById('captchaImage');// captcha_id is the id attribute of your caprtcha img
	var d = new Date();
	img.src = contextPath.substring(1,contextPath.length)+'/login/unSecureAction_loadCaptcha?'+d.getTime();
	document.getElementById("captchaUserTextId").value = '';
}

