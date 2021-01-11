<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>


<script type="text/javascript">
	$.struts2_jquery.require("BpmMaint.js,BpmList.js" ,null,"${pageContext.request.contextPath}/common/js/bpm/");
</script>
<ps:url id="bpmProcessAccessRightUrl" action="BpmGrid_loadProcessAccessRightGrid"	namespace="/path/bpm" escapeAmp="false">
	<ps:param name="bpmSC.processId" value="%{bpmCO.processId}"/>
</ps:url>

<ps:form id="bpmProcessAccessRightForm_Id" useHiddenProps="true" cssStyle="width:100%;">	
	
	<ps:hidden id="bpmProcessAccessRightGrid_processId" name="bpmCO.processId" ></ps:hidden>
	
	<psjg:grid id="bpmProcessAccessRightGrid_Id"					
			href="%{bpmProcessAccessRightUrl}" 
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
			addfunc="bpmProcessAccessRight_addAccessGrid"
			delfunc="bpmProcessAccessRight_deleteAccessGrid"
			onEditInlineBeforeTopics="bpmProcessAccessRight_onRowSelTopic"
			editinline="true"
			editurl="abc"
			>
			
			<psjg:gridColumn id="bpmProcessAccessRightGrid_PROCESS_ID" colType="number"
				name="accessRightVO.PROCESS_ID" index="PROCESS_ID"
				title="" hidden="true"
			/>
			
			<psjg:gridColumn id="bpmProcessAccessRightGrid_ENTITY_TYPE" colType="text"
				name="accessRightVO.ENTITY_TYPE" index="ENTITY_TYPE"
				title="" hidden="true"
			/>
			
			
			<psjg:gridColumn name="assignmentTypeDesc" title="%{getText('Type_Key')}" index="ASSIGNMENT_TYPE_DESC" 
			search="true" editable="true" sortable="true" id="bpmProcessAccessRightGrid_assignmentTypeDesc" 
			width="100"
			edittype="select" colType="select" 
			editoptions="{value:function() {  return loadCombo('${pageContext.request.contextPath}/path/bpm/BpmMaint_loadAccessRightAssignmentTypeSelect','accessRightAssignmentTypeList', 'code', 'descValue');}
						,dataEvents: [{ type: 'change', fn: function() {bpmProcessAccessRight_AssignmentTypeChanged()} }]}"
			/>	
				
			<psjg:gridColumn id="bpmProcessAccessRightGrid_ENTITY_NAME" colType="liveSearch"
						name="accessRightVO.ENTITY_NAME" index="ENTITY_NAME"
						title="%{getText('Name_key')}" editable="true" sortable="true"
						search="true" reConstruct="true"
						paramList="taskAssignmentType:accessRightVO.ENTITY_TYPE" 
						dataAction="${pageContext.request.contextPath}/path/bpm/BpmLookupAction_constructTaskAssignmentLookup"
						resultList="USER_ID:accessRightVO.ENTITY_NAME_lookuptxt"
						searchElement="ENTITY_NAME"
						editoptions="{ maxlength:'8' }" required="true"
						
						dependencySrc="${pageContext.request.contextPath}/path/bpm/BpmMaint_dependencyByTaskAssignment"
						params="bpmTaskMappingCO.taskAssignVO.ENTITY_NAME:accessRightVO.ENTITY_NAME_lookuptxt,bpmTaskMappingCO.taskAssignVO.ENTITY_TYPE:accessRightVO.ENTITY_TYPE"
						dependency="bpmCO.bpmTaskMappingCO.taskAssignVO.ENTITY_NAME:accessRightVO.ENTITY_NAME_lookuptxt" 

						/>	
			
			
			
			<psjg:gridColumn id="bpmProcessAccessRightGrid_START_INSTANCE_YN" 
				name="accessRightVO.START_INSTANCE_YN" index="START_INSTANCE_YN"
				title="%{getText('Start_Instance_Key')}" 
				colType="checkbox" 
				edittype="checkbox"
				formatter="checkbox"
				editable="true"
				sortable="true" 
				search="true" 
				width="50" 
				editoptions="{value:'1:0',align:'middle', dataEvents: [{ type: 'change', fn: function(e) {}}]}"
				align="center"
				searchoptions="{sopt:['eq']}"
				formatoptions="{disabled:false}"
			/>
			
			<psjg:gridColumn id="bpmProcessAccessRightGrid_SHOW_PROCESS_IMAGE_YN" 
				name="accessRightVO.SHOW_PROCESS_IMAGE_YN" index="SHOW_PROCESS_IMAGE_YN"
				title="%{getText('Show_Process_Image_Key')}" 
				colType="checkbox" 
				edittype="checkbox"
				formatter="checkbox"
				editable="true"
				sortable="true" 
				search="true" 
				width="50" 
				editoptions="{value:'1:0',align:'middle', dataEvents: [{ type: 'change', fn: function(e) {}}]}"
				align="center"
				searchoptions="{sopt:['eq']}"
				formatoptions="{disabled:false}"
			/>
			
			<psjg:gridColumn id="bpmProcessAccessRightGrid_SHOW_INSTANCE_IMAGE_YN" 
				name="accessRightVO.SHOW_INSTANCE_IMAGE_YN" index="SHOW_INSTANCE_IMAGE_YN"
				title="%{getText('Show_Instance_Image_Key')}" 
				colType="checkbox" 
				edittype="checkbox"
				formatter="checkbox"
				editable="true"
				sortable="true" 
				search="true" 
				width="50" 
				editoptions="{value:'1:0',align:'middle', dataEvents: [{ type: 'change', fn: function(e) {}}]}"
				align="center"
				searchoptions="{sopt:['eq']}"
				formatoptions="{disabled:false}"
			/>
			
			<psjg:gridColumn id="bpmProcessAccessRightGrid_SHOW_EXPORT_DOC_YN"
				name="accessRightVO.SHOW_EXPORT_DOC_YN" index="SHOW_EXPORT_DOC_YN"
				title="%{getText('export_key')}" 
				colType="checkbox" 
				edittype="checkbox"
				formatter="checkbox"
				editable="true"
				sortable="true" 
				search="true" 
				width="50" 
				editoptions="{value:'1:0',align:'middle', dataEvents: [{ type: 'change', fn: function(e) {}}]}"
				align="center"
				searchoptions="{sopt:['eq']}"
				formatoptions="{disabled:false}"
			/>
				
			<psjg:gridColumn id="bpmProcessAccessRightGrid_SHOW_ABORT_INSTANCE_YN"
				name="accessRightVO.SHOW_ABORT_INSTANCE_YN" index="SHOW_ABORT_INSTANCE_YN"
				title="%{getText('Abort_key')}" 
				colType="checkbox" 
				edittype="checkbox"
				formatter="checkbox"
				editable="true"
				sortable="true" 
				search="true" 
				width="50" 
				editoptions="{value:'1:0',align:'middle', dataEvents: [{ type: 'change', fn: function(e) {}}]}"
				align="center"
				searchoptions="{sopt:['eq']}"
				formatoptions="{disabled:false}"
			/>			    
				
			<psjg:gridColumn id="bpmProcessAccessRightGrid_START_WITH_PROC_VAR_YN"
				name="accessRightVO.START_WITH_PROC_VAR_YN" index="START_WITH_PROC_VAR_YN"
				title="%{getText('Start_With_Process_Var_key')}" 
				colType="checkbox" 
				edittype="checkbox"
				formatter="checkbox"
				editable="true"
				sortable="true" 
				search="true" 
				width="50" 
				editoptions="{value:'1:0',align:'middle', dataEvents: [{ type: 'change', fn: function(e) {}}]}"
				align="center"
				searchoptions="{sopt:['eq']}"
				formatoptions="{disabled:false}"
			/>			    
			
			<psjg:gridColumn id="bpmProcessAccessRightGrid_SHOW_SUSPEND_RESUME_YN"
				name="accessRightVO.SHOW_SUSPEND_RESUME_YN" index="SHOW_SUSPEND_RESUME_YN"
				title="%{getText('Syspend_Resume_key')}" 
				colType="checkbox" 
				edittype="checkbox"
				formatter="checkbox"
				editable="true"
				sortable="true" 
				search="true" 
				width="50" 
				editoptions="{value:'1:0',align:'middle', dataEvents: [{ type: 'change', fn: function(e) {}}]}"
				align="center"
				searchoptions="{sopt:['eq']}"
				formatoptions="{disabled:false}"
			/>
			
			<psjg:gridColumn id="bpmProcessAccessRightGrid_SHOW_TASK_ADMIN_LOGS_YN"
				name="accessRightVO.SHOW_TASK_ADMIN_LOGS_YN" index="SHOW_TASK_ADMIN_LOGS_YN"
				title="%{getText('admin_logs_key')}" 
				colType="checkbox" 
				edittype="checkbox"
				formatter="checkbox"
				editable="true"
				sortable="true" 
				search="true" 
				width="50" 
				editoptions="{value:'1:0',align:'middle', dataEvents: [{ type: 'change', fn: function(e) {}}]}"
				align="center"
				searchoptions="{sopt:['eq']}"
				formatoptions="{disabled:false}"
			/>		
			
			<psjg:gridColumn id="bpmProcessAccessRightGrid_SHOW_PROC_INST_DOC_YN"
				name="accessRightVO.SHOW_PROC_INST_DOC_YN" index="SHOW_PROC_INST_DOC_YN"
				title="%{getText('documents_key')}" 
				colType="checkbox" 
				edittype="checkbox"
				formatter="checkbox"
				editable="true"
				sortable="true" 
				search="true" 
				width="50" 
				editoptions="{value:'1:0',align:'middle', dataEvents: [{ type: 'change', fn: function(e) {}}]}"
				align="center"
				searchoptions="{sopt:['eq']}"
				formatoptions="{disabled:false}"
			/>		   	
				
			<psjg:gridColumn id="bpmProcessAccessRightGrid_SHOW_DOC_UPLOAD_YN"
				name="accessRightVO.SHOW_DOC_UPLOAD_YN" index="SHOW_DOC_UPLOAD_YN"
				title="%{getText('documents_upload_key')}" 
				colType="checkbox" 
				edittype="checkbox"
				formatter="checkbox"
				editable="true"
				sortable="true" 
				search="true" 
				width="50" 
				editoptions="{value:'1:0',align:'middle', dataEvents: [{ type: 'change', fn: function(e) {}}]}"
				align="center"
				searchoptions="{sopt:['eq']}"
				formatoptions="{disabled:false}"
			/>
			
			
			<psjg:gridColumn id="bpmProcessAccessRightGrid_SHOW_DOC_DOWNLOAD_YN"
				name="accessRightVO.SHOW_DOC_DOWNLOAD_YN" index="SHOW_DOC_DOWNLOAD_YN"
				title="%{getText('documents_download_key')}" 
				colType="checkbox" 
				edittype="checkbox"
				formatter="checkbox"
				editable="true"
				sortable="true" 
				search="true" 
				width="50" 
				editoptions="{value:'1:0',align:'middle', dataEvents: [{ type: 'change', fn: function(e) {}}]}"
				align="center"
				searchoptions="{sopt:['eq']}"
				formatoptions="{disabled:false}"
			/>
			
			<psjg:gridColumn id="bpmProcessAccessRightGrid_SHOW_DOC_DELETE_YN"
				name="accessRightVO.SHOW_DOC_DELETE_YN" index="SHOW_DOC_DELETE_YN"
				title="%{getText('documents_delete_key')}" 
				colType="checkbox" 
				edittype="checkbox"
				formatter="checkbox"
				editable="true"
				sortable="true" 
				search="true" 
				width="50" 
				editoptions="{value:'1:0',align:'middle', dataEvents: [{ type: 'change', fn: function(e) {}}]}"
				align="center"
				searchoptions="{sopt:['eq']}"
				formatoptions="{disabled:false}"
			/>
			
			<psjg:gridColumn id="bpmProcessAccessRightGrid_SHOW_FORWARD_TASK_YN"
				name="accessRightVO.SHOW_FORWARD_TASK_YN" index="SHOW_FORWARD_TASK_YN"
				title="%{getText('forward.btn')}" 
				colType="checkbox" 
				edittype="checkbox"
				formatter="checkbox"
				editable="true"
				sortable="true" 
				search="true" 
				width="50" 
				editoptions="{value:'1:0',align:'middle', dataEvents: [{ type: 'change', fn: function(e) {}}]}"
				align="center"
				searchoptions="{sopt:['eq']}"
				formatoptions="{disabled:false}"
			/>
			
			<psjg:gridColumn id="bpmProcessAccessRightGrid_SHOW_COMMENT_ADD_YN"
				name="accessRightVO.SHOW_COMMENT_ADD_YN" index="SHOW_COMMENT_ADD_YN"
				title="%{getText('comment_add_key')}" 
				colType="checkbox" 
				edittype="checkbox"
				formatter="checkbox"
				editable="true"
				sortable="true" 
				search="true" 
				width="50" 
				editoptions="{value:'1:0',align:'middle', dataEvents: [{ type: 'change', fn: function(e) {}}]}"
				align="center"
				searchoptions="{sopt:['eq']}"
				formatoptions="{disabled:false}"
			/>
			
			<psjg:gridColumn id="bpmProcessAccessRightGrid_SHOW_COMMENT_DELETE_YN"
				name="accessRightVO.SHOW_COMMENT_DELETE_YN" index="SHOW_COMMENT_DELETE_YN"
				title="%{getText('comment_delete_key')}" 
				colType="checkbox" 
				edittype="checkbox"
				formatter="checkbox"
				editable="true"
				sortable="true" 
				search="true" 
				width="50" 
				editoptions="{value:'1:0',align:'middle', dataEvents: [{ type: 'change', fn: function(e) {}}]}"
				align="center"
				searchoptions="{sopt:['eq']}"
				formatoptions="{disabled:false}"
			/>
			
			<psjg:gridColumn id="bpmProcessAccessRightGrid_SHOW_COMMENT_UPDATE_YN"
				name="accessRightVO.SHOW_COMMENT_UPDATE_YN" index="SHOW_COMMENT_UPDATE_YN"
				title="%{getText('comment_update_key')}" 
				colType="checkbox" 
				edittype="checkbox"
				formatter="checkbox"
				editable="true"
				sortable="true" 
				search="true" 
				width="50" 
				editoptions="{value:'1:0',align:'middle', dataEvents: [{ type: 'change', fn: function(e) {}}]}"
				align="center"
				searchoptions="{sopt:['eq']}"
				formatoptions="{disabled:false}"
			/>
					
	</psjg:grid>	
	
	<table>
		<tr>
			<td>
				<psj:submit button="true" onclick="bpmProcessAccessRight_saveAccessRight()" type="button" buttonIcon="ui-icon-play">
					<ps:label key="Save_key" />
				</psj:submit>
			</td>
		</tr>
	</table>		

</ps:form>

<script type="text/javascript">
	$.subscribe("bpmProcessAccessRight_onRowSelTopic",function(rowObj){bpmProcessAccessRight_onRowSelTopic(rowObj);});
</script>	 