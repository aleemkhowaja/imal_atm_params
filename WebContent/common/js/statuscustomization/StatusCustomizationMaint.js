function statusCust_setMethodName(methodValue)
{
  $("#submitMethodName").val(methodValue);	
}
function statusCustomizationMaint_processSubmit()
{
	var methodName = $("#submitMethodName_"+_pageRef).val();
	if(methodName != 'delete')
	    {
	       statusCust_submit(true,{methodName:methodName})
	    }
	else
		{
		   _showConfirmMsg(Confirm_Delete_Process_key, Warning_key,
				            statusCust_submit, {methodName : methodName});
		}
}
function statusCust_submit(confirm,args)
{
	if (confirm)
	{
		var methodName = args.methodName;
		
		var ivCrud = $("#stsCustIv_crud_"+_pageRef).val();
		
		var localActionType = $("#stsCustActionType_"+_pageRef).val();
		if (ivCrud=='R' && methodName!='delete')
		{
			methodName = localActionType;
		}
		
		parseNumbers();
		var reloadPath = jQuery.contextPath+"/path/statusCustomization/StatusCustomizationMaintAction_initialize?iv_crud="+ivCrud+"&_pageRef="+_pageRef;
		var theForm = $("#statusCustomizationMaintFormId_"+_pageRef).serialize();
		
		_showProgressBar(true);
		 $.ajax({
			 url: jQuery.contextPath+"/path/statusCustomization/StatusCustomizationSubmit_"+methodName,
	         type:"post",
			 dataType:"json",
			 data: theForm,
			 success: function(data){
			 _showProgressBar(false);
			     if(typeof data["_error"] == "undefined" || data["_error"] == null)
			     {	 
	               $("#statusCustomizationListMaintDiv_id_"+_pageRef).load(reloadPath);
	               if($("#statusCustomizationListGridTbl_Id_"+_pageRef).html()!=null && $("#statusCustomizationListGridTbl_Id_"+_pageRef).html()!="")
	               {
	                 $("#statusCustomizationListGridTbl_Id_"+_pageRef).trigger("reloadGrid");
	               }
	             } 
			 }
	    });
		return false;
	}
}

function statusCust_openStatusCustomization()
{
	var	statusCustDiv = $("<div id='statusCust_div'/>");
	statusCustDiv.css("padding","0");
    $("body").append(statusCustDiv);
    curParams = {_pageRef:_pageRef};
    _showProgressBar(true);
    var srcURL = jQuery.contextPath+"/path/statusCustomization/StatusCustomizationMaintAction_loadStatusCustomizationPage?iv_crud=R";
    var _dialogOptions = {modal:true, 
                          title:status_cust_key,
                       autoOpen:false,
                           show:'slide',
                       position:'center', 
                          width:returnMaxWidth(750),
                         height:returnMaxHeight(450),
                        buttons:{
	                             ok:function(){
    	                             $(this).dialog("close");
    	                         }
                                },
	                      close: function (){
                                	 var stsGridtab = "gridtab_lovType_"+_pageRef;
                                	 var $stsGrid   = $(document.getElementById(stsGridtab));
                                	 if($stsGrid !=null && $stsGrid.length > 0)
                                	 {
                                		$grid.jqGrid('setPostDataItem',"selectedRows",null); 
                                	 }
    	                             $(this).dialog("destroy");
    	                             $(this).remove();
								}};
    $("#statusCust_div").load(srcURL, curParams,function(){_showProgressBar(false);});
    $("#statusCust_div").dialog(_dialogOptions);
    $("#statusCust_div").dialog("open");
}
/**
 * 
 * @param {Object} theFormId
 * @memberOf {TypeName} 
 */
function statusCust_openMenuTree(theFormId)
{
	var	treeMenuDiv = $("<div id='treeMenu_div'/>");
	treeMenuDiv.css("padding","0");
    var theForm = $("#"+theFormId+"_"+_pageRef);

    var theParams = {};
    theParams.appName = $("#APP_NAME_"+_pageRef).val();
    theParams.progRef = (appName!=null && appName!="" && appName!="undefined")?"ROOT":_pageRef;
    
    $("#statusCustomizationMaintFormId_"+_pageRef).append(treeMenuDiv);
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
	                                     if(statusCust_onTreeMenuSelection())
	                                     {    	                                    	 
	                                        $(this).dialog("close");
	                                     }}
	                	    	 ,cancel: function(){
	                	    		 $(this).dialog("destroy");
	                	    		 $(this).remove();
	                	    		 }
                                },
	                      close: function (){
	 								           var theDialog = $(this);
	 								           theDialog.remove();
								}};
    $("#treeMenu_div").load(srcURL, curParams,function(){_showProgressBar(false);});
    $("#treeMenu_div").dialog(_dialogOptions);
    $("#treeMenu_div").dialog("open");
}

function statusCust_selectScreenMenuFromTree()
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
function statusCust_onTreeMenuSelection()
{
	var selectedObj = statusCust_selectScreenMenuFromTree();
	if(!selectedObj)
	{
		return false;
	}
	$("#screenLocation_"+_pageRef).val(selectedObj["desc"]);
	$("#PROG_REF_"+_pageRef).val(selectedObj["progRef"]);
	$("#screenLocation_"+_pageRef).val(selectedObj["desc"]);
	return true;
}