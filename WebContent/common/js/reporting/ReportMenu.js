function verifyReport()
{
		var url = jQuery.contextPath+ "/path/repCommon/reportAction_verifyReport.action";
		params={};
		params["_pageRef"] = _pageRef;
		$.ajax({
			url: url,
			type:"post",
			dataType:"json",
			data: params,
			success: function(param)
			{
			   _showErrorMsg(param["updates"],info_msg_title,400,100);
			}
		});
}

function refreshRepMenuData(pageref, isFrom) {
    _showProgressBar(true);
    $.ajax({
           url: jQuery.contextPath+ "/path/dummy/DummyAction",
           type:"post",
           dataType:"json",
           success: function(data)
           {
                  _showProgressBar(false);
                  refreshRepMenuDataCommon(pageref, isFrom);
           }
    });
    
}

function refreshRepMenuDataCommon(pageref, isFrom) {
	$("#iframeLoaded_"+pageref).val("");
	if (typeof isFrom == "undefined" )
	{
		_showProgressBar(true);
		document.getElementById("tdPrint_" + pageref).style.display = "";
	}
	else
	{
		document.getElementById("tdPrint_" + pageref).style.display = "none";
	}
	var refreshUrl = jQuery.contextPath
			+ "/path/repCommon/reportAction_generateReport.action";
	var params = $("#dynParamFrmId" + pageref).serializeForm();
	var fromPage = parseInt($("#fromPage_" + pageref).val());
	var toPage = parseInt($("#toPage_" + pageref).val());
	
	if ( !isNaN(fromPage) && !isNaN(toPage) && (fromPage > toPage)) {
		_showErrorMsg(pagesRangeMsg, error_msg_title, 300, 100);
		_showProgressBar(false);
		return;
	}
	
	if(isNaN(fromPage))
	{
		fromPage=-9999999;
	}
	if (isNaN(toPage)) 
	{
		toPage=-9999999;
	}

	params += "&fromMenu=true&fromPage=" + fromPage + "&toPage=" + toPage;
	if (typeof isFrom != "undefined" && isFrom == 1) {
		params += "&noData=true";
	}

	//annasuccar- 16/07/2013: load the html response inside an iframe instead of div 
	//to prevent the unresponsive script warning from poping up when the html is large
	/*$('#repMenuPrevDiv_'+pageref).load(refreshUrl, params, function(param)
	{
		$("#repMenuPrevDiv_"+pageref).html(param);
	_showProgressBar(false);
	});*/
	var themeName = (window["globalThemeName"] === undefined || window["globalThemeName"] == "") ? "Cupertino"
			: globalThemeName;
	themeName = themeName.toLowerCase();
	var progressUrl = jQuery.contextPath
			+ '/common/style/images/progressImages/' + themeName + '_Image.gif';
	//_showProgressBar(true);
	var finalUrl = refreshUrl + "?" + params;
	if(typeof isFrom == "undefined")
	{
		params += "&retrieveCall=true";
		$.ajax( {
			url : returnEncryptedUrl(refreshUrl),
			type : "post",
			dataType : "json",
			data : params,
			success : function(param) {
				if (typeof param["_error"] == "undefined"
						|| param["_error"] == null) 
				{
					if(param.reportOutputCO.hasPagination)
					{
						$("#tdPaginationPrevious_"+pageref).show();
						$("#tdPaginationNext_"+pageref).show();
						//hide the print button in case of oversize report
						$("#tdPrint_"+pageref).hide();
						//disable previous button and enable next button
						$('#btnPrevious_' + pageref).button({disabled : true});
						$('#btnNext_' + pageref).button({disabled : false});
						//initialize first page with 1
						$("#currentPage_"+pageref).val("1");
						$("#paginationCount_"+pageref).val(param.reportOutputCO.paginationCount);
					}
					else
					{
						$("#tdPaginationPrevious_"+pageref).hide();
						$("#tdPaginationNext_"+pageref).hide();
					}
//					$("#iframId_"+ pageref).contents().find('html').html(param.reportOutputCO.outputHtml);
					$("#iframId_"+ pageref).contents().find('html').find('head').empty();
					$("#iframId_"+ pageref).contents().find('html').find('body').empty().html(param.reportOutputCO.outputHtml);
					_showProgressBar(false);
				}
				else
				{
					_showProgressBar(false);
				}
			}
		});
	}
	else
	{
		jQuery(
				'<form id="submitFrmId_' + pageref + '" target="reportPrevIframe_'
				+ pageref + '"  action="' + returnEncryptedUrl(finalUrl)
				+ '" method="POST"></form>').appendTo("body").submit()
				.remove();
	}

		if (isFrom != 1) 
	{
			//check if the iframe is not yet loaded then call the dummy action in order to not loose the session	
			var interv=$("#hiddenSessionTimeOut_"+pageref).val()
			var timeoutId = setInterval(function()
			{
				 if($("#iframeLoaded_"+pageref).val()=="")
				 {
				 	callDummyAction_REP() 
				 } 
				 else
				 {
				 	clearInterval(timeoutId);
				 }
			 }, interv);
				
			
			//collapse arguements div after retrieving the report
		var collapseDiv = $("#paramsDivCollapsible_"+pageref+" > .collapsibleContainerTitle").get(0);
		if (!$(collapseDiv).next(".collapsibleContainerContent").is(":hidden")) 
		{
			$(collapseDiv).trigger("click");
		}
	}
		
	window.setTimeout(
	function()
	{
		//set iframe height
		var mainHeight;
		var menuTabsHeight = 0;
		var barHeight = 0;
		if(window.name && window.name.indexOf("extScreenFrame_"+pageref) == 0)
		{
			   mainHeight = $("#screenContainerDiv_"+pageref).height();
		}
		 
		else if($("#mainTabs")==null || $("#mainTabs").height()==null)
		{
			 mainHeight = $("#portal_div").height();
		}
	
		else
		{
			 mainHeight = $("#mainTabs").height();
			 menuTabsHeight = $("#mainTabs ul:first-child").height();
			 barHeight = $("#infoBarCell_" + pageref).length >0 ? 
                $("#infoBarCell_" + pageref).height():0;

		}
		
		var mainTblHeight = document.getElementById("mainTbl_" + pageref).offsetHeight;
		var frmHeight = mainHeight - menuTabsHeight - barHeight - mainTblHeight;
		document.getElementById("iframId_" + pageref).height = frmHeight;
	}, 1000);
}

