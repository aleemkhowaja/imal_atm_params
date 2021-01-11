package com.path.atm.vo.atminterface;

import java.math.BigDecimal;
import java.util.List;
import com.path.atm.vo.common.ATMBaseSC;

/**
 * 
 * Copyright 2019, Path Solutions Path Solutions retains all ownership rights to
 * this source code
 * 
 * @author: Alim Khowaja
 *
 * AtmInterfaceSC.java used to search criteria for Interface screen
 */
public class AtmInterfaceSC extends ATMBaseSC
{
    private BigDecimal fieldCode;
    private BigDecimal messageId;
    private BigDecimal interfaceId;
    private String description;
    private String interfaceType;
    private BigDecimal interfaceTypeLovId;
    private BigDecimal fieldTypeLovId;
    private BigDecimal messageTypeLovId;

//    private String status;
    private String pageRef;
    private String loadFields;
    private String isoMessage;
    private String messageMTI;
    private String primaryBitmap;
    private String secondaryBitmap;
    private List<BigDecimal> bitMapFields;
    private String mtiCode;
    private String screenFrom;
    private Boolean withSubFields;

    public List<BigDecimal> getBitMapFields()
    {
	return bitMapFields;
    }

    public void setBitMapFields(List<BigDecimal> bitMapFields)
    {
	this.bitMapFields = bitMapFields;
    }

    public String getPrimaryBitmap()
    {
	return primaryBitmap;
    }

    public void setPrimaryBitmap(String primaryBitmap)
    {
	this.primaryBitmap = primaryBitmap;
    }

    public String getSecondaryBitmap()
    {
	return secondaryBitmap;
    }

    public void setSecondaryBitmap(String secondaryBitmap)
    {
	this.secondaryBitmap = secondaryBitmap;
    }

    public String getMessageMTI()
    {
	return messageMTI;
    }

    public void setMessageMTI(String messageMTI)
    {
	this.messageMTI = messageMTI;
    }

    public String getIsoMessage()
    {
	return isoMessage;
    }

    public void setIsoMessage(String isoMessage)
    {
	this.isoMessage = isoMessage;
    }

    public BigDecimal getFieldCode()
    {
	return fieldCode;
    }

    public void setFieldCode(BigDecimal fieldCode)
    {
	this.fieldCode = fieldCode;
    }

    public BigDecimal getFieldTypeLovId()
    {
	return fieldTypeLovId;
    }

    public void setFieldTypeLovId(BigDecimal fieldTypeLovId)
    {
	this.fieldTypeLovId = fieldTypeLovId;
    }

    public BigDecimal getInterfaceId()
    {
	return interfaceId;
    }

    public String getInterfaceType()
    {
	return interfaceType;
    }

    public void setInterfaceType(String interfaceType)
    {
	this.interfaceType = interfaceType;
    }

    public void setInterfaceId(BigDecimal interfaceId)
    {
	this.interfaceId = interfaceId;
    }
    
    public String getDescription()
    {
        return description;
    }

    public void setDescription(String description)
    {
        this.description = description;
    }

    public BigDecimal getInterfaceTypeLovId()
    {
	return interfaceTypeLovId;
    }

    public void setInterfaceTypeLovId(BigDecimal interfaceTypeLovId)
    {
	this.interfaceTypeLovId = interfaceTypeLovId;
    }

    public String getLoadFields()
    {
	return loadFields;
    }

    public void setLoadFields(String loadFields)
    {
	this.loadFields = loadFields;
    }

    public BigDecimal getMessageId()
    {
	return messageId;
    }

    public void setMessageId(BigDecimal messageId)
    {
	this.messageId = messageId;
    }

    /*
     * public String getStatus() { return status; }
     * 
     * public void setStatus(String status) { this.status = status; }
     */

    public String getPageRef()
    {
	return pageRef;
    }

    public void setPageRef(String pageRef)
    {
	this.pageRef = pageRef;
    }

    public BigDecimal getMessageTypeLovId()
    {
	return messageTypeLovId;
    }

    public void setMessageTypeLovId(BigDecimal messageTypeLovId)
    {
	this.messageTypeLovId = messageTypeLovId;
    }
    
    public String getMtiCode()
    {
        return mtiCode;
    }

    public void setMtiCode(String mtiCode)
    {
        this.mtiCode = mtiCode;
    }

    public String getScreenFrom()
    {
        return screenFrom;
    }

    public void setScreenFrom(String screenFrom)
    {
        this.screenFrom = screenFrom;
    }

    public Boolean getWithSubFields()
    {
        return withSubFields;
    }

    public void setWithSubFields(Boolean withSubFields)
    {
        this.withSubFields = withSubFields;
    }

    public AtmInterfaceSC()
    {
	super.setSearchCols(new String[] { "iso_INTERFACESVO.DESCRIPTION", "iso_INTERFACESVO.INTERFACE_CODE","interfaceTypeDesc",
		"iso_INT_MSGSVO.ATM_ISO_MSGS_CODE","iso_INT_MSGSVO.REQUEST_MTI", "iso_INT_MSGSVO.REQUEST_DESCRIPTION", "iso_INT_MSGSVO.RESPONSE_MTI",
		"iso_INT_MSGSVO.RESPONSE_DESCRIPTION", "statusDesc", "tcpTypeDesc", "iso_INT_MSGSVO.REQUEST_BITMAP1",
		"iso_INT_MSGSVO.REQUEST_BITMAP2" });
    }
}
