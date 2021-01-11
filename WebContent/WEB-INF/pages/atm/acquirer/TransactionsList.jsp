<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>

<script type="text/javascript">
	function Transactions_openDialog(cellvalue, options, rowObject)
	{
		var columnName = options.colModel.name;
		var gridId =  options.gid;
		return '<a href="#" onclick="acquirerMaint_openExpressionDialog(\''+false+'\',\''+gridId+'\',\''+options.rowId+'\',\''+columnName+'\')">'+expression_details_key+'</a>';
	}
</script>

<ps:url id="urlExpressionListGrid" escapeAmp="false" action="AcquirerListAction_returnExpressionListForGrid" 
namespace="/path/acquirer">
   <ps:param name="iv_crud"  value="ivcrud_${_pageRef}"></ps:param>
   <ps:param name="_pageRef" value="_pageRef"></ps:param>
   <ps:param name="criteria.acquirerId" value="acquirerCode_${_pageRef}"></ps:param>
</ps:url>

<psjg:grid id		="acqTransactionsGridTbl_Id_${_pageRef}" 
      	altRows       	="true"
 	  	editinline 		="true"
 	  	editurl			="%{urlExpressionListGrid}"
 	  	href			="%{urlExpressionListGrid}"
      	dataType   		="json"
   	  	pager      		="false"
   	  	sortable   		="true"
	  	filter         	="false"
   	  	gridModel   	="gridModel"
   	  	rowNum    		="10"
   	  	rowList        	="5,10,15,20"
      	viewrecords 	="false"
      	navigator    	="true"
      	navigatorAdd    ="true"
      	navigatorRefresh="flase"
      	navigatorEdit	="false"
      	navigatorDelete	="true"
      	navigatorSearch	="false"
      	navigatorSearchOptions ="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true,sopt:['eq','ne','lt','gt']}"
      	shrinkToFit		="true"
      	pagerButtons	="false"
      	height			="200"
      	autowidth		="false"
      	width			="1087" 
      	addfunc			="acquirerList_addTrxTypeRow('acqTransactionsGridTbl_Id_${_pageRef}');"
      	delfunc			="common_deleteRow('acqTransactionsGridTbl_Id_${_pageRef}');"
      	rownumbers		="true"
      	>
    
    <%--  Columns of Main Grid --%>
    <psjg:gridColumn 
    	id="TRX_TYPE_ID_${_pageRef}"  colType="number" index="TRX_TYPE_ID" 
    	name="TRX_TYPE_ID" title="%{getText('field_id_key')}" 
		editable="false" sortable="true" search="true" width="5" hidden="true"	key="true" />
		
	<psjg:gridColumn 
		colType="liveSearch" 
		id="TRX_TYPE_${_pageRef}"
		name="TRX_TYPE"
		title="%{getText('trx_type_key')}" 
		sortable="false"  
		paramList="criteria.useConnection:true" 
		dataAction="${pageContext.request.contextPath}/pathdesktop/CtsTrxTypeLookup_constructLookup"
		params="ctsTrxTypeVO.CODE:TRX_TYPE_lookuptxt,criteria.useConnection:true,criteria.globalDep:true"
		dependencySrc="${pageContext.request.contextPath}/pathdesktop/CtsTrxTypeDependencyAction_dependencyByTrxTypeCode"
		dependency="ctsTrxTypeVO.CODE:TRX_TYPE_lookuptxt,ctsTrxTypeVO.SHORT_DESC_ENG:SHORT_DESC_ENG1"
		resultList="CODE:TRX_TYPE_lookuptxt"
		width="8"
		autoSearch="true"
        mode="number"
        readOnlyMode="false"
        editable="true"
        editoptions="{ dataEvents: [{ type: 'change', fn: function(e) {}}], maxlength: '4'}"
		/>
		
 	<psjg:gridColumn id="TRX_EXPRESSION_DIALOG_${_pageRef}" name="TRX" index="TRX_EXPRESSION_DIALOG" width="8" colType="text"
    	formatter="Transactions_openDialog" title="%{getText('trx_expression_key')}" sortable="false" search="false" 
    	editable="false" tabindex = "2" align="center" />
    	
    <psjg:gridColumn id="TRX_EXPRESSION_${_pageRef}" colType="text" index="TRX_EXPRESSION" width="5" name="TRX_EXPRESSION" 
					 title="%{getText('trx_expression_key')}" hidden="true" />
			
	<psjg:gridColumn colType="liveSearch" id="CHARGES_TRX_TYPE_${_pageRef}"
		name="CHARGES_TRX_TYPE" index="CHARGES_TRX_TYPE"
		title="%{getText('charges_trx_type_key')}" sortable="false"  editable="true"
		search="true"
		autoSearch="true"
		paramList="criteria.useConnection:true" 
		dataAction="${pageContext.request.contextPath}/pathdesktop/CtsTrxTypeLookup_constructLookup"
		params="ctsTrxTypeVO.CODE:CHARGES_TRX_TYPE_lookuptxt,criteria.useConnection:true,criteria.globalDep:true"
		dependencySrc="${pageContext.request.contextPath}/pathdesktop/CtsTrxTypeDependencyAction_dependencyByTrxTypeCode"
		dependency="ctsTrxTypeVO.CODE:CHARGES_TRX_TYPE_lookuptxt"
		resultList="CODE:CHARGES_TRX_TYPE_lookuptxt"
		reConstruct="true"
		selectColumn="CODE"
		searchElement="CODE"
		width="8"
		tabindex="3"
		editoptions="{ dataEvents: [{ type: 'change', fn: function(e) {}}], maxlength: '4'}"
	/>
	
	
		
	<psjg:gridColumn id="CHARGES_TRX_EXPRESSION_DIALOG_${_pageRef}" name="CHARGES_TRX" index="CHARGES_TRX_EXPRESSION_DIALOG" width="8" colType="text"
    	formatter="Transactions_openDialog" title="%{getText('charges_trx_expression_key')}" sortable="false" search="false" 
    	editable="false" tabindex = "4" align="center" />
    	
    <psjg:gridColumn id="DESCRIPTION_${_pageRef}" colType="textarea" index="DESCRIPTION" width="15" name="DESCRIPTION"
					 title="%{getText('description_key')}" hidden="false" editable="true" editoptions="{ dataEvents: [{ type: 'change', fn: function(e) {}}], maxlength: '255'}"  />	
    	
    <psjg:gridColumn id="CHARGES_TRX_EXPRESSION_${_pageRef}" colType="text" index="CHARGES_TRX_EXPRESSION" width="5" name="CHARGES_TRX_EXPRESSION" 
					 title="%{getText('charges_trx_expression_key')}" hidden="true" />
					 
    
</psjg:grid>

