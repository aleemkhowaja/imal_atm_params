<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@taglib prefix="pt" uri="/path-toolbar-tags"%>

<script type="text/javascript">
	$.struts2_jquery.require("ApproveAlertsMaint.js" ,null,jQuery.contextPath+"/common/js/alerts/");
</script>

<ps:form id="ApproveAlertsForm_${_pageRef}" useHiddenProps="true">
		
	<ps:hidden id="alert_approve_param_trsNo_${_pageRef}" name="alertsParamCO.trsNo"/>
	<ps:hidden id="alert_approve_param_alertType_${_pageRef}" name="alertsParamCO.alertType"/>
	<ps:hidden id="alert_approve_param_reasonCode_${_pageRef}" name="alertsParamCO.reasonCode"/>
	<ps:hidden id="alert_approve_param_amount_${_pageRef}" name="alertsParamCO.amount"/>
	<ps:hidden id="alert_approve_param_status_${_pageRef}" name="alertsParamCO.status"/>
	<ps:hidden id="alert_approve_param_compCode_${_pageRef}" name="alertsParamCO.compCode"/>
	<ps:hidden id="alert_approve_param_trsType_${_pageRef}" name="alertsParamCO.trsType"/>
	<ps:hidden id="alert_approve_param_branchCode_${_pageRef}" name="alertsParamCO.branchCode"/>
	<ps:hidden id="alert_approve_param_todoAlert_${_pageRef}" name="alertsParamCO.todoAlert"/>
	<ps:hidden id="alert_approve_param_alertDesc_${_pageRef}" name="alertsParamCO.alertDescription"/>
	
	<ps:hidden id="alert_approve_param_briefNameEnglish_${_pageRef}" name="alertsParamCO.briefNameEnglish"/>	
	<ps:hidden id="alert_approve_param_longNameEnglish_${_pageRef}" name="alertsParamCO.longNameEnglish"/>	
	<ps:hidden id="alert_approve_param_briefNameArab_${_pageRef}" name="alertsParamCO.briefNameArab"/>	
	<ps:hidden id="alert_approve_param_longNameArab_${_pageRef}" name="alertsParamCO.longNameArab"/> 
	<ps:hidden id="alert_approve_param_distributionType_${_pageRef}" name="alertsParamCO.distributionType"/>	
	<ps:hidden id="alert_approve_param_distributionTo_${_pageRef}" name="alertsParamCO.distributionTo"/> 	
	<ps:hidden id="alert_approve_param_todoType_${_pageRef}" name="alertsParamCO.todoType"/>
	<ps:hidden id="alert_approve_param_todoPriority_${_pageRef}" name="alertsParamCO.todoPriority"/>	
	<ps:hidden id="alert_approve_param_todoExternal_${_pageRef}" name="alertsParamCO.todoExternal"/>	
	<ps:hidden id="alert_approve_param_allowToSend_${_pageRef}" name="alertsParamCO.allowToSend"/>	
	<ps:hidden id="alert_approve_param_todoChecked_${_pageRef}" name="alertsParamCO.todoChecked"/> 	
	<ps:hidden id="alert_approve_param_todoParam_${_pageRef}" name="alertsParamCO.todoParam"/> 	
	<ps:hidden id="alert_approve_param_todoExecution_${_pageRef}" name="alertsParamCO.todoExecution"/>	
	<ps:hidden id="alert_approve_param_todoExcepEnglish_${_pageRef}" name="alertsParamCO.todoExcepEnglish"/>	
	<ps:hidden id="alert_approve_param_todoExcepArabic_${_pageRef}" name="alertsParamCO.todoExcepArabic"/> 	
	<ps:hidden id="alert_approve_param_todoTellerBranch_${_pageRef}" name="alertsParamCO.todoTellerBranch"/> 	
	<ps:hidden id="alert_approve_param_todoTellerId_${_pageRef}" name="alertsParamCO.todoTellerId"/> 	
	<ps:hidden id="alert_approve_param_actionType_${_pageRef}" name="alertsParamCO.actionType"/>
	<ps:hidden id="alert_approve_param_progRef_${_pageRef}" name="alertsParamCO.progRef"/>	
	<ps:hidden id="alert_approve_param_todoFrBranch_${_pageRef}" name="alertsParamCO.todoFrBranch"/>	
	<ps:hidden id="alert_approve_param_authOdAcc_${_pageRef}" name="alertsParamCO.authOdAcc"/>	
	
	<ps:hidden id="alert_approve_param_todoLine_${_pageRef}" name="alertsParamCO.todoLine"/>	
	<ps:hidden id="alert_approve_param_todoCode_${_pageRef}" name="alertsParamCO.todoCode"/>	
	<ps:hidden id="alert_approve_param_subtype_${_pageRef}" name="alertsParamCO.subtype"/>	
	<ps:hidden id="alert_approve_param_todoAlertOldStatus_${_pageRef}" name="alertsParamCO.todoAlertOldStatus"/>
	<ps:hidden id="alert_approve_param_todoAlertTellerLevel_${_pageRef}" name="alertsParamCO.tellerLevel"/>
	<ps:hidden id="alert_approve_param_sendAlertCallBackFunction_${_pageRef}" name="alertsParamCO.sendAlertCallBackFunction"/>	
	<ps:hidden id="alert_approve_param_sendAlertCallBackOnChkPwd_${_pageRef}" name="alertsParamCO.sendAlertCallBackOnChkPwd"/>
	<ps:hidden id="alert_approve_param_sendAlertCallBackOnChkPwdSuccess_${_pageRef}" name="alertsParamCO.sendAlertCallBackOnChkPwdSuccess"/>	
	<ps:hidden id="alert_approve_param_sendAlertCallBackOnItemClose_${_pageRef}" name="alertsParamCO.sendAlertCallBackOnItemClose"/>	
	<ps:hidden id="alert_approve_param_additionalParams_${_pageRef}" name="alertsParamCO.additionalParams"/>
	<ps:hidden id="actionType_${_pageRef}" />
		<ps:hidden id="alert_approve_param_accessRightsOptList_${_pageRef}" value="${customAccessRightsOptList}"/>	
	<table border="0" align="center">
		
		
			<tr>
				<td>
					<ps:label theme="simple" for="usr_name_alert_${_pageRef}" key="User_Name__key"></ps:label>
				</td>
				<td>
				
					<ps:if test='%{isCheckForPassWord == "true"}'>
						<ps:textfield id="usr_name_alert_${_pageRef}"
							cssClass="texta keyboardInput" cssStyle="text-transform:uppercase;"
							onblur="this.value=this.value.toUpperCase()" readonly="true" name="userName"></ps:textfield>
					</ps:if>
					
					<ps:else>
						<ps:textfield id="usr_name_alert_${_pageRef}"
							cssClass="texta keyboardInput" cssStyle="text-transform:uppercase;"
							onblur="this.value=this.value.toUpperCase()" required="true"></ps:textfield>
					</ps:else>
						
				</td>
			</tr>
		
		<tr>
			<td>
				<ps:label theme="simple" for="pwd_alert_${_pageRef}" key="password_key"></ps:label>
			</td>
			<td>
				<ps:password name="password"
					id="pwd_alert_${_pageRef}" required="true">
				</ps:password>
			</td>
		</tr>
	</table>
	
	<table border="0" align="center" width="100%">
		<tr align="center">
			<td  align="center">
				<pt:toolBar id="approveToolbar_${_pageRef}" width="100%">

					<ps:if test='%{isCheckForPassWord == "true"}'>

						<psj:submit id="sendButton_${_pageRef}" button="true"
							onclick="ApproveAlertsMaint_setActionType('ApproveAlertsMaint_checkPwdOnly')"
							freezeOnSubmit="true">
							<ps:text name="submit"></ps:text>
						</psj:submit>
						&nbsp;&nbsp;
						<psj:submit id="dismissbut_${_pageRef}" button="true"
							onclick="ApproveAlertsMaint_closeCheckPwdOnly()" type="button"
							freezeOnSubmit="true">
							<ps:text name="Cancel_key"></ps:text>
						</psj:submit>

					</ps:if>

					<ps:else>

						<psj:submit id="sendButtonForApprove_${_pageRef}" button="true"
							onclick="ApproveAlertsMaint_setActionType('ApproveAlertsMaint_checkUsrPwd')"
							freezeOnSubmit="true">
							<ps:text name="submit"></ps:text>
						</psj:submit>
						&nbsp;&nbsp;
						<psj:submit id="dismissbutForApprove_${_pageRef}" button="true"
							onclick="ApproveAlertsMaint_closeApprove()" type="button"
							freezeOnSubmit="true">
							<ps:text name="Cancel_key"></ps:text>
						</psj:submit>

					</ps:else>


				</pt:toolBar>
			</td>
		</tr>
	</table>
