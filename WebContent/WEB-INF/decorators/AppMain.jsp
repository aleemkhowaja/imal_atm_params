<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@ taglib uri="http://www.opensymphony.com/sitemesh/decorator" prefix="decorator" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>
<%@ taglib prefix="menu"  uri="/path-menu-tags"%>
<%@page import="com.path.bo.common.CommonMethods"%>
<%@page import="com.path.bo.common.ConstantsCommon"%>
<%@page import="com.path.bo.common.PluginsConstants"%>
<%@page import="java.net.InetAddress"%>
<%@page import="com.path.actions.common.alerts.AlertsCommonMethods"%>
<%@page import="com.path.vo.common.SessionCO"%>

<%
	String appmain_appversion = ConstantsCommon.returnAppNumericVersion();
    String eastWest = "rtl".equalsIgnoreCase((String) request.getAttribute("isRTL")) ? "east" : "west";
    String browser = request.getHeader("User-Agent");

    String ieVerStr = CommonMethods.returnIEVersion(browser);
    boolean isIE = false;
    float ieVer = 0;
    if(ieVerStr != null)
    {
		ieVer = Float.parseFloat(ieVerStr);
		isIE = true;
    }
    if(isIE)
    {
%>
<!DOCTYPE html>
<%
    }
%>

<html>
	<head>
		
		<%@include file="../pages/appcomponents/common/AppMainCommon.jsp"%>
		<title><decorator:title default="Customer Maintenance" /></title>
		<decorator:head />
		<script type="text/javascript">
			$(document).ready(function () {
				var outerLayout = $('body').layout({ applyDefaultStyles: false, closeToggleText : menuOptTran,north: {maxSize : 80}, defaults: {onresize_end : function(){resizeGrids();}}});
				outerLayout.addPinBtn("#tbarCloseWest", "<%=eastWest%>" );

		});

 			function onLangChng(myObj)
			{
 				_showProgressBar(true);
 				//TP 481457 change the global storage vriable for current application to the language changed
		    	localStorage.setItem("user_language_<%=ConstantsCommon.returnCurrentAppName()%>", myObj.id);
			 	document.location.href=returnEncryptedUrl("${pageContext.request.contextPath}/pathdesktop/indexDesktopAction.action?request_locale="+myObj.id+"&appName="+appName+"&langChanged=1");
 			}
 			var pathActivexDownloadEnabled = '<%=CommonMethods.returnActivexDownloadEnabled().toString()%>';
		</script>	
			 
		<ps:if test="%{isAlertEnabled == 'true' || isLoginAlertEnabled == 'true' || isNotificationEnabled == 'true'}">
			<%if(CommonMethods.returnActivexDownloadEnabled()){%>
			<object name='PathNotif' style='display:none' id='PathNotif' classid='<%=PluginsConstants.NOTIF_CLSID%>' codebase='../login/pathCtrl.cab#version=<%=PluginsConstants.PATHCTRL_AX_VERSION%>'></object>
			<%}%>
			<ps:if test="%{isAlertEnabled == 'true' || isLoginAlertEnabled == 'true'}">
				<script type="text/javascript" src="${pageContext.request.contextPath}/common/alert/amq_jquery_adapter.js?_=<%=appmain_appversion%>"></script> 
		    	<script type="text/javascript" src="${pageContext.request.contextPath}/common/alert/amq.js?_=<%=appmain_appversion%>"></script>
				<script type="text/javascript" src="${pageContext.request.contextPath}/common/alert/AlertEngine.js?_=<%=appmain_appversion%>"></script>
				<script type="text/javascript">
					
					<ps:if test="%{isLoginAlertEnabled == 'true'}">
						var loginAlertBtnLocked = 0;  
						var loginAlertBtnLockedMsg = "<ps:text name='Login_Alert_Redirection_key' />";
					</ps:if>
					
					$(document).ready(function() {
						var alertParams = {};
						alertParams["destinationName"] 	= '<ps:property value="userId" escapeHtml="false" escapeJavaScript="true"/>';
						alertParams["destinationType"] 	= 'topic';
						alertParams["contextPath"] 		= '${pageContext.request.contextPath}';
						alertParams["usrCompBr"] 		= '<%=AlertsCommonMethods.returnUsrCompBrKey((SessionCO) session.getAttribute("sesVO"))%>';
						alertParams["applicationName"] 	= '${session.sesVO.currentAppName}';
						alertParams["isAlertEnabled"] 	= '<ps:property value="isAlertEnabled" escapeHtml="false" escapeJavaScript="true"/>';
						alertParams["isLoginAlertEnabled"] 	= '<ps:property value="isLoginAlertEnabled" escapeHtml="false" escapeJavaScript="true"/>';
						alertParams["isClusterEnabled"] 	= '<ps:property value="isClusterEnabled" escapeHtml="false" escapeJavaScript="true"/>';
						alertParams["servletIp"] 			= encodeURIComponent('<%=CommonMethods.encodeBase64(InetAddress.getLocalHost().getHostAddress())%>');
						alertEngine.start(alertParams);
						
						<ps:if test="%{isLoginAlertEnabled == 'true' && loginAlertParamCO != null}">
							<%/* this flag is used to block the dialog buttons in case clicked before
							 * getting the manager approval. When receiving the manager approval, value become 1.
							 * value = 1 the botton is disabled, value = 0 the button is enabled  */%>
							loginAlertBtnLocked = 1;
						
							var loginAlertParam = ${loginAlertParamCO};
							var sendLoginAlertParam = {};
							$.each(loginAlertParam, function(key, value) 
							{
							    sendLoginAlertParam["_alert." + key] = value;
							});
							showSendAlert(sendLoginAlertParam,'LOGIN_ALERT');
						</ps:if>
						
					});
	
				</script>
				</ps:if>
				<%/* TP 715899 Common Notification throghwebsocket*/ %>
				<ps:if test="%{isNotificationEnabled == 'true'}">
					<script type="text/javascript" src="${pageContext.request.contextPath}/common/notifications/NotificationsWebSocket.js"></script> 
					<script type="text/javascript">
						$(document).ready(function() {notificationWebSocket.subscribeUser();});
					</script>
				</ps:if>
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
		<body style="margin: 0;" >
	</ps:else>		
			<div class="ui-layout-north"  style="width=100%;padding:0px;overflow:hidden"><jsp:include page="AppMainHeader.jsp"></jsp:include></div>
			
			
			<div class="ui-layout-<%=eastWest%>" style="padding:0px;">
				    <div class="ui-state-default menu-title">
				         <span><ps:text name='menu_options_key' /></span>
						<ps:if test="%{isRTL == 'rtl'}">
							<div id="tbarCloseWest" style="float: left;position: relative; width:7%" class="ui-icon ui-icon-pin-s ui-corner-all"></div>
						</ps:if>
						<ps:else>
							<div id="tbarCloseWest" style="float: right;position: relative; width:7%" class="ui-icon ui-icon-pin-s ui-corner-all"></div>
						</ps:else>
					</div>
					<menu:accordion actionName="generateMenuOnRequest" collapseprev="false" targetName="content-container" id ="appMenu" appName="${appName}"></menu:accordion>				
				</div>
				
				<div id="content-container" class="ui-layout-center" style="padding:0 10px 0 10px;overflow:hidden;"><decorator:body/> </div> <%
     /*Removing scroll of the container which will be given for each form*/
 %>	
				<div class="ui-layout-south" style="width=100%;padding:0px;overflow:hidden" ><jsp:include page="AppMainFooter.jsp"></jsp:include></div>			
				<div id="global-overlay-container" class="ui-widget-overlay" style="display:none;z-index:100"></div><%
							    /*Global Overlay Container to Disable whole Screen*/
							%>
				<jsp:include page="../pages/appcomponents/common/AppCommonTrans.jsp"></jsp:include><%
				    /*Path Solutions [Libin] added a jsp holding trans message script global variables*/
				%>
		</body>
		
</html>