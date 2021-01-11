<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt"  uri="/path-toolbar-tags" %>
<%@page import="com.path.atm.bo.common.ATMCommonConstants" %>
<%@include file="/WEB-INF/pages/atm/atmcommon/ATMAppTrans.jsp"%>
<%@include file="/WEB-INF/pages/appcomponents/common/AppCommonTrans.jsp" %>

<div id="enginecontrolPage_id_${_pageRef}">
<ps:set name="ivcrud_${_pageRef}" value="iv_crud" />
<ps:set name="start_key" value="%{getText('start_key')}" />
<ps:set name="stopped_key" value="%{getText('stopped_key')}" />
<ps:set name="stop_key" value="%{getText('Stop_key')}" />
<ps:set name="confirmation_key" value="%{getText('confirmation_key')}" />
<ps:set name="atm_engine_service_stop_key" value="%{getText('atm_engine_service_stop_key')}" />
<ps:set name="atm_engine_service_start_key" value="%{getText('atm_engine_service_start_key')}" />
<ps:set name="confirm_msg_to_stop_atm_engine_key" value="%{getText('confirm_msg_to_stop_atm_engine_key')}" />
<ps:set name="confirm_msg_to_start_atm_engine_key" value="%{getText('confirm_msg_to_start_atm_engine_key')}" />
<ps:set name="message_key" value="%{getText('message_key')}" />


<script type="text/javascript">
	$(document).ready(function() {		
		
		$.struts2_jquery.require("ATMEngineControlMaint.js" ,null,jQuery.contextPath+"/path/js/atm/atmenginecontrol/");	
		$.struts2_jquery.require("script.js" ,null,jQuery.contextPath+"/path/js/atm/atmcommon/");
		
		$("#engine_grid_div_" + _pageRef).collapsiblePanel();
		$("#engine_grid_request_div_" + _pageRef).collapsiblePanel();
		$("#atm_engine_actionLog_div_" + _pageRef).collapsiblePanel();
		
		$("#engineGrid_Id_" + _pageRef).subscribe("onEngineGridCompleted",	function(rowObj) {
			ATMEngineControlMaint_gridLoaded();
		});
		
		setTimeout(ATMEngineControlMaint_onClickedRetrieveData, 500);
		
	});
	
	var start_val = "${start_key}";
	var stopped_val = "${stopped_key}";
	var stop_val = "${stop_key}";
	var confirmation_val = "${confirmation_key}";
	var confirm_msg_to_stop_atm_engine_val = "${confirm_msg_to_stop_atm_engine_key}";
	var confirm_msg_to_start_atm_engine_val = "${confirm_msg_to_start_atm_engine_key}";
	var atm_engine_service_stop_val = "${atm_engine_service_stop_key}";
	var atm_engine_service_start_val = "${atm_engine_service_start_key}";
	var response_status_start_val = "${ATMCommonConstants.RESPONSE_STATUS_START}"
	var response_status_stop_val = "${ATMCommonConstants.RESPONSE_STATUS_STOP}"
	var message_key = "${message_key}"
	
	
		/**
		Set Link on Message Column for opening the dialog
		**/
		function atmInterface_InterfaceMessageDialogFormattor(cellvalue, options, rowObject)
		{
			var gridId =  options.gid;
			var rowId = options.rowId;
			var message =  common_getGridColumnValue(gridId, rowId, 'atm_ENG_INTERFACEVO.MESSAGE');
				return '<a id="atmInterfaceShowDetails_'+_pageRef+'_'+rowId+'" href="#" onclick="ATMEngCtrlMaint_openInterfaceMessageDialog(\''+gridId+'\',\''+rowId+'\')">Show Details</a>';	
		}
	
	
		/**
		 * Change the Message Link Value
		 */
		$("#engineGrid_Id_"+_pageRef).subscribe('onEngineInterfaceGridCompleted', function(event, data) 
		{
			
			var rowids = $("#engineGrid_Id_"+_pageRef).jqGrid('getDataIDs');
			for (var i = 0; i < rowids.length; i++)
			{
				var messageId =  common_getGridColumnValue("engineGrid_Id_"+_pageRef, rowids[i], 'atm_ENG_INTERFACEVO.MESSAGE');
				if(messageId == "" || typeof messageId == "undefined")
				{
					document.getElementById("atmInterfaceShowDetails_"+_pageRef+"_"+rowids[i]).remove();
				}
				else
				{
					document.getElementById("atmInterfaceShowDetails_"+_pageRef+"_"+rowids[i]).innerText = "Show Details";
				}
			}
		});
		
		/**
			Button Formatter of ATM Interface Grid
		**/
		function interfaceButtonFormatter(cellValue, options, rowObject)
		{
			return ATMEngineControlMaint_buttonFormatter(cellValue, options, rowObject);
		}
	
	
		
