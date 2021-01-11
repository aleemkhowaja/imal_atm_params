function ApproveAlertsMaint_closeApprove(fromOpenItem)
{
	if(fromOpenItem == undefined || fromOpenItem == null)
	{
		var sendAlertCallBackFunction = $("#alert_approve_param_sendAlertCallBackFunction_" + _pageRef).val();
		var sendAlertCallBackOnChkPwd = $("#alert_approve_param_sendAlertCallBackOnChkPwd_" + _pageRef).val();
		if(sendAlertCallBackFunction != undefined && sendAlertCallBackFunction != null 
			&& sendAlertCallBackFunction != ''	&& eval('typeof '+ sendAlertCallBackFunction) === 'function'
				&& sendAlertCallBackOnChkPwd != undefined && sendAlertCallBackOnChkPwd != null && sendAlertCallBackOnChkPwd == 'true')
		{
			eval(sendAlertCallBackFunction + "('CHK_PWD')");
		}
	}
	
	$("#approve_alert_div_" + _pageRef).dialog("destroy");	
	$("#approve_alert_div_"+_pageRef).remove();
	
}

function ApproveAlertsMaint_checkUsrPwd()
{
	_showProgressBar(true);
	var approveUser=$("#usr_name_alert_"+_pageRef).val();
	var approvePassword=$("#pwd_alert_"+_pageRef).val();
  
    var dataObj = { "userName": approveUser,
					"password": approvePassword
				  };
		
	dataObj = addApproveParams(dataObj);
		
	$.ajax({
				url: jQuery.contextPath+"/path/alerts/ApproveAlertsMaint_checkApproveAlerts?_pageRef="+_pageRef,
				type:"get",
				dataType:"json",
			  	data: dataObj,
				success: function(data){
		            _showProgressBar(false);
					if(data["_error"] == null)
		 			{
						//NABIL FEGHALI - BISI120150 - ALERT OFFLINE
						var sendAlertCallBackFunction = $("#alert_approve_param_sendAlertCallBackFunction_" + _pageRef).val();
						var sendAlertCallBackOnChkPwdSuccess = $("#alert_approve_param_sendAlertCallBackOnChkPwdSuccess_" + _pageRef).val();
						if(sendAlertCallBackFunction != undefined && sendAlertCallBackFunction != null 
							&& sendAlertCallBackFunction != ''	&& eval('typeof '+ sendAlertCallBackFunction) === 'function'
								&& sendAlertCallBackOnChkPwdSuccess != undefined && sendAlertCallBackOnChkPwdSuccess != null && sendAlertCallBackOnChkPwdSuccess == 'true')
						{
							eval(sendAlertCallBackFunction + "('CHK_PWD_SUCCESS')");
						}
						else
						{
							ApproveAlertsMaint_loadOpenitemScreen();
						}	
					}	
		        },
			});
}


