package com.path.atm.bo.isomessagesdefinition.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import com.path.atm.bo.atminterface.AtmInterfaceBO;
import com.path.atm.bo.atminterface.isoutils.ISOMessagesSettingUtil;
import com.path.atm.bo.isomessagesdefinition.ISOMessagesDefinitionBO;
import com.path.atm.dao.isomessagesdefinition.ISOMessagesDefinitionDAO;
import com.path.atm.dbmaps.vo.GTW_ATM_INT_ISO_MSGSVO;
import com.path.atm.dbmaps.vo.GTW_ATM_INT_ISO_SUB_FLDSVO;
import com.path.atm.dbmaps.vo.GTW_ATM_ISO_MSG_DEFVO;
import com.path.atm.dbmaps.vo.GTW_ATM_ISO_NET_MSG_FLDSVO;
import com.path.atm.vo.atminterface.AtmInterfaceCO;
import com.path.atm.vo.atminterface.AtmInterfaceSC;
import com.path.atm.vo.isomessagesdefinition.ISOMessagesDefinitionCO;
import com.path.atm.vo.isomessagesdefinition.ISOMessagesDefinitionSC;
import com.path.bo.common.ConstantsCommon;
import com.path.bo.common.MessageCodes;
import com.path.dbmaps.vo.SYS_PARAM_SCREEN_DISPLAYVO;
import com.path.lib.common.base.BaseBO;
import com.path.lib.common.exception.BOException;
import com.path.lib.common.exception.BaseException;
import com.path.lib.common.exception.DAOException;
import com.path.lib.common.util.NumberUtil;
import com.path.lib.common.util.StringUtil;
import com.path.struts2.json.PathJSONUtil;
import com.path.vo.customexpression.ExpressionParamCO;

/**
 * 
 * Copyright 2019, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: Alim Khowaja
 *
 * AcquirerBOImpl.java used to
 */
public class ISOMessagesDefinitionBOImpl extends BaseBO implements ISOMessagesDefinitionBO
{
    private AtmInterfaceBO atmInterfaceBO;
    private ISOMessagesDefinitionDAO isoMessagesDefinitionDAO;

    
    @Override
    public List returnISOMessagesDefinitionList(ISOMessagesDefinitionSC criteria) throws BaseException
    {
	return isoMessagesDefinitionDAO.returnISOMessagesDefinitionList(criteria);
    }



    @Override
    public int returnISOMessagesDefinitionListCount(ISOMessagesDefinitionSC criteria) throws BaseException
    {
	return isoMessagesDefinitionDAO.returnISOMessagesDefinitionListCount(criteria);
    }



