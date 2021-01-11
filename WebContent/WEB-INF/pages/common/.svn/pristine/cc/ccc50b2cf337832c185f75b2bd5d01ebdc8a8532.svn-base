<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>

<ps:hidden type="hidden" id="cannotaddmorerows_key_id" value="%{getText('cannotaddmorerows_key')}"/>
<ps:hidden type="hidden" id="firstrowis_key_id" value="%{getText('firstrowis_key')}"/>

<ps:url id="elementActivityGridUrl" action="CustomElementActivity_loadElementActivityList" namespace="/path/customization" escapeAmp="false">
	<ps:param name="sysParamElemActivitiesVO.FLD_IDENTIFIER" value="custCO.screenDispVO.FLD_IDENTIFIER"/>
	<ps:param name="sysParamElemActivitiesVO.APP_NAME" value="custCO.appName"/>
 	<ps:param name="sysParamElemActivitiesVO.PROG_REF" value="custCO.screenDispVO.PROG_REF"/>
 	<ps:param name="_pageRef" value="%{_pageRef}"/>
 	<ps:param name="sysParamElemActivitiesVO.OBJ_DISPLAY_ID" value="%{objectDisplayID}"/>
 	<ps:param name="fromObjDisplay" value="%{fromObjDisplay}"/>
</ps:url>
  	 
