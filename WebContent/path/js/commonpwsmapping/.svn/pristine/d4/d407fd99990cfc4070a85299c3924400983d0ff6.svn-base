/**
 * 
 * @param rowid
 * @returns
 */
function webServiceExplorer_onDbClickedEvent(data) 
{
	var $mainTab = $("#custTabs_"+_pageRef);
	var $tabId1 = "custTab1TabsContent_"+_pageRef;
	var $tabId2 = "custTab2TabsContent_"+_pageRef;
	
	var gridId = "webServiceGuiSavedConfigurationTbl_Id_" + _pageRef;
	//var rowId = returnGridLastSelectedRow(gridId);
	var grid = $("#webServiceGuiSavedConfigurationTbl_Id_" + _pageRef);
	var selectedRowId = grid.jqGrid('getGridParam', 'selrow');
	var rowData = grid.jqGrid('getRowData', selectedRowId);
	var appName = rowData['APPLICATION_NAME'];
	var serviceDataId = rowData['CONFIG_ID'];
	var serviceName = rowData['ENDPOINT_NAME'];
	var operationName = rowData['OPERATION_NAME'];
	$("#application_name_desc_" + _pageRef).val(appName);
	$("#webservice_name_desc_" + _pageRef).val(serviceName);
	$("#operation_name_lkp_desc_" + _pageRef).val(operationName);
	$("#serviceDataId_" + _pageRef).val(serviceDataId);
	var grid = $("#webServiceGuiGrid_" + _pageRef);
	var loadSrc = jQuery.contextPath + "/path/common/WebserviceExplorer/WebServiceExplorerList_loadMainGridFn?webServiceExplorerCO.requestType=request";
	var serializedForm = $("#webServiceGuiDefFormId_" + _pageRef).serializeForm();
	if ("" == serviceDataId) 
	{
		serializedForm = "";
	}
	_showProgressBar(true);
	$.ajax({
		url : loadSrc,
		type : "post",
		dataType : "html",
		data : serializedForm,
		success : function(data) 
		{
			$mainTab.tabs('select',$tabId1);
			grid.html(data);
			var src = jQuery.contextPath +"/path/common/WebserviceExplorer/WebServiceExplorerMaint_toolBarVisiblity?webServiceExplorerCO.method=update";
			loadToolbar(src);
			_showProgressBar(false);
		},
		error : function(xhr, ajaxOptions, thrownError) {
			alert(xhr.status);
			alert(thrownError);
		}
	}).done(function(result) 
			{
				$mainTab.tabs('enable',$tabId2);
				webServiceExplorer_showHideGrid(gridId);
				config_Lookup_Dep();
			});
}