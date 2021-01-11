package com.path.atm.bo.atminterface;

import java.io.File;
import java.util.List;
import com.path.atm.vo.atminterface.AtmInterfaceCO;
import com.path.atm.vo.atminterface.AtmInterfaceSC;
import com.path.lib.common.exception.BaseException;

/**
 * 
 * Copyright 2019, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: Alim Khowaja
 *
 * AtmInterfaceBO.java used to
 */
public interface AtmInterfaceBO
{
    
    /**
     * Method used to return List of Interfaces
     * 
     * @param criteria Search Criteria Parameter
     * @return List Result
     * @throws BaseException
     */
    public List returnInterfaceList(AtmInterfaceSC criteria) throws BaseException;

    /**
     * Method used to return Count of Interfaces
     * 
     * @param criteria Search Criteria Parameter
     * @return int Result number of Records
     * @throws BaseException
     */
    public int returnInterfaceListCount(AtmInterfaceSC criteria) throws BaseException;

    /**
     * Method to Load Interface Details by ID
     * 
     * @param AtmInterfaceCO
     * @return AtmInterfaceCO
     * @throws BaseException
     */
    public AtmInterfaceCO returnInterfaceById(AtmInterfaceSC criteria) throws BaseException;
    
    /**
     * Method used Save Interface with Fields and Messages
     * 
     * @param AtmInterfaceCO , GridsDataMap
     * @return int Result number of Records
     * @throws BaseException
     */
    public AtmInterfaceCO saveUpdateATMInterface(AtmInterfaceCO atmInterfaceCO) throws BaseException;
    
    /**
     * Method used to Delete ATM Interface
     * 
     * @param criteria Search Criteria Parameter
     * @return AtmInterfaceCO
     * @throws BaseException
     */
    public AtmInterfaceCO deleteInterface(AtmInterfaceCO atmInterfaceCO) throws BaseException;
    
    /**
     * Method used to return List of Messages
     * 
     * @param criteria Search Criteria Parameter
     * @return List Result
     * @throws BaseException
     */
    public List returnMessageList(AtmInterfaceSC criteria) throws BaseException;

    /**
     * Method used to return Count of Messages
     * 
     * @param criteria Search Criteria Parameter
     * @return int Result number of Records
     * @throws BaseException
     */
    public int returnMessageListCount(AtmInterfaceSC criteria) throws BaseException;
    
    /**
     * Method used to return Message by code
     * @param criteria
     * @return
     * @throws BaseException
     */
    public AtmInterfaceCO returnMessageByCode(AtmInterfaceSC criteria) throws BaseException;
    
    /**
     * Method used to return List of IsoFields
     * 
     * @param criteria Search Criteria Parameter
     * @return List Result
     * @throws BaseException
     */
    public List returnIsoFieldsList(AtmInterfaceSC criteria) throws BaseException;

    /**
     * Method used to return Count of IsoFields
     * 
     * @param criteria Search Criteria Parameter
     * @return int Result number of Records
     * @throws BaseException
     */
    public int returnIsoFieldsListCount(AtmInterfaceSC criteria) throws BaseException;

    /**
     * Method used to return List of IsoFields for Expression under Acquirer
     * 
     * @param criteria Search Criteria Parameter
     * @return List Result
     * @throws BaseException
     */
    public List returnISOFieldListForExpression(AtmInterfaceSC criteria) throws BaseException;
    
    /**
     * Method used to return List of Fields
     * 
     * @param criteria Search Criteria Parameter
     * @return List Result
     * @throws BaseException
     */
    public List returnFieldsList(AtmInterfaceSC criteria) throws BaseException;

    /**
     * Method used to return Count of Fields
     * 
     * @param criteria Search Criteria Parameter
     * @return int Result number of Records
     * @throws BaseException
     */
    public int returnFieldsListCount(AtmInterfaceSC criteria) throws BaseException;


    /**
     * Method used to return List of Sub Fields
     * 
     * @param criteria Search Criteria Parameter
     * @return List Result
     * @throws BaseException
     */
    public List returnIsoSubFieldsList(AtmInterfaceSC criteria) throws BaseException;

    /**
     * Method used to return Count of Sub Fields
     * 
     * @param criteria Search Criteria Parameter
     * @return int Result number of Records
     * @throws BaseException
     */
    public int returnIsoSubFieldsListCount(AtmInterfaceSC criteria) throws BaseException;

    /**
     * Method used to Approve, Reject, Suspend OR Reactivate the ATM Interface
     * 
     * @param criteria Search Criteria Parameter
     * @return AtmInterfaceCO
     * @throws BaseException
     */
    public AtmInterfaceCO handleStatusProcess(AtmInterfaceCO atmInterfaceCO) throws BaseException;

    /**
     * Method used to Test ISO Message
     * 
     * @param criteria Search Criteria Parameter
     * @return List Result
     * @throws BaseException
     */
    public List testISOMessage(AtmInterfaceSC criteria) throws BaseException;
    
    
    /**
     * Method used return ISO Fields Detail by List
     * @param criteria
     * @return
     * @throws BaseException
     */
    public List returnIsoFieldsDetailByIdList(AtmInterfaceSC criteria) throws BaseException;

}
