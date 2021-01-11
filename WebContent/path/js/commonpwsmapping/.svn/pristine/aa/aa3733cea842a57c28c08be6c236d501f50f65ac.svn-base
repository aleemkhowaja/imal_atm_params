
/**
 * @returns
 */
function pws_loadPwsModal( id, title, arguments,mappingGridUrl,onCloseCallBackFn,appFilter,mappingFieldsUrl)
{
	// prepare the dialog main info
	$("#pwsMappingId_"+_pageRef).val(id);
	var modalCntId = "pwsModal_"+ _pageRef;
	var pwsDialogCnt = $("<div id='"+modalCntId+"' class='path-common-sceen'></div>");
	pwsDialogCnt.insertAfter($('body'));
	
	var dialogTitle = "Gateway Service Mapper "+ title;
	var actionUrl = jQuery.contextPath+'/path/common/pws/CommonPwsMappingAction_loadPwsDialog.action';
	
	//set dimensions
	var dialogHeight = 500;
	var dialogWidth = $.browser.msie?returnMaxWidth(900):returnMaxWidth(900);
	$("#pwsMappingId_"+_pageRef).val(id);
	
	//setup buttons
	var buttons = [];
	// @todo recheck this
	var closeLbl = (typeof signature_close_btn === undefined )? "Close":signature_close_btn;
	buttons.push({text:saveLabel,id:"pws_saveBtn",click:function(){
		// @todo fix this _savePwsInfo
		//$("#pwsFormId_" + _pageRef).processAfterValid("_savePwsInfo");
		var value = $('#serviceTypeId_'+_pageRef).selected().val();
		if(value == 'pws')
		{
			alertWebServiceExplorer_save();
		}
		else{
			_savePwsInfo();
		}
	}});
	
	buttons.push({text : closeLbl,id : "pws_closeBtn",click:function() {
		if(typeof onCloseCallBackFn != "undefined" && onCloseCallBackFn != null && onCloseCallBackFn != "")
			{
				eval(onCloseCallBackFn)($("#pwsMappingId_"+_pageRef).val())
			}
		$("#" + modalCntId).dialog("destroy");
		$("#" + modalCntId).remove();
	}});
	
	var dialogOptions = {
		modal : true,
		title : dialogTitle,
		autoOpen : false,
		show : 'slide',
		dialogClass : 'no-close',
		closeOnEscape : true,
		position : 'center',
		width : dialogWidth,//@todo fix this
		height : dialogHeight,// @todo fix this
		buttons :buttons
	};
	

	// send the map to the screen
	var data = {
		'pwsDef.mappingVO.MAPPING_ID':id,
		 "_pageRef" : _pageRef,
		 'pwsDef.argumentItems': encodeURIComponent(JSON.stringify(arguments)),
	};
	
	if(typeof mappingGridUrl != "undefined" && mappingGridUrl != null)
	{
		data["webServiceExplorerCO.mappingGridUrl"] = mappingGridUrl
	}
	if(typeof appFilter != "undefined" && appFilter != null)
	{
		data["webServiceExplorerCO.filter"] =  encodeURIComponent(JSON.stringify(appFilter))
	}
	
	if(typeof mappingFieldsUrl != "undefined" && mappingFieldsUrl != null)
	{
		data["webServiceExplorerCO.mappingFieldsUrl"] =  mappingFieldsUrl;
	}
//	 'webServiceExplorerCO.mappingGridUrl': mappingGridUrl,
//	 'webServiceExplorerCO.filter': encodeURIComponent(JSON.stringify(appFilter)),
//	 'webServiceExplorerCO.mappingFieldsUrl': mappingFieldsUrl
	
	// open the dialog and load the page content
	$("#"+modalCntId).load(actionUrl, data, function() {_showProgressBar(false);});
	$("#"+modalCntId).dialog(dialogOptions);
	$("#"+modalCntId).dialog("open");
}