function openSortRep(pageref)
{
	$('#orderPrevRepDlg_'+pageref).dialog('open');
}

function openFilterRep(pageref)
{
		$('#filterPrevRepDlg_'+pageref).dialog('open');
}
function openGrpRep(pageref)
{
  	//check if the main report contains a group
    var zUrl = jQuery.contextPath+ "/path/repCommon/commonReporting_checkGrpUsage.action";
	var params={};
	params["_pageRef"]=_pageRef;
	params["requestStr"]=requestStr;
	$.post(zUrl, params , function( param )
	{
		var isUsed=param["updates"];
		if(isUsed > 0)
		{
			_showErrorMsg(grpExist);
		}
		else
		{
			$('#grpPrevRepDlg_'+pageref).dialog('open');
		}
	});

	
}


//function loadHtmlReportMenu()
//{
	//var htmlSrc=jQuery.contextPath+ "/path/repCommon/commonReporting_loadPreviewHTML.action?_pageRef="+_pageRef;	
	//repMenuPrevDiv_HFD00
	//$("#repMenuPrevDiv_"+_pageRef).load(htmlSrc);
//}

function resetReportMenuData(pageref,appNme) {
	_showConfirmMsg(
			resetAlert,
			resetTitle,
			function(confirmcChoice, theArgs) {
				if (confirmcChoice) {
					//relaoad parameters
					//we replaced the menu with pageref cs if we open more than one tab at the same time the menu will be the value of the last opened report 
					var params1 = {};
					params1["r_r"] = $("#hiddenMenuId_"+pageref).val();
					params1["htmlPageRef"]=pageref;
					params1["a"]=appNme;
					if($("#hidden_r_a_p_"+pageref).val() != undefined)
					{
					params1["r_a_p"]= $("#hidden_r_a_p_"+pageref).val();
					}
					srcURL=jQuery.contextPath+"/path/repCommon/commonDynamicParams_loadDynParam.action";
					$('#paramsDiv_' + pageref).load(srcURL, params1, function()
	 				{
							//reset group,fileter and order
							var zUrl = jQuery.contextPath
									+ "/path/repCommon/commonReporting_resetPreviewOptions.action";
							var params = {};
							params["_pageRef"] = $("#hiddenMenuId_"+pageref).val();
							$.post(zUrl, params, function(param) {
								//reload data
		//							_showConfirmMsg(reloadData, reloadTitle, function(
		//									confirmcChoice, theArgs) {
		//								if (confirmcChoice) {
											$("#fromPage_"+ _pageRef).val("");
											$("#toPage_"+ _pageRef).val("");
											$("#lang_id").val(null);
											refreshRepMenuData(pageref,1);
		//								}
		//							}, null, null, null, 300, 100);
								});
					});
				}
			}, null, null, null, 300, 100);

}

