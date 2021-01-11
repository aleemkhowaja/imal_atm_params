/**
 * Acquirer dbclick from grid confirmation
 * @returns
 */
function acquirerList_onDbClickedConform()
{
	var changes = $("#acquirerMaintFormId_" + _pageRef).hasChanges();
	var isFormChanged =  $("#isFormChanged_" + _pageRef).val();
	if ((changes == 'true' || changes == true) || isFormChanged === "1")
	{
		_showConfirmMsg(changes_made_confirm_msg, "","acquirerList_onDbClickedEvent", "yesNo", '', '', 300, 100);
	}
	else
	{
		acquirerList_onDbClickedEvent(true);
	}
}

/**
 * dbclick record on grid
 * 
 * @returns
 */
function acquirerList_onDbClickedEvent(yesNo)
{
	if(yesNo)
	{
		var action = jQuery.contextPath
		+ "/path/acquirer/AcquirerMaintAction_edit.action";
		var params = {};
		
		var $table = $("#acquirerListGridTbl_Id_" + _pageRef);
		var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
		var myObject = $table.jqGrid('getRowData', selectedRowId);
		// get the selected rowId
		var acquirer = myObject["gtw_ATM_ACQUIRER.ACQUIRER_ID"];
		params["criteria.acquirerCode"] = acquirer;
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
				$("#acquirerListMaintDiv_id_" + _pageRef).show();
				$("#acquirerListMaintDiv_id_" + _pageRef).html(param);
				// disable the acquirer Id
				showHideSrchGrid('acquirerListGridTbl_Id_' + _pageRef);
				
				common_onChangeShowHideRow(null, 'bankATM_'+_pageRef, 'branch_taller', '', false, 'lookup');
				
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
function acquirerList_onNewClickedConform()
{
	var changes = $("#acquirerMaintFormId_" + _pageRef).hasChanges();
	var isFormChanged =  $("#isFormChanged_" + _pageRef).val();
	if ((changes == 'true' || changes == true) || isFormChanged === "1")
	{
		_showConfirmMsg(changes_made_confirm_msg, "","acquirerList_onNewClicked", "yesNo", '', '', 300, 100);
	}
	else
	{
		// call clear function
		acquirerList_onNewClicked(true);
	}
}
/**
 * new button click function
 * 
 * @returns
 */
function acquirerList_onNewClicked(yesNo)
{
	if(yesNo)
	{
		// call clear function
		acquirerMaint_clear();
	}
}

/**
 * Add trx type row
 * @param id
 * @returns
 */
function acquirerList_addTrxTypeRow(id)
{
	var isExistTrxTypesExpression = acquirerMaint_validateTrxExpression();
	if(!isExistTrxTypesExpression)
	{
		return;
	}
	 $("#isFormChanged_" + _pageRef).val("1");
	common_addRow(id);
	
}