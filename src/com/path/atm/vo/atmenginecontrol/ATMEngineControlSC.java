package com.path.atm.vo.atmenginecontrol;

import java.math.BigDecimal;
import java.util.Date;
import com.path.atm.vo.common.ATMBaseSC;

public class ATMEngineControlSC extends ATMBaseSC
{
    private BigDecimal lovTypeId;

    // filter record
    private Date startDate;
    private Date endDate;
    
    private String requestMap;
    private String responseMap;
    private BigDecimal interfaceid;
    private BigDecimal messageId;
    
    private BigDecimal requestId;
    private BigDecimal responseId;
    private String dialogfor;
   

    public BigDecimal getLovTypeId()
    {
	return lovTypeId;
    }

    public void setLovTypeId(BigDecimal lovTypeId)
    {
	this.lovTypeId = lovTypeId;
    }

    public Date getStartDate()
    {
	return startDate;
    }

    public void setStartDate(Date startDate)
    {
	this.startDate = startDate;
    }

    public Date getEndDate()
    {
	return endDate;
    }

    public void setEndDate(Date endDate)
    {
	this.endDate = endDate;
    }

    public String getRequestMap()
    {
        return requestMap;
    }

    public void setRequestMap(String requestMap)
    {
        this.requestMap = requestMap;
    }

    public String getResponseMap()
    {
        return responseMap;
    }

    public void setResponseMap(String responseMap)
    {
        this.responseMap = responseMap;
    }

    public BigDecimal getInterfaceid()
    {
        return interfaceid;
    }

    public void setInterfaceid(BigDecimal interfaceid)
    {
        this.interfaceid = interfaceid;
    }
    
    public BigDecimal getMessageId()
    {
        return messageId;
    }

    public void setMessageId(BigDecimal messageId)
    {
        this.messageId = messageId;
    }

    public BigDecimal getRequestId()
    {
        return requestId;
    }

    public void setRequestId(BigDecimal requestId)
    {
        this.requestId = requestId;
    }

    public BigDecimal getResponseId()
    {
        return responseId;
    }

    public void setResponseId(BigDecimal responseId)
    {
        this.responseId = responseId;
    }

    public String getDialogfor()
    {
        return dialogfor;
    }

    public void setDialogfor(String dialogfor)
    {
        this.dialogfor = dialogfor;
    }
}