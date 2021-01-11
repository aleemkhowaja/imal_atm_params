<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<ps:hidden id="selectedUserId" name="selectedUserId"/>
<div id="theAllwdPortletsByuser">
<table>
<tr>
	<td>
		<ps:label key="userId" id="lbl_userW" ></ps:label>
	</td>
	<td>
				<psj:livesearch name="userWorkspaceVO.USER_ID"
                      id="user_idW" autoSearch="true"
                      actionName="${pageContext.request.contextPath}/pathdesktop/UserLookup_constructLookup"
                      searchElement="usrVO.USER_ID" resultList="USER_ID:lookuptxt_user_idW"
                      dependencySrc="${pageContext.request.contextPath}/pathdesktop/UserDependencyAction_workspaceUserDependency"
                      parameter="user_id:lookuptxt_user_idW" afterDepEvent="loadAllwdPortletsGrid('${param.theGrid}')"
                      dependency="lookuptxt_user_idW:usrVO.USER_ID, selectedUserId:usrVO.USER_ID"
                 />
	</td>
</tr>
</table>
<ps:form id="usrAlwdPortletFrmId${param.theGrid}" useHiddenProps="true">
<psjg:grid id="usrAlwdPortletGrid${param.theGrid}" 
		altRows="true" 
		dataType="json" 
		delfunc="deleteAlwdPortletElt('${param.theGrid}')"
		editurl="TTT"
		editinline="true"
		filter="true" 
		gridModel="gridModel" 
		href="" 
		navigator="true"
		navigatorAdd="false"
		navigatorDelete="true"
		navigatorRefresh="false" 
		navigatorSearch="false"
		navigatorEdit="false"
		pager="true" 
		pagerButtons="true"
		rowNum="6"
		sortable="true"
		height="170"
		autowidth="false" 
		width="550"
		shrinkToFit="false"
		viewrecords="true"
		onSelectRowTopics="prtltsOnRowSelTopic">
        		
		<psjg:gridColumn name="ABV_DESC_KEY" id="ABV_DESC_KEY" index="ABV_DESC_KEY" title="%{getText('widget_name_key')}" 
		colType="text" editable="false" sortable="false" hidden="false" search="true"></psjg:gridColumn>
		
		<psjg:gridColumn name="PORTLET_CODE" id="PORTLET_CODE" index="PORTLET_CODE" title="%{getText('PORTLET_CODE')}" 
		colType="text" editable="false" sortable="false" hidden="true" search="true"></psjg:gridColumn>
			
		<psjg:gridColumn name="USER_ID" id="USER_ID" index="USER_ID" title="%{getText('USER_ID')}" 
		colType="text" editable="false" sortable="false" hidden="true" search="true"></psjg:gridColumn>
		
		<psjg:gridColumn name="TITLE_KEY" id="TITLE_KEY" index="TITLE_KEY" title="%{getText('title_key')}" 
		colType="text" editable="false" sortable="false" hidden="false" search="true"></psjg:gridColumn>
</psjg:grid>

<ps:hidden name="updates" id="gridUpdates${param.theGrid}"></ps:hidden>
</ps:form>
</div>

<script type="text/javascript">
	$("#usrAlwdPortletGrid${param.theGrid}").unsubscribe("prtltsOnRowSelTopic");
	$("#usrAlwdPortletGrid${param.theGrid}").subscribe("prtltsOnRowSelTopic",function(rowObj){allwdPrtltsCellChanged(rowObj);}) 
</script>