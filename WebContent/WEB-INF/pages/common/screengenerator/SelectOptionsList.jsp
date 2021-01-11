<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<ps:hidden name="screenId"    value="${criteria.screenId}"></ps:hidden>
<ps:hidden name="elementId"   value="${criteria.elementId}"></ps:hidden>
<ps:hidden name="optionsData" value="${criteria.optionsData}"></ps:hidden>
<ps:url id="optionsGridURL"
	action="optionsScreenAction_loadOptionsGrid" escapeAmp="false"
	namespace="/path/screenGenerator">
	<ps:param name="screenId"    value="criteria.screenId"></ps:param>
	<ps:param name="elementId"   value="criteria.elementId"></ps:param>
	<ps:param name="optionsData" value="criteria.optionsData"></ps:param>
</ps:url>
<psjg:grid id="optionsGridId"
		altRows="false"
		addfunc="optionsGrid_addOption"
		dataType="json"
		delfunc="optionsGrid_delOption"
		editurl="abc"
		editinline="true"
		filter="true"
		gridModel="gridModel"
		href="%{optionsGridURL}"
		navigator="true"
		navigatorAdd="true"
		navigatorDelete="true"
		navigatorEdit="false"
		navigatorRefresh="false"
		navigatorSearch="false"
		pager="true"
		pagerButtons="false"
		rowNum="7"
		sortable="false"
		shrinkToFit="true" 
		viewrecords="true"
		hiddengrid="false"
		multiselect="false"
		onchange="optionGrid_checkOptionsData()"
		rownumbers="false">
	<psjg:gridColumn id="code" 
	                 colType="text"
	                 name="code"
	                 index="code" required="true"
	                 title="%{getText('code_key')}" 
	                 editable="true" editoptions="{maxlength:'100'}"/>
	<psjg:gridColumn id="descValue" 
	                 colType="text"
	                 name="descValue" required="true"
	                 index="descValue" 
	                 title="%{getText('description_key')}" 
	                 editable="true" editoptions="{maxlength:'200'}"/>
	<psjg:gridColumn id="defaultValue" 
	                 colType="checkbox" 
	                 formatter="checkbox"
	                 edittype="checkbox" 
	                 align="center"
	                 editoptions="{value:'1:0', dataEvents: [{ type: 'change', fn: function(e) {optionGrid_onDefaultValueChange(e);}}]}"
	                 name="defaultValue" required="true"
	                 index="defaultValue" 
	                 title="%{getText('default_value_key')}" 
	                 editable="true"/>
	</psjg:grid>