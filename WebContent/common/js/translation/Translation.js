/****
 * Method to show or hide Label Translation grids
 * @param {Object} $
 */
function showGrids(labelGridStyle, groupGridStyleL) {
	document.getElementById("labelTransDivL").style.display = labelGridStyle;
	document.getElementById("groupTransDivL").style.display = groupGridStyleL;
	var refButtonDisplay = "none";
	if(labelGridStyle === "" || groupGridStyleL === "")
	{
		refButtonDisplay = "";
	}
	document.getElementById("lableing_referenceButtonTbl").style.display = refButtonDisplay;
}

function loadLblTransByVal(transVal)
{
	/**
	 * added to escape the spacial characters before adding them to the filter JSON string
	 * Marwan Maddah
	 * @param {Object} keyLblCode
	 * @param {Object} appName
	 * @param {Object} pageProgRef
	 * @param {Object} transVal
	 */
	transVal = transVal.replace(/('|"|{|}|\[|]|:|;)/g, "\\$1");
	loadLblTransConfiguration(null,null,null,transVal);
}

function loadLblTransConfiguration(keyLblCode, appName, pageProgRef, transVal) {

	//Check if the div already exists in HTML documnent, and remove it if exists
	if($("#translationMain") && $("#translationMain").attr('id') != undefined)
	{
		$("#translationMain").dialog("destroy");
		$("#translationMain").remove();
	}
	
	var globalCustElemDiv = $("<div id='translationMain' class='path-common-sceen' ></div>");
	globalCustElemDiv.css("padding", "0");
	var theBody = $('body');
	globalCustElemDiv.insertAfter(theBody);
	var labelParams = {};
	var currPageRef, filter = "";
	
	if (pageProgRef) {
		currPageRef = pageProgRef;
		filter = "{'groupOp':'AND','rules':[{'field':'PROG_REF','op':'eq','data':'"
				+ currPageRef + "'}]}";
	} else {
		if (typeof _pageRef !== "undefined") {
			currPageRef = _pageRef;
		}
	}

	if (currPageRef) {
		labelParams["translationSC.pageRef"] = currPageRef;
	}

	if (appName) {
		labelParams["translationSC.appName"] = appName;
		if (filter == "") {
			filter = "{'groupOp':'AND','rules':[{'field':'APP_NAME','op':'eq','data':'"
					+ appName + "'}]}";
		} else {
			filter = filter.substring(0, filter.length - 2)
					+ ",{'field':'APP_NAME','op':'eq','data':'" + appName
					+ "'}]}"
		}
	}
	if (!(transVal == null || transVal == "" || transVal == undefined)) {
		if (filter == "") {
			filter = "{'groupOp':'AND','rules':[{'field':'prefTrans','op':'eq','data':'"
					+ transVal + "'}]}";
		} else {
			filter = filter.substring(0, filter.length - 2)
					+ ",{'field':'prefTrans','op':'eq','data':'" + transVal
					+ "'}]}"
		}
	}

	if (!(keyLblCode == null || keyLblCode == "" || keyLblCode == undefined)) {
		labelParams["translationSC.loadSelected"] = 1;
		labelParams["translationSC.keyLabelCode"] = keyLblCode;
		filter = "";
	}

	labelParams["translationSC.filters"] = filter;
	
	_showProgressBar(true);
	
	/**
	 *  
	 */
	var saveBtnLbl = saveLabel;
	var closeBtnLbl = signature_close_btn;
	var buttons = {};
	buttons[saveBtnLbl] = function() {
		/* Login Alert Implementation TP#297149 
		 In case the teller is waiting the approval , the save should be disabled*/
		if(disableBtnInLoginAlert())
		{
			return;
		}
		trans_onSaveClicked();
	};
	buttons[closeBtnLbl] = function() {
		/* Login Alert Implementation TP#297149 
		 In case the teller is waiting the approval , the checkDataChanges should be disabled*/
		if(disableBtnInLoginAlert())
		{
			return;
		}	
		checkDataChanges('ALL');
	};
	var _dialogOptions = {
		modal : true,
		title : trans_key,
		autoOpen : false,
		show : 'slide',
		position : 'center',
		width : returnMaxWidth(900),
		height : returnMaxHeight(650),
		close : function() {
			var theDialog = $(this);
			theDialog.remove();
		},
		buttons : buttons
	};
	var _urlSrc = jQuery.contextPath + '/path/Translation/TranslationMaint_loadTransScreen'
	$("#translationMain").load(_urlSrc ,labelParams, function() {
		if (!(keyLblCode == null || keyLblCode == "" || keyLblCode == undefined)) 
		{
			$("#labeling_scr_customTrans").val("custom");
		}
        _showProgressBar(false);
    });
	$("#translationMain").dialog(_dialogOptions);
	$("#translationMain").dialog("open");
	/**
	 * 
	 */	
}

function resetTransGridParams()
{
	/**
	 * Grid url is reset without parameters to re-enable the Grid search options and get all the records
	 */
	$("#labelDefTbl_Id").jqGrid('setGridParam',{'url' : jQuery.contextPath + '/path/translation/TranslationMaint_loadLabelDetailsGrid'});	
}

function loadLblTransDetails() {
	resetTransGridParams();
	var customTrans = $("#labeling_scr_customTrans").val();
	if (customTrans == "custom") {
		var selectedKey = $("#labelDefTbl_Id").jqGrid('getRowData', 1);
		if(!(selectedKey["sysParamKeyLabelVO.APP_NAME"] == null || selectedKey["sysParamKeyLabelVO.APP_NAME"] == "" || selectedKey["sysParamKeyLabelVO.APP_NAME"] == undefined)
				&& !(selectedKey["sysParamKeyLabelVO.PROG_REF"] == null || selectedKey["sysParamKeyLabelVO.PROG_REF"] == "" || selectedKey["sysParamKeyLabelVO.PROG_REF"] == undefined)
				&& !(selectedKey["sysParamKeyLabelVO.KEY_LABEL_CODE"] == null || selectedKey["sysParamKeyLabelVO.KEY_LABEL_CODE"] == "" || selectedKey["sysParamKeyLabelVO.KEY_LABEL_CODE"] == undefined))
		{
			$("#labelDefTbl_Id").jqGrid("setSelection",1, true);
			keyLabelSelected(selectedKey["sysParamKeyLabelVO.APP_NAME"],
				selectedKey["sysParamKeyLabelVO.PROG_REF"],
				selectedKey["sysParamKeyLabelVO.KEY_LABEL_CODE"],
				selectedKey["sysParamKeyLabelVO.KEY_GROUP_ID"]);
		}
	}
}

/**
 * Method for building the tabs for Label Translation, and Group Translation.....
 * @param {Object} $
 */
function tabsShowSelect(selectedTabId,event)
{
	var pageSrc = null;
	var lovPageSrc = null;
	if(selectedTabId == "groupTab2")
	{
		
		var checkLoaded = $('#labeling_scr_groupDefLoaded').val();
		if ((checkLoaded == null || checkLoaded == ""
				|| checkLoaded == undefined)) {
			$("#groupDefTbl_Id")
					.jqGrid(
							'setGridParam',
							{
								'url' : jQuery.contextPath + '/path/translation/TranslationMaint_loadGroupDetailsGrid'
							}).trigger("reloadGrid");
		}
		$('#labeling_scr_groupDefLoaded').val("Loaded");
		$('#labeling_scr_labelDefLoaded').val("NotLoaded");
		$("#labeling_scr_chosenGrid").val("groupTransTbl_IdG");
	}
	if(selectedTabId == "labelTab1")
	{
		$('#labeling_scr_labelDefLoaded').val("Loaded");
		$("#labeling_scr_chosenGrid").val("groupTransTbl_IdL");
	}
	if(selectedTabId == "impExpTab3")
	{
		pageSrc = jQuery.contextPath + '/path/Translation/TranslationMaint_loadImpExp';
	}
	
	var lovAccess = $('#lovAccessRight').val();
	if(lovAccess != null && lovAccess != undefined && lovAccess != 'undefined' && lovAccess != '')
		{
			if(selectedTabId == "lovTransTab4")
			{
				$("#lovTypeTbl_Id")
					.jqGrid(
							'setGridParam',
							{
								'url' : jQuery.contextPath + '/path/translation/TranslationMaint_loadLOVTypesGrid'
							}).trigger("reloadGrid");
			}
		}
	
	if(pageSrc!=null)
	{
		var checkImpLoad = $('#labeling_scr_impExpLoaded').val();
		if (checkImpLoad == null || checkImpLoad == "" || checkImpLoad == undefined) {
			_showProgressBar(true);
			$.ajax( {
				url : jQuery.contextPath + '/path/Translation/TranslationMaint_loadImpExp',
				type : "post",
				success : function(response) {
				if (response["_error"] == undefined	|| response["_error"] == null) {
					$("#impExpTab-3_content").html(response);
					impExpSelectChange();
					 $("#lookuptxt_PageRef_Labeling").required(false);
					 makeElementReadonly("lookuptxt_PageRef_Labeling", true);
					$('#labeling_scr_impExpLoaded').val("Loaded");
					_showProgressBar(false);
				}
			}
			});
		}
	}
	if(lovPageSrc!=null)
	{
		var checkLOVLoad = $('#labeling_scr_LOVLoaded').val();
		if (checkLOVLoad == null || checkLOVLoad == "" || checkLOVLoad == undefined) {
			_showProgressBar(true);
			$.ajax( {
				url : jQuery.contextPath + '/path/Translation/TranslationMaint_loadLOVTypeList',
				type : "post",
				success : function(response) {
				if (response["_error"] == undefined	|| response["_error"] == null) {
					$("#lovTransTab-4_content").html(response);
					
					 $("#lookuptxt_PageRef_Labeling").required(false);
					 
					 makeElementReadonly("lookuptxt_PageRef_Labeling", true);
					$('#labeling_scr_LOVLoaded').val("Loaded");
					_showProgressBar(false);
				}
			}
			});
		}
	}
}

function transGridRowSelect(rowObj)
{
	
	var theTransTbl =	$("#"+$("#labeling_scr_chosenGrid").val());
	var selectedRowInd = rowObj.originalEvent.id
	if(selectedRowInd.indexOf("new_") < 0) // not new row  should be non editable
	{
		theTransTbl.jqGrid('setCellReadOnly', selectedRowInd, "langDesc", "true");
	}
}

function keyLabelSelected(appName, pageRef, keyLabelCode, keyLabelGroupId) {
	if ($("#transLabelFormL").hasChanges() || $("#transGroupFormL").hasChanges()) {
		_showConfirmMsg(changes_made_confirm_msg, confirm_msg_title, function(
				yesNo) {
			if (yesNo) {
				$("#transLabelFormL").clearChanges();
				$("#transGroupFormL").clearChanges();
				keyLabelChecked(appName, pageRef, keyLabelCode, keyLabelGroupId);
			} else {
				return;
			}
		});
	} else {
		keyLabelChecked(appName, pageRef, keyLabelCode, keyLabelGroupId);
	}
}

function keyLabelChecked(appName, pageRef, keyLabelCode, keyLabelGroupId) {
	if ((keyLabelGroupId == null || keyLabelGroupId == "" || keyLabelGroupId == undefined)
			&& (keyLabelCode == null || keyLabelCode == "" || keyLabelCode == undefined)) {
		var selectedRowId = $("#labelDefTbl_Id").jqGrid('getGridParam',
				'selrow');
		var selectedKeyLabel = $("#labelDefTbl_Id").jqGrid('getRowData',
				selectedRowId);
		keyLabelCode = selectedKeyLabel["sysParamKeyLabelVO.KEY_LABEL_CODE"]
		keyLabelGroupId = selectedKeyLabel["sysParamKeyLabelVO.KEY_GROUP_ID"]
		pageRef = selectedKeyLabel["sysParamKeyLabelVO.PROG_REF"]
		appName = selectedKeyLabel["sysParamKeyLabelVO.APP_NAME"]
	}

	$("#transAppName").val(appName)
	$("#transPageRef").val(pageRef)
	$("#transKeyLabelCode").val(keyLabelCode)
	$("#groupKeyGroupIDL").val(keyLabelGroupId)

	var selections = {
		"keyLabelCode" : keyLabelCode,
		"pageRef" : pageRef,
		"appName" : appName
	};

	if (keyLabelGroupId == null || keyLabelGroupId == ""
			|| keyLabelGroupId == undefined) {
		$("#labelTransTbl_IdL")
				.jqGrid(
						'setGridParam',
						{
							'url' : jQuery.contextPath + '/path/translation/TranslationMaint_loadLabelTranslationGrid',
							postData : selections,
							mtype : "POST"
						}).trigger("reloadGrid");
		showGrids('', 'none');
		$("#labeling_scr_chosenGrid").val("labelTransTbl_IdL");
	} else {
		selections = {
			"keyGroupID" : keyLabelGroupId,
			"pageRef" : pageRef,
			"appName" : appName
		};
		$("#groupTransTbl_IdL")
				.jqGrid(
						'setGridParam',
						{
							'url' : jQuery.contextPath + '/path/translation/TranslationMaint_loadGroupTranslationGrid',
							postData : selections,
							mtype : "POST"
						}).trigger("reloadGrid");
		showGrids('none', '');
		$("#labeling_scr_chosenGrid").val("groupTransTbl_IdL");
	}

}

//check if translation grids are changed and prompt the user to save or cancel
function checkDataChanges(formID) {

	if (formID == 'ALL') {
		if ($("#transGroupFormG").hasChanges()
				|| $("#transGroupFormL").hasChanges()
				|| $("#transLabelFormL").hasChanges()) {
			_showConfirmMsg(changes_made_confirm_msg, confirm_msg_title,
					function(yesNo) {
						if (yesNo) {
							$("#translationMain").dialog("close");
						} else {
							return;
						}
					});
		} else {
			$("#translationMain").dialog("close");
		}
	}
}

function keyGroupSelected(keyGroupId) {
	if ($("#transGroupFormG").hasChanges()) {
		_showConfirmMsg(changes_made_confirm_msg, confirm_msg_title, function(
				yesNo) {
			if (yesNo) {
				$("#transGroupFormG").clearChanges();
				keyGroupChecked(keyGroupId);
			} else {
				return;
			}
		});
	} else {
		keyGroupChecked(keyGroupId);
	}
}

function keyGroupChecked(keyGroupId)
{
	if (keyGroupId == null || keyGroupId == ""
								|| keyGroupId == undefined) {
							var selectedRowId = $("#groupDefTbl_Id").jqGrid(
									'getGridParam', 'selrow');
							var selectedKeyGroup = $("#groupDefTbl_Id").jqGrid(
									'getRowData', selectedRowId);

							keyGroupId = selectedKeyGroup["sysParamKeyGroupVO.KEY_GROUP_ID"]
						}

						$("#groupKeyGroupIDG").val(keyGroupId)

						if (!(keyGroupId == null || keyGroupId == "" || keyGroupId == undefined)) {

							$("#groupTransTbl_IdG")
									.jqGrid(
											'setGridParam',
											{
												'url' : jQuery.contextPath
														+ '/path/translation/TranslationMaint_loadGroupTranslationGrid?translationSC.keyGroupID='
														+ keyGroupId
											}).trigger("reloadGrid");
						}
						document.getElementById("groupTransDivG").style.display = '';
						$("#labeling_scr_chosenGrid").val("groupTransTbl_IdG");
}

function onNewKeyLabelClicked() {
	_showProgressBar(true);

	var popupButtons = {};
	var globalCustElemDiv = $("<div id='newKeyLabelDialog'></div>");
	globalCustElemDiv.css("padding", "0");
	var theBody = $('body');
	globalCustElemDiv.insertAfter(theBody);
	var labelParams = {};

	$.ajax( {
				url : jQuery.contextPath + '/path/TranslationMaint_newKeyLabelScreen',
				type : "post",
				data : labelParams,
				success : function(response) {
					_showProgressBar(false);
					if (response["_error"] == undefined
							|| response["_error"] == null) {
						globalCustElemDiv.html(response)
						globalCustElemDiv.dialog( {
							modal : true,
							title : add_key_lbl_key,
							autoOpen : false,
							show : 'slide',
							position : 'center',
							width : returnMaxWidth(420),
							height : returnMaxHeight(250),
							close : function() {
								var theDialog = $(this);
								theDialog.remove();
							}
						});
						popupButtons["Save"] = {
							text : saveLabel,
							id : "saveNewKeyLabel",
							click : saveNewKeyLabel,
						}
						globalCustElemDiv.dialog('option', 'buttons',
								popupButtons);

						globalCustElemDiv.dialog("open");
					}
				}
			});

}

function saveNewKeyLabel() {

	_showProgressBar(true);
	if ($("#newKeyLabelForm").hasChanges()) {
		var lkpPgRef = $("#lookuptxt_PageRef_Lkp").val();
		var kLblCode = $("#KeyLabelCode").val();
		var kLblDesc = $("#KeyLabelDesc").val();
		
		if((lkpPgRef == null || lkpPgRef == "" || lkpPgRef == undefined)||
			(kLblCode == null || kLblCode == "" || kLblCode == undefined)||
			(kLblDesc == null || kLblDesc == "" || kLblDesc == undefined))
			{
			_showProgressBar(false);
			_showErrorMsg(trans_mand_key, error_msg_title);
			return;
			}
		else
			{
		$.ajax( {
			url : jQuery.contextPath + '/path/TranslationMaint_saveNewKeyLabel',
			type : "post",
			dataType : "json",
			data : $("#newKeyLabelForm")
					.serializeForm(),
			success : function(data) {
				_showProgressBar(false);
				if (data["_error"] == null || data["_error"] == "" || data["_error"] == undefined) {
					
				// not sent as post in order to be able to reset the url after refreshing the grid	
				var selections = 
						"?loadSelected=1"+
						"&appName="+ data.translationCO.sysParamKeyLabelVO.APP_NAME+
						"&pageRef="+ data.translationCO.sysParamKeyLabelVO.PROG_REF+
						"&keyLabelCode="+ data.translationCO.sysParamKeyLabelVO.KEY_LABEL_CODE;


				$("#labelDefTbl_Id").jqGrid('setGridParam',
											{'url' : jQuery.contextPath + '/path/translation/TranslationMaint_loadLabelDetailsGrid'+selections
											}).trigger("reloadGrid");
				
				//Grid url is reset without parameters to re-enable the Grid search options and get all the records
				$("#labelDefTbl_Id").jqGrid('setGridParam',
											{'url' : jQuery.contextPath + '/path/translation/TranslationMaint_loadLabelDetailsGrid'
											});
					_showErrorMsg(
							record_saved_Successfully_key,
							success_msg_title);
					//call the function to open the translation grid for the new row
					keyLabelSelected(
							data.translationCO.sysParamKeyLabelVO.APP_NAME,
							data.translationCO.sysParamKeyLabelVO.PROG_REF,
							data.translationCO.sysParamKeyLabelVO.KEY_LABEL_CODE,
							data.translationCO.sysParamKeyLabelVO.KEY_GROUP_ID);
					$("#newKeyLabelDialog")
							.dialog("close");
				}
			}
		});
		}
	}
	else
	{
	_showProgressBar(false);
	_showErrorMsg(changes_not_available_key, error_msg_title);
	return;
	}
}
//The iMAL global checkbox validation function
function globalRefChecked()
{	
	var theCheckBox = $("#GlobalRef");
	var isCheckBoxChked = theCheckBox.is(":checked");
	var theValue = "", theDescValue = "", isRedOnl = false;
	var theAppValue = "";
 	if (isCheckBoxChked)
	{
		theValue = "ROOT";
		theDescValue = ROOT_KEY;
		isRedOnl = true;
		theAppValue = "IMAL";
	}
 // check if iMAL global is Checked then set Page ref to "ROOT" and Disable it
	$("#lookuptxt_PageRef_Lkp").val(theValue);
	$("#PROG_DESC").val(theDescValue);
	makeElementReadonly("lookuptxt_PageRef_Lkp", isRedOnl);
	// make readonly the application Choice
	if($("#lookuptxt_newLblApp_Labeling")[0])
	{
		$("#lookuptxt_newLblApp_Labeling").val(theAppValue);
		$("#newLblApp_appDesc").val(theAppValue);
		makeElementReadonly("lookuptxt_newLblApp_Labeling", isRedOnl);
	}
}

//The Export/Import checkbox validation function
function exportPageRefChecked()
{	
	var exportTypeValue  = $("#allPageRef").val();
	var spProgRefMandatory = false, spProgRefReadOnly = false, spProgRefVisible = false;
	var spLabelKeyMandatory = false, spLabelKeyReadOnly = false, spLabelKeyVisible = false;
	var spExpNoRepMandatory = false, spExpNoRepReadOnly = false, spExpNoRepVisible = false;
	var spProgRefValue = null,spLabelKeyValue = null, spExpNoRepValue = null;
	// check if iMAL Global is selected then prog ref need to be kept readonly
	var imalGlblChecked = $("input:radio[id^=selectedApp]:checked").val() == "1";
	if (exportTypeValue==="0" /*|| imalGlblChecked*/)
	{
		
        spProgRefMandatory = false;
        spProgRefReadOnly  = false;
        spProgRefVisible   = false;
        spProgRefValue     = "";
        
        spLabelKeyMandatory = false;
        spLabelKeyReadOnly  = false;
        spLabelKeyVisible   = false;
        spLabelKeyValue     = "";
        
        spExpNoRepMandatory = false;
        spExpNoRepReadOnly = false;
        spExpNoRepVisible = true;
        spExpNoRepValue = "false";
	}
	if(exportTypeValue==="1")
	{
        spProgRefMandatory = false;
        spProgRefReadOnly  = false;
        spProgRefVisible   = false;
        spLabelKeyValue    = "";
        
        spLabelKeyMandatory = true;
        spLabelKeyReadOnly  = false;
        spLabelKeyVisible   = true;

        spExpNoRepMandatory = false;
        spExpNoRepReadOnly = true;
        spExpNoRepVisible = true;
        spExpNoRepValue = "false";
	}
	if(exportTypeValue==="2")
	{
        spProgRefMandatory = !imalGlblChecked;
        spProgRefReadOnly  = imalGlblChecked;
        spProgRefVisible   = true;
        if(imalGlblChecked)
        {        	
           spProgRefValue     = 'ROOT';
        }
        
        spLabelKeyMandatory = false;
        spLabelKeyReadOnly  = false;
        spLabelKeyVisible   = false;
        spLabelKeyValue     = "";
        
        spExpNoRepMandatory = false;
        spExpNoRepReadOnly = true;
        spExpNoRepVisible = true;
        spExpNoRepValue = "false";
	}
	
	var addElts = {
			lookuptxt_specificKey_Labeling : {
				IS_VISIBLE : spLabelKeyVisible,
				IS_MANDATORY : spLabelKeyMandatory,
				IS_READONLY : spLabelKeyReadOnly,
				value : spLabelKeyValue
			}
			,lookuptxt_PageRef_Labeling:{
				IS_MANDATORY : spProgRefMandatory,
				IS_READONLY :spProgRefReadOnly,
				IS_VISIBLE : spProgRefVisible,
				value      : spProgRefValue
				}
			,labeling_KEY_LABEL_DESC : {
				IS_VISIBLE : spLabelKeyVisible,
				IS_MANDATORY : false,
				IS_READONLY : true,
				value : spLabelKeyValue
			}
			,Labeling_PROG_DESC:{
				IS_MANDATORY : false,
				IS_READONLY :true,
				IS_VISIBLE : spProgRefVisible,
				value:spProgRefValue
			}
			,exportTransWithoutReports:{
				IS_MANDATORY : false,
				IS_READONLY :spExpNoRepReadOnly,
				IS_VISIBLE : spExpNoRepVisible,
				value:spExpNoRepValue
			}
		};
	manageDynamicDisplay("lookuptxt_specificKey_Labeling", addElts,"lookuptxt_specificKey_Labeling");
	manageDynamicDisplay("lookuptxt_PageRef_Labeling", addElts,"lookuptxt_PageRef_Labeling");
	manageDynamicDisplay("labeling_KEY_LABEL_DESC", addElts,"labeling_KEY_LABEL_DESC");
	manageDynamicDisplay("Labeling_PROG_DESC", addElts,"Labeling_PROG_DESC");
	manageDynamicDisplay("exportTransWithoutReports", addElts,"exportTransWithoutReports");

}

function onNewKeyGroupClicked() {

	var popupButtons = {};
	var globalCustElemDiv = $("<div id='newKeyGroupDialog'></div>");
	globalCustElemDiv.css("padding", "0");
	var theBody = $('body');
	globalCustElemDiv.insertAfter(theBody);
	var labelParams = {};

	$
			.ajax( {
				url : jQuery.contextPath + '/path/TranslationMaint_newKeyGroupScreen',
				type : "post",
				data : labelParams,
				success : function(response) {
					_showProgressBar(false);
					if (response["_error"] == undefined
							|| response["_error"] == null) {
						globalCustElemDiv.html(response)
						globalCustElemDiv.dialog( {
							modal : true,
							title : add_key_grp_key,
							autoOpen : false,
							show : 'slide',
							position : 'center',
							width : '240',
							height : '140',
							close : function() {
								var theDialog = $(this);
								theDialog.remove();
							}
						});
						popupButtons["Save"] = {
							text : saveLabel,
							id : "saveNewKeyGroup",
							click : saveNewKeyGroup
						}
						globalCustElemDiv.dialog('option', 'buttons',
								popupButtons);

						globalCustElemDiv.dialog("open");
					}
				}
			});

}

function saveNewKeyGroup() {

	_showProgressBar(true);
	if ($("#newKeyGroupForm").hasChanges()) {
		var kGrpDesc = $("#KeyGroupDesc").val();
		
		if(kGrpDesc == null || kGrpDesc == "" || kGrpDesc == undefined)
		{
		_showProgressBar(false);
		_showErrorMsg(trans_mand_key, error_msg_title);
		return;
		}

	$.ajax( {
		url : jQuery.contextPath + '/path/TranslationMaint_saveNewKeyGroup',
		type : "post",
		dataType : "json",
		data : $("#newKeyGroupForm")
				.serializeForm(),
		success : function(data) {
			_showProgressBar(false);
			if (data["_error"] == null || data["_error"] == "" || data["_error"] == undefined) {
				
			var selections = "?filters={'groupOp':'AND','rules':[{'field':'KEY_GROUP_ID','op':'eq','data':"+ data.translationCO.sysParamKeyGroupVO.KEY_GROUP_ID+"}]}";
				$("#groupDefTbl_Id").jqGrid('setGridParam',
											{'url' : jQuery.contextPath + '/path/translation/TranslationMaint_loadGroupDetailsGrid'+selections,
											}).trigger("reloadGrid");
				//Grid url is reset without parameters to re-enable the Grid search options and get all the records
				$("#groupDefTbl_Id").jqGrid('setGridParam',
											{'url' : jQuery.contextPath + '/path/translation/TranslationMaint_loadGroupDetailsGrid',
											});
				_showErrorMsg(
						record_saved_Successfully_key,
						success_msg_title);
				//call the function to open the translation grid for the new row
				keyGroupSelected(data.translationCO.sysParamKeyGroupVO.KEY_GROUP_ID);
				$("#newKeyGroupDialog")
						.dialog("close");
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

function trans_onSaveClicked() {
	var lovAccess = $('#lovAccessRight').val();
	var allData = {
	
	groupTransTbl_IdL :{
		gridID : "groupTransTbl_IdL",
		hdGridID : "labelDefTbl_Id",
		changes : $("#transGroupFormL").hasChanges(),
		gridUPD : "groupGridUpdL",
		theForm : $("#transGroupFormL"),
		actionSrc : jQuery.contextPath+ "/path/TranslationMaint_saveGroupTrans.action"
	}, groupTransTbl_IdG : {
		gridID : "groupTransTbl_IdG",
		hdGridID : "groupDefTbl_Id",
		changes : $("#transGroupFormG").hasChanges(),
		gridUPD : "groupGridUpdG",
		theForm : $("#transGroupFormG"),
		actionSrc : jQuery.contextPath + "/path/TranslationMaint_saveGroupTrans.action"
	},
	labelTransTbl_IdL: {
		gridID : "labelTransTbl_IdL",
		hdGridID : "labelDefTbl_Id",
		changes : $("#transLabelFormL").hasChanges(),
		gridUPD : "transGridUpd",
		theForm : $("#transLabelFormL"),
		actionSrc : jQuery.contextPath+ "/path/TranslationMaint_saveLabelTrans.action"
	},
	depTransGrid : "N"
	}
	
	if(lovAccess != null && lovAccess != undefined && lovAccess != 'undefined' && lovAccess != '')
	{
		allData["lovTransTbl_Id"]= {
		gridID : "lovTransTbl_Id",
		hdGridID : "lovTypeTbl_Id",
		changes : checkLovFormChanges(),
		gridUPD : "lovGridUpd",
		theForm : $("#lovTransForm"),
		actionSrc : jQuery.contextPath+ "/path/TranslationMaint_saveLOVTrans.action"
		};
	}
	checkDependentLabels(allData);
	
}

function checkLovFormChanges()
{
	var lovAccess = $('#lovAccessRight').val();
	if(lovAccess != null && lovAccess !=="")
		{
		return $("#lovTransForm").hasChanges();
		}
	else
		{
		return false;
		}
}

function checkDependentLabels(allData)
{
	var shown = "false";
		if (allData.groupTransTbl_IdG.changes == 'true' || allData.groupTransTbl_IdG.changes == true)
		{
			checkActionDependentLabels(allData, "G");
			allData.groupTransTbl_IdG.changes = "false";
		}
			if (allData.groupTransTbl_IdL.changes == 'true' || allData.groupTransTbl_IdL.changes == true)
			{				
				checkActionDependentLabels(allData, "L");
				allData.groupTransTbl_IdL.changes = "false";
			}
			if (allData.labelTransTbl_IdL.changes == 'true' || allData.labelTransTbl_IdL.changes == true)
			{
				saveTransDet(allData.labelTransTbl_IdL, shown);
				allData.labelTransTbl_IdL.changes = "false";
				shown = "true";
			}
			if(allData.lovTransTbl_Id != null && allData.lovTransTbl_Id != undefined && allData.lovTransTbl_Id != 'undefined' && allData.lovTransTbl_Id != '')
			{
				if (allData.lovTransTbl_Id.changes == 'true' || allData.lovTransTbl_Id.changes == true)
				{
					saveLOVTransDet(allData.lovTransTbl_Id, shown);
					allData.lovTransTbl_Id.changes = "false";
					shown = "true";
				}
			}
}

function checkActionDependentLabels(allData, depTransGrid)
{
	var shown = "false";
	var selectedRowId;
	var selectedKeyGroup;
	var labelParams = {};
	var groupDesc;
	_showProgressBar(true);
	
	if(depTransGrid == "G")
	{
		selectedRowId = $("#"+allData.groupTransTbl_IdG.hdGridID).jqGrid('getGridParam', 'selrow');
		selectedKeyGroup = $("#"+allData.groupTransTbl_IdG.hdGridID).jqGrid('getRowData', selectedRowId);
		labelParams["translationSC.keyGroupID"] = selectedKeyGroup["sysParamKeyGroupVO.KEY_GROUP_ID"];
		groupDesc = selectedKeyGroup["prefTrans"];
	}
	else if(depTransGrid == "L")
	{
		selectedRowId = $("#"+allData.groupTransTbl_IdL.hdGridID).jqGrid('getGridParam', 'selrow');
		selectedKeyGroup = $("#"+allData.groupTransTbl_IdL.hdGridID).jqGrid('getRowData', selectedRowId);
		labelParams["translationSC.keyGroupID"] = selectedKeyGroup["sysParamKeyLabelVO.KEY_GROUP_ID"];
		groupDesc = selectedKeyGroup["prefTrans"];
	}

	$.ajax({
		url : jQuery.contextPath + '/path/TranslationMaint_returnGrpDependent',
		type : "post",
		data : labelParams,
		success : function(data) {
		if (data["_error"] == undefined || data["_error"] == null)
		{
		_showProgressBar(false);
			if(data.translationSC.transDeps == "" || data.translationSC.transDeps == "undefined" || data.translationSC.transDeps == null)
			{
				if(depTransGrid == "G")
				{
					saveTransDet(allData.groupTransTbl_IdG, shown);
				}
				else if(depTransGrid == "L")
				{
					saveTransDet(allData.groupTransTbl_IdL, shown);
				}
				shown = "true";
			}
			else
			{
				_showConfirmMsg(
					(typeof global_dep_key != undefined) ? groupDesc+ " : " + global_dep_key + "\n"
					+ data.translationSC.transDeps
					: "Do you want to proceed (The Global Label have the following Key Label Codes Associated with it)?"
					+ "\n"+ data.translationSC.transDeps,
				confirm_msg_title,
				function(yesNo) {
					if (yesNo) {
						if(depTransGrid == "G")
						{
							saveTransDet(allData.groupTransTbl_IdG, shown);
						}
						else if(depTransGrid == "L")
						{
							saveTransDet(allData.groupTransTbl_IdL, shown);
						}
						shown = "true";
					}
				}, "yesNo",'','',returnMaxWidth(750));
			}
		}
		else
		{
			_showProgressBar(false);
		}
	}
	});
}
function saveLOVTransDet(allData, shown)
{
	_showProgressBar(true);
	var currGrid, theTransTbl, result;
	currGrid = allData.gridID;
	var lovRowId = $("#lovTypeTbl_Id").jqGrid('getGridParam', 'selrow');
	var lovTypeID = $("#lovTypeTbl_Id").jqGrid('getRowData', lovRowId);
	
	
	theTransTbl = $("#" + allData.gridID);
	
	if (theTransTbl.length > 0)
	{
		//getChangedRowData with false means DO NOT trim input data
		var jsonTransUpdates = theTransTbl.jqGrid('getChangedTrimRowData',false);
		
		$("#" + allData.gridUPD).val(jsonTransUpdates);
	}
	
	
	reload = $("#" + allData.hdGridID);
	allData.theForm = allData.theForm.serializeForm();
		
	$.ajax(
		{
			url : allData.actionSrc,
			type : "post",
			dataType : "json",
			data : allData.theForm,
			success : function(data)
			{
				if (typeof data["_error"] == "undefined" || data["_error"] == null)
				{
					theTransTbl.trigger("reloadGrid");
					_showProgressBar(false);
					data = null;
						$("#lovTransForm").clearChanges();
					if(!(shown == "true"))
					{
						_showErrorMsg(record_was_Updated_Successfully_key,info_msg_title);
					}
					
				}
				else // there is error
				{
					theTransTbl.trigger("reloadGrid");
					result = "false";
					_showProgressBar(false);
					_showErrorMsg(invalid_grid_id, warning_msg_title);
				}
			}
		}
	);
}
function saveTransDet(allData, shown)
{
	var result = "true", reload, currGrid, theTransTbl;
	var lblGrpID, grpGRPID, validGrpID = "false";
	_showProgressBar(true);
	
	currGrid = allData.gridID;
	var labelRowId = $("#labelDefTbl_Id").jqGrid('getGridParam', 'selrow');
	var sysParamKeyLabel = $("#labelDefTbl_Id").jqGrid('getRowData', labelRowId);
	
	if(currGrid == 'groupTransTbl_IdL')
	{
		$("#groupAppName").val(sysParamKeyLabel["sysParamKeyLabelVO.APP_NAME"])
		$("#groupPageRef").val(sysParamKeyLabel["sysParamKeyLabelVO.PROG_REF"])
	}
	
	if($('#labeling_scr_labelDefLoaded').val() == "NotLoaded")
	{
		lblGrpID = sysParamKeyLabel["sysParamKeyLabelVO.KEY_GROUP_ID"];
		
		var groupRowId = $("#groupDefTbl_Id").jqGrid('getGridParam', 'selrow');
		var sysParamKeyGroup = $("#groupDefTbl_Id").jqGrid('getRowData', groupRowId);
		grpGRPID = sysParamKeyGroup["sysParamKeyGroupVO.KEY_GROUP_ID"];
		
		if(lblGrpID == grpGRPID)
		{
			validGrpID = "true";
		}
	}
	theTransTbl = $("#" + allData.gridID);
	
	if (theTransTbl.length > 0)
	{
		//getChangedRowData with false means DO NOT trim input data
		var jsonTransUpdates = theTransTbl.jqGrid('getChangedTrimRowData',false);
		
		$("#" + allData.gridUPD).val(jsonTransUpdates);
	}
	
	var rows = theTransTbl.jqGrid('getDataIDs');
	var rowsLen = rows.length;
	
	for (var j = 0; j < rowsLen; j++)
	{
		var myObject = theTransTbl.jqGrid('getRowData', rows[j]);
		
		if(currGrid == 'labelTransTbl_IdL')
		{
			var rowLanCode = myObject["sysParamKeyLabelTransVO.LANG_CODE"];
			
			if (rowLanCode == "-1" || rowLanCode == "" || rowLanCode == "undefined" || rowLanCode == null)
			{
				_showErrorMsg(invalid_lang_key, error_msg_title);
				_showProgressBar(false);
				return "invalid";
			}
		}
		else
		{
			var rowLanCode = myObject["sysParamKeyGroupTransVO.LANG_CODE"];
			if (rowLanCode == "-1" || rowLanCode == "" || rowLanCode == "undefined" || rowLanCode == null)
			{
				_showErrorMsg(invalid_lang_key, error_msg_title);
				_showProgressBar(false);
				return "invalid";
			}
		}
	}
	
	reload = $("#" + allData.hdGridID);
	allData.theForm = allData.theForm.serializeForm();
	
	$.ajax(
		{
			url : allData.actionSrc,
			type : "post",
			dataType : "json",
			data : allData.theForm,
			success : function(data)
			{
				if (typeof data["_error"] == "undefined" || data["_error"] == null)
				{
					var selectedRowId = reload.jqGrid('getGridParam', 'selrow');
					reload.jqGrid('setCell',selectedRowId, "prefTrans", data.translationCO.prefTrans);
					theTransTbl.trigger("reloadGrid");
					if(currGrid == "groupTransTbl_IdL")
					{
						$("#groupDefTbl_Id").trigger("reloadGrid");
						if(validGrpID == "true")
						{
							$("#groupTransTbl_IdG").trigger("reloadGrid");
						}
						$("#transGroupFormL").clearChanges();
					}
					else if(currGrid == "groupTransTbl_IdG")
					{
						$("#labelDefTbl_Id").trigger("reloadGrid");
						if(validGrpID == "true")
						{
							$("#groupTransTbl_IdL").trigger("reloadGrid");
						}
						$("#transGroupFormG").clearChanges();
					}
					else if(currGrid == "labelTransTbl_IdL")
					{
						selectedRowId = reload.jqGrid('getGridParam', 'selrow');
						var selectedKeyLabel = reload.jqGrid('getRowData', selectedRowId);
						if(data.translationCO.prefTrans == null || data.translationCO.prefTrans == "" || data.translationCO.prefTrans == undefined)
						{
							reload.jqGrid('setCell',selectedRowId, "prefTrans", selectedKeyLabel["sysParamKeyLabelVO.KEY_LABEL_DESC"]);
						}
						else
						{
							reload.jqGrid('setCell',selectedRowId, "prefTrans", data.translationCO.prefTrans);
						}
						theTransTbl.trigger("reloadGrid");
						$("#labelTransTbl_IdL").trigger("reloadGrid");
						$("#transLabelFormL").clearChanges();
					}
					_showProgressBar(false);
					data = null;
					if(!(shown == "true"))
					{
						_showErrorMsg(record_was_Updated_Successfully_key,info_msg_title);
					}
					
				}
				else // there is error
				{
					theTransTbl.trigger("reloadGrid");
					result = "false";
					_showProgressBar(false);
					_showErrorMsg(invalid_grid_id, warning_msg_title);
				}
			}
		}
	);
	return result;
}

function onNewGroupTransClicked() {
	var theTransTbl = $("#"+$("#labeling_scr_chosenGrid").val());
	// add new row
	var rId = theTransTbl.jqGrid('addInlineRow', {});
}

function onNewLabelTransClicked() {

	var theTransTbl = $("#labelTransTbl_IdL");
	// add new row
	var rId = theTransTbl.jqGrid('addInlineRow', {});
}

function deleteKeyGroupClicked() {

	var selectedRowId = $("#groupDefTbl_Id").jqGrid('getGridParam', 'selrow');
	var selectedKeyGroup = $("#groupDefTbl_Id").jqGrid('getRowData',
			selectedRowId);
	var labelParams = {};
	labelParams["translationSC.keyGroupID"] = selectedKeyGroup["sysParamKeyGroupVO.KEY_GROUP_ID"]
					$
							.ajax( {
								url : jQuery.contextPath + '/path/TranslationMaint_returnGrpDependent',
								type : "post",
								data : labelParams,
								success : function(data) {
									if (data["_error"] == undefined
											|| data["_error"] == null) {
										deleteKeyGroupChekedLabel(labelParams, data.translationSC.transUpdate);
									}
								}
							});
}

function deleteKeyGroupChekedLabel(labelParams, labelList)
{
	if (labelList == null || labelList == "" || labelList == undefined)
		{
		grp_deleted_key = grp_deleted_key;
		}
	else
		{
		grp_deleted_key = global_dep_key+"\n"+labelList;
		}
		_showConfirmMsg(
			(typeof Confirm_Delete_Process_key != undefined) ? Confirm_Delete_Process_key + "\n"
					+ grp_deleted_key
					: "Delete Selected Row (The labels' links and translation of the Group will also be deleted)?",
			confirm_msg_title,
			function(yesNo) {
				if (yesNo) {
					_showProgressBar(true);
					$
							.ajax( {
								url : jQuery.contextPath + '/path/translation/TranslationMaint_deleteKeyGroup',
								type : "post",
								data : labelParams,
								success : function(response) {
									_showProgressBar(false);
									if (response["_error"] == undefined
											|| response["_error"] == null) {
										
										$("#labelDefTbl_Id").trigger(
												"reloadGrid");
										$("#groupDefTbl_Id").trigger(
												"reloadGrid");
									document.getElementById("groupTransDivG").style.display = 'none';
									showGrids('none','none');
									}
								}
							});
				}
			}, "yesNo");
}

function deleteKeyLabelClicked() {

	var selectedRowId = $("#labelDefTbl_Id").jqGrid('getGridParam', 'selrow');
	var selectedKeyLabel = $("#labelDefTbl_Id").jqGrid('getRowData',
			selectedRowId);

	var labelParams = {};
	labelParams["appName"] = selectedKeyLabel["sysParamKeyLabelVO.APP_NAME"];
	labelParams["pageRef"] = selectedKeyLabel["sysParamKeyLabelVO.PROG_REF"];
	labelParams["keyLabelCode"] = selectedKeyLabel["sysParamKeyLabelVO.KEY_LABEL_CODE"];

	_showConfirmMsg(
			(typeof Confirm_Delete_Process_key != undefined) ? Confirm_Delete_Process_key + "\n"
					+ lbl_deleted_key
					: "Delete Selected Row (The Label translation will also be deleted)?",
			confirm_msg_title,
			function(yesNo) {
				if (yesNo) {
					_showProgressBar(true);
					$
							.ajax( {
								url : jQuery.contextPath + '/path/translation/TranslationMaint_deleteKeyLabel',
								type : "post",
								data : labelParams,
								success : function(response) {
									_showProgressBar(false);
									if (response["_error"] == undefined
											|| response["_error"] == null) {
										$("#labelDefTbl_Id").trigger(
												"reloadGrid");
										showGrids('none', 'none');
									}
								}
							});
				}
			}, "yesNo");
}

function delGroupTransRow(groupTransRowID) {

	translationtTableDelRow($("#labeling_scr_chosenGrid").val(), groupTransRowID)
}

function delLabelKeyTransRow(lblKeyTransRowID) {

	translationtTableDelRow("labelTransTbl_IdL", lblKeyTransRowID)
}
function translationtTableDelRow(tableId, groupTransRowID) {
	_showConfirmMsg(
			(typeof Confirm_Delete_Process_key != undefined) ? Confirm_Delete_Process_key
					: "Delete Selected Translation?", confirm_msg_title,
			function(yesNo) {
				if (yesNo) {
					var theTransTbl = $("#" + tableId);
					theTransTbl.jqGrid('deleteGridRow', groupTransRowID);
				}
			}, "yesNo");
}

function labelLangChanged() {
	var theTransTbl = $("#labelTransTbl_IdL");
	var selRow = theTransTbl.jqGrid("getGridParam", 'selrow');
	// if not new row then take langCode from Code Hidden column
	var selLangCode = theTransTbl.jqGrid('getCell', selRow, 'langDesc');
	if (selRow.indexOf("new_") < 0) {
		selLangCode = theTransTbl.jqGrid('getCell', selRow,
				'sysParamKeyLabelTransVO.LANG_CODE');
	}

	var rows = theTransTbl.jqGrid('getDataIDs');
	var rowsLen = rows.length;

	for (i = 0; i < rowsLen; i++) {
		var myObject = theTransTbl.jqGrid('getRowData', rows[i]);
		if (rows[i] !== selRow) {
			var rowLanCode = myObject["sysParamKeyLabelTransVO.LANG_CODE"];
			// if not the selected row has same value already
			if (rowLanCode === selLangCode) {
				_showErrorMsg(
						typeof same_language_key_trns != undefined ? same_language_key_trns
								: "Same Language Already Chosen",
						error_msg_title);
				theTransTbl.jqGrid('setCellValue', selRow,
						"sysParamKeyLabelTransVO.LANG_CODE", "-1");
				theTransTbl.jqGrid('setCellValue', selRow, "langDesc", "");
				return;
			}
		}
	}
	theTransTbl.jqGrid('setCellValue', selRow,
			"sysParamKeyLabelTransVO.LANG_CODE", selLangCode);
}
function groupLangChanged() {
	var theTransTbl = $("#"+$("#labeling_scr_chosenGrid").val());
	var selRow = theTransTbl.jqGrid("getGridParam", 'selrow');
	// if not new row then take langCode from Code Hidden column
	var selLangCode = theTransTbl.jqGrid('getCell', selRow, 'langDesc');
	if (selRow.indexOf("new_") < 0) {
		selLangCode = theTransTbl.jqGrid('getCell', selRow,
				'sysParamKeyGroupTransVO.LANG_CODE');
	}

	var rows = theTransTbl.jqGrid('getDataIDs');
	var rowsLen = rows.length;

	for (i = 0; i < rowsLen; i++) {
		var myObject = theTransTbl.jqGrid('getRowData', rows[i]);
		if (rows[i] !== selRow) {
			var rowLanCode = myObject["sysParamKeyGroupTransVO.LANG_CODE"];
			// if not the selected row has same value already
			if (rowLanCode === selLangCode) {
				_showErrorMsg(
						typeof same_language_key_trns != undefined ? same_language_key_trns
								: "Same Language Already Chosen",
						error_msg_title);
				theTransTbl.jqGrid('setCellValue', selRow,
						"sysParamKeyGroupTransVO.LANG_CODE", "-1");
				theTransTbl.jqGrid('setCellValue', selRow, "langDesc", "");
				return;
			}
		}
	}
	theTransTbl.jqGrid('setCellValue', selRow,"sysParamKeyGroupTransVO.LANG_CODE", selLangCode);
}


function groupDependentLabelsClicked() {
	_showProgressBar(true);
	$("#groupDep_button").removeClass('ui-state-disabled');
	
	var selectedRowId = $("#labelDefTbl_Id").jqGrid('getGridParam','selrow');
	var selectedKeyLabel = $("#labelDefTbl_Id").jqGrid('getRowData',selectedRowId);
	
	var keyLabelGroupId = selectedKeyLabel["sysParamKeyLabelVO.KEY_GROUP_ID"];
	
	if(!(keyLabelGroupId == null || keyLabelGroupId == "" || keyLabelGroupId == undefined))
	{
		$("#labelDefTbl_Id").jqGrid('navButtonAdd', 'labelDefTbl_Id_pager',
			{
			caption:links_key,
			buttonicon: 'ui-icon-play',
			title: 'Global Label Dependents',
			id:"groupDep_button",
			onClickButton: function(){
			var selectedRowId = $("#labelDefTbl_Id").jqGrid('getGridParam','selrow');
	var selectedKeyLabel = $("#labelDefTbl_Id").jqGrid('getRowData',selectedRowId);
	
	var keyLabelGroupId = selectedKeyLabel["sysParamKeyLabelVO.KEY_GROUP_ID"];
	var keyGroupDesc = selectedKeyLabel["sysParamKeyGroupVO.KEY_GROUP_DESC"];
	var keyGroupTrans = selectedKeyLabel["prefTrans"];

			var groupDependentLabelsDiv = $("<div id='GroupDependentLabelsDialog'></div>");
			
			groupDependentLabelsDiv.css("padding","0");
			
			var theBody = $('body');
			groupDependentLabelsDiv.insertAfter(theBody);

			var actionSrc = jQuery.contextPath + '/path/TranslationMaint_loadGroupDependentGrid';
			
			$("#groupID").val(keyLabelGroupId);

				curParams = {
				"translationSC.keyGroupID": keyLabelGroupId,
				"translationSC.keyGroupDesc": keyGroupDesc,
				"translationSC.keyGroupTrans": keyGroupTrans};
	$.ajax( {
				url : actionSrc,
				type : "post",
				data : curParams,
				success : function(response) {
					_showProgressBar(false);
					if (response["_error"] == undefined
							|| response["_error"] == null) {
						groupDependentLabelsDiv.html(response)
						groupDependentLabelsDiv.dialog( {
							modal : true,
							title : "Global Label Dependents",
							autoOpen : false,
							show : 'slide',
							position : 'center',
							width : returnMaxWidth(800),
							height : returnMaxHeight(350),
							close : function() {
								var theDialog = $(this);
								theDialog.remove();
							}
						});
						groupDependentLabelsDiv.dialog("open");
						_showProgressBar(false);
					}
				}
			});
			}});
			}
			else {
				$("#groupDep_button").addClass('ui-state-disabled');
				}
	_showProgressBar(false);
}

function groupDependentGroupsClicked() {
	_showProgressBar(true);
	$("#groupDep_button").removeClass('ui-state-disabled');
	
	var selectedRowId = $("#groupDefTbl_Id").jqGrid('getGridParam','selrow');
	var selectedKeyLabel = $("#groupDefTbl_Id").jqGrid('getRowData',selectedRowId);
	
	keyLabelGroupId = selectedKeyLabel["sysParamKeyGroupVO.KEY_GROUP_ID"];
	
	if(!(keyLabelGroupId == null || keyLabelGroupId == "" || keyLabelGroupId == undefined))
	{
		$("#groupDefTbl_Id").jqGrid('navButtonAdd', 'groupDefTbl_Id_pager',
			{ caption:'',
			buttonicon: 'ui-icon-play',
			title: 'Global Label Dependents',
			id:"groupDep_button",
			onClickButton: function() {
			
			var groupDependentLabelsDiv = $("<div id='GroupDependentLabelsDialog'></div>");
			
			groupDependentLabelsDiv.css("padding","0");
			
			var theBody = $('body');
			groupDependentLabelsDiv.insertAfter(theBody);
			
			var actionSrc = jQuery.contextPath + '/path/translation/TranslationMaint_loadGroupDependentGrid';
			var curParams = {"translationSC.keyGroupID": keyLabelGroupId};
			$("#groupID").val(keyLabelGroupId);
			
	$.ajax( {
				url : jQuery.contextPath + '/path/TranslationMaint_loadGroupDependentGrid',
				type : "post",
				data : curParams,
				success : function(response) {
					_showProgressBar(false);
					if (response["_error"] == undefined
							|| response["_error"] == null) {
						groupDependentLabelsDiv.html(response)
						groupDependentLabelsDiv.dialog( {
							modal : true,
							title : "Global Label Dependents",
							autoOpen : false,
							show : 'slide',
							position : 'center',
							width : returnMaxWidth(800),
							height : returnMaxHeight(350),
							close : function() {
								var theDialog = $(this);
								theDialog.remove();
							}
						});
						groupDependentLabelsDiv.dialog("open");
					}
				}
			});
			}});
			}
			else {
				$("#groupDep_button").addClass('ui-state-disabled');
				}
	
	_showProgressBar(false);
}

function exportTrans()
{
	var theExportLevel = $("#allPageRef");
	var exportLevel = theExportLevel.val();
	// check if specifi application selected then applciation Name should be specified
	var specificAppChecked = $("input:radio[id^=selectedApp_specific]:checked").val() == "5";
	var specificAppVal = $("#lookuptxt_expImpApp_Labeling").val();
	var pRefExp = $("#lookuptxt_PageRef_Labeling").val();
	var pLabelKeyExp = $("#lookuptxt_specificKey_Labeling").val();
	var selectedLang = $("#select_trans_lang").val();
	var dateUpdated = $("#translationDateUpdated").val();
	var $exportReportsCheck = $(document.getElementById("exportTransWithoutReports"))
	var exportReports;
	if ($exportReportsCheck.is(":checked")) {
		exportReports = 'true';
	} else {
		exportReports = 'false';
	}
	/**
	 * exportLevel == 0 it is mean export all pages 
	 * exportLevel == 1 it is mean export a specific key 
	 * exportLevel == 2 it is mean export a specific Page
	 * @param {Object} url
	 */
	if((exportLevel!=0 && exportLevel!=1  && (pRefExp == null || pRefExp == '' || pRefExp == undefined)) 
		|| (selectedLang == null || selectedLang == '' || selectedLang == undefined)
		|| (specificAppChecked && (specificAppVal == '' || specificAppVal == undefined)))
		{
			_showErrorMsg(trans_mand_key, error_msg_title);
			return;
		}
		var objData = {};
		objData["translationSC.selectedApp"] = $("input:radio[id^=selectedApp]:checked").val();
		objData["translationSC.preferredLanguage"] = $("#select_trans_lang").val();
		objData["translationSC.pageRef"]  = pRefExp;
		objData["translationSC.labelKey"] = pLabelKeyExp;
		objData["translationSC.exportType"] = exportLevel;
		objData["translationSC.dateUpdated"] = dateUpdated;
		objData["translationSC.exportWithoutReports"] = exportReports;
		// if specific application then send application name
		if(specificAppChecked)
		{
			objData["translationSC.appName"] = specificAppVal;
		}
			_showProgressBar(true);
		$.fileDownload(jQuery.contextPath+ "/path/TranslationFileMaint_exportLabelsFile",
		{
	    successCallback: function (url) {
			_showProgressBar(false);
	    },
	    failCallback: function (html, url) {	 
	        _showErrorMsg(html);
	    },
	    data:objData
	});
 
}

function importTrans()
{
	if($("#uploadScript").length&&!$("#uploadScript").val()){
				_showErrorMsg(Missing_File_Location_key);
				return false;
				}
		var a = $("#uploadScript").val().split(".");
		if( a.length === 1 || ( a[0] === "" && a.length === 2 ) ) {
		    _showErrorMsg(file_ext_key);
			return false;
		}
		if(a.pop().toLowerCase() != "csv")
			{
			$("#uploadScript").val("");
			_showErrorMsg(file_ext_key);
			return false;
			}
		_showProgressBar(true);
	var options = {
		url:    jQuery.contextPath+ "/path/TranslationFileMaint_importLabelsFile",				 	
		type:   'post',
		success: function(response, status, xhr) {
			_showProgressBar(false);
				var jsonObj = $.parseJSON($(response).html());
				if (jsonObj["_error"] == undefined || jsonObj["_error"] == null
					|| jsonObj["_error"] === "")
				{
					var warnMsg = jsonObj.translationCO.importWarningMsg;
					warnMsg = warnMsg!= '' && warnMsg != undefined && warnMsg != 'undefined' && warnMsg != null ? warnMsg:'';
					_showErrorMsg(Process_Executed_Successfully_key + warnMsg,
							success_msg_title);
				}
				else
				{
					_showErrorMsg(jsonObj["_error"]);
				}
		},
		error: function(response) {
			_showProgressBar(false);
			_showErrorMsg("error"+response);
		}
		
	};
	
	$("#labelsFileForm").ajaxSubmit(options);
}

function impExpSelectChange()
{
	if($("input:radio[id^=impExpSelect]:checked").val() == "1")
	{
		document.getElementById("transImport").style.display = 'none';
		document.getElementById("transExport").style.display = '';
	}
	else
	{
		document.getElementById("transImport").style.display = '';
		document.getElementById("transExport").style.display = 'none';
	}
}
function Trns_ExpSpecificAppRadioClicked()
{
	
    var appMandatory = "0";
    var appVisible = "0";
    var spProgRefValue = "";
    var spLabelKeyValue = "";
    var specificAppChecked = $("input:radio[id^=selectedApp_specific]:checked").val() == "5";
	if (specificAppChecked)
	{
		appMandatory = "1";
		appVisible = "1";
	}
	// disable specific prog ref if iMAL Global is selected
	var spProgRefMandatory = "1";
	var spProgRefReadOnly = "0";
	var isAllPgsChked = $("#allPageRef").val();
	var imalGlblChecked = $("input:radio[id^=selectedApp]:checked").val() == "1";
	if (imalGlblChecked || isAllPgsChked=="0")
	{
		spProgRefMandatory = "0";
		spProgRefReadOnly = "1";
		if(isAllPgsChked=="2")
		{
		  spProgRefValue = "ROOT";  	
		}
	}
	
	var addElts = {
			lookuptxt_expImpApplication_Labeling : {
				IS_VISIBLE : appVisible,
				IS_MANDATORY : appMandatory
			}
			,lookuptxt_PageRef_Labeling:{
				IS_MANDATORY : spProgRefMandatory,
				IS_READONLY :spProgRefReadOnly,
				value :spProgRefValue
				}
			,Labeling_PROG_DESC:{
				IS_MANDATORY : false,
				IS_READONLY :true,
				value :spProgRefValue
				}
			,lookuptxt_specificKey_Labeling:{
				value :spLabelKeyValue
				}
			,labeling_KEY_LABEL_DESC:{
				value :spLabelKeyValue
				}
		};
		manageDynamicDisplay("lookuptxt_expImpApp_Labeling", addElts,"lookuptxt_expImpApplication_Labeling");
		manageDynamicDisplay("lookuptxt_PageRef_Labeling", addElts,"lookuptxt_PageRef_Labeling");
		manageDynamicDisplay("Labeling_PROG_DESC", addElts,"Labeling_PROG_DESC");
		manageDynamicDisplay("lookuptxt_specificKey_Labeling", addElts,"lookuptxt_specificKey_Labeling");
		manageDynamicDisplay("labeling_KEY_LABEL_DESC", addElts,"labeling_KEY_LABEL_DESC");
}
/**
 * method to check the details of specific key in reference database 
 * used only during QA nd Development mode.
 */
function labling_checkReferenceDbDetails()
{
	_showProgressBar(true);
	var postData = {};
	postData["translationSC.pageRef"] = $("#transPageRef").val();
	postData["translationSC.appName"] = $("#transAppName").val();
	postData["translationSC.keyLabelCode"] = $("#transKeyLabelCode").val();
	$.ajax(
		{
			url : jQuery.contextPath+ "/path/TranslationMaint_checkReferenceDBDetails",
			type : "post",
			dataType : "json",
			data : postData,
			success : function(data)
			{ 
				_showProgressBar(false);
			}
		});
}
/**
 * method to update the details of specific key in reference database 
 * used only during QA nd Development mode.
 */
function labling_pushReferenceDbDetails()
{
	_showConfirmMsg("Are You Sure to send Key Details "+$("#transKeyLabelCode").val()+" to Reference DB", "Confirmation", function(
			yesNo) {
		if (yesNo) 
		{
			_showProgressBar(true);
			var postData = {};
			postData["translationSC.pageRef"] = $("#transPageRef").val();
			postData["translationSC.appName"] = $("#transAppName").val();
			postData["translationSC.keyLabelCode"] = $("#transKeyLabelCode").val();
			
			$.ajax(
					{
						url : jQuery.contextPath+ "/path/TranslationMaint_pushTransToRefDB",
						type : "post",
						dataType : "json",
						data : postData,
						success : function(data)
						{ 
							_showProgressBar(false);
							if (data["_error"] == undefined
									|| data["_error"] == null) 
							{
								_showErrorMsg("Record Sent Succesfully to reference Database, \n Please check the detals using Check Button",
										success_msg_title);
							}
						}
					});
			
		} else 
		{
			return;
		}
	});
}

function lovTypeSelected(lovTypeID) {
	if ($("#lovTransForm").hasChanges()) {
		_showConfirmMsg(changes_made_confirm_msg, confirm_msg_title, function(
				yesNo) {
			if (yesNo) {
				$("#lovTransForm").clearChanges();
				lovTypeChecked(lovTypeID);
			} else {
				return;
			}
		});
	} else {
		lovTypeChecked(lovTypeID);
	}
}
function lovTypeChecked(lovTypeID) {
	if (lovTypeID == null || lovTypeID == "" || lovTypeID == undefined) {
		var selectedRowId = $("#lovTypeTbl_Id").jqGrid('getGridParam',
				'selrow');
		var selectedLOVType = $("#lovTypeTbl_Id").jqGrid('getRowData',
				selectedRowId);
		lovTypeID = selectedLOVType["LOV_TYPE_ID"]
	}

	$("#lovTypeID").val(lovTypeID)

	var selections = {
		"lovTypeID" : lovTypeID
	};

		$("#lovTransTbl_Id")
				.jqGrid(
						'setGridParam',
						{
							'url' : jQuery.contextPath + '/path/translation/TranslationMaint_loadLOVTranslationGrid',
							postData : selections,
							mtype : "POST"
						}).trigger("reloadGrid");
		$("#labeling_scr_chosenGrid").val("lovTransTbl_Id");
	document.getElementById("lovTransDiv").style.display = '';

}