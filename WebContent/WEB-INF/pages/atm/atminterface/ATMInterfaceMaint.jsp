<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@include file="/WEB-INF/pages/atm/atmcommon/ATMAppTrans.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>

<ps:set name="ivcrud_${_pageRef}"    value="iv_crud"/>
<ps:set name="statusId_${_pageRef}"  value="atmInterfaceCO.iso_INTERFACESVO.STATUS" />

<ps:form id="atmInterfaceForm_${_pageRef}" target="_blank" applyChangeTrack="true" useHiddenProps="true" cssStyle="margin-bottom: 0px;">
	<ps:hidden id="isoMessageGridData_${_pageRef}" 	name="isoMessageGridData"></ps:hidden>
	<ps:hidden id="isoFieldsGridData_${_pageRef}" 	name="isoFieldsGridData"></ps:hidden>
	<ps:hidden id="subFieldsGridData_${_pageRef}" 	name="subFieldsGridData"></ps:hidden>
	<ps:hidden id="isoInterfaceCode_${_pageRef}" 	name="atmInterfaceCO.iso_INTERFACESVO.INTERFACE_CODE"></ps:hidden>
	<ps:hidden id="statusId_${_pageRef}"  		 	name="atmInterfaceCO.iso_INTERFACESVO.STATUS"></ps:hidden>
	<ps:hidden id="approveBy_${_pageRef}"  		 	name="atmInterfaceCO.iso_INTERFACESVO.APPROVED_BY"></ps:hidden>
	<ps:hidden id='crudMode_${_pageRef}' 		 	name="atmInterfaceCO.mode" ></ps:hidden>
	<ps:hidden id="fieldsGridReadOnly_${_pageRef}" ></ps:hidden>
	<ps:hidden id='saveRecord_${_pageRef}' value="0"  ></ps:hidden>
	<ps:hidden id="isFormChanged_${_pageRef}" name="isFormChanged" />
	
	<div id="atm_Interface_form_${_pageRef}" class="connectedSortable ui-helper-reset" style="margin-bottom: 5px; margin-top: 3px;">
		<div id="atm_InterfaceInner_form_${_pageRef}" class="collapsibleContainer" title="<ps:text name="interface_definition_key" />">
			<table width="100%" cellpadding="2" cellspacing="1">
				<tr>
					<td style="width: 1%"></td>
					<td style="width: 10%"></td>
					<td style="width: 25%"></td>
					<td style="width: 10%"></td>
					<td style="width: 25%"></td>
					<td class="fldLabelView"  style="width:20%; text-align:right" >
						<ps:label key="status_key" for="status_${_pageRef}" id="lbl_statusDesc_${_pageRef}"/>	
					</td>
					<td style="width:10%;">
						<ps:textfield name="atmInterfaceCO.statusDesc"
							id="statusDesc_${_pageRef}" readonly="true"
							cssStyle="background:${atmInterfaceCO.statusColorCode}!important;color:white!important;text-align:center!important">
						</ps:textfield>
					</td>
					<td style="width:20%;text-align:right" >
						 <psj:a button="true" buttonIcon="ui-icon-triangle-2-s" tabindex="15" onclick="ATMIntLst_onStatusClicked()"><ps:text name='status_key'/></psj:a>
					</td>
					<td  style="width: 10%"></td>
					<td  style="width: 25%"></td>
					<td  style="width: 10%"></td>
				</tr>
			</table>
			<table>
				<tr>
					<td nowrap="nowrap">
						<ps:label id="lbl_atm_code_${_pageRef}" key="Code_key" for="atm_code_${_pageRef}"></ps:label>
					</td>
					<td colspan="3" nowrap="nowrap">
						<ps:textfield id="atm_code_${_pageRef}" readonly="true" cssStyle="width: 125px;" tabindex="-1" 
							name="atmInterfaceCO.iso_INTERFACESVO.INTERFACE_CODE" mode="number" >
						</ps:textfield>
					</td>
				</tr>
				<tr>
					<td nowrap="nowrap">
						<ps:label id="lbl_atm_desc_${_pageRef}" key="Description_key" for="atm_desc_${_pageRef}"></ps:label>
					</td>
					<td nowrap="nowrap">
						<ps:textfield id="atm_desc_${_pageRef}" required="true" name="atmInterfaceCO.iso_INTERFACESVO.DESCRIPTION" 
							maxlength="40" mode="text" tabindex="2" size="55">
						</ps:textfield>
					</td>
					<td></td>
				</tr>
				
				<tr>
					<td nowrap="nowrap">
						<ps:label id="lbl_int_type_${_pageRef}" key="interface_type_key" for="int_type_${_pageRef}"></ps:label>
					</td>
					<td nowrap="nowrap">
						<ps:select  id="int_type_${_pageRef}" cssStyle="width: 125px;" name="atmInterfaceCO.iso_INTERFACESVO.INTERFACE_TYPE" 
							tabindex="3" list="interfaceTypeList" listKey="code" listValue="descValue" onchange="ATMInterface_interfaceTypeChangeDep();"> 
						</ps:select>
					</td>
					<td></td>
				</tr>
			</table>
		</div>
	</div>
		
	<div id="atm_Interface_form_${_pageRef}" class="connectedSortable ui-helper-reset iso_required_fields_${_pageRef}" style="margin-bottom: 5px; margin-top: 3px;">
		<div id="atm_InterfaceInner_form_${_pageRef}" class="collapsibleContainer" title="<ps:text name="Interface_setting_key" />">
			<table>		
				<%-- <tr>
					<td nowrap="nowrap">
						<ps:label id="lbl_ip_${_pageRef}" key="ip_addrs_key" for="atm_ip_${_pageRef}"></ps:label>
					</td>
					<td nowrap="nowrap">
						<ps:textfield id="atm_ip_${_pageRef}" name="IP" cssStyle="width: 125px;"
							maxlength="20" mode="text" tabindex="3" size="55">
						</ps:textfield>
					</td>
					<td></td>
					<td nowrap="nowrap">
						<ps:label id="lbl_port_${_pageRef}" key="port_num_key" for="port_${_pageRef}"></ps:label>
					</td>
					<td nowrap="nowrap">
						<ps:textfield id="port_${_pageRef}" name="PORT" cssStyle="width: 125px;"
							maxlength="4" mode="text" tabindex="4" size="55">
						</ps:textfield>
					</td>
				</tr> --%>
				
				<tr class="iso_required_fields_${_pageRef}">
					<td nowrap="nowrap">
						<ps:label id="lbl_atm_id_${_pageRef}" key="Message_Length_key" for="msg_length_${_pageRef}"></ps:label>
					</td>
					<td nowrap="nowrap">
						<ps:textfield id="msg_length_${_pageRef}" cssStyle="width: 125px;" name="atmInterfaceCO.iso_INTERFACESVO.MSG_LENGTH" 
							maxlength="2" mode="number" tabindex="5" size="70" required="true">
						</ps:textfield>
					</td>
					<td></td>
					<td nowrap="nowrap">
						<ps:label id="lbl_protocolIdent_${_pageRef}" key="protocol_identification_key" for="protocol_identification_${_pageRef}"></ps:label>
					</td>
					<td nowrap="nowrap">
						<ps:textfield id="protocol_identification_${_pageRef}" name="atmInterfaceCO.iso_INTERFACESVO.PROTOCOL_IDENTITFICATION" cssStyle="width: 125px;" maxlength="10" mode="text" tabindex="6" >
						</ps:textfield>
					</td>
				</tr>
				
				<tr class="iso_required_fields_${_pageRef}">
					<td nowrap="nowrap">
						<ps:label id="lbl_atm_id_${_pageRef}" key="Header_Length_key" for="hdr_length_${_pageRef}"></ps:label>
					</td>
					<td nowrap="nowrap">
						<ps:textfield id="hdr_length_${_pageRef}" cssStyle="width: 125px;" name="atmInterfaceCO.iso_INTERFACESVO.HEADER_LENGTH" maxlength="2" mode="number" tabindex="6" size="70">
						</ps:textfield>
					</td>
					<td></td>
					<td nowrap="nowrap">
						<ps:label id="lbl_header_${_pageRef}" key="Header_key" for="header_${_pageRef}"></ps:label>
					</td>
					<td nowrap="nowrap">
						<ps:textfield id="header_${_pageRef}" name="atmInterfaceCO.iso_INTERFACESVO.HEADER_DATA" cssStyle="width: 125px;" maxlength="100" mode="text" tabindex="7" size="70">
						</ps:textfield>
					</td>
				</tr>
				
				<tr class="iso_required_fields_${_pageRef}">
					<td nowrap="nowrap">
						<ps:label id="lbl_bitmap_type_${_pageRef}" key="Bitmap_Type_key" for="bitmap_type_${_pageRef}"></ps:label>
					</td>
					<td nowrap="nowrap">
						<ps:select id="bitmap_type_${_pageRef}" cssStyle="width: 125px;" name="atmInterfaceCO.iso_INTERFACESVO.BITMAP_TYPE" 
							tabindex="8" list="bitMapTypeList" listKey="code" listValue="descValue" required="true"> 
						</ps:select>
					</td>
					<td></td>
					<td nowrap="nowrap">
						<ps:label id="lbl_length_type_${_pageRef}" key="Length_Type_key" for="length_type_${_pageRef}"></ps:label>
					</td>
					<td nowrap="nowrap">
						<ps:select id="length_type_${_pageRef}" cssStyle="width: 125px;" name="atmInterfaceCO.iso_INTERFACESVO.LENGTH_TYPE" 
							tabindex="9" list="lengthTypeList" listKey="code" listValue="descValue" required="true"> 
						</ps:select>
					</td>
				</tr>
				
				<tr class="iso_required_fields_${_pageRef}">
					<td nowrap="nowrap">
						<ps:label id="lbl_include_Len_${_pageRef}" key="include_length_key" for="include_Len_${_pageRef}"></ps:label>
					</td>
					<td nowrap="nowrap">
						<ps:checkbox id="include_Len_${_pageRef}" name="atmInterfaceCO.iso_INTERFACESVO.INCLUDE_LENGTH" valOpt="1:0" 
							tabindex="10"/>
					</td>
					<td></td>
					<td nowrap="nowrap">
						<ps:label id="lbl_pos_hdr_${_pageRef}" key="pos_in_header_key" for="pos_hdr_${_pageRef}"></ps:label>
					</td>
					<td nowrap="nowrap">
						<ps:checkbox id="pos_hdr_${_pageRef}" name="atmInterfaceCO.iso_INTERFACESVO.POS_IN_HEADER_YN" valOpt="Y:N" 
							tabindex="11"/>
					</td>
				</tr>
				
				<tr class="iso_required_fields_${_pageRef}">
					<td nowrap="nowrap">
						<ps:label id="lbl_skip_bitmap_${_pageRef}" key="skip_bitmap_key" for="skip_bitmap_${_pageRef}"></ps:label>
					</td>
					<td nowrap="nowrap">
						<ps:checkbox id="skip_bitmap_${_pageRef}" name="atmInterfaceCO.iso_INTERFACESVO.SKIP_BITMAP_YN" valOpt="Y:N" 
							tabindex="12"/>
					</td>
					<td></td>
					<td nowrap="nowrap" >
						<ps:label id="lbl_iso_present_${_pageRef}" key="iso_present_key" for="iso_present_${_pageRef}"></ps:label>
					</td>
					<td nowrap="nowrap">
						<ps:checkbox id="iso_present_${_pageRef}" name="atmInterfaceCO.iso_INTERFACESVO.ISO_PRESENT_YN" valOpt="Y:N" 
							tabindex="13"/>
					</td>
				</tr>
				
				<%-- <tr>
					<td colspan="2" nowrap="nowrap">
						<table>
							<tr>
								<td nowrap="nowrap">
									<ps:label id="lbl_restart_time_${_pageRef}" key="restart_connection_time_key" for="restart_time_${_pageRef}"></ps:label>
								</td>
								<td nowrap="nowrap">
									<ps:textfield id="restart_time_${_pageRef}" name="atmInterfaceCO.iso_INTERFACESVO.ATM_RECONNECT_TIME" 
										cssStyle="width: 90px;" tabindex="14" maxValue="60"
										mode="number" >
									</ps:textfield>
								</td>
								<td>
									<ps:label id="lbl_minutes_${_pageRef}" key="minutes_key"></ps:label>
								</td>
							</tr>
						</table>
					</td>
					<td width="3%"></td>
				</tr> --%>
			</table>
		</div>
	</div>
