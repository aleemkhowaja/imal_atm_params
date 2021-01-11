<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@taglib prefix="pt" uri="/path-toolbar-tags"%>
<%@page import="com.path.bo.common.ConstantsCommon"%>
<input type="hidden" id="labeling_scr_chosenGrid"/>

<div id="lovTransDiv" style="display: none">
	<ps:form id="lovTransForm" useHiddenProps="true">


		<ps:hidden id="lovGridUpd" name="translationSC.transUpdate" />
		<ps:hidden id="lovTypeID" name="translationSC.lovTypeID" />

		<psjg:grid id="lovTransTbl_Id" caption="%{getText('lov_trans_key')}"
			dataType="json" hiddengrid="false" pager="true" filter="true"
			gridModel="gridModel" rowNum="6" rowList="6,12,18,24"
			navigator="true" altRows="false" navigatorDelete="false"
			navigatorEdit="false" navigatorSearch="false"
			navigatorSearchOptions="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true}"
			sortable="true" editurl="abc" editinline="true" multiselect="false"
			navigatorAdd="false" navigatorRefresh="false" pagerButtons="false"
			rownumbers="false" autowidth="false" width="875" viewrecords="false"
			onSelectRowTopics="transOnRowSelTopic">

			<psjg:gridColumn id="LOV_TYPE_ID" colType="number"
				name="sysParamLOVTransVO.LOV_TYPE_ID"
				title="%{getText('LOV_TYPE_ID')}" index="LOV_TYPE_ID" hidden="true" />
				
			<psjg:gridColumn id="VALUE_CODE" colType="text"
				name="sysParamLOVTransVO.VALUE_CODE"
				title="%{getText('VALUE_CODE_key')}" index="VALUE_CODE" hidden="false" />

			<psjg:gridColumn id="LANG_CODE" colType="text"
				name="sysParamLOVTransVO.LANG_CODE"
				title="%{getText('Language_key')}" index="LANG_CODE" hidden="true" />

			<psjg:gridColumn id="transGrid_langDesc" name="langDesc" index="transGrid_langDesc"
				title="%{getText('Language_key')}" editable="false" sortable="false"
				edittype="text" colType="text" search="true"/>

			<psjg:gridColumn id="VALUE_DESC" colType="text" name="sysParamLOVTransVO.VALUE_DESC"
				title="%{getText('lov_trans_key')}" index="VALUE_DESC" editable="true"
				sortable="true" search="true"/>

			<psjg:gridColumn id="LOV_ORDER" colType="number"
				name="sysParamLOVTransVO.LOV_ORDER"
				title="%{getText('LOV_ORDER')}" index="LOV_ORDER" hidden="true" />
		</psjg:grid>

	</ps:form>
</div>
<script type="text/javascript">
	$.subscribe("transOnRowSelTopic",function(rowObj){transGridRowSelect(rowObj);})
	
</script>