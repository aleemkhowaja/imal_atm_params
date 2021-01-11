package com.path.atm.actions.isomessagesdefinition;

import java.util.List;

import com.path.atm.bo.isomessagesdefinition.ISOMessagesDefinitionBO;
import com.path.atm.vo.isomessagesdefinition.ISOMessagesDefinitionCO;
import com.path.atm.vo.isomessagesdefinition.ISOMessagesDefinitionSC;
import com.path.struts2.lib.common.base.GridBaseAction;
import com.path.vo.common.SessionCO;
import com.path.vo.customexpression.ExpressionParamCO;

/**
 * 
 * Copyright 2019, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: Alim Khowaja
 *
 * ISOMessagesDefinitionListAction.java used to Action of ISO Message Definition
 */
public class ISOMessagesDefinitionListAction extends GridBaseAction
{
    private ISOMessagesDefinitionBO isoMessagesDefinitionBO;
    private ISOMessagesDefinitionSC criteria = new ISOMessagesDefinitionSC();
    private List<ExpressionParamCO> expressionParamCOs;
    
    public String loadISOMessagesDefinitionGrid()
    {
	try
	{
	    SessionCO sessionCO = returnSessionObject();
	    
	    String[] searchCol = { 
		    	"gtw_ATM_ISO_MSG_DEF.ISO_MSG_DEF_ID",
		    	"gtw_ATM_ISO_MSG_DEF.COMP_CODE", 
		    	"gtw_ATM_ISO_MSG_DEF.DESCRIPTION",
		    	"INTERFACE_CODE",
		    	"atmInterfaceDescription"
	    };
	    
	    criteria.setSearchCols(searchCol);
	    copyproperties(criteria);
	    criteria.setCompCode(sessionCO.getCompanyCode());
	    criteria.setCurrAppName(sessionCO.getCurrentAppName());
	    criteria.setPreferredLanguage(sessionCO.getLanguage());
	    criteria.setMenuRef(get_pageRef());
	    criteria.setCrudMode(getIv_crud());
	    if(checkNbRec(criteria))
	    {
	    	setRecords(isoMessagesDefinitionBO.returnISOMessagesDefinitionListCount(criteria));
	    }
	    expressionParamCOs = isoMessagesDefinitionBO.returnISOMessagesDefinitionList(criteria);
	    setGridModel(expressionParamCOs);
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return SUCCESS;
    }
    
    /**
     * load ISO Fields for Expression dialog
     * @returns
     */
    public String loadFieldsByInterfaceCodeAndMTICode()
    {
	try
	{
	    SessionCO sessionCO = returnSessionObject();
	    
	    String[] searchCol = { 
		    	"iso_INT_FLDSVO.FIELD_NAME",
		    	"iso_INT_FLDSVO.FIXED_LENGTH", 
		    	"iso_INT_FLDSVO.FIELD_TYPE",
		    	"TYPE"
	    };
	    
	    criteria.setSearchCols(searchCol);
	    copyproperties(criteria);
	    criteria.setCompCode(sessionCO.getCompanyCode());
	    criteria.setCurrAppName(sessionCO.getCurrentAppName());
	    criteria.setPreferredLanguage(sessionCO.getLanguage());
	    criteria.setMenuRef(get_pageRef());
	    criteria.setCrudMode(getIv_crud());
	    criteria.setNbRec(-1);
	    List<ExpressionParamCO> expressionCOLst  = isoMessagesDefinitionBO.returnFieldsByInterfaceCodeAndMTICOde(criteria);
	    if(null != criteria.getResponseSelectedRowFields())
	    {
		    String selectedRowFields = criteria.getResponseSelectedRowFields();
		    ExpressionParamCO expressionParamCO = null;
	    	String[] x = selectedRowFields.split(",");
	    	for(String str : x)
	    	{
	    		expressionParamCO = new ExpressionParamCO();
	    		expressionParamCO.setParameterName(str);
	    		expressionParamCO.setParameterValue(str);
	    		expressionCOLst.add(expressionParamCO);
	    	}
	    }
	    setGridModel(expressionCOLst);
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return SUCCESS;
    }

    /**
     * Retun ISO Message Definition Fields
     * @return
     */
    public String returnISOMsgFieldsByInterfaceCodeAndMTICOde()
    {
	try
	{
	    SessionCO sessionCO = returnSessionObject();
	    copyproperties(criteria);
	    criteria.setCompCode(sessionCO.getCompanyCode());
	    criteria.setCurrAppName(sessionCO.getCurrentAppName());
	    criteria.setPreferredLanguage(sessionCO.getLanguage());
	    criteria.setMenuRef(get_pageRef());
	    criteria.setCrudMode(getIv_crud());
	    criteria.setNbRec(-1);
	    /**
	     * return Req/response ISO Fields by interface code and mti
	     */
	    List<ISOMessagesDefinitionCO> isoMessagesDefinitionCOs  = isoMessagesDefinitionBO.returnISOMsgFieldsByInterfaceCodeAndMTICOde(criteria);
	    setGridModel(isoMessagesDefinitionCOs);
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

    public ISOMessagesDefinitionSC getCriteria()
    {
	return criteria;
    }

    public void setCriteria(ISOMessagesDefinitionSC criteria)
    {
	this.criteria = criteria;
    }

    public void setIsoMessagesDefinitionBO(ISOMessagesDefinitionBO isoMessagesDefinitionBO)
    {
        this.isoMessagesDefinitionBO = isoMessagesDefinitionBO;
    }

	public List<ExpressionParamCO> getExpressionParamCOs() {
		return expressionParamCOs;
	}

	public void setExpressionParamCOs(List<ExpressionParamCO> expressionParamCOs) {
		this.expressionParamCOs = expressionParamCOs;
	}
 
}
