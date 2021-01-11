var returnOIDTKCardData = function()
{
	try
	{
		var OmanIDToolkit= document.getElementById('OmanIDToolkit');

		if(OmanIDToolkit.Init)
			{
			var ret = OmanIDToolkit.OpenCard;
			if(ret == 0) //success
			{
				OmanIDToolkit.DefaultDateFormat = "dd/mm/yyyy";
				var cardHolderType = OmanIDToolkit.GetCardholderType;
				var cardType = "Unknown";
				
				if(cardHolderType == 1)
					cardType = "Resident";
				else if(cardHolderType == 2)
					cardType = "Omani";
				
				var result = {
						'card_holder_type' : cardType,
						'CRN' : OmanIDToolkit.GetCrn,
						'full_name_english' : OmanIDToolkit.GetNameEn,
						'full_name_arabic' : OmanIDToolkit.GetNameAr,
						'date_of_birth' : OmanIDToolkit.GetBirthDate,
						'card_expiry_date' : OmanIDToolkit.GetCardExpiryDate,
						'nationality_english' : OmanIDToolkit.GetNationalityEn,
						'nationality_arabic' : OmanIDToolkit.GetNationalityAr,	
						'country_of_birth' : OmanIDToolkit.GetCountryOfBirthAr,
						'town_of_birth' : OmanIDToolkit.GetTownOfBirthAr,
						'sex_english' : OmanIDToolkit.GetGenderEn,
						'sex_arabic' : OmanIDToolkit.GetGenderAr,
						'csn' : OmanIDToolkit.GetCsn,
						'card_issue_date' : OmanIDToolkit.GetCardIssueDate,
						'card_issue_place_english' : OmanIDToolkit.GetCardIssuePlaceEn,
						'card_issue_place_arabic' : OmanIDToolkit.GetCardIssuePlaceAr,
						'current_address' : OmanIDToolkit.GetCurrentAddress,
						'fixed_phone_number' : OmanIDToolkit.GetFixedPhoneNumber,
						'mobile_phone_number' : OmanIDToolkit.GetMobilePhoneNumber,
						'religion_english' : OmanIDToolkit.GetReligionEn,
						'religion_arabic' : OmanIDToolkit.GetReligionAr,
						'disability_type_english' : OmanIDToolkit.GetDisabilityTypeEn,
						'disability_type_arabic' : OmanIDToolkit.GetDisabilityTypeAr,
						'occupation_english' : OmanIDToolkit.GetOccupationEn,
						'occupation_arabic' : OmanIDToolkit.GetOccupationAr,
						'employment_status_english' : OmanIDToolkit.GetEmploymentStatusEn,
						'employment_status_arabic' : OmanIDToolkit.GetEmploymentStatusAr,
						'education_level_english' : OmanIDToolkit.GetEducationLevelEn,
						'education_level_arabic' : OmanIDToolkit.GetEducationLevelAr,
						'work_permit_number' : OmanIDToolkit.GetWorkPermitNumber,
						'work_permit_expiry_date' : OmanIDToolkit.GetWorkPermitExpiryDate,
						'work_permit_office' : OmanIDToolkit.GetWorkPermitOfficeIssuedAr,
						'sponsor_name_english' : OmanIDToolkit.GetSponsorNameEn,
						'sponsor_name_arabic' : OmanIDToolkit.GetSponsorNameAr,
						'sponsor_address' : OmanIDToolkit.GetSponsorAddress,
						'sponsor_fixed_phone' : OmanIDToolkit.GetSponsorFixedPhone,
						'sponsor_mobile_phone' : OmanIDToolkit.GetSponsorMobilePhone,
						'sponsor_location' : OmanIDToolkit.GetSponsorLocation,
						'passport_number' : OmanIDToolkit.GetPassportNumber,
						'passport_country' : OmanIDToolkit.GetPassportCountry,
						'passport_issue_date' : OmanIDToolkit.GetPassportIssueDate,
						'passport_expiry_date' : OmanIDToolkit.GetPassportExpiryDate,
						'visa_type' : OmanIDToolkit.GetVisaType,
						'visa_number' : OmanIDToolkit.GetVisaNumber,
						'visa_issue_date' : OmanIDToolkit.GetVisaIssueDate,
						'visa_expiry_date' : OmanIDToolkit.GetVisaExpiryDate,
						'blood_group' : OmanIDToolkit.GetBloodGroup,
						'dl_number' : OmanIDToolkit.GetDrivingLicenseNumber,
						'dl_issue_date' : OmanIDToolkit.GetDrivingLicenseIssueDate,
						'dl_expiry_date' : OmanIDToolkit.GetDrivingLicenseExpiryDate,
						'dl_place_of_issue_arabic' : OmanIDToolkit.GetDrivingLicensePlaceOfIssueAr,
						'dl_place_of_issue_english' : OmanIDToolkit.GetDrivingLicensePlaceOfIssueEn,
						'dl_class1_english' : OmanIDToolkit.GetDLClass1En,
						'dl_class1_arabic' : OmanIDToolkit.GetDLClass1Ar,
						'dl_class2_english' : OmanIDToolkit.GetDLClass2En,
						'dl_class2_arabic' : OmanIDToolkit.GetDLClass2Ar,
						'dl_class3_english' : OmanIDToolkit.GetDLClass3En,
						'dl_class3_arabic' : OmanIDToolkit.GetDLClass3Ar,
						'dl_class4_english' : OmanIDToolkit.GetDLClass4En,
						'dl_class4_arabic' : OmanIDToolkit.GetDLClass4Ar,
						'dl_note1_english' : OmanIDToolkit.GetDLNote1En,
						'dl_note1_arabic' : OmanIDToolkit.GetDLNote1Ar,
						'dl_note2_english' : OmanIDToolkit.GetDLNote2En,
						'dl_note2_arabic' : OmanIDToolkit.GetDLNote2Ar,
						'dl_note3_english' : OmanIDToolkit.GetDLNote3En,
						'dl_note3_arabic' : OmanIDToolkit.GetDLNote3Ar,
						'dl_state' : OmanIDToolkit.GetDrivingLicenseState,
						'error_description' : "OK"
				}
				return result;
			}
			else
			{

				var error_codes = ["OK",
					"Error",
					"IdCardClosedOrNotFound",
					"KmsNotFound",
					"SamNotFound",
					"WrongSamtype",
					"NoCryptographicProvider",
					"IdCardNotAuthenticated",
					"IdCardClosed",
					"NullOrNotallowedData",
					"UnknownIdCardType",
					"WrongParameter",
					"NotEnoughtSmartCardReaders",
					"IdCardLocked",
					"IdCardLockedNotAuthenticated",
					"IdCardTerminated",
					"IssuanceDataNotFound"];

	            var error_code = "Unknown";
				if(ret >= 0 && ret < error_codes.length)
					error_code = error_codes[ret];
				return {'error_description' : error_code};	
			}
			}

	}catch(ex){
		
		return -1;	
	}	
}

