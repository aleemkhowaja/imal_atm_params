<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>
<%@page import="com.path.bo.common.ConstantsCommon"%>
<ps:set name="loadFilter_var" 			value="%{getEscText('reporting.loadFilter')}"/>
<ps:set name="noFilterSelected_var" 	value="%{getEscText('reporting.noFilterSelected')}"/>
<ps:set name="filterOtherUser_var" 		value="%{getEscText('reporting.filterOtherUser')}"/>
<ps:set name="emptyFilterName_var" 		value="%{getEscText('reporting.emptyFilterName')}"/>
<ps:set name="filterNameExists_var"		value="%{getEscText('reporting.filterNameExists')}"/>
<ps:set name="defaultFilter_var"		value="%{getEscText('reporting_defaultfilterexists')}"/>
<ps:set name="defaultFilterAndName_var"	value="%{getEscText('reporting_filternamedefaultexists')}"/>
<ps:set name="noArgsToSave_var"			value="%{getEscText('reporting.noArgsToSave')}"/>

<script type="text/javascript">
loadFilter = '<ps:property value="loadFilter_var"  escapeHtml="false" escapeJavaScript="true"/>'
noFilterSelected = '<ps:property value="noFilterSelected_var"  escapeHtml="false" escapeJavaScript="true"/>'
filterOtherUser  = '<ps:property value="filterOtherUser_var"  escapeHtml="false" escapeJavaScript="true"/>'
emptyFilterName  = '<ps:property value="emptyFilterName_var"  escapeHtml="false" escapeJavaScript="true"/>'
filterNameExists = '<ps:property value="filterNameExists_var"  escapeHtml="false" escapeJavaScript="true"/>'
defaultFilterExists = '<ps:property value="defaultFilter_var"  escapeHtml="false" escapeJavaScript="true"/>'
defaultFilterAndNameExists = '<ps:property value="defaultFilterAndName_var"  escapeHtml="false" escapeJavaScript="true"/>'

falseVal="<%=ConstantsCommon.FALSE%>";
noArgsToSave	='<ps:property value="noArgsToSave_var"  escapeHtml="false" escapeJavaScript="true"/>';

$(document).ready(function() {
rep_filters_readyFunc("${_pageRef}");
});
</script>
<ps:url id="argFilterUrl" namespace="/path/repCommon"  action="commonReporting_loadArgumentsFilters">
	<ps:param name="_pageRef" value="_pageRef"></ps:param>
</ps:url>
<div id="argsFilterTblDiv_${htmlPageRef}" class="connectedSortable ui-helper-reset">
	<div id="argsFltTblDiv_${htmlPageRef}"
		class="collapsibleContainer"
		title="<ps:text name='reporting.availableFilters'/>">

    <psjg:grid
    	id="argFiltersGrid_${htmlPageRef}"
    	dataType="json" 
    	href="%{argFilterUrl}" 
    	gridModel="gridModel"
		pager="true" navigator="true" navigatorSearch="false"
		navigatorSearchOptions="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true}"
		navigatorEdit="false" navigatorAdd="true" navigatorDelete="true"
		caption =" "
		navigatorRefresh="true" viewrecords="true" rowNum="5"
		rowList="5"   	
    	delfunc="rep_filters_deleteFilter()"
    	addfunc="rep_filters_emptyForm()"
		sortable="true" 
		onCompleteTopics="rep_filters_publicReadOnly"
		onGridCompleteTopics="addLoadFilterBtn"
		shrinkToFit="true"  
		>
      	<psjg:gridColumn name="FILTER_ID" index="FILTER_ID"	id="FILTER_ID" colType="number"   title="%{getText('FILTER_ID')}" 
      		editable="false"  sortable="true" search="false" hidden="true"/>  
      	<psjg:gridColumn name="CREATED_BY" index="CREATED_BY"	id="CREATED_BY" colType="text" title="%{getText('CREATED_BY')}" 
      		editable="false"  sortable="true" search="false" hidden="true"/>
      	<psjg:gridColumn name="FILTER_NAME" index="FILTER_NAME" id="FILTER_NAME" colType="text" 
      		searchoptions="{sopt:['eq','ne','bw','bn','ew','en','cn','nc']}"  width="60"
      		title="%{getText('reporting.filterName')}"  editable="false"  sortable="false" search="true" />
      	<psjg:gridColumn name="PUBLIC_YN" index="PUBLIC_YN" id="PUBLIC_YN"
				title="%{getText('reporting.public')}" formatter="checkbox" width="20" sortable="false" colType="checkbox" 
				align="center" search="false"
				formatoptions="{disabled : 0}" editoptions="{readonly: 'readonly'}"  />
		<psjg:gridColumn name="DEFAULT_YN" index="DEFAULT_YN" id="DEFAULT_YN"
				title="%{getText('reporting_defaultfilter')}" formatter="checkbox" width="20" sortable="false" colType="checkbox" 
				align="center" search="false"
				formatoptions="{disabled : 0}" editoptions="{readonly: 'readonly'}"  />		
     </psjg:grid>

</div>
</div>
<div id="argsFilterOuterDiv_${htmlPageRef}" class="connectedSortable ui-helper-reset">
	<div id="argsFilterDiv_${htmlPageRef}"
		class="collapsibleContainer"
		title="<ps:text name='reporting.filter'/>">
		<ps:form id="repFiltersFrm_${htmlPageRef}"
			action="commonReporting_saveUpdateFilter" namespace="/path/repCommon">
			<table class="headerPortionContent ui-widget-content" width="100%">
				<tr>
					<td width="25%"><ps:label key="reporting.filterName"
							for="filterName_${htmlPageRef}" /></td>
					<td><ps:textfield name="irpRepFilterVO.FILTER_NAME" size="50" maxlength="80" required="true"
							id="filterName_${htmlPageRef}" /></td>
				</tr>
				<tr>
					<td><ps:label key="reporting.public"
							for="filterPublic_${htmlPageRef}" /></td>
					<td><ps:checkbox name="irpRepFilterVO.PUBLIC_YN"
							id="filterPublic_${htmlPageRef}" /></td>
				</tr>
				<tr>
					<td><ps:label key="reporting.overrideArgs"
							for="overrideArgs_${htmlPageRef}" /></td>
					<td><ps:checkbox name="updates" id="overrideArgs_${htmlPageRef}" />
					</td>
				</tr>
				<tr>
					<td><ps:label key="reporting_defaultfilter"
							for="filterDefault_${htmlPageRef}" /></td>
					<td><ps:checkbox name="irpRepFilterVO.DEFAULT_YN" id="filterDefault_${htmlPageRef}" />
					</td>
				</tr>
			</table>
		</ps:form>
	</div>
</div>
<script>
	$("#gview_argFiltersGrid_${htmlPageRef} div.ui-jqgrid-titlebar").hide();
</script>