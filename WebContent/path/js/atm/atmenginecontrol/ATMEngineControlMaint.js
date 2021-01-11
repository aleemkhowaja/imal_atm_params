
/**
 * function to build Start Stop button of ATM Engine node
 * 
 */
function ATMEngineControlMaint_buttonFormatter(cellValue, options, rowObject)
{	
	var value = '';		
	switch (rowObject.atm_ENG_INTERFACEVO["STATUS"])
	{
		case 'R':
			value = '<button type="button" style="width:100px; background-color: #d9534f; color: white;" onclick = "javascript:ATMEngineControlMaint_confirmToStartStop(\''
				+ rowObject.atm_ENG_INTERFACEVO["ATM_ENG_INTERFACE_ID"]
				+ '\',\''
				+ rowObject.atm_ENG_INTERFACEVO["INTERFACE_ID"]
				+ '\',\''
				+ rowObject.atm_ENG_INTERFACEVO["STATUS"]
				+ '\');">' + stop_val + '</button>';		
			break;
		case 'D':			
			value = '<button type="button" style="width:100px; background-color: #5cb85c; color: black;" onclick = "javascript:ATMEngineControlMaint_confirmToStartStop(\''
				+ rowObject.atm_ENG_INTERFACEVO["ATM_ENG_INTERFACE_ID"]
				+ '\',\''
				+ rowObject.atm_ENG_INTERFACEVO["INTERFACE_ID"]
				+ '\',\''
				+ rowObject.atm_ENG_INTERFACEVO["STATUS"]
				+ '\');">' + start_val + '</button>';
			break;
		case 'P':			
			value = '<button type="button" style="width:100px; background-color: #5cb85c; color: black;" onclick = "javascript:ATMEngineControlMaint_confirmToStartStop(\''
				+ rowObject.atm_ENG_INTERFACEVO["ATM_ENG_INTERFACE_ID"]
				+ '\',\''
				+ rowObject.atm_ENG_INTERFACEVO["INTERFACE_ID"]
				+ '\',\''
				+ rowObject.atm_ENG_INTERFACEVO["STATUS"]
				+ '\');">' + start_val + '</button>';
			break;
			
		default:
			value = '';
			break;
	}
	return value;

}

/**
 * function to confirm user action to stop or start ATM Engine node
 * 
 */
function ATMEngineControlMaint_confirmToStartStop(engineInterfaceId, interface_id, status)
{
	if (interface_id == null || status == null)
	{
		return;
	}

	var node_info = {
		_ENGINE_INTERFACE_ID : engineInterfaceId,
		_INTERFACE_ID : interface_id,
		_STATUS : status
		
	}

	switch (status)
	{
		case 'R':
			_showConfirmMsg(confirm_msg_to_stop_atm_engine_val,
					confirmation_val, "ATMEngineControlMaint_startStopConfirm", node_info, '', '', 300, 100);
			break;
		case 'D':
			_showConfirmMsg(confirm_msg_to_start_atm_engine_val,
					confirmation_val, "ATMEngineControlMaint_startStopConfirm", node_info, '', '', 300, 100);
			break;
		case 'P':
			_showConfirmMsg(confirm_msg_to_start_atm_engine_val,
					confirmation_val, "ATMEngineControlMaint_startStopConfirm", node_info, '', '', 300, 100);
			break;
		default:
			break;
	}

}

/**
 * function to confirm user action to stop or start ATM Engine node
 * 
 */
function ATMEngineControlMaint_startStopConfirm(yesNo, node_info)
{
	if (yesNo)
	{
		ATMEngineControlMaint_startStopNode(node_info);
	}
}

/**
 * function to call ATM Engine node service to stop or stop engine
 * 
 */
