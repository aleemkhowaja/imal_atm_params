/**
 * Reload ISO Msg Definition Grid
 * @returns
 */
function iSOMessagesDefinitionFlds_reloadISOMsgDefFldsGrid()
{
	var interfaceId = $("#lookuptxt_atm_interface_"+_pageRef).val();
	var messageId =    $("#lookuptxt_mti_"+_pageRef).val();	
	
	var isCheckedNetworkMsg = $("#networkMessage_"+_pageRef).is(":checked");
	
	/**
	 * Check if interface empty
	 * then request/response iso fields should not be loaded
	 */
	if(!common_isVariableValueNoEmpty(interfaceId) || !common_isVariableValueNoEmpty(interfaceId)) return;
	
	/**
	 * Check if mti empty
	 * then request/response iso fields should not be loaded
	 */
	if(!common_isVariableValueNoEmpty(messageId) || !common_isVariableValueNoEmpty(messageId))
	{
		$("#requestIsoMsgDefFieldsListGridTbl_Id_" + _pageRef).jqGrid('clearGridData');
		$("#responseIsoMsgDefFieldsListGridTbl_Id_" + _pageRef).jqGrid('clearGridData');
		return;
	}
	
	/**
	 * Check the network Message Not Checked
	 * then request/response iso fields should not be loaded 
	 */
	if(!common_isVariableValueNoEmpty(isCheckedNetworkMsg)  ||  isCheckedNetworkMsg == false || isCheckedNetworkMsg == "false") return;
		
	var reloadParams = {};
	reloadParams["criteria.interfaceId"] 					= interfaceId;
	reloadParams["criteria.messageId"] 						= messageId;
	reloadParams["criteria.isIsoReqAndResponseFields"] 		= true;
	reloadParams["_pageRef"] 								= _pageRef;
	
	/**
	 * Reload Request Fields Grid
	 */
	var actionUrl = jQuery.contextPath+ "/path/iSOMessagesDefinition/ISOMessagesDefinitionListAction_returnISOMsgFieldsByInterfaceCodeAndMTICOde.action";
	//Reload Values Grid
	$("#requestIsoMsgDefFieldsListGridTbl_Id_" + _pageRef).jqGrid('setGridParam',{
		url : actionUrl,
		datatype : 'json',
		postData: reloadParams,
		page : 1
    }).trigger("reloadGrid");
	
	/**
	 * Reload Response Fields Grid
	 */
	var actionUrl = jQuery.contextPath+ "/path/iSOMessagesDefinition/ISOMessagesDefinitionListAction_returnISOMsgFieldsByInterfaceCodeAndMTICOde.action";
	//Reload Values Grid
	$("#responseIsoMsgDefFieldsListGridTbl_Id_" + _pageRef).jqGrid('setGridParam',{
		url : actionUrl,
		datatype : 'json',
		postData: reloadParams,
		page : 1
    }).trigger("reloadGrid");
	
}


/**
 * set Bit Map
 * @param gridId
 * @returns
 */
function iSOMessagesDefinitionFlds_setBitMap(gridFor)
{
	var selectedIDs = $("#"+gridFor+"IsoMsgDefFieldsListGridTbl_Id_" + _pageRef).jqGrid('getGridParam', 'selarrrow');
	var primaryBitMap = [];
	var secondaryBitMap = [];
	var pBitMap = "";
	var sBitMap = "";
	var field = "";
	//Set 128 Fields of Bitmaps 64 for each primary and Secondary
	//(1-64 Primary Bitmap and 65-128 Secondary Bitmap)
	for (var j = 0; j < 64; j++)
	{
		primaryBitMap[j] = "0";
		secondaryBitMap[j] = "0";
	}
	//Set all selected Fields
	for (var i = 0; i < selectedIDs.length; i++)
	{
		field = selectedIDs[i];
		if (field <= 64)
		{
			primaryBitMap[field - 1] = "1";
		}
		else
		{
			primaryBitMap[0] = "1";
			//$("#isoFieldsListGridTbl_Id_"+_pageRef).jqGrid('setSelection',1, true);
			secondaryBitMap[field - 65] = "1";
		}
	}
	//Generate Binary for Primary Bitmap
	for (var i = 0; i < primaryBitMap.length; i++)
	{
		pBitMap += primaryBitMap[i];
	}
	//Generate Binary for Secondary Bitmap
	for (var i = 0; i < secondaryBitMap.length; i++)
	{
		sBitMap += secondaryBitMap[i];
	}
	//Generate Hexadecimal Sequence for Bitmaps
	var pBitMapHexa = binaryToHex(pBitMap)['result'];
	var sBitMapHexa = binaryToHex(sBitMap)['result'];
	
	$("#"+gridFor+"PrimaryBitMap_"+_pageRef).val(pBitMapHexa);
	$("#"+gridFor+"SecondaryBitMap_"+_pageRef).val(sBitMapHexa);
}

