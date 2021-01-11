function screenGeneratorMaint_processSubmit()
{
  var screenDesc = $("#dynScreenDesc").val();
  if(screenDesc == null || screenDesc =="")
  {
	 _showErrorMsg(missing_elt_msg_key,error_msg_title);
	 return;
  }
  setHtmlDiv(false);
}
function setHtmlDiv(saveAs)
{
	if(typeof $("#editor_div").html() === "undefined" || $("#editor_div").html().trim() === "") 
		return;
	
	var allDivs = [];
	var additionalDivs = [];
	var curDiv = {}
	var isDefault = saveAs;
	$("#editor_div").find("div._newdrag").each(function (i)
	{
		curDiv = {};
		curDiv["TEMPLATE_ID"] = 1//parseInt(templateId);//$(this).attr("templateId");
		curDiv["ELT_ID"] = this.id.substring(0,this.id.indexOf("_div"));
		curDiv["TOP_POS"] = parseInt(this.style.top);
		curDiv["LEFT_POS"] = parseInt(this.style.left);
		curDiv["ELT_CATEGORY"] = parseInt($(this).attr("status"));
		var _childElem = $("#editor_div").find("[id="+curDiv["ELT_ID"]+"]")[0];
		curDiv["PROP_ID"] = $("#editor_div").find("[id="+_childElem.id+"]").attr("propId");
		if(_childElem.style.width != null && typeof _childElem.style.width !="undefined" && _childElem.style.width !="")
		{			
		   curDiv["ELT_WIDTH"] = parseInt(_childElem.style.width.substring(0,_childElem.style.width.indexOf("px")));
		}
		if(typeof _childElem.style.height != "undefined" && _childElem.style.height != "")
		{
//			curDiv["ELT_HEIGHT"] = 23;
			curDiv["ELT_HEIGHT"] = parseInt(_childElem.style.height.substring(0,_childElem.style.height.indexOf("px")));
		}
		
		curDiv["ELT_TYPE"] = parseInt($(this).attr("type"));
		curDiv["techId"] = parseInt($(this).attr("techId"));
		if(typeof $(this).attr("parentTechId")!="undefined" && $(this).attr("parentTechId")!=null && $(this).attr("parentTechId")!="")
		{
			curDiv["parentTechId"] = parseInt($(this).attr("parentTechId"));
			// if current element is child tab then get propid
			var tabType = $(this).attr("tabType");
			if(curDiv["ELT_TYPE"]==14 && (typeof tabType === typeof undefined || tabType === false || tabType === ""))
			{
				curDiv["PROP_ID"] = $(this).attr("propId");
			}
		}
		if(typeof $(this).attr("value") != "undefined" && $(this).attr("value") != "null")
			curDiv["ELT_DESC"] = $(this).attr("value") ;
		/*TO-DO: to be changed*/
		var app_id="RET";
		var app_func_id = "LM01MT";
		
//		curDiv["APP_ID"] = parseInt(app_id);
//		curDiv["APP_FUNC_ID"] = app_func_id;
		if($(this).attr("defTemp") === "1" || saveAs) // saveAs clicked 
		{
		  curDiv["TEMPLATE_ID"] =  -1;
		  isDefault = true;
		}
//		curDiv["IS_DEFAULT"] = isDefault;
		/**
		 * Translation Management...
		 */
		if(typeof $(this).attr("tnsKey") != "undefined" && $(this).attr("tnsKey") !="null" && $(this).attr("tnsKey") !="")
			curDiv["TNS_KEY"] = $(this).attr("tnsKey");
		else
			curDiv["TNS_KEY"] = $(this).attr("value")+"_key";
		allDivs.push(curDiv);
	})
	var theParam ={}
	if(typeof allDivs !="undefined" && allDivs.length > 0)
	{	
	   theParam["screenData"] = "{"+ "\"root\":"+JSON.stringify(allDivs) +"}";
	   $("#screenData").val(theParam);
	}
	if(theSelectedElemID!=null && theSelectedElemID!="")
	{
		fillPropertiesJsonArray(theSelectedElemID);
	}
	theParam["dynScreenCreatorCO.sysDynScreenDefVO.DYN_SCREEN_ID"]   = $("#dynScreenId").val();
	theParam["dynScreenCreatorCO.sysDynScreenDefVO.DYN_SCREEN_DESC"] = $("#dynScreenDesc").val();
	theParam["dynScreenCreatorCO.scrTableId"] = $("#screenTableId").val();
	if (document.getElementById("screenTableGridFlagId").checked == true)
		{
		theParam["dynScreenCreatorCO.scrGridFlag"] = 1;
		}
	else
		{
		theParam["dynScreenCreatorCO.scrGridFlag"] = 0;
		}

	var createFrom = $("#createFromId").val();
	if(typeof createFrom!="undefined" && createFrom!=null && createFrom!="")
	{
		theParam["dynScreenCreatorCO.createFrom"] = createFrom;
	}
	var loadScriptData = $("#loadScriptHidData").val();
	if(loadScriptData!=null && loadScriptData!="")
	{		
	   theParam["dynScreenCreatorCO.sysDynScreenDefVO.ON_LOAD_SCRIPT"]  = loadScriptData;
	}
	var propertiesJsonArray = cachePathData("dynScreenPropertiesArray");
	if(typeof propertiesJsonArray !="undefined" && propertiesJsonArray.length > 0)
	{		
	   theParam["propertiesData"] = "{"+ "\"root\":"+JSON.stringify(propertiesJsonArray) +"}";
	}
	if(typeof theParam["screenData"] !="undefined" && typeof theParam["propertiesData"] !="undefined")
	{
			if(!elementPropertiesValidation())
			{
				   return;
			}
	}
		$.ajax({
				url : jQuery.contextPath
						+ "/path/screenGenerator/generatorMaint_checkCustomizedLinks",
				type : "post",
				dataType : "json",
				data : theParam,
				success : function(data) {
					if (typeof data["_error"] == "undefined"
							|| data["_error"] == null) {
						var theMsg = data.dynScreenCreatorCO.respMsg;
						if (theMsg != "undefined" && theMsg != null
								&& theMsg != "" && theMsg != undefined) {

							_showConfirmMsg(
									"Below screen elements are linked to customization screens, delete anyway? \n"
											+ "\n" + theMsg, confirm_msg_title,
									function(yesNo) {
										if (yesNo) {
											submitLayout(theParam);
										}
									}, "yesNo", '', '', returnMaxWidth(750));
						} else {
							submitLayout(theParam);
						}

					}
				}
			});
}
function submitLayout(theParam)
{
	$.ajax({
		 url: jQuery.contextPath+"/path/screenGenerator/generatorMaint_submitLayout",
         type:"post",
		 dataType:"json",
		 data: theParam,
		 success: function(data){
		     if(typeof data["_error"] == "undefined" || data["_error"] == null)
		     {
                screenGenerator_initializeAfterSubmit();
                if($("#screenGeneratorListGridTbl_Id").html()!=null && $("#screenGeneratorListGridTbl_Id").html()!="")
                {
                   $("#screenGeneratorListGridTbl_Id").trigger("reloadGrid");
                }
                
                // TP 890980 : Keep the Record Loaded after SaveReload dynamic screen form after submit
                var dynScreenId = $('#dynScreenId').val();
                if(dynScreenId){
                	screenGeneratorList_loadDataInTheForm(dynScreenId,null);
                }
             }
		 }
    });
}
function screenGenerator_initializeAfterSubmit()
{
	var actionSrc = jQuery.contextPath+"/path/screenGenerator/ScreenGeneratorMaintAction_initialize?";
	$.post(actionSrc, {}, function(param) {
		$("#screenGeneratorMainInfoDiv_id").html(param);
    	screenGeneratorList_initializeDataOnSuccess();
	}, "html");
}
function elementPropertiesValidation()
{
	var propertiesJsonArray = cachePathData("dynScreenPropertiesArray");
	var result = true;
	for(var i=0;i<propertiesJsonArray.length;i++)
	{
		var currentId = (propertiesJsonArray[i].propertiesValMap)["elemProp_id"];
		if(typeof currentId=="undefined" || currentId==null || currentId == "")
			{
				_showErrorMsg("Invalid Missind Ids",error_msg_title);
			    result = false;
			    break;
			}
		///////////// for rest temp table prefix is DS_REST_TMP_ ( 30 - 12= 18 ) so id length should be less than 18 ( only for Global Activity)
		var elemProp_queryData = (propertiesJsonArray[i].propertiesValMap)["elemProp_queryData"]; 
		if(typeof elemProp_queryData !="undefined" && elemProp_queryData != "")
		{
			var elemProp_queryJSON = JSON.parse(elemProp_queryData);
			var tableDataSource = (elemProp_queryJSON[0])["tableDatasource"];
			var elementIdName = (elemProp_queryJSON[0])["elementIdName"];		
			if (typeof tableDataSource != "undefined" &&  tableDataSource=="G" && currentId.length > 18 )
			{
				_showErrorMsg(id_length_less_18_key + elementIdName ,error_msg_title);
			    result = false;
			    break;
			}		
		}
	}
	return result;
}
function screenGeneratorList_onDelClicked()
{
	var _screenId = $("#dynScreenId").val();
	if(_screenId!=null && _screenId!=null && _screenId!="")
	{
		_showConfirmMsg(Confirm_Delete_Process_key, Warning_key,
		screenGeneratorList_DelAfterConfirm, {screenId : _screenId});		
	}
	else
	{
		_showErrorMsg(no_screen_selected_delete_key,info_msg_title);
	}
}
function screenGeneratorList_DelAfterConfirm(confirm,args)
{
	var theParam ={};
	theParam["dynScreenCreatorCO.sysDynScreenDefVO.DYN_SCREEN_ID"] = args.screenId;
	if(confirm)
	{
		$.ajax({
			 url: jQuery.contextPath+"/path/screenGenerator/generatorMaint_deleteScreen",
	         type:"post",
			 dataType:"json",
			 data: theParam,
			 success: function(data){
			 _showProgressBar(false);
			     if(typeof data["_error"] == "undefined" || data["_error"] == null)
			     {
                    screenGenerator_initializeAfterSubmit();	                   
	                if($("#screenGeneratorListGridTbl_Id").html()!=null && $("#screenGeneratorListGridTbl_Id").html()!="")
	                {
                       $("#screenGeneratorListGridTbl_Id").trigger("reloadGrid");
	                }
	             } 
			 }
	    });
	}
}
function screenGenerator_previewScreen()
{
	var screenId = $("#dynScreenId").val();
	dynamicScreen_openDynamicScreen(screenId,null,null,null,null,true);
}
function screenGenerator_deleteElement(e)
{
  var targetId = e.target.id;
  if(e.which == 46 && typeof theSelectedElemID !="undefined" && theSelectedElemID!=null && theSelectedElemID!="" && $("#"+theSelectedElemID).hasClass("_newdrag")
	 && (targetId == theSelectedElemID || targetId == "editor_div" || targetId == "")	  
    )
  {
	  screenGenerator_removeElemFromPropArr(theSelectedElemID);
	  $("#"+theSelectedElemID).remove();
	  theSelectedElemID = "";
	  $("#elementPropertiesWidId").html(null);
  } 
}
function screenGenerator_removeElemFromPropArr(selectedDivId)
{
   var elementId = "";	
   if(selectedDivId.indexOf("new_") != -1)
   {
	  elementId =  selectedDivId.split("_")[1];
   }
   else
   {
	  elementId =  selectedDivId.split("_")[0]; 
   }
   var propertiesJsonArray = cachePathData("dynScreenPropertiesArray");
   if(typeof propertiesJsonArray !="undefined" && propertiesJsonArray!=null)
   {	   
	   for(var i=0;i<propertiesJsonArray.length;i++)
	   {
		   var currentElemId = propertiesJsonArray[i].elementId;
		   if(currentElemId == elementId)
		   {
			  propertiesJsonArray.splice(i,1);
		   }
	   }
	   cachePathData("dynScreenPropertiesArray",propertiesJsonArray);
   }
}
function screenGeneratorProp_openOptionsScreen(elementId)
{
	var	optionsScreenDiv = $("<div id='dyn_options_screen_div' class='path-common-sceen'></div>");
	optionsScreenDiv.css("padding","0");
	optionsScreenDiv.insertAfter($('body'));
		
	var screenId = $("#dynScreenId").val();
	var optionsData = $("#"+elementId+"_optionData").val();
    
	var curParams = {"criteria.screenId":screenId,"criteria.elementId":elementId,"criteria.optionsData":optionsData};
	    
	_showProgressBar(true);
	var srcURL = jQuery.contextPath+"/path/screenGenerator/generatorMaint_loadOptionsScreen?";
	
	var buttonsArr = {};
	buttonsArr[ok_label_trans] = function() {
		optionGrid_saveOptionsDetails();
		$(this).dialog("close");
	};

	var _dialogOptions = {modal:true, 
			                  title: (typeof options_screen_title_key === "undefined")?"Options Screen" :options_screen_title_key ,
			                  autoOpen:false,
			                  show:'slide',
			                  position:'center', 
			                  width:returnMaxWidth(400),
			                  height:returnMaxHeight(350),
			                  buttons : buttonsArr,
			                  close: function (){
								     var theDialog = $(this);
								     theDialog.dialog("destroy");
								     theDialog.remove();
								    }
		    		         };
	$("#dyn_options_screen_div").load(srcURL, curParams, function() {_showProgressBar(false);});
	$("#dyn_options_screen_div").dialog(_dialogOptions);
	$("#dyn_options_screen_div").dialog("open");
    _showProgressBar(false);
}
function optionsGrid_addOption()
{
	var $optionsGridId = $("#optionsGridId"); 
	var rowId = $optionsGridId.jqGrid("addInlineRow",{});
	$optionsGridId.jqGrid('setSelection',rowId, false);
}
function optionsGrid_delOption()
{
	var $optionsGridId = $("#optionsGridId"); 
	var selectedRowId = $optionsGridId.jqGrid('getGridParam', 'selrow');
	$optionsGridId.jqGrid('deleteGridRow',selectedRowId);
}
function optionGrid_checkOptionsData()
{
	var $table        = $("#optionsGridId");
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var myObject      = $table.jqGrid('getRowData', selectedRowId);
	var enteredCode = myObject["code"];
	
    var rowIds        = $("#optionsGridId").jqGrid('getDataIDs');
    for(var i = 0; i < rowIds.length; i++) 
    {
    	var rowId = rowIds[i];
    	var currObject = $table.jqGrid('getRowData', rowId);
    	var currCode   = currObject["code"]; 
    	if(rowId!= selectedRowId && enteredCode === currCode)
    	{
    		_showErrorMsg("Duplicated Code",info_msg_title);
    		$table.jqGrid('setCellValue',selectedRowId,"code",null);
    		return;
    	}
    }
}
function optionGrid_saveOptionsDetails()
{
    var $table    = $("#optionsGridId");
	var gridData  = $table.jqGrid("getAllRows");
	var elementId = $("#elementId").val();
	if(typeof gridData != "undefined" && gridData != null && gridData != "")
	{		
		jsonGridData = $.parseJSON(gridData);
		$("#"+elementId+"_optionData").val(JSON.stringify(jsonGridData["root"]));
	}
	else
	{
		$("#"+elementId+"_optionData").val(null);
	}
}
function optionGrid_onDefaultValueChange(e)
{
    var $table = $("#optionsGridId");
    var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var myObject  = $table.jqGrid('getRowData', selectedRowId);
	var isChecked = myObject["defaultValue"];
	if(isChecked == 1)
	{		
	    var rowIds = $table.jqGrid('getDataIDs');
		$.each(rowIds, function(index,rowId) {
			if(rowId != selectedRowId) {
					$table.jqGrid("setCellEltValue",rowId,"defaultValue",0);
			}
		});
	}
	
}
function screenGeneratorProp_openQueryScreen(elementId,rowId,elementType,elementProperty)
{
	var	optionsScreenDiv = $("<div id='dyn_query_screen_div' class='path-common-sceen'></div>");
	optionsScreenDiv.css("padding","0");
	optionsScreenDiv.insertAfter($('body'));
	
	var screenId = $("#dynScreenId").val();
		// rowId is defined for ColProperties
		if (rowId == undefined)
		{
			//case of retrieval condition select condition value from hidden element
			if(elementProperty == 'retCond')
			{
				var queryData = $("#"+elementId+"_condData").val();
			}
			else
			{
				var queryData = $("#"+elementId+"_queryData").val();
			}
		}
		else
		{
			var queryData = $("#dynScrGridWidgetColPropsId").jqGrid('getCell', rowId,'QUERY_DATA');
		}

    
	var curParams = {"criteria.screenId":screenId,"criteria.elementId":elementId,"criteria.queryData":queryData};
	
	if(typeof elementType != 'undefined' && elementType != undefined && elementType != null)
	{
		curParams["criteria.elementType"] = elementType;
	}
	if(typeof elementProperty != 'undefined' && elementProperty != undefined && elementProperty != null )
	{
		curParams["criteria.elementProperty"] = elementProperty;
	}
	
		curParams["criteria.tableName"] = $("#lookuptxt_"+elementId+"_tableName").val();//tableName;

	_showProgressBar(true);
	var srcURL = jQuery.contextPath+"/path/screenGenerator/generatorMaint_loadQueryScreen?";
	
	var buttonsArr = {};
	buttonsArr[ok_label_trans] = function() {
		optionGrid_saveQueryDetails($(this),rowId,elementProperty,screenId);
	};

	var _dialogOptions = {modal:true, 
			                  title: (elementProperty === "retCond")? retrievalCondKey:queryKey ,
			                  autoOpen:false,
			                  show:'slide',
			                  position:'center', 
			                  width:returnMaxWidth(565),
			                  height:returnMaxHeight(336),
			                  buttons : buttonsArr,
			                  close: function (){
								     var theDialog = $(this);
								     theDialog.dialog("destroy");
								     theDialog.remove();
								    }
		    		         };
	$("#dyn_query_screen_div").load(srcURL, curParams, function() {_showProgressBar(false);});
	$("#dyn_query_screen_div").dialog(_dialogOptions);
	$("#dyn_query_screen_div").dialog("open");

}
/**
 * function used to load filter screen
 * @param elementId
 * @param rowId
 * @param elementType
 * @returns
 */
