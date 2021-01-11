function switchCompanyBranchMgnt(currElt, switchBranch)
{
		 $.ajax({
			 url: jQuery.contextPath+ "/pathdesktop/portalDashboardAction_switchCompanyBranchMgnt",
	         type:"post",
			 dataType:"json",
			 data: {switchBranch:switchBranch},
			 success:function( data ){
				if(typeof data["_error"] == "undefined" || data["_error"] == null)
				{
					openCompBrScreen(switchBranch);
//					_showErrorMsg("SWITCH BRANCH",info_msg_title);
				}
 	        }
	    });
}
function openCompBrScreen(switchBranch)
{
	var dialogOptions={modal:true,
                       dialogClass: "no-close",
                       closeOnEscape: false,
                       height : returnMaxHeight(231),
			           width : returnMaxWidth(527),
			           autoOpen : false,
			           title:switchBranch?switch_branch_key:switch_company_key};
	var compBrDiv = $('<div>',{id:"switchCompDivId"});
    compBrDiv.css("padding","0");
	$('body').append(compBrDiv);
	var mySrc = jQuery.contextPath+"/pathdesktop/switchCompAction_loginCompBr";
	var params= {openInDialog:"true",switchBranch:switchBranch};
    $("#switchCompDivId").load(mySrc,params,function(){
	$("#switchCompDivId").dialog(dialogOptions);
	$("#switchCompDivId").dialog("open");
	_showProgressBar(false);
	});

}
function changePassword(currElt)
{
	_showProgressBar(true);
	if($("#pwdDiv").html() == null)
	{
		$("body").append("<div id='pwdDiv'></div>");
	}
	var dialogOptions = {title:change_pass, autoOpen: false, height:200, width:450 ,modal: true};
	$("#pwdDiv").load(jQuery.contextPath+ "/pathdesktop/portalDashboardAction_openChangePwd",{},function()
	{
		$("#pwdDiv").dialog(dialogOptions)
		$("#pwdDiv").dialog('open');
		_showProgressBar(false);
	});
}
/**
 * [MarwanMaddah]: Open Branch Management
 * @param {Object} currElt
 */
function openBranch(currElt)
{
		 $.ajax({
			 url: jQuery.contextPath+ "/pathdesktop/portalDashboardAction_openBranchMgnt",
	         type:"post",
			 dataType:"json",
			 data: {},
			 success:function( data ){
				if(typeof data["_error"] == "undefined" || data["_error"] == null)
				{
					 _showErrorMsg(branch_is_now_opened_key,info_msg_title);
				}
 	        }
	    });
}
/**
 * [Rabih El Khatib]: Close Branch Management
 * @param {Object} currElt
 */
function closeBranch(currElt)
{
		_showProgressBar(true);
	var curParams = {"theVO.USR_DEFINED_PORTLET_YN": 1};
	$.ajax( {
		url : jQuery.contextPath + '/pathdesktop/portalDashboardAction_closeBranchMgnt',
		type : "post",
		dataType:"json",
		data : curParams,
		success : function(response) {
		_showProgressBar(false);
		if (response["_error"] == undefined
				|| response["_error"] == null) {
			if  (typeof response["_confirm"] != "undefined"
				&& response["_confirm"] != null
				&& response["_confirm"] != "") {
				
				_showConfirmMsg(response["_confirm"], confirm_msg_title, function(yesNo) {
					
					if (yesNo) {
						_showProgressBar(true);
						curParams = {"theVO.USR_DEFINED_PORTLET_YN": 0};
						$.ajax( {
						url : jQuery.contextPath + '/pathdesktop/portalDashboardAction_closeBranchMgnt',
						type : "post",
						data : curParams,
						success : function(response) {
							if (response["_error"] == undefined || response["_error"] == null)
								{
								_showProgressBar(false);
								_showErrorMsg(branch_is_now_closed_key, info_msg_title);
								}
						}
						});
					}
					else
					{
						return;
					}
				});
			}
		}
	}
	});
}
/**
 * [MarwanMaddah]: open Session Management
 * @param {Object} currElt
 */