function ATMEngineControlMaint_startStopNode(node_info)
{	
	_showProgressBar(true);
	var url = jQuery.contextPath
			+ "/path/atmenginecontrol/ATMEngineControlMaintAction_startStopEngineNode";
	var params = {
		"atmEngineControlCO.atm_ENG_INTERFACEVO.ATM_ENG_INTERFACE_ID" : node_info._ENGINE_INTERFACE_ID,
		"atmEngineControlCO.atm_ENG_INTERFACEVO.INTERFACE_ID" : node_info._INTERFACE_ID,
		"atmEngineControlCO.atm_ENG_INTERFACEVO.STATUS" : node_info._STATUS
	};
	$.post(url, params, function(response)
	{
		
		var message = '';
		switch (response.atmEngineControlCO.response)
		{
			
			case response_status_start_val:
				message = atm_engine_service_start_val;
				break;
			case response_status_stop_val:
				message = atm_engine_service_stop_val
				break;
		}
		if(message != '')
			_showErrorMsg(message, info_msg_title, 300, 100);
		
		ATMEngineControlMaint_reloadGrid();
		_showProgressBar(false);
	},'json');
}

/**
 * function to reload ATM Engine node status grid after start or stop action
 * 
 */
function ATMEngineControlMaint_reloadGrid()
{
	$("#engineGrid_Id_" + _pageRef).trigger("reloadGrid");
}



/**
 * 
 * function to handle Retrieve click it load grid data on user's specified
 * criteria
 */
function ATMEngineControlMaint_onClickedRetrieveData()
{
	var startDate = $("#engineControl_start_date_" + _pageRef).val();
	var endDate = $("#engineControl_end_date_" + _pageRef).val();
	var message_status = $("#message_status_" + _pageRef).val();
	
	var params = {};
	params["atmEngineControlCO.startDate"] = startDate;
	params["atmEngineControlCO.endDate"] = endDate;
	params["atmEngineControlCO.STATUS"] = message_status;
	
	_showProgressBar(true);
	$("#engineRequestGrid_Id_" + _pageRef)
			.jqGrid(
					'setGridParam',
					{
						url : jQuery.contextPath
								+ "/path/atmenginecontrol/ATMEngineControlListAction_returnATMEngineRequestDataForGrid",
						datatype : 'json',
						postData : params,
						page : 1
					}).trigger("reloadGrid");

	_showProgressBar(false);
}

/**
 * function to format Message Status foreground
 * 
 */

function ATMEngineControlMaint_gridLoaded()
{
	var table = $("#engineGrid_Id_" + _pageRef)
	var rows = table.jqGrid('getDataIDs');
	for (var a = 0; a < rows.length; a++)
	{
		var statusCode = table.jqGrid('getCell', rows[a],'atm_ENG_INTERFACEVO.STATUS')
		table.jqGrid('setCell', rows[a], 'STATUS_DESC', '', {
			color : ATMEngineControlMaint_getStatusColorCode(statusCode)
		});
	}
}


/**
 * function to return Message Status foreground color code
 * 
 */
function ATMEngineControlMaint_getStatusColorCode(statusCode)
{
	var color = '#000' // Black
	switch (statusCode)
	{
		case "R": // Dark Green
			color = '#196F3D';
			break;
		case "T": // Gray
			color = '#ABB2B9';
			break;
		case "D": // Red
			color = '#C70039';
			break; 
		case "S": // Green  
			color = '#28B463';
			break;
		case "P": // Dark Green
			color = '#196F3D';
			break;
		default:
			color = '#000';
			break;
	}

	return color;
}



function ATMEngineControlMaint_requestGridLoaded()
{
	var table = $("#engineRequestGrid_Id_" + _pageRef)
	var rows = table.jqGrid('getDataIDs');
	for (var a = 0; a < rows.length; a++)
	{
		var statusCode = table.jqGrid('getCell', rows[a],'atm_ENG_RESPONSEVO.STATUS')
		table.jqGrid('setCell', rows[a], 'STATUS_DESC', '', {
			color : ATMEngineControlMaint_setColorOnResponseLogStatus(statusCode)
		});
	}
}


/**
 * function to return Message Status foreground color code
 * 
 */
function ATMEngineControlMaint_setColorOnResponseLogStatus(statusCode)
{
	var color = '#000'

	switch (statusCode)
	{
		case "A":
			color = '#28B463'
			break;
		case "F": //Failed
			color = '#C70039'
			break;
		case "S": // Start
			color = '#196F3D'
			break;
		case "P": // Process
			color = '#196F3D'
			break;
		case "R": // Process
			color = '#196F3D'
			break;
		case "X":
			color = '#D35400'
			break;
		case "N":
			color = '#2E86C1'
			break;
		default:
			color = '#000';
			break;
	}

	return color;
}

