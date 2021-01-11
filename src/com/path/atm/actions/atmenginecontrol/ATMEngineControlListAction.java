package com.path.atm.actions.atmenginecontrol;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.path.atm.bo.atmenginecontrol.ATMEngineControlBO;
import com.path.atm.bo.common.ATMCommonConstants;
import com.path.atm.vo.atmenginecontrol.ATMEngineControlCO;
import com.path.atm.vo.atmenginecontrol.ATMEngineControlSC;
import com.path.atm.vo.isomessageparsing.ISOMessageParseCO;
import com.path.lib.common.util.StringUtil;
import com.path.struts2.lib.common.base.GridBaseAction;
import com.path.vo.common.SessionCO;

/**
 * 
 * Copyright 2013, Path Solutions Path Solutions retains all ownership rights to
 * this source code
 * 
 * ATMEngineControlListAction.java used to
 */
public class ATMEngineControlListAction extends GridBaseAction
{

    private static final long serialVersionUID = 1L;
    private ATMEngineControlBO atmEngineControlBO;
    private ATMEngineControlCO atmEngineControlCO = new ATMEngineControlCO();
    private ATMEngineControlSC criteria = new ATMEngineControlSC();


    public String returnEngineDataForGrid()
    {
	String[] searchCol = { "INTERFACE_ID", "STATUS" , "STATUS_DESC",  "START_TIME" ,"MESSAGE", "MACHINE_NAME_IP" };
	HashMap<String, String> dateSearchCol = new HashMap<String, String>();

	try
	{	    
	    SessionCO sessionCO = returnSessionObject();

	    criteria.setSearchCols(searchCol);
	    dateSearchCol.put("START_TIME", "START_TIME");
	    criteria.setDateSearchCols(dateSearchCol);
	    
	    criteria.setCompCode(sessionCO.getCompanyCode());
	    criteria.setBranchCode(sessionCO.getBranchCode());
	    criteria.setCurrAppName(sessionCO.getCurrentAppName());
	    criteria.setProgRef(get_pageRef());
	    criteria.setIvCrud(getIv_crud());
	    criteria.setLovTypeId(ATMCommonConstants.ATM_ENGINE_INTERFACE_STATUS_LOV);
	    criteria.setPreferredLanguage(sessionCO.getLanguage());
	    

	    copyproperties(criteria);

	    List<ATMEngineControlCO> lst = new ArrayList<>();

	    if(checkNbRec(criteria))
	    {
		setRecords(atmEngineControlBO.returnATMEngineCount(criteria));
	    }

	    lst = atmEngineControlBO.returnATMEngineList(criteria);
	    setGridModel(lst);

	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return SUCCESS;
    }

    
    
    /**
     * load the data for the monitoring grid
     * 
     * @return
     */
    public String returnATMEngineRequestDataForGrid()
    {
	String[] searchCol = { "INTERFACE_ID","COMP_CODE","BRANCH_CODE","TELLER_CODE","ACQUIRER_CODE",
		"TERMINAL_ID","MTI_CODE_REQUEST","MTI_CODE_RESPONSE",
		"MESSAGE_ID" , "MESSAGE_REQUEST","RECEIVE_TIME", "STATUS", "STATUS_DESC"
		,"START_TIME", "END_TIME", "PROCESS_CODE", "RESPONSE_CODE", "ERROR_MESSAGE"};
	HashMap<String, String> dateSearchCol = new HashMap<String, String>();
			
	try
	{
	    SessionCO sessionCO = returnSessionObject();

	    criteria.setSearchCols(searchCol);
	    dateSearchCol.put("RECEIVE_TIME", "RECEIVE_TIME");
	    criteria.setDateSearchCols(dateSearchCol);
	    criteria.setCompCode(sessionCO.getCompanyCode());
	    criteria.setBranchCode(sessionCO.getBranchCode());
	    criteria.setCurrAppName(sessionCO.getCurrentAppName());
	    criteria.setProgRef(get_pageRef());
	    criteria.setIvCrud(getIv_crud());
	    criteria.setLovTypeId(ATMCommonConstants.ATM_ENGINE_REQUEST_MESSAGE_STATUS_LOV);
	    criteria.setPreferredLanguage(sessionCO.getLanguage());
	    criteria.setStartDate(atmEngineControlCO.getStartDate());
	    criteria.setEndDate(atmEngineControlCO.getEndDate());
	    criteria.setStatus(atmEngineControlCO.getSTATUS());
	    
	    copyproperties(criteria);

	    criteria.setPreferredLanguage(sessionCO.getLanguage());

	    if(checkNbRec(criteria))
	    {
		setRecords(atmEngineControlBO.returnAlertEngineRequestCount(criteria));
	    }
	    List<ATMEngineControlCO> lst = atmEngineControlBO.returnAlertEngineRequest(criteria);
	    setGridModel(lst);	   
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return SUCCESS;
    }
    
    
    /**
     * load the data for the monitoring grid
     * 
     * @return
     */
    public String returnISOMessageData()
    {
	String[] searchCol = { "fieldCode", "fieldValue" , "fieldName"};
	HashMap<String, String> dateSearchCol = new HashMap<String, String>();
			
	try
	{

	    SessionCO sessionCO = returnSessionObject();
	    
	    criteria.setCompCode(sessionCO.getCompanyCode());
	    criteria.setBranchCode(sessionCO.getBranchCode());
	    criteria.setCurrAppName(sessionCO.getCurrentAppName());
	    criteria.setProgRef(get_pageRef());
	    criteria.setNbRec(-1);
	    copyproperties(criteria);

	    criteria.setPreferredLanguage(sessionCO.getLanguage());

	    List<ISOMessageParseCO> lst = new ArrayList<>();

	    lst = atmEngineControlBO.retrieveISOFields(criteria);
	    
	    setGridModel(lst);	   

	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return SUCCESS;
    }
    
    /**
     * Load Atm Engine Action Log
     * @return
     */
    public String returnEngineActionLogForGrid()
    {
	try
	{
	    String[] searchCol = { "ATM_ENG_ACTION_LOG_ID", "START_TIME", "MESSAGE"};
	    SessionCO sessionCO = returnSessionObject();
	    HashMap<String, String> dateSearchCol = new HashMap<String, String>();
	    dateSearchCol.put("ACTION_START_TIME","ACTION_START_TIME");
	    criteria.setDateSearchCols(dateSearchCol);
	    
	    
	    criteria.setSearchCols(searchCol);
	    criteria.setCompCode(sessionCO.getCompanyCode());
	    criteria.setBranchCode(sessionCO.getBranchCode());
	    criteria.setCurrAppName(sessionCO.getCurrentAppName());
	    criteria.setPreferredLanguage(sessionCO.getLanguage());
	    copyproperties(criteria);
	    
	    if(checkNbRec(criteria))
	    {
		setRecords(atmEngineControlBO.returnATMEngineActionLogCount(criteria));
	    }
	    List<ATMEngineControlCO> lst = atmEngineControlBO.returnATMEngineActionlogList(criteria);
	    setGridModel(lst);	   
	    
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return SUCCESS;  
    }
    
    public void setAtmEngineControlBO(ATMEngineControlBO atmEngineControlBO)
    {
	this.atmEngineControlBO = atmEngineControlBO;
    }

    @Override
    public Object getModel()
    {
	return criteria;
    }
   
    public ATMEngineControlCO getAtmEngineControlCO()
    {
        return atmEngineControlCO;
    }
    
    public void setAtmEngineControlCO(ATMEngineControlCO atmEngineControlCO)
    {
        this.atmEngineControlCO = atmEngineControlCO;
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
