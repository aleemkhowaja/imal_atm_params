<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>

<script type="text/javascript">
	$.struts2_jquery.require("ButtonCustomization.js" ,null,"${pageContext.request.contextPath}/common/js/customization/button/");
	var currentPageRef = '${_pageRef}';
</script>

<ps:url id="buttonCustArgListGridURL" action="buttonCustomizationArgListAction_loadActionArgListGrid" namespace="/path/buttoncustomization" escapeAmp="false">
	<ps:param name="criteria.sysParamActionArgListVO.BTN_ID" value="${sysParamActionArgList.BTN_ID}"/>
	<ps:param name="criteria.sysParamActionArgListVO.OP_ID"  value="${sysParamActionArgList.OP_ID}"/>
	<ps:param name="criteria.sysParamActionArgListVO.ARG_ID" value="${sysParamActionArgList.ARG_ID}"/>
</ps:url>	
				 
<ps:hidden id="buttonCustArgListGrid_btnId_${_pageRef}" value="${sysParamActionArgList.BTN_ID}"></ps:hidden>
<ps:hidden id="buttonCustArgListGrid_opId_${_pageRef}" value="${sysParamActionArgList.OP_ID}"></ps:hidden>
<ps:hidden id="buttonCustArgListGrid_argId_${_pageRef}" value="${sysParamActionArgList.ARG_ID}"></ps:hidden>

<psjg:grid id="ButtonCustArgListGrid_Id_${_pageRef}"
	dataType="json"
	href="%{buttonCustArgListGridURL}" 
	caption="%{getText('list_parameters_key')}"
	hiddengrid="false"
	pager="true"
	pagerButtons="false"
	altRows="false"
	filter="true"
	gridModel="gridModel"
	viewrecords="false"
	navigator="true"
	height="120"
	navigatorRefresh="true"
	navigatorEdit="false"
	navigatorSearch="false"
	navigatorAdd="true"
	navigatorDelete="true"
	sortable="true"
	editinline="true"
	addfunc="buttonCustArgListGrid_addListGrid"
	delfunc="buttonCustArgListGrid_deleteListGrid"
	onEditInlineBeforeTopics="buttonCustArgListGrid_onRowSelTopic"
	editurl="dummy">
	
	<psjg:gridColumn id="sysParamActionArgListVO_BTN_ID" name="sysParamActionArgListVO.BTN_ID" title="" 
		index="BTN_ID" colType="number" hidden="true"/>
		
	<psjg:gridColumn id="sysParamActionArgListVO_LINE_NO" name="sysParamActionArgListVO.LINE_NO" title="" 
		index="LINE_NO" colType="number" hidden="true"/>
		
	<psjg:gridColumn id="sysParamActionArgListVO_OP_ID" name="sysParamActionArgListVO.OP_ID" title="" 
		index="OP_ID" colType="number" hidden="true"/>
		
	<psjg:gridColumn id="sysParamActionArgListVO_ARG_ID" name="sysParamActionArgListVO.ARG_ID" title="" 
		index="ARG_ID" colType="number" hidden="true"/>
	
	<psjg:gridColumn id="sysParamActionArgListVO_LIST_TYPE" name="sysParamActionArgListVO.LIST_TYPE" title="" 
		index="LIST_TYPE" colType="text" hidden="true"/>
	
	<psjg:gridColumn id="sysParamActionArgListVO_LIST_TYPE_DESC_${_pageRef}" 
		name="listTypeDescription" index="listTypeDescription"
		title="%{getText('Type_key')}" editable="true" loadOnce="true"
		sortable="true" edittype="select" colType="select" 
		editoptions="{value:function() {  return loadCombo('${pageContext.request.contextPath}/path/buttoncustomization/buttonCustomizationArgListAction_loadActionTypeCombo','mappingSourceList', 'code', 'descValue');}
		,dataEvents: [{ type: 'change', fn: function() { buttonCustArgListGrid_listTypeChanged() } }]}"
		search="true" required="true" />
			
	<psjg:gridColumn id="sysParamActionArgListVO_LIST_VALUE" name="sysParamActionArgListVO.LIST_VALUE" title="%{getText('Value_key')}"
		index="LIST_VALUE" editable="true" colType="text"  required="true"/>
		
		
</psjg:grid>
<script type="text/javascript">
	$(document).ready(function ()
	{
		_showProgressBar(false);
		$.subscribe("buttonCustArgListGrid_onRowSelTopic",function(rowObj){buttonCustArgListGrid_onRowSelTopic(rowObj);});
	})
</script>