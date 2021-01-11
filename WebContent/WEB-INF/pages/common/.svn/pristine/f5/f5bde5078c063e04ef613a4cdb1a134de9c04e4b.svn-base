<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<ps:hidden id="selectedPcode" name="selectedPcode"/>
<ps:hidden id="pendingUserPortletValidation" name="pendingUserPortletValidation"/>
<ps:hidden type="hidden" id="pending_usr_validation_key_id" value="%{getText('pending_usr_validation_key')}"/>

<table>
<tr>
	<td>
		<ps:label key="widget_name_key" id="lbl_portlet" ></ps:label>
	</td>
	<td>
				<psj:livesearch name="portletCodeLV"
                      id="portletCodeLV" autoSearch="true"
                      actionName="${pageContext.request.contextPath}/pathdesktop/DashboardPortalLookupAction_portletLookup"
                      searchElement="PORTLET_CODE" resultList="PORTLET_CODE:selectedPcode"
                      dependencySrc="${pageContext.request.contextPath}/pathdesktop/DashboardPortalDependencyAction_DashboardPortletDependency"
                      parameter="portletCode:selectedPcode" afterDepEvent="loadAllwdPortletsGrid('${param.theGrid}')"
                      dependency="lookuptxt_portletCodeLV:%{getText('portletVO.TITLE_KEY')},selectedPcode:portletVO.PORTLET_CODE"
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
		
		<psjg:gridColumn id="USER_ID" colType="liveSearch"
			name="USER_ID" index="USER_ID"
			title="%{getText('User_Id_key')}" editable="true" sortable="true"
			search="true" paramList=""
			beforeDepEvent="switchPendingDep('true')"
			dataAction="${pageContext.request.contextPath}/pathdesktop/UserLookup_constructLookup"
			resultList="USER_ID:USER_ID_lookuptxt"
			searchElement="USER_ID"
			dependencySrc="${pageContext.request.contextPath}/pathdesktop/UserDependencyAction_userDependency"
			params="user_id:USER_ID_lookuptxt,portletCode:selectedPcode"
			dependency="usrVO.USER_ID:USER_ID_lookuptxt, model.portletCode:PORTLET_CODE" 
			afterDepEvent="switchPendingDep('false')"/>
			
		<psjg:gridColumn name="PORTLET_CODE" id="PORTLET_CODE" index="PORTLET_CODE" title="%{getText('widget_name_key')}" 
		colType="text" editable="false" sortable="false" hidden="true" search="true"></psjg:gridColumn>
		
</psjg:grid>


<ps:hidden name="updates" id="gridUpdates${param.theGrid}"></ps:hidden>
</ps:form>
<script type="text/javascript">
var pending_usr_validation_key= document.getElementById("pending_usr_validation_key_id").value;
	$("#usrAlwdPortletGrid${param.theGrid}").unsubscribe("prtltsOnRowSelTopic");
	$("#usrAlwdPortletGrid${param.theGrid}").subscribe("prtltsOnRowSelTopic",function(rowObj){allwdPrtltsCellChanged(rowObj);}) 
</script>
<script type="text/javascript">
$(document)
.ready(
		function() {					
			$("#lookuptxt_portletCodeLV").attr('readonly', true);
		});
</script>