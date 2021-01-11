function indEvent_setLayout(id)
{
	$("#gbox_"+id+"_"+_pageRef).removeAttr("style");
	//$(".ui-jqgrid-btable").removeAttr("style");
	$("#"+id+"_"+_pageRef+"_pager").removeAttr("style");
	$("#gview_"+id+"_"+_pageRef).find('.ui-jqgrid-hdiv').removeAttr("style");
	$("#gview_"+id+"_"+_pageRef).removeAttr("style");
	$("#gview_"+id+"_"+_pageRef).find('.ui-jqgrid-bdiv').css('width', '');
}

/**
 * OnChange Show/Hide row
 * @returns
 */
function common_onChangeShowHideRow(evt, id, className, requiredids, required, component, checkboxNature)
{
	var isChecked;
	if(evt == null)
	{
		isChecked = $("#"+id+":checked").val();
	}
	else
	{
		isChecked = $("#"+evt.id+":checked").val();
	}
	 
	if (typeof isChecked != "undefined" && (isChecked == "true" || isChecked == true))
	{
		if(typeof checkboxNature == "undefined" || checkboxNature == "" || checkboxNature == "checkedHide")
		{
			$("."+className+"_"+_pageRef).attr("style", "display: none;");
		}
		else
		{
			$("."+className+"_"+_pageRef).attr("style", "display: table-row;");
		}
		
		
		if(required)
		{
			for(var i=0; i<requiredids.length; i++)
			{
				if(component == "lookup")
				{
					var id =  "lookuptxt_"+requiredids[i]+"_"+_pageRef;
					$("#"+id).removeAttr("required");
				}
			}
			
		}
	}
	else
	{
		if(typeof checkboxNature == "undefined" || checkboxNature == "" || checkboxNature == "checkedHide")
		{
			$("."+className+"_"+_pageRef).attr("style", "display: table-row;");
		}
		else
		{
			$("."+className+"_"+_pageRef).attr("style", "display: none;");
		}
		
		if(required)
		{
			for(var i=0; i<requiredids.length; i++)
			{
				if(component == "lookup")
				{
					var id = "lookuptxt_"+requiredids[i]+"_"+_pageRef;
					$("#"+id).attr("required", "true");
				}
			}
		}
	}	
}

/**
 * add required attribute with field
 * @param selecter it will be class or id i.e description_id
 * @param lbl it will be class or id of label of required field
 * @param selecterType class/id 
 * @returns
 */
function common_makeRequiredFields(selecter, lbl, selecterType)
{
	if(selecterType == 'class')
	{
		$("."+lbl+"_"+_pageRef).addClass("required");
		$("."+selecter+"_"+_pageRef).attr("required", "true");
		$("."+lbl+"_"+_pageRef).append("<span class='required'>*</span>");
		
	}
	else
	{
		$("#"+lbl+"_"+_pageRef).addClass("required");
		$("#"+selecter+"_"+_pageRef).attr("required", "true");
		$("#"+lbl+"_"+_pageRef).append("<span class='required'>*</span>");
	}
}

/**
 * remove required attribute with field
 * @param selecter it will be class or id i.e description_id
 * @param lbl it will be class or id of label of required field
 * @param selecterType class/id 
 * @returns
 */
function common_removeRequiredFields(selecter, lbl, selecterType)
{
	if(selecterType == 'class')
	{
		$("."+lbl+"_"+_pageRef).removeClass("required");
		$("."+selecter+"_"+_pageRef).removeAttr("required");
		$("."+lbl+"_"+_pageRef).find("span").remove();
		
	}
	else
	{
		$("#"+lbl+"_"+_pageRef).removeClass("required");
		$("#"+selecter+"_"+_pageRef).removeAttr("required");
		$("#"+lbl+"_"+_pageRef).find("span").remove();
	}
}


/**
 * get Grid
 * @param dialogId
 * @param url
 * @param gridUrl
 * @param additionalParams
 * @param screenName
 * @returns
 */
