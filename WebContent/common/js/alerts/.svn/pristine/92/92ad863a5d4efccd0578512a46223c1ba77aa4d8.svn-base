
function SEND_ALERTS_MAINT_dismissAlert(actionType) {
	
	var sendAlertCallBackFunction =  $("#alert_param_sendAlertCallBackFunction_" + _pageRef).val();
	$("#send_alert_div_" + _pageRef).dialog("destroy");
	$("#send_alert_div_" + _pageRef).remove();
	
	/*
	 * The parameter actionType, is used to indicate the action taken by the user in the SEND ALERT POPUP
	 * The cation can be : S=Send , D=Dismiss, A=Approve, CHK_PWD = check pwd callback , OPEN_ITEM = open item clos call back
	 */
	
	if(actionType == undefined || actionType == null || actionType == '')
	{
		actionType = 'D';
	}
	
	//Eval the callback function
	if (sendAlertCallBackFunction != undefined && sendAlertCallBackFunction != null
			&& sendAlertCallBackFunction != '' && eval('typeof '+ sendAlertCallBackFunction) === 'function') 
	{
		 eval(sendAlertCallBackFunction + '(actionType)');
	}
	
}

function SEND_ALERTS_MAINT_approveAlert() {
	
	var loadSrc = jQuery.contextPath
			+ "/path/alerts/ApproveAlertsMaint_loadApproveAlerts?_pageRef="
			+ _pageRef;
	
	var approveAlertDivElement = $('<div>',{id:"approve_alert_div_"+_pageRef});
	
	$('body').append(approveAlertDivElement);
	
	/*for window approve alert*/
	approveAlertDivElement.dialog({
									modal : true,
									title : usr_inf_key,
									autoOpen : false,
									//show : 'slide',
									position : 'center',
									width : '250',
									height : '130',
									close : function() {
										//var theDialog = $(this);
										//theDialog.remove();
										ApproveAlertsMaint_closeApprove();
									}
								});
	var curParams = {
				"alertsParamCO.todoAlert" 	: $("#alert_param_todoAlert_" + _pageRef).val(),
				"alertsParamCO.compCode" 	: $("#alert_param_compCode_" + _pageRef).val(),
				"alertsParamCO.branchCode" 	: $("#alert_param_branchCode_" + _pageRef).val(),
				"alertsParamCO.status" 		: $("#alert_param_status_" + _pageRef).val(),
				"alertsParamCO.amount" 		: $("#alert_param_amount_" + _pageRef).val(),
				"alertsParamCO.reasonCode" 	: $("#alert_param_reasonCode_" + _pageRef).val(),
				"alertsParamCO.alertType" 	: $("#alert_param_alertType_" + _pageRef).val(),
				"alertsParamCO.trsNo" 		: $("#alert_param_trsNo_" + _pageRef).val(),
				"alertsParamCO.alertDescription" 	: $("#alert_param_alertDesc_" + _pageRef).val(),
					
				"alertsParamCO.briefNameEnglish" 	: $("#alert_param_briefNameEnglish_" + _pageRef).val(),
				"alertsParamCO.longNameEnglish" 	: $("#alert_param_longNameEnglish_" + _pageRef).val(),
				"alertsParamCO.briefNameArab" 		: $("#alert_param_briefNameArab_" + _pageRef).val(),
				"alertsParamCO.longNameArab" 		: $("#alert_param_longNameArab_" + _pageRef).val(),
				"alertsParamCO.distributionType" 	: $("#alert_param_distributionType_" + _pageRef).val(),
				"alertsParamCO.distributionTo" 		: $("#alert_param_distributionTo_" + _pageRef).val(),
				"alertsParamCO.todoType" 			: $("#alert_param_todoType_" + _pageRef).val(),
				"alertsParamCO.todoPriority" 		: $("#alert_param_todoPriority_" + _pageRef).val(),
				"alertsParamCO.todoExternal" 		: $("#alert_param_todoExternal_" + _pageRef).val(),
				"alertsParamCO.allowToSend" 		: $("#alert_param_allowToSend_" + _pageRef).val(),
				"alertsParamCO.todoChecked" 		: $("#alert_param_todoChecked_" + _pageRef).val(),
				"alertsParamCO.todoParam" 			: $("#alert_param_todoParam_" + _pageRef).val(),
				"alertsParamCO.todoExecution" 		: $("#alert_param_todoExecution_" + _pageRef).val(),
				"alertsParamCO.todoExcepEnglish" 	: $("#alert_param_todoExcepEnglish_" + _pageRef).val(),
				"alertsParamCO.todoExcepArabic" 	: $("#alert_param_todoExcepArabic_" + _pageRef).val(),
				"alertsParamCO.todoTellerBranch" 	: $("#alert_param_todoTellerBranch_" + _pageRef).val(),
				"alertsParamCO.todoTellerId" 		: $("#alert_param_todoTellerId_" + _pageRef).val(),
				"alertsParamCO.actionType" 			: $("#alert_param_actionType_" + _pageRef).val(),
				"alertsParamCO.progRef" 			: $("#alert_param_progRef_" + _pageRef).val(),
				"alertsParamCO.todoFrBranch" 		: $("#alert_param_todoFrBranch_" + _pageRef).val(),
				"alertsParamCO.tellerLevel" 		: $("#alert_param_tellerLevel_" + _pageRef).val(),
				"alertsParamCO.authOdAcc" 			: $("#alert_param_authOdAcc_" + _pageRef).val(),
				"alertsParamCO.trsType" 			: $("#alert_param_trsType_" + _pageRef).val(),
				"alertsParamCO.sendAlertCallBackFunction" 		: $("#alert_param_sendAlertCallBackFunction_" + _pageRef).val(),
				"alertsParamCO.sendAlertCallBackOnChkPwd" 		: $("#alert_param_sendAlertCallBackOnChkPwd_" + _pageRef).val(),
				"alertsParamCO.sendAlertCallBackOnChkPwdSuccess" : $("#alert_param_sendAlertCallBackOnChkPwdSuccess_" + _pageRef).val(),
				"alertsParamCO.sendAlertCallBackOnItemClose" 	: $("#alert_param_sendAlertCallBackOnItemClose_" + _pageRef).val(),
				"alertsParamCO.additionalParams" 	: $("#alert_param_additionalParams_" + _pageRef).val()
	};
	if($("#alert_param_accessRightsOptList_" + _pageRef).val()!="" && $("#alert_param_accessRightsOptList_" + _pageRef).val()!=null && typeof $("#alert_param_accessRightsOptList_" + _pageRef).val()!="undefined")
	{
		curParams["alertsParamCO.accessRightsOptList"] = $.parseJSON($("#alert_param_accessRightsOptList_" + _pageRef).val());
	}
	_showProgressBar(true);
	$(approveAlertDivElement).load(
		loadSrc,curParams,
		function() {
			SEND_ALERTS_MAINT_dismissAlert('A');
			$(approveAlertDivElement).dialog("open");
			_showProgressBar(false);
	});
	
	
}

