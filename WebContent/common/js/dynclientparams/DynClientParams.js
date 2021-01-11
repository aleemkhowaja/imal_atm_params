function loadDynClientParamsDialog(operation) {

	//Check if the div already exists in HTML documnent, and remove it if exists
	if ($("#dynClientParamsMain")
			&& $("#dynClientParamsMain").attr('id') != undefined) {
		$("#dynClientParamsMain").dialog("destroy");
		$("#dynClientParamsMain").remove();
	}

	var globalCustElemDiv = $("<div id='dynClientParamsMain'></div>");
	globalCustElemDiv.css("padding", "0");
	var theBody = $('body');
	globalCustElemDiv.insertAfter(theBody);
	var dynParams = {
			"dynClientParamsSC.dynCltParOpType" : operation
	};
	var currPageRef, filter = "";

	_showProgressBar(true);

	var saveBtnLbl = saveLabel;
	var approveBtnLbl = grid_approveLabel;
	var closeBtnLbl = signature_close_btn;
	var buttons = {};
	buttons[closeBtnLbl] = function()
	{
		closeDynCltPrmsDialog();
	};
	if (operation == 'A') {
		buttons[approveBtnLbl] = function() {
			dynCltPrmsDataApproveClicked();
		};
	}
	if (operation == 'E') {
		buttons[saveBtnLbl] = function() {
			dynCltPrmsColsSaveClicked();
		};
	}
	var _dialogOptions = {
		modal : true,
		title : dynclientparams_key + " - " + (operation=="A"?grid_approveLabel:grid_editLabel),
		autoOpen : false,
		show : 'slide',
		position : 'center',
		width : returnMaxWidth(965),
		height : returnMaxHeight(700),
        dialogClass: 'no-close',
		closeOnEscape: false,
		close : function() {
			var theDialog = $(this);
			theDialog.remove();
		},
		buttons : buttons
	};
	var _urlSrc = jQuery.contextPath + '/path/dynClientParams/DynClientParamsMaint_loadMainParamScreen'
	$("#dynClientParamsMain").load(_urlSrc, dynParams, function() {
		_showProgressBar(false);
		$("#dynCltParOpType").val(operation);
	if (operation == 'A') {
		$("#deleteAdd_"+_pageRef).val("false");
		}
	});
	$("#dynClientParamsMain").dialog(_dialogOptions);
	$("#dynClientParamsMain").dialog("open");

}

function closeDynCltPrmsDialog(operation) {
	if (operation == 'E' || operation == 'N') {
		if ($("#dynCltPrmsColsForm_Id_" + _pageRef).hasChanges()
				|| $("#dynClientParamsDynamicFormId_" + _pageRef).hasChanges()) {
			_showConfirmMsg(changes_made_confirm_msg, confirm_msg_title,
					function(yesNo) {
						if (yesNo) {
							$("#dynClientParamsMain").dialog("close");
						} else {
							return;
						}
					});
		}
	} else {
		$("#dynClientParamsMain").dialog("close");
	}
}

