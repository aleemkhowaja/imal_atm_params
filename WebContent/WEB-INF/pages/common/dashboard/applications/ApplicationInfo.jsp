<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>
<ps:form useHiddenProps="true" id="appsFormId" namespace="/pathdesktop">
<table width="100%" height="100%" cellpadding="0" cellspacing="1">
	<tr>
		<td style="padding-top: 5px">
           <ps:label key="Name_key" id="lbl_appName" cssClass="boldLabel"/>
		</td>
		<td style="padding-top: 5px">
		   <ps:property value="appsCO.appVO.APP_DESC"/>
		</td>
	</tr>
	<tr>
		<td style="padding-top: 5px">
		   <ps:label key="desc_eng_key" id="lbl_description" cssClass="boldLabel"/>
		</td>
		<td style="padding-top: 5px">
		   <ps:property value="appsCO.appVO.APP_NAME"/>
		</td>
	</tr>
	<tr>
		<td style="padding-top: 5px">
		   <ps:label key="latestVersion_key" id="lbl_latestVersion" cssClass="boldLabel"/>
		</td>
		<td style="padding-top: 5px">
		   <ps:property  value="appsCO.appVO.WEB_VERSION"/>
		</td>
	</tr>
	<tr>
		<td style="padding-top: 5px">
		   <ps:label key="lastLogin_key" id="lbl_lastLogin" cssClass="boldLabel"/>
		</td>
		<td style="padding-top: 5px">
			<ps:property value="appsCO.lastLogin" />
		</td>
	</tr>
	<tr>
		<td style="padding-top: 5px">
		   <ps:label key="lastLogout_key" id="lbl_lastLogout" cssClass="boldLabel"/>
		</td>
		<td style="padding-top: 5px">
		   <ps:property value="appsCO.lastLogout"/>
		</td>
	</tr>
</table>
</ps:form>