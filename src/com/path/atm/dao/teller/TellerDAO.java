package com.path.atm.dao.teller;

import java.util.List;

import com.path.atm.vo.teller.TellerCO;
import com.path.atm.vo.teller.TellerSC;
import com.path.lib.common.exception.DAOException;

/**
 * 
 * Copyright 2019, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: Alim Khowaja
 *
 * TellerDAO.java used to
 */
public interface TellerDAO
{

    /**
     * Return Teller List
     * 
     * @param criteria
     * @return
     * @throws DAOException
     */
    public List returnTellerList(TellerSC tellerSC) throws DAOException;

    /**
     * return Teller List Count
     * 
     * @param criteria
     * @return
     * @throws DAOException
     */
    public int returnTellerCount(TellerSC tellerSC) throws DAOException;
    
    /**
     * return Teller Details
     * @param tellerSC
     * @return
     */
    public TellerCO returnTellerDetails(TellerSC tellerSC)throws DAOException;

}