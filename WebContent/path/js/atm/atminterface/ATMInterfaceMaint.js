function AtmIntMaint_onDeleteClicked()
{
	$("#saveRecord_" + _pageRef).val(1);
	_showConfirmMsg(Confirm_Delete_Process_key, info_msg_title,
			"AtmIntMaint_handleDeleteProcess", {}, '', '', 300, 100);
}

function AtmIntMaint_handleDeleteProcess(confirm)
{
	if (confirm)
	{
		_showProgressBar(true);
		var form = $("#atmInterfaceForm_" + _pageRef).serializeForm();
		var actionUrl = jQuery.contextPath
				+ "/path/atmInterface/ATMInterfaceMaintAction_deleteForm.action";

		$.ajax({
			url : actionUrl,
			type : "post",
			dataType : "json",
			data : form,

			success : function(data)
			{
				if (data["_error"] == null || data["_error"] == "undefined")
				{
					$("#interfaceListGridTbl_Id_" + _pageRef).trigger(
							"reloadGrid");
					$("#atmInterfaceMaintDiv_id_" + _pageRef).html("");
					ATMMnt_InterfaceEmptyForm();

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
	$("#saveRecord_" + _pageRef).val(0);
}

function AtmIntMaint_processApprove()
{
	$("#saveRecord_" + _pageRef).val(1);
	_showConfirmMsg(Confirm_Approve_Process_key, info_msg_title,
			"AtmIntMaint_handleStatusProcess", {
				isReject : false,
				mode : 'P',
				infoMessageDet : record_was_Approved_Successfully_key
			}, '', '', 300, 100);
}

function AtmIntMaint_processSuspend()
{
	$("#saveRecord_" + _pageRef).val(1);
	_showConfirmMsg(Confirm_Suspend_Process_key, info_msg_title,
			"AtmIntMaint_handleStatusProcess", {
				isReject : true,
				mode : 'S',
				infoMessageDet : record_was_Suspended_Successfully_key
			}, '', '', 300, 100);
}

function AtmIntMaint_processReactivate()
{
	$("#saveRecord_" + _pageRef).val(1);
	_showConfirmMsg(Confirm_Reactivate_Process_key, info_msg_title,
			"AtmIntMaint_handleStatusProcess", {
				isReject : true,
				mode : 'RA',
				infoMessageDet : record_reactivated_successfully_key
			}, '', '', 300, 100);
}

function AtmIntMaint_handleStatusProcess(confirm, args)
{
	if (confirm)
	{

		var reject = args.isReject;
		var mode = args.mode;
		$("#crudMode_" + _pageRef).val(mode);
		_showProgressBar(true);
		var form = $("#atmInterfaceForm_" + _pageRef).serializeForm();

		var actionUrl = jQuery.contextPath
				+ "/path/atmInterface/ATMInterfaceMaintAction_handleStatusProcess.action";

		$.ajax({
					url : actionUrl,
					type : "post",
					dataType : "json",
					data : form,
					success : function(data)
					{
						if (data["_error"] == null
								|| data["_error"] == "undefined")
						{
							$("#interfaceListGridTbl_Id_" + _pageRef).trigger(
									"reloadGrid");

							showHideSrchGrid('interfaceListGridTbl_Id_'
									+ _pageRef);
							$("#atmInterfaceMaintDiv_id_" + _pageRef).html("");

							_showProgressBar(false);
							if (mode == 'P')
							{
								// reload the left menu
								//accordionReloadMenuItem('ROOT');
							}
							_showErrorMsg(args.infoMessageDet, info_msg_title,
									300, 100);

						}
						else
						{
							_showProgressBar(false);
						}
					}
				});
	}
}

function ATMMnt_CopyFields()
{
	_showProgressBar(true);
	var rows = $("#isoFieldsGridTbl_Id_" + _pageRef).jqGrid('getAllRows');
	$('#isoFieldsGridData_' + _pageRef).val(rows);

	var localJson = $('#isoFieldsGridData_' + _pageRef); // json from hidden
	// field
	var jsonSaved = "";

	if (typeof localJson != "undefined" && localJson.val() != "")
	{
		var newRow = null;
		jQuery('#isoFieldsListGridTbl_Id_' + _pageRef).jqGrid('clearGridData');
		jQuery('#isoResponseFieldsListGridTbl_Id_' + _pageRef).jqGrid(
				'clearGridData');
		var AllRows = localJson.val();
		var AllRowsArray = JSON.parse(AllRows)["root"];
		for (var i = 0; i < AllRowsArray.length; i++)
		{
			newRow = {};
			obj = AllRowsArray[i];
			newRow['iso_INT_FLDSVO.FIELD_CODE'] = obj['iso_INT_FLDSVO.FIELD_CODE'];
			newRow['iso_INT_FLDSVO.FIELD_NAME'] = obj['iso_INT_FLDSVO.FIELD_NAME'];
			newRow['iso_INT_FLDSVO.FIXED_LENGTH'] = obj['iso_INT_FLDSVO.FIXED_LENGTH'];
			newRow['iso_INT_FLDSVO.DYNAMIC_LENGTH'] = obj['iso_INT_FLDSVO.DYNAMIC_LENGTH'];
			newRow['iso_INT_FLDSVO.PARTIAL_MASK'] = obj['iso_INT_FLDSVO.PARTIAL_MASK'];
			newRow['iso_INT_FLDSVO.TOTAL_MASK_YN'] = obj['iso_INT_FLDSVO.TOTAL_MASK_YN'];
			newRow['iso_INT_FLDSVO.EXPRESSION'] = obj['iso_INT_FLDSVO.EXPRESSION'];
			newRow['iso_INT_FLDSVO.FIELD_TYPE'] = obj['iso_INT_FLDSVO.FIELD_TYPE'];
			newRow['iso_INT_FLDSVO.IS_DECIMAL_YN'] = obj['iso_INT_FLDSVO.IS_DECIMAL_YN'];
			$("#isoFieldsListGridTbl_Id_" + _pageRef).jqGrid('addRowData',
					obj['iso_INT_FLDSVO.FIELD_CODE'], newRow);
			$("#isoResponseFieldsListGridTbl_Id_" + _pageRef).jqGrid(
					'addRowData', obj['iso_INT_FLDSVO.FIELD_CODE'], newRow);

		}
	}
	ATMMnt_chechUncheckAfterLoad();
	ATMMnt_chechUncheckResponseAfterLoad();
	// Close Progress which is started by Grid DBClick
	_showProgressBar(false);
}

/***
 * validate the request and response fields
 * @returns
 */
function AtmIntMaint_validateMTIRequestResponseFields()
{
	var mtiGridIDs = $("#isoMessageListGridTbl_Id_" + _pageRef).jqGrid('getDataIDs');
	var mtiGridTotalRows = mtiGridIDs.length;
	var isRequestResponseFilled = true;
	//iterate over grid rows
	for (var i = 0; i < mtiGridTotalRows; i++) 
	{
		var mtiGridObject = $("#isoMessageListGridTbl_Id_" + _pageRef).jqGrid('getRowData', mtiGridIDs[i]);
		
		var requestPrimaryBitMap = mtiGridObject["iso_INT_MSGSVO.REQUEST_BITMAP1"];
		var requestSecondaryBitMap = mtiGridObject["iso_INT_MSGSVO.REQUEST_BITMAP2"];
		
		var responsePrimaryBitMap = mtiGridObject["iso_INT_MSGSVO.RESPONSE_BITMAP1"];
		var responseSecondaryBitMap = mtiGridObject["iso_INT_MSGSVO.RESPONSE_BITMAP2"];
		
		if(( (common_isVariableValueNoEmpty(requestPrimaryBitMap)    ||  requestPrimaryBitMap     ==  "0000000000000000") 
		  && (common_isVariableValueNoEmpty(requestSecondaryBitMap)  ||  requestSecondaryBitMap   ==  "0000000000000000")))
		{
			
			if(((!common_isVariableValueNoEmpty(responsePrimaryBitMap) ||  responsePrimaryBitMap    ==  "0000000000000000") 
					&& (!common_isVariableValueNoEmpty(responseSecondaryBitMap) ||  responseSecondaryBitMap  ==  "0000000000000000" )))
			{
				isRequestResponseFilled = false;
				return
			}
		}
		else
		{
			isRequestResponseFilled = false;
			return
		}
	}
	return isRequestResponseFilled;
}


function ATMMnt_saveInterface()
{
	if ($("#saveRecord_" + _pageRef).val() == 0)
	{
		var changes = $("#atmInterfaceForm_" + _pageRef).hasChanges();
		var isFormChanged =  $("#isFormChanged_" + _pageRef).val();
		if ((changes == 'true' || changes == true) || isFormChanged === "1")
		{
			var isoMessageGridData = $("#isoMessageListGridTbl_Id_" + _pageRef)
					.jqGrid('getChangedRowData');

			//validate the request and response fields
			var isRequestResponseFilled = AtmIntMaint_validateMTIRequestResponseFields();
			if(!isRequestResponseFilled)
			{
				_showErrorMsg(please_select_request_response_fields_of_all_mti_key,info_msg_title, 400, 100);
				return false;
			}
			
			var isoFieldsGridData = $("#isoFieldsGridTbl_Id_" + _pageRef).jqGrid(
					'getAllRows');

			var ivCrud = returnHtmlEltValue("iv_crud_" + _pageRef);

			$("#isoMessageGridData_" + _pageRef).val(isoMessageGridData);
			$("#isoFieldsGridData_" + _pageRef).val(isoFieldsGridData);
			initSubgridData();
			_showProgressBar(true);

			// save /update
			var url = jQuery.contextPath
					+ "/path/atmInterface/ATMInterfaceMaintAction_saveInterface";
			var myObject = $("#atmInterfaceForm_" + _pageRef).serializeForm();
				$.ajax({
				url : url,
				type : "post",
				dataType : "json",
				data : myObject,
				success : function(data)
				{
					if (data["_error"] == null || data["_error"] == "undefined")
					{
						$("#interfaceListGridTbl_Id_" + _pageRef).trigger(
							"reloadGrid");
						showHideSrchGrid('interfaceListGridTbl_Id_' + _pageRef);
						if (ivCrud == 'UP')
						{
							// reload the left menu
							//accordionReloadMenuItem('ROOT');
							$("#atmInterfaceMaintDiv_id_" + _pageRef).html("");
						}
						else
						{
							ATMMnt_InterfaceEmptyForm();
						}
						_showErrorMsg(record_saved_Successfully_key,
								info_msg_title, 300, 100);
						_showProgressBar(false);
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
}

function ATMMnt_InterfaceEmptyForm()
{
	var reloadUrl = jQuery.contextPath
			+ "/path/atmInterface/ATMInterfaceMaintAction_atmInterfaceEmptyForm.action";
	var ivCrud = returnHtmlEltValue("iv_crud_" + _pageRef);
	var reloadParams = {};
	reloadParams["iv_crud"] = ivCrud;
	reloadParams["_pageRef"] = _pageRef;

	$.post(reloadUrl, reloadParams, function(param)
	{
		$("#atmInterfaceMaintDiv_id_" + _pageRef).html(param);
	}, "html");
}

function openATM_InterfaceExpressionDialog(rowId, columnName, gridId)
{

	var expressionDialog = $("<div id='expressionDialog_" + _pageRef
			+ "' class='path-common-sceen'></div>");
	expressionDialog.css("padding", "0");
	expressionDialog.insertAfter($('body'));

	var params = {};
	params["_pageRef"] = _pageRef;
	var rowData = $("#isoFieldsGridTbl_Id_" + _pageRef).jqGrid('getRowData',
			rowId);
	var dialogUrl = jQuery.contextPath
			+ "/path/atmInterface/ATMInterfaceMaintAction_openFormateExpressionDialog"
	var dialogOptions = {
		autoOpen : false,
		height : 460,
		title : expression_details_key,
		width : 600,
		modal : true,
		close : function(event, ui)
		{
			closeATM_InterfaceDialog
		},

		buttons : {
			OK : function()
			{
				var theDialog = $(this);
				saveATM_InterfaceConstr(theDialog, columnName, gridId);
			},
			Cancel : function()
			{
				var theDialog = $(this);
				closeATM_InterfaceDialog(theDialog);
			}

		},
		position : 'center',

	/*
	 * buttons: [{ text : ok_label_trans,click : saveATM_InterfaceConstr}, {
	 * text : cancel_label_trans, click : closeATM_InterfaceDialog}]
	 */
	}

	$('#expressionDialog_' + _pageRef).load(
			dialogUrl,
			{
				_pageRef : _pageRef
			},
			function()
			{
				$("#rowId_" + _pageRef).val(rowId);
				var cellData = "";
				// populate data in form dialog
				if (columnName == 'EXPRESSION_DETAILS')
				{
					cellData = $("#" + gridId).jqGrid("getCell", rowId,
							'iso_INT_FLDSVO.EXPRESSION');
				}
				else if (columnName == 'SUB_EXPRESSION_DETAILS')
				{
					cellData = $("#" + gridId).jqGrid("getCell", rowId,
							'sub_FLDSVO.EXPRESSION');
				}
				else if (columnName == 'ISO_MSG_EXPRESSION_DETAILS')
				{
					cellData = $("#" + gridId).jqGrid("getCell", rowId,
							'iso_INT_MSGSVO.RESPONSE_EXPRESSION');
				}

				if (cellData != null && cellData != "")
				{
					$("#comparisonId_" + _pageRef).val(cellData);
				}

				$('#expressionDialog_' + _pageRef).dialog(dialogOptions);
				$('#expressionDialog_' + _pageRef).dialog('open');
				ATMInterface_compShowHideData();

			});

	/*
	 * $.post(dialogUrl ,params , function( param ) {
	 * $('#fieldFormatDialog_'+_pageRef).html(param) ;
	 * $('#fieldFormatDialog_'+_pageRef).dialog(dialogOptions)
	 * $('#fieldFormatDialog_'+_pageRef).dialog('open');
	 * $("#rowId_"+_pageRef).val(rowId); //populate data in form dialog
	 * if(cellData != null && cellData != "") {
	 * $("#comparisonId_"+_pageRef).val(cellData); }
	 * ATMInterface_compShowHideData(); },"html");
	 */
}

function saveATM_InterfaceConstr(theDialog, columnName, gridId)
{
	var params = "";
	params += $("#comparisonId_" + _pageRef).val();
	params["rowId"] = $("#rowId_" + _pageRef).val();
	var rowId = $("#rowId_" + _pageRef).val();
	if (columnName == 'EXPRESSION_DETAILS')
	{
		$("#" + gridId).jqGrid('setCellValue', rowId,
				'iso_INT_FLDSVO.EXPRESSION', params);
	}
	else if (columnName == 'SUB_EXPRESSION_DETAILS')
	{
		$("#" + gridId).jqGrid('setCellValue', rowId, 'sub_FLDSVO.EXPRESSION',
				params);
	}
	else if (columnName == 'ISO_MSG_EXPRESSION_DETAILS')
	{
		$("#" + gridId).jqGrid('setCellValue', rowId,
				'iso_INT_MSGSVO.RESPONSE_EXPRESSION', params);
	}

	var interfaceCode = $("#atm_code_" + _pageRef).val();
	if (typeof interfaceCode != "undefined" && interfaceCode != "")
	{
		ATMInterface_setChangedRow(gridId, rowId);
	}

	theDialog.dialog("destroy");
	theDialog.remove();
	ATMMnt_CopyFields();
}

function ATMInterface_setChangedRow(gridId, rowId)
{
	$("#" + gridId).find("#" + rowId).attr("changed", "1");
}

function closeATM_InterfaceDialog(theDialog)
{
	theDialog.dialog("destroy");
	theDialog.remove();
}

function ATMInterface_compShowHideData()
{
	params = {};
	params["_pageRef"] = _pageRef;
	var url = jQuery.contextPath
			+ "/path/atmInterface/ATMInterfaceMaintAction_retAutoCompleteData";
	$.ajax({
		url : url,
		type : "post",
		dataType : "json",
		data : params,
		success : function(param)
		{
			var expression_comparison = (param["updates1"]).split(";");
			common_autoCompleteConstraints("comparisonId_" + _pageRef,
					expression_comparison);
			// Show Data elements into Dialog grid
			var gridData = $("#isoFieldsGridTbl_Id_" + _pageRef).jqGrid(
					'getAllRows');
			showDataElementsInDialog(gridData);
		}
	});
}

function showDataElementsInDialog()
{
	var data = $("#isoFieldsGridTbl_Id_" + _pageRef).jqGrid('getAllRows');
	
	if (typeof data != "undefined" && data != "" && data.length > 0)
	{
		var obj, newRow;
		var AllRowsArray = JSON.parse(data)["root"];
		var i = 0;
		for (i = 0; i < AllRowsArray.length; i++)
		{
			newRow = {};
			obj = AllRowsArray[i];
			newRow['parameterName'] = obj['iso_INT_FLDSVO.FIELD_CODE'] + " - "
					+ obj['iso_INT_FLDSVO.FIELD_NAME'];
			newRow['parameterValue'] = "[ISO"+ obj['iso_INT_FLDSVO.FIELD_CODE']+"]";
			$("#dialogGridTbl_Id_" + _pageRef).jqGrid('addRowData', i,
					newRow);
		}
		var columnName = $("#dialogOpenFromGridRowColumn_"+_pageRef).val();
		if(columnName != "iso_INT_MSGSVO.RESPONSE_EXPRESSION")
		{
			var globalVariables = {};
			globalVariables['parameterName'] = "MTI Code";
			globalVariables['parameterValue'] = "[MTICODE]";
			$("#dialogGridTbl_Id_" + _pageRef).jqGrid('addRowData', ++i, globalVariables);
		}
	}
}

function elementDialogGridClicked()
{
	var ivCrud = $("#iv_crud_" + _pageRef).val();
	var status = $("#statusId_" + _pageRef).val();
	if ((ivCrud == 'R' && (status == 'A' || status == null || status == ""))
			|| (ivCrud == 'UP' && status == 'P'))
	{
		var $table = $("#dataElementsGridTbl_Id_" + _pageRef);
		var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
		var myObject = $table.jqGrid('getRowData', selectedRowId);
		// get the selected rowId
		var dataElement = myObject["DATA_ELEMENT"];
		var ele = dataElement.split(' -')[0];
		var pos = $('#comparisonId_' + _pageRef).getCursorPosition();

		var previousTxt = $('#comparisonId_' + _pageRef).val();
		var position = 6;
		var output = [ previousTxt.slice(0, pos), "<DE" + ele + ">",
				previousTxt.slice(pos) ].join('');

		$('#comparisonId_' + _pageRef).val(output);
	}
}

function ATMMnt_CheckLengthLimit(event, data)
{
	var subGridId = $(data).parents('table').attr('id');
	var mainRowId = subGridId.split("isoFieldsGridTbl_Id_" + _pageRef + "_")[1]
			.split('_table')[0];
	var mainRowObject = $("#isoFieldsGridTbl_Id_" + _pageRef).jqGrid(
			'getRowData', mainRowId);
	var mainFieldLength = mainRowObject["iso_INT_FLDSVO.FIXED_LENGTH"];
	var isMainFieldDynamicLength = mainRowObject["iso_INT_FLDSVO.DYNAMIC_LENGTH"];

	var rowids = $("#" + subGridId).jqGrid('getDataIDs');
	var subGridRowObject = null;
	var subLengthTotal = Number(0);
	for (var i = 0; i < rowids.length; i++)
	{
		subGridRowObject = $("#" + subGridId).jqGrid('getRowData', rowids[i]);
		subLengthTotal += Number(subGridRowObject['sub_FLDSVO.FIXED_LENGTH'])
	}

	if ((isMainFieldDynamicLength == null || isMainFieldDynamicLength == "")
			&& subLengthTotal > mainFieldLength)
	{
		$(data).val("");
		_showErrorMsg(sub_field_length_error_key, error_msg_title, 300, 100);
		return;
	}
	else if ((isMainFieldDynamicLength != null && isMainFieldDynamicLength != "")
			&& subLengthTotal > isMainFieldDynamicLength)
	{
		$(data).val("");
		_showErrorMsg(sub_field_length_error_key, error_msg_title, 300, 100);
		return;
	}
}

(function($, undefined)
{
	$.fn.getCursorPosition = function()
	{
		var el = $(this).get(0);
		var pos = 0;
		if ('selectionStart' in el)
		{
			pos = el.selectionStart;
		}
		else if ('selection' in document)
		{
			el.focus();
			var Sel = document.selection.createRange();
			var SelLength = document.selection.createRange().text.length;
			Sel.moveStart('character', -el.value.length);
			pos = Sel.text.length - SelLength;
		}
		return pos;
	}
})(jQuery);


function ATMInterface_interfaceTypeChangeDep()
{
	var interfaceType = $("#int_type_" + _pageRef).val();
	if (typeof interfaceType != "undefined")
	{
		if (interfaceType == "ISO")
		{
			$(".iso_required_fields_" + _pageRef).attr("style",
					"display: table-row");

		}
		else
		{
			$(".iso_required_fields_" + _pageRef).attr("style",
					"display: none;");
		}
	}
}


/**
 * set dialog value in row column
 * @param evt
 * @param additionalParams
 * @returns
 */
function  ATMInterface_setGridDialogValueInColumn(dialogOutput)
{
	
	var dialogOpenFrom = $("#dialogOpenFrom_"+_pageRef).val();
	
	var dialogOpenFromGrid = $("#dialogOpenFromGrid_"+_pageRef).val();
	var dialogOpenFromGridRowId = $("#dialogOpenFromGridRowId_"+_pageRef).val();
	var dialogOpenFromGridRowColumn = $("#dialogOpenFromGridRowColumn_"+_pageRef).val();
	
	var gridObject = $("#"+dialogOpenFromGrid);
	
	//while click ok button of expression dialog opened from Interface
	if(dialogOpenFromGridRowColumn == "SUB_EXPRESSION_DETAILS")
	{
		gridObject.jqGrid('setCellValue', dialogOpenFromGridRowId,"sub_FLDSVO.EXPRESSION", dialogOutput);
	}
	else 
		if(dialogOpenFromGridRowColumn == "EXPRESSION_DETAILS")
		{
			gridObject.jqGrid('setCellValue', dialogOpenFromGridRowId,"iso_INT_FLDSVO.EXPRESSION", dialogOutput);
		}
	else 
		if(dialogOpenFromGridRowColumn == "ISO_MSG_EXPRESSION_DETAILS")
		{
			gridObject.jqGrid('setCellValue', dialogOpenFromGridRowId,"iso_INT_MSGSVO.RESPONSE_EXPRESSION", dialogOutput);
		}
}

/**
 * get value from selected row column and return
 * @param gridId
 * @param rowId
 * @returns
 */
function  ATMInterface_getGriddialofValueFromColumn(gridId, rowId, columnName)
{
	var getGridClumValue = "";
	
	if(columnName == "SUB_EXPRESSION_DETAILS")
	{
		getGridClumValue = common_getGridColumnValue(gridId,rowId,"sub_FLDSVO.EXPRESSION");
	}
	else 
		if(columnName == "EXPRESSION_DETAILS")
		{
			getGridClumValue = common_getGridColumnValue(gridId, rowId,"iso_INT_FLDSVO.EXPRESSION");
		}
	else 
		if(columnName == "ISO_MSG_EXPRESSION_DETAILS")
		{
			getGridClumValue = common_getGridColumnValue(gridId, rowId,"iso_INT_MSGSVO.RESPONSE_EXPRESSION");
		}
	
	return getGridClumValue;
}


/**
 * Add import export functionality
 */
function atmInterface_addImportFunc(){
	
	var gridId = 'interfaceListGridTbl_Id';
	
	// prepare the buttons
	var btns = {
		exportBtn:{
			onClick: function(){
				AtmIntMaint_exportFileFromGrid();
			}
		},
		importBtn:{
			onClick: function(){
				var options = {
					onLoad: function(){
						var url = "/path/atmImportExport/AtmImportExportAction_importAtmInterface";
							
						$("#importUrl_"+_pageRef).val(url);
						$("#recordsGridId_"+_pageRef).val(gridId);
					}
				}
				var dialogUrl = jQuery.contextPath + "/path/atmImportExport/AtmImportExportAction_returnDialogPage";
				common_importFile(dialogUrl, options);
			}
		}
	}
	
	common_addExportImportBtn(gridId,btns);
}

/**
 * Export File from Grid
 * @returns
 */
function AtmIntMaint_exportFileFromGrid()
{
	var url = jQuery.contextPath+ "/path/atmImportExport/AtmImportExportAction_exportAtmInterface.action";
	var gridId = "interfaceListGridTbl_Id_"+_pageRef;
	var id =  	common_getGridColumnValue(gridId, '', 'iso_INTERFACESVO.INTERFACE_CODE');
	var description =  	common_getGridColumnValue(gridId, '', 'iso_INTERFACESVO.DESCRIPTION');
	

	if (id == undefined || id == null || id == "")
	{
		_showErrorMsg(msg_noRecordSelectedLabel, Warning_key, 300, 100);
		return;
	}
	
	var params = {};
	params["criteria.interfaceId"] =   id;
	params["criteria.description"] =    description;
	params["_pageRef"]   =   _pageRef;
	
	/**
	 * export Zip file
	 * @returns
	 */
	common_exportFile(url, params);
}