/**
 * Open Expression Dialog
 * @param isFormDialog
 * @param gridId
 * @param rowId
 * @param columnName
 * @returns
 */
function iSOMessagesDefinitionFlds_openExpressionDialog(isFormDialog, gridId, rowId, columnName)
{
	
	$("#dialogOpenFrom_"+_pageRef).val(isFormDialog);
	var params = {};
	
	var interfaceCode = $("#lookuptxt_atm_interface_"+_pageRef).val();
	var mti =   $("#lookuptxt_mti_"+_pageRef).val();
	
	if(common_isVariableValueNoEmpty(interfaceCode))
	{
		params["customExpressionCO.interfaceId"] = interfaceCode;
	}
	else
	{
		_showErrorMsg(please_select_atm_interface_key, info_msg_title,300, 100);
		return;
	}
	
	params["_pageRef"]	= _pageRef;
	params["iv_crud"] 	= $("#iv_crud_" + _pageRef).val();
	var ivCrud = $("#iv_crud_" + _pageRef).val();
	
	var gridUrl = jQuery.contextPath+ "/path/iSOMessagesDefinition/ISOMessagesDefinitionListAction_loadFieldsByInterfaceCodeAndMTICode?iv_crud="+ivCrud+"" +
	"&&_pageRef="+_pageRef+"&&criteria.interfaceId="+interfaceCode+"&&criteria.messageId="+mti;
	params["customExpressionCO.gridUrl"] = gridUrl;

	var dialogOutput = "";
	
	//dialog opened from Form
	if(common_isVariableValueNoEmpty(isFormDialog) && (isFormDialog == "true" || isFormDialog == true) )
	{
		dialogOutput = $("#dialogExpression_"+_pageRef).val();
	}
	else
		//dialog opened from Grid
		if(common_isVariableValueNoEmpty(isFormDialog) && (isFormDialog == "false" || isFormDialog == false) )
		{
			
			//get grid column value of selected/dialog opened row
			dialogOutput = common_getGridColumnValue(gridId, rowId, "net_MSG_FLDSVO.EXPRESSION");
			
			//set gridid/column id/row in hidden fields which it needs 
			$("#dialogOpenFromGrid_"+_pageRef).val(gridId);
			$("#dialogOpenFromGridRowId_"+_pageRef).val(rowId);
			$("#dialogOpenFromGridRowColumn_"+_pageRef).val(columnName);
			
			var gridRow = $("#" + gridId).find("#" + rowId);
			//check if dialog open with editable row that didn't added as new row then add property changed=1
			if(!common_isVariableValueNoEmpty(gridRow.attr("added")))
			{
				gridRow.attr("changed", "1");
			}
		}
	
	//check if the expression hidden in hidden field
	if(common_isVariableValueNoEmpty(dialogOutput))
	{
		params["customExpressionCO.expression"] = dialogOutput;
	}
	
	//open Expression Dialog
	common_openExpressionDialog("/path/customexpression/CustomExpressionMaintAction_returnDialogPage", params, ['450','700','iSOMessagesDefinitionFlds_onExpressionOk',
		'/path/customexpression/CustomExpressionMaintAction_save.action','customExpressionFormId']);
}

/**
 * On Ok button of Expression Dialog
 * @param expressionTextArea
 * @returns
 */
function  iSOMessagesDefinitionFlds_onExpressionOk(expressionTextArea)
{
		
	var isFormDialog =  $("#dialogOpenFrom_"+_pageRef).val();
		
	if(isFormDialog == "true" || isFormDialog == true)
	{
		$("#dialogExpression_"+_pageRef).val(expressionTextArea);
	} else if(isFormDialog == "false" || isFormDialog == false)
	{
		//set expression in grid colum
		iSOMessagesDefinitionFlds_setGridDialogValueInColumn(expressionTextArea);
	}

	//empty hidden feilds
	$("#dialogOpenFromGrid_"+_pageRef).val("");
	$("#dialogOpenFromGridRowId_"+_pageRef).val("");
	$("#dialogOpenFromGridRowColumn_"+_pageRef).val("");
		
	//set flag for form change
	$("#isFormChanged_"+_pageRef).val("1");
}


/**
 * Set Textarea Expression in Grid Column
 * @param dialogOutput
 * @returns
 */
