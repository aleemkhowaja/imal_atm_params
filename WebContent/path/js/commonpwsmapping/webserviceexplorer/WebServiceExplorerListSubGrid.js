/**
 * @Auther:Raed Saad
 * @Date:MARCH 2018
 * @Team: PEMTS JAVA Team.
 * @copyright: PathSolution 2018
 * @User Story: USER STORY #653853  WSDL explorer
 * @Description: List Sub Grid JS functions
 **/

	/**
	 * On list Sub grid complete function
	 */
	function onListSubGridCompleteFn(event,data)
	{
		applyWebServiceExplorerListSubGridDefaultFunctionality(event,data);
		
		var dynamicIdPathSubGrid = data.id;
		var parentRowObj = $("#"+data.id).parents("tr").prev()[0];
		var parentRowId = parentRowObj.id;
		/*adding event on row select event */
		try{
			$("#"+dynamicIdPathSubGrid).before($("#"+dynamicIdPathSubGrid)[0].grid.hDiv).click(function(e) {
				var $td = e.target;
				var $tr = $($td,dynamicIdPathSubGrid.rows).closest("tr.jqgrow");
				if($tr.length != 0)
				{
					var rowid = $tr.attr('id');
					var parentRowId = returnSubGridRowParentRowId(rowid);
					var gridId = getGridIdFromRow(parentRowId);
					var grid = $("#"+gridId);
					var fieldType = grid.jqGrid ('getCell', parentRowId, 'fieldType');
					if("false" != fieldType && false != fieldType && (checkForType(fieldType) == "List<Object>"))
					{
						checkBoxEvent($tr[0],'subgrid');
					}
				}
			}
			);
		}
		catch(e)
		{
			console.log("error in onClickEvent");
		}
		
		/* when loading configs from lookup
		 * load sub grids after loading the whole sub grid
		 *  */
		try {
			var isFromLoad = $("#serviceDataId_" + _pageRef).val();
			if (undefined != isFromLoad && null != isFromLoad && "" != isFromLoad) {
				//currentGridIds = currentGridIds.splice(1, currentGridIds.length); //remove the first element in the array
				loadSubGridData(currentGrid, listGridIds);
			}
		} catch (e) {
			console.log(e);
		}
	}

	function applyWebServiceExplorerListSubGridDefaultFunctionality(event,data)
	{
		try{
			 $('td').removeClass("path-subgrd-hdr");
		}
		catch(e)
		{
			console.log(e);
		}
		var parentRowObj = $("#"+data.id).parents("tr").prev()[0];
		var parentRowId = parentRowObj.id;
		var parentGridIddd;
		if(null == parentRowObj.offsetParent || undefined == parentRowObj.offsetParent)
		{
			parentGridIddd = getGridIdFromRow(parentRowId);
		}
		else{
			parentGridIddd = parentRowObj.offsetParent.id;
		}
		var parentGrid = $("#"+parentGridIddd);
		var ids = parentGrid.jqGrid('getDataIDs');
		//var selectedRow = parentGrid.jqGrid('getGridParam','selrow');
		var selectedRow = parentRowId;
	    var fieldType = null; 
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
		var dynamicIdTh = returnGridId()+"_"+selectedRow+"_List_";	
		var listGridIds = $("#"+dynamicIdPathSubGrid).jqGrid('getDataIDs');
		var currentGrid = $("#"+dynamicIdPathSubGrid);
		$.each(listGridIds,function(i,v)
				{
			    	$('#' + v).children("td.sgcollapsed").unbind().html("");
				}		
				);
		var fieldType = parentGrid.jqGrid ('getCell', parentRowId, 'fieldType');
		var hasChildren = parentGrid.jqGrid ('getCell', parentRowId, 'hasChildren');
		var gridColumnID = parentGrid.jqGrid ('getCell', parentRowId, 'gridColumnID');    
		var currentGridIds = currentGrid.jqGrid('getDataIDs');
		if(checkForType(fieldType) == "List<Object>")
		{
			$.each(listGridIds,function(i,v)
			{
		    	var gridExpand = "0";
		    	$("#"+v).children("td.sgcollapsed").append('<span id="icon_'+v+'_'+_pageRef+'" onclick = "loadSubGridEvent(null,'+v+')"  class="ui-icon ui-icon-plus"></span>');    	    		
		    	$("#"+v).children("td.sgcollapsed").append('<input type="hidden" id="'+v+"_subGrid_"+_pageRef+'" name="'+v+"_subGrid_"+_pageRef+'" value="'+gridExpand+'" />');
		    	currentGrid.jqGrid('setCellReadOnly',v, 'value',"true");
		    	currentGrid.jqGrid("setCellValue",v, 'hasChildren', "1");
		    	currentGrid.jqGrid("setCellValue",v, 'gridColumnID', gridColumnID);
		    	var $tr = $("#"+v);
		    	var $cbox = $tr.find('input:first');
		    	$cbox.attr('onclick','checkBoxEvent('+v+',\'subgrid\')');		    	
		    	var isFromLoad = $("#serviceDataId_" + _pageRef).val();
				if (undefined != isFromLoad && null != isFromLoad && ""!= isFromLoad)
				{
					//currentGrid.jqGrid('setSelection',v, true);
					updateSelectOption(v);
				}
			}		
			);
		}
		var grid = $("#"+dynamicIdPathSubGrid);
		$("#"+dynamicIdPathSubGrid+">gbox_"+dynamicIdPathSubGrid+ ">div").attr('parentRow',selectedRow);
		/*unbind add new row original event inorder to pass parent row object to the add function*/
		 var parentRowObjectToPass = $("#"+selectedRow);
		// var orgi_AddNewRowSelector = $("#gbox_"+dynamicIdPathSubGrid).find('div.ui-pg-div').find("span.ui-icon-plus").parent("div").parent("td").attr('id');
		 var new_AddNewRowSelector = "add_"+dynamicIdPathSubGrid;
		 $("#"+new_AddNewRowSelector).unbind();
		 $("#"+new_AddNewRowSelector).attr('id', new_AddNewRowSelector);
		 $("#"+new_AddNewRowSelector).bind('click',function()
		 {
			 addListSubGridRows(parentRowObjectToPass[0]);	
		 });
		 $("#gbox_"+dynamicIdPathSubGrid).find('div.ui-pg-div').find("span.ui-icon-plus").attr('id',selectedRow+"_List_Span");
		 $("#gbox_"+dynamicIdPathSubGrid).find('div.ui-pg-div').find("span.ui-icon-plus").attr('parentRow',selectedRow);

	}
	/**
	 * Add User rows
	 * @param rowId
	 */
	function addListSubGridRows(parentRowObj)
	{
		var parentRowId = parentRowObj.id;
		var parentGridIddd = parentRowObj.offsetParent.id;
		var parentGrid = $("#"+parentGridIddd);
	    var fieldType = null; 
	    var  fName = null;
	    var type1 = null;
	    var allGridRows = null;
	    var len = null;
	    try{
	    	var dynamicIdPathSubGrid = ($("#"+parentRowId).next("tr").children("td.subgrid-data").children("div")[0].id).replace("gbox_","");
	    	var currentGrid = $("#"+dynamicIdPathSubGrid);
	    	
			//addGridRow(currentGrid,parentRowId);
//	    	allGridRows= currentGrid.jqGrid('getDataIDs');
//	    	len = allGridRows.length;
			var rowId = currentGrid.jqGrid('addInlineRow', {});	
			var prevRowId = $("#"+rowId).prev("tr").attr('id');
			var parentType = null;
			var prevSeq = null;
			if(undefined == prevRowId)
			{
				prevRowId = $("#"+rowId).prev("tr").prev().attr('id');
				if(undefined == prevRowId)
				{
					var fieldType = parentGrid.jqGrid ('getCell', parentRowId, 'fieldType');    
					type1 = fieldType.replace("List<","").replace(">","");
				 	prevRowId = type1+"_0";
				}
				var hF = prevRowId + "_subGrid_"+_pageRef;
				$("#"+hF).val("1"); // fix prev Opened row val
				var iconPrev = "icon_"+prevRowId+"_"+_pageRef;
				$("#"+iconPrev).switchClass("ui-icon-plus","ui-icon-minus");				
			}
			prevSeq = prevRowId;
		//	fName = $parentGrid.jqGrid('getCell', parentRowId, 'fieldName');
			//fieldType = $parentGrid.jqGrid('getCell', parentRowId, 'fieldType');
			var x = prevRowId.split("_");
			var prevRowNumericId = x[x.length-1];
			var newRowId = prevRowNumericId;	
			newRowId++;
			if(x.length > 1)
			{
				prevSeq = prevRowId.substring(0,prevRowId.length-2);
			}
			newRowId = prevSeq+"_"+newRowId;
			var inptId = 'jqg_'+dynamicIdPathSubGrid+'_'+newRowId;
			$("#"+rowId).attr('class','ui-widget-content jqgrow ui-row-ltr');
			$("#"+rowId).removeAttr('aria-selected');
			$("#"+rowId).removeAttr('added');
			$("#"+rowId+" >td:first-child").children("input").attr('id',inptId);
			$("#"+rowId).attr('id',newRowId);
			
			var fType = currentGrid.jqGrid ('getCell', prevRowId, 'fieldType');   
			var gridColumnID = parentGrid.jqGrid ('getCell', parentRowId, 'gridColumnID');    
			if(fType == false)
			{
				fType = type1;
			}
			currentGrid.jqGrid("setCellValue",newRowId, 'fieldType', fType);
			currentGrid.jqGrid("setCellValue",newRowId, 'gridColumnID', gridColumnID);
			currentGrid.jqGrid("setCellValue",newRowId, 'hasChildren', "1");
			var type = parentGrid.jqGrid ('getCell', parentRowId, 'fieldType');
			if(checkForType(type) == "List<Object>")
			{
				$('#' + newRowId).children("td.sgcollapsed").unbind().html("");
			  	var gridExpand = "0";
			  	$("#"+newRowId).children("td.sgcollapsed").append('<span id="icon_'+newRowId+'_'+_pageRef+'" onclick = "loadSubGridEvent(null,'+newRowId+')"  class="ui-icon ui-icon-plus"></span>');    	    		
			  	$("#"+newRowId).children("td.sgcollapsed").append('<input type="hidden" id="'+newRowId+"_subGrid_"+_pageRef+'" name="'+newRowId+"_subGrid_"+_pageRef+'" value="'+gridExpand+'" />');
			  	var $tr = $("#"+newRowId);
			    var $cbox = $tr.find('input:first');
			    $cbox.attr('onclick','checkBoxEvent('+newRowId+',\'subgrid\')');
			}
			
			//removing green color
		//	$('td').removeClass("path-subgrd-hdr");		
			
			return newRowId;
		}
		catch(err)
		{
			console("error adding row");
		}
	}
	
	/**
	 * @Description: for deleting sub grid of type list object rows
	*/
	function deleteListSubGridRows(rowId)
	{
		if(null != rowId && undefined != rowId)
		{
			$.each(rowId,function(i,v)
			{
				if(hasSubGrid(v))
				{
					deleteRowSubGridByParentRowId(v);
					deleteGridRow(v);
				}
				else
				{
					deleteGridRow(v);
				}
			});
		}
	}
	
	