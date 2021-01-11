package com.path.atm.bo.merchantmgnt.impl;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import com.path.atm.bo.merchantmgnt.MerchantMgntBO;
import com.path.atm.bo.merchantmgnt.MerchantMgntConstant;
import com.path.atm.dao.merchantmgnt.MerchantMgntDAO;
import com.path.atm.dbmaps.vo.GTW_ATM_MERCHANTVO;
import com.path.atm.vo.merchantmgnt.MerchantMgntCO;
import com.path.atm.vo.merchantmgnt.MerchantMgntSC;
import com.path.bo.common.CommonMethods;
import com.path.bo.common.MessageCodes;
import com.path.bo.common.audit.AuditConstant;
import com.path.bo.core.account.AccountBO;
import com.path.bo.core.common.base.RetailBaseBO;
import com.path.dbmaps.vo.AMFVO;
import com.path.dbmaps.vo.SYS_PARAM_SCREEN_DISPLAYVO;
import com.path.lib.common.exception.BOException;
import com.path.lib.common.exception.BaseException;
import com.path.lib.common.util.NumberUtil;
import com.path.vo.common.audit.AuditRefCO;
import com.path.vo.core.account.AccountSC;

/**
 * 
 * Copyright 2013, Path Solutions Path Solutions retains all ownership rights to
 * this source code
 * 
 * @author: Muneer Ahmed
 * 
 * 
 */

public class MerchantMgntBOImpl extends RetailBaseBO implements MerchantMgntBO
{

    private MerchantMgntDAO merchantMgntDAO;
    private AccountBO accountBO;

    public MerchantMgntDAO getMerchantMgntDAO()
    {
	return merchantMgntDAO;
    }

    public void setMerchantMgntDAO(MerchantMgntDAO merchantMgntDAO)
    {
	this.merchantMgntDAO = merchantMgntDAO;
    }

    /**
     * @return list of MerchantMgntCO for the main grid
     */
    public List<MerchantMgntCO> returnMerchantMgntList(MerchantMgntSC merchantMgntSC) throws BaseException
    {
	return merchantMgntDAO.returnMerchantMgntList(merchantMgntSC);
    }

    /**
     * @return number of record for the main grid
     */
    public Integer returnMerchantMgntListCount(MerchantMgntSC merchantMgntSC) throws BaseException
    {
	return merchantMgntDAO.returnMerchantMgntListCount(merchantMgntSC);
    }

    // load selected record from the Grid into the maint form
    public MerchantMgntCO returnMerchantMgntDetails(MerchantMgntSC merchantMgntSC) throws BaseException
    {
	MerchantMgntCO merchantMgntCO = merchantMgntDAO.returnMerchantMgntDetails(merchantMgntSC);
	return merchantMgntCO;
    }

