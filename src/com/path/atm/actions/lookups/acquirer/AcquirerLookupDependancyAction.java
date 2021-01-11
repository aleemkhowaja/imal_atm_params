package com.path.atm.actions.lookups.acquirer;

import com.path.atm.bo.acquirer.AcquirerBO;
import com.path.atm.bo.common.ATMCommonConstants;
import com.path.atm.bo.merchantmgnt.MerchantMgntConstant;
import com.path.atm.vo.acquirer.AcquirerCO;
import com.path.atm.vo.acquirer.AcquirerSC;
import com.path.bo.common.ConstantsCommon;
import com.path.struts2.lib.common.base.LookupBaseAction;
import com.path.vo.common.SessionCO;

/**
 * 
 * Copyright 2020, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: Alim Khowaja
 *
 * AcquirerLookupDependancyAction.java used to dependancy of acquirer
 */
public class AcquirerLookupDependancyAction extends LookupBaseAction
{

    private AcquirerSC acquirerSC = new AcquirerSC();
    private AcquirerBO acquirerBO;
    private AcquirerCO acquirerCO ;

    /**
     * Construct vault Lookup based on the VO returned in the resultMap.
     * 
     * @return
     */
    public String returnAcquirerDetails()
    {
	try
	{
	    SessionCO sessionCO = returnSessionObject();
	    acquirerSC.setStatus(ATMCommonConstants.STATUS_APPROVED);
	    acquirerSC.setNbRec(-1);
	    acquirerSC.setCompCode(sessionCO.getCompanyCode());
	    acquirerSC.setBranchCode(sessionCO.getBranchCode());
	    acquirerSC.setPreferredLanguage(sessionCO.getLanguage());
	    acquirerSC.setIvCrud(ConstantsCommon.CRUD_MAINTAIN);
	    acquirerSC.setStatus(MerchantMgntConstant.STATUS_APPROVED);
	    // return Dependancy by teller code
	    acquirerCO = acquirerBO.edit(acquirerSC);
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
	return acquirerSC;
    }

    public AcquirerSC getAcquirerSC()
    {
        return acquirerSC;
    }

    public void setAcquirerSC(AcquirerSC acquirerSC)
    {
        this.acquirerSC = acquirerSC;
    }

    public AcquirerCO getAcquirerCO()
    {
        return acquirerCO;
    }

    public void setAcquirerCO(AcquirerCO acquirerCO)
    {
        this.acquirerCO = acquirerCO;
    }

    public void setAcquirerBO(AcquirerBO acquirerBO)
    {
        this.acquirerBO = acquirerBO;
    }
}