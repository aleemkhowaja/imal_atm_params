<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>

<tr role="row" class="ui-subgrid">
	<td colspan="1">&nbsp;</td>
	<td class="ui-widget-content subgrid-cell"><span class="ui-icon ui-icon-carat-1-sw"></span>
	</td>
	<td colspan="5" class="ui-widget-content subgrid-data">

<ps:url id="pwsWebServiceGuiListSubGridUrl" action="PwsWebServiceExplorerList_loadListSubGridInfo" namespace="/path/common/pws/" escapeAmp="false">
	<ps:param name="iv_crud" value="iv_crud" />
	<ps:param name="_pageRef" value="_pageRef" />
	<ps:param name="webServiceExplorerCO.operationName" value="webServiceExplorerCO.operationName" />
	<ps:param name="webServiceExplorerCO.applicationName" value="webServiceExplorerCO.applicationName" />
	<ps:param name="webServiceExplorerCO.webServiceName" value="webServiceExplorerCO.webServiceName" />
	<ps:param name="webServiceExplorerCO.requestType" value="webServiceExplorerCO.requestType" />
	<ps:param name="webServiceExplorerCO.parentRowId" value="webServiceExplorerCO.parentRowId" />
	<ps:param name="webServiceExplorerCO.requestResponseCO.fieldType" value="webServiceExplorerCO.requestResponseCO.fieldType" />	
	<ps:param name="webServiceExplorerCO.requestResponseCO.ID" value="webServiceExplorerCO.requestResponseCO.ID" />
	<ps:param name="webServiceExplorerCO.selectedFieldType" value="webServiceExplorerCO.selectedFieldType" />
	<ps:param name="webServiceExplorerCO.fieldType" value="webServiceExplorerCO.fieldType" />
	<ps:param name="webServiceExplorerCO.parameterName" value="webServiceExplorerCO.parameterName" />
	<ps:param name="webServiceExplorerCO.parameterType" value="webServiceExplorerCO.parameterType" />
	<ps:param name="webServiceExplorerCO.loadConfig" value="webServiceExplorerCO.loadConfig" />	
	<ps:param name="webServiceExplorerCO.webServiceExplorerConfigVO.CONFIG_ID" value="webServiceExplorerCO.webServiceExplorerConfigVO.CONFIG_ID" />	
	<ps:param name="webServiceExplorerCO.mappingID" value="webServiceExplorerCO.mappingID" />
