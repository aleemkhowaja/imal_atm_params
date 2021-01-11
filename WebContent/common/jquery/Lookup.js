
	/**
	 * Method for generating the jqgrid dynamically 
	 * @param {Object} lookuptableid
	 * @param {Object} keylist
	 * @param {Object} action
	 * @param {Object} actionMethod
	 * @param {Object} dtype
	 * @param {Object} lookuptextid
	 * @param {Object} pagerid
	 */
	function lookupJS(lookuptableid,keylist,action,actionMethod,dtype,pagerid,dynDialogId){
		jQuery(document).ready(function () {
			
			
			jQuery.struts2_jquery.debug = true;
			jQuery.struts2_jquery.loadAtOnce = true;
			jQuery.struts2_jquery.minSuffix = "";
			jQuery.ajaxSettings.traditional = true;
			var myData={}
			var keylistvalues = $("#"+keylist).val();
			var autosize = false;
			if(keylistvalues){
				var arrMain=keylistvalues.split(",");
				var arrMainLeng = arrMain.length;
				if(arrMainLeng>0){
					for(var i=0;i<arrMainLeng;i++){	
						myData[arrMain[i].split(":")[0]]= $("#"+arrMain[i].split(":")[1]).val();
					}
				}
			}
			jQuery.ajaxSetup ({
			  cache: false
			 });
			
			$.ajax(
			    {
			    	
			       type: actionMethod,
			       url: action,
			       /**
			        * myData : Where clause from jsp(column name or index and corresponding component id) 
			        * From action class we can get the value by using getParameter of request object by 
			        * passing the index or column name which set from jsp (request.getParameter("column1")
			        * @param {Object} result
			        */
			       data: myData, 
			       dataType: dtype,
			       success: function(result)
			       {
			    	 
			    		 
			            colD = result.gridModel;			            
			            colN = result._colNames;		
			            colM = result._colModel;
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
						$.struts2_jquery.require("jqgrid/plugins/jquery.searchFilter.js");
						$.struts2_jquery.require("jqgrid/grid.formedit.js");
						$.struts2_jquery.requireCss("jqgrid/style/ui.jqgrid.css",jQuery.scriptPath);						
						//$.struts2_jquery.requireCss("themes/path_jquery_smoothness/CommonStyles.css");
		
						if($("#"+lookuptableid).html() != "")
							$("#"+lookuptableid).jqGrid('GridUnload');
						
						//adjust dialog size before grid load to have the grid adjust to dialog size correctly
						var dialogHeight = 	$(window).height()/1.2;
                		var dialogwidth	 =	$(window).width()/2;
                		parentDiv = ($("#"+dynDialogId).parents("div"))[0];
						$(parentDiv ).css("width",dialogwidth+"px");
						$(parentDiv ).css("height","auto");
						$(parentDiv ).css("position","absolute");
						$(parentDiv ).css("top",dialogHeight/3);
						$(parentDiv ).css("left",dialogwidth/2);
						//end dialog resizing
						
						if(typeof result.grid.multiselect == "undefined")
							result.grid.multiselect = "false";
						
						
						jQuery("#"+lookuptableid).jqGrid({
							url: jQuery.contextPath + result.grid.url,
							mtype: "GET",
							postData:myData,
			                jsonReader : {
			                    repeatitems: false,
			                    root:"gridModel",
			                    cell: ""
			                },
			                			                
			                datatype: 'json',
			                colNames:colN,
			                colModel :colM,
			                id:result.grid.id,
			                caption:result.grid.caption,
			                pager:jQuery("#"+pagerid),
			                rowNum:result.grid.rowNum,
			                filter:result.grid.filter,
			                gridModel:result.grid.gridModel,			                
			                rowList:result.grid.rowList,
			                viewrecords:result.grid.viewrecords,
			                multiselect:result.grid.multiselect,
			                loadComplete:function(){
			                	if(!autosize){
			                		autosize = true;
			                		/*
			                		var dialogHeight = 	$(window).height()/1.2;
			                		var dialogwidth	 =	$(window).width()/2;
			                		alert("dialogwidth	 "+dialogwidth	 )
			                		parentDiv = ($("#"+dynDialogId).parents("div"))[0];
									$(parentDiv ).css("width",dialogwidth+"px");
									$(parentDiv ).css("height","auto");
									$(parentDiv ).css("position","absolute");
									$(parentDiv ).css("top",dialogHeight/3);
									$(parentDiv ).css("left",dialogwidth/2);	*/
									$(parentDiv).show();
			                	}
			                },
			                loadError: function(xhr,status,error){
			                	//handle error of loading grid and show it in a dialog
  								var start = error.indexOf("<div id=\"exception-info\">");
					        	var end = error.indexOf("</div>",start) + 6;
					        	var length = end - start;  
						        var htmlErr = error.substr(start,length );
						        var selector = $(htmlErr);
						        var table = selector.children("table:first-child");
						        var tbody = table.children("tbody");
						        var tr = tbody.children("tr:first-child");  
						        $.jgrid.info_dialog(jQuery.jgrid.errors.errcap,tr.text(),jQuery.jgrid.edit.bClose);
			                }
			            });
						
						
						if(result.grid.filter== true && $("#"+lookuptableid).html() != ""){
								jQuery("#"+lookuptableid).jqGrid('filterToolbar', { stringResult:false, searchOnEnter:true });
							  	jQuery("#"+lookuptableid).jqGrid('navGrid',"#"+pagerid,{del:false,add:false,edit:false},{},{},{},{multipleSearch:true});	
						}						
						
			       },
			       error: function(x, e)
			       {
			    	   alert("errrorrrrrrrrr");
			            alert(x.readyState + " "+ x.status +" "+ e.msg);   
			       }
					
			    });		
//				jQuery("#"+lookuptableid).jqGrid('searchGrid', {closeOnEscape: true,closeAfterSearch: true,multipleSearch: true,overlay:true})
			
		    });	
	}
	
	/**
	 * Default functionality for ok button.
	 * Get the values from selected record in the grid and sets the values to the 
	 * components which the implementer sets during the lookup tag initialization. 
	 * @param {Object} lookuptableid
	 * @param {Object} resultlist
	 * @param {Object} dynDialogId
	 */
	function okButtonfun(lookuptableid,resultlist,dynDialogId) {
		var selectedrecord;
		rowid = $("#"+lookuptableid).jqGrid('getGridParam','selrow'); 
		selectedrecord = $("#"+lookuptableid).jqGrid('getRowData',rowid);
		var resultlistvalues = $("#"+resultlist).val();		
		if(resultlistvalues){
			var arrMain=resultlistvalues.split(",");
			var myData={}
			var arrMainLeng = arrMain.length;
			if(arrMainLeng>0){
				for(var i=0;i<arrMainLeng;i++){		
					$("#"+arrMain[i].split(":")[1]).val(selectedrecord[""+arrMain[i].split(":")[0]]);
				}
			}	
		}  	
	  	$("#"+dynDialogId).dialog('close');
      }
     /**
      * The default cancel button functionality
      * @param {Object} dynDialogId
      */ 
     function cancelButton(dynDialogId) {
      $("#"+dynDialogId).dialog('close');
     }




