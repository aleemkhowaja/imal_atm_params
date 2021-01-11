package com.path.atm.dao.atminterface;

import java.util.List;

import com.path.atm.dbmaps.vo.GTW_ATM_INTERFACESVO;
import com.path.atm.dbmaps.vo.GTW_ATM_INT_ISO_FLDSVO;
import com.path.atm.dbmaps.vo.GTW_ATM_INT_ISO_MSGSVO;
import com.path.atm.dbmaps.vo.GTW_ATM_INT_ISO_SUB_FLDSVO;
import com.path.atm.vo.atminterface.AtmInterfaceCO;
import com.path.atm.vo.atminterface.AtmInterfaceSC;
import com.path.lib.common.exception.DAOException;

/**
 * 
 * Copyright 2019, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: Alim Khowaja
 *
 * AtmInterfaceDAO.java used to
 */
public interface AtmInterfaceDAO
{
	/**
	 * Method used to return List of IsoFields
	 * @param criteria Search Criteria Parameter
	 * @return List Result
	 * @throws DAOException
	 */
	public List returnIsoFieldsList(AtmInterfaceSC criteria) throws DAOException;
	
	/**
	 * Method used to return Count of IsoFields
	 * @param criteria Search Criteria Parameter
	 * @return int Result number of Records
	 * @throws DAOException
	 */	
	public int returnIsoFieldsListCount(AtmInterfaceSC criteria) throws DAOException;
	
	/**
	 * Method used to return List of Interfaces
	 * @param criteria Search Criteria Parameter
	 * @return List Result
	 * @throws DAOException
	 */
	public List returnInterfaceList(AtmInterfaceSC criteria) throws DAOException;
	
	/**
	 * Method used to return Count of Interfaces
	 * @param criteria Search Criteria Parameter
	 * @return int Result number of Records
	 * @throws DAOException
	 */	
	public int returnInterfaceListCount(AtmInterfaceSC criteria) throws DAOException;
	
	/**
	 * Method used to return New Interface ID
	 * @param criteria Search Criteria Parameter
	 * @throws DAOException
	 */
	public int returnNewInterfaceId(AtmInterfaceSC criteria) throws DAOException;
	
	/**
	 * Method used to return New Message CODE
	 * @param criteria Search Criteria Parameter
	 * @throws DAOException
	 */
	public int returnNewMessageCode(AtmInterfaceSC criteria) throws DAOException;
	
	/**
	 * Method used to return List of Messages
	 * @param criteria Search Criteria Parameter
	 * @return List Result
	 * @throws DAOException
	 */
	public List returnMessageList(AtmInterfaceSC criteria) throws DAOException;

	/**
	 * Method used to return Count of Messages
	 * @param criteria Search Criteria Parameter
	 * @return int Result number of Records
	 * @throws DAOException
	 */	
	public int returnMessageListCount (AtmInterfaceSC criteria) throws DAOException;
	
	/**
	 * Method to Load Message by ID
	 * @param AtmInterfaceSC 
	 * @return AtmInterfaceCO 
	 * @throws DAOException
	 */
	public AtmInterfaceCO returnMessageByCode(AtmInterfaceSC criteria) throws DAOException;
	
	/**
	 * Method used to return List of Fields
	 * @param criteria Search Criteria Parameter
	 * @return List Result
	 * @throws DAOException
	 */
	public List returnFieldsList(AtmInterfaceSC criteria) throws DAOException;

	/**
	 * Method used to return Count of Fields
	 * @param criteria Search Criteria Parameter
	 * @return int Result number of Records
	 * @throws DAOException
	 */	
	public int returnFieldsListCount (AtmInterfaceSC criteria) throws DAOException;
	
	/**
	 * Method to Load Interface Details by ID
	 * @param AtmInterfaceSC 
	 * @return AtmInterfaceCO 
	 * @throws DAOException
	 */
	public AtmInterfaceCO returnInterfaceById(AtmInterfaceSC criteria) throws DAOException;
	
	 /**
     * return ProgOrder
     * @return
     * @throws DAOException
     */
	public int returnProgOrder() throws DAOException;
	
	/**
	 * Method used to return List of Sub Fields
	 * @param criteria Search Criteria Parameter
	 * @return List Result
	 * @throws DAOException
	 */
	public List returnIsoSubFieldsList(AtmInterfaceSC criteria) throws DAOException;
	
	 /**
	 * Method used to return Count of Sub Fields
	 * @param criteria Search Criteria Parameter
	 * @return int Result number of Records
	 * @throws DAOException
	 */	
	public int returnIsoSubFieldsListCount(AtmInterfaceSC criteria) throws DAOException;
	
	/**
	 * Method used to return List of Fields By Bitmap
	 * @param criteria Search Criteria Parameter
	 * @return List Result
	 * @throws DAOException
	 */
	public List returnFieldListByBitmap(AtmInterfaceSC criteria) throws DAOException;
	
	/**
	 * Used to save Interface Record
	 * @param atm_INTERFACESVO
	 * @return
	 * @throws DAOException
	 */
	public Integer saveGTW_ATM_INTERFACESVO(GTW_ATM_INTERFACESVO atm_INTERFACESVO) throws DAOException;
	
	/**
	 *  Used to save Interface Fields
	 * @param gtw_ATM_INT_ISO_FLDSVO
	 * @return
	 * @throws DAOException
	 */
	public Integer saveGTW_ATM_INT_ISO_FLDSVO(GTW_ATM_INT_ISO_FLDSVO gtw_ATM_INT_ISO_FLDSVO) throws DAOException;
	
	/**
	 * Used to save Interface Sub Fields
	 * @param gtw_ATM_INT_ISO_SUB_FLDSVO
	 * @return
	 * @throws DAOException
	 */
	public Integer saveGTW_ATM_INT_ISO_SUB_FLDSVO(GTW_ATM_INT_ISO_SUB_FLDSVO gtw_ATM_INT_ISO_SUB_FLDSVO) throws DAOException;
	
	/**
	 * Used to save Interface Message
	 * @param gtw_ATM_INT_ISO_MSGSVO
	 * @return
	 * @throws DAOException
	 */
	public Integer saveGTW_ATM_INT_ISO_MSGSVO(GTW_ATM_INT_ISO_MSGSVO gtw_ATM_INT_ISO_MSGSVO) throws DAOException;
}
