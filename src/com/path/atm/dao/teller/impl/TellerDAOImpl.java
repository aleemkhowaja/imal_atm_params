package com.path.atm.dao.teller.impl;

import java.util.List;

import com.path.atm.dao.merchantmgnt.MerchantMgntDAO;
import com.path.atm.dao.teller.TellerDAO;
import com.path.atm.vo.merchantmgnt.MerchantMgntCO;
import com.path.atm.vo.merchantmgnt.MerchantMgntSC;
import com.path.atm.vo.teller.TellerCO;
import com.path.atm.vo.teller.TellerSC;
import com.path.atm.vo.terminal.TerminalCO;
import com.path.lib.common.base.BaseDAO;
import com.path.lib.common.exception.BaseException;
import com.path.lib.common.exception.DAOException;
import com.path.lib.common.util.DAOHelper;
import com.path.lib.common.util.StringUtil;

/**
 * 
 * Copyright 2019, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: USER
 *
 * TellerDAOImpl.java used to
 */
public class TellerDAOImpl extends BaseDAO implements TellerDAO
{

    @Override
    public List returnTellerList(TellerSC tellerSC) throws DAOException
    {
	DAOHelper.fixGridMaps(tellerSC, getSqlMap(), "atmTellerMapper.atmTellerListMap");
	if(tellerSC.getNbRec() == -1)
	{
	    return getSqlMap().queryForList("atmTellerMapper.returnTellerList", tellerSC);
	}
	else
	{
	    return getSqlMap().queryForList("atmTellerMapper.returnTellerList", tellerSC, tellerSC.getRecToskip(),
		    tellerSC.getNbRec());
	}
    }

    @Override
    public int returnTellerCount(TellerSC tellerSC) throws DAOException
    {
	DAOHelper.fixGridMaps(tellerSC, getSqlMap(), "atmTellerMapper.atmTellerListMap");
	return ((Integer) getSqlMap().queryForObject("atmTellerMapper.returnTellerListCount", tellerSC)).intValue();

    }

    @Override
    public TellerCO returnTellerDetails(TellerSC tellerSC) throws DAOException
    {
	return (TellerCO) getSqlMap().queryForObject("atmTellerMapper.returnTellerDetails", tellerSC);
    }
}