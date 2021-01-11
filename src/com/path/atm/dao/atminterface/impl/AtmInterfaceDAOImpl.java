package com.path.atm.dao.atminterface.impl;

import java.util.List;

import com.path.atm.dao.atminterface.AtmInterfaceDAO;
import com.path.atm.dbmaps.vo.GTW_ATM_INTERFACESVO;
import com.path.atm.dbmaps.vo.GTW_ATM_INT_ISO_FLDSVO;
import com.path.atm.dbmaps.vo.GTW_ATM_INT_ISO_MSGSVO;
import com.path.atm.dbmaps.vo.GTW_ATM_INT_ISO_SUB_FLDSVO;
import com.path.atm.vo.atminterface.AtmInterfaceCO;
import com.path.atm.vo.atminterface.AtmInterfaceSC;
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
 * AtmInterfaceDAOImpl.java used to
 */
public class AtmInterfaceDAOImpl extends BaseDAO implements AtmInterfaceDAO
{
    
    @Override
    public List returnInterfaceList(AtmInterfaceSC criteria) throws DAOException
    {
	DAOHelper.fixGridMaps(criteria, getSqlMap(), "atmInterfaceMapper.interfaceMap");
	if(criteria.getSortOrder() == null)
	{
	    criteria.setSortOrder(" ORDER BY INTERFACE_CODE DESC");
	}
	if(criteria.getNbRec() == -1)
	{
	    return getSqlMap().queryForList("atmInterfaceMapper.returnInterfaceList", criteria);
	}
	else
	{
	    return getSqlMap().queryForList("atmInterfaceMapper.returnInterfaceList", criteria, criteria.getRecToskip(),
		    criteria.getNbRec());
	}
    }

    @Override
    public int returnInterfaceListCount(AtmInterfaceSC criteria) throws DAOException
    {
	DAOHelper.fixGridMaps(criteria, getSqlMap(), "atmInterfaceMapper.interfaceMap");
	return ((Integer) getSqlMap().queryForObject("atmInterfaceMapper.returnInterfaceListCount", criteria)).intValue();
    }
    
    @Override
    public List returnIsoFieldsList(AtmInterfaceSC criteria) throws DAOException
    {
	DAOHelper.fixGridMaps(criteria, getSqlMap(), "atmInterfaceMapper.isoFieldsMap");
	
	if(criteria.getSortOrder() == null)
	{
	    criteria.setSortOrder(" ORDER BY SYS_PARAM_ISO_FLDS_ID ASC");
	}
	
	if(criteria.getNbRec() == -1)
	{
	    return getSqlMap().queryForList("atmInterfaceMapper.returnIsoFieldsList", criteria);
	}
	else
	{
	    return getSqlMap().queryForList("atmInterfaceMapper.returnIsoFieldsList", criteria, criteria.getRecToskip(),
		    criteria.getNbRec());
	}
    }

    @Override
    public int returnIsoFieldsListCount(AtmInterfaceSC criteria) throws DAOException
    {
	DAOHelper.fixGridMaps(criteria, getSqlMap(), "atmInterfaceMapper.isoFieldsMap");
	return ((Integer) getSqlMap().queryForObject("atmInterfaceMapper.returnIsoFieldsListCount", criteria)).intValue();
    }

    @Override
    public int returnNewInterfaceId(AtmInterfaceSC criteria) throws DAOException
    {
	int result = 1;
	if(getSqlMap().queryForObject("atmInterfaceMapper.retNewInterfaceId", criteria) != null)
	{
	    result = ((Integer) getSqlMap().queryForObject("atmInterfaceMapper.returnNewInterfaceId", criteria))
		    .intValue();
	}
	return result;
    }

    @Override
    public int returnNewMessageCode(AtmInterfaceSC criteria) throws DAOException
    {
	int result = 1;
	if(getSqlMap().queryForObject("atmInterfaceMapper.returnNewMessageCode", criteria) != null)
	{
	    result = ((Integer) getSqlMap().queryForObject("atmInterfaceMapper.returnNewMessageCode", criteria))
		    .intValue();
	}
	return result;
    }

    @Override
    public List returnMessageList(AtmInterfaceSC criteria) throws DAOException
    {
	DAOHelper.fixGridMaps(criteria, getSqlMap(), "atmInterfaceMapper.messagesMap");
	if(criteria.getNbRec() == -1)
	{
	    return getSqlMap().queryForList("atmInterfaceMapper.returnMessagesList", criteria);
	}
	else
	{
	    return getSqlMap().queryForList("atmInterfaceMapper.returnMessagesList", criteria, criteria.getRecToskip(),
		    criteria.getNbRec());
	}
    }

    @Override
    public int returnMessageListCount(AtmInterfaceSC criteria) throws DAOException
    {
	DAOHelper.fixGridMaps(criteria, getSqlMap(), "atmInterfaceMapper.messagesMap");
	return ((Integer) getSqlMap().queryForObject("atmInterfaceMapper.returnMessagesListCount", criteria)).intValue();
    }
    
