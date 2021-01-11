function ALERTS_OPEN_ITEM_reloadFromIframe(confirmation,parameters)
{
	var actionType = parameters['actionType'];
	if(actionType == 'closeAndReload')
	{
		var gridParam = {_pageRef:parameters['_pageRef'],appName:parameters['appName']};
		var openItemPageRef = parameters['_pageRef'];
		ALERTS_OPEN_ITEM_reloadTrsAckTOutGrid(parameters['_pageRef'],gridParam);
		ALERTS_OPEN_ITEM_closeOpenItemCommon(parameters['actionButtonForClose']);
	}
}

function ALERTS_OPEN_ITEM_closeOpenItem(actionButton)
{
	if(ALERTS_OPEN_ITEM_isFromIframe())
	{
		var alertCallBackParams = {};
		alertCallBackParams['actionType'] = 'closeAndReload';
		alertCallBackParams['_pageRef'] = openItemPageRef;
		alertCallBackParams['appName'] = $('#openItemAppName_' + openItemPageRef).val();
		alertCallBackParams['actionButtonForClose'] = actionButton;
		$.postMessage({ confirmCallBack: 'ALERTS_OPEN_ITEM_reloadFromIframe' ,confirmValue:true,confirmArgs:JSON.stringify(alertCallBackParams)}, window.originalUrl ,window.top);
	}	
	else
	{
		ALERTS_OPEN_ITEM_closeOpenItemCommon(actionButton);
	}
}


function ALERTS_OPEN_ITEM_closeOpenItemCommon(actionButton)
{
	//Clear the local approve user name
	//In case of local approve we should clear the localApproveUserName
	var isLocalApprove = 'false';
	
	if($("#alert_openItem_param_isLocalApprove_" + openItemPageRef))
	{
		isLocalApprove = $("#alert_openItem_param_isLocalApprove_" + openItemPageRef).val();
	}
	
	
	var sendAlertCallBackFunction = $("#alert_openItem_param_sendAlertCallBackFunction_" + openItemPageRef).val();
	var sendAlertCallBackOnItemClose = $("#alert_openItem_param_sendAlertCallBackOnItemClose_" + openItemPageRef).val();
	var todoCode = $("#alert_openItem_param_todoCode_" + openItemPageRef).val();
	var todoLine = $("#alert_openItem_param_todoLine_" + openItemPageRef).val();
	
	var sendCallBackParam = { 'todoCode':todoCode,
							  'todoLine':todoLine,
							  'actionButton': actionButton
							};
	//Close the popup
	$("#open_item_div_"+openItemPageRef).dialog("destroy");
	$("#open_item_div_"+openItemPageRef).remove();
	$('<div>',{id:"open_item_div_"+openItemPageRef}).insertAfter($("#TrsAckTOutAlertForm_" + openItemPageRef))

	
	if(isLocalApprove == 'true')
	{
		$.ajax({
				url: jQuery.contextPath+"/path/alerts/ApproveAlertsMaint_clearLocalApproveUserName?_pageRef="+openItemPageRef,
				type:"get",
				dataType:"json",
			  	data: {},
				success: function(data){
		        }
		});
	}
	else
	{
		if( TrsAckTOutAlertsMaint_openAllAlert != undefined)
		{
			TrsAckTOutAlertsMaint_openAllAlert();
		}
	}
	
	 //Reset the pageRef to the initial value before opening the open item popup
	if(typeof openItem_OldPageRef != 'undefined'  && openItem_OldPageRef != undefined)
	{
		_pageRef = openItem_OldPageRef;
	}
	
	
	if(sendAlertCallBackFunction != undefined && sendAlertCallBackFunction != null 
			&& sendAlertCallBackFunction != ''	&& eval('typeof '+ sendAlertCallBackFunction) === 'function'
				&& sendAlertCallBackOnItemClose != undefined && sendAlertCallBackOnItemClose != null && sendAlertCallBackOnItemClose == 'true')
	{
		eval(sendAlertCallBackFunction + "('OPEN_ITEM','" + JSON.stringify(sendCallBackParam) + "')");
	}
	
	
}

