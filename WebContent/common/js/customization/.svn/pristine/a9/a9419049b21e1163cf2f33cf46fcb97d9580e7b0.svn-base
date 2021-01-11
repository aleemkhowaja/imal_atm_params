/**
 * check not to permit of removing visibility if Required is checked
 * @param {Object} theCheckBox
 * @param {Object} what
 */
function objCust_CheckVisbleReadOnlyVal(element, what)
{
	var elemId  = element.id;
	var elemVal = $("#"+elemId).val();
	var prevVal = $("#"+elemId).attr("prevvalue");
	var fldDepVisible = "0";
	// if Required Checked
	
	if(what == 'VIS')// visibility comboBox
	{
		if(elemVal == "2" || elemVal == "3")
		{
			manageDynamicDisplay("fldcust_visibleExpr_" + custScrPageRef,{fldcust_visibleExpr:{IS_VISIBLE:"1"}},"fldcust_visibleExpr");
		}
		else
		{
            $("#fldcust_visibleExpr_"+custScrPageRef).val("");
			manageDynamicDisplay("fldcust_visibleExpr_" + custScrPageRef,{fldcust_visibleExpr:{IS_VISIBLE:"0"}},"fldcust_visibleExpr");
		}
	}
	else if(what == 'READONLY')//readOnly management
	{
	   if(elemVal == "2" || elemVal == "3")
	   {
		 manageDynamicDisplay("fldcust_readonlyExpr_" + custScrPageRef,{fldcust_readonlyExpr:{IS_VISIBLE:"1"}},"fldcust_readonlyExpr");
		 $("#fldcust_addDeleteFlag_" + custScrPageRef).attr('disabled', false);
	   }
	   else
	   {
		 $("#fldcust_readonlyExpr_"+custScrPageRef).val("");
		 manageDynamicDisplay("fldcust_readonlyExpr_" + custScrPageRef,{fldcust_readonlyExpr:{IS_VISIBLE:"0"}},"fldcust_readonlyExpr");
		 $("#fldcust_addDeleteFlag_" + custScrPageRef).attr('disabled', false);
		 if(elemVal == "1")
		 {
			 $("#fldcust_addDeleteFlag_" + custScrPageRef).val(0);
			 $("#fldcust_addDeleteFlag_" + custScrPageRef).attr('disabled', true);
			 $("#fldcust_addDeleteExpr_"+custScrPageRef).val("");
			 manageDynamicDisplay("fldcust_addDeleteExpr_" + custScrPageRef,{fldcust_addDeleteExpr:{IS_VISIBLE:"0"}},"fldcust_addDeleteExpr");  
		 }
	   }
	}
	else if(what == 'ADD_DELETE')
	{
	   if(elemVal == "2" || elemVal == "3")
	   {
		 manageDynamicDisplay("fldcust_addDeleteExpr_" + custScrPageRef,{fldcust_addDeleteExpr:{IS_VISIBLE:"1"}},"fldcust_addDeleteExpr");    
	   }
	   else
	   {
		 $("#fldcust_addDeleteExpr_"+custScrPageRef).val("");
		 manageDynamicDisplay("fldcust_addDeleteExpr_" + custScrPageRef,{fldcust_addDeleteExpr:{IS_VISIBLE:"0"}},"fldcust_addDeleteExpr");    
	   }		
	}
	$("#"+elemId).attr("prevvalue",elemVal);
}

/**
 * reset object customization 
 * @returns
 */