<%--  collapsed --%>
	
	<div id="iso_Fields_${_pageRef}" class="connectedSortable ui-helper-reset iso_required_fields_${_pageRef}" style="margin-bottom: 5px; margin-top: 3px;">
		<div id="iso_Fields_Inner_${_pageRef}" class="collapsibleContainer" title="<ps:text name="iso_fields_settings" />" >
			<%@include file="ISOFieldsList.jsp"%>
		</div>
	</div>	
	
	<!-- Add class  collapsed for collapsed -->
	<div id="iso_Message_${_pageRef}" class="connectedSortable ui-helper-reset iso_required_fields_${_pageRef}" style="margin-bottom: 5px; margin-top: 3px;">
		<div id="iso_Message_Inner_${_pageRef}" class="collapsibleContainer" title="<ps:text name="iso_msg_setting_key" />">
			<%@include file="ISOMessageSetup.jsp"%>
		</div>
	</div>	  
	
	<ptt:toolBar id="isoMessageToolBar_${_pageRef}" hideInAlert="true">
		<ps:if test='%{@com.path.atm.bo.common.ATMCommonConstants@IV_CRUD_MAINTENANCE.equals(iv_crud)}'>
			<ps:if test='%{@com.path.atm.bo.common.ATMCommonConstants@STATUS_ACTIVE.equals(atmInterfaceCO.iso_INTERFACESVO.STATUS) 
												|| atmInterfaceCO.iso_INTERFACESVO.STATUS == null}'>
												
				<psj:submit id="isoMessage_save_${_pageRef}" button="true" freezeOnSubmit="true" buttonIcon="ui-icon-disk">
					<ps:label key="Save_key" for="isoMessage_save_${_pageRef}"/>
			    </psj:submit>
			
			</ps:if>
			
			<ps:if test='%{@com.path.atm.bo.common.ATMCommonConstants@STATUS_ACTIVE.equals(atmInterfaceCO.iso_INTERFACESVO.STATUS)
							&& atmInterfaceCO.iso_INTERFACESVO.APPROVED_BY == null}'>
				<psj:submit id="isoMessage_del_${_pageRef}" button="true" freezeOnSubmit="true" buttonIcon="ui-icon-trash" 
		    				onclick="AtmIntMaint_onDeleteClicked()">
			   		<ps:label key="Delete_key" for="isoMessage_del_${_pageRef}"/>
			    </psj:submit>							
			</ps:if>
		</ps:if>
		
		<ps:if test='%{@com.path.atm.bo.common.ATMCommonConstants@IV_CRUD_APPROVE.equals(iv_crud)}'>
			<psj:submit id="atmInterfaceMaint_approve_${_pageRef}" button="true" freezeOnSubmit="true" 
				onclick="AtmIntMaint_processApprove()" buttonIcon="ui-icon-disk">
		    	<ps:label key="approve_key" for="atmInterfaceMaint_approve_${_pageRef}"/>
		    </psj:submit>
		</ps:if>
		
		<ps:if test='%{@com.path.atm.bo.common.ATMCommonConstants@IV_CRUD_UPDATE_AFTER_APPROVE.equals(iv_crud)}'>
			 <psj:submit id="atmIntMaintUpdate_${_pageRef}" button="true" freezeOnSubmit="true" buttonIcon="ui-icon-disk">
		    	<ps:label key="Update_key" for="atmIntMaintUpdate_${_pageRef}"/>
		     </psj:submit>
		</ps:if>
		
		<ps:if test='%{@com.path.atm.bo.common.ATMCommonConstants@IV_CRUD_SUSPENDED.equals(iv_crud)}'>
			 <psj:submit id="atmIntMaint_suspend_${_pageRef}" button="true" freezeOnSubmit="true" onclick="AtmIntMaint_processSuspend()">
		    	<ps:label key="suspend_key" for="atmIntMaint_suspend_${_pageRef}"/>
		    </psj:submit>	    
		</ps:if>
		
		<ps:if test='%{@com.path.atm.bo.common.ATMCommonConstants@IV_CRUD_REACTIVATE.equals(iv_crud)}'>
			  <psj:submit id="atmIntMaint_reactivate_${_pageRef}" button="true" freezeOnSubmit="true" 
		    	onclick="AtmIntMaint_processReactivate()">
		    	<ps:label key="Reactivate_key" for="atmIntMaint_reactivate_${_pageRef}"/>
		    </psj:submit>	    
		</ps:if>
	</ptt:toolBar>
	
	<ps:hidden id="dialogExpression_${_pageRef}" name="dialogExpression" />
	<ps:hidden type="hidden" id="dialogOpenFrom_${_pageRef}" name="dialogOpenFrom"/>
	<ps:hidden type="hidden" id="dialogOpenFromGrid_${_pageRef}" name="dialogOpenFromGrid"/>
	<ps:hidden type="hidden" id="dialogOpenFromGridRowId_${_pageRef}" name="dialogOpenFromGridRowId"/>
	<ps:hidden type="hidden" id="dialogOpenFromGridRowColumn_${_pageRef}" name="dialogOpenFromGridRowColumn"/>