function SEND_ALERTS_MAINT_sendAlert() {
	
	var allowLocalApproveOnly = $("#allowLocalApproveOnly_" + _pageRef).val();
	if(allowLocalApproveOnly && allowLocalApproveOnly == '1')
	{
		return;
	}
	
	var alertsGrid = $("#alertsGrid_Id_" + _pageRef);
	var rowIds = alertsGrid.jqGrid('getDataIDs').length;
	var selRowId = $("#alertsGrid_Id_" + _pageRef).jqGrid('getGridParam',
			'selrow');
	myObject = $("#alertsGrid_Id_" + _pageRef).jqGrid('getRowData', selRowId);
	if (selRowId != null) {
		if (rowIds != 0) {
			var param = {
				"_pageRef" 			: _pageRef,
				"receiverCode" 		: myObject["alertsParamCO.userCode"],
				"receiverUserId" 	: myObject["alertsParamCO.userId"],
				"todoAlert" 	: $("#alert_param_todoAlert_" + _pageRef).val(),
				"compCode" 		: $("#alert_param_compCode_" + _pageRef).val(),
				"branchCode" 	: $("#alert_param_branchCode_" + _pageRef).val(),
				"status" 		: $("#alert_param_status_" + _pageRef).val(),
				"amount" 		: $("#alert_param_amount_" + _pageRef).val(),
				"reasonCode" 	: $("#alert_param_reasonCode_" + _pageRef).val(),
				"alertType" 	: $("#alert_param_alertType_" + _pageRef).val(),
				"trsNo" 		: $("#alert_param_trsNo_" + _pageRef).val(),
				"alertDesc" 	: $("#alert_param_alertDesc_" + _pageRef).val(),
				"todoAlert" 	: $("#alert_param_todoAlert_" + _pageRef).val(),
				
				"briefNameEnglish" 	: $("#alert_param_briefNameEnglish_" + _pageRef).val(),
				"longNameEnglish" 	: $("#alert_param_longNameEnglish_" + _pageRef).val(),
				"briefNameArab" 	: $("#alert_param_briefNameArab_" + _pageRef).val(),
				"longNameArab" 		: $("#alert_param_longNameArab_" + _pageRef).val(),
				"distributionType" 	: $("#alert_param_distributionType_" + _pageRef).val(),
				"distributionTo" 	: $("#alert_param_distributionTo_" + _pageRef).val(),
				"todoType" 			: $("#alert_param_todoType_" + _pageRef).val(),
				"todoPriority" 		: $("#alert_param_todoPriority_" + _pageRef).val(),
				"todoExternal" 		: $("#alert_param_todoExternal_" + _pageRef).val(),
				"allowToSend" 		: $("#alert_param_allowToSend_" + _pageRef).val(),
				"todoChecked" 		: $("#alert_param_todoChecked_" + _pageRef).val(),
				"todoParam" 		: $("#alert_param_todoParam_" + _pageRef).val(),
				"todoExecution" 	: $("#alert_param_todoExecution_" + _pageRef).val(),
				"todoExcepEnglish" 	: $("#alert_param_todoExcepEnglish_" + _pageRef).val(),
				"todoExcepArabic" 	: $("#alert_param_todoExcepArabic_" + _pageRef).val(),
				"todoTellerBranch" 	: $("#alert_param_todoTellerBranch_" + _pageRef).val(),
				"todoFrBranch" 		: $("#alert_param_todoFrBranch_" + _pageRef).val(),
				"todoTellerId" 		: $("#alert_param_todoTellerId_" + _pageRef).val(),
				"actionType" 		: $("#alert_param_actionType_" + _pageRef).val(),
				"progRef" 			: $("#alert_param_progRef_" + _pageRef).val(),
				"todoAlertOldStatus" 			: $("#alert_param_todoAlertOldStatus_" + _pageRef).val(),
				"CIF_NO"   		:$("#alert_param_cifNo_" + _pageRef).val(),
				"todoRemarqs"   		:$("#alert_param_todoRemarqs_" + _pageRef).val(),
				"additionalParams"  : $("#alert_param_additionalParams_" + _pageRef).val()
				
			};
			_showProgressBar(true);
			$.ajax( {
						url : jQuery.contextPath
								+ "/path/alerts/AlertsMaint_sendAlert",
						type : "post",
						dataType : "json",
						data : param,
						success : function(data) {
							SEND_ALERTS_MAINT_dismissAlert('S');
							_showProgressBar(false);
						}
					});
		}
	}
	else
	{
		_showErrorMsg(msg_noRecordSelectedLabel,Warning_key);		
	}
}