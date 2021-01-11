<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>
<%@ taglib uri="http://www.opensymphony.com/sitemesh/decorator" prefix="decorator" %>
<%@page import="com.path.vo.common.SessionCO"%>
<%@page import="com.path.lib.common.util.NumberUtil"%>
<%@page import="com.path.lib.common.util.StringUtil"%>
<%@page import="com.path.bo.common.CommonMethods"%>
<%@page import="com.path.bo.common.ConstantsCommon"%>
<%@page import="com.path.bo.common.PluginsConstants"%>

<% 
	SessionCO sessionCO_wm = (SessionCO) session.getAttribute("sesVO");
	String scannedCIF_wm =  NumberUtil.addLeadingZeros(sessionCO_wm.getScannedCIFNo(),8) ;
	String scannedCIFName_wm = StringUtil.nullToEmpty(sessionCO_wm.getScannedCIFName());
	String className_wm = "red_person";
	if(sessionCO_wm.getScannedCIFNo() == null)
	 {
	    scannedCIF_wm = scannedCIFName_wm= "-";
	    className_wm = "";
	 }
	
   String browser = request.getHeader("User-Agent");
   float ieVer = 0;
   boolean isIE = false;
   String ieVerStr = CommonMethods.returnIEVersion(browser);
   if(ieVerStr != null)
   {
		ieVer = Float.parseFloat(ieVerStr);
		isIE = true;
   }
   
	if(isIE) {
	    
%>
<!DOCTYPE html>
<% } %>
<html>
	<head>
	
		<!-- used to take highest available compatibility mode for IE -->
	    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
	    <%@include file="../pages/appcomponents/common/AppMainCommon.jsp"%>
		<title>
		<ps:if test='%{screenTitle != null}'>
      		<ps:property value="screenTitle" escapeHtml="true"/>
	  	</ps:if>
	  	<ps:else>
			<decorator:title default="Login" />
	  	</ps:else>
		</title>
		<decorator:head />
		<script type="text/javascript">
		var _pageRef = '<ps:property value="menuVar" escapeHtml="false" escapeJavaScript="true"/>';
		var RTL_DIRECTION = '<ps:property value="isRTL" escapeHtml="false" escapeJavaScript="true"/>';
	    var globalThemeName = '<ps:property value="themeName" escapeHtml="false" escapeJavaScript="true"/>';
	    var appNumericVersion = "<%=ConstantsCommon.returnAppNumericVersion()%>";
		var currentURL = '<ps:property value="currentURL"  escapeHtml="false" escapeJavaScript="true"/>';
		var pathActivexDownloadEnabled = '<%=CommonMethods.returnActivexDownloadEnabled().toString()%>';
			function onLangChng(myObj)
			{   
				var src = "${pageContext.request.contextPath}";
				//check if / is already available in URL not to add it since it causing issue in W A S having double slashes in URL //
				//TP 594949 in case currentURL is empty
				if(currentURL === "" || (currentURL != "" && currentURL.indexOf("/") !== 0))
				{
					src = src + "/";
				}
				src = src + currentURL + (currentURL.indexOf("?") > -1 ? "&" : "?") +"request_locale="+myObj.id; 
				
				_showProgressBar(true);
				//TP 481457 change the global storage vriable for current application to the language changed
		    	localStorage.setItem("user_language_<%=ConstantsCommon.returnCurrentAppName()%>", myObj.id);
				document.location.href= returnEncryptedUrl(src);
			}
		
			$(document).ready(function(){
				 	 
			 // if($("#menuHeader").html() != "" && $("#menuHeader").html() != null) //case of change password similar to loginCompBr
			  //	$('#menuHeader > li').bind('click', jsddm_open);
			  
			  
			  });
			 </script>
	 <style type="text/css">
			 	html, body { height:100%; }
			 </style>
	 <jsp:include page="../pages/appcomponents/common/AppCommonTrans.jsp"/>	
	 
	 <%/*including Application specific js files use while opend from favorite*/ %>
	 <ps:if test='%{#session.sesVO.companyCode!=null && session.sesVO.currentAppName == "TFA"}'>
      	<script type="text/javascript" src="<ps:url value='/path/js/tfa/common/TfaCommonFunc.js' />"></script>
	  </ps:if>
     <ps:if test='%{#session.sesVO.currentAppName == "SADS"}'>
	 		<jsp:include page="../pages/sads/common/SadsAppTrans.jsp"/>
	 		<script type="text/javascript"  src="<ps:url value='/path/js/sads/common/SadsCommonFunc.js'/>"></script>
     </ps:if>
