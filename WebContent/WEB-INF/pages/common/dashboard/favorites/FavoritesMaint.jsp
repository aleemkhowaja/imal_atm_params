<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>

<ps:form useHiddenProps="true" id="favoriteFormId"
	namespace="/pathdesktop">
	<ps:hidden id="fav_progRef"    name="favoriteCO.userFavorites.PROG_REF"/>
	<ps:hidden id="fav_appName"    name="favoriteCO.userFavorites.APP_NAME"/>
	<ps:hidden id="fav_id"         name="favoriteCO.userFavorites.ID"/>
	<ps:hidden id="fav_actionMode" name="actionMode"/>
	<table width="100%" cellpadding="0" cellspacing="0" id="fav_mainTbl">
		<tr>
			<td width="25%">
				<ps:label key="screenName_key" id="lbl_screenName"
					for="favoriteDesc" />
			</td>
			<td colspan="2">
				<ps:textarea id="favoriteDesc" required="true"
					name="favoriteCO.userFavorites.DESCRIPTION" maxlength="200" cssStyle="height:90%">
				</ps:textarea>
			</td>
		</tr>
		<tr height="5px"></tr>
		<tr>
		  <td>
		      <ps:checkbox id="chkfavoriteExt" 
		                   name="favoriteCO.externalLink"
		                   parameter="favoriteCO.externalLink:chkfavoriteExt"
		                   dependencySrc="${pageContext.request.contextPath}/pathdesktop/dashboardFavDependency"
		                   dependency="favoriteExternal:favoriteCO.userFavorites.URL
		                              ,fav_progRef:favoriteCO.userFavorites.PROG_REF
		                              ,fav_appName:favoriteCO.userFavorites.APP_NAME
		                              ,favoriteDesc:favoriteCO.userFavorites.DESCRIPTION
		                              ,favoriteFullPath:favoriteCO.fullPath
		                              ,chkOpenInDialog:favoriteCO.userFavorites.OPEN_IN_DIALOG_YN">
		      </ps:checkbox>
		  </td>
		  <td>
		      <ps:label key="external_key" id="lbl_chkfavoriteExt"/>
		  </td>
		  <td>
		  </td>
		</tr>
		<tr>
		  <td>
				<ps:label key="externalUrl_key" id="lbl_externalUrl"
					for="favoriteExternal"/>
		  </td>
		  <td colspan="2">
				<ps:textfield id="favoriteExternal"
					name="favoriteCO.userFavorites.URL" maxlength="200">
				</ps:textfield>
		  </td>
		</tr>						
		<tr>
			<td>
				<ps:label key="favoriteScreen_key" id="lbl_favoriteScreen" for="favoriteFullPath"/>
			</td>
			<td>
				<psj:a button="true" tabindex="50" href="#" id="favTreeMenuBtnId"
					buttonIcon="ui-icon ui-icon-contact" onclick="fav_openMenuTree()">
					<ps:label key="menuTree_key" for="favTreeMenuBtnId" />
				</psj:a>
			</td>
			<td>
		      <ps:checkbox id="chkOpenInDialog" 
		                   name="favoriteCO.userFavorites.OPEN_IN_DIALOG_YN" valOpt="1:0">
		      </ps:checkbox>
		      <ps:label key="openInDialog_key" id="lbl_openInDialog" for="chkOpenInDialog"/>
			</td>
		</tr>
		<tr>
		   <td/>
		   <td colspan="2">
				<ps:textfield id="favoriteFullPath" name="favoriteCO.fullPath" readonly="true">
				</ps:textfield>
		   </td>
		</tr>
		<tr>
		   <td colspan="2"><ps:property value=""/></td>
		</tr>
		<tr>
		  <td align="right" colspan="3">
			<psj:submit id="favorite_save" button="true" freezeOnSubmit="true"
					onclick="fav_setMethodName()">
				<ps:label key="Save_key" for="favorite_save" />
			</psj:submit>
		  </td>						 
		</tr>
	</table>
</ps:form>
<script type="text/javascript">
$(document).ready(
	function() {
		fav_resizeMgnt();
	}
);
$("#fav_Maint_div").parent().bind('resize', function () {
    fav_resizeMgnt();
});
$("#favoriteFormId").processAfterValid("fav_submitManagement", {});
</script>