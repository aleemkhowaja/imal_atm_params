package com.path.atm.bo.importexport.impl;

import java.io.File;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.struts2.json.JSONException;

import com.path.atm.bo.acquirer.AcquirerBO;
import com.path.atm.bo.atminterface.AtmInterfaceBO;
import com.path.atm.bo.common.ATMCommonConstants;
import com.path.atm.bo.common.ATMCommonUtil;
import com.path.atm.bo.importexport.AtmImportExportBO;
import com.path.atm.bo.isomessagesdefinition.ISOMessagesDefinitionBO;
import com.path.atm.bo.merchantmgnt.MerchantMgntBO;
import com.path.atm.bo.terminal.TerminalBO;
import com.path.atm.dao.importexport.AtmImportExportDAO;
import com.path.atm.dbmaps.vo.GTW_ATM_ACQUIRER_TRX_TYPEVO;
import com.path.atm.dbmaps.vo.GTW_ATM_INT_ISO_MSGSVO;
import com.path.atm.dbmaps.vo.GTW_ATM_INT_ISO_SUB_FLDSVO;
import com.path.atm.vo.acquirer.AcquirerCO;
import com.path.atm.vo.acquirer.AcquirerSC;
import com.path.atm.vo.atminterface.AtmInterfaceCO;
import com.path.atm.vo.atminterface.AtmInterfaceSC;
import com.path.atm.vo.atminterface.exporter.AtmIsoResponseMapCO;
import com.path.atm.vo.atminterface.exporter.ChannelCO;
import com.path.atm.vo.isomessagesdefinition.ISOMessagesDefinitionCO;
import com.path.atm.vo.isomessagesdefinition.ISOMessagesDefinitionSC;
import com.path.atm.vo.merchantmgnt.MerchantMgntCO;
import com.path.atm.vo.terminal.TerminalCO;
import com.path.atm.vo.terminal.TerminalSC;
import com.path.bo.common.MessageCodes;
import com.path.bo.common.audit.AuditConstant;
import com.path.dbmaps.vo.COMMON_PWS_MAPPING_DEFVO;
import com.path.dbmaps.vo.COMMON_PWS_MAPPING_DETAILSVO;
import com.path.lib.common.base.BaseBO;
import com.path.lib.common.exception.BOException;
import com.path.lib.common.exception.BaseException;
import com.path.lib.common.exception.DAOException;
import com.path.lib.common.util.NumberUtil;
import com.path.lib.common.util.StringUtil;
import com.path.vo.ws.CommonPwsMappingCO;

/**
 * 
 * Copyright 2020, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: Alim Khowaja
 *
 * AtmImportExportBOImpl.java used to Import Export functionality
 */
public class AtmImportExportBOImpl extends BaseBO implements AtmImportExportBO
{
    private AtmInterfaceBO atmInterfaceBO;
    
    private AcquirerBO acquirerBO;
    
    private ISOMessagesDefinitionBO isoMessagesDefinitionBO;
    
    private AtmImportExportDAO  atmImportExporteDAO;
    
    private TerminalBO terminalBO;  
    
    private MerchantMgntBO merchantMgntBO;

   
    @Override
    public byte[] exportAtmInterface(AtmInterfaceSC criteria) throws BaseException {

	/**
	 * Export Atm Interface
	 */
	AtmInterfaceCO atmInterfaceCO = exportAtmInterfaceDetails(criteria);
	
	/**
	 * Export ISO Response Mapping
	 */
	exportIsoResponseMappings(criteria, atmInterfaceCO);
	
	/**
	 * Export Acquirer Details
	 */
	exportAcquirerDetails(criteria, atmInterfaceCO);
	
	/**
	 * Export ISO Message Definition
	 */
	exportISOMessageDefinition(criteria, atmInterfaceCO);
	
	/**
	 * Convert CO to return JSON
	 */
	return ATMCommonUtil.returnDownloadFileByte(atmInterfaceCO, ATMCommonConstants.INTERFACE_FILE_NAME);
    }
    
    /**
     * Export ISO Response Mapping
     * @param criteria
     * @param atmInterfaceCO
     * @throws DAOException
     */
    private void exportIsoResponseMappings(AtmInterfaceSC criteria, AtmInterfaceCO atmInterfaceCO) throws DAOException
    {
	/**
	 * Return ISO Response Map
	 */
	List<AtmIsoResponseMapCO> atmIsoResponseMapCOs = atmImportExporteDAO.returnIsoResponseMappingList(criteria);
	atmInterfaceCO.setAtmIsoResponseMapCOs(atmIsoResponseMapCOs);
    }

