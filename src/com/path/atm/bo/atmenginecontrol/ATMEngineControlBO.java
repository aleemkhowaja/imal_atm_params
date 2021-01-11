package com.path.atm.bo.atmenginecontrol;

import java.util.List;
import com.path.atm.vo.atmenginecontrol.ATMEngineControlCO;
import com.path.atm.vo.atmenginecontrol.ATMEngineControlSC;
import com.path.atm.vo.isomessageparsing.ISOMessageParseCO;
import com.path.lib.common.exception.BaseException;

/**
 * 
 * Copyright 2013, Path Solutions Path Solutions retains all ownership rights to
 * this source code
 * 
 * ATMEngineControlBO.java used to
 */
public interface ATMEngineControlBO
{
    /**
     * 
     * start alert engine node via call RMI of alert engine
     */
    public void start(ATMEngineControlCO atmEngineControlCO) throws BaseException;

    /**
     * shutdown alert engine node via call RMI of alert engine
     */
    public void shutdown(ATMEngineControlCO atmEngineControlCO) throws BaseException;
    
    public Integer returnATMEngineCount(ATMEngineControlSC criteria)  throws BaseException;;
    
    public List<ATMEngineControlCO> returnATMEngineList(ATMEngineControlSC criteria)  throws BaseException;
    
    public Integer returnAlertEngineRequestCount(ATMEngineControlSC criteria) throws BaseException;

    public List<ATMEngineControlCO> returnAlertEngineRequest(ATMEngineControlSC criteria) throws BaseException;
    
    /**
     * return ISO Fields
     * @param atmEngineControlSC
     * @return
     * @throws Exception
     */
    public List<ISOMessageParseCO> retrieveISOFields(ATMEngineControlSC atmEngineControlSC) throws Exception;
    
    /**
     * 
     * @param criteria
     * @return Response Error Details 
     * @throws BaseException
     */
    public ATMEngineControlCO returnAlertEngineRequestMsgDtls(ATMEngineControlSC criteria) throws BaseException;
    
    /**
     * 
     * @param criteria
     * @return return REQUEST Message and Response Message for Message Dialog
     * @throws BaseExcept ion
     */
    public ATMEngineControlCO returnRequstAndResponseISOMsg(ATMEngineControlSC criteria) throws BaseException;
    
    /**
     * 
     * @param criteria
     * @return Count of ATM Engine Action Log
     * @throws BaseException
     */
    public Integer returnATMEngineActionLogCount(ATMEngineControlSC criteria)  throws BaseException;
    
    /**
     * 
     * @param criteria
     * @return List of ATM Engine Action Log
     * @throws BaseException
     */
    public List<ATMEngineControlCO> returnATMEngineActionlogList(ATMEngineControlSC criteria) throws BaseException;

}