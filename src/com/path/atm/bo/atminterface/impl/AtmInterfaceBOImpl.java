package com.path.atm.bo.atminterface.impl;

import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.path.atm.bo.atminterface.AtmInterfaceBO;
import com.path.atm.bo.atminterface.AtmInterfaceConstants;
import com.path.atm.bo.atminterface.isoutils.BaseConvertor;
import com.path.atm.bo.atminterface.isoutils.PathCustomFieldHandler;
import com.path.atm.bo.common.ATMCommonConstants;
import com.path.atm.dao.atminterface.AtmInterfaceDAO;
import com.path.atm.dbmaps.vo.GTW_ATM_INTERFACESVO;
import com.path.atm.dbmaps.vo.GTW_ATM_INT_ISO_FLDSVO;
import com.path.atm.dbmaps.vo.GTW_ATM_INT_ISO_MSGSVO;
import com.path.atm.dbmaps.vo.GTW_ATM_INT_ISO_SUB_FLDSVO;
import com.path.atm.vo.atminterface.AtmInterfaceCO;
import com.path.atm.vo.atminterface.AtmInterfaceSC;
import com.path.bo.common.ConstantsCommon;
import com.path.bo.common.MessageCodes;
import com.path.dbmaps.vo.AXSVO;
import com.path.dbmaps.vo.OPTVO;
import com.path.lib.common.base.BaseBO;
import com.path.lib.common.exception.BOException;
import com.path.lib.common.exception.BaseException;
import com.path.lib.common.util.StringUtil;
import com.path.struts2.json.PathJSONUtil;
import com.path.vo.customexpression.ExpressionParamCO;
import com.solab.iso8583.IsoMessage;
import com.solab.iso8583.IsoType;
import com.solab.iso8583.IsoValue;
import com.solab.iso8583.MessageFactory;
import com.solab.iso8583.parse.AlphaParseInfo;
import com.solab.iso8583.parse.AmountParseInfo;
import com.solab.iso8583.parse.Date10ParseInfo;
import com.solab.iso8583.parse.Date4ParseInfo;
import com.solab.iso8583.parse.DateExpParseInfo;
import com.solab.iso8583.parse.FieldParseInfo;
import com.solab.iso8583.parse.LllvarParseInfo;
import com.solab.iso8583.parse.NumericParseInfo;
import com.solab.iso8583.parse.TimeParseInfo;

/**
 * 
 * Copyright 2020, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: Alim Khowaja
 *
 * AtmInterfaceBOImpl.java used to
 */
public class AtmInterfaceBOImpl extends BaseBO implements AtmInterfaceBO
{
    private AtmInterfaceDAO atmInterfaceDAO;
    
    @Override
    public List returnIsoFieldsList(AtmInterfaceSC criteria) throws BaseException
    {
	return atmInterfaceDAO.returnIsoFieldsList(criteria);
    }

    @Override
    public int returnIsoFieldsListCount(AtmInterfaceSC criteria) throws BaseException
    {
	return atmInterfaceDAO.returnIsoFieldsListCount(criteria);
    }

    @Override
    public List returnISOFieldListForExpression(AtmInterfaceSC criteria) throws BaseException
    {
	List<ExpressionParamCO> isoFies = new ArrayList<ExpressionParamCO>();
	// return list of iso fields
	if(criteria.getInterfaceId() != null
		&& !criteria.getInterfaceId().equals(ConstantsCommon.EMPTY_BIGDECIMAL_VALUE))
	{
	    criteria.setWithSubFields(true);
	    List<AtmInterfaceCO> isoFields = atmInterfaceDAO.returnFieldsList(criteria);

	    isoFields.stream().forEach(isoField->{
		ExpressionParamCO expressionParamCO = new ExpressionParamCO();

		if(isoField.getIso_SUB_FLDSVOs() != null && isoField.getIso_SUB_FLDSVOs().size() > 0
			&& isoField.getIso_SUB_FLDSVOs().get(0).getSUB_FIELD_NAME() != null)
		{
		    int count = 0;
		    for(GTW_ATM_INT_ISO_SUB_FLDSVO sub : isoField.getIso_SUB_FLDSVOs())
		    {
			expressionParamCO = new ExpressionParamCO();
			expressionParamCO.setParameterName(isoField.getIso_INT_FLDSVO().getFIELD_CODE() + "."+ (count += 1) + " - " + sub.getSUB_FIELD_NAME());
			expressionParamCO.setParameterValue("[ISO" + isoField.getIso_INT_FLDSVO().getFIELD_CODE() + "." + (count) + "]");
			isoFies.add(expressionParamCO);
		    }
		}
		else
		{
		    expressionParamCO.setParameterName(isoField.getIso_INT_FLDSVO().getFIELD_CODE() + " - "
			    + isoField.getIso_INT_FLDSVO().getFIELD_NAME());
		    expressionParamCO.setParameterValue("[ISO" + isoField.getIso_INT_FLDSVO().getFIELD_CODE() + "]");
		    isoFies.add(expressionParamCO);
		}
	    });

	    //added Global Variables inside expression dialog
	    if(StringUtil.nullToEmpty(criteria.getScreenFrom()).equalsIgnoreCase("all")
		    || StringUtil.nullToEmpty(criteria.getScreenFrom()).equalsIgnoreCase("acquirer"))
	    {
		ExpressionParamCO expressionParamCO = new ExpressionParamCO();
		expressionParamCO.setParameterName("MTI Code");
		expressionParamCO.setParameterValue("[MTICODE]");
		isoFies.add(expressionParamCO);
	    }
	}
	return isoFies;
    }

