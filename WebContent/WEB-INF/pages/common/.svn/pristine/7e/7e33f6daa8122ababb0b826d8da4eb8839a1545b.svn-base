<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>
<html>
<head>
</head>
<body>
    <ps:set name="linkDynScrTab_objectCode" value="criteria.objectCode"></ps:set>
    <ps:hidden id="linkDynScrTab_objectCode" name="criteria.objectCode"></ps:hidden> 
	<ps:url id="urlLinkDynScrTabListGrid" escapeAmp="false" action="linkDynScrTabListAction_loadLinkDynScrTabGrid" namespace="/path/dynamicScreen">
	   <ps:param name="objectCode" value="linkDynScrTab_objectCode"></ps:param>
	   <ps:param name="_pageRef"   value="_pageRef"></ps:param>
	</ps:url>
	<psjg:grid
		id               ="linkDynScrTabListGridTbl_Id_${_pageRef}"
	    href             ="%{urlLinkDynScrTabListGrid}"
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
	    ondblclick       ="linkDynScrTab_onDbClickedEvent()"
	    addfunc          ="linkDynScrTab_onAddClicked"
	    delfunc          ="linkDynScrTab_onDelClicked"
	    shrinkToFit      ="true" height="125">
		<psjg:gridColumn id="DYN_SCREEN_ID"   colType="number" name="DYN_SCREEN_ID"   index="DYN_SCREEN_ID"   title="%{getText('screenId_key')}"      editable="false" sortable="true"  search="true"/>
		<psjg:gridColumn id="SCREEN_DESC"     colType="text"   name="SCREEN_DESC"     index="SCREEN_DESC"     title="%{getText('screenDesc_key')}"    editable="false" sortable="true"  search="true"/>
		<psjg:gridColumn id="OBJECT_CODE"     colType="text"   name="OBJECT_CODE"     index="OBJECT_CODE"     title="%{getText('parent_object_key')}" editable="false" sortable="true"  search="true"/>
		<psjg:gridColumn id="OBJECT_TYPE"     colType="text"   name="OBJECT_TYPE"     index="OBJECT_TYPE"     title="%{getText('type_key')}"          editable="false" sortable="true"  search="true"/>
		<psjg:gridColumn id="SUB_OBJECT_DESC" colType="text"   name="SUB_OBJECT_DESC" index="SUB_OBJECT_DESC" title="%{getText('object_key')}"        editable="false" sortable="true"  search="true"/>
		<psjg:gridColumn id="SUB_OBJECT_ID"   colType="number" name="SUB_OBJECT_ID"   index="SUB_OBJECT_ID"   title=""     hidden="true"              editable="false" sortable="false" search="false"/>
	</psjg:grid>
	<div id="linkDynScreenTabMainInfoDiv_id_<ps:property value="_pageRef" escapeHtml="true"/>" class="collapsibleContainer" title="<ps:text name='Main_Information_key'/>" style="width:100%;">
	      <%@include file="LinkDynScrTabMaint.jsp"%>
	</div>
</body>
</html>

<script  type="text/javascript">
    $.struts2_jquery.require("DashboardPortal.js", null, jQuery.contextPath+"/common/dashboard/js/");
    $.struts2_jquery.require("LinkDynScrTab.js", null, jQuery.contextPath+"/common/js/dynamicscreen/");
    $(document).ready(function() {
	   $("div#linkDynScreenTabMainInfoDiv_id.collapsibleContainer").collapsiblePanel(); 	
	});
</script>