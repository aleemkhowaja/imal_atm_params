var theSelectedElemID = "";
//propertiesJsonArray = [];
function screenGeneratorList_onDbClickedEvent(createFrom)
{
	var $table = $("#screenGeneratorListGridTbl_Id");
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	if(typeof selectedRowId == "undefined" || selectedRowId == null || selectedRowId == "")
	{
		return;
	}
	var myObject = $table.jqGrid('getRowData', selectedRowId);
	/**
	 * get the selected rowId
	 */
	var screenId = myObject["DYN_SCREEN_ID"];
	if (checkIfGeneratorFormChanged()) {
		_showConfirmMsg(changes_made_confirm_msg, confirm_msg_title, function(theVal) {
			if (theVal) {
				screenGeneratorList_loadDataInTheForm(screenId,createFrom);
				showHideSrchGrid('screenGeneratorListGridTbl_Id');
			}
		});
	} 
	else {
		screenGeneratorList_loadDataInTheForm(screenId,createFrom);
		showHideSrchGrid('screenGeneratorListGridTbl_Id');
	}

}
//Function to initialize the form and reset the cached data
function screenGeneratorList_initializeDataOnSuccess()
{
	theSelectedElemID   = "";
	clearCachedPathData("dynScreenPropertiesArray");
    $("#editor_div").html(null);
    $("#elementPropertiesWidId").html(null);
}

function screenGeneratorList_onAddClicked()
{
		var actionSrc     = jQuery.contextPath+"/path/screenGenerator/ScreenGeneratorMaintAction_initialize?";
		if (checkIfGeneratorFormChanged()) {
			_showConfirmMsg(changes_made_confirm_msg, confirm_msg_title,
					function(theVal) {
						if (theVal) {
							$.post(actionSrc, {}, function(param) {
							$("#screenGeneratorMainInfoDiv_id").html(param);
                            screenGeneratorList_initializeDataOnSuccess();
                            }, "html");
						}
					});
		}
		else {
			$.post(actionSrc, {}, function(param) {
			$("#screenGeneratorMainInfoDiv_id").html(param);
            screenGeneratorList_initializeDataOnSuccess();
			}, "html");
		}
}
function checkIfGeneratorFormChanged()
{
	var formChanged = false;
	$("#screenGeneratorMaintFormId").each(function(i) {
		formChanged = $(this).hasChanges();
		if (formChanged) {
			return true;
		}
	});
	return formChanged;
}
//Function to Load the selected screen in the screen generator form
function screenGeneratorList_loadDataInTheForm(screenId,createFrom)
{
	_showProgressBar(true);
	screenGeneratorList_initializeDataOnSuccess();
	var params = {"criteria.screenId":screenId};
	if(createFrom)
	{
		params["dynScreenCreatorCO.createFrom"] = createFrom;
	}
	var actionSrc  = jQuery.contextPath+"/path/screenGenerator/ScreenGeneratorMaintAction_edit?";
	$.post(actionSrc
		   ,params
	       ,function(param)
 	        {
	         $("#screenGeneratorMainInfoDiv_id").html(param);
	         loadGeneratorData(screenId,createFrom);
	         _showProgressBar(false);
	        }
	       ,"html");
}
function dyn_createScreen()
{
	var	createScreenDiv = $("<div id='dyn_create_screen_div_"+_pageRef+"' class='path-common-sceen'/>");
	createScreenDiv.css("padding","0");
	createScreenDiv.insertAfter($('body'));
	    
	var curParams = {_pageRef:_pageRef};
	var buttonsArr =[];
	buttonsArr.push({text:cancel_label_trans
		             ,id:"closeDynScreenbtnId_"+_pageRef
		             ,click:function(){
		          			_showConfirmMsg(closeDynScreen_key, confirm_msg_title,
		        					function(theVal) {
		        						if (theVal) {
		        							$("#dyn_create_screen_div_"+_pageRef).dialog("destroy");
		        							$("#dyn_create_screen_div_"+_pageRef).remove();
		        							$("#dyn_create_screen_div_"+_pageRef).dialog("close");
		        						}
		        					})
	                 }});
	_showProgressBar(true);
	var srcURL = jQuery.contextPath+'/path/screenGenerator/ScreenGeneratorMaintAction_loadScreenGeneratorPage?iv_crud=R';
	var _dialogOptions = {modal:true, 
			                  title: (typeof create_screen_title_key == "undefined" || create_screen_title_key == "")?"Dynamic Screen Management" :create_screen_title_key ,
			                  autoOpen:false,
			                  dialogClass: 'no-close',
			                  closeOnEscape: false,
			                  show:'slide',
			                  position:'center', 
			                  width:returnMaxWidth(1250),
			                  height:returnMaxHeight(700),
			                  buttons :buttonsArr
		    		         };
	$("#dyn_create_screen_div_"+_pageRef).load(srcURL, curParams, function() {_showProgressBar(false);});
	$("#dyn_create_screen_div_"+_pageRef).dialog(_dialogOptions);
	$("#dyn_create_screen_div_"+_pageRef).dialog("open");
}

