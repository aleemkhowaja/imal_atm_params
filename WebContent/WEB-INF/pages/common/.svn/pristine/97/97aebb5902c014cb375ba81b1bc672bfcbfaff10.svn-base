<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>


<ps:if test="themeCustomizationCO.imageChange==1">
	<br />
	<fieldset>
		<legend>
			<ps:label id="tCD_legend_logoimage_id" key="logo_image_browse_key"></ps:label>
		</legend>
		<ps:form id="themeCustomizationDialogForm_ID" method="post"
			enctype="multipart/form-data" namespace="/path/fileMngmt">
			<table width="100%">
				<tr>
					<td class="fldLabelView">
						<ps:label key="File_Location_key" />
					</td>
					<td colspan="2">
						<ps:file id="themeCustomization_uploadImage" name="upload" 
							onchange="themeCustomization_clearDefault('tCD_importfile_default')"></ps:file>
					</td>
					<td>
						<psj:submit button="true"
							onclick="themeCustomizationUploadImage('%{imageRef}')" type="button"
							buttonIcon="ui-icon-folder-open">
							<ps:label key="Open_Import_from_file_key" />
						</psj:submit>
					</td>
					<td>
						<ps:if test="themeCustomizationCO.imageDefaulted==1">
							<psj:submit button="true"
								id="tCD_importfile_default_btn"
								onclick="themeCustomization_setDefault('tCD_importfile_default')" type="button"
								buttonIcon="ui-icon-refresh" cssClass="ui-state-disabled" disabled="true">
								<ps:label key="defaulted_key" />
							</psj:submit>
							<script>
							$(document).ready(function(){
								themeCustomization_setDefault('tCD_importfile_default');});
							</script>
						</ps:if>
						<ps:else>
							<psj:submit button="true"
								id="tCD_importfile_default_btn"
								onclick="themeCustomization_setDefault('tCD_importfile_default')" type="button"
								buttonIcon="ui-icon-refresh">
								<ps:label key="default_key" />
							</psj:submit>
							<script>
							$(document).ready(function(){
								themeCustomization_clearDefault('tCD_importfile_default');});
							</script>
						</ps:else>
					</td>
				</tr>
			</table>
			<ps:hidden id="tCD_importfile_default"></ps:hidden>
		</ps:form>
	</fieldset>
</ps:if>
<ps:if test="themeCustomizationCO.fontChange==1">
	<br />
	<fieldset>
		<legend>
			<ps:label id="tCD_font_family_dd_id" key="change_font_family_key"></ps:label>
		</legend>
		<table>
			<tr>
				<td>
					<ps:select list="fontFamilyDropDown"
						name="themeCustomizationCO.fontName" id="tCD_font_family_dd"
						listKey="code" listValue="descValue"
						onchange="themeCustomization_clearDefault('tCD_fontChange_default')">
					</ps:select>
				</td>
				<td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
				<td>
					<ps:if test="themeCustomizationCO.fontDefaulted==1">
						<psj:submit button="true"
								id="tCD_fontChange_default_btn"
								onclick="themeCustomization_setDefault('tCD_fontChange_default')" type="button"
								buttonIcon="ui-icon-refresh" cssClass="ui-state-disabled" disabled="true">
								<ps:label key="defaulted_key" />
						</psj:submit>
						<script>
						$(document).ready(function(){
							themeCustomization_setDefault('tCD_fontChange_default');});
						</script>
					</ps:if>
					<ps:else>
						<psj:submit button="true"
								id="tCD_fontChange_default_btn"
								onclick="themeCustomization_setDefault('tCD_fontChange_default')" type="button"
								buttonIcon="ui-icon-refresh">
								<ps:label key="default_key" />
						</psj:submit>
						<script>
						$(document).ready(function(){
							themeCustomization_clearDefault('tCD_fontChange_default');});
						</script>
					</ps:else>
				</td>
			</tr>
		</table>
		<ps:hidden id="tCD_fontChange_default"></ps:hidden>
	</fieldset>
