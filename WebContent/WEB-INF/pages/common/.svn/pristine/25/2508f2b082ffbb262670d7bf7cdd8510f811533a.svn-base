<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>

<script type="text/javascript">
	$.struts2_jquery.require("BpmMaint.js,BpmList.js" ,null,"${pageContext.request.contextPath}/common/js/bpm/");
</script>

<psj:tabbedpanel id="instanceHistMainTabs" sortable="true" onselect="bpmMaint_instanceHisttabs">
	<psj:tab id="ActiveInstances"  		target="ActiveInstancesTab"  key="Active_key" />
	<psj:tab id="CompletedInstances"  	target="CompletedInstancesTab"  key="Completed_key" />
	<psj:tab id="AbortedInstances"  	target="AbortedInstancesTab" key="Aborted_key" />
	
	<div id="ActiveInstancesTab">
		<div id="ActiveInstancesTab_content">
			<table>
				<tr>
					<jsp:include page="BpmInstancesHistoryList.jsp">
						<jsp:param name="type" value="active" />
					</jsp:include>
				</tr>
			</table>
		</div>
	</div>
	<div id="CompletedInstancesTab">
		<div id="CompletedInstancesTab_content">
			<table>
				<tr>
					<jsp:include page="BpmInstancesHistoryList.jsp">
						<jsp:param name="type" value="completed" />
					</jsp:include>
				</tr>
			</table>
		</div>
	</div>
	<div id="AbortedInstancesTab">
		<div id="AbortedInstancesTab_content">
			<table>
				<tr>
					<jsp:include page="BpmInstancesHistoryList.jsp">
						<jsp:param name="type" value="aborted" />
					</jsp:include>
				</tr>
			</table>
		</div>
	</div>
</psj:tabbedpanel>