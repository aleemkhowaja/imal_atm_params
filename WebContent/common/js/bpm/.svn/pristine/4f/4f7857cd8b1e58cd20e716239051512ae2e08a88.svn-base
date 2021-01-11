function bpmUserTasksGrid_Id_BtnFormatter(cellValue, options, rowObject)
{
	var taskId = rowObject["taskId"];
	var processInstanceId = rowObject["processInstanceId"];
	var processId = rowObject["processId"];
	var typeId = "user";
	if(options.gid == "bpmUserTasksGrid_Id_procInst")
	{
		typeId = "procInst";
	}
	
	var buttons = '<div id="header_advanced_' + typeId + '_div_' + taskId + '" class="ui-corner-all" style="position: inherit;display:none;background-color:white;border:1px solid #000000;"><table style="border-width:0" >';
	
	if(rowObject["showReleaseBtn"])
	{
		buttons += '<tr style="border-width:0" ><td style="border-width:0" class="ui-widget-content"><b><a href = "#" onclick = "bpmMaint_releaseTask('+taskId+')">' + bpm_release_key_trns + '</a></b></td></tr>';
	}
	if(rowObject["showClaimBtn"])
	{
		buttons += '<tr style="border-width:0" ><td style="border-width:0" class="ui-widget-content"><b><a href = "#" onclick = "bpmMaint_claimTask('+taskId+')">' + bpm_claim_key_trns + '</a></b></td></tr>';
	}
	if(rowObject["showCompleteBtn"])
	{
		buttons += '<tr style="border-width:0" ><td style="border-width:0" class="ui-widget-content"><b><a href = "#" onclick = "bpmMaint_completeTask('+taskId+ ',' + processInstanceId + ')">' + bpm_complete_key_trns + '</a></b></td></tr>';
	}
	if(rowObject["showOpenBtn"])
	{
		buttons += '<tr style="border-width:0" ><td style="border-width:0" class="ui-widget-content"><b><a href = "#" onclick = "bpmMaint_openHumanTask('+taskId+')">' + bpm_open_key_trns + '</a></b></td></tr>';
	}
	if(rowObject["showForwardBtn"])
	{
		buttons += '<tr style="border-width:0" ><td style="border-width:0" class="ui-widget-content"><b><a href = "#" onclick = "bpmMaint_openForwardTask('+taskId+')">' + bpm_forward_key_trns + '</a></b></td></tr>';
	}
	if(rowObject["showSuspendBtn"])
	{
		buttons += '<tr style="border-width:0" ><td style="border-width:0" class="ui-widget-content"><b><a href = "#" onclick = "bpmMaint_openSuspendTask('+taskId+')">' + bpm_suspend_key_trns + '</a></b></td></tr>';
	}
	if(rowObject["showResumeBtn"])
	{
		buttons += '<tr style="border-width:0" ><td style="border-width:0" class="ui-widget-content"><b><a href = "#" onclick = "bpmMaint_openResumeTask('+taskId+')">' + bpm_resume_key_trns + '</a></b></td></tr>';
	}
	if(rowObject["showAdminLogsBtn"])
	{
		buttons += '<tr style="border-width:0" ><td style="border-width:0" class="ui-widget-content"><b><a href = "#" onclick = "bpmMaint_openAdminLogsForTask('+taskId+')">' + bpm_admin_logs_key_trns + '</a></b></td></tr>';
	}
	if(rowObject["showDocumentsBtn"])
	{
		buttons += '<tr style="border-width:0" ><td style="border-width:0" class="ui-widget-content"><b><a href = "#" onclick = "bpmMaint_openDocuments('+processInstanceId+',\''+ processId +'\')">' + bpm_documents_key_trns + '</a></b></td></tr>';
	}
	
	buttons += '<tr style="border-width:0" ><td style="border-width:0" class="ui-widget-content"><b><a href = "#" onclick = "bpmMaint_openComments('+taskId+')">' + bpm_comments_key_trns + '</a></b></td></tr>';
	buttons += '</table></div>';
	

	buttons += '<table title="" id="advanced_' + typeId + '_tbl_' + taskId + '"  width="100%" cellpadding="0" cellspacing="0" style="border-width:0 !important; cursor:hand;">' +
				    	  '<tr width="100%" cellspacing="0" cellpadding="0" style="border-width:0 !important"  onclick="toggleOptionsDiv(\'header_advanced_' + typeId + '_div_' + taskId + '\',\'advanced_' + typeId + '_tbl_' + taskId + '\')">' +
							   '<td width="10%" style="border-width:0 !important">' +
									'<img src="'+ jQuery.contextPath +'/common/js/horizontalmenu/img/next1.png" border="0"> ' + 
							   '</td>' +
							   '<td width="90%" style="border-width:0 !important">' + bpm_actions_key_trns + '</td>' +
						  '</tr>' +
				'</table>';

	
	return buttons;
}

