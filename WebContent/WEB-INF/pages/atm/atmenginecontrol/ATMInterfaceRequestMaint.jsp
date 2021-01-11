<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt"  uri="/path-toolbar-tags" %>

<script type="text/javascript">
	
	/**
	Set Link on Message Column for opening the dialog
	**/
	function atmISOMessageDialog(cellvalue, options, rowObject)
	{
		var gridId =  options.gid;
		var rowId = options.rowId;
		var messageId =  common_getGridColumnValue(gridId, rowId, 'incoming_ReqVO.MESSAGE_ID');
		return '<a id="messageDailog_'+_pageRef+'_'+rowId+'" href="#" onclick="ATMEngCtrlMaint_openRequestISOMessageDialog(\''+gridId+'\',\''+rowId+'\')">'+messageId+'</a>';
	}
	
	/**
	Set Link on On Error Message dialog
	**/
	function ATMEngCtrlMaint_ErrorMsgDialogFormattor(cellvalue, options, rowObject)
	{
		var gridId =  options.gid;
		var rowId = options.rowId;
		return '<a id="messageDailog_'+_pageRef+'_'+rowId+'" href="#" onclick="ATMEngCtrlMaint_openResponseErrorMsgDialog(\''+gridId+'\',\''+rowId+'\')">Show Details</a>';
	}

	/**
	 * Chane the Message Link Value
	 */
	$("#engineRequestGrid_Id_"+_pageRef).subscribe('onEngineRequestGridCompleted', function(event, data) 
	{
		
		var rowids = $("#engineRequestGrid_Id_"+_pageRef).jqGrid('getDataIDs');
		for (var i = 0; i < rowids.length; i++)
		{
			var messageId =  common_getGridColumnValue("engineRequestGrid_Id_"+_pageRef, rowids[i], 'incoming_ReqVO.MESSAGE_ID');
			document.getElementById("messageDailog_"+_pageRef+"_"+rowids[i]).innerText = messageId;
		}
		//set Status Color
		ATMEngineControlMaint_requestGridLoaded();
	});
	
	$(document).ready(function() {	
		$("#gbox_engineRequestGrid_Id_AEC00P").css("width","");	
		$("#gbox_engineRequestGrid_Id_AEC00P").removeAttr("style");		
	});
</script>

<div id="engine_grid_request_div_${_pageRef}" title="<ps:text name="atm_interface_request_key"/>"
					style="margin-bottom: 5px;" >
		<table border="0">
			<tr height="25px">
				<td ><ps:label key="from_date_key"
						id="lbl_start_time_id_${_pageRef}"
						for="engineControl_start_date_${_pageRef}" /></td>
				<td><psj:datepicker id="engineControl_start_date_${_pageRef}"
						name="atmEngineControlCO.startDate"
						timepickerTimeOnlyTitle="false" timepickerOnly="false"
						timepicker="true" timepickerShowSecond="true"
						timepickerFormat="hh:mm:ss" buttonImageOnly="true" firstDay="1"
						timepickerShowHour="true" tabindex="2" timepickerMinuteText="true"
						timepickerTimeText="true" timepickerShowMinute="true"
						timepickerHourText="true" timepickerSecondText="true"
						required="false" readonly="false" disabled=""
						parameter="atmEngineControlCO.startDate:engineControl_start_date_${_pageRef}
										,atmEngineControlCO.endDate:engineControl_end_date_${_pageRef}"
						dependency="engineControl_start_date_${_pageRef}:atmEngineControlCO.startDate"
						dependencySrc="${pageContext.request.contextPath}/path/atmenginecontrol/ATMEngineControlMaintAction_returnDependencyByTime" />
				</td>
				<td><ps:label key="to_date_key"
						id="lbl_alert_end_date_id_${_pageRef}"
						for="engineControl_end_date_${_pageRef}" /></td>
				<td><psj:datepicker id="engineControl_end_date_${_pageRef}"
						name="atmEngineControlCO.endDate" timepickerTimeOnlyTitle="false"
						timepickerOnly="false" timepicker="true"
						timepickerShowSecond="true" timepickerFormat="hh:mm:ss"
						buttonImageOnly="true" firstDay="1" timepickerShowHour="true"
						tabindex="3" timepickerMinuteText="true" timepickerTimeText="true"
						timepickerShowMinute="true" timepickerHourText="true"
						timepickerSecondText="true" required="false" readonly="false"
						disabled=""
						parameter="atmEngineControlCO.startDate:engineControl_start_date_${_pageRef}
										,atmEngineControlCO.endDate:engineControl_end_date_${_pageRef}"
						dependency="engineControl_end_date_${_pageRef}:atmEngineControlCO.endDate"
						dependencySrc="${pageContext.request.contextPath}/path/atmenginecontrol/ATMEngineControlMaintAction_returnDependencyByTime" />
				</td>
				<td><ps:label key="status_key"
						id="lbl_status_id_${_pageRef}"
						for="lookuptxt_event_status_${_pageRef}" /></td>
				<td><ps:select id="message_status_${_pageRef}"
						name="engineControlCO.STATUS" tabindex="9"
						list="messageStatusList" listKey="code" listValue="descValue">
					</ps:select></td>
				<td style='padding-left: 5px'><psj:submit
						id="engine_control_load_main_record_Btn_${_pageRef}" button="true"
						onclick="ATMEngineControlMaint_onClickedRetrieveData()" type="button"
						tabindex="10" freezeOnSubmit="true">
						<ps:label for="CtrlRecUpdateBtn_${_pageRef}" key="Retrieve_key" />
					</psj:submit></td>
				<td></td>
				<td></td>
			</tr>
			<tr height="25px"></tr>
		</table>

