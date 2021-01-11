<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>

<jsp:include page="/WEB-INF/pages/common/login/InfoBar.jsp" />

<ps:set name="ivcrud_${_pageRef}"    value="iv_crud"/>
<ps:hidden id="iv_crud_${_pageRef}"  name="iv_crud"/>

<ps:url id="urlInterfaceListGrid" escapeAmp="false" action="ATMInterfaceListAction_loadInterfaceGrid" namespace="/path/atmInterface">
   <ps:param name="iv_crud"  value="ivcrud_${_pageRef}"></ps:param>
   <ps:param name="_pageRef" value="_pageRef"></ps:param>
</ps:url>

<psjg:grid
	id               ="interfaceListGridTbl_Id_${_pageRef}"
	caption          =" "
    href             ="%{urlInterfaceListGrid}"
    dataType         ="json"
    hiddengrid       ='%{iv_crud== "R"}'
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
    navigatorRefresh ="true"
    navigatorAdd     ='%{iv_crud== "R"}'
    navigatorSearch  ="true"
    navigatorSearchOptions="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true,sopt:['eq','ne','lt','gt','le','ge']}"
    altRows          ="true"
    ondblclick       ="interfaceList_onDbClickedEvent()"
    addfunc			="ATMLst_NewClickedConform"
    autowidth		 ="true"
    height			 ="125"
    shrinkToFit      ="true">
    
    <psjg:gridColumn id="iso_INTERFACESVO.INTERFACE_CODE" colType="number" name="iso_INTERFACESVO.INTERFACE_CODE" index="iso_INTERFACESVO.INTERFACE_CODE" align="left" width="3"
    		title="%{getText('Code_key')}" editable="false" sortable="true" search="true" />
    		
    <psjg:gridColumn id="iso_INTERFACESVO.DESCRIPTION" colType="text" name="iso_INTERFACESVO.DESCRIPTION" index="iso_INTERFACESVO.DESCRIPTION" align="left" width="10"
    		title="%{getText('Description_key')}" editable="false" sortable="true" search="true" />
    			
    <psjg:gridColumn id="interfaceTypeDesc" colType="text" name="interfaceTypeDesc" index="interfaceTypeDesc" align="left" width="5"
    		title="%{getText('RA_TYPE')}" editable="false" sortable="true" search="true" />
    		
    <psjg:gridColumn id="statusDesc" colType="text" name="statusDesc" index="statusDesc" align="left" width="5"
    		title="%{getText('Status_Key')}" editable="false" sortable="true" search="true" />
    
    </psjg:grid>

<div id="atmInterfaceMaintDiv_id_${_pageRef}"  class="connectedSortable ui-helper-reset" style="width:100%;">
	<ps:if test='iv_crud == "R"'>
		<%@include file="ATMInterfaceMaint.jsp"%>
	</ps:if>
</div>


<script type="text/javascript">
	$(document).ready(function() 
	{
		$.struts2_jquery.require("ATMInterfaceList.js,ATMInterfaceMaint.js,MessageSettings.js", null, jQuery.contextPath + "/path/js/atm/atminterface/");
		$.struts2_jquery.require("baseConverter.js", null, jQuery.contextPath + "/path/js/atm/atminterface/");
		/**
		Add Import EDxprt buttons in main grid and its functionality
		**/
		atmInterface_addImportFunc();
	});
	$("#gview_interfaceListGridTbl_Id_"+_pageRef+" div.ui-jqgrid-titlebar").hide();
</script>
