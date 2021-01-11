<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>

<ps:set name="input_mapping_key_trans" value="%{getEscText('input_mapping_key')}"/>
<ps:set name="output_mapping_key_trans" value="%{getEscText('output_mapping_key')}"/>
<ps:set name="assignment_key_trans" value="%{getEscText('Assignment_key')}"/>
<ps:set name="task_assignment_exist_trans" value="%{getEscText('Task_assignment_exist_key')}"/>

<script type="text/javascript">
	$.struts2_jquery.require("BpmMaint.js,BpmList.js" ,null,"${pageContext.request.contextPath}/common/js/bpm/");
	var input_mapping_key_trans = "${input_mapping_key_trans}";
	var output_mapping_key_trans = "${output_mapping_key_trans}";
	var assignment_key_trans = "${assignment_key_trans}";
	var task_assignment_exist_trans = "${task_assignment_exist_trans}";
</script>
<ps:url id="bpmUsrTaskMappingUrl" action="BpmGrid_loadUserTaskMappingGrid"	namespace="/path/bpm" escapeAmp="false">
	<ps:param name="bpmSC.processId" value="%{bpmCO.processId}"/>
</ps:url>

<ps:form id="bpmUsrTaskMappingForm_Id" useHiddenProps="true" cssStyle="width:100%;">	
	
	<ps:hidden id="bpmUsrTaskMappingGrid_processId" name="bpmCO.processId" ></ps:hidden>
	
	<psjg:grid id="bpmUsrTaskMappingGrid_Id"					
			href="%{bpmUsrTaskMappingUrl}" 
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
			navigatorAdd="false" 
			navigatorDelete="false" 
			navigatorEdit="false" 
			shrinkToFit="true"  
			editinline="true"
			editurl="dummy"
			onCellSelectTopics="bpmUserTaskMappingList_Id_onCellSelectTopics"
			>
			
			<psjg:gridColumn id="bpmUsrTaskMappingGrid_TASK_MAP_ID" colType="number"
				name="taskMapVO.TASK_MAP_ID" index="TASK_MAP_ID"
				title="" hidden="true"
			/>
			
			<psjg:gridColumn id="bpmUsrTaskMappingGrid_PROCESS_DEF_ID" colType="text"
				name="procDefVO.PROCESS_DEF_ID" index="PROCESS_DEF_ID"
				title="" hidden="true"
			/>
			
			
			<psjg:gridColumn id="bpmUsrTaskMappingGrid_APP_NAME" colType="text"
				name="screenDefVO.APP_NAME" index="APP_NAME"
				title="" hidden="true"
			/>
			
			<psjg:gridColumn id="bpmUsrTaskMappingGrid_PROCESS_NAME" colType="text"
				name="procDefVO.PROCESS_NAME" index="PROCESS_NAME"
				title="%{getText('Process_key')}"
				editable="false" sortable="true" search="true" 
			/>
			
			<psjg:gridColumn id="bpmUsrTaskMappingGrid_TASK_NAME" colType="text"
				name="taskMapVO.TASK_NAME" index="TASK_NAME"
				title="%{getText('task_name_key')}"
				editable="false" sortable="true" search="true" 
			/>
				
			<psjg:gridColumn name="actionTypeDesc" title="%{getText('Action_type_key')}" index="actionTypeDesc" 
			search="true" editable="true" sortable="false" id="bpmUsrTaskMappingGrid_actionTypeDesc" 
			width="170"
			edittype="select" colType="select" 
			editoptions="{value:function() {  return loadCombo('${pageContext.request.contextPath}/path/bpm/BpmMaint_loadActionTypeSelect','actionTypeList', 'code', 'descValue');}
						,dataEvents: [{ type: 'change', fn: function() {bpmUsrTaskMappingGrid_actionTypeChanged()} }]}"
			/>	
			
			<psjg:gridColumn id="bpmUsrTaskMappingGrid_SCREEN_CODE" colType="liveSearch"
				name="taskMapVO.SCREEN_CODE" index="SCREEN_CODE"
				title="%{getText('screen_code_key')}" editable="true" sortable="true" search="true" 
				editoptions="{ maxlength:'30' }"
				paramList="actionType:taskMapVO.ACTION_TYPE" 
				dataAction="${pageContext.request.contextPath}/path/bpm/BpmLookupAction_constructScreenDefLookup"
				resultList="PROG_REF:taskMapVO.PROG_REF,SCREEN_CODE:taskMapVO.SCREEN_CODE_lookuptxt,SCREEN_DESC:screenDefVO.SCREEN_DESC,APP_NAME:screenDefVO.APP_NAME"
				reConstruct="true"
				dependencySrc="${pageContext.request.contextPath}/path/bpm/BpmMaint_dependencyByScreenCode"
				params="bpmCO.bpmTaskMappingCO.taskMapVO.SCREEN_CODE:taskMapVO.SCREEN_CODE_lookuptxt,bpmCO.bpmTaskMappingCO.taskMapVO.PROG_REF:taskMapVO.PROG_REF,bpmCO.bpmTaskMappingCO.taskMapVO.ACTION_TYPE:taskMapVO.ACTION_TYPE"
				dependency="bpmCO.bpmTaskMappingCO.taskMapVO.SCREEN_CODE:taskMapVO.SCREEN_CODE_lookuptxt,bpmCO.bpmTaskMappingCO.screenDefVO.SCREEN_DESC:screenDefVO.SCREEN_DESC,bpmCO.bpmTaskMappingCO.taskMapVO.PROG_REF:taskMapVO.PROG_REF"
			/>
			
			
			<psjg:gridColumn id="bpmUsrTaskMappingGrid_SCREEN_DESC" colType="text"
				name="screenDefVO.SCREEN_DESC" index="SCREEN_DESC"
				title="%{getText('Description_key')}"
				editable="false" sortable="false" search="false" 
			/>
			
			<psjg:gridColumn id="bpmUsrTaskMappingGrid_PROG_REF" colType="text"
				name="taskMapVO.PROG_REF" index="PROG_REF"
				title="%{getText('prog_ref_key')}" editable="false"
			/>
			
			<psjg:gridColumn id="bpmUsrTaskMappingGrid_COMPLETION_TYPE" colType="text"
				name="taskMapVO.COMPLETION_TYPE" index="COMPLETION_TYPE"
				title="" hidden="true" 
			/>
			
			<psjg:gridColumn id="bpmUsrTaskMappingGrid_ACTION_TYPE" colType="text"
				name="taskMapVO.ACTION_TYPE" index="ACTION_TYPE"
				title="" hidden="true" 
			/>
			
			<psjg:gridColumn name="completionTypeDesc" title="%{getText('Completion_Type_Key')}" index="completionTypeDesc" 
				search="true" editable="true" sortable="false" id="bpmUsrTaskMappingGrid_completionTypeDesc" 
				width="170"
				edittype="select" colType="select" 
				editoptions="{value:function() {  return loadCombo('${pageContext.request.contextPath}/path/bpm/BpmMaint_loadCompletionTypeSelect','completionTypeList', 'code', 'descValue');}
						,dataEvents: [{ type: 'change', fn: function() {bpmUsrTaskMappingGrid_CompletionTypeChanged()} }]}"
			/>
			
			
			<psjg:gridColumn id="bpmUsrTaskMappingGrid_PRIORITY" colType="text"
				name="taskMapVO.PRIORITY" index="PRIORITY"
				title="" hidden="true" 
			/>
			
			<psjg:gridColumn name="taskPriorityDesc" title="%{getText('priority_key')}" index="taskPriorityDesc" 
				search="true" editable="true" sortable="false" id="bpmUsrTaskMappingGrid_priorityDesc" 
				width="170"
				edittype="select" colType="select" 
				editoptions="{value:function() {  return loadCombo('${pageContext.request.contextPath}/path/bpm/BpmMaint_loadTaskPrioritySelect','taskPriorityList', 'code', 'descValue');}
						,dataEvents: [{ type: 'change', fn: function() {bpmUsrTaskMappingGrid_TaskPriorityChanged()} }]}"
			/>
			
			<psjg:gridColumn name="" 
	       				    index="" 
	       				    title="%{getText('actions_key')}" 
	       				    id="bpmUsrTaskMappingGrid_btnId"
	       				    align="center"
						    colType="custom"        
						    editable="false"       
						    sortable="false" 
						    search="false" 
						    formatter="bpmUsrTaskMappingGrid_Id_BtnFormatter" width="250"
						    unformat="bpmUsrTaskMappingGrid_Id_BtnUnFormatter"/>
						    
				
	</psjg:grid>	
	
	<table>
		<tr>
			<td>
				<psj:submit button="true" onclick="bpmProcessMapping_saveScreenMapping()" type="button" buttonIcon="ui-icon-play">
					<ps:label key="Save_key" />
				</psj:submit>
			</td>
		</tr>
	</table>		

<script type="text/javascript">

	$("#bpmUsrTaskMappingGrid_Id").subscribe("bpmUserTaskMappingList_Id_onCellSelectTopics",function(){
		bpmUsrTaskMappingGrid_adjustActionTypeResultList();
	});
</script>
</ps:form>