//Binding keydown on document capture customization Enabling in dialogs 
if (typeof document.addEventListener != 'undefined') 
{
	document.addEventListener('keydown', enableCustConfigurationKeyed, false);
} 
else if (typeof document.attachEvent != 'undefined') 
{
	document.attachEvent('onkeydown', enableCustConfigurationKeyed);
} else 
{
	if (document.onkeydown != null) {
		var oldOnkeydown = document.onkeydown;
		document.onkeydown = function(e) {
			oldOnkeydown(e);
			enableCustConfigurationKeyed(e);
		};
	} else
		document.onkeydown = enableCustConfigurationKeyed;
}

// to add/remove customization icon on every Input.
function enableCustConfiguration(theCustIcon)
{
	var transIcon = document.getElementById("trans_icon");
	var settingsRight = (theCustIcon == null) ? false : true;
	var transRight = (transIcon == null) ? false : true;
	var usrBtnCust = document.getElementById("usrBtnCustRight");
	var usrBtnCustRight = ( usrBtnCust == null) ? false : true;
	var theIcon = theCustIcon
	if(!settingsRight)
	{
		theIcon = transIcon;
	}
	if(!transRight)
	{
		theIcon = usrBtnCust;
	}
	if(theIcon == null)
		return;
	// check if Custom mode already Enabled
	var isCustom = $("#"+theIcon.id).attr("cust_mode");
	if(isCustom !== "1")
	{
		//, label[labelKey]th.ui-th-column div,!
		/**
		 * [marwanmaddah]: the selector 'tr.ui-jqgrid-labels th.ui-th-column div' is to catch the columns header of the grid
		 *                 the selector 'th.path-double-header' is to catch the double header of the grid
		 * @param {Object} i
		 * @memberOf {TypeName} 
		 */
		var allInp = $("input.ui-state-focus[type='text'], textarea.ui-state-focus, select.ui-state-focus, input.path-dummy-cls[type='radio'],input.path-dummy-cls[type='checkbox'], label[labelKey!=''], div span.ui-dialog-title, div span.ui-jqgrid-title,ul.ui-tabs-nav li,span.collapsibleLabel,tr.ui-jqgrid-labels th.ui-th-column div, th.path-double-header,a.ui-button,a.fg-button, button.ui-button[type='button']:not([customBtnId]), div.path-collaps-panel, div.ui-toolbar, div.ui-jqgrid");

		allInp.each(function(i)
		{
			var theElement =  $(this);
			var elemId = theElement.attr("id");
			/**
			 * MarwanMaddah:
			 * added to block the customization in case the current element is inside a grid cell
			 * where the customization is not allowed.
			 * #BUG 683378 - Customization icon is not removing
			 */
			if(theElement.closest("td[role='gridcell']").length >0)
			{
				return true;
			}
			/**
			 * 
			 */
			/**
			 * MarwanMaddah
			 */
			var theElemPosition = theElement.css("position");
			var datePickerPosition = false;
			if (theElement.hasClass('hasDatepicker'))
			{
				theElemPosition = theElement.parent("div").parent().css("position");
				datePickerPosition = true;
			}
			var iconsCss = "";
			if(typeof theElemPosition !="undefined" && theElemPosition!=null && theElemPosition=="absolute")
			{
				
				var elemTop   = parseInt(theElement.css("top"))-10;
				var elemLeft  = theElement.css("left");
				if(datePickerPosition)
				{
					elemTop  = parseInt(theElement.parent("div").parent().css("top"))-10;
					elemLeft = theElement.parent("div").parent().css("left");
				}
				iconsCss = "left:"+elemLeft+"; top:"+elemTop+"px; position: absolute; z-index: 1001;"
			}
			/**
			 * End
			 */
			var _custScreen = theElement.closest("div.customization-screen"); 
			if(typeof _custScreen !="undefined" && _custScreen!=null && _custScreen.length > 0)
			{
			   return;	
			}
			/**
			 * [MarwanMaddah]:
			 * Used to not allowed the customization screen in case of dynamic screen configuration section 
			 * and previous process. 
			 */
			var _custScreenNotAllowed = theElement.closest("div.path-no-customization"); 
			if(typeof _custScreenNotAllowed !="undefined" && _custScreenNotAllowed!=null && _custScreenNotAllowed.length > 0)
			{
				return;	
			}
			/**
			 * [marwanmaddah]: in case there is '.' in the id, replace it by '_'
			 * and in case there is no id for the current element, build a new sequence by concatenate the i with 'coll_' 
			 */
			if(typeof elemId !="undefined" && elemId!=null && elemId!="")
			{
			   elemId = elemId.replace(/\./g,'_'); 
			}
			else
			{
			   elemId = "coll_"+i;	
			}

			var thebj = theElement;
			var elemntTagName = theElement.prop("tagName").toLowerCase()
			if(!thebj.hasClass("cust_avail"))
			{
				var elemParentTagName =  new String(theElement.parent().prop("tagName")).toLowerCase();
				while( elemParentTagName == "div" && !thebj.hasClass("ui-jqgrid"))
				{
					thebj = thebj.parent();
					elemParentTagName = new String(thebj.parent().prop("tagName")).toLowerCase();
				}
				var custOptions = "";
				/**
				 * [marwanmaddah]: 2 variables to check the current element, it is a double header or column header or not 
				 */
				var gdColHeader   = theElement.parent().hasClass('ui-th-column');
				var doubleHeader  = theElement.hasClass('path-double-header');
				var collapDiv     = theElement.hasClass('collapsibleLabel') && !theElement.hasClass('path-collaps-panel');
				var collapCont     = theElement.hasClass('path-collaps-panel');
				var dialogSpan    = theElement.hasClass('ui-dialog-title');
				var gridTitleSpan = theElement.hasClass('ui-jqgrid-title');
				var tabElement    = theElement.parent().hasClass('ui-tabs-nav');
				var buttonElement = theElement.hasClass('ui-button') || theElement.hasClass('fg-button');
				var submitElement = theElement.hasClass('ui-button');
				if(theElement.hasClass('path-screen-openned') || (elemntTagName=='label' && theElement.parent().hasClass('ui-button-text')))
				{
				  return;	
				}
				
				//*****************************************************************************************/
				/**
				 * [marwanmaddah]: add the span inside a table only in case the current element 
				 * is not a grid column header or double header   
				 */
				if(!gdColHeader && !doubleHeader && !collapDiv && !dialogSpan && !gridTitleSpan && !tabElement)
				{					
				 	custOptions = '<table id="relTbl'+theElement.attr("id")+'" cellpadding="0" cellspacing="0" border="0" style="'+iconsCss+'"><tr>';
				 	
				 	if(elemntTagName !== "label" && !buttonElement && !collapCont)
					{
				 		//check if it's a toolbar and the user has access rights
				 		if(theElement.is("div.ui-toolbar"))
				 		{
				 			if(usrBtnCustRight)
				 			{	
				 				var elementType = '';
				 				elementType = 'fromToolBar = "1"';
								var toolBarId = typeof theElement.attr("id") !== 'undefined' ? theElement.attr("id") : '';
								custOptions	+= '<td><span relId="' + toolBarId + '" id="button_cust_icon_'+ toolBarId + '" title="' + btn_cust_key_trns + '" class="ui-icon ui-icon-circle-plus added_cust_icon" onclick="buttonCustomizationOpen(this)"' + elementType + '></span></td>';
							}
				 		}
				 		else if(settingsRight)
						{
							/* value validation expression implementation */ 
							var elementType = '';
							if(theElement.is("textarea.ui-state-focus"))
							{
								elementType = 'fromTextArea = "1"';
							}
							else if(theElement.is("input.ui-state-focus[type='text']") 
									&& !theElement.hasClass("hasDatepicker")
									&& !theElement.hasClass("liveSearchText"))
							{
								elementType = 'fromText = "1"';
							}
							else if(theElement.hasClass("liveSearchText"))
							{
								elementType = 'fromLiveSearch = "1"';
							}
							else if(theElement.hasClass("hasDatepicker"))
							{
								elementType = 'fromDatePicker = "1"';
							}
							if(theElement.attr("allowDefValCust") == "true")
							{
								elementType += ' allowDefValCust = "true" ';
							}
							if(theElement.attr("mode") != undefined 
										&& theElement.attr("mode") != null
											&& theElement.attr("mode") != '')
							{
								elementType += ' mode = "' + theElement.attr("mode") + '" ';
							}
							if(theElement.hasClass("ui-jqgrid"))
							{
								elementType += 'grid';
								/**
                                 *[MarwanMaddah]
                                 * to add the grid caption to the icon tooltip 
                                 * to give more description when user focus on the icon above the grid or for a hidden grid.
                                 */
								var _grdId = theElement.attr("id").replace("gbox_","");
								var _grdCaption = $("#"+_grdId).jqGrid("getGridParam", "caption");
								var _iconToolTip = "";
								if(_grdCaption!=null && _grdCaption.trim()!="" && _grdCaption!="undefined")
								{
									_iconToolTip = for_key+" "+_grdCaption;
								}
								else
								{
									if(theElement.parents("div.liveSearchOverlay").length >= 1)
									{
										_iconToolTip = for_key+" "+live_search_key;
									}
									else
									{
										_iconToolTip = for_key+" "+view_grid_key;
									}
								}
								custOptions	+= '<td><span relId="'+theElement.attr("id")+'" relName="'+theElement.attr("name")+'"  id="config_icon_'+theElement.attr("id")+'" title="'+customize_icon_key_trns+" "+_iconToolTip+'" class="ui-icon ui-icon-wrench added_cust_icon" onclick="openObjectCustomization(this)"' + elementType + '></span></td>';								
							}
							else
							{								
								custOptions	+= '<td><span relId="'+theElement.attr("id")+'" relName="'+theElement.attr("name")+'"  id="config_icon_'+theElement.attr("id")+'" title="'+customize_icon_key_trns+'" class="ui-icon ui-icon-wrench added_cust_icon" onclick="openCustActions(this)"' + elementType + '></span></td>';
								custOptions	+='<td><span relId="'+theElement.attr("id")+'" relName="'+theElement.attr("name")+'"  id="trans_icon_'+theElement.attr("id")+'" title="'+((typeof tooltip_icon_key_trns === "undefined" )? "Business Translation":tooltip_icon_key_trns)+'" class="ui-icon ui-icon-comment floatLeftRight added_cust_icon" bustrx="1" onclick="elemCustOpen(this)"></span></td>';
							}
							
						}
					}
					else 
					{
						/**
					 	 * [MarwanMaddah]: in case of submit button add icon
					 	 * @param {Object} i
					 	 * @memberOf {TypeName} 
					 	 */
					 	if(settingsRight)
						{
					 		var relId = theElement.attr("id");
					 		var relName = (typeof theElement.attr("name") !="undefined" && theElement.attr("name")!=null)?theElement.attr("name"):relId;
						 	if(submitElement)
						 	{
						 			custOptions	+= '<td><span relId="'+relId+'" relName="'+relName+'"  id="config_icon_'+theElement.attr("id")+'" title="'+customize_icon_key_trns+'" class="ui-icon ui-icon-wrench added_cust_icon" fromButton="1" onclick="openCustActions(this)"></span></td>';
									custOptions	+='<td><span relId="'+relId+'" relName="'+relName+'"  id="trans_icon_'+theElement.attr("id")+'" title="'+((typeof tooltip_icon_key_trns === "undefined" )? "Business Translation":tooltip_icon_key_trns)+'" class="ui-icon ui-icon-comment floatLeftRight added_cust_icon" bustrx="1" onclick="elemCustOpen(this)"></span></td>';
						 	}
						 	if(collapCont)
						 	{
						 			custOptions	+= '<td><span relId="'+relId+'" relName="'+relName+'"  id="config_icon_'+theElement.attr("id")+'" title="'+customize_icon_key_trns+'" class="ui-icon ui-icon-wrench added_cust_icon" fromCollaps="1" onclick="openCustActions(this)"></span></td>';
									custOptions	+='<td><span relId="'+relId+'" relName="'+relName+'"  id="trans_icon_'+theElement.attr("id")+'" title="'+((typeof tooltip_icon_key_trns === "undefined" )? "Business Translation":tooltip_icon_key_trns)+'" class="ui-icon ui-icon-comment floatLeftRight added_cust_icon" bustrx="1" onclick="elemCustOpen(this)"></span></td>';
						 	}
					 	}
						if (transRight)
						{
							var lblKey = theElement.attr("labelKey");
							var type   = theElement.attr("type");
							if(buttonElement)
							{
								/**
								 * [MarwanMaddah]:
								 * in case there is an attribute 'type' with value 'button' so it is an PJS:submit
								 * in this case there is a children label inside the selected element 
								 * get the labelKey from this label
								 * ELSE: it is a psj:a button 
								 *       in this case no label inside it so no labelKey, we will get the value 
								 * @param {Object} i
								 * @memberOf {TypeName} 
								 */
								if(type=='button')
								{
								  lblKey = theElement.find("span.ui-button-text label[labelKey]").attr("labelKey");
								}
								else
								{
								  lblKey  = theElement.text().trim();
								}
							}
							
							if(!collapCont)
							{
									custOptions	+= '<td><span relId="'+elemId+'" id="lbl_trans_icon_'+elemId+'" title="'+trans_key+'" class="ui-icon ui-icon-pencil floatLeftRight added_cust_icon"';
									if(buttonElement && type !='button')
									{
									   custOptions	+= ' lblVal="'+lblKey+'"';	
									}
									else
									{
									   if(lblKey != undefined)
									   {	   
								   	    	custOptions	+= ' lblKey="'+lblKey+'"';
								   	   }
								   	   else if(theElement.parent().hasClass('ui-dialog-buttonset'))
								   	   {
								   		   var labelSpanVal = theElement.find( "span.ui-button-text").html();
								   		   custOptions	+= ' lblVal="'+labelSpanVal+'"';
								   	   }
								   	   else
								   	   {
								   		   if(theElement.text().trim() !== "")
								   	       {
								   			   custOptions	+= ' lblVal="'+theElement.text().trim()+'"'; 
								   	       }
								   	   }
								   	}
							   		custOptions	+= ' onclick="openCustLblTran(this,event)"></span></td>';
							}

						}
					}
					custOptions	+= '</tr></table>';
					/**
					 * [MarwanMaddah] : in case of submit button, 
					 * the customization icon will be added as first child the parent div 
					 * @param {Object} i
					 * @memberOf {TypeName} 
					 */
					if(buttonElement)
					{
						/**
						 * In case of dialog button, insert the customization table directly before the button tag 
						 */
						if(theElement.parent().hasClass('ui-dialog-buttonset'))
						{
							theElement.before(custOptions);
						}
						else
						{
							theElement.parent().prepend(custOptions);	
						}
					}
					else if(collapCont)
					{
						theElement.prepend(custOptions); 	
					}
					else
					{						
					   thebj.before(custOptions);
					}
				}
				/**
			     * [marwanmaddah]: to add the translation icon to the grid header and double header without table 
				 */
				else 
				{ 	
					var lblKey = theElement.attr("labelKey");
					if (transRight)
					{						
						custOptions	+= '<span id="lbl_trans_icon_'+elemId+'" title="'+trans_key+'" class="ui-icon ui-icon-pencil floatLeftRight added_cust_icon"';
						custOptions	+= ' lblVal="'+theElement.text().trim()+'"';
						/**
						 * [MarwanMaddah]: in case lblKey exist and Valid will be added to the icon 
						 */
						if(typeof lblKey!="undefined" && lblKey!=null && lblKey!="")
						{
							custOptions	+= ' lblKey="'+lblKey.trim()+'"';
						}
						custOptions	+= ' onclick="openCustLblTran(this,event)"></span>';
					}
					/**
					 * [MarwanMaddah]: add the customization icon to the tabs
					 * @param {Object} i
					 * @memberOf {TypeName} 
					 */
					if(tabElement && settingsRight)
					{
					   relName = (typeof theElement.attr("name") !="undefined" && theElement.attr("name")!=null)?theElement.attr("name"):elemId; 	
					   custOptions	+= '<span relId="'+elemId+'" relName="'+relName+'"  id="config_icon_'+elemId+'" title="'+customize_icon_key_trns+'" class="ui-icon ui-icon-wrench added_cust_icon" fromButton="0" fromTab ="1" onclick="openCustActions(this)"></span>';
					}
					
					theElement.append(custOptions);
				}
				//*****************************************************************************************/
				theElement.addClass("cust_avail");
				// showing hidden element and there labels upon Customization
				// if element is Live search means its parent div is hidden
				var isElementLiveSearch = (elemId && elemId.indexOf("lookuptxt") == 0 );
				/**
				 * in case the element has the dummy class 
				 * will check if the parents are hidden, to display them on CTRL+F2
				 * (ex: path account case the display:none will be at table and fieldset level)
				 * @param {Object} j
				 * @memberOf {TypeName} 
				 */
				if(theElement.hasClass("path-dummy-cls"))
				{
				  var elemParents = theElement.parents("table.path-dummy-cls,fieldset.path-dummy-cls");
				  elemParents.each(function(j){
					  var _currParent = $(this);
					  if(_currParent.css("display")==="none")
					  {
						_currParent.css("display","");
						_currParent.addClass("path_was_hidden");
					  }
				  });
				}
				if(theElement.css("display") === "none" || isElementLiveSearch)
				{
					var applyOnLabel = true;
					// live search element then find its parent div
					if(isElementLiveSearch)
					{
						var liveSearchDiv = $("#lookupdiv_"+elemId.substr(elemId.indexOf("lookuptxt_")+10));
						if(liveSearchDiv.css("display") === "none")
						{
							liveSearchDiv.css("display","");
							liveSearchDiv.addClass("path_was_hidden");
						}
					}
					else
					{
						theElement.css("display","");
						theElement.addClass("path_was_hidden");
						
					}
					// apply the hide on corresponding label if element is hidden
					if (applyOnLabel)
					{
						var elemLabel = $("label[for='"
								+ theElement.attr("id") + "']");
						if (elemLabel.css("display") === "none")
						{
							elemLabel.css("display", "");
						}

					}
				}
			}
		});
		
		 $("#"+theIcon.id).attr("cust_mode","1");
	}
	else
	{
		// removing all customization icons and removing class
		var allCustIcons = $(".added_cust_icon");
		allCustIcons.each(function(i)
		{
			var relInp = $(this).attr("relId");
			if(relInp)
			{
				// escaping spaces in the relInp in case available
				relInp = relInp.replace(/\s+/g,'\\ '); 
			}
			var elemId = $(this).attr("id");
			if(elemId)
			{
				// escaping spaces in the elemId in case available
				elemId = elemId.replace(/\s+/g,'\\ '); 
			}
			
			if($("#"+relInp).hasClass("cust_avail"))
			{
				$("#"+relInp).removeClass("cust_avail");
			}
			
			/**
			 * [marwanmaddah]:used in case of grid column headers and double headers to remove the cust_avail class
			 * @param {Object} theCustIconDiv
			 */
			if($("#"+elemId).parent().hasClass("cust_avail"))
			{
				$("#"+elemId).parent().removeClass("cust_avail");
			}
			// if element is Live search means its parent div is shown
			var isElementLiveSearch = (relInp && relInp.indexOf("lookuptxt_") == 0 );
			var liveSearchHasCust = false;
			var liveSearchDivId = "";
			if(isElementLiveSearch)
			{
				liveSearchDivId = "lookupdiv_"+relInp.substr(relInp.indexOf("lookuptxt_")+10);
				liveSearchHasCust = $("#"+liveSearchDivId).hasClass("path_was_hidden");
			}
			
			// check if previusly was hidden
			/**
			 * [Marwan Maddah]: Hide the parents of account that were hidden
			 * In case the current element is an account
			 * @param {Object} theCustIconDiv
			 * @param {Object} e
			 */
			if($("#"+relInp).hasClass("path-dummy-cls"))
			{
			  /**
			   * catch the parents that are either table or fieldset
			   * @param {Object} j
			   * @memberOf {TypeName} 
			   */
			  var elemParents = $("#"+relInp).parents("table.path-dummy-cls,fieldset.path-dummy-cls");
			  elemParents.each(function(j){
				  var _currParent = $(this);
				  if(_currParent.css("display")!=="none" && _currParent.hasClass("path_was_hidden"))
				  {
					_currParent.css("display","none");
				  }
			  });
			}

			if($("#"+relInp).hasClass("path_was_hidden") || liveSearchHasCust)
			{
				// check if livesearch element then parent div need to be hidden
				if(liveSearchHasCust)
				{
					$("#"+liveSearchDivId).css("display","none");
				}
				else	
				{
					$("#"+relInp).css("display","none");
				}
				// hide the corresponding Label
				var elemLabel = $("label[for='"+relInp+"']");
				if(elemLabel.css("display") !== "none")
				{
						elemLabel.css("display","none");
				}
			}
			$("#relTbl"+relInp).remove();
			/**
			 * [marwanmaddah]:used in case of grid column headers and double headers to remove the translation icon because in this case there is no relId
			 * @param {Object} theCustIconDiv
			 */

			$("#"+elemId).remove();
		});
		 $("#"+theIcon.id).attr("cust_mode","0");
	}
	
}

