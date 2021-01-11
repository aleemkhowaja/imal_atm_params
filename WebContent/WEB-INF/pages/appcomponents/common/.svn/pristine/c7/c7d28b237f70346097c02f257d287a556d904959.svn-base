<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>
<%@ taglib uri="http://www.opensymphony.com/sitemesh/decorator" prefix="decorator" %>
<%@page import="com.path.bo.common.CommonMethods"%>
<%@page import="com.path.bo.common.ConstantsCommon"%>
<%@page import="com.path.bo.common.PluginsConstants"%>

<% 
   String browser = request.getHeader("User-Agent");
   boolean isIE = false;
   String ieVerStr = CommonMethods.returnIEVersion(browser);
   if(ieVerStr != null)
   {
		isIE = true;
   }
	   if(isIE) { 
%>
<!DOCTYPE html>
<%} %>
<html>
	<head>
		<!-- used to take highest available compatibility mode for IE -->
	    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
	     <link rel="shortcut icon"  href="${pageContext.request.contextPath}/login/images/favicon.ico" type="image/x-icon"/>
	    <%/* including js Functions that uncompatible with IE8 but works in other Browsers like Array methods*/%> 
	    <ps:if test="themeName != null">
	     <link class="ui-theme" href="${pageContext.request.contextPath}/common/style/themeroller/themes/${themeName}/jquery-ui.css" rel="Stylesheet" type="text/css"/>
	    </ps:if>
	    <ps:else>
	    	<link class="ui-theme" href="${pageContext.request.contextPath}/common/style/themeroller/themes/cupertino/jquery-ui.css" rel="Stylesheet" type="text/css"/>
	    </ps:else>
	    
	    <psj:head  locale="${language}" loadAtOnce="true" appversion="<%=ConstantsCommon.returnAppNumericVersion()%>"/>
		<ps:head/>
		<title><decorator:title default="Login" /></title>
		
		<style>
			body, td, p 
			{
				font: normal x-small verdana, arial, helvetica, sans-serif;
			}
		</style>
		
		<decorator:head />
		
		<ps:set name="info_msg_title" value="%{getEscText('info_title_key')}"/>
		<ps:set name="error_msg_title" value="%{getEscText('error_title_key')}"/>
		<ps:set name="ok_label_trans" value="%{getEscText('Ok_key')}"/>
		<ps:set name="msg_progDefaultLabel" value="%{getEscText('msg.pleaseWait')}"/>
		<ps:set name="Change_running_date_key" value="%{getEscText('Change_running_date_key')}"/>
		<ps:set name="signature_close_btn" value="%{getEscText('Close_key')}"/>
		<ps:set name="record_was_Updated_Successfully_key" value="%{getEscText('Record_was_Updated_Successfully_key')}"/>
		<ps:set name="confirm_msg_title" value="%{getEscText('confirm_title_key')}"/>
		<ps:set name="cancel_label_trans" value="%{getEscText('Cancel_key')}"/>
		<ps:set name="missing_elt_msg_key" value="%{getEscText('missing_elt_key')}"/>
		<ps:set name="prntDisIntErr" value="%{getEscText('prntDisIntErr')}"/>
		<ps:set name="cache_cleared_success_key" value="%{getEscText('cache_cleared_success_key')}"/>
		<ps:set name="Selected_key" value="%{getEscText('Selected_key')}"/>
		<script type="text/javascript">
		var error_msg_title= "${error_msg_title}";
		var ok_label_trans= "${ok_label_trans}";
		var msg_progDefaultLabel= "${msg_progDefaultLabel}";
		var Change_running_date_key= "${Change_running_date_key}";
		var signature_close_btn= "${signature_close_btn}";
		var record_was_Updated_Successfully_key= "${record_was_Updated_Successfully_key}";
		var info_msg_title= "${info_msg_title}";
		var confirm_msg_title= "${confirm_msg_title}";
		var cancel_label_trans= "${cancel_label_trans}";
		var missing_elt_msg_key= "${missing_elt_msg_key}";
		var prntDisIntErr= '<ps:property value="prntDisIntErr" escapeHtml="false" escapeJavaScript="true"/>';
		var cache_cleared_success_key= "${cache_cleared_success_key}";
		var _pageRef = '<ps:property value="menuVar" escapeHtml="false" escapeJavaScript="true"/>';
		var RTL_DIRECTION = '<ps:property value="isRTL" escapeHtml="false" escapeJavaScript="true"/>';
	    var globalThemeName = '<ps:property value="themeName" escapeHtml="false" escapeJavaScript="true"/>';
		var currentURL = '<ps:property value="currentURL" escapeHtml="false" escapeJavaScript="true"/>';
		var appNumericVersion = "<%=ConstantsCommon.returnAppNumericVersion()%>";
		var Selected_key="${Selected_key}";
		var pathActivexDownloadEnabled = '<%=CommonMethods.returnActivexDownloadEnabled().toString()%>';
		var appName = '<%=ConstantsCommon.returnCurrentAppName().toString()%>';
		
			function onLangChng(myObj)
			{   
				var src = "${pageContext.request.contextPath}"; 
				// check if / is already available in URL not to add it since it causing issue in W A S having double slashes in URL //
				//TP 594949 in case currentURL is empty
				if(currentURL === "" || (currentURL != "" && currentURL.indexOf("/") !== 0))
				{
					src = src + "/";
				}
				src = src +currentURL + (currentURL.indexOf("?") > -1 ? "&" : "?") +"request_locale="+myObj.id; 
				
				_showProgressBar(true);
				//TP 481457 change the global storage vriable for current application to the language changed
		    	localStorage.setItem("user_language_<%=ConstantsCommon.returnCurrentAppName()%>", myObj.id);
				document.location.href= returnEncryptedUrl(src);
			}
			</script>
		 <%  if(isIE && CommonMethods.returnActivexDownloadEnabled())
		 { %>
			 <script type="text/javascript">
			 var disPrntScrn = '${session.sesVO.disablePrntScrn}';
			 if(disPrntScrn != null && disPrntScrn != undefined && disPrntScrn != 'undefined' && disPrntScrn != '')
			 {
				 $(document).ready(function ()
					 {
						 try
						 {
							 PathClip.Start(250);
						 }
						 catch(e)
						 {
							 alert(prntDisIntErr);
						 }
					 });
			 }
			 </script>
			<% } %>
		<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/common/style/pageComponentStyles.css" />	<%--Common component styles--%>
	    <ps:if test="%{isRTL == 'rtl'}">
			<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/common/style/pageComponentStylesRTL.css" />	<%--Common component styles--%>
		</ps:if>
		 <%  if(isIE) 
		 { %>
			 <link href="${pageContext.request.contextPath}/common/style/IE_specific.css" rel="stylesheet" type="text/css"/>
		<% } %>
		
		
		<ps:if test="%{isRTL == 'rtl'}">
			<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/common/style/pageComponentStylesRTL.css" />	<% /* Common component styles*/%>
		</ps:if>
		<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/common/style/msgbox/jquery.msgbox.css" />
		
	 <style type="text/css">
			 	html, body { height:100%; }
			 	.pathLogoImage {
					background-image:
						url('${pageContext.request.contextPath}/login/images/path-logo.png');
					background-repeat: no-repeat;
					background-size: 90px 60px;
				}
	</style>
	<style>
	<!--
	@media print {
		.no-print {
			display: none;
		}
	}
	-->
	</style>
	
	<LINK REL="stylesheet" TYPE="text/css" HREF="${pageContext.request.contextPath}/path/customization/ThemeCustomizationAction_loadCssFromRepository">
