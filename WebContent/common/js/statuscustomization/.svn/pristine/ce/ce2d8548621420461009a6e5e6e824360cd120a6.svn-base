/**
 * on dbClick event , get the selected row and re-load the form based on the selected record
 */
function statusCustList_onDbClickedEvent()
{
	var $table = $("#statusCustomizationListGridTbl_Id_"+_pageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var myObject = $table.jqGrid('getRowData', selectedRowId);
	/**
	 * get the selected rowId
	 */
	var params = {};
	var APP_NAME    = myObject["APP_NAME"];
	var LOV_TYPE_ID = myObject["LOV_TYPE_ID"];
	var PROG_REF    = myObject["PROG_REF"];
	
	params.APP_NAME    = APP_NAME;
	params.LOV_TYPE_ID = LOV_TYPE_ID;
	params.PROG_REF    = PROG_REF;
	
	if (checkIfStatusCustFormChanged()) {
		_showConfirmMsg(changes_made_confirm_msg, confirm_msg_title, function(theVal) {
			if (theVal) {
				statusCustomizationList_loadDataInTheForm(params);
			}
		});
	} 
	else {
		statusCustomizationList_loadDataInTheForm(params);
	}
}
/**
 * Common function called from edit and dbclick management to reload the from by the selected link.
 * @param {Object} param1
 * @param {Object} param2
 */
function statusCustomizationList_loadDataInTheForm(params)
{
	var ivCrud  = $("#stsCustIv_crud_"+_pageRef).val();
	var actionSrc  = jQuery.contextPath+"/path/statusCustomization/StatusCustomizationMaintAction_edit?iv_crud="+ivCrud+"&_pageRef="+_pageRef;
	var newFormAction = jQuery.contextPath+"/path/statusCustomization/StatusCustomizationSubmit_update";
	$.post(actionSrc
		   ,params
	       ,function(param)
 	        {
	         $("#statusCustomizationListMaintDiv_id_"+_pageRef).html(param);
	        }
	       ,"html");
}

/**
 * on add click, open the maint form in save new mode ...
 * @param {Object} sel_row_index
 */
function statusCustList_onAddClicked(sel_row_index)
{
	/**
	 * get the selected rowId
	 */
	var ivCrud  = $("#stsCustIv_crud_"+_pageRef).val();
		var actionSrc     = jQuery.contextPath+"/path/statusCustomization/StatusCustomizationMaintAction_initialize?iv_crud="+ivCrud+"&_pageRef="+_pageRef;
		var newFormAction = jQuery.contextPath+"/path/statusCustomization/StatusCustomizationSubmit_saveNew";
		
		if (checkIfStatusCustFormChanged()) {
			_showConfirmMsg(changes_made_confirm_msg, confirm_msg_title,
					function(theVal) {
						if (theVal) {
							$.post(actionSrc, {}, function(param) {
								$("#statusCustomizationListMaintDiv_id_"+_pageRef).html(param);
							}, "html");
						}
					});
		}
		else {
			$.post(actionSrc, {}, function(param) {
				$("#statusCustomizationListMaintDiv_id_"+_pageRef).html(param);
			}, "html");
		}
}
function statusCustList_onDelClicked(sel_row_index)
{
	var $table = $("#statusCustomizationListGridTbl_Id_"+_pageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var myObject = $table.jqGrid('getRowData', selectedRowId);
	_showConfirmMsg(Confirm_Delete_Process_key, confirm_msg_title,
		function(theVal) {
			if (theVal) {
							/**
							 * get the selected rowId
							 */
							var params = {};
							var APP_NAME    = myObject["APP_NAME"];
							var LOV_TYPE_ID = myObject["LOV_TYPE_ID"];
							var PROG_REF    = myObject["PROG_REF"];
							
							params.APP_NAME    = APP_NAME;
							params.LOV_TYPE_ID = LOV_TYPE_ID;
							params.PROG_REF    = PROG_REF;
						
							var ivCrud  = $("#stsCustIv_crud_"+_pageRef).val();
							var actionSrc  = jQuery.contextPath+"/path/statusCustomization/StatusCustomizationSubmit_delete?iv_crud="+ivCrud+"&_pageRef="+_pageRef;
							var newFormAction = jQuery.contextPath+"/path/statusCustomization/StatusCustomizationSubmit_saveNew";
							$.post(actionSrc
								   ,params
							       ,function(param)
						 	        {
								     	$("#statusCustomizationListGridTbl_Id_"+_pageRef).trigger("reloadGrid");
							        }
							       ,"html");
			}
		});

}

function checkIfStatusCustFormChanged()
{
	var formChanged = false;
	$("#statusCustomizationMaintFormId").each(function(i) {
		formChanged = $(this).hasChanges();
		if (formChanged) {
			return true;
		}
	});
	return formChanged;
}
