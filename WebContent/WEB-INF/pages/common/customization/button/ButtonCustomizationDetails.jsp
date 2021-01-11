<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@taglib prefix="pt" uri="/path-toolbar-tags"%>
<ps:set name="file_png_ext_key" value="%{getEscText('file_png_ext_key')}"/>
<script>
		var file_png_ext_key = '<ps:property value="file_png_ext_key" escapeHtml="false" escapeJavaScript="true"/>';
</script>


<ps:form id="buttonCustomizationDetailsForm_${_pageRef}" useHiddenProps="true">	
	<ps:hidden id="sysParamBtnCustVO_TOOLBAR_ID_${_pageRef}" name="buttonCustomizationCO.sysParamBtnCustVO.TOOLBAR_ID"/>
	<ps:hidden id="sysParamBtnCustVO_APP_NAME_${_pageRef}" name="buttonCustomizationCO.sysParamBtnCustVO.APP_NAME"></ps:hidden>
	<ps:hidden id="globalOperationMode_${_pageRef}" name="buttonCustomizationCO.globalOperationMode"></ps:hidden>
	<ps:hidden id="buttonCustomizationCO_gridUpdate_${_pageRef}" name="buttonCustomizationCO.gridUpdate"></ps:hidden>
	
	<div>
		<table border="0" width="100%">
			
			<tr>
				<td width="10%">
					<ps:label id="lbl_sysParamBtnCustVO_BTN_ID_${_pageRef}" 
							  for="sysParamBtnCustVO_BTN_ID_${_pageRef}"
							  value='%{!"true".equals(buttonCustomizationCO.globalOperationMode) ? getText("Button_id_key") : getText("activity_id_key") }' cssStyle="padding-left: 8px;" />
				</td>
				<td width="20%">
					<ps:textfield id="sysParamBtnCustVO_BTN_ID_${_pageRef}" 
								  name="buttonCustomizationCO.sysParamBtnCustVO.BTN_ID" 
								  mode="number" readonly="true" />
				</td>
				
				<td width="10%">
					<ps:label id="lbl_sysParamBtnCustVO_PROG_REF_${_pageRef}" 
							  for="sysParamBtnCustVO_PROG_REF_${_pageRef}"
							  value="%{getText('progRef')}" cssStyle="padding-left: 8px;" />
				</td>
				<td width="20%">
					<ps:textfield id="sysParamBtnCustVO_PROG_REF_${_pageRef}" 
								  name="buttonCustomizationCO.sysParamBtnCustVO.PROG_REF" 
								  mode="text" readonly="true" />
				</td>
				<ps:if test='%{!"true".equals(buttonCustomizationCO.globalOperationMode)}'>
					<td width="30%" colspan="2">
						<table>
							<tr>
								<td>
									<ps:checkbox name="buttonCustomizationCO.sysParamBtnCustVO.APPLY_FORM_VALIDATION_YN"
										id="sysParamBtnCustVO_APPLY_FORM_VALIDATION_YN_${_pageRef}" valOpt="1:0" />
								</td>
								<td>
									<ps:label key="Form_validation_key"
										id="lbl_sysParamBtnCustVO_APPLY_FORM_VALIDATION_YN_${_pageRef}"
										for="sysParamBtnCustVO_APPLY_FORM_VALIDATION_YN_${_pageRef}"></ps:label>
								</td>
							</tr>
						</table>
					</td>
				</ps:if>
				
			</tr>
			<tr>
				<ps:if test='%{!"true".equals(buttonCustomizationCO.globalOperationMode)}'>
					<td width="10%">
						<ps:label id="lbl_sysParamBtnCustVO_LABEL_KEY_${_pageRef}" 
								  for="lookuptxt_sysParamBtnCustVO_LABEL_KEY_${_pageRef}"
								  key="label_key" cssStyle="padding-left: 8px;"/>
					</td>
					<td width="20%">
						<table>
							<tr>
								<td>
									<psj:livesearch id="sysParamBtnCustVO_LABEL_KEY_${_pageRef}"
										 name="buttonCustomizationCO.sysParamBtnCustVO.LABEL_KEY"
										 actionName="${pageContext.request.contextPath}/pathdesktop/TranslationLookup_labelKeyLookup"
										 resultList="sysParamKeyLabelVO.KEY_LABEL_CODE:lookuptxt_sysParamBtnCustVO_LABEL_KEY_${_pageRef},sysParamKeyLabelVO.KEY_LABEL_DESC:labeling_KEY_LABEL_DESC_${_pageRef}"
										 paramList="translationSC.selectedApp:3"
										 searchElement="KEY_LABEL_CODE" autoSearch="false" maxlength="15"
										 dependencySrc="${pageContext.request.contextPath}/pathdesktop/TranslationDependencyAction_labelKeyDep"
										 parameter="translationSC.selectedApp:3,translationSC.labelKey:lookuptxt_sysParamBtnCustVO_LABEL_KEY_${_pageRef}"
										 dependency="lookuptxt_sysParamBtnCustVO_LABEL_KEY_${_pageRef}:translationCO.sysParamKeyLabelVO.KEY_LABEL_CODE,labeling_KEY_LABEL_DESC_${_pageRef}:translationCO.sysParamKeyLabelVO.KEY_LABEL_DESC"
										 required="true" 
									/>	  
								</td>
								<td>
					      			<ps:textfield id="labeling_KEY_LABEL_DESC_${_pageRef}" value="%{getText(buttonCustomizationCO.sysParamBtnCustVO.LABEL_KEY)}" readonly="true" />
								</td>
							</tr>
						</table>
					</td>
					
					<td width="10%">
						<ps:label id="lbl_sysParamBtnCustVO_BTN_ORDER_${_pageRef}" 
								  for="sysParamBtnCustVO_BTN_ORDER_${_pageRef}"
								  key="reporting.order" cssStyle="padding-left: 8px;" />
					</td>
					<td width="20%">
						<ps:textfield id="sysParamBtnCustVO_BTN_ORDER_${_pageRef}" 
									  name="buttonCustomizationCO.sysParamBtnCustVO.BTN_ORDER" 
									  mode="number" maxlength="2" />
					</td>
				</ps:if>
				<td width="10%">
					<ps:label id="lbl_sysParamBtnCustVO_DESCRIPTION_${_pageRef}" 
							  for="sysParamBtnCustVO_DESCRIPTION_${_pageRef}"
							  key="Description_key" cssStyle="padding-left: 8px;"  />
				</td>
				<td width="20%">
					<ps:textfield id="sysParamBtnCustVO_DESCRIPTION_${_pageRef}" 
								  name="buttonCustomizationCO.sysParamBtnCustVO.DESCRIPTION" 
								  mode="text" maxlength="200"/>
				</td>
				
			</tr>
			<tr>
			
				<td width="10%">
					<ps:label id="lbl_sysParamBtnCustVO_RESULT_EXPR_${_pageRef}" 
							  for="sysParamBtnCustVO_RESULT_EXPR_${_pageRef}"
							  key="Result_exp_key" cssStyle="padding-left: 8px;"/>
				</td>
				<td colspan="3">
					<ps:textarea id="sysParamBtnCustVO_RESULT_EXPR_${_pageRef}" 
								 name="buttonCustomizationCO.sysParamBtnCustVO.RESULT_EXPR"
					             maxlength="1000" cols="80" rows="5" cssStyle="width:99%"></ps:textarea>
				</td>
				<td width="10%">
					<ps:label id="lbl_sysParamBtnCustVO_ACCESS_PROG_REF_${_pageRef}" 
							  for="sysParamBtnCustVO_ACCESS_PROG_REF_${_pageRef}"
							  key="Access_ProgRef_key" cssStyle="padding-left: 8px;"/>
				</td>
				<td width="20%">
					<ps:hidden   id="buttonCustomizationCO_currentAccessProgRef_${_pageRef}"
								 name="buttonCustomizationCO.currentAccessProgRef"></ps:hidden>
					<ps:textfield id="sysParamBtnCustVO_ACCESS_PROG_REF_${_pageRef}" 
								  name="buttonCustomizationCO.sysParamBtnCustVO.ACCESS_PROG_REF" 
								  mode="text" maxlength="15"
								  dependencySrc="${pageContext.request.contextPath}/path/buttoncustomization/ButtonCustomizationMaint_dependencyByAccessProgRef.action?_pageRef=${_pageRef}"
								  parameter="buttonCustomizationCO.sysParamBtnCustVO.ACCESS_PROG_REF:sysParamBtnCustVO_ACCESS_PROG_REF_${_pageRef}"
								  dependency="sysParamBtnCustVO_ACCESS_PROG_REF_${_pageRef}:buttonCustomizationCO.sysParamBtnCustVO.ACCESS_PROG_REF"
								  />
				</td>
			</tr>
		<ps:if test='%{!"true".equals(buttonCustomizationCO.globalOperationMode)}'>
			<tr>
			<table>
				<tr>
					<td>
						<ps:label key="choose_icon_key" />
					</td>
					<td>&nbsp;</td>
					<td>
						<ps:if test='%{buttonCustomizationCO.sysParamBtnCustVO.ICON_IMAGE != null}'>
							<img class='ui-button-icon-primary ui-icon' style="background:none;" src="../path/buttoncustomization/ButtonCustomizationMaint_returnIconImage?buttonCustomizationCO.sysParamBtnCustVO.BTN_ID=${buttonCustomizationCO.sysParamBtnCustVO.BTN_ID}&date=<%=System.currentTimeMillis()%>"/>
						</ps:if>
					</td>
					<td>&nbsp;</td>
					<td>
						<ps:file  id="buttonCustomizationCO_buttonCustFile_${_pageRef}" onchange="buttonCustomizationCO_checkIconValidation()" name="uploadFile" />
					</td>
				</tr>
			</table>
			</tr>
		</ps:if>
		</table>
	</div>
	<div id="buttonCustomizationActionsDiv_<ps:property value="_pageRef" escapeHtml="true"/>" style="width:99%;">
		<jsp:include page="ButtonCustomizationActions.jsp"/>  
	</div>
	<div id="buttonCustomizationOutputMapDiv_<ps:property value="_pageRef" escapeHtml="true"/>" style="width:99%;">
		<jsp:include page="ButtonCustomizationOutputMap.jsp"/>  
	</div>
</ps:form>