function generate(pdff)
{
	   var url = jQuery.contextPath +"/path/repCommon/reportAction_generateReport.action?";
	   var ref = _pageRef.replace(/-/g, "_");
	   var formParams = $("#dynParamFrmId"+ref).serializeForm();
	   var fromPage = parseInt($("#fromPage_" + ref).val());
	   var toPage = parseInt($("#toPage_" + ref).val());
	   if (isNaN(fromPage))
	   {
		   fromPage = -9999999;
	   }
	   if (isNaN(toPage))
	   {
		   toPage = -9999999;
	   }
	   formParams += "&fromPage=" + fromPage + "&toPage=" + toPage;

	_showProgressBar(true);
	   var isRepDone=false;
	if(typeof pdff != "undefined" && pdff=='1')
	{
		formParams+="&repPrintPdf=1";
	   //Based on jquery.fileDownload.js
	   //create an iframe to load the pdf, wait for download complete on cookie return
	   //use setTimeout instead of iframe onload method due to limitation of iframe on IE
	   //destroy the iframe and recreate it as its receiving a new pdf
	   
	   $('#tempPdfIframe').remove();
    //create a temporary iframe that is used to request the fileUrl as a GET request
    $iframe = $("<iframe id='tempPdfIframe'>")
        .hide()
        .attr("src", url+formParams)
        .appendTo("body");
    
    var cookieName= "repPdfFileDownload";
    var cookieValue= "true";
    var cookiePath= "/";
    //check if the file download has completed every checkInterval ms
    setTimeout(checkFileDownloadComplete,100);


    function checkFileDownloadComplete() {

        //has the cookie been written due to a file download occuring?
        if (document.cookie.indexOf(cookieName + "=" + cookieValue) != -1) {
     	   
		    	isRepDone=true;
		    	_showProgressBar(false);

            //remove the cookie and iframe
            var date = new Date(1000);
            document.cookie = cookieName + "=; expires=" + date.toUTCString() + "; path=" + cookiePath;

            return;
        }

        //has an error occured?
        //if neither containers exist below then the file download is occuring on the current window
        if ($iframe) {
            //has an error occured?
            try {
         	   var formDoc = $iframe[0].contentWindow || $iframe[0].contentDocument;
                if (formDoc.document) {
             	   formDoc = formDoc.document;
                }
                
                if (formDoc && formDoc.body != null && formDoc.body.innerHTML.length > 0) {
    			    		isRepDone=true;
    			    		_showErrorMsg(formDoc.body.innerHTML);
    			    		_showProgressBar(false);
    			    		return;
                }
            }
            catch (err) {
                //500 error less than IE9
			    	isRepDone=true;
			    	_showErrorMsg("");
			    	_showProgressBar(false);	
                return;
            }
        }
        //keep checking...
        setTimeout(checkFileDownloadComplete, 100);
    }
}
else
{
	  $.fileDownload(url,
				{
				    successCallback: function (url) 
				    {
				    	isRepDone=true;
				    	_showProgressBar(false);
				    },
				    failCallback: function (html, url) 
				    {
				    	isRepDone=true;
				    	_showErrorMsg(html)
				    	_showProgressBar(false);	 
				    },
				    httpMethod: "POST",
				    data:formParams,
				});	
	 //check if the report did not return result yet then call the dummy action in order to not loose the session	
		var interv=$("#hiddenSessionTimeOut_"+ref).val()
		var timeoutId = setInterval(function()
		{
			 if(isRepDone==false)
			 {
			 	callDummyAction_REP() 
			 } 
			 else
			 {
			 	clearInterval(timeoutId);
			 }
		 }, interv);	
}
}