function bpmProcessInstGrid_Id_BtnFormatter(cellValue, options, rowObject)
{
	var buttons = '<table style="border-width:0" width="100%"><tr style="border-width:0"  width="100%">';
	var processId = rowObject["processId"];
	var deploymentId = rowObject["deploymentId"];
	var processName = rowObject["processName"];
	
	if(rowObject["showStartBtn"])
	{
		buttons += '<td style="border-width:0"  width="33%"><b><a href = "#" onclick = "bpmMaint_openStartProcessWithVar(\'' + processId + '\',\'' + deploymentId + '\',\'' + processName + '\')">' + bpm_start_key_trns + '</a></b></td>';
	}
	if(rowObject["showProcessImageBtn"])
	{
		buttons += '<td style="border-width:0"  width="33%"><b><a href = "#" onclick = "bpmMaint_openProcessImage(\'' + processId + '\',\'' + deploymentId + '\')">' + bpm_preview_image_trns + '</a></b></td>';
	}
	
	buttons += '</tr></table>';
	return buttons;
}

function bpmUserTasksGrid_Id_InstanceImageBtnFormatter(cellValue, options, rowObject)
{
	var processId = rowObject["processId"];
	var deploymentId = rowObject["deploymentId"];
	var processInstanceId = rowObject["processInstanceId"];
	if(rowObject["showInstanceImageBtn"])
	{
		return '<a href = "#" onclick = "bpmMaint_openProcessImage(\'' + processId + '\',\'' + deploymentId + '\',' + processInstanceId + ')">' + processInstanceId + '</a>';
	}
	else
	{
		return '';	
	}
}

function bpmUsrTaskMappingGrid_Id_BtnFormatter(cellValue, options, rowObject)
{
	var screenCode = rowObject["taskMapVO"]["SCREEN_CODE"];
	var taskMapId = rowObject["taskMapVO"]["TASK_MAP_ID"];
	var bpmAssignment = rowObject["taskMapVO"]["BPM_ASSIGNMENT_YN"];
	var buttons = '<table style="border-width:0" width="100%"><tr style="border-width:0"  width="100%">';
	
	if(screenCode != undefined && screenCode != null && screenCode != '')
	{	
		var taskName = rowObject["taskMapVO"]["TASK_NAME"];
		var progRef = rowObject["screenDefVO"]["PROG_REF"];
		var appName = rowObject["screenDefVO"]["APP_NAME"];
		var actionType = rowObject["taskMapVO"]["ACTION_TYPE"];
		var screenCode = rowObject["taskMapVO"]["SCREEN_CODE"];
		buttons += '<td style="border-width:0"  width="33%"> <a href = "#" onclick = "bpmUsrTaskMappingGrid_openInputMapping(' + taskMapId + ',\'' + taskName + '\',\'' + progRef  + '\',\'' + appName + '\',\'' + actionType + '\',\'' + screenCode +'\' )">' +  input_mapping_key_trans + '</a> </td>';
		buttons += '<td style="border-width:0"  width="33%"> <a href = "#" onclick = "bpmUsrTaskMappingGrid_openOutputMapping(' + taskMapId + ',\'' + taskName + '\',\'' + progRef  + '\',\'' + appName + '\')">' + output_mapping_key_trans + '</a> </td>';
	}
	
	buttons += '<td style="border-width:0"  width="33%"> <a href = "#" onclick = "bpmUsrTaskMappingGrid_openTaskAssignment(' + taskMapId + ',\'' + bpmAssignment + '\')">' + assignment_key_trans + '</a> </td>';	
	buttons += '</tr></table>';
	return buttons;
}


function bpmUsrTaskMappingGrid_Id_BtnUnFormatter()
{
	return '';
}

function bpmUserTasksGrid_Id_CompleteTopics(type)
{
	var $table = $("#bpmUserTasksGrid_Id_" + type);
	var rows = $table.jqGrid('getDataIDs');
	var rowsLen = rows.length;

	for (i = 0; i < rowsLen; i++) 
	{
		var myObject = $table.jqGrid('getRowData', rows[i]);
		var highlightColor = myObject["highlightColor"];
		if (highlightColor != undefined && highlightColor != null && highlightColor != '') 
		{
			$table.jqGrid("setRowData", rows[i], "", {background:highlightColor});
		}
	}
}

function bpmProcessInstGrid_Id_DocBtnFormatter(cellValue, options, rowObject)
{
	var buttons = '<table style="border-width:0" width="100%"><tr style="border-width:0"  width="100%">';
	var processId = rowObject["processId"];
	var processName = rowObject["processName"];
	var deploymentId = rowObject["deploymentId"];
	
	if(rowObject["showExportDocBtn"])
	{
		buttons += '<td style="border-width:0"  width="33%"><b><a href = "#" onclick = "bpmMaint_downloadProcessDoc(\'' + processId + '\',\'' + processName + '\',\'' + deploymentId + '\',\'XLS\')">' + bpm_export_excel_trns + '</a></b></td>';
		buttons += '<td style="border-width:0"  width="33%"><b><a href = "#" onclick = "bpmMaint_downloadProcessDoc(\'' + processId + '\',\'' + processName + '\',\'' + deploymentId + '\',\'DOC\')">' + bpm_export_doc_trns + '</a></b></td>';
	}
	
	buttons += '</tr></table>';
	return buttons;
}

