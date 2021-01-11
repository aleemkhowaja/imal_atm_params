package com.path.atm.bo.teller;

import java.util.List;

import com.path.atm.vo.teller.TellerCO;
import com.path.atm.vo.teller.TellerSC;
import com.path.lib.common.exception.BaseException;

/**
 * 
 * Copyright 2019, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: Alim Khowaja
 *
 * TellerBO.java used to
 */
public interface TellerBO
{

    /**
     * 
     * @param criteria
     * @return
     * @throws BaseException
     */
    public List returnTellerList(TellerSC tellerSC) throws Exception;;
    
    /**
     * 
     * @param criteria
     * @return
     * @throws BaseException
     */
    public int returnTellerCount(TellerSC tellerSC) throws Exception;;

    /**
     * 
     * @param ctstellervoKey
     * @return
     * @throws BaseException
     */
    public TellerCO returnTellerDetails(TellerSC tellerSC) throws Exception;;
}