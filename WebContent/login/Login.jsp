<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@page import="com.path.vo.common.SessionCO"%>
<%@page import="com.path.bo.common.ConstantsCommon"%>
<%@page import="com.path.bo.common.CommonMethods"%>
<%
    //read the language of the user in case performed login, by default the method will return english
	String login_appversion = ConstantsCommon.returnAppNumericVersion();	    
    String dir = "ltr";
    String left = "left";
    String right = "right";
    String requestlocale = com.opensymphony.xwork2.ActionContext.getContext().getLocale().getLanguage();
    if(requestlocale == null)
    {
		requestlocale = "en";
    }
    // specify correct RTL direction in case of AR
    if(requestlocale.equalsIgnoreCase("ar"))
    {
		dir = "rtl";
		left = "right";
		right = "left";
    }
    // set the user language into the session to read it upon applyDirection of desktopAction method in CompanyBranch Screen load
    request.getSession().setAttribute("localLang", requestlocale);
    
    String appName = request.getParameter("appName");
    if(appName != null)
    {
		if(request.getSession().getAttribute("sesVO") == null)
		{
		    SessionCO sessionCO = new SessionCO();
		    sessionCO.setCurrentAppName(appName);
			sessionCO.setLanguage(requestlocale.toUpperCase());
		    request.getSession().setAttribute("sesVO", sessionCO);
		}
		else
		{
		    ((SessionCO) request.getSession().getAttribute("sesVO")).setCurrentAppName(appName);
		}

    }

    //the browser variable defined in AppMain.jsp
    String ieVerStr = CommonMethods.returnIEVersion(request.getHeader("User-Agent"));
    boolean isIE = false;
    float ieVer = 0;
    if(ieVerStr != null)
    {
		ieVer = Float.parseFloat(ieVerStr);
		isIE = true;
    }
    String browserType = request.getHeader("User-Agent");
    if(browserType.toLowerCase().contains("chrome") && !browserType.toLowerCase().contains("edge"))
    {
		browserType = "Chrome";
    }
    Object captchaEnabled =  request.getSession().getAttribute("captchaEnabled");
%>

