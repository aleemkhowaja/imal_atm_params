<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@taglib prefix="pt" uri="/path-toolbar-tags"%>

<ps:form id="buttonCustActionsDetailsForm_${_pageRef}" useHiddenProps="true">	

	<ps:hidden id="sysParamBtnCustActionsVO_BTN_ID_${_pageRef}" name="sysParamBtnCustActionsVO.BTN_ID"></ps:hidden>
	<ps:hidden id="sysParamBtnCustActionsVO_OP_ID_${_pageRef}" name="sysParamBtnCustActionsVO.OP_ID"></ps:hidden>
	<ps:hidden id="sysParamBtnCustActionsVO_OP_TYPE_${_pageRef}" name="sysParamBtnCustActionsVO.OP_TYPE"></ps:hidden>
	<ps:hidden id="imImalApiVO_SERVICE_TYPE_${_pageRef}" name="imImalApiVO.SERVICE_TYPE"></ps:hidden>
	<div>
	
	<ps:if test="%{@com.path.vo.common.customization.button.ButtonCustomizationConstants$OP_TYPE@ACTION.equals(sysParamBtnCustActionsVO.OP_TYPE)}">
	  <%/* action argument mapping details*/%>
	  <ps:if test="%{@com.path.vo.common.customization.button.ButtonCustomizationConstants$API_TYPE@SCREEN.equals(imImalApiVO.SERVICE_TYPE)}">
		<div id="dynScreenParamMap_<ps:property value="_pageRef" escapeHtml="true"/>">
		</div>
	  </ps:if>	
	  <ps:else>
		<table border="0" class="ui-widget-content" width="99%">
			
			<tr>
				<td colspan="4">
					<br/>
				</td>
			</tr>
			
			<tr>
				<td>
					<ps:label id="lbl_sysParamBtnCustActionsVOActionId_${_pageRef}" 
							  for="sysParamBtnCustActionsVOActionId_${_pageRef}"
							  key="Action_id_key" />
				</td>
				<td>
				
					<ps:hidden id="sysParamBtnCustActionsVOServiceType_${_pageRef}" 
								  name="buttonCustomizationCO.imImalApiVO.SERVICE_TYPE"/>
				
					<ps:hidden id="sysParamBtnCustActionsVORepApp_${_pageRef}" 
								  name="buttonCustomizationCO.sysParamBtnCustActionsVO.REPORT_APP_NAME"/>
				
					<ps:textfield id="sysParamBtnCustActionsVOActionId_${_pageRef}" 
								  name="buttonCustomizationCO.apiCodeValue" 
								  mode="text" readonly="true" />
				</td>
				
				<td>
					
				</td>
				<td>
					
				</td>
			</tr>
			<tr>	
				<td>
					<ps:label id="lbl_imImalApiVO_SERVICE_TYPE_${_pageRef}" 
							  for="imImalApiVO_SERVICE_TYPE_${_pageRef}"
							  key="Action_type_key" />
				</td>
				<td>
					<ps:textfield id="imImalApiVO_SERVICE_TYPE_${_pageRef}" 
								  name="buttonCustomizationCO.serviceTypeDesc" 
								  mode="text" readonly="true" />
				</td>
				
				<td>
					<ps:label id="lbl_imImalApiVO_DESCRIPTION_${_pageRef}" 
							  for="imImalApiVO_DESCRIPTION_${_pageRef}"
							  key="Description_key" />
				</td>
				<td>
					<ps:textfield id="imImalApiVO_DESCRIPTION_${_pageRef}" 
								  name="buttonCustomizationCO.imImalApiVO.DESCRIPTION" 
								  mode="text" readonly="true" />
				</td>
			</tr>
			<tr>
				<td colspan="4">
					<br/>
					<fieldset>
						<div id="buttonCustActionsParamMapping_<ps:property value="_pageRef" escapeHtml="true"/>">
						</div>
					</fieldset>
				</td>
			</tr>
			
		</table>
	  </ps:else>	
	</ps:if>	
	<ps:else>
		<%/* condtion mapping details*/%>
		<ps:url id="buttonCustCondGridURL" action="ButtonCustomizationGrid_loadButtonCustomCondGrid" namespace="/path/buttoncustomization" escapeAmp="false">
			<ps:param name="criteria.buttonId" value="%{buttonCustomizationCO.sysParamBtnCustActionsVO.BTN_ID}"/>
			<ps:param name="criteria.operationId" value="%{buttonCustomizationCO.sysParamBtnCustActionsVO.OP_ID}"/>
		</ps:url>
		
		<psjg:grid id="buttonCustCondGrid_Id_${_pageRef}"
			dataType="json"
			href="%{buttonCustCondGridURL}" 
			caption="%{getText('Condition_map_key')}"
			hiddengrid="false"
			pager="true"
			pagerButtons="false"
			altRows="false"
			filter="false"
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
			addfunc="btnCustOperation_addCondGrid"
			delfunc="btnCustOperation_deleteCondGrid"
			editinline="true"
			editurl="abc">
		
			<psjg:gridColumn name="sysParamActionCondMapVO.LINE_NO" title="" index="LINE_NO" colType="number"
				hidden = "true"  id="sysParamActionCondMapVO_LINE_NO" />	
		
			<psjg:gridColumn name="sysParamActionCondMapVO.RESULT" title="%{getText('Result_key')}" index="RESULT" colType="text"
				search="true" editable="true" sortable="true" id="sysParamActionCondMapVO_RESULT" />	
	
			<psjg:gridColumn id="sysParamActionCondMapVO_RESULT_OP_ID" colType="liveSearch"
						name="sysParamActionCondMapVO.RESULT_OP_ID" index="RESULT_OP_ID"
						title="%{getText('Operation_id_key')}" editable="true" sortable="true"
						search="true" mode="number"
						paramList="buttonId:sysParamBtnCustVO_BTN_ID_${_pageRef},dependentOpId:sysParamBtnCustActionsVO_OP_ID_${_pageRef}" 
						dataAction="${pageContext.request.contextPath}/path/buttoncustomization/ButtonCustomizationLookupAction_constructOperationsLookup"
						resultList="sysParamBtnCustActionsVO.OP_ID:sysParamActionCondMapVO.RESULT_OP_ID_lookuptxt"
						searchElement="RESULT_OP_ID"
						
						dependencySrc="${pageContext.request.contextPath}/path/buttoncustomization/ButtonCustomizationMaint_dependencyByOperationId"
						params="sysParamActionCondMapVO.RESULT_OP_ID:sysParamActionCondMapVO.RESULT_OP_ID_lookuptxt,sysParamBtnCustActionsVO.OP_ID:sysParamBtnCustActionsVO_OP_ID_${_pageRef},sysParamBtnCustActionsVO.BTN_ID:sysParamBtnCustVO_BTN_ID_${_pageRef}"
						dependency="buttonCustomizationCO.sysParamActionCondMapVO.RESULT_OP_ID:sysParamActionCondMapVO.RESULT_OP_ID_lookuptxt,buttonCustomizationCO.sysParamBtnCustActionsVO.DESCRIPTION:sysParamBtnCustActionsVO.DESCRIPTION" 
						
						/>		
				
			<psjg:gridColumn name="sysParamBtnCustActionsVO.DESCRIPTION" title="%{getText('Description_key')}" index="DESCRIPTION" colType="text"
				search="true" editable="false" sortable="true" id="sysParamBtnCustActionsVO_DESCRIPTION" />		
			
		</psjg:grid>
	
	</ps:else>	
	</div>
