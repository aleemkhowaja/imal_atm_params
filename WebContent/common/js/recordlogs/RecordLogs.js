function showRecordLogs(progRef) {
	
	
	
	//_showProgressBar(true);

	var popupButtons = {};
	var globalCustElemDiv = $("<div id='newRecordLogsDialog'></div>");
	globalCustElemDiv.css("padding", "0");
	var theBody = $('body');
	globalCustElemDiv.insertAfter(theBody);
	var labelParams = {};
	var theReqURL = jQuery.contextPath	+ '/path/recordlogs/RecordLogsMaintAction_loadRecordLogsPage';
	$.ajax( {	
				url : theReqURL,
				type : "post",
				data : labelParams,
				success : function(response) {
		alert(JSON.stringify(response));
					_showProgressBar(false);
					if (response["_error"] == undefined
							|| response["_error"] == null) {
						globalCustElemDiv.html(response)
						globalCustElemDiv.dialog( {
							modal : true,
							title : "add the key label",
							autoOpen : false,
							show : 'slide',
							position : 'center',
							width : returnMaxWidth(420),
							height : returnMaxHeight(250),
							close : function() {
								var theDialog = $(this);
								theDialog.remove();
							}
						});
						popupButtons["Save"] = {
							text : saveLabel,
							id : "saveNewKeyLabel",
							click : saveNewKeyLabel,
						}
						globalCustElemDiv.dialog('option', 'buttons',
								popupButtons);

						globalCustElemDiv.dialog("open");
					}
				}
			});

	
	
	
	
	
	
	
	
	
	
//	$(document).ready(function() {
//		//$.struts2_jquery.require("jquery.cleditor.js,jquery.cleditor.css" ,null,jQuery.contextPath+"/common/jquery/js/plugins/texteditor/");
//	var globalCustElemDiv = $(
//		"<link href='/imal_core_portal/common/jquery/js/plugins/texteditor/jquery.cleditor.css' rel='stylesheet' type='text/css'>" +
//		
//	"<div id='EditorMain'><input id='Button2' type='button' value='Print preview' name='Button2' onclick='readFiller()'><input id='Button2' type='button' value='Print' name='Button2' onclick='readFiller()'><input id='Button2' type='button' value='E-mail' name='Button2' onclick='readFiller()'><input id='Button2' type='button' value='Save' name='Button2' onclick='readFiller()'><textarea height='250' width='350' id='myTextEditor'></textarea>" +
//"</div>");
//	globalCustElemDiv.css("padding", "0");
//	var theBody = $('body');
//	globalCustElemDiv.insertAfter(theBody);
//	//$.struts2_jquery.require("jquery.cleditor.js,jquery.cleditor.css" ,null,jQuery.contextPath+"/common/jquery/js/plugins/texteditor/");
//
//	$("#EditorMain").html()
//	$("#EditorMain").dialog( {
//		modal : true,
//		title : "TextEditor",
//		autoOpen : false,
//		show : 'slide',
//		position : 'center',
//		width : returnMaxWidth(400),
//		height : returnMaxHeight(300),
//		close : function() {
//			var theDialog = $(this);
//			theDialog.remove();
//		},
//	});
//	var iframe = document.getElementById("myTextEditor");
//	$("#myTextEditor").cleditor({
//                width: "auto", // width not including margins, borders or padding
//                height: 250, // height not including margins, borders or padding
//                controls: // controls to add to the toolbar
//                    "bold italic underline strikethrough subscript superscript | font size " +
//                    "style | color highlight removeformat | bullets numbering | outdent " +
//                    "indent | alignleft center alignright justify | undo redo | " +
//                    "rule image link unlink | cut copy paste pastetext | print source",
//                colors: // colors in the color popup
//                    "FFF FCC FC9 FF9 FFC 9F9 9FF CFF CCF FCF " +
//                    "CCC F66 F96 FF6 FF3 6F9 3FF 6FF 99F F9F " +
//                    "BBB F00 F90 FC6 FF0 3F3 6CC 3CF 66C C6C " +
//                    "999 C00 F60 FC3 FC0 3C0 0CC 36F 63F C3C " +
//                    "666 900 C60 C93 990 090 399 33F 60C 939 " +
//                    "333 600 930 963 660 060 366 009 339 636 " +
//                    "000 300 630 633 330 030 033 006 309 303",
//                fonts: // font names in the font popup
//                    "Arial,Arial Black,Comic Sans MS,Courier New,Narrow,Garamond," +
//                    "Georgia,Impact,Sans Serif,Serif,Tahoma,Trebuchet MS,Verdana",
//                sizes: // sizes in the font size popup
//                    "1,2,3,4,5,6,7",
//                styles: // styles in the style popup
//                    [["Paragraph", "<p>"], ["Header 1", "<h1>"], ["Header 2", "<h2>"],
//                    ["Header 3", "<h3>"],  ["Header 4","<h4>"],  ["Header 5","<h5>"],
//                    ["Header 6","<h6>"]],
//                useCSS: true, // use CSS to style HTML when possible (not supported in ie)
//                docType: // Document type contained within the editor
//                    '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">',
//                docCSSFile: // CSS file used to style the document contained within the editor
//                	jQuery.contextPath+"/common/jquery/js/plugins/texteditor/jquery.cleditor.css",
//                bodyStyle: // style to assign to document body contained within the editor
//                    "margin:4px; font:10pt Arial,Verdana; cursor:text"
//            });
//	$("#myTextEditor").cleditor()[0].disable(false);
//	$("#myTextEditor").cleditor()[0].refresh();
//	$("#EditorMain").dialog("open");
//});
}

