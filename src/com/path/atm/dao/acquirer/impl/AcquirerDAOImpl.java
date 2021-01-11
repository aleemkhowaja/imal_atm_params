package com.path.atm.dao.acquirer.impl;

import java.util.List;

import com.path.atm.dao.acquirer.AcquirerDAO;
import com.path.atm.dbmaps.vo.GTW_ATM_ACQUIRERVO;
import com.path.atm.vo.acquirer.AcquirerCO;
import com.path.atm.vo.acquirer.AcquirerSC;
import com.path.lib.common.base.BaseDAO;
import com.path.lib.common.exception.DAOException;
import com.path.lib.common.util.DAOHelper;

/**
 * 
 * Copyright 2019, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: Alim Khowaja
 *
 * AcquirerDAOImpl.java used to
 */
public class AcquirerDAOImpl extends BaseDAO implements AcquirerDAO
{

    @Override
    public List returnAcquirerList(AcquirerSC criteria) throws DAOException
    {
	DAOHelper.fixGridMaps(criteria, getSqlMap(), "acquirerMapper.acquirerListMap");
	if(criteria.getSortOrder() == null)
	{
	    criteria.setSortOrder(" ORDER BY ACQUIRER_ID DESC");
	}
	if(criteria.getNbRec() == -1)
	{
	    return getSqlMap().queryForList("acquirerMapper.returnAcquirerList", criteria);
	}
	else
	{
	    return getSqlMap().queryForList("acquirerMapper.returnAcquirerList", criteria, criteria.getRecToskip(),
		    criteria.getNbRec());
	}
    }

    @Override
    public int returnAcquirerListCount(AcquirerSC criteria) throws DAOException
    {
	DAOHelper.fixGridMaps(criteria, getSqlMap(), "acquirerMapper.acquirerListMap");
	return ((Integer) getSqlMap().queryForObject("acquirerMapper.returnAcquirerListCount", criteria)).intValue();

    }

    @Override
    public AcquirerCO edit(AcquirerSC criteria) throws DAOException
    {
	return (AcquirerCO) getSqlMap().queryForObject("acquirerMapper.edit", criteria);
    }

    @Override
    public Integer saveGTW_ATM_ACQUIRERVO(GTW_ATM_ACQUIRERVO gtw_ATM_ACQUIRERVO) throws DAOException
    {
	return (Integer) getSqlMap().insert("acquirerMapper.insertGTW_ATM_ACQUIRER", gtw_ATM_ACQUIRERVO);
    }

    @Override
    public List returnAcquirerTransactionsList(AcquirerSC criteria) throws DAOException
    {
	DAOHelper.fixGridMaps(criteria, getSqlMap(), "acquirerMapper.acquirerTrxTypeListMap");

	if(criteria.getNbRec() == -1)
	{
	    return getSqlMap().queryForList("acquirerMapper.returnAcquirerTrxTypeList", criteria);
	}
	else
	{
	    return getSqlMap().queryForList("acquirerMapper.returnAcquirerTrxTypeList", criteria, criteria.getRecToskip(),
		    criteria.getNbRec());
	}
    }

    @Override
    public int returnAcquirerTransactionsListCount(AcquirerSC criteria) throws DAOException
    {
	DAOHelper.fixGridMaps(criteria, getSqlMap(), "acquirerMapper.acquirerTrxTypeListMap");
	return ((Integer) getSqlMap().queryForObject("acquirerMapper.returnAcquirerTrxTypeListCount", criteria)).intValue();
    }
    
    @Override
    public int deleteAcquirer(AcquirerSC criteria) throws DAOException 
    {
	return (Integer) getSqlMap().delete("acquirerMapper.deleteGTW_ATM_ACQUIRER", criteria);
    }

    @Override
    public int deleteTerminalsByInterfaceCode(AcquirerSC criteria) throws DAOException
    {
	return (Integer) getSqlMap().delete("acquirerMapper.deleteGTW_ATM_TERMINAL", criteria);
    }

    @Override
    public int validateBankAtmByTerminalTypeCount(AcquirerSC criteria) throws DAOException
    {
	return ((Integer) getSqlMap().queryForObject("acquirerMapper.validateBankAtmByTerminalTypeCount", criteria)).intValue();
    }
}