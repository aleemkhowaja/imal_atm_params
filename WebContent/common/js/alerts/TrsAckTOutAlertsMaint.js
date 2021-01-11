//This array is used to store the grid row objects selected by user to be opened from the OpenItem(s) common button
//This array is filled on click of OpenItem(s) button, and its cleared on close of each opentItem popup.
var TrsAckTOutAlertsMaint_selectedOpenItemArray = new Array();

function TrsAckTOutAlertsMaint_snoozeTransAlerts(refreshTimeVal,refreshTime,refreshTimeForm)
{
	var i = 1;
	var arr = new Array();
	var message;
	var selArrRow = ($("#selectedAlertRows_"+alertsPageRef).val()!="")?eval("("+$("#selectedAlertRows_"+alertsPageRef).val()+")"):new Object();
	
	
	for(myObject in selArrRow)
	{
   var alertTypee=eval("selArrRow."+myObject+'["alertType"]');
   if(alertTypee=="TRANS")
	{
		arr.push("{\"TODO_LINE\": \""+ eval("selArrRow."+myObject+'["sTodoDet.TODO_LINE"]') +"\","+
				 "\"TODO_CODE\": \""+	eval("selArrRow."+myObject+'["sTodoDet.TODO_CODE"]') +"\","+
				 "\"TODO_STATUS\": \""+eval("selArrRow."+myObject+'["sTodoDet.TODO_STATUS"]') +"\","+
				 "\"ADDED\": \"1\"}");
	}
	}
    if(arr.length != 0)
	{
		var str = "{\"root\": [" + arr.join(",") + "]}";
		$("#gridSelectedRow_"+alertsPageRef).val();
		var selChqBook = $("#selectedAlertRows_"+alertsPageRef).val(); 
		$("#selectedAlertRows_"+alertsPageRef).val("");
		parseNumbers();
		var obj  = {"refreshTime" : refreshTime, 
		     		"refreshTimeVal" : refreshTimeVal ,
		     		"refreshTimeForm" :refreshTimeForm
				 	};
		var theForm = $("#TrsAckTOutAlertForm_"+alertsPageRef).serialize();
		
		
		obj["alertCO.gridSelectedRow"] = str;
		
		 $.ajax({
			 url: jQuery.contextPath+"/path/alerts/TrsAckTOutAlertsMaint_snoozeSelectedTransactional",
	         type:"post",
			 dataType:"json",
			 data: obj,
			 success: function(data){
		var $table  = $("#trsAckTOutAlertGrid_Id_"+alertsPageRef);
		alertGridFirstLoad = true;
	    var gridUrl = jQuery.contextPath+"/path/alerts/TrsAckTOutAlertsGrid_loadTrsAckTOutAlertsGrid" ;
		var json = {};
		$table.jqGrid('setGridParam', {url : gridUrl, datatype : 'json', postData : json}).trigger("reloadGrid");
			 }
	    });
	}

}

function TrsAckTOutAlertsMaint_snoozeAlerts()
{
	var refreshTimeForm=$("#dateTime_"+alertsPageRef).val();
	if(refreshTimeForm == undefined || refreshTimeForm == null || refreshTimeForm == '')
	{
		return;	
	}	
	var refHours=refreshTimeForm.split(":")[0];
	var refMinutes=refreshTimeForm.split(":")[1];
	var refSeconds=refreshTimeForm.split(":")[2];
	var time=((eval(refHours)*3600)+(eval(refMinutes)*60)+eval(refSeconds));
	var refreshTimeVal=refHours+""+refMinutes+""+refSeconds;
	var refreshTime=time;
	
	var obj  = {"refreshTime" : refreshTime, 
				"refreshTimeVal" : refreshTimeVal 
				 	};
	var theForm = $("#TrsAckTOutAlertForm_"+alertsPageRef).serialize();
	var selectedRadioId=$('input[name="radio1"]:checked').val();
	if(selectedRadioId==1)
	{
		TrsAckTOutAlertsMaint_snoozeTransAlerts(refreshTimeVal,refreshTime,refreshTimeForm);
	}
	else
	{
		 $.ajax({
			 url: jQuery.contextPath+"/path/alerts/TrsAckTOutAlertsMaint_snoozeAll",
	         type:"post",
			 dataType:"json",
			 data: obj,
			 success: function(data){
				if(data["_error"] == null)
		 		{
		 			/*set snoozetime in alertEngine to the sys time + snooze time defined by the user -1s*/
					if(data.refreshTime != undefined && data.refreshTime != null && data.refreshTime > 0)
		 			{
		 				var currentTime = new Date();
						alertEngine.amq.setSnoozeTime(new Date(currentTime.getTime() + ((data.refreshTime-1) * 1000)));
					}
			 		//Close alerts div			 
			 		TrsAckTOutAlertsMaint_closeAlert();
			 	}
			 }
	    });
		
	}
}

function TrsAckTOutAlertsMaint_closeAlert()
{
	//We should call the dialog("close") in order to restart the polling
	$("#receive_alert_div").dialog("close");
	$("#receive_alert_div").dialog("destroy");
	$("#receive_alert_div").remove();
}