//Function to load the screen data 
function loadGeneratorData(screenId)
{
	var _screenId = (screenId == null || screenId=="")?-1:screenId;
	$.ajax({
		  url: jQuery.contextPath+"/path/screenGenerator/generatorMaintDesigner?",
		  type:"get",
		  dataType:"json",
		  data: {"criteria.screenId":_screenId},
		  success: function(data){
					 $("#editor_div").html(data.screenData);
					 $("#widgets_optional").html(data.optionalData);
//			         $("#widgets_additional").html(data.additionalData);
//			         var _editorTop = $("#editor_div").css("top");
//			         var _westWidth = $(".ui-layout-west").width();
//			         _editorTop = _editorTop.substring(0,_editorTop.length-2);
			         $( "._newdrag" ).each(
	        		 function(i){
              	    	 // if element is child tab then skip the functionality to drag and resize the component
	        			 if(isChildTab($(this)))
             	    	 {
             	    		return 0;
             	    	 }
	    			     var _currNewDragId = $(this).attr("id");
	    			     var _droppableParentId = $("#"+_currNewDragId).closest(".droppable").attr("id");
	    			     $("#"+_currNewDragId).draggable({containment: "#"+_droppableParentId,cancel:null});
	    			     $("#"+_currNewDragId).resizable({containment: "#"+_droppableParentId});
	    			     $("#"+_currNewDragId).resizable({containment: "#"+_droppableParentId});
	    			   }			        		 
                     );
	                 //$( "._newdrag" ).draggable({containment: "#editor_div",cancel:null});
	                 $( "._optdrag" ).draggable({revert:true,helper:"clone"});
	                 $( "._adddrag" ).draggable({revert:true,helper:"clone"});
//	                 $( "._newdrag" ).resizable({containment: "#editor_div"});
	                 var toAlsoResize="";
	                 $( "._newdrag" ).die();
                	 $( "._newdrag" ).live({ 
					                		mouseenter: function() {
//					                		     $(this).css("border","1.5px dashed #000");
//					                		     $(this).css("cursor","move");
					                			 // if element is child tab then skip the functionality to resize the component
					                 	    	 if(isChildTab($(this)))
					                 	    	 {
					                 	    		return 0;
					                 	    	 }
					                	         toAlsoResize = "."+this.id;
					                	         $(this).resizable({
					                	        	 alsoResize:toAlsoResize,
					                	        	 start: function() {
					                	        		 $(window).off("resize");
					                	        	 },
					                	        	 resize: function() {
					                	        		 screenGenerator_addElemLines($(this));	 
					                	        	 },
					                	        	 stop: function(event, ui) {
					                	        		adjustTabSize(ui);
					                	        		$(window).on("resize");
					                	        	 }
					                	         });
					                		}
//					                	    ,mouseleave: function() { 
//					                	    	 $(this).css("border","0px"); 
//					                	    	 $(this).css("cursor","");
//	                	                    }
					                	    ,click: function(event){
					                	    	 if(isChildTab($(this)))
					                	    	 {
					                	    		return 0;
					                	    	 }
					                		     $(this).css("border","1.5px dashed #000");
					                		     $(this).css("cursor","move");
					                	         toAlsoResize = "."+this.id;
					                	         $(this).resizable({
					                	        	 alsoResize:toAlsoResize,
					                	        	 start: function() {
					                	        		 $(window).off("resize");
					                	        	 },
					                	        	 resize: function() {
					                	        		 screenGenerator_addElemLines($(this));	 
					                	        	 },
					                	        	 stop: function(event, ui) {
					                	        		adjustTabSize(ui);
					                	        		$(window).on("resize");
					                	        	 }
					                	         });
					                 	    	 $("._newdrag").each(function(){
					                 	    		 removeElemBorders($(this));
					                 	    	 });
					                	    	 if(theSelectedElemID!=null && theSelectedElemID!="")
					                	    	 {
					                	    	   /**
					                	    	    * fill the information that are related to the previous selected element. 
					                	    	    * @memberOf {TypeName} 
					                	    	    */
					                	    	   fillPropertiesJsonArray(theSelectedElemID);
					                	    	 }
					                	    	 theSelectedElemID = "";
					                	    	 if($(this).hasClass("_newdrag"))
					                	    	 {					                	    		 
					                	    		 $(this).css("border","1.5px dashed #000");
						                		     $(this).css("cursor","move");
						                		     $(this).addClass("ui-focus");
						                	         toAlsoResize = "."+this.id;
						                	         theSelectedElemID = this.id;
						                	         $(this).resizable({
						                	        	 alsoResize:toAlsoResize,
						                	        	 start: function() {
					                	        		 	$(window).off("resize");
					                	        	 	 },
					                	        	 	 resize: function() {
					                	        	 		screenGenerator_addElemLines($(this));	 
					                	        	 	 },
					                	        	 	 stop: function(event, ui) {
					                	        			adjustTabSize(ui);
					                	        			$(window).on("resize");
					                	        	 	 }
						                	         });
						                	         /**
						                	          * open Properties Div
						                	          * @memberOf {TypeName} 
						                	          */
						                	         screenGenerator_openPropertiesWidget(theSelectedElemID, _screenId);
						                	         /**
						                	          * 
						                	          * @memberOf {TypeName} 
						                	          */
					                	    	 }
					                	        selected = $([]);
												$("#editor_div div").removeClass("ui-selected");
												$("#editor_div label").removeClass("ui-selected");
												$("#editor_div span").removeClass("ui-selected");
					                	    	 /**
					                	    	  * to stop the event from the parent level
					                	    	  * in case the click is on an element inside collapsible div  
					                	    	  */
					                	    	 event.stopPropagation();
					                	    }
					                	    ,dblclick: function(event){
					                	    	labelId  = this.id.substring(0,this.id.length-4);
					                	    	theSelectedElemID = this.id;
					                	    	var _curTop  = $(this).css("top");
					                	    	var _curLeft = $(this).css("left");
					                	    	_curTop      = _curTop.substring(0,_curTop.length-2);
					                	    	_curLeft     = _curLeft.substring(0,_curLeft.length-2);
					                	    	event.stopPropagation();
					                	    }
	                	 });
	                   
            /**
	         * Dropping Management ...
	         * @param {Object} event
	         * @param {Object} ui
	         * @memberOf {TypeName} 
	         */
			 $( ".droppable" ).droppable({
			       activeClass: "ui-state-hover",
			       hoverClass: "ui-state-active",
			       greedy:true,
			       scroll: true,
			       drop: function( event, ui ) 
			       {
			    	    _callActionToCheckSession();
			    	    screenGenerator_onDrop(event,ui,this);
			       }
			 });
			 
				// Adel - This is used to enable multi select on items 
				var selected = $([]), offset = {top:0, left:0}; 

				$( "#editor_div > div, div._newdrag.ui-draggable" ).draggable({
				 start: function(ev, ui) {
					 if ( (($(this).hasClass("_newdrag") && $(this).hasClass("ui-draggable") && $(this).hasClass("ui-resizable")) ||
					 
					 ($(this).hasClass("droppable") && $(this).hasClass("collapsibleContainerContent") && $(this).hasClass("ui-widget-content") && $(this).hasClass("ui-droppable")))				 
					 && $(this).hasClass("ui-selected")
					 ){
						selected = $("._newdrag.ui-draggable.ui-resizable.ui-selected").each(function() {
							var el = $(this);
							el.data("offset", el.offset());
						 });
					 }
					 else {
						 selected = $([]);
						 $("#editor_div > div").removeClass("ui-selected");
					 }
					 offset = $(this).offset();
				 },
				 drag: function(ev, ui) {
					 var dt = ui.position.top - offset.top, dl = ui.position.left - offset.left;
					 // take all the elements that are selected expect $("this"), which is the element being dragged and loop through each.
					 selected.not(this).each(function() {
						  // create the variable for we don't need to keep calling $("this")
						  // el = current element we are on
						  // off = what position was this element at when it was selected, before drag
						  var el = $(this), off = el.data("offset");
						  if(!el.parents('._newdrag').length)
						  {
							  var topTemp = off.top + dt;
							  var leftTemp = off.left + dl;
							  
							  var bottomTemp = topTemp + ui.helper.context.offsetHeight;
							  var rightTemp = leftTemp + ui.helper.context.offsetWidth;
							  
							  if (topTemp < 0)
							  {
								  topTemp = 0;
							  }
							  if (leftTemp < 0)
							  {
								  leftTemp = 0;
							  }
							  if (bottomTemp >= 1570)
							  {
								  topTemp = 1570- ui.helper.context.offsetHeight;
							  }
							  if (rightTemp >= 1026)
							  {
								  leftTemp = 1026 - ui.helper.context.offsetWidth;
							  }
							el.css({top: topTemp, left: leftTemp});
						  }
					 });
					 screenGenerator_addElemLines($(this));
				 },
			     stop: function(ev, ui) {
			    	 screenGenerator_addElemLines($(this));
			     }
				});

				 $( "#editor_div" ).selectable();
				 $( "#editor_div" ).on( "selectableselecting", function( event, ui ) {
					document.getElementById("elementPropertiesWidId").innerHTML = "";
					$("._newdrag").each(function(){
						removeElemBorders($(this));
             	    });
				 } );
				 $( "#editor_div" ).on( "selectableselected", function( event, ui ) {
					 document.getElementById("elementPropertiesWidId").innerHTML = "";
					 $("._newdrag").each(function(){
           	    		 removeElemBorders($(this));
           	    	 });
				 } );
          }
	});
}
/**
 * @modifiedBy Sajjad Soomro
 * @modifiedDate 06 Dec, 2019
 * @description build Tab UI to display in Designer window of Dynamic Screen
 * 
 * @param event
 * @param ui
 * @param _this
 * @returns
 */
