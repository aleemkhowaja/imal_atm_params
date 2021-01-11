function showRecordLogs(thePageRef, recordsType) {
	var trxNbr_val = $("#auditTrxNbr_" + thePageRef).val();
	//If audit transaction number is NOT empty/null or the record type is Entity (Entity(T) or Entity log(O)) then open the editor
	//else prompt user to select a record.
	if ((trxNbr_val != null && trxNbr_val != "" && trxNbr_val != "undefined")
			|| (recordsType == "T" || recordsType == "O")) {
		var popupButtons = {};
		var globalCustElemDiv = $("<div id='newRecordLogsDialog'></div>");
		globalCustElemDiv.css("padding", "0");
		var theBody = $('body');
		globalCustElemDiv.insertAfter(theBody);
		
		$("#newRecordLogsDialog").show();
		$("#newRecordLogsDialog").dialog( {
			modal : true,
			title : function() {
				switch(recordsType) {
				    case 'R':
				        return record_lvl_att_key;
				    case 'L':
				        return record_lvl_att_wlog_key;
				    case 'T':
				        return entity_lvl_att_key;
				    case 'O':
				        return entity_lvl_att_wlog_key;
				    default:
				        return record_Logs_Key;
				}},
			autoOpen : true,
			position : 'center',
			width : returnMaxWidth(610),
			height : returnMaxHeight(543),
			close : function() {
//			// Remove the editor
//			$("#recordEditor").cleditor()[0].$area.insertBefore($("#recordEditor").cleditor()[0].$main); // Move the textarea out of the
//			//main div
//			$("#recordEditor").cleditor()[0].$area.removeData("cleditor"); // Remove the cleditor pointer from the
//			//textarea
//			$("#recordEditor").cleditor()[0].$main.remove();// Remove the main div and all children from the DOM
				$("#newRecordLogsDialog").dialog("destroy");
				$("#newRecordLogsDialog").remove();

		
		}
		});
		popupButtons["Save"] = {
			text : saveLabel,
			id : "saveRecordLogs",
			click : function() {
				saveRecordLogs(recordsType)
			}
		}
		popupButtons["Close"] = {
			text : signature_close_btn,
			id : "closeRecordLogs",
			click : function() {
				$("#newRecordLogsDialog").dialog("close");
			}
		}
		popupButtons["Mail"] = {
			text : Send_email_key,
			id : "openMailTo",
			click : function() {
				openMailTo(thePageRef)
			}
		}
		popupButtons["Print"] = {
			text : print_label_trans,
			id : "printContent",
			click : function() {
				
				var printLogEditorDiv = $("<div id='printLogEditor'></div>");
				printLogEditorDiv.css("padding", "0");
				var theBody = $('body');
				printLogEditorDiv.insertAfter(theBody);
				printLogEditorDiv.append($("#recordLogEditor").html());
				printLogEditorDiv.printElement();
				printLogEditorDiv.remove(); 

				setTimeout(function () {
					var printEditorDiv = $("<div id='printEditor'></div>");
					printEditorDiv.css("padding", "0");
					var theBody = $('body');
					printEditorDiv.insertAfter(theBody);
					printEditorDiv.append($("#recordEditor").cleditor()[0].$area
							.val());
					printEditorDiv.printElement();
					printEditorDiv.remove();// TP 428046 removing DIV appended after print.
	            }, 500);
				 
			}
		}
		popupButtons["PrintPreview"] = {
			text : print_preview_key,
			id : "printContent",
			click : function() {

				var printLogEditorDiv = $("<div id='printLogEditor'></div>");
				printLogEditorDiv.css("padding", "0");
				var theBody = $('body');
				printLogEditorDiv.insertAfter(theBody);
				printLogEditorDiv.append($("#recordLogEditor").html());
				printLogEditorDiv.printElement( {
					leaveOpen : true,
					printMode : 'popup'
				});
				printLogEditorDiv.remove();
				


				setTimeout(function () {
					var printEditorDiv = $("<div id='printEditor'></div>");
					printEditorDiv.css("padding", "0");
					var theBody = $('body');
					printEditorDiv.insertAfter(theBody);
					printEditorDiv.append($("#recordEditor").cleditor()[0].$area
							.val());
					printEditorDiv.printElement( {
						leaveOpen : true,
						printMode : 'popup'
					});
					printEditorDiv.remove();  // TP 428046 removing DIV appended after print.
	            }, 500);
				
				
			}
		}
		globalCustElemDiv.dialog('option', 'buttons', popupButtons);
		var recordParams = {};
		if (recordsType == "T" || recordsType == "O") {
			trxNbr_val = "0";
		}
		recordParams["recordSC.trxNbr"] = trxNbr_val;
		recordParams["recordSC.pageRef"] = thePageRef;
		recordParams["recordSC.recordsType"] = recordsType;
		$("#newRecordLogsDialog")
				.load(
						jQuery.contextPath + '/path/recordlogs/RecordLogsMaintAction_loadRecordLogsPage',
						recordParams);
	} else {
		_showErrorMsg(msg_noRecordSelectedLabel, info_msg_title);
	}
	_showProgressBar(false);

}