</head>
		<ps:if test='%{#session.sesVO.disablePrntScrn != null}'>
	
		<ps:set name="prntDisIntErr" value="%{getEscText('prntDisIntErr')}" />
	<%	if(isIE && CommonMethods.returnActivexDownloadEnabled()) {
	    %>
	<object name="PathClip" style='display:none' id='PathClip' classid='<%=PluginsConstants.PATHCLIP_CLSID%>' codebase='../login/pathCtrl.cab#version=<%=PluginsConstants.PATHCTRL_AX_VERSION%>'></object>
	<%} %>		
		<script type="text/javascript">
		var pthCtrlvrsnNb = '<%=PluginsConstants.PATHCTRL_EX_VERSION%>'; 
		var disablePrntScrn = '${session.sesVO.disablePrntScrn}';
		var prntDisIntErr= '<ps:property value="prntDisIntErr" escapeHtml="false" escapeJavaScript="true"/>';
		$.struts2_jquery.require("CommonExtensions.js" ,null,jQuery.contextPath+"/common/jquery/");
		</script>
		<body style="margin: 0; overflow: auto" class="no-print">
	</ps:if>
	<ps:else>
		<body style="margin: 0; overflow: auto" >
	</ps:else>	
		<table id="page-container" cellpadding="0" cellspacing="0" border="0" width="100%" height="100%">
			<tr><%/* Header */%>
				<td height="60">
					<table width="100%" height="100%" cellpadding="0" cellspacing="0" border="0">
					    <tr>
					    	<td width="14%"  class="header-top-left">
					    	 	<div style="width: 90px; height: 60px;"  class="pathLogoImage"/>
		 					</td>
						    <td class="header-top-right" nowrap="nowrap">
						    	<table width="100%" height="100%" cellpadding="0" cellspacing="0" border="0">
						    	 <tr>
					    
							    	<td nowrap="nowrap" rowspan="3">
											<jsp:include page="/WEB-INF/pages/common/login/LoginInfoUsr.jsp"/>
									</td>
									<ps:if test='%{#session.sesVO.companyCode!=null && (session.sesVO.currentAppName == "RET" || session.sesVO.currentAppName == "IBIS" || session.sesVO.currentAppName == "PMS")}'>
									 <td width="5%" ></td>
									 <td width="2" nowrap="nowrap" style="width:2px; background-color: orange; " ></td>
									 <td width="5">&nbsp;</td>
									</ps:if>
									<td>
						   			 	<table width="100%" height="100%" cellpadding="0" cellspacing="0" border="0">
						   			 	 <tr>
						   			 	    <td  class="right" nowrap="nowrap">
						   			 	      <ps:if test='%{#session.sesVO.companyCode!=null && newSessionRight != null}'>
													  <table cellpadding="0" cellspacing="0" border="0">
														<tr>
										    				<td nowrap="nowrap" class="headerStyle"><ps:label  key="customer_id_key"/>&nbsp;:&nbsp;</td>
															<td class="headerStyle" nowrap="nowrap"><span class="<%=className_wm%>" id="hdr_scanned_cif_no"><%=scannedCIF_wm%></span></td>
														</tr>
														<tr>
															<td class="headerStyle" nowrap="nowrap"><ps:label key="customer_name_key"/>&nbsp;:&nbsp;</td>
															<td class="headerStyle" nowrap="nowrap"><span id="hdr_scanned_cif_name"><%=scannedCIFName_wm%></span></td>
										  				</tr>
									  				</table>	
						   			 	     </ps:if>
						   			 	   </td>
						   			 	 <td width="50%">
						   			 	 </td>
					   			 		<td nowrap="nowrap" class="floatLeftRight" style="display:none">
					   			 			<ps:set name="webLstMenu" value="lstMenu"/>
					   			 			<ps:if test="%{#webLstMenu.size>0}">
					   			 			    <ps:menu id="menuHeader" list="${lstMenu}"></ps:menu>
											</ps:if>
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
			<tr><%
	    /* Footer */
	%>
					<td height="20">
					<div style="width=100%;padding:0px;overflow:hidden" ><jsp:include page="AppMainFooter.jsp"></jsp:include></div>
					</td>
				</tr>
			
		</table>
	</body>
	
</html>