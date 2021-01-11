/**
 * 
 * @param mode
 * @param lookupTxt
 * @param readOnlyModeValue
 * @param parameters_id
 * @param lookupDiv
 * @param dependencyValue
 * @param dependencySrcValue
 * @param parameterValue
 * @param spanLookup
 * @param afterDepEvent
 * @param overlay
 * @param beforeDepEvent
 * @param dynExpressionsArgsVal: will be passed from the FTL in case there is dynamic expression
 * to be passed to the dependency and then to use it inside the interceptor to do the dynamic expression process
 */

function initLiveSearch(mode, lookupTxt,readOnlyModeValue,parameters_id,lookupDiv,dependencyValue,dependencySrcValue,parameterValue,spanLookup,afterDepEvent,overlay,beforeDepEvent,dynExpressionsArgsVal)
{
	var $lookupTxt = $("#"+lookupTxt);

	$.struts2_jquery.require( "LiveSearch.js",null,jQuery.contextPath +"/common/jquery/");
	$(document).ready(function(){ 
		var opts = eval("options_"+parameters_id+"_liveSearch");
		if(mode === "number")
		{
			applyFormat(lookupTxt);
		}
		/**
		 * [MarwanMaddah]
		 * in case of multi-selection, the input of the livesearch should be readonly on all case
		 * and the button that is beside it should be enable and the selection inside the lookup will be disabled 
		 */
		if($.trim(readOnlyModeValue) != "" && (typeof opts.multiSelect == "undefined" || opts.multiSelect==null || "true" != opts.multiSelect))
		{
			liveSearch_makeReadOnly(readOnlyModeValue,parameters_id);
		}
		else if(opts.multiResultInput)
		{
			liveSearch_makeReadOnlyText(true, parameters_id)
		}
		if(opts.relatedDescElt != "")
		{
			var _lookupDivElt = $("#"+lookupDiv);
			if(typeof _lookupDivElt.css("display") != "undefined" && _lookupDivElt.css("display")=== "none")
				$("#"+opts.relatedDescElt).css("display","none");
		}
	});
	
	$lookupTxt.bind('_event.dependency', function() {
		
		//audit on field, the multiple values is not yet available to auditOnField.
		if($lookupTxt.attr("fieldAudit") == 'true')
		{
			callAuditOnField(lookupTxt);
		}
		
		liveSearch_validate_callDependency(dependencyValue,dependencySrcValue,parameterValue,spanLookup,afterDepEvent,dynExpressionsArgsVal);
		/**
		 * [MarwanMaddah]: added for the change track management in case there is any change inside a dialog
		 */
		//[PathSolutions] jquery-3.3.1 migration - point 10 - fix Syntax error, unrecognized expression: div.ui-dialog-content['formId'] by removing the single quotes around formId
		var formId = $lookupTxt.closest("div.ui-dialog-content[formId]").attr("formId");

		if(typeof formId !="undefined" && formId!=null)
		{
			_form = document.getElementById(formId);
            detectChanges(_form);	
		}

	});
	
	$lookupTxt.bind('change', function() {
		if($("#"+overlay).css("display") == "none")
		{
			var _form = $("#"+spanLookup).parents("form").get(0);
			if(_form != null)
			{
				//adding the changetrack at this level because the bind.change in commonfunc doesnt fire for livesearch
				/**
				 * [MarwanMaddah]: added the if condition to don't set the changeTrack 
				 *                 in case the related attributes are not exists in the form
				 * @param {Object} elementId
				 */
				if((typeof $.data(_form , 'useHiddenProps') != "undefined" && $.data(_form , 'useHiddenProps') != false)
				   || (typeof $.data(_form , 'applyChangeTrack') != "undefined" && $.data(_form , 'applyChangeTrack') != false)   
				)
				{					
				   detectChanges(_form);
				}
			}
			// if there is a customization call custombtn if retrun stoppropagation then it will not continue to the default change and dependancy.
			var stopPropagation = false;
			var customBtnData = $("#lookuptxt_"+parameters_id).data("customBtnData");
			if ( customBtnData != undefined)
			{
				stopPropagation = customBtnActionCall("lookuptxt_"+parameters_id,'0',customBtnData.proceedOnFail)
			}
			if(!stopPropagation)
			{
				var _callDep = true;
				if(beforeDepEvent != "")
				{
					_callDep = eval(beforeDepEvent);
				}
				if(typeof _callDep == "undefined" || _callDep+"" != "false")
					$lookupTxt.trigger("_event.dependency");
			} 
		}
  	});
}

/**
 * Method to return global specified Decimal Separator to be used across the current Module
 * @returns {String} Decimal Separator
 */
function returnDecSep()
{
	var decSepToReturn = '.';
	if(typeof pathGlbDecSep !== "undefined" && pathGlbDecSep != null && pathGlbDecSep != "")
	{
		decSepToReturn = pathGlbDecSep;
	}
	return decSepToReturn;
}
/**
 * Method to return global specified Decimal Separator to be used across the current Module
 * @returns {String} Decimal Separator
 */
function returnGrpSep()
{
	var grpSepToReturn = ',';

	if(typeof pathGlbGrpSep !== "undefined" && pathGlbGrpSep != undefined && pathGlbGrpSep !== "")
	{
		grpSepToReturn = pathGlbGrpSep;
	}
	return grpSepToReturn;
}
/**
 * 
 * @param {Object} elementId
 * @memberOf {TypeName} 
 */
applyFormat = (function(elementId)
{
		var $elt = $(document.getElementById(elementId)); 
		//calling unformat number because if already formatted and this called again the value will become empty ( double formatting does not work )
		var unformattedValue = unformatNumber($elt.val());
		$elt.val(unformattedValue );
		
		// define correct number format
		var glblDecSep = returnDecSep();
		var glblGrpSep = returnGrpSep();
		
		$elt.numeric( {
		buttons : false,
		showCurrency: ($elt.attr("showCurrency")) != null ? !!($elt.attr("showCurrency")) : false,
        currencySymbol: ($elt.attr("currencySymbol")) != null ? $elt.attr("currencySymbol"): "$",
        emptyValue: ($elt.attr("emptyValue")) != null ? Number($elt.attr("emptyValue")): false,   
        minValue: ($elt.attr("minValue")) != null ? Number($elt.attr("minValue")): false,
        maxValue: ($elt.attr("maxValue")) != null ? $elt.attr("maxValue").toString(): false, 
        maxLenBeforeDec: ($elt.attr("maxLenBeforeDec")) != null ? $elt.attr("maxLenBeforeDec").toString(): false, 
        format : {
					formatter:(typeof $elt.attr("formatter") != "undefined" && $elt.attr("formatter") != null) ? $elt.attr("formatter") : '',
					format : $elt.attr("nbFormat"),
					decimalChar : glblDecSep,
					thousandsChar : glblGrpSep,
					leadZeros: (typeof $elt.attr("leadZeros") != "undefined" && $elt.attr("leadZeros") != null) ? $elt.attr("leadZeros") : '',
					zeroNotAllowed: ($elt.attr("zeroNotAllowed") === "true") ? true : false 	
				 }
			});
});

//formatInputsNumber = (function(elementId)
//{
//	if($("#"+elementId).val()!=null && $("#"+elementId).val()!="" && $("#"+elementId).val()!="undefined")
//	{
//	  $("#"+elementId).trigger("change");
//	}
//});




/**
 * checks if value of element is within min/max range when specified
 * @param {Object} elementId element ID
 * @return {TypeName}  true if test succeeds false otherwise
 */
function checkMinMaxValue(elementId)
{
	if(elementId.indexOf("spanLookup_") > -1) //livesearch
	{
		elementId = elementId.replace("spanLookup_","lookuptxt_"); 
	}
	var $elt = $(document.getElementById(elementId));
	var callDep = true;
	if($elt.attr("mode") == "number")
	{
		var eltValue = $elt.val();
		if(eltValue == "")
			return true;
		
		var minValue = (typeof $elt.attr("minValue") != "undefined" ) ? $elt.attr("minValue"): false;
		var maxValue = (typeof $elt.attr("maxValue") != "undefined" ) ? $elt.attr("maxValue"): false;
		if(minValue)
		{
			callDep = checkMinVal(minValue,eltValue);
		}
		if(callDep && maxValue)
		{
			callDep = checkMaxVal(maxValue, eltValue,true, $elt);
		}
		if(!callDep)
		{
			$elt.val($.trim($elt.attr("prevValue")))
		}
	}
	return callDep;
}

//Check if the parameter have  @JS_VAR_ variables to be evaluated
//This is done for Bandwidth Utilization BMOUPI170660, to minimize the JSP/HTML response Contents
function checkParameterHaveJSVariable(parameter)
{
	if(parameter.indexOf("@JS_VAR_") > -1 )
	{
		 var varParameterArr =  parameter.split(",");
		 var varParameter = "";
		 var varSeparetor = "";
		 // loop on the Parameter and those that have @JS_VAR_ evaluate its related JS variable
		 for(var i=0; i<varParameterArr.length; i++ )
		 {
			   if(i>0)
			   {      
					  varSeparetor = ",";
			   }
			   if(varParameterArr[i].indexOf("@JS_VAR_") > -1 )
			   {
					// evaluate the JS variable and construct the dependency URL
					varParameter = varParameter + varSeparetor + eval(varParameterArr[i].replace("@JS_VAR_",""));
			   }
			   else
			   {
					// add the dependency as it is sine nothing to evaluate
					varParameter = varParameter + varSeparetor + varParameterArr[i];
			   }
		 }
		 parameter = varParameter;
	}
	return parameter;
}

callDependency = (function(dependency, dependencySrc,parameter,elementId, afterDepEvent, dynExpressionsArgs)
{
	if(!checkMinMaxValue(elementId))
		return;
	
	if(typeof elementId != "undefined" && elementId != "")
		_showProgressIcon(true,elementId);  // Path Solutions [Libin] addded progress Icon showing on begining of dependency call
	
	var params = {};
	if(typeof parameter != "undefined" && parameter != null && parameter != "")
	{
		//This is done for Bandwidth Utilization BMOUPI170660, to minimize the JSP/HTML response Contents
		parameter = checkParameterHaveJSVariable(parameter);
		/////////
		
		paramArr = parameter.split(",");  //comma separated list of propName:htmlId or htmlId only where propName = name of the property in action and htmlId is the id of html element
		for(var i=0; i<paramArr.length; i++ )
		{
			var existsProp = true;
			if(paramArr[i].indexOf(":") > 0)
			{
				propIdArr = paramArr[i].split(":");
				propName = propIdArr[0];
				eltId = propIdArr[1];
			}
			else
			{
				propName = eltId = paramArr[i];
			}
			
			var eltValue = returnHtmlEltValue(eltId);
 	 	    params[propName] = eltValue; 
		}
	}
	
	if($("#"+elementId).is(":radio"))
	{
		hiddenElemId       = elementId.substr(0,elementId.length-1);
		dynExpressionsArgs = $("#"+hiddenElemId+"_exprArgs").val();
	}
	if(typeof dynExpressionsArgs != "undefined" && dynExpressionsArgs != null && dynExpressionsArgs != "")
	{
		expreArgArr = dynExpressionsArgs.split(",");  //comma separated list of propName:htmlId or htmlId only where propName = name of the property in action and htmlId is the id of html element
		for(var i=0; i<expreArgArr.length; i++ )
		{
			var existsProp = true;
			if(expreArgArr[i].indexOf(":") > 0)
			{
				propIdArr = expreArgArr[i].split(":");
				propName = propIdArr[0];
				eltId = propIdArr[1];
			}
			else
			{
				propName = eltId = expreArgArr[i];
			}
			
			var eltValue = returnHtmlEltValue(eltId);
			params[propName] = eltValue;
		}
	}
	
	$.postJSON(dependencySrc, params, function( data, status, xhr ) 
		{
			// Check if the dependency have  @JS_VAR_ variables to be evaluated before proceeding with dependency process
			// This is done for Bandwidth Utilization BMOUPI170660, to minimize the JSP/HTML response Contents
			if(typeof dependency != "undefined" && dependency != null && dependency != "")
			{
				//This is done for Bandwidth Utilization BMOUPI170660, to minimize the JSP/HTML response Contents
				dependency = checkParameterHaveJSVariable(dependency);
			}
			//////////////
			
		    // call method to arrange dependency to make changed element be first in the dependency value
		    var depArrResult = arrangeDependency(dependency,elementId);
		    var arrangedDependency = depArrResult.depsrc;
		    var depOnSameElemExst = depArrResult.depExst;
			dependArr = arrangedDependency.split(",");
			var isToReverOldValue = false;
			for(var j=0;j<dependArr.length; j++)
			{
				nameArr = dependArr[j].split(":");
				if(nameArr.length < 2) //only html property defined, return since should specify property name in action
				{	
					_showErrorMsg("Dev: Error in Dependency Attribute Specification of "+elementId+" for Dependency Attribute :"+arrangedDependency);
					return;
				}
				htmlProp = nameArr[0]; //html id 
                voProp = nameArr[1] ;	//property name in action for this html id
                $htmlElt = $("#"+htmlProp);
                
                var readonlyVal=null;
                var dataValue = "";
                /****************************************************************/
				voPropArr = voProp.split(".");
				var tempData = data;
				// traverse to nested returned JSON Array to take the propery Values (if there is VO inside CO for Example)
				for (var i = 0; i < voPropArr.length; i++)	
				{
				    var currProp = voPropArr[i];  
				    if(typeof tempData[currProp] != "undefined" && tempData[currProp] != null)
			    	{
			    		dataValue = tempData[currProp];  
			    		tempData = tempData[currProp];
			    	}
				    else
			    	{
			    		dataValue = "";
			    		break;
			    	}
				}
				/**
				 * [MarwanMaddah]: added to avoid the cases where the dependency data it will be catch from an array.
				 *                 issue faced in the dynamic screen management, where the dependencySrc they will be inside elemHm 
				 */
				if(typeof dataValue != "undefined" && dataValue!=null && Array.isArray(dataValue) && dataValue.length == 1)
				{
					if(!$htmlElt.hasClass("selectCompSize") || ($htmlElt.hasClass("selectCompSize") && typeof dataValue[0] != 'object'))
					{						
						dataValue = dataValue[0];
					}
				}
				
				//j==0 means the first element in dependency should be the one which being changed (done by arrangeDepndeny above) and it is exists
		    	if(j == 0 && depOnSameElemExst)
		    	{
		    	    // check if the same sent parameter is not Empty (means user do not want explicitly to empty it)
		    		if($htmlElt.val() !== "")
		    		{
		    			// check if old values restore not disabled
		    			if(data["_disRevertOldVal"] == null || data["_disRevertOldVal"] !== "true")
		    			{
			    			// if the returned data from server is empty,
			    			if(dataValue === "")
			    			{
			    				var prevValue = $htmlElt.attr("prevValue");
			    				// set the old value and do not proceed to other dependencies
			    				// if date picker
			    				if($htmlElt.hasClass("hasDatepicker"))
								{
									if(prevValue !== "")
									{
										$htmlElt.datepicker("setDate", prevValue);
									}
									else
									{
										$htmlElt.datepicker("setDate", "");
									}
								}
			    				else
			    				{
			    					$htmlElt.val(prevValue);
			    				}
			    				
			    				isToReverOldValue = true;
			    				break;
			    			}
		    			}
		    		}
		    	}
			
				if(nameArr.length > 2)
				{
                	readonlyProp = nameArr[2]; //property name of the readonly flag
					readonlyPropArr = readonlyProp.split(".")
					tempData = data;
					for (var i = 0; i < readonlyPropArr.length; i++)
					{
					    var x = readonlyPropArr[i];  
					    if(typeof tempData[x] != "undefined" && tempData[x] != null)
				    	{
				    		readonlyVal = tempData[x];    
				    		tempData = tempData[x];
				    	}
					    else
				    	{
				    		readonlyVal = false;
				    		break;
				    	}
					}
				}
				
				setInputValue(htmlProp,dataValue);
                /****************************************************************/
				if(typeof readonlyVal != "undefined" && readonlyVal != null)
				{
					makeElementReadonly(htmlProp, readonlyVal)
				}
			}
			// apply additional Dynamic Display before value setting in case we need to change formats of inputs
			
			applyAdditionalDynamicDisplay(data["additionalScreenParams"]);

			
			//check for dependency message
			if(data["_dependencyMsg"] != null )
			{
				if(data["_depMsgEltId"] != null && data["_depMsgEltId"] != "")
				{
					//to be applied on html element
				}
				else
				{
					//msgbox
					//_showErrorMsg(data["_dependencyMsg"],error_msg_title)
					if(typeof data["_msgTitle"] != "undefined" && data["_msgTitle"] != null)
						_showErrorMsg(data["_dependencyMsg"],data["_msgTitle"] )
					else
						_showErrorMsg(data["_dependencyMsg"],error_msg_title)
				}
				
			}
			// check if afterdependeny exists and the old value not reverted
			if(data["_preventAfterDepEvent"] !== "true" && typeof afterDepEvent != "undefined" && afterDepEvent != "" && ( (!isToReverOldValue && data["_error"] == null) || data["_forceAfterDepEvent"] === "true"))
			{
				// check if brackets specified in after dependency method
				if(afterDepEvent.indexOf("(") > 0 )
				{
					jQuery.globalEval(afterDepEvent);
				}
				else
				{
					eval(afterDepEvent)(data);
				}
			}
			
		}).done(function(){ //[PathSolutions] jquery-3.3.1 migration - point 9 - replace .complete() by .done() // Path Solutions [Libin] addded to remove progress icon on completion of dependency
			_showProgressIcon(false,elementId); 
		}).fail(function()
		{
				if(elementId.indexOf("spanLookup_") == 0) //livesearch
				{
					elementId = elementId.replace("spanLookup_","lookuptxt_");
				}
				var $htmlElt = $("#"+elementId);
			    var prevValue = $htmlElt.attr("prevValue") 
				var prevValue = (typeof prevValue == "undefined") ? "" : prevValue ;
				if($htmlElt.hasClass("hasDatepicker"))
				{
					if(prevValue !== "")
					{
						$htmlElt.datepicker("setDate", prevValue);
					}
					else
					{
						$htmlElt.datepicker("setDate", "");
					}
				}
				else
				{
					$htmlElt.val(prevValue);
				}
		}); 
});

