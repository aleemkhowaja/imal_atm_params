package com.path.atm.actions.terminal;

import com.path.atm.actions.common.base.ATMBaseAction;
import com.path.atm.bo.terminal.TerminalBO;
import com.path.atm.vo.terminal.TerminalCO;
import com.path.atm.vo.terminal.TerminalSC;
import com.path.bo.common.ConstantsCommon;
import com.path.bo.common.audit.AuditConstant;
import com.path.expression.common.PBFunc.BaseException;
import com.path.lib.common.util.NumberUtil;
import com.path.vo.common.audit.AuditRefCO;

/**
 * 
 * Copyright 2019, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: Alim Khowaja
 *
 * TerminalMaintAction.java used to
 */
public class TerminalMaintAction extends ATMBaseAction
{	
    private TerminalBO terminalBO;
    private TerminalCO terminalCO = new TerminalCO();
    private TerminalSC criteria = new TerminalSC();

    /**
     * return Terminal Page
     * 
     * @return
     */
    public String loadPage()
    {
	try
	{
	    set_searchGridId("terminalListGridTbl_Id");
	    set_showNewInfoBtn("true");
	    set_showSmartInfoBtn("false");

	    // fill session data
	    fillSessionData();
	}
	catch(Exception ex)
	{
	    handleException(ex, null, null);
	}
	return "terminallList";
    }

    /**
     * Save Channel Record
     * 
     * @return
     */
    public String save()
    {
	try
	{
	    fillSessionData();
	    AuditRefCO refCO = null;

	    //call Audit common method
	    terminalCO.setAuditKey(AuditConstant.atmTerminalKey);
	    fillAuditDetails(terminalCO);
	    
	    // save Channel Record
	    terminalCO = terminalBO.save(terminalCO);
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return SUCCESS;

    }

    /**
     * return Channel Record by id
     * 
     * @return
     */
    public String edit()
    {
	try
	{
	    // fill session data
	    fillSessionData();

	    // retrieve record
	    terminalCO = terminalBO.edit(criteria);
	    terminalCO.getGtw_ATM_TERMINALVO().setCOMP_CODE(criteria.getCompCode());
	    terminalCO.setUpdateMode(ConstantsCommon.YES);
	    
	    //apply retrieve audit
	    applyRetrieveAudit(AuditConstant.atmTerminalKey , terminalCO.getGtw_ATM_TERMINALVO(), terminalCO);
	}
	catch(

	Exception e)
	{
	    handleException(e, null, null);
	    return ERROR;
	}
	return "terminalMaint";
    }

    /**
     * Delete Channel Record
     * 
     * @return
     */
    public String delete()
    {
	try
	{
	    // apply session value
	    fillSessionData();
	    
	    // delete record
	    terminalBO.delete(terminalCO);
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return SUCCESS;
    }

    /**
     * clear the Form
     */
    public String clear()
    {
	try
	{
	    terminalCO = new TerminalCO();

	    //fill session Data
	    fillSessionData();
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return "terminalMaint";
    }

    /**
     * Fill Session
     * 
     * @throws BaseException
     */
    public void fillSessionData() throws BaseException
    {
	
	//fill common Session Data
	fillSessionData(terminalCO);
	criteria.setCompCode(terminalCO.getCompCode());
	criteria.setUserId(terminalCO.getUserID());
	criteria.setRunningDate(terminalCO.getRunningDate());
	terminalCO.getGtw_ATM_TERMINALVO().setCOMP_CODE(terminalCO.getCompCode());
    }
    
    /**
     * Validate Termianl
     * 
     * @return
     * @throws BaseException
     */
    public String validateTerminalId() throws BaseException
    {
	try
	{
	    terminalCO = terminalBO.validateTerminalId(terminalCO);
	    NumberUtil.resetEmptyValues(terminalCO);
	}
	catch(Exception e)
	{
	    terminalCO.getGtw_ATM_TERMINALVO().setTERMINAL_CODE("");
	    handleException(e, null, null);
	}
	return SUCCESS;
    }

    public void setTerminalBO(TerminalBO terminalBO)
    {
	this.terminalBO = terminalBO;
    }

    public TerminalCO getTerminalCO()
    {
	return terminalCO;
    }

    public void setTerminalCO(TerminalCO terminalCO)
    {
	this.terminalCO = terminalCO;
    }

    public TerminalSC getCriteria()
    {
	return criteria;
    }

    public void setCriteria(TerminalSC criteria)
    {
	this.criteria = criteria;
    }
}