function openCustLblTran(theCustIconDiv,e)
{
	var keyElem = $("#"+theCustIconDiv.id);
    var lblKey  = keyElem.attr("lblKey");
    var lblVal  = keyElem.attr("lblVal");
    /**
     *[marwanmaddah] : in case the Key is not null then call the function related to get translation by Key
     * else call the function that get the translation based on the value
     */
    if(typeof lblKey !="undefined" && lblKey != null && lblKey!="")
    {   
		loadLblTransConfiguration(lblKey);
    }
    else
    {
    	loadLblTransByVal(lblVal);
    }
    // to prevent any click event on screen to continue
    if(e.preventDefault)
    {
    	e.preventDefault();
    	e.stopPropagation();
    }
    else
    {
    	e.returnValue = false;
    }
}

function openCustActions(theCustIconDiv)
{
	var iconElem = $("#"+theCustIconDiv.id);
	var elemId   = iconElem.attr("relId");
	var relName  = iconElem.attr("relName")
	var relTableId = $("#relTbl"+elemId).length > 0 ? "relTbl"+elemId:elemId;
	var curParams  = {elemName: relName,elemId:elemId};
	var _fromCommonScreen = $("#"+iconElem.attr("relId")).closest("div.path-common-sceen");
	var commonScreen = 0;
	if(typeof _fromCommonScreen!="undefined" && _fromCommonScreen!=null && _fromCommonScreen.length > 0)
	{
		commonScreen = 1;
		currPageRef = "SCRSETTCONF";
	}
	else if(typeof _pageRef != "undefined" || _pageRef!=null)
	{
		curParams._pageRef = _pageRef;
		currPageRef = _pageRef;
	}

	curParams.commonScreen = commonScreen;
	
	$.ajax({
		 url: jQuery.contextPath+"/path/customization/CustomizationMaint_checkEventsAccess",
         type:"post",
		 dataType:"json",
		 data: curParams,
		 success: function(data)
		 		{
			 		if(typeof data["_error"] == "undefined" || data["_error"] == null)
			 		{
			 			_showProgressBar(false);
			 			/**
			 			 * [MarwanMaddah]:
			 			 * for back work compatibility, in case the mirroeProcess value is null, undefined, empty or equals ZERO 
			 			 * that's mean that the MIR table is not available in database
			 			 * so the old behavior without approve management will be applied
			 			 */
			 			var mirrorProcess  = data["mirrorProcess"];
			 			if(typeof mirrorProcess !="undefined" && mirrorProcess!=null && mirrorProcess!="" && mirrorProcess!="0")
			 			{			 				
			 				var additionalArg  = {thisObjId:theCustIconDiv.id};
			 				var custMaintRight = data["custMaintRight"];
			 				if(typeof custMaintRight!="undefined" && custMaintRight!=null && custMaintRight!="")
			 				{
			 					additionalArg.custMaintRight = custMaintRight;
			 				}
			 				var custApproveRight = data["custApproveRight"];
			 				if(typeof custApproveRight!="undefined" && custApproveRight!=null && custApproveRight!="")
			 				{
			 					additionalArg.custApproveRight = custApproveRight;
			 				}
			 				toggleOptionsDiv("customization_options_div",relTableId,additionalArg);
			 			}
			 			else
			 			{
			 				elemCustOpen(theCustIconDiv);
			 			}
			 		}
			 		else // there is error
			 		{
			 			_showProgressBar(false);
			 		}
			 	}
	});
}
function elemCustOpen(theCustIconDiv,custActionType)
{
	if(typeof custActionType !="undefined" && custActionType!=null)
	{
		/**
		 * [MarwanMaddah]:
		 * in this case the arg[0] will be the id of the Div and that the div itself
		 * for that will get the html DOM based on the id
		 */
		theCustIconDiv = $("#"+theCustIconDiv)[0];
	}
	var globalCustElemDiv = $("<div id='global_elem_cust_div' class='path-common-sceen customization-screen'></div>");
	globalCustElemDiv.css("padding","0");
	var theBody = $('body');
	globalCustElemDiv.insertAfter(theBody);
	var iconElem = $("#"+theCustIconDiv.id);
	var fromButton = iconElem.attr("fromButton");
	var fromCollaps = iconElem.attr("fromCollaps");
	var fromTab = iconElem.attr("fromTab");
	var relName = iconElem.attr("relName"), relId = iconElem.attr("relId");
	var enableAfterExecution = false;
	if((typeof relName =="undefined" || relName ==null || relName =="") && typeof relId !="undefined" && relId != null && relId != "")
	{
		if(relId.indexOf("_hijriDate") != -1)
		{
			_showErrorMsg(hijriDate_cust_key,info_msg_title);
			return;
		}
	}
	
	/**
	 * [MarwanMaddah]:in case the selected element doesn't have id or name
	 * an information message will appear and customization screen will not open.
	 * @return {TypeName} 
	 */
	if((typeof relName =="undefined" || relName==null || relName==""  || relName.indexOf("submit_")==0 || relName.indexOf("anchor_")==0 ) && (typeof relId =="undefined" || relId==null || relId==""  || relId.indexOf("submit_")==0 || relId.indexOf("anchor_")==0 ))
	{
		_showErrorMsg(elemIdAndNameChecking_key,info_msg_title);
		return;
	}
	if(fromButton == 1 && typeof _pageRef !== "undefined")
	{
	   if(typeof $('#'+relId).attr("enableafterexecution")!== "undefined")
	   {
		   enableAfterExecution = $('#'+relId).attr("enableafterexecution");
	   }
	   if(relId.lastIndexOf("_"+_pageRef) > -1)
	   {
		   relId = relId.substring(0,relId.lastIndexOf("_"+_pageRef));
	   }	
	   if(relName.lastIndexOf("_"+_pageRef)>-1)
	   {
		   relName = relName.substring(0,relName.lastIndexOf("_"+_pageRef));
	   }	
		   
	}
	var curParams = {elemName: relName,elemId:relId,enableAfterExecution:enableAfterExecution};
	var currPageRef = "";
	if(typeof fromButton !="undefined" && fromButton!=null)
	{
	   	curParams.fromButton = fromButton;
	}
	if(typeof fromCollaps !="undefined" && fromCollaps!=null)
	{
	   	curParams.fromCollaps = fromCollaps;
	}
	
	/* value validation expression implementation */
	var fromText = iconElem.attr("fromText");
	var fromTextArea = iconElem.attr("fromTextArea");
	var fromDatePicker = iconElem.attr("fromDatePicker");
	var fromLiveSearch = iconElem.attr("fromLiveSearch");
	if(typeof fromText != "undefined" && fromText != null)
	{
	   	curParams.fromText = fromText;
	}
	else if(typeof fromTextArea != "undefined" && fromTextArea != null)
	{
		curParams.fromTextArea = fromTextArea;
	}
	else if(typeof fromLiveSearch != "undefined" && fromLiveSearch != null)
	{
		curParams.fromLiveSearch = fromLiveSearch;
	}	
	else if(typeof fromDatePicker != "undefined" && fromDatePicker != null)
	{
		curParams.fromDatePicker = fromDatePicker;
	}	
	else if(typeof fromTab != "undefined" && fromTab != null)
	{
		curParams.fromTab = fromTab;
	}	
	var allowDefValCust = iconElem.attr("allowDefValCust");
	if(typeof allowDefValCust != "undefined" && allowDefValCust == "true")
	{
		curParams.allowDefValCust = allowDefValCust;
	}
	var mode = iconElem.attr("mode");
	if(typeof mode != "undefined" )
	{
		curParams.mode = mode;
	}
	/**
	 * Maintenance
	 */	
	curParams.custActionType = "NOMIR";
	
	if(typeof custActionType!="undefined" && custActionType!=null)
	{
		if(1==custActionType)
		{			
			/**
			 * Approve
			 */
			curParams.custActionType = "P";
		}
		else if(2==custActionType)
		{
		   /**
		    * View
		    */
			curParams.custActionType = "V";
		}
		else
		{
			curParams.custActionType = "R";
		}
	}
	/**
	 * [MarwanMaddah]: the common screen will be catched based on the class which has been added to the div of the common screens
	 * @return {TypeName} 
	 */
	var _fromCommonScreen = $("#"+iconElem.attr("relId")).closest("div.path-common-sceen");
	var commonScreen = 0;
	if(typeof _fromCommonScreen!="undefined" && _fromCommonScreen!=null && _fromCommonScreen.length > 0)
	{
		commonScreen = 1;
		currPageRef = "SCRSETTCONF";
	}
	else if(typeof _pageRef != "undefined" || _pageRef!=null)
	{
		curParams._pageRef = _pageRef;
		currPageRef = _pageRef;
	}

	curParams.commonScreen = commonScreen;
	// check if Business Translation Icon
	var dialogTitle = "";
	if(iconElem.attr("bustrx"))
	{
		curParams.forTrans = 1;
		/**
		 * [MarwanMaddah]: added for dynamic title between toolTip translation and Customization
		 * @return {TypeName} 
		 */
		dialogTitle = (typeof toolTipTrans_key === undefined)?"ToolTip Translation" :toolTipTrans_key;
	}
	else
	{
	    /**
		 * [MarwanMaddah]: added for dynamic title between toolTip translation and Customization
		 * @return {TypeName} 
		 */
		dialogTitle = (typeof cust_det_key_trns === undefined) ? "Cusomization Details": cust_det_key_trns;
	}
	/**
	 * [MarwanMaddah]: Added label description to the dialog title in case of customization screen
	 * @return {TypeName} 
	 */
	   var relLabel     = $("label[for='"+iconElem.attr("relId")+"']");
	   if(relLabel!=null && typeof relLabel!=undefined && relLabel.html()!=null)
       {		   
		   var relLabelText = relLabel.text();
		   if(relLabelText!=null && typeof relLabelText!=undefined && relLabelText!="null")
		   {
			  dialogTitle += " "+for_key+" "+relLabelText;   
		   }
       }
	   /**
	    * [MarwanMaddah]: In case no Label the element name will be added to the title
	    * @return {TypeName} 
	    */
	   else
	   {
			var labelCatched = false;
		   /**
		    * [MarwanMaddah]: check if the current element is included in an account 
		    */
		   	var accountInputs = {};
			accountInputs["br"] = "br";
			accountInputs["cy"] = "cy";
			accountInputs["gl"] = "gl";
			accountInputs["cif"] = "cif";
			accountInputs["sl"] = "sl";
			var $element = $("#"+iconElem.attr("relId"));
            if($element.closest("fieldset[id^='pathAccount_']").length > 0 
					&& typeof $element.attr("inputorder") != "undefined" 
						&& $element.attr("inputorder") in accountInputs)
            {
               var $fieldSet = $($element.closest("fieldset[id^='pathAccount_']")[0]);
               $eltToGetLbl = $fieldSet
               var accLabel = $($eltToGetLbl.find("label")[0]);
               if(accLabel!=null && typeof relLabel!=undefined && accLabel.html()!=null)
               {
				   var relLabelText = accLabel.text();
				   if(relLabelText!=null && typeof relLabelText!=undefined && relLabelText!="null")
				   {
					  labelCatched = true; 
					  dialogTitle += " "+for_key+" "+relLabelText;   
				   }
               }
            }
            else
            {
			  /**
			   * [MarwanMaddah]: in case the current element is related to liveSearch 
			   * will get the related liveSearch element and from it will get the linked label
			   * @return {TypeName} 
			   */
			  var linkedToElem = $("input[relatedDescElt='"+iconElem.attr("relId")+"']");
			  if(linkedToElem!=null && typeof linkedToElem!="undefined")
			  {
				   
				   var relLabel     = $("label[for='"+linkedToElem.attr("id")+"']");
				   if(relLabel!=null && typeof relLabel!=undefined && relLabel.html()!=null)
			       {
					   var relLabelText = relLabel.text();
					   if(relLabelText!=null && typeof relLabelText!=undefined && relLabelText!="null")
					   {
						  labelCatched = true; 
						  dialogTitle += " "+for_key+" "+relLabelText;   
					   }
			       }
			  }
            }
		  if(!labelCatched)
		  {
			  /**
			   * [MarwanMaddah]: in case there is a title for the element will use it in the translation dialog title
			   *                 otherwise will use the element name between brakets 
			   */
			  var _elemTitle = $element.attr("title"); 
			  if(typeof _elemTitle !="undefined" && _elemTitle!=null && _elemTitle.trim()!="")
			  {
				dialogTitle += " "+for_key+" "+_elemTitle;
			  }
			  else
			  {				  
				  var relElemName  = iconElem.attr("relName");
				  var nameToConcat = "";
				  var splitValues = relElemName.split(".");
				  if(splitValues.length > 0)
				  {
					  nameToConcat = splitValues[splitValues.length-1]; 
				  }
				  else
				  {
					  nameToConcat = relElemName; 
				  }
				  dialogTitle +=" "+"("+nameToConcat+")";   
			  }
		  }
	   }
	var srcURL = jQuery.contextPath+'/path/customization/CustomizationMaint_loadCustMaintPage.action';
	_showProgressBar(true);
    /**
     * 
     */
		var theHeight = 655;
		if(curParams.forTrans === 1)
		{
			 theHeight = 450;
		}
		var theWidth = $.browser.msie?returnMaxWidth(950):returnMaxWidth(990);
		var closeBtnLbl = (typeof signature_close_btn === undefined )? "Close" :signature_close_btn;
		var buttons = [];
		//check if the field business related then prevent modifications. 
		var isBusRelated = $("#fldcust_busrelated_"+currPageRef).val();
		if(isBusRelated !== "1" || curParams.forTrans === 1)
		{
			var saveBtnLbl = (typeof saveLabel === undefined )? "Save":saveLabel;
			if(typeof custActionType !="undefined" && custActionType!=null && custActionType!="" && custActionType == 1)
			{
				saveBtnLbl       = (typeof grid_approveLabel==undefined || grid_approveLabel == null || grid_approveLabel == "")?"Approve":grid_approveLabel;
				var rejectButton = (typeof grid_rejectLabel==undefined || grid_rejectLabel == null || grid_rejectLabel == "")?"Reject":grid_rejectLabel;
				buttons.push({text:rejectButton
					          ,id:"fieldCust_rejectBtn"
					          ,click:function(){
							   /**
							    * call the reject even from server side to delete the record from the mirror table and close the dialog
							    */
					        	 _showProgressBar(true);
					        	 var theForm = $("#customizationMaintForm_"+currPageRef).serializeForm();
								 $.ajax({
									 url: jQuery.contextPath+"/path/customization/CustomizationMaint_rejectChanges",
							         type:"post",
									 dataType:"json",
									 data: theForm,
									 success: function(data)
									 		{
										 		if(typeof data["_error"] == "undefined" || data["_error"] == null)
										 		{
										 			//remove color picker from dom since we reload the screen again.
										 			 _showErrorMsg(record_rejected_Successfully_key,info_msg_title);
										 			 _showProgressBar(false);										 			 
										 			 $('#colorPickerDiv_id_' + _pageRef).remove();
										 			 $("#global_elem_cust_div").dialog("close");
										 		}
										 		else // there is error
										 		{
										 			_showProgressBar(false);
										 		}
										 	}
									 });

					          }
				             });
				
			}
			if(typeof custActionType =="undefined" || custActionType==null 
			   ||(typeof custActionType !="undefined" && custActionType!=null && 2!=custActionType))
			{	
				buttons.push({text:saveBtnLbl,id:"fieldCust_saveBtn",click:function()
					{
					proceedToSaving = function()
					{
						_showProgressBar(true);
						var thCustTbl =	$("#custFieldBusTransGridTbl_Id_"+currPageRef);
						if(thCustTbl.length>0)
						{
							var jsonBusTransUpdates = thCustTbl.jqGrid('getChangedRowData'); 
							
							//Add checking on the Language code value to prevent saving wrong codes
							var rows = thCustTbl.jqGrid('getDataIDs');
							var rowsLen = rows.length;
							
							for (var i = 0; i < rowsLen; i++) {
								var myObject = thCustTbl.jqGrid('getRowData', rows[i]);
								var rowLanCode = myObject["langCode"];
								if (rowLanCode == "-1" || rowLanCode == "" || rowLanCode == "undefined" || rowLanCode == null)
								{
									_showErrorMsg(invalid_lang_key, error_msg_title);
									_showProgressBar(false);
									return;
								}
							}
							$("#fldcust_transGridUpd_"+currPageRef).val(jsonBusTransUpdates);
						}
						var theForm = $("#customizationMaintForm_"+currPageRef).serializeForm();
						var selectedRowObject = null;
						
						//in case of activity mapping 
						if($('#ElementActivityGrid_Id_' + currPageRef).length > 0)
						{
							var $table = $("#ElementActivityGrid_Id_" + currPageRef);
							var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
							selectedRowObject = $table.jqGrid('getRowData', selectedRowId);
							var checkRequiredCells = $table.jqGrid('checkRequiredCells');
							if(checkRequiredCells)
							{	
								var jsonOpUpdates = $table.jqGrid('getAllRows',false);
								theForm += '&custCO.customElementActivitiesGridUpdate=' + encodeURIComponent(jsonOpUpdates);
							}
							else
							{
								_showProgressBar(false);
								return; 
							}
						}
						//in case of dynamic screen mapping
						if($('#dynScreenParamMapGrid_Id_' + currPageRef).length > 0 && selectedRowObject!=null
								&& selectedRowObject["sysParamElemActivitiesVO.ACTIVITY_TYPE"] == '1' )
						{
							var $table = $("#dynScreenParamMapGrid_Id_" + currPageRef);
							var checkRequiredCells = $table.jqGrid('checkRequiredCells');
							if(checkRequiredCells)
							{	
								var jsonOpUpdates = $table.jqGrid('getChangedTrimRowData',false);
								theForm += '&custCO.dynScrParamMapGridUpdate=' + encodeURIComponent(jsonOpUpdates);
								theForm += '&custCO.screenDispVO.ACTIVITY_TYPE=' +selectedRowObject["sysParamElemActivitiesVO.ACTIVITY_TYPE"];
							}
							else
							{
								_showProgressBar(false);
								return; 
							}
						}
						//in case of Global screen mapping
						if($('#ButtonCustParamMapGrid_Id_' + currPageRef).length > 0 && selectedRowObject!=null
								&& ( selectedRowObject["sysParamElemActivitiesVO.ACTIVITY_TYPE"] == '2' ||
										selectedRowObject["sysParamElemActivitiesVO.ACTIVITY_TYPE"] == '3' ||
										selectedRowObject["sysParamElemActivitiesVO.ACTIVITY_TYPE"] == '4' ||
										selectedRowObject["sysParamElemActivitiesVO.ACTIVITY_TYPE"] == '5' ||
										selectedRowObject["sysParamElemActivitiesVO.ACTIVITY_TYPE"] == '6' ||
										selectedRowObject["sysParamElemActivitiesVO.ACTIVITY_TYPE"] == '7'||
										selectedRowObject["sysParamElemActivitiesVO.ACTIVITY_TYPE"] == '9')
						)
						{
							var $table = $("#ButtonCustParamMapGrid_Id_" + currPageRef);
							//TP#934567 Button Customization Dynamic Screen Action Assignment - Parameter from Grid on Source Screen
							//Selection Type should not be empty in case of grid selection
							var selectedRowIdBtn = $table.jqGrid('getGridParam', 'selrow');
							var selectedRowObjectBtn = $table.jqGrid('getRowData', selectedRowId);
							var fromSource = selectedRowObjectBtn["fromSource"];
							if("GRID" == fromSource)
							{
								var selectionType = selectedRowObjectBtn["sysParamGlobalActArgMapVO.SELECTION_TYPE"];
								if(selectionType =="")
								{
									_showProgressBar(false);
									_showErrorMsg(missing_selection_type_key);
									return;
								}
							}
							var checkRequiredCells = $table.jqGrid('checkRequiredCells');
							if(checkRequiredCells)
							{	
								var jsonOpUpdates = $table.jqGrid('getAllRows',false);
								theForm += '&custCO.buttonCustParamMapGridUpdate=' + encodeURIComponent(jsonOpUpdates);
								theForm += '&custCO.screenDispVO.ACTIVITY_TYPE=' +selectedRowObject["sysParamElemActivitiesVO.ACTIVITY_TYPE"];
							}
							else
							{
								_showProgressBar(false);
								return; 
							}
						}
						
						$.ajax({
							url: jQuery.contextPath+"/path/customization/CustomizationMaint_updateChanges",
							type:"post",
							dataType:"json",
							data: theForm,
							success: function(data)
							{
								if(typeof data["_error"] == "undefined" || data["_error"] == null)
								{
									//remove color picker from dom since we reload the screen again.
									$('#colorPickerDiv_id_' + _pageRef).remove();
									// relaod the Dialog
									$("#global_elem_cust_div").load(srcURL, curParams, function()
											{
										_showErrorMsg(record_was_Updated_Successfully_key,info_msg_title);
										clearCachedPathData();
										_showProgressBar(false);
											});
								}
								else // there is error
								{
									_showProgressBar(false);
								}
							}
						});
					};
					// checkif required flag possible data
					var reqCheckBox = $("#fldcust_requiredFlag_"+currPageRef); 
					if(reqCheckBox.attr('initialValue') === "" && reqCheckBox.is(":checked"))
					{
						var theMsg = (typeof confirm_MandatorySet_Process_key !== "undefined")?confirm_MandatorySet_Process_key:"Confirm_MandatorySet_Process_key";
						_showConfirmMsg(
								"<span>"
								+ theMsg
								+ "</span><table width='100%'><tr><td align='center'><span title='"+help_key_var+"' style='border:solid 1px;' class='ui-icon ui-icon-help' onclick='callHelpWindow(\"SCRSETTCONF\",\"fldcust_requiredFlag_"+currPageRef+"\", \"custCO.requiredFlag\")'/></td></tr></table> ",
								confirm_msg_title, function(yesNo)
								{
									if(yesNo) 
									{
										proceedToSaving();
									}
								},"yesNo");
					}
					else
					{
						proceedToSaving();
					}
					}})
			}
		}
		buttons.push({text:closeBtnLbl,id:"fieldCust_closeBtn",click:function(){
						//remove the colorPickerDiv from dom because it should be reconstructed when reopening the customization window 
						$('#colorPickerDiv_id_' + _pageRef).remove();
						$("#global_elem_cust_div").dialog("close");
						}
					});
		if(cust_view_sql_enable === "1")
		{
			buttons.push({text:"View SQL",id:"fieldCust_viewSqlBtn",click:function(){
				var srcSqlURL = jQuery.contextPath+'/path/customization/CustomizationMaint_loadCustViewSql.action';
				var theForm = $("#customizationMaintForm_"+currPageRef).serializeForm();
				if($('#ElementActivityGrid_Id_' + currPageRef).length > 0)
				{
					var thCustTbl =	$("#ElementActivityGrid_Id_" + _pageRef);
					var rowData = thCustTbl.jqGrid('getDataIDs');
					if(rowData.length>0)
					{
						otherRow =	thCustTbl.jqGrid('getRowData', rowData[0]);
						if(otherRow["sysParamElemActivitiesVO.SCREEN_WIDTH"].length > 0)
						{
							theForm += '&custCO.screenDispVO.SCREEN_WIDTH=' + otherRow["sysParamElemActivitiesVO.SCREEN_WIDTH"]; 
						}
						if(otherRow["sysParamElemActivitiesVO.SCREEN_HEIGHT"].length > 0)
						{
							theForm += '&custCO.screenDispVO.SCREEN_HEIGHT=' + otherRow["sysParamElemActivitiesVO.SCREEN_HEIGHT"];
						}
					}
				}
				
				_showProgressBar(true);
				 $.ajax({
					 url: srcSqlURL,
			         type:"post",
					 dataType:"json",
					 data: theForm,
					 success: function(data)
					 		{
					 			if(typeof data["_error"] == "undefined" || data["_error"] == null)
					 			{
					 				var theSQLHtml = data["viewSQL"];
					 				_showErrorMsg(theSQLHtml, info_msg_title,returnMaxWidth(700),returnMaxHeight(600));
					 			}
					 			_showProgressBar(false);
					 		}
				 });
			}})
		}
		var _dialogOptions = {
						modal:true, 
                        title:dialogTitle,
                   		autoOpen:false,
                       	show:'slide',
                       	dialogClass: 'no-close',
                       	closeOnEscape: false,
                       	position:'center', 
                        width:theWidth,
                        height:returnMaxHeight(theHeight),
                        close: function (){
			 								  var theDialog = $(this);
			 								  theDialog.remove();
										  },
						buttons :buttons
						};
	/**
	 * 
	 */
	$("#global_elem_cust_div").load(srcURL, curParams, function() {_showProgressBar(false);});
	$("#global_elem_cust_div").dialog(_dialogOptions);
	$("#global_elem_cust_div").dialog("open");
}
function openObjectCustomization(theCustIconDiv)
{
	var globalObjectCustDiv = $("<div id='global_object_cust_div' class='path-common-sceen customization-screen'></div>");
	globalObjectCustDiv.css("padding","0");
	var theBody = $('body');
	globalObjectCustDiv.insertAfter(theBody);
	var iconElem = $("#"+theCustIconDiv.id);
	var relName = iconElem.attr("relName"), relId = iconElem.attr("relId");
	if((typeof relName =="undefined" || relName==null || relName==""  || relName.indexOf("submit_")==0 || relName.indexOf("anchor_")==0 ) && (typeof relId =="undefined" || relId==null || relId==""  || relId.indexOf("submit_")==0 || relId.indexOf("anchor_")==0 ))
	{
		_showErrorMsg(elemIdAndNameChecking_key,info_msg_title);
		return;
	}
	var curParams = {objectName: relName,objectId:relId};
	var currPageRef = "";
	
//	var fromLiveSearch = iconElem.attr("fromLiveSearch");
//	else if(typeof fromLiveSearch != "undefined" && fromLiveSearch != null)
//	{
//		curParams.fromLiveSearch = fromLiveSearch;
//	}	
	// if the grid is set to readonly from development then the adddelete and readonly combo must be disabled.
	if(!($("#"+relId.replace("gbox_", ""))[0].p.editinline == true || $("#"+relId.replace("gbox_", ""))[0].p.editinline=="true") 
			&& !($("#"+relId.replace("gbox_", ""))[0].p.fromCustomization == "true" || $("#"+relId.replace("gbox_", ""))[0].p.fromCustomization==true) )
	{
		curParams['custCO.isGridReadOnly'] = true;
	}
	var allowDefValCust = iconElem.attr("allowDefValCust");
	if(typeof allowDefValCust != "undefined" && allowDefValCust == "true")
	{
		curParams.allowDefValCust = allowDefValCust;
	}
	
	var mode = iconElem.attr("mode");
	if(typeof mode != "undefined" )
	{
		curParams.mode = mode;
	}
	
	var _fromCommonScreen = $("#"+iconElem.attr("relId")).closest("div.path-common-sceen");
	var commonScreen = 0;
	if(typeof _fromCommonScreen!="undefined" && _fromCommonScreen!=null && _fromCommonScreen.length > 0)
	{
		commonScreen = 1;
		currPageRef = "SCRSETTCONF";
	}
	else if(typeof _pageRef != "undefined" || _pageRef!=null)
	{
		curParams._pageRef = _pageRef;
		currPageRef = _pageRef;
	}
	
	curParams.commonScreen = commonScreen;
	var	dialogTitle = (typeof cust_det_key_trns === undefined) ? "Cusomization Details": cust_det_key_trns;
	
	/**
	 * [MarwanMaddah]
	 * In case the object is a grid will add the grid caption to the title of the customization screen 
	 * and in case the caption is null will add "Grid" as a static word to the dialog title.
	 * the customization icon appear for the hidden grid above the div which will appear as a line in this case
	 */
    var _addToTitle = "";
	if(relId.indexOf("gbox_") > -1)
	{
		var _grdId = relId.replace("gbox_","");
		var _grdCaption = $("#"+_grdId).jqGrid("getGridParam", "caption");
		if(_grdCaption!=null && _grdCaption.trim()!="" && _grdCaption!="undefined")
		{
			_addToTitle = for_key+" "+_grdCaption;
		}
		else
		{
			//checking if this method is called for live search
			if($(theCustIconDiv).parents("div.liveSearchOverlay").length >= 1)
			{
				_addToTitle = for_key+" "+live_search_key;
			}else{
				_addToTitle = for_key+" "+view_grid_key;
			}
		}		
	}
    dialogTitle += " "+_addToTitle;
    /**
     * End
     */
	var srcURL = jQuery.contextPath+'/path/objectCustomization/objectCustomizationMain_loadCustMaintPage.action';
	_showProgressBar(true);
	var theHeight = 555;
	var theWidth = $.browser.msie?returnMaxWidth(750):returnMaxWidth(890);
	var closeBtnLbl = (typeof signature_close_btn === undefined )? "Close" :signature_close_btn;
	var buttons = [];
	//check if the field business related then prevent modifications. 
	var isBusRelated = $("#fldcust_busrelated_"+currPageRef).val();
	buttons.push({text:saveLabel,id:"fieldCust_saveBtn",click:function(){
		
		 _showProgressBar(true);
			var theForm = $("#custObjectMaintForm_"+custScrPageRef).serializeForm();
			
			//in case of activity mapping 
			if($('#ObjectCustDetailsGrid_Id_' + currPageRef).length > 0)
			{
				var $table = $("#ObjectCustDetailsGrid_Id_" + currPageRef);
				var checkRequiredCells = $table.jqGrid('checkRequiredCells');
				if(checkRequiredCells)
				{	
					var jsonOpUpdates = $table.jqGrid('getAllRows');
					theForm += '&custCO.objectCustomizationDetailsGridUpdate=' + encodeURIComponent(jsonOpUpdates);
				}
				else
				{
					_showProgressBar(false);
					return; 
				}
			}
			
		    //in case of activity mapping 
			if($('#ElementActivityGrid_Id_' + currPageRef).length > 0)
			{
				var $table = $("#ElementActivityGrid_Id_" + currPageRef);
				var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
				selectedRowObject = $table.jqGrid('getRowData', selectedRowId);
				var checkRequiredCells = $table.jqGrid('checkRequiredCells');
				if(checkRequiredCells)
				{	
					var jsonOpUpdates = $table.jqGrid('getAllRows',false);
					theForm += '&custCO.customizationCO.customElementActivitiesGridUpdate=' + encodeURIComponent(jsonOpUpdates);
				}
				else
				{
					_showProgressBar(false);
					return; 
				}
			}
			
			//in case of Global screen mapping
			if($('#ButtonCustParamMapGrid_Id_' + currPageRef).length > 0 && selectedRowObject!=null
					&& ( selectedRowObject["sysParamElemActivitiesVO.ACTIVITY_TYPE"] == '8') )
			{
				var $table = $("#ButtonCustParamMapGrid_Id_" + currPageRef);
				var checkRequiredCells = $table.jqGrid('checkRequiredCells');
				if(checkRequiredCells)
				{	
					var jsonOpUpdates = $table.jqGrid('getAllRows',false);
					theForm += '&custCO.customizationCO.buttonCustParamMapGridUpdate=' + encodeURIComponent(jsonOpUpdates);
					theForm += '&custCO.customizationCO.screenDispVO.ACTIVITY_TYPE=' +selectedRowObject["sysParamElemActivitiesVO.ACTIVITY_TYPE"];
				}
				else
				{
					_showProgressBar(false);
					return; 
				}
			}
			
			 $.ajax({
				 url: jQuery.contextPath+"/path/objectCustomization/objectCustomizationMain_updateChanges",
		         type:"post",
				 dataType:"json",
				 data: theForm,
				 success: function(data)
		 		 {
					 
					 if(typeof data["_error"] == "undefined" || data["_error"] == null)
			 		 {
			 			// relaod the Dialog
			 			$("#global_object_cust_div").load(srcURL, curParams, function() 
			 			 {
				 			 _showErrorMsg(record_was_Updated_Successfully_key,info_msg_title);
				 			 clearCachedPathData();
				 			 _showProgressBar(false);
			 			 });
			 		 }
					 else
			 		 {
			 			_showProgressBar(false);
			 		 }
			 	 }
				 });
	}});
	
	buttons.push({text:closeBtnLbl,id:"fieldCust_closeBtn",click:function(){$("#global_object_cust_div").dialog("close");}})
	var _dialogOptions = {
			modal:true, 
			title:dialogTitle,
			autoOpen:false,
			show:'slide',
			dialogClass: 'no-close',
			closeOnEscape: false,
			position:'center', 
			width:theWidth,
			height:returnMaxHeight(theHeight),
			close: function (){
				var theDialog = $(this);
				theDialog.remove();
			},
			buttons :buttons
	};
	
	if(cust_view_sql_enable === "1")
	{
		buttons.push({text:"View SQL",id:"fieldCust_viewSqlBtn",click:function(){
			var srcSqlURL = jQuery.contextPath+'/path/objectCustomization/objectCustomizationMain_loadCustViewSql.action';
			var theForm = $("#custObjectMaintForm_"+custScrPageRef).serializeForm();
			//in case of activity mapping 
			if($('#ObjectCustDetailsGrid_Id_' + currPageRef).length > 0)
			{
				var $table = $("#ObjectCustDetailsGrid_Id_" + currPageRef);
				var checkRequiredCells = $table.jqGrid('checkRequiredCells');
				if(checkRequiredCells)
				{	
					var jsonOpUpdates = $table.jqGrid('getAllRows');
					theForm += '&custCO.objectCustomizationDetailsGridUpdate=' + encodeURIComponent(jsonOpUpdates);
				}
				else
				{
					_showProgressBar(false);
					return; 
				}
			}
			
			_showProgressBar(true);
			 $.ajax({
				 url: srcSqlURL,
		         type:"post",
				 dataType:"json",
				 data: theForm,
				 success: function(data)
				 		{
				 			if(typeof data["_error"] == "undefined" || data["_error"] == null)
				 			{
				 				var theSQLHtml = data["viewSQL"];
				 				_showErrorMsg(theSQLHtml, info_msg_title,returnMaxWidth(700),returnMaxHeight(600));
				 			}
				 			_showProgressBar(false);
				 		}
			 });
		}})
	}
	/**
	 * 
	 */
	$("#global_object_cust_div").load(srcURL, curParams, function() {_showProgressBar(false);});
	$("#global_object_cust_div").dialog(_dialogOptions);

	$(theCustIconDiv).parents("div.liveSearchOverlay").hide();

	$("#global_object_cust_div").dialog("open");
}