function bpmProcessInstGrid_Id_DocBtnUnFormatter(cellValue, options, rowObject)
{
	return '';
}

function bpmInstanceHistGrid_Id_BtnFormatter(cellValue, options, rowObject)
{
	
	var buttons = '<table style="border-width:0" width="100%"><tr style="border-width:0"  width="100%">';
	if(rowObject != undefined)
	{	
		var processInstId = rowObject["processInstanceId"];
		var status = rowObject["status"];
		var deploymentId = rowObject["externalId"];
		var showAbortBtn = rowObject["showAbortBtn"];
	
		if(showAbortBtn == true && status == '1' )
		{
			buttons += '<td style="border-width:0"  width="33%"><b><a href = "#" onclick = "bpmMaint_abortInstance(' + processInstId + ',\'' + deploymentId + '\')">' + abort_key_trans + '</a></b></td>';
		}
	}
	buttons += '</tr></table>';
	return buttons;

}


/**********************************************************************************/



function bpmUploadProcDefGrid_UploadDwnReadyFunc()
{
	$("#bpmUploadProcDefGrid_Id")
	.subscribe(
			'addImportExportBtn',
			function(event, data) {
				var pagerId = "#bpmUploadProcDefGrid_Id"
						+ "_pager_left";

				var myGrid = $("#bpmUploadProcDefGrid_Id");
				
					myGrid.jqGrid(
								'navButtonAdd',
								pagerId,
								{
									caption : "",
									title : export_key,
									id : "bpmUploadProcDefGrid_exportBtn",
									buttonicon : 'ui-icon-arrowthickstop-1-s',
									onClickButton : function() {
										bpmUploadProcDefGrid_exportProcDef();
									}
								});	
								
							
					myGrid
						.jqGrid(
								'navButtonAdd',
								pagerId,
								{
									caption : "",
									title : import_key,
									id : "importButton_"
											+ _pageRef,
									buttonicon : 'ui-icon-arrowthickstop-1-n',
									onClickButton : function() {
										bpmUploadProcDefGrid_importProcDef();
									}
								});				

			});
}

function bpmUploadProcDefGrid_importProcDef()
{
	var bpmImportDialogDiv = $("<div id='bpmImportDialogDiv' class='path-common-sceen'></div>");
	bpmImportDialogDiv.css("padding","0");
	var theBody = $('body');
	bpmImportDialogDiv.insertAfter(theBody);
	
	dialogUrl= jQuery.contextPath+ "/path/bpm/BpmMaint_openImportDialog.action";
	dialogOptions={ autoOpen: false,
					height:235,
					title:import_key,
					width:450 ,
					modal: true,
					buttons: [ { text : (typeof signature_close_btn === undefined )? "Close" :signature_close_btn , click :function(){$(this).dialog('close');}}
			          ],
		           close: function (){
						  $("#bpmImportDialogDiv").dialog("destroy");
						  $("#bpmImportDialogDiv").remove();
				   }
	   }
	var params = {};
	$.post(dialogUrl ,params , function( param )
 	{
	  $('#bpmImportDialogDiv').html(param) ;
	  $('#bpmImportDialogDiv').dialog(dialogOptions)
	  $('#bpmImportDialogDiv').dialog('open');
	},"html");
}

function bpmUploadProcDefGrid_exportProcDef()
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
  	
  	_showProgressBar(true);
	var exportAction = jQuery.contextPath+ "/path/bpm/BpmMaint_exportProcDef.action";
	var parameter = {'bpmCO.processId' : processId};
	
	
	$.fileDownload(exportAction, {
		successCallback : function(url) {
			_showProgressBar(false);
		},
		failCallback : function(html, url) {
			_showErrorMsg(html);
			_showProgressBar(false);
		},
		data : parameter
	});
	
}


function bpmDocsGrid_Id_BtnFormatter(cellValue, options, rowObject)
{
	var showDocDownloadBtn = $('#bpmDocsGrid_showDocDownloadBtn').val();
	if(showDocDownloadBtn != undefined && showDocDownloadBtn != null && showDocDownloadBtn == 'true')
	{
		var buttons = '<table style="border-width:0" width="100%"><tr style="border-width:0"  width="100%">';
		var documentId = rowObject["docVO"]["DOC_ID"];
		var processInstanceId = $('#bpmDocsGrid_processInstanceId').val();
	
		buttons += '<td style="border-width:0"  width="33%"><b><a href = "#" onclick = "bpmDocsGrid_downloadDocument(' + documentId + ',' + processInstanceId + ')">' + bpm_download_key + '</a></b></td>';
	
		buttons += '</tr></table>';
		return buttons;
	}
	else
	{
		return '';
	}
}