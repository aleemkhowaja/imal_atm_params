package com.path.atm.vo.teller;

import java.math.BigDecimal;

import com.path.lib.vo.BaseVO;

/**
 * 
 * Copyright 2019, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: Alim Khowaja
 *
 * TellerCO.java used to
 */
public class TellerCO extends BaseVO
{

    private BigDecimal companyCode;
    private BigDecimal branchCode;
    private BigDecimal tellerCode;
    private String userID;
    private BigDecimal tellerType;
    private BigDecimal privilegeLevel;
    private BigDecimal divisionCode;
    private BigDecimal departmentCode;
    private BigDecimal roleCode;
    private String briefNameEnglish;
    private String briefNameArabic;
    private String longNameEnglish;
    private String longNameArabic;

    public BigDecimal getCompanyCode()
    {
	return companyCode;
    }

    public void setCompanyCode(BigDecimal companyCode)
    {
	this.companyCode = companyCode;
    }

    public BigDecimal getBranchCode()
    {
	return branchCode;
    }

    public void setBranchCode(BigDecimal branchCode)
    {
	this.branchCode = branchCode;
    }

    public BigDecimal getTellerCode()
    {
	return tellerCode;
    }

    public void setTellerCode(BigDecimal tellerCode)
    {
	this.tellerCode = tellerCode;
    }

    public BigDecimal getTellerType()
    {
	return tellerType;
    }

    public void setTellerType(BigDecimal tellerType)
    {
	this.tellerType = tellerType;
    }

    public String getUserID()
    {
	return userID;
    }

    public void setUserID(String userID)
    {
	this.userID = userID;
    }

    public BigDecimal getPrivilegeLevel()
    {
	return privilegeLevel;
    }

    public void setPrivilegeLevel(BigDecimal privilegeLevel)
    {
	this.privilegeLevel = privilegeLevel;
    }

    public BigDecimal getDivisionCode()
    {
	return divisionCode;
    }

    public void setDivisionCode(BigDecimal divisionCode)
    {
	this.divisionCode = divisionCode;
    }

    public BigDecimal getDepartmentCode()
    {
	return departmentCode;
    }

    public void setDepartmentCode(BigDecimal departmentCode)
    {
	this.departmentCode = departmentCode;
    }

    public BigDecimal getRoleCode()
    {
	return roleCode;
    }

    public void setRoleCode(BigDecimal roleCode)
    {
	this.roleCode = roleCode;
    }

    public String getBriefNameEnglish()
    {
	return briefNameEnglish;
    }

    public void setBriefNameEnglish(String briefNameEnglish)
    {
	this.briefNameEnglish = briefNameEnglish;
    }

    public String getBriefNameArabic()
    {
	return briefNameArabic;
    }

    public void setBriefNameArabic(String briefNameArabic)
    {
	this.briefNameArabic = briefNameArabic;
    }

    public String getLongNameEnglish()
    {
	return longNameEnglish;
    }

    public void setLongNameEnglish(String longNameEnglish)
    {
	this.longNameEnglish = longNameEnglish;
    }

    public String getLongNameArabic()
    {
	return longNameArabic;
    }

    public void setLongNameArabic(String longNameArabic)
    {
	this.longNameArabic = longNameArabic;
    }
}
