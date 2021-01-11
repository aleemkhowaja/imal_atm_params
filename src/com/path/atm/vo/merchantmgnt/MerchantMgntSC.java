package com.path.atm.vo.merchantmgnt;

import java.math.BigDecimal;

import com.path.atm.vo.common.ATMBaseSC;

/**
 * 
 * Copyright 2013, Path Solutions Path Solutions retains all ownership rights to
 * this source code
 * 
 * @author: Muneer Ahmed GridParamsSC: contains the parameters needed for
 *          Search, Flipping and Sorting
 * 
 */
public class MerchantMgntSC extends ATMBaseSC
{

    private String progRef;
    private String appName;
    private String lang;
    private String ivCrud;
    private BigDecimal lovType;
    private BigDecimal code;
    private String additionalRef;
    private String IBAN;
    private String dependencyType;

    public String getAppName()
    {
	return appName;
    }

    public void setAppName(String appName)
    {
	this.appName = appName;
    }

    public String getLang()
    {
	return lang;
    }

    public void setLang(String lang)
    {
	this.lang = lang;
    }

    public String getIvCrud()
    {
	return ivCrud;
    }

    public void setIvCrud(String ivCrud)
    {
	this.ivCrud = ivCrud;
    }

    public BigDecimal getLovType()
    {
	return lovType;
    }

    public void setLovType(BigDecimal lovType)
    {
	this.lovType = lovType;
    }

    public String getProgRef()
    {
	return progRef;
    }

    public void setProgRef(String progRef)
    {
	this.progRef = progRef;
    }

    public BigDecimal getCode()
    {
	return code;
    }

    public void setCode(BigDecimal code)
    {
	this.code = code;
    }

    public String getAdditionalRef()
    {
        return additionalRef;
    }

    public void setAdditionalRef(String additionalRef)
    {
        this.additionalRef = additionalRef;
    }

    public String getIBAN()
    {
        return IBAN;
    }

    public void setIBAN(String iBAN)
    {
        IBAN = iBAN;
    }

    public String getDependencyType()
    {
        return dependencyType;
    }

    public void setDependencyType(String dependencyType)
    {
        this.dependencyType = dependencyType;
    }

}