function TrsAckTOutAlertsMaint_printAllAlert()
{
	var arr = new Array();
	var selArrRow = ($("#selectedAlertRows_"+alertsPageRef).val()!="")?eval("("+$("#selectedAlertRows_"+alertsPageRef).val()+")"):new Object();
	for(myObject in selArrRow)
	{
		var alertTypee=eval("selArrRow."+myObject+'["alertType"]');
		var alertSubType=eval("selArrRow."+myObject+'["ALERT_SUB_TYPE"]');
	
		if(alertTypee=="ACK")
		{
			if(alertSubType=="A")
			{
				arr.push(selArrRow[myObject]);
			}
		}
	}
    
    if(arr.length != 0)
	{
    	var index = 0;
    	for(index = 0 ; index <arr.length; index++)
    	{
    		trsAckTOutAlertGrid_Id_AlertTypeBtnSinglePrint($(arr).get(index));
    	}
	}

}

function TrsAckTOutAlertsMaint_okAllAlert()
{
	var i = 1;
	var arr = new Array();
	var message;
	var selArrRow = ($("#selectedAlertRows_"+alertsPageRef).val()!="")?eval("("+$("#selectedAlertRows_"+alertsPageRef).val()+")"):new Object();
	
	for(myObject in selArrRow)
	{
	     var alertTypee=eval("selArrRow."+myObject+'["alertType"]');
	     if(alertTypee=="ACK" || alertTypee=="NOT")
		 {
			arr.push("{\"TODO_LINE\": \""+ eval("selArrRow."+myObject+'["sTodoDet.TODO_LINE"]') +"\","+
					 "\"TODO_CODE\": \""+	eval("selArrRow."+myObject+'["sTodoDet.TODO_CODE"]') +"\","+
					 "\"TODO_STATUS\": \""+	eval("selArrRow."+myObject+'["sTodoDet.TODO_STATUS"]') +"\","+
					 "\"ADDED\": \"1\"}");
		 }
	}
    if(arr.length != 0)
	{
		var str = "{\"root\": [" + arr.join(",") + "]}";
		$("#gridSelectedRow_"+alertsPageRef).val(str);
		var selChqBook = $("#selectedAlertRows_"+alertsPageRef).val(); 
		$("#selectedAlertRows_"+alertsPageRef).val("");
		parseNumbers();
		var theForm = $("#TrsAckTOutAlertForm_"+alertsPageRef).serialize();
		 $.ajax({
			 url: jQuery.contextPath+"/path/alerts/TrsAckTOutAlertsMaint_okForAll",
	         type:"post",
			 dataType:"json",
			 data: theForm,
			 success: function(data){
	    		var $table  = $("#trsAckTOutAlertGrid_Id_"+alertsPageRef);
	    		alertGridFirstLoad = true;
	    		var gridUrl = jQuery.contextPath+"/path/alerts/TrsAckTOutAlertsGrid_loadTrsAckTOutAlertsGrid" ;
				var json = {};
				$table.jqGrid('setGridParam', {url : gridUrl, datatype : 'json', postData : json}).trigger("reloadGrid");
			 }
	    });
	}
    else
    {
    	_showErrorMsg(ack_ok_warning,Warning_key);
    }
}

function TrsAckTOutAlertsMaint_openAllAlert_clicked()
{
	TrsAckTOutAlertsMaint_selectedOpenItemArray = new Array();
	
	var selArrRow = ($("#selectedAlertRows_" + alertsPageRef).val() != "") ? eval("("
			+ $("#selectedAlertRows_" + alertsPageRef).val() + ")")
			: new Object();
			
	for (myObject in selArrRow) 
	{
		var alertTypee = eval("selArrRow." + myObject + '["alertType"]');
		if (alertTypee == "TO" || alertTypee == "TRANS") 
		{
			TrsAckTOutAlertsMaint_selectedOpenItemArray.push(selArrRow[myObject]);
		}
	}
	
	if(TrsAckTOutAlertsMaint_selectedOpenItemArray.length > 1 )
	{	
		_showConfirmMsg(open_multiple_item_confirmation, "Confirmation", 
			function(confirmcChoice, theArgs) 
			{
				if (confirmcChoice) 
				{
					TrsAckTOutAlertsMaint_openAllAlert();
				}
			}, {});
	}
	else if(TrsAckTOutAlertsMaint_selectedOpenItemArray.length == 1 )
	{
		TrsAckTOutAlertsMaint_openAllAlert();
	}
	else if(TrsAckTOutAlertsMaint_selectedOpenItemArray.length < 1 )
	{
		_showErrorMsg(trs_timeout_openitem_warning,Warning_key);
	}
}


function TrsAckTOutAlertsMaint_openAllAlert()
{
	//Check if the selectedOpenItem array still contains items, and then open them
	if(TrsAckTOutAlertsMaint_selectedOpenItemArray && TrsAckTOutAlertsMaint_selectedOpenItemArray.length != 0)
	{
		//Remove the first element from the array
		var firstItemObject = TrsAckTOutAlertsMaint_selectedOpenItemArray.shift();
		//Open the item in the OpenItem's popup
		trsAckTOutAlertGrid_Id_AlertTypeBtnOpenItem_Function(firstItemObject);
	}
}