/**
 * Open Dilaog for Message Id from request Grid
 * @param gridId
 * @param rowId
 * @returns
 */
function ATMEngCtrlMaint_openRequestISOMessageDialog(gridId, rowId)
{
	debugger;
	var messageRequest =  	common_getGridColumnValue(gridId, rowId, 'incoming_ReqVO.MESSAGE_REQUEST');
	var messageResponse = 	common_getGridColumnValue(gridId, rowId, 'outgoing_RespVO.ISO_RESPONSE');
	var requestMap = 		common_getGridColumnValue(gridId, rowId, 'incoming_Req_DetailVO.REQUEST_MAP');
	var responseMap = 		common_getGridColumnValue(gridId, rowId, 'outgoing_RespVO.RESPONSE_MAP');
	var responseStatus = 	common_getGridColumnValue(gridId, rowId, 'outgoing_RespVO.STATUS');
	var messageId = 		common_getGridColumnValue(gridId, rowId, 'incoming_ReqVO.MESSAGE_ID');
	var interfaceId = 		common_getGridColumnValue(gridId, rowId, 'incoming_ReqVO.INTERFACE_ID');
	
	var url = jQuery.contextPath+ "/path/atmenginecontrol/ATMEngineControlMaintAction_openMessageDialog";
	
	var params = {};
	
	params["criteria.dialogfor"] =   "isoMessageDilog";
	params["atmEngineControlCO.incoming_ReqVO.MESSAGE_REQUEST"] =   messageRequest;
	/**
	 * Check
	 * if 
	 * 1 - response Map is not empty
	 * 2 - response status is not empty
	 * 3 - response status is not Failed
	 * then 
	 * response message text area , request Map and response map should be send for parsing
	 * and fill the request and response field grid 
	 * 
	 * otherwise all will be empty except request message textarea.
	 */
	if(common_isVariableValueNoEmpty(responseMap) && common_isVariableValueNoEmpty(responseStatus) && responseStatus != "F")
	{
		params["atmEngineControlCO.outgoing_RespVO.ISO_RESPONSE"]   =   messageResponse;
		params["atmEngineControlCO.incoming_Req_DetailVO.REQUEST_MAP"]   =    requestMap;
		params["atmEngineControlCO.outgoing_RespVO.RESPONSE_MAP"]   =   responseMap;
	}
	
	params["atmEngineControlCO.incoming_ReqVO.INTERFACE_ID"]   =   interfaceId;
	params["criteria.messageId"]   =   messageId;
	params["_pageRef"]   =   _pageRef;
	
	_showProgressBar(true);
	
	/**
	 * Open common dialog to show the ISO Request/response message and iso fields
	 */
	common_openDialog(url, params, "ISO Message Details", 900, 500);
}

/**
 * Open dialog from Message column in Engine Interface grid
 * @param gridId
 * @param rowId
 * @returns
 */
function ATMEngCtrlMaint_openInterfaceMessageDialog(gridId, rowId)
{
	
	var url = jQuery.contextPath+ "/path/atmenginecontrol/ATMEngineControlMaintAction_openMessageDialog";
	
	var message =  common_getGridColumnValue(gridId, rowId, 'atm_ENG_INTERFACEVO.MESSAGE');
	var params = {};
	params["criteria.dialogfor"] =   "interfaceMessageDialog";
	params["atmEngineControlCO.atm_ENG_INTERFACEVO.MESSAGE"] =   message;
	_showProgressBar(true);
	
	/**
	 * Open common dialog to open Message Details fro interface
	 */
	common_openDialog(url, params, "ATM Engine Interface Message Details",300,150);
}



/**
 * Open dialog from Message column in Engine Interface grid
 * @param gridId
 * @param rowId
 * @returns
 */
