package com.path.atm.actions.atminterface;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.path.atm.actions.common.base.ATMBaseAction;
import com.path.atm.bo.atminterface.AtmInterfaceBO;
import com.path.atm.bo.atminterface.AtmInterfaceConstants;
import com.path.atm.bo.common.ATMCommonConstants;
import com.path.atm.dbmaps.vo.GTW_ATM_INT_ISO_MSGSVO;
import com.path.atm.vo.atminterface.AtmInterfaceCO;
import com.path.atm.vo.atminterface.AtmInterfaceSC;
import com.path.bo.common.ConstantsCommon;
import com.path.dbmaps.vo.SYS_PARAM_SCREEN_DISPLAYVO;
import com.path.lib.common.util.StringUtil;
import com.path.lib.vo.GridUpdates;
import com.path.vo.common.SessionCO;
import com.path.vo.common.select.SelectCO;
import com.path.vo.common.select.SelectSC;

/**
 * 
 * Copyright 2019, Path Solutions Path Solutions retains all ownership rights to
 * this source code
 * 
 * @author: Alim Khowaja
 *
 * ATMInterfaceMaintAction.java used to
 */
public class ATMInterfaceMaintAction extends ATMBaseAction
{
    private String isoMessageGridData;
    private String isoFieldsGridData;
    private String subFieldsGridData;
    private String updates1;

    private BigDecimal interfaceId;

    private AtmInterfaceBO atmInterfaceBO;
    private AtmInterfaceCO atmInterfaceCO;
    AtmInterfaceSC criteria = new AtmInterfaceSC();
    private GTW_ATM_INT_ISO_MSGSVO iso_INT_MSGSVO = new GTW_ATM_INT_ISO_MSGSVO();

    private List<SelectCO> interfaceTypeList = new ArrayList<SelectCO>();
    private List<SelectCO> bitMapTypeList = new ArrayList<SelectCO>();
    private List<SelectCO> lengthTypeList = new ArrayList<SelectCO>();
    private List<SelectCO> dataTypeList = new ArrayList<SelectCO>();
    private List<SelectCO> messageTypeList = new ArrayList<SelectCO>();
    private List<SelectCO> interfaceMessageTypeList = new ArrayList<SelectCO>();
    
    
    public String loadInterfaceDetails()
    {
	try
	{
	    SessionCO sessionCO = returnSessionObject();
	    criteria.setCompCode(sessionCO.getCompanyCode());
	    criteria.setCurrAppName(sessionCO.getCurrentAppName());
	    criteria.setPreferredLanguage(sessionCO.getLanguage());
	    criteria.setInterfaceTypeLovId(AtmInterfaceConstants.INTERFACE_TYPE);
	    criteria.setLovTypeId(ATMCommonConstants.COMMON_STATUS_LOV);
	    criteria.setCrudMode(getIv_crud());
	    criteria.setPageRef(get_pageRef());
	    atmInterfaceCO = atmInterfaceBO.returnInterfaceById(criteria);

	    atmInterfaceCO.setStatusColorCode(getStatusColorCode(atmInterfaceCO.getIso_INTERFACESVO().getSTATUS(),
		    ATMCommonConstants.STATUS_COLOR_CODE_B));

	    populateComboBoxes();
	    // Set Fields Read only
	    if(ATMCommonConstants.IV_CRUD_APPROVE.equals(getIv_crud())
		    || ATMCommonConstants.IV_CRUD_SUSPENDED.equals(getIv_crud())
		    || ATMCommonConstants.IV_CRUD_REACTIVATE.equals(getIv_crud())
		    || ATMCommonConstants.STATUS_APPROVED.equals(atmInterfaceCO.getIso_INTERFACESVO().getSTATUS())
		    || ATMCommonConstants.STATUS_DELETED.equals(atmInterfaceCO.getIso_INTERFACESVO().getSTATUS())
		    || ATMCommonConstants.IV_CRUD_SUSPENDED
			    .equals(atmInterfaceCO.getIso_INTERFACESVO().getSTATUS()))
	    {
		set_recReadOnly(ConstantsCommon.TRUE);
	    }
	    else
	    {
		set_recReadOnly(ConstantsCommon.FALSE);
	    }
	    if(ATMCommonConstants.IV_CRUD_UPDATE_AFTER_APPROVE.equals(getIv_crud()))
	    {
		// Making Fields Read only
		HashMap<String, SYS_PARAM_SCREEN_DISPLAYVO> hm = new HashMap<String, SYS_PARAM_SCREEN_DISPLAYVO>();
		SYS_PARAM_SCREEN_DISPLAYVO buisnessElement = new SYS_PARAM_SCREEN_DISPLAYVO();
		buisnessElement.setIS_READONLY(BigDecimal.ONE);
		// hm.put("atm_desc", buisnessElement);
		setAdditionalScreenParams(hm);
		set_recReadOnly(ConstantsCommon.FALSE);
	    }
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	    return "successJSON";
	}
	return "aTMInterfaceMaint";
    }

