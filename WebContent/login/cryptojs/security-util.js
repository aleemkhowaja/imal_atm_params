function submitEncryptedData(formId,includeSessionToken,containsFileInput)
{
	if (typeof CryptoJS !== 'undefined') 
	{
		aes_submitEncryptedData(formId,includeSessionToken,containsFileInput);
	}
	else
	{
		document.getElementById(formId).submit();
	}
	securityutil_lastAjaxSubmitDate = new Date();
}

function returnEncryptedData(data,includeSessionToken)
{
	if (typeof CryptoJS !== 'undefined') 
	{
		return aes_returnEncryptedData(data,includeSessionToken);
	}
	else
	{
		return data;
	}
}

function ajaxEncryptOptionsData(options)
{
	if (typeof CryptoJS !== 'undefined'
		&& options != undefined && options != null) 
	{	
		var ajaxURL = options.url;
		var urlParams = '';
		var newAjaxURL = '';
		
		if(ajaxURL.indexOf("?") != -1 && ajaxURL.indexOf("PATHPARAM") == -1 )
		{
			newAjaxURL = ajaxURL.substring(0, ajaxURL.indexOf("?"));
			urlParams = ajaxURL.substring(ajaxURL.indexOf("?") + 1, ajaxURL.length);
			options.url = newAjaxURL;
		}	
		if(urlParams != '' )
		{
			if( options.data == undefined || options.data == null  ||  options.data == '' )
			{
				options.data = urlParams;
			}
			else if(options.data != undefined && options.data != null &&  options.data != '')
			{
				options.data =  options.data + '&' + urlParams;
			}
		}
		
		if(options.data != undefined && options.data != null &&  options.data != '')
		{
			options.data = returnEncryptedData(options.data);
		}
	}
}

function anchorEncryptHrefParams()
{
	if (typeof CryptoJS !== 'undefined')
	{ 
		 $('.encdata').each(function() {
			var initialHref = this.href;
			var newHrefURL = returnEncryptedUrl(initialHref);
			$(this).attr("href", newHrefURL);
			$(this).removeClass("encdata");
		 });
	} 
}

function returnEncryptedUrl(initialUrl)
{
	if (typeof CryptoJS !== 'undefined')
	{
		var urlParams = '';
		var newHrefURL = '';
		if(initialUrl.indexOf("?") != -1 && initialUrl.indexOf("PATHPARAM") == -1)
		{
				newHrefURL = initialUrl.substring(0, initialUrl.indexOf("?"));
				urlParams = initialUrl.substring(initialUrl.indexOf("?") + 1,initialUrl.length);
				initialUrl = newHrefURL + '?' + returnEncryptedData(urlParams);
		}
	}
	return initialUrl;
}


/* session timeout handler */
var securityutil_sessionIntervalObj = null;
var securityutil_lastMouseMoveDate = new Date();
var securityutil_lastAjaxSubmitDate = new Date();

var securityutil_sessionTimeoutObj = null;
var securityutil_idleTimeoutValue = null;
var securityutil_sessionTimeoutProcessInitialized = false;
var securityutil_sessionTimeoutProcessOnHold = false;
var securityutil_dummyActionDate = new Date();
 
if(window.jQuery != undefined && window.jQuery != 'undefined' &&  window.jQuery != null)
{
	$(document).ready(function(){
		// TP #918272 - Import JS sysend.js file to send and receive messages
		$.struts2_jquery.require("sysend.js" ,null,jQuery.contextPath+"/login/sysendjs/");
		
		if(appName == null || typeof appName  == 'undefined' || appName == undefined )
		{
			appName = "";
		}
		// TP #918272 - On message received listener (Message received from other tabs/Windows via sysend)
		sysend.on('pathClearTimeout_' + appName, function(message) {
			sessionTimeoutMouseMoveHandler(true);
		});
		sysend.on('pathRefresh_' + appName, function(message) {
			callDummyActionToRefreshSession();
		});
	});
}

function startSessionTimeoutListener(usersecurityutil_idleTimeoutValue)
{
	if(usersecurityutil_idleTimeoutValue != undefined &&  usersecurityutil_idleTimeoutValue != null && !isNaN(usersecurityutil_idleTimeoutValue))
	{
		$(document).ready(function() {
			securityutil_idleTimeoutValue = usersecurityutil_idleTimeoutValue;
			//check on max number allowed for setTimeout, and then set the max allowed value 2000000 which is 23 days.
			if(parseInt(securityutil_idleTimeoutValue)*1000 > 2147483647)
			{
				securityutil_idleTimeoutValue = '2000000';
			}
			securityutil_sessionTimeoutObj = setTimeout(function(){ 
	
				callSessionTimeout();
		
			}, parseInt(securityutil_idleTimeoutValue)*1000);
		
			$(document).on( "mousemove keypress click", sessionTimeoutMouseMoveHandler);
			
			securityutil_sessionIntervalObj = setInterval(sessionRefreshHandler, 1000);
			
			securityutil_sessionTimeoutProcessInitialized = true;
		});
	}
}

function sessionTimeoutMouseMoveHandler(fromSysend)
{
	if( typeof securityutil_sessionTimeoutProcessInitialized  !== 'undefined' && securityutil_sessionTimeoutProcessInitialized == true
		&& typeof securityutil_sessionTimeoutObj  !== 'undefined' && securityutil_sessionTimeoutObj != undefined  && securityutil_sessionTimeoutObj != null 
		&& typeof securityutil_idleTimeoutValue !== 'undefined' && securityutil_idleTimeoutValue != undefined && securityutil_idleTimeoutValue != null)
	{
		if(fromSysend !== true)
		{
			if(appName == null || typeof appName  == 'undefined' || appName == undefined )
			{
				appName = "";
			}
			// TP #918272 - Send message via sysend to other tabs/Windows to clear timeout
			sysend.broadcast('pathClearTimeout_' + appName);
		}
		
		clearTimeout(securityutil_sessionTimeoutObj);
		securityutil_sessionTimeoutObj = setTimeout(function(){ 

			callSessionTimeout();
	
		}, parseInt(securityutil_idleTimeoutValue)*1000);
		securityutil_lastMouseMoveDate = new Date();
	}
}

