function bpmMaint_openForwardTask(taskId)
{
	if(taskId != null && taskId != undefined)
	{
		_showProgressBar(true);
		
		var bpmTaskForwardDiv = $("<div id='bpmTaskForwardDiv' class='path-common-sceen'></div>");
		bpmTaskForwardDiv.css("padding","0");
		var theBody = $('body');
		bpmTaskForwardDiv.insertAfter(theBody);
		
		var curParams = { "bpmCO.bpmTaskId" : taskId };
		
		var dialogTitle = bpm_forward_key_trns;
		var srcURL = jQuery.contextPath+'/path/bpm/BpmMaint_loadBpmTaskForwardPage.action';
		
		var theHeight = 150;
		
		var theWidth = $.browser.msie?returnMaxWidth(300):returnMaxWidth(300);
		var closeBtnLbl = (typeof signature_close_btn === undefined )? "Close" :signature_close_btn;
		var buttons = [];
		
		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		var _dialogOptions = {
							modal:true, 
	                        title:dialogTitle,
	                   		autoOpen:false,
	                       	//dialogClass: 'no-close',
	                       	closeOnEscape: false,
	                       	position:'center', 
	                        width:theWidth,
	                        height:returnMaxHeight(theHeight),
	                        close: function (){
				 								  $("#bpmTaskForwardDiv").dialog("destroy");
												  $("#bpmTaskForwardDiv").remove();
											  },
							buttons :buttons
							};
		/**
		 * 
		 */
		$("#bpmTaskForwardDiv").load(srcURL, curParams, function() {_showProgressBar(false);});
		$("#bpmTaskForwardDiv").dialog(_dialogOptions);
		$("#bpmTaskForwardDiv").dialog("open");
	}
	
}

function bpmMaint_forwardTask()
{
	_showProgressBar(true);
	parseNumbers();	
	var actionURL = jQuery.contextPath + "/path/bpm/BpmMaint_forwardTask.action";
	var theForm = $("#bpmTaskForwardForm_Id").serialize();
	
	$.ajax({
		 url: actionURL,
         type:"post",
		 dataType:"json",
		 data: theForm,
		 success: function(data)
		 {
			 $("#bpmTaskForwardDiv").dialog("close");
			 		
			 if(!(typeof data["_error"] == "undefined" || data["_error"] == null))
			 {
		 		_showProgressBar(false);
		 		return;
		 	 }
		 	$("#bpmUserTasksGrid_Id_user").trigger("reloadGrid");
		 	$("#bpmUserTasksGrid_Id_procInst").trigger("reloadGrid");
		 	//the progress bar has changed to the level on complete topics to avoid clicking claim twice
		 	// _showProgressBar(false);
		 }
    });
}

function bpmMaint_releaseTask(taskId)
{
	if(taskId != null && taskId != undefined)
	{
		_showProgressBar(true);
		
		var actionURL = jQuery.contextPath + "/path/bpm/BpmMaint_releaseTask.action";
		
		$.ajax({
			 url: actionURL,
	         type:"post",
			 dataType:"json",
			 data: {'bpmTaskId':taskId},
			 success: function(data)
			 {
				 if(!(typeof data["_error"] == "undefined" || data["_error"] == null))
				 {
			 		_showProgressBar(false);
			 		return;
			 	 }
				$("#bpmUserTasksGrid_Id_user").trigger("reloadGrid");
				$("#bpmUserTasksGrid_Id_procInst").trigger("reloadGrid");
			 	//the progress bar has changed to the level on complete topics to avoid clicking claim twice
			 	// _showProgressBar(false);
			 }
	    });
	}
}

function bpmMaint_claimTask(taskId)
{
	if(taskId != null && taskId != undefined)
	{
		_showProgressBar(true);
		
		var actionURL = jQuery.contextPath + "/path/bpm/BpmMaint_claimTask.action";
		
		$.ajax({
			 url: actionURL,
	         type:"post",
			 dataType:"json",
			 data: {'bpmTaskId':taskId},
			 success: function(data)
			 {
			 	 if(!(typeof data["_error"] == "undefined" || data["_error"] == null))
				 {
			 		_showProgressBar(false);
			 		return;
			 	 }
			 	$("#bpmUserTasksGrid_Id_user").trigger("reloadGrid");
			 	$("#bpmUserTasksGrid_Id_procInst").trigger("reloadGrid");
			 	//the progress bar has changed to the level on complete topics to avoid clicking claim twice
			 	// _showProgressBar(false);
			 }
	    });
	}
}

function bpmMaint_completeTask(taskId,processInstanceId)
{
	_showConfirmMsg(bpm_confirm_complete_task_trns, confirm_msg_title, function(confirmcChoice, theArgs){
		if(confirmcChoice)
		{
			var taskId = theArgs.taskId;
			if(taskId != null && taskId != undefined)
			{
				_showProgressBar(true);
				
				var actionURL = jQuery.contextPath + "/path/bpm/BpmMaint_completeTask.action";
				
				$.ajax({
					 url: actionURL,
			         type:"post",
					 dataType:"json",
					 data: {'bpmTaskId':taskId,'processInstanceId':processInstanceId},
					 success: function(data)
					 {
						 if(!(typeof data["_error"] == "undefined" || data["_error"] == null))
						 {
					 		_showProgressBar(false);
					 		return;
					 	 }
					 	$("#bpmUserTasksGrid_Id_user").trigger("reloadGrid");
					 	$("#bpmUserTasksGrid_Id_procInst").trigger("reloadGrid");
					 	//the progress bar has changed to the level on complete topics to avoid clicking complete twice
					 	// _showProgressBar(false);
					 }
			    });
			}
			
			
			
		}
	}, {"taskId" : taskId});
	
}

function bpmMaint_startProcess(processDefId , deploymentId, processName)
{
	if(processDefId != null && processDefId != undefined && processDefId != ''
		&& deploymentId != null && deploymentId != undefined && deploymentId != '')
	{
		_showProgressBar(true);
		
		var	actionURL = jQuery.contextPath + "/path/bpm/BpmMaint_startProcessInstance.action";
		var parameters = 'bpmCO.processDefId=' + processDefId + '&bpmCO.deploymentId=' + deploymentId + '&bpmCO.processName=' + processName;
		var theForm = $("#bpmProcessVarStartUpForm").serialize();
		parameters += theForm;
		
		$.ajax({
			 url: actionURL,
	         type:"post",
			 dataType:"json",
			 data: parameters,
			 success: function(data)
			 {
			 	 if(!(typeof data["_error"] == "undefined" || data["_error"] == null))
				 {
			 		_showProgressBar(false);
			 		return;
			 	 }
			 	 $("#bpmUserTasksGrid_Id_user").trigger("reloadGrid");
			 	$("#bpmUserTasksGrid_Id_procInst").trigger("reloadGrid");
			 	//the progress bar has changed to the level on complete topics to avoid clicking complete twice
			 	// _showProgressBar(false);
			 }
	    });
	}
}

function bpmMaint_openStartProcessWithVar(processDefId , deploymentId, processName)
{
	_showProgressBar(true);
	
	var bpmStartProcessWithVar = $("<div id='bpmStartProcessWithVar' class='path-common-sceen'></div>");
	bpmStartProcessWithVar.css("padding","0");
	var theBody = $('body');
	bpmStartProcessWithVar.insertAfter(theBody);
	
	var curParams = { "bpmCO.processDefId" : processDefId , "bpmCO.processName" : processName, "bpmCO.deploymentId" : deploymentId };
	
	var dialogTitle = (typeof bpm_start_key_trns === undefined) ? "Input Mapping": bpm_start_key_trns;
	var srcURL = jQuery.contextPath+'/path/bpm/BpmMaint_startProcessInstanceWithVariables.action';
	var theHeight = returnMaxHeight(400);
	var theWidth  = returnMaxWidth(700);
	var closeBtnLbl = (typeof signature_close_btn === undefined )? "Close" :signature_close_btn;
	var buttons = [];
	
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	buttons.push({text:bpm_start_key_trns,id:"bpmStartWithProcessVar_startBtn",click:function()
																	{
																		var result = $('#bpmProcessVarStartUpForm').validate().form();
																		if(result == false)
																		{
																			return;
																		}
																		bpmMaint_startProcess(processDefId , deploymentId, processName);
																		$("#bpmStartProcessWithVar").dialog("close");
																		
																	}}); 
	
	
	buttons.push({text:closeBtnLbl,id:"bpmStartWithProcessVar_closeBtn",click:function()
																	{
																		$("#bpmStartProcessWithVar").dialog("destroy");
																		$("#bpmStartProcessWithVar").remove();
																	}});
	
	var _dialogOptions = {
						modal:true, 
                        title:dialogTitle + " " + processName,
                   		autoOpen:false,
                       	show:'slide',
                       	dialogClass: 'no-close',
                       	closeOnEscape: false,
                       	position:'center', 
                        width:theWidth,
                        height:theHeight,
                        close: function (){
			 								  $("#bpmStartProcessWithVar").dialog("destroy");
											  $("#bpmStartProcessWithVar").remove();
										  },
						buttons :buttons
						};
	/**
	 * 
	 */
	$("#bpmStartProcessWithVar").load(srcURL, curParams, function() {
																		//note that the function bpmMaint_startProcess used in processAfterValid is set as a dummy function, because it will not be called.
																		//when click on start button we will call  $('#bpmProcessVarStartUpForm').validate().form() and if it is valid we will call bpmMaint_startProcess()
																		$("#bpmProcessVarStartUpForm").processAfterValid("bpmMaint_startProcess",[]);	
																		
																		if($('#bpmProcessVar_VariableValue_1').length<=0)
																		{
																			_dialogOptions.width = returnMaxWidth(500);
																			_dialogOptions.height = returnMaxHeight(200);
																		}
																		
																		$("#bpmStartProcessWithVar").dialog(_dialogOptions);
																		$("#bpmStartProcessWithVar").dialog("open");
																		
																		_showProgressBar(false);
																	});
	
}

