<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>


<ps:set name="file_theme_ext_key_var" value="%{getEscText('file_theme_ext_key')}"/>
<script>
	$.struts2_jquery.require("ThemeCustomization.js", null, "${pageContext.request.contextPath}/common/js/customization/");
	var file_theme_ext_key = '<ps:property value="file_theme_ext_key_var" escapeHtml="false" escapeJavaScript="true"/>';
</script>

<ps:form id="themeCustImportForm_Id" useHiddenProps="true" cssClass="ui-widget-content">	

	<table style="width:99%;">
		<tr>
			<td style="width:50%;">
				<ps:file id="themeCustImport_File" name="uploadFile"></ps:file>
			</td>
			<td style="width:50%;">
				<psj:submit button="true" onclick="themeCustomizationList_importFile()" type="button" buttonIcon="ui-icon-folder-open">
					<ps:label key="Open_Import_from_file_key" />
				</psj:submit>
			</td>
		</tr>
		<tr>
			<td class="fldLabelView" colspan="2"><ps:label key="override_cust_import_key" id="lblOverrideCustImport"
					for="overrideCustImport" /></td>
			<td><ps:checkbox name="themeCustomizationCO.overrideCustImport" id="overrideCustImport" valOpt="true:false" /></td>
		</tr>
	</table>

</ps:form>