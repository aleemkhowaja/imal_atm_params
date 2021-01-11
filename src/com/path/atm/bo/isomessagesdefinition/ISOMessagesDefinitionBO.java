package com.path.atm.bo.isomessagesdefinition;

import java.util.List;

import org.apache.struts2.json.JSONException;

import com.path.atm.vo.isomessagesdefinition.ISOMessagesDefinitionCO;
import com.path.atm.vo.isomessagesdefinition.ISOMessagesDefinitionSC;
import com.path.lib.common.exception.BaseException;

/**
 * 
 * Copyright 2020, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: Alim Khowaja
 *
 * ISOMessagesDefinitionBO.java used to
 */
public interface ISOMessagesDefinitionBO 
{
    
    /**
     * return ISO Messages Definition List
     * 
     * @param criteria
     * @return
     * @throws BaseException
     */
    public List returnISOMessagesDefinitionList(ISOMessagesDefinitionSC criteria) throws BaseException;

    /**
     *  return ISO Messages Definition List count
     * 
     * @param criteria
     * @return
     * @throws BaseException
     */
    public int returnISOMessagesDefinitionListCount(ISOMessagesDefinitionSC criteria) throws BaseException;

    /**
     * Save ISO Messages Definition
     * 
     * @param acquirerCO
     * @return
     * @throws BaseException
     */
    public ISOMessagesDefinitionCO save(ISOMessagesDefinitionCO isoMessagesDefinitionCO) throws BaseException, Exception ;
    
    /**
     * edit ISO Messages Definition
     * 
     * @param sc
     * @return
     * @throws BaseException
     */
    public ISOMessagesDefinitionCO edit(ISOMessagesDefinitionSC criteria) throws BaseException, Exception;

    /**
     * Delete ISO Messages Definition
     * 
     * @param acquirerCO
     * @throws BaseException
     */
    public void delete(ISOMessagesDefinitionCO isoMessagesDefinitionCO) throws BaseException;

    /**
     * make readonly fields
     * 
     * @param acquirerCO
     * @return
     * @throws BaseException
     */
    public ISOMessagesDefinitionCO applySysParamSettings(ISOMessagesDefinitionCO isoMessagesDefinitionCO) throws BaseException;
    
    
    /**
     * return ISO Fields by MTI code and Interface
     * @param criteria
     * @return
     * @throws BaseException
     */
    public List returnFieldsByInterfaceCodeAndMTICOde(ISOMessagesDefinitionSC criteria) throws BaseException;
    
    /**
     * return Req and Response Fields by interface and mti
     * @param criteria
     * @return
     * @throws BaseException
     */
    public List returnISOMsgFieldsByInterfaceCodeAndMTICOde(ISOMessagesDefinitionSC criteria) throws BaseException;
    
    /**
     * return ISO Message Definition Network Fields
     * @param isoMessagesDefinitionCO
     * @return
     * @throws BaseException
     * @throws JSONException
     */
    public List returnIsoMessagesDefNetFldsList(ISOMessagesDefinitionCO isoMessagesDefinitionCO) throws BaseException;

    
}