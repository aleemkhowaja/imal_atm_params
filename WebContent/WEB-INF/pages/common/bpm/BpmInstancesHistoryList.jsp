<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>
 
<ps:set name="abort_key_trans" value="%{getEscText('Abort_key')}"/>
<ps:set name="process_instance_tasks_key_trans" value="%{getEscText('process_instance_tasks_key')}"/>

<script type="text/javascript">
	$.struts2_jquery.require("BpmList.js" ,null,"${pageContext.request.contextPath}/common/js/bpm/");
	var abort_key_trans = "${abort_key_trans}";	
	var process_instance_tasks_key_trans = "${process_instance_tasks_key_trans}";
</script>

<ps:url id="bpmInstanceHistUrl_${param.type}" action="BpmGrid_loadInstanceHistGrid?bpmCO.type=${param.type}"	namespace="/path/bpm" escapeAmp="false">
</ps:url>


<psjg:grid id="bpmInstanceHistGrid_Id_${param.type}"					
		href="%{bpmInstanceHistUrl_${param.type}}" 
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
		ondblclick="bpmInstanceHistGrid_onDbClicked('${param.type}')"
		>
		
		<psjg:gridColumn id="bpmInstanceHistGrid_status_${param.type}" colType="number"
			name="status" index="STATUS"
			title="" hidden="true" 
		/>
		
		<psjg:gridColumn id="bpmInstanceHistGrid_processInstanceId_${param.type}" colType="number"
			name="processInstanceId" index="PROCESS_INSTANCE_ID"
			title="%{getText('ID_key')}" 
			editable="false" sortable="true" search="true" 
		/>
		
		<psjg:gridColumn id="bpmInstanceHistGrid_processName_${param.type}" colType="text"
			name="processName" index="PROCESS_NAME"
			title="%{getText('Process_key')}"
			editable="false" sortable="true" search="true" 
		/>
		
		<psjg:gridColumn id="bpmInstanceHistGrid_processInstanceDescription_${param.type}" colType="text"
			name="processInstanceDescription" index="PROCESS_INSTANCE_DESCRIPTION"
			title="%{getText('Description_key')}"
			editable="false" sortable="false" search="true" 
		/>
		
		<psjg:gridColumn id="bpmInstanceHistGrid_identity_${param.type}" colType="text"
			name="identity" index="IDENTITY"
			title="%{getText('Initiator_key')}"
			editable="false" sortable="true" search="true" 
		/>
		
		<psjg:gridColumn id="bpmInstanceHistGrid_startDate_${param.type}" colType="date"
			name="startDate" index="START_DATE"
			title="%{getText('Start_date_key')}"
			editable="false"
			sortable="true" sorttype="date" searchType="date"  search="false" formatter="date" searchoptions="{sopt:['eq']}" formatoptions="{srcformat:'Y-m-d H:i:s.u',newformat:'d/m/Y H:i:s' }"
		/>
		
		<psjg:gridColumn id="bpmInstanceHistGrid_endDate_${param.type}" colType="date"
			name="endDate" index="END_DATE"
			title="%{getText('end_date_key')}"
			editable="false" 
			sortable="true" sorttype="date" searchType="date"  search="false" formatter="date" searchoptions="{sopt:['eq']}" formatoptions="{srcformat:'Y-m-d H:i:s.u',newformat:'d/m/Y H:i:s' }"
		/>
		
		<psjg:gridColumn id="bpmInstanceHistGrid_processVersion_${param.type}" colType="text"
			name="processVersion" index="PROCESS_VERSION"
			title="%{getText('version_key')}"
			editable="false" sortable="true" search="true" 
		/>
	
		<psjg:gridColumn id="bpmInstanceHistGrid_processInstanceComment_${param.type}" colType="text"
			name="comment" index="ACTION_COMMENT" maxDisplayLen="20"
			title="%{getText('Comments_key')}"
			editable="false" sortable="false" search="true" 
		/>
		
		<psjg:gridColumn name="" 
						hidden='${!"active".equals(param.type)}'
       				    index="" 
       				    title="%{getText('actions_key')}" 
       				    id="btnId"
       				    align="center"
					    colType="text"        
					    editable="false"       
					    sortable="false" 
					    search="false" 
					    formatter="bpmInstanceHistGrid_Id_BtnFormatter" width="100"/>
			
</psjg:grid>			