    /**
     * Export ISO Message Definition Details
     * @param criteria
     * @param atmInterfaceCO
     * @throws BaseException 
     * @throws JSONException 
     */
    private void exportISOMessageDefinition(AtmInterfaceSC criteria, AtmInterfaceCO atmInterfaceCO) throws BaseException
    {
	/**
	 * return ISO Message Definition by Interface Code
	 */
	ISOMessagesDefinitionSC isoMessagesDefinitionSC = new ISOMessagesDefinitionSC();
	isoMessagesDefinitionSC.setCompCode(criteria.getCompCode());
	isoMessagesDefinitionSC.setInterfaceId(criteria.getInterfaceId());
	isoMessagesDefinitionSC.setNbRec(-1);
	List<ISOMessagesDefinitionCO> isoMessageDefinitionCOs =  isoMessagesDefinitionBO.returnISOMessagesDefinitionList(isoMessagesDefinitionSC);
	
	/**
	 * Add Message Definition CO inside hashmap
	 */
	HashMap<BigDecimal,ISOMessagesDefinitionCO> msgDefMappingMap = new HashMap();
	HashMap<BigDecimal,ISOMessagesDefinitionCO> msgDefMap = new HashMap();
	
	for(ISOMessagesDefinitionCO messagesDefinitionCO : isoMessageDefinitionCOs)
	{
	    //add ISO Message Definition Object in map with ISOMsgDefId
	    msgDefMap.put(messagesDefinitionCO.getGtw_ATM_ISO_MSG_DEF().getISO_MSG_DEF_ID(), messagesDefinitionCO);
	    
	    // the hashMap will contain definition with mapping id
	    if(NumberUtil.isEmptyDecimal(messagesDefinitionCO.getGtw_ATM_ISO_MSG_DEF().getMAPPING_ID())) {
		continue;
	    }
	  //add ISO Message Definition Object in map with Mapping Id
	    msgDefMappingMap.put(messagesDefinitionCO.getGtw_ATM_ISO_MSG_DEF().getMAPPING_ID(), messagesDefinitionCO);
	}
	
	/**
	 * return PWS Mapping by mapping id
	 */
	if(!msgDefMappingMap.isEmpty() && msgDefMappingMap.size() > 0)
	{
	    /**
	     * return PWS Mapping and its Details
	     */
	    List<CommonPwsMappingCO> commonPWSMappingCOs = atmImportExporteDAO.returnPWSMappingDetailsForExport(isoMessagesDefinitionSC);
	    
	    for(CommonPwsMappingCO commonPWSMappingCO : commonPWSMappingCOs)
	    {
		if(null != commonPWSMappingCO && null != commonPWSMappingCO.getDefinitionVO())
		{
		    ISOMessagesDefinitionCO messagesDefinitionCO = msgDefMappingMap.get(commonPWSMappingCO.getDefinitionVO().getMAPPING_ID());
		    if(null != messagesDefinitionCO)
		    {
			messagesDefinitionCO.setCommonPWSMappingCO(commonPWSMappingCO);
		    }
		}
	    }
	    
	    /**
	     * return ISO Message Definition Network Message Fields
	     */
	    ISOMessagesDefinitionCO isoMessagesDefinitionCO = new  ISOMessagesDefinitionCO();
	    isoMessagesDefinitionCO.setInterfaceId(criteria.getInterfaceId());
	    List<ISOMessagesDefinitionCO> isoMessagesDefNetFldsCOs =  isoMessagesDefinitionBO.returnIsoMessagesDefNetFldsList(isoMessagesDefinitionCO);
	    
	    /**
	     * Process Request Fields
	     */
	    List<ISOMessagesDefinitionCO> requestIsoMessagesDefNetFldsCOs = isoMessagesDefinitionCO.getRequestIsoNetMsgFLDS();
	    for(ISOMessagesDefinitionCO messagesDefNetFldsCO : requestIsoMessagesDefNetFldsCOs)
	    {
		if(null != messagesDefNetFldsCO && null != messagesDefNetFldsCO.getNet_MSG_FLDSVO())
		{
		    ISOMessagesDefinitionCO messagesDefinitionCO = msgDefMap.get(messagesDefNetFldsCO.getNet_MSG_FLDSVO().getISO_MSG_DEF_ID());
		    if(null != messagesDefinitionCO)
		    {
			messagesDefinitionCO.getRequestIsoNetMsgFLDS().add(messagesDefNetFldsCO);
		    }
		}
	    }
	    
	    /**
	     * Process Response Fields
	     */
	    List<ISOMessagesDefinitionCO> responseIsoMessagesDefNetFldsCOs  = isoMessagesDefinitionCO.getResponseIsoNetMsgFLDS();
	    for(ISOMessagesDefinitionCO messagesDefNetFldsCO : responseIsoMessagesDefNetFldsCOs)
	    {
		if(null != messagesDefNetFldsCO && null != messagesDefNetFldsCO.getNet_MSG_FLDSVO())
		{
		    ISOMessagesDefinitionCO messagesDefinitionCO = msgDefMap.get(messagesDefNetFldsCO.getNet_MSG_FLDSVO().getISO_MSG_DEF_ID());
		    if(null != messagesDefinitionCO)
		    {
			messagesDefinitionCO.getResponseIsoNetMsgFLDS().add(messagesDefNetFldsCO);
		    }
		}
	    }
	}
	
	 /**
	  * Add Msg Defintion Hashmap values to ISO Message Definition COs
	  */
	 atmInterfaceCO.setIsoMessageDefinitionCOs(isoMessageDefinitionCOs);
    }

