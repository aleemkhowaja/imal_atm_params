<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>

<script type="text/javascript">
	$.struts2_jquery.require("BpmMaint.js" ,null,"${pageContext.request.contextPath}/common/js/bpm/");
</script>

<div id="bpmTaskForwardDiv" style="width=90%;height=90%;">
	<ps:form id="bpmTaskForwardForm_Id" useHiddenProps="true" cssStyle="width:100%;">	
		
		<ps:hidden id="bpmTaskForwardForm_entityType" value="1" ></ps:hidden>
		<ps:hidden id="bpmTaskForwardForm_bpmTaskId" name="bpmCO.bpmTaskId" ></ps:hidden>
		
		<ps:hidden id="bpmTaskForwardForm_screenProgRef" name="bpmCO.bpmTaskMappingCO.screenDefVO.PROG_REF" ></ps:hidden>
		<ps:hidden id="bpmTaskForwardForm_screenAppName" name="bpmCO.bpmTaskMappingCO.screenDefVO.APP_NAME" ></ps:hidden>
		
		<br/>
		<table width="100%">
				 <tr>
					<td width="25%">
				  		<ps:label id="label_bpmTaskForwardForm_entityName" key="User_Id_key" for="lookuptxt_bpmTaskForwardForm_entityName"/> 
				  	</td>
					<td width="50%">
						<psj:livesearch 	mode="text" 
							  name="bpmTaskMappingCO.taskAssignVO.ENTITY_NAME"				                      
				              id  ="bpmTaskForwardForm_entityName"				                      
				              resultList="USER_ID:lookuptxt_bpmTaskForwardForm_entityName"
				              actionName="${pageContext.request.contextPath}/path/bpm/BpmLookupAction_constructTaskAssignmentLookup"
				              paramList="taskAssignmentType:bpmTaskForwardForm_entityType,excludeLoggedInUser:'true',currAppName:bpmTaskForwardForm_screenAppName,screenCode:bpmTaskForwardForm_screenProgRef" 
				              searchElement="ENTITY_NAME"				                     
				              required="true"
				              autoSearch="true"
				              maxlength="8"
				              parameter="bpmTaskMappingCO.taskAssignVO.ENTITY_NAME:lookuptxt_bpmTaskForwardForm_entityName,bpmTaskMappingCO.taskAssignVO.ENTITY_TYPE:bpmTaskForwardForm_entityType,excludeLoggedInUser:'true',appName:bpmTaskForwardForm_screenAppName,progRef:bpmTaskForwardForm_screenProgRef"
				           	  dependencySrc="${pageContext.request.contextPath}/path/bpm/BpmMaint_dependencyByTaskAssignment"
				           	  dependency="lookuptxt_bpmTaskForwardForm_entityName:bpmCO.bpmTaskMappingCO.taskAssignVO.ENTITY_NAME"
				           	/>
					</td> 
					<td width="25%"> 
						<psj:submit  button="true" freezeOnSubmit="true">
		 					<ps:text name="forward.btn"></ps:text>
		 				</psj:submit>
					</td>
				
			</tr>
		</table>
	</ps:form>
</div>

<script type="text/javascript">
$(document).ready(function (){
	$("#bpmTaskForwardForm_Id").processAfterValid("bpmMaint_forwardTask",[]);
})
</script>