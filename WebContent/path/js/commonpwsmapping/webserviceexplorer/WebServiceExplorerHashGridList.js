/**
 * @Auther:Raed Saad
 * @Date:MARCH 2018
 * @Team: PEMTS JAVA Team.
 * @copyright: PathSolution 2018
 * @User Story: USER STORY #653853  WSDL explorer
 * @Description: HashMap Grid JS function
 **/


/**
 * on hash grid complete
 */
function onHashGridGridCompleteFn(event,data)
{
	var parentRowObj = $("#"+data.id).parents("tr").prev()[0];
	var parentRowId = parentRowObj.id;
	var parentGridIddd = parentRowObj.offsetParent.id;
	var parentGrid = $("#"+parentGridIddd);
	var ids = parentGrid.jqGrid('getDataIDs');
	var selectedRow = parentRowId;
    var fieldType = null; 
	//var dynamicIdPathSubGrid = "webServiceGuiTbl_Id_"+_pageRef+"_"+selectedRow+"_HashMap_table";
	var dynamicIdPathSubGrid = data.id;
	try{
		//remove pager by force
		$("#"+dynamicIdPathSubGrid+"_pager_center").remove();
		$("#"+dynamicIdPathSubGrid+"_pager_right").remove();
	   }
	   catch(e)
	   {
		   console.log(e);
	   }
	var grid = $("#"+dynamicIdPathSubGrid);
	$("#"+dynamicIdPathSubGrid+">gbox_"+dynamicIdPathSubGrid+ ">div").attr('parentRow',selectedRow);
	/*unbind add new row original event inorder to pass parent row object to the add function*/
	 var parentRowObjectToPass = $("#"+selectedRow);
	 var orgi_AddNewRowSelector = $("#gbox_"+dynamicIdPathSubGrid).find('div.ui-pg-div').find("span.ui-icon-plus").parent("div").parent("td").attr('id');
	 var new_AddNewRowSelector = "add_"+dynamicIdPathSubGrid;
	 $("#"+new_AddNewRowSelector).unbind();
	 $("#"+new_AddNewRowSelector).bind('click',function(){
		 addHashMapSubGridRows(parentRowObjectToPass[0]);	
	 });
	 $("#gbox_"+dynamicIdPathSubGrid).find('div.ui-pg-div').find("span.ui-icon-plus").attr('id',selectedRow+"_HashMap_Span");
	 $("#gbox_"+dynamicIdPathSubGrid).find('div.ui-pg-div').find("span.ui-icon-plus").attr('parentRow',selectedRow);
	
	 //removing green color
	 $('td').removeClass("path-subgrd-hdr");
		
}

/**
 * Add User rows
 * @param rowId
 */
function addHashMapSubGridRows(parentRowObj)
{
	var parentRowId = parentRowObj.id;
	var parentGridIddd = parentRowObj.offsetParent.id;
	var parentGrid = $("#"+parentGridIddd);
    var fieldType = null; 
    var  fName = null;
    try{
		var dynamicIdPathSubGrid = "webServiceGuiTbl_Id_"+_pageRef+"_"+parentRowId+"_HashMap_table";	
		var subGrid = $("#"+dynamicIdPathSubGrid);	
		var rowId = subGrid.jqGrid('addInlineRow', {});
	}
	catch(err)
	{
		console("error adding row");
	}
}

/**
 * Delete User rows
 * @param rowId
 */
function deleteHashMapSubGridRows(rowId) 
{
	var gridId =  getGridIdFromRow(rowId);
	var grid = $("#"+gridId);
	var selectedRow = grid.jqGrid('getGridParam','selrow');
	grid.jqGrid('deleteGridRow',selectedRow);
}

/**
 * Executed on HashGrid edited line
 * @param rowId
 */
function onHashGridRowSelTopic()
{
	
}