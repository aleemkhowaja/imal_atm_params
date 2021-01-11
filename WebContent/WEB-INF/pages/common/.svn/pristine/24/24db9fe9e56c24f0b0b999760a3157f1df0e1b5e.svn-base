<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@taglib prefix="pt" uri="/path-toolbar-tags"%>

<ps:hidden id="dynCltParOpType" name="dynClientParamsSC.dynCltParOpType" />
<table>
	<tr>
		<td>
			<div id="dynCltPrmsGroupDiv_Id_${_pageRef}">
				<ps:form id="dynCltPrmsGroupForm_Id_${_pageRef}" useHiddenProps="true">
					<input type="hidden" id="interfaces_scr_customTrans_${_pageRef}" />
					<input type="hidden" id="interfaces_scr_dynCltPrmsGroupLoaded_${_pageRef}" />
					<ps:url id="dynCltPrmsGroupURL_${_pageRef}"
						action="DynClientParamsMaint_loadGroupsDetailsGrid"
						escapeAmp="false" namespace="/path/dynClientParams">

					</ps:url>

					<psjg:grid id="dynCltPrmsGroupTbl_Id_${_pageRef}"
						caption="%{getText('group.groupList')}" dataType="json"
						href="%{dynCltPrmsGroupURL_${_pageRef}}" hiddengrid="false" pager="true"
						filter="true" gridModel="gridModel" rowNum="8" height="120"
						rowList="8,16,24,32" navigator="true" altRows="false"
						navigatorDelete="false" navigatorEdit="false"
						navigatorSearch="true"
						navigatorSearchOptions="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true}"
						sortable="true" editurl="abc" editinline="true"
						multiselect="false" navigatorAdd="false" navigatorRefresh="false"
						pagerButtons="true" rownumbers="false"  autowidth="false"
						width="475" shrinkToFit="true" viewrecords="true"
						ondblclick="dynCltPrmsGroupSelected()" disableEditableFocus="true"
						exportExcel="false">

						<psjg:gridColumn id="GROUP_CODE" colType="NUMBER"
							name="GROUP_CODE" title="%{getText('Group_ID_key')}"
							index="GROUP_CODE" editable="false" sortable="true" search="true" />

						<psjg:gridColumn id="GROUP_DESC" colType="text" name="GROUP_DESC"
							title="%{getText('Group_Description_key')}" index="GROUP_DESC"
							editable="false" sortable="true" search="true" />
					</psjg:grid>

				</ps:form>
			</div>
		</td>
		<td>
			<jsp:include page="TablesList.jsp"/>
		</td>
	</tr>
	<tr>
		<td colspan="2">
		<div id="dynCltPrmDataListGrid_${_pageRef}"></div>
		</td>
	</tr>
	<tr>
		<td colspan="2">
			<div id="dynCltPrmsColsDiv_Id_${_pageRef}">
			</div>
		</td>
	</tr>
	<tr>
		<td colspan="2">
		<div id="dynClientDynamicParamsMapping_${_pageRef}">
		</div>
		</td>
	</tr>
</table>

<script type="text/javascript">
$("#dynCltPrmsGroupTbl_Id_"+_pageRef).unsubscribe("dynCltPrmsGroupSelected");
$("#dynCltPrmsGroupTbl_Id_"+_pageRef).subscribe("dynCltPrmsGroupSelected",
		function(response, html) {
			dynCltPrmsGroupSelected();
		});
_pageRef = "${_pageRef}";
</script>
