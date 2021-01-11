/**
 * @Auther:Raed Saad
 * @Date:MARCH 2018
 * @Team: PEMTS JAVA Team.
 * @copyright: PathSolution 2018
 * @User Story: USER STORY #653853  WSDL explorer
 **/
			
	function onMappingFieldChange(e)
	{
		var str = e.currentTarget.id;
		var seq = "_mappingValue_"+_pageRef;
	    var idArr = str.split(seq);
	    var rowId = idArr[0];
	    var selector = idArr[0] + "_value";
	    var selectedValue = e.currentTarget.value;
	    //TODO
	    var grid = $('#webServiceGuiTbl_Id_'+_pageRef);
		var subGrid   = "webServiceGuiTbl_Id_"+_pageRef+"_"+rowId+"_table";
	    if("undefined" == selectedValue || "" == selectedValue)
	    {
	    	grid.jqGrid('setCellReadOnly', rowId, 'value',"false");
	    }
	    else{
	    	grid.jqGrid('setCellReadOnly', rowId, 'value',"true");
	        $("#"+selector).val(selectedValue);
	      //  grid.jqGrid("setCellValue",rowId, "value", selectedValue);
	    }
	}
	
	/**
	 * @description function called upon changing the enum drop down list
	 * @param e
	 * @returns
	 */
	function onEnumerationFieldChange(e)
	{
		var str = e.currentTarget.id;
		var seq = "_";
	    var idArr = str.split(seq);
	    var len = idArr[idArr.length-1];
	    var rowId;
	    if(undefined != str)
	    {
	    	rowId = str.replace("_"+len,"");	    	
	    }	    
	    var selector = rowId + "_value";
	    var selectedValue = e.currentTarget.value;
	    //TODO
	    var grid = $('#webServiceGuiTbl_Id_'+_pageRef);
	    var gridId = getGridIdFromRow(rowId);
	    grid = $("#"+gridId);
	    $("#"+selector).val(selectedValue);
        grid.jqGrid("setCellValue",rowId, "value", selectedValue);
	}
	
	function returnGridSelectedRows(grid)
	{
//		var selector = grid.selector;
//		selector = selector + " >tbody";
//		var selectedRow = $(selector).children("tr.ui-state-highlight")[0];
//		var selectedRowIds;
//		var numOfSelectedRows = selectedRow.lengh;
//		for(var i = 0;i < numOfSelectedRows ; i++)
//		{
//			//selectedRowIds[i] = selectedRow.id;
//			selectedRowIds.push(selectedRow.id);
//		}
//		return selectedRowIds;
		return null;
	}
	
	/**
	 * @author Raed Saad
	 * @Description this recursive function will load grid / subgrid / sub sub grid ... rows
	 * */
	function loadSelectedRows(grid)
	{
		if($("#jsonCommonFields_"+_pageRef).length == 0)
		{			
			generateJSONCommonFields();
		}
		//var selectedRows = grid.jqGrid('getGridParam', 'selarrrow');
		var selectedRows = getGridSelectedRows(grid.selector)
		selectedRows = reOrderSelectedRows(grid,selectedRows);
		if(undefined == selectedRows)
		{//incase we have a selected list row object that is not opened
			return "";
		}
		//TODO
		var mainGrid = "#webServiceGuiTbl_Id_"+_pageRef;
		var requestData = null;
		var json = null;
		var prevGrid = null;
		var prevGridParentRow = null;
		var custom_arr1 = [];
		var gridSelectedRows = [];
		var gridSelector = grid.id;
		var commonFields = $("#jsonCommonFields_"+_pageRef).val();
		var pwsMappingDialog = $("#pwsMappingDialogName").val();
		if(""!= commonFields && undefined != commonFields && pwsMappingDialog == "pwsMappingDialog")
		{
			gridSelectedRows.push(commonFields);
			$("#jsonCommonFields_"+_pageRef).val("")
		}
		$.each(selectedRows,function(i,v)
		{
			var rowData =  grid.jqGrid("getRowData", v);
			var id = rowData["ID"];
			if(id == "")
			{
				id = v;
			}
			var fieldName = rowData["fieldName"];
			var fieldType = rowData["fieldType"];
			var restriction = rowData["restriction"];
			var nillable = rowData["nillable"];
			var mappingField = rowData["mappingField"];
			var expressionHiddenField = rowData["expressionHiddenField"];
			if(undefined == expressionHiddenField || "undefined"== expressionHiddenField)
			{
				expressionHiddenField = ""
			}
			if(undefined != mappingField && ""!= mappingField)
			{
				mappingField = mappingField.trim();
			}
			//var mappingField = returnSelectValue(v,"mappingField");
			if(mappingField == undefined || mappingField == "undefined")
			{
				mappingField == "";
			}
			if(fieldName == "")
			{
				fieldName = fieldType;
			}			
			var parentRowId = returnSubGridRowParentRowId(v);
			if(undefined != parentRowId && null != parentRowId)
			{
				var parentGrid = $("#"+getGridIdFromRow(parentRowId));
				var parentGridRowData = parentGrid.jqGrid("getRowData", parentRowId);
				var parentFieldType = parentGridRowData["fieldType"];
				var parentFieldName = parentGridRowData["fieldName"];
				if(parentFieldType == 'List<'+fieldType+'>')
				{
					fieldName = parentFieldName;
				}
			}
			var value = rowData["value"];
			var hashChildren = rowData["hasChildren"];	
			var type = checkForType(fieldType);		
			if(type == "List<Object>")
			{
				var objectName = null;
				objectName = fieldType.replace("List<","");
				objectName = objectName.replace(">","");
	//			var gridSelector = grid.selector.replace("_"+v+"_table","");
	//			var subGrid = $(gridSelector.replace("_table","")+"_"+v+"_List_table");
				var subGrid = $(mainGrid+"_"+v+"_List_table");
				json = 
					  "{\"ID\""+":"+"\""+id+"\""+","
					  +
					  "\"fieldName\""+":"+"\""+fieldName+"\""+","
					  +
					  "\"fieldType\""+":"+"\""+fieldType+"\""+","
					  +
					  "\"restriction\""+":"+"\""+restriction+"\""+","
					  +
					  "\"nillable\""+":"+"\""+nillable+"\""+","
					  +
					  "\"value\""+":"+"\""+value+"\""+","
					  +
					  "\"mappingField\""+":"+"\""+mappingField+"\""+","
					  +
					  "\"expressionHiddenField\""+":"+"\""+expressionHiddenField+"\""+","
					  +
					  "\"list\""+":"+"\"\""+","
					  +
					  "\"map\""+":"+"\"\""+","
					  +
					  "\"reqResCO\""+":"+ " \"\" " + ","
					  +
					  "\"lstInReqRes\""+":"+"["+loadSelectedRows(subGrid)+"]" +"}";
			}
			else if(type == "List")
			{
				//list
				var val = null;
				var list = "";
				//TODO
				var listGrid = $("#webServiceGuiTbl_Id_"+_pageRef+"_"+v+"_List_table");
				var listGridSelectedRows = listGrid.jqGrid('getGridParam', 'selarrrow');
				if(undefined == listGridSelectedRows)
				{
					val = "";
					list = list + "\""+val+"\",";
				}
				else{
					$.each(listGridSelectedRows,function(i,v)
							{
								val = listGrid.jqGrid ('getCell', v , 'value');
								list = list + "\""+val+"\",";
							}
							);
				}
				list = list.substring(0, list.length-1);
				json =  "{\"ID\""+":"+"\""+id+"\""+","
				  +
				  "\"fieldName\""+":"+"\""+fieldName+"\""+","
				  +
				  "\"fieldType\""+":"+"\""+fieldType+"\""+","
				  +
				  "\"restriction\""+":"+"\""+restriction+"\""+","
				  +
				  "\"nillable\""+":"+"\""+nillable+"\""+","
				  +
				  "\"value\""+":"+"\""+value+"\""+","
				  +
				  "\"mappingField\""+":"+"\""+mappingField+"\""+","
				  +
				  "\"expressionHiddenField\""+":"+"\""+expressionHiddenField+"\""+","
				  +
				  "\"list\""+":"+"["+list+"]"+""+","
				  +
				  "\"map\""+":"+"\"\""+","
				  +
				  "\"reqResCO\""+":"+ " \"\" " + ","
				  +
				  "\"lstInReqRes\""+":"+" \"\" " +"}";	
			}		
			else if(type == "HashMap")
			{
				//map
				var key = null;
				var val = null;
				var map = "";
				//TODO
				var hashGrid = $("#webServiceGuiTbl_Id_"+_pageRef+"_"+v+"_HashMap_table");
				var hashGridSelectedRows = hashGrid.jqGrid('getGridParam', 'selarrrow');
				if(undefined == hashGridSelectedRows)
				{
					key = "";
					val = "";
					map = map + "\""+ key+ "\""+":"+"\""+val+"\""+",";
				}
				else
					{
						$.each(hashGridSelectedRows,function(i,v)
							{
								key = hashGrid.jqGrid ('getCell', v , 'fieldName');
								val = hashGrid.jqGrid ('getCell', v , 'value');
								map = map + "\""+ key+ "\""+":"+"\""+val+"\""+",";
							}
						);
					}
				map = map.substring(0, map.length-1);
				json =  "{\"ID\""+":"+"\""+id+"\""+","
				  +
				  "\"fieldName\""+":"+"\""+fieldName+"\""+","
				  +
				  "\"fieldType\""+":"+"\""+fieldType+"\""+","
				  +
				  "\"restriction\""+":"+"\""+restriction+"\""+","
				  +
				  "\"nillable\""+":"+"\""+nillable+"\""+","
				  +
				  "\"value\""+":"+"\""+value+"\""+","
				  +
				  "\"mappingField\""+":"+"\""+mappingField+"\""+","
				  +
				  "\"expressionHiddenField\""+":"+"\""+expressionHiddenField+"\""+","
				  +
				  "\"list\""+":"+"\"\""+","
				  +
				  "\"map\""+":"+"{"+map+"}"+""+","
				  +
				  "\"reqResCO\""+":"+"\"\"" + ","
				  +
				  "\"lstInReqRes\""+":"+"\"\"" +"}";			
			}
			if("1" == hashChildren)
			{		
			//	var subGrid = $(grid.selector.replace("_table","")+"_"+v+"_table");	
				var subGrid = $(mainGrid+"_"+v+"_table");
				json = 
					  "{\"ID\""+":"+"\""+id+"\""+","
					  +
					  "\"fieldName\""+":"+"\""+fieldName+"\""+","
					  +
					  "\"fieldType\""+":"+"\""+fieldType+"\""+","
					  +
					  "\"restriction\""+":"+"\""+restriction+"\""+","
					  +
					  "\"nillable\""+":"+"\""+nillable+"\""+","
					  +
					  "\"value\""+":"+"\""+value+"\""+","
					  +
					  "\"mappingField\""+":"+"\""+mappingField+"\""+","
					  +
					  "\"expressionHiddenField\""+":"+"\""+expressionHiddenField+"\""+","
					  +
					  "\"list\""+":"+"\"\""+","
					  +
					  "\"map\""+":"+"\"\""+","
					  +
					  "\"reqResCO\""+":"+"["+loadSelectedRows(subGrid)+"]" + ","
					  +
					  "\"lstInReqRes\""+":"+"\"\"" + "}";
			}
			else if(type != "List<Object>" && type != "HashMap" && type != "List"){
				json = 
					  "{\"ID\""+":"+"\""+id+"\""+","
					  +
					  "\"fieldName\""+":"+"\""+fieldName+"\""+","
					  +
					  "\"fieldType\""+":"+"\""+fieldType+"\""+","
					  +
					  "\"restriction\""+":"+"\""+restriction+"\""+","
					  +
					  "\"nillable\""+":"+"\""+nillable+"\""+","
					  +
					  "\"value\""+":"+"\""+value+"\""+","
					  +
					  "\"mappingField\""+":"+"\""+mappingField+"\""+","
					  +
					  "\"expressionHiddenField\""+":"+"\""+expressionHiddenField+"\""+","
					  +
					  "\"list\""+":"+"\"\""+","
					  +
					  "\"map\""+":"+"\"\""+","
					  +
					  "\"reqResCO\""+":"+"\"\"" + ","
					  +
					  "\"lstInReqRes\""+":"+"\"\"" +"}";
			 }		
			gridSelectedRows.push(json);
		}	
		);	
		return gridSelectedRows.toString();
	}
	
	/**
	 * @description function that convert the common fields entered by the user into a json string
	 * and it will save them in a hidden field having the id jsonCommonFields_pageRef
	 * @returns
	 */
	function generateJSONCommonFields()
	{
		var fId = "jsonCommonFields_"+_pageRef;
		var fName = 'jsonCommonFields_name'+_pageRef;
		var formId = 'webServiceGuiGridForm_'+_pageRef;
		var fValue = returnJSONCommonFields();
		var listOfHiddenFields = document.createElement('div');
		var hField = null;
		hField = returnHiddenField(fId,fName,fValue);
		listOfHiddenFields.appendChild(hField);
		createHiddenFields(formId,listOfHiddenFields);
		var comFields = $("#jsonCommonFields_"+_pageRef).val();
		if(undefined == comFields || "" == comFields)
		{
			 $("#jsonCommonFields_"+_pageRef).val(fValue);
		}
	}
	
	/**
	 * @description function to load webservice common files defined in the lookup
	 * @returns
	 */
	function returnJSONCommonFields()
	{
		var arr = [];	
		var channelId = $("#lookuptxt_channel_id_"+_pageRef).val();
		var userID = $("#pws_user_id_"+_pageRef).val();
		var hashKey = $("#hash_key_id_"+_pageRef).val();
		var hostName = $("#host_name_id_"+_pageRef).val();
		var langId = $("#langId_"+_pageRef).val();
		var password = $("#pws_password_id_"+_pageRef).val();
		var requesterTimeStamp = $("#current_time_stamp_"+_pageRef).val();
		var obj1 = returnJSONStringObject("channelID","channelID","string","",channelId,"","","","");
		var obj2 = returnJSONStringObject("hashKey","hashKey","string","",hashKey,"","","","");
		var obj3 = returnJSONStringObject("hostName","hostName","string","",hostName,"","","","");
		var obj4 = returnJSONStringObject("langId","langId","string","",langId,"","","","");
		var obj5 = returnJSONStringObject("password","password","string","",password,"","","","");
		var obj6 = returnJSONStringObject("requesterTimeStamp","requesterTimeStamp","dateTime","",requesterTimeStamp,"","","","");
		var obj7 = returnJSONStringObject("userID","userID","string","",userID,"","","","");
		arr.push(obj1);
		arr.push(obj2);
		arr.push(obj3);
		arr.push(obj4);
		arr.push(obj5);
		arr.push(obj6);
		arr.push(obj7);
		var jsonString = returnJSONStringObject("requesterContext","requesterContext","requesterContextVO","","","","",arr,"");
		return jsonString;
	}
	
	/**
	 * 
	 * @returns
	 */
	function webServiceGuiOpenSavedConfiguration()
	{
		$("#save_configuration_lookup_dialog_" + _pageRef).removeAttr('display');
		$("#save_configuration_lookup_dialog_" + _pageRef).dialog({
			modal:true, 
            title:"load_saved_config_key",
            autoOpen:false,
            position:'center', 
            width : returnMaxWidth(250),
            height	:returnMaxHeight(500),
            resizable: false,
			close: function (){
				  var theDialog = $(this);
				  theDialog.css("display", "none");
		    }
		}).dialog("open");
	}
	
	/**
	 * function called upon clicking show request or process request,
	 * it will load all grid & sub grid data and pass it to action
	 * 
	 * */
	function WebServiceGui_processRequest(val)
	{
		_showProgressBar(true);
		//TODO	
	    var parentGrid =$("#webServiceGuiTbl_Id_"+_pageRef);     
	    var json = null;
	    if('show' != val)
	    {
	    	var xmlReq = $("#soaprequest").val();
	    }
    	loadRequestResponse();
    	if(undefined != xmlReq && '' != xmlReq.trim() )
    	{
    		$("#soaprequest").val(xmlReq);
    	}
	    loadServerTimeStamp(function(){
				    json = loadSelectedRows(parentGrid);
					jsonStringUpdates = "["+json+"]";
					$("#webServiceExplorerGridUpdates_"+_pageRef).val(jsonStringUpdates);
					//TODO
					var mainGrid = $("#webServiceGuiTbl_Id_"+_pageRef);
					var loadSrc = null;
					var xmlRequest = $("#soaprequest").val();
					if('save' == val)
					{
						loadSrc = jQuery.contextPath +"/path/common/WebserviceExplorer/WebServiceExplorerMaint_saveRequest";
						var configName = "";
						$("#save_configuration_dialog_" + _pageRef).removeAttr('display');
						$("#save_configuration_dialog_" + _pageRef).dialog({
							modal:true, 
			                title:"enter_configuration_key",
			                autoOpen:false,
			                show: {
			                    effect: "blind",
			                    duration: 1000
			                  },
			                hide: {
			                    effect: "explode",
			                    duration: 1000
			                  },
			                  buttons: {
			                      "save_configuration_key": function() {
			                      //  $( this ).dialog( "close" );
			                    	configName = $("#configName_"+_pageRef).val();
			                        if("" != configName && undefined != configName)
			                        {
			                        	saveRequest(loadSrc);
			                        	xmlRequest = "";
			                        	$( this ).dialog( "close" );
			                        }
			                      },
			                      Cancel: function() {
			              			$("#soaprequest").val(xmlRequest);
			
			                        $( this ).dialog( "close" );
			
			                      }
			                  },
			                position:'center', 
			                width : returnMaxWidth(350),
			                height	:returnMaxHeight(150),
			                resizable: false,
							close: function (){
								$("#soaprequest").val(xmlRequest);
								  var theDialog = $(this);
								  theDialog.css("display", "none");
			
						    }
						}).dialog("open");
						$("#soaprequest").val(xmlRequest);
						//$("#save_configuration_dialog_" + _pageRef).dialog("open");
					
					}
					else if('show' == val && mainGrid.length > 0)
					{
						loadSrc = jQuery.contextPath +"/path/common/WebserviceExplorer/WebServiceExplorerMaint_showRequest";
						showProcessRequest(loadSrc,'show');
					}
					else if('show_saved_cofiguration' == val && mainGrid.length > 0)
					{
						$("#WebServiceExplorerConfigLookup_"+_pageRef).show();
						return;
					}
					else if('process' == val && mainGrid.length > 0)
					{
						loadSrc = jQuery.contextPath +"/path/common/WebserviceExplorer/WebServiceExplorerMaint_processRequest";
						showProcessRequest(loadSrc,'process');
						if(undefined == $("#soaprequest").val() || (undefined != $("#soaprequest").val() && "" == $("#soaprequest").val().trim()))
						{
							loadXmlRequest(loadSrc);
						}
					}
					else if('update' == val)
					{
						loadSrc = jQuery.contextPath +"/path/common/WebserviceExplorer/WebServiceExplorerMaint_updateRequest";
						saveRequest(loadSrc);
					}
					if($("#jsonCommonFields_"+_pageRef).length>0)
					{
						$("#jsonCommonFields_"+_pageRef).remove();
					}
					
		    });
	}
	
	/**
	 * @description function called when saving or updating requests
	 * @param loadSrc
	 * @returns
	 */
	function saveRequest(loadSrc)
	{	
		var $mainTab = $("#custTabs_"+_pageRef);
		var $tabId1 = "custTab1TabsContent_"+_pageRef;
		var $tabId2 = "custTab2TabsContent_"+_pageRef;		
		var serializedForm = $("#webServiceGuiDefFormId_"+_pageRef).serializeForm();
		serializedForm = serializedForm + "&webServiceExplorerCO.webServiceExplorerConfigVO.CONFIG_NAME="+$("#configName_"+_pageRef).val()+
		"&webServiceExplorerCO.webServiceExplorerConfigVO.APPLICATION_NAME=" + $("#application_name_desc_"+_pageRef).val() +
		"&webServiceExplorerCO.webServiceExplorerConfigVO.OPERATION_NAME=" +	$("#operation_name_lkp_desc_"+_pageRef).val() +
		"&webServiceExplorerCO.webServiceExplorerConfigVO.ENDPOINT_NAME=" + $("#webservice_name_desc_"+_pageRef).val();
		$.ajax( {
			url : loadSrc,
			type:"post",
			dataType:"json",
			data: serializedForm,					
			success : function(data) 
		    {			
				 refreshMainGrid();
				 $("#genratedXmlRequest_"+_pageRef).val("");
				 $("#generatedXmlResponse_"+_pageRef).val("");
				 applyAdditionalDynamicDisplay(data["additionalScreenParams"]);
  				_showProgressBar(false);
			}
		}).done(function(result)
	      {	
			$mainTab.tabs('select',$tabId1);
			$mainTab.tabs('disable',$tabId2);
	      }
		);
	}	

	/**
	 *  
	 */
	function showProcessRequest(loadSrc,val)
	{
		var $mainTab = $("#custTabs_"+_pageRef);
		var $tabId1 = "custTab1TabsContent_"+_pageRef;
		var $tabId2 = "custTab2TabsContent_"+_pageRef;
		
		_showProgressBar(true);
		var request = $("#soaprequest").val();
		var response = $("#soapresponse").val();
		$("#genratedXmlRequest_"+_pageRef).val("");
		$("#generatedXmlResponse_"+_pageRef).val("");
		var serializedForm = $("#webServiceGuiDefFormId_"+_pageRef).serializeForm();
		$.ajax( {
			url : loadSrc,
			type:"post",
			dataType:"html",
			data: serializedForm,					
			success : function(data) 
		    {
				if('show' == val)
				{
					//var x = data;
					//x = x.replace(/&/g, '&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
					$("#soaprequest").html(data);
					$("#genratedXmlRequest_"+_pageRef).val(data);
					if(undefined !=  response)
					{
						$("#soapresponse").val(response);
						$("#generatedXmlResponse_"+_pageRef).val(response);
					}
				}
				else
				{
					$("#soapresponse").html(data);
					$("#generatedXmlResponse_"+_pageRef).val(data);
					if(undefined != request)
					{
						$("#soaprequest").val(request);
						$("#genratedXmlRequest_"+_pageRef).val(request);
					}
				}
				_showProgressBar(false);
			},
			error:function (xhr, ajaxOptions, thrownError) 
	   		{
		        //alert(xhr.status);
		        //alert(thrownError);
	   		}		
		}).done(function(result)
	       {			
				$mainTab.tabs('enable',$tabId2);
				$mainTab.tabs('select',$tabId2);
		   }
		);
	}					
	
	/**
	 * @description function to load xml request
	 * @param loadSrc
	 * @returns
	 */
	function loadXmlRequest(loadSrc)
	{
		$("#genratedXmlRequest_"+_pageRef).val("");
		var serializedForm = $("#webServiceGuiDefFormId_"+_pageRef).serializeForm();
		$.ajax( {
			url : loadSrc,
			type:"post",
			dataType:"html",
			data: serializedForm,					
			success : function(data) 
		    {
				$("#soaprequest").val(data);
		    }
		}
		);
	}
	
	function loadRequestResponse()
	{
		var	loadSrc = jQuery.contextPath +"/path/common/WebserviceExplorer/WebServiceExplorerMaint_loadShowProcessRequest";
		var serializedForm = $("#webServiceGuiDefFormId_"+_pageRef).serializeForm();
		_showProgressBar(true);
	//	
		$.ajax( {
			url : loadSrc,
			type:"post",
			dataType:"html",
			data: serializedForm,					
			success : function(data) 
		    {	
				$("#WebServiceInputOutRequest_" +_pageRef).html(data);
				_showProgressBar(false);
			}
		});
	}
	
	function loadToolbar(src)
	{
		var	loadSrc = jQuery.contextPath +"/path/common/WebserviceExplorer/WebServiceExplorerMaint_toolBarVisiblity";
		if(undefined != src && null != src)
		{
			loadSrc = src;
		}
		var serializedForm = $("#webServiceGuiDefFormId_"+_pageRef).serializeForm();
		_showProgressBar(true);

		$.ajax( {
			url : loadSrc,
			type:"post",
			dataType:"json",
			data: serializedForm,					
			success : function(data) 
		    {					
				applyAdditionalDynamicDisplay(data["additionalScreenParams"]);
				_showProgressBar(false);
			}
		});
		
	}
	
	/*used to itterate oversubgrid*/
	function loopOverSubGridUsingJQuery(idss)
	{
		var rec = "";
		var idss = (selectedRowIds[i]).replace(/-/g, "__")
		var parentFieldName = gridData["fieldName"];
		var parentFieldType = gridData["fieldType"];
		//TODO
		var rows = $("#webServiceGuiTbl_Id_"+_pageRef+"_"+idss+" table>tbody>tr");
		for ( var i = 2; i < rows.length; i++) 
		{	
			var param = $("#webServiceGuiTbl_Id_"+_pageRef+"_"+idss+" table>tbody>tr:nth-child("+i+")>td:nth-child(2)").text();
			var type = $("#webServiceGuiTbl_Id_"+_pageRef+"_"+idss+" table>tbody>tr:nth-child("+i+")>td:nth-child(3)").text();
			var mand = $("#webServiceGuiTbl_Id_"+_pageRef+"_"+idss+" table>tbody>tr:nth-child("+i+")>td:nth-child(4)").text();
			var value = $("#webServiceGuiTbl_Id_"+_pageRef+"_"+idss+" table>tbody>tr:nth-child("+i+")>td:nth-child(7)").text();
			if(param != "")
			{
				rec = rec + "_rec_fieldName:"+param+'_fieldType:'+type+'_mand:'+mand+'_value:'+value.trim();
			}
		}
		rec = "{fieldName:"+parentFieldName+"_fieldType:"+parentFieldType+"~["+rec+"]}";
		return rec;
	}
	
	function WebServiceGui_fillRequestType()
	{		 
		var params = {}
		var loadSrc  = jQuery.contextPath +"/path/common/WebserviceExplorer/WebServiceExplorerMaint_fillRequestTypeList";
		_showProgressBar(true);
		$.ajax( {
			url : loadSrc,
			type:"post",
			dataType:"json",
			data: params,					
			success : function(data) 
		    {
				_showProgressBar(false);
			}
		});
		
	}
	
	function WebServiceGui_onRequestTypeChange()
	{
	    _showProgressBar(true);	
	    //TODO
		$("#webServiceGuiTbl_Id_"+_pageRef).jqGrid("clearGridData", true).jqGrid('setGridParam',
					  {
					   url :jQuery.contextPath+"/path/common/WebserviceExplorer/WebServiceExplorerList_loadWSDLInfoGrid",
					   datatype : 'json',
					   postData : { 
								"webServiceExplorerCO.requestType" : "Request",
								"webServiceExplorerCO.applicationName" : $("#application_name_desc_"+_pageRef).val(),
								"webServiceExplorerCO.webServiceName" : $("#webservice_name_desc_"+_pageRef).val(),
								"webServiceExplorerCO.operationName" : $("#operation_name_lkp_desc_"+_pageRef).val()
						},
					   success: function(responseData) {
					        alert("success");
					    }
					
					  }).trigger("reloadGrid");
	
		 setTimeout(function(){
			 onGridComplete();
		 }, 300);
	    _showProgressBar(false);
	}
	
	function WebServiceGui_appNameOnChange(sel)
	{		  
		var params =
		{ 
				"webServiceExplorerCO.applicationName" : sel.options[sel.selectedIndex].value  
		}
		console.log(sel.options[sel.selectedIndex].value);
	
	    var loadSrc  = jQuery.contextPath +"/path/common/WebserviceExplorer/WebServiceExplorerMaint_appNameOnChange";
	
		_showProgressBar(true);
			$.post(loadSrc, {"webServiceExplorerCO.applicationName" : sel.options[sel.selectedIndex].value}, function(param) {
				$("#webServiceGuiFormId_" + _pageRef).html(param);
				_showProgressBar(false);
			}, "html");
		
	}
	
	function WebServiceGui_OperationNameOnChange(sel)
	{
	    _showProgressBar(true);	
	    //TODO
		$("#webServiceGuiTbl_Id_").jqGrid("clearGridData", true).jqGrid('setGridParam',
					  {
					   url :jQuery.contextPath+"/path/common/WebserviceExplorer/WebServiceExplorerList_loadWSDLInfoGrid",
					   datatype : 'json',
					   postData : { 
								"webServiceExplorerCO.operationName" : sel.options[sel.selectedIndex].value,
								"webServiceExplorerCO.applicationName" : $("#application_name_").val(),
						}
					  }).trigger("reloadGrid");
	
		 setTimeout(function(){
			 onGridComplete();
		 }, 300);
	    _showProgressBar(false);
	}
	
	/*
	 * Wrapper function that will will load a combo in a grid
	 * */
	function mappingFieldsLoadCombo(zUrl, zList, zId, zValue)
	{		
		var url = zUrl + "?webServiceExplorerCO.mappingFields="+$("#webServiceExplorerMappingParams_"+_pageRef).val();
		return loadCombo(url, zList, zId, zValue);
	}
	
	/*
	 * Wrapper function that will will load a combo of type enumeration in a grid
	 * */
	function enumerationFieldsLoadCombo(zUrl, zList, zId, zValue,rowId,grid)
	{
		if(null != rowId && null != grid && "" != rowId && "" != grid && undefined != rowId && rowId.length != 0 )
		{
			 try{
				 var parentRowId = returnSubGridRowParentRowId(rowId);
				 var parentGridId = getGridIdFromRow(parentRowId);
				 var fieldType = $('#'+parentGridId).jqGrid('getCell', parentRowId, 'fieldType'); 
				 var type = checkForType(fieldType);
				 if('List<Object>' == type)
				 {
					 var gridId = grid[0].id;
					 rowId = returnGridLastSelectedRow(gridId);
					 gridId = getSubGridIdFromParentRowId(rowId);
					 grid = $("#"+gridId);
					 rowId = returnLastHierarchicalSelectRow(rowId);
				 }
			 }
			 catch(e)
			 {
				 console.log("exception in enumerationFieldsLoadCombo");
			 }
			var fieldName = grid.jqGrid ('getCell', rowId, 'fieldName');
			var embeddedTypeEnumParent = grid.jqGrid ('getCell', rowId, 'embeddedTypeEnumParent');
			
			zUrl = zUrl + "?webServiceExplorerCO.embeddedTypeEnumParent="+embeddedTypeEnumParent+"&webServiceExplorerCO.rowId=" + $("#"+fieldName+"_"+_pageRef).val();
			//if(undefined == $("#"+fieldName+"_"+rowId+"_"+_pageRef).val())
		
			try{
		   // 	$("#webServiceGuiDefFormId_"+_pageRef).append('<input type="hidden" id="'+fieldName+"_"+rowId+"_"+_pageRef+'" name="'+fieldName+'" value="'+rowId+'" />');
			}
			catch(e)
			{
				console.log(e);
			}
			return loadCombo(zUrl, zList, zId, zValue);
		}
		else{
			return;
		}
	}
	
	/**
	 * 
	 * @returns
	 */
	function WebServiceGui_openWSDL()
	{
		if(undefined != $("#wsdlUrl_"+_pageRef).val() && "" !=  $("#wsdlUrl_"+_pageRef).val())
		{
			var windowDescription = "wsdl";
			var windowFeatures = "width=560,height=340,toolbar=0,menubar=0,location=0,menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes";
	
			var newwindow = window.open($("#wsdlUrl_"+_pageRef).val(),windowDescription,windowFeatures);	
			if (window.focus) 
			{
				newwindow.focus()
			}
			return false;
		}
	}
	
	/**
	 * @Description
	 * @returns
	 */
	function config_Lookup_Dep()
	{	
		var appName = $("#application_name_desc_"+_pageRef).val();
		var serviceName = $("#webservice_name_desc_"+_pageRef).val();
		var operationName = $("#operation_name_lkp_desc_"+_pageRef).val();
		var serviceDataId = $("#serviceDataId_"+_pageRef).val();
		var grid = $("#webServiceGuiGrid_" +_pageRef);
	//	if(operationName != undefined && serviceName != undefined && appName != undefined && operationName != "" && serviceName != "" && appName != "")
		{
		   	var	loadSrc = jQuery.contextPath +"/path/common/WebserviceExplorer/WebServiceExplorerMaint_loadConfigSavedRequest";
			var serializedForm = $("#webServiceGuiDefFormId_"+_pageRef).serializeForm();
			if("" == serviceDataId)
			{
				serializedForm = "";
			}
		   	_showProgressBar(true);
		   	$.ajax( {
		   		url : loadSrc,
		   		type:"post",
		   		dataType:"html",
		   		data: serializedForm,					
		   		success : function(data) 
		   	    {	
          			$("#soaprequest").val(data);
		   			_showProgressBar(false);
		    	},
		   		error:function (xhr, ajaxOptions, thrownError) 
		   		{
			        alert(xhr.status);
			        alert(thrownError);
		   		}
		    });
		}
	}
	
	/**
	 * @description function that will load the current server time stamp
	 * @returns
	 */
	function loadServerTimeStamp(fn)
	{		
		var serverTimeStamp = null;
		var loadSrc = jQuery.contextPath +"/path/common/WebserviceExplorer/WebServiceExplorerMaint_loadServerTimeStamp";
		$.ajax( {
	   		url : loadSrc,
	   		type:"post",
	   		dataType:"json",
	   		data: "",					
	   		success : function(data) 
	   	    {	      			 
      			var listOfHiddenFields = document.createElement('div');
				var fId = "current_time_stamp_"+_pageRef;
				var fName = 'current_time_stamp_'+_pageRef;
				var fValue = '';
				var formId = 'webServiceGuiGridForm_'+_pageRef;
				hField = returnHiddenField(fId,fName,fValue);
				listOfHiddenFields.appendChild(hField);
				createHiddenFields(formId,listOfHiddenFields);
				$("#current_time_stamp_"+_pageRef).val(data["timeStamp"]);
	    	},
	   		error:function (xhr, ajaxOptions, thrownError) 
	   		{
		        alert(xhr.status);
		        alert(thrownError);
	   		}
	    }).done(function(result)
	      {	
	    	if(undefined != fn && typeof(fn) == "function")
	    	{
	    		fn();
	    	}
	      }
		);
	}
	
	/**
	 * @Description: check if the field type is a list, list of object, or hashmap
	 * @param fieldType
	 * @returns String 
	 */
	function checkForType(fieldType)
	{
		 var  type = null;
		 type = fieldType.substr(0,7);
		 switch(type)
		 {
		 	case "HashMap":
		 		return "HashMap";
		 		break;
		 }
		 type = null;
		 type = fieldType.substr(0,4);
		 switch(type)
		 {
		 	case "List":
		 		var type1;
		 		if(undefined != fieldType)
		 		{
		 			type1 = fieldType.replace("List<","");
			 		type1 = type1.replace(">","");
		 		}		 		
		 		if(isNonPrimativeDataType(type1))
		 		{
			 		return "List";
		 		}
		 		return "List<Object>";
		 		break;
		 }
		 return fieldType;
	}
	
	/**
	 * @Description: Checks if a certain type is a non primative data type
	 * @param fieldType
	 * @returns
	 */
	function isNonPrimativeDataType(fieldType)
	{	
		return ("int" == fieldType || "string" == fieldType || "decimal" == fieldType || "bigdecimal" == fieldType || "dateTime" == fieldType || "long" == fieldType || "date" == fieldType || "float" == fieldType || "double" == fieldType || "boolean" == fieldType);
	}
	
	/**
	 * 
	 * @param str
	 * @returns
	 */
	function isValidURL(str) {
		var pattern = new RegExp('^((https?:)?\\/\\/)?' + // protocol
		'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
		'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
		'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
		'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
		'(\\#[-a-z\\d_]*)?$', 'i'); // fragment locater
		if (!pattern.test(str)) {
			return false;
		} else {
			return true;
		}
	}
	
	/**
	 * @description function to reload grid
	 * @input null or grid
	 * @returns
	 */
	function refreshMainGrid(grid)
	{
		var selector = null;
		if(null != grid)
		{
			var selector = grid.id;
			if(undefined == selector)
			{
				grid = grid[0];
				selector = grid.id;
				$("#"+selector).trigger("reloadGrid");
			}
		}
		else{
			//TODO
			$('#webServiceGuiTbl_Id_'+_pageRef).trigger("reloadGrid");
		}
	}
	
	/**
	 * @description function to clear lookup cached data
	 * @returns
	 */
	function clearAppInfoInfo()
	{
		$("#application_name_desc_"+_pageRef).val("");
		$("#webservice_name_desc_"+_pageRef).val("");
		$("#operation_name_lkp_desc_"+_pageRef).val("");
		$("#serviceDataId_"+_pageRef).val("");
	}
	
	/**
	 * @description clear config lookup info
	 * @returns
	 */
	function clearConfigLookUp()
	{
		$("#lookuptxt_config_service_id_"+_pageRef).val("");
		$("#config_service_name_"+_pageRef).val("");
	}
	
	/**
	 * @description clear xml request and resposne
	 * @returns
	 */
	function clearRequestResponse()
	{
		$("#soaprequest").val("");
		$("#soapresponse").val("");
	}
	
	
	
	/**
	 * 
	 * @param yesNo
	 * @returns
	 */
//	function WebServiceExplorerAfterConfirm(yesNo)
//	{
//		if(yesNo == true)
//		{
//			WebServiceGui_processRequest("save");
//		}
//		else{
//			 $("#webServiceExplorerGridUpdates_"+_pageRef).val("");
//		}
//	}