function optionGrid_saveQueryDetails(theDialog,rowId,elementProperty,screenId)
{
	var tableDatasource= $('#tableDatesource').val();
	if (tableDatasource=='G' )
		optionGrid_validateGridRestDetails(theDialog);
	else 
	{
    var querySynthax = $("#querySynthax").val();
    var columnCode   = $("#queryColumnCode").val();
    var columnDesc   = $("#queryColumnDesc").val();
    var elementId    = $("#elementId").val();
    var elementType  = $("#elementType").val();
    var propertyCode    = $("#propertyCode").val();
    var queryInfo    = {};
    var params       = {};
    var result       = []
    //case of retrieval condition
    if(elementProperty =='retCond')
	{
    	params["dynScreenQueryCO.retCond"] = true;
    	var tableName = $("#lookuptxt_"+elementId+"_tableName").val();
    	 if(tableName=="null" || tableName=="")
 	    {
 	       _showErrorMsg("Table Name",missing_elt_msg_key);
 	       return;
 	    }
    	params["dynScreenQueryCO.tableName"] = tableName;
	}
	//querySyntax can be null/empty for retreival condition but not for query
    else if(querySynthax==null || querySynthax=="")
    {
       _showErrorMsg("query synthax",missing_elt_msg_key);
       return;
    }
    //in case of grid we dont need to check on col code and col desc
    if(elementType != '12')
    {	
	    if(columnCode==null || columnCode=="")
	    {
	       _showErrorMsg("Column Code",missing_elt_msg_key);
	       return;
	    }
	    if(columnDesc==null || columnDesc=="")
	    {
	       _showErrorMsg("column Desc",missing_elt_msg_key);
	       return;
	    }
    }
    queryInfo["columnCode"]   = columnCode;
    queryInfo["columnDesc"]   = columnDesc;
    queryInfo["querySynthax"] = querySynthax;
    queryInfo["tableDatasource"] = tableDatasource;
        
    params["criteria.tableDatasource"] 		= tableDatasource;
    params["dynScreenQueryCO.columnCode"]   = columnCode;
    params["dynScreenQueryCO.columnDesc"]   = columnDesc;
    params["dynScreenQueryCO.querySynthax"] = querySynthax;
    params["dynScreenQueryCO.elementType"] = elementType;
    params["dynScreenQueryCO.ScreenId"] = screenId;
    var propertiesJsonArray = cachePathData("dynScreenPropertiesArray");
	if(typeof propertiesJsonArray !="undefined" && propertiesJsonArray.length > 0)
	{		
		params["propertiesData"] = "{"+ "\"root\":"+JSON.stringify(propertiesJsonArray) +"}";
	}
	_showProgressBar(true);
    $.ajax({
		 url: jQuery.contextPath+"/path/screenGenerator/generatorMaint_checkQueryValidation",
         type:"post",
		 dataType:"json",
		 data: params,
		 success: function(data){
		     _showProgressBar(false);
		     if(typeof data["_error"] == "undefined" || data["_error"] == null)
		     {
		    	var newColCode = data.dynScreenQueryCO.columnCode;
		    	if(newColCode != null && newColCode != 'undefined' && newColCode != undefined && newColCode != '')
	    		{
		    	 queryInfo["columnCode"] = data.dynScreenQueryCO.columnCode;
	    		}
			    result.push(queryInfo);
			    
			    if(rowId==undefined)
			    {
			    	if(elementProperty =='retCond')
			    	{
			    		$("#"+elementId+"_condData").val(JSON.stringify(result));
			    	}
			    	else 
			    	{
			    	if ( elementType == "3" )
			    		$("#"+elementId+"_optionData").val(JSON.stringify(result));
			    	else 
			    		$("#"+elementId+"_queryData").val(JSON.stringify(result));
			    	}
			    }
			    else
			    {
			    	var queryData = JSON.stringify(result);
				    $("#dynScrGridWidgetColPropsId").jqGrid('setCellValue', rowId, 'QUERY_DATA', queryData);
			    }
			    
				theDialog.dialog("close");
             }
		 }
    });
  }
}
function screenGenerator_onIdPropertyChange(propertyId)
{
	var currValue = $("#"+propertyId).val();	
	var elementId = propertyId.split("_")[0];
	$("[propId="+currValue+"]").each(
		function(){
			var currElementId = this.id;
			if(currElementId != elementId)
			{
				_showErrorMsg("Duplicated Id",error_msg_title);
				$("#"+propertyId).val(null);
				return;
			}
		}
	);

	var prevVal =$("#"+propertyId).attr("prevvalue");
	var screenId  = $("#dynScreenId").val();    
	var curParams = {"criteria.screenId":screenId,"criteria.elementId":prevVal, "criteria.onLoadExp":currValue};

	if($("#"+elementId).length > 0)
	{
		$("#"+elementId).attr("propId",currValue);
	}
	else if($("#new_"+elementId).length > 0)
	{
		$("#new_"+elementId).attr("propId",currValue);
	}
	// Check if livesearch items are already loaded then update
	// the lookupDesc property
	var propertiesJsonArray = cachePathData("dynScreenPropertiesArray");
	if (typeof propertiesJsonArray == "undefined"
			|| propertiesJsonArray == null) {
		propertiesJsonArray = [];
	}
	var lookupNotUpdated = true;
	for (var i = 0; i < propertiesJsonArray.length; i++) {
		if ((propertiesJsonArray[i])["propertiesValMap"]["elemProp_lookupDesc"] == prevVal) {
			(propertiesJsonArray[i])["propertiesValMap"]["elemProp_lookupDesc"] = currValue;
			$("#" + propertyId).attr("prevvalue", currValue);
			lookupNotUpdated = false;
		}
	}
	cachePathData("dynScreenPropertiesArray", propertiesJsonArray);
	if(lookupNotUpdated)
		{
		$.ajax({
			url : jQuery.contextPath
					+ '/path/dynamicScreen/dynDependencyAction_textIdDependency',
			type : "post",
			data : curParams
		});
		}

}

function screenGeneratorProp_openBtnSourceScreen(elementId,elementType,forChange)
{
	var	optionsScreenDiv = $("<div id='dyn_btn_source_screen_div' class='path-common-sceen'></div>");
	optionsScreenDiv.css("padding","0");
	optionsScreenDiv.insertAfter($('body'));
	
	var screenId  = $("#dynScreenId").val();
	var btnSource;
	var curParams = {"criteria.screenId":screenId,"criteria.elementId":elementId,"criteria.elementType":elementType};
	if(typeof forChange!="undefined" && forChange!=null && forChange!="" && forChange=="1")
	{
		btnSource  = $("#"+elementId+"_onChangeData").val();
		curParams["criteria.forChange"] = forChange;
	}
	else
	{
		btnSource  = $("#"+elementId+"_sourceData").val();
	}
	curParams["criteria.sourceData"] = btnSource;
	
	    
	_showProgressBar(true);
	var srcURL = jQuery.contextPath+"/path/screenGenerator/ScreenGeneratorMaintAction_loadBtnSourceScreen?";
	
	var buttonsArr = {};
	
	// TP #890998 : If the button already added and saved to DB, a save button occur in the dialog allowing user to save all changes done in the dialog.
	// elementType = 8, element of type button.
	if(elementType != '8' || $('#new_' + elementId + '_div').length > 0)
	{
		buttonsArr[ok_label_trans] = function() {
			screenGeneratorProp_saveBtnSourceDetails($(this),forChange);
		};
	}
	else
	{
		buttonsArr[saveLabel] = function() {
			screenGeneratorProp_submitBtnSourceDetails($(this),forChange);
		};
	}
	
	buttonsArr[cancel_label_trans] = function() {
		$(this).dialog("close");
	};

	var _dialogOptions = {modal:true, 
			                  title: (typeof btn_source_screen_title_key === "undefined")?"Button Source" :btn_source_screen_title_key ,
			                  autoOpen:false,
			                  show:'slide',
			                  position:'center', 
			                  width:returnMaxWidth(750),
			                  height:returnMaxHeight(450),
			                  buttons : buttonsArr,
			                  close: function (){
								     var theDialog = $(this);
								     theDialog.dialog("destroy");
								     theDialog.remove();
								    }
		    		         };
	$("#dyn_btn_source_screen_div").load(srcURL, curParams, function() {_showProgressBar(false);});
	$("#dyn_btn_source_screen_div").dialog(_dialogOptions);
	$("#dyn_btn_source_screen_div").dialog("open");

}


/**
 * TP #890998 : Function that save the button source dialog details in dynamic screen
 * 
 * @author	Hussein Zaraket
 * @param 	theDialog
 * @param 	forChange
 */
function screenGeneratorProp_submitBtnSourceDetails(theDialog,forChange)
{
	var sourceType   = $("#selButtonSrcType").val();
    var elementId    = $("#elementId").val();
    var sourceInfo   = {};
    
    _showProgressBar(true);
   
    if(sourceType == "1") // dynamic screen
    {
    	sourceInfo["sourceScreenId"] 		= $("#lookuptxt_btnSourceScreenId").val();
    	sourceInfo["sourceScreenWidth"] 	= $('#screenWidth_'+ _pageRef).val();
    	sourceInfo["sourceScreenHeight"] 	= $('#screenHeight_' + _pageRef).val();
    	sourceInfo["sourceScreenTitle"] 	= $('#screenTitle_' + _pageRef).val();
    	screenGeneratorProp_dynamicScrParamMapUpdate(sourceInfo, true);
    }
    else if(sourceType == "2") // script
    {
    	sourceInfo["sourceScriptData"] = $("#btnSource_scriptId").val();
    }
    else if(sourceType == "3") // global activity
    {
    	sourceInfo["sourceGlobalActivityId"] = $("#lookuptxt_btnSourceActivityId").val();
    	screenGeneratorProp_dynamicScrParamMapUpdate(sourceInfo, true);
    }
    
    sourceInfo["elementId"] 	= elementId;
    sourceInfo["sourceType"] 	= sourceType;
    
    var theParam = {};
    theParam['propertiesData'] = JSON.stringify(sourceInfo);
    theParam['dynScreenCreatorCO.sysDynScreenDefVO.DYN_SCREEN_ID'] = $("#dynScreenId").val();
    
    $.ajax({
		url: jQuery.contextPath+"/path/screenGenerator/generatorMaint_submitBtnSourceDialog",
        type:"post",
        dataType:"json",
		data: theParam,
		success: function(data){
			_showProgressBar(false);
		     if(typeof data["_error"] == "undefined" || data["_error"] == null)
		     {
		    	 delete sourceInfo["elementId"];
		    	 delete sourceInfo["scrParamMapGridUpdate"];
		    	 var result = [];
		    	 result.push(sourceInfo);
		    	 if(typeof forChange!="undefined" && forChange!=null && forChange!="" && forChange=="1")
		    	 {
	    			$("#"+elementId+"_onChangeData").val(JSON.stringify(result));
		    	 }
		    	 else
		    	 {		
	    			$("#"+elementId+"_sourceData").val(JSON.stringify(result));
		    	 }
		    	 theDialog.dialog("close");
		     }
        }
    });
}

function screenGeneratorProp_saveBtnSourceDetails(theDialog,forChange)
{
	var sourceType   = $("#selButtonSrcType").val();
    var elementId    = $("#elementId").val();
    var sourceInfo   = {};
    var result       = []
    var intScreenId  = null;
    var scriptData   = "";
    
    sourceInfo["sourceType"] = sourceType;
    if(sourceType == "1")
    {
    	intScreenId   = $("#lookuptxt_btnSourceScreenId").val();
    	sourceInfo["sourceScreenId"] = intScreenId;
    	
    	sourceInfo["sourceScreenWidth"] = $('#screenWidth_'+ _pageRef).val();
    	sourceInfo["sourceScreenHeight"] = $('#screenHeight_' + _pageRef).val();
    	
    	screenGeneratorProp_dynamicScrParamMapUpdate(sourceInfo, true);
    }
    else if (sourceType == "2")
    {
    	scriptData = $("#btnSource_scriptId").val();
    	sourceInfo["sourceScriptData"] = scriptData;
    	
    }
    else
    {
    	var globalActId   = $("#lookuptxt_btnSourceActivityId").val();
    	sourceInfo["sourceGlobalActivityId"] = globalActId;
    	screenGeneratorProp_dynamicScrParamMapUpdate(sourceInfo, true);
    }
	result.push(sourceInfo);
	if(typeof forChange!="undefined" && forChange!=null && forChange!="" && forChange=="1")
	{
		$("#"+elementId+"_onChangeData").val(JSON.stringify(result));
	}
	else
	{		
		$("#"+elementId+"_sourceData").val(JSON.stringify(result));
	}
	theDialog.dialog("close");
}