function buttonCustomizationOpen(theCustIconDiv, customAppName, customPageRef, customToolBarId, globalOperationMode)
{
	
	var buttonCustomDiv = $("<div id='buttonCustomDiv' class='path-common-sceen customization-screen'></div>");
	buttonCustomDiv.css("padding","0");
	var theBody = $('body');
	buttonCustomDiv.insertAfter(theBody);
	var relId = "";
	if(theCustIconDiv != undefined && theCustIconDiv != null)
	{
		var iconElem = $("#"+theCustIconDiv.id);
		relId = iconElem.attr("relId");
	}
	
	if(customToolBarId != undefined && customToolBarId != null && customToolBarId != '')
	{
		relId = customToolBarId;
	}
	
	var curParams = {"buttonCustomizationCO.sysParamBtnCustVO.TOOLBAR_ID":relId};
	var currPageRef = "";
	
	if(typeof _pageRef != "undefined" || _pageRef!=null)
	{
		curParams._pageRef = _pageRef;
		currPageRef = _pageRef;
	}
	
	if(customAppName != undefined && customAppName != null && customAppName != '')
	{
		curParams.appName = customAppName;
	}
	
	if(customPageRef != undefined && customPageRef != null && customPageRef != '')
	{
		curParams._pageRef = customPageRef;
		currPageRef = customPageRef;
	}
	
	var dialogTitle = (typeof btn_cust_key_trns === undefined) ? "Button Cusomization": btn_cust_key_trns;
	
	if(globalOperationMode != undefined && globalOperationMode != null && globalOperationMode != '')
	{
		curParams.globalOperationMode = globalOperationMode;
		dialogTitle = (typeof global_activities_key_trns === undefined) ? "Global Activities": global_activities_key_trns;
	}
	
	var srcURL = jQuery.contextPath+'/path/buttoncustomization/ButtonCustomizationMaint_loadButtonCustDialog.action';

	_showProgressBar(true);
    
	var theHeight = 750;
	
	var theWidth = $.browser.msie?returnMaxWidth(1200):returnMaxWidth(1200);
	var closeBtnLbl = (typeof signature_close_btn === undefined )? "Close" :signature_close_btn;
	var buttons = [];
	
	buttons.push({text:saveLabel,id:"buttonCust_saveBtn",click:function(){
												  buttonCustomization_onSaveClicked();
											}
	});
	
	buttons.push({text:closeBtnLbl,id:"buttonCust_closeBtn",click:function(){
												  $("#buttonCustomDiv").dialog("destroy");
											      $("#buttonCustomDiv").remove();
											}
	});
	var _dialogOptions = {
						modal:true, 
                        title:dialogTitle,
                   		autoOpen:false,
                       	show:'slide',
                       	dialogClass: 'no-close',
                       	closeOnEscape: false,
                       	position:'center', 
                        width:theWidth,
                        height:returnMaxHeight(theHeight),
                        close: function (){
			 								  $("#buttonCustomDiv").dialog("destroy");
											  $("#buttonCustomDiv").remove();
										  },
						buttons :buttons
						};
	/**
	 * 
	 */
	$("#buttonCustomDiv").load(srcURL, curParams, function() {_showProgressBar(false);});
	$("#buttonCustomDiv").dialog(_dialogOptions);
	$("#buttonCustomDiv").dialog("open");
}