function common_setGridValueToDilogOpenedFromTableRow(dialogId, url, gridUrl, additionalParams,screenName)
{
	
	//fill dialog grid According to main grid instead of based on interface
	if(common_isVariableValueNoEmpty(screenName))
	{
		var getGridClumValue = "";
		if(screenName == "interface")
		{
			if(!common_isVariableValueNoEmpty(gridUrl) && !common_isVariableValueNoEmpty(additionalParams[7]))
			{
				showDataElementsInDialog();
			}
			
			//get ATM interface selected row column value 
			getGridClumValue = ATMInterface_getGriddialofValueFromColumn(additionalParams[9], additionalParams[10], additionalParams[11]);
			

		}
		if(screenName == "acquirer")
		{
			//get grid column value of selected/dialog opened row
			getGridClumValue = common_getGridColumnValue(additionalParams[9], additionalParams[10], additionalParams[11]+"_EXPRESSION");
		}
		
		if(common_isVariableValueNoEmpty(getGridClumValue))
		{
			$("#"+additionalParams[4]+"_"+_pageRef).val(getGridClumValue);
		}
	}
}

/**
 * check is not empty
 * @param value this is value which needs to be check is it empty or not
 * @returns
 */
function common_isVariableValueNoEmpty(value)
{
	if(value != null && typeof value != "undefined" && $.trim(value) != "")
	{
		return true;
	}
}


/**
 * add Grid row
 * @param evt
 * @returns
 */
function common_addRow(id)
{
	$("#"+id).jqGrid('addInlineRow', {});
}

/**
 * remove grid row
 * @param rowId
 * @returns
 */
function common_deleteRow(id)
{
	$("#"+id).jqGrid('deleteGridRow');
}



/**
 * get Column value of selected roe or open dialog
 * @param gridId 
 * @param rowId
 * @param columnName
 * @returns
 */
function common_getGridColumnValue(gridId, rowId, columnName)
{
	var $table = $("#"+gridId);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var myObject;
	if(common_isVariableValueNoEmpty(rowId))
	{
		myObject = $table.jqGrid('getRowData', rowId);
	}
	else
	{
		myObject = $table.jqGrid('getRowData', selectedRowId);
	}
	var columnValue = myObject[columnName];
	return columnValue;
}

/**
 * 
 * @param gridId e.g gridId = isoFieldGridId
 * @returns
 */
function common_gridSelectedRowId(gridId)
{
	var $table = $("#"+gridId);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	return selectedRowId;
}

/**
 * open dialog 
 * @param url
 * @param params
 * @param title
 * @returns
 */
function common_openDialog(url, params, title,width, height)
{

	_showProgressBar(true);

	var openEventFilterPopup = $("<div id='dialogId_" + _pageRef
			+ "' class='path-common-sceen'></div>");
	openEventFilterPopup.css("padding", "0");
	openEventFilterPopup.insertAfter($('body'));
	var dialogOptions = {
		modal : true,
		title : title,
		autoOpen : false,
		show : 'slide',
		width : returnMaxWidth(width),
		height : returnMaxHeight(height),
		position : 'center',
		closeOnEscape : true,
		//to hide the x button in the dialogue
		open : function(event, ui)
		{
			// $(".ui-dialog-titlebar-close", ui.dialog | ui).hide();
		},
		buttons : {
			OK : function()
			{
				var theDialog = $(this);
				theDialog.dialog('close');
			},
			Cancel : function()
			{
				var theDialog = $(this);
				theDialog.dialog('close');
			}
		},
		position : 'center',
	};
	$("#dialogId_" + _pageRef).load(url, params, function()
	{
		_showProgressBar(false);
	});
	$("#dialogId_" + _pageRef).dialog(dialogOptions);
	$("#dialogId_" + _pageRef).dialog("open");
}


/**
 * @Author Aleem Khowaja
 * Add Import and Export button in grid
 * @param 
 * 1 -- gridId for adding import and export buttons in grid
 * 2 - Option contains 2 properties
 *     a) export button function definition
 *     b) import button function definition 
 * @returns
 */