    @Override
    public ISOMessagesDefinitionCO save(ISOMessagesDefinitionCO isoMessagesDefinitionCO) throws BaseException
    {
	//validate ISO Message Data
	validateISOMessageData(isoMessagesDefinitionCO);
	
	GTW_ATM_ISO_MSG_DEFVO gtw_ATM_ISO_MSG_DEFVO = isoMessagesDefinitionCO.getGtw_ATM_ISO_MSG_DEF();
	
	gtw_ATM_ISO_MSG_DEFVO.setCOMP_CODE(isoMessagesDefinitionCO.getCompCode());

	if(gtw_ATM_ISO_MSG_DEFVO.getISO_MSG_DEF_ID() == null
		|| gtw_ATM_ISO_MSG_DEFVO.getISO_MSG_DEF_ID().equals(ConstantsCommon.EMPTY_BIGDECIMAL_VALUE))
	{
	    gtw_ATM_ISO_MSG_DEFVO.setCREATED_BY(isoMessagesDefinitionCO.getUserID());
	    gtw_ATM_ISO_MSG_DEFVO.setCREATED_DATE(isoMessagesDefinitionCO.getRunningDate());

	    // insert Channel Record
	    isoMessagesDefinitionDAO.saveGTW_ATM_ISO_MSG_DEFVO(gtw_ATM_ISO_MSG_DEFVO);
	    isoMessagesDefinitionCO.setGtw_ATM_ISO_MSG_DEF(gtw_ATM_ISO_MSG_DEFVO);
		
	    // call audit for insert
	    auditBO.callAudit(null, gtw_ATM_ISO_MSG_DEFVO, isoMessagesDefinitionCO.getAuditRefCO());
	}
	else
	{
	    gtw_ATM_ISO_MSG_DEFVO.setMODIFIED_BY(isoMessagesDefinitionCO.getUserID());
	    gtw_ATM_ISO_MSG_DEFVO.setMODIFIED_DATE(isoMessagesDefinitionCO.getRunningDate());

	    // Update Channel Record
	   Integer row = genericDAO.update(gtw_ATM_ISO_MSG_DEFVO);
	   if(row == null || row < 1)
	   {
	       throw new BOException(MessageCodes.RECORD_CHANGED);
	   }
	
	   //retrieve old Audit Object
	   ISOMessagesDefinitionCO auditObj = (ISOMessagesDefinitionCO) isoMessagesDefinitionCO.getAuditObj();

	  //call audit for update
	  auditBO.callAudit(auditObj.getGtw_ATM_ISO_MSG_DEF(), gtw_ATM_ISO_MSG_DEFVO, isoMessagesDefinitionCO.getAuditRefCO());
	}
		    
	/**
	 * Save Request and Response fields
	 */
	saveRequestAndResponseFields(isoMessagesDefinitionCO);
	
	// insert Audit
	auditBO.insertAudit(isoMessagesDefinitionCO.getAuditRefCO());

	return isoMessagesDefinitionCO;
    }

    
    /**
     * set empty value while Network Message selected
     * @param acquirerCO
     * @return
     */
    private ISOMessagesDefinitionCO validateISOMessageData(ISOMessagesDefinitionCO isoMessagesDefinitionCO)
    {
	GTW_ATM_ISO_MSG_DEFVO gtw_ATM_ISO_MSG_DEFVO = isoMessagesDefinitionCO.getGtw_ATM_ISO_MSG_DEF();
	
	if(StringUtil.nullToEmpty(gtw_ATM_ISO_MSG_DEFVO.getNETWORK_MESSAGE_YN()).equals(ConstantsCommon.NO))
	{
	    gtw_ATM_ISO_MSG_DEFVO.setNETWORK_MESSAGE_TYPE("");
	    gtw_ATM_ISO_MSG_DEFVO.setREQUEST_PRI_BITMAP("");
	    gtw_ATM_ISO_MSG_DEFVO.setREQUEST_SEC_BITMAP("");
	    gtw_ATM_ISO_MSG_DEFVO.setRESPONSE_PRI_BITMAP("");
	    gtw_ATM_ISO_MSG_DEFVO.setRESPONSE_SEC_BITMAP("");
	}
	//reset empty values
	NumberUtil.resetEmptyValues(gtw_ATM_ISO_MSG_DEFVO);
	
	isoMessagesDefinitionCO.setGtw_ATM_ISO_MSG_DEF(gtw_ATM_ISO_MSG_DEFVO);
	return isoMessagesDefinitionCO;
    }
    
