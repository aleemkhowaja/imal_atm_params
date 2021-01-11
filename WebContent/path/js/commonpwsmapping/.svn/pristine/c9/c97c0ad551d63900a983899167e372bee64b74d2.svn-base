function onPwsListSubGridCompleteFn(event,data)
{
//	onListSubGridCompleteFn(event,data);
	applyWebServiceExplorerListSubGridDefaultFunctionality(event,data);
	var formId = "webServiceGuiGridForm_"+_pageRef;
	var gridSelectorName = data.id;
	var grid = $("#"+gridSelectorName);
	var ids = grid.jqGrid('getDataIDs');
	for (var i = 0; i < ids.length; i++) 
	{
	    var rowid=ids[i];
	    var loadSubGrid = grid.jqGrid('getCell',rowid,'loadSubGrid');
		grid.jqGrid('setCellReadOnly', rowid, 'mappingField', "true");
		if (undefined != loadSubGrid && null != loadSubGrid && loadSubGrid.length > 0) 
		{
			loadSubGridData(grid, ids);		
		}
	}
    resizeGrids();
}