function screenGenerator_onDrop(event,ui,_this)
{
	var dragHTML = ui.draggable.html();
    var targetElem = $(_this).attr("id");
    if(ui.helper.attr("fromWidget") == "1")
    {
    	var rowid="";
    	var parentElem = $("#"+targetElem).closest("._newdrag");
    	var parentTechId = "";
    	if(parentElem.length > 0 && parentElem.attr("techid")!=null && typeof parentElem.attr("techid")!="undefined" && parentElem.attr("techid")!="")
    	{
    		parentTechId = "parentTechId='"+parentElem.attr("techid")+"'";
    	}
    	var techId = (new Date()).getTime();
    	if(ui.helper.attr("status")=="2")
    	{
    	   rowid  = ui.helper.attr("theId");
    	   techId = ui.helper.attr("techId");
    	   rowid  = rowid.substring(0,rowid.length-4);
    	   $("#"+rowid+"_div").remove();
    	}
    	else
    	{
    	   rowid = "new_"+techId;
    	}
    	
    	/**
    	 * position management
    	 * @memberOf {TypeName} 
    	 */
	    var dropPositionX = event.pageX - $(_this).offset().left;
	    var dropPositionY = event.pageY - $(_this).offset().top;
    	var top         = dropPositionY;
    	var left        = dropPositionX;
    	
    	
	    var elt_type    = ui.helper.attr("type");
	    var elt_desc    = ui.helper.attr("value");
	    var elt_tns_key = ui.helper.attr("tnsKey");
	    if(elt_tns_key == null || typeof elt_tns_key == "undefined" || elt_tns_key =='')
	    {
	      	elt_tns_key = elt_desc+"_key";
	    }
	    var elt_status  = ui.helper.attr("status");
	    var theType = 1;
	    var theClass = "";
	    var additionalImg="";
	    if(elt_type == "text")
	    {
	      theType =1;
	      theClass = "textCompSize ui-state-focus ui-corner-all";
	    }
	    if(elt_type == "labelKeys" || elt_type =="label")
	    {
	      theType = 2;
	    }
	    if(elt_type =="select")
	    {
	      theType = 3;
	      theClass="selectCompSize ui-state-focus ui-corner-all";
	    }
	    if(elt_type =="date")
	    {
	      theType = 4;
	      theClass="ui-state-focus ui-corner-all path-text-size hasDatepicker";
	      additionalImg="<img title='...' class='ui-datepicker-trigger' style='display: inline-block;' alt='...' src='"+jQuery.contextPath+"/common/images/calendar.png'>"
	    }
	    if(elt_type =="radio")
	    {  
	      theType = 5;
	      theClass="path-dummy-cls";
	    }
	    if(elt_type == "checkbox")
	    {
	      theType = 6;
	      theClass="path-dummy-cls";
	    }
	    if(elt_type == "livesearch")
	    {
	      theType = 7;
	      theClass="liveSearchText liveSearchCompSize ui-state-focus liveSearchInputCorner";
	      additionalImg="<span tabindex='0' class='ui-search ui-state-default ui-state-focus liveSearchSpanCorner liveSearchSpanSize liveSearchSpanDisplay' id='"+rowid+"_liveSearchIcon' role='button' oldtabindex='0'>"
                         +"<span class='ui-icon ui-icon-search live-search-ui'></span>"
                         +"</span>";
	    }
	    if(elt_type == "button")
	    {
	    	theType = 8;
	    	theClass = "ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only";
	    }
	    if(elt_type == "textarea")
	    {
	    	theType = 9;
	    	theClass = "textCompSize ui-state-focus ui-corner-all";
	    }
	    if(elt_type == "panel")
	    {
	    	theType = 10;
	    	theClass = "ui-state-focus ui-corner-all";										    	
	    }
	    if(elt_type == "file")
	    {
	    	theType = 11;
	    }
	    if(elt_type == "grid")
	    {
	    	theType = 12;
	    }
	    if(elt_type == "range")
	    {
	    	theType = 13;
	    }
	    if(elt_type == "tab") //describe theType of the tab component
	    {
	    	theType = 14;
	    }
	    var htmlStr;
	    if(elt_type == "tab")
	    {
	    	htmlStr = "<div class='_newdrag' tnsKey='"+elt_tns_key+"' id='"+rowid+"_div' type='"+theType+"' value='"+elt_desc+"' style='position:absolute; top:"+top+"px; left:"+left+"px; border: 1px dotted #000;overflow:hidden;cursor:move;width:150px' tabType='main_tab' status='"+elt_status+"' onkeydown='onkeydown' techId='"+techId+"' "+parentTechId+">";
	    }else
	    {
	    	htmlStr = "<div class='_newdrag' tnsKey='"+elt_tns_key+"' id='"+rowid+"_div' type='"+theType+"' value='"+elt_desc+"' style='position:absolute; top:"+top+"px; left:"+left+"px; border: 1px dotted #000;overflow:hidden;cursor:move;width:150px' status='"+elt_status+"' onkeydown='onkeydown' techId='"+techId+"' "+parentTechId+">";	
	    }
		if(elt_type == "label" || elt_type == "labelKeys")
		{
			  htmlStr += "<label id='"+rowid+"' class='"+rowid+"_div' style='width:100px' value='"+elt_desc+"' disabled='true'>"+elt_desc+"</label>"
		}
		else if(elt_type =="select")
		{
			htmlStr +="<select id='"+rowid+"' class='"+rowid+"_div"+" "+theClass+"' style='width:100px' disabled='true'></select>";   
		}
		else if(elt_type == "button")
		{

			htmlStr +="<button id='"+rowid+"' class='"+rowid+"_div"+" "+theClass+"' style='min-width: 80px;' role='button' aria-disabled='false' type='button' freezeonsubmit='true' value='Submit'>";
			htmlStr +="<span class='ui-button-text'>Button"
			htmlStr +="</span>";
			htmlStr +="</button>";
		}
		else if(elt_type == "textarea")
		{
			htmlStr +="<textarea role='textbox' id='"+rowid+"' class='"+rowid+"_div"+" "+theClass+"' style='width:100px; float: left;' disabled='true'></textarea>";
		    htmlStr +=additionalImg;												
		}
		else if(elt_type == "panel")
		{
			htmlStr +="<div id='"+rowid+"' class = '"+rowid+"_div'>"
			htmlStr +="<div style='position:relative;width:98%;height:15px' class='collapsibleContainerTitle ui-state-focus ui-corner-top path-collapsable-header'>";
			htmlStr +="<span id='"+rowid+"_spanLabel' class='collapsibleLabel'>Title</span><span class='collapsibleIcon'><span class='ui-icon ui-icon-circle-triangle-n'></span></span></div>";
			htmlStr +="<div id='"+rowid+"_collapseDiv' style='position:relative; width:98%; height:80%; border-style:solid; border-width:thin; border-color:black;' class='droppable collapsibleContainerContent ui-widget-content'>";
			htmlStr +="</div>";
			htmlStr +="</div>";

		}
		else if(elt_type == "grid")
		{
			htmlStr +="<div id='"+rowid+"' class = '"+rowid+"_div' style='width:100px;'>"
			htmlStr +="<div class='ui-jqgrid-view'>"
			htmlStr +="<div class='ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix' style='display: none;'></div>"
			htmlStr +="<div class='ui-state-default ui-jqgrid-hdiv' style='width: 100%;'>"
			htmlStr +="<div class='ui-jqgrid-hbox'>"
			htmlStr +="<table class='ui-jqgrid-htable' style='width:100%;' role='grid' cellspacing='0' cellpadding='0' border='0'>"
			htmlStr +="<thead><tr class='ui-jqgrid-labels ui-sortable' role='rowheader' style=''>"
			htmlStr +="<th role='columnheader'class='ui-state-default ui-th-column ui-th-ltr' style='width: 100%;'>"
			htmlStr +="<span class='ui-jqgrid-resize ui-jqgrid-resize-ltr' style='cursor: col-resize;''>&nbsp;</span>"
			htmlStr +="Column Name</th></tr>"
			htmlStr +="<tr class='ui-search-toolbar' role='rowheader'>"
			htmlStr +="<th role='columnheader' class='ui-state-default ui-th-column ui-th-ltr'>"
			htmlStr +="<div style='width:100%;position:relative;height:100%;padding-right:0.3em;'><input type='text' readonly style='width:95%;padding:0px;'  value=''></div>"
			htmlStr +="</th></tr></thead></table></div></div></div></div>";
		}
		else if(elt_type == "tab")	// build Tabbed Panel building block inside that tabs generated
		{
			htmlStr +="<div id='"+rowid+"' class = '"+rowid+"_div'>"
			htmlStr +="<div id='"+rowid+"_tabbedPanelDiv' class='pathMinWidth ui-tabs ui-widget ui-widget-content ui-corner-all' style='visibility: visible; padding-bottom: 0px; padding-top: 0px; min-width:100%'>";
			htmlStr +="<ul class='ui-tabs-nav ui-widget-header ui-corner-all'>";
			htmlStr +="</ul>";			
			htmlStr +="</div>";
			htmlStr +="</div>";
		}		
		else
		{
			htmlStr +="<input type='"+elt_type+"' id='"+rowid+"' class='"+rowid+"_div"+" "+theClass+"' style='width:100px; float: left;' disabled='true'></input>";
		    htmlStr +=additionalImg;
		}
		
			htmlStr += "</div>";
		$(_this).append(htmlStr);
	    ui.helper.html("");
	    $( "#"+rowid+"_div").draggable({ containment: "#"+targetElem,cancel:null,scroll:true});
		$( "#"+rowid+"_div").resizable({ containment: "#"+targetElem});
			if(theType == 2)
			{
			    /**
			     * in case of a label keys widget ,on drop a model dialog will appear
			     * this dialog will be contains a list of the defined keys from the translation file. 
			     * @memberOf {TypeName} 
			     */
				
	        var labelDialogOptions = {
    	    		     modal:true
        	    		,title:(typeof smartLabel_title_key == "undefined" || smartLabel_title_key == "")?"Label Editor":smartLabel_title_key
				        ,width:'320'
				        ,height:'150'
			            ,dialogClass: 'no-close'
			            ,closeOnEscape: false
            	        ,buttons:{
            	    		ok: function(){
            	    		  var newValue = $("#lookuptxt_labelEdit").val();
            	    		  if(newValue!=null && typeof newValue !='undefined' && newValue!='')
            	    		  {
            	    			  $("#"+rowid).val(newValue);
                	    		  $("#"+rowid+"_div").attr("value",newValue);
                	    		  $("#"+rowid+"_div").attr("tnsKey","");
                	    		  $("#"+rowid).html(newValue);
                	    		  $(this).dialog("close");
            	    		  }
            	    		  else
            	    		  {
            	    			_showErrorMsg("New Value is Required",error_msg_title);
            	    		  }
            	    		}
            	    	    ,cancel: function(){
            	    	      $(this).dialog("close");
            	    	    }
            	        }
        	    	};
	    	var	smartLabelDiv = $("<div id='smartLabel_div' class='path-common-sceen'></div>");
	    	smartLabelDiv.css("padding","0");
	    	smartLabelDiv.insertAfter($('body'));
	    	var _smartLabelParams = {};
            var smartLabelSrcURL  = jQuery.contextPath+"/path/screenGenerator/generatorMaint_loadSmartLabel";
	        $("#smartLabel_div").load(smartLabelSrcURL, _smartLabelParams, function() {_showProgressBar(false);});
	        $("#smartLabel_div").dialog(labelDialogOptions);
	        $("#smartLabel_div").dialog("open");					                	        
	    	labelId = rowid;
			}
            /**
             * build a droppable erea in case off collapsible element
             */
			 if(elt_type == "panel")
			 {
				 $("#"+rowid+"_collapseDiv").droppable({
				       activeClass: "ui-state-hover",
				       hoverClass: "ui-state-active",
				       greedy:true,
				       drop: function( event, ui ) 
				       {
				    	 _callActionToCheckSession();
				    	 screenGenerator_onDrop(event,ui,document.getElementById(rowid+"_collapseDiv"));
				       }
				 });
			 }
			 /**
			  * build Tab inside Tabbed Panel
			  * this will open dialog to input the Tab title and then display the Tab inside Tabbed Panel
			  * rowid is the unique number to generate unique techid of the component
			  * Tab1 is the default title
			  * tab_1 is the default id
			  */
			 if(elt_type == "tab")
			 {
				 dynamicscreen_addTabbedPanelTab(rowid, 'Tab1', 'tab_1');
			 }
    }
    else
    {
    	helperId = ui.helper.attr("id");
    	offset = ui.offset;
    	//used to append screen element inside tab when dropped from screen to inside tab
    	var targetElemType = $(_this).attr("type");
    	var targetTechId = $(_this).attr("techid");
    	var targetParentTechId = $(_this).attr("parenttechid");
    	if(targetElemType==14 && targetTechId != null && targetTechId != "" && targetParentTechId != null && targetParentTechId != "")
    	{
    		var offset = $("#"+targetElem).offset()
    	    var top = parseInt($(ui.draggable).offset().top) - offset.top;
    	    var left = parseInt($(ui.draggable).offset().left) - offset.left;
    		$(ui.draggable).appendTo("#"+targetElem);
    		$(ui.draggable).css({'top' : top, 'left' : left});
    		$(ui.draggable).attr("parenttechid",targetTechId);
    		$( "#"+helperId).draggable({ containment: "#"+targetElem,cancel:null,scroll:true});
    		$( "#"+helperId).resizable({ containment: "#"+targetElem});
    	}
    }
    
    // Adel - This is used to enable multi select on items (after each drop add the item to editorDiv) 
    var selected = $([]), offset = {top:0, left:0}; 

    $( "#editor_div > div, div._newdrag.ui-draggable" ).draggable({
     start: function(ev, ui) {
    	 if ( (($(this).hasClass("_newdrag") && $(this).hasClass("ui-draggable") && $(this).hasClass("ui-resizable")) ||
    	 
    	 ($(this).hasClass("droppable") && $(this).hasClass("collapsibleContainerContent") && $(this).hasClass("ui-widget-content") && $(this).hasClass("ui-droppable")))				 
    	 && $(this).hasClass("ui-selected")
    	 ){
    		selected = $("._newdrag.ui-draggable.ui-resizable.ui-selected").each(function() {
    			var el = $(this);
    			el.data("offset", el.offset());
    		 });
    	 }
    	 else {
    		 selected = $([]);
    		 $("#editor_div > div").removeClass("ui-selected");
    	 }
    	 offset = $(this).offset();
     },
     drag: function(ev, ui) {
    	 var dt = ui.position.top - offset.top, dl = ui.position.left - offset.left;
    	 // take all the elements that are selected expect $("this"), which is the element being dragged and loop through each.
    	 selected.not(this).each(function() {
    		  // create the variable for we don't need to keep calling $("this")
    		  // el = current element we are on
    		  // off = what position was this element at when it was selected, before drag
    		  var el = $(this), off = el.data("offset");
   		  if(!el.parents('._newdrag').length)
   		  {
			  var topTemp = off.top + dt;
			  var leftTemp = off.left + dl;
			  
			  var bottomTemp = topTemp + ui.helper.context.offsetHeight;
			  var rightTemp = leftTemp + ui.helper.context.offsetWidth;
			  
			  if (topTemp < 0)
			  {
				  topTemp = 0;
			  }
			  if (leftTemp < 0)
			  {
				  leftTemp = 0;
			  }
			  if (bottomTemp >= 1570)
			  {
				  topTemp = 1570- ui.helper.context.offsetHeight;
			  }
			  if (rightTemp >= 1026)
			  {
				  leftTemp = 1026 - ui.helper.context.offsetWidth;
			  }
			el.css({top: topTemp, left: leftTemp});
   		  }
    	 });
    	 screenGenerator_addElemLines($(this));
     },
     stop: function(ev, ui) {
    	 screenGenerator_addElemLines($(this));
     }
    });
    screenGenerator_removeLines(event);
}
/**
 * @modifiedBy Sajjad Soomro
 * @modifiedDate 16 Dec, 2019
 * @description skip to open properties screen when element is child tab
 * 
 * @param currSelectedId
 * @param screenId
 * @returns
 */
