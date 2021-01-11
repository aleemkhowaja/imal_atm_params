package com.path.atm.bo.merchantmgnt;

import java.math.BigDecimal;
import java.util.List;

import com.path.atm.vo.merchantmgnt.MerchantMgntCO;
import com.path.atm.vo.merchantmgnt.MerchantMgntSC;
import com.path.lib.common.exception.BaseException;

/**
 * 
 * Copyright 2013, Path Solutions Path Solutions retains all ownership rights to
 * this source code
 * 
 * @author: Muneer Ahmed
 * 
 *          
 */

public interface MerchantMgntBO
{

    public List<MerchantMgntCO> returnMerchantMgntList(MerchantMgntSC merchantMgntSC) throws BaseException;

    public Integer returnMerchantMgntListCount(MerchantMgntSC merchantMgntSC) throws BaseException;

    public MerchantMgntCO returnMerchantMgntDetails(MerchantMgntSC merchantMgntSC) throws BaseException;

    public MerchantMgntCO saveMerchantMgnt(MerchantMgntCO merchantMgntCO) throws BaseException;

    public MerchantMgntCO approveMerchantMgnt(MerchantMgntCO merchantMgntCO) throws BaseException;

    public MerchantMgntCO deleteMerchantMgnt(MerchantMgntCO merchantMgntCO) throws BaseException;
    
    public MerchantMgntCO approveDeleteMerchantMgnt(MerchantMgntCO merchantMgntCO) throws BaseException;

    public MerchantMgntCO reactivateMerchantMgnt(MerchantMgntCO merchantMgntCO) throws BaseException;
    
    public MerchantMgntCO approveReactivateMerchantMgnt(MerchantMgntCO merchantMgntCO) throws BaseException;
    
    public MerchantMgntCO suspendMerchantMgnt(MerchantMgntCO merchantMgntCO) throws BaseException;
    
    public MerchantMgntCO approveSuspendMerchantMgnt(MerchantMgntCO merchantMgntCO) throws BaseException;
    
    public MerchantMgntCO applySysParamSettings(MerchantMgntCO merchantMgntCO, BigDecimal enableDisbale) throws BaseException;

    public Integer countAccountByIbanORAddRef(MerchantMgntSC merchantMgntSC) throws BaseException;
    /*
     * temporary disable web service call
     * public String returnMerchantName(MerchantMgntSC criteria) throws Exception;*/
    
}