function addApproveParams(paramObject)
{
	if(paramObject == undefined || paramObject == null)
	{
		paramObject = {};
	}
	
	paramObject["alertsParamCO.compCode"] = $("#alert_approve_param_compCode_" + _pageRef).val();
	paramObject["alertsParamCO.branchCode"] = $("#alert_approve_param_branchCode_" + _pageRef).val();
	paramObject["alertsParamCO.status"] = $("#alert_approve_param_status_" + _pageRef).val();
	paramObject["alertsParamCO.amount"] = $("#alert_approve_param_amount_" + _pageRef).val();
	paramObject["alertsParamCO.reasonCode"] = $("#alert_approve_param_reasonCode_" + _pageRef).val();
	paramObject["alertsParamCO.alertType"] = $("#alert_approve_param_alertType_" + _pageRef).val();
	paramObject["alertsParamCO.trsNo"] = $("#alert_approve_param_trsNo_" + _pageRef).val();
	paramObject["alertsParamCO.alertDescription"] = $("#alert_approve_param_alertDesc_" + _pageRef).val();
	paramObject["alertsParamCO.todoAlert"] = $("#alert_approve_param_todoAlert_" + _pageRef).val();
		
	paramObject["alertsParamCO.briefNameEnglish"] = $("#alert_approve_param_briefNameEnglish_" + _pageRef).val();
	paramObject["alertsParamCO.longNameEnglish"] = $("#alert_approve_param_longNameEnglish_" + _pageRef).val();
	paramObject["alertsParamCO.briefNameArab"] = $("#alert_approve_param_briefNameArab_" + _pageRef).val();
	paramObject["alertsParamCO.longNameArab"] = $("#alert_approve_param_longNameArab_" + _pageRef).val();
	paramObject["alertsParamCO.distributionType"] = $("#alert_approve_param_distributionType_" + _pageRef).val();
	paramObject["alertsParamCO.distributionTo"] = $("#alert_approve_param_distributionTo_" + _pageRef).val();
	paramObject["alertsParamCO.todoType"] = $("#alert_approve_param_todoType_" + _pageRef).val();
	paramObject["alertsParamCO.todoPriority"] = $("#alert_approve_param_todoPriority_" + _pageRef).val();
	paramObject["alertsParamCO.todoExternal"] = $("#alert_approve_param_todoExternal_" + _pageRef).val();
	paramObject["alertsParamCO.allowToSend"] = $("#alert_approve_param_allowToSend_" + _pageRef).val();
	paramObject["alertsParamCO.todoChecked"] = $("#alert_approve_param_todoChecked_" + _pageRef).val();
	paramObject["alertsParamCO.todoParam"] = $("#alert_approve_param_todoParam_" + _pageRef).val();
	paramObject["alertsParamCO.todoExecution"] = $("#alert_approve_param_todoExecution_" + _pageRef).val();
	paramObject["alertsParamCO.todoExcepEnglish"] = $("#alert_approve_param_todoExcepEnglish_" + _pageRef).val();
	paramObject["alertsParamCO.todoExcepArabic"] = $("#alert_approve_param_todoExcepArabic_" + _pageRef).val();
	paramObject["alertsParamCO.todoTellerBranch"] = $("#alert_approve_param_todoTellerBranch_" + _pageRef).val();
	paramObject["alertsParamCO.todoTellerId"] = $("#alert_approve_param_todoTellerId_" + _pageRef).val();
	paramObject["alertsParamCO.actionType"] = $("#alert_approve_param_actionType_" + _pageRef).val();
	paramObject["alertsParamCO.progRef"] = $("#alert_approve_param_progRef_" + _pageRef).val();
	paramObject["alertsParamCO.todoFrBranch"] = $("#alert_approve_param_todoFrBranch_" + _pageRef).val();
	paramObject["alertsParamCO.todoAlertOldStatus"] = $("#alert_approve_param_todoAlertOldStatus_" + _pageRef).val();
	
	paramObject["alertsParamCO.sendAlertCallBackFunction"] = $("#alert_approve_param_sendAlertCallBackFunction_" + _pageRef).val();
	paramObject["alertsParamCO.sendAlertCallBackOnChkPwd"] = $("#alert_approve_param_sendAlertCallBackOnChkPwd_" + _pageRef).val();
	paramObject["alertsParamCO.sendAlertCallBackOnChkPwdSuccess"] = $("#alert_approve_param_sendAlertCallBackOnChkPwdSuccess_" + _pageRef).val();
	paramObject["alertsParamCO.sendAlertCallBackOnItemClose"] = $("#alert_approve_param_sendAlertCallBackOnItemClose_" + _pageRef).val();
	paramObject["alertsParamCO.additionalParams"] = $("#alert_approve_param_additionalParams_" + _pageRef).val();
	
	if($("#alert_approve_param_accessRightsOptList_" + _pageRef).val()!="" && $("#alert_approve_param_accessRightsOptList_" + _pageRef).val()!=null && typeof $("#alert_approve_param_accessRightsOptList_" + _pageRef).val()!="undefined")
	{
		paramObject["alertsParamCO.accessRightsOptList"] = $.parseJSON($("#alert_approve_param_accessRightsOptList_" + _pageRef).val());
	}
	
	return paramObject;
}