function dynCltPrmsGroupSelected(groupId, selectBool) {

	if (selectBool == 'true') {
		if (groupId == null || groupId == "" || groupId == undefined) {
			var selectedRowId = $("#dynCltPrmsGroupTbl_Id_" + _pageRef).jqGrid(
					'getGridParam', 'selrow');
			var selectedGroup = $("#dynCltPrmsGroupTbl_Id_" + _pageRef).jqGrid(
					'getRowData', selectedRowId);

			groupId = selectedGroup["GROUP_CODE"];
			var groupDesc = selectedGroup["GROUP_DESC"];
		}
		if (!(groupId == null || groupId == "" || groupId == undefined)) {

			postDataObj = {};

			postDataObj["dynClientParamsSC.groupCode"] = groupId;
			$("#dynCltPrmsTableTbl_Id_" + _pageRef)
					.jqGrid(
							'setGridParam',
							{
								'url' : jQuery.contextPath + '/path/dynClientParams/DynClientParamsMaint_loadGroupTablesGrid',
								postData : postDataObj
							}).trigger("reloadGrid");
		}
		document.getElementById("dynCltPrmsTableDiv_Id_" + _pageRef).style.display = '';
		$("#dynClientParamsDynamicFormId_" + _pageRef).empty();
		divID=$("#dynCltPrmDataListGrid_" + _pageRef);
		if(divID)
		{
			divID.html('');
		}
	}

	else
	{
		var op = $("#dynCltParOpType").val();
		if(op == 'E')
		{
			$theParamsForm = $("#dynCltPrmsColsForm_Id_" + _pageRef);
			divID = $("#dynCltPrmsColsDiv_Id_" + _pageRef);
		}
		else if(op=='N')
		{
			$theParamsForm = $("#dynClientParamsDynamicFormId_" + _pageRef);
			divID = $("#dynClientParamsDynamicFormId_" + _pageRef);
		}
		else
		{
			dynCltPrmsGroupSelected(groupId, 'true');
			return;
		}
		if ($theParamsForm == undefined || $theParamsForm == 'undefined'
				|| $theParamsForm.size() <= 0) {
			dynCltPrmsGroupSelected(groupId, 'true');
		} else {
			var changes = $theParamsForm.hasChanges();
			if (changes == 'true' || changes == true) {
				_showConfirmMsg(changes_made_confirm_msg, confirm_msg_title,
						function(yesNo) {
							if (yesNo) {
								$theParamsForm.empty();
								divID.html('');
								dynCltPrmsGroupSelected(groupId, 'true');
							} else {
								return;
							}
						});
			} else {
				$theParamsForm.empty();
				divID.html('');
				dynCltPrmsGroupSelected(groupId, 'true');
			}
		}
	}
}

function dynCltPrmsTableSelected(selectBool) {
	if (selectBool == 'true') {
	var selectedRowId = $("#dynCltPrmsTableTbl_Id_"+_pageRef).jqGrid('getGridParam',
			'selrow');
	var selectedTable = $("#dynCltPrmsTableTbl_Id_"+_pageRef).jqGrid('getRowData',
			selectedRowId);

	var groupCode = selectedTable["GROUP_CODE"];
	var tableName = selectedTable["TABLE_NAME"];
	var tableDesc = selectedTable["TABLE_DESC"];

	if (!(groupCode == null || groupCode == "" || groupCode == undefined)) {
		var operationType = $("#dynCltParOpType").val();
		
		var dynParams = {
			"dynClientParamsSC.groupCode" : groupCode,
			"dynClientParamsSC.tableName" : tableName,
			"dynClientParamsSC.tableDesc" : tableDesc,
			"dynClientParamsSC.dynCltParOpType" : operationType
		};
		_showProgressBar(true);
		
		// condition to open the Columns Grid or the data grid
		if (operationType == 'E') {
					$.ajax( {
					url : jQuery.contextPath
									+ '/path/dynClientParams/DynClientParamsMaint_loadDynClientColsScreen',
					type : "post",
					dataType : "html",
					data : dynParams,
					success : function(html) 
						{
							_showProgressBar(false);

							$("#dynCltPrmsColsDiv_Id_"+_pageRef).html(html);
							
		$("#dynCltPrmsColsForm_Id_"+_pageRef).processAfterValid("dynCltPrmsColsSaveClicked",[]);
						},
					error : function()
						{
			   				_showProgressBar(false);
					  	}
					});
		} else {
			var _urlSrc = jQuery.contextPath + '/path/dynClientParams/DynClientParamsMaint_loadDynClientScreenData';

			$("#dynCltPrmDataListGrid_"+_pageRef).load(_urlSrc, dynParams, function() {
				_showProgressBar(false);
			});
		}
	}
	$("#dynClientParamsDynamicFormId_"+_pageRef).empty();
	}

	else
	{
		var op = $("#dynCltParOpType").val();
		if(op == 'E')
		{
			$theParamsForm = $("#dynCltPrmsColsForm_Id_" + _pageRef);
			divID = $("#dynCltPrmsColsDiv_Id_" + _pageRef);
		}
		else if(op=='N')
		{
			$theParamsForm = $("#dynClientParamsDynamicFormId_" + _pageRef);
			divID = $("#dynClientParamsDynamicFormId_" + _pageRef);
		}
		else
		{
			dynCltPrmsTableSelected('true');
			return;
		}
		if ($theParamsForm == undefined || $theParamsForm == 'undefined'
				|| $theParamsForm.size() <= 0) {
			dynCltPrmsTableSelected('true');
		} else {
			var changes = $theParamsForm.hasChanges();
			if (changes == 'true' || changes == true) {
				_showConfirmMsg(changes_made_confirm_msg, confirm_msg_title,
						function(yesNo) {
							if (yesNo) {
								$theParamsForm.empty();
								divID.html('');
								dynCltPrmsTableSelected('true');
							} else {
								return;
							}
						});
			} else {
				$theParamsForm.empty();
				divID.html('');
				dynCltPrmsTableSelected('true');
			}
		}
	}
}