<HTML dir="<%=dir%>">
<%	if((isIE && ieVer >= 9) || !isIE) 
 {

%>
<HEAD>
<link rel="shortcut icon"  href="${pageContext.request.contextPath}/login/images/favicon.ico" type="image/x-icon"/>
<!-- used to take highest available compatibility mode for IE -->
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/login/style/ImalBranding.css" />	<%/*coloring management*/%>
<style>
.pathLoginImage{
	background-image: url('images/path-logo.png');
    background-repeat:no-repeat;
    background-size:90px 60px;
}
</style>

<%	if("OADM".equals(appName)) { %>
<TITLE><ps:text name="Omni Channel Admin Login"/></TITLE>
<%}else{ %>
<TITLE><ps:text name="iMAL Login"/></TITLE>
<%} %>

<LINK REL="stylesheet" TYPE="text/css" HREF="${pageContext.request.contextPath}/login/style/LoginPage.css">
<% if(dir.equals("rtl")) 
{
%>
<LINK REL="stylesheet" TYPE="text/css" HREF="${pageContext.request.contextPath}/login/style/LoginPage_rtl.css">
<%
}
%>

<script type="text/javascript" src="${pageContext.request.contextPath}/login/js/Login.js?_=<%=login_appversion%>"></script>
<script>
function login(){
	var elem = document.getElementById('passwordInp');
	var elemReal = document.getElementById('passwordInptosend');
	var values = elem.value;
	elemReal.value = values;

	var theParentNode = elem.parentNode;
	theParentNode.removeChild(elem);
	var newTextElem = document.createElement("input");
	newTextElem.setAttribute("type", "text");
	newTextElem.setAttribute("class", "texta keyboardInput");
	newTextElem.setAttribute("onkeypress","return false;");
	
	theParentNode.appendChild(newTextElem);
	submitEncryptedData('loginForm');			
	
}
</script>
<%if(ConstantsCommon.SECURITY_ENCRYPTPARAMS_ENABLED){%>
<script type="text/javascript" src="${pageContext.request.contextPath}/login/cryptojs/aes.js?_=<%=login_appversion%>"></script>
<% }%>
<script>var blockF12 = '<%=CommonMethods.returnF12BlockingEnabled()%>'; </script>  
<script type="text/javascript" src="${pageContext.request.contextPath}/login/cryptojs/security-util.js?_=<%=login_appversion%>"></script> 
<script> var uniqueSessionToken = '<%=CommonMethods.returnUniqueSessionToken(request.getSession())%>'; var encryptionPwd = '<%=CommonMethods.returnEncryptionPassword(request.getSession())%>'; var isShufleKeyboard = '<%=CommonMethods.returnShuffleEnabled()%>';</script>

<STYLE TYPE="text/css">
.loginPage
{
background-color: #005A80;
}

.loginPage TD{
color: #FFFFFF;
font-family: Trebuchet MS;
font-size: 10pt;
}
.portal-top-left {background: url(images/img/top_lef.gif) ;}
.portal-top-center { background: url(images/img/top_mid.gif) repeat-x;  }
.portal-top-right {background: url(images/img/top_rig.gif);}
.portal-left {  background:url(images/img/cen_lef.gif) repeat-y;}
.portal-right {  background: url(images/img/cen_rig.gif) repeat-y;}
.portal-bottom-left {background: url(images/img/bot_lef.gif);}
.portal-bottom-center {background: url(images/img/bot_mid.gif);  }
.portal-bottom-right {background: url(images/img/bot_rig.gif);}

.keyboardInputInitiator
{
   display: none;
cursor: auto;
}
</STYLE>
<LINK id="appMainThemeCustomizationLink_Login" REL="stylesheet" TYPE="text/css" HREF="${pageContext.request.contextPath}/login/logincustomization/loginThemeCustomization_loadCssFromRepository">
</HEAD>

<BODY  style="margin: 0; overflow: auto;">  


	<table height="100%" CELLPADDING="0" CELLSPACING="0" WIDTH="100%">
	   <TR ><td>&nbsp;</td></TR>
	   		
		<tr height="50%" >
			<td align="center" nowrap="nowrap">
			<form id="loginForm" name="loginForm"  
	action="${pageContext.request.contextPath}/j_spring_security_check" namespace="/" includeContext="true" method="post"
	target="_top" theme="simple" autocomplete="off"
	>
			<TABLE height="100%" CELLPADDING="0" CELLSPACING="0" WIDTH="100%" >
				
				<TR height="100%">
					<TD >
					
					<TABLE CELLPADDING="0" CELLSPACING="0" height="100%" width="100%" border="0" align="center" >						
						<TR>
							<TD VALIGN="TOP" WIDTH="37.5%" ></TD>
							<TD nowrap="nowrap" WIDTH="25%" align="center"  HEIGHT="80" VALIGN="middle">
							<table border="0" class="loginPage"  width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
						<tr height="16">
								<td width="16"  class="portal-top-<%=left%>"></td>
								<td class="portal-top-center"></td>
								<td width="10" class="portal-top-<%=right%>"></td>
						</tr>
					    <tr>
					     <td  class="portal-<%=left%>"></td>
						<td>
							
								<TABLE border="0" height="100%" CELLPADDING="0" CELLSPACING="0" border="0" width="100%" >
								
								<tr>
								<td>&nbsp;</td>
								</tr>
								<tr>
									<td  align="<%=left%>">
										<div align="middle" style="width:96px; height: 40px; background-image: url(${pageContext.request.contextPath}/login/images/path-logo-login.png);background-repeat: no-repeat;"/>
									</td> 
								</tr>
								<tr >
									<td  align="center" >
									 <div style="width: 90px; height: 60px;" align="middle"  class="pathLoginImage"/>
									</td>
								</tr>
								<tr>
								<td>&nbsp;<br/>&nbsp;</td>
								</tr>
								<TR>
										  <TD  >
										  <div  class="note">
										  <ps:actionerror theme="simple"/>
										  </div>
										   <div>
										  <ps:actionmessage theme="simple"/>
										  </div></TD>
									</TR>
									
									<TR>
										<TD id="Login_NameID" class="fldDataLeft" >
											<ps:label theme="simple" key="User_Name_key" name="Login_Name" cssClass="user"></ps:label>
									</TR>
									<TR>
										<TD class="fldDataLeft" >
										
											<ps:textfield theme="simple" id="j_username" name="j_username"
											tabindex="1" value="" cssStyle="text-transform:uppercase;" onmousedown="this.value=this.value.toLocaleUpperCase()" onblur="this.value=this.value.toLocaleUpperCase()" cssClass="texta keyboardInput"  />
										</TD>
									</TR>
									 
									<TR>									 
										<TD id="test1" class="fldDataLeft" >
										<ps:label  theme="simple" key="password_key" name="password" cssClass="user"></ps:label>
											</TD>
										 								
									</TR>
									<TR>
										<TD class="fldDataLeft" >
										<%/* dummy password input in order not make the browser remember passwords*/ %>
										<input type="hidden" id="passwordInptosend" name="j_password" style="display:none" />
										<input type="hidden" id="fromLoginFlag"     name="fromLoginFlag" value="1" style="display:none" />
										<%if("Chrome".equals(browserType)) { %>
										
										<ps:textfield value="" name="j_password_to_remove"
											tabindex="2" theme="simple" id="passwordInp" autocomplete="off"
											onkeypress="if(event.keyCode==13) 
												{login();}" cssStyle="-webkit-text-security: disc !important;" cssClass="texta keyboardInput"/>
												
										<% }else { %>
										<ps:password value="" name="j_password_to_remove"
											tabindex="2" theme="simple" id="passwordInp" autocomplete="off"
											onkeypress="if(event.keyCode==13) 
												{login();}"  cssClass="texta keyboardInput"/>
										<% } %>
									  </TD>
									</TR>
									 <%if("2".equals(captchaEnabled)) { %>
									<tr id="captchaTR">
										<td id="captcha_id" class="fldDataLeft" >
											<ps:label theme="simple" key="securitycode_key" name="captchaUserText" cssClass="user"></ps:label>
										</td>
									</tr>
									<tr id="capthcaTextTR">
										<td align="center" id="captchaText_id">
											<ps:textfield id="captchaUserTextId" theme="simple" name="captchaUserText"
											tabindex="3" value="" onkeypress="if(event.keyCode==13) 
												{login();}"  cssClass="texta keyboardInput"  />
										</td>
									</tr>
									<tr id="spaceTR"><td id="space_id">&nbsp;</td></tr>
									<tr id="captchaImageTR">
										<td align="center" id="captchaImage_id">
											<img id="captchaImage"  src="${pageContext.request.contextPath}/login/unSecureAction_loadCaptcha" /> 
											<%-- <span id="refresh_icon" title="refresh_key"  onclick="reloadCaptcha('${pageContext.request.contextPath}')" class="ui-icon ui-icon-refresh"></span> --%>
											<img style="width:20; height:20;"  onclick="reloadCaptcha('${pageContext.request.contextPath}')"  src="${pageContext.request.contextPath}/login/images/refresh-icon.png" /> 
										</td>
										
									</tr>
									<% } %>
										<td>
										<div id="loginElementsToBeHidden">
											<table border="0" width="100%" >
												<tr><td>&nbsp;</td></tr>
												<tr>
													
													<td>
														<input id="enableVKeyboard" type="checkbox" onclick="loadVKScript('${pageContext.request.contextPath}')"/>
														<span class="user"><ps:label theme="simple" key="virtual_keyboard_key" ></ps:label></span>
													</td>
													<td align="center" onclick="javascript:login();" style="cursor:pointer;background-color: #EFEFEF;border-radius: 5px;-moz-border-radius: 5px;	-webkit-border-radius: 5px;" >
																<a style="text-decoration: none; color: black; " href="#" ><ps:label cssStyle="cursor:pointer; "  theme="simple" key="login_key" name="login"></ps:label></a>
													</td>
												</tr>
											</table>
											</div>
										</td>
									  </tr>	
									   <tr>
									   	<td>
									   	  <div style="display: none;" id="vk_div" style="top: 0px;" ></div>
									   	 </td>
									   </tr>
									   
									<% /*
									<tr>
									
										<td >
										
											 <img src="images/verisign_logo.jpg">
									</tr>
									<tr>
									
										<td align="center" style="font-size: 7pt;" class="footer">
									This site is certified by verisign as a secured and trusted site.
									</tr>
									 */ %>
									<tr>
									
									<td align="center" style="font-size: 7pt;" class="footer">
									 <span title="<%=ConstantsCommon.returnAppInterBuildVersion() + " / "+ ConstantsCommon.COMMON_COMP_VERSION%>"><%=ConstantsCommon.returnAppDisplayVersion()%></span>
									</tr>
										
								 
								</TABLE>
								
								</td>
								
<td width="16" class="portal-<%=right%>"></td>
</tr>
<tr height="16">
<td width="16" class="portal-bottom-<%=left%>"></td>
<td class="portal-bottom-center"></td>
<td class="portal-bottom-<%=right%>"></td>



</tr>

</table>
							
							</TD>
						
									
						<td width="37.5%"  nowrap="nowrap" ></td>
					
							
						</TR>
	
					</TABLE>
					</TD>
					
				</TR>
			</TABLE>
			</form>
			</td>
		</tr>
		<TR ><td>&nbsp;</td></TR>
	</table>



</BODY>
<%	}
else
    {

%>
<BODY  style="margin: 0; overflow: auto;">  


	<table height="100%" CELLPADDING="0" CELLSPACING="0" WIDTH="100%">
	   <TR height="100%" ><td align="center">Please Use IE 9 or Later , Firefox 13+, or Chrome </td></TR>
	   </table>
</BODY>
<%	}



%>
</HTML>

<script>
loginInitialize();
handleSessionToken( '${pageContext.session.maxInactiveInterval}' , '${pageContext.request.contextPath}' );
</script>