package com.path.atm.dao.atmenginecontrol;

import java.util.List;

import com.path.atm.vo.atmenginecontrol.ATMEngineControlCO;
import com.path.atm.vo.atmenginecontrol.ATMEngineControlSC;
import com.path.lib.common.exception.DAOException;

/**
 * 
 * Copyright 2020, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: USER
 *
 * ATMEngineControlDAO.java used to
 */
public interface ATMEngineControlDAO 
{
    
    /**
     * return Count of Interfaces grid (1st grid in engine control screen)
     * @param criteria
     * @return
     * @throws DAOException
     */
    public Integer returnATMEngineCount(ATMEngineControlSC criteria) throws DAOException;

    /**
     * 
     * @param criteria
     * @return List of Interfaces (1st grid in engine control screen)
     * @throws DAOException
     */
    public List<ATMEngineControlCO> returnATMEngineList(ATMEngineControlSC criteria) throws DAOException;

    /**
     * 
     * @param criteria
     * @return Count of Engine Request data (2nd grid in engine control screen)
     * @throws DAOException
     */
    public Integer returnAlertEngineRequestCount(ATMEngineControlSC criteria) throws DAOException;

    /**
     * 
     * @param criteria
     * @return List of Request and response details (2nd grid in engine control screen)
     * @throws DAOException
     */
    public List<ATMEngineControlCO> returnAlertEngineRequest(ATMEngineControlSC criteria) throws DAOException;
    
    /**
     * 
     * @param criteria
     * @return Response Error Message
     * @throws DAOException
     */
    public ATMEngineControlCO returnAlertEngineRequestMsgDtls(ATMEngineControlSC criteria) throws DAOException;
    
    /**
     * 
     * @param criteria
     * @return Select for retrieve REQUEST Message and Response Message for Message Dialog
     * @throws DAOException
     */
    public ATMEngineControlCO returnRequstAndResponseISOMsg(ATMEngineControlSC criteria) throws DAOException;
    
    /**
     * 
     * @param criteria
     * @return List of ATM Engine Action Log
     * @throws DAOException
     */
    public List<ATMEngineControlCO> returnATMEngineActionlogList(ATMEngineControlSC criteria) throws DAOException;
    
    /**
     * 
     * @param criteria
     * @return Count of ATM engine Action Log
     * @throws DAOException
     */
    public Integer returnATMEngineActionLogCount(ATMEngineControlSC criteria) throws DAOException;
}