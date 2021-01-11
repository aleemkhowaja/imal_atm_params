package com.path.atm.vo.terminal;

import java.math.BigDecimal;

import com.path.atm.dbmaps.vo.GTW_ATM_MERCHANTVO;
import com.path.atm.dbmaps.vo.GTW_ATM_TERMINALVO;
import com.path.atm.vo.common.ATMBaseCO;
import com.path.dbmaps.vo.CTSTELLERVO;

/**
 * 
 * Copyright 2019, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: Alim Khowaja
 *
 * TerminalCO.java used to
 */
public class TerminalCO extends ATMBaseCO
{
    private GTW_ATM_TERMINALVO gtw_ATM_TERMINALVO = new GTW_ATM_TERMINALVO();
    private GTW_ATM_MERCHANTVO gtw_ATM_MERCHANTVO = new GTW_ATM_MERCHANTVO();
    private CTSTELLERVO ctstellervo = new CTSTELLERVO();
    private String branchDescription;
    private String tellerDescription;
    private String merchantDescription;
    private String terminalType;
    private String atmInterfaceDescription;
    private String acquirerDescription;
    private BigDecimal oldAcquirerId;

    private String terminalDescription;
    private BigDecimal interfaceCode;
    private String tellerUserId;
    private BigDecimal transactionBranchCode;
    private BigDecimal tellerCode;
    
    

    public GTW_ATM_TERMINALVO getGtw_ATM_TERMINALVO()
    {
	return gtw_ATM_TERMINALVO;
    }

    public void setGtw_ATM_TERMINALVO(GTW_ATM_TERMINALVO gtw_ATM_TERMINALVO)
    {
	this.gtw_ATM_TERMINALVO = gtw_ATM_TERMINALVO;
    }

    public GTW_ATM_MERCHANTVO getGtw_ATM_MERCHANTVO()
    {
	return gtw_ATM_MERCHANTVO;
    }

    public void setGtw_ATM_MERCHANTVO(GTW_ATM_MERCHANTVO gtw_ATM_MERCHANTVO)
    {
	this.gtw_ATM_MERCHANTVO = gtw_ATM_MERCHANTVO;
    }

    public CTSTELLERVO getCtstellervo()
    {
	return ctstellervo;
    }

    public void setCtstellervo(CTSTELLERVO ctstellervo)
    {
	this.ctstellervo = ctstellervo;
    }

    public String getBranchDescription()
    {
	return branchDescription;
    }

    public void setBranchDescription(String branchDescription)
    {
	this.branchDescription = branchDescription;
    }

    public String getTellerDescription()
    {
	return tellerDescription;
    }

    public void setTellerDescription(String tellerDescription)
    {
	this.tellerDescription = tellerDescription;
    }

    public String getMerchantDescription()
    {
	return merchantDescription;
    }

    public void setMerchantDescription(String merchantDescription)
    {
	this.merchantDescription = merchantDescription;
    }

    public String getTerminalType()
    {
	return terminalType;
    }

    public void setTerminalType(String terminalType)
    {
	this.terminalType = terminalType;
    }

    public String getAtmInterfaceDescription()
    {
        return atmInterfaceDescription;
    }

    public void setAtmInterfaceDescription(String atmInterfaceDescription)
    {
        this.atmInterfaceDescription = atmInterfaceDescription;
    }

    public String getAcquirerDescription()
    {
        return acquirerDescription;
    }

    public void setAcquirerDescription(String acquirerDescription)
    {
        this.acquirerDescription = acquirerDescription;
    }

    public BigDecimal getOldAcquirerId()
    {
        return oldAcquirerId;
    }

    public void setOldAcquirerId(BigDecimal oldAcquirerId)
    {
        this.oldAcquirerId = oldAcquirerId;
    }

    public String getTerminalDescription()
    {
        return terminalDescription;
    }

    public void setTerminalDescription(String terminalDescription)
    {
        this.terminalDescription = terminalDescription;
    }

    public BigDecimal getInterfaceCode()
    {
        return interfaceCode;
    }

    public void setInterfaceCode(BigDecimal interfaceCode)
    {
        this.interfaceCode = interfaceCode;
    }

    public String getTellerUserId()
    {
        return tellerUserId;
    }

    public void setTellerUserId(String tellerUserId)
    {
        this.tellerUserId = tellerUserId;
    }

    public BigDecimal getTransactionBranchCode()
    {
        return transactionBranchCode;
    }

    public void setTransactionBranchCode(BigDecimal transactionBranchCode)
    {
        this.transactionBranchCode = transactionBranchCode;
    }

    public BigDecimal getTellerCode()
    {
        return tellerCode;
    }

    public void setTellerCode(BigDecimal tellerCode)
    {
        this.tellerCode = tellerCode;
    }
}