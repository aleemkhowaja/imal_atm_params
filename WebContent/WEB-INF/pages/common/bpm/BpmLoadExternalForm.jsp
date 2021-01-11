<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>

<script type="text/javascript">
	$.struts2_jquery.require("BpmMaint.js" ,null,"${pageContext.request.contextPath}/common/js/bpm/");
</script>


<iframe name='jbpmScreenFrame' id='jbpmScreenFrame' style="width:100%;height:100%;border:0px;overflow:auto;">
</iframe>

<form  id="jbpmScreenFormId" method="post" >	   
	<ps:hidden id="Authorization" name="Authorization"  value="${bpmCO.restAuthorization}"></ps:hidden>
</form>		

<script type="text/javascript">
$(document).ready(function (){
	bpmMaint_loadJbpmForm("${bpmCO.restUrl}");
})
</script>
	 