function objCust_resetCustomization()
{
	_showConfirmMsg(
			(typeof Confirm_Delete_Process_key != undefined) ? Confirm_Delete_Process_key
					: "Reset Customization?", confirm_msg_title,
			function(yesNo)
			{
				if (yesNo)
				{
						_showProgressBar(true);
						
						var currPageRef = "";
						var curParams = {};
						if(typeof _pageRef !== "undefined")
						{
							curParams._pageRef = _pageRef;
							currPageRef = _pageRef;
						}
						curParams.objectId = $('#objectId').val();
						var srcURL = jQuery.contextPath+'/path/objectCustomization/objectCustomizationMain_loadCustMaintPage.action';
						var theForm = $("#custObjectMaintForm_"+custScrPageRef).serializeForm();
						
						$.ajax({
							 url: jQuery.contextPath+"/path/objectCustomization/objectCustomizationMain_resetChanges",
					         type:"post",
							 dataType:"json",
							 data: theForm,
							 success: function(data)
							 		{
								 		if(typeof data["_error"] == "undefined" || data["_error"] == null)
								 		{
								 			// relaod the Dialog
								 		 $("#global_object_cust_div").load(srcURL, curParams, function()
								 			 {
									 			 _showErrorMsg(record_was_Updated_Successfully_key,info_msg_title);
									 			 clearCachedPathData();
									 			 _showProgressBar(false);
								 			 });
								 		}
								 		else // there is error
								 		{
								 			_showProgressBar(false);
								 		}
								 	}
							 });
			} }, "yesNo");

}
/**
 * load names of grid columns to the combo filtered based on the grid content
 * @returns
 */
function objCust_loadColumnNamesCombo()
{
	//return the column names exists in the grid (already chosen)
	var namesArray = getColumnNames();
	
	var gridId = $('#objectId').val();
	var $table = $("#"+gridId + "_" + custScrPageRef);
	var rowData = $table.jqGrid('getGridParam','colModel');
	var rowDataName = $table.jqGrid('getGridParam','colNames');
	var list = "";
	for(var i=0; i<rowData.length; i++)
 	{
		var value = rowDataName[i];
		if(rowData[i].hidden == true || namesArray.indexOf(value) !== -1)continue;
		var key = rowData[i].name;
	    if(typeof key == "undefined") //no id for select box
	       key = "";
        if(list.length>0)
              list += ";" ;
        list += key + ":" + value;
 	}
	return list;
}

/**
 *  add new empty row to the grid
 * @returns
 */
function objCust_addMapGrid()
{
	var thCustTbl =	$("#ObjectCustDetailsGrid_Id_"+custScrPageRef);
	var rId = thCustTbl.jqGrid('addInlineRow', {});
}

/**
 * delete selected row from the grid
 * @returns
 */
function objCust_deleteMapGrid(theRowId)
{
	var $table = $("#ObjectCustDetailsGrid_Id_" + custScrPageRef);
	var selectedRowObject 	= $table.jqGrid('getRowData', theRowId);
	if(selectedRowObject["sysParamObjDetailsDispVO.BUS_RELATED"]=="1")
	{
		var deleteBusRelated = document.getElementById("bus_related_delete_key").value;
		_showErrorMsg(deleteBusRelated);
		return;
	}
	_showConfirmMsg((typeof Confirm_Delete_Process_key != undefined)?Confirm_Delete_Process_key:"Delete Selected Row?",confirm_msg_title,function(yesNo)
		    {
				if(yesNo) 
				{
					var selectedRowObject = $table.jqGrid('getRowData', theRowId);
					var objDisplayId = selectedRowObject["sysParamObjDetailsDispVO.OBJ_DISPLAY_ID"];
					
					if(objDisplayId == '')
					{
						$("#ObjectCustDetailsGrid_Id_"+custScrPageRef).jqGrid('deleteGridRow',theRowId);	
					}
					else
					{
						
						_showProgressBar(true);
						var deleteAction = jQuery.contextPath+"/path/objectCustomization/objectCustomizationDetailsListAction_deleteObjectCustDetails.action";
						var deleteParam = { 
											"sysParamObjDetailsDispVO.OBJ_DISPLAY_ID": objDisplayId,
											"sysParamObjDetailsDispVO.OBJ_DET_NAME":selectedRowObject["sysParamObjDetailsDispVO.OBJ_DET_NAME"]
										  };
						
						$.ajax({
							 url: deleteAction,
					         type:"post",
							 dataType:"json",
							 data: deleteParam,
							 success: function(data){
							     
								 if(typeof data["_error"] == "undefined" || data["_error"] == null)
							     {	 
									   if($("#ObjectCustDetailsGrid_Id_"+custScrPageRef).html()!=null && $("#ObjectCustDetailsGrid_Id_"+custScrPageRef).html()!="")
							           {
							            	 $("#ObjectCustDetailsGrid_Id_"+custScrPageRef).trigger("reloadGrid");
							           }
					             } 
								 
								 _showProgressBar(false);
								 
							 }
					    });
					}
				}
			},"yesNo");	
}
/**
 * on select row set the descriptions for comboboxes
 * @param rowObj
 * @returns
 */