function readFiller()
{
		
var iframe = document.getElementById("myTextEditor");
	$("#myTextEditor").cleditor({
                width: "auto", // width not including margins, borders or padding
                height: 250, // height not including margins, borders or padding
                controls: // controls to add to the toolbar
                    "bold italic underline strikethrough subscript superscript | font size " +
                    "style | color highlight removeformat | bullets numbering | outdent " +
                    "indent | alignleft center alignright justify | undo redo | " +
                    "rule image link unlink | cut copy paste pastetext | print source",
                colors: // colors in the color popup
                    "FFF FCC FC9 FF9 FFC 9F9 9FF CFF CCF FCF " +
                    "CCC F66 F96 FF6 FF3 6F9 3FF 6FF 99F F9F " +
                    "BBB F00 F90 FC6 FF0 3F3 6CC 3CF 66C C6C " +
                    "999 C00 F60 FC3 FC0 3C0 0CC 36F 63F C3C " +
                    "666 900 C60 C93 990 090 399 33F 60C 939 " +
                    "333 600 930 963 660 060 366 009 339 636 " +
                    "000 300 630 633 330 030 033 006 309 303",
                fonts: // font names in the font popup
                    "Arial,Arial Black,Comic Sans MS,Courier New,Narrow,Garamond," +
                    "Georgia,Impact,Sans Serif,Serif,Tahoma,Trebuchet MS,Verdana",
                sizes: // sizes in the font size popup
                    "1,2,3,4,5,6,7",
                styles: // styles in the style popup
                    [["Paragraph", "<p>"], ["Header 1", "<h1>"], ["Header 2", "<h2>"],
                    ["Header 3", "<h3>"],  ["Header 4","<h4>"],  ["Header 5","<h5>"],
                    ["Header 6","<h6>"]],
                useCSS: true, // use CSS to style HTML when possible (not supported in ie)
                docType: // Document type contained within the editor
                    '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">',
                docCSSFile: // CSS file used to style the document contained within the editor
                	jQuery.contextPath+"/common/jquery/js/plugins/texteditor/jquery.cleditor.css",
                bodyStyle: // style to assign to document body contained within the editor
                    "margin:4px; font:10pt Arial,Verdana; cursor:text"
            });
	$("#myTextEditor").cleditor()[0].disable(false);
	$("#myTextEditor").cleditor()[0].refresh();
iframe.value = $("#toCifDesk_" + _pageRef).val();
$("#myTextEditor").cleditor()[0].updateFrame();
console.log( iframe.value);
}