    /**
     * Export Acquirer Details
     * @param criteria
     * @param atmInterfaceCO
     * @throws BaseException 
     */
    private void exportAcquirerDetails(AtmInterfaceSC criteria, AtmInterfaceCO atmInterfaceCO) throws BaseException
    {
	/**
	 * return Acquirer/Terminal/Trx Types by Interface Code
	 */
	AcquirerSC acquirerSC = new AcquirerSC();
	acquirerSC.setNbRec(-1);
	acquirerSC.setCompCode(criteria.getCompCode());
	acquirerSC.setInterfaceCode(criteria.getInterfaceId());
	List<AcquirerCO> acquirerCOs =  acquirerBO.returnAcquirerList(acquirerSC);
	
	
	/**
	 * Create a temp hashmap to allow the direct access
	 */
	HashMap<BigDecimal,AcquirerCO> temphM = new HashMap();
	
	for(AcquirerCO acquirerCO : acquirerCOs){   	
	    temphM.put(acquirerCO.getGtw_ATM_ACQUIRER().getACQUIRER_ID(), acquirerCO);
	}
	
	/**
	 * Retrieve Trx types based on interface code
	 * and populate it under the appropriate acq o
	 */
	List<GTW_ATM_ACQUIRER_TRX_TYPEVO> acquirerTrxList =  acquirerBO.returnAcquirerTransactionsList(acquirerSC);
	for(GTW_ATM_ACQUIRER_TRX_TYPEVO trx_TYPEVO : acquirerTrxList)
	{
	    /**
	     * get AcquirerCO from hashmap based on trx type acquirer id
	     */
	    AcquirerCO acquirerCO = temphM.get(trx_TYPEVO.getACQUIRER_ID());
	    if(acquirerCO != null)
	    {
		acquirerCO.getTrxTypeVOs().add(trx_TYPEVO);
	    }
	}
	
	
	/**
	 * retrieve All Terminals
	 */
	TerminalSC terminalSC  = new TerminalSC();
	terminalSC.setNbRec(-1);
	terminalSC.setCompCode(criteria.getCompCode());
	terminalSC.setInterfaceCode(criteria.getInterfaceId());
	List<TerminalCO> terminalCOs =  terminalBO.returnTerminalList(terminalSC);
	
	for(TerminalCO terminal : terminalCOs)
	{
	    /**
	     * get AcquirerCO from hashmap based on terminal acquirer id
	     */
	    AcquirerCO acquirerCO = temphM.get(terminal.getGtw_ATM_TERMINALVO().getACQUIRER_ID());
	    if(acquirerCO != null)
	    {
		acquirerCO.getTerminalCOs().add(terminal);
	    }
	}
	/**
	 * Converting Hashmap value to List
	 */
	List<AcquirerCO> acquirers = new ArrayList<AcquirerCO>(temphM.values());
	
	/**
	 * Adding Acquire list in interface
	 */
	atmInterfaceCO.setAcquirerCOs(acquirers);
    }