/**
 * making single Element to be Readonly or Not
 * @param {Object} theElemId
 * @param {Object} readOnlyFlg
 */
function makeElementReadonly(theElemId, readOnlyFlg)
{
	var theId = theElemId;
	var $htmlElt = $("#"+theId);
	if ($htmlElt.hasClass('liveSearchText'))// property is LiveSearch
	{
		theId = theId.substring(theId.indexOf("_") + 1);
		liveSearch_makeReadOnly(readOnlyFlg, theId);
	} 
	else //Select box
	if ((typeof $("select[id='" + theId + "']").html() != "undefined"
			&& $("select[id='" + theId + "']").html() != null )
			|| $htmlElt.is(':checkbox') || $htmlElt.is(':radio') || $htmlElt.is('button') ) 
	{
		//disabled
		if (readOnlyFlg)
		{
			$htmlElt.attr("disabled", "disabled");
		}
		else
		{
			$htmlElt.removeAttr("disabled");
		}
	} 
	else 
	{
		$htmlElt.attr("readonly", readOnlyFlg);
		/**
		 * [MarwanMaddah]
		 * BUG 554282 BMOUPI170343 - Tab Function not working in the Customer Account field in Facility Screen_Bug ID 279604
		 */
        if(!readOnlyFlg)
        {
        	if(typeof $htmlElt.attr("tabindex")!="undefined" && $htmlElt.attr("tabindex")!=null && $htmlElt.attr("tabindex") == "-1")
			{
				$htmlElt.removeAttr("tabindex");
			}
			if(typeof $htmlElt.attr("oldtabindex")!="undefined" && $htmlElt.attr("oldtabindex")!=null && $htmlElt.attr("oldtabindex") && $htmlElt.attr("oldtabindex") != "-1")			
			{
				$htmlElt.attr("tabindex",$htmlElt.attr("oldtabindex"))
			}
        }
	}
		
}
function setInputValue(htmlId,theValue)
{
	var  $htmlElt = $("#"+htmlId); 
	var dataValue = theValue;
	if($htmlElt.attr("type") == "text" && $htmlElt.attr("mode") == "number")//Number text field
	{  
		dataValue = $.formatNumberNumeric(dataValue, {format:  $htmlElt.attr("nbFormat"),leadZeros:$htmlElt.attr("leadZeros"), zeroNotAllowed:( ($htmlElt.attr("zeroNotAllowed") === "true") ? true : false),formatter:($htmlElt.attr("formatter")!=null?$htmlElt.attr("formatter"):"")});
		// if Livesearch Element, then use livesearch method to proper reset multiselect livesearch
		if ($htmlElt.hasClass("liveSearchText"))
		{
			liveSearch_setLiveSearchValue(htmlId,dataValue);
		}
		else
		{
			$htmlElt.val(dataValue);
		}
	}
	else if(typeof $("select[id='"+htmlId+"']").html() != "undefined" && $("select[id='"+htmlId+"']").html() != null)//Select box
	{
		$selectBx = $("select[id='"+htmlId+"']");
		depArr = dataValue
		$t = document.getElementById(htmlId);
		key = $selectBx.attr("listKey");
		text = $selectBx.attr("listValue");
		//reinitialize the select box
		if(typeof depArr == "object" && typeof depArr.length != undefined && depArr.length > 0)
		{
			$t.options.length = 0;
			for (var i=0; i<depArr.length; i++)
			{
				var dependentSelect = depArr[i];
				if(key != null && text != null && typeof key != "undefined" && typeof text != "undefined")
				{
					$t.options[$t.options.length]=new Option(dependentSelect[text],dependentSelect[key]);
				}
				else
				{
					$t.options[$t.options.length]=new Option(depArr[i],depArr[i]);
				}
			}
		}
		else
		{
			//setting value only without changing the select box list
			$t.value = depArr;
		}
		
	}
	else if($htmlElt.attr("type") == "checkbox" )
	{
		var valOptAttr = $htmlElt.attr("valOpt");
		var toCheck = false;
	    if(valOptAttr)
	    {
	    	var valOpt = valOptAttr.split(":");
	    	if(dataValue == valOpt[0])
	    	{
	    		toCheck = true;
	    	}
	    }
		else
		{
			if(dataValue === "true" || dataValue == true)
			{
				toCheck = true; 
			}
		}
		if(toCheck === true)
		{
		  	$htmlElt.attr("checked","checked");
		}
		else
		{
			$htmlElt.removeAttr("checked");
		}
	}// check if date picker then use set date method, if dataValue not empty
	else if($htmlElt.hasClass("hasDatepicker"))
	{
		if(dataValue !== "")
		{
				$htmlElt.datepicker("setDate", dataValue);
		}
		else
		{
			$htmlElt.datepicker("setDate", "");
		}
	}
	else// if Livesearch Element, then use livesearch method to proper reset multiselect livesearch
	if ($htmlElt.hasClass("liveSearchText"))
	{
		liveSearch_setLiveSearchValue(htmlId,dataValue);
	}
	else 
	{
		var inputRadio = $(document.getElementById(""+htmlId+dataValue))
		if(inputRadio.html() != null && inputRadio.attr("type") == "radio")
		{
			inputRadio.attr("checked","checked"); //check the element needed as id in radio is concatenated with value in case radio is defined as map 
		}
		else
			$htmlElt.val(dataValue);
	}
	// set previous Value to current one
	var prevValue = $htmlElt.attr("prevValue");
	if(prevValue != undefined)
	{
		$htmlElt.attr("prevValue",dataValue);
	}
}
function applyAdditionalDynamicDisplay(addElts)
{
	if(typeof addElts != "undefined" && addElts != null)
	{
		for(var sysParamDisp in addElts)
		{
			if(sysParamDisp.indexOf("~") > -1)
			{
				//in case of account 
				eltArray = sysParamDisp.split("~");
				finalEltStr = "";
				for(var i=0 ;i<eltArray.length; i++)
				{
					addEltId = eltArray[i] +"_"+_pageRef;
					if(i>0)
						finalEltStr += "~";
					finalEltStr += addEltId;
					manageDynamicDisplay(addEltId,addElts,sysParamDisp);
				}
				addEltEntry = addElts[sysParamDisp];
				label_key = addEltEntry["LABEL_KEY"];
				var labelKeyVal = addEltEntry["labelKeyVal"];
				_label = $("label[for='"+finalEltStr+"']")[0];
				if(_label != null && typeof _label != "undefined")
				{
					handleLabelRequiredVal(_label.id, (typeof _label.required != "undefined" ? _label.required : "false"), label_key, labelKeyVal)
				}
			}
			else
			{
				addEltId = sysParamDisp;
				// if there is varaible _pageRef
				if(typeof _pageRef != "undefined")
				{
					addEltId = sysParamDisp +"_"+_pageRef;
				}
				manageDynamicDisplay(addEltId,addElts,sysParamDisp);
			}
		}
	}
			
}
function manageDynamicDisplay(addEltId,addElts,sysParamDisp)
{
	if(document.getElementById(addEltId) == null)
	{
		// if for account component old behaviour no fieldset 
		if(addEltId.indexOf("pathAccount_") == 0)
		{
			addEltId = "tbl_"+addEltId;
		}
		if(document.getElementById(addEltId) == null)
		{
			addEltId = sysParamDisp; //no pageref is added
		}
	}

	$element = $(document.getElementById(addEltId))  ;
    if($element.html() == null && addEltId.indexOf("pathAccount_") == 0)
          $element = $(document.getElementById("tbl_"+addEltId)) //check if it is related to Account with no fieldset, only table;
          
	var isRadioList = false;
    if(null != addEltId && "" != addEltId)
    {
    	isRadioList = (addEltId.indexOf(".")<0 && $("input:radio[id^="+addEltId+"]").length > 0) ? true : false;
	}
    
	if($element.html() != null || isRadioList)
	{
		var addEltEntry = addElts[sysParamDisp];
		var is_mandatory = addEltEntry["IS_MANDATORY"];
		var is_readonly = addEltEntry["IS_READONLY"];
		var is_visible = addEltEntry["IS_VISIBLE"];
		var label_key = addEltEntry["LABEL_KEY"];
		var labelKeyVal = addEltEntry["labelKeyVal"];
		var max_length = addEltEntry["MAX_LENGTH"];
		var zeroNotAllowed = addEltEntry["ZERO_NOT_ALLOWED"];
		var leadZeros = addEltEntry["LEAD_ZEROS"];
		var decFormat = addEltEntry["decFormat"];
		var txtFormat = addEltEntry["txtFormat"];
		var theValue = addEltEntry["value"];
		var theDateValue = addEltEntry["dateValue"];
		var labelsLst = addEltEntry["labelsLst"];
		var triggerChange = addEltEntry["triggerChange"];
		var backgroundColor = addEltEntry["BACKGROUND_COLOR"];
		if(is_visible != null)
		{
			var accountInputs = {};
			accountInputs["br"] = "br";
			accountInputs["cy"] = "cy";
			accountInputs["gl"] = "gl";
			accountInputs["cif"] = "cif";
			accountInputs["sl"] = "sl";
			
			var $eltToShowHide = $element;
			if(addEltId.indexOf("lookuptxt_") == 0) //livesearch
			{
				 //hide entire div and related description text input if exists
				var relDescElt = eval("options_"+addEltId.substring(addEltId.indexOf("_")+1)+"_liveSearch.relatedDescElt" );
				if(relDescElt != "")
				{
					if(is_visible == "0")
                		$("#"+relDescElt).css("display","none");
              		else
                		$("#"+relDescElt).css("display","");
				}
				temp = addEltId.replace("lookuptxt_",""); 
				$eltToShowHide = $(document.getElementById("lookupdiv_"+temp))
			}
			else if($element.hasClass("hasDatepicker")) //datepicker
			{
				//hide entire div
				$eltToShowHide = $element.closest("div.dateCompDiv");
			}
			//check for old account behavior bcoz now the parent table with id starting by tbl_pathAccount_ has a display none was not taken in consideration 
			else if($element.closest("fieldset[id^='pathAccount_']").length > 0 
					&& typeof $element.attr("inputOrder") != "undefined" 
						&& $element.attr("inputOrder") in accountInputs)
			{
				var $fieldSet = $($element.closest("fieldset[id^='pathAccount_']")[0]);
				$eltToShowHide = $fieldSet //$($element.closest("table[id^='tbl_pathAccount_']")[0]);
				var $relTable = $($element.closest("table[id^='tbl_pathAccount_']")[0]);
	            var relLabel = $eltToShowHide.find("label")[0]
                if(is_visible == "0")
                {                	
                	$(relLabel).css("display","none");
                	$relTable.css("display","none");
                }
                else
                {                	
                	$(relLabel).css("display","");
                	$relTable.css("display","");
                }
			}
			
			if(isRadioList)
			{
				
				$("input:radio[id^="+addEltId+"]").each(function()
				{
					_label = $("label[for='"+this.id+"']")[0];
					if(is_visible == "0")
					{
						is_mandatory = "0";
						$(this).css("display","none");			
							if(_label != null && typeof _label != "undefined")
							_label.style.display = "none";
					}
					else
					{
						$(this).css("display","");
						if(_label != null && typeof _label != "undefined")
							_label.style.display = "";
					}
				});			
			}
			else
			{
				if(is_visible == "0")
				{
					is_mandatory = "0";
					$eltToShowHide.css("display","none"); //in IE attribute style=display: none with spaces thats why we use css property
					$element.css("display","none");
				}
				else
				{
						$eltToShowHide.css("display",""); //for IE 
						$element.css("display","");
						if($element.hasClass("hasDatepicker")) //datepicker
						{
							// show the datepicker image since if the datepicker is hidden upon load of page,
							// the image stays invisible after dependency showing it
							$eltToShowHide.children("img").css("display","");
							/**
							 * [MarwanMaddah]:
							 * this element will be available in case of dynamic screen
							 * where the position is absolute, so an additional div will be constructed above the datepicker 
							 * to cover the position absolute
							 */
							if($("#dynScr_DPickerDiv_"+addEltId).length > 0)
							{								
								$("#dynScr_DPickerDiv_"+addEltId).css("display","");
							}
						}
					
					//setting corresponding label as visible
					_label = $("label[for='"+addEltId+"']")[0];
					if(_label != null && typeof _label != "undefined")
					{
						_label.style.display = "";
					}
				}
			}
		}
		

		if(is_readonly != null)
		{
			/**
			 * [MarwanMaddah]:Tabs disabled management 
			 */
			if($element.is("li"))
			{
				if(is_readonly == "1")
				{					
			        $element.addClass("ui-state-disabled");	
				}
				else
				{
				    $element.removeClass("ui-state-disabled");	
				}
			}
			//IE case: remove focus to prevent writing in readonly inputs on dependency and/or allowing to write on non readonly inputs upon pressing tab
			var hasFocus = false;
			if($element.is(":focus"))
			{
				hasFocus = true;
				$element.blur();
			}
			is_readonlyVal = (is_readonly == "1") ? true :false;
			if($element.is("select") || $element.is(":checkbox") || $element.is(":radio"))//select box need and input of type submit or button put as disabled not readonly
			{
				if(is_readonly == "1")
					$element.attr("disabled","disabled");
				else
					$element.removeAttr("disabled");
			}
			else if($element.hasClass("ui-button") || $element.is("button")  )
			{
				$element.button({disabled:is_readonlyVal});	
			}
			else if(addEltId.indexOf("lookuptxt_") == 0) //livesearch
			{
				liveSearch_makeReadOnly(is_readonlyVal, addEltId.replace("lookuptxt_","") );
			}
			else if(isRadioList)
			{
				$("input:radio[id^="+addEltId+"]").each(function()
				{
					if(is_readonlyVal)
						$(this).attr("disabled","disabled");
					else
						$(this).removeAttr("disabled");
				})
			}
			/**
			 * [MarwanMaddah]: in case the element is a datePicker
			 * and in case the hijri date is exists 
			 * the display management will applicable in parallel on both gregorian and hijri. 
			 * @param {Object} theDependcy
			 * @param {Object} elmId
			 * @return {TypeName} 
			 */
			else if($element.hasClass("hasDatepicker"))
			{
			  var elemId = $element.attr("id");
			  var $hijriElem = $("#"+elemId+"_hijriDate");
			  if(!is_readonlyVal)
			  {
				$element.removeAttr("readonly");
				$element.removeAttr("disabled");
				$.datepicker._enableDatepicker(document.getElementById(elemId));
				if(typeof $hijriElem!="undefined" && $hijriElem!=null && $hijriElem.length > 0)
				{
				   $hijriElem.removeAttr("readonly");  	
				   $hijriElem.removeAttr("disabled");  	
				}
			  }
			  else
			  {
				$element.attr("readonly",is_readonlyVal);
				$.datepicker._disableDatepicker(document.getElementById(elemId))
				if(typeof $hijriElem!="undefined" && $hijriElem!=null && $hijriElem.length > 0)
				{
				   	$hijriElem.attr("readonly",is_readonlyVal);
				}
			  }

			}
			else
			{
				if(!is_readonlyVal)
				{
					$element.removeAttr("readonly");
				}
				else
				{
					$element.attr("readonly",is_readonlyVal);
				}
			}
			if(hasFocus)
			{
				$element.focus();
			}
			if(is_readonlyVal)
			{
				/**
				 * [MarwanMaddah]:
				 * #BUG-539774 using tab button unable to move the cursor to 'down payment' and 'security deposit' field, please check
				 */				
				if(typeof $element!="undefined" && $element!=null && $element.length > 0 && $element[0].getAttribute("tabindex") && "-1" != $element[0].getAttribute("tabindex"))			
				{
					$element.attr("oldtabindex",$element[0].getAttribute("tabindex"))
				}
				$element.attr("tabindex","-1")
			}
			else
			{
				/**
				 * [MarwanMaddah]:
				 * #BUG-539774 using tab button unable to move the cursor to 'down payment' and 'security deposit' field, please check
				 */
				if(typeof $element!="undefined" && $element!=null && $element.length > 0)
				{					
					if("-1" == $element[0].getAttribute("tabindex"))	
					{
						$element.removeAttr("tabindex");
					}
					if($element[0].getAttribute("oldtabindex") && "-1" != $element[0].getAttribute("oldtabindex"))			
					{
						$element.attr("tabindex",$element.attr("oldtabindex"))
					}
				}
			}
		}
		
		if(typeof leadZeros != "undefined" && leadZeros !== null 
				&& $element.attr("nbFormat") !== null && typeof $element.attr("nbFormat") != "undefined")
		{
			$element.attr("leadZeros",leadZeros);
			applyFormat(addEltId)
		}
		if(typeof zeroNotAllowed != "undefined" && zeroNotAllowed !== null 
				&& $element.attr("nbFormat") !== null && typeof $element.attr("nbFormat") != "undefined")
		{
			zeroNotAllowed = (zeroNotAllowed == "true" || zeroNotAllowed == "1") ? true : false;
			$element.attr("zeroNotAllowed",zeroNotAllowed);
			applyFormat(addEltId)
		}
			
		// applying the format according to Decimal Format
		if(decFormat != null)
		{
			$element.attr("nbFormat",decFormat);
			applyFormat(addEltId)
		}
		// for max length specification
		if(max_length != null)
		{
			$element.attr("maxlength",max_length);
		}
		
		
		// if mandatory
		if(is_mandatory != null)
		{
			if(is_mandatory == "1")
				$element.attr("required","true");
			else
			{
				$element.removeAttr("required");
			}
		}
	
		if(labelsLst != null)
		{
			var _$elt, _$colName, _$labelValue, labelEltEntry ;
			for(var labelElt in labelsLst)
			{
				labelEltEntry = labelsLst[labelElt];
				_$elt = $(document.getElementById(labelEltEntry["elementId"] + "_" + _pageRef));
				if(_$elt.html() == null)
				{
					//consider ID as it is without pageRef in case element was not found
					_$elt = $(document.getElementById(labelEltEntry["elementId"]));
				}
				if(_$elt.html() != null)
				{
					_$colName = labelEltEntry["gridColName"];
					_$labelValue = labelEltEntry["value"];
					if(_$colName != null) //grid case 
					{
						_$elt.jqGrid("setLabel",_$colName,_$labelValue );
					}
					else //html label
					{
						_$elt.html(_$labelValue);
						_$elt.attr("title",_$labelValue);
					}
				}
			}
		}
		
		// handle lable change or setting label style as mandatory
		_label = $("label[for='"+addEltId+"']")[0];
		if(_label != null && typeof _label != "undefined")
		{
			handleLabelRequiredVal(_label.id, (typeof _label.required != "undefined" ? _label.required : "false"), label_key, labelKeyVal);
		}
		else if($element.is("label"))
		{
			if($element.find("span.required").length > 0)
				$element.html(label_key+"<span class='required'>*</span>");//keep the required * character if already exists
			else
				$element.html(label_key);
			if(labelKeyVal)
			{
				$element.attr("labelkey",labelKeyVal);
			}
			$element.attr("title",label_key);
		}
		if(theDateValue != null)
		{
			theValue = theDateValue;
		}
		// setting value if Exists
		if(theValue != null)
		{
			setInputValue(addEltId,theValue);
			/**
			 * [MarwanMaddah]
			 * in case of expression process will call the change event 
			 * to trigger the dependency to the element that its value has changed based on the expression
			 */
			if(typeof triggerChange != "undefined" && triggerChange != null && triggerChange == "1")
			{
				$element.trigger("change"); 	
			}
		}
		if(typeof txtFormat != "undefined" && txtFormat != null)
		{
			/**
			 * to include the masked input library in case is not exists  
			 */
			$.struts2_jquery.require( "jquery.maskedinput.js",null,jQuery.contextPath+"/common/jquery/js/plugins/");			
			if(txtFormat != "")
			{
				$element.attr("txtFormat",txtFormat );
				$element.mask(txtFormat);
			}
			else 
			{
				/**
				 * [MarwanMaddah]
				 * #BUG 564457 SUPT170394 - Alpha-Numeric characters in FOM-MORE CONTACT-ID field
				 */
				if(typeof $element.attr("txtFormat")!="undefined" && $element.attr("txtFormat")!=null)
				{					
					$element.removeAttr("txtFormat");
				}
				$element.unmask();
			}
		}
		if(backgroundColor != undefined && backgroundColor != null && backgroundColor != '')
		{
			//note that the code using $element.css() will work only on IE and not on chrome or firefox $element.css("background",backgroundColor + " !important");
			//to force changing background color on all browser we need to use element[0].style.setProperty
			$element[0].style.setProperty( 'background', backgroundColor, 'important' );
		}
		
	}
}


