package com.path.atm.bo.merchantmgnt;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class MerchantMgntConstant
{

    public static final BigDecimal MERCHANTMGNT_STATUS_SYS_PARAM_LOV_TYPE = new BigDecimal(1741);
    // statuses
    public static final String STATUS_ACTIVE = "A";
    public static final String STATUS_APPROVED = "P";
    public static final String STATUS_MODIFIED = "M";
    public static final String STATUS_TO_BE_DELETED = "TD";
    public static final String STATUS_DELETED = "D";
    public static final String STATUS_TO_BE_SUSPENDED = "TS";
    public static final String STATUS_SUSPENDED = "S";
    public static final String STATUS_TO_BE_REACTIVATED = "TR";
    public static final String STATUS_REACTIVATED = "A";
//	temporary disable web service call
//    public static final String TELLER_BRANCH_CODE = "teller.branchCode";
//    public static final String TELLER_USER_ID = "teller.userID";
//    public static final String TELLER_PASSWORD = "teller.password";
    
    // OPT
    public static final String PARENT_OPT = "MER00";
    
    public static final String IBAN = "IBAN";
    public static final String Additional_Ref = "acc_additional_ref";

    
    
  //**************************************    Message Codes 	********************************************************
    //start from 30000 and end 35000
    // temporary disable web service call
    // public static final Integer MERCHANT_IBAN_NOT_VALID							= 32878;
    // public static final Integer MERCHANT_ACCOUNT_REF_NOT_VALID						= 32879;
    
    //******************************************************************************************************************************
    
    
    // A static hashMap for Merchants Status
    public static final List<String> MERCHANTMGNT_STATUS_LST = new ArrayList<String>();
    static
    {
	MERCHANTMGNT_STATUS_LST.add("CREATED_BY," + STATUS_ACTIVE +      ",CREATED_DATE");
	MERCHANTMGNT_STATUS_LST.add("APPROVED_BY," + STATUS_APPROVED +   ",APPROVED_DATE");
	MERCHANTMGNT_STATUS_LST.add("MODIFIED_BY," + STATUS_MODIFIED +   ",MODIFIED_DATE");	
	MERCHANTMGNT_STATUS_LST.add("SUSPENDED_BY," + STATUS_SUSPENDED + ",SUSPENDED_DATE");
	MERCHANTMGNT_STATUS_LST.add("DELETED_BY," + STATUS_DELETED +     ",DELETED_DATE");
    }
      
}
