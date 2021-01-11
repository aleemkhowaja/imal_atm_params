<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>

<ps:set name="bpm_start_key_trns" value="%{getEscText('start_key')}"/>
<ps:set name="bpm_preview_image_trns" value="%{getEscText('Preview_image_key')}"/>
<ps:set name="bpm_export_excel_trns" value="%{getEscText('export_to_excel')}"/>
<ps:set name="bpm_export_doc_trns" value="%{getEscText('export_to_doc')}"/>
	

<script type="text/javascript">
	$.struts2_jquery.require("BpmList.js" ,null,"${pageContext.request.contextPath}/common/js/bpm/");
	var bpm_start_key_trns = "${bpm_start_key_trns}";
	var bpm_preview_image_trns = "${bpm_preview_image_trns}";
	var bpm_export_excel_trns = "${bpm_export_excel_trns}";
	var bpm_export_doc_trns = "${bpm_export_doc_trns}";
	
</script>

<ps:url id="bpmProcessInstUrl" action="BpmGrid_loadProcInstGrid"	namespace="/path/bpm" escapeAmp="false">
</ps:url>

<psjg:grid id="bpmProcessInstGrid_Id"					
		href="%{bpmProcessInstUrl}" 
		dataType="json"  
		hiddengrid="false" 
		pager="true" 
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
		navigatorAdd="false" 
		navigatorDelete="false" 
		navigatorEdit="false" 
		shrinkToFit="true"  
		>
		
		<psjg:gridColumn id="bpmProcessInstGrid_processId" colType="text"
			name="processId" index="processId"
			title="" hidden="true"
		/>
		
		<psjg:gridColumn id="bpmProcessInstGrid_processName" colType="text"
			name="processName" index="PROCESS_NAME"
			title="%{getText('Process_key')}"
			editable="false" sortable="true" search="true" 
		/>
		
		<psjg:gridColumn id="bpmProcessInstGrid_deploymentId" colType="text"
			name="deploymentId" index="deploymentId"
			title="" hidden="true" 
		/>
		
		<psjg:gridColumn id="bpmProcessInstGrid_version" colType="text"
			name="version" index="VERSION"
			title="%{getText('version_key')}"
			editable="false" sortable="true" search="true" 
		/>
		
		<psjg:gridColumn name="" 
       				    index="" 
       				    title="%{getText('actions_key')}" 
       				    id="btnId"
       				    align="center"
					    colType="text"        
					    editable="false"       
					    sortable="false" 
					    search="false" 
					    formatter="bpmProcessInstGrid_Id_BtnFormatter" width="100"/>
		
        <psjg:gridColumn name="" 
	       				    index="" 
	       				    title="%{getText('documents_name_key')}" 
	       				    id="bpmUploadProcDefGrid_btnId"
	       				    align="center"
						    colType="custom"        
						    editable="false"       
						    sortable="false" 
						    search="false" 
						    formatter="bpmProcessInstGrid_Id_DocBtnFormatter" width="150"
						    unformat="bpmProcessInstGrid_Id_DocBtnUnFormatter"/>
        
			
</psjg:grid>			