function arrangeDependency(theDependcy,elmId)
{
		var inputElemId = elmId;
		// in case of liveseach the elmId is related to the span of search icon so replace for that of Text
	if(inputElemId.indexOf("spanLookup_") == 0)
	{
		inputElemId = inputElemId.replace("spanLookup_","lookuptxt_");
	}

	var nameAtt = $("#"+inputElemId).attr("name");
	var idPart = inputElemId+":"
	var nameIdPartIndx = theDependcy.indexOf(idPart)
	var sameElmDepExist = false; // variable to indicate that dependency on same element being changed exist
	if(nameIdPartIndx >= 0)
	{
		// if not first element in the dependency
		if(nameIdPartIndx > 0)
		{
			var commaIndx = theDependcy.indexOf(",",nameIdPartIndx)
			if(commaIndx > 0)
			{ // there is more element after our elmtId in dependency
				var tempElemDep = theDependcy.substring(nameIdPartIndx,parseInt(commaIndx+1));
				theDependcy = theDependcy.replace(tempElemDep,"");
				theDependcy = tempElemDep + theDependcy;
			}
			else
			{ // last element in dependency
				var tempElemDep = theDependcy.substr(nameIdPartIndx-1);
				theDependcy = theDependcy.replace(tempElemDep,"");
				theDependcy = tempElemDep.substr(1)+","+ theDependcy;
			}
		}
		sameElmDepExist = true;
		
	}
	return {depsrc:theDependcy,depExst: sameElmDepExist};
}

