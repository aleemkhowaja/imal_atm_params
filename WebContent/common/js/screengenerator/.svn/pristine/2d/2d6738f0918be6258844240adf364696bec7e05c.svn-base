var theSelectedID = "";
var app_func_id = 'C00MT';
var app_id = 1;
var templateId = 2;
function onRefreshClicked()
{
	$("#afterSubmit").val("");
	$("#messageTextId").html("");
	var comboVal = $("#TEMPLATE_ID").val();
	if(typeof comboVal!='undefined' && comboVal!=null && comboVal!='')
	{
	   onComboChange();		
	}
}
function onLiveSearchSelection()
{
	templateId = $("#TEMPLATE_ID").val();
   onComboChange();
}
function onComboChange()
{
	$.ajax({
		  url: jQuery.contextPath+"/generator/generatorMaintTEST?TEMPLATE_ID="+templateId,
		  type:"get",
		  dataType:"json",
		  success: function(data){
					 $("#editor_div").html(data.screenData);
					 $("#widgets_optional").html(data.optionalData);
			         $("#widgets_additional").html(data.additionalData);
			         var _editorTop = $("#editor_div").css("top");
			         var _westWidth = $(".ui-layout-west").width();
			         _editorTop = _editorTop.substring(0,_editorTop.length-2);
			         
	                 $( "._newdrag" ).draggable({containment: "#editor_div",cancel:null});
	                 $( "._optdrag" ).draggable({revert:true,helper:"clone"});
	                 $( "._adddrag" ).draggable({revert:true,helper:"clone"});
	                 var toAlsoResize="";
                	 $( "._newdrag" ).resizable({containment: "#editor_div"});
                	 $( "._newdrag" ).live({ 
					                		mouseenter: function() {
					                		     $(this).css("border","1.5px dashed #000");
					                		     $(this).css("cursor","move");
					                	         toAlsoResize = "."+this.id;
					                	         $(this).resizable({alsoResize:toAlsoResize});
					                		}
					                	    ,mouseleave: function() { 
					                	    	 $(this).css("border","0px"); 
					                	    	 $(this).css("cursor","");
	                	                    }
					                	    ,click: function(){
					                	    	 $("._newdrag").css("border","0px");
					                	    	 theSelectedID = "";
					                	    	 if($(this).hasClass("_newdrag") && $(this).attr("fromWidget")!="1")
					                	    	 {					                	    		 
					                	    		 $(this).css("border","1.5px dashed #000");
						                		     $(this).css("cursor","move");
						                	         toAlsoResize = "."+this.id;
						                	         theSelectedID = this.id;
						                	         $(this).resizable({alsoResize:toAlsoResize});
					                	    	 }
					                	    }
					                	    ,dblclick: function(){
					                	    	labelId  = this.id.substring(0,this.id.length-4);
					                	    	theSelectedID = this.id;
					                	    	var _curTop  = $(this).css("top");
					                	    	var _curLeft = $(this).css("left");
					                	    	_curTop      = _curTop.substring(0,_curTop.length-2);
					                	    	_curLeft     = _curLeft.substring(0,_curLeft.length-2);
					                	    	if($(this).attr("type")=="2")
					                	    	{
						                	    	$("#textId").html("The current Value is: "+$(this).attr("value"));
					                	    		$("#smartLabel").dialog({
						                	    		 modal:true
						                	    		,title:"Label Editor"
												        ,width:'320'
												        ,height:'150'
							                	        ,buttons:{
							                	    		ok: function(){
							                	    		  var newValue = $("#labelEdit").val();
							                	    		  if(newValue!=null && typeof newValue !='undefined' && newValue!='')
							                	    		  {
								                	    		  $("#"+labelId).val(newValue);
								                	    		  $("#"+labelId).html(newValue);
								                	    		  $(this).dialog("close");
							                	    		  }
							                	    		  else
							                	    		  {
							                	    			 alert("New Value is Required");  
							                	    		  }
							                	    		}
							                	    	    ,cancel: function(){
							                	    	      $(this).dialog("close");
							                	    	    }
							                	        }
						                	    	});
						                	    	$(".ui-dialog").css("top",Number(_curTop)+Number(_editorTop));
						                	    	$(".ui-dialog").css("left",Number(_curLeft)+Number(_westWidth));
					                	    	}
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
							       drop: function( event, ui ) 
							       {
							       		var dragHTML = ui.draggable.html();
							            var targetElem = $(this).attr("id");
							            if(ui.helper.attr("fromWidget") == "1")
							            {
							            	var rowid="";
							            	if(ui.helper.attr("status")=="2")
							            	{
							            	   rowid = ui.helper.attr("theId");
							            	   rowid = rowid.substring(0,rowid.length-4);
							            	   $("#"+rowid+"_div").remove();
							            	}
							            	else
							            	{
							            	   rowid = "new_"+(new Date()).getTime();
							            	}
							            	var top         = ui.offset.top;
							            	var left        = ui.offset.left;
										    var elt_type    = ui.helper.attr("type");
										    var elt_desc    = ui.helper.attr("value");
										    var elt_tns_key = ui.helper.attr("tnsKey");
										    if(elt_tns_key == null || typeof elt_tns_key == "undefined" || elt_tns_key =='')
										    {
										      	elt_tns_key = elt_desc+"_key";
										    }
										    var elt_status  = ui.helper.attr("status");
										    var theType = 1;
										    if(elt_type == "text")
										    {
										      theType =1;
										    }
										    if(elt_type == "labelKeys" || elt_type =="label")
										    {
										      theType = 2;
										    }
										    if(elt_type =="select")
										    {
										      theType = 3;	
										    }
										    if(elt_type =="date")
										    {
										      theType = 4;	
										    }
										    if(elt_type =="radio")
										    {  
										      theType = 5;
										    }
										    if(elt_type == "checkbox")
										    {
										      theType = 6;
										    }
							            	var htmlStr = "<div class='_newdrag' tnsKey='"+elt_tns_key+"' id='"+rowid+"_div' type='"+theType+"' value='"+elt_desc+"' style='position:absolute; top:"+top+"; left:"+left+"; border: 1px dotted #000;overflow:hidden;cursor:move;width:150px' status='"+elt_status+"'>";
											if(elt_type == "label" || elt_type == "labelKeys")
											{
												  htmlStr += "<label id='"+rowid+"' class='"+rowid+"' style='width:100px' value='"+elt_desc+"' disabled='true'>"+elt_desc+"</label>"
											}
											else
											{												  
											  if(elt_type =="select")
											  {
												htmlStr +="<select id='"+rowid+"' class='"+rowid+"' style='width:100px' disabled='true'></select>";   
											  }
											  else
											  {
												htmlStr +="<input type='"+elt_type+"' id='"+rowid+"' class='"+rowid+"' style='width:100px' disabled='true'></input>";
											  }
											}
							   				htmlStr += "</div>";
											$(this).append(htmlStr);
										    ui.helper.html("");
										    $( "._newdrag" ).draggable({ containment: "#editor_div",cancel:null});
							   				$( "._newdrag" ).resizable({ containment: "#editor_div"});
							   				if(theType == 2)
						   					{
					                	        $("#textId").html("The current Value is: "+elt_desc);	
							   					$("#smartLabel").dialog({
					                	    		 modal:true
					                	    		,title:"Label Editor"
											        ,width:'320'
											        ,height:'150'
						                	        ,buttons:{
						                	    		ok: function(){
						                	    		  var newValue = $("#labelEdit").val();
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
						                	    			alert("New Value is required");
						                	    		  }
						                	    		}
						                	    	    ,cancel: function(){
						                	    	      $(this).dialog("close");
						                	    	    }
						                	        }
					                	    	});
					                	    	labelId = rowid;
						   					}
							   			    /**
							   			     * in case of a label keys widget ,on drop a model dialog will appear
							   			     * this dialog will be contains a list of the defined keys from the translation file. 
							   			     * @memberOf {TypeName} 
							   			     */
							   				if(elt_type =="labelKeys")
							   			    {
					                	    	
					                	    	$("#smartLabelKeys").dialog({
					                	    	modal:true
					                	    	,title:"Label Editor"
					                	    	,width: '650'
					                	    	,height:'800'
					                	    	,position:'center'	
					                	        ,buttons:{
					                	    		ok: function(){
												  	 selectedRowId    = $("#KeysLisGridId").jqGrid('getGridParam','selrow');
												  	 myObject = $("#KeysLisGridId").jqGrid('getRowData',selectedRowId); 
												  	 $("#"+rowid).val(myObject["theKey"]);
												  	 $("#"+rowid).html(myObject["value"]);
												     $('#smartLabelKeys').dialog('close');
					                	    		}
					                	    	    ,cancel: function(){
					                	    	      $(this).dialog("close");
					                	    	    }
					                	        }
					                	    	});
							   			    }
							     	    }
							            else
							            {
							            	helperId = ui.helper.attr("id");
							            	offset = ui.offset;
							            }
							        }
			 });
          }
	});
}

