function _mnglivsch(multiResultInput,lookupTxt,mode,readOnlyModeValue,id,lookupDiv,dependencyValue,dependencySrcValue,parameterValue,spanLookup,afterDepEvent,overlay,beforeDepEvent,dynExpressionsArgsVal,customBtnData,customKeyEventBtnData)
{
	if(multiResultInput != "" && $("#" + multiResultInput).val() != "")
	{
		var nbSel = $.parseJSON($("#" + multiResultInput ).val())["root"].length ;
		if(nbSel > 0)
		{
			$(document.getElementById(lookupTxt)).val(nbSel+" "+Selected_key)
		}
	}
	initLiveSearch(mode,lookupTxt,readOnlyModeValue,id,lookupDiv,dependencyValue,dependencySrcValue,parameterValue,spanLookup,afterDepEvent,overlay,beforeDepEvent,dynExpressionsArgsVal);
	if(typeof customBtnData !== 'undefined' && customBtnData != undefined && customBtnData != null )
	{
		$( "#lookuptxt_" + id ).data( "customBtnData", customBtnData );
	}
	if(typeof customKeyEventBtnData !== 'undefined' && customKeyEventBtnData != undefined && customKeyEventBtnData != null )
	{		
		$( "#lookuptxt_" + id ).data( "customKeyEventBtnData", customKeyEventBtnData );
		$( "#lookuptxt_" + id ).keydown(function(event) {
	    			if (event.keyCode === 117 && event.ctrlKey ) {
	        			customKeyEventCall('lookuptxt_' + id);
	   				}
		});
	}
}


function _mngCtrlFt(theObj)
{
	$('#'+theObj.id).bind("_event.dependency",function(event)
	{
		if(theObj.fieldAudit){
			callAuditOnField(theObj.id);
		}
		if(theObj.dependency && theObj.dependencySrc){
		 callDependency(theObj.dependency,theObj.dependencySrc,theObj.parameter,theObj.id,theObj.afterDepEvent,theObj.dynExpressionsArgs);
		}
	});

	if(theObj.fieldAudit)
		{ bindAuditEvent(theObj.id);}

	if($('#'+theObj.id).is(":checkbox"))
	{
		$('#'+theObj.id).bind("click",function(event)
		{
			var _callDep = true;
			if(theObj.beforeDepEvent){
				_callDep = eval(theObj.beforeDepEvent);
			}

			if(typeof _callDep == "undefined" || _callDep+"" != "false") //call dependency when there is no false result of beforeDepEvent
			{
				$('#'+theObj.id).trigger("_event.dependency");
			}
		});
	}
	else
	{
		$('#'+theObj.id).bind("change",function(event)
		{
			var _callDep = true;
			if(theObj.beforeDepEvent){
				_callDep = eval(theObj.beforeDepEvent);
			}

			if(typeof _callDep == "undefined" || _callDep+"" != "false") //call dependency when there is no false result of beforeDepEvent
			{
				$('#'+theObj.id).trigger("_event.dependency");
			}
		});
	}
}

function _chkDtBefLv(dateObj)
{
	if($.struts2_jquery.local !== "en")
	{
	   $.struts2_jquery.require(["js/base/i18n/ui.datepicker-"+$.struts2_jquery.local+".js"]);  
	}
	if(dateObj.timepicker)
	{	
		//PathSolutions loading timepicker only when specified 
		$.struts2_jquery.require( [ "js/plugins/jquery-ui-timepicker-addon" + $.struts2_jquery.minSuffix + ".js" ]);
		$.struts2_jquery.requireCss("themes/jquery-ui-timepicker-addon.css");
		if ($.struts2_jquery.local !== "en")
		{
			$.struts2_jquery.require("js/base/i18n/ui.timepicker-" + $.struts2_jquery.local + $.struts2_jquery.minSuffix + ".js");
		}
	}
	$('#'+dateObj.id).blur(function() {
		var value = $('#'+dateObj.id).val();
		var idObj = $("#"+dateObj.id)[0];// returns the object it self
		$.datepicker._checkDateBeforeLeaving(idObj, dateObj.displayFormat, value);
	});
}

