<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>

<script>
/// US 853476 Muhammad.Asif ( Dynamic Screen Grid & Combo Loading from Query and Rest Service )
var invalid_input_values_key = document.getElementById("invalid_input_values_key").value;
var invalid_number_format_key = document.getElementById("invalid_number_format_key").value;
var select_operation_out_parameter_key = document.getElementById("select_operation_out_parameter_key").value;
var select_rest_operaion_id_key = document.getElementById("select_rest_operaion_id_key").value;
var select_global_activity_id_key = document.getElementById("select_global_activity_id_key").value;
var invalid_data_in_parameter_grid_key = document.getElementById("invalid_data_in_parameter_grid_key").value;
var invalid_data_in_out_parameter_grid_key = document.getElementById("invalid_data_in_out_parameter_grid_key").value;
var parameter_grid_is_empty_key = document.getElementById("parameter_grid_is_empty_key").value;
var out_parameter_grid_is_empty_key = document.getElementById("out_parameter_grid_is_empty_key").value;
var operation_id_is_missing_key = document.getElementById("operation_id_is_missing_key").value;
var out_parameter_is_missing_key = document.getElementById("out_parameter_is_missing_key").value;
var id_length_less_18_key = document.getElementById("id_length_less_18_key").value;
var no_screen_selected_delete_key = document.getElementById("no_screen_selected_delete_key").value;

</script>

<ps:hidden id="invalid_input_values_key" value="%{getText('invalid_input_values_key')}"/>
<ps:hidden id="invalid_number_format_key" value="%{getText('invalid_number_format_key')}"/>
<ps:hidden id="select_operation_out_parameter_key" value="%{getText('select_operation_out_parameter_key')}"/>
<ps:hidden id="select_rest_operaion_id_key" value="%{getText('select_rest_operaion_id_key')}"/>
<ps:hidden id="select_global_activity_id_key" value="%{getText('select_global_activity_id_key')}"/>
<ps:hidden id="invalid_data_in_parameter_grid_key" value="%{getText('invalid_data_in_parameter_grid_key')}"/>
<ps:hidden id="invalid_data_in_out_parameter_grid_key" value="%{getText('invalid_data_in_out_parameter_grid_key')}"/>
<ps:hidden id="parameter_grid_is_empty_key" value="%{getText('parameter_grid_is_empty_key')}"/>
<ps:hidden id="out_parameter_grid_is_empty_key" value="%{getText('out_parameter_grid_is_empty_key')}"/>
<ps:hidden id="operation_id_is_missing_key" value="%{getText('operation_id_is_missing_key')}"/>
<ps:hidden id="out_parameter_is_missing_key" value="%{getText('out_parameter_is_missing_key')}"/>
<ps:hidden id="id_length_less_18_key" value="%{getText('id_length_less_18_key')}"/>
<ps:hidden id="no_screen_selected_delete_key" value="%{getText('no_screen_selected_delete_key')}"/>

<ps:hidden name="screenId"  value="${criteria.screenId}"></ps:hidden>
<ps:hidden name="elementId" value="${criteria.elementId}"></ps:hidden>
<ps:hidden name="queryData" value="${criteria.queryData}"></ps:hidden>
<ps:hidden name="elementType" value="${criteria.elementType}"></ps:hidden>
<ps:hidden name="propertyCode" value="${criteria.propertyCode}"></ps:hidden>


<ps:form useHiddenProps="true" id="datasourceFormId" namespace="/path/screenGenerator">
	<div id="dyn_datasource_div">
		<table border="0" cellpadding="1" cellspacing="0" width="28%">
			<tr>
				<td><ps:label id="lbl_queryFormId" key="table_data_source_key" for="tableDatesource"></ps:label></td>
				<td><ps:select
						name="dynScreenQueryCO.tableDatasource" id="tableDatesource"
						list="tableDataSourceList" listKey="code" listValue="descValue"
						disabled="false"
						onchange="screenGeneratorProp_tableDatasourceOnChange()"></ps:select>
				</td>
			</tr>
		</table>
	</div>
	<div id="dyn_datasource_screen_div">
	</div>
</ps:form>
<script>
	$( document ).ready(function() {
		screenGeneratorProp_tableDatasourceOnChange();
	});
</script>