</ps:if>
<ps:if test="themeCustomizationCO.sizeChange==1">
	<br />
	<fieldset>
		<legend>
			<ps:label id="tCD_change_size_id" key="change_size_key"></ps:label>
		</legend>
		<table>
			<tr>
				<td>
					<ps:textfield id="tCD_change_size_tf" name="themeCustomizationCO.size" maxLenBeforeDec="2" maxValue="36"
						size="6" mode="number" nbFormat="##.####" onchange="themeCustomization_clearDefault('tCD_sizeChange_default')">
					</ps:textfield>
					Pixels
				</td>
				<td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
				<td>
					<ps:if test="themeCustomizationCO.sizeDefaulted==1">
						<psj:submit button="true"
								id="tCD_sizeChange_default_btn"
								onclick="themeCustomization_setDefault('tCD_sizeChange_default')" type="button"
								buttonIcon="ui-icon-refresh" cssClass="ui-state-disabled" disabled="true">
								<ps:label key="defaulted_key" />
						</psj:submit>
						<script>
						$(document).ready(function(){
							themeCustomization_setDefault('tCD_sizeChange_default');});
						</script>
					</ps:if>
					<ps:else>
						<psj:submit button="true"
								id="tCD_sizeChange_default_btn"
								onclick="themeCustomization_setDefault('tCD_sizeChange_default')" type="button"
								buttonIcon="ui-icon-refresh">
								<ps:label key="default_key" />
						</psj:submit>
						<script>
						$(document).ready(function(){
							themeCustomization_clearDefault('tCD_sizeChange_default');});
						</script>
					</ps:else>
				</td>
			</tr>
		</table>
		<ps:hidden id="tCD_sizeChange_default"></ps:hidden>
	</fieldset>
</ps:if>
<ps:if test="themeCustomizationCO.colorChange==1">
	<br />
	<fieldset>
		<legend>
			<ps:label id="tCD_chaneg_color_id" key="change_color_key"></ps:label>
		</legend>
		<table>
			<tr>
				<td>
					<div id="tCD_colorPicker_div" />
				</td>
				<td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
				<td valign="top">
					<ps:if test="themeCustomizationCO.colorDefaulted==1">
						<psj:submit button="true"
								id="tCD_colorChange_default_btn"
								onclick="themeCustomization_setDefault('tCD_colorChange_default')" type="button"
								buttonIcon="ui-icon-refresh" cssClass="ui-state-disabled" disabled="true">
								<ps:label key="defaulted_key" />
						</psj:submit>
						<script>
						$(document).ready(function(){
							themeCustomization_setDefault('tCD_colorChange_default');});
						</script>
					</ps:if>
					<ps:else>
						<psj:submit button="true"
								id="tCD_colorChange_default_btn"
								onclick="themeCustomization_setDefault('tCD_colorChange_default')" type="button"
								buttonIcon="ui-icon-refresh">
								<ps:label key="default_key" />
						</psj:submit>
						<script>
						$(document).ready(function(){
							themeCustomization_clearDefault('tCD_colorChange_default');});
						</script>
					</ps:else>
				</td>
			</tr>
		</table>
		<ps:hidden id="tCD_colorPicker_div_hid"></ps:hidden>
		<ps:hidden id="tCD_colorChange_default"></ps:hidden>
	</fieldset>
</ps:if>
<ps:if test="themeCustomizationCO.bcolorChange==1">
	<br />
	<fieldset>
		<legend>
			<ps:label id="tCDB_chaneg_color_id" key="change_bg_color_key"></ps:label>
		</legend>
		<table>
			<tr>
				<td>
					<div id="tCDB_colorPicker_div" />
				</td>
				<td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
				<td valign="top">
					<ps:if test="themeCustomizationCO.colorDefaulted==2">
						<psj:submit button="true"
								id="tCDB_colorChange_default_btn"
								onclick="themeCustomization_setDefault('tCDB_colorChange_default')" type="button"
								buttonIcon="ui-icon-refresh" cssClass="ui-state-disabled" disabled="true">
								<ps:label key="defaulted_key" />
						</psj:submit>
						<script>
						$(document).ready(function(){
							themeCustomization_setDefault('tCD_colorChange_default');});
						</script>
					</ps:if>
					<ps:else>
						<psj:submit button="true"
								id="tCDB_colorChange_default_btn"
								onclick="themeCustomization_setDefault('tCDB_colorChange_default')" type="button"
								buttonIcon="ui-icon-refresh">
								<ps:label key="default_key" />
						</psj:submit>
						<script>
						$(document).ready(function(){
							themeCustomization_clearDefault('tCDB_colorChange_default');});
						</script>
					</ps:else>
				</td>
			</tr>
		</table>
		<ps:hidden id="tCDB_colorPicker_div_hid"></ps:hidden>
		<ps:hidden id="tCDB_colorChange_default"></ps:hidden>
	</fieldset>