    /**
     * save checked Request and Response fields
     * @param isoMessagesDefinitionCO
     * @throws DAOException 
     */
    private void saveRequestAndResponseFields(ISOMessagesDefinitionCO isoMessagesDefinitionCO) throws BaseException
    {
	
	/**
	 * Delete ALL ISO Message Definition Fields by Id
	 */
	ISOMessagesDefinitionSC criteria = new ISOMessagesDefinitionSC();
	criteria.setISOMessagesDefinitionId(isoMessagesDefinitionCO.getGtw_ATM_ISO_MSG_DEF().getISO_MSG_DEF_ID());
	isoMessagesDefinitionDAO.deleteIsoMessagesDefNetFlds(criteria);
	
	//get request fields
	List<ISOMessagesDefinitionCO> requestFields = (List<ISOMessagesDefinitionCO>) isoMessagesDefinitionCO.getGridsDataMap().get("requestFields");
	
	//get response fields
	List<ISOMessagesDefinitionCO> responseFields = (List<ISOMessagesDefinitionCO>) isoMessagesDefinitionCO.getGridsDataMap().get("responseFields");
	
	/**
	 * Save Request Fields
	 */
	if(null != requestFields && requestFields.size() > 0)
	{
	    requestFields.stream().forEach(requestCo->{
		GTW_ATM_ISO_NET_MSG_FLDSVO net_MSG_FLDSVO = requestCo.getNet_MSG_FLDSVO();
		net_MSG_FLDSVO.setISO_MSG_DEF_ID(isoMessagesDefinitionCO.getGtw_ATM_ISO_MSG_DEF().getISO_MSG_DEF_ID());
		net_MSG_FLDSVO.setREQUEST_FIELD_YN(ConstantsCommon.YES);
		try
		{
		    /**
		     * check if primary key (i.e Network Msg Id is null then record will be save 
		     * otherwise record will be update)
		     */
		    isoMessagesDefinitionDAO.saveGTW_ATM_ISO_NET_MSG_FLDS(net_MSG_FLDSVO);
		}
		catch(DAOException ex)
		{
		    log.error(ex, "Error while saving Request Fields in ISO Defintions : " + ex);
		}
	    });
	}
	
	/**
	 * Save Response Fields
	 */
	if(null != responseFields && responseFields.size() > 0)
	{
	    responseFields.stream().forEach(responseCO->{
		GTW_ATM_ISO_NET_MSG_FLDSVO net_MSG_FLDSVO = responseCO.getNet_MSG_FLDSVO();
		net_MSG_FLDSVO.setISO_MSG_DEF_ID(isoMessagesDefinitionCO.getGtw_ATM_ISO_MSG_DEF().getISO_MSG_DEF_ID());
		net_MSG_FLDSVO.setREQUEST_FIELD_YN(ConstantsCommon.NO);
		try
		{
		    isoMessagesDefinitionDAO.saveGTW_ATM_ISO_NET_MSG_FLDS(net_MSG_FLDSVO);
		}
		catch(DAOException ex)
		{
		    log.error(ex, "Error while saving Request Fields in ISO Defintions : " + ex);
		}
	    });
	}
    }
    

    @Override
    public ISOMessagesDefinitionCO edit(ISOMessagesDefinitionSC criteria) throws BaseException
    {
	ISOMessagesDefinitionCO isoMessagesDefinitionCO = isoMessagesDefinitionDAO.edit(criteria);
	
	isoMessagesDefinitionCO.setOldISOMsgCode(isoMessagesDefinitionCO.getGtw_ATM_ISO_MSG_DEF().getATM_ISO_MSGS_CODE());
	
	/**
	 * Call and add request and response fields into co
	 */
	returnIsoMessagesDefNetFldsList(isoMessagesDefinitionCO);
	
	
	return isoMessagesDefinitionCO;
    }
    
    @Override
    public List returnIsoMessagesDefNetFldsList(ISOMessagesDefinitionCO isoMessagesDefinitionCO) throws BaseException
    {
	ISOMessagesDefinitionSC criteria= new ISOMessagesDefinitionSC();
	criteria.setNbRec(-1);
	criteria.setISOMessagesDefinitionId(isoMessagesDefinitionCO.getGtw_ATM_ISO_MSG_DEF().getISO_MSG_DEF_ID());
	
	//retrieve all Network Request/Response Fields related to ISO Msg Defintion Id
	List<ISOMessagesDefinitionCO> isoMessagesDefNetFldsCOs = isoMessagesDefinitionDAO.returnIsoMessagesDefNetFldsList(criteria);
	
	//check if fields are not exist then return back
	if(null == isoMessagesDefNetFldsCOs || isoMessagesDefNetFldsCOs.size() <= 0) return new ArrayList<ISOMessagesDefinitionCO>();
	
	/**
	 * Prepare separate request and response fields
	 */
	List<ISOMessagesDefinitionCO> requestIsoMessagesDefNetFldsCOs = new ArrayList<ISOMessagesDefinitionCO>();
	List<ISOMessagesDefinitionCO> responseIsoMessagesDefNetFldsCOs = new ArrayList<ISOMessagesDefinitionCO>();
	
	
	isoMessagesDefNetFldsCOs.stream().forEach(flds->{
	    //check if Field is related to request then add record in request list otherwise add in response list
	    if(StringUtil.nullToEmpty(flds.getNet_MSG_FLDSVO().getREQUEST_FIELD_YN()).equals(ConstantsCommon.YES))
	    {
		requestIsoMessagesDefNetFldsCOs.add(flds);
	    }
	    else
	    {
		responseIsoMessagesDefNetFldsCOs.add(flds);
	    }
	});
	
	isoMessagesDefinitionCO.setRequestIsoNetMsgFLDS(requestIsoMessagesDefNetFldsCOs);
	isoMessagesDefinitionCO.setResponseIsoNetMsgFLDS(responseIsoMessagesDefNetFldsCOs);
	
	//serialize Request Fields
	try {
	isoMessagesDefinitionCO.setRequestFields("{\"root\":"
		    .concat(PathJSONUtil.serialize(requestIsoMessagesDefNetFldsCOs, null, null, false, true)).concat("}"));
	
	//serialize Response Fields
	isoMessagesDefinitionCO.setResponseFields("{\"root\":"
		    .concat(PathJSONUtil.serialize(responseIsoMessagesDefNetFldsCOs, null, null, false, true)).concat("}"));
	}catch(Exception e ) {
	    throw new BaseException("failed to serialize the ATM Nerwork Request and Response Fields :"+e);
	}
	return isoMessagesDefNetFldsCOs;
    }



