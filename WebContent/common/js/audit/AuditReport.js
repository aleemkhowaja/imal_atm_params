(function($) {
	auditReport_onDocReady = function() {
		$("#auditActionsGrid_Id").jqGrid('setGridParam', {
			onSelectRow : function(id) {
				$("#auditActionsDetailsGrid_Id").jqGrid("clearGridData", true);
			}
		});
	};
})(jQuery);


/**
 * Method for building the tabs for Label Translation, and Group Translation.....
 * @param {Object} $
 */
function selectTrackChangesTabs(selectedTabId,event,custScrElemProgRef)
{
	var auditTrxNbr_val = $("#auditTrxNbr_" + _pageRef).val();
	if(selectedTabId == "addedTrackedChanges")
	{
	$("#amendmentTrackSelectedGrid").val("A");
	}
	else if (selectedTabId == "deletedTrackedChanges")
	{
	$("#amendmentTrackSelectedGrid").val("D");
	}
	else if (selectedTabId == "updatedTrackedChanges")
	{
	$("#amendmentTrackSelectedGrid").val("U");
	}
	
	var selectedPage = $("#amendmentTrackSelectedGrid").val();
	
	var pData = {};
	pData["progRef"] = _pageRef;
	pData["trxNbr"] = auditTrxNbr_val;
	pData["trackOP"] = selectedPage;
	pData["custPageRef"] = custScrElemProgRef;
	
		var checkLoaded = $('#amendmentTrack'+selectedPage+'GridLoaded').val();
		if ((checkLoaded == null || checkLoaded == ""
				|| checkLoaded == undefined)) {
			$("#trackActionsGrid_Id"+selectedPage)
					.jqGrid(
							'setGridParam',
							{
								'url' : jQuery.contextPath + '/path/audit/audit_loadTrackActions'//?progRef='+_pageRef+'&trxNbr='+auditTrxNbr_val+'&trackOP='+selectedPage
								, postData : pData
							}).trigger("reloadGrid");
		}
		$('#amendmentTrack'+selectedPage+'GridLoaded').val("Loaded");
}

function showTrackReport(progRef, custScrElemProgRef) {
	var selectedGrid = $("#amendmentTrackSelectedGrid").val("U");
	var auditTrxNbr_val = $("#auditTrxNbr_" + progRef).val();
	if (auditTrxNbr_val != null && auditTrxNbr_val != ""
			&& auditTrxNbr_val != "undefined") {
		//Check if the div already exists in HTML documnent, and remove it if exists
		if ($("#trackAmendmentsMain")
				&& $("#trackAmendmentsMain").attr('id') != undefined) {
			$("#trackAmendmentsMain").dialog("destroy");
			$("#trackAmendmentsMain").remove();
		}

		var globalCustElemDiv = $("<div id='trackAmendmentsMain'></div>");
		globalCustElemDiv.css("padding", "0");
		var theBody = $('body');
		globalCustElemDiv.insertAfter(theBody);

		var closeBtnLbl = signature_close_btn;
		var buttons = {};
		var data = {};
		buttons[closeBtnLbl] = function() {
			$(this).dialog("close");
		};

		var _dialogOptions = {
			modal : true,
			title : amended_val_key,
			autoOpen : false,
			show : 'slide',
			position : 'center',
			width : returnMaxWidth(700),
			height : returnMaxHeight(450),
			close : function() {
				var theDialog = $(this);
				theDialog.remove();
			},
			buttons : buttons
		};
		data = {
			progRef : progRef,
			trxNbr : auditTrxNbr_val,
			trackOP : selectedGrid
		};
		var _urlSrc = jQuery.contextPath + '/path/audit/audit_showTrackReport'
		$("#trackAmendmentsMain")
				.load(
						_urlSrc,
						data,
						function(){selectTrackChangesTabs("updatedTrackedChanges","", custScrElemProgRef)
							_showProgressBar(false);
						});
		$("#trackAmendmentsMain").dialog(_dialogOptions);
		$("#trackAmendmentsMain").dialog("open");
	} else {
		_showErrorMsg(msg_noRecordSelectedLabel, info_msg_title);
	}
	$('#amendmentTrackAddGridLoaded').val("Loaded");

}