function setHtmlDiv(saveAs)
{
	if(typeof $("#editor_div").html() === "undefined" || $("#editor_div").html().trim() === "") 
		return;
	
	var allDivs = [];
	var additionalDivs = [];
	var curDiv = {}
	var isDefault = saveAs;
	$( "#editor_div > div._newdrag" ).each(function (i)
	{
		curDiv = {};
		curDiv["TEMPLATE_ID"] = parseInt(templateId);//$(this).attr("templateId");
		curDiv["ELT_ID"] = this.id.substring(0,this.id.indexOf("_div"));
		curDiv["TOP_POS"] = parseInt(this.style.top);
		curDiv["LEFT_POS"] = parseInt(this.style.left);
		curDiv["ELT_CATEGORY"] = parseInt($(this).attr("status"));
		curDiv["ELT_WIDTH"] = parseInt(this.style.width.substring(0,this.style.width.indexOf("px")));
		if(typeof this.style.height === "undefined" || this.style.height === "")
		{
			curDiv["ELT_HEIGHT"] = 23;
		}
		else
			curDiv["ELT_HEIGHT"] = parseInt(this.style.height.substring(0,this.style.height.indexOf("px")));
		curDiv["ELT_TYPE"] = parseInt($(this).attr("type"));
		if(typeof $(this).attr("value") != "undefined" && $(this).attr("value") != "null")
			curDiv["ELT_DESC"] = $(this).attr("value") ;
		curDiv["APP_ID"] = parseInt(app_id);
		curDiv["APP_FUNC_ID"] = app_func_id;
		if($(this).attr("defTemp") === "1" || saveAs) // saveAs clicked 
		{
		  curDiv["TEMPLATE_ID"] =  -1;
		  isDefault = true;
		}
		/**
		 * Translation Management...
		 */
		if(typeof $(this).attr("tnsKey") != "undefined" && $(this).attr("tnsKey") !="null" && $(this).attr("tnsKey") !="")
			curDiv["TNS_KEY"] = $(this).attr("tnsKey");
		else
			curDiv["TNS_KEY"] = $(this).attr("value")+"_key";
		allDivs.push(curDiv);
	})
	
	$("#screenData").val("{"+ "\"root\":"+JSON.stringify(allDivs) +"}");
	if(isDefault)
	{
		$("#templateLabel").dialog({
    		 modal:true
    		,title:"Save new template"	
    		,show:'slide'
	        ,position:'center' 
	        ,width:'300'
	        ,height:'150'
	        ,buttons:{
	    		ok: function(){
	    		  var newValue = document.getElementById("templateEdit").value;
	    		  if(typeof newValue === "undefined" || newValue == "")
    			  {
    			  	alert("Template Name is mandatory")
    			  	return;
    			  }
	    		  document.getElementById("newTemplateName").value = newValue;
	    		  $(this).dialog("close");
	    		  submitTheForm();
	    		}
	    	    ,cancel: function(){
	    	      $(this).dialog("close");
	    	    }
	        }
		});
	}
	else
	{
		submitTheForm();
	}
}

