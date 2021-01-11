package com.path.atm.bo.atmenginecontrol.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import org.codehaus.jackson.map.ObjectMapper;
import com.path.atm.bo.atmenginecontrol.ATMEngineControlBO;
import com.path.atm.bo.common.ATMCommonConstants;
import com.path.atm.bo.common.ATMCommonUtil;
import com.path.atm.bo.isomessageparsing.ISOMessageParseBO;
import com.path.atm.dao.atmenginecontrol.ATMEngineControlDAO;
import com.path.atm.vo.atmenginecontrol.ATMEngineControlCO;
import com.path.atm.vo.atmenginecontrol.ATMEngineControlSC;
import com.path.atm.vo.isomessageparsing.ISOMessageParseCO;
import com.path.bo.common.MessageCodes;
import com.path.dbmaps.vo.ATM_ENG_INTERFACEVO;
import com.path.lib.common.base.BaseBO;
import com.path.lib.common.exception.BOException;
import com.path.lib.common.exception.BaseException;
import com.path.lib.common.util.StringUtil;

/**
 * 
 * Copyright 2020, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: Alim Khowaja
 *
 * ATMEngineControlBOImpl.java used to
 */
public class ATMEngineControlBOImpl extends BaseBO implements ATMEngineControlBO
{
    private ISOMessageParseBO isoMessageParseBO;  
    
    private ATMEngineControlDAO atmEngineControlDAO;

    public void setAtmEngineControlDAO(ATMEngineControlDAO atmEngineControlDAO)
    {
	this.atmEngineControlDAO = atmEngineControlDAO;
    }

    @Override
    public void start(ATMEngineControlCO atmEngineControlCO) throws BaseException
    {
	ATM_ENG_INTERFACEVO atm_ENG_INTERFACEVO = atmEngineControlCO.getAtm_ENG_INTERFACEVO();
	
	/**
	 * Checking the Cluster which is running or not
	 */
	String clusterUrl = returnActiveEngineNode();
	
	if(StringUtil.isEmptyString(clusterUrl))
	{
	    throw new BOException(MessageCodes.CANNOT_PROCEED,
			new String[] { "failed_to_start_or_stop_key" });
	}
	
	HashMap<String, Object> rmiObjectInputParamMap = new HashMap<String, Object>();
	if(atm_ENG_INTERFACEVO.getINTERFACE_ID() != null )
	{
	   rmiObjectInputParamMap.put("engineInterfaceCode", atm_ENG_INTERFACEVO.getATM_ENG_INTERFACE_ID());
	   rmiObjectInputParamMap.put("interfaceCode", atm_ENG_INTERFACEVO.getINTERFACE_ID());
	   rmiObjectInputParamMap.put("status", atm_ENG_INTERFACEVO.getSTATUS());
		    
	    try {
		ATMCommonUtil.sendRMICall(clusterUrl, "atmEngBO", "startReactor", rmiObjectInputParamMap);
	    } 
	    catch (Exception e) 
	    {
		throw new BOException(MessageCodes.CANNOT_PROCEED,
			new String[] { "failed_to_start_or_stop_key" });
	    }
	}
    }
    
    /**
     * check the status of cluster
     * @return
     * @throws BOException 
     */
    private String returnActiveEngineNode() throws BOException
    {
	String clusterUrl[] = ATMCommonUtil.returnClusterUrls();
	System.out.println("clusterUrl:" + clusterUrl);
	
	if(clusterUrl.length <= 0 ) {
	    throw new BOException("services url not defined");
	}
	
	String activeUrl = null;
	
	for(String rmiUrl : clusterUrl){
	   
	    try{
		// RMI call for Start the ATM Engine
		HashMap<String, Object> responseMap = ATMCommonUtil.sendRMICall(rmiUrl, 
			"atmEngBO", "returnEngineStatus", null);
		
		if(null != responseMap  && responseMap.containsKey("status") 
			&& responseMap.get("status").equals(ATMCommonConstants.RUNNING)){
		    	activeUrl = rmiUrl;
		    	break;
		}
	    }catch(Exception e){
		    continue;
		}
	}
	
	if(StringUtil.isEmptyString(activeUrl)) {
	    throw new BOException("Engine isn't started on any node");
	}
	
	return activeUrl;
    }