    /**
     * Export Atm Interface
     * @param criteria
     * @return
     * @throws BaseException 
     */
    private AtmInterfaceCO exportAtmInterfaceDetails(AtmInterfaceSC criteria) throws BaseException
    {
	/**
	 * return interface Details by Interface Code.
	 * Set Null values which don't required for exporting
	 */
	AtmInterfaceCO atmInterfaceCO =  (AtmInterfaceCO) atmInterfaceBO.returnInterfaceById(criteria);
	
	/**
	 * set null values in optional fields like date
	 */
	atmInterfaceCO.getIso_INTERFACESVO().setAPPROVED_BY(null);
	atmInterfaceCO.getIso_INTERFACESVO().setAPPROVED_DATE(null);
	atmInterfaceCO.getIso_INTERFACESVO().setCREATED_BY(null);
	atmInterfaceCO.getIso_INTERFACESVO().setCREATED_DATE(null);
	atmInterfaceCO.getIso_INTERFACESVO().setCURRENT_DATE(null);
	atmInterfaceCO.getIso_INTERFACESVO().setMODIFIED_BY(null);
	atmInterfaceCO.getIso_INTERFACESVO().setMODIFIED_DATE(null);
	atmInterfaceCO.getIso_INTERFACESVO().setDELETED_BY(null);
	atmInterfaceCO.getIso_INTERFACESVO().setDELETED_DATE(null);
	atmInterfaceCO.getIso_INTERFACESVO().setREACTIVATED_BY(null);
	atmInterfaceCO.getIso_INTERFACESVO().setREACTIVATED_DATE(null);
	atmInterfaceCO.getIso_INTERFACESVO().setSUSPENDED_BY(null);
	atmInterfaceCO.getIso_INTERFACESVO().setSUSPENDED_DATE(null);
	atmInterfaceCO.getIso_INTERFACESVO().setINTERFACE_CODE(null);
	
	/**
	 * return ISO Fields and its sub fields by Interface Code
	 * set true in withSubFields parameters after this true main fields will retrieve with sub fields
	 */
	criteria.setWithSubFields(null);
	criteria.setNbRec(-1);
	List<AtmInterfaceCO> isoFields = atmInterfaceBO.returnFieldsList(criteria);
	
	HashMap<BigDecimal,AtmInterfaceCO> temphM = new HashMap<BigDecimal,AtmInterfaceCO>();
	
	for(AtmInterfaceCO interfaceCO : isoFields)
	{
	    /**
	     * clear the sub fields it will added later after retrieve sub fields by interface
	     * Since Collection is add one record with null primary key
	     */
	    interfaceCO.getIso_SUB_FLDSVOs().clear();
	    
	    temphM.put(interfaceCO.getIso_INT_FLDSVO().getATM_ISO_FLDS_CODE(), interfaceCO);
	}
	
	/**
	 * return ISO SUb Fields
	 */
	AtmInterfaceSC sc = new AtmInterfaceSC();
	sc.setInterfaceId(criteria.getInterfaceId());
	sc.setNbRec(-1);
	List<AtmInterfaceCO> isoSubFields = atmInterfaceBO.returnIsoSubFieldsList(sc);
	for(AtmInterfaceCO isoSubFieldCo : isoSubFields)
	{
	    /**
	     * get AtmInterfaceCo from hashmap based on IsoFieldId
	     */
	    AtmInterfaceCO interfaceCO = temphM.get(isoSubFieldCo.getSub_FLDSVO().getATM_ISO_FLDS_CODE());
	    if(interfaceCO != null)
	    {
		interfaceCO.getIso_SUB_FLDSVOs().add(isoSubFieldCo.getSub_FLDSVO());
	    }
	}
	atmInterfaceCO.setIsoFields(isoFields);
	
	
	/**
	 * return ISO Message Details by Interface Code
	 */
	AtmInterfaceSC atmInterfaceSC = new AtmInterfaceSC();
	atmInterfaceSC.setInterfaceId(criteria.getInterfaceId());
	atmInterfaceSC.setNbRec(-1);
	List<AtmInterfaceCO> isoMsgs = atmInterfaceBO.returnMessageList(atmInterfaceSC);
	atmInterfaceCO.setIsoMsgs(isoMsgs);
	
	
	/**
	 * return Channel Details by Interface Code
	 */
	List<ChannelCO> channelCOs = atmImportExporteDAO.returnChannelDetailsForExport(atmInterfaceSC);
	atmInterfaceCO.setChannelCOs(channelCOs);
	
	
	return atmInterfaceCO;
    }
    
