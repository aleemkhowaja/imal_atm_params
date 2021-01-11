<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>
<%@page import="com.path.bo.common.ConstantsCommon"%>
<%@page import="com.path.bo.common.CommonMethods"%>
<%
String prelogin_appversion = ConstantsCommon.returnAppNumericVersion();	
// TP 479917 TP 481457 read user current set language inside the application, if not set yet then default browser will be returned en
String requestlocale = (String)request.getSession().getAttribute("user_lang_before_force_logout");
String considerClientSideLang = "0";
String considerClientSideLangAftLogOut =  (String)request.getSession().getAttribute("read_client_side_language_after_timeout");
String checkClientSideLangNormalLogin = (String)request.getSession().getAttribute("consider_client_language");
if(considerClientSideLangAftLogOut != null || checkClientSideLangNormalLogin != null)
{
    considerClientSideLang = "1";
}

if(requestlocale == null)
{
	requestlocale = com.opensymphony.xwork2.ActionContext.getContext().getLocale().getLanguage();
	if(requestlocale == null)
	{
	    requestlocale = "en";
	}
}
%>
<%if(ConstantsCommon.SECURITY_ENCRYPTPARAMS_ENABLED){%>
<script type="text/javascript" src="${pageContext.request.contextPath}/login/cryptojs/aes.js?_=<%=prelogin_appversion%>"></script>
<% }%>
<script> var blockF12 = '<%=CommonMethods.returnF12BlockingEnabled()%>'; </script>
<script type="text/javascript" src="${pageContext.request.contextPath}/login/cryptojs/security-util.js?_=<%=prelogin_appversion%>"></script>
<script> var uniqueSessionToken = '<%=CommonMethods.returnUniqueSessionToken(request.getSession())%>'; var encryptionPwd = '<%=CommonMethods.returnEncryptionPassword(request.getSession())%>'; </script>
<body>
<form id="preLoginForm" method="POST" action="${pageContext.request.contextPath}/login/unSecureAction_prelogin" target="_self">
<input type="hidden" id="prelogin_page_req_loc" name="request_locale"/>
</form>
<%/* this input hidden is used as an identifier of the PreLogin.jsp, it will be used in jquery.js in done( status, nativeStatusText, responses, headers ) to redirect to session timeout */%>
<input type="hidden" id="prelogin_page_hidden_identifier"/>
</body>
<script type="text/javascript">
	var req_local_param = "<%=requestlocale%>";
	var cached_language = localStorage.getItem("user_language_<%=ConstantsCommon.returnCurrentAppName()%>");
	if('<%=considerClientSideLang%>' != '0' && cached_language && cached_language != null)
	{
    		req_local_param = cached_language;
	}
	// Cached Client Side Language Not Defined then set it to request Local Languuage, this occures on first login
	if(!cached_language)
	{
		localStorage.setItem("user_language_<%=ConstantsCommon.returnCurrentAppName()%>", req_local_param);
	}
	
	var params = "request_locale="+req_local_param;
	document.getElementById("prelogin_page_req_loc").value = req_local_param;
	submitEncryptedData('preLoginForm');
</script>
