package com.path.atm.vo.acquirer;

import java.math.BigDecimal;

import com.path.atm.vo.common.ATMBaseSC;

/**
 * 
 * Copyright 2019, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: Alim Khowaja
 *
 * AcquirerSC.java used to
 */
public class AcquirerSC extends ATMBaseSC
{
    private BigDecimal acquirerCode;
    private BigDecimal acquirerId;
    private String description;
    private BigDecimal interfaceCode;
    private String bankAtmYN;
    private String terminaltype;

    public BigDecimal getAcquirerCode()
    {
	return acquirerCode;
    }

    public void setAcquirerCode(BigDecimal acquirerCode)
    {
	this.acquirerCode = acquirerCode;
    }

    public BigDecimal getAcquirerId()
    {
        return acquirerId;
    }

    public void setAcquirerId(BigDecimal acquirerId)
    {
        this.acquirerId = acquirerId;
    }

    public String getDescription()
    {
        return description;
    }

    public void setDescription(String description)
    {
        this.description = description;
    }

    public BigDecimal getInterfaceCode()
    {
        return interfaceCode;
    }

    public void setInterfaceCode(BigDecimal interfaceCode)
    {
        this.interfaceCode = interfaceCode;
    }

    public String getBankAtmYN()
    {
        return bankAtmYN;
    }

    public void setBankAtmYN(String bankAtmYN)
    {
        this.bankAtmYN = bankAtmYN;
    }

    public String getTerminaltype()
    {
        return terminaltype;
    }

    public void setTerminaltype(String terminaltype)
    {
        this.terminaltype = terminaltype;
    }
}