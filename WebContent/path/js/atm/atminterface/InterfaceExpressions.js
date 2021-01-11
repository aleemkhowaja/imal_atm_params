/**
 * 
 * @returns
 */
function interfaceExpression_openExpressionDialog(isFormDialog, gridId, rowId, columnName)
{
	
	$("#dialogOpenFrom_"+_pageRef).val(isFormDialog);
	var status = $("#statusId_" + _pageRef).val();
	var ivCrud = $("#iv_crud_" + _pageRef).val();
	
	var params = {};
	
	params["_pageRef"]	= _pageRef;
	params["iv_crud"] 	= ivCrud;
	
	// Show Data elements into Dialog grid
	
	//var gridUrl = "/imal_atm_params/path/atmInterface/ATMInterfaceListAction_returnISOFieldsExpressionGrid?iv_crud="+ivCrud+"&&_pageRef="+_pageRef+"&&criteria.interfaceId="+interfaceCode;
	//params["customExpressionCO.gridUrl"] = gridUrl;
	
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
			dialogOutput = common_getGridColumnValue(gridId, rowId, columnName);
			
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
	
	if(common_isVariableValueNoEmpty(status))
	{
		params["customExpressionCO.status"] = status;
	}
	//open Expression Dialog
	common_openExpressionDialog("/path/customexpression/CustomExpressionMaintAction_returnDialogPage", params, ['450','700','interfaceExpression_onExpressionOk',
		'/path/customexpression/CustomExpressionMaintAction_save.action','customExpressionFormId','showDataElementsInDialog()']);
	
}


function interfaceExpression_onExpressionOk(expressionTextArea)
{
		
	var isFormDialog =  $("#dialogOpenFrom_"+_pageRef).val();
		
	if(isFormDialog == "true" || isFormDialog == true)
	{
		$("#dialogExpression_"+_pageRef).val(expressionTextArea);
	} else if(isFormDialog == "false" || isFormDialog == false)
	{
		//set expression in grid colum
		interfaceExpression_setGridDialogValueInColumn(expressionTextArea);
	}

	//empty hidden feilds
	$("#dialogOpenFromGrid_"+_pageRef).val("");
	$("#dialogOpenFromGridRowId_"+_pageRef).val("");
	$("#dialogOpenFromGridRowColumn_"+_pageRef).val("");
		
	//set flag for form change
	$("#isFormChanged_"+_pageRef).val("1");
}



function interfaceExpression_setGridDialogValueInColumn(dialogOutput)
{
	var dialogOpenFromGrid = $("#dialogOpenFromGrid_"+_pageRef).val();
	var dialogOpenFromGridRowId = $("#dialogOpenFromGridRowId_"+_pageRef).val();
	var dialogOpenFromGridRowColumn = $("#dialogOpenFromGridRowColumn_"+_pageRef).val();
	
	var gridObject = $("#"+dialogOpenFromGrid);
	gridObject.jqGrid('setCellValue', dialogOpenFromGridRowId,dialogOpenFromGridRowColumn, dialogOutput);
}