    @Override
    public void importAtmInterface(AtmInterfaceCO oldAtmInterfaceCO,  AtmInterfaceSC criteria, File importedFile)
		throws BaseException {
	
	/**
	 * Convert Imported file to CO
	 */
	AtmInterfaceCO atmInterfaceCO  = 
			(AtmInterfaceCO) 
				ATMCommonUtil.convertImportedFileToObject(importedFile, ATMCommonConstants.INTERFACE_FILE_NAME, 
					AtmInterfaceCO.class);
	if(atmInterfaceCO == null)
	    throw new BOException(MessageCodes.NO_RECORDS_FOUND);

	/**
	 * Set Audit Ref CO
	 */
	atmInterfaceCO.setAuditRefCO(oldAtmInterfaceCO.getAuditRefCO());
	
	/**
	 * set extra required parameter
	 */
	atmInterfaceCO.setUserId(criteria.getUserId());
	atmInterfaceCO.setRunningDate(criteria.getRunningDate());
	atmInterfaceCO.setCompCode(criteria.getCompCode());
	atmInterfaceCO.getIso_INTERFACESVO().setSTATUS(ATMCommonConstants.STATUS_ACTIVE);

	/**
	 * Add MTI List/ ISO Fields/ ISO sub Fields in interfaceCO
	 */
	atmInterfaceCO.getGridsDataMap().put("subFieldGrid", extractIsoSubFieldsList(atmInterfaceCO));
	atmInterfaceCO.getGridsDataMap().put("fieldAdd", atmInterfaceCO.getIsoFields());
	atmInterfaceCO.getGridsDataMap().put("messageAdd", atmInterfaceCO.getIsoMsgs());

	//save Interface and its details
	atmInterfaceBO.saveUpdateATMInterface(atmInterfaceCO);
	
	// import Response Mapping
	importIsoResponseMapping(atmInterfaceCO);
	
	//add new iso Msg Fields with old iso Msg Fields
	prepareISOMsgIdMapping(atmInterfaceCO);

	// import acquirers
	importAcquirers(atmInterfaceCO);
	    
	// import ISO Message Defintion    
	importISOMsgDefinition(atmInterfaceCO); 
	    
	//import Channel Details
	importChannelDetails(atmInterfaceCO);
    }

    /**
     * Import ISO Response 
     * @param atmInterfaceCO
     */
    private void importIsoResponseMapping(AtmInterfaceCO atmInterfaceCO) throws BaseException
    {
	/**
	 * Save ISO Response Mappings
	 */
	for(AtmIsoResponseMapCO atmIsoResponseMapCO : atmInterfaceCO.getAtmIsoResponseMapCOs())
	{
	    atmIsoResponseMapCO.setInterfaceCode(atmInterfaceCO.getIso_INTERFACESVO().getINTERFACE_CODE());
	    atmImportExporteDAO.insertIsoResponseMapping(atmIsoResponseMapCO);
	}
	
    }

    /**
     * Mapping Old ISO Msg ids to new ids
     * @param atmInterfaceCO
     */
    private void prepareISOMsgIdMapping(AtmInterfaceCO atmInterfaceCO)
    {
	Map<BigDecimal, BigDecimal> isoMsgFieldMap = new HashMap<BigDecimal, BigDecimal>();

	List messageListAdd = (ArrayList<AtmInterfaceCO>) atmInterfaceCO.getGridsDataMap().get("messageAdd");

	if(messageListAdd != null && !messageListAdd.isEmpty())
	{
	    for(int i = 0; i < messageListAdd.size(); i++)
	    {
		AtmInterfaceCO co = (AtmInterfaceCO) messageListAdd.get(i);
		GTW_ATM_INT_ISO_MSGSVO msgsvo = co.getIso_INT_MSGSVO();
		isoMsgFieldMap.put(co.getOldISOMsgId(), msgsvo.getATM_ISO_MSGS_CODE());
	    }
	    atmInterfaceCO.setIsoMsgFieldMap(isoMsgFieldMap);
	}
    }

    /**
     * Import and save the Channel Details
     * @param atmInterfaceCO
     */
    private void importChannelDetails(AtmInterfaceCO atmInterfaceCO) throws BaseException
    {
	/**
	 * Save Channel and Channel Interface params Details
	 */
	for(ChannelCO channalCo : atmInterfaceCO.getChannelCOs())
	{
	    channalCo.setCHANNEL_ID(null);
	    channalCo.setINTERFACE_CODE(atmInterfaceCO.getIso_INTERFACESVO().getINTERFACE_CODE());
	    channalCo.setCREATED_BY(atmInterfaceCO.getUserId());
	    channalCo.setCREATED_DATE(atmInterfaceCO.getRunningDate());

	    /**
	     * Save Channel
	     */
	    atmImportExporteDAO.saveGTW_CHANNEL(channalCo);

	    /**
	     * Save Channel Interface Params
	     */
	    channalCo.getIsoIntParamsCO().setCHANNEL_ID(channalCo.getCHANNEL_ID());
	    atmImportExporteDAO.saveGTW_CHANNELIntParams(channalCo.getIsoIntParamsCO());
	}
    }

