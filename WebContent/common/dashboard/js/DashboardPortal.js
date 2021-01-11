$(document)
		.ready(function() {
//				var _theHeight = document.getElementById('testTd').offsetHeight // -5 -$("#changeLayoutTd").height()  ; //-5 because in css there is margin 5px
				//$("#btndiv").height(_theHeight);
				//$("#dashboard").height(_theHeight );

				// load the templates
				$('body').append('<div id="templates"></div>');
				$("#templates").hide();
				$("#templates").load(
						jQuery.contextPath
								+ "/common/dashboard/js/templates.html",
						initDashboard);

				function initDashboard() {
					/**
					 * [MarwanMaddah]: chooseDashLayoutKey translation management 
					 */
					$("#chooseDashLayoutKey").html(chooseDashLayoutKey);
					dashboard = $('#dashboard')
							.dashboard(
									{
										layoutClass : 'layout',
										json_data : {
											url : jQuery.contextPath
													+ json_data,
											completeFn : adjustHeights
										},
										layouts : [
												{
													title : "Layout1",
													id : "layout1",
													image : jQuery.contextPath
															+ "/common/dashboard/layouts/layout1.png",
													html : '<div class="layout layout-a"><div class="column first column-first"></div></div>',
													classname : 'layout-a'
												},
												{
													title : "Layout2",
													id : "layout2",
													image : jQuery.contextPath
															+ "/common/dashboard/layouts/layout2.png",
													html : '<div class="layout layout-aa"><div class="column first column-first"></div><div class="column second column-second"></div></div>',
													classname : 'layout-aa'
												},
												{
													title : "Layout3",
													id : "layout3",
													image : jQuery.contextPath
															+ "/common/dashboard/layouts/layout3.png",
													html : '<div class="layout layout-ba"><div class="column first column-first"></div><div class="column second column-second"></div></div>',
													classname : 'layout-ba'
												},
												{
													title : "Layout4",
													id : "layout4",
													image : jQuery.contextPath
															+ "/common/dashboard/layouts/layout4.png",
													html : '<div class="layout layout-ab"><div class="column first column-first"></div><div class="column second column-second"></div></div>',
													classname : 'layout-ab'
												},
												{
													title : "Layout5",
													id : "layout5",
													image : jQuery.contextPath
															+ "/common/dashboard/layouts/layout5.png",
													html : '<div class="layout layout-aaa"><div class="column first column-first"></div><div class="column second column-second"></div><div class="column third column-third"></div></div>',
													classname : 'layout-aaa'
												} ]

									});

					dashboard.init();

					//$("#btndiv").height(document.getElementById('testTd').offsetHeight -  $("#changeLayoutTd").height());
					var theHeight = document.getElementById('testTd').offsetHeight;
					$("#portal_div").height(theHeight);
					$("#dashTable").height(theHeight);
					$("#leftBarDiv").height(theHeight);
					$("#dashboardTd").height(theHeight);
					$("#dashboard").height(theHeight);
					
					// fix for issue in chrom of not displaying widget bar on mouse over.
					if($.browser.webkit)
					{
						$("#leftBarDiv").css("display","table-row"); 
					}

				}

				$("#origin li").css("list-style-type", "none");
				$("#origin li").draggable( {
					appendTo : "body",
					helper : "clone"
				});

				$(".column")
						.droppable(
								{
									accept : "#origin li",
									over : function(event, ui) {
										$(this).addClass("selectedcolumn");
									},
									out : function(event, ui) {
										$(this).removeClass("selectedcolumn");
									},
									drop : function(event, ui) {
										/**
										 * [MarwanMaddah]
										 * to check the session timeout on Drop any widget.
										 */										
										_callActionToCheckSession();
										/**
										 * 
										 */
										var colIndex = $(this).attr("id");
										hidediv();
										$(this).find(".placeholder").remove();
										if (ui.helper.attr("widgetId") == "personalportlet") {
											var custWdgtDiv = $("#addCustomWidgetDiv");
											if(custWdgtDiv.length == 0)
										 	{
												custWdgtDiv = $("<div id='addCustomWidgetDiv'/>");
												custWdgtDiv.css("padding","0");
										 	    $("body").append(custWdgtDiv);
										 	}
											$("#addCustomWidgetDiv")
													.load(
															jQuery.contextPath
																	+ "/pathdesktop/portalDashboardAction_loadCustomDialog");
											$("#addCustomWidgetDiv").show();
											$("#addCustomWidgetDiv").dialog( {
												modal : true,
												title : add_custom_widget_key,
												autoOpen : true,
												position : 'center',
												width : 550,
												close: function()
													{
														$(this).dialog("destroy");
														$(this).remove();
													}
											});
											$newWidgetLocation = dashboard.element.find('.' + colIndex);
										} else {
											var obj = eval("options_"
													+ ui.helper
															.attr("widgetId")
													+ "_prop");
											//obj["open"]=true;
											dashboard
													.addWidget(
															obj,
															dashboard.element
																	.find('.' + colIndex));
										}
										dashboard.element.find('.' + colIndex)
												.removeClass("selectedcolumn");
									},
									deactivate : function(event, ui) {
										// This event is called for each column
									var childLength = $(this).children().length;
									if (childLength == 0 && $(this).html() != "") { //if colum not present in layout options is not initialized(column always not hidden but with empty html) 
										$(this)
												.html(
														'<div class="emptycolumn">' + opts.emptyColumnHtml + '</div>');
									} else {
										if (childLength == 2) {
											// remove the empty column HTML
											$(this).find('.emptycolumn')
													.remove();
										}
									}
								}
								});

			});

function showdiv() {
	$("#btndiv").hide()
//	$("#widgetListDiv").height($("#btndiv").height() - 2)
	$("#widgetListDiv").effect("slide", {}, 80);
}
function hidediv() {
	$("#btndiv").show();
	$("#widgetListDiv").hide();
}

function adjustHeights() {
	var dashboardTdHeight = $("#dashboardTd").height()
	$(".column").height(dashboardTdHeight - 20); //-20 is the td footer height in welcomeMain.jsp
//		$("#btndiv").height( $($("#btndiv").closest("td")).height());
	$("#btndiv").height( $("#dashboard").height())
}

