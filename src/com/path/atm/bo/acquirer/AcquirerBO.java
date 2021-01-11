package com.path.atm.bo.acquirer;

import java.util.List;
import com.path.atm.vo.acquirer.AcquirerCO;
import com.path.atm.vo.acquirer.AcquirerSC;
import com.path.lib.common.exception.BaseException;

/**
 * 
 * Copyright 2019, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: Alim Khowaja
 *
 * AcquirerBO.java used to
 */
public interface AcquirerBO
{

    /**
     * return Acquirer List
     * 
     * @param criteria
     * @return
     * @throws BaseException
     */
    public List returnAcquirerList(AcquirerSC criteria) throws BaseException;

    /**
     * return Acquirer List Count
     * 
     * @param criteria
     * @return
     * @throws BaseException
     */
    public int returnAcquirerListCount(AcquirerSC criteria) throws BaseException;

    /**
     * Save Acquirer Record
     * 
     * @param acquirerCO
     * @return
     * @throws BaseException
     */
    public AcquirerCO save(AcquirerCO acquirerCO) throws BaseException, Exception ;
    
    /**
     * edit Acquirer Record
     * 
     * @param sc
     * @return
     * @throws BaseException
     */
    public AcquirerCO edit(AcquirerSC criteria) throws BaseException, Exception;

    /**
     * Delete Acquirer Record
     * 
     * @param acquirerCO
     * @throws BaseException
     */
    public void delete(AcquirerCO acquirerCO) throws BaseException;

    /**
     * make readonly fields
     * 
     * @param acquirerCO
     * @return
     * @throws BaseException
     */
    public AcquirerCO applySysParamSettings(AcquirerCO acquirerCO) throws BaseException;
    
    /**
     * 
     * Return Acquirer Transactions List
     * 
     * @param criteria
     * @return
     * @throws BaseException
     */
    public List returnAcquirerTransactionsList(AcquirerSC criteria) throws BaseException;

    /**
     * return Acquirer List Transactions Count
     * 
     * @param criteria
     * @return
     * @throws BaseException
     */
    public int returnAcquirerTransactionsListCount(AcquirerSC criteria) throws BaseException;

}