    /**
     * Import and save the ISO Message Definition Data
     * @param atmInterfaceCO
     * @throws Exception 
     */
    private void importISOMsgDefinition(AtmInterfaceCO atmInterfaceCO) throws BaseException
    {
	/**
	 * Save ISO Message Definition Data
	 */
	for(ISOMessagesDefinitionCO isoMsgDefCO : atmInterfaceCO.getIsoMessageDefinitionCOs())
	{
	    isoMsgDefCO.getGtw_ATM_ISO_MSG_DEF().setISO_MSG_DEF_ID(null);
	    isoMsgDefCO.getGtw_ATM_ISO_MSG_DEF()
		    .setINTERFACE_CODE(atmInterfaceCO.getIso_INTERFACESVO().getINTERFACE_CODE());

	    isoMsgDefCO.getGtw_ATM_ISO_MSG_DEF().setATM_ISO_MSGS_CODE(atmInterfaceCO.getIsoMsgFieldMap()
		    .get(isoMsgDefCO.getGtw_ATM_ISO_MSG_DEF().getATM_ISO_MSGS_CODE()));

	    isoMsgDefCO.setUserID(atmInterfaceCO.getUserId());
	    isoMsgDefCO.setRunningDate(atmInterfaceCO.getRunningDate());
	    isoMsgDefCO.setCompCode(atmInterfaceCO.getCompCode());

	    /**
	     * Set Audit key in AuditRefCO
	     */
	    atmInterfaceCO.getAuditRefCO().setKeyRef(AuditConstant.atmISOMessagesDefinitionKey);
	    atmInterfaceCO.getAuditRefCO().setProgRef(ATMCommonConstants.ISO_MSG_DEF_PROG_REF);
	    isoMsgDefCO.setAuditRefCO(atmInterfaceCO.getAuditRefCO());

	    // save PWS Mapping Details
	    BigDecimal mappingId = importPWSMappingDetails(isoMsgDefCO);

	    isoMsgDefCO.getGtw_ATM_ISO_MSG_DEF().setMAPPING_ID(mappingId);

	    /**
	     * Add Request and Response Network fields add in hashmap
	     */
	    isoMsgDefCO.getGridsDataMap().put("requestFields", isoMsgDefCO.getRequestIsoNetMsgFLDS());
	    isoMsgDefCO.getGridsDataMap().put("responseFields", isoMsgDefCO.getResponseIsoNetMsgFLDS());

	    // save ISO Message Definition
	    try
	    {
		isoMessagesDefinitionBO.save(isoMsgDefCO);
	    }
	    catch(Exception ex)
	    {
		log.error(ex, "Error while saving ISO Msg Defintions : " + ex);
	    }
	}
    }

