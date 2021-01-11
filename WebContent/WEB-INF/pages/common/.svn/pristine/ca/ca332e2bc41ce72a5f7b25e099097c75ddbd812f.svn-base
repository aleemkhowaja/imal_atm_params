<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<input type="hidden" id="labeling_scr_LOVLoaded"/>
<input type="hidden" id="labeling_web_apps_only_filter" value="1"/>
<table>
	<tr>
		<td colspan="2">
			<div>
			<input type="hidden" id="lov_scr_customTrans"/>
				<ps:url id="lovTypeURL"
					action="TranslationMaint_loadLOVTypesGrid" escapeAmp="false"
					namespace="/path">
					<ps:param name="translationSC.lovTypeID" value="translationSC.lovTypeID"></ps:param>
	      			<ps:param name="translationSC.pageRef" value="translationSC.pageRef"></ps:param>
	      			<ps:param name="translationSC.appName" value="translationSC.appName"></ps:param>
	      			<ps:param name="translationSC.filters" value="translationSC.filters"></ps:param>
				</ps:url>

				<psjg:grid id="lovTypeTbl_Id" caption="%{getText('lov_det_key')}"
					dataType="json" hiddengrid="false"
					pager="true" filter="true" gridModel="gridModel" rowNum="8"
					height="205" rowList="8,16,24,32" navigator="true" altRows="false"
					navigatorDelete="false" navigatorEdit="false"
					navigatorSearch="true"
					navigatorSearchOptions="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true}"
					sortable="true" editurl="abc" editinline="true" multiselect="false"
					navigatorAdd="false" navigatorRefresh="false" pagerButtons="true"
					rownumbers="false" autowidth="false" width="875"
					shrinkToFit="false" viewrecords="true"
					ondblclick="lovTypeSelected()"
					disableEditableFocus="true">

					<psjg:gridColumn id="LOV_TYPE_ID" colType="number"
						name="LOV_TYPE_ID" title="%{getText('LOV_TYPE_ID_key')}"
						index="LOV_TYPE_ID" editable="false" sortable="true" search="true" mode="number"/>

					<psjg:gridColumn id="LOV_TYPE_DESCRIPTION" colType="text"
						name="LOV_TYPE_DESCRIPTION" title="%{getText('LOV_TYPE_DESC_key')}"
						index="LOV_TYPE_DESCRIPTION" editable="false" sortable="true" search="true" />
				</psjg:grid>


			</div>
		</td>
	</tr>
	<tr>
		<td>
			<jsp:include page="LOVTransList.jsp">
				<jsp:param value="V" name="parentGrid" />
			</jsp:include>
		</td>
	</tr>
</table>

<script type="text/javascript">
$("#lovTypeTbl_Id").unsubscribe("lovTypeSelected");
$("#lovTypeTbl_Id").subscribe("lovTypeSelected", function(response, html) {
	lovTypeSelected();
});

</script>
