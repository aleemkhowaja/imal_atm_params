package com.path.atm.bo.isomessageparsing.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.struts2.json.JSONException;

import com.path.atm.bo.atminterface.AtmInterfaceBO;
import com.path.atm.bo.atminterface.AtmInterfaceConstants;
import com.path.atm.bo.common.ATMCommonConstants;
import com.path.atm.bo.common.ATMCommonUtil;
import com.path.atm.bo.isomessageparsing.ISOMessageParseBO;
import com.path.atm.dbmaps.vo.GTW_ATM_INT_ISO_FLDSVO;
import com.path.atm.vo.atminterface.AtmInterfaceCO;
import com.path.atm.vo.atminterface.AtmInterfaceSC;
import com.path.atm.vo.isomessageparsing.ISOMessageParseCO;
import com.path.atm.vo.isomessageparsing.ISOMessageParseSC;
import com.path.lib.common.base.BaseBO;
import com.path.lib.common.exception.BaseException;
import com.path.lib.common.util.StringUtil;
import com.path.struts2.json.PathJSONUtil;

/**
 * 
 * Copyright 2019, Path Solutions Path Solutions retains all ownership rights to
 * this source code
 * 
 * @author: Alim Khowaja
 *
 * ISOMessageParseBOImpl.java used to parse and run the ISO Message
 */
public class ISOMessageParseBOImpl extends BaseBO implements ISOMessageParseBO
{
    private AtmInterfaceBO atmInterfaceBO;

    @Override
    public ISOMessageParseCO parseAndRunISOMessage(ISOMessageParseSC criteria) throws BaseException
    {
	String rmiUrl = ATMCommonUtil.returnRmiUrlByApplication(ATMCommonConstants.APP_NAME_ATME);
	HashMap<String, Object> rmiObjectInputParamMap = new HashMap<String, Object>();
	ISOMessageParseCO isoMessageParseCO = new ISOMessageParseCO();
	List<ISOMessageParseCO> isoMessageParseCOs = null;

	if(criteria.getInterfaceId() != null)
	{
	    rmiObjectInputParamMap.put("interfaceCode", criteria.getInterfaceId());
	    rmiObjectInputParamMap.put("isoMsg", criteria.getIsoMessage());

	    String boMethod = "";
	    if(criteria.getIsRun() != null && criteria.getIsRun())
	    {
		boMethod = "executeIsoMsg";
	    }
	    else
	    {
		boMethod = "parseIsoMsg";
	    }

	    try
	    {
		HashMap<String, Object> responseMap = ATMCommonUtil.sendRMICall(rmiUrl, "atmEngBO", boMethod,
			rmiObjectInputParamMap);

		System.out.println("parse = "+responseMap);
		/**
		 * prepare parsed ISO Fields received from ATM engine
		 */
		isoMessageParseCOs = prepareISOFieldsDetail(responseMap, criteria.getInterfaceId());
		isoMessageParseCO.setResponseISOFields(isoMessageParseCOs);

		// set Response ISO Message
		if(responseMap.containsKey("ISOMSG"))
		{
		    isoMessageParseCO.setResponseISOMessage((String) responseMap.get("ISOMSG"));
		}
	    }
	    catch(Exception e)
	    {
		throw new BaseException(e);
	    } // RMI call foe Stop the ATM Engine

	}
	return isoMessageParseCO;
    }

