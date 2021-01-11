package com.path.atm.actions.isomessageparsing;

import java.util.List;

import com.path.atm.bo.atminterface.AtmInterfaceConstants;
import com.path.atm.bo.isomessageparsing.ISOMessageParseBO;
import com.path.atm.vo.isomessageparsing.ISOMessageParseCO;
import com.path.atm.vo.isomessageparsing.ISOMessageParseSC;
import com.path.struts2.lib.common.base.GridBaseAction;
import com.path.vo.common.SessionCO;

/**
 * 
 * Copyright 2019, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: Alim Khowaja
 *
 * ISOMessageParseAction.java used to
 */
public class ISOMessageParseAction extends GridBaseAction
{
    private ISOMessageParseBO isoMessageParseBO;
    
    private ISOMessageParseSC isoMessageParseSC;
    
    private ISOMessageParseCO isoMessageParseCO;

    /**
     * Load ISO Message Parsing Page
     * @return
     */
    public String loadISOMessageParsePage()
    {
	try
	{
	    set_showNewInfoBtn("false");
	    set_showSmartInfoBtn("false");
	}
	catch(Exception ex)
	{
	    handleException(ex, null, null);
	}
	return "isoMessageParsePage";
    }
    
    /**
     * run Request ISO message
     */
    public String parseAndRunISOMessage()
    {
	try
	{
	    SessionCO sessionCO = returnSessionObject();
	    isoMessageParseSC.setCompCode(sessionCO.getCompanyCode());
	    isoMessageParseSC.setPreferredLanguage(sessionCO.getLanguage());
	    isoMessageParseSC.setFieldTypeLovId(AtmInterfaceConstants.ISO_FIELD_TYPE);
	    isoMessageParseCO = isoMessageParseBO.parseAndRunISOMessage(isoMessageParseSC);
	}
	catch(Exception ex)
	{
	    handleException(ex, null, null);
	}
	return SUCCESS;
    }

    public void setIsoMessageParseBO(ISOMessageParseBO isoMessageParseBO)
    {
        this.isoMessageParseBO = isoMessageParseBO;
    }

    public ISOMessageParseSC getIsoMessageParseSC()
    {
        return isoMessageParseSC;
    }

    public void setIsoMessageParseSC(ISOMessageParseSC isoMessageParseSC)
    {
        this.isoMessageParseSC = isoMessageParseSC;
    }

    public ISOMessageParseCO getIsoMessageParseCO()
    {
        return isoMessageParseCO;
    }

    public void setIsoMessageParseCO(ISOMessageParseCO isoMessageParseCO)
    {
        this.isoMessageParseCO = isoMessageParseCO;
    }
}