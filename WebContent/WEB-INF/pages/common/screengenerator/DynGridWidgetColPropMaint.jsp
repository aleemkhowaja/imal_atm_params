<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<ps:hidden name="screenId"  value="${criteria.screenId}"></ps:hidden>
<ps:hidden name="elementId" value="${criteria.elementId}"></ps:hidden>
<ps:hidden name="elementType" value="${criteria.elementType}"></ps:hidden>
<ps:hidden name="criteria.colProperties" value="${criteria.colProperties}"></ps:hidden>
<ps:hidden name="elemTableName" value="${criteria.tableName}"></ps:hidden>

<ps:set name="queryColKey" value="%{getEscText('query_key')}" />

<ps:url id="dynScrTablesURL"
	action="dynScrTablesListAction_loadGridWigetColProperties" escapeAmp="false"
	namespace="/path/screenGenerator">
	<ps:param name="criteria.tableName" value="%{criteria.tableName}" />
</ps:url>
<div style="width: 100%">
	<psjg:grid id="dynScrGridWidgetColPropsId" altRows="false" 
		dataType= "json" serializeGridData="screenGeneratorProp_serializeGridWidgetColPropsData"
		editurl="abc" editinline="true" filter="true" gridModel="gridModel"
		href="%{dynScrTablesURL}" navigator="true" navigatorAdd="false"
		navigatorEdit="false" navigatorDelete="false" navigatorRefresh="false"
		navigatorSearch="false" sortable="false" shrinkToFit="false" viewrecords="true"
		navigatorSearchOptions="{closeOnEscape: true,closeAfterSearch: false, multipleSearch: false}"
		hiddengrid="false" multiselect="false" rownumbers="false"
		onEditInlineBeforeTopics="ondynScrGridWidgetColPropsEditInline" >

		<psjg:gridColumn id="COL_ID" colType="number" name="COL_ID" index="COL_ID" title="" hidden="true" />
		
		<psjg:gridColumn id="TABLE_ID" colType="number" name="TABLE_ID" index="TABLE_ID" title="" hidden="true" />
		
		<psjg:gridColumn id="COL_TYPE" colType="text" name="COL_TYPE" index="COL_TYPE" title="" hidden="true" />
		
		<psjg:gridColumn id="PRIMARY_KEY" colType="number" name="PRIMARY_KEY" index="PRIMARY_KEY" title="" hidden="true" />
		
		<psjg:gridColumn id="TABLE_TECH_NAME" colType="text" name="TABLE_TECH_NAME" index="TABLE_TECH_NAME" autoSearch="true"
			title="%{getText('table_tech_name_key')}" editable="false" sortable="true" search="false"    width="120"/>
			
		<psjg:gridColumn id="COL_TECH_NAME" colType="text" name="COL_TECH_NAME" index="COL_TECH_NAME" autoSearch="true"
			title="%{getText('col_tech_name_key')}" editable="false" sortable="true" search="false"   width="120" />
			
		<psjg:gridColumn id="COL_DESC" colType="text" name="COL_DESC" index="COL_DESC" autoSearch="true" title="%{getText('col_desc_key')}"
			editable="false" sortable="true" search="false"   width="120" />
			
		<psjg:gridColumn id="COL_TYPE_DESC" colType="text" name="COL_TYPE_DESC" index="COL_TYPE_DESC" autoSearch="true" title="%{getText('col_desc_key')}"
			editable="false" sortable="true" search="false"  width="120" />

					
	 	<%-- <psjg:gridColumn id="COL_IS_LIVESEARCH" colType="checkbox" editable="true" sortable="true"
			editoptions="{value:'1:0',dataEvents: [{ type: 'change', fn: function(e) { screenGeneratorProp_onChangeIsLiveSearch(e)  } }]}" 
			edittype="checkbox" formatter="checkbox" formatoptions="{disabled : true}" name="COL_IS_LIVESEARCH"
			index="COL_IS_LIVESEARCH" title="%{getText('is_livesearch_key')}" width="100" align="center" search="false"/>  --%>

		<psjg:gridColumn id="SOURCE_MAPPING_CODE" colType="text" name="SOURCE_MAPPING_CODE" index="SOURCE_MAPPING_CODE" 
			title="%{getText('source_mapping_code_key')}"	
			editable="false" sortable="true" search="false"   hidden="true" autoSearch="true" />
			
		<psjg:gridColumn id="SOURCE_MAPPING"      colType="select" name="SOURCE_MAPPING"     index="SOURCE_MAPPING"   title="%{getText('source_mapping_key')}"  			
	        editable="true"  sortable="true" edittype="select" align="center" search="false" 
			editoptions="{value:function() {return loadCombo('${pageContext.request.contextPath}/path/screenGenerator/dynScrTablesListAction_loadSourceMappingSelect','columnTypeList','code','descValue');}
									,dataEvents: [{type: 'change', fn: function(){screenGeneratorProp_sourceMappingChanged()}}]}" />	
										
		<psjg:gridColumn name="QUERY_BTN" index="QUERY_BTN" title="%{getText('liveSearchParams_key')}" align="center" colType="button"
			editable="false"  sortable="false" search="false"  width="120"  formatter="screenGeneratorProp_openLiveSearchQueryFormatter"/>
			
		<psjg:gridColumn id="QUERY_DATA" colType="text" name="QUERY_DATA" index="QUERY_DATA" title="" hidden="true" />
		
		<psjg:gridColumn id="LOOKUP_DESC" name="LOOKUP_DESC" title="%{getText('lookup_desc')}" 
			index="LOOKUP_DESC" colType="liveSearch" sortable="true"
			dataAction="${pageContext.request.contextPath}/path/screenGenerator/generatorLookupAction_drawingScrColsGrid"
			resultList="COL_TECH_NAME:LOOKUP_DESC_lookuptxt"
			editable="true" search="false"
			paramList="criteria.tableName:elemTableName" />
			
		 <psjg:gridColumn id="MAPPING_ELMNT_ID"  colType="liveSearch"
			name="MAPPING_ELMNT_ID" index="MAPPING_ELMNT_ID" 	
			editable="true" sortable="false" search="false" 
			reConstruct="true"
 			paramList="screenId:dynScreenId,criteria.dynParamType:SOURCE_MAPPING"
			dataAction="${pageContext.request.contextPath}/path/dynamicScreen/dynScreenLookupAction_constructDynScreenElementsOrSessionLookup"
			resultList="elementIdValue:MAPPING_ELMNT_ID_lookuptxt"
			searchElement="elementIdValue" 			
			title="%{getText('mapping_key')}"	
			dependencySrc="${pageContext.request.contextPath}/path/dynamicScreen/dynDependencyAction_dependencyForDynScreenElementsOrSessionLookup"
			params="dynamicScreenCO.screenIdValue:dynScreenId,dynScreenMappingId:MAPPING_ELMNT_ID_lookuptxt,dynParamType:SOURCE_MAPPING,columnType:COL_TYPE"
			dependency="dynScreenMappingId:MAPPING_ELMNT_ID_lookuptxt,dynScreenMappingDesc:MAPPING_DESC"	
					/>
		<psjg:gridColumn id="MAPPING_DESC" colType="text" name="MAPPING_DESC" index="MAPPING_DESC" 
			title="%{getText('description_key')}"	
			editable="false" sortable="true" search="false"   hidden="false" autoSearch="true" />

		<psjg:gridColumn id="AGGREGATE_CODE" colType="text" name="AGGREGATE_CODE" index="AGGREGATE_CODE" 
			title="%{getText('aggregate_code_key')}"	
			editable="false" sortable="true" search="false"   hidden="true" autoSearch="true" />

		<psjg:gridColumn id="AGGREGATE"      colType="select" name="AGGREGATE"     index="AGGREGATE"     autoSearch="true" title="%{getText('aggregate_key')}"       
			editable="true"  sortable="true" search="false" edittype="select" align="center" 
		    editoptions="{value:function() {return loadCombo('${pageContext.request.contextPath}/path/screenGenerator/dynScrTablesListAction_loadAggregateSelect','columnTypeList','code','descValue');}
							,dataEvents: [{type: 'change', fn: function(){screenGeneratorProp_aggregateChanged()}}]}" /> 
		 <psjg:gridColumn id="FOOTER_DESC" colType="text" name="FOOTER_DESC" index="FOOTER_DESC" autoSearch="true" title="%{getText('footer_desc_key')}"
			editable="true" sortable="true" search="false"   width="120" /> 
			
		 <psjg:gridColumn id="VISIBILITY_YN" colType="checkbox" editable="true" sortable="true"
			editoptions="{value:'1:0'}"
			edittype="checkbox" formatter="checkbox" formatoptions="{disabled : true}" name="VISIBILITY_YN"
			index="VISIBILITY_YN" title="%{getText('visible_key')}" width="100" align="center" search="false"/> 
		
		<psjg:gridColumn id="COL_FORMAT" colType="text" name="COL_FORMAT" index="COL_FORMAT" 
			title="%{getText('format_key')}"	
			editable="true" sortable="true" search="false"   hidden="false" autoSearch="true" 
			editoptions="{dataEvents: [{ type: 'change', fn: function(e) { screenGeneratorProp_onChangeColumnFomat(e)  } }]}" />
		
	</psjg:grid>