function custAddLanguageGrid()
{
	var thCustTbl =	$("#custFieldBusTransGridTbl_Id_"+custScrPageRef);
	// add new row
	var rId = thCustTbl.jqGrid('addInlineRow', {});
}
function custDeleteLanguageGrid(theRowId)
{
	_showConfirmMsg((typeof Confirm_Delete_Process_key != undefined)?Confirm_Delete_Process_key:"Delete Selected Row?",confirm_msg_title,function(yesNo)
	                                    {
											if(yesNo) 
											{
												$("#custFieldBusTransGridTbl_Id_"+custScrPageRef).jqGrid('deleteGridRow',theRowId);
											}
										},"yesNo");
	
}
function custBusTransLangChanged()
{
	var thCustTbl =	$("#custFieldBusTransGridTbl_Id_"+custScrPageRef);
	var selRow = thCustTbl.jqGrid("getGridParam",'selrow');
	// if not new row then take langCode from Code Hidden column
	var selLangCode = thCustTbl.jqGrid('getCell', selRow, 'langDesc');
	if(selRow.indexOf("new_") < 0)
	{
		 selLangCode =  thCustTbl.jqGrid('getCell', selRow, 'langCode');
	}
	
    var rows =  thCustTbl.jqGrid('getDataIDs');
    var rowsLen = rows.length;
    
	 for(i=0; i<rowsLen; i++)
	 {
			var myObject      = thCustTbl.jqGrid('getRowData',rows[i]);
			if(rows[i] !== selRow)
			{
				var rowLanCode = myObject["langCode"];
				// if not the selected row has same value already
				if(rowLanCode === selLangCode)
				{
					_showErrorMsg(typeof same_language_key_trns != undefined ?same_language_key_trns:"Same Language Already Chosen",error_msg_title);
					thCustTbl.jqGrid('setCellValue', selRow,"langCode","-1");
					thCustTbl.jqGrid('setCellValue', selRow,"langDesc","");
					return;
				}
			}
	 }
	thCustTbl.jqGrid('setCellValue', selRow,"langCode",selLangCode);
	
}
function customizationGridRowSelect(rowObj)
{
	var thCustTbl =	$("#custFieldBusTransGridTbl_Id_"+custScrPageRef);
	var selectedRowInd = rowObj.originalEvent.id
	if(selectedRowInd.indexOf("new_") < 0) // not new row  should be non editable
	{
		thCustTbl.jqGrid('setCellReadOnly', selectedRowInd, "langDesc","true");
	}
}

function enableCustConfigurationKeyed(e) 
{
	e = e ? e : window.event;
	var t = e.target ? e.target : e.srcElement ? e.srcElement : null;
	var k = e.keyCode ? e.keyCode : e.which ? e.which : null;

	// CTRL+F2 key clicked for Customization in Dialogs
	if (k == 113 && e.ctrlKey) 
	{
		var theCustIcon = document.getElementById("config_icon");
		var theTransIcon = document.getElementById("trans_icon");
		var usrBtnCustRight = document.getElementById("usrBtnCustRight");
		//if settings or labeling or button customization exist, show corresponding icons
		if(theCustIcon != null || theTransIcon != null || usrBtnCustRight != null)
		{
			enableCustConfiguration(theCustIcon);
		}
	}
	/*else // temporarly becaue of connection Time out on Virtual Machine
		if (k == 81 && e.ctrlKey) 
		{
			  _showProgressBar(false);
		}
	*/
	
}
/**
 * check not to permit of removing visibility if Required is checked
 * @param {Object} theCheckBox
 * @param {Object} what
 */
