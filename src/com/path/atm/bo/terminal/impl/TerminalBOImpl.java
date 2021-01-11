package com.path.atm.bo.terminal.impl;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import com.path.atm.bo.common.ATMCommonUtil;
import com.path.atm.bo.teller.TellerBO;
import com.path.atm.bo.terminal.TerminalBO;
import com.path.atm.dao.terminal.TerminalDAO;
import com.path.atm.dbmaps.vo.GTW_ATM_TERMINALVO;
import com.path.atm.vo.teller.TellerSC;
import com.path.atm.vo.terminal.TerminalCO;
import com.path.atm.vo.terminal.TerminalSC;
import com.path.bo.common.ConstantsCommon;
import com.path.bo.common.MessageCodes;
import com.path.dbmaps.vo.SYS_PARAM_SCREEN_DISPLAYVO;
import com.path.lib.common.base.BaseBO;
import com.path.lib.common.exception.BOException;
import com.path.lib.common.exception.BaseException;
import com.path.lib.common.util.NumberUtil;
import com.path.lib.common.util.StringUtil;

/**
 * 
 * Copyright 2019, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: Alim Khowaja
 *
 * TerminalBOImpl.java used to
 */
public class TerminalBOImpl extends BaseBO implements TerminalBO
{
    private TerminalDAO terminalDAO;
    private TellerBO tellerBo;

    @Override
    public List returnTerminalList(TerminalSC criteria) throws BaseException
    {
	return terminalDAO.returnTerminalList(criteria);
    }

    @Override
    public int returnTerminalListCount(TerminalSC criteria) throws BaseException
    {
	return terminalDAO.returnTerminalListCount(criteria);
    }

    @Override
    public TerminalCO save(TerminalCO terminalCO) throws BaseException
    {
	// validate Terminal data
	validateTerminalData(terminalCO);
	
	/**
	 * validate terminal id by 
	 */
	validateTerminalId(terminalCO);

	GTW_ATM_TERMINALVO gtw_ATM_TERMINALVO = terminalCO.getGtw_ATM_TERMINALVO();

	gtw_ATM_TERMINALVO.setCOMP_CODE(terminalCO.getCompCode());

	// validate Email
	ATMCommonUtil.validateEmail(gtw_ATM_TERMINALVO.getEMAIL());

	if(gtw_ATM_TERMINALVO.getTERMINAL_ID() == null
		|| gtw_ATM_TERMINALVO.getTERMINAL_ID().equals(ConstantsCommon.EMPTY_BIGDECIMAL_VALUE))
	{
	    gtw_ATM_TERMINALVO.setCREATED_BY(terminalCO.getUserID());
	    gtw_ATM_TERMINALVO.setCREATED_DATE(terminalCO.getRunningDate());

	    // insert Terminal Record
	    Integer row = terminalDAO.saveGTW_ATM_TERMINALVO(gtw_ATM_TERMINALVO);

	    // call audit for insert
	    auditBO.callAudit(null, gtw_ATM_TERMINALVO, terminalCO.getAuditRefCO());

	}
	else
	{
	    gtw_ATM_TERMINALVO.setMODIFIED_BY(terminalCO.getUserID());
	    gtw_ATM_TERMINALVO.setMODIFIED_DATE(terminalCO.getRunningDate());
	    
	    // Update Channel Record
	    Integer row = genericDAO.update(gtw_ATM_TERMINALVO);
	    if(row == null || row < 1)
	    {
		throw new BOException(MessageCodes.RECORD_CHANGED);
	    }

	    // update Audit
	    TerminalCO auditObj = (TerminalCO) terminalCO.getAuditObj();

	    // call audit for update
            auditBO.callAudit(auditObj.getGtw_ATM_TERMINALVO(), gtw_ATM_TERMINALVO, terminalCO.getAuditRefCO());
	}

	// insert Audit
	auditBO.insertAudit(terminalCO.getAuditRefCO());
	return terminalCO;
    }