function objCust_onRowSelTopic(rowObj)
{
	objCust_comboChanged();
	var $table 				= $("#ObjectCustDetailsGrid_Id_" + custScrPageRef);
	var selectedRowId 		= $table.jqGrid('getGridParam', 'selrow');
	var selectedRowObject 	= $table.jqGrid('getRowData', selectedRowId);
	if(selectedRowObject["sysParamObjDetailsDispVO.BUS_RELATED"]=="1")
	{
		for(var c in  selectedRowObject)
		{
			$table.jqGrid("setCellReadOnly", selectedRowId,c,"true");
		}
	}
	
}

/**
 * on changing any combo handle visibility for each related expression text areas 
 * @returns
 */
function objCust_comboChanged()
{
	var $table 				= $("#ObjectCustDetailsGrid_Id_" + custScrPageRef);
	var selectedRowId 		= $table.jqGrid('getGridParam', 'selrow');
	var selectedRowObject 	= $table.jqGrid('getRowData', selectedRowId);
	var readOnly 			= selectedRowObject["readOnlyComboDesc"];
	var visibility			= selectedRowObject["visibilityComboDesc"];
	var mandatory 			= selectedRowObject["mandatoryComboDesc"];
	
	apply_auto_complete(selectedRowId + "_sysParamObjDetailsDispVO.LABEL_KEY_EXPR",expression_cust_tags);
	//if columnName already exists in DB then it must be readonly therefore selectedRowObject["columnNameComboDesc"] will retrun the title instead of the key since readonly convert it to textfield.
	var columnName = selectedRowObject["sysParamObjDetailsDispVO.OBJ_DET_NAME"];
	if(selectedRowId.indexOf("new")!== -1)
	{
		columnName			= selectedRowObject["columnNameComboDesc"];
		$table.jqGrid('setCellValue', selectedRowId,"sysParamObjDetailsDispVO.OBJ_DET_NAME",columnName);
	}
	$table.jqGrid('setCellValue', selectedRowId,"sysParamObjDetailsDispVO.IS_READONLY",readOnly);
	$table.jqGrid('setCellValue', selectedRowId,"sysParamObjDetailsDispVO.IS_VISIBLE",visibility);
	$table.jqGrid('setCellValue', selectedRowId,"sysParamObjDetailsDispVO.IS_MANDATORY",mandatory);
	
	//2 = readonlyexpression
	if(readOnly!=null && readOnly == "2")
	{
		$table.jqGrid("setCellReadOnly", selectedRowId,"sysParamObjDetailsDispVO.READONLY_EXPR","false");
		$table.jqGrid("setCellRequired", selectedRowId,"sysParamObjDetailsDispVO.READONLY_EXPR","true");
		apply_auto_complete(selectedRowId + "_sysParamObjDetailsDispVO.READONLY_EXPR",expression_cust_tags);
	}
	else
	{
		$table.jqGrid('setCellValue', selectedRowId,"sysParamObjDetailsDispVO.READONLY_EXPR",'');
        $table.jqGrid("setCellReadOnly", selectedRowId,"sysParamObjDetailsDispVO.READONLY_EXPR","true");
		$table.jqGrid("setCellRequired", selectedRowId,"sysParamObjDetailsDispVO.READONLY_EXPR","false");
	}
	
	//2 = visibility expression
	if(visibility!=null && visibility == "2")
	{
		$table.jqGrid("setCellReadOnly", selectedRowId,"sysParamObjDetailsDispVO.VISIBILITY_EXPR","false");
		$table.jqGrid("setCellRequired", selectedRowId,"sysParamObjDetailsDispVO.VISIBILITY_EXPR","true");
		apply_auto_complete(selectedRowId + "_sysParamObjDetailsDispVO.VISIBILITY_EXPR",expression_cust_tags);
	}
	else
	{
		$table.jqGrid('setCellValue', selectedRowId,"sysParamObjDetailsDispVO.VISIBILITY_EXPR",'');
        $table.jqGrid("setCellReadOnly", selectedRowId,"sysParamObjDetailsDispVO.VISIBILITY_EXPR","true");
		$table.jqGrid("setCellRequired", selectedRowId,"sysParamObjDetailsDispVO.VISIBILITY_EXPR","false");
	}
	
	//2 = required expression
	if(mandatory!=null && mandatory == "2")
	{
		$table.jqGrid("setCellReadOnly", selectedRowId,"sysParamObjDetailsDispVO.MANDATORY_EXPR","false");
		$table.jqGrid("setCellRequired", selectedRowId,"sysParamObjDetailsDispVO.MANDATORY_EXPR","true");
		apply_auto_complete(selectedRowId + "_sysParamObjDetailsDispVO.MANDATORY_EXPR",expression_cust_tags);
	}
	else
	{
		$table.jqGrid('setCellValue', selectedRowId,"sysParamObjDetailsDispVO.MANDATORY_EXPR",'');
        $table.jqGrid("setCellReadOnly", selectedRowId,"sysParamObjDetailsDispVO.MANDATORY_EXPR","true");
		$table.jqGrid("setCellRequired", selectedRowId,"sysParamObjDetailsDispVO.MANDATORY_EXPR","false");
	}
	
	//if the column is required then the column must be editable and visible
	if(mandatory == "1")
	{
		$table.jqGrid('setCellValue', selectedRowId,"sysParamObjDetailsDispVO.IS_READONLY",'0');
		$table.jqGrid('setCellValue', selectedRowId,"readOnlyComboDesc",'0');
		$table.jqGrid("setCellReadOnly", selectedRowId,"readOnlyComboDesc","true");
		$table.jqGrid('setCellValue', selectedRowId,"sysParamObjDetailsDispVO.READONLY_EXPR",'');
        $table.jqGrid("setCellReadOnly", selectedRowId,"sysParamObjDetailsDispVO.READONLY_EXPR","true");
		$table.jqGrid("setCellRequired", selectedRowId,"sysParamObjDetailsDispVO.READONLY_EXPR","false");
		
		$table.jqGrid('setCellValue', selectedRowId,"sysParamObjDetailsDispVO.IS_VISIBLE",'1');
		$table.jqGrid('setCellValue', selectedRowId,"visibilityComboDesc",'1');
		$table.jqGrid("setCellReadOnly", selectedRowId,"visibilityComboDesc","true");
		$table.jqGrid('setCellValue', selectedRowId,"sysParamObjDetailsDispVO.VISIBILITY_EXPR",'');
        $table.jqGrid("setCellReadOnly", selectedRowId,"sysParamObjDetailsDispVO.VISIBILITY_EXPR","true");
		$table.jqGrid("setCellRequired", selectedRowId,"sysParamObjDetailsDispVO.VISIBILITY_EXPR","false");
	}
	else
	{
		$table.jqGrid("setCellReadOnly", selectedRowId,"readOnlyComboDesc","false");
		$table.jqGrid("setCellReadOnly", selectedRowId,"visibilityComboDesc","false");
	}
	
	// if read only from dev mode is true then the readonly and required combo must be disabled
	var readOnlyFromDev = checkIfReadOnlyFrmDevMode(columnName);
	if(readOnlyFromDev)
	{
		$table.jqGrid("setCellReadOnly", selectedRowId,"readOnlyComboDesc","true");
		$table.jqGrid('setCellValue', selectedRowId,"sysParamObjDetailsDispVO.IS_READONLY",'1');
		$table.jqGrid('setCellValue', selectedRowId,"readOnlyComboDesc",'1');
		$table.jqGrid('setCellValue', selectedRowId,"sysParamObjDetailsDispVO.READONLY_EXPR",'');
        $table.jqGrid("setCellReadOnly", selectedRowId,"sysParamObjDetailsDispVO.READONLY_EXPR","true");
		$table.jqGrid("setCellRequired", selectedRowId,"sysParamObjDetailsDispVO.READONLY_EXPR","false");
		
		$table.jqGrid("setCellReadOnly", selectedRowId,"mandatoryComboDesc","true");
		$table.jqGrid('setCellValue', selectedRowId,"sysParamObjDetailsDispVO.IS_MANDATORY",'0');
		$table.jqGrid('setCellValue', selectedRowId,"mandatoryComboDesc",'0');
		$table.jqGrid('setCellValue', selectedRowId,"sysParamObjDetailsDispVO.MANDATORY_EXPR",'');
        $table.jqGrid("setCellReadOnly", selectedRowId,"sysParamObjDetailsDispVO.MANDATORY_EXPR","true");
		$table.jqGrid("setCellRequired", selectedRowId,"sysParamObjDetailsDispVO.MANDATORY_EXPR","false");
	}
}

