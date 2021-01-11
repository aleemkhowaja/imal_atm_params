<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>

<script type="text/javascript">
$.subscribe('afterLoad', function(event, data) 
{
	//$("#isoFieldsGridTbl_Id_"+_pageRef).jqGrid("setCellReadOnly",1,"iso_INT_FLDSVO.FIXED_LENGTH",true);
	//$("#isoFieldsGridTbl_Id_"+_pageRef).jqGrid("setCellReadOnly",1,"iso_INT_FLDSVO.FIELD_TYPE",true);
	//$("#isoFieldsGridTbl_Id_"+_pageRef).jqGrid("setCellReadOnly",1,"iso_INT_FLDSVO.DYNAMIC_LENGTH",true);
	//$("#isoFieldsGridTbl_Id_"+_pageRef).jqGrid("setCellReadOnly",1,"iso_INT_FLDSVO.PARTIAL_MASK",true);
	//$("#isoFieldsGridTbl_Id_"+_pageRef).jqGrid("setCellReadOnly",1,"iso_INT_FLDSVO.TOTAL_MASK",true);
	
	//Remove Link from Expression Details Column
	$("#isoFieldsGridTbl_Id_"+_pageRef).find('#1 td:last').text("");
	$("#isoFieldsGridTbl_Id_"+_pageRef).find('#1 td:nth-child(10)').html("");
	
	//Remove Sub-grid option from Bitmap row
	$("#isoFieldsGridTbl_Id_"+_pageRef).find('#1 td:first').removeClass('sgcollapsed');
	$("#isoFieldsGridTbl_Id_"+_pageRef).find('#1 td:first').removeClass('ui-sgcollapsed');
	$("#isoFieldsGridTbl_Id_"+_pageRef).find('#1 td:first').text('');
	
	//removing green color
	 $('td').removeClass("path-subgrd-hdr");
	
	//ATMMnt_CopyFields();
});

$.subscribe('afterSubGridLoad', function(event, data)
{
	d(event, data);
});

$.subscribe('disableFormatDecimal', function(event,data)
{
	var rowId 		= (event["originalEvent"])["id"];
	var myObject 	= $("#isoFieldsGridTbl_Id_"+_pageRef).jqGrid('getRowData',rowId);
	if(myObject['iso_INT_FLDSVO.FIELD_TYPE'] == 'N')
	{
	}
	else if(myObject['iso_INT_FLDSVO.FIELD_TYPE'] == 'V')
	{
		$("#isoFieldsGridTbl_Id_"+_pageRef).jqGrid("setCellReadOnly",rowId,"IS_DECIMAL_YN",true);
		$("#isoFieldsGridTbl_Id_"+_pageRef).jqGrid("setCellValue",rowId,"IS_DECIMAL_YN",false);
	}
	else
	{
		$("#isoFieldsGridTbl_Id_"+_pageRef).jqGrid("setCellReadOnly",rowId,"IS_DECIMAL_YN",true);
		$("#isoFieldsGridTbl_Id_"+_pageRef).jqGrid("setCellValue",rowId,"IS_DECIMAL_YN",false);
	}
	
	if(myObject['iso_INT_FLDSVO.FIXED_LENGTH'] != "")
	{
		$("#isoFieldsGridTbl_Id_"+_pageRef).jqGrid("setCellReadOnly",rowId,"iso_INT_FLDSVO.DYNAMIC_LENGTH",true);
	}else
	{
		$("#isoFieldsGridTbl_Id_"+_pageRef).jqGrid("setCellReadOnly",rowId,"iso_INT_FLDSVO.DYNAMIC_LENGTH",false);
	}
	
});

$.subscribe('disableDynamicLengthByfixedLength', function(event,data)
{
	var subGridId = data.id;
	var subGridRowId 		= (event["originalEvent"])["id"];
	
	
	var parentGridId = $(data).parents('table').attr('id');
	var parentGridRowId = subGridId.split("isoFieldsGridTbl_Id_" + _pageRef + "_")[1]
	.split('_table')[0];
	
	var myObject 	= $("#"+parentGridId).jqGrid('getRowData',parentGridRowId);
	
	if(myObject['iso_INT_FLDSVO.FIXED_LENGTH'] != "")
	{
		$("#"+subGridId).jqGrid("setCellReadOnly",subGridRowId,"sub_FLDSVO.DYNAMIC_LENGTH",true);
	}else
	{
		$("#"+subGridId).jqGrid("setCellReadOnly",subGridRowId,"sub_FLDSVO.DYNAMIC_LENGTH",false);
	}
});

