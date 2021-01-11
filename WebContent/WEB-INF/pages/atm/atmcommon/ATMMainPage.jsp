<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>

<meta name="decorator" content="main"/>	

<head>
<title><ps:text name="app_main_title_atmp_key"/></title>
</head>


<script type="text/javascript"  src="${pageContext.request.contextPath}/common/js/tabs/TabbedPanel.js"></script>

<script type="text/javascript">
	var RTL_DIRECTION = "${isRTL}";

	$(document).ready(function() {
	    intializeMainTabs("mainTabs",{url:jQuery.contextPath+"/path/loadScreen?",reloadAlert:"<ps:text name='reload_contents_key'/>",closeAlert:"<ps:text name='close'/>"});
	});
</script>
<body >

<%/*Added padding top and buttom to overwrite Tabs Padding (.ui-tabs)*/%>
<div id="mainTabs" class="pathMinWidth" style="visibility: hidden;padding-bottom: 0px; padding-top: 0px;height: 100%; width:100%">
		<ul></ul>
</div>


<ps:hidden type="hidden" id="expressionLastCursorPos" name="expressionLastCursorPos"/>
</body>
