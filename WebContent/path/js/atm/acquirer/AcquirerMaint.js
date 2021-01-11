
/**
 * validate trx expression
 * @returns
 */
function acquirerMaint_validateTrxExpression()
{
	var gridId = "acqTransactionsGridTbl_Id_"+_pageRef;
	var $table = $("#"+gridId);
	var gidRowIds =  $table.jqGrid('getDataIDs');
	for(var i=0; i<gidRowIds.length; i++)
	{
		var trxExpression        = common_getGridColumnValue(gridId, gidRowIds[i], "TRX_EXPRESSION");
		var chargesTrxExpression = common_getGridColumnValue(gridId, gidRowIds[i], "CHARGES_TRX_EXPRESSION");
		
		if(!common_isVariableValueNoEmpty(trxExpression))
		{
			_showErrorMsg(fill_trx_type_expression_key, info_msg_title,300, 100);
			return false;
		}
	}
	return true;
}


/**
 * After Confirmation save
 * 
 * @returns
 */
function acquirerMaint_save()
{
	
	var changes = $("#acquirerMaintFormId_" + _pageRef).hasChanges();
	var isFormChanged =  $("#isFormChanged_" + _pageRef).val();
	if ((changes == 'true' || changes == true) || isFormChanged === "1")
	{
		
		var expression = $("#dialogExpression_"+_pageRef).val();
		if(!common_isVariableValueNoEmpty(expression))
		{
			_showErrorMsg(fill_expression_key, info_msg_title,300, 100);
			return;
		}
		
		var isExistTrxTypesExpression = acquirerMaint_validateTrxExpression();
		if(!isExistTrxTypesExpression)
		{
			return;
		}
		
		var action = jQuery.contextPath
		+ "/path/acquirer/AcquirerMaintAction_save.action";

		var transactionJSON = $("#acqTransactionsGridTbl_Id_"+_pageRef).jqGrid('getChangedRowData');
		
		if(common_isVariableValueNoEmpty(transactionJSON))
		{
			$("#transactionsJSON_"+_pageRef).val(transactionJSON);
		}
		
		var formData = $("#acquirerMaintFormId_" + _pageRef).serializeForm();
		
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
					acquirerMaint_clear();
		
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
function acquirerMaint_processDelete()
{
	_showConfirmMsg(Confirm_Delete_Process_key, confirm_msg_title,
			acquirerMaint_delete, {}, '', '', 300, 100);
}

/**
 * After Confirmation Delete Record
 * 
 * @param confirm
 * @returns
 */
function acquirerMaint_delete(confirm)
{
	if (confirm)
	{
		var actionUrl = jQuery.contextPath
				+ "/path/acquirer/AcquirerMaintAction_delete.action";

		var formData = $("#acquirerMaintFormId_" + _pageRef).serializeForm();
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
					acquirerMaint_clear();

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
function acquirerMaint_clear()
{
	$("#acquirerListGridTbl_Id_" + _pageRef).trigger("reloadGrid");

	var reloadAction = jQuery.contextPath
			+ "/path/acquirer/AcquirerMaintAction_clear.action";
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
			$("#acquirerListMaintDiv_id_" + _pageRef).html(data);
			_showProgressBar(false);
		}

	});
}

/**
 * Open Expression Dialog From Acquirer Screen
 * @param isFormDialog
 * @param gridId
 * @param rowId
 * @param columnName
 * @returns
 */
function acquirerMaint_openExpressionDialog(isFormDialog, gridId, rowId, columnName)
{
	
	$("#dialogOpenFrom_"+_pageRef).val(isFormDialog);
	var params = {};
	
	var interfaceCode = $("#lookuptxt_atm_interface_"+_pageRef).val();
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
	
	var gridUrl = jQuery.contextPath+"/path/atmInterface/ATMInterfaceListAction_returnISOFieldsExpressionGrid?iv_crud="+ivCrud+
	"&&_pageRef="+_pageRef+"&&criteria.interfaceId="+interfaceCode+"&&criteria.screenFrom=acquirer";
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
			
			//************start validate of trx type and trx charges trype livesearch
			if(columnName == "TRX")
			{
				var trxType =  common_getGridColumnValue(gridId, rowId, "TRX_TYPE");
				if(!common_isVariableValueNoEmpty(trxType))
				{
					_showErrorMsg(please_select_trx_type_key, info_msg_title,300, 100);
					return;
				}
			}
			else if(columnName == "CHARGES_TRX")
			{
				var chargesTrxType =  common_getGridColumnValue(gridId, rowId, "CHARGES_TRX_TYPE");
				if(!common_isVariableValueNoEmpty(chargesTrxType))
				{
					_showErrorMsg(please_select_charges_trx_type_key, info_msg_title,300, 100);
					return;
				}
			}
			//************end validate of trx type and trx charges trype livesearch
			
			
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
	common_openExpressionDialog("/path/customexpression/CustomExpressionMaintAction_returnDialogPage", params, ['450','700','acquirerMaint_onExpressionOk',
		'/path/customexpression/CustomExpressionMaintAction_save.action','customExpressionFormId']);
}

/**
 * On Ok button of Expression Dialog
 * @param expressionTextArea
 * @returns
 */
function  acquirerMaint_onExpressionOk(expressionTextArea)
{
		
	var isFormDialog =  $("#dialogOpenFrom_"+_pageRef).val();
		
	if(isFormDialog == "true" || isFormDialog == true)
	{
		$("#dialogExpression_"+_pageRef).val(expressionTextArea);
	} else if(isFormDialog == "false" || isFormDialog == false)
	{
		//set expression in grid colum
		acquirerMaint_setGridDialogValueInColumn(expressionTextArea);
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
function acquirerMaint_setGridDialogValueInColumn(dialogOutput)
{
	var dialogOpenFromGrid = $("#dialogOpenFromGrid_"+_pageRef).val();
	var dialogOpenFromGridRowId = $("#dialogOpenFromGridRowId_"+_pageRef).val();
	var dialogOpenFromGridRowColumn = $("#dialogOpenFromGridRowColumn_"+_pageRef).val();
	
	var gridObject = $("#"+dialogOpenFromGrid);
	gridObject.jqGrid('setCellValue', dialogOpenFromGridRowId,dialogOpenFromGridRowColumn+"_EXPRESSION", dialogOutput);
}
