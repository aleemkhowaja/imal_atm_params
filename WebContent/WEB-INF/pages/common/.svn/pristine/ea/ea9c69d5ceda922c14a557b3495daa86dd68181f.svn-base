<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>

<ps:url id="urlstatusCustomizationListGrid" escapeAmp="false" action="StatusCustomizationListAction_loadStatusCustomizationGrid" namespace="/path/statusCustomization">
   <ps:param name="iv_crud"  value="ivcrud_${_pageRef}"></ps:param>
   <ps:param name="_pageRef" value="_pageRef"></ps:param>
</ps:url>
<ps:url id="statusCustEditUrl" escapeAmp="false" action="">
</ps:url>
<psjg:grid
	id               ="statusCustomizationListGridTbl_Id_${_pageRef}"
	caption          =" "
    href             ="%{urlstatusCustomizationListGrid}"
    dataType         ="json"
	pager            ="true"
	sortable         ="true"
	filter           ="true"
	gridModel        ="gridModel"
	rowNum           ="5"
	rowList          ="5,10,15,20"
	editurl          ="%{statusCustEditUrl}"
	editinline       ="true"
    viewrecords      ="true"
    navigator        ="true"
    navigatorDelete  ="true"
    navigatorEdit    ="false"
    navigatorRefresh ="false"
    navigatorAdd     ="true"
    navigatorSearch  ="true"
    navigatorSearchOptions="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true,sopt:['eq','ne','lt','gt','le','ge']}"
    altRows          ="true"
    ondblclick       ="statusCustList_onDbClickedEvent()"
    addfunc          ="statusCustList_onAddClicked"
    delfunc          ="statusCustList_onDelClicked"
    shrinkToFit      ="true" height="125">
	<psjg:gridColumn id="APP_NAME"     name="APP_NAME"     index="APP_NAME"     colType="text"   title="" hidden="true"/>
	<psjg:gridColumn id="PROG_REF"     name="PROG_REF"     index="PROG_REF"     colType="text"   title="" hidden="true"/>
	<psjg:gridColumn id="LOV_TYPE_ID"  name="LOV_TYPE_ID"  index="LOV_TYPE_ID"  colType="number" title="" hidden="true"/>
    <psjg:gridColumn id="APP_DESC"     name="APP_DESC"     index="APP_DESC"     colType="text" title="%{getText('appName')}"          editable="false" sortable="true"/>
    <psjg:gridColumn id="SECTION_DESC" name="SECTION_DESC" index="SECTION_DESC" colType="text" title="%{getText('section_desc_key')}" editable="false" sortable="true"/>
    <psjg:gridColumn id="STATUS_DESC"  name="STATUS_DESC"  index="STATUS_DESC"  colType="text" title="%{getText('status_desc_key')}"  editable="false" sortable="true"/>
</psjg:grid>
<div id="statusCustomizationListMaintDiv_id_${_pageRef}" style="width:100%;">
   <ps:if test='iv_crud == "R"'>   
      <%@include file="StatusCustomizationMaint.jsp"%>
   </ps:if>     
</div>
<script  type="text/javascript">
    $.struts2_jquery.require("StatusCustomizationList.js,StatusCustomizationMaint.js" ,null,jQuery.contextPath+"/common/js/statuscustomization/");
    $("#gview_statusCustomizationListGridTbl_Id_"+_pageRef+" div.ui-jqgrid-titlebar").hide();
</script>