function ALERTS_OPEN_ITEM_buildParams(removeDuplicateParams, actionType)
{
	//Check if the prepareParamsJsFunction is defined, and evaluate it
	var preparedItemParams = null;
	
	if (prepareParamsJsFunction != undefined && prepareParamsJsFunction != null
			&& prepareParamsJsFunction != '' && $.isFunction(window[prepareParamsJsFunction])) {
		
		var itemFunctionToCall = null;
		if(actionType != undefined && actionType != null && actionType != '')
		{
			itemFunctionToCall = prepareParamsJsFunction + '("' + actionType + '")';
		}
		else
		{
			itemFunctionToCall = prepareParamsJsFunction + '()';
		}
		preparedItemParams = eval(itemFunctionToCall);
		
		//Stop execution, if returned parameter is equal to 'alert_stop'
		if(preparedItemParams != undefined && preparedItemParams == 'alert_stop')
		{
			return 'alert_stop';
		}	
	}
	
	//Find the first form in the open item screen
	//var openItemForm = $("#open_item_div_"+ openItemPageRef).find('form:first');
	var openItemForm = ALERTS_OPEN_ITEM_returnScreenForm();
	
	if( removeDuplicateParams != undefined && removeDuplicateParams != null && removeDuplicateParams == true)
	{
		//Removing _pageRef and iv_crud attributes from the form if they exists 
		$(openItemForm).find("input[name='_pageRef']").each(function(){
	    		
			$(this).attr('name',''); 
		});
		
		$(openItemForm).find("input[name='iv_crud']").each(function(){
	    		
			$(this).attr('name',''); 
		});
	}
	//End Removing
	
	var theForm = openItemForm.serializeForm();
	
	//Alerts params that should be stored in BaseAction._alert 
	theForm = theForm
				+ "&_alert.todoLine="
				+ $("#alert_openItem_param_todoLine_"+openItemPageRef).val()
				+ "&_alert.todoCode="
				+ $("#alert_openItem_param_todoCode_"+openItemPageRef).val()
				+ "&_alert.status="
				+ $("#alert_openItem_param_status_"+openItemPageRef).val()
				+ "&_alert.isLocalApprove="
				+ $("#alert_openItem_param_isLocalApprove_"+openItemPageRef).val()
				+ "&_alert.progRef="
				+ $("#alert_openItem_param_progRef_"+openItemPageRef).val()
				+ "&_alert.compCode="
				+ $("#alert_openItem_param_compCode_"+openItemPageRef).val()
				+ "&_alert.branchCode="
				+ $("#alert_openItem_param_branchCode_"+openItemPageRef).val()
				+ "&_alert.todoParam="
				+ $("#alert_openItem_param_todoParam_"+openItemPageRef).val()
				+ "&_alert.todoAlert="
				+ $("#alert_openItem_param_todoAlert_"+openItemPageRef).val()
				+ "&_alert.trsNo="
				+ $("#alert_openItem_param_trsNo_"+openItemPageRef).val();
	
	var alertConstantParams = '';
	if(openItemJsonParams != undefined && openItemJsonParams != null && openItemJsonParams != '')
	{
		$.each(openItemJsonParams, function(key,value){
			alertConstantParams += "&"+ key + "=" + value;
		});
	}
	
	theForm = theForm + alertConstantParams;
	
	if(preparedItemParams != null && preparedItemParams != undefined && preparedItemParams != '')
	{
		theForm = theForm + preparedItemParams;
	}
	
	return theForm;
}

function ALERTS_OPEN_ITEM_reloadTrsAckTOutGrid(pageRef, gridParam)
{
	if(pageRef != undefined && pageRef != null && pageRef != '')
	{
		openItemPageRef = pageRef;
	}
	var $table  = $("#trsAckTOutAlertGrid_Id_"+openItemPageRef);
	if( $table != null && $table != undefined)
	{
		var gridUrl = jQuery.contextPath+"/path/alerts/TrsAckTOutAlertsGrid_loadTrsAckTOutAlertsGrid" ;
		var json = {};
		if(gridParam != null && gridParam != undefined)
		{
			json = gridParam;
		}	
		
		alertGridFirstLoad = true;
		if($("#receive_alert_div"))
		{
			var onAlertReceiveInput = $("#receive_alert_div").find('#onAlertReceive_' + openItemPageRef);
			if($(onAlertReceiveInput))
			{	
				$(onAlertReceiveInput).val('false');
			}	
		}
		
		$table.jqGrid('setGridParam', {url : gridUrl, datatype : 'json', postData : json}).trigger("reloadGrid");
		
		// TP #951791 - ABSAI200031 - Landing page keeps on refreshing
		if(typeof alertsPageRef != "undefined" && alertsPageRef != null)
		{
			// TP #898620 - clear selectedAlertRows after grid update
			$("#selectedAlertRows_"+alertsPageRef).val("");
		}
	}
}

