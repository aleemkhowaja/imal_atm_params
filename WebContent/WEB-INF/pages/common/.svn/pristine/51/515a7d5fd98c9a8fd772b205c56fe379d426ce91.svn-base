<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@taglib prefix="pt" uri="/path-toolbar-tags"%>

<script type="text/javascript">
var commonScreen = true;
</script>
<ps:hidden id="selectedGrid"></ps:hidden>
<psj:tabbedpanel id="portletsMainTabs" sortable="true" onselect="selectAllwdPrtltTabs">
	<psj:tab id="portletsByUser"  target="portletTab-1"  key="Allwd_prtlts_by_user_key" />
	<psj:tab id="usersByPortlet"  target="portletTab-2"  key="Allwd_users_by_prtlt_key" />
	<psj:tab id="userDashWidget"  target="portletTab-3"  key="usr_dash_key" />
	<div id="portletTab-1">
		<div id="portletTab-1_content">
					<jsp:include page="PortletsByUser.jsp">
					<jsp:param value="P" name="theGrid" />
					</jsp:include>
		</div>
	</div>
	<div id="portletTab-2">
		<div id="portletTab-2_content">
					<jsp:include page='UsersByPortlet.jsp'>
					<jsp:param value="U" name="theGrid" />
					</jsp:include>
		</div>
	</div>
	<div id="portletTab-3">
		<div id="portletTab-3_content">
					<jsp:include page='UserDashWidget.jsp'>
					<jsp:param value="D" name="theGrid" />
					</jsp:include>
		</div>
	</div>
</psj:tabbedpanel>
<script type="text/javascript">
$(document).ready(
	function() {
	$("#lookuptxt_user_id").css("text-transform","uppercase");
	$("#lookuptxt_user_idW").css("text-transform","uppercase");
});
</script>
