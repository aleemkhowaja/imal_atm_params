<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@taglib prefix="pt" uri="/path-toolbar-tags"%>

<ps:if test='%{"true".equals(loadInNewWindow)}'>
	
	<script type="text/javascript">
	
		_showProgressBar(false);
		var	callBackFuncRequireJs = '<ps:property value="callBackPrintFuncRequireJs" escapeHtml="false" escapeJavaScript="true"/>';
		var	callBackFuncRequirePath = '<ps:property value="callBackPrintFuncRequirePath" escapeHtml="false" escapeJavaScript="true"/>';
		var openItemCallBackFunc = '<ps:property value="callBackJsFunc" escapeHtml="false" escapeJavaScript="true"/>';
		var openItemJsonParams = $.parseJSON('<ps:property value="openItemParams" escapeHtml="false" escapeJavaScript="true"/>');
		
		if(callBackFuncRequireJs != undefined && callBackFuncRequireJs != null && callBackFuncRequireJs != ''
		&& callBackFuncRequirePath != undefined && callBackFuncRequirePath != null && callBackFuncRequirePath != '')
		{
			$.struts2_jquery.require(callBackFuncRequireJs ,null,jQuery.contextPath+callBackFuncRequirePath);
		}	
						
		//Add customized button to the ope item screen
		if (openItemCallBackFunc != undefined 
				&& openItemCallBackFunc != null
				&& openItemCallBackFunc != ''
				&& eval('typeof ' + openItemCallBackFunc ) === 'function')
		{
			eval(openItemCallBackFunc)(openItemJsonParams);
		}  
		
	</script>
	
</ps:if>
<ps:else>

<ps:hidden id="openItemAppName_${_pageRef}" value="%{#session.sesVO.currentAppName}" ></ps:hidden>
<ps:hidden id="rejectMethodUrl_${_pageRef}" name="rejectMethodUrl" ></ps:hidden>
<ps:hidden id="approveMethodeUrl_${_pageRef}" name="approveMethodeUrl" ></ps:hidden>
<ps:hidden id="openMethodUrl_${_pageRef}" name="openMethodUrl" ></ps:hidden>
<ps:hidden id="openItemParams_${_pageRef}" name="openItemParams" ></ps:hidden>

<ps:hidden id="alert_openItem_param_trsNo_${_pageRef}" name="alertsParamCO.trsNo"/>
<ps:hidden id="alert_openItem_param_alertType_${_pageRef}" name="alertsParamCO.alertType"/>
<ps:hidden id="alert_openItem_param_reasonCode_${_pageRef}" name="alertsParamCO.reasonCode"/>
<ps:hidden id="alert_openItem_param_amount_${_pageRef}" name="alertsParamCO.amount"/>
<ps:hidden id="alert_openItem_param_status_${_pageRef}" name="alertsParamCO.status"/>
<ps:hidden id="alert_openItem_param_compCode_${_pageRef}" name="alertsParamCO.compCode"/>
<ps:hidden id="alert_openItem_param_trsType_${_pageRef}" name="alertsParamCO.trsType"/>
<ps:hidden id="alert_openItem_param_branchCode_${_pageRef}" name="alertsParamCO.branchCode"/>
<ps:hidden id="alert_openItem_param_todoAlert_${_pageRef}" name="alertsParamCO.todoAlert"/>
<ps:hidden id="alert_openItem_param_alertDesc_${_pageRef}" name="alertsParamCO.alertDescription"/>

