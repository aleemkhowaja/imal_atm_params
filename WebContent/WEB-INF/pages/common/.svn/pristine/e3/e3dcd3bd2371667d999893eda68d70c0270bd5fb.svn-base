<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@taglib prefix="pt" uri="/path-toolbar-tags"%>

<div id="AlertsFormDiv_<ps:property value="_pageRef" escapeHtml="true"/>" style="width: 820px; height: 350px;">
	<ps:form id="AlertsForm_${_pageRef}" useHiddenProps="true" cssStyle="width:99%; height: 99%">
		
		<ps:hidden id="allowLocalApproveOnly_${_pageRef}" name="allowLocalApproveOnly"/>		
		
		<table width="100%" height="100%" border="0">
			<tr>
				<td width="20%">
					<table border="0" height="100%" width="100%">
						<tr align="center">
							<td>
								<img width="50px" height="50px" src="${pageContext.request.contextPath}/common/style/images/send_alert.png">
								<br/> <ps:label name="alertLabelKey" id="alertLabelInfo_${_pageRef}" />		
							</td>
						</tr>
					</table>
				</td>
				<td align="left">
					<ps:textarea id="trxInfo_${_pageRef}" name="alertDescTranslated"
						readonly="true" rows="7" />
				</td>
			</tr>
		
			<tr>
				<td width="20%">
					<div id="divTransinfo_<ps:property value="_pageRef" escapeHtml="true"/>" style="display: none;">
						<u> <ps:label key="Alerts_User_Key"
								id="alertUserLabelKey_${_pageRef}" /> </u>
					</div>
					<div id="divWarning_<ps:property value="_pageRef" escapeHtml="true"/>" style="display: none;">
						<u> <ps:label key="Alert_User_Warning_key"
								id="alertUserWarningLabel_${_pageRef}" /> </u>
					</div>
				</td>
				<td align="left" width="99%">
					<div id="alertsList_id_<ps:property value="_pageRef" escapeHtml="true"/>" style="width=99%;">
						<%@include file="SendAlertsList.jsp"%>
					</div>
				</td>
			</tr>
		
			<tr>
				<td colspan="2" width="100%">
				    <br/>
					<pt:toolBar id="alertToolbar_${_pageRef}" width="100%">
						<table border="0" width="100%" align="center">
							<tr>
								<td align="center">
									<ps:if test='%{ allowLocalApproveOnly != "1" }'> 
										<psj:a button="true" href="#" onclick="SEND_ALERTS_MAINT_sendAlert()"
											id="sendBut_${_pageRef}">
											<ps:text name="Send_key"></ps:text>
										</psj:a>
									</ps:if>
									<psj:a button="true" href="#" onclick="SEND_ALERTS_MAINT_dismissAlert()"
										id="dismissbut_${_pageRef}">
										<ps:text name="dismiss"></ps:text>
									</psj:a>
									<ps:if test='%{ allowLocalApprove == "1" || allowLocalApproveOnly == "1" }'>
										<psj:a button="true" href="#" onclick="SEND_ALERTS_MAINT_approveAlert()"
											id="approveBut_${_pageRef}">
											<ps:text name="Approve_key"></ps:text>
										</psj:a>
									</ps:if>
								</td>
							</tr>
						</table>
					</pt:toolBar>
				</td>
			</tr>
		</table>
		
	</ps:form>
</div>
<script type="text/javascript">
	$.struts2_jquery.require("SendAlertsMaint.js" ,null,jQuery.contextPath+"/common/js/alerts/")
	var allowLocalApproveOnly = '<ps:property value="allowLocalApproveOnly" escapeHtml="false" escapeJavaScript="true"/>';
</script>