function returnHtmlEltValue(eltId)
{
      var eltValue;
      
      //[PathSolutions] jquery-3.3.1 migration - point 21 - resolve Error: Syntax error, unrecognized expression: input:radio[id^=''true''] by escaping the elementId 
      if(eltId != undefined && eltId != null)
      {
    	  var escapedEltid = eltId.replace(/'/g,"\\'");
      }
      //End PathSolutions

	// TP 829696 check if the element ID exists as provided or without _pageRef, since in case of HijriDate the pageRef is in middle of id value and not at end
      // in case the <pageRef> is set as variable in the Id then replace it, sometimes the page ref comes in middle as in Hijri so to define in DB tables 
	if(eltId && eltId.indexOf("<pageRef>") > 0)
	{
		eltId = eltId.replace("<pageRef>",_pageRef);
	}
	// TP 829696 check if the element ID exists as provided or without _pageRef, since in case of HijriDate the pageRef is in middle of id value and not at end
      var theCurrPageRef = "_"+_pageRef;
      if(document.getElementById(eltId) == null && eltId.indexOf(theCurrPageRef) > 0)
      {
    	  // try element without pageRef if exists, check if eltId ends with _pageRef
    	  if(eltId.substr(eltId.length - theCurrPageRef.length) == theCurrPageRef)
    	  {
    		  var elemNoPageRef = eltId.substring(0,eltId.lastIndexOf(theCurrPageRef));
    		  if(document.getElementById(elemNoPageRef) != null)
    		  {
    			  eltId = elemNoPageRef;
    		  }
    	  }
      }
      
      if(document.getElementById(eltId) != null) //html element
	  {
	      if($("#"+eltId).attr("type") == "text" && $("#"+eltId).attr("mode") == "number") //number 
	  	  {
		          if($("#"+eltId).attr("nbFormat") && $("#"+eltId).val() != "" && $("#"+eltId).val() != null)
		          {
		                eltValue = unformatNumber($("#"+eltId).val() );
		          }
		          else
		          {
		                eltValue = $("#"+eltId).val();
		          }
		    }
		    else if($("#"+eltId).attr("type") == "checkbox" )
		    {
		      var theChckBox = $("#"+eltId); 
		      var valOptAttr = theChckBox.attr("valOpt");
		      var valOpt;
		      if(valOptAttr)
		      {
		    	  valOpt = valOptAttr.split(":");
		      }
		      
		      if(theChckBox.is(":checked"))
		      {
				eltValue = true;
				if (valOptAttr)
				{
					eltValue = valOpt[0];
				}
		                
	          }
	          else
	          {
	                eltValue = false;
	                if (valOptAttr)
					{
	                	eltValue = valOpt[1];
					}
	          }
	    	}
		    else if(typeof $("select[id='"+eltId+"']").html() != "undefined" && $("select[id='"+eltId+"']").html() != null)//Select box
		    {
		          $sel = document.getElementById(eltId);
		          if($sel.selectedIndex > -1)
		          	eltValue = $sel.options[$sel.selectedIndex].value;
		          else
		          	eltValue = ""; 
		    }
		    else //if($("#"+eltId).val() != null) //any form element
		    {
		          eltValue = $("#"+eltId).val(); 
		    }
      	}
	    else if($("input:radio[id^='"+escapedEltid+"']").length > 0) 
	    {
	          eltValue = $("input:radio[id^='"+eltId+"']:checked").val()
	    }
	    else //java script variable or static value
	    {
	          try
	          {
	            eltValue = eval(eltId); 
	          }
           		catch(e)
	          {
	        	  //take value as it is specified after ~CONST_ (single quotes if present will remain in value)
	        	  //eg: ~CONST_'235' will send value to server '235' 
	        	  if(eltId.indexOf("~CONST_") > -1 )
        		  {
	        		  eltValue = eltId.replace("~CONST_","");
        		  }
	        	  else
        		  {
	            	eltValue = eltId; 
        		  }
	          }
	          
	          if(eltId.indexOf("~CONST_") < 0 && eltValue != eltId) //could be either result of expression or result of date string like dd/mm/yyyy (considered as division) or dd-mm-yyyy(considered as substraction)  
        	  {
        	  		isDateStr = Date.parse(eltId);//if it is a date string return it
        	  		if(!isNaN(isDateStr)) //valid date 
        	  			eltValue = eltId;
        	  }
	    }
      return eltValue;
}

function checkAvailDependency(_elementId)
{
	var $elt = $(document.getElementById(_elementId))
	var _liveSearchObj;
	
	if ($elt.hasClass('liveSearchText')&& _elementId.indexOf("lookuptxt_") == 0) //form livesearch element 
	{ 
		_liveSearchObj= eval("options_"+_elementId.replace("lookuptxt_","")+"_liveSearch");
	}
	if( (typeof _liveSearchObj != "undefined" && _liveSearchObj != null && _liveSearchObj.dependencyValue !== "")
		|| (typeof $elt.attr("dependency") != "undefined" && $elt.attr("dependency") != "")
		|| checkColChangeEvt(_elementId))
		return true;

	return false;
}

//Added Checking on the Attribute fieldAudit in order to handle prvvalue
//for elements that have no dependency
function checkAvailFieldAudit(_elementId)
{
	var $elt = $(document.getElementById(_elementId))
	if((typeof $elt.attr("fieldAudit") != "undefined" && $elt.attr("fieldAudit") != ""))
		return true;

	return false
}

/**
 * checks if column input has dataevent change (called from jquery.numeric.js)
 * @param {Object} _elementId, grid input ID 
 */
function checkColChangeEvt(_elementId)
{
	var $elt = $(document.getElementById(_elementId))
	var hasChangeEvt = false;
	if($elt.attr("role") === "textbox" || $elt.attr("role") === "livesearch") //role attribute means from grid
	{
		var grid = $elt.closest("table[role='grid']");
		if(grid.length > 0)
		{
			var gridId = grid[0].id;
			var colname; 
			if(_elementId.indexOf("new_") > -1)
				colname = _elementId.substring(_elementId.indexOf("_",_elementId.indexOf("new_")+("new_").length)+1)
			else
				colname = _elementId.substring(_elementId.indexOf("_")+1) //rowid_colname
				
			if(colname.indexOf("_lookuptxt") > -1)
				colname = colname.substring(0 ,colname.indexOf("_lookuptxt"));
			var _colModel = $("#"+gridId).jqGrid('getGridParam','colModel');
			$(_colModel).each(function(i)
			{
				if(this.name == colname)
				{
					if(typeof this.editoptions != "undefined" && typeof this.editoptions.dataEvents != "undefined")
					{
						$.each(this.editoptions.dataEvents , function() 
						{
							if(this.type == "change")
							{
								hasChangeEvt = true;
								return;
							}
						});
					}
					return;
				}
			})
		}
	}
	return hasChangeEvt;
}

function checkMinVal(minValue, eltValue, showMsg)
{
	minValue = unformatNumber(minValue);
	eltValue = unformatNumber(eltValue);
	var minCheck = false;
	var minValueArr = minValue.split(".");
	var eltValueArr = eltValue.split(".");
	if(minValueArr[0].length >=10 || eltValueArr[0].length >= 10
			|| (minValueArr.length > 1 && minValueArr[1].length >=7)
			|| (eltValueArr.length > 1 && eltValueArr[1].length >=7))
	{
		if(new BigNumber(eltValue).compare(new BigNumber(minValue)) < 0)
			minCheck = true;
	}
	else if(Number(eltValue) < Number(minValue))
			minCheck = true;
	
	if(minCheck)
	{
		if(typeof showMsg == "undefined" || showMsg )
			_showErrorMsg(min_val_trans +" "+minValue); //default behavior will show message, send false to enforce not showing message 
		return false;
	}
	return true;
}
function checkMaxVal(maxValue, eltValue, showMsg, elt)
{
	maxValue = unformatNumber(maxValue);
	eltValue = unformatNumber(eltValue);
	var maxExceed = false;
	var maxValArr = maxValue.split("."); 
	var eltValArr = eltValue.split(".");
	if(maxValArr[0].length >= 10 || eltValArr[0].length >= 10 
			|| (maxValArr.length > 1 && maxValArr[1].length >= 7)
			|| (eltValArr.length > 1 && eltValArr[1].length >= 7 )
	  )
	{
		if(new BigNumber(eltValue).compare(new BigNumber(maxValue)) > 0)
			maxExceed = true;
	}
	else if(Number(eltValue) > Number(maxValue))
			maxExceed = true;
	
	if(maxExceed)
	{
		if(typeof showMsg == "undefined" || showMsg )
		{
			if(typeof elt != "undefined")
			{
				maxValue = $.formatNumberNumeric(maxValue, {format:  elt.attr("nbFormat")}); 
			}
			_showErrorMsg(max_val_trans +" "+maxValue );
		}
		return false;
	}

	return true;
}


//setting the direction to rtl or ltr
applyDirection = (function()
{
    var RTL_DIR = "ltr";
    //external Screen read from iframe window variable
    if(window.name && window.name.indexOf("extScreenFrame") == 0)
	{
		RTL_DIR = window.RTL_DIRECTION
	}
    else
	{
	    var topopener = window.top
	    if(typeof topopener.RTL_DIRECTION != "undefined" && topopener.RTL_DIRECTION !== "")
	    {
	    	RTL_DIR = topopener.RTL_DIRECTION;
	    }
	    else
	    {
	    	/**
	    	 * [MarwanMaddah]: TP463925
	    	 * a problem has been faced with chrome browser & weblogic server 
	    	 * where the topopener.opener in some cases will return an error
	    	 * and browser will stop the process.
	    	 * we catch it after a problem in the change password process,
	    	 * after debugging we found that the code that is exist in document.ready inside submit-close.flt is not applied on the button tag  
	    	 * and the reason behind that is : inside ready function (jquery-1.6.4.js)
	    	 * there is a loop to call all the javascript codes that are exists in the (document.ready)s
	    	 * jquery fill them inside an array all call and exexute them by order.
	    	 * In a specific code there is a call to applyDirection and in this case 
	    	 * the topopener.opener will return an error and stop all the process
	    	 * for that and to avoid this issue we changed the for loop to while loop
	    	 * to add control and checking on the topopener and the topopener.opener.
	    	 */
			var topopener = window;
			var ii = 0;
			while(topopener)
			{
				try{
					if(ii > 100)
					{
						break;
					}
				    topopener = topopener.opener;
				    ii++;
                }
                catch(e)
                {
                  break;
                }
			}			
			if(topopener && typeof topopener.RTL_DIRECTION != "undefined" && topopener.RTL_DIRECTION !== "")
			{
				RTL_DIR = topopener.RTL_DIRECTION;
			}
	    }
	}
	document.dir =RTL_DIR;
});

var errorForSelenuim;// variable use in selenuim automation testing only
var bSelenuimError;// variable use in selenuim automation testing only for Business error
$(document).ready(function()
{
	//disabling right click
	// to be un commented upon delivery to the client
	document.oncontextmenu = document.body.oncontextmenu = function () { return false; };

	// diabling F1 Help of IE
	document.onhelp = function () { return (false); };
    window.onhelp = function () { return (false); };
	
	//Binding keydown on document to prevent backspace from going back in browser 
	if(typeof document.addEventListener != 'undefined')
	{
        document.addEventListener('keydown', keyDownPressed, false);
	}
    else if(typeof document.attachEvent != 'undefined')
	{
        document.attachEvent('onkeydown', keyDownPressed);
	}
    else
    {
        if(document.onkeydown!=null)
        {
            var oldOnkeydown=document.onkeydown;
            document.onkeydown=function(e){
                oldOnkeydown(e);
                keyDownPressed(e);
            };
        }
        else
            document.onkeydown=keyDownPressed;
    }
	
	//applying resize of grid on window resize
	var resizeTimer, portalResizeTimer;
	$(window).bind('resize', function () {
	    clearTimeout(resizeTimer);
	    resizeTimer = setTimeout(resizeGrids, 210);
	    clearTimeout(portalResizeTimer);
	    portalResizeTimer = setTimeout(function()
	    	{
	    		$("#portal_div").height($("#portal_div").parent().height())
	    	}, 230);
	    
	});
	
	applyDirection();	
	
	//jquery issue https://bugs.jquery.com/ticket/8417
	//to resove the issue of ??/=? (consecutive question marks, or equal question mark) that exists in json data sent in the ajax request and not passed through serializeForm() or encodeURIComponent.
	//in this case, the default jquery ajaxPrefilter applied on 'json jsonp' is executed and adding "script" to options.dataTypes array.
	//the below custom ajaxSetup will be executed before executing the ajaxPrefilter so that dataTypes array will stay equal to ["json"] , and "script" will not be added to it.
	//using $.ajaxPrefilter("json", function( options, originalOptions, jqXHR ) to set options.dataTypes=['json']; is not sufficient because the param=?? will be transformed to param = jQuery16403070791065527299_1470226484080
	$.ajaxSetup({
	  jsonp: false
	});
	
	/*to fix the problem of invalid url on websphere server where double slash // are present in the url, the ajaxPrefilter will replace double slash by single slash*/
	$.ajaxPrefilter(function( options ) {
		
		/*security encryption of parameters*/
		ajaxEncryptOptionsData(options);
		
		securityutil_lastAjaxSubmitDate = new Date();
		
		/*refresh mouse move timer*/
		if(options.url != undefined && options.url != null && options.url != ''
			&& options.url.indexOf("/path/dummy/DummyAction") == -1 && options.url.indexOf("/path/AlertsAjaxServlet") == -1 
			&& options.url.indexOf("/pathdesktop/dashboardAlerts") == -1 )
		{
			sessionTimeoutMouseMoveHandler();
		}
		
		/* the ajax prefilter should be applied only in case of websphere server to fix the problem of double slash // in url */
		if(typeof currentServer !== "undefined" && currentServer != null && currentServer == 'WAS')
		{
			
					
				if( options.url.indexOf("http://") == 0 )
				{
					options.url = "http://" + options.url.substring(7,options.url.length).replace(/\/\//gi, '/');
				}
				else if( options.url.indexOf("https://") == 0 )
				{
					options.url = "https://" + options.url.substring(8,options.url.length).replace(/\/\//gi, '/');
				}
				else
				{
					options.url = options.url.replace(/\/\//gi, '/');
				}
		}
	
	});
	// override ajax Error handling in a common way to display msgbox when using handleException
	$(this).ajaxError(function(e, jqXHR, settings, exception)
		{
		    /**
		     * [PathSolutions]: changed to (settings.dataType!= 'html', because the dataType in psj:submit it is not JSON.
		     */
			if(jqXHR.status === 600)// pathSol error code used in handleException
			{
				var theError = jqXHR.responseText;
				errorForSelenuim = theError;
				var customArgs = null;
				if(settings.dataType != "html") // check if not HTML Response then Json should be
				{
					// try to parse the respons as JSON to check how to display
					try
					{
						var jsonObj = $.parseJSON(theError);
						customArgs = {};
						customArgs["escapeHtml"] = true;
						theError = jsonObj._error;
					}
					catch(e)
					{
						 theError = theError.replace(/\n/g,"");
					}
				}
				else
				{
					 theError = theError.replace(/\n/g,"");// removing Cariage return so that Message box not replace them by <br/>
				}
				
				var addArgs = {}; 
				//set the adjust Height/width flag for fixing dialog dimensions according to large texts (avoid scrollbars)
				addArgs["adjustMsgBoxSize"] = true;
				_showErrorMsg(theError, error_msg_title,null,null,null,addArgs,customArgs);
				_showProgressBar(false);  // Path Solutions [Libin] addded to disable progress bar automaically in case of exception like null pointer or similar
			}
			else  //TP474201 server is down or Page not found 
			if(jqXHR.status === 404 || (jqXHR.status === 0 && jqXHR.statusText != undefined && jqXHR.statusText.toLowerCase() === "error"))
			{
				if(settings.url.indexOf("/path/AlertsAjaxServlet") >= 0 && settings.type == 'GET' && $.browser.msie)
				{
					  //Continue Polling
					  alertEngine.amq.setContinuePolling(true);
					  alertEngine.amq.continuePolling();
				}
				else
				{	
					var serverDropMsg = (typeof server_conn_drop_key === undefined || server_conn_drop_key === "server_conn_drop_key")?
						"Server connection is dropped or requested page is not available! Please try to reload your page." 
						:server_conn_drop_key;
					setTimeout(function(){_showErrorMsg(serverDropMsg,error_msg_title);}, 700);
				}
				cacheAjaxError(jqXHR,settings);
				_showProgressBar(false);
			}
			else if(jqXHR.status === 409)// pathSol error code used in handleException
			{
				_showErrorMsg('Security Error, Please contact Administrator',error_msg_title);
				cacheAjaxError(jqXHR,settings);
				_showProgressBar(false); 
			}
			formatNumbers();
		});
	$(this).ajaxSuccess(function(event, jqXHR, settings)
		{
			 //check if the menu is loaded
			 if($('div#appMenu').length == 1)
			 {	 
				//check if the response's header contains path_axs_changed filled from PathSessionInterceptor 
			    var path_axs_changed = jqXHR.getResponseHeader("path_axs_changed");
			    if(path_axs_changed != undefined && path_axs_changed != null && path_axs_changed != "" )
			     {
			    	 //check if the jquery data doesn't contains a cached path_axs_changed to avoid showing the same confirmation message many times 
			    	 var cached_path_axs_changed = cachePathData("cached_path_axs_changed");
			    	 if(cached_path_axs_changed == undefined || cached_path_axs_changed == null || cached_path_axs_changed == "false")
			    	 {
			    		 cachePathData("cached_path_axs_changed","true");
			    		 openAxsChangedDialog(path_axs_changed);
			    	 }
			     }
			 }
		     
			 if(settings.dataType == "json")
			{
				var data = $.parseJSON(jqXHR.responseText)
				var _title;
				if(data._msgTitle != null && data._msgTitle != "")
						_title = data._msgTitle;
				if(typeof data["_error"] != "undefined" && data["_error"] != null)
				{
					if(_title == null || _title == "")
						_title = error_msg_title
					
					bSelenuimError=1;
					var addArgs = {}; 
					//set the adjust Height/width flag for fixing dialog dimensions according to large texts (avoid scrollbars)
					addArgs["adjustMsgBoxSize"] = true;
					/**
					 * [MarwanMaddah]
					 * added to escapeHtml
					 */
					var customArgs = {};
					customArgs["escapeHtml"] = true;
					
					// check if there is element to focus in case of error
					var _afterValidMethod = null;
					if(typeof data["_errorFocusElem"] != "undefined" && data["_errorFocusElem"] != null)
					{
						addArgs["_elementFocusId"]= data["_errorFocusElem"];
						_afterValidMethod = "_afterValidateErrorMsg";
					}
					/**
					 * 
					 */
					_showErrorMsg(data._error,_title,null ,null, _afterValidMethod,addArgs,customArgs); 
					//Added for SMART
					//if _showSmartInfoBtn is set from base action to be equal to SMART_MAND_INFO_MSG 
					// then showSMARTDetails
					if(typeof data["_showSmartInfoBtn"] != "undefined" && data["_showSmartInfoBtn"] != null && data["_showSmartInfoBtn"] == "SMART_MAND_INFO_MSG")
				     {
				      showSMARTDetails(data["_pageRef"]);
				     }
				}
				else if(typeof data["_warning"] != "undefined" && data["_warning"] != null)
				{
					if(_title == null || _title == "")
						_title = warning_msg_title;
					/**
					 * [MarwanMaddah]
					 * added to escapeHtml
					 */
					var customArgs = {};
					customArgs["escapeHtml"] = true;
					/**
					 * 
					 */
					_showErrorMsg(data._warning,_title,null ,null, null,null,customArgs); 
				}
				
				if((typeof data["_memo"] != "undefined" && data["_memo"] != null)
						|| (typeof data["_memoJson"] != "undefined" && data["_memoJson"] != null && data["_memoJson"] != ''))
				{
					var memoParams  = {};
					//In case of passing multiple memoSC in an json String format (_memoJson)
                    if (typeof data["_memoJson"] != "undefined" && data["_memoJson"] != null && data["_memoJson"] != '')  
                    {
                    	// constructing the json string from recieved json array as string
                          memoParams["memoJson"] =  '{"root":' + data["_memoJson"] + '}';
                    }
                    else// single memo
                    {
                    	$.each(data._memo, function(n,i){if(i!=null) memoParams[n]=i;});//removing properties with null value
                    }
                    showMemo(memoParams);
				}
				else if (typeof data["_alert"]!= "undefined" && data["_alert"] != null)
				{
					
					var alertParams  = {};
					data._alert.emptyBigDecimalValue = null;
					$.each(data._alert, function(n,i){if(i!=null) alertParams[ '_alert.' + n ]=i});//removing properties with null value	
					showSendAlert(alertParams);
					
				}
				
			}
			
			formatNumbers();
		});
	
	// enable double click on touch devices
	mobileAndTabletcheck();
	if($.browser.path_mobile_tablet)
	{
		$(window).bind("touchstart",function(e){
			var t2 = e.timeStamp;
			        var t1 = $(this).data('lastTouch') || t2;
			        var dt = t2 - t1;
			        var fingers = e.originalEvent.touches.length;
			        $(this).data('lastTouch', t2);
			        if (!dt || dt > 500 || fingers > 1){
			            return; // not double-tap
			        }
			        e.preventDefault(); // double tap - prevent the zoom
			        // also synthesize click events we just swallowed up
			        $(e.target).click().dblclick();
			 return true;
			});
	}
		
	//add a blur event on all textarea, input fields and livesearch mode text to check on min length
	$( "textarea.ui-state-focus[minlength],input.ui-state-focus[type='text'][minlength]:not(.hasDatepicker)").live('blur',function()
		{
			checkInputMinLength(this);
		});
	
});

/**
 * Method to call after the form validation or required and min, max validation
 * @param args arguments passed to error message dialog
 * @returns
 */
function _afterValidateErrorMsg(theArgs)
{
	// check of focus element id exists
	if(theArgs!= null && theArgs._elementFocusId)
	{
		var elt = $("#"+theArgs._elementFocusId);
		// if not found the element by id, then try with page Ref and then  by name
		if(elt.length <= 0)
		{
			// try with prog_ref Added
			elt = $("#"+theArgs._elementFocusId +""+_pageRef);
			if(elt.length <= 0)
			{
				elt = $('[name="' + theArgs._elementFocusId + '"]');
			}
		}
		// check if the element is located in the hidden tab so that to select on it to open
		if(elt.length > 0)
		{
			var closestHiddenTab = elt.closest("div.ui-tabs-hide");
			// if the element is in hidden tab
			if(closestHiddenTab.length > 0)
			{
				var idTabToSel = closestHiddenTab.attr("id");
				// get the parent container of the tabs
				var tabsContainerId = closestHiddenTab.parent().attr("id");
				if(tabsContainerId != undefined)
				{
					// select the tab
					$("#"+tabsContainerId).tabs("select","#"+idTabToSel);
				}
			}
			
			//TP 873012 check if in hidden collapsible Pannel
			var closestCollapsiblePannel = elt.closest("div.collapsibleContainerContent");
			if(closestCollapsiblePannel.length > 0)
			{
				var displayStyle = closestCollapsiblePannel.css("display");
				if(displayStyle === "none")
				{
					// get the Title of the collapsible to click on it
					var collpasibleTitle =  $(".collapsibleContainerTitle", closestCollapsiblePannel.parent());
					if(collpasibleTitle.length > 0)
					{
						collpasibleTitle.click();
					}
				}
			}
		}
		
		// check if the required field is related to a div that is opened from click element like button
		var closestDivWithOpeningAttr = elt.closest("div[pathRelOpeningElem]"); 
		if(closestDivWithOpeningAttr.length > 0)
		{
			var openingElemId = closestDivWithOpeningAttr.attr("pathRelOpeningElem");
			var theOpenedElem = $("#"+openingElemId);
			if(theOpenedElem.length <= 0)
			{
				// try the id with PageRef
				theOpenedElem = $("#"+openingElemId+"_"+_pageRef);
			}
			// if element exists click on it to be opened
			if(theOpenedElem.length > 0)
			{
				theOpenedElem.click();
			}
		}
		// need timeout in case collapsible pannel was closed and need to open it by click done above
		var tooltipserTimeout = setTimeout(function()
		{
			// check if element is focusable
			var isEltFocus = elt.is(":focusable");
			if(isEltFocus)
			{
				var prevTooltip = elt.attr('title');

				elt.focus();
				// make nice highlight on focused element
				$.struts2_jquery.require( "tooltipster.bundle.js" ,null,jQuery.contextPath +"/common/jquery/js/plugins/");
				$.struts2_jquery.requireCss("tooltipster.bundle.css",jQuery.contextPath +'/common/style/tooltipster/');
				if ( elt.hasClass("tooltipstered"))
				{
					elt.tooltipster('destroy');
				}

				var theCont = "<span>"+(typeof missing_elt_msg_key != undefined ? missing_elt_msg_key : 'Missing Field')+"</span>";
				elt.tooltipster({content: theCont,timer:2000,trigger:'custom',position: 'top',contentAsHTML:true,trackTooltip:true,trackerInterval:50});
				elt.tooltipster('show');
				if(prevTooltip) 
				{
					elt.attr('title', prevTooltip);
				} 
			}
			clearTimeout(tooltipserTimeout);		
		},50);
	}
}

/**
 * Function to detect whether the browser is running on Mobile or Tablet
 */
mobileAndTabletcheck = function() {
	  var check = false;
	  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true;})(navigator.userAgent||navigator.vendor||window.opera);
	  $.browser.path_mobile_tablet = check;
	  return check;
	};

applySubmitTarget = (function ()
{
	var freezeSubmit = $("*[freezeOnSubmit='true']");
	if(freezeSubmit.length > 0)
	{
		if($("#indicatorDiv").html()==null || $("#indicatorDiv").html() === "")
		{
			  constructIndicatorDiv();
		}
	}
	var allSubmitBtns = $("input[type='button'][type='submit'],button[tosubmit='true']");
	allSubmitBtns.each(function(i)
	{
		$(this).bind("click",function()
			{
				parseNumbers();
		    });  
	})
	
});

parseNumbers = (function ()
{
		//adding a flag to know that numbers have been parsed
		$.data(document.body,"parseNumbers",true);
		$("input[type='text'][mode='number']").each(function(i)
		{
			if($(this).attr("nbFormat"))
			{
				if(typeof $(this).val() != "undefined" && $(this).val() != null && $(this).val() != "")
					$(this).val(unformatNumber($(this).val()))
				
			}
		})
});

formatNumbers = (function ()
{
	//if parseNumbers was used need to reformat, otherwise do not do anything
	if(typeof $.data(document.body,"parseNumbers") != "undefined" && $.data(document.body,"parseNumbers") == true)
	{
		$("input[type='text'][mode='number']").each(function(i)
		{
			if($(this).attr("nbFormat"))
			{
				var dataValue = $(this).val(); 
				if(typeof dataValue != "undefined" && dataValue != null && dataValue != "")
				{
					 dataValue = $.formatNumberNumeric(dataValue, {format:  $(this).attr("nbFormat"),leadZeros:$(this).attr("leadZeros"), zeroNotAllowed:( ($(this).attr("zeroNotAllowed") === "true")? true : false), formatter:($(this).attr("formatter")!=null?$(this).attr("formatter"):"")});
					$(this).val(dataValue);
				}
			}
		})
		$.removeData(document.body,"parseNumbers");
	}
});

constructIndicatorDiv = (function()
{
	$("body").append("<div align=\"center\" id=\"indicatorDiv\" class=\"FreezePaneOn\" style=\"display:none\">"
		+"<img id=\"indicatorImg\" src="+jQuery.contextPath+"/common/images/loading.gif"+"></div>");
	
});

var timeoutRedirect = false; //variable used to know that session timeout to be called in haschanges
function redirectToTimeout()
{
	timeoutRedirect = true;
	_showProgressBar(false);
	document.location.href = jQuery.contextPath+"/login/unSecureAction_sessionTimeout";
    return;
}
//PathSolutions:escape html.
function escapeHtml(text) {
    var div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
}
/**
 * PathSolutions (elie) jquery.msgbox alert function
 * msg: message to be displayed
 * title: title of the message box
 * closeFn: Success callback function
 */
_showErrorMsg = (function (msg, title,width,height, closeFn, additionalArgs,customArgs)
{
	if(typeof title == "undefined" || title == "")
		title = error_msg_title;
	
	if(typeof customArgs != "undefined" && customArgs != null && typeof customArgs.escapeHtml !="undefined" && customArgs.escapeHtml!=null && customArgs.escapeHtml == true)
	{
		msg = escapeHtml(msg);
	}
	
	var errorOptions = {
		type: 'alert',
			content: msg,
			title: title,
			popupId : "_popup_path_sol_ok",
			ok_label: ok_label_trans
	}
	if(closeFn)
	{
		if(!additionalArgs)
		{
			additionalArgs = {};
		}
		errorOptions.arguments = additionalArgs;
		// if there is close function then need to call it with arguments
		if(!jQuery.isFunction( closeFn ))
		{
			if(!window.name || !window.name.indexOf("extScreenFrame") == 0) //external screen
				errorOptions.onClose = function(){jQuery.globalEval( closeFn + "("+JSON.stringify(this.opts.arguments)+")" ); };
		}
		else
		{
			errorOptions.onClose = function(){ closeFn(additionalArgs)};
		}
		
	}
	
	if(typeof width != "undefined" && width != null && width != "")
		errorOptions["width"] = width;
	
	if(typeof height != "undefined" && height != null && height != "")
		errorOptions["height"] = height;
	
	if(typeof additionalArgs != "undefined" && additionalArgs != null)
	{
		$.extend(errorOptions,additionalArgs);
	}
	if(window.name && window.name.indexOf("extScreenFrame") == 0)//external screen, get the main window height property 
	{
		errorOptions["fromPostMsg"]="1";
		$.postMessage({ showErrorMsg: JSON.stringify(errorOptions)}, window.originalUrl ,window.top);
	}
	else
	{
		new $.msgbox(errorOptions).show();
	}
})
/**
 * PathSolutions (elie) jquery.msgbox confirm function
 * msg: message to be displayed
 * title: title of the message box
 */
_showConfirmMsg = (function (msg, title,closeFn, args, okBtnTrans, cancelBtnTrans,width,height,customArgs)
{
	
	var callingFunc = closeFn;
	if(!args)
	{
		args = {};
	}
	
	if(!jQuery.isFunction( callingFunc ))
	{
		if(!window.name || !window.name.indexOf("extScreenFrame") == 0) //external screen
			callingFunc = function(){jQuery.globalEval( closeFn + "("+this.getValue()+","+JSON.stringify(this.opts.arguments)+")" ); };
	}
	else
	{
		if(window.name && window.name.indexOf("extScreenFrame") == 0) //external screen
		{
			alert("DEV Problem defining the Confirm callback function. \nPlease use instead the function name as a string and the additional args. parameter");
			return;
		}
		else
		{
			callingFunc = function(){var val = this.getValue(); closeFn(val,args)};
		}
	}
	
	if(typeof title == "undefined" || title == "" || title == null)
		title = confirm_msg_title;

	var okTrans = ok_label_trans;
	var cancelTrans = cancel_label_trans;
	if(typeof okBtnTrans != "undefined" && okBtnTrans != "" && okBtnTrans != null)
	{
		okTrans = okBtnTrans;
	}
	if(typeof cancelBtnTrans != "undefined" && cancelBtnTrans != "" && cancelBtnTrans!= null )
	{
		cancelTrans = cancelBtnTrans;
	}
	/**
	 * [MarwanMaddah]
	 */
	if(typeof customArgs != "undefined" && customArgs != null && typeof customArgs.escapeHtml !="undefined" && customArgs.escapeHtml!=null && customArgs.escapeHtml == true)
	{
		msg = escapeHtml(msg);
	}
	/**
	 * 
	 */
	var optionsConfirm = {
	onClose: callingFunc,
	type: 'confirm',
	content: msg,
	title: title,
	arguments : args,
	ok_label: okTrans,
	popupId : "_popup_path_sol_confirm",
	cancel_label: cancelTrans};
	
	if(typeof width != "undefined" && width != null && width != "")
		optionsConfirm["width"] = width;
	
	if(typeof height != "undefined" && height != null && height != "")
		optionsConfirm["height"] = height;
	
	if(window.name && window.name.indexOf("extScreenFrame") == 0)//external screen, get the main window height property 
	{
		optionsConfirm["fromPostMsg"]="1";
		var iframeURL = window.location.href;
		var appContextRoot = jQuery.contextPath;
		//getting the root url of application in the frame regardless if there is port or not
		iframeURL = iframeURL.substring(0,iframeURL.indexOf(appContextRoot)+appContextRoot.length+1);
		optionsConfirm["iframeURL"]= iframeURL;
		optionsConfirm["iframeName"]= window.name;
		$.postMessage({ showConfirmMsg: JSON.stringify(optionsConfirm)}, window.originalUrl ,window.top);
	}
	else
	{
		var confirmBox = new $.msgbox(optionsConfirm);
		confirmBox.show();
		return confirmBox;
	}
})

 

function resizeGrids() {
	var grid;
	
    if ( grid= $('.ui-jqgrid-btable:visible')) {
        grid.each(function(index) {
            var gridId = $(this).attr('id');
            resizeSingleGrid(gridId)
        });
    }
};
function resizeSingleGrid(gridId) {
            var gridParentWidth = $('#gbox_' + gridId).parent().width();
            $('#' + gridId).jqGrid("setGridWidth",gridParentWidth);
};

/**
 * method to disable or enable page by applying overlay over the page
 * @param {Object} yesNo to specify whether to disable (true) or enable (false)
 */
_disablePage = (function(yesNo)
{
	if(yesNo)
	{
 		$("#global-overlay-container").show();
 	}
	else
	{
		$("#global-overlay-container").hide();
	}
});
/**
 * PathSolutions (Libin) _showProgressBar function - Shows a progress image or progress image with default text "Please Wait..." or progress image with custom text 
 * @param {Boolean} displayFlag: true to enable progress bar and false to disable already shown progress bar
 * @param {Boolean} showImgOnly: true to show progress image only with out any label
 * @param {String} custProgressLabel: custom message to show along with the progress image
 * @param {String} customProgClass: custom class for progress bar so that it will not be overriden by default one.
 */
_showProgressBar = (function(displayFlag, showImgOnly, custProgressLabel, customProgClass) {
	//Fix Issue #269621 , in case of external screen call the _showProgressBar externally
	if(window.name && window.name.indexOf("extScreenFrame") == 0)
	{   
		$.postMessage({ confirmCallBack: '_showProgressBar' ,confirmValue:displayFlag,confirmArgs:'null'}, window.originalUrl ,window.top);
		return;
	}
	
	var displayStatus = 'none';// to hide/unhide progress bar image

	if (custProgressLabel == undefined)
		custProgressLabel = msg_progDefaultLabel; // setting default label 'msg_progDefaultLabel' (coming from resource bundle) if custom label is not defined
	
	var progressBarClass= "displayProgBar";
    if(customProgClass)
    {
           progressBarClass = customProgClass;
    }

	if (displayFlag)// if to show progress bar
	{
		
		displayStatus = '';
		if ($('.'+progressBarClass).length == 0) //if dispProgBar doesn't exist
		{
			var themeName = (window["globalThemeName"] === undefined || window["globalThemeName"] == "" )? "Cupertino":globalThemeName;//$('.jquery-ui-themeswitcher-title').text();
			// taking the label them and performing substring from ":" till end check loadTheme function
//			themeName = $.trim(themeName.substring(themeName.indexOf(":")+1, themeName.length))
//					.toLowerCase().replace(/ /g, '');
			themeName = themeName.toLowerCase();

			// building progress bar image 
			var holderDiv = $('<div class="'+progressBarClass+'"/>'); // main div which holds the whole structure 
			var bgDiv = $('<div class="ui-widget-shadow progBarBackGound"/>'); // background div
			var contentDiv = $('<div class="progBarContent"/>');// progress image and label span holder div
			var imgName = (jQuery.contextPath == undefined? contextPath:jQuery.contextPath)
					+ '/common/style/images/progressImages/' + themeName
					+ '_Image.gif'; // assigning the image
			var progressImg = ('<img src="' + imgName + '" />'); // image object

			contentDiv.prepend(progressImg); // adding progress bar image to progress bar div

			if (showImgOnly != undefined && !showImgOnly) // if showImgOnly flag is not defined or set to false 
				contentDiv
						.append('<br/><br/><span style="font:15px bold arial,sans-serif;color:orange;" class="">' + custProgressLabel + '</span>');// setting label

			// styling to background div 'progBarBackGound'
			bgDiv.css( {
				'display' : displayStatus
			});

			// styling to content div 'progBarContent'
			contentDiv.css( {
				'left' : (($(bgDiv).width()) / 2) + 'px'
			});
			
			holderDiv.prepend(bgDiv);// adding background to holder div
			holderDiv.prepend(contentDiv);// adding contnet to holder div
			$('body').append(holderDiv); // adding the progress bar to document body
		}
	} else // if to remove progress bar
	{
		
		if ($('.'+progressBarClass).length != 0)
		{
			$('.'+progressBarClass).remove(); // removing the already shown progress bar from document body
		}
	}

});


/**
 * PathSolutions (Libin) _showProgressIcon function - Shows a progress icon near the field for which this image is called
 * @param {Boolean} displayFlag: true to enable progress icon and false to disable already shown progress image
 * @param {String} elementId: id of the element for which the progress icon has to be shown
 */
_showProgressIcon = (function(displayFlag, elementId) {


	if (displayFlag)// if to show progress icon
	{
		if ($('.displayProgIcon').length == 0) //if dispProgIcon doesn't exist
		{
			var themeName = (window["globalThemeName"] === undefined || window["globalThemeName"] == "")? "Cupertino":globalThemeName;//$('.jquery-ui-themeswitcher-title').text();
			// taking the label them and performing substring from ":" till endcheck loadThem function
//			themeName = $.trim(themeName.substring(themeName.indexOf(":")+1, themeName.length))
//					.toLowerCase().replace(/ /g, '');
			themeName = themeName.toLowerCase();

			var holderSpan = $('<span class="displayProgIcon"/>');
			 holderSpan.css({'margin-left': -18});
			if(document.dir === "rtl")
			{
				 holderSpan.css({'margin-right': -18});
			}
			holderSpan.css( {
				'vertical-align' : 'middle',
				'text-align' : 'center',
				'display' : 'inline-block',
				'margin-top': -3
			});

			var imgName = jQuery.contextPath
					+ '/common/style/images/progressIcons/' + themeName
					+ '_Icon.gif'; // assigning the image
			var progressImg = ('<img class="displayProgIconImage" src="' + imgName + '" />'); // image object
			holderSpan.append(progressImg);// placing the prog image inside span

			$(document.getElementById(elementId)).after(holderSpan); // appending the progress Icon to the input field
		}
	} else {
		if ($('.displayProgIcon').length != 0)
			$('.displayProgIcon').remove(); // removing the progress icon from screen
	}

});


function keyDownPressed(e)
{
    e = e? e : window.event;
    var t = e.target? e.target : e.srcElement? e.srcElement : null;
    var k = e.keyCode? e.keyCode : e.which? e.which : null;
    if (k == 8) //backspace
    {
    	//path-editable-div is for cases where the div is specified to be editable
   		if(t && t.tagName && ((t.type && /(password)|(text)|(file)/.test(t.type.toLowerCase())) || t.tagName.toLowerCase() == 'textarea') 
   				&& (typeof $(t).attr("readonly") == "undefined" || !$(t).attr("readonly") || $(t).hasClass("path-editable-div")))
        	return true;
   
    
        if (e.preventDefault)
            e.preventDefault();
        return false;
    }
    else if(k== 114 && e.ctrlKey && t && t.id.indexOf("lookuptxt") > -1) //CTRL + F3
	{
    	var spanId = t.id.replace("lookuptxt","spanLookup");
		$($(document.getElementById(spanId)).find("span.ui-icon")[0]).click();
	}
    else if(k== 32) //space bar
    {
   		if(t && t.tagName && (t.type && /(checkbox)|(password)|(text)|(file)/.test(t.type.toLowerCase())) || t.tagName.toLowerCase() == 'textarea')
        	return true;
   		
   		//allow the click on the ui-icon only in case the focused element is a span (like livesearch span with icon) or a button 
   		//other elements like td, div,etc... having child ui-icon should not be clicked and propagate the click to the icon
   		//issue of clear cache, or closing of tab or menu click upon hitting space bar or enter keys 
   		if(t && t.tagName && (t.tagName.toString().toLowerCase() == "span" || t.tagName.toString().toLowerCase() == "button"))
   		{
   			if(t.tagName.toString().toLowerCase() == "button")
   			{
   				$(t).click();
   				$(t).blur();
   			}
   			else if($(t).find("span.ui-icon").length > 0)
   			{
	   			$($(t).find("span.ui-icon")[0]).click();
   			}
   		}
    	else if (e.preventDefault)//disabling the moving of scroll on space bar click
		{
            e.preventDefault();
	        return false;
		}
    }
    else if(k == 13) //enter key
	{
		if(t && t.tagName &&(t.tagName.toString().toLowerCase() == "span" ) && $(t).find("span.ui-icon").length > 0)
   		{
   			$($(t).find("span.ui-icon")[0]).click();
   		}
	}
    // need to be uncommneted upon delivery to the client
    else if((k == 67 || k == 65 || k == 88 || k== 86 )&& e.ctrlKey && disPrntScrn === "1") // CTRL+C, CTRL+A,CTRL+X,  CTRL+V
    {
    	if (e.preventDefault)
    	{
    		e.preventDefault();
    	}
    	return false;
    }
    else if(k == 112)// F1 key Help Clicked
	{
    		if(t && t.tagName && (t.type && /(password)|(text)|(file)/.test(t.type.toLowerCase())) 
    				|| t.tagName.toLowerCase() == 'textarea' || t.tagName.toLowerCase() == 'select')
        	{
    			var curPageRef;
    			if(typeof _pageRef === "undefined")
    			{
    				 	curPageRef = "ROOT";
    			}
    			else
    			{
    				  curPageRef = _pageRef;
    			}

				// temporary to check on ui-state-focus class 
    			if(t.id != null && $("#"+t.id).hasClass("ui-state-focus"))
    			{
	    				callHelpWindow(curPageRef,t.id, t.name);
	    				if (e.preventDefault)
	            			e.preventDefault();
	    				return false;
    			}
    			//Enable help screen to open even if no focus on specific element
				else if(curPageRef != "ROOT")
				{
					callHelpWindow(curPageRef);
    				if (e.preventDefault)
            			e.preventDefault();
    				return false;
				}
    			
        	}
    		//Enable help screen to open even if no element is selected
    		else if(!(typeof _pageRef === "undefined"))
    		{
    			callHelpWindow(_pageRef);
				if (e.preventDefault)
        			e.preventDefault();
				return false;
    		}
    }
    else if( k == 81 && e.altKey && e.shiftKey)// CTRL+SHFT+Q key to open New Customer
    {
    	// if icon available
    	if("#anchor_icon_person_id")
    	{
    		globalOpenCifChoice();
    	}
    }
    return true;
};
        

function handleLabelRequiredVal(labelId, _required, labelText, labelKeyVal)
{
		var $label = $("#"+labelId); 
		var forElts = $label.attr("for");
		var labelKey = $label.attr("labelkey");
		if(labelKey != null && labelKey != undefined && labelKey != "undefined" && labelKey != "")
			{
				$label.attr("labelkey",labelKeyVal);
			}
		//[PathSolutions] jquery-3.3.1 migration - point 25 - fix Uncaught Error: Syntax error, unrecognized expression: # inside the handleLabelRequiredVal() in CommonFunc.js that occur of the forElts is empty, then the $("#") will throw the : Uncaught Error: Syntax error, unrecognized expression: # 
		if(typeof forElts != "undefined" && forElts != null && forElts != "")
		{
			if(forElts.indexOf("~") > -1)
			{
				var forEltsArr = forElts.split("~");
				for(var i=0; i<forEltsArr.length; i++)
				{
					$relatedEltId = $("#"+forEltsArr[i]);
					if( ($relatedEltId.closest("fieldset[id^='pathAccount_']").length > 0 && $($relatedEltId.closest("fieldset[id^='pathAccount_']")[0]).css("display") === "none" )
							|| ( $relatedEltId.closest("table[id^='tbl_pathAccount_']").length > 0 &&  $($relatedEltId.closest("table[id^='tbl_pathAccount_']")[0]).css("display") === "none") 
							|| (typeof $relatedEltId.css("display") != "undefined" && $relatedEltId.css("display") === "none"))
					{
						$label.attr("style","display:none");
						break;
					}
					//if not to be hidden make sure it is visible may be hidden previously
					$label.css("display","")

					//setting label text
					if(typeof labelText != "undefined" && labelText != null && labelText != "")
						$label.html(labelText);
					
					if (!_required || _required == "false")
					{
						if(typeof $relatedEltId.css("display") == "undefined" || $relatedEltId.css("display") !== "none")
						{
							if($relatedEltId.attr("required") == "true" || $relatedEltId.attr("required") == "required")
							{
								$label.addClass("required");
								if($label.find("span.required").length == 0)
									$label.html($label.html()+"<span class='required'>*</span>")
								break;
							}
							else
							{
								$label.removeClass("required");
								if($label.find("span.required").length > 0)
									$label.find("span.required").remove();
							}
 						}	
					}
				}
			}
			else
			{
				var $relatedElt =  $("#"+forElts);
				var $tempElt = $relatedElt;
				
				/**
				 * Correction related to label for management in case of a hidden Div when open it in a dialog
				 * in case of livesearch label, get the parent div to check if it is on display none
				 */
				if ($relatedElt.hasClass('liveSearchText'))
				{
	 				var temp = forElts.replace("lookuptxt_",""); 
				    $tempElt = $(document.getElementById("lookupdiv_"+temp))
				}
				if(/*($relatedElt.is(":hidden")  && !$label.is(":hidden"))|| */ (typeof $tempElt.css("display") != "undefined" && $tempElt.css("display") === "none" && $label.css("display") !== "none"))
				{
					$label.css("display","none");
				}
				else
				{
					// setting label from overriden in case the label key not specified by dependency (labelText parameter is defined)
					if(typeof $relatedElt.attr("overrideLabelText") != "undefined" && typeof labelText == "undefined")
					{
						labelText =  $relatedElt.attr("overrideLabelText");
						overrideLabelKey = $relatedElt.attr("overrideLabelKey");
						if(overrideLabelKey != null && overrideLabelKey != undefined && overrideLabelKey != "undefined" && overrideLabelKey != "")
						{
							$label.attr("labelkey",overrideLabelKey);
						}
					}
					//setting label text and tooltip on the input 
					if(typeof labelText != "undefined" && labelText != null && labelText != "")
					{
						$label.html(labelText);
						var currToolTip = $relatedElt.attr("title");
						// if tooltip not available, since tooltip migh come from DB
						if(currToolTip == null || currToolTip === "")
						{
						 $relatedElt.attr("title",labelText);
						}
					}
					
					if (!_required || _required == "false")
					{
						if(typeof $relatedElt.css("display") != "undefined" && $relatedElt.css("display") !== "none")
						{
							if($relatedElt.attr("required") == "true" || $relatedElt.attr("required") == "required")
							{
								$label.addClass("required");
								if($label.find("span.required").length == 0)
									$label.html($label.html()+"<span class='required'>*</span>")
							}
							else
							{
								$label.removeClass("required");
								if($label.find("span.required").length > 0)
									$label.find("span.required").remove();
							}
						}
					}
				}
			}
		}
}


		
$.fn.bindFormChanges = (function(relatedPopUpDivId,divIds)
{
	if(window.addEventListener)
	{
      window.addEventListener('beforeunload', beforeunload, true);
    }
	else
	{
		window.attachEvent('onbeforeunload', beforeunload);
	}
	var _formId = $(this).attr("id");
	var _form = document.getElementById(_formId ); //getting the form dom element
	if(_form == null) return;
	
	/**
	 * [MarwanMaddah]: add formId attribute to the DIV in case this div is related to a Form.
	 * to use it in changeTrack management.
	 */
	if(typeof _formId !="undefined" && _formId!=null && typeof relatedPopUpDivId!="undefined" && relatedPopUpDivId!=null && $(this).hasClass("path-track-changes"))
	{
		$("#"+relatedPopUpDivId).attr("formId",_formId);
	}
	/**
	 * Just dummy Css class inorder to flag the form as changed trackable used later when bindChanges applied on DIV
	 * (see above condition)
	 */
	if (!$(this).hasClass("path-track-changes")) {
		$(this).addClass("path-track-changes");
	}
	/**
	 *  End
	 */

	var $root = $(_form);
	
	//in case of dialog the div itself becomes outside the form, we need to go through div elements and bind the changes to the main related form
	if(typeof relatedPopUpDivId != "undefined" && relatedPopUpDivId!=null )
		$root = $("#"+relatedPopUpDivId);

	if($.browser.msie && $.browser.version <= 8 )
	{
		$root.find(":input.textCompSize,:input.path-dummy-cls,:input.dateCompSize,select.selectCompSize,:input.liveSearchCompSize,:input.editable,textarea").each(function()
		{
			var self = $(this)
			var actionChange = self.attr("onchange");
			if(typeof actionChange != "undefined" && actionChange != "")
			{
				self.removeAttr('onchange');
				self.bind("change",function()
				{
					jQuery.globalEval(actionChange);
				})
			}
		})
	}
	// check whether to exclude on change based on divIds (mentioned by the dev) 
	var onChangeString = ":input.textCompSize, :input.path-text-size,:input.path-dummy-cls,:input.dateCompSize,select.selectCompSize,:input.liveSearchCompSize,:input.editable,textarea"
	if(divIds!=null)
	{
		onChangeString = ":input.textCompSize"+returnExcludedDivs(divIds,'input.textCompSize')+", :input.path-text-size"+returnExcludedDivs(divIds,'input.path-text-size')+",:input.path-dummy-cls"+returnExcludedDivs(divIds,'input.path-dummy-cls')+",:input.dateCompSize"+returnExcludedDivs(divIds,'input.dateCompSize')+",select.selectCompSize"+returnExcludedDivs(divIds,'select.selectCompSize')+",:input.liveSearchCompSize"+returnExcludedDivs(divIds,'input.liveSearchCompSize')+",:input.editable"+returnExcludedDivs(divIds,'input.editable')+",textarea"+returnExcludedDivs(divIds,'textarea')+""
	}
	$root.on("change", onChangeString ,function(e)
	{
		var elt = e.target? e.target : e.srcElement? e.srcElement : null;
		//adding the test on css classes because the selectors are not working with current jquery, the event is triggered on any descendant of the form regardless of selector
		//keep using .on for dynamically created inputs, selector works in jquery 1.7+
		if(elt != null)
		{
			// check whether to exclude on change based on divIds (mentioned by the dev) 
			var $element = $(elt);
			if(divIds!=null)
			{
				$element = $(elt).filter(function()
				{
					var idsArray = divIds.split(",");
					var retVal = "";
					for(var x =0 ; x< idsArray.length ; x++)
					{
						retVal += "#" +idsArray[x]+ " :input.textCompSize, #" +idsArray[x]+ " :input.path-text-size, #" +idsArray[x]+ " :input.path-dummy-cls, #" +idsArray[x]+ " :input.dateCompSize, #"  +idsArray[x]+ " select.selectCompSize, #" +idsArray[x]+ " :input.liveSearchCompSize, #" +idsArray[x]+ " :input.editable, #" +idsArray[x]+ " textarea";
						if(x+1 <idsArray.length)
						{
							retVal +=",";
						}
					}
					
				    return $(this).closest(retVal).length == 0;
				})
			}
			if($element.hasClass("textCompSize") || $element.hasClass("path-text-size")
					|| $element.hasClass("path-dummy-cls") || $element.hasClass("dateCompSize")
					|| $element.hasClass("selectCompSize") || $element.hasClass("liveSearchCompSize")
					|| $element.hasClass("editable") || $element.is("textarea"))
			{
               detectChanges(_form);
			}
		}
	})
})

//check whether the lookup is child for the ids (coma separated)
function hasParentById(lookup,ids)
{
	if(ids!=null && ids!="undefined" && ids!="")
	{
		var arrayIds = ids.split(",");
		for(var x =0 ; x< arrayIds.length ; x++)
		{
			if(lookup.parents("#"+arrayIds[x]).length == 1) return true;
		}
	}
	return false;
}

$.fn.hasChanges = (function(showMessage)
{
	var _theform = document.getElementById($(this).attr("id")); //getting the form dom element
	var retVal = true;
	if(typeof $.data(_theform , 'changeTrack') == "undefined" || $.data(_theform , 'changeTrack') == false)
	{
		if(showMessage != undefined)
		{
			_showErrorMsg(changes_not_available_key,info_msg_title); 
		}	
		retVal = false;
	}
	return retVal;
})


function returnExcludedDivs(divIds,cssClass)
{
	var idsArray = divIds.split(",");
	var retVal = ":not(";
	for(var x =0 ; x< idsArray.length ; x++)
	{
		retVal += "#" +idsArray[x]+ " :" + cssClass;
		if(x+1 <idsArray.length)
		{
			retVal +=",";
		}
	}
	retVal +=")";
	
	return retVal;
}

 function beforeunload(e)
{
	//no need to show changes message in case of session timeout, redirect only to login page
	if(timeoutRedirect)
	{
		timeoutRedirect = false;
		return;
	}
    var changed = false;
    //used this because it is different between IE and FF
    var theTarget = e.target ? e.target : window; // IE8
    var formsArr = (typeof theTarget.forms != "undefined") ? theTarget.forms : theTarget.document.forms ;
    formChanged = {};
	for(var i=0; i<formsArr.length; i++)
	{
		var _formid = formsArr[i].id;
		var $frm = $("#"+_formid);
		var _formHidden = $frm.is(":hidden")
		var hasChanges = $frm.hasChanges();
		if((_formHidden+"") != "true" &&  hasChanges  )
		{
		  	e = e || window.event;
      		e.returnValue = changes_made_confirm_msg;
      		break;
		}
		
	}
}


/**
 * for calling server side for cache clearing.
 */
function clearCache()
{
	   /* Login Alert Implementation TP#297149
	      In case the teller is waiting the manager approval, 
	      we need to stop the clear cache  */
	   if(disableBtnInLoginAlert())
	   {	
			return;
	   }
	
	  _showProgressBar(true);
	   $.postJSON(jQuery.contextPath+"/pathdesktop/DesktopAction_clearCache", null, 
		function( data, status, xhr ) 
		{
			if(typeof data["_error"] != "undefined" || data["_error"] != undefined || data["_error"] != null)
			{
				_showErrorMsg(data._error,error_msg_title); 
			}
			else
			{
				var _msg = "";
				if(data.welcMsg != null && data.welcMsg != "")
				{
					_msg = data.welcMsg;
				}
				_showErrorMsg(cache_cleared_success_key + _msg,info_msg_title);
				clearCachedPathData();  
			}
			_showProgressBar(false);
		});
}
/**
 * function for changing log level at runtime
 */
function changeLoglevel()
{
	_showProgressBar(true);
	var loadSrc = jQuery.contextPath+"/path/customization/CustomizationMaint_logLevelPageLoad";
	var	techDetDiv = $("<div id='tech_det_change_log_level_div'/>");
	techDetDiv.css("padding","0");
	$('body').append(techDetDiv);
	
	$("#tech_det_change_log_level_div").load(loadSrc, {}, function() {
	_showProgressBar(false);	
	var saveBtnLbl = (typeof saveLevelLabel === undefined )? "Save" :saveLevelLabel;
	var buttons = [{ 
     text: saveBtnLbl,
     id: "_tech_det_log_change_save",
     click: function()
     {
    	 var theForm = $("#tech_det_log_level_change_form").serializeForm();
		 $.ajax({
			 url: jQuery.contextPath+"/path/customization/CustomizationMaint_updateLogLevel",
	         type:"post",
			 dataType:"json",
			 data: theForm,
			 success: function(data)
			 		{
				 		if(typeof data["_error"] == "undefined" || data["_error"] == null)
				 		{
					 			 _showErrorMsg(record_was_Updated_Successfully_tech_key,info_msg_tech_title_key);
					 			 _showProgressBar(false);
					 			 $("#tech_det_change_log_level_div").dialog("close");
				 		}
				 		else // there is error
				 		{
				 			_showProgressBar(false);
				 		}
				 	}
			 });
    	 }
	 }];
    $("#tech_det_change_log_level_div").dialog({modal:true, 
	                               title:tech_det_log_level_key,
	                               autoOpen:false,
	                               show:'slide',
	                               position:'center', 
	                               width:'350',
	                               height:'150',
	                               buttons :buttons,
	                               close: function (){
		 								  var theDialog = $(this);
		 								  theDialog.remove();
													    }});
	$("#tech_det_change_log_level_div").dialog("open");
});
}

function setPageRef(pageRef){
	_pageRef =  pageRef;
	
}

$.fn.serializeForm = (function()
{
	$form = $(this);
	// Find disabled inputs, and remove the "disabled" attribute
	var disabled = $form.find(':disabled').removeAttr('disabled');
	 // serialize the form
	parseNumbers();
	var serialized = $form.serialize();
	 // re-disabled the set of inputs that you previously enabled
	disabled.attr('disabled','disabled');
	
	//finds checkboxes and sets the true/false corresponding values according to valOpt
	var checkboxes = $form.find("input[type='checkbox'][valOpt]");
	checkboxes.each(function()
	{
		var $current = $(this)
		var valOpt = $current.attr("valOpt").split(":"); 
		var currName = $current.attr("name");
		var checkValue;
		if($current.is(":checked"))
			checkValue = valOpt[0];
		else
			checkValue = valOpt[1];
		
		var nameStr = encodeURIComponent(currName) + "=";//encode to replace case of [] for example when list is used 
		if(serialized.indexOf("&"+nameStr)> -1)
		{
			var indexOfName = serialized.indexOf("&"+nameStr);
			nameStr = "&"+ nameStr;
			serialized = serialized.substring(0,indexOfName + nameStr.length) + checkValue + serialized.substring(serialized.indexOf("&",indexOfName+ nameStr.length))
		}
		else //when unchecked it is not in the serialized string we add it
			serialized = serialized  + "&" + nameStr + checkValue; 
	})
	return serialized;
})
/**
 * [MarwanMaddah]:has been used as a default formatter for the liveSearch management(LookupBaseAction.java) 
 */
function defaultNumFmatter(cellvalue, options, rowObject)
{
	//added space bcause empty values come without border if no space, grid usually puts by default space if there is no formatter
	// === used if the value come null from server then no to format
	if(cellvalue === null || cellvalue === "" || typeof cellvalue == "undefined")
		return " ";
	var _colModel = options.colModel;
	var nbFormat = _colModel.nbFormat
	var _leadZeros = (typeof _colModel.leadZeros != "undefined") ? _colModel.leadZeros : "" ;
	return $.formatNumberNumeric(cellvalue, {format: nbFormat,leadZeros:_leadZeros});
}

function returnNbFormat(decPlaces, leadZeros,colNbFormat)
{
	var nbFormat = "#,##0";
	decPlaces = parseInt(decPlaces);
	if(decPlaces > 0)
	{
		nbFormat += ".";
		while(decPlaces > 0)
		{
			nbFormat += "0";
			decPlaces --;
		}
		return nbFormat;
	}
	else if (typeof colNbFormat != "undefined" && colNbFormat !== null)// sometimes data at initial load does not contain currency and a certain default nbformat needs to be applied
		return colNbFormat;
	else
		return "###";
}

function unformatNumber(numVal)
{
	var glblDecSep = returnDecSep();
	var glblGrpSep = returnGrpSep();
	 //in case of formatted values with ()and CR DR remove characters of formatting
	var ret = ""+numVal;
	// replace group separator by nothing and the decimal separator by a standard '.'
	ret = ret.replace(glblGrpSep, '');
	ret = ret.replace(glblDecSep, '.');
	
	if(ret.match(/[^0-9\.\-]/g))
	{
		var temp = ret.replace( /[^0-9\.\-]/g, '');
		/**
		 * to avoid any issue in case the cr_suffix_key_trans is not defined.
		 */
		if((typeof cr_suffix_key_trans !="undefined" && cr_suffix_key_trans!=null && cr_suffix_key_trans != "undefined" && cr_suffix_key_trans !== "" && cr_suffix_key_trans.length > 0 && ret.indexOf(cr_suffix_key_trans) > -1)  || ret.indexOf("(") == 0 ) //CR suffix or ( formatting should be negative
			ret = "-"+ temp;
		else 
			ret = temp;
	}
	if(ret != "")
	{
		var retArr = ret.split(".");
		if(retArr[0].length >= 10 || (retArr.length > 1 && retArr[1].length >= 7))
			return ret;
		
		return Number(ret) +""; //parsing to number then converting back to string so that will remove leading zeros
	}
	return ret;
}

function callHelpWindow(progRef, elemId, elemName)
{
	if(typeof helpServerURL === "undefined")
	{
		
		_showErrorMsg("No Help Server Assigned, Contact Administrator",error_msg_title);
		return;
	}
	 if(typeof progRef === "undefined" || progRef === "")
     {
		if(typeof _pageRef === undefined || _pageRef === "")
		{
			_showErrorMsg(select_screen_help_key,error_msg_title);
			return;
		}
		else
		{
			progRef = _pageRef;
		}
	}



	//retrieve the file name from help_path in table OPT
	var srcURL = jQuery.contextPath+'/path/customization/CustomizationMaint_loadHelpPage.action';
	$.ajax({
		 url: srcURL,
         type:"post",
		 dataType:"json",
		 data: {"_pageRef":progRef},
		 success: function(data)
		 {
			if(data.helpScreenURL != "" && (typeof data["_error"] == "undefined" || data["_error"] == null))
			{
				var helpAppName = appName;
				if(data.custCO.appName != null && data.custCO.appName != "")
				{
					helpAppName = data.custCO.appName;
				}
				var helpFileURL = helpServerURL+"/"+userLangVar+"/"+helpAppName+"/"+data.helpScreenURL;
				if(elemName != null && elemName != undefined)	
				{
					helpFileURL = helpFileURL+"#"+elemName;
				}
				window.open(helpFileURL, "help_wind","modal=yes,scrollbars=1,resizable=yes,width="+returnMaxWidth(700)+",height="+returnMaxHeight(600),true);
			}
		 }
    });
}


/**
 * method called from loginInfo to save with the new User running date
 */
function globalSaveUserRunningDate(){
	
	var anyScreenOpened = $.find("li.path-screen-openned");
	if(anyScreenOpened.length > 0)
	{
		_showErrorMsg(close_all_opened_screen_key,info_msg_title);
		return;
	}
	var dtpRunningDate = returnHtmlEltValue("global_user_run_date");
	var obj = {"newRunningDate":dtpRunningDate};
	if(dtpRunningDate == "")
	{
		_showErrorMsg($("#User_Running_Date_key").text(),missing_elt_msg_key);
		return;
	}
	//check holiday and show confirm message
	$.ajax({
		 url: jQuery.contextPath+"/path/rundatechange/ChangeRunDateAction_checkIfDateHoliday",
         type:"post",
		 dataType:"json",
		 data: obj,
		 success: function(data)
		 {
		    if(typeof data["_error"] == "undefined" || data["_error"] == null)
		    {
				if (data["_confirm"] == null) 
				{
			 		updateUserRunningDate(true);
				}
				else
				{
					_showConfirmMsg(data["_confirm"],"","updateUserRunningDate","flag");
				}		    	
		    }
		    else
		    {
		    	setInputValue("global_user_run_date",$("#global_user_run_date").attr("prevvalue"));
		    }
		 }
    });
}
function updateUserRunningDate(flag)
{
	if(flag)
	{
		var dtpRunningDate = returnHtmlEltValue("global_user_run_date");
		var obj = {"newUserRunDate":dtpRunningDate};
		_showProgressBar(true);
		$.ajax({
			 url: jQuery.contextPath+"/path/rundatechange/ChangeRunDateAction_saveUserRunningDate",
	         type:"post",
			 dataType:"json",
			 data: obj,
			 success: function(data){
				if (data["_error"] == null) 
				{
			 		$("#hdr_runn_date").text(data["newFrmtUserRunDate"]);
			 		 $("#global_user_run_date").attr("prevvalue",data["newUserRunDate"]);
			 		 // to clear any cached data by default since running data is changed.
			 		clearCachedPathData();
			 		_showErrorMsg(record_was_Updated_Successfully_key,info_msg_title);
				}
				else
				{
					setInputValue("global_user_run_date",$("#global_user_run_date").attr("prevvalue"));
				}
				_showProgressBar(false);
			 }
	    });
	}
	else
	{
		setInputValue("global_user_run_date",$("#global_user_run_date").attr("prevvalue"));
	}
}

/**
 * method called from loginInfo to save with the new Application running date
 */
function globalSaveAppRunningDate()
{
	var anyScreenOpened = $.find("li.path-screen-openned");
	if(anyScreenOpened.length > 0)
	{
		_showErrorMsg(close_all_opened_screen_key,info_msg_title);
		return;
	}
	var dtpRunningDate = returnHtmlEltValue("global_app_run_date");
	if(dtpRunningDate == "")
	{
		_showErrorMsg($("#Application_Running_Date_key").text(),missing_elt_msg_key);
		return;
	}
	var obj = {"newRunningDate":dtpRunningDate};
	$.ajax({
		 url: jQuery.contextPath+"/path/rundatechange/ChangeRunDateAction_checkIfDateHoliday",
         type:"post",
		 dataType:"json",
		 data: obj,
		 success: function(data)
		 {
		    if(typeof data["_error"] == "undefined" || data["_error"] == null)
		    {		    	
				if (data["_confirm"] == null) 
				{
			 		updateAppRunningDate(true);
				}
				else
				{
					_showConfirmMsg(data["_confirm"],"","updateAppRunningDate","flag");
				}
		    }
		    else
		    {
		      setInputValue("global_app_run_date",$("#global_app_run_date").attr("prevvalue"));	
		    }
		 }
    });
}
function updateAppRunningDate(flag)
{
	if(flag)
	{
		var dtpRunningDate = returnHtmlEltValue("global_app_run_date");
		var obj = {"newAppRunDate":dtpRunningDate};
		_showProgressBar(true);
		$.ajax({
			 url: jQuery.contextPath+"/path/rundatechange/ChangeRunDateAction_saveAppRunningDate",
	         type:"post",
			 dataType:"json",
			 data: obj,
			 success: function(data){
				if (data["_error"] == null) 
				{
			 		$("#hdr_runn_date").text(data["newFrmtAppRunDate"]);
			 		$("#global_app_run_date").attr("prevvalue",data["newAppRunDate"]);
			 		// change the user running date also since in session it is changed
			 		setInputValue("global_user_run_date",data["newAppRunDate"]);
			 		 // to clear any cached data by default since running data is changed.
			 		clearCachedPathData();
			 		_showErrorMsg(record_was_Updated_Successfully_key,info_msg_title);
				}
				else
				{
					setInputValue("global_app_run_date",$("#global_app_run_date").attr("prevvalue"));
				}
				_showProgressBar(false);
			 }
	    });
	}
	else
	{
		setInputValue("global_app_run_date",$("#global_app_run_date").attr("prevvalue"));
	}
}

/**
 * open dialog to change the running date
 * @return
 */
function loginInfo_onDateClick()
{
	var anyScreenOpened = $.find("li.path-screen-openned");
	if(anyScreenOpened.length > 0)
	{
		_showErrorMsg(close_all_opened_screen_key,info_msg_title);
		return;
	}
	var loadSrc = jQuery.contextPath+"/path/rundatechange/ChangeRunDateAction_openChangeRunningDate";
	var	runningDateDiv = $("<div id='running_date_div' class='path-common-sceen'/>");
	runningDateDiv.css("padding","0");
	var theBody = $('body');
	runningDateDiv.insertAfter(theBody);
	
	_showProgressBar(true);
	$("#running_date_div").load(loadSrc, {}, function() {
	_showProgressBar(false);	
		
	var closeBtnLbl = (typeof signature_close_btn === undefined )? "Close" :signature_close_btn;
	var buttons = [{ 
     text: closeBtnLbl,
     id: "_header_rundate_dialog_close",
     click: function(){$("#running_date_div").dialog("close");}
	 }];
    $("#running_date_div").dialog({modal:true, 
	                                  title:Change_running_date_key,
	                               autoOpen:false,
	                                   show:'slide',
	                               position:'center', 
	                                 width:'350',
	                                 height:'125',
	                                 buttons :buttons,
	                                 close: function (){
		 								  var theDialog = $(this);
		 								  theDialog.remove();
													    }});
	$("#running_date_div").dialog("open");
});
}
/**
 * method used to make full screen mode, called from application Header
 */
function _toggleFullScreen() 
 {
	  if (!document.fullscreenElement &&    // alternative standard method
	      !document.mozFullScreenElement && !document.webkitFullscreenElement) 
	    {  // current working methods
	      if (document.documentElement.requestFullscreen) 
	      {
	       document.documentElement.requestFullscreen();
	      } 
	      else if (document.documentElement.mozRequestFullScreen) 
	      {
	        document.documentElement.mozRequestFullScreen();
	       } 
	      else if (document.documentElement.webkitRequestFullscreen) 
	      {
	      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
	      }
	      else if ($.browser.msie) 
	      { // Older IE.
	        _IE_fullScreenMode()
	      }
	      else
		  {
		    	_showErrorMsg("Not Supported Feature");
		  }
	      
	  } 
	  else 
	  {
	    if (document.cancelFullScreen) 
	    {
	      document.cancelFullScreen();
	    } 
	    else if (document.mozCancelFullScreen) 
	    {
	      document.mozCancelFullScreen();
	    } 
	    else if (document.webkitCancelFullScreen) 
	    {
	      document.webkitCancelFullScreen();
	    }
	    else if ($.browser.msie)
	    {
	    	_IE_fullScreenMode()
	    }
	    else
	    {
	    	_showErrorMsg("Not Supported Feature");
		}
  	}
}
/**
 * old IE, older than IE 10 Full screen mode adjusting called from function  _toggleFullScreen() 
 */
function _IE_fullScreenMode() 
{
	 try
	 {
    	 var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) 
        {
            wscript.SendKeys("{F11}");
        }
    }
	catch(e)
	 {
		 _showErrorMsg("Please Adjust Security Settings In IE Options to Activate Full Screen Mode");
	 }
}



/**
 * parses a date string in ISO_8601 format to a date object (<=IE8 compatible) 
 * @param {Object} _dateStr
 */
function parseISODateStr(_dateStr)
{
	var a=_dateStr.split("T");
	var d=a[0].split("-");
	if(a.length > 1)
	{
		var t=a[1].split(":");
		date = new Date(d[0],(d[1]-1),d[2],t[0],t[1],t[2])
	}
	else if(d.length > 1)
		date = new Date(d[0],(d[1]-1),d[2]);
	else
		return null;
	return date;
}

/**
 * retrieves selected text on an active input
 * @return {TypeName} 
 */
function getSelectedText()
{
  var selectedText=(window.getSelection ? window.getSelection() : document.getSelection ? document.getSelection() : document.selection.createRange().text );
 if(!selectedText || selectedText=="")
 {
    if(document.activeElement.selectionStart || document.activeElement.selectionEnd)
    {
     selectedText = document.activeElement.value.substring(document.activeElement.selectionStart ,document.activeElement.selectionEnd);
    }
 }
 return selectedText;
}



//Call the Labeling screen using (applicationName, pageReference)
//This will show all the labels' keys translated for the specified appName and pageRef 
function loadTransByAppPageRef(appName, pageRef)
{
	loadTranslation(null, appName, pageRef);	
}

//Call the Labeling screen using (applicationName)
//This will show all the labels' keys translated for the specified appName
function loadTransByApp(appName)
{
	loadTranslation(null, appName);	
}

//Call the Labeling screen using (keyLabelCode, applicationName, pageReference)
//This will show the label key translated for the specified KEY_LABEL_CODE, applicationName, pageReference
function loadTranslation(keyLabelCode, appName, pageRef)
{
	$.struts2_jquery.require("Translation.js", null, jQuery.contextPath
		+ "/common/js/translation/");
	
		loadLblTransConfiguration(keyLabelCode, appName, pageRef);
}

/**
 * opening specified screen URL in a Dialog popup with Iframe not to change progRef 
 * specification in opend screen for ids conflict
 * @param screenUrl screen URL Action in the same application
 * @param screenParams json Object
 * @param framePageRef pageRef for the opened Screen taht will act as _pageRef varaibel
 * @param frameTitle titler of the Dialog
 */
function openFrameLoader(screenUrl,screenParams,framePageRef, frameTitle)
{
	if(screenUrl != undefined && screenUrl != null && screenUrl != ''
		&& framePageRef != undefined && framePageRef != null && framePageRef != '')
	{	
		_showProgressBar(true);
		var frameSrc = jQuery.contextPath + "/path/frameloader/loadFrame";
		var frameParams = {};
		if(screenParams != undefined && screenParams != null)
		{
			frameParams = screenParams;
		}
		var title = '';
		if(frameTitle != undefined && frameTitle != null && frameTitle != '')
		{
			title = frameTitle;
		}
		//Check if the div already exists in HTML documnent, and remove it if exists
		if($("#frameLoaderDiv_" + framePageRef) && $("#frameLoaderDiv_" + framePageRef).attr('id') != undefined)
		{
			$("#frameLoaderDiv_" + framePageRef).dialog("destroy");
			$("#frameLoaderDiv_" + framePageRef).remove();
		}
		
		var frameLoaderDiv = $('<div>',{id:"frameLoaderDiv_" + framePageRef});
		
		$('body').append(frameLoaderDiv);
		
		$("#frameLoaderDiv_" + framePageRef).dialog( {
					autoOpen : false,
					modal : true,
					title : title,
					position : 'center',
					width  : '1000',
					height : '850',
					close : function(ev, ui) {
						
	                        //Fix Issue TP 243614 Nabil Feghali of JQuery object is Undefined in IE9 based on the bug                                                 //http://bugs.jqueryui.com/ticket/9122 
	                        if($.browser.msie)
	                        {     
	                             $("#AppFrameLoader_" + framePageRef).attr('src', 'about:blank');
	                        } 
	                        parent.closeFrameLoader(framePageRef);
						}
				});
		
		$("#frameLoaderDiv_" + framePageRef).load(
			frameSrc,
			{'screenUrl': screenUrl , 'screenParams':JSON.stringify(screenParams), '_pageRef':framePageRef});
	}
}

/**
 * This function is used to open the dialog frame
 * @param {Object} framePageRef
 */
function openFrameDialog(framePageRef)
{
	$("#frameLoaderDiv_" + framePageRef).dialog("open");
}

/**
 * This function is used to close the frame and show error message in case
 * @param {Object} framePageRef
 * @param {Object} error
 * @param {Object} title
 */
function closeFrameLoader(framePageRef, error, title)
{
	$("#frameLoaderDiv_" + framePageRef).dialog("destroy");
	$("#frameLoaderDiv_" + framePageRef).remove();
	
	if(error != undefined && error != null)
	{
		if(title == undefined || title == null || title == "")
		{
			title = error_msg_title
		}
		_showErrorMsg(error,title); 
	}
}

/**
 * Method that return the start cursur position of an provided element
 * such as input
 * @param o
 * @returns
 */
function returnCursorPosStart(o) 
{
	$.struts2_jquery.require( "jquery.maskedinput.js",null,jQuery.contextPath+"/common/jquery/js/plugins/");
	/**
	 * [MarwanMaddah]: Add focus to the element only in case is not focused
	 * to avoid the removing of the decimal separator in case of numeric fields
	 */
	if(!$(o).is(":focus"))
	{
	  $(o).focus();	
	}
	var caretPos = $(o).caret().begin;
	return caretPos ;
}


/**
 * hides all labels having a For attribute and the element related to id in For does not exist
 * @memberOf {TypeName} 
 */
hideLabelsWithoutEltInFor = (function()
{
	var allLables = $("label[for]");
	allLables.each(function(i)
	{
		var relatedEltId = $(this).prop("for");
		//[PathSolutions] jquery-3.3.1 migration - point 23 - fix Uncaught Error: Syntax error, unrecognized expression: # inside the handleLabelRequiredVal() amd hideLabelsWithoutEltInFor() in CommonFunc.js that occur of the forElts is empty, then the $("#") will throw the : Uncaught Error: Syntax error, unrecognized expression: # 
		if(relatedEltId != undefined && relatedEltId != null && relatedEltId != "" && relatedEltId.indexOf("~") < 0) //only in account we can put in 'for' all the inputIds which does not truly exist as an html element
		{
			var $relatedElt = $("#"+relatedEltId);
			if($relatedElt == null)
			{
				$(this).remove();
			}
		}
	});
});

function logoutApp()
{
	_showProgressBar(true);
	/*in case the alert engine is enabled,then the global variable alertEngine is defined, 
	we need to set the flag manuelLogout to true to avoid sending useless check alive request from the AlertEngine.js(custom error handler) */
	if(typeof alertEngine != 'undefined' && alertEngine != undefined)
	{
		alertEngine.manuelLogout = true;
	}
	$.ajax({
		 url: jQuery.contextPath+"/pathdesktop/DesktopAction_returnExternalUrls",
         type:"post",
		 dataType:"json",
		 data: {},
		 success: function(data)
		 {
			 if(typeof data.externalOpenedUrls != "undefined" && data.externalOpenedUrls.length > 0)
			 {
				for(var i=0; i<data.externalOpenedUrls.length; i++)
				{
					var url = data.externalOpenedUrls[i];
					if(url.substring(url.length -1) != "/")
					{
						url += "/";
					}
					
					var params = "j_username="+data.loggedInUserName;
					params = returnEncryptedData(params,false);	
					url += "login/unSecureAction_logoutExternal?" + params;
					jQuery("<iframe onload='$(this).remove()' name='logoutIframe_'"+i+" style='display:none' src='"+url+"'/>").appendTo("body");
				}
			 }
		 },
		complete:function()
		{
			_showProgressBar(false); 
			logoutMainApp();
		}
    });
}

function logoutMainApp()
{
	if($("iframe[name^='logoutIframe_']").length == 0 )
	{
		jQuery("<form id='logoutForm' name='logoutForm'"+
				"action='"+jQuery.contextPath+"/j_spring_security_logout'"+
				"method='post'>").appendTo("body");
		submitEncryptedData('logoutForm',true);
	}
	else
	{
		if(typeof logoutTimer != "undefined")
		{
			clearTimeout(logoutTimer );
		}
		logoutTimer = setTimeout(function()
		{
	    	logoutMainApp();
		}, 100);
	}
}
/**
 * [MarwanMaddah] Used to reset Grid user Preferences and reload grid 
 * @param {Object} newGridOpt
 * @param {Object} elem
 * @param {Object} o
 * @param {Object} pEdit
 * @param {Object} pAdd
 * @param {Object} pDel
 * @param {Object} pSearch
 * @param {Object} pView
 * 
 */
function resetUserGridPreferences(gridId)
{
	var theFormId = $("#gbox_"+gridId).closest("form").attr("id");
	if(theFormId!=null && theFormId!="undefined")
	{		
	   var $frm = $("#"+theFormId);
	   var hasChanges = $frm.hasChanges();
	   
	}
	var args = {objectId:gridId,objectType:"GRID"};
	if(hasChanges!=null && hasChanges!="undefined" && hasChanges)
	{
	  _showConfirmMsg(changes_made_confirm_msg,confirm_msg_title,resetUserGridPreferencesAfterConfirm,args);	
	}
	else
	{
		resetUserGridPreferencesAfterConfirm(true,args);
	}
}
/**
 * Sets the grid default column order
 * calls BaseAction.saveObjectColumnsOrder
 * @param {Object} gridArgs
 */
function setUserDefaultGridPreferences(gridArgs)
{
	$.ajax({
		 url:jQuery.contextPath +"/path/customization/CustomizationMaint_saveObjectColumnsOrder",
		type:"post",
		data:{objectId:gridArgs.id,orderArr:gridArgs.remapColumns,_pageRef:_pageRef,objectType:"GRID",isDefault:"Y"},
	 success:function(data){
		/**
		 * added to clear the cached HTMLs at the browser side
		 * to get the ordering changes on relaod 
		 */
		clearCachedPathData();
  		_showErrorMsg(grid_user_def_key,info_msg_title);
	   }
	}
					);
}
function resetUserGridPreferencesAfterConfirm(flag,args)
{
	if(flag)
	{
		$.ajax({			
		   url:jQuery.contextPath +"/path/customization/CustomizationMaint_resetObjectColumnsOrder",
		   type:"post",
		   data:{objectId:args.objectId,_pageRef:_pageRef,objectType:args.objectType},
		   success:function(data)
		   {
			  if(typeof data["_error"] == "undefined" || data["_error"] == null || data["_error"] == "undefined")
			  {
				  /**
				   * [MarwanMaddah]
				   * added to clear cach in case there is any html cached on the browser 
				   * (used on some screens in CSM application for performance purpose)
				   */
				  clearCachedPathData();
				  _showErrorMsg(grid_user_pref_key,info_msg_title);
			  }
		   }
		});
	}

}
function reOrderGridHeader(headerArr,headerIndxArr)
{
	if(headerArr.length > 0 && headerIndxArr.length > 0)
	{
		var result = [];
	   	for(var i=0;i<headerArr.length;i++)
	   	{
	   	   result[headerIndxArr[i]] = headerArr[i];
	   	}
	   	return result;
	}
}

/**
 * 
 * @param {Object} divId
 * @param {Object} parentId
 */
 function toggleOptionsDiv(divId, parentId,additionalArg)
 {
	
	 var $div = $("#"+divId);
	 if(typeof additionalArg !="undefined" && additionalArg!=null && additionalArg!="")
	 {		
		 var thisObjId        = additionalArg.thisObjId;
		 var custMaintRight   = additionalArg.custMaintRight;
		 var custApproveRight = additionalArg.custApproveRight;
		 
		 if(typeof thisObjId !="undefined" && thisObjId!=null && thisObjId!="")
		 {
			 $("#"+divId).empty();
			 var contentToAppend = "<table width='100%' cellpadding='0' cellspacing='1' border='0'>"
				 +"<tr><td class='labelTd' onclick='elemCustOpen(&quot;"+thisObjId+"&quot;,2)'><span>View</span></td></tr>";
			 if(typeof custMaintRight!="undefined" && custMaintRight!=null && custMaintRight!="")
			 {
				contentToAppend = contentToAppend + "<tr><td class='labelTd' onclick='elemCustOpen(&quot;"+thisObjId+"&quot;,0)'><span>Maintenance</span></td></tr>"; 
			 }
			 if(typeof custApproveRight!="undefined" && custApproveRight!=null && custApproveRight!="")
			 {
				contentToAppend = contentToAppend +  "<tr><td class='labelTd' onclick='elemCustOpen(&quot;"+thisObjId+"&quot;,1)'><span>Approve</span></td></tr>";
			 }
			 contentToAppend = contentToAppend+"</table>";
			 $("#"+divId).append(contentToAppend);
		 }
	 }
	 
	 var theDiv = $("#"+parentId)
	 var _zIndexVal = 1000;
	 /**
	  * [MarwanMaddah]
	  * added to manage the z-index of the toggle options
	  * when opening a screen in a dialog
	  */
	 var _parentHasIndex = $("#"+parentId).closest("div.ui-dialog");
	 if(typeof _parentHasIndex !="undefined" && _parentHasIndex!=null)
     {
    	 var _zIndex = _parentHasIndex.css("zIndex");
    	 if(typeof _zIndex!="undefined" && _zIndex!=null)
    	 {
    	   _zIndexVal = _zIndex; 	 
    	 }
     }
	 	if($div.is(":hidden"))
      	{
			$("body").last().after($div)
	      	var rightLeft;
    	  	var leftOrRight = "right";
  		    var height = theDiv.offset().top+20;
		    $div.css("position","absolute");
		    $div.css("display","block");
		    $div.css("top",height);
		    $div.css("z-index",_zIndexVal);
		    var rightLeft;
	      	if(document.dir == "rtl")
			{
				rightLeft = theDiv.offset().left -1;
		  	}
			else
		  	{
				//BUG#931669 Audit Options for Clear cache and Log level is not visible properly 
				rightLeft = theDiv.offset().left -1  + theDiv.width() -  $div.width()  ;
			}
		    $div.css("left",rightLeft);
		    $div.css("display","");
		}
 		else
		{
	   		$div.css("display","none");
	 	}
	 var container = $div;
	 $(document).mouseup(function (e)
		 {
			 container.hide();
		 });
	 $(document).keydown(function (e)
		 {
		 container.hide();
		 });
 }
 
 
 
function popup_close(event, curDiv)
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
		$(curDiv).css("display","none");
	}
	
}
function detectChanges(_form)
{
   $.data(_form,"changeTrack",true);
   if(window.name && window.name.indexOf("extScreenFrame") == 0) 
   {
	$.postMessage({ iframeEltChanged: window.name}, window.originalUrl ,window.top);
   }
}

