package com.path.atm.actions.lookups.branch;

import com.path.atm.bo.branch.BranchBO;
import com.path.atm.bo.common.ATMCommonConstants;
import com.path.atm.bo.teller.TellerBO;
import com.path.atm.vo.branch.BranchCO;
import com.path.atm.vo.branch.BranchSC;
import com.path.atm.vo.teller.TellerCO;
import com.path.atm.vo.teller.TellerSC;
import com.path.struts2.lib.common.base.LookupBaseAction;
import com.path.vo.common.SessionCO;

/**
 * 
 * Copyright 2019, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: Alim Khowaja
 *
 * TellerLookupDependancyAction.java used to
 */
public class BranchLookupDependancyAction extends LookupBaseAction
{

    private BranchSC branchSC = new BranchSC();
    private BranchBO atmBranchBO;
    private BranchCO branchCO;

    /**
     * Construct vault Lookup based on the VO returned in the resultMap.
     * 
     * @return
     */
    public String returnBranchDetails()
    {
	try
	{
	    SessionCO sessionCO = returnSessionObject();
	    
	    branchSC.setStatus(ATMCommonConstants.STATUS_ACTIVE);
	    branchSC.setCompCode(sessionCO.getCompanyCode());
	    
	    // return Dependancy by Branch code code
	    branchCO = atmBranchBO.returnBranchDetails(branchSC);
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
	return branchSC;
    }

    public BranchCO getBranchCO()
    {
        return branchCO;
    }

    public void setBranchCO(BranchCO branchCO)
    {
        this.branchCO = branchCO;
    }

    public BranchSC getBranchSC()
    {
        return branchSC;
    }

    public void setAtmBranchBO(BranchBO atmBranchBO)
    {
        this.atmBranchBO = atmBranchBO;
    }
}
