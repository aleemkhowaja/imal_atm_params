<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>
<jsp:include page="/WEB-INF/pages/common/login/InfoBar.jsp" />

<ps:set name="ivcrud_${_pageRef}"    value="iv_crud"/>
<ps:hidden id="iv_crud_${_pageRef}"  name="iv_crud"/>

<ps:url id="urlacquirerListGrid" escapeAmp="false" action="AcquirerListAction_returnAcquirerListForGrid" namespace="/path/acquirer">
   <ps:param name="iv_crud"  value="ivcrud_${_pageRef}"></ps:param>
   <ps:param name="_pageRef" value="_pageRef"></ps:param>
</ps:url>
<psjg:grid
	id               ="acquirerListGridTbl_Id_${_pageRef}"
	caption          =" "
    href             ="%{urlacquirerListGrid}"
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
    ondblclick       ="acquirerList_onDbClickedConform()"
    addfunc          ="acquirerList_onNewClickedConform"
    shrinkToFit      ="true"
    height			 ="130" >

	<psjg:gridColumn id="gtw_ATM_ACQUIRER.ACQUIRER_ID" colType="number"
		name="gtw_ATM_ACQUIRER.ACQUIRER_ID" index="gtw_ATM_ACQUIRER.ACQUIRER_ID"
		title="%{getText('acquirer_code_key')}" editable="false" sortable="true"
		search="true" width="20" />
		
	<psjg:gridColumn id="gtw_ATM_ACQUIRER.DESCRIPTION" colType="text"
		name="gtw_ATM_ACQUIRER.DESCRIPTION" index="gtw_ATM_ACQUIRER.DESCRIPTION"
		title="%{getText('Description_key')}" editable="false" sortable="true"
		search="true" width="20" />
		
	<psjg:gridColumn id="atmInterfaceDescription" colType="text"
		name="atmInterfaceDescription" index="atmInterfaceDescription"
		title="%{getText('interface_key')}" editable="false" sortable="true"
		search="true" width="20" />
		
	<psjg:gridColumn id="bankATMDescription" colType="text"
		name="bankATMDescription" index="bankATMDescription"
		title="%{getText('bankATM_key')}" editable="false" sortable="true"
		search="true" width="20" />
		
	<psjg:gridColumn id="gtw_ATM_ACQUIRER.TRANSACTION_BRANCH_CODE" colType="text"
		name="gtw_ATM_ACQUIRER.TRANSACTION_BRANCH_CODE" index="gtw_ATM_ACQUIRER.TRANSACTION_BRANCH_CODE"
		title="%{getText('transaction_branch_key')}" editable="false" sortable="true" hidden="true"
		search="true" width="20" />

</psjg:grid>

<div id="acquirerListMaintDiv_id_${_pageRef}" style="width:100%;">
   <ps:if test='iv_crud == "R"'>   
      <%@include file="AcquirerMaint.jsp"%>
   </ps:if>     
</div>
<script  type="text/javascript">

    $("#gview_acquirerListGridTbl_Id_"+_pageRef+" div.ui-jqgrid-titlebar").hide();
    
</script>