function screenGeneratorProp_dynamicScrParamMapUpdate(sourceInfo, stopProcessing)
{
	var $table = null;
	//Bug#960032 fix undefined currentPageRef
	if(currentPageRef == undefined)
	{
		currentPageRef = _pageRef;
	}
	if($('#dynScreenParamMapGrid_Id_' + _pageRef).length > 0)
	{
		$table = $("#dynScreenParamMapGrid_Id_" + _pageRef);
		
	}
	else if(openedFromDynamicScreen(currentPageRef))
	{
		$table = $("#ButtonCustParamMapGrid_Id_" + currentPageRef);
	}
	
	if($table != null)
	{
		var checkRequiredCells = $table.jqGrid('checkRequiredCells');
		if(checkRequiredCells)
		{	
			var jsonOpUpdates = $table.jqGrid('getChangedTrimRowData',false);
			sourceInfo["scrParamMapGridUpdate"] = jsonOpUpdates;
		}
		else if(stopProcessing)
		{
			return; 
		}
	}
}

function screenGeneratorProp_returnGridScreenParam(gridId,lookupIds,radioIds)
{
	var $table  = $("#"+gridId);
	var screenParamMap = {}; 
	var screenParamListVal = $("#"+gridId+"_screenParamList").val();
	if(screenParamListVal != undefined && screenParamListVal != null && screenParamListVal != '' )
	{
		var screenParamArr = eval(screenParamListVal);
		if( screenParamArr != undefined && screenParamArr != null && screenParamArr.length > 0 )
		{
			//if screenParam id is for element of type liveSearch then append "lookup_txt" to the id
			if(lookupIds!= undefined && lookupIds != null && lookupIds.length > 0)
			{
				$.each(screenParamArr , function(index, val) { 
					
					if((lookupIds.indexOf("lookuptxt_"+val)>-1)|| (lookupIds.indexOf("lookuptxt_"+val+"_"+_pageRef)>-1))
					{
						screenParamArr[index] = "lookuptxt_"+val;
					}
					
				  
				});
			}
			for(var i=0; i<screenParamArr.length; i++)
			{
				var inputId = screenParamArr[i];
				var inputElem = $('#'+inputId);
				var htmlInputId = inputId;
				if(inputElem == undefined || inputElem == null || inputElem.length <= 0)
				{
					htmlInputId = inputId + "_" + _pageRef;
					inputElem = $('#'+ htmlInputId );
				}
				if(inputElem == undefined || inputElem == null || inputElem.length <= 0)
				{
					htmlInputId = "lookuptxt_" + inputId;
					inputElem = $('#'+ htmlInputId );
				}
				if(inputElem == undefined || inputElem == null || inputElem.length <= 0)
				{
					htmlInputId = "lookuptxt_" + inputId + "_" + _pageRef;
					inputElem = $('#'+ htmlInputId );
				}
				if(inputElem != undefined && inputElem != null && inputElem.length > 0)
				{
					var inputValue = returnHtmlEltValue(htmlInputId);
					var inputMode = 'text';
					var inputModeAttr = inputElem.attr('mode');
					if(inputModeAttr != undefined && inputModeAttr != null && inputModeAttr != '')
					{
						inputMode = inputModeAttr;
					}
					
					screenParamMap[inputId] = {'inputValue':inputValue,'inputMode':inputMode};
				}
			}
		}
			
	}
	else 
	{
		///// US 853476 Muhammad.Asif
		screenParamListVal = screenGeneratorProp_returnAllElementsIdsForGrid();
		if(screenParamListVal != undefined && screenParamListVal != null && screenParamListVal != '' )
		{
			var paramArray = eval(screenParamListVal);
			var screenParamArr = [];
			$.each(paramArray, function(i,e){
			    if(e.indexOf('screen.') > -1)
			    	screenParamArr.push(e);
			});
			if( screenParamArr != undefined && screenParamArr != null && screenParamArr.length > 0 )
			{
				for(var i=0; i<screenParamArr.length; i++)
				{
					var inputId = screenParamArr[i].substring(screenParamArr[i].indexOf("screen.")+7, screenParamArr[i].length-1);
					var inputElem = $('#'+inputId);
					var htmlInputId = inputId;
					if(inputElem == undefined || inputElem == null || inputElem.length <= 0)
					{
						htmlInputId = inputId + "_" + _pageRef;
						inputElem = $('#'+ htmlInputId );
					}
					if(inputElem == undefined || inputElem == null || inputElem.length <= 0)
					{
						htmlInputId = "lookuptxt_" + inputId;
						inputElem = $('#'+ htmlInputId );
					}
					if(inputElem == undefined || inputElem == null || inputElem.length <= 0)
					{
						htmlInputId = "lookuptxt_" + inputId + "_" + _pageRef;
						inputElem = $('#'+ htmlInputId );
					}
					if(inputElem != undefined && inputElem != null && inputElem.length > 0)
					{
						var inputValue = returnHtmlEltValue(htmlInputId);
						var inputMode = 'text';
						var inputModeAttr = inputElem.attr('mode');
						if(inputModeAttr != undefined && inputModeAttr != null && inputModeAttr != '')
						{
							inputMode = inputModeAttr;
						}
						
						screenParamMap[inputId] = {'inputValue':inputValue,'inputMode':inputMode};
					}
				}
				//Add radio Id to params
				if(radioIds!= undefined && radioIds != null && !jQuery.isEmptyObject(radioIds))
				{
					$.each(screenParamArr , function(index, val) { 
						var rId = screenParamArr[index];
						if(radioIds[rId]== undefined){//if radioButton id doesn't exist in list add progref
							rId = rId +"_"+_pageRef;
						}
						if(radioIds[rId]!= undefined){//if radioButton id in list
						var inputMode = 'text';
						screenParamMap[screenParamArr[index]] = {'inputValue':radioIds[rId],'inputMode':inputMode};
						}
						});
				}

			}
		}
	}	
	return JSON.stringify(screenParamMap);
}

function screenGeneratorProp_onBeforTopic(gridId,rowObj, formId)
{
	var dynScreenId = $("#dynScreenId").val();
	var $gridElem = $('#'+gridId);
	var lookupIds=[];
	var radioIds = {}; 
	var fId = "#"+formId;
	if(rowObj != undefined && rowObj != null
			&& rowObj.originalEvent != undefined && rowObj.originalEvent != null 
				&& rowObj.originalEvent.xhr != undefined && rowObj.originalEvent.xhr != null 
					&& rowObj.originalEvent.xhr.data != undefined && rowObj.originalEvent.xhr.data != null && rowObj.originalEvent.xhr.data != '')
	{
		//get lookup ids for screen parameters which exists in the form of dynamic Screen
		$(fId+' input[id^="lookuptxt_"][name^="dynElem_"]').each(function () {
		    {
		    	lookupIds.push(this.id);
		    }  
		});
		
		//get radio ids for screen parameters which exists in the form of dynamic Screen
		$(fId+' input[type="radio"]:checked').each(function () {
			var radioId = this.id.substring(0,this.id.length-this.value.length);//get radioId without selected value
			var checkedRadioId =this.value;//selected value
			radioIds[radioId]=checkedRadioId;
		});

		var gridScreenParam = screenGeneratorProp_returnGridScreenParam(gridId,lookupIds,radioIds);
		var values = $gridElem.jqGrid('getGridParam').postData;
		var index;
		var newParamsObj = {};


		// replace screenParamMap if there
		values["screenParamMap"] = gridScreenParam;
		
		// encrypt parameters string
		rowObj.originalEvent.xhr.data = returnEncryptedData($.param(values));
	}

	$gridElem.data('toreloadgrid',true);
}

function screenGeneratorProp_onGridCompleteTopicReload(gridId,params,formId)
{
	var dynScreenId = $("#dynScreenId").val();
	var $table  = $("#"+gridId);
	var lookupIds=[];
	var radioIds = {};
	var fId = "#"+formId;
		var gridUrl = jQuery.contextPath+"/path/dynamicScreen/dynScrGridListAction_loadDynScrGridWidget";
		var toreloadgrid = $table.data('toreloadgrid');
		if(toreloadgrid == false)
		{
			return;
		}
		if(params == undefined|| params == null )
		{
			params = {};
		}	
		
		if( $table != null && $table != undefined)
		{
			//get lookup ids for screen parameters which exists in the form of dynamic screen
			$(fId+' input[id^="lookuptxt_"][name^="dynElem_"]').each(function () {
			    if( (this.id.indexOf(this.id.substring(10,this.id.length)) > -1))
			    {
			    	lookupIds.push(this.id);
			    }  
			});
			//get radio ids for screen parameters which exists in the form of dynamic screen
			
			$(fId+' input[type="radio"]:checked').each(function () {
				var radioId = this.id.substring(0,this.id.length-this.value.length);//get radioId without selected value
				var checkedRadioId =this.value;//selected value
				radioIds[radioId]=checkedRadioId;
				});
			
			var gridScreenParam = screenGeneratorProp_returnGridScreenParam(gridId,lookupIds,radioIds);
			params["screenParamMap"] = gridScreenParam;
			$table.jqGrid('setGridParam', {url : gridUrl, datatype : 'json', postData : params}).trigger("reloadGrid");
			$table.data('toreloadgrid',false);
		}
}

function screenGeneratorProp_returnAllElementsIdsForGrid(withFormId)
{
	var btnScriptExpTags = new Array();
	if(typeof expression_cust_grid_tags !="undefined" && expression_cust_grid_tags!=null && expression_cust_grid_tags.length > 0)
	{	
		for(var i=0;i<expression_cust_grid_tags.length;i++)
		{
			btnScriptExpTags.push(expression_cust_grid_tags[i]);
		}
	}
	if(withFormId)
	{		
 	   btnScriptExpTags.push("[formId]");
	}
	$("#editor_div > div >[propId]").each(function(i){
		var currPropId = $("#editor_div").find("[id="+this.id+"]").attr("propid");
		var elemType = $("#editor_div").find("[id="+this.id+"type]").attr("type");

		if(elemType!="2" && elemType!="8")
		{
			btnScriptExpTags.push("[screen."+ currPropId +"]");			
		}
	});
	return btnScriptExpTags;
}

function screenGeneratorProp_returnAllElementsIds(withFormId,withHashTag)
{
	var btnScriptExpTags = new Array();
	if(typeof expression_cust_tags !="undefined" && expression_cust_tags!=null && expression_cust_tags.length > 0)
	{	
		for(var i=0;i<expression_cust_tags.length;i++)
		{
			btnScriptExpTags.push(expression_cust_tags[i]);
		}
	}
	if(withFormId)
	{		
 	   btnScriptExpTags.push("[formId]");
 	   btnScriptExpTags.push("[screenId]");
	}
	$("#editor_div > div >[propId]").each(function(i){
		var currPropId = $("#editor_div").find("[id="+this.id+"]").attr("propid");
		var elemType = $("#editor_div").find("[id="+this.id+"type]").attr("type");
		/**
		 * to avoid the labels and buttons ids from the elements ids list
		 */
		if(typeof withHashTag != "undefined" && withHashTag != null && withHashTag)
		{
			currPropId = "#"+currPropId;
		}
		if(elemType!="2" && elemType!="8")
		{
			btnScriptExpTags.push(currPropId);			
		}
	});
	return btnScriptExpTags;
}
function screenGenerator_onLoadScriptScreen()
{
	var	loadScriptDiv = $("<div id='dyn_load_script_screen_div' class='path-common-sceen'></div>");
	loadScriptDiv.css("padding","0");
	loadScriptDiv.insertAfter($('body'));
	
	var screenId       = $("#dynScreenId").val();
	var loadScriptData = $("#loadScriptHidData").val();
    
	var curParams = {"criteria.screenId":screenId,"criteria.loadScriptData":loadScriptData};
	    
	_showProgressBar(true);
	var srcURL = jQuery.contextPath+"/path/screenGenerator/ScreenGeneratorMaintAction_loadOnLoadScriptScreen?";
	
	var buttonsArr = {};
	buttonsArr[ok_label_trans] = function() {
		screenGeneratorProp_saveLoadScriptData($(this));
		
	};

	var _dialogOptions = {modal:true, 
			                  title: (typeof load_script_screen_title_key === "undefined")?"On Load Script Data" :load_script_screen_title_key ,
			                  autoOpen:false,
			                  show:'slide',
			                  position:'center', 
			                  width:returnMaxWidth(540),
			                  height:returnMaxHeight(300),
			                  buttons : buttonsArr,
			                  close: function (){
								     var theDialog = $(this);
								     theDialog.dialog("destroy");
								     theDialog.remove();
								    }
		    		         };
	$("#dyn_load_script_screen_div").load(srcURL, curParams, function() {_showProgressBar(false);});
	$("#dyn_load_script_screen_div").dialog(_dialogOptions);
	$("#dyn_load_script_screen_div").dialog("open");

}
function screenGeneratorProp_saveLoadScriptData(theDialog)
{
    var sourceInfo   = {};
    var result       = []
    var intScreenId  = null;
    var scriptData   = "";
    loadScriptData = $("#loadScriptData").val();
    sourceInfo["loadScriptData"] = loadScriptData;
	result.push(sourceInfo);
	$("#loadScriptHidData").val(JSON.stringify(result));
	theDialog.dialog("close");

}
function screenGenerator_loadDynamicScreenParamMap(dynScreenMapParam)
{
	if(dynScreenMapParam == undefined || dynScreenMapParam == null)
	{
		return;
	}
	
	if( dynScreenMapParam.divId != undefined && dynScreenMapParam.divId != null && dynScreenMapParam.divId != ''
		&& dynScreenMapParam.elementIdentifier != undefined && dynScreenMapParam.elementIdentifier != null 
		&& dynScreenMapParam.mapElementType != undefined && dynScreenMapParam.mapElementType != null && dynScreenMapParam.mapElementType != '' )
	{	
		_showProgressBar(true);

		var mappingActionSrc = jQuery.contextPath + "/path/dynamicScreen/dynScreenParamListAction_loadDynamicScreenParamMapList.action";
		var mappingActionParams = {'criteria.elementIdentifier' : dynScreenMapParam.elementIdentifier,
								   'criteria.mapElementType' : dynScreenMapParam.mapElementType,
								   'criteria.elementOpId' : dynScreenMapParam.elementOpId,
								   '_pageRef' : dynScreenMapParam.currentPageRef,
								   'criteria.currAppName' : dynScreenMapParam.appName,
								   'criteria.progRef' : dynScreenMapParam.progRef,
								   'criteria.compCode' : dynScreenMapParam.compCode,
								   'criteria.defaultScreenId' : dynScreenMapParam.defaultScreenId,
								   'criteria.globalActivityId' : dynScreenMapParam.globalActivityId,
								   'criteria.screenWidth' : dynScreenMapParam.screenWidth,
								   'criteria.screenHeight' : dynScreenMapParam.screenHeight,
								   'criteria.screenTitle' : dynScreenMapParam.screenTitle,
								   'criteria.showScreenWidthAndHeight' : dynScreenMapParam.showScreenWidthAndHeight}; 	

		var elementType = $('#elementType').val();
		if(!(elementType == undefined && elementType == 'undefined' && elementType == null))
		{
			mappingActionParams['criteria.elementType'] = elementType;
		}
		
		$("#" + dynScreenMapParam.divId).load(mappingActionSrc,mappingActionParams, function() 
		{
			_showProgressBar(false);
		});
	}	
}

