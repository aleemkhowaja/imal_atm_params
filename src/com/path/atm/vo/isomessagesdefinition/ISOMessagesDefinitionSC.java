package com.path.atm.vo.isomessagesdefinition;

import java.math.BigDecimal;
import java.util.List;

import com.path.atm.vo.common.ATMBaseSC;

/**
 * 
 * Copyright 2020, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: Alim Khowaja
 *
 * ISOMessagesDefinitionSC.java used to
 */
public class ISOMessagesDefinitionSC extends ATMBaseSC
{
    private BigDecimal ISOMessagesDefinitionId;
    private BigDecimal messageId;
    private BigDecimal interfaceId;
    private String mti;
    private BigDecimal fieldCode;
    private Boolean isRequestFields;
    private BigDecimal mappingId;
    private String responseSelectedRowFields;
    private Boolean isIsoReqAndResponseFields;

    private List<String> responseSelectedRows;

    public BigDecimal getISOMessagesDefinitionId()
    {
	return ISOMessagesDefinitionId;
    }

    public void setISOMessagesDefinitionId(BigDecimal iSOMessagesDefinitionId)
    {
	ISOMessagesDefinitionId = iSOMessagesDefinitionId;
    }

    public BigDecimal getMessageId()
    {
	return messageId;
    }

    public void setMessageId(BigDecimal messageId)
    {
	this.messageId = messageId;
    }

    public BigDecimal getInterfaceId()
    {
	return interfaceId;
    }

    public void setInterfaceId(BigDecimal interfaceId)
    {
	this.interfaceId = interfaceId;
    }

    public String getMti()
    {
	return mti;
    }

    public void setMti(String mti)
    {
	this.mti = mti;
    }

    public Boolean getIsRequestFields()
    {
	return isRequestFields;
    }

    public void setIsRequestFields(Boolean isRequestFields)
    {
	this.isRequestFields = isRequestFields;
    }

    public BigDecimal getMappingId()
    {
	return mappingId;
    }

    public void setMappingId(BigDecimal mappingId)
    {
	this.mappingId = mappingId;
    }

    public String getResponseSelectedRowFields()
    {
	return responseSelectedRowFields;
    }

    public void setResponseSelectedRowFields(String responseSelectedRowFields)
    {
	this.responseSelectedRowFields = responseSelectedRowFields;
    }

    public List<String> getResponseSelectedRows()
    {
	return responseSelectedRows;
    }

    public void setResponseSelectedRows(List<String> responseSelectedRows)
    {
	this.responseSelectedRows = responseSelectedRows;
    }

    public Boolean getIsIsoReqAndResponseFields()
    {
        return isIsoReqAndResponseFields;
    }

    public void setIsIsoReqAndResponseFields(Boolean isIsoReqAndResponseFields)
    {
        this.isIsoReqAndResponseFields = isIsoReqAndResponseFields;
    }

    public BigDecimal getFieldCode()
    {
        return fieldCode;
    }

    public void setFieldCode(BigDecimal fieldCode)
    {
        this.fieldCode = fieldCode;
    }
}