    @Override
    public void delete(ISOMessagesDefinitionCO isoMessagesDefinitionCO) throws BaseException
    {
	 ISOMessagesDefinitionSC criteria = new ISOMessagesDefinitionSC();
	 criteria.setMappingId(isoMessagesDefinitionCO.getGtw_ATM_ISO_MSG_DEF().getMAPPING_ID());
	 criteria.setISOMessagesDefinitionId(isoMessagesDefinitionCO.getGtw_ATM_ISO_MSG_DEF().getISO_MSG_DEF_ID());
	 //delete ISO Mssage Defintion fields by iso message defintion id
	 isoMessagesDefinitionDAO.deleteIsoMessagesDefNetFlds(criteria);
	
	 //delete ISO Message Definition
	 genericDAO.delete(isoMessagesDefinitionCO.getGtw_ATM_ISO_MSG_DEF());
	
	 //delete Mapping details by iso Message Defintion id
	 if(isoMessagesDefinitionCO.getGtw_ATM_ISO_MSG_DEF().getMAPPING_ID() != null && 
    		!isoMessagesDefinitionCO.getGtw_ATM_ISO_MSG_DEF().getMAPPING_ID().equals(ConstantsCommon.EMPTY_BIGDECIMAL_VALUE))
	 {
    	 	isoMessagesDefinitionDAO.deleteATMISOMessagesByMappingId(criteria);
	 }
    }



    @Override
    public ISOMessagesDefinitionCO applySysParamSettings(ISOMessagesDefinitionCO isoMessagesDefinitionCO)
	    throws BaseException
    {
	HashMap<String, SYS_PARAM_SCREEN_DISPLAYVO> elementMap = isoMessagesDefinitionCO.getElementMap();

	SYS_PARAM_SCREEN_DISPLAYVO sysParam = new SYS_PARAM_SCREEN_DISPLAYVO();
	sysParam.setIS_READONLY(BigDecimal.ONE);
	elementMap.put("iso_message_definition_code", sysParam);
	
	SYS_PARAM_SCREEN_DISPLAYVO networkMsgTypeSysParam = new SYS_PARAM_SCREEN_DISPLAYVO();
	SYS_PARAM_SCREEN_DISPLAYVO processCodeMsgTypeSysParam = new SYS_PARAM_SCREEN_DISPLAYVO();
	SYS_PARAM_SCREEN_DISPLAYVO wsmappingCodeMsgTypeSysParam = new SYS_PARAM_SCREEN_DISPLAYVO();

	if(isoMessagesDefinitionCO != null && StringUtil.nullToEmpty(isoMessagesDefinitionCO.getGtw_ATM_ISO_MSG_DEF()
								     .getNETWORK_MESSAGE_YN()).equalsIgnoreCase(ConstantsCommon.YES))
	{
	    networkMsgTypeSysParam.setIS_VISIBLE(BigDecimal.ONE);
	    networkMsgTypeSysParam.setIS_MANDATORY(BigDecimal.ONE);
	    processCodeMsgTypeSysParam.setIS_VISIBLE(BigDecimal.ZERO);
	    wsmappingCodeMsgTypeSysParam.setIS_VISIBLE(BigDecimal.ZERO);
	}
	else
	{
	    networkMsgTypeSysParam.setIS_VISIBLE(BigDecimal.ZERO);
	    processCodeMsgTypeSysParam.setIS_VISIBLE(BigDecimal.ONE);
	    wsmappingCodeMsgTypeSysParam.setIS_VISIBLE(BigDecimal.ONE);
	}
	
	elementMap.put("networkMessageType", networkMsgTypeSysParam);
	elementMap.put("processCode_id", processCodeMsgTypeSysParam);
	elementMap.put("lbl_wsMappingDialogButton", wsmappingCodeMsgTypeSysParam);
	elementMap.put("wsMappingDialogButton", wsmappingCodeMsgTypeSysParam);
	elementMap.put("requestResponseFldsListInner", networkMsgTypeSysParam);

	return isoMessagesDefinitionCO;
    }
    
