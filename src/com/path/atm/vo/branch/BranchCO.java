package com.path.atm.vo.branch;

import java.math.BigDecimal;

import com.path.lib.vo.BaseVO;

/**
 * 
 * Copyright 2020, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: Alim Khowaja
 *
 * BranchCO.java used to
 */
public class BranchCO extends BaseVO
{

    private BigDecimal companyCode;
    private BigDecimal branchCode;
    private String briefNameEnglish;
    private String briefNameArabic;
    private String longNameEnglish;
    private String longNameArabic;
    private BigDecimal baseCurrency;
    private String remarks;
    
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
    public BigDecimal getBaseCurrency()
    {
        return baseCurrency;
    }
    public void setBaseCurrency(BigDecimal baseCurrency)
    {
        this.baseCurrency = baseCurrency;
    }
    public String getRemarks()
    {
        return remarks;
    }
    public void setRemarks(String remarks)
    {
        this.remarks = remarks;
    }
}