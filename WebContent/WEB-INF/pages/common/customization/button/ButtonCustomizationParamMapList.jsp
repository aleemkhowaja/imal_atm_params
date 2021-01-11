<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>

<script type="text/javascript">
	$.struts2_jquery.require("ButtonCustomization.js" ,null,"${pageContext.request.contextPath}/common/js/customization/button/");
	var currentPageRef = '<ps:property value="_pageRef" escapeHtml="false" escapeJavaScript="true"/>';
</script>
<ps:hidden id="buttonCustParamMapGrid_PROG_REF_${_pageRef}" name="criteria.sysParamGlobalActArgMapVO.PROG_REF"></ps:hidden>
<ps:hidden id="buttonCustParamMapGrid_APP_NAME_${_pageRef}" name="criteria.sysParamGlobalActArgMapVO.APP_NAME"></ps:hidden>
<ps:hidden id="buttonCustParamMapGrid_currentPageRef_${_pageRef}" name="_pageRef"></ps:hidden>
<ps:hidden id="buttonCustParamMapGrid_ELEM_FLD_IDENTIFIER_${_pageRef}" name="criteria.sysParamGlobalActArgMapVO.ELEM_FLD_IDENTIFIER"></ps:hidden>
<ps:hidden id="buttonCustParamMapGrid_BTN_ID_${_pageRef}" name="criteria.sysParamGlobalActArgMapVO.BTN_ID"></ps:hidden>
<ps:hidden id="buttonCustParamMapGrid_LOADED_IN_OBJ_DISPLAY_${_pageRef}" name="criteria.loadedInObjDisplay"></ps:hidden>
<ps:hidden id="buttonCustParamMapGrid_GRID_COLUMNS_${_pageRef}" name="criteria.gridColumns"></ps:hidden>

<ps:url id="buttonCustParamMapGridURL" action="buttonCustomizationParamListAction_loadParamMapGrid" namespace="/path/buttoncustomization" escapeAmp="false">
	<ps:param name="criteria.sysParamGlobalActArgMapVO.ELEM_FLD_IDENTIFIER" value="%{criteria.sysParamGlobalActArgMapVO.ELEM_FLD_IDENTIFIER}"/>
	<ps:param name="criteria.sysParamGlobalActArgMapVO.BTN_ID" value="%{criteria.sysParamGlobalActArgMapVO.BTN_ID}"/>
	<ps:param name="criteria.sysParamGlobalActArgMapVO.PROG_REF" value="%{criteria.sysParamGlobalActArgMapVO.PROG_REF}"/>
	<ps:param name="criteria.sysParamGlobalActArgMapVO.APP_NAME" value="%{criteria.sysParamGlobalActArgMapVO.APP_NAME}"/>
	<ps:param name="criteria.sysParamGlobalActArgMapVO.ELEM_SEQUENCE_ID" value="%{criteria.sysParamGlobalActArgMapVO.ELEM_SEQUENCE_ID}"/>
	<ps:param name="criteria.gridColumns" value="%{criteria.gridColumns}"/>
	<ps:param name="criteria.screenPageRef" value="%{_pageRef}"/>
	<ps:param name="criteria.sysParamGlobalActArgMapVO.DYN_SCREEN_ID" value="%{criteria.sysParamGlobalActArgMapVO.DYN_SCREEN_ID}"/>
	<ps:param name="criteria.sysParamGlobalActArgMapVO.DYN_SCREEN_ELEMENT_ID" value="%{criteria.sysParamGlobalActArgMapVO.DYN_SCREEN_ELEMENT_ID}"/>
</ps:url>