</ps:url>

	<psjg:grid id="${listGridId}"
					caption="" 
					href="%{pwsWebServiceGuiListSubGridUrl}" 
					pagerButtons="true" 
					altRows="true"
					dataType="json" 
					filter="false"
					gridModel="gridModel" 
					navigator="true" 
					navigatorAdd="false"
					navigatorDelete="false" 
					navigatorEdit="false"
					navigatorRefresh="false"
					navigatorSearch="false"
					navigatorSearchOptions="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true,sopt:['eq','ne','lt','gt']}"
					pager="true" 
					shrinkToFit="true"
					sortable="false" 
					viewrecords="true"
					multiselect="true" 
					editinline="true"
					onEditInlineBeforeTopics="onListGridRowSelTopic_${_pageRef}"
					onGridCompleteTopics ="onPwsListSubGridCompleteFn_${_pageRef}"   
					editurl=" " 
					addfunc="addListSubGridRows" 
					delfunc="deleteListSubGridRows">
	
	
			<psjg:grid id="webServiceGuiSubGridTbl_SubGrid_Id_${_pageRef}"
				subGridUrl="" 
				gridModel="" 
				subGridOptions="{reloadOnExpand:false}"   
			>
			</psjg:grid>
			
			
		<psjg:gridColumn id="ID_${_pageRef}" colType="text" key="true"
			name="ID" index="ID" title="ID" editable="false" sortable="false"
			hidden="true"
		 />
				
		
		<psjg:gridColumn name="fieldName"
			title="%{getText('parameter_key')}" index="PARAMETER"
			colType="text" editable="false" sortable="false" search="false"
			id="PARAMETER_${_pageRef}"
			hidden = "true"
			editoptions="{readonly: 'readonly', maxlength:'15'}"
			 />	
					
		<psjg:gridColumn name="fieldType"
			title="%{getText('type_key')}" index="TYPE"
			colType="text" editable="false" sortable="false" search="false"
			id="TYPE_${_pageRef}" />
			
			
		<psjg:gridColumn name="mandatory"
			title="%{getText('mandatory_key')}" index="MANDATORY" colType="text"
			editable="false" sortable="false" search="false" 
			id="MANDATORY_${_pageRef}" 	hidden="true"/>
 

	
		<psjg:gridColumn id="VALUE_${_pageRef}"
				title="%{getText('value_key')}" index="VALUE" 
				colType="text"
				name="value"
				editable="true" 
				sortable="false" 
				search="false"
				required="false"
				/>
				
		
	<psjg:gridColumn name="mappingField" title="%{getText('mappingfield_key')}" index="MAPINGFIELD" 
			colType="select" search="false"  formatter="select" editable="true" sortable="false" id="maping_Field_${_pageRef}"  edittype="select" 
			loadOnce="true"
			hidden=""
			width="40"
			editoptions="{value:function(){
			return pwsMappingFieldsLoadCombo('${pageContext.request.contextPath}/path/common/pws/PwsWebServiceExplorerMainAction_fillMappingFields','mappingValues','code', 'descValue');}
			,dataEvents: [{ type: 'change', fn: function(e) { applyOnMappingChange(e) } }
			]
			}
			" 
		/>	
						
		<psjg:gridColumn name="hasChildren"
			title="%{getText('hasChildren_key')}" index="HASCHILDREN" colType="text"
			editable="false" sortable="false" search="false"
			hidden="true"
			id="HASCHILDERN_${_pageRef}" />
		
		<psjg:gridColumn name="hasRestriction"
			title="%{getText('has_restrictions_key')}" index="HASRESTRICTION" colType="text"
			editable="false" sortable="false" search="false"
			hidden="true"
			id="HASRESTRICTION_${_pageRef}" />
			
		<psjg:gridColumn name="soapAction"
			title="%{getText('soap_action_key')}" index="SOAPACTION" colType="text"
			editable="false" sortable="false" search="false"
			hidden="true"
			id="SOAPACTION_${_pageRef}" />
			
					
		<psjg:gridColumn name="gridColumnID"
			title="%{getText('gridcolumnid_key')}" index="GRIDCOLUMNID" colType="text"
			editable="false" sortable="false" search="false"
			hidden="true"
			id="GRIDCOLUMNID_${_pageRef}" />	
			
		<psjg:gridColumn name="parent_row_id"
			title="%{getText('parent_row_id_key')}" index="PARENT_ROW_ID" colType="text"
			editable="false" sortable="false" search="false"
			hidden="true"
			id="PARENT_ROW_ID_${_pageRef}" />	
			
		<psjg:gridColumn name="wsdlUrl"
			title="%{getText('wsdlUrl_key')}" index="WSDLURL" colType="text"
			editable="false" sortable="false" search="false"
			hidden="true"
			id="WSDLURL_${_pageRef}" />
			
					
		<psjg:gridColumn name="loadSubGrid"
			title="%{getText('load_sub_grid_key')}" index="LOADSUBGRID" colType="text"
			editable="false" sortable="false" search="false"
			hidden="true"
			id="LOADSUBGRID_${_pageRef}" />

		</psjg:grid>

</td>
</tr>

<script type="text/javascript">	
	//	$.struts2_jquery.require("WebServiceExplorerListSubGrid.js" ,null,jQuery.contextPath+"/path/js/proc/webserviceexplorer/");	

		$("#${listGridId}").subscribe("onPwsListSubGridCompleteFn_${_pageRef}",function(event,data){
			onPwsListSubGridCompleteFn(event,data);});
</script>