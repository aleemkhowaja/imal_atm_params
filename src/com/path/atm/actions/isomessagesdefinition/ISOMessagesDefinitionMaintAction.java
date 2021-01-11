package com.path.atm.actions.isomessagesdefinition;

import java.util.HashMap;
import java.util.List;

import com.path.atm.actions.common.base.ATMBaseAction;
import com.path.atm.bo.isomessagesdefinition.ISOMessagesDefinitionBO;
import com.path.atm.bo.isomessagesdefinition.ISOMessagesDefinitionConstants;
import com.path.atm.vo.isomessagesdefinition.ISOMessagesDefinitionCO;
import com.path.atm.vo.isomessagesdefinition.ISOMessagesDefinitionSC;
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
 * ISOMessagesDefinitionMaintAction.java used to
 */
public class ISOMessagesDefinitionMaintAction extends ATMBaseAction
{
    private ISOMessagesDefinitionBO isoMessagesDefinitionBO;
    private ISOMessagesDefinitionCO isomessagesdefinitionCO = new ISOMessagesDefinitionCO();
    private ISOMessagesDefinitionSC criteria = new ISOMessagesDefinitionSC();
    
    private List<SelectCO> networkMesssageTypeList;

    /**
     * Load ISO Message definition Page
     * @return
     */
    public String loadISOMessagesDefinitionPage()
    {
	try
	{
	    set_showNewInfoBtn("true");
	    set_showSmartInfoBtn("false");
	    // set_enableAudit(false);
	    fillSessionData();
	    
	    //fill dropdowns
	    fillDropDown();

	    set_searchGridId("iSOMessagesDefinitionListGridTbl_Id");
	    
	   //set Additional screen parameters like hide/show/mandatory/enalble/disable 
	    setAdditionalScreenParams(isoMessagesDefinitionBO.applySysParamSettings(isomessagesdefinitionCO).getElementMap());
	}
	catch(Exception ex)
	{
	    handleException(ex, null, null);
	}
	return "isoMessagesDefinitionList";
    }

    /**
     * save ISO Messages Definition record
     * @return
     */
    public String save()
    {
	try
	{
	    fillSessionData();
	    
	    //call Audit common method
	    isomessagesdefinitionCO.setAuditKey(AuditConstant.atmISOMessagesDefinitionKey);
	    fillAuditDetails(isomessagesdefinitionCO);
	    
	    HashMap<String, Object> gridsDataMap = new HashMap<String, Object>();
	    
	    //get request fields json
	    if(StringUtil.isNotEmpty(isomessagesdefinitionCO.getRequestFields()))
	    {
		GridUpdates gu = getGridUpdates(isomessagesdefinitionCO.getRequestFields(), ISOMessagesDefinitionCO.class, true);
		gridsDataMap.put("requestFields", gu.getLstAllRec());
	    }
	    
	    //get response fields json
	    if(StringUtil.isNotEmpty(isomessagesdefinitionCO.getResponseFields()))
	    {
		GridUpdates gu1 = getGridUpdates(isomessagesdefinitionCO.getResponseFields(), ISOMessagesDefinitionCO.class, true);
		gridsDataMap.put("responseFields", gu1.getLstAllRec());
	    }
	    /**
	     * Fill request/response hashmap to CO hashmap
	     */
	    isomessagesdefinitionCO.setGridsDataMap(gridsDataMap);
	    
	    // save Channel Record
	    isomessagesdefinitionCO = isoMessagesDefinitionBO.save(isomessagesdefinitionCO);
	}
	catch(Exception ex)
	{
	    handleException(ex, null, null);
	}
	return SUCCESS;
    }

