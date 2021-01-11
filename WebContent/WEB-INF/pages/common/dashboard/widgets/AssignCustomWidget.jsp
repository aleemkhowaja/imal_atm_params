<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<style>
input[name='lookupTxt_USER_ID']{
    text-transform: uppercase;
}
</style>
<ps:hidden name="portletCode" value="${portletCode}" id="pCode"></ps:hidden>
<ps:set name="user_already_selected_key" value="%{getEscText('user_already_selected_key')}"/>
<script type="text/javascript">
    var user_already_selected_key = "${user_already_selected_key}";
</script>
<table cellpadding="0" cellspacing="2">
<tr>
		<td style="font-size: 12px;color: #2779aa;font-weight: bold">
		   <ps:label key="widget_name_key"/>
		   <ps:property value="TITLE_KEY"/>
		</td>
</tr>
</table>
<ps:form id="assignPortletFrmId" useHiddenProps="true">
				<ps:url id="assignDefURL"
					action="portletUsrGrid_loadAssignPortletGrid" escapeAmp="false"
					namespace="/usrdetails">
					<ps:param name="portletCode" value="portletCode"></ps:param>
				</ps:url>
<div style="width: 100%">
<psjg:grid id="assignPortletGrid" 
		altRows="false" 
		addfunc="addPortletElt" 
		dataType="json" 
		delfunc="deletePortletElt"
		editurl="abc"
		editinline="true"
		filter="true" 
		gridModel="gridModel" 
		href="%{assignDefURL}" 
		navigator="true" 
		navigatorAdd="true"
		navigatorDelete="true"
		navigatorEdit="false" 
		navigatorRefresh="false" 
		navigatorSearch="true"
		pager="true" 
		pagerButtons="true"
		rowNum="7"
		sortable="false"
		shrinkToFit="false" 
		viewrecords="true"
		hiddengrid="false" onCompleteTopics="onAssignPortletGridComplete"
		navigatorSearchOptions="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true}"
		multiselect="false"
		rownumbers="false">

	<psjg:gridColumn id="USER_ID" colType="liveSearch"
	name="USER_ID" index="USER_ID" autoSearch="true"
	title="%{getText('User_Id_key')}" editable="true" sortable="true"
	search="true" paramList="" 
    beforeDepEvent="beforeUserDependency()"
    params="user_id:USER_ID,portletCode:pCode" 
    dependencySrc="${pageContext.request.contextPath}/pathdesktop/UserDependencyAction_userPortletDependency"
    dependency="usrVO.USER_ID:USER_ID"
	dataAction="${pageContext.request.contextPath}/pathdesktop/UsrLookupAction_portletLookup?portletCode=${portletCode}"
	resultList="USER_ID:USER_ID_lookuptxt"
	searchElement="USER_ID"/>
	</psjg:grid>
	
</div>
<ps:hidden name="updates" id="gridUpdates"></ps:hidden>
</ps:form>
<script type="text/javascript">
 	$("#assignPortletGrid").subscribe("onAssignPortletGridComplete",function(){
 		assignCust_makeSavedCellReadOnly();
	});
</script>