    /**
     * set ISO Field Name and return for expression dialog
     * 
     * @param fieldName
     * @return
     */
    private ExpressionParamCO concatinateISOFields(AtmInterfaceCO interfaceCO)
    {
	ExpressionParamCO expressionParamCO = new ExpressionParamCO();
	expressionParamCO.setParameterName(interfaceCO.getIso_INT_FLDSVO().getFIELD_CODE() + " - " + interfaceCO.getIso_INT_FLDSVO().getFIELD_NAME());
	StringBuilder subFieldParamvalue = new StringBuilder();
	
	if(interfaceCO.getIso_SUB_FLDSVOs() != null && interfaceCO.getIso_SUB_FLDSVOs().size() > 0)
	{
	    interfaceCO.getIso_SUB_FLDSVOs().stream().forEach(isoField->{
		subFieldParamvalue.append("[ISO" + interfaceCO.getIso_INT_FLDSVO().getFIELD_CODE() +"."+isoField.getSUB_FIELD_CODE()+"]");
	    });
	}
	else
	{
	    subFieldParamvalue.append("[ISO" + interfaceCO.getIso_INT_FLDSVO().getFIELD_CODE() +"]");
	}
	expressionParamCO.setParameterValue(subFieldParamvalue.toString());
	return expressionParamCO;
    }

    @Override
    public AtmInterfaceCO saveUpdateATMInterface(AtmInterfaceCO isoInterfaceCO) throws BaseException
    {
	List messageListAdd = (ArrayList<AtmInterfaceCO>) isoInterfaceCO.getGridsDataMap().get("messageAdd");
	List messageListUpdate = (ArrayList<AtmInterfaceCO>) isoInterfaceCO.getGridsDataMap().get("messageModify");
	List messageListDelete = (ArrayList<AtmInterfaceCO>) isoInterfaceCO.getGridsDataMap().get("messageDelete");

	AtmInterfaceCO co = null;

	GTW_ATM_INT_ISO_FLDSVO fldsvo = null;
	GTW_ATM_INT_ISO_MSGSVO msgsvo = null;

	GTW_ATM_INTERFACESVO gTW_ATM_INTERFACESVO = isoInterfaceCO.getIso_INTERFACESVO();
	gTW_ATM_INTERFACESVO.setCOMP_CODE(isoInterfaceCO.getCompCode());
	/** Insert New Records */
	if(gTW_ATM_INTERFACESVO.getINTERFACE_CODE() == null
		|| ConstantsCommon.EMPTY_BIGDECIMAL_VALUE.equals(gTW_ATM_INTERFACESVO.getINTERFACE_CODE()))
	{
	    /** Insert Interface */
	    gTW_ATM_INTERFACESVO.setINCLUDE_HEADER_YN(ConstantsCommon.YES);
	    gTW_ATM_INTERFACESVO.setCREATED_BY(isoInterfaceCO.getUserId());
	    gTW_ATM_INTERFACESVO.setCREATED_DATE(commonLibBO.returnSystemDateWithTime());
	    /**
	     * Check if Status of Interface is null or empty 
	     * then set the Status=Active
	     */
	    if(StringUtil.isEmptyString(gTW_ATM_INTERFACESVO.getSTATUS()))
	    {
		gTW_ATM_INTERFACESVO.setSTATUS(ATMCommonConstants.STATUS_ACTIVE);
	    }
	    
	    
	    /**
	     * Save Interface
	     */
	    atmInterfaceDAO.saveGTW_ATM_INTERFACESVO(gTW_ATM_INTERFACESVO);
	    isoInterfaceCO.setIso_INTERFACESVO(gTW_ATM_INTERFACESVO);

	    /** Insert Messages of Interface */
	    if(messageListAdd != null && !messageListAdd.isEmpty())
	    {
		for(int i = 0; i < messageListAdd.size(); i++)
		{
		    co = (AtmInterfaceCO) messageListAdd.get(i);
		    msgsvo = co.getIso_INT_MSGSVO();
		    co.setOldISOMsgId(msgsvo.getATM_ISO_MSGS_CODE());
		    msgsvo.setINTERFACE_CODE(gTW_ATM_INTERFACESVO.getINTERFACE_CODE());
		    atmInterfaceDAO.saveGTW_ATM_INT_ISO_MSGSVO(msgsvo);
		}
	    }
	}
	else
	{
	    /** Update Interface */
	    gTW_ATM_INTERFACESVO.setMODIFIED_BY(isoInterfaceCO.getUserId());
	    gTW_ATM_INTERFACESVO.setMODIFIED_DATE(commonLibBO.returnSystemDateWithTime());
	    gTW_ATM_INTERFACESVO.setSTATUS(ATMCommonConstants.STATUS_ACTIVE);

	    Integer row = genericDAO.update(gTW_ATM_INTERFACESVO);

	    if(row == null || row < 1)
	    {
		throw new BOException(MessageCodes.RECORD_CHANGED);
	    }

	    /** New Messages Added */
	    if(messageListAdd != null && !messageListAdd.isEmpty())
	    {
		for(int i = 0; i < messageListAdd.size(); i++)
		{
		    co = (AtmInterfaceCO) messageListAdd.get(i);
		    msgsvo = co.getIso_INT_MSGSVO();
		    msgsvo.setINTERFACE_CODE(gTW_ATM_INTERFACESVO.getINTERFACE_CODE());
		    atmInterfaceDAO.saveGTW_ATM_INT_ISO_MSGSVO(msgsvo);
		}
	    }

	    /** Update Messages */
	    if(messageListUpdate != null && !messageListUpdate.isEmpty())
	    {
		for(int i = 0; i < messageListUpdate.size(); i++)
		{
		    co = (AtmInterfaceCO) messageListUpdate.get(i);
		    msgsvo = co.getIso_INT_MSGSVO();
		    msgsvo.setINTERFACE_CODE(gTW_ATM_INTERFACESVO.getINTERFACE_CODE());
		    genericDAO.update(msgsvo);
		}
	    }

	    /** Delete Messages */
	    if(messageListDelete != null && !messageListDelete.isEmpty())
	    {
		for(int i = 0; i < messageListDelete.size(); i++)
		{
		    co = (AtmInterfaceCO) messageListDelete.get(i);
		    msgsvo = co.getIso_INT_MSGSVO();
		    msgsvo.setINTERFACE_CODE(gTW_ATM_INTERFACESVO.getINTERFACE_CODE());
		    genericDAO.delete(msgsvo);
		}
	    }
	}

	// save iso fields
	saveInterfaceISOFields(isoInterfaceCO);

	// save ISO Sub Fields
	saveInterfaceISOSubFields(isoInterfaceCO);
	 
	return isoInterfaceCO;
    }

