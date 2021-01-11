<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>

<ps:set name="bpm_release_key_trns" value="%{getEscText('Release_key')}"/>
<ps:set name="bpm_complete_key_trns" value="%{getEscText('complete_key')}"/>
<ps:set name="bpm_claim_key_trns" value="%{getEscText('claim_key')}"/>
<ps:set name="bpm_open_key_trns" value="%{getEscText('open_key')}"/>
<ps:set name="bpm_forward_key_trns" value="%{getEscText('forward.btn')}"/>
<ps:set name="bpm_confirm_complete_task_trns" value="%{getEscText('Confirm_Complete_Task_key')}"/>
<ps:set name="bpm_human_task_form_trns" value="%{getEscText('Human_Task_Form_key')}"/>
<ps:set name="bpm_suspend_key_trns" value="%{getEscText('suspend_key')}"/>
<ps:set name="bpm_resume_key_trns" value="%{getEscText('resume_key')}"/>
<ps:set name="bpm_comments_key_trns" value="%{getEscText('Comments_key')}"/>
<ps:set name="bpm_admin_logs_key_trns" value="%{getEscText('admin_logs_key')}"/>
<ps:set name="bpm_actions_key_trns" value="%{getEscText('actions_key')}"/>
<ps:set name="bpm_preview_image_trns" value="%{getEscText('Preview_image_key')}"/>
<ps:set name="bpm_documents_key_trns" value="%{getEscText('documents_key')}"/>


<script type="text/javascript">
	$.struts2_jquery.require("BpmList.js" ,null,"${pageContext.request.contextPath}/common/js/bpm/");
	var bpm_release_key_trns = "${bpm_release_key_trns}";
	var bpm_complete_key_trns = "${bpm_complete_key_trns}";
	var bpm_claim_key_trns = "${bpm_claim_key_trns}";
	var bpm_open_key_trns = "${bpm_open_key_trns}";
	var bpm_confirm_complete_task_trns = "${bpm_confirm_complete_task_trns}";
	var bpm_forward_key_trns = "${bpm_forward_key_trns}";
	var bpm_human_task_form_trns = "${bpm_human_task_form_trns}";
	var bpm_suspend_key_trns = "${bpm_suspend_key_trns}";
	var bpm_resume_key_trns = "${bpm_resume_key_trns}";
	var bpm_comments_key_trns = "${bpm_comments_key_trns}";
	var bpm_admin_logs_key_trns = "${bpm_admin_logs_key_trns}";
	var bpm_actions_key_trns = "${bpm_actions_key_trns}";
	var bpm_preview_image_trns = "${bpm_preview_image_trns}";
	var bpm_documents_key_trns = "${bpm_documents_key_trns}";
</script>

<ps:hidden id="bpmUserTasksGrid_type" value="%{bpmCO.type}" ></ps:hidden>

<ps:url id="bpmUserTasksUrl" action="BpmGrid_loadUserTasksGrid"	namespace="/path/bpm" escapeAmp="false">
</ps:url>

<ps:url id="bpmProcessInstanceTasksUrl" action="BpmGrid_loadProcessInstanceTasksGrid"	namespace="/path/bpm" escapeAmp="false">
	<ps:param name="bpmSC.processId" value="%{bpmCO.processInstanceId}"/>
</ps:url>