function showAuditReport(progRef, auditAppName, fromScreen) {
	$(document).ready(
			function() {
				var preCallRes = true;
        		// check if PreCall Func Exists and not Empty in order to call it, so that if false return do not proceed to Autdit Report
        		// usefull in multi select Row, where audit can be viewed fro single row Selection
        		var auditPreCallFunc = $("#auditPreCall_"+progRef).val();
        		if(auditPreCallFunc != null && auditPreCallFunc !== "" && auditPreCallFunc!="undefined")
        		{
        		  preCallRes = eval(auditPreCallFunc);
        		}
        		// check if not false returned from Precall Function if available
        		if(typeof preCallRes == "undefined" || preCallRes == "undefined" || preCallRes)
        		{
    				var _auditTrxProgRef = progRef;
    				////886121 removed checking on customization to handle all screens
    				if(typeof fromScreen!= "undefined" && fromScreen!=null && fromScreen!="" && fromScreen!="null" )
    				{
    					if( fromScreen =="CUST")
    					{
    						_auditTrxProgRef = "SCRSETTCONF";
    					}
    					else
    					{
    						_auditTrxProgRef = fromScreen;
    					}
    				}
        			
					var auditTrxNbr_val = $("#auditTrxNbr_"+_auditTrxProgRef).val();
	            	if(auditTrxNbr_val!=null &&auditTrxNbr_val!="" && auditTrxNbr_val!="undefined")
	            	{
	            			var theDataParam = {progRef:progRef,trxNbr:auditTrxNbr_val};
	            			if(auditAppName !=null && auditAppName!="" && auditAppName!="undefined")
	            			{
	            				theDataParam.appName = auditAppName;
	            			}
		            		$.__overlaybox( {
								height : returnMaxHeight(750),
								//Add width property to comply with jQuery 3.2.0 (project OADM)
								width : returnMaxWidth(680),
								href : jQuery.contextPath
										+ "/path/audit/audit_showAuditReport",
	                            data: theDataParam   
							});
	            		
	            	}else{
	            		_showErrorMsg(msg_noRecordSelectedLabel,info_msg_title);					
					}
	            }
			});
}
function showAuditReportForReports(progRef)
{
	$("#auditTrxNbr_"+progRef).val(progRef);
	showAuditReport(progRef);
}
function showAuditReportDetail(rowindex) {
	$("#auditActionsGrid_Id").jqGrid('resetSelection').jqGrid('setSelection',
			rowindex);// Select the clicked row of hyperlink.
	var appName = $("#auditActionsGrid_Id").jqGrid('getCell', rowindex,
			'APP_NAME');
	var progRef = $("#auditActionsGrid_Id").jqGrid('getCell', rowindex,
			'PROG_REF');
	var trxNbr = $("#auditActionsGrid_Id").jqGrid('getCell', rowindex,
			'TRX_NBR');
	var actionDate = $("#auditActionsGrid_Id").jqGrid('getCell', rowindex,
			'ACTION_DATE');
	var actionDateMs = $("#auditActionsGrid_Id").jqGrid('getCell', rowindex,
			'ACTION_DATE_MS');

	if ($('#gview_auditActionsDetailsGrid_Id').children("div.ui-jqgrid-bdiv")
			.css('display') == 'none') {
		$(".ui-jqgrid-titlebar-close",
				$("#auditActionsDetailsGrid_Id")[0].grid.cDiv).click();
		parent.$.colorbox.resize( {
			width : $('auditReportDiv').width(),
			height : 600
		});
	}
//	var lookupUrl = jQuery.contextPath
//			+ '/path/audit/audit_loadAuditActionDetails?appName=' + appName
//			+ "&progRef=" + progRef + "&trxNbr=" + trxNbr + "&actionDateMs="
//			+ actionDateMs + "&actionDate=" + actionDate;
	var lookupUrl = jQuery.contextPath	+ '/path/audit/audit_loadAuditActionDetails';
	var arr={};
	arr["appName"] = appName;
	arr["progRef"] = progRef;
	arr["trxNbr"] =trxNbr;
	arr["actionDateMs"] = actionDateMs;
	arr["actionDate"] = actionDate;
		
	jQuery("#auditActionsDetailsGrid_Id").jqGrid('setGridParam', {
		url : lookupUrl,
		datatype : 'json',
		postData: arr
	}).trigger("reloadGrid");
}

function actionTypeAuditFormatter(cellValue, options, rowObject) {
	if ((rowObject['ACTION_TYPE_HIDDEN'] == "U") 
			|| (rowObject['ACTION_TYPE_HIDDEN'] == "M") 
			|| (rowObject['ACTION_TYPE_HIDDEN'] == "X") 
			|| (rowObject['ACTION_TYPE_HIDDEN'] == "E")
			|| (rowObject['ACTION_TYPE_HIDDEN'] == "N")
			)
	{
		return '<a href = "javascript:showAuditReportDetail(' + options.rowId
				+ ');">' + cellValue + '</a>';
	}
	else
	{
		return cellValue;
	}
}