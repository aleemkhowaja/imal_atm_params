package com.path.atm.vo.branch;

import java.math.BigDecimal;

import com.path.struts2.lib.common.GridParamsSC;

/**
 * 
 * Copyright 2020, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: USER
 *
 * BranchSC.java used to
 */
public class BranchSC extends GridParamsSC
{
    private BigDecimal compCode;
    private BigDecimal branchCode;
    private String status;

    public BigDecimal getCompCode()
    {
	return compCode;
    }

    public void setCompCode(BigDecimal compCode)
    {
	this.compCode = compCode;
    }
    public BigDecimal getBranchCode()
    {
        return branchCode;
    }

    public void setBranchCode(BigDecimal branchCode)
    {
        this.branchCode = branchCode;
    }

    public String getStatus()
    {
	return status;
    }

    public void setStatus(String status)
    {
	this.status = status;
    }
}