</div>
<ps:set name="mapping_cannot_be_empty_key" value="%{getEscText('mapping_cannot_be_empty_key')}"/>
<ps:set name="mapping_not_applicable_for_column_type" value="%{getEscText('mapping_not_applicable_for_column_type')}"/>
<ps:set name="query_cannot_be_empty_for_live_search_mapping_key" value="%{getEscText('query_cannot_be_empty_for_live_search_mapping_key')}"/>
<ps:set name="invalid_number_format_key" value="%{getEscText('invalid_number_format_key')}"/>

<script type="text/javascript">
var queryColKey= '<ps:property value="queryColKey" escapeHtml="false" escapeJavaScript="true"/>';
$("#dynScrGridWidgetColPropsId").unsubscribe("ondynScrGridWidgetColPropsEditInline");
$("#dynScrGridWidgetColPropsId").subscribe("ondynScrGridWidgetColPropsEditInline",function(){
	screenGeneratorProp_ondynScrGridWidgetColPropsEditInline();
	});
	
var mapping_cannot_be_empty_key							= "${mapping_cannot_be_empty_key}";
var mapping_not_applicable_for_column_type				= "${mapping_not_applicable_for_column_type}";
var query_cannot_be_empty_for_live_search_mapping_key	= "${query_cannot_be_empty_for_live_search_mapping_key}";
var invalid_number_format_key							= "${invalid_number_format_key}";

</script>