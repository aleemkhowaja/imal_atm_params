<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>

<ps:set name="bpm_cannot_delete_record_key_trns" value="%{getEscText('Cannot_delete_record_key')}"/>
<ps:set name="save_before_proceeding_key_trns" value="%{getEscText('please_save_changes_before_proceeding')}"/>

<script type="text/javascript">
	$.struts2_jquery.require("BpmMaint.js,BpmList.js" ,null,"${pageContext.request.contextPath}/common/js/bpm/");
	var bpm_cannot_delete_record_key_trns = "${bpm_cannot_delete_record_key_trns}";
	var save_before_proceeding_key_trns = "${save_before_proceeding_key_trns}";
</script>
<ps:url id="bpmLogsUrl" action="BpmGrid_loadBpmLogsGrid" namespace="/path/bpm" escapeAmp="false">
	<ps:param name="bpmSC.entityType" 	value="%{bpmCO.bpmTaskMappingCO.logsVO.ENTITY_TYPE}"/>
	<ps:param name="bpmSC.entityId" 	value="%{bpmCO.bpmTaskId}"/>
	<ps:param name="bpmSC.actionType" 	value="%{bpmCO.bpmTaskMappingCO.logsVO.ACTION_TYPE}"/>
	<ps:param name="bpmSC.actionTypes" 	value="%{bpmCO.actionTypes}"/>
</ps:url>

<ps:form id="bpmLogsForm_Id" useHiddenProps="true" cssStyle="width:99%;height:99%;">	
	
	<ps:hidden id="bpmLogsGrid_userId" value="%{#session.sesVO.userName}" ></ps:hidden>
	<ps:hidden id="bpmLogsGrid_entityType" value="%{bpmCO.bpmTaskMappingCO.logsVO.ENTITY_TYPE}" ></ps:hidden>
	<ps:hidden id="bpmLogsGrid_entityId" value="%{bpmCO.bpmTaskId}" ></ps:hidden>
	<ps:hidden id="bpmLogsGrid_actionType" value="%{bpmCO.bpmTaskMappingCO.logsVO.ACTION_TYPE}" ></ps:hidden>
	<ps:hidden id="enableUpdateComment" value="%{bpmCO.enableUpdateComment}" ></ps:hidden>

	<psjg:grid id="bpmLogsGrid_Id"					
			href="%{bpmLogsUrl}" 
			dataType="json"
			hiddengrid="false"
			pager="true"
			pagerButtons="false"
			altRows="false"
			filter="true"
			gridModel="gridModel"
			viewrecords="false"
			navigator="true"
			height="150"
			navigatorRefresh="true"
			navigatorEdit="false"
			navigatorSearch="false"
			navigatorAdd="%{bpmCO.enableAddComment}"
			navigatorDelete="%{bpmCO.enableDeleteComment}"
			sortable="true"
			addfunc="bpmLogs_addNewLogGrid"
			delfunc="bpmLogs_deleteNewLogGrid"
			onEditInlineBeforeTopics="bpmLogs_onRowSelTopic"
			editinline="true"
			editurl="dummy"
			>
			
			<psjg:gridColumn id="bpmUserTasksGrid_logId" colType="number"
				name="logsVO.LOG_ID" index="LOG_ID"
				title="" hidden="true" 
			/>
			
			<psjg:gridColumn id="bpmUserTasksGrid_entityId" colType="number"
				name="logsVO.ENTITY_ID" index="ENTITY_ID"
				title="" hidden="true" 
			/>
			
			<psjg:gridColumn id="bpmUserTasksGrid_entityType" colType="text"
				name="logsVO.ENTITY_TYPE" index="ENTITY_TYPE"
				title="" hidden="true" 
			/>
			
			<psjg:gridColumn id="bpmUserTasksGrid_logId" colType="text"
				name="logsVO.ACTION_TYPE" index="ACTION_TYPE"
				title="" hidden="true" 
			/>
			
			<psjg:gridColumn id="bpmUserTasksGrid_actionTypeDesc" colType="text"
				name="actionTypeDesc" index="ACTION_TYPE_DESC"
				title="%{getText('Action_type_key')}" hidden="%{bpmCO.hideActionTypeInLogsGrid}" 
			/>
			
			<psjg:gridColumn id="bpmUserTasksGrid_taskName" colType="date"
				name="logsVO.CREATED_DATE" index="CREATED_DATE"
				title="%{getText('Date_key')}"
				editable="false" sortable="true" sorttype="date" searchType="date"  search="false" formatter="date" searchoptions="{sopt:['eq']}" formatoptions="{srcformat:'Y-m-d H:i:s.u',newformat:'d/m/Y H:i:s' }" 
			/>
		
			<psjg:gridColumn id="bpmUserTasksGrid_taskName" colType="text"
				name="logsVO.CREATED_BY" index="CREATED_BY"
				title="%{getText('User_Id_key')}"
				editable="false" sortable="true" search="true"  
			/>
		
			<psjg:gridColumn id="bpmUserTasksGrid_taskName" colType="text" edittype="textarea"
				name="logsVO.ACTION_COMMENT" index="ACTION_COMMENT"
				title="%{getText('Comments_key')}"
				editable="true" sortable="true" search="true"  
			/>
					
	</psjg:grid>	
	<ps:if test='"true".equals(bpmCO.enableAddDeleteInLogsGrid)'>
		<table>
			<tr>
				<td>
					<psj:submit button="true" onclick="bpmLogs_saveNewLogs()" type="button" buttonIcon="ui-icon-play">
						<ps:label key="Save_key" />
					</psj:submit>
				</td>
			</tr>
		</table>		
	</ps:if>

</ps:form>

<script type="text/javascript">
	$.subscribe("bpmLogs_onRowSelTopic",function(rowObj){bpmLogs_onRowSelTopic(rowObj);});
</script>	 