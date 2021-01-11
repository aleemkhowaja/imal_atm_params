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
		
		String _timeToId = java.util.UUID.randomUUID().toString().replace("-", "");
%>

<iframe name='extScreenFrame_<%=_timeToId%>' id='extScreenFrameId_<%=_timeToId%>' style="width:100%;height:100%;border:0px;">
</iframe>

<form  id="extAppForm_<%=_timeToId%>" method="post" style="display:none">	  
	<ps:hidden  id="j_username" name="j_username" value="<%=principal%>"></ps:hidden>
	<ps:hidden id="j_password" name="j_password" value="<%=credentials%>"></ps:hidden>
	<ps:hidden name="login_comp_code" id="login_comp_code" value="%{#session.sesVO.companyCode}"></ps:hidden>
	<ps:hidden name="login_bra_code" id="login_bra_code" value="%{#session.sesVO.branchCode}"></ps:hidden>
	<ps:hidden name="language" id="language" value="%{#session.sesVO.language}"></ps:hidden>
	<ps:hidden name="scannedCIFNo" id="scannedCIFNo" value="%{#session.sesVO.scannedCIFNo}"></ps:hidden>
	<ps:hidden name="runningDateRET" id="runningDateRET" value="<%=runningDateRET%>"></ps:hidden>
	<input type="hidden" name="externalScreen" id="externalScreen_<%=_timeToId%>"/>
	<input type="hidden" name="originalProgRef" id="originalProgRef_<%=_timeToId%>"/>
	<input type="hidden" name="originalAppName" id="originalAppName_<%=_timeToId%>"/>
	<input type="hidden" name="extAppName" id="extAppName_<%=_timeToId%>"/>
	<input type="hidden" name="originalAppUrl" id="originalAppUrl_<%=_timeToId%>"/>
	<input type="hidden" name="additionalParams" id="additionalParams_<%=_timeToId%>"/>
</form>


<script type="text/javascript">
//TP 500032 W A S automatic login Issue
var currentServer = "<%=CommonMethods.returnServerType()%>";
var appNumericVersion = "<%=ConstantsCommon.returnAppNumericVersion()%>";
var originalAppUrl = window.location.href;
var appContextRoot = "${pageContext.request.contextPath}";
// getting the root url of application regrdless if there is port or not
originalAppUrl = originalAppUrl.substring(0,originalAppUrl.indexOf(appContextRoot)+appContextRoot.length+1);
document.getElementById("originalAppUrl_<%=_timeToId%>").value = originalAppUrl;
//remove the margins from body only for Chrome/firefox since in chrome 2 scroll bars coming
var isChrome = /chrome|firefox/.test(navigator["userAgent"].toLowerCase());
if(isChrome)
{
	document.body.style.margin = 0;
}

var extProgRef = '<ps:property value="extProgRef" escapeHtml="false" escapeJavaScript="true"/>';
if(typeof($mainTabs) != "undefined")
{
	//to avoid getting additional scrollbar caused by the tab title , we should subtract the height of the tab title from the total height of the tab
	if($("#mainTabs ul.ui-tabs-nav").length > 0 )
	{
		$("#extScreenFrameId_<%=_timeToId%>").height($mainTabs.height() - $("#mainTabs ul.ui-tabs-nav").outerHeight());
	}
	else
	{
		$("#extScreenFrameId_<%=_timeToId%>").height($mainTabs.height());	
	} 
    
}

var appUrl = '<ps:property value="extAppURL" escapeHtml="false" escapeJavaScript="true"/>';
var extAppName = '<ps:property value="extAppName"  escapeHtml="false" escapeJavaScript="true"/>';
var originalProgRef = '<ps:property value="menuVar" escapeHtml="false" escapeJavaScript="true"/>';
var originalAppName = '<ps:property value="ap_n" escapeHtml="false" escapeJavaScript="true"/>';
//TP 475542
var additionalParams = '<ps:property value="ad_p" escapeHtml="false" escapeJavaScript="true"/>';
document.getElementById("externalScreen_<%=_timeToId%>").value = extProgRef;
document.getElementById("originalProgRef_<%=_timeToId%>").value = originalProgRef;
document.getElementById("originalAppName_<%=_timeToId%>").value = originalAppName;
document.getElementById("extAppName_<%=_timeToId%>").value = extAppName;
document.getElementById("additionalParams_<%=_timeToId%>").value = additionalParams;
if(appUrl.substring(appUrl.length -1) != "/")
{
	appUrl += "/";
}
var src = appUrl;
//if W A S application server,TP 500032 W A S automatic login Issue
if(currentServer == "WAS")
{
	src = src + "path/AutoLoginAction";
}
document.getElementById('extAppForm_<%=_timeToId%>').action = src;
document.getElementById('extAppForm_<%=_timeToId%>').target = "extScreenFrame_<%=_timeToId%>";
submitEncryptedData('extAppForm_<%=_timeToId%>',false);
</script>