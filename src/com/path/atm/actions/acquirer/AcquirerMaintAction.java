package com.path.atm.actions.acquirer;

import java.util.List;

import com.path.atm.actions.common.base.ATMBaseAction;
import com.path.atm.bo.acquirer.AcquirerBO;
import com.path.atm.bo.terminal.TerminalConstant;
import com.path.atm.dbmaps.vo.GTW_ATM_ACQUIRER_TRX_TYPEVO;
import com.path.atm.vo.acquirer.AcquirerCO;
import com.path.atm.vo.acquirer.AcquirerSC;
import com.path.bo.common.ConstantsCommon;
import com.path.bo.common.audit.AuditConstant;
import com.path.expression.common.PBFunc.BaseException;
import com.path.lib.common.util.StringUtil;
import com.path.lib.vo.GridUpdates;
import com.path.vo.common.select.SelectCO;
import com.path.vo.common.select.SelectSC;

/**
 * 
 * Copyright 2019, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: Alim Khowaja
 *
 * AcquirerMaintAction.java used to
 */
public class AcquirerMaintAction extends ATMBaseAction
{
    private AcquirerBO acquirerBO;
    private AcquirerCO acquirerCO = new AcquirerCO();
    private AcquirerSC criteria = new AcquirerSC();
    private List<SelectCO> terminalTypeList;

    /**
     * return Acquirer Page
     * 
     * @return
     */
    public String loadPage()
    {
	try
	{
	    set_searchGridId("acquirerListGridTbl_Id");
	    set_showNewInfoBtn("true");
	    set_showSmartInfoBtn("false");
	   // set_enableAudit(false);
	    fillSessionData();

	    // set disable/set readonly fields
	    acquirerCO = acquirerBO.applySysParamSettings(acquirerCO);
	    
	    setAdditionalScreenParams(acquirerCO.getElementMap());
	    
	    // fill dropdown data
	    fillDropDown();
	    
	}
	catch(Exception ex)
	{
	    handleException(ex, null, null);
	}
	return "acquirerlList";
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
	    
	    //call Audit common method
	    acquirerCO.setAuditKey(AuditConstant.atmAcquirerKey);
	    fillAuditDetails(acquirerCO);
	    
	    //parse acquirer Transaction and set into CO
	    if(StringUtil.isNotEmpty(acquirerCO.getTransactionJSON()))
	    {
		GridUpdates gu = getGridUpdates(acquirerCO.getTransactionJSON(), GTW_ATM_ACQUIRER_TRX_TYPEVO.class);
		acquirerCO.setAddGridList(gu.getLstAdd());
		acquirerCO.setModifyGridList(gu.getLstModify());
		acquirerCO.setDeleteGridList(gu.getLstDelete());
	    }
	    // save Channel Record
	    acquirerCO = acquirerBO.save(acquirerCO);
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

	    // fill dropdown
	    fillDropDown();
	    
	    // retrieve record
	    acquirerCO = acquirerBO.edit(criteria);
	    acquirerCO.getGtw_ATM_ACQUIRER().setCOMP_CODE(criteria.getCompCode());
	    acquirerCO.setUpdateMode(ConstantsCommon.YES);
	   
	    //apply Audit for retrieve reecord
	    applyRetrieveAudit(AuditConstant.atmAcquirerKey, acquirerCO.getGtw_ATM_ACQUIRER(), acquirerCO);
	    
	    //set Additional screen parameters like hide/show/mandatory/enalble/disable 
	    acquirerCO.setBankAtmYN(acquirerCO.getGtw_ATM_ACQUIRER().getBANK_ATM_YN());
	    setAdditionalScreenParams(acquirerBO.applySysParamSettings(acquirerCO).getElementMap());
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	    return ERROR;
	}
	return "acquirerMaint";
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
	    acquirerBO.delete(acquirerCO);
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
	    acquirerCO = new AcquirerCO();
	    fillSessionData();
	    // set disable/set readonly fields
	    setAdditionalScreenParams(acquirerBO.applySysParamSettings(acquirerCO).getElementMap());
	    
	    //fill dropdow
	    fillDropDown();
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return "acquirerMaint";
    }
    
    /**
     * apply display setting on fields
     * @return
     */
    public String applyDisplaySettingFields()
    {
	try
	{
	    setAdditionalScreenParams(acquirerBO.applySysParamSettings(acquirerCO).getElementMap());
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return SUCCESS;
    }

    /**
     * Fill Session
     * 
     * @throws BaseException
     */
    public void fillSessionData() throws BaseException
    {
	
	//fill common Session Data
	fillSessionData(acquirerCO);
		
	criteria.setCompCode(acquirerCO.getCompCode());
	criteria.setUserId(acquirerCO.getUserID());
	criteria.setRunningDate(acquirerCO.getRunningDate());
	acquirerCO.getGtw_ATM_ACQUIRER().setCOMP_CODE(acquirerCO.getCompCode());
    }
    
    /**
     * Fill Dropdown
     */
    private void fillDropDown()
    {
	try
	{
	    SelectSC selSC = new SelectSC(TerminalConstant.TERMINAL_TYPE_LOV);
	    terminalTypeList = fillDropDown(selSC);
	}
	catch(Exception ex)
	{
	    handleException(ex, null, null);
	}
    }

    public AcquirerBO getAcquirerBO()
    {
	return acquirerBO;
    }

    public void setAcquirerBO(AcquirerBO acquirerBO)
    {
	this.acquirerBO = acquirerBO;
    }

    public AcquirerCO getAcquirerCO()
    {
	return acquirerCO;
    }

    public void setAcquirerCO(AcquirerCO acquirerCO)
    {
	this.acquirerCO = acquirerCO;
    }

    public AcquirerSC getCriteria()
    {
	return criteria;
    }

    public void setCriteria(AcquirerSC criteria)
    {
	this.criteria = criteria;
    }

    public List<SelectCO> getTerminalTypeList()
    {
        return terminalTypeList;
    }

    public void setTerminalTypeList(List<SelectCO> terminalTypeList)
    {
        this.terminalTypeList = terminalTypeList;
    }
}