    private void saveInterfaceISOFields(AtmInterfaceCO isoInterfaceCO) throws BaseException
    {
	List fieldsListAdd = (ArrayList<AtmInterfaceCO>) isoInterfaceCO.getGridsDataMap().get("fieldAdd");
	
	Map<BigDecimal, BigDecimal> map = new HashMap<BigDecimal, BigDecimal>();
	GTW_ATM_INTERFACESVO newGtw_ATM_INTERFACESVO = isoInterfaceCO.getIso_INTERFACESVO();
	AtmInterfaceCO co = null;
	GTW_ATM_INT_ISO_FLDSVO fldsvo = new GTW_ATM_INT_ISO_FLDSVO();

	/** Insert Fields of Interface */
	if(fieldsListAdd != null)
	{
	    for(int i = 0; i < fieldsListAdd.size(); i++)
	    {
		co = (AtmInterfaceCO) fieldsListAdd.get(i);
		fldsvo = co.getIso_INT_FLDSVO();
		
		fldsvo.setINTERFACE_CODE(newGtw_ATM_INTERFACESVO.getINTERFACE_CODE());
		if(fldsvo.getATM_ISO_FLDS_CODE() == null
			|| ConstantsCommon.EMPTY_BIGDECIMAL_VALUE.equals(fldsvo.getATM_ISO_FLDS_CODE()))
		{
		    atmInterfaceDAO.saveGTW_ATM_INT_ISO_FLDSVO(fldsvo);

		    // put ISO Field Code inside map
		    map.put(fldsvo.getFIELD_CODE(), fldsvo.getATM_ISO_FLDS_CODE());
		}
		else
		{
		    genericDAO.update(fldsvo);
		}
		// set interface iso field code map in co
		isoInterfaceCO.setInterfaceFieldMap(map);
	    }
	}
    }

    private void saveInterfaceISOSubFields(AtmInterfaceCO isoInterfaceCO) throws BaseException
    {
	List subGridList = (ArrayList<AtmInterfaceCO>) isoInterfaceCO.getGridsDataMap().get("subFieldGrid");
	GTW_ATM_INTERFACESVO iso_INTERFACESVO = isoInterfaceCO.getIso_INTERFACESVO();
	// Check if Map is not Empty
	if(subGridList != null && !subGridList.isEmpty())
	{
	    // List subGridList = null;
	    AtmInterfaceCO subGridCO = null;
	    GTW_ATM_INT_ISO_SUB_FLDSVO sub_FLDSVO = null;
	    // Iterate Each Sub-grid and Add Sub-fields in DB
	    for(int i = 0; i < subGridList.size(); i++)
	    {
		subGridCO = (AtmInterfaceCO) subGridList.get(i);
		sub_FLDSVO = subGridCO.getSub_FLDSVO();
		sub_FLDSVO.setINTERFACE_CODE(iso_INTERFACESVO.getINTERFACE_CODE());

		if(subGridCO != null && StringUtil.nullToEmpty(subGridCO.getSTATUS()).
					equals(ATMCommonConstants.STATUS_DELETED.equals(subGridCO.getSTATUS())))
		{
		    genericDAO.delete(sub_FLDSVO);
		}
		else
		{
		    // retrieve ISO field code from Map
		    if(sub_FLDSVO.getATM_ISO_FLDS_CODE() == null
			    || ConstantsCommon.EMPTY_BIGDECIMAL_VALUE.equals(sub_FLDSVO.getATM_ISO_FLDS_CODE()))
		    {
			BigDecimal atmISOFieldCode = isoInterfaceCO.getInterfaceFieldMap()
			    .get(sub_FLDSVO.getSUB_FIELD_CODE());
			sub_FLDSVO.setATM_ISO_FLDS_CODE(atmISOFieldCode);
		    }
		    if(sub_FLDSVO.getATM_ISO_SUB_FLDS_CODE() != null && !sub_FLDSVO.getATM_ISO_SUB_FLDS_CODE().equals(ConstantsCommon.EMPTY_BIGDECIMAL_VALUE))
		    {
			 int row = genericDAO.update(sub_FLDSVO);
		    }
		    else
		    {
			if(StringUtil.isNotEmpty(sub_FLDSVO.getSUB_FIELD_NAME())  && sub_FLDSVO.getSUB_FIELD_CODE() !=null 
				&& !sub_FLDSVO.getSUB_FIELD_CODE().equals(ConstantsCommon.EMPTY_BIGDECIMAL_VALUE)
				&& StringUtil.isNotEmpty(sub_FLDSVO.getSUB_FIELD_TYPE()))
			{
			    atmInterfaceDAO.saveGTW_ATM_INT_ISO_SUB_FLDSVO(sub_FLDSVO);
			}
			
		    }
		}
	    }// End List Loop
	     // }// End foreach
	}// end if
    }