<ps:hidden id="alert_openItem_param_briefNameEnglish_${_pageRef}" name="alertsParamCO.briefNameEnglish"/>	
<ps:hidden id="alert_openItem_param_longNameEnglish_${_pageRef}" name="alertsParamCO.longNameEnglish"/>	
<ps:hidden id="alert_openItem_param_briefNameArab_${_pageRef}" name="alertsParamCO.briefNameArab"/>	
<ps:hidden id="alert_openItem_param_longNameArab_${_pageRef}" name="alertsParamCO.longNameArab"/> 
<ps:hidden id="alert_openItem_param_distributionType_${_pageRef}" name="alertsParamCO.distributionType"/>	
<ps:hidden id="alert_openItem_param_distributionTo_${_pageRef}" name="alertsParamCO.distributionTo"/> 	
<ps:hidden id="alert_openItem_param_todoType_${_pageRef}" name="alertsParamCO.todoType"/>
<ps:hidden id="alert_openItem_param_todoPriority_${_pageRef}" name="alertsParamCO.todoPriority"/>	
<ps:hidden id="alert_openItem_param_todoExternal_${_pageRef}" name="alertsParamCO.todoExternal"/>	
<ps:hidden id="alert_openItem_param_allowToSend_${_pageRef}" name="alertsParamCO.allowToSend"/>	
<ps:hidden id="alert_openItem_param_todoChecked_${_pageRef}" name="alertsParamCO.todoChecked"/> 	
<ps:hidden id="alert_openItem_param_todoParam_${_pageRef}" name="alertsParamCO.todoParam"/> 	
<ps:hidden id="alert_openItem_param_todoExecution_${_pageRef}" name="alertsParamCO.todoExecution"/>	
<ps:hidden id="alert_openItem_param_todoExcepEnglish_${_pageRef}" name="alertsParamCO.todoExcepEnglish"/>	
<ps:hidden id="alert_openItem_param_todoExcepArabic_${_pageRef}" name="alertsParamCO.todoExcepArabic"/> 	
<ps:hidden id="alert_openItem_param_todoTellerBranch_${_pageRef}" name="alertsParamCO.todoTellerBranch"/> 	
<ps:hidden id="alert_openItem_param_todoTellerId_${_pageRef}" name="alertsParamCO.todoTellerId"/> 	
<ps:hidden id="alert_openItem_param_actionType_${_pageRef}" name="alertsParamCO.actionType"/>	
<ps:hidden id="alert_openItem_param_progRef_${_pageRef}" name="alertsParamCO.progRef"/>

<ps:hidden id="alert_openItem_param_isLocalApprove_${_pageRef}" name="alertsParamCO.isLocalApprove"/>	
<ps:hidden id="alert_openItem_param_todoCode_${_pageRef}" name="alertsParamCO.todoCode"/>	
<ps:hidden id="alert_openItem_param_todoLine_${_pageRef}" name="alertsParamCO.todoLine"/>

<ps:hidden id="alert_openItem_param_sendAlertCallBackFunction_${_pageRef}" name="alertsParamCO.sendAlertCallBackFunction"/>	
<ps:hidden id="alert_openItem_param_sendAlertCallBackOnChkPwd_${_pageRef}" name="alertsParamCO.sendAlertCallBackOnChkPwd"/>
<ps:hidden id="alert_approve_param_sendAlertCallBackOnChkPwdSuccess_${_pageRef}" name="alertsParamCO.sendAlertCallBackOnChkPwdSuccess"/>	
<ps:hidden id="alert_openItem_param_sendAlertCallBackOnItemClose_${_pageRef}" name="alertsParamCO.sendAlertCallBackOnItemClose"/>

