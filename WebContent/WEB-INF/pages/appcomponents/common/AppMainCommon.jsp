<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>
<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@page import="com.path.vo.common.SessionCO"%>
<%@page import="com.path.bo.common.ConstantsCommon"%>
<%@page import="com.path.bo.common.CommonMethods"%>
<% 
   String appmaincommon_appversion = ConstantsCommon.returnAppNumericVersion(); 	
   String userLanguage = "EN";
   SessionCO sessionCO = (SessionCO) session.getAttribute("sesVO");
   if(sessionCO != null && sessionCO.getLanguage() != null)
   {
	    userLanguage = sessionCO.getLanguage();
   }
   String helpServerURL = ConstantsCommon.HELP_SERVER_URL;
   
   float ieVerNb = 0;
   boolean isIETest = false;
   String ieVerStrTst = CommonMethods.returnIEVersion(request.getHeader("User-Agent"));
   if(ieVerStrTst != null)
   {
       ieVerNb = Float.parseFloat(ieVerStrTst);
	   isIETest = true;
   }
%>  

	<!-- used to take highest available compatibility mode for IE -->
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<link rel="shortcut icon"  href="${pageContext.request.contextPath}/login/images/favicon.ico" type="image/x-icon"/>
	<%/* to specify the class that need not to be printed*/ %>
	<style>
	<!--
	@media print {
		.no-print {
			display: none;
		}
	}
	-->
	</style>
<script type="text/javascript">
		var isAlertEnabled = '<ps:property value="isAlertEnabled" escapeHtml="false" escapeJavaScript="true"/>';
		var menuOptTran = "<ps:text name='menu_options_key' />"
		var loading_content_trans = "<ps:text name='loading_content_key' />";
    	var appName = '<ps:property value="appName" escapeHtml="false" escapeJavaScript="true"/>';
    	<%/* TP 317013 */%>
    	var glbl_showPrintPreviewDialog = '${session.sesVO.showPrintPreview}';
    	var userLangVar = "<%=userLanguage%>"
    	var helpServerURL = "<%=helpServerURL%>"
    	var themeName = '<ps:property value="themeName" escapeHtml="false" escapeJavaScript="true"/>';
    	var disPrntScrn = '${session.sesVO.disablePrntScrn}';

    	var pathGlbDecSep = '<%=ConstantsCommon.PATH_DECIMAL_SEPARATOR%>';
    	var pathGlbGrpSep = '<%=ConstantsCommon.PATH_GROUP_SEPARATOR%>';
    	var currentServer = "<%=CommonMethods.returnServerType()%>";
    	var appNumericVersion = "<%=ConstantsCommon.returnAppNumericVersion()%>";
    	var AR_MNTH_ENG_LBL =  '<ps:property value="isArbMnthEng" escapeHtml="false" escapeJavaScript="true"/>';
    	//698427  check if the reports are to be printed as PDF
		var printReportAsPDF = '<ps:property value="printReportAsPDF" escapeHtml="false" escapeJavaScript="true"/>';
	</script>
	
    <ps:if test="themeName != null">
     <link class="ui-theme" href="<ps:url value='/common/style/themeroller/themes/${themeName}/jquery-ui.css' />" rel="Stylesheet" type="text/css"/>
    </ps:if>
    <ps:else>
     <link class="ui-theme" href="<ps:url value='/common/style/themeroller/themes/cupertino/jquery-ui.css' />" rel="Stylesheet" type="text/css"/>
    </ps:else>
    <%	if(isIETest && ieVerNb <= 8) 
    {%>
	 <script type="text/javascript" src="<ps:url value='/common/js/browser_compatible/IE8_UncompatibleScript.js' />?_=<%=appmaincommon_appversion%>"></script>
	 <link href="<ps:url value='/common/style/IE8_specific.css' />" rel="stylesheet" type="text/css"/>
	<% } 
    %>
	<psj:head locale="${language}" loadAtOnce="true" appversion="<%=ConstantsCommon.returnAppNumericVersion()%>"/> 
    <ps:head decoratorName="welcomemain"/>
    <link href="<ps:url value='/common/style/layout/layout-default-latest.css' />" rel="stylesheet" type="text/css">
    <link href="<ps:url value='/common/style/overlay/colorbox.css' />" rel="stylesheet" type="text/css">
	<ps:if test="%{isRTL == 'rtl'}">
			<link href="<ps:url value='/common/style/layout/layout-default-latest-rtl.css' />" rel="stylesheet" type="text/css">
	</ps:if>
	
	<script type="text/javascript"  src="<ps:url value='/common/jquery/js/plugins/jquery.layout-latest.js' />?_=<%=appmaincommon_appversion%>"></script>
    <script type="text/javascript" src="<ps:url value='/common/js/jQuery-collapsiblePanel.js' />?_=<%=appmaincommon_appversion%>"></script> <%/*Collapsible panels*/%>
    <script type="text/javascript" src="<ps:url value='/common/js/jquery.wizard-tabs-0.1.js' />?_=<%=appmaincommon_appversion%>"></script> <%/*Wizard tabs*/%>
    <script type="text/javascript" src="<ps:url value='/common/js/path-toolbar.js'/>?_=<%=appmaincommon_appversion%>"></script> <%/*Tool Bar*/%>
	
	<link rel="stylesheet" type="text/css" href="<ps:url value='/common/style/pageComponentStyles.css' />" />	<%/*Common component styles*/%>
    <link rel="stylesheet" type="text/css" href="<ps:url value='/common/style/jQuery-collapsiblePanel.css' />" /> <%/*Collapsible panel styles*/%>
	<link rel="stylesheet" type="text/css" href="<ps:url value='/common/style/toolbar/toolbar.css' />" />  <%/*Tool Bar styles*/%>
	<ps:if test="%{isRTL == 'rtl'}">
		<link rel="stylesheet" type="text/css" href="<ps:url value='/common/style/pageComponentStylesRTL.css' />" />	<%/*Common component styles*/%>
		<link rel="stylesheet" type="text/css" href="<ps:url value='/common/style/jQuery-collapsiblePanelRTL.css' />" /> <%/*Collapsible panel styles*/%>
	</ps:if>
	 <%  if(isIETest) 
		 { %>
			 <link href="<ps:url value='/common/style/IE_specific.css' />" rel="stylesheet" type="text/css"/>
	<% } %>
	<link rel="stylesheet" type="text/css" href="<ps:url value='/common/style/validation/validationEngine.jquery.css' />" />
	<link rel="stylesheet" type="text/css" href="<ps:url value='/common/style/msgbox/jquery.msgbox.css' />" />
	<link rel="stylesheet" type="text/css" href="<ps:url value='/login/style/ImalBranding.css' />" />	<%/*coloring management*/%>
	<LINK REL="stylesheet" TYPE="text/css" HREF="${pageContext.request.contextPath}/path/customization/ThemeCustomizationAction_loadCssFromRepository">
	<script>
		if(!window.name || !window.name.indexOf("extScreenFrame") == 0)
		{
			startSessionTimeoutListener('${pageContext.session.maxInactiveInterval}');
		}
	</script>