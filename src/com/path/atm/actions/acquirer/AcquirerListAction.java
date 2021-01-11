package com.path.atm.actions.acquirer;

import com.path.atm.bo.acquirer.AcquirerBO;
import com.path.atm.vo.acquirer.AcquirerSC;
import com.path.bo.common.ConstantsCommon;
import com.path.struts2.lib.common.base.GridBaseAction;
import com.path.vo.common.SessionCO;

/**
 * 
 * Copyright 2019, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: Alim KHowaja
 *
 * AcquirerListAction.java used to
 */
public class AcquirerListAction extends GridBaseAction
{
    private AcquirerBO acquirerBO;
    private AcquirerSC criteria = new AcquirerSC();

    /**
     * return Channel Grid
     * 
     * @return
     */
    public String returnAcquirerListForGrid()
    {
	try
	{
	    SessionCO sessionCO = returnSessionObject();
	    String[] searchCol = { "gtw_ATM_ACQUIRER.ACQUIRER_ID", "gtw_ATM_ACQUIRER.DESCRIPTION",
		    "bankATMDescription", "gtw_ATM_ACQUIRER.TRANSACTION_BRANCH","atmInterfaceDescription" };
	    criteria.setSearchCols(searchCol);
	    copyproperties(criteria);
	    criteria.setCompCode(sessionCO.getCompanyCode());
	    criteria.setCurrAppName(sessionCO.getCurrentAppName());
	    criteria.setPreferredLanguage(sessionCO.getLanguage());
	    criteria.setMenuRef(get_pageRef());
	    criteria.setCrudMode(getIv_crud());
	    if(checkNbRec(criteria))
	    {
		setRecords(acquirerBO.returnAcquirerListCount(criteria));
	    }
	    setGridModel(acquirerBO.returnAcquirerList(criteria));
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return SUCCESS;
    }
    
    /**
     * return Channel Grid
     * 
     * @return
     */
    public String returnExpressionListForGrid()
    {
	try
	{
	    SessionCO sessionCO = returnSessionObject();
	    
	    String[] searchCol = { "TRX_NUMBER", "TRX_DESCRIPTION",
		    "TRX_EXPRESSION", "CHARGES_TRX_NUMBER",
		    "CHARGES_TRX_DESCRIPTION", "CHARGES_TRX_EXPRESSION", "DESCRIPTION"};
	    
	    criteria.setSearchCols(searchCol);
	    copyproperties(criteria);
	    criteria.setCompCode(sessionCO.getCompanyCode());
	    criteria.setCurrAppName(sessionCO.getCurrentAppName());
	    criteria.setPreferredLanguage(sessionCO.getLanguage());
	    criteria.setMenuRef(get_pageRef());
	    criteria.setCrudMode(getIv_crud());
	    if(criteria.getAcquirerId() != null && !criteria.getAcquirerId().equals(ConstantsCommon.EMPTY_BIGDECIMAL_VALUE))
	    {
		if(checkNbRec(criteria))
		{
		    setRecords(acquirerBO.returnAcquirerTransactionsListCount(criteria));
		}
		setGridModel(acquirerBO.returnAcquirerTransactionsList(criteria));
	    }
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return SUCCESS;
    }

    @Override
    public Object getModel()
    {
	return criteria;
    }

    public AcquirerSC getCriteria()
    {
	return criteria;
    }

    public void setCriteria(AcquirerSC criteria)
    {
	this.criteria = criteria;
    }

    public void setAcquirerBO(AcquirerBO acquirerBO)
    {
	this.acquirerBO = acquirerBO;
    }

}
