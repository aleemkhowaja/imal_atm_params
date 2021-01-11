/**
 * The alertEngine is the js object that will manage the alerts process. One instance of this object exists by browser session.
 * To tabs inside a browser instance will share the same HttpSession so they will share the same alertEngine instance.
 * @param {Object} destinationName 
 * @param {Object} destinationType
 * @param {Object} contextPath
 * @param {Object} usrCompBr
 */
var alertEngine = {

	amq : null, /* this property is the activeMq js object that will manage the http communication with the AlertsAjaxServlet */
	// Path-Solutions - Fix Websphere Issue #177853
	//timeout : 100000, /* this property is the timeout in seconds. the http request will wait this time before that it will be finished and returned to the browser. More than 24H=86400s */
	destinationName : null, /* the destination name is the concatenation of the destination prefix + '_' + userId */
	destinationType : 'topic', /* the desitnation type can be 'topic' or 'queue'. In Alerts we are using topics */
	destinationPrefix : 'PATH_DESTINATION_', /* the destination prefix is used to distinguish between alerts topic and any other topics that may be created*/
	usrCompBr : null, /* the usrCompBr used in the selector at the listener level*/
	servletIp : null, /* the servletIp is the address IP of the alert ajax servlet*/
	servletUrl : '/path/AlertsAjaxServlet', /* the AlertsAjaxServlet url defined also in web.xml */
	contextPath : null, /* the context path passed in parameters. Because we cannot use directly Jquery context path */
	applicationName : null, /* the application name used in the consumer filter to filter the JMS messages by application name */
	isAlertEnabled : null, /* flag to indicate if alert is enabled */
	isLoginAlertEnabled : null, /* flag to indicate if login alert is enabled */
	isClusterEnabled : null, /*flag to indicate if clustering is enabled*/
	manuelLogout : false, /*flag to indicate if the logout button has been clicked*/
	/*
	 * This function is called inside the AppMain.jsp to initialize the amq object , create the listener (JMS consumer) and start polling
	 * @param {Object} destinationName
	 * @param {Object} destinationType
	 * @param {Object} contextPath
	 * @param {Object} usrCompBr
	 */
	start : function(alertParams) {
		alertEngine.amq = org.activemq.Amq;
		alertEngine.contextPath =alertParams["contextPath"];
		alertEngine.destinationName = alertParams["destinationName"]; 
		alertEngine.destinationType = alertParams["destinationType"]; 
		alertEngine.usrCompBr = alertParams["usrCompBr"];
		alertEngine.applicationName = alertParams["applicationName"];
		alertEngine.isAlertEnabled = alertParams["isAlertEnabled"];
		alertEngine.isLoginAlertEnabled = alertParams["isLoginAlertEnabled"];
		alertEngine.isClusterEnabled = alertParams["isClusterEnabled"];
		alertEngine.servletIp = alertParams["servletIp"];
		alertEngine.subscribeUser();
	},

	/*
	 * This function will initialize the amq and create a listener
	 * On initialize , the continuePolling is set to true. The continuePolling is used to stop/start polling.
	 */
	subscribeUser : function() {
		
		if (alertEngine.destinationName != null && alertEngine.destinationName != '') {
			alertEngine.amq.init( {
				uri : alertEngine.contextPath + alertEngine.servletUrl,
				logging : false, 
				customErrorHandler : alertEngine.alertsCustomErrorHandler,
				/*timeout : alertEngine.timeout,*/// Path-Solutions - Fix Websphere Issue #177853
				clientId : null,/* In case we need to pass the clientId in request params: (new Date()).getTime().toString(),*/
				usrCompBr : null,/* In case we need to pass the usrCompBr in request params: alertEngine.usrCompBr,*/
				servletIp : alertEngine.servletIp,/* In case we need to pass the servletIp in request params: alertEngine.servletIp,*/
				sessionInitializedCallback : alertEngine.addUserListener,
				continuePolling : true
			});
		}
	},
	
	/*
	 * This function will add a listener to the specified destination.
	 * A destination name should start with 'topic://' to create a topic otherwise to create a queue the queue name should start with 'queue://'.
	 * The alertEngine.alertReceived passed in parameter represents the function that should handle the alerts messages.
	 * The selector is used at the level of the JMS Consumer (Listener) to filter the received message on usrCompBr value. 
	 */
	addUserListener : function() {
		//Set the destination type. if its not equal to 'queue' its defaulted to topics type
		if(alertEngine.destinationType && alertEngine.destinationType != 'queue')
		{
			alertEngine.destinationType = 'topic';	
		}
		/*
		 * The selector indicated in parameters is to filter the received messages by usrCompBr.
		 * If a message is of type RECEIVE_ALERTS then the usrCompBr attribute set inside the message properties is NULL and the message is treated. 
		 * This case above concern the messages sent from the alerts engine task. 
		 * If a message is of type SESSION_TIMEOUT then the sessinId is set in the customSessionListener.jsva and is NOT NULL and only listeners related to the HttpSession in question will receive the messsage. 
		 * This case above concern the timeout message sent from customSessionListener and we have 1 user opening 2 different sessions in 2 different comp/branch at the same time.  
		 */ 
		
		var alertSelector = "((usrCompBr IS NULL) OR (usrCompBr='" + alertEngine.usrCompBr + "')) AND ((applicationName IS NULL) OR (applicationName='"  + alertEngine.applicationName + "'))";
		if(alertEngine.isLoginAlertEnabled == 'true')
		{
			alertSelector = "((usrCompBr IS NULL) OR (usrCompBr='" + alertEngine.usrCompBr + "')) AND ((applicationName IS NULL) OR (applicationName='"  + alertEngine.applicationName + "')) AND (loginAlerts='true')";
		}	
		
		alertEngine.amq.addListener(alertEngine.usrCompBr + '_' + alertEngine.destinationPrefix + alertEngine.destinationName, alertEngine.destinationType + '://' + alertEngine.destinationPrefix + alertEngine.destinationName, alertEngine.alertReceived, 
			{ selector:alertSelector} );
	},

	/*
	 * This function will process the received message.
	 * In case of timeout message the polling will stop.
	 * In case of alerts message the alerts popup will open and the polling is stopped.
	 * @param {Object} message
	 */
	alertReceived : function(message) {
		if(message)
		{   
			var alertType = $(message).attr('type');
			if(alertType == 'SESSION_TIMEOUT')
			{
				//If the usrCompBr attribute in the received alerts is same as the alertEngine usrCompBr, then we should stop polling
				if( $(message).attr('usrCompBr') == alertEngine.usrCompBr )
				{	
					//Stop Polling
					alertEngine.amq.setContinuePolling(false);
				}
			}
			else if(alertType == 'RECEIVE_ALERTS')
			{
				/*in case we received a message directly after clicking a snooze we should ignore it
				alertEngine.amq.getSnoozeTime() is set on snooze click button*/
				var time =  alertEngine.amq.getSnoozeTime();
				if(time != undefined && time != null && time > new Date())
				{
					return;
				}
				//Stop Polling
				alertEngine.amq.setContinuePolling(false);
				
				//Open received alerts popup
				alertEngine.openReceivedAlertsPopup();
			}
			else if(alertType == 'LOGIN_ALERTS')
			{
				//Stop Polling
				alertEngine.amq.setContinuePolling(false);
				
				//Open received alerts popup
				alertEngine.openReceivedAlertsPopup(true);
			
			}
		}
	},
	
	/*
	 * This function will open the alerts popup
	 * @memberOf {TypeName} 
	 */
	openReceivedAlertsPopup : function(isLoginAlertEnabled)
	{
		//Check if the receive popup is already opened.
		if($("#receive_alert_div") && $("#receive_alert_div").size() == 0)
		{
			//reset alertEngine.amq.setSnoozeTime() to null after opening the dialog.
			alertEngine.amq.setSnoozeTime(null);
			//To cover the case when the alerts is receveived while no page is already opened, 
			//The pageRef is defaulted to 'RCVALERT'
			
			var alertsPageRef = 'RCVALERT';
			
			
			var mySrc = alertEngine.contextPath
					+ "/path/alerts/TrsAckTOutAlertsMaint_loadTrsAckTOutAlertsMaint?_pageRef="+alertsPageRef;

			if(isLoginAlertEnabled != undefined && isLoginAlertEnabled == true)
			{
				mySrc += "&isLoginAlertEnabled=true";
			}
			
			var receiveAlertDivElement = $('<div>', {
				id : "receive_alert_div"
			});
			
			var receiveAlertParam = {'appName':alertEngine.applicationName};
			
			receiveAlertDivElement.dialog( {
				autoOpen : false,
				show:{
		        	effect:"slide",
		        	duration:100,
		        	complete:function()
		        	{	
						//Fix Issue #275553 , add a complete event for the slide show to call the resizeSingleGrid function
		            	resizeSingleGrid("trsAckTOutAlertGrid_Id_"+alertsPageRef);
		            }
		    	},
				modal : false,
				title : alerts_key,
				position : 'center',
				width : '1200',
				height : '450',
				close : function(ev, ui) {
					$(this).dialog("destroy");
					$(this).remove();
					
					//Continue Polling
					alertEngine.amq.setContinuePolling(true);
					alertEngine.amq.continuePolling();
				}
			});

			$.ajax({
		  		url: mySrc,
		  		type:"post",
		  		dataType:"html",
		  		data: receiveAlertParam,
		  		success: function(data){
					if(data)
					{
						if($.trim(data) != '')
						{	
							//Setting the HTML Data inside the DIV without opening it. The div will be opened if the grid 
							//contains rows. The open of the popup is done on alerts grid complete.
							$(receiveAlertDivElement).html(data);
							var onAlertReceiveInput = $(receiveAlertDivElement).find('#onAlertReceive_' + alertsPageRef);
							if($(onAlertReceiveInput))
							{
								//This flag is set to true to indicate that we should check the row num of the grid before opening/closing it.
								$(onAlertReceiveInput).val('true');
							}	
						}
					}	
					
		  		}
			});
		}
	},
	
	/*
	 * This function is called in amq.pollErrorHandler to customize the treatement of error.
	 * In case of network error (Server is shutdown) a confirm message is shown asking if we should continue trying to connect to server, or if we should stop.
	 * @param {Object} xhr
	 * @param {Object} status
	 * @param {Object} ex
	 */
	alertsCustomErrorHandler : function(xhr, status, ex)
	{
		//The status 'error' will occur in 3 cases:
		//case 1- if we press F5 and the polling is active
		//case 2- if we press LOG OUT and the polling is active
		//case 3- if the server is shutdown and the polling is active
		
		//NABIL FEGHALI 25/07/2014 - fix the error condition :
		//check only if status === 'error' because xhr.status = 0 is returned for FireFox and Chrome and xhr.status = 12029 is returned in IE9
		if (status === 'error')
		{	
			//in case of cluster enabled , and if we receive internal error 500 due to failover, resubscribe the user to the new active broker
			if(xhr.status == 500 && alertEngine.isClusterEnabled == "true")
			{
				if(xhr.responseText !== '')
				{
					/**
					 * check if the response returned with 500 error status contains a new value of servletIp and update the corresponding alertEngine variable.
					 * In case of cluster failover the alert ajax servlet ip is changed so we need to use the new one.
					 */
					var responseTextObject = $.parseJSON(xhr.responseText);
					if(responseTextObject.servletIp != undefined 
							&& responseTextObject.servletIp != null
							&& responseTextObject.servletIp != '')
					{
						alertEngine.servletIp = encodeURIComponent(responseTextObject.servletIp);
					}
				}
				
				alertEngine.amq.resetAmqVariables();
				alertEngine.amq.setContinuePolling(false);
				alertEngine.subscribeUser();
				return;
			}
			
			//Stop the polling on error
			alertEngine.amq.setContinuePolling(false);
			
			/*when the manuel logout button is not clicked and an error occure we need to send a check alive request. 
			but when the manuel logout is clicked (mainly using firefox browser) the session is invalidated and the long polling request returns an error (status=error, xhr.status=0) 
			so a check alive request is sent and it will cause a 'session timeout' message displayed on the screen. to avoid this behavior a checking is done on alertEngine.manuelLogout */
			if(!alertEngine.manuelLogout)
			{
				//Send a POST to the AlertsAjaxServlet to check if the server is alive
				//The type=check_alive is send in parameter
				$.ajax({
					type: 'POST',
					url: alertEngine.contextPath + alertEngine.servletUrl,
					data: 'type=check_alive',
					success: function()
							{
								//case 1 and 2
								//nothing to do if the server is alive. The polling will be stopped. 
							},
					error: function()
						   {
								//case 3
								//The server is stopped, an error message is shown.
								_showErrorMsg("Server connection is dropped.", "Warning");
						   },
					dataType: 'text'
				});
			}
		}
	}
};

