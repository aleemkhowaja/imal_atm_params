<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@include file="/WEB-INF/pages/atm/atmcommon/ATMAppTrans.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>
<ps:form id="merchantMgntDefFormId_${_pageRef}" useHiddenProps="true"
	namespace="/path/merchantMgnt">
	<ps:set name="ivcrud_${_pageRef}" value="iv_crud" />
	<ps:set name="acc_add_ref_IBAN_can_not_be_empty_key"
		value="%{getText('acc_add_ref_IBAN_can_not_be_empty_key')}" />
	<ps:set name="merchant_account_not_valid_key"
		value="%{getText('merchant_account_not_valid_key')}" />
	<ps:set name="merchant_acc_req_key"
		value="%{getText('merchant_acc_req_key')}" />
	<ps:hidden id="crud_${_pageRef}" name="iv_crud"></ps:hidden>
	<ps:hidden id="methodName_${_pageRef}" />
	<ps:hidden id="toBeStatus_${_pageRef}"
		name="merchantMgntCO.gtwAtmMerchantVO.TO_BE_STATUS"></ps:hidden>

	<%-- Status table --%>
	<table width="100%" cellpadding="2" cellspacing="1" >

		<tr></tr>
		<tr></tr>
		<tr></tr>
		<tr></tr>
		<tr></tr>
		<tr></tr>
		<tr>
			<td style="width: 1%"></td>
			<td style="width: 10%"></td>
			<td style="width: 25%"></td>
			<td style="width: 10%"></td>
			<td style="width: 25%"></td>
			<td class="fldLabelView" style="width: 18%; text-align: right">
				<ps:label key="status_key" for="status_${_pageRef}"
					id="lbl_statusId_${_pageRef}" />
			</td>
			<td style="width: 12%;">
				<ps:hidden id="statusId_${_pageRef}"
					name="merchantMgntCO.gtwAtmMerchantVO.STATUS">
				</ps:hidden> 
				<ps:textfield
					id="status_${_pageRef}" name="merchantMgntCO.statusDesc"
					readonly="true"
					cssStyle="background:${merchantMgntCO.statusColorCode}!important;color:white!important;text-align:center!important" />
			</td>
			<td style="width: 20%; text-align: right"><psj:a button="true"
					buttonIcon="ui-icon-triangle-2-s"
					onclick="merchantMgnt_onStatusClicked()">
					<ps:text name='status_key' />
				</psj:a></td>
			<td style="width: 10%"></td>
			<td style="width: 25%"></td>
			<td style="width: 10%"></td>
		</tr>
	</table>

	<%-- Main Form table --%>
	<table width="100%" cellpadding="3px" cellspacing="1" 
		id="merchant_form_table_<ps:property value="_pageRef" escapeHtml="true"/>">
		<tr>
			<td nowrap="nowrap" width="120px"><ps:label key="Code_key"
					for="code_${_pageRef}" id="lbl_code_${_pageRef}" /></td>
			<td nowrap="nowrap" width="250px"><ps:textfield
					id="code_${_pageRef}"
					name="merchantMgntCO.gtwAtmMerchantVO.MERCHANT_CODE" mode="number"
					nbFormat="######" readonly="true" cssStyle="width:100px" /></td>
			</td>
			<td></td>
			<td>
		</tr>
		<tr>
			<td nowrap="nowrap"><ps:label key="iban_key"
					for="IBAN_${_pageRef}" id="lbl_iban_${_pageRef}" /></td>
			<td nowrap="nowrap"><ps:textfield id="IBAN_${_pageRef}"
					name="merchantMgntCO.gtwAtmMerchantVO.IBAN_ACC_NO" mode="text"
					maxlength="35"
					dependencySrc="${pageContext.request.contextPath}/path/atm/common/lookups/MerchantLookupDependancyAction_validateIBANOrAddRef"
					parameter="merchantMgntSC.IBAN:IBAN_${_pageRef}, merchantMgntSC.dependencyType:'IBAN'"
					dependency="merchant_account_name_${_pageRef}:merchantMgntCO.merchantAccountName,acc_additional_ref_${_pageRef}:merchantMgntSC.additionalRef,IBAN_${_pageRef}:merchantMgntSC.IBAN" />
			</td>
			<td></td>
			<td></td>
		</tr>

		<tr>
			<td><ps:label key="acc_additional_ref_key"
					for="acc_additional_ref_${_pageRef}"
					id="lbl_acc_additional_ref_${_pageRef}" /></td>
			<td nowrap="nowrap"><ps:textfield
					id="acc_additional_ref_${_pageRef}"
					name="merchantMgntCO.gtwAtmMerchantVO.ADDITIONAL_REFERENCE"
					mode="text"
					maxlength="35"
					dependencySrc="${pageContext.request.contextPath}/path/atm/common/lookups/MerchantLookupDependancyAction_validateIBANOrAddRef"
					parameter="merchantMgntSC.additionalRef:acc_additional_ref_${_pageRef}, merchantMgntSC.dependencyType:'addRef'"
					dependency="merchant_account_name_${_pageRef}:merchantMgntCO.merchantAccountName,IBAN_${_pageRef}:merchantMgntSC.IBAN,acc_additional_ref_${_pageRef}:merchantMgntSC.additionalRef" />
			</td>
			<td></td>
			<td></td>
		</tr>

		<%--  temporary disable web service call 	
	<tr>
	<td nowrap="nowrap" >
		<ps:label key="Merchant_account_name_Key" for="merchant_account_name_${_pageRef}" id="lbl_merchant_account_name_${_pageRef}" />
	</td>
	<td nowrap="nowrap">
		 <ps:textfield id="merchant_account_name_${_pageRef}" name="merchantMgntCO.merchantAccountName" mode="text" readonly="true"/> 
	</td>
	<td></td>
	<td></td>
	</tr> --%>

		<%-- <ps:hidden id="gtwAtmMerchantVO_SHOW_IN_POS_${_pageRef}" value="1"></ps:hidden> --%>

		<tr>
			<td width="5%" nowrap="nowrap"><ps:label key="remarks_key"
					for="statusRemark_${_pageRef}" id="lbl_statusRemarkId_${_pageRef}" />
			</td>
			<td nowrap="nowrap"><ps:textarea id="statusRemark_${_pageRef}"
					name="merchantMgntCO.gtwAtmMerchantVO.REMARK" rows="5" maxlength="255" /></td>
			<td></td>
			<td></td>
		</tr>
	</table>

	<ptt:toolBar id="merchantMgntToolBar_${_pageRef}" hideInAlert="true">
		<ps:if
			test='%{#ivcrud_${_pageRef}=="R" && (merchantMgntCO.gtwAtmMerchantVO.STATUS=="A" || merchantMgntCO.gtwAtmMerchantVO.STATUS==null)}'>
			<psj:submit id="merchantmgnt_save_${_pageRef}" button="true"
				buttonIcon="ui-icon-disk" freezeOnSubmit="true"
				onclick="merchantMgnt_setMethodName('saveNew')">
				<ps:label key="btn.save" for="merchantmgnt_save_${_pageRef}" />
			</psj:submit>
		</ps:if>

		<ps:if
			test='%{merchantMgntCO!=null&&merchantMgntCO.gtwAtmMerchantVO!=null&&merchantMgntCO.gtwAtmMerchantVO.MERCHANT_CODE!=null}'>
			<ps:if test='%{#ivcrud_${_pageRef}=="P"}'>
				<psj:submit id="merchantmgnt_approve_${_pageRef}" button="true"
					freezeOnSubmit="true"
					onclick="merchantMgnt_setMethodName('approve')">
					<ps:label key="Approve_key" for="merchantmgnt_approve_${_pageRef}" />
				</psj:submit>
			</ps:if>

			<ps:if test='%{#ivcrud_${_pageRef}=="UP"}'>
				<psj:submit id="merchantmgnt_updateAfterApprove_${_pageRef}"
					buttonIcon="ui-icon-disk" button="true" freezeOnSubmit="true"
					onclick="merchantMgnt_setMethodName('saveNew')">
					<ps:label key="update_key"
						for="merchantmgnt_updateAfterApprove_${_pageRef}" />
				</psj:submit>
			</ps:if>



			<ps:if test='%{#ivcrud_${_pageRef}=="S"}'>
				<psj:submit id="merchantmgnt_suspend_${_pageRef}" button="true"
					freezeOnSubmit="true"
					onclick="merchantMgnt_setMethodName('suspend')">
					<ps:label key="suspend_key" for="merchantmgnt_suspend_${_pageRef}" />
				</psj:submit>
			</ps:if>

			<ps:if test='%{#ivcrud_${_pageRef}=="AS"}'>
				<psj:submit id="merchantmgnt_approveSuspend_${_pageRef}"
					button="true" freezeOnSubmit="true"
					onclick="merchantMgnt_setMethodName('approveSuspend')">
					<ps:label key="approve_suspend_key"
						for="merchantmgnt_approveSuspend_${_pageRef}" />
				</psj:submit>
			</ps:if>

 			<ps:if test='%{#ivcrud_${_pageRef}=="D"}'>
				<psj:submit id="merchantmgnt_delete_${_pageRef}" button="true"
					freezeOnSubmit="true"
					onclick="merchantMgnt_setMethodName('delete')">
					<ps:label key="delete_key" for="merchantmgnt_delete_${_pageRef}" />
				</psj:submit>
			</ps:if> 


			<ps:if test='%{#ivcrud_${_pageRef}=="AD"}'>
				<psj:submit id="merchantmgnt_approveDelete_${_pageRef}"
					button="true" freezeOnSubmit="true"
					onclick="merchantMgnt_setMethodName('approveDelete')">
					<ps:label key="appr_delete_key"
						for="merchantmgnt_approveDelete_${_pageRef}" />
				</psj:submit>
			</ps:if>

			<ps:if test='%{#ivcrud_${_pageRef}=="RA"}'>
				<psj:submit id="merchantmgnt_reactivate_${_pageRef}" button="true"
					freezeOnSubmit="true"
					onclick="merchantMgnt_setMethodName('reactivate')">
					<ps:label key="reactivate_key"
						for="merchantmgnt_reactivate_${_pageRef}" />
				</psj:submit>
			</ps:if>

			<ps:if test='%{#ivcrud_${_pageRef}=="AR"}'>
				<psj:submit id="merchantmgnt_approveReactivate_${_pageRef}"
					button="true" freezeOnSubmit="true"
					onclick="merchantMgnt_setMethodName('approveReactivate')">
					<ps:label key="approve_reactivate_key"
						for="merchantmgnt_approve_reactivate_${_pageRef}" />
				</psj:submit>
			</ps:if>
		</ps:if>
	</ptt:toolBar>
</ps:form>

<style>
.disableDropDown {
	background: #E1E1E1 !important;
	border: 1px solid #999999 !important;
	color: #3C3C3C !important;
}
</style>

<script type="text/javascript">
	$.struts2_jquery.require("MerchantMgntMaint.js", null, jQuery.contextPath
			+ "/path/js/atm/merchants/merchantmgnt/");
	$("#merchantMgntDefFormId_" + _pageRef).processAfterValid(
			"merchantMgnt_conformOnButton", []);
	var acc_add_ref_IBAN_can_not_be_empty_val = "${acc_add_ref_IBAN_can_not_be_empty_key}";
	var merchant_account_not_valid_val = "${merchant_account_not_valid_key}";
	var merchant_acc_req_val = "${merchant_acc_req_key}";
</script>

