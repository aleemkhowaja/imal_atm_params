
function alertSelectAllFunc(selectedRowInd, selected)
{
	//$("#load_trsAckTOutAlertGrid_Id_"+alertsPageRef).show();  
	
	$("#selectedAlertRows_"+alertsPageRef).val("");
	if(selected)
	{
		for(i=0; i <= selectedRowInd.length-1; i++)
		{
		 	alertSelectRowFunc(selectedRowInd[i], selected);
		}
	}
	
	//$("#load_trsAckTOutAlertGrid_Id_"+alertsPageRef).hide();
}
	
function alertSelectRowFunc(selectedRowInd, selected)
{
	//$("#load_trsAckTOutAlertGrid_Id_"+alertsPageRef).show();
	
    var $table   	  = $("#trsAckTOutAlertGrid_Id_"+alertsPageRef);
	var myObject      = $table.jqGrid('getRowData',selectedRowInd);
	
	var selAlert    = ($("#selectedAlertRows_"+alertsPageRef).val()!="")?eval("("+$("#selectedAlertRows_"+alertsPageRef).val()+")"):new Object();
	
	var key = myObject["sTodoDet.TODO_CODE"]+"_"+myObject["sTodoDet.TODO_LINE"];

	if(selected)
	{
		selAlert["alert"+key] = myObject;
	}
	else
	{
		selAlert["alert"+key] = undefined;
	}
	$("#selectedAlertRows_"+alertsPageRef).val(JSON.stringify(selAlert));
	
	//$("#load_trsAckTOutAlertGrid_Id_"+alertsPageRef).hide();
}

function alertGrid_Id_CompleteTopics()
{
    var $table   	  = $("#trsAckTOutAlertGrid_Id_"+alertsPageRef);
	var rows = $table.jqGrid('getDataIDs');
	var rowsLen = rows.length;
	
	//if($("#receive_alert_div"))
	//{
		//Check if the reload comes from the user dismiss action or from an alert receive event.
		//if the onAlertReceiveInput = true , the reload comes from new alert.
		//if the onAlertReceiveInput = false , the reload comes from a user dismiss action.
		
		//var onAlertReceiveInput = $("#receive_alert_div").find('#onAlertReceive_' + alertsPageRef);
		//if($(onAlertReceiveInput) && $(onAlertReceiveInput).val() == 'true')
		//{
			if(rowsLen && rowsLen > 0)
			{
				/////Path Notification
				if(alertGridFirstLoad == true)
				{
					var notifMsg = You_have_recieved + " " + rowsLen + " " + messages_key;
				
					if(typeof pathActivexDownloadEnabled !== 'undefined' && pathActivexDownloadEnabled == 'true')
					{	
					try {
						if ($.browser.msie) {
							PathNotif.showNotification(iMAL_Notifications_key, notifMsg,
									5000);
						}
						else if ($.browser.webkit) {
							var extDiv = document.getElementById(pthCtrlvrsnNb);
								if(extDiv == null || extDiv == undefined) {
								downloadURI(jQuery.contextPath + '/login/', 'pathCtrlChromeInstaller.msi');
								}
							var message = {
								title : iMAL_Notifications_key,
								message : notifMsg,
								time : 5000,
								timeInterval : 0
							};
							window.postMessage( {
								type : 'imalPathNotif',
								msg : message,
								chromeExt : true
							}, "*");
						}
					} catch (e) {
						console.log(e)
					}
					}
					var iMALInitialDocumentTitle = cachePathData("iMALInitialDocumentTitle");
					if(iMALInitialDocumentTitle == undefined || iMALInitialDocumentTitle == null || iMALInitialDocumentTitle == "")
					{
						cachePathData("iMALInitialDocumentTitle",document.title);
					}
					
					var oldTitle = cachePathData("iMALInitialDocumentTitle");
					var previousTimeoutId = cachePathData("iMALAlertDocumentTitleBlinkTimeout");
					if(previousTimeoutId)
					{
						clearInterval(previousTimeoutId);
					}
					var msg = rowsLen+ " " + iMAL_Notifications_key;
					var timeoutId;
					var blink = function() {
						document.title = document.title == msg ? oldTitle : msg;
					};
					var clear = function() {
						clearInterval(timeoutId);
						document.title = oldTitle;
						window.onmousemove = null;
						timeoutId = null;
					};
				    if (!timeoutId) {
				      timeoutId = setInterval(blink, 1000);
				      cachePathData("iMALAlertDocumentTitleBlinkTimeout",timeoutId);
				    }
				    
					$("#receive_alert_div").bind('dialogclose', clear);
				}
				alertGridFirstLoad = false;
				$("#receive_alert_div").dialog("open");
			}
			else
			{
				if(alertGridFirstLoad == true)
				{	
					//Nabil Feghali - Fix Issue #229080
					if($('div#dashboard div#ALERTS').length == 1 
							&& dashboard != undefined && dashboard != null)
					{	
						 var wi = dashboard.getWidget("ALERTS");
						 if(wi != undefined && wi != null)
 						 {
							 wi.refreshContent();
 						 }
					}
					$("#receive_alert_div").dialog("close"); 
					return;
				}	
			}
		//}
	//}
	
	//Fix Issue #275553 , add a complete event for the slide show to call the resizeSingleGrid function. comment the below call on grid complete
	//resizeSingleGrid("trsAckTOutAlertGrid_Id_"+alertsPageRef);
	
	$("#trsAckTOutAlertGrid_Id_" + alertsPageRef).jqGrid('setGridParam', {
		onSelectRow : function(selectedRowInd, selected) {
			alertSelectRowFunc(selectedRowInd, selected);
		},

		onSelectAll : function(selectedRowInd, selected) {
			alertSelectAllFunc(selectedRowInd, selected);
		}
	}); 
	
	var count=0;
		for(i=0; i<rowsLen; i++)
		{
			var myObject      = $table.jqGrid('getRowData',rows[i]);
			var alType= myObject["alertType"];
			if(alType=="TRANS")
				{
				count++;
                $table.jqGrid("setRowData", rows[i], "", {background:"#F5ECCE"});
				}
			if(alType=="TO")
				{
                $table.jqGrid("setRowData", rows[i], "", {background:"#F5F6CE"});
				}
			if(alType=="ACK")
				{
                $table.jqGrid("setRowData", rows[i], "", {background:"#E3F6CE"});
				}
			if(alType=="NOT")
				{
	            $table.jqGrid("setRowData", rows[i], "", {background:"#9ECC69"});
				}
		
		}
	if(count==0)
		{
		$("input[type=radio][value=" +1 + "]").prop("disabled",true);

		}
	
	//Hide the title bar
	$("#gview_trsAckTOutAlertGrid_Id_"+alertsPageRef+" div.ui-jqgrid-titlebar").hide();
	
}

