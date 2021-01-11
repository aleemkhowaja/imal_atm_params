<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>
<ps:hidden id="ivcrud_${_pageRef}" name="iv_crud" ></ps:hidden>
<jsp:include page="/WEB-INF/pages/common/login/InfoBar.jsp" />

<ps:set name="ivcrud_${_pageRef}"    value="iv_crud"/>
<ps:hidden id="iv_crud_${_pageRef}"  name="iv_crud"/>

<ps:url id="urlterminalListGrid" escapeAmp="false" action="TerminalListAction_loadTerminalGrid" namespace="/path/terminal">
   <ps:param name="iv_crud"  value="ivcrud_${_pageRef}"></ps:param>
   <ps:param name="_pageRef" value="_pageRef"></ps:param>
</ps:url>
<psjg:grid
	id               ="terminalListGridTbl_Id_${_pageRef}"
	caption          =" "
    href             ="%{urlterminalListGrid}"
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
    navigatorRefresh ="false"
    navigatorAdd     ="false"
    navigatorSearch  ="false"
    navigatorSearchOptions="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true,sopt:['eq','ne','lt','gt','le','ge']}"
    altRows          ="true"
    ondblclick       ="terminalList_onDbClickedConform()"
    addfunc          ="terminalList_onNewClickedConform"
    shrinkToFit      ="true"
     height			 ="125" >

	<psjg:gridColumn id="gtw_ATM_TERMINALVO.TERMINAL_ID" colType="text"
		name="gtw_ATM_TERMINALVO.TERMINAL_ID" index="gtw_ATM_TERMINALVO.TERMINAL_ID"
		title="%{getText('terminal_id_key')}" editable="false" sortable="true"
		search="true" width="20" hidden="true" />
		
	<psjg:gridColumn id="gtw_ATM_TERMINALVO.TERMINAL_CODE" colType="text"
		name="gtw_ATM_TERMINALVO.TERMINAL_CODE" index="gtw_ATM_TERMINALVO.TERMINAL_CODE"
		title="%{getText('terminal_id_key')}" editable="false" sortable="true"
		search="true" width="20" />
		
	<psjg:gridColumn id="gtw_ATM_TERMINALVO.DESCRIPTION" colType="text"
		name="gtw_ATM_TERMINALVO.DESCRIPTION" index="gtw_ATM_TERMINALVO.DESCRIPTION"
		title="%{getText('Description_key')}" editable="false" sortable="true"
		search="true" width="40" />
		
	<psjg:gridColumn id="acquirerDescription" colType="text"
		name="acquirerDescription" index="acquirerDescription"
		title="%{getText('acquirer_key')}" editable="false" sortable="true"
		search="true" width="20" />
	
	<psjg:gridColumn id="atmInterfaceDescription" colType="text"
		name="atmInterfaceDescription" index="atmInterfaceDescription"
		title="%{getText('interface_key')}" editable="false" sortable="true"
		search="true" width="40" />


</psjg:grid>
<div id="terminalListMaintDiv_id_${_pageRef}" style="width:100%;">
   <ps:if test='iv_crud == "R"'>   
      <%@include file="TerminalMaint.jsp"%>
   </ps:if>     
</div>
<script  type="text/javascript">

    $.struts2_jquery.require("TerminalList.js" ,null,jQuery.contextPath+"/path/js/atm/terminal/");
    $.struts2_jquery.require("script.js" ,null,jQuery.contextPath+"/path/js/atm/atmcommon/");
    $.struts2_jquery.require("CommonExpressionJs.js" ,null,jQuery.contextPath+"/path/js/commonexpression/");
    $("#gview_terminalListGridTbl_Id_"+_pageRef+" div.ui-jqgrid-titlebar").hide();
    
</script>