    @Override
    public AtmInterfaceCO returnMessageByCode(AtmInterfaceSC criteria) throws DAOException
    {
	return (AtmInterfaceCO) getSqlMap().queryForObject("atmInterfaceMapper.returnMessageByCode", criteria);
    }

    @Override
    public List returnFieldsList(AtmInterfaceSC criteria) throws DAOException
    {
	DAOHelper.fixGridMaps(criteria, getSqlMap(), "atmInterfaceMapper.fieldsMap");
	
	StringBuilder sortProperties = new StringBuilder();
	
	if(criteria.getSortOrder() == null)
	{
	    sortProperties.append(" ORDER BY FIELD_CODE ");
	    
	    if(criteria.getWithSubFields() != null && criteria.getWithSubFields())
	    {
		sortProperties.append(" , ATM_ISO_SUB_FLDS_CODE");
	    }
	    sortProperties.append(" ASC");
	    criteria.setSortOrder(sortProperties.toString());
	}
	
	if(criteria.getNbRec() == -1)
	{
	    return getSqlMap().queryForList("atmInterfaceMapper.returnFieldsList", criteria);
	}
	else
	{
	    return getSqlMap().queryForList("atmInterfaceMapper.returnFieldsList", criteria, criteria.getRecToskip(),
		    criteria.getNbRec());
	}
    }

    @Override
    public int returnFieldsListCount(AtmInterfaceSC criteria) throws DAOException
    {
	DAOHelper.fixGridMaps(criteria, getSqlMap(), "atmInterfaceMapper.fieldsMap");
	return ((Integer) getSqlMap().queryForObject("atmInterfaceMapper.returnFieldsListCount", criteria)).intValue();
    }

    @Override
    public AtmInterfaceCO returnInterfaceById(AtmInterfaceSC criteria) throws DAOException
    {
	return (AtmInterfaceCO) getSqlMap().queryForObject("atmInterfaceMapper.returnInterfaceByCode", criteria);
    }

    @Override
    public int returnProgOrder() throws DAOException
    {
	return ((Integer) getSqlMap().queryForObject("atmInterfaceMapper.returnProgOrder", null));
    }

    @Override
    public List returnIsoSubFieldsList(AtmInterfaceSC criteria) throws DAOException
    {
	DAOHelper.fixGridMaps(criteria, getSqlMap(), "atmInterfaceMapper.isoSubFieldsMap");
	
	if(criteria.getSortOrder() == null)
	{
	    criteria.setSortOrder(" ORDER BY ATM_ISO_SUB_FLDS_CODE ASC");
	}
	
	if(criteria.getNbRec() == -1)
	{
	    return getSqlMap().queryForList("atmInterfaceMapper.returnIsoSubFieldsList", criteria);
	}
	else
	{
	    return getSqlMap().queryForList("atmInterfaceMapper.returnIsoSubFieldsList", criteria, criteria.getRecToskip(),
		    criteria.getNbRec());
	}
    }

    @Override
    public int returnIsoSubFieldsListCount(AtmInterfaceSC criteria) throws DAOException
    {
	DAOHelper.fixGridMaps(criteria, getSqlMap(), "atmInterfaceMapper.isoSubFieldsMap");
	return ((Integer) getSqlMap().queryForObject("atmInterfaceMapper.returnIsoSubFieldsListCount", criteria))
		.intValue();
    }

    @Override
    public List returnFieldListByBitmap(AtmInterfaceSC criteria) throws DAOException
    {
	return getSqlMap().queryForList("atmInterfaceMapper.returnFieldListByBitmap", criteria);
    }

    @Override
    public Integer saveGTW_ATM_INTERFACESVO(GTW_ATM_INTERFACESVO atm_INTERFACESVO) throws DAOException
    {
	return (Integer) getSqlMap().insert("atmInterfaceMapper.insertGTW_ATM_INTERFACES", atm_INTERFACESVO);
    }

    @Override
    public Integer saveGTW_ATM_INT_ISO_FLDSVO(GTW_ATM_INT_ISO_FLDSVO gtw_ATM_INT_ISO_FLDSVO) throws DAOException
    {
	return (Integer) getSqlMap().insert("atmInterfaceMapper.insertGTW_ATM_INT_ISO_FLDS", gtw_ATM_INT_ISO_FLDSVO);
    }

    @Override
    public Integer saveGTW_ATM_INT_ISO_SUB_FLDSVO(GTW_ATM_INT_ISO_SUB_FLDSVO gtw_ATM_INT_ISO_SUB_FLDSVO)
	    throws DAOException
    {
	return (Integer) getSqlMap().insert("atmInterfaceMapper.insertGTW_ATM_INT_ISO_SUB_FLDS",
		gtw_ATM_INT_ISO_SUB_FLDSVO);
    }

    @Override
    public Integer saveGTW_ATM_INT_ISO_MSGSVO(GTW_ATM_INT_ISO_MSGSVO gtw_ATM_INT_ISO_MSGSVO) throws DAOException
    {
	return (Integer) getSqlMap().insert("atmInterfaceMapper.insertGTW_ATM_INT_ISO_MSGS", gtw_ATM_INT_ISO_MSGSVO);
    }
}