</ps:if>
<ps:if test="themeCustomizationCO.borderChange==1 ">
	<br />
	<fieldset>
		<legend>
			<ps:label id="tCD_chaneg_border_id" key="change_border_key"></ps:label>
		</legend>
		<table>
			<tr>
				<td>
					<div id="tCD_borderPicker_div" />
				</td>
				<td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
				<td valign="top">
					<ps:if test="themeCustomizationCO.borderDefaulted==1">
						<psj:submit button="true"
								id="tCD_borderChange_default_btn"
								onclick="themeCustomization_setDefault('tCD_borderChange_default')" type="button"
								buttonIcon="ui-icon-refresh" cssClass="ui-state-disabled" disabled="true">
								<ps:label key="defaulted_key" />
						</psj:submit>
						<script>
						$(document).ready(function(){
							themeCustomization_setDefault('tCD_borderChange_default');});
						</script>
					</ps:if>
					<ps:else>
						<psj:submit button="true"
								id="tCD_borderChange_default_btn"
								onclick="themeCustomization_setDefault('tCD_borderChange_default')" type="button"
								buttonIcon="ui-icon-refresh">
								<ps:label key="default_key" />
						</psj:submit>
						<script>
						$(document).ready(function(){
							themeCustomization_clearDefault('tCD_borderChange_default');});
						</script>
					</ps:else>
				</td>
			</tr>
		</table>
		<ps:hidden id="tCD_borderPicker_div_hid"></ps:hidden>
		<ps:hidden id="tCD_borderChange_default"></ps:hidden>
	</fieldset>
</ps:if>
<ps:if test="themeCustomizationCO.gradientChange==1">
	<br />
	<fieldset>
		<legend>
			<ps:label id="tCD_chaneg_gradient_id" key="change_gradient_key"></ps:label>
		</legend>
		<table width="100%">
			<tr>
				<td width="40%" align="center">
					<ps:label key="start_key" />
				</td>
				<td width="40%" align="center">
					<ps:label key="end_key" />
				</td>
				<td width="10%" align="center">
					<ps:if test="themeCustomizationCO.gradientDefaulted==1">
						<psj:submit button="true"
								id="tCD_gradientChange_default_btn"
								onclick="themeCustomization_setDefault('tCD_gradientChange_default')" type="button"
								buttonIcon="ui-icon-refresh" cssClass="ui-state-disabled" disabled="true">
								<ps:label key="defaulted_key" />
						</psj:submit>
						<script>
						$(document).ready(function(){
							themeCustomization_setDefault('tCD_gradientChange_default');});
						</script>
					</ps:if>
					<ps:else>
						<psj:submit button="true"
								id="tCD_gradientChange_default_btn"
								onclick="themeCustomization_setDefault('tCD_gradientChange_default')" type="button"
								buttonIcon="ui-icon-refresh">
								<ps:label key="default_key" />
						</psj:submit>
						<script>
						$(document).ready(function(){
							themeCustomization_clearDefault('tCD_gradientChange_default');});
						</script>
					</ps:else>
				</td>
			</tr>
			<tr>
				<td>
					<div id="tCD_colorPicker_start_div" />
				</td>
				<td>
					<div id="tCD_colorPicker_end_div" />
				</td>
			</tr>
		</table>
		<ps:hidden id="tCD_colorPicker_start_div_hid"></ps:hidden>
		<ps:hidden id="tCD_colorPicker_end_div_hid"></ps:hidden>
		<ps:hidden id="tCD_gradientChange_default"></ps:hidden>
	</fieldset>
</ps:if>
