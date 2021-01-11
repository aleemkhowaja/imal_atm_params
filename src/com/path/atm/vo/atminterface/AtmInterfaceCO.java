package com.path.atm.vo.atminterface;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.path.atm.dbmaps.vo.GTW_ATM_INTERFACESVO;
import com.path.atm.dbmaps.vo.GTW_ATM_INT_ISO_FLDSVO;
import com.path.atm.dbmaps.vo.GTW_ATM_INT_ISO_MSGSVO;
import com.path.atm.dbmaps.vo.GTW_ATM_INT_ISO_SUB_FLDSVO;
import com.path.atm.dbmaps.vo.GTW_ATM_SYS_PARAM_ISO_FLDSVO;
import com.path.atm.vo.acquirer.AcquirerCO;
import com.path.atm.vo.atminterface.exporter.AtmIsoResponseMapCO;
import com.path.atm.vo.atminterface.exporter.ChannelCO;
import com.path.atm.vo.common.ATMBaseCO;
import com.path.atm.vo.isomessagesdefinition.ISOMessagesDefinitionCO;
import com.path.atm.vo.terminal.TerminalCO;

/**
 * 
 * Copyright 2019, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: Alim Khowaja
 *
 * AtmInterfaceCO.java used to
 */
public class AtmInterfaceCO extends ATMBaseCO
{
    
    private String fieldName;
    private String parameterName;
    private String parameterValue;

    private GTW_ATM_SYS_PARAM_ISO_FLDSVO iso_FIELDVO = new GTW_ATM_SYS_PARAM_ISO_FLDSVO();
    private GTW_ATM_INT_ISO_MSGSVO iso_INT_MSGSVO = new GTW_ATM_INT_ISO_MSGSVO();
    private GTW_ATM_INT_ISO_FLDSVO iso_INT_FLDSVO = new GTW_ATM_INT_ISO_FLDSVO();
    private GTW_ATM_INT_ISO_FLDSVO iso_INT_FLDSVO1 = new GTW_ATM_INT_ISO_FLDSVO();
    private GTW_ATM_INTERFACESVO iso_INTERFACESVO = new GTW_ATM_INTERFACESVO();
    private GTW_ATM_INT_ISO_SUB_FLDSVO sub_FLDSVO = new GTW_ATM_INT_ISO_SUB_FLDSVO();

    // Strings
    private String interfaceTypeDesc;
    private String PARTIAL_MASK;
    private String TYPE;
    private String EXPRESSION;
    private String IS_DECIMAL_YN;
    private String HEADER;
    private String STATUS;
//    private String statusDesc;
    private String mode;
    private String data;
    private String subGridData;

    // BigDedcimals
    private BigDecimal FIELD_LENL;
    private BigDecimal TOTAL_MASK;

    // ATM Interface grid data
    HashMap<String, Object> gridsDataMap = new HashMap<String, Object>();
    Map<BigDecimal, BigDecimal> interfaceFieldMap = new HashMap<BigDecimal, BigDecimal>(); 
    List<GTW_ATM_INT_ISO_FLDSVO> iso_FLDSVOs = new ArrayList<GTW_ATM_INT_ISO_FLDSVO>();
    List<GTW_ATM_INT_ISO_MSGSVO> iso_MSGSVOs = new ArrayList<GTW_ATM_INT_ISO_MSGSVO>();
    List<GTW_ATM_INT_ISO_SUB_FLDSVO> iso_SUB_FLDSVOs = new ArrayList<GTW_ATM_INT_ISO_SUB_FLDSVO>();
    
    private List<AtmInterfaceCO> isoFields = new ArrayList<AtmInterfaceCO>();
    private List<AtmInterfaceCO> isoMsgs = new ArrayList<AtmInterfaceCO>();
    private List<AcquirerCO> acquirerCOs  = new ArrayList<AcquirerCO>();
    private List<TerminalCO> terminalCOs = new ArrayList<TerminalCO>();
    private List<ISOMessagesDefinitionCO> isoMessageDefinitionCOs = new ArrayList<ISOMessagesDefinitionCO>();
    private List<ChannelCO> channelCOs = new ArrayList<ChannelCO>();
    private List<AtmIsoResponseMapCO> atmIsoResponseMapCOs = new ArrayList<AtmIsoResponseMapCO>();
    
    private String REQUEST_EXPRESSION;
    private String RESPONSE_EXPRESSION;
    private BigDecimal fixedLength;
    private BigDecimal oldISOMsgId;
    private Map<BigDecimal, BigDecimal> isoMsgFieldMap = new HashMap<BigDecimal, BigDecimal>(); 
    
    
    
    public String getFieldName()
    {
        return fieldName;
    }

    public void setFieldName(String fieldName)
    {
        this.fieldName = fieldName;
    }
    
    public String getParameterName()
    {
        return parameterName;
    }

