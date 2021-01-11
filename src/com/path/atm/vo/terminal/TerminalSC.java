package com.path.atm.vo.terminal;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import com.path.atm.vo.acquirer.AcquirerCO;
import com.path.atm.vo.common.ATMBaseSC;

/**
 * 
 * Copyright 2019, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: Alim Khowaja
 *
 * TerminalSC.java used to
 */
public class TerminalSC extends ATMBaseSC
{
    private BigDecimal terminalId;
    private String terminalCode;
    private BigDecimal acquirerId;
    private BigDecimal interfaceCode;
    
    List<AcquirerCO> acquirerCOs = new ArrayList<AcquirerCO>();

    public BigDecimal getTerminalId()
    {
	return terminalId;
    }

    public void setTerminalId(BigDecimal terminalId)
    {
	this.terminalId = terminalId;
    }

    public String getTerminalCode()
    {
	return terminalCode;
    }

    public void setTerminalCode(String terminalCode)
    {
	this.terminalCode = terminalCode;
    }

    public BigDecimal getAcquirerId()
    {
        return acquirerId;
    }

    public void setAcquirerId(BigDecimal acquirerId)
    {
        this.acquirerId = acquirerId;
    }
    
    public BigDecimal getInterfaceCode()
    {
        return interfaceCode;
    }

    public void setInterfaceCode(BigDecimal interfaceCode)
    {
        this.interfaceCode = interfaceCode;
    }

    public List<AcquirerCO> getAcquirerCOs()
    {
        return acquirerCOs;
    }

    public void setAcquirerCOs(List<AcquirerCO> acquirerCOs)
    {
        this.acquirerCOs = acquirerCOs;
    }

}