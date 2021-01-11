package com.path.atm.vo.isomessageparsing;

import java.util.ArrayList;
import java.util.List;

import com.path.atm.vo.common.ATMBaseCO;

/**
 * 
 * Copyright 2020, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: Alim Khowaja
 *
 * ISOMessageParsingCO.java used to hold data related to the ISO Message Parsing
 */
public class ISOMessageParseCO extends ATMBaseCO
{
    private String fieldCode;
    private String fieldName;
    private String fieldValue;
    private String subGridData;
    
    private List<ISOMessageParseCO>  responseISOFields = new ArrayList<ISOMessageParseCO>();
    private String responseISOMessage;
   
    public String getFieldCode()
    {
        return fieldCode;
    }
    public void setFieldCode(String fieldCode)
    {
        this.fieldCode = fieldCode;
    }
    public String getFieldName()
    {
        return fieldName;
    }
    public void setFieldName(String fieldName)
    {
        this.fieldName = fieldName;
    }
    public String getFieldValue()
    {
        return fieldValue;
    }
    public void setFieldValue(String fieldValue)
    {
        this.fieldValue = fieldValue;
    }
    public String getSubGridData()
    {
        return subGridData;
    }
    public void setSubGridData(String subGridData)
    {
        this.subGridData = subGridData;
    }
    public List<ISOMessageParseCO> getResponseISOFields()
    {
        return responseISOFields;
    }
    public void setResponseISOFields(List<ISOMessageParseCO> responseISOFields)
    {
        this.responseISOFields = responseISOFields;
    }
    public String getResponseISOMessage()
    {
        return responseISOMessage;
    }
    public void setResponseISOMessage(String responseISOMessage)
    {
        this.responseISOMessage = responseISOMessage;
    }
}