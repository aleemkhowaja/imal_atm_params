/**
* USER STORY #862852 Adding Expressions to Mapping parameters in PWS dialog
*/

function savePwsMappingExpressionField(mappingExpression)
{	
	var explorerGridselectedId = $("#explorer_grid_row_id_"+_pageRef).val();
	var gridIdSelected = getGridIdFromRow(explorerGridselectedId);
	$("#"+gridIdSelected).jqGrid('setCellValue',explorerGridselectedId, "expressionHiddenField", encodeURIComponent(mappingExpression));
}

function viewExpressionDetails(cellvalue, options, rowObject)
{
	if(isNonPrimativeDataType(rowObject.fieldType) && (undefined == rowObject.value || "" == rowObject.value))
	{
		return '<a href="#" onclick="expression_viewDetailsList(\''+options.rowId+'\')">'+"expression"+'</a>';
	}
	else{
		return "";
	}
}

function expression_viewDetailsList(rowId)
{
   /* var idArr = rowId.split("_");
    if(idArr.length<3)
    {
    	var g = returnGridObjectFromRowId(rowId);
    	g.jqGrid('setCellValue', rowId, 'mappingField', "");
    }
	$("#expressionTextArea_"+_pageRef).val("");*/

	$("#explorer_grid_row_id_"+_pageRef).val(rowId);
	var params = {};
	
	var gridId = getGridIdFromRow(rowId);
	$("#gridId_"+_pageRef).val(gridId);
	$("#rowId_"+_pageRef).val(rowId);
	params["customExpressionCO.expression"] = $("#"+gridId).jqGrid('getCell',rowId, "expressionHiddenField");
	
	if(gridId.indexOf("_response") > -1)//only in case of response show selected fields with list of expression variables
	{
		var gridSelectedRowss = getAllSelectedRows();
		var value = undefined;
		var selRows = [];
		if(gridSelectedRowss != undefined)
		{
			$.each(gridSelectedRowss,function(i,v){
				var	rowId = null;
				var newId = null;
				var y;
				var x = (v.indexOf("_response") > -1);
				if(x)
				{
					y = v;
					y = y.replace("_"+_pageRef+"_response","");
					y = y.replace("_"+_pageRef,"");
					if(!hasSubGrid(v))
					{
						y = y.replace("_",".");
						selRows.push(y);		
					}
				}
			});
		}
		if(undefined != selRows && typeof selRows != "undefined" && selRows.length>0)
		{
			params["customExpressionCO.responseSelectedRowFields"] = selRows.toString();
		}
	}	
//	var ivCrud = $("#iv_crud_" + _pageRef).val();

//	var gridUrl = "/path/iSOMessagesDefinition/ISOMessagesDefinitionMaintAction_returnFieldsByMTI?iv_crud="+ivCrud+"&&_pageRef="+_pageRef;
	var gridUrl = $("#mapping_grid_url_"+_pageRef).val();
	if(gridUrl == null || gridUrl == "")//mapping fields sent as parametesr instead of url will be filled through common action 
	{
		gridUrl = jQuery.contextPath+"/path/common/mappingexpression/PwsMappingFieldsList_loadMappingFields?webServiceExplorerCO.mappingFields="+$("#argument_"+_pageRef).val()
	}
	params["customExpressionCO.gridUrl"] = gridUrl;
	
	common_openExpressionDialog("/path/customexpression/CustomExpressionMaintAction_returnDialogPage?_pageRef="+_pageRef, params, ['450','700','savePwsMappingExpressionField',
		'/path/customexpression/CustomExpressionMaintAction_save.action','customExpressionFormId']);
//	savePwsMappingExpressionField
}

function expression_viewDetailsList_old(rowId)
{
	$("#explorer_grid_row_id_"+_pageRef).val(rowId);
	var mappingFields = $("#mappingFields_"+_pageRef).val();
	var expressionMappingField = "";
	var grid = $("#"+getGridIdFromRow(rowId));
	try{
		expressionMappingField = grid.jqGrid('getCell',rowId, "expressionHiddenField");
	}
	catch(e)
	{
		alert(e);
	}	
	var fieldName = grid.jqGrid('getCell',rowId,"fieldName");
	var actionSrc = $.contextPath+ '/path/common/mappingexpression/PwsMappingExpressionMaint_loadPwsExpressionDialog?_pageRef='+_pageRef+"&fieldName="+fieldName+"&webServiceExplorerCO.mappingFields="+mappingFields;
	reloadParams={};
	reloadParams['expressionMappingField'] = expressionMappingField;
	$("#MappingExpressionDiv_" + _pageRef).load(actionSrc,reloadParams, function(data,val,expressionMappingField)
			{
				expressionMappingField = reloadParams['expressionMappingField'];
				if(expressionMappingField != undefined || expressionMappingField != null || expressionMappingField!= "")
				{
					$("#pwsExpressionBody_"+_pageRef).val(expressionMappingField);
				}
				_showProgressBar(false);
			});

	$("#pwsMappingExpression_dialog_" + _pageRef).removeAttr('display');
	
	$("#pwsMappingExpression_dialog_" + _pageRef).dialog({
		modal:true, 
        title:"enter_expression_key",
        autoOpen:false,
        show: {
            effect: "blind",
            duration: 1000
          },
        hide: {
            effect: "explode",
            duration: 1000
          },
          buttons: {
              "save_expression_key": function() {
            	  savePwsMappingExpressionField(grid);
                  $( this ).dialog( "close" );
              },
              Cancel: function() {
            //	$("#pwsExpressionBody_"+_pageRef).val("");
                $( this ).dialog( "close" );

              }
          },
        position:'center', 
        width : returnMaxWidth(480),
        height	:returnMaxHeight(480),
        resizable: false,
		close: function (){
			  var theDialog = $(this);
			  theDialog.css("display", "none");
	    }
	}).dialog("open");
}