function dynCltPrmsDataRowSelected(opType) {
	if ($("#dynCltParOpType").val() != 'A') {
		$("#dynCltParOpType").val(opType);
		
		_showProgressBar(true);

		var selectedRowId = $("#dynCltPrmsTableTbl_Id_"+_pageRef).jqGrid('getGridParam',
				'selrow');
		var selectedTable = $("#dynCltPrmsTableTbl_Id_"+_pageRef).jqGrid('getRowData',
				selectedRowId);

		groupCode = selectedTable["GROUP_CODE"]
		tableName = selectedTable["TABLE_NAME"]

		var rowId = $("#dynCltPrmsDataTbl_Id_"+_pageRef).jqGrid('getGridParam', 'selrow');
		var rowData = $("#dynCltPrmsDataTbl_Id_"+_pageRef).jqGrid('getRowData', rowId);
		var celValue = $("#dynCltPrmsDataTbl_Id_"+_pageRef).jqGrid('getCell', rowId,
				'DYNKEY');

		var dynCltPrmsCustSrc = jQuery.contextPath + '/path/dynClientDynamicParams/DynClientDynamicParamsMaint_execute';

		var dynCltPrmsParams = {
			"dynClientParamsSC.tableName" : tableName,
			"dynClientParamsSC.groupCode" : groupCode,
			"dynClientParamsSC.pkCols" : celValue,
			"dynClientParamsSC.lookupVal" : JSON.stringify(rowData),
			"dynClientParamsSC.dynCltParOpType" : opType
		};
		$.ajax( {
					url : dynCltPrmsCustSrc,
					type : "post",
					dataType : "html",
					data : dynCltPrmsParams,
					success : function(html) 
						{
							_showProgressBar(false);
							$("#dynClientDynamicParamsMapping_"+_pageRef).html(html);
		$("#dynClientParamsDynamicFormId_"+_pageRef).processAfterValid("dynCltPrmsDataSaveClicked",[]);
		$("#auditTrxNbr_"+_pageRef).val($("#dynClientParamsAuditTrxNbr_"+_pageRef).val());
						},
					error : function()
						{
			   				_showProgressBar(false);
					  	}
					});
	}
}

function dynCltPrmsDataRowClicked()
{
	if ($("#dynCltParOpType").val() == 'A') {
		_showProgressBar(true);

		var selectedRowId = $("#dynCltPrmsTableTbl_Id_"+_pageRef).jqGrid('getGridParam',
				'selrow');
		var selectedTable = $("#dynCltPrmsTableTbl_Id_"+_pageRef).jqGrid('getRowData',
				selectedRowId);

		groupCode = selectedTable["GROUP_CODE"]
		tableName = selectedTable["TABLE_NAME"]

		var rowId = $("#dynCltPrmsDataTbl_Id_"+_pageRef).jqGrid('getGridParam', 'selrow');
		var rowData = $("#dynCltPrmsDataTbl_Id_"+_pageRef).jqGrid('getRowData', rowId);
		var celValue = $("#dynCltPrmsDataTbl_Id_"+_pageRef).jqGrid('getCell', rowId,
				'DYNKEY');

		var dynCltPrmsCustSrc = jQuery.contextPath + '/path/dynClientDynamicParams/DynClientDynamicParamsMaint_createAuditKeyRef';
		
		var dynCltPrmsParams = {
			"dynClientParamsSC.tableName" : tableName,
			"dynClientParamsSC.groupCode" : groupCode,
			"dynClientParamsSC.pkCols" : celValue
		};
		$.ajax( {
					url : dynCltPrmsCustSrc,
					type : "post",
					dataType : "html",
					data : dynCltPrmsParams,
					success : function(html) 
						{
							_showProgressBar(false);
							var a = JSON.parse(html);
							$("#auditTrxNbr_"+_pageRef).val(a.dynClientParamsSC.auditCO.auditRefCO.trxNbr);
						},
					error : function()
						{
			   				_showProgressBar(false);
					  	}
					});
		}
}

