<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>

<script type="text/javascript">
	$.struts2_jquery.require("BpmList.js" ,null,"${pageContext.request.contextPath}/common/js/bpm/");
</script>

<ps:url id="bpmTaskAssignUrl" action="BpmGrid_loadUserTaskAssignGrid"	namespace="/path/bpm" escapeAmp="false">
	<ps:param name="bpmSC.taskMapId" value="%{bpmCO.taskMapId}"/>
</ps:url>

<ps:form id="bpmUsrTaskAssignForm_Id" useHiddenProps="true" cssStyle="width:100%;">	

<ps:hidden id="bpmUsertaskAssignGrid_taskMapId" name="bpmCO.taskMapId" ></ps:hidden>
<ps:hidden id="bpmUsertaskAssignGrid_initiatorDesc" name="bpmCO.bpmTaskMappingCO.fieldDesc" ></ps:hidden>

<psjg:grid id="bpmUsertaskAssignGrid_Id"					
		href="%{bpmTaskAssignUrl}" 
		dataType="json"
		hiddengrid="false"
		pager="true"
		pagerButtons="false"
		altRows="false"
		filter="true"
		gridModel="gridModel"
		viewrecords="false"
		navigator="true"
		height="120"
		navigatorRefresh="true"
		navigatorEdit="false"
		navigatorSearch="false"
		navigatorAdd="true"
		navigatorDelete="true"
		sortable="true"
		onEditInlineBeforeTopics="bpmTaskAssign_onRowSelTopic"
		addfunc="bpmTaskAssign_addAssignmentGrid"
		delfunc="bpmTaskAssign_deleteAssignmentGrid"
		editinline="true"
		editurl="abc"
		>
		
		<psjg:gridColumn id="bpmUsertaskAssignGrid_TASK_MAP_ID" colType="number"
				name="taskAssignVO.TASK_MAP_ID" index="TASK_MAP_ID"
				title="" hidden="true"
		/>
		
		<psjg:gridColumn id="bpmUsertaskAssignGrid_ENTITY_TYPE" colType="number"
			name="taskAssignVO.ENTITY_TYPE" index="ENTITY_TYPE"
			title="" hidden="true" 
		/>
		
		<psjg:gridColumn name="assignmentTypeDesc" title="%{getText('Type_Key')}" index="ASSIGNMENT_TYPE_DESC" 
			search="true" editable="true" sortable="true" id="bpmUsertaskAssignGrid_assignmentTypeDesc" 
			width="170"
			edittype="select" colType="select" 
			editoptions="{value:function() {  return loadCombo('${pageContext.request.contextPath}/path/bpm/BpmMaint_loadAssignmentTypeSelect','assignmentTypeList', 'code', 'descValue');}
						,dataEvents: [{ type: 'change', fn: function() {bpmUsertaskAssignGrid_AssignmentTypeChanged()} }]}"
			/>	
				
		<psjg:gridColumn id="bpmUsertaskAssignGrid_ENTITY_NAME" colType="liveSearch"
						name="taskAssignVO.ENTITY_NAME" index="ENTITY_NAME"
						title="%{getText('Name_key')}" editable="true" sortable="true"
						search="true" reConstruct="true"
						paramList="taskAssignmentType:taskAssignVO.ENTITY_TYPE" 
						dataAction="${pageContext.request.contextPath}/path/bpm/BpmLookupAction_constructTaskAssignmentLookup"
						resultList="USER_ID:taskAssignVO.ENTITY_NAME_lookuptxt"
						searchElement="ENTITY_NAME"
						editoptions="{ maxlength:'8' }" required="true"
						
						dependencySrc="${pageContext.request.contextPath}/path/bpm/BpmMaint_dependencyByTaskAssignment"
						params="bpmTaskMappingCO.taskAssignVO.ENTITY_NAME:taskAssignVO.ENTITY_NAME_lookuptxt,bpmTaskMappingCO.taskAssignVO.ENTITY_TYPE:taskAssignVO.ENTITY_TYPE"
						dependency="bpmCO.bpmTaskMappingCO.taskAssignVO.ENTITY_NAME:taskAssignVO.ENTITY_NAME_lookuptxt" 

						/>	
		
		
			
</psjg:grid>	

</ps:form>

<script type="text/javascript">
	$.subscribe("bpmTaskAssign_onRowSelTopic",function(rowObj){bpmTaskAssign_onRowSelTopic(rowObj);});
</script>	 		