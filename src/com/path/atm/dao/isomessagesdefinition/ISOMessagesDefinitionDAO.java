package com.path.atm.dao.isomessagesdefinition;

import java.util.List;

import com.path.atm.dbmaps.vo.GTW_ATM_ISO_MSG_DEFVO;
import com.path.atm.dbmaps.vo.GTW_ATM_ISO_NET_MSG_FLDSVO;
import com.path.atm.vo.isomessagesdefinition.ISOMessagesDefinitionCO;
import com.path.atm.vo.isomessagesdefinition.ISOMessagesDefinitionSC;
import com.path.lib.common.exception.DAOException;

/**
 * 
 * Copyright 2019, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: Alim Khowaja
 *
 * ISOMessagesDefinitionDAO.java used to
 */
public interface ISOMessagesDefinitionDAO
{

    /**
     * 
     * Return ISO Messages Definition List
     * 
     * @param criteria
     * @return
     * @throws DAOException
     */
    public List returnISOMessagesDefinitionList(ISOMessagesDefinitionSC criteria) throws DAOException;

    /**
     * return ISO Messages Definition List count
     * 
     * @param criteria
     * @return
     * @throws DAOException
     */
    public int returnISOMessagesDefinitionListCount(ISOMessagesDefinitionSC criteria) throws DAOException;

    /**
     * return Acquirer by id
     * 
     * @param criteria
     * @return
     * @throws DAOException
     */
    public ISOMessagesDefinitionCO edit(ISOMessagesDefinitionSC criteria) throws DAOException;
    
    /**
     * save GTW_ATM_ISO_NET_MSG_FLDS
     * @param atm_ISO_NET_MSG_FLDSVO
     * @return
     * @throws DAOException
     */
    public Integer saveGTW_ATM_ISO_NET_MSG_FLDS(GTW_ATM_ISO_NET_MSG_FLDSVO atm_ISO_NET_MSG_FLDSVO) throws DAOException;
    
    /**
     * save GTW_ATM_ISO_MSG_DEF
     * 
     * @param gtw_ATM_ACQUIRERVO
     * @return
     * @throws DAOException
     */
    public Integer saveGTW_ATM_ISO_MSG_DEFVO(GTW_ATM_ISO_MSG_DEFVO gtw_ATM_ISO_MSG_DEFVO) throws DAOException;
    
    
    /**
     * Delete Mappings of ISO Message Definition
     * @param criteria
     * @throws DAOException
     */
    public int deleteATMISOMessagesByMappingId(ISOMessagesDefinitionSC criteria) throws DAOException;
    
    /**
     * 
     * Return ISO Message Definition Network Request and Response Fields List
     * 
     * @param criteria
     * @return
     * @throws DAOException
     */
    public List returnIsoMessagesDefNetFldsList(ISOMessagesDefinitionSC criteria) throws DAOException;

    /**
     * return ISO Message Definition Network Request and Response Fields Count
     * 
     * @param criteria
     * @return
     * @throws DAOException
     */
    public int returnIsoMessagesDefNetFldsCount(ISOMessagesDefinitionSC criteria) throws DAOException;

    /**
     * Delete ISO Message Definition Network Request and Response Fields
     * @param criteria
     * @return
     * @throws DAOException
     */
    public int deleteIsoMessagesDefNetFlds(ISOMessagesDefinitionSC criteria) throws DAOException;

}