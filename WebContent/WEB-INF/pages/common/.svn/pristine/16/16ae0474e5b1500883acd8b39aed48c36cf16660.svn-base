<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>

<script type="text/javascript">
	$.struts2_jquery.require("BpmMaint.js" ,null,"${pageContext.request.contextPath}/common/js/bpm/");
</script>

<div id="bpmCommonCommentDiv" style="width=100%;height=100%;">
	<ps:form id="bpmCommonCommentForm_Id" useHiddenProps="true" cssStyle="width:95%;">	
		<ps:hidden id="bpmCommonCommentForm_bpmTaskId" name="bpmCO.bpmTaskId" ></ps:hidden>
		<table style="width:100%" >
			<tr style="width:100%" > 
				<td> 
					<ps:label id="bpmCommonCommentForm_comment_lbl" for="bpmCommonCommentForm_comment" key="Comments_key"></ps:label> 
				</td> 
			</tr>
			<tr> 
				<td> 
					<ps:textarea id="bpmCommonCommentForm_comment" name="bpmCO.comment" maxlength="100" rows="5" required="bpmCO.commentRequired"></ps:textarea>  
				</td> 
			</tr>
		</table>
	</ps:form>
</div>

<script type="text/javascript">
$(document).ready(function (){
	$("#bpmCommonCommentForm_Id").processAfterValid("",[]);
})
</script>		