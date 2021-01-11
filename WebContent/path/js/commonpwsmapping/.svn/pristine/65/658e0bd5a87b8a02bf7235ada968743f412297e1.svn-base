
	/**
	 * @Decription: on sub grid complete event
	 */
	function webServiceExplorerOnSubGridComplete(event,data)
	{
		applyWebServiceExplorerSubGridDefaultFunctionality(event,data);
		var gridId = data.id;
		var g = $("#"+gridId);
		/*check uncheck grid rows on click*/
		if('true' == $("#checkbox_event_triggered_"+gridId+"_"+_pageRef).val())
		{
			checkUcheckGridOrSubGrid(gridId);
			var $trs = returnAllGridRowsThatHaveSubGridFlagTrue(gridId);
			$.each($trs,function(i,v)
			{
				var ft = g.jqGrid ('getCell', v.id, 'fieldType')
				
				if(checkForType(ft) =="List<Object>")
				{
					loadDynamicSubGrid(v,"List");
				}
				else if(checkForType(ft) == "HashMap" || checkForType(ft) == "List")
				{
					//incase of hash map proceed to next record
				}
				else{
					loadSubGridEvent(null,v,function(){
						checkBoxEvent(v,'subgrid');
					});
				}
				
			});
		}		
		
		/*adding event row select event */
//		try{
//			gridRowOnClickEvent(gridSelectorName);
//		}
//		catch(e)
//		{
//			
//		}
	}
	
	/**
	 * @description common subGrid Functionality
	 * @param event
	 * @param data
	 * @returns
	 */
	function applyWebServiceExplorerSubGridDefaultFunctionality(event,data)
	{
		var parentRowObj = $("#"+data.id).parents("tr").prev()[0];
		var parentRowId = parentRowObj.id;
		var parentGridIddd = "";
		if(null != parentRowObj.offsetParent)
		{
			parentGridIddd = parentRowObj.offsetParent.id;
		}
		else{
			parentGridIddd = getGridIdFromRow(parentRowId);
		}
		var parentGrid = $("#"+parentGridIddd);
		var ids = parentGrid.jqGrid('getDataIDs');
		var currentGridOrgi = data.id;
		var selectedRow = parentRowId;
		var rowObj = $("#"+selectedRow);
//		var $cbox = rowObj.find('input:first');
//		$cbox.attr('onclick', 'triggerCheckBoxEvent('+ selectedRow +');
		var parentGridId = "";	
		if(null != rowObj[0].offsetParen)
		{
			parentGridId = rowObj[0].offsetParent.id;
		}
		else{
			parentGridId = getGridIdFromRow(parentRowId);
		}
		var currentGrid = parentGridId.replace("_table", "");
		var dynamicIdPathSubGrid = data.id;
	
		var fieldType = parentGrid.jqGrid ('getCell', parentRowId, 'fieldType');
		
		/*case of list in order to resize grid*/
		var lstParents = $("#"+parentRowId).parents("table");
		//var grandParentGrid = $("#"+parentRowId).parent("tbody").parent("table");
		var prevGrid = null;
		var prevPrevGrid = null;
		var prevGridParentRow = null;
		var prevGridGView = null;
		if(lstParents.length>0)
		{	
			try{
				prevGrid = lstParents[0];
				prevGridParentRow = $("#"+prevGrid.id).parents("tr").prev()[0].id;
				var prevGridHeight = null;
				prevSel = "gview_"+ prevGrid.id;
				if(lstParents.length>1)
				{
					prevPrevGrid = lstParents[1]; // points to the third parent	
					var prevPrevGridHeight = null;
					var prevPrevSel = prevPrevGrid.id;
				}
			}
			catch(e)
			{
				//case subGrid
			}
		}
		var data = $("#"+dynamicIdPathSubGrid)[0];
		applyWebServiceExplorerDefaultFunctionality(event,data);
		resizeGrids();
	}
	
	/**
	 * @Description called upon selecting a certain row
	 * @param rowObj
	 * @returns
	 */
	function onRowSubSelTopic(rowObj)
	{
		var subGrid = rowObj.originalEvent.grid.selector;
		subGrid = $(subGrid);
		var rowId = rowObj.originalEvent.id
	    var  isMandatory = subGrid.jqGrid ('getCell', rowId, 'mandatory');
		var idArr = subGrid.jqGrid ('getCell', rowId, 'gridColumnID');		
	    var mappingFields = $("#webServiceExplorerMappingParams_"+_pageRef).val();
	 
	    if(null == mappingFields || "" == mappingFields || undefined == mappingFields)
	    {
	    	subGrid.jqGrid('setCellReadOnly', rowId, 'mappingValue',"true");    	
	    }
	    else{
	    	//subGrid.jqGrid("setCellRequired", rowId,'value',"false");
	    	//subGrid.jqGrid('setCellReadOnly', rowId, 'value',"true");
	    }	    
	    if(idArr[0] == "1")
	    {
	    	subGrid.jqGrid('setCellReadOnly', rowId, 'restriction',"false");
	    }
	    else{
	    	subGrid.jqGrid('setCellReadOnly', rowId, 'restriction',"true");
	    }	    
		if(isMandatory == "mandatory")
		{
			//subGrid.jqGrid("setCellRequired", rowId,'value',true);
		}
		//subGrid.jqGrid("setCellRequired", rowId,'value',false);
		var grid = $('#'+returnGridId());
		//grid.jqGrid("setCellRequired", rowId,'value',false);
	}
	
	
	/**
	 * @autho Raed Saad
	 * function called when selecting a row in the main grid
	 * should call the main grid row select
	 * 
	 * */
	function onSubGridRowSelTopic(rowObj)
	{
		onRowSelTopic(rowObj);
		
		var rowId = rowObj.originalEvent.id
		var gridId = getGridIdFromRow(rowId);
		grid = $("#"+gridId);
		
		//816746
	    var parentRowId = returnSubGridRowParentRowId(rowId); 
		var ar = undefined;
		if(parentRowId != undefined)
		{
			ar = parentRowId.split("_");
		}
		if(ar != undefined && ar.length>2 && ar[2] == 'response')
		{
			var x = parentRowId.split("_");
			if(x[0] == "serviceContext" || x[0] == "vendorContext")
			{
				var gId = getGridIdFromRow(rowId);
				$("#"+gId).jqGrid('setCellReadOnly', rowId, 'restriction',"true");
				$("#"+gId).jqGrid('setCellReadOnly', rowId, 'value',"true");
				$("#"+gId).jqGrid('setCellReadOnly', rowId, 'mappingField',"true");
			}
		}
//		if(ar != undefined && ar.length>2 && ar[2] == 'response')
//		{
//			var x = parentRowId.split("_"+_pageRef);
//			if(x[0] == "serviceContext" || x[0] == "vendorContext")
//			{
//				var gId = getGridIdFromRow(rowId);
//				$("#"+gId).jqGrid('setCellReadOnly', rowId, 'restriction',"true");
//				$("#"+gId).jqGrid('setCellReadOnly', rowId, 'value',"true");
//				$("#"+gId).jqGrid('setCellReadOnly', rowId, 'mappingField',"true");				
//			}
//		}
		//end 816746
//		var gridSelectorName = rowObj.target.id;
//		var grid = $("#"+gridSelectorName);	
//		var rowId = rowObj.originalEvent.id
//	    var isMandatory = grid.jqGrid ('getCell', rowId, 'mandatory');
//		var id =  grid.jqGrid ('getCell', rowId, 'gridColumnID');
//	    var idArr = id.split("_concat_");
//	    var idArrLength = idArr.length;
//	    
//	    /*Incase we have the mapping fields options*/
//	//    var mappingFields = $("#webServiceExplorerMappingParams_"+_pageRef).val();    
//	//    if(null == mappingFields || "" == mappingFields || undefined == mappingFields)
//	//    {
//	//    	grid.jqGrid('setCellReadOnly', rowId, 'mappingValue',"true");    	
//	//    }
//	//    else{
//	//		grid.jqGrid("setCellRequired", rowId,'value',false);
//	//	    grid.jqGrid('setCellReadOnly', rowId, 'value',"true");
//	//    }
//	    
//	    if(idArr[0] == "1")
//	    {
//	    	grid.jqGrid('setCellReadOnly', rowId, 'restriction',"false");
//	    }
//	    else{
//	    	grid.jqGrid('setCellReadOnly', rowId, 'restriction',"true");
//	    }
//		if(isMandatory == "mandatory")
//		{
//			grid.jqGrid("setCellRequired", rowId,'value',true);
//		}
	}