/**
 * Method to Cache Data/html Pages at browser side
 * @param variableName variableName to cache or to return
 * @param theValue if specifified then teh value will be chached if not specified then the cachedVariable named variableName will be returned
 */
function cachePathData(variableName, theValue)
{
	var cachedData = $.data(document,"pathCachedData");
	if(typeof cachedData === "undefined")
	{
		cachedData = {};
	}
	
	if(typeof theValue != "undefined")// means need to set the variable
	{
		cachedData[variableName] = theValue;
		$.data(document,"pathCachedData",cachedData);
	}
	else // read the variable
	{
		return cachedData[variableName];
	}
}

/**
 * function used to cache the ajax error when it will be handled in $.ajaxError() 
 * @param jqXHR
 * @param settings
 * @returns
 */
function cacheAjaxError(jqXHR,settings)
{
	var path_ajax_error = {};
	path_ajax_error.jqXHR_status = jqXHR.status;
	path_ajax_error.jqXHR_statusText = jqXHR.statusText;
	path_ajax_error.settings_type = settings.type;
	path_ajax_error.settings_url = settings.url;
	path_ajax_error.settings_data = settings.data;
	path_ajax_error.settings_p = returnEncryptionPwd(false);
	cachePathData("path_ajax_error",path_ajax_error);
}


