<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>


<div id="buttonCustomizationActionsDiv_<ps:property value="_pageRef" escapeHtml="true"/>" style="width:99%;">
	
	<ps:hidden id="buttonCustomizationAction_btnId_${_pageRef}" value="${sysParamBtnCustVO.BTN_ID}"></ps:hidden>
	
	<ps:url id="buttonCustomizationActionsURL" action="ButtonCustomizationGrid_loadButtonCustomActionsGrid" namespace="/path/buttoncustomization" escapeAmp="false">
		<ps:param name="criteria.buttonId" value="%{sysParamBtnCustVO.BTN_ID}"/>
		<ps:param name="_pageRef" value="%{_pageRef}"/>
	</ps:url>
	
	
	<psjg:grid id="buttonCustomizationActionsGrid_Id_${_pageRef}"
		dataType="json"
		href="%{buttonCustomizationActionsURL}" 
		caption='%{!"true".equals(buttonCustomizationCO.globalOperationMode) ? getText("Button_operations_key") : getText("activity_operations_key")}'
		hiddengrid="false"
		pager="true"
		pagerButtons="false"
		altRows="false"
		filter="false"
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
		onEditInlineBeforeTopics="btnCustOperation_onRowSelTopic"
		addfunc="btnCustOperation_addOperationGrid"
		delfunc="btnCustOperation_deleteOperationGrid"
		editinline="true"
		editurl="abc">
	
		<psjg:gridColumn name="sysParamBtnCustActionsVO.OP_ID" title="%{getText('Operation_id_key')}" index="OP_ID" colType="number"
			search="true" editable="false" sortable="true" id="sysParamBtnCustActionsVO_OP_ID" />	
		
		<psjg:gridColumn name="sysParamBtnCustActionsVO.OP_TYPE" title="" index="OP_TYPE" colType="text"
			search="true" editable="true" sortable="true" id="sysParamBtnCustActionsVO_OP_TYPE" hidden="true"/>
			
		<psjg:gridColumn id="sysParamBtnCustActionsVO_OP_TYPE_DESC"
						name="operationDesc"
						index="OP_TYPE_DESC"
						title="%{getText('Operation_type_key')}"
						editable="true"
						sortable="false" edittype="select" colType="select" 
						editoptions="{value:function() {  return loadCombo('${pageContext.request.contextPath}/path/buttoncustomization/ButtonCustomizationMaint_loadOperationTypeSelect','operationTypeList', 'code', 'descValue');}
						,dataEvents: [{ type: 'change', fn: function() {btnCustOperation_operationChanged() } }]}"
						search="true" />	
			
			
		<psjg:gridColumn name="sysParamBtnCustActionsVO.DESCRIPTION" title="%{getText('Description_key')}" index="DESCRIPTION" colType="text"
			search="true" editable="true" sortable="true" id="sysParamBtnCustActionsVO_DESCRIPTION" />	
		
		<psjg:gridColumn name="readonlyParentOp" title="" index="readonlyParentOp" colType="text"
			search="true" editable="true" sortable="true" id="sysParamBtnCustActionsVO_readonlyParentOp" hidden="true"/>
			
		<psjg:gridColumn id="sysParamBtnCustActionsVO_PARENT_OP_ID" colType="liveSearch"
						name="sysParamBtnCustActionsVO.PARENT_OP_ID" index="PARENT_OP_ID"
						title="%{getText('Parent_operation_id_key')}" editable="true" sortable="true"
						search="true" mode="number"
						paramList="buttonId:sysParamBtnCustVO_BTN_ID_${_pageRef},dependentOpId:sysParamBtnCustActionsVO.OP_ID" 
						dataAction="${pageContext.request.contextPath}/path/buttoncustomization/ButtonCustomizationLookupAction_constructOperationsLookup"
						resultList="sysParamBtnCustActionsVO.OP_ID:sysParamBtnCustActionsVO.PARENT_OP_ID_lookuptxt"
						searchElement="PARENT_OP_ID"
						
						dependencySrc="${pageContext.request.contextPath}/path/buttoncustomization/ButtonCustomizationMaint_dependencyByOperationId"
						params="sysParamActionCondMapVO.RESULT_OP_ID:sysParamBtnCustActionsVO.PARENT_OP_ID_lookuptxt,sysParamBtnCustActionsVO.OP_ID:sysParamBtnCustActionsVO.OP_ID,sysParamBtnCustActionsVO.BTN_ID:sysParamBtnCustVO_BTN_ID_${_pageRef},imImalApiVO.SERVICE_TYPE:imImalApiVO.SERVICE_TYPE"
						dependency="buttonCustomizationCO.sysParamActionCondMapVO.RESULT_OP_ID:sysParamBtnCustActionsVO.PARENT_OP_ID_lookuptxt,buttonCustomizationCO.sysParamBtnCustActionsVO.DESCRIPTION:parentOperationDesc" 
						
						/>	
						
		<psjg:gridColumn name="parentOperationDesc" title="%{getText('Parent_operation_desc_key')}" index="parentOperationDesc" colType="text"
			search="true" editable="false" sortable="true" id="sysParamBtnCustActionsVO_parentOperationDesc" />				
					
		<psjg:gridColumn id="sysParamBtnCustActionsVO_COND_EXPR" width="550" colType="text"
						name="sysParamBtnCustActionsVO.COND_EXPR" edittype="textarea" editoptions="{rows:'3',maxlength:'1000'}"
						index="COND_EXPR" title="%{getText('Condition_expression_key')}"
						editable="true" sortable="false" search="false" />	
		
		<psjg:gridColumn name="imImalApiVO.SERVICE_TYPE" title="" index="SERVICE_TYPE" colType="text"
			search="true" editable="true" sortable="true" id="imImalApiVO_SERVICE_TYPE" hidden="true"/>
		
		<psjg:gridColumn name="serviceTypeDesc" title="%{getText('Action_type_key')}" index="SERVICE_TYPE" 
			search="true" editable="true" sortable="false" id="imImalApiVO_SERVICE_TYPE" 
			width="170"
			edittype="select" colType="select" 
			editoptions="{value:function() {  return loadCombo('${pageContext.request.contextPath}/path/buttoncustomization/ButtonCustomizationMaint_loadActionTypeSelect','actionTypeList', 'code', 'descValue');}
						,dataEvents: [{ type: 'change', fn: function() {btnCustOperation_actionTypeChanged()} }]}"
			/>	
		
		<psjg:gridColumn id="sysParamBtnCustActionsVO_API_CODE" colType="liveSearch"
						name="apiCodeValue" index="API_CODE"
						title="%{getText('Action_id_key')}" editable="true" sortable="true"
						search="true" reConstruct="true"
						paramList="buttonId:sysParamBtnCustVO_BTN_ID_${_pageRef},actionType:imImalApiVO.SERVICE_TYPE,currAppName:buttonCustomization_appName_${_pageRef}" 
						dataAction="${pageContext.request.contextPath}/path/buttoncustomization/ButtonCustomizationLookupAction_constructActionsLookup"
						resultList="REPORT_PROG_REF:apiCodeValue_lookuptxt,sysDynScreenDefVO.DYN_SCREEN_ID:apiCodeValue_lookuptxt"
						searchElement="API_CODE"
						editoptions="{ maxlength:'15' }"
						dependencySrc="${pageContext.request.contextPath}/path/buttoncustomization/ButtonCustomizationMaint_dependencyByActionCode.action"
						params="buttonCustomizationCO.apiCodeValue:apiCodeValue_lookuptxt,buttonCustomizationCO.sysParamBtnCustActionsVO.BTN_ID:sysParamBtnCustVO_BTN_ID_${_pageRef},buttonCustomizationCO.imImalApiVO.SERVICE_TYPE:imImalApiVO.SERVICE_TYPE"
						dependency="buttonCustomizationCO.apiCodeValue:apiCodeValue_lookuptxt" 
						
						/>	
						
		<psjg:gridColumn name="" index="" title="%{getText('details')}" id="sysParamBtnCustActionsVO_mappingDetailsButton" align="center"
					    colType="text" editable="false" sortable="false" search="false" 
					    formatter="btnCustOperation_BtnFormatter" width="80"/>
			
	</psjg:grid>
	
	
</div>


<script type="text/javascript">
	var expression_btn_cond_tags= [ ${buttonCustomizationCO.autoCompleteTags} ];

    $.subscribe("btnCustOperation_onRowSelTopic",function(rowObj){btnCustOperation_onRowSelTopic(rowObj);});
    
    buttonCustomizationActions_applyAutoComplete('sysParamBtnCustVO_RESULT_EXPR_' + currentPageRef, expression_btn_cond_tags);
    
</script>	   