function openedFromDynamicScreen(currentPageRef)
{
	return ( $('#buttonCustParamMapGrid_PROG_REF_' + currentPageRef).parent('div#btnSourceScreenParamMapDiv').length == 1 );
}

function screenGenerator_loadButtonCustomizationParamMap(dynScreenMapParam)
{
	if(dynScreenMapParam == undefined || dynScreenMapParam == null)
	{
		return;
	}
	
	if( dynScreenMapParam.divId != undefined && dynScreenMapParam.divId != null && dynScreenMapParam.divId != ''
		&& dynScreenMapParam.elementIdentifier != undefined && dynScreenMapParam.elementIdentifier != null 
		&& dynScreenMapParam.mapElementType != undefined && dynScreenMapParam.mapElementType != null && dynScreenMapParam.mapElementType != '' )
	{	
		_showProgressBar(true);
		var mappingActionSrc = jQuery.contextPath + "/path/buttoncustomization/buttonCustomizationParamListAction_loadParamMapList.action";
		var mappingActionParams = {'criteria.sysParamGlobalActArgMapVO.ELEM_FLD_IDENTIFIER' : dynScreenMapParam.elementIdentifier,
								   'criteria.sysParamGlobalActArgMapVO.APP_NAME' : dynScreenMapParam.appName,
								   'criteria.sysParamGlobalActArgMapVO.PROG_REF' : dynScreenMapParam.progRef,
								   'criteria.sysParamGlobalActArgMapVO.BTN_ID' : dynScreenMapParam.globalActivityId,
								   'criteria.sysParamGlobalActArgMapVO.SCREEN_ELEM_PROG_REF' : dynScreenMapParam.currentPageRef,
								   'criteria.sysParamGlobalActArgMapVO.ELEM_SEQUENCE_ID' : dynScreenMapParam.sequenceId,
								   '_pageRef' : dynScreenMapParam.currentPageRef,
								   'criteria.sysParamGlobalActArgMapVO.DYN_SCREEN_ID' : $('#screenId').val(),
								   'criteria.sysParamGlobalActArgMapVO.DYN_SCREEN_ELEMENT_ID' : $('#elementId').val()
								   }
		
		if(typeof dynScreenMapParam.loadedInObjDisplay != 'undefined' && dynScreenMapParam.loadedInObjDisplay != null)
		{
			mappingActionParams.loadedInObjDisplay = dynScreenMapParam.loadedInObjDisplay;
			if(mappingActionParams.loadedInObjDisplay == true)
			{
			    var gridColumnsValues = screenGenerator_returnColumnHiddenInputValue(dynScreenMapParam.currentPageRef);
			    //use encodeuricomponent to escape arabic characters in column titles
			    mappingActionParams['criteria.gridColumns'] = encodeURIComponent(gridColumnsValues);
			}
		}
		
		$.ajax({
			url : mappingActionSrc,
			type : "post",
			dataType : "html",
			data : mappingActionParams,
			success : function(data) {

				$("#" + dynScreenMapParam.divId).html(data);
				_showProgressBar(false);

			}
		});
	}	
}


function screenGenerator_returnColumnHiddenInputValue(currentPageRef)
{
	var objectId = $('#objectId').val();
	if (typeof objectId != 'undefined' && objectId != undefined && objectId != null && objectId != '') 
	{
		var $destinationTable = $("#" + objectId + '_' + currentPageRef);
		//BUG#970503 not able to load the parameters screen
		if($destinationTable.length<1)
		{
			var $destinationTable = $("#" + objectId );
		}
		var gridParams = $destinationTable.jqGrid('getGridParam');
		var colModelArray = gridParams.colModel;
		var colNamesArray = gridParams.colNames;

		var jsonColDetails = [];
		for (var i = 0; i < colModelArray.length; i++) 
		{
			jsonColDetails.push({
				'propertyName' : colModelArray[i].name,
				'description' : colNamesArray[i]
			});
		}
		return JSON.stringify(jsonColDetails);
	}
}

function screenGenerator_onValueChange(propertyId)
{
	var currValue = $("#"+propertyId).val();
	var elementId = (propertyId.indexOf("lookuptxt") != -1)?propertyId.split("_")[1]:propertyId.split("_")[0];
	var actualElementId = elementId;
	if($("#new_"+elementId).length > 0)
	{
		actualElementId = "new_"+elementId;
	}
	var elementType = $("#"+actualElementId+"_div").attr("type");
	if(elementType == "2")
	{
		$("#"+actualElementId).html(currValue);
	}
	else if(elementType == "10")
	{
		$("#"+actualElementId+"_spanLabel").text(currValue);
	}
	else
	{
		$("#"+actualElementId).children("span.ui-button-text").html(currValue);
		$("#"+actualElementId).attr("value",currValue);
	}
}

function screenGeneratorProp_reloadDynScreenMapGrid(data)
{
	_showProgressBar(true);
	var screenId = $('#screenId').val();
	var elementId = $('#elementId').val();
	
	if(data == undefined || data == null)
	{
		return;	
	}
	if(elementId == undefined || elementId == null)
	{
		return;	
	}
	
	
	var btnSourceType = $('#selButtonSrcType').val();
	var dynScreenMapParam = {};
	dynScreenMapParam.divId = 'btnSourceScreenParamMapDiv';
	dynScreenMapParam.currentPageRef = _pageRef;
	dynScreenMapParam.elementIdentifier = elementId;
	dynScreenMapParam.appName = '';
	dynScreenMapParam.progRef = '';
	dynScreenMapParam.compCode = 0;
	
	//open dynamic screen
	if(btnSourceType == '1')
	{
		var operationId = data.sysDynScreenDefVO.DYN_SCREEN_ID;
		dynScreenMapParam.mapElementType = '4';
		dynScreenMapParam.defaultScreenId = operationId;
		dynScreenMapParam.elementOpId = operationId;
		dynScreenMapParam.screenWidth = data.sysDynScreenDefVO.SCREEN_WIDTH; 
		dynScreenMapParam.screenHeight = data.sysDynScreenDefVO.SCREEN_HEIGHT;
		dynScreenMapParam.screenTitle = data.sysDynScreenDefVO.SCREEN_TITLE;
		dynScreenMapParam.showScreenWidthAndHeight = true;
		screenGenerator_loadDynamicScreenParamMap(dynScreenMapParam);
	}
	//open global activity
	else if(btnSourceType == '3')
	{
		var operationId = data.buttonCustomizationCO.customActionParamCO.operationId;
		dynScreenMapParam.mapElementType = '5';
		dynScreenMapParam.defaultScreenId = null;
		dynScreenMapParam.globalActivityId = operationId;
		
		dynScreenMapParam.sequenceId  = data["sysParamElemActivitiesVO.SEQUENCE_ID"];
		dynScreenMapParam.loadedInObjDisplay = false;
		screenGenerator_loadButtonCustomizationParamMap(dynScreenMapParam);
	}
	_showProgressBar(false);

}

function screenGeneratorProp_buttonSrcTypeAfterDep()
{
	var btnSourceType = $('#selButtonSrcType').val();
	var btnSourceScreenId = $('#lookuptxt_btnSourceScreenId').val();
	var btnSourceActivityId = $('#lookuptxt_btnSourceActivityId').val();
		
	if( (btnSourceType == '1' && btnSourceScreenId == '') 
			|| (btnSourceType == '3' && btnSourceActivityId == '')) 
			
	{
		$('#btnSourceScreenParamMapDiv').html('');
	}
}
function screenGenerator_defineScrTablesScreen()
{
	var	loadScriptDiv = $("<div id='dyn_defineScrTables_div' class='path-common-sceen'></div>");
	loadScriptDiv.css("padding","0");
	loadScriptDiv.insertAfter($('body'));
	
	var screenId       = $("#dynScreenId").val();
    
	var curParams = {"criteria.screenId":screenId};
	    
	_showProgressBar(true);
	var srcURL = jQuery.contextPath+"/path/screenGenerator/ScreenGeneratorMaintAction_loadDefineScrTablesScreen?";
	
	var buttonsArr = {};
	buttonsArr[saveLabel] = function() {
		screenGenerator_generateScrTablesData($(this));
		
	};

	var _dialogOptions = {modal:true, 
			                  title: (typeof defineScrTables_title_key === "undefined")?"Tables Generator" :defineScrTables_title_key ,
			                  autoOpen:false,
			                  show:'slide',
			                  position:'center', 
			                  width:returnMaxWidth(1250),
			                  height:returnMaxHeight(685),
			                  buttons : buttonsArr,
			                  close: function (){
								     var theDialog = $(this);
								     theDialog.dialog("destroy");
								     theDialog.remove();
								    }
		    		         };
	$("#dyn_defineScrTables_div").load(srcURL, curParams, function() {_showProgressBar(false);});
	$("#dyn_defineScrTables_div").dialog(_dialogOptions);
	$("#dyn_defineScrTables_div").dialog("open");

}
function defineScrTables_addNewColumn()
{
	var $dynScrTableColsGrid = $("#dynScrTableColsGridId"); 
	var tableName  = $("#dynScrTblCreator_tableName").val();
	if(tableName!=null && tableName!="")
	{
		var rowData = {"TABLE_TECH_NAME":tableName,"COL_TYPE":1,"COL_TYPE_DESC":"String"};
		var rowId   = $dynScrTableColsGrid.jqGrid("addInlineRow",rowData);
	}
}

function defineScrTables_delRowData(rowId)
{
	var $dynScrTableColsGrid = $("#dynScrTableColsGridId"); 
	$dynScrTableColsGrid.jqGrid('deleteGridRow', rowId);
}

function defineScrTables_selectColumn()
{
	var $dynScrTableColsGrid = $("#dynScrTableColsGridId"); 
	var selRow = $dynScrTableColsGrid.jqGrid("getGridParam",'selrow');
	var selColTypeCode = $dynScrTableColsGrid.jqGrid('getCell', selRow, 'COL_TYPE');

	if(selColTypeCode == 1)
    {
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'COL_LENGTH', "false");
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'DECIMAL_VALUE', "true");
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'PRIMARY_KEY', "false");
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'VISIBLE_YN', "false");
    }
    else if(selColTypeCode == 3)
    {
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'COL_LENGTH', "false");
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'DECIMAL_VALUE', "false");
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'PRIMARY_KEY', "false");
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'VISIBLE_YN', "false");
    }
    else if(selColTypeCode == 6)
    {
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'COL_LENGTH', "true");
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'DECIMAL_VALUE', "true");
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'PRIMARY_KEY', "true");
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'VISIBLE_YN', "true");
    }
    else
    {
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'COL_LENGTH', "true");
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'DECIMAL_VALUE', "true");
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'PRIMARY_KEY', "false");
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'VISIBLE_YN', "false");
    }
}
function screenGenerator_generateScrTablesData()
{
	if (!$("#dynScrTablesFrmId").hasChanges(true))
		return;
	var $dynScrTableColsGrid = $("#dynScrTableColsGridId");
	var tableData = JSON.parse($dynScrTableColsGrid.jqGrid("getAllRows")).root;
	var isPK = false;
	var missingCL = false;
	var missingDV = false;

	$.each( tableData, function(i, item) 
	{
	    if(item.PRIMARY_KEY == 1)
	    {
	    	isPK = true;
	    }
	    
	    if(item.COL_TYPE == 1)
	    {
	    	if(item.COL_LENGTH == "")
	    	{
	    		missingCL = true;
	    	}
	    }
	    
	    if(item.COL_TYPE == 3)
	    {
	     	if(item.DECIMAL_VALUE == "")
	    	{
	     		missingDV = true;
	    	}
	     	if(item.COL_LENGTH == "")
	    	{
	     		missingCL = true;
	    	}
	    }
	});
	
	if (isPK==false || missingCL == true || missingDV == true)
	{
		if(isPK == false)
		{
			_showErrorMsg("Please choose at least one column as primary key",error_msg_title);
		}
		if(missingCL == true)
		{
			_showErrorMsg("Missing Column Length on related column(s)",error_msg_title);
		}
		if(missingDV == true)
		{
			_showErrorMsg("Missing Decimal Value on related column(s)",error_msg_title);
		}
		return;
	}
	
	if (!$dynScrTableColsGrid.jqGrid("checkRequiredCells"))
		return;
	var updates = $dynScrTableColsGrid.jqGrid("getChangedRowData");
	$("#dynScrTableGridUpdates").val(updates);
	var postParams = $("#dynScrTablesFrmId").serialize();
	var updateVal = $("#dynScrTableGridUpdates").val();
	if(updateVal!=null && updateVal!="" && updateVal!=undefined)
	{		
		 _showProgressBar(true);
		$.post(jQuery.contextPath
				+ "/path/screenGenerator/ScreenGeneratorMaintAction_generateDynScrTable",
				postParams, function(param) {
					//if the return type of the action is Json ( we have an error );
				if (typeof param["_error"] == null || param["_error"] == undefined) {
					var screenId       = $("#dynScreenId").val();
					var curParams = {"criteria.screenId":screenId};
					var srcURL = jQuery.contextPath+"/path/screenGenerator/ScreenGeneratorMaintAction_loadDefineScrTablesScreen?";
					$("#dyn_defineScrTables_div").load(
							srcURL,
							curParams,
							function()
							{
								_showProgressBar(false);
								_showErrorMsg(record_was_Updated_Successfully_key,
										info_msg_title);
							});
				}
				else
				{
					_showErrorMsg( param["_error"],error_msg_title);
					_showProgressBar(false);
					return;
				}				
			})		
	}
	else
	{
	  _showErrorMsg(changes_not_available_key,info_msg_title);
	  _showProgressBar(false);
	  return;	
	}
	
}
function dynScrTablesList_colTypeChanged()
{
	var $dynScrTableColsGrid = $("#dynScrTableColsGridId"); 
	var selRow = $dynScrTableColsGrid.jqGrid("getGridParam",'selrow');
	// if not new row then take langCode from Code Hidden column
	var selColTypeCode = $dynScrTableColsGrid.jqGrid('getCell', selRow, 'COL_TYPE_DESC');
    $dynScrTableColsGrid.jqGrid('setCellValue', selRow,"COL_TYPE",selColTypeCode);

    console.log("selColTypeCode: "+ selColTypeCode);
    console.log("selRow: "+ selRow);
    if(selColTypeCode == 1)
    {
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'COL_LENGTH', "false");
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'DECIMAL_VALUE', "true");
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'PRIMARY_KEY', "false");
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'VISIBLE_YN', "false");
		$dynScrTableColsGrid.jqGrid('setCellValue', selRow, 'COL_LENGTH', "");
		$dynScrTableColsGrid.jqGrid('setCellValue', selRow, 'DECIMAL_VALUE', "");
    }
    else if(selColTypeCode == 3)
    {
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'COL_LENGTH', "false");
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'DECIMAL_VALUE', "false");
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'PRIMARY_KEY', "false");
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'VISIBLE_YN', "false");
		$dynScrTableColsGrid.jqGrid('setCellValue', selRow, 'COL_LENGTH', "");
		$dynScrTableColsGrid.jqGrid('setCellValue', selRow, 'DECIMAL_VALUE', "");
    }
    else if(selColTypeCode == 6)
    {
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'COL_LENGTH', "true");
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'DECIMAL_VALUE', "true");
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'PRIMARY_KEY', "true");
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'VISIBLE_YN', "true");
		$dynScrTableColsGrid.jqGrid('setCellValue', selRow, 'COL_LENGTH', "");
		$dynScrTableColsGrid.jqGrid('setCellValue', selRow, 'DECIMAL_VALUE', "");
		$dynScrTableColsGrid.jqGrid('setCellValue', selRow, 'PRIMARY_KEY', "0");
		$dynScrTableColsGrid.jqGrid('setCellValue', selRow, 'VISIBLE_YN', "0");
    }
    else
    {
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'COL_LENGTH', "true");
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'DECIMAL_VALUE', "true");
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'PRIMARY_KEY', "false");
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'VISIBLE_YN', "false");
		$dynScrTableColsGrid.jqGrid('setCellValue', selRow, 'COL_LENGTH', "");
		$dynScrTableColsGrid.jqGrid('setCellValue', selRow, 'DECIMAL_VALUE', "");
    }
}

