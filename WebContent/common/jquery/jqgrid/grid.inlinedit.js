;(function($){
/**
 * jqGrid extension for manipulating Grid Data
 * Tony Tomov tony@trirand.com
 * http://trirand.com/blog/ 
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
**/ 
//jsHint options
/*global alert, $, jQuery */
"use strict";
$.jgrid.inlineEdit = $.jgrid.inlineEdit || {};
$.jgrid.extend({
//Editing
	editRow : function(rowid,keys,oneditfunc,successfunc, url, extraparam, aftersavefunc,errorfunc, afterrestorefunc) {
		// Compatible mode old versions
		var o={}, args = $.makeArray(arguments).slice(1);

		if( $.jgrid.realType(args[0]) === "Object" ) {
			o = args[0];
		} else {
			if (typeof keys !== "undefined") { o.keys = keys; }
			if ($.isFunction(oneditfunc)) { o.oneditfunc = oneditfunc; }
			if ($.isFunction(successfunc)) { o.successfunc = successfunc; }
			if (typeof url !== "undefined") { o.url = url; }
			if (typeof extraparam !== "undefined") { o.extraparam = extraparam; }
			if ($.isFunction(aftersavefunc)) { o.aftersavefunc = aftersavefunc; }
			if ($.isFunction(errorfunc)) { o.errorfunc = errorfunc; }
			if ($.isFunction(afterrestorefunc)) { o.afterrestorefunc = afterrestorefunc; }
			// last two not as param, but as object (sorry)
			//if (typeof restoreAfterError !== "undefined") { o.restoreAfterError = restoreAfterError; }
			//if (typeof mtype !== "undefined") { o.mtype = mtype || "POST"; }			
		}
		o = $.extend(true, {
			keys : false,
			oneditfunc: null,
			successfunc: null,
			url: null,
			extraparam: {},
			aftersavefunc: null,
			errorfunc: null,
			afterrestorefunc: null,
			restoreAfterError: true,
			mtype: "POST"
		}, $.jgrid.inlineEdit, o );

		// End compatible
		return this.each(function(){
			var $t = this, nm, tmp, editable, cnt=0, focus=null, svr={}, ind,cm;
			if (!$t.grid ) { return; }
			ind = $($t).jqGrid("getInd",rowid,true);
			var $ind = $(ind);
			if( ind === false ) {return;}
			editable = $ind.attr("editable") || "0";
			//**********PATHSolutions Addition ****************/
			//getting grid id to be used in the common function of dialog columns
			var gridId = $t.p.id;
			//**********END PATHSolutions******************/
			if (editable == "0" && !$ind.hasClass("not-editable-row")) {
				cm = $t.p.colModel;
				$('td[role="gridcell"]',ind).each( function(i) {
					
					//PathSolution: added if grid has not-editable-cell meaning we want it to be readonly, no need to construct any input
					if($(this).hasClass("not-editable-cell") == false || $(this).hasClass("not-editable-cell") == "false")
					{
					nm = cm[i].name;
					var treeg = $t.p.treeGrid===true && nm == $t.p.ExpandColumn;
					
					//******************PATHSolutions Dependency params ******************* 
					var dependency = cm[i].dependency; 
					var dependencySrc = cm[i].dependencySrc; 
					var params = cm[i].params; 
					var afterDepEvent = cm[i].afterDepEvent;
					var fieldAudit = cm[i].fieldAudit;
					//******************End PATHSolutions *******************
					
					//******************PATHSolutions Combo param******************* 
					var loadOnce= cm[i].loadOnce;
					//******************End PATHSolutions *******************

					if(treeg) { tmp = $("span:first",this).html();}
					else {
						try {
							tmp =  $.unformat(this,{rowId:rowid, colModel:cm[i]},i);
						} catch (_) {
							tmp =  ( cm[i].edittype && cm[i].edittype == 'textarea' ) ? $(this).text() : $(this).html();
						}
					}
					if ( nm != 'cb' && nm != 'subgrid' && nm != 'rn') {
						if($t.p.autoencode) { tmp = $.jgrid.htmlDecode(tmp); }
						svr[nm]=tmp;
						if(cm[i].editable===true) {
							if(focus===null) { focus = i; }
							if (treeg) { $("span:first",this).html(""); }
							else { $(this).html(""); }
							
							//*************** PATHSolutions Addition ********** 
							//set the grid column to loadOnce for data retrieval for the columns of type "select"
							if(typeof(cm[i].loadOnce)!=="undefined" && cm[i].loadOnce== false  )
								{ cm[i].loadOnce = false; }
							else
								{ cm[i].loadOnce = true; }
							//***************************************************************
							var opt = $.extend({},{colModel:cm[i]},cm[i].editoptions || {},{id:rowid+"_"+nm,name:nm},{loadOnce:cm[i].loadOnce} ); //adding loadOnce for data retrieval for the columns of type "select"
							if(!cm[i].edittype) { cm[i].edittype = "text"; }
							if(tmp == "&nbsp;" || tmp == "&#160;" || (tmp.length==1 && tmp.charCodeAt(0)==160) ) {tmp='';}
							//*************** PATHSolutions Addition ********** 
							//set the grid id to be used in custom edit type and is sent to the custom_element function
							$.jgrid.id = gridId
							//*****************END PATHSolutions *********************
							
							var elc = $.jgrid.createEl(cm[i].edittype,opt,tmp,true,$.extend({},$.jgrid.ajaxOptions,$t.p.ajaxSelectOptions || {}));
							var $elc = $(elc);
							/**
							 * [pathSolution-MarwanMaddah] : remove title in case of editable cell
							 * to avoid empty tooltip
							 * @param {Object} e
							 */
							$elc.removeAttr("title")
							$elc.addClass("editable");
							if(treeg) { $("span:first",this).append(elc); }
							else { $(this).append(elc); }
							//Again IE
							if(cm[i].edittype == "select" && typeof(cm[i].editoptions)!=="undefined" && cm[i].editoptions.multiple===true  && typeof(cm[i].editoptions.dataUrl)==="undefined" && $.browser.msie) {
								$elc.width($elc.width());
							}
							cnt++;
							
							if(cm[i].edittype == "custom")
							{
//								if($.browser.msie )//livesearch and datepicker
//								{
								 	//get the first input in the custom column
									if($elc.find("input").length > 0)
									{
										elc = $elc.find("input")[0]; 
										$elc = $(elc)
									}
//								}
								if($elc.attr("mode") === "number")//livesearch with mode number
								{
									applyFormat(elc.id);
								}
							}
							
							if(typeof cm[i].editrules != "undefined" && cm[i].editrules.required === true)
							{
								$elc.attr("required","true");
							}
							
							//***** PATHSolutions customization add dependency *****/
							$elc.attr("prevValue",$elc.val()); //have the prevValue even when no dependency is available, to be used in customized onchange events
							
							if(typeof fieldAudit != "undefined" && fieldAudit == true)
							{
								$elc.bind("change", function(e)
								{
									callAuditOnField(e.currentTarget.id);
								});
							}
							if(typeof dependency != "undefined" && typeof dependencySrc != "undefined" 
								&& dependency != "" && dependencySrc != "")
							{
									//set the attributes on the input to be used later on enter of row to call dependency 
									$elc.attr("dependency",dependency);
									$elc.attr("dependencySrc",dependencySrc);
									if(typeof params != "undefined")
										$elc.attr("params",params);
									if(typeof afterDepEvent != "undefined")
										$elc.attr("afterDepEvent",afterDepEvent);
									
									$elc.bind("_event.dependency", function(e)
									{
//										if( $ind.attr("added") != "1" && $ind.attr("changed") != "1")
//										{
//											//setting changed attribute
//											$ind.attr("changed","1");
//										}
										//setting changed attribute inside callGridDep
										callGridDependency(gridId, cm[i].dependency, cm[i].dependencySrc,cm[i].params,rowid ,cm[i].afterDepEvent,cm[i].name,e.target);
									})
									
									$elc.bind("change", function(e)
									{
										 //when this flag is set to false from clicking enter, change event gets fired 
										if(!$.data(this,"toCallDepChange") && $.data(this,"toCallDepChangeFromEnter") === true)
										{
											$.removeData(this,"toCallDepChangeFromEnter");
											return;
										}
										
										var _callDep = true;
										if(typeof cm[i].beforeDepEvent != "undefined" && cm[i].beforeDepEvent != "")
										{
											_callDep = eval(cm[i].beforeDepEvent);
										}
										
										//rebind dependencies because sometimes in beforeDepEvent they change the dependency definition  
										$elc.attr("dependency",cm[i].dependency);
										$elc.attr("dependencySrc",cm[i].dependencySrc);
										if(typeof params != "undefined")
											$elc.attr("params",cm[i].params);
										if(typeof afterDepEvent != "undefined")
											$elc.attr("afterDepEvent",cm[i].afterDepEvent);
										
										//call the dependency event
									 	if(typeof _callDep == "undefined" || _callDep+"" != "false" )
									 		{
												$elc.trigger("_event.dependency");
									 		}
									 	
									 	//check in case beforedep returned false and the dependency shld not fire if we still need to set as changed
//									 	else
//									 	{
//									 		//if case no dependecny was called set the status of row here
//											if( $ind.attr("added") != "1" && $ind.attr("changed") != "1")
//											{
//												$ind.attr("changed","1");
//											}
//									 	}
									}
								)
							}
							else if( $ind.attr("added") != "1" && $ind.attr("changed") != "1")//case no dependency, set changed flag 
							{
								$elc.bind("change", function(e)
								{
									$ind.attr("changed","1");
								})
								
							}
							
							//****************************
						}
					}
					}
				});
				if(cnt > 0) {
					svr.id = rowid; $t.p.savedRow.push(svr);
					$ind.attr("editable","1");
					//Pathsolutions: added test on property to disable automatic focus on first editable column
					if(!$t.p.disableEditableFocus)
						{
							if(cm[focus].colType == "number")
							{
								//for number columns add attribute to apply focus from numeric widget not from here (issue focus was being lost)
								$("td:eq("+focus+") input",ind).attr("applyFocus","true");
							}
							else
								$("td:eq("+focus+") input",ind).focus();
						}
				//	if(o.keys===true) {
						$ind.bind("keydown",function(e) {
							var ta = e.target;
							var $ta = $(ta);
							if (e.keyCode === 27) {
								$($t).jqGrid("restoreRow",rowid, afterrestorefunc);
								return false;
							}
							//PathSolutions: on Enter key should call dependency or dataevent change if toCallDepChange was set to true
							if (e.keyCode === 13) {
								if(ta.tagName == 'TEXTAREA') { return true; }
								//******************* PathSolutions Customization*******************
								var cellIndex = $ta.closest("td[role='gridcell']").prop("cellIndex");
								var dependency = $ta.attr("dependency"); 
								var dependencySrc = $ta.attr("dependencySrc"); 
								var params = $ta.attr("params"); 
								var afterDepEvent = $ta.attr("afterDepEvent");
								
								if(typeof cm[cellIndex].editoptions != "undefined" && typeof cm[cellIndex].editoptions.dataEvents != "undefined"
									&& $.data(ta,"toCallDepChange") == true)
								{
									var theFunc;
									if(cm[cellIndex].editoptions != "")
									{
										$.each(cm[cellIndex].editoptions.dataEvents , function() 
										{
											if(this.type == "change")
											{
												$.data(ta,"toCallDepChange",false);
												$.data(ta,"toCallDepChangeFromEnter",true);
												if( $ind.attr("added") != "1" && $ind.attr("changed") != "1")
												{
													//setting changed attribute
													$ind.attr("changed","1");
												}
												theFunc = this.fn;
												return;
											}
										});
											
										if($.isFunction(theFunc))
											theFunc.call();
									}
								}
								
								if(typeof dependency != "undefined" && dependency != ""
									 && typeof dependencySrc != "undefined" && dependencySrc != "" 
										 && $.data(ta,"toCallDepChange") == true)
								{
									$.data(ta,"toCallDepChange",false);
									$.data(ta,"toCallDepChangeFromEnter",true);
									var _callDep = true;
									if(typeof cm[cellIndex].beforeDepEvent != "undefined" && cm[cellIndex].beforeDepEvent != "")
									{
										_callDep = eval(cm[cellIndex].beforeDepEvent);
									}
									if(typeof _callDep == "undefined" || _callDep+"" != "false" )
										$ta.trigger("_event.dependency");
									//saveRow and setting of changed attribute is done in the callgriddependency 
								}
								else 
								{	if(o.keys)
									{
										$($t).jqGrid("saveRow", rowid, o );
									}
									else 
									{
										if($.data(ta,"toCallDepChange") == true)
										{											
											$.data(ta,"toCallDepChange",false);
											$.data(ta,"toCallDepChangeFromEnter",true);
											/**
											 * [PathSolutions - MarwanMaddah]: set changeTrack as true in case of enter key click
											 */
											var _parentForm = $($t).closest("form");
											if(_parentForm.length > 0)
											{						        	
												var _theForm = _parentForm.get(0);
												if(typeof _theForm != "undefined" && _theForm != null)
												{
													/**
													 * indicator to catch the updated cell and include it on grid Updated list
													 */
													if( $ind.attr("added") != "1" && $ind.attr("changed") != "1")
													{												
														$ind.attr("changed","1");
													}	
													//check whether the row is inside exculded div (in this case we will not apply the change track)
													var hp = hasParentById($($t) ,$(_theForm).attr("excltrk"))
													if(hp==false)
													{
														detectChanges(_theForm);
													}
												}
											}
											
											//the below moved to the callgriddep function in case of dependency and before calling the dataEvent change in case of dataEvent
	//										if( $(this).attr("added") != "1" && $(this).attr("changed") != "1")
	//										{
	//										//setting changed attribute
	//										$(this).attr("changed","1");
	//										}
										}
										if(o.aftersavefunc != null)
											$($t).jqGrid("saveRow",rowid,false, 'clientArray',null,o.aftersavefunc);
										else
										{
											$($t).jqGrid('saveRow',rowid,false, 'clientArray');
										}
									}
								}

								return false;
								//*******************END PathSolutions Customization*******************		
							}
							else if(e.keyCode != 9) //PathSolutions: not tab key
							{
								$.data(ta,"toCallDepChange",true);
							}							
						});
						
				//	}
					if( $.isFunction(o.oneditfunc)) { o.oneditfunc.call($t, rowid); }
				}
			}
		});
	},
	saveRow : function(rowid, successfunc, url, extraparam, aftersavefunc,errorfunc, afterrestorefunc) {
		// Compatible mode old versions
		var args = $.makeArray(arguments).slice(1), o = {};

		if( $.jgrid.realType(args[0]) === "Object" ) {
			o = args[0];
		} else {
			if ($.isFunction(successfunc)) { o.successfunc = successfunc; }
			if (typeof url !== "undefined") { o.url = url; }
			if (typeof extraparam !== "undefined") { o.extraparam = extraparam; }
			if ($.isFunction(aftersavefunc)) { o.aftersavefunc = aftersavefunc; }
			if ($.isFunction(errorfunc)) { o.errorfunc = errorfunc; }
			if ($.isFunction(afterrestorefunc)) { o.afterrestorefunc = afterrestorefunc; }
		}
		o = $.extend(true, {
			successfunc: null,
			url: null,
			extraparam: {},
			aftersavefunc: null,
			errorfunc: null,
			afterrestorefunc: null,
			restoreAfterError: true,
			mtype: "POST"
		}, $.jgrid.inlineEdit, o );
		// End compatible

		var success = false;
		var $t = this[0], nm, tmp={}, tmp2={}, tmp3= {}, editable, fr, cv, ind;
		if (!$t.grid ) { return success; }
		ind = $($t).jqGrid("getInd",rowid,true);
		if(ind === false) {return success;}
		editable = $(ind).attr("editable");
		o.url = o.url ? o.url : $t.p.editurl;
		if (editable==="1") {
			var cm;
			$('td[role="gridcell"]',ind).each(function(i) {
				cm = $t.p.colModel[i];
				nm = cm.name;
				if ( nm != 'cb' && nm != 'subgrid' && cm.editable===true && nm != 'rn' && !$(this).hasClass('not-editable-cell')) {
					switch (cm.edittype) {
						case "checkbox":
							var cbv = ["Yes","No"];
							if(cm.editoptions ) {
								cbv = cm.editoptions.value.split(":");
							}
							tmp[nm]=  $("input",this).is(":checked") ? cbv[0] : cbv[1]; 
							break;
						case 'text':
						case 'password':
						case 'textarea':
						case "button" :
							tmp[nm]=$("input, textarea",this).val();
							var isRequired =$("input, textarea",this).attr("required");
							if(isRequired !==null && typeof isRequired != "undefined")
							{
								$(this).attr("required",isRequired )//setting required on td to check it later in case required mgmt was by row not by column
							}
							else
							{
								$(this).removeAttr("required");
							}
							if(cm.colType == "number") //unformat
							{
								tmp[nm]= unformatNumber(tmp[nm]);
							}
							break;
						case 'select':
							if(!cm.editoptions.multiple) {
								if(typeof cm.loadOnce != "undefined" && cm.loadOnce == "true")
								{
									tmp["combos"] = cm.combos ;
								}
								tmp[nm] = $("select option:selected",this).val();
								tmp2[nm+"_select"] = $("select option:selected", this).text(); //paty added _select
							} else {
								var sel = $("select",this), selectedText = [];
								tmp[nm] = $(sel).val();
								if(tmp[nm]) { tmp[nm]= tmp[nm].join(","); } else { tmp[nm] =""; }
								$("select option:selected",this).each(
									function(i,selected){
										selectedText[i] = $(selected).text();
									}
								);
								tmp2[nm] = selectedText.join(",");
							}
							/*if(cm.formatter && cm.formatter == 'select') { tmp2={}; } */
							break;
						case 'custom' :
							try {
								//******************* PathSolutions Customization*******************
								var valToSend =$(".customelement",this).val();
								if(cm.colType == "liveSearch")
								{	
									var $elem = $(document.getElementById(rowid+"_"+nm+"_lookuptxt"+"_"+$t.p.id));
									if($elem.length <= 0)
									{
										/* PathSolutions: #701072 in case the cell is set to editable by applying for example the .jqGrid("setCellValue", "1", "fastrxitemvo.UNIT_COST", "1000", false); (the false is to indicate that the readonly=false) 
										 * and if the cell is a <td> that doesn't contains any input, the valToSend will be undefined and the cm.editoptions.custom_value.call() will throw an error "undefined Unit Cost: Please, enter valid number" 
										 * to fix the message, we will get the value from the td*/
										var $thisElem = $(this);
										if( $thisElem.is('td') && $thisElem.children().length == 0 
											&& $thisElem.text() != undefined && $thisElem.text() != null )
										{
											valToSend = $thisElem.text();
										}
									}
									else
									{	
										valToSend = $elem.val();
									}
								}
								else if(cm.colType == "dialog" && $(document.getElementById("inpt"+rowid+"_"+nm)).is("input"))
								{
									var $elem = $(document.getElementById("inpt"+rowid+"_"+nm));
									if($elem.length <= 0)
									{
										/* PathSolutions: #701072 in case the cell is set to editable by applying for example the .jqGrid("setCellValue", "1", "fastrxitemvo.UNIT_COST", "1000", false); (the false is to indicate that the readonly=false) 
										 * and if the cell is a <td> that doesn't contains any input, the valToSend will be undefined and the cm.editoptions.custom_value.call() will throw an error "undefined Unit Cost: Please, enter valid number" 
										 * to fix the message, we will get the value from the td*/
										var $thisElem = $(this);
										if( $thisElem.is('td') && $thisElem.children().length == 0 
											&& $thisElem.text() != undefined && $thisElem.text() != null )
										{
											valToSend = $thisElem.text();
										}
									}
									else
									{
										valToSend = $elem.val();
									}
									
								}
								
								//*******************END PathSolutions Customization****************
								if(cm.editoptions && $.isFunction(cm.editoptions.custom_value)) {
									tmp[nm] = cm.editoptions.custom_value.call($t, $(".customelement",this),'get',valToSend );
									if (tmp[nm] === undefined) { throw "e2"; }
								} else { throw "e1"; }
							} catch (e) {
								if (e=="e1") { $.jgrid.info_dialog($.jgrid.errors.errcap,"function 'custom_value' "+$.jgrid.edit.msg.nodefined,$.jgrid.edit.bClose); }
								if (e=="e2") { $.jgrid.info_dialog($.jgrid.errors.errcap,"function 'custom_value' "+$.jgrid.edit.msg.novalue,$.jgrid.edit.bClose); }
								else { $.jgrid.info_dialog($.jgrid.errors.errcap,e.message,$.jgrid.edit.bClose); }
							}
							break;
					}
					
					/* PathSolutions: #701072 in case the cell is set to editable by applying for example the .jqGrid("setCellValue", "1", "fastrxitemvo.UNIT_COST", "1000", false); (the false is to indicate that the readonly=false) 
					 * and if the cell is a <td> that doesn't contains any input, the tmp[nm] will be undefined and the checkValues() will throw an error "undefined Unit cost please enter valid number" 
					 * to fix the message, we will get the value from the td and unformat it when it is a number */
					var $thisElem = $(this);
					if( cm.edittype == undefined && tmp[nm] == undefined 
						&& $thisElem.is('td') && $thisElem.children().length == 0 
						&& $thisElem.text() != undefined && $thisElem.text() != null )
					{
						tmp[nm] = $thisElem.text();
						if(cm.colType == "number") //unformat
						{
							tmp[nm]= unformatNumber(tmp[nm]);
						}
					}
					
					cv = $.jgrid.checkValues(tmp[nm],i,$t);
					if(cv[0] === false) {
						cv[1] = tmp[nm] + " " + cv[1];
						return false;
					}
					if($t.p.autoencode) { tmp[nm] = $.jgrid.htmlEncode(tmp[nm]); }
					if(o.url !== 'clientArray' && cm.editoptions && cm.editoptions.NullIfEmpty === true) {
						if(tmp[nm] === "") {
							tmp3[nm] = 'null';
						}
					}
				}
			});
			if (cv[0] === false){
				try {
					var positions = $.jgrid.findPos($("#"+$.jgrid.jqID(rowid), $t.grid.bDiv)[0]);
					//PathSolutions change left position to a viewable position on screen since left pos might not be visible in case of scroll
					var leftPos = ($(window).width() - 290) / 2; //290 is width of info_dialog of grid specified in the file grid.common.js
					var infoDlgOpts = {left:leftPos,top:positions[1]};
					//PathSolutions: changing zindex in case grid opened in popup, issue was that info dialog of grid was showing behind the modal dialog 
					if($($t).parents("*[role=dialog]").filter(':first').html() != null )
					{
						var zIndex = $($t).parents("*[role=dialog]").filter(':first').css("z-index"); //finding parent dialog in case exists
						infoDlgOpts["zIndex"] = (parseInt(zIndex,10)+1) ; 
					}
					$.jgrid.info_dialog($.jgrid.errors.errcap,cv[1],$.jgrid.edit.bClose,infoDlgOpts);
				} catch (e) {
					alert(cv[1]);
				}
				return success;
			}
			var idname, opers, oper;
			opers = $t.p.prmNames;
			oper = opers.oper;
			idname = opers.id;
			if(tmp) {
				tmp[oper] = opers.editoper;
				tmp[idname] = rowid;
				if(typeof($t.p.inlineData) == 'undefined') { $t.p.inlineData ={}; }
				tmp = $.extend({},tmp,$t.p.inlineData,o.extraparam);
			}
			if (o.url == 'clientArray') {
				tmp = $.extend({},tmp, tmp2);
				if($t.p.autoencode) {
					$.each(tmp,function(n,v){
						tmp[n] = $.jgrid.htmlDecode(v);
					});
				}
				var resp = $($t).jqGrid("setRowData",rowid,tmp);
				$(ind).attr("editable","0");
				//**************PATHSolutions customization:*********************
				//add attribute that specifies the row is changed
				//if the attribute added is already mentioned then it is a new ROW
//				if( $(ind).attr("added") != "1")
//				{
//					$(ind).attr("changed","1");
//				}
				//******************************************************
				for( var k=0;k<$t.p.savedRow.length;k++) {
					if( $t.p.savedRow[k].id == rowid) {fr = k; break;}
				}
				if(fr >= 0) { $t.p.savedRow.splice(fr,1); }
				if( $.isFunction(o.aftersavefunc) ) { o.aftersavefunc.call($t, rowid,resp); }
				success = true;
				$(ind).unbind("keydown");
			} else {
				$("#lui_"+$t.p.id).show();
				tmp3 = $.extend({},tmp,tmp3);
				tmp3[idname] = $.jgrid.stripPref($t.p.idPrefix, tmp3[idname]);
				$.ajax($.extend({
					url:o.url,
					data: $.isFunction($t.p.serializeRowData) ? $t.p.serializeRowData.call($t, tmp3) : tmp3,
					type: o.mtype,
					async : false, //?!?
					complete: function(res,stat){
						$("#lui_"+$t.p.id).hide();
						if (stat === "success"){
							var ret = true, sucret;
							if( $.isFunction(o.successfunc)) { 
								sucret = o.successfunc.call($t, res);
								if($.isArray(sucret)) {
									// expect array - status, data, rowid
									ret = sucret[0];
									tmp = sucret[1] ? sucret[1] : tmp;
								} else {
									ret = sucret;
								}
							}
							if (ret===true) {
								if($t.p.autoencode) {
									$.each(tmp,function(n,v){
										tmp[n] = $.jgrid.htmlDecode(v);
									});
								}
								tmp = $.extend({},tmp, tmp2);
								$($t).jqGrid("setRowData",rowid,tmp);
								$(ind).attr("editable","0");
								for( var k=0;k<$t.p.savedRow.length;k++) {
									if( $t.p.savedRow[k].id == rowid) {fr = k; break;}
								}
								if(fr >= 0) { $t.p.savedRow.splice(fr,1); }
								if( $.isFunction(o.aftersavefunc) ) { o.aftersavefunc.call($t, rowid,res); }
								success = true;
								$(ind).unbind("keydown");
							} else {
								if($.isFunction(o.errorfunc) ) {
									o.errorfunc.call($t, rowid, res, stat);
								}
								if(o.restoreAfterError === true) {
									$($t).jqGrid("restoreRow",rowid, o.afterrestorefunc);
								}
							}
						}
					},
					error:function(res,stat){
						$("#lui_"+$t.p.id).hide();
						if($.isFunction(o.errorfunc) ) {
							o.errorfunc.call($t, rowid, res, stat);
						} else {
							try {
								$.jgrid.info_dialog($.jgrid.errors.errcap,'<div class="ui-state-error">'+ res.responseText +'</div>', $.jgrid.edit.bClose,{buttonalign:'right'});
							} catch(e) {
								alert(res.responseText);
							}
						}
						if(o.restoreAfterError === true) {
							$($t).jqGrid("restoreRow",rowid, o.afterrestorefunc);
						}
					}
				}, $.jgrid.ajaxOptions, $t.p.ajaxRowOptions || {}));
			}
		}
		return success;
	},
	restoreRow : function(rowid, afterrestorefunc) {
		// Compatible mode old versions
		var args = $.makeArray(arguments).slice(1), o={};

		if( $.jgrid.realType(args[0]) === "Object" ) {
			o = args[0];
		} else {
			if ($.isFunction(afterrestorefunc)) { o.afterrestorefunc = afterrestorefunc; }
		}
		o = $.extend(true, $.jgrid.inlineEdit, o );

		// End compatible

		return this.each(function(){
			var $t= this, fr, ind, ares={};
			if (!$t.grid ) { return; }
			ind = $($t).jqGrid("getInd",rowid,true);
			if(ind === false) {return;}
			for( var k=0;k<$t.p.savedRow.length;k++) {
				if( $t.p.savedRow[k].id == rowid) {fr = k; break;}
			}
			if(fr >= 0) {
				if($.isFunction($.fn.datepicker)) {
					try {
						$("input.hasDatepicker","#"+$.jgrid.jqID(ind.id)).datepicker('hide');
					} catch (e) {}
				}
				$.each($t.p.colModel, function(i,n){
					if(this.editable === true && this.name in $t.p.savedRow[fr] && !$(this).hasClass('not-editable-cell')) {
						ares[this.name] = $t.p.savedRow[fr][this.name];
					}
				});
				$($t).jqGrid("setRowData",rowid,ares);
				$(ind).attr("editable","0").unbind("keydown");
				$t.p.savedRow.splice(fr,1);
				if($("#"+$.jgrid.jqID(rowid), "#"+$.jgrid.jqID($t.p.id)).hasClass("jqgrid-new-row")){
					setTimeout(function(){$($t).jqGrid("delRowData",rowid);},0);
				}
			}
			if ($.isFunction(o.afterrestorefunc))
			{
				o.afterrestorefunc.call($t, rowid);
			}
		});
	},
	addRow : function ( p ) {
		p = $.extend(true, {
			rowID : "new_row",
			initdata : {},
			position :"first",
			useDefValues : true,
			useFormatter : false,
			addRowParams : {extraparam:{}}
		},p  || {});
		return this.each(function(){
			if (!this.grid ) { return; }
			var $t = this;
			if(p.useDefValues === true) {
				$($t.p.colModel).each(function(i){
					if( this.editoptions && this.editoptions.defaultValue ) {
						var opt = this.editoptions.defaultValue,
						tmp = $.isFunction(opt) ? opt.call($t) : opt;
						p.initdata[this.name] = tmp;
					}
				});
			}
			$($t).jqGrid('addRowData', p.rowID, p.initdata, p.position);
			$("#"+$.jgrid.jqID(p.rowID), "#"+$.jgrid.jqID($t.p.id)).addClass("jqgrid-new-row");
			if(p.useFormatter) {
				$("#"+$.jgrid.jqID(p.rowID)+" .ui-inline-edit", "#"+$.jgrid.jqID($t.p.id)).click();
			} else {
				var opers = $t.p.prmNames,
				oper = opers.oper;
				p.addRowParams.extraparam[oper] = opers.addoper;
				$($t).jqGrid('editRow', p.rowID, p.addRowParams);
				$($t).jqGrid('setSelection', p.rowID);
			}
		});
	},
	inlineNav : function (elem, o) {
		o = $.extend({
			edit: true,
			editicon: "ui-icon-pencil",
			add: true,
			addicon:"ui-icon-plus",
			save: true,
			saveicon:"ui-icon-disk",
			cancel: true,
			cancelicon:"ui-icon-cancel",
			addParams : {useFormatter : false},
			editParams : {}
		}, $.jgrid.nav, o ||{});
		return this.each(function(){
			if (!this.grid ) { return; }
			var $t = this;
			// detect the formatactions column
			if(o.addParams.useFormatter === true) {
				var cm = $t.p.colModel,i;
				for (i = 0; i<cm.length; i++) {
					if(cm[i].formatter && cm[i].formatter === "actions" ) {
						if(cm[i].formatoptions) {
							var defaults =  {
								keys:false,
								onEdit : null,
								onSuccess: null,
								afterSave:null,
								onError: null,
								afterRestore: null,
								extraparam: {},
								url: null
							},
							ap = $.extend( defaults, cm[i].formatoptions );
							o.addParams.addRowParams = {
								"keys" : ap.keys,
								"oneditfunc" : ap.onEdit,
								"successfunc" : ap.onSuccess,
								"url" : ap.url,
								"extraparam" : ap.extraparam,
								"aftersavefunc" : ap.afterSavef,
								"errorfunc": ap.onError,
								"afterrestorefunc" : ap.afterRestore
							};
						}
						break;
					}
				}
			}
			if(o.add) {
				$($t).jqGrid('navButtonAdd', elem,{
					caption : o.addtext,
					title : o.addtitle,
					buttonicon : o.addicon,
					id : $t.p.id+"_iladd",
					onClickButton : function ( e ) {
						$($t).jqGrid('addRow', o.addParams);
						if(!o.addParams.useFormatter) {
							$("#"+$t.p.id+"_ilsave").removeClass('ui-state-disabled');
							$("#"+$t.p.id+"_ilcancel").removeClass('ui-state-disabled');
							$("#"+$t.p.id+"_iladd").addClass('ui-state-disabled');
							$("#"+$t.p.id+"_iledit").addClass('ui-state-disabled');
						}
					}
				});
			}
			if(o.edit) {
				$($t).jqGrid('navButtonAdd', elem,{
					caption : o.edittext,
					title : o.edittitle,
					buttonicon : o.editicon,
					id : $t.p.id+"_iledit",
					onClickButton : function ( e ) {
						var sr = $($t).jqGrid('getGridParam','selrow');
						if(sr) {
							$($t).jqGrid('editRow', sr, o.editParams);
							$("#"+$t.p.id+"_ilsave").removeClass('ui-state-disabled');
							$("#"+$t.p.id+"_ilcancel").removeClass('ui-state-disabled');
							$("#"+$t.p.id+"_iladd").addClass('ui-state-disabled');
							$("#"+$t.p.id+"_iledit").addClass('ui-state-disabled');
						} else {
							$.jgrid.viewModal("#alertmod",{gbox:"#gbox_"+$t.p.id,jqm:true});$("#jqg_alrt").focus();							
						}
					}
				});
			}
			if(o.save) {
				$($t).jqGrid('navButtonAdd', elem,{
					caption : o.savetext || '',
					title : o.savetitle || 'Save row',
					buttonicon : o.saveicon,
					id : $t.p.id+"_ilsave",
					onClickButton : function ( e ) {
						var sr = $t.p.savedRow[0].id;
						if(sr) {
							if($("#"+$.jgrid.jqID(sr), "#"+$.jgrid.jqID($t.p.id) ).hasClass("jqgrid-new-row")) {
								var opers = $t.p.prmNames,
								oper = opers.oper;
								if(!o.editParams.extraparam) {
									o.editParams.extraparam = {};
								}
								o.editParams.extraparam[oper] = opers.addoper;
							}
							if( $($t).jqGrid('saveRow', sr, o.editParams) ) {
								$("#"+$t.p.id+"_ilsave").addClass('ui-state-disabled');
								$("#"+$t.p.id+"_ilcancel").addClass('ui-state-disabled');
								$("#"+$t.p.id+"_iladd").removeClass('ui-state-disabled');
								$("#"+$t.p.id+"_iledit").removeClass('ui-state-disabled');
							}
						} else {
							$.jgrid.viewModal("#alertmod",{gbox:"#gbox_"+$t.p.id,jqm:true});$("#jqg_alrt").focus();							
						}
					}
				});
				$("#"+$t.p.id+"_ilsave").addClass('ui-state-disabled');
			}
			if(o.cancel) {
				$($t).jqGrid('navButtonAdd', elem,{
					caption : o.canceltext || '',
					title : o.canceltitle || 'Cancel row editing',
					buttonicon : o.cancelicon,
					id : $t.p.id+"_ilcancel",
					onClickButton : function ( e ) {
						var sr = $t.p.savedRow[0].id;
						if(sr) {
							$($t).jqGrid('restoreRow', sr, o.editParams);
							$("#"+$t.p.id+"_ilsave").addClass('ui-state-disabled');
							$("#"+$t.p.id+"_ilcancel").addClass('ui-state-disabled');
							$("#"+$t.p.id+"_iladd").removeClass('ui-state-disabled');
							$("#"+$t.p.id+"_iledit").removeClass('ui-state-disabled');
						} else {
							$.jgrid.viewModal("#alertmod",{gbox:"#gbox_"+$t.p.id,jqm:true});$("#jqg_alrt").focus();							
						}
					}
				});
				$("#"+$t.p.id+"_ilcancel").addClass('ui-state-disabled');
			}
		});
	}
//end inline edit
});
})(jQuery);
