<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>

<ps:form id="atmImportForm_Id_${_pageRef}" cssClass="ui-widget-content" cssStyle="margin-top: 18px">	
	<ps:hidden id="importUrl_${_pageRef}" name="importUrl"></ps:hidden>
	<ps:hidden id="recordsGridId_${_pageRef}" name="recordsGridId"></ps:hidden>
	<table style="width:99%; height: 125px;">
		<tr>
			<td style="width:50%;">
				<ps:file id="atmImport_zipFile_${_pageRef}" name="uploadFile"></ps:file>
			</td>
			<td style="width:50%;">
				<psj:submit button="true" onclick="common_importZipFile()" type="button" buttonIcon="ui-icon-folder-open">
					<ps:label key="Open_Import_from_file_key" />
				</psj:submit>
			</td>
		</tr>
	</table>

</ps:form>