function iSOMessagesDefinitionFlds_setGridDialogValueInColumn(dialogOutput)
{
	var dialogOpenFromGrid = $("#dialogOpenFromGrid_"+_pageRef).val();
	var dialogOpenFromGridRowId = $("#dialogOpenFromGridRowId_"+_pageRef).val();
	var dialogOpenFromGridRowColumn = $("#dialogOpenFromGridRowColumn_"+_pageRef).val();
	
	var gridObject = $("#"+dialogOpenFromGrid);
	gridObject.jqGrid('setCellValue', dialogOpenFromGridRowId,"net_MSG_FLDSVO.EXPRESSION", dialogOutput);
}


/**
 * Prepare Json of of all Rows of Request and Response grids
 * @param rows
 * @returns
 */
function iSOMessagesDefinitionFlds_prepareRequestFldJson(gridFor)
{
	var selectedIDs = $("#"+gridFor+"IsoMsgDefFieldsListGridTbl_Id_" + _pageRef).jqGrid('getGridParam', 'selarrrow');
	//var rowIds =  $("#"+gridFor+"IsoMsgDefFieldsListGridTbl_Id_" + _pageRef).jqGrid('getDataIDs');
	var selectedRowsVlaue = [];
	for(var i = 0 ; i< selectedIDs.length; i++)
	{
		var rowObject = $("#"+gridFor+"IsoMsgDefFieldsListGridTbl_Id_" + _pageRef).jqGrid('getRowData', selectedIDs[i]);
		
		/**
		 * check if the row is selected or not
		 * if Row Selected then set value in hidden column Y
		 * Otherwise  set value in hidden column N
		 */
		var isSelected = $("#jqg_"+gridFor+"IsoMsgDefFieldsListGridTbl_Id_ISOMSGDEFMT_"+selectedIDs[i]).is(":checked");
		selectedRowsVlaue.push(rowObject);
	}

	var rowdata = JSON.stringify(selectedRowsVlaue);
	if(rowdata != "")
	{
		//add root for json string
		rowdata  = "{"+ "\"root\":"+rowdata +"}";
	}
	$("#"+gridFor+"Fields_"+_pageRef).val(rowdata);
}


/**
 * Select saved field rows
 * @returns
 */
function iSOMessagesDefinitionFlds_selectSavedFields(gridFor)
{
	var isoMsgDefId = $("#iso_message_definition_code_"+_pageRef).val();
	var requestFieldsJson = $("#"+gridFor+"Fields_"+_pageRef).val();
	var oldISOMsgCode = $("#oldISOMsgCode_"+_pageRef).val();
	var newISOMsgCode = $("#lookuptxt_mti_"+_pageRef).val();
	
	if(common_isVariableValueNoEmpty(isoMsgDefId) && common_isVariableValueNoEmpty(requestFieldsJson) && oldISOMsgCode == newISOMsgCode)
	{
		var isCheckedNetworkMsg = $("#networkMessage_"+_pageRef).is(":checked");
		
		if(common_isVariableValueNoEmpty(isCheckedNetworkMsg)  &&  (isCheckedNetworkMsg == true || isCheckedNetworkMsg == "true"))
		{
			
			var allRowsArray = JSON.parse(requestFieldsJson)["root"];
		   	for (var i = 0; i < allRowsArray.length; i++) 
			{
		    	var data = {};
		    	obj = allRowsArray[i];
		    	var fieldCode = obj["net_MSG_FLDSVO"]["FIELD_CODE"];
		    	var networkMsgFieldsId = obj["net_MSG_FLDSVO"]["NET_MSG_FLD_ID"];
		    	var expression = obj["net_MSG_FLDSVO"]["EXPRESSION"];
		    	if(fieldCode != undefined )
		    	{
		    		$("#"+gridFor+"IsoMsgDefFieldsListGridTbl_Id_"+_pageRef).jqGrid('setSelection',fieldCode, true);
		    		$("#"+gridFor+"IsoMsgDefFieldsListGridTbl_Id_"+_pageRef).jqGrid('setCellValue', fieldCode,"net_MSG_FLDSVO.NET_MSG_FLD_ID", networkMsgFieldsId);
		    		$("#"+gridFor+"IsoMsgDefFieldsListGridTbl_Id_"+_pageRef).jqGrid('setCellValue', fieldCode,"net_MSG_FLDSVO.EXPRESSION", expression);
		    	}
			}
		}
	}
	else
	{
		var rowIds = $("#"+gridFor+"IsoMsgDefFieldsListGridTbl_Id_"+_pageRef).jqGrid('getDataIDs');
		for(var i = 0 ; i< rowIds.length; i++)
		{
			$("#"+gridFor+"IsoMsgDefFieldsListGridTbl_Id_"+_pageRef).jqGrid('setSelection',rowIds[i], true);
		}
	}
}