<table id="OpenItemTable_<ps:property value="_pageRef" escapeHtml="true"/>" style="visibility:hidden">
	<tr>
		<td>
			<fieldset id="OpenItemFieldSet_<ps:property value="_pageRef" escapeHtml="true"/>">
				<div id="OpenItemContainerDiv_<ps:property value="_pageRef" escapeHtml="true"/>" style="overflow: scroll;">
					<div id="OpenItemDiv_<ps:property value="_pageRef" escapeHtml="true"/>" style="width: 1000px; height: 800px;"></div>
				</div>
			</fieldset>
		</td>
	</tr>
	<tr>
		<td>
			<br/>
			<ps:if test="showToolbar == true">
				<pt:toolBar id="OpenItemToolbar_${_pageRef}" width="100%">
					<table border="0" width="95%" align="center">
						<tr>
							<td align="center">
	
								<ps:if test='%{(alertsParamCO.alertType=="TRANS" )}'>
	
									<psj:a button="true" href="#"
										onclick="ALERTS_OPEN_ITEM_approve()"
										id="alertsOpenItemApprove_${_pageRef}">
										<ps:text name="Approve_key"></ps:text>
									</psj:a>
	
									<psj:a button="true" href="#"
										onclick="ALERTS_OPEN_ITEM_reject()"
										id="alertsOpenItemReject_${_pageRef}">
										<ps:text name="Reject_Key"></ps:text>
									</psj:a>
	
								</ps:if>
	
								<psj:a button="true" href="#"
									onclick="ALERTS_OPEN_ITEM_closeOpenItem('DISMISS')"
									id="alertsOpenItemDismiss_${_pageRef}">
									<ps:text name="dismiss"></ps:text>
								</psj:a>
	
							</td>
						</tr>
					</table>
				</pt:toolBar>
			</ps:if>
		</td>
	</tr>
</table>	
<script type="text/javascript">

//Initialise the openItem js function that should be called on approve/reject to prepare add the customized buttons (like the Modify button)
var addButtonJsFunction = '<ps:property value="addButtonJsFunction" escapeHtml="false" escapeJavaScript="true"/>';
//Initialise the openItem js function that should be called on approve/reject to prepare the parameters (grid params) 
var prepareParamsJsFunction = '<ps:property value="prepareParamsJsFunction" escapeHtml="false" escapeJavaScript="true"/>';
//Initialize the popup pageRef
var openItemPageRef = '<ps:property value="_pageRef" escapeJavaScript="true"/>'; 
//Set the old pageRef before opening the openitem popup.
var openItem_OldPageRef ="";
if(typeof _pageRef != "undefined" && _pageRef != null)
{	
	openItem_OldPageRef = _pageRef;
}
//Set the pageRef to be the same like the openItem popup. Note that itemPageRef contain a '_ALERT' suffix.
_pageRef = '<ps:property value="itemPageRef" escapeHtml="false" escapeJavaScript="true"/>';

var openItemJsonParams = $.parseJSON('<ps:property value="openItemParams" escapeHtml="false" escapeJavaScript="true"/>');

//This function is the callback that should be executed after alert approve/reject
var openItemCallBackFunc = '<ps:property value="callBackJsFunc" escapeHtml="false" escapeJavaScript="true"/>';

//This variable indicate if the toolbar should be hidden or visible 
var showToolbar = <ps:property value="showToolbar" escapeHtml="false" escapeJavaScript="true"/>;

var refreshDataMessage = '<ps:property value="refreshDataMessage" escapeHtml="false" escapeJavaScript="true"/>';
var todoCode = '<ps:property value="alertsParamCO.todoCode" escapeHtml="false" escapeJavaScript="true"/>';
var todoLine = '<ps:property value="alertsParamCO.todoLine" escapeHtml="false" escapeJavaScript="true"/>';

var	callBackFuncRequireJs = '<ps:property value="callBackPrintFuncRequireJs" escapeHtml="false" escapeJavaScript="true"/>';
var	callBackFuncRequirePath = '<ps:property value="callBackPrintFuncRequirePath" escapeHtml="false" escapeJavaScript="true"/>';

