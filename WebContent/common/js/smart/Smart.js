function closeSmartWindow() {
	var trxNbr_val = $("#auditTrxNbr_" + _pageRef).val();
	if (typeof trxNbr_val == "undefined" || trxNbr_val == null
			|| trxNbr_val == "") {
			//Bug501397 external file is not saved in the first phase (OK button)
		$("#smartWindow_" + _pageRef).replaceWith(function() { return $(this).contents(); });
		$("#smartDivElementId_" + _pageRef).dialog("destroy").appendTo(
				"#" + $('#auditTrxNbr_' + _pageRef).parent().attr("id"));
	} else {
		$("#smartDivElementId_" + _pageRef).dialog("destroy");
		$("#smartDivElementId_" + _pageRef).remove();
	}
}

function clearExternalFile(id) {
	var elem = document.getElementById("browse_" + id + "_" + _pageRef);
	var name = $(elem).attr('name');
	var elemId = $(elem).attr('id');
	$(elem)
			.replaceWith(
					"<input type='file' id=" + elemId + " name=" + name + " />");
	$("#smartCOList_"+id+"_smartFileEncodedBytes").val('');
	$("#smartCOList_"+id+"_smartFileEncodedFileName").val('')
}
function detachExternalFile(id) {
	_showConfirmMsg(Confirm_Delete_Process_key, Warning_key,
			callDetachExternalFile, {
				fieldId : id
			});
}

function callDetachExternalFile(confirm, args) {
	if (confirm) {
		//Bug 570461 add special branch / company code
		var smartSpecCompCode = '';
		var smartSpecBranchCode = '';
		if($("#smartSpecCompCode_" + _pageRef) && $("#smartSpecBranchCode_" + _pageRef))
		{
			if($("#smartSpecCompCode_" + _pageRef).val() != "undefined" && $("#smartSpecCompCode_" + _pageRef).val() != null
					&& $("#smartSpecBranchCode_" + _pageRef).val() != "undefined" && $("#smartSpecBranchCode_" + _pageRef).val() != null)
				{
				smartSpecCompCode = $("#smartSpecCompCode_" + _pageRef).val();
				smartSpecBranchCode =  $("#smartSpecBranchCode_" + _pageRef).val();
				}
		}
		
		var id = args.fieldId;
		//TP 841913 Handle SMART auditing upon upload/delete attachments
		var addTypeCode = $("#sAdditionsDetailsSAddTypeCode_" + id + "_" + _pageRef).val();
		var fileName =	$("#addText1_"+id + "_" + _pageRef).val();
		var trxNbr_val = $("#auditTrxNbr_" + _pageRef).val();
		var _parentPageRef = $("#_parentPageRef_" + _pageRef).val();

		//Bug 501397 Changed saddTypeCode variable non standard name
		$.ajax( {
					url : jQuery.contextPath
							+ "/path/smart/Smart_detachExternalFile?progRef="
							+ _parentPageRef + "&trxNbr=" + trxNbr_val
							+ "&saddTypeCode=" + addTypeCode+"&smartSpecCompCode="+smartSpecCompCode+"&smartSpecBranchCode="+smartSpecBranchCode
							+"&filename="+fileName,
					type : "get",
					dataType : "json",
					success : function(data) {
						if (typeof data["_error"] == "undefined"
								|| data["_error"] == null) {
							var elemDiv = document.getElementById("externalProgmDiv_" + id + "_" + _pageRef);
							$(elemDiv).replaceWith(
							"<input type='file' id='browse_"+ id + "_"+_pageRef+"' name='smartCOList[" + id + "].externalFile' />"
							+ "<span class='collapsibleIcon'>"
							+ "<a id='clearExternalFile_" + id + "_"+_pageRef+"' class='fg-button ui-state-default ui-corner-all fg-button-icon-left' onclick='javascript:clearExternalFile(" + id + ");'>"
							+ "<span class='ui-icon ui-icon-copy'></span>"
							+ "Clear</a></span>");
							//TP 841913 Handle SMART auditing upon upload/delete attachments
							$("#auditActionDate_" + _pageRef).val(data.auditActionDate);
						}
					}
				});
	}
}