function dynCltPrmsDataSaveClicked() {
	var changes = $("#dynClientParamsDynamicFormId_"+_pageRef).hasChanges(true);
	_showProgressBar(true);

	if (changes != null && changes != "undefined" && changes) {
		var saveAction = jQuery.contextPath
				+ "/path/dynClientDynamicParams/DynClientDynamicParamsMaint_submitAction";
		$('#dynClientParamsDynamicFormId_'+_pageRef).attr("action", saveAction);

		var input1 = $("<input>").attr("type", "hidden").attr("name",
				"colsNames").val($("#colsNames").val());
		$('#dynClientParamsDynamicFormId_'+_pageRef).append($(input1));

		var input3 = $("<input>").attr("type", "hidden").attr("name",
				"dynCltParOpType").val($("#dynCltParOpType").val());
		$('#dynClientParamsDynamicFormId_'+_pageRef).append($(input3));

		if ($("#dynCltParOpType").val() != "N") {
			var rowId = $("#dynCltPrmsDataTbl_Id_"+_pageRef).jqGrid('getGridParam',
					'selrow');
			var rowData = $("#dynCltPrmsDataTbl_Id_"+_pageRef)
					.jqGrid('getRowData', rowId);
			var dynKeyVal = $("#dynCltPrmsDataTbl_Id_"+_pageRef).jqGrid('getCell', rowId,
					'DYNKEY');

			var input2 = $("<input>").attr("type", "hidden").attr("name",
					"pkCols").val(dynKeyVal);
			$('#dynClientParamsDynamicFormId_'+_pageRef).append($(input2));

			var recStatus = $("#dynCltPrmsDataTbl_Id_"+_pageRef).jqGrid('getCell', rowId,
					'VALUE_CODE');

			var input3 = $("<input>").attr("type", "hidden").attr("name",
					"dynCltRecStatus").val(recStatus);
			$('#dynClientParamsDynamicFormId_'+_pageRef).append($(input3));
		}

		var updates = $("#dynClientParamsDynamicFormId_"+_pageRef).serializeForm();
		$.ajax( {
			url : saveAction,
			type : "post",
			dataType : "json",
			data : updates,
			success : function(data) {
					_showProgressBar(false);
				if (typeof data["_error"] == "undefined"
						|| data["_error"] == null) {
					$("#dynCltPrmsDataTbl_Id_"+_pageRef).trigger("reloadGrid");
					dynCltPrmsDataRowSelected('N');
					_showErrorMsg(record_saved_Successfully_key,
							success_msg_title);
				}
			}
		});
	} else {
		_showProgressBar(false);
	}
}

function dynCltPrmsDataApproveClicked() {
	$("#dynCltParOpType").val('A');

	var saveAction = jQuery.contextPath
			+ "/path/dynClientParams/DynClientParamsMaint_approveAction";

	var selectedRowId = $("#dynCltPrmsTableTbl_Id_"+_pageRef).jqGrid('getGridParam',
			'selrow');
	var selectedTable = $("#dynCltPrmsTableTbl_Id_"+_pageRef).jqGrid('getRowData',
			selectedRowId);

	groupCode = selectedTable["GROUP_CODE"]
	tableName = selectedTable["TABLE_NAME"]

	var rowId = $("#dynCltPrmsDataTbl_Id_"+_pageRef).jqGrid('getGridParam', 'selrow');
	var rowData = $("#dynCltPrmsDataTbl_Id_"+_pageRef).jqGrid('getRowData', rowId);
	var dynKeyVal = $("#dynCltPrmsDataTbl_Id_"+_pageRef).jqGrid('getCell', rowId, 'DYNKEY');
	
	if(dynKeyVal == null  || dynKeyVal == "" || dynKeyVal == undefined )
		{
		_showErrorMsg(msg_noRecordSelectedLabel, warning_msg_title);
		return;
		}
	_showProgressBar(true);
	var approveParams = {
		"dynClientParamsSC.tableName" : tableName,
		"dynClientParamsSC.groupCode" : groupCode,
		"dynClientParamsSC.pkCols" : dynKeyVal
	};
	
	$
			.ajax( {
				url : saveAction,
				type : "post",
				dataType : "json",
				data : approveParams,
				success : function(data) {
					_showProgressBar(false);
					if (typeof data["_error"] == "undefined"
							|| data["_error"] == null) {
						$("#dynCltPrmsDataTbl_Id_"+_pageRef).trigger("reloadGrid");
						_showErrorMsg(record_was_Approved_Successfully_key,
								success_msg_title);
					}
				}
			});
}

