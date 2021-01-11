<%@page import="com.path.bo.common.CommonMethods"%>
<%@page import="com.path.bo.common.ConstantsCommon"%>
<%@page import="com.path.vo.common.SessionCO"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="java.util.HashMap"%>
<%@page import="com.path.lib.common.util.DateUtil"%>

<%
String premain_appversion = ConstantsCommon.returnAppNumericVersion();	
/*we need to remove the forceLoggetOut from session in case it still exists after rendering the login.jsp page. note that we cannot remove the forceLoggetOut from login.jsp because we will not get the correct froce logout message and we got session timeout message instead which is wrong.*/
request.getSession().removeAttribute("forcedLoggedOut");

SessionCO sessCO = (SessionCO)request.getSession().getAttribute(ConstantsCommon.SESSION_VO_ATTR);
String language = request.getParameter("language");

String url = "";
// check if language already available in the session.
if(language == null && sessCO != null && sessCO.getLanguage() != null)
{
    // construct ISO code from language by converting to lowercase
    language = sessCO.getLanguage().toLowerCase();
}
String localLang = request.getSession().getAttribute("localLang") != null ? (String)request.getSession().getAttribute("localLang") : 
		(com.opensymphony.xwork2.ActionContext.getContext() != null ? com.opensymphony.xwork2.ActionContext.getContext().getLocale().getLanguage() :"EN") ;
language = language == null ? localLang : language;

String param = "?request_locale="+language;

String menuVar= request.getParameter("menuVar") == null ? ((sessCO != null && sessCO.getDirectMenuVar() != null ) ? sessCO.getDirectMenuVar() : "") : request.getParameter("menuVar");
String appName= request.getParameter("appName");// checking on null to empty will change DesktopAction behavior, we cannot do : request.getParameter("appName") == null ? "" : request.getParameter("appName");

//external screen opening after authentication, another external screen, or after application authenticated from landing page
String originalProgRef = request.getParameter("originalProgRef") == null ? ((sessCO != null && sessCO.getOriginalProgRef() != null ) ? sessCO.getOriginalProgRef() : "") : request.getParameter("originalProgRef");
String externalScreen = request.getParameter("externalScreen") == null ? ((sessCO != null && sessCO.getExternalScreen() != null ) ? sessCO.getExternalScreen() : "") : request.getParameter("externalScreen");
String originalAppName = request.getParameter("originalAppName") == null ? ((sessCO != null && sessCO.getOriginalAppName() != null ) ? sessCO.getOriginalAppName() : "") : request.getParameter("originalAppName");
String originalAppUrl = request.getParameter("originalAppUrl") == null ? ((sessCO != null && sessCO.getOriginalAppUrl() != null ) ? sessCO.getOriginalAppUrl() : "") : request.getParameter("originalAppUrl");
String scannedCIFNo = request.getParameter("scannedCIFNo");

//application opening from landing page already authenticated
String appId= request.getParameter("appId") == null ? ((sessCO != null && sessCO.getAppId() != null ) ? sessCO.getAppId() : "") : request.getParameter("appId");
String favoriteId= request.getParameter("favoriteId") == null ? ((sessCO != null && sessCO.getFavoriteId() != null ) ? sessCO.getFavoriteId() : "") : request.getParameter("favoriteId");
String destinationScreenUrl = request.getParameter("destinationScreenUrl") == null ? ((sessCO != null && sessCO.getDestinationScreenUrl() != null ) ? sessCO.getDestinationScreenUrl() : "") : request.getParameter("destinationScreenUrl");
String destinationProgRef = request.getParameter("destinationProgRef") == null ? ((sessCO != null && sessCO.getDestinationProgRef() != null ) ? sessCO.getDestinationProgRef() : "") : request.getParameter("destinationProgRef");
//TP 475542 additional params can be JSON is cominf from opening esternal screen in iframe by developer like Alert,... OR QueryString PArameters if coming from Menu External Screen n Trager application opening
String additionalParams = request.getParameter("additionalParams") == null ? ((sessCO != null && sessCO.getAdditionalParamsQueryString() != null ) ? sessCO.getAdditionalParamsQueryString() : "") : request.getParameter("additionalParams");

String sessionUserName = null;
String j_username = request.getParameter("j_username") == null ? "" : request.getParameter("j_username");
String j_password = request.getParameter("j_password") == null ? "" : request.getParameter("j_password");
String runningDateRET = request.getParameter("runningDateRET");