</ps:form>

<div id="ISO_Message_Dialog_${_pageRef}"></div>
<div id="fieldFormatDialog_${_pageRef}"></div>
<div id="jobProcessingDialog_${_pageRef}"></div>
<div id="serviceDialog_${_pageRef}"></div>

<style>
	.disableDropDown{
		background: #E1E1E1 !important;
		border: 1px solid #999999 !important;
		color: #3C3C3C !important;
	}
</style>

<script type="text/javascript">
$(document).ready(function() 
{                        
	$("#atmInterfaceForm_"+_pageRef).processAfterValid("ATMMnt_saveInterface",{});
   	$("div#atm_Interface_form_"+_pageRef+" .collapsibleContainer").collapsiblePanel();
   	$("div#iso_Fields_"+_pageRef+" .collapsibleContainer").collapsiblePanel();
   	$("div#iso_Message_"+_pageRef+" .collapsibleContainer").collapsiblePanel();
   	$("#gview_interfaceListGridTbl_Id_"+_pageRef+" div.ui-jqgrid-titlebar").hide();
   	
   	$.struts2_jquery.require("ATMInterfaceList.js,ATMInterfaceMaint.js,MessageSettings.js,ATMInterfaceISOFields.js", null, jQuery.contextPath + "/path/js/atm/atminterface/");
	$.struts2_jquery.require("baseConverter.js", null, jQuery.contextPath + "/path/js/atm/atminterface/");
	$.struts2_jquery.require("InterfaceExpressions.js", null, jQuery.contextPath + "/path/js/atm/atminterface/");
/* 	$.struts2_jquery.require("CommonPwsMappingMaint.js", null, jQuery.contextPath+ "/path/js/imco/pwsmapping/"); */
	$.struts2_jquery.require("script.js", null, jQuery.contextPath+"/path/js/atm/atmcommon/");
	$.struts2_jquery.require("ISOExpression.js" ,null,jQuery.contextPath+"/path/js/atm/atmcommon/expression/");
	$.struts2_jquery.require("CommonExpressionJs.js" ,null,jQuery.contextPath+"/path/js/commonexpression/");
	
	var checkDisable = $("#_recReadOnly_"+_pageRef).val();
	if(checkDisable == "true")
	{
		$("#type_"+_pageRef).addClass('disableDropDown');
		$("#type_"+_pageRef).attr('tabindex', '-1');
		
		$("#int_type_"+_pageRef).addClass('disableDropDown');
		$("#int_type_"+_pageRef).attr('tabindex', '-1');
		
		$("#bitmap_type_"+_pageRef).addClass('disableDropDown');
		$("#bitmap_type_"+_pageRef).attr('tabindex', '-1');
		
		$("#length_type_"+_pageRef).addClass('disableDropDown');
		$("#length_type_"+_pageRef).attr('tabindex', '-1');
	}
});

</script>