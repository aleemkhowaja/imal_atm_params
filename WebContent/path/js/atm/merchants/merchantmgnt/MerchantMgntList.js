/**
 * This function will be called upon clicking on status button 
 * @param {Object} param
 */
function merchantMgnt_onStatusClicked()
{	
	var merchantCode =$("#code_"+_pageRef).val();
	if(merchantCode == "")
		return;
    var loadSrc  = jQuery.contextPath +"/path/merchants/MerchantMgntStatus_search.action?code="+merchantCode+"&_pageRef="+_pageRef;
	showStatus("merchantMgntDefFormId_"+_pageRef,_pageRef, loadSrc,	{} );
}
function merchantMgnt_ListLoad()
{
	$("div#merchantMgntListDetailDiv.collapsibleContainer").collapsiblePanel();
	$("#gview_merchantMgntGridTbl_Id_"+_pageRef+" div.ui-jqgrid-titlebar").hide();
}



//load data upon double click on main grid records
function merchantMgnt_onDbClickedEvent(sel_row_index)
{
	var changes = false;

	$("#cust_acc_validate_"+_pageRef).hide(); 
	if($("#merchantMgntDefFormId_" + _pageRef).length != 0)  //in case of approve the form is not loaded yet upon first search
	{
		changes = $("#merchantMgntDefFormId_" + _pageRef).hasChanges();
	}
	if (changes == 'true' || changes == true) {
		_showConfirmMsg(changes_made_confirm_msg, "",
				"merchantMgnt_onDbClickedAfterConfirm", true);// Confirmation call if changes made
	} else {
		merchantMgnt_onDbClickedAfterConfirm(true);
	}
}



//load data upon double click on main grid records
function merchantMgnt_onDbClickedAfterConfirm(yesNo) {
	_showProgressBar(true);
	if (yesNo == true) {
		
		var $table = $("#merchantMgntGridTbl_Id_" + _pageRef);
		var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
		var myObject = $table.jqGrid('getRowData', selectedRowId);
		
		var mCode = myObject["gtwAtmMerchantVO.MERCHANT_CODE"];
		
		var actionSrc = jQuery.contextPath
				+ "/path/merchants/MerchantMgntMaint_loadMerchantMgntDetails?merchantCode="
				+ mCode + "&_pageRef=" + _pageRef + "&iv_crud="
				+ $("#iv_crud_" + _pageRef).val();
		//The param here is the resulting JSP Page
		$.post(actionSrc, {}, function(param) {
			$("#merchantDetailsDiv_id_" + _pageRef).html(param);
			_showProgressBar(false);
		}, "html");

	}
	showHideSrchGrid('merchantMgntGridTbl_Id_' + _pageRef);
}

//reload upon clicking on new button
function merchantMgnt_onAddClicked ()
{
	var changes = $("#merchantMgntDefFormId_"+_pageRef).hasChanges();
	if(changes == 'true' || changes == true)
	{
		_showConfirmMsg(changes_made_confirm_msg,"","merchantMgnt_initializeAfterConfirm","yesNo");// Confirmation call if changes made
	}
	else
	{
		merchantMgnt_initializeAfterConfirm(true);
	}
}

function merchantMgnt_initializeAfterConfirm(yesNo)
{
	_showProgressBar(true);
	if(yesNo == true)
	{ 
		var iv_crud = $("#iv_crud_" + _pageRef).val();
		
		var actionSrc = jQuery.contextPath
				+ "/path/merchants/MerchantMgntMaint_loadMerchantMgntDetails?_pageRef="+_pageRef+"&iv_crud="+iv_crud;
		$.ajax( {
			url : actionSrc,
			type : "post",
			success : function(data) {
				$("#merchantDetailsDiv_id_" + _pageRef).html(data);
				_showProgressBar(false);
			}
		});
	}
}

