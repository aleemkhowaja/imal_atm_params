/**
 * 
 * @param gridId = isoFieldsGridTbl_Id
 * @returns
 */
function atmInterfaceISOFields_onChangeDisableDynamicFields(event, data, isMainGrid)
{
	var gridId = $(data).parents('table').attr('id');
	var fixedLengthName = "";
	var dynamicLengthName = "";
	if(isMainGrid == 'true')
	{
		fixedLengthName = "iso_INT_FLDSVO.FIXED_LENGTH";
		dynamicLengthName = "iso_INT_FLDSVO.DYNAMIC_LENGTH";
	}
	else
	{
		fixedLengthName = "sub_FLDSVO.FIXED_LENGTH";
		dynamicLengthName = "sub_FLDSVO.DYNAMIC_LENGTH";
	}
	
	
	var fixedLengthvalue = common_getGridColumnValue(gridId, '', fixedLengthName);
	var gridSelectedId = common_gridSelectedRowId(gridId);
	if(fixedLengthvalue != "")
	{
		$("#isoFieldsGridTbl_Id_"+_pageRef).jqGrid("setCellReadOnly",gridSelectedId,dynamicLengthName,true);
		$("#isoFieldsGridTbl_Id_"+_pageRef).jqGrid("setCellValue",gridSelectedId,dynamicLengthName,"");
	}else
	{
		$("#isoFieldsGridTbl_Id_"+_pageRef).jqGrid("setCellReadOnly",gridSelectedId,dynamicLengthName,false);
	}
}