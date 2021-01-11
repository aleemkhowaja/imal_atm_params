package com.path.atm.dao.importexport.impl;

import java.math.BigDecimal;
import java.util.List;

import com.path.atm.dao.importexport.AtmImportExportDAO;
import com.path.atm.vo.atminterface.AtmInterfaceSC;
import com.path.atm.vo.atminterface.exporter.AtmIsoResponseMapCO;
import com.path.atm.vo.atminterface.exporter.ChannelCO;
import com.path.atm.vo.atminterface.exporter.ChannelISOIntParamsCO;
import com.path.atm.vo.isomessagesdefinition.ISOMessagesDefinitionSC;
import com.path.dbmaps.vo.COMMON_PWS_MAPPINGVO;
import com.path.dbmaps.vo.COMMON_PWS_MAPPING_DEFVO;
import com.path.dbmaps.vo.COMMON_PWS_MAPPING_DETAILSVO;
import com.path.lib.common.base.BaseDAO;
import com.path.lib.common.exception.DAOException;
import com.path.vo.ws.CommonPwsMappingCO;

/**
 * 
 * Copyright 2020, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: Alim Khowaja
 *
 * importExportInterfaceDAOImpl.java used to import export data
 */
public class AtmImportExportDAOImpl extends BaseDAO implements AtmImportExportDAO
{

    @Override
    public List<ChannelCO> returnChannelDetailsForExport(AtmInterfaceSC criteria) throws DAOException
    {
	return getSqlMap().queryForList("importExportAtmInterfaceMapper.returnChannelDetailsForExport", criteria);
    }

    @Override
    public Integer saveGTW_CHANNEL(ChannelCO channelCO) throws DAOException
    {
	return (Integer) getSqlMap().insert("importExportAtmInterfaceMapper.insertGTW_CHANNEL", channelCO);
    }

    @Override
    public Integer saveGTW_CHANNELIntParams(ChannelISOIntParamsCO isoIntParamsCO) throws DAOException
    {
	return (Integer) getSqlMap().insert("importExportAtmInterfaceMapper.insertGTW_CHANNEL_ISO_INT_PARAMS",
		isoIntParamsCO);
    }

    @Override
    public List<CommonPwsMappingCO> returnPWSMappingDetailsForExport(ISOMessagesDefinitionSC definitionSC) throws DAOException
    {
	return getSqlMap().queryForList("importExportAtmInterfaceMapper.returnPWSMappingDetailsForExport", definitionSC);
    }
    
    @Override
    public Integer insertCOMMON_PWS_MAPPING_DEF(COMMON_PWS_MAPPING_DEFVO mapping_DEFVO) throws DAOException
    {
	return (Integer) getSqlMap().insert("importExportAtmInterfaceMapper.insertCOMMON_PWS_MAPPING_DEF", mapping_DEFVO);
    }
    
    @Override
    public Integer insertCOMMON_PWS_MAPPING(COMMON_PWS_MAPPINGVO mappingvo) throws DAOException
    {
	return (Integer) getSqlMap().insert("importExportAtmInterfaceMapper.insertCOMMON_PWS_MAPPING", mappingvo);
    }
    
    @Override
    public Integer insertCOMMON_PWS_MAPPING_DETAILS(COMMON_PWS_MAPPING_DETAILSVO pws_MAPPING_DETAILSVO) throws DAOException
    {
	return (Integer) getSqlMap().insert("importExportAtmInterfaceMapper.insertCOMMON_PWS_MAPPING_DETAILS", pws_MAPPING_DETAILSVO);
    }
    
    @Override
    public BigDecimal returnMaxMappingID() throws DAOException
    {
	BigDecimal maxMappingId = ((BigDecimal) getSqlMap().
    		queryForObject("importExportAtmInterfaceMapper.returnMaxMappingID", null));
    	
    	if(maxMappingId == null )
    		maxMappingId = BigDecimal.valueOf(300000);
    	
    	return maxMappingId;
    }

    @Override
    public List<AtmIsoResponseMapCO> returnIsoResponseMappingList(AtmInterfaceSC atmInterfaceSC) throws DAOException
    {
	return getSqlMap().queryForList("importExportAtmInterfaceMapper.returnIsoResponseMappingList", atmInterfaceSC);
    }

    @Override
    public Integer insertIsoResponseMapping(AtmIsoResponseMapCO atmIsoResponseMapCO) throws DAOException
    {
	return (Integer) getSqlMap().insert("importExportAtmInterfaceMapper.insertIsoResponseMapping", atmIsoResponseMapCO);
    }
    
}