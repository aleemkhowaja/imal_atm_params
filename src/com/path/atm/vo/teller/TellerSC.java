package com.path.atm.vo.teller;

import java.math.BigDecimal;

import com.path.struts2.lib.common.GridParamsSC;

/**
 * 
 * Copyright 2019, Path Solutions Path Solutions retains all ownership rights to
 * this source code
 * 
 * @author: Alim Khowajaa
 *
 * TellerSC.java used to
 */
public class TellerSC extends GridParamsSC
{
    private String status;
    private BigDecimal privilegeLevel;
    private String tellerType;
    private BigDecimal tellerCode;
    private Integer pageNumber;
    private Integer records;
    
    public String getStatus()
    {
	return status;
    }

    public void setStatus(String status)
    {
	this.status = status;
    }

    public BigDecimal getPrivilegeLevel()
    {
	return privilegeLevel;
    }

    public void setPrivilegeLevel(BigDecimal privilegeLevel)
    {
	this.privilegeLevel = privilegeLevel;
    }

    public String getTellerType()
    {
	return tellerType;
    }

    public void setTellerType(String tellerType)
    {
	this.tellerType = tellerType;
    }

    public BigDecimal getTellerCode()
    {
	return tellerCode;
    }

    public void setTellerCode(BigDecimal tellerCode)
    {
	this.tellerCode = tellerCode;
    }

    public Integer getPageNumber()
    {
	return pageNumber;
    }

    public void setPageNumber(Integer pageNumber)
    {
	this.pageNumber = pageNumber;
    }

    public Integer getRecords()
    {
	return records;
    }

    public void setRecords(Integer records)
    {
	this.records = records;
    }
}