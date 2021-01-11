/**
 * iSO Message sDefinition dbclick from grid confirmation
 * @returns
 */
function iSOMessagesDefinitionList_onDbClickedConform()
{
	var changes = $("#iSOMessagesDefinitionMaintFormId_" + _pageRef).hasChanges();
	var isFormChanged =  $("#isFormChanged_" + _pageRef).val();
	if ((changes == 'true' || changes == true) || isFormChanged === "1")
	{
		_showConfirmMsg(changes_made_confirm_msg, "","iSOMessagesDefinitionList_onDbClickedEvent", "yesNo", '', '', 300, 100);
	}
	else
	{
		iSOMessagesDefinitionList_onDbClickedEvent(true);
	}
}

/**
 * dbclick record on grid
 * 
 * @returns
 */
function iSOMessagesDefinitionList_onDbClickedEvent(yesNo)
{
	if(yesNo)
	{
		var action = jQuery.contextPath
		+ "/path/iSOMessagesDefinition/ISOMessagesDefinitionMaintAction_edit.action";
		var params = {};
		
		var $table = $("#iSOMessagesDefinitionListGridTbl_Id_" + _pageRef);
		var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
		var myObject = $table.jqGrid('getRowData', selectedRowId);
		// get the selected rowId
		var isoMsgDefId = myObject["gtw_ATM_ISO_MSG_DEF.ISO_MSG_DEF_ID"];
		params["criteria.ISOMessagesDefinitionId"] = isoMsgDefId;
		var iv_Crud = returnHtmlEltValue("ivcrud_" + _pageRef);

		params["iv_crud"] = iv_Crud;
		params["_pageRef"] = _pageRef;
		_showProgressBar(true);
		$.post(action, params, function(param)
		{
			_showProgressBar(false);
		
			if (param.indexOf("<script type=") != -1)
			{
				$("#iSOMessagesDefinitionMaintDiv_id_" + _pageRef).show();
				$("#iSOMessagesDefinitionMaintDiv_id_" + _pageRef).html(param);
				// disable the acquirer Id
				showHideSrchGrid('iSOMessagesDefinitionListGridTbl_Id_' + _pageRef);
				
				//Show/Hide according checkbox
				common_onChangeShowHideRow(null,'networkMessage_'+_pageRef, 'networkMessageType', '', false, 'lookup','showHide');
				
				/**
				 * Show Hide the Request and Response fields grid
				 */
				var isCheckedNetworkMsg = $("#networkMessage_"+_pageRef).is(":checked");
				
				if(common_isVariableValueNoEmpty(isCheckedNetworkMsg)  &&  (isCheckedNetworkMsg == true || isCheckedNetworkMsg == "true"))
				{
					$("#requestResponseFldsListInner_"+_pageRef).css("display", "block");
					
				}
				
				//reload the iso request and response fields
				iSOMessagesDefinitionFlds_reloadISOMsgDefFldsGrid();
				
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
 * Conform New Button Click
 * @returns
 */
function iSOMessagesDefinitionList_onNewClickedConform()
{
	var changes = $("#iSOMessagesDefinitionMaintFormId_"+_pageRef).hasChanges();
	var isFormChanged =  $("#isFormChanged_" + _pageRef).val();
	if ((changes == 'true' || changes == true) || isFormChanged === "1")
	{
		_showConfirmMsg(changes_made_confirm_msg, "","iSOMessagesDefinitionList_onNewClicked", "yesNo", '', '', 300, 100);
	}
	else
	{
		// call clear function
		iSOMessagesDefinitionList_onNewClicked(true);
	}
}
/**
 * new button click function
 * 
 * @returns
 */
function iSOMessagesDefinitionList_onNewClicked(yesNo)
{
	if(yesNo)
	{
		// call clear function
		iSOMessagesDefinitionMaint_clear();
	}
}