$(document).ready(function (){
	
		_showProgressBar(true);
		
		var loadSrc = jQuery.contextPath + '<ps:property value="openMethodUrl" escapeHtml="false" escapeJavaScript="true"/>';
		
		$.struts2_jquery.require("AlertsOpenItem.js" ,null,jQuery.contextPath+"/common/js/alerts/");
		
		//Hide all toolbars having the attribute hideInAlert = 'true'
		$("#OpenItemDiv_"+ openItemPageRef).load(loadSrc,openItemJsonParams,function() {
			
			//Resize openitem window
			$.struts2_jquery.require("ApproveAlertsMaint.js" ,null,jQuery.contextPath+"/common/js/alerts/");
			

			//Fix Issue #216663 - in case of opening from landing page, the $('#content-container') does not exists.
			//The $(window) will be used instead. 
			
			
			if( ALERTS_OPEN_ITEM_isFromIframe() )
			{
				$('#OpenItemTable_' + openItemPageRef).css('width', '99%');
				$('#OpenItemTable_' + openItemPageRef).css('height', '99%');
				$('#OpenItemContainerDiv_' + openItemPageRef).css('width', '99%');
				$('#OpenItemContainerDiv_' + openItemPageRef).css('height', '99%');
				$('#OpenItemDiv_' + openItemPageRef).css('width', '99%');
				$('#OpenItemDiv_' + openItemPageRef).css('height', '99%');
				
				var windowWidth = $(window).width();
				var windowHeight = $(window).height();
				$('#OpenItemFieldSet_' + openItemPageRef).css('width', windowWidth -50 + 'px');
				$('#OpenItemFieldSet_' + openItemPageRef).css('height', windowHeight -100 + 'px');
				//Remove the progress bar added outside the iframe
				_showProgressBar(false);
			}
			else
			{
				var screenWidth = 100;
				var screenHeight = 100;
				if($('#content-container') != undefined && $('#content-container').length > 0)
				{
				 	screenWidth = $('#content-container').width();
				 	screenHeight = $('#content-container').height();
				}
				else
				{
					screenWidth = $(window).width() -100;
				 	screenHeight = $(window).height() -100;
				}	
			
				ApproveAlertsMaint_resizeOpenItemWindow(openItemPageRef,screenWidth,screenHeight);	
			}
			
			
			$("#OpenItemTable_" + openItemPageRef).css('visibility', 'visible');
			
			
			$('#OpenItemDiv_'+ openItemPageRef + ' div.hideInAlert').each(function( i, elem ){
				$(this).css("display","none"); 
			});
			
			if('${alertsParamCO.alertType}' == 'TRANS' || '${alertsParamCO.alertType}' == 'TO')
			{
				if( $('#TODO_ALERT_REFRESH_DATA_' + _pageRef) != undefined )
				{
					var todoAlertRefreshData = $('#TODO_ALERT_REFRESH_DATA_' + _pageRef).val();
				
					if(todoAlertRefreshData != undefined && todoAlertRefreshData != null && todoAlertRefreshData == 'true')
					{
						_showErrorMsg(refreshDataMessage,"Warning");
						_showProgressBar(true);
						ALERTS_OPEN_ITEM_refreshAlertData(todoCode,todoLine);
					}
				}
			
				if(showToolbar != undefined && showToolbar != null && showToolbar == true)
				{	
					if('${alertsParamCO.alertType}' == 'TRANS')
					{
						if(callBackFuncRequireJs != undefined && callBackFuncRequireJs != null && callBackFuncRequireJs != ''
							&& callBackFuncRequirePath != undefined && callBackFuncRequirePath != null && callBackFuncRequirePath != '')
						{
							$.struts2_jquery.require(callBackFuncRequireJs ,null,jQuery.contextPath+callBackFuncRequirePath);
						}	
					
						//Add customized button to the ope item screen
						if (addButtonJsFunction != undefined 
								&& addButtonJsFunction != null
								&& addButtonJsFunction != ''
								&& eval('typeof ${addButtonJsFunction}') === 'function')
						{
							var htmlButtonsResult = eval(addButtonJsFunction+'()');
							if(htmlButtonsResult != null && htmlButtonsResult != undefined && htmlButtonsResult != '')
							{
								$('#OpenItemToolbar_${_pageRef}').find('td').append($(htmlButtonsResult));
							}
						}
					}
				}
			}
			
			_showProgressBar(false);
		});
		
});

</script>
</ps:else>
