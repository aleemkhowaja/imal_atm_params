<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<input type="hidden" id="labeling_scr_impExpLoaded"/>
<input type="hidden" id="labeling_web_apps_only_filter" value="1"/>
<table>
	<tr>
		<td class="fldLabelView">
			<ps:label key="trans_imp_exp_key" id="impExpSelectLabel" />
		</td>
	</tr>
	<tr>
		<td>
			<ps:radio list="#{'1':'export_key','2':'import_key'}" id="impExpSelect"
				name="impExpSelect" onclick="impExpSelectChange(this)" value="1" />
		</td>
	</tr>
	<tr>
		<td>
			<div id="transExport">
				<table>
					<tr>
						<td>
							<table>
								<tr>
									<td>
										<ps:radio list="#{'1':'global_ref_key'}" id="selectedApp"
											name="translationSC.selectedApp" value="1" onclick="Trns_ExpSpecificAppRadioClicked()"/>
									</td>
									<td>
										<ps:radio list="#{'2':'trans_current_app_key'}" id="selectedApp"
											name="translationSC.selectedApp" onclick="Trns_ExpSpecificAppRadioClicked()"/>
									</td>
									<td>
										<ps:radio list="#{'3':'trans_both_key'}" id="selectedApp"
											name="translationSC.selectedApp" onclick="Trns_ExpSpecificAppRadioClicked()"/>
									</td>
									<ps:if test='session.sesVO.currentAppName == "REP" || session.sesVO.currentAppName == "IBIS"'>
									<td>
										<ps:radio list="#{'4':'trans_all_key'}" id="selectedApp"
											name="translationSC.selectedApp" onclick="Trns_ExpSpecificAppRadioClicked()"/>
									</td>
									</ps:if>
								</tr>
								<ps:if test='session.sesVO.currentAppName == "REP" || session.sesVO.currentAppName == "IBIS"'>
								<tr>
								    <td>
										<ps:radio list="#{'5':'trans_specific_app_key'}" id="selectedApp_specific"
											name="translationSC.selectedApp" onclick="Trns_ExpSpecificAppRadioClicked()" />
									</td>
									<td colspan="4">
									 <table cellpadding="0" cellspacing="0">
											<tr>
												<td><ps:label key="application_key"
														id="trns_ExpImpApplication_lbl"
														for="lookuptxt_expImpApp_Labeling" />
												</td>
												<td><psj:livesearch id="expImpApp_Labeling" relatedDescElt="expImpApp_appDesc"
														required="true" cssStyle="display:none;text-transform:uppercase;"  size="8" 
														name="translationCO.sysParamKeyLabelVO.APP_NAME"
														paramList="webAppsOnly:labeling_web_apps_only_filter"
														actionName="${pageContext.request.contextPath}/pathdesktop/ApplicationsLookup_constructLookup"
														resultList="APP_NAME:expImpApp_Labeling"
														searchElement="APP_NAME" autoSearch="false" maxlength="4"
														dependencySrc="${pageContext.request.contextPath}/pathdesktop/ApplicationDependencyAction_applicationDepend"
														parameter="appVO.APP_NAME:lookuptxt_expImpApp_Labeling,webAppsOnly:labeling_web_apps_only_filter"
														dependency="lookuptxt_expImpApp_Labeling:appVO.APP_NAME,expImpApp_appDesc:appVO.APP_DESC,lookuptxt_PageRef_Labeling:optVO.PROG_REF,Labeling_PROG_DESC:optVO.PROG_DESC,lookuptxt_specificKey_Labeling:translationCO.sysParamKeyLabelVO.KEY_LABEL_CODE,labeling_KEY_LABEL_DESC:translationCO.sysParamKeyLabelVO.KEY_LABEL_DESC" />
												</td>
												<td>
													<ps:textfield  id="expImpApp_appDesc" cssStyle="display:none;" size="50" name="expImpApp_appDesc" readonly="true" />
												</td>
											</tr>
										</table>
									</td>
								</tr>
								</ps:if>
							</table>
						</td>
					</tr>
					<tr>
					<td>
					<table>
						<tr>
							<td class="fldLabelView">
								<ps:label id="trans_lang" for="select_trans_lang"
									key="Language_key" required="true"></ps:label>
							</td>
							<td>
								<ps:select id="select_trans_lang"
									name="translationSC.preferredLanguage" list="langSelect"
									listKey="code" listValue="descValue" multiple="true"
									cssStyle="height:60px;">
								</ps:select>
							</td>
						</tr>
						<tr>
							<td class="fldLabelView">
								<ps:label key="export_all_pages_key" id="lbl_allPageRef"
									for="allPageRef" />
							</td>
							<td>
								<ps:select id="allPageRef" list="#{'0':getText('export_all_pages_key'),'1':getText('specificKey_key'),'2':getText('spec_Page_key')}"
									       name="translationSC.exportType" onchange="exportPageRefChecked(this)"/>
							</td>
						</tr>
						<tr id="pageRefRow">
							<td class="fldLabelView">
								<ps:label key="progRef" id="PageRefLabel"
									for="lookuptxt_PageRef_Labeling" />
							</td>
							<td>
							 <ps:if test='session.sesVO.currentAppName == "REP" || session.sesVO.currentAppName == "IBIS"'>
								<psj:livesearch id="PageRef_Labeling" required="true"
									name="translationCO.sysParamKeyLabelVO.PROG_REF"
									actionName="${pageContext.request.contextPath}/pathdesktop/TranslationLookup_pageRefLookup"
									resultList="PROG_REF:PageRef_Labeling,PROG_DESC:Labeling_PROG_DESC"
									paramList="translationSC.appName:lookuptxt_expImpApp_Labeling,translationSC.selectedApp:selectedApp"
									searchElement="PROG_REF" autoSearch="false" maxlength="15"
									dependencySrc="${pageContext.request.contextPath}/pathdesktop/TranslationDependencyAction_pageRefDep"
									parameter="translationSC.pageRef:lookuptxt_PageRef_Labeling,translationSC.appName:lookuptxt_expImpApp_Labeling,translationSC.selectedApp:selectedApp"
									dependency="lookuptxt_PageRef_Labeling:optVO.PROG_REF,Labeling_PROG_DESC:optVO.PROG_DESC,translationSC.pageRef:optVO.PROG_REF" />
							</ps:if>	
							<ps:else>
								<psj:livesearch id="PageRef_Labeling" required="true"
									name="translationCO.sysParamKeyLabelVO.PROG_REF"
									actionName="${pageContext.request.contextPath}/pathdesktop/TranslationLookup_pageRefLookup"
									resultList="PROG_REF:PageRef_Labeling,PROG_DESC:Labeling_PROG_DESC"
									searchElement="PROG_REF" autoSearch="false" maxlength="15"
									dependencySrc="${pageContext.request.contextPath}/pathdesktop/TranslationDependencyAction_pageRefDep"
									parameter="translationSC.pageRef:lookuptxt_PageRef_Labeling"
									dependency="lookuptxt_PageRef_Labeling:optVO.PROG_REF,Labeling_PROG_DESC:optVO.PROG_DESC,translationSC.pageRef:optVO.PROG_REF" />
							</ps:else>
							</td>
							<td width="200">
								<ps:textfield id="Labeling_PROG_DESC" name="Labeling_PROG_DESC" readonly="true" />
							</td>
						</tr>
						<tr>
						   <td>
								<ps:label key="specificKey_key" id="specificKeyLabel"
									for="lookuptxt_specificKey_Labeling"/>
						   </td>
						   <td>
						       <ps:if test='session.sesVO.currentAppName == "REP" || session.sesVO.currentAppName == "IBIS"'>
								<psj:livesearch id="specificKey_Labeling"
									 name="translationCO.sysParamKeyLabelVO.KEY_LABEL_CODE"
									 actionName="${pageContext.request.contextPath}/pathdesktop/TranslationLookup_labelKeyLookup"
									 resultList="sysParamKeyLabelVO.KEY_LABEL_CODE:lookuptxt_specificKey_Labeling,sysParamKeyLabelVO.KEY_LABEL_DESC:labeling_KEY_LABEL_DESC"
									 paramList="translationSC.appName:lookuptxt_expImpApp_Labeling,translationSC.selectedApp:selectedApp"
									 searchElement="KEY_LABEL_CODE" autoSearch="false"
									 dependencySrc="${pageContext.request.contextPath}/pathdesktop/TranslationDependencyAction_labelKeyDep"
									 parameter="translationSC.appName:lookuptxt_expImpApp_Labeling,translationSC.selectedApp:selectedApp,translationSC.labelKey:lookuptxt_specificKey_Labeling"
									 dependency="lookuptxt_specificKey_Labeling:translationCO.sysParamKeyLabelVO.KEY_LABEL_CODE,labeling_KEY_LABEL_DESC:translationCO.sysParamKeyLabelVO.KEY_LABEL_CODE" />
							  </ps:if>
							  <ps:else>
								<psj:livesearch id="specificKey_Labeling"
									 name="translationCO.sysParamKeyLabelVO.KEY_LABEL_CODE"
									 actionName="${pageContext.request.contextPath}/pathdesktop/TranslationLookup_labelKeyLookup"
									 resultList="sysParamKeyLabelVO.KEY_LABEL_CODE:lookuptxt_specificKey_Labeling,sysParamKeyLabelVO.KEY_LABEL_DESC:labeling_KEY_LABEL_DESC"
									 paramList="translationSC.selectedApp:selectedApp"
									 searchElement="KEY_LABEL_CODE" autoSearch="false" maxlength="15"
									 dependencySrc="${pageContext.request.contextPath}/pathdesktop/TranslationDependencyAction_labelKeyDep"
									 parameter="translationSC.selectedApp:selectedApp,translationSC.labelKey:lookuptxt_specificKey_Labeling"
									 dependency="lookuptxt_specificKey_Labeling:translationCO.sysParamKeyLabelVO.KEY_LABEL_CODE,labeling_KEY_LABEL_DESC:translationCO.sysParamKeyLabelVO.KEY_LABEL_CODE" />
							  </ps:else> 		 
						   </td>
						   <td>
						       <ps:textfield id="labeling_KEY_LABEL_DESC" name="translationCO.sysParamKeyLabelVO.KEY_LABEL_DESC" readonly="true" />
						   </td>
						</tr>
						<tr>
							<td class="fldLabelView">
								<ps:label  id="lbl_translationDateUpdated" for="translationDateUpdated" key="updated_after_key" />
							</td>
							<td >
								<psj:datepicker id="translationDateUpdated"	name="translationSC.dateUpdated" size="5px" cssClass="ui-state-focus textCompSize ui-corner-all" buttonImageOnly="true" />
							</td>
						</tr>
						<tr>
							<td class="fldLabelView">
								<ps:label key="export_no_reports_key" id="lblExportTransWithoutReports"
									for="exportTransWithoutReports" />
							</td>
							<td>
								<ps:checkbox 
									name="translationSC.exportWithoutReports" id="exportTransWithoutReports" />
							</td>
						</tr>
						<tr>
							<td>
								<psj:submit button="true" onclick="exportTrans()" type="button"
									buttonIcon="ui-icon-trash">
									<ps:label key="Save_Script_key" />
								</psj:submit>
							</td>
						</tr>
					</table>
				  </td>
				</table>
			</div>
		</td>
	</tr>
	<tr>
		<td>
			<div id="transImport" style="display: none">
				<ps:form id="labelsFileForm" method="post"
					enctype="multipart/form-data" namespace="/path/fileMngmt">
					<table>
						<tr>
							<td class="fldLabelView">
								<ps:label key="override_lbl_key" id="lblOverwriteLabel"
									for="overwriteLabel" />
							</td>
							<td>
								<ps:checkbox 
									name="translationCO.overwriteLabel" id="overwriteLabel" />
							</td>
						</tr>
						<tr>
							<td class="fldLabelView">
								<ps:label key="override_glbl_lbl_key" id="lblOverwriteGroup"
									for="overwriteGroup" />
							</td>
							<td>
								<ps:checkbox
									name="translationCO.overwriteGroup" id="overwriteGroup" />
							</td>
						</tr>
						<tr>
							<td class="fldLabelView">
								<ps:label key="override_clt_key" id="lblOverwriteClientTranslation"
									for="overwriteClientTranslation" />
							</td>
							<td>
								<ps:checkbox 
									name="translationCO.overwriteClient" id="overwriteClientTranslation" />
							</td>
						</tr>
						<tr>
							<td class="fldLabelView">
								<ps:label key="File_Location_key" />
							</td>
							<td colspan="2">
								<ps:file id="uploadScript" name="upload"></ps:file>
							</td>
							<td>
								<psj:submit button="true" onclick="importTrans();" type="button"
									buttonIcon="ui-icon-folder-open">
									<ps:label key="Open_Import_from_file_key" />
								</psj:submit>
							</td>
						</tr>
					</table>
				</ps:form>
			</div>
		</td>
	</tr>
</table>