function ATMInterfaceMaint_openDialog(cellvalue, options, rowObject)
{
	var columnName = options.colModel.name;
	var gridId =  options.gid;
	if(columnName == "EXPRESSION_DETAILS")
	{
		columnName = "iso_INT_FLDSVO.EXPRESSION";
	}
	else if(columnName == "SUB_EXPRESSION_DETAILS")
	{
		columnName = "sub_FLDSVO.EXPRESSION";
	}
	else if(columnName == "ISO_MSG_EXPRESSION_DETAILS")
	{
		columnName = "iso_INT_MSGSVO.RESPONSE_EXPRESSION";
	}
	
	return '<a href="#" onclick="interfaceExpression_openExpressionDialog(\''+false+'\',\''+gridId+'\',\''+options.rowId+'\',\''+columnName+'\')">'+expression_details_key+'</a>';
}


function ATMInterfaceMaint_field_distribution(cellvalue, options, rowObject)
{
	return '<a href="#" onclick="openATM_InterfaceExpressionDialog(\''+options.rowId+'\')">'+field_distribution_key+'</a>';
}
</script>

<ps:url id="urlISOFieldsGrid" escapeAmp="false" action="ATMInterfaceListAction_loadFieldsGrid" namespace="/path/atmInterface">
   <ps:param name="iv_crud"  value="ivcrud_${_pageRef}"></ps:param>
   <ps:param name="_pageRef" value="_pageRef"></ps:param>
   <ps:param name="criteria.loadFields" value="1"></ps:param>
   <ps:param name="criteria.interfaceId" value="atmInterfaceCO.iso_INTERFACESVO.INTERFACE_CODE"></ps:param>
   <ps:param name="criteria.interfaceType" value="atmInterfaceCO.iso_INTERFACESVO.INTERFACE_TYPE"></ps:param>
</ps:url>

<ps:url id="urlSubFieldsGrid" escapeAmp="false" action="ATMInterfaceListAction_loadInnerFieldsGrid" namespace="/path/atmInterface">
	<ps:param name="iv_crud"  value="ivcrud_${_pageRef}"></ps:param>
   	<ps:param name="_pageRef" value="_pageRef"></ps:param>
   	<ps:param name="criteria.interfaceType" value="atmInterfaceCO.iso_INTERFACESVO.INTERFACE_TYPE"></ps:param>
</ps:url>

