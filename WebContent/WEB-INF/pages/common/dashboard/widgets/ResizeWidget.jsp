<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>


<ps:form useHiddenProps="true" id="updateWidgetHeightForm">
<table width="100%" cellpadding="0" cellspacing="2" height="100%"> 
<tr>		
		<td>
			<ps:label key="height_key" id="lbl_height"
				for="heightId" />
		</td>
		<td>
			<ps:textfield id="heightId" mode="number" name="theVO.TITLE_KEY" maxlength="4" required="true"/>
		</td>
</tr>		
</table>

<psj:submit button="true" id="updateWidgetHeight">
	<ps:label for="updateWidgetHeight" key="Ok_key"></ps:label>
</psj:submit>

<ps:hidden id="userId" name="userId"/>
<ps:hidden id="portletCode" name="theVO.PORTLET_CODE"/>
<ps:hidden id="userLayoutUpdates" name="userPortalUpdates"/>
</ps:form>

<script type="text/javascript">
	$("#updateWidgetHeightForm").processAfterValid("updateWidgetHeight",{});
	var widgetId = $("#portletCode").val();
	var widgetHeight = typeof dashboard.getWidget(widgetId ).customHeight != "undefined" ? dashboard.getWidget(widgetId ).customHeight  : "200" ;
	$("#heightId").val(widgetHeight)
</script>