function returnUserLayoutUpdates()
{
	var userWidgets = {}
	var layout = dashboard.layout.id;
	var columnDivs = $("#dashboard div.layout").find("div.column");
	var callSave = true;
	columnDivs.each(function(i)
	{
		var columnIdx = i;
		var widgetDivs = $(this).find("div.widget")
		widgetDivs.each(function(j)
		{
			var wiId = $(this).attr("id");
			var wi = dashboard.getWidget(wiId)
			if(!wi && wi!=null)
			{
				callSave = false; //widget not yet added to dashboard content
				return false;
			}
			var widgetDet = {}
			widgetDet["LAYOUT"] = layout;
			widgetDet["PORTLET_CODE"] = wiId;
			widgetDet["COLUMN_INDEX"] = i+1;
			widgetDet["PORTLET_INDEX"] = j + 1;
			widgetDet["PORTLET_MODE"] = (wi!=null && !wi.open) ? 0 : 1;
			if(wi!= null && typeof wi.customHeight != "undefined")
			{
				widgetDet["PORTLET_HEIGHT"] = wi.customHeight
			}	
			userWidgets[wiId] = widgetDet;
		})
	})

	if(!callSave)
	{
		return false;
	}
	return JSON.stringify(userWidgets);
}
function saveLayout()
{
	var userWidgets = returnUserLayoutUpdates();
	if(userWidgets === false)
		return;
	$("#userPortalUpdates").val(userWidgets);
	var updates = $("#userPortalFrmId").serialize();
	
	if(typeof dashboard.isEmpty != "undefined")
		updates +="&emptyDash="+dashboard.isEmpty;
	
	_showProgressBar(true);
		$.ajax({
				url: jQuery.contextPath+ "/pathdesktop/portalDashboardAction_saveLayout",
		  		type:"post",
		  		dataType:"json",
		  		data: updates,
		  		success: function(data)
		  		{
					_showProgressBar(false);
				}
  		})
}

function openHeightDlg(widgetId)
{
	 	var resizeDiv = $("#resizeDiv");
	 	if(resizeDiv.length == 0)
	 	{
	 		resizeDiv = $("<div id='resizeDiv'/>");
	 		resizeDiv.css("padding","0");
	 	    $("body").append(resizeDiv);
	 	}
		resizeDiv.show();
      	resizeDiv.load(jQuery.contextPath+ "/pathdesktop/portalDashboardAction_loadResizeDialog?PORTLET_CODE="+widgetId);
      	resizeDiv.dialog( {
								modal : true,
								title : resize_widget_key,
								autoOpen : true,
								position : 'center',
								width : 350
							});
}

function openWrkspaceCustDlg(widgetId)
{

	 	var customizeDiv = $("#customizeDiv");
	 	if(customizeDiv.length == 0)
	 	{
	 		customizeDiv = $("<div id='customizeDiv'/>");
	 		customizeDiv.css("padding","0");
	 	    $("body").append(customizeDiv);
	 	}
	 	customizeDiv.show();
	 	customizeDiv.load(jQuery.contextPath+ "/pathdesktop/portalDashboardAction_loadCustomizeDialog?PORTLET_CODE="+widgetId);
      	var buttonsArr = {};
      	buttonsArr[ok_label_trans] = function()
                           			{
      									saveWorkspaceDetails();
//                                		$(this).dialog("close");
                           			};
	   buttonsArr[cancel_label_trans] =function()
            	    	   				{
		   									$(this).dialog("close");
		   									$(this).dialog("destroy");
		   									$(this).remove();
            	    	   				};
       customizeDiv.dialog( {
								modal : true,
								title : custom_wkspce_key,
								autoOpen : true,
								position : 'center',
								width : 650,
								height:350,
								buttons: buttonsArr
							});
}

function updateWidgetHeight()
{
	var widgetId = $("#portletCode").val();
	var newHeight = $("#heightId").val();
	dashboard.resizeWidget(widgetId ,newHeight, true);
	$("#resizeDiv").dialog("close");
	$("#resizeDiv").hide();
	$("#resizeDiv").dialog("destroy");
	$("#resizeDiv").remove();
	
	
}
function saveWidget()
{
	if(!$("#addCustWidgetForm").hasChanges())
		return;
	
	_showProgressBar(true);
	$("#portletCode").val($("#userId").val()+ "_" + (new Date()).getTime());
	
	//check if the url is javascript.
	var url = $("#portlet_url").val();
	if(url!='undefined' && url!=null && url.trim().toLowerCase().indexOf("javascript:")==0)
	{
		_showProgressBar(false);
		_showErrorMsg(invalid_widget_url);
		 $("#addCustomWidgetDiv").dialog("close");
		   return;
	}
	var obj = {};
	obj["id"] = $("#portletCode").val();
	obj["title"]= $("#portlet_title").val();
	obj["titleKey"]= $("#portlet_title").val();
	obj["url"]= $("#portlet_url").val();
	obj["minimize"] = $("#minimize").val();
	obj["maximize"] = $("#maximize").val();
  	obj["del"] = $("#del").val();
  	obj["resize_key_trans"] = $("#resize_wdgt").val();
  	obj["assign_key_trans"] = $("#assign_wdgt").val();
  	obj["customize_key_trans"] = $("#customize_wdgt").val();
	obj["refresh"] = $("#refresh").val();
	obj["userDefinedType"] = "1";
	obj["wdgtDeleteDisplay"] = $("#wdgtDeleteDisplay").val();
	var custDisp = "display:none;";
	var wkspCustRight  = $("#wkspceCustRight").val();
	if(obj["id"] == "USR_WORKSPACE" && wkspCustRight !== "0")
	{
		custDisp = "";
	}
	obj["wrkspceCustDisplay"] = custDisp;
	var assignDisp = "display:none;";
	var wdgtAssRight  = $("#wdgtAssignRight").val();
	if(wdgtAssRight !== "0")
	{
		assignDisp = "";
	}
	obj["wdgtAssignDisplay"] = assignDisp;
	dashboard.addWidget(obj,$newWidgetLocation);
	
	$("#userLayoutUpdates").val(returnUserLayoutUpdates());
	var updates = $("#addCustWidgetForm").serializeForm();
	
	$.post(jQuery.contextPath+ "/pathdesktop/portalDashboardAction_saveCustomWidget",
			updates,
			function( param )
 	        {
		        if(typeof param["widgetVO"]!= "undefined" &&  param["widgetVO"]!=null)
		        {		        	
			        var isRepUrl = param["widgetVO"].repUrl;
			        if(isRepUrl == "1")
			        {		        	
			          var wi = dashboard.getWidget($("#portletCode").val());
			          wi.repUrl = "1"; 
			          wi.url = param["widgetVO"].url; 
			          wi.refreshContent();
			        }
		        }
				$("#addCustomWidgetDiv").dialog("close");
				_showProgressBar(false);
 	        }
	)
}
function fav_onAddClick()
{
	var formId  = "favoriteFormId";
	var loadSrc = jQuery.contextPath+"/pathdesktop/dashboardFavoriteMaint_initialize";
	openFavMaintenance(formId,loadSrc,{});
	
}

