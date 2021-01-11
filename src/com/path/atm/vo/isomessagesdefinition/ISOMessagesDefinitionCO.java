package com.path.atm.vo.isomessagesdefinition;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.path.atm.dbmaps.vo.GTW_ATM_INT_ISO_FLDSVO;
import com.path.atm.dbmaps.vo.GTW_ATM_ISO_MSG_DEFVO;
import com.path.atm.dbmaps.vo.GTW_ATM_ISO_NET_MSG_FLDSVO;
import com.path.atm.vo.common.ATMBaseCO;
import com.path.vo.ws.CommonPwsMappingCO;

/**
 * 
 * Copyright 2019, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: Alim Khowaja
 *
 * ISOMessagesDefinitionCO.java used to
 */
public class ISOMessagesDefinitionCO extends ATMBaseCO
{
    private GTW_ATM_ISO_MSG_DEFVO   gtw_ATM_ISO_MSG_DEF = new GTW_ATM_ISO_MSG_DEFVO  ();
    private String atmInterfaceDescription;
    private String mtiDescription;
    
    private List requestFieldList = new ArrayList<>();
    private List responseFieldList = new ArrayList<>();
    
    private String fieldName;
    private GTW_ATM_ISO_NET_MSG_FLDSVO net_MSG_FLDSVO = new GTW_ATM_ISO_NET_MSG_FLDSVO();
    private List<GTW_ATM_INT_ISO_FLDSVO> atm_INT_ISO_FLDSVOs = new ArrayList<GTW_ATM_INT_ISO_FLDSVO>();
    
    private CommonPwsMappingCO commonPWSMappingCO = new CommonPwsMappingCO();
    
    /**
     * ISO Request and Response Fields Varibales
     */
    private String requestFields;
    private String responseFields;
    private HashMap<String, Object> gridsDataMap = new HashMap<String, Object>();
    private BigDecimal oldISOMsgCode;
    private BigDecimal interfaceId;
    private List<ISOMessagesDefinitionCO> requestIsoNetMsgFLDS = new ArrayList<ISOMessagesDefinitionCO>();
    private List<ISOMessagesDefinitionCO> responseIsoNetMsgFLDS = new ArrayList<ISOMessagesDefinitionCO>();
    
    public GTW_ATM_ISO_MSG_DEFVO getGtw_ATM_ISO_MSG_DEF()
    {
        return gtw_ATM_ISO_MSG_DEF;
    }
    public void setGtw_ATM_ISO_MSG_DEF(GTW_ATM_ISO_MSG_DEFVO gtw_ATM_ISO_MSG_DEF)
    {
        this.gtw_ATM_ISO_MSG_DEF = gtw_ATM_ISO_MSG_DEF;
    }
    public String getAtmInterfaceDescription()
    {
        return atmInterfaceDescription;
    }
    public void setAtmInterfaceDescription(String atmInterfaceDescription)
    {
        this.atmInterfaceDescription = atmInterfaceDescription;
    }
    public List<GTW_ATM_INT_ISO_FLDSVO> getAtm_INT_ISO_FLDSVOs()
    {
        return atm_INT_ISO_FLDSVOs;
    }
    public void setAtm_INT_ISO_FLDSVOs(List<GTW_ATM_INT_ISO_FLDSVO> atm_INT_ISO_FLDSVOs)
    {
        this.atm_INT_ISO_FLDSVOs = atm_INT_ISO_FLDSVOs;
    }
    public String getFieldName()
    {
        return fieldName;
    }
    public void setFieldName(String fieldName)
    {
        this.fieldName = fieldName;
    }
    public GTW_ATM_ISO_NET_MSG_FLDSVO getNet_MSG_FLDSVO()
    {
        return net_MSG_FLDSVO;
    }
    public void setNet_MSG_FLDSVO(GTW_ATM_ISO_NET_MSG_FLDSVO net_MSG_FLDSVO)
    {
        this.net_MSG_FLDSVO = net_MSG_FLDSVO;
    }
    public List getRequestFieldList()
    {
        return requestFieldList;
    }
    public void setRequestFieldList(List requestFieldList)
    {
        this.requestFieldList = requestFieldList;
    }
    public List getResponseFieldList()
    {
        return responseFieldList;
    }
    public void setResponseFieldList(List responseFieldList)
    {
        this.responseFieldList = responseFieldList;
    }
    public String getMtiDescription()
    {
        return mtiDescription;
    }
    public void setMtiDescription(String mtiDescription)
    {
        this.mtiDescription = mtiDescription;
    }
    public CommonPwsMappingCO getCommonPWSMappingCO()
    {
        return commonPWSMappingCO;
    }
    public void setCommonPWSMappingCO(CommonPwsMappingCO commonPWSMappingCO)
    {
        this.commonPWSMappingCO = commonPWSMappingCO;
    }
    public String getRequestFields()
    {
        return requestFields;
    }
    public void setRequestFields(String requestFields)
    {
        this.requestFields = requestFields;
    }
    public String getResponseFields()
    {
        return responseFields;
    }
    public void setResponseFields(String responseFields)
    {
        this.responseFields = responseFields;
    }
    public HashMap<String, Object> getGridsDataMap()
    {
        return gridsDataMap;
    }
    public void setGridsDataMap(HashMap<String, Object> gridsDataMap)
    {
        this.gridsDataMap = gridsDataMap;
    }
    public BigDecimal getOldISOMsgCode()
    {
        return oldISOMsgCode;
    }
    public void setOldISOMsgCode(BigDecimal oldISOMsgCode)
    {
        this.oldISOMsgCode = oldISOMsgCode;
    }
    public BigDecimal getInterfaceId()
    {
        return interfaceId;
    }
    public void setInterfaceId(BigDecimal interfaceId)
    {
        this.interfaceId = interfaceId;
    }
    public List<ISOMessagesDefinitionCO> getRequestIsoNetMsgFLDS()
    {
        return requestIsoNetMsgFLDS;
    }
    public void setRequestIsoNetMsgFLDS(List<ISOMessagesDefinitionCO> requestIsoNetMsgFLDS)
    {
        this.requestIsoNetMsgFLDS = requestIsoNetMsgFLDS;
    }
    public List<ISOMessagesDefinitionCO> getResponseIsoNetMsgFLDS()
    {
        return responseIsoNetMsgFLDS;
    }
    public void setResponseIsoNetMsgFLDS(List<ISOMessagesDefinitionCO> responseIsoNetMsgFLDS)
    {
        this.responseIsoNetMsgFLDS = responseIsoNetMsgFLDS;
    }
    
}