/**
 * Methof to clear data/page ... cached, The method called by default when
 * Clearing Customer Session "globalOpenCifChoice" and in Running Date change
 * 
 * @param variableName
 *            the variable name specifies which data to clear if not provided
 *            then all will be cleared
 */
function clearCachedPathData(variableName)
{
	var cachedData = {};
	if(variableName)
	{
		cachedData = $.data(document,"pathCachedData");
		if(typeof cachedData == "undefined")
		{
			cachedData = {};
		}
		else
		{
			delete cachedData[variableName];
		}
	} else {
		// Khaled: persist the already binded ids for shortcutkeys
		var alreadyBindedIds = cachePathData("shortcutBindedIds") || [];
		cachedData["shortcutBindedIds"] = alreadyBindedIds;
	}
	$.data(document,"pathCachedData",cachedData);
}

function addOldValToTitle(elemId, elemOldValue)
{
	var $elt = $("#"+elemId);
	var title = $elt.attr("title");
	if(typeof title == "undefined")
	{
		title = "";
	}
	title += oldValKey + ": "+elemOldValue;
	$elt.attr("title",title);
}


var fieldAuditActive;

bindAuditEvent = (function(elementID){

try
{
	$htmlElt = $("#"+elementID);

	if($htmlElt.hasClass('ui-button') || $htmlElt.hasClass('fg-button') || $htmlElt.is(":button"))
	{
		$htmlElt.bind("click",function(event)
		{
			fieldAuditActive = true;
			callAuditOnField(elementID);
		});
	}
}
catch(e)
{
//do nothing
}
});

