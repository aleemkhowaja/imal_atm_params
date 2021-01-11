/**
 * Terminal dbclick from grid confirmation
 * @returns
 */
function terminalList_onDbClickedConform()
{
	var changes = $("#terminalMaintFormId_" + _pageRef).hasChanges();
	var isFormChanged =  $("#isFormChanged_" + _pageRef).val();
	if ((changes == 'true' || changes == true) || isFormChanged === "1")
	{
		_showConfirmMsg(changes_made_confirm_msg, "","terminalList_onDbClickedEvent", "yesNo", '', '', 300, 100);
	}
	else
	{
		terminalList_onDbClickedEvent(true);
	}
}

/**
 * dbclick record on grid
 * 
 * @returns
 */
function terminalList_onDbClickedEvent(yesNo)
{
	if(yesNo)
	{
		var action = jQuery.contextPath
		+ "/path/terminal/TerminalMaintAction_edit.action";
		var params = {};
		
		var $table = $("#terminalListGridTbl_Id_" + _pageRef);
		var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
		var myObject = $table.jqGrid('getRowData', selectedRowId);
		// get the selected rowId
		var terminal = myObject["gtw_ATM_TERMINALVO.TERMINAL_ID"];
		params["criteria.terminalId"] = terminal;
		var iv_Crud = returnHtmlEltValue("ivcrud_" + _pageRef);
		// alert(iv_Crud);
		params["iv_crud"] = iv_Crud;
		params["_pageRef"] = _pageRef;
		_showProgressBar(true);
		$.post(action, params, function(param)
		{
			_showProgressBar(false);
		
			if (param.indexOf("<script type=") != -1)
			{
				$("#terminalListMaintDiv_id_" + _pageRef).show();
				$("#terminalListMaintDiv_id_" + _pageRef).html(param);
				// disable the terminal Id
				document.getElementById('terminal_id_' + _pageRef).disabled = true
				showHideSrchGrid('terminalListGridTbl_Id_' + _pageRef);
				
				var terminalType = $("#terminalTypeId_"+_pageRef).val();
				
				if(terminalType == "POS")
				{
					$(".terminalTypePOS_"+_pageRef).attr("style","display:table-row");
					
				}
			}
			else
			{
				var response = jQuery.parseJSON(param);
				_showErrorMsg(response["_error"], response["_msgTitle"], 400, 100);
			}
		}, "html");
	}
}

/**
 * New Button Click Conform
 * @returns
 */
function terminalList_onNewClickedConform()
{
	var changes = $("#terminalMaintFormId_" + _pageRef).hasChanges();
	var isFormChanged =  $("#isFormChanged_" + _pageRef).val();
	if ((changes == 'true' || changes == true) || isFormChanged === "1")
	{
		_showConfirmMsg(changes_made_confirm_msg, "","terminalList_onNewClicked", "yesNo", '', '', 300, 100);
	}
	else
	{
		// call clear function
		terminalList_onNewClicked(true);
	}
}

/**
 * new button click function
 * 
 * @returns
 */
function terminalList_onNewClicked(yesNo)
{
	if(yesNo)
	{
		// call clear function
		terminalMaint_clear();
	}
}