
function initAddFields()
{
	var id = $("#additionalFieldsByTypeRowCount_"+_pageRef).val();
	var compareToElementId;
	for(var i=0; i<id; i++ )
	{
		var fieldType = $("#additionalFieldsByTypeFieldType_"+i+"_"+_pageRef).val();
		var fieldSeq = $("#additionalFieldsByTypeFieldSeq_"+i+"_"+_pageRef).val();
		if (fieldType != null && fieldType != "" && fieldType != "undefined")
		{
			if(fieldType == "D")
			{
				var dateValidation = $("#additionalFieldsByTypeDateValidation_"+fieldSeq).val();
				if(dateValidation == "C" || dateValidation == "A" || dateValidation == "X")
					setCompareToFieldLabel("additionalFieldsByTypeAddDateCompareToElemId_"+fieldSeq, "additionalFieldsByTypeAddDateCompareToElemLabel_"+fieldSeq)
			}
			else if(fieldType == "N")
			{
				setCompareToFieldLabel("additionalFieldsByTypeAddParam1CompareToElemId_"+fieldSeq+"_"+_pageRef, "additionalFieldsByTypeAddParam1CompareToElemLabel_"+fieldSeq+"_"+_pageRef)
				setCompareToFieldLabel("additionalFieldsByTypeAddParam2CompareToElemId_"+fieldSeq+"_"+_pageRef, "additionalFieldsByTypeAddParam2CompareToElemLabel_"+fieldSeq+"_"+_pageRef)
				setCompareToFieldLabel("additionalFieldsByTypeAddParam3CompareToElemId_"+fieldSeq+"_"+_pageRef, "additionalFieldsByTypeAddParam3CompareToElemLabel_"+fieldSeq+"_"+_pageRef)
				setCompareToFieldLabel("additionalFieldsByTypeAddParam4CompareToElemId_"+fieldSeq+"_"+_pageRef, "additionalFieldsByTypeAddParam4CompareToElemLabel_"+fieldSeq+"_"+_pageRef)
				setCompareToFieldLabel("additionalFieldsByTypeAddParam5CompareToElemId_"+fieldSeq+"_"+_pageRef, "additionalFieldsByTypeAddParam5CompareToElemLabel_"+fieldSeq+"_"+_pageRef)
			
				var checkDesc = $("#additionalFieldsByTypeLookupDesc_"+i+"_"+_pageRef).val();
				if(checkDesc == "C1" || checkDesc == "A1" || checkDesc == "X1")
				{
					var isNumber = $("#additionalFieldsByTypeNumberDependency_"+fieldSeq).val();
					if(isNumber == 'true')
						$("#addFieldsByType_"+i+"_"+_pageRef).trigger('change');
					else
						$("#lookuptxt_addFieldsByType_"+i+"_"+_pageRef).trigger('change');
				}
			}
		}
	}
}

function setCompareToFieldLabel(elemName, elemId)
{
	var compareToElementId = $("#"+elemName).val();
	if(compareToElementId != null && compareToElementId != 'undefined')
	{
		$label = $("label[for='"+compareToElementId+"']");
		if($label.html() != null)
		{
			$("#"+elemId).val($label.html());			
		}
	}
}

function additionalFieldsByType_onSaveClicked(divId, formId, applyAudit, auditClassName, auditRef, auditOpt){
		var id = $("#additionalFieldsByTypeRowCount_"+_pageRef).val();
		//added by Marie-Joe for tp#675239
		var changes = $("#additionalFieldsByTypeForm_" + _pageRef).length == 0? false: $("#additionalFieldsByTypeForm_" + _pageRef).hasChanges();
		if (changes == false)
		{
			_showErrorMsg(changes_not_available_key); 
		}
		else
		//end tp#675239
		{
			for(var i=1; i<id; i++ )
			{
				var fieldType = $("#additionalFieldsByTypeFieldType_"+i+"_"+_pageRef).val();
				if(fieldType == "D" ){
					var compareToElementId = $("#additionalFieldsByTypeAddDateCompareToElemId_"+i);
					if(typeof compareToElementId != "undefined") 
						compareToElementValue = $("#"+compareToElementId.val()).val();
					var fieldSeq = $("#additionalFieldsByTypeFieldSeq_"+i+"_"+_pageRef).val();
					$("#additionalFieldsByTypeAddDateCompareTo_"+fieldSeq).val(compareToElementValue);
				}
				i++;
			}
			
			_showProgressBar(true);
				
			var cifStatus = $("#cifVO_STATUS_"+ _pageRef).val();
			var iv_crud = $("#iv_crud_"+ _pageRef).val();
			var cif_UpdateDate = $("#cifVO_DATE_UPDATED_"+ _pageRef).val();
			var compCodeCif = $("#compCodeCif_" + _pageRef).val();
				
			var contactsForm  = $("#additionalFieldsByTypeForm_"+_pageRef).serializeForm();
			var theForm 	  = contactsForm;
			
			//Audit Implementation
			var applyAuditParam = (applyAudit != undefined && applyAudit == true);
			if(applyAuditParam)
			{
				theForm = theForm + '&additionalFieldsByTypeCO.applyAudit=' + applyAuditParam 
								  + '&additionalFieldsByTypeCO.auditClassName=' + auditClassName
								  + '&additionalFieldsByTypeCO.auditRef=' + auditRef
								  + '&additionalFieldsByTypeCO.auditOpt=' + auditOpt;
			}
			
			$.ajax({
				 url: jQuery.contextPath+ "/path/additionalFields/additionalFieldsByType_saveAdditionalFieldsDetails.action?cifStatus="+cifStatus+"&iv_crud="+iv_crud+"&cif_UpdateDate="+cif_UpdateDate+"&compCodeCif="+compCodeCif,
		         type:"post",
				 dataType:"json",
				 data: theForm,
				 success: function(data){
					if (typeof data["_error"] == "undefined" || data["_error"] == null)
					{
						//var cifStatus = data["limitSchemaCO"]["cifVo"]["STATUS"];
						//var latestCifupdateDate = data["limitSchemaCO"]["latestDateUpdated"];
						//changeCIFValues(cifStatus,latestCifupdateDate);
						
						changeCIFValues(data.cifStatus,data.latestCifupdateDate);//Abdo TP##641518 21/03/2018
						$("#"+divId).dialog("destroy"); //.appendTo("#"+formId);	
					}
				 	_showProgressBar(false);
				 }
				
		    });
		}
		
}