function smart_setMethodName(methodValue)
{
	$("#smartSubmitMethodName_"+_pageRef).val(methodValue);
	submitSmartDetails();
}
 
function submitSmartDetails() {

	_showProgressBar(true);
	//Bug 570461 add special branch / company code
	var smartSpecCompCode = '';
	var smartSpecBranchCode = '';
	if($("#smartSpecCompCode_" + _pageRef) && $("#smartSpecBranchCode_" + _pageRef))
	{
		if($("#smartSpecCompCode_" + _pageRef).val() != "undefined" && $("#smartSpecCompCode_" + _pageRef).val() != null
				&& $("#smartSpecBranchCode_" + _pageRef).val() != "undefined" && $("#smartSpecBranchCode_" + _pageRef).val() != null)
			{
			smartSpecCompCode = $("#smartSpecCompCode_" + _pageRef).val();
			smartSpecBranchCode =  $("#smartSpecBranchCode_" + _pageRef).val();
			}
	}
	var okClicked = $("#smartSubmitMethodName_"+_pageRef).val() == 'ok'?false:true;
	var trxNbr_val = $("#auditTrxNbr_" + _pageRef).val();
	var _parentPageRef = $("#_parentPageRef_" + _pageRef).val();
	var smartScrPar = $("#smartScreenParams_" + _pageRef).val();
	//TP 841913 Handle SMART auditing upon upload/delete attachments
	var auditActionDate = $("#auditActionDate_" + _pageRef).val();
	var mainJson = JSON.parse(smartScrPar);
	var imalIndex = mainJson["smartScreenParams"];
	var smartCifNo, smartCifAddRef;
	var i;
	var iLength = imalIndex.length;
	for (i = 0; i < iLength; i++)
	{
		if (imalIndex[i].isCIF == "Y")
		{
			smartCifNo = $("#" + imalIndex[i].ID + "_" + _pageRef).val();
		}
		else
		{
			smartCifAddRef = $("#" + imalIndex[i].ID + "_" + _pageRef).val();
		}
	}
	
    var params = {
    		"progRef":_parentPageRef,
		    "trxNbr":trxNbr_val,
		    "_pageRef":_pageRef,
		    "smartCifNo": smartCifNo,
		    "smartCifAddRef":smartCifAddRef,
			"smartSpecCompCode"     :     smartSpecCompCode,
			"smartSpecBranchCode"   :     smartSpecBranchCode
    }
	//Bug501397 external file is not saved in the first phase (OK button)
	$("#smartDivElementId_" + _pageRef).dialog("hide");
				$("#"+$('#auditTrxNbr_'+_pageRef ).parent().attr("id")).append('<form id="smartWindow_' + _pageRef+'" enctype="multipart/form-data"  method="post"  action="">');
				$("#smartWindow_" + _pageRef).html($("#smartDivElementId_" + _pageRef));
				$("#smartWindow_" + _pageRef).ajaxForm( {});
				var options = {
					url : jQuery.contextPath
							+ "/path/smart/submitSmartDetails",
					dataType : 'json',
					data: params,
					clearForm : okClicked,
					type : 'post',
					success : function(data) {
						if (typeof data["_error"] == "undefined"
								|| data["_error"] == null) {
							//Bug501397 external file is not saved in the first phase (OK button)
							for(i=0; i<data.smartCOList.length;i++)
							{
								if(data.smartCOList[i] != null)
								{
									$("#smartCOList_"+i+"_smartFileEncodedBytes").val(data.smartCOList[i].smartFileEncodedBytes);
									$("#smartCOList_"+i+"_smartFileEncodedFileName").val(data.smartCOList[i].smartFileEncodedFileName);
								}
							}
							
						}
						//TP 841913 Handle SMART auditing upon upload/delete attachments
						$("#auditActionDate_" + _pageRef).val("");
						closeSmartWindow();
						_showProgressBar(false);
					}
				};
				$("#smartWindow_" + _pageRef).ajaxSubmit(options);
}