//			                navigator:result.grid.navigator,
//			                onErrorTopics:result.grid.onErrorTopics,
//			                navigatorSearchOptions:result.grid.navigatorSearchOptions,
//							draggableHandle:result.grid.draggableHandle,
//							accesskey:result.grid.accesskey,
//							altClass:result.grid.altClass,
//							altRows:result.grid.altRows,
//							autoencode:result.grid.autoencode,				
//							cellEdit:result.grid.cellEdit,
//							cellurl:result.grid.cellurl,
//							connectWith:result.grid.connectWith,
//							cssClass:result.grid.cssClass,
//							cssErrorClass:result.grid.cssErrorClass,
//							cssErrorStyle:result.grid.cssErrorStyle,
//							cssStyle:result.grid.cssStyle,
//							disabled:result.grid.disabled,
//							draggable:result.grid.draggable,
//							draggableAddClasses:result.grid.draggableAddClasses,
//							draggableAppendTo:result.grid.draggableAppendTo,
//							draggableAxis:result.grid.draggableAxis,
//							draggableCancel:result.grid.draggableCancel,
//							draggableContainment:result.grid.draggableContainment,
//							draggableCursor:result.grid.draggableCursor,
//							draggableDelay:result.grid.draggableDelay,
//							draggableDistance:result.grid.draggableDistance,
//							draggableHelper:result.grid.draggableHelper,
//							draggableIframeFix:result.grid.draggableIframeFix,
//							draggableOnDragTopics:result.grid.draggableOnDragTopics,
//							draggableOnStartTopics:result.grid.draggableOnStartTopics,
//							draggableOnStopTopics:result.grid.draggableOnStopTopics,
//							draggableOpacity:result.grid.draggableOpacity,
//							draggableRefreshPositions:result.grid.draggableRefreshPositions,
//							draggableRevert:result.grid.draggableRevert,
//							draggableRevertDuration:result.grid.draggableRevertDuration,
//							draggableScope:result.grid.draggableScope,
//							draggableScroll:result.grid.draggableScroll,
//							draggableScrollSensitivity:result.grid.draggableScrollSensitivity,
//							draggableScrollSpeed:result.grid.draggableScrollSpeed,
//							draggableSnap:result.grid.draggableSnap,
//							draggableSnapMode:result.grid.draggableSnapMode,
//							draggableSnapTolerance:result.grid.draggableSnapTolerance,
//							draggableZindex:result.grid.draggableZindex,
//							droppable:result.grid.droppable,
//							droppableAccept:result.grid.droppableAccept,
//							droppableActiveClass:result.grid.droppableActiveClass,
//							droppableAddClasses:result.grid.droppableAddClasses,
//							droppableGreedy:result.grid.droppableGreedy,
//							droppableHoverClass:result.grid.droppableHoverClass,
//							droppableOnActivateTopics:result.grid.droppableOnActivateTopics,
//							droppableOnDeactivateTopics:result.grid.droppableOnDeactivateTopics,
//							droppableOnDropTopics:result.grid.droppableOnDropTopics,
//							droppableOnOutTopics:result.grid.droppableOnOutTopics,
//							droppableOnOverTopics:result.grid.droppableOnOverTopics,
//							droppableScope:result.grid.droppableScope,
//							droppableTolerance:result.grid.droppableTolerance,							
//							editurl:result.grid.editurl,
//							effect:result.grid.effect,
//							effectDuration:result.grid.effectDuration,
//							effectMode:result.grid.effectMode,
//							effectOptions:result.grid.effectOptions,
//							errorElementId:result.grid.errorElementId,
//							errorText:result.grid.errorText,							
//							filterOptions:result.grid.filterOptions,
//							footerrow:result.grid.footerrow,
//							formIds:result.grid.formIds,
//							groupCollapse:result.grid.groupCollapse,
//							groupColumnShow:result.grid.groupColumnShow,
//							groupDataSorted:result.grid.groupDataSorted,
//							groupField:result.grid.groupField,							
//							groupMinusIcon:result.grid.groupMinusIcon,
//							groupOrder:result.grid.groupOrder,
//							groupPlusIcon:result.grid.groupPlusIcon,
//							groupShowSummaryOnHide:result.grid.groupShowSummaryOnHide,
//							groupSummary:result.grid.groupSummary,
//							groupText:result.grid.groupText,							
//							hoverrows:result.grid.hoverrows,
//							href:result.grid.href,
//							hiddengrid:result.grid.hiddengrid,
//							hidegrid:result.grid.hidegrid,
//							indicator:result.grid.indicator,
//							javascriptTooltip:result.grid.javascriptTooltip,
//							key:result.grid.key,
//							label:result.grid.label,
//							labelSeparator:result.grid.labelSeparator,
//							labelposition:result.grid.labelposition,
//							listenTopics:result.grid.listenTopics,
//							loadingText:result.grid.loadingText,
//							loadonce:result.grid.loadonce,
//							multiboxonly:result.grid.multiboxonly,
//							multiselect:result.grid.multiselect,
//							multiselectWidth:result.grid.multiselectWidth,
//							name:result.grid.name,							
//							navigatorAdd:result.grid.navigatorAdd,
//							navigatorAddOptions:result.grid.navigatorAddOptions,
//							navigatorDelete:result.grid.navigatorDelete,
//							navigatorDeleteOptions:result.grid.navigatorDeleteOptions,
//							navigatorEdit:result.grid.navigatorEdit,
//							navigatorEditOptions:result.grid.navigatorEditOptions,
//							navigatorRefresh:result.grid.navigatorRefresh,
//							navigatorSearch:true,							
//							navigatorView:result.grid.navigatorView,
//							navigatorViewOptions:result.grid.navigatorViewOptions,
//							onAlwaysTopics:result.grid.onAlwaysTopics,
//							onBeforeTopics:result.grid.onBeforeTopics,
//							onBlurTopics:result.grid.onBlurTopics,
//							onCellEditErrorTopics:result.grid.onCellEditErrorTopics,
//							onCellEditSuccessTopics:result.grid.onCellEditSuccessTopics,
//							onCellSelectTopics:result.grid.onCellSelectTopics,
//							onChangeTopics:result.grid.onChangeTopics,
//							onCompleteTopics:result.grid.onCompleteTopics,
//							onDisableTopics:result.grid.onDisableTopics,
//							onEditInlineAfterSaveTopics:result.grid.onEditInlineAfterSaveTopics,
//							onEditInlineBeforeTopics:result.grid.onEditInlineBeforeTopics,
//							onEditInlineErrorTopics:result.grid.onEditInlineErrorTopics,
//							onEditInlineSuccessTopics:result.grid.onEditInlineSuccessTopics,
//							onEffectCompleteTopics:result.grid.onEffectCompleteTopics,
//							onEnableTopics:result.grid.onEnableTopics,							
//							onFocusTopics:result.grid.onFocusTopics,
//							onGridCompleteTopics:result.grid.onGridCompleteTopics,
//							onPagingTopics:result.grid.onPagingTopics,
//							onSelectAllTopics:result.grid.onSelectAllTopics,
//							onSelectRowTopics:result.grid.onSelectRowTopics,
//							onSortColTopics:result.grid.onSortColTopics,
//							onSuccessTopics:result.grid.onSuccessTopics,
//							onblur:result.grid.onblur,
//							onchange:result.grid.onchange,
//							onclick:result.grid.onclick,
//							ondblclick:result.grid.ondblclick,
//							onfocus:result.grid.onfocus,
//							onkeydown:result.grid.onkeydown,
//							onkeypress:result.grid.onkeypress,
//							onkeyup:result.grid.onkeyup,
//							onmousedown:result.grid.onmousedown,
//							onmousemove:result.grid.onmousemove,
//							onmouseout:result.grid.onmouseout,
//							onmouseover:result.grid.onmouseover,
//							onmouseup:result.grid.onmouseup,
//							onselect:result.grid.onselect,
//							openTemplate:result.grid.openTemplate,
//							page:result.grid.page,							
//							pagerButtons:result.grid.pagerButtons,
//							pagerInput:result.grid.pagerInput,
//							pagerPosition:result.grid.pagerPosition,
////							prmNames:result.grid.prmNames,
//							recordpos:result.grid.recordpos,
//							reloadTopics:result.grid.reloadTopics,
//							requestType:result.grid.requestType,
//							required:result.grid.required,
//							requiredposition:result.grid.requiredposition,
//							resizable:result.grid.resizable,
//							resizableAnimate:result.grid.resizableAnimate,
//							resizableAnimateDuration:result.grid.resizableAnimateDuration,
//							resizableAnimateEasing:result.grid.resizableAnimateEasing,
//							resizableAspectRatio:result.grid.resizableAspectRatio,
//							resizableAutoHide:result.grid.resizableAutoHide,
//							resizableContainment:result.grid.resizableContainment,
//							resizableDelay:result.grid.resizableDelay,
//							resizableDistance:result.grid.resizableDistance,
//							resizableGhost:result.grid.resizableGhost,
//							resizableHandles:result.grid.resizableHandles,
//							resizableHelper:result.grid.resizableHelper,
//							resizableMaxHeight:result.grid.resizableMaxHeight,
//							resizableMaxWidth:result.grid.resizableMaxWidth,
//							resizableMinHeight:result.grid.resizableMinHeight,
//							resizableMinWidth:result.grid.resizableMinWidth,
//							resizableOnResizeTopics:result.grid.resizableOnResizeTopics,
//							resizableOnStartTopics:result.grid.resizableOnStartTopics,
//							resizableOnStopTopics:result.grid.resizableOnStopTopics,														
//							rowTotal:result.grid.rowTotal,
//							rownumbers:result.grid.rownumbers,
//							scroll:result.grid.scroll,
//							scrollrows:result.grid.scrollrows,
//							shrinkToFit:result.grid.shrinkToFit,
//							sortable:result.grid.sortable,
//							sortableAppendTo:result.grid.sortableAppendTo,
//							sortableAxis:result.grid.sortableAxis,
//							sortableCancel:result.grid.sortableCancel,
//							sortableConnectWith:result.grid.sortableConnectWith,
//							sortableContainment:result.grid.sortableContainment,
//							sortableCursor:result.grid.sortableCursor,
//							sortableCursorAt:result.grid.sortableCursorAt,
//							sortableDelay:result.grid.sortableDelay,
//							sortableDistance:result.grid.sortableDistance,
//							sortableDropOnEmpty:result.grid.sortableDropOnEmpty,
//							sortableForceHelperSize:result.grid.sortableForceHelperSize,
//							sortableForcePlaceholderSize:result.grid.sortableForcePlaceholderSize,
//							sortableGrid:result.grid.sortableGrid,
//							sortableHandle:result.grid.sortableHandle,
//							sortableHelper:result.grid.sortableHelper,
//							sortableItems:result.grid.sortableItems,
//							sortableOnActivateTopics:result.grid.sortableOnActivateTopics,
//							sortableOnBeforeStopTopics:result.grid.sortableOnBeforeStopTopics,
//							sortableOnChangeTopics:result.grid.sortableOnChangeTopics,
//							sortableOnDeactivateTopics:result.grid.sortableOnDeactivateTopics,
//							sortableOnOutTopics:result.grid.sortableOnOutTopics,
//							sortableOnOverTopics:result.grid.sortableOnOverTopics,
//							sortableOnReceiveTopics:result.grid.sortableOnReceiveTopics,
//							sortableOnRemoveTopics:result.grid.sortableOnRemoveTopics,
//							sortableOnSortTopics:result.grid.sortableOnSortTopics,
//							sortableOnStartTopics:result.grid.sortableOnStartTopics,
//							sortableOnStopTopics:result.grid.sortableOnStopTopics,
//							sortableOnUpdateTopics:result.grid.sortableOnUpdateTopics,
//							sortableOpacity:result.grid.sortableOpacity,
//							sortablePlaceholder:result.grid.sortablePlaceholder,
//							sortableRevert:result.grid.sortableRevert,
//							sortableScroll:result.grid.sortableScroll,
//							sortableScrollSensitivity:result.grid.sortableScrollSensitivity,
//							sortableScrollSpeed:result.grid.sortableScrollSpeed,
//							sortableTolerance:result.grid.sortableTolerance,
//							sortableZindex:result.grid.sortableZindex,
//							sortname:result.grid.sortname,
//							subGridUrl:result.grid.subGridUrl,
//							subGridWidth:result.grid.subGridWidth,
//							tabindex:result.grid.tabindex,
//							targets:result.grid.targets,
//							template:result.grid.template,
//							templateDir:result.grid.templateDir,
//							timeout:result.grid.timeout,
//							title:result.grid.title,
//							tooltip:result.grid.tooltip,
//							tooltipConfig:result.grid.tooltipConfig,
//							tooltipCssClass:result.grid.tooltipCssClass,
//							tooltipDelay:result.grid.tooltipDelay,
//							tooltipIconPath:result.grid.tooltipIconPath,
//							userDataOnFooter:result.grid.userDataOnFooter,
//							value:result.grid.value,							
//							width:result.grid.width,	                
///*							direction:result.grid.direction,===null error
//							sortorder:result.grid.sortorder,===null error
//							height:result.grid.height,======the grid is hiding 
//							
//*/	