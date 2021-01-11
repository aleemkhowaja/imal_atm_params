<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>


<ps:form useHiddenProps="true" id="addCustWidgetForm">
<table style="width:100%; height:100%; border-collapse: separate; border-spacing: 2px; padding: 0px;">
		<tr>
			<td>
				<ps:label key="portlet_title_key" id="lbl_portlet_title"
					for="portlet_title" />
			</td>
			<td colspan="2">
				<ps:textfield id="portlet_title" name="theVO.TITLE_KEY"
					maxlength="50" required="true" />
			</td>
		</tr>
		<tr>
			<td colspan="3">
				<ps:radio list="#{'1':'portlet_url_key','2':'Show_Reports_key'}"
					id="urlType" value="1" name="urlType" onclick="onUrlRadioChecked()" />
			</td>
		</tr>
		<tr>
		   <td>
				<ps:label key="application_key" id="lbl_application_title"
					for="lookuptxt_custWidget_appName"/>
		   </td>
		   <td style="width:20%">
		        <input type="hidden" id="labeling_web_apps_only_filter" value="1"/>
				<psj:livesearch 
				     id="custWidget_appName" 
				     relatedDescElt="custWidget_appDesc"
				     cssStyle="display:none"
					 name="appName"
					 paramList="webAppsOnly:labeling_web_apps_only_filter"
					 actionName="${pageContext.request.contextPath}/pathdesktop/ApplicationsLookup_constructLookup"
					 resultList="APP_NAME:custWidget_appName"
					 searchElement="APP_NAME" autoSearch="false" maxlength="4"
					 dependencySrc="${pageContext.request.contextPath}/pathdesktop/ApplicationDependencyAction_applicationDepend"
					 parameter="appVO.APP_NAME:lookuptxt_custWidget_appName,webAppsOnly:labeling_web_apps_only_filter"
					 dependency="lookuptxt_custWidget_appName:appVO.APP_NAME,custWidget_appDesc:appVO.APP_DESC" 
					 afterDepEvent="afterAppDependMgnt()"/>
		   </td>
		   <td>
		       <ps:textfield  id="custWidget_appDesc" name="appDesc" readonly="true" />
		   </td> 
		</tr>
		<tr>
			<td>
				<ps:label key="Show_Reports_key" id="lbl_report_url"
					for="lookuptxt_reportProgRef" />
			</td>
			<td>
				<psj:livesearch id="reportProgRef" name="reportProgRef"
					relatedDescElt="reportDesc" cssStyle="display:none"
					paramList ="currAppName:lookuptxt_custWidget_appName"
					actionName="${pageContext.request.contextPath}/pathdesktop/UsrReportsLookup_constructLookup"
					resultList="REPORT_ID:reportId,REPORT_NAME:reportDesc,REPORT_PROG_REF:reportProgRef"
					parameter="reportProgRef:lookuptxt_reportProgRef,appName:lookuptxt_custWidget_appName"
					dependencySrc="${pageContext.request.contextPath}/pathdesktop/portalDashboardAction_dashRepDependencyByProgRef"
					dependency="reportDesc:reportDesc,reportId:reportId,lookuptxt_reportProgRef:reportProgRef"
					searchElement="REPORT_PROG_REF" autoSearch="false" />
			</td>
			<td>
				<ps:hidden id="reportId" name="reportId" />
				<ps:textfield id="reportDesc" readonly="true" />
			</td>
		</tr>
		<tr>
			<td>
				<ps:label key="portlet_url_key" id="lbl_portlet_url"
					for="portlet_url" />
			</td>
			<td colspan="2">
				<ps:textfield id="portlet_url" name="theVO.PORTLET_URL"
					maxlength="1000" required="true" />
			</td>
		</tr>
	</table>
<psj:submit button="true" id="saveNewWidget">
	<ps:label for="saveNewWidget" key="Ok_key"></ps:label>
</psj:submit>
<ps:hidden id="userId" name="%{#session.userName}"/>
<ps:hidden id="portletCode" name="theVO.PORTLET_CODE"/>
<ps:hidden id="userLayoutUpdates" name="userPortalUpdates"/>
</ps:form>

<script type="text/javascript">
	$("#addCustWidgetForm").processAfterValid("saveWidget",{});
</script>