package com.path.atm.actions.terminal;

import com.path.atm.bo.terminal.TerminalBO;
import com.path.atm.vo.terminal.TerminalSC;
import com.path.struts2.lib.common.base.GridBaseAction;
import com.path.vo.common.SessionCO;

/**
 * 
 * Copyright 2019, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: Alim Khowaja
 *
 * TerminalListAction.java used to
 */
public class TerminalListAction extends GridBaseAction
{
    private TerminalBO terminalBO;
    private TerminalSC criteria = new TerminalSC();

    /**
     * return Channel Grid
     * 
     * @return
     */
    public String loadTerminalGrid()
    {
	try
	{
	    SessionCO sessionCO = returnSessionObject();
	    String[] searchCol = { "gtw_ATM_TERMINALVO.TERMINAL_CODE", "gtw_ATM_TERMINALVO.DESCRIPTION", "gtw_ATM_TERMINALVO.TERMINAL_TYPE",
		    "atmInterfaceDescription","acquirerDescription"};
	    criteria.setSearchCols(searchCol);
	    copyproperties(criteria);
	    criteria.setCompCode(sessionCO.getCompanyCode());
	    criteria.setCurrAppName(sessionCO.getCurrentAppName());
	    criteria.setPreferredLanguage(sessionCO.getLanguage());
	    criteria.setMenuRef(get_pageRef());
	    criteria.setCrudMode(getIv_crud());
	    if(checkNbRec(criteria))
	    {
		setRecords(terminalBO.returnTerminalListCount(criteria));
	    }
	    setGridModel(terminalBO.returnTerminalList(criteria));
	}
	catch(Exception e)
	{
	    e.printStackTrace();
	    handleException(e, null, null);
	}
	return SUCCESS;
    }

    @Override
    public Object getModel()
    {
	return criteria;
    }

    public TerminalSC getCriteria()
    {
	return criteria;
    }

    public void setCriteria(TerminalSC criteria)
    {
	this.criteria = criteria;
    }

    public void setTerminalBO(TerminalBO terminalBO)
    {
	this.terminalBO = terminalBO;
    }

}