    public void setParameterName(String parameterName)
    {
        this.parameterName = parameterName;
    }

    public String getParameterValue()
    {
        return parameterValue;
    }

    public void setParameterValue(String parameterValue)
    {
        this.parameterValue = parameterValue;
    }

    public String getMode()
    {
	return mode;
    }

    public void setMode(String mode)
    {
	this.mode = mode;
    }

    public String getEXPRESSION()
    {
	return EXPRESSION;
    }

    public void setEXPRESSION(String eXPRESSION)
    {
	EXPRESSION = eXPRESSION;
    }

    public String getIS_DECIMAL_YN()
    {
	return IS_DECIMAL_YN;
    }

    public void setIS_DECIMAL_YN(String iS_DECIMAL_YN)
    {
	IS_DECIMAL_YN = iS_DECIMAL_YN;
    }

    public String getTYPE()
    {
	return TYPE;
    }

    public void setTYPE(String tYPE)
    {
	TYPE = tYPE;
    }

    public BigDecimal getFIELD_LENL()
    {
	return FIELD_LENL;
    }

    public void setFIELD_LENL(BigDecimal fIELD_LENL)
    {
	FIELD_LENL = fIELD_LENL;
    }

    public BigDecimal getTOTAL_MASK()
    {
	return TOTAL_MASK;
    }

    public void setTOTAL_MASK(BigDecimal tOTAL_MASK)
    {
	TOTAL_MASK = tOTAL_MASK;
    }

    public String getPARTIAL_MASK()
    {
	return PARTIAL_MASK;
    }

    public void setPARTIAL_MASK(String pARTIAL_MASK)
    {
	PARTIAL_MASK = pARTIAL_MASK;
    }

    public String getInterfaceTypeDesc()
    {
	return interfaceTypeDesc;
    }

    public void setInterfaceTypeDesc(String interfaceTypeDesc)
    {
	this.interfaceTypeDesc = interfaceTypeDesc;
    }

    public String getHEADER()
    {
	return HEADER;
    }

    public void setHEADER(String hEADER)
    {
	HEADER = hEADER;
    }

    public GTW_ATM_SYS_PARAM_ISO_FLDSVO getIso_FIELDVO()
    {
	return iso_FIELDVO;
    }

    public void setIso_FIELDVO(GTW_ATM_SYS_PARAM_ISO_FLDSVO iso_FIELDVO)
    {
	this.iso_FIELDVO = iso_FIELDVO;
    }

    public String getSTATUS()
    {
	return STATUS;
    }

    public void setSTATUS(String sTATUS)
    {
	STATUS = sTATUS;
    }

    public String getData()
    {
	return data;
    }

    public void setData(String data)
    {
	this.data = data;
    }

    public String getSubGridData()
    {
	return subGridData;
    }

    public void setSubGridData(String subGridData)
    {
	this.subGridData = subGridData;
    }

    public GTW_ATM_INT_ISO_MSGSVO getIso_INT_MSGSVO()
    {
	return iso_INT_MSGSVO;
    }

    public void setIso_INT_MSGSVO(GTW_ATM_INT_ISO_MSGSVO iso_INT_MSGSVO)
    {
	this.iso_INT_MSGSVO = iso_INT_MSGSVO;
    }

    public GTW_ATM_INT_ISO_FLDSVO getIso_INT_FLDSVO()
    {
	return iso_INT_FLDSVO;
    }

    public void setIso_INT_FLDSVO(GTW_ATM_INT_ISO_FLDSVO iso_INT_FLDSVO)
    {
	this.iso_INT_FLDSVO = iso_INT_FLDSVO;
    }

    public GTW_ATM_INTERFACESVO getIso_INTERFACESVO()
    {
	return iso_INTERFACESVO;
    }

    public void setIso_INTERFACESVO(GTW_ATM_INTERFACESVO iso_INTERFACESVO)
    {
	this.iso_INTERFACESVO = iso_INTERFACESVO;
    }

    public GTW_ATM_INT_ISO_SUB_FLDSVO getSub_FLDSVO()
    {
	return sub_FLDSVO;
    }

    public void setSub_FLDSVO(GTW_ATM_INT_ISO_SUB_FLDSVO sub_FLDSVO)
    {
	this.sub_FLDSVO = sub_FLDSVO;
    }

    public GTW_ATM_INT_ISO_FLDSVO getIso_INT_FLDSVO1()
    {
	return iso_INT_FLDSVO1;
    }

    public void setIso_INT_FLDSVO1(GTW_ATM_INT_ISO_FLDSVO iso_INT_FLDSVO1)
    {
	this.iso_INT_FLDSVO1 = iso_INT_FLDSVO1;
    }

    public HashMap<String, Object> getGridsDataMap()
    {
	return gridsDataMap;
    }

