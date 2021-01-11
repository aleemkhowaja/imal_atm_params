
function SEND_ALERTS_LIST_alertAftertblLoad()
{
	var alertsGrid = $("#alertsGrid_Id_"+_pageRef);
	var rowIds = alertsGrid.jqGrid('getDataIDs').length;
	
	if(rowIds==0)
	{ 
	    $("#divTransinfo_"+_pageRef).hide();
	    $("#divWarning_"+_pageRef).show();
	    $("#sendBut_"+_pageRef).addClass('ui-state-disabled');
	}
	else
	{
		$("#divWarning_"+_pageRef).hide();
		$("#divTransinfo_"+_pageRef).show();
		$("#sendBut_"+_pageRef).removeClass('ui-state-disabled');
	}
	if(allowLocalApproveOnly != null && allowLocalApproveOnly != undefined && allowLocalApproveOnly == '1')
	{
		$('#gview_alertsGrid_Id_' + _pageRef).css('visibility','hidden');
		$('#alertsGrid_Id_'+_pageRef+'_pager').css('visibility','hidden');
		$("#divTransinfo_"+_pageRef).hide();
		$("#divWarning_"+_pageRef).hide(); 
		
		$('#gbox_alertsGrid_Id_' + _pageRef).css('width','0px');
		$('#gbox_alertsGrid_Id_' + _pageRef).css('height','0px');
		$('#gbox_alertsGrid_Id_' + _pageRef).css('border','0');
		
		$('#AlertsFormDiv_' + _pageRef).css('height','290px');
		$('#AlertsForm_' + _pageRef).css('height','70%');
		$('#send_alert_div_' + _pageRef).css('height','290px');
		$('#send_alert_div_' + _pageRef).parent( "div .ui-dialog" ).css( "height", "270px" );
	}
	
}

function SEND_ALERTS_LIST_onGridComplete()
{
	//Resize the grid after loading
	resizeSingleGrid("alertsGrid_Id_"+_pageRef);
	$("#alertsGrid_Id_"+_pageRef + "_pager_left").css("width","33%");
	$("#alertsGrid_Id_"+_pageRef + "_pager_center").css("width","33%");
	$("#alertsGrid_Id_"+_pageRef + "_pager_right").css("width","33%");
	
	//Hide the title bar
	$("#gview_alertsGrid_Id_"+_pageRef+" div.ui-jqgrid-titlebar").hide();
	
	//NABIL FEGHALI - BISI120150 - Alert Offline
	//Highlight grid rows
	var highLightValue = $("#alert_param_highLightMap_"+_pageRef).val();
	var $table = $("#alertsGrid_Id_" + _pageRef);
	var rows = $table.jqGrid('getDataIDs');
	var rowsLen = rows.length;
			
	if (highLightValue != undefined 
			&& highLightValue != null
				&& highLightValue != ''
					&& rowsLen != undefined
						&& rowsLen != null
							&& rowsLen > 0) 
	{
		
		var highLightMap = $.parseJSON(highLightValue);
		if (highLightMap != undefined && highLightMap != null) 
		{
			var color = highLightMap.color;
			var usersList = $.parseJSON(highLightMap.users);
			if(color != undefined && color != null 
					&& usersList != undefined && usersList != null)
			{	
				for (i = 0; i < rowsLen; i++) 
				{
					var myObject = $table.jqGrid('getRowData', rows[i]);
					var userId = myObject["alertsParamCO.userId"];
					var found = $.inArray(userId,usersList) > -1;
					if(found != undefined 
							&& found != null
								&& found == true)
					{
						$table.jqGrid("setRowData", rows[i], "", {color:color});
					}
				}
			}
		}
	}
	//NABIL FEGHALI - END - BISI120150 - Alert Offline
	//NABIL FEGHALI - Fix Issue BB120315
	var sendAlertCallBackFunction = $("#alert_param_sendAlertCallBackFunction_"+_pageRef).val();
	if(sendAlertCallBackFunction != null && sendAlertCallBackFunction != undefined && sendAlertCallBackFunction != '')
	{
		jQuery.globalEval(sendAlertCallBackFunction + '("ON_LOAD")'); 
	}
	
}