    public static String removeLastChar(String s)
    {
	return (s == null || s.length() == 0) ? null : (s.substring(0, s.length() - 3));
    }

    /**
     * Method Save ATM Interface
     */
    public String saveInterface()
    {
	try
	{
	    HashMap<String, Object> gridsDataMap = new HashMap<String, Object>();
	    List messageListAdd = null, fieldsListAdd = null, messageListDelete = null, messageListModify = null;

	    // get data from ISO Messages grid
	    if(StringUtil.isNotEmpty(isoMessageGridData))
	    {
		GridUpdates messageGridUpdates = getGridUpdates(isoMessageGridData, AtmInterfaceCO.class);
		messageListAdd = messageGridUpdates.getLstAdd();
		messageListModify = messageGridUpdates.getLstModify();
		messageListDelete = messageGridUpdates.getLstDelete();
	    }
	    gridsDataMap.put("messageAdd", messageListAdd);
	    gridsDataMap.put("messageModify", messageListModify);
	    gridsDataMap.put("messageDelete", messageListDelete);

	    // get data from ISO Fields grid
	    if(StringUtil.isNotEmpty(isoFieldsGridData))
	    {
		GridUpdates fieldsGridUpdates = getGridUpdates(isoFieldsGridData, AtmInterfaceCO.class, true);
		fieldsListAdd = fieldsGridUpdates.getLstAllRec();
	    }
	    gridsDataMap.put("fieldAdd", fieldsListAdd);

	    gridsDataMap.put("subFieldGrid", retAllSubGridsData());
	    atmInterfaceCO.setGridsDataMap(gridsDataMap);
	    applySessionValues();
	    atmInterfaceCO = atmInterfaceBO.saveUpdateATMInterface(atmInterfaceCO);
	}
	catch(Exception ex)
	{
	    handleException(ex, null, null);
	}
	return SUCCESS;
    }

    /**
     * Method to Parse All subGrids into CO and Return Map
     * 
     * @return
     */
    private List retAllSubGridsData()
    {
	List subGridList = new ArrayList();
	/**
	 * Parse sub-Fields Data from JSON to CO
	 */
	String toSkip = "{\"root,{\"";
	subFieldsGridData = subFieldsGridData.replace("{\"root\":{}},", "");
	subFieldsGridData = subFieldsGridData.replace(",{\"root\":{}}", "");
	subFieldsGridData = subFieldsGridData.replace("{\"root\":{}}", "");

	subFieldsGridData = subFieldsGridData.replace("{\"root\":[]},", "");
	subFieldsGridData = subFieldsGridData.replace(",{\"root\":[]}", "");
	subFieldsGridData = subFieldsGridData.replace("\"}]},{\"root\":[{\"", "\"},{\"");

	// If Sub grids are there
	if(StringUtil.isNotEmpty(subFieldsGridData))
	{
	    /*
	     * // Split JSON with Root String[] innerGridData =
	     * subFieldsGridData.split("root"); // Check if data available
	     * if(innerGridData.length > 0) { String gridData = ""; for(int i =
	     * 0; i < innerGridData.length; i++) {
	     *//**
	        * Prepend {"root to make JSON proper to be parsed with
	        * getGridUpdates
	        *//*
		   * gridData = "{\"root" + innerGridData[i];
		   * if(!toSkip.equals(gridData)) { // Remove invalid chars
		   * if(gridData.endsWith(",{\"")) { gridData =
		   * removeLastChar(gridData); }
		   */
	    // Parse JSON and get Data in CO list
	    GridUpdates subFieldsGridUpdates = getGridUpdates(subFieldsGridData, AtmInterfaceCO.class, true);
	    subGridList = subFieldsGridUpdates.getLstAllRec();
	    // subGirdsDataMap.put(i, subGridList);
	    // }// end If
	    // }// end Loop
	    // }// end inner if
	}// end outer if
	return subGridList;
    }

