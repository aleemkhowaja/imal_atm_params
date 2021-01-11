<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>
<%@include file="/WEB-INF/pages/atm/atmcommon/ATMAppTrans.jsp"%>

<script type="text/javascript">
	$.struts2_jquery.require("TerminalMaint.js", null, jQuery.contextPath
			+ "/path/js/atm/terminal/");
</script>

<ps:set name="ivcrud_${_pageRef}" value="iv_crud" />

<ps:form useHiddenProps="true" id="terminalMaintFormId_${_pageRef}"	namespace="/path/terminal" applyChangeTrack="true">
	<ps:hidden name="terminalCO.updateMode" id="updateMode_hdn_${_pageRef}" />
	<ps:hidden name="terminalCO.gtw_ATM_TERMINALVO.COMP_CODE" id="companyCode_hdn_${_pageRef}" />
	<ps:hidden name="terminalCO.gtw_ATM_TERMINALVO.TERMINAL_ID" id="TERMINAL_ID_${_pageRef}" />
	<ps:hidden id="DATE_UPDATED_${_pageRef}" name="terminalCO.gtw_ATM_TERMINALVO.DATE_UPDATED" />
	<ps:hidden id="tellerId_${_pageRef}" name="terminalCO.gtw_ATM_TERMINALVO.TELLER_CODE" />
	<ps:hidden id="terminalTypeId_${_pageRef}" name="terminalCO.terminalType" />
	<ps:hidden id="oldAcquirerId_${_pageRef}" name="terminalCO.oldAcquirerId" />
	
	<ps:hidden id="isFormChanged_${_pageRef}" name="isFormChanged" />
	<ps:set name="terminalCode_${_pageRef}"    value="terminalCO.gtw_ATM_TERMINALVO.TERMINAL_CODE"/>
	<div id="terminalDefinitionDiv_${_pageRef}" class="terminalCollapsableDiv" style="margin-bottom: 5px"
		title="<ps:text name="terminal_key"/>">
		<div id="mainDetailsTerminalDefinitionDiv_${_pageRef}" class="terminalCollapsableDiv" style="margin-bottom: 5px"
				title="<ps:text name="main_details_key"/>">
			<table width="100%" cellpadding="2" cellspacing="2">
				<tr>
					<td width="10%"></td>
					<td width="10%"></td>
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
					<td colspan="1">
						<ps:label key="terminal_id_key"
							for="terminal_id_${_pageRef }"
							id="terminal_id_lbl_${_pageRef}">
						</ps:label>
					</td>
					<td colspan="1">
						<ps:textfield
							id="terminal_id_${_pageRef }"
							name="terminalCO.gtw_ATM_TERMINALVO.TERMINAL_CODE"
							minValue="0" tabindex="1" required="true">
						</ps:textfield>
					</td>
				</tr>
				<tr>
					<td colspan="1">
						<ps:label key="Description_key"
							for="Description_id_${_pageRef }" id="Description_lbl_${_pageRef}">
						</ps:label></td>
					<td colspan="5">
						<ps:textfield id="Description_id_${_pageRef }"
							name="terminalCO.gtw_ATM_TERMINALVO.DESCRIPTION" maxlength="255"
							required="true" tabindex="2">
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
							name="terminalCO.gtw_ATM_TERMINALVO.INTERFACE_CODE"
							paramList="compCode:companyCode_hdn_${_pageRef}" mode="number"
							size="5" maxlength="16" maxValue="9999999999999999"
							parameter="atmInterfaceSC.interfaceId:lookuptxt_atm_interface_${_pageRef}"
							dependency="lookuptxt_atm_interface_${_pageRef}:atmInterfaceCO.iso_INTERFACESVO.INTERFACE_CODE,
							interfaceDescription_${_pageRef}:atmInterfaceCO.iso_INTERFACESVO.DESCRIPTION"
							dependencySrc="${pageContext.request.contextPath}/path/atmInterfaces/ATMInterfacesLookupDependancyAction_returnATMInterfaceDetails"
							resultList="iso_INTERFACESVO.INTERFACE_CODE:lookuptxt_atm_interface_${_pageRef},iso_INTERFACESVO.DESCRIPTION:interfaceDescription_${_pageRef}"
							searchElement="iso_INTERFACESVO.DESCRIPTION"
							required="true" tabindex="3"
							>
						</psj:livesearch>
					</td>
					<td class="fldDataEdit center" colspan="4">
						<ps:textfield
							id="interfaceDescription_${_pageRef}" name="terminalCO.atmInterfaceDescription"
							readonly="true" tabindex="-1" cssStyle="height:20px" />
					</td>
				</tr>
				
				<%-- <tr>
					<td colspan="1" nowrap="nowrap">
						<ps:label
							id="lbl_expressionDialogButton_${_pageRef}"
							key="terminal_expression_key" for="expressionDialogButton_${_pageRef}">
						</ps:label>
					</td>
					<td colspan="2" nowrap="nowrap">
						<psj:a id="expressionDialogButton_${_pageRef}" name="expressionDialogButton"
								button="true" 
								onclick="terminalMaint_openExpressionDialog(true)"
								cssStyle="width:15%;height:22px"
								buttonIcon="ui-icon-wrench"
								
								>
					  	</psj:a>
					</td>
				</tr> --%>
			
				<%-- <tr>
					<td>
						<ps:label key="terminal_type_key"
							for="terminalType_id_${_pageRef }"
							id="terminalType_lbl_${_pageRef}">
						</ps:label>
					</td>
					<td>
						<ps:select id="terminalType_id_${_pageRef}"
							list="terminalTypeList" listKey="code" listValue="descValue"
							name="terminalCO.gtw_ATM_TERMINALVO.TERMINAL_TYPE" tabindex="4"
							onchange="terminalMaint_onChangeTerminalType()"
							cssStyle="width:100%" required="true">
						</ps:select>
				</tr> --%>
				
				<tr >
					<td nowrap="nowrap">
						<ps:label id="lbl_acuirer_${_pageRef}"
							key="acquirer_key" for="lookuptxt_acquirer_${_pageRef}" >
						</ps:label>
					</td>
					<td>
						<psj:livesearch
							actionName="${pageContext.request.contextPath}/path/atm/common/lookups/AcquirerLookupAction_constructLookup"
							id="acquirer_${_pageRef}"
							name="terminalCO.gtw_ATM_TERMINALVO.ACQUIRER_ID"
							paramList="acquirerSC.compCode:companyCode_hdn_${_pageRef}"
							mode="number" size="5" maxlength="16" maxValue="9999999999999999"
							resultList="gtw_ATM_ACQUIRER.ACQUIRER_ID:lookuptxt_acquirer_${_pageRef}"
							
							parameter="acquirerSC.acquirerCode:lookuptxt_acquirer_${_pageRef}"
							dependencySrc="${pageContext.request.contextPath}/path/atm/common/lookups/AcquirerLookupDependancyAction_returnAcquirerDetails"
							dependency="lookuptxt_acquirer_${_pageRef}:acquirerCO.gtw_ATM_ACQUIRER.ACQUIRER_ID,
							acquirerDescription_${_pageRef}:acquirerCO.gtw_ATM_ACQUIRER.DESCRIPTION,
							terminalTypeId_${_pageRef}:acquirerCO.gtw_ATM_ACQUIRER.TERMINAL_TYPE"
							afterDepEvent="terminalMaint_onChangeTerminalType"
							searchElement="gtw_ATM_ACQUIRER.ACQUIRER_ID" tabindex="4" required="true">
						</psj:livesearch>
					</td>
					<td class="fldDataEdit center"  colspan="2">
						<ps:textfield
							id="acquirerDescription_${_pageRef}"
							name="terminalCO.acquirerDescription" readonly="true" tabindex="-1"
							cssStyle="height:20px" />
					</td>
				</tr>
				<tr class="terminalTypePOS_${_pageRef}" style="display: none">
					<td nowrap="nowrap">
						<ps:label id="lbl_merchant_${_pageRef}"
							key="merchant_key" for="merchant_${_pageRef}">
						</ps:label>
					</td>
					<td>
						<psj:livesearch
							actionName="${pageContext.request.contextPath}/path/atm/common/lookups/MerchantLookupAction_constructLookup"
							id="merchant_${_pageRef}"
							name="terminalCO.gtw_ATM_TERMINALVO.MERCHANT_CODE"
							paramList="merchantMgntSC.compCode:companyCode_hdn_${_pageRef}"
							mode="number" size="5" maxlength="6" maxValue="999999"
							parameter="merchantMgntSC.code:lookuptxt_merchant_${_pageRef},
										merchantMgntSC.compCode:companyCode_hdn_${_pageRef}"
							dependency="lookuptxt_merchant_${_pageRef}:merchantMgntCO.gtwAtmMerchantVO.MERCHANT_CODE,
							merchantDescription_${_pageRef}:merchantMgntCO.merchantDescription"
							dependencySrc="${pageContext.request.contextPath}/path/atm/common/lookups/MerchantLookupDependancyAction_returnMerchantDetails"
							resultList="gtwAtmMerchantVO.MERCHANT_CODE:lookuptxt_merchant_${_pageRef}"
							searchElement="ADDITIONAL_REFERENCE" tabindex="5">
						</psj:livesearch>
					</td>
					<td class="fldDataEdit center"  colspan="2">
						<ps:textfield
							id="merchantDescription_${_pageRef}"
							name="terminalCO.merchantDescription" readonly="true" tabindex="-1"
							cssStyle="height:20px" />
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
							name="terminalCO.gtw_ATM_TERMINALVO.TRANSACTION_BRANCH_CODE"
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
							searchElement="branchCode"
							required="true"
							>
						</psj:livesearch>
					</td>
					<td class="fldDataEdit center"  colspan="2">
						<%-- <ps:textfield id="branche_${_pageRef}"
							name="terminalCO.branchDescription" readonly="true" tabindex="-1"
							cssStyle="height:20px" /> --%>
					</td>
				</tr>
				<tr class="branch_taller_${_pageRef}">
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
							name="terminalCO.gtw_ATM_TERMINALVO.TELLER_USER_ID"
							paramList="tellerSC.branchCode:lookuptxt_transaction_branch_${_pageRef},tellerSC.compCode:companyCode_hdn_${_pageRef},useConnection:true"
							mode="text" size="6" maxlength="8" maxValue="99999999"
							resultList="tellerCode:lookuptxt_teller_${_pageRef},briefNameEnglish:tellerDescription_${_pageRef},tellerCode:tellerId_${_pageRef}"
							searchElement="tellerCode"
							parameter="tellerSC.branchCode:lookuptxt_transaction_branch_${_pageRef},
										tellerSC.tellerCode:tellerId_${_pageRef},
										tellerSC.compCode:companyCode_hdn_${_pageRef},
										useConnection:true"
							dependency="lookuptxt_teller_${_pageRef}:tellerCO.userID,
							tellerDescription_${_pageRef}:tellerCO.briefNameEnglish,
							tellerId_${_pageRef}:tellerCO.tellerCode"
							dependencySrc="${pageContext.request.contextPath}/path/atm/common/lookups/TellerLookupDependancyAction_returnTellerDetails"
							required="true" tabindex="7">
						</psj:livesearch>
					</td>
					<td class="fldDataEdit center" colspan="2">
