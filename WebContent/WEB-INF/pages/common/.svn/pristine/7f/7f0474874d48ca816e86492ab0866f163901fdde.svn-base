<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@taglib prefix="pt" uri="/path-toolbar-tags"%>


<table>
	<tr>
		<td colspan="6">
			<div>
			<ps:property value=""/>
				<ps:url id="loggedInUsersOverPassURL"
					action="portalDashboardListAction_loadLoggedInUsersGridData" escapeAmp="false"
					namespace="/pathdesktop">
					
				</ps:url>
				<psjg:grid id="loggedInUsersOverPassTbl_Id" href="%{loggedInUsersOverPassURL}"
					dataType="json" hiddengrid="false" pager="true" filter="true"
					gridModel="gridModel" rowNum="9" height="205" rowList="9,18,27,36"
					navigator="true" altRows="false" navigatorDelete="false"
					navigatorEdit="false" navigatorSearch="true"
					navigatorSearchOptions="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true}"
					sortable="true" editurl="abc" editinline="false" multiselect="false"
					navigatorAdd="false" navigatorRefresh="false" pagerButtons="true"
					rownumbers="false" autowidth="false" width="620"
					shrinkToFit="false" viewrecords="true">

					<psjg:gridColumn id="USER_ID" colType="text" width="200"
						name="USER_ID" title="%{getText('User_ID_key')}"
						index="USER_ID" editable="false" sortable="true" search="true" />

					<psjg:gridColumn id="LONG_NAME_ENG" colType="text" width="200" name="LONG_NAME_ENG"
						title="%{getText('User_Name_key')}" index="LONG_NAME_ENG"
						editable="false" sortable="true" search="true" />

					<psjg:gridColumn id="PRIVILEGE_LEVEL_DESC" colType="text" width="200"
						name="PRIVILEGE_LEVEL_DESC" title="%{getText('Privilege_Level_key')}"
						index="PRIVILEGE_LEVEL_DESC" editable="false" sortable="true" search="true" />

				</psjg:grid>
			</div>
		</td>
	</tr>
</table>