/**
 * set the column name for columnNamesCombo on loading the grid data and in case if it is not new the we make it readonly.
 * @returns
 */
function objCust_setColumnNamesCombo()
{
	var $table 				= $("#ObjectCustDetailsGrid_Id_" + custScrPageRef);
	var rowIds				= $table.jqGrid('getDataIDs');
	for(var i = 0 ; i < rowIds.length ; i++)
	{
		$table.jqGrid('getRowData',rowIds[i])
		$table.jqGrid('setCellValue', rowIds[i],"columnNameComboDesc",getTitle($table.jqGrid('getRowData',rowIds[i])["sysParamObjDetailsDispVO.OBJ_DET_NAME"]));
		if(rowIds[i].indexOf("new") === -1)
		{
			$table.jqGrid("setCellReadOnly", rowIds[i],"columnNameComboDesc","true");
		}
	}
}
/**
 * retrun column names for the existing rows in the grid.
 * @returns
 */
function getColumnNames()
{
	var $table 				= $("#ObjectCustDetailsGrid_Id_" + custScrPageRef);
	var rowIds				= $table.jqGrid('getDataIDs');
	var myArr				= [];
	for(var i = 0 ; i < rowIds.length ; i++)
	{
		var selectedRowObject = $table.jqGrid('getRowData',rowIds[i]);
		if(selectedRowObject["columnNameComboDesc"] != null && selectedRowObject["columnNameComboDesc"]!='' )
		{
			myArr.push(selectedRowObject["columnNameComboDesc"])
		}
	}
	return myArr;
}