    public void setGridsDataMap(HashMap<String, Object> gridsDataMap)
    {
	this.gridsDataMap = gridsDataMap;
    }

    public Map<BigDecimal, BigDecimal> getInterfaceFieldMap()
    {
        return interfaceFieldMap;
    }

    public void setInterfaceFieldMap(Map<BigDecimal, BigDecimal> interfaceFieldMap)
    {
        this.interfaceFieldMap = interfaceFieldMap;
    }

    public List<GTW_ATM_INT_ISO_FLDSVO> getIso_FLDSVOs()
    {
        return iso_FLDSVOs;
    }

    public void setIso_FLDSVOs(List<GTW_ATM_INT_ISO_FLDSVO> iso_FLDSVOs)
    {
        this.iso_FLDSVOs = iso_FLDSVOs;
    }

    public List<GTW_ATM_INT_ISO_MSGSVO> getIso_MSGSVOs()
    {
        return iso_MSGSVOs;
    }

    public void setIso_MSGSVOs(List<GTW_ATM_INT_ISO_MSGSVO> iso_MSGSVOs)
    {
        this.iso_MSGSVOs = iso_MSGSVOs;
    }

    public List<GTW_ATM_INT_ISO_SUB_FLDSVO> getIso_SUB_FLDSVOs()
    {
        return iso_SUB_FLDSVOs;
    }

    public void setIso_SUB_FLDSVOs(List<GTW_ATM_INT_ISO_SUB_FLDSVO> iso_SUB_FLDSVOs)
    {
        this.iso_SUB_FLDSVOs = iso_SUB_FLDSVOs;
    }

    public List<AtmInterfaceCO> getIsoFields()
    {
        return isoFields;
    }

    public void setIsoFields(List<AtmInterfaceCO> isoFields)
    {
        this.isoFields = isoFields;
    }
    
    public List<AtmInterfaceCO> getIsoMsgs()
    {
        return isoMsgs;
    }

    public void setIsoMsgs(List<AtmInterfaceCO> isoMsgs)
    {
        this.isoMsgs = isoMsgs;
    }

    public List<AcquirerCO> getAcquirerCOs()
    {
        return acquirerCOs;
    }

    public void setAcquirerCOs(List<AcquirerCO> acquirerCOs)
    {
        this.acquirerCOs = acquirerCOs;
    }

    public List<TerminalCO> getTerminalCOs()
    {
        return terminalCOs;
    }

    public void setTerminalCOs(List<TerminalCO> terminalCOs)
    {
        this.terminalCOs = terminalCOs;
    }

    public List<ISOMessagesDefinitionCO> getIsoMessageDefinitionCOs()
    {
        return isoMessageDefinitionCOs;
    }

    public void setIsoMessageDefinitionCOs(List<ISOMessagesDefinitionCO> isoMessageDefinitionCOs)
    {
        this.isoMessageDefinitionCOs = isoMessageDefinitionCOs;
    }

    public List<ChannelCO> getChannelCOs()
    {
        return channelCOs;
    }

    public void setChannelCOs(List<ChannelCO> channelCOs)
    {
        this.channelCOs = channelCOs;
    }

    public String getREQUEST_EXPRESSION()
    {
        return REQUEST_EXPRESSION;
    }

    public void setREQUEST_EXPRESSION(String rEQUEST_EXPRESSION)
    {
        REQUEST_EXPRESSION = rEQUEST_EXPRESSION;
    }

    public String getRESPONSE_EXPRESSION()
    {
        return RESPONSE_EXPRESSION;
    }

    public void setRESPONSE_EXPRESSION(String rESPONSE_EXPRESSION)
    {
        RESPONSE_EXPRESSION = rESPONSE_EXPRESSION;
    }

    public BigDecimal getFixedLength()
    {
        return fixedLength;
    }

    public void setFixedLength(BigDecimal fixedLength)
    {
        this.fixedLength = fixedLength;
    }

    public BigDecimal getOldISOMsgId()
    {
        return oldISOMsgId;
    }

    public void setOldISOMsgId(BigDecimal oldISOMsgId)
    {
        this.oldISOMsgId = oldISOMsgId;
    }

    public Map<BigDecimal, BigDecimal> getIsoMsgFieldMap()
    {
        return isoMsgFieldMap;
    }

    public void setIsoMsgFieldMap(Map<BigDecimal, BigDecimal> isoMsgFieldMap)
    {
        this.isoMsgFieldMap = isoMsgFieldMap;
    }

    public List<AtmIsoResponseMapCO> getAtmIsoResponseMapCOs()
    {
        return atmIsoResponseMapCOs;
    }

    public void setAtmIsoResponseMapCOs(List<AtmIsoResponseMapCO> atmIsoResponseMapCOs)
    {
        this.atmIsoResponseMapCOs = atmIsoResponseMapCOs;
    }

}