function dynScrTablesList_colLengthChanged()
{
	var $dynScrTableColsGrid = $("#dynScrTableColsGridId"); 
	var selRow = $dynScrTableColsGrid.jqGrid("getGridParam",'selrow');
	var selColTypeCode = $dynScrTableColsGrid.jqGrid('getCell', selRow, 'COL_TYPE_DESC');
	if(selColTypeCode == 1)
    {
    	var cellVal = $dynScrTableColsGrid.jqGrid('getCell',selRow, 'COL_LENGTH');
    	if(cellVal.length > 4)
		{
			$dynScrTableColsGrid.jqGrid('setCellValue', selRow, 'COL_LENGTH', "");
		}
    	
    }
    else if(selColTypeCode == 3)
    {
    	var cellVal = $dynScrTableColsGrid.jqGrid('getCell',selRow, 'COL_LENGTH');
      	if(cellVal.length > 2)
		{
			$dynScrTableColsGrid.jqGrid('setCellValue', selRow, 'COL_LENGTH', "");
		}
    }
}
function dynScrTblGeneList_onDbClickedEvent(createFrom)
{
	var $table = $("#dynScrTblGeneListGridTbl_Id");
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	if(typeof selectedRowId == "undefined" || selectedRowId == null || selectedRowId == "")
	{
		return;
	}
	var myObject = $table.jqGrid('getRowData', selectedRowId);
	/**
	 * get the selected rowId
	 */
	var tableId = myObject["TABLE_ID"];
	if (checkIfGeneTblFormChanged()) {
		_showConfirmMsg(changes_made_confirm_msg, confirm_msg_title, function(theVal) {
			if (theVal) {
				dynScrTblGeneList_loadDataInTheForm(tableId);
			}
		});
	} 
	else {
		dynScrTblGeneList_loadDataInTheForm(tableId);
	}

}
function checkIfGeneTblFormChanged()
{
	var formChanged = false;
	$("#dynScrTablesFrmId").each(function(i) {
		formChanged = $(this).hasChanges();
		if (formChanged) {
			return true;
		}
	});
	return formChanged;
}
//Function to Load the selected screen in the screen generator form
function dynScrTblGeneList_loadDataInTheForm(tableId)
{
//	dynScrTblGeneList_initializeDataOnSuccess();
	
	var params = {"criteria.tableId":tableId};
	var actionSrc  = jQuery.contextPath+"/path/screenGenerator/ScreenGeneratorMaintAction_loadGeneratedTblData?";
	$.post(actionSrc
		   ,params
	       ,function(param)
 	        {
	         $("#dynScrTblGeneMainInfoDiv_id").html(param);
	         if(tableId!=null || tableId != undefined || tableId  != "")
        	 {
	        	 $("#dynScrTblCreator_del_div").css("display","block");
        	 }
	        }
	       ,"html");
}
function dynScrTablesList_colNameChanged()
{
	var selectedRowId = $("#dynScrTableColsGridId").jqGrid('getGridParam', 'selrow');
//	$("#dynScrTableColsGridId").jqGrid('setCellReadOnly', selectedRowId, 'COL_DESC',true);  //applicable
//	$("#dynScrTableColsGridId").jqGrid("editCell", selectedRowId, "TABLE_TECH_NAME",true); //not applicabel
//	$("#dynScrTableColsGridId").jqGrid('setLabel', "COL_DESC", 'NewLabel');
//	$("#dynScrTableColsGridId").jqGrid("setCellValue",2, "TABLE_TECH_NAME","MARWAN");
//	$("#dynScrTableColsGridId").jqGrid('setCellReadOnly', 2, 'TABLE_TECH_NAME',false); //not applicable which is good we dont it to be applicable in case the column is not editable.
//	$("#dynScrTableColsGridId").jqGrid('hideCol',["COL_DESC","PRIMARY_KEY"]); //applicable
//	$("#dynScrTableColsGridId").jqGrid('showCol',["COL_DESC","PRIMARY_KEY"]); // applicable
//	$("#dynScrTableColsGridId").jqGrid('setCell',2,"COL_DESC","","not-editable-cell"); //we cannot make a cell not editable at the same selected row because the related inputs will be constructed on select
//  alert(22222);
//  $("#dynScrTableColsGridId").jqGrid('setCell',2,"COL_DESC","","");
}
function dynScrTablesList_onTechNameKeyPress()
{
var a = $('#'+$('#dynScrTableColsGridId').jqGrid('getGridParam', 'selrow')+'_COL_TECH_NAME');
	a.val(a.val().replace(/[^a-z0-9_]/gi,'').toUpperCase()); 
}
function screenGeneratorList_onDelDynTableClicked()
{
	_screenId = $("#dynScreenId").val();
	_tableId = $("#dynScrTblCreator_tableId").val();
	_tableName = $("#dynScrTblCreator_tableName").val();
		_showConfirmMsg(Confirm_Delete_Process_key, Warning_key, screenGeneratorList_DelDynTableAfterConfirm, {
		screenId : _screenId,
		tableId : _tableId,
		tableName : _tableName
	});
}

