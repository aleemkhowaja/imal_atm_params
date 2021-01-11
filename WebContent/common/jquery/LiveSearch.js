	/**
	 * PathSolutions [Navas] [Makes Live search read only and vice versa]
	 * 
	 * @param {Object} readOnlyFlag
	 * @param {Object} componentId
	 */
	function liveSearch_makeReadOnly(readOnlyFlag, componentId){
		
		var compId = (componentId.indexOf("lookuptxt_") < 0)? "lookuptxt_"+componentId : componentId;
		var spanCompId = (componentId.indexOf("lookuptxt_") < 0) ? "spanLookup_"+componentId : componentId.replace("lookuptxt_","spanLookup_");
		var lookupText = $(document.getElementById(compId));	
		var spanLookup = $(document.getElementById(spanCompId));
		var opts;
        try
        {
              opts = eval("options_"+componentId.replace(".","_").replace("lookuptxt_","")+"_liveSearch");
        }
        catch(e){
        	
        }

		if(readOnlyFlag == "true" || readOnlyFlag == true){
			/**
			 * [MarwanMaddah]: multi-select readOnly mode
			 * in case of multi selection and readOnly mode the button will be enabled 
			 * but the related lookup should open on readOnly mode
			 * for that a new Arg will be added to liveSearch options to force reConstruct the lookup on makeReadOnly Process.
			 */
			if(typeof opts!="undefined" && opts!=null && "true" == opts.multiSelect)
			{				
				eval("options_"+componentId.replace(".","_").replace("lookuptxt_","")+"_liveSearch").readOnlyModeValue = "true";
				eval("options_"+componentId.replace(".","_").replace("lookuptxt_","")+"_liveSearch").reBldMltiSelOnDep = "true";
			}
			else
			{
				spanLookup.addClass("disableLiveSearch");
				spanLookup.addClass("disableLiveSearchText");
				spanLookup.find('.ui-icon-search').addClass('ui-state-disabled'); //PathSolutions [Libin] added to give the Search Button the look and feel of DISABLED
				spanLookup.attr('tabindex','-1');				
			}
  		    lookupText.attr('readonly','readonly');
  		    lookupText.attr('tabindex','-1');
		}
		else
		{
			/**
			 * [MarwanMaddah]: multi-select readOnly mode 
			 * in case of multi selection and readOnly mode the button will be enabled 
			 * but the related lookup should open on readOnly mode
			 * for that a new Arg will be added to liveSearch options to force reConstruct the lookup on makeReadOnly Process.
			 */
			if(typeof opts!="undefined" && opts!=null && "true" == opts.multiSelect)
			{				
				eval("options_"+componentId.replace(".","_").replace("lookuptxt_","")+"_liveSearch").readOnlyModeValue = "false";
				eval("options_"+componentId.replace(".","_").replace("lookuptxt_","")+"_liveSearch").reBldMltiSelOnDep = "true";
			}
			/**
			 * 
			 */
			
			spanLookup.removeClass("disableLiveSearch");
			spanLookup.removeClass("disableLiveSearchText");
			spanLookup.find('.ui-icon-search').removeClass('ui-state-disabled');  //PathSolutions [Libin] added to give the Search Button the look and feel of ENABLED
			if(typeof opts == "undefined" || opts == null || opts.multiSelect !== "true")
			{
				lookupText.removeAttr('readonly');	
				lookupText.removeAttr('tabindex');
				if(lookupText.attr("oldtabindex") && lookupText.attr("oldtabindex") != "-1")			
				{
					lookupText.attr("tabindex",lookupText.attr("oldtabindex"))
				}
			}
			spanLookup.attr('tabindex',spanLookup.attr('oldtabindex')); //for spans oldtabindex is set also in case of default to 0
			if($.browser.msie) //hack to make tabindex work directly, since on IE even when value is set on input it is not directly reflected in tabbing order
			{
				lookupText[0].parentNode.replaceChild(lookupText[0], lookupText[0])
			}
		}
	}
		
	/**
	 * PathSolutions [Navas] [Makes Live search read only and vice versa]
	 * @param {Object} readOnlyFlag
	 * @param {Object} componentId
	 */
	function liveSearch_makeReadOnlyText(readOnlyFlag, componentId){
		var compId = (componentId.indexOf("lookuptxt_") < 0)? "lookuptxt_"+componentId : componentId;
		var spanCompId = (componentId.indexOf("lookuptxt_") < 0) ? "spanLookup_"+componentId : componentId.replace("lookuptxt_","spanLookup_");
		var lookupText = $(document.getElementById(compId));//(componentId.indexOf("lookuptxt_") < 0)? $(document.getElementById("lookuptxt_"+componentId))  : $(document.getElementById(componentId));	
		var spanLookup = $(document.getElementById(spanCompId));//(componentId.indexOf("lookuptxt_") < 0) ? $(document.getElementById("spanLookup_"+componentId))  : $(document.getElementById(componentId.replace("lookuptxt_","spanLookup_")));
		
		if(readOnlyFlag == true || readOnlyFlag == "true"){
			spanLookup.addClass("disableLiveSearchText");
  		    lookupText.attr('readonly','readonly');
		}
		else{
			spanLookup.removeClass("disableLiveSearch");
			spanLookup.removeClass("disableLiveSearchText");
			spanLookup.find('.ui-icon-search').removeClass('ui-state-disabled');  
			lookupText.removeAttr('readonly');		
		}
	}	
	/**
	 * Method to reset the selected values in livesearch
	 * @param componentId id of livesearch component
	 * @param theValue the value to set.
	 */
	function liveSearch_setLiveSearchValue(componentId,theValue)
	{
		// check how the id is provided and concatinate lookuptxt_ if not exists.
		var compId = (componentId.indexOf("lookuptxt_") < 0)? "lookuptxt_"+componentId : componentId;
		var lookupText = $(document.getElementById(compId));
		// check if lookup input exists
		if(lookupText.length > 0)
		{
			// check if to set empty value
			if(theValue === "")
			{
				// check the options of the livesearch
				var opts;
				try
				{
					opts = eval("options_"+compId.replace(".","_").replace("lookuptxt_","")+"_liveSearch");
				}
				catch(e){}

				// check if livesearch has multiselect option enabled to reset the selection in the grid
				if(typeof opts != "undefined" && opts != null && opts.multiSelect != null && opts.multiSelect.toUpperCase() == "TRUE")
				{
					// construct the grid id of the livesearch
					var liveSearchGridId = "gridtab_"+compId.replace(".","_").replace("lookuptxt_","");
					$grid = $(document.getElementById(liveSearchGridId));
					// check if grid is constructed
					if($grid.length > 0)
					{
						// change the flag that the selection is changed 
						$grid.jqGrid('setPostDataItem',"selectedIdsChange",true);
						// empty the current selection
						$grid.jqGrid('setPostDataItem',"selectedRows",[]);
					}
					if(opts.multiResultInput != "")
					{
						$("#"+opts.multiResultInput).val("");
					}
				}
			}
			lookupText.val(theValue);
		}
	}
	
	/**
	 * Method for reloading the grid for getting the data from db
	 * @param {Object} lookupUrl
	 * @param {Object} lookupDatatype
	 * @param {Object} lookupPages
	 * @param {Object} lookupTxt
	 * @param {Object} gridtab
	 * @param {Object} overlay
	 * @param {Object} lookupId
	 * @param {Object} lookupDiv
	 * @param {Object} pagerid
	 * @param {Object} spanLookup
	 * @param {Object} searchElement
	 * @param {Object} keylistvalues//PathSolutions [Navas] [Added argument for getting the paramList in reload]
	 * @param {Object} tblCellId	//PathSolutions [Navas] [Added argument for getting the paramList in reload]
	 * @param {Object} _tblRowid	//PathSolutions [Navas] [Added argument for getting the paramList in reload]
	 * @param json Object moreParams	additional params that could be used for control
	 */
	function gridReload(lookupUrl,lookupDatatype,lookupPages,lookupTxt,gridtab,overlay,lookupId,lookupDiv,pagerid,spanLookup,searchCols,keylistvalues,tblCellId,_tblRowid,moreParams){
		$grid = $(document.getElementById(gridtab))
		$grid.blur();
		$grid.jqGrid('resetSelection');
		$(document.getElementById(overlay)).show();

		//TP 887297, if not to load data is not set to true when livesearch lookup is opened then need to reload the grid
		var isToReloadData = (moreParams == undefined || (moreParams !== undefined && 
				((typeof moreParams.dontLoadData != 'boolean')? moreParams.dontLoadData !== "true": !moreParams.dontLoadData)));
		
		var arr;
		if (typeof keylistvalues === "object")
			arr = keylistvalues ; //get the params constructed as in the first ajax of construction of lookup
		else
			arr = getParamListValues(keylistvalues,tblCellId,_tblRowid,gridtab);//PathSolutions [Navas] [Method for getting the paramList in reload]
		$lookupTxt = $(document.getElementById(lookupTxt));
		//arr["myData"] = $lookupTxt.val();
		// setting the searchable Columns if automaticaly specified
		if(searchCols != null)
		{
			arr["liveSearchCols"] = searchCols;
		}

		$grid.jqGrid('setGridParam',{url:lookupUrl,datatype:lookupDatatype,postData: arr,page:lookupPages});
		if(isToReloadData)
		{
			$grid.trigger("reloadGrid");
		}
		else
		{		
			$grid.jqGrid('clearGridData');//TP 887297, if not to load data when livesearch lookup is opened then empty grid data in case opened several times
			$grid.loadCompleted = true;// in case of dontLoadData then the grid need to set loadCompleted when openning the livesearch
		}
		setGridPosition(lookupId,lookupDiv,lookupTxt,spanLookup,overlay,gridtab,pagerid);
	}
	
	/**
	 * Method for constructing the search window and data
	 * @param {Object} lookupId
	 * @param {Object} lookupDiv
	 * @param {Object} lookupTxt
	 * @param {Object} spanLookup
	 * @param {Object} overlay
	 * @param {Object} gridtab
	 * @param {Object} pagerid
	 * @param {Object} keylist
	 * @param {Object} action
	 * @param {Object} actionMethod
	 * @param {Object} dtype
	 * @param {Object} width
	 * @param {Object} lookupUrl
	 * @param {Object} hdEnter
	 * @param {Object} dynHdResultId
	 * @param {Object} okMethod
	 * @param {Object} searchElement
	 * @param {Object} autoSearch
	 * @param {Object} multiSelect
	 * @param {Object} selectColumn
	 * @param {Object} dependency
	 * @param {Object} dependencySrc
	 * @param {Object} parameter
	 * @param {Object} readOnlyModeValue
	 */
	function liveSearch(liveSearchObj)	
	{
		search(liveSearchObj);
	}	
	/**
	 * Method for constructing the search window and data in grid
	 * @param {Object} lookupId
	 * @param {Object} lookupDiv
	 * @param {Object} lookupTxt
	 * @param {Object} spanLookup
	 * @param {Object} overlay
	 * @param {Object} gridtab
	 * @param {Object} pagerid
	 * @param {Object} keylist
	 * @param {Object} action
	 * @param {Object} actionMethod
	 * @param {Object} dtype
	 * @param {Object} width
	 * @param {Object} lookupUrl
	 * @param {Object} hdEnter
	 * @param {Object} dynHdResultId
	 * @param {Object} okMethod
	 * @param {Object} searchElement
	 * @param {Object} autoSearch
	 * @param {Object} tblCellId
	 * @param {Object} multiSelect
	 * @param {Object} selectColumn
	 * @param {Object} dependencyValue
	 * @param {Object} dependencySrcValue
	 * @param {Object} parameterValue
	 * @param {Object} readOnlyModeValue
	 * @return {TypeName} 
	 */
	function search(liveSearchObj)
  	{	
		var dynHdResultId = liveSearchObj.resultList 
		var lookupId = liveSearchObj.lookupId 
		var lookupDiv = liveSearchObj.lookupDiv
		var lookupTxt = liveSearchObj.lookupTxt 
		var spanLookup = liveSearchObj.spanLookup 
		var overlay = liveSearchObj.overlay  
		var gridtab = liveSearchObj.gridtab  
		var pagerid = liveSearchObj.pagerid  
		var okMethod = liveSearchObj.onOkMethod 
		var searchElement = liveSearchObj.searchElement
		var selectColumn = liveSearchObj.selectColumn 
		var selColArr = (typeof selectColumn != "undefined" && selectColumn != null) ? selectColumn.split(",") : {};
		var multiSelect = liveSearchObj.multiSelect
		var resultList = liveSearchObj.resultList 
		var dependencyValue = liveSearchObj.dependencyValue
		var dependencySrcValue = liveSearchObj.dependencySrcValue
		var parameterValue = liveSearchObj.parameterValue
		var readOnlyModeValue = liveSearchObj.readOnlyModeValue 
		var autoSearch = liveSearchObj.autoSearch
		var tblCellId = liveSearchObj.tblCellId
		var gridId = liveSearchObj.gridId 
		var gridRowId = liveSearchObj.gridRowId
		var reConstruct = liveSearchObj.reConstruct;
		var multiResultInput = liveSearchObj.multiResultInput;
		var dontLoadData = (typeof liveSearchObj.dontLoadData != "undefined" && liveSearchObj.dontLoadData != null) ? liveSearchObj.dontLoadData : false;
		var reBldMltiSelOnDep = (typeof liveSearchObj.reBldMltiSelOnDep != "undefined" && liveSearchObj.reBldMltiSelOnDep != null) ? liveSearchObj.reBldMltiSelOnDep :"false";
		$lookupTxt = $(document.getElementById(lookupTxt));
		var customBtnData = $lookupTxt.data('customBtnData');
		
		$(document).ready(function() {
			if($(document.getElementById(spanLookup)).hasClass('disableLiveSearch'))//PathSolutions [Navas] [returning back without opening search window it it is in disable mode ]
				return false;
			/**
			 * [MarwanMaddah]: multi-select readOnly mode  
			 * in case of multi selection and when call makeReadOnly function 
			 * the attribute reBldMltiSelOnDep will be filled
			 * and in this case the grid have to enter in the re-construction again even if it is not the first opening   
			 */
			//Bug#973489 Reconstruction of live search components if the same lookup id is used in another screen
			// replace overlay contains meta-characters 
			var overlayLookup = overlay.replace(".", "\\.");
			//check number of lookups with same id
			if($("div[id="+overlayLookup+"]").length >1 )
			{
				//remove constructed lookup with same id from different screen
				//[class *= 'last'] will select all object with class that contains 'last' 
				$("div[id="+overlayLookup+"][class*='last']").remove();
			}
			$overlay = $(document.getElementById(overlay));
			if("true" == reBldMltiSelOnDep && !$overlay.hasClass("first"))
			{
				if($overlay.hasClass("last"))
				{
					$overlay.removeClass("last");
				}
				$overlay.addClass("first");
				
				reConstruct = "true";
				/**
	        	 * in case the arg reBldMltiSelOnDep filled from makeReadOnly as true
	        	 * and that will happen only in case of multiSelect liveSearch
	        	 * after recontruction will reset it to avoid the re-contruction on every lookup opening after the dependency. 
				 */
				liveSearchObj.reBldMltiSelOnDep = "false";
			}
			
			/**
			 * [MarwanMaddah]: in re-constraction case the grid will be unload 
			 *                  and refreshed from scratch 
			 * @param {Object} result
			 */
			if(typeof reConstruct!="undefined" && reConstruct!=null && reConstruct=="true")
			{
			   $(document.getElementById(gridtab)).jqGrid("GridUnload");
			}
			/**
			 * 
			 */
			$grid = $(document.getElementById(gridtab))
			$grid.resizable();
			jQuery.struts2_jquery.debug = true;
			jQuery.struts2_jquery.loadAtOnce = true;
			jQuery.struts2_jquery.minSuffix = "";
			jQuery.ajaxSettings.traditional = true;
			var multiSelectFlag = false;
			if(typeof multiSelect != "undefined" && multiSelect != null  && multiSelect.toUpperCase()== 'TRUE')
				multiSelectFlag = true;
			/**
			 * [MarwanMaddah]
			 * add and fill new boolean value based on the readOnlyModeValue 
			 * to send it as boolean to the grid object
			 */
			var lkpReadOnlyMode = false;
			if(typeof readOnlyModeValue != "undefined" && readOnlyModeValue != null  && readOnlyModeValue.toUpperCase()== 'TRUE')
			{				
				lkpReadOnlyMode = true;
			}
			/**
			 * 
			 */
			var overlayClickFlag = false;
			var keylistvalues = liveSearchObj.paramList;//PathSolutions [Navas] [dierctly taking values]
			var autosize = false;
			var _tblRowid = null;
			if(tblCellId != null)
				 _tblRowid = lookupId.substring(lookupId.indexOf("_")+1,lookupId.indexOf(tblCellId) - 1); //lookupid starts with liveSearchTb_
			var myData = getParamListValues(keylistvalues,tblCellId,_tblRowid,gridId,gridtab);//PathSolutions [Navas] [seperated as a method for getting param where clause values]
			$.ajaxSetup ({
			  cache: false
			 });
			
			var encActionName = liveSearchObj.actionName
			encActionName = encActionName.replace(/&amp;/g, '&'); //in case string was encoded 
			$.ajax(
			    {
			    	
			       type: "POST",
			       url: encActionName,
			       /**
			        * myData : Where clause from jsp(column name or index and corresponding component id) 
			        * From action class we can get the value by using getParameter of request object by 
			        * passing the index or column name which set from jsp (request.getParameter("column1")
			        * @param {Object} result
			        */
			       data: myData, 
			       dataType: "json",
			       success: function(result)
			       {
					/**Added by Richie for #BUG 691088 */
					if (typeof result["_error"] == "undefined" || result["_error"] == null) {
					/** End Richie */
			    		colD 		= 	result.gridModel;			            
			            colN 		= 	result._colNames;		
			            colM 		= 	result._colModel;
			            lookupUrl 	=  	jQuery.contextPath + result.grid.url
			            		 $.struts2_jquery.require("jqgrid/i18n/grid.locale-" + $.struts2_jquery.gridLocal + ".js",
								function() {
							$.jgrid.no_legacy_api = true;
							$.jgrid.useJSON = true;
						});
			            
			            $.struts2_jquery.require("jqgrid/grid.base.js");
						$.struts2_jquery.require("jqgrid/jquery.fmatter.js");
						$.struts2_jquery.require("jqgrid/grid.custom.js");
						$.struts2_jquery.require("jqgrid/grid.common.js");
						$.struts2_jquery.require("jqgrid/plugins/grid.setcolumns.js");
						$.struts2_jquery.require("jqgrid/plugins/grid.postext.js");
						$.struts2_jquery.require("jqgrid/grid.jqueryui.js");
						$.struts2_jquery.require("jqgrid/grid.formedit.js");
						$.struts2_jquery.require("jqgrid/grid.filter.js"); // added for advanced search to work in case grid is not loaded yet
						$.struts2_jquery.requireCss("jqgrid/style/ui.jqgrid.css",jQuery.scriptPath);
						$overlay = $(document.getElementById(overlay));
						/**
						 * 
						 */
						if($overlay.hasClass('first')){	
							
			            	var lookuptxt_val = $lookupTxt.val();// to set search value to filter in the grid
			            	if(lookuptxt_val === undefined)
			            		lookuptxt_val="";
			            	/**
			            	 * [Marwan Maddah]:Based on the reConstruct flag i will remove the first class or not
			            	 * because in case the reConstruct flag is true, the grid have to be refreshed and re construct on every access
			            	 * we change the checking in this place on the original variable that is exists on the liveSearch object
			            	 * because on case of liveSearch multi selection the reConstruct variable will be changed to true to force
			            	 * The reconstruction of the lookup for the first only opening after makeReadOnly process  
			            	 */
			            	if(typeof liveSearchObj.reConstruct=="undefined" || liveSearchObj.reConstruct==null || liveSearchObj.reConstruct!="true")
			            	{			            		
							  $overlay.removeClass("first").addClass("last");
			            	}
							/**
							 * 
							 */
			            	if(result.grid.searchColumns != null)
							{
							  myData["liveSearchCols"] = result.grid.searchColumns;
							}
							var _gridOptions = {
									
									url: jQuery.contextPath + result.grid.url,				
									mtype: "POST",
									postData:myData,
					                jsonReader : {
					                    repeatitems: false,
					                    root:"gridModel",
					                    cell: ""
					                },
				                	datatype: 'json',
					                colNames:colN,
					                colModel :colM,
					                /**
					                 * [PathSolutions-MarwanMaddah]: grid Columns Sortable management
					                 */
					                sortable:(result.grid.sortable!=null && result.grid.sortable!="undefined")?result.grid.sortable:true,
                                    columnsOrder:result.grid.columnsOrder,
					                id:result.grid.id,
									direction: (document.dir)? document.dir: "ltr",
					                pager:"#"+pagerid,
				                	rowNum:result.grid.rowNum,
				                	gridModel:result.grid.gridModel,			                
				                	rowList:result.grid.rowList,
				                	viewrecords:result.grid.viewrecords,						
					    			sortorder: "asc",
									height: "110",
									autoencode : true,//TP 876384 XSS issue reported D A S
					    			hidden:result.grid.hidden,
					    			shrinkToFit:(result.grid.shrinkToFit.toLowerCase() === "true" ? true : false),
					    			multiselect: multiSelectFlag, //PathSolutions [Navas] [Enabling the muliselect]
					    			lkpReadOnlyMode:lkpReadOnlyMode,
					    			loadComplete:function(){
					                	//PathSolutions (Denisk) set the grid width and direction only only on first data fetch not after other fetches like search
					                	var loadComp =  $grid.loadCompleted? true:false;
					                	if(!loadComp)
					                	{
					                		if(multiSelectFlag)
				                			{
				                				//set chosen selections on load in postdata object
												$grid.jqGrid('setPostDataItem',"selectedIdsChange",false);
												/**
												 * [PathSolution-MarwanMaddah]: in case of multi selection liveSearch 
												 * and the re construction is false
												 * will override the cached selected records by the data that is exists in the related hidden input
												 * and in case it is empty 
												 * the cached selected rows will be unchecked.  
												 */
												var selResultObjList = [];
						                		if(multiResultInput != "" && $("#"+multiResultInput).val() != "")
					                			{
						                			selResultObjList = $.parseJSON($("#"+multiResultInput).val())["root"];
					                			}
						                		$grid.jqGrid('setPostDataItem',"selectedRows", selResultObjList);
				                			}
					                		var gridView = $grid.closest("div.ui-jqgrid-view");
											if (document.dir == 'rtl')
											{
											  var bDiv = gridView.find(".ui-jqgrid-bdiv > div");
											  bDiv.css("float","right");
											}
											// setting parent width to the grid to correct scroll between headers and data
											var gridViewWidth = gridView.width();
	            							$grid.jqGrid("setGridWidth",gridViewWidth);
	            							$grid.loadCompleted = true;
	            							
	            							if(result.grid.filter)
	            							{
		            							//set focus on first column in search filter row
												var firstFilterCol = "gs_" + colM[0].name;
												var parentDiv = "gbox_"+gridtab;
												var inptObj = $(document.getElementById(parentDiv)).find("input[id='"+firstFilterCol +"']"); 
												if(inptObj.length > 0)
													$(inptObj[0]).focus();
											}
            							}
			                			//in case grid has selectedIds then take rowids and select them
										var selectedRows = $grid.jqGrid('getPostDataItem',"selectedRows");//;$("#"+multiResultInput).val()
										if(typeof selectedRows != "undefined" && selectedRows != null)
										{
											var allGridRows = $grid.jqGrid('getRowData');
											var toSelRow = true;
											$.each( allGridRows, function(index, rowdata) 
											{
												toSelRow = true;
												$.each( selectedRows, function(i, row) 
												{
													toSelRow = true;
													$.each(selColArr, function(idx, val)
													{
														if(rowdata[val] != row[val])
														{
															toSelRow = false;
															return;
														}
													})
													if(toSelRow === true)
													{
														$grid.jqGrid("setSelection",index +1,false);
														return;
													}
												})
											})
										}
								   	},
					                ondblClickRow:function(row){
								   		if(multiSelectFlag)
							   			{
								   			return;
							   			}
								   		var hasOkMethod = (okMethod.length>0).toString();
								   			if(tblCellId == null)//this will call the setting of resultlist values and trigger their change event accordingly
									   				onSelectRow(row,dynHdResultId,searchElement,null,null,null,hasOkMethod);
								   			else
							   				{
	//					   						$.data(document.getElementById(lookupTxt),"toCallDepChange",false); //not to call the dependency(in grid.inlineedit.js) again bcoz onchange event is fired
								   				
								   				//this will call the setting of resultlist values and trigger their change event accordingly
								   				onSelectRow(row,dynHdResultId,searchElement,tblCellId,lookupId,gridId,hasOkMethod);
							   				}
							   			
								   		if(okMethod.length>0){
								   			executeMethod(okMethod);//calling method dynamically
									   		/**
									   		 * [PathSolutions-MarwanMaddah]: in case of dynamic lookup 
									   		 * the overlay will be removed from the body and will build as it was in the inilial load.
									   		 * @param {Object} okMethod
									   		 */
								   			if(typeof reConstruct!="undefined" && reConstruct!=null && reConstruct!="" && reConstruct=="true")
					                        {				   	
					                           initializeAfterRemove(overlay,spanLookup,gridtab,pagerid);
					                        }
	                                        else
	                                        {                                        	
												$overlay.hide();
	                                        }
								   			$lookupTxt.focus();
										}
										//if there is custom btn data when dbl clicking the livesearch execute call custom btn and check wether to continue or no
								   		var stopPropagation = false;
								   		if(customBtnData != undefined && customBtnData!="undefined" && customBtnData!=null )
								   		{
								   			stopPropagation = customBtnActionCall(lookupTxt,'0',customBtnData.proceedOnFail);
								   		}
								   		if(!stopPropagation)
								   		{
								   			
									   		if($.trim(dependencyValue).length>0 && $.trim(dependencySrcValue).length>0)
								   			{
									   			var _callDep = true;
								   				afterDepEvent = $lookupTxt.attr("afterDepEvent");
								   				beforeDepEvent= $lookupTxt.attr("beforeDepEvent");
								   				if(typeof gridId != "undefined" && gridId != null)
							   					{
								   					afterDepEvent = liveSearchObj.afterDepEvent
								   					//means the livesearch column value is not set through resultlist attribute which means dependency did not already fire, then fire it manually
								   					if(resultList.indexOf(tblCellId) < 0)   
							   						{
									   					beforeDepEvent = liveSearchObj.beforeDepEvent
								   						if(beforeDepEvent != "")
								   							_callDep = eval(beforeDepEvent);
									   					if(typeof _callDep == "undefined" || _callDep+"" != "false") 
							   								$lookupTxt.trigger("_event.dependency");//callGridDependency(gridId ,dependencyValue,dependencySrcValue,parameterValue,gridRowId,afterDepEvent,tblCellId);
							   						}
							   					}
								   				else
							   					{
								   					
								   					if(typeof beforeDepEvent != "undefined" && beforeDepEvent != "")
							   						{
								   						_callDep = eval(beforeDepEvent);
							   						}
								   					if(typeof _callDep == "undefined" || _callDep +"" != "false")
								   					{
								   						$lookupTxt.trigger("_event.dependency");
													}
							   					}
								   			}
									   		//Case of livesearch inside grid, trigger change event when livesearch column is not in resultlist(otherwise already called automatically from calling of onSelectRow)
									   		else if(typeof gridId != "undefined" && gridId != null && resultList.indexOf(tblCellId) < 0)
								   			{
									   			$lookupTxt.trigger('change');
								   			}
								   		}
								   	},
								   	onSelectRow:function(rowId, status, e){
								   		var row = $grid.jqGrid('getRowData',rowId);
								   		if(multiSelectFlag)
							   			{
								   			applyMultiSelect(rowId,status);
							   			}
								   		_selectedRow = row;
			   				          /*  var isHidden = $(document.getElementById(overlay)).css("display");
							            if (row && isHidden != 'none')	{
											 $(document.getElementById(lookupTxt)).val($("#"+gridtab).jqGrid('getCell',row,''+searchElement));
										}*/		        
								   	},
								   	onSelectAll : function(selectedRowInd, selected) {
   										$.each(selectedRowInd, function(idx, val)
										{
				   							 applyMultiSelect(selectedRowInd[idx],selected)
										})
  									},
  									gridColSortRight: $lookupTxt.attr("gridColSortRight")
								};
								//PathSolutions Denisk, in order to remove the flip pages from grid footer and query all data
								var _theFlipButton = result.grid.pagerButtons != undefined ? result.grid.pagerButtons: true;
								if(_theFlipButton !== true && _theFlipButton !== "true")
								{
									_gridOptions.pgbuttons = _theFlipButton;
									_gridOptions.rowList = [];
									_gridOptions.pgtext = null;
									_gridOptions.loadonce = true;
									_gridOptions.viewrecords = "false";
									
									/**
									 * [PathSolution-MarwanMaddah] in case pageButton=false, 
									 * we define the rowNum 
									 * to avoid "the missing records problem" in case the size of data is greater than 20(the default value)
									 */
									_gridOptions.rowNum = 1000000;
								}
								if(colN.length<=2)
								{
									_gridOptions.shrinkToFit = true;
								}
								
								//TP 887297
								if(dontLoadData)
								{
									_gridOptions.dontLoadData = dontLoadData;
								}

								$grid.jqGrid(_gridOptions);
								if(result.grid.filter== true && $(document.getElementById(lookupId)).html() != ""){
									$grid.jqGrid('navGrid',"#"+pagerid,{del:false,add:false,edit:false},{},{},{},{closeAfterSearch: true,multipleSearch:true});
									if(multiSelectFlag){
										var results = "";
										if(selectColumn == null || selectColumn.length == 0)
											selectColumn = searchElement;
										var selColArr = selectColumn.split(",");
										var resultsArr = {};
										var resall = [];
										/**
										 * [PathSolutions - MarwanMaddah]: multi-select readOnly mode 
										 * added checking on readOnlyModeValue 
										 * to not adding the select button in case the multi-selection livesearch is on readOnly mode 
										 */
										if("true"!=readOnlyModeValue)
										{											
											$grid.jqGrid('navButtonAdd',"#"+pagerid,{caption:"",title:"Select",buttonicon :"ui-icon-circle-check",
												onClickButton:function(){
													if(multiResultInput != "" && $grid.jqGrid('getPostDataItem',"selectedIdsChange") === true ) //undefined,null or false means no changes in selection
													{
														var selections = $grid.jqGrid('getPostDataItem',"selectedRows");
														$("#"+multiResultInput).val("{"+ "\"root\":"+JSON.stringify(selections)+"}") ;	
														$lookupTxt.val(selections.length + " "+ Selected_key);
														/**
														 * [PathSolutions - MarwanMaddah]
														 * #BUG 497056 After selecting an application name in Populate Access 
														 * to Applications field.On clicking Update button wrong confirmation message is displayed
														 * set the changeTrack to true to take the changes into consideration
														 */
														var _formparent = $lookupTxt.parents("form").get(0);
														if(_formparent != null && $(_formparent).attr("chTrk")=== 'true')
														{
															//check whether the $lookupTxt is inside exculded div (in this case we will not apply the change track)
															var hp = hasParentById($lookupTxt ,$(_formparent).attr("excltrk"))
															if(hp==false)
															{
																$.data(_formparent,"changeTrack",true);
															}
														}
														/**
														 * 
														 */														
														executeSelection(multiSelectFlag,$overlay,$lookupTxt);
													}
													hideSearchWindow(overlay, lookupTxt)
												} 
											});
										}
									}									
									$grid.jqGrid('bindKeys', {"onEnter":function( _tblRowid) {
										var hasOkMethod = (okMethod.length>0).toString();
										
										if(tblCellId == null)
											onSelectRow(_tblRowid,dynHdResultId, searchElement,null,null,null,hasOkMethod);
										else
										{
											/**
											 * [PathSolutions-MarwanMaddah]
											 * changed _selectedRow to _tblRowid based on patriciaNassrallah mail 
											 * subject : Live search inside grid Issue on Enter
											 */
											onSelectRow(_tblRowid,dynHdResultId,searchElement,tblCellId,lookupId,gridId,hasOkMethod);
										}
										if(okMethod.length>0){	
								   			executeMethod(okMethod);//calling method dynamically
									   		/**
									   		 * [PathSolutions-MarwanMaddah]: in case of dynamic lookup 
									   		 * the overlay will be removed from the body and will build as it was in the inilial load.
									   		 * @param {Object} okMethod
									   		 */
								   			if(typeof reConstruct!="undefined" && reConstruct!=null && reConstruct!="" && reConstruct=="true")
					                        {				   	
					                           initializeAfterRemove(overlay,spanLookup,gridtab,pagerid);
					                        }
	                                        else
	                                        {                                        	
												$overlay.hide();
	                                        }
											$lookupTxt.focus();
										}
//								   		else
//									   		onSelectRow(_tblRowid,dynHdResultId, searchElement,null,null);//PathSolutions [Navas] [Commeneted and moved to above]
										var stopPropagation = false;
								   		if(customBtnData != undefined && customBtnData!="undefined" && customBtnData!=null )
								   		{
								   			stopPropagation = customBtnActionCall(lookupTxt,'0',customBtnData.proceedOnFail);
								   		}
								   		if(!stopPropagation)
								   		{
										
											if($.trim(dependencyValue).length>0 && $.trim(dependencySrcValue).length>0)
											{
													var _callDep = true;
													if(typeof gridId != "undefined" && gridId != null)
								   					{
									   					afterDepEvent = liveSearchObj.afterDepEvent;
									   					//means that livesearch column value is not set through resultlist attribute which means dependency did not already fire, then fire it manually
									   					if(resultList.indexOf(tblCellId) < 0)
									   					{
										   					beforeDepEvent = liveSearchObj.beforeDepEvent;
									   						if(beforeDepEvent != "")
									   							_callDep = eval(beforeDepEvent);
										   					if(typeof _callDep == "undefined" || _callDep+"" != "false") 
								   								$lookupTxt.trigger("_event.dependency");//callGridDependency(gridId ,dependencyValue,dependencySrcValue,parameterValue,gridRowId,afterDepEvent,tblCellId);
									   					}
								   					}
									   				else
								   					{
														afterDepEvent = $lookupTxt.attr("afterDepEvent");
														beforeDepEvent= $lookupTxt.attr("beforeDepEvent");
														if(typeof beforeDepEvent != "undefined" && beforeDepEvent != "")
								   							_callDep = eval(beforeDepEvent);
														if(typeof _callDep == "undefined" || _callDep+"" != "false")
														{
															$lookupTxt.trigger("_event.dependency");
														}
								   					}
											}
											else
											{
												if(typeof gridId != "undefined" && gridId != null && resultList.indexOf(tblCellId) < 0)
													$lookupTxt.trigger("change");
											}
								   		}
										
									} } );
									$grid.jqGrid('filterToolbar',{searchOnEnter : false});
								}
								
								//retrieve number of non hidden columns to set width accordingly
								var nonHidCols = colM.length;
								for(var x = 0;x<colM.length; x++)
								{
									if(colM[x].hidden === true)
										nonHidCols --;
								}
								if(nonHidCols >=3 )
								{
									$grid.jqGrid('gridResize',{minWidth:465,maxWidth:600,minHeight:130, maxHeight:300});	
									width = 465; 
								}
								else
								{ 
									$grid.jqGrid('gridResize',{minWidth:310,maxWidth:450,minHeight:45, maxHeight:200});
									width = 400;
								}
								setwidthgrd(lookupId,lookupDiv,lookupTxt,spanLookup,overlay,gridtab,pagerid,width,reConstruct);								
							}
							else
							{
								if(dontLoadData)
								{
									$grid[0].clearToolbar(false,false);
								}
								else
								{
									$grid[0].clearToolbar(false); // to clear the search values in the grid toolbar search
								}
								var moreParams = {dontLoadData:dontLoadData};//TP 887297, if not to load data when livesearch lookup is opened then need to make it empty
								//$grid.jqGrid('setGridParam',{search:false});
								var srchCols = result.grid.searchColumns
								//sending myData instead of keylistvalues as parameters to grid url, no need to reconstruct the paramlist again already sent in first ajax 
				            	gridReload(lookupUrl,'json',1,lookupTxt,gridtab,overlay,lookupId,lookupDiv,pagerid,spanLookup,srchCols,myData,tblCellId,_tblRowid,moreParams);
								//on opening the lookup grid reset the scroll bar to the begining #630903
								if (document.dir == 'rtl' && !$.browser.msie)
								{ // TP 812390
									$grid.closest(".ui-jqgrid-bdiv").scrollLeft( $overlay.width());
								}
								else
								{
									$grid.closest(".ui-jqgrid-bdiv").scrollLeft( 0 );
								}
							}
			       }
				  }
			    });		
			
 			});

			function applyMultiSelect(rowId,status)
			{
				var row = $grid.jqGrid('getRowData',rowId);
		   		$grid.jqGrid('setPostDataItem',"selectedIdsChange",true);
		   		var selectedRows =  $grid.jqGrid('getPostDataItem',"selectedRows");
		   		if(typeof selectedRows == "undefined" || selectedRows == null)
	   			{
		   			selectedRows = [];
	   			}
   				if(status) //add it to the selectedRowsObject
   				{
	   					var neededArr = {}
   						$.each(selColArr, function(idx, val)
						{
   							neededArr[val] = row[val]
						})
						if(JSON.stringify(selectedRows).indexOf(JSON.stringify(neededArr)) < 0)
						{
							selectedRows.push(neededArr)
							$grid.jqGrid('setPostDataItem',"selectedRows",selectedRows);
						}
   				}
	   			else
   				{
	   				var toDeleteRow = true;
	   				var newSelectedRows = [];
   						//remove from selectedRows
					$.each( selectedRows, function(i, rowdata) 
					{
						toDeleteRow = true;
						$.each(selColArr, function(idx, val)
						{
							if(rowdata[val] != row[val])
							{
								toDeleteRow = false;
								return;
							}
						})
						if(!toDeleteRow)
						{
							newSelectedRows.push(rowdata);
						}
					})
					$grid.jqGrid('setPostDataItem',"selectedRows",newSelectedRows);
   				}
			}
			
			function executeSelection(multiSelectFlag,$overlay,$lookupTxt,row)
			{
				var hasOkMethod =  (liveSearchObj.onOkMethod.length>0).toString();
				if(!multiSelectFlag)
	   			{
		   			if(liveSearchObj.tblCellId == null)//this will call the setting of resultlist values and trigger their change event accordingly
			   				onSelectRow(row,liveSearchObj.resultList,liveSearchObj.searchElement,null,null,null,hasOkMethod);
		   			else
	   				{
		   				//this will call the setting of resultlist values and trigger their change event accordingly
		   				onSelectRow(row,liveSearchObj.resultList,liveSearchObj.searchElement,liveSearchObj.tblCellId,liveSearchObj.lookupId,liveSearchObj.gridId,hasOkMethod);
	   				}
	   			}
		   		if(liveSearchObj.onOkMethod.length>0){
		   			executeMethod(liveSearchObj.onOkMethod);//calling method dynamically
		   			if(hasOkMethod !== "true" && typeof liveSearchObj.reConstruct!="undefined" && liveSearchObj.reConstruct!=null && liveSearchObj.reConstruct!="" && liveSearchObj.reConstruct=="true")
                    {		
                       initializeAfterRemove(overlay,spanLookup,gridtab,pagerid);
                    }
                    else
                    { 
						$overlay.hide();
					}
					$lookupTxt.focus();
				}
		   		var stopPropagation = false;
		   		if(customBtnData != undefined && customBtnData!="undefined" && customBtnData!=null )
		   		{
		   			stopPropagation = customBtnActionCall(lookupTxt, '0',customBtnData.proceedOnFail);
		   		}
		   		if(!stopPropagation)
		   		{
			   		if($.trim(liveSearchObj.dependencyValue).length>0 && $.trim(liveSearchObj.dependencySrcValue).length>0)
		   			{
			   			var _callDep = true;
		   				afterDepEvent = $lookupTxt.attr("afterDepEvent");
		   				beforeDepEvent= $lookupTxt.attr("beforeDepEvent");
		   				if(typeof liveSearchObj.gridId != "undefined" && liveSearchObj.gridId != null)
	   					{
		   					afterDepEvent = liveSearchObj.afterDepEvent
		   					//means the livesearch column value is not set through resultlist attribute which means dependency did not already fire, then fire it manually
		   					if(resultList.indexOf(liveSearchObj.tblCellId) < 0)   
	   						{
			   					beforeDepEvent = liveSearchObj.beforeDepEvent
		   						if(beforeDepEvent != "")
		   							_callDep = eval(beforeDepEvent);
			   					if(typeof _callDep == "undefined" || _callDep+"" != "false") 
	   								$lookupTxt.trigger("_event.dependency");//callGridDependency(gridId ,dependencyValue,dependencySrcValue,parameterValue,gridRowId,afterDepEvent,tblCellId);
	   						}
	   					}
		   				else
	   					{
		   					if(typeof beforeDepEvent != "undefined" && beforeDepEvent != "")
	   						{
		   						_callDep = eval(beforeDepEvent);
	   						}
		   					if(typeof _callDep == "undefined" || _callDep +"" != "false")
		   					{
		   						$lookupTxt.trigger("_event.dependency");
							}
	   					}
		   			}
			   		//Case of livesearch inside grid, trigger change event when livesearch column is not in resultlist(otherwise already called automatically from calling of onSelectRow)
			   		else if(typeof liveSearchObj.gridId != "undefined" && liveSearchObj.gridId != null && liveSearchObj.resultList.indexOf(liveSearchObj.tblCellId) < 0)
		   			{
			   			$lookupTxt.trigger('change');
		   			}
		   		}
			}
			
			/**
			 * Method to call dynamically any method
			 * @param {Object} okMethod
			 */
			function executeMethod(okMethod){
				eval(okMethod);
			}
			
			/**
			 * Adjust the position after resizing the browser.
			 */
			function resizeStuff() {
				 var isHidden = $(document.getElementById(overlay)).css("display");
				 if(isHidden!='none'){
				 	setGridPosition(lookupId,lookupDiv,lookupTxt,spanLookup,overlay,gridtab,pagerid);//Reposition the search window 
				 }
			}
			
			var TO = false;//Flag for registering the resize function
			$(window).resize(function(){
			 if(TO !== false)
			    clearTimeout(TO);
			 TO = setTimeout(resizeStuff, 200); //200 is time in miliseconds
			});

			/**
			 * For live serach while typing from the text field
			 * @param {Object} event
			 * @return {TypeName} 
			 */
			$(document.getElementById(lookupTxt)).keyup(function(event)
				{
				//PathSolutions [Navas] [Opens the search window only on write mode]
				if(($(document.getElementById(spanLookup)).hasClass('disableLiveSearch'))||(autoSearch == "false" && $(document.getElementById(overlay)).css("display") == "none") || event.which == 13 || event.which == 38 || event.which == 39 || event.which == 37)
				{
					//Avoiding the conflict issue while pressing enter key on the selected row from the grid
					return ;						
				}
				else if(event.which == 40){
					selectFirstRecord();
				}
										
			});	
			
			
			/**
			 * Hides the search component when the user press esc key while the focus in the search window itself.
			 * @param {Object} event
			 */
			$(document.getElementById(lookupId)).keyup(function(event){
				if(event.which == 27)//On escape of the text field
				{
					hideSearchWindow(overlay, lookupTxt,spanLookup,gridtab,pagerid,reConstruct);//hides the search window
				}	
			});	
			
			/**
			 * Hides the search component when the user clicks outside the search window.
			 * @param {Object} event
			 */
			$(document).mousedown(function(event){
				//if there isnt any opened datepicker or there is an opened datepicker and we clicked outside it , then we need to hide the search window
 				if($.datepicker._datepickerShowing == false || $.datepicker._isDatePickerExternalClick(event))
				{
 					hideSearchWindow(overlay, lookupTxt,spanLookup,gridtab,pagerid,reConstruct);//hides the search window
				}
				
				if(event.target)
				{
					//after opening popup of livesearch and directly clicking inside an input focus was being set on livesearch and new input both 
					//so on tab dependency of livesearch was fire and not dependency of clicked input
					$(event.target).focus();
				}
			}); 
			
			/**
			 * Stop propagating the mouse down event with the overlay div so that it should not close it the user click on it
			 * @param {Object} event
			 */
			$(document.getElementById(overlay)).mousedown(function(event){
				event.stopPropagation();
			}); 
			
			/**
			 * Closing the search dialog while pressing esc key while the foucus in the search textfield
			 * @param {Object} event
			 */
			$(document.getElementById(overlay)).keyup(function(event){
				if(event.which == 27)//On escape of the grid
				{
					hideSearchWindow(overlay, lookupTxt,spanLookup,gridtab,pagerid,reConstruct);//hides the search window
				}	
			});
			
			/**
			 * Tab is pressed while th focus is on the search window itself
			 * @param {Object} event
			 */
			//(PathSolution Denisk not to hide popup on tabing inside the popup)
			/*$(document.getElementById(overlay)).keydown(function(event) {
				if (event.keyCode == 9) {
					hideSearchWindow();//hides the search window
				}
			});	
			*/

			/**
			 * Select the first record in the grid and focus comes to the first row
			 */
			function selectFirstRecord(){
					var isHidden = $(document.getElementById(overlay)).css("display");
					if(isHidden!='none'){
						$grid.focus();
						$grid.jqGrid('setSelection',"1").focus();
						$grid.css("outline-style","none");
					}
			}
		
			/**
			 * On double clicking/Press enter key for a selected row 
			 * @param {Object} _tblRowid
			 * @param {Object} resultlist
			 * @param {Object} searchElement
			 */
			function onSelectRow(_tblRowid,resultlist,searchElement,tblCellId,lookupId,gridId, hasOkMethod){
				$spanLookup = $(document.getElementById(spanLookup)); 
				$overlay = $(document.getElementById(overlay)); 
				$lookupTxt = $(document.getElementById(lookupTxt))
				if($spanLookup.hasClass('disableLiveSearchText')){//PathSolutions [] [returning back without selecting the record in read only text mode ]
			   		/**
			   		 * [PathSolutions-MarwanMaddah]: in case of dynamic lookup 
			   		 * the overlay will be removed from the body and will build as it was in the inilial load.
			   		 * @param {Object} okMethod
			   		 */
		   			if(hasOkMethod !== "true" && typeof reConstruct!="undefined" && reConstruct!=null && reConstruct!="" && reConstruct=="true")
                    {		
                       initializeAfterRemove(overlay,spanLookup,gridtab,pagerid);
                    }
                    else
                    {                                        	
						$overlay.hide();
                    }
					return false;
				}
				var isHidden = $overlay.css("display");
	            if (_tblRowid && isHidden != 'none'){
					var selectedrecord = $grid.jqGrid('getRowData',_tblRowid);
					if(!$spanLookup.hasClass('disableLiveSearch'))
						{
							$lookupTxt.val($grid.jqGrid('getCell',_tblRowid,''+searchElement));
							//add form data that this element changed since change event does not fire for livesearch with dependency
							var _formparent = $lookupTxt.parents("form").get(0);
							if(_formparent != null && $(_formparent).attr("chTrk")=== 'true')
							{
								//check whether the $lookupTxt is inside exculded div (in this case we will not apply the change track)
								var hp = hasParentById($lookupTxt ,$(_formparent).attr("excltrk"))
								if(hp==false)
								{
									$.data(_formparent,"changeTrack",true);
								}
							}
						}
					okButtonfun(gridtab,resultlist,selectedrecord,tblCellId,lookupId,lookupTxt,gridId);
				}		        
		   		/**
		   		 * [PathSolutions-MarwanMaddah]: in case of dynamic lookup 
		   		 * the overlay will be removed from the body and will build as it was in the inilial load.
		   		 * @param {Object} okMethod
		   		 */
	   			if(hasOkMethod !== "true" && typeof reConstruct!="undefined" && reConstruct!=null && reConstruct!="" && reConstruct=="true")
                {			
                   initializeAfterRemove(overlay,spanLookup,gridtab,pagerid);
                }
                else
                {                                        	
					$overlay.hide();
                }
				$lookupTxt.focus();
			}		
			
			/**
			 * After double clicking/Press enter key for a selected row - Sets the results to the corresponding components 
			 * @param {Object} gridtab
			 * @param {Object} resultlist
			 * @param {Object} selectedrecord
			 */
			function okButtonfun(gridtab,resultlist,selectedrecord,tblCellId,_tblRowid,lookupTxt,gridId) {
				// in case of the grid, we are retrieving the _tblRowid of the row in order to use it in setting the value for the cell
				if(tblCellId != null)
				{
					_tblRowid = _tblRowid.substring(_tblRowid.indexOf("_")+1, _tblRowid.indexOf(tblCellId)-1);
				}
				else
					_tblRowid = "";
				
				if(resultlist){
					var arrMain=resultlist.split(",");
					var myData={}
					var arrMainLeng = arrMain.length;
					var _eltId, propName, propId; 
					if(arrMainLeng>0){
							for(var i=0;i<arrMainLeng;i++){	
								{
									propName = arrMain[i].split(":")[0];
									propId = arrMain[i].split(":")[1];
									_eltId = (_tblRowid != "" ?  _tblRowid + "_" : _tblRowid ) + propId
									if(_eltId.indexOf("_lookuptxt")> -1 && typeof gridId != "undefined" && gridId != null)
										_eltId += "_"+gridId;
									$_eltId = $(document.getElementById(_eltId));
									if(document.getElementById(_eltId) != null /*&& _eltId != lookupTxt*/)
									{
										$_eltId.val(selectedrecord[""+arrMain[i].split(":")[0]]);
										//trigger the onchange function for the parameter in the resultList 
	//									 if ( typeof $(document.getElementById(_tblRowid + propId)).attr("onchange") != "undefined")
//										if(typeof lookupTxt != "undefined" /*&& _eltId != lookupTxt*/)//do not trigger change on lookupTxt, only on other resultlist elements
										if(tblCellId != null && typeof gridId != "undefined" && gridId != null)
										{
											//when selecting/dblclicking row in livesearch popup should trigger dependency/change 
											$.data(document.getElementById(_eltId),"toCallDepChange",true)
										}
										$_eltId.trigger('change');
									}
									else
									{
										if(tblCellId != null && typeof gridId != "undefined" && gridId != null) //grid with non editable cell in the result list use setCell
										{
											$("#"+gridId).jqGrid("setCell",_tblRowid ,propId,selectedrecord[""+arrMain[i].split(":")[0]],"","",false);
										}
									}
								}
						}
					}	
					
					//add form data that this element changed since change event does not fire for livesearch with dependency
					var $lookupTxt = $(document.getElementById(lookupTxt))
					var _formparent = $lookupTxt.parents("form").get(0);
					if(_formparent != null && $(_formparent).attr("chTrk")=== 'true')
					{
						//check whether the $lookupTxt is inside exculded div (in this case we will not apply the change track)
						var hp = hasParentById($lookupTxt ,$(_formparent).attr("excltrk"))
						if(hp==false)
						{
							$.data(_formparent,"changeTrack",true);
						}
					}
				}  	
		  	}

			/**
			 * Test method for checking - override the obButtonfun() with custom method-The method should be specified in the tag level 
			 * @param {Object} arg1
			 */
			function testOvrdMethod(arg1){
				alert("testOvrdMethod arg1:    "+arg1[0]+"testOvrdMethod arg2:    "+arg1[1]+ "testOvrdMethod arg3 : "+arg1[2]);
			}
	}
	
	/**
	 * Hides the search window
	 */
	function hideSearchWindow(overlayId, lookupTxtId,spanLookup,gridtab,pagerid,reConstruct){
		$overlay = $(document.getElementById(overlayId));
		var isHidden = $overlay.css("display");
			if(isHidden!='none'){
				if(typeof reConstruct!="undefined" && reConstruct!=null && reConstruct!="" && reConstruct=="true")
				{				   	
				  initializeAfterRemove(overlayId,spanLookup,gridtab,pagerid);
				}
				else
				{
				  $overlay.hide(); 	
				}
				$(document.getElementById(lookupTxtId)).focus();
			}
	}
	/**
	 * Remove the overlay from body and reconstruct it as was it in the initial load
	 * @param {Object} overlayId
	 * @param {Object} spanLookup
	 * @param {Object} gridtab
	 * @param {Object} pagerid
	 */
	function initializeAfterRemove(overlayId,spanLookup,gridtab,pagerid)
	{
		$overlay.remove();
		var initialDiv = "<div id = '"+overlayId+"' class= 'first liveSearchOverlay'><table id = '"+gridtab+"'  border='0' ></table></div><div id = '"+pagerid+"'></div>";
	    $(document.getElementById(spanLookup)).after(initialDiv);
	}
			
	/**
	 * Method for getting the parameter list for live search
	 * @param {Object} keylistvalues
	 * @param {Object} tblCellId
	 * @param {Object} _tblRowid
	 * @return {TypeName} 
	 */
	function getParamListValues(keylistvalues,tblCellId,_tblRowid,gridId,gridtab){
		var cellVal = null;
		var myData = {};
		if(keylistvalues){
			var arrMain=keylistvalues.split(",");
			var arrMainLeng = arrMain.length;
			if(arrMainLeng>0){
				for(var i=0;i<arrMainLeng;i++){	
					if(tblCellId != null)
					{
						/** added in case of grid **/
						if(typeof gridId != "undefined")
						{
							var colname = arrMain[i].split(":")[1];
							if(colname.indexOf("_lookuptxt") > -1)
							{
								//remove it and keep only column name
								colname = colname.substring(0,colname.indexOf("_lookuptxt"));
							}
							cellVal = $("#"+gridId).jqGrid("getCell",_tblRowid, colname);
						
							// in case we have subgrid and the param is from the super grid. so we have to get the super table id and super table row id that had been added on the construction of subGridExpanded
							var tableId = $("#"+gridId).attr("parentTableId");
							var rowId = $("#"+gridId).attr("parentRowId");
							if((cellVal === false ||  cellVal === null || typeof cellVal == "undefined") && tableId && rowId)
							{
								cellVal = $("#"+tableId).jqGrid("getCell",rowId, colname);
							}
						}
						else
						{
							cellVal = $("#"+_tblRowid+"_"+arrMain[i].split(":")[1]).val();
						}
						
						if(cellVal === false ||  cellVal === null || typeof cellVal == "undefined")//case when the parameter is not in the grid
						{
							cellVal = returnHtmlEltValue(arrMain[i].split(":")[1]);
						}
						myData[arrMain[i].split(":")[0]]= cellVal;
					}
					else
					{
   						var theval = returnHtmlEltValue(arrMain[i].split(":")[1])
						myData[arrMain[i].split(":")[0]]= theval;
					}
				}
			}
		}
		if(typeof gridtab !="undefined")
		{
		  myData["id"]=gridtab;
		  if((myData["_pageRef"] ==null || typeof myData["_pageRef"]=="undefined") && (_pageRef != undefined && typeof _pageRef!="undefined" && _pageRef !=null))
		  {
			 myData["_pageRef"] = _pageRef;  
		  }
		}
		return myData;
	}
	/**
	 * Setting the default grid width
	 * @param {Object} lookupId
	 * @param {Object} lookupDiv
	 * @param {Object} lookupTxt
	 * @param {Object} spanLookup
	 * @param {Object} overlay
	 * @param {Object} gridtab
	 * @param {Object} pagerid
	 * @param {Object} width
	 */
	function setwidthgrd(lookupId,lookupDiv,lookupTxt,spanLookup,overlay,gridtab,pagerid,width,reConstruct){
		$grid.jqGrid('setGridWidth',width);
		/**
		 * [Marwan Maddah]:in re-construction case this if condition shouldn't be satisfied 
		 * because the overlay should be exist to refresh it 
		 */
		if(typeof reConstruct == "undefined" || reConstruct==null || reConstruct!="true")
		{			
			if($("body").children("#"+overlay).length > 0)
			{
				$($("body").children("#"+overlay)[0]).remove();
			}
		}
		//wait for overlay div to get the right size (ex: when console is opened)
		setTimeout(function(){setGridPosition(lookupId,lookupDiv,lookupTxt,spanLookup,overlay,gridtab,pagerid)},10);
		$(document.getElementById(overlay)).appendTo(document.body);
	}
	
	/**
	 * Setting the grid position by setting the calculated values in css
	 * @param {Object} lookupId
	 * @param {Object} lookupDiv
	 * @param {Object} lookupTxt
	 * @param {Object} spanLookup
	 * @param {Object} overlay
	 * @param {Object} gridtab
	 * @param {Object} pagerid
	 */
	function setGridPosition(lookupId,lookupDiv,lookupTxt,spanLookup,overlay,gridtab,pagerid){
		var winWidth 				= 	$(window).width();// Window Width
		var winHeight				=	$(window).height();//Window Height
		$overlay					=   $(document.getElementById(overlay));//$("#"+overlay);
		$lookupObj 					= 	$(document.getElementById(lookupId));
		$spanLookup 				= 	$(document.getElementById(spanLookup));
		var lookupTextOffsetLeft	=	$lookupObj.offset().left;//position from left
		var lookupTextOffsetTop		=	$lookupObj.offset().top;//position from top
	 	var lookupTextHeight		=	$lookupObj.height();//Text field height
		var spanLookupWidth			=	$spanLookup.width();//Span width
		var overlayWidth			=	$overlay.width();//Overlay width
		var overlayHeight			=	$overlay.height();//Overlay height			
		var spanLookupLeft			=	$spanLookup.offset().left;//position in right	
//		var lookupTextWidth			=	spanLookupLeft - lookupTextOffsetLeft;//calculating the width of textfield(solving the width issue of cross browser)
		var lookupTextWidth			=	 $lookupObj.width();//calculating the width of textfield(solving the width issue of cross browser)

		
//		var lookupDivGridTotalHoriz	=	lookupTextOffsetLeft + lookupTextWidth + spanLookupWidth + overlayWidth;//Total compnt width
		var lookupDivGridTotalHoriz	=	lookupTextOffsetLeft + overlayWidth;//Total compnt width
		var lookupDivGridTotalVertl	=	lookupTextOffsetTop	+ lookupTextHeight + overlayHeight;//Total compnt Height
		var overlayTop				=	$lookupObj.offset().top + $lookupObj.height();//Top position
		
		var leftRight = "left";
		var overlayOffsetLeft;
		if (document.dir == 'rtl')
		{
	  		leftRight = "right";
//	  		lookupDivGridTotalHoriz = winWidth- lookupTextOffsetLeft+ spanLookupWidth + overlayWidth;
	  		//TP 812390
	  		lookupDivGridTotalHoriz = spanLookupLeft+ lookupTextWidth - overlayWidth;
	  		if( lookupDivGridTotalHoriz > winWidth)
  			{
	  			overlayOffsetLeft = spanLookupLeft + overlayWidth;
  			}
	  		else
  			{
	  			overlayOffsetLeft = (winWidth - spanLookupLeft -lookupTextWidth)
  			}
		}
		else
		{
			if( lookupDivGridTotalHoriz > winWidth)
				overlayOffsetLeft = (lookupTextOffsetLeft + lookupTextWidth - overlayWidth)
			else
				overlayOffsetLeft = lookupTextOffsetLeft;
		}
//		if( lookupDivGridTotalHoriz > winWidth)
//		{
//			var overlayOffsetLeft = (document.dir == 'rtl'?(winWidth-(lookupTextOffsetLeft + lookupTextWidth + spanLookupWidth))
//			                                         :(lookupTextOffsetLeft + lookupTextWidth  + spanLookupWidth - overlayWidth));
//			var overlayOffsetLeft = lookupTextOffsetLeft + lookupTextWidth  + spanLookupWidth - overlayWidth;
			$overlay.css("position","absolute");
			$overlay.css(leftRight,overlayOffsetLeft+"px");
			$overlay.css("top","90px");
			if(typeof returnDocMaxZIndex === "function")
			{
				$overlay.css("z-index",returnDocMaxZIndex()+1);
			}
			else
			{
				$overlay.css("z-index","10000");
			}
			$overlay.css("display","block");
			$overlay.css("top",overlayTop);
			$overlay.css("font-size","75%!important");
			
//		}
//		else
//		{
			// PathSolutions, in case of RTL the right position should be the window width minus ( offset left of livesearch div  plus width of livesearch div)
			// else just ofset left of livesearch div
//			var posLeftRight = /*lookupTextOffsetLeft*/(document.dir == 'rtl'?(winWidth-(lookupTextOffsetLeft + lookupTextWidth + spanLookupWidth)):lookupTextOffsetLeft);
//			$overlay.css("position","absolute");
//			$overlay.css(leftRight,posLeftRight+"px");
//			$overlay.css("top","90px");
//			$overlay.css("z-index",returnDocMaxZIndex()+1);
//			$overlay.css("display","block");
//			$overlay.css("top",overlayTop);
//			$overlay.css("font-size","75%!important");
//		}
		if(lookupDivGridTotalVertl>winHeight)
		{
			var overlayOffsetTop = lookupTextOffsetTop	- overlayHeight;
			$overlay.css("top",overlayOffsetTop);				
		}
		else
		{
			$overlay.css("top",overlayTop+3);
			
		}
		//$(document.getElementById(lookupTxt)).focus();
	}
	/**
	 *  Method for validating and executing the dependency of live search
	 * @param {Object} dependencyValue
	 * @param {Object} dependencySrcValue
	 * @param {Object} parameterValue
	 * @param {Object} dynExpressionsArgsVal: added to the signature to parse it to call dependency function and then to use it inside the pathSessionInterceptor
	 */
	function liveSearch_validate_callDependency(dependencyValue,dependencySrcValue,parameterValue,lookupSpanId,afterDepEvent,dynExpressionsArgsVal)
	{
		if($.trim(dependencyValue).length>0 && $.trim(dependencySrcValue).length>0)
		   	callDependency(dependencyValue,dependencySrcValue,parameterValue,lookupSpanId,afterDepEvent,dynExpressionsArgsVal);
	}
	
	/**
	 * Method for clearing the dependency fields and fields being sets using the result set.
	 * @param {Object} dynHdResultId
	 * @param {Object} dependencyValue
	 */
	function liveSearch_clearDependencyFields(dynHdResultId,dependencyValue){		
		var arrMain=dynHdResultId.split(",");
		var arrMainLeng = arrMain.length;
		if(arrMainLeng>0){
			for(var i=0;i<arrMainLeng;i++){
					$("#"+arrMain[i].split(":")[1]).val("");
			}
		}	 
		var dependArr = dependencyValue.split(",");	
		if(	dependArr.length >0){
			for(var i=0;i<dependArr.length; i++){
				$("#"+dependArr[i].split(":")[1]).val("");
			}
		}
	 }


	
