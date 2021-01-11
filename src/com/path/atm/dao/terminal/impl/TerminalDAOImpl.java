package com.path.atm.dao.terminal.impl;

import java.util.List;

import com.path.atm.dao.terminal.TerminalDAO;
import com.path.atm.dbmaps.vo.GTW_ATM_TERMINALVO;
import com.path.atm.vo.terminal.TerminalCO;
import com.path.atm.vo.terminal.TerminalSC;
import com.path.lib.common.base.BaseDAO;
import com.path.lib.common.exception.DAOException;
import com.path.lib.common.util.DAOHelper;

/**
 * 
 * Copyright 2019, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: Alim Khowaja
 *
 * TerminalDAOImpl.java used to
 */
public class TerminalDAOImpl extends BaseDAO implements TerminalDAO
{

    @Override
    public List returnTerminalList(TerminalSC criteria) throws DAOException
    {
	DAOHelper.fixGridMaps(criteria, getSqlMap(), "terminalMapper.terminalListMap");
	if(criteria.getSortOrder() == null)
	{
	    criteria.setSortOrder(" ORDER BY TERMINAL_ID DESC");
	}
	if(criteria.getNbRec() == -1)
	{
	    return getSqlMap().queryForList("terminalMapper.returnTerminalList", criteria);
	}
	else
	{
	    return getSqlMap().queryForList("terminalMapper.returnTerminalList", criteria, criteria.getRecToskip(),
		    criteria.getNbRec());
	}
    }

    @Override
    public int returnTerminalListCount(TerminalSC criteria) throws DAOException
    {
	DAOHelper.fixGridMaps(criteria, getSqlMap(), "terminalMapper.terminalListMap");
	return ((Integer) getSqlMap().queryForObject("terminalMapper.returnTerminalListCount", criteria)).intValue();

    }

    @Override
    public TerminalCO edit(TerminalSC criteria) throws DAOException
    {
	return (TerminalCO) getSqlMap().queryForObject("terminalMapper.edit", criteria);
    }
    
    @Override
    public Integer saveGTW_ATM_TERMINALVO(GTW_ATM_TERMINALVO atm_TERMINALVO ) throws DAOException
    {
	return (Integer) getSqlMap().insert("terminalMapper.insertGTW_ATM_TERMINAL", atm_TERMINALVO);
    }
    
    @Override
    public int validateTerminalId(TerminalSC criteria) throws DAOException
    {
	return ((Integer) getSqlMap().queryForObject("terminalMapper.validateTemplateId", criteria)).intValue();
    }

}
