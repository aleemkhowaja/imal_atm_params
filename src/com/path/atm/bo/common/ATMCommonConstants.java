package com.path.atm.bo.common;

import java.math.BigDecimal;

/**
 * 
 * Copyright 2019, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: Alim Khowaja
 *
 * ATMCommonConstants.java used to
 */
public class ATMCommonConstants
{


    // Status
    public static final String STATUS_CREATED = "0_C";
    public static final String STATUS_MODIFIED = "0_M";
    public static final String STATUS_CREATE = "CR";
    public static final String STATUS_ACTIVE = "A";
    public static final String STATUS_DELETED = "D";
    public static final String STATUS_APPROVED = "P";
    public static final String STATUS_SUSPENDED = "S";
    public static final String STATUS_REACTIVATE = "RA";
    public static final String STATUS_APPROVE_REJECTED = "R";
    public static final String STATUS_UPDATE_AFTER_APPROVE = "UP";
    public static final String STATUS_APPROVED_I = "I";
    
    public static final String ACTIVE = "active_key";
    public static final String CREATE = "create_key";
    

    public static final boolean TRUE_BOOLEAN = true;
    public static final boolean FALSE_BOOLEAN = false;
    public static final String STATUS_COLOR_CODE_B = "B";
    public static final String APP_NAME_GTW = "GTW";
    public static final String APP_NAME_RET = "RET";
    public static final String APP_NAME_ATMP = "ATMP";
    public static final String APP_NAME_ATME = "ATME";

    // used to exclude sum values of the LOV

    // used to compare sum variables
    public static final String APPLY_ON_PARENT = "P";
    public static final String APPLY_ON_RELATION = "R";
    public static final String YES = "Y";
    public static final String NO = "N";
    public static final BigDecimal TELLER_TYPE_VALET = new BigDecimal(12);

    /**
     * ATM Constants
     */
    // LOV ID
    public static final BigDecimal LOV_TYPE_CONS_COMMON_STATUS = new BigDecimal(949);
    public static final BigDecimal ATM_ENGINE_INTERFACE_STATUS_LOV = new BigDecimal(1799);
    public static final BigDecimal ATM_ENGINE_REQUEST_MESSAGE_STATUS_LOV = new BigDecimal(1802);


    // IV CRUD VALUES
    public static final String IV_CRUD_MAINTENANCE = "R";
    public static final String IV_CRUD_APPROVE = "P";
    public static final String IV_CRUD_UPDATE_AFTER_APPROVE = "UP";
    public static final String IV_CRUD_SUSPENDED = "S";
    public static final String IV_CRUD_REACTIVATE = "RA";

    // ISO Field Types
    public static final String ISO_FIELD_TYPE_NUMERIC = "N";
    public static final String ISO_FIELD_TYPE_BINARY = "B";
    public static final String ISO_FIELD_TYPE_ALPHA = "V";
    public static final String ISO_FIELD_TYPE_BITMAP = "T";
    public static final String ISO_FIELD_TYPE_AMOUNT = "A";
    public static final String ISO_FIELD_TYPE_DATE10 = "D";
    public static final String ISO_FIELD_TYPE_DATE4 = "M";
    public static final String ISO_FIELD_TYPE_TIME = "H";
    public static final String ISO_FIELD_TYPE_EXP_DATE = "E";
    
    public static final String DYNAMIC_FILE_MESSAGE = "DYNAMIC_FILE_MESSAGE";
    public static final String DYNAMIC_FILE_TAGS = "DYNAMIC_FILE_TAGS";
    public static final String DYNAMIC_FILE_STRUCTURE = "DYNAMIC_FILE_STRUCTURE";
    public static final String IMCO_DYN_FILE_VALUES_TMP = "IMCO_DYN_FILE_VALUES_TMP";

    public static final BigDecimal CONDITION_OPERATOR_LOV = new BigDecimal(7);
    public static final BigDecimal CONDITION_PB_FUNCTIONS = new BigDecimal(502);
    public static final BigDecimal COMMON_STATUS_LOV = new BigDecimal(1478);

    public static final String RET_SERVICE_URL = "integration.RET.serviceURL";
    public static final String RET_SERVICE_REMOTING = "PathATMPRemoting.properties";
    
    public static final String GTW_SERVICE_URL = "gateway.serviceURL";
    public static final String GTW_SERVICE_EXPORTER = "customExpressionService";
    public static final String GTW_SERVICE_REMOTING = "PathATMPRemoting.properties";
    
    
    public static final String ATME_SERVICE_URL = "atmEngine.serviceURL";
    public static final String ATME_SERVICE_REMOTING = "PathAtmEngineRemoting.properties";
    
    public static final String EXPRESSION_BO_WEB_SERVICE_NAME = "customExpressionBOWs";
    public static final String EXPRESSION_LIST_METHOD_NAME = "returnExpressionList";
    public static final String EXPRESSION_SAVE_METHOD_NAME = "saveGTW_CUSTOM_EXPRESSION";
    public static final String EXPRESSION_BY_SHORT_NAME_METHOD_NAME = "returnExpressionByShortName";
    
    public static final String TELLER_BO_WEB_SERVICE_NAME = "tellerWsBO";
    public static final String TELLER_BO_LIST_METHOD_NAME = "returnTellersList";
    public static final String TELLER_BO_DETAIL_METHOD_NAME = "returnTellerDetails";
    
    public static final String RESPONSE_STATUS_START = "START";
    public static final String RESPONSE_STATUS_STOP = "STOP";
    
    /**
     * File import and Export constants
     */
    public static final String FILE_EXPORT_PASS = "P@thATM%1$2#3-AM";
    public static final String INTERFACE_FILE_NAME = "Interface";
    
    public static final String ACQUIRER_PROG_REF = "ACQDEFMT";
    public static final String TERMINAL_PROG_REF = "TRMNLDEFMT";
    public static final String ISO_MSG_DEF_PROG_REF = "ISOMSGDEFMT";
    public static final String MERCHANT_PROG_REF ="MER00MT";
    
    
    public static final String RUNNING = "R";
}