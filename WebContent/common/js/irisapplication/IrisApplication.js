function iris_populateSelectedCif() {

	iris_checkForProgRef();
	var irisCifGrid = $("#irisCifDetailsGridTbl_Id_" + currIrisPageRef);
	var selectedRowId = irisCifGrid.jqGrid('getGridParam', 'selrow');

	var myObject = irisCifGrid.jqGrid('getRowData', selectedRowId);
	var cifNb = myObject["CIF_NO"];
	setInputValue("selectedCif_" + currIrisPageRef, cifNb);
	setInputValue("selectedCifName_" + currIrisPageRef,
			myObject["SHORT_NAME_ENG"]);

	iris_useCIF();

}
function iris_checkForProgRef() {
	if (currIrisPageRef == undefined) {
		currIrisPageRef = _pageRef;
	}
}
function scanIris() {
	if(typeof pathActivexDownloadEnabled !== 'undefined' && pathActivexDownloadEnabled == 'true')
	{	
		try {
			var jsString = PathCtrl.recognizeCifIris();
	
		}
	
		catch (e) {
			_showErrorMsg(AX_IRIS_ERROR_KEY,error_msg_title);
			return;
		}
	
		if (jsString != null && jsString != "" && jsString != "undefined") {
			jsString = JSON.parse(jsString);
		}
		else
		{
			_showErrorMsg(error_IRIS_Enrol_Key, warning_msg_title);
			return;
		}
		iris_checkForProgRef();
		var actionSrc = jQuery.contextPath
				+ "/path/irisapplication/IrisApplicationDetails_scanIris";
		var irisCifGrid = $("#irisCifDetailsGridTbl_Id_" + currIrisPageRef);
		var rowIds = irisCifGrid.jqGrid('getDataIDs');
		if (rowIds.length > 0) {
			irisCifGrid.jqGrid("clearGridData", true);
		}
		//var theForm = $("#irisApplicationMaintForm_").serializeForm();
		$
				.ajax( {
					url : actionSrc,
					type : "post",
					data : jsString,
					dataType : "json",
					success : function(data) {
						if (data.irisApplicationCO.scannedCifs !== null && data.irisApplicationCO.scannedCifs !== undefined) {
							for ( var i = 0; i < data.irisApplicationCO.scannedCifs.length; i++) {
								$("#irisCifDetailsGridTbl_Id_" + currIrisPageRef)
										.jqGrid(
												'addRowData',
												i + 1,
												data.irisApplicationCO.scannedCifs[i]);
							}
							$("#irisId_" + currIrisPageRef).val(
									data.irisApplicationCO.irisId);
						}
					}
				});
	
	}
	else
	{
		_showErrorMsg(activex_disabled_key, warning_msg_title);
	}
}

function iris_searchCIF() {
	iris_checkForProgRef();
	$("#irisCifDetailsGridTbl_Id_" + currIrisPageRef)
			.jqGrid(
					'setGridParam',
					{
						url : jQuery.contextPath
								+ "/path/irisapplication/IrisApplicationDetails_searchCIF",
						page : 1
					});
	$("#irisCifDetailsGridTbl_Id_" + currIrisPageRef).trigger("reloadGrid");

}

function clearScan() {
	iris_checkForProgRef();
	setInputValue("irisId_" + currIrisPageRef, "")
	setInputValue("selectedCif_" + currIrisPageRef, "");
	iris_setChoosenCIf("-", "-");
}

function iris_useCIF() {
	iris_checkForProgRef();
	// reading choosen CI and set it into teh header and http session

	var irisCifGrid = $("#irisCifDetailsGridTbl_Id_" + currIrisPageRef);
	var selectedRowId = irisCifGrid.jqGrid('getGridParam', 'selrow');
	if (selectedRowId != null) {
		var myObject = irisCifGrid.jqGrid('getRowData', selectedRowId);
		var cifNb = myObject["CIF_NO"];
		var cifNam = myObject["SHORT_NAME_ENG"];
		setInputValue("selectedCif_" + currIrisPageRef, cifNb);
		setInputValue("selectedCifName_" + currIrisPageRef, cifNam);
	}

	var cifNb = $("#selectedCif_" + currIrisPageRef).val();
	var cifNam = $("#selectedCifName_" + currIrisPageRef).val();
	iris_setChoosenCIf(cifNb, cifNam);
}

function iris_setChoosenCIf(cifNo, cifName) {

	var currCIFNo = cifNo;
	var currCifNam = cifName;
	if (cifNo !== "") {
		_showProgressBar(true);
		var actionSrc = jQuery.contextPath
				+ "/path/irisapplication/IrisApplicationDetails_assignCIFGlobaly";
		$.ajax( {
			url : actionSrc,
			type : "post",
			dataType : "json",
			data : (currCIFNo === "-") ? "" : "cif_no=" + currCIFNo
					+ "&cif_name=" + currCifNam,
			success : function(data) {
				// set teh selectd CIF into header section after setting succesfully into SEssion
			$("#hdr_scanned_cif_no").text(currCIFNo);
			$("#hdr_scanned_cif_name").text(currCifNam);
			var iconSrc = jQuery.contextPath
					+ "/common/images/icon_person_small.png";
			var iconTooltip = Choose_customer_key;
			if (currCIFNo !== "-") {
				$("#hdr_scanned_cif_no").addClass("red_person");
				iconTooltip = Clear_customer_key;
				iconSrc = jQuery.contextPath
						+ "/common/images/icon_person_small_red.png";
			} else {
				$("#hdr_scanned_cif_no").removeClass("red_person");
			}
			$("#icon_person_id").attr("src", iconSrc);
			$("#anchor_icon_person_id").attr("title", iconTooltip)
			_showProgressBar(false);

			// close the dialog if CIF selected
			if (currCIFNo !== "-") {
				$("#global_cif_scan_div_" + currIrisPageRef).dialog("close");
			}
			
			// temporary for dashboard accounts widget Filter
			if(typeof dashboard !== "undefined")
			{
				var accountsWidget = dashboard.getWidget("TEMP_ACC_CUSTOM");
				if(accountsWidget)
				{
					accountsWidget.refreshContent();
				}
				// if removing session the open the dialog again in case of dashboard
				if (currCIFNo === "-")
				{
					globalOpenCifChoice();
				}
				
			}
		}
		});

	} else {
		_showErrorMsg(msg_noRecordSelectedLabel, info_msg_title)
	}
}