callAuditOnField = (function(elementID)
{
try
{
	$htmlElt = $("#"+elementID);

    var prevValue = $htmlElt.attr("prevValue");
	prevValue = (typeof prevValue == "undefined") ? "" : prevValue ;


	var newValue = returnHtmlEltValue(elementID);

	var $label = $("label[for='"+elementID+"']");

	//CREATE A HIDDEN FIELD FOR DATE FILL THIS FIELD UPON FIRST AJAX CALL
	var $actionDate;
	if(!$("#actionDate_"+_pageRef) || $("#actionDate_"+_pageRef).attr('id') == undefined)
	{
		$actionDate = $("<input type='hidden'  id="+"actionDate_"+_pageRef+" name='"+"actionDate_"+_pageRef+"'/>");
		$actionDate.appendTo($("form:first"));
	}
	else
	{
		$actionDate = $("#actionDate_"+_pageRef);
	}

	//Element type encoded web component type linked to LOV id 659
	var elementType, radioGrpLbl;
	var fieldAuditDetails = '';
	if ($htmlElt.is(":checkbox"))
	{
		prevValue = !newValue;
		elementType = 6;
	}
	else if($htmlElt.is(":radio"))
	{
		elementType = 5;
		//Bug 514831 Handling Radio Group label
	    radioGrpLbl = $htmlElt.attr("groupElemKeyLabel");
	}
	else if($htmlElt.hasClass('ui-button') || $htmlElt.hasClass('fg-button') || $htmlElt.is(":button"))
	{
		//	642699 Show the CIF instead of button clicked
		if($("#fieldAuditDetails_" + _pageRef))
		{
			fieldAuditDetails = $("#fieldAuditDetails_" + _pageRef).val();
		}
		elementType = 8;
	}
	else
	{
		elementType = 1;
	}
	
	//Fix button label in case the label used is coded inside the element tag.
	var labelKey = $label.attr('labelkey');
		
	if(labelKey == null || labelKey == 'undefined' || labelKey == undefined || labelKey == '')
	{
		var $innerLabel = $htmlElt.find("label")[0];
		if($innerLabel != null && $innerLabel != 'undefined' && $innerLabel != undefined && $innerLabel != '')
			{
				labelKey = $innerLabel.getAttribute('labelkey');
			}
	}

	//Bug 514831 Handling Radio Group label
	newValue = elementType==5?labelKey:newValue;
	labelKey = elementType==5?radioGrpLbl:labelKey;
	if(labelKey == null || labelKey == 'undefined' || labelKey == undefined || labelKey == '')
	{
		var fieldDescLabel = $htmlElt.attr('fielddesc');
		labelKey = (fieldDescLabel== null ||fieldDescLabel == 'undefined' || fieldDescLabel == undefined || fieldDescLabel == '') ?$htmlElt.attr('title'):fieldDescLabel;
	}
	//if the element is from the grid the the label will be the title of the column.
	if($htmlElt.parents().hasClass('ui-jqgrid'))
	{
		labelKey ="GRID " + $($htmlElt.parent()[0].outerHTML).attr("tdlabel");
	}
	var paramList = {
			"progRef":_pageRef,
			"actionDate":$actionDate.val(),
			"fieldAuditDetails":fieldAuditDetails,
			"auditDtlVO.OLD_VALUE":prevValue,
			"auditDtlVO.NEW_VALUE":newValue,
			"auditDtlVO.FIELD_NAME":labelKey,
			"auditDtlVO.ELEMENT_NAME":$htmlElt.attr('name'),
			"auditDtlVO.ELEMENT_TYPE":elementType
	};
	
	var actionUrl = jQuery.contextPath + '/path/audit/audit_auditOnField';
	 $.ajax({
		 url: actionUrl,
         type:"post",
		 dataType:"json",
		 data: paramList,
		 success: function(response)
		 		{
			 		fieldAuditActive=false;
			 		if(typeof response["_error"] == "undefined" || response["_error"] == null)
			 		{
			 			var model = response["model"];
			 			// 691148 Field & CIF Audit
			 			var actionDate = model["actionDate"];
			 			$("#actionDate_"+_pageRef).val(actionDate);
			 			var jsFunc = model["jsFuntionName"];
			 			
			 			var imalIndex = JSON.parse(model["screenCIFHTMLIDs"]);
			 			var htmlIDs,auditCifVals,cifLineNb;

			 			if(imalIndex)
			 			{
			 				htmlIDs = imalIndex["screenCIFHTMLIDs"];
			 			}
			 			var iLength = htmlIDs.length;
			 			if(iLength > 0)
			 			{
				 			auditCifVals = "";
				 			cifLineNb = model["fieldAuditCIFLnNb"];
				 			for (i = 0; i < iLength; i++)
				 			{
				 				var cifVal = $("#" + htmlIDs[i].htmlID + "_" + _pageRef).val();
				 				auditCifVals += cifVal.length > 0? cifVal + "," : cifVal;
				 			}
				 			
				 			model["screenCIFHTMLVals"] = auditCifVals;
				 			var actionUrl = jQuery.contextPath + '/path/audit/audit_auditOnFieldAddCIFs';
				 			 $.ajax({
				 				 url: actionUrl,
				 		         type:"post",
				 				 dataType:"json",
				 				 data: model,
				 				 success: function(response)
				 				 		{
						 					if(jsFunc) {
						 						eval(jsFunc+'("'+actionDate+'","'+ cifLineNb+'")');
						 					}
				 				 		}
				 			 });
			 			}
			 		}
			 	}
		 });
	 
	//Added Checking on the Attribute fieldAudit in order to handle prvvalue
	//for elements that have no dependency
	 if(!checkAvailDependency(elementID) && checkAvailFieldAudit(elementID))
	 {
		// set previous Value to current one
		var prevValue = $htmlElt.attr("prevValue");
		$htmlElt.attr("prevValue",newValue);
	 }

}
catch(e)
{
//do nothing
}
});