function smartPrevScannedImg(pageRef, uniqId, theurl, sAddTypeCode) {
	//Bug 570461 add special branch / company code
	var smartSpecCompCode = '';
	var smartSpecBranchCode = '';
	if($("#smartSpecCompCode_" + _pageRef) && $("#smartSpecBranchCode_" + _pageRef))
	{
		if($("#smartSpecCompCode_" + _pageRef).val() != "undefined" && $("#smartSpecCompCode_" + _pageRef).val() != null
				&& $("#smartSpecBranchCode_" + _pageRef).val() != "undefined" && $("#smartSpecBranchCode_" + _pageRef).val() != null)
			{
			smartSpecCompCode = $("#smartSpecCompCode_" + _pageRef).val();
			smartSpecBranchCode =  $("#smartSpecBranchCode_" + _pageRef).val();
			}
	}
//Bug 501397 Changed saddTypeCode variable non standard name
	var params = {
		"saddTypeCode" : $('#' + sAddTypeCode).val(),
		"trxNbr" : $("#auditTrxNbr_" + _pageRef).val(),
		"progRef" : _pageRef,
		"smartSpecCompCode"     :     smartSpecCompCode,
		"smartSpecBranchCode"   :     smartSpecBranchCode
	}
	previewScannedImg(pageRef, uniqId, theurl, params);
}

function smartRunScannedImg(pageRef, uniqId, theurl, sAddTypeCode) {
	//Bug 570461 add special branch / company code
	var smartSpecCompCode = '';
	var smartSpecBranchCode = '';
	if($("#smartSpecCompCode_" + _pageRef) && $("#smartSpecBranchCode_" + _pageRef))
	{
		if($("#smartSpecCompCode_" + _pageRef).val() != "undefined" && $("#smartSpecCompCode_" + _pageRef).val() != null
				&& $("#smartSpecBranchCode_" + _pageRef).val() != "undefined" && $("#smartSpecBranchCode_" + _pageRef).val() != null)
			{
			smartSpecCompCode = $("#smartSpecCompCode_" + _pageRef).val();
			smartSpecBranchCode =  $("#smartSpecBranchCode_" + _pageRef).val();
			}
	}
	//Bug 501397 Changed saddTypeCode variable non standard name
	var params = {
		"saddTypeCode" : $('#' + sAddTypeCode).val(),
		"trxNbr" : $("#auditTrxNbr_" + _pageRef).val(),
		"progRef" : _pageRef,
		"smartSpecCompCode"     :     smartSpecCompCode,
		"smartSpecBranchCode"   :     smartSpecBranchCode
	};
	var buttonsArr = {};
	buttonsArr[print_label_trans] = function() {
		$('#ImageDiv').printElement();
	};
	buttonsArr[download_key] = function() {
		downloadExternalFile($('#' + sAddTypeCode).val() - 1);
	};
	previewScannedImg(pageRef, uniqId, theurl, params, buttonsArr);
}

function showPreviewImage(sAddTypeCode) {
	var addTypeCode = $(sAddTypeCode).val();
	var trxNbr_val = $("#auditTrxNbr_" + _pageRef).val();
	var _parentPageRef = $("#_parentPageRef_" + _pageRef).val();
	//Bug 570461 add special branch / company code
	var smartSpecCompCode = '';
	var smartSpecBranchCode = '';
	if($("#smartSpecCompCode_" + _pageRef) && $("#smartSpecBranchCode_" + _pageRef))
	{
		if($("#smartSpecCompCode_" + _pageRef).val() != "undefined" && $("#smartSpecCompCode_" + _pageRef).val() != null
				&& $("#smartSpecBranchCode_" + _pageRef).val() != "undefined" && $("#smartSpecBranchCode_" + _pageRef).val() != null)
			{
			smartSpecCompCode = $("#smartSpecCompCode_" + _pageRef).val();
			smartSpecBranchCode =  $("#smartSpecBranchCode_" + _pageRef).val();
			}
	}
	
	//Bug 501397 Changed saddTypeCode variable non standard name
	var imgSrc = jQuery.contextPath
			+ "/path/smart/Smart_showPreviewImage.action?progRef="
			+ _parentPageRef + "&trxNbr=" + trxNbr_val + "&saddTypeCode="
			+ addTypeCode + "&randomNumber=" + Math.random()+"&smartSpecCompCode="+smartSpecCompCode+"&smartSpecBranchCode="+smartSpecBranchCode;
	var previewImageElement = $('<div id="previewImageElementId"></div>');
	previewImageElement.dialog( {
		autoOpen : false,
		modal : true,
		title : Preview_image_key,
		hide : 'clip',
		close : function(ev, ui) {
			$(this).dialog("destroy");
			$(this).remove();
		}
	});
	$("#previewImageElementId").load(imgSrc, function() {
		$("#previewImageElementId").dialog("open");
	});
}

