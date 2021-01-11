<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>

<script type="text/javascript">
	$.struts2_jquery.require("ButtonCustomization.js" ,null,"${pageContext.request.contextPath}/common/js/customization/button/");
	var currentPageRef = '<ps:property value="_pageRef" escapeHtml="false" escapeJavaScript="true"/>';
</script>

<ps:url id="buttonCustOuputMapGridURL" action="buttonCustomizationOutMapListAction_loadOutputMapGrid" namespace="/path/buttoncustomization" escapeAmp="false">
	<ps:param name="criteria.sysParamBtnCustOutMap.BTN_ID" value="${sysParamBtnCustVO.BTN_ID}"/>
</ps:url>					 

<ps:hidden id="buttonCustOutMapGrid_gridUpdate_${_pageRef}" name="buttonCustomizationCO.outputMapGridUpdate"></ps:hidden>

<psjg:grid id="ButtonCustOutMapGrid_Id_${_pageRef}"
	dataType="json"
	href="%{buttonCustOuputMapGridURL}" 
	caption="%{getText('output_parameter_key')}"
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
	addfunc="buttonCustOutputMapGrid_addMappingGrid"
	delfunc="buttonCustOutputMapGrid_deleteMapGrid"
	editurl="dummy">
	
	<psjg:gridColumn id="sysParamBtnCustOutMap_BTN_ID" name="sysParamBtnCustOutMap.BTN_ID" title="" 
		index="BTN_ID" colType="number" hidden="true"/>
		
	
	<psjg:gridColumn id="sysParamBtnCustOutMap_LINE_NO" name="sysParamBtnCustOutMap.LINE_NO" title="" 
		index="LINE_NO" colType="number" hidden="true"/>
	
	<psjg:gridColumn id="sysParamBtnCustOutMap_OP_ID" colType="liveSearch"
			name="sysParamBtnCustOutMap.OP_ID" index="OP_ID"
			title="%{getText('Operation_id_key')}" editable="true" sortable="true" required="true"
			search="true" reConstruct="true" 
			paramList="criteria.buttonId:sysParamBtnCustVO_BTN_ID_${_pageRef}" 
			dataAction="${pageContext.request.contextPath}/path/buttoncustomization/ButtonCustomizationLookupAction_constructBtnOutOpId"
			resultList="sysParamBtnCustActionsVO.OP_ID:sysParamBtnCustOutMap.OP_ID_lookuptxt,sysParamBtnCustActionsVO.DESCRIPTION:operationDescription"
			searchElement="sysParamBtnCustActionsVO.OP_ID"
			dependencySrc="${pageContext.request.contextPath}/path/buttoncustomization/ButtonCustomizationMaint_dependencyByBtnOutOpId"
			params="dependancyCriteria.dependentOpId:sysParamBtnCustOutMap.OP_ID_lookuptxt,dependancyCriteria.buttonId:sysParamBtnCustVO_BTN_ID_${_pageRef}"
			dependency="buttonCustomizationCO.sysParamBtnCustActionsVO.OP_ID:sysParamBtnCustOutMap.OP_ID_lookuptxt,buttonCustomizationCO.sysParamBtnCustActionsVO.DESCRIPTION:operationDescription"
	 />
	 	
 	<psjg:gridColumn id="operationDescription_id" name="operationDescription" title="%{getText('oper_description_key')}"
	index="operationDescription" colType="text" sortable="true" />	
	
	
	<psjg:gridColumn id="sysParamBtnCustOutMap_ARG_ID" colType="liveSearch"
			name="sysParamBtnCustOutMap.ARG_ID" index="ARG_ID"
			title="%{getText('oper_arg_id_key')}" editable="true" sortable="true" required="true"
			search="true" reConstruct="true" 
			paramList="operationId:sysParamBtnCustOutMap.OP_ID_lookuptxt,buttonId:sysParamBtnCustVO_BTN_ID_${_pageRef}" 
			dataAction="${pageContext.request.contextPath}/path/buttoncustomization/ButtonCustomizationLookupAction_constructArgLookup"
			resultList="imApiArgumentVO.ARG_ID:sysParamBtnCustOutMap.ARG_ID_lookuptxt,imApiArgumentVO.DESCRIPTION:argDescription,imApiArgumentVO.ARG_NAME:sysParamBtnCustOutMap.MAP_KEY"
			searchElement="sysParamBtnCustOutMap.ARG_ID"
			dependencySrc="${pageContext.request.contextPath}/path/buttoncustomization/ButtonCustomizationMaint_dependencyByLinkArg"
			params="buttonCustomizationCO.sysParamActionArgMapVO.ARG_ID:sysParamBtnCustOutMap.ARG_ID_lookuptxt,buttonCustomizationCO.sysParamActionArgMapVO.OP_ID:sysParamBtnCustOutMap.OP_ID_lookuptxt,buttonCustomizationCO.sysParamBtnCustActionsVO.BTN_ID:sysParamBtnCustVO_BTN_ID_${_pageRef}"
			dependency="buttonCustomizationCO.sysParamActionArgMapVO.ARG_ID:sysParamBtnCustOutMap.ARG_ID_lookuptxt,buttonCustomizationCO.imApiArgumentVO.DESCRIPTION:argDescription,buttonCustomizationCO.imApiArgumentVO.ARG_NAME:sysParamBtnCustOutMap.MAP_KEY"
	 />
	 
	 <psjg:gridColumn id="sysParamBtnCustOutMap_ArgDescription" name="argDescription" title="%{getText('oper_arg_description_key')}"
		index="argDescription" sortable="true" editable="false" colType="text" />
		
			
	<psjg:gridColumn id="sysParamBtnCustOutMap_MAP_KEY" name="sysParamBtnCustOutMap.MAP_KEY" title="%{getText('map_key')}"
		index="MAP_KEY" colType="text" required="true" editable="true" sortable="true"/>
		
	<psjg:gridColumn id="sysParamBtnCustOutMap_NESTED" 
		name="sysParamBtnCustOutMap.NESTED" index="NESTED"
		title="%{getText('NESTED')}" 
		colType="checkbox" 
		edittype="checkbox"
		formatter="checkbox"
		editable="true"
		sortable="true" 
		search="true" 
		width="50" 
		resizable="true"
		editoptions="{value:'1:0',align:'middle', dataEvents: [{ type: 'change', fn: function(e) {}}]}"
		align="center"
		searchoptions="{sopt:['eq']}"
		formatoptions="{disabled:false}"
	/>
</psjg:grid>