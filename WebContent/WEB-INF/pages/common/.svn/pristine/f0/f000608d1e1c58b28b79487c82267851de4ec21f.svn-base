<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>
<ps:set name="export_key_var" value="%{getEscText('export_key')}"/>
<ps:set name="import_key_var" value="%{getEscText('import_key')}"/>
<html>
<head>
<script type="text/javascript">
var export_key = '<ps:property value="export_key_var" escapeHtml="false" escapeJavaScript="true"/>';
var import_key = '<ps:property value="import_key_var" escapeHtml="false" escapeJavaScript="true"/>';
var Missing_File_Location_key = '<ps:property value="Missing_File_Location_key" escapeHtml="false" escapeJavaScript="true"/>';
</script>
<style type="text/css">
.ui-selectable-helper { position: absolute; z-index: 10000; border:1px dotted black; }
#editor_div .ui-selecting {background: #C8C8C8;}
#editor_div .ui-selected {background: #3390FF; color: white;}
#editor_div .ui-resizable-handle.ui-resizable-se.ui-icon.ui-icon-gripsmall-diagonal-se.ui-selected  {border:0px !important;background:none !important;}
</style>
</head>
<body>
	<ps:url id="urlscreenGeneratorListGrid" escapeAmp="false" action="ScreenGeneratorListAction_loadScreenGeneratorGrid" namespace="/path/screenGenerator">
	   <ps:param name="iv_crud"  value="ivcrud_${_pageRef}"></ps:param>
	   <ps:param name="_pageRef" value="_pageRef"></ps:param>
	</ps:url>
	<psjg:grid
		id               ="screenGeneratorListGridTbl_Id"
	    href             ="%{urlscreenGeneratorListGrid}"
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
	    ondblclick       ="screenGeneratorList_onDbClickedEvent()"
	    addfunc          ="screenGeneratorList_onAddClicked"
	    delfunc          ="screenGeneratorList_onDelClicked"
	    onCompleteTopics ="screenGeneratorList_onGridLoad"
	    shrinkToFit      ="true" height="125">
		<psjg:gridColumn id="DYN_SCREEN_ID"   colType="number" name="DYN_SCREEN_ID"   index="DYN_SCREEN_ID"   title="%{getText('screenId_key')}"   editable="false" sortable="true" search="true"/>
		<psjg:gridColumn id="DYN_SCREEN_DESC" colType="text"   name="DYN_SCREEN_DESC" index="DYN_SCREEN_DESC" title="%{getText('screenDesc_key')}" editable="false" sortable="true" search="true"/>
	</psjg:grid>
	<ps:form useHiddenProps="true" id="screenGeneratorMaintFormId"  namespace="/path/screenGenerator">
	<div id="screenGeneratorMainInfoDiv_id" class="collapsibleContainer" title="<ps:text name='Main_Information_key'/>" style="width:100%;">
	      <%@include file="ScreenGeneratorMaint.jsp"%>
	</div>
	<ps:hidden name="screenData"     id="screenData"></ps:hidden>
	<ps:hidden name="additionalData" id="additionalData"></ps:hidden>
	</ps:form>
	<div id="screenGeneratorListMaintDiv_id" class="path-no-customization" style="width:100%; height: 90%;">
	      <%@include file="GeneratorMaint.jsp"%>
	</div>	   
</body>
</html>

<script  type="text/javascript">
    $.struts2_jquery.require("ScreenGeneratorList.js,ScreenGeneratorMaint.js" ,null,jQuery.contextPath+"/common/js/screengenerator/");
    //$("#gview_screenGeneratorListGridTbl_Id_"+_pageRef+" div.ui-jqgrid-titlebar").hide();
	$("#screenGeneratorListGridTbl_Id").unsubscribe("screenGeneratorList_onGridLoad")
	$("#screenGeneratorListGridTbl_Id").subscribe("screenGeneratorList_onGridLoad",function(response,html){
		screenGeneratorList_addCreateFromIcon();
		screenGeneratorlist_addImportExportBtns();
	});

	$(document).ready(function() {
	   $("div#screenGeneratorMainInfoDiv_id.collapsibleContainer").collapsiblePanel(); 	
	   loadGeneratorData(null);	
	});
	var expression_cust_tags= [ ${autoCompleteTags} ];
	var expression_cust_grid_tags= [ ${autoCompleteGridTags} ];
</script>