/*function that will only call a dummy action just to always send 
request to the server in case the report is taking time to 
retrieve data ,it is added to not face a disconnection issue*/
function callDummyAction_REP()
{
	$.ajax({
			url: jQuery.contextPath+ "/path/dummy/DummyAction",
	  		type:"post",
	  		dataType:"json",
	  		success: function(data)
	  		{
	  		}
	});
}

function fillIframeLoadedInput(pageref)
{
	$("#iframeLoaded_"+pageref).val("iframeLoaded");
}



function hideShowCsvSepartor(pageref)
{
	var repFormat=document.getElementById("format_id_"+pageref).value;
	document.getElementById("chkHeadFootLblId_"+pageref).innerHTML=""+repMenuNoHeadAndFoot;
	
	document.getElementById("chkHeadFootLblId_"+pageref).style.display="inline";
	document.getElementById("chkHeadFootId_"+pageref).style.display="inline";
	if(repFormat=="SQL")
	{
	document.getElementById("chkHeadFootLblId_"+pageref).style.display="none";
	document.getElementById("chkHeadFootId_"+pageref).style.display="none";
	}	
	if(repFormat=="RDTXT" || repFormat=="RDXLS")
	{
		document.getElementById("chkHeadFootLblId_"+pageref).innerHTML=""+repMenuNoHeaders;	
	}
	if(repFormat=="CSV" || repFormat=="RDTXT" || repFormat == "CSVEXT")
	{
		document.getElementById("csvSeparatorId_"+pageref).style.display="inline";
	}
	else
	{
		document.getElementById("csvSeparatorId_"+pageref).style.display="none";
	}
}
function onChangeComparison(paramName)
{
	var myObject = $("#dynParamFrmId" + htmlPageRef).serializeForm();
	var url=jQuery.contextPath+"/path/repCommon/reportAction_checkComparison.action?updates="+paramName;
	$.ajax({
			url: url,
			type:"post",
			dataType:"json",
			data: myObject,
			success: function(param)
			{
				if(param["updates"]!=paramName)
				{
					_showErrorMsg(param["updates"],error_msg_title,500,200);
					$("#"+param["update"]).val("");
				}
			}
		});
	
}

function onChangeShowHide(paramName)
{
	var myObject = $("#dynParamFrmId"+ htmlPageRef).serializeForm();
	var url=jQuery.contextPath+"/path/repCommon/reportAction_checkShowHideExpr.action?updates="+paramName;
	
	$.ajax({
			url: url,
			type:"post",
			dataType:"json",
			data: myObject,
			success: function(param)
			{
				callDependency(	"fcrId_"+htmlPageRef+":glstmpltCO.FCRStr",
				jQuery.contextPath+'/path/repCommon/reportAction_adjustVisibility.action?_pageRef='+_pageRef,
				"",
				"",
				"");
			}
		});
}

function onChangeRefresh(paramName)
{
	var myObject = $("#dynParamFrmId" +htmlPageRef).serializeForm();
	var url=jQuery.contextPath+"/path/repCommon/reportAction_fillNewArgsValuesInSession.action?updates="+paramName+"&conId="+$("#connection_id_"+htmlPageRef).val();
	$.ajax({
			url: url,
			type:"post",
			dataType:"json",
			data: myObject,
			success: function(param)
			{
				callDependency(	"fcrId_"+htmlPageRef+":glstmpltCO.FCRStr",
				jQuery.contextPath+'/path/repCommon/reportAction_refreshArgumentsValues.action?_pageRef='+htmlPageRef,
				"",
				"",
				"");
			}
		});
}


/*this method will be called on change of the language combo
to update the valule of the arguments of type translated session*/
function updateTransSessionArgs(size, langComboId, elts) 
{
	for ( var i = 1; i <= size; i++)
	{
		var elt = elts['elt' + i];
		var sessInputId = elt["id"];
		var transAr = elt["transAr"];
		var transEn = elt["transEn"];
		var lang = $("#" + langComboId).val();
		if (lang == "AR") 
		{
			$("#" + sessInputId).val(transAr);
		} 
		else
		{
			$("#" + sessInputId).val(transEn);
		}
	}
}

