<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<style>
input#lookuptxt_user_id{
    text-transform: uppercase;
}
</style>
<%
   String treeGridParams = "";
   String profType = (String) request.getAttribute("profType");;
   if(profType.equals("1"))
   {
       treeGridParams = "userId:lookuptxt_user_id,profileId:lookuptxt_role_name";
   }
   else
   {
       treeGridParams = "userId:lookuptxt_user_id";
   }
   request.setAttribute("treeGridParams",treeGridParams);
%>

<table cellpadding="0" cellspacing="2">
<tr>
	<td>
		<ps:label key="userId" id="lbl_user" ></ps:label>
	</td>
	<td>
	            <ps:hidden id="userPrevId" name="userPrevId"/>
				<psj:livesearch name="userWorkspaceVO.USER_ID" 
                      id="user_id" autoSearch="true"
                      actionName="${pageContext.request.contextPath}/pathdesktop/UserLookup_constructLookup" 
                      searchElement="USER_ID" resultList="USER_ID:lookuptxt_user_id"
                      dependencySrc="${pageContext.request.contextPath}/pathdesktop/UserDependencyAction_workspaceUserDependency"
                      parameter="user_id:lookuptxt_user_id,userPrevId:userPrevId" beforeDepEvent="custWorkSpace_fillPreviousVal('user')" afterDepEvent="loadGrid()"
                      dependency="lookuptxt_user_id:usrVO.USER_ID"
                 />
	</td>
</tr>
<ps:if test='profType == "1"'>
<tr>
	<td>
		<ps:label key="role_name_key" id="lbl_role" ></ps:label>
	</td>
	<td>
	            <ps:hidden id="rolePrevName" name="rolePrevName"/>
				<psj:livesearch name="userWorkspaceVO.ROLE_NAME" 
                      id="role_name" autoSearch="true"
                      actionName="${pageContext.request.contextPath}/pathdesktop/RoleLookupAction_constructLookup" 
                      searchElement="ROLE_NAME" resultList="ROLE_NAME:lookuptxt_role_name"
                      dependencySrc="${pageContext.request.contextPath}/pathdesktop/RoleDependencyAction_workspaceRoleDependency"
                      parameter="roleName:lookuptxt_role_name" beforeDepEvent="custWorkSpace_fillPreviousVal('role')"  afterDepEvent="loadGrid()"
                      dependency="lookuptxt_role_name:roleVO.ROLE_NAME"
                 />
	</td>
</tr>
</ps:if>
</table>
<ps:form id="custWorkspaceFrmId" useHiddenProps="true">
<ps:url id="treeMenuUrlId" namespace="/path" action="loadTreeMenu">
   <!--<ps:param name="userId" value="userWorkspaceVO.USER_ID"></ps:param>-->
</ps:url>
<div style="width: 100%">
<psjg:grid id="customizeWkspceGrid" 
		altRows="true" 
		addfunc="addWorkspaceElt" 
		dataType="json" 
		delfunc="deleteWorkspaceElt"
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
		pager="true" 
		pagerButtons="false"
		rowNum="10"
		sortable="true"
		shrinkToFit="false" onEditInlineBeforeTopics="disableFullPath" 
		viewrecords="true">
		<psjg:gridColumn name="userWorkspaceVO.APP_NAME" title="" colType="text" editable="false" sortable="false" hidden="true"></psjg:gridColumn>
		<psjg:gridColumn name="userWorkspaceVO.PROG_REF" title="" colType="text" editable="false" sortable="false" hidden="true"></psjg:gridColumn>
		<psjg:gridColumn name="userWorkspaceVO.DISPLAY_CAPTION_KEY" title="%{getEscText('DISPLAY_CAPTION_KEY')}" required="true" colType="text" editable="true" sortable="true" editoptions="{maxLength:'250'}"></psjg:gridColumn>
		<psjg:gridColumn name="userWorkspaceVO.DISPLAY_STYLE" title="%{getEscText('DISPLAY_STYLE')}" colType="select" editable="true" sortable="true"
		edittype="select" formatter="select" editoptions="{value:'0:button;1:HyperLink',style:'width:100%'}"></psjg:gridColumn>
		<psjg:gridColumn name="fullPath" colType="dialog" paramList="${treeGridParams}" dialogUrl="/path/loadTreeMenu" required="true"
		dialogOptions=" {autoOpen: false, height:300,title:'%{getEscText(\"select_fav_screen_key\")}', width:450 ,modal: true, 
		buttons: { %{getEscText(\"Ok_key\")}: function() {setFullPathCol();$(this).dialog('close')},%{getEscText(\"Cancel_key\")}:function(){$(this).dialog('close');} },close: function (){ var theDialog = $(this); theDialog.empty();} }"
		 title="%{getEscText('fullPath')}" editable="true" sortable="true"></psjg:gridColumn>
</psjg:grid>
</div>


<ps:hidden name="updates" id="gridUpdates"></ps:hidden>
</ps:form>

<script type="text/javascript" >
//$("#custWorkspaceFrmId").processAfterValid("saveWidget",{});
$("#customizeWkspceGrid").subscribe('disableFullPath', function(event,data) 
    {
     rowId = (event["originalEvent"])["id"];
     document.getElementById("inpt"+rowId+"_fullPath").disabled=true;
    });
</script>