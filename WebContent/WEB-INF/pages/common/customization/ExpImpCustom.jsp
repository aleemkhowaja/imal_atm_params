<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<table>
	<tr>
		<td>
			<ps:radio list="#{'1':'export_key','2':'import_key'}" id="impExpSelectCustomization"
				name="impExpSelectCustomization" onclick="impExpSelectCustomizationFunc(this)" value="1" />
		</td>
	</tr>
	<tr>
		<td>
			<div id="customizationExport" style="display: ''">
					<table>
						<tr>
							<td>
								<psj:submit button="true" onclick="exportScreenCustomization('page')" type="button"
									buttonIcon="ui-icon-trash">
									<ps:label key="Save_Script_key" />
								</psj:submit>
							</td>
						</tr>
					</table>
			</div>
		</td>
	</tr>
	<tr>
		<td>
			<div id="customizationImport" style="display: none">
				<ps:form id="customizationFileForm" method="post"
					enctype="multipart/form-data" namespace="/path/fileMngmt">
					<table>
						<tr>
							<td class="fldLabelView" colspan="2">
								<ps:label key="override_cust_import_key" id="lblOverrideCustImport"
									for="overrideCustImport" />
							</td>
							<td>
								<ps:checkbox 
									name="custSC.overrideCustImport" id="overrideCustImport"  valOpt="true:false"/>
							</td>
						</tr>
						<tr>
							<td class="fldLabelView">
								<ps:label key="File_Location_key" />
							</td>
							<td>
								<ps:file id="uploadScriptCustomization" name="uploadCust"></ps:file>
							</td>
							<td>
								<psj:submit button="true" onclick="importCustomization();" type="button"
									buttonIcon="ui-icon-folder-open">
									<ps:label key="Open_Import_from_file_key" />
								</psj:submit>
							</td>
						</tr>
					</table>
				</ps:form>
			</div>
		</td>
	</tr>
</table>