/*This method will take the value in the language combo and add it to the 
inputs of type Report Language*/
function updateRepLangParams(pageref,idsList,namesList)
{
	var reportLang = $("#lang_id_"+pageref).val();
	var repLangArray = new Array();
	repLangArray =idsList.split(",");
	var argNamesArray = new Array();
	argNamesArray =namesList.split(",");
	for(i=0;i<repLangArray.length;i++)
	{
		$("#"+repLangArray[i]).val(reportLang);
		onChangeRefresh(argNamesArray[i])
	}
}
function rep_filters_saveLoadFilter(action,pageref)
{
	//insert or update
	if (action == 1)
	{
		if($("#filterName_"+pageref).val()=="")
		{
			_showErrorMsg(emptyFilterName, error_msg_title, 200, 100);
			return false;
		}
		var filterId 		 = $("#hiddenFilterId_"+htmlPageRef).val();
		var filterName 		 = $("#filterName_"+pageref).val();
		var publicYn 		 = $("#filterPublic_"+pageref).is(':checked');
		var overrideArgument = $("#overrideArgs_"+pageref).is(':checked');
		var defaultYn = $("#filterDefault_"+pageref).is(':checked');
		update=updateMode;
		if (filterId == null || filterId == "")
		{
			update=insertMode;
		}
		var myObject = $("#dynParamFrmId"+htmlPageRef).serializeForm();
		var url = jQuery.contextPath
					+"/path/repCommon/reportAction_saveLoadFilter.action?update="+update+"&filterName="
					+filterName+"&publicYn="+publicYn+"&updates="+overrideArgument+"&defaultYn="+defaultYn;
			$.ajax({
				url : url,
				type : "post",
				dataType : "json",
				data : myObject,
				success : function(param)
				{
					if(param["update"]==0)
					{
						_showErrorMsg(filterNameExists, error_msg_title, 200, 100);
					}
					else if(param["update"]==2)
					{
						_showErrorMsg(defaultFilterExists, error_msg_title, 200, 100);
					}	
					else if(param["update"]==3)
					{
						_showErrorMsg(defaultFilterAndNameExists, error_msg_title, 200, 100);
					}
					else if(param["update"]==falseVal)
					{
						_showErrorMsg(noArgsToSave, error_msg_title, 250, 100);
					}
					else
					{
						$("#hiddenFilterId_"+htmlPageRef).val(param["filterId"]);
						$("#argsFilterDlg_"+htmlPageRef).dialog("close");
						$("#hiddenFilterTmpId_"+htmlPageRef).val("");
					}
				}
			});
	}
	//loading a filter
	else
	{
		var rowId = $("#argFiltersGrid_" + pageref).jqGrid('getGridParam','selrow');
		if (rowId == null)
		{
			_showErrorMsg(noFilterSelected, info_msg_title, 200, 100);
			return false;
		}
		var myObject 	 = $("#argFiltersGrid_"+pageref).jqGrid('getRowData',rowId);
		selectedFilterId = myObject["FILTER_ID"];
		$("#hiddenFilterId_" + htmlPageRef).val(selectedFilterId);
		myObject 	     = $("#dynParamFrmId" + htmlPageRef).serializeForm();
		var url = jQuery.contextPath+"/path/repCommon/reportAction_saveLoadFilter.action?filterId="+selectedFilterId+"&update=true"
			+"&var_menuId="+pageref;
		_showProgressBar(true)
		$.ajax({
			url : url,
			type : "post",
			dataType : "json",
			data : null,
			success : function(param)
			{
				$("#argsFilterDlg_"+htmlPageRef).dialog("close");
				_showProgressBar(false)
				callDependency(	"fcrId_"+_pageRef+":glstmpltCO.FCRStr",
						jQuery.contextPath+'/path/repCommon/reportAction_refreshArgumentsValues.action?_pageRef='+_pageRef+
						"&var_menuId="+pageref,
						"",
						"",
						"");
			}
		});
	}
}

function rep_filters_deleteFilter()
{
	rowid = $("#argFiltersGrid_" +htmlPageRef ).jqGrid('getGridParam', 'selrow');
	myObject = $("#argFiltersGrid_" +htmlPageRef ).jqGrid('getRowData', rowid);
	selectedFilterId = myObject["FILTER_ID"];
	createdBy=myObject["CREATED_BY"];
	//empty data hashmaps	
	var url = jQuery.contextPath
			+ "/path/repCommon/reportAction_deleteFilter.action?update="+createdBy+"&filterId="
			+ selectedFilterId;
	$.ajax({
		url : url,
		type : "post",
		dataType : "json",
		data : null,
		success : function(param)
		{
			if(param["update"]==1)
			{
				_showErrorMsg(filterOtherUser, info_msg_title, 300, 100);
			}
			else
			{
				if($("#hiddenFilterId_"+htmlPageRef).val()==selectedFilterId)
				{
					$("#hiddenFilterId_"+htmlPageRef).val("");
				}
				$("#argFiltersGrid_" + htmlPageRef).jqGrid('deleteGridRow');
			}
		}
	});
}

