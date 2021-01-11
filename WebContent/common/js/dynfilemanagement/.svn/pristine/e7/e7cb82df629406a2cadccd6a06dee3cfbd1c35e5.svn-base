	function loadDynFileDetails()
	{
		_showProgressBar(true);
		var selectedFileType = $('#fileTypeBatch_'+_pageRef).val();
		$.ajax
		({
			 url: $.contextPath+"/path/fileMngmt/DynFileMaint_loadDynFileDetails?_pageRef="+_pageRef+"&dynFilesSC.selectedFileType="+selectedFileType,
			 type:"post",
			 data:"dynFilesSC.fileCode="+$("#lookuptxt_enqFileCode_"+_pageRef).val()+"&dynFilesSC.structType="+$('#strut_type_'+_pageRef).val(),
			 success: function(data)
			 {
				 $("#dynFileMaintDetails_"+_pageRef).html(data);
				 _showProgressBar(false);
			 }
		});
	}		
	function validateFileName(selFile){
		var oldFileName = $('#fileName_'+_pageRef).val();
		var mainFileExt = $('#fileExt_'+_pageRef).val();
		var fileName = $(selFile).val().split('\\').pop();//IE returns the entire path		 	 
		var selFileName = fileName.substring(0,fileName.lastIndexOf("."));//FIBSI180508 - CSM - File Management - incorrect file name
		if(typeof $('#fileName_'+_pageRef).val() != 'undefined' && selFileName!=$('#fileName_'+_pageRef).val()){
 			_showErrorMsg(File_Names_Do_Not_Match_key);
 			$(selFile).val('');
 			 
 			}	
		if(document.getElementById("uploadScript_" + _pageRef)!="undefined" && document.getElementById("uploadScript_" + _pageRef)!=null)
		{
			var fname = document.getElementById("uploadScript_" + _pageRef).value;
			var ext = fname.substring(fname.lastIndexOf(".")+1,fname.length).toUpperCase();
			if('.'+ext != mainFileExt.toUpperCase())
			{
				_showErrorMsg(fileNotAllowed);
				$("#uploadScript_"+_pageRef).val("");
				$('#fileName_'+_pageRef).val(oldFileName);
				return;
			}	
			if(ext == "CSV" || ext == "XLS" || ext == "XLSX"|| ext == "TXT"|| ext == "XML") 
			{
				_showProgressBar(true);
				var reloadUrl = jQuery.contextPath+"/path/fileMngmt/DynFileMaint_checkIfFileIsvalid.action";
				var reloadParams = {};
				reloadParams["upload"] = $("#uploadScript_"+_pageRef).val();
				var options = {
						url : reloadUrl,
						data : reloadParams,
						type : 'post',
						dataType : "json",
						success : function(param, status, xhr) {
							if (typeof param["_error"] == "undefined"
								|| param["_error"] == null) 
							{
								_showProgressBar(false);
							}
							else
							{
								_showProgressBar(false);
								$("#uploadScript_"+_pageRef).val("");
								$('#fileName_'+_pageRef).val(oldFileName);
							}
						}
					}
				$("#dynaFileForm_"+_pageRef).ajaxSubmit(options); 
			}
			else
			{
				_showErrorMsg(fileNotAllowed);
			}
		}
	}
	
	//EFARAH FIBSI180285
	function updateFileName(selFile)
	{
		var oldFileName = $('#fileName_'+_pageRef).val();
		var mainFileExt = $('#fileExt_'+_pageRef).val();
		var fileName = $(selFile).val().split('\\').pop();//IE returns the entire path	
		var selFileName = fileName.substring(0,fileName.lastIndexOf("."));//FIBSI180508 - CSM - File Management - incorrect file name
		var oldName = $('#fileName_'+_pageRef).val()
		$('#fileName_'+_pageRef).val(selFileName)
		for (var i = 0; i < 100; i++) 
		{
			if ($('#defaultValue_'+_pageRef +'_' +i).val() !=null)
			{
				if ($('#defaultValue_'+_pageRef +'_' +i).val() == oldName) 
				{
					$('#defaultValue_'+_pageRef +'_' +i).val(selFileName)
				}
			}
		}
		var fname = document.getElementById("uploadScript_" + _pageRef).value;
		var ext = fname.substring(fname.lastIndexOf(".")+1,fname.length).toUpperCase();
		if('.'+ext != mainFileExt.toUpperCase())
		{
			_showErrorMsg(fileNotAllowed);
			$("#uploadScript_"+_pageRef).val("");
			$('#fileName_'+_pageRef).val(oldFileName);
			return;
		}	
		if(ext == "CSV" || ext == "XLS" || ext == "XLSX"|| ext == "TXT"|| ext == "XML") 
		{
			_showProgressBar(true);
			var reloadUrl = jQuery.contextPath+"/path/fileMngmt/DynFileMaint_checkIfFileIsvalid.action";
			var reloadParams = {};
			reloadParams["upload"] = $("#uploadScript_"+_pageRef).val();
			var options = {
					url : reloadUrl,
					data : reloadParams,
					type : 'post',
					dataType : "json",
					success : function(param, status, xhr) {
						if (typeof param["_error"] == "undefined"
							|| param["_error"] == null) 
						{
							_showProgressBar(false);
						}
						else
						{
							_showProgressBar(false);
							$("#uploadScript_"+_pageRef).val("");
							$('#fileName_'+_pageRef).val(oldFileName);
						}
					}
				}
			$("#dynaFileForm_"+_pageRef).ajaxSubmit(options); 
		}
		else
		{
			_showErrorMsg(fileNotAllowed);
		}
	}
	
	function uploadFile(proceed){	
		var dynFileName  = ($("#uploadScript_"+_pageRef).val());
		var ext = dynFileName.substring(dynFileName.lastIndexOf(".")+1,dynFileName.length); 
		if(dynFileName=="" ||( ext.toLowerCase()!="xlsx" && ext.toLowerCase()!="xls" && ext.toLowerCase()!="txt" &&  ext.toLowerCase()!="xml" &&  ext.toLowerCase()!="csv"))
		{
			_showErrorMsg(fileNotAllowed, error_msg_title, 300, 100);
			return;
		}
		//empty the grid before loading new data
		$("#importGridSection_" + _pageRef).html("");
		$("#importGridSection_" + _pageRef).show();
			if(proceed==0&&!validateForm())
				return;		
			 
			var flagTest = 0 ; // SQL session tracing R14.1
			
			var options = { 
				url:    jQuery.contextPath+ "/path/fileMngmt/DynFileMaint_viewFile?_pageRef="+_pageRef+"&dynFilesSC.dynFileName="+encodeURIComponent(dynFileName)+"&dynFilesSC.proceed="+proceed,				 	
				type:   'post',		
				async: true, // SQL session tracing R14.1
				beforeSubmit:_showProgressBar(true),				
				success: function(response, status, xhr) {					
					_showProgressBar(false);
					try {
						flagTest = 1 ;// SQL session tracing R14.1
  						var jsonResponse = JSON.parse($(response).html());   						
  						if(jsonResponse["_confirm"]!=""){					 
							_showConfirmMsg(jsonResponse["_confirm"], proceed_msg_title, function(confirmcChoice, theArgs){
								 if(confirmcChoice)	
									{
										uploadFile(1); 
									}
								});
						}	
  						else{//error
  							_showErrorMsg(jsonResponse["_error"]);
  						}
					} catch (e) {//response is html	
						
						  flagTest = 1 ;// SQL session tracing R14.1
 						  $("#importGridSection_"+_pageRef).html(response);				 		
						  $("#saveScriptBtn_"+_pageRef).show();						 	
						  if($("#runScriptBtn_"+_pageRef).length){//check whether runscript btn is defined						 	
						 		$("#runScriptBtn_"+_pageRef).show();						 		 
						 		}						 	
						  else{
						 		 $("#saveExecLogBtn_"+_pageRef).show();		
						 		var batchNo  = $("#batch_no_"+_pageRef).val();
						 		if(batchNo != null && batchNo != "")
					 			{
						 			_showErrorMsg(Process_Executed_Successfully_key+' '+ batchNo,info_msg_title);
						 			$("#batch_no_"+_pageRef).val("");
					 			}
						 		else
						 		{
						 			_showErrorMsg(Process_Executed_Successfully_key,info_msg_title);
						 		}
						 	}
					}
			 	
				 
				
					}
				};				
			 $("#dynaFileForm_"+_pageRef).ajaxSubmit(options); 
			 //VisaHeartbeat();
			// SQL session tracing R14.1
			var interv= $("#nbvCalcSessionTimeOut_"+ _pageRef).val();
			  var timeoutId = setInterval(function()
						{
							 if(flagTest==0)
							 {
								 VisaHeartbeat();
							 } 
							 else
							 {
							 	clearInterval(timeoutId);
							 }
						 }, interv);
			  
		}	
	
	function VisaHeartbeat()
	{
		// SQL session tracing R14.1
		var actionSrc = jQuery.contextPath + "/path/fileMngmt/DynFileMaint_refreshDual?dynFilesSC.action=M";
		var params = {};
		
		$.ajax({
			url : actionSrc,
			type : "post",
			dataType : "json",
			data : params,
			success : function(data)
			{

			}
	
		});
	}
	
	function saveScript(){
		var objData = eval("({'dynFilesSC.fileCode':'"+($("#lookuptxt_enqFileCode_"+_pageRef).val())
							+"','dynFilesSC.structCode':'"+($("#fileStructCode_"+_pageRef).val())
							+"','dynFilesSC.structType':'"+$('#strut_type_'+_pageRef).val() + "'})");
		
		$.fileDownload(jQuery.contextPath+ "/path/fileMngmt/DynFileMaint_saveScript?_pageRef="+_pageRef,
		{
	    successCallback: function (url) {
	    },
	    failCallback: function (html, url) {	 
	        _showErrorMsg(html)
	    },
	    data:objData
	});
 
	}
	

	function runScript(proceed)
	{
		if (!proceed)
		{
			proceed = 0;
		}
	
		var flagTest = 0; // SQL session tracing R14.1
		var params = $("#dynaFileForm_" + _pageRef).serializeForm();
		params += "&dynFilesSC.proceed=" + proceed;
		//call the dummy action for session refresh
		var dynFileMaint_sessionRefreshObj = setInterval(function(){_callActionToCheckSession()}, dynFileMaint_sessionTimoutValue * 0.9);
		
		var options = {
			url : $.contextPath + "/path/fileMngmt/DynFileMaint_runScript",
			type : 'post',
			data : params,
			dataType:"json",
			beforeSubmit : function(arr, $form, opt)
			{
				if (enableProgressBar == "1")
				{
					_showProgressBar(true);// 827956(DBU190598) : add _showProgressBar
				}
			},
			async : true, // SQL session tracing R14.1
			success : function(data)
			{
				//stop the dummy request for session timeout
				clearInterval(dynFileMaint_sessionRefreshObj);
				if (enableProgressBar == "1")
				{
					_showProgressBar(false);
				}
				flagTest = 1;// SQL session tracing R14.1
				var jsonResponse = data;
				if (jsonResponse["_error"] == undefined
						|| jsonResponse["_error"] == "")
				{
					if (jsonResponse["_confirm"] != undefined
							&& jsonResponse["_confirm"] != "")
					{
						_showConfirmMsg(jsonResponse["_confirm"],
								proceed_msg_title,
								function(confirmcChoice, theArgs)
								{
									if (confirmcChoice)
									{
										runScript(1);
									}
								});
					}
	
					else
					{
						_showErrorMsg(Process_Executed_Successfully_key,
								info_msg_title);
					}
				}
				$("#saveExecLogBtn_" + _pageRef).show();
			}
		};
		$("#dynaFileForm_" + _pageRef).ajaxSubmit(options);
	
		// SQL session tracing R14.1
		var interv = $("#nbvCalcSessionTimeOut_" + _pageRef).val();
		// VisaHeartbeat();
		var timeoutId = setInterval(function()
		{
			if (flagTest == 0)
			{
				VisaHeartbeat();
			}
			else
			{
				clearInterval(timeoutId);
			}
		}, interv);
	}
	
	function saveLog(){
	var objData = eval("({'dynFilesSC.fileCode':'"+($("#lookuptxt_enqFileCode_"+_pageRef).val())
						+"','dynFilesSC.structCode':'"+($("#fileStructCode_"+_pageRef).val())
						+"','dynFilesSC.structType':'"+$('#strut_type_'+_pageRef).val() + "'})");
		
	$.fileDownload(jQuery.contextPath+ "/path/fileMngmt/DynFileMaint_saveExecutionLog?_pageRef="+_pageRef, {
	    successCallback: function (url) {
		
			
	    },
	    failCallback: function (html, url) {	 
	       _showErrorMsg(html);   //temp fix for pre tag wrapped around json
	    },
	     data:objData
	});
	
	
	}
	
	function validateForm(){		
	 
		if(!$("#lookuptxt_enqFileCode_"+_pageRef).val()){
				_showErrorMsg(Missing_File_Code_key);				
				return false;
				}
		else if($("#uploadScript_"+_pageRef).length&&!$("#uploadScript_"+_pageRef).val()){		 
				_showErrorMsg(Missing_File_Location_key);
				return false;
				}	
		else if(!validateInputTagGrid()){
				return false;
		}
		else {
			   var hasError = false;			 
			   $.each($("#dynaFileForm_"+_pageRef).find($("input[id^='defaultValue_"+_pageRef+"']")), function() {
			 		if(!$(this).val()){
      				_showErrorMsg(File_Input_Parameters_Mandatory_key);
      				 hasError =  true;
      				 return false;
      					
      				}       			
   				});
   				if(hasError){
   					return false;
   				}   		 
			} 
	 return true;
	}
	
	function  validateInputTagGrid(){		 
		var tagGrid = $("#dynFileTag_id_" + _pageRef);	
		if(tagGrid.length!=0){
			var rowIds = tagGrid.jqGrid('getDataIDs');		
			for ( var i = 0; i < rowIds.length; i++) 
			{
				var rowId = rowIds[i];			 
				if (tagGrid.jqGrid('getCell', rowId,'dfFileTagInpParamVO.INP_PARAM_DISP_VALUE') == "") 
				{			 
					_showErrorMsg(Input_Tag_Values_Mandatory_key);
					return false;
				}
				 
			}
		}
		return true
	 
		
	}
	
	function generateFileExport(){
		_showProgressBar(true);//FIBSI180431 fares kassab
	   if($("#dynFileTag_id_"+ _pageRef).length!=0){
			var rowId =  $("#dynFileTag_id_"+ _pageRef).jqGrid('getGridParam','selrow');	
			if(typeof rowId!="undefined"){		 
				$("#dynFileTag_id_"+ _pageRef).jqGrid("saveRow",rowId,false, 'clientArray');
				var tagGrid =  $("#dynFileTag_id_"+ _pageRef).jqGrid('getRowData');		 
				var dynFilesTagParametersCOArr = []; //declare array			
				$.each(tagGrid, function(key, value) { 
		  		 
		  			var dfFileStructDetailVO = {}; //declare object
					var dfFileTagInpParamVO = {}; //declare object
					var	dynFilesTagParametersCO={};//declare object
					dfFileStructDetailVO.TAG_NO =value["dfFileStructDetailVO.TAG_NO"];
					dfFileStructDetailVO.TAG_DESC=value["dfFileStructDetailVO.TAG_DESC"];
					dfFileTagInpParamVO.INP_PARAM_DISP_VALUE=value["dfFileTagInpParamVO.INP_PARAM_DISP_VALUE"];
					dfFileTagInpParamVO.INP_PARAM_DATA_VALUE=value["dfFileTagInpParamVO.INP_PARAM_DATA_VALUE"];	 
					dynFilesTagParametersCO.dfFileStructDetailVO =dfFileStructDetailVO;
					dynFilesTagParametersCO.dfFileTagInpParamVO = dfFileTagInpParamVO;
					dynFilesTagParametersCOArr.push(dynFilesTagParametersCO);
		  			
				});
			$("#tempTagJSON_"+_pageRef).val(JSON.stringify(dynFilesTagParametersCOArr));	
			}			
		}
	    if(!validateForm())
		{
			_showProgressBar(false);
			return ;
		}
		$.fileDownload(jQuery.contextPath+ "/path/fileMngmt/DynFileMaint_generateFileExport?_pageRef="+_pageRef, {
	    	successCallback: function (url) {
	    		_showProgressBar(false);
		
			
	    },
	    failCallback: function (html, url) {
     		var regex = /(<([^>]+)>)/ig
     			,   body = html
     			,   result = body.replace(regex, "");

     		var parseJson = $.parseJSON(result);
     		
      		_showErrorMsg(parseJson["_error"]);
      		_showProgressBar(false);
	    },
	     	data: $("#dynaFileForm_"+_pageRef).serialize()
		});
	}
	
	function doHideGridAndButton(selFile)
	{
		$("#importGridSection_" + _pageRef).hide();
		$("#saveScriptBtn_" + _pageRef).hide();
		$("#runScriptBtn_" + _pageRef).hide();
		$("#saveExecLogBtn_" + _pageRef).hide();
	}

	
	