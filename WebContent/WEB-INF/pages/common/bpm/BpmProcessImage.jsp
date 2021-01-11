<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>

<ps:set name="error_loading_image_trans" value="%{getEscText('Error_Loading_Image_key')}"/>

<img id="processImg" src="${pageContext.request.contextPath}/common/images/loading.gif"/>

<script type="text/javascript">

var error_loading_image_trans = "${error_loading_image_trans}";
var processImgSrc = "${pageContext.request.contextPath}/path/bpm/BpmMaint_returnProcessDefinitionImage.action?bpmCO.processDefId=${bpmCO.processDefId}&bpmCO.deploymentId=${bpmCO.deploymentId}&bpmCO.processInstanceId=${bpmCO.processInstanceId}&id=<%=System.currentTimeMillis()%>";
$("#processImg").load(function(data) 
					 {
							
					 })
				.error(function(data) 
					 {
						$('#processImg').css('display', 'none');
						_showErrorMsg(error_loading_image_trans);	
					 })
				.attr('src', processImgSrc);
</script>