function saveRecordLogs(recordsType) {
	_showProgressBar(true);
	var iframe = document.getElementById("recordEditor");
	var trxNbr_val = $("#auditTrxNbr_" + _pageRef).val();
	var recordParams = {};
	recordParams["recordSC.theRecord"] = iframe.value;
	//Bug#935100 Submit-FAS-save new record
	var oldValue = iframe.defaultValue;
	/**
	 * history Management
	 * @param {Object} data
	 */
	     var htmlContent = iframe.value.replace(/<br\s*[\/]?>/gi, "\n");
	     if(iframe.value != oldValue ){
	     var dom  = document.createElement("DIV");
	     dom.innerHTML = htmlContent;
	     var textContent = dom.textContent;
	     recordParams["recordSC.attachmentDetails"] = textContent;
	/**
	 * 
	 */
	
	if (typeof _pageRef !== "undefined") {
		recordParams["recordSC.pageRef"] = _pageRef;
	}
	recordParams["recordSC.trxNbr"] = trxNbr_val;
	recordParams["recordSC.recordsType"] = recordsType;
	$.ajax( {
				url : jQuery.contextPath + '/path/recordlogs/RecordLogsMaintAction_saveRecordLogs',
				type : "post",
				dataType : "json",
				data : recordParams,
				success : function(data) {
					_showProgressBar(false);
					if (data["_error"] == null || data["_error"] == ""
							|| data["_error"] == undefined) {
						$("#recordLogEditor").html(data.recordSC.theRecord);
						_showErrorMsg(record_saved_Successfully_key,
								success_msg_title);
						_showProgressBar(false);
					}
				}
			});
	}
	else
	{
	_showProgressBar(false);
	_showErrorMsg(changes_not_available_key, error_msg_title);
	return;
	}
}
function openMailTo(thePageRef) {
	var iframe = document.getElementById("recordEditor");
	var trxNbr_val = $("#auditTrxNbr_" + thePageRef).val();
	var recordParams = {
		_pageRef : thePageRef
	};
	var buttons = {};
    _showProgressBar(true);
	var mySrc = jQuery.contextPath
			+ "/path/recordlogs/RecordLogsListAction_loadRecordUserMailGrid";
	var userMailDivElement = $('<div>', {
		id : "userMailGrid_div_" + thePageRef
	});
	userMailDivElement.css("padding", "0");
	$('body').append(userMailDivElement);
	
	/**
	 * [MarwanMaddah] BUG#237798: Changed Loading Dialog Behavior	 
	 */
	var _dialogOptions = {
					autoOpen : true,
					show : 'slide',
					modal : true,
					title : emails_List_Key,
					position : 'center',
					width : returnMaxWidth(550),
					height : returnMaxHeight(400),
					close : function(ev, ui) {
						$("#userMailGrid_div_" + _pageRef).dialog("destroy");
						$("#userMailGrid_div_" + _pageRef).remove();
					}};
	
	buttons["EMail"] = {
	text : Send_email_key,
	id : "sendTheMail",
	click : function() {
		sendTheMail(thePageRef)}
	};
	buttons["Close"] = {
		text : signature_close_btn,
		id : "closeRecordLogs",
		click : function() {
			$("#userMailGrid_div_" + thePageRef).dialog("close");}
	};
    $("#userMailGrid_div_" + thePageRef).load(mySrc, recordParams,function(){_showProgressBar(false);});
    $("#userMailGrid_div_" + thePageRef).dialog(_dialogOptions);
    $("#userMailGrid_div_" + thePageRef).dialog('option','buttons', buttons);
    $("#userMailGrid_div_" + thePageRef).dialog("open");
}

function sendTheMail(thePageRef) {
	_showProgressBar(true);
	var recordParams = {};
	var theMailsList = $("#selUserMail_" + thePageRef).val();
	if (theMailsList == null || theMailsList == undefined || theMailsList == "") {
		_showErrorMsg(mail_select_key, warning_msg_title);
		_showProgressBar(false);
		return;
	} else {
		recordParams["recordSC.mailTO"] = theMailsList;
	}
	var iframe = document.getElementById("recordEditor");
	recordParams["recordSC.theRecord"] = iframe.value;
	recordParams["recordSC.pageRef"] = thePageRef;
	var theReqURL = jQuery.contextPath + '/path/recordlogs/RecordLogsMaintAction_sendMailTo';
	$.ajax( {
		url : theReqURL,
		type : "post",
		dataType : "json",
		data : recordParams,
		success : function(response) {
			_showProgressBar(false);
			if (response["_error"] == undefined || response["_error"] == null) {
				_showErrorMsg(mail_success_key, success_msg_title);
				_showProgressBar(false);
			}
		}
	});
}