function fav_onEditClick(appName,favoriteId)
{
	var formId  = "favoriteFormId";
	var loadSrc = jQuery.contextPath+"/pathdesktop/dashboardFavoriteMaint_edit";
	openFavMaintenance(formId,loadSrc,{"userFavorites.APP_NAME":appName,"userFavorites.ID":favoriteId});
}

function fav_deleteFromFavorite(appName, favoriteId)
{
	_showConfirmMsg(Confirm_Delete_Process_key,"Warning","fav_deleteAfterConfirm",{appName:appName, favoriteId:favoriteId});
}

function fav_deleteAfterConfirm(confirm,args)
{
	if(confirm)
	{
		var appName    = args.appName;
		var favoriteId = args.favoriteId;
		_showProgressBar(true);
		$.post(jQuery.contextPath+ "/pathdesktop/dashboardFavoriteStatment_deleteFavorite",
				{"userFavorites.APP_NAME":appName,"userFavorites.ID":favoriteId},
				function( param )
	 	        {
					if(typeof param != "undefined" && param!= null && param!=""){
						$("div[id='FAVORITES'] div.widgetcontent").html(param);
						_showProgressBar(false);
					}
	 	        });
	}
}
function openFavMaintenance(theFormId, srcURL, theParams)
{
	var	favMaintDiv = $("<div id='fav_Maint_div'/>");
	favMaintDiv.css("padding","0");
    var theForm = $("#"+theFormId);
    $("body").append(favMaintDiv);
    
    var curParams = theParams;
    if(!curParams)
    {
    	curParams = {};
    }
    _showProgressBar(true);
	$("#fav_Maint_div").load(srcURL, curParams, function() {
	_showProgressBar(false);
    $("#fav_Maint_div").dialog({modal:true, 
                                title:fav_maint_title_key,
                             autoOpen:false,
                                 show:'slide',
                             position:'center', 
                                width:returnMaxWidth(420),
                               height:returnMaxHeight(290),
                                close: function (){
		 								  var theDialog = $(this);
		 								  theDialog.remove();
													    }});
	$("#fav_Maint_div").dialog("open");
	});
}
var methodName = "";
function fav_submitManagement()
{
	//check if the url is javascript
	var externalLink = $("#favoriteExternal").val();
		if(externalLink!='undefined' && externalLink!=null && externalLink.trim().toLowerCase().indexOf("javascript:")==0)
		{
		 _showProgressBar(false);
		 _showErrorMsg(invalid_widget_url);
		   return;
		}
	var dataForm = $("#favoriteFormId").serializeForm();
	$.post(jQuery.contextPath+ "/pathdesktop/dashboardFavoriteStatment_"+methodName
			,dataForm
			,function( param )
 	        {
				if(typeof param != "undefined" && param!= null && param!=""){
					$("div[id='FAVORITES'] div.widgetcontent").html(param);
					$("#fav_Maint_div").dialog("close");
					$("#fav_Maint_div").dialog("destroy");
					$("#fav_Maint_div").remove();
					
				}
 	        })
}
function fav_setMethodName()
{
  methodName = $("#fav_actionMode").val();
}
function fav_openMenuTree(theFormId)
{
	var	treeMenuDiv = $("<div id='treeMenu_div'/>");
	treeMenuDiv.css("padding","0");
    var theForm = $("#"+theFormId);

    var theParams = {};
    
	var isCheckBoxChked = $("#saveas_chooseParent_"+_pageRef).is(":checked");
	if (isCheckBoxChked) {
		theParams.saveAsParent = '1';
		theParams.progRef = _pageRef;
	}
    $("body").append(treeMenuDiv);
    
    var curParams = theParams;
    if(!curParams)
    {
    	curParams = {};
    }
    _showProgressBar(true);
    var srcURL = jQuery.contextPath+"/path/loadTreeMenu";
    var _dialogOptions = {modal:true, 
                          title:select_fav_screen_key,
                       autoOpen:false,
                           show:'slide',
                       position:'center', 
                          width:returnMaxWidth(370),
                         height:returnMaxHeight(600),
                        buttons:{
	                             ok:function(){
	                                     if(fav_onTreeMenuSelection())
	                                     {    	                                    	 
	                                        $(this).dialog("close");
	                                        $(this).dialog("destroy");
	                                        $(this).remove();
	                    					
	                                     }}
	                	    	 ,cancel: function(){
	                	    		 $(this).dialog("close");
	                	    		 $(this).dialog("destroy");
	                	    		 $(this).remove();}
                                },
	                      close: function (){
	 								           var theDialog = $(this);
	 								           theDialog.remove();
								}};
    $("#treeMenu_div").load(srcURL, curParams,function(){_showProgressBar(false);});
    $("#treeMenu_div").dialog(_dialogOptions);
    $("#treeMenu_div").dialog("open");
}

