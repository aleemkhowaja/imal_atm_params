package com.path.atm.actions.merchantmgnt;

import java.math.BigDecimal;

import org.apache.struts2.json.JSONException;

import com.path.atm.actions.common.base.ATMBaseAction;
import com.path.atm.bo.common.ATMCommonConstants;
import com.path.atm.bo.merchantmgnt.MerchantMgntBO;
import com.path.atm.bo.merchantmgnt.MerchantMgntConstant;
import com.path.atm.vo.merchantmgnt.MerchantMgntCO;
import com.path.atm.vo.merchantmgnt.MerchantMgntSC;
import com.path.bo.common.audit.AuditConstant;
import com.path.lib.common.exception.BaseException;
import com.path.lib.common.util.NumberUtil;
import com.path.vo.common.SessionCO;
import com.path.vo.common.audit.AuditRefCO;

/**
 * 
 * Copyright 2013, Path Solutions Path Solutions retains all ownership rights to
 * this source code
 * 
 * @author: Muneer Ahmed
 * 
 * 
 */
public class MerchantMgntMaintAction extends ATMBaseAction
{
    private MerchantMgntCO merchantMgntCO = new MerchantMgntCO();
    private MerchantMgntBO merchantMgntBO;
    private BigDecimal merchantCode;
    		       
//    private String _toolBarMode = "false";
    private MerchantMgntSC merchantMgntSC = new MerchantMgntSC();

    public Object getModel()
    {
	return merchantMgntCO;
    }

    /**
     * First function to be executed when loading merchantmgnt maintenance page
     * 
     * @return
     */

