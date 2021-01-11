<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>
<% /* #623232 Screens are not opening from the Favorites widget*/ %>
<meta name="decorator" content="desktop"/>
<head>
<ps:if test='%{loadFunc != "false"}'>
<jsp:include page="/WEB-INF/pages/appcomponents/common/AppMainCommon.jsp"/>
</ps:if>
</head> 

<ps:hidden name="currentAppName" id="currentAppName_${menuVar}" value="%{#session.sesVO.currentAppName}"></ps:hidden>
<script type="text/javascript">
//Called from Opening a Favorite Screen from dashboard
	var _pageRef = '<ps:property value="menuVar" escapeHtml="false" escapeJavaScript="true"/>';
	$("#portal_div").height($("#portal_div").parent().height());
	var params = "menuVar=<ps:property value='menuVar' escapeJavaScript='true'/>&ap_n="+$("#currentAppName_<ps:property value='menuVar' escapeJavaScript='true'/>").val();
	params = returnEncryptedData(params);
	$("#portal_div").load("${pageContext.request.contextPath}/path/loadScreen?" + params)
</script>