function dynCltPrmsDataRowDeleted(opType) {
	
	$("#dynCltParOpType").val(opType);

	var saveAction = jQuery.contextPath
			+ "/path/dynClientParams/DynClientParamsMaint_deletedClientParam";

	var selectedRowId = $("#dynCltPrmsTableTbl_Id_"+_pageRef).jqGrid('getGridParam',
			'selrow');
	var selectedTable = $("#dynCltPrmsTableTbl_Id_"+_pageRef).jqGrid('getRowData',
			selectedRowId);

	groupCode = selectedTable["GROUP_CODE"]
	tableName = selectedTable["TABLE_NAME"]

	var rowId = $("#dynCltPrmsDataTbl_Id_"+_pageRef).jqGrid('getGridParam', 'selrow');
	var rowData = $("#dynCltPrmsDataTbl_Id_"+_pageRef).jqGrid('getRowData', rowId);
	var celValue = $("#dynCltPrmsDataTbl_Id_"+_pageRef)
			.jqGrid('getCell', rowId, 'DYNKEY');

	var approveParams = {
		"dynClientParamsSC.tableName" : tableName,
		"dynClientParamsSC.groupCode" : groupCode,
		"dynClientParamsSC.pkCols" : celValue
	};

	_showConfirmMsg(Confirm_Delete_Process_key, confirm_msg_title, function(
			yesNo) {
		if (yesNo) {
	_showProgressBar(true);
			$.ajax( {
				url : saveAction,
				type : "post",
				dataType : "json",
				data : approveParams,
				success : function(data) {
					_showProgressBar(false);
					if (typeof data["_error"] == "undefined"
							|| data["_error"] == null) {
						$("#dynCltPrmsDataTbl_Id_"+_pageRef).trigger("reloadGrid");
						$("#dynClientParamsDynamicFormId_"+_pageRef).remove();
						_showErrorMsg(record_was_Deleted_Successfully_key,
								success_msg_title);
					}
				}
			});
		} else {
			return;
		}
	});
}

function dynCltPrmsColsTblOnRowSelect()
{
		if ($("#dynCltParOpType").val() == 'E') {
		_showProgressBar(true);

		var selectedRowId = $("#dynCltPrmsTableTbl_Id_"+_pageRef).jqGrid('getGridParam',
				'selrow');
		var selectedTable = $("#dynCltPrmsTableTbl_Id_"+_pageRef).jqGrid('getRowData',
				selectedRowId);

		groupCode = selectedTable["GROUP_CODE"]
		tableName = selectedTable["TABLE_NAME"]

		var rowId = $("#dynCltPrmsColsTbl_Id_"+_pageRef).jqGrid('getGridParam', 'selrow');
		var rowData = $("#dynCltPrmsColsTbl_Id_"+_pageRef).jqGrid('getRowData', rowId);
		
		var find = 'sysDynParamColumns.';
		var re = new RegExp(find, 'g');
		var res = JSON.stringify(rowData).replace(re, '');
		
		var dynCltPrmsCustSrc = jQuery.contextPath + '/path/dynClientParams/DynClientParamsMaint_createColAuditKeyRef';
		
		var dynCltPrmsParams = {
			"dynClientParamsSC.pkCols" : res
		};
		$.ajax( {
					url : dynCltPrmsCustSrc,
					type : "post",
					dataType : "html",
					data : dynCltPrmsParams,
					success : function(html) 
						{
							_showProgressBar(false);
							var a = JSON.parse(html);
							$("#auditTrxNbr_" + _pageRef).val(a.auditTrxNbr);
							//call the type changed function to apply cells conditions
							dynCltControlTypeChanged();
						},
					error : function()
						{
			   				_showProgressBar(false);
					  	}
					});
		}
		generateColTypeList();
}