if(sessCO != null)
{
    sessionUserName = sessCO.getUserName();
    if(request.getParameter("login_comp_code") != null && !request.getParameter("login_comp_code").isEmpty())
    {
    	BigDecimal loginCompCode = new BigDecimal(request.getParameter("login_comp_code"));
    	BigDecimal loginBraCode = new BigDecimal(request.getParameter("login_bra_code"));
    	//in case of application clicked from landing page, check if user/comp/br are changed and set the flag to relad details in session. this flag will be removed from session in login() in desktop action
    	if( (appId != null && !appId.isEmpty()) )
		{
			if( (!loginCompCode.equals(sessCO.getCompanyCode()))
					|| (!loginBraCode.equals(sessCO.getBranchCode()))
					|| (j_username != null && !j_username.isEmpty() && !j_username.equals(sessCO.getUserName())) 
				)
			{
				request.getSession().setAttribute("reload_user_session_details","1");
			}
		}
    	
		sessCO.setCompanyCode(loginCompCode);
		sessCO.setBranchCode(loginBraCode);
	}

    if(externalScreen != null)
    {
    	/* Fix Issue #266634 check if runningDateRET exists in request param and then update the running date in sessionCO */
		if(runningDateRET != null && !runningDateRET.trim().isEmpty())
		{
		    sessCO.setRunningDateRET(DateUtil.parseDate(runningDateRET,DateUtil.DEFAULT_DATE_FORMAT));
		}    
    }

    
    if(scannedCIFNo != null && !scannedCIFNo.isEmpty())
	{
		sessCO.setScannedCIFNo(new BigDecimal(scannedCIFNo));
	}
	
    /* Modif Iframe loading - reset the addtional params value, because it's already set in the first login */
    if(destinationScreenUrl != null && !destinationScreenUrl.isEmpty() )
    {
		if(appName != null) //coming from dashboard.js after calling loadIframeScreenAction appName is sent as parameter and url was empty, was going twice in the /imal_core_portal  
	    {
			url=  "/pathdesktop/loginCompBrAction_loginCoBrScreen" +param;
	    }
    }
    
    //in case of first automatic login coming from CustomLoginUrlEntryPoint then UnsecureAction.automaticLogin , we need to empty the session attributes
    if("0".equals(sessCO.getManualLogIn()))
	{
		//reset manuelLogin to null
		sessCO.setManualLogIn(null);
		//clear session values
		sessCO.setExternalScreen(null);
		sessCO.setAdditionalParamsQueryString(null);
		sessCO.setOriginalAppUrl(null);
		sessCO.setAppId(null);
		sessCO.setFavoriteId(null);
		sessCO.setDestinationScreenUrl(null);
		sessCO.setDestinationProgRef(null);
		//sessCO.setAdditionalParamsMap(null); //we cannot set it to null because for first login from CustomLoginUrlEntryPoint the map is filled in session
	}
    
    //setting attributes like originalAppName and originalProgRef in session because they are needed from FMS when opening from request screen 
    sessCO.setOriginalAppName( (originalAppName != null && originalAppName.isEmpty()) ? null : originalAppName );
    sessCO.setOriginalProgRef( (originalProgRef != null && originalProgRef.isEmpty()) ? null : originalProgRef );
}

if(appName == null)
{	
    if(request.getSession().getAttribute("Change_PWD") != null )
    {
		url = "/pwdchange/changePwdAction"+param ;
    }
    else
    {
		url=  "/pathdesktop/loginCompBrAction_loginCoBrScreen" +param;
    }
} 

else if(menuVar != null && appName != null)
{
	param += "&menuVar="+menuVar+"&appName="+appName;
	url= "/pathdesktop/indexDesktopAction.action" +param;
}


	String ieVerStr = CommonMethods.returnIEVersion(request.getHeader("User-Agent"));
	boolean isIE = false;
	float ieVer = 0;
	if(ieVerStr != null)
	{
		ieVer = Float.parseFloat(ieVerStr);
		isIE = true;
	}
	url = request.getContextPath() + response.encodeRedirectURL(url);
	
	String loadImgUrl = "/common/style/images/pageLoading.gif";
	if("FR".equalsIgnoreCase(language))
	{
	    loadImgUrl = "/common/style/images/pageLoading_FR.gif";
	}
	else 
	   if("AR".equalsIgnoreCase(language)) 
	   {
	       loadImgUrl = "/common/style/images/pageLoading_AR.gif";
	   }
%>
<html>
<head>

    <%/*Common component styles*/%>


<style type="text/css">
.showPageLoadingWithLabel {
		background-repeat: no-repeat;
		background-position: center;
		width: 100%;
	}
</style> 

<%if(ConstantsCommon.SECURITY_ENCRYPTPARAMS_ENABLED){%>
<script type="text/javascript" src="${pageContext.request.contextPath}/login/cryptojs/aes.js?_=<%=premain_appversion%>"></script>
<% }%>
<script> var blockF12 = '<%=CommonMethods.returnF12BlockingEnabled()%>'; </script>
<script type="text/javascript" src="${pageContext.request.contextPath}/login/cryptojs/security-util.js?_=<%=premain_appversion%>"></script>
<script> var uniqueSessionToken = '<%=CommonMethods.returnUniqueSessionToken(request.getSession())%>'; var encryptionPwd = '<%=CommonMethods.returnEncryptionPassword(request.getSession())%>'; </script>
</head>
<body onload="submitEncryptedData('premainFormId')">
 
	 <table width='100%' height="100%">
		<tr>
			<td class='showPageLoadingWithLabel'>
			<% if(isIE && ieVer <= 9) 
   			 {%>
 				 <br/><br/><br/><br/><br/><br/><br/><br/>
			 <%} %>
			 <center> <img alt="" src="<%=request.getContextPath()+loadImgUrl%>"></center>
			</td>
		</tr>
	</table>

<form  id="premainFormId" method="post" action="<%=url%>">	  
	<input name="appId" type="hidden" value="<%=appId%>"/>
	<input name="favoriteId" type="hidden" value="<%=favoriteId%>"/>
	<input name="originalProgRef" type="hidden" value="<%=originalProgRef%>"/>
	<input name="originalAppUrl" type="hidden" value="<%=originalAppUrl%>"/>
	<input name="externalScreen" type="hidden" value="<%=externalScreen%>"/>
	<input name="destinationScreenUrl" type="hidden" value="<%=destinationScreenUrl%>"/>
	<input name="destinationProgRef" type="hidden" value="<%=destinationProgRef%>"/>
	<input name="additionalParams" type="hidden" value='<%=CommonMethods.escapeHtmlString(additionalParams)%>'/>
	<% 
		if(sessionUserName != null && !sessionUserName.isEmpty() 
			&& j_username != null && !j_username.isEmpty()
			&& j_password != null && !j_password.isEmpty()
			&& !sessionUserName.equals(j_username))
	    {
	%>
		<input name="j_username" type="hidden" value='<%=j_username%>'/>
		<input name="j_password" type="hidden" value='<%=j_password%>'/>
	<% 
		} 
	%>
</form>
</body>

</html>
