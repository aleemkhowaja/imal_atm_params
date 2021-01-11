<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@taglib prefix="pt" uri="/path-toolbar-tags"%>

<script type="text/javascript">
	$.struts2_jquery.require("ForwardAlertsMaint.js" ,null,"${pageContext.request.contextPath}/common/js/alerts/");
</script>

<ps:form id="AlertsForwardForm_${_pageRef}" useHiddenProps="true">
	
	<ps:hidden id="todoLine_forward_${_pageRef}" name="todoLine" />
	<ps:hidden id="autoIncr_forward_${_pageRef}" name="autoIncr" />
	<ps:hidden id="todoCode_forward_${_pageRef}" name="todoCode" />
	<ps:hidden id="statusCode_forward_${_pageRef}" name="statusCode" />
	
	<table width="100%" border="0">
		<tr>

			<td width="20%">
				<table border="0" height="100%" width="100%">
					<tr align="center">
						<td>
							<u> <ps:label name="alertLabelKey"
									id="alertLabelInfo_f_${_pageRef}" /> </u>
						</td>
					</tr>
					<tr>
						<td>
							&nbsp;
						</td>
					</tr>
					<tr>
						<td>
							&nbsp;
						</td>
					</tr>
					<tr align="center">
						<td>
							<img width="50px" height="50px" src="${pageContext.request.contextPath}/common/style/images/send_alert.png">
						</td>
					</tr>
				</table>


			</td>
			<td align="left">
				<ps:textarea id="trxInfo_f_${_pageRef}" name="alertDescTranslated" readonly="true"
					rows="10" />
			</td>
		</tr>

	
		<tr>
			<td width="20%">
				<div id="divTransinfo_f_${_pageRef}" style="display: none;">
					<u> <ps:label key="Alerts_User_Key"
							id="alertUserLabelKey_f_${_pageRef}" /> </u>
				</div>
				<div id="divWarning_f_${_pageRef}" style="display: none;">
					<u> <ps:label key="Alert_User_Warning_key"
							id="alertLabel2_f_${_pageRef}" /> </u>
				</div>
			</td>
			<td align="right">
				<div id="alertsForwardList_id_<ps:property value="_pageRef" escapeHtml="true"/>">
					<%@include file="ForwardAlertsList.jsp"%>
				</div>
			</td>
		</tr>
	</table>
	<br/>
	<pt:toolBar id="forwardAlertsToolbar_${_pageRef}" width="100%">
		<table border="0" width="40%" align="center">
			<tr>
				<td align="center">
					<psj:a button="true" href="#" onclick="FORWARD_ALERT_MAINT_forwardAlert()"
						id="forwardFBut_${_pageRef}"><ps:text name="forward.btn"/></psj:a>
					<psj:a button="true" href="#" onclick="FORWARD_ALERT_MAINT_dismissAlert()"
						id="dismissFbut_${_pageRef}"><ps:text name="dismiss"/></psj:a>
				</td>
			</tr>
		</table>
	</pt:toolBar>
</ps:form>