function _savePwsInfo(){
	
	// prepare grid info
	pws_prepareGridInfo();
//    var mappingId = $("#mappingId_"+_pageRef).val();
//    $("#pwsMappingId_"+_pageRef).val(mappingId);
    
	var pwsFormIdData = $("#pwsFormId_" + _pageRef).serializeForm();
	var actionUrl = jQuery.contextPath + "/path/common/pws/CommonPwsMappingAction_save?pwsDef.mappingVO.MAPPING_ID="+mappingId+"&_pageRef="+_pageRef;

	// display progress bar
	_showProgressBar(true);
	
	$.ajax( {
		url : actionUrl,
		type : "post",
		dataType : "json",
		data : pwsFormIdData,
		success : function(data) {
			if (typeof data["_error"] == "undefined"
					|| data["_error"] == null) {
				_showErrorMsg(record_was_Updated_Successfully_key,success_msg_title);
			}
			
			// hide progress bar
			_showProgressBar(false);
			
		}
	});
	
	
}

/**
 * @returns
 */
function pws_prepareGridInfo(){
	
	var paramGrid = $("#pwsGridParamTbl_Id_"+_pageRef);
	if( paramGrid.length > 0 ){
		var paramJsonStringUpdates = paramGrid.jqGrid('getAllRows');
		$("#argGridUpdates_"+_pageRef).val(paramJsonStringUpdates);
	}
}



/**
 * View Function
 * @deprecated
 */
function pws_togglePwsApiInfo(){
	
	var pwsCommonType =$("#serviceTypeId_"+_pageRef)
	.find(":selected").val();
	
	switch(pwsCommonType){
	case 'R' :
		$('.restInfo').show();
		$('.soapInfo').hide();
		break;
	case 'W' :
		$('.restInfo').hide();
		$('.soapInfo').show();
		break;
	case 'pws':
		$('.restInfo').hide();
		$('.soapInfo').hide();
		break;
	}
}

/**
 * This function will load the Mapper combo
 * @returns
 */
function pws_loadMapperCombo(){
	var params = {
		'pwsDefCO.argumentItems' : $('#mappingFields_'+ _pageRef).val(),	
		'pwsDefCO.mappingVO.MAPPING_ID' : $("#pwsMappingId_"+_pageRef).val()
	};
	
//	var url = jQuery.contextPath
//	+ "/path/common/pws/CommonPwsMappingGridAction_loadArgMapperCombo?"+ $.param(params);
	var url = $("#mappingFieldsUrl_"+_pageRef).val()
	return loadCombo(url,'gridModel', 'parameterValue', 'parameterName');
}

/**
 * Api Argument Grid
 */
function pwsArgGridVal_addRowGrid() 
{
	var argGrid = $("#pwsGridParamTbl_Id_"+_pageRef);
	
	if( !argGrid.jqGrid("checkRequiredCells")){
		return;
	}
	
	var rowId = argGrid.jqGrid('addInlineRow', {});
	argGrid.jqGrid('setSelection',rowId, true);// setting selection to newly added row
}


/**
 * Delete Api Argument
 * @param rowId
 * @returns
 */
function pwsArgGridVal_deleteRowGrid(rowId) 
{
	var argGrid = $("#pwsGridParamTbl_Id_"+_pageRef);
	var selectedRow = argGrid.jqGrid('getGridParam','selrow');

	argGrid.jqGrid('deleteGridRow',selectedRow)
}


/**
 * Check if duplication exist
 */
function pwsArgGridVal_checkDuplicatedRows()
{
	// prepare needed info
	var argGridId = $("#pwsGridParamTbl_Id_"+_pageRef);
	var rowdata = argGridId.jqGrid('getRowData');
    var selectedRowId = argGridId.jqGrid("getGridParam", 'selrow');
    var selectedRowIndex =  argGridId.jqGrid('getInd',selectedRowId) -1 ;
    var argName = argGridId.jqGrid('getCell', selectedRowId,'apiArgVO.ARG_NAME');
    
    //validate duplicated records
    $.each(rowdata, function(index, value) 
    {
    	if(index != selectedRowIndex){
    		if(argName == value["apiArgVO.ARG_NAME"]) {
    			_showErrorMsg(msg_duplicate_entry_Of_record_key);
    			
    			argGridId.jqGrid('setCellValue',selectedRowId,"apiArgVO.ARG_ID","");
    			argGridId.jqGrid('setCellValue',selectedRowId,"apiArgVO.ARG_NAME","");
    			argGridId.jqGrid('setCellValue',selectedRowId,"apiArgVO.ARG_TYPE","");
    			argGridId.jqGrid('setCellValue',selectedRowId,"apiArgVO.STATUS","");
    			argGridId.jqGrid('setCellValue',selectedRowId,"argMap.DESTINATION_KEY",""); 
    			return;
    		}
    	}
    });
}

