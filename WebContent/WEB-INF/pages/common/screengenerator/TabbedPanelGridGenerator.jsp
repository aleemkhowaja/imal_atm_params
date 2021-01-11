<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>

<ps:hidden name="duplicated_id_key" value="%{getText('duplicated_id_key')}"></ps:hidden>
<ps:hidden name="invalid_input_key" value="%{getText('invalid_input_key')}"></ps:hidden>
<ps:hidden name="screenId"    value="${criteria.screenId}"></ps:hidden>
<ps:hidden name="elementId"    value="${criteria.elementId}"></ps:hidden>
<ps:hidden name="sourceData"    value="${criteria.sourceData}"></ps:hidden>

<ps:url id="tabbedPanelGridURL" action="tabbedPanelScreenAction_loadOptionsGrid" escapeAmp="false" namespace="/path/screenGenerator">
	<ps:param name="screenId"    value="criteria.screenId"></ps:param>
	<ps:param name="elementId"   value="criteria.elementId"></ps:param>
	<ps:param name="sourceData"  value="criteria.sourceData"></ps:param>
</ps:url>
<psjg:grid id="tabbedPanelGridId"
		altRows="false"
		addfunc="tabbedPanelGrid_addOption"
		dataType="json"
		delfunc="tabbedPanelGrid_delOption"
		editurl="abc"
		editinline="true"
		filter="true"
		gridModel="gridModel"
		href="%{tabbedPanelGridURL}"
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
		rownumbers="false"
		onGridCompleteTopics="tabbedPanlGrid_completeTopics">
	<psjg:gridColumn id="tabPropId" 
	                 colType="text"
	                 name="tabPropId" 
	                 required="true"
	                 index="tabPropId"
   	                 title="%{getText('tab_id_key')}" 
	                 editable="true" 
	                 editoptions="{dataEvents:[{type:'change', fn:function(){tabbedPanelGrid_actionTypeFormatter('tabPropId');}}]}"/>
	<psjg:gridColumn id="tabName" 
	                 colType="text"
	                 name="tabTitle" 
	                 required="true"
	                 index="tabTitle" 
   	                 title="%{getText('tab_title_key')}" 
	                 editable="true" 
	                 editoptions="{maxlength:'200'}"/>
	<psjg:gridColumn id="tabId" 
	                 colType="text"
	                 name="tabId" 
	                 required="false"
	                 index="tabId" 
	                 title="%{getText('tab_id_key')}"
	                 editable="true"
	                 hidden="true"
	                 editoptions="{maxlength:'200'}"/>	                 
	</psjg:grid>
	
<script type="text/javascript">
$(document).ready(function(){
	$("#tabbedPanelGridId").unsubscribe("tabbedPanlGrid_completeTopics");
	$("#tabbedPanelGridId").subscribe("tabbedPanlGrid_completeTopics",function(obj)
	{
		tabbedPanlGrid_onComplete();
	});
});
</script>