function bpmMaint_openProcessImage(processDefId , deploymentId, processInstanceId)
{
	if(processDefId != null && processDefId != undefined && processDefId != ''
		&& deploymentId != null && deploymentId != undefined && deploymentId != '')
	{
		_showProgressBar(true);
		
		var actionURL = jQuery.contextPath + "/path/bpm/BpmMaint_loadBpmProcessImage.action";
		var actionParams = {'processDefId':processDefId,'deploymentId':deploymentId};
		
		if(processInstanceId != undefined && processInstanceId != null)
		{
			actionParams["processInstanceId"] = processInstanceId;
		}
		
		//Check if the div already exists in HTML documnent, and remove it if exists
		if($("#bpmProcessImageDiv").length > 0)
		{
			$("#bpmProcessImageDiv").dialog("destroy");
			$("#bpmProcessImageDiv").remove();
		}
		
		var bpmProcessImageDiv = $('<div>',{id:"bpmProcessImageDiv"});
		$('body').append(bpmProcessImageDiv);
		
		$("#bpmProcessImageDiv").dialog( {
			autoOpen : false,
			modal : true, /*FIX #549808*/
			title : bpm_preview_image_trns,
			position : 'center',
			width  : returnMaxWidth(1200),
			height : returnMaxHeight(650),
			close : function(ev, ui) {
					$("#bpmProcessImageDiv").dialog("destroy");
					$("#bpmProcessImageDiv").remove();
				}
		});
		
		$.ajax({
			 url: actionURL,
	         type:"post",
			 dataType:"html",
			 data: actionParams,
			 success: function(data)
			 {
			 	 if(data != undefined && data != null && data != '')
				 {
			 		
			 	   //Check if result is json then display the error   
				   try
			       {
			       		var jsonResult = $.parseJSON(data);
			       		if(jsonResult != undefined && jsonResult != null 
			       				&& jsonResult._error != undefined && jsonResult._error != null && jsonResult._error != '')
			       		{
			       			$("#bpmProcessImageDiv").dialog("close");
			       			_showErrorMsg(jsonResult._error);
			       			_showProgressBar(false);
			       			return;
			       		}
			       }
			       catch(err)
			       {
			           //not a json object , continue display of the svg image
			       }     
			        
			       $("#bpmProcessImageDiv").html(data);		
				   $("#bpmProcessImageDiv").dialog("open");
					
			 	 }
			 	 _showProgressBar(false);
			 }
	    });
	}
}

function bpmMaint_openHumanTask(taskId)
{
	_showProgressBar(true);
	$.ajax({
				url: jQuery.contextPath+ "/path/bpm/BpmMaint_returnHumanTaskMapping.action",
		  		type:"post",
		  		dataType : "html",
		  		data: {'bpmTaskId':taskId},
		  		success: function(html)
		  		{
		  			//check the response type if it's json or html
		  			var isHTML = true;
		  			var data = null;
					try 
					{
						data = JSON.parse(html);
						isHTML = false;
					} 
					catch (e) 
					{
						isHTML = true;
					}
					
					//Check if the div already exists in HTML documnent, and remove it if exists
					if($("#bpmHumanTaskDiv").length > 0)
					{
						$("#bpmHumanTaskDiv").dialog("destroy");
						$("#bpmHumanTaskDiv").remove();
					}
					
					var bpmHumanTaskDiv = $('<div>',{id:"bpmHumanTaskDiv"});
					$('body').append(bpmHumanTaskDiv);
					
					bpmHumanTaskDiv.dialog( {
						modal : true,
						title : bpm_human_task_form_trns,
						autoOpen : false,
						position : 'center',
						width : returnMaxWidth('1200'),
						height : returnMaxHeight('750'),
						beforeClose  : function() {
						/*to check if there is a changes in the iframe before closing the dialog*/
							var iframeId = $(this).find("iframe").attr("id");
							var hasChanges = $.data(document.getElementById(iframeId),"iframeEltChanged");
							if(hasChanges)
							{
								_showConfirmMsg(changes_made_confirm_msg, confirm_msg_title, function(yesNo)
								{
									if (yesNo)
									{
										$("#bpmHumanTaskDiv").dialog("destroy");
										$("#bpmHumanTaskDiv").remove();
										$("#bpmUserTasksGrid_Id_user").trigger("reloadGrid");
										$("#bpmUserTasksGrid_Id_procInst").trigger("reloadGrid");
									}
									else
									{
										return;
									}
								});
							}
							else
							{
								$("#bpmHumanTaskDiv").dialog("destroy");
								$("#bpmHumanTaskDiv").remove();
								$("#bpmUserTasksGrid_Id_user").trigger("reloadGrid");
								$("#bpmUserTasksGrid_Id_procInst").trigger("reloadGrid");
							}
							return false;
						},
						open : function() {
						}
					});
					
					
		  			if(isHTML)
		  			{
		  				$(bpmHumanTaskDiv).html(html);
		  				$(bpmHumanTaskDiv).dialog("open");
						_showProgressBar(false);	
		  			}
		  			else
		  			{	
			  			if(typeof data["_error"] == "undefined" || data["_error"] == null)
					 	{
					 	    //in case of normal screen
			  				if("1" == data["bpmCO"]["bpmTaskMappingCO"]["taskMapVO"]["ACTION_TYPE"])
			  				{
			  					var openExternalScreenUrl = jQuery.contextPath+'/path-default/loadIframeScreenAction';
								var externalScreenParam = {};
								externalScreenParam["destinationProgRef"] = data["bpmCO"]["bpmTaskMappingCO"]["screenDefVO"]["PROG_REF"];
								externalScreenParam["appName"] = data["bpmCO"]["bpmTaskMappingCO"]["screenDefVO"]["APP_NAME"];
								externalScreenParam["destinationUrl"] = data["bpmCO"]["bpmTaskMappingCO"]["screenDefVO"]["URL"];
								externalScreenParam["additionalParams"] = data["bpmCO"]["bpmTaskArgMap"] == undefined ? {} : data["bpmCO"]["bpmTaskArgMap"]; 
								externalScreenParam["additionalParams"]["bpmTaskId"] =  data["bpmCO"]["taskId"];
								externalScreenParam["additionalParams"] = JSON.stringify(externalScreenParam["additionalParams"]);
								
								$(bpmHumanTaskDiv).load(openExternalScreenUrl,externalScreenParam,
										function() 
										{
											$(bpmHumanTaskDiv).dialog("open");
											_showProgressBar(false);
										});
			  				}
			  				else
			  				{
			  					//in case of dynamic screen
			  					var screenCode = parseInt(data["bpmCO"]["bpmTaskMappingCO"]["taskMapVO"]["SCREEN_CODE"]);
			  					var dynamicScreenParamsMapCOList = data["bpmCO"]["dynamicScreenParamsMapCOList"];
			  					dynamicScreen_openDynamicScreen(screenCode,dynamicScreenParamsMapCOList,null,null,null);
			  				}
						}
			  			else
			  			{
			  				_showProgressBar(false);	
			  				_showErrorMsg(data["_error"]);
			  			}
		  			}
				}
  	});
}

function bpmProcessMapping_uploadBpmnFile() {
	if ($("#bpmProcessMapping_bpmnFile").length && !$("#bpmProcessMapping_bpmnFile").val()) {
		_showErrorMsg(Missing_File_Location_key);
		return false;
	}
	
	var splitName = $("#bpmProcessMapping_bpmnFile").val().split(".");
	
	if (splitName.length == 1 || (splitName[0] == "" && splitName.length == 2)) {
		_showErrorMsg(file_bpmn2_ext_key);
		return false;
	}
	
	if (splitName.pop().toLowerCase() != "bpmn2") {
		$("#bpmProcessMapping_bpmnFile").val("");
		_showErrorMsg(file_bpmn2_ext_key);
		return false;
	}
	
	_showProgressBar(true);
	var replaceMapping = $('#bpmUsrTaskMappingGrid_ReplaceMap_YN').is(':checked') ? 1 : 0;
	var options = {
		url : jQuery.contextPath
				+ "/path/bpm/BpmMaint_uploadBpmnFile?bpmTaskMappingCO.replaceMapping=" + replaceMapping,
		type : 'post',
		success : function(response, status, xhr) 
		{
			_showProgressBar(false);
			var jsonObj = $.parseJSON($(response).html());
			if (jsonObj["_error"] == undefined || jsonObj["_error"] == null	|| jsonObj["_error"] === "") 
			{
				_showErrorMsg(Process_Executed_Successfully_key,
						success_msg_title);
				
				$("#bpmUploadProcDefGrid_Id").trigger("reloadGrid");
				$("#bpmUploadedProcMaintDiv").html('');
			} 
			else 
			{
				_showErrorMsg(jsonObj["_error"]);
			}
		},
		error : function(response) 
		{
			_showProgressBar(false);
			_showErrorMsg("error " + response);
		}

	};
	
	$("#bpmProcessMappingForm_Id").ajaxSubmit(options);
}


