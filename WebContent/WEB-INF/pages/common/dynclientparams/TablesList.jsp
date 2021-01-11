<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>

<div id="dynCltPrmsTableDiv_Id_${_pageRef}" style="display: none">
	<ps:form id="dynCltPrmsTableForm_Id_${_pageRef}" useHiddenProps="true">

		<psjg:grid id="dynCltPrmsTableTbl_Id_${_pageRef}"
			caption="%{getText('tablesList_key')}" dataType="json"
			 hiddengrid="false" pager="true"
						filter="true" gridModel="gridModel" rowNum="8" height="120"
						rowList="8,16,24,32" navigator="true" altRows="false"
						navigatorDelete="false" navigatorEdit="false"
						navigatorSearch="true"
						navigatorSearchOptions="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true}"
						sortable="true" editurl="abc" editinline="true"
						multiselect="false" navigatorAdd="false" navigatorRefresh="false"
						pagerButtons="true" rownumbers="false"  autowidth="false"
						width="475" shrinkToFit="true" viewrecords="true"
			ondblclick="dynCltPrmsTableSelected()">

			<psjg:gridColumn id="GROUP_CODE" colType="NUMBER"
				name="GROUP_CODE" title="%{getText('Group_ID_key')}"
				index="GROUP_CODE" editable="false" sortable="true" search="true" />

			<psjg:gridColumn id="TABLE_NAME" colType="text" name="TABLE_NAME"
				title="%{getText('table_name_key')}" index="TABLE_NAME"
				editable="false" sortable="true" search="true" />
				
			<psjg:gridColumn id="TABLE_DESC" colType="text" name="TABLE_DESC"
				title="%{getText('table_desc_key')}" index="TABLE_DESC"
				editable="false" sortable="true" search="true" />

		</psjg:grid>
	</ps:form>
</div>

<script type="text/javascript">
$("#dynCltPrmsTableTbl_Id").unsubscribe("dynCltPrmsTableSelected");
$("#dynCltPrmsTableTbl_Id").subscribe("dynCltPrmsTableSelected",
		function(response, html) {
			dynCltPrmsTableSelected();
		});
</script>