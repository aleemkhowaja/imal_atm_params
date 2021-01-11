<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt"  uri="/path-toolbar-tags" %>

<ps:form useHiddenProps="true" id="statusCustomizationMaintFormId_${_pageRef}"  namespace="/path/statusCustomization">
<ps:set name="ivcrud_${_pageRef}"             value="iv_crud" />
<ps:set name="actionType_${_pageRef}"         value="actionType"/>
<ps:set name="toolBarMode_${_pageRef}"        value="_toolBarMode"/>
<ps:hidden id="submitMethodName_${_pageRef}"  name="actionType"/>
<ps:hidden id="stsCustActionType_${_pageRef}" name="actionType"/>
<ps:hidden id="stsCustIv_crud_${_pageRef}"    name="iv_crud"/>
<table width="100%" cellpadding="0" cellspacing="0">
	<tr>
		<td width="15%">
			<ps:label id="lbl_appDesc_${_pageRef}" key="trans_current_app_key" for="appDesc_${_pageRef}"></ps:label>
		</td>
		<td colspan="2">
		    <ps:hidden    id="APP_NAME_${_pageRef}" name="statusCustomizationCO.APP_NAME"></ps:hidden>
            <ps:textfield id="appDesc_${_pageRef}"  name="statusCustomizationCO.APP_DESC" readonly="true"></ps:textfield>
		</td>
		<td></td>
		<td></td>
	</tr>
	<tr>
		<td>
			<ps:label id="lbl_screenName_${_pageRef}" key="screen_name_key" for="screenLocation_${_pageRef}"></ps:label>
		</td>
		<td width="90px">
		    <psj:submit id="statusCustTreeMenuBtnId_${_pageRef}" disabled="${_menuReadOnly}" button="true" type="button" freezeOnSubmit="true" onclick="statusCust_openMenuTree('saveNew')">
		    	<ps:label key="menuTree_key" for="statusCustTreeMenuBtnId"/>
		    </psj:submit>
		</td>
		<td width="30%">
		    <ps:hidden id="PROG_REF_${_pageRef}" name="statusCustomizationCO.PROG_REF"></ps:hidden>
			<ps:textfield id="screenLocation_${_pageRef}" name="statusCustomizationCO.screenLocation" required="true" readonly="true"></ps:textfield>
		</td>		
		<td></td>
	</tr>
	<tr>
		<td width="15%">
			<ps:label id="lbl_lovType_${_pageRef}" key="lov_type_key" for="lookuptxt_lovType_${_pageRef}"></ps:label>
		</td>
		<td>
			<psj:livesearch name="LOV_TYPE_ID"
				 id="lovType_${_pageRef}" required="true"
				 resultList="LOV_TYPE_DESCRIPTION:lovTypeDesc"
				 actionName="${pageContext.request.contextPath}/path/statusCustomization/StatusCustLookup_constructLovLookup"
				 parameter="LOV_TYPE_ID:lookuptxt_lovType_${_pageRef}"
				 dependencySrc="${pageContext.request.contextPath}/path/statusCustomization/StatusCustomizationMaintAction_dependencyByLovType"
				 dependency="lookuptxt_lovType_${_pageRef}:statusCustomizationCO.LOV_TYPE_ID,lovTypeDesc_${_pageRef}:statusCustomizationCO.LOV_TYPE_DESCRIPTION,selectedStsCodes_${_pageRef}:statusCustomizationCO.selectedStsCodes,lookuptxt_STATUS_DESC_${_pageRef}:statusCustomizationCO.STATUS_DESC"
				 searchElement="LOV_TYPE_ID" relatedDescElt="lovTypeDesc_${_pageRef}" readOnlyMode="${_lovTypeReadOnly}">
			</psj:livesearch>
		</td>
		<td>
		   <ps:textfield id="lovTypeDesc_${_pageRef}" name="statusCustomizationCO.LOV_TYPE_DESCRIPTION" readonly="true"></ps:textfield>
		</td>
		<td width="15%" align="right">
			<ps:label id="lbl_statusValues_${_pageRef}" key="status_values_key" for="lookuptxt_STATUS_DESC_${_pageRef}"></ps:label>
		</td>
		<td>
		    <ps:hidden id="selectedStsCodes_${_pageRef}" name="statusCustomizationCO.selectedStsCodes"></ps:hidden>
			<psj:livesearch name="statusCustomizationCO.STATUS_DESC"
				 id="STATUS_DESC_${_pageRef}" required="true"
				 resultList="STATUS_DESC:lookuptxt_STATUS_DESC_${_pageRef}"
				 paramList="lovTypeId:lookuptxt_lovType_${_pageRef},progRef:PROG_REF_${_pageRef},actionType:stsCustActionType_${_pageRef}"
				 actionName="${pageContext.request.contextPath}/path/statusCustomization/StatusCustLookup_constructLookup" 
				 searchElement="STATUS_DESC" multiSelect="true" multiResultInput="selectedStsCodes_${_pageRef}" selectColumn="STATUS_CODE">
			</psj:livesearch>
		</td>
	</tr>
</table>
  <ptt:toolBar id="statusCustomizationMaintToolBar" hideInAlert="true">
    <psj:submit id="statusCustomizationMaint_save" button="true" freezeOnSubmit="true" onclick="statusCust_setMethodName('saveNew')">
    	<ps:label key="Save_key" for="statusCustomizationMaint_save"/>
    </psj:submit>
  </ptt:toolBar>
</ps:form>
<script type="text/javascript">
$(document).ready(function() {					
	$.struts2_jquery.require("StatusCustomizationMaint.js" ,null,jQuery.contextPath+"/path/js/statuscustomization/");
	$("#statusCustomizationMaintFormId_"+_pageRef).processAfterValid("statusCustomizationMaint_processSubmit",{});
});
</script>