</ps:form>


<script type="text/javascript">
var currPageRef = _pageRef;
if(currPageRef == '' && typeof alertsPageRef != 'undefined' && alertsPageRef != null && alertsPageRef != '' )
{
	currPageRef = alertsPageRef;
}

if($("#approve_alert_div_"+currPageRef))
{
	$("#approve_alert_div_"+currPageRef).css('overflow','hidden');
}
var isCheckForPassWord = '${isCheckForPassWord}';
$(document).ready(function (){
	
	$("#pwd_alert_" + currPageRef).css('height',$("#usr_name_alert_" + currPageRef).height()+'px')
	
	if(isCheckForPassWord != undefined && isCheckForPassWord != null && isCheckForPassWord == 'true')
	{
		var opentItemDiv = $("#open_item_div_RCVALERT");
		
		// return the window height and width for that big parameter is provided
		var windowWidth = returnMaxWidth(1000000000);
		var windowHeight = returnMaxHeight(1000000000);
		var popupWidth = returnMaxWidth(240);
		var popupHeight = returnMaxHeight(140);
		var popupTop = ( windowHeight / 2 ) - ( popupHeight / 2);
		var popupLeft = ( windowWidth / 2 ) - ( popupWidth / 2);
		
		$(opentItemDiv).dialog('option', 'position', [popupLeft,popupTop]);
		//$(opentItemDiv).dialog({ position: 'right+' + popupLeft +' top+' + popupTop });
		
		$(opentItemDiv).css("width",popupWidth + 10);
		$(opentItemDiv).css("height", popupHeight + 10);
		$(opentItemDiv).dialog( "option", "width", popupWidth);
		$(opentItemDiv).dialog( "option", "height", popupHeight);
		$(opentItemDiv).dialog( "option", "close", function()
													{   
														//Close the popup
														$("#open_item_div_RCVALERT").dialog("destroy");
														$("#open_item_div_RCVALERT").remove();
													} 
							  );
		
		_showProgressBar(false);
	}
	$("#ApproveAlertsForm_" + currPageRef).processAfterValid("ApproveAlertsMaint_SubmitAction",{});
});

</script>