function common_addExportImportBtn(gridId, options) {

    var grid = $("#"+gridId+"_" + _pageRef);
    var pagerId = "#"+gridId+"_" + _pageRef + "_pager_left";

    //export button
    var exportBtn = options.exportBtn;
    if(exportBtn){
	    grid.jqGrid('navButtonAdd', pagerId, {
			caption : "",
			title : export_key,
			id : gridId+"_exportBtn" + _pageRef,
			buttonicon : 'ui-icon-arrowthickstop-1-s',
			onClickButton : function() {
				exportBtn.onClick();
			}
	    });
    }

    //import button
    var importBtn = options.importBtn;
    
    if(importBtn){
	    grid.jqGrid('navButtonAdd', pagerId, {
			caption : "",
			title : import_key,
			id : gridId+"_importButton_" + _pageRef,
			buttonicon : 'ui-icon-arrowthickstop-1-n',
			onClickButton : function(){
				importBtn.onClick();
			}
	    });
    }
}


/**
 * This function is used for to prepare and open dialog for import files
 * @returns
 */
function common_importFile(dialogUrl, options) {
	
	
    var importDialogDiv = $("<div id='importDialogDiv' class='path-common-sceen'></div>");
    importDialogDiv.css("padding", "0");
    var theBody = $('body');
    importDialogDiv.insertAfter(theBody);

    var dialogOptions = {
	autoOpen : false,
	height : 235,
	title : import_key,
	width : 450,
	modal : true,
	buttons : [ {
	    text : (typeof signature_close_btn === undefined) ? "Close" : signature_close_btn,
	    click : function() {
		$(this).dialog('close');
	    }
	} ],
	close : function() {
	    $("#importDialogDiv").dialog("destroy");
	    $("#importDialogDiv").remove();
	}
    }
    var params = {};
    params["atmBaseCO.pageResult"] = "atmFileImport";
    params["_pageRef"]   =   _pageRef;
    
    $.post(dialogUrl, params, function(result) {
		$('#importDialogDiv').html(result);
		$('#importDialogDiv').dialog(dialogOptions)
		$('#importDialogDiv').dialog('open');
		
		options.onLoad();
		
    }, "html");
}

/**
 * Export File 
 * @param url
 * @param params
 * @returns
 */
function common_exportFile(url, params) {

    _showProgressBar(true);

    $.fileDownload(url, {
	successCallback : function(url) {
	    _showProgressBar(false);
	},
	failCallback : function(html, url) {
	    _showErrorMsg(html);
	    _showProgressBar(false);
	},
	data : params
    });
}

/**
 * Import Zip Files
 * @returns
 */
function common_importZipFile() {

    var fileName = document.getElementById("atmImport_zipFile_"+_pageRef).value;
    var ext = fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length);
    
    var importUrl = $("#importUrl_"+_pageRef).val();
    var recordsGridId = $("#recordsGridId_"+_pageRef).val();
    
    if (fileName == "" || ext.toLowerCase() != "zip") {
    	_showErrorMsg(invalid_zipfile_key, error_msg_title, 300, 100);
	return;
    }
    _showProgressBar(true);

    var options = {
    		url : jQuery.contextPath + importUrl,
	type : 'post',
	success : function(response, status, xhr) {
	    _showProgressBar(false);
	    var jsonObj = $.parseJSON($(response).html());
	    if (jsonObj["_error"] == undefined || jsonObj["_error"] == null || jsonObj["_error"] === "") {
		
		    var message = jsonObj["importDetails"];
		    
		    if(message != undefined && message != null)
			message = message + '\n' + file_imported_successfully_key;
		    else
			message = file_imported_successfully_key;
		    
		    _showErrorMsg(message, success_msg_title);
		    
		    if ($("#"+recordsGridId+"_" + _pageRef).html() != null && $("#"+recordsGridId+"_" + _pageRef).html() != "") {

			$("#"+recordsGridId+"_" + _pageRef).trigger("reloadGrid");
			showHideSrchGrid(recordsGridId+'_' + _pageRef);
		    }
		//}
	    } else {
		_showErrorMsg(jsonObj["_error"]);
	    }
	},
	error : function(response) {
	    _showProgressBar(false);
	    _showErrorMsg("error " + response);
	}

    };
    $("#atmImportForm_Id_"+_pageRef).ajaxSubmit(options);
}