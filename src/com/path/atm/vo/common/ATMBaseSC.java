package com.path.atm.vo.common;

import java.math.BigDecimal;

import com.path.vo.customexpression.CustomExpressionSC;

public class ATMBaseSC extends CustomExpressionSC
{

    private String progRef;
    private BigDecimal lovTypeLkOpt;
    private String menuRef;
    private String oldStatus;
    private String status;
    private String ivCrud;

    public String getProgRef()
    {
	return progRef;
    }

    public void setProgRef(String progRef)
    {
	this.progRef = progRef;
    }

    public BigDecimal getLovTypeLkOpt()
    {
	return lovTypeLkOpt;
    }

    public void setLovTypeLkOpt(BigDecimal lovTypeLkOpt)
    {
	this.lovTypeLkOpt = lovTypeLkOpt;
    }

    public String getMenuRef()
    {
	return menuRef;
    }

    public void setMenuRef(String menuRef)
    {
	this.menuRef = menuRef;
    }

    public String getOldStatus()
    {
	return oldStatus;
    }

    public void setOldStatus(String oldStatus)
    {
	this.oldStatus = oldStatus;
    }

    public String getStatus()
    {
	return status;
    }

    public void setStatus(String status)
    {
	this.status = status;
    }

    public String getIvCrud()
    {
	return ivCrud;
    }

    public void setIvCrud(String ivCrud)
    {
	this.ivCrud = ivCrud;
    }
}