    @Override
    public List returnInterfaceList(AtmInterfaceSC criteria) throws BaseException
    {
	return this.atmInterfaceDAO.returnInterfaceList(criteria);
    }

    @Override
    public int returnInterfaceListCount(AtmInterfaceSC criteria) throws BaseException
    {
	return atmInterfaceDAO.returnInterfaceListCount(criteria);
    }

    @Override
    public List returnMessageList(AtmInterfaceSC criteria) throws BaseException
    {
	return atmInterfaceDAO.returnMessageList(criteria);
    }

    @Override
    public int returnMessageListCount(AtmInterfaceSC criteria) throws BaseException
    {
	return atmInterfaceDAO.returnMessageListCount(criteria);
    }

    @Override
    public AtmInterfaceCO returnMessageByCode(AtmInterfaceSC criteria) throws BaseException
    {
	return atmInterfaceDAO.returnMessageByCode(criteria);
    }

    @Override
    public List returnFieldsList(AtmInterfaceSC criteria) throws BaseException
    {
	return atmInterfaceDAO.returnFieldsList(criteria);
    }

    @Override
    public int returnFieldsListCount(AtmInterfaceSC criteria) throws BaseException
    {
	return atmInterfaceDAO.returnFieldsListCount(criteria);
    }

    @Override
    public AtmInterfaceCO returnInterfaceById(AtmInterfaceSC criteria) throws BaseException
    {
	return atmInterfaceDAO.returnInterfaceById(criteria);
    }

    @Override
    public List returnIsoSubFieldsList(AtmInterfaceSC criteria) throws BaseException
    {
	return atmInterfaceDAO.returnIsoSubFieldsList(criteria);
    }

    @Override
    public int returnIsoSubFieldsListCount(AtmInterfaceSC criteria) throws BaseException
    {
	return atmInterfaceDAO.returnIsoSubFieldsListCount(criteria);
    }

    @Override
    public AtmInterfaceCO deleteInterface(AtmInterfaceCO atmInterfaceCO) throws BaseException
    {
	GTW_ATM_INTERFACESVO iso_INTERFACESVO = atmInterfaceCO.getIso_INTERFACESVO();
	iso_INTERFACESVO.setCOMP_CODE(atmInterfaceCO.getCompCode());
	iso_INTERFACESVO.setDELETED_BY(atmInterfaceCO.getUserId());
	iso_INTERFACESVO.setDELETED_DATE(commonLibBO.returnSystemDateWithTime());
	iso_INTERFACESVO.setSTATUS(ATMCommonConstants.STATUS_DELETED);

	Integer update = genericDAO.update(iso_INTERFACESVO);
	if(update == null || update < 1)
	{
	    throw new BOException(MessageCodes.RECORD_CHANGED);
	}
	else
	{
	    // Delete OPT and Access
	    deleteOPT_OPTEXTENDED_AXS(atmInterfaceCO, iso_INTERFACESVO);
	}
	return atmInterfaceCO;
    }

    @Override
    public AtmInterfaceCO handleStatusProcess(AtmInterfaceCO atmInterfaceCO) throws BaseException
    {
	GTW_ATM_INTERFACESVO iso_INTERFACESVO = atmInterfaceCO.getIso_INTERFACESVO();
	iso_INTERFACESVO.setCOMP_CODE(atmInterfaceCO.getCompCode());

	if(ATMCommonConstants.STATUS_APPROVED.equals(atmInterfaceCO.getMode()))
	{
	    iso_INTERFACESVO.setAPPROVED_BY(atmInterfaceCO.getUserId());
	    iso_INTERFACESVO.setAPPROVED_DATE(commonLibBO.returnSystemDateWithTime());
	    iso_INTERFACESVO.setSTATUS(ATMCommonConstants.STATUS_APPROVED);

	    // Insert OPT, OPT_EXTENDED and AXS
	    insertOPT_OPTEXTENDED_AXS(atmInterfaceCO, iso_INTERFACESVO);
	}
	else if(ATMCommonConstants.STATUS_SUSPENDED.equals(atmInterfaceCO.getMode()))
	{
	    iso_INTERFACESVO.setSUSPENDED_BY(atmInterfaceCO.getUserId());
	    iso_INTERFACESVO.setSUSPENDED_DATE(commonLibBO.returnSystemDateWithTime());
	    iso_INTERFACESVO.setSTATUS(ATMCommonConstants.STATUS_SUSPENDED);
	}
	else if(ATMCommonConstants.STATUS_REACTIVATE.equals(atmInterfaceCO.getMode()))
	{
	    iso_INTERFACESVO.setREACTIVATED_BY(atmInterfaceCO.getUserId());
	    iso_INTERFACESVO.setREACTIVATED_DATE(commonLibBO.returnSystemDateWithTime());
	    iso_INTERFACESVO.setSTATUS(ATMCommonConstants.STATUS_APPROVED);
	}

	Integer update = genericDAO.update(iso_INTERFACESVO);
	if(update == null || update < 1)
	{
	    throw new BOException(MessageCodes.RECORD_CHANGED);
	}
	return atmInterfaceCO;
    }