function screenGeneratorList_DelDynTableAfterConfirm(confirm,args)
{
	var theParam ={};
	theParam["dynScreenCreatorCO.sysDynScreenDefVO.DYN_SCREEN_ID"] = args.screenId;
	theParam["dynScreenCreatorCO.scrTableId"] = args.tableId;
	theParam["dynScreenCreatorCO.scrTableTechName"] = args.tableName;
	_showProgressBar(true);

	if(confirm)
	{
		$.ajax({
			 url: jQuery.contextPath+"/path/screenGenerator/generatorMaint_deleteDynScrTable",
	         type:"post",
			 dataType:"json",
			 data: theParam,
			 success: function(data){
			     if(typeof data["_error"] == "undefined" || data["_error"] == null)
			     {
		    		var screenId = $("#dynScreenId").val();	    	    
		    		var curParams = {"criteria.screenId":screenId};
		    		var srcURL = jQuery.contextPath+"/path/screenGenerator/ScreenGeneratorMaintAction_loadDefineScrTablesScreen?";
					$("#dyn_defineScrTables_div").load(srcURL, curParams, function()
					{
						_showProgressBar(false);
					});
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
		}
}

function defineScrTables_addNewDynTable()
{
	tableId = null;

	if (checkIfGeneTblFormChanged()) {
		_showConfirmMsg(changes_made_confirm_msg, confirm_msg_title, function(theVal) {
			if (theVal) {
				dynScrTblGeneList_loadDataInTheForm(tableId);
			}
		});
	} 
	else {
		dynScrTblGeneList_loadDataInTheForm(tableId);
	}
}

function screenGenerator_onEditableCheckBoxClick(editableElement,tableNameElement,queryElement,filterElement)
{
	var elemId = editableElement.split("_")[0];
	if($("#"+editableElement).is(":checked"))
	{
		liveSearch_makeReadOnly(false,tableNameElement);
		$("#"+queryElement).addClass("ui-state-disabled");
		$("#"+queryElement).attr('disabled', true);
		$("#"+elemId+"_queryData").val("");
		$("#"+elemId+"_condData").val("");
		$("#"+elemId+"_dblClick").attr('disabled', true);
		$("#"+elemId+"_dblClick").addClass("ui-state-disabled");
		$("#"+elemId+"_sourceData").val("");
		$("#"+elemId+"_colProps").attr('disabled', false);
		$("#"+elemId+"_colProps").removeClass("ui-state-disabled");
		$("#"+filterElement).attr('disabled', false);
		$("#"+filterElement).removeClass("ui-state-disabled");
	}
	else
	{
		liveSearch_makeReadOnly(true,tableNameElement);
		$("#lookuptxt_"+tableNameElement).val(""); 
		$("#"+queryElement).removeClass("ui-state-disabled");
		$("#"+queryElement).attr('disabled', false);
		$("#"+elemId+"_queryData").val("");
		$("#"+elemId+"_condData").val("");
		$("#"+elemId+"_dblClick").attr('disabled', false);
		$("#"+elemId+"_dblClick").removeClass("ui-state-disabled");
		$("#"+elemId+"_sourceData").val("");
		$("#"+elemId+"_colProps").attr('disabled', true);
		$("#"+elemId+"_colProps").addClass("ui-state-disabled");
		$("#"+elemId+"_colProperties").val("");
		$("#"+filterElement).attr('disabled', true);
		$("#"+filterElement).addClass("ui-state-disabled");
		$("#"+filterElement).val("");
	}
}

function screenGeneratorProp_openColProperties(elementId,elementType)
{
	var	optionsScreenDiv = $("<div id='dyn_btn_col_prop_screen_div' class='path-common-sceen'></div>");
	optionsScreenDiv.css("padding","0");
	optionsScreenDiv.insertAfter($('body'));
	
	var screenId  = $("#dynScreenId").val();
	var colProps = $("#"+elementId+"_colProperties").val();
	var tablename = $("#lookuptxt_"+elementId+"_tableName").val();

	var curParams = {"criteria.tableName":tablename,"criteria.screenId":screenId,"criteria.elementId":elementId,"criteria.colProperties":colProps,"criteria.elementType":elementType};
	    
	_showProgressBar(true);
	var srcURL = jQuery.contextPath+"/path/screenGenerator/ScreenGeneratorMaintAction_loadColPropertiesScreen?";
	
	var buttonsArr = {};
	buttonsArr[ok_label_trans] = function() {
		screenGeneratorProp_saveColPropDetails($(this));
		
	};

	var _dialogOptions = {modal:true, 
			                  title: (typeof btn_source_screen_title_key === "undefined")?"Columns Properties" :col_properties_screen_title_key ,
			                  autoOpen:false,
			                  show:'slide',
			                  position:'center', 
			                  width:returnMaxWidth(900),
			                  height:returnMaxHeight(450),
			                  buttons : buttonsArr,
			                  close: function (){
								     var theDialog = $(this);
								     theDialog.dialog("destroy");
								     theDialog.remove();
								    }
		    		         };
	$("#dyn_btn_col_prop_screen_div").load(srcURL, curParams, function() {_showProgressBar(false);});
	$("#dyn_btn_col_prop_screen_div").dialog(_dialogOptions);
	$("#dyn_btn_col_prop_screen_div").dialog("open");

}
function screenGeneratorProp_saveColPropDetails(theDialog)
{
	var dynScrGridId = $("#dynScrGridWidgetColPropsId");
    var elementId    = $("#elementId").val();
	
    var rows = dynScrGridId.jqGrid('getDataIDs');
    // TP#897711 SUPT190250 - Nazim Jassar ; 11/12/2019 [START]
    var isErrorState = false;
    for (i = 0; i < rows.length; i++)
    {
        var rowData = dynScrGridId.jqGrid('getRowData', rows[i]);
        if(rowData["SOURCE_MAPPING_CODE"]==3 || rowData["SOURCE_MAPPING_CODE"]==4)
        {
        	if(rowData["MAPPING_ELMNT_ID"]=="") 
        	{
        		isErrorState = true;
        		_showErrorMsg(mapping_cannot_be_empty_key,error_msg_title);
        		break;
        	}	
        }
        
        if(rowData["SOURCE_MAPPING_CODE"]==1 )
        {
        	if(rowData["QUERY_DATA"]=="") 
        	{
        		isErrorState = true;
        		_showErrorMsg(query_cannot_be_empty_for_live_search_mapping_key,error_msg_title);
        		break;
        	}	
        	
        }
        
    }
    if(isErrorState == false) {
        var result = dynScrGridId.jqGrid('getAllRows');
    	$("#"+elementId+"_colProperties").val(result);
    	theDialog.dialog("close");
	}
    // TP#897711 SUPT190250 - Nazim Jassar ; 11/12/2019 [END]
}

function screenGeneratorProp_openLiveSearchQueryFormatter(cellvalue, options, rowObject)
{
	if(rowObject["COL_IS_LIVESEARCH"] == undefined || rowObject["COL_IS_LIVESEARCH"] < 1)
	{
		return  '<button disabled type="button" onclick="screenGeneratorProp_openQueryScreen(\''+$("#elementId").val()+'\','+options.rowId+')"'+
		'class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only ui-state-disabled" id ="'+$("#elementId").val()+"_"+options.rowId+'_queryBtn"'+
		'role="button" aria-disabled="false"><span class="ui-button-text"><label class="path_btn_lbl_theme">'+queryColKey+'</label>'+
		'</span></button>';
	}
	else
	{
		return  '<button type="button" onclick="screenGeneratorProp_openQueryScreen(\''+$("#elementId").val()+'\','+options.rowId+')"'+
		'class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" id ="'+$("#elementId").val()+"_"+options.rowId+'_queryBtn"'+
		'role="button" aria-disabled="false"><span class="ui-button-text"><label class="path_btn_lbl_theme">'+queryColKey+'</label>'+
		'</span></button>';
	}
	

}

function screenGeneratorProp_onChangeIsLiveSearch(e)
{
	var rowId = $("#dynScrGridWidgetColPropsId").jqGrid('getGridParam','selrow');
	var elemId = $("#elementId").val();
	if ($("#" + rowId + "_COL_IS_LIVESEARCH").is(':checked') == false)
	{
		$("#" + elemId + "_" + rowId + "_queryBtn").attr('disabled', true);
		$("#" + elemId + "_" + rowId + "_queryBtn").addClass("ui-state-disabled");
		liveSearch_makeReadOnly(true,rowId+"_LOOKUP_DESC_lookuptxt_dynScrGridWidgetColPropsId");
		$("#"+rowId+"_LOOKUP_DESC_lookuptxt_dynScrGridWidgetColPropsId").val("");
		$("#dynScrGridWidgetColPropsId").jqGrid('setCellReadOnly',rowId, "LOOKUP_DESC",true);
	}
	else
	{
		$("#"+elemId+"_"+rowId+"_queryBtn").attr('disabled', false);
		$("#"+elemId+"_"+rowId+"_queryBtn").removeClass("ui-state-disabled");	
		$("#dynScrGridWidgetColPropsId").jqGrid('setCellReadOnly',rowId, "LOOKUP_DESC",false);
		liveSearch_makeReadOnly(false,rowId+"_LOOKUP_DESC_lookuptxt_dynScrGridWidgetColPropsId");
	}

}

function screenGeneratorProp_serializeGridWidgetColPropsData(data)
{
	var elemId = $("#elementId").val();
	data["criteria.colProperties"] = $("#"+elemId+"_colProperties").val();
 	return data;
}

function screenGeneratorProp_ondynScrGridWidgetColPropsEditInline()
{
	var gridId = $("#dynScrGridWidgetColPropsId");
	var elemId = $("#elementId").val();
	var rowId = gridId.jqGrid('getGridParam','selrow');	
	var myObject = gridId.jqGrid('getRowData', rowId);
	
	$("#" + elemId + "_" + rowId + "_queryBtn").attr('disabled', true);
	$("#" + elemId + "_" + rowId + "_queryBtn").addClass("ui-state-disabled");
	
	$("#"+rowId+"_MAPPING_ELMNT_ID_lookuptxt_dynScrGridWidgetColPropsId").attr('readonly', true);
	liveSearch_makeReadOnly(true,rowId+"_MAPPING_ELMNT_ID_lookuptxt_dynScrGridWidgetColPropsId");
	
	
	gridId.jqGrid('setCellReadOnly',rowId, 'VISIBILITY_YN', "true");
	gridId.jqGrid('setCellReadOnly',rowId, 'AGGREGATE', "true");
	gridId.jqGrid('setCellReadOnly',rowId, 'COL_FORMAT', "true");
	
	$("#"+rowId+"_LOOKUP_DESC_lookuptxt_dynScrGridWidgetColPropsId").attr('readonly', true);	
	liveSearch_makeReadOnly(true,rowId+"_LOOKUP_DESC_lookuptxt_dynScrGridWidgetColPropsId");
	
	var sourceMapping = myObject["SOURCE_MAPPING"];
	var colType = myObject["COL_TYPE"];
	
	// If source mapping is live search
	if (sourceMapping ==  1)
	{
		$("#" + elemId + "_" + rowId + "_queryBtn").attr('disabled', false);
		$("#" + elemId + "_" + rowId + "_queryBtn").removeClass("ui-state-disabled");
		liveSearch_makeReadOnly(false,rowId+"_LOOKUP_DESC_lookuptxt_dynScrGridWidgetColPropsId");
	}
	
	// If source mapping is Session Variable or Screen Element	
	if(sourceMapping ==  3 || sourceMapping == 4)
	{
		liveSearch_makeReadOnly(false,rowId+"_MAPPING_ELMNT_ID_lookuptxt_dynScrGridWidgetColPropsId");
	}
	
	// If source mapping is Auto Generated, Session Variable or Screen Element
	if(sourceMapping == 2 || sourceMapping == 3 || sourceMapping == 4 )
	{
		gridId.jqGrid('setCellReadOnly',rowId, 'VISIBILITY_YN', "false");
	}
	
	// If column type is BigDecimal
	if(colType == 3) 
	{
		gridId.jqGrid('setCellReadOnly',rowId, 'AGGREGATE', "false");
		gridId.jqGrid('setCellReadOnly',rowId, 'COL_FORMAT', "false");
	}
	
	// If source mapping is Session Variable or Screen Element
	if (sourceMapping == '3' || sourceMapping == '4')
	{
		screenGeneratorProp_adjustMapValueResultList(sourceMapping);
		gridId.jqGrid("setCellRequired", rowId ,"MAPPING_ELMNT_ID",true);		
	}	
	else
	{
		gridId.jqGrid("setCellRequired", rowId ,"MAPPING_ELMNT_ID",false);	
	}
	
	var aggregate = myObject["AGGREGATE"];
	if (aggregate != null && aggregate > 0 )
	{
		gridId.jqGrid('setCellValue', rowId, 'FOOTER_DESC', "");
		gridId.jqGrid('setCellReadOnly',rowId, 'FOOTER_DESC', "true");
	}
	else
	{
		gridId.jqGrid('setCellReadOnly',rowId, 'FOOTER_DESC', "false");	
	}
}

function returnLookupScreenParamMap(lookupid)
{
	var screenParamMap = {};
    var options_livesearch = eval('options_' + lookupid + '_liveSearch');
	if(options_livesearch != undefined && options_livesearch != null && 
			options_livesearch.paramList != undefined && options_livesearch.paramList != null && options_livesearch.paramList != '' )
	{
		var screenParamArr = options_livesearch.paramList.split(',');
		if( screenParamArr != undefined && screenParamArr != null && screenParamArr.length > 0 )
		{
			for(var i=0; i<screenParamArr.length; i++)
			{
				var inputArr = screenParamArr[i].split(':');
				var inputAttrName = inputArr[0];
				var inputHtmlId = inputArr[1];
				if(inputAttrName.indexOf("criteria.elemHm.screen_") === 0 )
				{	
					var inputElem = $('#'+ inputHtmlId );
					if(inputElem == undefined || inputElem == null || inputElem.length <= 0)
					{
						inputElem = $('#'+ inputHtmlId + "_" + _pageRef );
					}
					
					if(inputElem != undefined && inputElem != null && inputElem.length > 0)
					{
						var inputMode = 'text';
						var inputModeAttr = inputElem.attr('mode');
						if(inputModeAttr != undefined && inputModeAttr != null && inputModeAttr != '')
						{
							inputMode = inputModeAttr;
						}
						
						if(inputHtmlId.indexOf(_pageRef) > 0)
						{
							inputHtmlId = inputHtmlId.substring(0, inputHtmlId.length - ('_'+_pageRef).length);
						}
						screenParamMap[inputHtmlId] = {'inputMode':inputMode};
					}
				}
			}
		}
			
	}
	
	return JSON.stringify(screenParamMap);

}
/**
 * @createdBy Sajjad Soomro
 * @createdDate 11 Dec, 2019
 * @description this function is used to display grid for add,edit,delete the Tabs inside the Tabbed Panel
 * 
 * @param elementId
 * @param elementType
 * @param forChange
 * @returns
 */
function screenGeneratorProp_openAddTabScreen(elementId,elementType,forChange)
{
	var div = "";
	if($("#new_"+elementId+"_tabbedPanelDiv").length)
	{
		div="new_"+elementId+"_tabbedPanelDiv";
	}
	else
	{
		div=elementId+"_tabbedPanelDiv";
	}
	
	//get existing tab properties of selected tabbedPanel
	var tabCounter = $("#"+div+" ul li").length;
	var sourceData = [];
	$("#"+div+" ul li").each(function( index )
	{
		tab = {};
		tab ["tabPropId"] = $(this).attr('propertyId');
		tab ["tabTitle"] = escapeString($(this).find("a").text());
		tab ["tabId"] = $(this).attr('id');
		sourceData.push(tab);
	});
	
	/**
	 * open dialog to display grid
	 */
	_showProgressBar(true);
	var _dialogModal = {
		modal:true,
		title: (typeof tab_detail_screen_title_key == "undefined" || tab_detail_screen_title_key == "" )?"Tab Details Screen" :tab_detail_screen_title_key,
        autoOpen:false,
        show:'slide',
        position:'center', 
        width:returnMaxWidth(400),
        height:returnMaxHeight(350),
        dialogClass: 'no-close',
		closeOnEscape: false,
		buttons:{
			ok: function(){
				var $table    = $("#tabbedPanelGridId");
				var gridData  = $table.jqGrid("getAllRows");
				if(typeof gridData != "undefined" && gridData != null && gridData != "")
				{
					jsonGridData = $.parseJSON(gridData);
					var isDuplicatePropId = false;
					var isValidInput = true;
					var regExp = /^[A-Za-z]\w*$/g;
					
					// validate the regEx of propId and the duplication of the tabs
					$.each(jsonGridData["root"], function(gridId, gridObj)
					{
				    	var currValue = gridObj.tabPropId;
				    	var tabId = gridObj.tabId;
				    	var tabTechId = tabId;
		    			if(!currValue.match(regExp))
		    			{
		    				isValidInput = false;
		    				return 0;
		    			}
		    			if(tabId.indexOf("new_")!=-1)
				    	{
				    		tabTechId = tabId.substring(4, tabId.length);
				    	}
			    		$("[propid]").each(function()
					    {
			    			var idsCount = $("[propid='"+currValue+"']");
					    	var tab_propid = $(this).attr("propid");
					    	var tab_techId = $(this).attr("id");
					    	if(tab_techId.indexOf("new_")!=-1)
							{
					    		tab_techId = tab_techId.substring(4, tab_techId.length);	
							}
					    	if(tab_techId.indexOf("_div")!=-1)
					    	{
					    		tab_techId = tab_techId.substring(0, tab_techId.length-4);
					    	}
					    	if(idsCount.length>0 && tab_propid==currValue && tab_techId != tabTechId)
					    	{
					    		isDuplicatePropId = true;
					    		return 0;
					    	}
					    });
					});
					if(!isValidInput)
					{
						_showErrorMsg($("#invalid_input_key").val(), error_msg_title);
						return 0;
					}
					else if(isDuplicatePropId)
					{
						_showErrorMsg($("#duplicated_id_key").val(), error_msg_title);
						return 0;
					}
					else
					{
						/**
						 * validate the tabs that is deleted or not from grid
						 * if deleted then delete it from UI and check if active tab deleted
						 * than make the first tab as activeTab.
						 */
						var isActiveTabDeleted=false;
						var activeTabId="";
						$.each(sourceData, function(sourceId, sourceObj)
						{
							var isExist = false;
							$.each(jsonGridData["root"], function(gridId, gridObj)
							{
								if(gridObj.tabId==sourceObj.tabId)
								{
									if(activeTabId=="")
									{
										activeTabId = gridObj.tabId;	
									}
									isExist = true;
								}
							});
							if(!isExist)
							{
								if($("#"+div+" ul li#"+sourceObj.tabId).hasClass("ui-state-active"))
								{
									isActiveTabDeleted = true;
								}
								dynamicscreen_deleteTab(div, sourceObj.tabId);
							}
						});
						if(isActiveTabDeleted)
						{
							dynamicscreen_activateTab(div, activeTabId);
						}
						
						/**
						 * used to update the existing tabs and add the newly created tabs 
						 */
						$.each(jsonGridData["root"], function(gridId, gridObj) 
						{
							if(typeof gridObj.tabId != "undefined" && gridObj.tabId != null && gridObj.tabId != "")
							{
								dynamicscreen_updateNewTab(elementId, gridObj.tabId, gridObj.tabTitle, gridObj.tabPropId, gridId);
							}
							else
							{
								dynamicscreen_addNewTab(elementId, gridObj.tabTitle, gridObj.tabPropId);
							}
						});		
					}
				}
				$(this).dialog("close");
			},
			cancel: function(){
				$(this).dialog("close");
			}
		},
		close: function (){
		     var theDialog = $(this);
		     theDialog.dialog("destroy");
		     theDialog.remove();
	    }
    };
	var	tabScreenDiv = $("<div id='dyn_tabbedPanel_screen_div' class='path-common-sceen'></div>");
	tabScreenDiv.css("padding","0");
	tabScreenDiv.insertAfter($('body'));
	
	var screenId  = $("#dynScreenId").val();
	var _tabbedPanelParams = {"criteria.screenId":screenId,"criteria.elementId":elementId,"criteria.sourceData":JSON.stringify(sourceData)};
	var tabbedPanelSrcURL = jQuery.contextPath+"/path/screenGenerator/generatorMaint_loadTabbedPanelScreen?";
	$("#dyn_tabbedPanel_screen_div").load(tabbedPanelSrcURL, _tabbedPanelParams, function() {_showProgressBar(false);});
	$("#dyn_tabbedPanel_screen_div").dialog(_dialogModal);
	$("#dyn_tabbedPanel_screen_div").dialog("open");		
}
/**
 * @createdBy Sajjad Soomro
 * @createdDate 12 Dec, 2019
 * @description used to add the row inside tabbedPanelGrid
 * 
 * @returns
 */
function tabbedPanelGrid_addOption()
{
	var $tabbedPanelGridId = $("#tabbedPanelGridId"); 
	var rowId = $tabbedPanelGridId.jqGrid("addInlineRow",{});
	$tabbedPanelGridId.jqGrid('setSelection',rowId, false);
}
/**
 * @createdBy Sajjad Soomro
 * @createdDate 12 Dec, 2019
 * @description used to delete the row inside tabbedPanelGrid
 * 
 * @returns
 */
function tabbedPanelGrid_delOption()
{
	var $tabbedPanelGridId = $("#tabbedPanelGridId"); 
	var selectedRowId = $tabbedPanelGridId.jqGrid('getGridParam', 'selrow');
	$tabbedPanelGridId.jqGrid('deleteGridRow',selectedRowId);
}
/**
 * @createdBy Sajjad Soomro
 * @createdDate 30 Dec, 2019
 * @description used to validate regex {Special character, spaces, and starting with numbers in tab id should not be allowed}
 *  
 * @param colName
 * @returns
 */
function tabbedPanelGrid_actionTypeFormatter(colName)
{
	var regExp = /^[A-Za-z]\w*$/g;
	var $table = $("#tabbedPanelGridId" + _pageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var myObject = $table.jqGrid('getRowData', selectedRowId);
	var code = myObject[colName];
	if(!code.match(regExp))
	{
		_showErrorMsg($("#invalid_input_key").val(), error_msg_title);
		return 0;
	}
}
/**
 * @createdBy Sajjad Soomro
 * @createdDate 11 Feb, 2020
 * @description used to changes the escape-code into their special characters of the String
 * when the grid are complete
 * 
 * @returns
 */
function tabbedPanlGrid_onComplete()
{
	$tabbedPanelGridId = $("#tabbedPanelGridId");
	var rowIds = $tabbedPanelGridId.jqGrid('getDataIDs');
	for(var rowId=0; rowId<rowIds.length; rowId++)
	{
		var rowData = $tabbedPanelGridId.jqGrid('getRowData', rowIds[rowId]);
		rowData.tabTitle = unEscapeString(rowData.tabTitle);
		$tabbedPanelGridId.jqGrid('setRowData', rowIds[rowId], rowData);
	}
}
/**
 * @createdBy Sajjad Soomro
 * @description use to move element with arrow keys and define line indicators around element
 * 
 * @param e
 * @returns
 */
function screenGenerator_moveElement(e)
{
	if($("#editor_div").find("._newdrag.ui-focus").length)
	{
		var currElem = $("._newdrag.ui-focus");
		var parentDiv = currElem.parent();
		var _screenWidth = parseInt(parentDiv.css("width"));
		var _screenHeight = parseInt(parentDiv.css("height"));
	
		switch(e.keyCode)
		{
			case 37 : screenGenerator_moveLeft(currElem, 0); break;
			case 38 : screenGenerator_moveUp(currElem, 0); break;
			case 39 : screenGenerator_moveRight(currElem, _screenWidth); break;
			case 40 : screenGenerator_moveDown(currElem, _screenHeight); break;
		}
		screenGenerator_addElemLines(currElem);
	}
}
/**
 * @cretaedBy Sajjad Soomro
 * @description use to move element left
 * 
 * @param elem
 * @param screenLimit
 * @returns
 */
function screenGenerator_moveLeft(elem, screenLimit)
{
	var position = parseInt(elem.css("left"));
	if(position > screenLimit)
	{
		elem.css("left", --position);
		var scrollPos = $("#editor_div").parent().parent().scrollLeft();
		if(position < scrollPos)
		{
			scrollPos -= 10;
			if(scrollPos < screenLimit ) scrollPos = screenLimit;
			$("#editor_div").parent().parent().scrollLeft(scrollPos);
		}
	}
}
/**
 * @createdBy Sajjad Soomro
 * @description use to move element right
 * 
 * @param elem
 * @param screenLimit
 * @returns
 */
function screenGenerator_moveRight(elem, screenLimit)
{
	var position = parseInt(elem.css("left"));
	var elemWidth = parseInt(elem.css("width"));
	screenLimit = screenLimit - elemWidth;
	
	if(position < screenLimit)
	{
		elem.css("left", ++position);
		var divWidth = $("#editor_div").parent().parent().width();
		var scrollPos = $("#editor_div").parent().parent().scrollLeft();
		if((position + elemWidth + 20) > (divWidth + scrollPos))
		{
			scrollPos += 10;
			if(scrollPos > screenLimit) scrollPos = screenLimit;
			$("#editor_div").parent().parent().scrollLeft(scrollPos);
		}
	}
}
/**
 * @createdBy Sajjad Soomro
 * @description use to move element up
 * 
 * @param elem
 * @param screenLimit
 * @returns
 */
function screenGenerator_moveUp(elem, screenLimit)
{
	var position = parseInt(elem.css("top"));
	if(position > screenLimit)
	{
		elem.css("top", --position);
		var scrollPos = $("#editor_div").parent().parent().scrollTop();
		if(position < scrollPos)
		{
			scrollPos -= 10;
			if(scrollPos < screenLimit) scrollPos = screenLimit;
			$("#editor_div").parent().parent().scrollTop(scrollPos);
		}
	}
}
/**
 * @createdBy Sajjad Soomro
 * @description use to move element down
 * 
 * @param elem
 * @param screenLimit
 * @returns
 */
function screenGenerator_moveDown(elem, screenLimit)
{
	var position = parseInt(elem.css("top"));
	var elemHeight = parseInt(elem.css("height"));
	screenLimit = screenLimit - elemHeight;
	
	if(position < screenLimit)
	{
		elem.css("top", ++position);
		var divHeight = $("#editor_div").parent().parent().height();
		var scrollPos = $("#editor_div").parent().parent().scrollTop();
		if((position + elemHeight + 20) > (divHeight + scrollPos))
		{
			scrollPos += 10;
			if(scrollPos > screenLimit) scrollPos = screenLimit;
			$("#editor_div").parent().parent().scrollTop(scrollPos);
		}
	}
}
/**
 * @createdBy Sajjad Soomro
 * @description use to define line indicators around element
 * 
 * @param currElem
 * @param _screenWidth
 * @param _screenHeight
 * @returns
 */
function screenGenerator_addElemLines(currElem)
{
	var currElemId = currElem.attr("id");
	var currElemLeft = Math.round(parseFloat(currElem.css("left")));
	var currElemTop = Math.round(parseFloat(currElem.css("top")));
	var currElemWidth = parseInt(currElem.css("width"));
	var currElemHeight = parseInt(currElem.css("height")) + 2;
	var parentElem = currElem.parent();
	var _screenWidth = parseInt(parentElem.css("width"));
	var _screenHeight = parseInt(parentElem.css("height"));
	
	if($("."+currElemId+"_svg").length)
	{
		$(".topHRLine."+currElemId+"_svg").css("top", currElemTop);	
		$(".bottomHRLine."+currElemId+"_svg").css("top", (currElemTop + currElemHeight));
		$(".leftVRLine."+currElemId+"_svg").css("left", currElemLeft);	
		$(".rightVRLine."+currElemId+"_svg").css("left", (currElemLeft + currElemWidth));
	}
	else
	{
		var lineIndicators = 
			$("<div class='topHRLine " + currElemId + "_svg' style='position:absolute; left:0; width:100%; border-top: 1px dashed rgb(0,0,0); top: " + currElemTop + "px;'></div>" +
			"<div class='bottomHRLine " + currElemId + "_svg' style='position:absolute; left:0; width:100%; border-bottom: 1px dashed rgb(0,0,0); top: " + (currElemTop + currElemHeight) + "px;'></div>" +
			"<div class='leftVRLine " + currElemId + "_svg' style='position:absolute; top:0; height:100%; border-left: 1px dashed rgb(0,0,0); left: " + currElemLeft + "px;'></div>" +
			"<div class='rightVRLine " + currElemId + "_svg' style='position:absolute; top:0; height:100%; border-right: 1px dashed rgb(0,0,0); left: " + (currElemLeft + currElemWidth) + "px;'></div>");
		screenGenerator_removeIndicators();
		lineIndicators.appendTo(parentElem);
	}

	if(!currElem.hasClass("ui-focus"))
	{
		currElem.addClass("ui-focus");
	}	
}
/**
 * @createdBy Sajjad Soomro
 * @description use to remove line indicators around element
 * 
 * @returns
 */
function screenGenerator_removeIndicators()
{
	$("#editor_div").find("div.topHRLine, div.bottomHRLine, div.leftVRLine, div.rightVRLine").remove();
}
/**
 * @createdBy Sajjad Soomro
 * @description use to remove line indicators around element and ui-focus class
 * 
 * @returns
 */
function screenGenerator_removeLines(e)
{
	if($("#editor_div").find("._newdrag.ui-focus").length)
	{
		var currElemId = $("#editor_div").find("._newdrag.ui-focus").attr("id");
		var targetId = e.target.id;
		if(targetId.indexOf("_div")==-1)
		{
			targetId = targetId+"_div";
		}
		if(targetId !== currElemId)
		{
			screenGenerator_removeIndicators();
			$("#editor_div").find("._newdrag.ui-focus").removeClass("ui-focus");
		}		
	}
}
/**
 * @createdBy Sajjad Soomro
 * @createdDate 07 Feb, 2020
 * @description used to bind events
 * 
 * @returns
 */
function screenGenerator_bindEvents()
{
	$(document).unbind('keydown');
	$(document).bind("keydown",function(e){
		if(e.keyCode == 46){
			screenGenerator_removeLines(e);
			screenGenerator_deleteElement(e);
		}
		else if(e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40)
		{
			screenGenerator_moveElement(e);
			e.preventDefault();
		}
		else
		{
			screenGenerator_removeLines(e);	
		}
	});
	/*
	if user press mouse button anywhere on screen then remove the line indicators from the element
	if it is not the same element.
	*/
	$(document).off('mousedown');
	$(document).on("mousedown", function(e){
		screenGenerator_removeLines(e);
	});
}
/**
 * @createdBy Sajjad Soomro
 * @createdDate 11 Feb, 2020
 * @description Changes the special characters of the input String into their escape-code
 * equivalent: For example: < = &lt; > = &gt; & = &amp; " = &quot;
 * 
 * @param str
 * @returns string
 */
function escapeString(str) 
{
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}
/**
 * @createdBy Sajjad Soomro
 * @createdDate 11 Feb, 2020
 * @description Changes the escape-code into their special characters of the String
 * equivalent: For example: &lt; = < &gt; = > &amp; = & &quot; = "
 * 
 * @param str
 * @returns string
 */
function unEscapeString(str) 
{
    return String(str).replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g,'>').replace(/&quot;/g, '"').replace(/&apos;/g, '\'');
}
/**
 * @createdBy Sajjad Soomro
 * @createdDate 18 Feb, 2020
 * @description used to resize the grids inside tab when switch the tab under the given form
 * 
 * @param formId
 * @returns
 */
function _dynScrGridResize(formId) 
{
	$("#" + formId + " ul.ui-tabs-nav li>a").on("click", function(){
		var divId = $(this).attr("href");
		$(divId).find('.ui-jqgrid-btable').each(function(index) {
			var gridId = $(this).attr('id');
			resizeSingleGrid(gridId);
		});
	});
}

function screenGeneratorProp_openDatasourceScreen(elementId,rowId,elementType,propertyCode)
{

	var	optionsScreenDiv = $("<div id='dyn_datasource_main_screen_div' class='path-common-sceen'></div>");
	optionsScreenDiv.css("padding","5");
	optionsScreenDiv.insertAfter($('body'));
	_showProgressBar(true);
	var srcURL = jQuery.contextPath+"/path/screenGenerator/generatorMaint_loadDatasourceMainScreen?";

	var screenId = $("#dynScreenId").val();
	var optionsData = $("#"+elementId+"_optionData").val();
	if (rowId == undefined)
	{
		var queryData = $("#"+elementId+"_queryData").val();
	}
	else
	{
		var queryData = $("#dynScrGridWidgetColPropsId").jqGrid('getCell', rowId,'QUERY_DATA');
	}
    
	var curParams = {"criteria.screenId":screenId,"criteria.elementId":elementId,"criteria.queryData":queryData,"criteria.propertyCode":propertyCode,"criteria.optionsData":optionsData,"_pageRef":_pageRef};
	
	if(typeof elementType != 'undefined' && elementType != undefined && elementType != null)
	{
		curParams["criteria.elementType"] = elementType;
	}
	
	var buttonsArr = {};
	buttonsArr[ok_label_trans] = function() {
		var tableDatasource= $('#tableDatesource').val();
		if ( propertyCode  == 'query' || tableDatasource=='G' || tableDatasource=='Q' )
			optionGrid_saveQueryDetails($(this),rowId,elementType,screenId);
		else {
				optionGrid_saveOptionsDetails();
				$(this).dialog("close");	
		}
	};
	
	var _dialogOptions = {modal:true, 
			                  title: (typeof options_screen_title_key === "undefined")?"Data Source" :options_screen_title_key ,
			                  autoOpen:false,
			                  show:'slide',
			                  position:'center', 
			                  width:returnMaxWidth(1200),
			                  height:returnMaxHeight(550),
			                  buttons : buttonsArr,
			                  close: function (){
								     var theDialog = $(this);
								     theDialog.dialog("destroy");
								     theDialog.remove();
								    }
		    		         };
	$("#dyn_datasource_main_screen_div").load(srcURL, curParams, function() {});
	$("#dyn_datasource_main_screen_div").dialog(_dialogOptions);
	$("#dyn_datasource_main_screen_div").dialog("open");

}
function screenGeneratorProp_tableDatasourceOnChange()
{ 
	var $gridParam = $("#ButtonCustParamMapGrid_Id_" + _pageRef);
	var $gridOutParam = $("#globalActivityColumnMapGrid_Id_"+_pageRef)
	var	tableDatasource =  $('#tableDatesource').val();
	var	elementId 	=  $("#elementId").val();
	var	elementType =  $("#elementType").val();
	var	queryData 	=  $("#queryData").val();
	var	screenId 	=  $("#screenId").val();
	var propertyCode=  $("#propertyCode").val();
	var optionsData = $("#"+elementId+"_optionData").val();
	
	$gridParam.jqGrid("clearGridData");
	$gridOutParam .jqGrid("clearGridData");
	
	var curParams = {"criteria.screenId":screenId,"criteria.elementId":elementId,"criteria.queryData":queryData,"criteria.elementType":elementType,"criteria.tableDatasource":tableDatasource,"criteria.propertyCode":propertyCode,"criteria.optionsData":optionsData,"_pageRef":_pageRef};
	_showProgressBar(true);	
	var src = jQuery.contextPath + '/path/screenGenerator/generatorMaint_loadDatasourceScreen.action';
	$.ajax( {
				url : src,
				type : "post",
				dataType : "html",
				data : curParams,
				success : function(html) 
					{
						$("#dyn_datasource_screen_div").html(html);
						_showProgressBar(false);
					},
					error : function()
					{
		   				_showProgressBar(false);
				  	}
			});
}
function optionGrid_validateGridRestDetails(theDialog){

	var elementId    = $("#elementId").val();
    var elementType    = $("#elementType").val();
    var tableDatasource= $('#tableDatesource').val();    
    var globalActivityId = $('#lookuptxt_globalActivityId_'+ _pageRef).val();
    var restOperationId = $('#lookuptxt_restOperationId_'+ _pageRef).val();
    var operationOutParameter = $('#lookuptxt_operationOutParameter_'+ _pageRef).val();   
    var globalActivityDesc = $('#globalActivityDesc_'+ _pageRef).val();
    var restOperationDesc = $('#restOperationDesc_'+ _pageRef).val();
    var operationOutParameterDesc = $('#operationOutParameterDesc_'+ _pageRef).val();
    var restOperationOutArgName = $('#restOperationOutArgName_'+ _pageRef).val();
    var codeProperty = $('#codeProperty_'+ _pageRef).val();
    var propertyDesc = $('#propertyDesc_'+ _pageRef).val();
    var parameterGridData = $("#ButtonCustParamMapGrid_Id_"+_pageRef).jqGrid('getAllRows');
    var parameterOutGridData = $("#globalActivityColumnMapGrid_Id_"+_pageRef).jqGrid('getAllRows');
    var screenId       = $("#dynScreenId").val();	
    var elementIdName    = $("#" + elementId + "_id").val();
    
    if ( globalActivityId == null || globalActivityId ==undefined || globalActivityId =="" )
	{
		_showErrorMsg(select_global_activity_id_key,info_msg_title);
		return ; 
	}
    if ( restOperationId == null || restOperationId ==undefined || restOperationId =="" )
	{
		_showErrorMsg(operation_id_is_missing_key,info_msg_title);
		return ; 
	}
    if ( operationOutParameter == null || operationOutParameter ==undefined || operationOutParameter =="" )
	{
		_showErrorMsg(out_parameter_is_missing_key,info_msg_title);
		return ; 
	}
    
    if ( parameterGridData == null || parameterGridData ==undefined || parameterGridData =="" )
	{
		_showErrorMsg(parameter_grid_is_empty_key,info_msg_title);
		return ; 
	}
    
    if ( parameterOutGridData == null || parameterOutGridData ==undefined || parameterOutGridData =="" )
	{
		_showErrorMsg(out_parameter_grid_is_empty_key,info_msg_title);
		return ; 
	}
    var $table = $("#ButtonCustParamMapGrid_Id_" + _pageRef);
	var rows = $table.jqGrid('getDataIDs');	
	var rowsLen = rows.length;	
	for (var i=0; i< rowsLen; i++)
	{
		var obj = $table.jqGrid('getRowData',rows[i]);
		var mapType = obj["sysParamGlobalActArgMapVO.MAP_TYPE"];
		var mapVal	= ( mapType == '3') ? obj["sysParamGlobalActArgMapVO.MAP_VALUE"] : obj["screenFldIdDesc"];
		var mapDesc = obj["mapDescription"];
		if(obj["sysParamGlobalActArgMapVO.OP_ID"] == "" || mapVal == "" || obj["sysParamGlobalActArgMapVO.ARG_ID"] == "" || (mapType != 3 && mapDesc =='' ) )
		{
			_showErrorMsg(invalid_data_in_parameter_grid_key ,error_msg_title);
			return false;
		}
	}
    $table = $("#globalActivityColumnMapGrid_Id_" + _pageRef);
	rows = $table.jqGrid('getDataIDs');	
	rowsLen = rows.length;
	for (var i=0; i< rowsLen; i++)
	{
		var obj = $table.jqGrid('getRowData',rows[i]);
		if(obj["COL_TECH_NAME"] == "" || obj["COL_DESCRIPTION"] == "" || obj["REST_LIST_PROPERTIES"] == "")
		{
			_showErrorMsg(invalid_data_in_out_parameter_grid_key ,error_msg_title);
			return false;
		}
	}
    parameterGridData = parameterGridData.replace("{\"root\":[","[").replace("]}","]").replace("{\"root\":{}}","[]");
    parameterOutGridData = parameterOutGridData.replace("{\"root\":[","[").replace("]}","]").replace("{\"root\":{}}","[]");
    $("#parameterGridData_"+_pageRef).val(parameterGridData);
    $("#parameterOutGridData_"+_pageRef).val(parameterOutGridData);
    
    var params       = {};
    params["screenId"] 				= screenId;
    params["elementId"] 			= elementId;
    params["elementIdName"] 		= elementIdName;
    params["elementType"] 			= elementType;
    params["tableDatasource"] 		= tableDatasource;
    params["globalActivityId"] 		= globalActivityId;
    params["restOperationId"] 		= restOperationId;
    params["operationOutParameter"] = operationOutParameter;
    params["globalActivityDesc"] 		= globalActivityDesc;
    params["restOperationDesc"] 		= restOperationDesc;
    params["operationOutParameterDesc"] = operationOutParameterDesc;
    params["parameterGridData"] 	= parameterGridData;
    params["parameterOutGridData"] 	= parameterOutGridData;
    params["restOperationOutArgName"]=restOperationOutArgName;	
    params["columnCode"] 			= codeProperty;
    params["columnDesc"] 			= propertyDesc;
    var jsonString = "["+JSON.stringify(params)+"]";
    
    if ( elementType == "3" )
		$("#"+elementId+"_optionData").val(jsonString);
	else 
		$("#"+elementId+"_queryData").val(jsonString);
    
    theDialog.dialog("close");
}
function screenGeneratorProp_addMapGrid()
{ 
	var	globalActivityId =  $('#lookuptxt_globalActivityId_'+ _pageRef).val();
	if ( globalActivityId == null || globalActivityId ==undefined || globalActivityId =="" )
	{
		_showErrorMsg(select_global_activity_id_key,info_msg_title);
		return ; 
	}
	ButtonCustParamMapGrid_addMapGrid();
}
function screenGeneratorProp_mapTypeChanged()
{ 
	var $table = $("#ButtonCustParamMapGrid_Id_" + currentPageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var selectedRowObject = $table.jqGrid('getRowData', selectedRowId);
	var mapTypeDesc = selectedRowObject["mapTypeDesc"];
	var elementType    = $("#elementType").val();
	var mapTypeDescOld = selectedRowObject["mapTypeDescOld"];
	
	$table.jqGrid('setCellValue', selectedRowId,"sysParamGlobalActArgMapVO.MAP_TYPE",mapTypeDesc);
	//constant map type
	if(mapTypeDesc == '3')
	{
		$table.jqGrid('setCellReadOnly', selectedRowId, "screenFldIdDesc","true");
		$table.jqGrid("setCellRequired", selectedRowId,"screenFldIdDesc","false");
		$table.jqGrid('setCellReadOnly', selectedRowId, "sysParamGlobalActArgMapVO.MAP_VALUE","false");
		$table.jqGrid("setCellRequired", selectedRowId,"sysParamGlobalActArgMapVO.MAP_VALUE","true");
		$table.jqGrid('setCellValue', selectedRowId,"mapDescription",'');
		$table.jqGrid('setCellValue', selectedRowId,"screenFldIdDesc",'');
		return ; 
	}//Screen & Session map type 
	else if( mapTypeDesc == '1' || mapTypeDesc == '2' )
	{
		$table.jqGrid('setCellReadOnly', selectedRowId, "screenFldIdDesc","false");
		$table.jqGrid("setCellRequired", selectedRowId,"screenFldIdDesc","true");
		$table.jqGrid('setCellReadOnly', selectedRowId, "sysParamGlobalActArgMapVO.MAP_VALUE","true");		
		$table.jqGrid("setCellRequired", selectedRowId,"sysParamGlobalActArgMapVO.MAP_VALUE","false");
		$table.jqGrid('setCellValue', selectedRowId,"sysParamGlobalActArgMapVO.MAP_VALUE",'');
		
		if (mapTypeDescOld != mapTypeDesc) {
			$table.jqGrid('setCellValue', selectedRowId,"mapDescription",'');
			$table.jqGrid('setCellValue', selectedRowId,"screenFldIdDesc",'');
		}
	}	 
	
}

function screenGeneratorProp_onRowSelTopic(rowObj)
{
	var $table = $("#ButtonCustParamMapGrid_Id_" + currentPageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var selectedRowObject = $table.jqGrid('getRowData', selectedRowId);
	var mapTypeDesc = selectedRowObject["mapTypeDesc"];

	$table.jqGrid('setCellValue', selectedRowId,"sysParamGlobalActArgMapVO.MAP_TYPE",mapTypeDesc);
	$table.jqGrid('setCellValue', selectedRowId,"mapTypeDescOld",mapTypeDesc);
	
	//constant map type
	if(mapTypeDesc == '3')
	{
		$table.jqGrid('setCellReadOnly', selectedRowId, "screenFldIdDesc","false");
		$table.jqGrid("setCellRequired", selectedRowId,"screenFldIdDesc","true");
		$table.jqGrid('setCellReadOnly', selectedRowId, "sysParamGlobalActArgMapVO.MAP_VALUE","false");
		$table.jqGrid("setCellRequired", selectedRowId,"sysParamGlobalActArgMapVO.MAP_VALUE","true");
		$table.jqGrid('setCellValue', selectedRowId,"mapDescription",'');
		$table.jqGrid('setCellValue', selectedRowId,"screenFldIdDesc",'');
		return ; 
	}//Screen map type  & /// session map type
	else if( mapTypeDesc == '1' || mapTypeDesc == '2')
	{
		$table.jqGrid('setCellReadOnly', selectedRowId, "screenFldIdDesc","false");
		$table.jqGrid("setCellRequired", selectedRowId,"screenFldIdDesc","true");
			
		$table.jqGrid('setCellReadOnly', selectedRowId, "sysParamGlobalActArgMapVO.MAP_VALUE","true");		
		$table.jqGrid("setCellRequired", selectedRowId,"sysParamGlobalActArgMapVO.MAP_VALUE","false");
		$table.jqGrid('setCellValue', selectedRowId,"sysParamGlobalActArgMapVO.MAP_VALUE",'');
		
	}	 
}

function screenGeneratorProp_afterDepOnGlobalActivity()
{
	var $gridParam = $("#ButtonCustParamMapGrid_Id_"+_pageRef)
	$gridParam.jqGrid("clearGridData");
	
	var $gridOutParam = $("#globalActivityColumnMapGrid_Id_"+_pageRef)
	$gridOutParam .jqGrid("clearGridData");
	
	var $restOperationId = $('#lookuptxt_restOperationId_'+ _pageRef);  
    var $restOperationIdDesc = $('#restOperationDesc_'+ _pageRef);    
    $restOperationId.val("");
    $restOperationIdDesc.val("");
    
	var $operationOutParameter = $('#lookuptxt_operationOutParameter_'+ _pageRef);  
    var $operationOutParameterDesc = $('#operationOutParameterDesc_'+ _pageRef);    
    $operationOutParameter.val("");
    $operationOutParameterDesc.val("");
    
    var $codeProperty = $('#codeProperty_'+ _pageRef);
    var $propertyDesc = $('#propertyDesc_'+ _pageRef);
    $codeProperty.val("");
    $propertyDesc.val("");
}
function screenGeneratorProp_afterDepOnOutParameter()
{
	var $gridOutParam = $("#globalActivityColumnMapGrid_Id_"+_pageRef)
	$gridOutParam .jqGrid("clearGridData");
	var $operationOutParameter = $('#lookuptxt_operationOutParameter_'+ _pageRef);  
    var $operationOutParameterDesc = $('#operationOutParameterDesc_'+ _pageRef);    
    $operationOutParameter.val("");
    $operationOutParameterDesc.val("");
    var $codeProperty = $('#codeProperty_'+ _pageRef);
    var $propertyDesc = $('#propertyDesc_'+ _pageRef);
    $codeProperty.val("");
    $propertyDesc.val("");

}
function screenGeneratorProp_sourceMappingChanged()
{	
	var gridId = $("#dynScrGridWidgetColPropsId");
	var elemId = $("#elementId").val();
	var rowId = $("#dynScrGridWidgetColPropsId").jqGrid('getGridParam','selrow');
	var myObject = gridId.jqGrid('getRowData', rowId);
	var sourceMapping = myObject["SOURCE_MAPPING"];
	var colTypeCode = myObject["COL_TYPE"]; 
	var sourceMappingCode = myObject["SOURCE_MAPPING_CODE"];
	// If source mapping is Auto Generated and column type is not BigDecimal
	if (sourceMapping == 2 && colTypeCode !=  3)
	{
		gridId.jqGrid('setCellValue', rowId, 'SOURCE_MAPPING', sourceMappingCode);
		_showErrorMsg(mapping_not_applicable_for_column_type,error_msg_title);
		return;
	}
	// If source mapping is Live Search and column type is Boolean 
	if (sourceMapping == 1 && colTypeCode ==  4)
	{
		gridId.jqGrid('setCellValue', rowId, 'SOURCE_MAPPING', sourceMappingCode);
		_showErrorMsg(mapping_not_applicable_for_column_type,error_msg_title);
		return;
	}
	
		
	$("#"+rowId+"_MAPPING_ELMNT_ID_lookuptxt_dynScrGridWidgetColPropsId").attr('readonly', true);
	$("#"+rowId+"_LOOKUP_DESC_lookuptxt_dynScrGridWidgetColPropsId").attr('readonly', true);
	
	if (sourceMapping == 1 )
	{		
		$("#" + elemId + "_" + rowId + "_queryBtn").attr('disabled', false);
		$("#" + elemId + "_" + rowId + "_queryBtn").removeClass("ui-state-disabled");		
		liveSearch_makeReadOnly(false,rowId+"_LOOKUP_DESC_lookuptxt_dynScrGridWidgetColPropsId");
	}
	else
	{
		$("#" + elemId + "_" + rowId + "_queryBtn").attr('disabled', true);
		$("#" + elemId + "_" + rowId + "_queryBtn").addClass("ui-state-disabled");
		gridId.jqGrid('setCellValue', rowId, 'QUERY_DATA', "");
		gridId.jqGrid('setCellValue', rowId, 'LOOKUP_DESC', "");
		liveSearch_makeReadOnly(true,rowId+"_LOOKUP_DESC_lookuptxt_dynScrGridWidgetColPropsId");
	}

	if(sourceMapping == 3 || sourceMapping == 4)
	{			
		liveSearch_makeReadOnly(false,rowId+"_MAPPING_ELMNT_ID_lookuptxt_dynScrGridWidgetColPropsId");

	}
	else
	{
		liveSearch_makeReadOnly(true,rowId+"_MAPPING_ELMNT_ID_lookuptxt_dynScrGridWidgetColPropsId");
	}
	
	if(sourceMapping == 2 || sourceMapping == 3 || sourceMapping == 4 )
	{
		gridId.jqGrid('setCellReadOnly',rowId, 'VISIBILITY_YN', "false");
	}
	else
	{
		gridId.jqGrid('setCellValue', rowId, 'VISIBILITY_YN', 1);
		gridId.jqGrid('setCellReadOnly',rowId, 'VISIBILITY_YN', "true");
	}
	
	gridId.jqGrid('setCellValue', rowId, 'MAPPING_ELMNT_ID', "");
	gridId.jqGrid('setCellValue', rowId, 'MAPPING_DESC', ""); 
	
	gridId.jqGrid('setCellValue', rowId, 'SOURCE_MAPPING_CODE', sourceMapping); 
	
	if (sourceMapping == '3' || sourceMapping == '4')
	{
		screenGeneratorProp_adjustMapValueResultList(sourceMapping);
		gridId.jqGrid("setCellRequired", rowId ,"MAPPING_ELMNT_ID",true);		
	}	
	else
	{
		gridId.jqGrid("setCellRequired", rowId ,"MAPPING_ELMNT_ID",false);	
	}

	
}

function screenGeneratorProp_adjustMapValueResultList(sourceMapping)
{
	var resultList = "";
	
	if (sourceMapping == '3') //Session
	{
		resultList = "'propertyName:MAPPING_ELMNT_ID_lookuptxt'";
	}
	else if(sourceMapping == '4')
	{
		resultList = "'elementIdValue:MAPPING_ELMNT_ID_lookuptxt'";
	}

	jQuery.globalEval("options_liveSearch_MAPPING_ELMNT_ID_dynScrGridWidgetColPropsId"  + ".resultList = " + resultList);
	
		
}
function screenGeneratorProp_aggregateChanged()
{
	var gridId = $("#dynScrGridWidgetColPropsId");
	var rowId = $("#dynScrGridWidgetColPropsId").jqGrid('getGridParam','selrow');
	var myObject = gridId.jqGrid('getRowData', rowId);
	
	var aggregate = myObject["AGGREGATE"];
	
	gridId.jqGrid('setCellValue', rowId, 'AGGREGATE_CODE', aggregate); 	
	
	if (aggregate != null && aggregate > 0 )
	{
		gridId.jqGrid('setCellValue', rowId, 'FOOTER_DESC', "");
		gridId.jqGrid('setCellReadOnly',rowId, 'FOOTER_DESC', "true");
	}
	else
	{
		gridId.jqGrid('setCellReadOnly',rowId, 'FOOTER_DESC', "false");	
	}
	
}

function screenGeneratorProp_onChangeColumnFomat()
{
	var gridId = $("#dynScrGridWidgetColPropsId");
	var rowId = $("#dynScrGridWidgetColPropsId").jqGrid('getGridParam','selrow');
	var myObject = gridId.jqGrid('getRowData', rowId);
	
	var columnFormat = myObject["COL_FORMAT"];
	
	if (columnFormat == null || columnFormat == undefined  || columnFormat == "")
	{
		return ;
	}
	
    var result = columnFormat.match("^[#0]+[#,0]*");
    var result2 = columnFormat.match("^[#0]+[#,0]+[.]+[#0]*");
    if ( ( result == null || result != columnFormat) && ( result2 == null || result2 != columnFormat) )
    {
       _showErrorMsg(invalid_number_format_key,info_msg_title);
       gridId.jqGrid('setCellValue', rowId,"COL_FORMAT","");
      return ; 
    }

}