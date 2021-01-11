function submitFn() {
	var openInDialog = $("#openInDialog").val();
	var appLocationType = $("#app_location_type").val();
	if (appLocationType == "1" &&( $("#lookuptxt_COMP_CODE").val() == "")) 
	{
	    _showErrorMsg(company_required_key);
	} 
	else
	{
		if(appLocationType == "0" && ($("#lookuptxt_COMP_CODE").val() == "" || $("#lookuptxt_BRANCH_CODE").val() == "")) 
		{
		    _showErrorMsg(company_branch_required_key);
		    return;
		}
		_showProgressBar(true);
		if (openInDialog!="true" || appLocationType === "2") {
			submitEncryptedData('compBrForm');
		} 
		else 
		{
			var theForm = $("#compBrForm").serializeForm();
			$.ajax( {
				url : jQuery.contextPath
						+ "/pathdesktop/switchCompAction_checkLoginCompBr",
				type : "post",
				data : theForm,
				success : function(data) 
				{
					_showProgressBar(false);
				    try
				    {
				    	var jsonResponse = JSON.parse(data);
						if (typeof jsonResponse["_error"] == "undefined" || jsonResponse["_error"] == null) 
						{
							submitEncryptedData('compBrForm');
						}
						else
						{
						   _showErrorMsg(jsonResponse["_error"]);	
						}
				    }
				    catch(e)
				    {
				    	$("#switchCompDivId").html(data);
				    }
				}
			});
		}
	}
}


function submitWelcomeFn()
{
	$('#compBrForm').attr("action", jQuery.contextPath +'/pathdesktop/loginCompBrAction_moduleRedirect');
	submitEncryptedData('compBrForm');
	_showProgressBar(true);
}

jQuery(document).ready(function()
{
	if ($("#lookuptxt_COMP_CODE").val() == "")
	{
		liveSearch_makeReadOnly(true, "BRANCH_CODE");
	}
	
	if ($("#lookuptxt_BRANCH_CODE").length > 0)
	{
		// ie issue with forcing mutiple click on input when become editable, might need to find better solutions
		$("#lookuptxt_BRANCH_CODE").click(function(){ 
			if($.browser.msie && $("#lookuptxt_COMP_CODE").val() !== "")
			{
				$("#lookuptxt_BRANCH_CODE").removeAttr("readOnly");
				$("#lookuptxt_BRANCH_CODE").blur();
				$("#lookuptxt_BRANCH_CODE").focus();
			}
		});
	}
	
	if ($("#continueWelcBtn").length > 0)
	{
		$('#continueWelcBtn').focus();
	}
});
