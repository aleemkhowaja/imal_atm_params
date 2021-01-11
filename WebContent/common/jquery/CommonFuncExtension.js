$(document).ready(function()
{
	//called once postMessage is sent from external screen upon change of element
	$.receiveMessage(function(e)
	{
		if(!e.data.chromeExt)
		{
			//If chromeExt is true then do nothing, skip checking on the arguments called by postMessage
			//and continue to communicate with the chrome extension
			if(e.data.indexOf("iframeEltChanged") > -1)
			{
				var iframeId = e.data.substring(e.data.indexOf("=")+1)
				iframeId = iframeId.replace("extScreenFrame_","extScreenFrameId_");
				$.data(document.getElementById(iframeId),"iframeEltChanged",true);
			}
			else if(e.data.indexOf("showErrorMsg") > -1 || e.data.indexOf("showConfirmMsg") > -1)
			{
				var optString = decodeURIComponent(e.data.substring(e.data.indexOf("=")+1));
				var optObj = JSON.parse(optString);
				return new $.msgbox(optObj).show();
			}
			else if(e.data.indexOf("confirmCallBack") > -1)//calling the confirm callback function
			{
				var optString = decodeURIComponent(e.data);
				var tmpOptString = optString.substring(0, optString.indexOf("confirmArgs"))
				var confirmArgs = optString.substring(optString.indexOf("confirmArgs")); 
				var optObjArr = tmpOptString.split("&");
				var fnName = optObjArr[0].substring(optObjArr[0].indexOf("=")+1)
				var confirmVal = optObjArr[1].substring(optObjArr[1].indexOf("=")+1)
				var args = confirmArgs.substring(confirmArgs.indexOf("=")+1)
				var fnToCall = fnName + "("+confirmVal+","+args+")"
				eval(fnToCall )
			}
			else if(e.data.indexOf("closeExtFrmDlg") > -1)//closing frame dialog 
			{
				var optString = decodeURIComponent(e.data);
				var optObjArr = optString.split("&");
				var frameName = optObjArr[0].substring(optObjArr[0].indexOf("=")+1)
				var disableIframeEltChanged = optObjArr[1].substring(optObjArr[1].indexOf("=")+1)
				
				if(disableIframeEltChanged != undefined && disableIframeEltChanged != null && ( disableIframeEltChanged == true || disableIframeEltChanged == "true" ))
				{
					var frameId = $("iframe[name='"+frameName+"']").attr('id');
					$.data(document.getElementById(frameId),"iframeEltChanged", false);
				}
		
				var $dlgObj = $($("iframe[name='"+frameName+"']").closest("div"));//get the parent dialog div to close
				if($dlgObj.html() != null)
				{
					$dlgObj.dialog("close");
				}
			}
		}
	})
	
	//clicking anywhere should close description popups
	$("body").click(function()
	{
		$(".path-description").each(function(i)
		{
			$(this).removeClass("path-description");
			$(this).hide();
		})
	})
	
	setTextareaMaxlength();
	
})

// To show the memo lookup...
showMemo = (function(theParams){
	_showProgressBar(true);
	var	memoScreenDiv = $("<div id='memoDiv_"+_pageRef+"' class='path-common-sceen'/>");
	memoScreenDiv.css("padding","0");
	memoScreenDiv.insertAfter($('body'));
    var memoDialogOpt = { 
                      title:(typeof view_Memo_key === "undefined")?"View Memo" :view_Memo_key,
                      autoOpen:false,
                      scrolling:false,
                      close: function (){
				                   var theDialog = $(this);
				                   theDialog.remove();
							    }};
    var memoSrcUrl = jQuery.contextPath+"/path/memo/MemoGrid_loadDef";
    $("#memoDiv_"+_pageRef).load(memoSrcUrl, theParams, function() {
    	$('#cb_memoGrid').focus();
    	$("#memoDiv_"+_pageRef).parents('div.ui-dialog').show();
    	$("#memoDiv_"+_pageRef).dialog("option", "position", "center");
    	$("#memoDiv_"+_pageRef).dialog("option", "width", returnMaxWidth(750));
    	$("#memoDiv_"+_pageRef).dialog("option", "height", returnMaxHeight(300));
    	$("#memoDiv_"+_pageRef).dialog("option", "modal", true).dialog('open');
    	_showProgressBar(false);
        });
    $("#memoDiv_"+_pageRef).dialog(memoDialogOpt);
});


setTextareaMaxlength = (function()
{
	   // Get all textareas that have a maxlength attribute already in screen and the ones added using jQuery-scripting
	    $('textarea[maxlength]').live('keyup blur', function() {
	        // Store the maxlength and value of the field.
	        var maxlength = $(this).attr('maxlength');
	        /**
	         * [MarwanMaddah]: Added the replace management, 
	         * to avoid the difference in the content length when using the Enter key 
	         * in this case the length will be plus 1 for every "Enter"
	         * because in jquery library they are doing the same below replacement
	         */
	        var val = $(this).val().replace(/\r?\n/g,"\r\n");
	        // Trim the field if it has content over the maxlength.
	        if (val.length > maxlength) {
	            $(this).val(val.slice(0, maxlength));
	        }
	    });
})

/**
 * set the contents of given Elment Id to be Readonly, for Elements that are not hidden, and make again not readonly for element that are set readonly previusly
 * @param {Object} startDivId
 * @param {Object} readonly
 */
function makeReadonlyContents(startDivId, readonly)
{
	var isReadOnly = false;
	if(readonly)
	{
		isReadOnly = true;
	}
	var inputsToFind = "input.ui-state-focus[type='text'],input.path-dummy-cls[type='checkbox'], button.ui-button ,input.path-dummy-cls[type='radio'], textarea.ui-state-focus, select.ui-state-focus";
	if(!isReadOnly)
	{
		inputsToFind = ".path-set-read-only";
	}
	var allInp = $("#"+startDivId).find(inputsToFind);
	var applyReadOnly ;
	allInp.each(function(i)
	{
		var theElement =  $(this);
		
		// if the Element not Hidden
		if(theElement.css("display") !== "none")
		{
			applyReadOnly = true;
			var currReadOnly;
			/**
			 * [MarwanMaddah]: added to cover the cases where the element use disabled attribute instead of readOnly. 
			 */
			if(theElement.is("select") || theElement.is(":checkbox") || theElement.is(":radio"))
			{
				currReadOnly = theElement.attr("disabled");
			}
			else
			{
				currReadOnly = theElement.attr("readonly");
			}
			// if already read Only then not to apply
			if(currReadOnly != undefined && currReadOnly!=null && readonly)
			{
				applyReadOnly = false;
			}
			 
			if(applyReadOnly)
			{
				makeElementReadonly(theElement.attr("id"), readonly);
				if(readonly)
				{
					theElement.addClass("path-set-read-only");
				}
				else
				{
					theElement.removeClass("path-set-read-only");
				}
			}
		}
	});
}

function arrangeGridDependency(theDependcy,colName,gridId)
{
	var colNamePart = ":" + colName;
	var sameElmDepExist = false; // variable to indicate that dependency on same element being changed exist
	var nameIdPartIndx = theDependcy.indexOf(colNamePart);
	if(nameIdPartIndx < 0)
		nameIdPartIndx = theDependcy.indexOf(colNamePart+"_lookuptxt_"+gridId); //checking if livesearch
	if(nameIdPartIndx > -1)
	{
		var comaIndex = theDependcy.indexOf(","); 
		if(comaIndex > -1) //several elements in dependency 
		{
			if(nameIdPartIndx > comaIndex && theDependcy.indexOf(",",nameIdPartIndx) > -1)
			{
				temp1 = theDependcy.substring(0,theDependcy.indexOf(",",nameIdPartIndx))//make element last one in temp
				temp = temp1.substring(temp1.lastIndexOf(","))
				theDependcy = theDependcy.replace(temp,"");
				temp = temp.replace(",","");
				theDependcy = temp+"," +theDependcy ;
			}
			else if(theDependcy.indexOf(",",nameIdPartIndx) < 0)//last element
			{
				var temp = theDependcy.substring(theDependcy.lastIndexOf(","))
				theDependcy = theDependcy.replace(temp,"");
				temp = temp.replace(",","");
				theDependcy = temp +","+ theDependcy ; 
			}
		}
		sameElmDepExist = true;
	}
	
	return {depsrc:theDependcy,depExst: sameElmDepExist};
}

/**
 * checks for a grid cell min/max values if they exists and shows message when test fails and reverts back to old value
 * @param {Object} gridId, grid ID 
 * @param {Object} rowid, row id
 * @param {Object} colName, column name
 * @memberOf {TypeName} 
 * @return {TypeName} returns true in case test passes false otherwise (used in dependency to prevent server call in case of false) 
 */
function checkGridColMinMax(gridId, rowid, colName)
{
	var $elt = $("#"+gridId).jqGrid("getCellInputElt",rowid, colName);
	var eltValue = $elt.val();
	var _colModel = $("#"+gridId).jqGrid('getGridParam','colModel');
	var callDep = true;
	$(_colModel).each(function(i)
	{
		if(this.name == colName && (this.colType == "number" || (this.colType == "liveSearch" && this.mode=="number")))
		{
			var minValue = (typeof this.minValue != "undefined" ) ? this.minValue: false ;
			var maxValue = (typeof this.maxValue != "undefined" ) ? this.maxValue: false ;
			//Add checking on number since if value is zero then the object evaluates to false
			if(!isNaN(minValue) && eltValue != null && eltValue != undefined && eltValue != "undefined" && eltValue != "")
			{
				callDep = checkMinVal(minValue, eltValue);		
			}
			if(callDep && maxValue)
			{
				callDep = checkMaxVal(maxValue, eltValue,true,$elt);
			}
			if(!callDep)
			{
				//revert input value to old value in case min/max value check fails
				$elt.val($.trim($elt.attr("prevValue")))
				return;	
			}
			return ;
		}
	});
	return callDep;
}


callGridDependency = (function(gridId,dependency, dependencySrc,parameter,rowid,afterDepEvent,currColName, gridCell,triggerSaveRow,aftersavefunc )
{
		var elementId = "" ;
		if(typeof currColName != "undefined" && currColName != "" && currColName != null)
		{
			if(!checkGridColMinMax(gridId,rowid,currColName))
				return;
		
			elementId = rowid + "_" + currColName; //gridcolumn input Id 
			if(typeof document.getElementById( elementId ) == "undefined" 
					 || document.getElementById( elementId ) == null)
					elementId = rowid + "_"+ currColName+ "_spanLookup"+ "_"+gridId; //livesearch
			_showProgressIcon(true,elementId);  
		}
		
		//This is done for Bandwidth Utilization BMOUPI170660, to minimize the JSP/HTML response Contents
		parameter = checkParameterHaveJSVariable(parameter);
		
		paramArr = parameter.split(",");
		params = {};
		var currColValue;
		var _colModel = $("#"+gridId).jqGrid('getGridParam','colModel');
		for(var i=0; i<paramArr.length; i++ )
		{
			if(paramArr[i].indexOf(":") > 0)
			{
				propIdArr = paramArr[i].split(":");
				propName = propIdArr[0] ;
				eltId =  rowid + "_" + propIdArr[1];
				propId = propIdArr[1];
			}
			else
			{
				propName = propId = paramArr[i];
				eltId =  rowid + "_" + paramArr[i];
			}
			var _isColumn = false;
			var paramColName = propId;
			if(paramColName.indexOf("_lookuptxt") > 0)//livesearch column 
				paramColName = paramColName.substring(0,paramColName.indexOf("_lookuptxt") );
			//check if column and if has format
			
			var isNum = false;
			$(_colModel).each(function(i)
			{
				if(this.name == paramColName )
				{
					_isColumn = true;
					if(this.colType == "number")
						isNum = true;
					return false;	
				}
				
			});
			
			if (_isColumn)//grid cell editable/non editable 
			{
				params[propName] = $("#"+gridId).jqGrid("getCell",rowid, paramColName) ;
			}
			else
			{
				// in case we have subgrid and the param is from the super grid. so we have to get the super table id and super table row id that had been added on the construction of subGridExpanded
				var tableId = $("#"+gridId).attr("parentTableId");
				var rowId = $("#"+gridId).attr("parentRowId");
				var cellVal;
				if(tableId && rowId)
				{
					cellVal = $("#"+tableId).jqGrid("getCell",rowId, paramColName);
				}
				params[propName] = (cellVal === false ||  cellVal === null || typeof cellVal == "undefined")?returnHtmlEltValue(propId):cellVal;
			}

			//setting currColValue
			if(propId == currColName || propId == currColName+"_lookuptxt" )
			{
				currColValue = params[propName];
			}
		}
	    var isToReverOldValue = false;
		$.postJSON(dependencySrc, params, function( data, status, xhr ) 
		{
			//This is done for Bandwidth Utilization BMOUPI170660, to minimize the JSP/HTML response Contents
			dependency = checkParameterHaveJSVariable(dependency);
			
			var depArrResult = arrangeGridDependency(dependency,currColName,gridId);
			var arrangedDependency = depArrResult.depsrc;
		    var depOnSameElemExst = depArrResult.depExst;
		    
		    var dependArr = arrangedDependency.split(",");
		    var eltIsColumn = false;
			for(var j=0;j<dependArr.length; j++)
			{
				nameArr = dependArr[j].split(":");
				if(nameArr.length < 2) //only html property defined, return since should specify property name in action
				{
					_showErrorMsg("Dev: Error in Dependency Attribute Specification of "+currColName+" for Dependency Attribute :"+dependency);				
					return;
				}
				eltIsColumn = false;
                voProp = nameArr[0] ;	//property name in action for this grid column
				gridColumn = nameArr[1]; //gridColumn name or html id of for element
				var gridColName = (gridColumn.indexOf("_lookuptxt") > 0) ? gridColumn.substring(0, gridColumn.indexOf("_lookuptxt")) : gridColumn ;  
				var depColNbFormat = null, depColLeadZeros = null, depColApplyRounding = false;
				$(_colModel).each(function(i){
					if (this.name === gridColName )
					{
						eltIsColumn = true;
						if( typeof this.nbFormat != "undefined" && this.colType=="number") 
						{
							depColNbFormat = this.nbFormat;
							depColLeadZeros = (typeof this.leadZeros != "undefined")? this.leadZeros : "";
							depColApplyRounding= (typeof this.applyRounding != "undefined")? this.applyRounding : false;
							return false;
						}
					}
				})
				
                var readonlyVal="";
                dataValue = "";
                /****************************************************************/
				voPropArr = voProp.split(".");
				var tempData = data;
				for (var i = 0; i < voPropArr.length; i++ ) 
				{
				    var x = voPropArr[i];  
				    if(typeof tempData[x] != "undefined" && tempData[x] != null)
			    	{
			    		dataValue = tempData[x];  
			    		tempData = tempData[x];
			    	}
				    else
			    	{
			    		dataValue = "";
			    		break;
			    	}
				}
				if(depColNbFormat != null)
				{
					dataValue =$.formatNumberNumeric( dataValue, {format: depColNbFormat ,leadZeros:depColLeadZeros, applyRounding : depColApplyRounding}); 
				}
				if(nameArr.length > 2)
				{
                	readonlyProp = nameArr[2]; //property name of the readonly flag
					readonlyPropArr = readonlyProp.split(".")
					tempData = data;
					for (var i = 0; i < readonlyPropArr.length; i++ )
					{
					    var x = readonlyPropArr[i];  
					    if(typeof tempData[x] != "undefined" && tempData[x] != null)
				    	{
				    		readonlyVal = tempData[x]    
				    		tempData = tempData[x];
				    	}
					    else
				    	{
				    		readonlyVal = false;
				    		break;
				    	}
					}
				}
                /****************************************************************/
				//j==0 means the first element in dependency should be the one which being changed 
				//(done by arrangeGridDepndeny above) and it is exists
				// check if the same sent parameter is not Empty (means user do not want explicitly to empty it)
				 // check if old values restore not disabled
				if(j == 0 && depOnSameElemExst && dataValue === "" && currColValue != ""
					&& (data["_disRevertOldVal"] == null || data["_disRevertOldVal"] !== "true"))
					{
						isToReverOldValue = true;
						_savedRow = $("#"+gridId)[0].p.savedRow;
						selRowId  = $("#"+gridId)[0].p.selrow;
						if(typeof _savedRow == "undefined" || (_savedRow.length > 0 && typeof _savedRow[0].id == "undefined")) //row was not yet saved, get prevValue directly from input
						{
							$elt = $("#"+gridId).jqGrid("getCellInputElt",rowid, currColName);
							if(typeof $elt == "undefined" || typeof $elt.attr("prevValue") == "undefined")
								dataValue = "";
							else
								dataValue = $elt.attr("prevValue");
						}
						else if(_savedRow[0].id == selRowId )
						{
							/**
							 * [MarwanMaddah]
							 * changes have been made to cover the cases
							 * where there is a record not save, so the prevValue should be taken from the input
							 * _saveRow not undefined but we have to get the prevValue from the input.
							 * this issue reproduced, when using the TAB to move between elements
							 */
							$elt = $("#"+gridId).jqGrid("getCellInputElt",rowid, currColName);
							if(typeof $elt == "undefined" || typeof $elt.attr("prevValue") == "undefined")
                            {
								//workaround because we cannot access a property from json object if it contains . in it
								//example_savedRow["ctsTrsBenefDetVO.COMP_CODE"]; //not working used substring instead
								var tempJsonString = JSON.stringify(_savedRow);
								if(tempJsonString.length > 2)
								{
									tempJsonString = tempJsonString.replace("[","");
									tempJsonString = tempJsonString.replace("]","");
									var finalJsonObj = eval( '(' + tempJsonString + ')');
									dataValue = finalJsonObj[currColName];
								}
								else //empty row
								{
									dataValue = "";
								}
                            } 
							else
								dataValue = $elt.attr("prevValue");
						}
					}
					if(eltIsColumn)
						$("#"+gridId).jqGrid("setCellValue",rowid, gridColumn, dataValue, readonlyVal);
					else
						setInputValue(gridColumn,dataValue);
						
					if(isToReverOldValue)
						break;
			}
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
					_showErrorMsg(data["_dependencyMsg"],error_msg_title)
				}
				
			}
			//reset number currency formatters if they exist
			resetNumberFormatters(gridId, rowid)
			
			// call after dependency event if exists
			if(typeof afterDepEvent != "undefined" && afterDepEvent != "" && ( (!isToReverOldValue && data["_error"] == null) || data["_forceAfterDepEvent"] === "true"))
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
	}).complete(function(){
			if(elementId != "")
				_showProgressIcon(false,elementId);  
			if(typeof gridCell != "undefined")
				$.data(gridCell,"toCallDepChange",false);
			
			var $t = $("#"+gridId);
			if(typeof triggerSaveRow != "undefined" && triggerSaveRow == true)
			{
				if(aftersavefunc != null)
					$t.jqGrid("saveRow",rowid,false, 'clientArray',null,aftersavefunc);
				else
					$t.jqGrid('saveRow',rowid,false, 'clientArray');
			}
			if(!isToReverOldValue)//when value is not reverted and change was successfully done then set row attribute to changed
			{
				var ind = $t.jqGrid("getInd",rowid,true);
				var $ind = $(ind);
				if( $ind.attr("added") != "1" && $ind.attr("changed") != "1")
				{
					$ind.attr("changed","1");
				}
			}
		}); 
});



function resetNumberFormatters(gridId, rowid)
{
	var _colModel = $("#"+gridId).jqGrid('getGridParam','colModel');
	//reset number currency formatters if they exist
	$(_colModel).each(function(i){
		if (this.colType=="number" && typeof this.formatter != "undefined" && $.isFunction( this.formatter )) 
		{
			var _dataValue = $("#"+gridId).jqGrid('getCell',rowid,this.name);
			var _opt = {};
			_opt["colModel"] = _colModel[i];
			_opt["rowId"] = rowid
			_opt["gid"] = gridId; 
			 this.formatter.call($("#"+gridId),_dataValue, _opt, {})
		}
	})
}

/**
 * creates the input + button that will open the dialog for colType='dialog' on edit/add
 * @param {Object} value, current value of the cell 
 * @param {Object} options, edit options
 * @param {Object} tblId, grid Id
 * @return {TypeName} 
 */
myelem = (function (value, options,tblId) {
 var dlgID = "gridDialog_"+options["id"]+"_"+tblId; 
 if ($("#"+dlgID).html() == null)
 {
		$("body").append("<div id='"+dlgID+"'></div>");
 }
 myrowId_ = options["id"].substring(0,options["id"].lastIndexOf("_"+options["name"]));
var _inputId = options["id"]; //rowid_colname
 colName = options["name"];
 
  el = $("<table><tr><td class='ui-custom-lookup-td'><input type='text' value='"+value+"' mode='dialog' id='inpt"+_inputId+"' style='width:100%'/></td><td class='ui-custom-lookup-td'><a id='a_inpt"+_inputId+"' class='ui-custom-lookup-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary' onclick='openDialog(\""+myrowId_ +"\",\""+colName+"\",\""+tblId+"\",this)' role='button'><span class='ui-button-icon-primary ui-icon ui-icon-search'/><span class='ui-button-text'/></a></td></tr></table>")
  return el;
});

/**
 * returns the value set in dialog column
 * @param {Object} elem, current html element in the cell, in our case the input
 * @param {Object} operation, get/set	
 * @param {Object} value, value of the input
 * @return {TypeName} 
 */
myvalue = (function (elem, operation, value) {
	if(operation === 'get') {
    	return value;
       }
});

/***
 * opens the grid column dialog on click
 * @param {Object} myrowId, row id of the selected row
 * @param {Object} colName, column name hosting the dialog to be opened
 * @param {Object} tblId, grid Id
 * @return {TypeName} 
 */
openDialog = (function (myrowId,colName,tblId,linkObj)
{
	if(typeof linkObj != "undefined" && $(linkObj).hasClass("ui-state-disabled"))
		return;
	var rowContent = {};
	var _colModel = $("#"+tblId).jqGrid('getGridParam','colModel');
	var _cellName,_cellVal,_eltId;
	for(var i=0; i<_colModel.length; i++)
	{
		_cellName = _colModel[i].name
		_eltId = myrowId + '_' + _cellName;
		if(document.getElementById(_eltId ) != null && typeof document.getElementById(_eltId ) != "undefined")
		{
			_cellVal = document.getElementById(_eltId ).value;
		}
		else if(document.getElementById(_eltId + "_lookuptxt_"+tblId) != null && typeof document.getElementById(_eltId + "_lookuptxt_"+tblId) != "undefined")
		{
			_cellVal = document.getElementById(_eltId +"_lookuptxt_"+tblId).value;
		}
		else
		{
			_cellVal =$("#"+tblId).jqGrid("getCell",myrowId, _cellName); 
		}
    	rowContent[_cellName] = _cellVal;
	}
	var dialogOptions = { autoOpen: false, height:300, width:250 ,modal: true};
	var colProp = $("#"+tblId).jqGrid('getColProp',colName)
	
	if(colProp["dialogOptions"] != null && typeof colProp["dialogOptions"] != "undefined" &&
			colProp["dialogUrl"] != null && typeof colProp["dialogUrl"] != "undefined")
	{
		dialogOptions = colProp["dialogOptions"];
		dialogUrl =  colProp["dialogUrl"]
	}
	else
	{
		return;
	}
	/**
	 * [MarwanMaddah]:Used in case of GridColumn with type='dialog'
	 * in case there is paramList defined
	 */
	var finalRowContent = rowContent;
	if(colProp["paramList"] != null && typeof colProp["paramList"] != "undefined" && colProp["paramList"] != "")
	{
	    finalRowContent = returnParamListValues(colProp["paramList"],rowContent);
	}
	
	url = dialogUrl;
	
	if(url.indexOf(jQuery.contextPath) < 0 )
		url = jQuery.contextPath+  url;

	 var dlgID = "gridDialog_"+myrowId+"_"+colName+"_"+tblId 
	 var $dlg = $(document.getElementById(dlgID))
	 if ($dlg.html() == null)
	 {
			$("body").append("<div id='"+dlgID+"'></div>");
	 }
	 $dlg = $(document.getElementById(dlgID));
	$dlg.load(url, finalRowContent ); //loading content after dialog opened to adjust sizes to their parents (in case of grid)
	$dlg.dialog(dialogOptions)
	$dlg.dialog('open');
           
});


