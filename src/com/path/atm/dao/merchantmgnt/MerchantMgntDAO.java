package com.path.atm.dao.merchantmgnt;

import java.util.List;

import com.path.atm.dbmaps.vo.GTW_ATM_MERCHANTVO;
import com.path.atm.vo.merchantmgnt.MerchantMgntCO;
import com.path.atm.vo.merchantmgnt.MerchantMgntSC;
import com.path.lib.common.exception.BaseException;
import com.path.lib.common.exception.DAOException;

/**
 * 
 * Copyright 2013, Path Solutions Path Solutions retains all ownership rights to
 * this source code
 * 
 * @author: Muneer Ahmed
 * 
 * 
 */
public interface MerchantMgntDAO
{
    /**
     * return List of Merchant
     * @param merchantMgntSC
     * @return
     * @throws DAOException
     */
    public List<MerchantMgntCO> returnMerchantMgntList(MerchantMgntSC merchantMgntSC) throws DAOException;

    /**
     * return Count of Merchant
     * @param merchantMgntSC
     * @return
     * @throws DAOException
     */
    public Integer returnMerchantMgntListCount(MerchantMgntSC merchantMgntSC) throws DAOException;

    /**
     * return Merchant Details by id
     * @param merchantMgntSC
     * @return
     * @throws BaseException
     */
    public MerchantMgntCO returnMerchantMgntDetails(MerchantMgntSC merchantMgntSC) throws DAOException;

    /**
     * 
     * @param merchantMgntCO
     * @return
     * @throws BaseException
     */
    public int returnActiveResult(MerchantMgntCO merchantMgntCO) throws DAOException;

    /**
     * save Merchant
     * @param gtw_ATM_MERCHANTVO
     * @return
     * @throws DAOException
     */
    public Integer save(GTW_ATM_MERCHANTVO gtw_ATM_MERCHANTVO) throws DAOException;

    /**
     * validate Merchant by iban number or Add Reference
     * @param merchantMgntSC
     * @return
     * @throws DAOException
     */
    public Integer countAccountByIbanORAddRef(MerchantMgntSC merchantMgntSC) throws DAOException;
}
