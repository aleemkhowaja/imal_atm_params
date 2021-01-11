var cachedMenu=new Array();
	var iCachedMenuCount=0;
	var isRtl;
	var script;
	
		
	$(document).ready(function(){	
		isRtl=(document.dir == "rtl");
		loadInitialMenu();	
	});
	
	
	
	function loadInitialMenu()
	{
		var hMenuId = $('ul.jd_menu').attr('id');
		var hActionName=$('ul#'+hMenuId).attr('hActionName');
		var hTargetName=$('ul#'+hMenuId).attr('hTargetName');
		var scrollSize=$('ul#'+hMenuId).attr('scrollSize');
		var targetLoadAction=$('ul#'+hMenuId).attr('targetLoadAction');
		var actionName=hActionName+"?actionName="+hActionName+"&targetName="+hTargetName+"&scrollSize="+scrollSize+"&id="+hMenuId+"&targetLoadAction="+targetLoadAction;
		
		$.ajax({ 
			url: jQuery.contextPath+"/"+actionName, //path to external menu file
			error:function(ajaxrequest){
				alert('Error fetching content. Server Response: '+ajaxrequest.responseText)
			},
			success:function(content)
			{
				 
				content=(content=="")? " " : content //if returned content is empty, set it to "space" is content no longer returns false/empty (hasn't loaded yet)
				jQuery(document).ready(function($)
				{								
					$('ul#'+hMenuId).html(content);	
					//$('ul#'+menuId).jdMenu();
					initializeMenu('ul#'+hMenuId);
										
				})				
					
			}
		})
		
	}// loadInitialMenu	
	
	function loadSublevelMenu(actionName,menuid,event)
	{
		 
		var hMenuId = $('ul.jd_menu').attr('id');
		var hActionName=$('ul#'+hMenuId).attr('hActionName');
		var hTargetName=$('ul#'+hMenuId).attr('hTargetName');
		var scrollSize=$('ul#'+hMenuId).attr('scrollSize');
		var targetLoadAction=$('ul#'+hMenuId).attr('targetLoadAction');
		var actionName=hActionName+"?actionName="+hActionName+"&targetName="+hTargetName+"&scrollSize="+scrollSize+"&id="+hMenuId+"&targetLoadAction="+targetLoadAction+"&menuId="+menuid;
		//alert(actionName);
		// if menu is loaded for the first time
		//alert("menuid : "+menuid+" cachedMenu[menuid] : "+cachedMenu[menuid]+" cachedMenu.length : "+cachedMenu.length);
		if(!cachedMenu[menuid] || menuid==''){
			
			$.ajax({ 
				url: jQuery.contextPath+"/"+actionName, //path to external menu file
				error:function(ajaxrequest){
					alert('Error fetching content. Server Response: '+ajaxrequest.responseText)
				},
				success:function(content)
				{
					
					content=(content=="")? " " : content //if returned content is empty, set it to "space" is content no longer returns false/empty (hasn't loaded yet)
					
					$('ul#'+menuid).append(content);
					jQuery(document).ready(function($)
					{
						//$('ul#'+menuId).jdMenu();
						initializeMenu('ul#'+hMenuId);
					})
					cachedMenu[menuid]=content;		// adding loaded menu content to cache 
				}
			})
		}
		else // display content from cache
		{			
			$('ul#'+menuid).css("display:block");	
			//$('ul#'+menuid).jdMenu();
			
			initializeMenu('ul#'+hMenuId);
		}
		
	}// loadSublevelMenu	
	
	
	function loadTarget(aTag,actionURL,targetDiv)
	{	
		 
		var hMenuId = $('ul.jd_menu').attr('id');
		$("#"+targetDiv).load(actionURL);
		$("#"+hMenuId).css("display","block");
	}
	
			
	// SCROLL FUNCTIONS GOES HERE
		
	var arrRootMenuData=new Array();
	
	function scrollMenu(currPos,dir)
	{
		var hMenuId = $('ul.jd_menu').attr('id')	
		var scrollSize= parseInt($('ul#'+hMenuId).attr('scrollSize'));
		var limit=0;
		var showNextBtn = false;
		var showPrevBtn = false;
		
		if(dir=="n")
		{			
			showPrevBtn = true;
			limit = currPos + scrollSize;
			if(limit<arrRootMenuData.length)	
			{
				showNextBtn = true;				
			}	
			else
			{
				limit = arrRootMenuData.length;
			}				
		}
		else
		{
			showNextBtn = true;			
			if(currPos==arrRootMenuData.length && currPos%scrollSize>0)
			{
				var tempVal=0;
				tempVal=currPos%scrollSize;
				limit = currPos - tempVal;
				currPos = limit - scrollSize;
			}
			else
			{			
				limit = currPos - scrollSize;
				currPos = limit - scrollSize;
			}			
			if(currPos>=scrollSize)	
				showPrevBtn = true;
		}
		var htmlString = "";
		var menuName;
		var menuVar;
		var leaf=false;
		var url;
		var targetName;
		 
		for(;currPos<limit;currPos++)
		{
			
			menuName = arrRootMenuData[currPos]["NAME"];			
			menuVar = arrRootMenuData[currPos]["MENU_VAR"];
			leaf = arrRootMenuData[currPos]["LEAF"];
			url = arrRootMenuData[currPos]["URL"];
			targetName = arrRootMenuData[currPos]["TARGET_NAME"];	
			 
			htmlString += '<li class="ui-state-focus ui-corner-all ">';
			
			if(leaf=='true')
			{
				htmlString += '<a class=""onclick="javascript:'+arrRootMenuData[currPos]["LEAF_ONCLICK"]+'" >'+menuName+'</a>';			}
			else
			{				
				htmlString += '<a href="#" class="accessible" onclick="loadSublevelMenu(\''+url+'\',\''+menuVar+'\',event);">'+menuName+'&nbsp;&nbsp;&raquo;</a>';				
				htmlString += '<ul id="'+menuVar+'">';	
				htmlString += '</ul>';
			}
			htmlString += '</li>';		
		}
		
		if(showPrevBtn)
		{			
			htmlString = '<li class="prevNavLi ui-state-focus ui-corner-all"><span id="prevNav" onclick="scrollMenu('+currPos+',\'p\');" >&nbsp;</span></li>' + htmlString;			
		}
		if(showNextBtn)
		{
			htmlString += '<li class="nextNavLi ui-state-focus ui-corner-all">';
			htmlString += '<span id="nextNav"  onclick="scrollMenu('+currPos+',\'n\');" >&nbsp;</span>';
			htmlString += '</li>';
		}
		
		// replace new set of menus
		cachedMenu.length=0;
		iCachedMenuCount=0;
		
		$("#"+hMenuId).html(htmlString);		
		jQuery(document).ready(function($)
		{
			//$("#"+menuId).jdMenu();
			initializeMenu("#"+hMenuId);
		})
	}//
	
	function initializeMenu(menuId)
	{
		
		//load navigation images
		var className="ui-icon ui-icon-seek-next";
		if(isRtl)
			className="ui-icon ui-icon-seek-prev";
		$("span#nextNav").each(function(){
			$("span#nextNav").attr('class',className);		
			
		});
		
		className="ui-icon ui-icon-seek-prev";
		if(isRtl)
			className="ui-icon ui-icon-seek-next";
		$("span#prevNav").each(function(){
			$("span#prevNav").attr('class',className);
			
		});
		//alert(menuId);
		$(menuId).jdMenu();
		
	}