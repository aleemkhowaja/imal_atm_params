<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>

<ps:set name="export_key_var" value="%{getEscText('export_key')}"/>
<ps:set name="import_key_var" value="%{getEscText('import_key')}"/>
<ps:set name="Missing_File_Location_key" value="%{getEscText('Missing_File_Location_key')}"/>
<ps:set name="file_bpmn2_ext_key" value="%{getEscText('file_bpmn2_ext_key')}"/>
<ps:set name="Process_Executed_Successfully_key" value="%{getEscText('Process_Executed_Successfully_key')}"/>
<ps:set name="success_title_key" value="%{getEscText('success_title_key')}"/>
<ps:set name="Record_already_exist_key" value="%{getEscText('Record_already_exist_key')}"/>

<script type="text/javascript">
var export_key = "${export_key_var}";
var import_key = "${import_key_var}";
var Missing_File_Location_key = "${Missing_File_Location_key}";
var file_bpmn2_ext_key = "${file_bpmn2_ext_key}";
var Process_Executed_Successfully_key = "${Process_Executed_Successfully_key}";
var success_title_key = "${success_title_key}";
var Record_already_exist_key = "${Record_already_exist_key}";

					
$(document)
		.ready(
				function() {
				
					$.struts2_jquery.require("BpmMaint.js,BpmList.js" ,null,"${pageContext.request.contextPath}/common/js/bpm/");
					bpmUploadProcDefGrid_UploadDwnReadyFunc();
				});
</script>
<ps:url id="bpmUploadProcDefUrl" action="BpmGrid_loadUploadedProcessDefGrid"	namespace="/path/bpm" escapeAmp="false">
</ps:url>

<ps:form id="bpmUploadProcDefForm_Id" useHiddenProps="true" cssStyle="width:100%;">	

<psjg:grid id="bpmUploadProcDefGrid_Id"					
		href="%{bpmUploadProcDefUrl}" 
		dataType="json"  
		hiddengrid="false" 
		pager="false" 
		filter="true" 
		sortable="true" 
		gridModel="gridModel" 
		rowNum="5" 
		rowList="5,10,15,20"
		viewrecords="true" 
		navigator="true"   
		altRows="true"
		navigatorRefresh="true" 
		navigatorSearch="false"
    	navigatorSearchOptions="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true,sopt:['eq','ne','lt','gt','le','ge']}"
		navigatorAdd="true" 
		navigatorDelete="true" 
		navigatorEdit="false" 
		shrinkToFit="true"  
		editinline="true"
		editurl="dummy"
		onGridCompleteTopics="addImportExportBtn"
		ondblclick="bpmUploadProcDefGrid_onDbClicked()"
		addfunc="bpmUploadProcDefGrid_onAddClicked"
		delfunc="bpmUploadProcDefGrid_onDeleteClicked"
		>
		
		<psjg:gridColumn id="bpmUploadProcDefGrid_PROCESS_ID" colType="number"
			name="PROCESS_ID" index="PROCESS_ID"
			title="%{getText('ID_key')}" editable="false" sortable="true" search="true"
		/>
		
		<psjg:gridColumn id="bpmUploadProcDefGrid_PROCESS_NAME" colType="text"
			name="PROCESS_NAME" index="PROCESS_NAME"
			title="%{getText('Process_key')}" editable="false" sortable="true" search="true"
		/>
		
		<psjg:gridColumn id="bpmUploadProcDefGrid_VERSION" colType="text"
			name="VERSION" index="VERSION"
			title="%{getText('version_key')}" editable="false" sortable="true" search="true"
		/>
		
		<psjg:gridColumn id="bpmUploadProcDefGrid_ACTIVE" 
				name="ACTIVE" index="ACTIVE"
				title="%{getText('active_key')}" 
				colType="checkbox" 
				edittype="checkbox"
				formatter="checkbox"
				editable="true"
				sortable="true" 
				search="true" 
				width="50" 
				editoptions="{value:'1:0',align:'middle', dataEvents: [{ type: 'change', fn: function(e) {bpmUploadProcDefGrid_setSelection(event);}}]}"
				align="center"
				searchoptions="{sopt:['eq']}"
				formatoptions="{disabled:false}"
		/>
		
</psjg:grid>	

<table>
	<tr>
		<td>
			<psj:submit button="true" onclick="bpmUploadProcDefGrid_saveProcessDef()" type="button" buttonIcon="ui-icon-play">
				<ps:label key="Save_key" />
			</psj:submit>
		</td>
	</tr>
</table>

</ps:form>