function screenGenerator_openPropertiesWidget(currSelectedId, screenId)
{
    var elemId;
    var newElem = "false";
    if(currSelectedId.indexOf("new_")!=-1)
    {
	  elemId = currSelectedId.split("_")[1];
	  newElem = "true";
    }
    else
    {
	  elemId = currSelectedId;
    }
	var elementId   = parseInt(elemId);
	var elementType = $("#"+currSelectedId).attr("type");
	var tabType = $("#"+currSelectedId).attr("tabType");
	//if it is a child tab then return to skip open properties window
	if(elementType==14 && (tabType=="undefined" || tabType=="" || tabType==null))
	{
		return 0;
	}	
	var omniFlagScr = false;
	var omniFlagElem = $("#screenOmniFlagId");
	if(omniFlagElem !="undefined" && omniFlagElem!=null && omniFlagElem.length > 0)
	{
		omniFlagScr = $("#screenOmniFlagId").is(":checked");
	}
	var lookupDesc = [];
	var labelFor = [];
	if (elementType != null && elementType == "2") {
		$("#editor_div textarea").each(function(i) {
			var pId = $(this).attr("propId");
			var lsd = {
				pId : pId,
				elemId : pId
			};
			labelFor.push(lsd);
		});
		$("#editor_div select").each(function(i) {
			var pId = $(this).attr("propId");
			var lsd = {
				pId : pId,
				elemId : pId
			};
			labelFor.push(lsd);
		});
		$("#editor_div input").each(function(i) {
			var pId = $(this).attr("propId");
			var lsd = {
				pId : pId,
				elemId : pId
			};
			labelFor.push(lsd);
		});
	}
	if (elementType != null && elementType == "7") {
		$("#editor_div input").each(function(i) {
			if ($(this).attr("type") == 'text') {
				var pId = $(this).attr("propId");
				var lsd = {
					pId : pId,
					elemId : pId
				};
				lookupDesc.push(lsd);
			}
		});
	}
	screenTableId
	var screenTableId = $("#screenTableId").val();

	lookupDesc = JSON.stringify(lookupDesc);
	labelFor = JSON.stringify(labelFor);
	var currElementPropMap = returnCurrElementPropertiesMap(elementId);
	var params = {"criteria.elementId":elementId,
			"criteria.newElem":newElem,
			"criteria.elementType":elementType,
			"criteria.screenId":screenId,
			"criteria.lookupDesc":lookupDesc,
			"criteria.labelFor":labelFor,
			"criteria.scrTableId":screenTableId,
			"criteria.omniFlagScr":omniFlagScr};
	if(typeof currElementPropMap !="undefined" && currElementPropMap!=null && currElementPropMap!="")
	{
		var currElemProperties = Object.getOwnPropertyNames(currElementPropMap);
		for(var j = 0;j< currElemProperties.length ; j++)
		{
		   var currAttrName = currElemProperties[j];
		   if(typeof currElementPropMap[currAttrName]!="undefined" && currElementPropMap[currAttrName]!=null)
		   {			   
			   params["criteria.currElemProperties."+currAttrName]= currElementPropMap[currAttrName];
		   }
		}
	}
	var actionSrc  = jQuery.contextPath+"/path/screenGenerator/propertiesDetailsDynAction_loadPropertiesDetails?";
	_showProgressBar(true);
	$.post(actionSrc
		   ,params
	       ,function(data)
 	        {
	           $("#elementPropertiesWidId").html(data);
			   var _autoCompleteTags   = screenGeneratorProp_returnAllElementsIds(false); 
	           var propertiesJsonArray = cachePathData("dynScreenPropertiesArray");
			   if(propertiesJsonArray!=null && propertiesJsonArray.length > 0)
			   {
				  getCurrElementPropFromArr(elementId,elementType);
			   }
			   var expressionSelector = "[name='propertiesValMap.elemProp_readOnly'],[name='propertiesValMap.elemProp_required'],[name='propertiesValMap.elemProp_readOnly'],[name='propertiesValMap.elemProp_visible'],[name='propertiesValMap.elemProp_validate']";
			   if(parseInt(elementType) == 2 || parseInt(elementType) == 8)
			   {
				 var labelVal = $("#"+currSelectedId).attr("value");
				 if($("#lookuptxt_"+elementId+"_value").length > 0)
				 {
					 $("#lookuptxt_"+elementId+"_value").val(labelVal);
				 }
				 else
				 {						 
					 $("#"+elementId+"_value").val(labelVal);
				 }
			   }
			   else
			   {				   
				   expressionSelector = expressionSelector + ",[name='propertiesValMap.elemProp_value']";
			   }
			   var expressionElements = $(expressionSelector);
			   expressionElements.each(function(i){
			     var currExprElementId = $(this).attr("id");
			     apply_auto_complete(currExprElementId,_autoCompleteTags);
			   });
			   $("[name='propertiesValMap.elemProp_id']").bind("keyup",function(event){
                  screenGenerator_onkeyUp(event)
			   });
			   $("[name='propertiesValMap.elemProp_name']").bind("keyup",function(event){
				   screenGenerator_onNamekeyUp(event)
			   });
			   _showProgressBar(false);
	        }
	       ,"html");
}
function screenGenerator_onNamekeyUp(e)
{
  var currValue = e.target.value;
  var myRe     = new RegExp("^(?!\\d)[A-Za-z0-9_][\\w\\.]*$");  
  var regResult = myRe.exec(currValue);
  if(regResult == null || regResult.length == 0)
  {
    var caretPos = returnCursorPosStart(e.target);
    $("#"+e.target.id).val(e.target.value.substring(0, caretPos-1));
  }
}
function screenGenerator_onkeyUp(e)
{
  var currValue = e.target.value;
  var myRe     = new RegExp("^(?!\\d)[A-Za-z0-9_]\\w*$");  
  var regResult = myRe.exec(currValue);
  if(regResult == null || regResult.length == 0)
  {
    var caretPos = returnCursorPosStart(e.target);
    $("#"+e.target.id).val(e.target.value.substring(0, caretPos-1));
  }
}
function returnCurrElementPropertiesMap(elementId)
{
		 
	   var propertiesJsonArray = cachePathData("dynScreenPropertiesArray");
	   var propertiesValMap = null;
	   if(propertiesJsonArray!=null && propertiesJsonArray.length > 0)
	   {		   
		   for(var i=0;i<propertiesJsonArray.length;i++)
		   {
			   var currentElemId = propertiesJsonArray[i].elementId;
			   if(currentElemId == elementId)
			   {
				   var currObject    = propertiesJsonArray[i];
				   propertiesValMap = currObject.propertiesValMap;
				   break;
			   }
		   }
	   }
	   return propertiesValMap;
}
function getCurrElementPropFromArr(elementId,elementType)
{
   var alreadyExist = false;
   var elemVisibility,elemRequired,elemReadOnly,elemValue,elemPropName;
   var propertiesJsonArray = cachePathData("dynScreenPropertiesArray");
   for(var i=0;i<propertiesJsonArray.length;i++)
   {
		var currentElemId = propertiesJsonArray[i].elementId;
		if(currentElemId == elementId)
		{
		    var currObject = propertiesJsonArray[i];
		    var currPropertiesObj  = currObject.propertiesValMap;
		    var currElemProperties = Object.getOwnPropertyNames(currPropertiesObj);
		    for(var j = 0;j< currElemProperties.length ; j++)
		    {
		    	var currAttrName = currElemProperties[j];
		    	var realPropName = currAttrName.split("_")[1];
		    	var propId = elementId+"_"+realPropName;
		    	
		    	/**
		    	 * [MarwanMaddah]
		    	 * in case the current property layout type is a liveSearch 
		    	 * in case there is a table linked to the screen, so the property name layout will be a livesearch instead of text
		    	 */
		    	if($("#lookuptxt_"+propId).length == 1)
		    	{
		    		propId = "lookuptxt_"+propId;
		    	}
		    	
		    	var theValue = currPropertiesObj[currAttrName];
		    	if($("#"+propId).attr("type") == "checkbox")
		    	{
		    		if(theValue == "1")
		    		{
		    			$("#"+propId).attr("checked","checked");
		    		}
		    		else
		    		{
		    			$("#"+propId).removeAttr("checked");
		    		}
		    		
		    		// added for the grid widget in order to keep dependency between elements
	    			if(elementType == 12 && realPropName == 'editable')
	    			{
	    				//Fix Disable/enable properties before saving for grid elements depending on editable property 
	    				if( theValue == "1")
	    				{
	    					liveSearch_makeReadOnly(false,elementId+"_tableName");
	    					$("#"+elementId+"_query").addClass("ui-state-disabled");
	    					$("#"+elementId+"_query").attr('disabled', true);
	    					$("#"+elementId+"_dblClick").addClass("ui-state-disabled");
	    					$("#"+elementId+"_dblClick").attr('disabled', true);
	    					$("#"+elementId+"_colProps").attr('disabled', false);
	    					$("#"+elementId+"_colProps").removeClass("ui-state-disabled");
	    					$("#"+elementId+"_retCond").attr('disabled', false);
	    					$("#"+elementId+"_retCond").removeClass("ui-state-disabled");
	    				}
	    				else
	    				{
	    					liveSearch_makeReadOnly(true,elementId+"_tableName");
	    					$("#"+elementId+"_query").removeClass("ui-state-disabled");
	    					$("#"+elementId+"_query").attr('disabled', false);
	    					$("#"+elementId+"_dblClick").removeClass("ui-state-disabled");
	    					$("#"+elementId+"_dblClick").attr('disabled', false);
	    					$("#"+elementId+"_colProps").attr('disabled', true);
	    					$("#"+elementId+"_colProps").addClass("ui-state-disabled");
	    					$("#"+elementId+"_colProperties").val("");
	    					$("#"+elementId+"_retCond").attr('disabled', true);
	    					$("#"+elementId+"_retCond").addClass("ui-state-disabled");
	    					$("#"+elementId+"_retCond").val("");
	    				}
	    			}
		    	}
		    	else
		    	{		    		
		    	    $("#"+propId).val(theValue);
		    	}
		    }
			break;
		}
   }
}
function showPropertiesdiv() {
//	$("#widgetListDiv").height($("#btndiv").height() - 2)
	$("#elementPropertiesWidId").effect("slide", {}, 80);
}
function hidePropertiesdiv() {
	$("#elementPropertiesWidId").hide();
}