    private void insertOPT_OPTEXTENDED_AXS(AtmInterfaceCO isoInterfaceCO, GTW_ATM_INTERFACESVO iso_INTERFACESVO)
	    throws BaseException
    {
	/** Insert OPT and AXS */
	OPTVO optVO = new OPTVO();
	optVO.setAPP_NAME(isoInterfaceCO.getAppName());
	optVO.setPROG_REF(AtmInterfaceConstants.INTERFACE_OPT + iso_INTERFACESVO.getINTERFACE_CODE());
	optVO.setPROG_DESC(iso_INTERFACESVO.getDESCRIPTION());
	optVO.setALLOW_ADD_OPTIONS("0");
	optVO.setADD_OPT_REF(AtmInterfaceConstants.INTERFACE_OPT + iso_INTERFACESVO.getINTERFACE_CODE());
	optVO.setAUDIT_SAVE("0");
	optVO.setAUDIT_DELETE("0");
	optVO.setAUDIT_RETRIEVE("0");
	optVO.setMAIN_OPTION_1("0");
	optVO.setMAIN_OPTION_2("1");
	optVO.setDYNAMIC_OPT("2");
	optVO.setPROG_DESC_FR(iso_INTERFACESVO.getDESCRIPTION());
	optVO.setMENU_TITLE_ENG(iso_INTERFACESVO.getDESCRIPTION());
	optVO.setMENU_TITLE_ARAB(iso_INTERFACESVO.getDESCRIPTION());
	optVO.setMENU_TITLE_FR(iso_INTERFACESVO.getDESCRIPTION());
	optVO.setMENU_TITLE_FA(iso_INTERFACESVO.getDESCRIPTION());
	optVO.setPROG_DESC_ARAB(iso_INTERFACESVO.getDESCRIPTION());
	optVO.setPROG_DESC_FA(iso_INTERFACESVO.getDESCRIPTION());
	optVO.setMENU_TITLE_TK(iso_INTERFACESVO.getDESCRIPTION());
	optVO.setPROG_DESC_TK(iso_INTERFACESVO.getDESCRIPTION());
	optVO.setMENU_TITLE_RU(iso_INTERFACESVO.getDESCRIPTION());
	optVO.setPROG_DESC_RU(iso_INTERFACESVO.getDESCRIPTION());
	optVO.setPARENT_REF(AtmInterfaceConstants.ATM_INTERFACE_ROOT);
	optVO.setPROG_TYPE("P");
	optVO.setPROG_ORDER(new BigDecimal(atmInterfaceDAO.returnProgOrder()));
	optVO.setAPP_VERSION(BigDecimal.ONE);
	optVO.setDISP_ORDER(new BigDecimal(20));

	AXSVO axsVO = fillAxsVOProps(isoInterfaceCO.getCompCode(), isoInterfaceCO.getBranchCode(), optVO.getAPP_NAME(),
		isoInterfaceCO.getUserId(), isoInterfaceCO.getRunningDate(), optVO.getPROG_REF(),
		AtmInterfaceConstants.AXS_STATUS_P, AtmInterfaceConstants.AXS_TO_BE_DELETED_N);

	int row = genericDAO.update(optVO);
	if(row == 0)
	{
	    genericDAO.insert(optVO);
	    /** Insert into axs table */
	    genericDAO.insert(axsVO);
	}
    }

    private void updateOPT(AtmInterfaceCO isoInterfaceCO, GTW_ATM_INTERFACESVO iso_INTERFACESVO) throws BaseException
    {
	/** Update OPT */
	OPTVO optVO = new OPTVO();
	optVO.setAPP_NAME(isoInterfaceCO.getAppName());
	optVO.setPROG_REF(AtmInterfaceConstants.INTERFACE_OPT + iso_INTERFACESVO.getINTERFACE_CODE());
	optVO.setPROG_DESC(iso_INTERFACESVO.getDESCRIPTION());
	optVO.setPROG_DESC_FR(iso_INTERFACESVO.getDESCRIPTION());
	optVO.setMENU_TITLE_ENG(iso_INTERFACESVO.getDESCRIPTION());
	optVO.setMENU_TITLE_ARAB(iso_INTERFACESVO.getDESCRIPTION());
	optVO.setMENU_TITLE_FR(iso_INTERFACESVO.getDESCRIPTION());
	optVO.setMENU_TITLE_FA(iso_INTERFACESVO.getDESCRIPTION());
	optVO.setPROG_DESC_ARAB(iso_INTERFACESVO.getDESCRIPTION());
	optVO.setPROG_DESC_FA(iso_INTERFACESVO.getDESCRIPTION());
	optVO.setMENU_TITLE_TK(iso_INTERFACESVO.getDESCRIPTION());
	optVO.setPROG_DESC_TK(iso_INTERFACESVO.getDESCRIPTION());
	optVO.setMENU_TITLE_RU(iso_INTERFACESVO.getDESCRIPTION());
	optVO.setPROG_DESC_RU(iso_INTERFACESVO.getDESCRIPTION());

	genericDAO.update(optVO);
    }

    private void deleteOPT_OPTEXTENDED_AXS(AtmInterfaceCO isoInterfaceCO, GTW_ATM_INTERFACESVO iso_INTERFACESVO)
	    throws BaseException
    {
	/** Delete from and AXS */
	OPTVO optVO = new OPTVO();
	optVO.setAPP_NAME(isoInterfaceCO.getAppName());
	optVO.setPROG_REF("ATMINT" + iso_INTERFACESVO.getINTERFACE_CODE());

	/** Delete from Access Table */
	AXSVO axsVO = new AXSVO();
	axsVO.setCOMP_CODE(isoInterfaceCO.getCompCode());
	axsVO.setBRANCH_CODE(isoInterfaceCO.getBranchCode());
	axsVO.setAPP_NAME(isoInterfaceCO.getAppName());
	axsVO.setPROG_REF(AtmInterfaceConstants.INTERFACE_OPT + iso_INTERFACESVO.getINTERFACE_CODE());
	axsVO.setUSER_ID(isoInterfaceCO.getUserId());
	genericDAO.delete(axsVO);
	genericDAO.delete(optVO);
    }