<div id="engine_response_grid_div_${_pageRef}" title="<ps:text name="atm_response_key"/>"
	style="margin-bottom: 5px;" > 
	<psjg:grid id="engineRequestGrid_Id_${_pageRef}" 
		href=""
		dataType="json" 
		caption="" 
		loadonce="false"
		tabindex="11" 
		hiddengrid="false" 
		pager="true" 
		sortable="false"
		filter="true" 
		gridModel="gridModel" 
		rowNum="10"
		rowList="5,10,15,20" 
		viewrecords="true" 
		navigator="true"
		navigatorDelete="false" 
		navigatorEdit="false"
		navigatorRefresh="false" 
		navigatorAdd="false"
		navigatorSearch="false" 
		navigatorSearchOptions="" 
		altRows="true"
		autowidth="false"
		shrinkToFit="false"
		width="900"
		sortorder=""
		sortname="" 
		onCompleteTopics="onEngineRequestGridCompleted"
		onGridCompleteTopics="onEngineRequestGridCompleted"
		height="250">

			<psjg:gridColumn id="ENG_INTERFACE_ID_${_pageRef}" 
				colType="number"
				name="incoming_ReqVO.INTERFACE_ID"
				index="INTERFACE_ID"
				width="100"
				title="%{getText('interface_key')}"/>
				
			<psjg:gridColumn 
				id="ENG_MESSAGE_${_pageRef}" 
				colType="text"
				name="MESSAGE_ID"
				index="MESSAGE_ID" width="150"
				formatter="atmISOMessageDialog"
				title="%{getText('message_id_key')}" align="center" />
				
			<psjg:gridColumn 
				id="ENG_STATUS_DESC_${_pageRef}" 
				colType="custom"
				name="STATUS_DESC" 
				index="STATUS_DESC"
				width="100"
				title="%{getText('status_key')}" 
				align="center" 
				sortable="true"
				search="true"/>
				
			<psjg:gridColumn 
				id="TRS_NO_${_pageRef}" 
				colType="text"
				name="outgoing_RespVO.TRS_NO"
				index="TRS_NO" width="200"
				title="%{getText('trs_no_key')}" />
				
			<psjg:gridColumn 
				id="ERROR_MESSAGE_${_pageRef}" 
				colType="text"
				name="outgoing_RespVO.ERROR_MESSAGE"
				index="ERROR_MESSAGE" width="200" align="center"
				title="%{getText('error_message_key')}" />
					
			<psjg:gridColumn id="ATM_ENG_RESPONSE_ID_${_pageRef}" 
				colType="text"
				name="outgoing_RespVO.ATM_ENG_OUTGOING_RESPONSE_ID"
				index="ATM_ENG_OUTGOING_RESPONSE_ID"
				width="100" hidden="true"
				title="%{getText('response_mti_key')}"/>
				
				
			<psjg:gridColumn id="COMP_CODE_${_pageRef}" 
				colType="number"
				name="incoming_Req_DetailVO.COMP_CODE"
				index="COMP_CODE"
				width="100"
				title="%{getText('comp_code_key')}"/>
					
			<psjg:gridColumn id="BRANCH_CODE_${_pageRef}" 
				colType="number"
				name="incoming_Req_DetailVO.BRANCH_CODE"
				index="BRANCH_CODE"
				width="100"
				title="%{getText('branch_code_key')}"/>
							
			<psjg:gridColumn id="TELLER_CODE_${_pageRef}" 
				colType="number"
				name="incoming_Req_DetailVO.TELLER_CODE"
				index="TELLER_CODE"
				width="100"
				title="%{getText('teller_code_key')}"/>
					
			<psjg:gridColumn id="ACQUIRER_CODE_${_pageRef}" 
				colType="number"
				name="incoming_Req_DetailVO.ACQUIRER_CODE"
				index="ACQUIRER_CODE"
				width="100"
				title="%{getText('acquirer_key')}"/>
							
			<psjg:gridColumn id="TERMINAL_ID_${_pageRef}" 
				colType="text"
				name="incoming_Req_DetailVO.TERMINAL_ID"
				index="TERMINAL_ID"
				width="100"
				title="%{getText('terminal_key')}"/>
						
			<psjg:gridColumn id="MTI_CODE_REQUEST_${_pageRef}" 
				name="incoming_ReqVO.MTI_CODE_REQUEST"
				colType="text"
				index="MTI_CODE_REQUEST"
				width="50"
				title="%{getText('request_mti_key')}"/>
						
			<psjg:gridColumn id="MTI_CODE_RESPONSE_${_pageRef}" 
				colType="text"
				name="outgoing_RespVO.MTI_CODE_RESPONSE"
				index="MTI_CODE_RESPONSE"
				width="50"
				title="%{getText('response_mti_key')}"/>
			
			<psjg:gridColumn 
				id="ENG_MESSAGE_ID_${_pageRef}" 
				colType="text"
				name="incoming_ReqVO.MESSAGE_ID"
				index="MESSAGE_ID" width="150"
				title="%{getText('message_id_key')}" hidden="true" />
			
						
			<%-- <psjg:gridColumn id="START_TIME_${_pageRef}" 							
				name="atm_ENG_RESPONSEVO.START_TIME"
				index="START_TIME" 
				title="%{getText('start_time_key')}" 
				align="center" 
				width="100"
				colType="date"   
				editable="false" 							 
				sorttype="date"
				search="true"	
				searchType="date"
				formatter="date"				 
				searchoptions="{sopt:['eq']}" 
				formatoptions="{srcformat:'Y-m-d H:i:s.u',newformat:'d/m/Y H:i:s' }" />
				 			
			<psjg:gridColumn id="END_TIME_${_pageRef}" 							
				name="atm_ENG_RESPONSEVO.END_TIME"
				index="END_TIME" 
				title="%{getText('end_time_key')}" 
				align="center" 
				width="100"
				colType="date"   
				editable="false" 							 
				sorttype="date"
				search="true"	
				searchType="date"
				formatter="date"				 
				searchoptions="{sopt:['eq']}" 
				formatoptions="{srcformat:'Y-m-d H:i:s.u',newformat:'d/m/Y H:i:s' }" /> --%>
				 				
			<psjg:gridColumn id="ENG_MESSAGE_REQUEST_${_pageRef}" 
				colType="text"
				name="incoming_ReqVO.MESSAGE_REQUEST"
				index="MESSAGE_REQUEST" width="5"
				title="%{getText('message_request_key')}"  hidden="true"/>

				
			<psjg:gridColumn id="REQUEST_MAP_${_pageRef}" 
				colType="text"
				name="incoming_Req_DetailVO.REQUEST_MAP"
				index="REQUEST_MAP" width="5"
				title="%{getText('message_response_key')}" hidden="true"  />
				
			<psjg:gridColumn id="ENG_MESSAGE_RESPONSE_${_pageRef}" 
				colType="text"
				name="outgoing_RespVO.ISO_RESPONSE"
				index="MESSAGE_RESPONSE" width="5"
				title="%{getText('message_response_key')}" hidden="true"  />
				
				
			<psjg:gridColumn id="RESPONSE_MAP_${_pageRef}" 
				colType="text"
				name="outgoing_RespVO.RESPONSE_MAP"
				index="RESPONSE_MAP" width="5"
				title="%{getText('message_response_key')}" hidden="true"  />	
				
			<psjg:gridColumn id="RESPONSE_CODE_${_pageRef}" 
				colType="text"
				name="outgoing_RespVO.RESPONSE_CODE"
				index="RESPONSE_CODE" width="80"
				title="%{getText('response_code_key')}"  />
				
			<psjg:gridColumn id="PROCESS_CODE_${_pageRef}" 
				colType="text"
				name="incoming_Req_DetailVO.PROCESS_CODE"
				index="PROCESS_CODE" width="80"
				title="%{getText('process_code_key')}" />
										
							
			<psjg:gridColumn id="ENG_RECEIVE_TIME_${_pageRef}" 							
				name="incoming_ReqVO.RECEIVE_TIME"
				index="RECEIVE_TIME" 
				title="%{getText('receive_date_key')}" 
				align="center" 
				width="100"
				colType="date"   
				editable="false" 							 
				sorttype="date"
				search="true"	
				searchType="date"
				formatter="date"				 
				searchoptions="{sopt:['eq']}" 
				formatoptions="{srcformat:'Y-m-d H:i:s.u',newformat:'d/m/Y H:i:s' }" />
									 			
			<psjg:gridColumn id="ENG_STATUS_${_pageRef}" 
				colType="custom"
				name="outgoing_RespVO.STATUS" 
				index="STATUS" 
				title="%{getText('status_key')}" 
				hidden="true"/> 

	</psjg:grid>
</div>
</div>