<%-- 						<ps:textfield
							id="tellerDescription_${_pageRef}"
							name="terminalCO.tellerDescription" readonly="true" tabindex="-1"
							cssStyle="height:20px" /> --%>
					</td>
				</tr>
			</table>
		</div>
		<div id="contatcDetailsTerminalDefinitionDiv_${_pageRef}" class="terminalCollapsableDiv" style="margin-bottom: 5px"
				title="<ps:text name="contact_details_key"/>">
				<table width="100%" cellpadding="2" cellspacing="2">
				<tr>
					<td width="10%"></td>
					<td width="10%"></td>
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
					<td colspan="1">
						<ps:label key="address_key"
							for="address_id_${_pageRef }"
							id="address_lbl_${_pageRef}">
						</ps:label>
					</td>
					<td colspan="3">
						<ps:textarea mode="text"
							id="address_id_${_pageRef }"
							name="terminalCO.gtw_ATM_TERMINALVO.ADDRESS" leadZeros="2"
							minValue="0" maxlength="255" tabindex="8" cssStyle="height:50px">
						</ps:textarea>
					</td>
				</tr>
				
				<tr>
					<td colspan="1" nowrap="nowrap">
						<ps:label key="support_contact_no_key"
							for="telephone_id_${_pageRef }"
							id="telephone_lbl_${_pageRef}">
						</ps:label>
					</td>
					<td colspan="3">
						<ps:textfield mode="text"
							id="telephone_id_${_pageRef }"
							name="terminalCO.gtw_ATM_TERMINALVO.TELEPHONE" leadZeros="2"
							minValue="0" maxlength="50" tabindex="9">
						</ps:textfield>
					</td>
				</tr>
				
				<tr>
					<td colspan="1" nowrap="nowrap">
						<ps:label key="support_contact_email_key"
							for="email_id_${_pageRef }"
							id="email_lbl_${_pageRef}">
						</ps:label>
					</td>
					<td colspan="3">
						<ps:textfield mode="text"
							id="email_id_${_pageRef }"
							name="terminalCO.gtw_ATM_TERMINALVO.EMAIL" leadZeros="2"
							minValue="0" maxlength="255" tabindex="10">
						</ps:textfield>
					</td>
				</tr>
			</table>
		</div>
	</div>
	<br>
	<div>
		<ptt:toolBar id="terminalMaintToolBar_${_pageRef}" hideInAlert="true">
			<psj:submit id="terminalMaint_save_${_pageRef}" button="true"
				tabindex="12" freezeOnSubmit="true">
				<ps:label key="Save_key" for="terminalMaint_save_${_pageRef}" />
			</psj:submit>
			<ps:if test='%{#terminalCode_${_pageRef} != null && #terminalCode_${_pageRef} != ""}'>
				<psj:submit id="terminalMaint_del_${_pageRef}" button="true"
					onclick="terminalMaint_processDelete()" freezeOnSubmit="true"
					tabindex="13" type="button">
					<ps:text name="Delete_key"></ps:text>
				</psj:submit>
			</ps:if>
		</ptt:toolBar>
	</div>
	
	<!-- Expression Hidden Fields -->
	<ps:hidden name="updates" id="updateMachineIdParameter_${_pageRef}"></ps:hidden>
	
</ps:form>
<script type="text/javascript">
	$(document).ready(
			function() {
				$("#terminalMaintFormId_" + _pageRef).processAfterValid(
						"terminalMaint_save", {});
			});
	$(".terminalCollapsableDiv").collapsiblePanel();
</script>