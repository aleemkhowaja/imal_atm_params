/**
 * Copyright 2015, Path Solutions Path Solutions retains all ownership rights to
 * this source code.
 * 
 * ThemeCustomization.js used to do all the needed functionality to support the ThemeCustomization
 * Business.
 * 
 * @author Khaledhussein
 * 
 */

/**
 * Load the themes customization dialog
 */
function loadThemesCustomization() {

	if ($("#themesCustomizationMainDialog")
			&& $("#themesCustomizationMainDialog").attr('id') != undefined) {
		$("#themesCustomizationMainDialog").dialog("destroy");
		$("#themesCustomizationMainDialog").remove();
	}

	var themesDialogDiv = $("<div id='themesCustomizationMainDialog'></div>");
	themesDialogDiv.css("padding", "0");

	var body = $('body');
	themesDialogDiv.insertAfter(body);

	_showProgressBar(true);

	var _dialog__options = {
		modal : true,
		autoOpen : false,
		show : 'slide',
		dialogClass: 'path-theme-customization-dummy no-close',
		title : themes_transl,
		position : 'center',
		closeOnEscape : false,
		'height' : returnMaxHeight(600),
		'width' : returnMaxWidth(1500),
		buttons : [ {
			text : saveLabel,
			id : "loadThemeCustomization_saveBtn_id",
			click : function() {
				themeCustomization_save();
			}
		}, {
			text : signature_close_btn,
			click : function() {

				themeCustomization_checkIfChangeAndClose();
			}
		} ]
	};

	var _action__src = jQuery.contextPath + '/path/customization/ThemeCustomizationAction_initialize';

	$("#themesCustomizationMainDialog").load(_action__src, null, function() {

		_showProgressBar(false);
	});

	$("#themesCustomizationMainDialog").dialog(_dialog__options);
	$("#themesCustomizationMainDialog").dialog("open");
	if($("#loadThemeCustomization_saveBtn_id").is(":visible")) {
		$("#loadThemeCustomization_saveBtn_id").hide();
	} 
	
}

/**
 * Save the themes customization
 */
function themeCustomization_save() {
	
	var themeName = $("#theme_name_id").val();
	var themeApp = $("#theme_isIMAL_id").is(':checked') ? undefined : $("#lookuptxt_themeApplication_lookup").val();
	if(!themeName) {
		_showErrorMsg(fill_theme_name_key, error_msg_title);
		return;
	}
	
	var cssData = "[";
	var clazz;
	$('#main_content_themeCustomization span[customClass]').each(function(index, value) {
		clazz = $( value ).attr('customClass');
		cssData += themeCustomization_getCss(clazz) + ",";
	});
	cssData = cssData.slice(0,-1); // Remove last comma
	cssData += "]";
	
	var saveThemeURL = jQuery.contextPath + '/path/customization/ThemeCustomizationAction_saveUserTheme';
	
	var params = {};
	params['themeCustomizationCO.themeVO.THEME_NAME'] = themeName;
	params['themeCustomizationCO.themeVO.APP_NAME'] = themeApp;
	params['themeCustomizationCO.themeVO.IS_ACTIVE_YN'] = $("#theme_active_id").is(':checked') ? 1 : 0;
	params['themeCustomizationCO.isGlobal'] = $("#theme_isIMAL_id").is(':checked') ? 1 : 0;
	if($("#theme_id_hid_id").val()) {
		params['themeCustomizationCO.themeVO.THEME_ID'] = $("#theme_id_hid_id").val();
	}
	params['themeCssStr'] = '{ "classCss" : ' + cssData + '}';

	_showProgressBar(true);
	$.ajax( {
		
		url : saveThemeURL,
		type : "post",
		dataType : "json",
		data : params,
		success : function(data) {
			_showProgressBar(false);
			if (data["_error"] == null) {
				_showErrorMsg(record_saved_Successfully_key,
							success_msg_title);
				themeCustomization_closeDialog(true);
			}
		}
	});
	
}

/**
 * Get the css of the class
 * 
 * @param {Object} clazz
 * @return {TypeName} 
 */
