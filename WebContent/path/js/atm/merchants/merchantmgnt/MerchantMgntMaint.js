/**
 * This funnction will be called upon clicking on status button
 * 
 * @param {Object}
 *            param
 */
function merchantMgnt_onStatusClicked()
{
	var merchantCode = $("#code_" + _pageRef).val();
	if (merchantCode == "")
		return;
	var loadSrc = jQuery.contextPath
			+ "/path/merchants/MerchantMgntStatus_search.action?code="
			+ merchantCode + "&_pageRef=" + _pageRef;
	showStatus("merchantMgntDefFormId_" + _pageRef, _pageRef, loadSrc, {});
}

/**
 * upon clicking on button "Account Validate" Opening Screen By Muneer Ahmed
 */

// used for save/delete/approve/reactivate
function merchantMgnt_setMethodName(methodName)
{
	$("#methodName_" + _pageRef).val(methodName);
}


function merchantMgnt_conformOnButton()
{
	var methodName = $("#methodName_" + _pageRef).val();
	
	if (methodName == 'delete')
	{
		_showConfirmMsg(Confirm_Delete_Process_key, info_msg_title,
				"merchantMgnt_BtnFunc", {}, '', '', 300, 100);
	}
	else if (methodName == 'approve')
	{
		_showConfirmMsg(Confirm_Approve_Process_key, info_msg_title,
				"merchantMgnt_BtnFunc", {}, '', '', 300, 100);
	}
	else if (methodName == 'approveDelete')
	{
		_showConfirmMsg(confirm_approve_delete_process_key, info_msg_title,
				"merchantMgnt_BtnFunc", {}, '', '', 300, 100);
	}
	else if (methodName == 'suspend')
	{
		_showConfirmMsg(Confirm_Suspend_Process_key, info_msg_title,
				"merchantMgnt_BtnFunc", {}, '', '', 300, 100);
	}
	else if (methodName == 'approveSuspend')
	{
		_showConfirmMsg(confirm_approve_suspend_process_key, info_msg_title,
				"merchantMgnt_BtnFunc", {}, '', '', 300, 100);
	}
	else if (methodName == 'reactivate')
	{
		_showConfirmMsg(Confirm_Reactivate_Process_key, info_msg_title,
				"merchantMgnt_BtnFunc", {}, '', '', 300, 100);
	}
	else if (methodName == 'approveReactivate')
	{
		_showConfirmMsg(confirm_approve_reactivate_process_key, info_msg_title,
				"merchantMgnt_BtnFunc", {}, '', '', 300, 100);
	}
	else
	{
		merchantMgnt_BtnFunc(true, {});
	}
}


// used for save/delete/approve
function merchantMgnt_BtnFunc(confirm, args)
{
	if (confirm)
	{
		var method_name = $("#methodName_" + _pageRef).val();

		if (method_name == 'saveNew')
		{

			var iban = $("#IBAN_" + _pageRef).val();
			var acc_additional_ref = $("#acc_additional_ref_" + _pageRef).val();

			if (iban.length <= 0 && acc_additional_ref.length <= 0)
			{
				_showErrorMsg(merchant_acc_req_val, info_msg_title, 300, 100);
				return;
			}
			applyMerchantMgntFunct(method_name);
		}
		else
		{
			applyMerchantMgntFunct(method_name);
		}
	}
}



