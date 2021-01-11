<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@taglib prefix="pt" uri="/path-toolbar-tags"%>

<script type="text/javascript">
var commonScreen = true;
</script>
<ps:hidden id="selectedGrid"></ps:hidden>
<psj:tabbedpanel id="tracksMainTabs" sortable="true" onselect="selectTrackChangesTabs">
	<psj:tab id="updatedTrackedChanges"  target="trackTab-1"  key="updatedTrckdChng_key" />
	<psj:tab id="addedTrackedChanges"  target="trackTab-2"  key="addedTrckdChng_key" />
	<psj:tab id="deletedTrackedChanges"  target="trackTab-3"  key="deletedTrckdChng_key" />
	<div id="trackTab-1">
		<div id="trackTab-1_content">
					<jsp:include page="TrackReport.jsp">
					<jsp:param value="U" name="theGrid" />
					</jsp:include>
		</div>
	</div>
	<div id="trackTab-2">
		<div id="trackTab-2_content">
					<jsp:include page='TrackReport.jsp'>
					<jsp:param value="A" name="theGrid" />
					</jsp:include>
		</div>
	</div>
	<div id="trackTab-3">
		<div id="trackTab-3_content">
					<jsp:include page='TrackReport.jsp'>
					<jsp:param value="D" name="theGrid" />
					</jsp:include>
		</div>
	</div>
</psj:tabbedpanel>