var ALERTS_OPEN_ITEM_confirmFlag = null;
var ALERTS_OPEN_ITEM_confirmFlagValue = null;
var ALERTS_OPEN_ITEM_confirmFlagCancelValue = null;

function ALERTS_OPEN_ITEM_approve(confirmResponse)
{
	_showProgressBar(true);
	
	var confirmFlagValue = 'true';
	if(confirmResponse != undefined && confirmResponse != null)
	{
		if((ALERTS_OPEN_ITEM_confirmFlagCancelValue == undefined 
				|| ALERTS_OPEN_ITEM_confirmFlagCancelValue == null
				    || ALERTS_OPEN_ITEM_confirmFlagCancelValue == '') && confirmResponse == false)
		{
			ALERTS_OPEN_ITEM_confirmFlag = '';
			_showProgressBar(false);
			return;	
		}
	}
	var approveParams = ALERTS_OPEN_ITEM_buildParams(true,'A');
	
	if(approveParams != undefined && approveParams == 'alert_stop' )
	{
		_showProgressBar(false);
		return;
	}
	
	var approveUrl = $("#approveMethodeUrl_"+ openItemPageRef).val();
 
	if(confirmResponse != undefined && confirmResponse != null && confirmResponse == true 
			&& ALERTS_OPEN_ITEM_confirmFlag != undefined && ALERTS_OPEN_ITEM_confirmFlag != null && ALERTS_OPEN_ITEM_confirmFlag != '')
	{
		if(ALERTS_OPEN_ITEM_confirmFlagValue != undefined && ALERTS_OPEN_ITEM_confirmFlagValue != null && ALERTS_OPEN_ITEM_confirmFlagValue != '')
		{
			confirmFlagValue = ALERTS_OPEN_ITEM_confirmFlagValue;
		}
		approveUrl += "&" + ALERTS_OPEN_ITEM_confirmFlag + '=' + confirmFlagValue;
	}
	
	if(confirmResponse != undefined && confirmResponse != null && confirmResponse == false 
			&& ALERTS_OPEN_ITEM_confirmFlag != undefined && ALERTS_OPEN_ITEM_confirmFlag != null && ALERTS_OPEN_ITEM_confirmFlag != ''
					&& ALERTS_OPEN_ITEM_confirmFlagCancelValue != undefined && ALERTS_OPEN_ITEM_confirmFlagCancelValue != null && ALERTS_OPEN_ITEM_confirmFlagCancelValue != '')
	{
		approveUrl += "&" + ALERTS_OPEN_ITEM_confirmFlag + '=' + ALERTS_OPEN_ITEM_confirmFlagCancelValue;
	}
	
	$.ajax({
		 url: jQuery.contextPath + "/" + approveUrl,
         type:"post",
		 dataType:"json",
		 data: approveParams,
		 success: function(data){
		
			if (typeof data["_confirm"] != "undefined" && data["_confirm"] != null
				&& data["_confirmFlag"] != undefined && data["_confirmFlag"] != null ) 
			{
				ALERTS_OPEN_ITEM_confirmFlag = data['_confirmFlag'];
				ALERTS_OPEN_ITEM_confirmFlagValue = data['_confirmFlagValue'];
				ALERTS_OPEN_ITEM_confirmFlagCancelValue = data['_confirmFlagCancelValue'];
				_showConfirmMsg( data["_confirm"], "", "ALERTS_OPEN_ITEM_approve", "");
				_showProgressBar(false);
				return;
			}

			/*
			 * BUG 216176
			 * the blow statement was set after the condition (data["_error"] == undefined || data["_error"] == null)
			 * but it is moved before the condition to prevent settinh progress bar to false before finishing the reload of data
			 */
			_showProgressBar(false);
			
			if(data["_error"] == undefined || data["_error"] == null)
		 	{	
				//Executing the screen callback function after approve
				var continueTreatement = true;
				if(openItemCallBackFunc != undefined && openItemCallBackFunc != null && openItemCallBackFunc != '')
				{
					var continueTreatementValue = eval(openItemCallBackFunc + '(data)');
					if(continueTreatementValue != undefined && continueTreatementValue != null && continueTreatementValue == 'stop')
					{
						continueTreatement = false;
					}	
				}
				
				if(continueTreatement == true)
				{	
					ALERTS_OPEN_ITEM_closeOpenItem();
					//Reload the trsAckTOut grid
					ALERTS_OPEN_ITEM_reloadTrsAckTOutGrid();
				}
			}
		 },
		 beforeSend:function()
		{
			ALERTS_OPEN_ITEM_confirmFlag = '';
		}
    });

}