function bpmDocsGrid_uploadDocument() {
	if ($("#bpmDocsGrid_bpmnFile").length && !$("#bpmDocsGrid_bpmnFile").val()) {
		_showErrorMsg(Missing_File_Location_key);
		return false;
	}
	
	//get the file name without the file location path by using the $('#bpmDocsGrid_bpmnFile')[0].files[0].name
	var splitName = $('#bpmDocsGrid_bpmnFile')[0].files[0].name.split(".");
	
	if (splitName.length == 1 || (splitName[0] == "" && splitName.length == 2)) {
		_showErrorMsg(bpm_doc_ext_key);
		return false;
	}
	
	_showProgressBar(true);
	var options = {
		url : jQuery.contextPath + "/path/bpm/BpmMaint_uploadDocument?bpmCO.fileName=" + splitName[0] + "&bpmCO.fileExtension=" + splitName[1] + "&bpmCO.processInstanceId=" + $('#bpmDocsGrid_processInstanceId').val(),
		type : 'post',
		success : function(response, status, xhr) 
		{
			_showProgressBar(false);
			var jsonObj = $.parseJSON($(response).html());
			if (jsonObj["_error"] == undefined || jsonObj["_error"] == null	|| jsonObj["_error"] === "") 
			{
				_showErrorMsg(Process_Executed_Successfully_key,
						success_msg_title);
				
				$("#bpmDocsGrid_Id").trigger("reloadGrid");
			} 
			else 
			{
				_showErrorMsg(jsonObj["_error"]);
			}
		},
		error : function(response) 
		{
			_showProgressBar(false);
			_showErrorMsg("error " + response);
		}

	};
	
	$("#bpmDocsForm_Id").ajaxSubmit(options);
}


function bpmDocs_deleteNewDocGrid()
{
	var $table = $("#bpmDocsGrid_Id");
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var selectedRowObject = $table.jqGrid('getRowData', selectedRowId);
	
	var docId = selectedRowObject["docVO.DOC_ID"];
	
  	if(docId == undefined || docId == null || docId == "")
	{
		_showErrorMsg(msg_noRecordSelectedLabel,Warning_key);
		return;
	}
	
	var delAction = jQuery.contextPath + "/path/bpm/BpmMaint_deleteDocument.action";
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
								 $("#bpmDocsGrid_Id").trigger("reloadGrid");
						     } 
							 
							 _showProgressBar(false);
				 
							 }
					    });
						
						
					}
				}, 
				{
					url : delAction,
					data: {"bpmCO.documentId" : docId , "bpmCO.processInstanceId" : $('#bpmDocsGrid_processInstanceId').val() }
				});
}


function bpmUploadProcDefGrid_onDbClicked()
{
	_showProgressBar(true);
	var $table = $("#bpmUploadProcDefGrid_Id");
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var selectedRowObject = $table.jqGrid('getRowData', selectedRowId);
	var processId = selectedRowObject["PROCESS_ID"];
	var taskMapReloadPath = jQuery.contextPath+"/path/bpm/BpmMaint_loadBpmUserTaskMappingList.action?bpmCO.processId="+processId;
	$('#bpmUserTaskMappingDiv').load(taskMapReloadPath,{},function(){_showProgressBar(false);});
	
	var accessRightReloadPath = jQuery.contextPath+"/path/bpm/BpmMaint_loadProcessAccessRightList.action?bpmCO.processId="+processId;
	$('#bpmProcessAccessRightDiv').load(accessRightReloadPath,{},function(){_showProgressBar(false);});
	
	var processVariablesReloadPath = jQuery.contextPath+"/path/bpm/BpmMaint_loadProcessVariablesList.action?bpmCO.processId="+processId;
	$('#bpmProcessVariablesDiv').load(processVariablesReloadPath,{},function(){_showProgressBar(false);});
	
}

function bpmUsrTaskMappingGrid_openCommonMapping(taskMapId, taskName, progRef, appName,actionType,screenCode, mapType)
{
	_showProgressBar(true);
	
	var bpmTaskArgMappingDiv = $("<div id='bpmTaskArgMappingDiv' class='path-common-sceen'></div>");
	bpmTaskArgMappingDiv.css("padding","0");
	var theBody = $('body');
	bpmTaskArgMappingDiv.insertAfter(theBody);
	
	var curParams = { "bpmCO.taskMapId" : taskMapId, 
					  "bpmCO.processId" : $('#bpmUsrTaskMappingGrid_processId').val(),
					  "bpmCO.taskName"  : taskName,
					  "bpmCO.progRef"   : progRef,
					  "bpmCO.appName"   : appName,
					  "bpmCO.actionTypes":actionType,
					  "bpmCO.bpmTaskMappingCO.taskMapVO.SCREEN_CODE":screenCode
					  };
	
	var dialogTitle = '';
	var srcURL = '';
	if(mapType == 'I')
	{	
		dialogTitle = (typeof input_mapping_key_trans === undefined) ? "Input Mapping": input_mapping_key_trans;
		srcURL = jQuery.contextPath+'/path/bpm/BpmMaint_loadUserTaskInputMapping.action';
	}
	else
	{
		dialogTitle = (typeof output_mapping_key_trans === undefined) ? "Output Mapping": output_mapping_key_trans;
		srcURL = jQuery.contextPath+'/path/bpm/BpmMaint_loadUserTaskOutputMapping.action';
	}
	
	
    
	var theHeight = 500;
	
	var theWidth = $.browser.msie?returnMaxWidth(900):returnMaxWidth(900);
	var closeBtnLbl = (typeof signature_close_btn === undefined )? "Close" :signature_close_btn;
	var buttons = [];
	
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	buttons.push({text:saveLabel,id:"custBtnActions_saveBtn",click:function()
																	{
																		bpmUsrTaskMapping_saveArgMapping(mapType);
																	}}); 
	
	
	buttons.push({text:closeBtnLbl,id:"custBtnActions_closeBtn",click:function()
																	{
																		$("#bpmTaskArgMappingDiv").dialog("destroy");
																		$("#bpmTaskArgMappingDiv").remove();
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
			 								  $("#bpmTaskArgMappingDiv").dialog("destroy");
											  $("#bpmTaskArgMappingDiv").remove();
										  },
						buttons :buttons
						};
	/**
	 * 
	 */
	$("#bpmTaskArgMappingDiv").load(srcURL, curParams, function() {_showProgressBar(false);});
	$("#bpmTaskArgMappingDiv").dialog(_dialogOptions);
	$("#bpmTaskArgMappingDiv").dialog("open");
	
}

function bpmUsrTaskMapping_saveArgMapping(mapType)
{
	if($("#bpmTaskArgMapForm").length == 1)
	{	
		var changes = $("#bpmTaskArgMapForm").hasChanges(true);
		if(changes == 'true' || changes == true)
		{
			_showProgressBar(true);
			parseNumbers();
			
			var saveAction = jQuery.contextPath+"/path/bpm/BpmMaint_saveArgMapping.action?bpmCO.mapType=" + mapType;
			
			var bpmArgForm  = $("#bpmTaskArgMapForm").serializeForm();
			
			$.ajax({
				 url: saveAction,
		         type:"post",
				 dataType:"json",
				 data: bpmArgForm,
				 success: function(data)
				 {
				 	 if(typeof data["_error"] == "undefined" || data["_error"] == null)
					 {
				 	 	$("#bpmTaskArgMappingDiv").dialog("close");
				 	 }
				 	 _showProgressBar(false);
				 }
		    });
		}
	}
	else
	{
		_showErrorMsg(No_Data_Found_key,Warning_key);
	}
}


function bpmUsrTaskMapping_reloadInArgMappingSource(rowId)
{
	if(rowId == undefined || rowId == null)
	{
		return;	
	}	
	_showProgressBar(true);
	var divElement = $('#bpmTaskInput_ArgumentSourceElementDiv_' + rowId);  
	var btnCustSrc = jQuery.contextPath+"/path/bpm/BpmMaint_reloadInMappingSource.action?rowId=" + rowId;
	var customButtonParams = {'bpmCO.bpmTaskMappingCO.screenArgVO.ARG_NAME' : $('#bpmTaskInput_ArgumentName_'+rowId).val(),
							  'bpmCO.bpmTaskMappingCO.taskMapArgInVO.MAP_TYPE' : $('#bpmTaskInput_ArgumentSource_'+rowId).val()};   
	divElement.load(btnCustSrc,customButtonParams, function() 
	{
		_showProgressBar(false);
	});
}

function bpmUsrTaskMapping_reloadOutArgMappingSource(rowId)
{
	if(rowId == undefined || rowId == null)
	{
		return;	
	}	
	_showProgressBar(true);
	var divElement = $('#bpmTaskOutput_ArgumentSourceElementDiv_' + rowId);  
	var btnCustSrc = jQuery.contextPath+"/path/bpm/BpmMaint_reloadOutMappingSource.action?rowId=" + rowId;
	var customButtonParams = {'bpmCO.bpmTaskMappingCO.screenArgVO.ARG_NAME' : $('#bpmTaskOutput_ArgumentName_'+rowId).val(),
							  'bpmCO.bpmTaskMappingCO.taskMapArgOutVO.MAP_TYPE' : $('#bpmTaskOutput_ArgumentSource_'+rowId).val()};   
	divElement.load(btnCustSrc,customButtonParams, function() 
	{
		_showProgressBar(false);
	});
}

function bpmUsrTaskMappingGrid_openInputMapping(taskMapId,taskName, progRef, appName,actionType,screenCode)
{
	bpmUsrTaskMappingGrid_openCommonMapping(taskMapId, taskName, progRef, appName,actionType,screenCode, 'I');
}

function bpmUsrTaskMappingGrid_openOutputMapping(taskMapId,taskName, progRef, appName)
{
	bpmUsrTaskMappingGrid_openCommonMapping(taskMapId, taskName, progRef, appName,null,null, 'O');
}

function bpmProcessMapping_saveScreenMapping()
{
	var changes = $("#bpmUsrTaskMappingForm_Id").hasChanges(true);
	if(changes == 'true' || changes == true)
	{
		_showProgressBar(true);
		parseNumbers();
		
		var saveAction = jQuery.contextPath+"/path/bpm/BpmMaint_saveScreenMapping.action";
		
		var bpmForm  = $("#bpmUsrTaskMappingForm_Id").serializeForm();
		
		var $table = $("#bpmUsrTaskMappingGrid_Id");
		var jsonOpUpdates = $table.jqGrid('getChangedTrimRowData',false);
		bpmForm += '&bpmCO.gridUpdate=' + encodeURIComponent(jsonOpUpdates);
		
		$.ajax({
			 url: saveAction,
	         type:"post",
			 dataType:"json",
			 data: bpmForm,
			 success: function(data){
			     
				 if(typeof data["_error"] == "undefined" || data["_error"] == null)
			     {	 
				  	$('#bpmUsrTaskMappingGrid_Id').trigger("reloadGrid");
	             } 
				 _showProgressBar(false);
				 
			 }
	    });
	}
	
}


function bpmUploadProcDefGrid_onAddClicked()
{
	_showProgressBar(true);
	var mySrc = jQuery.contextPath  + "/path/bpm/BpmMaint_loadUploadProcMaintPage.action";
	$("#bpmUploadedProcMaintDiv").load(mySrc ,{}, function() {
		_showProgressBar(false);
	});
}


function bpmUploadProcDefGrid_onDeleteClicked()
{
	var $table = $("#bpmUploadProcDefGrid_Id");
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var selectedRowObject = $table.jqGrid('getRowData', selectedRowId);
	
	var processId = selectedRowObject["PROCESS_ID"];
	
  	if(processId == undefined || processId == null || processId == "")
	{
		_showErrorMsg(msg_noRecordSelectedLabel,Warning_key);
		return;
	}
	
	var delAction = jQuery.contextPath + "/path/bpm/BpmMaint_deleteUploadedProcessDef.action";
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
								 $("#bpmUploadProcDefGrid_Id").trigger("reloadGrid");
								 $('#bpmUserTaskMappingDiv').html('');
				             } 
							 
							 _showProgressBar(false);
				 
							 }
					    });
						
						
					}
				}, 
				{
					url : delAction,
					data: {"bpmCO.processId": processId }
				});
}


