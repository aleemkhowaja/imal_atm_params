<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>

<ps:set name="file_bpmn2_ext_key_var" value="%{getEscText('file_bpmn2_ext_key')}"/>
<script>
	var file_bpmn2_ext_key = '<ps:property value="file_bpmn2_ext_key_var" escapeHtml="false" escapeJavaScript="true"/>';
</script>

<ps:form id="screenGeneImportForm_Id" useHiddenProps="true" cssClass="ui-widget-content">	

	<table style="width:99%;">
		<tr>
			<td style="width:50%;">
				<ps:file id="screenGeneImport_File" name="uploadFile"></ps:file>
			</td>
			<td style="width:50%;">
				<psj:submit button="true" onclick="screenGeneratorList_importFile()" type="button" buttonIcon="ui-icon-folder-open">
					<ps:label key="Open_Import_from_file_key" />
				</psj:submit>
			</td>
		</tr>
	</table>

</ps:form>