function fillPropertiesJsonArray(currSelectedId)
{
   var elemId;
   var propertiesJsonArray = cachePathData("dynScreenPropertiesArray");
   if(typeof propertiesJsonArray=="undefined" || propertiesJsonArray==null)
   {
	  propertiesJsonArray = []; 
   }
   if(currSelectedId.indexOf("new_")!=-1)
   {
	  elemId = currSelectedId.split("_")[1];    
   }
   else
   {
	  elemId = currSelectedId;
   }
   var elementId = parseInt(elemId);
   if($("#"+elementId+"_id").length == 0)
   {
	   return;
   }
   
   var alreadyExist = false;
   var currElemArr  = {};
   var propertiesValMap = {};
   var elementIndex;
   $("[name^='propertiesValMap.elemProp_']").each(function(i){
	   var currId   = this.id;
	   var attrName = this.name.split(".")[1];
	   var currVal;
	   if($("#"+currId).attr("type") == "checkbox")
	   {
		   if($("#"+currId).is(":checked"))
		   {
			 currVal = "1";
		   }
		   else
		   {
			 currVal = "0"; 	      
		   }
	   }
	   else
	   {		   
	      currVal = $("#"+currId).val();
	   }
	   if(alreadyExist)
	   {
		   (propertiesJsonArray[elementIndex])["propertiesValMap"][attrName]  = currVal;
	   }
	   else
	   {
		   for(var i=0;i<propertiesJsonArray.length;i++)
		   {
				var currentElemId = propertiesJsonArray[i].elementId;
				if(currentElemId == elementId)
				{
					(propertiesJsonArray[i])["propertiesValMap"][attrName] = currVal;
					alreadyExist = true;
					elementIndex = i;
					break;
				}
		   }
		   if(!alreadyExist)
		   {
			  propertiesValMap[attrName] = currVal; 
		   }
	   }
   });
   
   if(Object.getOwnPropertyNames(propertiesValMap).length > 0)
   {
	  currElemArr["propertiesValMap"] = JSON.parse(JSON.stringify(propertiesValMap)); 
	  currElemArr["elementId"] = elementId; 
	  propertiesJsonArray.push(currElemArr);
	  cachePathData("dynScreenPropertiesArray",propertiesJsonArray);
   }
}
function screenGeneratorList_addCreateFromIcon()
{
	$("#screenGeneratorListGridTbl_Id").jqGrid ('navButtonAdd', '#screenGeneratorListGridTbl_Id_pager',
            { id:"screenGeneratorListCreateFromBtn", 
              caption:grid_createFromLabel,
              buttonicon: "ui-icon-copy",
              title: grid_createFromLabel,
              onClickButton: function() {
            	  screenGeneratorList_onDbClickedEvent(true);                 
            }});
}
function screenGeneratorlist_addImportExportBtns()
{
	$("#screenGeneratorListGridTbl_Id").jqGrid ('navButtonAdd', '#screenGeneratorListGridTbl_Id_pager',
            { id:"screenGeneratorListImportBtn", 
              caption:"",
              buttonicon: "ui-icon-arrowthickstop-1-n",
              title: import_key,
              onClickButton: function() {
            	  screenGeneratorList_openImportDialog(true);                 
            }});	
	$("#screenGeneratorListGridTbl_Id").jqGrid ('navButtonAdd', '#screenGeneratorListGridTbl_Id_pager',
			{ id:"screenGeneratorListExportBtn", 
		caption:"",
		buttonicon: "ui-icon-arrowthickstop-1-s",
		title: export_key,
		onClickButton: function() {
			screenGeneratorlist_onExportClicked();                 
		}});	
}
function screenGeneratorlist_onExportClicked()
{
	var $table = $("#screenGeneratorListGridTbl_Id");
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	if(typeof selectedRowId == "undefined" || selectedRowId == null || selectedRowId == "")
	{
		return;
	}
	var myObject = $table.jqGrid('getRowData', selectedRowId);
	/**
	 * get the selected rowId
	 */
	var _screenId = myObject["DYN_SCREEN_ID"];

	if(_screenId!=null && _screenId!=null && _screenId!="")
	{
		_showConfirmMsg(confirm_Export_Process_key, Warning_key,
				screenGeneratorList_exportAfterConfirm, {screenId : _screenId});		
	}
	else
	{
		_showErrorMsg("No Screen Selected to Export it",info_msg_title);
	}
}
function screenGeneratorList_exportAfterConfirm(confirm,args)
{
	var theParam ={};
	theParam["dynScreenCreatorCO.sysDynScreenDefVO.DYN_SCREEN_ID"] = args.screenId;
	if(confirm)
	{
		var exportUrl = jQuery.contextPath+"/path/screenGenerator/dynScreenExport_exportScreen";
		$.fileDownload(exportUrl,
		{
		    successCallback: function () {
				_showProgressBar(false);
				screenGenerator_initializeAfterSubmit();
				
		    },
		    failCallback: function (html, url) {
		    	_showProgressBar(false);
		        _showErrorMsg(html);
		    },
		    data:theParam
	    });
		
	}
}