function ApproveAlertsMaint_loadOpenitemScreen(openItemParam,popupTitle)
{
	//Destroy an existant open_item_div
	if($("#open_item_div_" + _pageRef) && $("#open_item_div_" + _pageRef).attr('id') != undefined)
	{
		$("#open_item_div_" + _pageRef).dialog("destroy");
		$("#open_item_div_" + _pageRef).remove();
	}
	
	//Destroy an existant open_item_div in case the current pageRef contains _ALERT
	if(_pageRef.indexOf('_ALERT') > 0 )
	{
		var newPageRef = _pageRef.substring(0, _pageRef.indexOf('_ALERT'));
		if($("#open_item_div_" + newPageRef) && $("#open_item_div_" + newPageRef).attr('id') != undefined)
		{
			$("#open_item_div_" + newPageRef).dialog("destroy");
			$("#open_item_div_" + newPageRef).remove();
		}
	}	
	
	//Open the item div to approve
	var openItemDivElement = $('<div>',{id:"open_item_div_"+_pageRef});
	$('body').append(openItemDivElement);
	
	var openItemTitle = approve_item_key;
	if(popupTitle != undefined && popupTitle != null && popupTitle != '')
	{
		openItemTitle = popupTitle;
	}	
	
	var screenWidth = $('#content-container').width();
	var screenHeight = $('#content-container').height();
	var maxWidth =  $(window).width() -50;
    var maxHeight = $(window).height() -100;
    
  //TP 869600 DBU191048 Adjust z-index and screen width and screen height in case the open item screen is opened from local approve opened from a screen loaded inside an iframe
    if(screenWidth == null)
    {
       screenWidth = maxWidth;
    }
    if(screenHeight == null)
    {
       screenHeight = maxHeight;
    }
    var dialogZInx = returnDocMaxZIndex();
    // in case max allowed number returned for any reason
    if(dialogZInx >= 2147483000)
    {
    	dialogZInx = 2000000;
    }
    dialogZInx = dialogZInx+1;
    //end adjustment

    
	var approveURL = jQuery.contextPath+'/path/alerts/ApproveAlertsMaint_openItemForApprove?_pageRef='+_pageRef;
	openItemDivElement.dialog( {
		autoOpen : false,
		modal : true,
		title : openItemTitle,
		position: { 
    		my: 'top',
    		at: 'top',
    		of: $('#content-container')
  		},
		width  : screenWidth,
		height : screenHeight,
		maxHeight: maxHeight,
        maxWidth: maxWidth,
        zIndex: dialogZInx,
		close : function(ev, ui) {
			ALERTS_OPEN_ITEM_closeOpenItem();
			},
		resizeStop: function(event, ui) {
			ApproveAlertsMaint_resizeOpenItemWindow(openItem_OldPageRef,screenWidth,screenHeight);	
		}
	
	});
	
	if(openItemParam == undefined || openItemParam == null)
	{
		openItemParam = {};
		openItemParam = addApproveParams(openItemParam);
	}
	
	openItemParam["alertsParamCO.isLocalApprove"] = 'true';
	openItemParam["alertsParamCO.alertType"] = 'TRANS';
	
	//Remove the authentication popup
	ApproveAlertsMaint_closeApprove(true);
		//Adjust the position of the popup to the top
	if($('#content-container') != undefined && $('#content-container').length > 0)
	{
		$(openItemDivElement).dialog('option', 'position', {my: 'top', at: 'top', of: $('#content-container')   });
	}
	else
	{
		$(openItemDivElement).dialog('option', 'position', {my: 'top', at: 'top', of: $('#dashboard')   });
	}
	_showProgressBar(true);
	$(openItemDivElement).load(
		approveURL,openItemParam,
		function() {
			$(openItemDivElement).dialog("open");
			//_showProgressBar(false);
		});
	
}

/********************************************* CTSCONTROL.PASSWD_ALERT checking *************************************************/

function ApproveAlertsMaint_closeCheckPwdOnly()
{
	//Close the popup
	$("#open_item_div_RCVALERT").dialog("destroy");
	$("#open_item_div_RCVALERT").remove();
}

function ApproveAlertsMaint_checkPwdOnly()
{
	//The user name should be taken from sessionCO
	//var approveUser=$("#usr_name_alert_"+_pageRef).val();
	var approvePassword=$("#pwd_alert_RCVALERT").val();
  
    var dataObj = { /*"userName": approveUser,*/
					"password": approvePassword
				  };
	
    _showProgressBar(true);
	$.ajax({
				url: jQuery.contextPath+"/path/alerts/ApproveAlertsMaint_checkPassWordAlerts?_pageRef="+_pageRef,
				type:"get",
				dataType:"json",
			  	data: dataObj,
				success: function(data){
					_showProgressBar(false);
					if(data["_error"] == null)
		 			{
						
						ApproveAlertsMaint_checkPwdOnly_openItemOnSuccess();
					}
				}
			});
}


