<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>

<script type="text/javascript">
	$.struts2_jquery.require("GlobalActivityColumnMap.js" ,null,"${pageContext.request.contextPath}/common/js/screengenerator/");
	var currentPageRef = '<ps:property value="_pageRef" escapeHtml="false" escapeJavaScript="true"/>';
	 $("#globalActivityColumnMapGrid_Id_" + _pageRef).subscribe("gblActColMapGrid_colDataTypeChanged",function(){
		 gblActColMapGrid_colDataTypeChanged();
		})
	 
</script>
<ps:url id="globalActivityColumnMapGridURL" action="generatorMaint_loadColumnMapGrid" namespace="/path/screenGenerator" escapeAmp="false">
		<ps:param name="criteria.screenPageRef" value="%{_pageRef}"/>
		<ps:param name="criteria.queryData" 	value="%{criteria.queryData}"/>
</ps:url>

<psjg:grid id="globalActivityColumnMapGrid_Id_${_pageRef}"
	dataType				="json"
	href					="%{globalActivityColumnMapGridURL}"
	caption					="%{getText('column_properties_key')}"
	pager            		="false"
	sortable         		="true"
	filter           		="false"
	gridModel        		="gridModel"
	rowNum           		="5"
	rowList          		="5,10,15,20"
	viewrecords      		="false"
	navigator       	 	="true"
	navigatorDelete 	    ="true"
	navigatorEdit    		="true"
	navigatorRefresh 		="true"
	navigatorAdd     		="true"
	navigatorSearch  		="false"
	editurl			 		=" " 
	editinline		 		="true" 
	altRows          		="true"
	height					="120"
	shrinkToFit				="false"
	addfunc					="gblActColMapGrid_addMapGrid"
	delfunc					="gblActColMapGrid_deleteMapGrid"
	onEditInlineBeforeTopics="gblActColMapGrid_colDataTypeChanged"
	>	

	<psjg:gridColumn id="sysOutParam_COL_TECH_NAME" name="COL_TECH_NAME" title="%{getText('column_tech_name_key')}" 
		index="COL_TECH_NAME" colType="text" editable="true" required="true" 
		editoptions="{ dataEvents: [{ type: 'change', fn: function() { gblActColMapGrid_checkDuplicate('COL_TECH_NAME') } }]} " 
		/>

	<psjg:gridColumn id="sysOutParam_COL_DESCRIPTION" name="COL_DESCRIPTION" title="%{getText('column_description_key')}" 
		index="COL_DESCRIPTION" colType="text" editable="true" required="true"
		editoptions="{ dataEvents: [{ type: 'change', fn: function() { gblActColMapGrid_checkDuplicate('COL_DESCRIPTION') } }]} " 
		/>
	
	<psjg:gridColumn id="sysOutParam_REST_LIST_PROP" name="REST_LIST_PROPERTIES" title="%{getText('rest_list_properties_key')}" 
		index="REST_LIST_PROPERTIES" colType="text" editable="true" required="true" 
		editoptions="{ dataEvents: [{ type: 'change', fn: function() { gblActColMapGrid_checkDuplicate('REST_LIST_PROPERTIES') } }]} "
		/>
	<psjg:gridColumn id="sysOutParam_COL_DATA_TYPE"
					name="COL_DATA_TYPE"
					index="COL_DATA_TYPE"
					title="%{getText('column_data_type_key')}"
					editable="true"
					sortable="true" edittype="select" colType="select" 
					editoptions="{value:function() {  return loadCombo('${pageContext.request.contextPath}/path/screenGenerator/generatorMaint_loadColumnDataTypeSelect','colDataTypeList', 'code', 'descValue');}
					,dataEvents: [{ type: 'change', fn: function() { gblActColMapGrid_colDataTypeChanged() } }],style:'width:100%'}"
					search="true" 
					required="true"
	/>
	
	<psjg:gridColumn id="sysOutParam_COL_FORMAT" 
					name="COL_FORMAT" 
					title="%{getText('column_format_key')}" 
					index="COL_FORMAT"  edittype="text"  editable="true"
					colType="text" readOnlyMode="true"
					editoptions="{dataEvents: [{ type: 'change', fn: function() { gblActColMapGrid_validateFormat('COL_FORMAT') } }]}" />
</psjg:grid>	