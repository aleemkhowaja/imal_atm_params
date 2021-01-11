package com.path.atm.vo.atminterface.exporter;

import java.math.BigDecimal;

import com.path.atm.vo.common.ATMBaseCO;

/**
 * 
 * Copyright 2020, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: Alim Khowaja
 *
 * ChannelISOIntParamsCO.java used to Hold ISO interface Params
 */
public class ChannelISOIntParamsCO extends ATMBaseCO
{
    private BigDecimal GTW_CHANNEL_PARAMS_ID;

    private BigDecimal CHANNEL_ID;

    private BigDecimal ENGN_ACCEPTOR_WORKER_NO;

    private BigDecimal ENGN_WORKER_NO;

    private String ENGN_ADD_LOGGING_HANDLER_YN;

    private String ENGN_ADD_ECHO_MSG_LISTENER_YN;

    private String ENGN_LOG_FIELD_DESCRIPTION_YN;

    private String ENGN_LOG_SENSITIVE_DATA_YN;

    private String ENGN_REPLY_ON_ERROR_YN;

    private BigDecimal ENGN_IDLE_TIMEOUT;

    private String ENGN_CHARSET;

    private BigDecimal TASK_CONTAINER_CONSUMER_NO;

    private BigDecimal TASK_CONTAINER_SESSION_NO;

    private String TASK_CONTAINER_DESTINATION;

    public BigDecimal getGTW_CHANNEL_PARAMS_ID()
    {
        return GTW_CHANNEL_PARAMS_ID;
    }

    public void setGTW_CHANNEL_PARAMS_ID(BigDecimal gTW_CHANNEL_PARAMS_ID)
    {
        GTW_CHANNEL_PARAMS_ID = gTW_CHANNEL_PARAMS_ID;
    }

    public BigDecimal getCHANNEL_ID()
    {
        return CHANNEL_ID;
    }

    public void setCHANNEL_ID(BigDecimal cHANNEL_ID)
    {
        CHANNEL_ID = cHANNEL_ID;
    }

    public BigDecimal getENGN_ACCEPTOR_WORKER_NO()
    {
        return ENGN_ACCEPTOR_WORKER_NO;
    }

    public void setENGN_ACCEPTOR_WORKER_NO(BigDecimal eNGN_ACCEPTOR_WORKER_NO)
    {
        ENGN_ACCEPTOR_WORKER_NO = eNGN_ACCEPTOR_WORKER_NO;
    }

    public BigDecimal getENGN_WORKER_NO()
    {
        return ENGN_WORKER_NO;
    }

    public void setENGN_WORKER_NO(BigDecimal eNGN_WORKER_NO)
    {
        ENGN_WORKER_NO = eNGN_WORKER_NO;
    }

    public String getENGN_ADD_LOGGING_HANDLER_YN()
    {
        return ENGN_ADD_LOGGING_HANDLER_YN;
    }

    public void setENGN_ADD_LOGGING_HANDLER_YN(String eNGN_ADD_LOGGING_HANDLER_YN)
    {
        ENGN_ADD_LOGGING_HANDLER_YN = eNGN_ADD_LOGGING_HANDLER_YN;
    }

    public String getENGN_ADD_ECHO_MSG_LISTENER_YN()
    {
        return ENGN_ADD_ECHO_MSG_LISTENER_YN;
    }

    public void setENGN_ADD_ECHO_MSG_LISTENER_YN(String eNGN_ADD_ECHO_MSG_LISTENER_YN)
    {
        ENGN_ADD_ECHO_MSG_LISTENER_YN = eNGN_ADD_ECHO_MSG_LISTENER_YN;
    }

    public String getENGN_LOG_FIELD_DESCRIPTION_YN()
    {
        return ENGN_LOG_FIELD_DESCRIPTION_YN;
    }

    public void setENGN_LOG_FIELD_DESCRIPTION_YN(String eNGN_LOG_FIELD_DESCRIPTION_YN)
    {
        ENGN_LOG_FIELD_DESCRIPTION_YN = eNGN_LOG_FIELD_DESCRIPTION_YN;
    }

    public String getENGN_LOG_SENSITIVE_DATA_YN()
    {
        return ENGN_LOG_SENSITIVE_DATA_YN;
    }

    public void setENGN_LOG_SENSITIVE_DATA_YN(String eNGN_LOG_SENSITIVE_DATA_YN)
    {
        ENGN_LOG_SENSITIVE_DATA_YN = eNGN_LOG_SENSITIVE_DATA_YN;
    }

    public String getENGN_REPLY_ON_ERROR_YN()
    {
        return ENGN_REPLY_ON_ERROR_YN;
    }

    public void setENGN_REPLY_ON_ERROR_YN(String eNGN_REPLY_ON_ERROR_YN)
    {
        ENGN_REPLY_ON_ERROR_YN = eNGN_REPLY_ON_ERROR_YN;
    }

    public BigDecimal getENGN_IDLE_TIMEOUT()
    {
        return ENGN_IDLE_TIMEOUT;
    }

    public void setENGN_IDLE_TIMEOUT(BigDecimal eNGN_IDLE_TIMEOUT)
    {
        ENGN_IDLE_TIMEOUT = eNGN_IDLE_TIMEOUT;
    }

    public String getENGN_CHARSET()
    {
        return ENGN_CHARSET;
    }

    public void setENGN_CHARSET(String eNGN_CHARSET)
    {
        ENGN_CHARSET = eNGN_CHARSET;
    }

    public BigDecimal getTASK_CONTAINER_CONSUMER_NO()
    {
        return TASK_CONTAINER_CONSUMER_NO;
    }

    public void setTASK_CONTAINER_CONSUMER_NO(BigDecimal tASK_CONTAINER_CONSUMER_NO)
    {
        TASK_CONTAINER_CONSUMER_NO = tASK_CONTAINER_CONSUMER_NO;
    }

    public BigDecimal getTASK_CONTAINER_SESSION_NO()
    {
        return TASK_CONTAINER_SESSION_NO;
    }

    public void setTASK_CONTAINER_SESSION_NO(BigDecimal tASK_CONTAINER_SESSION_NO)
    {
        TASK_CONTAINER_SESSION_NO = tASK_CONTAINER_SESSION_NO;
    }

    public String getTASK_CONTAINER_DESTINATION()
    {
        return TASK_CONTAINER_DESTINATION;
    }

    public void setTASK_CONTAINER_DESTINATION(String tASK_CONTAINER_DESTINATION)
    {
        TASK_CONTAINER_DESTINATION = tASK_CONTAINER_DESTINATION;
    }
}