function ApproveAlertsMaint_checkPwdOnly_openItemOnSuccess ()
{
	var opentItemDiv = $('#open_item_div_RCVALERT');
	var isExternal = false;
	if(opentItemDiv.length==0)
		{
		opentItemDiv = $("#screenContainerDiv_RCVALERT");
		alertsPageRef = "RCVALERT";
		isExternal = true;
		}
	
	
	var openItemParam = {
		"alertsParamCO.todoLine" 		:  $("#alert_approve_param_todoLine_RCVALERT").val(),
		"alertsParamCO.todoCode" 		: $("#alert_approve_param_todoCode_RCVALERT").val(),
		"alertsParamCO.status" 			: $("#alert_approve_param_status_RCVALERT").val(),
		"alertsParamCO.alertSubType" 	: $("#alert_approve_param_subtype_RCVALERT").val(),
		"alertsParamCO.alertDescription" : $("#alert_approve_param_alertDesc_RCVALERT").val(),
		"alertsParamCO.todoAlert" 		: $("#alert_approve_param_todoAlert_RCVALERT").val(),
		"alertsParamCO.trsNo" 			: $("#alert_approve_param_trsNo_RCVALERT").val(),
		"alertsParamCO.todoParam" 		: $("#alert_approve_param_todoParam_RCVALERT").val(),
		"alertsParamCO.todoType" 		: $("#alert_approve_param_todoType_RCVALERT").val(),
		"alertsParamCO.progRef"			: $("#alert_approve_param_progRef_RCVALERT").val(),
		"alertsParamCO.alertType"		: $("#alert_approve_param_alertType_RCVALERT").val(),
		"alertsParamCO.todoFrBranch"	:$("#alert_approve_param_todoFrBranch_RCVALERT").val(),
		"alertsParamCO.reasonCode"		:$("#alert_approve_param_reasonCode_RCVALERT").val(),
		"alertsParamCO.todoExcepEnglish" :$("#alert_approve_param_todoExcepEnglish_RCVALERT").val(),
		"alertsParamCO.todoAlertOldStatus" :$("#alert_approve_param_todoAlertOldStatus_RCVALERT").val(),
		"alertsParamCO.additionalParams" :$("#alert_approve_param_additionalParams_RCVALERT").val()
	}; 
	
	opentItemDiv.html('');
	var maxWidth =  $(window).width() -10;
    var maxHeight = $(window).height() -10;

	var screenWidth=maxWidth;
	var screenHeight=maxHeight;
	
    if($('#content-container') != undefined && $('#content-container').length > 0)
    {
    	screenWidth = $('#content-container').width();
		screenHeight = $('#content-container').height();
    }

	var approveURL = jQuery.contextPath+'/path/alerts/ApproveAlertsMaint_openItemForApprove?_pageRef=' + alertsPageRef + "&isCheckForPassWord=true";
	opentItemDiv.dialog( {
		autoOpen : true,
		show : 'slide',
		modal : true,
		title : approve_item_key,
		position: 'center',
		width  : screenWidth,
		height : screenHeight,
		maxHeight: maxHeight,
        maxWidth: maxWidth,
        create: function (event, ui) {
        	if(isExternal)
        	{
        		$(".ui-widget-header").hide();
        	}
        },
		close : function(ev, ui) {
			ALERTS_OPEN_ITEM_closeOpenItem();
		},
		resizeStop: function(event, ui) {
			ApproveAlertsMaint_resizeOpenItemWindow(alertsPageRef,screenWidth,screenHeight);
		}
	
	});
	//Adjust the position of the popup to the top
	if($('#content-container') != undefined && $('#content-container').length > 0)
	{
		$(opentItemDiv).dialog('option', 'position', {my: 'top', at: 'top', of: $('#content-container')   });
	}
	else if($('#dashboard') != undefined && $('#dashboard').length > 0)
	{
		opentItemDiv.dialog('option', 'position', {my: 'top', at: 'top', of: $('#dashboard')   });
	}

	_showProgressBar(true);
	opentItemDiv.load(approveURL,openItemParam);
						
}

function ApproveAlertsMaint_resizeOpenItemWindow(currentPageRef,screenWidth,screenHeight)
{
	//Resize the OpenItemContainerDiv based on the size of the container div open_item_div					
	if($('#OpenItemContainerDiv_' + currentPageRef))
	{
		var newWidth = $('#open_item_div_' + currentPageRef).width()-35;
		var newHeigth = $('#open_item_div_' + currentPageRef).height()-80;
		if($('#OpenItemDiv_' + currentPageRef))
		{	
			//if(newWidth > screenWidth)
            //{
              //$('#OpenItemDiv_' + currentPageRef).css('width',newWidth - 50);
            //}
            $('#OpenItemDiv_' + currentPageRef).css('width',newWidth -25);
			
			if(newHeigth > screenHeight)
			{
				$('#OpenItemDiv_' + currentPageRef).css('height',newHeight - 50);
			}
		}
		$('#OpenItemContainerDiv_' + currentPageRef).css('width', newWidth);
		$('#OpenItemContainerDiv_' + currentPageRef).css('height', newHeigth);
		resizeGrids();
	}	
}

/**
 * set the action type for the submit buttons to eval the action method on processAfterValid 
 * @param actionType
 * @returns
 */
function ApproveAlertsMaint_setActionType(actionType)
{ 
	var currPageRef = _pageRef;
	if(currPageRef == '' && typeof alertsPageRef != 'undefined' && alertsPageRef != null && alertsPageRef != '' )
	{
		currPageRef = alertsPageRef;
	}
	
 	$("#actionType_"+currPageRef).val(actionType);
}
/**
 * eval the method taken from the actionType property
 * @returns
 */
function ApproveAlertsMaint_SubmitAction()
{
	var currPageRef = _pageRef;
	if(currPageRef == '' && typeof alertsPageRef != 'undefined' && alertsPageRef != null && alertsPageRef != '' )
	{
		currPageRef = alertsPageRef;
	}
	
 	var actionType = $("#actionType_"+currPageRef).val();
 	if(actionType != undefined && actionType != null && actionType != '' )
 	{ 
  		eval(actionType + '()');
 	} 
}