<psjg:grid id="ElementActivityGrid_Id_${_pageRef}"
	dataType="json" 
	href="%{elementActivityGridUrl}"
	caption="%{getText('custom_activity_key')}" 
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
	ondblclick="customElem_LoadDynScrnParamMapGrid()"
	addfunc="customElem_addMapGrid"
	delfunc="customElem_deleteMapGrid"
	onEditInlineBeforeTopics="customElem_onRowSelTopic"
	editurl="dummy"
	shrinkToFit="false">
	
	<psjg:gridColumn id="customElem_ACTIVITY_ENABLE_YN_${_pageRef}" 
		name="sysParamElemActivitiesVO.ACTIVITY_ENABLE_YN" index="ACTIVITY_ENABLE_YN"
		title="%{getText('enable_key')}" 
		colType="checkbox" 
		edittype="checkbox"
		formatter="checkbox"
		editable="true"
		sortable="true" 
		search="true" 
		width="50" 
		resizable="true"
		editoptions="{checked:'1', value:'1:0',align:'middle', dataEvents: [{ type: 'change', fn: function(e) { customElem_traceChange(event)}}]}"
		align="center"
		searchoptions="{sopt:['eq']}"
		formatoptions="{disabled:false}"
	/>

	<psjg:gridColumn id="customElem_activityTypeDesc_${_pageRef}" 
		name="activityDescription" index="activityDescription"
		title="%{getText('activity_type_key')}" editable="true" loadOnce="false"
		sortable="true" edittype="select" colType="select" 
		editoptions="{value:function() {  return fieldCustomization_customLoadCombo('${pageContext.request.contextPath}/path/customization/CustomElementActivity_loadActivityTypeSelect','activityTypeCmbList', 'code', 'descValue');}
		,dataEvents: [{ type: 'change', fn: function() { customElem_CheckActivityIdVisibility() } }]}"
		search="true" required="true" />
		
	<psjg:gridColumn id="customElem_activityType_${_pageRef}"
	name="sysParamElemActivitiesVO.ACTIVITY_TYPE" title="%{getText('Description_key')}"
	colType="text" editable="false" hidden="true" index="ACTIVITY_TYPE"/>
		 
	<psjg:gridColumn id="customElem_activityId_${_pageRef}" colType="liveSearch"
			name="sysParamElemActivitiesVO.ACTIVITY_ID" index="ACTIVITY_ID"
			title="%{getText('activity_id_key')}" editable="true" sortable="true"
			search="true" reConstruct="true" 
			paramList="criteria.actionType:sysParamElemActivitiesVO.ACTIVITY_TYPE,criteria.currAppName:sysParamElemActivitiesVO.APP_NAME,criteria.progRef:customizationMaintForm_${_pageRef}_custCO_cutomizationPROG_REF"
			dataAction="${pageContext.request.contextPath}/path/buttoncustomization/ButtonCustomizationLookupAction_constructButtonActivityLookup"
			resultList="sysParamBtnCustVO.BTN_ID:sysParamElemActivitiesVO.ACTIVITY_ID_lookuptxt,sysParamBtnCustVO.DESCRIPTION:sysParamElemActivitiesVO.DESCRIPTION"
			dependencySrc="${pageContext.request.contextPath}/path/buttoncustomization/ButtonCustomizationMaint_dependencyByButtonActivityId"
			params="customActionParamCO.operationId:sysParamElemActivitiesVO.ACTIVITY_ID_lookuptxt,customActionParamCO.operationType:sysParamElemActivitiesVO.ACTIVITY_TYPE,customActionParamCO.appName:sysParamElemActivitiesVO.APP_NAME,customActionParamCO.progRef:customizationMaintForm_${_pageRef}_custCO_cutomizationPROG_REF"
	 		dependency="buttonCustomizationCO.customActionParamCO.operationId:sysParamElemActivitiesVO.ACTIVITY_ID_lookuptxt,buttonCustomizationCO.operationDesc:sysParamElemActivitiesVO.DESCRIPTION"
			afterDepEvent="customElem_afterActivityIdChange"
	 />
	 
	<psjg:gridColumn id="customElem_activityIdDesc_${_pageRef}"
		name="sysParamElemActivitiesVO.DESCRIPTION" title="%{getText('Description_key')}" index="DESCRIPTION"
		 colType="text" editable="false" />
		 
	<psjg:gridColumn id="customElem_PROCEED_ON_FAIL_${_pageRef}" 
		name="sysParamElemActivitiesVO.PROCEED_ON_FAIL" index="PROCEED_ON_FAIL"
		title="%{getText('proceed_on_fail_key')}" 
		colType="checkbox" 
		edittype="checkbox"
		formatter="checkbox"
		editable="true"
		sortable="true" 
		search="true" 
		width="50" 
		resizable="true"
		editoptions="{value:'1:0',align:'middle', dataEvents: [{ type: 'change', fn: function(e) { customElem_traceChange(event)}}]}"
		align="center"
		searchoptions="{sopt:['eq']}"
		formatoptions="{disabled:false}"
	/>
	
	<psjg:gridColumn id="customElem_PROCEED_ON_EXPRESSION_${_pageRef}" name="sysParamElemActivitiesVO.PROCEED_ON_EXPRESSION" title="%{getText('proceed_on_expression_key')}" 
		index="PROCEED_ON_EXPRESSION" colType="text" resizable="true" sortable="false" 
		search="false"  edittype="textarea" width ="300" editoptions="{rows:'3',maxlength:'1000'}" editable="true"/>
		
	<psjg:gridColumn id="customElem_SCREEN_WIDTH_${_pageRef}" name="sysParamElemActivitiesVO.SCREEN_WIDTH" title="%{getText('screen_width_key')}" 
		index="SCREEN_WIDTH" colType="number" editable="true"   editoptions="{ maxlength:'4'}"/>
		
	<psjg:gridColumn id="customElem_SCREEN_HEIGHT_${_pageRef}" name="sysParamElemActivitiesVO.SCREEN_HEIGHT" title="%{getText('screen_height_key')}" 
		index="SCREEN_HEIGHT" colType="number" editable="true" editoptions="{ maxlength:'4'}"/>
		
	<psjg:gridColumn id="customElem_SCREEN_TITLE_${_pageRef}" name="sysParamElemActivitiesVO.SCREEN_TITLE" title="%{getText('screen_title_key')}" 
		index="SCREEN_TITLE" colType="text" editable="true" />
		
	<psjg:gridColumn id="customElem_expressionTags_${_pageRef}" name="autoCompleteTags" title="" colType="text" hidden="true" index="autoCompleteTags"/>
	
	<psjg:gridColumn id="customElem_pageRef_${_pageRef}" name="pageRef" title="" colType="text" hidden="true" index="pageRef"/>

	<psjg:gridColumn id="customElem_sequenceId_${_pageRef}" name="sysParamElemActivitiesVO.SEQUENCE_ID" title=""
		index="SEQUENCE_ID" colType="number" hidden="true"/>
	
	<psjg:gridColumn id="customElem_FLD_IDENTIFIER_${_pageRef}" name="sysParamElemActivitiesVO.FLD_IDENTIFIER" title="" 
		index="FLD_IDENTIFIER" colType="number" hidden="true"/>

	<psjg:gridColumn id="customElem_APP_NAME_${_pageRef}" name="sysParamElemActivitiesVO.APP_NAME" title="" 
		index="APP_NAME" colType="text" hidden="true"/>

	<psjg:gridColumn id="customElem_PROG_REF_${_pageRef}" name="sysParamElemActivitiesVO.PROG_REF" title="" 
		index="PROG_REF" colType="text" hidden="true"/>
		
	
</psjg:grid>

<script type="text/javascript">
	$.subscribe("customElem_onRowSelTopic",function(rowObj){customElem_onRowSelTopic(rowObj);});
</script>