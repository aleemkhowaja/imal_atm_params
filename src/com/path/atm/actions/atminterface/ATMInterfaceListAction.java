package com.path.atm.actions.atminterface;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import com.path.atm.bo.atminterface.AtmInterfaceBO;
import com.path.atm.bo.atminterface.AtmInterfaceConstants;
import com.path.atm.bo.common.ATMCommonConstants;
import com.path.atm.vo.atminterface.AtmInterfaceSC;
import com.path.bo.common.ConstantsCommon;
import com.path.struts2.lib.common.base.GridBaseAction;
import com.path.vo.common.SessionCO;

/**
 * 
 * Copyright 2019, Path Solutions Path Solutions retains all ownership rights to
 * this source code
 * 
 * @author: Alim Khowaja
 *
 *          ATMInterfaceListAction.java used to
 */
public class ATMInterfaceListAction extends GridBaseAction
{
    private AtmInterfaceBO atmInterfaceBO;

    AtmInterfaceSC criteria = new AtmInterfaceSC();

    /**
     * Method to load All Interfaces
     * 
     * @return
     */
    public String loadInterfaceGrid()
    {
	try
	{
	    SessionCO sessionCO = returnSessionObject();
	    criteria.setCompCode(sessionCO.getCompanyCode());
	    criteria.setCurrAppName(sessionCO.getCurrentAppName());
	    criteria.setPreferredLanguage(sessionCO.getLanguage());
	    criteria.setInterfaceTypeLovId(AtmInterfaceConstants.INTERFACE_TYPE);
	    criteria.setLovTypeId(ATMCommonConstants.COMMON_STATUS_LOV);
	    criteria.setCrudMode(getIv_crud());
	    criteria.setPageRef(get_pageRef());

	    copyproperties(criteria);
	    if(checkNbRec(criteria))
	    {
		setRecords(atmInterfaceBO.returnInterfaceListCount(criteria));
	    }
	    setGridModel(atmInterfaceBO.returnInterfaceList(criteria));
	}
	catch(Exception e)
	{
	    log.error(e, "Error in loadInterfaceGrid of ATMInterfaceListAction");
	    handleException(e, null, null);
	}
	return SUCCESS;
    }

    /**
     * Method to ISO Type Messages for Interface
     * 
     * @return
     */
    public String loadISOMessageGrid()
    {
	try
	{
	    SessionCO sessionCO = returnSessionObject();
	    criteria.setCompCode(sessionCO.getCompanyCode());
	    criteria.setPreferredLanguage(sessionCO.getLanguage());
	    criteria.setMessageTypeLovId(AtmInterfaceConstants.MESSAGE_TYPE);

	    if(criteria.getInterfaceId() != null
		    && !ConstantsCommon.EMPTY_BIGDECIMAL_VALUE.equals(criteria.getInterfaceId()))
	    {
		criteria.setNbRec(-1);
		copyproperties(criteria);
		if(checkNbRec(criteria))
		{
		    setRecords(atmInterfaceBO.returnMessageListCount(criteria));
		}
		setGridModel(atmInterfaceBO.returnMessageList(criteria));
	    }
	    else
	    {
		setRecords(0);
		setGridModel(new ArrayList());
	    }
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return SUCCESS;
    }

    /**
     * Method to load ISO Fields for Interface
     * 
     * @return
     */
    public String loadFieldsGrid()
    {
	try
	{
	    SessionCO sessionCO = returnSessionObject();
	    criteria.setCompCode(sessionCO.getCompanyCode());
	    criteria.setPreferredLanguage(sessionCO.getLanguage());
	    criteria.setFieldTypeLovId(AtmInterfaceConstants.ISO_FIELD_TYPE);
	    copyproperties(criteria);

	    if(criteria.getInterfaceId() != null
		    && !ConstantsCommon.EMPTY_BIGDECIMAL_VALUE.equals(criteria.getInterfaceId()))
	    {
		if(criteria.getInterfaceType() != null && criteria.getInterfaceType().equals(AtmInterfaceConstants.ISO_INTERFACE))
		{
		    if(checkNbRec(criteria))
		    {
			setRecords(atmInterfaceBO.returnFieldsListCount(criteria));
		    }
		    setGridModel(atmInterfaceBO.returnFieldsList(criteria));
		}
	    }
	    else
	    {

		if(checkNbRec(criteria))
		{
		    setRecords(atmInterfaceBO.returnIsoFieldsListCount(criteria));
		}
		setGridModel(atmInterfaceBO.returnIsoFieldsList(criteria));
	    }
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return SUCCESS;
    }

    /**
     * Method to load Inner Fields for ISO Field
     * 
     * @return
     */
    public String loadInnerFieldsGrid()
    {
	try
	{
	    if(criteria.getInterfaceId() == null
		    || ConstantsCommon.EMPTY_BIGDECIMAL_VALUE.equals(criteria.getInterfaceId()))
	    {
		criteria.setInterfaceId(new BigDecimal(-1));
	    }
	    SessionCO sessionCO = returnSessionObject();
	    copyproperties(criteria);
	    if(checkNbRec(criteria))
	    {
		setRecords(atmInterfaceBO.returnIsoSubFieldsListCount(criteria));
	    }
	    setGridModel(atmInterfaceBO.returnIsoSubFieldsList(criteria));
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return SUCCESS;
    }
    
    
    /**
     * Method to load ISO Fields for Acquirer Expression
     * 
     * @return
     */
    public String returnISOFieldsExpressionGrid()
    {
	try
	{
	    SessionCO sessionCO = returnSessionObject();
	    criteria.setCompCode(sessionCO.getCompanyCode());
	    criteria.setPreferredLanguage(sessionCO.getLanguage());
	    criteria.setFieldTypeLovId(AtmInterfaceConstants.ISO_FIELD_TYPE);
	    copyproperties(criteria);
	    setGridModel(atmInterfaceBO.returnISOFieldListForExpression(criteria));
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return SUCCESS;
    }

    /**
     * Test ISO Message to Fill Result Fields
     */
    public String testISOMessage()
    {
	try
	{
	    SessionCO sessionCO = returnSessionObject();
	    criteria.setCompCode(sessionCO.getCompanyCode());
	    criteria.setPreferredLanguage(sessionCO.getLanguage());
	    criteria.setFieldTypeLovId(AtmInterfaceConstants.ISO_FIELD_TYPE);
	    List dataList = atmInterfaceBO.testISOMessage(criteria);
	    if(checkNbRec(criteria))
	    {
		setRecords(dataList.size());
	    }
	    setGridModel(dataList);
	}
	catch(Exception ex)
	{
	    handleException(ex, null, null);
	}
	return SUCCESS;
    }

    /**
     * Method to load Jobs for Messages
     * 
     * @return
     */
    public String loadMsgJobGrid()
    {
	try
	{
	    setRecords(0);
	    setGridModel(new ArrayList<>());
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return SUCCESS;
    }

    public Object getModel()
    {
	return criteria;
    }

    public AtmInterfaceSC getCriteria()
    {
	return criteria;
    }

    public void setCriteria(AtmInterfaceSC criteria)
    {
	this.criteria = criteria;
    }

    public void setAtmInterfaceBO(AtmInterfaceBO atmInterfaceBO)
    {
	this.atmInterfaceBO = atmInterfaceBO;
    }
}
