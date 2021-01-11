<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<ps:set name="confirm_MandatorySet_Process_key_var" value="%{getEscText('Confirm_MandatorySet_Process_key')}"/>
<ps:set name="help_key_var"                value="%{getEscText('help_key')}"/>
<ps:set name="checkReadOnly_key"           value="%{getEscText('checkReadOnly_key')}"/>
<ps:set name="editableRemNotAllowed_trns"  value="%{getEscText('fld_cust_editable_remove_not_allowed_key')}"/>
<ps:set name="visbilityRemNotAllowed_trns" value="%{getEscText('fld_cust_visibility_remove_not_allowed_key')}"/>

<ps:set name="objectDisplayID" value="custCO.sysParamObjDisplayVO.OBJ_DISPLAY_ID"/>
<ps:set name="fromObjDisplay" value="true"/>

<ps:form id="custObjectMaintForm_${_pageRef}">
<ps:hidden name="custCO.sysParamObjDisplayVO.PROG_REF" id="fldcust_progRef_${_pageRef}"/>
<ps:hidden name="custCO.sysParamObjDisplayVO.BUS_RELATED" id="fldcust_busrelated_${_pageRef}"/>
<ps:hidden name="custCO.sysParamObjDisplayVO.IS_ADM_CUST_DIS_YN" id="fldcust_isAdmCustDis_${_pageRef}"/>
<ps:hidden name="allowDisableUsrCustRight" id="fldcust_allowDisableUsrCustRight_${_pageRef}"/>
<ps:hidden name="custCO.cutomizationPROG_REF"/>
<ps:hidden name="custCO.appName"  id="fldcust_appName_${_pageRef}"/> 
<ps:hidden name="commonScreen"/>
<ps:hidden name="custCO.sysParamObjDisplayVO.OBJECT_ID"   id="objectId"/> <%/*it was customId*/%>
<ps:hidden name="custCO.sysParamObjDisplayVO.OBJECT_TYPE" id="objectType"/>
<ps:hidden name="custCO.sysParamObjDisplayVO.OBJ_DISPLAY_ID" id="objectDisplayID"/>
	
	
	<script type="text/javascript">
		var custScrPageRef                   = '<ps:property value="_pageRef" escapeHtml="false" escapeJavaScript="true"/>';
		var visbilityRemNotAllowed_trns      = '<ps:property value="visbilityRemNotAllowed_trns" escapeHtml="false" escapeJavaScript="true"/>';
		var editableRemNotAllowed_trns       = '<ps:property value="editableRemNotAllowed_trns" escapeHtml="false" escapeJavaScript="true"/>';
		var checkReadOnly_key                = '<ps:property value="checkReadOnly_key" escapeHtml="false" escapeJavaScript="true"/>';
		var confirm_MandatorySet_Process_key = '<ps:property value="confirm_MandatorySet_Process_key_var" escapeHtml="false" escapeJavaScript="true"/>';
		var help_key_var                     = '<ps:property value="help_key_var" escapeHtml="false" escapeJavaScript="true"/>';
		$.struts2_jquery.require("ObjectCustomization.js" ,null,jQuery.contextPath+"/common/js/customization/object/");
		if('<ps:property value="custCO.sysParamObjDisplayVO.BUS_RELATED" escapeHtml="false" escapeJavaScript="true"/>' == 1 || ('<ps:property value="custCO.sysParamObjDisplayVO.IS_ADM_CUST_DIS_YN" escapeHtml="false" escapeJavaScript="true"/>' == 1 && ('<ps:property value="allowDisableUsrCustRight" escapeHtml="false" escapeJavaScript="true"/>' == null || '<ps:property value="allowDisableUsrCustRight" escapeHtml="false" escapeJavaScript="true"/>' == '')))
		{
		$("#fieldCust_saveBtn").remove();
		}
	</script>
	
	
	<table border="0" cellpadding="1" cellspacing="0" width="100%">
		<ps:if test="custCO.sysParamObjDisplayVO.BUS_RELATED == 1 && forTrans == null">
			<tr>
				<td class="note" colspan="10" style="text-align: center;"><ps:text name="customization_cannot_change_key"></ps:text></td>
			</tr>
		</ps:if>
		<ps:else>						
			<ps:if test="custCO.sysParamObjDisplayVO.IS_ADM_CUST_DIS_YN == 1 && allowDisableUsrCustRight == null">
				<tr>
					<td class="note" colspan="10" style="text-align: center;"><ps:text name="cust_is_dis_by_admin_key"></ps:text></td>
				</tr>
			</ps:if>
		</ps:else>		
		<TR>
			<TD colspan="10" style="padding:10px;">
				<div class="note" style="text-align: center;">
					<ps:actionerror theme="simple" />
				</div>
			</TD>
		</TR>
		<tr>
			<td>
				<table cellpadding="0" cellspacing="0">
						<tr>
							<td colspan="4" nowrap="nowrap">
								<table cellpadding="0" cellspacing="0">
								<tr>
									<td nowrap="nowrap">
									<ps:checkbox name="custCO.specificFlag"
											id="fldcust_specificMenu_${_pageRef}" />

									</td>
									<td nowrap="nowrap">
										<ps:label key="for_specif_menu_key"
											id="lbl_fldcust_specificMenu_${_pageRef}"
											for="fldcust_specificMenu_${_pageRef}"></ps:label>
									</td>
								</tr>
								</table>
							</td>
						</tr>
				</table>
			</td>
		</tr>
			<tr>
				<td>
					<table cellpadding="1" cellspacing="0">
						<tr>
							<td nowrap="nowrap">
								<ps:label key="visible_key" id="lbl_fldcust_visibleFlag_${_pageRef}"
									for="fldcust_visibleFlag_${_pageRef}"></ps:label>
							</td>
							<td>
								<ps:select id="fldcust_visibleFlag_${_pageRef}"
									name="custCO.sysParamObjDisplayVO.IS_VISIBLE"
									onchange="objCust_CheckVisbleReadOnlyVal(this,'VIS');"
									list="visibilityCmbList" listKey="code" listValue="descValue">
								</ps:select>
							</td>
							<td width="2px"/>
							<td nowrap="nowrap">
								<ps:label key="visibility_expr_key"
									id="lbl_fldcust_visibleExpr_${_pageRef}"
									for="fldcust_visibleExpr_${_pageRef}"></ps:label>

							</td>
							<td>
							    <ps:textarea id="fldcust_visibleExpr_${_pageRef}" name="custCO.sysParamObjDisplayVO.VISIBILITY_EXPR"
							                 maxlength="1000" cols="85" rows="2"></ps:textarea>
							</td>
						</tr>
						<tr>
							<td nowrap="nowrap">
								<ps:label key="read_only_key"
									id="lbl_fldcust_readOnlyFlag_${_pageRef}"
									for="fldcust_readOnlyFlag_${_pageRef}"></ps:label>
							</td>
							<td>
								<ps:select id="fldcust_readOnlyFlag_${_pageRef}" 
									disabled="%{custCO.isGridReadOnly}"
									name="custCO.sysParamObjDisplayVO.IS_READONLY"
									onchange="objCust_CheckVisbleReadOnlyVal(this,'READONLY');"
									list="readonlyCmbList" listKey="code" listValue="descValue">
								</ps:select>
							</td>
							<td width="2px"/>
							<td nowrap="nowrap">
								<ps:label key="readonly_expr_key"
									id="lbl_fldcust_readonlyExpr_${_pageRef}"
									for="fldcust_readonlyExpr_${_pageRef}"></ps:label>

							</td>
							<td>
							    <ps:textarea id="fldcust_readonlyExpr_${_pageRef}" name="custCO.sysParamObjDisplayVO.READONLY_EXPR"
							                 maxlength="1000" cols="85" rows="2"></ps:textarea> 
							</td>
						</tr>
						<tr>
							<td nowrap="nowrap">
								<ps:label key="add_delete_key"
									id="lbl_fldcust_addDeleteFlag_${_pageRef}"
									for="fldcust_addDeleteFlag_${_pageRef}"></ps:label>
							</td>
							<td>
								<ps:select id="fldcust_addDeleteFlag_${_pageRef}"
									disabled="%{custCO.isGridReadOnly}"
									name="custCO.sysParamObjDisplayVO.ADD_DELETE_ROW_YN"
									onchange="objCust_CheckVisbleReadOnlyVal(this,'ADD_DELETE');"
									list="addDeleteCmbList" listKey="code" listValue="descValue">
								</ps:select>
							</td>
							<td width="2px"/>
							<td nowrap="nowrap">
								<ps:label key="add_delete_expr_key"
									id="lbl_fldcust_addDeleteExpr_${_pageRef}"
									for="fldcust_addDeleteExpr_${_pageRef}"></ps:label>

							</td>
							<td>
							    <ps:textarea id="fldcust_addDeleteExpr_${_pageRef}" name="custCO.sysParamObjDisplayVO.ADD_DELETE_ROW_EXPR"
							                 maxlength="1000" cols="85" rows="2"></ps:textarea> 
							</td>
						</tr>
						<ps:if test="allowDisableUsrCustRight != null">					
							<tr>		
								<td>
									<ps:checkbox id="fldcust_allow_disable_user_customizationKey_${_pageRef}" valOpt="1:0"
									name="custCO.sysParamObjDisplayVO.IS_ADM_CUST_DIS_YN"/>
									<ps:label key="allow_disable_user_customization_key"
										id="lbl_fldcust_allow_disable_user_customizationKey_${_pageRef}"
										for="fldcust_allow_disable_user_customizationKey_${_pageRef}">
									</ps:label>
								</td>
							</tr>
						</ps:if>
					</table>
				</td>
			</tr>
			<tr>
			    <td>
			       <table cellpadding="0" cellspacing="0">
						<tr>
							<ps:if test="custCO.sysParamObjDisplayVO.BUS_RELATED != 1 && (custCO.sysParamObjDisplayVO.IS_ADM_CUST_DIS_YN != 1 || allowDisableUsrCustRight != null)">
								<td>
									<psj:submit button="true"
										onclick="objCust_resetCustomization()" type="button"
										buttonIcon="ui-icon-trash">
										<ps:label key="Reset_key" />
									</psj:submit>
								</td>
						
							<ps:if test="%{expImpCustRight != null}">
								<td>
								<psj:submit button="true" onclick="exportScreenCustomization('object')" type="button"
									buttonIcon="ui-icon-trash">
									<ps:label key="Export_Customization_key" />
								</psj:submit>
								</td>
								</ps:if>
							</ps:if>

						</tr>
			       </table>
			    </td>
			</tr>
			<tr>
			<td>
				<div id="custObjectDetails_div_${_pageRef}">
					<%@include file="ObjectCustomizationDetails.jsp"%>
				</div>
			</td>
			</tr>
			<%/* button global activity */%>
			<tr>
				<td>
					<div id="elem_activity_div_<ps:property value="_pageRef" escapeHtml="true"/>">
						<%@include file="/WEB-INF/pages/common/customization/CustomElementActivityGrid.jsp"%>
					</div>
				</td>
			</tr> 
			<tr>
				<td><div id="fldcust_parmaMapGrid_<ps:property value="_pageRef" escapeHtml="true"/>"></div></td>
			</tr>  
	</table>
</ps:form>
<!-- style used for auto-complete pop up maximum height -->
<style>
.ui-autocomplete {
	max-height: 180px;
	overflow-y: auto;
	overflow-x: hidden;
}
</style>
<script type="text/javascript">
 var invalid_keyboard_shortcut_key = "<ps:text name='invalid_keyboard_shortcut_key'/>";
 var expression_cust_tags= [ ${custCO.autocompleteTags} ];
 apply_auto_complete('fldcust_visibleExpr_<ps:property value="_pageRef" escapeHtml="false" escapeJavaScript="true"/>',expression_cust_tags);
 apply_auto_complete('fldcust_readonlyExpr_<ps:property value="_pageRef" escapeHtml="false" escapeJavaScript="true"/>',expression_cust_tags);
</script>