<psjg:grid id		="isoFieldsGridTbl_Id_${_pageRef}" 
      	altRows       	="true"
 	  	editinline 		="true"
 	  	editurl			="%{urlISOFieldsGrid}"
 	  	href			="%{urlISOFieldsGrid}"
      	dataType   		="json"
   	  	pager      		="false"
   	  	sortable   		="true"
	  	filter         	="false"
   	  	gridModel   	="gridModel"
   	  	rowNum    		="10"
   	  	rowList        	="5,10,15,20"
      	viewrecords 	="true"
      	navigator    	="true"
      	navigatorAdd    ="false"
      	navigatorRefresh="true"
      	navigatorEdit	="false"
      	navigatorDelete	="false"
      	navigatorSearch	="false"
      	subGridOptions	="{reloadOnExpand:false}"
      	navigatorSearchOptions ="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true,sopt:['eq','ne','lt','gt']}"
      	shrinkToFit		="true"
      	pagerButtons	="true"
      	onGridCompleteTopics="afterLoad"
      	onEditInlineBeforeTopics="disableFormatDecimal"
      	height			="200"
      	autowidth		="false"
      	width			="1087" >
	
    <psjg:grid
		id               ="subFieldsGridTbl_Id_${_pageRef}"
	    subGridUrl       ="%{urlSubFieldsGrid}"
	    dataType         ="json"
		pager            ="false"
		sortable         ="true"
		filter           ="false"
		gridModel        ="gridModel"
		rowNum           ="5"
		rowList          ="5,10,15,20"
	    viewrecords      ="false"
	    navigator        ="true"
	    editinline		 ="true"
	    editurl			 ="%{urlSubFieldsGrid}"
	    navigatorDelete  ="true"
	    navigatorEdit    ="false"
	    navigatorRefresh ="false"
	    navigatorAdd     ="true"
	    addfunc			 ="addHashMapSubGridRows(this)"
	    delfunc			 ="delSubGridRows(this)"
	    navigatorSearch  ="false"
	    serializeGridData="sendExtraParams"
	    onGridCompleteTopics="afterSubGridLoad"
	    onEditInlineBeforeTopics="disableDynamicLengthByfixedLength"
	    disableEditableFocus="true"
	    navigatorSearchOptions="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true,sopt:['eq','ne','lt','gt','le','ge']}"
	    altRows          ="true"
	    shrinkToFit      ="true" 
	    autowidth		 ="false"
	    width			="1000">
	       
		<psjg:gridColumn id="sub_FLDSVO.ATM_ISO_SUB_FLDS_CODE" colType="number" index="sub_FLDSVO.ATM_ISO_SUB_FLDS_CODE" name="sub_FLDSVO.ATM_ISO_SUB_FLDS_CODE"
			title="%{getText('field_id_key')}" editable="false" sortable="true" search="true" width="5" hidden="true"  key="true" />
		
	    <psjg:gridColumn id="sub_FLDSVO.SUB_FIELD_NAME" name="sub_FLDSVO.SUB_FIELD_NAME" index="sub_FLDSVO.SUB_FIELD_NAME" colType="text" required="true"
			title="%{getText('fieldName')}" sortable="false" search="true" editable="true" width="20" tabindex="1"/>
			
		<psjg:gridColumn name="sub_FLDSVO.SUB_FIELD_TYPE" index="sub_FLDSVO.SUB_FIELD_TYPE" id="sub_FLDSVO.SUB_FIELD_TYPE" title="%{getText('Field_Type_key')}" 
			colType="select" edittype="select" editable="true" sortable="true" search="true" formatter="select" width="20" tabindex="2"
    		editoptions="{ value:function() {  return loadCombo('${pageContext.request.contextPath}/path/atmInterface/ATMInterfaceMaintAction_populateTypeComboBoxes.action','dataTypeList', 'code', 'descValue');}}" />
   	
   		<psjg:gridColumn id="sub_FLDSVO.FIXED_LENGTH" name="sub_FLDSVO.FIXED_LENGTH" index="sub_FLDSVO.FIXED_LENGTH" colType="number"
   			editoptions="{dataEvents: [{type: 'change', fn: function(e) {atmInterfaceISOFields_onChangeDisableDynamicFields(e, this, 'false');  ATMMnt_CheckLengthLimit(e, this)} }], maxlength: '2'}"
			title="%{getText('Field_Length_key')}" sortable="false" search="true" editable="true" width="10" tabindex="3"/>
			
		
		<psjg:gridColumn id="sub_FLDSVO.DYNAMIC_LENGTH" colType="number" index="sub_FLDSVO.DYNAMIC_LENGTH" name="sub_FLDSVO.DYNAMIC_LENGTH" 
			editoptions="{dataEvents: [{type: 'change', fn: function(e) { ATMMnt_CopyFields()} }], maxlength: '2'}"
			title="%{getText('dynamic_length_key')}" editable="true" sortable="true" search="true" width="5" />
		
			
		 <psjg:gridColumn id="SUB_EXPRESSION_DETAILS" name="SUB_EXPRESSION_DETAILS" index="SUB_EXPRESSION_DETAILS" width="8" colType="text"
    		formatter="ATMInterfaceMaint_openDialog" title="%{getText('expression_key')}" sortable="false" search="false" 
    		editable="false" tabindex = "6" align="center" />
    		
    	<psjg:gridColumn id="sub_FLDSVO.EXPRESSION" colType="text" index="sub_FLDSVO.EXPRESSION" width="5" name="sub_FLDSVO.EXPRESSION" title="%{getText('expression_key')}" hidden="true"/>
    	
		<psjg:gridColumn id="sub_FLDSVO.SUB_FIELD_CODE" colType="number" index="sub_FLDSVO.SUB_FIELD_CODE" name="sub_FLDSVO.SUB_FIELD_CODE" 
			title="%{getText('field_code_key')}" hidden="true" width="20"/>
			
		<psjg:gridColumn id="sub_FLDSVO.ATM_ISO_FLDS_CODE" colType="number" index="sub_FLDSVO.ATM_ISO_FLDS_CODE" name="sub_FLDSVO.ATM_ISO_FLDS_CODE" hidden="true"
			title="%{getText('field_no_key')}" width="20" />
			
		<psjg:gridColumn id="STATUS" colType="text" index="STATUS" name="STATUS" hidden="true" width="5" title="%{getText('Status_Key')}" />
	</psjg:grid>

    <psjg:gridColumn id="iso_INT_FLDSVO.ATM_ISO_FLDS_CODE" colType="number" index="iso_INT_FLDSVO.ATM_ISO_FLDS_CODE" name="iso_INT_FLDSVO.ATM_ISO_FLDS_CODE"
		title="%{getText('field_id_key')}" editable="false" sortable="true" search="true" width="5" hidden="true" />
		
		
	<psjg:gridColumn id="iso_INT_FLDSVO.FIELD_CODE" colType="number" index="iso_INT_FLDSVO.FIELD_CODE" name="iso_INT_FLDSVO.FIELD_CODE"
		title="%{getText('field_code_key')}" editable="false" sortable="true" search="true" width="5" key="true" />
						
	<psjg:gridColumn id="iso_INT_FLDSVO.FIELD_NAME" name="iso_INT_FLDSVO.FIELD_NAME" index="iso_INT_FLDSVO.FIELD_NAME" colType="text" required="true"
		editoptions="{dataEvents: [{type: 'change', fn: function(e) { ATMMnt_CopyFields()} }], maxlength: '100'}"
		title="%{getText('field_name_key')}" sortable="false" search="true" editable="true" width="20" />
		
	<psjg:gridColumn name="iso_INT_FLDSVO.FIELD_TYPE" index="iso_INT_FLDSVO.FIELD_TYPE" id="iso_INT_FLDSVO.FIELD_TYPE" title="%{getText('Field_Type_key')}" colType="select" 
    			edittype="select" editable="true" sortable="true" search="true" formatter="select" width="15"
    editoptions="{ value:function() {  return loadCombo('${pageContext.request.contextPath}/path/atmInterface/ATMInterfaceMaintAction_populateTypeComboBoxes.action','dataTypeList', 'code', 'descValue');}, dataEvents: [{ type: 'change', fn: function(e) {enableDisableCheck();} }]}" />
   		
	<psjg:gridColumn name="iso_INT_FLDSVO.IS_DECIMAL_YN" index="iso_INT_FLDSVO.IS_DECIMAL_YN" colType="text" width="4" title="%{getText('decimals_key')}" align="center"
		editable="false" editoptions="{value:'Y:N',align:'middle', dataEvents: [{type: 'change', fn: function(e) { ATMMnt_CopyFields()} }]}" 
    	formatoptions="{disabled:${_recReadOnly=='true'}}" formatter="checkbox" edittype="checkbox" sortable="false"/>
		
	<psjg:gridColumn id="iso_INT_FLDSVO.FIXED_LENGTH" name="iso_INT_FLDSVO.FIXED_LENGTH" index="iso_INT_FLDSVO.FIXED_LENGTH" colType="number"
		editoptions="{dataEvents: [{type: 'change', fn: function(e) {atmInterfaceISOFields_onChangeDisableDynamicFields(e, this, 'true'); ATMMnt_CopyFields();} }], maxlength: '4'}"
		title="%{getText('fixed_length_key')}" sortable="false" search="true" editable="true" width="5" />
		
	<psjg:gridColumn id="iso_INT_FLDSVO.DYNAMIC_LENGTH" colType="number" index="iso_INT_FLDSVO.DYNAMIC_LENGTH" name="iso_INT_FLDSVO.DYNAMIC_LENGTH" 
		editoptions="{dataEvents: [{type: 'change', fn: function(e) { ATMMnt_CopyFields()} }], maxlength: '4'}"
		title="%{getText('dynamic_length_key')}" editable="true" sortable="true" search="true" width="5" />
		
    <psjg:gridColumn id="iso_INT_FLDSVO.PARTIAL_MASK" name="iso_INT_FLDSVO.PARTIAL_MASK" index="iso_INT_FLDSVO.PARTIAL_MASK" colType="text"
    	editoptions="{dataEvents: [{type: 'change', fn: function(e) { ATMMnt_CopyFields()} }], maxlength: '50'}"
		title="%{getText('partial_mask_key')}" sortable="false" search="true" editable="true" width="10" />
		
	<psjg:gridColumn name="iso_INT_FLDSVO.TOTAL_MASK_YN" index="iso_INT_FLDSVO.TOTAL_MASK_YN" colType="text" width="5" title="%{getText('total_mask_key')}" align="center" 
		editable="false" editoptions="{value:'Y:N',align:'middle', dataEvents: [{type: 'change', fn: function(e) { ATMMnt_CopyFields()} }]}" 
    	formatoptions="{disabled:${_recReadOnly=='true'}}" formatter="checkbox" edittype="checkbox" sortable="false"/>
    
	<psjg:gridColumn id="iso_INT_FLDSVO.EXPRESSION" colType="text" index="iso_INT_FLDSVO.EXPRESSION" width="5" name="iso_INT_FLDSVO.EXPRESSION" 
					 title="%{getText('expression_key')}" hidden="true" />
    
    <psjg:gridColumn id="iso_INT_FLDSVO.FIELD_TYPE" colType="text" index="iso_INT_FLDSVO.FIELD_TYPE" name="iso_INT_FLDSVO.FIELD_TYPE" 
		title="%{getText('Field_Type_key')}" editable="false" sortable="true" search="true" hidden="true" />
		
	<psjg:gridColumn id="EXPRESSION_DETAILS" name="EXPRESSION_DETAILS" index="EXPRESSION_DETAILS" width="8" colType="text"
    	formatter="ATMInterfaceMaint_openDialog" title="%{getText('expression_key')}" sortable="false" search="false" 
    	editable="false" tabindex = "6" align="center" />
    
</psjg:grid>
