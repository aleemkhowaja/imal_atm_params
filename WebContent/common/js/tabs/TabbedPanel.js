var _pageRef = "";
var dynScreenId = "";

$(function() 
{
	//handle the exception on menu opening and showing error popup
	$(this).ajaxSuccess(
			function(event, jqXHR, settings) {
				try {
					//Exclude Alerts request 
					if( settings != null 
							&& settings != undefined 
							&& (settings.async != undefined && settings.async != null && settings.async == true)
							&& (settings.url.toLowerCase() != undefined && settings.url.toLowerCase() != null 
									&& settings.url.toLowerCase().indexOf("path/AlertsAjaxServlet".toLowerCase()) >= 0 ))
					{
						//To exlude the alert ajax request from being treated in this function.
						//In alert mode, jqXHR.responseText is an XML text and should not be passed to parseJSON()
						return;
					}
					
					var data = $.parseJSON(jqXHR.responseText);
					if (typeof data["_menuInfo"] != "undefined" && data["_menuInfo"] != null) {
						/**
						 * #BUG 677752-Invalid window title when opening the send to /recieve from provider screens
						 */
						var _errorMsgTitle = error_msg_title;
						if(typeof data["_menuInfo"]._msgTitle !="undefined" && data["_menuInfo"]._msgTitle!=null && data["_menuInfo"]._msgTitle !="")
						{
							_errorMsgTitle = data["_menuInfo"]._msgTitle;
						}
						_showErrorMsg(data._menuInfo,_errorMsgTitle);
						var selected = $mainTabs.tabs("option", "selected");
						$mainTabs.tabs("remove", selected);
						tab_counter--;
						if (tab_counter == 0)
							showHide();
					}
				} catch (e) {
				}
			});
		
	var tab_counter = 0;//used as a tab counter
	/* To add New tabs -- window.addMenuTab is used in order to call the method from out side(menu)
	 * menuVar is the progRef which screen to open
	 * menuTitle is the title of the menu , if the menu is available and loded the teh title will be constructed automatically.
	 * appName is application Name 
	 * screenParentRef screen Parent Ref, 
	 * addParams String additional parameters for the screen if the function called within the developers code
	 * 		 example "linkCode=1&value=test&linkCo.theVO.value=5"
	 * menuId is the Id of the Menu being applied in HTML construction
	 */
	window.addMenuTab = function(menuVar,menuTitle,appName,screenParentRef,addParams,menuId) //function addMenuTab(menuVar,menuTitle)
	{
		_pageRef = menuVar;
		var theReferId = menuVar;
		if(menuId)
		{
			theReferId = menuId;
		}
		// PathSolutions (elie) - catching the menu node & its hierarchy up till the menu header
		var treeNode = $("span[menuVar='"+theReferId+"']");
		$(treeNode.parents("ul")).each(function(i)
		{
			if($(this).prev().is("a"))
			{
				menuTitle = $(this).prev().text() + " / " + menuTitle;
			}
			else if($(this).prev().is("h3"))
			{
				menuTitle = $(this).prev().text() + " / " + menuTitle;
			}
		});
		
		var tabNameExists = false;// boolean to determine whether a tab exist
		var existingTabIndex = 0;
		
		$(tabId + ' [class=tbClose]').each(function(i) // Getting the tab name
		{
	    	if ($(this).attr("menuVar") == menuVar) 
			{
	    		tabNameExists = true;
			    existingTabIndex = $( "li", $mainTabs ).index( $( this ).closest('li') ); // get the existing tab index if clicked again
			}
		});
		
		// if it s a leaf, go directly to the action else below
		 
		var url= tabOptions.url + "menuVar=" + menuVar;// preparing the server call
	 	if(appName && appName !== "")
	 	{
	 		url = url+"&ap_n="+appName;
	 	}
	 	
		if (!tabNameExists)// if no tab with same name exist
		{
			/***************************/
			if(tab_counter == 0)
				showHide();
			/***************************/
			//class='path-screen-openned' used upon running date change dialog opening to make sure that all screens are closed
			$mainTabs.tabs( "option", "tabTemplate", "<li class='path-screen-openned'><table cellpadding='0' cellspacing='0'><tr><td><a href='#{href}' id='#{label}' class='tbClose' menuVar='"+menuVar+"' highLightMenuVar='"+theReferId+"' parentRef='"+screenParentRef+"'>#{label}</a></td><td><span class='ui-icon ui-icon-close ui-icon-close-tabs-custom'>Remove Tab</span></td></tr></table></li>" );
			$mainTabs.tabs( "option", "panelTemplate", '<div class="ui-page"></div>' );//Added to give the tabs div height-George
			if(addParams)
			{
				$mainTabs.tabs( "option","ajaxOptions",{data:{ad_p:addParams}});
			}
			$mainTabs.tabs( "add",url,menuTitle,tab_counter);// + tab_counter
			$mainTabs.tabs('select', tab_counter); 
			tab_counter++;
			
			// removing the parameters from the menu so that if called again do not send same params
			if(addParams)
			{
				$mainTabs.tabs( "option","ajaxOptions",{data:{}});
			}
			
		}
		else
		{
			var currentTabIndex = $mainTabs.tabs('option', 'selected');// Get the current selected Tab index
			
			if (tabNameExists && existingTabIndex!=currentTabIndex)// if tab exists and not selected, then select it
			{
				$mainTabs.tabs('select', existingTabIndex);
			}
			//ask to reload tab after being selected
			_showConfirmMsg(tabOptions.reloadAlert + " " + menuTitle+"?",warning_msg_title,
				function(yesNo)
				{
					if (yesNo)
					{
						if(addParams)
						{
							$mainTabs.tabs( "option","ajaxOptions",{data:{ad_p:addParams},success:function(){_showProgressBar(false);},error:function(){_showProgressBar(false);}});
						}
						_showProgressBar(true);
						/**
						 * [MarwanMaddah]:reset the URL event in case the url doesn't change, to set the urlChanged flag "true" and relaod the screen
						 */
						$mainTabs.tabs("option","urlChanged",true);
						$mainTabs.tabs("load",existingTabIndex);//reload the tab
						$mainTabs.tabs("option","ajaxOptions",{data:{},success:function(){_showProgressBar(false);},error:function(){_showProgressBar(false);}});//resetting 
						
					}
				}
			);
		}
	};
	

	
	/***************************/
	function showHide()
	{
		if($(tabId).css('visibility') == 'hidden')
		{
			$(tabId).css('visibility','visible');
		}
		else
		{
			$(tabId).css('visibility','hidden');
			var appTitle = (typeof app_main_title == "undefined" || app_main_title == null)? app_title_not_defined : app_main_title;
			setTitleVal(appTitle);
		}
	}
	
	$mainTabs = null;
	var tabId = null;
	var tabOptions = {};
	
	window.intializeMainTabs = function (id, options)
	{
		//added because we removed the import of jquery-ui-1.8.7 from the path-head.ftl
		if(!$.struts2_jquery.loadAtOnce)
			$.struts2_jquery.require( [ "js/base/jquery.ui.widget" + $.struts2_jquery.minSuffix + ".js", "js/base/jquery.ui.tabs" + $.struts2_jquery.minSuffix + ".js" ]);
		
		var tabtoReload = -1;
		tab_counter = 0;
		tabId = "#" + id;
		if(options)
		{
		 tabOptions = options;
		}
		
		
		$mainTabs = $(tabId).tabs
		({
			cache: true,
			// callback function to select the last added tab automatically
			add: function(event, ui)
			{
				_pageRef  = $(ui.tab).attr("menuVar");
				parentRef = $(ui.tab).attr("parentRef");
				setTitleVal($(ui.tab).html());
				
				//[PathSolutions] jquery-3.3.1 migration - point 18 - escape # in selector inside tabbedpanel.js
			    $mainTabs.tabs('select', '\\#' + ui.panel.id); 
			    //End PathSolutions
			    
			    var themeName = (window["globalThemeName"] === undefined || window["globalThemeName"] == "" )? "Cupertino":globalThemeName;
					themeName = themeName.toLowerCase();
				var contentDiv = '<div class="progBarContent">' +
				'<img src="'+ jQuery.contextPath+ '/common/style/images/progressImages/' + themeName+ '_Image.gif"'+
				'</div>';
			
				
				$('#' + ui.panel.id).html("<table width='100%' height='" + $mainTabs.height() + "'><tr><td>"+contentDiv+"</td></tr></table>");
				var hMenuVar = $(ui.tab).attr("highLightMenuVar"); 
				changeSelectedMenuStyle(hMenuVar,parentRef,true);
				//_showProgressBar(true);// [Libin] Added to show Progress Icon On Menu Click(Need to set off in corresponding loaded page on Doc. Ready function)
			},
			select: function(event, ui) 
			{
				_pageRef  = $(ui.tab).attr("menuVar");
				if(typeof $("#screen_id_"+_pageRef) !="undefined" && $("#screen_id_"+_pageRef)!=null && $("#screen_id_"+_pageRef).val() != null && $("#screen_id_"+_pageRef).val()!="undefined" && $("#screen_id_"+_pageRef).val()!=undefined)
				{
					dynScreenId = $("#screen_id_"+_pageRef).val();
				}
				parentRef = $(ui.tab).attr("parentRef");
				var hMenuVar = $(ui.tab).attr("highLightMenuVar"); 
				changeSelectedMenuStyle(hMenuVar,parentRef,true);
				
				setTitleVal($(ui.tab).html());
				// To show loading in the tab while the tab loads
				//if($.data(ui.tab, 'load.tabs')) 
			    	//{
	             		//$(ui.panel).html("Loading...");
			    	//}
				
				if(ui.index == tabtoReload)// Explicitly we can set the tab to reload from any where by specifying the needed tab index in  tabtoReload
				{
					// Explicitly disabling cache for a particular tab will make the tab to reload
					var currentTabAnchor = $(tabId).data('tabs').anchors[tabtoReload];
					$(currentTabAnchor).data('cache.tabs', false);
					//$mainTabs.tabs("load",tabtoReload);
				}
		     }
		});
		
		$mainTabs.scroll(function()
		{
			//hiding datepicker div on scroll
			if(!$("#ui-datepicker-div").is(":hidden") )
			{
				$("#ui-datepicker-div").hide();
			}
			
			//hiding hijri datepicker div on scroll
			if(!$("#ui-hijridatepicker-div").is(":hidden") )
			{
				$("#ui-hijridatepicker-div").hide();
			}
			
			//hiding livesearch dialogs on scroll			
			$(".liveSearchOverlay").each(function(i)
			{
				if(!$(this).is(":hidden") )
					$(this).hide();
			});
		});

		_bindCloseClickEvent();
	};

	function _bindCloseClickEvent()
	{
		// Close the tab on clicking Remove icon
		$( tabId + " span.ui-icon-close" ).live( "click", function() 
		{
			var $li         = $( this ).closest('li');
			var index       = $( "li", $mainTabs ).index(  $( this ).closest('li') );
			var $anch       = $($li.find( "a" )[0]);
			var menuVar     = $anch.attr("menuVar");
			var parentRef   = $anch.attr("parentRef");
			var hMenuVar = $anch.attr("highLightMenuVar"); 
			var hrefId      = $anch.attr("href");
			var formChanged = false;
			if(typeof hrefId != "undefined" && hrefId != null)
			{
				var $divTab = $(hrefId );  
				var $forms = $divTab.find("form");
				var $iframeExternal = $divTab.find("iframe");
				var _form;
				$forms.each(function(i){ //loop on all forms inside a tab, if one is changed within the tab give warning
					_form = this;
					formChanged =  $(this).hasChanges();//$(this).trackChanges();
					 if(formChanged )
					 {
						 return false; //quit the loop .each
					 }
				});
				//this property is set from postmessage plugin in case external screen
				if($iframeExternal.html() != null && $.data(document.getElementById($iframeExternal.attr("id")),"iframeEltChanged") === true)
				{
						formChanged = true;
				}
				
				if(!formChanged)
				{
					/**
					 * [PathSolution-MarwanMaddah]: To remove path-selected-menu class on tab close
					 * @param {Object} theVal
					 * @return {TypeName} 
					 */
					 changeSelectedMenuStyle(hMenuVar,parentRef,false);
					 doCloseTab(index);

				}
				else
				{
					_showConfirmMsg(changes_made_confirm_msg,confirm_msg_title,function(theVal)
						{
							if(theVal)
							{
								/**
								 * [PathSolution-MarwanMaddah]: To remove path-selected-menu class on tab close
								 * @param {Object} theVal
								 * @return {TypeName} 
								 */
								 changeSelectedMenuStyle(hMenuVar,parentRef,false);
								 
								 doCloseTab(index);
								$.data(_form,"changeTrack",false);
								return false;
							}
						});
				}
			}
			 else
			 {
				/**
				 * [PathSolution-MarwanMaddah]: To remove path-selected-menu class on tab close
				 * @param {Object} theVal
				 * @return {TypeName} 
				 */
				 changeSelectedMenuStyle(hMenuVar,parentRef,false);
				 doCloseTab(index);
			 }
			

		});
	}
	
	function doCloseTab(index)
	{
//			var index = $( "li", $mainTabs ).index( $this.closest('li') );
		    var msg = tabOptions.closeAlert;
			if(!msg)
			{
				msg = "Close Tab";
			}
			$mainTabs.tabs( "remove", index );
			tab_counter--;
			
			if(tab_counter == 0)
			{
				showHide();
				_pageRef = "";
				dynScreenId = "";
			}

	}
	
	function setTitleVal(theTitle)
	{
		$('title').remove();
		$('head').append('<title>'+theTitle+'</title>');
	}
	
	// Khaled: Add additional path-selected-menu class (that was added during the customization of themes)
	var addSelectedMenuCss = "path-selected-menu";
	selectedMenuCss = "path-selected-menu-";
	selectedMenuCss += (typeof themeName != "undefined" && themeName != "") ? themeName : "cupertino";  
	
	/**
	 * [PathSolutions-MarwanMaddah]: add path-selected-menu class to the selected menu and its hierarchy up till the menu header
	 *                               in case of add or select menu
	 *                               and remove path-selected-menu in case of tab close
	 * @memberOf {TypeName} 
	 */
	function changeSelectedMenuStyle(menuVar,parentProgRef,addSelected)
	{
		if(addSelected)
		{
			// to remove previusly selected menu style
			$("a").removeClass(selectedMenuCss).removeClass(addSelectedMenuCss);
			$("h3").removeClass(selectedMenuCss).removeClass(addSelectedMenuCss);
			
			//add style to the current menu 
		    $("a[id='"+menuVar+"']").addClass(selectedMenuCss).addClass(addSelectedMenuCss);
		}
		else
		{
			// check if closing Menu is highlighted
			var isCloseMenHighlighted = $("a[id='"+menuVar+"']").hasClass(selectedMenuCss);
			if(isCloseMenHighlighted)
			{
				$("a[id='"+menuVar+"']").removeClass(selectedMenuCss).removeClass(addSelectedMenuCss);	
			}
			else
			{
				// do not proceed to parents highligt remove since closing menu is not the one currently highghlighted
				return;
			}
		}
		var treeNode = $("span[menuVar='"+menuVar+"']");
		if((treeNode.html()=="" || treeNode.html()==null || treeNode.html()=="null") && parentProgRef!=null && parentProgRef!="undefined" && parentProgRef!="")
		{
			if(addSelected)
			{				
			   	$(".a_"+parentProgRef).addClass(selectedMenuCss).addClass(addSelectedMenuCss);
			   	$(".h3_"+parentProgRef).addClass(selectedMenuCss).addClass(addSelectedMenuCss);
			}
			else
			{
		   		$(".a_"+parentProgRef).removeClass(selectedMenuCss).removeClass(addSelectedMenuCss);
			   	$(".h3_"+parentProgRef).removeClass(selectedMenuCss).removeClass(addSelectedMenuCss);
			}
		   	selectUnselectParents($(".a_"+parentProgRef),addSelected);
		   	selectUnselectParents($(".h3_"+parentProgRef),addSelected);
		}
		else
			selectUnselectParents(treeNode,addSelected);
	}	
	
	function selectUnselectParents(treeNode,addSelected)
	{
		var parentHtml = treeNode.parents("ul").html(); 
		if(parentHtml!=null && parentHtml!=undefined && parentHtml!="")
		{
			if(addSelected)
			{
				treeNode.parent("a").addClass(selectedMenuCss).addClass(addSelectedMenuCss);
				treeNode.siblings("[class *='a_']").addClass(selectedMenuCss).addClass(addSelectedMenuCss);
			}
			else
			{
				treeNode.parent("a").removeClass(selectedMenuCss).removeClass(addSelectedMenuCss);
				treeNode.siblings("[class *='a_']").removeClass(selectedMenuCss).removeClass(addSelectedMenuCss);
			}
			$(treeNode.parents("ul")).each(function(i)
			{
				var a_sibs = $(this).siblings("[class *='a_']");
				var h3_sibs = $(this).siblings("[class *='h3_']");
				if(addSelected)
				{
					a_sibs.addClass(selectedMenuCss).addClass(addSelectedMenuCss);
					h3_sibs.addClass(selectedMenuCss).addClass(addSelectedMenuCss);
				}
				else
				{
					a_sibs.removeClass(selectedMenuCss).removeClass(addSelectedMenuCss);
					h3_sibs.removeClass(selectedMenuCss).removeClass(addSelectedMenuCss);
				}
			});
		}
		/**
		 * [pathSolution-MarwanMaddah]: in case the menu is without parent (ex:360 degree screen)
		 */
		else
		{
			if(addSelected)
			{					
			    treeNode.parents("h3").addClass(selectedMenuCss).addClass(addSelectedMenuCss);
			}
			else
			{
			  	treeNode.parents("h3").removeClass(selectedMenuCss).removeClass(addSelectedMenuCss);
			}
		}
	}
});