function rep_filters_refillIdIfAny()
{
	if($("#hiddenFilterTmpId_"+htmlPageRef).val()!="")
	{
		$("#hiddenFilterId_"+htmlPageRef).val($("#hiddenFilterTmpId_"+htmlPageRef).val());	
		$("#hiddenFilterTmpId_"+htmlPageRef).val("");
	}
}

function rep_filters_emptyForm()
{
	$("#filterName_"+htmlPageRef).val("");
	$("#filterPublic_"+htmlPageRef).attr('checked', false);
	$("#overrideArgs_"+htmlPageRef).attr('checked', false);
	$("#filterDefault_"+_pageRef).attr('checked', false);
	$("#overrideArgs_"+htmlPageRef).attr('disabled', 'disabled');
	$("#hiddenFilterTmpId_"+htmlPageRef).val($("#hiddenFilterId_"+htmlPageRef).val());
	$("#hiddenFilterId_"+htmlPageRef).val("");	
	$("#filterName_"+htmlPageRef).removeAttr("readonly");
	$("#filterPublic_"+htmlPageRef).removeAttr("disabled");
	$("#save_btn_"+htmlPageRef).attr('aria-disabled',false).removeClass('ui-button-disabled ui-state-disabled');
	$("#save_btn_"+htmlPageRef).removeAttr('disabled','disabled')
}

function rep_filters_publicReadOnly()
{
	var rowIds = $("#argFiltersGrid_"+htmlPageRef).jqGrid('getDataIDs');
    for (var i =0;i<rowIds.length;i++)
    {
        var lRowId = rowIds[i];
    	$("#argFiltersGrid_"+htmlPageRef).jqGrid("setCellReadOnly",lRowId,"PUBLIC_YN",true);
    	$("#argFiltersGrid_"+htmlPageRef).jqGrid("setCellReadOnly",lRowId,"DEFAULT_YN",true);
    }
}

function rep_filters_readyFunc(pageref)
{
	$("div#argsFilterOuterDiv_"+pageref+" .collapsibleContainer").collapsiblePanel();
	$("div#argsFilterTblDiv_"+pageref+" .collapsibleContainer").collapsiblePanel();
	$("#argFiltersGrid_"+pageref).subscribe('addLoadFilterBtn',function(event, data) {
	var pagerId = "argFiltersGrid_"+pageref+"_pager_left";
	var myGrid = $("#argFiltersGrid_"+pageref);
	myGrid.jqGrid('navButtonAdd',pagerId,{
			caption : "",
			title : loadFilter,
			id : "loadFilterButton_"+htmlPageRef,
			buttonicon : 'ui-icon-arrowthickstop-1-s',
			onClickButton : function() {
				rep_filters_saveLoadFilter(2,pageref);
			}});				
	});
filterId = $("#hiddenFilterId_"+htmlPageRef).val();
if(filterId=="" || filterId=="-9999999")
{
	$("#overrideArgs_"+pageref).attr('disabled', 'disabled');
}
else
{
	params={};
	params["_pageRef"]=_pageRef;
	params["var_menuId"]=pageref;
	params["filterId"]=filterId;
	var url = jQuery.contextPath+"/path/repCommon/reportAction_retFilterById.action"

		$.ajax({
		url : url,
		type : "post",
		dataType : "json",
		data : params,
		success : function(param)
		{
			$("#filterName_"+htmlPageRef).val(param["irpRepFilterVO"].FILTER_NAME);
			$("#overrideArgs_"+htmlPageRef).attr('checked', true);
			$("#filterPublic_"+htmlPageRef).attr('checked',param["irpRepFilterVO"].PUBLIC_YN==1?true:false);
			$("#filterDefault_"+htmlPageRef).attr('checked',param["irpRepFilterVO"].DEFAULT_YN==1?true:false);
			if(param["updates"]=="false")
			{
				$("#filterName_"+htmlPageRef).attr("readonly","readonly");
				$("#filterPublic_"+htmlPageRef).attr("disabled","disabled");
				$("#overrideArgs_"+htmlPageRef).attr('disabled', 'disabled');
				$("#save_btn_"+htmlPageRef).attr('aria-disabled',true).addClass('ui-button-disabled ui-state-disabled');
				$("#save_btn_"+htmlPageRef).attr('disabled','disabled');
			}
			else
			{
				$("#save_btn_"+htmlPageRef).attr('aria-disabled',false).removeClass('ui-button-disabled ui-state-disabled');
				$("#save_btn_"+htmlPageRef).removeAttr('disabled','disabled');
			}
		}
		});
}
$("#argFiltersGrid_"+pageref).subscribe('rep_filters_publicReadOnly', function(event, data) {
	rep_filters_publicReadOnly();
});
}