/**
 * Function getting the Combo list in json format
 * @param zUrl
 * @param zList
 * @param zId
 * @param zValue
 * @return
 */
 function dynClientParamLoadCombo(zUrl, zList, zId, zValue, cols) {
	 
	 var selectedColumnName = "";
	 if(cols == "true")
	 {
			var rowId = $("#dynCltPrmsColsTbl_Id_"+_pageRef).jqGrid('getGridParam', 'selrow');
			var rowData = $("#dynCltPrmsColsTbl_Id_"+_pageRef).jqGrid('getRowData', rowId);
			selectedColumnName = rowData["sysDynParamColumns.COLUMN_NAME"];
		 }	 
	var tableName = $("#tableName").val();
	 	var editOptionsParams = {
		"dynClientParamsSC.tableName" : tableName,
		"dynClientParamsSC.valueField" : selectedColumnName
	};
	var list = "";
	$.ajax( {
		url : zUrl,
		async : false,
		dataType : 'json',
		data : editOptionsParams,
		success : function(data) {
			 data = JSON.parse(JSON.stringify(data[zList]));
             for(var i=0; i<data.length; i++)
              {
                    var key = data[i][zId];
                    if(typeof key == "undefined") //no id for select box
                    	key = "";
                    var value = data[i][zValue]
                    if(i > 0)
                          list += ";" ;
                    list += key + ":" + value;
              }
		}
	});
	return list;
}

function dynCltColumnNameChanged() {
	var theParamsTbl = $("#dynCltPrmsColsTbl_Id_"+_pageRef);
	var selRow = theParamsTbl.jqGrid("getGridParam", 'selrow');
	var selColCode = theParamsTbl.jqGrid('getCell', selRow, 'sysDynParamColumns.COLUMN_NAME');

	var rows = theParamsTbl.jqGrid('getDataIDs');
	var rowsLen = rows.length;

	for (i = 0; i < rowsLen; i++) {
		var myObject = theParamsTbl.jqGrid('getRowData', rows[i]);
		if (rows[i] !== selRow) {
			var rowColCode = myObject["sysDynParamColumns.COLUMN_NAME"];
			// if not the selected row has same value already
			if (rowColCode === selColCode) {
				_showErrorMsg(
						typeof same_column_key_trns != undefined ? same_column_key_trns
								: "Same Column Already Chosen!",
						error_msg_title);
				theParamsTbl.jqGrid('setCellValue', selRow,
						"sysDynParamColumns.COLUMN_NAME", "");
				return;
			}
		}
	}
	theParamsTbl.jqGrid('setCellValue', selRow,
			"sysDynParamColumns.COLUMN_NAME", selColCode);
	theParamsTbl.jqGrid("resetSelection");
	theParamsTbl.jqGrid('setSelection', selRow, true); 
	
	generateColTypeList();
}

function generateColTypeList()
{
	var colsTable = $("#dynCltPrmsColsTbl_Id_"+_pageRef);
	var rowId = colsTable.jqGrid('getGridParam', 'selrow');
	var rowData = colsTable.jqGrid('getRowData', rowId);
	selectedColumnName = rowData["sysDynParamColumns.COLUMN_NAME"];
	
	var tableName = $("#tableName").val();
 	var editOptionsParams = {
	"dynClientParamsSC.tableName" : tableName,
	"dynClientParamsSC.valueField" : selectedColumnName
};

var newOptions = '', row, list = {};

$.ajax( {
	url : jQuery.contextPath +'/path/dynClientParams/DynClientParamsMaint_loadControlTypeSelect',
	async : false,
	dataType : 'json',
	data : editOptionsParams,
	success : function(data) {
		 data = JSON.parse(JSON.stringify(data['controlTypeSelect']));
         for(var i=0; i<data.length; i++)
          {
                var key = data[i]['code'];
                if(typeof key == "undefined") //no id for select box
                	key = "";
                var value = data[i]['descValue']
                list[key] = value;
                newOptions += '<option role="option" value="' + key + '">' +
                value + '</option>';
          }
     	colsTable.jqGrid("setColProp", 'controlDesc', {
            editoptions: {
                value: list
            }
        });
	}
});

	// populate the subset of columns
	var controlTypeVal = colsTable.jqGrid('getCell',rowId,'controlDesc');
	console.log("controlTypeVal: "+controlTypeVal);
	if(controlTypeVal == '-1' && rowId.includes('new')) 
    $("select#" + rowId + "_controlDesc").html(newOptions);
}

