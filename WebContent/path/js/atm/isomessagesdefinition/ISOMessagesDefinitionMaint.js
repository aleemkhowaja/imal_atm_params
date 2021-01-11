/**
 * After Confirmation save
 * 
 * @returns
 */
function iSOMessagesDefinitionMaint_save()
{
	
	var changes = $("#iSOMessagesDefinitionMaintFormId_" + _pageRef).hasChanges();
	var isFormChanged =  $("#isFormChanged_" + _pageRef).val();
	if ((changes == 'true' || changes == true) || isFormChanged === "1")
	{
		var mtiCode = $("#lookuptxt_mti_"+_pageRef).val();
		var processCode = $("#processCode_id_"+_pageRef).val();
		
		if(!common_isVariableValueNoEmpty(mtiCode) && !common_isVariableValueNoEmpty(processCode))
		{
			_showErrorMsg(mti_or_process_code_required_key, info_msg_title,300, 100);
			return;
		}
		
		/**
		 * prepare fields with JSON while network Message checkbox checked other wise set emty value in 
		 * request and response fields json
		 */
		var isCheckedNetworkMsg = $("#networkMessage_"+_pageRef).is(":checked");
		if(common_isVariableValueNoEmpty(isCheckedNetworkMsg)  &&  (isCheckedNetworkMsg == true || isCheckedNetworkMsg == "true"))
		{
			/**
			 * Prepare and get selected request ISO Fields
			 */
			iSOMessagesDefinitionFlds_prepareRequestFldJson("request");
			
			/**
			 * Prepare and get selected response ISO Fields
			 */
			iSOMessagesDefinitionFlds_prepareRequestFldJson("response");
		}
		else
		{
			$("#requestFields_"+_pageRef).val("");
			$("#responseFields_"+_pageRef).val("");
		}
		
		var action = jQuery.contextPath
		+ "/path/iSOMessagesDefinition/ISOMessagesDefinitionMaintAction_save.action";

		var formData = $("#iSOMessagesDefinitionMaintFormId_" + _pageRef).serializeForm();
		
		_showProgressBar(true);
		$.ajax({
			url : action,
			type : "post",
			data : formData,
			dataType : "json",
			success : function(data)
			{
				if (typeof data["_error"] == "undefined" || data["_error"] == null)
				{
					// call clear function
					iSOMessagesDefinitionMaint_clear();
		
					_showProgressBar(false);
					_showErrorMsg(record_saved_Successfully_key, info_msg_title,
							300, 100);
				}
				else
				{
					_showProgressBar(false);
				}
			}
		
		});
	}
	else
	{
		_showProgressBar(false);
		_showErrorMsg(changes_not_available_key, info_msg_title);
	}
}

/**
 * Process before Delete record
 * 
 * @param confirm
 * @returns
 */
function iSOMessagesDefinitionMaint_processDelete()
{
	_showConfirmMsg(Confirm_Delete_Process_key, confirm_msg_title,
			iSOMessagesDefinitionMaint_delete, {}, '', '', 300, 100);
}

/**
 * After Confirmation Delete Record
 * 
 * @param confirm
 * @returns
 */
function iSOMessagesDefinitionMaint_delete(confirm)
{
	if (confirm)
	{
		var actionUrl = jQuery.contextPath
				+ "/path/iSOMessagesDefinition/ISOMessagesDefinitionMaintAction_delete.action";

		var formData = $("#iSOMessagesDefinitionMaintFormId_" + _pageRef).serializeForm();
		_showProgressBar(true);
		$.ajax({
			url : actionUrl,
			type : "post",
			dataType : "json",
			data : formData,
			success : function(param)
			{
				if (typeof param["_error"] == "undefined"
						|| param["_error"] == null)
				{
					// call clear function
					iSOMessagesDefinitionMaint_clear();

					_showProgressBar(false);
					_showErrorMsg(record_was_Deleted_Successfully_key,
							info_msg_title, 300, 100);

				}
				else
				{
					_showProgressBar(false);
				}
			}
		});
	}
	else
	{
		_showProgressBar(false);
	}
}

/**
 * clear form after save record
 * 
 * @returns
 */
function iSOMessagesDefinitionMaint_clear()
{
	$("#iSOMessagesDefinitionListGridTbl_Id_" + _pageRef).trigger("reloadGrid");

	var reloadAction = jQuery.contextPath
			+ "/path/iSOMessagesDefinition/ISOMessagesDefinitionMaintAction_clear.action";
	var reloadParams = {};
	var iv_Crud = returnHtmlEltValue("ivcrud_" + _pageRef);
	reloadParams["iv_crud"] = iv_Crud;
	reloadParams["_pageRef"] = _pageRef;
	_showProgressBar(true);
	$.ajax({
		url : reloadAction,
		type : "post",
		data : reloadParams,
		success : function(data)
		{
			$("#iSOMessagesDefinitionMaintDiv_id_" + _pageRef).html(data);
			_showProgressBar(false);
		}

	});
}

