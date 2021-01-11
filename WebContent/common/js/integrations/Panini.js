function startPanini() {
		try{
			PaniniCtrl.StartUpPanini();
		}
		catch (e){
			_showErrorMsg(AX_ERROR_KEY,error_msg_title);
		}
	 }
function shutDownPanini() {
		try{
			PaniniCtrl.ShutDownPanini();
		}
		catch (e){
			_showErrorMsg(AX_ERROR_KEY,error_msg_title);
		}
	 }


//Calls the ActiveX method and attach the java screen(grid)
//imgId and the creation date of the bitmap in millisecond; forming the image name.
function getChequeImage(language) {
	if(language == null || language == undefined || language == "undefined"||language == '')
		{
		language = 'EN';
		}
	var creationDate = new Date();
	var timeInMs = creationDate.getTime();
	var imgId = "tmp_panini_";
	var paniniData = {};
	var imgName =  imgId + _pageRef + "_" + timeInMs;
	paniniData["imgNameFront"] ="/panini/"+imgName+"_Front"+".jpg";  
	paniniData["imgNameRear"] ="/panini/"+imgName+"_Rear"+".jpg"; 
	
	var srvrLink = $(location).attr('protocol') + '//' + $(location).attr('host') + jQuery.contextPath + '/unsecureScan/scan/savePaniniImage?_pageRef=' + $("#_parentPageRef").val()+ "&imgName=" + imgName+ "&language=" + language;
	try {
		paniniData["micr"] = PaniniCtrl.StartFeedingPanini(srvrLink);
		return paniniData;
		
		}
	catch (e) {
		_showErrorMsg(AX_ERROR_KEY,error_msg_title);
	}
}

//when called it sends all the passed cheques images (front and rear + micr/ocr) to the repository
//and return the folder name when there are no more cheques in the feeder.
function getChequesData(language)
{
	if(language == null || language == undefined || language == "undefined"||language == '')
	{
		language = 'EN';
	}

	var srvrLink = $(location).attr('protocol') + '//' + $(location).attr('host') + jQuery.contextPath + '/unsecureScan/scan/savePaniniImage?language=' + language;
	try
	{
		//this will return the folder name (not the target) were the cheque(s) is/are saved
		return PaniniCtrl.StartFeedingPanini(srvrLink);
	}
	catch (e)
	{
		_showErrorMsg(AX_ERROR_KEY,error_msg_title);
	}
}

function getMICR()
{
	return PaniniCtrl.StartFeedingPanini("MICR");
}

function previewScannedImg(paniniData){ 
	var imgSrc = jQuery.contextPath+"/path/scan/previewPaniniImg";
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
					$("#previewImageElementId").load(imgSrc,
						paniniData,
							function() {
								$("#previewImageElementId").dialog("open");
							});
	}

function startAndsetPaniniOCR(enableOCR, ocrFont, ocrPositionX, ocrPositionY, ocrWidth, ocrHeight)
{
	PaniniCtrl.StartUpPaniniOCR(enableOCR, ocrFont, ocrPositionX, ocrPositionY, ocrWidth, ocrHeight);
}