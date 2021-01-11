<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>
<html>
<head>
</head>
<body>
	<ps:url id="urlDynScrTblGeneListGrid" escapeAmp="false" action="dynScrTablesListAction_loadGeneratedTblGrid" namespace="/path/screenGenerator">
	   <ps:param name="iv_crud"  value="ivcrud_${_pageRef}"></ps:param>
	   <ps:param name="_pageRef" value="_pageRef"></ps:param>
	</ps:url>
	<psjg:grid
		id               ="dynScrTblGeneListGridTbl_Id"
	    href             ="%{urlDynScrTblGeneListGrid}"
		addfunc			 ="defineScrTables_addNewDynTable"  
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
	    ondblclick       ="dynScrTblGeneList_onDbClickedEvent()"
	    shrinkToFit      ="true" height="125">
	   <psjg:gridColumn id="TABLE_ID"         colType="number" name="TABLE_ID"        index="TABLE_ID"        title="" hidden="true"/>
 	   <psjg:gridColumn id="TABLE_TECH_NAME"  colType="text"   name="TABLE_TECH_NAME" index="TABLE_TECH_NAME" autoSearch="true" title="%{getText('table_tech_name_key')}" editable="false" sortable="true" search="true"/>
 	   <psjg:gridColumn id="TABLE_DESC"       colType="text"   name="TABLE_DESC"      index="TABLE_DESC"      autoSearch="true" title="%{getText('tabledesc_key')}"       editable="false" sortable="true" search="true"/>
	</psjg:grid>
	<div id="dynScrTblGeneMainInfoDiv_id" class="collapsibleContainer" title="<ps:text name='Main_Information_key'/>" style="width:100%;">
	      <%@include file="DynScrTablesGenerator.jsp"%>
	</div>
</body>
</html>
<script  type="text/javascript">

</script>