function selectScreenMenuFromTree()
{
	var $table        = $("#treeMenuGridTbl_Id");
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var myObject      = $table.jqGrid('getRowData', selectedRowId);
	var menuTitleEng  = myObject["MENU_TITLE_ENG"];
	var progRef       = myObject["PROG_REF"];
	var appName       = myObject["APP_NAME"];
	var isLeaf        = myObject["isLeaf"];
	var parentKey     = myObject["parentKey"];
	if(isLeaf!='true')
	{
	  _showErrorMsg(selection_leaf_node_key,warning_msg_title);
	  return false;
	}
	var i=0;
	var desc = "";
	currKey  = parentKey;
	while(1)
	{
	  if(i==0)
	  {
		desc = menuTitleEng;  
	  }
	  else
	  {
		var currentObj = $table.jqGrid('getRowData', currKey);
		var currDesc   = currentObj["MENU_TITLE_ENG"];
		var currParent = currentObj["parentKey"];
		currKey = currParent; 
		desc = currDesc+"-"+desc;
		if(currParent == null || typeof currParent == 'undefined' || currParent == '')
		{
		  break;	
		}
	  }	  
	  i++;	
	}
	var selectedObj = {};
	selectedObj["desc"] = desc; 
	selectedObj["progRef"] = progRef; 
	selectedObj["appName"] = appName;
	return selectedObj;
}


/**
 *   
 */
function fav_onTreeMenuSelection()
{
	var selectedObj = selectScreenMenuFromTree();
	if(!selectedObj)
	{
		return false;
	}
	$("#favoriteDesc").val(selectedObj["desc"]);
	$("#fav_progRef").val(selectedObj["progRef"]);
	$("#fav_appName").val(selectedObj["appName"]);
	$("#favoriteFullPath").val(selectedObj["desc"]);
	if($("#cust_saveas_screen_name_"+_pageRef)!= null && $("#cust_saveas_screen_name_"+_pageRef)!= 'undefined')
		{
		$("#cust_saveas_screen_parent_name_"+_pageRef).val(selectedObj["desc"]);
		$("#cust_saveas_parentRef_"+_pageRef).val(selectedObj["progRef"]);
		}
	return true;
}
function apps_openAppsInfos(appName)
{
	var	appsInfosDiv = $("<div id='apps_infos_div'/>");
	appsInfosDiv.css("padding","0");
    $("body").append(appsInfosDiv);
    
    var curParams = {currAppName:appName};
    var srcURL = jQuery.contextPath+"/pathdesktop/dashboardApplicationInfo";
    _showProgressBar(true);
	$("#apps_infos_div").load(srcURL, curParams, function() {
	_showProgressBar(false);
    $("#apps_infos_div").dialog({modal:true, 
                                 title:app_infos_title_key,
                              autoOpen:false,
                                  show:'slide',
                              position:'center', 
                                 width:returnMaxWidth('370'),
                                height:returnMaxHeight('200'),
                              buttons:{
    	                               ok:function(){
    	                                        $(this).dialog("close");
    	                                        $(this).dialog("destroy");
    	                                        $(this).remove();
    	                               }},
                                 close: function (){
		 								  var theDialog = $(this);
		 								  theDialog.remove();
													    }});
	$("#apps_infos_div").dialog("open");
	});
}

function openWorkspaceLink(appUrl, appName, progRef, screenTitle)
{
	if(appUrl == "")
	{
		_showErrorMsg(app_not_found_key,error_msg_title);
		return;	
	}
	
   	_showProgressBar(true);
	// just call dummy action to desktopAction to the server to check if session is timed out before calling workspace link
	$.ajax({
			url: jQuery.contextPath+ "/path/dummy/SessionDetails",
	  		type:"post",
	  		dataType:"json",
	  		success: function(data)
	  		{
	  			_showProgressBar(false);
	  			// TP 500032 Websphere automatic login Issue, removing / 
				var src = appUrl+ "pathdesktop/loadDecorationAction?appName="+appName+"&menuVar="+progRef;
				var $_form = $('#userWkspaceForm');
				$("#screenTitle").val(screenTitle);
				if(data['newFrmtUserRunDate'] != undefined && data['newFrmtUserRunDate'] != null)
				{
					$('#userWkspaceForm #runningDateRET').remove();
					$('<input>').attr('type','hidden').attr('id','runningDateRET').attr('name','runningDateRET').attr('value',data['newFrmtUserRunDate']).appendTo($('#userWkspaceForm'));
				}	
			   	$_form.attr("action",src);
			   	$_form.attr("target", appName + "_" +progRef);
			   	submitEncryptedData('userWkspaceForm',false);
	  		}
	});
}
function fav_openScreen(appName,appUrl,favId,externalLink,favDesc,destOptUrl,destProgRef,openInDialog)
{
	if(appUrl!=null && appUrl!="" && appUrl!="null")
	{
		if(externalLink+"" == "true")
		{
			//check if the url is javascript
			if(appUrl.trim().toLowerCase().indexOf("javascript:")==0)
			{
				_showErrorMsg(invalid_widget_url);
				return;
			}
			window.open(appUrl);
		}
		else
		{
			_showProgressBar(true);
			if(openInDialog == 1)
			{
  				var openFavScreenDiv = $("<div id='openFavScreenDiv_id' style='width:"+ returnMaxWidth(1023)+";height:"+returnMaxHeight(501)+";border:0px;overflow:hidden;'/>");
  				var openFavScreenIFramDiv = $(openFavScreenDiv);
  				$('body').append(openFavScreenIFramDiv);
  				var params = {};
  				var currentAppName = appName;
  				
  				var iFrameUrl = jQuery.contextPath+'/path-default/loadIframeScreenAction';
  				var iFrameParam = {};
  				iFrameParam["destinationProgRef"] = destProgRef;
  				iFrameParam["appName"]            = currentAppName;
  				iFrameParam["destinationUrl"]     = destOptUrl;
  				iFrameParam["additionalParams"]   = JSON.stringify(params);
  				
  				var iFramDialogOpt = {
  	  					modal : true,
  	  					title : favDesc,
  	  					autoOpen : false,
  	  					position : 'center',
  	  					height : returnMaxHeight(501),
  	  					width : returnMaxWidth(1023),
  	  					close : function() {
  	  						$("#openFavScreenDiv_id").dialog("destroy");
  	  						$("#openFavScreenDiv_id").remove();
  	  					},
  	  					open : function() {
  	  					}};
  				
  				openFavScreenIFramDiv.dialog(iFramDialogOpt);
  				openFavScreenIFramDiv.load(iFrameUrl,iFrameParam,
  						function() 
  						{
  							$("#openFavScreenDiv_id").dialog("open");
  							_showProgressBar(false);
  						});
			}
			else
			{				
				// just call dummy action to desktopAction to the server to check if session is timed out before calling favorite link			
				$.ajax({
					url: jQuery.contextPath+ "/path/dummy/SessionDetails",
					type:"post",
					dataType:"json",
					success: function(data)
					{
						if(data['newFrmtUserRunDate'] != undefined && data['newFrmtUserRunDate'] != null)
						{
							$('#myForm #runningDateRET').remove();
							$('<input>').attr('type','hidden').attr('id','runningDateRET').attr('name','runningDateRET').attr('value',data['newFrmtUserRunDate']).appendTo($('#myForm'));
						}	
						//TP 500032 Websphere automatic login Issue, removing /
						var src = appUrl+ "pathdesktop/loadDecorationAction?favoriteId="+favId;
						$('#myForm').attr("action",src);
						var target = 'FAV_' + appName + '_' + destProgRef;
						$('#myForm').attr("target",target);
						submitEncryptedData('myForm',false);
						_showProgressBar(false);
					}
				});
			}
		}
	}
	else
	{
		if(externalLink !="true")
		{
			_showErrorMsg(app_not_found_key,error_msg_title);
		}
	}
}