</ps:form>

<script type="text/javascript">
	$(document).ready(function ()
	{
			_showProgressBar(false);
			<ps:if test="%{@com.path.vo.common.customization.button.ButtonCustomizationConstants$OP_TYPE@ACTION.equals(sysParamBtnCustActionsVO.OP_TYPE)}">
				<ps:if test="%{@com.path.vo.common.customization.button.ButtonCustomizationConstants$API_TYPE@SCREEN.equals(imImalApiVO.SERVICE_TYPE)}">
					$.struts2_jquery.require("ScreenGeneratorMaint.js" ,null,jQuery.contextPath+"/common/js/screengenerator/");
					
					var dynScreenMapParam = {};
					dynScreenMapParam.divId = 'dynScreenParamMap_<ps:property value="_pageRef" escapeHtml="false" escapeJavaScript="true"/>';
					dynScreenMapParam.currentPageRef = currentPageRef;
					dynScreenMapParam.elementIdentifier = $('#sysParamBtnCustActionsVO_BTN_ID_' + currentPageRef).val();
					dynScreenMapParam.mapElementType = '1';
					dynScreenMapParam.elementOpId = $('#sysParamBtnCustActionsVO_OP_ID_' + currentPageRef).val();
					dynScreenMapParam.appName = $('#buttonCustomization_appName_' + currentPageRef).val();
					dynScreenMapParam.progRef = $('#buttonCustomization_progRef_' + currentPageRef).val();
					dynScreenMapParam.defaultScreenId = ${buttonCustomizationCO.apiCodeValue};
					
					dynScreenMapParam.screenWidth = Number('${buttonCustomizationCO.sysParamBtnCustActionsVO.SCREEN_WIDTH}');
					dynScreenMapParam.screenHeight = Number('${buttonCustomizationCO.sysParamBtnCustActionsVO.SCREEN_HEIGHT}');
					dynScreenMapParam.screenTitle = '${buttonCustomizationCO.sysParamBtnCustActionsVO.SCREEN_TITLE}';
					dynScreenMapParam.showScreenWidthAndHeight = true;
					screenGenerator_loadDynamicScreenParamMap(dynScreenMapParam);
					
	  			</ps:if>	
	  			<ps:else>
	  				buttonCustomizationActions_reloadArgumentMapping();
	  			</ps:else>
			</ps:if>
	})
</script>

	 