function bpmUsrTaskMappingGrid_openTaskAssignment(taskMapId,bpmAssignment)
{
	if(bpmAssignment == '1')
	{
		_showErrorMsg(task_assignment_exist_trans,Warning_key);
	}
	else if(bpmAssignment == '0')
	{
		bpmUsrTaskMappingGrid_openTaskAssignmentDialog(taskMapId);
	}
}


function bpmUsrTaskMappingGrid_openTaskAssignmentDialog(taskMapId)
{
	_showProgressBar(true);
	
	var bpmTaskAssignemntDiv = $("<div id='bpmTaskAssignemntDiv' class='path-common-sceen'></div>");
	bpmTaskAssignemntDiv.css("padding","0");
	var theBody = $('body');
	bpmTaskAssignemntDiv.insertAfter(theBody);
	
	var curParams = { "bpmCO.taskMapId" : taskMapId };
	
	var dialogTitle = assignment_key_trans;
	var srcURL = jQuery.contextPath+'/path/bpm/BpmMaint_loadTaskAssignmentPage.action';
	
	var theHeight = 500;
	
	var theWidth = $.browser.msie?returnMaxWidth(900):returnMaxWidth(900);
	var closeBtnLbl = (typeof signature_close_btn === undefined )? "Close" :signature_close_btn;
	var buttons = [];
	
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	buttons.push({text:saveLabel,id:"custBtnActions_saveBtn",click:function()
																	{
																		bpmTaskAssign_saveAssignmentGrid();
																	}}); 
	
	
	buttons.push({text:closeBtnLbl,id:"custBtnActions_closeBtn",click:function()
																	{
																		$("#bpmTaskAssignemntDiv").dialog("destroy");
																		$("#bpmTaskAssignemntDiv").remove();
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
			 								  $("#bpmTaskAssignemntDiv").dialog("destroy");
											  $("#bpmTaskAssignemntDiv").remove();
										  },
						buttons :buttons
						};
	/**
	 * 
	 */
	$("#bpmTaskAssignemntDiv").load(srcURL, curParams, function() {_showProgressBar(false);});
	$("#bpmTaskAssignemntDiv").dialog(_dialogOptions);
	$("#bpmTaskAssignemntDiv").dialog("open");
	
}

function bpmUsertaskAssignGrid_AssignmentTypeChanged()
{
	var $table = $("#bpmUsertaskAssignGrid_Id");
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var selectedRowObject = $table.jqGrid('getRowData', selectedRowId);
	var assignmentType = selectedRowObject["assignmentTypeDesc"];
	$table.jqGrid('setCellValue', selectedRowId,"taskAssignVO.ENTITY_TYPE",assignmentType);
	
	$table.jqGrid('setCellValue', selectedRowId,"taskAssignVO.ENTITY_NAME_lookuptxt","");
	//in case of initiator make the livesearch readonly
	if(assignmentType == '3')
	{
		$table.jqGrid('setCellReadOnly', selectedRowId, 'taskAssignVO.ENTITY_NAME_lookuptxt', "true");
		$table.jqGrid('setCellValue', selectedRowId,"taskAssignVO.ENTITY_NAME_lookuptxt",$('#bpmUsertaskAssignGrid_initiatorDesc').val());
	}
	else
	{
		$table.jqGrid('setCellReadOnly', selectedRowId, 'taskAssignVO.ENTITY_NAME_lookuptxt', "false");
	}
}

function bpmTaskAssign_onRowSelTopic(rowObj)
{
	var $table = $("#bpmUsertaskAssignGrid_Id");
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var selectedRowObject = $table.jqGrid('getRowData', selectedRowId);
	var assignmentType = selectedRowObject["assignmentTypeDesc"];
	
	$table.jqGrid('setCellValue', selectedRowId,"taskAssignVO.ENTITY_TYPE",assignmentType);
	//in case of initiator assignment
	if(assignmentType == '3')
	{
		$table.jqGrid('setCellReadOnly', selectedRowId, 'taskAssignVO.ENTITY_NAME_lookuptxt', "true");
		$table.jqGrid('setCellValue', selectedRowId,"taskAssignVO.ENTITY_NAME_lookuptxt",$('#bpmUsertaskAssignGrid_initiatorDesc').val());
	}
	
}

function bpmTaskAssign_addAssignmentGrid()
{
	var thCustTbl =	$("#bpmUsertaskAssignGrid_Id");
	// add new row
	var rId = thCustTbl.jqGrid('addInlineRow', {});
}

function bpmTaskAssign_deleteAssignmentGrid(theRowId)
{
	_showConfirmMsg((typeof Confirm_Delete_Process_key != undefined)?Confirm_Delete_Process_key:"Delete Selected Row?",confirm_msg_title,function(yesNo)
	    {
			if(yesNo) 
			{
				var $table = $("#bpmUsertaskAssignGrid_Id");
				var selectedRowObject = $table.jqGrid('getRowData', theRowId);
				var taskMapId = selectedRowObject["taskAssignVO.TASK_MAP_ID"];
				
				if(taskMapId == '')
				{
					$("#bpmUsertaskAssignGrid_Id").jqGrid('deleteGridRow',theRowId);	
				}
				else
				{
					_showProgressBar(true);
					var deleteAction = jQuery.contextPath+"/path/bpm/BpmMaint_deleteTaskAssignment.action";
					var deleteParam = { "bpmTaskMappingCO.taskAssignVO.ENTITY_NAME" : selectedRowObject["taskAssignVO.ENTITY_NAME"],
										"bpmTaskMappingCO.taskAssignVO.ENTITY_TYPE" : selectedRowObject["taskAssignVO.ENTITY_TYPE"],
										"bpmTaskMappingCO.taskAssignVO.TASK_MAP_ID" : selectedRowObject["taskAssignVO.TASK_MAP_ID"]};
					
					$.ajax({
						 url: deleteAction,
				         type:"post",
						 dataType:"json",
						 data: deleteParam,
						 success: function(data){
						     
							 if(typeof data["_error"] == "undefined" || data["_error"] == null)
						     {	 
								   if($("#bpmUsertaskAssignGrid_Id").html()!=null && $("#bpmUsertaskAssignGrid_Id").html()!="")
						           {
						            	 $("#bpmUsertaskAssignGrid_Id").trigger("reloadGrid");
						           }
				             } 
							 
							 _showProgressBar(false);
							 
						 }
				    });
					
				}
				
			}
		},"yesNo");
}


function bpmTaskAssign_saveAssignmentGrid()
{
	var $table = $("#bpmUsertaskAssignGrid_Id");
	var changes = $("#bpmUsrTaskAssignForm_Id").hasChanges(true);
	var checkRequiredCells = $table.jqGrid('checkRequiredCells');
	
	if( checkRequiredCells && (changes == 'true' || changes == true) )
	{
		_showProgressBar(true);
		parseNumbers();
		
		var saveAction = jQuery.contextPath+"/path/bpm/BpmMaint_saveTaskAssignement.action";
		var bpmForm  = $("#bpmUsrTaskAssignForm_Id").serializeForm();
		var jsonOpUpdates = '{"root":' + JSON.stringify($table.jqGrid('getRowData')) + '}';
		bpmForm += '&bpmCO.gridUpdate=' + encodeURIComponent(jsonOpUpdates);
		
		$.ajax({
			 url: saveAction,
	         type:"post",
			 dataType:"json",
			 data: bpmForm,
			 success: function(data){
			     
				 if(typeof data["_error"] == "undefined" || data["_error"] == null)
			     {	 
				  	$('#bpmUsertaskAssignGrid_Id').trigger("reloadGrid");
	             } 
				 _showProgressBar(false);
				 
			 }
	    });
	}
}

function bpmUsrTaskMappingGrid_CompletionTypeChanged()
{
	var $table = $("#bpmUsrTaskMappingGrid_Id");
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var selectedRowObject = $table.jqGrid('getRowData', selectedRowId);
	var completionType = selectedRowObject["completionTypeDesc"];
	$table.jqGrid('setCellValue', selectedRowId,"taskMapVO.COMPLETION_TYPE",completionType);
}

function bpmUsrTaskMappingGrid_TaskPriorityChanged()
{
	var $table = $("#bpmUsrTaskMappingGrid_Id");
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var selectedRowObject = $table.jqGrid('getRowData', selectedRowId);
	var taskPriorityDesc = selectedRowObject["taskPriorityDesc"];
	$table.jqGrid('setCellValue', selectedRowId,"taskMapVO.PRIORITY",taskPriorityDesc);
}

function bpmUsrTaskMappingGrid_actionTypeChanged()
{
	var $table = $("#bpmUsrTaskMappingGrid_Id");
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	$table.jqGrid('setCellValue', selectedRowId,"taskMapVO.SCREEN_CODE",'');
	$table.jqGrid('setCellValue', selectedRowId,"screenDefVO.SCREEN_DESC",'');
	$table.jqGrid('setCellValue', selectedRowId,"taskMapVO.PROG_REF",'');
	var selectedRowObject = $table.jqGrid('getRowData', selectedRowId);
	var actionType = selectedRowObject["actionTypeDesc"];
	$table.jqGrid('setCellValue', selectedRowId,"taskMapVO.ACTION_TYPE",actionType);
	bpmUsrTaskMappingGrid_adjustActionTypeResultList();
}

function bpmUsrTaskMappingGrid_adjustActionTypeResultList()
{
	 var $table = $("#bpmUsrTaskMappingGrid_Id");
	 var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	 var selectedRowObject = $table.jqGrid('getRowData', selectedRowId);
	 var actionType = selectedRowObject["actionTypeDesc"];
	//in case of normal screen, we need to adjust the resultList to use SCREEN_CODE
	if( actionType == '1' )
	{
		jQuery.globalEval("options_liveSearch_taskMapVO_SCREEN_CODE_bpmUsrTaskMappingGrid_Id.resultList = 'PROG_REF:taskMapVO.PROG_REF,SCREEN_CODE:taskMapVO.SCREEN_CODE_lookuptxt,SCREEN_DESC:screenDefVO.SCREEN_DESC,APP_NAME:screenDefVO.APP_NAME'");
	}
	else
	{
		//in case of dynamic screen, we need to adjust the resultList to use DYN_SCREEN_ID
		jQuery.globalEval("options_liveSearch_taskMapVO_SCREEN_CODE_bpmUsrTaskMappingGrid_Id.resultList = 'sysDynScreenDefVO.DYN_SCREEN_ID:taskMapVO.SCREEN_CODE_lookuptxt,sysDynScreenDefVO.DYN_SCREEN_DESC:screenDefVO.SCREEN_DESC'");
	}
}

function bpmProcessAccessRight_AssignmentTypeChanged()
{
	var $table = $("#bpmProcessAccessRightGrid_Id");
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var selectedRowObject = $table.jqGrid('getRowData', selectedRowId);
	var assignmentType = selectedRowObject["assignmentTypeDesc"];
	$table.jqGrid('setCellValue', selectedRowId,"accessRightVO.ENTITY_TYPE",assignmentType);
	
	$table.jqGrid('setCellValue', selectedRowId,"accessRightVO.ENTITY_NAME_lookuptxt","");
}

function bpmProcessAccessRight_addAccessGrid()
{
	var thCustTbl =	$("#bpmProcessAccessRightGrid_Id");
	// add new row
	var rId = thCustTbl.jqGrid('addInlineRow', {});
}

function bpmProcessAccessRight_deleteAccessGrid(theRowId)
{
	_showConfirmMsg((typeof Confirm_Delete_Process_key != undefined)?Confirm_Delete_Process_key:"Delete Selected Row?",confirm_msg_title,function(yesNo)
	    {
			if(yesNo) 
			{
				var $table = $("#bpmProcessAccessRightGrid_Id");
				var selectedRowObject = $table.jqGrid('getRowData', theRowId);
				var processId = selectedRowObject["accessRightVO.PROCESS_ID"];
				
				if(processId == '')
				{
					$("#bpmProcessAccessRightGrid_Id").jqGrid('deleteGridRow',theRowId);	
				}
				else
				{
					_showProgressBar(true);
					var deleteAction = jQuery.contextPath+"/path/bpm/BpmMaint_deleteProcessAccessRight.action";
					var deleteParam = { "bpmTaskMappingCO.accessRightVO.ENTITY_NAME" : selectedRowObject["accessRightVO.ENTITY_NAME"],
										"bpmTaskMappingCO.accessRightVO.ENTITY_TYPE" : selectedRowObject["accessRightVO.ENTITY_TYPE"],
										"bpmTaskMappingCO.accessRightVO.PROCESS_ID" : selectedRowObject["accessRightVO.PROCESS_ID"]};
					
					$.ajax({
						 url: deleteAction,
				         type:"post",
						 dataType:"json",
						 data: deleteParam,
						 success: function(data){
						     
							 if(typeof data["_error"] == "undefined" || data["_error"] == null)
						     {	 
								   if($("#bpmProcessAccessRightGrid_Id").html()!=null && $("#bpmProcessAccessRightGrid_Id").html()!="")
						           {
						            	 $("#bpmProcessAccessRightGrid_Id").trigger("reloadGrid");
						           }
				             } 
							 
							 _showProgressBar(false);
							 
						 }
				    });
					
				}
				
			}
		},"yesNo");
}

function bpmProcessAccessRight_onRowSelTopic(rowObj)
{
	var $table = $("#bpmProcessAccessRightGrid_Id");
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var selectedRowObject = $table.jqGrid('getRowData', selectedRowId);
	var assignmentType = selectedRowObject["assignmentTypeDesc"];
	
	$table.jqGrid('setCellValue', selectedRowId,"accessRightVO.ENTITY_TYPE",assignmentType);
}

function bpmProcessAccessRight_saveAccessRight()
{
	var $table = $("#bpmProcessAccessRightGrid_Id");
	var changes = $("#bpmProcessAccessRightForm_Id").hasChanges(true);
	var checkRequiredCells = $table.jqGrid('checkRequiredCells');
	
	if( checkRequiredCells && (changes == 'true' || changes == true) )
	{
		_showProgressBar(true);
		parseNumbers();
		
		var saveAction = jQuery.contextPath+"/path/bpm/BpmMaint_saveProcessAccessRight.action";
		var bpmForm  = $("#bpmProcessAccessRightForm_Id").serializeForm();
		var jsonOpUpdates = '{"root":' + JSON.stringify($table.jqGrid('getRowData')) + '}';
		bpmForm += '&bpmCO.gridUpdate=' + encodeURIComponent(jsonOpUpdates);
		
		$.ajax({
			 url: saveAction,
	         type:"post",
			 dataType:"json",
			 data: bpmForm,
			 success: function(data){
			     
				 if(typeof data["_error"] == "undefined" || data["_error"] == null)
			     {	 
				  	$('#bpmProcessAccessRightGrid_Id').trigger("reloadGrid");
	             } 
				 _showProgressBar(false);
				 
			 }
	    });
	}
	
}

function bpmUploadProcDefGrid_saveProcessDef()
{
	var $table = $("#bpmUploadProcDefGrid_Id");
	var changes = $("#bpmUploadProcDefForm_Id").hasChanges(true);
	
	if( changes == 'true' || changes == true )
	{
		_showProgressBar(true);
		parseNumbers();
		
		var saveAction = jQuery.contextPath+"/path/bpm/BpmMaint_saveProcessDef.action";
		var jsonOpUpdates = $table.jqGrid('getChangedTrimRowData',false);
		var bpmForm = 'bpmCO.gridUpdate=' + encodeURIComponent(jsonOpUpdates);
		
		$.ajax({
			 url: saveAction,
	         type:"post",
			 dataType:"json",
			 data: bpmForm,
			 success: function(data){
			     
				 if(typeof data["_error"] == "undefined" || data["_error"] == null)
			     {	 
				  	$('#bpmUploadProcDefGrid_Id').trigger("reloadGrid");
	             } 
				 _showProgressBar(false);
				 
			 }
	    });
	}	
}

function bpmMaint_downloadProcessDoc(processDefId, processName ,deploymentId, exportType)
{
	if(processDefId != undefined && processDefId != null && processDefId != ''
			&& deploymentId != undefined && deploymentId != null && deploymentId != '')
	{
		_showProgressBar(true);
		var objData = {};
		objData["bpmCO.processDefId"] = processDefId;
		objData["bpmCO.deploymentId"] = deploymentId;
		objData["bpmCO.exportType"] = exportType;
		objData["bpmCO.processName"] = processName;
		
		$.fileDownload(jQuery.contextPath
				+ "/path/bpm/BpmMaint_downloadProcessDoc.action", {
			successCallback : function(url) {
				_showProgressBar(false);
			},
			failCallback : function(html, url) {
				_showErrorMsg(html);
				_showProgressBar(false);
			},
			data : objData
		});
	}
}



function bpmDocsGrid_downloadDocument(documentId , processInstanceId)
{
	if(documentId != undefined && documentId != null 
			&& processInstanceId != undefined && processInstanceId != null)
	{
		_showProgressBar(true);
		var objData = {};
		objData["bpmCO.documentId"] = documentId;
		objData["bpmCO.processInstanceId"] = processInstanceId;
		
		$.fileDownload(jQuery.contextPath
				+ "/path/bpm/BpmMaint_downloadDocument.action", {
			successCallback : function(url) {
				_showProgressBar(false);
			},
			failCallback : function(html, url) {
				_showErrorMsg(html);
				_showProgressBar(false);
			},
			data : objData
		});
	}
}




function bpmMaint_loadJbpmForm(formRestUrl)
{
	if(formRestUrl != undefined && formRestUrl != null && formRestUrl != '')
	{
		$('#jbpmScreenFormId').attr("action",formRestUrl);
		$('#jbpmScreenFormId').attr("target","jbpmScreenFrame")
		submitEncryptedData('jbpmScreenFormId');	
	}
}


function bpmMaint_instanceHisttabs(selectedTabId,event)
{
	if(selectedTabId == "ActiveInstances")
	{
		$("#bpmInstanceHistGrid_Id_active").trigger("reloadGrid");
	}
	if(selectedTabId == "CompletedInstances")
	{
		$("#bpmInstanceHistGrid_Id_completed").trigger("reloadGrid");
	}
	if(selectedTabId == "AbortedInstances")
	{
		$("#bpmInstanceHistGrid_Id_aborted").trigger("reloadGrid");
	}
}

function bpmMaint_abortInstance(processInstId , deploymentId)
{
	if(processInstId != null && processInstId != undefined && processInstId >= 0
		&& deploymentId != null && deploymentId != undefined && deploymentId != '')
	{
		_showProgressBar(true);
		
		var actionURL = jQuery.contextPath + "/path/bpm/BpmMaint_abortProcessInstance.action";
		
		$.ajax({
			 url: actionURL,
	         type:"post",
			 dataType:"json",
			 data: {'processInstanceId':processInstId,'deploymentId':deploymentId},
			 success: function(data)
			 {
			 	 if(typeof data["_error"] == "undefined" || data["_error"] == null)
				 {
			 	 	 $("#bpmInstanceHistGrid_Id_active").trigger("reloadGrid");
			 	 	 $("#bpmInstanceHistGrid_Id_aborted").trigger("reloadGrid");
			 	 	 if($("#bpmUserTasksGrid_Id_user").length>0)
			 	 	 {
			 	 		 $("#bpmUserTasksGrid_Id_user").trigger("reloadGrid");
			 	 	 }
			 	 	 
			 	 	 if($("#bpmUserTasksGrid_Id_procInst").length>0)
			 	 	 {
			 	 		$("#bpmUserTasksGrid_Id_procInst").trigger("reloadGrid");
			 	 	 }
			 	 	
			 	 	 
			 	 }
			 	 _showProgressBar(false);
			 }
	    });
	}
}

function bpmProcessVariables_saveVariables()
{
	
	var changes = $("#bpmProcessVariablesForm_Id").hasChanges(true);
	if( changes == 'true' || changes == true )
	{
		_showProgressBar(true);
		var $table = $("#bpmProcessVariablesGrid_Id");
		parseNumbers();
		var saveAction = jQuery.contextPath+"/path/bpm/BpmMaint_saveProcessVariables.action";
		var bpmForm  = $("#bpmProcessVariablesForm_Id").serializeForm();
		var jsonOpUpdates = '{"root":' + JSON.stringify($table.jqGrid('getRowData')) + '}';
		bpmForm += '&bpmCO.gridUpdate=' + encodeURIComponent(jsonOpUpdates);
		
		$.ajax({
			 url: saveAction,
	         type:"post",
			 dataType:"json",
			 data: bpmForm,
			 success: function(data){
			     
				 if(typeof data["_error"] == "undefined" || data["_error"] == null)
			     {	 
				  	$('#bpmProcessVariablesGrid_Id').trigger("reloadGrid");
	             } 
				 _showProgressBar(false);
				 
			 }
	    });
	}
	
}

function bpmMaint_openCommonCommentPage(dialogTitle,buttons,dialogParams)
{
	_showProgressBar(true);
		
	var bpmCommonCommentDiv = $("<div id='bpmCommonCommentDiv' class='path-common-sceen'></div>");
	bpmCommonCommentDiv.css("padding","0");
	var theBody = $('body');
	bpmCommonCommentDiv.insertAfter(theBody);
	
	var srcURL = jQuery.contextPath+'/path/bpm/BpmMaint_loadBpmCommonCommentPage.action';
	var theHeight = 200;
	var theWidth = $.browser.msie?returnMaxWidth(300):returnMaxWidth(300);
	dialogTitle = (typeof dialogTitle === undefined )? "Comments" :dialogTitle;
	var closeBtnLbl = (typeof signature_close_btn === undefined )? "Close" :signature_close_btn;
	
	var dialogButtons = [];
	if(buttons != undefined && buttons != null && buttons.length > 0)
	{
		dialogButtons = buttons;
	}
	dialogButtons.push({text:closeBtnLbl,id:"BpmCommonCommentPage_closeBtn",click:function()
																{
																	$("#bpmCommonCommentDiv").dialog("close");
																}});
	
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	var _dialogOptions = {
						modal:true, 
                        title:dialogTitle,
                   		autoOpen:false,
                       	//dialogClass: 'no-close',
                       	closeOnEscape: false,
                       	position:'center', 
                        width:theWidth,
                        height:returnMaxHeight(theHeight),
                        close: function (){
			 								  $("#bpmCommonCommentDiv").dialog("destroy");
											  $("#bpmCommonCommentDiv").remove();
										  },
						buttons :dialogButtons
						};
	/**
	 * 
	 */
	$("#bpmCommonCommentDiv").load(srcURL, dialogParams, function() {_showProgressBar(false);});
	$("#bpmCommonCommentDiv").dialog(_dialogOptions);
	$("#bpmCommonCommentDiv").dialog("open");
	
}



function bpmMaint_openSuspendTask(taskId)
{
	if(taskId != null && taskId != undefined)
	{
		var buttons = [];
		buttons.push({text:bpm_suspend_key_trns,id:"BpmCommonCommentPage_suspendBtn",click:function()
																	{
																		_showProgressBar(true);
																		
																		var result = $('#bpmCommonCommentForm_Id').validate().form();
																		if(result == false)
																		{
																			_showProgressBar(false);
																			return;
																		}
																		
																		var actionURL = jQuery.contextPath + "/path/bpm/BpmMaint_suspendTask.action";
																		var taskId = $('#bpmCommonCommentForm_bpmTaskId').val();
																		var comment = $('#bpmCommonCommentForm_comment').val();
																		$.ajax({
																			 url: actionURL,
																	         type:"post",
																			 dataType:"json",
																			 data: {'bpmCO.bpmTaskId':taskId,'bpmCO.comment':comment},
																			 success: function(data)
																			 {
																			 	 if(typeof data["_error"] == "undefined" || data["_error"] == null)
																				 {
																			 	 	$("#bpmUserTasksGrid_Id_user").trigger("reloadGrid");
																			 	 	$("#bpmUserTasksGrid_Id_procInst").trigger("reloadGrid");
																			 	 }
																			 	 $("#bpmCommonCommentDiv").dialog("close");
																			 	 _showProgressBar(false);
																			 }
																	    });
																	}}); 
		var dialogParams = { "bpmCO.bpmTaskId" : taskId , "bpmCO.commentRequired":"true" };
		bpmMaint_openCommonCommentPage(bpm_suspend_key_trns,buttons,dialogParams);
	}
}



function bpmMaint_openResumeTask(taskId)
{
	if(taskId != null && taskId != undefined)
	{
		var buttons = [];
		buttons.push({text:bpm_resume_key_trns,id:"BpmCommonCommentPage_resumeBtn",click:function()
																	{
																		_showProgressBar(true);
																		
																		var result = $('#bpmCommonCommentForm_Id').validate().form();
																		if(result == false)
																		{
																			_showProgressBar(false);
																			return;
																		}
																		
																		var actionURL = jQuery.contextPath + "/path/bpm/BpmMaint_resumeTask.action";
																		var taskId = $('#bpmCommonCommentForm_bpmTaskId').val();
																		var comment = $('#bpmCommonCommentForm_comment').val();
																		$.ajax({
																			 url: actionURL,
																	         type:"post",
																			 dataType:"json",
																			 data: {'bpmCO.bpmTaskId':taskId,'bpmCO.comment':comment},
																			 success: function(data)
																			 {
																			 	 if(typeof data["_error"] == "undefined" || data["_error"] == null)
																				 {
																			 	 	$("#bpmUserTasksGrid_Id_user").trigger("reloadGrid");
																			 	 	$("#bpmUserTasksGrid_Id_procInst").trigger("reloadGrid");
																			 	 }
																			 	 $("#bpmCommonCommentDiv").dialog("close");
																			 	 _showProgressBar(false);
																			 }
																	    });
																	}}); 
		var dialogParams = { "bpmCO.bpmTaskId" : taskId, "bpmCO.commentRequired":"true" };
		bpmMaint_openCommonCommentPage(bpm_resume_key_trns,buttons,dialogParams);
	}
}

function bpmLogs_addNewLogGrid()
{
	var entityType = $('#bpmLogsGrid_entityType').val();
	var actionType = $('#bpmLogsGrid_actionType').val();
	var thCustTbl =	$("#bpmLogsGrid_Id");
	//in case of adding comments on a task
	if(entityType == '2' && actionType == '4')
	{
		//count number of new lines. in case we have more than 1 row we need to show a stoper message
		var selRowId = thCustTbl.jqGrid('getDataIDs');
		var countNewRow = 0;
		var newRowId;
		$.each(selRowId , function(index, value) {
			if(value.indexOf("new_") != -1)
			{
				countNewRow++;
				newRowId = value;
			}
		});
		
		if(countNewRow == 1)
		{
			thCustTbl.jqGrid('setSelection', newRowId, false);// setting selection to newly added row
			thCustTbl.jqGrid('editRow', newRowId);// making newly added row editable
			bpmLogs_onRowSelTopic();
			_showErrorMsg(save_before_proceeding_key_trns,warning_msg_title);
		}
		else
		{
			// add new row
			var rId = thCustTbl.jqGrid('addInlineRow', {});
		}
	}
	else
	{
		// add new row
		var rId = thCustTbl.jqGrid('addInlineRow', {});
	}
}

function bpmLogs_onRowSelTopic(rowObj)
{
	var $table = $("#bpmLogsGrid_Id");
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var selectedRowObject = $table.jqGrid('getRowData', selectedRowId);
	var logId = selectedRowObject["logsVO.LOG_ID"];
	//in case of initiator assignment
	if(logId != undefined && logId != null && logId != '')
	{
		$table.jqGrid('setCellReadOnly', selectedRowId, 'logsVO.ACTION_COMMENT', $('#enableUpdateComment').val()=="false");
	}
	else
	{
		$table.jqGrid('setCellValue', selectedRowId,"logsVO.CREATED_BY",$('#bpmLogsGrid_userId').val());
		
		$table.jqGrid('setCellValue', selectedRowId,"logsVO.ENTITY_TYPE",$('#bpmLogsGrid_entityType').val());
		$table.jqGrid('setCellValue', selectedRowId,"logsVO.ENTITY_ID",$('#bpmLogsGrid_entityId').val());
		$table.jqGrid('setCellValue', selectedRowId,"logsVO.ACTION_TYPE",$('#bpmLogsGrid_actionType').val());
	}
}


function bpmLogs_deleteNewLogGrid(theRowId)
{

	_showConfirmMsg((typeof Confirm_Delete_Process_key != undefined)?Confirm_Delete_Process_key:"Delete Selected Row?",confirm_msg_title,function(yesNo)
		    {
				if(yesNo) 
				{
					var $table = $("#bpmLogsGrid_Id");
					var selectedRowObject = $table.jqGrid('getRowData', theRowId);
					var logId = selectedRowObject["logsVO.LOG_ID"];
					
					if(logId == '')
					{
						$("#bpmLogsGrid_Id").jqGrid('deleteGridRow',theRowId);	
					}
					else
					{
						_showProgressBar(true);
						var actionURL = jQuery.contextPath + "/path/bpm/BpmMaint_deleteBpmLog.action";
						$.ajax({
							 url: actionURL,
					         type:"post",
							 dataType:"json",
							 data: {'bpmCO.bpmTaskMappingCO.logsVO.LOG_ID':logId},
							 success: function(data)
							 {
							 	 if(typeof data["_error"] == "undefined" || data["_error"] == null)
								 {
							 	 	$("#bpmLogsGrid_Id").trigger("reloadGrid");
							 	 }
							 	 _showProgressBar(false);
							 }
					    });
						
					}
					
				}
			},"yesNo");

}

function bpmLogs_saveNewLogs()
{
	var $table = $("#bpmLogsGrid_Id");
	var jsonOpUpdates = $table.jqGrid('getChangedTrimRowData',false);
	var changes = $("#bpmLogsForm_Id").hasChanges(true);
	if( changes == 'true' || changes == true )
	{
		_showProgressBar(true);
		parseNumbers();
		
		var saveAction = jQuery.contextPath+"/path/bpm/BpmMaint_saveLogs.action";
		var bpmForm  = $("#bpmLogsForm_Id").serializeForm();
		bpmForm += '&bpmCO.gridUpdate=' + encodeURIComponent(jsonOpUpdates);
		
		$.ajax({
			 url: saveAction,
	         type:"post",
			 dataType:"json",
			 data: bpmForm,
			 success: function(data){
			     
				 if(typeof data["_error"] == "undefined" || data["_error"] == null)
			     {	 
				  	$('#bpmLogsGrid_Id').trigger("reloadGrid");
	             } 
				 _showProgressBar(false);
				 
			 }
	    });
	}
}


function bpmMaint_openComments(taskId) 
{	
	var $table = $("#bpmUserTasksGrid_Id_user");
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var selectedRowObject = $table.jqGrid('getRowData', selectedRowId);
	
	if(taskId != null && taskId != undefined)
	{
		
		_showProgressBar(true);
		
		var bpmLogsDiv = $("<div id='bpmLogsDiv' class='path-common-sceen'></div>");
		bpmLogsDiv.css("padding","0");
		var theBody = $('body');
		bpmLogsDiv.insertAfter(theBody);
		
		var curParams = { "bpmCO.bpmTaskId" : taskId,
						  "bpmCO.bpmTaskMappingCO.logsVO.ENTITY_TYPE" : "2",
						  "bpmCO.bpmTaskMappingCO.logsVO.ACTION_TYPE" : "4",
						  "bpmCO.enableAddComment" : selectedRowObject["addComment"],
						  "bpmCO.enableDeleteComment" : selectedRowObject["deleteComment"],
						  "bpmCO.enableUpdateComment" : selectedRowObject["updateComment"]
						  };
		var dialogTitle = bpm_comments_key_trns;
		var srcURL = jQuery.contextPath+'/path/bpm/BpmMaint_loadBpmLogsList.action';
		var closeBtnLbl = (typeof signature_close_btn === undefined )? "Close" :signature_close_btn;
		var buttons = [];
		
		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		var _dialogOptions = {
							modal:true, 
	                        title:dialogTitle,
	                   		autoOpen:false,
	                       	//dialogClass: 'no-close',
	                       	closeOnEscape: false,
	                       	position:'center', 
	                        width:returnMaxWidth(700),
	                        height:returnMaxHeight(300),
	                        close: function (){
				 								  $("#bpmLogsDiv").dialog("destroy");
												  $("#bpmLogsDiv").remove();
											  },
							buttons :buttons
							};
		
		$("#bpmLogsDiv").load(srcURL, curParams, function() {_showProgressBar(false);});
		$("#bpmLogsDiv").dialog(_dialogOptions);
		$("#bpmLogsDiv").dialog("open");
		
	}
}


function bpmMaint_openAdminLogsForTask(taskId)
{
	
	if(taskId != null && taskId != undefined)
	{
		
		_showProgressBar(true);
		
		var bpmTaskAdminLogsDiv = $("<div id='bpmTaskAdminLogsDiv' class='path-common-sceen'></div>");
		bpmTaskAdminLogsDiv.css("padding","0");
		var theBody = $('body');
		bpmTaskAdminLogsDiv.insertAfter(theBody);
		
		var curParams = { "bpmCO.bpmTaskId" : taskId,
						  "bpmCO.bpmTaskMappingCO.logsVO.ENTITY_TYPE" : "2",
						  "bpmCO.actionTypes" : "1,2,4",
						  "bpmCO.hideActionTypeInLogsGrid" : "false",
						  "bpmCO.enableAddComment" : "false",
						  "bpmCO.enableDeleteComment" : "false",
						  "bpmCO.enableUpdateComment" : "false"};
		
		var dialogTitle = bpm_admin_logs_key_trns;
		var srcURL = jQuery.contextPath+'/path/bpm/BpmMaint_loadBpmLogsList.action';
		var closeBtnLbl = (typeof signature_close_btn === undefined )? "Close" :signature_close_btn;
		var buttons = [];
		
		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		var _dialogOptions = {
							modal:true, 
	                        title:dialogTitle,
	                   		autoOpen:false,
	                       	//dialogClass: 'no-close',
	                       	closeOnEscape: false,
	                       	position:'center', 
	                        width:returnMaxWidth(700),
	                        height:returnMaxHeight(300),
	                        close: function (){
				 								  $("#bpmTaskAdminLogsDiv").dialog("destroy");
												  $("#bpmTaskAdminLogsDiv").remove();
											  },
							buttons :buttons
							};
		
		$("#bpmTaskAdminLogsDiv").load(srcURL, curParams, function() {_showProgressBar(false);});
		$("#bpmTaskAdminLogsDiv").dialog(_dialogOptions);
		$("#bpmTaskAdminLogsDiv").dialog("open");
		
	}
	
}


function bpmMaint_openDocuments(processInstanceId,processId)
{
	
	if(processInstanceId != null && processInstanceId != undefined)
	{
		
		_showProgressBar(true);
		
		var bpmDocumentsDiv = $("<div id='bpmDocumentsDiv' class='path-common-sceen'></div>");
		bpmDocumentsDiv.css("padding","0");
		var theBody = $('body');
		bpmDocumentsDiv.insertAfter(theBody);
		
		var curParams = { "bpmCO.processInstanceId" : processInstanceId, "bpmCO.processDefId" : processId };
		
		var dialogTitle = bpm_documents_key_trns;
		var srcURL = jQuery.contextPath+'/path/bpm/BpmMaint_loadBpmDocumentsList.action';
		var closeBtnLbl = (typeof signature_close_btn === undefined )? "Close" :signature_close_btn;
		var buttons = [];
		
		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		var _dialogOptions = {
							modal:true, 
	                        title:dialogTitle,
	                   		autoOpen:false,
	                       	//dialogClass: 'no-close',
	                       	closeOnEscape: false,
	                       	position:'center', 
	                        width:returnMaxWidth(700),
	                        height:returnMaxHeight(300),
	                        close: function (){
				 								  $("#bpmDocumentsDiv").dialog("destroy");
												  $("#bpmDocumentsDiv").remove();
											  },
							buttons :buttons
							};
		
		$("#bpmDocumentsDiv").load(srcURL, curParams, function() {_showProgressBar(false);});
		$("#bpmDocumentsDiv").dialog(_dialogOptions);
		$("#bpmDocumentsDiv").dialog("open");
		
	}
}


function bpmImportProcDef_importJsonFile(confirmationResponse) {
	if ($("#bpmImportProcDef_bpmnFile").length && !$("#bpmImportProcDef_bpmnFile").val()) {
		_showErrorMsg(Missing_File_Location_key);
		return false;
	}
	
	var splitName = $("#bpmImportProcDef_bpmnFile").val().split(".");
	
	if (splitName.length == 1 || (splitName[0] == "" && splitName.length == 2)) {
		_showErrorMsg(file_bpmn2_ext_key);
		return false;
	}
	
	if (splitName.pop().toLowerCase() != "txt") {
		$("#bpmImportProcDef_bpmnFile").val("");
		_showErrorMsg(file_bpmn2_ext_key);
		return false;
	}
	
	_showProgressBar(true);
	
	var options = {
		url : jQuery.contextPath
				+ "/path/bpm/BpmMaint_importJsonFile?confirmationResponse=" + confirmationResponse,
		type : 'post',
		success : function(response, status, xhr) 
		{
			_showProgressBar(false);
			var jsonObj = $.parseJSON($(response).html());
			if (jsonObj["_error"] == undefined || jsonObj["_error"] == null	|| jsonObj["_error"] === "") 
			{
				if (jsonObj["showConfirmation"] != undefined && jsonObj["showConfirmation"] != null && jsonObj["showConfirmation"] == true) 
				{
				
					_showConfirmMsg(Record_already_exist_key, confirm_msg_title, function(confirmcChoice, theArgs){
						if(confirmcChoice)
						{
							bpmImportProcDef_importJsonFile(true);
						}
					});
					
				} 
				else
				{
					_showErrorMsg(Process_Executed_Successfully_key,
						success_title_key);
				}
			} 
			else 
			{
				_showErrorMsg(jsonObj["_error"]);
			}
		},
		error : function(response) 
		{
			_showProgressBar(false);
			_showErrorMsg("error " + response);
		}

	};
	
	$("#bpmImportProcDefForm_Id").ajaxSubmit(options);
}

function bpmUploadProcDefGrid_setSelection(e)
{	
	if(e)
	{	
		var selection = e.currentTarget.id.substring( 0, e.currentTarget.id.indexOf('_') );	 	
		if(selection != null && selection != '' && !isNaN(selection))
		{	
			var $table = $("#bpmUploadProcDefGrid_Id");																
			//set row as selected
			$table.jqGrid('setSelection', selection, true);
			var myHtmlRow = $table.jqGrid( "getInd", selection, true );		
			var $myHtmlRowObj = $(myHtmlRow);
			//set row as changed
			$myHtmlRowObj.attr( "changed", "1" );
			//setting the attr changed to 1 is working on IE only , to make it working on chrome we need to trigger the change event
			$myHtmlRowObj.trigger( "change" );
			//set the form as  changed
			var _form = document.getElementById('bpmUploadProcDefForm_Id');
			$.data(_form,"changeTrack",true);
		}
	}
}


function bpmInstanceHistGrid_onDbClicked(paramType)
{
	_showProgressBar(true);
	var $table = $("#bpmInstanceHistGrid_Id_"+paramType);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var selectedRowObject = $table.jqGrid('getRowData', selectedRowId);
	var processInstanceId = selectedRowObject.processInstanceId;
	bpmInstanceHistGrid_openProcessInstanceTasks(processInstanceId);
}

function bpmInstanceHistGrid_openProcessInstanceTasks(processInstanceId)
{

	if(processInstanceId != null && processInstanceId != undefined)
	{
		
		_showProgressBar(true);
		
		var bpmProcessInstanceTasksDiv = $("<div id='bpmProcessInstanceTasksDiv' class='path-common-sceen'></div>");
		bpmProcessInstanceTasksDiv.css("padding","0");
		var theBody = $('body');
		bpmProcessInstanceTasksDiv.insertAfter(theBody);
		
		var curParams = { "bpmCO.processInstanceId" : processInstanceId };
		
		var dialogTitle = process_instance_tasks_key_trans;
		var srcURL = jQuery.contextPath+'/path/bpm/BpmMaint_loadProcessInstanceTasksList.action';
		var closeBtnLbl = (typeof signature_close_btn === undefined )? "Close" :signature_close_btn;
		var buttons = [];
		
		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		var _dialogOptions = {
							modal:true, 
	                        title:dialogTitle,
	                   		autoOpen:false,
	                       	//dialogClass: 'no-close',
	                       	closeOnEscape: false,
	                       	position:'center', 
	                        width:returnMaxWidth(700),
	                        height:returnMaxHeight(300),
	                        close: function (){
				 								  $("#bpmProcessInstanceTasksDiv").dialog("destroy");
												  $("#bpmProcessInstanceTasksDiv").remove();
											  },
							buttons :buttons
							};
		
		$("#bpmProcessInstanceTasksDiv").load(srcURL, curParams, function() {_showProgressBar(false);});
		$("#bpmProcessInstanceTasksDiv").dialog(_dialogOptions);
		$("#bpmProcessInstanceTasksDiv").dialog("open");
		
	}
}


function bpmProcessVariablesGrid_defaultTypeChanged(onChange)
{
	var $table = $("#bpmProcessVariablesGrid_Id");
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var selectedRowObject = $table.jqGrid('getRowData', selectedRowId);
	var defaultType = selectedRowObject["processVariablesVO.DEFAULT_TYPE"];
	
	//constant map type
	if(defaultType == '3')
	{
		$table.jqGrid('setCellReadOnly', selectedRowId, "variableValue","false");
		$table.jqGrid('setCellReadOnly', selectedRowId, "processVariablesVO.DEFAULT_VALUE","true");
	}//session map type
	else if(defaultType == '2')
	{
		$table.jqGrid('setCellReadOnly', selectedRowId, "processVariablesVO.DEFAULT_VALUE","false");
		$table.jqGrid('setCellReadOnly', selectedRowId, "variableValue","true");
	}
	
	if(onChange)
	{
		$table.jqGrid('setCellValue', selectedRowId,"variableValue",'');
		$table.jqGrid('setCellValue', selectedRowId,"processVariablesVO.DEFAULT_VALUE",'');
		$table.jqGrid('setCellValue', selectedRowId,"fieldDesc",'');
	}	
}

function bpmProcessVariablesGrid_onRowSelTopic(rowObj)
{
	bpmProcessVariablesGrid_defaultTypeChanged(false);
}