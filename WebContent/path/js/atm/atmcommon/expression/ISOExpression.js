/**
 * set Values of Global Expression
 * @returns
 */
function ISOExpression_setValues(params)
{
	 var isGlobalExpression =  $("#expressionIsGlobal_"+_pageRef).val();
	 var shortName = $("#expressionShortName_"+_pageRef).val();
	 var expressionDescription = $("#expressionDescription_"+_pageRef).val();
		
     if(common_isVariableValueNoEmpty(isGlobalExpression) && isGlobalExpression == 'Y')
     {
    	 params["customExpressionSC.addToExpressionList"] = isGlobalExpression;
    	 params["customExpressionSC.shortName"] = shortName;
    	 params["customExpressionSC.description"] = expressionDescription;
     }
     return params;
}


/**
 * validate Expression Fields After clicking ok button
 * @returns
 */
function ISOExpression_validateCustomExpressionFields()
{
	var isGlobal =  $("#isGlobal_"+_pageRef+":checked").val()
	if(isGlobal)
	{
		var shortName = $("#shortName_"+_pageRef).val();
		var description = $("#description_"+_pageRef).val();
		var expression = $("#gridOutputId_"+_pageRef).val();
		
		if(!common_isVariableValueNoEmpty(shortName))
		{
			_showErrorMsg(fill_expression_short_name_key, info_msg_title,300, 100);
			return false;
		}
		else 
			if(!common_isVariableValueNoEmpty(description))
			{
				_showErrorMsg(fill_expression_description_name_key, info_msg_title,300, 100);
				return false;
			}
		else 
			if(!common_isVariableValueNoEmpty(expression))
			{
				_showErrorMsg(fill_expression_key, info_msg_title,300, 100);
				return false;
			}
	}
	return true;
}



/**
 * Set Global expression data
 * @returns
 */
function ISOExpression_setCustomExpressionData(diaogFrom)
{
	var isGlobal =  $("#isGlobal_"+_pageRef+":checked").val() == "true" ? 'Y' : 'N';
	var shortName = $("#shortName_"+_pageRef).val();
	var description = $("#description_"+_pageRef).val();
	var expression = $("#gridOutputId_"+_pageRef).val();
	
	var dialogOpenFrom = $("#dialogOpenFrom_"+_pageRef).val();
	if(diaogFrom == "form")
	{
		$("#expressionIsGlobal_"+_pageRef).val(isGlobal);
		$("#expressionShortName_"+_pageRef).val(shortName);
		$("#expressionDescription_"+_pageRef).val(description);
		$("#expression_"+_pageRef).val(expression);
	}
}

/**
 * Save Custom Expression
 * @returns
 */
function ISOExpression_save(evt)
{

	var isGlobal =  $("#isGlobal_"+_pageRef+":checked").val()
	if(!isGlobal) return;
	
	var action = jQuery.contextPath
	+ "/path/customexpression/CustomExpressionMaintAction_save.action";

	var formData = $("#customExpressionFormId_" + _pageRef).serializeForm();
		
	_showProgressBar(true);
	$.ajax({
		url : action,
		type : "post",
		data : formData,
		dataType : "json",
		success : function(data)
		{
			if (typeof data["_error"] == "undefined" || data["_error"] == null)
			{
				// call clear function
				_showProgressBar(false);
			}
			else
			{
				_showProgressBar(false);
			}
		}
	
	});
} 


/**
 * call validate function while unchecked for hide the error messages
 * @returns
 */
function ISOExpression_hideErrorMessage()
{
	var isGlobal =  $("#isGlobal_"+_pageRef+":checked").val()
	if(!isGlobal)
	{
		common_validateForm("customExpressionFormId");
	}
}