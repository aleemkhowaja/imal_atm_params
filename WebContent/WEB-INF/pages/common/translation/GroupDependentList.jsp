<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@taglib prefix="pt" uri="/path-toolbar-tags"%>


<table>
	<tr>
		<td style="padding-top: 5px">
           <ps:label key="grp_id_key" id="lbl_KEY_GROUP_ID" cssClass="boldLabel"/>
		</td>
		<td style="padding-top: 5px">
		   <ps:property value="translationSC.keyGroupID"/>
		</td>
		
		<td style="padding-top: 5px">
           <ps:label key="grp_desc_key" id="lbl_KEY_GROUP_DESC" cssClass="boldLabel"/>
		</td>
		<td style="padding-top: 5px">
		   <ps:property value="translationSC.keyGroupDesc"/>
		</td>
		
		<td style="padding-top: 5px">
           <ps:label key="cur_lang_trans" id="lbl_KEY_GROUP_TRANS" cssClass="boldLabel"/>
		</td>
		<td style="padding-top: 5px">
		   <ps:property value="translationSC.keyGroupTrans"/>
		</td>
	</tr>
	<tr>
		<td colspan="6">
			<div>
			<ps:property value=""/>
				<ps:url id="groupDependentURL"
					action="TranslationMaint_loadGroupDependentGridData?translationSC.keyGroupID=${translationSC.keyGroupID}" escapeAmp="false"
					namespace="/path">
					
				</ps:url>
				<psjg:grid id="groupDependentTbl_Id" href="%{groupDependentURL}"
					dataType="json" hiddengrid="false" pager="true" filter="true"
					gridModel="gridModel" rowNum="9" height="205" rowList="9,18,27,36"
					navigator="true" altRows="false" navigatorDelete="false"
					navigatorEdit="false" navigatorSearch="true"
					navigatorSearchOptions="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true}"
					sortable="true" editurl="abc" editinline="false" multiselect="false"
					navigatorAdd="false" navigatorRefresh="false" pagerButtons="true"
					rownumbers="false" autowidth="false" width="790"
					shrinkToFit="false" viewrecords="true">

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
				</psjg:grid>
			</div>
		</td>
	</tr>
</table>