    // save data
    public MerchantMgntCO saveMerchantMgnt(MerchantMgntCO merchantMgntCO) throws BaseException
    {
	NumberUtil.resetEmptyValues(merchantMgntCO);

	// save new record
	if(NumberUtil.isEmptyDecimal(merchantMgntCO.getGtwAtmMerchantVO().getMERCHANT_CODE()))
	{

	    merchantMgntCO.getGtwAtmMerchantVO().setSTATUS(MerchantMgntConstant.STATUS_ACTIVE);
	    merchantMgntCO.getGtwAtmMerchantVO().setCREATED_BY(merchantMgntCO.getUserId());
	    Date dateToSetTime = merchantMgntCO.getRunningDate();
	    merchantMgntCO.getGtwAtmMerchantVO().setCREATED_DATE(commonLibBO.addSystemTimeToDate(dateToSetTime));
	    
	    merchantMgntDAO.save(merchantMgntCO.getGtwAtmMerchantVO());

	    // insert audit
	    AuditRefCO refCO = merchantMgntCO.getAuditRefCO();
	    refCO.setOperationType(AuditConstant.CREATED);
	    refCO.setKeyRef(AuditConstant.MERCHANT_DEFINITION_KEY_REF);
	    auditBO.callAudit(null, merchantMgntCO.getGtwAtmMerchantVO(), merchantMgntCO.getAuditRefCO());
	}
	else // update existing record
	{
	    merchantMgntCO.getGtwAtmMerchantVO().setSTATUS(MerchantMgntConstant.STATUS_ACTIVE); // IN
												// CASE
												// UPDATE
												// AFTER
												// APPROVE
												// RETURN
												// STATUS
												// TO
												// ACTIVE
	    merchantMgntCO.getGtwAtmMerchantVO().setMODIFIED_BY(merchantMgntCO.getUserId());
	    Date dateToSetTime = merchantMgntCO.getRunningDate();
	    merchantMgntCO.getGtwAtmMerchantVO().setMODIFIED_DATE(commonLibBO.addSystemTimeToDate(dateToSetTime));
	    int result = genericDAO.update(merchantMgntCO.getGtwAtmMerchantVO());
	    // double check upon saving existing record, if it was modified by
	    // another user or from other CRUD
	    if(result == 0)
	    {
		throw new BOException(MessageCodes.RECORD_CHANGED);
	    }

	    // Audit
	    MerchantMgntCO oldMerchantMgntCO = (MerchantMgntCO) merchantMgntCO.getAuditObj();
	    auditBO.callAudit(oldMerchantMgntCO.getGtwAtmMerchantVO(), merchantMgntCO.getGtwAtmMerchantVO(),
		    merchantMgntCO.getAuditRefCO());
	    auditBO.insertAudit(merchantMgntCO.getAuditRefCO());
	}

	return merchantMgntCO;
    }

    // delete record
    public MerchantMgntCO deleteMerchantMgnt(MerchantMgntCO merchantMgntCO) throws BaseException
    {

	if(!NumberUtil.isEmptyDecimal(merchantMgntCO.getGtwAtmMerchantVO().getMERCHANT_CODE()))
	{
	    chequeStatus(merchantMgntCO, "DELETE");

	    GTW_ATM_MERCHANTVO gtw_ATM_MERCHANTVO = merchantMgntCO.getGtwAtmMerchantVO();

	    BigDecimal merchantMgntCode = merchantMgntCO.getGtwAtmMerchantVO().getMERCHANT_CODE();

	    gtw_ATM_MERCHANTVO.setTO_BE_STATUS(MerchantMgntConstant.STATUS_TO_BE_DELETED);
	    gtw_ATM_MERCHANTVO.setTO_BE_STATUS_BY(merchantMgntCO.getUserId());
	    Date dateToSetTime = merchantMgntCO.getRunningDate();
	    gtw_ATM_MERCHANTVO.setTO_BE_STATUS_DATE(commonLibBO.addSystemTimeToDate(dateToSetTime));
	    gtw_ATM_MERCHANTVO.setCOMP_CODE(merchantMgntCO.getCompCode());
	    gtw_ATM_MERCHANTVO.setMERCHANT_CODE(merchantMgntCode);

	    int result = genericDAO.update(gtw_ATM_MERCHANTVO);
	    if(result <= 0)
	    {
		throw new BOException(MessageCodes.RECORD_CHANGED);
	    }

	    // Audit
	    MerchantMgntCO oldMerchantMgntCO = (MerchantMgntCO) merchantMgntCO.getAuditObj();
	    auditBO.callAudit(oldMerchantMgntCO.getGtwAtmMerchantVO(), gtw_ATM_MERCHANTVO,
		    merchantMgntCO.getAuditRefCO());
	    auditBO.insertAudit(merchantMgntCO.getAuditRefCO());

	}

	return merchantMgntCO;
    }

