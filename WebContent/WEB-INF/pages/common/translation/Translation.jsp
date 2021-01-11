<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@taglib prefix="pt" uri="/path-toolbar-tags"%>

<ps:set name="file_ext_key_var" value="%{getEscText('file_ext_key')}"/>
<ps:set name="links_key_var" value="%{getEscText('links_key')}"/>
<ps:set name="global_dep_key_var" value="%{getEscText('global_dep_key')}"/>
<ps:set name="ROOT_KEY_var" value="%{getEscText('ROOT_KEY')}"/>
<ps:set name="invalid_lang_key_var" value="%{getEscText('invalid_lang_key')}"/>
<ps:set name="trans_mand_key_var" value="%{getEscText('trans_mand_key')}"/>
<ps:set name="lbl_deleted_key_var" value="%{getEscText('lbl_deleted_key')}"/>
<ps:set name="grp_deleted_key_var" value="%{getEscText('grp_deleted_key')}"/>
<ps:set name="invalid_grid_id_var" value="%{getEscText('invalid_grid_id')}"/>
<ps:set name="key_grp_err_key_var" value="%{getEscText('key_grp_err_key')}"/>
<ps:set name="add_key_grp_key_var" value="%{getEscText('add_key_grp_key')}"/>
<ps:set name="key_lbl_err_key_var" value="%{getEscText('key_lbl_err_key')}"/>
<ps:set name="add_key_lbl_key_var" value="%{getEscText('add_key_lbl_key')}"/>
<ps:set name="cr_suffix_key_var" value="%{getEscText('cr_suffix_key')}"/>
<ps:set name="dr_suffix_key_var" value="%{getEscText('dr_suffix_key')}"/>

<script type="text/javascript">
$.struts2_jquery.require("Translation.js", null, jQuery.contextPath
		+ "/common/js/translation/");
<%/* Translation Screen Labels/Messages*/%>
var dr_suffix_key_trans = "${dr_suffix_key_var}";
var cr_suffix_key_trans = "${cr_suffix_key_var}";
var add_key_lbl_key = "${add_key_lbl_key_var}";
var key_lbl_err_key = "${key_lbl_err_key_var}";
var add_key_grp_key = "${add_key_grp_key_var}";
var key_grp_err_key = "${key_grp_err_key_var}";
var invalid_grid_id = "${invalid_grid_id_var}";
var grp_deleted_key = "${grp_deleted_key_var}";
var lbl_deleted_key = "${lbl_deleted_key_var}";
var trans_mand_key  = "${trans_mand_key_var}";
var invalid_lang_key = "${invalid_lang_key_var}";
var ROOT_KEY = "${ROOT_KEY_var}";
var global_dep_key = "${global_dep_key_var}";
var links_key = "${links_key_var}";
var file_ext_key = "${file_ext_key_var}";
var commonScreen = true;
</script>
<ps:hidden id="lovAccessRight" name="lovAccessRight" />
<psj:tabbedpanel id="labelsMainTabs" sortable="true" onselect="tabsShowSelect">
	<psj:tab id="labelTab1"  target="labelTab-1"  key="lbl_trans_key" />
	<psj:tab id="groupTab2"  target="groupTab-2"  key="grp_trans_key" />
	<psj:tab id="impExpTab3" target="impExpTab-3" key="import_export_key" />
	<ps:if test="lovAccessRight!=null">
	<psj:tab id="lovTransTab4" target="lovTransTab-4" key="lov_trans_key" />
	</ps:if>
	<div id="labelTab-1">
		<div id="labelTab-1_content">
			<table>
				<tr>
					<jsp:include page="LabelDefList.jsp"></jsp:include>
				</tr>
			</table>
		</div>
	</div>
	<div id="groupTab-2">
		<div id="groupTab-2_content">
			<table>
				<tr>
					<jsp:include page='GroupDefList.jsp'></jsp:include>
				</tr>
			</table>
		</div>
	</div>
	<div id="impExpTab-3">
		<div id="impExpTab-3_content">
			<table>
				<tr>
					<jsp:include page='ExportTrans.jsp'></jsp:include>
				</tr>
			</table>
		</div>
	</div>
	<ps:if test="lovAccessRight!=null">
		<div id="lovTransTab-4">
			<div id="lovTransTab-4_content">
				<table>
					<tr>
						<jsp:include page='LOVTypeList.jsp'></jsp:include>
					</tr>
				</table>
			</div>
		</div>
	</ps:if>
</psj:tabbedpanel>