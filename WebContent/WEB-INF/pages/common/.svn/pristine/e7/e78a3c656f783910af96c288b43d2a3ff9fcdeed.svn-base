<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@taglib prefix="pt" uri="/path-toolbar-tags"%>
<%@page import="com.path.bo.common.ConstantsCommon"%>
<input type="hidden" id="labeling_scr_chosenGrid"/>


<div id="labelTransDiv${param.parentGrid}" style="display: none">
	<ps:form id="transLabelForm${param.parentGrid}" useHiddenProps="true">

		<ps:hidden id="transGridUpd" name="translationSC.transUpdate" />
		<ps:hidden id="transAppName" name="translationSC.appName" />
		<ps:hidden id="transPageRef" name="translationSC.pageRef" />
		<ps:hidden id="transKeyLabelCode" name="translationSC.keyLabelCode" />


		<psjg:grid id="labelTransTbl_Id${param.parentGrid}" caption="%{getText('lbl_trans_key')}"
			dataType="json" hiddengrid="false" pager="true" filter="true"
			gridModel="gridModel" rowNum="6" rowList="6,12,18,24"
			navigator="true" altRows="false" navigatorDelete="true"
			navigatorEdit="false" navigatorSearch="false"
			navigatorSearchOptions="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true}"
			sortable="true" editurl="abc" editinline="true" multiselect="false"
			navigatorAdd="true" navigatorRefresh="false" pagerButtons="false"
			rownumbers="false" autowidth="false" width="890" viewrecords="false"
			onSelectRowTopics="transOnRowSelTopic"
			addfunc="onNewLabelTransClicked" delfunc="delLabelKeyTransRow">

			<psjg:gridColumn id="APP_NAME" colType="text"
				name="sysParamKeyLabelTransVO.APP_NAME"
				title="%{getText('appName')}" index="APP_NAME" hidden="true" />

			<psjg:gridColumn id="PROG_REF" colType="text"
				name="sysParamKeyLabelTransVO.PROG_REF"
				title="%{getText('progRef')}" index="PROG_REF" hidden="true" />

			<psjg:gridColumn id="KEY_LABEL_CODE" colType="text"
				name="sysParamKeyLabelTransVO.KEY_LABEL_CODE"
				title="%{getText('lbl_code_key')}" index="KEY_LABEL_CODE"
				hidden="true" />

			<psjg:gridColumn id="LANG_CODE" colType="text"
				name="sysParamKeyLabelTransVO.LANG_CODE"
				title="%{getText('Language_key')}" index="LANG_CODE" hidden="true" />

			<psjg:gridColumn id="transGrid_langDesc" name="langDesc" index="transGrid_langDesc"
				title="%{getText('Language_key')}" editable="true" sortable="false"
				edittype="select" colType="select"
				editoptions="{value:function() {  return loadCombo('${pageContext.request.contextPath}/path/customization/CustomizationMaint_loadLanguageSelect','languageSelect', 'code', 'descValue');}
					,dataEvents: [{ type: 'change', fn: function() {labelLangChanged() } }]}"
				search="true"/>

			<psjg:gridColumn id="VALUE_TRANS" colType="text" width="180"
				name="lblValueTrans" title="%{getText('trans_key')}"
				index="VALUE_TRANS" editable="true" sortable="true" search="true"/>

		</psjg:grid>

	</ps:form>
	
</div>

<div id="groupTransDiv${param.parentGrid}" style="display: none">
	<ps:form id="transGroupForm${param.parentGrid}" useHiddenProps="true">


		<ps:hidden id="groupGridUpd${param.parentGrid}" name="translationSC.transUpdate" />
		<ps:hidden id="groupKeyGroupID${param.parentGrid}" name="translationSC.keyGroupID" />
		<ps:hidden id="groupAppName" name="translationSC.appName" />
		<ps:hidden id="groupPageRef" name="translationSC.pageRef" />

		<psjg:grid id="groupTransTbl_Id${param.parentGrid}" caption="%{getText('grp_trans_key')}"
			dataType="json" hiddengrid="false" pager="true" filter="true"
			gridModel="gridModel" rowNum="6" rowList="6,12,18,24"
			navigator="true" altRows="false" navigatorDelete="true"
			navigatorEdit="false" navigatorSearch="false"
			navigatorSearchOptions="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true}"
			sortable="true" editurl="abc" editinline="true" multiselect="false"
			navigatorAdd="true" navigatorRefresh="false" pagerButtons="false"
			rownumbers="false" autowidth="false" width="890" viewrecords="false"
			onSelectRowTopics="transOnRowSelTopic"
			addfunc="onNewGroupTransClicked" delfunc="delGroupTransRow">

			<psjg:gridColumn id="KEY_GROUP_ID" colType="text"
				name="sysParamKeyGroupTransVO.KEY_GROUP_ID"
				title="%{getText('grp_id_key')}" index="KEY_GROUP_ID" hidden="true" />

			<psjg:gridColumn id="LANG_CODE" colType="text"
				name="sysParamKeyGroupTransVO.LANG_CODE"
				title="%{getText('Language_key')}" index="LANG_CODE" hidden="true" />

			<psjg:gridColumn id="transGrid_langDesc" name="langDesc" index="transGrid_langDesc"
				title="%{getText('Language_key')}" editable="true" sortable="false"
				edittype="select" colType="select"
				editoptions="{value:function() {  return loadCombo('${pageContext.request.contextPath}/path/customization/CustomizationMaint_loadLanguageSelect','languageSelect', 'code', 'descValue');}
					,dataEvents: [{ type: 'change', fn: function() {groupLangChanged() } }]}"
				search="true"/>

			<psjg:gridColumn id="VALUE_TRANS" colType="text" name="grpValueTrans"
				title="%{getText('trans_key')}" index="VALUE_TRANS" editable="true"
				sortable="true" search="true" 
				dependency="prefTrans:VALUE_TRANS"/>

		</psjg:grid>

	</ps:form>
</div>
<table cellpadding="0" cellspacing="0" id="lableing_referenceButtonTbl" style="display:none"><tr>
	<% if(ConstantsCommon.ENABLE_REFERENCE_DB_TRANS_PUSH == 1) 
	{%>
	<td><psj:submit button="true" onclick="labling_pushReferenceDbDetails()" type="button">
		Send Ref DB
	</psj:submit>
	</td>
	<td>
	<psj:submit button="true" onclick="labling_checkReferenceDbDetails()" type="button">
		Check Ref DB
	</psj:submit>
	</td>
	<%} %>
	</tr></table>
<script type="text/javascript">
	$.subscribe("transOnRowSelTopic",function(rowObj){transGridRowSelect(rowObj);}) 
</script>