    @Override
    public List returnISOMsgFieldsByInterfaceCodeAndMTICOde(ISOMessagesDefinitionSC criteria) throws BaseException
    {
	AtmInterfaceSC atmInterfaceSC = new AtmInterfaceSC();
	atmInterfaceSC.setInterfaceId(criteria.getInterfaceId());
	atmInterfaceSC.setMessageId(criteria.getMessageId());
	atmInterfaceSC.setNbRec(-1);

	 
	List<ISOMessagesDefinitionCO> isoFieldsList = new ArrayList<ISOMessagesDefinitionCO>();
	    
	//return Message List by interface code or message code
	List<AtmInterfaceCO> mtiList = atmInterfaceBO.returnMessageList(atmInterfaceSC);
	
	if(mtiList != null && mtiList.size() > 0)
	{
	    for(AtmInterfaceCO atmInterface : mtiList)
	    {
		GTW_ATM_INT_ISO_MSGSVO gtw_ATM_ISO_MSG_DEFVO = atmInterface.getIso_INT_MSGSVO();

		List<BigDecimal> fieldsRequest = new ArrayList<>();
		List<BigDecimal> fieldsResponse = new ArrayList<>();

		// extract Request fields from request Bitmap
		fieldsRequest = ISOMessagesSettingUtil.extractFieldsFromBitMaps(
			gtw_ATM_ISO_MSG_DEFVO.getREQUEST_BITMAP1(), gtw_ATM_ISO_MSG_DEFVO.getREQUEST_BITMAP2());

		// extract Response fields from response Bitmap
		fieldsResponse = ISOMessagesSettingUtil.extractFieldsFromBitMaps(
			gtw_ATM_ISO_MSG_DEFVO.getRESPONSE_BITMAP1(), gtw_ATM_ISO_MSG_DEFVO.getRESPONSE_BITMAP2());

		// retrieve details of Request Bit maps
		// Initialize bitmaps fields
		fieldsRequest.addAll(fieldsResponse);
		atmInterfaceSC.setBitMapFields(fieldsRequest);
		
		/**
		 * retrieve all request and response fields by MTI added in interface
		 */
		List<AtmInterfaceCO>  fieldList = atmInterfaceBO.returnIsoFieldsDetailByIdList(atmInterfaceSC);
		ISOMessagesDefinitionCO messagesDefinitionCO = null;
		for(AtmInterfaceCO interfaceCO : fieldList)
		{
		    messagesDefinitionCO = new ISOMessagesDefinitionCO();
		    messagesDefinitionCO.setFieldName(interfaceCO.getIso_INT_FLDSVO().getFIELD_NAME());
		    messagesDefinitionCO.getNet_MSG_FLDSVO().setFIELD_CODE(interfaceCO.getIso_INT_FLDSVO().getFIELD_CODE());
		    isoFieldsList.add(messagesDefinitionCO);
		}
	    }
	}
	
	return isoFieldsList;
    }
    