function mailListListLoad() {

	$("#recordUserMailTbl_Id_" + _pageRef).unsubscribe("mailListSelectRowFunc");
	$("#recordUserMailTbl_Id_" + _pageRef).subscribe(
			"mailListSelectRowFunc",
			function(obj) {
				mailListSelectRowFunc(obj.originalEvent.id,
						obj.originalEvent.status);
			});
jQuery("#recordUserMailTbl_Id_" + _pageRef).jqGrid('setGroupHeaders', {
		useColSpanStyle : true,

	});
	$("#recordUserMailTbl_Id_" + _pageRef).jqGrid('setGridParam', {
		loadComplete : mailListLoadCompleteFunc,
		onSelectAll : mailListSelectAllFunc
	});
}

function mailListSelectRowFunc(selectedRowInd, selected) {
	var $table = $("#recordUserMailTbl_Id_" + _pageRef);
	var myObject = $table.jqGrid('getRowData', selectedRowInd);
	var selMail = ($("#selUserMail_" + _pageRef).val() != "") ? eval("("
			+ $("#selUserMail_" + _pageRef).val() + ")") : new Object();

	var mailUserId = myObject["USER_ID"] + "";
	if (selected) {
		selMail[mailUserId] = myObject["REPLY"];
	} else {
		selMail[mailUserId] = undefined;
		$("#all_rows_" + _pageRef).val("0");
		$table.jqGrid('setCellValue', selectedRowInd, "REPLY", "N");
	}
	$("#selUserMail_" + _pageRef).val(JSON.stringify(selMail));
}

function mailListLoadCompleteFunc() {
	var $table = $("#recordUserMailTbl_Id_" + _pageRef);
	var rowNum = $table.jqGrid('getGridParam', 'rowNum');
	var selMail = ($("#selUserMail_" + _pageRef).val() != "") ? eval("("
			+ $("#selUserMail_" + _pageRef).val() + ")") : new Object();
	if (!$.isEmptyObject(selMail)) {
		for (i = 1; i <= rowNum; i++) {
			var myObject = $table.jqGrid('getRowData', i);
			var mailUserId = myObject["USER_ID"] + "";

			if (selMail[mailUserId] != undefined) {
				$table.jqGrid('setSelection', "" + i);
				$table.jqGrid('setCellValue', i, "REPLY", selMail[mailUserId]);
			}
		}
	}
	if ($("#all_rows_" + _pageRef).val() == "1") {
		$("#cb_recordUserMailTbl_Id_" + _pageRef).attr("checked", "1");
	} else {
		$("#cb_recordUserMailTbl_Id_" + _pageRef).removeAttr("checked");
	}
}

function mailListSelectAllFunc(selectedRowInd, selected) {
	$("#load_recordUserMailTbl_Id_" + _pageRef).show();

	var $table = $("#recordUserMailTbl_Id_" + _pageRef);
	if (selected) {
		var totalRow = $table.jqGrid('getGridParam', 'records');
		var rowNum = $table.jqGrid('getGridParam', 'rowNum');

		if (totalRow > rowNum) {
			var gridUrl = jQuery.contextPath
					+ "/path/recordlogs/RecordLogsListAction_returnAllSelectedRow";
			$.ajax( {
				url : gridUrl,
				type : "get",
				dataType : "json",
				success : function(data) {
					$("#selUserMail_" + _pageRef).val(data.allSelectedRow);
					$("#load_recordUserMailTbl_Id_" + _pageRef).hide();
					$("#all_rows_" + _pageRef).val("1");
				}
			});
		} else {
			for (i = 1; i <= selectedRowInd.length; i++) {
				mailListSelectRowFunc(i, true);
			}
			$("#all_rows_" + _pageRef).val("0");
			$("#load_recordUserMailTbl_Id_" + _pageRef).hide();
		}
	} else {
		$("#selUserMail_" + _pageRef).val("");
		$("#all_rows_" + _pageRef).val("0");
		$("#load_recordUserMailTbl_Id_" + _pageRef).hide();
		$table.trigger("reloadGrid");
	}
}

function replyChecked(obj) {
	var $table = $("#recordUserMailTbl_Id_" + _pageRef);
	var rowNum = $table.jqGrid('getGridParam', 'rowNum');
	var selMail = ($("#selUserMail_" + _pageRef).val() != "") ? eval("("
			+ $("#selUserMail_" + _pageRef).val() + ")") : new Object();
	if (!$.isEmptyObject(selMail)) {
		for (i = 1; i <= rowNum; i++) {
			var myObject = $table.jqGrid('getRowData', i);
			var mailUserId = myObject["USER_ID"] + "";

			if (selMail[mailUserId] != undefined) {
				selMail[mailUserId] = myObject["REPLY"];
			}
		}
	}
	$("#selUserMail_" + _pageRef).val(JSON.stringify(selMail));
}