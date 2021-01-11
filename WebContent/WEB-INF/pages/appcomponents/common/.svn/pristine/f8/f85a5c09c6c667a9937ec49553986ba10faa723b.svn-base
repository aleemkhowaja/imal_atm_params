<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>
<%@page import="com.path.bo.common.CommonMethods"%>
<%@page import="com.path.bo.common.ConstantsCommon"%>
<%
   String browser = request.getHeader("User-Agent");
//the browser variable defined in AppMain.jsp
	String ieVerStr = CommonMethods.returnIEVersion(browser);
	boolean isIE = false;
	float ieVer = 0; // use on AppCommonTrans
	if(ieVerStr != null)
	{
		ieVer = Float.parseFloat(ieVerStr);
		isIE = true;
	}
   if(isIE) {
%>
<!DOCTYPE html>
<% 
} 
	
%>

<html>
	<head>
		<%@include file="../../../pages/appcomponents/common/AppMainCommon.jsp"%>
		<%@include file="../../../pages/appcomponents/common/AppCommonTrans.jsp"%>
	
		
		<%/*including Application specific js files use while opend from favorite*/ %>
	 	<ps:if test='%{#session.sesVO.companyCode!=null && session.sesVO.currentAppName == "TFA"}'>
	 		<jsp:include page="../../../pages/tfa/common/TfaAppTrans.jsp"/>
      		<script type="text/javascript" src="<ps:url value='/path/js/tfa/common/TfaCommonFunc.js' />"></script>
	  	</ps:if>
	  	<ps:elseif test='%{#session.sesVO.companyCode!=null && session.sesVO.currentAppName == "RET"}'>
	 		<jsp:include page="../../../pages/core/common/CsmAppTrans.jsp"/>
      	</ps:elseif>
      	<ps:elseif test='%{#session.sesVO.companyCode!=null && session.sesVO.currentAppName == "FMS"}'>
      		<jsp:include page="../../../pages/fms/common/FmsCommonTrans.jsp"/>
      	</ps:elseif>
      	<ps:elseif test='%{#session.sesVO.companyCode!=null && session.sesVO.currentAppName == "IIS"}'>
      		<jsp:include page="../../../pages/iis/common/IISCommonTrans.jsp"/>
      	</ps:elseif>
      	<ps:elseif test='%{#session.sesVO.companyCode!=null && (session.sesVO.currentAppName == "ESHR" || session.sesVO.currentAppName == "ESPL")}'>
              <jsp:include page="../../../pages/ess/esscommon/EssCommonTrans.jsp"/>
      	</ps:elseif>
 	  	<ps:elseif test='%{#session.sesVO.currentAppName == "SADS"}'>
	 		<jsp:include page="../../../pages/core/common/SADSAppTrans.jsp"/>
      	</ps:elseif>      	
		
		<script type="text/javascript">
			var RTL_DIRECTION = '<ps:property value="isRTL" escapeHtml="false" escapeJavaScript="true"/>';
			jQuery.contextPath = '${pageContext.request.contextPath}';
			_pageRef = '<ps:property value="_pageRef" escapeHtml="false" escapeJavaScript="true"/>';
	    </script>
    
	</head>

	<body>
		<ps:url var="search" value="${destinationScreenUrl}" escapeAmp="false">
			<ps:parammap map="session.sesVO.additionalParamsMap"/>
			<ps:param name="_pageRef">${_pageRef}</ps:param>
		</ps:url>

		<ps:div id="screenContainerDiv_${_pageRef}"></ps:div>
	</body>
	
	
	<script type="text/javascript">
		
	    var originalUrl = '<ps:property value="originalAppUrl" escapeHtml="false" escapeJavaScript="true"/>';
	    var screenUrl = returnEncryptedUrl('<ps:property value="search" escapeHtml="false" escapeJavaScript="true"/>');
	    
	    $.struts2_jquery.require("common/jquery/jqgrid/i18n/grid.locale-" + $.struts2_jquery.gridLocal + ".js",
			function() {
				$.jgrid.no_legacy_api = true;
				$.jgrid.useJSON = true;
			});
		$.struts2_jquery.require("common/jquery/jqgrid/grid.base.js");
		$.struts2_jquery.require("common/jquery/jqgrid/jquery.fmatter.js");
		$.struts2_jquery.require("common/jquery/jqgrid/grid.custom.js");
		$.struts2_jquery.require("common/jquery/jqgrid/grid.common.js");
		$.struts2_jquery.require("common/jquery/jqgrid/plugins/grid.setcolumns.js");
		$.struts2_jquery.require("common/jquery/jqgrid/grid.subgrid.js");
		$.struts2_jquery.require("common/jquery/jqgrid/plugins/grid.postext.js");
		$.struts2_jquery.require("common/jquery/jqgrid/grid.jqueryui.js");
		$.struts2_jquery.require("common/jquery/jqgrid/plugins/jquery.searchFilter.js");
		$.struts2_jquery.require("common/jquery/jqgrid/grid.formedit.js");
		$.struts2_jquery.require("common/jquery/jqgrid/grid.treegrid.js");
		$.struts2_jquery.require("common/jquery/jqgrid/grid.tbltogrid.js");
		$.struts2_jquery.require("common/jquery/jqgrid/grid.import.js");
		$.struts2_jquery.require("common/jquery/jqgrid/JsonXml.js");
		$.struts2_jquery.require("common/jquery/jqgrid/grid.filter.js");
		
		_showProgressBar(true);
		$.ajax( {
					url : screenUrl,
					type : "post",
					dataType : "html",
					data : {},
					success : function(html) 
						{
							if (html != undefined && html != null) 
							{
								var isHTML = true;
								var jsonObj = null;
								try
								{
									jsonObj = JSON.parse(html);
									isHTML = false;
								}
								catch(e)
								{
									isHTML = true;
								}
								
								if(isHTML == false)
								{
									if(jsonObj._error != undefined && jsonObj._error != null && jsonObj._error != '')
									{
										_showErrorMsg(jsonObj._error, jsonObj._msgTitle);
									}
									_showProgressBar(false);
								}
								else
								{	
									$("#screenContainerDiv_" + _pageRef).html(html);
									_showProgressBar(false);	
								}	
								
							}
						},
					error : function()
						{
			   				_showProgressBar(false);
					  	}
					});
		
	</script>
	
	<% /* loading records log js function since the ercord log could be opened outside info bar*/
	if(ConstantsCommon.ENABLE_RECORDS_LOG_FEATURE == 1)
	{
	%>
				
		<ps:set name="print_preview_key"
			value="%{getEscText('print_preview_key')}" />
		<ps:set name="Send_email_key"
			value="%{getEscText('Send_email_key')}" />
		<script type="text/javascript">
			$.struts2_jquery.require("RecordLogsMaint.js", null, jQuery.contextPath
					+ "/common/js/recordlogs/");
			var print_preview_key = "${print_preview_key}";
			var Send_email_key = "${Send_email_key}";
		</script>
	<% 
	}
	%>

</html>