function alrt_openAlertGrid(appName)
{
	var	alertDiv = $("<div id='receive_alert_div'/>");
	alertDiv.css("padding","0");
    $("body").append(alertDiv);
    
	var srcURL = jQuery.contextPath+"/path/alerts/TrsAckTOutAlertsMaint_loadTrsAckTOutAlertsMaint";
	var curParams = {_pageRef:'RCVALERT',appName:appName,manualOpen:"true"};
	
	_showProgressBar(true);
    $("#receive_alert_div").dialog({modal:false, 
                                 title:alerts_key,
                              autoOpen:false,
                              show:{
						        	effect:"slide",
						        	duration:100,
						        	complete:function()
						        	{	
    									//Fix Issue #275553 , add a complete event for the slide show to call the resizeSingleGrid function
						            	resizeSingleGrid("trsAckTOutAlertGrid_Id_"+alertsPageRef);
						            }
						    	},
                              position:'center', 
                                 width:returnMaxWidth('1200'),
                                height:returnMaxHeight('450'),
                                 close: function (){
		 								  $(this).dialog("destroy");
		 								  $(this).remove();
								}});
			$.ajax({
		  		url: srcURL,
		  		type:"post",
		  		dataType:"html",
		  		data: curParams,
		  		success: function(data){
					if(data)
					{
						if($.trim(data) != '')
						{	
							//Setting the HTML Data inside the DIV without opening it. The div will be opened if the grid 
							//contains rows. The open of the popup is done on alerts grid complete.
							$("#receive_alert_div").html(data);
							$("#receive_alert_div").dialog('open');
							_showProgressBar(false);
						}
					}	
					
		  		}
			});
}
function fav_resizeMgnt()
{
	var portalResizeTimer;
	clearTimeout(portalResizeTimer);
	portalResizeTimer = setTimeout(function()
		{
			$("#fav_mainTbl").height($("#fav_Maint_div").height());
			$("#favoriteDesc").height($("#favoriteDesc").parent().height());
		}, 100);
}

function openApplication(appName,appUrl)
{
	if(appUrl!=null && appUrl!="" && appUrl!="null")
	{
	   	_showProgressBar(true);
		// just call dummy action to desktopAction to the server to check if session is timed out before calling application link
		$.ajax({
			url: jQuery.contextPath+ "/path/dummy/SessionDetails",
	  		type:"post",
	  		dataType:"json",
	  		success: function(data)
	  		{
				_showProgressBar(false);
				if(data['newFrmtUserRunDate'] != undefined && data['newFrmtUserRunDate'] != null)
				{
					$('#appForm #runningDateRET').remove();
					$('<input>').attr('type','hidden').attr('id','runningDateRET').attr('name','runningDateRET').attr('value',data['newFrmtUserRunDate']).appendTo($('#appForm'));
				}	
				var src = appUrl;
				//TP 800349
				if(appName != undefined && appName.toUpperCase() !== "CRM")
				{
					src = src+ "?appId="+appName;
					// if websphere application server,TP 500032 Websphere automatic login Issue
					if(currentServer == "WAS")
					{
						src = appUrl+ "path/AutoLoginAction?appId="+appName;
					}
				}
	  		   	$('#appForm').attr("action",src);
	  		   	$('#appForm').attr("target",appName);
	  		   	submitEncryptedData('appForm',false);
			}
		});
	}
	else
	{
	  _showErrorMsg(app_not_found_key,error_msg_title); 	
	}
}

function addWorkspaceElt()
{
	var $customizeWkspceGrid = $("#customizeWkspceGrid"); 
	$customizeWkspceGrid.jqGrid("addInlineRow",{});
}
function setFullPathCol()
{
	var $customizeWkspceGrid = $("#customizeWkspceGrid");
	var res = selectScreenMenuFromTree();
	var selRowId = $customizeWkspceGrid.jqGrid("getGridParam","selrow");
	$customizeWkspceGrid.jqGrid("setCellValue",selRowId, "userWorkspaceVO.APP_NAME",res["appName"]);
	$customizeWkspceGrid.jqGrid("setCellValue",selRowId, "userWorkspaceVO.PROG_REF",res["progRef"]);
	$(document.getElementById("inpt"+selRowId+ "_fullPath")).val(res["desc"]);
	/**
	 * [MarwanMaddah]: #BUG595347-system is not responding on changes on workspace widget
	 */
	var _custWorkspaceform = document.getElementById("custWorkspaceFrmId");
	$.data(_custWorkspaceform,'changeTrack',true);
	/**
	 * End
	 */	
	$('#gridDialog_customizeWkspceGrid').dialog('close');  
}
function deleteWorkspaceElt()
{
	var $customizeWkspceGrid = $("#customizeWkspceGrid"); 
	$customizeWkspceGrid.jqGrid("deleteGridRow");
}

