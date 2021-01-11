<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@include file="/WEB-INF/pages/atm/atmcommon/ATMAppTrans.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>

<script type="text/javascript">
	$.struts2_jquery.require("ISOMessagesDefinitionList.js,ISOMessagesDefinitionMaint.js,ISOMessagesDefinitionFlds.js", null, jQuery.contextPath+ "/path/js/atm/isomessagesdefinition/");
  	$.struts2_jquery.require("script.js" ,null,jQuery.contextPath+"/path/js/atm/atmcommon/");
  	$.struts2_jquery.require("baseConverter.js", null, jQuery.contextPath + "/path/js/atm/atminterface/");
  	$.struts2_jquery.require("ISOExpression.js" ,null,jQuery.contextPath+"/path/js/atm/atmcommon/expression/");
  	$.struts2_jquery.require("CommonExpressionJs.js" ,null,jQuery.contextPath+"/path/js/commonexpression/");
  	$.struts2_jquery.require("CommonPwsMappingMaint.js", null, jQuery.contextPath+ "/path/js/commonpwsmapping/pwsmapping/");
</script>

<ps:set name="ivcrud_${_pageRef}" value="iv_crud" />

<ps:form useHiddenProps="true" id="iSOMessagesDefinitionMaintFormId_${_pageRef}" 
		  namespace="/path/iSOMessagesDefinition" applyChangeTrack="true"> 
	
	<ps:hidden name="isomessagesdefinitionCO.updateMode" id="updateMode_hdn_${_pageRef}" />
 	<ps:hidden id="dialogExpression_${_pageRef}" 		name="isomessagesdefinitionCO.gtw_ATM_ISO_MSG_DEF.ADD_CRITERIA_EXPRESSION" />
 	<ps:hidden id="isFormChanged_${_pageRef}" 			name="isFormChanged" />
 	<ps:hidden id="iso_mappingId_${_pageRef}" 			name="isomessagesdefinitionCO.gtw_ATM_ISO_MSG_DEF.MAPPING_ID" />
 	<ps:hidden id="requestFields_${_pageRef}" 			name="isomessagesdefinitionCO.requestFields" />
 	<ps:hidden id="responseFields_${_pageRef}" 			name="isomessagesdefinitionCO.responseFields" />
 	<ps:hidden id="oldISOMsgCode_${_pageRef}" 			name="isomessagesdefinitionCO.oldISOMsgCode" />
	
	<ps:set name="isoMessagesDefinitionCode_${_pageRef}"    value="isomessagesdefinitionCO.gtw_ATM_ISO_MSG_DEF.ISO_MSG_DEF_ID"/>
	<div id="isoMessagesDefinitionDiv_${_pageRef}" class="isoMessagesDefinitionCollapsableDiv" style="margin-bottom: 5px" title="<ps:text name="iso_messages_definition_key"/>">
		<table width="100%" cellpadding="2" cellspacing="2">
		
			<tr>
				<td width="12%"></td>
				<td width="9%"></td>
				<td width="10%"></td>
				<td width="10%"></td>
				<td width="10%"></td>
				<td width="10%"></td>
				<td width="10%"></td>
				<td width="10%"></td>
				<td width="10%"></td>
				<td width="10%"></td>
			</tr>
			
			<tr>
				<td colspan="10"><br></td>
			</tr>
			
			<tr>
				<td colspan="1" nowrap="nowrap">
					<ps:label key="iso_message_definition_code_key"
						for="iso_message_definition_code_${_pageRef }"
						id="iso_message_definition_code_lbl_${_pageRef}">
					</ps:label>
				</td>
				<td colspan="2">
					<ps:textfield mode="number"
						id="iso_message_definition_code_${_pageRef }"
						name="isomessagesdefinitionCO.gtw_ATM_ISO_MSG_DEF.ISO_MSG_DEF_ID" leadZeros="2"
						minValue="0" tabindex="1">
					</ps:textfield>
				</td>
			</tr>
			
			 <tr>
				<td colspan="1" nowrap="nowrap">
					<ps:label key="Description_key"
						for="Description_id_${_pageRef }" id="Description_lbl_${_pageRef}">
					</ps:label>
				</td>
				<td colspan="5">
					<ps:textfield id="Description_id_${_pageRef }"
						name="isomessagesdefinitionCO.gtw_ATM_ISO_MSG_DEF.DESCRIPTION" maxlength="255"
						required="true" tabindex="1">
					</ps:textfield>
				</td>
			</tr>
			
			<tr>
				<td nowrap="nowrap">
					<ps:label
						id="lbl_interface_${_pageRef}"
						key="interface_key" for="lookuptxt_atm_interface_${_pageRef}">
					</ps:label>
				</td>
				<td>
					<psj:livesearch
						actionName="${pageContext.request.contextPath}/path/atmInterfaces/ATMInterfacesLookupAction_constructLookup"
						id="atm_interface_${_pageRef}"
						name="isomessagesdefinitionCO.gtw_ATM_ISO_MSG_DEF.INTERFACE_CODE"
						paramList="compCode:companyCode_hdn_${_pageRef}" mode="number"
						size="5" maxlength="16" maxValue="9999999999999999"
						parameter="atmInterfaceSC.interfaceId:lookuptxt_atm_interface_${_pageRef}"
						dependency="lookuptxt_atm_interface_${_pageRef}:atmInterfaceCO.iso_INTERFACESVO.INTERFACE_CODE,
						interfaceDescription_${_pageRef}:atmInterfaceCO.iso_INTERFACESVO.DESCRIPTION, lookuptxt_mti_${_pageRef}:'',mtiDescription_${_pageRef}:''"
						dependencySrc="${pageContext.request.contextPath}/path/atmInterfaces/ATMInterfacesLookupDependancyAction_returnATMInterfaceDetails"
						resultList="iso_INTERFACESVO.INTERFACE_CODE:lookuptxt_atm_interface_${_pageRef},iso_INTERFACESVO.DESCRIPTION:interfaceDescription_${_pageRef}"
						searchElement="iso_INTERFACESVO.DESCRIPTION"
						required="true"
						afterDepEvent="iSOMessagesDefinitionFlds_reloadISOMsgDefFldsGrid()"
						>
					</psj:livesearch>
				</td>
				<td class="fldDataEdit center" colspan="4">
					<ps:textfield
						id="interfaceDescription_${_pageRef}" name="isomessagesdefinitionCO.atmInterfaceDescription"
						readonly="true" tabindex="-1" cssStyle="height:20px" />
				</td>
			</tr>
			
			<tr>
				<td nowrap="nowrap"><ps:label id="lbl_networkMessage_${_pageRef}"
						key="network_message_key" for="networkMessage_${_pageRef}">
					</ps:label></td>
				<td nowrap="nowrap">
					<ps:checkbox id="networkMessage_${_pageRef}"
						name="isomessagesdefinitionCO.gtw_ATM_ISO_MSG_DEF.NETWORK_MESSAGE_YN" valOpt="Y:N"
						tabindex="3" 
						parameter="isomessagesdefinitionCO.gtw_ATM_ISO_MSG_DEF.NETWORK_MESSAGE_YN:networkMessage_${_pageRef}"
						dependencySrc="${pageContext.request.contextPath}/path/iSOMessagesDefinition/ISOMessagesDefinitionMaintAction_applyDisplaySettingFields"
						dependency="networkMessage_${_pageRef}:isomessagesdefinitionCO.gtw_ATM_ISO_MSG_DEF.NETWORK_MESSAGE_YN"
						afterDepEvent="iSOMessagesDefinitionFlds_reloadISOMsgDefFldsGrid()"
					/>
				</td>
			</tr>
			
				<td nowrap="nowrap" >
					<ps:label id="networkMessageTypeLbl_${_pageRef}" key="network_message_type_key"
						for="networkMessageType_${_pageRef}">
					</ps:label>
				</td>
				<td nowrap="nowrap">
					<ps:select id="networkMessageType_${_pageRef}"
						name="isomessagesdefinitionCO.gtw_ATM_ISO_MSG_DEF.NETWORK_MESSAGE_TYPE"
						list="networkMesssageTypeList" listKey="code" listValue="descValue">
					</ps:select>
				</td>
		</table>
		<br>
		<div id="messageIdentification_Inner_${_pageRef}" class="isoMessagesDefinitionCollapsableDiv" title="<ps:text name="message_identification_key" />" >
			<table width="100%" cellpadding="2" cellspacing="2">
				<tr>
					<td width="12%"></td>
					<td width="9%"></td>
					<td width="10%"></td>
					<td width="10%"></td>
					<td width="10%"></td>
					<td width="10%"></td>
					<td width="10%"></td>
					<td width="10%"></td>
					<td width="10%"></td>
					<td width="10%"></td>
				</tr>
				<tr>
					<td nowrap="nowrap" colspan="1">
						<ps:label
							id="lbl_mti_${_pageRef}"
							key="mti_key" for="lookuptxt_mti_${_pageRef}">
						</ps:label>
					</td>
					<td>
						<psj:livesearch
							actionName="${pageContext.request.contextPath}/path/atm/common/lookups/MTILookupAction_constructLookup"
							id="mti_${_pageRef}"
							name="isomessagesdefinitionCO.gtw_ATM_ISO_MSG_DEF.ATM_ISO_MSGS_CODE"
							paramList="atmInterfaceSC.interfaceId:lookuptxt_atm_interface_${_pageRef}" mode="number"
							size="5" maxlength="16" maxValue="9999999999999999"
							parameter="atmInterfaceSC.interfaceId:lookuptxt_atm_interface_${_pageRef},atmInterfaceSC.messageId:lookuptxt_mti_${_pageRef}"
							dependency="lookuptxt_mti_${_pageRef}:atmInterfaceCO.iso_INT_MSGSVO.ATM_ISO_MSGS_CODE,
							mtiDescription_${_pageRef}:atmInterfaceCO.iso_INT_MSGSVO.REQUEST_MTI"
							dependencySrc="${pageContext.request.contextPath}/path/atm/common/lookups/MTILookupDependancyAction_returnMTIDetails"
							resultList="iso_INT_MSGSVO.ATM_ISO_MSGS_CODE:lookuptxt_mti_${_pageRef},iso_INT_MSGSVO.REQUEST_MTI:mtiDescription_${_pageRef}"
							searchElement="iso_INTERFACESVO.DESCRIPTION"
							required="false"
							afterDepEvent="iSOMessagesDefinitionFlds_reloadISOMsgDefFldsGrid()">
						</psj:livesearch>
					</td>
					<td class="fldDataEdit center" colspan="4">
						<ps:textfield
							id="mtiDescription_${_pageRef}" name="isomessagesdefinitionCO.mtiDescription"
							readonly="true" tabindex="-1" cssStyle="height:20px" />
					</td>
				</tr>
				<tr>
					<td colspan="1" nowrap="nowrap">
						<ps:label key="process_code_key"
							for="processCode_id_${_pageRef }" id="processCode_lbl_${_pageRef}">
						</ps:label>
					</td>
					<td colspan="5">
						<ps:textfield id="processCode_id_${_pageRef }"
							name="isomessagesdefinitionCO.gtw_ATM_ISO_MSG_DEF.PROCESS_CODE" maxlength="6"
							required="false" tabindex="1">
						</ps:textfield>
					</td>
				</tr>
				<tr>
					<td colspan="1" nowrap="nowrap">
						<ps:label
							id="lbl_additionalCriteriaDialogButton_${_pageRef}"
							key="additional_criteria_key" for="additionalCriteriaDialogButton_${_pageRef}">
						</ps:label>
					</td>
					<td colspan="2" nowrap="nowrap">
						<psj:a id="additionalCriteriaDialogButton_${_pageRef}" name="additionalCriteriaDialogButton"
								button="true" 
								onclick="iSOMessagesDefinitionMaint_openExpressionDialog(true)"
								cssStyle="width:15%;height:22px"
								buttonIcon="ui-icon-wrench">
					  	</psj:a>
					</td>
				</tr>
				
				<tr>
					<td colspan="1" nowrap="nowrap">
						<ps:label
							id="lbl_wsMappingDialogButton_${_pageRef}"
							key="ws_mapping_key" for="wsMappingDialogButton_${_pageRef}">
						</ps:label>
					</td>
					<td colspan="2" nowrap="nowrap">
						<psj:a id="wsMappingDialogButton_${_pageRef}" name="wsMappingDialogButton"
								button="true" 
								onclick="iSOMessagesDefinitionMaint_openWSMappingDialog()"
								cssStyle="width:15%;height:22px"
								buttonIcon="ui-icon-wrench">
					  	</psj:a>
					</td>
				</tr>
				
			</table>
		</div>
		<br>
		
		<%@include file="ISOMessagesDefinitionFlds.jsp"%>
		
	</div>
	<br>
	<div>
	<ptt:toolBar id="isoMessagesDefinitionMaintToolBar_${_pageRef}" hideInAlert="true">
		<psj:submit id="isoMessagesDefinitionMaint_save_${_pageRef}" button="true" tabindex="12" freezeOnSubmit="true">
				<ps:label key="Save_key" for="isoMessagesDefinitionMaint_save_${_pageRef}" />
		</psj:submit>
		
		<ps:if test='%{#isoMessagesDefinitionCode_${_pageRef} != null && #isoMessagesDefinitionCodee_${_pageRef} != ""}'>
			<psj:submit id="isoMessagesDefinition_del_${_pageRef}" button="true" onclick="iSOMessagesDefinitionMaint_processDelete()" freezeOnSubmit="true"
				tabindex="13" type="button">
				<ps:text name="Delete_key"></ps:text>
			</psj:submit>
		</ps:if>
	</ptt:toolBar>
	</div>
	
	<ps:hidden name="updates" id="updateMachineIdParameter_${_pageRef}"></ps:hidden>
	<ps:hidden type="hidden" id="dialogOpenFrom_${_pageRef}" name="dialogOpenFrom"/>
	<ps:hidden type="hidden" id="dialogOpenFromGrid_${_pageRef}" name="dialogOpenFromGrid"/>
	<ps:hidden type="hidden" id="dialogOpenFromGridRowId_${_pageRef}" name="dialogOpenFromGridRowId"/>
	<ps:hidden type="hidden" id="dialogOpenFromGridRowColumn_${_pageRef}" name="dialogOpenFromGridRowColumn"/>
</ps:form>
<script type="text/javascript">
	$(document).ready(
		function() {
			$("#iSOMessagesDefinitionMaintFormId_" + _pageRef).processAfterValid("iSOMessagesDefinitionMaint_save", {});
		});
	$(".isoMessagesDefinitionCollapsableDiv").collapsiblePanel();
</script>