function dynCltControlTypeChanged()
{
	var theParamsTbl = $("#dynCltPrmsColsTbl_Id_" + _pageRef);
	var	selRow = theParamsTbl.jqGrid("getGridParam", 'selrow');
	var	selColControl = theParamsTbl.jqGrid('getCell', selRow, 'controlDesc');
	if(!selColControl)
	{
		selColControl = theParamsTbl.jqGrid('getCell', selRow, 'sysDynParamColumns.CONTROL_TYPE');
	}
	
	switch(selColControl) {
    case 'T':
        theParamsTbl.jqGrid('setCellReadOnly', selRow, "sysDynParamColumns.LOOKUP_EXPRESSION",true);
        theParamsTbl.jqGrid('setCellReadOnly', selRow, "sysDynParamColumns.VALUE_FIELD",true);
        theParamsTbl.jqGrid('setCellReadOnly', selRow, "sysDynParamColumns.DISPLAY_FIELD",true);
        theParamsTbl.jqGrid('setCellReadOnly', selRow, "sysDynParamColumns.COMBO_LIST",true);
        break;
    case 'S':
        theParamsTbl.jqGrid('setCellReadOnly', selRow, "sysDynParamColumns.LOOKUP_EXPRESSION",false);
        theParamsTbl.jqGrid('setCellReadOnly', selRow, "sysDynParamColumns.VALUE_FIELD",false);
        theParamsTbl.jqGrid('setCellReadOnly', selRow, "sysDynParamColumns.DISPLAY_FIELD",false);
        theParamsTbl.jqGrid('setCellReadOnly', selRow, "sysDynParamColumns.COMBO_LIST",true);
        
        theParamsTbl.jqGrid("setCellRequired", selRow,"sysDynParamColumns.LOOKUP_EXPRESSION",true);
        theParamsTbl.jqGrid("setCellRequired", selRow,"sysDynParamColumns.VALUE_FIELD",true);
        theParamsTbl.jqGrid("setCellRequired", selRow,"sysDynParamColumns.DISPLAY_FIELD",true);
        break;
    case 'D':
        theParamsTbl.jqGrid('setCellReadOnly', selRow, "sysDynParamColumns.LOOKUP_EXPRESSION",true);
        theParamsTbl.jqGrid('setCellReadOnly', selRow, "sysDynParamColumns.VALUE_FIELD",true);
        theParamsTbl.jqGrid('setCellReadOnly', selRow, "sysDynParamColumns.DISPLAY_FIELD",true);
        theParamsTbl.jqGrid('setCellReadOnly', selRow, "sysDynParamColumns.COMBO_LIST",true);
        break;
    case 'C':
        theParamsTbl.jqGrid('setCellReadOnly', selRow, "sysDynParamColumns.LOOKUP_EXPRESSION",false);
        theParamsTbl.jqGrid('setCellReadOnly', selRow, "sysDynParamColumns.VALUE_FIELD",false);
        theParamsTbl.jqGrid('setCellReadOnly', selRow, "sysDynParamColumns.DISPLAY_FIELD",false);
        theParamsTbl.jqGrid('setCellReadOnly', selRow, "sysDynParamColumns.COMBO_LIST",false);
        
        theParamsTbl.jqGrid("setCellRequired", selRow,"sysDynParamColumns.COMBO_LIST",true);
        break;
    default:
        theParamsTbl.jqGrid('setCellReadOnly', selRow, "sysDynParamColumns.LOOKUP_EXPRESSION",false);
        theParamsTbl.jqGrid('setCellReadOnly', selRow, "sysDynParamColumns.VALUE_FIELD",false);
        theParamsTbl.jqGrid('setCellReadOnly', selRow, "sysDynParamColumns.DISPLAY_FIELD",false);
        theParamsTbl.jqGrid('setCellReadOnly', selRow, "sysDynParamColumns.COMBO_LIST",false);
        break;
}
	theParamsTbl.jqGrid('setCellValue', selRow, "sysDynParamColumns.CONTROL_TYPE", selColControl);
}