</script>

	<ps:url id="engineGrid_url" escapeAmp="false"
		action="ATMEngineControlListAction_returnEngineDataForGrid"
		namespace="/path/atmenginecontrol/">
	</ps:url>

	<div style="width:100%">
		<div id="engine_grid_div_${_pageRef}" title="<ps:text name="atm_interface_key"/>" style="margin-bottom: 5px;" > 
			<psjg:grid 
				id="engineGrid_Id_${_pageRef}" 
				caption=""
				href="%{engineGrid_url}" 
				dataType="json" 
				loadonce="false"
				hiddengrid="false" 
				pager="true" 
				sortable="false" 
				filter="true"
				gridModel="gridModel"
				rowNum="5" 
				rowList="5,10,15,20"
				viewrecords="true" 
				navigator="true" 
				navigatorDelete="false"
				navigatorEdit="false" 
				navigatorRefresh="false"
				navigatorAdd="false" 
				navigatorSearch="false"
				navigatorSearchOptions=""
				altRows="false" 
				autowidth="false"
				shrinkToFit="true"
				sortorder="" 
				sortname=""	
				onCompleteTopics="onEngineGridCompleted"
				height = "150">
	
				<psjg:gridColumn id="ATM_ENG_INTERFACE_ID_${_pageRef}" colType="text"
					name="atm_ENG_INTERFACEVO.ATM_ENG_INTERFACE_ID" index="INTERFACE_ID"
					title="%{getText('interface_key')}" align="center" hidden="true"
					width="200" />
	
				<psjg:gridColumn id="INTERFACE_ID_${_pageRef}" colType="text"
					name="atm_ENG_INTERFACEVO.INTERFACE_ID" index="INTERFACE_ID"
					title="%{getText('interface_key')}" align="center" sortable="true"
					search="true" width="100" />
	
				<psjg:gridColumn id="STATUS_${_pageRef}" colType="custom"
					name="atm_ENG_INTERFACEVO.STATUS" index="STATUS"
					title="%{getText('status_key')}" hidden="true" width="100" />
	
				<psjg:gridColumn id="STATUS_DESC_${_pageRef}" colType="custom"
					name="STATUS_DESC" index="STATUS_DESC"
					title="%{getText('status_key')}" align="center" sortable="true"
					search="true" width="100" />
	
				<psjg:gridColumn id="START_TIME_${_pageRef}"
					name="atm_ENG_INTERFACEVO.START_TIME" index="START_TIME"
					title="%{getText('start_date_key')}" align="center" colType="date"
					editable="false" sortable="true" sorttype="date" search="true"
					searchType="date" formatter="date" searchoptions="{sopt:['eq']}"
					formatoptions="{srcformat:'Y-m-d H:i:s.u',newformat:'d/m/Y H:i:s' }"
					width="200" />
					
				<psjg:gridColumn 
					id="INTERFACE_MESSAGE_${_pageRef}" 
					colType="text"
					name="atm_ENG_INTERFACEVO.MESSAGE"
					index="MESSAGE" 
					width="200" 
					align="center"
					title="%{getText('message_key')}" />
					
				<psjg:gridColumn id="mechineName_${_pageRef}" colType="text"
					name="atm_ENG_INTERFACEVO.MACHINE_NAME_IP" index="MACHINE_NAME_IP"
					title="%{getText('machine_name_key')}" align="center" sortable="true"
					search="true" width="150" />
					
				<psjg:gridColumn id="Engine_ACTION_${_pageRef}" colType="custom"
					name="Engine_ACTION" index="ACTION" title="%{getText('action_key')}"
					align="center" sortable="false" formatter="interfaceButtonFormatter"
					search="false" width="150" />
			</psjg:grid>
		</div>
	</div>
	
	<div style="width:100%">
		<div id="driverMainTab" class="connectedSortable ui-helper-reset">  
			<psj:tabbedpanel id="atmEngineControlDetails_${_pageRef}">
				<psj:tab id="atmEngineRequestResponse"  target="tab1TabsContent_${_pageRef}" 	 title="%{getText('request_response_key')}"		key="request_response_key" />
				<div id="tab1TabsContent_${_pageRef}">
					<%@include file="ATMInterfaceRequestMaint.jsp"%>
				</div>
				<psj:tab id="atmEngineActionLog" 		target="tab2TabsContent_${_pageRef}" 	 title="%{getText('atm_engine_action_log_key')}"		key="atm_engine_action_log_key"/>
					<div id="tab2TabsContent_${_pageRef}">
						<%@include file="ATMEngineActionLog.jsp"%>
					</div>
			</psj:tabbedpanel>
		</div>
	</div>
</div>