    /**
     * Method to empty Interface Screen
     * 
     * @return
     */
    public String atmInterfaceEmptyForm()
    {
	try
	{
	    atmInterfaceCO = new AtmInterfaceCO();

	    atmInterfaceCO.setStatusDesc(getText(ATMCommonConstants.ACTIVE));
	    // set Color in Status Description
	    atmInterfaceCO.setStatusColorCode(getStatusColorCode(ATMCommonConstants.STATUS_ACTIVE,
		    ATMCommonConstants.STATUS_COLOR_CODE_B));

	    populateComboBoxes();
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return "aTMInterfaceMaint";
    }

    /**
     * Method to Delete ATM Interface
     * 
     * @return
     */
    public String deleteForm()
    {
	try
	{
	    applySessionValues();
	    atmInterfaceBO.deleteInterface(atmInterfaceCO);
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return SUCCESS;
    }

    /**
     * Method to Approve, Reject, Suspend OR Reactivate the ATM Interface
     * 
     * @return
     */
    public String handleStatusProcess()
    {
	try
	{
	    applySessionValues();
	    atmInterfaceBO.handleStatusProcess(atmInterfaceCO);
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return SUCCESS;
    }

    /**
     * Load ATM Interface Page
     */
    public String loadInterfacePage()
    {
	try
	{
	    set_showSmartInfoBtn("false");
	    if(interfaceId != null && !ConstantsCommon.EMPTY_BIGDECIMAL_VALUE.equals(interfaceId))
	    {
		set_showNewInfoBtn("false");
		set_showSmartInfoBtn("false");
		SessionCO sessionCO = returnSessionObject();
		criteria.setCompCode(sessionCO.getCompanyCode());
		criteria.setCurrAppName(sessionCO.getCurrentAppName());
		criteria.setPreferredLanguage(sessionCO.getLanguage());
		// criteria.setTcpTypeLovId(AtmInterfaceConstants.INTERFACE_TYPE);
		criteria.setLovTypeId(ATMCommonConstants.COMMON_STATUS_LOV);
		criteria.setCrudMode(getIv_crud());
		criteria.setPageRef(get_pageRef());
		criteria.setInterfaceId(interfaceId);
		atmInterfaceCO = atmInterfaceBO.returnInterfaceById(criteria);
		
		//set Status to action common variable for buttons visibility
		set_recStatus(atmInterfaceCO.getIso_INTERFACESVO().getSTATUS());

		atmInterfaceCO.setStatusColorCode(getStatusColorCode(atmInterfaceCO.getIso_INTERFACESVO().getSTATUS(),
			ATMCommonConstants.STATUS_COLOR_CODE_B));
	    }
	    else
	    {
		set_searchGridId("interfaceListGridTbl_Id");

		if(ATMCommonConstants.IV_CRUD_MAINTENANCE.equals(getIv_crud()))
		{
		    atmInterfaceCO = new AtmInterfaceCO();
		    set_showNewInfoBtn("true");
		    set_showSmartInfoBtn("false");

		    atmInterfaceCO.setStatusDesc(getText(ATMCommonConstants.ACTIVE));
		    // set Color in Status Description
		    atmInterfaceCO.setStatusColorCode(getStatusColorCode(ATMCommonConstants.STATUS_ACTIVE,
			    ATMCommonConstants.STATUS_COLOR_CODE_B));
		}
	    }
	    set_recReadOnly(ConstantsCommon.FALSE);
	    populateComboBoxes();
	}
	catch(Exception ex)
	{
	    handleException(ex, null, null);
	}
	return "aTMInterfaceList";
    }

    /**
     * Method to Apply Session values
     * 
     * @return
     */
    private void applySessionValues()
    {
	if(atmInterfaceCO == null)
	{
	    atmInterfaceCO = new AtmInterfaceCO();
	}
	SessionCO sessionCO = returnSessionObject();
	atmInterfaceCO.setCompCode(sessionCO.getCompanyCode());
	atmInterfaceCO.setUserId(sessionCO.getUserName());
	atmInterfaceCO.setRunningDate(sessionCO.getRunningDateRET());
	atmInterfaceCO.setBranchCode(sessionCO.getBranchCode());
	atmInterfaceCO.setAppName(sessionCO.getCurrentAppName());
	atmInterfaceCO.setLanguage(sessionCO.getLanguage());
	
	criteria.setUserId(sessionCO.getUserName());
	criteria.setRunningDate(sessionCO.getRunningDateRET());
	criteria.setCompCode(sessionCO.getCompanyCode());
    }

    /**
     * Method to load Dropdowns for ATM Interface Maintenance Page
     * 
     * @return
     */
    private void populateComboBoxes()
    {
	try
	{
	    SessionCO sessionCO = returnSessionObject();
	    // DropDown for Type
	    SelectSC selSC = new SelectSC(AtmInterfaceConstants.INTERFACE_TYPE);
	    selSC.setLanguage(sessionCO.getLanguage());
	    if(StringUtil.nullToEmpty(sessionCO.getCurrentAppName()).equals(ATMCommonConstants.APP_NAME_ATMP))
	    {
		 selSC.setLovCodesInlude("'" + AtmInterfaceConstants.ISO_INTERFACE + "'");
	    }
	    interfaceTypeList = returnLOV(selSC);

	    // DropDown for Bitmap
	    selSC = new SelectSC(AtmInterfaceConstants.BITMAP_TYPE);
	    selSC.setLanguage(sessionCO.getLanguage());
	    bitMapTypeList.add(new SelectCO("", " "));
	    bitMapTypeList.addAll(returnLOV(selSC));

	    // DropDown for Length
	    selSC = new SelectSC(AtmInterfaceConstants.LENGTH_TYPE);
	    selSC.setLanguage(sessionCO.getLanguage());
	    selSC.setOrderCriteria("ORDER");
	    lengthTypeList.add(new SelectCO("", " "));
	    lengthTypeList.addAll(returnLOV(selSC));

	    // DropDown for Interface Message Type
	    interfaceMessageTypeList.add(new SelectCO("1", "ISO 8583"));
	    interfaceMessageTypeList.add(new SelectCO("2", "XML"));
	    interfaceMessageTypeList.add(new SelectCO("3", "JSON"));
	    interfaceMessageTypeList.add(new SelectCO("4", "TEXT"));
	}
	catch(Exception ex)
	{
	    ex.printStackTrace();
	    handleException(ex, null, null);
	}
    }

    /**
     * Method to load Dropdowns for DataType of ISO Fields
     * 
     * @return
     */
    public String populateTypeComboBoxes()
    {
	try
	{
	    SessionCO sessionCO = returnSessionObject();
	    // DropDown for Type
	    SelectSC selSC = new SelectSC(AtmInterfaceConstants.ISO_FIELD_TYPE);
	    selSC.setOrderCriteria("ORDER");
	    selSC.setLanguage(sessionCO.getLanguage());
	    dataTypeList = returnLOV(selSC);
	}
	catch(Exception ex)
	{
	    ex.printStackTrace();
	    handleException(ex, null, null);
	}
	return SUCCESS;
    }

    /**
     * Method to load Dropdowns for Message Type of ISO Fields
     * 
     * @return
     */
    public String populateMessageTypeComboBox()
    {
	try
	{
	    SessionCO sessionCO = returnSessionObject();
	    // DropDown for Type
	    SelectSC selSC = new SelectSC(AtmInterfaceConstants.MESSAGE_TYPE);
	    selSC.setOrderCriteria("ORDER");
	    selSC.setLanguage(sessionCO.getLanguage());
	    messageTypeList = returnLOV(selSC);
	}
	catch(Exception ex)
	{
	    ex.printStackTrace();
	    handleException(ex, null, null);
	}
	return SUCCESS;
    }

    public String openMessageDialog()
    {
	try
	{

	}
	catch(Exception ex)
	{
	    handleException(ex, null, null);
	}
	return "msgDialog";
    }

    /**
     * Load Format Expression Dialog
     */
    public String openFormateExpressionDialog()
    {
	try
	{

	}
	catch(Exception ex)
	{
	    handleException(ex, null, null);
	}
	return "formatDialog";
    }

    /**
     * Load Message Job Dialog
     */
    public String openJobDialog()
    {
	try
	{

	}
	catch(Exception ex)
	{
	    handleException(ex, null, null);
	}
	return "jobDialog";
    }

    /**
     * Method that retrieves the data to be showed in the autocomplete (txtarea)
     * 
     * @return
     * @throws Exception
     */
    public String retAutoCompleteData() throws Exception
    {
	StringBuffer comparison = new StringBuffer("");
	SessionCO sessionCO = returnSessionObject();

	SelectSC selSC = new SelectSC(new BigDecimal(7));
	selSC.setPreferredLanguage(sessionCO.getLanguage());

	ArrayList<SelectCO> operatorsList = (ArrayList<SelectCO>) returnLOV(selSC);

	for(int i = 0; i < operatorsList.size(); i++)
	{
	    comparison.append(operatorsList.get(i).getDescValue() + ";");
	}

	selSC = new SelectSC(new BigDecimal(502));
	selSC.setPreferredLanguage(sessionCO.getLanguage());

	operatorsList = (ArrayList<SelectCO>) returnLOV(selSC);
	for(int i = 0; i < operatorsList.size(); i++)
	{
	    comparison.append(operatorsList.get(i).getDescValue() + ";");
	}

	updates1 = comparison.toString();
	return SUCCESS;
    }

    public List<SelectCO> getInterfaceMessageTypeList()
    {
	return interfaceMessageTypeList;
    }

    public void setInterfaceMessageTypeList(List<SelectCO> interfaceMessageTypeList)
    {
	this.interfaceMessageTypeList = interfaceMessageTypeList;
    }

    public GTW_ATM_INT_ISO_MSGSVO getIso_INT_MSGSVO()
    {
	return iso_INT_MSGSVO;
    }

    public void setIso_INT_MSGSVO(GTW_ATM_INT_ISO_MSGSVO iso_INT_MSGSVO)
    {
	this.iso_INT_MSGSVO = iso_INT_MSGSVO;
    }

    public String getSubFieldsGridData()
    {
	return subFieldsGridData;
    }

    public void setSubFieldsGridData(String subFieldsGridData)
    {
	this.subFieldsGridData = subFieldsGridData;
    }

    public String getUpdates1()
    {
	return updates1;
    }

    public void setUpdates1(String updates1)
    {
	this.updates1 = updates1;
    }

    public AtmInterfaceBO getAtmInterfaceBO()
    {
	return atmInterfaceBO;
    }

    public List<SelectCO> getDataTypeList()
    {
	return dataTypeList;
    }

    public void setDataTypeList(List<SelectCO> dataTypeList)
    {
	this.dataTypeList = dataTypeList;
    }

    public BigDecimal getInterfaceId()
    {
	return interfaceId;
    }

    public void setInterfaceId(BigDecimal interfaceId)
    {
	this.interfaceId = interfaceId;
    }

    public AtmInterfaceSC getCriteria()
    {
	return criteria;
    }

    public void setCriteria(AtmInterfaceSC criteria)
    {
	this.criteria = criteria;
    }

    public List<SelectCO> getInterfaceTypeList()
    {
	return interfaceTypeList;
    }

    public void setInterfaceTypeList(List<SelectCO> interfaceTypeList)
    {
	this.interfaceTypeList = interfaceTypeList;
    }

    public List<SelectCO> getBitMapTypeList()
    {
	return bitMapTypeList;
    }

    public void setBitMapTypeList(List<SelectCO> bitMapTypeList)
    {
	this.bitMapTypeList = bitMapTypeList;
    }

    public List<SelectCO> getLengthTypeList()
    {
	return lengthTypeList;
    }

    public void setLengthTypeList(List<SelectCO> lengthTypeList)
    {
	this.lengthTypeList = lengthTypeList;
    }

    public AtmInterfaceCO getAtmInterfaceCO()
    {
	return atmInterfaceCO;
    }

    public void setAtmInterfaceCO(AtmInterfaceCO atmInterfaceCO)
    {
	this.atmInterfaceCO = atmInterfaceCO;
    }

    public void setAtmInterfaceBO(AtmInterfaceBO atmInterfaceBO)
    {
	this.atmInterfaceBO = atmInterfaceBO;
    }

    public String getIsoMessageGridData()
    {
	return isoMessageGridData;
    }

    public void setIsoMessageGridData(String isoMessageGridData)
    {
	this.isoMessageGridData = isoMessageGridData;
    }

    public String getIsoFieldsGridData()
    {
	return isoFieldsGridData;
    }

    public void setIsoFieldsGridData(String isoFieldsGridData)
    {
	this.isoFieldsGridData = isoFieldsGridData;
    }

    public List<SelectCO> getMessageTypeList()
    {
	return messageTypeList;
    }

    public void setMessageTypeList(List<SelectCO> messageTypeList)
    {
	this.messageTypeList = messageTypeList;
    }
    
}