    /**
     * Import and save the ISO Message Definition related Mapping Data
     * @param messagesDefinitionCO
     * @throws DAOException
     */
    private BigDecimal importPWSMappingDetails(ISOMessagesDefinitionCO messagesDefinitionCO) throws BaseException
    {
	
	/**
	 * Return Maximum Mapping Id
	 */
	BigDecimal  mappingId = atmImportExporteDAO.returnMaxMappingID();
	
	/**
	 * Save	 Common PWS Mapping
	 */
	CommonPwsMappingCO commonPWSMappingCO =  messagesDefinitionCO.getCommonPWSMappingCO();
	
	//Validating PWS Mapping Definition
	COMMON_PWS_MAPPING_DEFVO mapping_DEFVO =  commonPWSMappingCO.getDefinitionVO();
	if(null == mapping_DEFVO || StringUtil.isEmptyString(mapping_DEFVO.getMAP_DESCRIPTION())) return null;
		
	//validating PWS Mapping
	if(null == commonPWSMappingCO || null == commonPWSMappingCO.getMappingVO()  ||  StringUtil.isEmptyString(commonPWSMappingCO.getMappingVO().getWS_NAME())) return null;
	
	//validating the PWS Mapping Details
	List<COMMON_PWS_MAPPING_DETAILSVO> mapping_DETAILSVOs = commonPWSMappingCO.getListCommonPwsMappingDetailsVO();
	if(null == mapping_DETAILSVOs || mapping_DETAILSVOs.size() <=0)
	    return null;
	
	
	/**
	 * Save Common PWS Mapping Definiton
	 */
	mapping_DEFVO.setMAPPING_ID(mappingId);
	atmImportExporteDAO.insertCOMMON_PWS_MAPPING_DEF(mapping_DEFVO);
	
	/**
	 * Save Common PWS Mapping
	 */
	commonPWSMappingCO.getMappingVO().setMAPPING_ID(mappingId);
	commonPWSMappingCO.getMappingVO().setCREATED_BY(messagesDefinitionCO.getUserID());
	commonPWSMappingCO.getMappingVO().setCREATED_DATE(messagesDefinitionCO.getRunningDate());
	atmImportExporteDAO.insertCOMMON_PWS_MAPPING(commonPWSMappingCO.getMappingVO());
	
	
	/**
	 * Save COMMON PWS Mapping Details
	 */
	for(COMMON_PWS_MAPPING_DETAILSVO mapping_DETAILSVO : mapping_DETAILSVOs)
	{
	    mapping_DETAILSVO.setMAPPING_ID(mappingId);
	    mapping_DETAILSVO.setCREATED_BY(messagesDefinitionCO.getUserID());
	    mapping_DETAILSVO.setCREATED_DATE(messagesDefinitionCO.getRunningDate());
	    
	    atmImportExporteDAO.insertCOMMON_PWS_MAPPING_DETAILS(mapping_DETAILSVO);
	}
	
	return mappingId;
    }
    /**
     * Import and save the Acquirer Data
     * @param atmInterfaceCO
     * @throws BOException
     */
    private void importAcquirers(AtmInterfaceCO atmInterfaceCO) throws BaseException
    {
	/**
	 * Save Acquirer Details
	 */
	for(AcquirerCO acquirerCO : atmInterfaceCO.getAcquirerCOs())
	{
	    acquirerCO.getGtw_ATM_ACQUIRER().setACQUIRER_ID(null);
	    acquirerCO.getGtw_ATM_ACQUIRER()
		    .setINTERFACE_CODE(atmInterfaceCO.getIso_INTERFACESVO().getINTERFACE_CODE());
	    acquirerCO.setUserID(atmInterfaceCO.getUserId());
	    acquirerCO.setRunningDate(atmInterfaceCO.getRunningDate());
	    acquirerCO.setCompCode(atmInterfaceCO.getCompCode());

	    /**
	     * Set Audit key in AuditRefCO
	     */
	    atmInterfaceCO.getAuditRefCO().setKeyRef(AuditConstant.atmAcquirerKey);
	    atmInterfaceCO.getAuditRefCO().setProgRef(ATMCommonConstants.ACQUIRER_PROG_REF);
	    acquirerCO.setAuditRefCO(atmInterfaceCO.getAuditRefCO());

	    /**
	     * set Trx Types Data
	     */
	    acquirerCO.setAddGridList(acquirerCO.getTrxTypeVOs());

	    /**
	     * Save AcquirerCO
	     */
	    try
	    {
		acquirerCO = acquirerBO.save(acquirerCO);
	    }
	    catch(Exception ex)
	    {
		log.error(ex, "Error while saving Acquirers : " + ex);
	    }

	    /**
	     * Save Terminal
	     */
	    List<TerminalCO> atm_TERMINALVOs = acquirerCO.getTerminalCOs();

	    for(TerminalCO terminalCO : atm_TERMINALVOs)
	    {
		if(!NumberUtil.isEmptyDecimal(terminalCO.getGtw_ATM_TERMINALVO().getTERMINAL_ID()))
		{
		    
		    if(terminalCO.getGtw_ATM_MERCHANTVO() != null && (
			    StringUtil.isNotEmpty(terminalCO.getGtw_ATM_MERCHANTVO().getADDITIONAL_REFERENCE()) 
			    || StringUtil.isNotEmpty(terminalCO.getGtw_ATM_MERCHANTVO().getIBAN_ACC_NO())))
		    {
			MerchantMgntCO merchantMgntCO = new MerchantMgntCO();
			merchantMgntCO.setGtwAtmMerchantVO(terminalCO.getGtw_ATM_MERCHANTVO());

			merchantMgntCO.setUserId(atmInterfaceCO.getUserId());
			merchantMgntCO.setRunningDate(atmInterfaceCO.getRunningDate());
			merchantMgntCO.getGtwAtmMerchantVO().setCOMP_CODE(atmInterfaceCO.getCompCode());
			merchantMgntCO.setCompCode(atmInterfaceCO.getCompCode());
			
			// set audit
			atmInterfaceCO.getAuditRefCO().setKeyRef(AuditConstant.MERCHANT_DEFINITION_KEY_REF);
		    atmInterfaceCO.getAuditRefCO().setProgRef(ATMCommonConstants.MERCHANT_PROG_REF);
		    merchantMgntCO.setAuditRefCO(atmInterfaceCO.getAuditRefCO());
		    
			/**
			 * save Merchant
			 */
			this.merchantMgntBO.saveMerchantMgnt(merchantMgntCO);
			
			terminalCO.getGtw_ATM_TERMINALVO().setMERCHANT_CODE(merchantMgntCO.getGtwAtmMerchantVO().getMERCHANT_CODE());
		    }
		    else 
		    {
			terminalCO.getGtw_ATM_TERMINALVO().setMERCHANT_CODE(null);
		    }

		    terminalCO.getGtw_ATM_TERMINALVO().setTERMINAL_ID(null);
		    terminalCO.getGtw_ATM_TERMINALVO()
			    .setINTERFACE_CODE(atmInterfaceCO.getIso_INTERFACESVO().getINTERFACE_CODE());

		    terminalCO.setOldAcquirerId(acquirerCO.getGtw_ATM_ACQUIRER().getACQUIRER_ID());
		    terminalCO.getGtw_ATM_TERMINALVO()
			    .setACQUIRER_ID(acquirerCO.getGtw_ATM_ACQUIRER().getACQUIRER_ID());
		    terminalCO.setUserID(acquirerCO.getUserID());
		    terminalCO.setRunningDate(acquirerCO.getRunningDate());
		    terminalCO.setCompCode(acquirerCO.getCompCode());

		    atmInterfaceCO.getAuditRefCO().setKeyRef(AuditConstant.atmTerminalKey);
		    atmInterfaceCO.getAuditRefCO().setProgRef(ATMCommonConstants.TERMINAL_PROG_REF);
		    terminalCO.setAuditRefCO(atmInterfaceCO.getAuditRefCO());
		    /**
		     * save imported Terminals
		     */
		    terminalBO.save(terminalCO);
		}
	    }

	}
    }