    @Override
    public void shutdown(ATMEngineControlCO atmEngineControlCO) throws BaseException
    {
	ATM_ENG_INTERFACEVO atm_ENG_INTERFACEVO = atmEngineControlCO.getAtm_ENG_INTERFACEVO();
	
	String rmiUrl =  ATMCommonUtil.returnRmiUrlByApplication(ATMCommonConstants.APP_NAME_ATME);
	HashMap<String, Object> rmiObjectInputParamMap = new HashMap<String, Object>();
	if(atm_ENG_INTERFACEVO.getINTERFACE_ID() != null )
	{
	    rmiObjectInputParamMap.put("engineInterfaceCode", atm_ENG_INTERFACEVO.getATM_ENG_INTERFACE_ID());
	    rmiObjectInputParamMap.put("interfaceCode", atm_ENG_INTERFACEVO.getINTERFACE_ID());
	    rmiObjectInputParamMap.put("status", atm_ENG_INTERFACEVO.getSTATUS());
	    
	    try {
		//RMI call for Stop the ATM Engine
		ATMCommonUtil.sendRMICall(rmiUrl, "atmEngBO", "shutdownReactor", rmiObjectInputParamMap);
	    }
	    catch (Exception e) 
	    {
		throw new BOException(MessageCodes.CANNOT_PROCEED,
			new String[] { "failed_to_start_or_stop_key" });
	    }
	}
    }
    
    @SuppressWarnings("unchecked")
    @Override
    public List<ISOMessageParseCO> retrieveISOFields(ATMEngineControlSC atmEngineControlSC) throws Exception
    {
	List<ISOMessageParseCO> isoMessageParseCOs = new ArrayList<ISOMessageParseCO>();

	String fieldsMapString = null;

	if(StringUtil.isNotEmpty(atmEngineControlSC.getRequestMap()))
	{
	    fieldsMapString = atmEngineControlSC.getRequestMap();
	}

	else
	{
	    fieldsMapString = atmEngineControlSC.getResponseMap();
	}

	if(StringUtil.isNotEmpty(fieldsMapString))
	{
	    HashMap<String,Object> responseMap = new HashMap<String,Object>();
	    try
	    {
		 responseMap = new ObjectMapper().readValue(fieldsMapString, HashMap.class);
	    }
	    catch(Exception exp)
	    {
		log.error(exp,"Failed to parse request or response Hasmap to json, Invalid JSON="+fieldsMapString);
	    }
	    // send hashmap for retrieving the value
	    isoMessageParseCOs = isoMessageParseBO.prepareISOFieldsDetail(responseMap, atmEngineControlSC.getInterfaceid());
	}
	return isoMessageParseCOs;
    }

    @Override
    public Integer returnATMEngineCount(ATMEngineControlSC criteria) throws BaseException
    {
	return atmEngineControlDAO.returnATMEngineCount(criteria);
    }

    @Override
    public List<ATMEngineControlCO> returnATMEngineList(ATMEngineControlSC criteria) throws BaseException
    {
	return atmEngineControlDAO.returnATMEngineList(criteria);
    }

    @Override
    public Integer returnAlertEngineRequestCount(ATMEngineControlSC criteria) throws BaseException
    {
	return atmEngineControlDAO.returnAlertEngineRequestCount(criteria);
    }

    @Override
    public List<ATMEngineControlCO> returnAlertEngineRequest(ATMEngineControlSC criteria) throws BaseException
    {
	return atmEngineControlDAO.returnAlertEngineRequest(criteria);
    }
    
    @Override
    public ATMEngineControlCO returnAlertEngineRequestMsgDtls(ATMEngineControlSC criteria) throws BaseException
    {
	return atmEngineControlDAO.returnAlertEngineRequestMsgDtls(criteria);
    }
    
    @Override
    public ATMEngineControlCO returnRequstAndResponseISOMsg(ATMEngineControlSC criteria) throws BaseException
    {
	return atmEngineControlDAO.returnRequstAndResponseISOMsg(criteria);
    }
    
    @Override
    public Integer returnATMEngineActionLogCount(ATMEngineControlSC criteria)  throws BaseException
    {
	return atmEngineControlDAO.returnATMEngineActionLogCount(criteria); 
    }
    
    public List<ATMEngineControlCO> returnATMEngineActionlogList(ATMEngineControlSC criteria) throws BaseException
    {
	return atmEngineControlDAO.returnATMEngineActionlogList(criteria);
    }

    public void setIsoMessageParseBO(ISOMessageParseBO isoMessageParseBO)
    {
        this.isoMessageParseBO = isoMessageParseBO;
    }
}
