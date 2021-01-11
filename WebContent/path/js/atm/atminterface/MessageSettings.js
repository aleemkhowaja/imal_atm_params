//Check all Request Fields 
$.subscribe('allFieldsSelected', function(event, data) 
{
	ATMMnt_bitmap(event);
});

//Check all Response Fields 
$.subscribe('allResponseFieldsSelected', function(event, data) 
{
	ATMMnt_bitmapResponse(event);
});

//Message Selected
$.subscribe('rowselect', function(event, data) 
{
	$("#isoFieldsListGridTbl_Id_"+_pageRef).jqGrid('resetSelection');
	$("#isoResponseFieldsListGridTbl_Id_"+_pageRef).jqGrid('resetSelection');
	ATMMnt_chechUncheckAfterLoad();
	ATMMnt_chechUncheckResponseAfterLoad();
	
	//copy fields from ISO Fields grid to Request/response Grids
	ATMMnt_CopyFields();
});

//Reset Selection
$.subscribe('afterLoadMessages', function(event, data) 
{
	$("#isoFieldsListGridTbl_Id_"+_pageRef).jqGrid('resetSelection');
	$("#isoResponseFieldsListGridTbl_Id_"+_pageRef).jqGrid('resetSelection');
});

//Request Fields Grid functions
$.subscribe('fieldSelected', function(event, data) 
{
	debugger
	var rowId = event.originalEvent.id;
	var rowId = event.originalEvent.id;
	if(rowId == 1)
	{
		//$("#isoFieldsListGridTbl_Id_"+_pageRef).jqGrid('setSelection',1, false);
	}
	var checkDisable = $("#_recReadOnly_"+_pageRef).val();
	var fieldsReadonly = $('#fieldsGridReadOnly_'+_pageRef).val();
	if(checkDisable != "true")
	{
		ATMMnt_bitmap(event);
	}
	else if(checkDisable == "true" && fieldsReadonly != "true")
	{
		$("#isoFieldsListGridTbl_Id_"+_pageRef).jqGrid('setSelection',rowId, false);
	}
});

//Response Fields Grid functions
$.subscribe('responseFieldSelected', function(event, data) 
{
	var rowId = event.originalEvent.id;
	var rowId = event.originalEvent.id;
	if(rowId == 1)
	{
		//$("#isoResponseFieldsListGridTbl_Id_"+_pageRef).jqGrid('setSelection',1, false);
	}
	var checkDisable = $("#_recReadOnly_"+_pageRef).val();
	var fieldsReadonly = $('#fieldsGridReadOnly_'+_pageRef).val();
	if(checkDisable != "true")
	{
		ATMMnt_bitmapResponse(event);
	}
	else if(checkDisable == "true" && fieldsReadonly != "true")
	{
		$("#isoResponseFieldsListGridTbl_Id_"+_pageRef).jqGrid('setSelection',rowId, false);
	}
});

