function interfaceList_onDbClickedEvent()
{
	var ivCrud = returnHtmlEltValue("iv_crud_" + _pageRef);
	if (ivCrud == 'R')
	{
		var changed = $("#atmInterfaceForm_" + _pageRef).hasChanges();
		var isFormChanged =  $("#isFormChanged_" + _pageRef).val();
		if ((changed == 'true' || changed == true) || isFormChanged === "1")
		{
			_showConfirmMsg(changes_made_confirm_msg, "","interfaceList_DbClicked", "yesNo", '', '', 300, 100);
		}
		else
		{
			interfaceList_DbClicked(true);
		}
	}
	else
	{
		interfaceList_DbClicked(true);
	}
}

function interfaceList_DbClicked(yesNo)
{
	if (yesNo)
	{
		_showProgressBar(true);
		var $table = $("#interfaceListGridTbl_Id_" + _pageRef);
		var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
		var myObject = $table.jqGrid('getRowData', selectedRowId);
		// get the selected rowId
		var intCode = myObject["iso_INTERFACESVO.INTERFACE_CODE"];
		var action = jQuery.contextPath
				+ "/path/atmInterface/ATMInterfaceMaintAction_loadInterfaceDetails.action";
		var params = {};
		params["criteria.interfaceId"] = intCode;
		params["iv_crud"] = $("#iv_crud_" + _pageRef).val();
		params["_pageRef"] = _pageRef;

		$.post(action, params, function(param)
		{
			if (param.indexOf("<script type=") != -1)
			{
				$("#atmInterfaceMaintDiv_id_" + _pageRef).html(param);
				showHideSrchGrid('interfaceListGridTbl_Id_' + _pageRef);
			}
			else
			{
				var response = jQuery.parseJSON(param);
				_showErrorMsg(response["_error"], response["_msgTitle"], 300,
						100);
			}
			
			//hide/show form fields according to interface type
			ATMInterface_interfaceTypeChangeDep();
			
			// Close Progress After Copying all Fields into grid
			// ATMMnt_CopyFields
			 _showProgressBar(false);
		}, "html");
	}
}