function themeCustomization_getCss(clazz) {
	var css = '{ "cssName" : "' + clazz + '", "attributeCss" : [';
	var v, a;
	var t = ['color', 'font-family', 'font-size', 
		'background', 'background-color', 'background-image','border-top-color'];
	var filterExist = $(returnClass(clazz)).css('filter');
	$.each( t, function(i, a) {
		v = $(returnClass(clazz)).css(a);
		//in case the css is for ui-widget-content we should take it from the path-theme-dummy directly.
		if(clazz==".ui-widget-content:not(.ui-jqgrid):not(.jqgrow)")
		{
			if(v.indexOf("none")!=-1)
			{
				v = $(returnClass("")).css(a);
			}
		}
		if(v) {
			//add checking on "filter" attribute to support IE9.
			if(v.indexOf('linear-gradient') != -1 || (filterExist && filterExist.indexOf('DXImageTransform') && $.browser.msie && $.browser.version==9)) {
				var colors;
				var colVal = filterExist && filterExist != 'none' ? filterExist : v;
				colors = v.indexOf('webkit') != -1 ? getGradientColors(v, true) : getGradientColors(colVal, false);
				var start =  colors[0];
				var end =  colors[1];
				css +=  '{"attrName": "' + a + '", "valueCss" : ["linear-gradient(#' + start + ',#' + end + ') !important;",';
				css += '"-moz-linear-gradient(#' + start + ', #' + end + ') !important;",';
				css += '"-webkit-gradient(#' + start + ', #' + end + ') !important;",';
				css += '"-webkit-linear-gradient(#' + start + ', #' + end + ') !important;",';
				//add "filter" attribute(value) to support IE9.
				css += '"progid:DXImageTransform.Microsoft.gradient(startColorstr=#' + start + ', endColorstr= #' + end + ') !important;"]},';
			} else if(v.indexOf('url') != -1){
				v = v.replace(/\"/g, '\\\"');
				css += '{"attrName": "' + a + '", "valueCss" : ["' + v + ' !important;" ]},';
			} else if(v.indexOf('"') != -1){
				v = v.replace(/\"/g, '\\\"');
				css += '{"attrName": "' + a + '", "valueCss" : ["' + v + ' !important;" ]},';
			} else if("border-top-color"==a){
				css += '{"attrName": "border-color", "valueCss" : ["' + v + ' !important;" ]},';
			} else {
				css += '{"attrName": "' + a + '", "valueCss" : ["' + v + ' !important;" ]},';
			}
		}
	});
	css = css.slice(0, -1); // Remove last coma
	css += ']}';
	return css;
}


/**
 * Before close check if there is a change
 */
function themeCustomization_checkIfChangeAndClose() {
		
	var changes = themeCustomization_isChange();
	if (changes) {
		_showConfirmMsg(changes_made_confirm_msg, "",
				"themeCustomization_closeDialog", "yesNo");
	} else {
		themeCustomization_closeDialog(true);
	}
}

/**
 * Close the dilaog
 */
function themeCustomization_closeDialog(yesNo) {
	if(yesNo) {
		$("#themesCustomizationMainDialog").dialog("destroy");
		$("#themesCustomizationMainDialog").remove();
		
		themeCustomization_removeImagesFromMemory();
		
		$("link[id='appMainThemeCustomizationLink_DivStyle']").remove();
		$('link[id^="customClass"').remove();
		themeCustomization_loadCssFromRepo();
		
	}
}

/**
 * Load the css again
 */
function themeCustomization_loadCssFromRepo() {
	var cssURLGlobe = jQuery.contextPath 
		+ '/path/customization/ThemeCustomizationAction_loadCssFromRepository?_='+Date.now();
	
	$("link[id='appMainThemeCustomizationLink_GlobalStyle']").remove();
	
	$("<link/>", {
		   rel: "stylesheet",
		   type: "text/css",
		   href: cssURLGlobe,
		   id: "appMainThemeCustomizationLink_GlobalStyle"
		}).appendTo("head");
}

/**
 * Remove the images from memory
 */
function themeCustomization_removeImagesFromMemory() {
	// Remove the images from the session
	var removeImagesAction = jQuery.contextPath + '/path/customization/ThemeCustomizationAction_removeImagesFromMemory';
	$.ajax( {url : removeImagesAction, type : "get"});
}

/**
 * When double click on a theme
 */
function themeCustomization_onDbClickedEvent() {
	var changes = themeCustomization_isChange();
	if (changes) {
		_showConfirmMsg(changes_made_confirm_msg, "",
				"themeCustomization_requestLoadData", "yesNo");
	} else {
		themeCustomization_requestLoadData(true);
	}
}

/**
 * Load the data of the theme
 * 
 * @param {Object} yesNo
 */
function themeCustomization_requestLoadData(yesNo) {
	if(yesNo) {
		var table = $("#themesCustomizationListGrid");
		var selectedRowId = table.jqGrid('getGridParam', 'selrow');
		var selectedRow = table.jqGrid('getRowData', selectedRowId);
		var themeId = selectedRow["themeVO.THEME_ID"];
		var themeName = selectedRow["themeVO.THEME_NAME"];
		var isThemeActive = selectedRow["themeVO.IS_ACTIVE_YN"];
		var themeApp = selectedRow["themeVO.APP_NAME"];
		var themeAppDesc = selectedRow["appDesc"];
		
		var newThemeSrc = jQuery.contextPath + '/path/customization/ThemeCustomizationAction_loadTheme';
		
		_showProgressBar(true);
		// Remove the images
		themeCustomization_removeImagesFromMemory();
		
		// Empty the previous
		$('#main_content_themeCustomization').empty();
		$('#main_content_themeCustomization').load(newThemeSrc, null, function() {
			
			if(!$("#loadThemeCustomization_saveBtn_id").is(":visible")) {
				$("#loadThemeCustomization_saveBtn_id").show();
			} 
			$("#theme_name_id").val(themeName);
			$("#theme_id_hid_id").val(themeId);
			
			if('IMAL' == themeApp) {
				$('#theme_isIMAL_id').prop('checked', true);
				themeCustomization_showHideApplicationLookup();
			} else {
				$("#lookuptxt_themeApplication_lookup").val(themeApp);
				// Get desc of the app
				$("#theme_appDesc").val(themeAppDesc);
			}
			
			$('#theme_active_id').prop('checked', isThemeActive == 1 ? true : false);
			
			$("link[id^='appMainThemeCustomizationLink']").remove();
			
			var sourceHref =  jQuery.contextPath
					+ "/path/customization/ThemeCustomizationAction_returnCssFile?themeCustomizationCO.themeVO.THEME_ID=" + themeId + "&_=" + Date.now();
			$("<link/>", {
			   rel: "stylesheet",
			   type: "text/css",
			   href: sourceHref,
			   id:'appMainThemeCustomizationLink_DivStyle'
			}).appendTo("head");
			
			
			themeCustomization_showHideGrid("themesCustomizationListGrid", "themeCustomizationListDiv");
			_showProgressBar(false);
		});
	}
}

/**
 * Check if there is a change in the customization details
 */
function themeCustomization_isChange() {
	var changes = false;
	if (!themeCustomization_isEmpty("#main_content_themeCustomization")) {
		
		changes = $("#themeCustomizationDetailsForm_ID").hasChanges();
		if (changes == true || changes == "true") {
			changes = true;
		}
	}
	return changes;
}

/**
 * When adding a theme
 */
function themeCustomization_onAddClickedEvent() {

	var changes = themeCustomization_isChange();
	if (changes) {
		_showConfirmMsg(changes_made_confirm_msg, "",
				"themeCustomization_requestNewTheme", "yesNo");
	} else {
		themeCustomization_requestNewTheme(true);
	}
}

/**
 * Add new theme
 * 
 * @param {Object} yesNo
 */
function themeCustomization_requestNewTheme(yesNo) {
	if(yesNo) {
		_showProgressBar(true);
		var newThemeSrc = jQuery.contextPath + '/path/customization/ThemeCustomizationAction_loadTheme';
		
		$("link[id='appMainThemeCustomizationLink_DivStyle']").remove();
		
		themeCustomization_removeImagesFromMemory();
		
		$('#main_content_themeCustomization').empty();
		$('#main_content_themeCustomization').load(newThemeSrc, null, function() {
			
			if(!$("#loadThemeCustomization_saveBtn_id").is(":visible")) {
				$("#loadThemeCustomization_saveBtn_id").show();
			}
			
			themeCustomization_loadCssFromRepo();
			
			// themeId = null means get the css of the current active theme
			var sourceHref =  jQuery.contextPath
					+ "/path/customization/ThemeCustomizationAction_returnCssFile?_=" + Date.now();
			$("<link/>", {
			   rel: "stylesheet",
			   type: "text/css",
			   href: sourceHref,
			   id:'appMainThemeCustomizationLink_DivStyle'
			}).insertBefore("link[id='appMainThemeCustomizationLink_GlobalStyle']");
			
			themeCustomization_showHideGrid("themesCustomizationListGrid", "themeCustomizationListDiv");
			_showProgressBar(false);
		});
	}
}

/**
 * Ask before delete
 */
function themeCustomization_onDeleteClickedEvent() {
	_showConfirmMsg(delete_selected_record_key, "",
				"themeCustomization_deleteTheme", "yesNo");
}

/**
 * deleting a theme
 */
function themeCustomization_deleteTheme(yesNo) {
	if(yesNo) {
		var table = $("#themesCustomizationListGrid");
		var selectedRowId = table.jqGrid('getGridParam', 'selrow');
		var selectedRow = table.jqGrid('getRowData', selectedRowId);
		var themeId = selectedRow["themeVO.THEME_ID"];
	
		var deleteAction = jQuery.contextPath + '/path/customization/ThemeCustomizationAction_deleteUserTheme';
	
		var params = {};
		params['themeCustomizationCO.themeVO.THEME_ID'] = themeId;
	
		_showProgressBar(true);
		$
				.ajax( {
	
					url : deleteAction,
					type : "post",
					dataType : "json",
					data : params,
					success : function(data) {
						_showProgressBar(false);
						if (data["_error"] == null) {
							_showErrorMsg(record_was_Deleted_Successfully_key,
									success_msg_title);
							$("#themesCustomizationListGrid").trigger("reloadGrid");
							$('#main_content_themeCustomization').empty();
						}
					}
				});
	}
}

/**
 * Called to customize a class
 * 
 * @param {Object} obj
 */
function themeCustomization_customizeClass(obj) {

	
	var customClass = $(obj).attr('customClass');
	var dialogTitle = escapeHtml($(obj).attr('title'));

	var styleAttrUrl = jQuery.contextPath + '/path/customization/ThemeCustomizationAction_returnStyleAttrs';
	var params = 'themeCustomizationCO.styleVO.STYLE_TECH_NAME=' + customClass;

	_showProgressBar(true);
	$.ajax( {
		
		url : styleAttrUrl,
		type : "post",
		dataType : "json",
		data : params,
		success : function(data) {
			_showProgressBar(false);
			if (data["_error"] == null) {
				themeCustomization_buildCustomizingDialog(customClass,dialogTitle,
						data.themeCustomizationCO.styleAttrVOs);
			}
		}
	});
	
}

/**
 * Build the customization dialog 
 * 
 * @param {Object} customClass
 * @param {Object} dialogTitle
 * @param {Object} attrs
 * @memberOf {TypeName} 
 * @return {TypeName} 
 */
function themeCustomization_buildCustomizingDialog(customClass, dialogTitle, attrs) {
	attrs = attrs || [];
	var attrLength = attrs.length;
	var flags = [];
	var params = "";
	var colorAttr,bcolorAttr, fontAttr, sizeAttr, gradientAttr, imageRef, borderAttr;
	var defaultedAttrs = $('#main_content_themeCustomization span[customClass="' + customClass + '"]').attr('defaultedAttrs');
	defaultedAttrsArr = defaultedAttrs ? defaultedAttrs.split(',') : []; 
	var hasDefaults = false;
	if(defaultedAttrsArr.length > 0) {
		hasDefaults = true;		
	}
	
	for(var i = 0;  i < attrLength; i++) {
		
		if(1 == attrs[i].attrVO.ATTRIBUTE_TOOL_ID && "bc" == attrs[i].attrVO.ATTRIBUTE_CODE) {
			flags.push({bcolorChange:1, code: attrs[i].attrVO.ATTRIBUTE_TECH_NAME, addAttr: attrs[i].attrVO.STYLE_ADDITIONAL_ATTR, attrCode:attrs[i].attrVO.ATTRIBUTE_CODE});
			params += "&themeCustomizationCO.bcolorChange=1";
			bcolorAttr = attrs[i].attrVO.ATTRIBUTE_TECH_NAME;
			
			if(hasDefaults) {
				if(themeCustomization_checkIfAttributeIsDefaulted(attrs[i].attrVO.ATTRIBUTE_CODE, defaultedAttrsArr)) {
					params += "&themeCustomizationCO.bcolorDefaulted=1";
				}
			}
			
		} else if(1 == attrs[i].attrVO.ATTRIBUTE_TOOL_ID && "c" == attrs[i].attrVO.ATTRIBUTE_CODE) {
			flags.push({colorChange:1, code: attrs[i].attrVO.ATTRIBUTE_TECH_NAME, addAttr: attrs[i].attrVO.STYLE_ADDITIONAL_ATTR, attrCode:attrs[i].attrVO.ATTRIBUTE_CODE});
			params += "&themeCustomizationCO.colorChange=1";
			colorAttr = attrs[i].attrVO.ATTRIBUTE_TECH_NAME;
			
			if(hasDefaults) {
				if(themeCustomization_checkIfAttributeIsDefaulted(attrs[i].attrVO.ATTRIBUTE_CODE, defaultedAttrsArr)) {
					params += "&themeCustomizationCO.colorDefaulted=1";
				}
			}
		} else if(2 == attrs[i].attrVO.ATTRIBUTE_TOOL_ID) {
			flags.push({imageChange:1, code: attrs[i].attrVO.ATTRIBUTE_TECH_NAME, addAttr: attrs[i].attrVO.STYLE_ADDITIONAL_ATTR, attrCode:attrs[i].attrVO.ATTRIBUTE_CODE});
			imageRef = customClass.substring(1, customClass.length);
			params += "&themeCustomizationCO.imageChange=1&imageRef=" + imageRef;
			
			if(hasDefaults) {
				if(themeCustomization_checkIfAttributeIsDefaulted(attrs[i].attrVO.ATTRIBUTE_CODE, defaultedAttrsArr)) {
					params += "&themeCustomizationCO.imageDefaulted=1";
				}
			}
		} else if(3 == attrs[i].attrVO.ATTRIBUTE_TOOL_ID) {
			flags.push({fontChange:1, code: attrs[i].attrVO.ATTRIBUTE_TECH_NAME, addAttr: attrs[i].attrVO.STYLE_ADDITIONAL_ATTR, attrCode:attrs[i].attrVO.ATTRIBUTE_CODE});
			params += "&themeCustomizationCO.fontChange=1";
			fontAttr = attrs[i].attrVO.ATTRIBUTE_TECH_NAME;
			
			if(hasDefaults) {
				if(themeCustomization_checkIfAttributeIsDefaulted(attrs[i].attrVO.ATTRIBUTE_CODE, defaultedAttrsArr)) {
					params += "&themeCustomizationCO.fontDefaulted=1";
				}
			}
		} else if(4 == attrs[i].attrVO.ATTRIBUTE_TOOL_ID) {
			flags.push({sizeChange:1, code: attrs[i].attrVO.ATTRIBUTE_TECH_NAME, addAttr: attrs[i].attrVO.STYLE_ADDITIONAL_ATTR, attrCode:attrs[i].attrVO.ATTRIBUTE_CODE});
			params += "&themeCustomizationCO.sizeChange=1";
			sizeAttr = attrs[i].attrVO.ATTRIBUTE_TECH_NAME;
			
			if(hasDefaults) {
				if(themeCustomization_checkIfAttributeIsDefaulted(attrs[i].attrVO.ATTRIBUTE_CODE, defaultedAttrsArr)) {
					params += "&themeCustomizationCO.sizeDefaulted=1";
				}
			}
		} else if(5 == attrs[i].attrVO.ATTRIBUTE_TOOL_ID) {
			flags.push({gradientChange:1, code: attrs[i].attrVO.ATTRIBUTE_TECH_NAME, addAttr: attrs[i].attrVO.STYLE_ADDITIONAL_ATTR, attrCode:attrs[i].attrVO.ATTRIBUTE_CODE});
			params += "&themeCustomizationCO.gradientChange=1";
			gradientAttr = attrs[i].attrVO.ATTRIBUTE_TECH_NAME;
			
			if(hasDefaults) {
				if(themeCustomization_checkIfAttributeIsDefaulted(attrs[i].attrVO.ATTRIBUTE_CODE, defaultedAttrsArr)) {
					params += "&themeCustomizationCO.gradientDefaulted=1";
				}
			}
		}else if(6 == attrs[i].attrVO.ATTRIBUTE_TOOL_ID ) {
			flags.push({borderChange:1, code: attrs[i].attrVO.ATTRIBUTE_TECH_NAME, addAttr: attrs[i].attrVO.STYLE_ADDITIONAL_ATTR, attrCode:attrs[i].attrVO.ATTRIBUTE_CODE});
			params += "&themeCustomizationCO.borderChange=1";
			borderAttr = attrs[i].attrVO.ATTRIBUTE_TECH_NAME;
			
			if(hasDefaults) {
				if(themeCustomization_checkIfAttributeIsDefaulted(attrs[i].attrVO.ATTRIBUTE_CODE, defaultedAttrsArr)) {
					params += "&themeCustomizationCO.borderDefaulted=1";
				}
			}
		}
	}
	
	var actionSource = jQuery.contextPath
				+ "/path/customization/ThemeCustomizationAction_buildCustomizationDialog?" 
				+ params;
	
	var classToApply = returnClass(customClass);
	
	$('#customizingDialogDiv').remove();
	$("<div id='customizingDialogDiv'></div>").appendTo('body');
	
	$('#customizingDialogDiv').load(actionSource, null, function() {
		
		if(colorAttr) {
			includeColorPicker(classToApply, colorAttr,"tCD");
		}
		if(bcolorAttr) {
			includeColorPicker(classToApply, bcolorAttr,"tCDB");
		}
		if(sizeAttr) {
			var sizePX = $(classToApply).css(sizeAttr) || '0px';
			$('#tCD_change_size_tf').val(sizePX.slice(0,-2));
		}
		if(fontAttr) {
			var ffamily = $(classToApply).css(fontAttr) || '';
			//in order to remove " from font to be catched by the filter.
			ffamily = ffamily.replace(/"/g,'');
			$("#tCD_font_family_dd option").filter(function() {
			    return $(this).text() == ffamily; 
			}).prop('selected', true);
		}
		if(gradientAttr) {
			includeGradientColorPicker(classToApply, gradientAttr);
		}
		if(borderAttr)
		{
			includeBorderPicker(classToApply, borderAttr);
		}
		var dialogOptions = {
			modal : true,
			autoOpen : false,
			show : 'slide',
			title: dialogTitle,
			position : 'center',
			closeOnEscape : false,
			'height' : returnMaxHeight(400),
			'width' : returnMaxWidth(600),
			buttons : [ {
				text : "OK",
				click : function() {
					themeCustomization_applyClassChanges(customClass, classToApply, flags, imageRef);
					$(this).dialog("destroy");
					$('#customizingDialogDiv').remove();
				}

			}, {
				text : "Close",
				click : function() {
					$(this).dialog("destroy");
					$('#customizingDialogDiv').remove();
				}
			} ]
		};

		$("#customizingDialogDiv").dialog(dialogOptions);
		$("#customizingDialogDiv").dialog("open");
	});
}

/**
 * Check if the attribute is defaulted
 * 
 * @param {Object} attributeName
 * @param {Object} defaultedAttributes
 */
function themeCustomization_checkIfAttributeIsDefaulted(attributeName, defaultedAttributes) {
	if($.inArray( attributeName, defaultedAttributes ) != -1)
		return true;
	return false;
}

/**
 * Return the correct class to apply the changes
 * 
 * @param {Object} customClass
 */
function returnClass(customClass) {
	
	var mainDiv = '.path-theme-customization-dummy ';
	var classToApply = '';
	var classes = customClass.split(',');
	if(classes) {
		for(var i = 0 ; i <classes.length ; i++) {
			classToApply += mainDiv + classes[i] + ' ,';
		}
	}
	return classToApply.slice(0, -1); // remove the last comma
}

/**
 * Return the start and the end color
 * @param {Object} c
 */
function getGradientColors(c, isChrome) {
	var colorArray = [];
	var gradient;
	if(isChrome) {
		gradient = c.substring(c.indexOf('rgb('),c.lastIndexOf('))') + 1);
	}
	else if ($.browser.msie && $.browser.version == 9)
		{
		c = c.replace(/\s+/g, '');
		c = c.replace(/['"]+/g, '');
		var startCol = c.substring(c.indexOf('startColorstr')+15,c.indexOf('startColorstr')+ 21);
		var endCol= c.substring(c.indexOf('endColorstr')+13,c.indexOf('endColorstr')+ 19);
		colorArray.push( startCol ? startCol : '000000' );
		colorArray.push( endCol ? endCol : '000000' );
		return colorArray;
		}
	else
		{
		gradient = c.split('0%')[0].split('linear-gradient(')[1];
		gradient = gradient.slice(0, -1);
		}
	var colors = gradient.split(', rgb(');
	colorArray.push( colors[0] ? rgbToHex(colors[0].trim()) : '000000' );
	colorArray.push( colors[1] ? rgbToHex('rgb('+ colors[1].trim()) : '000000' );
	return colorArray;
}

/**
 * Construct color picker for gradient customization
 */
function includeGradientColorPicker(classToApply, attribute) {
	
	var startColor, endColor;
	//check if IE( then consider loading the attribute filter
	var col = $(classToApply).css('filter');
	if(col && $.browser.version == 9)
	{
		var colors = getGradientColors(col, false);
		startColor = colors[0];
		endColor = colors[1];
	}
	else
	{
		var c = $(classToApply).css('background');
		if(!c) {
			c = $(classToApply).css('background-image');
			if(!c || "none" == c || c.indexOf("url") > -1) {
				startColor = $(classToApply).css('background-color');
				startColor = startColor && "transparent" != startColor ? rgbToHex(startColor) : '000000';
				endColor = startColor;
			} else if(c) {
				var colors = getGradientColors(c, false);
				startColor = colors[0];
				endColor = colors[1];
			}
		} // case in chrome browser
		else if(c && c.indexOf("-webkit-linear-gradient") > -1){
			var colors = getGradientColors(c, true);
			startColor = colors[0];
			endColor = colors[1];
		}
	}
	
	// init
	$("#tCD_colorPicker_start_div_hid").val(startColor);
	$("#tCD_colorPicker_end_div_hid").val(endColor);

	$('#tCD_colorPicker_start_div').colpick({
		flat:true,
		layout:'hex',
		submit:0,
		color: startColor,
		onChange:function(hsb,hex,rgb,el,bySetColor) {
			$("#tCD_colorPicker_start_div_hid").val(hex);
			themeCustomization_clearDefault('tCD_gradientChange_default');
		}
	});
	
	$('#tCD_colorPicker_end_div').colpick({
		flat:true,
		layout:'hex',
		submit:0,
		color: endColor,
		onChange:function(hsb,hex,rgb,el,bySetColor) {
			$("#tCD_colorPicker_end_div_hid").val(hex);
			themeCustomization_clearDefault('tCD_gradientChange_default');
		}
	});
}

/**
 * Construct color picker for gradient customization
 */
function includeColorPicker(classToApply, attribute, divId) {
	var c = $(classToApply).css(attribute);
	var colorHex = c ? rgbToHex(c) : 'ffffff';
	$("#"+divId+"_colorPicker_div_hid").val(colorHex);
	$("#"+divId+"_colorPicker_div").colpick({
		flat:true,
		layout:'hex',
		submit:0,
		color: colorHex,
		onChange:function(hsb,hex,rgb,el,bySetColor) {
			$("#"+divId+"_colorPicker_div_hid").val(hex);
			themeCustomization_clearDefault(divId+'_colorChange_default');
		}
	});
}

/**
 * Construct color picker for border customization
 */
function includeBorderPicker(classToApply, attribute, divId) {
	if("border-color"==attribute)
	{
		attribute = "border-top-color";
	}
	var c = $(classToApply).css(attribute);
	var colorHex = c ? rgbToHex(c) : 'ffffff';
	$("#tCD_borderPicker_div_hid").val(colorHex);
	$('#tCD_borderPicker_div').colpick({
		flat:true,
		layout:'hex',
		submit:0,
		color: colorHex,
		onChange:function(hsb,hex,rgb,el,bySetColor) {
			$("#tCD_borderPicker_div_hid").val(hex);
			themeCustomization_clearDefault('tCD_borderChange_default');
		}
	});
}

/**
 * Apply the changes on the given class dynamically
 * 
 * @param {Object} classToApply
 * @param {Object} flags
 */
function themeCustomization_applyClassChanges(customClass, classToApply, flags, imageRef) {

	themeCustomization_markFormChanged();
	
	var cssData = classToApply + " {";
	var defaultedAttrs = "";
	var arrowColor = null;
	var arrowChange=false;
	if(flags) {
		
		for(var i = 0;  i < flags.length; i++) {
		
			if(flags[i].colorChange==1) {
				var isColorChangeDef = 
					($('#tCD_colorChange_default').val() && $('#tCD_colorChange_default').val() == '1')
					? true : false;
				// if not defaulted consider the change
				if(!isColorChangeDef) {
					cssData += flags[i].code + ":#" + $('#tCD_colorPicker_div_hid').val() + " !important;";		
					
				} else {
					defaultedAttrs += flags[i].attrCode + ",";	
				}
			}else if(flags[i].bcolorChange==1){
				var isColorChangeDef = 
					($('#tCDB_colorChange_default').val() && $('#tCDB_colorChange_default').val() == '1')
					? true : false;
					
				// if not defaulted consider the change
				if(!isColorChangeDef) {
					cssData += flags[i].code + ":#" + $('#tCDB_colorPicker_div_hid').val() + " !important;";
					if(customClass=='.tooltipster-box .tooltipster-content'){
					arrowColor="#" +  $('#tCDB_colorPicker_div_hid').val() + " !important;";
					arrowChange=true;}
				} else {
					defaultedAttrs += flags[i].attrCode + ",";
				}
			}else if(flags[i].borderChange) {
				var isBorderChangeDef = 
					($('#tCD_borderChange_default').val() && $('#tCD_borderChange_default').val() == '1')
					? true : false;
				// if not defaulted consider the change
				if(!isBorderChangeDef) {
					cssData += flags[i].code + ":#" + $('#tCD_borderPicker_div_hid').val() + " !important;";
				} else {
					defaultedAttrs += flags[i].attrCode + ",";
				}
			} else if(flags[i].imageChange) {
				var isImageChangeDef = 
					$('#tCD_importfile_default').val() && $('#tCD_importfile_default').val() == '1' ? true : false;
				if(!isImageChangeDef) {
					cssData += "background-repeat: no-repeat; background-size: 90px 60px;";
					cssData += flags[i].code + ": url('" + jQuery.contextPath + "/login/logincustomization/loginThemeCustomization_returnImage?date=" + Date.now() + "&imageRef=" + imageRef + "') !important;"
				} else {
					defaultedAttrs += flags[i].attrCode + ",";
				}
			} else if(flags[i].fontChange) {
				var isFontChangeDef = 
					$('#tCD_fontChange_default').val() && $('#tCD_fontChange_default').val() == '1' ? true : false;
				if(!isFontChangeDef) {
					cssData += flags[i].code + ": " + $('#tCD_font_family_dd option:selected' ).text() + " !important;";
				} else {
					defaultedAttrs += flags[i].attrCode + ",";
				}
			} else if(flags[i].sizeChange) {
				var isSizeChangeDef = 
					$('#tCD_sizeChange_default').val() && $('#tCD_sizeChange_default').val() == '1' ? true : false;
				if(!isSizeChangeDef) {
					cssData += flags[i].code + ": " + $('#tCD_change_size_tf').val() + "px !important;";
				} else {
					defaultedAttrs += flags[i].attrCode + ",";
				}
			} else if(flags[i].gradientChange) {
				var isGradChangeDef = 
					$('#tCD_gradientChange_default').val() && $('#tCD_gradientChange_default').val() == '1' ? true : false;
				if(!isGradChangeDef) {
					var start = '#' + $($($('#tCD_colorPicker_start_div').find('.colpick_hex_field')).find('input')).val();
					var end = '#' + $($($('#tCD_colorPicker_end_div').find('.colpick_hex_field')).find('input')).val();
						cssData += flags[i].code + ": linear-gradient(" + start + "," + end + ") !important;";
						//add "filter" attribute/value to support IE9.
						cssData += "filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='" + start + "', endColorstr= '"+ end + "') !important;";
						cssData += flags[i].code + ": -moz-linear-gradient(" + start + ", " + end + ") !important;";
						cssData += flags[i].code + ": -webkit-gradient(" + start + ", " + end + ") !important;";
						cssData += flags[i].code + ": -webkit-linear-gradient(" + start + ", " + end + ") !important;";
				} else {
					defaultedAttrs += flags[i].attrCode + ",";
				}
			}
		}
		
		cssData += "}";
		//TP#833986 Customize the tooltipster-arrow
	   	if(customClass == '.tooltipster-box .tooltipster-content' ){
	   		if(arrowChange){
	   		cssData += ".path-theme-customization-dummy .tooltipster-arrow-background {border-top-color: "+arrowColor+"}";	
	   		}
	   	}
		$('#main_content_themeCustomization span[customClass="' + customClass + '"]').attr('defaultedAttrs', defaultedAttrs);
		reconstructCssToReflectDefaultValues(customClass.replace(/[\.\s,]/g,'_'));
		
		
		var sourceHref =  jQuery.contextPath
					+ "/path/customization/ThemeCustomizationAction_returnCssFile?cssData=" + encodeURIComponent(cssData) 
					+ "&_=" + Date.now();
		$("<link/>", {
		   rel: "stylesheet",
		   type: "text/css",
		   href: sourceHref,
		   id : 'customClass' + customClass.replace(/[\.\s,]/g,'_')
		}).insertAfter("link[id='appMainThemeCustomizationLink_GlobalStyle']");
		
		
	}
}

/**
 * Reconstruct the CSS to reflect the default values of the defaulted attributes
 */
function reconstructCssToReflectDefaultValues(customClassLinkId){
	
	var cssDefaulted = "";
	var clazz, defaultedAttrs;
	
	$('#main_content_themeCustomization span[customClass]').each(function(index, value) {
		clazz = $( value ).attr('customClass');
		defaultAttrCodes = $( value ).attr('defaultedAttrs');
		defaultAttrCodesArr = defaultAttrCodes ? defaultAttrCodes.split(',') : []; 
		if(defaultAttrCodesArr.length > 0) {
			cssDefaulted +=  '{ "cssName" : "' + clazz + '", "defaultAttrCodes" : [' 
			for(var j = 0; j< defaultAttrCodesArr.length ; j++)
				if(defaultAttrCodesArr[j] && defaultAttrCodesArr[j] != '')
					cssDefaulted += '{"attrName": "' + defaultAttrCodesArr[j] + '"},';
			if(cssDefaulted.lastIndexOf(',') == cssDefaulted.length-1)
				cssDefaulted = cssDefaulted.slice(0,-1);
				
			cssDefaulted += ']},';
			if(customClassLinkId=='_tooltipster-box__tooltipster-content'){
				cssDefaulted += '[{ "cssName" : ".tooltipster-arrow-background", "defaultAttrCodes" : [{"attrName": "btc"}]}]';
				
			}
		}
	});
	var cssData = "[" + (cssDefaulted != '' ? cssDefaulted.slice(0,-1) : '') + "]"; // Remove last comma
	
	// in case not new load the theme that is currently edited
	var themeId = $("#theme_id_hid_id").val() || '';
	
	var cssURLMainDiv = jQuery.contextPath 
		+ '/path/customization/ThemeCustomizationAction_returnCssFileWithDefault?cssScope=1' 
		+ ((themeId != '') ? '&themeCustomizationCO.themeVO.THEME_ID=' + themeId : '')
		+ '&themeCssStr=' + encodeURIComponent('{ "classCss" : ' + cssData + '}');
	var cssURLGlobe = jQuery.contextPath 
		+ '/path/customization/ThemeCustomizationAction_returnCssFileWithDefault?cssScope=2' 
		+ ((themeId != '') ? '&themeCustomizationCO.themeVO.THEME_ID=' + themeId : '')
		+ '&themeCssStr=' + encodeURIComponent('{ "classCss" : ' + cssData + '}');

	
	$("link[id^='appMainThemeCustomizationLink']").remove();
	
	$("<link/>", {
	   rel: "stylesheet",
	   type: "text/css",
	   href: cssURLGlobe,
	   id: "appMainThemeCustomizationLink_GlobalStyle"
	}).appendTo("head");
	
	$("<link/>", {
		   rel: "stylesheet",
		   type: "text/css",
		   href: cssURLMainDiv,
		   id: "appMainThemeCustomizationLink_DivStyle"
		}).insertBefore("link[id='appMainThemeCustomizationLink_GlobalStyle']");
	
	$("link[id='customClass" + customClassLinkId + "'").remove();
	
	var customClassesCss =  $('link[id^="customClass"');
	if(customClassesCss && customClassesCss.length != 0) {
		
		// Delete the already existed (this is to force to load again them in memory)
		$('link[id^="customClass"').remove();
		
		customClassesCss.insertAfter("link[id='appMainThemeCustomizationLink_GlobalStyle']");
	}
}

/**
 * Function to convert rgb format to a hex color
 * 
 * @param {Object} rgb
 * @return hex 
 * @author KhaledHussein
 */
function rgbToHex(rgb){
 rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
 return (rgb && rgb.length === 4) ? 
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}

/**
 * Helper method to upload image
 * @return {TypeName} 
 */
function themeCustomizationUploadImage(imageRef) {
	if ($("#themeCustomization_uploadImage").length && !$("#themeCustomization_uploadImage").val()) {
		_showErrorMsg(Missing_File_Location_key);
		return false;
	}
	
	var splitName = $("#themeCustomization_uploadImage").val().split(".");
	
	if (splitName.length == 1 || (splitName[0] == "" && splitName.length == 2)) {
		_showErrorMsg(file_ext_png_key);
		return false;
	}
	
	if (splitName.pop().toLowerCase() != "png") {
		$("#themeCustomization_uploadImage").val("");
		_showErrorMsg(file_ext_png_key);
		return false;
	}
	
	_showProgressBar(true);
	
	var options = {
		url : jQuery.contextPath
				+ "/path/customization/ThemeCustomizationAction_uploadImage?imageRef=" + imageRef,
		type : 'post',
		success : function(response, status, xhr) {
			_showProgressBar(false);
			var jsonObj = $.parseJSON($(response).html());
			if (jsonObj["_error"] == undefined || jsonObj["_error"] == null
					|| jsonObj["_error"] === "") {
				_showErrorMsg(Process_Executed_Successfully_key,
						success_msg_title);
			} else {
				_showErrorMsg(jsonObj["_error"]);
			}
		},
		error : function(response) {
			_showProgressBar(false);
			_showErrorMsg("error " + response);
		}

	};
	
	$("#themeCustomizationDialogForm_ID").ajaxSubmit(options);
}

/**
 * check if the element is empty
 * 
 * @param {Object} elementId
 * @return {TypeName} 
 */
function themeCustomization_isEmpty(elementId) {
	if (!($.trim($(elementId).html()))) {
		return true;
	} else {
		return false;
	}
}

/**
 * When IS_ACTIVE_YN is changed
 */
function themeCustomization_isActiveChanged() {

	themeCustomization_markFormChanged();
	
	var table = $("#themesCustomizationListGrid");
	var selectedRowId = table.jqGrid('getGridParam', 'selrow');
	var selectedRow = table.jqGrid('getRowData', selectedRowId);
	var isThemeActive = selectedRow["themeVO.IS_ACTIVE_YN"];
	if(isThemeActive == 1) {
		var appName = selectedRow["themeVO.APP_NAME"];
		// Activate the theme
		themeCustomization_activateTheme(selectedRow["themeVO.THEME_NAME"], selectedRow["themeVO.THEME_ID"], selectedRow["themeVO.APP_NAME"]);
		
		// Uncheck all the grid rows for the same app
		var allRowsIDs = table.jqGrid('getDataIDs');
		var rowData, appNameTemp;
		$.each(allRowsIDs, function(index,rowId) {
			if(rowId != selectedRowId) {
				appNameTemp = table.jqGrid('getCell', rowId, 'themeVO.APP_NAME') || '';
				if(appName == appNameTemp) {
					table.jqGrid("setCellEltValue",rowId,"themeVO.IS_ACTIVE_YN",0);
				}
			}
		});
		
		// Check the checkbox in the details if the details are opened
		if($('#theme_active_id')) {
			$('#theme_active_id').prop('checked', true );
		}
	} else {
		// De-Activate the theme
		themeCustomization_deactivateTheme(selectedRow["themeVO.THEME_NAME"], selectedRow["themeVO.THEME_ID"]);
		if($('#theme_active_id')) {
			$('#theme_active_id').prop('checked', false );
		}
	}
}

/**
 * Activate the theme
 */
function themeCustomization_activateTheme(themeName, themeId, appName) {
	
	var action = jQuery.contextPath + '/path/customization/ThemeCustomizationAction_activateUserTheme';
	
	var params = {};
	params['themeCustomizationCO.themeVO.THEME_ID'] = themeId;
	params['themeCustomizationCO.themeVO.APP_NAME'] = appName;

	_showProgressBar(true);
	$.ajax( {
		
		url : action,
		type : "post",
		dataType : "json",
		data : params,
		success : function(data) {
			_showProgressBar(false);
			if (data["_error"] == null) {
				_showErrorMsg(themeName + " " + is_activated_successfully_key,
							success_msg_title);
			}
		}
	});
}

/**
 * Activate the theme
 */
function themeCustomization_deactivateTheme(themeName, themeId) {
	
	var action = jQuery.contextPath + '/path/customization/ThemeCustomizationAction_deactivateUserTheme';
	
	var params = {};
	params['themeCustomizationCO.themeVO.THEME_ID'] = themeId;

	_showProgressBar(true);
	$.ajax( {
		
		url : action,
		type : "post",
		dataType : "json",
		data : params,
		success : function(data) {
			_showProgressBar(false);
			if (data["_error"] == null) {
				_showErrorMsg(themeName + " " + is_deactivated_successfully_key,
							success_msg_title);
			}
		}
	});
}

/**
 * Mark the form as changed
 */
function themeCustomization_markFormChanged() {
	if($("#themeCustomizationDetailsForm_ID") && !themeCustomization_isEmpty("#themeCustomizationDetailsForm_ID")) {
		var theform = document.getElementById("themeCustomizationDetailsForm_ID");
		$.data(theform, 'changeTrack', true);
	}
}

/**
 * Function to hide show the grid by clicking the collapsible panel
 */
function themeCustomization_showHideGrid(gridId, collapsibleElm) {
	var theGrid =  $("#" + gridId);
	if(theGrid.size() > 0)
	{
		$("#" + collapsibleElm + " .collapsibleContainerTitle").click();
	}
}

/**
 * Mark the tool (colorpicker , size, gradient, ...) as default
 */
function themeCustomization_setDefault(defaultFlagId) {
	
	$('#' + defaultFlagId).val('1');
	$('#' + defaultFlagId + "_btn").attr('disabled','disabled').addClass("ui-state-disabled");;
	$('#' + defaultFlagId + "_btn label").text('Defaulted');
}

/**
 * Mark the tool (colorpicker , size, gradient, ...) as un-defaulted
 */
function themeCustomization_clearDefault(defaultFlagId) {
	
	$('#' + defaultFlagId).val('0');
	if($('#' + defaultFlagId + "_btn").is(':disabled')) {
		$('#' + defaultFlagId + "_btn").attr('disabled', false).removeClass("ui-state-disabled");
		$('#' + defaultFlagId + "_btn label").text('Default');
	}
}

/**
 * Show / hide the application live search 
 */
function themeCustomization_showHideApplicationLookup() {
	var isIMAL = $("#theme_isIMAL_id").is(':checked') ? 1 : 0;
	if(isIMAL == 1) {
		$("#theme_application_livesearch").css('display', 'none');
	} else {
		$("#theme_application_livesearch").css('display', 'block');
	}
}

function themeCust_addImportExportBtns()
{
	$("#themesCustomizationListGrid").jqGrid ('navButtonAdd', '#themesCustomizationListGrid_pager',
            { id:"themesCustomizationListImportBtn", 
              caption:"",
              buttonicon: "ui-icon-arrowthickstop-1-n",
              title: import_key,
              onClickButton: function() {
            	  themeCust_openImportDialog();                 
            }});	
	$("#themesCustomizationListGrid").jqGrid ('navButtonAdd', '#themesCustomizationListGrid_pager',
			{ id:"themesCustomizationListExportBtn", 
		caption:"",
		buttonicon: "ui-icon-arrowthickstop-1-s",
		title: export_key,
		onClickButton: function() {
			themeCust_onExportClicked();                 
		}});	
}

function themeCust_onExportClicked()
{
	var $table = $("#themesCustomizationListGrid");
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	if(typeof selectedRowId == "undefined" || selectedRowId == null || selectedRowId == "")
	{
		_showErrorMsg(msg_noRecordSelectedLabel,info_msg_title);
		return;
	}
	var myObject = $table.jqGrid('getRowData', selectedRowId);
	/**
	 * get the selected rowId
	 */
	var _themeId = myObject["themeVO.THEME_ID"];

	if(_themeId!=null && _themeId!=null && _themeId!="")
	{
		_showConfirmMsg(confirm_Export_Process_key, Warning_key,
				themeCust_exportAfterConfirm, {themeId : _themeId});		
	}
	else
	{
		_showErrorMsg(msg_noRecordSelectedLabel,info_msg_title);
	}
}

function themeCust_exportAfterConfirm(confirm,args)
{
	var theParam ={};
	theParam["themeCustomizationCO.themeVO.THEME_ID"] = args.themeId;
	if(confirm)
	{
		var exportUrl = jQuery.contextPath + '/path/customization/themeCustExport_exportScreen';
		$.fileDownload(exportUrl,
		{
		    successCallback: function () {
				_showProgressBar(false);
		    },
		    failCallback: function (html, url) {
		    	_showProgressBar(false);
		        _showErrorMsg(html);
		    },
		    data:theParam
	    });
		
	}
}

function themeCust_openImportDialog()
{
	var dynImportDialogDiv = $("<div id='themeImportDialogDiv' class='path-common-sceen'></div>");
	dynImportDialogDiv.css("padding","0");
	var theBody = $('body');
	dynImportDialogDiv.insertAfter(theBody);	
	dialogUrl= jQuery.contextPath+ "/path/customization/ThemeCustomizationAction_openImportDialog?";
	dialogOptions={ autoOpen: false,
					height:150,
					title:import_key,
					width:340 ,
					modal: true,
					buttons: [ { text : (typeof cancel_label_trans === undefined )? "Close" :cancel_label_trans , click :function(){$(this).dialog('close');}}
			          ],
		           close: function (){
						  $("#themeImportDialogDiv").dialog("destroy");
						  $("#themeImportDialogDiv").remove();
				   }
	   }
	var params = {};
	$.post(dialogUrl ,params , function( param )
 	{
	  $('#themeImportDialogDiv').html(param) ;
	  $('#themeImportDialogDiv').dialog(dialogOptions)
	  $('#themeImportDialogDiv').dialog('open');
	},"html");
}

function themeCustomizationList_importFile() {
	
	if ($("#themeCustImport_File").length && !$("#themeCustImport_File").val()) {
		_showErrorMsg(dyn_import_File_Loc_key);
		return false;
	}
	
	var splitName = $("#themeCustImport_File").val().split(".");
	
	if (splitName.length == 1 || (splitName[0] == "" && splitName.length == 2)) {
		_showErrorMsg(file_theme_ext_key);
		return false;
	}
	
	if (splitName.pop().toLowerCase() != "themecust") {
		$("#themeCustImport_File").val("");
		_showErrorMsg(file_theme_ext_key);
		return false;
	}
	
	_showProgressBar(true);
	
	var options = {
		url : jQuery.contextPath+"/path/customization/ThemeCustomizationAction_importScreen",
		type : 'post',
		success : function(response, status, xhr) 
		{
			_showProgressBar(false);
			var jsonObj = $.parseJSON($(response).html());
			if (jsonObj["_error"] == undefined || jsonObj["_error"] == null
					|| jsonObj["_error"] === "") {
				$("#themeImportDialogDiv").dialog("destroy");
				$("#themeImportDialogDiv").remove();
				loadThemesCustomization();
				_showErrorMsg(Process_Executed_Successfully_key,
						success_msg_title);
			} else {
				_showErrorMsg(jsonObj["_error"]);
			}
		},
		error : function(response) 
		{
			_showProgressBar(false);
			_showErrorMsg("error " + response);
		}

	};
	
	$("#themeCustImportForm_Id").ajaxSubmit(options);
}