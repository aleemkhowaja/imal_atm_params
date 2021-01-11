<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<ps:hidden id="selectedUserId" name="selectedUserId"/>
<div id="theAllwdPortletsByuser">
<table>
<tr>
	<td>
		<ps:label key="userId" id="lbl_user" ></ps:label>
	</td>
	<td>
				<psj:livesearch name="userWorkspaceVO.USER_ID"
                      id="user_id" autoSearch="true"
                      actionName="${pageContext.request.contextPath}/pathdesktop/UserLookup_constructLookup"
                      searchElement="usrVO.USER_ID" resultList="USER_ID:lookuptxt_user_id"
                      dependencySrc="${pageContext.request.contextPath}/pathdesktop/UserDependencyAction_workspaceUserDependency"
                      parameter="user_id:lookuptxt_user_id" afterDepEvent="loadAllwdPortletsGrid('${param.theGrid}')"
                      dependency="lookuptxt_user_id:usrVO.USER_ID, selectedUserId:usrVO.USER_ID"
                 />
	</td>
</tr>
</table>
<ps:form id="usrAlwdPortletFrmId${param.theGrid}" useHiddenProps="true">
<psjg:grid id="usrAlwdPortletGrid${param.theGrid}" 
		altRows="true" 
		addfunc="addAlwdPortletElt('${param.theGrid}')" 
		dataType="json" 
		delfunc="deleteAlwdPortletElt('${param.theGrid}')"
		editurl="TTT"
		editinline="true"
		filter="true" 
		gridModel="gridModel" 
		href="" 
		navigator="true" 
		navigatorAdd="true"
		navigatorDelete="true"
		navigatorEdit="false" 
		navigatorRefresh="false" 
		navigatorSearch="false"
		pager="false" 
		pagerButtons="false"
		rowNum="6"
		sortable="true"
		height="170"
		autowidth="false" 
		width="550"
		shrinkToFit="false"
		viewrecords="true"
		onSelectRowTopics="prtltsOnRowSelTopic">
        		
		<psjg:gridColumn id="ABV_DESC_KEY" colType="liveSearch"
			name="ABV_DESC_KEY" index="ABV_DESC_KEY"
			title="%{getText('widget_name_key')}" editable="true" sortable="true"
			search="true" paramList=""
			dataAction="${pageContext.request.contextPath}/pathdesktop/DashboardPortalLookupAction_portletLookup"
			resultList="PORTLET_CODE:PORTLET_CODE"
			searchElement="PORTLET_CODE"
			dependencySrc="${pageContext.request.contextPath}/pathdesktop/DashboardPortalDependencyAction_DashboardPortletDependency"
			params="portletCode:PORTLET_CODE,USER_ID:selectedUserId"
			dependency="portletVO.ABV_DESC_KEY:ABV_DESC_KEY,portletVO.PORTLET_CODE:PORTLET_CODE,model.USER_ID:USER_ID,portletVO.TITLE_KEY:TITLE_KEY"/>
			
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