function fldcust_CheckVisbleRequired(element, what)
{
	var elemId  = element.id;
	var elemVal = $("#"+elemId).val();
	var prevVal = $("#"+elemId).attr("prevvalue");
	var fldDepVisible = "0";
	var fldcust_fromCollaps = $("#fldcust_fromCollaps_"+custScrPageRef).val();
	var fldcust_fromButton = $("#fldcust_fromButton_"+custScrPageRef).val();
	var fldcust_fromTab  = $("#fldcust_fromTab _"+custScrPageRef).val();
	// if Required Checked
	
	if(what == 'REQ' || what == 'FLD_DEP')
	{
		var visCheck = $("#fldcust_visibleFlag_" + custScrPageRef);
		var isVisChecked = visCheck.val();// is(":checked");
		if (isVisChecked == "0" || isVisChecked == "4") 
		{
			visCheck.val("1"); //attr("checked","checked");
			visCheck.attr("prevvalue","1");
		}
		
		// feild Dependent
		if(what == 'FLD_DEP')
		{
			// check if required is Checked then it should be Unchecked
			var reqCheck = $("#fldcust_requiredFlag_" + custScrPageRef);
			var isReqChecked = reqCheck.val(); //is(":checked");
			if (isReqChecked != "0") 
			{
				reqCheck.val("0"); //removeAttr("checked");
			}
			if (element.checked)
			{
				fldDepVisible = "1";
			}
			
			// check if non of Options selected to select first
			var anyChecked = $("input:radio[id^='languageDepFields_'][checked]").length;
			if(anyChecked <= 0)
			{
				 $("#languageDepFields_" + custScrPageRef+"1").attr("checked","checked");
			}
		}
		else
		{
			// check if Feild Dependent is Checked then it should be Unchecked
			var fldDepCheck = $("#fldcust_arabicDepntFlag_" + custScrPageRef);
			var isFldDepChecked = fldDepCheck.is(":checked");
			if (isFldDepChecked) 
			{
				fldDepCheck.removeAttr("checked");
			}
			if(elemVal != "0")
			{
               var readOnlyElem = $("#fldcust_readOnlyFlag_" + custScrPageRef);
	           var readOnlyVal  = readOnlyElem.val();
	           if(readOnlyVal =="1")
	           {	        	   
			      _showErrorMsg(checkReadOnly_key, warning_msg_title);
			      $("#"+elemId).val(prevVal);
			      return;
	           }
	           if(elemVal == "2" || elemVal == "3")
	           {	        	   
			   	  manageDynamicDisplay("fldcust_mandatoryExpr_" + custScrPageRef,{fldcust_mandatoryExpr:{IS_VISIBLE:"1"}},"fldcust_mandatoryExpr");
	           }
	           else
	           {
				  $("#fldcust_mandatoryExpr_"+custScrPageRef).val("");
			      manageDynamicDisplay("fldcust_mandatoryExpr_" + custScrPageRef,{fldcust_mandatoryExpr:{IS_VISIBLE:"0"}},"fldcust_mandatoryExpr");
	           }
			}
			else
			{
				$("#fldcust_mandatoryExpr_"+custScrPageRef).val("");
			    manageDynamicDisplay("fldcust_mandatoryExpr_" + custScrPageRef,{fldcust_mandatoryExpr:{IS_VISIBLE:"0"}},"fldcust_mandatoryExpr");
			}
		}
		// show Arabic Latin options
		hideShowFieldDepOptions(fldDepVisible);
	}
	else if(what == 'VIS')// visibility comboBox
	{
		//check if elements in collapsible panel have required attribute
		//then Visibility cannot be Unchecked
		if(fldcust_fromCollaps == "1")
		{
			var theCustomDivName = $("#customId").val();
			var theCustomDivObject = $("#"+theCustomDivName);
			var divContent = theCustomDivObject.find("[required*='true']");
			if(divContent.length > 0)
			{
				_showErrorMsg(visbilityRemNotAllowed_trns, warning_msg_title);
				$("#"+elemId).val(prevVal);
				return;
			}
		}
		if(elemVal == "2" || elemVal == "3")
		{
			manageDynamicDisplay("fldcust_visibleExpr_" + custScrPageRef,{fldcust_visibleExpr:{IS_VISIBLE:"1"}},"fldcust_visibleExpr");
		}
		else
		{
			if ((elemVal == "0" || elemVal == "4") && fldcust_fromButton!="1" && fldcust_fromTab!="1")
			{
				// check if required is Checked or Field Dependent is checked then Visibility cannot be Unchecked
				var reqCheck = $("#fldcust_requiredFlag_" + custScrPageRef);
				var isReqChecked = reqCheck.val(); //.is(":checked");
				
				var fldDepCheck = $("#fldcust_arabicDepntFlag_" + custScrPageRef);
				var isFldDepChecked = fldDepCheck.is(":checked");
				if ((isReqChecked!="0" || isFldDepChecked) && fldcust_fromCollaps!="1")
				{
					_showErrorMsg(visbilityRemNotAllowed_trns, warning_msg_title);
					$("#"+elemId).val(prevVal);
					return;
	//				theCheckBox.checked = true;
				}
			}
            $("#fldcust_visibleExpr_"+custScrPageRef).val("");
			manageDynamicDisplay("fldcust_visibleExpr_" + custScrPageRef,{fldcust_visibleExpr:{IS_VISIBLE:"0"}},"fldcust_visibleExpr");

		}
	}
	else if(what == 'READONLY')//readOnly management
	{
	   	/**
		 * check if the element is required, so we cannot put this element as readOnly 
		 * @param {Object} hideShow
		 */
	   if(fldcust_fromButton!="1" && fldcust_fromTab!="1")
	   {		   
	       var reqCheck = $("#fldcust_requiredFlag_" + custScrPageRef);
		   var isReqChecked = reqCheck.val();
		   if((isReqChecked =="1" && elemVal == "1") || ((isReqChecked !="0" && elemVal == "1")))
		   {
			 _showErrorMsg(editableRemNotAllowed_trns, warning_msg_title);
			 $("#"+elemId).val(prevVal);
			 return;
		   }
	   }
	   
	   if(elemVal == "2" || elemVal == "3")
	   {
		 manageDynamicDisplay("fldcust_readonlyExpr_" + custScrPageRef,{fldcust_readonlyExpr:{IS_VISIBLE:"1"}},"fldcust_readonlyExpr");    
	   }
	   else
	   {
		 $("#fldcust_readonlyExpr_"+custScrPageRef).val("");
		 manageDynamicDisplay("fldcust_readonlyExpr_" + custScrPageRef,{fldcust_readonlyExpr:{IS_VISIBLE:"0"}},"fldcust_readonlyExpr");    
	   }
	}
	else
	{
	   if(elemVal =="2" || elemVal =="3")
	   {
		  manageDynamicDisplay("fldcust_allowZeroExpr_" + custScrPageRef,{fldcust_allowZeroExpr:{IS_VISIBLE:"1"}},"fldcust_allowZeroExpr");
	   }
	   else
	   {
		  $("#fldcust_allowZeroExpr_"+custScrPageRef).val(""); 
		  manageDynamicDisplay("fldcust_allowZeroExpr_" + custScrPageRef,{fldcust_allowZeroExpr:{IS_VISIBLE:"0"}},"fldcust_allowZeroExpr");  
	   }
	}
	$("#"+elemId).attr("prevvalue",elemVal);
}
function hideShowFieldDepOptions(hideShow)
{
	// hide Arabic Latin options
	var addElts = {languageDepFields:{IS_VISIBLE:hideShow}};
	manageDynamicDisplay("languageDepFields_" + custScrPageRef,addElts,"languageDepFields");
}
function fldcust_labelKeyChecking(element,what)
{
	var elemId = element.id;
	if(what=="LABELKEY")
	{
		if(element.checked)
		{
		    $("#fldcust_radiolabelExprKey_"+custScrPageRef).prop("checked", false);
		    $("#fldcust_labelKeyExpr_" + custScrPageRef).val("");
	  	    manageDynamicDisplay("fldcust_labelKeyExpr_" + custScrPageRef,{fldcust_labelKeyExpr:{IS_VISIBLE:"0"}},"fldcust_labelKeyExpr");	
	  	    manageDynamicDisplay("lookuptxt_fldcust_labelKey_" + custScrPageRef,{lookuptxt_fldcust_labelKey:{IS_VISIBLE:"1"}},"lookuptxt_fldcust_labelKey");	
		}
		else
		{
			$("#lookuptxt_fldcust_labelKey_" + custScrPageRef).val("");
			$("#labelKeyDesc_" + custScrPageRef).val("");
	  	    manageDynamicDisplay("fldcust_labelKeyExpr_" + custScrPageRef,{fldcust_labelKeyExpr:{IS_VISIBLE:"0"}},"fldcust_labelKeyExpr");	
	  	    manageDynamicDisplay("lookuptxt_fldcust_labelKey_" + custScrPageRef,{lookuptxt_fldcust_labelKey:{IS_VISIBLE:"0"}},"lookuptxt_fldcust_labelKey");	
		}
	}
	else
	{
		if(element.checked)
		{
			$("#fldcust_radiolabelKey_"+custScrPageRef).prop("checked", false);
			$("#lookuptxt_fldcust_labelKey_" + custScrPageRef).val("");
			$("#labelKeyDesc_" + custScrPageRef).val("");
			manageDynamicDisplay("fldcust_labelKeyExpr_" + custScrPageRef,{fldcust_labelKeyExpr:{IS_VISIBLE:"1"}},"fldcust_labelKeyExpr");
			manageDynamicDisplay("lookuptxt_fldcust_labelKey_" + custScrPageRef,{lookuptxt_fldcust_labelKey:{IS_VISIBLE:"0"}},"lookuptxt_fldcust_labelKey");
		}
		else
		{
			$("#fldcust_labelKeyExpr_" + custScrPageRef).val("");
			manageDynamicDisplay("fldcust_labelKeyExpr_" + custScrPageRef,{fldcust_labelKeyExpr:{IS_VISIBLE:"0"}},"fldcust_labelKeyExpr");
			manageDynamicDisplay("lookuptxt_fldcust_labelKey_" + custScrPageRef,{lookuptxt_fldcust_labelKey:{IS_VISIBLE:"0"}},"lookuptxt_fldcust_labelKey");
		}
	}
}
function fldcust_resetCustomization()
{
	var fldcust_fromCommonScreen = $("#fldcust_fromCommonScreen_"+custScrPageRef).val();
	_showConfirmMsg(
			(typeof Confirm_Delete_Process_key != undefined) ? Confirm_Delete_Process_key
					: "Reset Customization?", confirm_msg_title,
			function(yesNo)
			{
				if (yesNo)
				{
						_showProgressBar(true);
						
						var currPageRef = "";
						var curParams = {};
						if(typeof _pageRef !== "undefined")
						{
							curParams._pageRef = _pageRef;
							currPageRef = _pageRef;
						}
						if(fldcust_fromCommonScreen=="1")
						{
							curParams._pageRef = "SCRSETTCONF";
							currPageRef = "SCRSETTCONF";
						}
						curParams.elemId = $("#fldcust_elemTechId_"+currPageRef).val();
						curParams.elemName = $("#fldcust_elemTechName_"+currPageRef).val();
						curParams.fromButton = fromButton;
						curParams.fromTab = fromTab;
						curParams.fromText = $("#fldcust_fromText_"+currPageRef).val();
						curParams.fromTextArea = $("#fldcust_fromTextArea_"+currPageRef).val();
						curParams.fromDatePicker = $("#fldcust_fromDatePicker_"+currPageRef).val();
						var srcURL = jQuery.contextPath+'/path/customization/CustomizationMaint_loadCustMaintPage.action';
						var theForm = $("#customizationMaintForm_"+currPageRef).serializeForm();
						
						//in case of activity mapping 
						if($('#ElementActivityGrid_Id_' + currPageRef).length > 0)
						{
							var $table = $("#ElementActivityGrid_Id_" + currPageRef);
							var jsonOpUpdates = $table.jqGrid('getAllRows',false);
							theForm += '&custCO.customElementActivitiesGridUpdate=' + encodeURIComponent(jsonOpUpdates);
						}
						
						$.ajax({
							 url: jQuery.contextPath+"/path/customization/CustomizationMaint_resetChanges",
					         type:"post",
							 dataType:"json",
							 data: theForm,
							 success: function(data)
							 		{
								 		if(typeof data["_error"] == "undefined" || data["_error"] == null)
								 		{
								 			// relaod the Dialog
								 		 $("#global_elem_cust_div").load(srcURL, curParams, function()
								 			 {
									 			 _showErrorMsg(record_was_Updated_Successfully_key,info_msg_title);
									 			 clearCachedPathData();
									 			 _showProgressBar(false);
								 			 });
								 		}
								 		else // there is error
								 		{
								 			_showProgressBar(false);
								 		}
								 	}
							 });
			} }, "yesNo");

}

/**
 * Save As method for opening dialog to Duplicate Existing screen.
 */
function cust_saveAsScreen()
{
	// check if screen is opened to duplicate.
	if(typeof _pageRef === "undefined" || _pageRef === "" || _pageRef == undefined)
	{
		_showErrorMsg(choose_save_as_screen_key,info_msg_title);
		return;
	}
	else
	{
		var	saveAsDiv = $("<div id='cust_save_as_div_"+_pageRef+"' class='path-common-sceen'/>");
		saveAsDiv.css("padding","0");
	    saveAsDiv.insertAfter($('body'));
	    
	    var curParams = {_pageRef:_pageRef,"custCO.screenName":document.title};
	    
	    _showProgressBar(true);
	    var srcURL = jQuery.contextPath+'/path/customization/CustomizationMaint_loadSaveAsPage';
		$("#cust_save_as_div_"+_pageRef).load(srcURL, curParams, function() 
		{
			_showProgressBar(false);
			
			
		    $("#cust_save_as_div_"+_pageRef).dialog(
		    		{modal:true, 
	                 title: (typeof save_as_title_key === "undefined")?"Save As Screen" :save_as_title_key ,
	                 autoOpen:false,
	                 show:'slide',
	                 position:'center', 
	                 width:returnMaxWidth(430),
	                 height:returnMaxHeight(200),
	                 close: function (){
						  var theDialog = $(this);
						  theDialog.remove();
						}
		    		});
			$("#cust_save_as_div_"+_pageRef).dialog("open");
		});
	}
}


/**
 * This function is called on clicking selectAll checkbox. 
 * It is used to mark all rows as "changed" (respectively "unchanged") when selectAll checkbox is checked (respectively "unchecked")
 * @author SimonRizkallah
 */
function onSelectAllSavedScreens( objEvent, selectedRowsTable )
{		
	var selectAllStaus = objEvent.originalEvent.status;		
	var $table = $("#deleteSavedScreensGridID");	
	var isChanged = (selectAllStaus) ? "1" : "0";	
	var rowsIds = $table.jqGrid('getDataIDs');								
	for( var i = 1; i <= rowsIds.length; i++ )
	{		
		var myHtmlRow = $table.jqGrid( "getInd", i, true );		
		var $myHtmlRowObj = $(myHtmlRow);									
		$myHtmlRowObj.attr( "changed", isChanged );
		if(!selectAllStaus)
		{	
			// uncheck all checkboxes (within a row) when that row is unchecked
			$("#" + i + "_deleteParent").prop('checked', false);
			$("#" + i + "_deleteSeries").prop('checked', false);
		}	
	}	
}



/**
 * Uncheck all checkboxes (within a row) when that row is unchecked.
 * Mark a selected row as changed when that row is checked; otherwise we mark the row as unchanged. 
 * @author SimonRizkallah
 */
function custOnRowSelTopic(rowObj)
{																																		
	var $table = $("#deleteSavedScreensGridID");	
	var selectedRowId = rowObj.originalEvent.id;
	var myHtmlRow = $table.jqGrid( "getInd", selectedRowId, true );		
	var $myHtmlRowObj = $(myHtmlRow);														
	var isMultiSelectCheckBoxChecked = rowObj.originalEvent.status;
	var isChanged = (isMultiSelectCheckBoxChecked) ? "1" : "0";
	if( !isMultiSelectCheckBoxChecked )
	{		
		// uncheck all checkboxes (within a row) when that row is unchecked
		$("#" + selectedRowId + "_deleteParent").prop('checked', false);
		$("#" + selectedRowId + "_deleteSeries").prop('checked', false);
	}
	$myHtmlRowObj.attr( "changed", isChanged );
}



/**
 * call the jqgrid setSelection function when row is checked and is not in the grid selected rows array
 * @author SimonRizkallah
 * @param e
 */
function callSetSelection(e)
{	
	if(e)
	{																							
		var $table = $("#deleteSavedScreensGridID");																
		var selection = e.currentTarget.id.substring( 0, e.currentTarget.id.indexOf('_') );	 	
		var selRowIds = $table.jqGrid("getGridParam", "selarrrow");												
		var $myCheckbox = $("#" + (e.currentTarget.id));
		var myHtmlRow = $table.jqGrid( "getInd", selection, true );		
		var $myHtmlRowObj = $(myHtmlRow);
		if( $myCheckbox.prop('checked') === true && $.inArray(selection,selRowIds) === -1 )		
		{																									
			$table.jqGrid('setSelection', selection, false);			
		}
		$myHtmlRowObj.attr( "changed", "1" );				
	}
}



