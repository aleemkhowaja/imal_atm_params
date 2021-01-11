package com.path.atm.bo.teller.impl;

import java.util.List;

import com.path.atm.bo.teller.TellerBO;
import com.path.atm.dao.teller.TellerDAO;
import com.path.atm.vo.teller.TellerCO;
import com.path.atm.vo.teller.TellerSC;
import com.path.bo.common.CommonMethods;
import com.path.lib.common.base.BaseBO;

/**
 * 
 * Copyright 2019, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: Alim Khowaja
 *
 * TellerBOImpl.java used to
 */
public class TellerBOImpl extends BaseBO implements TellerBO
{
    private TellerDAO atmTellerDAO;

    @Override
    public List returnTellerList(TellerSC tellerSC) throws Exception
    {
	//connection for other database
	String jndiname = "services.jndi";
	CommonMethods.applyConnectionJNDIToSC(tellerSC, jndiname);
	
	return atmTellerDAO.returnTellerList(tellerSC);
    }
    
    @Override
    public int returnTellerCount(TellerSC tellerSC) throws Exception
    {
	//connection for other database
	String jndiname = "services.jndi";
	CommonMethods.applyConnectionJNDIToSC(tellerSC, jndiname);
	
	return atmTellerDAO.returnTellerCount(tellerSC);
    }

    @Override
    public TellerCO returnTellerDetails(TellerSC tellerSC) throws Exception
    {
	String jndiname = "services.jndi";
	CommonMethods.applyConnectionJNDIToSC(tellerSC, jndiname);
	return atmTellerDAO.returnTellerDetails(tellerSC);
    }
    
    public void setAtmTellerDAO(TellerDAO atmTellerDAO)
    {
        this.atmTellerDAO = atmTellerDAO;
    }
    
}