function ALERTS_OPEN_ITEM_reject(confirmResponse)
{
	_showProgressBar(true);
	
	var confirmFlagValue = 'true';
	if(confirmResponse != undefined && confirmResponse != null)
	{
		if((ALERTS_OPEN_ITEM_confirmFlagCancelValue == undefined 
				|| ALERTS_OPEN_ITEM_confirmFlagCancelValue == null
				    || ALERTS_OPEN_ITEM_confirmFlagCancelValue == '') && confirmResponse == false)
		{
			ALERTS_OPEN_ITEM_confirmFlag = '';
			_showProgressBar(false);
			return;	
		}
	}
	var rejectParams = ALERTS_OPEN_ITEM_buildParams(true,'R');
	
	if(rejectParams != undefined && rejectParams == 'alert_stop' )
	{
		_showProgressBar(false);
		return;
	}
	
	var rejectUrl = $("#rejectMethodUrl_"+ openItemPageRef).val();
	
	if( confirmResponse != undefined && confirmResponse != null && confirmResponse == true 
		&& ALERTS_OPEN_ITEM_confirmFlag != undefined && ALERTS_OPEN_ITEM_confirmFlag != null && ALERTS_OPEN_ITEM_confirmFlag != '')
	{
		if(ALERTS_OPEN_ITEM_confirmFlagValue != undefined && ALERTS_OPEN_ITEM_confirmFlagValue != null && ALERTS_OPEN_ITEM_confirmFlagValue != '')
		{
			confirmFlagValue = ALERTS_OPEN_ITEM_confirmFlagValue;
		}
		rejectUrl += "&" + ALERTS_OPEN_ITEM_confirmFlag + '=' + confirmFlagValue;
	}
	
	if(confirmResponse != undefined && confirmResponse != null && confirmResponse == false 
			&& ALERTS_OPEN_ITEM_confirmFlag != undefined && ALERTS_OPEN_ITEM_confirmFlag != null && ALERTS_OPEN_ITEM_confirmFlag != ''
					&& ALERTS_OPEN_ITEM_confirmFlagCancelValue != undefined && ALERTS_OPEN_ITEM_confirmFlagCancelValue != null && ALERTS_OPEN_ITEM_confirmFlagCancelValue != '')
	{
		rejectUrl += "&" + ALERTS_OPEN_ITEM_confirmFlag + '=' + ALERTS_OPEN_ITEM_confirmFlagCancelValue;
	}
	
	$.ajax({
		 url: jQuery.contextPath + "/" + rejectUrl,
         type:"post",
		 dataType:"json",
		 data: rejectParams,
		 success: function(data){
			
			if (typeof data["_confirm"] != "undefined" && data["_confirm"] != null
				&& data["_confirmFlag"] != undefined && data["_confirmFlag"] != null ) 
			{
				ALERTS_OPEN_ITEM_confirmFlag = data['_confirmFlag'];
				ALERTS_OPEN_ITEM_confirmFlagValue = data['_confirmFlagValue'];
				ALERTS_OPEN_ITEM_confirmFlagCancelValue = data['_confirmFlagCancelValue'];
				_showConfirmMsg( data["_confirm"], "", "ALERTS_OPEN_ITEM_reject", "");
				_showProgressBar(false);
				return;
			}
			_showProgressBar(false);
			if(data["_error"] == undefined || data["_error"] == null)
		 	{	
				//Executing the screen callback function after reject
				var continueTreatement = true;
				if(openItemCallBackFunc != undefined && openItemCallBackFunc != null && openItemCallBackFunc != '')
				{
					var continueTreatementValue = eval(openItemCallBackFunc + '(data)');
					if(continueTreatementValue != undefined && continueTreatementValue != null && continueTreatementValue == 'stop')
					{
						continueTreatement = false;
					}
				}
				
				if(continueTreatement == true)
				{
					ALERTS_OPEN_ITEM_closeOpenItem();
					//Reload the trsAckTOut grid
					ALERTS_OPEN_ITEM_reloadTrsAckTOutGrid();
				}	
			}
		 },
		beforeSend:function()
		{
			ALERTS_OPEN_ITEM_confirmFlag = '';
		}
		 
    });
	
}

