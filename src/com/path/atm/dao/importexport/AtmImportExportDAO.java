package com.path.atm.dao.importexport;

import java.math.BigDecimal;
import java.util.List;

import com.path.atm.vo.atminterface.AtmInterfaceSC;
import com.path.atm.vo.atminterface.exporter.AtmIsoResponseMapCO;
import com.path.atm.vo.atminterface.exporter.ChannelCO;
import com.path.atm.vo.atminterface.exporter.ChannelISOIntParamsCO;
import com.path.atm.vo.isomessagesdefinition.ISOMessagesDefinitionSC;
import com.path.dbmaps.vo.COMMON_PWS_MAPPINGVO;
import com.path.dbmaps.vo.COMMON_PWS_MAPPING_DEFVO;
import com.path.dbmaps.vo.COMMON_PWS_MAPPING_DETAILSVO;
import com.path.lib.common.exception.DAOException;
import com.path.vo.ws.CommonPwsMappingCO;

/**
 * 
 * Copyright 2020, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: Alim Khowaja
 *
 * ImportExportInterfaceDAO.java used to import export DAO
 */
public interface AtmImportExportDAO
{
	/**
	 * return Channel Details
	 * @param criteria
	 * @return
	 * @throws DAOException
	 */
	public List<ChannelCO> returnChannelDetailsForExport(AtmInterfaceSC criteria) throws DAOException;
	
	/**
	 * Save Channel and Channel Details from imported file
	 * @param channelCO
	 * @return
	 * @throws DAOException
	 */
	public Integer saveGTW_CHANNEL(ChannelCO channelCO) throws DAOException;
	
	/**
	 * Save Channel interface Parameters
	 * @param isoIntParamsCO
	 * @return
	 * @throws DAOException
	 */
	public Integer saveGTW_CHANNELIntParams(ChannelISOIntParamsCO isoIntParamsCO) throws DAOException;
	
	/**
	 * return PWs Mapping Details for Export
	 * @param definitionSC
	 * @return
	 * @throws DAOException
	 */
	public List<CommonPwsMappingCO> returnPWSMappingDetailsForExport(ISOMessagesDefinitionSC definitionSC) throws DAOException;
	
	/**
	 * return Maximum Mapping ID
	 * @return
	 * @throws DAOException
	 */
	public BigDecimal returnMaxMappingID() throws DAOException;
	
	/**
	 * Save Common PWS Mapping Def
	 * @param mapping_DEFVO
	 * @return
	 * @throws DAOException
	 */
	public Integer insertCOMMON_PWS_MAPPING_DEF(COMMON_PWS_MAPPING_DEFVO mapping_DEFVO) throws DAOException;
	    
	/**
	 * Save Common PWS Mapping
	 * @param mappingvo
	 * @return
	 * @throws DAOException
	 */
	public Integer insertCOMMON_PWS_MAPPING(COMMON_PWS_MAPPINGVO mappingvo) throws DAOException;

	/**
	 * Save Common PWS Mapping Details
	 * @param pws_MAPPING_DETAILSVO
	 * @return
	 * @throws DAOException
	 */
	public Integer insertCOMMON_PWS_MAPPING_DETAILS(COMMON_PWS_MAPPING_DETAILSVO pws_MAPPING_DETAILSVO) throws DAOException;
	
	/**
	 * return ISO response Mapping List
	 * @param atmInterfaceSC
	 * @return
	 * @throws DAOException
	 */
	public List<AtmIsoResponseMapCO> returnIsoResponseMappingList(AtmInterfaceSC atmInterfaceSC) throws DAOException;
	
	/**
	 * save ISO Response Mapping
	 * @param atmIsoResponseMapCO
	 * @return
	 * @throws DAOException
	 */
	public Integer insertIsoResponseMapping(AtmIsoResponseMapCO atmIsoResponseMapCO ) throws DAOException;
}