function screenGeneratorList_openImportDialog()
{
	var dynImportDialogDiv = $("<div id='dynImportDialogDiv' class='path-common-sceen'></div>");
	dynImportDialogDiv.css("padding","0");
	var theBody = $('body');
	dynImportDialogDiv.insertAfter(theBody);	
	dialogUrl= jQuery.contextPath+ "/path/screenGenerator/ScreenGeneratorMaintAction_openImportDialog?";
	dialogOptions={ autoOpen: false,
					height:150,
					title:import_key,
					width:340 ,
					modal: true,
					buttons: [ { text : (typeof cancel_label_trans === undefined )? "Close" :cancel_label_trans , click :function(){$(this).dialog('close');}}
			          ],
		           close: function (){
						  $("#dynImportDialogDiv").dialog("destroy");
						  $("#dynImportDialogDiv").remove();
				   }
	   }
	var params = {};
	$.post(dialogUrl ,params , function( param )
 	{
	  $('#dynImportDialogDiv').html(param) ;
	  $('#dynImportDialogDiv').dialog(dialogOptions)
	  $('#dynImportDialogDiv').dialog('open');
	},"html");
}

function screenGeneratorList_importFile(confirmationResponse) {
	if ($("#screenGeneImport_File").length && !$("#screenGeneImport_File").val()) {
		_showErrorMsg(dyn_import_File_Loc_key);
		return false;
	}
	
	var splitName = $("#screenGeneImport_File").val().split(".");
	
	if (splitName.length == 1 || (splitName[0] == "" && splitName.length == 2)) {
		_showErrorMsg(file_bpmn2_ext_key);
		return false;
	}
	
	if (splitName.pop().toLowerCase() != "dynscr") {
		$("#screenGeneImport_File").val("");
		_showErrorMsg(file_bpmn2_ext_key);
		return false;
	}
	
	_showProgressBar(true);
	
	var options = {
		url : jQuery.contextPath+"/path/screenGenerator/dynScreenImport_importScreen?confirmationResponse=" + confirmationResponse,
		type : 'post',
		success : function(response, status, xhr) 
		{
			_showProgressBar(false);
			var jsonObj = $.parseJSON($(response).html());
			if (jsonObj["_error"] == undefined || jsonObj["_error"] == null	|| jsonObj["_error"] === "") 
			{
				if (jsonObj["_confirm"] != undefined && jsonObj["_confirm"] != null) 
				{
				
					_showConfirmMsg(jsonObj["_confirm"] , confirm_msg_title, function(confirmcChoice, theArgs){
						if(confirmcChoice)
						{
							screenGeneratorList_importFile(true);
						}
					});
					
				} 
				else
				{
					_showErrorMsg(Process_Executed_Successfully_key,
							success_msg_title);
					$('#dynImportDialogDiv').dialog('close');
	                if($("#screenGeneratorListGridTbl_Id").html()!=null && $("#screenGeneratorListGridTbl_Id").html()!="")
	                {
	                   $("#screenGeneratorListGridTbl_Id").trigger("reloadGrid");
	                }					
				}
			} 
			else 
			{
				_showErrorMsg(jsonObj["_error"]);
			}
		},
		error : function(response) 
		{
			_showProgressBar(false);
			_showErrorMsg("error " + response);
		}

	};
	
	$("#screenGeneImportForm_Id").ajaxSubmit(options);
}
/**
 * @createdBy Sajjad Soomro
 * @createdDate 16 Dec, 2019
 * @description this method is used to fill Tab Properties and saved it into the cached path data
 * 
 * @param currSelectedId
 * @param propId
 * @returns
 */