/**
 * open the page of the saved as screens grid 
 * @author SimonRizkallah
 */
function cust_deleteSvdScrnsOpen()
{	
	// get the array of all opened screens
	var anyScreenOpened = $.find("li.path-screen-openned");		
	if(anyScreenOpened.length > 0)
	{
		// if any screen is opened. then prompt user to close it (because we can't delete a screen when it is opened) 
		_showErrorMsg( close_all_opened_screen_key, info_msg_title );				
		return;
	}	
	var	deleteSavedScreensDiv = $("<div id='cust_delete_saved_screens_div_ID' class='path-common-sceen'/>");
	deleteSavedScreensDiv.css("padding","0");
	deleteSavedScreensDiv.insertAfter($('body'));
	var curParams = "";
	_showProgressBar(true);
	var srcURL = jQuery.contextPath+'/path/customization/CustomizationMaint_loadDeleteSvdScrnsPageActionMethod';
	$("#cust_delete_saved_screens_div_ID").load(srcURL, curParams, function(){																						
			_showProgressBar(false);
	    	$("#cust_delete_saved_screens_div_ID").dialog
	    	({
	    		 modal:true, 
	             title: delete_saved_screens_key,
	             autoOpen:false,
	             show:'slide',
	             position:'center',	          
	             width:returnMaxWidth(820),
	             height:returnMaxHeight(420),
	             close: function ()
	             {									
					  var theDialog = $(this);			
					  theDialog.remove();
				 }
	    	});		
			$("#cust_delete_saved_screens_div_ID").dialog("open");
	});
}




/**
 * close the window of the saved screens grid
 * @author SimonRizkallah
 */
function cust_closeDeleteSvdScrnsWindow()
{
	$("#cust_delete_saved_screens_div_ID").dialog("destroy");
	$("#cust_delete_saved_screens_div_ID").remove();	
}




/**
 * delete the selected saved screens
 * @author SimonRizkallah
 */
function deleteSavedScreens( deleteFromFlip )
{																																																
	var $table = $("#deleteSavedScreensGridID");										
	var myUpdates = $table.jqGrid("getChangedRowData");
	if( myUpdates == "" )
	{
		_showErrorMsg( please_select_one_row_key_var, warning_msg_title );
		return;
	}
	else
	{			
		var myUpdatesObj = JSON.parse( myUpdates );
		var myChangedDataArray = myUpdatesObj["root"];
		var seLRowDetailsIncludePrimaryKeysJsonString = '{"root":[]}';
		var myObj;																				
		for( var i = 0; i < myChangedDataArray.length; i++ )
		{
			var rowData = myChangedDataArray[i];													
			var rowDataNeeded = { 
					'deleteSeries': rowData["deleteSeries"],
					'deleteParent': rowData["deleteParent"],
					'PROG_REF' : rowData["PROG_REF"],
					'PARENT_REF' : rowData["PARENT_REF"],
					'APP_NAME' : rowData["APP_NAME"]
			};																																																										
			myObj = JSON.parse(seLRowDetailsIncludePrimaryKeysJsonString);						
			myObj['root'].push(rowDataNeeded);	
			seLRowDetailsIncludePrimaryKeysJsonString = JSON.stringify(myObj);
		}		
		var theData = {};
		theData["selectedScrnsDetails"] = seLRowDetailsIncludePrimaryKeysJsonString;	
		$("#toReloadAfterFlip_DeleteSvdScrns").val(0);
		_showConfirmMsg
		( 
				Confirm_Delete_key, 
				confirm_msg_title,
				function( yesNo )
	            {
					if(yesNo) 
					{
						_showProgressBar(true);				
						$.ajax
						({						
							 url: jQuery.contextPath+"/path/customization/CustomizationMaint_deleteSvdScrnsActionMethod",
					         type:"post",
							 data: theData,
							 success: function(data)
					 		 {							
									if(typeof data["_error"] == "undefined" || data["_error"] == null)
								 	{												
										var svdScrnsCOMessage = data["svdScrnsCO"].message;
										if( typeof svdScrnsCOMessage != "undefined" && svdScrnsCOMessage != null && svdScrnsCOMessage.length > 0 )
										{
											_showErrorMsg(non_deleted_duplicated_parents_key_var + ":\n" + data["svdScrnsCO"].message, warning_msg_title);									
										}	
										_showProgressBar(false);										
										if( deleteFromFlip == 1 )
										{
											$("#toReloadAfterFlip_DeleteSvdScrns").val( 1 );
										}									
										$table.trigger("reloadGrid");
										accordionReloadMenuItem("ROOT");								
								 	}									
						 	 },
							 error: function(data)
							 {
								 _showProgressBar(false);
								 $table.trigger( 'reloadGrid' );						
							 }
						});					
					}			
				}, 
				"yesNo" 
		);	
	}	
}




/**
 * prompt user to confirm deleting selected rows before flipping to next page
 * @author SimonRizkallah
 * @param obj
 */
function checkToDeleteRowsBeforeFlip( obj )
{		
	var $table = $("#deleteSavedScreensGridID");
	var myUpdates = $table.jqGrid("getChangedRowData");	
	if( myUpdates != "" )
	{
		var myUpdatesObj = JSON.parse( myUpdates );								
		var myChangedDataArray = myUpdatesObj["root"];							
		if( myChangedDataArray.length > 0 )	
		{		
			obj.originalEvent.returnVal = "stop";																												
			var currentPage = $table.jqGrid('getGridParam','page');	
			var toPageUponFlip = currentPage;								
			toPageUponFlip = (toPageUponFlip < 1) ? 1 : toPageUponFlip;			
			$("#toPageUponFlip_DeleteSvdScrns").val(toPageUponFlip);
			deleteSavedScreens(1); 
		}	
	}
	$("#deleteSavedScreensGridID").unsubscribe("confirmDeleteRowsBeforeFlip");
	$("#deleteSavedScreensGridID").subscribe( "confirmDeleteRowsBeforeFlip", function(obj){
		checkToDeleteRowsBeforeFlip(obj);
	});
}



/**
 * this method is called whenever the grid reloads *
 * @author SimonRizkallah
 */
function resumeFlippingAfterLoad()
{			
	var toReloadAfterFlip = $("#toReloadAfterFlip_DeleteSvdScrns").val();
	if( toReloadAfterFlip == 1 )
	{			
		$("#toReloadAfterFlip_DeleteSvdScrns").val( 0 );
		var $table = $("#deleteSavedScreensGridID"); 
		var toPageUponFlip = $("#toPageUponFlip_DeleteSvdScrns").val();
		var lastPageAfterDelete = $table.jqGrid('getGridParam','lastpage');
		toPageUponFlip = (toPageUponFlip > lastPageAfterDelete) ? lastPageAfterDelete : toPageUponFlip;		
		$table.jqGrid('setGridParam',{'page':toPageUponFlip});
		// need to set that load is completed in order to be able to call reload again
		$table[0].grid.hDiv.loading = false;
		$table.trigger("reloadGrid");
	}
}



/**
 * Method of calling save changes for Save As screen
 */
function cust_process_saveAs()
{
	if ($("#cust_saveas_screen_ref_" + _pageRef).val() === ""
			|| $("#cust_saveas_screen_name_" + _pageRef).val() === "")
	{
		_showErrorMsg(missing_elt_msg_key, error_msg_title);
		return;
	}
	
	_showProgressBar(true);
	//set pageref Hidden input
	$("#cust_saveas_pageref_" + _pageRef).val(_pageRef);
	var theForm = $("#custSaveAsForm_"+_pageRef).serializeForm();
	 $.ajax({
		 url: jQuery.contextPath+"/path/customization/CustomizationMaint_updateSaveAsChanges",
         type:"post",
		 dataType:"json",
		 data: theForm,
		 success: function(data)
		 		{
			 		if(typeof data["_error"] == "undefined" || data["_error"] == null)
			 		{
			 			_showErrorMsg(record_was_Updated_Successfully_key,info_msg_title);
			 			var newScreenRef = $("#cust_saveas_screen_ref_" + _pageRef).val();
			 			var newScreenName = $("#cust_saveas_screen_name_" + _pageRef).val();
			 			if($("#cust_saveas_dupParent_"+_pageRef).is(":checked"))
			 			{
			 				newScreenName = $("#cust_saveas_screen_parent_name_" + _pageRef).val()+ " / "+newScreenName;
			 			}
			 			$("#cust_save_as_div_"+_pageRef).dialog("close");
			 			accordionReloadMenuItem(data["custCO"].screenParentRef);
			 			// loading newly saved as page
			 			var parentOfScreenParentRef = data["custCO"].parentOfScreenParentRef;
			 			setTimeout(function() 
			 					{  addMenuTab(data["custCO"].screenRef,newScreenName,save_as_app_name,parentOfScreenParentRef);
				 					// to enable customization directly after loading the new save as page
				 					// need to be moved to call back method of addMeuTab
				 					setTimeout(function() {enableCustConfiguration(document.getElementById("config_icon"));
				 						_showProgressBar(false);
				 					}
				 					,2000);
			 					},1000);
			 		}
			 		else
			 		{
			 			_showProgressBar(false);
			 		}
			 		
			 	}
		 });
};

function saveascust_DuplicateParent(theChckBx) {

	//check if checked to show screen parent Name
	var parntNameReqVis = "0";
	var chseParentFlag = "1";
	if (theChckBx.checked) {
		parntNameReqVis = "1";
		chseParentFlag = "0";
	}

	var addElts = {
		cust_saveas_screen_parent_name : {
			IS_VISIBLE : parntNameReqVis,
			IS_MANDATORY : parntNameReqVis
		},
		saveas_chooseParent : {
			IS_READONLY : parntNameReqVis,
			IS_VISIBLE : chseParentFlag
		}
	};
	manageDynamicDisplay("cust_saveas_screen_parent_name_" + _pageRef, addElts,
			"cust_saveas_screen_parent_name");
	manageDynamicDisplay("saveas_chooseParent_" + _pageRef, addElts,
			"saveas_chooseParent");
}

function saveas_ChooseParent(theChckBx) {

	//check if checked to show screen parent Name
	var parntNameReqVis = "0";
	var chseParentFlag = "1";
	if (theChckBx.checked) {
		parntNameReqVis = "1";
		chseParentFlag = "0";
	}
	else
	{
		$("#cust_saveas_screen_parent_name_"+_pageRef).val("");
		$("#cust_saveas_parentRef_"+_pageRef).val("");
	}

	var addElts = {
		saveas_chooseParentRefBtnId : {
			IS_VISIBLE : parntNameReqVis,
			IS_MANDATORY : parntNameReqVis
		},
		cust_saveas_screen_parent_name : {
			IS_VISIBLE : parntNameReqVis,
			IS_MANDATORY : parntNameReqVis,
			IS_READONLY : parntNameReqVis
		},
		cust_saveas_dupParent : {
			IS_READONLY : parntNameReqVis,
			IS_VISIBLE : chseParentFlag
		}
	};
	manageDynamicDisplay("saveas_chooseParentRefBtnId_" + _pageRef, addElts,
			"saveas_chooseParentRefBtnId");
	manageDynamicDisplay("cust_saveas_screen_parent_name_" + _pageRef, addElts,
			"cust_saveas_screen_parent_name");
	manageDynamicDisplay("cust_saveas_dupParent_" + _pageRef, addElts,
			"cust_saveas_dupParent");
}
/**
 * 
 * @memberOf {TypeName} 
 * @return {TypeName} 
 */
function saveas_showSeries(theFormId)
{
	var	optSeriesDiv = $("<div id='optSeries_div'/>");
	optSeriesDiv.css("padding","0");
    var theForm = $("#custSaveAsForm_"+_pageRef);
    $("body").append(optSeriesDiv);
    

    curParams = {_pageRef:_pageRef};
    _showProgressBar(true);
    var srcURL = jQuery.contextPath+"/path/customization/seriesListAction_loadSeriesPage";
    var _dialogOptions = {modal:true, 
                          title:save_as_series_key,
                       autoOpen:false,
                           show:'slide',
                       position:'center', 
                          width:returnMaxWidth(370),
                         height:returnMaxHeight(600),
                        buttons:{
	                             ok:function(){$(this).dialog("close");}
                                },
	                      close: function (){
	 								           var theDialog = $(this);
	 								           theDialog.remove();
								}};
    $("#optSeries_div").load(srcURL, curParams,function(){_showProgressBar(false);});
    $("#optSeries_div").dialog(_dialogOptions);
    $("#optSeries_div").dialog("open");
}

/**
 * Method to manage the show Series button visibility based on the series checkbox
 * @param {Object} theChckBx
 */
function saveas_showHideSeriesView(theChckBx) {
	//check if checked to show the series buttons
	var seriesVis = "0";
	if (theChckBx.checked) {
		seriesVis = "1";
	}

	var addElts = {
		saveas_showSeriesBtnId : {
			IS_VISIBLE : seriesVis
		}
	};
	manageDynamicDisplay("saveas_showSeriesBtnId_" + _pageRef, addElts,
			"saveas_showSeriesBtnId");
}


function loadUserPrntList()
{
	var	prntList = $("<div id='load_prnt_list_div"+"' class='path-common-sceen'/>");
	prntList.css("padding","0");
    prntList.insertAfter($('body'));
    
    //var curParams = {_pageRef:_pageRef,"custCO.screenName":document.title};
    
    _showProgressBar(true);
    var srcURL = jQuery.contextPath+'/path/customization/CustomizationMaint_loadUsrPrntrList';
    $( "#load_prnt_list_div" ).on( "dialogclose", function( event, ui ) {} );

	$("#load_prnt_list_div").load(srcURL, '', function(response, status, xhr) 
	{
		_showProgressBar(false);
		var buttons = {};
		if (response.indexOf("errorMessage") > -1) {
		//654601 use ActiveX to select a local printer.
			var ua = window.navigator.userAgent;
		    var msie = ua.indexOf("MSIE ");

		    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))  // If Internet Explorer
		    {
		    	var theDialog = $(this);
		    	theDialog.remove();
		    	openActiveXPrinterSelector();
		    }
		    else  // If another browser
		    {
		    	var closeBtnLbl = (typeof signature_close_btn === undefined )? "Close" :signature_close_btn;
				buttons[closeBtnLbl] = function() {
					$("#load_prnt_list_div").dialog("close");
				};
		    }
			
			
		} else {
			buttons[set_as_default_key] = function() {
				saveUsrDefaultPrntr();
			};
		}
		
	    $("#load_prnt_list_div").dialog(
	    		{modal:true, 
                 title: (typeof user_prntr_list_key === "undefined")?"User's Printers List" :user_prntr_list_key ,
                 autoOpen:false,
                 show:'slide',
                 position:'center', 
                 width:returnMaxWidth(430),
                 height:returnMaxHeight(200),
                 close: function (){
					  var theDialog = $(this);
					  theDialog.remove();
					},
					buttons: buttons
	    		});
		$("#load_prnt_list_div").dialog("open");
	});
}
function prntrChange(value)
{
	var prntrName = $("#usrPrinterItemID"+value).val();
	$("#userDefPrntr").val(prntrName);
}

function saveUsrDefaultPrntr()
{
	var theForm = $("#usrDefPrinterForm").serializeForm();
	_showProgressBar(true);
	 $.ajax({
		 url: jQuery.contextPath+"/path/customization/CustomizationMaint_setUsrDefPrntr",
         type:"post",
		 dataType:"json",
		 data: theForm,
		 success: function(data)
		 		{
			 		if(typeof data["_error"] == "undefined" || data["_error"] == null)
			 		{
			 			_showErrorMsg(record_was_Updated_Successfully_key,info_msg_title);
			 			_showProgressBar(false);
			 			$("#load_prnt_list_div").dialog("close");
			 		}
			 		else
			 		{
			 			_showProgressBar(false);
			 		}
			 	}
		 });
}