function saveWorkspaceDetails()
{
	if($("#lookuptxt_user_id").html() != null && $("#lookuptxt_user_id").val() == "" &&
			$("#lookuptxt_user_id").attr("required"))
	{
		_showErrorMsg($("#lbl_user").text(),missing_elt_msg_key);
		return;
	}
	
	if($("#lookuptxt_role_name").html() != null && $("#lookuptxt_role_name").val() == "" &&
			$("#lookuptxt_role_name").attr("required"))
	{
		_showErrorMsg($("#lbl_role").text(),missing_elt_msg_key);
		return;
	}
	
	if(!$("#custWorkspaceFrmId").hasChanges(true))
		return;
	var $customizeWkspceGrid = $("#customizeWkspceGrid");
	if(!$customizeWkspceGrid.jqGrid("checkRequiredCells"))
		return;

	_showProgressBar(true);
	
	var selRowId = $customizeWkspceGrid.jqGrid("getGridParam","selrow");
	$customizeWkspceGrid.jqGrid("saveRow",selRowId ,false, 'clientArray');
	var updates = $customizeWkspceGrid.jqGrid("getAllRows");
	$("#gridUpdates").val(updates );
	var postParams = $("#custWorkspaceFrmId").serialize();
	postParams += ($("#lookuptxt_user_id").val() != null && $("#lookuptxt_user_id").val() != "") ? "&userId="+$("#lookuptxt_user_id").val() : "&roleName="+$("#lookuptxt_role_name").val();
	$.post(jQuery.contextPath+"/pathdesktop/dashboardWorkspaceAction_saveWorkspaceForUserGroup", postParams, function( param)
	{
		if($("#lookuptxt_user_id").html() != null && $("#loggedUserName").val() == $("#lookuptxt_user_id").val())
		{
			//refresh dashboard widget if same logged user modified his workspace links
			dashboard.getWidget("USR_WORKSPACE").refreshContent();
//			dashboard.init();
		}
		_showProgressBar(false);
		$("#customizeDiv").dialog("close");
		$("#customizeDiv").dialog("destroy");
		$("#customizeDiv").remove();
	});		
	
}
function clearWkspaceGridData()
{
	$("#customizeWkspceGrid").jqGrid("clearGridData");
}

function loadGrid()
{
		$("#custWorkspaceFrmId").clearChanges();
		var postDataObj = $("#customizeWkspceGrid").jqGrid("getGridParam","postData")
		var userId = $("#lookuptxt_user_id").val();
		var roleName = $("#lookuptxt_role_name").val();
		if(!userId && !roleName)
		{
			clearWkspaceGridData();
				return;
		}
		postDataObj["userId"] = userId; 
		postDataObj["roleName"] = roleName; 
		//postDataObj["GROUP_ID"] = "";//$("#user_id").val();
		$("#customizeWkspceGrid").jqGrid("setGridParam",{url:jQuery.contextPath+"/pathdesktop/dashboardWorkspaceAction_loadCustomizationGrid",postData:postDataObj}).trigger("reloadGrid");
}
/**
 * [MarwanMaddah]:used to set the previous value before depedency 
 * on Customize workspace management to use it on the readOnly management on dependency
 * @param {Object} fromWhere
 */
function custWorkSpace_fillPreviousVal(fromWhere)
{
	if(fromWhere == "user")
	{		
	   var userPrevId = $("#lookuptxt_user_id").attr("prevValue");
	   $("#userPrevId").val(userPrevId);
	}
	else
	{
	   var rolePrevName = $("#lookuptxt_role_name").attr("prevValue");
	   $("#rolePrevName").val(rolePrevName);	   	
	}
}
function loadUserPortletGrid()
{
	var postDataObj = $("#assignPortletGrid").jqGrid("getGridParam","postData")
	var portletCode = $("#portletCode").val();
	if(portletCode == "")
	{
		$("#assignPortletGrid").jqGrid("clearGridData");
			return;
	}
	postDataObj["portletCode"] = portletCode; 
	$("#assignPortletGrid").jqGrid("setGridParam",{url:jQuery.contextPath+"/usrdetails/portletUsrGrid_loadAssignPortletGrid",postData:postDataObj}).trigger("reloadGrid");
}
function addPortletElt()
{
	var $assignPortletGrid = $("#assignPortletGrid"); 
	var rowId = $assignPortletGrid.jqGrid("addInlineRow",{});
	$assignPortletGrid.jqGrid('setSelection',rowId, false);
}
/**
 * [MarwanMaddah] : Called onLoadComplete topic to make all row that already saved as ReadOnly 
 * to avoid any update mode, and make the grid behavior restricted by add/delete. 
 */
function assignCust_makeSavedCellReadOnly()
{
	var rowIds = $("#assignPortletGrid").jqGrid('getDataIDs');
	for ( var i = 0; i < rowIds.length; i++) 
	{
		var rowId = rowIds[i];
		$("#assignPortletGrid").jqGrid('setCell', rowId, 'USER_ID', '','not-editable-cell');
	}

}
function deletePortletElt()
{
	var $assignPortletGrid = $("#assignPortletGrid"); 
	$assignPortletGrid.jqGrid("deleteGridRow");
}
function openAssignWidgetDlg(widgetId) {
	_showProgressBar(true);
	var dashParams = {}, pCode;
	pCode = widgetId;
	dashParams = {
		'dashBoardSC.portletCode' : pCode
	};
	$.ajax( {
				url : jQuery.contextPath + '/pathdesktop/portletAssignAction_returnPortletInfo',
				type : "post",
				data : dashParams,
				success : function(response) {
					_showProgressBar(false);
					if (response["_error"] == undefined
							|| response["_error"] == null) {
						
						$('body').append('<div id="customizeDiv_'+pCode+'"></div>');
						var buttonsArr = {};
						
						buttonsArr[ok_label_trans] = function() {
							saveAssignDetails();
						};
						buttonsArr[cancel_label_trans] = function() {
							$(this).dialog("close");
							$(this).remove();
						};
						var dialogOpts = {
							modal : true,
							title : assign_widget_key,
							autoOpen : true,
							position : 'center',
							resizable:false,
							width : 580,
							height : 350,
							buttons : buttonsArr,
                            close: function (){
		 								  $(this).dialog("destroy");
		 								  $(this).remove();
								}
						};
						var parms = {portletCode:pCode,TITLE_KEY:response.dashBoardSC.TITLE_KEY};
						$("#customizeDiv_"+pCode).load(jQuery.contextPath
										+ "/pathdesktop/portletAssignAction_loadAssignDialog",parms);
						$("#customizeDiv_"+pCode).dialog(dialogOpts);
                        $("#customizeDiv_"+pCode).dialog("open"); 
					}
				}
			});

}

