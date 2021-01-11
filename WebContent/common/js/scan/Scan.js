var imgRef = new Object();

$(document).ready(function() {
	$.browser.chrome = $.browser.webkit && !!window.chrome;
//	$.browser.safari = $.browser.webkit && !window.chrome;

	if (typeof pathActivexDownloadEnabled !== 'undefined' && pathActivexDownloadEnabled == 'true' && $.browser.chrome && !$.browser.path_mobile_tablet && osIsWindows())
	{
		var chromeExtVer = $("#scanExVersion").val();
		var extDiv = document.getElementById(chromeExtVer);
		if(extDiv == null || extDiv == undefined) {
			downloadURI(jQuery.contextPath + '/login/', 'pathTwainChromeInst.msi');
		}
	}
});

//This function checks if the client platform is windows or not
//In order to allow download of the windows TWAIN plugin
function osIsWindows() {

  if ( (navigator["appVersion"] && navigator["appVersion"].indexOf("Win") !== -1) &&  
  		(navigator["userAgent"] && navigator["userAgent"].indexOf("Windows") !== -1) &&
  		(navigator["platform"] && navigator["platform"].indexOf("Win") !== -1)
  		)
  {
      return true;
  }
  else
  {
	    return false;
  }

}


function IsActiveXSupported() {
    var isSupported = false;

    if(window.ActiveXObject) {
        return true;
    }

    if("ActiveXObject" in window) {
        return true;
    }

    try {
        var xmlDom = new ActiveXObject("Microsoft.XMLDOM");
        isSupported = true;
    } catch (e) {
        if (e.name === "TypeError" || e.name === "Error") {
            isSupported = true;
        }
    }

    return isSupported;
}

//Calls the ActiveX scanToServer method and attach the java screen(grid)
//uniqId and the creation date of the bitmap in millisecond; forming the image name.
function scanToServer(uniqId, language, ctrlType) {
	if(typeof pathActivexDownloadEnabled !== 'undefined' && pathActivexDownloadEnabled == 'true')
	{	
		var srvrLink = $(location).attr('protocol') + '//' + $(location).attr('host') + jQuery.contextPath + '/unsecureScan/scan/saveImage?_pageRef=' + $("#_parentPageRef").val() + "&language="+language;
		var creationDate = new Date();
		var timeInMs = creationDate.getTime();
		addImage(uniqId, timeInMs);
		var imgName = returnImgName(uniqId);
		try {
			if ($.browser.msie)
			{
				if(ctrlType == 'MagTekCtrl')
				{
					var val = MagTekCtrl.scanToServer(srvrLink + "&imgName=" + imgName);
				}
				else
				{
					var val = PathCtrl.scanToServer(srvrLink + "&imgName=" + imgName);
				}
			}
			else
			{
	  			var message = srvrLink + '&imgName=' + imgName;
				window.postMessage({type: 'imalScan', msg:message, chromeExt: true}, "*");
			}
		}
		catch (e) {
			_showErrorMsg(AX_ERROR_KEY,error_msg_title);
		}
		return imgName;
	}
	else
	{
		_showErrorMsg(activex_disabled_key, warning_msg_title);
	}
}

function smartScanToServer(uniqId, language) {
	var smartImgName = scanToServer(uniqId, language);
	if(smartImgName)
		{
		$("#scanExternalFile"+uniqId+'_'+_pageRef).val(smartImgName);
		}
}

function downloadURI(uri, name)
{
	try
	{
		//Creating new link node.
		var link = document.createElement('a');
		link.href = uri+name;
		//Dispatching click event.
		if (document.createEvent) {
			var e = document.createEvent('MouseEvents');
			e.initEvent('click' ,true ,true);
			link.dispatchEvent(e);
			return true;
			}
		}
	catch(e)
	{
		alert(e);
	}
}

//Stores the scanned images names in an array object.
function addImage(uniqId, imgNum) {
	imgRef[_pageRef + uniqId] = _pageRef + uniqId + imgNum;
}

//returns the scanned images names from the array object.
function returnImgName(uniqId) {
	if (imgRef[_pageRef + uniqId] == "undefined"
			|| typeof imgRef[_pageRef + uniqId] == "undefined") {
		return "";
	}
	return imgRef[_pageRef + uniqId];
}


function previewScannedImg(pageRef, uniqId, theURL, previewParams, buttonsArr){

	var imgName = returnImgName(uniqId);
	var imgSrc = jQuery.contextPath+theURL+"?pageRef="+_pageRef+ "&imgName="+imgName;
 	var previewImageElement = $('<div id="previewImageElementId"></div>');
 	
	previewImageElement.dialog( {
							autoOpen : false,
							modal : true,
							title : Preview_image_key,
							width : returnMaxWidth(500),
							height : returnMaxHeight(550),
							hide : 'clip',
							close : function(ev, ui) {
								$(this).dialog("destroy");
								$(this).remove();
							},
							buttons: buttonsArr
						});
					$("#previewImageElementId").load(imgSrc,
						previewParams,
							function() {
								$("#previewImageElementId").dialog("open");
							});
	}

//when called it sends all the passed cheques images (front and rear + micr/ocr) to the repository
//and return the folder name when there are no more cheques in the feeder.
function getTWAINChequesData(language, isOCR, isMicr, ocrFont, ocrUnit, ocrSide, top, bottom, left, right)
{
	if(language == null || language == undefined || language == "undefined"||language == '')
	{
		language = 'EN';
	}

	var srvrLink = $(location).attr('protocol') + '//' + $(location).attr('host') + jQuery.contextPath + '/unsecureScan/scan/saveTWAINCheque?language=' + language;
	try
	{
		//this will return the folder name (not the target) were the cheque(s) is/are saved
		if(isOCR)
		{
			PathCtrl.enableOCR(isOCR);
			PathCtrl.setMICRSettings(false);
			
			if(ocrFont != null && ocrFont != undefined && ocrFont != "undefined" && ocrFont != '')
			{
				PathCtrl.setOcrFont(ocrFont);
			}
			if(ocrUnit != null && ocrUnit != undefined && ocrUnit != "undefined" && ocrUnit != '')
			{
				PathCtrl.setOcrUnit(ocrUnit);
			}
			if(ocrSide != null && ocrSide != undefined && ocrSide != "undefined" && ocrSide != '')
			{
				PathCtrl.setOcrSide(ocrSide);
			}
			if(top != null && top != undefined && top != "undefined" && top != '')
			{
				PathCtrl.setOcrFrame(top, bottom, left, right);
			}
		}
		if(isMicr)
		{
			PathCtrl.enableOCR(false);
			PathCtrl.setMICRSettings(isMicr);
		}

		return PathCtrl.ScanCheques(srvrLink);
	}
	catch (e)
	{
		_showErrorMsg(AX_ERROR_KEY,error_msg_title);
	}
}