function callSessionTimeout()
{
	if(!securityutil_sessionTimeoutProcessOnHold)
	{	
		$.ajax({
			url: jQuery.contextPath+ "/pathdesktop/DesktopAction_invalidateSession",
	  		type:"post",
	  		dataType:"json",
	  		success: function(data)
	  		{
				callDummyActionToRefreshSession();
				
				if(appName == null || typeof appName  == 'undefined' || appName == undefined )
				{
					appName = "";
				}
				// TP #918272 - Send message via sysend to other tabs/Windows to force refresh when sessionTimeout
				sysend.broadcast('pathRefresh_' + appName);
	  		}
		});
	}
}

function sessionRefreshHandler() 
{
    var mouseMoveTimeout = new Date( securityutil_lastMouseMoveDate.getTime() + (securityutil_idleTimeoutValue*1000) );
    var ajaxSubmitTimeout = new Date( securityutil_lastAjaxSubmitDate.getTime() + (securityutil_idleTimeoutValue*1000) );
    
    var ajaxSubmitTimeout_start = new Date( ajaxSubmitTimeout.getTime() );
    ajaxSubmitTimeout_start.setSeconds(ajaxSubmitTimeout_start.getSeconds() - 10)
    
    var currentDate = new Date();
    
    if(ajaxSubmitTimeout.getTime() < mouseMoveTimeout.getTime()
    		&& currentDate.getTime() > ajaxSubmitTimeout_start.getTime() 
    		&& currentDate.getTime() < ajaxSubmitTimeout.getTime()
    		&& securityutil_dummyActionDate.getTime() < ajaxSubmitTimeout_start.getTime() )
    {
    	callDummyActionToRefreshSession();
    }
}

function putSessionTimeoutProcessOnHold()
{
	securityutil_sessionTimeoutProcessOnHold = true;
	if( typeof securityutil_sessionTimeoutObj  !== 'undefined' && securityutil_sessionTimeoutObj != undefined  && securityutil_sessionTimeoutObj != null )
	{
		clearTimeout(securityutil_sessionTimeoutObj);
	}
}

function resumeSessionTimeoutProcess()
{
	securityutil_sessionTimeoutProcessOnHold = false;
	sessionTimeoutMouseMoveHandler();
}


function callDummyActionToRefreshSession()
{
	$.ajax({
			url: jQuery.contextPath+ "/path/dummy/DummyAction",
	  		type:"post",
	  		dataType:"json",
	  		success: function(data)
	  		{
	  			securityutil_dummyActionDate = new Date();
	  		}
	});
}

/* end session timeout handler */

/* block browser developer mode - F12 */
if(typeof blockF12 !== 'undefined' && blockF12 == 'true')
{
	var securityutil_isFirefox  = /firefox/i.test(navigator.userAgent);
	var securityutil_regExpForF12 = /./;
	var securityutil_elementForF12 = new Image();
	var securityutil_blockF12Interval = null; 
	var securityutil_blockF12Message = '<br><div style="width: 90%; margin: 0px auto; text-align:center;"> Browser development mode not allowed. Please refresh your session (F5). </div>'; 

	if(securityutil_isFirefox == true)
	{	
		(function () {
			'use strict';
			var devtools = {
				open: false,
				orientation: null
			};
			var threshold = 160;
			var emitEvent = function (state, orientation) {
				window.dispatchEvent(new CustomEvent('devtoolschange', {
					detail: {
						open: state,
						orientation: orientation
					}
				}));
			};
		
			setInterval(function () {
				var widthThreshold = window.outerWidth - window.innerWidth > threshold;
				var heightThreshold = window.outerHeight - window.innerHeight > threshold;
				var orientation = widthThreshold ? 'vertical' : 'horizontal';
		
				if (!(heightThreshold && widthThreshold) &&
		      ((window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) || widthThreshold || heightThreshold)) {
					if (!devtools.open || devtools.orientation !== orientation) {
						emitEvent(true, orientation);
					}
		
					devtools.open = true;
					devtools.orientation = orientation;
				} else {
					if (devtools.open) {
						emitEvent(false, null);
					}
		
					devtools.open = false;
					devtools.orientation = null;
				}
			}, 500);
		
			if (typeof module !== 'undefined' && module.exports) {
				module.exports = devtools;
			} else {
				window.devtools = devtools;
			}
		})();
	}
	
	securityutil_regExpForF12.toString = function() {
		document.body.innerHTML = securityutil_blockF12Message;
		clearInterval(securityutil_blockF12Interval);
	};
	
	
	Object.defineProperty(securityutil_elementForF12, 'id', {
		  get: function () {
			  document.body.innerHTML = securityutil_blockF12Message;
			  clearInterval(securityutil_blockF12Interval);
		  }
		});
	
	securityutil_blockF12Interval = setInterval(function() {
		console.clear();
	    console.log(securityutil_elementForF12);
	    if(!!window.chrome == false)
	    {
	    	console.log(securityutil_regExpForF12);
	    }
	
	}, 1000);
	
	if(securityutil_isFirefox == true)
	{
		window.addEventListener('devtoolschange', function (e) {
			document.body.innerHTML = securityutil_blockF12Message;
			clearInterval(securityutil_blockF12Interval);
		});
	}
}
/* End block browser developer mode - F12 */