function saveAssignDetails()
{
	if (!$("#assignPortletFrmId").hasChanges(true))
		return;
	var $assignPortletGrid = $("#assignPortletGrid");
	if (!$assignPortletGrid.jqGrid("checkRequiredCells"))
		return;
	_showProgressBar(true);
	var pCode = $("#pCode").val();
	var updates = $assignPortletGrid.jqGrid("getChangedRowData");
	$("#gridUpdates").val(updates);
	var postParams = $("#assignPortletFrmId").serialize();
	postParams += "&dashBoardSC.portletCode=" + pCode;
	var updateVal = $("#gridUpdates").val();
	if(updateVal!=null && updateVal!="" && updateVal!=undefined)
	{		
		$.post(jQuery.contextPath
				+ "/pathdesktop/portletAssignAction_saveAssignedPortlets",
				postParams, function(param) {
					_showProgressBar(false);
					//if the return type of the action is Json ( we have an error );
				if (typeof param["_error"] == null || param["_error"] == undefined) {
					$("#assignPortletGrid").trigger("reloadGrid");
					_showErrorMsg(record_was_Updated_Successfully_key,info_msg_title);
				   
				}
			})		
	}
	else
	{
	  _showErrorMsg(changes_not_available_key,info_msg_title);
	  _showProgressBar(false);
	  return;	
	}
}
function beforeUserDependency()
{
	var colData       = $("#assignPortletGrid").jqGrid("getCol","USER_ID",true);
	var selectedRowId = $("#assignPortletGrid").jqGrid('getGridParam', 'selrow');
	var myObject      = $("#assignPortletGrid").jqGrid('getRowData',selectedRowId);
	var colDataLength = colData.length;
	var filtredArr    = [];
	
	for(var i=0;i<colDataLength;i++)
	{
	   var rowId = colData[i].id;
	   if(selectedRowId != rowId && colData[i].value != null && colData[i].value!="undefined" && colData[i].value !="")
	   {
		 if(myObject["USER_ID"] == colData[i].value)
		 {
		   _showErrorMsg(user_already_selected_key,info_msg_title);
		   $("#assignPortletGrid").jqGrid('setCellValue',selectedRowId,"USER_ID",null);
		   return; 
		 }
	   }
	}
}
function onUrlRadioChecked()
{
	if($("input:radio[id^=urlType]:checked").val() == "1")
	{
		manageDynamicDisplay("lookuptxt_reportProgRef",{lookuptxt_reportProgRef:{IS_VISIBLE:"0",IS_MANDATORY:"0"}},"lookuptxt_reportProgRef");
		manageDynamicDisplay("portlet_url",{portlet_url:{IS_VISIBLE:"1",IS_MANDATORY:"1"}},"portlet_url");
		manageDynamicDisplay("lookuptxt_custWidget_appName",{lookuptxt_custWidget_appName:{IS_VISIBLE:"0"}},"lookuptxt_custWidget_appName");
	}
	else
	{
		manageDynamicDisplay("lookuptxt_reportProgRef",{lookuptxt_reportProgRef:{IS_VISIBLE:"1",IS_MANDATORY:"1"}},"lookuptxt_reportProgRef");
		manageDynamicDisplay("portlet_url",{portlet_url:{IS_VISIBLE:"0",IS_MANDATORY:"0"}},"portlet_url");
		manageDynamicDisplay("lookuptxt_custWidget_appName",{lookuptxt_custWidget_appName:{IS_VISIBLE:"1"}},"lookuptxt_custWidget_appName");
	}
}
function afterAppDependMgnt()
{
  $("#lookuptxt_reportProgRef").val("");
  $("#reportId").val("");
  $("#reportDesc").val("");
}

function loadUsrAllwdPortlets()
{
	 	var usrAllwdPortletsDiv = $("#usrAllwdPortletsDiv");
	 	if(usrAllwdPortletsDiv.length == 0)
	 	{
	 		usrAllwdPortletsDiv = $("<div id='usrAllwdPortletsDiv'/>");
	 		usrAllwdPortletsDiv.css("padding","0");
	 	    $("body").append(usrAllwdPortletsDiv);
	 	}
	 	usrAllwdPortletsDiv.show();
	 	usrAllwdPortletsDiv.load(jQuery.contextPath+ "/pathdesktop/portalDashboardAction_loadUsrAllwdPortlets");
      	var buttonsArr = {};
      	buttonsArr[saveLabel] = function()
                           			{
      									saveAllwdPortletsDetails();
//                                		$(this).dialog("close");
                           			};
	   buttonsArr[cancel_label_trans] =function()
            	    	   				{
            	    	      				$(this).dialog("close");
            	    	      				$(this).dialog("destroy");
		   									$(this).remove();
            	    	   				};
      usrAllwdPortletsDiv.dialog( {
								modal : true,
								title : usr_allowed_portlets_key,
								autoOpen : true,
								position : 'center',
								width : returnMaxWidth(600),
								height:returnMaxHeight(425),
								buttons: buttonsArr
							});
}