function fillTabPropertiesJsonArray(currSelectedId, propId, tabTitle)
{
	var elemId;
	if(currSelectedId.indexOf("new_")!=-1)
	{
		elemId = currSelectedId.split("_")[1];    
	}
	else
	{
		elemId = currSelectedId;
	}
	var elementId = parseInt(elemId);
	
	var elementIndex;
	var propertiesJsonArray = cachePathData("dynScreenPropertiesArray");
	if(typeof propertiesJsonArray=="undefined" || propertiesJsonArray==null)
	{
		elementIndex = 0;
		propertiesJsonArray = [];
	}
	else
	{
		elementIndex = propertiesJsonArray.length;
	}
	
	var isAlreadyExists = false;
	$(propertiesJsonArray).each(function(index){
		if(propertiesJsonArray[index]["elementId"]==elementId)
		{
			isAlreadyExists = true;
			propertiesJsonArray[index]["propertiesValMap"]["elemProp_id"] = propId;
			propertiesJsonArray[index]["propertiesValMap"]["elemProp_title"] = tabTitle;
		}
	});
   
	if(!isAlreadyExists)
	{
		propertiesJsonArray[elementIndex] = {};
		propertiesJsonArray[elementIndex] = {
			"propertiesValMap" : {
				"elemProp_id" : propId,
				"elemProp_name" : "",
				"elemProp_readOnly" : "",
				"elemProp_required" : "",
				"elemProp_visible" : "",
				"elemProp_title" : tabTitle
			},
			"elementId" : elementId
		}
	}
	cachePathData("dynScreenPropertiesArray",propertiesJsonArray);	
}
/**
 * @createdBy Sajjad Soomro
 * @createdDate 07 Feb, 2020
 * @description used to adjust the tabbed panel tab size
 * 
 * @param ui
 * @returns
 */
