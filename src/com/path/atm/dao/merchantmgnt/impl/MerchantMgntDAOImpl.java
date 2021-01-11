package com.path.atm.dao.merchantmgnt.impl;

import java.util.List;

import com.path.atm.dao.merchantmgnt.MerchantMgntDAO;
import com.path.atm.dbmaps.vo.GTW_ATM_MERCHANTVO;
import com.path.atm.vo.merchantmgnt.MerchantMgntCO;
import com.path.atm.vo.merchantmgnt.MerchantMgntSC;
import com.path.lib.common.base.BaseDAO;
import com.path.lib.common.exception.BaseException;
import com.path.lib.common.exception.DAOException;
import com.path.lib.common.util.DAOHelper;
import com.path.lib.common.util.StringUtil;

/**
 * 
 * Copyright 2013, Path Solutions Path Solutions retains all ownership rights to
 * this source code
 * 
 * @author: Muneer Ahmed
 * 
 * 
 */

public class MerchantMgntDAOImpl extends BaseDAO implements MerchantMgntDAO
{

    /**
     * loading data of the main grid
     */
    public List<MerchantMgntCO> returnMerchantMgntList(MerchantMgntSC merchantMgntSC) throws DAOException
    {

	// check if no order Specified then Order by ChequeBook CODE No
	// Descending
	if(StringUtil.nullToEmpty(merchantMgntSC.getSidx()).isEmpty())
	{
	    merchantMgntSC.setSidx("MERCHANT_CODE");
	    merchantMgntSC.setSord("DESC");
	}

	/*
	 * set number of rows to be displayed in the page of grid, and the total
	 * number of records
	 */
	DAOHelper.fixGridMaps(merchantMgntSC, getSqlMap(), "merchantMgntMapper.merchantMgntResultMap");

	if(merchantMgntSC.getNbRec() == -1)
	{
	    return getSqlMap().queryForList("merchantMgntMapper.returnMerchantMgntList", merchantMgntSC);
	}
	else
	{
	    /* call the query */
	    return getSqlMap().queryForList("merchantMgntMapper.returnMerchantMgntList", merchantMgntSC,
		    merchantMgntSC.getRecToskip(), merchantMgntSC.getNbRec());

	}
    }

    /**
     * number of record for the main grid
     */
    public Integer returnMerchantMgntListCount(MerchantMgntSC merchantMgntSC) throws DAOException
    {
	/*
	 * DAOHelper: used to fix the mapping between properties and database
	 * column names
	 */
	DAOHelper.fixGridMaps(merchantMgntSC, getSqlMap(), "merchantMgntMapper.merchantMgntResultMap");
	return (Integer) getSqlMap().queryForObject("merchantMgntMapper.returnMerchantMgntListCount", merchantMgntSC);
    }

    public MerchantMgntCO returnMerchantMgntDetails(MerchantMgntSC merchantMgntSC) throws DAOException
    {
	List<MerchantMgntCO> lst = getSqlMap().queryForList("merchantMgntMapper.returnMerchantMgntDetails",
		merchantMgntSC);
	return (lst == null || lst.isEmpty()) ? (new MerchantMgntCO()) : lst.get(0);
    }


    public int returnActiveResult(MerchantMgntCO merchantMgntCO) throws DAOException
    {
	return ((Integer) getSqlMap().queryForObject("merchantMgntMapper.returnActiveResult", merchantMgntCO))
		.intValue();
    }
    
    @Override
    public Integer save(GTW_ATM_MERCHANTVO gtw_ATM_MERCHANTVO) throws DAOException
    {
	return (Integer) getSqlMap().insert("merchantMgntMapper.insertMERCHANT", gtw_ATM_MERCHANTVO);
    }
    
    /**
     * validate Account by IBAN and Additional Ref
     */
    @Override
    public Integer countAccountByIbanORAddRef(MerchantMgntSC merchantMgntSC) throws DAOException
    {
	return ((Integer) getSqlMap().queryForObject("merchantMgntMapper.countAccountByIbanORAddRef", merchantMgntSC)).intValue();
    }


}
