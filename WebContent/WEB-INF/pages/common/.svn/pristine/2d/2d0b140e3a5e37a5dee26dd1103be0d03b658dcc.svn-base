<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
	<ps:if test="additionalFieldCO.loadPage == true">
	<table width="100%" >
		<ps:if test="additionalFieldCO.isAddString == true">
			<tr ><td><div class="ui-state-focus ui-corner-top">&nbsp;&nbsp;<ps:label key="Additional_String_key"></ps:label></div></td></tr>
		
	<tr><td>
		<%/* Additional String */%>
		<table width="100%" border="0" style="padding:0 10px;" class="ui-widget-content">
		<tr>
			<td width="15%"></td>
			<td width="10%"></td>
			<td width="20%"></td>
			<td width="15%"></td>
			<td width="10%"></td>
			<td width="20%"></td>
			<td width="10%"></td>
		</tr>
		
		<tr>
			<ps:if test="additionalFieldCO.USEDEAL_STRING1 != null && additionalFieldCO.USEDEAL_STRING1 ==1">
				<td class="fldLabelView">
					<ps:label id="lbl_AddString1_${_pageRef}" for="lookuptxt_addString1_${_pageRef}"/>
				</td>
				<td>
					<psj:livesearch actionName="${pageContext.request.contextPath}/pathdesktop/PmsDealLookup_constructLookup"
						mode="number" maxlength="10" 
						resultList="pmsDealVO.DEAL_NO:lookuptxt_addString1_${_pageRef}"
						searchElement="DEAL_NO" id="addString1_${_pageRef}" name="additionalFieldCO.ADD_STRING1" 
						dependency="lookuptxt_addString1_${_pageRef}:pmsDealCO.pmsDealVO.DEAL_NO,addString1Desc_${_pageRef}:pmsDealCO.pmsDealVO.BRIEF_NAME_ENG"
						dependencySrc="${pageContext.request.contextPath}/pathdesktop/PmsDealDependency_dependencyByDealNo"
						parameter="dealNo:lookuptxt_addString1_${_pageRef}" >
					</psj:livesearch>
				</td>
				<td>
					<ps:textfield id="addString1Desc_${_pageRef}" disabled="true" name="additionalFieldCO.USEDEAL_STRING1_DESC" size="5px" cssClass="ui-state-focus textCompSize ui-corner-all"  />
				</td>
			</ps:if>
			<ps:elseif test="additionalFieldCO.SMART_OPTION_TEXT1 != null && additionalFieldCO.SMART_OPTION_TEXT1 > 0 ">
				<td class="fldLabelView">
					<ps:label id="lbl_AddString1_${_pageRef}" for="lookuptxt_addString1_${_pageRef}"/>
				</td>
				<td>
						<ps:hidden name="additionalFieldCO.SMART_OPTION_TEXT1" id="smartTextOption1_${_pageRef}"> </ps:hidden>
						<psj:livesearch actionName="${pageContext.request.contextPath}/pathdesktop/SmartAddOptions_constructLookup"
						paramList="optionCode:smartTextOption1_${_pageRef}" mode="number" maxlength="3"
						searchElement="OPTION_SERIAL" id="addString1_${_pageRef}" name="additionalFieldCO.ADD_STRING1"
						dependency="lookuptxt_addString1_${_pageRef}:sadditionsOptionsVO.OPTION_SERIAL,addString1Desc_${_pageRef}:sadditionsOptionsVO.BRIEF_NAME_ENG"
						dependencySrc="${pageContext.request.contextPath}/pathdesktop/SmartAddOptionsDependencyAction_dependencyByOptionCode"
						parameter="smartAddOptionsSC.optionSerial:lookuptxt_addString1_${_pageRef},smartAddOptionsSC.optionCode:smartTextOption1_${_pageRef}">
						</psj:livesearch>
				</td>
				<td>
					<ps:textfield id="addString1Desc_${_pageRef}" disabled="true" name="additionalFieldCO.SMART_TEXT_DESC1" size="5px" cssClass="ui-state-focus textCompSize ui-corner-all"  />
				</td>
			</ps:elseif>
			<ps:else>
				<td class="fldLabelView">
					<ps:label  id="lbl_AddString1_${_pageRef}" for="addString1_${_pageRef}"/>
				</td>
				<td colspan="2">
					<ps:textfield id="addString1_${_pageRef}" name="additionalFieldCO.ADD_STRING1" size="5px" cssClass="ui-state-focus textCompSize ui-corner-all" />
				</td>
			</ps:else>
			
			<ps:if test="additionalFieldCO.SMART_OPTION_TEXT2 != null && additionalFieldCO.SMART_OPTION_TEXT2 > 0 ">
				<td class="fldLabelView">
					<ps:label id="lbl_AddString2_${_pageRef}" for="lookuptxt_addString2_${_pageRef}"/>
				</td>
				<td>
						<ps:hidden name="additionalFieldCO.SMART_OPTION_TEXT2" id="smartTextOption2_${_pageRef}"> </ps:hidden>
						<psj:livesearch actionName="${pageContext.request.contextPath}/pathdesktop/SmartAddOptions_constructLookup"
						paramList="optionCode:smartTextOption2_${_pageRef}" mode="number" maxlength="3"
						searchElement="OPTION_SERIAL" id="addString2_${_pageRef}" name="additionalFieldCO.ADD_STRING2"
						dependency="lookuptxt_addString2_${_pageRef}:sadditionsOptionsVO.OPTION_SERIAL,addString2Desc_${_pageRef}:sadditionsOptionsVO.BRIEF_NAME_ENG"
						dependencySrc="${pageContext.request.contextPath}/pathdesktop/SmartAddOptionsDependencyAction_dependencyByOptionCode"
						parameter="smartAddOptionsSC.optionSerial:lookuptxt_addString2_${_pageRef},smartAddOptionsSC.optionCode:smartTextOption2_${_pageRef}">
						</psj:livesearch>
				</td>
				<td>
					<ps:textfield id="addString2Desc_${_pageRef}" disabled="true" name="additionalFieldCO.SMART_TEXT_DESC2" size="5px" cssClass="ui-state-focus textCompSize ui-corner-all"  />
				</td>
			</ps:if>
			<ps:else>
			<td class="fldLabelView">
				<ps:label  id="lbl_AddString2_${_pageRef}" for="addString2_${_pageRef}"/>
			</td>
			<td colspan="2">
				<ps:textfield id="addString2_${_pageRef}" name="additionalFieldCO.ADD_STRING2" size="5px" cssClass="ui-state-focus textCompSize ui-corner-all"  />
			</td>
			</ps:else>
			<td></td>
		</tr>
			
		<tr>
			<ps:if test="additionalFieldCO.SMART_OPTION_TEXT3 != null && additionalFieldCO.SMART_OPTION_TEXT3 > 0 ">
				<td class="fldLabelView">
					<ps:label id="lbl_AddString3_${_pageRef}" for="lookuptxt_addString3_${_pageRef}"/>
				</td>
				<td>
						<ps:hidden name="additionalFieldCO.SMART_OPTION_TEXT3" id="smartTextOption3_${_pageRef}"> </ps:hidden>
						<psj:livesearch actionName="${pageContext.request.contextPath}/pathdesktop/SmartAddOptions_constructLookup"
						paramList="optionCode:smartTextOption3_${_pageRef}" mode="number" maxlength="3"
						searchElement="OPTION_SERIAL" id="addString3_${_pageRef}" name="additionalFieldCO.ADD_STRING3"
						dependency="lookuptxt_addString3_${_pageRef}:sadditionsOptionsVO.OPTION_SERIAL,addString3Desc_${_pageRef}:sadditionsOptionsVO.BRIEF_NAME_ENG"
						dependencySrc="${pageContext.request.contextPath}/pathdesktop/SmartAddOptionsDependencyAction_dependencyByOptionCode"
						parameter="smartAddOptionsSC.optionSerial:lookuptxt_addString3_${_pageRef},smartAddOptionsSC.optionCode:smartTextOption3_${_pageRef}">
						</psj:livesearch>
				</td>
				<td>
					<ps:textfield id="addString3Desc_${_pageRef}" disabled="true" name="additionalFieldCO.SMART_TEXT_DESC3" size="5px" cssClass="ui-state-focus textCompSize ui-corner-all"  />
				</td>
			</ps:if>
			<ps:else>
			<td class="fldLabelView">
				<ps:label  id="lbl_AddString3_${_pageRef}" for="addString3_${_pageRef}"/>
			</td>
			<td colspan="2">
				<ps:textfield id="addString3_${_pageRef}" name="additionalFieldCO.ADD_STRING3" size="5px" cssClass="ui-state-focus textCompSize ui-corner-all"  />
			</td>
			</ps:else>
			<ps:if test="additionalFieldCO.SMART_OPTION_TEXT4 != null && additionalFieldCO.SMART_OPTION_TEXT4 > 0 ">
				<td class="fldLabelView">
					<ps:label id="lbl_AddString4_${_pageRef}" for="lookuptxt_addString4_${_pageRef}"/>
				</td>
				<td>
						<ps:hidden name="additionalFieldCO.SMART_OPTION_TEXT4" id="smartTextOption4_${_pageRef}"> </ps:hidden>
						<psj:livesearch actionName="${pageContext.request.contextPath}/pathdesktop/SmartAddOptions_constructLookup"
						paramList="optionCode:smartTextOption4_${_pageRef}" mode="number" maxlength="3"
						searchElement="OPTION_SERIAL" id="addString4_${_pageRef}" name="additionalFieldCO.ADD_STRING4"
						dependency="lookuptxt_addString4_${_pageRef}:sadditionsOptionsVO.OPTION_SERIAL,addString4Desc_${_pageRef}:sadditionsOptionsVO.BRIEF_NAME_ENG"
						dependencySrc="${pageContext.request.contextPath}/pathdesktop/SmartAddOptionsDependencyAction_dependencyByOptionCode"
						parameter="smartAddOptionsSC.optionSerial:lookuptxt_addString4_${_pageRef},smartAddOptionsSC.optionCode:smartTextOption4_${_pageRef}">
						</psj:livesearch>
				</td>
				<td>
					<ps:textfield id="addString4Desc_${_pageRef}" disabled="true" name="additionalFieldCO.SMART_TEXT_DESC4" size="5px" cssClass="ui-state-focus textCompSize ui-corner-all"  />
				</td>
			</ps:if>
			<ps:else>
			<td class="fldLabelView">
				<ps:label  id="lbl_AddString4_${_pageRef}" for="addString4_${_pageRef}"/>
			</td>
			<td colspan="2">
				<ps:textfield id="addString4_${_pageRef}" name="additionalFieldCO.ADD_STRING4" size="5px" cssClass="ui-state-focus textCompSize ui-corner-all"  />
			</td>
			</ps:else>
			<td></td>
		</tr>
		
		<tr>
			<ps:if test="additionalFieldCO.SMART_OPTION_TEXT5 != null && additionalFieldCO.SMART_OPTION_TEXT5 > 0 ">
				<td class="fldLabelView">
					<ps:label id="lbl_AddString5_${_pageRef}" for="lookuptxt_addString5_${_pageRef}"/>
				</td>
				<td>
						<ps:hidden name="additionalFieldCO.SMART_OPTION_TEXT5" id="smartTextOption5_${_pageRef}"> </ps:hidden>
						<psj:livesearch actionName="${pageContext.request.contextPath}/pathdesktop/SmartAddOptions_constructLookup"
						paramList="optionCode:smartTextOption5_${_pageRef}" mode="number" maxlength="3"
						searchElement="OPTION_SERIAL" id="addString5_${_pageRef}" name="additionalFieldCO.ADD_STRING5"
						dependency="lookuptxt_addString5_${_pageRef}:sadditionsOptionsVO.OPTION_SERIAL,addString5Desc_${_pageRef}:sadditionsOptionsVO.BRIEF_NAME_ENG"
						dependencySrc="${pageContext.request.contextPath}/pathdesktop/SmartAddOptionsDependencyAction_dependencyByOptionCode"
						parameter="smartAddOptionsSC.optionSerial:lookuptxt_addString5_${_pageRef},smartAddOptionsSC.optionCode:smartTextOption5_${_pageRef}">
						</psj:livesearch>
				</td>
				<td>
					<ps:textfield id="addString5Desc_${_pageRef}" disabled="true" name="additionalFieldCO.SMART_TEXT_DESC5" size="5px" cssClass="ui-state-focus textCompSize ui-corner-all"  />
				</td>
			</ps:if>
			<ps:else>
			<td class="fldLabelView">
				<ps:label  id="lbl_AddString5_${_pageRef}" for="addString5_${_pageRef}"/>
			</td>
			<td colspan="2">
				<ps:textfield id="addString5_${_pageRef}" name="additionalFieldCO.ADD_STRING5" size="5px" cssClass="ui-state-focus textCompSize ui-corner-all"  />
			</td>
			</ps:else>
			
			<ps:if test="additionalFieldCO.SMART_OPTION_TEXT6 != null && additionalFieldCO.SMART_OPTION_TEXT6 > 0 ">
				<td class="fldLabelView">
					<ps:label id="lbl_AddString6_${_pageRef}" for="lookuptxt_addString6_${_pageRef}"/>
				</td>
				<td>
						<ps:hidden name="additionalFieldCO.SMART_OPTION_TEXT6" id="smartTextOption6_${_pageRef}"> </ps:hidden>
						<psj:livesearch actionName="${pageContext.request.contextPath}/pathdesktop/SmartAddOptions_constructLookup"
						paramList="optionCode:smartTextOption6_${_pageRef}" mode="number" maxlength="3"
						searchElement="OPTION_SERIAL" id="addString6_${_pageRef}" name="additionalFieldCO.ADD_STRING6"
						dependency="lookuptxt_addString6_${_pageRef}:sadditionsOptionsVO.OPTION_SERIAL,addString6Desc_${_pageRef}:sadditionsOptionsVO.BRIEF_NAME_ENG"
						dependencySrc="${pageContext.request.contextPath}/pathdesktop/SmartAddOptionsDependencyAction_dependencyByOptionCode"
						parameter="smartAddOptionsSC.optionSerial:lookuptxt_addString6_${_pageRef},smartAddOptionsSC.optionCode:smartTextOption6_${_pageRef}">
						</psj:livesearch>
				</td>
				<td>
					<ps:textfield id="addString6Desc_${_pageRef}" disabled="true" name="additionalFieldCO.SMART_TEXT_DESC6" size="5px" cssClass="ui-state-focus textCompSize ui-corner-all"  />
				</td>
			</ps:if>
			<ps:else>
			<td class="fldLabelView">
				<ps:label  id="lbl_AddString6_${_pageRef}" for="addString6_${_pageRef}"/>
			</td>
			<td colspan="2">
				<ps:textfield id="addString6_${_pageRef}" name="additionalFieldCO.ADD_STRING6" size="5px" cssClass="ui-state-focus textCompSize ui-corner-all"  />
			</td>
			</ps:else>
			<td></td>
		</tr>
		
		<tr>
			<ps:if test="additionalFieldCO.SMART_OPTION_TEXT7 != null && additionalFieldCO.SMART_OPTION_TEXT7 > 0 ">
				<td class="fldLabelView">
					<ps:label id="lbl_AddString7_${_pageRef}" for="lookuptxt_addString7_${_pageRef}"/>
				</td>
				<td>
						<ps:hidden name="additionalFieldCO.SMART_OPTION_TEXT7" id="smartTextOption7_${_pageRef}"> </ps:hidden>
						<psj:livesearch actionName="${pageContext.request.contextPath}/pathdesktop/SmartAddOptions_constructLookup"
						paramList="optionCode:smartTextOption7_${_pageRef}" mode="number" maxlength="3"
						searchElement="OPTION_SERIAL" id="addString7_${_pageRef}" name="additionalFieldCO.ADD_STRING7"
						dependency="lookuptxt_addString7_${_pageRef}:sadditionsOptionsVO.OPTION_SERIAL,addString7Desc_${_pageRef}:sadditionsOptionsVO.BRIEF_NAME_ENG"
						dependencySrc="${pageContext.request.contextPath}/pathdesktop/SmartAddOptionsDependencyAction_dependencyByOptionCode"
						parameter="smartAddOptionsSC.optionSerial:lookuptxt_addString7_${_pageRef},smartAddOptionsSC.optionCode:smartTextOption7_${_pageRef}">
						</psj:livesearch>
				</td>
				<td>
					<ps:textfield id="addString7Desc_${_pageRef}" disabled="true" name="additionalFieldCO.SMART_TEXT_DESC7" size="5px" cssClass="ui-state-focus textCompSize ui-corner-all"  />
				</td>
			</ps:if>
			<ps:else>
			<td class="fldLabelView">
				<ps:label  id="lbl_AddString7_${_pageRef}" for="addString7_${_pageRef}"/>
			</td>
			<td colspan="2" >
				<ps:textfield id="addString7_${_pageRef}" name="additionalFieldCO.ADD_STRING7" size="5px" cssClass="ui-state-focus textCompSize ui-corner-all"  />
			</td>
			</ps:else>
			
			<ps:if test="additionalFieldCO.SMART_OPTION_TEXT8 != null && additionalFieldCO.SMART_OPTION_TEXT8 > 0 ">
				<td class="fldLabelView">
					<ps:label id="lbl_AddString8_${_pageRef}" for="lookuptxt_addString8_${_pageRef}"/>
				</td>
				<td>
						<ps:hidden name="additionalFieldCO.SMART_OPTION_TEXT8" id="smartTextOption8_${_pageRef}"> </ps:hidden>
						<psj:livesearch actionName="${pageContext.request.contextPath}/pathdesktop/SmartAddOptions_constructLookup"
						paramList="optionCode:smartTextOption8_${_pageRef}" mode="number" maxlength="3"
						searchElement="OPTION_SERIAL" id="addString8_${_pageRef}" name="additionalFieldCO.ADD_STRING8"
						dependency="lookuptxt_addString8_${_pageRef}:sadditionsOptionsVO.OPTION_SERIAL,addString8Desc_${_pageRef}:sadditionsOptionsVO.BRIEF_NAME_ENG"
						dependencySrc="${pageContext.request.contextPath}/pathdesktop/SmartAddOptionsDependencyAction_dependencyByOptionCode"
						parameter="smartAddOptionsSC.optionSerial:lookuptxt_addString8_${_pageRef},smartAddOptionsSC.optionCode:smartTextOption8_${_pageRef}">
						</psj:livesearch>
				</td>
				<td>
					<ps:textfield id="addString8Desc_${_pageRef}" disabled="true" name="additionalFieldCO.SMART_TEXT_DESC8" size="5px" cssClass="ui-state-focus textCompSize ui-corner-all"  />
				</td>
			</ps:if>
			<ps:else>
			<td class="fldLabelView">
				<ps:label  id="lbl_AddString8_${_pageRef}" for="addString8_${_pageRef}"/>
			</td>
			<td colspan="2">
				<ps:textfield id="addString8_${_pageRef}" name="additionalFieldCO.ADD_STRING8" size="5px" cssClass="ui-state-focus textCompSize ui-corner-all"  />
			</td>
			</ps:else>
			<td></td>
		</tr>
		
		<tr>
			<ps:if test="additionalFieldCO.SMART_OPTION_TEXT9 != null && additionalFieldCO.SMART_OPTION_TEXT9 > 0 ">
				<td class="fldLabelView">
					<ps:label id="lbl_AddString9_${_pageRef}" for="lookuptxt_addString9_${_pageRef}"/>
				</td>
				<td>
						<ps:hidden name="additionalFieldCO.SMART_OPTION_TEXT9" id="smartTextOption9_${_pageRef}"> </ps:hidden>
						<psj:livesearch actionName="${pageContext.request.contextPath}/pathdesktop/SmartAddOptions_constructLookup"
						paramList="optionCode:smartTextOption9_${_pageRef}" mode="number" maxlength="3"
						searchElement="OPTION_SERIAL" id="addString9_${_pageRef}" name="additionalFieldCO.ADD_STRING9"
						dependency="lookuptxt_addString9_${_pageRef}:sadditionsOptionsVO.OPTION_SERIAL,addString9Desc_${_pageRef}:sadditionsOptionsVO.BRIEF_NAME_ENG"
						dependencySrc="${pageContext.request.contextPath}/pathdesktop/SmartAddOptionsDependencyAction_dependencyByOptionCode"
						parameter="smartAddOptionsSC.optionSerial:lookuptxt_addString9_${_pageRef},smartAddOptionsSC.optionCode:smartTextOption9_${_pageRef}">
						</psj:livesearch>
				</td>
				<td>
					<ps:textfield id="addString9Desc_${_pageRef}" disabled="true" name="additionalFieldCO.SMART_TEXT_DESC9" size="5px" cssClass="ui-state-focus textCompSize ui-corner-all"  />
				</td>
			</ps:if>
			<ps:else>
			<td class="fldLabelView">
				<ps:label id="lbl_AddString9_${_pageRef}" for="addString9_${_pageRef}"/>
			</td>
			<td colspan="2">
				<ps:textfield id="addString9_${_pageRef}" name="additionalFieldCO.ADD_STRING9" size="5px" cssClass="ui-state-focus textCompSize ui-corner-all"  />
			</td>
			</ps:else>
			
			<ps:if test="additionalFieldCO.SMART_OPTION_TEXT10 != null && additionalFieldCO.SMART_OPTION_TEXT10 > 0 ">
				<td class="fldLabelView">
					<ps:label id="lbl_AddString10_${_pageRef}" for="lookuptxt_addString10_${_pageRef}"/>
				</td>
				<td>
						<ps:hidden name="additionalFieldCO.SMART_OPTION_TEXT10" id="smartTextOption10_${_pageRef}"> </ps:hidden>
						<psj:livesearch actionName="${pageContext.request.contextPath}/pathdesktop/SmartAddOptions_constructLookup"
						paramList="optionCode:smartTextOption10_${_pageRef}" mode="number" maxlength="3"
						searchElement="OPTION_SERIAL" id="addString10_${_pageRef}" name="additionalFieldCO.ADD_STRING10"
						dependency="lookuptxt_addString10_${_pageRef}:sadditionsOptionsVO.OPTION_SERIAL,addString10Desc_${_pageRef}:sadditionsOptionsVO.BRIEF_NAME_ENG"
						dependencySrc="${pageContext.request.contextPath}/pathdesktop/SmartAddOptionsDependencyAction_dependencyByOptionCode"
						parameter="smartAddOptionsSC.optionSerial:lookuptxt_addString10_${_pageRef},smartAddOptionsSC.optionCode:smartTextOption10_${_pageRef}">
						</psj:livesearch>
				</td>
				<td>
					<ps:textfield id="addString10Desc_${_pageRef}" disabled="true" name="additionalFieldCO.SMART_TEXT_DESC10" size="5px" cssClass="ui-state-focus textCompSize ui-corner-all"  />
				</td>
			</ps:if>
			<ps:else>
			<td class="fldLabelView">
				<ps:label id="lbl_AddString10_${_pageRef}" for="addString10_${_pageRef}"/>
			</td>
			<td colspan="2" >
				<ps:textfield id="addString10_${_pageRef}" name="additionalFieldCO.ADD_STRING10" size="5px" cssClass="ui-state-focus textCompSize ui-corner-all"  />
			</td>
			</ps:else>
			<td></td>
		</tr>
		
		<tr>
			<ps:if test="additionalFieldCO.SMART_OPTION_TEXT11 != null && additionalFieldCO.SMART_OPTION_TEXT11 > 0 ">
				<td class="fldLabelView">
					<ps:label id="lbl_AddString11_${_pageRef}" for="lookuptxt_addString11_${_pageRef}"/>
				</td>
				<td>
						<ps:hidden name="additionalFieldCO.SMART_OPTION_TEXT11" id="smartTextOption11_${_pageRef}"> </ps:hidden>
						<psj:livesearch actionName="${pageContext.request.contextPath}/pathdesktop/SmartAddOptions_constructLookup"
						paramList="optionCode:smartTextOption11_${_pageRef}" mode="number" maxlength="3"
						searchElement="OPTION_SERIAL" id="addString11_${_pageRef}" name="additionalFieldCO.ADD_STRING11"
						dependency="lookuptxt_addString11_${_pageRef}:sadditionsOptionsVO.OPTION_SERIAL,addString11Desc_${_pageRef}:sadditionsOptionsVO.BRIEF_NAME_ENG"
						dependencySrc="${pageContext.request.contextPath}/pathdesktop/SmartAddOptionsDependencyAction_dependencyByOptionCode"
						parameter="smartAddOptionsSC.optionSerial:lookuptxt_addString11_${_pageRef},smartAddOptionsSC.optionCode:smartTextOption11_${_pageRef}">
						</psj:livesearch>
				</td>
				<td>
					<ps:textfield id="addString11Desc_${_pageRef}" disabled="true" name="additionalFieldCO.SMART_TEXT_DESC11" size="5px" cssClass="ui-state-focus textCompSize ui-corner-all"  />
				</td>
			</ps:if>
			<ps:else>
			<td class="fldLabelView">
				<ps:label id="lbl_AddString11_${_pageRef}" for="addString11_${_pageRef}"/>
			</td>
			<td colspan="2">
				<ps:textfield id="addString11_${_pageRef}" name="additionalFieldCO.ADD_STRING11" size="5px" cssClass="ui-state-focus textCompSize ui-corner-all"  />
			</td>
			</ps:else>
			
			<ps:if test="additionalFieldCO.SMART_OPTION_TEXT12 != null && additionalFieldCO.SMART_OPTION_TEXT12 > 0 ">
				<td class="fldLabelView">
					<ps:label id="lbl_AddString12_${_pageRef}" for="lookuptxt_addString12_${_pageRef}"/>
				</td>
				<td>
						<ps:hidden name="additionalFieldCO.SMART_OPTION_TEXT12" id="smartTextOption12_${_pageRef}"> </ps:hidden>
						<psj:livesearch actionName="${pageContext.request.contextPath}/pathdesktop/SmartAddOptions_constructLookup"
						paramList="optionCode:smartTextOption12_${_pageRef}" mode="number" maxlength="3"
						searchElement="OPTION_SERIAL" id="addString12_${_pageRef}" name="additionalFieldCO.ADD_STRING12"
						dependency="lookuptxt_addString12_${_pageRef}:sadditionsOptionsVO.OPTION_SERIAL,addString12Desc_${_pageRef}:sadditionsOptionsVO.BRIEF_NAME_ENG"
						dependencySrc="${pageContext.request.contextPath}/pathdesktop/SmartAddOptionsDependencyAction_dependencyByOptionCode"
						parameter="smartAddOptionsSC.optionSerial:lookuptxt_addString12_${_pageRef},smartAddOptionsSC.optionCode:smartTextOption12_${_pageRef}">
						</psj:livesearch>
				</td>
				<td>
					<ps:textfield id="addString12Desc_${_pageRef}" disabled="true" name="additionalFieldCO.SMART_TEXT_DESC12" size="5px" cssClass="ui-state-focus textCompSize ui-corner-all"  />
				</td>
			</ps:if>
			<ps:else>
			<td class="fldLabelView">
				<ps:label id="lbl_AddString12_${_pageRef}" for="addString12_${_pageRef}"/>
			</td>
			<td colspan="2">
				<ps:textfield id="addString12_${_pageRef}" name="additionalFieldCO.ADD_STRING12" size="5px" cssClass="ui-state-focus textCompSize ui-corner-all"  />
			</td>
			</ps:else>
			<td></td>
		</tr>
		
		<tr>
			<ps:if test="additionalFieldCO.SMART_OPTION_TEXT13 != null && additionalFieldCO.SMART_OPTION_TEXT13 > 0 ">
				<td class="fldLabelView">
					<ps:label id="lbl_AddString13_${_pageRef}" for="lookuptxt_addString13_${_pageRef}"/>
				</td>
				<td>
						<ps:hidden name="additionalFieldCO.SMART_OPTION_TEXT13" id="smartTextOption13_${_pageRef}"> </ps:hidden>
						<psj:livesearch actionName="${pageContext.request.contextPath}/pathdesktop/SmartAddOptions_constructLookup"
						paramList="optionCode:smartTextOption13_${_pageRef}" mode="number" maxlength="3"
						searchElement="OPTION_SERIAL" id="addString13_${_pageRef}" name="additionalFieldCO.ADD_STRING13"
						dependency="lookuptxt_addString13_${_pageRef}:sadditionsOptionsVO.OPTION_SERIAL,addString13Desc_${_pageRef}:sadditionsOptionsVO.BRIEF_NAME_ENG"
						dependencySrc="${pageContext.request.contextPath}/pathdesktop/SmartAddOptionsDependencyAction_dependencyByOptionCode"
						parameter="smartAddOptionsSC.optionSerial:lookuptxt_addString13_${_pageRef},smartAddOptionsSC.optionCode:smartTextOption13_${_pageRef}">
						</psj:livesearch>
				</td>
				<td>
					<ps:textfield id="addString13Desc_${_pageRef}" disabled="true" name="additionalFieldCO.SMART_TEXT_DESC13" size="5px" cssClass="ui-state-focus textCompSize ui-corner-all"  />
				</td>
			</ps:if>
			<ps:else>
			<td class="fldLabelView" >
				<ps:label id="lbl_AddString13_${_pageRef}" for="addString13_${_pageRef}"/>
			</td>
			<td colspan="2" >
				<ps:textfield id="addString13_${_pageRef}" name="additionalFieldCO.ADD_STRING13" size="5px" cssClass="ui-state-focus textCompSize ui-corner-all"  />
			</td>
			</ps:else>
			
			<ps:if test="additionalFieldCO.SMART_OPTION_TEXT14 != null && additionalFieldCO.SMART_OPTION_TEXT14 > 0 ">
				<td class="fldLabelView">
					<ps:label id="lbl_AddString14_${_pageRef}" for="lookuptxt_addString14_${_pageRef}"/>
				</td>
				<td>
						<ps:hidden name="additionalFieldCO.SMART_OPTION_TEXT14" id="smartTextOption14_${_pageRef}"> </ps:hidden>
						<psj:livesearch actionName="${pageContext.request.contextPath}/pathdesktop/SmartAddOptions_constructLookup"
						paramList="optionCode:smartTextOption14_${_pageRef}" mode="number" maxlength="3"
						searchElement="OPTION_SERIAL" id="addString14_${_pageRef}" name="additionalFieldCO.ADD_STRING14"
						dependency="lookuptxt_addString14_${_pageRef}:sadditionsOptionsVO.OPTION_SERIAL,addString14Desc_${_pageRef}:sadditionsOptionsVO.BRIEF_NAME_ENG"
						dependencySrc="${pageContext.request.contextPath}/pathdesktop/SmartAddOptionsDependencyAction_dependencyByOptionCode"
						parameter="smartAddOptionsSC.optionSerial:lookuptxt_addString14_${_pageRef},smartAddOptionsSC.optionCode:smartTextOption14_${_pageRef}">
						</psj:livesearch>
				</td>
				<td>
					<ps:textfield id="addString14Desc_${_pageRef}" disabled="true" name="additionalFieldCO.SMART_TEXT_DESC14" size="5px" cssClass="ui-state-focus textCompSize ui-corner-all"  />
				</td>
			</ps:if>
			<ps:else>
			<td class="fldLabelView">
				<ps:label  id="lbl_AddString14_${_pageRef}" for="addString14_${_pageRef}"/>
			</td>
			<td colspan="2">
				<ps:textfield id="addString14_${_pageRef}" name="additionalFieldCO.ADD_STRING14" size="5px" cssClass="ui-state-focus textCompSize ui-corner-all"  />
			</td>
			</ps:else>
			<td></td>
		</tr>
		<tr>
			<ps:if test="additionalFieldCO.SMART_OPTION_TEXT15 != null && additionalFieldCO.SMART_OPTION_TEXT15 > 0 ">
				<td class="fldLabelView">
					<ps:label id="lbl_AddString15_${_pageRef}" for="lookuptxt_addString15_${_pageRef}"/>
				</td>
				<td>
						<ps:hidden name="additionalFieldCO.SMART_OPTION_TEXT15" id="smartTextOption15_${_pageRef}"> </ps:hidden>
						<psj:livesearch actionName="${pageContext.request.contextPath}/pathdesktop/SmartAddOptions_constructLookup"
						paramList="optionCode:smartTextOption15_${_pageRef}" mode="number" maxlength="3"
						searchElement="OPTION_SERIAL" id="addString15_${_pageRef}" name="additionalFieldCO.ADD_STRING15"
						dependency="lookuptxt_addString15_${_pageRef}:sadditionsOptionsVO.OPTION_SERIAL,addString15Desc_${_pageRef}:sadditionsOptionsVO.BRIEF_NAME_ENG"
						dependencySrc="${pageContext.request.contextPath}/pathdesktop/SmartAddOptionsDependencyAction_dependencyByOptionCode"
						parameter="smartAddOptionsSC.optionSerial:lookuptxt_addString15_${_pageRef},smartAddOptionsSC.optionCode:smartTextOption15_${_pageRef}">
						</psj:livesearch>
				</td>
				<td>
					<ps:textfield id="addString15Desc_${_pageRef}" disabled="true" name="additionalFieldCO.SMART_TEXT_DESC15" size="5px" cssClass="ui-state-focus textCompSize ui-corner-all"  />
				</td>
			</ps:if>
			<ps:else>
			<td class="fldLabelView">
				<ps:label  id="lbl_AddString15_${_pageRef}" for="addString15_${_pageRef}"/>
			</td>
			<td colspan="2">
				<ps:textfield id="addString15_${_pageRef}" name="additionalFieldCO.ADD_STRING15" size="5px" cssClass="ui-state-focus textCompSize ui-corner-all"  />
			</td>
			</ps:else>
			<td colspan="4">
			</td>
		</tr>
		</table></td></tr>
		</ps:if>
		<%/* Additional Number*/%>
		<ps:if test="additionalFieldCO.isAddNumber == true">
			<tr><td><div class="ui-state-focus ui-corner-top">&nbsp;&nbsp;<ps:label key="Additional_Number_key"></ps:label></div></td></tr>
		
		<tr><td>
		<table width="100%" border="0" style="padding:0 10px;" class=" headerPortionContent ui-widget-content">
		<tr>
			<td width="15%"></td>
			<td width="10%"></td>
			<td width="20%"></td>
			<td width="15%"></td>
			<td width="10%"></td>
			<td width="20%"></td>
			<td width="10%"></td>
		</tr>
		<tr>
			<ps:if test="additionalFieldCO.SMART_OPTION1 != null && additionalFieldCO.SMART_OPTION1 > 0">
				<td class="fldLabelView" >
					<ps:label id="lbl_AddNumber1_${_pageRef}" for="lookuptxt_addNumber1_${_pageRef}" />
				</td>
				<td>
					<ps:if test="additionalFieldCO.USECIF_NUMBER1 != null && additionalFieldCO.USECIF_NUMBER1 ==1">
						<psj:livesearch actionName="${pageContext.request.contextPath}/pathdesktop/CifLookup_constructCifQueryLookup"
							mode="number" maxlength="8" 
							searchElement="CIF_NO" id="addNumber1_${_pageRef}" name="additionalFieldCO.ADD_NUMBER1" 
							dependency="lookuptxt_addNumber1_${_pageRef}:cifVO.CIF_NO,addNumber1Desc_${_pageRef}:cifVO.SHORT_NAME_ENG"
							dependencySrc="${pageContext.request.contextPath}/pathdesktop/CifDependencyAction_dependencyByCifNo"
							parameter="CIF_NO:lookuptxt_addNumber1_${_pageRef}" >
						</psj:livesearch>
					</ps:if>
					<ps:else>
						<ps:hidden name="additionalFieldCO.SMART_OPTION1" id="smartOption1_${_pageRef}"> </ps:hidden>
						<psj:livesearch actionName="${pageContext.request.contextPath}/pathdesktop/SmartAddOptions_constructLookup"
						paramList="optionCode:smartOption1_${_pageRef}" mode="number" maxlength="3"
						searchElement="OPTION_SERIAL" id="addNumber1_${_pageRef}" name="additionalFieldCO.ADD_NUMBER1"
						dependency="lookuptxt_addNumber1_${_pageRef}:sadditionsOptionsVO.OPTION_SERIAL,addNumber1Desc_${_pageRef}:sadditionsOptionsVO.BRIEF_NAME_ENG"
						dependencySrc="${pageContext.request.contextPath}/pathdesktop/SmartAddOptionsDependencyAction_dependencyByOptionCode"
						parameter="smartAddOptionsSC.optionSerial:lookuptxt_addNumber1_${_pageRef},smartAddOptionsSC.optionCode:smartOption1_${_pageRef}">
						</psj:livesearch>
					</ps:else>
				</td>
				<td>
					<ps:textfield id="addNumber1Desc_${_pageRef}" disabled="true" name="additionalFieldCO.SMART_DESC1" size="5px" cssClass="ui-state-focus textCompSize ui-corner-all"  />
				</td>
			</ps:if>
			<ps:else>
				<td class="fldLabelView">
					<ps:label  id="lbl_AddNumber1_${_pageRef}" for="addNumber1_${_pageRef}" />
				</td>
				<td colspan="2">
					<ps:textfield id="addNumber1_${_pageRef}" mode="number" maxlength="21" maxValue="99999999999999999.999" nbFormat="0.##0" name="additionalFieldCO.ADD_NUMBER1" size="5px" cssClass="ui-state-focus textCompSize ui-corner-all"  />
				</td>
			</ps:else>
			
			<ps:if test="additionalFieldCO.SMART_OPTION2 != null && additionalFieldCO.SMART_OPTION2 > 0">
				<td class="fldLabelView" >
					<ps:label id="lbl_AddNumber2_${_pageRef}" for="lookuptxt_addNumber2_${_pageRef}" />
				</td>
				<td>
					<ps:if test="additionalFieldCO.USECIF_NUMBER2 != null && additionalFieldCO.USECIF_NUMBER2 ==1">
						<psj:livesearch actionName="${pageContext.request.contextPath}/pathdesktop/CifLookup_constructCifQueryLookup"
							mode="number" maxlength="8" 
							searchElement="CIF_NO" id="addNumber2_${_pageRef}" name="additionalFieldCO.ADD_NUMBER2" 
							dependency="lookuptxt_addNumber2_${_pageRef}:cifVO.CIF_NO,addNumber2Desc_${_pageRef}:cifVO.SHORT_NAME_ENG"
							dependencySrc="${pageContext.request.contextPath}/pathdesktop/CifDependencyAction_dependencyByCifNo"
							parameter="CIF_NO:lookuptxt_addNumber2_${_pageRef}" >
						</psj:livesearch>
					</ps:if>
					<ps:else>
						<ps:hidden name="additionalFieldCO.SMART_OPTION2" id="smartOption2_${_pageRef}"> </ps:hidden>
						<psj:livesearch actionName="${pageContext.request.contextPath}/pathdesktop/SmartAddOptions_constructLookup"
							paramList="optionCode:smartOption2_${_pageRef}" mode="number" maxlength="3"
							searchElement="OPTION_SERIAL" id="addNumber2_${_pageRef}" name="additionalFieldCO.ADD_NUMBER2"
							dependency="lookuptxt_addNumber2_${_pageRef}:sadditionsOptionsVO.OPTION_SERIAL,addNumber2Desc_${_pageRef}:sadditionsOptionsVO.BRIEF_NAME_ENG"
							dependencySrc="${pageContext.request.contextPath}/pathdesktop/SmartAddOptionsDependencyAction_dependencyByOptionCode"
							parameter="smartAddOptionsSC.optionSerial:lookuptxt_addNumber2_${_pageRef},smartAddOptionsSC.optionCode:smartOption2_${_pageRef}">
						</psj:livesearch>
					</ps:else>
				</td>
				<td>
					<ps:textfield id="addNumber2Desc_${_pageRef}" disabled="true" name="additionalFieldCO.SMART_DESC2" size="5px" cssClass="ui-state-focus textCompSize ui-corner-all"  />
				</td>
			</ps:if>
			<ps:else>
				<td class="fldLabelView">
					<ps:label  id="lbl_AddNumber2_${_pageRef}" for="addNumber2_${_pageRef}" />
				</td>
				<td colspan="2" >
					<ps:textfield id="addNumber2_${_pageRef}" mode="number" maxlength="21" maxValue="99999999999999999.999" nbFormat="0.##0" name="additionalFieldCO.ADD_NUMBER2" size="5px" cssClass="ui-state-focus textCompSize ui-corner-all"  />
				</td>
			</ps:else>
			<td></td>
		</tr>
		
		<tr>
			<ps:if test="additionalFieldCO.SMART_OPTION3 != null && additionalFieldCO.SMART_OPTION3 > 0">
				<td class="fldLabelView">
					<ps:label  id="lbl_AddNumber3_${_pageRef}" for="lookuptxt_addNumber3_${_pageRef}" />
				</td>
				<td>
					<ps:if test="additionalFieldCO.USECIF_NUMBER3 != null && additionalFieldCO.USECIF_NUMBER3 ==1">
						<psj:livesearch actionName="${pageContext.request.contextPath}/pathdesktop/CifLookup_constructCifQueryLookup"
							mode="number" maxlength="8" 
							searchElement="CIF_NO" id="addNumber3_${_pageRef}" name="additionalFieldCO.ADD_NUMBER3" 
							dependency="lookuptxt_addNumber3_${_pageRef}:cifVO.CIF_NO,addNumber3Desc_${_pageRef}:cifVO.SHORT_NAME_ENG"
							dependencySrc="${pageContext.request.contextPath}/pathdesktop/CifDependencyAction_dependencyByCifNo"
							parameter="CIF_NO:lookuptxt_addNumber3_${_pageRef}" >
						</psj:livesearch>
					</ps:if>
					<ps:else>
						<ps:hidden name="additionalFieldCO.SMART_OPTION3" id="smartOption3_${_pageRef}"> </ps:hidden>
						<psj:livesearch actionName="${pageContext.request.contextPath}/pathdesktop/SmartAddOptions_constructLookup"
							paramList="optionCode:smartOption3_${_pageRef}" mode="number" maxlength="3"
							searchElement="OPTION_SERIAL" id="addNumber3_${_pageRef}" name="additionalFieldCO.ADD_NUMBER3"
							dependency="lookuptxt_addNumber3_${_pageRef}:sadditionsOptionsVO.OPTION_SERIAL,addNumber3Desc_${_pageRef}:sadditionsOptionsVO.BRIEF_NAME_ENG"
							dependencySrc="${pageContext.request.contextPath}/pathdesktop/SmartAddOptionsDependencyAction_dependencyByOptionCode"
							parameter="smartAddOptionsSC.optionSerial:lookuptxt_addNumber3_${_pageRef},smartAddOptionsSC.optionCode:smartOption3_${_pageRef}">
						</psj:livesearch>
					</ps:else>
				</td>
				<td>
					<ps:textfield id="addNumber3Desc_${_pageRef}" disabled="true" name="additionalFieldCO.SMART_DESC3" size="5px" cssClass="ui-state-focus textCompSize ui-corner-all"  />
				</td>
			</ps:if>
			<ps:else>
				<td class="fldLabelView">
					<ps:label  id="lbl_AddNumber3_${_pageRef}" for="addNumber3_${_pageRef}" />
				</td>
				<td colspan="2" >
					<ps:textfield id="addNumber3_${_pageRef}" mode="number" maxlength="21" maxValue="99999999999999999.999" nbFormat="0.##0" name="additionalFieldCO.ADD_NUMBER3" size="5px" cssClass="ui-state-focus textCompSize ui-corner-all"  />
				</td>
			</ps:else>
			
			<ps:if test="additionalFieldCO.SMART_OPTION4 != null && additionalFieldCO.SMART_OPTION4 > 0">
				<td class="fldLabelView">
					<ps:label  id="lbl_AddNumber4_${_pageRef}" for="lookuptxt_addNumber4_${_pageRef}" />
				</td>
				<td>
					<ps:if test="additionalFieldCO.USECIF_NUMBER4 != null && additionalFieldCO.USECIF_NUMBER4 ==1">
						<psj:livesearch actionName="${pageContext.request.contextPath}/pathdesktop/CifLookup_constructCifQueryLookup"
							mode="number" maxlength="8" 
							searchElement="CIF_NO" id="addNumber4_${_pageRef}" name="additionalFieldCO.ADD_NUMBER4" 
							dependency="lookuptxt_addNumber4_${_pageRef}:cifVO.CIF_NO,addNumber4Desc_${_pageRef}:cifVO.SHORT_NAME_ENG"
							dependencySrc="${pageContext.request.contextPath}/pathdesktop/CifDependencyAction_dependencyByCifNo"
							parameter="CIF_NO:lookuptxt_addNumber4_${_pageRef}" >
						</psj:livesearch>
					</ps:if>
					<ps:else>
						<ps:hidden name="additionalFieldCO.SMART_OPTION4" id="smartOption4_${_pageRef}"> </ps:hidden>
						<psj:livesearch actionName="${pageContext.request.contextPath}/pathdesktop/SmartAddOptions_constructLookup"
							paramList="optionCode:smartOption4_${_pageRef}" mode="number" maxlength="3"
							searchElement="OPTION_SERIAL" id="addNumber4_${_pageRef}" name="additionalFieldCO.ADD_NUMBER4"
							dependency="lookuptxt_addNumber4_${_pageRef}:sadditionsOptionsVO.OPTION_SERIAL,addNumber4Desc_${_pageRef}:sadditionsOptionsVO.BRIEF_NAME_ENG"
							dependencySrc="${pageContext.request.contextPath}/pathdesktop/SmartAddOptionsDependencyAction_dependencyByOptionCode"
							parameter="smartAddOptionsSC.optionSerial:lookuptxt_addNumber4_${_pageRef},smartAddOptionsSC.optionCode:smartOption4_${_pageRef}">
						</psj:livesearch>
					</ps:else>
				</td>
				<td>
					<ps:textfield id="addNumber4Desc_${_pageRef}" disabled="true" name="additionalFieldCO.SMART_DESC4" size="5px" cssClass="ui-state-focus textCompSize ui-corner-all"  />
				</td>
			</ps:if>
			<ps:else>
				<td class="fldLabelView">
					<ps:label  id="lbl_AddNumber4_${_pageRef}" for="addNumber4_${_pageRef}" />
				</td>
				<td colspan="2" >
					<ps:textfield id="addNumber4_${_pageRef}" mode="number" maxlength="21" maxValue="99999999999999999.999" nbFormat="0.##0" name="additionalFieldCO.ADD_NUMBER4" size="5px" cssClass="ui-state-focus textCompSize ui-corner-all"  />
				</td>
			</ps:else>
			<td></td>
		</tr>
		<tr>
			<ps:if test="additionalFieldCO.SMART_OPTION5 != null && additionalFieldCO.SMART_OPTION5 > 0">
				<td class="fldLabelView" >
					<ps:label id="lbl_AddNumber5_${_pageRef}" for="lookuptxt_addNumber5_${_pageRef}" />
				</td>
				<td>
					<ps:if test="additionalFieldCO.USECIF_NUMBER5 != null && additionalFieldCO.USECIF_NUMBER5 ==1">
						<psj:livesearch actionName="${pageContext.request.contextPath}/pathdesktop/CifLookup_constructCifQueryLookup"
							mode="number" maxlength="8" 
							searchElement="CIF_NO" id="addNumber5_${_pageRef}" name="additionalFieldCO.ADD_NUMBER5" 
							dependency="lookuptxt_addNumber5_${_pageRef}:cifVO.CIF_NO,addNumber5Desc_${_pageRef}:cifVO.SHORT_NAME_ENG"
							dependencySrc="${pageContext.request.contextPath}/pathdesktop/CifDependencyAction_dependencyByCifNo"
							parameter="CIF_NO:lookuptxt_addNumber5_${_pageRef}" >
						</psj:livesearch>
					</ps:if>
					<ps:else>
						<ps:hidden name="additionalFieldCO.SMART_OPTION5" id="smartOption5_${_pageRef}"> </ps:hidden>
						<psj:livesearch actionName="${pageContext.request.contextPath}/pathdesktop/SmartAddOptions_constructLookup"
							paramList="optionCode:smartOption5_${_pageRef}" mode="number" maxlength="3"
							searchElement="OPTION_SERIAL" id="addNumber5_${_pageRef}" name="additionalFieldCO.ADD_NUMBER5"
							dependency="lookuptxt_addNumber5_${_pageRef}:sadditionsOptionsVO.OPTION_SERIAL,addNumber5Desc_${_pageRef}:sadditionsOptionsVO.BRIEF_NAME_ENG"
							dependencySrc="${pageContext.request.contextPath}/pathdesktop/SmartAddOptionsDependencyAction_dependencyByOptionCode"
							parameter="smartAddOptionsSC.optionSerial:lookuptxt_addNumber5_${_pageRef},smartAddOptionsSC.optionCode:smartOption5_${_pageRef}">
						</psj:livesearch>
					</ps:else>
				</td>
				<td>
					<ps:textfield id="addNumber5Desc_${_pageRef}" disabled="true" name="additionalFieldCO.SMART_DESC5" size="5px" cssClass="ui-state-focus textCompSize ui-corner-all"  />
				</td>
			</ps:if>
			<ps:else>
				<td class="fldLabelView">
					<ps:label  id="lbl_AddNumber5_${_pageRef}" for="addNumber5_${_pageRef}" />
				</td>
				<td colspan="2" >
					<ps:textfield id="addNumber5_${_pageRef}" mode="number" maxlength="21" maxValue="99999999999999999.999" nbFormat="0.##0" name="additionalFieldCO.ADD_NUMBER5" size="5px" cssClass="ui-state-focus textCompSize ui-corner-all"  />
				</td>
			</ps:else>
			<td colspan="4"></td>
		</tr>
		</table></td></tr>
		</ps:if>
		<%/* Additional Date  */%>
		<ps:if test="additionalFieldCO.isAddDate == true">
			<tr><td><div class="ui-state-focus ui-corner-top">&nbsp;&nbsp;<ps:label key="Additional_Date_key"></ps:label></div></td></tr>
		
		<tr><td>
		<table width="100%" border="0" style="padding:0 10px;" class=" headerPortionContent ui-widget-content">
		<tr>
			<td width="15%"></td>
			<td width="15%"></td>
			<td width="15%"></td>
			<td width="15%"></td>
			<td width="15%"></td>
			<td width="25%"></td>
		</tr>
		<tr>
			<td class="fldLabelView">
				<ps:label  id="lbl_AddDate1_${_pageRef}" for="addDate1_${_pageRef}" />
			</td>
			<td >
				<psj:datepicker id="addDate1_${_pageRef}"	name="additionalFieldCO.ADD_DATE1" size="5px" cssClass="ui-state-focus textCompSize ui-corner-all" buttonImageOnly="true" />
			</td>
			<td></td>
			<td class="fldLabelView">
				<ps:label  id="lbl_AddDate2_${_pageRef}" for="addDate2_${_pageRef}" />
			</td>
			<td >
				<psj:datepicker id="addDate2_${_pageRef}"	name="additionalFieldCO.ADD_DATE2" size="5px" cssClass="ui-state-focus textCompSize ui-corner-all"  buttonImageOnly="true"/>
			</td>
			<td></td>
		</tr>
		
		<tr>
			<td class="fldLabelView">
				<ps:label  id="lbl_AddDate3_${_pageRef}" for="addDate3_${_pageRef}" />
			</td>
			<td >
				<psj:datepicker id="addDate3_${_pageRef}"	name="additionalFieldCO.ADD_DATE3" size="5px" cssClass="ui-state-focus textCompSize ui-corner-all" buttonImageOnly="true" />
			</td>
			<td></td>
			<td class="fldLabelView">
				<ps:label  id="lbl_AddDate4_${_pageRef}" for="addDate4_${_pageRef}" />
			</td>
			<td >
				<psj:datepicker id="addDate4_${_pageRef}"	name="additionalFieldCO.ADD_DATE4" size="5px" cssClass="ui-state-focus textCompSize ui-corner-all"  buttonImageOnly="true"/>
			</td>
			<td></td>
		</tr>
		
		<tr>
			<td class="fldLabelView">
				<ps:label  id="lbl_AddDate5_${_pageRef}" for="addDate5_${_pageRef}" />
			</td>
			<td >
				<psj:datepicker id="addDate5_${_pageRef}"	name="additionalFieldCO.ADD_DATE5" size="5px" cssClass="ui-state-focus textCompSize ui-corner-all" buttonImageOnly="true" />
			</td>
			<td colspan="4">&nbsp;</td>
		</tr>
		</table></td></tr>
		</ps:if>
	</table>
	</ps:if>