<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@taglib prefix="pt" uri="/path-toolbar-tags"%>
 
<script type="text/javascript">
	var alertsPageRef = '<ps:property value="_pageRef" escapeHtml="false" escapeJavaScript="true"/>';
	$.struts2_jquery.require("TrsAckTOutAlertsMaint.js,TrsAckTOutAlertsList.js" ,null,"${pageContext.request.contextPath}/common/js/alerts/");
</script>


<ps:form id="TrsAckTOutAlertForm_${_pageRef}" useHiddenProps="true" cssStyle="width:100%;height:90%">
	<ps:hidden id="isLoginAlertEnabled_${_pageRef}" name="isLoginAlertEnabled" />
	<ps:hidden id="onAlertReceive_${_pageRef}" value="false" />
	<ps:hidden id="iv_crud_${_pageRef}" name="iv_crud" />
	<ps:hidden id="trsNo_${_pageRef}" name="trsNo" />
	<ps:hidden id="alertType_${_pageRef}" name="alertType" />
	<ps:hidden id="reasonCode_${_pageRef}" name="reasonCode" />
	<ps:hidden id="amount_${_pageRef}" name="amount" />
	<ps:hidden id="status_${_pageRef}" name="status" />
	<ps:hidden id="actionType_${_pageRef}" name="actionType" />
	<ps:hidden id="selectedAlertRows_${_pageRef}" name="actionType" />
	<ps:hidden id="appName_${_pageRef}" name="alertsSC.appName" /><%/* the application name used in alert query to return all alerts in this appName*/%>
	<ps:hidden id="currentAppName_${_pageRef}" value="%{#session.sesVO.currentAppName}"/> <%/* the currentAppName from session */%>
	<ps:hidden id="gridSelectedRow_${_pageRef}"
		name="alertCO.gridSelectedRow"></ps:hidden>
	<table width="100%" border="0" height="80%">
		<tr height="75%">
			<td height="100%">
				<table width="50%" border="0" height="100%">
					<tr height="100%">
						<td width="50%">
							<div id="trsAckTOutAlertsList_id_<ps:property value="_pageRef" escapeHtml="true"/>" height="100%">
								<%@include file="TrsAckTOutAlertsList.jsp"%>
							</div>
						</td>
					</tr>
				</table>
			</td>
		</tr>
		<tr>
			<td>
			</td>
		</tr>
		<tr>
			<td height="20%">

				<table border="0" width="100%" height="100%">
					<pt:toolBar id="trsAckTOutToolbar_${_pageRef}">
						<tr>
							<td width="20%">
								<fieldset>
									<legend>
										<b><ps:text name="selectedAcknowledgement_key" /></b>
									</legend>
									<table>
										<tr>
											<td>
												<psj:a button="true" href="#"
													onclick="TrsAckTOutAlertsMaint_printAllAlert()"
													id="sendBut_${_pageRef}"><ps:text name="btn.print"/></psj:a>
											</td>
											<td>
												<psj:a button="true" href="#"
													onclick="TrsAckTOutAlertsMaint_okAllAlert()"
													id="dismissBut_${_pageRef}"><ps:text name="Ok_key" /></psj:a>
											</td>
										</tr>
									</table>
								</fieldset>
							</td>
							<td width="20%">
								<fieldset>
									<legend>
										<b><ps:text name="timedOutTrs_key" /></b>
									</legend>
									<table>
										<tr>
											<td>
												<psj:a button="true" href="#"
													onclick="TrsAckTOutAlertsMaint_openAllAlert_clicked()"
													id="openBut_${_pageRef}"><ps:text name="openItems_key"/></psj:a>
											</td>
										</tr>
									</table>
								</fieldset>
							</td>
							<ps:if test='${manualOpen != "true"}'>
							<td width="20%">
								<fieldset>
									<legend>
										<b><ps:text name="timedOutTrsAknowledgment_key"/></b>
									</legend>
									<table>

										<tr>

											<td>
												<table>
													<tr style="display: none;">
														<td>
															<ps:radio id="snoozeRadio1_${_pageRef}" name="radio1"
																list="#{'1':'Selected_Transactionals_key'}"
																cssClass="radioDown_%{_pageRef}" />
														</td>
													</tr>
													<tr>
														<td>
															<ps:radio id="snoozeRadio2_${_pageRef}" name="radio1" disabled='%{alertCO.snoozeAlertDisabled != null && alertCO.snoozeAlertDisabled == "true"}' 
																list="#{'2':'All_key'}" cssClass="radioDown_%{_pageRef}"
																value="2" />
														</td>
													</tr>
												</table>
											</td>
											<td>
												<psj:datepicker id="dateTime_${_pageRef}" 
													timepickerTimeOnlyTitle="false"
													name="alertCO.TODO_REFRESH_TIME" timepickerOnly="true"
													timepicker="true" timepickerShowSecond="true"
													timepickerFormat="hh:mm:ss" buttonImageOnly="true"
													timepickerShowHour="true" timepickerMinuteText="true"
													timepickerTimeText="true" timepickerShowMinute="true"
													timepickerHourText="true" timepickerSecondText="true"
													required="true" readonly="false" 
													disabled='%{alertCO.snoozeAlertDisabled != null && alertCO.snoozeAlertDisabled == "true"}'/>
											</td>
											<td>
												<psj:submit id="snoozeRcvAlertBtn_${_pageRef}" button="true" onclick="TrsAckTOutAlertsMaint_snoozeAlerts()" freezeOnSubmit="true"
													disabled='%{alertCO.snoozeAlertDisabled != null && alertCO.snoozeAlertDisabled == "true"}'>
	    											<ps:text name="btn.snooze"></ps:text>
	   											</psj:submit>		
											</td>
											<td>
												<psj:submit  id="closeRcvAlertBtn_${_pageRef}" button="true" onclick="TrsAckTOutAlertsMaint_closeAlert()" freezeOnSubmit="true">
	    											<ps:text name="btn.close"></ps:text>
	   											</psj:submit>	
	   										</td>
										</tr>
									</table>
								</fieldset>
							</td>
							</ps:if>
						</tr>
					</pt:toolBar>
				</table>
			</td>
		</tr>
	</table>
</ps:form>
<div id="open_item_div_<ps:property value="_pageRef" escapeHtml="true"/>"></div>