function loadAllwdPortletsGrid(theGrid)
{
		$("#usrAlwdPortletFrmId"+theGrid).clearChanges();
		var postDataObj = $("#usrAlwdPortletGrid"+theGrid).jqGrid("getGridParam","postData")
		var userId = $("#lookuptxt_user_id").val();
		var userIdW = $("#lookuptxt_user_idW").val();
		var portletCode = $("#selectedPcode").val();
		$("#selectedGrid").val(theGrid);
		if(theGrid == "U")
		{
			//postDataObj["USER_ID"] = userId;
			userId = "";
		}
		else if (theGrid == "P")
		{
			portletCode = "";
		}
		else if(theGrid == "D")
		{
			userId = userIdW;
			portletCode = "D";
		}
		
		if(userId == "" && portletCode == "")
		{	
			$("#usrAlwdPortletGrid"+theGrid).jqGrid("clearGridData");
				return;
		}
		

		postDataObj["userId"] = userId;
		postDataObj["portletCode"] = portletCode;
		
		$("#usrAlwdPortletGrid"+theGrid).jqGrid("setGridParam",{url:jQuery.contextPath+"/pathdesktop/portletAssignAction_loadusrAllwdPortletsGrid",postData:postDataObj}).trigger("reloadGrid");
}


function addAlwdPortletElt(theGrid)
{
	var $AlwdPortletGrid = $("#usrAlwdPortletGrid"+theGrid); 
	$AlwdPortletGrid.jqGrid("addInlineRow",{});
}

function deleteAlwdPortletElt(theGrid)
{
	var $AlwdPortletGrid = $("#usrAlwdPortletGrid"+theGrid); 
	$AlwdPortletGrid.jqGrid("deleteGridRow");
}
/**
 * Method for building the tabs for user allowed portlets.....
 * @param {Object} $
 */
function selectAllwdPrtltTabs(selectedTabId,event)
{
	if(selectedTabId == "portletsByUser")
		{
		checkDataChangesAllwdPrtlt("U");
		checkDataChangesAllwdPrtlt("D");
		$("#selectedGrid").val("P");
		}
	else if(selectedTabId == "usersByPortlet")
		{
		checkDataChangesAllwdPrtlt("P");
		checkDataChangesAllwdPrtlt("D");
		$("#selectedGrid").val("U");
		}
	else if(selectedTabId == "userDashWidget")
		{
		checkDataChangesAllwdPrtlt("P");
		checkDataChangesAllwdPrtlt("U");
		$("#selectedGrid").val("D");
		}
}
//check if grids are changed and prompt the user to clear or cancel
function checkDataChangesAllwdPrtlt(formID) {
	var $currentForm = $("#usrAlwdPortletFrmId"+formID);
	var ind = 0;
		if ($currentForm.hasChanges()) {
			_showConfirmMsg(changes_made_confirm_msg, confirm_msg_title,
					function(yesNo) {
						if (yesNo) {
							$currentForm.clearChanges();
							$("#usrAlwdPortletGrid"+formID).trigger("reloadGrid", [{current: true}]);
							$("#usrAlwdPortletGrid"+$("#selectedGrid").val()).trigger("reloadGrid", [{current: true}]);
							return;
						} else {
							if(formID == "U")
								{
								ind = 1;
								}
							$("#portletsMainTabs").tabs("option", "selected", [ind]);
							return;
						}
					});
		}
}
function switchPendingDep(flag)
{
	$("#pendingUserPortletValidation").val(flag);
}
function saveAllwdPortletsDetails()
{
	//Bug 563469 Added checking on user dependency in order to handle asynchronous request.
	if($("#pendingUserPortletValidation").val() == "true")
	{
		_showErrorMsg(pending_usr_validation_key,info_msg_title);
		return;
	}
	var currSelection = $("#selectedGrid").val();
	if (!$("#usrAlwdPortletFrmId"+currSelection).hasChanges(true))
		return;
	var $allowedPortletGrid = $("#usrAlwdPortletGrid"+currSelection);
	if (!$allowedPortletGrid.jqGrid("checkRequiredCells"))
		return;
	_showProgressBar(true);
	var updates = $allowedPortletGrid.jqGrid("getChangedRowData");
	$("#gridUpdates"+currSelection).val(updates);
	var postParams = $("#usrAlwdPortletFrmId"+currSelection).serialize();
	var updateVal = $("#gridUpdates"+currSelection).val();
	if(updateVal!=null && updateVal!="" && updateVal!=undefined)
	{		
		$.post(jQuery.contextPath
				+ "/pathdesktop/portletAssignAction_saveAllowedPortlets",
				postParams, function(param) {
					_showProgressBar(false);
					//if the return type of the action is Json ( we have an error );
				if (typeof param["_error"] == null || param["_error"] == undefined) {
					$("#usrAlwdPortletGridU").trigger("reloadGrid");
					$("#usrAlwdPortletGridP").trigger("reloadGrid");
					$("#usrAlwdPortletGridD").trigger("reloadGrid");
					_showErrorMsg(record_was_Updated_Successfully_key,info_msg_title);
				   $("#usrAlwdPortletFrmId"+currSelection).clearChanges();
				}
			})		
	}
	else
	{
	  _showErrorMsg(changes_not_available_key,info_msg_title);
	  _showProgressBar(false);
	  return;	
	}
}
function allwdPrtltsCellChanged(rowObj)
{
	var CurrSelectedGrid = $("#selectedGrid").val();
	var selectedGrid = $("#usrAlwdPortletGrid"+CurrSelectedGrid);
	var cellID;
	
		if(CurrSelectedGrid == "P")
			{
			cellID = 'PORTLET_CODE';
			}
		else
			{
			cellID = 'USER_ID';
			}
	var selectedRowInd = rowObj.originalEvent.id
	
	if(selectedRowInd.indexOf("new_") < 0) // not new row  should be non editable
	{
		selectedGrid.jqGrid('setCellReadOnly', selectedRowInd, cellID, "true");
	}
}
var nice = false;
function appNiceScrl() 
{
	nice = $("#leftBarDiv").niceScroll();
}
var resizeTimer;
function bndDshBrdResize() 
{
	$(window).bind('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function()
	    {
	    	$("#dashTable").height($("#dashTable").parent().height())
	    	adjustHeights();
	    }
    , 220);
	});
}