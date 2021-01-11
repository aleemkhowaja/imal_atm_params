
function FORWARD_ALERTS_LIST_alertForwardAftertblLoad(alertsPageRef)
{ 
	var alertsGrid = $("#alertsForwardGrid_Id_" + alertsPageRef);
	var rowIds = alertsGrid.jqGrid('getDataIDs').length;
	if(rowIds==0)
	{ 
	    $("#divTransinfo_f_" + alertsPageRef).hide();
	    $("#divWarning_f_" + alertsPageRef).show();
	    $("#forwardFBut_"+alertsPageRef).addClass('ui-state-disabled');
	}
	else
	{
		$("#divWarning_f_" + alertsPageRef).hide();
		$("#divTransinfo_f_" + alertsPageRef).show();
	}

	//Hide the title bar
	$("#gview_alertsForwardGrid_Id_"+alertsPageRef+" div.ui-jqgrid-titlebar").hide();
}

function FORWARD_ALERTS_LIST_buildAlertForwardGrid(alertsPageRef)
{ 

	var forwardListString = $("#forwardList_" + alertsPageRef).val();
	if(forwardListString != undefined && forwardListString != null && forwardListString != '' && forwardListString != 'undefined')
	{	
		var forwardListArray = $.parseJSON(forwardListString);
	
		if (forwardListArray != undefined
				&& forwardListArray != null
				&& forwardListArray.length > 0) 
		{
				var alertsGrid = $("#alertsForwardGrid_Id_" + alertsPageRef);
				$.each(forwardListArray,
							function(index, value) {
	
								var rowData = {};
								rowData["alertsParamCO"] = {};
								
								rowData["alertsParamCO"]["userId"] = value.alertsParamCO.userId;
								rowData["alertsParamCO"]["userCode"] = value.alertsParamCO.userCode;
								rowData["alertsParamCO"]["branchCode"] = value.alertsParamCO.branchCode;
								rowData["alertsParamCO"]["briefNameEnglish"] = value.alertsParamCO.briefNameEnglish;
								rowData["alertsParamCO"]["longNameEnglish"] = value.alertsParamCO.longNameEnglish
								rowData["alertsParamCO"]["briefNameArab"] = value.alertsParamCO.briefNameArab;
								rowData["alertsParamCO"]["longNameArab"] = value.alertsParamCO.longNameArab;
								rowData["alertsParamCO"]["status"] = value.alertsParamCO.status;
								
								$(alertsGrid).jqGrid('addRowData', index + 1, rowData);
	
			 	});
	
		}
	}
	FORWARD_ALERTS_LIST_alertForwardAftertblLoad(alertsPageRef);
	
}