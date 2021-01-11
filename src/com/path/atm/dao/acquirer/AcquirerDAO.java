package com.path.atm.dao.acquirer;

import java.util.List;

import com.path.atm.dbmaps.vo.GTW_ATM_ACQUIRERVO;
import com.path.atm.vo.acquirer.AcquirerCO;
import com.path.atm.vo.acquirer.AcquirerSC;
import com.path.lib.common.exception.DAOException;

/**
 * 
 * Copyright 2019, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: Alim Khowaja
 *
 * AcquirerDAO.java used to
 */
public interface AcquirerDAO
{

    /**
     * 
     * Return Acquirer List
     * 
     * @param criteria
     * @return
     * @throws DAOException
     */
    public List returnAcquirerList(AcquirerSC criteria) throws DAOException;

    /**
     * return Acquirer List Count
     * 
     * @param criteria
     * @return
     * @throws DAOException
     */
    public int returnAcquirerListCount(AcquirerSC criteria) throws DAOException;

    /**
     * return Acquirer by id
     * 
     * @param criteria
     * @return
     * @throws DAOException
     */
    public AcquirerCO edit(AcquirerSC criteria) throws DAOException;

    /**
     * save GTW_ATM_ACQUIRER
     * 
     * @param gtw_ATM_ACQUIRERVO
     * @return
     * @throws DAOException
     */
    public Integer saveGTW_ATM_ACQUIRERVO(GTW_ATM_ACQUIRERVO gtw_ATM_ACQUIRERVO) throws DAOException;
    
    /**
     * 
     * Return Acquirer Transactions List
     * 
     * @param criteria
     * @return
     * @throws DAOException
     */
    public List returnAcquirerTransactionsList(AcquirerSC criteria) throws DAOException;

    /**
     * return Acquirer List Transactions Count
     * 
     * @param criteria
     * @return
     * @throws DAOException
     */
    public int returnAcquirerTransactionsListCount(AcquirerSC criteria) throws DAOException;
    
    /**
     * Delete Acquirer and its Trx types
     * @param criteria
     * @throws DAOException
     */
    public int deleteAcquirer(AcquirerSC criteria) throws DAOException;
    
    /**
     * Delete terminals based on interface code while BANK ATM checkbox checked
     * @param criteria
     * @throws DAOException
     */
    public int deleteTerminalsByInterfaceCode(AcquirerSC criteria) throws DAOException;
    
    /**
     * validate Bank By Interface Code Count
     * @param criteria
     * @return
     * @throws DAOException
     */
    public int validateBankAtmByTerminalTypeCount(AcquirerSC criteria) throws DAOException;
}