<psjg:grid id="ButtonCustParamMapGrid_Id_${_pageRef}"
	dataType="json"
	href="%{buttonCustParamMapGridURL}" 
	caption="%{getText('parameters_key')}"
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
	addfunc="ButtonCustParamMapGrid_addMapGrid"
	delfunc="ButtonCustParamMapGrid_deleteMapGrid"
	onEditInlineBeforeTopics="ButtonCustParamMapGrid_onRowSelTopic"
	editurl="dummy">
	
	
	<psjg:gridColumn id="sysParamGlobalActArgMap_MAP_ID" name="sysParamGlobalActArgMapVO.MAP_ID" title="%{getText('map_id_key')}" 
		index="MAP_ID" colType="number"/>
	
	<psjg:gridColumn id="sysParamGlobalActArgMap_ELEM_FLD_IDENTIFIER" name="sysParamGlobalActArgMapVO.ELEM_FLD_IDENTIFIER" title="" 
		index="ELEM_FLD_IDENTIFIER" colType="number" hidden="true"/>

	<psjg:gridColumn id="sysParamGlobalActArgMap_APP_NAME" name="sysParamGlobalActArgMapVO.APP_NAME" title="" 
		index="APP_NAME" colType="text" hidden="true"/>

	<psjg:gridColumn id="sysParamGlobalActArgMap_PROG_REF" name="sysParamGlobalActArgMapVO.PROG_REF" title="" 
		index="PROG_REF" colType="text" hidden="true"/>
		
	<psjg:gridColumn id="sysParamGlobalActArgMap_SCREEN_ELEM_PROG_REF" name="sysParamGlobalActArgMapVO.SCREEN_ELEM_PROG_REF" title="" 
		index="SCREEN_ELEM_PROG_REF" colType="text" hidden="true"/>
	
	<psjg:gridColumn id="sysParamGlobalActArgMap_BTN_ID" name="sysParamGlobalActArgMapVO.BTN_ID" title="" 
		index="BTN_ID" colType="number" hidden="true"/>	
		
	<psjg:gridColumn id="sysParamGlobalActArgMap_MAP_DIRECTION_DESC"
					name="mapDirection"
					index="mapDirection"
					title="%{getText('map_type_key')}"
					editable="true"
					sortable="true" edittype="select" colType="select" 
					editoptions="{value:function() {  return loadCombo('${pageContext.request.contextPath}/path/buttoncustomization/buttonCustomizationParamListAction_loadMapDirectionSelect','mapDirectionList', 'code', 'descValue');}
					,dataEvents: [{ type: 'change', fn: function() { buttonCustomizationParamMapGrid_mapDirectionChanged() } }]}"
					search="true" 
					required="true"
	/>
	
	<psjg:gridColumn id="sysParamGlobalActArgMap_MAP_DIRECTION" name="sysParamGlobalActArgMapVO.MAP_DIRECTION" title="" 
	index="MAP_DIRECTION" colType="text" hidden="true" />
	
	<psjg:gridColumn id="sysParamGlobalActArgMap_OP_ID" colType="liveSearch"
			name="sysParamGlobalActArgMapVO.OP_ID" index="OP_ID"
			title="%{getText('Operation_id_key')}" editable="true" sortable="true" required="true"
			search="true" reConstruct="true" 
			paramList="criteria.buttonId:sysParamGlobalActArgMapVO.BTN_ID,criteria.globalParamMap:true" 
			dataAction="${pageContext.request.contextPath}/path/buttoncustomization/ButtonCustomizationLookupAction_constructGlobalActionsLookup"
			resultList="sysParamBtnCustActionsVO.OP_ID:sysParamGlobalActArgMapVO.OP_ID_lookuptxt,sysParamBtnCustActionsVO.DESCRIPTION:opIdDescription,sysParamBtnCustActionsVO.API_CODE:apiCode"
			searchElement="sysParamBtnCustActionsVO.OP_ID"
			afterDepEvent="buttonCustomizationParamMapGrid_afterOP_IDDependency" 
			dependencySrc="${pageContext.request.contextPath}/path/buttoncustomization/ButtonCustomizationMaint_dependencyByGlobalActionCode"
			params="dependancyCriteria.dependentOpId:sysParamGlobalActArgMapVO.OP_ID_lookuptxt,dependancyCriteria.buttonId:sysParamGlobalActArgMapVO.BTN_ID,dependancyCriteria.globalParamMap:true"
			dependency="buttonCustomizationCO.sysParamBtnCustActionsVO.OP_ID:sysParamGlobalActArgMapVO.OP_ID_lookuptxt,buttonCustomizationCO.sysParamBtnCustActionsVO.DESCRIPTION:opIdDescription,buttonCustomizationCO.sysParamBtnCustActionsVO.API_TYPE:apiType,buttonCustomizationCO.sysParamBtnCustActionsVO.API_CODE:apiCode"
	 />
	<psjg:gridColumn id="sysParamGlobalActArgMap_OP_ID_DESCRIPTION" name="opIdDescription" title="%{getText('oper_description_key')}" 
		index="opIdDescription" colType="text" />		
		
	<psjg:gridColumn id="sysParamGlobalActArgMap_ARG_ID" colType="liveSearch"
		name="sysParamGlobalActArgMapVO.ARG_ID" index="ARG_ID"
		title="%{getText('oper_arg_id_key ')}" editable="true" sortable="true"
		search="true" reConstruct="true" 
		paramList="operationId:sysParamGlobalActArgMapVO.OP_ID_lookuptxt,buttonId:sysParamGlobalActArgMapVO.BTN_ID,mapDirection:sysParamGlobalActArgMapVO.MAP_DIRECTION,apiType:apiType" 
		dataAction="${pageContext.request.contextPath}/path/buttoncustomization/ButtonCustomizationLookupAction_constructArgLookup"
		resultList="imApiArgumentVO.ARG_ID:sysParamGlobalActArgMapVO.ARG_ID_lookuptxt,imApiArgumentVO.DESCRIPTION:argDescription"
		searchElement="sysParamBtnCustActionsVO.OP_ID"
		dependencySrc="${pageContext.request.contextPath}/path/buttoncustomization/ButtonCustomizationMaint_dependencyByLinkArg"
		dependency="buttonCustomizationCO.sysParamActionArgMapVO.ARG_ID:sysParamGlobalActArgMapVO.ARG_ID_lookuptxt,
				   buttonCustomizationCO.imApiArgumentVO.DESCRIPTION:argDescription"
		params	="buttonCustomizationCO.sysParamActionArgMapVO.ARG_ID:sysParamGlobalActArgMapVO.ARG_ID_lookuptxt,
				   buttonCustomizationCO.sysParamActionArgMapVO.OP_ID:sysParamGlobalActArgMapVO.OP_ID_lookuptxt,
				   buttonCustomizationCO.mapDirection:sysParamGlobalActArgMapVO.MAP_DIRECTION,
				   buttonCustomizationCO.sysParamBtnCustActionsVO.BTN_ID:sysParamGlobalActArgMapVO.BTN_ID,
				   buttonCustomizationCO.sysParamBtnCustActionsVO.API_TYPE:apiType"
		/>
	
	<psjg:gridColumn id="sysParamGlobalActArgMap_ARG_DESCRIPTION" name="argDescription" title="%{getText('oper_arg_description_key')}" 
		index="argDescription" colType="text" />
		
	<psjg:gridColumn id="apiType" name="apiType" title="" 
		index="apiType" colType="text" hidden="true"/>	
		
	<psjg:gridColumn id="apiCode" name="apiCode" title="" 
		index="apiCode" colType="number" hidden="true"/>	
		
	<psjg:gridColumn id="sysParamGlobalActArgMap_MAP_TYPE" name="sysParamGlobalActArgMapVO.MAP_TYPE" title="" 
		index="mapDescription" colType="text" hidden="true"/>	
		
	<psjg:gridColumn id="sysParamGlobalActArgMap_MAP_TYPE_DESC"
					name="mapTypeDesc"
					index="MAP_TYPE_DESC"
					title="%{getText('mapping_inp_out_key')}"
					editable="true"
					sortable="true" edittype="select" colType="select" 
					editoptions="{value:function() {  return loadCombo('${pageContext.request.contextPath}/path/buttoncustomization/buttonCustomizationParamListAction_loadMapTypeSelect?criteria.loadedInObjDisplay=${criteria.loadedInObjDisplay}','mapTypeList', 'code', 'descValue');}
					,dataEvents: [{ type: 'change', fn: function() { buttonCustomizationParamMapGrid_mapTypeChanged() } }]}"
					search="true" 
	/>
	
	<psjg:gridColumn id="sysParamGlobalActArgMap_MAP_VALUE" name="sysParamGlobalActArgMapVO.MAP_VALUE" title="%{getText('Value_key')}" 
		index="MAP_VALUE" colType="text" editable="true"/>
		
	<psjg:gridColumn id="sysParamGlobalActArgMap_SCREEN_FLD_IDENTIFIER" name="sysParamGlobalActArgMapVO.SCREEN_FLD_IDENTIFIER" title="" 
		index="SCREEN_FLD_IDENTIFIER" colType="number" hidden="true"/>
		
	<psjg:gridColumn id="sysParamGlobalActArgMap_SCREEN_FLD_IDENTIFIER_DESC" colType="liveSearch"
				name="screenFldIdDesc" index="screenFldIdDesc"
				title="%{getText('screen_fld_id_key')}" editable="true" sortable="false"
				search="false" reConstruct="true" 
				paramList="criteria.mapType:sysParamGlobalActArgMapVO.MAP_TYPE,criteria.currAppName:buttonCustParamMapGrid_APP_NAME_${_pageRef},criteria.progRef:buttonCustParamMapGrid_currentPageRef_${_pageRef},criteria.gridColumns:buttonCustParamMapGrid_GRID_COLUMNS_${_pageRef}" 
				dataAction="${pageContext.request.contextPath}/path/buttoncustomization/ButtonCustomizationLookupAction_constructScreenElementsOrSessionLookup"
				resultList="FLD_IDENTIFIER:screenFldIdDesc_lookuptxt,FIELD_KEY_LABEL_CODE:mapDescription,FROM_SOURCE:fromSource"
				searchElement="FLD_IDENTIFIER"
				dependencySrc="${pageContext.request.contextPath}/path/buttoncustomization/ButtonCustomizationMaint_dependencyForScreenElementsOrSessionLookup"
				params="buttonCustomizationCO.sysParamActionArgMapVO.MAP_VALUE:screenFldIdDesc_lookuptxt,buttonCustomizationCO.sysParamActionArgMapVO.MAP_TYPE:sysParamGlobalActArgMapVO.MAP_TYPE,buttonCustomizationCO.sysParamBtnCustVO.APP_NAME:buttonCustParamMapGrid_APP_NAME_${_pageRef},buttonCustomizationCO.sysParamBtnCustVO.PROG_REF:buttonCustParamMapGrid_currentPageRef_${_pageRef},buttonCustomizationCO.gridColumns:buttonCustParamMapGrid_GRID_COLUMNS_${_pageRef}"
				dependency="buttonCustomizationCO.sysParamActionArgMapVO.MAP_VALUE:screenFldIdDesc_lookuptxt,buttonCustomizationCO.sysParamBtnCustVO.DESCRIPTION:mapDescription,buttonCustomizationCO.sysParamScreenElementsVO.FROM_SOURCE:fromSource" 
				afterDepEvent="enableDisableSelectionType()"
	/>
				
	<psjg:gridColumn id="sysParamGlobalActArgMap_Description" name="mapDescription" title="%{getText('screen_fld_description_key')}" 
		index="mapDescription" colType="text" editable="false"/>	
		
	<psjg:gridColumn id="sysParamGlobalActArgMap_ARG_ADDITIONAL_ATTR_YN" name="sysParamGlobalActArgMapVO.ARG_ADDITIONAL_ATTR_YN" title="%{getText('arg_additional_attr_key')}" 
		index="sysParamGlobalActArgMapVO.ARG_ADDITIONAL_ATTR_YN" colType="checkbox" formatter="checkbox" edittype="checkbox" editoptions="{value:'1:0'}" align="center" editable="true" sortable="false" search="false"/>
	
	<psjg:gridColumn id="sysParamGlobalActArgMap_SELECTION_TYPE" colType="select" formatter="select"  edittype="select"
				editoptions="{value:function() {  return loadCombo('${pageContext.request.contextPath}/path/buttoncustomization/buttonCustomizationParamListAction_loadSelectionType','selectionTypeList', 'code', 'descValue');}}" 
				name="sysParamGlobalActArgMapVO.SELECTION_TYPE" index="sysParamGlobalActArgMapVO.SELECTION_TYPE" title="%{getText('selection_type_key')}" editable="true" sortable="false" search="true"/>
		
	<psjg:gridColumn id="sysParamGlobalActArgMap_DELIMITER"  name="sysParamGlobalActArgMapVO.DELIMITER" title="%{getText('delimiter_key')}" 
		index="DELIMITER" colType="text"  editable="true" editoptions="{maxlength:'15'}"/>
	
	<psjg:gridColumn id="sysParamGlobalActArgMap_DYN_PARAM_TYPE_DESC"
					name="dynParamTypeDesc"
					index="DYN_PARAM_TYPE_DESC"
					width="220"
					title="%{getText('dyn_param_type_key')}"
					editable="true"
					sortable="true" edittype="select" colType="select" 
					editoptions="{value:function() {  return loadCombo('${pageContext.request.contextPath}/path/buttoncustomization/buttonCustomizationParamListAction_loadDynParamTypeSelect','dynParamMapList', 'code', 'descValue');}
					,dataEvents: [{ type: 'change', fn: function() { buttonCustomizationParamMapGrid_dynParamTypeChanged() } }]}"
					search="false" 
	/>
	<psjg:gridColumn id="sysParamGlobalActArgMap_DYN_ELEM_IDENTIFIER" colType="liveSearch"
				name="sysParamGlobalActArgMapVO.DYN_ELEM_IDENTIFIER" index="DYN_ELEM_IDENTIFIER"
				title="%{getText('dyn_elem_id_key')}" editable="true" sortable="true"
				search="true" reConstruct="true" 
				dataAction="${pageContext.request.contextPath}/path/dynamicScreen/dynScreenLookupAction_drawingDynScreenElementsGrid"
				resultList="elementIdValue:sysParamGlobalActArgMapVO.DYN_ELEM_IDENTIFIER_lookuptxt,elementId:dynElemDescription"
				paramList="screenId:apiCode,criteria.dynParamType:sysParamGlobalActArgMapVO.DYN_PARAM_TYPE"
				searchElement="DYN_ELEM_IDENTIFIER"
				dependencySrc="${pageContext.request.contextPath}/path/dynamicScreen/dynDependencyAction_dependencyByScreenElementId"
				params="dynamicScreenCO.screenIdValue:apiCode,dynamicScreenCO.elementIdValue:sysParamGlobalActArgMapVO.DYN_ELEM_IDENTIFIER_lookuptxt"
				dependency="dynamicScreenCO.elementIdValue:sysParamGlobalActArgMapVO.DYN_ELEM_IDENTIFIER,dynamicScreenCO.elementId:dynElemDescription"
	/>
				
	<psjg:gridColumn id="sysParamGlobalActArgMap_DYN_ELEM_DESCRIPTION" name="dynElemDescription" title="%{getText('dyn_elem_description_key')}" 
		index="dynElemDescription" colType="text" />
		
	<psjg:gridColumn id="sysParamGlobalActArgMap_CREATED_BY" name="sysParamGlobalActArgMapVO.CREATED_BY" title="CREATED_BY" 
		index="CREATED_BY" colType="text" hidden="true"/>
	
	<psjg:gridColumn id="sysParamGlobalActArgMap_CREATED_DATE" name="sysParamGlobalActArgMapVO.CREATED_DATE" title="CREATED_DATE" 
		index="CREATED_DATE" colType="date" hidden="true"/>
	
	<psjg:gridColumn id="sysParamGlobalActArgMap_MODIFIED_DATE" name="sysParamGlobalActArgMapVO.MODIFIED_DATE" title="MODIFIED_DATE" 
		index="MODIFIED_DATE" colType="date" hidden="true"/>
	
	<psjg:gridColumn id="sysParamGlobalActArgMap_MODIFIED_BY" name="sysParamGlobalActArgMapVO.MODIFIED_BY" title="MODIFIED_BY" 
		index="MODIFIED_BY" colType="text" hidden="true"/>	
	
	<psjg:gridColumn id="sysParamGlobalActArgMap_DYN_PARAM_TYPE" name="sysParamGlobalActArgMapVO.DYN_PARAM_TYPE" title="" 
		index="DYN_PARAM_TYPE" colType="text" hidden="true"/>	
		
	<psjg:gridColumn id="fromSource" name="fromSource" title="" 
		index="" colType="text" hidden="true"/>	
	
	<psjg:gridColumn id="sysParamGlobalActArgMap_DYN_SCREEN_ID" name="sysParamGlobalActArgMapVO.DYN_SCREEN_ID" title="" 
		index="DYN_SCREEN_ID" colType="number" hidden="true"/>	
		
	<psjg:gridColumn id="sysParamGlobalActArgMap_DYN_SCREEN_ELEMENT_ID" name="sysParamGlobalActArgMapVO.DYN_SCREEN_ELEMENT_ID" title="" 
		index="DYN_SCREEN_ELEMENT_ID" colType="number" hidden="true"/>	
			
</psjg:grid>
<script type="text/javascript">
	$.subscribe("ButtonCustParamMapGrid_onRowSelTopic",function(rowObj){buttonCustParamMapGrid_onRowSelTopic(rowObj);});
</script>