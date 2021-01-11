package com.path.atm.bo.terminal;

import java.util.List;

import com.path.atm.vo.terminal.TerminalCO;
import com.path.atm.vo.terminal.TerminalSC;
import com.path.lib.common.exception.BaseException;

/**
 * 
 * Copyright 2019, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: Alim Khowaja
 *
 * TerminalBO.java used to
 */
public interface TerminalBO
{

    /**
     * return Terminal List
     * 
     * @param criteria
     * @return
     * @throws BaseException
     */
    public List returnTerminalList(TerminalSC criteria) throws BaseException;

    /**
     * return Terminal List Count
     * 
     * @param criteria
     * @return
     * @throws BaseException
     */
    public int returnTerminalListCount(TerminalSC criteria) throws BaseException;

    /**
     * Save Terminal Record
     * 
     * @param terminalCO
     * @return
     * @throws BaseException
     */
    public TerminalCO save(TerminalCO terminalCO) throws BaseException;

    /**
     * edit Terminal Record
     * 
     * @param sc
     * @return
     * @throws BaseException
     */
    public TerminalCO edit(TerminalSC criteria) throws BaseException, Exception;

    /**
     * Delete Terminal Record
     * 
     * @param terminalCO
     * @throws BaseException
     */
    public void delete(TerminalCO terminalCO) throws BaseException;

    /**
     * make readonly fields
     * 
     * @param terminalCO
     * @return
     * @throws BaseException
     */
    public TerminalCO applySysParamSettings(TerminalCO terminalCO) throws BaseException;
    
    /**
     * validate terminal id
     * @param terminalCO
     * @return
     * @throws BaseException
     */
    public TerminalCO validateTerminalId(TerminalCO terminalCO) throws BaseException;

}