function _mngHijCal()
{
	//loading islamic calendar files only when showhijri is set to true
	$.struts2_jquery.requireCss("js/base/calendars/jquery.calendars.picker.css");
	$.struts2_jquery.requireCss("js/base/calendars/ui.calendars.picker.css");
	$.struts2_jquery.require(["js/base/calendars/jquery.calendars.js","js/base/calendars/jquery.calendars.plus.js","js/base/calendars/jquery.calendars.picker.js","js/base/calendars/jquery.calendars.islamic.js"]);
	if($.struts2_jquery.local !== "en")
	{
		$.struts2_jquery.require(["js/base/calendars/jquery.calendars.picker-"+$.struts2_jquery.local+".js","js/base/calendars/jquery.calendars.islamic-"+$.struts2_jquery.local+".js"]);
	}
}

function _reqArInp()
{
	$.struts2_jquery.require("ArabicInput.js","",jQuery.contextPath+"/common/jquery/");
}

var ddmenuitem = 0;
var _men_head_list_elemnt = 0;
function _menLayOut(theObj)
{
	$.struts2_jquery.requireCss("PortletPageMenu.css",jQuery.contextPath +'/common/dashboard/themes/css/');
	var _addPortlCssFile = "PortletPageMenu_Custom_ltr.css";
	if(theObj.currRTL == "rtl")
	{
	 _addPortlCssFile = "PortletPageMenu_Custom_rtl.css";
	}
	$.struts2_jquery.requireCss(_addPortlCssFile,jQuery.contextPath +'/common/dashboard/themes/css/');
}

function jsddm_close()
{
	if(ddmenuitem)
	{
		$(_men_head_list_elemnt).removeClass("li_focus");
		if(document.dir == "rtl")
		{
	 		//ddmenuitem.css('left','-999em');
			ddmenuitem.css('display', 'none');
	 	}
	 	else
	 	{
	 		//ddmenuitem.css('left','-999em');
			ddmenuitem.css('display', 'none');
	 	}
	 }
}

function submenuMouseoutHandler(event, curDiv)
{
	var toElement = null;
	var eventSrc = event.relatedTarget || event.toElement; 
	if (eventSrc)
	{
		toElement = eventSrc;
	}
	
	while (toElement && toElement.id != curDiv.id)
	{
		toElement = toElement.parentNode;
	}
	
	if (!toElement)
	{
		jsddm_close(this);
		$(_men_head_list_elemnt).removeClass("li_focus");
	}
}

function _mngTabFt(escapedParentId,options)
{
	var $escapedParentId = jQuery("#"+escapedParentId);
	var tabs = $escapedParentId.data('taboptions');
	if (!tabs) {
		tabs = [];
	}
	tabs.push(options);
	$escapedParentId.data('taboptions', tabs);
}

/**
 * Public method to be used in customization Client Action to trigger change Event in case needed
 * @param elemtnId element Id on which the change to be fired
 * @returns
 */
function fireChangeEvent(elemtnId)
{
	var $element = $(document.getElementById(elemtnId));
	// if no Element fount try with _pageRef
	if($element.length < 1 && typeof _pageRef != undefined && _pageRef != null )
	{
		$element = $(document.getElementById(elemtnId+"_"+_pageRef));
	}
	
	if($element.length > 0)
	{
		$element.trigger("change");
	}
}
/**
 * Public method to be used in customization Client Action to make element visible or not
 * @param elemtnId element Id on which to be visible or hidden
 * @param visibleFlag galg to specify if it is visible or hidden
 * @returns
 */
function makeElementVisisble(elemtnId, visibleFlag)
{
	var addElts = {};
	addElts[""+elemtnId+""] = {"IS_VISIBLE" : visibleFlag}
	manageDynamicDisplay(elemtnId, addElts,elemtnId);
}
