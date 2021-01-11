<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>

<% 
	/* request attribut is used to be able to use %{#request.rowId} */
	request.setAttribute("rowId",request.getParameter("rowId"));
%>
		
<table>
	<tr>
		<%
		    /* BPM Process Variable Mapping */
		%>
		<ps:if test='%{@com.path.bo.common.bpm.BpmEngineConstant$MAP_TYPE@BPM_PROCESS_VARIABLE.equals(bpmTaskMappingCOList[${param.rowId}].taskMapArgInVO.MAP_TYPE)}'>
			<td>
				<psj:livesearch
					id="bpmSourceMapProcVarValue${param.rowId}"
					name="bpmTaskMappingCOList[%{#request.rowId}].taskMapArgInVO.MAP_VALUE"
					mode="text" maxlength="255"
					paramList="criteria.processId:bpmUsrTaskMappingGrid_processId"
					resultList="id:lookuptxt_bpmSourceMapProcVarValue${param.rowId}"
					actionName="${pageContext.request.contextPath}/path/bpm/BpmLookupAction_constructProcessVarLookup"
					searchElement="id" autoSearch="true"
					dependencySrc="${pageContext.request.contextPath}/path/bpm/BpmMaint_dependencyByProcessVar.action"
					dependency="lookuptxt_bpmSourceMapProcVarValue${param.rowId}:bpmCO.bpmTaskMappingCO.taskMapArgInVO.MAP_VALUE"
					parameter="bpmCO.bpmTaskMappingCO.taskMapArgInVO.MAP_VALUE:lookuptxt_bpmSourceMapProcVarValue${param.rowId},bpmCO.processId:bpmUsrTaskMappingGrid_processId">
				</psj:livesearch>
			</td>
		</ps:if>

		<% 
		    /* Session Mapping */
		%> 
		<ps:elseif test='%{@com.path.bo.common.bpm.BpmEngineConstant$MAP_TYPE@SESSION.equals(bpmTaskMappingCOList[${param.rowId}].taskMapArgInVO.MAP_TYPE)}'>
			<td>
				<psj:livesearch 
					id="bpmSourceMapSessionValue${param.rowId}"
					name="bpmTaskMappingCOList[%{#request.rowId}].taskMapArgInVO.MAP_VALUE"
					mode="text" maxlength="255"
					resultList="propertyName:lookuptxt_bpmSourceMapSessionValue${param.rowId},description:bpmSourceMapSessionValueDesc${param.rowId}"
					actionName="${pageContext.request.contextPath}/path/buttoncustomization/ButtonCustomizationLookupAction_constructSessionElementLookup"
					searchElement="name" autoSearch="true"
					dependencySrc="${pageContext.request.contextPath}/path/buttoncustomization/ButtonCustomizationMaint_dependencyBySessionElementMap.action"
					dependency="lookuptxt_bpmSourceMapSessionValue${param.rowId}:buttonCustomizationCO.sysParamActionArgMapVO.MAP_VALUE,bpmSourceMapSessionValueDesc${param.rowId}:buttonCustomizationCO.fieldDesc"
					parameter="buttonCustomizationCO.sysParamActionArgMapVO.MAP_VALUE:lookuptxt_bpmSourceMapSessionValue${param.rowId}">
				</psj:livesearch>
			</td>
			<td>	
				
				<ps:textfield
					id="bpmSourceMapSessionValueDesc${param.rowId}"
					name="bpmTaskMappingCOList[%{#request.rowId}].fieldDesc" readonly="true"></ps:textfield>
			
			</td>
		</ps:elseif>

		<%
		    /* Constant Mapping */
		%>
		<ps:elseif test='%{@com.path.bo.common.bpm.BpmEngineConstant$MAP_TYPE@CONSTANT.equals(bpmTaskMappingCOList[${param.rowId}].taskMapArgInVO.MAP_TYPE)}'>
			<td>
				<ps:textfield
						id="bpmSourceMapConstantValue${param.rowId}"
						name="bpmTaskMappingCOList[%{#request.rowId}].taskMapArgInVO.MAP_VALUE" maxlength="255"
						mode="text">
				</ps:textfield>
			</td>
		</ps:elseif>
	</tr>
</table> 
