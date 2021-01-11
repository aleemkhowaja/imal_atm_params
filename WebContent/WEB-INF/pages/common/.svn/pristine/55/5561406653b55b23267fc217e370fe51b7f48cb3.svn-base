<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@taglib prefix="pt" uri="/path-toolbar-tags"%>
<table>
	<tr>
		<td colspan="6">
			<div>
			<ps:property value=""/>
				<ps:url id="unstldTransCashBalURL" 
					action="portalDashboardListAction_unstldTransCashBalGridData" escapeAmp="false"
					namespace="/pathdesktop">
				</ps:url>
				<psjg:grid id="unstldTransCashBalTbl_Id" 
				           href="%{unstldTransCashBalURL}"
					       dataType="json" 
					       hiddengrid="false" 
					       pager="true" 
					       filter="true"
					       gridModel="gridModel" 
					       rowNum="9" 
					       rowList="9,18,27,36"
					       navigator="true" 
					       altRows="false" 
					       navigatorDelete="false"
					       navigatorEdit="false" 
					       navigatorSearch="true"
					       navigatorAdd="false" 
					       navigatorRefresh="false" 
					       navigatorSearchOptions="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true}"
					       pagerButtons="true"
					       sortable="true" 
					       editurl="abc" 
					       editinline="false" 
					       multiselect="false"
					       rownumbers="false" 
					       autowidth="false" 
					       width="620"
					       height="205" 
					       shrinkToFit="false" viewrecords="true">
					<psjg:gridColumn id="USER_ID"              colType="text" name="USER_ID"              index="USER_ID"              width="200" title="%{getText('User_ID_key')}"         editable="false" sortable="true" search="true" />
					<psjg:gridColumn id="USR_FULL_NAME"        colType="text" name="USR_FULL_NAME"        index="USR_FULL_NAME"        width="200" title="%{getText('User_Name_key')}"       editable="false" sortable="true" search="true" />
					<psjg:gridColumn id="PRIVILEGE_LEVEL_DESC" colType="text" name="PRIVILEGE_LEVEL_DESC" index="PRIVILEGE_LEVEL_DESC" width="200" title="%{getText('Privilege_Level_key')}" editable="false" sortable="true" search="true" />
				</psjg:grid>
			</div>
		</td>
	</tr>
</table>
