function gblActColMapGrid_addMapGrid()
{
	var	globalActivityId =  $('#lookuptxt_globalActivityId_'+ currentPageRef).val();
	if ( globalActivityId == null || globalActivityId ==undefined || globalActivityId =="" )
	{
		_showErrorMsg(select_global_activity_id_key,info_msg_title);
		return ; 
	}
	var	restOperationId =  $('#lookuptxt_restOperationId_'+ currentPageRef).val();
	if ( restOperationId == null || restOperationId ==undefined || restOperationId=="" )
	{
		_showErrorMsg(select_rest_operaion_id_key,info_msg_title);
		return ; 
	}
	var	outParameter =  $('#lookuptxt_operationOutParameter_'+ _pageRef).val();
	if ( outParameter == null || outParameter ==undefined || outParameter == "" )
	{
		_showErrorMsg(select_operation_out_parameter_key,info_msg_title);
		return ; 
	}
	var gridId =	$("#globalActivityColumnMapGrid_Id_"+currentPageRef);
	// add new row
	var rowId = gridId.jqGrid('addInlineRow', {});
	$("#"+rowId).focus();
}
function gblActColMapGrid_deleteMapGrid(theRowId)
{
	_showConfirmMsg((typeof Confirm_Delete_Process_key != undefined)?Confirm_Delete_Process_key:"Delete Selected Row?",confirm_msg_title,function(yesNo)
		    {
				if(yesNo) 
				{
					var $table = $("#globalActivityColumnMapGrid_Id_" + currentPageRef);
					var selectedRowObject = $table.jqGrid('getRowData', theRowId);
					$("#globalActivityColumnMapGrid_Id_"+currentPageRef).jqGrid('deleteGridRow',theRowId);	
				}
			},"yesNo");	
}
   
function gblActColMapGrid_colDataTypeChanged()
{
	var $table = $("#globalActivityColumnMapGrid_Id_" + currentPageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var selectedRowObject = $table.jqGrid('getRowData', selectedRowId);
	var colDataType= selectedRowObject["COL_DATA_TYPE"];
	if(colDataType == 'N')
	{
		$table.jqGrid('setCellReadOnly',selectedRowId,'COL_FORMAT', false );
	}  else {
		$table.jqGrid('setCellValue', selectedRowId,"COL_FORMAT","");
		$table.jqGrid('setCellReadOnly',selectedRowId,'COL_FORMAT', true );
	}
	
} 
function gblActColMapGrid_validateFormat(colName)
{
	var $table = $("#globalActivityColumnMapGrid_Id_" + _pageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var myObject = $table.jqGrid('getRowData', selectedRowId);
	var code = myObject[colName];
	var result = code.match("^[#0]+[#,0]*");
	var result2 = code.match("^[#0]+[#,0]+[.]+[#0]*");
	if ( ( result == null || result != code) && ( result2 == null || result2 != code) )
	{
		_showErrorMsg(invalid_number_format_key,info_msg_title);
		$table.jqGrid('setCellValue', selectedRowId,colName,"");
		return ; 
	}
}
function gblActColMapGrid_checkDuplicate(colName)
{
	var $table = $("#globalActivityColumnMapGrid_Id_" + _pageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var rows = $table.jqGrid('getDataIDs');
	var rowsLen = rows.length;
	var myObject = $table.jqGrid('getRowData', selectedRowId);
	var code = myObject[colName];
	var regex = new RegExp("^([a-zA-Z])+\\w+$");
    if (colName != "COL_DESCRIPTION" && !regex.test(code)) {
    	_showErrorMsg(invalid_input_values_key,info_msg_title);
    	$table.jqGrid('setCellValue', selectedRowId,colName,"");
       return false;
    }
	for (var i=0; i< rowsLen; i++)
	{
		if(selectedRowId != rows[i])
		{
			var myObject1 = $table.jqGrid('getRowData',rows[i]);
			var code1 = myObject1[colName];
			if(code1 != "" && code != "" && code1 == code)
			{
				$table.jqGrid("setCellValue",selectedRowId, colName , "");
				_showErrorMsg(msg_duplicate_entry_Of_record_key,error_msg_title);
				return false;
			}
		}
	}
}
 