/************************************************************************************************/

function trsAckTOutAlertGrid_Id_AlertDescBtnFormatter(cellValue, options, rowObject) 
{
	var alertType = rowObject["alertType"];
	if(alertType != 'NOT')
	{	
		var todoCode=rowObject["sTodoDet"].TODO_CODE;
		var todoLine=rowObject["sTodoDet"].TODO_LINE;
		return '<textarea style=\'display:none\' id=\'trxDescInput_' + todoCode +'_'+ todoLine + '\'/><a href=\'#\' onclick=\'trsAckTOutAlertGrid_loadTrxDetails(' + options.rowId + ')\'>'+ details_key +'</a>';
	}
	else
	{
		return "";
	}
}


function trsAckTOutAlertGrid_isFromIframe()
{ 
	if(window.name && window.name.indexOf("extScreenFrame") == 0)
	{
		return true;
	}
	else 
	{
		return false;
	}	
}

function trsAckTOutAlertGrid_openTrxDetails(divContent,todoCode,todoLine,descriptionColor)
{
	if(divContent != undefined && divContent != null)
	{
		var isFromIframe = trsAckTOutAlertGrid_isFromIframe();
		var trxDescInputElement = $("#trxDescInput_" + todoCode + '_' + todoLine);
		
		$(trxDescInputElement).html(divContent);
		var colorAttribute = '';
		if(descriptionColor != undefined && descriptionColor != '')
		{
			colorAttribute = ' color:' + descriptionColor + ' !Important;';
			$(trxDescInputElement).attr('color',colorAttribute);
		}
		else 
		{
			var definedColor = $(trxDescInputElement).attr('color');
			if(definedColor != undefined && definedColor != null && definedColor != '')
		    {
				colorAttribute = definedColor;
		    }
		}
		
		var trxDescDivContent = "<div id='trxDescDiv_"+ todoCode + "_" + todoLine +"'><textarea style='width:100%;height:100%;background-color: transparent; " + colorAttribute + " border: none; overflow:hidden;' spellcheck='false' autocorrect='off' autocapitalize='off' autocomplete='off' readonly='readonly'>" + divContent + "</textarea></div>";
		var trxDescDivElement = $(trxDescDivContent);
		if(isFromIframe)
		{
			$("#screenContainerDiv_" + _pageRef).append(trxDescDivElement);
			//In case of Iframe, the progress bar should be removed from inside the iframe , on load complete
		}	
		else
		{
			$('#TrsAckTOutAlertForm_' + _pageRef).append(trxDescDivElement);
			trxDescDivElement.dialog( {
				modal : true,
				title : details_key,
				autoOpen : false,
				//show : 'slide',
				position : 'center',
				width : returnMaxWidth('250'),
				height : returnMaxHeight('150'),
				close : function() {
					$("#trxDescDiv_" + todoCode + "_" + todoLine).dialog("destroy");
					$("#trxDescDiv_" + todoCode + "_" + todoLine).remove();
				},
				open : function() {
				}
			});
	
			$(trxDescDivElement).dialog("open");
			_showProgressBar(false);
		}
		
	}
}