</head>
	<ps:if test='%{#session.sesVO.disablePrntScrn != null}'>
	<%if(CommonMethods.returnActivexDownloadEnabled()){%>
	<object name="PathClip" style='display:none' id='PathClip' classid='<%=PluginsConstants.PATHCLIP_CLSID%>' codebase='../login/pathCtrl.cab#version=<%=PluginsConstants.PATHCTRL_AX_VERSION%>'></object>
	<%}%>
		<body style="margin: 0; overflow: auto" class="no-print">
	</ps:if>
	<ps:else>
		<body style="margin: 0; overflow: auto">
	</ps:else>	
	

		<table id="page-container" cellpadding="0" cellspacing="0" border="0" width="100%" height="100%">
			<tr><%/* Header */%>
				<td height="60">
					<table width="100%" height="100%" cellpadding="0" cellspacing="0" border="0">
					    <tr>
					    	<td width="14%"  class="header-top-left">
					    	  <div style="width: 90px; height: 60px;" align="middle"  class="pathLogoImage"/>
		 					</td>
						    <td class="header-top-right" nowrap="nowrap">
						    	<table width="100%" height="100%" cellpadding="0" cellspacing="0" border="0">
						    	 <tr>
					    
							    	<td nowrap="nowrap" rowspan="3">
											<jsp:include page="/WEB-INF/pages/common/login/LoginInfoUsr.jsp"/>
									</td>
									<ps:if test='%{#session.sesVO.companyCode!=null && (session.sesVO.currentAppName == "RET" || session.sesVO.currentAppName == "IBIS")}'>
									 <td width="5%" ></td>
									 <td width="2" nowrap="nowrap" style="width:2px; background-color: orange; " ></td>
									 <td width="5">&nbsp;</td>
									</ps:if>
									<td>
						   			 	<table width="100%" height="100%" cellpadding="0" cellspacing="0" border="0">
						   			 	 <tr>
						   			 	    <td  class="right" nowrap="nowrap">
						   			 	   </td>
						   			 	 <td width="50%">
						   			 	 </td>
					   			 	    <td>
					   			 		  <jsp:include page="/WEB-INF/pages/common/login/LoginInfoActions.jsp"/>
					   			 		 </td>
					   			      </tr>
					    		    </table>
					    		</td>
					    	 </tr>
							</table> 
						</td>
					</tr>
			 	</table>
			 </td>
			</tr>
			<tr > <%/* Portal */%>
				 <td id="testTd" valign="middle" height=""> 
					
					 <div id="portal_div" style="overflow:auto" >
					 <decorator:body/>
					 </div>
					 
	             </td>
			</tr>
			<tr><% /* Footer */%>
					<td height="20">
					<div style="width=100%;padding:0px;overflow:hidden" ><jsp:include page="/WEB-INF/decorators/AppMainFooter.jsp"></jsp:include></div>
					</td>
				</tr>
			
		</table>
	</body>
	
	
</html>