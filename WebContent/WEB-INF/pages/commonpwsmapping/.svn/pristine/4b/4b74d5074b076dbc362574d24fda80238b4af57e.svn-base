<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>

<ps:url id="pwsGridParamURL" escapeAmp="false" action="CommonPwsMappingGridAction_loadPwsGridParameters" namespace="/path/common/pws">	
	<ps:param name="pwsDefCO.mappingVO.API_CODE" value="pwsDef.mappingVO.API_CODE"></ps:param>
	<ps:param name="pwsDefCO.mappingVO.MAPPING_ID" value="pwsDef.mappingVO.MAPPING_ID"></ps:param>
</ps:url>

<psjg:grid id="pwsGridParamTbl_Id_${_pageRef}"							
	href="%{pwsGridParamURL}" 
	dataType="json"
	pager="true"
	pagerButtons="false" 
	filter="false" 
	gridModel="gridModel"
	shrinkToFit="true"
	rowNum="-1" 
	rowList="5,10,15,20" 
	viewrecords="true"
	navigator="true" 
	height="200" 
	navigatorSearch="false"
	navigatorRefresh="false"
	editinline="true"
	editurl=" "
	navigatorEdit="false"
	rownumbers="true"
	navigatorAdd="true"
	navigatorDelete="true"
	addfunc="pwsArgGridVal_addRowGrid"
	delfunc="pwsArgGridVal_deleteRowGrid">
	
	<psjg:gridColumn id="ARG_ID" colType="text" name="apiArgVO.ARG_ID"	index="ARG_ID"
		title="%{getText('argid_key')}" sortable="false" search="true" align="center" editable="false" hidden="true"/>
		
	<psjg:gridColumn id="ARG_NAME" colType="text" name="apiArgVO.ARG_NAME"	index="ARG_NAME"
		title="%{getText('sys_arg_name_key')}" sortable="false" search="true" align="center" editable="true"
		editoptions= "{dataEvents: [{ type: 'change', fn: function(e) {pwsArgGridVal_checkDuplicatedRows()} } ]}"/>
		
	<psjg:gridColumn id="ARG_TYPE" colType="select" name="apiArgVO.ARG_TYPE" index="ARG_TYPE" 
		title="%{getText('arg_type_key')}"	edittype="select" formatter="select" 
		loadOnce="true" sortable="false" search="true" align="center" editable="true"
		editoptions="{value:function(){ 
			return loadCombo('${pageContext.request.contextPath}/path/common/pws/CommonPwsMappingGridAction_loadArgTypeCombo',
			'argTypeCombo', 'code', 'descValue'); }}"/>
	
	<psjg:gridColumn id="STATUS" colType="select" name="apiArgVO.STATUS" index="STATUS" 
		title="%{getText('arg_status_key')}"	edittype="select" formatter="select" 
		loadOnce="true" sortable="false" search="true" align="center" editable="true"
		editoptions="{value:function(){ 
			return loadCombo('${pageContext.request.contextPath}/path/common/pws/CommonPwsMappingGridAction_loadArgStatusCombo',
			'argStatusCombo', 'code', 'descValue'); }}"/>
	
	<psjg:gridColumn id="SOURCE_KEY" colType="select" name="argMap.SOURCE_KEY" index="SOURCE_KEY" 
		title="%{getText('source_key')}"	edittype="select" formatter="select" 
		loadOnce="true" sortable="false" search="true" align="center" editable="true"
		editoptions="{value:function(){ return pws_loadMapperCombo(); }}"/>
																
</psjg:grid>