    public MerchantMgntCO approveDeleteMerchantMgnt(MerchantMgntCO merchantMgntCO) throws BaseException
    {

	if(!NumberUtil.isEmptyDecimal(merchantMgntCO.getGtwAtmMerchantVO().getMERCHANT_CODE()))
	{
	    chequeStatus(merchantMgntCO, "APPROVE_DELETE");

	    GTW_ATM_MERCHANTVO gtw_atm_merchantVO = merchantMgntCO.getGtwAtmMerchantVO();

	    BigDecimal merchantMgntCode = merchantMgntCO.getGtwAtmMerchantVO().getMERCHANT_CODE();

	    gtw_atm_merchantVO.setSTATUS(MerchantMgntConstant.STATUS_DELETED);
	    gtw_atm_merchantVO.setTO_BE_STATUS("");
	    gtw_atm_merchantVO.setTO_BE_STATUS_BY("");

	    gtw_atm_merchantVO.setDELETED_BY(merchantMgntCO.getUserId());
	    Date dateToSetTime = merchantMgntCO.getRunningDate();
	    gtw_atm_merchantVO.setDELETED_DATE(commonLibBO.addSystemTimeToDate(dateToSetTime));
	    gtw_atm_merchantVO.setCOMP_CODE(merchantMgntCO.getCompCode());
	    gtw_atm_merchantVO.setMERCHANT_CODE(merchantMgntCode);

	    int result = genericDAO.update(gtw_atm_merchantVO);
	    if(result <= 0)
	    {
		throw new BOException(MessageCodes.RECORD_CHANGED);
	    }

	    // Audit
	    MerchantMgntCO oldMerchantMgntCO = (MerchantMgntCO) merchantMgntCO.getAuditObj();
	    auditBO.callAudit(oldMerchantMgntCO.getGtwAtmMerchantVO(), gtw_atm_merchantVO,
		    merchantMgntCO.getAuditRefCO());
	    auditBO.insertAudit(merchantMgntCO.getAuditRefCO());

	}

	return merchantMgntCO;
    }

    public MerchantMgntCO approveMerchantMgnt(MerchantMgntCO merchantMgntCO1) throws BaseException
    {
	MerchantMgntCO merchantMgntCO = merchantMgntCO1;
	chequeStatus(merchantMgntCO, "APPROVE");

	BigDecimal merchantCode = merchantMgntCO.getGtwAtmMerchantVO().getMERCHANT_CODE();
	GTW_ATM_MERCHANTVO gtw_atm_merchantVO = merchantMgntCO.getGtwAtmMerchantVO();

	gtw_atm_merchantVO.setSTATUS(MerchantMgntConstant.STATUS_APPROVED);
	gtw_atm_merchantVO.setAPPROVED_BY(merchantMgntCO.getUserId());

	Date dateToSetTime = merchantMgntCO.getRunningDate();
	gtw_atm_merchantVO.setAPPROVED_DATE(commonLibBO.addSystemTimeToDate(dateToSetTime));

	gtw_atm_merchantVO.setCOMP_CODE(merchantMgntCO.getCompCode());
	gtw_atm_merchantVO.setMERCHANT_CODE(merchantCode);

	int result = genericDAO.update(gtw_atm_merchantVO);
	if(result <= 0)
	{
	    throw new BOException(MessageCodes.RECORD_CHANGED);
	}

	// Audit
	merchantMgntCO.getGtwAtmMerchantVO().setSTATUS(gtw_atm_merchantVO.getSTATUS());
	MerchantMgntCO oldMerchantMgntCO = (MerchantMgntCO) merchantMgntCO.getAuditObj();
	gtw_atm_merchantVO.setREMARK(oldMerchantMgntCO.getGtwAtmMerchantVO().getREMARK());
	auditBO.callAudit(oldMerchantMgntCO.getGtwAtmMerchantVO(), gtw_atm_merchantVO, merchantMgntCO.getAuditRefCO());
	auditBO.insertAudit(merchantMgntCO.getAuditRefCO());

	return merchantMgntCO;
    }