function ATMLst_deleteMessage()
{
	var $table = $("#isoMessageListGridTbl_Id_" + _pageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var myObject = $table.jqGrid('getRowData', selectedRowId);
	if (myObject['iso_INT_MSGSVO.REQUEST_MTI'] != null
			&& myObject['iso_INT_MSGSVO.REQUEST_MTI'] != "")
	{
		_showConfirmMsg(Confirm_Delete_Process_key, info_msg_title,
				ATMLst_deleteProcess, {}, '', '', 300, 100);
	}
	else
	{
		$table.jqGrid('deleteGridRow', selectedRowId);
	}
}

function ATMLst_deleteProcess(confirm)
{
	if (confirm)
	{
		var $table = $("#isoMessageListGridTbl_Id_" + _pageRef);
		var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
		$table.jqGrid('deleteGridRow', selectedRowId);
		$("#isoFieldsListGridTbl_Id_" + _pageRef).jqGrid('resetSelection');
	}
}

function ATMLst_NewClickedConform()
{
	var ivCrud = returnHtmlEltValue("iv_crud_" + _pageRef);
	if (ivCrud == 'R')
	{
		var changed = $("#atmInterfaceForm_" + _pageRef).hasChanges();
		if (changed == 'true' || changed == true)
		{
			_showConfirmMsg(changes_made_confirm_msg, "","ATMLst_NewClicked", "yesNo", '', '', 300, 100);
		}
		else
		{
			ATMLst_NewClicked(true);
		}

	}
}

function ATMLst_NewClicked(yesNo)
{
	if (yesNo)
	{
		var ivCrud = returnHtmlEltValue("iv_crud_" + _pageRef);
		_showProgressBar(true);
		var actionSrc = jQuery.contextPath
				+ "/path/atmInterface/ATMInterfaceMaintAction_atmInterfaceEmptyForm.action";
		var params = {};
		params["iv_crud"] = ivCrud;
		params["_pageRef"] = _pageRef;
		$("#atmInterfaceMaintDiv_id_" + _pageRef).load(actionSrc, params,
				function()
				{
					_showProgressBar(false);
				});
	}
}

function ISOMsgLst_addMessage()
{
	$("#isoFieldsListGridTbl_Id_" + _pageRef).jqGrid('resetSelection');
	$("#isoMessageListGridTbl_Id_" + _pageRef).jqGrid('addInlineRow', {});
	
}

function ISOFields_addNew()
{
	$("#isoFieldsMaintGridTbl_Id_" + _pageRef).jqGrid('addInlineRow', {});
}

function ISOFields_addField()
{
	$("#isoFieldsListGridTbl_Id_" + _pageRef).jqGrid('addInlineRow', {});
}

function applyCustomCodeOnGrid(event, data)
{
	var parentRowObj = $("#" + data.id).parents("tr").prev()[0];
	var parentRowId = parentRowObj.id;
	var parentGridIddd = parentRowObj.offsetParent.id;
	var parentGrid = $("#" + parentGridIddd);
	var selectedRow = parentRowId;
	var dynamicIdPathSubGrid = "isoFieldsGridTbl_Id_" + _pageRef + "_"
			+ selectedRow + "_table";
	var dynamicIdPathSubGrid = data.id;
	var grid = $("#" + dynamicIdPathSubGrid);
	$("#" + dynamicIdPathSubGrid + ">gbox_" + dynamicIdPathSubGrid + ">div")
			.attr('parentRow', selectedRow);

	/*
	 * unbind add new row original event inorder to pass parent row object to
	 * the add function
	 */
	var parentRowObjectToPass = $("#" + selectedRow);
	var orgi_AddNewRowSelector = $("#gbox_" + dynamicIdPathSubGrid).find(
			'div.ui-pg-div').find("span.ui-icon-plus").parent("div").parent(
			"td").attr('id');
	var new_AddNewRowSelector = "add_" + dynamicIdPathSubGrid;
	$("#" + new_AddNewRowSelector).unbind();
	$("#" + new_AddNewRowSelector).bind('click', function()
	{
		addHashMapSubGridRows(parentRowObjectToPass[0]);
	});
	/*
	 * unbind Delete row original event inorder to pass parent row object to the
	 * add function
	 */
	var del_DelRowSelector = "del_" + dynamicIdPathSubGrid;
	$("#" + del_DelRowSelector).unbind();
	$("#" + del_DelRowSelector).bind('click', function()
	{
		delSubGridRows(parentRowObjectToPass[0]);
	});
	$("#gbox_" + dynamicIdPathSubGrid).find('div.ui-pg-div').find(
			"span.ui-icon-plus").attr('id', selectedRow + "_HashMap_Span");
	$("#gbox_" + dynamicIdPathSubGrid).find('div.ui-pg-div').find(
			"span.ui-icon-plus").attr('parentRow', selectedRow);
}

function addHashMapSubGridRows(parentRowObj)
{
	var parentRowId = parentRowObj.id;
	var parentGrid = $("#isoFieldsGridTbl_Id_"+_pageRef);
	try
	{
		var dynamicIdPathSubGrid = "isoFieldsGridTbl_Id_" + _pageRef + "_"+ parentRowId + "_table";
		var parnetRowObject = parentGrid.jqGrid('getRowData', parentRowId);
		var parentFieldNo = parnetRowObject["iso_INT_FLDSVO.FIELD_CODE"];
		var parentFieldCODE = parnetRowObject["iso_INT_FLDSVO.ATM_ISO_FLDS_CODE"];
		
		var subGrid = $("#" + dynamicIdPathSubGrid);
		var row = {};
		row['sub_FLDSVO.SUB_FIELD_CODE'] = parentFieldNo;
		row['sub_FLDSVO.ATM_ISO_FLDS_CODE'] = parentFieldCODE;
		row['STATUS'] = 'A';
		subGrid.jqGrid('addInlineRow', row);
	}
	catch (err)
	{
		console.log("error adding row");
	}
}

function delSubGridRows(parentRowObj)
{
	var parentRowId = parentRowObj.id;
	try
	{
		var dynamicIdPathSubGrid = "isoFieldsGridTbl_Id_" + _pageRef + "_"
				+ parentRowId + "_table";
		var subGrid = $("#" + dynamicIdPathSubGrid);
		var selectedRowId = subGrid.jqGrid('getGridParam', 'selrow');
		var selectedRowObject = subGrid.jqGrid('getRowData', selectedRowId);
		// hide row
		if (selectedRowObject['sub_FLDSVO.ATM_ISO_SUB_FLDS_CODE'] != null
				&& selectedRowObject['sub_FLDSVO.ATM_ISO_SUB_FLDS_CODE'] != '')
		{
			subGrid.jqGrid('setCellValue', selectedRowId, "STATUS", 'D');
			$("#" + dynamicIdPathSubGrid).find('#' + selectedRowId).hide();
		}
		else
		{
			subGrid.jqGrid('deleteGridRow', $('#' + dynamicIdPathSubGrid).find(
					'#' + selectedRowId));
		}
	}
	catch (err)
	{
		console.log("error Deleting row");
	}
}

function sendExtraParams(postData)
{
	postData["criteria.fieldCode"] = $("#" + postData._parentTableId).jqGrid(
			"getCell", postData._parentRowId, "iso_INT_FLDSVO.ATM_ISO_FLDS_CODE");
	postData["criteria.interfaceId"] = $("#isoInterfaceCode_" + _pageRef).val();
	postData["iv_crud"] = returnHtmlEltValue("iv_crud_" + _pageRef);
	postData["criteria.pageRef"] = _pageRef;
	return postData;
}

function initSubgridData()
{
	var subGridsData = [];
	var rowids = $("#isoFieldsGridTbl_Id_" + _pageRef).jqGrid('getDataIDs');
	for (var i = 0; i < rowids.length; i++)
	{
		var subgridId = "isoFieldsGridTbl_Id_" + _pageRef + "_" + rowids[i]
				+ "_table".replace(/[^a-z0-9_]/gi, "__");
		var subGridRows = $("#" + subgridId).jqGrid('getAllRows');
		
		subGridsData[rowids[i]] = subGridRows;
	}
	
	var filtered = subGridsData.filter(function (el) {
		  return el != "" || el != null || typeof el != "undefined";
		});
	
	$("#subFieldsGridData_" + _pageRef).val(filtered + "")
}

function enableDisableCheck()
{
	var $table = $("#isoFieldsGridTbl_Id_" + _pageRef);
	var rowId = $table.jqGrid('getGridParam', 'selrow');
	var myObject = $("#isoFieldsGridTbl_Id_" + _pageRef).jqGrid('getRowData',
			rowId);
	if (myObject['iso_INT_FLDSVO.FIELD_TYPE'] == 'N')
	{
		$("#isoFieldsGridTbl_Id_" + _pageRef).jqGrid("setCellReadOnly", rowId,
				"IS_DECIMAL_YN", false);
	}
	else if (myObject['iso_INT_FLDSVO.FIELD_TYPE'] == 'V')
	{
		$("#isoFieldsGridTbl_Id_" + _pageRef).jqGrid("setCellReadOnly", rowId,
				"IS_DECIMAL_YN", true);
		$("#isoFieldsGridTbl_Id_" + _pageRef).jqGrid("setCellValue", rowId,
				"IS_DECIMAL_YN", false);
	}
	else
	{
		$("#isoFieldsGridTbl_Id_" + _pageRef).jqGrid("setCellReadOnly", rowId,
				"IS_DECIMAL_YN", true);
		$("#isoFieldsGridTbl_Id_" + _pageRef).jqGrid("setCellValue", rowId,
				"IS_DECIMAL_YN", false);
	}
	ATMMnt_CopyFields();
}

function ATMIntLst_onStatusClicked()
{
	var isoInterfaceCode = $("#isoInterfaceCode_" + _pageRef).val();
	if (isoInterfaceCode == "")
		return;

	var loadSrc = jQuery.contextPath
			+ "/path/atmInterface/ATMInterfaceStatusAction_search.action?interfaceId="
			+ isoInterfaceCode + "&_pageRef=" + _pageRef;
	var theFormId = "atmInterfaceForm_" + _pageRef;
	showStatus(theFormId, _pageRef, loadSrc, {});
}