function ALERTS_OPEN_ITEM_constructCustomButton(buttonId , jsOnClickFunction, buttonLabel, disabled)
{
	var htmlButton = "";
	if(buttonId != undefined && buttonId != null && buttonId != '')
	{
		var disabledAttribute = '';
		var disabledClass = '';
		var disabledAnchorStyle = '';
		var disabledSpanStyle = '';
		var onClickAttribute = ' onclick="'+ jsOnClickFunction +'()" ';
		if(disabled != undefined && disabled != null && disabled == true)
		{
			disabledAttribute = ' disabled="disabled" ';
			disabledClass = ' ui-state-disabled ';
			onClickAttribute = '';
			disabledAnchorStyle = ' style="border-color:black;" ';
			disabledSpanStyle = ' style="color:black;" ';
		}
		
		htmlButton = '<a ' + onClickAttribute + 
						'href="#" ' +
						'id="' + buttonId + '_RCVALERT" ' + disabledAttribute + ' ' + disabledAnchorStyle + ' ' + 
						'class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only ' + disabledClass + '" ' +
						'role="button">' +
						'<span class="ui-button-text" ' + disabledSpanStyle + ' >' + buttonLabel +'</span>' +
						'</a>';
	}
	return htmlButton;
}

function ALERTS_OPEN_ITEM_refreshAlertData(todoCode,todoLine)
{
	if(todoCode != undefined && todoCode != null 
			&& todoLine != undefined && todoLine != null)
	{
		$.ajax({
				url: jQuery.contextPath+"/path/alerts/ApproveAlertsMaint_refreshAlertData",
				type:"get",
				dataType:"json",
			  	data: {'alertsParamCO.todoCode':todoCode,'alertsParamCO.todoLine':todoLine},
				success: function(data){
			  		
			  		ALERTS_OPEN_ITEM_closeOpenItem();
					//Reload the trsAckTOut grid
					ALERTS_OPEN_ITEM_reloadTrsAckTOutGrid();
			  		_showProgressBar(false);
			  		
		        }
		});
	}
}

//Fix  #230302
function ALERTS_OPEN_ITEM_enableCloseAndDismissAlert()
{
	$('#alert_openItem_param_sendAlertCallBackFunction_RCVALERT').val('ALERTS_OPEN_ITEM_closeAndDismissAlert');
	$('#alert_openItem_param_sendAlertCallBackOnItemClose_RCVALERT').val('true');
}

//Fix  #230302
function ALERTS_OPEN_ITEM_closeAndDismissAlert(actionType, sendCallBackParam)
{
	var todoCode = null;
	var todoLine = null;
	var actionButton = null;
	
	if(sendCallBackParam != undefined && sendCallBackParam != null && sendCallBackParam != '')
	{
		var sendCallBackParamObj = $.parseJSON(sendCallBackParam);
		todoCode = sendCallBackParamObj['todoCode'];
		todoLine = sendCallBackParamObj['todoLine'];
		actionButton = sendCallBackParamObj['actionButton'];
	}	
	
	if(actionType != undefined && actionType == 'OPEN_ITEM' 
		&& actionButton != undefined && actionButton == 'DISMISS'
		&& todoCode != undefined && todoCode != null
		&& todoLine != undefined && todoLine != null)
	{
		var obj  = 	{
					"todoLine" : todoLine, 
					"todoCode" : todoCode 
					};
	
		_showProgressBar(true);	

		$.ajax({url:  jQuery.contextPath+"/path/alerts/TrsAckTOutAlertsGrid_trsAckTOutAlertsAfterOk", type:"post", dataType:"json", data: obj, 
			success: function()
			{
				trsAckTOutAlertGrid_Id_reloadGrid(); 
				_showProgressBar(false);
			}
		});
	}
}


function ALERTS_OPEN_ITEM_isFromIframe()
{ 
	if(window.name && window.name.indexOf("extScreenFrame") == 0)
	{
		return true;
	}
	else 
	{
		return false;
	}	
}


function ALERTS_OPEN_ITEM_returnScreenForm()
{
	var openItemForm = null;
	if(ALERTS_OPEN_ITEM_isFromIframe())
	{
		openItemForm = $("#screenContainerDiv_"+ openItemPageRef).find('form:first');
	}
	else
	{
		openItemForm = $("#open_item_div_"+ openItemPageRef).find('form:first');
	}
	
	return openItemForm;
}