// used for save/approve/delete etc all CRUD operations
function applyMerchantMgntFunct(methodName)
{
	var iv_crud = $("#iv_crud_" + _pageRef).val();
	var changes = "";
	if (methodName == 'saveNew')
	{
		changes = $("#merchantMgntDefFormId_" + _pageRef).hasChanges(true);
	}
	if ((changes == 'true' || changes == true) || (methodName != 'saveNew'))
	{
		var actionSrc = jQuery.contextPath
				+ "/path/merchants/MerchantMgntMaint_" + methodName
				+ "?iv_crud=" + iv_crud;

		parseNumbers();
		var theForm = $("#merchantMgntDefFormId_" + _pageRef).serializeForm(); // take
		// all the data to the java
		_showProgressBar(true);
		$.ajax({
			url : actionSrc,
			type : "post",
			dataType : "json",
			data : theForm,
			success : function(data)
			{
				_showProgressBar(false);
				if (data["_error"] == null)
				{
					// Code to show alert for the action performed
					if (methodName == 'saveNew')
					{
						_showErrorMsg(record_saved_Successfully_key,
								info_msg_title, 300, 100);
						if (iv_crud == 'UP')
						{
							showHideSrchGrid('merchantMgntGridTbl_Id_'
									+ _pageRef);
							$("#merchantDetailsDiv_id_" + _pageRef).html("");
						}
						else
						{
							merchantmgnt_initializeAfterConfirm(true);
						}
					}
					else if (methodName == 'delete')
					{
						_showErrorMsg(record_was_Deleted_Successfully_key,
								info_msg_title, 300, 100);
						
						showHideSrchGrid('merchantMgntGridTbl_Id_' + _pageRef);
						$("#merchantDetailsDiv_id_" + _pageRef).html("");
					}
					else if (methodName == 'approveDelete')
					{
						_showErrorMsg(deleted_record_approved_successfully_key,
								info_msg_title, 300, 100);
						
						showHideSrchGrid('merchantMgntGridTbl_Id_' + _pageRef);
						$("#merchantDetailsDiv_id_" + _pageRef).html("");
					}
					else if (methodName == 'approve')
					{
						_showErrorMsg(record_was_Approved_Successfully_key,
								info_msg_title, 300, 100);
						showHideSrchGrid('merchantMgntGridTbl_Id_' + _pageRef);
						$("#merchantDetailsDiv_id_" + _pageRef).html("");
					}
					else if (methodName == 'suspend')
					{
						_showErrorMsg(record_was_Suspended_Successfully_key,
								info_msg_title, 300, 100);
						
						showHideSrchGrid('merchantMgntGridTbl_Id_' + _pageRef);
						$("#merchantDetailsDiv_id_" + _pageRef).html("");
					}
					else if (methodName == 'approveSuspend')
					{
						_showErrorMsg(suspended_record_approved_successfully_key,
								info_msg_title, 300, 100);
						
						showHideSrchGrid('merchantMgntGridTbl_Id_' + _pageRef);
						$("#merchantDetailsDiv_id_" + _pageRef).html("");
					}

					else if (methodName == 'reactivate')
					{
						_showErrorMsg(record_reactivated_successfully_key,
								info_msg_title, 300, 100);
						
						showHideSrchGrid('merchantMgntGridTbl_Id_' + _pageRef);
						$("#merchantDetailsDiv_id_" + _pageRef).html("");
					}
					else if (methodName == 'approveReactivate')
					{
						_showErrorMsg(reactivated_record_approved_successfully_key,
								info_msg_title, 300, 100);
						
						showHideSrchGrid('merchantMgntGridTbl_Id_' + _pageRef);
						$("#merchantDetailsDiv_id_" + _pageRef).html("");
					}

					$("#merchantMgntGridTbl_Id_" + _pageRef).trigger(
							"reloadGrid");
				}
			}
		});
	}
}

function merchantmgnt_continueProcessAfterConfirm(yesNo, args)
{
	if (yesNo)
	{
		var methodName = args.methodName;
		applyMerchantMgntFunct(methodName, true);

		return false;
	}
	else
	{
		_showProgressBar(false);
	}
}

function merchantmgnt_initializeAfterConfirm(yesNo)
{
	if (yesNo == true)
	{
		var iv_crud = $("#iv_crud_" + _pageRef).val();
		var actionSrc = jQuery.contextPath
				+ "/path/merchants/MerchantMgntMaint_loadMerchantMgntDetails?_pageRef="
				+ _pageRef + "&iv_crud=" + iv_crud;
		$.ajax({
			url : actionSrc,
			type : "post",
			success : function(data)
			{
				$("#merchantDetailsDiv_id_" + _pageRef).html(data);
			}
		});
	}
}