    @Override
    public List returnFieldsByInterfaceCodeAndMTICOde(ISOMessagesDefinitionSC criteria) throws BaseException
    {
	AtmInterfaceSC atmInterfaceSC = new AtmInterfaceSC();
	atmInterfaceSC.setInterfaceId(criteria.getInterfaceId());
	atmInterfaceSC.setMessageId(criteria.getMessageId());
	atmInterfaceSC.setNbRec(-1);
	List<ExpressionParamCO> expressionParamCOs = new ArrayList<>();
	
	//return Message List by interface code or message code
	List<AtmInterfaceCO> mtiList = atmInterfaceBO.returnMessageList(atmInterfaceSC);

	if(mtiList != null && mtiList.size() > 0)
	{
	    for(AtmInterfaceCO atmInterface : mtiList)
	    {
		GTW_ATM_INT_ISO_MSGSVO gtw_ATM_ISO_MSG_DEFVO = atmInterface.getIso_INT_MSGSVO();

		List<BigDecimal> fieldsRequest = new ArrayList<>();
		List<BigDecimal> fieldsResponse = new ArrayList<>();

		// extract Request fields from request Bitmap
		fieldsRequest = ISOMessagesSettingUtil.extractFieldsFromBitMaps(
			gtw_ATM_ISO_MSG_DEFVO.getREQUEST_BITMAP1(), gtw_ATM_ISO_MSG_DEFVO.getREQUEST_BITMAP2());

		// extract Response fields from response Bitmap
		fieldsResponse = ISOMessagesSettingUtil.extractFieldsFromBitMaps(
			gtw_ATM_ISO_MSG_DEFVO.getRESPONSE_BITMAP1(), gtw_ATM_ISO_MSG_DEFVO.getRESPONSE_BITMAP2());

		// retrieve details of Request Bit maps
		// Initialize bitmaps fields
		fieldsRequest.addAll(fieldsResponse);
		atmInterfaceSC.setBitMapFields(fieldsRequest);
		// Incase of Empty Fields

		/** Load available fields configuration from DB */
		atmInterfaceSC.setWithSubFields(true);
		List<AtmInterfaceCO> fieldList = atmInterfaceBO.returnIsoFieldsDetailByIdList(atmInterfaceSC);

		if(fieldList != null && fieldList.size() > 0)
		{
		    for(AtmInterfaceCO isoField : fieldList)
		    {
			ExpressionParamCO expressionParamCO = new ExpressionParamCO();

			if(isoField.getIso_SUB_FLDSVOs() != null && isoField.getIso_SUB_FLDSVOs().size() > 0
				&& isoField.getIso_SUB_FLDSVOs().get(0).getSUB_FIELD_NAME() != null)
			{
			    int count = 0;
			    for(GTW_ATM_INT_ISO_SUB_FLDSVO sub : isoField.getIso_SUB_FLDSVOs())
			    {
				expressionParamCO = new ExpressionParamCO();
				expressionParamCO.setParameterName(isoField.getIso_INT_FLDSVO().getFIELD_CODE() + "."
					+ (count += 1) + " - " + sub.getSUB_FIELD_NAME());
				expressionParamCO.setParameterValue(
					"[ISO" + isoField.getIso_INT_FLDSVO().getFIELD_CODE() + "." + (count) + "]");
				expressionParamCOs.add(expressionParamCO);
			    }
			}
			else
			{
			    expressionParamCO.setParameterName(isoField.getIso_INT_FLDSVO().getFIELD_CODE() + " - "
				    + isoField.getIso_INT_FLDSVO().getFIELD_NAME());
			    expressionParamCO
				    .setParameterValue("[ISO" + isoField.getIso_INT_FLDSVO().getFIELD_CODE() + "]");
			    expressionParamCOs.add(expressionParamCO);
			}
		    }

		}
	    }
	}
	 /**
	   * Add Global Fields
	   */
	ISOMessagesSettingUtil.addGlobalFields(expressionParamCOs);
	return expressionParamCOs;
    }
    
    /**
     * set ISO Field Name and return for expression dialog
     * 
     * @param fieldName
     * @return
     */
    private ExpressionParamCO concatinateISOFields(String parameterName, String parameterValue)
    {
	ExpressionParamCO expressionParamCO = new ExpressionParamCO();
	expressionParamCO.setParameterName(parameterName);
	expressionParamCO.setParameterValue(parameterValue);
	return expressionParamCO;
    }
    
    public void setAtmInterfaceBO(AtmInterfaceBO atmInterfaceBO)
    {
        this.atmInterfaceBO = atmInterfaceBO;
    }

    public void setIsoMessagesDefinitionDAO(ISOMessagesDefinitionDAO isoMessagesDefinitionDAO)
    {
        this.isoMessagesDefinitionDAO = isoMessagesDefinitionDAO;
    }
}