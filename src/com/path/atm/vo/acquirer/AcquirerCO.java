package com.path.atm.vo.acquirer;

import java.util.ArrayList;
import java.util.List;

import com.path.atm.dbmaps.vo.GTW_ATM_ACQUIRERVO;
import com.path.atm.dbmaps.vo.GTW_ATM_ACQUIRER_TRX_TYPEVO;
import com.path.atm.vo.common.ATMBaseCO;
import com.path.atm.vo.terminal.TerminalCO;
import com.path.dbmaps.vo.CTSTELLERVO;
import com.path.vo.customexpression.CustomExpressionCO;

/**
 * 
 * Copyright 2019, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: Alim Khowaja
 *
 * AcquirerCO.java used to
 */
public class AcquirerCO extends ATMBaseCO
{
    private GTW_ATM_ACQUIRERVO gtw_ATM_ACQUIRER = new GTW_ATM_ACQUIRERVO();
    private CTSTELLERVO ctstellervo = new CTSTELLERVO();
    private String branchDescription;
    private String tellerDescription;
    private String bankATMDescription;
    private String atmInterfaceDescription;
    private CustomExpressionCO customExpressionCO;
    private GTW_ATM_ACQUIRER_TRX_TYPEVO gtw_ATM_ACQUIRER_TRX_TYPEVO = new GTW_ATM_ACQUIRER_TRX_TYPEVO();
    
    /**
     * Required  for Exporting
     */
    private List<GTW_ATM_ACQUIRER_TRX_TYPEVO> trxTypeVOs = new ArrayList<GTW_ATM_ACQUIRER_TRX_TYPEVO>();
    private List<TerminalCO> terminalCOs = new ArrayList<TerminalCO>();
    
    private String transactionJSON;
    private String bankAtmYN;
    private String oldTerminalType;
    
    public GTW_ATM_ACQUIRERVO getGtw_ATM_ACQUIRER()
    {
	return gtw_ATM_ACQUIRER;
    }

    public void setGtw_ATM_ACQUIRER(GTW_ATM_ACQUIRERVO gtw_ATM_ACQUIRER)
    {
	this.gtw_ATM_ACQUIRER = gtw_ATM_ACQUIRER;
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

    public String getBankATMDescription()
    {
        return bankATMDescription;
    }

    public void setBankATMDescription(String bankATMDescription)
    {
        this.bankATMDescription = bankATMDescription;
    }

    public CustomExpressionCO getCustomExpressionCO()
    {
        return customExpressionCO;
    }

    public void setCustomExpressionCO(CustomExpressionCO customExpressionCO)
    {
        this.customExpressionCO = customExpressionCO;
    }

    public String getAtmInterfaceDescription()
    {
        return atmInterfaceDescription;
    }

    public void setAtmInterfaceDescription(String atmInterfaceDescription)
    {
        this.atmInterfaceDescription = atmInterfaceDescription;
    }

    public GTW_ATM_ACQUIRER_TRX_TYPEVO getGtw_ATM_ACQUIRER_TRX_TYPEVO()
    {
        return gtw_ATM_ACQUIRER_TRX_TYPEVO;
    }

    public void setGtw_ATM_ACQUIRER_TRX_TYPEVO(GTW_ATM_ACQUIRER_TRX_TYPEVO gtw_ATM_ACQUIRER_TRX_TYPEVO)
    {
        this.gtw_ATM_ACQUIRER_TRX_TYPEVO = gtw_ATM_ACQUIRER_TRX_TYPEVO;
    }

    public String getTransactionJSON()
    {
        return transactionJSON;
    }

    public void setTransactionJSON(String transactionJSON)
    {
        this.transactionJSON = transactionJSON;
    }

    public String getBankAtmYN()
    {
        return bankAtmYN;
    }

    public void setBankAtmYN(String bankAtmYN)
    {
        this.bankAtmYN = bankAtmYN;
    }

    public String getOldTerminalType()
    {
        return oldTerminalType;
    }

    public void setOldTerminalType(String oldTerminalType)
    {
        this.oldTerminalType = oldTerminalType;
    }

    public List<GTW_ATM_ACQUIRER_TRX_TYPEVO> getTrxTypeVOs()
    {
        return trxTypeVOs;
    }

    public void setTrxTypeVOs(List<GTW_ATM_ACQUIRER_TRX_TYPEVO> trxTypeVOs)
    {
        this.trxTypeVOs = trxTypeVOs;
    }

    public List<TerminalCO> getTerminalCOs()
    {
        return terminalCOs;
    }

    public void setTerminalCOs(List<TerminalCO> terminalCOs)
    {
        this.terminalCOs = terminalCOs;
    }
    
}