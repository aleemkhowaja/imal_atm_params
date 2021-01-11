<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>

<% 
	/* request attribut is used to be able to use %{#request.rowId} */
	request.setAttribute("rowId",request.getParameter("rowId"));
%>
		
<table>
	<tr>
		<%
		    /* Screen Element Mapping */
		%>
		<ps:if test='%{@com.path.bo.common.bpm.BpmEngineConstant$MAP_TYPE@SCREEN.equals(bpmTaskMappingCOList[${param.rowId}].taskMapArgOutVO.MAP_TYPE)}'>
			<td>
				<psj:livesearch
					id="bpmSourceMapScreenValue${param.rowId}"
					name="bpmTaskMappingCOList[%{#request.rowId}].taskMapArgOutVO.FLD_IDENTIFIER"
					mode="number" maxlength="6"
					paramList="criteria.progRef:bpmTaskOutput_ProgRef,criteria.currAppName:bpmTaskOutput_AppName"
					resultList="FLD_IDENTIFIER:lookuptxt_bpmSourceMapScreenValue${param.rowId},FIELD_KEY_LABEL_CODE:bpmSourceMapScreenValueDesc${param.rowId}"
					actionName="${pageContext.request.contextPath}/path/buttoncustomization/ButtonCustomizationLookupAction_constructScreenElementLookup"
					searchElement="FLD_IDENTIFIER" autoSearch="true"
					dependencySrc="${pageContext.request.contextPath}/path/buttoncustomization/ButtonCustomizationMaint_dependencyByScreenElementMap.action"
					dependency="lookuptxt_bpmSourceMapScreenValue${param.rowId}:buttonCustomizationCO.sysParamActionArgMapVO.MAP_VALUE, bpmSourceMapScreenValueDesc${param.rowId}:buttonCustomizationCO.sysParamBtnCustVO.DESCRIPTION"
					parameter="buttonCustomizationCO.sysParamActionArgMapVO.MAP_VALUE:lookuptxt_bpmSourceMapScreenValue${param.rowId},buttonCustomizationCO.sysParamBtnCustVO.PROG_REF:bpmTaskOutput_ProgRef,buttonCustomizationCO.sysParamBtnCustVO.APP_NAME:bpmTaskOutput_AppName">
				</psj:livesearch>
			</td>
			<td>
				<ps:textfield
					id="bpmSourceMapScreenValueDesc${param.rowId}"
					name="bpmTaskMappingCOList[%{#request.rowId}].fieldDesc" readonly="true"></ps:textfield>
			</td>
		</ps:if>

		<% 
		    /* Session Mapping */
		%> 
		<ps:elseif test='%{@com.path.bo.common.bpm.BpmEngineConstant$MAP_TYPE@SESSION.equals(bpmTaskMappingCOList[${param.rowId}].taskMapArgOutVO.MAP_TYPE)}'>
			<td>
				<psj:livesearch 
					id="bpmSourceMapSessionValue${param.rowId}"
					name="bpmTaskMappingCOList[%{#request.rowId}].taskMapArgOutVO.MAP_VALUE"
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
		<ps:elseif test='%{@com.path.bo.common.bpm.BpmEngineConstant$MAP_TYPE@CONSTANT.equals(bpmTaskMappingCOList[${param.rowId}].taskMapArgOutVO.MAP_TYPE)}'>
			<td>
				<ps:textfield
						id="bpmSourceMapConstantValue${param.rowId}"
						name="bpmTaskMappingCOList[%{#request.rowId}].taskMapArgOutVO.MAP_VALUE" maxlength="255"
						mode="text">
				</ps:textfield>
			</td>
		</ps:elseif>
	</tr>
</table> 