    public MerchantMgntCO suspendMerchantMgnt(MerchantMgntCO merchantMgntCO) throws BaseException
    {

	/*
	 * If retrieved record then set Audit Values
	 */
	if(NumberUtil.emptyDecimalToNull(merchantMgntCO.getGtwAtmMerchantVO().getMERCHANT_CODE()) != null)
	{

	    GTW_ATM_MERCHANTVO gtw_atm_merchantVO = merchantMgntCO.getGtwAtmMerchantVO();

	    chequeStatus(merchantMgntCO, "SUSPEND");

	    gtw_atm_merchantVO.setTO_BE_STATUS(MerchantMgntConstant.STATUS_TO_BE_SUSPENDED);
	    gtw_atm_merchantVO.setTO_BE_STATUS_BY(merchantMgntCO.getUserId());

	    BigDecimal merchantCode = merchantMgntCO.getGtwAtmMerchantVO().getMERCHANT_CODE();
	    Date dateToSetTime = merchantMgntCO.getRunningDate();
	    gtw_atm_merchantVO.setTO_BE_STATUS_DATE(commonLibBO.addSystemTimeToDate(dateToSetTime));

	    gtw_atm_merchantVO.setCOMP_CODE(merchantMgntCO.getCompCode());
	    gtw_atm_merchantVO.setMERCHANT_CODE(merchantCode);

	    int result = genericDAO.update(gtw_atm_merchantVO);
	    if(result <= 0)
	    {
		throw new BOException(MessageCodes.RECORD_CHANGED);
	    }

	    // Set the new status to be used later in alert -
	    // returnalertparams()
	    merchantMgntCO.getGtwAtmMerchantVO().setSTATUS(gtw_atm_merchantVO.getTO_BE_STATUS());

	    // Audit
	    MerchantMgntCO oldMerchantMgntCO = (MerchantMgntCO) merchantMgntCO.getAuditObj();
	    auditBO.callAudit(oldMerchantMgntCO.getGtwAtmMerchantVO(), gtw_atm_merchantVO,
		    merchantMgntCO.getAuditRefCO());
	    auditBO.insertAudit(merchantMgntCO.getAuditRefCO());
	}
	return merchantMgntCO;
    }

    public MerchantMgntCO approveSuspendMerchantMgnt(MerchantMgntCO merchantMgntCO) throws BaseException
    {

	/*
	 * If retrieved record then set Audit Values
	 */
	if(NumberUtil.emptyDecimalToNull(merchantMgntCO.getGtwAtmMerchantVO().getMERCHANT_CODE()) != null)
	{

	    GTW_ATM_MERCHANTVO gtw_atm_merchantVO = merchantMgntCO.getGtwAtmMerchantVO();

	    chequeStatus(merchantMgntCO, "APPROVE_SUSPEND");

	    gtw_atm_merchantVO.setSTATUS(MerchantMgntConstant.STATUS_SUSPENDED);
	    gtw_atm_merchantVO.setTO_BE_STATUS("");
	    gtw_atm_merchantVO.setTO_BE_STATUS_BY("");

	    gtw_atm_merchantVO.setSUSPENDED_BY(merchantMgntCO.getUserId());

	    BigDecimal merchantCode = merchantMgntCO.getGtwAtmMerchantVO().getMERCHANT_CODE();
	    Date dateToSetTime = merchantMgntCO.getRunningDate();
	    gtw_atm_merchantVO.setSUSPENDED_DATE(commonLibBO.addSystemTimeToDate(dateToSetTime));

	    gtw_atm_merchantVO.setCOMP_CODE(merchantMgntCO.getCompCode());
	    gtw_atm_merchantVO.setMERCHANT_CODE(merchantCode);

	    int result = genericDAO.update(gtw_atm_merchantVO);
	    if(result <= 0)
	    {
		throw new BOException(MessageCodes.RECORD_CHANGED);
	    }

	    // Set the new status to be used later in alert -
	    // returnalertparams()
	    merchantMgntCO.getGtwAtmMerchantVO().setSTATUS(gtw_atm_merchantVO.getSTATUS());

	    // Audit
	    MerchantMgntCO oldMerchantMgntCO = (MerchantMgntCO) merchantMgntCO.getAuditObj();
	    auditBO.callAudit(oldMerchantMgntCO.getGtwAtmMerchantVO(), gtw_atm_merchantVO,
		    merchantMgntCO.getAuditRefCO());
	    auditBO.insertAudit(merchantMgntCO.getAuditRefCO());
	}
	return merchantMgntCO;
    }