function ATMEngCtrlMaint_openResponseErrorMsgDialog(gridId, rowId)
{
	
	var url = jQuery.contextPath+ "/path/atmenginecontrol/ATMEngineControlMaintAction_openMessageDialog";
	
	var responseId =  common_getGridColumnValue(gridId, rowId, 'atm_ENG_RESPONSEVO.ATM_ENG_RESPONSE_ID');
	var params = {};
	params["criteria.dialogfor"] =   "responseErrorDetailsDialog";
	params["criteria.responseId"] =   responseId;
	_showProgressBar(true);
	
	/**
	 * Open common dialog to open Response Error
	 */
	common_openDialog(url, params, "ATM Engine Response Error Details", 600,400);
}

/**
 * Open Dialog from ATM Engine Action Log
 * @param gridId
 * @param rowId
 * @returns
 */
function ATMEngCtrlMaint_openActionMessageDialog(gridId, rowId)
{
var url = jQuery.contextPath+ "/path/atmenginecontrol/ATMEngineControlMaintAction_openMessageDialog";
	
	var responseId =  common_getGridColumnValue(gridId, rowId, 'atm_ENG_RESPONSEVO.ATM_ENG_RESPONSE_ID');
	var params = {};
	params["criteria.dialogfor"] =   "actionLogActionMessageDialog";
	_showProgressBar(true);
	
	/**
	 * Open common dialog to open Response Error
	 */
	common_openDialog(url, params, "ATM Engine Action Message", 600,400);
}




/**
 * 
 * function to handle Retrieve click it load grid ATM engine Action Log
 * criteria
 */
function ATMEngineControlMaint_onClickedATMEngineActionLog()
{
	var startDate = $("#engineControlActionLog_start_date_" + _pageRef).val();
	
	var params = {};
	params["criteria.startDate"] = startDate;
	
	_showProgressBar(true);
	$("#atmEngineActionLogGrid_Id_" + _pageRef)
			.jqGrid(
					'setGridParam',
					{
						url : jQuery.contextPath
								+ "/path/atmenginecontrol/ATMEngineControlListAction_returnEngineActionLogForGrid",
						datatype : 'json',
						postData : params,
						page : 1
					}).trigger("reloadGrid");

	_showProgressBar(false);
}


/**
 * load Sub Grid
 * @returns
 */
function ATMEngineControlMaint_loadISOSubFields(gridFrom)
{
	var gridid = "";
	if(gridFrom == "request")
	{
		gridid = "#requestIsoMessageGridTbl_Id_" + _pageRef;
	}
	else
	{
		gridid = "#responseIsoMessageGridTbl_Id_" + _pageRef;
	}
	
	
	var $table = $(gridid);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var parentRow = $table.jqGrid('getRowData', selectedRowId);
	if(parentRow!=null)
    {
    	var subGridData = parentRow['subGridData'];
    	var dynamicIdPathSubGrid = gridid+"_"+selectedRowId+"_table";	
		var subGrid = $(dynamicIdPathSubGrid);	
    	if(subGridData != null && subGridData != "")
    	{
    		subGrid.jqGrid('clearGridData');
			var AllRowsArray = JSON.parse(subGridData)["root"];
	     	for (var j = 0; j < AllRowsArray.length; j++) 
	  		{
	      		subGrid.jqGrid('addRowData', j, AllRowsArray[j]); 
	 		}//end inner loop
    	}//End inner If
    }//end outer If 
}

/**
 * remove expandable subgird if ISO field doesn't contains data related to the subgrid
 * @returns
 */
function ATMEngineControlMaint_removeSubGrid(gridId)
{
	var table = $("#"+gridId);
	var rows = table.jqGrid('getDataIDs');
	for (var a = 0; a < rows.length; a++)
	{
		var subFields = table.jqGrid('getCell', rows[a],'subGridData');
		/**
		 * check if the subgrid data is empty in main column then remove expendable button from grid 
		 */
		if(!common_isVariableValueNoEmpty(subFields) || subFields == "{\"root\":[]}")
		{
			var id = "#td_"+gridId+"_"+(a+1)+"_subgrid";
			$(id).removeClass('sgcollapsed');
			$(id).removeClass('ui-sgcollapsed');
			$(id).text('');
		}
	}
}