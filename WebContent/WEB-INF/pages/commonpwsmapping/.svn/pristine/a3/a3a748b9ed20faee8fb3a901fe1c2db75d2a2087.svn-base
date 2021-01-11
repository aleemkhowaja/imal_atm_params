<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>

<tr role="row" class="ui-subgrid">
	<td colspan="1">&nbsp;</td>
	<td class="ui-widget-content subgrid-cell"><span class="ui-icon ui-icon-carat-1-sw"></span>
	</td>
	<td colspan="5" class="ui-widget-content subgrid-data">
	
<ps:url id="webServiceGuiHashMapSubGridUrl" action="WebServiceExplorerList_loadHashMapSubGridInfo" namespace="/path/common/WebserviceExplorer" escapeAmp="false">
	<ps:param name="iv_crud" value="iv_crud" />
	<ps:param name="_pageRef" value="_pageRef" />
	<ps:param name="webServiceExplorerCO.parentRowId" value="webServiceExplorerCO.parentRowId" />
	<ps:param name="webServiceExplorerCO.requestResponseCO.fieldType" value="webServiceExplorerCO.requestResponseCO.fieldType" />	
	<ps:param name="webServiceExplorerCO.requestResponseCO.fieldName" value="webServiceExplorerCO.requestResponseCO.fieldName" />	
	<ps:param name="webServiceExplorerCO.webServiceExplorerConfigVO.CONFIG_ID" value="webServiceExplorerCO.webServiceExplorerConfigVO.CONFIG_ID" />	
</ps:url>

	<psjg:grid id="${hashMapGridId}"
					caption="" 
					href="%{webServiceGuiHashMapSubGridUrl}" 
					pagerButtons="true" 
					altRows="true"
					dataType="json" 
					filter="false"
					gridModel="gridModel" 
					height="130"
					navigator="true" 
					navigatorAdd="true"
					navigatorDelete="true" 
					navigatorEdit="false"
					navigatorRefresh="false"
					navigatorSearch="false"
					navigatorSearchOptions="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true,sopt:['eq','ne','lt','gt']}"
					pager="true" 
					shrinkToFit="true"
					sortable="false" 
					viewrecords="true"
					multiselect="true" 
					editinline="true"
					onEditInlineBeforeTopics="onHashGridRowSelTopic"
					onGridCompleteTopics ="onHashGridGridCompleteFn"   
					editurl=" " 
					addfunc="addHashMapSubGridRows(this)" 
					delfunc="deleteHashMapSubGridRows">
	
		<psjg:gridColumn id="key_${_pageRef}"
				title="%{getText('key_key')}" index="KEY" 
				colType="text"
				name="fieldName"
				editable="true" 
				sortable="false" 
				search="false"
				required="false"
				/>
				
		<psjg:gridColumn id="value_${_pageRef}"
				title="%{getText('value_key')}" index="VALUE" 
				colType="text"
				name="value"
				editable="true" 
				sortable="false" 
				search="false"
				required="false"
				/>
			
</psjg:grid>

</td>
</tr>

<script type="text/javascript">
	//	$.struts2_jquery.require("WebServiceExplorerHashGridList.js" ,null,jQuery.contextPath+"/path/js/proc/webserviceexplorer/");	

		$("#${hashMapGridId}").subscribe("onHashGridGridCompleteFn",function(event,data){
			onHashGridGridCompleteFn(event,data);});
</script>