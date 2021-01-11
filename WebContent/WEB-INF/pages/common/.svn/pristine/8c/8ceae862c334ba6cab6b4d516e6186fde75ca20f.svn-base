<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>

<script type="text/javascript">
	$.struts2_jquery.require("DynamicScreenParamMap.js" ,null,"${pageContext.request.contextPath}/common/js/dynamicscreen/");
	var currentPageRef = '<ps:property value="_pageRef" escapeHtml="false" escapeJavaScript="true"/>';
</script>

<ps:hidden id="dynScreenParamMapGrid_PROG_REF_${_pageRef}" name="criteria.progRef"></ps:hidden>
<ps:hidden id="dynScreenParamMapGrid_APP_NAME_${_pageRef}" name="criteria.currAppName"></ps:hidden>
<ps:hidden id="dynScreenParamMapGrid_COMP_CODE_${_pageRef}" name="criteria.compCode"></ps:hidden>

<ps:hidden id="dynScreenParamMapGrid_MAP_ELEMENT_TYPE_${_pageRef}" name="criteria.mapElementType"></ps:hidden>
<ps:hidden id="dynScreenParamMapGrid_ELEMENT_IDENTIFIER_${_pageRef}" name="criteria.elementIdentifier"></ps:hidden>
<ps:hidden id="dynScreenParamMapGrid_ELEMENT_OP_ID_${_pageRef}" name="criteria.elementOpId"></ps:hidden>


<ps:hidden id="dynScreenParamMapGrid_DisableScreenLookup_${_pageRef}" name="disableScreenLookup"></ps:hidden>
<ps:hidden id="dynScreenParamMapGrid_DefaultScreenId_${_pageRef}" name="criteria.defaultScreenId"></ps:hidden>
<ps:hidden id="dynScreenParamMapGrid_DefaultScreenDesc_${_pageRef}" name="criteria.defaultScreenDesc"></ps:hidden>

<ps:hidden id="dynScreenParamMapGrid_globalActivityId_${_pageRef}" name="criteria.globalActivityId"></ps:hidden>
<ps:hidden id="dynScreenParamMapGrid_currentPageRef_${_pageRef}" name="_pageRef"></ps:hidden>

<ps:url id="dynScreenParamMapGridURL" action="dynScreenParamListAction_loadDyanmicScreenParamMapGrid" namespace="/path/dynamicScreen" escapeAmp="false">
	<ps:param name="criteria.elementIdentifier" value="%{criteria.elementIdentifier}"/>
	<ps:param name="criteria.mapElementType" value="%{criteria.mapElementType}"/>
	<ps:param name="criteria.elementOpId" value="%{criteria.elementOpId}"/>
	<ps:param name="criteria.globalActivityId" value="%{criteria.globalActivityId}"/>
	
	<ps:param name="criteria.progRef" value="%{criteria.progRef}"/>
	<ps:param name="criteria.compCode" value="%{criteria.compCode}"/>
	<ps:param name="criteria.currAppName" value="%{criteria.currAppName}"/>
	
	<ps:param name="_pageRef" value="%{_pageRef}"/>
</ps:url>

<ps:if test='%{ showScreenWidthAndHeight == true }'>
	<table border="0" class="ui-widget-content" width="99%">
		<tr>
			<td colspan="6">
				<br/>
			</td>
		</tr>
		<tr>
			<td>
				<ps:label id="lbl_screenWidth_${_pageRef}" 
						  for="screenWidth_${_pageRef}"
						  key="screen_width_key" />
			</td>
			<td>
				<ps:textfield id="screenWidth_${_pageRef}" 
							  name="screenWidth" 
							  mode="number" maxlength="4" maxValue="9999" />
			</td>
			<td>
				<ps:label id="lbl_screenHeight_${_pageRef}" 
						  for="screenHeight_${_pageRef}"
						  key="screen_height_key" />
			</td>
			<td>
				<ps:textfield id="screenHeight_${_pageRef}" 
							  name="screenHeight" 
							  mode="number" maxlength="4" maxValue="9999" />
			</td>
			<td>
				<ps:label id="lbl_screenTitle_${_pageRef}" 
						  for="screenTitle_${_pageRef}"
						  key="screen_title_key" />
			</td>
			<td>
				<ps:textfield id="screenTitle_${_pageRef}" 
							  name="screenTitle" />
			</td>
		</tr>
		<tr>
			<td colspan="6">
				<br/>
			</td>
		</tr>
	</table>