/**
 * function used on keydown to check for valid shortcut key
 * @param {Object} event
 */
function cust_recordBtnShortCut(event)
{
	event.preventDefault(); 
	$.struts2_jquery.require("js/jstree/jquery.hotkeys.js");
	var shortcut = jQuery.hotkeys.recordShortCut(event);
	
	/*
	 * ^ctrl : means the string should start by ctrl
	 * \+ : to escape the +
	 * [a-zA-Z0-9] : any number or character of length 1
	 * $ : means the string should end by on2 number or character 
	*/
	var ctrlShiftExpression = /^ctrl\+shift\+[a-zA-Z0-9]$/;
	var altShiftExpression = /^alt\+shift\+[a-zA-Z0-9]$/;
	if(shortcut != undefined && shortcut != null && shortcut != '' 
		&& ctrlShiftExpression.test(shortcut) || altShiftExpression.test(shortcut))
	{
		$("#keyboard_shortcut_key_"+_pageRef).removeAttr('shortCutWarning');
		$("#keyboard_shortcut_key_"+_pageRef).attr('valid_shortcut',true);
		$("#keyboard_shortcut_key_"+_pageRef).val(shortcut.toUpperCase());
	}
	else
	{
		$("#keyboard_shortcut_key_"+_pageRef).attr('shortCutWarning',false);
		$("#keyboard_shortcut_key_"+_pageRef).attr('valid_shortcut',false);
	}
}

/**
 * function used on keyup to display a warning message if needed. the warning message is displayed once
 * @param {Object} event
 */
function cust_displayShortCutMsg(event)
{
	var valid_shortcut = $("#keyboard_shortcut_key_"+_pageRef).attr('valid_shortcut');
	var shortCutWarning = $("#keyboard_shortcut_key_"+_pageRef).attr('shortCutWarning');
	
	if(valid_shortcut != undefined && valid_shortcut == "false" && shortCutWarning != "true" && event.keyCode != 9)
	{
		$("#keyboard_shortcut_key_"+_pageRef).attr('shortCutWarning',true);
		var invalidShortCutMsg = invalid_keyboard_shortcut_key != undefined ? invalid_keyboard_shortcut_key : 'Invalid Shortcut'; 
		_showErrorMsg(invalidShortCutMsg);
	}
}

/**
 * function used to manage the visibility of the activity field for the submit button 
 */
