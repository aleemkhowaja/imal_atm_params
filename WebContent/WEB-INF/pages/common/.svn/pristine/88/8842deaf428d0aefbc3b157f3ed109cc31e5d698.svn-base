<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>

<ps:url id="objectCustDetailsGridUrl" action="objectCustomizationDetailsListAction_loadCustDetailsList" namespace="/path/objectCustomization" escapeAmp="false">
	<ps:param name="sysParamObjDetailsDispVO.OBJ_DISPLAY_ID" value="%{custCO.sysParamObjDisplayVO.OBJ_DISPLAY_ID}"/>
</ps:url>
<ps:hidden type="hidden" id="bus_related_delete_key" value="%{getText('bus_related_delete_key')}"/>
<psjg:grid id="ObjectCustDetailsGrid_Id_${_pageRef}"
	dataType="json" 
	href="%{objectCustDetailsGridUrl}"
	caption="%{getText('column_customization_key')}" 
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
	editurl="dummy"
	addfunc="objCust_addMapGrid"
	onGridCompleteTopics="objCust_setColumnNamesCombo"
	onEditInlineBeforeTopics="ObjectCustDetailsGrid_onRowSelTopic"
	delfunc="objCust_deleteMapGrid"
	shrinkToFit="false">
	
	<psjg:gridColumn id="objectCust_objDisplayId_${_pageRef}"
		name="sysParamObjDetailsDispVO.OBJ_DISPLAY_ID" title="" index=""
		 colType="number" sortable="false" hidden="true" />

	<psjg:gridColumn id="objectCust_columnNameDesc_${_pageRef}" 
		name="columnNameComboDesc" index="columnNameComboDesc"
		title="%{getText('col_name_key')}" editable="true" loadOnce="false"
		sortable="false" edittype="select" colType="select" 
		editoptions="{value:function() {  return objCust_loadColumnNamesCombo()}
		,dataEvents: [{ type: 'change', fn: function() {objCust_comboChanged() } }]}"
		search="false" required="true" />
		
	<psjg:gridColumn id="objectCust_columnName_${_pageRef}"
		name="sysParamObjDetailsDispVO.OBJ_DET_NAME" title="" index=""
		 colType="text" sortable="false" hidden="true" />
		 	
	<psjg:gridColumn id="objectCust_isReadOnlyDesc_${_pageRef}" 
		name="readOnlyComboDesc" index="readOnlyComboDesc"
		title="%{getText('read_only_key')}" editable="true" loadOnce="true"
		sortable="false" edittype="select" colType="select" 
		editoptions="{value:function() {  return loadCombo('${pageContext.request.contextPath}/path/objectCustomization/objectCustomizationDetailsListAction_fillComboBox','readonlyCmbList', 'code', 'descValue');}
		,dataEvents: [{ type: 'change', fn: function() { objCust_comboChanged()} }]}"
		search="false" />
	
	<psjg:gridColumn id="objectCust_readonly_${_pageRef}"
		name="sysParamObjDetailsDispVO.IS_READONLY" title="" index=""
		 colType="number" sortable="false" hidden="true" />
		 		
	<psjg:gridColumn id="objectCust_readonlyExpr_${_pageRef}"
		name="sysParamObjDetailsDispVO.READONLY_EXPR" title="%{getText('readonly_expr_key')}" index="READONLY_EXPR"
		 colType="text" sortable="false" 
		search="false"  edittype="textarea" width ="300" editoptions="{rows:'3',maxlength:'1000'}" editable="true" />
		 
	<psjg:gridColumn id="objectCust_isVisibleDesc_${_pageRef}" 
		name="visibilityComboDesc" index="visibilityComboDesc"
		title="%{getText('visible_key')}" editable="true" loadOnce="true"
		sortable="false" edittype="select" colType="select" 
		editoptions="{value:function() {  return loadCombo('${pageContext.request.contextPath}/path/objectCustomization/objectCustomizationDetailsListAction_fillComboBox','visibilityCmbList', 'code', 'descValue');}
		,dataEvents: [{ type: 'change', fn: function() { objCust_comboChanged() } }]}"
		search="false"/>	
		
	<psjg:gridColumn id="objectCust_isVisible_${_pageRef}"
		name="sysParamObjDetailsDispVO.IS_VISIBLE" title="" index=""
		 colType="number" sortable="false" hidden="true" />
		 	
	<psjg:gridColumn id="objectCust_isVisibleExpr_${_pageRef}"
		name="sysParamObjDetailsDispVO.VISIBILITY_EXPR" title="%{getText('visibility_expr_key')}" index="VISIBILITY_EXPR"
		 colType="text" sortable="false" 
		search="false"  edittype="textarea" width ="300" editoptions="{rows:'3',maxlength:'1000'}" editable="true" />
		 
	<psjg:gridColumn id="objectCust_mandatoryDesc_${_pageRef}" 
		name="mandatoryComboDesc" index="mandatoryComboDesc"
		title="%{getText('mandatory_key')}" editable="true" loadOnce="true"
		sortable="false" edittype="select" colType="select" 
		editoptions="{value:function() {  return loadCombo('${pageContext.request.contextPath}/path/objectCustomization/objectCustomizationDetailsListAction_fillComboBox','requiredCmbList', 'code', 'descValue');}
		,dataEvents: [{ type: 'change', fn: function() { objCust_comboChanged() } }]}"
		search="false"/>	
		
	<psjg:gridColumn id="objectCust_mandatory_${_pageRef}"
		name="sysParamObjDetailsDispVO.IS_MANDATORY" title="" index=""
		 colType="number" sortable="false" hidden="true" />
		 
	<psjg:gridColumn id="objectCust_mandatoryExpr_${_pageRef}"
		name="sysParamObjDetailsDispVO.MANDATORY_EXPR" title="%{getText('mandatory_expr_key')}" index="MANDATORY_EXPR"
		 colType="text" sortable="false" 
		search="false"  edittype="textarea" width ="300" editoptions="{rows:'3',maxlength:'1000'}" editable="true" />	 	
		 
	 <psjg:gridColumn id="objectCust_labelKey_${_pageRef}" colType="liveSearch"
		name="sysParamObjDetailsDispVO.LABEL_KEY" index="LABEL_KEY"
		title="%{getText('label_key')}" editable="true" sortable="true"
		search="true" reConstruct="true" 
		paramList=""
		dataAction="${pageContext.request.contextPath}/pathdesktop/TranslationLookup_labelKeyLookup"
		resultList="sysParamKeyLabelVO.KEY_LABEL_CODE:sysParamObjDetailsDispVO.LABEL_KEY_lookuptxt"
		searchElement="KEY_LABEL_CODE"
		dependencySrc="${pageContext.request.contextPath}/pathdesktop/TranslationDependencyAction_labelKeyDep"
	 	params="translationSC.labelKey:sysParamObjDetailsDispVO.LABEL_KEY_lookuptxt"
	 	dependency="translationCO.sysParamKeyLabelVO.KEY_LABEL_CODE:sysParamObjDetailsDispVO.LABEL_KEY_lookuptxt"
 />
	
	<psjg:gridColumn id="objectCust_minLength_${_pageRef}"
		name="sysParamObjDetailsDispVO.MIN_LENGTH" title="%{getText('min_length_lbl_key')}" index="MIN_LENGTH"
		 colType="number" editable="true" />
	
	<psjg:gridColumn id="objectCust_maxLength_${_pageRef}"
		name="sysParamObjDetailsDispVO.MAX_LENGTH" title="%{getText('max_length_lbl_key')}" index="MAX_LENGTH"
		 colType="number" editable="true" />
	
	<psjg:gridColumn id="objectCust_busRelated_${_pageRef}"
		name="sysParamObjDetailsDispVO.BUS_RELATED" title="%{getText('bus_related_key')}" index="BUS_RELATED"
		 colType="number" editable="false" />

	<psjg:gridColumn id="objectCust_labelKeyExp_${_pageRef}" name="sysParamObjDetailsDispVO.LABEL_KEY_EXPR" title="%{getText('label_Expr_key')}" 
		index="LABEL_KEY_EXPR" colType="text" resizable="true" sortable="false" 
		search="false"  edittype="textarea" width ="300" editoptions="{rows:'3',maxlength:'1000'}" editable="true"/>
		
	<psjg:gridColumn id="objectCust_enableFieldAuditYn_${_pageRef}" 
		name="sysParamObjDetailsDispVO.ENABLE_FIELD_AUDIT_YN" index="ENABLE_FIELD_AUDIT_YN"
		title="%{getText('enable_field_audit_key')}" 
		colType="checkbox" 
		edittype="checkbox"
		formatter="checkbox"
		editable="true"
		sortable="true" 
		search="true" 
		width="50" 
		resizable="true"
		editoptions="{value:'1:0',align:'middle'}"
		align="center"
		searchoptions="{sopt:['eq']}"
		formatoptions="{disabled:false}"
	/>	
	<%--/* 
	
	 <psjg:gridColumn id="objectCust_isAdmCustDisYn_${_pageRef}" 
		name="sysParamObjDetailsDispVO.IS_ADM_CUST_DIS_YN" index="IS_ADM_CUST_DIS_YN"
		title="%{getText('isAdmCustDisYn_key')}" 
		colType="checkbox" 
		edittype="checkbox"
		formatter="checkbox"
		editable="true"
		sortable="true" 
		search="true" 
		width="50" 
		resizable="true"
		editoptions="{value:'1:0',align:'middle'}"
		align="center"
		searchoptions="{sopt:['eq']}"
		formatoptions="{disabled:false}"
	/>	 
	
	<psjg:gridColumn id="objectCust_defaultValue_${_pageRef}"
		name="sysParamObjDetailsDispVO.DEFAULT_VALUE"  title="%{getText('defaultvalue_key')}" index="DEFAULT_VALUE"
		 colType="text" editable="true" />
		 
	 <psjg:gridColumn id="objectCust_dfltValExprPriorityYn_${_pageRef}" 
		name="sysParamObjDetailsDispVO.DFLT_VAL_EXPR_PRIORITY_YN" index="DFLT_VAL_EXPR_PRIORITY_YN"
		title="%{getText('dfltValExprPriorityYn_key')}" 
		colType="checkbox" 
		edittype="checkbox"
		formatter="checkbox"
		editable="true"
		sortable="true" 
		search="true" 
		width="50" 
		resizable="true"
		editoptions="{value:'1:0',align:'middle'}"
		align="center"
		searchoptions="{sopt:['eq']}"
		formatoptions="{disabled:false}"
	/>
	<psjg:gridColumn id="objectCust_valueValidExpr_${_pageRef}" name="sysParamObjDetailsDispVO.VALUE_VALID_EXPR" title="%{getText('value_valid_expr_key')}" 
		index="VALUE_VALID_EXPR" colType="text" resizable="true" sortable="false" 
		search="false"  edittype="textarea" width ="300" editoptions="{rows:'3',maxlength:'1000'}" editable="true"/>
	
	<psjg:gridColumn id="objectCust_defaultValueExpr_${_pageRef}" name="sysParamObjDetailsDispVO.DEFAULT_VALUE_EXPR" title="%{getText('default_value_expr_key')}" 
		index="DEFAULT_VALUE_EXPR" colType="text" resizable="true" sortable="false" 
		search="false"  edittype="textarea"  width ="300"  editoptions="{rows:'3',maxlength:'1000'}" editable="true"/>
	/*--%>
	
</psjg:grid>
<script type="text/javascript">
	$.subscribe("ObjectCustDetailsGrid_onRowSelTopic",function(rowObj){objCust_onRowSelTopic(rowObj);});
	$.subscribe("objCust_setColumnNamesCombo",function(){objCust_setColumnNamesCombo();});
</script>