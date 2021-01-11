<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>
<%@page import="com.path.bo.common.CommonMethods"%>

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
		<ps:elseif test='%{#session.sesVO.companyCode!=null && (session.sesVO.currentAppName == "PMS" || session.sesVO.currentAppName == "DINV" || session.sesVO.currentAppName == "SKK")}'>
		      <jsp:include page="../../../pages/investment/common/AssetsAppTrans.jsp"/>
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

	<body style="margin:0;">
		<ps:url id="screenUrl" action="${targetAppScreenUrl}" namespace="/"></ps:url>
		<psj:div id="screenContainerDiv_${_pageRef}" href="%{screenUrl}" cssStyle="z-index:1"></psj:div>
		<script type="text/javascript">
		$('#screenContainerDiv_' + _pageRef).height($(window).height()-1);
		var originalUrl = '<ps:property value="originalAppUrl" escapeHtml="false" escapeJavaScript="true"/>';
		var bindChange = false;
		_showProgressBar(true);
		$("#screenContainerDiv_" + _pageRef).ajaxComplete(function() 
		{
			// show progress bar will perform postMessage to 
			_showProgressBar(false)
		});
	</script>
	</body>
	
	
	

</html>
