<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>
<html>
<head>
</head>
<body>
	<ps:url id="urlLinkDynScreenListGrid" escapeAmp="false" action="linkDynScreenListAction_loadLinkDynScreenGrid" namespace="/path/dynamicScreen">
	   <ps:param name="iv_crud"  value="ivcrud_${_pageRef}"></ps:param>
	   <ps:param name="_pageRef" value="_pageRef"></ps:param>
	</ps:url>
	<psjg:grid
		id               ="linkDynScreenListGridTbl_Id_${_pageRef}"
	    href             ="%{urlLinkDynScreenListGrid}"
	    dataType         ="json"
		pager            ="true"
		sortable         ="true"
		filter           ="true"
		gridModel        ="gridModel"
		rowNum           ="5"
		rowList          ="5,10,15,20"
	    viewrecords      ="true"
	    navigator        ="true"
	    navigatorDelete  ="false"
	    navigatorEdit    ="false"
	    navigatorRefresh ="false"
	    navigatorAdd     ="true"
	    navigatorSearch  ="true" 
	    navigatorSearchOptions="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true,sopt:['eq','ne','lt','gt','le','ge']}"
	    altRows          ="true"
	    ondblclick       ="linkDynScreen_onDbClickedEvent()"
	    addfunc          ="linkDynScreen_onAddClicked"
	    delfunc          ="linkDynScreen_onDelClicked"
	    shrinkToFit      ="true" height="125">
		<psjg:gridColumn id="DYN_SCREEN_ID"   colType="number" name="DYN_SCREEN_ID"   index="DYN_SCREEN_ID"   title="%{getText('screenId_key')}"   editable="false" sortable="true" search="true"/>
		<psjg:gridColumn id="SCREEN_DESC"     colType="text"   name="SCREEN_DESC"     index="SCREEN_DESC"     title="%{getText('screenDesc_key')}" editable="false" sortable="true" search="true"/>
		<psjg:gridColumn id="PROG_REF"        colType="text"   name="PROG_REF"        index="PROG_REF"        title="%{getText('prog_ref_key')}"   editable="false" sortable="true" search="true"/>
		<psjg:gridColumn id="MENU_TITLE"      colType="text"   name="MENU_TITLE"      index="MENU_TITLE"      title="%{getText('Menu_Title')}"     editable="false" sortable="true" search="true"/>
	</psjg:grid>
	<div id="linkDynScreenMainInfoDiv_id_<ps:property value="_pageRef" escapeHtml="true"/>" class="collapsibleContainer" title="<ps:text name='Main_Information_key'/>" style="width:100%;">
	      <%@include file="LinkDynamicScreenMaint.jsp"%>
	</div>
</body>
</html>

<script  type="text/javascript">
    $.struts2_jquery.require("DashboardPortal.js", null, jQuery.contextPath+"/common/dashboard/js/");
    $.struts2_jquery.require("LinkDynamicScreen.js", null, jQuery.contextPath+"/common/js/dynamicscreen/");
    $(document).ready(function() {
	   $("div#linkDynScreenMainInfoDiv_id.collapsibleContainer").collapsiblePanel(); 	
	});
</script>