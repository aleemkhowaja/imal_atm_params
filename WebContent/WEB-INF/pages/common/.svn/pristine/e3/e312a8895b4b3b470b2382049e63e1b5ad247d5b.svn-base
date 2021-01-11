<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@taglib prefix="pt" uri="/path-toolbar-tags"%>


<table>
	<tr>
		<td>
			<div>

				<input type="hidden" id="labeling_scr_groupDefLoaded"/>
				<ps:url id="groupDefURL"
					action="TranslationMaint_loadGroupDetailsGrid" escapeAmp="false"
					namespace="/path">
				</ps:url>
				<psjg:grid id="groupDefTbl_Id" caption="%{getText('grp_det_key')}"
					dataType="json" hiddengrid="false" pager="true" filter="true"
					gridModel="gridModel" rowNum="9" height="205" rowList="9,18,27,36"
					navigator="true" altRows="false" navigatorDelete="true"
					navigatorEdit="false" navigatorSearch="true"
					navigatorSearchOptions="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true}"
					sortable="true" editurl="abc" editinline="true" multiselect="false"
					navigatorAdd="true" navigatorRefresh="false" pagerButtons="true"
					rownumbers="false" autowidth="false" width="890"
					shrinkToFit="false" viewrecords="true"
					ondblclick="keyGroupSelected()" addfunc="onNewKeyGroupClicked"
					delfunc="deleteKeyGroupClicked" onSelectRowTopics="groupDepGrpSelected">

					<psjg:gridColumn id="KEY_GROUP_ID" colType="number"
						name="sysParamKeyGroupVO.KEY_GROUP_ID"
						title="%{getText('grp_id_key')}" index="KEY_GROUP_ID" width="200"
						editable="false" sortable="true" search="true" mode="number"/>
					<psjg:gridColumn id="KEY_GROUP_DESC" colType="text"
						name="sysParamKeyGroupVO.KEY_GROUP_DESC"
						title="%{getText('grp_desc_key')}" index="KEY_GROUP_DESC"  width="300"
						editable="false" sortable="true" search="true" />

					<psjg:gridColumn id="prefTrans" colType="text" name="prefTrans"
						title="%{getText('cur_lang_trans')}" index="prefTrans"  width="350"
						editable="false" sortable="true" search="true" />

				</psjg:grid>


			</div>
		</td>
	</tr>
	<tr>
		<td>
			<jsp:include page="TransList.jsp">
				<jsp:param value="G" name="parentGrid" />
			</jsp:include>
		</td>
	</tr>
</table>

<script type="text/javascript">
$("#groupDefTbl_Id").unsubscribe("keyGroupSelected");
$("#groupDefTbl_Id").subscribe("keyGroupSelected", function(response, html) {
	keyGroupSelected();
});
$("#groupDefTbl_Id").unsubscribe("groupDepGrpSelected");
$("#groupDefTbl_Id").subscribe("groupDepGrpSelected", function(response, html) {
	groupDependentGroupsClicked();
});

</script>