    /**
     * fill Axs VOProps
     * 
     * @param compCode
     * @param branchCode
     * @param appName
     * @param userName
     * @param runningDate
     * @param progRef
     * @param status
     * @param toBeDeleted
     * @return
     * @throws BaseException
     */
    private AXSVO fillAxsVOProps(BigDecimal compCode, BigDecimal branchCode, String appName, String userName,
	    Date runningDate, String progRef, String status, String toBeDeleted) throws BaseException
    {
	AXSVO axsVO = new AXSVO();
	axsVO.setCOMP_CODE(compCode);
	axsVO.setBRANCH_CODE(branchCode);
	axsVO.setAPP_NAME(appName);
	axsVO.setPROG_REF(progRef);
	axsVO.setUSER_ID(userName);
	axsVO.setCREATED_BY(userName);
	axsVO.setAUTHORIZED_BY(userName);
	axsVO.setSTATUS(status);
	axsVO.setDIRECT_ACCESS(userName);
	axsVO.setDATE_CREATED(runningDate);
	axsVO.setDATE_AUTHORIZED(runningDate);
	axsVO.setTO_BE_DELETED(toBeDeleted);
	return axsVO;
    }

    /** Test ISO Message and Return List of Values */
    @Override
    public List testISOMessage(AtmInterfaceSC criteria) throws BaseException
    {
	// Initialize bitmaps fields
	criteria.setBitMapFields(extractFieldsFromBitMaps(criteria));
	// Incase of Empty Fields
	if(criteria.getBitMapFields() == null || criteria.getBitMapFields().isEmpty())
	{
	    criteria.getBitMapFields().add(new BigDecimal(-1));
	}
	/** Load available fields configuration from DB */
	List fieldList = atmInterfaceDAO.returnFieldListByBitmap(criteria);

	// Parser Configuration Settings Map
	HashMap<Integer, FieldParseInfo> fieldsInfoMap = new HashMap<Integer, FieldParseInfo>();
	MessageFactory<IsoMessage> messageFactory = new MessageFactory<IsoMessage>();

	AtmInterfaceCO fldsco = null;
	int fieldLength = 0;
	for(Object object : fieldList)
	{
	    fldsco = (AtmInterfaceCO) object;
	    /** Check if the Field has Dynamic Length */
	    if(fldsco.getIso_INT_FLDSVO().getDYNAMIC_LENGTH() != null
		    && !ConstantsCommon.EMPTY_BIGDECIMAL_VALUE.equals(fldsco.getIso_INT_FLDSVO().getDYNAMIC_LENGTH()))
	    {
		// Set length as per Dynamic
		fieldLength = fldsco.getIso_INT_FLDSVO().getDYNAMIC_LENGTH().intValue();
	    }
	    else
	    {
		// Set static length
		if(fldsco.getIso_INT_FLDSVO().getFIXED_LENGTH() != null)
		{
		    fieldLength = fldsco.getIso_INT_FLDSVO().getFIXED_LENGTH().intValue();
		}
	    }

	    /** Initialize Field Types according to saved configuration */
	    initFieldType(fieldsInfoMap, fldsco, fieldLength);

	    /** Check Sub Fields */
	    ArrayList<IsoValue> subFieldsConfigList = retSubFieldsISOConfiguratio(criteria, fldsco);
	    if(subFieldsConfigList != null && !subFieldsConfigList.isEmpty())
	    {
		int fieldCode = fldsco.getIso_INT_FLDSVO().getFIELD_CODE().intValue();
		fieldsInfoMap.remove(fieldCode);
		fieldsInfoMap.put(fieldCode, new LllvarParseInfo());
		messageFactory.setCustomField(fieldCode, new PathCustomFieldHandler(subFieldsConfigList));
	    }// If there are child Fields
	}// End Loop

	try
	{
	    fieldsInfoMap.remove(1);
	    messageFactory.setParseMap(0x800, fieldsInfoMap);

	    IsoMessage isoMsg = messageFactory.parseMessage(criteria.getIsoMessage().getBytes(), 0);
	    return print(isoMsg, fieldList, criteria);
	}
	catch(Exception e)
	{
	    throw new BOException("Error while parsing ISO Message Due to " + e.getMessage());
	}
    }