/**
 * return the translated name for the key for the customized grid.
 * @param name
 * @returns
 */
function getTitle(name)
{
	var gridId = $('#objectId').val();
	var $table = $("#"+gridId + "_" + custScrPageRef);
	var rowData = $table.jqGrid('getGridParam','colModel');
	var rowDataName = $table.jqGrid('getGridParam','colNames');
	for(var i=0; i<rowData.length; i++)
 	{
		if(name == rowData[i].name )
        return rowDataName[i];
 	}
	return name;
}



function exportScreenCustomization(exportType) 
{
	var theCheckBox =  $("#fldcust_specificMenu_"+custScrPageRef);
	var isCheckBoxChked = theCheckBox.is(":checked");
	params = {
		"custSC.cutomizationPROG_REF" : custScrPageRef,
		"custSC.exportCustType" : exportType,
		"custSC.sysParamObjDispVO.OBJECT_ID" : $("#objectId").val(),
		"custSC.useSpecificPageRef" : isCheckBoxChked};

var urlSrc = jQuery.contextPath + '/path/objectCustomization/objectCustomizationFileMaint_exportObjectCustomization'

_showProgressBar(true);
$.fileDownload(urlSrc,
{
successCallback: function (url) {
	_showProgressBar(false);
},
failCallback: function (html, url) {	 
    _showErrorMsg(html);
},
data:params
});
		
}

function checkIfReadOnlyFrmDevMode(columnName)
{
	var isReadOnly = false;
	var gridId = $('#objectId').val();
	var $table = $("#"+gridId + "_" + custScrPageRef);
	var rowData = $table.jqGrid('getGridParam','colModel');
	for(var i=0; i<rowData.length; i++)
 	{
		if(columnName == rowData[i].name )
		{
			// fixing Read-only column in column customization for live search is not set to read-only
			if ((rowData[i].editable == false || rowData[i].editable == undefined)
					&& rowData[i].fromCustomization != true)
			{
				isReadOnly = true;
			}
			break;
		}
 	}
	return isReadOnly;
}
