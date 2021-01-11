<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>

<script type="text/javascript">
	var currentPageRef = '<ps:property value="_pageRef" escapeHtml="false" escapeJavaScript="true"/>';
	$.struts2_jquery.require("ButtonCustomization.js" ,null,jQuery.contextPath+"/common/js/customization/button/");
</script>

<ps:hidden id="buttonCustomization_appName_${_pageRef}" value="${sysParamBtnCustVO.APP_NAME}"></ps:hidden>
<ps:hidden id="buttonCustomization_progRef_${_pageRef}" value="${_pageRef}"></ps:hidden>
<ps:hidden id="buttonCustomization_toolBarId_${_pageRef}" value="${sysParamBtnCustVO.TOOLBAR_ID}"></ps:hidden>
<ps:hidden id="buttonCustomization_globalOperationMode_${_pageRef}" value="${buttonCustomizationCO.globalOperationMode}"></ps:hidden>

<ps:hidden id='parameterGridData_${_pageRef}' name='dynScreenGridRestCO.parameterGridData' />
<ps:hidden id='parameterOutGridData_${_pageRef}' name='dynScreenGridRestCO.parameterOutGridData' />
<ps:hidden id='restOperationOutArgName_${_pageRef}' name='dynScreenCreatorCO.restOperationOutArgName' />
	 
	 
<ps:form id="globalActivityCustMaintForm_${_pageRef}" applyChangeTrack="true">

	<table border="0" cellpadding="1" cellspacing="0" width="100%">
		<tr>
			<td>
				<ps:label id="lbl_globalActivityId_${_pageRef}" key="globalactivity_key" for="globalActivityId_${_pageRef}" required="true"></ps:label>
			</td>
			<td>
				<psj:livesearch id="globalActivityId_${_pageRef}" mode="number"
							 name="dynScreenGridRestCO.globalActivityId"						
							 actionName="${pageContext.request.contextPath}/path/screenGenerator/generatorLookupAction_loadGlobalActivityGrid"							 
							 resultList="globalActivityId:lookuptxt_globalActivityId_${_pageRef},globalActivityDesc:globalActivityDesc_${_pageRef}"							 
							 searchElement="globalActivityId" 
							 autoSearch="true" 
							 maxlength="5"	
							 required="true"						 
							 dependencySrc="${pageContext.request.contextPath}/path/screenGenerator/screenGeneratorDepAction_dependencyByGlobalActivityId"
							 parameter="criteria.globalActivityId:lookuptxt_globalActivityId_${_pageRef}"
							 dependency="lookuptxt_globalActivityId_${_pageRef}:dynScreenCreatorCO.globalActivityId,globalActivityDesc_${_pageRef}:dynScreenCreatorCO.globalActivityDesc"
							 afterDepEvent="screenGeneratorProp_afterDepOnGlobalActivity"								 
						/>
			</td>
			<td width="69%">
				<ps:textfield id="globalActivityDesc_${_pageRef}"
	                         name="dynScreenCreatorCO.globalActivityDesc"
	                         required="false" 
	                         readonly="true"
	                         cssStyle="width:255px;"/>
			</td>
		</tr>
	</table>
	<div id="globalActivity_param_grid_div_${_pageRef}">
		<jsp:include page="GlobalActivityParamGrid.jsp"/>
	</div>		
	<table border="0" cellpadding="1" cellspacing="0" width="100%">
		<tr>
			<td>
				<ps:label id="lbl_restOperationId_${_pageRef}" key="restoperationid_key" for="restOperationId_${_pageRef}" required="true"></ps:label>
			</td>
			<td>
				<psj:livesearch id="restOperationId_${_pageRef}" mode="number"
							 name="dynScreenGridRestCO.restOperationId"
							 paramList="criteria.buttonId:lookuptxt_globalActivityId_${_pageRef},criteria.globalParamMap:true,criteria.actionType:R"						
							 actionName="${pageContext.request.contextPath}/path/screenGenerator/generatorLookupAction_loadRestOperation"							 
							 resultList="restOperationId:lookuptxt_restOperationId_${_pageRef},restOperationDesc:restOperationDesc_${_pageRef}"							 
							 searchElement="restOperationId" 
							 autoSearch="true" 
							 maxlength="5"
							 required="true"							 
							 dependencySrc="${pageContext.request.contextPath}/path/screenGenerator/screenGeneratorDepAction_dependencyByRestOperationId"
							 parameter="criteria.restOperationId:lookuptxt_restOperationId_${_pageRef},criteria.buttonId:lookuptxt_globalActivityId_${_pageRef}	"
							 dependency="lookuptxt_restOperationId_${_pageRef}:dynScreenCreatorCO.restOperationId,restOperationDesc_${_pageRef}:dynScreenCreatorCO.restOperationDesc"
							 afterDepEvent="screenGeneratorProp_afterDepOnOutParameter"							 
						/>
			</td>
			<td>
				<ps:textfield id="restOperationDesc_${_pageRef}"
	                         name="dynScreenCreatorCO.restOperationDesc" 
	                         required="false" 
	                         readonly="true"
	                         cssStyle="width:255px;"/>
			</td>
		</tr>
		<tr>
			<td>
				<ps:label id="lbl_OperationOutParameter_${_pageRef}" key="operationoutparameter_key" for="operationOutParameter_${_pageRef}" required="true"></ps:label>
			</td>
			<td>
				<psj:livesearch id="operationOutParameter_${_pageRef}" mode="number"
							 name="dynScreenGridRestCO.operationOutParameter"
							 paramList="criteria.buttonId:lookuptxt_globalActivityId_${_pageRef},criteria.globalParamMap:true,criteria.mapDirection:O,restOperationId:lookuptxt_restOperationId_${_pageRef}"
							 actionName="${pageContext.request.contextPath}/path/screenGenerator/generatorLookupAction_loadOperationOutParameter"							 
							 resultList="operationOutParameter:lookuptxt_operationOutParameter_${_pageRef},operationOutParameterDesc:operationOutParameterDesc_${_pageRef}"							 
							 searchElement="operationOutParameter" 
							 autoSearch="true" 
							 maxlength="5"
							 required="true"							 
							 dependencySrc="${pageContext.request.contextPath}/path/screenGenerator/screenGeneratorDepAction_dependencyByOperationOutParameter"
							 parameter="criteria.operationOutParameter:lookuptxt_operationOutParameter_${_pageRef},criteria.buttonId:lookuptxt_globalActivityId_${_pageRef},criteria.restOperationId:lookuptxt_restOperationId_${_pageRef}"
							 dependency="lookuptxt_operationOutParameter_${_pageRef}:dynScreenCreatorCO.operationOutParameter,operationOutParameterDesc_${_pageRef}:dynScreenCreatorCO.operationOutParameterDesc,restOperationOutArgName_${_pageRef}:dynScreenCreatorCO.restOperationOutArgName"							 
						/>
			</td>
			<td width="76%">
				<ps:textfield id="operationOutParameterDesc_${_pageRef}"
	                         name="dynScreenCreatorCO.operationOutParameterDesc" 
	                         required="false" 
	                         readonly="true"
	                         cssStyle="width:255px;"/>
			</td>
		</tr> 
		</table>
		
		<table border="0" cellpadding="1" cellspacing="0" width="30%">
		<ps:if test="%{@com.path.bo.common.ConstantsCommon@PROPERTY_CODE_QUERY.equals(criteria.propertyCode)}">
		  	 <div id="globalActivity_column_grid_div_${_pageRef}">
				<%@include file="GlobalActivityColumnGrid.jsp"%>
			</div>
		 </ps:if> 
	 	<ps:else> 
	 		<tr>
		     <td>
		        <ps:label id="lbl_codeProperty_${_pageRef}" for="codeProperty_${_pageRef}" key="code_property_key">
		        </ps:label>
		     </td>
		     <td>
		        <ps:textfield id="codeProperty_${_pageRef}" name="dynScreenGridRestCO.columnCode" required="true">
		        </ps:textfield>
		     </td>
		 </tr>
		 <tr>
		     <td>
		        <ps:label id="lbl_propertyDesc_${_pageRef}" for="propertyDesc_${_pageRef}" key="property_description_key">
		        </ps:label>
		     </td>
		     <td width="63%">
		        <ps:textfield id="propertyDesc_${_pageRef}" name="dynScreenGridRestCO.columnDesc" required="true">
		        </ps:textfield>
		     </td>
		 </tr>
	 	</ps:else>
	</table>
</ps:form>


