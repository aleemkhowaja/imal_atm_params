<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@page import="com.path.vo.common.SessionCO"%>
<%@page import="com.path.lib.common.util.DateUtil"%>
<%@page import="com.path.bo.common.ConstantsCommon"%>
<%@page import="com.path.bo.common.CommonMethods"%>

<%
	String autologin_appversion = ConstantsCommon.returnAppNumericVersion();
	String paramSessionId = request.getSession().getId();
	SessionCO sessionCO = (SessionCO) request.getSession().getAttribute("sesVO");
	String runningDateRET = "";
	if(sessionCO.getRunningDateRET() != null)
	{
		runningDateRET = DateUtil.format(sessionCO.getRunningDateRET());
	}
	
	//in case coming from alert open item in dashboard or from dashboard application we need to set reload_user_session_details to 1 in session to avoid redirection to login screen on first try. this way the loginUserToModule() will be executed in desktopaction.login().
	String appId= request.getParameter("appId") == null ? ((sessionCO != null && sessionCO.getAppId() != null ) ? sessionCO.getAppId() : "") : request.getParameter("appId");
	String destinationScreenUrl = request.getParameter("destinationScreenUrl") == null ? ((sessionCO != null && sessionCO.getDestinationScreenUrl() != null ) ? sessionCO.getDestinationScreenUrl() : "") : request.getParameter("destinationScreenUrl");
	if( (appId != null && !appId.isEmpty()) 
		|| (destinationScreenUrl != null && !destinationScreenUrl.isEmpty()) )
	{
		request.getSession().setAttribute("reload_user_session_details","1");
	}
%>
<html>
	<head>
	    <%if(ConstantsCommon.SECURITY_ENCRYPTPARAMS_ENABLED){%>
			<script type="text/javascript" src="${pageContext.request.contextPath}/login/cryptojs/aes.js?_=<%=autologin_appversion%>"></script>
			<script>  var uniqueSessionToken = '<%=CommonMethods.returnUniqueSessionToken(request.getSession())%>'; var encryptionPwd = '<%=CommonMethods.returnEncryptionPassword(request.getSession())%>'; </script>
		<% }%>
		<script type="text/javascript" src="${pageContext.request.contextPath}/login/cryptojs/security-util.js?_=<%=autologin_appversion%>"></script>	
	</head>
	<body onload="submitEncryptedData('autoLoginForm',false)">

		<form id="autoLoginForm" name="autoLoginForm"
			action="${pageContext.request.contextPath}/j_spring_security_check"
			method="post">
			<ps:hidden id="j_username" name="j_username" />

			<ps:hidden id="j_password" name="j_password" />		
			
			<ps:hidden name="paramSessionId" id="paramSessionId" value="<%=paramSessionId%>"/>		
			
			<ps:hidden name="login_comp_code" id="login_comp_code" value="%{#session.sesVO.companyCode}"></ps:hidden>
			<ps:hidden name="login_bra_code" id="login_bra_code" value="%{#session.sesVO.branchCode}"></ps:hidden>
			<ps:hidden name="appName" id="autoLogin_appName" value="%{#session.sesVO.currentAppName}"></ps:hidden>
			<ps:hidden name="scannedCIFNo" id="scannedCIFNo" value="%{#session.sesVO.scannedCIFNo}"></ps:hidden>
			<ps:hidden name="externalScreen" id="externalScreen" value="%{#session.sesVO.externalScreen}"></ps:hidden>
			<ps:hidden name="originalProgRef" id="originalProgRef" value="%{#session.sesVO.originalProgRef}"></ps:hidden>
			<ps:hidden name="originalAppName" id="originalAppName" value="%{#session.sesVO.originalAppName}"></ps:hidden>
			<ps:hidden name="originalAppUrl" id="originalAppUrl" value="%{#session.sesVO.originalAppUrl}"></ps:hidden>
			<ps:hidden name="runningDateRET" id="runningDateRET" value="<%=runningDateRET%>"></ps:hidden>
			<ps:hidden name="additionalParams" id="additionalParams" value="%{#session.sesVO.additionalParamsQueryString}"></ps:hidden>
		</form>
		
		<div align="center" style="width: 100%;height: 100%;" >
  <table width="100%" height="100%">
  <tr height="100%">
  <td align="center" style="font-weight: bold">
     Loading ...
  </td>
  </tr>
  </table>
  </div>
		

	</body>
</html>