function submitTheForm()
{
	document.getElementById("theForm").submit();
}
function onkeydown(e)
{
  /**
   * @memberOf {TypeName}
   * 
   * 1: Text
   * 2: Label
   * 3: Select
   * 4: Date
   * 5: Radio
   * 6: checkbox
   *
   */
  if(e.which == 46 && theSelectedID!=null && theSelectedID!="")
  {
     var _theStatus = $("#"+theSelectedID).attr("status");
     if(_theStatus == "1")
	 {
	   alert("you cannot delete a mandatory field");	 
	 }
	 else
	 {
	   var _tagType;
	   var _tagId        = theSelectedID.substring(0,theSelectedID.indexOf('_div'));
	   var _tagDesc      = $("#"+theSelectedID).attr("value");
	   var _tagTns       = $("#"+theSelectedID).attr("tnsKey");	   
	   var _selectedType = $("#"+theSelectedID).attr("type");
       $("#"+theSelectedID).remove();
       if(_theStatus == "2")
       {
		  switch(eval(_selectedType))
		  {
		    case 1:
		           _tagType = "text";    	
		    break;
		    case 2:
		    	   _tagType = "label"; 
		    break;
		    case 3:
		    	   _tagType = "select";
		    break;
		    case 4:
		    	   _tagType = "date";
		    break;
		    case 5:
		    	   _tagType = "radio";
		    break;
		    case 6:
		    	   _tagType = "checkbox";
		    break;
		  };
         var _toOptional="";
		 _toOptional +="<div class='_optdrag' tnsKey='"+_tagTns+"' templateId='" + templateId + "' theId='"+_tagId+"_div' id='" + _tagId
				     + "_div' fromWidget='1' value='" + _tagDesc + "' type='" + _tagType
				     + "' style='overflow:hidden; cursor:move; width:150px' status='" + _theStatus
				     + "'>";
		 _toOptional += "<img src='" + jQuery.contextPath+"/pages/generator/images/";
	
		 _toOptional += _tagType + ".png' alt='" + _tagDesc + "'>" + _tagDesc + "</img>";
		 _toOptional += "</div>";
		 $("#widgets_optional").append(_toOptional);
		 $( "._newdrag" ).draggable({ containment: "#editor_div",cancel:null});
		 $( "._optdrag" ).draggable({revert:true,helper:"clone"});
	     $( "._adddrag" ).draggable({revert:true,helper:"clone"});
       }
	 }
     theSelectedID = ""; 
  } 
}