    public MerchantMgntCO reactivateMerchantMgnt(MerchantMgntCO merchantMgntCO) throws BaseException
    {

	if(!NumberUtil.isEmptyDecimal(merchantMgntCO.getGtwAtmMerchantVO().getMERCHANT_CODE()))
	{
	    chequeStatus(merchantMgntCO, "REACTIVATE");

	    GTW_ATM_MERCHANTVO gtw_atm_merchantVO = merchantMgntCO.getGtwAtmMerchantVO();

	    BigDecimal merchantMgntCode = merchantMgntCO.getGtwAtmMerchantVO().getMERCHANT_CODE();

	    gtw_atm_merchantVO.setTO_BE_STATUS(MerchantMgntConstant.STATUS_TO_BE_REACTIVATED);
	    gtw_atm_merchantVO.setTO_BE_STATUS_BY(merchantMgntCO.getUserId());
	    Date dateToSetTime = merchantMgntCO.getRunningDate();
	    gtw_atm_merchantVO.setTO_BE_STATUS_DATE(commonLibBO.addSystemTimeToDate(dateToSetTime));
	    gtw_atm_merchantVO.setCOMP_CODE(merchantMgntCO.getCompCode());
	    gtw_atm_merchantVO.setMERCHANT_CODE(merchantMgntCode);

	    int result = genericDAO.update(gtw_atm_merchantVO);
	    if(result <= 0)
	    {
		throw new BOException(MessageCodes.RECORD_CHANGED);
	    }

	    // Audit
	    MerchantMgntCO oldMerchantMgntCO = (MerchantMgntCO) merchantMgntCO.getAuditObj();
	    auditBO.callAudit(oldMerchantMgntCO.getGtwAtmMerchantVO(), gtw_atm_merchantVO,
		    merchantMgntCO.getAuditRefCO());
	    auditBO.insertAudit(merchantMgntCO.getAuditRefCO());

	}

	return merchantMgntCO;
    }

    public MerchantMgntCO approveReactivateMerchantMgnt(MerchantMgntCO merchantMgntCO) throws BaseException
    {
	if(NumberUtil.emptyDecimalToNull(merchantMgntCO.getGtwAtmMerchantVO().getMERCHANT_CODE()) != null)
	{
	    GTW_ATM_MERCHANTVO gtw_atm_merchantVO = merchantMgntCO.getGtwAtmMerchantVO();

	    chequeStatus(merchantMgntCO, "APPROVE_REACTIVATE");

	    BigDecimal merchantCode = merchantMgntCO.getGtwAtmMerchantVO().getMERCHANT_CODE();

	    gtw_atm_merchantVO.setSTATUS(MerchantMgntConstant.STATUS_APPROVED);
	    gtw_atm_merchantVO.setAPPROVED_BY(merchantMgntCO.getUserId());
	    Date dateToSetTime = merchantMgntCO.getRunningDate();
	    gtw_atm_merchantVO.setAPPROVED_DATE(commonLibBO.addSystemTimeToDate(dateToSetTime));
	    gtw_atm_merchantVO.setCOMP_CODE(merchantMgntCO.getCompCode());
	    gtw_atm_merchantVO.setMERCHANT_CODE(merchantCode);

	    gtw_atm_merchantVO.setTO_BE_STATUS("");
	    gtw_atm_merchantVO.setTO_BE_STATUS_BY("");

	    int result = genericDAO.update(gtw_atm_merchantVO);
	    if(result <= 0)
	    {
		throw new BOException(MessageCodes.RECORD_CHANGED);
	    }

	    // Audit
	    merchantMgntCO.getGtwAtmMerchantVO().setSTATUS(gtw_atm_merchantVO.getSTATUS());
	    MerchantMgntCO oldMerchantMgntCO = (MerchantMgntCO) merchantMgntCO.getAuditObj();
	    gtw_atm_merchantVO.setREMARK(oldMerchantMgntCO.getGtwAtmMerchantVO().getREMARK());
	    auditBO.callAudit(oldMerchantMgntCO.getGtwAtmMerchantVO(), gtw_atm_merchantVO,
		    merchantMgntCO.getAuditRefCO());
	    auditBO.insertAudit(merchantMgntCO.getAuditRefCO());

	}
	return merchantMgntCO;
    }