    /**
     * Edit ISO Messages Definition while dbClick from grid
     * @return
     */
    public String edit()
    {
	try 
	{
	    // fill session data
	    fillSessionData();
	    
	    //fill dropdowns
	    fillDropDown();

	    // retrieve record
	    isomessagesdefinitionCO = isoMessagesDefinitionBO.edit(criteria);
	    isomessagesdefinitionCO.getGtw_ATM_ISO_MSG_DEF().setCOMP_CODE(criteria.getCompCode());
	    isomessagesdefinitionCO.setUpdateMode(ConstantsCommon.YES);
	   
	    //apply Audit for retrieve reecord
	    applyRetrieveAudit(AuditConstant.atmISOMessagesDefinitionKey, isomessagesdefinitionCO.getGtw_ATM_ISO_MSG_DEF(), isomessagesdefinitionCO);
	    
	    //set Additional screen parameters like hide/show/mandatory/enalble/disable 
	    setAdditionalScreenParams(isoMessagesDefinitionBO.applySysParamSettings(isomessagesdefinitionCO).getElementMap());

	}
	catch(Exception ex)
	{
	    handleException(ex, null, null);
	}
	return "isoMessagesDefinitionMaint";
    }
    
   /**
    * Delete ISO Messages Definition record
    * @return
    */
    public String delete()
    {
	try
	{
	    // apply session value
	    fillSessionData();
	    // delete record
	    isoMessagesDefinitionBO.delete(isomessagesdefinitionCO);
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return SUCCESS;
    }
    
   /**
    * Clear ISO Messages Definition form 
    * @return
    */
    public String clear()
    {
	try
	{
	    isomessagesdefinitionCO = new ISOMessagesDefinitionCO();
	    fillSessionData();
	    
	    fillDropDown();
	    
	    //set Additional screen parameters like hide/show/mandatory/enalble/disable 
	    setAdditionalScreenParams(isoMessagesDefinitionBO.applySysParamSettings(isomessagesdefinitionCO).getElementMap());
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return "isoMessagesDefinitionMaint";
    }

    /**
     * Fill Session
     * 
     * @throws BaseException
     */
    public void fillSessionData() throws BaseException
    {
	//fill common Session Data
	fillSessionData(isomessagesdefinitionCO);
	
	criteria.setCompCode(isomessagesdefinitionCO.getCompCode());
	isomessagesdefinitionCO.getGtw_ATM_ISO_MSG_DEF().setCOMP_CODE(criteria.getCompCode());
    }
    
    
   /**
    * method to call common fill dropdown method
    */
    private void fillDropDown()
    {
	try
	{
	    //fill the network Message Type List dropdown by calling common method
	    SelectSC selSC = new SelectSC(ISOMessagesDefinitionConstants.NETWORK_MESSAGE_TYPE_LOV);
	    networkMesssageTypeList = fillDropDown(selSC);
	    
	}
	catch(Exception ex)
	{
	    handleException(ex, null, null);
	}
    }
    
    /**
     * apply display setting on fields
     * @return
     */
    public String applyDisplaySettingFields()
    {
	try
	{
	    setAdditionalScreenParams(isoMessagesDefinitionBO.applySysParamSettings(isomessagesdefinitionCO).getElementMap());
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return SUCCESS;
    }

    

    public void setIsoMessagesDefinitionBO(ISOMessagesDefinitionBO isoMessagesDefinitionBO)
    {
        this.isoMessagesDefinitionBO = isoMessagesDefinitionBO;
    }

    public ISOMessagesDefinitionCO getIsomessagesdefinitionCO()
    {
        return isomessagesdefinitionCO;
    }

    public void setIsomessagesdefinitionCO(ISOMessagesDefinitionCO isomessagesdefinitionCO)
    {
        this.isomessagesdefinitionCO = isomessagesdefinitionCO;
    }

    public ISOMessagesDefinitionSC getCriteria()
    {
        return criteria;
    }

    public void setCriteria(ISOMessagesDefinitionSC criteria)
    {
        this.criteria = criteria;
    }

    public List<SelectCO> getNetworkMesssageTypeList()
    {
        return networkMesssageTypeList;
    }

    public void setNetworkMesssageTypeList(List<SelectCO> networkMesssageTypeList)
    {
        this.networkMesssageTypeList = networkMesssageTypeList;
    }
}