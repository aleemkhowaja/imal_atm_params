/*
* jQuery UI Numeric Up/Down v1.0
*
* Copyright 2010, Tony Kramer
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*
* Dependencies:
* - jQuery (1.4.2)
* - jQuery-ui (1.8.6 - core, widget, button)
*/
(function($)
{
    // Default CSS Classes:
    // .ui-numeric { display: inline-block; border: 1px inset #7E7F7F; }
    // .ui-numeric input[type=text] { border: none; text-align: right; margin: 0px; vertical-align: top; }
    // .ui-numeric-currency { display: inline-block; padding: 0px 2px; vertical-align: top; }
    // .ui-numeric-buttons { display: inline-block; padding-left: 2px; }
    // .ui-numeric-buttons .ui-button { margin: 0px; width: 18px; height: 18px; }
    // .ui-numeric-disabled {}

    $.widget('ui.numeric', {
        options: {
    	    
            disabled: false,     // Indicates if the widgit is disabled.
            buttons: false,       // Indicates if the up/down buttons should be displayed to the right of the input.
            keyboard: false,      // Indicates if keyboard keys should be allowed to increment/decrement the input value.
            showCurrency: false, // A value indicating if the currency symbol should be displayed to the left of the input.
            currencySymbol: '$', // The currency symbol to use.

//            emptyValue: 0,   // If the value equals the value specified by this option, then the input is made "empty" so that no value is visible. To disable this functionality, set this option to false.
            emptyValue: false,   // PathSolutions: we dont currently want that behavior
            minValue: false, // The minimum value allowed. To disable, set this option to false.
            maxValue: false, // The maximum value allowed. To disable, set this option to false.

            smallIncrement: 1,  // The small increment that is used if the "ctrl" key is pressed.
            increment: 5,       // The default increment that is used if no key modifiers are pressed.
            largeIncrement: 10, // The large increment that is used if the "shift" key is pressed, or when "page up" or "page down" are pressed.
            textDir: false ,
            maxLenBeforeDec: false,
            format: {
    			formatter: '',
                format: '0',       // The string to format the number with. See Number.format() in the jquery.onsharp.number plugin for details.
                decimalChar: '.',  // The decimal character, if the format string specifies that decimal places should be included.
                thousandsChar: ',', // The thousands separator character, if the format string specifies to use one.
                leadZeros: '',
                zeroNotAllowed: false,
                applyRounding: false
            }
        },
        _adjustmentFlag: false,
        _keyDownFlag: false,
        _timer: null,
        _name: 'numeric',
        _value: 0,
		_value: null, //PathSolutions: we dont want the empty value to be defaulted by 0
        _oldValue: 0,
        _label: '',

        _create: function()
        {
            var t = this, o = t.options, w = t.widget();
            if (w.attr('type').toLowerCase() !== 'text')
                throw 'numeric widget can only be applied to text inputs.';
			
            if (typeof o.textDir != "undefined" && o.textDir != false)
        	{
        		if(document.dir == "ltr")
	            	w.css("text-align","right")
	        	else
	            	w.css("text-align","left")
        	}
			
            t._checkFormat();
            t._name = w.attr('id') || w.attr('name');
          	
            var _elementId =w.attr("id");
            var $elt = $(document.getElementById(_elementId))
            
            //PathSolutions: empty value shld remain empty 
            if($.trim(w.val()) != "")
            {
            	t._value = t._getInputValue(w.val());
            }
            
            if(t._value != null && t._value != "")
        	{

            	if(o.minValue !== false && !checkMinVal(o.minValue,t._value ,false)) 
            		t._value = typeof $elt.attr("prevValue") != "undefined" ? $elt.attr("prevValue") : o.minValue ;
	            			 
	       		 if(o.maxValue.toString() !== "false" && !checkMaxVal(o.maxValue,t._value ,false))
            		t._value = typeof $elt.attr("prevValue") != "undefined" ? $elt.attr("prevValue") : o.maxValue;
            	
        		/*
		        if (o.minValue !== false && t._value < o.minValue)
		        {
		            t._value = o.minValue;
		        }
		        if (o.maxValue !== false && t._value > o.maxValue)
		            t._value = o.maxValue;*/

        	}
            t._oldValue = t._value;
            t._setInputValue(t._value);
            //PathSolutions: setting attribute prevValue when no dependency on field, otherwise set in the dependency function
            if(!checkAvailDependency(_elementId))
            	$elt.attr("prevValue",t._value);
            
            // PathSolutions: Marwan Maddah applying the style management for the input width in the account component ...
            // Commented By denisk because of overlapping next element (removed comment grid case did not work)
            var applyFocus = $elt.attr("applyFocus");
            
//            var _tdParent = $("#"+_elementId).parent("td");
//            if( _tdParent.html() !=null)
//            {
//               w.wrap($('<div class="ui-numeric" />'));
//            }
//            else
//            {   
               w.wrap($('<div class="ui-numeric" />'));
//            }
            
            if (o.disabled)
                t._setOption('disabled', true);

//            t._label = w.attr('label');
//            if(t._label !== null && t._label !== "")
//            {
//            	t._createLabel();
//            }
            
            if (o.showCurrency)
                t._createCurrency();

            if (o.buttons)
                t._createButtons();
            
            $(document.getElementById(_elementId)).bind({
                keydown: function(event) { return t._onKeyDown(event) },
                keypress: function(event) { return t._onKeyPress(event) },
                paste: function(event) {var self=this; t.triggerChange = true; setTimeout(function(e) { return t._onKeyUp(event) },0);},
                keyup: function(event) { return t._onKeyUp(event) },
                change: function(event) {return t._onChange(event)},
                focus: function(event){return t._onFocus(event)},
                input:function(event){var self=this; t.triggerChange = true; setTimeout(function(e) { return t._onKeyUp(event) },0);},
                blur:function(event){return t._onBlur(event)},
            });

            if(applyFocus === "true")
            	$elt.focus();
        },

        destroy: function()
        {
            var t = this, w = t.widget();
            var _elementId =w.attr("id");

            $(document.getElementById(_elementId)).unbind({
                keydown: function(event) { return t._onKeyDown(event) },
                keypress: function(event) { return t._onKeyPress(event) },
                paste: function(event) { return t._onKeyUp(event) },
                keyup: function(event) { return t._onKeyUp(event) },
                change: function(event) { return t._onChange(event) },
                focus: function(event){	return t._onFocus(event)},
                input: function(event){	return t._onKeyUp(event)},
                blur: function(event){	return t._onBlur(event)}
            });

            if (t.options.showCurrency)
                $('#' + t._name + '_currency').remove();

            if (t.options.buttons)
                $('#' + t._name + '_buttons').remove();

            w.unwrap();
            $.Widget.prototype.destroy.apply(t);
        },

        _createCurrency: function()
        {
        	this.widget().before(this.options.currencySymbol);
//            this.widget().before($('<div/>').attr('id', this._name + '_currency').addClass('ui-numeric-currency').html(this.options.currencySymbol));
        },
        
        
        _createLabel: function()
        {
        	var t = this;
        	t.widget().before(
                    $('<label/>')
                    .addClass('label ')
                    .html(t._label + ": ")
        	);
        },

        _createButtons: function()
        {
            var t = this;

            var btnUp = $('<button type="button">Up</button>')
                .bind({
                    keydown: function(event) { keydown(event, false); },
                    keyup: function() { up(); },
                    mousedown: function(event) { down(event, false); },
                    mouseup: function() { up(); }
                })
                .button({ text: false, label: 'Up', icons: { primary: 'ui-icon-triangle-1-n'} });

            var btnDown = $('<button type="button">Down</button>')
                .bind({
                    keydown: function(event) { keydown(event, true); },
                    keyup: function() { up(); },
                    mousedown: function(event) { down(event, true); },
                    mouseup: function() { up(); }
                })
                .button({ text: false, label: 'Down', icons: { primary: 'ui-icon-triangle-1-s'} });

            t.widget().after(
                $('<div/>')
                    .attr('id', t._name + '_buttons')
                    .addClass('ui-numeric-buttons')
                    .append(btnUp)
                    .append(btnDown)
            );

            function keydown(event, neg)
            {
                // Allow space or enter to trigger the button.
                if (event.which == 32 || event.which == 13)
                {
                    down(event, neg);
                    event.target.focus();
                }
            }

            function down(event, neg)
            {
                // TODO: Fix if there are more than one numeric instances on the page, then if a button on one instance is clicked, then a button on
                // another instance is clicked, both buttons are shown to have focus.

                // Fixes an issue where if the other button is clicked, then both buttons are shown to have focus.
                (neg ? btnUp : btnDown).blur();
                var inc = t._getIncrement(event.ctrlKey, event.shiftKey);
                t._adjustValueRecursive(neg ? -inc : inc);
            }

            function up()
            {
                clearTimeout(t._timer);
            }
        },

        _setOption: function(key, value)
        {
            var t = this, o = t.options;
            switch (key)
            {
                case 'disabled':
                    var w = t.widget();
                    w.parent()[value ? 'addClass' : 'removeClass']('ui-numeric-disabled ui-state-disabled').attr('aria-disabled', value);
                    t._adjustmentFlag = true;
                    var theVal = w.val();
                    // PathSolutions Get Formated value if not Empty
                    if(theVal != "")
                    {
                    	theVal = t._format(theVal);
                    }
                    if (value)
                    {
                    	w.attr({ disabled: 'disabled', value: theVal });
                    }
                    else
                    {
                    	w.attr({ value: theVal });
                     	w.removeAttr("disabled");
                    }
                    t._adjustmentFlag = false;

                    if (o.buttons)
                        $('#' + t._name + '_buttons button').button(value ? 'disable' : 'enable');
                    break;

                case 'emptyValue':
                    o.emptyValue = value;
                    //empty value should be applied if it is not false and value is actually empty ( default value will be set in this case )
                    if( o.emptyValue !== false && t._value == "")
                	{
                		t._setValue(value);
                	}
                    break;

                case 'minValue':
                    o.minValue = value === false ? false : value;
//                    if(t._value != null && t._value != "" && !checkMinVal(o.minValue,  t._value, false))
//                    {
//                        t._setValue(o.minValue);
//                    }
                    break;

                case 'maxValue':
                    o.maxValue = value === false ? false : value;
//                    if(o.maxValue.toString() !== "false" && t._value != null && t._value != "" && !checkMaxVal(o.maxValue,  t._value, false))
//                	{
//	                    t._setValue(o.maxValue);
//                	}
                    break;
                case 'maxLenBeforeDec':
                    o.maxLenBeforeDec = value === false ? false : value;
                    break;

                case 'format':
                    o.format = value;
                    t._checkFormat();
                     var w = t.widget();
                    // PathSolutions  do not set any value if it is empty, this is called when changing nbFormat for the input upon dependency
					t._value = w.val();
                    if(t._value != "")
                    {
                    	var _elementId =w.attr("id");
            			var $elt = $(document.getElementById(_elementId))
            			$elt.attr("prevValue",t._value )
						t._setInputValue(t._value );
                    }
                    break;

                case 'showCurrency':
                    if (value && !o.showCurrency)
                        t._createCurrency();

                    else if (!value && o.showCurrency)
                        $('#' + t._name + '_currency').remove();

                    o.showCurrency = value;
                    break;
                    
                case 'formatter':
                    o.formatter = ((value !=null && typeof value!="undefined" && value!="")? value : "");
                    break;

                case 'currencySymbol':
                    o.currencySymbol = value;
                    if (o.showCurrency)
                        $('#' + t._name + '_currency').html(value);
                    break;

                case 'buttons':
                    if (value && !o.buttons)
                        t._createButtons();

                    else if (!value && o.buttons)
                        $('#' + t._name + '_buttons').remove();

                    o.buttons = value;
                    break;
                    
				case 'textDir':
					o.textDir = value;
					var w = t.widget();
					if (o.textDir != false)
		        	{
		        		if(document.dir == "ltr")
			            	w.css("text-align","right")
			        	else
			            	w.css("text-align","left")
		        	}
					break;
                default:
                    $.Widget.prototype._setOption.apply(t, key, value);
                    break;
            }
            return t;
        },

        _checkFormat: function()
        {
            var o = this.options;
            if (typeof o.format === 'string')
                o.format = { format: o.format, decimalChar: '.', thousandsChar: ',', leadZeros: '', zeroNotAllowed: false ,applyRounding : false};
            else
                o.format = $.extend({ format: '0', decimalChar: '.', thousandsChar: ',' ,leadZeros: '', zeroNotAllowed: false, applyRounding : false}, o.format);
        },

        _getInputValue: function(val)
        {
            // Remove the thousands separator and normalize the decimal character to a '.' if it isn't already so that JavaScript is able to
            // properly parse the value.
            val = val.replace(new RegExp(regExEscape(this.options.format.thousandsChar), 'g'), '');
            if (this.options.format.decimalChar !== '.')
                val = val.replace(new RegExp(regExEscape(this.options.format.decimalChar), 'g'), '.');
//            return _numVal(val);
            return val;
        },

        _setInputValue: function(val)
        {
            // Set a flag to keep the "onchange" event from calling this method causing an infinate loop.
            this._adjustmentFlag = true;
            this.widget().val(this._format(val));
            this._adjustmentFlag = false;
        },

        _setValue: function(val)
        {
            var t = this;
            var w = t.widget();
//            val = _numVal(val);
			var _elementId =w.attr("id");
          	var $_elt = $(document.getElementById(_elementId)) 
            //check if element has no dependency or change event then perform this test
          	//[Path Solutions] Added Checking on the Attribute fieldAudit in order to handle prvvalue
            //for elements that have no dependency
            if(val != "" && val!= null && !checkAvailDependency(_elementId) && ! checkAvailFieldAudit(_elementId))  
        	{
	            if (t.options.minValue !== false && !checkMinVal(t.options.minValue, val)
	            		|| 
	            	(t.options.maxValue.toString() !== "false" && !checkMaxVal(t.options.maxValue, val,true,$_elt))
	            )
	            {
            		val = typeof $_elt.attr("prevValue") != "undefined" ? $_elt.attr("prevValue"): this._oldValue;
	            }
	            //setting attribute prevValue
            	$_elt.attr("prevValue",val)
            }
            t._value = val;
            if (!t.options.disabled )
            {
			  t._setInputValue(val);
            }
        },

        _format: function(val)
        {
            var o = this.options;
            //PathSolutions: added val === null to check whether it shld stay empty value, old behavior empty will be replaced by 0
            return val === null || isNaN(unformatNumber(val)) || (o.emptyValue !== false && val === o.emptyValue) ? '' : $.formatNumberNumeric(val, o.format);
        },

        _getIncrement: function(ctrl, shift)
        {
            if (ctrl)
                return this.options.smallIncrement;

            else if (shift)
                return this.options.largeIncrement;

            return this.options.increment;
        },

        _adjustValue: function(amount)
        {
            if (this.options.disabled)
                return;

            this._setValue(this._value + amount);
            this.select();
        },

        _adjustValueRecursive: function(amount)
        {
            $.ui.numeric._current = this;
            $.ui.numeric._timerCallback(amount, true);
        },

        _onKeyDown: function(event) //check for keys that do not generate a characters in the input
        {
            var t = this, o = t.options;
            if (o.disabled)
                return;
//            
//			//********PathSolutions: preventing decimal point when format is not decimal
//			//********PathSolutions: preventing negative sign when minValue is 0
//            o.format.decimalChar = typeof o.format.decimalChar !== 'string' || o.format.decimalChar.length <= 0 ? '.' : o.format.decimalChar;
            // in the Format the decimal should always be "."
            //			var decimalIndex = o.format.format.indexOf(".");
//            if ( (decimalIndex == -1 && ( event.which == 110 || event.which == 190 ))
//            		|| ( o.minValue === 0 && (event.which == 109 || event.which == 189 || event.which == 173 )))
//            {
//                event.preventDefault();
//                event.stopPropagation();
//                return;
//            }
//            else //PathSolutions: in case of decimal need to restrict upon number of digits after dec
//        	{
//        		var afterDec = o.format.format.substring(decimalIndex + 1);
//				var len = afterDec.length;
//				var _value = event.target.value;
//				var selectedHtmlElt = getSelectionParentElement();
//				var selectedHtmlText = getSelectedText();
//				$.struts2_jquery.require( "jquery.maskedinput.js",null,jQuery.contextPath+"/common/jquery/js/plugins/"); 
//				var caretPos = $(event.target).caret().begin;
//				var _valDecIndex = _value.indexOf(o.format.decimalChar) ;
//				if(caretPos > _valDecIndex && (selectedHtmlElt !== event.target || selectedHtmlText == ""))
//				{
//					if(isNumericKey(event.which) && _valDecIndex > 0 ) //in case value contains decimal character do the checking  
//					{
//						var valAfterDec = _value.substring(_valDecIndex + 1);
//						if(valAfterDec != "")
//						{
//							if(valAfterDec.length == len ) //do not allow to key in digits more than possible according to nbFormat
//							{
//								event.preventDefault();
//	                			event.stopPropagation();
//	                			return;
//							} 
//						}
//					}
//				}
//        	}
            //*******************************/
            switch (event.which)
            {
                // The following are non-control keys that we want to allow through to perform their default function with no other actions.                                                                        
//                case 109: // Negative Sign (number pad)
//                case 173: // Negative Sign (key pad FFox)
//                case 189: // Negative Sign (key pad other browsers)
//                case 110: // Decimal (number pad)
//                case 190: // Decimal (key pad)
//                	
//                	var selectedHtmlElt = getSelectionParentElement();
//					var selectedHtmlText = getSelectedText() +"";
//            		if(( (event.which == 110 || event.which == 190) && (selectedHtmlElt != event.target || selectedHtmlText.indexOf(o.format.decimalChar) < 0) && event.target.value.indexOf(o.format.decimalChar) >= 0)//prevent putting more than one decimal point
//            				||
//        			   ( (event.which == 109 || event.which == 173 || event.which == 189 ) && 
//        					  (
//      							  returnCursorPosStart(event.target) != 0
//       							  || 
//       							  (selectedHtmlElt != event.target || selectedHtmlText.indexOf("-") < 0)&& event.target.value.indexOf("-") >= 0) //do not allow more than one negative sign
//        				)
//            		)
//        			{
//            			event.preventDefault();
//            			event.stopPropagation();
//            			return;
//        			}
//                    t._keyDownFlag = true;
//                    return;
					
                case 38: // Up Arrow
                    if (o.keyboard)
                        t._adjustValue(t._getIncrement(event.ctrlKey, event.shiftKey));
                    return;

                case 40: // Down Arrow
                    if (o.keyboard)
                        t._adjustValue(-t._getIncrement(event.ctrlKey, event.shiftKey));
                    return;

                case 33: // Page Up
                    if (o.keyboard)
                        t._adjustValue(o.largeIncrement);
                    return;

                case 34: // Page Down
                    if (o.keyboard)
                        t._adjustValue(-o.largeIncrement);
                    return;

                    // The following are keyboard shortcuts that we still want to allow.
                case 65: // A (select all)
                case 67: // C (copy)
                case 86: // V (paste)
                case 88: // X (cut)
                case 89: // Y (redo)
                case 90: // Z (undo)
                    if (event.ctrlKey)
                    	{
                    		if(event.which == 86 || event.which == 88 || event.which == 89 || event.which == 90)
                    			{
	                    			t.triggerChange = true;
                    			}
	                        return;
                    	}
                    break;
            }

            if (isControlKey(event.which))
        	{
            	if(event.which == 46 || event.which == 8) //delete keys (backspace and delete): should set the trigger change flag
            		t.triggerChange = true;
                return;
        	}
            
//            if (!t._keyDownFlag && !isNumericKey(event.which) )
//            {
//                event.preventDefault();
//                event.stopPropagation();
//                return;
//            }
//            else
//            	t.triggerChange = true;
        },
        
        //used to restrict keys that generates characters in the input, not control or function keys (tests on ASCII codes)
        _onKeyPress: function(event) 
        {
        	//keypress fires on IE ONLY when printable keys are pressed
        	//fires on other browsers for any key, value of event.which >0 for printable keys (event.which = 0 non printable) value 8 is backspace
        	var isPrintableChar = (typeof event.which == "number" && event.which > 0 && event.which != 8 && !event.ctrlKey) ? true : false;
        	
        	//apply restrictions only on printable characters. (keypress not fired for non printable on IE this tests involves other browsers)
        	if(!isPrintableChar ) 
    		{
    			return;
    		}
        	var t = this, o = t.options;
        	
        	var keyPressedCode = event.keyCode? event.keyCode : event.which? event.which : null;
        	var keyPressedChar = String.fromCharCode(keyPressedCode);
        	o.format.decimalChar = typeof o.format.decimalChar !== 'string' || o.format.decimalChar.length <= 0 ? '.' : o.format.decimalChar;
        	
        	if (!asciiNumericKey(keyPressedCode) && keyPressedChar != o.format.decimalChar && keyPressedCode != 45)//not numeric and not negative sign or decimal
            {
                event.preventDefault();
                event.stopPropagation();
                return;
            }
        	 
            if (o.disabled)
                return;
            
			//********PathSolutions: preventing decimal point when format is not decimal
			//********PathSolutions: preventing negative sign when minValue is 0
            // in the Format the decimal should always be "."
			var decimalIndex = o.format.format.indexOf(".");
			if ( (decimalIndex == -1 && ( keyPressedChar == o.format.decimalChar )) //decimal point character
            		|| ( o.minValue === 0 && (keyPressedCode == 45))) //negative sign character
            {
                event.preventDefault();
                event.stopPropagation();
                return;
            }
            else //PathSolutions: in case of decimal need to restrict upon number of digits before and after dec
        	{
        		var afterDec = o.format.format.substring(decimalIndex + 1);
				var len = afterDec.length;
				var _value = event.target.value;
				var selectedHtmlElt = getSelectionParentElement();
				var selectedHtmlText = getSelectedText();
				var caretPos = returnCursorPosStart(event.target);
				var _valDecIndex = _value.indexOf(o.format.decimalChar) ;
				if(_valDecIndex > -1 && asciiNumericKey(keyPressedCode)  && (selectedHtmlElt !== event.target || selectedHtmlText == ""))
				{
					if(caretPos > _valDecIndex ) //after decimal
					{
//						if(asciiNumericKey(keyPressedCode) ) //in case value contains decimal character do the checking  
//						{
							var valAfterDec = _value.substring(_valDecIndex + 1);
							if(valAfterDec != "")
							{
								if(valAfterDec.length == len ) //do not allow to key in digits more than possible according to nbFormat
								{
									event.preventDefault();
		                			event.stopPropagation();
		                			return;
								} 
							}
//						}
					}
					else if(o.maxLenBeforeDec) //before decimal
					{
						var valBeforeDec = _value.substring(0,_valDecIndex).replace("-","").trim();
						if(valBeforeDec.length == o.maxLenBeforeDec)
						{
							event.preventDefault();
		                	event.stopPropagation();
		                	return;
						}
					}
				}
				/**
				 * [PathSolution-MarwanMaddah]: in case max length before decimal is defined 
				 * and decimal separator not entred yet
				 * we have to block any entry after this length to control the formal
				 */
				else
				{
					if(typeof selectedHtmlText=="undefined" || selectedHtmlText==null || selectedHtmlText=="" || selectedHtmlText.length==0)
					{						
		    			/**
						 * [PathSolutions-MarwanMaddah]: in case the decimalChar not exist yet in the value 
						 * the value length will be checked in case equal to langth before decimal 
						 * Then the decimalChar will be added automatically. 
						 * @param {Object} event
						 * @memberOf {TypeName} 
						 */
						 if(o.maxLenBeforeDec && decimalIndex > -1 &&  keyPressedChar != o.format.decimalChar)
						 {
							 if(event.target.value!="" && event.target.value.length == o.maxLenBeforeDec-1)
							 {
								event.target.value = event.target.value + String.fromCharCode(event.which) + o.format.decimalChar;
								event.preventDefault();
								return;
							 }
		                     else
		                     {
						       if(_value.length == o.maxLenBeforeDec)
						       {
							   /**
							    * In case the value length is equal to the max length before decimal 
							    * and the decimal separator no exists, the only entry that will be acceptable is the decimal separator (.) 
							    */
									event.preventDefault();
				                	event.stopPropagation();
				                	return;
						       }
						     }
						 }
					 }
				}
				/**
				 * end 
				 */
        	}
            //*******************************/
            switch (keyPressedCode)
            {
                case 45: // Negative Sign 
                case o.format.decimalChar.charCodeAt(0): // Decimal 
                	
                	var selectedHtmlElt = getSelectionParentElement();
					var selectedHtmlText = getSelectedText() +"";
            		if(( keyPressedChar == o.format.decimalChar && (selectedHtmlElt != event.target || selectedHtmlText.indexOf(o.format.decimalChar) < 0) && event.target.value.indexOf(o.format.decimalChar) >= 0)//prevent putting more than one decimal point
            				||
        			   ( keyPressedCode == 45 && 
        					  (
      							  returnCursorPosStart(event.target) != 0 //do not allow negative except at first character
       							  || 
       							  (selectedHtmlElt != event.target || selectedHtmlText.indexOf("-") < 0)&& event.target.value.indexOf("-") >= 0) //do not allow more than one negative sign
        				)
            		)
        			{
            			event.preventDefault();
            			event.stopPropagation();
            			return;
        			}
            		if(keyPressedChar == o.format.decimalChar)//decimal point is being pressed check for number of digits before it to see if it can be allowed
        			{
	            		var caretPos = returnCursorPosStart(event.target);
            			var _value = event.target.value
            			var lenBeforeCurrentPos = _value.substring(0,caretPos).replace("-","").trim().length;
            			var lenAfterCurrentPos = _value.substring(caretPos).length;
            			// in the Format the decimal should always be "."
            			var maxLenAfterDec = o.format.format.substring(o.format.format.indexOf(".") + 1).length;
            			if((o.maxLenBeforeDec && lenBeforeCurrentPos > o.maxLenBeforeDec) || lenAfterCurrentPos > maxLenAfterDec)
            			{
							event.preventDefault();
	                		event.stopPropagation();
	                		return;
                		}
        			}
                    t._keyDownFlag = true;
                    return;
					
            }

            if (!t._keyDownFlag && !asciiNumericKey(keyPressedCode) )//not numeric and not negative sign or decimal
            {
                event.preventDefault();
                event.stopPropagation();
                return;
            }
            else
            	t.triggerChange = true;
        },

        _onKeyUp: function(event)
        {
        	//********PathSolutions: preventing decimal point when format is not decimal on paste event
        	//********PathSolutions: preventing negative sign when minValue is 0 on paste event
			//********PathSolutions: preventing non numeric keys on paste event
        	var $obj = $((event.target != null) ? event.target : event.srcElement);
        	var t = this, o = t.options;
        	var _readOnly = $obj.attr("readonly");
        	/**
        	 * [PathSolutions-MarwanMaddah]: added the checking on readOnly attribute
        	 * because no need to enter in the checking and reformating management
        	 * and to avoid empty value on focus and blur
        	 */
            if (o.disabled || (_readOnly && _readOnly!="false"))
                return;
        	o.format.decimalChar = typeof o.format.decimalChar !== 'string' || o.format.decimalChar.length <= 0 ? '.' : o.format.decimalChar;
        	// in the Format the decimal should always be "."
        	var decimalIndex = o.format.format.indexOf(".");
        	/*if( ( (event.ctrlKey || event.which === 17)  && event.which === 86)
        			&& 
        			( 
        				(isNaN(Number(event.target.value)))
        					||
        				(decimalIndex == -1 && event.target.value.indexOf(o.format.decimalChar) > -1)
        					|| 
        				( o.minValue == 0 && event.target.value.indexOf("-") > -1) 
        			)
    		   )
    		{
	    		event.target.value = "";
            	return;
    		}
        	else */
			var tempNum = event.target.value;
			// check if not a number. might be because directly a "."/decimal separator is entered
			if(event.target.value !== o.format.decimalChar)
			{
				tempNum = unformatNumber(event.target.value);
				if(isNaN(tempNum))
				{
					tempNum = "";
				}
			}
			if(event.target.value.indexOf(o.format.decimalChar) == 0) // consider as if there was 0 before the decimal
			{
				tempNum = "0" + tempNum ; 
			}
			tempNum = tempNum.split(o.format.thousandsChar).join("");
			// replace the decimal separator with standard Decimal separator "." for correct checking on Number
			tempNum = tempNum.replace(o.format.decimalChar,".");
			if(  (event.target.value != "-" && isNaN(Number(tempNum))) //goes in here when we release key (not holding both keys at the same time )
					|| 
						(decimalIndex == -1 && event.target.value.indexOf(o.format.decimalChar) > -1)
					|| 
						( o.minValue === 0 && event.target.value.indexOf("-") > -1) 
				   )
    		{
    			event.target.value = "";
            	return;
    		}
			if(decimalIndex > 0)
			{
				var targetVal = event.target.value;
				// check if not a number. might be because directly a "."/decimal separator is entered
				if(event.target.value !== o.format.decimalChar)
				{
					targetVal = unformatNumber(event.target.value);
				}
				var len = o.format.format.substring(decimalIndex + 1).length;
				var _valDecIndex = targetVal.indexOf(o.format.decimalChar) ;
				if(_valDecIndex > 0 )
				{
					var valAfterDecLen = targetVal.substring(_valDecIndex + 1).length;
					var _valBeforeDec = targetVal.substring(0,_valDecIndex ).replace("-","");
					/**
					 *[MarwanMaddah]:added the replacement with RegExp to remove the thousandsChar before count the length
					 * and compare it with the maxLenBeforeDec
					 */
					var _thousandsChar = o.format.thousandsChar;
					if(typeof _thousandsChar!="undefined" && _thousandsChar!=null)
					{
					  var re = new RegExp(''+_thousandsChar+'', "g");
					  _valBeforeDec = _valBeforeDec.replace(re,"");
					}
					var valBeforeDecLen = _valBeforeDec.trim().length;
					if(valAfterDecLen > len || (o.maxLenBeforeDec && valBeforeDecLen > o.maxLenBeforeDec))
					{
    					event.target.value = "";
            			return;
    				}
				}
				//if no decimal point but there is o.maxLenBeforeDec then as if there is .0 so the length and check
				else if(o.maxLenBeforeDec && o.maxLenBeforeDec < targetVal.length) 
				{
					event.target.value = "";
        			return;
				}
			}
           	this._keyDownFlag = false;
        },

        _onChange: function(event)
        {
        	this.triggerChange = false;
        	var _obj =  (event.target != null) ? event.target : event.srcElement;
        	var _value = _obj.value;
            if (!this._adjustmentFlag && !this._keyDownFlag)
            {
				//PathSolutions: added this if when dependency if the returned value from dep is empty shld remain empty not 0
            	if(_value != "" && _value != null)
            	{
            		this.widget().val(this._getInputValue(_value));
        			this._setValue(this._getInputValue(_value)); //this performs test on minvalue, maxvalue control applied on key and paste events
        			if(this._value != null) //test passed min,max checking then set it as oldvalue
    				{
    					this._oldValue = _value;	
    				}
                }
            	//[Path Solutions] Added Checking on the Attribute fieldAudit in order to handle prvvalue
            	//for elements that have no dependency
            	else if(!checkAvailDependency($(_obj).attr("id")) && !checkAvailFieldAudit($(_obj).attr("id")))
            	{
	                $(_obj).attr("prevValue",_value)
	                this._oldValue = _value;//this._value;
            	}
//                this._oldValue = _value;//this._value;
            }
        },
        _onFocus: function(event)//PathSolutions, remove group separators on focus if editable
        {
        	var $obj = $((event.target != null) ? event.target : event.srcElement);
        	var _value = $obj.val();
            if(!$obj.attr("readonly") ) //remove group separator on edit
    		{
            	//PathSolutions:calling unformatNumber to be compatible with the formatter management, onFocus will replace the formatter sign by '-'
            	//PathSolutions:added the checking on the option formatter if exists.
            	if(_value.indexOf(this.options.format.thousandsChar) > -1 || (this.options.format.formatter!=null && this.options.format.formatter!=""))
            	{
            		var unformattedValue = unformatNumber(_value);
            		// after unformatting need to change the Decimal separator to correct value before putting it.
            		// if decimal separator exists
            		if(unformattedValue.indexOf(".") > -1)
            		{
            			unformattedValue = unformattedValue.replace(".", this.options.format.decimalChar);
            		}
            		this.widget().val(unformattedValue );
            	}
        	}
        },
        _onBlur: function(event)//PathSolutions, reformat to cover case when group separators are removed on focus 
        {
        	//call onkeyup controls for values copied using drag/drop not copy/paste: 
        	this._onKeyUp(event);
        	var $obj = $((event.target != null) ? event.target : event.srcElement);
        	
        	if(!$obj.attr("readonly") )
    		{
	        	var _value = $obj.val(); //(event.target != null) ? event.target.value : event.srcElement.value;
	        	if(_value.indexOf(this.options.format.thousandsChar) < 0 ) 
	    		{
		        	this.widget().val(this._format(_value) );	
	    		}
	        	//this flag is to support triggering change event when u move out the window and lose focus then back to window on ie8 only
        		if(this.triggerChange  && $.browser.msie /*&& $.browser.version <= 8*/ )
    			{
    				$obj.trigger("change");
    			}
    		}
        },

        value: function(val)
        {
            // Method called as a getter.
            if (val === undefined)
                return this._value;

            this._setValue(val);
            return this;
        },

        select: function()
        {
            if (!this.options.disabled)
                this.widget().select();

            return this;
        }
    });

    $.ui = $.ui || {};
    $.ui.numeric._current = null;
    $.ui.numeric._timerCallback = function(amount, first)
    {
        clearTimeout($.ui.numeric._current._timer);
        $.ui.numeric._current._adjustValue(amount);
        $.ui.numeric._current._timer = setTimeout('jQuery.ui.numeric._timerCallback(' + amount + ',false)', first ? 1000 : 50);
    }

    function isControlKey(keyCode)
    {
        return (keyCode <= 47 && keyCode != 32)
            || (keyCode >= 91 && keyCode <= 95)
            || (keyCode >= 112 && [188, 190, 191, 192, 219, 220, 221, 222].indexOf(keyCode) == -1)
    }

    function isNumericKey(keyCode)
    {
        // 48 - 57 are numerical key codes for key pad nubers, 96 - 105 are numerical key codes for num pad numbers.
        return (keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105);
    }

    function asciiNumericKey(keyCode)
    {
        // 48 - 57 are numerical ascii codes for numbers (used in keypress event)
        return (keyCode >= 48 && keyCode <= 57) ;
    }

    function _numVal(val)
    {
        if (typeof val !== 'number')
            val = Number(val);

        if (isNaN(val))
            return 0;

        return val;
    }
    
    function getSelectionParentElement() 
    {
	    var parentEl = null, sel;
	    if (window.getSelection)
	    { //IE9-FF
	        sel = window.getSelection();
	        if(document.activeElement)
	        	return document.activeElement;
	    } else if ( (sel = document.selection) && sel.type != "Control") { //IE8
	        parentEl = sel.createRange().parentElement();
	    }
	    return parentEl;
	}
    
    
	
    var REGEX_ESCAPE = new RegExp('(\\' + ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'].join('|\\') + ')', 'g');
    function regExEscape(val)
    {
        return val.replace(REGEX_ESCAPE, '\\$1');
    }  
 

/**
 * Get decimal place precision for the scientific notation number.
	 e.g. 1.23e-7 yields 7+2 places after the decimal point
	 e.g. 4.5678e-11 yields 11+4 places after the decimal point
 * @param {Object} scinum
 * @return {TypeName} 
 */
function getPrecision(scinum) {
  var arr = new Array();
  // Get the exponent after 'e', make it absolute.  
  arr = scinum.split('e');
  var exponent = Math.abs(arr[1]);

  // Add to it the number of digits between the '.' and the 'e'
  // to give our required precision.
  var precision = new Number(exponent);
  arr = arr[0].split('.');
  precision += arr[1].length;

  return precision;
}


    /**
    * Formats a number according to a specified format string.
    *
    * Available options:
    * - format        : The format string to format the number with. The number will be rounded to the number of digits specified.
    *                   0 = A significant digit (always included).
    *                   # = Digit will be used if applicable.
    *                   . = Characters to the right of this will be interpreted as decimal places.
    *                   , = Must occur to the left of the decimal (if there is one). If included, indicates the thousands separator will be included every 3 digits on the left of the decimal.
    * - decimalChar   : The decimal character to use when formatting the number. Defaults to '.'.
    * - thousandsChar : The thousands separator character to use when formatting the number. Defaults to ','.
    *
    * Examples:
    *
    * Given the number "1000.0562":
    * --------------------
    * format  | result
    * --------------------
    *       0 | 1000
    *     0.0 | 1000.1
    * #,000.0 | 1,000.1
    *    0.## | 1000.06
    * #,0.00# | 1,000.056
    * 0.00### | 1000.0562
    * 0.00000 | 1000.05620
    **/
    //PathSolutions: Change the name since we are using for separate formatting the formatNumber from the file jquery.formatter.js
    $.formatNumberNumeric = function(num, options)
    {
    	if(num === null)
    		return "";
    	//PathSolutions: added scientific notation conversion to normal numbers
    	var temp = num+"";
		if (temp.match(/^[-+]?[1-9]\.[0-9]+e[-]?[1-9][0-9]*$/)
				|| temp.match(/^[-+]?[1-9]e[-]?[1-9][0-9]*$/) ) //match a scientific notation
		{
  			num = (+temp).toFixed(getPrecision(temp)); //(+temp) converts temp to a Number object, .toFixed returns number without scientific notation eg: 1.23e-7 --> 0.000000123
  		}
    	
    	//in case value was already formatted unformatting to have the value as is before applying format
    	num = unformatNumber(num);
    	//PathSolutions: added the IF to support empty value to remain empty and not be replaced by 0
    	if(num === "" )
    		return "";
    	
//        num = _numVal(num);

        if (typeof options === 'string')
            options = { format: options };
        
        // try to get the global decimal and group separator, located in CommonFunc.js
        var glblDecSep = ".";
        var glblGrpSep = ",";
        try
        {
        	// define correct number format
    		 glblDecSep = returnDecSep();
    		 glblGrpSep = returnGrpSep();
        }
        catch(e)
        {
        	
        }

        options = $.extend({format: null, decimalChar: glblDecSep, thousandsChar: glblGrpSep, leadZeros: '', zeroNotAllowed: false ,applyRounding : false}, options);
        // No need to continue if no format string is specified.
        if (typeof options.format !== 'string' || options.format.length <= 0)
            return num.toString();

        // Check for zerorNotAllowed if true and value is 0 return empty
        if(Number(num) == 0 && options.zeroNotAllowed === true)
        {
        	return '';
        }
        	
        // Default to '.' as the decimal character.
        options.decimalChar = typeof options.decimalChar !== 'string' || options.decimalChar.length <= 0 ? '.' : options.decimalChar;

        // Default to ',' as the thousands separator.
        options.thousandsChar = typeof options.thousandsChar !== 'string' ? ',' : options.thousandsChar;

        if (options.decimalChar.length > 1)
            throw 'NumberFormatException: Can not have multiple characters as the decimal character.';

        if (options.thousandsChar.length > 1)
            throw 'NumberFormatException: Can not have multiple characters as the thousands separator.';

        // in the Format the decimal seperator is always "."
        var v_dec_index = options.format.indexOf(".");
        if (v_dec_index >= 0 && options.format.indexOf(".", v_dec_index + 1) >= 0)
            throw 'NumberFormatException: Format string has multiple decimal characters.';

        // Convert the current numeric value to a string, removing the negative sign if the number is negative.
        var v_num_as_string = num.toString().replace(/-/g, ''),

        // Strip out all of the characters that are not formatting characters. Regonized formatting characters are: '0', '#', and the decimal character.
        // in the Format the decimal is always "."
        v_clean_format = options.format.replace(new RegExp('[^0#' + regExEscape(".") + ']', 'g'), ''),

        // Split the numerical value into it's int and decimal parts.
        // number to format should always have standard decimal separator "."
        v_num_parts = v_num_as_string.indexOf(".") < 0 ? [v_num_as_string, ''] : v_num_as_string.split("."),

        // Split the format string into it's respective integer and decimal parts.
        v_format_parts = v_dec_index < 0 ? [v_clean_format, ''] : v_clean_format.split(".");

        // If the int part is zero, then we may not need to have any int part depending on the format string.
        //PathSolutions: added v_dec_index > 0 to do this behavior only when int value is 0 and there is decimal value otherwise int 0 shld remain = 0 
        if (parseInt(v_num_parts) === 0 && v_dec_index > 0)
            v_num_parts[0] = v_format_parts[0].indexOf('0') >= 0 ? '0' : '';
        // Otherwise no processing is needed, we already have our int part.

        /***************************************************/
            //check for leadZeros
            var leadZeros = options.leadZeros ;
            if(typeof leadZeros != "undefined" && leadZeros != '')
        	{
            	var len = leadZeros - v_num_parts[0].length ;
        		if(v_num_parts[0].length < leadZeros)
    			{
    				 for(var i=0; i< len;i++)
					 {
						v_num_parts[0] = "0" + v_num_parts[0]; 
					 }
    			}
        	}
        /***************************************************/   
        // in Format the thousands group seperator is always ","
        if (options.format.indexOf(",") >= 0 && v_num_parts[0].length > 3)
        {
            // If we need to include the thousands separator, then we can break the int part into chunks of three characters each (the first chunk does not need
            // to be 3 characters), then join them together separated by the thousands separator.
            var v_int_thousands_array = [],
            j = v_num_parts[0].length,
            m = Math.floor(j / 3),
            n = v_num_parts[0].length % 3 || 3; // If n is zero, an infinite loop will occur, so we have to make sure it is not zero.

            for (var i = 0; i < j; i += n)
            {
                if (i != 0)
                    n = 3;

                v_int_thousands_array[v_int_thousands_array.length] = v_num_parts[0].substr(i, n);
                m -= 1;
            }

            v_num_parts[0] = v_int_thousands_array.join(options.thousandsChar);
        }

        // Do we have a decimal part to format?
        if (v_format_parts[1].length > 0)
        {
            if (v_num_parts[1].length > 0)
            {
            	//PathSolutions: check if rounding needs to be applied
				if(typeof options.applyRounding != "undefined" && options.applyRounding  )
				{
					var retArr = v_num_as_string.split(".");
					var newnumber;
					if(retArr[0].length >= 10 || (retArr.length > 1 && retArr[1].length >= 7))
					{
						newnumber = new BigNumber(v_num_as_string,v_format_parts[1].length).round();
					}
					else
					{
	            		newnumber = Number(v_num_as_string)
	            		//round only when after decimal of value is longer than format after decimal
            			if(v_num_parts[1].length > v_format_parts[1].length)
        					newnumber = (parseFloat(newnumber.toFixed(v_format_parts[1].length))) +""; //rounding
					}
            		if((newnumber+"").indexOf(".") >0 )
	        			 v_num_parts[1] =  (newnumber+"").split(".")[1] ;
            		else//rounded without decimal like for example 10.99 is rounded to 11
        			{
            			v_num_parts[0] = newnumber;
  				      	v_num_parts[1] = "" ;  
        			}
//        			 v_num_parts[1] =  ((newnumber+"").indexOf(".") >0 ) ?  (newnumber+"").split(".")[1] : newnumber+""; 
//        			 while(v_format_parts[1].length > v_num_parts[1].length ) //add zeros in case no rounding was done to fill remaining zeros when needed
//    				 {
//    				 	v_num_parts[1] += "0";
//    				 }
        		}
//            	else
//            	{
            	
	                // Get character arrays of the decimal format string and decimal part of the numerical value.
	                var v_format_array = v_format_parts[1].split(''), v_dec_part_array = v_num_parts[1].split('');
	
	                // Compile the final formatted decimal part. If there are any # symbols left, we can simply remove them.
	                for (var i = 0; i < v_dec_part_array.length; i++)
	                {
	                    if (i >= v_format_array.length)
	                        break;
	
	                    v_format_array[i] = v_dec_part_array[i];
	                }
	
	                v_num_parts[1] = v_format_array.join('').replace(/#/g, '');
//                }
            }
            // Else if there is no decimal part of the actual number, but the format string specified says to include decimals, then we need to
            // make sure that the number of decimal places specified are included.
            else
            {
                var v_index = 0;
                v_num_parts[1] = '';
                while (v_format_parts[1].charAt(v_index) === '0')
                {
                    v_num_parts[1] += '0';
                    v_index++;
                }
            }
        }
        else
            v_num_parts[1] = ''; // There is no decimal part specified in the format string.

        // Compile the full formatted numerical string.
        var v_retval = (v_num_parts[1].length <= 0) ? v_num_parts[0] : v_num_parts[0] + options.decimalChar + v_num_parts[1];

        // If the number is negative, then add the negative sign.
        if (num.toString().indexOf("-") > -1)
            v_retval = '-' + v_retval;

        // Replace the number portion of the format string with the compiled result
        // in the Format the group seperator is always "," and decimal is always "."
        var result  = options.format.replace(new RegExp('[0|#|' + regExEscape(",") + '|' + regExEscape(".") + ']+'), v_retval); 
        
        //[pathsolutions]:call the formatter function  in case it is defined 
        if(options.formatter!=null && options.formatter!="")
        {
            result = eval( options.formatter + "(result)" );
        }
        return result
        
    }

})(jQuery);