    /** Initialize Field Types from configuration */
    private void initFieldType(HashMap<Integer, FieldParseInfo> fieldsInfo, AtmInterfaceCO fldsco, int fieldLength)
    {
	/** Check field Type and add in Configuration map */
	// If type is Nemeric
	if(ATMCommonConstants.ISO_FIELD_TYPE_NUMERIC.equals(fldsco.getIso_INT_FLDSVO().getFIELD_TYPE()))
	{
	    fieldsInfo.put(fldsco.getIso_INT_FLDSVO().getFIELD_CODE().intValue(), new NumericParseInfo(fieldLength));
	}
	// Amount Type
	else if(ATMCommonConstants.ISO_FIELD_TYPE_AMOUNT.equals(fldsco.getIso_INT_FLDSVO().getFIELD_TYPE()))
	{
	    fieldsInfo.put(fldsco.getIso_INT_FLDSVO().getFIELD_CODE().intValue(), new AmountParseInfo());
	}
	// Expiration Date(mm/yy) Type
	else if(ATMCommonConstants.ISO_FIELD_TYPE_EXP_DATE.equals(fldsco.getIso_INT_FLDSVO().getFIELD_TYPE()))
	{
	    fieldsInfo.put(fldsco.getIso_INT_FLDSVO().getFIELD_CODE().intValue(), new DateExpParseInfo());
	}
	// Time Type
	else if(ATMCommonConstants.ISO_FIELD_TYPE_TIME.equals(fldsco.getIso_INT_FLDSVO().getFIELD_TYPE()))
	{
	    fieldsInfo.put(fldsco.getIso_INT_FLDSVO().getFIELD_CODE().intValue(), new TimeParseInfo());
	}
	// Date(dd/mm) type
	else if(ATMCommonConstants.ISO_FIELD_TYPE_DATE4.equals(fldsco.getIso_INT_FLDSVO().getFIELD_TYPE()))
	{
	    fieldsInfo.put(fldsco.getIso_INT_FLDSVO().getFIELD_CODE().intValue(), new Date4ParseInfo());
	}
	// Date(mmddHHMMSS) Type
	else if(ATMCommonConstants.ISO_FIELD_TYPE_DATE10.equals(fldsco.getIso_INT_FLDSVO().getFIELD_TYPE()))
	{
	    fieldsInfo.put(fldsco.getIso_INT_FLDSVO().getFIELD_CODE().intValue(), new Date10ParseInfo());
	}
	else
	{
	    fieldsInfo.put(fldsco.getIso_INT_FLDSVO().getFIELD_CODE().intValue(), new AlphaParseInfo(fieldLength));
	}
    }

    /** return List of Values Parsed from ISO Message */
    private List print(IsoMessage m, List fieldList, AtmInterfaceSC criteria) throws Exception
    {
	List messageDataList = new ArrayList();
	AtmInterfaceCO mainFieldCO = null;
	AtmInterfaceSC criteriaSubFields = new AtmInterfaceSC();
	List subFieldList = null;

	for(int i = 0; i < fieldList.size(); i++)
	{
	    mainFieldCO = (AtmInterfaceCO) fieldList.get(i);
	    int code = mainFieldCO.getIso_INT_FLDSVO().getFIELD_CODE().intValue();
	    if(m.hasField(code))
	    {
		criteriaSubFields.setNbRec(-1);
		criteriaSubFields.setCompCode(criteria.getCompCode());
		criteriaSubFields.setInterfaceId(criteria.getInterfaceId());
		criteriaSubFields.setFieldCode(mainFieldCO.getIso_INT_FLDSVO().getATM_ISO_FLDS_CODE());
		/** Retrive sub Fields */
		subFieldList = atmInterfaceDAO.returnIsoSubFieldsList(criteriaSubFields);

		if(subFieldList != null && !subFieldList.isEmpty())
		{
		    AtmInterfaceCO subFldsCo = null;
		    /* Loop all sub fields and set values as Type */
		    List<IsoValue> customFields = m.getObjectValue(code);
		    for(int j = 0; j < customFields.size(); j++)
		    {
			IsoValue isoValue = customFields.get(j);
			subFldsCo = (AtmInterfaceCO) subFieldList.get(j);

			// Extract Fields value as per Type
			if(isoValue.getType() == IsoType.NUMERIC)
			{// if NUMERIC
			    subFldsCo.setData((new BigDecimal(isoValue.getValue() + "") + ""));
			}
			else if(isoValue.getType() == IsoType.DATE_EXP)
			{// If Expire Date
			    DateFormat formatter = new SimpleDateFormat("yyMM");
			    try
			    {
				Date date = (Date) formatter.parse(isoValue.getValue().toString());
				subFldsCo.setData(date.toString());
				System.out.println("Expiry Date : " + date);
			    }
			    catch(ParseException e)
			    {
				subFldsCo.setData("");
			    }
			}
			else if(isoValue.getType() == IsoType.DATE4)
			{// If Date4
			    DateFormat formatter = new SimpleDateFormat("MMdd");
			    try
			    {
				Date date = (Date) formatter.parse(isoValue.getValue().toString());
				subFldsCo.setData(date.toString());
				System.out.println("Date-4 : " + date);
			    }
			    catch(ParseException e)
			    {
				subFldsCo.setData("");
			    }
			}
			else if(isoValue.getType() == IsoType.DATE10)
			{// If Date10
			    DateFormat formatter = new SimpleDateFormat("MMddHHmmss");
			    try
			    {
				Date date = (Date) formatter.parse(isoValue.getValue().toString());
				subFldsCo.setData(date.toString());
				System.out.println("mmddHHMMSS Date : " + date);
			    }
			    catch(ParseException e)
			    {
				subFldsCo.setData("");
			    }
			}
			else if(isoValue.getType() == IsoType.TIME)
			{// If Time
			    DateFormat formatter = new SimpleDateFormat("HHmmss");
			    try
			    {
				Date date = (Date) formatter.parse(isoValue.getValue().toString());
				subFldsCo.setData(date.toString());
				System.out.println("HHMMSS Time : " + date);
			    }
			    catch(ParseException e)
			    {
				subFldsCo.setData("");
			    }
			}
			else
			{
			    subFldsCo.setData(isoValue.getValue() + "");
			}
			subFieldList.set(j, subFldsCo);
		    }
		    /* Set Json as Grid */
		    mainFieldCO.setSubGridData("{\"root\":"
			    .concat(PathJSONUtil.serialize(subFieldList, null, null, false, true)).concat("}"));
		}
		else if(m.getField(code).getType() == IsoType.NUMERIC)
		{
		    mainFieldCO.setData((new BigDecimal(m.getObjectValue(code) + "") + ""));
		}
		else
		{
		    mainFieldCO.setData(m.getObjectValue(code) + "");
		}
		messageDataList.add(mainFieldCO);
	    }
	}
	return messageDataList;
    }// method