    @Override
    public MerchantMgntCO applySysParamSettings(MerchantMgntCO merchantMgntCO, BigDecimal enableDisbale) throws BaseException
    {
	HashMap<String, SYS_PARAM_SCREEN_DISPLAYVO> elementMap = merchantMgntCO.getElementMap();

	SYS_PARAM_SCREEN_DISPLAYVO sysParam = new SYS_PARAM_SCREEN_DISPLAYVO();
	sysParam.setIS_READONLY(enableDisbale);
	elementMap.put(merchantMgntCO.getLookupName(), sysParam);
	return merchantMgntCO;
    }

    private void chequeStatus(MerchantMgntCO merchantMgntCO, String option) throws BaseException
    {

	if("APPROVE".equals(option)
		&& !MerchantMgntConstant.STATUS_ACTIVE.equals(merchantMgntCO.getGtwAtmMerchantVO().getSTATUS()))
	{
	    throw new BOException(MessageCodes.CAN_NOT_APPROVE);
	}
	if("DELETE".equals(option)
		&& !merchantMgntCO.getGtwAtmMerchantVO().getSTATUS().equals(MerchantMgntConstant.STATUS_ACTIVE)
		&& !merchantMgntCO.getGtwAtmMerchantVO().getSTATUS().equals(MerchantMgntConstant.STATUS_APPROVED)
		&& !merchantMgntCO.getGtwAtmMerchantVO().getSTATUS().equals(MerchantMgntConstant.STATUS_SUSPENDED))
	{
	    throw new BOException(MessageCodes.CANNOT_DELETE);
	}
	if("APPROVE_DELETE".equals(option) && !MerchantMgntConstant.STATUS_TO_BE_DELETED
		.equals(merchantMgntCO.getGtwAtmMerchantVO().getTO_BE_STATUS()))
	{
	    throw new BOException(MessageCodes.CANNOT_APPROVE);
	}

	if("SUSPEND".equals(option)
		&& !MerchantMgntConstant.STATUS_APPROVED.equals(merchantMgntCO.getGtwAtmMerchantVO().getSTATUS()))
	{
	    throw new BOException(MessageCodes.CAN_NOT_APPROVE);
	}

	if("APPROVE_SUSPEND".equals(option) && !MerchantMgntConstant.STATUS_TO_BE_SUSPENDED
		.equals(merchantMgntCO.getGtwAtmMerchantVO().getTO_BE_STATUS()))
	{
	    throw new BOException(MessageCodes.CANNOT_APPROVE);
	}

	if("REACTIVATE".equals(option)
		&& !MerchantMgntConstant.STATUS_SUSPENDED.equals(merchantMgntCO.getGtwAtmMerchantVO().getSTATUS()))
	{
	    throw new BOException(MessageCodes.CANNOT_REACTIVATE_RECORD);
	}
	if("APPROVE_REACTIVATE".equals(option) && !MerchantMgntConstant.STATUS_TO_BE_REACTIVATED
		.equals(merchantMgntCO.getGtwAtmMerchantVO().getTO_BE_STATUS()))
	{
	    throw new BOException(MessageCodes.CANNOT_APPROVE);
	}
    }

    @Override
    public Integer countAccountByIbanORAddRef(MerchantMgntSC merchantMgntSC) throws BaseException
    {
	String jndiname = "services.jndi";		
	/**
	 * Apply Connection Object for core db
	 */
	merchantMgntSC.setUseConnection(true);
	CommonMethods.applyConnectionJNDIToSC(merchantMgntSC, jndiname);
	
	int count = merchantMgntDAO.countAccountByIbanORAddRef(merchantMgntSC);
	return count;
    }

    public AccountBO getAccountBO()
    {
        return accountBO;
    }

