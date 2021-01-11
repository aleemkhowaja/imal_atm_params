package com.path.atm.actions.lookups.mti;

import com.path.atm.bo.atminterface.AtmInterfaceBO;
import com.path.atm.vo.atminterface.AtmInterfaceCO;
import com.path.atm.vo.atminterface.AtmInterfaceSC;
import com.path.bo.atminterfaces.AtmInterfacesBO;
import com.path.bo.atminterfaces.AtmInterfacesConstants;
import com.path.struts2.lib.common.base.LookupBaseAction;
import com.path.vo.atminterfaces.AtmInterfacesCO;
import com.path.vo.atminterfaces.AtmInterfacesSC;
import com.path.vo.common.SessionCO;

/**	
 * 
 * Copyright 2019, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: Alim Khowaja
 *
 * AtmInterfacesLookupDependancyAction1.java used to
 */
public class MTILookupDependancyAction extends LookupBaseAction
{

    private AtmInterfaceSC atmInterfaceSC;
    private AtmInterfaceCO atmInterfaceCO;
    private AtmInterfaceBO atmInterfaceBO;
    

    /**
     * Dependancy of MTI
     * 
     * @return
     */
    public String returnMTIDetails()
    {
	try
	{
	    SessionCO sessionCO = returnSessionObject();
	    atmInterfaceSC.setCompCode(sessionCO.getCompanyCode());
	    // return Dependancy by message Code
	    atmInterfaceCO = atmInterfaceBO.returnMessageByCode(atmInterfaceSC);
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
	return atmInterfaceSC;
    }

    public AtmInterfaceSC getAtmInterfaceSC()
    {
        return atmInterfaceSC;
    }

    public void setAtmInterfaceSC(AtmInterfaceSC atmInterfaceSC)
    {
        this.atmInterfaceSC = atmInterfaceSC;
    }

    public AtmInterfaceCO getAtmInterfaceCO()
    {
        return atmInterfaceCO;
    }

    public void setAtmInterfaceCO(AtmInterfaceCO atmInterfaceCO)
    {
        this.atmInterfaceCO = atmInterfaceCO;
    }

    public void setAtmInterfaceBO(AtmInterfaceBO atmInterfaceBO)
    {
        this.atmInterfaceBO = atmInterfaceBO;
    }
}