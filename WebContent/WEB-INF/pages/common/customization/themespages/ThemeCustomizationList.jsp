<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@taglib prefix="psjg" uri="/path-struts-jqgrid-tags"%>

<ps:url id="urlThemesCustomizationList" escapeAmp="false"
	action="ThemeCustomizationAction_loadAvailableCustomThemes"
	namespace="/path/customization">
</ps:url>
<div id="themeCustomizationListDiv"	title="<ps:text name='themes_key'/>">
	<div>
		<psjg:grid
			id               ="themesCustomizationListGrid"
			caption          =" "
		    href             ="%{urlThemesCustomizationList}"
		    dataType         ="json"
		    hiddengrid       ="false"
			pager            ="true"
			pagerButtons	 ="true"
			sortable         ="true"
			filter           ="true"
			gridModel        ="gridModel"
			rowNum           ="5"
			rowList          ="5,10,15,20"
		    viewrecords      ="true"
		    navigator        ="true"
		    navigatorDelete  ="true"
		    navigatorEdit    ="false"
		    navigatorRefresh ="false"
		    navigatorAdd     ="true"
		    navigatorSearch  ="false"
		    altRows          ="false"
		    ondblclick       ="themeCustomization_onDbClickedEvent()"
		    addfunc          ="themeCustomization_onAddClickedEvent"
		    delfunc			 ="themeCustomization_onDeleteClickedEvent" 
		    onCompleteTopics ="themeCustomizationList_onGridLoad"
		    editinline		 ="true"
		    editurl			 ="test"
		    shrinkToFit      ="true" height="125"
		    >
		    <psjg:gridColumn 
					id="IS_ACTIVE_YN" 
					name="themeVO.IS_ACTIVE_YN"
					index="IS_ACTIVE_YN" 
					colType="checkbox" 
					edittype="checkbox"
					formatter="checkbox"
					formatoptions="{disabled:false}"
					title="%{getText('is_active_key')}" 
					editable="true"
					sortable="true" 
					search="true" 
					width="10" 
					editoptions="{value:'1:0',align:'middle', dataEvents: [{ type: 'change', fn: function(e) { themeCustomization_isActiveChanged();}}]}"
					align="center"
					searchoptions="{sopt:['eq'] }"
					/>	
		    <psjg:gridColumn 
					id="THEME_NAME" 
					colType="text"
					name="themeVO.THEME_NAME"
					index="THEME_NAME" 
					title="%{getText('theme_name_key')}" 
					editable="false"
					sortable="true" 
					search="true" 
					searchoptions="{sopt:['cn'] }"
					width="50" 
					/>
			<psjg:gridColumn 
					id="APP_NAME" 
					colType="text"
					name="themeVO.APP_NAME"
					index="APP_NAME" 
					title="%{getText('application_key')}" 
					editable="false"
					sortable="true" 
					search="true" 
					searchoptions="{sopt:['cn'] }"
					width="10" 
					/>
			<psjg:gridColumn 
					id="appDesc" 
					colType="text"
					name="appDesc"
					index="appDesc" 
					title="%{getText('brief_desc_key')}" 
					editable="false"
					sortable="true" 
					search="true" 
					searchoptions="{sopt:['cn'] }"
					width="30" 
					/>
			<psjg:gridColumn 
					id="THEME_ID" 
					name="themeVO.THEME_ID"
					index="THEME_ID"
					hidden="true"
					title="" 
					colType="text"
					/>	
			
		</psjg:grid>
	</div>
</div>
<ps:set name="is_activated_successfully_key" value="%{getEscText('is_activated_successfully')}"/>
<ps:set name="is_deactivated_successfully_key" value="%{getEscText('is_deactivated_successfully')}"/>
<ps:set name="fill_theme_name_key" value="%{getEscText('fill_theme_name')}"/>
<ps:set name="delete_selected_record_key" value="%{getEscText('delete_selected_record_key')}" /> 
<ps:set name="import_key" value="%{getEscText('import_key')}" /> 
<ps:set name="export_key" value="%{getEscText('Export_key')}" /> 
<script>
$.struts2_jquery.require("ThemeCustomization.js", null, "${pageContext.request.contextPath}/common/js/customization/");
var is_activated_successfully_key = '<ps:property value="is_activated_successfully_key" escapeHtml="false" escapeJavaScript="true"/>';
var is_deactivated_successfully_key = '<ps:property value="is_deactivated_successfully_key" escapeHtml="false" escapeJavaScript="true"/>';
var fill_theme_name_key = '<ps:property value="fill_theme_name_key" escapeHtml="false" escapeJavaScript="true"/>';
var delete_selected_record_key = '<ps:property value="delete_selected_record_key" escapeHtml="false" escapeJavaScript="true"/>';
var import_key = '<ps:property value="import_key" escapeHtml="false" escapeJavaScript="true"/>';
var export_key = '<ps:property value="export_key" escapeHtml="false" escapeJavaScript="true"/>';
$("#themesCustomizationListGrid").subscribe("themeCustomizationList_onGridLoad",function(response,html){
	themeCust_addImportExportBtns();
});
$(document).ready(function() {
	$("#themeCustomizationListDiv").collapsiblePanel();
	$("#gview_themesCustomizationListGrid div.ui-jqgrid-titlebar").hide();
});
</script>