    /** Return ISO Fields Configuration */
    private ArrayList<IsoValue> retSubFieldsISOConfiguratio(AtmInterfaceSC criteria, AtmInterfaceCO fldsco)
	    throws BaseException
    {
	// Sub Fields Handling
	ArrayList<IsoValue> customFieldList = null;
	AtmInterfaceSC criteriaSubFields = new AtmInterfaceSC();
	List subFieldList = null;
	AtmInterfaceCO subFldsCo = null;

	criteriaSubFields.setNbRec(-1);
	criteriaSubFields.setCompCode(criteria.getCompCode());
	criteriaSubFields.setInterfaceId(criteria.getInterfaceId());
	criteriaSubFields.setFieldCode(fldsco.getIso_INT_FLDSVO().getATM_ISO_FLDS_CODE());
	subFieldList = atmInterfaceDAO.returnIsoSubFieldsList(criteriaSubFields);

	if(subFieldList != null && !subFieldList.isEmpty())
	{
	    customFieldList = new ArrayList<>();
	    for(Object object : subFieldList)
	    {
		subFldsCo = (AtmInterfaceCO) object;
		// Check field Type and add in Configuration map
		int length = 0;
		if(subFldsCo.getSub_FLDSVO().getFIXED_LENGTH() != null
			&& !ConstantsCommon.EMPTY_BIGDECIMAL_VALUE.equals(subFldsCo.getSub_FLDSVO().getFIXED_LENGTH()))
		{
		    length = subFldsCo.getSub_FLDSVO().getFIXED_LENGTH().intValue();
		}

		// If type is Nemeric
		if(ATMCommonConstants.ISO_FIELD_TYPE_NUMERIC.equals(subFldsCo.getSub_FLDSVO().getSUB_FIELD_TYPE()))
		{
		    customFieldList.add(new IsoValue(IsoType.NUMERIC, null, length));
		}
		// Amount Type
		else if(ATMCommonConstants.ISO_FIELD_TYPE_AMOUNT.equals(subFldsCo.getSub_FLDSVO().getSUB_FIELD_TYPE()))
		{
		    customFieldList.add(new IsoValue(IsoType.AMOUNT, null));
		}
		// Expiration Date(mm/yy) Type
		else if(ATMCommonConstants.ISO_FIELD_TYPE_EXP_DATE
			.equals(subFldsCo.getSub_FLDSVO().getSUB_FIELD_TYPE()))
		{
		    customFieldList.add(new IsoValue(IsoType.DATE_EXP, null));
		}
		// Time Type
		else if(ATMCommonConstants.ISO_FIELD_TYPE_TIME.equals(subFldsCo.getSub_FLDSVO().getSUB_FIELD_TYPE()))
		{
		    customFieldList.add(new IsoValue(IsoType.TIME, null));
		}
		// Date(dd/mm) type
		else if(ATMCommonConstants.ISO_FIELD_TYPE_DATE4.equals(subFldsCo.getSub_FLDSVO().getSUB_FIELD_TYPE()))
		{
		    customFieldList.add(new IsoValue(IsoType.DATE4, null));
		}
		// Date(mmddHHMMSS) Type
		else if(ATMCommonConstants.ISO_FIELD_TYPE_DATE10.equals(subFldsCo.getSub_FLDSVO().getSUB_FIELD_TYPE()))
		{
		    customFieldList.add(new IsoValue(IsoType.DATE10, null));
		}
		else
		{
		    customFieldList.add(new IsoValue(IsoType.ALPHA, null, length));
		}
	    }// End foreach loop
	}
	return customFieldList;
    }

    /** Extract Fields From Bitmap */
    private List<BigDecimal> extractFieldsFromBitMaps(AtmInterfaceSC criteria)
    {
	criteria.setPrimaryBitmap(BaseConvertor.hexaToBinary(criteria.getPrimaryBitmap()));
	criteria.setSecondaryBitmap(BaseConvertor.hexaToBinary(criteria.getSecondaryBitmap()));
	char primaryBitmap[] = criteria.getPrimaryBitmap().toCharArray();
	char secondaryBitmap[] = criteria.getSecondaryBitmap().toCharArray();
	List<BigDecimal> bitMapFields = new ArrayList();

	for(int i = 0; i < primaryBitmap.length; i++)
	{
	    if("1".equals("" + primaryBitmap[i]))
	    {
		bitMapFields.add(new BigDecimal(i + 1));
	    }
	}

	for(int i = 0; i < secondaryBitmap.length; i++)
	{
	    if("1".equals("" + secondaryBitmap[i]))
	    {
		bitMapFields.add(new BigDecimal(i + 65));
	    }
	}
	return bitMapFields;
    }

    /**
     * Mezzaawi/Patricia
     * New Methods for retrieve request/response filed list by interface Code and mti code
     */
    @Override
    public List<AtmInterfaceCO> returnIsoFieldsDetailByIdList(AtmInterfaceSC criteria) throws BaseException
    {
	/** Load available fields configuration from DB */	
	List isoFieldList = atmInterfaceDAO.returnFieldListByBitmap(criteria);
	return isoFieldList;
    }
      
    public void setAtmInterfaceDAO(AtmInterfaceDAO atmInterfaceDAO)
    {
	this.atmInterfaceDAO = atmInterfaceDAO;
    }
    
}