function adjustTabSize(ui)
{
	var type = ui.originalElement.attr("type");
	var tabType = ui.originalElement.attr("tabType");
	// if element is parent tab then resize the child tabs
	if (typeof type !== typeof undefined && type !== false && type==14  && 
			typeof tabType !== typeof undefined && tabType !== false && tabType === "main_tab")
	{
		var origElemId = ui.originalElement.attr("id");
	    var width = ui.size.width;
	    var height = ui.size.height;
	    $("."+origElemId+"_tab").css("width",width-5);
	    $("."+origElemId+"_tab").css("height",height-36);
	}	
}
/**
 * @createdBy Sajjad Soomro
 * @createdDate 07 Feb, 2020
 * @description used to remove the element borders
 * 
 * @param elem
 * @returns
 */
function removeElemBorders(elem)
{
	var type = elem.attr("type");
    var tabType = elem.attr("tabType");
	// if element is not child tab then change the border of the element
	if(type!=14 || (type==14 && tabType==="main_tab"))
	{
		elem.css("border","0px");
		elem.css("cursor","");
	}
}
/**
 * @createdBy Sajjad Soomro
 * @createdDate 07 Feb, 2020
 * @description validate the element is child tab or not
 * 
 * @param elem
 * @returns boolean
 */
function isChildTab(elem)
{
	var isChildTab = false;
	var type = elem.attr("type");
	var tabType = elem.attr("tabType");
 	if (typeof type !== typeof undefined && type !== false && type==14 && 
 		(typeof tabType === typeof undefined || tabType === false || tabType === "")) 
 	{
 		isChildTab = true;
 	}
 	return isChildTab;
}
//TP#897711 SUPT190250 - Nazim Jassar ; 29/11/2019 [START]
function dynamiGridColumn_actionTypeChanged(gridId,formId) 
{
	dynamicScreen_updateFooterRow(gridId,formId);
}
//TP#897711 SUPT190250 - Nazim Jassar ; 29/11/2019 [END]
