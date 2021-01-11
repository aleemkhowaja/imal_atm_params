<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>

<% 
	/* request attribut is used to be able to use %{#request.rowId} */
	request.setAttribute("rowId",request.getParameter("rowId"));
	Object mapValue = request.getAttribute("argumentsList["+request.getAttribute("rowId")+"].sysParamActionArgMapVO.MAP_VALUE");
%>
		
<table>
	<tr>
		<%
		    /* Screen Mapping */
		%>
		<ps:if test='%{@com.path.vo.common.customization.button.ButtonCustomizationConstants$MAP_TYPE@SCREEN.equals(argumentsList[${param.rowId}].sysParamActionArgMapVO.MAP_TYPE)}'>
			<td>
				<psj:livesearch
					id="btnCustSourceMapScreenValue${param.rowId}_${_pageRef}"
					name="argumentsList[%{#request.rowId}].sysParamActionArgMapVO.MAP_VALUE"
					mode="number" maxlength="6"
					resultList="FLD_IDENTIFIER:lookuptxt_btnCustSourceMapScreenValue${param.rowId}_${_pageRef},FIELD_KEY_LABEL_CODE:btnCustSourceMapScreenValueDesc${param.rowId}_${_pageRef}"
					actionName="${pageContext.request.contextPath}/path/buttoncustomization/ButtonCustomizationLookupAction_constructScreenElementLookup?_pageRef=${_pageRef}"
					searchElement="FLD_IDENTIFIER" autoSearch="true"
					dependencySrc="${pageContext.request.contextPath}/path/buttoncustomization/ButtonCustomizationMaint_dependencyByScreenElementMap.action?_pageRef=${_pageRef}"
					dependency="lookuptxt_btnCustSourceMapScreenValue${param.rowId}_${_pageRef}:buttonCustomizationCO.sysParamActionArgMapVO.MAP_VALUE, btnCustSourceMapScreenValueDesc${param.rowId}_${_pageRef}:buttonCustomizationCO.sysParamBtnCustVO.DESCRIPTION"
					parameter="buttonCustomizationCO.sysParamActionArgMapVO.MAP_VALUE:lookuptxt_btnCustSourceMapScreenValue${param.rowId}_${_pageRef}">
				</psj:livesearch>
			</td>
			<td>
				<ps:textfield
					id="btnCustSourceMapScreenValueDesc${param.rowId}_${_pageRef}"
					name="argumentsList[%{#request.rowId}].fieldDesc" readonly="true"></ps:textfield>
			</td>
		</ps:if>

		<% 
		    /* Session Mapping */
		%> 
		<ps:elseif test='%{@com.path.vo.common.customization.button.ButtonCustomizationConstants$MAP_TYPE@SESSION.equals(argumentsList[${param.rowId}].sysParamActionArgMapVO.MAP_TYPE)}'>
			<td>
				<psj:livesearch 
					id="btnCustSourceMapSessionValue${param.rowId}_${_pageRef}"
					name="argumentsList[%{#request.rowId}].sysParamActionArgMapVO.MAP_VALUE"
					mode="text" maxlength="200"
					resultList="propertyName:lookuptxt_btnCustSourceMapSessionValue${param.rowId}_${_pageRef},description:btnCustSourceMapSessionValueDesc${param.rowId}_${_pageRef}"
					actionName="${pageContext.request.contextPath}/path/buttoncustomization/ButtonCustomizationLookupAction_constructSessionElementLookup?_pageRef=${_pageRef}"
					searchElement="name" autoSearch="true"
					dependencySrc="${pageContext.request.contextPath}/path/buttoncustomization/ButtonCustomizationMaint_dependencyBySessionElementMap.action?_pageRef=${_pageRef}"
					dependency="lookuptxt_btnCustSourceMapSessionValue${param.rowId}_${_pageRef}:buttonCustomizationCO.sysParamActionArgMapVO.MAP_VALUE,btnCustSourceMapSessionValueDesc${param.rowId}_${_pageRef}:buttonCustomizationCO.fieldDesc"
					parameter="buttonCustomizationCO.sysParamActionArgMapVO.MAP_VALUE:lookuptxt_btnCustSourceMapSessionValue${param.rowId}_${_pageRef},buttonCustomizationCO.imApiArgumentVO.ARG_TYPE:btnCustLinkButtonType${param.rowId}_${_pageRef}">
				</psj:livesearch>
			</td>
			<td>	
				
				<ps:textfield
					id="btnCustSourceMapSessionValueDesc${param.rowId}_${_pageRef}"
					name="argumentsList[%{#request.rowId}].fieldDesc" readonly="true"></ps:textfield>
			
			</td>
		</ps:elseif>

		<%
		    /* Constant Mapping */
		%>
		<ps:elseif test='%{@com.path.vo.common.customization.button.ButtonCustomizationConstants$MAP_TYPE@CONSTANT.equals(argumentsList[${param.rowId}].sysParamActionArgMapVO.MAP_TYPE)}'>
			<td>
				<ps:if test='%{@com.path.vo.common.customization.button.ButtonCustomizationConstants$ARG_TYPE@NUMBER.equals(argumentsList[${param.rowId}].imApiArgumentVO.ARG_TYPE)}'>
					
					<ps:textfield
						id="btnCustSourceMapConstantValue${param.rowId}_${_pageRef}"
						name="argumentsList[%{#request.rowId}].sysParamActionArgMapVO.MAP_VALUE" maxlength="200"
						mode="number"
						dependencySrc="${pageContext.request.contextPath}/path/buttoncustomization/ButtonCustomizationMaint_dependencyByConstantMapping.action?_pageRef=${_pageRef}"
						dependency="btnCustSourceMapConstantValue${param.rowId}_${_pageRef}:buttonCustomizationCO.sysParamActionArgMapVO.MAP_VALUE"
						parameter="buttonCustomizationCO.imApiArgumentVO.ARG_TYPE:btnCustLinkButtonType${param.rowId}_${_pageRef},buttonCustomizationCO.sysParamActionArgMapVO.MAP_VALUE:btnCustSourceMapConstantValue${param.rowId}_${_pageRef}">
					</ps:textfield>
					
				</ps:if>
				<ps:elseif test='%{@com.path.vo.common.customization.button.ButtonCustomizationConstants$ARG_TYPE@VARCHAR.equals(argumentsList[${param.rowId}].imApiArgumentVO.ARG_TYPE)}'>
					
					<ps:textfield
						id="btnCustSourceMapConstantValue${param.rowId}_${_pageRef}"
						name="argumentsList[%{#request.rowId}].sysParamActionArgMapVO.MAP_VALUE" maxlength="200"
						mode="text"
						dependencySrc="${pageContext.request.contextPath}/path/buttoncustomization/ButtonCustomizationMaint_dependencyByConstantMapping.action?_pageRef=${_pageRef}"
						dependency="btnCustSourceMapConstantValue${param.rowId}_${_pageRef}:buttonCustomizationCO.sysParamActionArgMapVO.MAP_VALUE"
						parameter="buttonCustomizationCO.imApiArgumentVO.ARG_TYPE:btnCustLinkButtonType${param.rowId}_${_pageRef},buttonCustomizationCO.sysParamActionArgMapVO.MAP_VALUE:btnCustSourceMapConstantValue${param.rowId}_${_pageRef}">
					</ps:textfield>
					
				</ps:elseif>
				
				<ps:elseif test='%{@com.path.vo.common.customization.button.ButtonCustomizationConstants$ARG_TYPE@DATE_DATETIME.equals(argumentsList[${param.rowId}].imApiArgumentVO.ARG_TYPE)}'>
					
					<psj:datepicker
						id="btnCustSourceMapConstantValue${param.rowId}_${_pageRef}"
						name="argumentsList[%{#request.rowId}].sysParamActionArgMapVO.MAP_VALUE"
						buttonImageOnly="true">
					</psj:datepicker>
			
				</ps:elseif>
				
			</td>
		</ps:elseif>

		<%
		    /* Link Mapping */
		%>
		<ps:elseif test='%{@com.path.vo.common.customization.button.ButtonCustomizationConstants$MAP_TYPE@LINK.equals(argumentsList[${param.rowId}].sysParamActionArgMapVO.MAP_TYPE)}'>
			<td>
				<table>
					<tr>
						<td>
							<ps:hidden id="btnCustLinkApiCode${param.rowId}_${_pageRef}"
									   name="argumentsList[%{#request.rowId}].sysParamActionArgMapVO.LINK_API_CODE"></ps:hidden>
						
							<psj:livesearch 
								id="btnCustLinkAction${param.rowId}_${_pageRef}"
								name="argumentsList[%{#request.rowId}].sysParamActionArgMapVO.LINK_OP_ID"
								mode="number" maxlength="6"
								paramList="buttonId:buttonCustomizationAction_btnId_${_pageRef},linkToPreviousAction:~CONST_1,operationId:sysParamBtnCustActionsVO_OP_ID_${_pageRef}"
								resultList="REPORT_PROG_REF:lookuptxt_btnCustLinkAction${param.rowId}_${_pageRef},imImalApiVO.DESCRIPTION:btnCustLinkActionDesc${param.rowId}_${_pageRef}"
								actionName="${pageContext.request.contextPath}/path/buttoncustomization/ButtonCustomizationLookupAction_constructActionsLookup?_pageRef=${_pageRef}"
								searchElement="name" autoSearch="true"
								
								dependencySrc="${pageContext.request.contextPath}/path/buttoncustomization/ButtonCustomizationMaint_dependencyByActionCode.action?_pageRef=${_pageRef}"
								dependency="lookuptxt_btnCustLinkAction${param.rowId}_${_pageRef}:buttonCustomizationCO.sysParamBtnCustActionsVO.API_CODE,
											lookuptxt_btnCustLinkArg${param.rowId}_${_pageRef}:buttonCustomizationCO.sysParamActionArgMapVO.ARG_ID,
											btnCustLinkActionDesc${param.rowId}_${_pageRef}:buttonCustomizationCO.imImalApiVO.DESCRIPTION,
											btnCustLinkButtonDesc${param.rowId}_${_pageRef}:buttonCustomizationCO.argDesc,
											btnCustLinkApiCode${param.rowId}_${_pageRef}:buttonCustomizationCO.sysParamActionArgMapVO.LINK_API_CODE"
								parameter="buttonCustomizationCO.sysParamBtnCustActionsVO.OP_ID:sysParamBtnCustActionsVO_OP_ID_${_pageRef},buttonCustomizationCO.sysParamBtnCustActionsVO.API_CODE:lookuptxt_btnCustLinkAction${param.rowId}_${_pageRef},buttonCustomizationCO.apiCodeValue:lookuptxt_btnCustLinkAction${param.rowId}_${_pageRef},buttonCustomizationCO.sysParamBtnCustActionsVO.BTN_ID:buttonCustomizationAction_btnId_${_pageRef},buttonCustomizationCO.linkToPreviousAction:~CONST_1">
							
							</psj:livesearch>
						</td>
						<td>
							<ps:textfield
								id="btnCustLinkActionDesc${param.rowId}_${_pageRef}"
								name="argumentsList[%{#request.rowId}].actionDesc" readonly="true"></ps:textfield>
						</td>
					</tr>
				</table>
			</td>
			
			<td>
				<table>
					<tr>
						<td>			
							<psj:livesearch 
								id="btnCustLinkArg${param.rowId}_${_pageRef}"
								name="argumentsList[%{#request.rowId}].sysParamActionArgMapVO.LINK_ARG_ID"
								mode="number" maxlength="6"
								
								paramList="operationId:lookuptxt_btnCustLinkAction${param.rowId}_${_pageRef},argType:btnCustLinkButtonType${param.rowId}_${_pageRef},buttonId:buttonCustomizationAction_btnId_${_pageRef}"
								resultList="imApiArgumentVO.ARG_ID:lookuptxt_btnCustLinkArg${param.rowId}_${_pageRef}"
								actionName="${pageContext.request.contextPath}/path/buttoncustomization/ButtonCustomizationLookupAction_constructArgLookup?_pageRef=${_pageRef}"
								searchElement="name" autoSearch="true"
								
								dependencySrc="${pageContext.request.contextPath}/path/buttoncustomization/ButtonCustomizationMaint_dependencyByLinkArg.action?_pageRef=${_pageRef}"
								dependency="lookuptxt_btnCustLinkArg${param.rowId}_${_pageRef}:buttonCustomizationCO.sysParamActionArgMapVO.ARG_ID,btnCustLinkButtonDesc${param.rowId}_${_pageRef}:buttonCustomizationCO.imApiArgumentVO.DESCRIPTION"
								parameter="buttonCustomizationCO.sysParamActionArgMapVO.ARG_ID:lookuptxt_btnCustLinkArg${param.rowId}_${_pageRef},
										   buttonCustomizationCO.sysParamActionArgMapVO.OP_ID:lookuptxt_btnCustLinkAction${param.rowId}_${_pageRef},
										   buttonCustomizationCO.imApiArgumentVO.ARG_TYPE:btnCustLinkButtonType${param.rowId}_${_pageRef},
										   buttonCustomizationCO.sysParamBtnCustActionsVO.BTN_ID:buttonCustomizationAction_btnId_${_pageRef}">
							
							</psj:livesearch>
						</td>
						<td>
							<ps:textfield
								id="btnCustLinkButtonDesc${param.rowId}_${_pageRef}"
								name="argumentsList[%{#request.rowId}].argDesc" readonly="true"></ps:textfield>
						</td>
					</tr>
				</table>	
			</td>
			
		</ps:elseif>
		
		<%
		    /* Map Mapping */
		%>
		<ps:elseif test='%{@com.path.vo.common.customization.button.ButtonCustomizationConstants$MAP_TYPE@MAP.equals(argumentsList[${param.rowId}].sysParamActionArgMapVO.MAP_TYPE)}'>
		  <td>
		 	<ps:label key="nested_key" />
		   <ps:checkbox name="argumentsList[%{#request.rowId}].sysParamActionArgMapVO.NESTED"
										id="btnCustNested${param.rowId}_${_pageRef}" valOpt="1:0" />
			<ps:label key="defaultmapping_key" />
		   <ps:checkbox onclick="hideMapValue('${param.rowId}_${_pageRef}')" name="argumentsList[%{#request.rowId}].sysParamActionArgMapVO.defaultMapping"
										id="btnCustDefaultMapping${param.rowId}_${_pageRef}" valOpt="1:0" />
		  </td>
		  <td>
			<ps:textfield
				id="btnCustSourceMapValue${param.rowId}_${_pageRef}"
				name="argumentsList[%{#request.rowId}].sysParamActionArgMapVO.MAP_VALUE" maxlength="200"
				mode="text"
				dependencySrc=""
				dependency=""
				parameter="">
			</ps:textfield>
			<%if (mapValue==null){%>
			<ps:hidden type="hidden" id="idPageRef" value="btnCustDefaultMapping${param.rowId}_${_pageRef}"/>
			<script type="text/javascript">
				$("#"+document.getElementById("idPageRef").value)[0].checked = true;
				$("#"+document.getElementById("idPageRef").value).trigger("click");
				$("#"+document.getElementById("idPageRef").value)[0].checked = true;
				$("#idPageRef").remove();
			</script>
			<%}%>
		</td>
		</ps:elseif>
		<%
		    /* List Mapping */
		%>
		<ps:elseif test='%{@com.path.vo.common.customization.button.ButtonCustomizationConstants$MAP_TYPE@LIST.equals(argumentsList[${param.rowId}].sysParamActionArgMapVO.MAP_TYPE)}'>
		  <td>
			<psj:submit button="true"
				onclick="buttonCustArgListGrid_openListGrid(${param.rowId})" type="button"
				buttonIcon="ui-icon-open">
				<ps:label key="parameters_key" />
			</psj:submit>
			<div id="listMappingGrid_id_${_pageRef}" style="display: none;">
			</div>
		  </td>
		</ps:elseif>
		<%
		    /* Expression Mapping */
		%>
		<ps:elseif test='%{@com.path.vo.common.customization.button.ButtonCustomizationConstants$MAP_TYPE@EXPRESSION.equals(argumentsList[${param.rowId}].sysParamActionArgMapVO.MAP_TYPE)}'>
		  <td>
			<ps:textarea
				id="btnCustSourceExpressionValue_${param.rowId}_${_pageRef}"
				name="argumentsList[%{#request.rowId}].sysParamActionArgMapVO.MAP_EXPRESSION" maxlength="1000"
				mode="text"
				cols="85" rows="3">
			</ps:textarea>
		  </td>
		  <script type="text/javascript">
		  buttonCustomizationActions_applyAutoComplete('btnCustSourceExpressionValue_${param.rowId}_<ps:property value="_pageRef" escapeHtml="false" escapeJavaScript="true"/>',expression_btn_cond_tags);
		</script>
		</ps:elseif>
	</tr>
</table> 