function customElem_CheckActivityIdVisibility(fromRowSel)
{
	var $table = $("#ElementActivityGrid_Id_" + _pageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var selectedRowObject = $table.jqGrid('getRowData', selectedRowId);
	var activityType = selectedRowObject["activityDescription"];
	$table.jqGrid('setCellValue', selectedRowId,"sysParamElemActivitiesVO.ACTIVITY_TYPE",activityType);
	$table.jqGrid("setCellRequired", selectedRowId,"sysParamElemActivitiesVO.ACTIVITY_ID","true");
	// if this function is called from row select we should not reset the values 
	if(!fromRowSel)
	{
		$table.jqGrid('setCellValue', selectedRowId,"sysParamElemActivitiesVO.ACTIVITY_ID",'');
		$table.jqGrid('setCellValue', selectedRowId,"sysParamElemActivitiesVO.DESCRIPTION",'');
		$table.jqGrid('setCellValue', selectedRowId,"sysParamElemActivitiesVO.SCREEN_WIDTH",'');
		$table.jqGrid('setCellValue', selectedRowId,"sysParamElemActivitiesVO.SCREEN_HEIGHT",'');
		$table.jqGrid('setCellValue', selectedRowId,"sysParamElemActivitiesVO.SCREEN_TITLE",'');
		$table.jqGrid('setCellValue', selectedRowId,"sysParamElemActivitiesVO.PROCEED_ON_EXPRESSION",'');
		$table.jqGrid('setCellValue', selectedRowId,"sysParamElemActivitiesVO.PROCEED_ON_FAIL",'');
		$('#fldcust_parmaMapGrid_' + _pageRef).html('');
	}
	disableEnableProceedOnFail($table,selectedRowId,activityType,selectedRowObject);
	// screen 
	if(activityType=="1")
	{
		$table.jqGrid("setCellRequired", selectedRowId,"sysParamElemActivitiesVO.SCREEN_WIDTH","true");
		$table.jqGrid("setCellRequired", selectedRowId,"sysParamElemActivitiesVO.SCREEN_HEIGHT","true");
		$table.jqGrid("setCellReadOnly", selectedRowId,"sysParamElemActivitiesVO.SCREEN_WIDTH","false");
		$table.jqGrid("setCellReadOnly", selectedRowId,"sysParamElemActivitiesVO.SCREEN_HEIGHT","false");
		$table.jqGrid("setCellReadOnly", selectedRowId,"sysParamElemActivitiesVO.SCREEN_TITLE","false");
	}
	// global , custom , before exection , after exection or onchange .
	else if( activityType == '2' || activityType == '3' || activityType == '4' || activityType == '5' ||activityType == '6' ||activityType == '7' || activityType == '8')
	{
		$table.jqGrid("setCellRequired", selectedRowId,"sysParamElemActivitiesVO.SCREEN_WIDTH","false");
		$table.jqGrid("setCellRequired", selectedRowId,"sysParamElemActivitiesVO.SCREEN_HEIGHT","false");
		$table.jqGrid("setCellReadOnly", selectedRowId,"sysParamElemActivitiesVO.SCREEN_WIDTH","true");
		$table.jqGrid("setCellReadOnly", selectedRowId,"sysParamElemActivitiesVO.SCREEN_HEIGHT","true");
		$table.jqGrid("setCellReadOnly", selectedRowId,"sysParamElemActivitiesVO.SCREEN_TITLE","true");
	}

	customElem_adjustActivityIdResultList(activityType);
}

function disableEnableProceedOnFail(table,selectedRowId,activityType,selectedRowObject)
{
	// in case of screen 1 , global 2 , custom button 3 , after execution 5 or on keyEvent 7  proceed on fail and proceed on expression must be disabled 
	if(activityType=="1" || activityType == '2' || activityType == '3' || activityType == '5' ||activityType == '7')
	{
		table.jqGrid("setCellReadOnly", selectedRowId,"sysParamElemActivitiesVO.PROCEED_ON_FAIL","true",'0');
		table.jqGrid("setCellReadOnly", selectedRowId,"sysParamElemActivitiesVO.PROCEED_ON_EXPRESSION","true");
	}
	// in case of before execution 4 on on change 6 proceed on fail and proceed on expression must be enabled 
	else if( activityType == '4' || activityType == '6' || activityType == '8')
	{
		table.jqGrid("setCellReadOnly", selectedRowId,"sysParamElemActivitiesVO.PROCEED_ON_FAIL","false");
		table.jqGrid("setCellReadOnly", selectedRowId,"sysParamElemActivitiesVO.PROCEED_ON_EXPRESSION","false");
		fieldCustomization_applyAutoComplete(selectedRowId + "_sysParamElemActivitiesVO.PROCEED_ON_EXPRESSION",selectedRowObject["autoCompleteTags"]);
	}
}
//change result list of activity id
function customElem_adjustActivityIdResultList(activityType)
{
	if( activityType == '1' )
	{
		jQuery.globalEval("options_liveSearch_sysParamElemActivitiesVO_ACTIVITY_ID_ElementActivityGrid_Id_"  + _pageRef + ".resultList = 'sysDynScreenDefVO.DYN_SCREEN_ID:sysParamElemActivitiesVO.ACTIVITY_ID_lookuptxt,sysDynScreenDefVO.DYN_SCREEN_DESC:sysParamElemActivitiesVO.DESCRIPTION'");
	}
	else if( activityType == '2' || activityType == '3' || activityType == '4' || activityType == '5' || activityType == '6'||activityType == '7' || activityType == '8')
	{
		jQuery.globalEval("options_liveSearch_sysParamElemActivitiesVO_ACTIVITY_ID_ElementActivityGrid_Id_"  + _pageRef + ".resultList = 'sysParamBtnCustVO.BTN_ID:sysParamElemActivitiesVO.ACTIVITY_ID_lookuptxt,sysParamBtnCustVO.DESCRIPTION:sysParamElemActivitiesVO.DESCRIPTION'");
	}
}

function customElem_LoadDynScrnParamMapGrid()
{
    var $table = $("#ElementActivityGrid_Id_" + _pageRef);
    var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var data = $table.jqGrid('getRowData', selectedRowId);
	
	if(data == undefined || data == null)
	{
		return;	
	}
	var activityType  = data["sysParamElemActivitiesVO.ACTIVITY_TYPE"];
	var operationId = data["sysParamElemActivitiesVO.ACTIVITY_ID"];
	
	if(operationId == undefined || operationId == null || operationId == '')
	{
		$('#fldcust_parmaMapGrid_' + _pageRef).html('');
		return;
	}
	
	$.struts2_jquery.require("ScreenGeneratorMaint.js" ,null,jQuery.contextPath+"/common/js/screengenerator/");
	
	var dynScreenMapParam = {};
	dynScreenMapParam.divId = 'fldcust_parmaMapGrid_' + _pageRef;
	dynScreenMapParam.currentPageRef = _pageRef;
	dynScreenMapParam.elementIdentifier =  data["sysParamElemActivitiesVO.FLD_IDENTIFIER"];
	dynScreenMapParam.appName = data["sysParamElemActivitiesVO.APP_NAME"];
	dynScreenMapParam.progRef = data["sysParamElemActivitiesVO.PROG_REF"];
	dynScreenMapParam.compCode = 0;
	
	//open dynamic screen
	if(activityType == '1')
	{
		dynScreenMapParam.mapElementType = '2';
		dynScreenMapParam.defaultScreenId = operationId;
		dynScreenMapParam.elementOpId = operationId;
		dynScreenMapParam.screenWidth = data["sysParamElemActivitiesVO.SCREEN_WIDTH"];
		dynScreenMapParam.screenHeight = data["sysParamElemActivitiesVO.SCREEN_HEIGHT"];
		dynScreenMapParam.showScreenWidthAndHeight = false;
		screenGenerator_loadDynamicScreenParamMap(dynScreenMapParam);
		
	}
	//open global activity in case of global, custom, before exection or after execution.
	else if(activityType == '2' || activityType == '3' || activityType == '4' || activityType == '5' || activityType == '6'||activityType == '7' ||activityType == '8'||activityType == '9')
	{
		dynScreenMapParam.mapElementType = '3';
		dynScreenMapParam.defaultScreenId = null;
		dynScreenMapParam.globalActivityId = operationId;
		dynScreenMapParam.sequenceId  = data["sysParamElemActivitiesVO.SEQUENCE_ID"];
		dynScreenMapParam.loadedInObjDisplay = isLoadedInObjDisplay($table);
		screenGenerator_loadButtonCustomizationParamMap(dynScreenMapParam);
	}
	
	
}

function isLoadedInObjDisplay($table)
{
	var parentForm = $table.closest('form');
	return (parentForm != undefined && parentForm.length > 0 && parentForm.attr('id') == 'custObjectMaintForm_'+_pageRef);
}

function loadExpImpCustom()
{
	
	if(typeof _pageRef === "undefined" || _pageRef === "" || _pageRef == undefined)
	{
		_showErrorMsg(choose_custom_screen_key,info_msg_title);
		return;
	}

	var urlSrc = jQuery.contextPath + '/path/customization/CustomizationMaint_loadExpImpCustom'
	var	exportList = $("<div id='load_exp_imp_cust_div"+"' class='path-common-sceen'/>");
	exportList.css("padding","0");
	exportList.insertAfter($('body'));
	var closeBtnLbl = (typeof signature_close_btn === undefined )? "Close" :signature_close_btn;
	var buttons = {};
	buttons[closeBtnLbl] = function() {
		$("#load_exp_imp_cust_div").dialog("close");
	};
	
    _showProgressBar(true);
	$("#load_exp_imp_cust_div").load(urlSrc, '', function(response, status, xhr) 
	{
		_showProgressBar(false);
	    $("#load_exp_imp_cust_div").dialog(
	    		{modal:true, 
                 title: (typeof export_screen_cust_key === "undefined")?"Export/Import Customization" :export_screen_cust_key ,
                 autoOpen:false,
                 show:'slide',
                 position:'center', 
                 width:returnMaxWidth(430),
                 height:returnMaxHeight(200),
                 close: function (){
					  var theDialog = $(this);
					  theDialog.remove();
					},
					buttons : buttons
	    		});
		$("#load_exp_imp_cust_div").dialog("open");
	});
}

function impExpSelectCustomizationFunc()
{
	if($("input:radio[id^=impExpSelectCustomization]:checked").val() == "1")
	{
		$("#customizationImport").hide();
		$("#customizationExport").show();
	}
	else
	{
		$("#customizationImport").show();
		$("#customizationExport").hide();
	}
}


function exportScreenCustomization(exportType) {
	var theCheckBox =  $("#fldcust_specificMenu_"+_pageRef);
	var isCheckBoxChked = theCheckBox.is(":checked");
params = {
		"custSC.cutomizationPROG_REF" : _pageRef,
		"custSC.exportCustType" : exportType,
		"custSC.screenDispVO.FLD_IDENTIFIER" : $("#fldcust_fldIdentifier_"+_pageRef).val(),
		"custSC.useSpecificPageRef" : isCheckBoxChked};

var urlSrc = jQuery.contextPath + '/path/customization/CustomizationFileMaint_exportFieldCustomization'

_showProgressBar(true);
$.fileDownload(urlSrc,
{
successCallback: function (url) {
	_showProgressBar(false);
},
failCallback: function (html, url) {	 
    _showErrorMsg(html);
},
data:params
});
		
}


function importCustomization()
{
	if($("#uploadScriptCustomization").length&&!$("#uploadScriptCustomization").val()){
				_showErrorMsg(Missing_File_Location_key);
				return false;
				}
		var a = $("#uploadScriptCustomization").val().split(".");
		if( a.length === 1 || ( a[0] === "" && a.length === 2 ) ) {
		    _showErrorMsg(file_ext_key);
			return false;
		}
		var optionsUrl = null ;
		switch (a.pop().toLowerCase())
		{
		  case 	"csv" : optionsUrl = jQuery.contextPath+ "/path/customization/CustomizationFileMaint_importCustomizationFile?custSC.cutomizationPROG_REF="+_pageRef; break;
		  case "txt"  : optionsUrl = jQuery.contextPath+ "/path/objectCustomization/objectCustomizationFileMaint_importObjectCustomization?custSC.cutomizationPROG_REF="+_pageRef; break;
		  default :
			  {
			  		$("#uploadScriptCustomization").val("");
			  		_showErrorMsg(file_ext_key);
					return false;
			  }
		}
		_showProgressBar(true);
		var options = {
				url:    optionsUrl,				 	
				type:   'post',
				success: function(response, status, xhr) {
					_showProgressBar(false);
						var jsonObj = $.parseJSON($(response).html());
						if (jsonObj["_error"] == undefined || jsonObj["_error"] == null
							|| jsonObj["_error"] === "")
						{
							//var warnMsg = jsonObj.translationCO.importWarningMsg;
							//warnMsg = warnMsg!= '' && warnMsg != undefined && warnMsg != 'undefined' && warnMsg != null ? warnMsg:'';
							//_showErrorMsg(Process_Executed_Successfully_key + warnMsg,
							//		success_msg_title);
						}
						else
						{
							_showErrorMsg(jsonObj["_error"]);
						}
				},
				error: function(response) {
					_showProgressBar(false);
					_showErrorMsg("error"+response);
				}
				
			};
	
	$("#customizationFileForm").ajaxSubmit(options);
}

/*
This function is called from choose color button to open the color picker inside a popup dialog
*/
function openColorPickerDiv()
{
	var buttons = [];
	buttons.push(
		{text:ok_label_trans,id:"fieldCust_colorPickerOkBtn",click:function()
			{
				var hex = $('#tCD_colorPicker_div div.colpick_hex_field input[type="text"]').val();
				if(hex != undefined && hex != null && hex != '')
				{	
					//when selecting a color from color picker, set the color value in the input hidden and change the background color of the button 'chooseColor'
					$("#bgColorId_"+_pageRef).val("#"+hex);
					//$("#chooseColor_"+_pageRef).css will not force changing the background color,
					//$("#chooseColor_"+_pageRef).css("background-color","#"+hex);
					//note that the code using $element.css() will work only on IE and not on chrome or firefox $element.css("background",backgroundColor + " !important");
					//to force changing background color on all browser we need to use element[0].style.setProperty
					$("#chooseColor_"+_pageRef)[0].style.setProperty( 'background', "#"+hex, 'important' );
					$(this).dialog("close");
				}
			}
		},
		{text:reset_label_trans,id:"fieldCust_colorPickerResetBtn",click:function()
			{
				fldcust_resetBgColor();
			}
		}
	);
	var _dialogOptions = {
		modal : true,
		title : change_color_key_trans,
		autoOpen : false,
		closeOnEscape : false,
		position : 'center',
		width : returnMaxWidth(280),
		height : returnMaxHeight(310),
		
		buttons : buttons
	};
	
	$("#colorPickerDiv_id_" + _pageRef).dialog(_dialogOptions);
	$("#colorPickerDiv_id_" + _pageRef).dialog("open");
	
}
/*
reset the background color to default	
*/
function fldcust_resetBgColor(onCheckBoxClick)
{
	$("#bgColorId_"+_pageRef).val("");
	$('#chooseColor_'+_pageRef).css('background-color',"");
	$('#tCD_colorPicker_div div.colpick_hex_field input[type="text"]').val("ffffff").change();
	//when the checkbox of the expression is clicked or when the screen of customization is opened for first time, in this case we don't have the colorpicker dialog constructed (not shown yet) so we should not close it.
	if(!onCheckBoxClick)
	{
		$("#colorPickerDiv_id_" + _pageRef).dialog("close");
	}
}

function fldcust_backgroundColorChecking(element)
{
	if(element.checked)
	{
  	    manageDynamicDisplay("fldcust_backgroundKeyExpr_" + custScrPageRef,{fldcust_backgroundKeyExpr:{IS_VISIBLE:"1"}},"fldcust_backgroundKeyExpr");
  	    $('#chooseColor_'+_pageRef).attr('disabled',true);
  	    fldcust_resetBgColor(true);
	}
	else
	{
		$("#fldcust_backgroundKeyExpr_" + custScrPageRef).val("");
  	    manageDynamicDisplay("fldcust_backgroundKeyExpr_" + custScrPageRef,{fldcust_backgroundKeyExpr:{IS_VISIBLE:"0"}},"fldcust_backgroundKeyExpr");
  	    $('#chooseColor_'+_pageRef).attr('disabled',false);
	}
}
//add new row if allowed
function customElem_addMapGrid()
{
	var thCustTbl =	$("#ElementActivityGrid_Id_" + _pageRef);
	var rowData = thCustTbl.jqGrid('getDataIDs');
	var firstRow = thCustTbl.jqGrid('getRowData', rowData[0]);
	
	// we cannot add more than one row unless after execution is enabled so we can add before and after at the same time.
	if(( rowData.length == 1 && firstRow["sysParamElemActivitiesVO.ACTIVITY_TYPE"] == '9' )||rowData.length > 1 || (rowData.length == 1 && enableAfterExecution == "false" && firstRow["sysParamElemActivitiesVO.ACTIVITY_TYPE"]!='6' && firstRow["sysParamElemActivitiesVO.ACTIVITY_TYPE"] != '7' ))
	{
		_showErrorMsg(document.getElementById("cannotaddmorerows_key_id").value,info_msg_title);
		return;
	}
	// in case we can add another row the first row must be before exection , after execution,onchange or keyevnt otherwise we cannot add another row 
	if(firstRow!=undefined && firstRow!=null && firstRow!='' && firstRow["sysParamElemActivitiesVO.ACTIVITY_TYPE"]!= '4' && firstRow["sysParamElemActivitiesVO.ACTIVITY_TYPE"]!= '5' && firstRow["sysParamElemActivitiesVO.ACTIVITY_TYPE"]!= '6' && firstRow["sysParamElemActivitiesVO.ACTIVITY_TYPE"]!= '7' )
	{
		_showErrorMsg(document.getElementById("firstrowis_key_id").value +":" +firstRow["activityDescription"],info_msg_title);
		return;
	}
	else
	{
		// add new row
		var rId = thCustTbl.jqGrid('addInlineRow', {});
		thCustTbl.jqGrid('setCellValue', rId, 'sysParamElemActivitiesVO.ACTIVITY_ENABLE_YN', "1");
	}
	
}

/*delete selected row. 
in case of new row directly removed from the grid.
in case of saved row must be removed from the database and reload the grid again.
*/
function customElem_deleteMapGrid(theRowId)
{
	_showConfirmMsg((typeof Confirm_Delete_Process_key != undefined)?Confirm_Delete_Process_key:"Delete Selected Row?",confirm_msg_title,function(yesNo)
		    {
				if(yesNo) 
				{
					var $table = $("#ElementActivityGrid_Id_" + _pageRef);
					var selectedRowObject = $table.jqGrid('getRowData', theRowId);
					var sequenceId = selectedRowObject["sysParamElemActivitiesVO.SEQUENCE_ID"];
					if(sequenceId == '')
					{
						$table.jqGrid('deleteGridRow',theRowId);
						var $t = $("#ButtonCustParamMapGrid_Id_"+_pageRef).length>0?$("#ButtonCustParamMapGrid_Id_"+_pageRef):$("#dynScreenParamMapGrid_Id_"+_pageRef);
						
						if($t.length > 0)
						{
							var rows = $t.jqGrid('getDataIDs');
							for(var i= 0 ; i <rows.length; i++)
							{
								$t.jqGrid('deleteGridRow',rows[i]);
							}
						}
					}
					else
					{
						
						_showProgressBar(true);
						var deleteAction = jQuery.contextPath+"/path/customization/CustomElementActivity_deleteElementActivity.action";
						var deleteParam = {"criteria.sysParamElemActivitiesVO.SEQUENCE_ID" :sequenceId,
											"criteria.sysParamElemActivitiesVO.APP_NAME" :selectedRowObject["sysParamElemActivitiesVO.APP_NAME"],
											"criteria.sysParamElemActivitiesVO.PROG_REF" :selectedRowObject["sysParamElemActivitiesVO.PROG_REF"],
											"criteria.sysParamElemActivitiesVO.FLD_IDENTIFIER" :selectedRowObject["sysParamElemActivitiesVO.FLD_IDENTIFIER"],
											"criteria.sysParamElemActivitiesVO.ACTIVITY_ID" :selectedRowObject["sysParamElemActivitiesVO.ACTIVITY_ID"],
											"criteria.sysParamElemActivitiesVO.ACTIVITY_TYPE" :selectedRowObject["sysParamElemActivitiesVO.ACTIVITY_TYPE"]
						};
						$.ajax({
							 url: deleteAction,
					         type:"post",
							 dataType:"json",
							 data: deleteParam,
							 success: function(data){
							     
								 if(typeof data["_error"] == "undefined" || data["_error"] == null)
							     {	 
									   if($("#ElementActivityGrid_Id_"+_pageRef).html()!=null && $("#ElementActivityGrid_Id_"+_pageRef).html()!="")
							           {
							            	 $("#ElementActivityGrid_Id_"+_pageRef).trigger("reloadGrid");
							            	 if($('#ButtonCustParamMapGrid_Id_' + _pageRef).length > 0)
											 {
							            		 $("#ButtonCustParamMapGrid_Id_"+_pageRef).trigger("reloadGrid");
											 }
							            	 if($('#dynScreenParamMapGrid_Id_' + _pageRef).length > 0)
							            	 {
							            		 $("#dynScreenParamMapGrid_Id_"+_pageRef).trigger("reloadGrid");
							            	 }
							           }
					             } 
								 
								 _showProgressBar(false);
								 
							 }
					    });
					}
				}
			},"yesNo");	
}

// on row select to initialize global columns and manage visibility on each element.
function customElem_onRowSelTopic()
{
	var $table = $("#ElementActivityGrid_Id_" + _pageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var selectedRowObject = $table.jqGrid('getRowData', selectedRowId);
	//Initialize rows default values
	var progRef = selectedRowObject["sysParamElemActivitiesVO.PROG_REF"];
	if(progRef == '')
	{
		$table.jqGrid('setCellValue', selectedRowId,"sysParamElemActivitiesVO.PROG_REF", $('#fldcust_progRef_' + _pageRef).val() );
	}
	
	var appName = selectedRowObject["sysParamElemActivitiesVO.APP_NAME"];
	if(appName == '')
	{
		$table.jqGrid('setCellValue', selectedRowId,"sysParamElemActivitiesVO.APP_NAME", $('#fldcust_appName_' + _pageRef).val() );
	}
	
	var elemFldId = selectedRowObject["sysParamElemActivitiesVO.FLD_IDENTIFIER"];
	if(elemFldId == '')
	{
		$table.jqGrid('setCellValue', selectedRowId,"sysParamElemActivitiesVO.FLD_IDENTIFIER", $('#fldcust_fldIdentifier_' + _pageRef).val() );
	}
	
	if(selectedRowObject["autoCompleteTags"] == null || selectedRowObject["autoCompleteTags"] == '')
	{
		returnAutoCompleteData();
	}
	customElem_CheckActivityIdVisibility(true);
}

// change the combo list for activity with respect to the rows added.
function fieldCustomization_customLoadCombo(zUrl, zList, zId, zValue)
{
	var thCustTbl =	$("#ElementActivityGrid_Id_" + _pageRef);
	var rowData = thCustTbl.jqGrid('getDataIDs');
	var selectedRowId = thCustTbl.jqGrid('getGridParam', 'selrow');
	var parentForm = thCustTbl.closest('form');
	//check if from textfield or livesearch or textarea to pass variable to include only onchange activity type
	var custLoad_fromText = $("#fldcust_fromText_"+custScrPageRef).val();
	var custLoad_fromTextArea = $("#fldcust_fromTextArea_"+custScrPageRef).val();
	var custLoad_fromLiveSearch = $("#fldcust_fromLiveSearch_"+custScrPageRef).val();
	
	if( (typeof custLoad_fromText != 'undefined' && custLoad_fromText=="1") 
		|| (typeof custLoad_fromTextArea != 'undefined' && custLoad_fromTextArea =="1")
			|| (typeof custLoad_fromLiveSearch != 'undefined' && custLoad_fromLiveSearch == "1"))
	{
		zUrl = jQuery.contextPath+"/path/customization/CustomElementActivity_loadActivityTypeSelect?fromText=1";
	}
	else if(isLoadedInObjDisplay(thCustTbl))
	{
		zUrl = jQuery.contextPath+"/path/customization/CustomElementActivity_loadActivityTypeSelect?fromObjDisplay=1";
	}
	if(rowData.length > 1)
	{
		var otherRow = null;
		for(var i = 0 ; i < rowData.length ;i++)
		{
			if(rowData[i]!=selectedRowId)
			{
				otherRow =	thCustTbl.jqGrid('getRowData', rowData[i])
			}
		}
		zUrl += zUrl.indexOf("?")!=-1?"&":"?";
		zUrl += "firstActivityType="+otherRow["sysParamElemActivitiesVO.ACTIVITY_TYPE"];
	}
	if(typeof enableAfterExecution != 'undefined') 
	{
		zUrl += zUrl.indexOf("?")!=-1?"&":"?";
		zUrl += "criteria.enableAfterExecution="+enableAfterExecution;
	}	
	return loadCombo(zUrl, zList, zId, zValue);
}

/**
 * create a separate function to implement the autocomplete keydown event.
 * to avoid binding the same event many time since the autocomplete exists inside the grid 
 * @param {Object} event
 * @param {Object} theInput
 */
function fieldCustomization_applyAutoCompleteKeyDown(event,theInput)
{
	if( event.keyCode === $.ui.keyCode.DOWN && !theInput.isopened)
	{
	       	theInput.autocomplete( "search", "" );
	}
}

// apply autocomplete on the input id with specific expression tags.
function fieldCustomization_applyAutoComplete(theInputId,expression_tags)
{
	var theInput = $(document.getElementById(theInputId));
	 
     theInput.bind( "keydown", fieldCustomization_applyAutoCompleteKeyDown(this,theInput))
     .autocomplete({
       minLength: 0,
       inputId:theInputId,
       source: expression_tags.split(","),
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
    	  /**
    	   * [MarwanMaddah]: this pattern will catch all the words 
    	   * that are exists in the input from index 0 untill the current cursor position
    	   * then the last word will be replaced by the selected value from the Search result
    	   */
    	  var patt       = /\S+/g;
    	  var result     = strTillCurrPos.match(patt);
          var firstPart  = "";
          if(result!= null && result.length > 0)
          {        	  
             var resultLgth = result.length;
             if(strTillCurrPos.lastIndexOf(result[resultLgth-1]) == 0 || 
            		 ( result[resultLgth-1].toLowerCase() == ui.item.value.toLowerCase() ))
             {
            	 firstPart  = strTillCurrPos.substring(0,strTillCurrPos.lastIndexOf(result[resultLgth-1]));
             }
             else
             {
            	 firstPart  = strTillCurrPos.substring(0,strTillCurrPos.lastIndexOf(result[resultLgth-1]) + result[resultLgth-1].length );
             }	 
          }
          else
          {
        	 firstPart = strTillCurrPos; 
          }
          this.value = firstPart + " " +ui.item.value +" "+ this.value.substring(cursPosition);
          
         /* var theform = document.getElementById("customizationMaintForm_"+currentPageRef);
		  $.data(theform, 'changeTrack', true);*/
          
          return false;
       }
     });
}
// when activity id is changed we must retreive the autocomplete data for the selected activity id.
function customElem_afterActivityIdChange()
{
	returnAutoCompleteData();
	customElem_CheckActivityIdVisibility(true);
	//$("#ButtonCustParamMapGrid_Id_"+_pageRef).trigger("reloadGrid");
	$('#fldcust_parmaMapGrid_' + _pageRef).html('');
}

// return autocomplete data for proceed expression.
function returnAutoCompleteData()
{
	var $table = $("#ElementActivityGrid_Id_" + _pageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var selectedRowObject = $table.jqGrid('getRowData', selectedRowId);
	var action = jQuery.contextPath+"/path/customization/CustomElementActivity_returnAutoCompleteData";
	$.ajax({
		 url: action,
         type:"post",
		 dataType:"json",
		 async : false,
		 data: selectedRowObject,
		 success: function(data){
			 if(typeof data["_error"] == "undefined" || data["_error"] == null)
		     {	 
				 $table.jqGrid('setCellValue', selectedRowId,"autoCompleteTags", data.criteria.autoCompleteTags);
				 $table.jqGrid('setCellValue', selectedRowId,"sysParamElemActivitiesVO.PROCEED_ON_EXPRESSION", '');
		     } 
		 }
    });
}
// set changed to the row on clicking the checkbox proceed on fail 
function customElem_traceChange(e)
{
	if (e)
	{
		var selection = e.currentTarget.id.substring(0, e.currentTarget.id.indexOf('_'));
		if (selection != null && selection != '' && !isNaN(selection))
		{
			var $table = $("#ElementActivityGrid_Id_"+ _pageRef);
			//set row as selected
			$table.jqGrid('setSelection', selection, true);
			var myHtmlRow = $table.jqGrid("getInd", selection, true);
			var $myHtmlRowObj = $(myHtmlRow);
			//set row as changed
			$myHtmlRowObj.attr("changed", "1");
			//set row as change on chrome browser, $myHtmlRowObj.attr("changed", "1") is not supported on chrome and vice versa.
			$myHtmlRowObj.trigger( "change" );
		}
	}
}


function clearShortcut()
{
	$("#keyboard_shortcut_key_"+_pageRef).val("");
}