    public void setAccountBO(AccountBO accountBO)
    {
        this.accountBO = accountBO;
    }

    
    private AccountSC returnAccountSC(MerchantMgntSC merchantSC) {
	
	AccountSC accountSC = new AccountSC();
	accountSC.setPreferredLanguage(merchantSC.getPreferredLanguage());
	accountSC.setCompCode(merchantSC.getCompCode());
	accountSC.setLang(merchantSC.getLang());
	
	accountSC.setUseConnection(true);
	
	return accountSC;
    }
    
    /*
     * temporary disable web service call
    private HashMap<String, Object> fillObjInputParam(MerchantMgntSC merchantMgntSC)
    {
	HashMap<String, Object> rmiObjectInputParamMap = new HashMap<String, Object>();
	HashMap<String, Object> accountInputParamMap = new HashMap<String, Object>();
	HashMap<String, Object> requesterContextInputParamMap = new HashMap<String, Object>();
	try
	{
	    String branchCode = PathPropertyUtil.returnPathPropertyFromFile(GatewayCommonConstants.RET_SERVICE_REMOTING,
		    MerchantMgntConstant.TELLER_BRANCH_CODE);
	    String userID = PathPropertyUtil.returnPathPropertyFromFile(GatewayCommonConstants.RET_SERVICE_REMOTING,
		    MerchantMgntConstant.TELLER_USER_ID);
	    String password = PathPropertyUtil.returnPathPropertyFromFile(GatewayCommonConstants.RET_SERVICE_REMOTING,
		    MerchantMgntConstant.TELLER_PASSWORD);

	    rmiObjectInputParamMap.put("companyCode", merchantMgntSC.getCompCode());
	    rmiObjectInputParamMap.put("branchCode", branchCode);

	    requesterContextInputParamMap.put("langId", merchantMgntSC.getLang());
	    requesterContextInputParamMap.put("userID", userID);
	    requesterContextInputParamMap.put("password", password);

	    accountInputParamMap.put("additionalRef", merchantMgntSC.getAdditionalRef());
	    accountInputParamMap.put("ibanAccNo", merchantMgntSC.getIBAN());

	    rmiObjectInputParamMap.put("account", accountInputParamMap);
	    rmiObjectInputParamMap.put("requesterContext", requesterContextInputParamMap);
	}
	catch(Exception e)
	{
	    e.printStackTrace();
	}
	return rmiObjectInputParamMap;
    }

    
    public String returnMerchantName(MerchantMgntSC merchantMgntSC) throws Exception
    {
	String merchantName = "";
	String serviceRmi = GatewayCommonConstants.returnRETRmi();
	WebServiceCommonBO rmiCallerBO = null;
	HashMap<String, Object> rmiObjectInputParamMap = fillObjInputParam(merchantMgntSC);

	rmiCallerBO = (WebServiceCommonBO) RmiServiceCaller.returnRmiInterface(serviceRmi, WebServiceCommonBO.class,
		"webServiceCommonBOService");
	HashMap<String, Object> responseMap = rmiCallerBO.executeWebServiceBoMethod("generalAccountsWsBO",
		"returnGeneralAccountsList", rmiObjectInputParamMap);

	if((int) responseMap.get("ol_error_code") >= 0)
	{
	    List<HashMap<String, Object>> accountsList = (List<HashMap<String, Object>>) responseMap.get("accountsList");

	    if(accountsList.size() > 0)
	    {
		HashMap<String, Object> hashMap = (HashMap<String, Object>) accountsList.get(0);
		if(hashMap.containsKey("briefNameEnglish"))
		{
		    merchantName = (String) hashMap.get("briefNameEnglish");		    
		}
	    }
	}
	
	if(StringUtil.isEmptyString(merchantName))
	{
	    if("IBAN".equalsIgnoreCase(merchantMgntSC.getDependencyType())) {
		throw new BOException(MerchantMgntConstant.MERCHANT_IBAN_NOT_VALID);
	    }
	    if("AccountRef".equalsIgnoreCase(merchantMgntSC.getDependencyType())) {
		throw new BOException(MerchantMgntConstant.MERCHANT_ACCOUNT_REF_NOT_VALID);
	    }
	    
	    
	}
	return merchantName;
    }
    */
}