    public String initialiseMerchantMgntPage()
    {

	try
	{
	    SessionCO sessionCO = returnSessionObject();
	    fillDefaultValues(sessionCO);

	    if(getIv_crud().equalsIgnoreCase("R"))
	    {
		set_showNewInfoBtn("true");
		set_showSmartInfoBtn("false");
		set_recReadOnly("false");

	    }
	    else
	    {
		set_showNewInfoBtn("false");
		set_showSmartInfoBtn("false");
		set_recReadOnly("true");
	    }
	    merchantMgntCO.setStatusDesc(getText(ATMCommonConstants.CREATE));
	    merchantMgntCO.setStatusColorCode(getStatusColorCode(ATMCommonConstants.STATUS_CREATE, ATMCommonConstants.STATUS_COLOR_CODE_B));
	    set_searchGridId("merchantMgntGridTbl_Id");
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return "loadMerchantMgntPage";
    }

    public void fillDefaultValues(SessionCO sessionCO) throws BaseException {
	fillSessionData(sessionCO);
	merchantMgntCO.getGtwAtmMerchantVO().setCREATED_DATE(merchantMgntCO.getRunningDate());
    }

    /**
     * @author Muneer Ahmed This function is called when double clicking on a
     *         record and upon clicking on new. It displays the selected record
     *         under MerchantMgntMaint.jsp page
     * @return merchantMgnttMaint
     * @throws JSONException
     */
    public String loadMerchantMgntDetails()
    {
	try
	{
	    SessionCO sessionCO = returnSessionObject();
	    fillDefaultValues(sessionCO);
	    if(!NumberUtil.isEmptyDecimal(getMerchantCode()))
	    {
		merchantMgntSC.setCompCode(sessionCO.getCompanyCode());
		merchantMgntSC.setBranchCode(sessionCO.getBranchCode());
		merchantMgntSC.setLang(sessionCO.getLanguage());
		merchantMgntSC.setPreferredLanguage(sessionCO.getPreferredLanguage());
		merchantMgntSC.setCode(getMerchantCode());
		merchantMgntSC.setProgRef(get_pageRef());
		merchantMgntSC.setLovType(MerchantMgntConstant.MERCHANTMGNT_STATUS_SYS_PARAM_LOV_TYPE);

		// fill them on other method
		merchantMgntCO = merchantMgntBO.returnMerchantMgntDetails(merchantMgntSC);//		
		merchantMgntCO.setStatusColorCode(getStatusColorCode(merchantMgntCO.getGtwAtmMerchantVO().getSTATUS(), ATMCommonConstants.STATUS_COLOR_CODE_B));

		getAdditionalScreenParams().putAll(merchantMgntCO.getElementMap());

		if((getIv_crud().equalsIgnoreCase("R"))
			&& (merchantMgntCO.getGtwAtmMerchantVO().getSTATUS()
				.equalsIgnoreCase(MerchantMgntConstant.STATUS_ACTIVE))
			|| (((getIv_crud().equalsIgnoreCase("UP"))) && (merchantMgntCO.getGtwAtmMerchantVO().getSTATUS()
				.equalsIgnoreCase(MerchantMgntConstant.STATUS_APPROVED))))
		{
		    set_recReadOnly("false");
		}
		else
		{
		    set_recReadOnly("true");
		}

		// For Auditing
		applyRetrieveAudit(AuditConstant.MERCHANT_DEFINITION_KEY_REF, merchantMgntCO.getGtwAtmMerchantVO(),
			merchantMgntCO);
	    }
	}
	catch(Exception ex)
	{
	    handleException(ex, null, null);
	}
	return "loadMerchantMgntMaintPage";
    }

  
    /*
     * this function save / update new record
     */
    public String saveNew() throws BaseException
    {
	
	try
	{
	    SessionCO sessionCO = returnSessionObject();
	    fillSessionData(sessionCO);

	    AuditRefCO refCO = initAuditRefCO();	    
	    merchantMgntCO.setAuditRefCO(refCO);
	    
	    if(NumberUtil.isEmptyDecimal(merchantMgntCO.getGtwAtmMerchantVO().getMERCHANT_CODE()))
	    {		
		setAuditCommon(refCO, AuditConstant.CREATED);
	    }
	    else
	    {		
		setAuditCommon(refCO, AuditConstant.UPDATE);
		merchantMgntCO.setAuditObj(returnAuditObject(merchantMgntCO.getClass()));
	    }	    
	    merchantMgntCO = merchantMgntBO.saveMerchantMgnt(merchantMgntCO);
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return "success";
    }

    /*
     * this function approve new record the record status should be Active
     */
    public String approve() throws BaseException
    {
	try
	{
	    SessionCO sessionCO = returnSessionObject();
	    fillSessionData(sessionCO);

	    // construct Audit Reference
	    AuditRefCO refCO = initAuditRefCO();
	    setAuditCommon(refCO, AuditConstant.UPDATE);
	    merchantMgntCO.setAuditRefCO(refCO);
	    merchantMgntCO.setAuditObj(returnAuditObject(merchantMgntCO.getClass()));

	    merchantMgntCO = merchantMgntBO.approveMerchantMgnt(merchantMgntCO);

	}
	catch(Exception ex)
	{
	    handleException(ex, null, null);
	}

	return "success";
    }

    /*
     * this function delete record the record status should be Active or Approve
     */
    public String delete()
    {

	try
	{
	    SessionCO sessionCO = returnSessionObject();
	    fillSessionData(sessionCO);

	    // construct Audit Reference
	    AuditRefCO refCO = initAuditRefCO();
	    setAuditCommon(refCO, AuditConstant.UPDATE);	    
	    merchantMgntCO.setAuditRefCO(refCO);
	    merchantMgntCO.setAuditObj(returnAuditObject(merchantMgntCO.getClass()));

	    merchantMgntBO.deleteMerchantMgnt(merchantMgntCO);
	}
	catch(Exception ex)
	{
	    handleException(ex, null, null);
	}

	return "success";
    }

    /*
     * this function approve delete record the record status should be Delete
     */
    public String approveDelete()
    {

	try
	{
	    SessionCO sessionCO = returnSessionObject();
	    fillSessionData(sessionCO);

	    // construct Audit Reference
	    AuditRefCO refCO = initAuditRefCO();
	    setAuditCommon(refCO, AuditConstant.UPDATE);
	    merchantMgntCO.setAuditRefCO(refCO);
	    merchantMgntCO.setAuditObj(returnAuditObject(merchantMgntCO.getClass()));

	    merchantMgntBO.approveDeleteMerchantMgnt(merchantMgntCO);
	}
	catch(Exception ex)
	{
	    handleException(ex, null, null);
	}

	return "success";
    }

    /*
     * this function reactivate record the record status should be Suspended
     */
    public String reactivate()
    {

	try
	{
	    SessionCO sessionCO = returnSessionObject();
	    fillSessionData(sessionCO);

	    // construct Audit Reference
	    AuditRefCO refCO = initAuditRefCO();
	    setAuditCommon(refCO, AuditConstant.UPDATE);
	    merchantMgntCO.setAuditRefCO(refCO);
	    merchantMgntCO.setAuditObj(returnAuditObject(merchantMgntCO.getClass()));

	    merchantMgntBO.reactivateMerchantMgnt(merchantMgntCO);
	}
	catch(Exception ex)
	{
	    handleException(ex, null, null);
	}

	return "success";
    }

    /*
     * this function approve reactivate record the record status should be
     * Reactivate
     */
    public String approveReactivate() throws BaseException
    {
	try
	{
	    SessionCO sessionCO = returnSessionObject();
	    fillSessionData(sessionCO);

	    // construct Audit Reference
	    AuditRefCO refCO = initAuditRefCO();
	    setAuditCommon(refCO, AuditConstant.UPDATE);
	    merchantMgntCO.setAuditRefCO(refCO);
	    merchantMgntCO.setAuditObj(returnAuditObject(merchantMgntCO.getClass()));

	    merchantMgntCO = merchantMgntBO.approveReactivateMerchantMgnt(merchantMgntCO);
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return "success";
    }

    /*
     * this function suspend record the record status should be Approve
     */
    public String suspend() throws BaseException
    {
	try
	{
	    SessionCO sessionCO = returnSessionObject();
	    fillSessionData(sessionCO);

	    // construct Audit Reference
	    AuditRefCO refCO = initAuditRefCO();
	    setAuditCommon(refCO, AuditConstant.UPDATE);
	    merchantMgntCO.setAuditRefCO(refCO);
	    merchantMgntCO.setAuditObj(returnAuditObject(merchantMgntCO.getClass()));

	    merchantMgntCO = merchantMgntBO.suspendMerchantMgnt(merchantMgntCO);
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return "success";
    }

    /*
     * this function approve suspend record the record status should be suspend
     */
    public String approveSuspend() throws BaseException
    {
	try
	{
	    SessionCO sessionCO = returnSessionObject();
	    fillSessionData(sessionCO);

	    // construct Audit Reference
	    AuditRefCO refCO = initAuditRefCO();
	    setAuditCommon(refCO, AuditConstant.UPDATE);
	    merchantMgntCO.setAuditRefCO(refCO);
	    merchantMgntCO.setAuditObj(returnAuditObject(merchantMgntCO.getClass()));

	    merchantMgntCO = merchantMgntBO.approveSuspendMerchantMgnt(merchantMgntCO);
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return "success";
    }

    /*
     * this function fill common values into MerchantCO from session object
     */
    public void fillSessionData(SessionCO sessionCO) throws BaseException
    {
	merchantMgntCO.setCompCode(sessionCO.getCompanyCode());
	merchantMgntCO.setBranchCode(sessionCO.getBranchCode());
	merchantMgntCO.setUserId(sessionCO.getUserName());

	merchantMgntCO.getGtwAtmMerchantVO().setCOMP_CODE(sessionCO.getCompanyCode());

	merchantMgntCO.setProgRef(get_pageRef());
	merchantMgntCO.setRunningDate(sessionCO.getRunningDateRET());
	merchantMgntCO.setAppName(sessionCO.getCurrentAppName());
	merchantMgntCO.setLanguage(sessionCO.getLanguage());
    }
       

    public void setMerchantMgntBO(MerchantMgntBO merchantMgntBO)
    {
	this.merchantMgntBO = merchantMgntBO;
    }

    public MerchantMgntCO getMerchantMgntCO()
    {
	return merchantMgntCO;
    }

    public void setMerchantMgntCO(MerchantMgntCO merchantMgntCO)
    {
	this.merchantMgntCO = merchantMgntCO;
    }

    public MerchantMgntSC getMerchantMgntSC()
    {
	return merchantMgntSC;
    }

    public void setMerchantMgntSC(MerchantMgntSC merchantMgntSC)
    {
	this.merchantMgntSC = merchantMgntSC;
    }

    public BigDecimal getMerchantCode()
    {
	return merchantCode;
    }

    public void setMerchantCode(BigDecimal merchantCode)
    {
	this.merchantCode = merchantCode;
    }    

    private void setAuditCommon(AuditRefCO refCO, String auditConstant)
    {
	refCO.setKeyRef(AuditConstant.MERCHANT_DEFINITION_KEY_REF);
	refCO.setOperationType(auditConstant);
	refCO.setRunningDate(merchantMgntCO.getRunningDate());
    }
}
