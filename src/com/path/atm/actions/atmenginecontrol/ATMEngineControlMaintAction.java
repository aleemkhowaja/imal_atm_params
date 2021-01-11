package com.path.atm.actions.atmenginecontrol;

import java.util.ArrayList;
import java.util.List;
import com.path.atm.bo.atmenginecontrol.ATMEngineControlBO;
import com.path.atm.bo.common.ATMCommonConstants;
import com.path.atm.vo.atmenginecontrol.ATMEngineControlCO;
import com.path.atm.vo.atmenginecontrol.ATMEngineControlSC;
import com.path.bo.common.ConstantsCommon;
import com.path.lib.common.exception.BOException;
import com.path.lib.common.exception.BaseException;
import com.path.lib.common.util.StringUtil;
import com.path.struts2.lib.common.base.BaseAction;
import com.path.vo.common.SessionCO;
import com.path.vo.common.select.SelectCO;
import com.path.vo.common.select.SelectSC;

/**
 * 
 * Copyright 2013, Path Solutions Path Solutions retains all ownership rights to
 * this source code
 * 
 * ATMEngineControlMaintAction.java used to
 */
public class ATMEngineControlMaintAction extends BaseAction
{
    private ATMEngineControlBO atmEngineControlBO;
    private ATMEngineControlCO atmEngineControlCO = new ATMEngineControlCO();
    private ATMEngineControlSC criteria = new ATMEngineControlSC();

    private List<SelectCO> messageStatusList = new ArrayList<>();

    /**
     * make a loop on the list names to generate them
     */

    public String loadATMEngineControlPage()
    {
	try
	{
	    SessionCO sessionCO = returnSessionObject();
	    SelectSC selSC = new SelectSC(ATMCommonConstants.ATM_ENGINE_REQUEST_MESSAGE_STATUS_LOV);
	    selSC.setLanguage(sessionCO.getLanguage());
	    selSC.setLovCodesExclude("'A','N','S','X'");
	    selSC.setOrderCriteria(ConstantsCommon.LOV_ORDER_BY_SPECIFIC_ORDER);
	    messageStatusList = returnLOV(selSC);
	}
	catch(Exception ex)
	{
	    handleException(ex, null, null);
	}
	return SUCCESS;
    }

    /**
     * this method make RMI call via BO to alert engine to stop or start engine
     * control
     */
    public String startStopEngineNode()
    {

	try
	{
	    // Status may by S (Stopped) or R (Running)
	    if(StringUtil.nullToEmpty(atmEngineControlCO.getAtm_ENG_INTERFACEVO().getSTATUS()).equalsIgnoreCase("D"))
	    {
		atmEngineControlBO.start(atmEngineControlCO);
		atmEngineControlCO.setResponse(ATMCommonConstants.RESPONSE_STATUS_START);
	    }
	    else if(StringUtil.nullToEmpty(atmEngineControlCO.getAtm_ENG_INTERFACEVO().getSTATUS()).equalsIgnoreCase("R"))
	    {
		atmEngineControlBO.shutdown(atmEngineControlCO);
		atmEngineControlCO.setResponse(ATMCommonConstants.RESPONSE_STATUS_STOP);
	    }
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return "jsonSuccess";
    }

    /**
     * Validate Start/End date
     * 
     * @return
     */
    public String returnDependencyByTime()
    {
	try
	{
	    if(atmEngineControlCO.getStartDate() != null && atmEngineControlCO.getEndDate() != null)
	    {
		if(atmEngineControlCO.getStartDate().after(atmEngineControlCO.getEndDate()))
		{
		    throw new BOException(getText("start_date_cannot_greater_end_date"));
		}
	    }

	}
	catch(Exception ex)
	{
	    atmEngineControlCO.setStartDate(null);
	    atmEngineControlCO.setEndDate(null);
	    handleException(ex, null, null);
	}

	return "jsonSuccess";
    }
    
    /**
     * Return ISO Message request and Response page
     * @return
     */
    public String openMessageDialog()
    {
	try
	{
	    if(StringUtil.nullToEmpty(criteria.getDialogfor()).equals("responseErrorDetailsDialog"))
	    {
		atmEngineControlCO = atmEngineControlBO.returnAlertEngineRequestMsgDtls(criteria);
	    }
	    /**
	     * true when dialog open from Message link in Request/Response grid
	     */
	}
	catch(BaseException ex)
	{
	    handleException(ex, null, null);
	}

	return criteria.getDialogfor();
    }
    
    public void setAtmEngineControlBO(ATMEngineControlBO atmEngineControlBO)
    {
	this.atmEngineControlBO = atmEngineControlBO;
    }

    public ATMEngineControlCO getAtmEngineControlCO()
    {
	return atmEngineControlCO;
    }

    public void setAtmEngineControlCO(ATMEngineControlCO atmEngineControlCO)
    {
	this.atmEngineControlCO = atmEngineControlCO;
    }

    public List<SelectCO> getMessageStatusList()
    {
	return messageStatusList;
    }

    public void setMessageStatusList(List<SelectCO> messageStatusList)
    {
	this.messageStatusList = messageStatusList;
    }

    public ATMEngineControlSC getCriteria()
    {
        return criteria;
    }

    public void setCriteria(ATMEngineControlSC criteria)
    {
        this.criteria = criteria;
    }
}