function rep_checkSnapshotExist(rr,pageref) {
    _showProgressBar(true);
    $.ajax({
           url: jQuery.contextPath+ "/path/dummy/DummyAction",
           type:"post",
           dataType:"json",
           success: function(data)
           {
                  _showProgressBar(false);
                  rep_checkSnapshotExistCommon(rr,pageref);
           }
    });
    
}


/* Author:Fares Kassab 
 * date:15/07/2016
 * desc:function that will call reportAction checkSnapshotExist method in case of "TXTFILE" format to check the existance of a snapshot parameter*/
function rep_checkSnapshotExistCommon(rr,pageref)
{
	var repFormat = $("#format_id_"+pageref).val();
	
	if (repFormat == "TXTFILE" || repFormat=="DAT")
	{
	var url = jQuery.contextPath + "/path/repCommon/reportAction_checkSnapshotExist.action?";
	params={};
	params["_pageRef"] = rr;
	$.ajax({
			url: url,
			type:"post",
			dataType:"json",
			data: params,
			success: function(param)
			{
				if(param["updates"] == "true")
				{
					_showErrorMsg(notExistTxtFormula,warning_msg_title,300,100);
					_showProgressBar(false);
					return;
				}
				else
				{
				generate();
				}
	    	}
		   });
	}
	else
	{
	generate();
	}
}

function printIframeContents(pgRef)
{
	var myObject = $("#dynParamFrmId" + pgRef).serializeForm();
	var url=jQuery.contextPath+"/path/repCommon/reportAction_checkAuditPrintReport.action?conId="+$("#connection_id_"+pgRef).val();
	$.ajax({
			url: url,
			type:"post",
			dataType:"json",
			data: myObject,
			success: function(param)
			{
				//if 1 then print the report using its pdf format based on the rep_print_pdf_yn flag
				if(param["updates"]==1)
				{  
					generate('1');
				}
				else
				{
					common_printFrameContents("iframId_"+pgRef);	
				}
			}
		});
}

function rep_paginationPreviousNext(page_ref,PreviousOrNext)
{
	var currentPage = $("#currentPage_"+page_ref).val();
	var refreshUrl = jQuery.contextPath
			+ "/path/repCommon/reportAction_paginationPreviousNext.action";
	var params = {};
	params["_pageRef"] = page_ref;
	_showProgressBar(true);
	$('#btnPrevious_' + page_ref).button({disabled : false});
	if(PreviousOrNext == "P")
	{
		params["currentPage"] = --currentPage;
	}
	else
	{
		params["currentPage"] = ++currentPage;
	}	
	$.ajax( {
		url : refreshUrl,
		type : "post",
		dataType : "json",
		data : params,
		success : function(param) {
			if (typeof param["_error"] == "undefined"
					|| param["_error"] == null) 
			{
				if(param.reportOutputCO.outputHtml != null)
				{
					//related to previous button
					if(currentPage == 1)
					{
						$('#btnPrevious_' + page_ref).button({disabled : true});
					}
					else
					{
						$('#btnPrevious_' + page_ref).button({disabled : false});
					}	
					//related to next button
					if($("#paginationCount_"+page_ref).val() == currentPage)
					{
						$('#btnNext_' + page_ref).button({disabled : true});
					}
					else
					{
						$('#btnNext_' + page_ref).button({disabled : false});
					}	
					$("#iframId_"+ page_ref).contents().find('html').html(param.reportOutputCO.outputHtml);
					_showProgressBar(false);
				}
				
					$("#currentPage_"+page_ref).val(currentPage);
				
				_showProgressBar(false);
			}
			else
			{
				_showProgressBar(false);
			}
		}
	});
}