<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>

<ps:set name="Missing_File_Location_key" value="%{getEscText('Missing_File_Location_key')}"/>
<ps:set name="bpm_doc_ext_key" value="%{getEscText('bpm_doc_ext_key')}"/>
<ps:set name="bpm_download_key" value="%{getEscText('download')}"/>

<script type="text/javascript">
	$.struts2_jquery.require("BpmMaint.js,BpmList.js" ,null,"${pageContext.request.contextPath}/common/js/bpm/");
	var Missing_File_Location_key = "${Missing_File_Location_key}";
	var bpm_doc_ext_key = "${bpm_doc_ext_key}";
	var bpm_download_key = "${bpm_download_key}";
</script>
<ps:url id="bpmDocsUrl" action="BpmGrid_loadbpmDocsGrid" namespace="/path/bpm" escapeAmp="false">
	<ps:param name="bpmSC.processId" 	value="%{bpmCO.processInstanceId}"/>
</ps:url>

<ps:form id="bpmDocsForm_Id" useHiddenProps="true" cssStyle="width:99%;height:99%;">	
	
	<ps:hidden id="bpmDocsGrid_processInstanceId" value="%{bpmCO.processInstanceId}" ></ps:hidden>
	<ps:hidden id="bpmDocsGrid_showDocDownloadBtn" value="%{bpmCO.bpmProcessCO.showDocDownloadBtn}" ></ps:hidden>
	
	<psjg:grid id="bpmDocsGrid_Id"					
			href="%{bpmDocsUrl}" 
			dataType="json"
			hiddengrid="false"
			pager="true"
			pagerButtons="false"
			altRows="false"
			filter="true"
			gridModel="gridModel"
			viewrecords="false"
			navigator="true"
			height="150"
			navigatorRefresh="true"
			navigatorEdit="false"
			navigatorSearch="false"
			navigatorAdd="false"
			navigatorDelete="%{bpmCO.bpmProcessCO.showDocDeleteBtn}"
			sortable="true"
			delfunc="bpmDocs_deleteNewDocGrid"
			editinline="true"
			editurl="dummy"
			>
			
			<psjg:gridColumn id="bpmDocsGrid_docId" colType="number"
				name="docVO.DOC_ID" index="DOC_ID"
				title="%{getText('ID_key')}" editable="false" 
			/>
			
			<psjg:gridColumn id="bpmDocsGrid_docName" colType="text"
				name="docVO.DOC_NAME" index="DOC_NAME"
				title="%{getText('FILE_NAME_key')}" editable="false" 
			/>
			
			<psjg:gridColumn id="bpmDocsGrid_docType" colType="text"
				name="docVO.DOC_TYPE" index="DOC_TYPE"
				title="%{getText('FILE_TYPE_key')}"  editable="false"
			/>
			
			<psjg:gridColumn name="" 
						index="" 
       				    title="%{getText('download')}" 
       				    id="btnId"
       				    align="center"
					    colType="text"        
					    editable="false"       
					    sortable="false" 
					    search="false" 
					    formatter="bpmDocsGrid_Id_BtnFormatter" width="100"/>
					
	</psjg:grid>	
	
	<ps:if test='%{ bpmCO.bpmProcessCO.showDocUploadBtn == true }'>
		<table style="width:60%;">
			<tr>
				<td style="width:25%;">
					<ps:file id="bpmDocsGrid_bpmnFile" name="uploadFile"></ps:file>
				</td>
				<td style="width:25%;">
					<psj:submit button="true" onclick="bpmDocsGrid_uploadDocument()" type="button" buttonIcon="ui-icon-folder-open">
						<ps:label key="upload_file_key" />
					</psj:submit>
				</td>
			</tr>
		</table>
	</ps:if>
</ps:form>