    /**
     * extract Sub Fields List from Interface CO
     * @param atmInterfaceCO
     * @return
     */
    private List<AtmInterfaceCO> extractIsoSubFieldsList(AtmInterfaceCO atmInterfaceCO)
    {
	List<AtmInterfaceCO> atmInterfaceCOs = new ArrayList<AtmInterfaceCO>();

	/**
	 * set ISO Fields list in map and Save Imported Interface Records
	 * retrieve all iso fields and its sub fields then added in hashmap
	 * according to already save method's requirement
	 */
	if(null == atmInterfaceCO.getIsoFields() || atmInterfaceCO.getIsoFields().size() <= 0)
	    return atmInterfaceCOs;

	for(AtmInterfaceCO interfaceCO : atmInterfaceCO.getIsoFields())
	{
	    for(GTW_ATM_INT_ISO_SUB_FLDSVO sub_FLDSVO : interfaceCO.getIso_SUB_FLDSVOs())
	    {
		AtmInterfaceCO co = new AtmInterfaceCO();
		sub_FLDSVO.setATM_ISO_FLDS_CODE(null);
		sub_FLDSVO.setATM_ISO_SUB_FLDS_CODE(null);
		co.setSub_FLDSVO(sub_FLDSVO);
		atmInterfaceCOs.add(co);
	    }
	    interfaceCO.getIso_INT_FLDSVO().setATM_ISO_FLDS_CODE(null);
	}
	return atmInterfaceCOs;
    }
    
    public void setAtmInterfaceBO(AtmInterfaceBO atmInterfaceBO)
    {
        this.atmInterfaceBO = atmInterfaceBO;
    }

    public void setAcquirerBO(AcquirerBO acquirerBO)
    {
        this.acquirerBO = acquirerBO;
    }

    public void setIsoMessagesDefinitionBO(ISOMessagesDefinitionBO isoMessagesDefinitionBO)
    {
        this.isoMessagesDefinitionBO = isoMessagesDefinitionBO;
    }
    
    public void setAtmImportExporteDAO(AtmImportExportDAO atmImportExporteDAO)
    {
        this.atmImportExporteDAO = atmImportExporteDAO;
    }

    public void setTerminalBO(TerminalBO terminalBO)
    {
        this.terminalBO = terminalBO;
    }

    public void setMerchantMgntBO(MerchantMgntBO merchantMgntBO)
    {
        this.merchantMgntBO = merchantMgntBO;
    }
    
}