function select_onChange()
{
	var iv_crud = $("#iv_crud_"+_pageRef).val();
	var type = $("#serviceTypeId_"+_pageRef).val();
	var actionSrc = jQuery.contextPath + "/path/common/pws/CommonPwsMappingAction_applyDynamicDisplayByServiceType?_pageRef="+_pageRef;

	var params = {};
	params["pwsDef.serviceType"] = $("#serviceTypeId_"+_pageRef).val();
	
	var mappingGridUrl = $("#mapping_grid_url_"+_pageRef).val();
	var mappingFieldsUrl = $("#mappingFieldsUrl_"+_pageRef).val();
	if(typeof mappingGridUrl != "undefined" && mappingGridUrl != null)
	{
		params["webServiceExplorerCO.mappingGridUrl"] = mappingGridUrl
	}
	if(typeof mappingFieldsUrl != "undefined" && mappingFieldsUrl != null)
	{
		params["webServiceExplorerCO.mappingFieldsUrl"] =  mappingFieldsUrl;
	}//	$.post(actionSrc, {}, function(data) {
//		resizeGrids();
//		_showProgressBar(false);
//	}, "html");
	
	if(type == "pws")
	{
		$.post(actionSrc, params, function(data) {
			$("#loadPwsDialog_" +_pageRef).html(data);
			$("#pwsApiParamGrid_"+_pageRef).html("");
			resizeGrids();
			_showProgressBar(false);
		}, "html");
	}
	else{
		$.post(actionSrc, params, function(data) {
			$("#loadPwsDialog_" +_pageRef).html(data);
			$("#pwsApiInfo_explorer_"+_pageRef).html("");
			$("#pwsApiParamGrid_"+_pageRef).show();
			$("#pwsApiInfo_explorer_"+_pageRef).css("display", "none");
			resizeGrids();
			_showProgressBar(false);
		}, "html");
		resizeGrids();
	}
}

function pwsMappingFieldsLoadCombo(zUrl, zList, zId, zValue)
{		
	var mappingId = $("#pwsMappingId_"+_pageRef).val();
//	var mappingFields = $("#webServiceExplorerMappingParams_"+_pageRef).val();
	var mappingFields = $("#mappingFields_"+_pageRef).val();
	var reqType = "ddl";
	//var url = zUrl + "?webServiceExplorerCO.mappingID=" + mappingId+"&webServiceExplorerCO.reqType="+reqType+"&webServiceExplorerCO.mappingFields="+mappingFields;
	var params = {
			'webServiceExplorerCO.mappingID' : mappingId,	
			'webServiceExplorerCO.reqType' : reqType,
			'webServiceExplorerCO.mappingFields' : mappingFields
		};
	return pws_loadCombo(zUrl, zList, zId, zValue,params);
}

function pws_loadCombo(zUrl, zList, zId, zValue,params) {
	var list = {};
	$.ajax( {
		url : zUrl,
		type : "post",
		async : false,
		dataType : 'json',
		data: params,					
		success : function(data) {
			 data = JSON.parse(JSON.stringify(data[zList]));
            for(var i=0; i<data.length; i++)
             {
                   var key = data[i][zId];
                   if(typeof key == "undefined") //no id for select box
                   	key = "";
                   var value = data[i][zValue]
                   list[key] = value;
             }
		}
	});
	return list;
}

