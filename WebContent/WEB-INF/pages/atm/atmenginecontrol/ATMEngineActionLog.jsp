<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt"  uri="/path-toolbar-tags" %>


<script type="text/javascript">
		
	/**
		Set Link on On Action Message Dilaog
	**/
	function ATMEngCtrlMaint_ActionMessageDialogFormattor(cellvalue, options, rowObject)
	{
		var gridId =  options.gid;
		var rowId = options.rowId;
		return '<a id="messageDailog_'+_pageRef+'_'+rowId+'" href="#" onclick="ATMEngCtrlMaint_openActionMessageDialog(\''+gridId+'\',\''+rowId+'\')">Show Details</a>';
	}

</script>

<div id="atm_engine_actionLog_div_${_pageRef}" title="<ps:text name="atm_engine_action_log_key"/>"
					style="margin-bottom: 5px;" >
		<table border="0">
			<tr height="25px">
				<td style='padding-left: 5px'><ps:label key="from_date_key"
						id="lbl_start_time_id_${_pageRef}"
						for="engineControlActionLog_start_date_${_pageRef}" /></td>
				<td><psj:datepicker id="engineControlActionLog_start_date_${_pageRef}"
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

				<td><psj:submit
						id="engineControlActionLog_loadRecordBtn_${_pageRef}" button="true"
						onclick="ATMEngineControlMaint_onClickedATMEngineActionLog()" type="button"
						tabindex="10" freezeOnSubmit="true">
						<ps:label for="engineControlActionLog_loadRecordBtn_${_pageRef}" key="Retrieve_key" />
					</psj:submit></td>
				<td></td>
				<td></td>
			</tr>
			<tr height="25px"></tr>
		</table>

	<ps:url id="atmEngineActionLogGrid_url" escapeAmp="false"
		action="ATMEngineControlListAction_returnEngineActionLogForGrid"
		namespace="/path/atmenginecontrol/">
	</ps:url>
	
	
<div id="atm_engine_action_log_grid_div_${_pageRef}" title="<ps:text name="atm_engine_action_log_key"/>"
	style="margin-bottom: 5px;" > 
	<psjg:grid id="atmEngineActionLogGrid_Id_${_pageRef}" 
		href="%{atmEngineActionLogGrid_url}" 
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
		width="1000"
		height="250">

			<psjg:gridColumn id="ATM_ENG_ACTION_LOG_ID_${_pageRef}" 
				colType="number"
				name="atm_ENG_ACTIONLOGVO.ATM_ENG_ACTION_LOG_ID"
				index="ATM_ENG_ACTION_LOG_ID"
				width="100" key="true" hidden="true"
				title="%{getText('atm_engine_action_log_key')}"/>
			
			<psjg:gridColumn id="ACTION_START_TIME_${_pageRef}" 							
				name="atm_ENG_ACTIONLOGVO.START_TIME"
				index="START_TIME" 
				title="%{getText('start_time_key')}" 
				align="center" 
				width="200"
				colType="date"   
				editable="false" 							 
				sorttype="date"
				search="true"	
				searchType="date"
				formatter="date"				 
				searchoptions="{sopt:['eq']}" 
				formatoptions="{srcformat:'Y-m-d H:i:s.u',newformat:'d/m/Y H:i:s' }" />
							
			<psjg:gridColumn 
				id="ACTION_MESSAGE_${_pageRef}" 
				colType="text"
				name="atm_ENG_ACTIONLOGVO.MESSAGE"
				index="MESSAGE" width="250" align="center" sortable="false"
				title="%{getText('action_message_key')}" />
	</psjg:grid>
</div>

</div>