function onGeneratorClick()
{
	$("#generatorManagement").load(jQuery.contextPath+"/generator/generatorLookup_search");
	$("#generatorManagement").dialog({modal:true, 
	                                  title:"Generator", 
	                                   show:'slide',
	                               position:'center', 
	                                  width:'650', 
	                                 height:'300',
	                                buttons:{
	                                          "Generate":function (){
		                                          $("#destination_id").val($("#sectionIds").text()); 
												  $("#generatorFormId").submit();
										      }
						                	 ,cancel: function(){
					                	    	      $(this).dialog("close");
					                	      }
	                                        }});	
}
function onTnsKeyClicked()
{
	$("#smartLabelKeys").dialog({
	modal:true
	,title:"Label Editor"
	,width: '320'
	,height:'300'
	,position:'center'	
    ,buttons:{
		ok: function(){
	  	 selectedRowId    = $("#KeysLisGridId").jqGrid('getGridParam','selrow');
	  	 myObject = $("#KeysLisGridId").jqGrid('getRowData',selectedRowId); 
	  	 if(myObject["value"]!=null && typeof myObject["value"] !='undefined' && myObject["value"]!='')
	  	 {
		  	 $("#"+labelId).val(myObject["value"]);
		  	 $("#"+labelId).html(myObject["value"]);
		  	 
		  	 $("#"+labelId+"_div").attr("tnsKey",myObject["theKey"]);
		  	 $("#"+labelId+"_div").attr("value",myObject["value"]);
		     
		  	 $('#smartLabelKeys').dialog('close');
		     $('#smartLabel').dialog('close');
	     }
	  	 else
	  	 {
	  	   alert("select a key.");	 
	  	 }
		}
	    ,cancel: function(){
	      $(this).dialog("close");
	    }
    }
	});
}