</ps:if>

<ps:if test='%{ criteria.elementType ==null || criteria.elementType != "12" }'>
<psjg:grid id="dynScreenParamMapGrid_Id_${_pageRef}"
	dataType="json"
	href="%{dynScreenParamMapGridURL}" 
	caption="%{getText('parameters_key')}"
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
	addfunc="dynScreenParamMapGrid_addMapGrid"
	delfunc="dynScreenParamMapGrid_deleteMapGrid"
	onEditInlineBeforeTopics="dynScreenParamMapGrid_onRowSelTopic"
	editinline="true"
	editurl="dummy">

	<psjg:gridColumn id="sysParamElmDynScrnMap_ELEMENT_MAP_ID" name="sysParamElmDynScrnMap.ELEMENT_MAP_ID" title="" 
		index="ELEMENT_MAP_ID" colType="number" hidden="true"/>

	<psjg:gridColumn id="sysParamElmDynScrnMap_MAP_ELEMENT_TYPE" name="sysParamElmDynScrnMap.MAP_ELEMENT_TYPE" title="" 
		index="MAP_ELEMENT_TYPE" colType="text" hidden="true"/>

	<psjg:gridColumn id="sysParamElmDynScrnMap_APP_NAME" name="sysParamElmDynScrnMap.APP_NAME" title="" 
		index="APP_NAME" colType="text" hidden="true"/>
	
	<psjg:gridColumn id="sysParamElmDynScrnMap_COMP_CODE" name="sysParamElmDynScrnMap.COMP_CODE" title="" 
		index="COMP_CODE" colType="number" hidden="true"/>	
		
	<psjg:gridColumn id="sysParamElmDynScrnMap_PROG_REF" name="sysParamElmDynScrnMap.PROG_REF" title="" 
		index="PROG_REF" colType="text" hidden="true"/>	
		
	<psjg:gridColumn id="sysParamElmDynScrnMap_ELEMENT_IDENTIFIER" name="sysParamElmDynScrnMap.ELEMENT_IDENTIFIER" title="" 
		index="ELEMENT_IDENTIFIER" colType="number" hidden="true"/>		
		
	<psjg:gridColumn id="sysParamElmDynScrnMapDet_ELEMENT_MAP_ID" name="sysParamElmDynScrnMapDet.ELEMENT_MAP_ID" title="" 
		index="ELEMENT_MAP_ID" colType="number" hidden="true"/>	
		
	<psjg:gridColumn id="sysParamElmDynScrnMapDet_FLD_MAP_ID" name="sysParamElmDynScrnMapDet.FLD_MAP_ID" title="" 
		index="FLD_MAP_ID" colType="number" hidden="true"/>		

	<psjg:gridColumn id="sysParamElmDynScrnMap_ELEMENT_OP_ID" name="sysParamElmDynScrnMap.ELEMENT_OP_ID" title="" 
		index="ELEMENT_OP_ID" colType="number" hidden="true"/>
	
	<psjg:gridColumn id="sysParamElmDynScrnMap_DYN_SCREEN_OP_ID" name="dynamicScreenOpId" title="" 
		index="dynamicScreenOpId" colType="number" editable="true" hidden="true"/>
	
	<psjg:gridColumn id="sysDynScreenDef_DYN_SCREEN_ID" name="sysDynScreenDef.DYN_SCREEN_ID" title="%{getText('screenId_key')}" 
			index="DYN_SCREEN_ID" colType="liveSearch" search="true" editable="true" sortable="true"
			dataAction="${pageContext.request.contextPath}/path/dynamicScreen/dynScreenLookupAction_drawingDynScreensGrid"
			resultList="sysDynScreenDefVO.DYN_SCREEN_ID:sysDynScreenDef.DYN_SCREEN_ID_lookuptxt,operationId:dynamicScreenOpId,sysDynScreenDefVO.DYN_SCREEN_DESC:sysDynScreenDef.DYN_SCREEN_DESC"
			paramList="criteria.globalActivityId:dynScreenParamMapGrid_globalActivityId_${_pageRef}"
			searchElement="DYN_SCREEN_ID" editoptions="{ readonly: 'readonly'}"/>
			<%/*
			dependencySrc="${pageContext.request.contextPath}/path/dynamicScreen/dynDependencyAction_dependencyByScreenId"
			params="criteria.screenId:sysDynScreenDef.DYN_SCREEN_ID_lookuptxt"
			dependency="sysDynScreenDefVO.DYN_SCREEN_ID:sysDynScreenDef.DYN_SCREEN_ID_lookuptxt,sysDynScreenDefVO.DYN_SCREEN_DESC:sysDynScreenDef.DYN_SCREEN_DESC"/>
			*/%>

	<psjg:gridColumn id="sysDynScreenDef_DYN_SCREEN_DESC" name="sysDynScreenDef.DYN_SCREEN_DESC" title="%{getText('screenDesc_key')}" 
		index="DYN_SCREEN_DESC" colType="text" search="true" editable="false" sortable="true"/>	

	<psjg:gridColumn id="sysParamElmDynScrnMapDet_MAP_TYPE" name="sysParamElmDynScrnMapDet.MAP_TYPE" title="" 
		index="MAP_TYPE" colType="text" hidden="true"/>
		
	<psjg:gridColumn id="sysParamElmDynScrnMapDet_MAP_TYPE_DESC"
						name="mapTypeDesc"
						index="MAP_TYPE_DESC"
						title="%{getText('Mapping_source_key')}"
						editable="true"
						sortable="false" edittype="select" colType="select" 
						editoptions="{value:function() {  return loadCombo('${pageContext.request.contextPath}/path/dynamicScreen/dynamicScreenMainAction_loadMapTypeSelect','mapTypeList', 'code', 'descValue');}
						,dataEvents: [{ type: 'change', fn: function() { dynScreenParamMapGrid_mapTypeChanged() } }]}"
						search="true" />
	
	<psjg:gridColumn id="sysParamElmDynScrnMapDet_MAP_VALUE_CONSTANT" name="mapValueConstant" title="%{getText('Value_key')}" 
		index="MAP_VALUE" colType="text" search="true" editable="true" sortable="true"/>
	
	<psjg:gridColumn id="sysParamElmDynScrnMapDet_MAP_VALUE" colType="liveSearch"
				name="sysParamElmDynScrnMapDet.MAP_VALUE" index="MAP_VALUE"
				title="%{getText('input_mapping_key')}" editable="true" sortable="true"
				search="true" reConstruct="true" 
				paramList="criteria.mapType:sysParamElmDynScrnMapDet.MAP_TYPE,criteria.currAppName:dynScreenParamMapGrid_APP_NAME_${_pageRef},criteria.progRef:dynScreenParamMapGrid_currentPageRef_${_pageRef}" 
				dataAction="${pageContext.request.contextPath}/path/buttoncustomization/ButtonCustomizationLookupAction_constructScreenElementsOrSessionLookup"
				resultList="FLD_IDENTIFIER:sysParamElmDynScrnMapDet.MAP_VALUE_lookuptxt,FIELD_KEY_LABEL_CODE:mapValueDesc,FROM_SOURCE:fromSource"
				searchElement="FLD_IDENTIFIER"
				dependencySrc="${pageContext.request.contextPath}/path/buttoncustomization/ButtonCustomizationMaint_dependencyForScreenElementsOrSessionLookup"
				params="buttonCustomizationCO.sysParamActionArgMapVO.MAP_VALUE:sysParamElmDynScrnMapDet.MAP_VALUE_lookuptxt,buttonCustomizationCO.sysParamActionArgMapVO.MAP_TYPE:sysParamElmDynScrnMapDet.MAP_TYPE,buttonCustomizationCO.sysParamBtnCustVO.APP_NAME:dynScreenParamMapGrid_APP_NAME_${_pageRef},buttonCustomizationCO.sysParamBtnCustVO.PROG_REF:dynScreenParamMapGrid_currentPageRef_${_pageRef},buttonCustomizationCO.mapElementType:dynScreenParamMapGrid_MAP_ELEMENT_TYPE_${_pageRef},buttonCustomizationCO.dynScreenId:screenId"
				dependency="buttonCustomizationCO.sysParamActionArgMapVO.MAP_VALUE:sysParamElmDynScrnMapDet.MAP_VALUE_lookuptxt,buttonCustomizationCO.sysParamBtnCustVO.DESCRIPTION:mapValueDesc,buttonCustomizationCO.sysParamScreenElementsVO.FROM_SOURCE:fromSource" 
				afterDepEvent="enableDisableSelectionTypeDynScr()"
				/>		
		
	<psjg:gridColumn id="sysParamElmDynScrnMapDet_MAP_VALUE_DESC" title="%{getText('Description_key')}" index="DESCRIPTION" colType="text"
		search="true" editable="false" sortable="true" name="mapValueDesc" />
	<psjg:gridColumn id="sysParamElmDynScrnMapDet_SELECTION_TYPE"
			name="sysParamElmDynScrnMapDet.SELECTION_TYPE" index="SELECTION_TYPE" width="220"
			title="%{getText('selection_type_key')}" editable="true"
			sortable="false" edittype="select" colType="select"
			formatter="select"
			editoptions="{value:function() {  return loadCombo('${pageContext.request.contextPath}/path/dynamicScreen/dynamicScreenMainAction_loadSelectionTypeSelect','selectionTypeList', 'code', 'descValue');}}"
			search="false" />
			
	<psjg:gridColumn id="sysParamElmDynScrnMapDet_DELIMITER"  
				name="sysParamElmDynScrnMapDet.DELIMITER" title="%{getText('delimiter_key')}" 
		        index="DELIMITER" colType="text"  editable="true" editoptions="{maxlength:'15'}"/>

		<psjg:gridColumn id="sysParamElmDynScrnMapDet_TO_ELEMENT_ID" name="sysParamElmDynScrnMapDet.TO_ELEMENT_ID" title="%{getText('output_mapping_key')}" 
			index="TO_ELEMENT_ID" colType="liveSearch" search="true" editable="true" sortable="true"
			dataAction="${pageContext.request.contextPath}/path/dynamicScreen/dynScreenLookupAction_drawingDynScreenElementsGrid"
			resultList="elementIdValue:sysParamElmDynScrnMapDet.TO_ELEMENT_ID_lookuptxt"
			paramList="screenId:sysDynScreenDef.DYN_SCREEN_ID_lookuptxt,criteria.dynParamType:sysParamElmDynScrnMapDet.DYN_PARAM_TYPE"
			searchElement="TO_ELEMENT_ID" required="true"
			dependencySrc="${pageContext.request.contextPath}/path/dynamicScreen/dynDependencyAction_dependencyByScreenElementId"
			params="dynamicScreenCO.screenIdValue:sysDynScreenDef.DYN_SCREEN_ID_lookuptxt,dynamicScreenCO.elementIdValue:sysParamElmDynScrnMapDet.TO_ELEMENT_ID_lookuptxt"
			dependency="dynamicScreenCO.elementIdValue:sysParamElmDynScrnMapDet.TO_ELEMENT_ID_lookuptxt,dynamicScreenCO.elementId:elementHtmlId"
	
			/>

	<psjg:gridColumn id="sysParamElmDynScrnMapDet_TO_ELEMENT_ID_DESC" title="%{getText('Description_key')}" index="DESCRIPTION" colType="text"
		search="true" editable="false" sortable="true" name="elementHtmlId" />		
	
	<psjg:gridColumn id="sysParamElmDynScrnMapDet_DYN_PARAM_TYPE" name="sysParamElmDynScrnMapDet.DYN_PARAM_TYPE" title="" 
		index="DYN_PARAM_TYPE" colType="text" hidden="true"/>
	<psjg:gridColumn id="fromSource" name="fromSource" title="" 
		index="" colType="text" hidden="true"/>	
	
	<psjg:gridColumn id="sysParamElmDynScrnMapDet_DYN_PARAM_TYPE_DESC"
						name="dynParamTypeDesc"
						index="DYN_PARAM_TYPE_DESC"
						width="220"
						title="%{getText('dyn_param_type_key')}"
						editable="true"
						sortable="false" edittype="select" colType="select" 
						editoptions="{value:function() {  return loadCombo('${pageContext.request.contextPath}/path/dynamicScreen/dynamicScreenMainAction_loadDynParamTypeSelect','dynParamMapList', 'code', 'descValue');}
						,dataEvents: [{ type: 'change', fn: function() { dynScreenParamMapGrid_dynParamTypeChanged() } }]}"
						search="false" />
</psjg:grid>
</ps:if>

<script type="text/javascript">
	$.subscribe("dynScreenParamMapGrid_onRowSelTopic",function(rowObj){dynScreenParamMapGrid_onRowSelTopic(rowObj);});
</script>