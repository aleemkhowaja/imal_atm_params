<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>

	<table border="0" width="100%" height="100%" cellpadding="0" style="table-layout: fixed; padding:0.5em;">
	<tr>
		<td width="50%" valign="top" >
			<div id="webServiceGuiRequest_${_pageRef}">
				<div class="fldLabelView ui-state-active ui-corner-top">
						<label id="request_key_id">request_key</label>
				</div>
				
					<div id="WebServiceExplorerRequest_${_pageRef}" style="height: 100%; ">
						<textarea style="width:100%;height:100%;resize: none; background-color: white !important; font-size: 11px; color: blue"; name="soapmessage"  rows="42"
							title="SOAP Message Request" id="soaprequest" readonly>
						</textarea>
					</div>
			</div>
		</td>
		<td width="50%" valign="top" style="height:30%">
				<div id="webServiceGuiResponse_${_pageRef}">
					 <div class = "fldLabelView ui-state-active ui-corner-top">
							<label id = "response_key_id">response_key</label>			
					 </div>		
					<div id="WebServiceExplorerResponse_${_pageRef}" style = "height: 100%;" >
							<textarea style="width:100%;height:100%;resize:none;background-color: white !important;font-size: 11px; color: blue"; name="soapmessage" rows="42" title="SOAP Message Request" id="soapresponse" readonly>

							</textarea>
					</div>
				</div> 
	</tr>
</table>

<script>
$(function(){
	if( navigator.userAgent.toLowerCase().indexOf('chrome') > -1 )
	{
		$("#soaprequest").attr('rows','43');
		$("#soapresponse").attr('rows','43');
	}
	if(undefined != $.browser)
	{
		if($.browser.msie == true)
		{
			$("#soaprequest").attr('rows','43');
			$("#soaprequest").css({"width": "99%"});
			$("#soapresponse").attr('rows','43');
			$("#soapresponse").css({"width": "99%"});
		}
	}
});

$(window).resize(function() {
    if(this.resizeTO) clearTimeout(this.resizeTO);
    this.resizeTO = setTimeout(function() 
    {
        $(this).trigger('resizeEnd');
        resizeRequestResposne();
    }, 500);
});

function resizeRequestResposne()
{
	if( navigator.userAgent.toLowerCase().indexOf('chrome') > -1 )
	{
		var constVar = 14.64285714;
		var collapsablePannelHeight = $("#webServiceExplorerRequestRespCollapse_"+_pageRef).height();
		var rows = 43;
		if(collapsablePannelHeight < 615)
		{
			rows = Math.ceil(collapsablePannelHeight/constVar);
		}
		$("#soaprequest").attr('rows',rows);
		$("#soapresponse").attr('rows',rows);
	}
	else if( navigator.userAgent.toLowerCase().indexOf('firefox') > -1 )
	{
		var constVar = 14.64285714;
		var collapsablePannelHeight = $("#webServiceExplorerRequestRespCollapse_"+_pageRef).height();
		var rows = 43;
		if(collapsablePannelHeight < 615)
		{
			rows = Math.ceil(collapsablePannelHeight/constVar);
		}
		$("#soaprequest").attr('rows',rows);
		$("#soapresponse").attr('rows',rows);
	}
	if(undefined != $.browser)
	{
		if($.browser.msie == true)
		{
			var constVar = 14.64285714;
		//	var constVar = 13.73684210526316;
			var collapsablePannelHeight = $("#webServiceExplorerRequestRespCollapse_"+_pageRef).height();
			//var rows = 38;
			var rows = 43;
			if(collapsablePannelHeight < 523)
			{
				rows = Math.ceil(collapsablePannelHeight/constVar);
				rows = rows - 1;
			}
			$("#soaprequest").attr('rows',rows);
			$("#soapresponse").attr('rows',rows);
		}
	}	
}


</script>