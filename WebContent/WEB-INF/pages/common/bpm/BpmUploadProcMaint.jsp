<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>

<ps:set name="file_bpmn2_ext_key_var" value="%{getEscText('file_bpmn2_ext_key')}"/>
<script>
	var file_bpmn2_ext_key = "${file_bpmn2_ext_key_var}";
</script>

<ps:form id="bpmProcessMappingForm_Id" useHiddenProps="true" cssClass="ui-widget-content">	

	<table style="width:60%;">
		<tr>
			<td style="width:25%;">
				<ps:file id="bpmProcessMapping_bpmnFile" name="uploadFile"></ps:file>
			</td>
			<td style="width:25%;">
				<psj:submit button="true" onclick="bpmProcessMapping_uploadBpmnFile()" type="button" buttonIcon="ui-icon-folder-open">
					<ps:label key="Open_Import_from_file_key" />
				</psj:submit>
			</td>
			<td style="width:50%;">
				<table>
					<tr>
						<td>
							<ps:checkbox name="bpmCO.bpmTaskMappingCO.replaceMapping"
								id="bpmUsrTaskMappingGrid_ReplaceMap_YN" valOpt="1:0" />
						</td>
						<td>
							<ps:label key="replace_mapping_key"
									id="lbl_bpmUsrTaskMappingGrid_ReplaceMap_YN"
									for="bpmUsrTaskMappingGrid_ReplaceMap_YN"></ps:label>
						</td>
					</tr>
				</table>	
			</td>
		</tr>
	</table>

</ps:form>