function openSession(currElt)
{
		 $.ajax({
			 url: jQuery.contextPath+ "/pathdesktop/portalDashboardAction_openSessionMgnt",
	         type:"post",
			 dataType:"json",
			 data: {},
			 success:function( data ){
				if(typeof data["_error"] == "undefined" || data["_error"] == null)
				{
					 _showErrorMsg(session_is_now_opened_key,info_msg_title);
				}
 	        }
	    });
}
function closeSession(printArg)
{
	_showProgressBar(true);
	var curParams = {"theVO.USR_DEFINED_PORTLET_YN": 1};
	if(printArg=='forceLogout' || printArg == 'forceLogoutPrint')
	{
		curParams["fromForceLogout"] = "2";
		if(printArg == 'forceLogoutPrint')
		{
			printArg = false;
		}
	}
	$.ajax( {
		url : jQuery.contextPath + '/pathdesktop/portalDashboardAction_closeSessionMgnt',
		type : "post",
		dataType:"json",
		data : curParams,
		success : function(response) {
			_showProgressBar(false);
		if  (typeof response["_confirm"] != "undefined" && response["_confirm"] != null && response["_confirm"] != "")
		{
			if(JSON.stringify(response).indexOf("[31579]")>-1 && printArg == false)
				{
					printActiveTrxAfterConfirm(true,response);
				}
			
			else if(JSON.stringify(response).indexOf("[31579]")>-1)
				{
					if(printArg=='forceLogout')
					{
						showActiveTransactions(response,"closeSessionCallBack", "true", "closeSession", "'forceLogoutPrint'");
					}else
					{
						showActiveTransactions(response,"closeSessionCallBack", null, "closeSession", "false");
					}
				}
			
			else if(JSON.stringify(response).indexOf("[31584]")>-1)
				{
					if(response["forceClosureAccess"]=="1")
					{
						var showButton = '<a id="closeSession_showButton" ' +
						'href="#" ' +
						'id="okButton" ' +
						'class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" ' +
						'role="button">' +
						'<span class="ui-button-text">' + show_btn_key +'</span>' +
						'</a>';

						var cancelButton = '<a id="closeSession_cancelButton" ' +
						'href="#" ' +
						'id="cancelButton" ' +
						'class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" ' +
						'role="button">' +
						'<span class="ui-button-text">' + cancel_label_trans +'</span>' +
						'</a>';	
						
						var forceLogoutButton = '<a id="closeSession_forceLogout" ' +
						'href="#" ' +
						'id="printButton" ' +
						'class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" ' +
						'role="button">' +
						'<span class="ui-button-text">'+document.getElementById("forceClosure_id").value+'</span>' +
						'</a>';
						
		var closeSessionDivContent = "<div id='closeSessionDialog'><table>"+
										"<tr><td colspan=3>"+ response["_confirm"] +"</td></tr>"+
										"<tr><td colspan=3>&nbsp;</td></tr>"+
										"<tr><td colspan=3>&nbsp;</td></tr>"+
										"<tr><td colspan=3>&nbsp;</td></tr>"+
										"<tr><td colspan=3>&nbsp;</td></tr>"+
										"<tr align='center'><td>"+showButton+"</td><td>"+cancelButton+"</td><td>"+forceLogoutButton+"</td></tr>"+
										"<table></div>";

		var closeSessionDivElement = $(closeSessionDivContent);

		if($("#closeSessionDialog") && $("#closeSessionDialog").attr('id') != undefined)
		{
		$("#closeSessionDialog").dialog("destroy");
		$("#closeSessionDialog").remove();
		}

		$('body').append(closeSessionDivElement);
		closeSessionDivElement.dialog({
									modal : true,
									title : confirm_msg_title,
									position : 'center',
									width : '360',
									height : '180',
									resizable : false,
									close : function() {
										destroySessionDialog();
									},
									open : function() {
											$('#closeSession_cancelButton').bind('click',function()
											{
												destroySessionDialog();
											});	
											
											$('#closeSession_showButton').bind('click',function()
											{
												loadLoggedInUsrsGrid(response);
											});
											$('#closeSession_forceLogout').bind('click',function()
											{
												closeSession("forceLogout");
												destroySessionDialog();
											});
											_showProgressBar(false);
											$("#closeSessionDialog").focus();
									}
								});
					}else
					{
						_showConfirmMsg(response["_confirm"],confirm_msg_title,loadLoggedInUsrsGrid, response, show_btn_key);
					}
				}
			/**
			 * in case there is a cash balances and not transferred 
			 * US 736630 BMO180313 - teller cash balance
			 */
			else if(JSON.stringify(response).indexOf("[39189]")>-1)
			{
				_showConfirmMsg(response["_confirm"],confirm_msg_title,loadUnsettledNotTransfrdCashBal, response, show_btn_key);				
			}

		}
		else if(typeof response["_error"] == "undefined" || response["_error"] == null)
			{
				printActiveTrxMgnt(response,"printActiveTrxAfterConfirm","closeSessionCallBack",1);
			}
	}
	});
	
	/**
	 * function to load the logged in users grid
	 */

	function loadLoggedInUsrsGrid(arg) {
	if(arg)
		{
		_showProgressBar(true);
		var loggedInUsrsDiv = $("<div id='LoggedInUsrsDialog'></div>");

		loggedInUsrsDiv.css("padding", "0");

		var theBody = $('body');
		loggedInUsrsDiv.insertAfter(theBody);

		var actionSrc = jQuery.contextPath + '/pathdesktop/portalDashboardListAction_loadLoggedInUsersGrid';
		$.ajax( {
			url : actionSrc,
			type : "post",
			success : function(response) {
				if (response["_error"] == undefined
						|| response["_error"] == null) {
					_showProgressBar(false);
					loggedInUsrsDiv.html(response)
					loggedInUsrsDiv.dialog( {
						modal : true,
						title : "Logged in users",
						autoOpen : false,
						show : 'slide',
						position : 'center',
						width : returnMaxWidth(635),
						height : returnMaxHeight(325),
						close : function() {
							var theDialog = $(this);
							theDialog.remove();
						}
					});
					loggedInUsrsDiv.dialog("open");
					_showProgressBar(false);
				}
			}
		});
		}

	}
	
	
	function destroySessionDialog()
	{
		if($("#closeSessionDialog"))
		{
			$("#closeSessionDialog").dialog("destroy");
			$("#closeSessionDialog").remove();
		}
	}
	/**
	 * function to show the not transferred cash balances on show button click.
	 */
	function loadUnstldNotTransCashBal(arg) {
		if(arg)
		{
			_showProgressBar(true);
			var unstldNotTransCashBalDiv = $("<div id='unstldNotTransCashBalDiv'></div>");
			
			unstldNotTransCashBalDiv.css("padding", "0");
			
			var theBody = $('body');
			unstldNotTransCashBalDiv.insertAfter(theBody);
			
			var actionSrc = jQuery.contextPath + '/pathdesktop/portalDashboardListAction_loadUnstldNotTransCashBal';
			$.ajax( {
				url : actionSrc,
				type : "post",
				success : function(response) {
					if (response["_error"] == undefined
							|| response["_error"] == null) {
						_showProgressBar(false);
						unstldNotTransCashBalDiv.html(response)
						unstldNotTransCashBalDiv.dialog( {
							modal : true,
							title : "Logged in users",
							autoOpen : false,
							show : 'slide',
							position : 'center',
							width : returnMaxWidth(635),
							height : returnMaxHeight(325),
							close : function() {
								var theDialog = $(this);
								theDialog.remove();
							}
						});
						unstldNotTransCashBalDiv.dialog("open");
						_showProgressBar(false);
					}
				}
			});
		}
	}	
/**
 * show the current Active Transactions
 * 
 * @param {Object} callBackFunc
 * @param {Object} args
 */
function showActiveTransactions(response,callBackOkFunc,okArgs,callBackPrintFunc,printArgs,callBackCancelFunc,cancelArgs)
{
	_showProgressBar(true);
	
	var viewTransListDivId = "viewTransListDivId";

	var dialogTitle = "Pending Transactions";
	var okButtonTitle = "ignore";
	var cancelButtonTitle = cancel_label_trans;
	var printButtonTitle = "print";
	
	
	var returnedCallingOkFunc = callBackOkFunc;
	if(!okArgs)
	{
		okArgs = {};
	}
	if(!jQuery.isFunction( callBackOkFunc ) && callBackOkFunc != null && callBackOkFunc != undefined && callBackOkFunc != '')
	{
		returnedCallingOkFunc = ( function(){okArgs.selectedLanguage = $('#viewTransListDivId input[@name=language]:checked').val(); $("#viewTransListDivId").dialog("destroy"); $("#viewTransListDivId").remove(); jQuery.globalEval( callBackOkFunc + "(" + JSON.stringify(okArgs)+")" );  });
	}
	else if(callBackOkFunc != null && callBackOkFunc != undefined && jQuery.isFunction( callBackOkFunc ))
	{
		returnedCallingOkFunc = ( function(){okArgs.selectedLanguage = $('#viewTransListDivId input[@name=language]:checked').val(); $("#viewTransListDivId").dialog("destroy"); $("#viewTransListDivId").remove(); callBackOkFunc(okArgs); });
	}	
	
	var returnedCallingPrintFunc = callBackPrintFunc;
	if(!printArgs)
	{
		printArgs = {};
	}
	if(!jQuery.isFunction( callBackPrintFunc ) && callBackPrintFunc != null && callBackPrintFunc != undefined && callBackPrintFunc != '')
	{
		returnedCallingPrintFunc = ( function(){jQuery.globalEval( callBackPrintFunc + "(" + printArgs.toString() +")" );  });
	}
	else if(callBackPrintFunc != null && callBackPrintFunc != undefined && jQuery.isFunction( callBackPrintFunc ))
	{
		returnedCallingPrintFunc = ( function(){callBackPrintFunc(printArgs); });
	}
	
	var returnedCallingCancelFunc = callBackCancelFunc;
	if(!cancelArgs)
	{
		cancelArgs = {};
	}
	if(!jQuery.isFunction( callBackCancelFunc ) && callBackCancelFunc != null && callBackCancelFunc != undefined && callBackCancelFunc != '')
	{
		returnedCallingCancelFunc = ( function(){cancelArgs.cancelAction = true; $("#viewTransListDivId").dialog("destroy"); $("#viewTransListDivId").remove(); jQuery.globalEval( callBackCancelFunc + "(" + JSON.stringify(cancelArgs)+")" );  });
	}
	else if(callBackCancelFunc != null && callBackCancelFunc != undefined && jQuery.isFunction( callBackCancelFunc ))
	{
		returnedCallingCancelFunc = ( function(){cancelArgs.cancelAction = true; $("#viewTransListDivId").dialog("destroy"); $("#viewTransListDivId").remove(); callBackCancelFunc(cancelArgs); });
	}
	
	var okButton = '<a id="viewTransListDivId_okButton" ' +
						'href="#" ' +
						'id="okButton" ' +
						'class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" ' +
						'role="button">' +
						'<span class="ui-button-text">' + okButtonTitle +'</span>' +
						'</a>';
	
	var cancelButton = '<a id="viewTransListDivId_cancelButton" ' +
						'href="#" ' +
						'id="cancelButton" ' +
						'class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" ' +
						'role="button">' +
						'<span class="ui-button-text">' + cancelButtonTitle +'</span>' +
						'</a>';	
	
	var printButton = '<a id="viewTransListDivId_printButton" ' +
						'href="#" ' +
						'id="printButton" ' +
						'class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" ' +
						'role="button">' +
						'<span class="ui-button-text">' + printButtonTitle +'</span>' +
						'</a>';
	var contentMessage = (printArgs=="'forceLogout'"&&response["contentMessage"]!=null)?response["contentMessage"].replace("[]","[31579]"):response["_confirm"];
	var loggedInUsrsDivContent = "<div id='"+ viewTransListDivId +"'><table>"+
										"<tr><td colspan=3>"+ contentMessage +"</td></tr>"+
										"<tr><td colspan=3>&nbsp;</td></tr>"+
										"<tr><td colspan=3>&nbsp;</td></tr>"+
										"<tr><td colspan=3>&nbsp;</td></tr>"+
										"<tr><td colspan=3>&nbsp;</td></tr>"+
										"<tr align='center'><td>"+okButton+"</td><td>"+cancelButton+"</td><td>"+printButton+"</td></tr>"+
										"<table></div>";
	
	var loggedInUsrsDivElement = $(loggedInUsrsDivContent);
	
	if($("#" + viewTransListDivId) && $("#" + viewTransListDivId).attr('id') != undefined)
	{
		$("#" + viewTransListDivId).dialog("destroy");
		$("#" + viewTransListDivId).remove();
	}
	
	$('body').append(loggedInUsrsDivElement);
	loggedInUsrsDivElement.dialog({
									modal : true,
									title : dialogTitle,
									autoOpen : false,
									//show : 'slide',
									position : 'center',
									width : '360',
									height : '180',
									resizable : false,
									/*stack: false,*/ zIndex: 2000000,
									close : function() {
										
										if(returnedCallingCancelFunc && jQuery.isFunction(returnedCallingCancelFunc))
										{
											returnedCallingCancelFunc();	
										}
										if($("#viewTransListDivId"))
										{
											$("#viewTransListDivId").dialog("destroy");
											$("#viewTransListDivId").remove();
										}
										
									},
									open : function() {
										if(returnedCallingPrintFunc && jQuery.isFunction(returnedCallingPrintFunc))
										{
											$('#viewTransListDivId_printButton').bind('click',returnedCallingPrintFunc);	
										}
										if(returnedCallingOkFunc && jQuery.isFunction(returnedCallingOkFunc))
										{
											$('#viewTransListDivId_okButton').bind('click',returnedCallingOkFunc);	
										}
										if(returnedCallingCancelFunc && jQuery.isFunction(returnedCallingCancelFunc))
										{
											$('#viewTransListDivId_cancelButton').bind('click',returnedCallingCancelFunc);	
										}
										else
										{
											$('#viewTransListDivId_cancelButton').bind('click',function(){$('#viewTransListDivId').dialog('close');});	
										}
										_showProgressBar(false);
										$("#viewTransListDivId").focus();
									}
								});
	
	$(loggedInUsrsDivElement).dialog("open");
}
}
function finalSignOff(confirmed)
{
   var dataParams = {};
   var additionalParams = {};
   $.ajax({
		 url: jQuery.contextPath+ "/pathdesktop/portalDashboardAction_finalSignOffChecking",
         type:"post",
		 dataType:"json",
		 data: {exceptionConfirmed:confirmed},
		 success:function( data ){
			_showProgressBar(false);
			if(typeof data["_confirm"] != "undefined" || data["_confirm"] != null)
			{
			   _showConfirmMsg(data["_confirm"],confirm_msg_title,"finalSignOffAfterConfirm",data);
			}
			else if(typeof data["_error"] == "undefined" || data["_error"] == null)
			{
			   additionalParams["returnJson"] = true;
			   additionalParams["fromFinalSignOff"] = true;
			   additionalParams["processAction"] = "/pathdesktop/portalDashboardAction_finalSignOff";
			   additionalParams["customReport"] = true;
			   additionalParams["reportRef"] = "RETMATRX";
			   openPreviewRepCommon(dataParams,null,null, null,null,null,null,"/pathdesktop/dashboardReportsAction_generateFinalSignOffReport", null, additionalParams);
			}
 	     }
   });   
}
function finalSignOffAfterConfirm(confirmed)
{
  if(confirmed)
  {
	 finalSignOff(confirmed);  
  }
}
function printActiveTrxMgnt(data,eventAfterConfirm,callInCaseRepEmpty,noActiveTrx)
{
	if(data["activeTransCO"].reportResponseCO != null && data["activeTransCO"].reportResponseCO != undefined)
    {				
      if(typeof data["_confirm"] != "undefined" || data["_confirm"] != null)
      {
    	 _showConfirmMsg(data["_confirm"],confirm_msg_title,eventAfterConfirm, data); 
      }
    }else if(typeof callInCaseRepEmpty !="undefined" && callInCaseRepEmpty!=null && callInCaseRepEmpty!="")
	{
		/**
		 * #BUG 692395 - User not able to Close session
		 * in case the report is empty, will call the closeSessionCallBack function to proceed with the close session process
		 */
		if(typeof noActiveTrx!="undefined" && noActiveTrx!=null && noActiveTrx==1)
		{			
			jQuery.globalEval(callInCaseRepEmpty+"(null,"+noActiveTrx+")");
		}
		else
		{
			jQuery.globalEval(callInCaseRepEmpty+"()");
		}
	}
}
function printActiveTrxAfterConfirm(confirmed, data)
{
	if(confirmed)
	{
		var params    = data.activeTransCO.reportResponseCO.reportParams;
		var reportId  = data.activeTransCO.reportResponseCO.reportId;
		var reportRef = data.activeTransCO.reportResponseCO.reportRef;
		if(reportRef != null && reportRef != undefined)
		{
			openPreviewAdvice(reportRef, params,null,null,null,'EN');
		}
	}
}
function closeSessionCallBack(fromForceLogout,noActiveTrx)
{
	_showConfirmMsg(closing_session_key, confirm_msg_title, function(yesNo) {
	_showProgressBar(true);
	if (yesNo) {
				var curParams = {"theVO.USR_DEFINED_PORTLET_YN": 0};
				if(fromForceLogout!=null)
				{
					curParams["fromForceLogout"] = "1";
				}
				if(typeof noActiveTrx!="undefined" && noActiveTrx!=null && noActiveTrx == 1)
				{
					curParams["noActiveTrx"] = noActiveTrx; 
				}
				$.ajax( {
					url : jQuery.contextPath + '/pathdesktop/portalDashboardAction_closeSessionMgnt',
					type : "post",
					dataType:"json",
					data : curParams,
					success : function(response) {
						_showProgressBar(false);

						if(typeof response["_error"] == "undefined" || response["_error"] == null)
						{
	 						_showErrorMsg(session_is_now_closed_key,info_msg_title);
						}
				}
				});
	}
	else
		{
	_showProgressBar(false);			
		}
	});
}
function openLinkDynScreenMgnt()
{
	var	saveAsDiv = $("<div id='link_dyn_screen_div_"+_pageRef+"' class='path-common-sceen'/>");
	saveAsDiv.css("padding","0");
    saveAsDiv.insertAfter($('body'));
    
    var curParams = {_pageRef:_pageRef};
    _showProgressBar(true);
    var srcURL = jQuery.contextPath+"/path/dynamicScreen/linkDynScreenMainAction_openLinkDynScreenMgnt";    
    var _dialogOptions ={modal:true, 
                         title: (typeof link_screen_key === "undefined")?"Link Dynamic Screen" :link_screen_key ,
                         autoOpen:false,
                         show:'slide',
                         position:'center', 
                         width:returnMaxWidth(850),
                         height:returnMaxHeight(400),
                         close: function (){
   					       var theDialog = $(this);
   					       theDialog.remove();
   				 	     }};
    $("#link_dyn_screen_div_"+_pageRef).load(srcURL, curParams,function(){_showProgressBar(false);});
    $("#link_dyn_screen_div_"+_pageRef).dialog(_dialogOptions);
    $("#link_dyn_screen_div_"+_pageRef).dialog("open");	    
}