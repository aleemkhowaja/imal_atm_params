<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>

<script type="text/javascript">
	$.struts2_jquery.require("ButtonCustomization.js" ,null,"${pageContext.request.contextPath}/common/js/customization/button/");
	var currentPageRef = '<ps:property value="_pageRef" escapeHtml="false" escapeJavaScript="true"/>';
</script>
<ps:hidden id="buttonCustParamMapGrid_PROG_REF_${_pageRef}" name="criteria.PROG_REF"></ps:hidden>
<ps:hidden id="buttonCustParamMapGrid_APP_NAME_${_pageRef}" name="criteria.APP_NAME"></ps:hidden>

<ps:url id="buttonCustParamMapGridURL" action="generatorMaint_loadParamMapGrid" namespace="/path/screenGenerator" escapeAmp="false">
	<ps:param name="criteria.queryData" 	value="%{criteria.queryData}"/>
	<ps:param name="criteria.propertyCode" 	value="%{criteria.propertyCode}"/>
	<ps:param name="criteria.optionsData" 	value="%{criteria.optionsData}"/>
</ps:url>

<psjg:grid id="ButtonCustParamMapGrid_Id_${_pageRef}"
	dataType				="json"
	href					="%{buttonCustParamMapGridURL}"
	caption					="%{getText('parameters_key')}"
	pager            		="false"
	sortable         		="true"
	filter           		="false"
	gridModel        		="gridModel"
	rowNum           		="5"
	rowList          		="5,10,15,20"
	viewrecords      		="false"
	navigator       	 	="true"
	navigatorDelete 	    ="true"
	navigatorEdit    		="false"
	navigatorRefresh 		="true"
	navigatorAdd     		="true"
	navigatorSearch  		="false"
	editurl			 		=" " 
	editinline		 		="true" 
	altRows          		="true"
	addfunc					="screenGeneratorProp_addMapGrid"
	delfunc					="ButtonCustParamMapGrid_deleteMapGrid"
	autowidth				="true"
	hiddengrid				="false"
	height					="120"
	shrinkToFit				="false"
	onEditInlineBeforeTopics="ScreenGeneratorProp_onRowSelTopic"
	>
	
	<psjg:gridColumn id="sysParamGlobalActArgMap_MAP_ID" name="sysParamGlobalActArgMapVO.MAP_ID" title="%{getText('map_id_key')}" 
		index="MAP_ID" colType="number" hidden="true"/>
	
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
					hidden="true"
	/>
	
	<psjg:gridColumn id="sysParamGlobalActArgMap_MAP_DIRECTION" name="sysParamGlobalActArgMapVO.MAP_DIRECTION" title="" 
	index="MAP_DIRECTION" colType="text" hidden="true" />
	
	<psjg:gridColumn id="sysParamGlobalActArgMap_OP_ID" colType="liveSearch"
			name="sysParamGlobalActArgMapVO.OP_ID" index="OP_ID"
			title="%{getText('operation_id_key')}" editable="true" sortable="true" required="true"
			search="true" reConstruct="true" 
			paramList="criteria.buttonId:lookuptxt_globalActivityId_${_pageRef},criteria.globalParamMap:true" 
			dataAction="${pageContext.request.contextPath}/path/buttoncustomization/ButtonCustomizationLookupAction_constructGlobalActionsLookup"
			resultList="sysParamBtnCustActionsVO.OP_ID:sysParamGlobalActArgMapVO.OP_ID_lookuptxt,sysParamBtnCustActionsVO.DESCRIPTION:opIdDescription,sysParamBtnCustActionsVO.API_CODE:apiCode"
			searchElement="sysParamBtnCustActionsVO.OP_ID"
			dependencySrc="${pageContext.request.contextPath}/path/buttoncustomization/ButtonCustomizationMaint_dependencyByGlobalActionCode"
			params="dependancyCriteria.dependentOpId:sysParamGlobalActArgMapVO.OP_ID_lookuptxt,dependancyCriteria.buttonId:lookuptxt_globalActivityId_${_pageRef},dependancyCriteria.globalParamMap:true"
			dependency="buttonCustomizationCO.sysParamBtnCustActionsVO.OP_ID:OP_ID_lookuptxt,buttonCustomizationCO.sysParamBtnCustActionsVO.DESCRIPTION:opIdDescription,buttonCustomizationCO.sysParamBtnCustActionsVO.API_TYPE:apiType,buttonCustomizationCO.sysParamBtnCustActionsVO.API_CODE:apiCode"
	 />
	<psjg:gridColumn id="sysParamGlobalActArgMap_OP_ID_DESCRIPTION" name="opIdDescription" title="%{getText('oper_description_key')}" 
		index="opIdDescription" colType="text" />		
		
	<psjg:gridColumn id="sysParamGlobalActArgMap_ARG_ID" colType="liveSearch"
		name="sysParamGlobalActArgMapVO.ARG_ID" index="ARG_ID"
		title="%{getText('oper_arg_id_key ')}" editable="true" sortable="true"
		search="true" reConstruct="true" 
		paramList="operationId:sysParamGlobalActArgMapVO.OP_ID_lookuptxt,buttonId:lookuptxt_globalActivityId_${_pageRef},mapDirection:I,apiType:apiType" 
		dataAction="${pageContext.request.contextPath}/path/buttoncustomization/ButtonCustomizationLookupAction_constructArgLookup"
		resultList="imApiArgumentVO.ARG_ID:sysParamGlobalActArgMapVO.ARG_ID_lookuptxt,imApiArgumentVO.DESCRIPTION:argDescription"
		searchElement="sysParamBtnCustActionsVO.OP_ID"
		dependencySrc="${pageContext.request.contextPath}/path/buttoncustomization/ButtonCustomizationMaint_dependencyByLinkArg"
		dependency="buttonCustomizationCO.sysParamActionArgMapVO.ARG_ID:sysParamGlobalActArgMapVO.ARG_ID_lookuptxt,
				   buttonCustomizationCO.imApiArgumentVO.DESCRIPTION:argDescription,buttonCustomizationCO.imApiArgumentVO.ARG_NAME:argName"
		params	="buttonCustomizationCO.sysParamActionArgMapVO.ARG_ID:sysParamGlobalActArgMapVO.ARG_ID_lookuptxt,
				   buttonCustomizationCO.sysParamActionArgMapVO.OP_ID:sysParamGlobalActArgMapVO.OP_ID_lookuptxt,
				   buttonCustomizationCO.mapDirection:MAP_DIRECTION,
				   buttonCustomizationCO.sysParamBtnCustActionsVO.BTN_ID:lookuptxt_globalActivityId_${_pageRef},
				   buttonCustomizationCO.sysParamBtnCustActionsVO.API_TYPE:apiType"
		/>
	
	<psjg:gridColumn id="sysParamGlobalActArgMap_ARG_DESCRIPTION" name="argDescription" title="%{getText('oper_arg_description_key')}" 
		index="argDescription" colType="text" />
		
	<psjg:gridColumn id="apiType" name="apiType" title="" index="apiType" colType="text" hidden="true"/>	
		
	<psjg:gridColumn id="apiCode" name="apiCode" title="" index="apiCode" colType="number" hidden="true"/>	
																 
	<psjg:gridColumn id="sysParamGlobalActArgMap_MAP_TYPE" name="sysParamGlobalActArgMapVO.MAP_TYPE" title="" 
		index="ysParamGlobalActArgMapVO.MAP_TYPE" colType="text" hidden="true"/>	
		
	<psjg:gridColumn id="sysParamGlobalActArgMap_MAP_TYPE_DESC"
					name="mapTypeDesc"
					index="MAP_TYPE_DESC"
					title="%{getText('mapping_inp_out_key')}"
					editable="true"
					sortable="true" edittype="select" colType="select" 
					editoptions="{value:function() {  return loadCombo('${pageContext.request.contextPath}/path/buttoncustomization/buttonCustomizationParamListAction_loadMapTypeSelect?criteria.elementType=${criteria.elementType}','mapTypeList', 'code', 'descValue');}
					,dataEvents: [{ type: 'change', fn: function() { screenGeneratorProp_mapTypeChanged() } }]}"
					search="true" 
	/>
	
	<psjg:gridColumn id="sysParamGlobalActArgMap_MAP_VALUE" name="sysParamGlobalActArgMapVO.MAP_VALUE" title="%{getText('value_key')}" 
		index="MAP_VALUE" colType="text" editable="true" readOnlyMode="true"/>
		
	<psjg:gridColumn id="sysParamGlobalActArgMap_SCREEN_FLD_IDENTIFIER" name="sysParamGlobalActArgMapVO.SCREEN_FLD_IDENTIFIER" title="" 
		index="SCREEN_FLD_IDENTIFIER" colType="number" hidden="true"/>
	
	<psjg:gridColumn id="sysParamGlobalActArgMap_SCREEN_FLD_IDENTIFIER_DESC" colType="liveSearch"
				name="screenFldIdDesc" index="screenFldIdDesc"
				title="%{getText('session_fld_id_key')}" editable="true" sortable="false"
				search="false" reConstruct="true" 
				dataAction="${pageContext.request.contextPath}/path/dynamicScreen/dynScreenLookupAction_constructScreenElementsOrSessionLookup"
				paramList="screenId:dynScreenId,criteria.mapType:sysParamGlobalActArgMapVO.MAP_TYPE"
				resultList="element_mode:screenFldIdDesc_lookuptxt"			
				searchElement="screenFldIdDesc" 
				dependencySrc="${pageContext.request.contextPath}/path/dynamicScreen/dynDependencyAction_dependencyForScreenElementsOrSessionLookup"
				params="dynamicScreenCO.screenIdValue:dynScreenId,
				dynamicScreenCO.elementIdValue:screenFldIdDesc_lookuptxt,
				dynamicScreenCO.elementType:sysParamGlobalActArgMapVO.MAP_TYPE,
				dynamicScreenCO.element_mode:screenFldIdDesc_lookuptxt"				
				dependency="dynamicScreenCO.element_mode:screenFldIdDesc_lookuptxt,dynamicScreenCO.elementId:mapDescription,dynamicScreenCO.elementTypeCode:elementTypeCode"
	/>
	<%-- 
	<psjg:gridColumn id="sysParamElmDynScrnMapDet_TO_ELEMENT_ID" name="TO_ELEMENT_ID" title="%{getText('screen_fld_id_key')}" 
			index="TO_ELEMENT_ID" colType="liveSearch" search="true" editable="true" sortable="true"
			dataAction="${pageContext.request.contextPath}/path/dynamicScreen/dynScreenLookupAction_constructScreenElementsOrSessionLookup"
			paramList="screenId:dynScreenId,criteria.mapType:sysParamGlobalActArgMapVO.MAP_TYPE,criteria.dynParamType:sysParamElmDynScrnMapDet.DYN_PARAM_TYPE"
			resultList="elementIdValue:TO_ELEMENT_ID_lookuptxt"			
			searchElement="TO_ELEMENT_ID" 
			dependencySrc="${pageContext.request.contextPath}/path/dynamicScreen/dynDependencyAction_dependencyByScreenElementId"
			params="dynamicScreenCO.screenIdValue:dynScreenId,dynamicScreenCO.elementIdValue:TO_ELEMENT_ID_lookuptxt"
			dependency="dynamicScreenCO.elementIdValue:TO_ELEMENT_ID_lookuptxt,dynamicScreenCO.elementId:mapDescription"
			/>
	 --%>				
	<psjg:gridColumn id="sysParamGlobalActArgMap_Description" name="mapDescription" title="%{getText('fld_description_key')}" 
		index="mapDescription" colType="text" editable="false"/>	
	
	<psjg:gridColumn id="sysParamGlobalActArgMap_SELECTION_TYPE" colType="select" formatter="select"  edittype="select"
				editoptions="{value:function() {  return loadCombo('${pageContext.request.contextPath}/path/buttoncustomization/buttonCustomizationParamListAction_loadSelectionType','selectionTypeList', 'code', 'descValue');}}" 
				name="sysParamGlobalActArgMapVO.SELECTION_TYPE" index="SELECTION_TYPE" title="%{getText('selection_type_key')}" editable="true" sortable="false" search="true" hidden="true"/>
		
	<psjg:gridColumn id="sysParamGlobalActArgMap_DELIMITER"  name="sysParamGlobalActArgMapVO.DELIMITER" title="%{getText('delimiter_key')}" 
		index="DELIMITER" colType="text"  editable="true" hidden="true"/>
	
	<psjg:gridColumn id="sysParamGlobalActArgMap_DYN_ELEM_IDENTIFIER" colType="liveSearch"
				name="sysParamGlobalActArgMapVO.DYN_ELEM_IDENTIFIER" index="DYN_ELEM_IDENTIFIER"
				title="%{getText('dyn_elem_id_key')}" editable="true" sortable="true"
				search="true" reConstruct="true" 
				dataAction="${pageContext.request.contextPath}/path/dynamicScreen/dynScreenLookupAction_drawingDynScreenElementsGrid"
				resultList="elementIdValue:sysParamGlobalActArgMapVO.DYN_ELEM_IDENTIFIER_lookuptxt,elementId:dynElemDescription"
				paramList="screenId:apiCode,criteria.dynParamType:DYN_PARAM_TYPE"
				searchElement="sysParamGlobalActArgMapVO.DYN_ELEM_IDENTIFIER"
				dependencySrc="${pageContext.request.contextPath}/path/dynamicScreen/dynDependencyAction_dependencyByScreenElementId"
				params="dynamicScreenCO.screenIdValue:apiCode,dynamicScreenCO.elementIdValue:DYN_ELEM_IDENTIFIER_lookuptxt"
				dependency="dynamicScreenCO.elementIdValue:sysParamGlobalActArgMapVO.DYN_ELEM_IDENTIFIER_lookuptxt,dynamicScreenCO.elementId:dynElemDescription"
				hidden="true"
	/>
				
	<psjg:gridColumn id="sysParamGlobalActArgMap_DYN_ELEM_DESCRIPTION" name="dynElemDescription" title="%{getText('dyn_elem_description_key')}" 
		index="dynElemDescription" colType="text" hidden="true"/>
		
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
		
	<psjg:gridColumn id="fromSource" name="fromSource" title="" index="" colType="text" hidden="true"/>	
		
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
					hidden="true"
	/> 
	<psjg:gridColumn id="sysParamGlobalActArgMap_ARG_NAME" name="argName" title="%{getText('arg_name_key')}" 
	index="argName" colType="text" hidden="true" />		
	 
	 <psjg:gridColumn id="mapTypeDescOld" name="mapTypeDescOld" title="" index="" colType="text" hidden="true"/>
	 <psjg:gridColumn id="elementTypeCode" name="elementTypeCode" title="" index="" colType="text" hidden="true"/>
	 
</psjg:grid>	
	
<script type="text/javascript">
	$.subscribe("ScreenGeneratorProp_onRowSelTopic",function(rowObj){screenGeneratorProp_onRowSelTopic(rowObj);});
</script>