function dynCltPrmsColsNewRowClicked() {

	var theParamsTbl = $("#dynCltPrmsColsTbl_Id_"+_pageRef);
	// add new row
	var rId = theParamsTbl.jqGrid('addInlineRow', {});
	theParamsTbl.jqGrid('setCellValue', rId, "sysDynParamColumns.GROUP_CODE", $("#groupCode").val());
	theParamsTbl.jqGrid('setCellValue', rId, "sysDynParamColumns.TABLE_NAME", $("#tableName").val());
}

function dynCltPrmsColsDeleteClicked(rowID) {
	var theParamsTbl = $("#dynCltPrmsColsTbl_Id_"+_pageRef);
	_showConfirmMsg(
			(typeof Confirm_Delete_Process_key != undefined) ? Confirm_Delete_Process_key
					: "Delete Selected Column Details?", confirm_msg_title,
			function(yesNo) {
				if (yesNo) {
					theParamsTbl.jqGrid('deleteGridRow', rowID);
				}
			}, "yesNo");
}

function dynCltPrmsColsSaveClicked() {
	var theParamsTbl = $("#dynCltPrmsColsTbl_Id_" + _pageRef);
	var theParamsForm = $("#dynCltPrmsColsForm_Id_" + _pageRef);
	var changes = theParamsForm.hasChanges(true);
	var checkRequiredCells = theParamsTbl.jqGrid('checkRequiredCells');
	if (checkRequiredCells && (changes == 'true' || changes == true)) {

		var jsonParamsUpdates = theParamsTbl.jqGrid('getChangedTrimRowData',
				false);
		$("#paramsGridUpd_" + _pageRef).val(jsonParamsUpdates);
		var serializedForm = theParamsForm.serializeForm();
		$
				.ajax( {
					url : jQuery.contextPath + '/path/dynClientParams/DynClientParamsMaint_saveColumnsSpecs',
					type : "post",
					dataType : "json",
					data : serializedForm,
					success : function(data) {
						_showProgressBar(false);
						if (typeof data["_error"] == "undefined"
								|| data["_error"] == null) {
							$("#dynCltPrmsColsTbl_Id_" + _pageRef).trigger(
									"reloadGrid");
							_showErrorMsg(record_saved_Successfully_key,
									success_msg_title);
						}
					}
				});
	}
}
function checkDynCltPrmsColsChanges() {

	var theParamsForm = $("#dynCltPrmsColsForm_Id_" + _pageRef);
	if (theParamsForm == undefined || theParamsForm == 'undefined' || theParamsForm.size() <= 0) {
		return 'true';
	} else {
		var changes = theParamsForm.hasChanges(true);
		if (changes == 'true' || changes == true) {
			_showConfirmMsg(changes_made_confirm_msg, confirm_msg_title,
					function(yesNo) {
						if (yesNo) {
							return 'true';
						} else {
							return 'false';
						}
					});
		} else {
			return 'true';
		}
	}
}
function dynCltPrmsFormatComboList(cellValue, options, rowObject) {

	if (cellValue != undefined) {
		var arrOfCell = cellValue.split(",");
		if (arrOfCell.length > 0) {
			for (var i = 0; i < arrOfCell.length; i++)
			{
				var regex = new RegExp(/(([A-Z]|[0-9])[:])(\w+|\W+)([,])?/gi);

				var searchText = arrOfCell[i];
				if ((searchText.length > 0) && !regex.test(searchText)) {
					alert("The syntax must follow this criteria: V:description,V:description... \n"
							+ "(V= value(Alpha/Letter)), i.e. Y:yes_key,N:no_key");

					return "";
				}
			}
			return cellValue;
		}
	}
	return "";
}