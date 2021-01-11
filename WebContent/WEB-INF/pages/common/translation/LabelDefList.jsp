<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@taglib prefix="pt" uri="/path-toolbar-tags"%>
<table>
	<tr>
		<td colspan="2">
			<div>
			<input type="hidden" id="labeling_scr_customTrans"/>
			<input type="hidden" id="labeling_scr_labelDefLoaded"/>
				<ps:url id="labelDefURL"
					action="TranslationMaint_loadLabelDetailsGrid" escapeAmp="false"
					namespace="/path">
					<ps:param name="translationSC.loadSelected" value="translationSC.loadSelected"></ps:param>
	      			<ps:param name="translationSC.pageRef" value="translationSC.pageRef"></ps:param>
	      			<ps:param name="translationSC.keyLabelCode" value="translationSC.keyLabelCode"></ps:param>
	      			<ps:param name="translationSC.appName" value="translationSC.appName"></ps:param>
	      			<ps:param name="translationSC.filters" value="translationSC.filters"></ps:param>
				</ps:url>

				<psjg:grid id="labelDefTbl_Id" caption="%{getText('lbl_det_key')}"
					dataType="json" href="%{labelDefURL}" hiddengrid="false"
					pager="true" filter="true" gridModel="gridModel" rowNum="8"
					height="205" rowList="8,16,24,32" navigator="true" altRows="false"
					navigatorDelete="true" navigatorEdit="false"
					navigatorSearch="true"
					navigatorSearchOptions="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true}"
					sortable="true" editurl="abc" editinline="true" multiselect="false"
					navigatorAdd="true" navigatorRefresh="false" pagerButtons="true"
					rownumbers="false" autowidth="false" width="890"
					shrinkToFit="false" viewrecords="true"
					ondblclick="keyLabelSelected()" addfunc="onNewKeyLabelClicked"
					delfunc="deleteKeyLabelClicked" onGridCompleteTopics="lblTransDetails"
					disableEditableFocus="true"
					onSelectRowTopics="groupDepSelected"
					exportExcel="true"
					dontLoadData="true">

					<psjg:gridColumn id="sysParamKeyLabelVO.APP_NAME" colType="text"
						name="sysParamKeyLabelVO.APP_NAME" title="%{getText('appName')}"
						index="APP_NAME" editable="false" sortable="true" search="true" />

					<psjg:gridColumn id="sysParamKeyLabelVO.PROG_REF" colType="text"
						name="sysParamKeyLabelVO.PROG_REF" title="%{getText('progRef')}"
						index="PROG_REF" editable="false" sortable="true" search="true" />

					<psjg:gridColumn id="progRefDesc" colType="text" name="progRefDesc"
						title="%{getText('progRef')} %{getText('Description_key')}" index="progRefDesc"
						editable="false" sortable="true" search="true" />

					<psjg:gridColumn id="sysParamKeyLabelVO.KEY_LABEL_CODE"
						colType="text" name="sysParamKeyLabelVO.KEY_LABEL_CODE"
						title="%{getText('lbl_code_key')}" index="KEY_LABEL_CODE"
						editable="false" sortable="true" search="true" />

					<psjg:gridColumn id="sysParamKeyLabelVO.KEY_LABEL_DESC"
						colType="text" name="sysParamKeyLabelVO.KEY_LABEL_DESC"
						title="%{getText('lbl_desc_key')}" index="KEY_LABEL_DESC"
						editable="false" sortable="true" search="true" />

					<psjg:gridColumn id="KEY_GROUP_ID" colType="liveSearch"
						name="sysParamKeyLabelVO.KEY_GROUP_ID" index="KEY_GROUP_ID"
						title="%{getText('grp_id_key')}" editable="true" sortable="true"
						search="true" paramList="" mode="number"
						dataAction="${pageContext.request.contextPath}/pathdesktop/TranslationLookup_groupLookup"
						resultList="sysParamKeyGroupVO.KEY_GROUP_ID:sysParamKeyLabelVO.KEY_GROUP_ID_lookuptxt,sysParamKeyGroupVO.KEY_GROUP_DESC:KEY_GROUP_DESC"
						searchElement="KEY_GROUP_ID"
						dependencySrc="${pageContext.request.contextPath}/pathdesktop/TranslationDependencyAction_updateTransGroup"
						params="translationSC.keyGroupID:sysParamKeyLabelVO.KEY_GROUP_ID_lookuptxt,translationCO.sysParamKeyLabelVO.KEY_LABEL_CODE:sysParamKeyLabelVO.KEY_LABEL_CODE,translationCO.sysParamKeyLabelVO.KEY_LABEL_DESC:sysParamKeyLabelVO.KEY_LABEL_DESC,translationCO.sysParamKeyLabelVO.PROG_REF:sysParamKeyLabelVO.PROG_REF,translationCO.sysParamKeyLabelVO.APP_NAME:sysParamKeyLabelVO.APP_NAME,translationCO.sysParamKeyLabelVO.KEY_GROUP_ID:sysParamKeyLabelVO.KEY_GROUP_ID_lookuptxt"
						dependency="translationCO.sysParamKeyGroupVO.KEY_GROUP_ID:sysParamKeyLabelVO.KEY_GROUP_ID_lookuptxt,translationCO.sysParamKeyGroupVO.KEY_GROUP_DESC:sysParamKeyGroupVO.KEY_GROUP_DESC,translationCO.prefTrans:prefTrans" 
						afterDepEvent="keyLabelSelected()"/>

					<psjg:gridColumn id="KEY_GROUP_DESC" colType="text"
						name="sysParamKeyGroupVO.KEY_GROUP_DESC"
						title="%{getText('grp_desc_key')}" index="KEY_GROUP_DESC"
						editable="false" sortable="true" search="true" />

					<psjg:gridColumn id="prefTrans" colType="text" name="prefTrans"
						title="%{getText('cur_lang_trans')}" index="prefTrans"
						editable="false" sortable="true" search="true" />


				</psjg:grid>


			</div>
		</td>
	</tr>
	<tr>
		<td>
			<jsp:include page="TransList.jsp">
				<jsp:param value="L" name="parentGrid" />
			</jsp:include>
		</td>
	</tr>
</table>

<script type="text/javascript">
$("#labelDefTbl_Id").unsubscribe("lblTransDetails");
$("#labelDefTbl_Id").subscribe("lblTransDetails", function() {
	loadLblTransDetails();
});
$("#labelDefTbl_Id").unsubscribe("keyLabelSelected");
$("#labelDefTbl_Id").subscribe("keyLabelSelected", function(response, html) {
	keyLabelSelected();
});

$("#labelDefTbl_Id").unsubscribe("groupDepSelected");
$("#labelDefTbl_Id").subscribe("groupDepSelected", function(response, html) {
	
	groupDependentLabelsClicked();
});

</script>
