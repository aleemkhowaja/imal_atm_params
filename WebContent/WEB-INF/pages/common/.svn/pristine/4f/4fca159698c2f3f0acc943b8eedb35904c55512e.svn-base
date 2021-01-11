<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>

<ps:if test='%{iv_crud == "print"}'>

	<script type="text/javascript">
		var printMethodUrl = '<ps:property value="printMethodUrl" escapeHtml="false" escapeJavaScript="true"/>';
		var openItemParams = '<ps:property value="openItemParams" escapeHtml="false" escapeJavaScript="true"/>';
		var printCallBackFunc = '<ps:property value="callBackPrintFunc" escapeHtml="false" escapeJavaScript="true"/>';
		var printCallBackFuncRequireJs ='<ps:property value="callBackPrintFuncRequireJs" escapeHtml="false" escapeJavaScript="true"/>';
		var printCallBackFuncRequirePath = '<ps:property value="callBackPrintFuncRequirePath" escapeHtml="false" escapeJavaScript="true"/>';
		
		$.struts2_jquery.require("TrsAckTOutAlertsList.js" ,null,jQuery.contextPath+"/common/js/alerts/");
		trsAckTOutAlertGrid_Id_CommonPrint(printMethodUrl,openItemParams,printCallBackFunc,printCallBackFuncRequireJs,printCallBackFuncRequirePath);
		
		//The unvisible div id: printAlertIframeDiv__dashboard that was created to launch the print need to be deleted 
		$.postMessage({ confirmCallBack: 'trsAckTOutAlertGrid_Id_RemovePrintIframeDiv' ,confirmValue:true,confirmArgs:'{}'}, window.originalUrl ,window.top);
	</script>
		
</ps:if>
<ps:else>

	<script type="text/javascript">
		$.struts2_jquery.require("TrsAckTOutAlertsList.js" ,null,jQuery.contextPath+"/common/js/alerts/");
		
		var loadTrxJsFunc = '<ps:property value="loadTrxDetailsFunc" escapeHtml="false" escapeJavaScript="true"/>';
		var loadTrxJsPath = '<ps:property value="loadTrxDetailsJsPath" escapeHtml="false" escapeJavaScript="true"/>';
		var loadTrxJsFile = '<ps:property value="loadTrxDetailsJs" escapeHtml="false" escapeJavaScript="true"/>';
		$.struts2_jquery.require(loadTrxJsFile ,null,jQuery.contextPath+loadTrxJsPath);
		eval(loadTrxJsFunc+'(' + JSON.stringify(${parameters}) + ')');
		//Remove the progress bar added outside the iframe
		_showProgressBar(false);
	</script>
		
</ps:else>