<psjg:grid id="bpmUserTasksGrid_Id_${bpmCO.type}"					
		href='%{ ( bpmCO.type != null && "procInst".equals(bpmCO.type) ) ? #bpmProcessInstanceTasksUrl : #bpmUserTasksUrl }' 
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
		shrinkToFit="false"  
		onGridCompleteTopics="bpmUserTasksGrid_Id_CompleteTopics"
		onCompleteTopics="bpmUserTasksGrid_Id_afterCompleteTopics"
		>
		 
		<psjg:gridColumn id="bpmUserTasksGrid_taskId_${bpmCO.type}" colType="number"
			name="taskId" index="TASK_ID"
			title="%{getText('task_id_key')}"
			editable="false" sortable="true" search="true"  
		/>
		 
		<psjg:gridColumn name="PROCESS_INSTANCE_ID" 
       				    index="PROCESS_INSTANCE_ID" 
       				    title="%{getText('process_instance_id_key')}" 
       				    id="processInstanceIdImageLink_${bpmCO.type}"
       				    align="center"
					    colType="text"        
					    editable="false"       
					    sortable="true" 
					    search="true" 
					    formatter="bpmUserTasksGrid_Id_InstanceImageBtnFormatter" width="200"/>
		
		
		<psjg:gridColumn id="bpmUserTasksGrid_addComment_${bpmCO.type}" colType="text"
			name="addComment" index="addComment"
			title="" hidden="true" 
		/>
		<psjg:gridColumn id="bpmUserTasksGrid_deleteComment_${bpmCO.type}" colType="text"
			name="deleteComment" index="deleteComment"
			title="" hidden="true" 
		/>
		<psjg:gridColumn id="bpmUserTasksGrid_updateComment_${bpmCO.type}" colType="text"
			name="updateComment" index="updateComment"
			title="" hidden="true" 
		/>
		<psjg:gridColumn id="bpmUserTasksGrid_highlightColor_${bpmCO.type}" colType="text"
			name="highlightColor" index="highlightColor"
			title="" hidden="true" 
		/>
		
		<psjg:gridColumn id="bpmUserTasksGrid_taskName_${bpmCO.type}" colType="text"
			name="taskName" index="TASK_NAME"
			title="%{getText('task_name_key')}"
			editable="false" sortable="true" search="true"  
		/>
		
		<psjg:gridColumn id="bpmUserTasksGrid_taskDesc_${bpmCO.type}" colType="text"
			name="taskDesc" index="TASK_DESC"
			title="%{getText('Description_key')}"
			editable="false" sortable="true" search="true" 
		/>
		
		<psjg:gridColumn id="bpmUserTasksGrid_taskStatus_${bpmCO.type}" colType="text"
			name="taskStatus" index="TASK_STATUS"
			title="%{getText('Status_Key')}"
			editable="false" sortable="true" search="true" 
		/>
		
		<psjg:gridColumn id="bpmUserTasksGrid_taskPriority_${bpmCO.type}" colType="text"
			name="priority" index="TASK_PRIORITY_DESC"
			title="%{getText('priority_key')}"
			editable="false" sortable="true" search="true" 
		/>
		
		<psjg:gridColumn id="bpmUserTasksGrid_taskOwner_${bpmCO.type}" colType="text"
			name="taskOwner" index="TASK_OWNER"
			title="%{getText('Owner_key')}"
			editable="false" sortable="true" search="true" 
		/>
		
		<psjg:gridColumn id="bpmUserTasksGrid_taskCreationDate_${bpmCO.type}" colType="date"
			name="taskCreationDate" index="TASK_CREATION_DATE"
			title="%{getText('date_created_key')}"
			editable="false" sortable="true" sorttype="date" searchType="date"  search="false" formatter="date" searchoptions="{sopt:['eq']}" formatoptions="{srcformat:'Y-m-d H:i:s.u',newformat:'d/m/Y H:i:s' }"
		/>
		
		<psjg:gridColumn id="bpmUserTasksGrid_taskExpirationDate_${bpmCO.type}" colType="date"
			name="taskExpirationDate" index="TASK_EXPIRATION_DATE"
			title="%{getText('Expiration_Date_key')}"
			editable="false" sortable="true" sorttype="date" searchType="date"  search="false" formatter="date" searchoptions="{sopt:['eq']}" formatoptions="{srcformat:'Y-m-d H:i:s.u',newformat:'d/m/Y H:i:s' }" 
		/>
		
		<psjg:gridColumn id="bpmUserTasksGrid_processId_${bpmCO.type}" colType="text"
			name="processId" index="PROCESS_ID"
			title="%{getText('Process_key')}"
			editable="false" sortable="true" search="true" 
		/>
		
		<psjg:gridColumn name="" 
       				    index="" 
       				    title="%{getText('actions_key')}" 
       				    id="btnId_${bpmCO.type}"
       				    align="center"
					    colType="text"        
					    editable="false"       
					    sortable="false" 
					    search="false"
					    formatter="bpmUserTasksGrid_Id_BtnFormatter" width="100"/>
		
			
</psjg:grid>	


<script type="text/javascript">
 	$("#bpmUserTasksGrid_Id_${bpmCO.type}").subscribe("bpmUserTasksGrid_Id_CompleteTopics",function(){
		 bpmUserTasksGrid_Id_CompleteTopics('${bpmCO.type}');
	});
	// we hide progress bar at the level of complete topics(after loading) to avoid clicking the same action twice
 	$("#bpmUserTasksGrid_Id_${bpmCO.type}").subscribe("bpmUserTasksGrid_Id_afterCompleteTopics",function(){
 		_showProgressBar(false);	
 	});
	
	var taskGridRefreshTime = '${TaskGridRefreshTime}';
	if(taskGridRefreshTime != '' && !isNaN(taskGridRefreshTime))
	{
		var taskGridRefreshTimeValue = parseInt(taskGridRefreshTime);
		if(taskGridRefreshTimeValue > 0)
		{
			setInterval(function(){ $("#bpmUserTasksGrid_Id_user").trigger("reloadGrid"); }, taskGridRefreshTimeValue * 1000);
		}
	}
</script>
		