function trsAckTOutAlertGrid_loadTrxDetails(rowId)
{
	if(rowId != undefined && rowId != null)
	{
		var rowObject = $("#trsAckTOutAlertGrid_Id_RCVALERT").jqGrid("getRowData",rowId);
		
		var todoCode=rowObject["sTodoDet.TODO_CODE"];
		var todoLine=rowObject["sTodoDet.TODO_LINE"];
		
		if(todoCode != undefined && todoCode != null
				&& todoLine != undefined && todoLine != null)
		{
			var divContent = $("#trxDescInput_" + todoCode +'_'+ todoLine).html(); 
			if(divContent != undefined && divContent != null && divContent.trim() == '')
			{
				var parmeters = {
										'todoParam':rowObject["sTodoDet.TODO_PARAM"],
										'progRef':rowObject["sTodoDet.TODO_PROG_REF"],
										'todoAlert':rowObject["alertCode"],
										'todoExcepEnglish':rowObject["sTodoDet.TODO_EXCEP_ENG"],
										'todoExcepArabic':rowObject["sTodoDet.TODO_EXCEP_ARABIC"],
										'compCode':rowObject["sTodoDet.COMP_CODE"],
										'branchCode':rowObject["sTodoDet.BRANCH_CODE"],
										'todoCode':todoCode,
										'todoLine':todoLine,
										'alertDescription':rowObject["alertDescription"],
										'todoFrBranch':rowObject["sTodoDet.TODO_FR_BRANCH"],
										'briefNameEnglish':rowObject["sTodoDet.BRIEF_NAME_ENG"],
										'reasonCode':rowObject["sTodoDet.TODO_REASON"],
										'todoAlertDescription':rowObject["sTodoDet.ALERT_DESC"],
										'appName':$("#appName_"+alertsPageRef).val()
								};
				

				_showProgressBar(true);
				$.ajax({url:  jQuery.contextPath + "/path/alerts/TrsAckTOutAlertsGrid_loadTrxDetails",
								type:"post",
								dataType:"json", 
								data: parmeters, 
								success: function(data)
								{
									var loadTrxJsFunc = data["alertsSC"].loadTrxDetailsFunc;
									var loadTrxJsPath = data["alertsSC"].loadTrxDetailsJsPath;
									var loadTrxJsFile = data["alertsSC"].loadTrxDetailsJs;
									
									if(loadTrxJsFunc != undefined && loadTrxJsFunc != null && loadTrxJsFunc.trim() != ''
										&& loadTrxJsPath != undefined && loadTrxJsPath != null && loadTrxJsPath.trim() != ''
											&& loadTrxJsFile != undefined && loadTrxJsFile != null && loadTrxJsFile.trim() != '')
									{
											//The TODO_APPLICATION, it's the application name of the alert in S_TODO_DET
											var appName = $("#appName_"+alertsPageRef).val();
											//The loged in application stored in sessionCO
											var currentAppName = $('#currentAppName_' + alertsPageRef).val();
											var useIframe = trsAckTOutAlertGrid_Id_openInIframe(appName,currentAppName);
											if(useIframe)
											{
												trsAckTOutAlertGrid_loadTrxDetailsInIframe(data,appName,todoCode,todoLine);
											}
											else
											{
												$.struts2_jquery.require(loadTrxJsFile ,null,jQuery.contextPath+loadTrxJsPath);
												eval(loadTrxJsFunc+'(' + JSON.stringify(parmeters) + ')');
											}	
	
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
				_showProgressBar(true);
				trsAckTOutAlertGrid_openTrxDetails(divContent,todoCode,todoLine);
			}
		}
	}
}

function trsAckTOutAlertGrid_loadTrxDetailsInIframe(data,appName,todoCode,todoLine)
{
	//_showProgressBar(true);
	var alertDetailUrl = jQuery.contextPath+'/path-default/loadIframeScreenAction';
	var alertDetailparam = {};
	alertDetailparam["destinationProgRef"] = alertsPageRef;
	alertDetailparam["appName"] = appName;
	alertDetailparam["destinationUrl"] ="/path/alerts/TrsAckTOutAlertsGrid_loadTrxDetailsIframe";
	alertDetailparam["additionalParams"] = JSON.stringify(data["alertsSC"]); 
	var trxDescDivContent = "<div id='trxDescDiv_"+ todoCode + "_" + todoLine +"' style='width:100%;height:100%;border:0px;overflow:hidden;' ></div>";
	var trxDescDivElement = $(trxDescDivContent);
	$('#TrsAckTOutAlertForm_ ' + alertsPageRef).append(trxDescDivElement);
	
	trxDescDivElement.dialog( {
		modal : true,
		title : details_key,
		autoOpen : false,
		position : 'center',
		width : returnMaxWidth('250'),
		height : returnMaxHeight('150'),
		close : function() {
			$("#trxDescDiv_" + todoCode + "_" + todoLine).dialog("destroy");
			$("#trxDescDiv_" + todoCode + "_" + todoLine).remove();
		},
		open : function() {
		}
	});

	$(trxDescDivElement).load(alertDetailUrl,alertDetailparam,
			function() 
			{
				$(trxDescDivElement).dialog("open");
				//_showProgressBar(false);
			});
	
	
}

/************************************************************************************************/

function trsAckTOutAlertGrid_Id_AlertTypeBtnFormatter(cellValue, options, rowObject) {
	
	var alertCode=rowObject["alertCode"];
	var alertType=rowObject["alertType"];
	var alertSubType=rowObject["ALERT_SUB_TYPE"];
	if(alertCode!=null)
		{
		if(alertType=="TRANS")
			{
			return '<table style="border-width:0" width="100%" ><tr style="border-width:0" width="100%"><td style="border-width:0" width="33%"><b><a href = "#" onclick = "javascript:trsAckTOutAlertGrid_Id_AlertTypeBtnForward_Clicked(' + options.rowId
				+ ');">' + forward_label_trans + '</a></b></td><td style="border-width:0" border="0" width="33%"><b>'+'<a href = "#" onclick = "javascript:trsAckTOutAlertGrid_Id_AlertTypeBtnOpenItem_Clicked(' + options.rowId
				+ ');">' + openItem_label_trans+ '</a></b></td></tr></table>';
			}
		if(alertType=="TO")
			{
			return '<table style="border-width:0" width="100%"><tr style="border-width:0" width="100%"><td style="border-width:0" width="33%"><b><a href = "#" onclick = "javascript:trsAckTOutAlertGrid_Id_AlertTypeBtnDismiss_Clicked(' + options.rowId
				+ ');">' + dismiss_label_trans + '</a></b></td><td style="border-width:0" width="33%"><b>'+'<a href = "#" onclick = "javascript:trsAckTOutAlertGrid_Id_AlertTypeBtnForward_Clicked(' + options.rowId
				+ ');">' + forward_label_trans + '</a></b></td><td style="border-width:0"  width="33%"><b>'+'<a href = "#" onclick = "javascript:trsAckTOutAlertGrid_Id_AlertTypeBtnOpenItem_Clicked(' + options.rowId
				+ ');">' + openItem_label_trans + '</a></b></td></tr></table>';
			}
		if(alertType=="ACK")
			{
			if(alertSubType=="A")
				{
				return '<table style="border-width:0" width="100%"><tr style="border-width:0"  width="100%"><td style="border-width:0"  width="33%"><b><a href = "#" onclick = "javascript:trsAckTOutAlertGrid_Id_AlertTypeBtnPrint_Clicked(' + options.rowId
				+ ');">' + print_label_trans+ '</a></b></td><td style="border-width:0"  width="33%"><b>'+'<a href = "#" onclick = "javascript:trsAckTOutAlertGrid_Id_AlertTypeBtnOk_Clicked(' + options.rowId
				+ ');">' + ok_label_trans + '</a></b></td><td style="border-width:0"  width="33%"></td></tr></table>';
				}
			else
				{
				return '<table style="border-width:0" width="100%"><tr style="border-width:0"  width="100%"><td style="border-width:0"  width="33%"><b><a href = "#" onclick = "javascript:trsAckTOutAlertGrid_Id_AlertTypeBtnOk_Clicked(' + options.rowId
				+ ');">' + ok_label_trans + '</a></b></td> <td style="border-width:0"  width="33%"> <td style="border-width:0"  width="33%"></tr></table>';
				}
			}
		if(alertType=="NOT")
		{
			return '<table style="border-width:0" width="100%"><tr style="border-width:0"  width="100%"><td style="border-width:0"  width="33%"><b><a href = "#" onclick = "javascript:trsAckTOutAlertGrid_Id_AlertTypeBtnOk_Clicked(' + options.rowId
			+ ');">' + ok_label_trans + '</a></b></td> <td style="border-width:0"  width="33%"> <td style="border-width:0"  width="33%"></tr></table>';
		}

		}
	else
		{
		return '<a></a>';
		}
}


	function trsAckTOutAlertGrid_Id_AlertTypeBtnOpenItem_Clicked(rowindex)
	{
		_showProgressBar(true);
		var $table  = $("#trsAckTOutAlertGrid_Id_"+alertsPageRef);
		var myObject = $table.jqGrid('getRowData',rowindex);
		
		var todoLine=myObject["sTodoDet.TODO_LINE"];
		var todoCode=myObject["sTodoDet.TODO_CODE"];
		
		$.ajax({
			url: jQuery.contextPath+'/path/alerts/ApproveAlertsMaint_checkBeforeOpenItemForApprove',
			type:"post",
			dataType:"json",
		  	data: {'alertsParamCO.todoCode':todoCode,'alertsParamCO.todoLine':todoLine},
			success: function(data){
				if(data["_error"] == undefined || data["_error"] == null)
				{
					trsAckTOutAlertGrid_Id_AlertTypeBtnOpenItem_Function(myObject);
				}
				else
				{
					trsAckTOutAlertGrid_Id_reloadGrid(); 
				}
				_showProgressBar(false);
	        }
		});
	}
	
	function trsAckTOutAlertGrid_Id_prepareParameters(myObject)
	{
		if(myObject)
		{
			var todoLine=myObject["sTodoDet.TODO_LINE"];
			var todoCode=myObject["sTodoDet.TODO_CODE"];
			var status=myObject["sTodoDet.TODO_STATUS"];
			var subtype=myObject["ALERT_SUB_TYPE"];
			var todoAlert=myObject["sTodoDet.TODO_ALERT"];
			var alertDesc=myObject["alertDescription"];
			var alertCode=myObject["alertCode"];
			var alertType=myObject["alertType"];
			var todoParam=myObject["sTodoDet.TODO_PARAM"];
			var trsNumber=myObject["sTodoDet.TRX_NUMBER"];
			//var receivedFrom=myObject["sTodoDet.RECEIVED_FROM"];
			//var userId=myObject["sTodoDet.USER_ID"];
			var todoType=myObject["sTodoDet.TODO_TYPE"];
			var todoProgRef=myObject["sTodoDet.TODO_PROG_REF"];
			var todoFrBranch=myObject["sTodoDet.TODO_FR_BRANCH"];
			var reasonCode=myObject["sTodoDet.TODO_REASON"];
			var todoExcepEng=myObject["sTodoDet.TODO_EXCEP_ENG"];
			var todoAlertOldStatus=myObject["sTodoDet.TODO_ALERT_OLD_STATUS"];
			var todoAppName= $("#appName_"+alertsPageRef).val();
			
			var openItemParam = {
				"alertsParamCO.todoLine" 		: todoLine,
				"alertsParamCO.todoCode" 		: todoCode,
				"alertsParamCO.status" 			: status,
				"alertsParamCO.alertSubType" 	: subtype,
				"alertsParamCO.alertDescription" : alertDesc,
				"alertsParamCO.todoAlert" 		: alertCode,
				"alertsParamCO.trsNo" 			: trsNumber,
				"alertsParamCO.todoParam" 		: todoParam,
				"alertsParamCO.todoType" 		: todoType,
				"alertsParamCO.progRef"			: todoProgRef,
				"alertsParamCO.alertType"		: alertType,
				"alertsParamCO.todoFrBranch"	:todoFrBranch,
				"alertsParamCO.reasonCode"		:reasonCode,
				"alertsParamCO.todoExcepEnglish" :todoExcepEng,
				"alertsParamCO.todoAlertOldStatus" :todoAlertOldStatus,
				"alertsParamCO.appName" :todoAppName
			}; 
			
			return openItemParam;
		}
		
	}
	
	function trsAckTOutAlertGrid_Id_openInIframe(appName,currentAppName)
	{
		return (appName != undefined && appName != null && appName != '' 
							&& currentAppName != undefined && currentAppName != null && currentAppName != ''
							&& appName != currentAppName);
	}
	
	function trsAckTOutAlertGrid_Id_AlertTypeBtnOpenItem_Function(myObject)
	{
		if(myObject)
		{
			//The TODO_APPLICATION, it's the application name of the alert in S_TODO_DET
			var appName = $("#appName_"+alertsPageRef).val();
			//The loged in application stored in sessionCO
			var currentAppName = $('#currentAppName_' + alertsPageRef).val();
			
			
			//Prepare parameters obj
			var openItemParam =  trsAckTOutAlertGrid_Id_prepareParameters(myObject);
			var approveURL = jQuery.contextPath+'/path/alerts/ApproveAlertsMaint_openItemForApprove?_pageRef=' + alertsPageRef+"&_appName="+appName;
			
			//If the logged in app name (currentAppName) is different from teh alert app name ( appName used in received alerts grid query)
			var useIframe = trsAckTOutAlertGrid_Id_openInIframe(appName,currentAppName); 
							//(appName != undefined && appName != null && appName != '' 
							//&& currentAppName != undefined && currentAppName != null && currentAppName != ''
							//&& appName != currentAppName);
			
			//If opening from admin 
			if(useIframe)
			{
				$.struts2_jquery.require("AlertsOpenItem.js" ,null,jQuery.contextPath+"/common/js/alerts/");
				approveURL = jQuery.contextPath+'/path-default/loadIframeScreenAction';
				var objToSend = {};
				objToSend["destinationUrl"] ="/path/alerts/ApproveAlertsMaint_openItemForApprove";
				objToSend["additionalParams"] = JSON.stringify(openItemParam);
				objToSend["destinationProgRef"] =alertsPageRef;
				objToSend["appName"] = appName;
				openItemParam = objToSend;
				openItemPageRef = alertsPageRef;
				
				$("#open_item_div_" + alertsPageRef).css('overflow','hidden');
			}
			
			//Clear open_item_div content
			$("#open_item_div_" + alertsPageRef).html("");
			
			var screenWidth = 100;
			var screenHeight = 100;
			var positionElement = $(window);
			//Fix Issue #216663 - in case of opening from landing page, the $('#content-container') does not exists.
			//The $(window) will be used instead. 
			if($('#content-container') != undefined && $('#content-container').length > 0)
			{
			 	screenWidth = $('#content-container').width();
			 	screenHeight = $('#content-container').height();
				positionElement = $('#content-container');
			}
			else
			{
				screenWidth = $(window).width() -100;
			 	screenHeight = $(window).height() -100;
			}	

			var maxWidth =  $(window).width() -50;
    		var maxHeight = $(window).height() -100;

    		var openItemDivElement = $("#open_item_div_"+ alertsPageRef)
				
			openItemDivElement.dialog( {
				autoOpen : false,
				//show : 'slide',
				modal : true,
				title : approve_item_key,
				position: { 
		    		my: 'top',
		    		at: 'top',
		    		of: positionElement
		  		},
				width  : screenWidth,
				height : screenHeight,
				maxHeight: maxHeight,
        		maxWidth: maxWidth,
				close : function(ev, ui) {
					//$(this).dialog("destroy");
					//$(this).remove();
		  			ALERTS_OPEN_ITEM_closeOpenItem();
				},
				resizeStop: function(event, ui) {
					$.struts2_jquery.require("ApproveAlertsMaint.js" ,null,jQuery.contextPath+"/common/js/alerts/");
					ApproveAlertsMaint_resizeOpenItemWindow(alertsPageRef,screenWidth,screenHeight);	
				}
			
			});
			
			_showProgressBar(true);
			$(openItemDivElement).height(maxHeight - 50);
			$(openItemDivElement).load(
				approveURL,openItemParam,
				function() {
					//If opening from admin 
					if(useIframe)
					{
						$(openItemDivElement).dialog("open");
						//Keep the progressBar because it will be removed inside the iframe on complete
						//_showProgressBar(false);
					}	
					else
					{	
						var divFieldset = $(openItemDivElement).has("fieldset");
						if(divFieldset != undefined && divFieldset != null 
								&& divFieldset.length != undefined && divFieldset.length != null && divFieldset.length == 1)
						{
							$(openItemDivElement).dialog("open");	
						}	
						else
						{  
							//NABIL FEGHALI - FIX ISSUE #182112 - in case of asking for password before opening aler, dont close the openItemDivElement
							if($(openItemDivElement).children('#ApproveAlertsForm_' + alertsPageRef).length <= 0)
							{	
								$(openItemDivElement).dialog("destroy");	
								$(openItemDivElement).remove();
							}
							else
							{
								$(openItemDivElement).dialog("open");	
							}
						}
					}
				});
		}
	}
	
	function trsAckTOutAlertGrid_Id_AlertTypeBtnForward_Common(rowindex,buildGridOnLoad,forwardList)
	{
		var $table  = $("#trsAckTOutAlertGrid_Id_"+alertsPageRef);
		var myObject = $table.jqGrid('getRowData',rowindex);
		var todoLine=myObject["sTodoDet.TODO_LINE"];
		var todoCode=myObject["sTodoDet.TODO_CODE"];
		var todoStatusCode=myObject["sTodoDet.TODO_STATUS"];
		_showProgressBar(true);
		/************************************/
		
		var loadSrc = jQuery.contextPath	+   "/path/alerts/AlertsForwardMaint_loadForwardAlertsPage?_pageRef="+alertsPageRef;
		
		var curParams = {"todoLine" : todoLine, 
	        			 "todoCode" : todoCode,
	        			 "statusCode" : todoStatusCode,
	        			 "buildGridOnLoad" : buildGridOnLoad,
	        			 "forwardList" : forwardList
	        			 };
		
		//Check if the forward div is already opened and should be closed
		//if($("#forward_alert_div_" + alertsPageRef) && $("#forward_alert_div_" + alertsPageRef).attr('id') != undefined)
		//{
		//	$("#forward_alert_div_" + alertsPageRef).remove();
		//}
		
		var forwardAlertDivElement = $('<div>',{id:"forward_alert_div_" + alertsPageRef});
		$('body').append(forwardAlertDivElement);
		
		/*for window Forward alert*/
		forwardAlertDivElement.dialog({modal:false, 
		                                  title:" "+Forward_Alert_key,
		                               	  modal : true,
		                                  autoOpen:true,
		                                   show:'slide',
		                               position:'center', 
		                                 width:'750',
		                                 height:'400',
		                                 close: function (){
			 								  var theDialog = $(this);
			 								  theDialog.remove();
														    }});
		$(forwardAlertDivElement).css('height','400px');
		$(forwardAlertDivElement).load(
			loadSrc,curParams,
			function() {
				$(forwardAlertDivElement).dialog("open");
				_showProgressBar(false);
		});
	
	}
	
	
	function trsAckTOutAlertGrid_loadForwardInIframe(forwardParam,appName,todoCode,todoLine)
	{
		//_showProgressBar(true);
		var alertDetailUrl = jQuery.contextPath+'/path-default/loadIframeScreenAction';
		var alertDetailparam = {};
		alertDetailparam["destinationProgRef"] = alertsPageRef;
		alertDetailparam["appName"] = appName;
		alertDetailparam["destinationUrl"] ="/path/alerts/ApproveAlertsMaint_loadForwardIframe";
		alertDetailparam["additionalParams"] = JSON.stringify(forwardParam); 
		var alertForwardIframeDivContent = "<div id='alertForwardIframeDiv_" + appName + "_" + todoCode + "_" + todoLine +"' style='width:100%;height:100%;border:0px;overflow:hidden;' ></div>";
		var alertForwardIframeDivElement = $(alertForwardIframeDivContent);
		$('#TrsAckTOutAlertForm_ ' + alertsPageRef).append(alertForwardIframeDivElement);
		
		alertForwardIframeDivElement.dialog( {
			modal : true,
			title : " "+Forward_Alert_key,
			autoOpen : false,
			position : 'center',
			width : returnMaxWidth('750'),
			height : returnMaxHeight('450'),
			close : function() {
				$("#alertForwardIframeDiv_" + appName + "_" + todoCode + "_" + todoLine).dialog("destroy");
				$("#alertForwardIframeDiv_" + appName + "_" + todoCode + "_" + todoLine).remove();
			},
			open : function() {
			}
		});
	
		$(alertForwardIframeDivElement).load(alertDetailUrl,alertDetailparam,
				function() 
				{
					$(alertForwardIframeDivElement).dialog("open");
				});
	}
	
	
	function trsAckTOutAlertGrid_Id_AlertTypeBtnForward_Clicked(rowindex)
	{
		var $table  = $("#trsAckTOutAlertGrid_Id_"+alertsPageRef);
		var myObject = $table.jqGrid('getRowData',rowindex);
		
		if(myObject)
		{	
			_showProgressBar(true);
			var forwardParam =  trsAckTOutAlertGrid_Id_prepareParameters(myObject);
			$.ajax({url:  jQuery.contextPath + "/path/alerts/ApproveAlertsMaint_returnForwardUrl",
				type:"post",
				dataType:"json", 
				data: forwardParam, 
				success: function(data)
						 {
							if(data["_error"] == undefined || data["_error"] == null)
							{
								var forwardMethodUrl = (data.alertCO.forwardMethodUrl != undefined) ? data.alertCO.forwardMethodUrl : null;
								var openItemParams = ( data.alertCO.openItemParams != undefined) ? data.alertCO.openItemParams : null;
								
								if(forwardMethodUrl != null && forwardMethodUrl != '')
								{	
									
									//The TODO_APPLICATION, it's the application name of the alert in S_TODO_DET
									var appName = $("#appName_"+alertsPageRef).val();
									//The loged in application stored in sessionCO
									var currentAppName = $('#currentAppName_' + alertsPageRef).val();
									var useIframe = trsAckTOutAlertGrid_Id_openInIframe(appName,currentAppName);
									if(useIframe)
									{
										trsAckTOutAlertGrid_loadForwardInIframe(forwardParam,appName,myObject["sTodoDet.TODO_CODE"],myObject["sTodoDet.TODO_LINE"]);
									}
									else
									{
										var forwardParamJson = JSON.parse(openItemParams);
										$.ajax({url:  jQuery.contextPath + forwardMethodUrl,
										type:"post",
										dataType:"json", 
										data: forwardParamJson, 
										success: function(data)
											 {
												if(data["_error"] == undefined || data["_error"] == null)
												{	
													var forwardList = data["alertCO"]["alertsParamCO"]["forwardList"];
													//if(forwardList != undefined && forwardList != null && forwardList.length > 0)
													//{
														trsAckTOutAlertGrid_Id_AlertTypeBtnForward_Common(rowindex,'true',forwardList);
													//}	
													//else
													//{
													//	trsAckTOutAlertGrid_Id_AlertTypeBtnForward_Common(rowindex,null,null);
													//}
												}
												else
												{
													_showProgressBar(false);
												}
											 }
										});
									}
								}
								else
								{
									trsAckTOutAlertGrid_Id_AlertTypeBtnForward_Common(rowindex,null,null);
								}
							}
							else
							{
								_showProgressBar(false);
								trsAckTOutAlertGrid_Id_reloadGrid(); 
							}
						}	
				});
				
		}
		
	}
	
	function trsAckTOutAlertGrid_Id_AlertTypeBtnOk_Clicked(rowindex)
	{
		
		var $table  = $("#trsAckTOutAlertGrid_Id_"+alertsPageRef);
		var myObject = $table.jqGrid('getRowData',rowindex);
		var todoLine=myObject["sTodoDet.TODO_LINE"];
		var todoCode=myObject["sTodoDet.TODO_CODE"];
		var status=myObject["sTodoDet.TODO_STATUS"];
		var todoAlert = myObject["alertCode"];
		var todoParam = myObject["sTodoDet.TODO_PARAM"];
		var receivedFrom = myObject["sTodoDet.RECEIVED_FROM"];
		var appName = $("#appName_"+alertsPageRef).val();
		var obj  = {"todoLine" : todoLine, 
				 	"todoCode" : todoCode, 
				 	"status" : status,
				 	"todoAlert": todoAlert,
				 	"todoParam": todoParam,
				 	"appName": appName,
				 	"receivedFrom": receivedFrom};
		
		$.ajax({url:  jQuery.contextPath+"/path/alerts/TrsAckTOutAlertsGrid_trsAckTOutAlertsAfterOk", type:"post", dataType:"json", data: obj, 
			success: function(data)
					{
						var isLoginAlertEnabled = $('#isLoginAlertEnabled_'+alertsPageRef).val();
						if(isLoginAlertEnabled != undefined && isLoginAlertEnabled == 'true')
						{
							//close the receive alert dialog
							$("#receive_alert_div").dialog("destroy");
							$("#receive_alert_div").remove();
							
							//Stop login alert Polling
							alertEngine.amq.setContinuePolling(false);
							
							var todoAlert = data["alertsSC"]["todoAlert"];
							if(todoAlert != undefined && todoAlert == '@LA')
							{
								alertEngine.isLoginAlertEnabled = 'false';
								//allow all buttons to be clicked normaly
								loginAlertBtnLocked = 0;
								if(alertEngine.isAlertEnabled == 'true')
								{
									alertEngine.amq.resetAmqVariables();
									alertEngine.start(alertEngine);
								}
							}
						}
						else
						{
							trsAckTOutAlertGrid_Id_reloadGrid();
						}
					}
			});
		
	}
	
	
	function trsAckTOutAlertGrid_Id_RemovePrintIframeDiv()
	{
		if($('#printAlertIframeDiv_' + alertsPageRef).length > 0 )
		{	
			$('#printAlertIframeDiv_' + alertsPageRef).remove();
		}
	}
	
	function trsAckTOutAlertGrid_Id_AlertTypeBtnSinglePrintIframe(data,appName)
	{
		_showProgressBar(true);
		var alertDetailUrl = jQuery.contextPath+'/path-default/loadIframeScreenAction';
		var alertDetailparam = {};
		alertDetailparam["destinationProgRef"] = alertsPageRef;
		alertDetailparam["appName"] = appName;
		alertDetailparam["destinationUrl"] ="/path/alerts/ApproveAlertsMaint_printAlertIframe";
		delete data['alertCO']['alertsParamCO'];
		delete data['alertCO']['sTodoDet'];
		delete data['alertCO']['ctsControlAlertVO'];
		
		alertDetailparam["additionalParams"] = JSON.stringify(data['alertCO']);
		
		trsAckTOutAlertGrid_Id_RemovePrintIframeDiv();
		
		var printAlertIframeDiv = "<div id='printAlertIframeDiv_" + alertsPageRef + "' style='display:none'></div>";
		var printAlertIframeDiv = $(printAlertIframeDiv);
		$('#TrsAckTOutAlertForm_' + alertsPageRef).append(printAlertIframeDiv);
		
		$(printAlertIframeDiv).load(alertDetailUrl,alertDetailparam,
				function() 
				{
					_showProgressBar(false);
				});
	}
	
	function trsAckTOutAlertGrid_Id_CommonPrint(printMethodUrl,openItemParams,printCallBackFunc,printCallBackFuncRequireJs,printCallBackFuncRequirePath)
	{
		_showProgressBar(true);
		var printParamJson = JSON.parse(openItemParams);
		$.ajax({url:  jQuery.contextPath + printMethodUrl,
		type:"post",
		dataType:"json", 
		data: printParamJson, 
		success: function(data)
				 {
					if(data["_error"] == undefined || data["_error"] == null)
					{	
						if( printCallBackFunc != undefined && printCallBackFunc != null && printCallBackFunc != '')
						{	
							if(printCallBackFuncRequireJs != undefined && printCallBackFuncRequireJs != null && printCallBackFuncRequireJs != ''
								&& printCallBackFuncRequirePath != undefined && printCallBackFuncRequirePath != null && printCallBackFuncRequirePath != '')
							{
								$.struts2_jquery.require(printCallBackFuncRequireJs ,null,jQuery.contextPath+printCallBackFuncRequirePath);
							}
							jQuery.globalEval( printCallBackFunc + "(" + JSON.stringify(data) + ")" );
							_showProgressBar(false);
						}
					}
				 }
		});
	}
	
	function trsAckTOutAlertGrid_Id_AlertTypeBtnSinglePrint(myObject)
	{
		if(myObject)
		{	
			_showProgressBar(true);
			var printParam =  trsAckTOutAlertGrid_Id_prepareParameters(myObject);
			printParam['alertsParamCO.appName'] = $("#appName_"+alertsPageRef).val();
			
			$.ajax({url:  jQuery.contextPath + "/path/alerts/ApproveAlertsMaint_returnPrintUrl",
				type:"post",
				dataType:"json", 
				data: printParam, 
				success: function(data)
						 {
							_showProgressBar(false);
							//The TODO_APPLICATION, it's the application name of the alert in S_TODO_DET
							var appName = $("#appName_"+alertsPageRef).val();
							//The loged in application stored in sessionCO
							var currentAppName = $('#currentAppName_' + alertsPageRef).val();
							var useIframe = trsAckTOutAlertGrid_Id_openInIframe(appName,currentAppName);
							if(useIframe)
							{
								trsAckTOutAlertGrid_Id_AlertTypeBtnSinglePrintIframe(data,appName);
							}
							else
							{
								var printMethodUrl = data.alertCO.printMethodUrl;
								if(printMethodUrl != undefined && printMethodUrl != null && printMethodUrl != '')
								{	
									var openItemParams = data.alertCO.openItemParams;
									var printCallBackFunc = data.alertCO.callBackPrintFunc;
									var printCallBackFuncRequireJs = data.alertCO.callBackPrintFuncRequireJs;
									var printCallBackFuncRequirePath = data.alertCO.callBackPrintFuncRequirePath;
									trsAckTOutAlertGrid_Id_CommonPrint(printMethodUrl,openItemParams,printCallBackFunc,printCallBackFuncRequireJs,printCallBackFuncRequirePath);
								}
							}
							
							trsAckTOutAlertGrid_Id_reloadGrid();
							
						}
				});
		}
	}
	
	function trsAckTOutAlertGrid_Id_AlertTypeBtnPrint_Clicked(rowindex)
	{
		var $table  = $("#trsAckTOutAlertGrid_Id_"+alertsPageRef);
		var myObject = $table.jqGrid('getRowData',rowindex);
		trsAckTOutAlertGrid_Id_AlertTypeBtnSinglePrint(myObject);
	}
	
	function trsAckTOutAlertGrid_Id_AlertTypeBtnDismiss_Clicked(rowindex)
	{
		var $table  = $("#trsAckTOutAlertGrid_Id_"+alertsPageRef);
		var myObject = $table.jqGrid('getRowData',rowindex);
		var todoLine=myObject["sTodoDet.TODO_LINE"];
		var todoCode=myObject["sTodoDet.TODO_CODE"];
		var status=myObject["sTodoDet.TODO_STATUS"];
		
		var obj  = {"todoLine" : todoLine, 
				 	"todoCode" : todoCode, 
				 	"status" :status};
		
		$.ajax({url:  jQuery.contextPath+"/path/alerts/TrsAckTOutAlertsGrid_trsAckTOutAlertsAfterDissmiss", type:"post", dataType:"json", data: obj, success: trsAckTOutAlertGrid_Id_reloadGrid});
		
	}

	function trsAckTOutAlertGrid_Id_reloadGrid()
	{
		var $table  = $("#trsAckTOutAlertGrid_Id_"+alertsPageRef);
		//issue 444609 , we need to take the url with it's parameters
		var gridUrl = $table.jqGrid('getGridParam','url');
		
		if(typeof alertEngine != "undefined" && alertEngine != undefined && alertEngine.isLoginAlertEnabled == "true")
		{
			gridUrl = jQuery.contextPath+"/path/alerts/TrsAckTOutAlertsGrid_loadTrsAckTOutAlertsGrid";
			gridUrl += "?isLoginAlertEnabled=true&_pageRef="+alertsPageRef;
		}
		
		var json = {};
		alertGridFirstLoad = true;
		if($("#receive_alert_div"))
		{
			var onAlertReceiveInput = $("#receive_alert_div").find('#onAlertReceive_' + alertsPageRef);
			if($(onAlertReceiveInput))
			{	
				//The flag should be set to false, to avoid closing the popup when the grid becomes empty
				//If the onAlertReceiveInput is set to false, the popup still opened even if the user will dismiss all alerts
				//That means the grid becomes empty.
				$(onAlertReceiveInput).val('false');
			}	
		}
		
		$table.jqGrid('setGridParam', {url : gridUrl, datatype : 'json', postData : json}).trigger("reloadGrid");
	}
	
	/* Login Alert Implementation TP#297149 
	   This function used to build the description details of the login alert*/		
	function trsAckTOutAlertGrid_Id_loginAlertDesc(parameters)
	{
		if(parameters != undefined && parameters != null)
		{
			var detailsParmeters = {
								'alertsParamCO.todoParam':parameters.todoParam,
								'alertsParamCO.progRef':parameters.progRef,
								'alertsParamCO.todoAlert':parameters.todoAlert,
								'alertsParamCO.todoExcepEnglish':parameters.todoExcepEnglish,
								'alertsParamCO.compCode':parameters.compCode,
								'alertsParamCO.branchCode':parameters.branchCode,
								'alertsParamCO.todoCode':parameters.todoCode,
								'alertsParamCO.todoLine':parameters.todoLine,
								'alertsParamCO.appName':parameters.appName
							};
			$.ajax({
				url: jQuery.contextPath + "/path/alerts/AlertsLoginMgnt_loadLoginAlertDetails",
				type:"post",
				dataType:"json",
				data: detailsParmeters,
				success: function(data)
						{
							var todoCode = data["alertsParamCO"].todoCode;
							var todoLine = data["alertsParamCO"].todoLine;
							var alertDescription = data["alertsParamCO"].alertDescription;
							var detailsColor = data["alertsParamCO"].detailsColor;
							trsAckTOutAlertGrid_openTrxDetails(alertDescription,todoCode,todoLine, detailsColor);
						}
				});
		}	
	}
 
	