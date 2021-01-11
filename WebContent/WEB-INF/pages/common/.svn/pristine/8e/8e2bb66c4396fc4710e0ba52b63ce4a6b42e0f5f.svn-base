<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@taglib prefix="pt" uri="/path-toolbar-tags"%>

<!-- 440134 Translation Keys with Non Case Sensitivity BLME Issue -->
<ps:set name="prog_ref_key_var" value="%{getEscText('prog_ref_key')}"/>
<ps:set name="missing_elt_key_var" value="%{getEscText('missing_elt_key')}"/>

<!-- 440134 Translation Keys with Non Case Sensitivity BLME Issue -->
<script type="text/javascript">
var prog_ref_key = "${prog_ref_key_var}";
var missing_elt_key = "${missing_elt_key_var}";
</script>

<ps:form id="newKeyLabelForm" useHiddenProps="true">
	<table>
		<tr>
			<td colspan=3>
				<font color="red"> <ps:label key="trans_ref_warn"
						id="noteLabel" />
				</font>

			</td>
		</tr>
		<tr>
			<td class="fldLabelView">
				<ps:label key="global_ref_key" id="GlobalRefLabel" for="GlobalRef" />
			</td>
			<td colspan="2">
				<ps:checkbox onclick="globalRefChecked()"
					name="translationSC.globalRef" id="GlobalRef" />
			</td>
		</tr>
		<ps:if test='session.sesVO.currentAppName == "REP" || session.sesVO.currentAppName == "IBIS"'>
		<tr>
			<td class="fldLabelView"><ps:label key="application_key"
					id="trns_newLblApplication_lbl"
					for="lookuptxt_newLblApp_Labeling" />
			</td>
			<td><psj:livesearch id="newLblApp_Labeling" relatedDescElt="newLblApp_appDesc"
					size="8" required="true"
					name="translationCO.sysParamKeyLabelVO.APP_NAME"
					actionName="${pageContext.request.contextPath}/pathdesktop/ApplicationsLookup_constructLookup"
					resultList="APP_NAME:newLblApp_Labeling"
					searchElement="APP_NAME" autoSearch="false" maxlength="4"
					dependencySrc="${pageContext.request.contextPath}/pathdesktop/ApplicationDependencyAction_applicationDepend"
					parameter="appVO.APP_NAME:lookuptxt_newLblApp_Labeling"
					dependency="lookuptxt_newLblApp_Labeling:appVO.APP_NAME,newLblApp_appDesc:appVO.APP_DESC,lookuptxt_PageRef_Lkp:optVO.PROG_REF,PROG_DESC:optVO.PROG_DESC" />
			</td>
			<td>
				<ps:textfield  id="newLblApp_appDesc" size="35" name="expImpApp_appDesc" readonly="true" />
			</td>
		</tr>
		</ps:if>
		<tr>
			<td class="fldLabelView">
				<ps:label key="progRef"
					for="lookuptxt_PageRef_Lkp" />
			</td>
			<td>
			  <ps:if test='session.sesVO.currentAppName == "REP" || session.sesVO.currentAppName == "IBIS"'>
			  	<psj:livesearch id="PageRef_Lkp" required="true"
					name="translationCO.sysParamKeyLabelVO.PROG_REF"
					actionName="${pageContext.request.contextPath}/pathdesktop/TranslationLookup_pageRefLookup"
					paramList="translationSC.appName:lookuptxt_newLblApp_Labeling"
					resultList="PROG_REF:PageRef_Lkp,PROG_DESC:PROG_DESC"
					searchElement="PROG_REF" autoSearch="false" maxlength="15"
					dependencySrc="${pageContext.request.contextPath}/pathdesktop/TranslationDependencyAction_pageRefDep"
					parameter="translationSC.pageRef:lookuptxt_PageRef_Lkp,translationSC.appName:lookuptxt_newLblApp_Labeling"
					dependency="lookuptxt_PageRef_Lkp:optVO.PROG_REF,PROG_DESC:optVO.PROG_DESC" />
			  </ps:if>
			  <ps:else>
				<psj:livesearch id="PageRef_Lkp" required="true"
					name="translationCO.sysParamKeyLabelVO.PROG_REF"
					actionName="${pageContext.request.contextPath}/pathdesktop/TranslationLookup_pageRefLookup"
					resultList="PROG_REF:PageRef_Lkp,PROG_DESC:PROG_DESC"
					searchElement="PROG_REF" autoSearch="false" maxlength="15"
					dependencySrc="${pageContext.request.contextPath}/pathdesktop/TranslationDependencyAction_pageRefDep"
					parameter="translationSC.pageRef:lookuptxt_PageRef_Lkp"
					dependency="lookuptxt_PageRef_Lkp:optVO.PROG_REF,PROG_DESC:optVO.PROG_DESC" />
				</ps:else>	
			</td>
			<td>
				<ps:textfield id="PROG_DESC" name="PROG_DESC" readonly="true" />
			</td>
		</tr>
		<tr>
			<td class="fldLabelView">
				<ps:label key="lbl_code_key" id="KeyLabelCodeLabel"
					for="KeyLabelCode" />
			</td>
			<td colspan="2">
				<!-- 440134 Translation Keys with Non Case Sensitivity BLME Issue -->
				<ps:textfield name="translationCO.sysParamKeyLabelVO.KEY_LABEL_CODE"
				cssStyle="text-transform:lowercase;" onmousedown="this.value=this.value.toLowerCase()" onblur="this.value=this.value.toLowerCase()"
				 id="KeyLabelCode" maxlength="250" required="true"
				dependencySrc="${pageContext.request.contextPath}/pathdesktop/TranslationDependencyAction_keyLowerDep"
				parameter="translationSC.globalRef:GlobalRef,
				translationSC.pageRef:lookuptxt_PageRef_Lkp,
				translationSC.keyLabelCode:KeyLabelCode"
				dependency="KeyLabelCode:translationCO.sysParamKeyLabelVO.KEY_LABEL_CODE"/>
			</td>
		</tr>
		<tr>
			<td class="fldLabelView">
				<ps:label key="lbl_desc_key" id="KeyLabelDescLabel"
					for="KeyLabelDesc" />
			</td>
			<td colspan="2">
				<ps:textfield name="translationCO.keyLabelTextDesc"
					id="KeyLabelDesc" required="true" />
			</td>
		</tr>
		<tr>
			<td class="fldLabelView">
				<ps:label key="grp_id_key" id="KeyGroupIDLabel"
					for="lookuptxt_KeyGroupID" />
			</td>
			<td>
				<psj:livesearch id="KeyGroupID"
					name="translationCO.sysParamKeyLabelVO.KEY_GROUP_ID" mode="number"
					actionName="${pageContext.request.contextPath}/pathdesktop/TranslationLookup_groupLookup"
					resultList="sysParamKeyGroupVO.KEY_GROUP_ID:sysParamKeyLabelVO.KEY_GROUP_ID_lookuptxt"
					searchElement="sysParamKeyGroupVO.KEY_GROUP_ID" autoSearch="false"
					maxlength="6"
					dependencySrc="${pageContext.request.contextPath}/pathdesktop/TranslationDependencyAction_groupByIDDep"
					parameter="translationSC.keyGroupID:lookuptxt_KeyGroupID"
					dependency="lookuptxt_KeyGroupID:translationCO.sysParamKeyGroupVO.KEY_GROUP_ID,KEY_GROUP_DESC:translationCO.sysParamKeyGroupVO.KEY_GROUP_DESC" />
			</td>
			<td>
				<ps:textfield id="KEY_GROUP_DESC" name="KEY_GROUP_DESC"
					readonly="true" />
			</td>
		</tr>
	</table>
</ps:form>