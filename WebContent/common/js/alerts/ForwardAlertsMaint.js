
function FORWARD_ALERT_MAINT_dismissAlert()
{
	$("#forward_alert_div_"+alertsPageRef).dialog("destroy");
	$("#forward_alert_div_"+alertsPageRef).remove();
}

function FORWARD_ALERT_MAINT_forwardAlert()
{
		var alertsGrid = $("#alertsForwardGrid_Id_" + alertsPageRef);
		var rowIds = alertsGrid.jqGrid('getDataIDs').length;
		
		var todoLine = $("#todoLine_forward_"+alertsPageRef).val();
		var todoCode = $("#todoCode_forward_"+alertsPageRef).val();
		var statusCode = $("#statusCode_forward_"+alertsPageRef).val();
		
		var selRowId = $("#alertsForwardGrid_Id_" + alertsPageRef).jqGrid('getGridParam','selrow');
		myObject = $("#alertsForwardGrid_Id_" + alertsPageRef).jqGrid('getRowData',selRowId);
		
		if(selRowId!=null)
			{
				if(rowIds!=0)
					{
						var forwardParam = {
							"todoLine" : todoLine,
							"todoCode" : todoCode,
							"receiverCode" : myObject["alertsParamCO.userCode"],
							"receiverUserId" : myObject["alertsParamCO.userId"],
							"statusCode" : statusCode
						};
		
						
						$.ajax({
							 url: jQuery.contextPath+"/path/alerts/AlertsForwardMaint_forwadAlert?_pageRef="+alertsPageRef,
					         type:"post",
							 dataType:"json",
							 data: forwardParam,
							 success: function(data){
							
								FORWARD_ALERT_MAINT_dismissAlert();
								
								//Reload the alerts grid after forward
								var $table  = $("#trsAckTOutAlertGrid_Id_"+alertsPageRef);
	    						var gridUrl = jQuery.contextPath+"/path/alerts/TrsAckTOutAlertsGrid_loadTrsAckTOutAlertsGrid" ;
								var json = {};
								alertGridFirstLoad = true;
								$table.jqGrid('setGridParam', {url : gridUrl, datatype : 'json', postData : json}).trigger("reloadGrid");
		
							 }
					    });
					}
			   }
		
}