    /**
     * set empty value while terminal type not POS
     * 
     * @param acquirerCO
     * @return
     */
    private TerminalCO validateTerminalData(TerminalCO terminalCO)
    {
	GTW_ATM_TERMINALVO gtw_ATM_TERMINALVO = terminalCO.getGtw_ATM_TERMINALVO();

	if(NumberUtil.isEmptyDecimal(gtw_ATM_TERMINALVO.getMERCHANT_CODE()))
	    gtw_ATM_TERMINALVO.setMERCHANT_CODE(null);
	
	terminalCO.setGtw_ATM_TERMINALVO(gtw_ATM_TERMINALVO);
	return terminalCO;
    }

    @Override
    public TerminalCO edit(TerminalSC criteria) throws BaseException, Exception
    {

	TerminalCO terminalCO = terminalDAO.edit(criteria);
	if(terminalCO != null)
	{
	    TellerSC tellerSC = new TellerSC();
	    // set parameter for retrieve teller details
	    tellerSC.setBranchCode(terminalCO.getGtw_ATM_TERMINALVO().getTRANSACTION_BRANCH_CODE());
	    tellerSC.setCompCode(criteria.getCompCode());
	    tellerSC.setTellerCode(terminalCO.getGtw_ATM_TERMINALVO().getTELLER_CODE());

	    terminalCO.setOldAcquirerId(terminalCO.getGtw_ATM_TERMINALVO().getACQUIRER_ID());
	    
	    // retrieve merchant description
	    if(terminalCO.getGtw_ATM_MERCHANTVO() != null)
	    {
		if(StringUtil.isEmptyString(terminalCO.getGtw_ATM_MERCHANTVO().getADDITIONAL_REFERENCE()))
		{
		    terminalCO.setMerchantDescription(terminalCO.getGtw_ATM_MERCHANTVO().getIBAN_ACC_NO());
		}
		else
		{
		    terminalCO.setMerchantDescription(terminalCO.getGtw_ATM_MERCHANTVO().getADDITIONAL_REFERENCE());
		}
	    }

	    // retireve teller details by code/companycode/branch
	}

	return terminalCO;
    }

    @Override
    public void delete(TerminalCO terminalCO) throws BaseException
    {
	genericDAO.delete(terminalCO.getGtw_ATM_TERMINALVO());
    }

    @Override
    public TerminalCO applySysParamSettings(TerminalCO terminalCO) throws BaseException
    {
	HashMap<String, SYS_PARAM_SCREEN_DISPLAYVO> elementMap = terminalCO.getElementMap();

	SYS_PARAM_SCREEN_DISPLAYVO sysParam = new SYS_PARAM_SCREEN_DISPLAYVO();
	sysParam.setIS_READONLY(BigDecimal.ONE);
	elementMap.put("terminal_id", sysParam);

	return terminalCO;
    }

    @Override
    public TerminalCO validateTerminalId(TerminalCO terminalCO) throws BaseException
    {
	GTW_ATM_TERMINALVO atm_TERMINALVO = terminalCO.getGtw_ATM_TERMINALVO();
	if(!terminalCO.getOldAcquirerId().equals(atm_TERMINALVO.getACQUIRER_ID()))
	{
	    TerminalSC criteria = new TerminalSC();
	    criteria.setTerminalCode(atm_TERMINALVO.getTERMINAL_CODE());
	    criteria.setAcquirerId(atm_TERMINALVO.getACQUIRER_ID());
	    int count = terminalDAO.validateTerminalId(criteria);
	    if(count > 0)
	    {
		throw new BOException(MessageCodes.INVALID_MISSING,new String[]{"duplicate_terminal_id_with_acquirer_key"});
	    }
	}
	
	return terminalCO;
    }

    public void setTerminalDAO(TerminalDAO terminalDAO)
    {
	this.terminalDAO = terminalDAO;
    }

    public void setTellerBo(TellerBO tellerBo)
    {
	this.tellerBo = tellerBo;
    }

}
