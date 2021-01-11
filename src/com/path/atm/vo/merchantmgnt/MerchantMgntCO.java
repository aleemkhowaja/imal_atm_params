package com.path.atm.vo.merchantmgnt;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.path.atm.dbmaps.vo.GTW_ATM_MERCHANTVO;
import com.path.atm.vo.common.ATMBaseCO;

/**
 * 
 * Copyright 2013, Path Solutions Path Solutions retains all ownership rights to
 * this source code
 * 
 * @author: Muneer Ahmed
 * 
 * 
 */

public class MerchantMgntCO extends ATMBaseCO
{

    private GTW_ATM_MERCHANTVO gtwAtmMerchantVO = new GTW_ATM_MERCHANTVO();
    private String statusDesc;
    private Date statusTime;
//	temporary disable web service call
//    private String merchantAccountName;
    private String lookupName;
    private boolean messageConfirmed;
    private String warningMessages;
    private List<String> listWarningMsg = new ArrayList<String>();
    private String confirmMsg;
    private String colName;
    private String allowInternAcc;
    private String userName;
    private String merchantDescription;

    public String getStatusDesc()
    {
	return statusDesc;
    }

    public void setStatusDesc(String statusDesc)
    {
	this.statusDesc = statusDesc;
    }

    public Date getStatusTime()
    {
	return statusTime;
    }

    public void setStatusTime(Date statusTime)
    {
	this.statusTime = statusTime;
    }

    public String getWarningMessages()
    {
	return warningMessages;
    }

    public void setWarningMessages(String warningMessages)
    {
	this.warningMessages = warningMessages;
    }

    public List<String> getListWarningMsg()
    {
	return listWarningMsg;
    }

    public void setListWarningMsg(List<String> listWarningMsg)
    {
	this.listWarningMsg = listWarningMsg;
    }

    public String getConfirmMsg()
    {
	return confirmMsg;
    }

    public void setConfirmMsg(String confirmMsg)
    {
	this.confirmMsg = confirmMsg;
    }

    public String getColName()
    {
	return colName;
    }

    public void setColName(String colName)
    {
	this.colName = colName;
    }

    public String getAllowInternAcc()
    {
	return allowInternAcc;
    }

    public void setAllowInternAcc(String allowInternAcc)
    {
	this.allowInternAcc = allowInternAcc;
    }

    public String getUserName()
    {
	return userName;
    }

    public void setUserName(String userName)
    {
	this.userName = userName;
    }

    public boolean isMessageConfirmed()
    {
	return messageConfirmed;
    }

    public void setMessageConfirmed(boolean messageConfirmed)
    {
	this.messageConfirmed = messageConfirmed;
    }

    public GTW_ATM_MERCHANTVO getGtwAtmMerchantVO()
    {
	return gtwAtmMerchantVO;
    }

    public void setGtwAtmMerchantVO(GTW_ATM_MERCHANTVO gtwAtmMerchantVO)
    {
	this.gtwAtmMerchantVO = gtwAtmMerchantVO;
    }

  /*  public String getMerchantAccountName()
    {
	return merchantAccountName;
    }

    public void setMerchantAccountName(String merchantAccountName)
    {
	this.merchantAccountName = merchantAccountName;
    }*/

    public String getLookupName()
    {
	return lookupName;
    }

    public void setLookupName(String lookupName)
    {
	this.lookupName = lookupName;
    }

    public String getMerchantDescription()
    {
        return merchantDescription;
    }

    public void setMerchantDescription(String merchantDescription)
    {
        this.merchantDescription = merchantDescription;
    }

}
