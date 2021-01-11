<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@include file="/WEB-INF/pages/atm/atmcommon/ATMAppTrans.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>

<script type="text/javascript">
	$.struts2_jquery.require("AcquirerMaint.js,AcquirerList.js", null, jQuery.contextPath+ "/path/js/atm/acquirer/");
  	$.struts2_jquery.require("script.js" ,null,jQuery.contextPath+"/path/js/atm/atmcommon/");
  	$.struts2_jquery.require("ISOExpression.js" ,null,jQuery.contextPath+"/path/js/atm/atmcommon/expression/");
  	$.struts2_jquery.require("CommonExpressionJs.js" ,null,jQuery.contextPath+"/path/js/commonexpression/");
</script>

<ps:set name="ivcrud_${_pageRef}" value="iv_crud" />

<ps:form useHiddenProps="true" id="acquirerMaintFormId_${_pageRef}" namespace="/path/acquirer" applyChangeTrack="true"> 
	<ps:hidden name="acquirerCO.updateMode" id="updateMode_hdn_${_pageRef}" />
	<ps:hidden name="acquirerCO.gtw_ATM_ACQUIRER.COMP_CODE" id="companyCode_hdn_${_pageRef}" />
	<ps:hidden id="DATE_UPDATED_${_pageRef}" name="acquirerCO.gtw_ATM_ACQUIRER.DATE_UPDATED" />
	<ps:hidden id="dialogExpression_${_pageRef}" name="acquirerCO.gtw_ATM_ACQUIRER.ACQUIRER_MSG_SOURCE" />
	<ps:hidden id="tellerId_${_pageRef}" name="acquirerCO.gtw_ATM_ACQUIRER.TELLER_CODE" />
	
	<ps:hidden id="expressionIsGlobal_${_pageRef}" name="acquirerCO.customExpressionCO.gtw_CUSTOM_EXPRESSIONVO.IS_GLOBAL_YN" />
	<ps:hidden id="expressionShortName_${_pageRef}" name="acquirerCO.customExpressionCO.gtw_CUSTOM_EXPRESSIONVO.SHORT_NAME" />
	<ps:hidden id="expressionDescription_${_pageRef}" name="acquirerCO.customExpressionCO.gtw_CUSTOM_EXPRESSIONVO.DESCRIPTION" />
	<ps:hidden id="expression_${_pageRef}" name="acquirerCO.customExpressionCO.gtw_CUSTOM_EXPRESSIONVO.EXPRESSION" />
	<ps:hidden id="transactionsJSON_${_pageRef}" name="acquirerCO.transactionJSON" />
	<ps:hidden id="oldTerminalType_${_pageRef}" name="acquirerCO.oldTerminalType" />
	<ps:hidden id="isFormChanged_${_pageRef}" name="isFormChanged" />
	
	<ps:set name="acquirerCode_${_pageRef}"    value="acquirerCO.gtw_ATM_ACQUIRER.ACQUIRER_ID"/>
	<div id="acquirerDefinitionDiv_${_pageRef}" class="acquirerCollapsableDiv" style="margin-bottom: 5px" title="<ps:text name="acquirer_key"/>">
		<table width="100%" cellpadding="2" cellspacing="2">
		
			<tr>
				<td width="5%"></td>
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
					<ps:label key="acquirer_code_key"
						for="acquirer_code_id_${_pageRef }"
						id="acquirer_code_id_lbl_${_pageRef}">
					</ps:label>
				</td>
				<td colspan="2">
					<ps:textfield mode="number"
						id="acquirerCode_id_${_pageRef }"
						name="acquirerCO.gtw_ATM_ACQUIRER.ACQUIRER_ID" leadZeros="2"
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
						name="acquirerCO.gtw_ATM_ACQUIRER.DESCRIPTION" maxlength="255"
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
						name="acquirerCO.gtw_ATM_ACQUIRER.INTERFACE_CODE"
						paramList="compCode:companyCode_hdn_${_pageRef}" mode="number"
						size="5" maxlength="16" maxValue="9999999999999999"
						parameter="atmInterfaceSC.interfaceId:lookuptxt_atm_interface_${_pageRef}"
						dependency="lookuptxt_atm_interface_${_pageRef}:atmInterfaceCO.iso_INTERFACESVO.INTERFACE_CODE,
						interfaceDescription_${_pageRef}:atmInterfaceCO.iso_INTERFACESVO.DESCRIPTION"
						dependencySrc="${pageContext.request.contextPath}/path/atmInterfaces/ATMInterfacesLookupDependancyAction_returnATMInterfaceDetails"
						resultList="iso_INTERFACESVO.INTERFACE_CODE:lookuptxt_atm_interface_${_pageRef},iso_INTERFACESVO.DESCRIPTION:interfaceDescription_${_pageRef}"
						searchElement="iso_INTERFACESVO.DESCRIPTION"
						required="true"
						>
					</psj:livesearch>
				</td>
				<td class="fldDataEdit center" colspan="4">
					<ps:textfield
						id="interfaceDescription_${_pageRef}" name="acquirerCO.atmInterfaceDescription"
						readonly="true" tabindex="-1" cssStyle="height:20px" />
				</td>
			</tr>
			
			<tr>
				<td colspan="1" nowrap="nowrap">
					<ps:label
						id="lbl_expressionDialogButton_${_pageRef}"
						key="acquirer_expression_key" for="expressionDialogButton_${_pageRef}">
					</ps:label>
				</td>
				<td colspan="2" nowrap="nowrap">
					<psj:a id="expressionDialogButton_${_pageRef}" name="expressionDialogButton"
							button="true" 
							onclick="acquirerMaint_openExpressionDialog(true)"
							cssStyle="width:15%;height:22px"
							buttonIcon="ui-icon-wrench"
							
							>
							
				  	</psj:a>
				</td>
			</tr>
	 		<tr>
				<td nowrap="nowrap"><ps:label id="lbl_bankATM_${_pageRef}"
						key="bankATM_key" for="bankATM_${_pageRef}">
					</ps:label></td>
				<td nowrap="nowrap">
				
				<ps:checkbox id="bankATM_${_pageRef}"
						name="acquirerCO.gtw_ATM_ACQUIRER.BANK_ATM_YN" valOpt="Y:N"
						tabindex="3"
						parameter="acquirerCO.bankAtmYN:bankATM_${_pageRef}"
						dependencySrc="${pageContext.request.contextPath}/path/acquirer/AcquirerMaintAction_applyDisplaySettingFields"
						dependency="bank_${_pageRef}:acquirerCO.bankAtmYN" />
			</tr>
			<tr>
				<td>
					<ps:label key="terminal_type_key"
						for="terminalType_id_${_pageRef }"
						id="terminalType_lbl_${_pageRef}">
					</ps:label>
				</td>
				<td>
					<ps:select id="terminalType_id_${_pageRef}"
						list="terminalTypeList" listKey="code" listValue="descValue"
						name="acquirerCO.gtw_ATM_ACQUIRER.TERMINAL_TYPE" tabindex="4"
						cssStyle="width:100%">
					</ps:select>
				</td>
			</tr>
			<tr>
				<td nowrap="nowrap">
					<ps:label
						id="lbl_transaction_branch_${_pageRef}"
						key="transaction_branch_key" for="lookuptxt_transaction_branch_${_pageRef}">
					</ps:label>
				</td>
				<td>
					<psj:livesearch
						actionName="${pageContext.request.contextPath}/path/atm/common/lookups/BranchLookupAction_constructLookup"
						id="transaction_branch_${_pageRef}"
						name="acquirerCO.gtw_ATM_ACQUIRER.TRANSACTION_BRANCH_CODE"
						paramList="compCode:companyCode_hdn_${_pageRef},useConnection:true" mode="number"
						size="5" maxlength="4" maxValue="9999"
						parameter="compCode:companyCode_hdn_${_pageRef},branchCode:lookuptxt_transaction_branch_${_pageRef},useConnection:true"
						dependency="lookuptxt_transaction_branch_${_pageRef}:branchCO.branchCode,
						branche_${_pageRef}:branchCode, lookuptxt_teller_${_pageRef}:'',
						tellerDescription_${_pageRef}:'' "
						dependencySrc="${pageContext.request.contextPath}/path/atm/common/lookups/BranchLookupDependancyAction_returnBranchDetails"
						resultList="branchCode:lookuptxt_transaction_branch_${_pageRef},briefNameEnglish:branche_${_pageRef}"
						autoSearch="true"
						reConstruct="true"
						searchElement="branchCode">
					</psj:livesearch>
				</td>
				<td class="fldDataEdit center" colspan="4">
					<%-- <ps:textfield
						id="branche_${_pageRef}" name="acquirerCO.branchDescription"
						readonly="true" tabindex="-1" cssStyle="height:20px" /> --%>
				</td>
			</tr>

			<tr>
				<td nowrap="nowrap">
					<ps:label id="lbl_teller_${_pageRef}"
						key="teller_key" for="lookuptxt_teller_${_pageRef}">
					</ps:label>
				</td>
				<td>
					<psj:livesearch
						actionName="${pageContext.request.contextPath}/path/atm/common/lookups/TellerLookupAction_constructLookup"
						cssStyle="branch_taller_lookup_${_pageRef}"
						id="teller_${_pageRef}"
						name="acquirerCO.gtw_ATM_ACQUIRER.TELLER_USER_ID"
						paramList="tellerSC.branchCode:lookuptxt_transaction_branch_${_pageRef},tellerSC.compCode:companyCode_hdn_${_pageRef},useConnection:true"
						mode="text" size="6" maxlength="8" maxValue="99999999999"
						resultList="userID:lookuptxt_teller_${_pageRef},briefNameEnglish:tellerDescription_${_pageRef},tellerCode:tellerId_${_pageRef}"
						searchElement="tellerCode"
						parameter="tellerSC.branchCode:lookuptxt_transaction_branch_${_pageRef},
									tellerSC.tellerCode:tellerId_${_pageRef},
									tellerSC.compCode:companyCode_hdn_${_pageRef},
									useConnection:true"
						dependency="lookuptxt_teller_${_pageRef}:tellerCO.userID,
						tellerDescription_${_pageRef}:tellerCO.briefNameEnglish,
						tellerId_${_pageRef}:tellerCO.tellerCode"
						dependencySrc="${pageContext.request.contextPath}/path/atm/common/lookups/TellerLookupDependancyAction_returnTellerDetails">
					</psj:livesearch>
				</td>
				<td class="fldDataEdit center" colspan="4">
					<%-- <ps:textfield
						id="tellerDescription_${_pageRef}"
						name="acquirerCO.tellerDescription" readonly="true" tabindex="-1"
						cssStyle="height:20px" /> --%>
				</td>
			</tr>

		</table>
		<br>
		<div id="acquirer_transactions_Inner_${_pageRef}" class="acquirerCollapsableDiv" title="<ps:text name="trx_types_key" />" >
			<%@include file="TransactionsList.jsp"%>	
		</div>
	</div>
	
	<br>
	
	<div>
		<ptt:toolBar id="acquirerMaintToolBar_${_pageRef}" hideInAlert="true">
			<psj:submit id="acquirerMaint_save_${_pageRef}" button="true"
				tabindex="12" freezeOnSubmit="true">
				<ps:label key="Save_key" for="acquirerMaint_save_${_pageRef}" />
			</psj:submit>
			<ps:if test='%{#acquirerCode_${_pageRef} != null && #acquirerCode_${_pageRef} != ""}'>
				<psj:submit id="acquirerMaint_del_${_pageRef}" button="true"
					onclick="acquirerMaint_processDelete()" freezeOnSubmit="true"
					tabindex="13" type="button">
					<ps:text name="Delete_key"></ps:text>
				</psj:submit>
			</ps:if>
		</ptt:toolBar>
	</div>
	
	<!-- Expression Hidden Fields -->
	<ps:hidden name="updates" id="updateMachineIdParameter_${_pageRef}"></ps:hidden>
	<ps:hidden type="hidden" id="dialogOpenFrom_${_pageRef}" name="dialogOpenFrom"/>
	<ps:hidden type="hidden" id="dialogOpenFromGrid_${_pageRef}" name="dialogOpenFromGrid"/>
	<ps:hidden type="hidden" id="dialogOpenFromGridRowId_${_pageRef}" name="dialogOpenFromGridRowId"/>
	<ps:hidden type="hidden" id="dialogOpenFromGridRowColumn_${_pageRef}" name="dialogOpenFromGridRowColumn"/>
</ps:form>
<script type="text/javascript">
	$(document).ready(
		function() {
			$("#acquirerMaintFormId_" + _pageRef).processAfterValid("acquirerMaint_save", {});
		});
	$(".acquirerCollapsableDiv").collapsiblePanel();
</script>