function oid_matchFingerprint(civilID, cardSerial, tryMatch)
{
	var returnArray = new Object() ;
	returnArray = ["", 0, ""]; //OK = success
	
	try
	{
		var omanIDToolkit= document.getElementById('OmanIDToolkit');

		var ret = omanIDToolkit.Init;
		if(ret != true)//error
		{
			returnArray[0] = "Unable to initialize card reader"; //Error
			returnArray[1] = -98
			returnArray[2] = "E" //Error
			return returnArray;
		}
		
		//if passed, validate if its same card
		if(civilID !="" && cardSerial !="")
		{
			var ret = omanIDToolkit.OpenCard;
			if(ret != 0)//Error
			{
				var error_codes = ["OK","Error",
								  "IdCardClosedOrNotFound",
								  "KmsNotFound",
								  "SamNotFound",
								  "WrongSamtype",
								  "NoCryptographicProvider",
								  "IdCardNotAuthenticated",
								  "IdCardClosed",
								  "NullOrNotallowedData",
								  "UnknownIdCardType",
								  "WrongParameter",
								  "NotEnoughtSmartCardReaders",
								  "IdCardLocked",
								  "IdCardLockedNotAuthenticated",
								  "IdCardTerminated",
								  "IssuanceDataNotFound"];
								  
				var error_code = "Unknown";
				if(ret >= 0 && ret < error_codes.length)
					error_code = error_codes[ret];
				
				returnArray[0] = "Unable to open card:"+ error_code; //Error on open card
				returnArray[1] = -ret
				returnArray[2] = "E" //Error
				return returnArray;
			}

			//Get CRN and CSN
			var crn = omanIDToolkit.GetCrn;
			var csn = omanIDToolkit.GetCsn;
			
			if (parseInt(civilID) != parseInt(crn)  || cardSerial != csn)
			{
				returnArray[0] = "Card currently inserted is not the same card that was used for data fetching";
				returnArray[1] = -99
				returnArray[2] = "E" //Error
				return returnArray;
			}
		}
		
		if(tryMatch == 0){
			tryMatch = 3;
		
		omanIDToolkit.SetNumTryMatch(tryMatch);
		omanIDToolkit.SetFormBackgroundColorString("lightgray");//white, red, green, blue, gray, lightgray
		omanIDToolkit.SetFingerSelectedColorString("green");
		}
		
		var ret = omanIDToolkit.MatchFingerprint();	
		if(ret == 2)//success
		{
			returnArray[0] = "OK";
			returnArray[1] = 0;
			returnArray[2] = "I";//Information
			return returnArray;
		}
		
		var error_codes = ["MatchNOK","MatchOK","NoFingerprints","MatchingStopped","Error","Timeout"];
		var error_code = "Unknown";
		if(ret >= 1 && ret <= error_codes.length)
			error_code = error_codes[ret-1];//as per sample html it is ret -1
		
		returnArray[0] = "Fingerprint match failed: " + error_code;
		returnArray[1] = -ret
		returnArray[2] = "W" //Warning - match failed
		return returnArray;
	}catch (e)
	{
		returnArray[0] = "Exception in finger match:" + e.message;
		returnArray[1] = -100
		returnArray[2] = "E" //Error
	}
	return returnArray;
}


