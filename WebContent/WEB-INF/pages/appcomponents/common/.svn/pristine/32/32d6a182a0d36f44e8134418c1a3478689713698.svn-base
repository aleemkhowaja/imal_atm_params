<%@page import="java.util.Date"%>
<%@page import="com.path.lib.common.util.DateUtil"%>
<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>
<%@page import="org.springframework.security.core.context.SecurityContextHolder"%>
<%@page import="com.path.vo.common.SessionCO"%>
<%@page import="com.path.bo.common.CommonMethods"%>
<%@page import="com.path.bo.common.ConstantsCommon"%>

<%
		String credentials = CommonMethods.returnEncryptedJpassword((String) SecurityContextHolder.getContext().getAuthentication().getCredentials());
		String principal   = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		SessionCO sessionCO = (SessionCO) request.getSession().getAttribute("sesVO");
		String runningDateRET = "";
		if(sessionCO.getRunningDateRET() != null)
		{
			runningDateRET = DateUtil.format(sessionCO.getRunningDateRET());
		}
		Date d  = new Date();
		long _timeToId = d.getTime();
%>

<iframe name='extScreenFrame_common_<%=_timeToId%>' id='extScreenFrameId_common_<%=_timeToId%>' style="width:100%;height:100%;border:0px;overflow:auto;">
</iframe>

<form  id="appScreenFormId_<%=_timeToId%>" method="post" >	  
	<ps:hidden  id="j_username" name="j_username" value="<%=principal%>"></ps:hidden>
	<ps:hidden id="j_password" name="j_password" value="<%=credentials%>"></ps:hidden>
	<ps:hidden name="login_comp_code" id="login_comp_code" value="%{#session.sesVO.companyCode}"></ps:hidden>
	<ps:hidden name="login_bra_code" id="login_bra_code" value="%{#session.sesVO.branchCode}"></ps:hidden>
	<ps:hidden name="language" id="language" value="%{#session.sesVO.language}"></ps:hidden>
	<ps:hidden name="runningDateRET" id="runningDateRET" value="<%=runningDateRET%>"></ps:hidden>
	<ps:hidden name="destinationProgRef" id="destinationProgRef"></ps:hidden>
	<ps:hidden name="appName" id="appName"></ps:hidden>
	<ps:hidden name="destinationScreenUrl" id="destinationScreenUrl"></ps:hidden>
	<ps:hidden name="additionalParams" id="additionalParams"></ps:hidden>
	<input type="hidden" name="originalAppUrl" id="originalAppUrl_<%=_timeToId%>"/>
</form>


<script type="text/javascript">
//TP 500032 W A S automatic login Issue
var currentServer = "<%=CommonMethods.returnServerType()%>";
var appNumericVersion = "<%=ConstantsCommon.returnAppNumericVersion()%>";
var originalAppUrl = window.location.href;
var appContextRoot = "${pageContext.request.contextPath}";
//getting the root url of application regrdless if there is port or not
originalAppUrl = originalAppUrl.substring(0,originalAppUrl.indexOf(appContextRoot)+appContextRoot.length+1);
$("#originalAppUrl_<%=_timeToId%>").val(originalAppUrl);

var destinationProgRef = '<ps:property value="destinationProgRef" escapeHtml="false" escapeJavaScript="true"/>';

var destinationAppUrl = '<ps:property value="destinationAppUrl" escapeHtml="false" escapeJavaScript="true"/>';
if(destinationAppUrl.substring(destinationAppUrl.length -1) != "/")
{
	destinationAppUrl += "/";
}
var src = destinationAppUrl;
//if W A S application server,TP 500032 W A S automatic login Issue
if(currentServer == "WAS")
{
	src = src+ "path/AutoLoginAction";
}
$('#appScreenFormId_<%=_timeToId%>').attr("action",src);
$('#appScreenFormId_<%=_timeToId%>').attr("target","extScreenFrame_common_<%=_timeToId%>");
submitEncryptedData('appScreenFormId_<%=_timeToId%>',false);
</script>