    /**
     * Prepare Parse ISO Fields recieved from ATM Engine
     * 
     * @param responseMap
     * @param interfaceId
     * @return
     * @throws BaseException
     * @throws JSONException 
     */
    @Override
    public List<ISOMessageParseCO> prepareISOFieldsDetail(HashMap<String, Object> responseMap, BigDecimal interfaceId)
	    throws BaseException, JSONException
    {
	AtmInterfaceSC atmInterfaceSC = new AtmInterfaceSC();
	atmInterfaceSC.setInterfaceId(interfaceId);
	atmInterfaceSC.setWithSubFields(true);
	atmInterfaceSC.setNbRec(-1);

	/**
	 * Return ISO Fields by Interface ID for showing in request and response fields
	 */
	List<AtmInterfaceCO> fieldList = atmInterfaceBO.returnFieldsList(atmInterfaceSC);
	List<ISOMessageParseCO> list = new ArrayList<ISOMessageParseCO>();
	
	boolean isFieldExist = false;
	
	if(fieldList != null)
	{
	    for(AtmInterfaceCO atmInterfaceCo : fieldList)
	    {
		isFieldExist = false;
		
		GTW_ATM_INT_ISO_FLDSVO atm_INT_ISO_FLDSVO = atmInterfaceCo.getIso_INT_FLDSVO();
		String key = "ISO" + atm_INT_ISO_FLDSVO.getFIELD_CODE();
		ISOMessageParseCO isoMessageParseCO = new ISOMessageParseCO();
		
		 isoMessageParseCO.setFieldCode(String.valueOf(atm_INT_ISO_FLDSVO.getFIELD_CODE()));
		 isoMessageParseCO.setFieldName(atm_INT_ISO_FLDSVO.getFIELD_NAME());
		    
		/**
		 * Check if the ISO Field is contains the resquest and response
		 * map
		 */
		if(responseMap.containsKey(key))
		{
		    if(responseMap.get(key) != null)
		    {
			isoMessageParseCO.setFieldValue(String.valueOf(responseMap.get(key)));
		    }
		    
		    isFieldExist = true;
		}
		/**
		 * Retrieve Sub Fields
		 *
		 */
		List<ISOMessageParseCO> subFields = new ArrayList<>();
		if(atmInterfaceCo.getIso_SUB_FLDSVOs() != null && atmInterfaceCo.getIso_SUB_FLDSVOs().size() > 0)
		{
		    for(int j = 0; j < atmInterfaceCo.getIso_SUB_FLDSVOs().size(); j++)
		    {
			String subKey = "ISO" + atm_INT_ISO_FLDSVO.getFIELD_CODE() + "." + (j + 1);
			if(responseMap.containsKey(subKey))
			{
			    if(responseMap.get(subKey) != null)
			    {
				ISOMessageParseCO parseCO = new ISOMessageParseCO();
				parseCO.setFieldCode(
					"" + atmInterfaceCo.getIso_SUB_FLDSVOs().get(j).getSUB_FIELD_CODE());
				parseCO.setFieldName(atmInterfaceCo.getIso_SUB_FLDSVOs().get(j).getSUB_FIELD_NAME());
				parseCO.setFieldValue(responseMap.get(subKey).toString());
				subFields.add(parseCO);
			    }
			}
		    }
		    // set sub grid json inside variable
		    isoMessageParseCO.setSubGridData(
			"{\"root\":".concat(PathJSONUtil.serialize(subFields, null, null, false, true)).concat("}"));
		}
		/**
		 * Two Conditions added 
		 * 1 - For checking if we have parent field and its value available in map then the co will be added in list in order to show in grid
		 * 2 - If we don't have parent field in map but we have its subfields then also co with add in list.
		 * 
		 */
		if(isFieldExist || subFields.size() > 0)
		{
		    list.add(isoMessageParseCO);
		}
	    }

	    // Add Global ISO Fields
	    HashMap<String, String> hashMap = AtmInterfaceConstants.globalFields;
	    hashMap.entrySet().stream().forEach(e -> {
		if(responseMap != null && responseMap.size() > 0 && responseMap.containsKey(e.getKey()))
		{
		    if(responseMap.get(e.getKey()) != null
			    && StringUtil.isNotEmpty(responseMap.get(e.getKey()).toString()))
		    {
			ISOMessageParseCO parseCO = new ISOMessageParseCO();
			parseCO.setFieldName(e.getValue());
			parseCO.setFieldValue(responseMap.get(e.getKey()).toString());
			list.add(parseCO);
		    }
		}
	    });
	}
	return list;
    }

    public void setAtmInterfaceBO(AtmInterfaceBO atmInterfaceBO)
    {
	this.atmInterfaceBO = atmInterfaceBO;
    }
}