/**
 * Open Expression Dialog From ISO Message Definition Screen
 * @param isFormDialog
 * @param gridId
 * @param rowId
 * @param columnName
 * @returns
 */
function iSOMessagesDefinitionMaint_openExpressionDialog(isFormDialog, gridId, rowId, columnName)
{
	$("#dialogOpenFrom_"+_pageRef).val(isFormDialog);
	var params = {};
	
	var interfaceCode = $("#lookuptxt_atm_interface_"+_pageRef).val();
	var mti =   $("#lookuptxt_mti_"+_pageRef).val();
		
		
/*	if(!common_isVariableValueNoEmpty(interfaceCode) && !common_isVariableValueNoEmpty(mti))
	{
		_showErrorMsg(please_select_interface_and_mti_key, info_msg_title,300, 100);
		return;
	}
	else */
		if(!common_isVariableValueNoEmpty(interfaceCode))
		{
			_showErrorMsg(please_select_atm_interface_key, info_msg_title,300, 100);
			return;
		}
	
/*	else 
		if(!common_isVariableValueNoEmpty(mti))
		{
			_showErrorMsg(please_select_mti_key, info_msg_title,300, 100);
			return;
		}*/
	
	
	params["customExpressionCO.interfaceId"] = interfaceCode;
	
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
			dialogOutput = common_getGridColumnValue(gridId, rowId, columnName+"_EXPRESSION");
			
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
	common_openExpressionDialog("/path/customexpression/CustomExpressionMaintAction_returnDialogPage", params, ['450','700','iSOMessagesDefinitionMaint_onExpressionOk',
		'/path/customexpression/CustomExpressionMaintAction_save.action','customExpressionFormId']);
}

/**
 * On Ok button of Expression Dialog
 * @param expressionTextArea
 * @returns
 */
function  iSOMessagesDefinitionMaint_onExpressionOk(expressionTextArea)
{
		
	var isFormDialog =  $("#dialogOpenFrom_"+_pageRef).val();
		
	if(isFormDialog == "true" || isFormDialog == true)
	{
		$("#dialogExpression_"+_pageRef).val(expressionTextArea);
	} else if(isFormDialog == "false" || isFormDialog == false)
	{
		//set expression in grid colum
		iSOMessagesDefinitionMaint_setGridDialogValueInColumn(expressionTextArea);
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
function iSOMessagesDefinitionMaint_setGridDialogValueInColumn(dialogOutput)
{
	var dialogOpenFromGrid = $("#dialogOpenFromGrid_"+_pageRef).val();
	var dialogOpenFromGridRowId = $("#dialogOpenFromGridRowId_"+_pageRef).val();
	var dialogOpenFromGridRowColumn = $("#dialogOpenFromGridRowColumn_"+_pageRef).val();
	
	var gridObject = $("#"+dialogOpenFromGrid);
	gridObject.jqGrid('setCellValue', dialogOpenFromGridRowId,dialogOpenFromGridRowColumn+"_EXPRESSION", dialogOutput);
}


/**
 * Open WS Mapping Dialog
 * @returns
 */
function iSOMessagesDefinitionMaint_openWSMappingDialog()
{
	var updateMode = $("#updateMode_hdn_" + _pageRef).val();
	if(updateMode == "Y")
	{
		var mappingId = $("#iso_mappingId_"+_pageRef).val();
		var myArgs =[]
		myArgs["interfaceCode"] = $("#lookuptxt_atm_interface_"+_pageRef).val();
		myArgs ["mtiCode"] = $("#lookuptxt_mti_"+_pageRef).val();
		
		var appFilter =[{"RET":"cpws,pws"},{"CIS":"cpws"}]
		var mappingFieldsUrl = jQuery.contextPath+"/path/iSOMessagesDefinition/ISOMessagesDefinitionListAction_loadFieldsByInterfaceCodeAndMTICode?criteria.interfaceId="+myArgs["interfaceCode"]+"&criteria.messageId="+myArgs ["mtiCode"];

		
		pws_loadPwsModal(mappingId,ws_mapping_dialog_title_key,{}, mappingFieldsUrl,"setMappingId",appFilter,mappingFieldsUrl);
	//	pws_loadPwsModal('',ws_mapping_dialog_title_key,myArgs);
	}
	else
	{
		_showErrorMsg(record_must_be_saved_key, info_msg_title,300, 100);		
	}
}

function setMappingId(mappingId)
{
	$("#iso_mappingId_"+_pageRef).val(mappingId)
	$("#isFormChanged_" + _pageRef).val("1");
}