<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<ps:set name="confirm_MandatorySet_Process_key_var" value="%{getEscText('Confirm_MandatorySet_Process_key')}"/>
<ps:set name="help_key_var"                value="%{getEscText('help_key')}"/>
<ps:set name="checkReadOnly_key"           value="%{getEscText('checkReadOnly_key')}"/>
<ps:set name="editableRemNotAllowed_trns"  value="%{getEscText('fld_cust_editable_remove_not_allowed_key')}"/>
<ps:set name="visbilityRemNotAllowed_trns" value="%{getEscText('fld_cust_visibility_remove_not_allowed_key')}"/>
<ps:set name="invalid_lang_key_var" 	   value="%{getEscText('invalid_lang_key')}"/>
<jsp:include page="CustomizationInfoBar.jsp" />
<ps:form id="customizationMaintForm_${_pageRef}" applyChangeTrack="true">
	<ps:hidden name="custCO.screenDispVO.FLD_IDENTIFIER" id="fldcust_fldIdentifier_${_pageRef}"/>
	<ps:hidden name="custCO.screenDispVO.PROG_REF" id="fldcust_progRef_${_pageRef}"/>
	<ps:hidden name="custCO.screenDispVO.BUS_RELATED" id="fldcust_busrelated_${_pageRef}"/>
	<ps:hidden name="custCO.screenDispVO.IS_ADM_CUST_DIS_YN" id="fldcust_isAdmCustDis_${_pageRef}"/>
	<ps:hidden name="allowDisableUsrCustRight" id="fldcust_allowDisableUsrCustRight_${_pageRef}"/>
	<ps:hidden name="custCO.cutomizationPROG_REF"/>
	<ps:hidden name="custCO.appName" id="fldcust_appName_${_pageRef}"/>
	<ps:hidden name="custCO.fromTrans" />
	<ps:hidden name="fromButton" id="fldcust_fromButton_${_pageRef}"/> 
	<ps:hidden name="fromTab" id="fldcust_fromTab_${_pageRef}"/> 
	<ps:hidden name="enableAfterExecution"/> 
	<ps:hidden name="fromCollaps" id="fldcust_fromCollaps_${_pageRef}"/> 
	<ps:hidden id="fldcust_fromText_${_pageRef}" name="fromText"/>
	<ps:hidden id="fldcust_fromTextArea_${_pageRef}" name="fromTextArea"/>
	<ps:hidden id="fldcust_fromDatePicker_${_pageRef}" name="fromDatePicker"/>
	<ps:hidden id="fldcust_fromLiveSearch_${_pageRef}" name="fromLiveSearch"/>
	<ps:hidden id="fldcust_fromCommonScreen_${_pageRef}" name="fromCommonScreen"/>
	<ps:hidden id="fldcust_mode_${_pageRef}" name="mode"/>
	<ps:hidden id="fldcust_allowDefValCust_${_pageRef}" name="allowDefValCust"/>
	<ps:hidden name="commonScreen"/>
	<ps:hidden name="custCO.screenDispVO.ELEMENT_ID" id="customId"/>
	<ps:hidden name="custActionType" id="custActionType"/>
	<ps:hidden name="dateUpdated" id="dateUpdated"/>
	
	<ps:hidden name="_auditJsonStr" id="auditObj_SCRSETTCONF"/>
	<ps:hidden name="auditTrxNbr"   id="auditTrxNbr_SCRSETTCONF"/>
	<ps:hidden name="_pageRef"      id="pageRef_SCRSETTCONF"/>
	
	<script type="text/javascript">
		var custScrPageRef                   = '<ps:property value="_pageRef" escapeHtml="false" escapeJavaScript="true"/>';
		var visbilityRemNotAllowed_trns      = '<ps:property value="visbilityRemNotAllowed_trns" escapeHtml="false" escapeJavaScript="true"/>';
		var editableRemNotAllowed_trns       = '<ps:property value="editableRemNotAllowed_trns" escapeHtml="false" escapeJavaScript="true"/>';
		var checkReadOnly_key                = '<ps:property value="checkReadOnly_key" escapeHtml="false" escapeJavaScript="true"/>';
		var confirm_MandatorySet_Process_key = '<ps:property value="confirm_MandatorySet_Process_key_var" escapeHtml="false" escapeJavaScript="true"/>';
		var help_key_var                     = '<ps:property value="help_key_var" escapeHtml="false" escapeJavaScript="true"/>';
		var fromButton                       = '<ps:property value="fromButton" escapeHtml="false" escapeJavaScript="true"/>';
		var fromCommonScreen				 = '<ps:property value="commonScreen" escapeHtml="false" escapeJavaScript="true"/>';
		var fromTab                       	 = '<ps:property value="fromTab" escapeHtml="false" escapeJavaScript="true"/>';
		var fromCollaps                      = '<ps:property value="fromCollaps" escapeHtml="false" escapeJavaScript="true"/>';
		var fromText                     	 = '<ps:property value="fromText" escapeHtml="false" escapeJavaScript="true"/>';
		var fromLiveSearch                   = '<ps:property value="fromLiveSearch" escapeHtml="false" escapeJavaScript="true"/>';
		var fromTextArea                     = '<ps:property value="fromTextArea" escapeHtml="false" escapeJavaScript="true"/>';
		var invalid_lang_key				 = '<ps:property value="invalid_lang_key_var" escapeHtml="false" escapeJavaScript="true"/>';
		var enableAfterExecution			 = '<ps:property value="enableAfterExecution" escapeHtml="false" escapeJavaScript="true"/>';
		
		if('<ps:property value="custCO.screenDispVO.BUS_RELATED" escapeHtml="false" escapeJavaScript="true"/>' == 1 || ('<ps:property value="custCO.screenDispVO.IS_ADM_CUST_DIS_YN" escapeHtml="false" escapeJavaScript="true"/>' == 1 && ('<ps:property value="allowDisableUsrCustRight" escapeHtml="false" escapeJavaScript="true"/>' == null || '<ps:property value="allowDisableUsrCustRight" escapeHtml="false" escapeJavaScript="true"/>' == '')))
		{
		$("#fieldCust_saveBtn").remove();
		}
	</script>
	
	
	<table border="0" cellpadding="1" cellspacing="0" width="100%">
		<ps:if test="custCO.screenDispVO.BUS_RELATED == 1 && forTrans == null">
			<tr>
				<td class="note" colspan="10" style="text-align: center;"><ps:text name="customization_cannot_change_key"></ps:text></td>
			</tr>
		</ps:if>
		<ps:else>						
			<ps:if test="custCO.screenDispVO.IS_ADM_CUST_DIS_YN == 1 && allowDisableUsrCustRight == null">
				<tr>
					<td class="note" colspan="10" style="text-align: center;"><ps:text name="cust_is_dis_by_admin_key"></ps:text></td>
				</tr>
			</ps:if>
		</ps:else>
		<ps:if test="custCO.maintenanceFromMir !=null && custCO.maintenanceFromMir == 1 && forTrans == null">
			<tr>
				<td class="note" colspan="10" style="text-align: center;"><ps:text name="customization_not_approved_key"></ps:text></td>
			</tr>
		</ps:if>				
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
					<tr style="display:none;">
						<td nowrap="nowrap">

							<ps:label key="elem_tech_id_key"
								id="lbl_fldcust_elemTechId_${_pageRef}"
								for="fldcust_elemTechId_${_pageRef}"></ps:label>
						</td>
						<td>
							<ps:textfield size="45" id="fldcust_elemTechId_${_pageRef}" readonly="true"
								name="custCO.screenDispVO.ELEMENT_ID"></ps:textfield>
						</td>
						<td nowrap="nowrap">
							<ps:label key="elem_tech_name_key"
								id="lbl_fldcust_elemTechName_${_pageRef}"
								for="fldcust_elemTechId_${_pageRef}"></ps:label>
						</td>
						<td>
							<ps:textfield size="45" id="fldcust_elemTechName_${_pageRef}"
								readonly="true" name="custCO.screenDispVO.ELEMENT_NAME"></ps:textfield>
						</td>
					</tr>
					
			
					<ps:if test="forTrans == null">
						<tr>
							<td colspan="4" nowrap="nowrap">
								<table cellpadding="0" cellspacing="0">
								<tr>
									<td nowrap="nowrap">
									<ps:checkbox name="custCO.specificFlag"
											id="fldcust_specificMenu_${_pageRef}" />

									</td>
									<td>&nbsp;</td>
									<td nowrap="nowrap">
										<ps:label key="for_specif_menu_key"
											id="lbl_fldcust_specificMenu_${_pageRef}"
											for="fldcust_specificMenu_${_pageRef}"></ps:label>
									</td>
								</tr>
								</table>
							</td>
						</tr>
					</ps:if>
						 <tr style="display: none">
							<td nowrap="nowrap">
								<ps:label key="tech_vo_prop_name_key"
									id="lbl_fldcust_elemVoPropNam_${_pageRef}"
									for="fldcust_elemVoPropNam_${_pageRef}"></ps:label>
							</td>
							<td>
								<ps:textfield size="45" id="fldcust_elemVoPropNam_${_pageRef}" maxlength="30"
									name="custCO.screenDispVO.VO_PROPERTY_NAME"></ps:textfield>
							</td>
							<td nowrap="nowrap">
								<ps:label key="tech_vo_co_ref_key"
									id="lbl_fldcust_elemVoCoRef_${_pageRef}"
									for="fldcust_elemVoCoRef_${_pageRef}"></ps:label>
							</td>
							<td>
								<ps:textfield size="45" id="fldcust_elemVoCoRef_${_pageRef}" maxlength="30"
									 name="custCO.screenDispVO.VO_CO_REFERENCE"></ps:textfield>
							</td>
						</tr>

				</table>

			</td>
		</tr>
		<ps:if test="forTrans == null">
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
									name="custCO.screenDispVO.IS_VISIBLE"
									onchange="fldcust_CheckVisbleRequired(this,'VIS');"
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
							    <ps:textarea id="fldcust_visibleExpr_${_pageRef}" name="custCO.screenDispVO.VISIBILITY_EXPR"
							                 maxlength="1000" cols="85" rows="2"></ps:textarea>
							</td>
						</tr>
					<ps:if test="fromCollaps!=1">
						<tr>
							<td nowrap="nowrap">
								<ps:label key="read_only_key"
									id="lbl_fldcust_readOnlyFlag_${_pageRef}"
									for="fldcust_readOnlyFlag_${_pageRef}"></ps:label>
							</td>
							<td>
								<ps:select id="fldcust_readOnlyFlag_${_pageRef}"
									name="custCO.screenDispVO.IS_READONLY"
									onchange="fldcust_CheckVisbleRequired(this,'READONLY');"
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
							    <ps:textarea id="fldcust_readonlyExpr_${_pageRef}" name="custCO.screenDispVO.READONLY_EXPR"
							                 maxlength="1000" cols="85" rows="2"></ps:textarea> 
							</td>
						</tr>
                        <ps:if test='%{!"1".equals(fromButton) && !"1".equals(fromTab)}'>
							<tr>
								<td nowrap="nowrap">
									<ps:label key="required_key"
										id="lbl_fldcust_requiredFlag_${_pageRef}"
										for="fldcust_requiredFlag_${_pageRef}"></ps:label>
	
								</td>
								<td>
									<ps:select id="fldcust_requiredFlag_${_pageRef}"
										name="custCO.screenDispVO.IS_MANDATORY"
										onchange="fldcust_CheckVisbleRequired(this,'REQ');"
										list="requiredCmbList" listKey="code" listValue="descValue">
									</ps:select>
	
								</td>
								<td width="2px"/>
								<td nowrap="nowrap">
									<ps:label key="mandatory_expr_key"
										id="lbl_fldcust_mandatoryExpr_${_pageRef}"
										for="fldcust_mandatoryExpr_${_pageRef}"></ps:label>
								</td>
								<td>
								    <ps:textarea id="fldcust_mandatoryExpr_${_pageRef}" name="custCO.screenDispVO.MANDATORY_EXPR"
								                 maxlength="1000" cols="85" rows="2"></ps:textarea> 
								</td>
							</tr>
							<tr>
								<td nowrap="nowrap">
									<ps:label key="allow_zero_key"
										id="lbl_fldcust_allowZeroFlag_${_pageRef}"
										for="fldcust_allowZeroFlag_${_pageRef}"></ps:label>
								</td>
								<td>
									<ps:select id="fldcust_allowZeroFlag_${_pageRef}"
										name="custCO.screenDispVO.ZERO_NOT_ALLOWED"
										list="allowZeroCmbList" listKey="code" listValue="descValue"
										onchange="fldcust_CheckVisbleRequired(this,'ALLOWZERO');">
									</ps:select>
								</td>
								<td width="2px"/>
								<td nowrap="nowrap">
									<ps:label key="allow_zero_expr_key"
										id="lbl_fldcust_allowZeroExpr_${_pageRef}"
										for="fldcust_allowZeroExpr_${_pageRef}"></ps:label>
								</td>
								<td>
								    <ps:textarea id="fldcust_allowZeroExpr_${_pageRef}" name="custCO.screenDispVO.ZERO_NOT_ALLOWED_EXPR"
								                 maxlength="1000" cols="85" rows="2"></ps:textarea> 
								</td>
							</tr>
                        </ps:if>
					</ps:if>
					</table>
				</td>
			</tr>
			<ps:if test="fromCollaps!=1">
			<tr>
				<td>
					<table cellpadding="0" cellspacing="0">
						<tr>
							<td>
								<table cellpadding="0" cellspacing="0">
								<tr><td>
								<ps:checkbox id="fldcust_radiolabelKey_${_pageRef}" name="custCO.labelKeyCode" 
								             onclick="fldcust_labelKeyChecking(this,'LABELKEY')"/>
								</td>
								<td>&nbsp;</td>
								<td>            
								<ps:label key="label_key"
									id="lbl_fldcust_radiolabelKey_${_pageRef}"
									for="fldcust_radiolabelKey_${_pageRef}"></ps:label>
								</td>
								<td>&nbsp;&nbsp;</td>
								</tr>
								</table>	
							</td>
							<td>
								<table cellpadding="0" cellspacing="0">
								<tr><td>
								<ps:checkbox id="fldcust_radiolabelExprKey_${_pageRef}" 
								             name="custCO.labelExprKeyCode"
								             onclick="fldcust_labelKeyChecking(this,'LABEL_EXPR_KEY')"/>
								</td>
								<td>&nbsp;</td>
								<td>
								<ps:label key="label_Expr_key"
									id="lbl_fldcust_radiolabelExprKey_${_pageRef}"
									for="fldcust_radiolabelExprKey_${_pageRef}"></ps:label>
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
			      <table cellpadding="0" cellspacing="0">
						<tr>
						  	<td>
								<psj:livesearch id="fldcust_labelKey_${_pageRef}"
									 name="custCO.screenDispVO.LABEL_KEY"
									 paramList="fromCust:1" relatedDescElt="labelKeyDesc_${_pageRef}"
									 actionName="${pageContext.request.contextPath}/pathdesktop/TranslationLookup_labelKeyLookup"
									 resultList="sysParamKeyLabelVO.KEY_LABEL_CODE:lookuptxt_fldcust_labelKey_${_pageRef},sysParamKeyLabelVO.KEY_LABEL_DESC:labelKeyDesc_${_pageRef}"
									 searchElement="KEY_LABEL_CODE" autoSearch="false"
									 dependencySrc="${pageContext.request.contextPath}/pathdesktop/TranslationDependencyAction_labelKeyDep"
									 parameter="translationSC.fromCust:1,translationSC.labelKey:lookuptxt_fldcust_labelKey_${_pageRef}"
									 dependency="lookuptxt_fldcust_labelKey_${_pageRef}:translationCO.sysParamKeyLabelVO.KEY_LABEL_CODE,labelKeyDesc_${_pageRef}:translationCO.sysParamKeyLabelVO.KEY_LABEL_DESC"/>
                                <ps:textarea id="fldcust_labelKeyExpr_${_pageRef}" name="custCO.screenDispVO.LABEL_KEY_EXPR"
                                             maxlength="1000" cols="85" rows="2">                                 
                                </ps:textarea>
							</td>
							<td>
							   <ps:textfield id="labelKeyDesc_${_pageRef}" name="custCO.labelKeyDesc" readonly="true"/>
							</td>
						</tr>
			      </table>
			   </td>
			</tr>
			<ps:if test='%{!"1".equals(fromButton) && !"1".equals(fromTab)}'>
				<tr>
				   <td>
				       <table cellpadding="0" cellspacing="0">
							<tr>
								<td nowrap="nowrap">
									<ps:label key="message_code_key"
										id="lbl_fldcust_msgCode_${_pageRef}"
										for="fldcust_msgCode_${_pageRef}"></ps:label>
								</td>
								<td>&nbsp;</td>
								<td>
									<ps:textfield mode="number" size="20"
										id="fldcust_msgCode_${_pageRef}" maxlength="6"
										name="custCO.screenDispVO.MESSAGE_CODE"></ps:textfield>
								</td>
								<td width="3px"/>
								<td nowrap="nowrap">
									<ps:label key="max_length_lbl_key"
										id="lbl_fldcust_maxLength_${_pageRef}"
										for="fldcust_maxLength_${_pageRef}"></ps:label>
								</td>
								<td>&nbsp;</td>
								<td>
									<ps:textfield mode="number" size="20"
										id="fldcust_maxLength_${_pageRef}" maxlength="4" minValue="0"
										name="custCO.screenDispVO.MAX_LENGTH"></ps:textfield>
								</td>
								<ps:if test='%{ "1".equals(fromTextArea) || ("1".equals(fromText) && !"number".equals(mode)) || ("1".equals(fromLiveSearch) && !"number".equals(mode)) }'>
									<td width="3px"/>
									<td nowrap="nowrap">
										<ps:label key="min_length_lbl_key"
											id="lbl_fldcust_minLength_${_pageRef}"
											for="fldcust_minLength_${_pageRef}"></ps:label>
									</td>
									<td> 
										<ps:textfield mode="number" size="20"
											id="fldcust_minLength_${_pageRef}" maxlength="4" minValue="0"
											name="custCO.screenDispVO.MIN_LENGTH"></ps:textfield>
									</td>
								</ps:if>
							</tr>
				       </table>
				   </td>
				</tr>
			</ps:if>
			<tr>
			    <td>
			       <table cellpadding="0" cellspacing="0">
						<tr>
						    <ps:if test='%{!"1".equals(fromButton) && !"1".equals(fromTab)}'>
								<td>
								    <table>
								      <tr>
								         <td nowrap="nowrap">
											<ps:checkbox name="custCO.trimFlag"
												id="fldcust_trimFlag_${_pageRef}" />
								         </td>
								         <td>&nbsp;</td>
								         <td nowrap="nowrap">
											<ps:label key="trim_value_key"
												id="lbl_fldcust_trimFlag_${_pageRef}"
												for="fldcust_trimFlag_${_pageRef}"></ps:label>
								         </td>
								      </tr>
								    </table>
								</td>
								<td>
									<ps:checkbox name="custCO.arabicDepntFlag"
										onclick="fldcust_CheckVisbleRequired(this,'FLD_DEP')"
										id="fldcust_arabicDepntFlag_${_pageRef}" />
								</td>
								<td>&nbsp;</td>
								<td nowrap="nowrap">
									<ps:label key="arabic_dependent_key"
										id="lbl_fldcust_arabicDepntFlag_${_pageRef}"
										for="fldcust_arabicDepntFlag_${_pageRef}"></ps:label>
								</td>
	
								<td width="450">							
									<ps:radio
										list="#{'1':'arabic_field_key','2':'latin_field_key'}"
										id="languageDepFields_${_pageRef}"
										name="custCO.screenDispVO.ARABIC_DEPENDANT" />
								</td>
								<td></td>
							    <td width="200"></td>
							</ps:if>
							<ps:if test='%{custActionType!=null && custActionType=="R"}'>
								<ps:if test="custCO.screenDispVO.BUS_RELATED != 1 && (custCO.screenDispVO.IS_ADM_CUST_DIS_YN != 1 || allowDisableUsrCustRight != null)">
									<td>
										<psj:submit button="true"
											onclick="fldcust_resetCustomization()" type="button"
											buttonIcon="ui-icon-trash">
											<ps:label key="Reset_key" />
										</psj:submit>
									</td>
							
								<ps:if test="%{expImpCustRight != null}">
									<td>
									<psj:submit button="true" onclick="exportScreenCustomization('field')" type="button"
										buttonIcon="ui-icon-trash">
										<ps:label key="Export_Customization_key" />
									</psj:submit>
									</td>
									</ps:if>
								</ps:if>
                            </ps:if>
						</tr>
			       </table>
			    </td>
			</tr>
			<%/* value validation expression implementation */%>
			<tr>
			    <td>
			       <table cellpadding="0" cellspacing="0">
			       		<tr>
			       			<td nowrap="nowrap">
								<ps:label key="value_valid_expr_key"
									id="lbl_fldcust_valueValidExpr_${_pageRef}"
									for="fldcust_valueValidExpr_${_pageRef}"></ps:label>

							</td>
							<td>
							    <ps:textarea id="fldcust_valueValidExpr_${_pageRef}" name="custCO.screenDispVO.VALUE_VALID_EXPR"
							                 maxlength="1000" cols="85" rows="2"></ps:textarea> 
							</td>
			       		</tr>
				   </table>
				</td>
			</tr>
			
			<ps:if test='%{"1".equals(fromButton) || "1".equals(fromText) ||  "1".equals(fromTextArea) ||  "1".equals(fromLiveSearch) }'>
				<tr>
				    <td>
				       <table cellpadding="0" cellspacing="0">
				       		<tr>
				       			<td nowrap="nowrap">
									<ps:label key="keyboard_shortcut_key"
										id="lbl_keyboard_shortcut_key_${_pageRef}"
										for="keyboard_shortcut_key_${_pageRef}"></ps:label>
	
								</td>
								<td>&nbsp;</td>
								<td>
								    <ps:textfield id="keyboard_shortcut_key_${_pageRef}" 
								    	name="custCO.screenDispVO.KEYBOARD_SHORTCUT_KEY"
								    	maxlength="50" onkeydown="cust_recordBtnShortCut(event)" onkeyup="cust_displayShortCutMsg(event)"></ps:textfield> 
								</td>
								<td>&nbsp;</td>
								<td>
									<psj:submit id="clearShortcut_${_pageRef}"
											button="true" onclick="clearShortcut()">
											<ps:label key="Clear_Key" for="clearShortcut_${_pageRef}" />
									</psj:submit>
								</td>
							</tr>
					   </table>
				    </td>
				</tr>
				<%/* button global activity */%>
				<tr>
					<td>
						<div id="elem_activity_div_<ps:property value="_pageRef" escapeHtml="true"/>">
							<%@include file="CustomElementActivityGrid.jsp"%>
						</div>
					</td>
				</tr> 
			</ps:if>
			 <tr>
				<td><div id="fldcust_parmaMapGrid_<ps:property value="_pageRef" escapeHtml="true"/>"></div></td>
			</tr> 
			<ps:if test='"true".equals(allowDefValCust)'>
				<tr>
				    <td>
				       <table cellpadding="1" cellspacing="0">
				       		<tr>
				       			<td nowrap="nowrap">
									<ps:label key="default_value_cust_key"
										id="lbl_default_value_cust_key_${_pageRef}"
										for="default_value_cust_${_pageRef}"></ps:label>
	
								</td>
								<td>
								    <ps:textfield id="default_value_cust_${_pageRef}" 
								    	name="custCO.screenDispVO.DEFAULT_VALUE"
								    	maxlength="100" mode="text"></ps:textfield> 
								</td>
				       		</tr>
				       		<tr>
				       			<td nowrap="nowrap">
									<ps:label key="default_value_expr_cust_key"
										id="lbl_default_value_Expr_cust_key_${_pageRef}"
										for="default_value_cust_${_pageRef}"></ps:label>
	
								</td>
								<td>
								    <ps:textarea id="default_value_Expr_cust_${_pageRef}" 
								    	name="custCO.screenDispVO.DEFAULT_VALUE_EXPR"
								    	maxlength="1000" cols="85" rows="2"></ps:textarea> 
								</td>
				       		</tr>				       		
					   </table>
				    </td>
				</tr>
				<tr>		
					<td>
					  <table cellpadding="0" cellspacing="0">
					  <tr>
					  <td>
						<ps:checkbox id="deflt_value_Expr_priority_${_pageRef}" valOpt="1:0"
						name="custCO.screenDispVO.DFLT_VAL_EXPR_PRIORITY_YN"/>
						</td>
						<td>&nbsp;</td>
						<td>
						<ps:label key="deflt_value_expr_priority_key"
							id="lbl_deflt_value_Expr_priority_${_pageRef}"
							for="deflt_value_Expr_priority_${_pageRef}">
						</ps:label>
						</td>
						</tr>
						</table>
					</td>
				</tr>
			</ps:if>
			<ps:if test="allowDisableUsrCustRight != null">					
				<tr>		
					<td>
					 <table cellpadding="0" cellspacing="0">
					  <tr>
					  <td>
						<ps:checkbox id="fldcust_allow_disable_user_customizationKey_${_pageRef}" valOpt="1:0"
						name="custCO.screenDispVO.IS_ADM_CUST_DIS_YN"/>
						</td>
						<td>&nbsp;</td>
						<td>
						<ps:label key="allow_disable_user_customization_key"
							id="lbl_fldcust_allow_disable_user_customizationKey_${_pageRef}"
							for="fldcust_allow_disable_user_customizationKey_${_pageRef}">
						</ps:label>
						</td>
						</tr>
						</table>
					</td>
				</tr>
			</ps:if>
			<ps:if test='!"1".equals(fromTab)'>				
			<tr>		
				<td>
					<table cellpadding="0" cellspacing="0">
					<tr>
					<td>
					<ps:checkbox id="fldcust_enable_field_audit_customizationKey_${_pageRef}" valOpt="1:0"
					name="custCO.screenDispVO.ENABLE_FIELD_AUDIT_YN" onclick=""/>
					</td>
					<td>&nbsp;</td>
					<td>
					<ps:label key="enable_field_audit_key"
						id="lbl_fldcust_enable_field_audit_customizationKey_${_pageRef}"
						for="fldcust_enable_field_audit_customizationKey_${_pageRef}">
					</ps:label>
					</td>
					</tr>
					</table>
				</td>
			</tr>
			</ps:if>
			<tr>
				<%
				    /* background color picker setting on text, textarea, livesearch and datepicker elements */
				%>
				<ps:if
					test='%{ "1".equals(fromTextArea) || "1".equals(fromText)  || "1".equals(fromLiveSearch) || "1".equals(fromDatePicker) }'>
					<td><ps:hidden name="custCO.screenDispVO.BACKGROUND_COLOR"
							id="bgColorId_${_pageRef}" /> <ps:set name="background_color_key"
							value="%{getEscText('background_color_key')}" /> <psj:submit
							disabled="%{ !(custCO.screenDispVO.BUS_RELATED != 1 && (custCO.screenDispVO.IS_ADM_CUST_DIS_YN != 1 || allowDisableUsrCustRight != null))}"
							id="chooseColor_${_pageRef}" button="true"
							onclick="openColorPickerDiv()"
							style="background:%{custCO.screenDispVO.BACKGROUND_COLOR}">
							<ps:label key="background_color_key"
								for="chooseColor_${_pageRef}" />
						</psj:submit>
						<div id="colorPickerDiv_id_<ps:property value="_pageRef" escapeHtml="true"/>" style="display: none;">
							<fieldset>
								<legend>
									<ps:label id="tCD_chaneg_color_id" key="background_color_key"></ps:label>
								</legend>
								<table>
									<tr>
										<td>
											<div id="tCD_colorPicker_div" />
										</td>
									</tr>
								</table>
							</fieldset>
							<script type="text/javascript"> 
													var change_color_key_trans = '<ps:property value="background_color_key" escapeJavaScript="true"/>';
													$(document).ready(function() {
														fldcust_backgroundColorChecking($("#fldcust_radioBackgroundExprKey_"+_pageRef)[0]);
														//load color picker js component file and related css
														$.struts2_jquery.requireCss("js/colorpicker/colpick.css");
												    	$.struts2_jquery.require("js/colorpicker/colpick.js");
												    	//set the saved background color to be selected by default in color picker, if no background color use white color 'ffffff'
														var savedColor = $("#bgColorId_"+_pageRef).val();
														var defaultColor = ( savedColor == undefined || savedColor == null || savedColor == '' ) ? 'ffffff' : savedColor;
															
														$('#tCD_colorPicker_div').colpick({
															flat:true,
															layout:'hex',
															submit:0,
															color: defaultColor
														}); 
													});
											</script>
						</div></td>
						<tr>
							<td>
							<table cellpadding="0" cellspacing="0">
					  		<tr>
					  		<td>
								<ps:checkbox id="fldcust_radioBackgroundExprKey_${_pageRef}" 
								             name="custCO.backgroundExprKeyCode"
								             onclick="fldcust_backgroundColorChecking(this)"/>
								</td>
								<td>&nbsp;</td>
								<td>
								<ps:label key="background_Expr_key"
											 id="background_fldcust_radioBackgroundExprKey_${_pageRef}"
											 for="fldcust_radioBackgroundExprKey_${_pageRef}"></ps:label>
								</td>
								<td>&nbsp;</td>
								<td>			 
								<ps:textarea id="fldcust_backgroundKeyExpr_${_pageRef}" name="custCO.screenDispVO.BACKGROUND_COLOR_EXPR"
				                             maxlength="1000" cols="85" rows="2" >                                 
				                </ps:textarea>
				                </td>
								</tr>
								</table>
							</td>
						</tr>
				</ps:if>
			</tr>
			</ps:if>
			
				<script type="text/javascript">
				 var invalid_keyboard_shortcut_key = "<ps:text name='invalid_keyboard_shortcut_key'/>";
				
                 var expression_cust_tags= [ ${custCO.autocompleteTags} ];
				 apply_auto_complete('fldcust_visibleExpr_<ps:property value="_pageRef" escapeJavaScript="true"/>',expression_cust_tags);
				 apply_auto_complete('fldcust_readonlyExpr_<ps:property value="_pageRef" escapeJavaScript="true"/>',expression_cust_tags);
				 apply_auto_complete('fldcust_mandatoryExpr_<ps:property value="_pageRef" escapeJavaScript="true"/>',expression_cust_tags);
				 apply_auto_complete('fldcust_allowZeroExpr_<ps:property value="_pageRef" escapeJavaScript="true"/>',expression_cust_tags);
				 apply_auto_complete('fldcust_labelKeyExpr_<ps:property value="_pageRef" escapeJavaScript="true"/>',expression_cust_tags);
				 apply_auto_complete('fldcust_backgroundKeyExpr_<ps:property value="_pageRef" escapeJavaScript="true"/>',expression_cust_tags);
				 apply_auto_complete('default_value_Expr_cust_<ps:property value="_pageRef" escapeJavaScript="true"/>',expression_cust_tags);
				 apply_auto_complete('fldcust_PROCEED_ON_EXPRESSION_<ps:property value="_pageRef" escapeJavaScript="true"/>',expression_cust_tags);
				 
				 
				 var expression_cust_value_valid_tags= [ ${custCO.autocompleteValueValidTags} ];
				 apply_auto_complete('fldcust_valueValidExpr_<ps:property value="_pageRef" escapeJavaScript="true"/>',expression_cust_value_valid_tags);
				</script>
		</ps:if>
		<ps:if test="custCO.screenDispVO.FLD_IDENTIFIER != null || forTrans != null">
		<ps:if test="fromCollaps!=1">
		
		

		
		<tr>
		   <td>
					<ps:hidden id="fldcust_transGridUpd_${_pageRef}" name="custCO.custBusTransUpdate" />
					 <ps:url id="custFieldBusTransGrid" action="CustomizationMaint_loadBusTransList" namespace="/path/customization" escapeAmp="false">
			    	  <ps:param name="_pageRef" value="custCO.cutomizationPROG_REF"/>
			    	  <ps:param name="custCO.screenDispVO.FLD_IDENTIFIER" value="custCO.screenDispVO.FLD_IDENTIFIER"/>
			    	  <ps:param name="custCO.screenDispVO.ELEMENT_NAME" value="custCO.screenDispVO.ELEMENT_NAME"/>
			    	  <ps:param name="custCO.screenDispVO.VO_PROPERTY_NAME" value="custCO.screenDispVO.VO_PROPERTY_NAME"/>
			    	  <ps:param name="custCO.screenDispVO.VO_CO_REFERENCE" value="custCO.screenDispVO.VO_CO_REFERENCE"/>
			    	 </ps:url>
					<psjg:grid  id="custFieldBusTransGridTbl_Id_${_pageRef}"
						caption="%{getText('tooltip_icon_key_trns_key')}"
						href="%{custFieldBusTransGrid}"
						dataType="json"
						hiddengrid="false"
						pager="true"
						pagerButtons="false"
						altRows="false"
						filter="false"
						gridModel="gridModel"
						viewrecords="false"
						navigator="true"
						height="120"
						navigatorRefresh="false"
						navigatorEdit="false"
						navigatorSearch="false"
						navigatorAdd="true"
						navigatorDelete="true"
						sortable="true"
						onSelectRowTopics="custOnRowSelTopic"
						addfunc="custAddLanguageGrid"
						delfunc="custDeleteLanguageGrid"
						editinline="true"
						editurl="abc"
						rowNum="2">
					<psjg:gridColumn id="custgridLangCode" title=" " colType="text" name="langCode" index="langCode" editable="false" sortable="false" search="false" hidden="true"/>
					<psjg:gridColumn id="custgrid_language"
						name="langDesc"
						index="custgrid_language"
						title="%{getText('Language_key')}"
						editable="true"
						sortable="false" edittype="select" colType="select"
						editoptions="{value:function() {  return loadCombo('${pageContext.request.contextPath}/path/customization/CustomizationMaint_loadLanguageSelect','languageSelect', 'code', 'descValue');}
						,dataEvents: [{ type: 'change', fn: function() {custBusTransLangChanged() } }]}"
			
						search="true" />
					<psjg:gridColumn id="custgrid_globaltooltip" width="200" colType="text"
						name="globalToolTip" edittype="textarea" editoptions="{rows:'3',maxlength:'220'}"
						index="custgrid_globaltooltip" title="%{getText('glob_tooltip_key')}"
						editable="true" sortable="false" search="false" />
					<psjg:gridColumn id="custgrid_tooltip" width="200" colType="text"
						name="toolTip" edittype="textarea" editoptions="{rows:'3',maxlength:'220'}"
						index="custgrid_tooltip" title="%{getText('scr_spec_tooltip_key')}"
						editable="true" sortable="false" search="false" />
				</psjg:grid>
					<script type="text/javascript">
					    $.subscribe("custOnRowSelTopic",function(rowObj){customizationGridRowSelect(rowObj);})
					</script>	   
		   </td>
		</tr>
		</ps:if>
		</ps:if>

		
		
		
		
		
	</table>
</ps:form>
