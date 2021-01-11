package com.path.atm.dao.atmenginecontrol.impl;

import java.util.List;

import com.path.atm.dao.atmenginecontrol.ATMEngineControlDAO;
import com.path.atm.vo.atmenginecontrol.ATMEngineControlCO;
import com.path.atm.vo.atmenginecontrol.ATMEngineControlSC;
import com.path.lib.common.base.BaseDAO;
import com.path.lib.common.exception.DAOException;
import com.path.lib.common.util.DAOHelper;
import com.path.lib.common.util.StringUtil;
/**
 * 
 * Copyright 2020, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: Alim Khowaja
 *
 * ATMEngineControlDAOImpl.java used to
 */
public class ATMEngineControlDAOImpl extends BaseDAO implements ATMEngineControlDAO
{

    @Override
    public Integer returnATMEngineCount(ATMEngineControlSC criteria) throws DAOException
    {
	DAOHelper.fixGridMaps(criteria, getSqlMap(), "atmEngineControlMapper.ATMEngineInterfaceResultMap");

	return ((Integer) getSqlMap().queryForObject("atmEngineControlMapper.returnATMEngineCount", criteria))
			.intValue();
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<ATMEngineControlCO> returnATMEngineList(ATMEngineControlSC criteria) throws DAOException
    {
	// check if no order Specified then Order by INTERFACE_ID ASC
	if(StringUtil.nullToEmpty(criteria.getSidx()).isEmpty())
	{
	    criteria.setSidx("INTERFACE_ID");
	    criteria.setSord("DESC");
	}

	DAOHelper.fixGridMaps(criteria, getSqlMap(), "atmEngineControlMapper.ATMEngineInterfaceResultMap");
	List<ATMEngineControlCO> lst;

	if (criteria.getNbRec() == -1) {
		lst = getSqlMap().queryForList("atmEngineControlMapper.returnATMEngineList", criteria);
	} else {
		lst = getSqlMap().queryForList("atmEngineControlMapper.returnATMEngineList", criteria, criteria.getRecToskip(), criteria.getNbRec());
	}
	return lst;
    }

    @Override
    public Integer returnAlertEngineRequestCount(ATMEngineControlSC criteria) throws DAOException
    {
	DAOHelper.fixGridMaps(criteria, getSqlMap(), "atmEngineControlMapper.alertEngineRequestResultMap");

	return ((Integer) getSqlMap().queryForObject("atmEngineControlMapper.returnAlertEngineRequestCount", criteria))
			.intValue();
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<ATMEngineControlCO> returnAlertEngineRequest(ATMEngineControlSC criteria) throws DAOException
    {
	// check if no order Specified then Order by MESSAGE_ID DESC
	if(StringUtil.nullToEmpty(criteria.getSidx()).isEmpty())
	{
	    criteria.setSidx("MESSAGE_ID");
	    criteria.setSord("DESC");
	}
	DAOHelper.fixGridMaps(criteria, getSqlMap(), "atmEngineControlMapper.alertEngineRequestResultMap");
	List<ATMEngineControlCO> lst;

	if (criteria.getNbRec() == -1) {
		lst = getSqlMap().queryForList("atmEngineControlMapper.returnAlertEngineRequest", criteria);
	} else {
		lst = getSqlMap().queryForList("atmEngineControlMapper.returnAlertEngineRequest", criteria, criteria.getRecToskip(), criteria.getNbRec());
	}
	return lst;
    }
    
    @Override
    public ATMEngineControlCO returnAlertEngineRequestMsgDtls(ATMEngineControlSC criteria) throws DAOException
    {
	return (ATMEngineControlCO) getSqlMap().queryForObject("atmEngineControlMapper.returnAlertEngineRequestMsgDtls", criteria);
    }
    
    @Override
    public ATMEngineControlCO returnRequstAndResponseISOMsg(ATMEngineControlSC criteria) throws DAOException
    {
	return (ATMEngineControlCO) getSqlMap().queryForObject("atmEngineControlMapper.returnRequstAndResponseISOMsg", criteria);
    }
    
    @Override
    public Integer returnATMEngineActionLogCount(ATMEngineControlSC criteria) throws DAOException
    {
	DAOHelper.fixGridMaps(criteria, getSqlMap(), "atmEngineControlMapper.ATMEngineActionLogMap");

	return ((Integer) getSqlMap().queryForObject("atmEngineControlMapper.returnATMEngineActionLogCount", criteria))
			.intValue();
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<ATMEngineControlCO> returnATMEngineActionlogList(ATMEngineControlSC criteria) throws DAOException
    {
	// check if no order Specified then Order by INTERFACE_ID ASC
	if(StringUtil.nullToEmpty(criteria.getSidx()).isEmpty())
	{
	    criteria.setSidx("ATM_ENG_ACTION_LOG_ID");
	    criteria.setSord("DESC");
	}

	DAOHelper.fixGridMaps(criteria, getSqlMap(), "atmEngineControlMapper.ATMEngineActionLogMap");
	List<ATMEngineControlCO> lst;

	if (criteria.getNbRec() == -1) {
		lst = getSqlMap().queryForList("atmEngineControlMapper.returnATMEngineActionLogList", criteria);
	} else {
		lst = getSqlMap().queryForList("atmEngineControlMapper.returnATMEngineActionLogList", criteria, criteria.getRecToskip(), criteria.getNbRec());
	}
	return lst;
    }
}
