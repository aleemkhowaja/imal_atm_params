<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<jsp:include page="/WEB-INF/pages/common/login/InfoBar.jsp" />

	<ps:form id="dynCltPrmsColsForm_Id_${_pageRef}" useHiddenProps="true">

		<ps:hidden id="groupCode" name="dynClientParamsSC.groupCode" />
		<ps:hidden id="tableName" name="dynClientParamsSC.tableName" />
		<ps:hidden id="dynCltParOpType" name="dynClientParamsSC.dynCltParOpType" />
		<ps:hidden id="paramsGridUpd_${_pageRef}" name="dynClientParamsSC.dynCltParamsGridUpd" />
		<ps:hidden id="dynCltparamsPageRef" name="dynCltparamsPageRef" />
		<ps:hidden id="dynCltparamsSelectedApp" value="5" name="dynCltparamsSelectedApp" />
		<ps:hidden id="dynCltparamsSelectedAppName" value="IMAL" name="dynCltparamsSelectedAppName" />
		<ps:hidden id="selectedColumnName" name="dynClientParamsSC.valueField" />

		<ps:url id="dynClientColsGridURL_${_pageRef}" namespace="/path/dynClientParams"
			action="DynClientParamsMaint_loadDynClientColsGrid"	escapeAmp="false">
			<ps:param name="dynClientParamsSC.groupCode" value="%{groupCode}"/>
		    <ps:param name="dynClientParamsSC.tableName" value="%{tableName}"/>
		    <ps:param name="dynClientParamsSC.dynCltParOpType" value="%{dynCltParOpType}"/>
		</ps:url>
		<psjg:grid id="dynCltPrmsColsTbl_Id_${_pageRef}" href="%{dynClientColsGridURL_${_pageRef}}"
			caption="%{getText('Dynamic_columns_key')} - %{dynClientParamsSC.tableDesc}" dataType="json"
			hiddengrid="false" pager="true" filter="true" gridModel="gridModel"
			rowNum="8" height="180" rowList="8,16,24,32" navigator="true"
			altRows="false" navigatorDelete="true" navigatorEdit="false"
			navigatorSearch="true"
			navigatorSearchOptions="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true}"
			sortable="true" editurl="abc" editinline="true" multiselect="false"
			navigatorAdd="true" navigatorRefresh="false" pagerButtons="true"
			rownumbers="false" autowidth="false" width="955" shrinkToFit="true"
			viewrecords="true"
			onSelectRowTopics="dynCltPrmsColsTblOnRowSelect"
			addfunc="dynCltPrmsColsNewRowClicked" delfunc="dynCltPrmsColsDeleteClicked">

			<psjg:gridColumn id="GROUP_CODE" colType="NUMBER"
				name="sysDynParamColumns.GROUP_CODE" hidden = "true"
				title="%{getText('Group_ID_key')}" index="GROUP_CODE"
				editable="false" sortable="true" search="true" />

			<psjg:gridColumn id="TABLE_NAME" colType="text"
				name="sysDynParamColumns.TABLE_NAME"
				title="%{getText('TABLE_NAME')}" hidden="true" index="TABLE_NAME"
				editable="false" sortable="true" search="true" />
			
			<psjg:gridColumn id="COLUMN_NAME" index="COLUMN_NAME" required="true"
				name="sysDynParamColumns.COLUMN_NAME"	title="%{getText('col_name_key')}" colType="select" hidden="false"
				editable="true" sortable="true" search="true"
				editoptions="{ value:function() {  return dynClientParamLoadCombo('${pageContext.request.contextPath}/path/dynClientParams/DynClientParamsMaint_loadColumnsList','availableColumns', 'code', 'descValue');}
				,dataEvents: [{ type: 'change', fn: function() {dynCltColumnNameChanged() } }]}"
				edittype="select" />
			
			<psjg:gridColumn id="ColsList_CONTROL_TYPE" colType="text" title="%{getText('RA_CTRL')}"
				name="sysDynParamColumns.CONTROL_TYPE" hidden="true" index="ColsList_CONTROL_TYPE"
				editable="false" sortable="true" search="true" />
				
						<psjg:gridColumn loadOnce="false"  id="ColsList_CONTROL_DESC" index="ColsList_CONTROL_DESC" required="true"
				name="controlDesc"	title="%{getText('RA_CTRL')}" colType="select" hidden="false"
				editable="true" sortable="true" search="true"  
				editoptions="{value:function() { return dynClientParamLoadCombo('${pageContext.request.contextPath}/path/dynClientParams/DynClientParamsMaint_loadControlTypeSelect','controlTypeSelect', 'code', 'descValue','true');}
				,dataEvents: [{ type: 'change', fn: function() {dynCltControlTypeChanged() } }]}"
				edittype="select" />


			<psjg:gridColumn id="LOOKUP_EXPRESSION" colType="text"
				name="sysDynParamColumns.LOOKUP_EXPRESSION" edittype="textarea"
				title="%{getText('lookup_exp_key')}" index="LOOKUP_EXPRESSION"
				editable="true" sortable="false" search="true" />

			<psjg:gridColumn id="VALUE_FIELD" colType="text"
				name="sysDynParamColumns.VALUE_FIELD"
				title="%{getText('value_field_key')}" index="VALUE_FIELD"
				editable="true" sortable="true" search="true" />

			<psjg:gridColumn id="DISPLAY_FIELD" colType="text"
				name="sysDynParamColumns.DISPLAY_FIELD"
				title="%{getText('disp_field_key')}" index="DISPLAY_FIELD"
				editable="true" sortable="true" search="true" />


			<psjg:gridColumn id="COMBO_LIST" colType="text"
				name="sysDynParamColumns.COMBO_LIST" formatter="dynCltPrmsFormatComboList"
				title="%{getText('combo_list_key')}" index="COMBO_LIST" editable="true"
				sortable="true" search="true" />



			<psjg:gridColumn id="KEY_LABEL_CODE" colType="liveSearch"
				name="sysDynParamColumns.KEY_LABEL_CODE" index="KEY_LABEL_CODE"
				title="%{getText('lbl_code_key')}" editable="true" sortable="true"
				search="true" paramList="translationSC.appName:dynCltparamsSelectedAppName,translationSC.selectedApp:dynCltparamsSelectedApp"
				dataAction="${pageContext.request.contextPath}/pathdesktop/TranslationLookup_labelKeyLookup"
				resultList="sysParamKeyLabelVO.KEY_LABEL_CODE:sysDynParamColumns.KEY_LABEL_CODE_lookuptxt"
				searchElement="KEY_LABEL_CODE"
				dependencySrc="${pageContext.request.contextPath}/pathdesktop/TranslationDependencyAction_labelKeyDep"
				params="translationSC.labelKey:sysDynParamColumns.KEY_LABEL_CODE_lookuptxt"
				dependency="translationCO.sysParamKeyLabelVO.KEY_LABEL_CODE:sysDynParamColumns.KEY_LABEL_CODE_lookuptxt" />


			<psjg:gridColumn id="PK_YN" colType="checkbox" formatter="checkbox"
				edittype="checkbox" align="center" name="sysDynParamColumns.PK_YN"
				title="%{getText('primary_key_key')}" index="PK_YN" editable="true"
				sortable="true" search="true" editoptions="{value:'Y:N'}" />


		</psjg:grid>

	</ps:form>

<script type="text/javascript">
$("#dynCltPrmsColsTbl_Id_"+_pageRef).unsubscribe("dynCltPrmsColsTblOnRowSelect");
$("#dynCltPrmsColsTbl_Id_"+_pageRef).subscribe("dynCltPrmsColsTblOnRowSelect",
		function(rowObj) {
			dynCltPrmsColsTblOnRowSelect(rowObj);
		});
</script>