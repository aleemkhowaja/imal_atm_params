package com.path.atm.bo.branch;

import java.util.List;

import com.path.atm.vo.branch.BranchCO;
import com.path.atm.vo.branch.BranchSC;
import com.path.atm.vo.teller.TellerCO;
import com.path.atm.vo.teller.TellerSC;
import com.path.lib.common.exception.BaseException;

/**
 * 
 * Copyright 2020, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: Alim Khowaja
 *
 * BranchBO.java used to
 */
public interface BranchBO
{

    /**
     * 
     * @param branchSC
     * @return
     * @throws BaseException
     */
    public List returnBranchByCompCodeList(BranchSC branchSC) throws BaseException;
    
    /**
     * 
     * @param branchSC
     * @return
     * @throws BaseException
     */
    public int returnBranchByCompCodeCount(BranchSC branchSC) throws BaseException;

    /**
     * 
     * @param branchSC
     * @return
     * @throws BaseException
     */
    public BranchCO returnBranchDetails(BranchSC branchSC) throws BaseException;
}