/**
 * Function getting the Combo list in json format
 * @param zUrl
 * @param zList
 * @param zId
 * @param zValue
 * @return
 */
 function loadCombo(zUrl, zList, zId, zValue) {
	var list = {};
	$.ajax( {
		url : zUrl,
		async : false,
		dataType : 'json',
		success : function(data) {
			 data = JSON.parse(JSON.stringify(data[zList]));
             for(var i=0; i<data.length; i++)
              {
                    var key = data[i][zId];
                    if(typeof key == "undefined") //no id for select box
                    	key = "";
                    var value = data[i][zValue]
                    list[key] = value;
              }
		}
	});
	return list;
}

/**
 * creates the livesearch that will open the lookup for colType='liveData' on edit/add
 * @param {Object} value, current value of the cell 
 * @param {Object} options, edit options
 * @param {Object} tblId, grid Id
 * @return {TypeName} 
 */ 
 liveElem = (function (value, options,tblId) {
	 
  // import Livesearch js library in case not imported before.
  $.struts2_jquery.require( "LiveSearch.js",null,jQuery.contextPath +"/common/jquery/"); 	 
  var _myrowId = options["id"];
  var colName = options["name"];
  var _lookupId = _myrowId
  var lookupDiv = "lookupdiv_" + colName+ "_"+tblId;
  var _lookupTxt = _myrowId + "_lookuptxt"+ "_"+tblId;  
  var _spanLookup = _myrowId + "_spanLookup"+ "_"+tblId;
  var overlay = "overlay_" + _myrowId+ "_"+tblId;
  var gridtab = "gridtab_" + _myrowId+ "_"+tblId;
  if(gridtab.indexOf(".") > -1 ) //removing dot caused problems in showing search dialog box
	  gridtab = gridtab.replace(".","_")
  var pagerid = "pagerid_" + _myrowId+ "_"+tblId;
  while(pagerid.indexOf(".") > -1)
	  pagerid = pagerid.replace(".",""); //the . in the names does not work for pager construction, problem with jqgrid

  var dynHdKeyId = _myrowId + "_lookuphiddenkey"+ "_"+tblId;
  var colProp = $("#"+tblId).jqGrid('getColProp',colName);
  var dataAction = colProp["dataAction"];
  var autoSearch = "false";//colProp["autoSearch"];
  var searchElement = colProp["searchElement"];
  var onOkMethod = (typeof colProp["onOkMethod"] == "undefined") ? '' : colProp["onOkMethod"];
  onOkMethod = onOkMethod.replace(/'/g, "\\'");
  onOkMethod = onOkMethod.replace(/"/g, '\\"');
  var paramList = (typeof colProp["paramList"] == "undefined") ? '' : colProp["paramList"]; /**************************************/
  var dynHdResultId = (typeof colProp["resultList"] == "undefined") ? '' :  colProp["resultList"] ;
  var dependencyValue = (typeof colProp["dependency"] == "undefined") ? '' : colProp["dependency"] ;
  var dependencySrcValue = (typeof colProp["dependencySrc"] == "undefined") ? '' : colProp["dependencySrc"];
  var parameterValue = (typeof colProp["params"] == "undefined") ? '' : colProp["params"];
  var afterDepEvent = (typeof colProp["afterDepEvent"]== "undefined") ? '' : colProp["afterDepEvent"];
  var modeValue = (typeof colProp["mode"]== "undefined") ? '' : colProp["mode"];
  var _leadZeros = (typeof colProp["leadZeros"]== "undefined") ? '' : colProp["leadZeros"];
  var minValue = (typeof colProp["minValue"]== "undefined") ? '' : colProp["minValue"];
  var maxValue = (typeof colProp["maxValue"]== "undefined") ? '' : colProp["maxValue"];
  var nbFormat = (modeValue !== "") ? (typeof colProp["nbFormat"]== "undefined" ? '#' : colProp["nbFormat"]) : '';
  var beforeDepEvent = (typeof colProp["beforeDepEvent"]== "undefined") ? '' : colProp["beforeDepEvent"];
  var reConstruct = (typeof colProp["reConstruct"]== "undefined") ? 'false' : colProp["reConstruct"];
  var cssStyle = (typeof colProp["cssStyle"]== "undefined") ? '' : colProp["cssStyle"];
  var multiSelect = (typeof colProp["multiSelect"]== "undefined") ? 'false' : colProp["multiSelect"];
  //TP 887297 dont Load Data for livesearch feature
  var dontLoadData = (typeof colProp["dontLoadData"]== "undefined") ? 'false' : colProp["dontLoadData"];
  var _autoId = _myrowId.substr(0,_myrowId.indexOf("_"+colName));
  var multiResultInput = (typeof colProp["multiResultInput"]== "undefined") ? '' : _autoId+"_"+colProp["multiResultInput"];
  var selectColumn = (typeof colProp["selectColumn"]== "undefined") ? '' : colProp["selectColumn"];
  /*
   * Chris: the var readOnlyModeValue is used to set the lookUp grid readOnly mode state based on recReadOnly and readOnlyMode(liveSearch property)
   */
  // TP #935078 - System is not allowing to edit link document details in Update After Approve Screen
  // Remove recReadOnly since already checked in class(PathGridColumn.java)
  var readOnlyMode = (typeof colProp["readOnlyMode"]== "undefined") ? '' : colProp["readOnlyMode"];
  var readOnlyModeValue= (typeof colProp["readOnlyModeValue"]== "undefined" && readOnlyMode=="true") ? 'true'  : (typeof colProp["readOnlyModeValue"]== "undefined" && readOnlyMode=="false") ? 'false' : colProp["readOnlyModeValue"];
  /*
   * 
   */
  if(cssStyle != '')
  {
	  cssStyle = "style='" + cssStyle + "'";
  }
  
  
  if(minValue != "")
	  minValue = "minValue='"+minValue+"'";
  if(maxValue != "")
	  maxValue = "maxValue='"+maxValue+"'";
  
  if(afterDepEvent != "")
  	afterDepEvent = afterDepEvent.replace(/'/g,"\"");
  if(beforeDepEvent!= "")
  	beforeDepEvent= beforeDepEvent.replace(/'/g,"\"");
  if(parameterValue != "")
  	parameterValue = parameterValue.replace(/'/g,"\"");
  
  var gridRowId = _myrowId.substring(0, _myrowId.indexOf("_"+colName))
	//options_liveSearch.lookupName = "${parameters.name?html}"  ;
	//options_liveSearch.selectColumn = "${parameters.selectColumn?default('')}"  ;
	//options_liveSearch.multiSelect = "${parameters.multiSelect?default('')}"  ;
	//options_liveSearch.readOnlyModeValue = "${parameters.readOnlyMode?default('')}"  ;
  
  var repColName = colName;
  while(repColName.indexOf(".") > -1)
  	repColName = repColName.replace(".","_");
  
  repColName = repColName + "_"+tblId;
  var elemScriptConstruct = " <script type='text/javascript'>\n"+
 	" var options_liveSearch_"+repColName+" = {};\n"+
	" options_liveSearch_"+repColName+".dynHdKeyId = '"+paramList+"'; \n"+
	" options_liveSearch_"+repColName+".resultList = '"+dynHdResultId+"' ; \n"+
	" options_liveSearch_"+repColName+".lookupId = 'liveSearchTb_"+_lookupId +"' ; \n"+
	" options_liveSearch_"+repColName+".lookupDiv = '"+lookupDiv +"'; \n"+
	" options_liveSearch_"+repColName+".lookupTxt = '"+_lookupTxt +"'; \n"+
	" options_liveSearch_"+repColName+".spanLookup = '"+_spanLookup +"'; \n"+
	" options_liveSearch_"+repColName+".overlay = '"+overlay +"' ; \n"+
	" options_liveSearch_"+repColName+".gridtab = '"+gridtab +"' ; \n"+
	" options_liveSearch_"+repColName+".pagerid = '"+pagerid +"' ; \n"+
	" options_liveSearch_"+repColName+".actionName = '"+dataAction +"'; \n"+
	" options_liveSearch_"+repColName+".onOkMethod = '"+onOkMethod +"'; \n"+
	" options_liveSearch_"+repColName+".searchElement = '"+searchElement +"';\n"+
	" options_liveSearch_"+repColName+".tblCellId = '"+colName +"'; \n"+
	" options_liveSearch_"+repColName+".paramList = '"+paramList +"'; \n"+
	" options_liveSearch_"+repColName+".autoSearch = 'false'; \n"  +
	" options_liveSearch_"+repColName+".dependencyValue = '"+dependencyValue+"'; \n"  +
	" options_liveSearch_"+repColName+".dependencySrcValue = '"+dependencySrcValue+"'; \n"  +
	" options_liveSearch_"+repColName+".parameterValue = '"+parameterValue+"'; \n"  +
	" options_liveSearch_"+repColName+".afterDepEvent = '"+afterDepEvent+"'; \n"  +
	" options_liveSearch_"+repColName+".gridId = '"+tblId+"'; \n"  +
	" options_liveSearch_"+repColName+".gridRowId = '"+gridRowId+"'; \n"  +
	" options_liveSearch_"+repColName+".beforeDepEvent = '"+beforeDepEvent+"'; \n" + 
	" options_liveSearch_"+repColName+".reConstruct = '"+reConstruct+"'; \n" + 
	" options_liveSearch_"+repColName+".multiSelect = '"+multiSelect+"'; \n" + 
	" options_liveSearch_"+repColName+".multiResultInput = '"+multiResultInput+"'; \n" + 
	" options_liveSearch_"+repColName+".selectColumn = '"+selectColumn+"'; \n" + 
	" options_liveSearch_"+repColName+".readOnlyMode = '"+readOnlyMode+"'; \n" +
	" options_liveSearch_"+repColName+".readOnlyModeValue = '"+readOnlyModeValue+"'; \n" +
	" options_liveSearch_"+repColName+".dontLoadData = '"+dontLoadData+"'; \n" +
   	" </script>";


  $("head").append(elemScriptConstruct);
      var elemConstruct = '<table border = "0" id="liveSearchTb_'+_lookupId+'" width="100%" cellspacing="0" cellpadding="0">'+
	    					'<tr>'+
		    					'<td class="liveSearchGridTd">'+ 
		    						'<div id="div_'+_lookupId+'"  class="ui-widget liveSearchLookupIdDiv" >'; 
      /*
       * Chris: _readOnlyAtt attribute is to set the text part of the liveSearch to readOnly in case conditions are met
       */
      var _readOnlyAtt  = "";   
      if(typeof readOnlyModeValue!="undefined" && readOnlyModeValue!=null && readOnlyModeValue =="true" )
      {
    	  _readOnlyAtt = "readOnly='readOnly'";
      }
  
	  elemConstruct += "<input role='livesearch' "+_readOnlyAtt+" type='text' id='"+_lookupTxt+"'  class='liveSearchText liveSearchCompSize ui-widget-content liveSearchInputCorner' name='lookupTxt_"+colName+"' prevValue='"+value+"' value='"+value+"' dependency='"+dependencyValue+"'" +
	  "						dependencySrc='"+dependencySrcValue+"'  params='"+parameterValue+"' afterDepEvent='"+afterDepEvent+"' leadZeros='"+_leadZeros +"'  mode='"+modeValue+"'  nbFormat='"+nbFormat+"' "+minValue+" "+maxValue+" " + cssStyle + "/>" 
		  + "<span id = '"+_spanLookup+"' class='ui-search ui-state-default liveSearchSpanCorner liveSearchSpanSize liveSearchSpanDisplay' "
		  +"onclick=\"return search(options_liveSearch_"+repColName+");\" role='button' tabindex='0'><span class='ui-icon ui-icon-search live-search-ui'></span></span>";

  $(document.getElementById(overlay)).remove();
  $(document.getElementById(pagerid)).remove();
  
  elemConstruct += "<div id = '"+overlay+"' class= 'first liveSearchOverlay' ><table id = '"+gridtab+"'  border='0' ></table></div>"
	  			  +"<div id = '"+pagerid+"' ></div>"
	  			  +"</div>"
				  +"</td>"
				  +"</tr>"
				  +"</table>"		
  return elemConstruct;
});
  	

  /**
   * Custom object for Additional Field's JSON generation
   * @param {Object} addnFieldArr
   * @memberOf {TypeName} 
   */
    function AddnFields(addnFieldArr){
	 	this.addnFields	= addnFieldArr
	}
    
    function Widget(){
		this.id
		this.type
		this.property
	}
	function WidgetProperty(){
		this.width
		this.height
		this.top
		this.left	
	}	
	/**
	 * Returns JSON string of elements starting with user_def as id
	 * @memberOf {TypeName} 
	 * @return {JSON string} 
	 */
	function getAddnFieldsJSON(){			
		$addnFields = $("*[id^=user_def]");
		var addnFieldArr =  new Array();
		$addnFields.each(function() {
			 var addnField = new Widget();
			 addnField.id=$(this).attr("id");
	 		 addnField.type = $(this).attr("type");
	 		 var addnFieldProp = new WidgetProperty();
			 addnFieldProp.width=$(this).width();
			 addnFieldProp.height=$(this).height();
			 addnFieldProp.top=$(this).offset().top;
			 addnFieldProp.left=$(this).offset().left;
			 addnField.property = addnFieldProp;
			 addnFieldArr.push(addnField);			
			});	
		 return JSON.stringify(new AddnFields(addnFieldArr));	
	 }
 
/**
 * disable / enable lookup form component
 * @param id
 * @return
 */
function disableLkp(id, status)
{
	// selecting the adjacent search loop button
	var anchorId = $("#" + id).siblings("a").prop("id");
	if(status == false)
	{
		$("#" + id).removeAttr("disabled");
		$("#"+anchorId).show();
	}
	else
	{
		$("#" + id).attr("disabled","disabled");
		document.getElementById(anchorId).style.display = "none";
	}
}

/**
 * manage lookup form component readonly
 * @param id
 * @param status
 * @return
 */
function readOnlyLkp(id, status)
{
	// selecting the adjacent search loop button
	var anchorId = $("#" + id).siblings("a").prop("id");
	if(status == false)
	{
		$("#" + id).removeAttr("readOnly");
		$("#"+anchorId).show();
	}
	else
	{
		$("#" + id).attr("readOnly","true");
		document.getElementById(anchorId).style.display = "none";
	}
}


/**
 * method that triggers the search dialog popup of the grid.
 * @param theGridId
 */
function triggerSearchGridPopup(theGridId)
{
	$("#"+theGridId).jqGrid ('searchGrid', {multipleSearch:true, overlay: false});
}

/**
 * disable / enable DatePicker form component
 * @param id
 * @return
 */
function disableDatepicker(id, status)
{
	if (status == false)
	{
		$("#" + id).datepicker("enable");
	}
	else
	{
		$("#" + id).datepicker("disable");
	}
	
}

/**
 * Compare 2 Date and return 0 if are equals -1 if the first Date is greater than the second Date
 * and 1 if the first Date is less than second Date
 */
function compareDate(idDate1, idDate2)
{
  var Date1Obj = $("#"+idDate1).datepicker("getDate");
  var Date2Obj = $("#"+idDate2).datepicker("getDate");

  if(Date1Obj < Date2Obj)
  {
   	return -1;
  }
  else if(Date1Obj > Date2Obj)
  {
    return 1;
  }
  else
  {
	return 0 ;
  }
}

/**
 * PathSolutions [Libin] _makeFormInputsReadOnly function - Makes all input text fields read only and give it look and feel of readonly 
 * @param {String} elementOrFormId: form id whose fields /element id are to be made readonly
 * @param {Boolean} readOnlyFlag: true to make readOnly and false to remove it
 */
_makeFormInputsReadOnly = (function(elementOrFormId, readOnlyFlag) {

	var selector = "#" + elementOrFormId ; //getting selector id
	var tagName = $(selector).get(0).tagName.toLowerCase(); // getting the tag name of the selector
	if (tagName == 'form') // if tag name is form and not input
		selector = selector + " input:not('.liveSearchText')"; // selector for selecting all form input fields omiting livesearch text fields as its handled seperately
	if (readOnlyFlag) { // if true
		$(selector).attr('readonly', true);
	} else {
		$(selector).removeAttr('readonly');
	}
});



_makeInputsReadOnly = (function(readOnlyFlag, ids) {

	var len = ids.length;
	var selector = "";
	for(var i=0; i<=len; i++){
		selector = "#"+ids[i];
		if (readOnlyFlag) { // if true
		$(selector).attr('readonly', true);
	} else {
		$(selector).removeAttr('readonly');
	}
	}
});



/**
 * this function triggers the jquery.val() plus it will trigger the onchange event if exists
 * @param {Object} value
 * @memberOf {TypeName} 
 */
$.fn.valChange = (function(value, trueFalse)
{
	document.getElementById($(this).attr("id")).value = value;
	$(this).trigger("change");
})


$.fn.required = (function(value)
{
	$(this).prop("required",value);
	eltId = $(this).prop("id");
	$label = $("label[for='"+eltId+"']");
	if($label.html() != null)
	{
		$label.addClass("required");
		if(value)
		{
			//set corresponding label as required
			$label.addClass("required");
			$label.append("<span class='required'>*</span>"); //here there is no position for *, we can add it in label.ftl
		}
		else
		{
			$label.removeClass("required");
			$childSpan = $($label.children("span").get(0));
			if($childSpan.html() != null)
				$childSpan.remove();
		}
	}
})


// hide or show grid upon grid click
function showHideSrchGrid(gridId) 
{
	var theGrid =  $("#" + gridId);
	if(theGrid.size() > 0)
	{
		var captionDiv = theGrid[0].grid.cDiv;
		$("a.ui-jqgrid-titlebar-close", captionDiv).click();
		resizeSingleGrid(gridId);// TP 747401
	}
	else
	{
		alert("Grid with Id "+gridId+" not defined.")
	}
}
/**
 * method used to open the Status List of given record
 * @param {Object} theFormId the form id of the status related to
 * @param {Object} thePageRef pageRef
 * @param {Object} srcURL url to be called 
 * @param {Object} theParams parameter to be passed
 */
function showStatus(theFormId, thePageRef , srcURL, theParams)
{
	var	statusDiv = $("<div id='status_div_"+thePageRef+"'/>");
	statusDiv.css("padding","0");
    var theForm = $("#"+theFormId);
    statusDiv.insertAfter(theForm);
    
    var curParams = theParams;
    if(!curParams)
    {
    	curParams = {};
    }
    _showProgressBar(true);
	$("#status_div_"+thePageRef).load(srcURL, curParams, function() {
	_showProgressBar(false);
    $("#status_div_"+thePageRef).dialog({modal:true, 
	                                  title:status_list_key,
	                               autoOpen:false,
	                                   show:'slide',
	                               position:'center', 
	                                 width:'469',
	                                 height:'290',
	                                 close: function (){
		 								  var theDialog = $(this);
		 								  theDialog.remove();
													    }});
	$("#status_div_"+thePageRef).dialog("open");
});
}

/**
 * PathSolutions [Libin] putNumberFormattedValue function - Used to get the existing formatter from defined textfield ,format the defined  value and set it back to the textfield
 * @param {String} inputElementId : element id for which formatting is needed
 * @param {number} dataValue      : value to be formatted
 */
function putNumberFormattedValue(inputElementId,dataValue)
{
	$htmlElt = $("#"+inputElementId);
	dataValue = $.formatNumberNumeric(dataValue,{format:  $htmlElt.attr("nbFormat")});
	$htmlElt.val(dataValue);
}


/**
 * Compare 2 Date and return 0 if are equals -1 if the first Date is greater than the second Date
 * and 1 if the first Date is less than second Date
 */
function compareDateObj(Date1, Date2)
{
	if(typeof Date1 == "string")
		Date1Obj = dateToObjDate(Date1).getTime();
	else
		Date1Obj = Date1.getTime();
	
	if(typeof Date2 == "string")
		Date2Obj = dateToObjDate(Date2).getTime();
	else
		Date2Obj = Date2.getTime();
	
  if(Date1Obj ==  Date2Obj)
   return 0;
  else
  if(Date1Obj < Date2Obj)
   return -1;
  else
   if(Date1Obj > Date2Obj)
    return 1;
}
function dateToObjDate(theDate)
{
  
  dateTimeSplit = theDate.split(" "); 
  dateSplit1 = new Array();
  dateSplit1 = dateTimeSplit[0].split("/");
  
  if(dateTimeSplit.length > 1 && dateTimeSplit[1] != "")
  {
   timeSplit1 = new Array();
   timeSplit1 = dateTimeSplit[1].split(":");
   theDateObj = new Date(dateSplit1[2], dateSplit1[1]-1, dateSplit1[0],timeSplit1[0],timeSplit1[1]);
  }
  else
  {
	  theDateObj = new Date(dateSplit1[2], dateSplit1[1]-1, dateSplit1[0]);
  }
  return theDateObj;
}

/**
 * Function to load the smart window while click on the smart button
 */

function showSMARTDetails(progRef) {
	$(document).ready(function() {
		var trxNbr_val = $("#auditTrxNbr_" + progRef).val();

		//Bug 570461 add special barnch / company code
		var smartSpecCompCode = '';
		var smartSpecBranchCode = '';
		if($("#smartSpecCompCode_" + _pageRef) && $("#smartSpecBranchCode_" + _pageRef))
		{
			smartSpecCompCode = $("#smartSpecCompCode_" + _pageRef).val();
			smartSpecBranchCode =  $("#smartSpecBranchCode_" + _pageRef).val();
		}
		
		var params = "" ;
		if (trxNbr_val != null && trxNbr_val != "" && trxNbr_val != "undefined") 
		{
			dialogOptions = {autoOpen : false,
							width:700,
							//BUG 479986 adding height property to handle scrolling
							height: returnMaxHeight(250),
							hide :'clip',
							modal :true,
							title:SMART_System_Maintenance_Additional_Reference_Table_key,
							close :function(){	
								$("#smartDivElementId_" + _pageRef).dialog("destroy");$(this).remove();}
							};
			var recReadOnly = $("#_recSMARTReadOnly_" + progRef).val() !== "" ? $("#_recSMARTReadOnly_" + progRef).val():$("#_recReadOnly_" + progRef).val(); 
			params = "_pageRef="+_pageRef+"&progRef=" + progRef + "&trxNbr="+ trxNbr_val+"&_recReadOnly="+recReadOnly+"&smartSpecCompCode="+smartSpecCompCode+"&smartSpecBranchCode="+smartSpecBranchCode;
		}
		else 
		{
			// undefined means that form is not loaded so do not open SMART fields if the form is not loaded
			if(trxNbr_val == undefined)
			{
				_showErrorMsg(SMART_must_be_related_to_a_record_key,info_msg_title);
				return;
			}
			else
			{
				dialogOptions = {autoOpen : false,
								width:700,
								//BUG 479986 adding height property to handle scrolling
								height: returnMaxHeight(250),
								hide :'clip',
								modal :true,
								title:SMART_System_Maintenance_Additional_Reference_Table_key,
								close :function(){	
									$("#smartDivElementId_" + _pageRef).dialog("destroy").appendTo("#"+$('#auditTrxNbr_'+_pageRef ).parent().attr("id"));}
								};
				if($.trim( $("#smartDivElementId_"+ _pageRef).html()).length > 0)
				{
					$("#smartDivElementId_" + _pageRef).dialog( dialogOptions );
					$("#smartDivElementId_" + _pageRef).dialog("open");
				}
				else
				{
					var recReadOnly = $("#_recSMARTReadOnly_" + progRef).val() !== "" ? $("#_recSMARTReadOnly_" + progRef).val():$("#_recReadOnly_" + progRef).val(); 
					params = "_pageRef="+_pageRef+"&progRef=" + progRef + "&trxNbr="+ trxNbr_val+"&_recReadOnly="+recReadOnly+"&smartSpecCompCode="+smartSpecCompCode+"&smartSpecBranchCode="+smartSpecBranchCode;
				}
			}
		}
		
		if (params != null && params != "" && params != "undefined") 
		{
			_showProgressBar(true);
			$.ajax( {
				url : jQuery.contextPath+"/path/smart/Smart_checkSmartDetailsDefined",
				type : "post",
				dataType : "json",
				data : params,
				success : function(data) {
					if (data.smartDefined) {
						var mySrc = jQuery.contextPath + "/path/smart/Smart_loadAdditionalDetails.action";
						var smartDivElementId = "smartDivElementId_"+progRef;
						var smartDivElement = $("<div id='"+smartDivElementId+"'></div>");
						smartDivElement.dialog( dialogOptions );
						$("#"+smartDivElementId).load(
							mySrc,params,
							function() {
								_showProgressBar(false);
								$("#"+smartDivElementId).dialog("open");
								//613682
    							//BMO160192 - SMART to be Able to Have Expression for Mandatory Functionality
								validateSmartMandExpr();
						});
					} else {
						_showProgressBar(false);
						//613682
						//BMO160192 - SMART to be Able to Have Expression for Mandatory Functionality
						validateSmartMandExpr();
//						if(data.smartCount==0)
//							_showErrorMsg(Smart_Details_not_defined_key,info_msg_title);//Smart Details not defined.
						
					}
					
				}
			});
		} 
	});
}

function populateElemValue(eltId, propName)   
{ 
	var eltValue = "";
	eltId = eltId+"_"+_pageRef;
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
		if(($("#"+eltId).is(":checked")))
		{
			eltValue = true;
		}
		else
		{
			eltValue = false;
		}
	}
	else if( $("#"+eltId).attr("type") == "radio")
	{
		if($("#"+eltId).is(":checked"))
		{
			eltValue = $("#"+eltId).val();
		}
		else
		{
			eltValue = $("input:checked[type='radio'][name='"+propName+"'][id!='"+eltId+"']").val() //get the next radio button value 
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
	else if($("#"+eltId).val() != null) //any form element
	{
		eltValue = $("#"+eltId).val(); 
	}
	else if(eval(eltId)) //java script variable
	{
		eltValue = eval(eltId); 
	}
	return eltValue;
}


/** 
 * Function To show the alert lookup...
 * @param {Object} alertParam
 * @memberOf {TypeName} 
 */
showSendAlert = (function(alertParam, customPageRef){
	_showProgressBar(true);
	
	if( _pageRef == '' 
		&& customPageRef != undefined && customPageRef != null && customPageRef != '')
	{
		_pageRef = customPageRef;
	}

	
	var mySrc = jQuery.contextPath + "/path/alerts/AlertsMaint_loadAlertsPage?_pageRef="+_pageRef;
	
	//Check if the div already exists in HTML documnent, and remove it if exists
	if($("#send_alert_div_" + _pageRef) && $("#send_alert_div_" + _pageRef).attr('id') != undefined)
	{
		$("#send_alert_div_" + _pageRef).dialog("destroy");
		$("#send_alert_div_" + _pageRef).remove();
	}
	
	var alertDivElement = $('<div>',{id:"send_alert_div_"+_pageRef});
	alertDivElement.css("padding","0");
	$('body').append(alertDivElement);
	
	$("#send_alert_div_" + _pageRef).load(
		mySrc,alertParam,
		function() {
			
			$("#send_alert_div_" + _pageRef).dialog( {
				autoOpen : true,
//				show : 'slide',
				modal : true,
				title : send_alert_title,
				position : 'center',
				width  : '850',
				height : '400',
				close : function(ev, ui) {
					//$("#send_alert_div_" + _pageRef).dialog("destroy");
					//$("#send_alert_div_" + _pageRef).remove();
					SEND_ALERTS_MAINT_dismissAlert('D');
					}
			});
			
			// Temperory Change to show print advice window before alert window (bug #221208)
           	if( $("#chooseLanguageDivId") != undefined &&  $("#chooseLanguageDivId").length > 0)
            {
                 var newIndex = 10 + parseInt($("#send_alert_div_" + _pageRef).closest("div.ui-dialog").css("z-index"));
            	 $("#chooseLanguageDivId").closest("div.ui-dialog").css("z-index",newIndex);
            }	

            $("#send_alert_div_" + _pageRef).dialog("open");
            _showProgressBar(false);
	});
	
});


/**
*common function used to retrun the element label
*/
function returnElementLabel(element)
{
	var curElemLabel =  $.trim(($("label[for='"+element.id+"']").text()).replace("*",""));
	if(curElemLabel == "")
	{
		var _title = $(element).prop("title"); //used for account input elements
		var parentTd = ($(element).parents("td[tdLabel]").length > 0) ? $(element).parents("td[tdLabel]")[0] : ""; //used for grid inputs
		var _tdTitle = $(parentTd).attr("tdLabel");
		if(typeof _title != "undefined" && _title != "")
			curElemLabel = _title
		else if (typeof _tdTitle != "undefined" && _tdTitle != "")
		{
			curElemLabel = _tdTitle ;
		}
		else
			curElemLabel = element.id //setting id in case of no Label
	}
	return curElemLabel;
}

$.fn.processAfterValid= (function(_methodName, args)
{
	$(this).validate(
		{
			onfocusout: false,
			onkeyup: false,
			onclick: false,		
			showErrors: function(errorMap, errorList) {
				var jqueryAct = 0;
				if(fieldAuditActive)
				{
					jqueryAct = 1;
				}
		   	if((isAlertEnabled ==="true" && jQuery.active > (1+jqueryAct)) || (isAlertEnabled !== "true" && jQuery.active > jqueryAct))
	    	{
		   		_showProgressBar(false);
	    		_showErrorMsg(server_request_completes_key,warning_msg_title)
	    		return;
	    	}
				var _requiredLabels = "";
				var _otherElts = "";
				var firstFocusEltIdObj = null;
				for (var i=0; i<errorList.length; i++)
				{
					_err = errorList[i];
					var curElemLabel = returnElementLabel(_err.element);
					
					if(curElemLabel !== "")
					{
						if(_err.message == "_required")
						{
							if(_requiredLabels != "")
								_requiredLabels += "\n";
							_requiredLabels += curElemLabel
						}
						else if (_err.message == "_maxlength")//only this for now, others will be added later
						{
							if(_otherElts != "")
								_otherElts += "\n";
							_otherElts += curElemLabel + " " + max_length_trans + " " + $(_err.element).attr("maxlength")
						}
						else if (_err.message == "_minlength")
						{
							if(_otherElts != "")
								_otherElts += "\n";
							_otherElts += curElemLabel + " " + min_length_trans + " " + $(_err.element).attr("minlength")
						}
						
						// hold the first element id to focus on after error message display
						if(firstFocusEltIdObj == null)
						{
							firstFocusEltIdObj = {_elementFocusId:_err.element.id};
						}
					}	
				}
				//priority for missing fields, if they pass continue to others
				if(_requiredLabels != "")
				{	
					bSelenuimError=1;
					_showErrorMsg(_requiredLabels,missing_elt_msg_key,null,null,'_afterValidateErrorMsg',firstFocusEltIdObj);
				}
				if(_otherElts != "")
				{
					 bSelenuimError=1;
					_showErrorMsg(_otherElts,error_msg_title,null,null,'_afterValidateErrorMsg',firstFocusEltIdObj);
				}
				
				_showProgressBar(false);
				formatNumbers();
			},
			preValidateFunc : function()
			{
				_showProgressBar(true);
			}
		   ,
			submitHandler: function(form) {
				var jqueryAct = 0;
				if(fieldAuditActive)
				{
					jqueryAct = 1;
				}
		   	if((isAlertEnabled ==="true" && jQuery.active > (1+jqueryAct)) || (isAlertEnabled !== "true" && jQuery.active > jqueryAct))
		    	 {
		    	 	return;
		    	 }
			     var _theParams = "";
			     if(typeof args != "undefined")
				   {
				   		for(var i =0; i<args.length; i++)
			   			{
			   				if(i > 0)
			   					_theParams += ","
		   					_theParams += "'" + args[i] + "'";
			   			}
				   }
			     // remove progress Bar before function call inorder to be developer control his function
			       _showProgressBar(false);
			       
				   jQuery.globalEval(_methodName+"("+_theParams+")");
				   
				   
		 }
		})
})

/***
	 * Method to reset to the previous values of passed components as an array
	 */
	function resetElementsToPreviousValue(arrComponentId){
	    jQuery.each(arrComponentId, function() {
	       $("#"+this).val($("#"+this).attr("prevValue"));
	   	});
		
	}
	/****
	 * Method to set the previous value of a components as an array
	 */
	function setElementsPreviousValue(arrComponentId){
		jQuery.each(arrComponentId, function() {
			$("#"+this).attr("prevValue",$("#"+this).val());	
		});
	}
	/***
	 * Method to reset to the previous values of passed component
	 */
	function resetToPreviousValue(componentId)
	{
		var $htmlElt = $(document.getElementById(componentId))
		var prevValue = $htmlElt.attr("prevValue");
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
	}
	/****
	 * Method to set the previous value of a component
	 */
	function setPreviousValue(componentId){
		$("#"+componentId).attr("prevValue",$("#"+componentId).val());	
	}
	
$.fn.clearChanges = (function()
{
	var _theform = document.getElementById($(this).attr("id")); //getting the form dom element
	return $.data(_theform , 'changeTrack',false);
})


function gridDefaultNumFmatterBrackets(cellvalue, options, rowObject)
{
      var res = defaultNumFmatter(cellvalue, options, rowObject);
      if(res != " " && Number(cellvalue) < 0)
      {
            res = "("+res+")";
            res = res.replace("-","");
      }
      return res;
}

function currencyFmatter (cellvalue, options, rowObject)
{
	var nbFormat = "#,##0";
	var currColName = options.colModel.name;
	var formatColName = (typeof options.colModel.formatCol != "undefined")? options.colModel.formatCol : currColName.substring(currColName.lastIndexOf(".")+1) + "_FORMAT";
	var decPlaces;
	var $theGrid = $("#"+options.gid)
	if(typeof rowObject[formatColName] == "undefined") //nested formatting column name
	{
		var tempData = rowObject;
		var voPropArr = formatColName.split(".");
		// traverse to nested returned JSON Array to take the propery Values (if there is VO inside CO for Example)
		for (var i = 0; i < voPropArr.length; i++)	
		{
		    var currProp = voPropArr[i];  
		    if(typeof tempData[currProp] != "undefined" && tempData[currProp] != null)
	    	{
	    		decPlaces = tempData[currProp]    
	    		tempData = tempData[currProp];
	    	}
		    else
	    	{
	    		decPlaces = "";
	    		break;
	    	}
		}
		if(decPlaces == "")
		{
			//get it from rowId through getCell
			decPlaces = $theGrid.jqGrid('getCell',options.rowId,formatColName);
			if(decPlaces === false)
				return cellvalue;
		}
	}
	else
		decPlaces = rowObject[formatColName];
	
	decPlaces = Number(decPlaces);
	var _leadZeros = '';
	var colNbFormat;
	var dfltColNbFormat;
	var applyRounding = false;
	if(typeof options.colModel.leadZeros != "undefined")
		_leadZeros = options.colModel.leadZeros;
	
	if(typeof options.colModel.nbFormat != "undefined")
	{		
		colNbFormat = options.colModel.nbFormat; //nbFormat attribute at column level
		dfltColNbFormat = options.colModel.default_nbFormat;
	}
	
	if(typeof options.colModel.applyRounding != "undefined")
		applyRounding = options.colModel.applyRounding;
	
	var minValue = (typeof options.colModel.minValue != "undefined") ? options.colModel.minValue : false; 
	var maxValue = (typeof options.colModel.maxValue != "undefined") ? (options.colModel.maxValue).toString() : false;
	/**
	 * [MarwanMaddah]: in case decPlaces equals to zero 
	 * and there is a default nbFormat defined 
	 * at the column level, will set it as nbFormat, 
	 * to avoid inheritance between cells that are exists in the same column
	 */
	if(decPlaces == 0 && typeof dfltColNbFormat!="undefined" && dfltColNbFormat!=null && dfltColNbFormat!="")
	{
		nbFormat = dfltColNbFormat;
	}
	else
	{		
		nbFormat = returnNbFormat(decPlaces, _leadZeros,colNbFormat)
	}

	var editopt = options.colModel.editoptions;
	if(typeof editopt != "undefined" /*&& 
			typeof editopt.dataInit != "undefined" &&
				String(editopt.dataInit).indexOf(".numeric")>0*/)
	{
		editopt.dataInit = function(el){numericWidgetInit(el, nbFormat  ,_leadZeros, minValue, maxValue)};
		$theGrid.jqGrid('setColProp',currColName, { editoptions: editopt});
	}
	options.colModel.nbFormat = nbFormat;
	
	//Element formatted is in editable mode,reset numeric widget to apply new formatting on it (used when called from dependency)
	var $elt = $theGrid.jqGrid("getCellInputElt",options.rowId, currColName);
	if(typeof $elt != "undefined" && $elt != null)
	{
		// define correct number format
		var glblDecSep = returnDecSep();
		var glblGrpSep = returnGrpSep();
		
		var eltVal = $($elt).val();
		eltVal = unformatNumber(eltVal);
		$($elt).val(eltVal)
		//the timeout function was not allowing the value to be set
		$($elt).numeric({textDir : true,minValue: minValue, maxValue: maxValue,
							format : {format:nbFormat ,leadZeros: _leadZeros,
									  decimalChar : glblDecSep,
									  thousandsChar : glblGrpSep}})
	}
	
	if(cellvalue === null || cellvalue === "" || typeof cellvalue == "undefined")
		return " ";

	return $.formatNumberNumeric(cellvalue, {format: nbFormat,leadZeros:_leadZeros, applyRounding : applyRounding});

}

function currencyFmatterNegativeSign (cellvalue, options, rowObject)
{
	var res = currencyFmatter (cellvalue, options, rowObject);
	if(cellvalue === null || cellvalue === "" || typeof cellvalue == "undefined")
		return " ";
	if(cellvalue < 0)
	{
		res = "("+res+")";
		res = res.replace("-","");
	}
	return res;
}
function currencyFmatterDRCR(cellvalue, options, rowObject)
{
	var suffix = "";
	if(cellvalue > 0)
		suffix = dr_suffix_key_trans;
	else 
		suffix = cr_suffix_key_trans;
	var res = currencyFmatter (cellvalue, options, rowObject)+" "+suffix;
	if(cellvalue === null || cellvalue === ""  || typeof cellvalue == "undefined")
		return " ";
	res = res.replace("-","");
	return res;
}


function numericWidgetInit(el , nbFormat, _leadZeros, minValue, maxValue)
{
	var eltVal = $(el).val();
	eltVal = unformatNumber(eltVal);
	$(el).val(eltVal);
	minValue = (typeof minValue != "undefined") ? minValue : false;
	maxValue = (typeof maxValue != "undefined") ? maxValue.toString() : false;
	// define correct number format
	var glblDecSep = returnDecSep();
	var glblGrpSep = returnGrpSep();
	setTimeout(function() {$(el).numeric({textDir : true,maxValue : maxValue, minValue: minValue,format : {format:nbFormat  ,leadZeros: _leadZeros,
		decimalChar : glblDecSep, thousandsChar : glblGrpSep}});},100)	
}


/**
 * loads the timepicker in case called from grid (initialization of timepicker is either done in datepicker tag ftl or here in case of grid)
 */
function loadTimePicker()
{
	//PathSolutions loading timepicker in case needed
	$.struts2_jquery.require( [ "js/plugins/jquery-ui-timepicker-addon" + $.struts2_jquery.minSuffix + ".js" ]);
	$.struts2_jquery.requireCss("themes/jquery-ui-timepicker-addon.css");
	if ($.struts2_jquery.local !== "en")
	{
		$.struts2_jquery.require("js/base/i18n/ui.timepicker-" + $.struts2_jquery.local + $.struts2_jquery.minSuffix + ".js");
	}
	
}
function initDatePicker(el, dateTimeFormat, hasTimePicker)
{
	var isEltFocus = $(el).is(":focus");
	el.setAttribute('style','width:99%');
	if(isEltFocus) //blur and refocus on element where we initially focused to create the datepicker element of grid (the clicked column) 
		$(el).blur();
	if(hasTimePicker === "true")
	{
		if(dateTimeFormat.tponly == true)
		{
			 $(el).timepicker(dateTimeFormat);
		}
		else
		{
		 	$(el).datetimepicker(dateTimeFormat);
		}
	}
	else
	{
		$(el).datepicker({dateFormat: dateTimeFormat})
	}
	if($(el).hasClass("hasDatepickerDisabled")) //readonly column
	{
		$(el).datepicker("disable");
	}
	else
	{
		$(el).datepicker("enable");
	}
	if(isEltFocus) 
		$(el).focus();
}


// excludePannel is of type JSON object {[pannelId] : 1, [pannelId2] : 0}
 function collapseAllPannels(theObj,startPointId, excludePannel)
 {
	  var _theIcon = $("#"+theObj.id);
	  var colappsed = _theIcon.attr("collapsed")
	  var iconSN = "s";
	   if(colappsed == undefined || colappsed === "0")
	   {
		   iconSN = "n";
	   }
	   // looping on each Collapsable pannel and performing collapse or expand accordingly
	   $("#"+startPointId+" .collapsibleContainerTitle").each( 
	   	function ()
	   	{
	   			   var pannelId = $(this).parent().attr("id");
	   			   var pannelExcluded = "0"
	   			   if(pannelId != undefined && excludePannel != undefined)
	   			   {
	   				   var pannelExcluded = excludePannel[pannelId];
	   				   if(pannelExcluded != undefined && pannelExcluded+"" == "1")
	   					{
	   					     pannelExcluded = "1";
	   					}
	   			   }
	   			   // check if pannel not Excluded
	   			   if(pannelExcluded !== "1")
	   				{
					   var toggleElem = $(this).parent().children(":first").find('span .ui-icon');
					   if( $(toggleElem).hasClass('ui-icon-circle-triangle-'+iconSN))
					   {
						   $(".collapsibleContainerContent", $(this).parent()).slideToggle("fast", function () 
							{
							   // incase we have Collapsable Panel insiide another Collapsable Panel so need to take exclusion into Consideration
							    var innerPannelId = $(this).parent().attr("id");
							    var innerPanelExcluded = "0"
							    if(innerPannelId != undefined && excludePannel != undefined)
							    {
							    	var innerPanelExcluded = excludePannel[innerPannelId];
							    	if(innerPanelExcluded != undefined && innerPanelExcluded+"" == "1")
							    	{
							    		innerPanelExcluded = "1";
							    	}
							    }
							    if(innerPanelExcluded !== "1")
							    {
								    $(toggleElem).removeClass('ui-icon ui-icon-circle-triangle-'+iconSN);
		 								$(toggleElem).addClass('ui-icon ui-icon-circle-triangle-'+ ( iconSN == "n" ? "s":"n"));
		 								$(this).css("display",(iconSN == "n" ? "none":""));
		 						}
	 								
							   });
						}
					 }
		});
	    _theIcon.attr("collapsed",(iconSN == "n" ? "1":"0"))
	    // changing the icon of the clicked button to open closed Folder
	    if( _theIcon.hasClass('ui-icon-folder-collapsed'))
	    {
	    	_theIcon.removeClass('ui-icon-folder-collapsed');
 			_theIcon.addClass('ui-icon-folder-open');
	    }
	    else if(_theIcon.hasClass('ui-icon-folder-open'))
	    {
	    	  _theIcon.removeClass('ui-icon-folder-open');
 			_theIcon.addClass('ui-icon-folder-collapsed');
	    }
 }
 
 
/**
 * method to open the CIF Search from icon in LoginInfo Page on Header of the application
 * @memberOf {TypeName} 
 */
function globalOpenCifChoice()
{
	// check if already set then Clear
	if($("#hdr_scanned_cif_no").hasClass("red_person"))
	{
		$.struts2_jquery.require("IrisApplication.js", null, (jQuery.contextPath == undefined? contextPath:jQuery.contextPath)
		+ "/common/js/irisapplication/");
		iris_setChoosenCIf("-","-");
		// clear cached Data
		clearCachedPathData();
	}
	else
	{
	  	var thePageRef = "HDR_IRS001";// Page REF for Global CIF Choice
	  	var globalCifScanDiv = $("<div id='global_cif_scan_div_"+thePageRef+"'><div id='global_cif_scan_div_contents_'"+thePageRef+"' ></div></div>");
		globalCifScanDiv.css("padding","0");
		var theBody = $('body');
		globalCifScanDiv.insertAfter(theBody);
		_showProgressBar(true);	    
		var curParams = {noInfoBar: '1',_pageRef:thePageRef};
		var srcURL = (jQuery.contextPath == undefined? contextPath:jQuery.contextPath)+'/path/irisapplication/IrisApplicationMaint_loadIrisApplicationMaintPage.action?iv_crud=R';
		$("#global_cif_scan_div_"+thePageRef).load(srcURL, curParams, function() 
			{
				_showProgressBar(false);	
			    $("#global_cif_scan_div_"+thePageRef).dialog({modal:true, 
				                                  title: (typeof Choose_customer_key === undefined)?"Choose Customer":Choose_customer_key,
				                               autoOpen:false,
				                                   show:'slide',
				                               position:'center', 
				                                 width:returnMaxWidth(600),
				                                 height:returnMaxHeight(300),
				                                 close: function (){
			    									// resetting the page REF
			    									  currIrisPageRef = undefined; 
					 								  var theDialog = $(this);
					 								  theDialog.remove();
																    }});
				$("#global_cif_scan_div_"+thePageRef).dialog("open");
		  		});
	}
 }


/**
 * to Open Print swift in a dialog
 */
function openPrintSwift(progRef) {
	$(document).ready(function() {
		 
		var trxNbr_val = $("#auditTrxNbr_"+progRef).val();
		var params ="";
		if (trxNbr_val != null && trxNbr_val != "" && trxNbr_val != "undefined") 
		{
			params = "_pageRef=" + progRef + "&auditTrxNbr="+ trxNbr_val;
		}
		else
		{
			_showErrorMsg(Print_Swift_must_be_related_to_a_record_key,info_msg_title);//Print Swift must be related to a record
			return;
		}
		
		if (params != null && params != "" && params != "undefined") 
		{
			var srcURL = jQuery.contextPath+"/path/printswift/printSwiftMainAction?";

$.__overlaybox({initialWidth:600
               ,initialHeight:500
               ,width:600
               ,height:500
               ,scrolling:true
	           ,href:srcURL
	           ,title:Print_Swift_key
	           ,data:params});
		} 
	});
}
function onPrintSwiftClicked()
{
  $("#printSwiftDivId").printElement();	
}


jQuery.download = function(url, data, method)
{
		//url and data options required
		if( url && data ){
		//data can be string of parameters or array/object
		data = typeof data == 'string' ? data : jQuery.param(data);
		//split params into form inputs
		var inputs = '';
		jQuery.each(data.split('&'), function(){
		var pair = this.split('=');
		inputs+='<input type="hidden" name="'+ pair[0] +'" value="'+ decodeURIComponent(pair[1]) +'" />';
		});
		//send request
		jQuery('<form id="downloadform" target="upload_target"  action="'+ url +'" method="POST">'+inputs+'</form>')
		.appendTo("body").submit().remove();
		};
}


/**
 * open the report advice in the screen in case HTML format advice using report reference, or download report in case not HTML
 * also consider the autoPrint in case the reports not be shown but only silently printed on the server
 * @param {Object} reportReference, reference of report, in case additionalParams["repFmtByRepId"] is provided then the reportReference is reportId
 * @param {Object} params, ~#~ separated list of ordered parameter values 
 * @param autoPrint (optional) flag to specify suto print or not
 * @param callSucc (optional) Call back Success Function
 * @param errorFunc (Optional) Call back Error Function
 * @param language (Optional) report generation Language EN, AR,..
 * @param successArg (Optional) argumetns that to be passsed to callSucc
 * @param errorArg (Optional) argumetns that to be passsed to errorFunc
 * @param customReportAction if customeURL for report needed , so default URL will be used
 * @param customReportParams additional parameters needed in cutomeURL more than those available in params
 * @param appName used to send the application name
 * @param additionalParams array of parameters [to open a report in iframe instead of window use the openinIframe element in this array]
 */
function openPreviewAdviceRepDefaultFrmt(reportReference,params,autoPrint, callSucc,errorFunc,language, successArg, errorArg, customReportAction, customReportParams, appName,additionalParams)
{
	//this function is created based on CDMI170432 TP603899
	
	 var silentServerPrint = false;
	 if(typeof autoPrint != "undefined" && autoPrint != null &&  autoPrint !== "")
     {
   		if(typeof autoPrint == "object")
           {	
   			 //TP 317013 if global showPrintDialog not checked then need print silently on the server
   			//654601 added checking on printerName if found then print on server side 
   			var printerName = autoPrint.printerName;
   			  if(glbl_showPrintPreviewDialog !== 'Y' && printerName != undefined && printerName != null && printerName != '')
   			  {
   				silentServerPrint = true;
   			  }
           }
     }
	 
	 var isRepCallById = (typeof additionalParams != "undefined" && additionalParams != null && additionalParams["repFmtByRepId"] === "1");

	 // if report to be printed on the server then call the openPreviewAdvice method.
	 if(silentServerPrint)
	 {
		 if(isRepCallById)
		 {
			 openPreviewAdviceWithId(reportReference,params,autoPrint, callSucc,errorFunc,language, successArg, errorArg, customReportAction, customReportParams,additionalParams);
		 }
		 else
		 {
			 openPreviewAdvice(reportReference,params,autoPrint, callSucc,errorFunc,language, successArg, errorArg, customReportAction, customReportParams, appName,additionalParams);
		 }
	 }
	 else
	 {
		 var obj = {};
		 // check if the calling is done by passing the report id and not reference
		 if(isRepCallById)
		 {
			 delete additionalParams["repFmtByRepId"];
			 var isRepCallByOldRepId = (typeof additionalParams != "undefined" && additionalParams != null && additionalParams["repFmtByOldRepId"] === "1");
			 if(isRepCallByOldRepId)
			 {
				 delete additionalParams["repFmtByOldRepId"];
				 obj["pb_r"] = "1";
			 }
			 obj["r_i"] = reportReference;
		 }
		 else
		 {
			// need to get the Default report Format and if not HTML then need to call report download method
			 obj["r_r"] = reportReference;
			 if(appName!=null && appName!=undefined && appName!="")
			 {		
				 obj["a"] = appName;
			 }
		 }
		 
		 _showProgressBar(true);
		 $.ajax({
				 url: jQuery.contextPath +"/path/repCommon/reportAction_retReportDetailsByRefOrId",
		         type:"post",
				 dataType:"json",
				 data: obj,
				 success: function(data){
					 _showProgressBar(false);
					if(typeof data["_error"] == "undefined" || data["_error"] == null)
					{
						 var repDefFormat = data["var_format"];
						 var repCorrectReference = reportReference;
						 if(isRepCallById)
						 {
							 repCorrectReference =  data["r_r"];
							 if(typeof data["a"] != "undefined" && data["a"] != null)
							 {
								 appName = data["a"];
							 }
						 }
						 
						 //TP 858982 JAIZ190096, show report in case repViewPDF is passed and report format is pdf or html instead of download
						 var downloadReport = true;
						 if(additionalParams != undefined && additionalParams != null && additionalParams['repViewPDF'] === "1"
							 && repDefFormat && (repDefFormat.trim().toLowerCase() === "pdf" || repDefFormat.trim().toLowerCase() === "html"))
						 {
							downloadReport = false;
						 	additionalParams['reportFormatToShow'] = repDefFormat.trim().toLowerCase();
						 }
						 if(( repDefFormat && repDefFormat.trim().toLowerCase() === "html") || !downloadReport)
						 {
							 openPreviewAdvice(repCorrectReference,params,autoPrint, callSucc,errorFunc,language, successArg, errorArg, customReportAction, customReportParams, appName,additionalParams);
						 }
						 else
						 {
							 openAdviceReportWithRef(repCorrectReference, params, callSucc,additionalParams,successArg);
						 }
					}
					
				 }
		    });
	 }
}

//654601 Open the local printers selector
function openActiveXPrinterSelector()
{
	//var children = loadSilentPrintActiveX($("#pathActiveXPrintClassId").val(), $("#pathActiveXPrintVersion").val());
	if(loadSilentPrintActiveX($("#pathActiveXPrintClassId").val(), $("#pathActiveXPrintVersion").val(), "select"))
	{
		var prntrNm = "";
		if($("#usrActvXSelectdPrntr").length > 0)
		{
			prntrNm = $("#usrActvXSelectdPrntr").val();
		}
		setUsrActiveXPrinter(PathPrint.showPrintDlg(prntrNm));
	}
}
//654601 load the activeX
function loadSilentPrintActiveX(classId, version, operation, printParams)
{

	if($("#PathPrint").length == 0)
	{
		var prntrNm = "";
		if($("#usrActvXSelectdPrntr").length > 0)
		{
			prntrNm = $("#usrActvXSelectdPrntr").val();
		}
		
		var silentPrntActvXDvCntnt = "<div id='silentPrntActvXDv'/>";
		var silentPrntActvXDvElement = $(silentPrntActvXDvCntnt);
		$('body').append(silentPrntActvXDvElement);
		
		var newObject = "<object name='PathPrint' style='display:none' id='PathPrint' classid='"+classId+"' codebase='../login/PathPrintCab.cab#version="+version+"'><object/>" //creates string from data
		var element = document.getElementById("silentPrntActvXDv");
		element.insertAdjacentHTML('afterbegin', newObject);
		
		var children = element.children;
		if(operation == "select")
			{
				children[0].onload = setUsrActiveXPrinter(PathPrint.showPrintDlg(prntrNm));
			}
		else if(operation == "print")
			{
			children[0].onload = silentActiveXPrint(printParams);
			}
	}
	else
	{
		return true;
	}
}

// 654601 set the selected printer to hidden input
function setUsrActiveXPrinter(printerName)
{
	_showProgressBar(true);
	var updates = {usrActvXSelectdPrntr: printerName}
	$.ajax({
			url: jQuery.contextPath+ "/pathdesktop/DesktopAction_updateUserSelectedPrinter",
	  		type:"post",
	  		dataType:"json",
	  		data: updates,
	  		success: function(data)
	  		{
	  				$("#usrActvXSelectdPrntr").val(printerName);
				_showProgressBar(false);
			}
		})
}

function silentActiveXPrint(printParams)
{
	var reportContent  = printParams.reportContent;
	var nbrOfCopies = printParams.nbrOfCopies;
	
	if(nbrOfCopies == "" || nbrOfCopies  == null || nbrOfCopies == undefined || nbrOfCopies == "undefined" || nbrOfCopies < 1)
	{
		nbrOfCopies = 1;
	}
	var pName = $("#usrActvXSelectdPrntr").val();

	if(pName == "" || pName == null || pName == undefined || pName == "undefined")
	{
		pName = "";
	}
	if($("#PathPrint").length == 0)
	{
		loadSilentPrintActiveX($("#pathActiveXPrintClassId").val(), $("#pathActiveXPrintVersion").val(), "print", printParams);
	}
	else
		{
		PathPrint.ReportHtml = reportContent;
		PathPrint.NbrOfCopies = nbrOfCopies;;
		PathPrint.PrinterName = pName;
//		PathPrint.ShrinkToFit = document.getElementById("ShrinkToFit").value;
//		PathPrint.PrintBackGround = document.getElementById("PrintBackGround").value;
//		PathPrint.PrintOrientation = document.getElementById("PrintOrientation").value;
//		PathPrint.MarginBottom = document.getElementById("MarginBottom").value;
//		PathPrint.MarginLeft = document.getElementById("MarginLeft").value;
//		PathPrint.MarginRight = document.getElementById("MarginRight").value;
//		PathPrint.MarginTop = document.getElementById("MarginTop").value;
		PathPrint.silentPrint();
		
		}
		
}



/**
 * preview advice using report reference
 * @param {Object} reportReference, reference of report
 * @param {Object} params, ~#~ separated list of ordered parameter values 
 * @param autoPrint (optional) flag to specify suto print or not
 * @param callSucc (optional) Call back Success Function
 * @param errorFunc (Optional) Call back Error Function
 * @param language (Optional) report generation Language EN, AR,..
 * @param successArg (Optional) argumetns that to be passsed to callSucc
 * @param errorArg (Optional) argumetns that to be passsed to errorFunc
 * @param customReportAction if customeURL for report needed , so default URL will be used
 * @param customReportParams additional parameters needed in cutomeURL more than those available in params
 * @param appName used to send the application name
 * @param additionalParams array of parameters [to open a report in iframe instead of window use the openinIframe element in this array]
 */
function openPreviewAdvice(reportReference,params,autoPrint, callSucc,errorFunc,language, successArg, errorArg, customReportAction, customReportParams, appName,additionalParams)
{
	var dataParams = {};
	dataParams["r_r"] = reportReference;
	if(appName!=null && appName!=undefined && appName!="")
	{		
 	    dataParams["a"] = appName;
	}
	if(language != undefined && language != null && language != '')
	{
		dataParams["l"] = language;
	}
    openPreviewRepCommon(dataParams,params,autoPrint, callSucc, errorFunc, successArg, errorArg, customReportAction, customReportParams, additionalParams)
}
/**
 * preview advice using report  ID
 * @param {Object} reportId, reference of report
 * @param {Object} params, ~#~ separated list of ordered parameter values 
 * @param autoPrint (optional) flag to specify suto print or not
 * @param callSucc (optional) Call back Success Function
 * @param errorFunc (Optional) Call back Error Function
 * @param language (Optional) report generation Language EN, AR,..
 * @param successArg (Optional) argumetns that to be passsed to callSucc
 * @param errorArg (Optional) argumetns that to be passsed to errorFunc
 * @param customReportAction if customeURL for report needed , so default URL will be used
 * @param customReportParams additional parameters needed in cutomeURL more than those available in params
 * @param additionalParams array of parameters [to open a report in iframe instead of window use the openinIframe element in this array]
 */
function openPreviewAdviceWithId(reportId,params,autoPrint, callSucc,errorFunc,language, successArg, errorArg, customReportAction, customReportParams,additionalParams)
{
	var dataParams = {};
	dataParams["r_i"] = reportId;
	dataParams["pb_r"] = 1; // Set to 1 to get the new report id from the old report id.
	if(language != undefined && language != null && language != '')
	{
		dataParams["l"] = language;
	}
    openPreviewRepCommon(dataParams,params,autoPrint, callSucc, errorFunc, successArg, errorArg, customReportAction, customReportParams, additionalParams);
}
/**
 * preview advice common Method
 * @param dataParams,report comon parameters
 * @param {Object} params, ~#~ separated list of ordered parameter values 
 * @param autoPrint (optional) flag to specify suto print or not
 * @param callSucc (optional) Call back Success Function
 * @param errorFunc (Optional) Call back Error Function
 * @param language (Optional) report generation Language EN, AR,..
 * @param successArg (Optional) argumetns that to be passsed to callSucc
 * @param errorArg (Optional) argumetns that to be passsed to errorFunc
 * @param customReportAction if customeURL for report needed , so default URL will be used
 * @param customReportParams additional parameters needed in cutomeURL more than those available in params
 * @param additionalParams array of parameters [to open a report in iframe instead of window use the openinIframe element in this array]
 */
function openPreviewRepCommon(dataParams,params,autoPrint, callSucc, errorFunc, successArg, errorArg, customReportAction, customReportParams, additionalParams)
{
      var a_p =0;
      var d_p =2;
      var printerName;
      var openWindow = true;
      var openInFrame = false;
      
      var _jsonReturn = false;
      var returnDataType = "html";
      if(typeof additionalParams != "undefined" && additionalParams != null && additionalParams["returnJson"])
      {
    	_jsonReturn = true;
    	returnDataType = "json"
      }
      
      if(typeof additionalParams != "undefined" && additionalParams != null && additionalParams["openinIframe"] )
	  {
	  		openWindow = false;
	  		openInFrame = true;
	  }
      
      var additionalPrintParams = {};
      if(typeof autoPrint != "undefined" && autoPrint != null &&  autoPrint !== "")
      {
    		if(typeof autoPrint == "object")
            {	
    			  a_p = 1; 
    			 //TP 317013 if global showPrintDialog not checked then need print silently on the server
    			  if(glbl_showPrintPreviewDialog !== 'Y')
    			  {
    				  openWindow = false;
	                  printerName = autoPrint["printerName"];
	                  if(printerName !== undefined && printerName != '')
	                  {
			                  //654601 Set to 1 to allow printing on server side (d_p means display parmeter window, not set for advices)
		                	  d_p = 0;
		                	  additionalPrintParams.noClientActivexPrint = true;
	                   }
	                  
	                  if(autoPrint["nbCopiesToPrint"])
	                  {
	                	  additionalPrintParams.nbCopiesToPrint = autoPrint["nbCopiesToPrint"];
	                  }
    			  }
    			  //DB190090  896875 Filling number of copies to be printed in all cases whether silent print or with print Preview
				  if(autoPrint["nbCopiesToPrint"])
	              {
		                dataParams["p_c_nb"] = autoPrint["nbCopiesToPrint"];
	              }
            }
            else
            {
                  a_p = autoPrint;
            }
      }
      else
      {
    	  //TP 317013 if global showPrintDialog checked then need to popup browser print dialog
	   	   if(glbl_showPrintPreviewDialog === 'Y' && !openInFrame)
	   	   {
	   		   a_p = 1;
	   	   }
      }
      dataParams["a_p"] = a_p;
      dataParams["d_p"] = d_p;
      dataParams["r_a_p"] = params;
      //if there is a reportRef to be send as a parameter for r_r in ReportAction
      if(typeof additionalParams != "undefined" && additionalParams != null && typeof additionalParams["reportRef"]!= undefined && additionalParams["reportRef"] != null && additionalParams["reportRef"] != '')
      {
    	  dataParams["reportRef"] = additionalParams["reportRef"];
      }
      if(typeof printerName != "undefined"  && printerName != null && printerName != "")
      {
            dataParams["r_p"] = printerName;          
      }
      /**
       * [MarwanMaddah]
       * US #603605-Notification on Empty Advice Opening
       * in case the arg "reportEmptyConfirmMsg" or/and "reportEmptyInfoMsg" are available
       * will send the r_c_d = '1' to reportAction to return a JSON
       */
      if(typeof additionalParams != "undefined" && additionalParams != null 
    	 && (
    		  (typeof additionalParams["reportEmptyConfirmMsg"]!="undefined" && additionalParams["reportEmptyConfirmMsg"]!=null)
    		  ||
    		  (typeof additionalParams["reportEmptyInfoMsg"]!="undefined" && additionalParams["reportEmptyInfoMsg"]!=null)
    		  ||
    		  (typeof additionalParams["reportEmptyNoMsg"]!="undefined"&&additionalParams["reportEmptyNoMsg"]!=null)
    		)
    	 )
      {
    	  if(printReportAsPDF == "1")
          {
    		  var isEmptConfMsg = (typeof additionalParams["reportEmptyConfirmMsg"]!="undefined" && additionalParams["reportEmptyConfirmMsg"]!=null);
 		     var isEmptInfoMsg = (typeof additionalParams["reportEmptyInfoMsg"]!="undefined" && additionalParams["reportEmptyInfoMsg"]!=null);
 		     var isEmptNoMsg = (typeof additionalParams["reportEmptyNoMsg"]!="undefined"&&additionalParams["reportEmptyNoMsg"]!=null);
              
 		     if(isEmptConfMsg)
 		     {
 		    	 dataParams["r_e_cm"] = additionalParams["reportEmptyConfirmMsg"];
 		     }
 		     if(isEmptInfoMsg)
 		     {
                  dataParams["r_e_im"] = additionalParams["reportEmptyInfoMsg"];
 		     }
 		     if(isEmptNoMsg)
 		     {
                  dataParams["r_e_nm"]= additionalParams["reportEmptyNoMsg"];
 		     }
          }
          else
          {
        	  dataParams["r_c_d"] = "1";
        	  returnDataType = "json"
        	  _jsonReturn = true;
          }
      }
      _showProgressBar(true)
      var url = jQuery.contextPath +"/path/repCommon/reportAction_generateReport.action"
    //The customReportAction is used when extending the reportAction to apply CSM snapshot business
    //In case the customReportAction is not empty , it will be used in ajax post
      var isCustomreport = typeof additionalParams != "undefined" && additionalParams != null && typeof additionalParams["customReport"]!="undefined" && additionalParams["customReport"]!=null && additionalParams["customReport"]!="" && (true==additionalParams["customReport"] || "true"==additionalParams["customReport"]);
      var printCustAsPDF = typeof additionalParams != "undefined" && additionalParams != null && typeof additionalParams["printCustAsPDF"]!="undefined" && additionalParams["printCustAsPDF"]!=null && additionalParams["printCustAsPDF"]!="" && (true==additionalParams["printCustAsPDF"] || "true"==additionalParams["printCustAsPDF"]);
    if(isCustomreport)
    {
          if(typeof customReportAction != undefined && customReportAction != null && customReportAction != '')
          {
             url = jQuery.contextPath + customReportAction;
          }
          else
          {
        	 //in case if there is a customReport without customReportAction then this action will be executed
             url = jQuery.contextPath + "/path/reporting/commonCustomReportAction_generateCustomReport";
          }
          
    }
    //In case we need to add custom parameters into the extended action, a json object can be passed
    //The reports parameters will be merged to the custom parameters
    if(customReportParams != undefined && customReportParams != null)
    {
          dataParams = $.extend({}, dataParams, customReportParams);
    }
    
    //TP 858982 JAIZ190096, show report in case repViewPDF is passed and report format is pdf or html
    var reportFormatToShow = "N/A" ;
    if (typeof additionalParams != "undefined" && additionalParams != null && additionalParams['reportFormatToShow'] != undefined)
    {
    	// only filled if report format is PDF and  repViewPDF is provided in  additionalParams
    	reportFormatToShow = additionalParams['reportFormatToShow']; 
    }
    
    if((typeof customReportAction != undefined && customReportAction != null && customReportAction != '' && isCustomreport && !printCustAsPDF) || _jsonReturn || openInFrame || d_p == 0 
    		||   printReportAsPDF !== "1" || (printReportAsPDF === "1" && reportFormatToShow === "html") )
    	
    {
    	//do post
    	$.post(url,dataParams,function(HTML){
    		_showProgressBar(false);
    		if(_jsonReturn)
    		{
    			manageSuccessJSONReport({HTML:HTML,openWindow:openWindow,openInFrame:openInFrame,additionalParams:additionalParams,callSucc:callSucc,successArg:successArg,a_p:a_p,silentPrintParams:additionalPrintParams});	
    		}
    		else
    		{
    			manageSuccessHTMLReport(true,{HTML:HTML,openWindow:openWindow,openInFrame:openInFrame,additionalParams:additionalParams,callSucc:callSucc,successArg:successArg,a_p:a_p,silentPrintParams:additionalPrintParams});   	
    		}
    	},returnDataType).error(function() {
    		_showProgressBar(false);
    		if(errorFunc != null && errorFunc != undefined && jQuery.isFunction( errorFunc ))
    		{
    			if(errorArg != undefined && errorArg != null)
    			{
    				errorFunc(errorArg);
    			}
    			else
    			{     
    				errorFunc();
    			}
    		}                 
    		else if(typeof errorFunc != "undefined" && errorFunc != null)
    		{
    			if(errorArg != undefined && errorArg != null)
    			{
    				jQuery.globalEval( errorFunc + "(" + JSON.stringify(errorArg)+")");      
    			}
    			else
    			{
    				errorFunc = errorFunc.endsWith(")")?errorFunc:errorFunc.concat("()");
    				jQuery.globalEval( errorFunc);
    			}
    		}
    	});
    }
    else
    {
    	var timeStamp = new Date().getTime();
    	dataParams["repPrintPdf"] = 1;
    	var target = "_blank";
    	var $iframe, iFrameID = null, windowObject = null;
    	
    	if(openWindow)
    	{
    		target = new Date().getTime(); 
    		windowObject = window.open("", target, "status=0,title=0,height=600,width=800,scrollbars=1,resizable=yes");  
    	} else if(a_p == 1){        		
    		iFrameID = "tempPdfIframe"+timeStamp;
    		$iframe = $("<iframe id='"+iFrameID+"' name='"+iFrameID+"' align='middle' width='80%' height='500' >");
    		$iframe.hide();
    		$iframe.appendTo("body");
    		target = iFrameID;
    	}

		var repFormID = "tempPdfForm"+timeStamp;
    	var $form = $("<form id='"+repFormID+"' target='"+target+"' action='" + url
    					+ "' method='post'>" + formInnerHtml
    					+ "<input type='submit'>" + "</form>").appendTo("body");
    	
    	// if it needs to be opened in new window, we need to put target to _blank else we put the iframe as a target
    	var formInnerHtml = "";
    	for (var key in dataParams) {
    	    if (dataParams.hasOwnProperty(key)) {
    	    	$('<input>').attr({
    	    	    type: 'hidden',
    	    	    name: key,
    	    	    value: dataParams[key]
    	    	}).appendTo($form);
    	    }
    	}
    	$('<input>').attr({
    	    type: 'hidden',
    	    name: 'cookieStamp',
    	    value: timeStamp
    	}).appendTo($form);
    	$form.submit();
	
		/**
		 * 
		 */
    	var cookieName = "repPdfFileDownload";
    	var cookieSuccessValue = "true";
    	var cookieErrorValue = "false";
    	var cookiePath = "/";
    	_showProgressBar(false);
    	//check if the file download has completed every checkInterval ms
    	setTimeout(function(){checkFileDownloadComplete(timeStamp,repFormID,iFrameID,windowObject);}, 100);
    	function checkFileDownloadComplete(timeStamp, formId, iframeId, theWindowOpened)
    	{
    		//has the cookie been written due to a file download occuring?
    		if (document.cookie.indexOf(cookieName + timeStamp + "=" + cookieSuccessValue) != -1)
    		{
    			//remove the cookie and iframe
    			var date = new Date(1000);
    			if (document.cookie.indexOf(cookieName + timeStamp + "_NoData=true") != -1)
    			{
        			document.cookie = cookieName  + timeStamp + "_NoData=; expires=" + date.toUTCString()+ "; path=" + cookiePath;
    				if(theWindowOpened != null)
    				{
    					theWindowOpened.close();
    				}
    			}
    			document.cookie = cookieName  + timeStamp + "=; expires=" + date.toUTCString()+ "; path=" + cookiePath;
    			
    			if(callSucc != null && callSucc != undefined && jQuery.isFunction( callSucc ))
    		    { 
    		      if(successArg != undefined && successArg != null)
    		      {
    		         callSucc(successArg);
    		      }
    		      else
    		      {     
    		         callSucc();
    		      }
    		    }
    		    else if(typeof callSucc != "undefined" && callSucc != null && callSucc != '')
    		    {
    		    	//BBR14-UAT4-IRET- Printing report is not working in IRET -  BBRUP180897  
			    	if(successArg != undefined && successArg != null)
			    	{	
			    		jQuery.globalEval( callSucc + "(" + JSON.stringify(successArg)+")" );
			    	}
			    	else
			        {
			    		jQuery.globalEval(callSucc);              
			        }              
    		    }
            	setTimeout(function(){
            		if(iframeId != null)
            			{
                		$("#"+iframeId).remove();
            			}
            		}, 60000);
            	$("#"+formId).remove();
    			return;
    		}
    		else if (document.cookie.indexOf(cookieName  + timeStamp + "=" + cookieErrorValue) != -1)
    		{
    			//remove the cookie and iframe
    			var date = new Date(1000);
    			if (document.cookie.indexOf(cookieName + timeStamp + "_NoData=true") != -1)
    			{
        			document.cookie = cookieName  + timeStamp + "_NoData=; expires=" + date.toUTCString()+ "; path=" + cookiePath;
    				if(theWindowOpened != null)
    				{
    					theWindowOpened.close();
    				}
    			}
    			document.cookie = cookieName  + timeStamp + "=; expires=" + date.toUTCString()+ "; path=" + cookiePath;
    			
        		if(errorFunc != null && errorFunc != undefined && jQuery.isFunction( errorFunc ))
        		{
        			if(errorArg != undefined && errorArg != null)
        			{
        				errorFunc(errorArg);
        			}
        			else
        			{     
        				errorFunc();
        			}
        		}                 
        		else if(typeof errorFunc != "undefined" && errorFunc != null)
        		{
        			if(errorArg != undefined && errorArg != null)
        			{
        				jQuery.globalEval( errorFunc + "(" + JSON.stringify(errorArg)+")");      
        			}
        			else
        			{
        				errorFunc = errorFunc.endsWith(")")?errorFunc:errorFunc.concat("()");
        				jQuery.globalEval( errorFunc);
        			}   
        		}
            	setTimeout(function(){
            		if(iframeId != null)
            			{
                		$("#"+iframeId).remove();
            			}
            		}, 60000);
            	$("#"+formId).remove();     		
        		return;
    		}
    		//keep checking...
        	setTimeout(function(){checkFileDownloadComplete(timeStamp, formId, iframeId, theWindowOpened);}, 100);
    	}
    }
}

function manageSuccessJSONReport(args)
{
   var returnJsonData = args.HTML;	
   if(returnJsonData!="undefined" && returnJsonData!=null)
   {
	  var _toLogoutApp = false;
	  var _confirmationKey = report_Return_Data_key;
	  //if there is a custom report question to set the confirmation key else it will stay as default
	  if(typeof args.additionalParams!="undefined" && args.additionalParams!=null 
			   && typeof args.additionalParams["customReportDataQuestion"]!= undefined && args.additionalParams["customReportDataQuestion"] != null)
      {
		  _confirmationKey= args.additionalParams["customReportDataQuestion"];
      }
	  //in case is fromfinalsignoff to set the confirmationKey translation to finalsignoff and tologoutApp to true
	  if(typeof args.additionalParams!="undefined" && args.additionalParams!=null 
				   && typeof args.additionalParams["fromFinalSignOff"]!="undefined" && args.additionalParams["fromFinalSignOff"]!=null && args.additionalParams["fromFinalSignOff"])
	  {
		  _toLogoutApp = true;
		  _confirmationKey = finalSignOffChecking_key;
	  }
	  /**
	   * [MarwanMaddah]
	   * In Case of final sign off, the returned object will be activeTransCO
	   * else it will be reportOutputCO
	   */
	  var returnedJsonObject;
	  if(_toLogoutApp)
	  {		  
		  returnedJsonObject = returnJsonData["activeTransCO"]; 
	  }
	  else
	  {
		  returnedJsonObject = returnJsonData["reportOutputCO"];
	  }
	  /**
	   * 
	   */
	  if(returnedJsonObject.hasData)
	  {
		  args.HTML = returnedJsonObject.repStr;
		  /**
		   * if the question is empty we don't need to to ask the question directly we open the report else we take confirmation.
		   */ 
		  if(_confirmationKey === '')
		  {
			  manageSuccessHTMLReport(true,args);
		  }
		  else
		  {
			  _showConfirmMsg(_confirmationKey,confirm_msg_title,"manageSuccessHTMLReport",args);  
		  }
	  }
	  else
	  {
		    args.HTML = returnedJsonObject.repStr; 
			
				/**
				 * [MarwanMaddah]
				 * US #603605-Notification on Empty Advice Opening
				 * in case the arg reportEmptyConfirmMsg is available 
				 * that's mean a confirmation message will appear in case the report is empty
				 * and in case the arg reportEmptyInfoMsg is available, so an informative message will appear in case the report is empty 
				 * and in case the both args are available, the priority will be for the confirmation message.   
				 */
				if(typeof args.additionalParams!="undefined" && args.additionalParams!=null 
						&& typeof args.additionalParams["reportEmptyConfirmMsg"]!="undefined" && args.additionalParams["reportEmptyConfirmMsg"]!=null)
				{
					if(args.additionalParams["reportEmptyConfirmMsg"] !="" )
					{
						_showConfirmMsg(args.additionalParams["reportEmptyConfirmMsg"],confirm_msg_title,"manageSuccessHTMLReport",args);
					}
					else
					{						
						_showConfirmMsg(defEmptyRepConfirm_key,confirm_msg_title,"manageSuccessHTMLReport",args); 
					}
				}
				else if(typeof args.additionalParams!="undefined" && args.additionalParams!=null 
						&& typeof args.additionalParams["reportEmptyInfoMsg"]!="undefined" && args.additionalParams["reportEmptyInfoMsg"]!=null)
				{
					if(args.additionalParams["reportEmptyInfoMsg"] !="" )
					{						
						_showErrorMsg(args.additionalParams["reportEmptyInfoMsg"],info_msg_title);
					}
					else
					{
						_showErrorMsg(defEmptyRep_key,info_msg_title);
					}
					/**
					 * In case there is a callSucc it have to be executed with the information message in case the report content is empty
					 */
					if(typeof args.callSucc!="undefined" && args.callSucc!=null && args.callSucc!="")
					{
						var	_callSucc   = args.callSucc;
						var _successArg = args.successArg;
						
					    if(_callSucc != null && _callSucc != undefined && jQuery.isFunction(_callSucc))
					    {
					      if(_successArg != undefined && _successArg != null)
					      {
					    	  _callSucc(_successArg);
					      }
					      else
					      {     
					    	  _callSucc();
					      }
					    }
					    else if(typeof _callSucc != "undefined" && _callSucc != null && _callSucc != '')
					    {
					        //BBR14-UAT4-IRET- Printing report is not working in IRET -  BBRUP180897  
					    	if(_successArg != undefined && _successArg != null)
					    	{	
					    		jQuery.globalEval( _callSucc + "(" + JSON.stringify(_successArg)+")" );
					    	}
					    	else
					        {
					    		jQuery.globalEval(_callSucc);              
					        }
					    }
					}
				}
				
				if(typeof args.additionalParams!="undefined" && args.additionalParams!=null 
						&& typeof args.additionalParams["processAction"]!="undefined" && args.additionalParams["processAction"]!=null)
				{
					$.ajax({
						url: jQuery.contextPath+args.additionalParams["processAction"],
						type:"post",
						dataType:"json",
						data: {},
						success:function( data ){
							_showProgressBar(false);
							if(_toLogoutApp)
							{					
								/**
								 * [MarwanMaddah]: in case the final sign off process has been Done successfuly 
								 * the user will be logged out from application 
								 * @param {Object} confirmed
								 * @param {Object} args
								 */
								logoutApp();
							}
							
						}
					});
				}
	  }	  	  
   }
}
function manageSuccessHTMLReport(confirmed,args)
{
	if(confirmed)
	{
		var HTML             = args.HTML;
		var	openWindow       = args.openWindow;
		var	openInFrame      = args.openInFrame;
		var	additionalParams = args.additionalParams;
		var	callSucc         = args.callSucc;
		var successArg       = args.successArg;
		var a_p              = args.a_p;
		//654601 get the silent print params
		var silentPP		 = args.silentPrintParams;
		
	    if(openWindow)
	    {
	          //Create a new date and use date.getTime() to get milliseconds as unique window id
	          var dateTimeId = new Date();
	          var WindowObject = window.open("", dateTimeId.getTime(), "width=950,height=750,top=50,left=50,scrollbars=yes,menubar=yes,resizable=yes");
	          if(WindowObject != undefined && WindowObject != null)
	          {     
	                WindowObject.document.writeln(HTML);
	                WindowObject.focus();
	                if(a_p == 1)
	                {
	                	// if this "WindowObject.document.close()" not available then print popup will not appear
	                      WindowObject.document.close();
	                   // The fix below is only for chrome is the issue appears only on chrome browser
							// This issue is related to image not loading properly before print preview is show
							// the on load event will wait for image to properly load then fire the windowObject.print
							// but on chrome 49 the on load event is not being fired unless there is img tag in html
							if ($.browser.chrome && $(HTML).find("img").length > 0) {
									WindowObject.addEventListener('load', function() {
										WindowObject.print();
									});
							} else {
	
									WindowObject.print();
							}
	                }
	                    
	          }    
	    }
	    else if(openInFrame)
		{
			var iframe = document.getElementById(additionalParams['openinIframe']);
			iframe = (iframe.contentWindow) ? iframe.contentWindow : (iframe.contentDocument.document) ? iframe.contentDocument.document : iframe.contentDocument;
			iframe.document.open(); 
			iframe.document.writeln(HTML);
			iframe.document.close();
		}
		//654601 call silent print from ActiveX
	    else if(a_p == 1 && !silentPP.noClientActivexPrint && $.browser.msie) // print if automatic print enabled and no server side printing issued
	    {
		    silentActiveXPrint({reportContent:HTML, nbrOfCopies:silentPP.nbCopiesToPrint});
	    }
	    else if(a_p == 1 && !silentPP.noClientActivexPrint && !$.browser.msie)
	    {
			_showErrorMsg("Error printing advice, Could not find any defined printer, please check with Administrator.");	    	
	    }
	    if(callSucc != null && callSucc != undefined && jQuery.isFunction( callSucc ))
	    {
	      if(successArg != undefined && successArg != null)
	      {
	         callSucc(successArg);
	      }
	      else
	      {     
	         callSucc();
	      }
	    }
	    else if(typeof callSucc != "undefined" && callSucc != null && callSucc != '')
	    {
	    	//BBR14-UAT4-IRET- Printing report is not working in IRET -  BBRUP180897  
	    	if(successArg != undefined && successArg != null)
	    	{	
	    		jQuery.globalEval( callSucc + "(" + JSON.stringify(successArg)+")" );
	    	}
	    	else
	        {
	    		jQuery.globalEval(callSucc);              
	        }
	    }
	}
}

/**
 * This function will be called on the print button of the dynamic report execution screen
 * It will print the report retrieved in the iframe of the same screen
 * can be used for any Iframe contetn Printing
*/
function common_printFrameContents(frameId) 
{
	var frm = document.getElementById(frameId);
	if(frm)
	{
		frm = frm.contentWindow;
		frm.focus();// focus on contentWindow is needed on some ie versions
		frm.print();
	}
	else
	{
		_showErrorMsg("Error in Locating Frame with Id "+frameId+", Contact Administrator");
	}
}
/**
 * downloads advices 
 * @param {Object} reportReference, reference of report
 * @param {Object} params, ~#~ separated list of ordered parameter values 
 * @param additionalParams array of parameters [to specify the Format var_format neet to be set for example]
 * @param successArg Arguments to be passed to the callSucessFunc incase it si a function
 */
function openAdviceReportWithRef(reportReference, params, callSucc,additionalParams,successArg)
{
	_showProgressBar(true);
	var url = jQuery.contextPath +"/path/repCommon/reportAction_generateReport.action";
	var dataParams = {};
   	dataParams["r_r"] = reportReference;
   	dataParams["d_p"] = 0;
   	dataParams["a_p"] = 0;
    dataParams["r_a_p"] =params;
    
    //BMOUPI180118 624193 function to call on success of the download of the report
    var successMsgFuncFileOnDownload = "";
    
    // if additional parameters provided
    if(additionalParams != undefined && additionalParams != null)
    {
    	successMsgFuncFileOnDownload = additionalParams["successMsgFuncFileOnDownload"];
    	// delete the property from additional param not to send to the server with post parameters
    	delete additionalParams["successMsgFuncFileOnDownload"];
    	dataParams = $.extend({}, dataParams, additionalParams);
    }
    $.fileDownload(url, {
		   	successCallback: function (url) {
    	 		_showProgressBar(false);
    	 		
    	 		// BMOUPI180118 624193 check if the success Download Function is provided then need to call it
    	 		if(typeof successMsgFuncFileOnDownload != "undefined" && successMsgFuncFileOnDownload != null && successMsgFuncFileOnDownload != "")
	 			{
    	 			if(jQuery.isFunction(successMsgFuncFileOnDownload))
    	 			{
    	 				successMsgFuncFileOnDownload();
    	 			}
    	 			else
    	 			{
    	 				jQuery.globalEval(successMsgFuncFileOnDownload);
    	 			}
	 			}
    	 		
    	 		if(typeof callSucc != "undefined" && callSucc != null)
	 			{
    	 			//CDMI170432 TP603899 to pass successArg to the method and call functiona accordingly
	 				if(jQuery.isFunction(callSucc))
	 				{
	 					if(typeof successArg != "undefined" && successArg != null)
	 					{
	 						callSucc(successArg);
	 					}
	 					else
	 					{
	 						callSucc();
	 					}
	 				}      
	 				else
	 				{
	 					jQuery.globalEval(callSucc);
	 				}

	 			}
	    },
 	    	failCallback: function (html, url) {	
	    		_showProgressBar(false);
	        	_showErrorMsg(html);  
	    },
	     	data:dataParams
		});
}

/**
 * return Max Z-index in the Document
 */
returnDocMaxZIndex = function () {
    var zIndex,
        z = 0,
        all = document.getElementsByTagName('*');
    for (var i = 0, n = all.length; i < n; i++) 
    {
        zIndex = document.defaultView.getComputedStyle(all[i],null).getPropertyValue("z-index");
        zIndex = parseInt(zIndex, 10);
        z = (zIndex) ? Math.max(z, zIndex) : z;
    }
    return z;
};
/**
 * Open the language popup to select the advice language
 * The result is returned in args.selectedLanguage
 * @param {Object} callBackFunc
 * @param {Object} args
 */
function chooseReportLanguage(callBackOkFunc,okArgs,callBackCancelFunc,cancelArgs)
{
	
	// TP 733142 BBRUP180701  make the languages to be dynamic
	var listLangs = cachePathData("systemLangs");
	if(!listLangs)
	{
		$.ajax({
			url: jQuery.contextPath+ "/path/customization/CustomizationMaint_loadLanguageSelect",
	  		type:"post",
	  		dataType:"json",
	  		success: function(data)
	  		{
				_showProgressBar(false);
				if(data["_error"] == null)
				{
					// this is array of available languages in the system
					var availLang = data["languageSelect"];
					cachePathData("systemLangs",availLang);
					constructLangPopup(availLang,callBackOkFunc,okArgs,callBackCancelFunc,cancelArgs);
				}
			}
		})
	}
	else
	{
		constructLangPopup(listLangs,callBackOkFunc,okArgs,callBackCancelFunc,cancelArgs);
	}
	
	/*
	 * #BUG TP ID = 846051 , TP DESC =  FIX  #846051 BBRUP180909 - IJPU-5218- cheque book request. moving all the code to the internal method constructLangPopup()
	 *  and provide this method with the same arguments provided initially to chooseReportLanguage(callBackOkFunc,okArgs,callBackCancelFunc,cancelArgs), 
	 *  because when calling this method in parallel to print 2 reports simultaneously the callBackOkFunc is cached and binded to the OK button from 
	 *  the first call and is called and used in second report which is wrong.
	 * */
	constructLangPopup = function(listOfLangs,callBackOkFunc,okArgs,callBackCancelFunc,cancelArgs)
	{
		// TP 747718 check if there is MsgBox displayed or any other dialogs to show it above the msg Box
		var dialogZInx = returnDocMaxZIndex();
		// in case max allowed number returned for any reason
		if(dialogZInx >= 2147483000)
		{
			dialogZInx = 2000000;
		}
		dialogZInx = dialogZInx+1;
		_showProgressBar(true);
		
		var chooseLanguageDivId = "chooseLanguageDivId";
		//To be translated
		var englishTitle = english_key;
		var arabicTitle = arabic_key;
		var frenchTitle = french_key;
		var dialogTitle = choose_language_key;
		var okButtonTitle = ok_label_trans;
		var cancelButtonTitle = cancel_label_trans;
		
		
		var returnedCallingOkFunc = callBackOkFunc;
		if(!okArgs)
		{
			okArgs = {};
		}
		if(!jQuery.isFunction( callBackOkFunc ) && callBackOkFunc != null && callBackOkFunc != undefined && callBackOkFunc != '')
		{
			returnedCallingOkFunc = ( function(){okArgs.selectedLanguage = $('#chooseLanguageDivId input[@name=language]:checked').val(); $("#chooseLanguageDivId").dialog("destroy"); $("#chooseLanguageDivId").remove(); jQuery.globalEval( callBackOkFunc + "(" + JSON.stringify(okArgs)+")" );  });
		}
		else if(callBackOkFunc != null && callBackOkFunc != undefined && jQuery.isFunction( callBackOkFunc ))
		{
			returnedCallingOkFunc = ( function(){okArgs.selectedLanguage = $('#chooseLanguageDivId input[@name=language]:checked').val(); $("#chooseLanguageDivId").dialog("destroy"); $("#chooseLanguageDivId").remove(); callBackOkFunc(okArgs); });
		}
		
		var returnedCallingCancelFunc = callBackCancelFunc;
		if(!cancelArgs)
		{
			cancelArgs = {};
		}
		if(!jQuery.isFunction( callBackCancelFunc ) && callBackCancelFunc != null && callBackCancelFunc != undefined && callBackCancelFunc != '')
		{
			returnedCallingCancelFunc = ( function(){cancelArgs.cancelAction = true; $("#chooseLanguageDivId").dialog("destroy"); $("#chooseLanguageDivId").remove(); jQuery.globalEval( callBackCancelFunc + "(" + JSON.stringify(cancelArgs)+")" );  });
		}
		else if(callBackCancelFunc != null && callBackCancelFunc != undefined && jQuery.isFunction( callBackCancelFunc ))
		{
			returnedCallingCancelFunc = ( function(){cancelArgs.cancelAction = true; $("#chooseLanguageDivId").dialog("destroy"); $("#chooseLanguageDivId").remove(); callBackCancelFunc(cancelArgs); });
		}
		
		var okButton = '<a id="chooseLanguageDivId_okButton" ' +
							'href="#" ' +
							'id="okButton" ' +
							'class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" ' +
							'role="button">' +
							'<span class="ui-button-text">' + okButtonTitle +'</span>' +
							'</a>';
		
		var cancelButton = '<a id="chooseLanguageDivId_cancelButton" ' +
							'href="#" ' +
							'id="cancelButton" ' +
							'class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" ' +
							'role="button">' +
							'<span class="ui-button-text">' + cancelButtonTitle +'</span>' +
							'</a>';
		
		var dialogHeight = 80;
		var chooseLanguageDivContent = "<div id='"+ chooseLanguageDivId +"'><table>";
		if(listOfLangs)
		{
			var countLangs = 0; var rowsOpened = 0;
			for(var i=0; i<listOfLangs.length; i++)
			{
				var currLang = listOfLangs[i];// this is JSON object {code:'EN',descValue:'English'}
				var langCode = currLang["code"];
				if(langCode !== "-1")
				{
					if(countLangs % 3 == 0) // Every 3 languages on the same Row
					{
						chooseLanguageDivContent += "<tr>";
						dialogHeight += 20;
						rowsOpened++;
					}
					chooseLanguageDivContent += "<td><input type='radio' name='language' value='"+langCode+"'";
					// select the current user language (global variable) if available, or first language is no user language defined.
					if((typeof userLangVar != undefined && userLangVar === langCode) 
						|| (typeof userLangVar === undefined && countLangs == 0))
					{
						chooseLanguageDivContent += " checked='checked'";
					}
					chooseLanguageDivContent += ">" + currLang["descValue"] +"</td>";
					if(countLangs % 3 == 2) // close the TR when 3 elements passed
					{
						chooseLanguageDivContent += "</tr>";
						rowsOpened--;
					}
					countLangs++;
				}
				
			}
			
			if(rowsOpened > 0)// close tr if it is not closed in above loop
			{
				chooseLanguageDivContent += "</tr>";
			}
		}
		else
		{// in case tehre is not languages defined
			chooseLanguageDivContent = "<tr><td><input type='radio' name='language' value='EN' checked='checked'>" + englishTitle +"</td>"+
			"<td><input type='radio' name='language' value='AR'>" + arabicTitle+ "</td>"+
			"<td><input type='radio' name='language' value='FR'>"+ frenchTitle +"</td></tr>";
			dialogHeight = 100;
		}
		chooseLanguageDivContent += "<tr align='center'><td colspan=2>"+okButton+"</td><td>"+cancelButton+"</td></tr>"+
									"<table></div>";
		
		var chooseLanguageDivElement = $(chooseLanguageDivContent);
		
		if($("#" + chooseLanguageDivId) && $("#" + chooseLanguageDivId).attr('id') != undefined)
		{
			$("#" + chooseLanguageDivId).dialog("destroy");
			$("#" + chooseLanguageDivId).remove();
		}
		
		$('body').append(chooseLanguageDivElement);
		chooseLanguageDivElement.dialog({
										modal : true,
										title : dialogTitle,
										autoOpen : false,
										//show : 'slide',
										position : 'center',
										width : '250',
										height : dialogHeight+'',
										zIndex: dialogZInx,
										close : function() {
											
											if(returnedCallingCancelFunc && jQuery.isFunction(returnedCallingCancelFunc))
											{
												returnedCallingCancelFunc();	
											}
											if($("#chooseLanguageDivId"))
											{
												$("#chooseLanguageDivId").dialog("destroy");
												$("#chooseLanguageDivId").remove();
											}
											
										},
										open : function() {
											if(returnedCallingOkFunc && jQuery.isFunction(returnedCallingOkFunc))
											{
												$('#chooseLanguageDivId_okButton').bind('click',returnedCallingOkFunc);	
											}
											if(returnedCallingCancelFunc && jQuery.isFunction(returnedCallingCancelFunc))
											{
												$('#chooseLanguageDivId_cancelButton').bind('click',returnedCallingCancelFunc);	
											}
											else
											{
												$('#chooseLanguageDivId_cancelButton').bind('click',function(){$('#chooseLanguageDivId').dialog('close');});	
											}
											_showProgressBar(false);
										}
									});
		
		$(chooseLanguageDivElement).dialog("open");
	}
}



/*********************************************** Open multiple advices *****************************************************************/

function openMultipleAdviceCallNextFunc(paramObj)
{
   var nextFunc = paramObj.nextFunc;
   var nextFuncArgs = paramObj.nextFuncArgs;
   if( nextFunc != undefined && nextFunc != null)
   {
          if(jQuery.isFunction(nextFunc))
          {
                 if(nextFuncArgs != undefined && nextFuncArgs != null)
                 {
                       nextFunc(nextFuncArgs);
                 }
                 else
                 {
                       nextFunc();
                 }
          }
          else if(typeof nextFunc == 'string' && nextFunc != '')
          {
                 if(nextFuncArgs != undefined && nextFuncArgs != null)
                 {
                       window[nextFunc](nextFuncArgs);
                 }
                 else
                 {
                       window[nextFunc]();
                 }
          }
   }
}

function openMultipleAdviceCallBackFunc(paramObj)
{
	var callBackFunc = paramObj.callBackFunc;
	var callBackFuncArgs = paramObj.callBackFuncArgs;
	
	if( callBackFunc != undefined && callBackFunc != null)
	{
		if(jQuery.isFunction(callBackFunc))
		{
			if(callBackFuncArgs != undefined && callBackFuncArgs != null)
			{
				callBackFunc(callBackFuncArgs);
			}
			else
			{
				callBackFunc();
			}
		}
		else if(typeof callBackFunc == 'string' && callBackFunc != '')
		{
			if(callBackFuncArgs != undefined && callBackFuncArgs != null)
			{
				window[callBackFunc](callBackFuncArgs);
			}
			else
			{
				window[callBackFunc]();
			}
		}
	}
}

function openMultipleAdviceLanguage(paramObj)
{
	if(paramObj.selectedLanguage)
	{
		paramObj.shouldSelectLanguage = false;
		//NABIL FEGHALI - BB120129 - YMC FORMS
		paramObj.selectLangBeforeConf = false;
		if(paramObj.selectedLanguage != undefined && paramObj.selectedLanguage != null)
		{
			if('EN' == paramObj.selectedLanguage || 'FR' == paramObj.selectedLanguage)
			{
				paramObj.confirmMessage = paramObj.confirmMessageEng;
			}
			else if('AR' == paramObj.selectedLanguage)
			{
				paramObj.confirmMessage = paramObj.confirmMessageArab;
			}
		}	
		//NABIL FEGHALI - END - BB120129 - YMC FORMS
		openMultipleAdvice(paramObj);
	}
	else if(paramObj.cancelAction)
	{
		openMultipleAdviceCallNextFunc(paramObj);
	}
}

function openMultipleAdviceConfirm(confirm,paramObj)
{
	if(confirm)
	{
		paramObj.confirmMessageShown = true;
		openMultipleAdvice(paramObj);
	}
	else
	{
		openMultipleAdviceCallNextFunc(paramObj);
	}
}


function printSingleAdvice(reportResponse,callBackFunc,callBackArgs,forceCallBack, additionalParams)
{
	if(reportResponse)
	{
		var params = reportResponse.reportParams;
		var reportId = reportResponse.reportId;
		var reportRef = reportResponse.reportRef;
		var autoPrint = reportResponse.autoPrint;
		var printerName = reportResponse.printerName;
		var language = reportResponse.reportLanguage;
		var nbr_copies = reportResponse.nbrCopies;
 		
		//Selecting report Id and report params by selected language
		if(reportResponse.selectReportLanguage != undefined 
				&& reportResponse.selectReportLanguage != null 
				&& reportResponse.selectReportLanguage == true)
		{	
			if('EN' == language || 'FR' == language)
			{
				reportId = reportResponse.engReportId;
				params = reportResponse.engReportParams;
				if (reportResponse.engNbrCopies	!= undefined && reportResponse.engNbrCopies	 != null)	
				{
                   nbr_copies = reportResponse.engNbrCopies;
				}
			}
			else if('AR' == language)
			{
				reportId = reportResponse.arabReportId;
				params = reportResponse.arabReportParams;
				if (reportResponse.arabNbrCopies != undefined && reportResponse.arabNbrCopies != null)	
				{
					nbr_copies = reportResponse.arabNbrCopies;
				} 
			}
		}
		
		if(autoPrint != undefined && ( autoPrint == 'true' || autoPrint == true ))
		{
			//654601 set number of copies and printer name
			if( glbl_showPrintPreviewDialog !== 'Y' || (nbr_copies != undefined && nbr_copies != null))
			{
				autoPrint = {'autoPrint':1};
				if(printerName != undefined && printerName != null && printerName != '')
				{
					autoPrint.printerName = printerName;
				}
				//DB190090  896875 Filling number of copies to be printed in all cases whether silent print or with print Preview
				if(nbr_copies != undefined && nbr_copies != null)
				{
					autoPrint.nbCopiesToPrint = nbr_copies;
				}
			}
		}
		var isRepRefProvided =  (reportRef != null && reportRef != undefined && reportRef != '');
		var isRepIdProvided = (reportId != null && reportId != undefined);
		if( isRepRefProvided || isRepIdProvided)
		{
			// check if need to check for report format and accordingly to download the report of open it
			var chekForRepFmt  = false;
			if(reportResponse.chekForRepFmt)
			{
				chekForRepFmt = true;
			}
			
			//CDMI170432 TP603899
			if(chekForRepFmt)
			{
				// check in case additional params are not provided
				if(typeof additionalParams === "undefined" || additionalParams == null)
				{
					additionalParams = {};
				}
				
				// if report is called by id then set a flag to be able to return the format by report id
				var repRefOrRepId = reportRef;
				if(isRepIdProvided)
				{
					additionalParams["repFmtByRepId"] = "1";
					if(reportResponse.repFmtByOldRepId)
					{
						additionalParams["repFmtByOldRepId"] = "1";
					}
					repRefOrRepId = reportId;
				}
				
				//BMOUPI180118 624193 check if the on success download of report Message Function is provided then set it to the additionalParams
				if(reportResponse.successMsgFuncFileOnDownload != undefined && reportResponse.successMsgFuncFileOnDownload != "undefined"
					&& reportResponse.successMsgFuncFileOnDownload != null && reportResponse.successMsgFuncFileOnDownload != "")
				{
					additionalParams["successMsgFuncFileOnDownload"] = reportResponse.successMsgFuncFileOnDownload;
				}
				openPreviewAdviceRepDefaultFrmt(repRefOrRepId,params,autoPrint, callBackFunc,callBackFunc,language, callBackArgs, callBackArgs, null, null, null,additionalParams);
			}
			else
			{
				if(isRepRefProvided)
				{
					openPreviewAdvice(reportRef, params,autoPrint, callBackFunc,callBackFunc,language,callBackArgs,callBackArgs, null, null, null, additionalParams);
				}
				else
				{
					openPreviewAdviceWithId(reportId, params,autoPrint, callBackFunc,callBackFunc,language,callBackArgs,callBackArgs,null ,null, additionalParams);
				}
			}
		}
		else if(forceCallBack != undefined && forceCallBack == true && callBackFunc != null && callBackFunc != undefined && callBackFunc != '')
		{
			eval(callBackFunc);			
		}
		
	}
}

function openMultipleAdvice(paramObj)
{
	var confirmMessage = paramObj.confirmMessage;
	var confirmMessageShown = paramObj.confirmMessageShown;
	var shouldSelectLanguage = paramObj.shouldSelectLanguage;
	var selectedLanguage = paramObj.selectedLanguage;
	var callBackFunc = paramObj.callBackFunc;
	if($.isFunction( callBackFunc ))
	{
		paramObj.callBackFunc = returnFuncName(paramObj.callBackFunc);
	}
	
	var callBackFuncArgs = paramObj.callBackFuncArgs;
	var nextFunc = paramObj.nextFunc;
	var nextFuncArgs = paramObj.nextFuncArgs;
	var atLeastOneProcessed = paramObj.atLeastOneProcessed;
	var askLangByReport = paramObj.askLangByReport;
	var reportsObjArray = paramObj.reportsObjArray;
	//NABIL FEGHALI - BB120129 - YMC FORMS
	var selectLangBeforeConf = paramObj.selectLangBeforeConf;
	
	if(reportsObjArray != undefined && reportsObjArray != null && reportsObjArray.length > 0)
	{
	
		if(askLangByReport == true && ( paramObj.selectedLanguage == undefined || paramObj.selectedLanguage == null || paramObj.selectedLanguage == '') )
		{
			shouldSelectLanguage = true;
		}	
	
		if(confirmMessage != undefined && confirmMessage != null && confirmMessage != ''
		&& confirmMessageShown != undefined && confirmMessageShown != null && confirmMessageShown == false
		&& (selectLangBeforeConf == undefined || selectLangBeforeConf == null || selectLangBeforeConf == false))//NABIL FEGHALI - BB120129 - YMC FORMS
		{
			_showConfirmMsg(confirmMessage,'','openMultipleAdviceConfirm',paramObj);
			return;
		}
	
		if( /* (selectedLanguage == undefined || selectedLanguage == null || selectedLanguage == '') &&*/ 
	     ( shouldSelectLanguage == true /* || askLangByReport == true*/ ) )
		{
			chooseReportLanguage(openMultipleAdviceLanguage,paramObj,openMultipleAdviceLanguage,paramObj);
			return;
		}
	
		atLeastOneProcessed = true;
		paramObj.atLeastOneProcessed = true;
		var reportResponse = reportsObjArray.pop();
		if(paramObj.selectedLanguage != undefined && paramObj.selectedLanguage != null && paramObj.selectedLanguage != '')
		{
			reportResponse.reportLanguage = paramObj.selectedLanguage;
		}	
		if(paramObj.askLangByReport == true)
		{
			paramObj.selectedLanguage = '';
		}	
		
		//Antonella    #679062 DASI180250 - error in automatic generation of advise with PDF as format
        //copy of Bug#603899 CDMI170432 10/01/2018
        if(paramObj.chekForRepFmt != undefined && paramObj.chekForRepFmt != null && paramObj.chekForRepFmt != '')
        {
             reportResponse.chekForRepFmt = paramObj.chekForRepFmt;
        }
        if(paramObj.repFmtByOldRepId != undefined && paramObj.repFmtByOldRepId != null && paramObj.repFmtByOldRepId != '')
        {
             reportResponse.repFmtByOldRepId = paramObj.repFmtByOldRepId;
        }
        if(paramObj.successMsgFuncFileOnDownload != undefined && paramObj.successMsgFuncFileOnDownload != null && paramObj.successMsgFuncFileOnDownload != '')
        {
             reportResponse.successMsgFuncFileOnDownload = paramObj.successMsgFuncFileOnDownload;
        }
        //654601 set the number of copies
        if(paramObj.nbrCopies != undefined && paramObj.nbrCopies != null && paramObj.nbrCopies != '')
        {
             reportResponse.nbrCopies = paramObj.nbrCopies;
        }
        if(paramObj.engNbrCopies != undefined && paramObj.engNbrCopies != null && paramObj.engNbrCopies != '')
        {
             reportResponse.engNbrCopies = paramObj.engNbrCopies;
        }
        if(paramObj.arabNbrCopies != undefined && paramObj.arabNbrCopies != null && paramObj.arabNbrCopies != '')
        {
             reportResponse.arabNbrCopies = paramObj.arabNbrCopies;
        }

        var addParams = {};
        if(paramObj.additionalParams != undefined && paramObj.additionalParams != null && paramObj.additionalParams != '')
        {
        	addParams = paramObj.additionalParams;
        }
        //BBR14-UAT4-IRET- Printing report is not working in IRET -  BBRUP180897  
		printSingleAdvice(reportResponse,'openMultipleAdvice',paramObj,null,addParams);
		return;
	}
	
	if(reportsObjArray != undefined && reportsObjArray != null && reportsObjArray.length <= 0 && atLeastOneProcessed == true)
	{
		openMultipleAdviceCallBackFunc(paramObj);
		openMultipleAdviceCallNextFunc(paramObj);
		return;
	}	
	
	if( (reportsObjArray == undefined || reportsObjArray == null || reportsObjArray.length <= 0)
			|| (atLeastOneProcessed == undefined || atLeastOneProcessed == null || atLeastOneProcessed == false))
	{
		openMultipleAdviceCallNextFunc(paramObj);
		return;
	}
}


/**
 * Print a jquery grid 
 * @param String gridId 
 * @param String title - title of the report.If no title is provided the grid title is taken
 * @param array removeColArr - ["columnName1","columnName2"] Array of columns which needs to be excluded from the print
 * @param String htmlPrependToGrid - Well Formed HTML String to be prepended before the Grid (<div>Details For <br/>MyGrid</div>) 
 */
function printGrid(gridId,title,removeColArr,htmlPrependToGrid){
	var prtDiv =$('#prt-container');// empty the print div container.
	var pgTitle = "";
    if(prtDiv.length){        
    	prtDiv.empty();
    }
    else{    	
	    prtDiv = $('<div id="prt-container"></div>');
	    prtDiv.appendTo('body');
    }
    // prepend the additional HTML before the Grid in printable container.
    if(htmlPrependToGrid && htmlPrependToGrid != null)
    {
    	$(htmlPrependToGrid).appendTo(prtDiv);
    }
    
   $('#gview_'+gridId).clone().appendTo(prtDiv).css({'page-break-after':'auto'});
   $('#prt-container div').css({'height':'auto'}) 
   
   var pgTitle = ((title==undefined||title==null)?$(prtDiv).find(".ui-jqgrid-title").html():title); 
   $('#prt-container div').remove('.ui-jqgrid-toppager,.ui-jqgrid-titlebar,.ui-jqgrid-pager');   
   prtDiv.find('.ui-jqgrid-btable').prepend(prtDiv.find('.ui-jqgrid-htable thead'));//adding the header from the header table to content table due to alignment issue while removing columns.   
   prtDiv.find('.ui-jqgrid-htable thead').remove();//removing the header from grid
   prtDiv.find(".jqgfirstrow").remove(); //removing the line in between header and rows
  
   if(removeColArr!=undefined||removeColArr!=null){
	   var column = "";
	   $.each(removeColArr, function(index, value) {
	 	 column = gridId+'_'+value   
	   	 prtDiv.find("th[id='"+column+"']").remove();
	   	 prtDiv.find("td[aria-describedby='"+column+"']").remove();
		});    
   }
   prtDiv.printElement({ printContainer:"prt-container",pageTitle:pgTitle,leaveOpen:true,printMode:'popup', overrideElementCSS:[jQuery.contextPath+'/common/style/print/print-grid.css']});
}


function switchView(homeURL)
{
	if($("#dashTable").html() == null)
	{//open dashboard view
		document.location.href = jQuery.contextPath+"/pathdesktop/dashboard.action";
	}
	else 
		document.location.href = jQuery.contextPath+"/"+homeURL;
}


 function toggleEltDescriptionDiv(parentId)
 {
	 var divId = "txtarea_"+parentId;
	 var $div = $("#"+divId);
	 var theInpt = $("#"+parentId)
	 if($div.html() == null )
	 {
		 var divHtml = "<div id='txtarea_"+parentId+"' onmouseout='popup_close(event, this)' style='display:none' >"+
		 "<fieldset class='ui-corner-all' style='height:40px;color:#362b36;background:#F1F1F1'>" +
		 "<legend style='color:#362b36;border:0;background:#F1F1F1;'><label labelKey='description_label_key'>"+description_label_key+"</label></legend>"+
		 "<div style='height:35px;width:380px;overflow:auto;'>"+
		 "<table width='100%' cellpadding='1' cellspacing='2'><tr><td>"+theInpt.attr("descriptionKey")+"</td></tr></table>" +
		 "</div>"+
		 "</fieldset></div>"
		 $("body").append(divHtml);
		 $div = $("#"+divId);
	 }
 	if($div.is(":hidden"))
  	{
      	var rightLeft;
  		var height = theInpt.offset().top - $div.height();
  		$div.css("width","400px");
		$div.css("position","absolute");
	    $div.css("display","block");
	    $div.css("top",height);
	    $div.css("z-index","1000");
	    var rightLeft;
      	if(document.dir == "rtl")
		{
			rightLeft = theInpt.offset().left -1;
	  	}
		else
	  	{
			rightLeft = theInpt.offset().left ;// + theInpt.width() -  $div.width()  ;
		}
	    $div.css("left",rightLeft);
	    $div.css("display","");
	    $div.addClass("path-description") 
	}
 }
 
  
 function updateUserDefaultDisplayPage(from)
 {
//	_showProgressBar(true);
	var $current = $(document.getElementById("chk_layout_default"));
	//BUG 519823 handle click on label
	if(from == 'label')
	{
		 if($current.is(":checked"))
			 {
			 $current.attr('checked', false); // Unchecks it
			 }
		 else
			 {
			 $current.attr('checked', true); // Checks it
			 }
	}
	var valOpt = $current.attr("valOpt").split(":"); 
	var checkValue;
	if($current.is(":checked"))
		{
		checkValue = valOpt[0];
		}
	else
		{
		checkValue = valOpt[1];
		}
    var updates = {defaultDisplayPage: checkValue}
	$.ajax({
				url: jQuery.contextPath+ "/pathdesktop/portalDashboardAction_updateUserDefaultDisplayPage",
		  		type:"post",
		  		dataType:"json",
		  		data: updates,
		  		success: function(data)
		  		{
//					_showProgressBar(false);
				}
  		})
 }
 var _originalPageRef;// global variable to store original pageRef

/** Path Solutions [Libin]
 * Method to call on beforeDepEvent of dependency for screens with custom pageRef to work
 * It will set custom pageRef globally and store original pageRef
 */
function setCustomPageRefToSession(_screenRef)
{
	_originalPageRef = _pageRef;
	_pageRef = _screenRef;// custom pageRef
}
/** Path Solutions [Libin]
 * Method to call on afterDepEvent of dependency for screens with custom pageRef to work
 * It will reset the original pageRef globally
 */
function reSetOriginalPageRefToSession(_screenRef)
{
	_pageRef = _originalPageRef;
}


/**
 * return the inputValue with CR/DR based on the sign of the value  
 * @param {Object} cellValue
 * @param {Object} decimalPoints
 * @return {TypeName} 
 */

function numberFmatterDRCR(inpValue, decimalPoints)
{
	if(inpValue === null || inpValue === ""  || typeof inpValue == "undefined")
		return " ";
	
	var suffix = "";
	if(unformatNumber(inpValue) > 0)
		suffix = dr_suffix_key_trans;
	else 
		suffix = cr_suffix_key_trans;
	
	var formattedValue = inpValue;
	if(decimalPoints!=null && typeof decimalPoints!="undefined" && decimalPoints !="")
	{
	   formattedValue = $.formatNumberNumeric(inpValue, {format: returnNbFormat(decimalPoints)}); 	
	}
	
	var res = formattedValue+" "+suffix;
	res = res.replace("-","");
	return res;
}

/**
 * return the inputValue with brackets based on the sign of the value  
 * @param {Object} cellValue
 * @param {Object} decimalPoints
 * @return {TypeName} 
 */
function numberFmatterBrackets(inpValue, decimalPoints)
{
	if(inpValue ===null || typeof inpValue ==="undefined" || inpValue ==="")
		return "";
	
	var formattedValue = inpValue;
	
	if(decimalPoints!=null && typeof decimalPoints!="undefined" && decimalPoints !="")
	{
	   formattedValue = $.formatNumberNumeric(inpValue, {format: returnNbFormat(decimalPoints)}); 	
	}
	
	formattedValue = formattedValue.toString();
	if(formattedValue.indexOf("-") > -1)
	{
	    formattedValue = "("+formattedValue.replace("-","")+")";	
	}
	return formattedValue;
}


function showAnchorError()
{
	_showErrorMsg("Invalid characters found in OPT Reference")
}
/**
 * [MarwanMaddah]:used to add the paramsList to rowContent array in case of GridColumn with type='dialog' 
 * @param {Object} paramList
 * @param {Object} myData
 * @return {TypeName} 
 */
function returnParamListValues(paramList,myData){
	var theVal = null;
		var arrMain=paramList.split(",");
		var arrMainLeng = arrMain.length;
		if(arrMainLeng>0)
		{
			for(var i=0;i<arrMainLeng;i++)
			{
				theVal = returnHtmlEltValue(arrMain[i].split(":")[1]);
				if(theVal!=null && theVal !="" && theVal !="undefined")
				{					
				  myData[arrMain[i].split(":")[0]]= theVal;
				}
			}
		}
	return myData;
}
/**
 * [MarwanMaddah]: common function to subscribe topic 
 * @param {Object} elemId
 * @param {Object} topicName
 * @param {Object} functionName
 * @param {Object} elementType
 */
function _subscribeTopic(_elemId,_topicName,_methodName,_elementType)
{
	$("#"+_elemId).unsubscribe(_topicName);
	$("#"+_elemId).subscribe(_topicName, function(event, ui) {
		/**
		 * in case elementType is defined , the argument will be changed 
		 */
		if(typeof _elementType!="undefined" && _elementType!=null)
		{
		   var _id = null;	
		   if(_elementType == "tab")
		   {
			  _id = event.originalEvent.ui.tab.parentNode.id;
		   }
		   _methodName(_id,event);
		}
		/**
		 * in case elementType is not defined, event and ui will be the arguments 
		 */
		else
		{
		   _methodName(event,ui);
		}
	});
}
function _bindContextMenu(elementId,menuDesc)
{
	$.struts2_jquery.require( "jquery.contextMenu.js",null,jQuery.contextPath +"/common/jquery/js/base/"); 
    $("#"+elementId+" ul.ui-tabs-nav").contextMenu('tabUserPrefContextMenu',{
        preferences: 
        {
           click: function(element) {  // element is the jquery obj clicked on when context menu launched
                  resetUserGridPreferencesAfterConfirm(true,{objectId:elementId,objectType:"TAB"})
                  }
          ,iconClass:"ui-icon-refresh"
          ,menuTitleTrans:menuDesc
        }
       ,addNewTab:
        {
          click: function(element) {  // element is the jquery obj clicked on when context menu launched
                   open_DynScrTabLinkMgnt({objectId:elementId,objectType:"TAB"});
                 }
         ,iconClass:"ui-icon-newwin"
         ,menuTitleTrans:"Add New Tab"
        }
    });
}
function open_DynScrTabLinkMgnt(args)
{
	_showProgressBar(true);
	 var dynScrTabLinkDiv = $("<div id='dynScrTabLinkDiv_"+_pageRef+"' class='path-common-sceen'/>");
	 dynScrTabLinkDiv.css("padding","0");
	 dynScrTabLinkDiv.insertAfter($('body'));
	var params = {};
	params["criteria.objectCode"] = args.objectId;
	params["criteria.objectType"] = args.objectType;
	params["_pageRef"] = _pageRef;
	var srcURL = jQuery.contextPath+"/path/dynamicScreen/linkDynScrTabMainAction_openLinkDynScrTabMgnt?";
	var _dialogOptions = {modal:true, 
			                  title: (typeof link_dyn_scr_tab_key === "undefined")?"Create Tab & link to Dynamic Screen" :link_dyn_scr_tab_key ,
			                  autoOpen:false,
			                  show:'slide',
			                  position:'center', 
		                      width:returnMaxWidth(850),
		                      height:returnMaxHeight(400),
			                  close: function (){
								     var theDialog = $(this);
								     theDialog.remove();
								    }
		    		         };
	$("#dynScrTabLinkDiv_"+_pageRef).load(srcURL, params, function() {_showProgressBar(false);});
	$("#dynScrTabLinkDiv_"+_pageRef).dialog(_dialogOptions);
	$("#dynScrTabLinkDiv_"+_pageRef).dialog("open");

}
/**
 * [MarwanMaddah]: method to open a dynamic screen inside a tab.
 * @param selectedTabId
 * @param targetDivId
 */
function tabbedPanel_onSelectDynTab(selectedTabId,targetDivId)
{
	_showProgressBar(true);
	dynScreenId = selectedTabId.split("_")[2];
	var loadDynURL  = jQuery.contextPath+"/path/dynamicScreen/dynamicScreenMainAction_loadDynamicScreen?";
	var curParams   = {"criteria.screenId":dynScreenId,"_pageRef" : _pageRef};
	if($("#"+targetDivId).text().length)
		{
			_showProgressBar(false);
		}
	else
		{
			$("#"+targetDivId).load(loadDynURL,curParams,function() {
				/**
				 * get the max top value from the elements that are exists inside the screen that will be loaded
				 * and do the tab div height calculation based on the max top and the height of the element that has the max top value 
				 */
			   var _divContents = $("#"+targetDivId).find("div,input,button,select,img,textarea");
			   var _maxTopVal = 0;
			   var _maxTopElemHeight = 0;
			   _divContents.each( function() {
				 var hasParentPanel = false;
				 /**
				  * [MarwanMaddah]
				  * in case the current element is inside a panel, no need to based the height based on it , 
				  * it should be based on the parent panel only
				  */
				 if($(this).parent("div.collapsibleContainerContent")!=null && $(this).parent("div.collapsibleContainerContent").length > 0)
				 {
					 hasParentPanel = true;
				 }
				 var _elemTopVal    = parseInt($(this).css("top"));
				 var _elemHeightVal = parseInt($(this).css("height"));
				 if(_elemTopVal != null && !isNaN(_elemTopVal) && _elemTopVal > _maxTopVal && !hasParentPanel)
				 {
					 _maxTopVal = _elemTopVal;
					 _maxTopElemHeight = isNaN(_elemHeightVal)?0:_elemHeightVal;
				 }
			   });
			   var _actualDivHeight;
	
			   if(!$('#dynamicScreen_'+dynScreenId+'_GridDiv_'+_pageRef).length )
			   {
					_actualDivHeight = _maxTopVal + _maxTopElemHeight+10;
			   }
			   
			   $("#"+targetDivId).css("height",_actualDivHeight+"px");
			   
			   _showProgressBar(false);
			});
		}

}

/**
 * Global method to assign shortcut key for a button.
 * Usually this method is called from the submit.ftl for all buttons,
 * and from jquery-ui.js for all dialog buttons
 * 
 * @param String id
 * @param String shortcutKey
 * @param boolean isDialogBtn
 * @author KhaledHussein
 */
function _assignShortcutKey(id, shortcutKey, isDialogBtn) {
	// add tooltip in case not a button from dialog
	if(!isDialogBtn) {
		_addTooltipToElem(id, shortcutKey);
	}
	
	// Check before if there is not yet any binding related to the same id
	var alreadyBindedIds = cachePathData("shortcutBindedIds");
	if(alreadyBindedIds) {
		if($.inArray(id, alreadyBindedIds) == -1) {
			alreadyBindedIds.push(id);
			cachePathData("shortcutBindedIds", alreadyBindedIds);
			_doAssignShortcutKey(id, shortcutKey);
		}
	} else {
		alreadyBindedIds = [];
		alreadyBindedIds.push(id);
		cachePathData("shortcutBindedIds", alreadyBindedIds);
		_doAssignShortcutKey(id, shortcutKey);
	}
	
}
/**
 * Bind the shortcutkey to the button
 * 
 * @param String id
 * @param String shortcutKey
 * @author KhaledHussein
 */
function _doAssignShortcutKey(id, shortcutKey) {
	$.struts2_jquery.require("js/jstree/jquery.hotkeys.js");
	$(document).bind('keydown', shortcutKey ,function(e) {
		
		// this returned as boolean
		var isVisible = $('#' + id).is(":visible"); 
		
		// this returned as string
		var isDisabled = $('#' + id).attr('aria-disabled');
		
		// get the zindex of the button
		// notice use zIndex() it will get the real z-index in number
		var zindexOfBtn = $('#' + id).zIndex();
		
		// Check if the button is above the highest dialog to proceed, otherwise, do nothing
		var proceed = true;
		
		// if there is one dialog above the button, then don't proceed
		$( ".ui-dialog" ).each( function() {
			if(	$(this).is( ":visible" ) && $(this).children('div.ui-dialog-content').dialog( "option", "modal" ) == true ) {
				var zindex = $(this).zIndex();
				if(parseInt(zindex) > parseInt(zindexOfBtn)) {
					proceed = false;
					return false; // break the loop
				}
			}
		});
		
		// if not disabled or hidden, then activate the button
		if(isVisible && isDisabled && isDisabled=="false" && proceed) {
			$('#' + id).trigger( "click" );
		} 
	});
}

/**
 * Add dynamically tooltip to element. This considers if the
 * element has already a tooltip then it appends the new
 * one to the next new line
 * 
 * @param string elId
 * @param string tooltip
 * @author KhaledHussein
 */
function _addTooltipToElem(elId, tooltip) {
	var prevTooltip = $('#' + elId).attr('title');
	if(prevTooltip) {
		$('#' + elId).attr('title', prevTooltip + '\r\n' + tooltip);
	} else {
		$('#' + elId).attr('title', tooltip);
	}
}

/**
 * resizing grid headers to adjust alignment with column data 
 * @param {Object} gridId
 */
function resizeGridHeaders(gridId)
{
		setTimeout(function()
		{
			var objHeaderRow = $("table[aria-labelledby=gbox_" + gridId+ "]  tr");
			var objHeader = $(objHeaderRow[0]).find("th");
			var objHeaderRow2 = $("#"+gridId+" tr");
			if(objHeaderRow2.length > 1)
			{
				var objHeader2 = $(objHeaderRow2[1]).find("td");
				for (var i = 0; i < objHeader.length; i++)
				{
					var theId = objHeader[i].id;
					 var computedStyleWidth = getComputedStyle(objHeader2[i], null).width;
					 if(computedStyleWidth !== "auto")
					 {
						$( objHeader[i]).width(computedStyleWidth);
					 }
				}
			}
		}, 300);
}

/**
 * Login Alert Implementation TP#297149 
 * This function is used to check if login alert is enabled 
 * to stop then the onclick function of the button. 
 * It should be called at the top of the onclick js function
 */		
function disableBtnInLoginAlert()
{
	if(typeof loginAlertBtnLockedMsg !== "undefined" &&  loginAlertBtnLocked != undefined && loginAlertBtnLocked == 1 )
	{
		_showErrorMsg( ( typeof loginAlertBtnLockedMsg === "undefined" ) ? " Waiting For Login Alert Approval " : loginAlertBtnLockedMsg );
		return true;
	}
	return false;
}

/**
 * Workflow Button Customization for after execution
*/
function customAfterExecCall(buttonId)
{
	if(buttonId == undefined || buttonId == null || buttonId == '')
	{
		return;			
	}
	
	var $button = $('#'+buttonId);
	var customBtnData = $button.button('option','customBtnAfterExecData');
	if(customBtnData == undefined || customBtnData == null
			|| customBtnData.customBtnId == undefined || customBtnData.customBtnId == null)
	{
		return;
	}
	customBtnActionCall(buttonId,null,null,customBtnData);
	
}
/**
 * Workflow Button Customization for key event
 */
function customKeyEventCall(buttonId)
{
	if(buttonId == undefined || buttonId == null || buttonId == '')
	{
		return;			
	}
	
	var $button = $('#'+buttonId);
	var customBtnData = $button.data('customKeyEventBtnData');
	if(customBtnData == undefined || customBtnData == null
			|| customBtnData.customBtnId == undefined || customBtnData.customBtnId == null)
	{
		return;
	}
	customBtnActionCall(buttonId,null,null,customBtnData);
	
}
/**
 * Workflow Button Customization
*/
function customBtnActionCall(buttonId,validateForm,proceed,customBtnData)
{
	// HusseinZaraket : TP 889735 /check if dynamic screen contain file 
	var containFile = false;
	
	if(buttonId == undefined || buttonId == null || buttonId == '')
	{
		return;			
	}	
	
	var $button = $('#'+buttonId);
	
	if(customBtnData == undefined || customBtnData == null)
	{
		var customBtnData = $button.button('option','customBtnData');
		if(customBtnData == undefined || customBtnData == null
				|| customBtnData.customBtnId == undefined || customBtnData.customBtnId == null )
		{
			if($('#'+buttonId + '_customBtnData').length > 0)
			{
				var customBtnDataValue =  $('#'+buttonId + '_customBtnData').val();
				if(customBtnDataValue != undefined && customBtnDataValue != null && customBtnDataValue != '')
				{
					customBtnData = JSON.parse(customBtnDataValue);
				}	
			}
			else
			{
				customBtnData = $button.data("customBtnData");
			}
			
			if(customBtnData == undefined || customBtnData == null
					|| customBtnData.customBtnId == undefined || customBtnData.customBtnId == null)
			{
				return;
			}	
		}
	}
	//check if form validation should be done before calling the actions
	if(validateForm != undefined && validateForm == '1')
	{
		var $form = $button.closest('form');
		if($form != undefined && $form.length > 0)
		{	
			var validator = $form.validate();
			if(validator != undefined && validator != null)
			{
				var result = validator.form();
				if(result == false)
				{
					return;
				}
			}
		}	
	}
	
	var newCustomBtnData = {};
	newCustomBtnData.customBtnId = customBtnData.customBtnId;
	newCustomBtnData.customBtnData = {};
	newCustomBtnData.customBtnElementData = {};
	newCustomBtnData.isGlobalActivity = customBtnData.isGlobalActivity;
	newCustomBtnData.elemSequenceId = customBtnData.elemSequenceId;
	newCustomBtnData.fldIdentifier = customBtnData.dynScreenFldIdentifier;
	newCustomBtnData.currentAppName = customBtnData.dynScreenAppName;
	newCustomBtnData.proceedExpression = customBtnData.proceedExpression;
	newCustomBtnData.proceed = proceed;
	
	//get the value of the operation arguments mapped to screen elements
	var mappingDataList = customBtnData.mappingDataList;
	if(mappingDataList != undefined && mappingDataList != null)
	{	
		for(var i = 0; i < mappingDataList.length; i++ )
		{
			var screenParamMapping = mappingDataList[i];
			var mapValue = screenParamMapping.mapValue;
			var elementValue = mapValue;
			if(screenParamMapping.fromSource!=null && screenParamMapping.fromSource !=undefined && "GRID" == screenParamMapping.fromSource.toUpperCase())
			{
				var tableColumn = mapValue.split("~#~");
				var tableId = tableColumn[0] + '_' + _pageRef ;
				var columnName = tableColumn[1];
				elementValue = returnGridEltValue(tableId,columnName,screenParamMapping.selectionType,screenParamMapping.delimiter);
				elementValue = (elementValue != undefined && elementValue != null)?elementValue:mapValue;
			}
			else
			{
				if(undefined != _pageRef && null != _pageRef && "" != _pageRef)
				{
					// In case of lookup add 'lookuptxt' to elementValue
					if($('#lookuptxt_' + mapValue + '_' + _pageRef).length > 0)
					{
						elementValue = returnHtmlEltValue('lookuptxt_' + mapValue + '_' + _pageRef);
					}
					else
					{
						elementValue = returnHtmlEltValue(mapValue + '_' + _pageRef);
					}
				}
				else
				{
					if($('#lookuptxt_' + mapValue).length > 0)
					{
						elementValue = returnHtmlEltValue('lookuptxt_' + mapValue);
					}
					else
					{
						elementValue = returnHtmlEltValue(mapValue);
					}
				}
			}
			
			// HusseinZaraket : TP 889735 /In case of file send the html file component name to catch it in java from dynFileElemHm map that contain all files retrieved 
			var elementid = mapValue;
			if(undefined != _pageRef && null != _pageRef && "" != _pageRef)
			{
				elementid += "_" + _pageRef;
			}
			if(customBtnData.isGlobalActivity != undefined && customBtnData.isGlobalActivity != null && customBtnData.isGlobalActivity == true && $('#'+ elementid).attr('type') === 'file'){
				containFile = true;
				newCustomBtnData.customBtnData[''+ screenParamMapping.operationId + '-' + screenParamMapping.argId  ] = "FILE:" + $('#'+ elementid).attr('name').split(".")[1];
			}else{
				newCustomBtnData.customBtnData[''+ screenParamMapping.operationId + '-' + screenParamMapping.argId  ] = elementValue;
			}
			
		}	
	}
	
	//get the value of the operation arguments mapped to grid column elements
	var mappingGridColumnList = customBtnData.mappingGridColumnList;
	if(mappingGridColumnList != undefined && mappingGridColumnList != null && mappingGridColumnList.length > 0)
	{	
		var selectedRowId = $button.jqGrid('getGridParam', 'selrow');
		var selectedRowObject = $button.jqGrid('getRowData', selectedRowId);
		
		//in case of double click on grid's row, the buttonId is the grid id 
		for(var i = 0; i < mappingGridColumnList.length; i++ )
		{
			var gridColMapping = mappingGridColumnList[i];
			var mapValue = gridColMapping.mapValue;
			var elementValue = selectedRowObject[mapValue];
			newCustomBtnData.customBtnData[''+ gridColMapping.operationId + '-' + gridColMapping.argId  ] = elementValue;
		}
	}
	
	//get the value of the operation output arguments mapped to screen elements to use in success.
	var mappingOutputDataList = customBtnData.mappingOutputDataList;
	
	//get the value of screen elements used in the condition expression
	var screenElementsList = customBtnData.screenElementsList;
	if(screenElementsList != undefined && screenElementsList != null)
	{
		for(var i = 0; i < screenElementsList.length; i++ )
		{
			var screenElementMapping = screenElementsList[i];
			var elementId = screenElementMapping.FIELD_ID;
			var elementValue = returnHtmlEltValue(elementId + '_' + _pageRef);
			
			var $element = $('#' + elementId + '_' + _pageRef);
			var elementType = 'V'; //by default initialize the type to varchar
			if($element != undefined && $element != null && $element.length > 0)
			{
				//datepicker element
				if($element.hasClass("hasDatepicker"))
				{
					elementType = 'T';
				}
				//numeric text field element
				else if($element.attr("type") == "text" && $element.attr("mode") == "number")
				{
					elementType = 'N';
				}
					
			}
			
			newCustomBtnData.customBtnElementData['F.'+ screenElementMapping.FLD_IDENTIFIER ] = { "FIELD_VALUE" : elementValue,
																							  	  "FIELD_KEY_LABEL_CODE" : screenElementMapping.FIELD_KEY_LABEL_CODE,
																							  	  "FIELD_TYPE" : elementType};
		}	
	}
	
	var params = {'buttonCustomizationCO.customBtnData' : JSON.stringify(newCustomBtnData),"_pageRef" : _pageRef}; 
	if(customBtnData.dynScreenAppName != undefined)
	{
		params["dynScreenAppName"] = customBtnData.dynScreenAppName;
	}
	if(customBtnData.dynScreenProgRef != undefined)
	{
		params["dynScreenProgRef"] = customBtnData.dynScreenProgRef;
	}
	if(customBtnData.dynScreenCompCode != undefined)
	{
		params["dynScreenCompCode"] = customBtnData.dynScreenCompCode;
	}
	if(customBtnData.dynScreenFldIdentifier != undefined)
	{
		params["dynScreenFldIdentifier"] = customBtnData.dynScreenFldIdentifier;
	}
	if(customBtnData.fromDynElementId != undefined)
	{
		params["fromDynElementId"] = customBtnData.fromDynElementId;
	}
	if(customBtnData.fromDynScreenId != undefined)
	{
		params["fromDynScreenId"] = customBtnData.fromDynScreenId;
	}
	
	var stopPropagation = false;
	_showProgressBar(true);
	
	var options = {
			url : jQuery.contextPath + '/path/buttoncustomization/ButtonCustomizationMaint_callCustomBtnActions.action',
			type : "post",
			dataType : "json",
			data : params,
			async:false,/*to avoid running 2 ajax at the same time in case if there is before execution on the button*/
			success : function(data) 
			{
			    _showProgressBar(false);
			    if(data["_error"] == null)
		 		{
			    	// calling Reports if specified in Button actions
			    	customBtnActionCall_printAdvices(data["buttonCustomizationCO"]["reportResponseCOList"])
			    	var executionResult = data["buttonCustomizationCO"]["executionResult"];
			    	
			    	if(executionResult != undefined && executionResult != null && executionResult != '')
			    	{
			    		//_showErrorMsg(executionResult,info_msg_title);
			    		var addArgs = {};
			    		addArgs["adjustMsgBoxSize"] = true;
						_showErrorMsg(executionResult,info_msg_title,null ,null, null,addArgs); 
					}
			    	// check to execute any client Side Scripting
			    	var clientScriptList = data["buttonCustomizationCO"]["clientScriptList"];
			    	if(clientScriptList != undefined && clientScriptList != null)
			    	{
			    		for(var i=0; i<clientScriptList.length; i++ )
			    		{
			    			if(clientScriptList[i] != undefined && clientScriptList[i] != null && clientScriptList[i] != '')
			    			{
			    				eval(clientScriptList[i]);
			    			}
			    		}
			    	}
			    	// opening dynamic screen
			    	var dynScreenId = data["buttonCustomizationCO"]["dynScreenId"];
			    	if(dynScreenId != undefined && dynScreenId != null && dynScreenId >= 0 )
			    	{
			    		$.struts2_jquery.require("ScreenGeneratorList.js,ScreenGeneratorMaint.js" ,null,jQuery.contextPath+"/common/js/screengenerator/");
			    		var dynamicScreenParamsMapCOList = data["buttonCustomizationCO"]["dynamicScreenParamsMapCOList"];
			    		var screenWidth = data["buttonCustomizationCO"]["customActionParamCO"]["screenWidth"];
			    		var screenHeight = data["buttonCustomizationCO"]["customActionParamCO"]["screenHeight"];
			    		var screenTitle = data["buttonCustomizationCO"]["customActionParamCO"]["screenTitle"];
			    		dynamicScreen_openDynamicScreen(dynScreenId,dynamicScreenParamsMapCOList,null,screenWidth,screenHeight,null,customBtnData._recReadOnly,screenTitle);
			    	}
			    	
			    	//apply output parameter values
			    	var returnedResultData = data["buttonCustomizationCO"]["actionsParamMap"];
			    	if(customBtnData.isGlobalActivity && mappingOutputDataList != undefined && mappingOutputDataList != null && returnedResultData != undefined && returnedResultData != null)
			    	{
		    			for(var i = 0; i < mappingOutputDataList.length; i++ )
		    			{
		    				var screenOutputParamMapping 	= mappingOutputDataList[i];
		    				var outputMapValue 				= screenOutputParamMapping.mapValue;
		    				var outputOpId 					= screenOutputParamMapping.operationId;
		    				var outputArgId    				= screenOutputParamMapping.argId;
		    				
		    				var elemId = $("#" + outputMapValue + '_' + _pageRef).length == 1 ? outputMapValue + '_' + _pageRef : outputMapValue ;
		    				if($('#'+elemId).length == 1)
		    				{
		    					setInputValue(elemId,returnedResultData[outputOpId][outputArgId].argValue);
		    				}
		    			}	
			    	}
			    	
			    	if(!data.buttonCustomizationCO.proceedOnFail)
			    	{
			    		event.stopImmediatePropagation();
			    		stopPropagation = true;
			    	}
			    }
			    else
			    {
			    	//check on proceed in case of boexeption
			    	if (!data.buttonCustomizationCO.proceedOnFail)
			    	{
			    		event.stopImmediatePropagation();
			    		stopPropagation = true;
			    	}
			    }
			},
			error:function()
			{
				 //check on proceed in case of 600 http status error
				if (!proceed)
		    	{
		    		event.stopImmediatePropagation();
		    		stopPropagation = true;
		    	}
			}
		};
	
	// HusseinZaraket : TP 889735 /check if dynamic screen contain file use ajaxSubmit to submit the form(to submit files also)
	if(containFile){
		var formId = $("#" + buttonId).closest("form").attr('id');
		$("#" + formId).ajaxSubmit(options);
	}else{
		$.ajax(options);
	}
	
	return stopPropagation;
	
}

/**
 * TP 896475 function that executes the results of global activity, which will be called by DEV team after teh execution of certain service
 * in order to perform teh same execution of JS, reports, Dynamic screens as been applied by Custom Button
 * @param data
 * @returns
 */
function globalActivityAfterExec(data)
{
	if(data && data["outputParamMapList"] != undefined)
	{
		for(k=0;k<data["outputParamMapList"].length;k++)
		{
			var clientScriptList = data["outputParamMapList"][k]["buttonCustomizationCO"]["clientScriptList"];
			if(clientScriptList != undefined && clientScriptList != null)
			{
				for(var i=0; i<clientScriptList.length; i++ )
				{
					if(clientScriptList[i] != undefined && clientScriptList[i] != null && clientScriptList[i] != '')
					{
						eval(clientScriptList[i]);
					}
				}
			}
			//for dynamic screens
			var dynScreenId = data["outputParamMapList"][k]["buttonCustomizationCO"]["dynScreenId"];
			if(dynScreenId != undefined && dynScreenId != null)
			{
				// opening dynamic screen
				if(dynScreenId != undefined && dynScreenId != null && dynScreenId >= 0 )
				{
					$.struts2_jquery.require("ScreenGeneratorList.js,ScreenGeneratorMaint.js" ,null,jQuery.contextPath+"/common/js/screengenerator/");
					var dynamicScreenParamsMapCOList = data["buttonCustomizationCO"]["dynamicScreenParamsMapCOList"];
					var screenWidth = data["buttonCustomizationCO"]["customActionParamCO"]["screenWidth"];
					var screenHeight = data["buttonCustomizationCO"]["customActionParamCO"]["screenHeight"];
					var screenTitle = data["buttonCustomizationCO"]["customActionParamCO"]["screenTitle"];
					dynamicScreen_openDynamicScreen(dynScreenId,dynamicScreenParamsMapCOList,null,screenWidth,screenHeight,null,customBtnData._recReadOnly,screenTitle);
				}
			}
			//for reports
			customBtnActionCall_printAdvices(data["outputParamMapList"][k]["buttonCustomizationCO"]["reportResponseCOList"])
			var executionResult = data["outputParamMapList"][k]["buttonCustomizationCO"]["executionResult"];
			if(executionResult != undefined && executionResult != null && executionResult != '')
			{
				var addArgs = {};
				addArgs["adjustMsgBoxSize"] = true;
				_showErrorMsg(executionResult,info_msg_title,null ,null, null,addArgs); 
			}
		}
	}
}

function returnGridEltValue(tableId,columnName,selectionType,delimiter)
{
	var columnArr= [];
	var object = null;
	delimiter = (delimiter!=null&&delimiter!="")?delimiter:",";
	var $table = $("#"+tableId);
	
	//if table doesn't exists then return
	if($table.length == 0)
	{
		return;
	}
	
	switch(selectionType)
	{
		case "U": 
		{
			object = $table.jqGrid("getChangedRowData");
			break;
		}
		case "S": 
		{
			var isMultiSelect = $table.jqGrid('getGridParam', 'multiselect');
			if(isMultiSelect || isMultiSelect == "true")
			{
				var selectedRowsId = $table.jqGrid('getGridParam', 'selarrrow');
				if(selectedRowsId != undefined && selectedRowsId != null)
				{	
					for( var i = 0; i < selectedRowsId.length ; i++)
					{
				       	var selectedRowObject = $table.jqGrid("getRowData", selectedRowsId[i]);
				       	if(selectedRowObject[columnName] == undefined)
						{
				       		//if column doesn't exists then return
							return;
						}	
						else
						{
							columnArr.push(selectedRowObject[columnName]);
						}
				    }
				}
			}
			else
			{
				var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
				if(selectedRowId == undefined || selectedRowId == null)
				{ 
					//if no row is selected
					columnArr[0] = '';
				}	
				else
				{	
					var obj = $table.jqGrid('getRowData', selectedRowId);
					if(obj[columnName] == undefined)
					{
						//if column doesn't exists then return
						return;
					}	
					else
					{
						columnArr[0] = obj[columnName];
					}
				}
			}
			break;
		}	
		default: 
		{
			object = $table.jqGrid("getAllRows");
			break;
		}
	}
	
	if(object != null && object != "" && object != undefined && object != "undefined")
	{
		var arr = JSON.parse(object)["root"];
		
		for (var j = 0; j < arr.length; j++)
		{
			  if(arr[j][columnName] == undefined)
			  {
				  //if column doesn't exists then return
				  return;  
			  }
			  else
			  {
				  columnArr.push(arr[j][columnName]);  
			  }
		}
	}
	return columnArr.join(delimiter);
}

function customBtnActionCall_printAdvices(adviceList)
{
	
	if(adviceList != undefined && adviceList != null && adviceList.length > 0)
	{
		var currentParam = null;
		var lastParam = null;
		for (var i = adviceList.length - 1; i >= 0 ;i--) 
		{
	    	currentParam = customBtnActionCall_prepareAdvicesParam(adviceList[i]);
	    	if(i < adviceList.length - 1)
	    	{
	    		currentParam.nextFunc = openMultipleAdvice;
	    		currentParam.nextFuncArgs = lastParam;
	    		lastParam = currentParam;
	    	}
	    	else
	    	{
	    		lastParam = currentParam;	
	    	}
		}
		
		if(currentParam != null)
		{
			openMultipleAdvice(currentParam);
		}
	}
} 


function customBtnActionCall_prepareAdvicesParam(reportResponse)
{
	var paramObj = {};
	if(reportResponse != undefined && reportResponse != null)
	{
		paramObj.shouldSelectLanguage = reportResponse.selectReportLanguage;
		paramObj.confirmMessageEng = reportResponse.engMessage;
		paramObj.confirmMessageArab = reportResponse.arabMessage;
		paramObj.confirmMessage = reportResponse.message;
		paramObj.selectLangBeforeConf = reportResponse.selectLangBeforeConf;
		
		paramObj.confirmMessageShown = false;
		paramObj.askLangByReport = false;
		paramObj.reportsObjArray = new Array(reportResponse);
	}
	return paramObj;
}
function closeExtFrmDlg(disableIframeEltChanged)
{
	if(window.name && window.name.indexOf("extScreenFrame") == 0)
	{
		$.postMessage({ closeExtFrmDlg: window.name, disableIframeEltChanged:disableIframeEltChanged}, (window.originalUrl !== '' ? window.originalUrl : window.location.href) ,window.top);	
	}
	else
	{
		if(disableIframeEltChanged != undefined && disableIframeEltChanged != null && disableIframeEltChanged == true)
		{
			var frameId = $("iframe[name='"+window.name+"']").attr('id');
			$.data(document.getElementById(frameId),"iframeEltChanged", false);
		}
		
		var $dlgObj = $($("iframe[name='"+window.name+"']").closest("div")); //get the parent dialog div to close
		if($dlgObj.html() != null)
		{
			$dlgObj.dialog("close");
		}
	}
}
function dynamicScreen_openDynamicScreen(currScreenId,dynamicScreenParamsMapCOList,buttonId,screenWidth,screenHeight,fromPreview,_recReadOnly,screenTitle)
{
	_showProgressBar(true);
	var classes = "";
	var srcURL = jQuery.contextPath+"/path/dynamicScreen/dynamicScreenMainAction_loadDynamicScreen?";

	if(typeof fromPreview!="undefined" && fromPreview!=null && fromPreview)
	{
		classes = "class='path-no-customization'";
	}
	var	previewScreenDiv = $("<div id='dyn_preview_screen_div_"+currScreenId+"_"+_pageRef+"' "+classes+"/>");
	previewScreenDiv.css("padding","0");
	previewScreenDiv.insertAfter($('body'));
	var curParams = {"criteria.screenId":currScreenId,"_pageRef" : _pageRef};
	if(_recReadOnly!="" && _recReadOnly!="undefined" && _recReadOnly!=undefined)
	{
		curParams["_recReadOnly"] = _recReadOnly;
	}
	
	//Adel - In case opening from double click of grid widget, check if id has class jqgrid, override original behavior
	if($('#'+buttonId).hasClass("ui-jqgrid-btable"))
	{
		_showProgressBar(true);
		var $table = $('#'+buttonId);
		var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
		var myObject = $table.jqGrid('getRowData', selectedRowId);
		var objectValues = Object.keys(myObject).map(function(e) {
			  return myObject[e];});
		 
		for (var i = 0; i<Object.keys(myObject).length; i ++)
		{
			curParams["scrElemHm."+Object.keys(myObject)[i]]= objectValues[i];
		}		
		
		curParams["criteria.modeType"] = "load";

		var srcURL = jQuery.contextPath + "/path/dynamicScreen/dynamicScreenMainAction_fillDynamicFormAfterGridLoad?";
	}
	else if((dynamicScreenParamsMapCOList == undefined || dynamicScreenParamsMapCOList == null) 
			&& buttonId != undefined && buttonId != null && buttonId != '')
	{
		var $button = $('#'+buttonId);
		var customBtnData = $button.button('option','customBtnData');
		dynamicScreenParamsMapCOList =  customBtnData.dynScreenMappedParameters;
		
		if(dynamicScreenParamsMapCOList == undefined || dynamicScreenParamsMapCOList == null)
		{
			var $button_dynScreenMappedParameters = $('#' + buttonId + '_dynScreenMappedParameters');
			if($button_dynScreenMappedParameters.length > 0)
			{
				var dynamicScreenParamsMapCOListValue = $button_dynScreenMappedParameters.val();
				if(dynamicScreenParamsMapCOListValue != undefined 
						&& dynamicScreenParamsMapCOListValue != null && dynamicScreenParamsMapCOListValue != '')
				{
					dynamicScreenParamsMapCOList = JSON.parse(dynamicScreenParamsMapCOListValue);
				}
			}
		}	
	}
	if(dynamicScreenParamsMapCOList != undefined 
			&& dynamicScreenParamsMapCOList != null && dynamicScreenParamsMapCOList.length > 0 )
	{
		var newDynScreenParamsData = [];
		for(var i = 0; i < dynamicScreenParamsMapCOList.length; i++)
		{
			var screenParamMapping = dynamicScreenParamsMapCOList[i];
			if(screenParamMapping.sysParamElmDynScrnMapDet.MAP_TYPE == '1')
			{	
				var elementHtmlId = screenParamMapping.elementHtmlId;
				var elementValue = null;
				//TP#934567 Button Customization Dynamic Screen Action Assignment - Parameter from Grid on Source Screen
				//get element value if fromSource is of type grid
				if(screenParamMapping.fromSource!=null && screenParamMapping.fromSource!=undefined && "GRID" == screenParamMapping.fromSource.toUpperCase() )
				{
					var tableColumn = elementHtmlId.split("~#~");
					var tableId = tableColumn[0] + '_' + _pageRef ;
					var columnName = tableColumn[1];
					elementValue = returnGridEltValue(tableId,columnName,screenParamMapping.sysParamElmDynScrnMapDet.SELECTION_TYPE,screenParamMapping.sysParamElmDynScrnMapDet.DELIMITER);
					elementValue = (elementValue != undefined && elementValue != null)?elementValue:elementHtmlId;
				}
				else if($('#' + elementHtmlId + '_' + _pageRef).length > 0)
				{
					elementValue = returnHtmlEltValue(elementHtmlId + '_' + _pageRef);
				}
				else if($('#' + elementHtmlId).length > 0)
				{
					elementValue = returnHtmlEltValue(elementHtmlId);
				}
				else if($('#lookuptxt_' + elementHtmlId + '_' + _pageRef).length > 0)
				{
					elementValue = returnHtmlEltValue('lookuptxt_' + elementHtmlId + '_' + _pageRef);
				}
				else if($('#lookuptxt_' + elementHtmlId).length > 0)
				{
					elementValue = returnHtmlEltValue('lookuptxt_' + elementHtmlId);
				}
				if(elementValue != null)
				{
					screenParamMapping.sysParamElmDynScrnMapDet.MAP_VALUE = elementValue;
				}
			}
			newDynScreenParamsData.push(screenParamMapping.sysParamElmDynScrnMapDet);
		}	
		
		curParams["dynamicScreenParamsMapCO.dynamicScreenParamsMapData"] = "{\"root\": " + JSON.stringify(newDynScreenParamsData).replace (/:(\d+)([,\}])/g, ':"$1"$2') + "}"; 
	}
	
	var width = '100%';
	var height = returnMaxHeight(900);
	if(!isNaN(screenWidth) && !isNaN(screenHeight) && Number(screenWidth) > 0 && Number(screenHeight) > 0)
	{
		width = returnMaxWidth(Number(screenWidth));
		height = returnMaxHeight(Number(screenHeight));
	}
	var _dialogOptions = {modal:true, 
			                  title:(screenTitle!=null&&screenTitle!="")?screenTitle:(typeof preview_screen_title_key === "undefined")?"Preview Screen" :preview_screen_title_key ,
			                  autoOpen:false,
			                  show:'slide',
			                  position:'center', 
			                  width:width,
			                  height:height,
			                  close: function (){
								     var theDialog = $(this);
								     theDialog.remove();
								    }
		    		         };
	$("#dyn_preview_screen_div_"+currScreenId+"_"+_pageRef).load(srcURL, curParams, function() {_showProgressBar(false);});
	$("#dyn_preview_screen_div_"+currScreenId+"_"+_pageRef).dialog(_dialogOptions);
	$("#dyn_preview_screen_div_"+currScreenId+"_"+_pageRef).dialog("open");

}

function applyCollapsibleToDynDiv(_collDivId)
{
    if($("#"+_collDivId).length > 0)
    {
	  $("div#"+_collDivId+"_collapse.collapsibleContainer").collapsiblePanel();
      var _divHeight = $("#"+_collDivId).css("height");
      var _divHeightInt = 0;
      if(typeof _divHeight !="undefined" && _divHeight!=null)
      {
         _divHeightInt = parseInt(_divHeight.substring(0,_divHeight.indexOf("px")))-18;
      }
      $("#"+_collDivId+"_collapse").find("div.collapsibleContainerContent").css("height",_divHeightInt+"px");
    }	
}

/**
*common function used to check on min length on text,livesearch mode text and on textarea
*/
function checkInputMinLength(elt)
{
	if(elt != undefined && elt != null)
	{	
		var eltId = $(elt).attr('id');
		var eltMinLength = $(elt).attr('minlength');
		if(eltId != undefined && eltId != null && eltId != ''
			&& eltMinLength != undefined && eltMinLength != null && eltMinLength != '')
		{	
			var eltValue = returnHtmlEltValue(eltId);
			if(eltValue != undefined && eltValue != null 
					&& eltMinLength != undefined && eltMinLength != null
					&& eltValue.trim().length > 0 && eltValue.trim().length < eltMinLength)
			{
				var curElemLabel = returnElementLabel(elt);
				$(elt).val($.trim($(elt).attr("prevValue")));
				_showErrorMsg(curElemLabel + " " + min_length_trans + " " + eltMinLength,cannotProceed_key);
			}
		}
	}	
}

/**
 * common function to display a confirmation message upon access right change asking the user to refresh the screen.
*/
function openAxsChangedDialog(confirmationMessage)
{
	_showConfirmMsg(confirmationMessage, info_msg_title, 
				function(confirmcChoice, theArgs)
				{
					_showProgressBar(true);
					var actionURL = jQuery.contextPath+"/pathdesktop/DesktopAction_resetUserAxsChange?action=resetUserAxsChange";
					$.ajax({
						 url: actionURL,
				         type:"post",
						 dataType:"json",
						 data: {},
						 success: function(data)
						 {
							 cachePathData("cached_path_axs_changed","false");
							 _showProgressBar(false);
							 if(confirmcChoice)
							 {
								 window.location.reload();
							 }
						 }
				});
			
		});
}
/**
 * [MarwanMaddah]:
 * used in KYC management, because we faced a problem 
 * in the cloning management with the elements that are of type 'select'
 * this issue is a bug inside the original jquery clone function
 * we did this function to do a common work arround and solve the bug
 */
$.fn.pathObjectClone = (function(dataAndEvents, deepDataAndEvents)
{
	var $clonedObject = this.clone(dataAndEvents,deepDataAndEvents);
	var $origSelects = $('select', this);
	var $clonedSelects = $('select', $clonedObject);
    $origSelects.each(function(i) {
        $clonedSelects.eq(i).val($(this).val());
    });
	return $clonedObject;
})


/**
 * [peter abounader]:
 * called from client script on customization error message to view. set values for html ids in the form of (id:value~#~id:value)
 * set values for html id1 and id2 with value1 and value2 respectively (value is linked from other action)
 * if the same id exists in the constant value and id1 then id1 will ovveride the constant id.
 * @param message
 * @param idsValues
 * @returns
 */
function displayErrorMsg(message,idsValues,id1ToFill,value1ToFill,id2ToFill,value2ToFill)
{
	if(idsValues != null && idsValues !='')
	{
		var idsValuesArray = idsValues.split("~#~");
		for(var i = 0 ; i<idsValuesArray.length; i++)
		{
			var idVal = idsValuesArray[i].split(":");
			setInputValue(idVal[0],idVal[1]);
		}
	}
	if(id1ToFill != null && id1ToFill != '' )
	{
		setInputValue(id1ToFill,value1ToFill);
	}
	if(id2ToFill != null && id2ToFill != '' )
	{
		setInputValue(id2ToFill,value2ToFill);
	}
	_showErrorMsg(message,error_msg_title); 
}

/**
 * [peter abounader]:
 * called from client script on customization success message to view. set values for html ids in the form of (id:value~#~id:value)
 * set values for html id1 and id2 with value1 and value2 respectively (value is linked from other action)
 * if the same id exists in the constant value and id1 then id1 will ovveride the constant id.
 * @param message
 * @param idsValues
 * @returns
 */
function displaySuccessMsg(message,idsValues,id1ToFill,value1ToFill,id2ToFill,value2ToFill)
{
	if(idsValues != null && idsValues !='')
	{
		var idsValuesArray = idsValues.split("~#~");
		for(var i = 0 ; i < idsValuesArray.length; i++)
		{
			var idVal = idsValuesArray[i].split(":");
			setInputValue(idVal[0],idVal[1]);
		}
	}
	if(id1ToFill != null && id1ToFill != '' )
	{
		setInputValue(id1ToFill,value1ToFill);
	}
	if(id2ToFill != null && id2ToFill != '' )
	{
		setInputValue(id2ToFill,value2ToFill);
	}
	_showErrorMsg(message,success_msg_title); 
}


/**
 * Initiate a request to download a file based on the given name
 * 
 * @param fileName
 */
function downloadFile(fileName)
{
	$.fileDownload(jQuery.contextPath + '/path/customization/fileCustomization_download', {
	    successCallback: function (url) {
			_showProgressBar(false);
	    },
	    failCallback: function (html, url) {
	    	_showProgressBar(false);
	        _showErrorMsg(html);
	    },
	    httpMethod: "POST",
		data:{
			'fileName' : fileName,
		}
	});
}


/**
 * [MarwanMaddah]
 * will be used to check the session timeout on Drop.
 * @returns
 */
function _callActionToCheckSession()
{
	$.ajax({
			url: jQuery.contextPath+ "/path/dummy/DummyAction",
	  		type:"post",
	  		dataType:"json",
	  		success: function(data)
	  		{
	  			
	  		}
	});
}
/**
 * method used to return the function name as string
 * @param fn
 * @returns
 */
function returnFuncName(fn) 
{
	var f = typeof fn == 'function';
	var s = f && ((fn.name && ['', fn.name]) || fn.toString().match(/function ([^\(]+)/));
	return (!f && 'not a function') || (s && s[1] || 'anonymous');
}


/**
 * MEthod for Autocomplete popup for Expressions
 * Moved from FieldCustomization.js by request from SADS JAVA team
 * "RE: DB190071 Dhofar - LIVE R14 - SADS - error came - no changes available"
 */
apply_auto_complete = function(theInputId,expression_cust_tags)
{
	 var theInput = $("#"+theInputId);
	 //in case of autocomplete of a cell inside a grid, we need to use document.getElementById because $("#"+theInputId) returns empty
	 if(theInput != undefined && theInput != null && theInput.length == 0)
	 {
		 theInput = $(document.getElementById(theInputId));
	 }
	 // don't navigate away from the field on tab when selecting an item
     theInput.bind( "keydown", function( event )
     {
   	if( event.keyCode === $.ui.keyCode.DOWN && !theInput.isopened)
   	{
       	theInput.autocomplete( "search", "" );
   	}
     })
     .autocomplete({
       minLength: 0,
       inputId:theInputId,
       source: expression_cust_tags,
       open: function( event, ui )
       {
       	theInput.isopened = true;
       },
       close: function( event, ui )
       {
       	theInput.isopened = false;
       },
       focus: function()
       {
         // prevent value inserted on focus
         return false;
       },
       select: function( event, ui )
       {
          var cursPosition   = returnCursorPosStart(document.getElementById(theInputId));
    	  var strTillCurrPos = this.value.substring(0,cursPosition)
    	  var spaceDetectedBefore = false; 
    	  /**
    	   * the replacement will be till the first space that exist before
    	   * the current cursor position. 
    	   */
    	  if(cursPosition > 0)
    	  {    		  
    		var prevChar = this.value.charAt(cursPosition-1);
    		if(prevChar == " ")
    		{
    			spaceDetectedBefore = true;
    		}
    	  }
    	  /**
    	   * [MarwanMaddah]: this pattern will catch all the words 
    	   * that are exists in the input from index 0 untill the current cursor position
    	   * then the last word will be replaced by the selected value from the Search result
    	   * /[^ ]+/g : catch all chain of characters that exists inside the input without spaces.
    	   * ex: <#match1 match3$%^<> match4 => result will be [match1,macth2,match3].
    	   */
    	  var patt      = /[^ ]+/g;
          var result    = strTillCurrPos.match(patt);
          var firstPart = "";
          if(result!= null && result.length > 0 && !spaceDetectedBefore)
          {        	  
             var resultLgth = result.length;
    	     firstPart  = strTillCurrPos.substring(0,strTillCurrPos.lastIndexOf(result[resultLgth-1])); 
          }
          else
          {
        	 firstPart = strTillCurrPos; 
          }
          this.value = firstPart + " " +ui.item.value +" "+ this.value.substring(cursPosition);
          return false;
       }
     });
};