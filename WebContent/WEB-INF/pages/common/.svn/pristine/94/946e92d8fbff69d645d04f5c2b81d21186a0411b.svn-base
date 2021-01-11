<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>
	
<ps:url id="urlTreeMenuGrid" escapeAmp="false" action="treeGridMenu" namespace="/path">
   <ps:param name="userId"       value="userId"/>
   <ps:param name="profileId"    value="profileId"/>
   <ps:param name="saveAsParent" value="saveAsParent"/>
   <ps:param name="progRef"      value="progRef"/>
   <ps:param name="appName"      value="appName"/>
</ps:url>
   <psjg:grid
	   	id            ="treeMenuGridTbl_Id"
	 	href          ="%{urlTreeMenuGrid}"
	    dataType      ="json" 
	   	pager         ="false"
	   	sortable      ="false"
		filter        ="false"
		treeGrid      ="true"
		treeGridModel ="adjacency"
	   	gridModel     ="gridModel"
	   	pagerButtons  ="false" 
	   	expandColumn  ="MENU_TITLE_ENG"
	   	shrinkToFit	  ="true"
	    viewrecords   ="true">
	<psjg:gridColumn id="MENU_TITLE_ENG" colType="text"            name="MENU_TITLE_ENG" index="MENU_TITLE_ENG" title="%{getText('MENU_NAME_key')}" editable="false" sortable="true"  search="true"/>
	<psjg:gridColumn id="theKey"         colType="text" key="true" name="theKey"         index="theKey"         title=""              editable="false" sortable="false" search="false" hidden="true"/>
	<psjg:gridColumn id="parentKey"      colType="text"            name="parentKey"      index="parentKey"      title=""              editable="false" sortable="false" search="false" hidden="true"/>
	<psjg:gridColumn id="PROG_REF"       colType="text"            name="PROG_REF"       index="PROG_REF"       title=""              editable="false" sortable="false" search="false" hidden="true"/>
	<psjg:gridColumn id="APP_NAME"       colType="text"            name="APP_NAME"       index="APP_NAME"       title=""              editable="false" sortable="false" search="false" hidden="true"/>
	<psjg:gridColumn id="isLeaf"         colType="text"            name="isLeaf"         index="isLeaf"         title=""              editable="false" sortable="false" search="false" hidden="true"/>
</psjg:grid>