function openHyperlinkWindow(id) {
	var url = $("#hypLink_" + id + "_" + _pageRef).val();
	if (validateURL(url)) {
		if (url.substring(0, 4) == "www.")
			url = "http://" + url;
		window.open(url, "_blank");
	} else {
		$(".formError").live("click", function() {
			$(this).fadeOut(150, function() {
				// remove prompt once invisible
					$(this).remove();
				});
		});
		//fix issue #551106 GAB170070 - FMS - SMART OPTION - default the url already defined in smart option
		_showErrorMsg($('#hypLink_' + id + "_" + _pageRef) + "URL is not Valied eg: http://www.google.com");
	}
}

function validateURL(textval) {
	//fix issue #551106 GAB170070 - FMS - SMART OPTION - default the url already defined in smart option
	var urlregex = new RegExp(
			"^(http:\/\/|https:\/\/|ftp:\/\/)");
	return urlregex.test(textval);
}

function downloadExternalFile(id) {
	//Bug 570461 add special branch / company code
	var smartSpecCompCode = '';
	var smartSpecBranchCode = '';
	if($("#smartSpecCompCode_" + _pageRef) && $("#smartSpecBranchCode_" + _pageRef))
	{
		if($("#smartSpecCompCode_" + _pageRef).val() != "undefined" && $("#smartSpecCompCode_" + _pageRef).val() != null
				&& $("#smartSpecBranchCode_" + _pageRef).val() != "undefined" && $("#smartSpecBranchCode_" + _pageRef).val() != null)
			{
			smartSpecCompCode = $("#smartSpecCompCode_" + _pageRef).val();
			smartSpecBranchCode =  $("#smartSpecBranchCode_" + _pageRef).val();
			}
	}
	
	params = {
			"saddTypeCode" : $("#sAdditionsDetailsSAddTypeCode_" + id + "_" + _pageRef).val(),
			"trxNbr" : $("#auditTrxNbr_" + _pageRef).val(),
			"progRef" : $("#_parentPageRef_" + _pageRef).val(),
			"filename"	:	$("#addText1_" + id + "_" + _pageRef).val(),
			"fileStorageMedia"	:	$("#smartCOList_" + id + "_fileStorageMedia").val(),
			"filePhysicalLoc"	:	$("#smartCOList_" + id + "_filePhysicalLoc").val(),
			"fileThirdPartyLoc"	:	$("#THIRD_PARTY_LOCATION_" + id  + "_" + _pageRef).val(),
			"smartSpecCompCode"     :      smartSpecCompCode,
			"smartSpecBranchCode"   :      smartSpecBranchCode
	}
	
	//Bug 501397 Changed saddTypeCode variable non standard name
	$.fileDownload(jQuery.contextPath
			+ "/path/smart/downloadExternalFile"
			, {
		successCallback : function(url) {
		},
		failCallback : function(html, url) {
			_showErrorMsg(html);
		},
	    data: params
	});
}

//613682
//BMO160192 - SMART to be Able to Have Expression for Mandatory Functionality
function validateSmartMandExpr()
{
	var theForm = $('#smartDivElementId_' + _pageRef +' :input').serialize(); 
	theForm = theForm + '&_pageRef='+_pageRef;
	_showProgressBar(true);

	$.ajax({
		url : jQuery.contextPath
				+ "/path/smart/Smart_validateMandExpr",
		dataType : "json",
		type : "post",
		data : theForm,
		success : function(data)
		{
			var screenParams = data["additionalScreenParams"];
			applyAdditionalDynamicDisplay(screenParams);
			for (var key in screenParams) {
				var id = screenParams[key].ELEMENT_ID;
				var isMand = screenParams[key].IS_MANDATORY;
				$("#sAdditionsTypeMandatory_"+id+"_"+_pageRef).val(isMand==0?'N':'Y');
				}
			_showProgressBar(false);
			
		}
	});
}