function pwsMappingExpressionFields_setRemainingCharachter(numOfChar)
{
	var id = $("#eventStatic"+communicationType+"MessageBodyEng_"+_pageRef);
	var $remaining = $('#'+communicationType+'Remaining_'+_pageRef);
	var text_length = id.val().length;
    var text_remaining = numOfChar - text_length;
    if(text_remaining < 0)
    {
    	text_remaining = 0;
    }
    $remaining.text(text_remaining + ' Characters Remaining');
}

function pwsMappingExpressionGetId(id)
{
	var selectedId = $(id).attr("id");
	var maxLength = $(id).attr("maxlength");
	$("#selectedBodyTextareaId_"+_pageRef).val(selectedId);
	$("#selectedBodyTextareaLength_"+_pageRef).val(maxLength);
}

function pwsMappingExpression_expressionShowHideData(obj)
{
	var url = $.contextPath	+ '/path/common/mappingexpression/PwsMappingExpressionMaint_expressionShowHideData?_pageRef='+_pageRef;
	reloadParams={};
	$.post(url, reloadParams, function(params)
	{
		var expression_showHide = (params["update"]).split(",");
		autoCompleteConstraints(obj.id,expression_showHide);
	});
	
//	$.ajax( {
//		url : url,
//		type:"post",
//		dataType:"json",
//		data: reloadParams,					
//		success : function(data) 
//	    {			
//			var expression_showHide = (data["update"]).split(",");
//			autoCompleteConstraints(obj.id,expression_showHide);
//			_showProgressBar(false);
//		}
//	}).done(function(result)
//      {	
//      }
//	);
}

function pwsMappingExpression_addTagsInTextArea(mappingGrid,rowId)
{
	var checkDisable = $("#_recReadOnly_"+_pageRef).val();
	if(checkDisable == "true")
	{
		return;
	}
	else
	{
		var selectedBodyTextareaId = $("#selectedBodyTextareaId_"+_pageRef).val();
		var table = $("#pwsMappingFieldsTagsGridId_" + _pageRef);
		var selectedRowId = table.jqGrid('getGridParam', 'selrow');
		if(selectedRowId == null || selectedRowId == undefined)
		{
			selectedRowId = $("#clickedMappingField_id_"+_pageRef).val();
		}
		if(typeof selectedBodyTextareaId == "undefined" || selectedBodyTextareaId == "")
		{
			_showErrorMsg(select_message_body_for_adding_tags_key, error_msg_title, 300,100);
			return;
		}
		var tagDescription = table.jqGrid('getCell', selectedRowId, 'mappingGridFields');
		//var tag = " <"+tagDescription+">";
		var tag = tagDescription;
		
		pwsMappingExpressionTag_setTagInCursorPosition(selectedBodyTextareaId, tag);

		//pwsExpressionMappingFields_setRemainingCharachter(4000);

		var theform = document.getElementById("pwsExpressionFormId_"+_pageRef);
		$.data(theform, 'changeTrack', true);

	}
}

function pwsMappingExpressionTag_setTagInCursorPosition(textAreaId,tag){
	if(typeof textAreaId == "undefined" || textAreaId =="")
	{
		textAreaId = "pwsExpressionBody_" + _pageRef;
	}
	else
	{
		var beforetext =  $("#"+textAreaId).val();
		var selectedTextBoxMasLength = $("#selectedBodyTextareaLength_"+_pageRef).val();
		if(((beforetext.length)+tag.length) >  selectedTextBoxMasLength)
		{
			return;
		}
	}
	var cursorPos = $("#"+textAreaId).prop('selectionStart');
    var v =  $("#"+textAreaId).val();
    var textBefore = v.substring(0,  cursorPos );
    var textAfter  = v.substring( cursorPos, v.length );
    $("#"+textAreaId).val(textBefore+tag+textAfter );
    $("#"+textAreaId).focus().setCursorPosition((textBefore+tag).length);
}

/**
 * set cursor on particular position
 */
$.fn.setCursorPosition = function (pos) {
    this.each(function (index, elem) {
        if (elem.setSelectionRange) {
            elem.setSelectionRange(pos, pos);
        } else if (elem.createTextRange) {
            var range = elem.createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    });
    return this;
};

function addMappingGridRow($mappingGrid)
{
	//lstOfMappingParams must be load from action or hidden field
	
	var lstOfMappingParams = "[e1, e2, e3, e4]";
	var fixedList = lstOfMappingParams.replace("[","");
	fixedList = fixedList.replace("]","");
	var mappingParams = fixedList.split(",");
	$.each(mappingParams,function(i,v){
		var	rowId = null;
		rowId = $mappingGrid.jqGrid('addInlineRow', {COLUMN_NAME:v});
		var newId = null;
		newId = v;
		$("#"+$("#"+rowId).attr('id',newId).find('td:first').attr('id')).attr('ondblclick','mappingFieldDblClicked("'+newId+'")');
	});
	var fId = "clickedMappingField_id_"+_pageRef;
	var fName = "clickedMappingField_name";
	var fValue = "";
	var formId = "pwsExpressionFormId_"+_pageRef;
	var listOfHiddenFields = document.createElement('div');
	var hField = returnHiddenField(fId,fName,fValue);
	listOfHiddenFields.appendChild(hField);
	createHiddenFields(formId,listOfHiddenFields);
}

function mappingFieldDblClicked(rowId)
{
	$("#clickedMappingField_id_"+_pageRef).val(rowId);
}