function dynScreenProcessAfterValidate(formId, screenId)
{
	$("#"+formId).processAfterValid("dynamicScreenOnBtnSubmit",[formId,screenId]);
}

function dynamicScreenOnBtnSubmit(formId, screenId)
{
	var formChanged = $("#" + formId).hasChanges();
	if (!formChanged)
	{
		_showErrorMsg(changes_not_available_key, info_msg_title);
		return;
	}
	else
	{
		_showConfirmMsg(Confirm_Save_Process_key, confirm_msg_title, dynamicScreenOnBtnSubmit_confirm, {
			formId : formId,
			screenId : screenId
		});
	}
}

function dynamicScreenOnBtnSubmit_confirm(confirm, args)
{
	if (confirm)
	{
		_showProgressBar(true);
		var globalUpdates = [];
		var editableGridIds = $("#"+args.formId+"_gridUpdateIds").val().split(";"); 
		editableGridIds.pop();
		$.each(editableGridIds, function( index, value ) {
			var updates = $("#"+value).jqGrid("getChangedRowData");
			$("#"+value+"_gridUpdates").val(updates);
		});
		
		var options = {
				url : jQuery.contextPath + "/path/dynamicScreen/dynamicScreenMainAction_submitDynamicScreenForm",
				type : 'post',
				dataType: 'json',
				data:{'criteria.screenId':  args.screenId},
				success : function(data)
				{
					if (data["_error"] == null
							|| data["_error"] == "undefined")
					{
						var srcURL = jQuery.contextPath+"/path/dynamicScreen/dynamicScreenMainAction_fillDynamicFormAfterGridLoad?";
						var curParams = "criteria.screenId="+args.screenId+"&_pageRef="+ _pageRef;
					
						$.ajax({
							url : srcURL,
							dataType : "html",
							type : "POST",
							data : curParams,
							success : function(data)
							{
								$("#dyn_div_"+args.formId).html(data);
								if($("#dynamicScreen_"+ dynScreenId +"_Grid_"+ _pageRef).val()!=null && $("#dynamicScreen_"+ dynScreenId +"_Grid_"+ _pageRef).val()!=undefined)
								{
									$("#dynamicScreen_"+ dynScreenId +"_Grid_"+ _pageRef).trigger("reloadGrid");								
								}

								_showProgressBar(false);
								_showErrorMsg(record_saved_Successfully_key, info_msg_title);
							}
						});
					}
					else
					{
						_showProgressBar(false);					
					}
		
				}
			};
			
			$("#" + args.formId).ajaxSubmit(options);
	}
}

function dynamicScreenOnBtnDelete(formId, screenId)
{
		_showConfirmMsg(
				Confirm_Delete_Process_key, confirm_msg_title, dynamicScreenOnBtnDelete_confirm, {
			formId : formId,
			screenId : screenId
		});
}

function dynamicScreenOnBtnDelete_confirm(confirm, args)
{
	if (confirm)
	{
		_showProgressBar(true);

		var theForm = $("#" + args.formId).serializeForm();
		theForm = theForm + '&criteria.screenId=' + args.screenId;
		
		_showProgressBar(false);
		
		$.ajax({
			url : jQuery.contextPath
					+ "/path/dynamicScreen/dynamicScreenMainAction_deleteDynamicScreenForm",
			dataType : "json",
			type : "post",
			data : theForm,
			success : function(data)
			{
				if (data["_error"] == null
						|| data["_error"] == "undefined")
				{
					var srcURL = jQuery.contextPath+"/path/dynamicScreen/dynamicScreenMainAction_fillDynamicFormAfterGridLoad?";
					var curParams = "criteria.screenId="+args.screenId+"&_pageRef="+ _pageRef;
				
					$.ajax({
						url : srcURL,
						dataType : "html",
						type : "POST",
						data : curParams,
						success : function(data)
						{
							$("#dyn_div_"+args.formId).html(data);
							if($("#dynamicScreen_"+ dynScreenId +"_Grid_"+ _pageRef).val()!=null && $("#dynamicScreen_"+ dynScreenId +"_Grid_"+ _pageRef).val()!=undefined)
							{
								$("#dynamicScreen_"+ dynScreenId +"_Grid_"+ _pageRef).trigger("reloadGrid");								
							}

							_showProgressBar(false);
							_showErrorMsg(record_was_Deleted_Successfully_key, info_msg_title);

						}
					});
				}
				else
				{
					_showProgressBar(false);					
				}
	
			}
		});
	}
}
//function to set only the label as required in case no "for" attribute is defined.
function setLabelReq(labelId, required)
{
	if(required =="true")
		{
		var $label = $("#"+labelId); 
		$label.addClass("required");
		if($label.find("span.required").length == 0)
			$label.html($label.html()+"<span class='required'>*</span>")
		}
}


function dynamicScreen_downloadDynFile(formId, screenId, dynFileId,fileName)
{
	//check if record is selected based on hidden_cu input
	if($("#"+formId+"_hidden_cuId").val()=="C"){
    	_showErrorMsg(msg_noRecordSelectedLabel);
		return;
	}
	
	//retrieve primary key from selected record
	var $table = $("#dynamicScreen_"+screenId+"_Grid_"+ _pageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var myObject = $table.jqGrid('getRowData', selectedRowId);
	var params = {};
	
	// get the selected rowId , if there is grid take the primary key from the column primary key in the grid
	//else take all the inputs that are linked to the table
	if(myObject.PRIMARY_COL == undefined || myObject.PRIMARY_COL == null) 
	{
		primaryKeyArr =  $('[name^="scrElemHm."]');
		
		for (var i = 0; i<primaryKeyArr.length; i ++) 
		{
			params[primaryKeyArr[i].name] = primaryKeyArr[i].value;
		}
	} 
	else 
	{
		var primaryKeyArr = myObject.PRIMARY_COL.split(',');
		
		for (var i = 0; i<primaryKeyArr.length; i ++)
		{
			params["scrElemHm."+primaryKeyArr[i]]= myObject[primaryKeyArr[i]];
		}
		
	}

	// save file in DB
	var exportUrl = jQuery.contextPath+"/path/dynamicScreen/dynamicScreenMainAction_downloadDynFile";
	var dataParams = {};
	var fileNameAttr = $("#"+dynFileId).attr("name");
	params[fileNameAttr]= "";
	params["criteria.screenId"] = screenId;
	params["criteria.labelFor"] = fileName;

	_showProgressBar(true);
	$.fileDownload(exportUrl, {
        successCallback: function (url) {
			_showProgressBar(false);		
        },
        failCallback: function (responseHtml, url) {
        	_showErrorMsg(No_Data_Found_key);
	    	_showProgressBar(false);
        },
        data:params
    });

}



function switchInputTA(elementId,cssStyle,onlyArabic,dir)
{
	var regex = new RegExp('\\brtl\\b');
	if(cssStyle.search(regex) != -1 && onlyArabic != "true" && dir != "rtl")
	{
		switchInput(elementId)
	}	
}
/**
 * called at construction of text and textArea in case it contains the attribute onlyArabic or style direction rtl 
 * in case if the active X is installed , the browser is IE and the attribute is onlyArabic then the keyboardlanguage will be switched to arabic
 * in case the active X is not installed or the browser is not IE but the attribute is onlyarabic then the old behavior will takes place arabicCharOnly(event)
 * in case the style direction is rtl then it will take place only if the browser is IE and the active x is installed.
 * @param elementId
 * @param fromDirRTL
 * @returns
 */
function switchInput(elementId,fromDirRTL,cssStyle)
{
	var regex = new RegExp('\\brtl\\b');
	if(cssStyle==undefined ||cssStyle==null ||cssStyle.search(regex) != -1)
	{
		LoadLangSetter();
		if(PathInptLang!=null)
		{
			$('#'+elementId).css("direction","rtl");
			$('#'+elementId).bind('focus',function(){changeInptToArab()});
			$('#'+elementId).bind('blur',function(){resetInptLang()});
		}else if(fromDirRTL)
		{
			$('#'+elementId).css("direction","rtl");
			$('#'+elementId).bind('keydown',function(event){arabicCharOnly(event)});
		}
	}
}
/**
 * change the keyboard langauge to arabic
 * @returns
 */
function changeInptToArab()
{
	try
	{
		PathInptLang.setInputLang();
	}
	catch(e){}
}
/**
 * reset the default language 
 * @returns
 */
function resetInptLang()
{
	try
	{
		PathInptLang.resetInptLang();
	}
	catch(e){}
}

var PathInptLang = null;
/**
 * load the active X if it is installed and not loaded before.
 * @returns
 */
function LoadLangSetter()
{
	try
	{
		if(PathInptLang==null)
		{
			PathInptLang = new ActiveXObject("PathLanguageCtrl.LangSetter");
		}
	}
	catch(e){}
}

function dynamicScreen_deleteDynGridRecord(gridId)
{
	var dynTableGrid = $("#"+gridId); 
	var selectedRowId = dynTableGrid.jqGrid('getGridParam', 'selrow');
	dynTableGrid.jqGrid('deleteGridRow',selectedRowId);
}

function dynamicScreen_addDynGridRecord(gridId)
{
	var dynTableGrid = $("#"+gridId); 
	var rowData = {};
	var rowId   = dynTableGrid.jqGrid("addInlineRow",rowData);
}
function dynamicScreen_onSelectDynGridRecord(gridId)
{
	var dynTableGrid = $("#" + gridId);
	var selectedRowId = dynTableGrid.jqGrid('getGridParam', 'selrow');

	if (selectedRowId.substring(0, 3) !== "new")
	{
		var myObject = dynTableGrid.jqGrid('getRowData', selectedRowId);

		// get the selected rowId
		var primaryKeyArr = myObject.PRIMARY_COL.split(',');

		for (var i = 0; i < primaryKeyArr.length; i++)
		{
			dynTableGrid.jqGrid('setCellReadOnly', selectedRowId, primaryKeyArr[i], "true");
		}
	}
}
/**
 * PathSolutions [Libin] returnMaxHeight function - Method to take the preferred Dialog height,check it against Window height and return the appropriate height
 * @param {number} dialogHeight      : preferred Height
 */
function returnMaxHeight(dialogHeight)
{
	var height = $(window).height();
	
	if (dialogHeight > height)
		return height - 10;
	else 
		return dialogHeight;
}
/**
 * PathSolutions [Libin] returnMaxWidth function - Method to take the preferred Dialog width,check it against Window width and return the appropriate width
 * @param {number} dialogWidth      : preferred Width
 */
function returnMaxWidth(dialogWidth)
{
	var width = $(window).width();
	
	if (dialogWidth > width)
		return width - 10;
	else 
		return dialogWidth;
}