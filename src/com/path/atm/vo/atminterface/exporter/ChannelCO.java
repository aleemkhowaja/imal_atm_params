package com.path.atm.vo.atminterface.exporter;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.path.atm.vo.common.ATMBaseCO;

/**
 * 
 * Copyright 2020, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: Alim Khowaja
 *
 * ChannelCO.java used to
 */
public class ChannelCO extends ATMBaseCO
{
    private BigDecimal CHANNEL_ID;

    private String DESCRIPTION;

    private String USER_ID;

    private String CREATED_BY;
    
    private Date CREATED_DATE;

    private String STATUS;

    private String ACTIVE_QUEUE_YN;

    private String COMMUNICATION_PROTOCOL;

    private String HTTP_PASSWORD;

    private BigDecimal HTTP_REQUEST_TIME_OUT;

    private String HTTP_USER;

    private BigDecimal INTERFACE_CODE;

    private String IP_ADDRESS;

    private BigDecimal PARALLELISM_CONTROL;

    private String PORT;

    private String SERVER_TYPE;

    private BigDecimal SOCKET_RESTART_INTERVAL;

    private String END_POINT;

    private String TO_BE_STATUS;
    
    private ChannelISOIntParamsCO isoIntParamsCO = new ChannelISOIntParamsCO();

    public BigDecimal getCHANNEL_ID()
    {
        return CHANNEL_ID;
    }

    public void setCHANNEL_ID(BigDecimal cHANNEL_ID)
    {
        CHANNEL_ID = cHANNEL_ID;
    }

    public String getDESCRIPTION()
    {
        return DESCRIPTION;
    }

    public void setDESCRIPTION(String dESCRIPTION)
    {
        DESCRIPTION = dESCRIPTION;
    }

    public String getUSER_ID()
    {
        return USER_ID;
    }

    public void setUSER_ID(String uSER_ID)
    {
        USER_ID = uSER_ID;
    }

    public String getCREATED_BY()
    {
        return CREATED_BY;
    }

    public void setCREATED_BY(String cREATED_BY)
    {
        CREATED_BY = cREATED_BY;
    }
    
    public Date getCREATED_DATE()
    {
        return CREATED_DATE;
    }

    public void setCREATED_DATE(Date cREATED_DATE)
    {
        CREATED_DATE = cREATED_DATE;
    }

    public String getSTATUS()
    {
        return STATUS;
    }

    public void setSTATUS(String sTATUS)
    {
        STATUS = sTATUS;
    }

    public String getACTIVE_QUEUE_YN()
    {
        return ACTIVE_QUEUE_YN;
    }

    public void setACTIVE_QUEUE_YN(String aCTIVE_QUEUE_YN)
    {
        ACTIVE_QUEUE_YN = aCTIVE_QUEUE_YN;
    }

    public String getCOMMUNICATION_PROTOCOL()
    {
        return COMMUNICATION_PROTOCOL;
    }

    public void setCOMMUNICATION_PROTOCOL(String cOMMUNICATION_PROTOCOL)
    {
        COMMUNICATION_PROTOCOL = cOMMUNICATION_PROTOCOL;
    }

    public String getHTTP_PASSWORD()
    {
        return HTTP_PASSWORD;
    }

    public void setHTTP_PASSWORD(String hTTP_PASSWORD)
    {
        HTTP_PASSWORD = hTTP_PASSWORD;
    }

    public BigDecimal getHTTP_REQUEST_TIME_OUT()
    {
        return HTTP_REQUEST_TIME_OUT;
    }

    public void setHTTP_REQUEST_TIME_OUT(BigDecimal hTTP_REQUEST_TIME_OUT)
    {
        HTTP_REQUEST_TIME_OUT = hTTP_REQUEST_TIME_OUT;
    }

    public String getHTTP_USER()
    {
        return HTTP_USER;
    }

    public void setHTTP_USER(String hTTP_USER)
    {
        HTTP_USER = hTTP_USER;
    }

    public BigDecimal getINTERFACE_CODE()
    {
        return INTERFACE_CODE;
    }

    public void setINTERFACE_CODE(BigDecimal iNTERFACE_CODE)
    {
        INTERFACE_CODE = iNTERFACE_CODE;
    }

    public String getIP_ADDRESS()
    {
        return IP_ADDRESS;
    }

    public void setIP_ADDRESS(String iP_ADDRESS)
    {
        IP_ADDRESS = iP_ADDRESS;
    }

    public BigDecimal getPARALLELISM_CONTROL()
    {
        return PARALLELISM_CONTROL;
    }

    public void setPARALLELISM_CONTROL(BigDecimal pARALLELISM_CONTROL)
    {
        PARALLELISM_CONTROL = pARALLELISM_CONTROL;
    }

    public String getPORT()
    {
        return PORT;
    }

    public void setPORT(String pORT)
    {
        PORT = pORT;
    }

    public String getSERVER_TYPE()
    {
        return SERVER_TYPE;
    }

    public void setSERVER_TYPE(String sERVER_TYPE)
    {
        SERVER_TYPE = sERVER_TYPE;
    }

    public BigDecimal getSOCKET_RESTART_INTERVAL()
    {
        return SOCKET_RESTART_INTERVAL;
    }

    public void setSOCKET_RESTART_INTERVAL(BigDecimal sOCKET_RESTART_INTERVAL)
    {
        SOCKET_RESTART_INTERVAL = sOCKET_RESTART_INTERVAL;
    }

    public String getEND_POINT()
    {
        return END_POINT;
    }

    public void setEND_POINT(String eND_POINT)
    {
        END_POINT = eND_POINT;
    }

    public String getTO_BE_STATUS()
    {
        return TO_BE_STATUS;
    }

    public void setTO_BE_STATUS(String tO_BE_STATUS)
    {
        TO_BE_STATUS = tO_BE_STATUS;
    }

    public ChannelISOIntParamsCO getIsoIntParamsCO()
    {
        return isoIntParamsCO;
    }

    public void setIsoIntParamsCO(ChannelISOIntParamsCO isoIntParamsCO)
    {
        this.isoIntParamsCO = isoIntParamsCO;
    }

    
}