package com.path.atm.vo.isomessageparsing;

import java.math.BigDecimal;

import com.path.atm.vo.common.ATMBaseSC;

/**
 * 
 * Copyright 2019, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: Alim Khowaja
 *
 * ISOMessageParseSC.java used to
 */
public class ISOMessageParseSC extends ATMBaseSC
{
    private BigDecimal fieldTypeLovId;
    private String isoMessage;
    private BigDecimal interfaceId;
    private BigDecimal messageId;
    private Boolean isRun;
    
    public BigDecimal getFieldTypeLovId()
    {
        return fieldTypeLovId;
    }
    public void setFieldTypeLovId(BigDecimal fieldTypeLovId)
    {
        this.fieldTypeLovId = fieldTypeLovId;
    }
    public String getIsoMessage()
    {
        return isoMessage;
    }
    public void setIsoMessage(String isoMessage)
    {
        this.isoMessage = isoMessage;
    }
    public BigDecimal getInterfaceId()
    {
        return interfaceId;
    }
    public void setInterfaceId(BigDecimal interfaceId)
    {
        this.interfaceId = interfaceId;
    }
    public BigDecimal getMessageId()
    {
        return messageId;
    }
    public void setMessageId(BigDecimal messageId)
    {
        this.messageId = messageId;
    }
    public Boolean getIsRun()
    {
        return isRun;
    }
    public void setIsRun(Boolean isRun)
    {
        this.isRun = isRun;
    }
}