//Copy Same Request Fields to Response
function MsgStng_moveRequestFieldsToResponse()
{
	//$("#saveRecord_" + _pageRef).val(1);
	var $table = $("#isoMessageListGridTbl_Id_" + _pageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var myObject = $table.jqGrid('getRowData', selectedRowId);
		
	if(selectedRowId != null || selectedRowId != '')
	{
		$("#isoResponseFieldsListGridTbl_Id_"+_pageRef).jqGrid('resetSelection');
		$("#isoMessageListGridTbl_Id_"+_pageRef).jqGrid('setCellValue', selectedRowId, "iso_INT_MSGSVO.RESPONSE_BITMAP1", myObject['iso_INT_MSGSVO.REQUEST_BITMAP1']);
		$("#isoMessageListGridTbl_Id_"+_pageRef).jqGrid('setCellValue', selectedRowId, "iso_INT_MSGSVO.RESPONSE_BITMAP2", myObject['iso_INT_MSGSVO.REQUEST_BITMAP2']);
		ATMMnt_chechUncheckResponseAfterLoad();
		$("#isFormChanged_" + _pageRef).val("1");
	}
	//$("#saveRecord_" + _pageRef).val(0);
}

//Bitmap Response Fields
function ATMMnt_bitmapResponse(event)
{
	var $table = $("#isoMessageListGridTbl_Id_" + _pageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var checkDisable = $("#_recReadOnly_"+_pageRef).val();
		
	if(selectedRowId == null || selectedRowId == '')
	{
		if(event.type == 'allResponseFieldsSelected')
		{
			$("#isoResponseFieldsListGridTbl_Id_"+_pageRef).jqGrid('resetSelection');
		}
		else
		{
			var checkedRowId = $("#isoResponseFieldsListGridTbl_Id_"+_pageRef).jqGrid('getGridParam', 'selrow');
			$("#isoResponseFieldsListGridTbl_Id_"+_pageRef).jqGrid('resetSelection', checkedRowId);
		}
		_showErrorMsg(msg_not_found_key, info_msg_title, 300,100);
		return false;
	}
	else
	{
		var selectedIDs = $("#isoResponseFieldsListGridTbl_Id_"+_pageRef).jqGrid('getGridParam', 'selarrrow');
		var primaryBitMap = [];
		var secondaryBitMap = [];
		var pBitMap = "";
		var sBitMap = "";
		var field = "";
		//Set 128 Fields of Bitmaps 64 for each primary and Secondary
		//(1-64 Primary Bitmap and 65-128 Secondary Bitmap)
		for(var j = 0; j< 64; j++)
		{
			primaryBitMap[j] = "0";
			secondaryBitMap[j] = "0";
		}
		//Set all selected Fields
		for (var i = 0; i < selectedIDs.length; i++) {
			field = selectedIDs[i];
			if(field <= 64)
			{
				primaryBitMap[field-1] = "1";
			}
			else
			{
				primaryBitMap[0] = "1";
				//$("#isoFieldsListGridTbl_Id_"+_pageRef).jqGrid('setSelection',1, true);
				secondaryBitMap[field-65] = "1";
			}
		}
		//Generate Binary for Primary Bitmap
		for(var i = 0; i < primaryBitMap.length; i++){
			pBitMap += primaryBitMap[i];
		}
		//Generate Binary for Secondary Bitmap
		for(var i = 0; i < secondaryBitMap.length; i++){
			sBitMap += secondaryBitMap[i];
		}
		//Generate Hexadecimal Sequence for Bitmaps
		var pBitMapHexa = binaryToHex(pBitMap)['result'];
		var sBitMapHexa = binaryToHex(sBitMap)['result'];
		
		//Update Data at Message Level
		$("#isoMessageListGridTbl_Id_"+_pageRef).jqGrid('setCellValue', selectedRowId, "iso_INT_MSGSVO.RESPONSE_BITMAP1", pBitMapHexa);
		$("#isoMessageListGridTbl_Id_"+_pageRef).jqGrid('setCellValue', selectedRowId, "iso_INT_MSGSVO.RESPONSE_BITMAP2", sBitMapHexa);
		//If Bitmaps are changed against a saved message
		if(selectedRowId != undefined && selectedRowId != '')
		{
			var myObject = $table.jqGrid('getRowData', selectedRowId);
			if(myObject['iso_INT_MSGSVO.ATM_ISO_MSGS_CODE'] != null && myObject['iso_INT_MSGSVO.ATM_ISO_MSGS_CODE'] != '')
			{
				$("#isoMessageListGridTbl_Id_"+_pageRef).find("#"+selectedRowId).attr("changed","1");
			}
		}
	}
}

//BitMap Request Fields
function ATMMnt_bitmap(event)
{
	var $table = $("#isoMessageListGridTbl_Id_" + _pageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var checkDisable = $("#_recReadOnly_"+_pageRef).val();
		
	if(selectedRowId == null || selectedRowId == '')
	{
		if(event.type == 'allFieldsSelected')
		{
			$("#isoFieldsListGridTbl_Id_"+_pageRef).jqGrid('resetSelection');
		}
		else
		{
			var checkedRowId = $("#isoFieldsListGridTbl_Id_"+_pageRef).jqGrid('getGridParam', 'selrow');
			$("#isoFieldsListGridTbl_Id_"+_pageRef).jqGrid('resetSelection', checkedRowId);
		}
		_showErrorMsg(msg_not_found_key, info_msg_title, 300,100);
		return false;
	}
	else
	{
		var selectedIDs = $("#isoFieldsListGridTbl_Id_"+_pageRef).jqGrid('getGridParam', 'selarrrow');
		var primaryBitMap = [];
		var secondaryBitMap = [];
		var pBitMap = "";
		var sBitMap = "";
		var field = "";
		//Set 128 Fields of Bitmaps 64 for each primary and Secondary
		//(1-64 Primary Bitmap and 65-128 Secondary Bitmap)
		for(var j = 0; j< 64; j++)
		{
			primaryBitMap[j] = "0";
			secondaryBitMap[j] = "0";
		}
		//Set all selected Fields
		for (var i = 0; i < selectedIDs.length; i++) {
			field = selectedIDs[i];
			if(field <= 64)
			{
				primaryBitMap[field-1] = "1";
			}
			else
			{
				primaryBitMap[0] = "1";
				//$("#isoFieldsListGridTbl_Id_"+_pageRef).jqGrid('setSelection',1, true);
				secondaryBitMap[field-65] = "1";
			}
		}
		//Generate Binary for Primary Bitmap
		for(var i = 0; i < primaryBitMap.length; i++){
			pBitMap += primaryBitMap[i];
		}
		//Generate Binary for Secondary Bitmap
		for(var i = 0; i < secondaryBitMap.length; i++){
			sBitMap += secondaryBitMap[i];
		}
		//Generate Hexadecimal Sequence for Bitmaps
		var pBitMapHexa = binaryToHex(pBitMap)['result'];
		var sBitMapHexa = binaryToHex(sBitMap)['result'];
		
		//Update Data at Message Level
		$("#isoMessageListGridTbl_Id_"+_pageRef).jqGrid('setCellValue', selectedRowId, "iso_INT_MSGSVO.REQUEST_BITMAP1", pBitMapHexa);
		$("#isoMessageListGridTbl_Id_"+_pageRef).jqGrid('setCellValue', selectedRowId, "iso_INT_MSGSVO.REQUEST_BITMAP2", sBitMapHexa);
		//If Bitmaps are changed against a saved message
		if(selectedRowId != undefined && selectedRowId != '')
		{
			var myObject = $table.jqGrid('getRowData', selectedRowId);
			if(myObject['iso_INT_MSGSVO.ATM_ISO_MSGS_CODE'] != null && myObject['iso_INT_MSGSVO.ATM_ISO_MSGS_CODE'] != '')
			{
				$("#isoMessageListGridTbl_Id_"+_pageRef).find("#"+selectedRowId).attr("changed","1");
			}
		}
	}
}

//Enable Disable Request MTI Column 
function atmLst_enableDisableReqMTI()
{
	var rowId = $("#isoMessageListGridTbl_Id_"+_pageRef).jqGrid('getGridParam','selrow');
	var myObject 	= $("#isoMessageListGridTbl_Id_"+_pageRef).jqGrid('getRowData',rowId);
	if(myObject != null && myObject != "" 
		&& myObject['iso_INT_MSGSVO.MSG_TYPE'] != null && myObject['iso_INT_MSGSVO.MSG_TYPE'] == '1')
	{
		$("#isoMessageListGridTbl_Id_"+_pageRef).jqGrid("setCellReadOnly",rowId,"iso_INT_MSGSVO.REQ_MTI_MSG",true);
	}
	else
	{
		$("#isoMessageListGridTbl_Id_"+_pageRef).jqGrid("setCellReadOnly",rowId,"iso_INT_MSGSVO.REQ_MTI_MSG",false);
	}
}

//Check Request MTI to avoid Duplication 
function atmIntLst_checkUniqueMTI(e)
{
	var rowidModifs = $("#isoMessageListGridTbl_Id_"+_pageRef).jqGrid('getGridParam','selrow');
	var myObject 	= $("#isoMessageListGridTbl_Id_"+_pageRef).jqGrid('getRowData',rowidModifs);
	
	/**
	 * validation for Request mTI
	 * Only Number will be accepted i.e 0800
	 */
	var requestMTI = myObject['iso_INT_MSGSVO.REQUEST_MTI'];
	var result = requestMTI.match("^[0-9]*$");
	if (result == null || result != requestMTI)
	{
		$("#isoMessageListGridTbl_Id_"+_pageRef).jqGrid('setCellValue', rowidModifs,'iso_INT_MSGSVO.REQUEST_MTI',"");
		return ; 
	}
	
	if(requestMTI != null && requestMTI != "")
	{
		var rowIds = $("#isoMessageListGridTbl_Id_"+_pageRef).jqGrid('getDataIDs');
		for(var i = 0 ; i< rowIds.length; i++)
		{
			var rowObject = $("#isoMessageListGridTbl_Id_"+_pageRef).jqGrid('getRowData',rowIds[i]);
			if(rowObject != null && rowidModifs != rowIds[i] && 
					(rowObject['iso_INT_MSGSVO.REQUEST_MTI'] == requestMTI 
					|| rowObject['iso_INT_MSGSVO.RESPONSE_MTI'] == requestMTI))
			{
				_showErrorMsg("msg_duplicate_entry_Of_record_key", info_msg_title, 300,100,
	                    function() {atmIntLst_focusOnMTI(e)});
				return false;
			}
		}
	}
}

//Clear Duplicate Request MTI Field
function atmIntLst_focusOnMTI(event)
{
	var rowid = $("#isoMessageListGridTbl_Id_"+_pageRef).jqGrid('getGridParam','selrow');
	$("#isoMessageListGridTbl_Id_"+_pageRef).jqGrid('setCellValue',rowid,'iso_INT_MSGSVO.REQUEST_MTI', '');
	$("#isoMessageListGridTbl_Id_"+_pageRef).jqGrid('getRowData',rowid);
}

//Check Response MTI to avoid Duplication 
function atmIntLst_checkUniqueResponseMTI(e)
{
	var rowidModifs = $("#isoMessageListGridTbl_Id_"+_pageRef).jqGrid('getGridParam','selrow');
	var myObject 	= $("#isoMessageListGridTbl_Id_"+_pageRef).jqGrid('getRowData',rowidModifs);
	
	/**
	 * validation for Response mTI
	 * Only Number will be accepted i.e 0800
	 */
	var responseMTI = myObject['iso_INT_MSGSVO.RESPONSE_MTI'];
	var result = responseMTI.match("^[0-9]*$");
	if (result == null || result != responseMTI)
	{
		$("#isoMessageListGridTbl_Id_"+_pageRef).jqGrid('setCellValue', rowidModifs,'iso_INT_MSGSVO.RESPONSE_MTI',"");
		return ; 
	}
	
	if(responseMTI != null && responseMTI != "")
	{
		var rowIds = $("#isoMessageListGridTbl_Id_"+_pageRef).jqGrid('getDataIDs');
		for(var i = 0 ; i< rowIds.length; i++)
		{
			var rowObject = $("#isoMessageListGridTbl_Id_"+_pageRef).jqGrid('getRowData',rowIds[i]);
			if(rowObject != null && rowidModifs != rowIds[i] && 
					(rowObject['iso_INT_MSGSVO.RESPONSE_MTI'] == responseMTI 
					|| rowObject['iso_INT_MSGSVO.REQUEST_MTI'] == responseMTI))
			{
				_showErrorMsg("msg_duplicate_entry_Of_record_key", info_msg_title, 300,100,
	                    function() {atmIntLst_focusOnResponseMTI(e)});
				return false;
			}
		}
	}
}

//Clear Duplicate Response MTI Field
function atmIntLst_focusOnResponseMTI(event)
{
	var rowid = $("#isoMessageListGridTbl_Id_"+_pageRef).jqGrid('getGridParam','selrow');
	$("#isoMessageListGridTbl_Id_"+_pageRef).jqGrid('setCellValue',rowid,'iso_INT_MSGSVO.RESPONSE_MTI', '');
	$("#isoMessageListGridTbl_Id_"+_pageRef).jqGrid('getRowData',rowid);
}

//Check Uncheck Request Fields Grids
function ATMMnt_chechUncheckAfterLoad()
{
	var checkDisable = $("#_recReadOnly_"+_pageRef).val();
	if(checkDisable == "true")
	{
		$('#fieldsGridReadOnly_'+_pageRef).val('true');
	}
	var $table = $("#isoMessageListGridTbl_Id_" + _pageRef);
	var grid = $($table).jqGrid('getCol','iso_INT_MSGSVO.ATM_ISO_MSGS_CODE');
	if(grid.length > 0)
	{
		var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
		if(selectedRowId != null && selectedRowId != "")
		{
			var myObject = $table.jqGrid('getRowData', selectedRowId);
			var primaryBitMap = myObject['iso_INT_MSGSVO.REQUEST_BITMAP1'];
			var secondaryBitMap = myObject['iso_INT_MSGSVO.REQUEST_BITMAP2'];
			var pBinary = hexToBinary(primaryBitMap)['result'];
			var sBinary = hexToBinary(secondaryBitMap)['result'];
			for(var i=0; i< pBinary.length; i++)
			{
				//i in the index of binary sequence
				//i+1 to start Primary Bitmap Fields
				//i+65 to start Secondary Bitmap Fields
				if(pBinary[i]==1 || pBinary[i]=='1')
				{
					$("#isoFieldsListGridTbl_Id_"+_pageRef).jqGrid('setSelection',(i+1), true);
				}
				if(sBinary[i]==1 || sBinary[i]=='1')
				{
					$("#isoFieldsListGridTbl_Id_"+_pageRef).jqGrid('setSelection',(i+65), true);
				}
			}
			if(checkDisable == "true")
			{
				$('#fieldsGridReadOnly_'+_pageRef).val('');
			}
		}
	}
}

//Check Uncheck Response Fields Grids
function ATMMnt_chechUncheckResponseAfterLoad()
{
	var checkDisable = $("#_recReadOnly_"+_pageRef).val();
	if(checkDisable == "true")
	{
		$('#fieldsGridReadOnly_'+_pageRef).val('true');
	}
	var $table = $("#isoMessageListGridTbl_Id_" + _pageRef);
	var grid = $($table).jqGrid('getCol','iso_INT_MSGSVO.MESSAGE_CODE');
	if(grid.length > 0)
	{
		var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
		if(selectedRowId != null && selectedRowId != "")
		{
			var myObject = $table.jqGrid('getRowData', selectedRowId);
			var primaryBitMap = myObject['iso_INT_MSGSVO.RESPONSE_BITMAP1'];
			var secondaryBitMap = myObject['iso_INT_MSGSVO.RESPONSE_BITMAP2'];
			var pBinary = hexToBinary(primaryBitMap)['result'];
			var sBinary = hexToBinary(secondaryBitMap)['result'];
			for(var i=0; i< pBinary.length; i++)
			{
				//i in the index of binary sequence
				//i+1 to start Primary Bitmap Fields
				//i+65 to start Secondary Bitmap Fields
				if(pBinary[i]==1 || pBinary[i]=='1')
				{
					$("#isoResponseFieldsListGridTbl_Id_"+_pageRef).jqGrid('setSelection',(i+1), true);
				}
				if(sBinary[i]==1 || sBinary[i]=='1')
				{
					$("#isoResponseFieldsListGridTbl_Id_"+_pageRef).jqGrid('setSelection',(i+65), true);
				}
			}
			if(checkDisable == "true")
			{
				$('#fieldsGridReadOnly_'+_pageRef).val('');
			}
		}
	}
}

//Open Dialog to Test Message
function openMessageDialog(rowId)
{		
	var params = {};
	params["_pageRef"]		=_pageRef;
	var dialogUrl	= jQuery.contextPath+ "/path/atmInterface/ATMInterfaceMaintAction_openMessageDialog"
	var dialogOptions={ 
		autoOpen: false,
		height:550,
		title:message_sample_key,
		width:970 ,
		modal: true,
		close: function( event, ui ) {closeISOMsgDialog},
		buttons: [{ text : signature_close_btn, click : closeISOMsgDialog}]
	}
	$.post(dialogUrl ,params , function( param )
	{
		$('#ISO_Message_Dialog_'+_pageRef).html(param) ;
		$('#ISO_Message_Dialog_'+_pageRef).dialog(dialogOptions)
		$('#ISO_Message_Dialog_'+_pageRef).dialog('open');
		$('#messageRowId_'+_pageRef).val(rowId);
	},"html");  
}

//Close Test Message Dialog
function closeISOMsgDialog()
{
	 $('#ISO_Message_Dialog_'+_pageRef).dialog('close');	
}

//Test ISO Message
function testISOMessage()
{
	//_showProgressBar(true);
	var rowId = $('#messageRowId_'+_pageRef).val();
	var myObject = $("#isoMessageListGridTbl_Id_" + _pageRef).jqGrid('getRowData', rowId);
	var messageMTI = myObject["iso_INT_MSGSVO.REQUEST_MTI"];
	var isoMessage = $('#iso_message_'+_pageRef).val();
	var isoInterfaceCode = $("#isoInterfaceCode_" + _pageRef).val();
	
	if(messageMTI == null || messageMTI == "")
	{
		_showProgressBar(false);
		_showErrorMsg("MTI is required to Test Message", error_msg_title, 300,100);
 		return;
	}
	else
	{
		//If Message is not Empty
		if(isoMessage != null && isoMessage != "")
		{
			var reloadParams = {};
			reloadParams["criteria.isoMessage"] 	= isoMessage;
			reloadParams["criteria.messageMTI"] 	= messageMTI;
			reloadParams["criteria.interfaceId"]	= isoInterfaceCode;
			reloadParams["criteria.primaryBitmap"]  = myObject["iso_INT_MSGSVO.REQUEST_BITMAP1"];
			reloadParams["criteria.secondaryBitmap"]= myObject["iso_INT_MSGSVO.REQUEST_BITMAP2"];
			reloadParams["_pageRef"] = _pageRef;
			var actionUrl = jQuery.contextPath+ "/path/atmInterface/ATMInterfaceListAction_testISOMessage.action";
			//Reload Values Grid
			$("#isoMessageValuesGridTbl_Id_" + _pageRef).jqGrid('setGridParam',{
				url : actionUrl,
				datatype : 'json',
				postData: reloadParams,
				page : 1
	        }).trigger("reloadGrid");//Close Ajax
		}//Close Check empty message
	}//close Else
}

//Load Data in sub-grids for inner field values
function loadMessageValuesForInnerFields()
{
	var $table = $("#isoMessageValuesGridTbl_Id_" + _pageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	console.log(selectedRowId)
	var parentRow = $table.jqGrid('getRowData', selectedRowId);
	if(parentRow!=null)
    {
    	var subGridData = parentRow['subGridData'];
    	var dynamicIdPathSubGrid = "isoMessageValuesGridTbl_Id_"+_pageRef+"_"+selectedRowId+"_table";	
		var subGrid = $("#"+dynamicIdPathSubGrid);	
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

function openJobProcessingDialog(rowId)
{		
	var msgObj = $('#isoMessageListGridTbl_Id_'+_pageRef).jqGrid('getCell',(rowId instanceof Object? rowId.id : rowId), "iso_INT_MSGSVO.REQUEST_MTI");
	if(msgObj == null || msgObj == "")
	{
		_showErrorMsg(mti_not_found_key, error_msg_title, 300,100);
 		return;
	}
	var params = {};
	params["_pageRef"]		=_pageRef;
	var dialogUrl	= jQuery.contextPath+ "/path/atmInterface/ATMInterfaceMaintAction_openJobDialog"
	var dialogOptions={ 
		autoOpen: false,
		height:470,
		title:msgObj,
		width:570 ,
		modal: true,
		close: function( event, ui ) {closeJobProcessingDialog},
		buttons: [{ text : signature_close_btn, click : closeJobProcessingDialog}]
	}
	$.post(dialogUrl ,params , function( param )
	{
		$('#jobProcessingDialog_'+_pageRef).html(param) ;
		$('#jobProcessingDialog_'+_pageRef).dialog(dialogOptions)
		$('#jobProcessingDialog_'+_pageRef).dialog('open');
		//$('#messageRowId_'+_pageRef).val(rowId);
	},"html");  
}

//Close Test Message Dialog
function closeJobProcessingDialog()
{
	 $('#jobProcessingDialog_'+_pageRef).dialog('close');	
}

function addJobForMessage()
{
	$("#dataJobDialogGridTbl_Id_"+_pageRef).jqGrid('addInlineRow',{});
}

function deleteJobMessage()
{
	var $table = $("#dataJobDialogGridTbl_Id_" + _pageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	$table.jqGrid('deleteGridRow', selectedRowId);
}