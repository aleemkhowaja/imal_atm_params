package com.path.atm.dao.terminal;

import java.util.List;

import com.path.atm.dbmaps.vo.GTW_ATM_TERMINALVO;
import com.path.atm.vo.terminal.TerminalCO;
import com.path.atm.vo.terminal.TerminalSC;
import com.path.lib.common.exception.DAOException;

/**
 * 
 * Copyright 2019, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: Alim Khowaja
 *
 * TerminalDAO.java used to
 */
public interface TerminalDAO
{

    /**
     * Return Terminal List
     * 
     * @param criteria
     * @return
     * @throws DAOException
     */
    public List returnTerminalList(TerminalSC criteria) throws DAOException;

    /**
     * return Terminal List Count
     * 
     * @param criteria
     * @return
     * @throws DAOException
     */
    public int returnTerminalListCount(TerminalSC criteria) throws DAOException;

    /**
     * return Terminal by id
     * 
     * @param criteria
     * @return
     * @throws DAOException
     */
    public TerminalCO edit(TerminalSC criteria) throws DAOException;
    
    /**
     * save Terminal Record
     * @param atm_TERMINALVO
     * @return
     * @throws DAOException
     */
    public Integer saveGTW_ATM_TERMINALVO(GTW_ATM_TERMINALVO atm_TERMINALVO ) throws DAOException;
    
    /**
     * validate Template Id
     * @param criteria
     * @return
     * @throws DAOException
     */
    public int validateTerminalId(TerminalSC criteria) throws DAOException;

}