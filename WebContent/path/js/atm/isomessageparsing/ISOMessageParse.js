/**
 * validate before parse or run ISO Message
 * @returns
 */
function ISOMessageParse_beforeParseAndRunValidation()
{
	var isoInterfaceCode = $("#lookuptxt_atm_interface_"+_pageRef).val();
	//var messageId  = $("#lookuptxt_mti_"+_pageRef).val();
	
	if(isoInterfaceCode == null || isoInterfaceCode == "")
	{
		_showProgressBar(false);
		_showErrorMsg(please_select_atm_interface_key, error_msg_title, 300,100);
 		return false;
	}
	return true;
	/*else if(messageId == null || messageId == "")
	{
		_showProgressBar(false);
		_showErrorMsg(please_select_mti_key, error_msg_title, 300,100);
 		return;
	}*/
}


/**
 * load Sub Grid
 * @returns
 */
function ISOMessageParse_loadMessageValuesForInnerFields()
{
	var $table = $("#requestIsoMessageGridTbl_Id_" + _pageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var parentRow = $table.jqGrid('getRowData', selectedRowId);
	if(parentRow!=null)
    {
    	var subGridData = parentRow['subGridData'];
    	var dynamicIdPathSubGrid = "requestIsoMessageGridTbl_Id_"+_pageRef+"_"+selectedRowId+"_table";	
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


/**
 * Parse and Run the Request ISO Messge
 * @returns
 */
function ISOMessageParse_parseAndRunISOMessage(isRun)
{
	/**
	 * validate before parse or run ISO Message
	 */
	var isFormvalid = ISOMessageParse_beforeParseAndRunValidation();
	var isoMessage = $('#requestIsoMessage_'+_pageRef).val();
	var isoInterfaceCode = $("#lookuptxt_atm_interface_"+_pageRef).val();
	
	if(isFormvalid)
	{
		//If Message is not Empty
		if(isoMessage != null && isoMessage != "")
		{
			var reloadParams = {};
			reloadParams["isoMessageParseSC.isoMessage"] 	= isoMessage;
			reloadParams["isoMessageParseSC.isRun"] 	    = isRun;
			reloadParams["isoMessageParseSC.interfaceId"]	= isoInterfaceCode;
			reloadParams["_pageRef"] = _pageRef;
			var actionUrl = jQuery.contextPath+ "/path/iSOMessageParse/ISOMessageParseAction_parseAndRunISOMessage.action";
			
			_showProgressBar(true);
			$.ajax({
				url : actionUrl,
				type : "post",
				data : reloadParams,
				success : function(data)
				{
					var gridId = "";
					
					if(isRun || isRun == "true")
					{
						gridId = "responseIsoMessageGridTbl_Id";
						
						//set response message
						$("#responseIsoMessage_"+_pageRef).val(data.isoMessageParseCO.responseISOMessage);
					}
					else
					{
						gridId = "requestIsoMessageGridTbl_Id";
					}
					//$("#acquirerListMaintDiv_id_" + _pageRef).html(data);
					ISOMessageParse_fillGrid(gridId, data);
					_showProgressBar(false);
				}

			});
		}//Close Check empty message
		else
		{
			_showErrorMsg(request_iso_meesage_required_for_parsing_key, error_msg_title, 300,100);
	 		return;
		}
		
	}//close Else
}


/**
 * fill the response grid
 * @param data
 * @returns
 */
function ISOMessageParse_fillGrid(gridId , data)
{
	var isoFields = data.isoMessageParseCO.responseISOFields;
	
	for (i = 0; i < isoFields.length; i++)
	{
		$("#"+gridId+"_"+_pageRef).jqGrid('addRowData', i,isoFields[i]);
	}
	
	/**
	 * remove the green shade from jqgrid rows
	 */
	$('td').removeClass("path-subgrd-hdr");
}