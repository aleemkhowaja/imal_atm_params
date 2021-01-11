package com.path.atm.bo.branch.impl;

import java.util.List;

import com.path.atm.bo.branch.BranchBO;
import com.path.atm.bo.teller.TellerBO;
import com.path.atm.dao.branch.BranchDAO;
import com.path.atm.dao.teller.TellerDAO;
import com.path.atm.vo.branch.BranchCO;
import com.path.atm.vo.branch.BranchSC;
import com.path.atm.vo.teller.TellerCO;
import com.path.atm.vo.teller.TellerSC;
import com.path.bo.common.CommonMethods;
import com.path.lib.common.base.BaseBO;
import com.path.lib.common.exception.BaseException;

/**
 * 
 * Copyright 2019, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: Alim Khowaja
 *
 * TellerBOImpl.java used to
 */
public class BranchBOImpl extends BaseBO implements BranchBO
{
    private BranchDAO atmBranchDAO;

    
    @Override
    public List returnBranchByCompCodeList(BranchSC branchSC) throws BaseException
    {
	// connection for other database
	String jndiname = "services.jndi";
	CommonMethods.applyConnectionJNDIToSC(branchSC, jndiname);
	return atmBranchDAO.returnBranchByCompCodeList(branchSC);

    }

    @Override
    public int returnBranchByCompCodeCount(BranchSC branchSC) throws BaseException
    {
	//connection for other database
	String jndiname = "services.jndi";
	CommonMethods.applyConnectionJNDIToSC(branchSC, jndiname);
	
	return atmBranchDAO.returnBranchByCompCodeCount(branchSC);
    }

    @Override
    public BranchCO returnBranchDetails(BranchSC branchSC) throws BaseException
    {
	//connection for other database
	String jndiname = "services.jndi";
	CommonMethods.applyConnectionJNDIToSC(branchSC, jndiname);
	
	return atmBranchDAO.returnBranchDetails(branchSC);

    }

    public void setAtmBranchDAO(BranchDAO atmBranchDAO)
    {
        this.atmBranchDAO = atmBranchDAO;
    }
}