package com.path.atm.actions.lookups.teller;

import com.path.atm.bo.common.ATMCommonConstants;
import com.path.atm.bo.teller.TellerBO;
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
public class TellerLookupDependancyAction extends LookupBaseAction
{

    private TellerSC tellerSC = new TellerSC();
    private TellerBO atmTellerBO;
    private TellerCO tellerCO;
    

    /**
     * Construct vault Lookup based on the VO returned in the resultMap.
     * 
     * @return
     */
    public String returnTellerDetails()
    {

	try
	{

	    SessionCO sessionCO = returnSessionObject();
	    
	    tellerSC.setStatus(ATMCommonConstants.STATUS_ACTIVE);
	    tellerSC.setPageNumber(getPage());
	    tellerSC.setRecords(getRecords());
	    tellerSC.setCompCode(sessionCO.getCompanyCode());
	    
	    // return Dependancy by teller code
	    
	    tellerCO = atmTellerBO.returnTellerDetails(tellerSC);
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
	return tellerSC;
    }

    public TellerSC getTellerSC()
    {
	return tellerSC;
    }

    public void setTellerSC(TellerSC tellerSC)
    {
	this.tellerSC = tellerSC;
    }

    public void setAtmTellerBO(TellerBO atmTellerBO)
    {
        this.atmTellerBO = atmTellerBO;
    }

    public TellerCO getTellerCO()
    {
	return tellerCO;
    }

    public void setTellerCO(TellerCO tellerCO)
    {
	this.tellerCO = tellerCO;
    }

}
