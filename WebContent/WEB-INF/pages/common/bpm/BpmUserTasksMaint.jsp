<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>

<script type="text/javascript">
	$.struts2_jquery.require("BpmMaint.js" ,null,"${pageContext.request.contextPath}/common/js/bpm/");
</script>

<div id="bpmUserTasksListDiv" style="width=90%;height=90%;">
	<ps:include value="BpmUserTasksList.jsp"/>
</div>