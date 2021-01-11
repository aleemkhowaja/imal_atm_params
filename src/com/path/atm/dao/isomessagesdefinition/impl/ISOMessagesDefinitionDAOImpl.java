package com.path.atm.dao.isomessagesdefinition.impl;

import java.util.List;

import com.path.atm.dao.isomessagesdefinition.ISOMessagesDefinitionDAO;
import com.path.atm.dbmaps.vo.GTW_ATM_ISO_MSG_DEFVO;
import com.path.atm.dbmaps.vo.GTW_ATM_ISO_NET_MSG_FLDSVO;
import com.path.atm.vo.isomessagesdefinition.ISOMessagesDefinitionCO;
import com.path.atm.vo.isomessagesdefinition.ISOMessagesDefinitionSC;
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
 * ISOMessagesDefinitionDAOImpl.java used to
 */
public class ISOMessagesDefinitionDAOImpl extends BaseDAO implements ISOMessagesDefinitionDAO
{

    
    @Override
    public List returnISOMessagesDefinitionList(ISOMessagesDefinitionSC criteria) throws DAOException
    {
	DAOHelper.fixGridMaps(criteria, getSqlMap(), "isoMessagesDefinitionMapper.isoMessagesDefinitionListMap");
	if(criteria.getSortOrder() == null)
	{
	    criteria.setSortOrder(" ORDER BY ISO_MSG_DEF_ID DESC");
	}
	if(criteria.getNbRec() == -1)
	{
	    return getSqlMap().queryForList("isoMessagesDefinitionMapper.returnISOMessagesDefinitionList", criteria);
	}
	else
	{
	    return getSqlMap().queryForList("isoMessagesDefinitionMapper.returnISOMessagesDefinitionList", criteria, criteria.getRecToskip(),
		    criteria.getNbRec());
	}
    }

    @Override
    public int returnISOMessagesDefinitionListCount(ISOMessagesDefinitionSC criteria) throws DAOException
    {
	DAOHelper.fixGridMaps(criteria, getSqlMap(), "isoMessagesDefinitionMapper.isoMessagesDefinitionListMap");
	return ((Integer) getSqlMap().queryForObject("isoMessagesDefinitionMapper.returnISOMessagesDefinitionListCount", criteria)).intValue();
    }

    @Override
    public ISOMessagesDefinitionCO edit(ISOMessagesDefinitionSC criteria) throws DAOException
    {
	return (ISOMessagesDefinitionCO) getSqlMap().queryForObject("isoMessagesDefinitionMapper.edit", criteria);
    }

    @Override
    public Integer saveGTW_ATM_ISO_NET_MSG_FLDS(GTW_ATM_ISO_NET_MSG_FLDSVO atm_ISO_NET_MSG_FLDSVO) throws DAOException
    {
	return (Integer) getSqlMap().insert("isoMessagesDefinitionMapper.saveGTW_ATM_ISO_NET_MSG_FLDS", atm_ISO_NET_MSG_FLDSVO);
    }

    @Override
    public int deleteATMISOMessagesByMappingId(ISOMessagesDefinitionSC criteria) throws DAOException
    {
	return (Integer) getSqlMap().delete("isoMessagesDefinitionMapper.deleteATMISOMessagesMappings", criteria);
    }
    
    @Override
    public Integer saveGTW_ATM_ISO_MSG_DEFVO(GTW_ATM_ISO_MSG_DEFVO gtw_ATM_ISO_MSG_DEFVO) throws DAOException
    {
	return (Integer) getSqlMap().insert("isoMessagesDefinitionMapper.saveGTW_ATM_ISO_MSG_DEFVO", gtw_ATM_ISO_MSG_DEFVO);
    }

    @Override
    public List returnIsoMessagesDefNetFldsList(ISOMessagesDefinitionSC criteria) throws DAOException
    {
	DAOHelper.fixGridMaps(criteria, getSqlMap(), "isoMessagesDefinitionMapper.isoMessagesDefinitionListMap");
	if(criteria.getNbRec() == -1)
	{
	    return getSqlMap().queryForList("isoMessagesDefinitionMapper.returnIsoMessagesDefNetFldsList", criteria);
	}
	else
	{
	    return getSqlMap().queryForList("isoMessagesDefinitionMapper.returnIsoMessagesDefNetFldsList", criteria, criteria.getRecToskip(),
		    criteria.getNbRec());
	}
    }

    @Override
    public int returnIsoMessagesDefNetFldsCount(ISOMessagesDefinitionSC criteria) throws DAOException
    {
	DAOHelper.fixGridMaps(criteria, getSqlMap(), "isoMessagesDefinitionMapper.isoMessagesDefinitionListMap");
	return ((Integer) getSqlMap().queryForObject("isoMessagesDefinitionMapper.returnIsoMessagesDefNetFldsCount", criteria)).intValue();
    }
    
    @Override
    public int deleteIsoMessagesDefNetFlds(ISOMessagesDefinitionSC criteria) throws DAOException
    {
	return (Integer) getSqlMap().delete("isoMessagesDefinitionMapper.deleteIsoMessagesDefNetFlds", criteria);
    }
}