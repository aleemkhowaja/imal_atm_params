
// Function called upon double clicking grid
function buttonCustomization_onDbClicked() {
	
	var $table = $("#buttonCustomizationGrid_Id_" + currentPageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var selectedRowObject = $table.jqGrid('getRowData', selectedRowId);
	
	var customButtonParams = {};
	customButtonParams["buttonCustomizationCO.sysParamBtnCustVO.BTN_ID"] 	= 	selectedRowObject["sysParamBtnCustVO.BTN_ID"];
	customButtonParams["buttonCustomizationCO.globalOperationMode"] 	= 	$('#buttonCustomization_globalOperationMode_'+currentPageRef).val();
	customButtonParams["_pageRef"] 	= currentPageRef;
	buttonCustomization_loadButtonCustDetails(customButtonParams);
}


function buttonCustomization_loadButtonCustDetails(customButtonParams)
{
	_showProgressBar(true);
	var btnCustSrc = jQuery.contextPath + '/path/buttoncustomization/ButtonCustomizationMaint_loadButtonCustDetails.action';
	
	/* the div.load is not working correctly in FireFox : the _showProgressBar(false) is not called on success of the load 
	 * but it works fine withIE and Chrome, that's why it's replaced by $.ajax 
	$("#buttonCustomizationDetailsDiv_" + _pageRef).load(btnCustSrc,customButtonParams, function() {
		_showProgressBar(false);
		
	});
	*/
	
	// action call to load data on double Click with call back function 
	$.ajax( {
					url : btnCustSrc,
					type : "post",
					dataType : "html",
					data : customButtonParams,
					success : function(html) 
						{
							_showProgressBar(false);
							$("#buttonCustomizationDetailsDiv_" + currentPageRef).html(html);
						},
					error : function()
						{
			   				_showProgressBar(false);
					  	}
					});
}



// Function called upon add button was clicked from the grid
function buttonCustomization_onAddClicked()
{
	_showProgressBar(true);
	var customButtonParams = {};
	customButtonParams["buttonCustomizationCO.sysParamBtnCustVO.APP_NAME"] 	= 	$('#buttonCustomization_appName_'+currentPageRef).val();
	customButtonParams["buttonCustomizationCO.sysParamBtnCustVO.PROG_REF"] 	= 	$('#buttonCustomization_progRef_'+currentPageRef).val();
	customButtonParams["buttonCustomizationCO.sysParamBtnCustVO.TOOLBAR_ID"] 	= 	$('#buttonCustomization_toolBarId_'+currentPageRef).val();
	customButtonParams["buttonCustomizationCO.globalOperationMode"] 	= 	$('#buttonCustomization_globalOperationMode_'+currentPageRef).val();
	customButtonParams["_pageRef"] 	= currentPageRef;
	
	var btnCustSrc = jQuery.contextPath  + "/path/buttoncustomization/ButtonCustomizationMaint_loadButtonCustDetails.action";
	$.ajax( {
				url : btnCustSrc,
				type : "post",
				dataType : "html",
				data : customButtonParams,
				success : function(html) 
					{
	      				_showProgressBar(false);
						$("#buttonCustomizationGrid_Id_" + currentPageRef).jqGrid('resetSelection');
						$("#buttonCustomizationDetailsDiv_" + currentPageRef).html(html);
					},
				error : function()
					{
		   				_showProgressBar(false);
				  	}
			});
	
}



// Function called upon Save button of Contacts Popup is clicked
function buttonCustomization_onSaveClicked()
{
	var changes = $("#buttonCustomizationDetailsForm_"+currentPageRef).hasChanges(true);
	if(changes == 'true' || changes == true)
	{
		_showProgressBar(true);
		parseNumbers();
		
		var saveAction = jQuery.contextPath+"/path/buttoncustomization/ButtonCustomizationMaint_saveButtonCustDetails.action";
		var $table = $("#buttonCustomizationActionsGrid_Id_" + currentPageRef);
		var jsonOpUpdates = $table.jqGrid('getChangedTrimRowData',false);
		$("#buttonCustomizationCO_gridUpdate_"+currentPageRef).val(jsonOpUpdates);
		
		//output parameters grid 
		var $outputTable = $("#ButtonCustOutMapGrid_Id_" + currentPageRef);
		var checkRequiredCells = $outputTable.jqGrid('checkRequiredCells');
		if(checkRequiredCells)
		{	
			var jsonOpUpdates1 = $outputTable.jqGrid('getAllRows',false);
			$("#buttonCustOutMapGrid_gridUpdate_"+currentPageRef).val(jsonOpUpdates1);
		}
		else
		{
			_showProgressBar(false);
			return; 
		}
		_showProgressBar(true);
		var options = {
			url : saveAction,
			type : 'post',
			dataType: 'json',
			success : function(data) 
			{
				if(typeof data["_error"] == "undefined" || data["_error"] == null)
			     {	 
				   //reload the currently saved button
				   var customButtonParams = {};
				   customButtonParams["buttonCustomizationCO.sysParamBtnCustVO.BTN_ID"] = data["buttonCustomizationCO"]["sysParamBtnCustVO"]["BTN_ID"];
				   customButtonParams["_pageRef"] 	= currentPageRef;
				   customButtonParams["buttonCustomizationCO.globalOperationMode"] 	= $('#buttonCustomization_globalOperationMode_'+currentPageRef).val();
				   buttonCustomization_loadButtonCustDetails(customButtonParams);
				
				   if($("#buttonCustomizationGrid_Id_"+currentPageRef).html()!=null && $("#buttonCustomizationGrid_Id_"+currentPageRef).html()!="")
	              {
					   $("#buttonCustomizationGrid_Id_"+currentPageRef).trigger("reloadGrid");
	              }
	            } 
				 
				 _showProgressBar(false);
			}
		};
		
		$('#sysParamBtnCustVO_APPLY_FORM_VALIDATION_YN_'+currentPageRef).val(returnHtmlEltValue('sysParamBtnCustVO_APPLY_FORM_VALIDATION_YN_'+currentPageRef));
		
		$("#buttonCustomizationDetailsForm_"+currentPageRef).ajaxSubmit(options);
	}
	
}

// Function called upon delete button was clicked from the grid
function buttonCustomization_onDeleteClicked(confirmation)
{
	var $table = $("#buttonCustomizationGrid_Id_" + currentPageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var selectedRowObject = $table.jqGrid('getRowData', selectedRowId);
	
	var btnId = selectedRowObject["sysParamBtnCustVO.BTN_ID"];
	
  	if(btnId == undefined || btnId == null || btnId == "")
	{
		_showErrorMsg(msg_noRecordSelectedLabel,Warning_key);
		return;
	}
	
	var delAction = jQuery.contextPath + "/path/buttoncustomization/ButtonCustomizationMaint_deleteButtonCustDetails.action";
	var confirmMsg = Confirm_Delete_Process_key;
	_showConfirmMsg(confirmMsg, Warning_key,
				function(confirmation , args)
				{
					if(confirmation)
					{
						_showProgressBar(true);	
						$.ajax({
						 url: args.url,
				         type:"post",
						 dataType:"json",
						 data: args.data,
						 success: function(data){
						     
							 if(typeof data["_error"] == "undefined" || data["_error"] == null)
						     {	 
							   buttonCustomization_onAddClicked();
							
							   if($("#buttonCustomizationGrid_Id_"+currentPageRef).html()!=null && $("#buttonCustomizationGrid_Id_"+currentPageRef).html()!="")
				               {
				            	 $("#buttonCustomizationGrid_Id_"+currentPageRef).trigger("reloadGrid");
				               }
				             } 
							 
							 _showProgressBar(false);
				 
							 }
					    });
						
						
					}
				}, 
				{
					url : delAction,
					data: {"sysParamBtnCustVO.BTN_ID": btnId }
				});	
	
}


function buttonCustomization_openButtonActionsDialog(rowId)
{
	
	var buttonCustomActionsDiv = $("<div id='buttonCustomActionsDiv' class='path-common-sceen customization-screen'></div>");
	buttonCustomActionsDiv.css("padding","0");
	var theBody = $('body');
	buttonCustomActionsDiv.insertAfter(theBody);
	
	var $table = $("#buttonCustomizationActionsGrid_Id_" + currentPageRef);
	var selectedRowObject = $table.jqGrid('getRowData', rowId);
	var operationId = selectedRowObject["sysParamBtnCustActionsVO.OP_ID"];
	var operationType = selectedRowObject["sysParamBtnCustActionsVO.OP_TYPE"];
	var serviceType = selectedRowObject["imImalApiVO.SERVICE_TYPE"];
		
	var btnId = $('#sysParamBtnCustVO_BTN_ID_' + currentPageRef).val();
	var curParams = {"buttonCustomizationCO.sysParamBtnCustActionsVO.BTN_ID":btnId,
					 "buttonCustomizationCO.sysParamBtnCustActionsVO.OP_ID":operationId,
					 "buttonCustomizationCO.sysParamBtnCustActionsVO.OP_TYPE":operationType,
					 "buttonCustomizationCO.imImalApiVO.SERVICE_TYPE":serviceType};
	var currPageRef = "";
	
	if(typeof currentPageRef != "undefined" || currentPageRef!=null)
	{
		curParams._pageRef = currentPageRef;
		currPageRef = currentPageRef;
	}
	
	var dialogTitle = "";
	if(operationType == 'A')
	{	
		dialogTitle = (typeof btn_cust_action_det_trns === undefined) ? "Action Details": btn_cust_action_det_trns;
	}
	else if (operationType == 'C')
	{
		dialogTitle = (typeof btn_cust_cond_det_trns === undefined) ? "Condition Details": btn_cust_cond_det_trns;
	}
	
	
	var srcURL = jQuery.contextPath+'/path/buttoncustomization/ButtonCustomizationMaint_loadButtonCustActionsDetails.action';

	_showProgressBar(true);
    
	var theHeight = 500;
	
	var theWidth = $.browser.msie?returnMaxWidth(900):returnMaxWidth(900);
	var closeBtnLbl = (typeof signature_close_btn === undefined )? "Close" :signature_close_btn;
	var buttons = [];
	
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	buttons.push({text:saveLabel,id:"custBtnActions_saveBtn",click:function()
																	{
																		var operationType = $('#sysParamBtnCustActionsVO_OP_TYPE_' + currentPageRef).val();
																		if(operationType != undefined && operationType == 'A')
																		{
																			buttonCustomizationActions_saveArgMap();
																		}
																		else
																		{
																			buttonCustomizationActions_saveCondMap();
																		}
																		
																	}}); 
	
	
	buttons.push({text:closeBtnLbl,id:"custBtnActions_closeBtn",click:function()
																	{
																		$("#buttonCustomActionsDiv").dialog("close");
																		$("#buttonCustomActionsDiv").remove();
																	}});
	
	
	var _dialogOptions = {
						modal:true, 
                        title:dialogTitle,
                   		autoOpen:false,
                       	show:'slide',
                       	dialogClass: 'no-close',
                       	closeOnEscape: false,
                       	position:'center', 
                        width:theWidth,
                        height:returnMaxHeight(theHeight),
                        close: function (){
			 								  $("#buttonCustomActionsDiv").dialog("destroy");
											  $("#buttonCustomActionsDiv").remove();
											  if($("#listMappingGrid_id_"+currPageRef).length>0)
									 	 	  {
									 	 		$("#listMappingGrid_id_"+currPageRef).remove();
									 	 	  }
										  },
						buttons :buttons
						};
	/**
	 * 
	 */
	$("#buttonCustomActionsDiv").load(srcURL, curParams, function() {});
	$("#buttonCustomActionsDiv").dialog(_dialogOptions);
	$("#buttonCustomActionsDiv").dialog("open");
	
	
}




// check if the save is comming from list parameter grid then no need to close the details dialog
function buttonCustomizationActions_saveArgMap(fromArgList)
{
	var changes = $("#buttonCustActionsDetailsForm_"+currentPageRef).hasChanges(true);
	if(changes == 'true' || changes == true)
	{
		_showProgressBar(true);
		parseNumbers();
		
		var saveAction = jQuery.contextPath+"/path/buttoncustomization/ButtonCustomizationMaint_saveButtonAction.action";
		
		var buttonCustForm  = $("#buttonCustActionsDetailsForm_"+currentPageRef).serializeForm();
		
		//in case of dynamic screen mapping
		if($('#dynScreenParamMapGrid_Id_' + currentPageRef).length > 0
				&& $('#imImalApiVO_SERVICE_TYPE_' + currentPageRef).val() == 'D')
		{
			var $table = $("#dynScreenParamMapGrid_Id_" + currentPageRef);
			//TP#934567 Button Customization Dynamic Screen Action Assignment - Parameter from Grid on Source Screen
			//check if FromSource = 'Grid' then Select Type cannot take as value empty option
			var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
			var selectedRowObject = $table.jqGrid('getRowData', selectedRowId);
			var fromSource = selectedRowObject["fromSource"];
			if("GRID" == fromSource)
			{
				var selectionType = selectedRowObject["sysParamElmDynScrnMapDet.SELECTION_TYPE"];
				if(selectionType =="")
				{
					_showProgressBar(false);
					_showErrorMsg(missing_selection_type_key);
					return;
				}
			}
			var checkRequiredCells = $table.jqGrid('checkRequiredCells');
			if(checkRequiredCells)
			{	
				var jsonOpUpdates = $table.jqGrid('getChangedTrimRowData',false);
				buttonCustForm += '&buttonCustomizationCO.dynScrParamMapGridUpdate=' + encodeURIComponent(jsonOpUpdates);
				buttonCustForm += '&buttonCustomizationCO.sysParamBtnCustActionsVO.SCREEN_WIDTH=' + $("#screenWidth_" + currentPageRef).val();
				buttonCustForm += '&buttonCustomizationCO.sysParamBtnCustActionsVO.SCREEN_HEIGHT=' + $("#screenHeight_" + currentPageRef).val();
				buttonCustForm += '&buttonCustomizationCO.sysParamBtnCustActionsVO.SCREEN_TITLE=' + $("#screenTitle_" + currentPageRef).val();
			}
			else
			{
				_showProgressBar(false);
				return; 
			}
		}
		
		$.ajax({
			 url: saveAction,
	         type:"post",
			 dataType:"json",
			 data: buttonCustForm,
			 success: function(data)
			 {
			 	 if((typeof data["_error"] == "undefined" || data["_error"] == null ) && !fromArgList)
				 {
			 	 	$("#buttonCustomActionsDiv").dialog("close");
			 	 }
			 	 _showProgressBar(false);
			 }
	    });
	}
}

function buttonCustomizationActions_reloadArgumentMapping()
{
	
	var actionId = $('#sysParamBtnCustActionsVOActionId_' + currentPageRef).val();
	
	if(actionId != undefined && actionId != null && actionId != '')
	{
		_showProgressBar(true);
		
		var btnCustSrc = jQuery.contextPath+"/path/buttoncustomization/ButtonCustomizationMaint_reloadParamMapping.action";
		
		var customButtonParams = {  "apiCodeValue" : actionId ,
									"sysParamBtnCustActionsVO.BTN_ID": $('#buttonCustomizationAction_btnId_' + currentPageRef).val(),
									"sysParamBtnCustActionsVO.REPORT_APP_NAME": $('#sysParamBtnCustActionsVORepApp_' + currentPageRef).val(),
									"imImalApiVO.SERVICE_TYPE":$('#sysParamBtnCustActionsVOServiceType_' + currentPageRef).val(),
									"sysParamBtnCustActionsVO.OP_ID": $('#sysParamBtnCustActionsVO_OP_ID_' + currentPageRef).val(),
									"_pageRef" : currentPageRef,
									"buttonCustomizationCO.globalOperationMode" : $('#buttonCustomization_globalOperationMode_'+currentPageRef).val()};
		
		$("#buttonCustActionsParamMapping_" + currentPageRef).load(btnCustSrc,customButtonParams, function() 
		{
				
			_showProgressBar(false);
			
		});
	}
	else
	{
		$("#buttonCustActionsParamMapping_" + currentPageRef).html('');
	}
}


function buttonCustomizationActions_reloadMappingSource(rowId,argId)
{
	if(rowId == undefined || rowId == null
			|| argId == undefined || argId == null)
	{
		return;	
	}	
	_showProgressBar(true);
	var divElement = $('#ArgumentSourceElementDiv_' + rowId + '_' + currentPageRef);  
	var btnCustSrc = jQuery.contextPath+"/path/buttoncustomization/ButtonCustomizationMaint_reloadMappingSource.action?rowId=" + rowId;
	var customButtonParams = {'buttonCustomizationCO.sysParamActionArgMapVO.ARG_ID' : argId,
							  'buttonCustomizationCO.sysParamActionArgMapVO.MAP_TYPE' : $('#ArgumentSource_'+rowId+'_'+currentPageRef+' option:selected').val(),
							  'buttonCustomizationCO.imApiArgumentVO.ARG_TYPE' : $('#btnCustLinkButtonType'+rowId+'_'+currentPageRef).val(),
							  '_pageRef' : currentPageRef};   
	divElement.load(btnCustSrc,customButtonParams, function() 
	{
		_showProgressBar(false);
	});
}

 
function btnCustOperation_onRowSelTopic(rowObj)
{
	var $table = $("#buttonCustomizationActionsGrid_Id_" + currentPageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var selectedRowObject = $table.jqGrid('getRowData', selectedRowId);
	var operationType = selectedRowObject["sysParamBtnCustActionsVO.OP_TYPE"];
	var readonlyParentOp = selectedRowObject["readonlyParentOp"];
	if(operationType == '')
	{
		operationType = returnHtmlEltValue( selectedRowId + '_operationDesc');
		$table.jqGrid('setCellValue', selectedRowId,"sysParamBtnCustActionsVO.OP_TYPE",operationType);

	}
	if(operationType == 'A')
	{
		 $table.jqGrid('setCellReadOnly', selectedRowId, "sysParamBtnCustActionsVO.COND_EXPR","true");
		 $table.jqGrid('setCellReadOnly', selectedRowId, "apiCodeValue","false");
		 $table.jqGrid('setCellReadOnly', selectedRowId, "serviceTypeDesc","false");
	}
	else if(operationType == 'C')
	{
		 $table.jqGrid('setCellReadOnly', selectedRowId, "apiCodeValue","true");
		 $table.jqGrid('setCellReadOnly', selectedRowId, "serviceTypeDesc","true");
		 $table.jqGrid('setCellReadOnly', selectedRowId, "sysParamBtnCustActionsVO.COND_EXPR","false");
		 $table.jqGrid('setCellValue', selectedRowId,"imImalApiVO.SERVICE_TYPE",'');
		 $table.jqGrid('setCellValue', selectedRowId,"serviceTypeDesc",'');
		 
		
		buttonCustomizationActions_applyAutoComplete(selectedRowId + "_sysParamBtnCustActionsVO.COND_EXPR",expression_btn_cond_tags);
	}
	
	
	var serviceType = returnHtmlEltValue( selectedRowId + '_serviceTypeDesc');
	$table.jqGrid('setCellValue', selectedRowId ,"imImalApiVO.SERVICE_TYPE",serviceType);
	
	if(readonlyParentOp != undefined && readonlyParentOp == '1')
	{
		$table.jqGrid('setCellReadOnly', selectedRowId, "sysParamBtnCustActionsVO.PARENT_OP_ID","true");
	}
}

function btnCustOperation_operationChanged()
{
	var $table = $("#buttonCustomizationActionsGrid_Id_" + currentPageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var selectedRowObject = $table.jqGrid('getRowData', selectedRowId);
	var operationType = selectedRowObject["operationDesc"];
	$table.jqGrid('setCellValue', selectedRowId,"sysParamBtnCustActionsVO.OP_TYPE",operationType);
	
	if(operationType == 'A')
	{
		$table.jqGrid('setCellReadOnly', selectedRowId, "sysParamBtnCustActionsVO.COND_EXPR","true");
		$table.jqGrid('setCellReadOnly', selectedRowId, "apiCodeValue","false");
		$table.jqGrid('setCellReadOnly', selectedRowId, "serviceTypeDesc","false");
		$table.jqGrid('setCellValue', selectedRowId,"sysParamBtnCustActionsVO.COND_EXPR",'');
	}
	else if(operationType == 'C')
	{
		$table.jqGrid('setCellReadOnly', selectedRowId, "apiCodeValue","true");
		$table.jqGrid('setCellReadOnly', selectedRowId, "serviceTypeDesc","true");
		$table.jqGrid('setCellReadOnly', selectedRowId, "sysParamBtnCustActionsVO.COND_EXPR","false");
		$table.jqGrid('setCellValue', selectedRowId,"apiCodeValue",'');
		$table.jqGrid('setCellValue', selectedRowId,"imImalApiVO.SERVICE_TYPE",'');
		$table.jqGrid('setCellValue', selectedRowId,"serviceTypeDesc",'');
		
		buttonCustomizationActions_applyAutoComplete(selectedRowId + "_sysParamBtnCustActionsVO.COND_EXPR",expression_btn_cond_tags);
	}
}

function btnCustOperation_actionTypeChanged()
{
	var $table = $("#buttonCustomizationActionsGrid_Id_" + currentPageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	$table.jqGrid('setCellValue', selectedRowId,"apiCodeValue",'');
	var selectedRowObject = $table.jqGrid('getRowData', selectedRowId);
	var serviceType = selectedRowObject["serviceTypeDesc"];
	$table.jqGrid('setCellValue', selectedRowId,"imImalApiVO.SERVICE_TYPE",serviceType);
}

function btnCustOperation_addOperationGrid()
{
	var thCustTbl =	$("#buttonCustomizationActionsGrid_Id_"+currentPageRef);
	// add new row
	var rId = thCustTbl.jqGrid('addInlineRow', {});
}

function btnCustOperation_deleteOperationGrid(theRowId)
{
	_showConfirmMsg((typeof Confirm_Delete_Process_key != undefined)?Confirm_Delete_Process_key:"Delete Selected Row?",confirm_msg_title,function(yesNo)
	    {
			if(yesNo) 
			{
				var $table = $("#buttonCustomizationActionsGrid_Id_" + currentPageRef);
				var selectedRowObject = $table.jqGrid('getRowData', theRowId);
				var opId = selectedRowObject["sysParamBtnCustActionsVO.OP_ID"];
				var opType = selectedRowObject["sysParamBtnCustActionsVO.OP_TYPE"];
				var btnId = $('#buttonCustomizationAction_btnId_' + currentPageRef).val();
				
				if(opId == '')
				{
					$("#buttonCustomizationActionsGrid_Id_"+currentPageRef).jqGrid('deleteGridRow',theRowId);	
				}
				else
				{
					_showProgressBar(true);
					var deleteAction = jQuery.contextPath+"/path/buttoncustomization/ButtonCustomizationMaint_deleteButtonAction.action";
					var deleteParam = { "sysParamBtnCustActionsVO.BTN_ID" : btnId,
										"sysParamBtnCustActionsVO.OP_ID" : opId,
										"sysParamBtnCustActionsVO.OP_TYPE" : opType};
					
					$.ajax({
						 url: deleteAction,
				         type:"post",
						 dataType:"json",
						 data: deleteParam,
						 success: function(data){
						     
							 if(typeof data["_error"] == "undefined" || data["_error"] == null)
						     {	 
								   if($("#buttonCustomizationActionsGrid_Id_"+currentPageRef).html()!=null && $("#buttonCustomizationActionsGrid_Id_"+currentPageRef).html()!="")
						           {
						            	 $("#buttonCustomizationActionsGrid_Id_"+currentPageRef).trigger("reloadGrid");
						           }
				             } 
							 
							 _showProgressBar(false);
							 
						 }
				    });
					
				}
				
			}
		},"yesNo");
	
}



function btnCustOperation_BtnFormatter(cellValue, options, rowObject) 
{
	if(rowObject != undefined 
		&& rowObject["sysParamBtnCustActionsVO"] != undefined
		&& rowObject["sysParamBtnCustActionsVO"]["OP_ID"] != undefined )
	{
		return '<a href = "#" onclick = "javascript:buttonCustomization_openButtonActionsDialog(' + options.rowId
				+ ');">' + details_key + '</a>';
	}
	else
	{
		return '';		
	}
}


function btnCustOperation_addCondGrid()
{
	var thCustTbl =	$("#buttonCustCondGrid_Id_"+currentPageRef);
	// add new row
	var rId = thCustTbl.jqGrid('addInlineRow', {});
}

function btnCustOperation_deleteCondGrid(theRowId)
{
	_showConfirmMsg((typeof Confirm_Delete_Process_key != undefined)?Confirm_Delete_Process_key:"Delete Selected Row?",confirm_msg_title,function(yesNo)
	    {
			if(yesNo) 
			{
				var $table = $("#buttonCustCondGrid_Id_" + currentPageRef);
				var selectedRowObject = $table.jqGrid('getRowData', theRowId);
				var lineNO = selectedRowObject["sysParamActionCondMapVO.LINE_NO"];
				var resultOpId = selectedRowObject["sysParamActionCondMapVO.RESULT_OP_ID"];
				
				if(lineNO == '')
				{
					$("#buttonCustCondGrid_Id_"+currentPageRef).jqGrid('deleteGridRow',theRowId);	
				}
				else
				{
					
					_showProgressBar(true);
					var deleteAction = jQuery.contextPath+"/path/buttoncustomization/ButtonCustomizationMaint_deleteButtonCondMap.action";
					var deleteParam = { 
										"sysParamActionCondMapVO.BTN_ID": $('#buttonCustomizationAction_btnId_' + currentPageRef).val(),
										"sysParamActionCondMapVO.OP_ID": $('#sysParamBtnCustActionsVO_OP_ID_' + currentPageRef).val(),
										"sysParamActionCondMapVO.LINE_NO" : lineNO,
										"sysParamActionCondMapVO.RESULT_OP_ID" : resultOpId};
					
					$.ajax({
						 url: deleteAction,
				         type:"post",
						 dataType:"json",
						 data: deleteParam,
						 success: function(data){
						     
							 if(typeof data["_error"] == "undefined" || data["_error"] == null)
						     {	 
								   if($("#buttonCustCondGrid_Id_"+currentPageRef).html()!=null && $("#buttonCustCondGrid_Id_"+currentPageRef).html()!="")
						           {
						            	 $("#buttonCustCondGrid_Id_"+currentPageRef).trigger("reloadGrid");
						           }
				             } 
							 
							 _showProgressBar(false);
							 
						 }
				    });
					
				}
			}
		},"yesNo");
}


function buttonCustomizationActions_saveCondMap()
{
	var $table = $("#buttonCustCondGrid_Id_" + currentPageRef);
	var jsonCondUpdates = $table.jqGrid('getChangedTrimRowData',false);
	
	if(jsonCondUpdates != undefined && jsonCondUpdates != '') 
	{
			_showProgressBar(true);
			var saveAction = jQuery.contextPath+"/path/buttoncustomization/ButtonCustomizationMaint_saveButtonCondMap.action";
			var saveParam = {"gridUpdate": jsonCondUpdates,
							 "sysParamActionCondMapVO.BTN_ID": $('#buttonCustomizationAction_btnId_' + currentPageRef).val(),
							 "sysParamActionCondMapVO.OP_ID": $('#sysParamBtnCustActionsVO_OP_ID_' + currentPageRef).val()};
			
			$.ajax({
				 url: saveAction,
		         type:"post",
				 dataType:"json",
				 data: saveParam,
				 success: function(data){
				     
					 if(typeof data["_error"] == "undefined" || data["_error"] == null)
				     {	 
						   if($("#buttonCustomizationActionsGrid_Id_"+currentPageRef).html()!=null && $("#buttonCustomizationActionsGrid_Id_"+currentPageRef).html()!="")
				           {
				            	 $("#buttonCustomizationActionsGrid_Id_"+currentPageRef).trigger("reloadGrid");
				           }
						   $("#buttonCustomActionsDiv").dialog("close");
		             } 
					 
					 _showProgressBar(false);
				 }
		    });
					
	}
	else
	{
		_showErrorMsg(changes_not_available_key,info_msg_title); 	
	}
}

/**
 * create a separate function to implement the autocomplete keydown event.
 * to avoid binding the same event many time since the autocomplete exists inside the grid 
 * @param {Object} event
 * @param {Object} theInput
 */
function buttonCustomizationActions_applyAutoCompleteKeyDown(event,theInput)
{
	if( event.keyCode === $.ui.keyCode.DOWN && !theInput.isopened)
	{
	       	theInput.autocomplete( "search", "" );
	}
}

function buttonCustomizationActions_applyAutoComplete(theInputId,expression_cust_tags)
{
	 var theInput = $("#"+theInputId);
	 //in case of autocomplete of a cell inside a grid, we need to use document.getElementById because $("#"+theInputId) returns empty
	 if(theInput != undefined && theInput != null && theInput.length == 0)
	 {
		 theInput = $(document.getElementById(theInputId));
	 }
	 // don't navigate away from the field on tab when selecting an item
	 // we change event to this to be compatibale with all browsers since event does not work with firefox
     theInput.bind( "keydown", buttonCustomizationActions_applyAutoCompleteKeyDown(this,theInput))
     .autocomplete({
       minLength: 0,
       inputId:theInputId,
       source: expression_cust_tags,
       open: function( event, ui )
       {
       	theInput.isopened = true;
       },
       close: function( event, ui )
       {
       	theInput.isopened = false;
       },
       focus: function()
       {
         // prevent value inserted on focus
         return false;
       },
       select: function( event, ui )
       {
          var cursPosition   = returnCursorPosStart(document.getElementById(theInputId));
    	  var strTillCurrPos = this.value.substring(0,cursPosition)
    	  /**
    	   * [MarwanMaddah]: this pattern will catch all the words 
    	   * that are exists in the input from index 0 untill the current cursor position
    	   * then the last word will be replaced by the selected value from the Search result
    	   */
    	  var patt       = /\S+/g;
    	  var result     = strTillCurrPos.match(patt);
          var firstPart  = "";
          if(result!= null && result.length > 0)
          {        	  
             var resultLgth = result.length;
             if(strTillCurrPos.lastIndexOf(result[resultLgth-1]) == 0 || 
            		 ( result[resultLgth-1].toLowerCase() == ui.item.value.toLowerCase() ))
             {
            	 firstPart  = strTillCurrPos.substring(0,strTillCurrPos.lastIndexOf(result[resultLgth-1]));
             }
             else
             {
            	 firstPart  = strTillCurrPos.substring(0,strTillCurrPos.lastIndexOf(result[resultLgth-1]) + result[resultLgth-1].length );
             }	 
          }
          else
          {
        	 firstPart = strTillCurrPos; 
          }
          this.value = firstPart + " " +ui.item.value +" "+ this.value.substring(cursPosition);
          
          var theform = document.getElementById("buttonCustomizationDetailsForm_"+currentPageRef);
		  $.data(theform, 'changeTrack', true);
          
          return false;
       }
     });
};

function buttonCustomization_afterGridLoad()
{
	var tableId = "buttonCustomizationGrid_Id_" + currentPageRef;
	var $table = $("#buttonCustomizationGrid_Id_" + currentPageRef);
		
	if($(".ui-icon-copy").length == 0)
	{
		$table.jqGrid ('navButtonAdd', '#'+tableId+'_pager',
						      { caption:btn_cust_copy_trns,
							  buttonicon: "ui-icon-copy",
							  title: btn_cust_copy_trns,
							  id: "buttonCustomizationGridCopyBtn_"+currentPageRef,
						      onClickButton: function() { buttonCustomization_openCopyButtonDialog();}});
	}
}

function buttonCustomization_openCopyButtonDialog()
{
	var buttonCustomCopyDiv = $("<div id='buttonCustomCopyDiv'></div>");
	buttonCustomCopyDiv.css("padding","0");
	var theBody = $('body');
	buttonCustomCopyDiv.insertAfter(theBody);
	
	var curParams = {};
	curParams._pageRef = currentPageRef;
	
	var dialogTitle = "Copy Button";
	
	var srcURL = jQuery.contextPath+'/path/buttoncustomization/ButtonCustomizationMaint_loadButtonCustCopyDialog.action';

	_showProgressBar(true);
    
	var theHeight = 300;
	
	var theWidth = $.browser.msie?returnMaxWidth(900):returnMaxWidth(900);
	var closeBtnLbl = (typeof signature_close_btn === undefined )? "Close" :signature_close_btn;
	var buttons = [];
	
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	
	buttons.push({text:btn_cust_copy_trns,id:"custBtnCopy_copyBtn",click:function()
																	{
																		buttonCustomization_copyButton();
																	}}); 
	
	
	buttons.push({text:closeBtnLbl,id:"custBtnCopy_closeBtn",click:function()
																	{
																		$("#buttonCustomCopyDiv").dialog("destroy");
																		$("#buttonCustomCopyDiv").remove();
																	}});
	
	
	var _dialogOptions = {
						modal:true, 
                        title:dialogTitle,
                   		autoOpen:false,
                       	show:'slide',
                       	dialogClass: 'no-close',
                       	closeOnEscape: false,
                       	position:'center', 
                        width:theWidth,
                        height:returnMaxHeight(theHeight),
                        close: function (){
			 								  $("#buttonCustomCopyDiv").dialog("destroy");
											  $("#buttonCustomCopyDiv").remove();
										  },
						buttons :buttons
						};
	/**
	 * 
	 */
	$("#buttonCustomCopyDiv").load(srcURL, curParams, function() {_showProgressBar(false);});
	$("#buttonCustomCopyDiv").dialog(_dialogOptions);
	$("#buttonCustomCopyDiv").dialog("open");

}

function buttonCustomization_copyButton()
{
	
	var $table = $("#buttonCustomizationGridCopy_Id_" + currentPageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var selectedRowObject = $table.jqGrid('getRowData', selectedRowId);
	
	var btnId = selectedRowObject["sysParamBtnCustVO.BTN_ID"];
	var toolbarId = $('#buttonCustomization_toolBarId_'+currentPageRef).val();
  	if(btnId == undefined || btnId == null || btnId == "")
	{
		_showErrorMsg(msg_noRecordSelectedLabel,Warning_key);
		return;
	}
	
  	_showProgressBar(true);
	var copyAction = jQuery.contextPath + "/path/buttoncustomization/ButtonCustomizationMaint_copyButtonCust.action";
	var copyArg = {'buttonId' : btnId,
				   '_pageRef':currentPageRef,
				   'toolbarId':toolbarId};
	
	$.ajax({
	 url: copyAction,
     type:"post",
	 dataType:"json",
	 data: copyArg,
	 success: function(data)
	 		{
	     		if(typeof data["_error"] == "undefined" || data["_error"] == null)
			    {	 
	     			var customButtonParams = {};
					customButtonParams["buttonCustomizationCO.sysParamBtnCustVO.BTN_ID"] = data["buttonCustomizationCO"]["operationId"];
					customButtonParams["buttonCustomizationCO.globalOperationMode"] 	= $('#buttonCustomization_globalOperationMode_'+currentPageRef).val();
					customButtonParams["_pageRef"] 	= currentPageRef;
					
					$("#buttonCustomCopyDiv").dialog("close");
					
					if($("#buttonCustomizationGrid_Id_"+currentPageRef).html()!=null && $("#buttonCustomizationGrid_Id_"+currentPageRef).html()!="")
	                {
	            		$("#buttonCustomizationGrid_Id_"+currentPageRef).trigger("reloadGrid");
	                }
					
					buttonCustomization_loadButtonCustDetails(customButtonParams);
		        } 
				_showProgressBar(false);
 			}
	});
	
}

function buttonCustomizationCO_checkIconValidation()
{
	if ($("#buttonCustomizationCO_buttonCustFile_"+_pageRef).length && !$("#buttonCustomizationCO_buttonCustFile_"+_pageRef).val()) {
		_showErrorMsg(Missing_File_Location_key);
		return false;
	}
	
	var splitName = $("#buttonCustomizationCO_buttonCustFile_"+_pageRef).val().split(".");
	
	if (splitName.length == 1 || (splitName[0] == "" && splitName.length == 2)) {
		_showErrorMsg(file_png_ext_key);
		return false;
	}
	
	if (splitName.pop().toLowerCase() != "png") {
		$("#buttonCustomizationCO_buttonCustFile_"+_pageRef).val("");
		_showErrorMsg(file_png_ext_key);
		return false;
	}
	
	 var theform = document.getElementById("buttonCustomizationDetailsForm_"+currentPageRef);
	 $.data(theform, 'changeTrack', true);
}

function buttonCustomizationParamMapGrid_mapTypeChanged(fromRowSel)
{
	var $table = $("#ButtonCustParamMapGrid_Id_" + currentPageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var selectedRowObject = $table.jqGrid('getRowData', selectedRowId);
	var mapTypeDesc = selectedRowObject["mapTypeDesc"];
	$table.jqGrid('setCellValue', selectedRowId,"sysParamGlobalActArgMapVO.MAP_TYPE",mapTypeDesc);
	
	//constant map type
	if(mapTypeDesc == '3')
	{
		$table.jqGrid('setCellReadOnly', selectedRowId, "sysParamGlobalActArgMapVO.MAP_VALUE","false");
		$table.jqGrid('setCellReadOnly', selectedRowId, "screenFldIdDesc","true");
		$table.jqGrid("setCellRequired", selectedRowId,"sysParamGlobalActArgMapVO.MAP_VALUE","true");
		$table.jqGrid("setCellRequired", selectedRowId,"screenFldIdDesc",false);
	}//screen or session map type or grid column
	else if(mapTypeDesc == '1' || mapTypeDesc == '2' || mapTypeDesc == '9')
	{
		$table.jqGrid('setCellReadOnly', selectedRowId, "screenFldIdDesc","false");
		$table.jqGrid('setCellReadOnly', selectedRowId, "sysParamGlobalActArgMapVO.MAP_VALUE","true");
		$table.jqGrid("setCellRequired", selectedRowId,"sysParamGlobalActArgMapVO.MAP_VALUE",false);
		$table.jqGrid("setCellRequired", selectedRowId,"screenFldIdDesc","true");
	}
	if(!fromRowSel)
	{
		$table.jqGrid('setCellValue', selectedRowId,"sysParamGlobalActArgMapVO.MAP_VALUE",'');
		$table.jqGrid('setCellValue', selectedRowId,"screenFldIdDesc",'');
		$table.jqGrid('setCellValue', selectedRowId,"mapDescription",'');
		
		$table.jqGrid('setCellValue', selectedRowId,"fromSource",'');
		enableDisableSelectionType();
	}
	
	buttonCustParamMapGrid_adjustMapValueResultList(mapTypeDesc,selectedRowId);
	
}

function buttonCustParamMapGrid_adjustMapValueResultList(mapTypeDesc,selectedRowId)
{
	var resultList = "";
	var dataAction = "";
	var paramList = "";
	var actionName = "";
	var dependencySrc = "";
	var dependency = "";
	var params = "";
	
	if(mapTypeDesc == '1') // Screen
	{
		if(!openedFromDynamicScreen(currentPageRef))
		{
			resultList = "'FLD_IDENTIFIER:screenFldIdDesc_lookuptxt,FIELD_KEY_LABEL_CODE:mapDescription,FROM_SOURCE:fromSource'";
		}
		else
		{
			resultList = "'elementIdValue:screenFldIdDesc_lookuptxt'";
			dataAction = "'"+ jQuery.contextPath + "/path/dynamicScreen/dynScreenLookupAction_drawingDynScreenElementsGrid'";
			paramList = "'screenId:screenId'";
			actionName = "'"+ jQuery.contextPath + "/path/dynamicScreen/dynScreenLookupAction_drawingDynScreenElementsGrid'";
			dependencySrc = jQuery.contextPath + "/path/dynamicScreen/dynDependencyAction_dependencyByScreenElementId";
			dependency = "dynamicScreenCO.elementIdValue:screenFldIdDesc_lookuptxt,dynamicScreenCO.elementId:mapDescription";
			params = "dynamicScreenCO.screenIdValue:screenId,dynamicScreenCO.elementIdValue:screenFldIdDesc_lookuptxt";
		}
	}
	else if( mapTypeDesc == '2') // Session
	{
		resultList = "'propertyName:screenFldIdDesc_lookuptxt'";
		dataAction = "'"+ jQuery.contextPath + "/path/buttoncustomization/ButtonCustomizationLookupAction_constructScreenElementsOrSessionLookup'";
		paramList = "'criteria.mapType:sysParamGlobalActArgMapVO.MAP_TYPE'";
		actionName = "'"+ jQuery.contextPath + "/path/buttoncustomization/ButtonCustomizationLookupAction_constructScreenElementsOrSessionLookup'";
		dependencySrc = jQuery.contextPath + "/path/buttoncustomization/ButtonCustomizationMaint_dependencyForScreenElementsOrSessionLookup";
		dependency = "buttonCustomizationCO.sysParamActionArgMapVO.MAP_VALUE:screenFldIdDesc_lookuptxt,buttonCustomizationCO.sysParamBtnCustVO.DESCRIPTION:mapDescription";
		params = "buttonCustomizationCO.sysParamActionArgMapVO.MAP_VALUE:screenFldIdDesc_lookuptxt,buttonCustomizationCO.sysParamActionArgMapVO.MAP_TYPE:sysParamGlobalActArgMapVO.MAP_TYPE";
	}
	else if( mapTypeDesc == '9')
	{
		resultList = "'propertyName:screenFldIdDesc_lookuptxt,description:mapDescription'";
	}
	
	
	if( (mapTypeDesc == '1' && openedFromDynamicScreen(currentPageRef)) || mapTypeDesc == '2'){
		
		jQuery.globalEval("options_liveSearch_screenFldIdDesc_ButtonCustParamMapGrid_Id_"  + currentPageRef + ".dataAction = " + dataAction);
		jQuery.globalEval("options_liveSearch_screenFldIdDesc_ButtonCustParamMapGrid_Id_"  + currentPageRef + ".paramList = " + paramList);
		jQuery.globalEval("options_liveSearch_screenFldIdDesc_ButtonCustParamMapGrid_Id_"  + currentPageRef + ".actionName = " + actionName);
		jQuery.globalEval("options_liveSearch_screenFldIdDesc_ButtonCustParamMapGrid_Id_"  + currentPageRef + ".resultList = " + resultList); 
		
		var $table = $("#ButtonCustParamMapGrid_Id_" + currentPageRef);
		var colModel = $table.jqGrid('getGridParam', 'colModel');

		for (var i = 0; i < colModel.length; i++)
		{
			if (colModel[i].name == 'screenFldIdDesc')
			{
				colModel[i].dependencySrc = dependencySrc;
				colModel[i].dependency = dependency;
				colModel[i].params = params;
				break;
			}
		}
		$table.jqGrid('setGridParam', 'colModel', colModel);
		
	}
	else if(mapTypeDesc == '1' || mapTypeDesc == '9')
	{
		jQuery.globalEval("options_liveSearch_screenFldIdDesc_ButtonCustParamMapGrid_Id_"  + currentPageRef + ".resultList = " + resultList);
	}
	
}

function openedFromDynamicScreen(currentPageRef)
{
	return ( $('#buttonCustParamMapGrid_PROG_REF_' + currentPageRef).parent('div#btnSourceScreenParamMapDiv').length == 1 );
}

function buttonCustParamMapGrid_onRowSelTopic(rowObj)
{
	var $table = $("#ButtonCustParamMapGrid_Id_" + currentPageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var selectedRowObject = $table.jqGrid('getRowData', selectedRowId);
	var mapTypeDesc = selectedRowObject["sysParamGlobalActArgMapVO.MAP_TYPE"];
	var dynParamTypeDesc = selectedRowObject["sysParamGlobalActArgMapVO.DYN_PARAM_TYPE"];

	if(dynParamTypeDesc == '')
	{
		dynParamTypeDesc = returnHtmlEltValue( selectedRowId + '_dynParamTypeDesc');
		$table.jqGrid('setCellValue', selectedRowId,"sysParamGlobalActArgMapVO.DYN_PARAM_TYPE",dynParamTypeDesc);

	}
	
	if(mapTypeDesc == '')
	{
		mapTypeDesc = returnHtmlEltValue( selectedRowId + '_mapTypeDesc');
		$table.jqGrid('setCellValue', selectedRowId,"sysParamGlobalActArgMapVO.MAP_TYPE",mapTypeDesc);

	}
	if(mapTypeDesc == '3')
	{
		$table.jqGrid('setCellReadOnly', selectedRowId, "sysParamGlobalActArgMapVO.MAP_VALUE","false");
		$table.jqGrid('setCellReadOnly', selectedRowId, "screenFldIdDesc","true");
		$table.jqGrid('setCellValue', selectedRowId,"screenFldIdDesc",'');
		$table.jqGrid("setCellRequired", selectedRowId,"sysParamGlobalActArgMapVO.MAP_VALUE","true");
		$table.jqGrid("setCellRequired", selectedRowId,"screenFldIdDesc",false);
	}
	else if(mapTypeDesc == '1' || mapTypeDesc == '2' || mapTypeDesc == '9')
	{
		$table.jqGrid('setCellReadOnly', selectedRowId, "screenFldIdDesc","false");
		$table.jqGrid('setCellReadOnly', selectedRowId, "sysParamGlobalActArgMapVO.MAP_VALUE","true");
		$table.jqGrid('setCellValue', selectedRowId,"sysParamGlobalActArgMapVO.MAP_VALUE",'');
		$table.jqGrid("setCellRequired", selectedRowId,"sysParamGlobalActArgMapVO.MAP_VALUE",false);
		$table.jqGrid("setCellRequired", selectedRowId,"screenFldIdDesc","true");
	}
	buttonCustParamMapGrid_adjustMapValueResultList(mapTypeDesc);
	disableEnableArgDynElemId(selectedRowObject["apiType"],true);
	enableDisableSelectionType();
	
	//Initialize rows default values
	var progRef = selectedRowObject["sysParamGlobalActArgMapVO.PROG_REF"];
	if(progRef == '')
	{
		$table.jqGrid('setCellValue', selectedRowId,"sysParamGlobalActArgMapVO.PROG_REF", $('#buttonCustParamMapGrid_PROG_REF_' + currentPageRef).val() );
	}
	
	var pageRef = selectedRowObject["sysParamGlobalActArgMapVO.SCREEN_ELEM_PROG_REF"];
	if(pageRef == '')
	{
		$table.jqGrid('setCellValue', selectedRowId,"sysParamGlobalActArgMapVO.SCREEN_ELEM_PROG_REF", $('#buttonCustParamMapGrid_currentPageRef_' + currentPageRef).val() );
	}
	var appName = selectedRowObject["sysParamGlobalActArgMapVO.APP_NAME"];
	if(appName == '')
	{
		$table.jqGrid('setCellValue', selectedRowId,"sysParamGlobalActArgMapVO.APP_NAME", $('#buttonCustParamMapGrid_APP_NAME_' + currentPageRef).val() );
	}
	
	var elemFldId = selectedRowObject["sysParamGlobalActArgMapVO.ELEM_FLD_IDENTIFIER"];
	if(elemFldId == '')
	{
		$table.jqGrid('setCellValue', selectedRowId,"sysParamGlobalActArgMapVO.ELEM_FLD_IDENTIFIER", $('#buttonCustParamMapGrid_ELEM_FLD_IDENTIFIER_' + currentPageRef).val() );
	}
	
	var btnId = selectedRowObject["sysParamGlobalActArgMapVO.BTN_ID"];
	if(btnId == '')
	{
		$table.jqGrid('setCellValue', selectedRowId,"sysParamGlobalActArgMapVO.BTN_ID", $('#buttonCustParamMapGrid_BTN_ID_' + currentPageRef).val() );
	}
	
	var mapDirection = selectedRowObject["sysParamGlobalActArgMapVO.MAP_DIRECTION"];
	if(mapDirection == '')
	{
		mapDirection = returnHtmlEltValue( selectedRowId + '_mapDirection');
		$table.jqGrid('setCellValue', selectedRowId,"sysParamGlobalActArgMapVO.MAP_DIRECTION",mapDirection);
	}
}

function buttonCustomizationParamMapGrid_afterOP_IDDependency(data)
{
	disableEnableArgDynElemId(data.buttonCustomizationCO.sysParamBtnCustActionsVO.API_TYPE);
}

function disableEnableArgDynElemId(apiType,fromRowSel)
{
	var $table = $("#ButtonCustParamMapGrid_Id_" + currentPageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var selectedRowObject = $table.jqGrid('getRowData', selectedRowId);
	var mapDirection = selectedRowObject["mapDirection"];
	
	$table.jqGrid('setCellReadOnly', selectedRowId, "mapTypeDesc","false");
	//integration or Report we should enable the arg_Id and disable dyn_elem_Id
	if((apiType == "1"|| apiType == "2") && mapDirection!=null)
	{
		$table.jqGrid('setCellReadOnly', selectedRowId, "sysParamGlobalActArgMapVO.ARG_ID","false");
		$table.jqGrid('setCellReadOnly', selectedRowId, "sysParamGlobalActArgMapVO.DYN_ELEM_IDENTIFIER","true");
		$table.jqGrid('setCellReadOnly', selectedRowId, "dynParamTypeDesc","true");
		$table.jqGrid('setCellValue', selectedRowId, "sysParamGlobalActArgMapVO.DYN_ELEM_IDENTIFIER",'');
		$table.jqGrid('setCellValue', selectedRowId, "dynElemDescription",'');
		$table.jqGrid('setCellReadOnly', selectedRowId, "mapDirection","false");
		$table.jqGrid("setCellRequired", selectedRowId,"sysParamGlobalActArgMapVO.ARG_ID","true");
		$table.jqGrid("setCellRequired", selectedRowId,"sysParamGlobalActArgMapVO.DYN_ELEM_IDENTIFIER",false);
		$table.jqGrid("setCellRequired", selectedRowId,"dynParamTypeDesc",false);
		if(!fromRowSel)
		{
			$table.jqGrid('setCellValue', selectedRowId, "sysParamGlobalActArgMapVO.ARG_ID",'');
			$table.jqGrid('setCellValue', selectedRowId, "argDescription",'');
		}
		if(apiType == "2")
		{
			$table.jqGrid('setCellValue', selectedRowId, "sysParamGlobalActArgMapVO.MAP_DIRECTION",'I');
			$table.jqGrid('setCellValue', selectedRowId, "mapDirection",'I');
			$table.jqGrid('setCellReadOnly', selectedRowId, "mapDirection","true");
			$table.jqGrid('setCellReadOnly', selectedRowId, "mapTypeDesc","false");
			mapDirection = "I";
			
		}
	}
	//dynamic screen we should disable the arg_Id and enable dyn_elem_Id
	else if(apiType == "3")
	{
		$table.jqGrid('setCellValue', selectedRowId, "sysParamGlobalActArgMapVO.MAP_DIRECTION",'I');
		$table.jqGrid('setCellValue', selectedRowId, "mapDirection",'I');
		mapDirection = "I";
		$table.jqGrid('setCellReadOnly', selectedRowId, "mapDirection","true");
		$table.jqGrid('setCellReadOnly', selectedRowId, "mapTypeDesc","false");
		$table.jqGrid('setCellReadOnly', selectedRowId, "sysParamGlobalActArgMapVO.ARG_ID","true");
		$table.jqGrid('setCellReadOnly', selectedRowId, "sysParamGlobalActArgMapVO.DYN_ELEM_IDENTIFIER","false");
		$table.jqGrid('setCellReadOnly', selectedRowId, "dynParamTypeDesc","false");
		$table.jqGrid('setCellValue', selectedRowId, "sysParamGlobalActArgMapVO.ARG_ID",'');
		$table.jqGrid('setCellValue', selectedRowId, "argDescription",'');
		$table.jqGrid("setCellRequired", selectedRowId,"sysParamGlobalActArgMapVO.ARG_ID",false);
		$table.jqGrid("setCellRequired", selectedRowId,"sysParamGlobalActArgMapVO.DYN_ELEM_IDENTIFIER",false);
		$table.jqGrid("setCellRequired", selectedRowId,"dynParamTypeDesc",false);
		if(!fromRowSel)
		{
			$table.jqGrid('setCellValue', selectedRowId, "sysParamGlobalActArgMapVO.DYN_ELEM_ID",'');
			$table.jqGrid('setCellValue', selectedRowId, "dynElemDescription",'');
		}
	}
	else
	{
		$table.jqGrid('setCellReadOnly', selectedRowId, "mapDirection","false");
		$table.jqGrid('setCellReadOnly', selectedRowId, "sysParamGlobalActArgMapVO.ARG_ID","true");
		$table.jqGrid('setCellReadOnly', selectedRowId, "sysParamGlobalActArgMapVO.DYN_ELEM_IDENTIFIER","true");
		$table.jqGrid('setCellReadOnly', selectedRowId, "dynParamTypeDesc","true");
		$table.jqGrid('setCellValue', selectedRowId, "sysParamGlobalActArgMapVO.ARG_ID",'');
		$table.jqGrid('setCellValue', selectedRowId, "argDescription",'');
		$table.jqGrid('setCellValue', selectedRowId, "sysParamGlobalActArgMapVO.DYN_ELEM_IDENTIFIER",'');
		$table.jqGrid('setCellValue', selectedRowId, "dynElemDescription",'');
		$table.jqGrid("setCellRequired", selectedRowId,"sysParamGlobalActArgMapVO.ARG_ID",false);
		$table.jqGrid("setCellRequired", selectedRowId,"sysParamGlobalActArgMapVO.DYN_ELEM_IDENTIFIER",false);
		$table.jqGrid("setCellRequired", selectedRowId,"dynElemDescription",false);
	}
	
	if(mapDirection=="O")
	{
		$table.jqGrid('setCellReadOnly', selectedRowId, "mapTypeDesc","true");
		$table.jqGrid('setCellValue', selectedRowId,"sysParamGlobalActArgMapVO.MAP_TYPE",1);
		$table.jqGrid('setCellValue', selectedRowId,"mapTypeDesc",1);
		buttonCustomizationParamMapGrid_mapTypeChanged(fromRowSel);
	}
}

function buttonCustomizationParamMapGrid_mapDirectionChanged()
{
	var $table = $("#ButtonCustParamMapGrid_Id_" + currentPageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var selectedRowObject = $table.jqGrid('getRowData', selectedRowId);
	var mapDirection = selectedRowObject["mapDirection"];
	$table.jqGrid('setCellValue', selectedRowId,"sysParamGlobalActArgMapVO.MAP_DIRECTION",mapDirection);
	
	disableEnableArgDynElemId(selectedRowObject["apiType"],false);
}

function ButtonCustParamMapGrid_addMapGrid()
{
	var thCustTbl =	$("#ButtonCustParamMapGrid_Id_"+currentPageRef);
	// add new row
	var rId = thCustTbl.jqGrid('addInlineRow', {});
	
	if(openedFromDynamicScreen(currentPageRef))
	{
		var screenId = $('#screenId').val();
		var elementId = $('#elementId').val();
		thCustTbl.jqGrid('setCellValue', rId,"sysParamGlobalActArgMapVO.DYN_SCREEN_ID", screenId );
		thCustTbl.jqGrid('setCellValue', rId,"sysParamGlobalActArgMapVO.DYN_SCREEN_ELEMENT_ID", elementId );
	}
}

function ButtonCustParamMapGrid_deleteMapGrid(theRowId)
{
	_showConfirmMsg((typeof Confirm_Delete_Process_key != undefined)?Confirm_Delete_Process_key:"Delete Selected Row?",confirm_msg_title,function(yesNo)
		    {
				if(yesNo) 
				{
					var $table = $("#ButtonCustParamMapGrid_Id_" + currentPageRef);
					var selectedRowObject = $table.jqGrid('getRowData', theRowId);
					var mapId = selectedRowObject["sysParamGlobalActArgMapVO.MAP_ID"];
					
					if(mapId == '')
					{
						$("#ButtonCustParamMapGrid_Id_"+currentPageRef).jqGrid('deleteGridRow',theRowId);	
					}
					else
					{
						
						_showProgressBar(true);
						var deleteAction = jQuery.contextPath+"/path/buttoncustomization/ButtonCustomizationMaint_deleteButtonCustFieldMapping.action";
						var deleteParam = { 
											"buttonCustomizationCO.mapId": mapId
										  };
						
						$.ajax({
							 url: deleteAction,
					         type:"post",
							 dataType:"json",
							 data: deleteParam,
							 success: function(data){
							     
								 if(typeof data["_error"] == "undefined" || data["_error"] == null)
							     {	 
									   if($("#ButtonCustParamMapGrid_Id_"+currentPageRef).html()!=null && $("#ButtonCustParamMapGrid_Id_"+currentPageRef).html()!="")
							           {
							            	 $("#ButtonCustParamMapGrid_Id_"+currentPageRef).trigger("reloadGrid");
							           }
					             } 
								 
								 _showProgressBar(false);
								 
							 }
					    });
					}
				}
			},"yesNo");	
}

function buttonCustOutputMapGrid_addMappingGrid()
{
	var thCustTbl =	$("#ButtonCustOutMapGrid_Id_"+currentPageRef);
	// add new row
	var rId = thCustTbl.jqGrid('addInlineRow', {});
}

function buttonCustOutputMapGrid_deleteMapGrid(theRowId)
{
	_showConfirmMsg((typeof Confirm_Delete_Process_key != undefined)?Confirm_Delete_Process_key:"Delete Selected Row?",confirm_msg_title,function(yesNo)
		    {
				if(yesNo) 
				{
					var $table = $("#ButtonCustOutMapGrid_Id_" + currentPageRef);
					var selectedRowObject = $table.jqGrid('getRowData', theRowId);
					var btnId = selectedRowObject["sysParamBtnCustOutMap.BTN_ID"];
					var opId  = selectedRowObject["sysParamBtnCustOutMap.OP_ID"];
					var lineNo = selectedRowObject["sysParamBtnCustOutMap.LINE_NO"];
					
					if(lineNo == '')
					{
						$("#ButtonCustOutMapGrid_Id_"+currentPageRef).jqGrid('deleteGridRow',theRowId);	
					}
					else
					{
						
						_showProgressBar(true);
						var deleteAction = jQuery.contextPath+"/path/buttoncustomization/ButtonCustomizationMaint_deleteButtonCustOutMap.action";
						var deleteParam = { 
											"buttonCustomizationCO.sysParamBtnCustOutMap.OP_ID": opId,
											"buttonCustomizationCO.sysParamBtnCustOutMap.BTN_ID": btnId,
											"buttonCustomizationCO.sysParamBtnCustOutMap.LINE_NO": lineNo
										  };
						
						$.ajax({
							 url: deleteAction,
					         type:"post",
							 dataType:"json",
							 data: deleteParam,
							 success: function(data){
							     
								 if(typeof data["_error"] == "undefined" || data["_error"] == null)
							     {	 
									   if($("#ButtonCustOutMapGrid_Id_"+currentPageRef).html()!=null && $("#ButtonCustOutMapGrid_Id_"+currentPageRef).html()!="")
							           {
							            	 $("#ButtonCustOutMapGrid_Id_"+currentPageRef).trigger("reloadGrid");
							           }
					             } 
								 
								 _showProgressBar(false);
								 
							 }
					    });
					}
				}
			},"yesNo");	
}

function buttonCustArgListGrid_openListGrid(rowId)
{
	var operationId = $("#sysParamBtnCustActionsVO_OP_ID_"+currentPageRef).val();
	var argId 		= $("#ArgumentSourceArgId_"+rowId+"_"+currentPageRef).val();
	var btnId 		= $("#sysParamBtnCustActionsVO_BTN_ID_"+currentPageRef).val();
		
	var curParams = {"buttonCustomizationCO.sysParamActionArgList.BTN_ID":btnId,
					 "buttonCustomizationCO.sysParamActionArgList.OP_ID":operationId,
					 "buttonCustomizationCO.sysParamActionArgList.ARG_ID":argId};
	var currPageRef = "";
	
	if(typeof currentPageRef != "undefined" || currentPageRef!=null)
	{
		curParams._pageRef = currentPageRef;
		currPageRef = currentPageRef;
	}
	
	var dialogTitle =  (typeof btn_cust_action_det_trns === undefined) ? "Action Details": btn_cust_action_det_trns;
	
	var srcURL = jQuery.contextPath+'/path/buttoncustomization/ButtonCustomizationMaint_loadButtonActionsArgList.action';

	_showProgressBar(true);
    
	var theHeight = 500;
	
	var theWidth = $.browser.msie?returnMaxWidth(900):returnMaxWidth(900);
	var closeBtnLbl = (typeof signature_close_btn === undefined )? "Close" :signature_close_btn;
	var buttons = [];
	
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	buttons.push({
		text : saveLabel,
		id : "buttonCustArgList_saveBtn",
		click : function()
		{
			var saveParent    = false;
			var jsonOpUpdates = null;
			if($('#ButtonCustArgListGrid_Id_' + currPageRef).length > 0)
			{
				var $table = $("#ButtonCustArgListGrid_Id_" + currPageRef);
				var checkRequiredCells = $table.jqGrid('checkRequiredCells');
				if(checkRequiredCells)
				{	
					jsonOpUpdates = $table.jqGrid('getChangedTrimRowData',false);
				}
				else
				{
					_showProgressBar(false);
					return; 
				}
			}
			if(jsonOpUpdates != null && jsonOpUpdates != "")
			{
				saveParent = JSON.parse($table.jqGrid('getChangedTrimRowData',false)).root.length==JSON.parse($table.jqGrid('getAllRows',false)).root.length?true:false;
				_showProgressBar(true);
				
				var saveAction = jQuery.contextPath+"/path/buttoncustomization/ButtonCustomizationMaint_saveButtonActionArgList.action";
				$.ajax({
					 url: saveAction,
			         type:"post",
					 dataType:"json",
					 data: {'buttonCustomizationCO.actionArgListGridUpdate':jsonOpUpdates},
					 success: function(data)
					 {
					 	 if(typeof data["_error"] == "undefined" || data["_error"] == null)
						 {
							if (saveParent)
							{
								buttonCustomizationActions_saveArgMap(true);
							}
							//$("#listMappingGrid_id_" + currPageRef).remove();
							$("#listMappingGrid_id_"+ currPageRef).dialog("close");
					 	 }
					 	 _showProgressBar(false);
					 }
			    });
			}
			else
			{
				_showErrorMsg(changes_not_available_key,info_msg_title);
			}
		}
	}); 
	
	buttons.push({
		text : closeBtnLbl,
		id : "buttonCustArgList_closeBtn",
		click : function()
		{
			$("#listMappingGrid_id_" + currPageRef).dialog("destroy");
		}
	});
	
	
	var _dialogOptions = {
						modal:true, 
                        title:dialogTitle,
                   		autoOpen:false,
                       	show:'slide',
                       	dialogClass: 'no-close',
                       	closeOnEscape: true,
                       	position:'center', 
                        width:theWidth,
                        height:returnMaxHeight(theHeight),
                        close: function (){
			 								  $("#listMappingGrid_id_"+currPageRef).dialog("destroy");
										  },
						buttons :buttons
						};
	/**
	 * 
	 */
	$("#listMappingGrid_id_"+currPageRef).load(srcURL, curParams, function() {});
	$("#listMappingGrid_id_"+currPageRef).dialog(_dialogOptions);
	$("#listMappingGrid_id_"+currPageRef).dialog("open");
}

function buttonCustArgListGrid_listTypeChanged()
{
	var $table = $("#ButtonCustArgListGrid_Id_" + currentPageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var selectedRowObject = $table.jqGrid('getRowData', selectedRowId);
	$table.jqGrid('setCellValue', selectedRowId,"sysParamActionArgListVO.LIST_TYPE", selectedRowObject["listTypeDescription"] );
}

function buttonCustArgListGrid_addListGrid()
{
	var thCustTbl =	$("#ButtonCustArgListGrid_Id_"+currentPageRef);
	// add new row
	var rId = thCustTbl.jqGrid('addInlineRow', {});
}
function buttonCustArgListGrid_deleteListGrid(theRowId)
{
	_showConfirmMsg((typeof Confirm_Delete_Process_key != undefined)?Confirm_Delete_Process_key:"Delete Selected Row?",confirm_msg_title,function(yesNo)
		    {
				if(yesNo) 
				{
					var $table = $("#ButtonCustArgListGrid_Id_" + currentPageRef);
					var selectedRowObject = $table.jqGrid('getRowData', theRowId);
					var lineNo = selectedRowObject["sysParamActionArgListVO.LINE_NO"];
					
					if(lineNo == '')
					{
						$("#ButtonCustArgListGrid_Id_"+currentPageRef).jqGrid('deleteGridRow',theRowId);	
					}
					else
					{
						
						_showProgressBar(true);
						var deleteAction = jQuery.contextPath+"/path/buttoncustomization/ButtonCustomizationMaint_deleteButtonActionArgList.action";
						var deleteParam = { 
											"buttonCustomizationCO.sysParamActionArgList.LINE_NO": lineNo,
											"buttonCustomizationCO.sysParamActionArgList.BTN_ID" : selectedRowObject["sysParamActionArgListVO.BTN_ID"],
											"buttonCustomizationCO.sysParamActionArgList.OP_ID"  : selectedRowObject["sysParamActionArgListVO.OP_ID"],
											"buttonCustomizationCO.sysParamActionArgList.ARG_ID" : selectedRowObject["sysParamActionArgListVO.ARG_ID"]
										  };
						
						$.ajax({
							 url: deleteAction,
					         type:"post",
							 dataType:"json",
							 data: deleteParam,
							 success: function(data){
							     
								 if(typeof data["_error"] == "undefined" || data["_error"] == null)
							     {	 
									   if($("#ButtonCustArgListGrid_Id_"+currentPageRef).html()!=null && $("#ButtonCustArgListGrid_Id_"+currentPageRef).html()!="")
							           {
							            	 $("#ButtonCustArgListGrid_Id_"+currentPageRef).trigger("reloadGrid");
							           }
					             } 
								 
								 _showProgressBar(false);
								 
							 }
					    });
					}
				}
			},"yesNo");	
}

// on row select set the initial variables.
function buttonCustArgListGrid_onRowSelTopic()
{
	var $table = $("#ButtonCustArgListGrid_Id_" + currentPageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var selectedRowObject = $table.jqGrid('getRowData', selectedRowId);
	
	
	var argId = selectedRowObject["sysParamActionArgListVO.ARG_ID"];
	if(argId == '')
	{
		$table.jqGrid('setCellValue', selectedRowId,"sysParamActionArgListVO.ARG_ID", $('#buttonCustArgListGrid_argId_' + currentPageRef).val() );
	}
	
	var btnId = selectedRowObject["sysParamActionArgListVO.BTN_ID"];
	if(btnId == '')
	{
		$table.jqGrid('setCellValue', selectedRowId,"sysParamActionArgListVO.BTN_ID", $('#buttonCustArgListGrid_btnId_' + currentPageRef).val());
	}
	
	var opId = selectedRowObject["sysParamActionArgListVO.OP_ID"];
	if(opId == '')
	{
		$table.jqGrid('setCellValue', selectedRowId,"sysParamActionArgListVO.OP_ID",$('#buttonCustArgListGrid_opId_' + currentPageRef).val());
	}
	var listType = selectedRowObject["sysParamActionArgListVO.LIST_TYPE"];
	if(listType == '')
	{
		$table.jqGrid('setCellValue', selectedRowId,"sysParamActionArgListVO.LIST_TYPE",selectedRowObject["listTypeDescription"]);
	}
}

function hideMapValue(id)
{
	if($("#btnCustDefaultMapping"+id)[0].checked == true)
	{
		$("#btnCustSourceMapValue"+id).val("");
		$("#btnCustSourceMapValue"+id).hide();
	}
	else
	{
		$("#btnCustSourceMapValue"+id).show();
	}
}

function buttonCustomizationParamMapGrid_dynParamTypeChanged()
{
	var $table = $("#ButtonCustParamMapGrid_Id_" + currentPageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var selectedRowObject = $table.jqGrid('getRowData', selectedRowId);
	var mapTypeDesc = selectedRowObject["dynParamTypeDesc"];
	$table.jqGrid('setCellValue', selectedRowId,"sysParamGlobalActArgMapVO.DYN_PARAM_TYPE",mapTypeDesc);
	$table.jqGrid('setCellValue', selectedRowId,"sysParamGlobalActArgMapVO.DYN_ELEM_IDENTIFIER",'');
	$table.jqGrid('setCellValue', selectedRowId,"dynElemDescription",'');
}


function enableDisableSelectionType()
{
	var $table = $("#ButtonCustParamMapGrid_Id_" + currentPageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var selectedRowObject = $table.jqGrid('getRowData', selectedRowId);
	var fromSource = selectedRowObject["fromSource"];
	var delimiter = selectedRowObject["sysParamGlobalActArgMapVO.DELIMITER"];
	var mapDirection = selectedRowObject["mapDirection"];
	//TP#934567 Button Customization Dynamic Screen Action Assignment - Parameter from Grid on Source Screen
	if("GRID" == fromSource  && mapDirection =='I')
	{
		$table.jqGrid('setCellReadOnly', selectedRowId, "sysParamGlobalActArgMapVO.DELIMITER","false");
		$table.jqGrid('setCellRequired', selectedRowId, "sysParamGlobalActArgMapVO.DELIMITER","true");
		$table.jqGrid('setCellReadOnly', selectedRowId, "sysParamGlobalActArgMapVO.SELECTION_TYPE","false");
	}else
	{
		$table.jqGrid('setCellValue', selectedRowId,"sysParamGlobalActArgMapVO.DELIMITER",'');
		$table.jqGrid('setCellValue', selectedRowId,"sysParamGlobalActArgMapVO.SELECTION_TYPE","");
		$table.jqGrid('setCellReadOnly', selectedRowId, "sysParamGlobalActArgMapVO.DELIMITER","true");
		$table.jqGrid('setCellRequired', selectedRowId, "sysParamGlobalActArgMapVO.DELIMITER","false");
		$table.jqGrid('setCellReadOnly', selectedRowId, "sysParamGlobalActArgMapVO.SELECTION_TYPE","true");
	}
	
	// HusseinZaraket - TP #889735 : enable-disable ARG_ADDITIONAL_ATTR_YN checkbox in grid
	var screenFldIdDesc = selectedRowObject["screenFldIdDesc"];
	var mapDescription  = selectedRowObject["mapDescription"];
	if(null != screenFldIdDesc 
			&& undefined != screenFldIdDesc 
			&& "" != screenFldIdDesc 
			&& null != mapDescription 
			&& undefined != mapDescription 
			&& "" != mapDescription
			&& $("input[id='"+ screenFldIdDesc +"'][propid='"+ mapDescription +"'][type='file']").length > 0)
	{
		$table.jqGrid('setCellReadOnly', selectedRowId, "sysParamGlobalActArgMapVO.ARG_ADDITIONAL_ATTR_YN","false");
	}
	else
	{
		$table.jqGrid('setCellReadOnly', selectedRowId, "sysParamGlobalActArgMapVO.ARG_ADDITIONAL_ATTR_YN","true");
		$table.jqGrid('setCellValue'   , selectedRowId, "sysParamGlobalActArgMapVO.ARG_ADDITIONAL_ATTR_YN","0");
	}
}
