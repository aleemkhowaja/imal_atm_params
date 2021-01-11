<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<jsp:include page="/WEB-INF/pages/common/login/InfoBar.jsp" />


<div id="dynCltPrmsDataDiv_Id_${_pageRef}">
<ps:form id="dynCltPrmsDataForm_Id_${_pageRef}" useHiddenProps="true">

		<ps:hidden id="colsList" name="dynClientParamsSC.colsList" />
		<ps:hidden id="colsNames" name="dynClientParamsSC.colsNames" />
		<ps:hidden id="groupCode" name="dynClientParamsSC.groupCode" />
		<ps:hidden id="tableName" name="dynClientParamsSC.tableName" />

    	<ps:if test='${dynCltParOpType=="A"}'>    	
    		 <ps:set id="deleteAdd_${_pageRef}" value="false"></ps:set>
    	</ps:if>
    	<ps:else>
		   <ps:set id="deleteAdd_${_pageRef}" value="true"></ps:set>
		</ps:else>

<ps:url id="dynCltPrmsDataGridUrl_${_pageRef}" namespace="/path/dynClientParams"
	action="DynClientParamsMaint_loadDynClientGridData" escapeAmp="false">
			<ps:param name="dynClientParamsSC.groupCode" value="%{groupCode}"/>
		    <ps:param name="dynClientParamsSC.tableName" value="%{tableName}"/>
			<ps:param name="dynClientParamsSC.dynCltParOpType" value="%{dynCltParOpType}"/>
</ps:url>

<psjg:grid id="dynCltPrmsDataTbl_Id_${_pageRef}"
	dataType="json" href="%{dynCltPrmsDataGridUrl_${_pageRef}}"
	caption="%{getText('Detail_List_key')} - %{dynClientParamsSC.tableDesc}"
	hiddengrid="false" pager="true"
	filter="true" gridModel="gridModel" rowNum="8" height="180"
	rowList="8,16,24,32" navigator="true" altRows="false"
	navigatorEdit="false" navigatorSearch="true"
	navigatorSearchOptions="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true}"
	sortable="true" editurl="abc" editinline="true"
	multiselect="false" navigatorRefresh="false"
	navigatorAdd="%{deleteAdd_${_pageRef}}" navigatorDelete="%{deleteAdd_${_pageRef}}"
	pagerButtons="true" rownumbers="false" autowidth="false"
	width="955" shrinkToFit="true" viewrecords="true"
	addfunc="dynCltPrmsDataRowSelected('N')"
	delfunc="dynCltPrmsDataRowDeleted('D')"
	ondblclick="dynCltPrmsDataRowSelected('M')"
	onSelectRowTopics="dynCltPrmsDataRowClicked">
	
			<psjg:gridColumn id="RECORDSTATUS" name="RECORDSTATUS"
			index="RECORDSTATUS" title="%{getText('status_key')}" colType="text"
			editable="false" sortable="true" search="true" hidden="false"/>
			
	<ps:iterator value="colsList" status="stat" var="dnsc">
				<ps:if test="${dnsc.sysDynParamColumns.CONTROL_TYPE == 'D'}">
					<psjg:gridColumn name="${dnsc.sysDynParamColumns.COLUMN_NAME}"
						id="${dnsc.sysDynParamColumns.COLUMN_NAME}"
						title="%{getText('${dnsc.sysDynParamColumns.KEY_LABEL_CODE}')}"
						index="${dnsc.sysDynParamColumns.COLUMN_NAME}" colType="date"
						editable="false" sortable="true" search="true"/>
				</ps:if>
				<ps:else>
			<psjg:gridColumn id="${dnsc.sysDynParamColumns.COLUMN_NAME}" name="${dnsc.sysDynParamColumns.COLUMN_NAME}"
			index="${dnsc.sysDynParamColumns.COLUMN_NAME}" title="%{getText('${dnsc.sysDynParamColumns.KEY_LABEL_CODE}')}" colType="text"
			editable="false" sortable="true" search="true"/>
		</ps:else>
	</ps:iterator>
			<psjg:gridColumn id="DYNKEY" name="DYNKEY"
			index="DYNKEY" title="dyn key" colType="text"
			editable="false" sortable="true" search="true" hidden="true"/>
			<psjg:gridColumn id="VALUE_CODE" name="VALUE_CODE"
			index="VALUE_CODE" title="VALUE_CODE" colType="text"
			editable="false" sortable="true" search="true" hidden="true"/>
			
			
</psjg:grid>
</ps:form>
</div>


<script type="text/javascript">

$("#dynCltPrmsDataTbl_Id_"+_pageRef).unsubscribe("dynCltPrmsDataRowClicked");
$("#dynCltPrmsDataTbl_Id_"+_pageRef).subscribe("dynCltPrmsDataRowClicked",
		function(response, html) {
			dynCltPrmsDataRowClicked();
		});

$("#dynCltPrmsDataTbl_Id_"+_pageRef).unsubscribe("dynCltPrmsDataRowSelected");
$("#dynCltPrmsDataTbl_Id_"+_pageRef).subscribe("dynCltPrmsDataRowSelected",
		function(response, html) {
			dynCltPrmsDataRowSelected();
		});
</script>

