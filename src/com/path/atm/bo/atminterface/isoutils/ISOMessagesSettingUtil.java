package com.path.atm.bo.atminterface.isoutils;

import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import com.path.atm.bo.common.ATMCommonConstants;
import com.path.atm.vo.atminterface.AtmInterfaceCO;
import com.path.bo.common.ConstantsCommon;
import com.path.lib.common.util.StringUtil;
import com.path.vo.customexpression.ExpressionParamCO;
import com.solab.iso8583.IsoType;
import com.solab.iso8583.IsoValue;
import com.solab.iso8583.parse.AlphaParseInfo;
import com.solab.iso8583.parse.AmountParseInfo;
import com.solab.iso8583.parse.BinaryParseInfo;
import com.solab.iso8583.parse.Date10ParseInfo;
import com.solab.iso8583.parse.Date4ParseInfo;
import com.solab.iso8583.parse.DateExpParseInfo;
import com.solab.iso8583.parse.FieldParseInfo;
import com.solab.iso8583.parse.NumericParseInfo;
import com.solab.iso8583.parse.TimeParseInfo;

public class ISOMessagesSettingUtil
{


    /**
     * return Fields by primary MTI and recondary MTI
     * @param primaryMTI
     * @param secondaryMTI
     * @return
     */
    public static List<BigDecimal> extractFieldsFromBitMaps(String primaryMTI, String secondaryMTI)
    {
	if(StringUtil.isNotEmpty(primaryMTI) && StringUtil.isNotEmpty(secondaryMTI))
	{
	    primaryMTI = BaseConvertor.hexaToBinary(primaryMTI);
	    secondaryMTI = BaseConvertor.hexaToBinary(secondaryMTI);
		
	    char primaryBitmap[] =	 primaryMTI.toCharArray();
	    char secondaryBitmap[] = secondaryMTI.toCharArray();
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
	return null;
    }
    
    /**
     * Add Global Fields
     * @param isoFies
     */
    public static void addGlobalFields(List<ExpressionParamCO> isoFies)
    {
	ExpressionParamCO expressionParamCO = new ExpressionParamCO();
	expressionParamCO.setParameterName("Authorization Code");
	expressionParamCO.setParameterValue("[AUTHCODE]");
	isoFies.add(expressionParamCO);
	
	expressionParamCO = new ExpressionParamCO();
	expressionParamCO.setParameterName("Branch Code");
	expressionParamCO.setParameterValue("[BRCODE]");
	isoFies.add(expressionParamCO);
	
	expressionParamCO = new ExpressionParamCO();
	expressionParamCO.setParameterName("Charges Trx Type");
	expressionParamCO.setParameterValue("[CHRGTRXTYPE]");
	isoFies.add(expressionParamCO);
	
	expressionParamCO = new ExpressionParamCO();
	expressionParamCO.setParameterName("Company Code");
	expressionParamCO.setParameterValue("[COMPCODE]");
	isoFies.add(expressionParamCO);
	
	expressionParamCO = new ExpressionParamCO();
	expressionParamCO.setParameterName("Company Name");
	expressionParamCO.setParameterValue("[COMPNAME]");
	isoFies.add(expressionParamCO);
	
	expressionParamCO = new ExpressionParamCO();
	expressionParamCO.setParameterName("Core Error Desc");
	expressionParamCO.setParameterValue("[COREERRORDESC]");
	isoFies.add(expressionParamCO);
	
	expressionParamCO = new ExpressionParamCO();
	expressionParamCO.setParameterName("Interface Code");
	expressionParamCO.setParameterValue("[INTERFACECODE]");
	isoFies.add(expressionParamCO);
	
	expressionParamCO = new ExpressionParamCO();
	expressionParamCO.setParameterName("ISO Error Code");
	expressionParamCO.setParameterValue("[ISOERRORCODE]");
	isoFies.add(expressionParamCO);
	
	expressionParamCO = new ExpressionParamCO();
	expressionParamCO.setParameterName("ISO Header");
	expressionParamCO.setParameterValue("[ISOHEAD]");
	isoFies.add(expressionParamCO);
	
	expressionParamCO = new ExpressionParamCO();
	expressionParamCO.setParameterName("Merchant Account");
	expressionParamCO.setParameterValue("[MERACC]");
	isoFies.add(expressionParamCO);
	
	
	expressionParamCO = new ExpressionParamCO();
	expressionParamCO.setParameterName("MTI Code");
	expressionParamCO.setParameterValue("[MTICODE]");
	isoFies.add(expressionParamCO);
	
	expressionParamCO = new ExpressionParamCO();
	expressionParamCO.setParameterName("Teller USER");
	expressionParamCO.setParameterValue("[TELLUSER]");
	isoFies.add(expressionParamCO);
	
	expressionParamCO = new ExpressionParamCO();
	expressionParamCO.setParameterName("Terminal Description");
	expressionParamCO.setParameterValue("[TRMNLDESC]");
	isoFies.add(expressionParamCO);
	
	expressionParamCO = new ExpressionParamCO();
	expressionParamCO.setParameterName("TIMEOUT");
	expressionParamCO.setParameterValue("[TIMEOUT]");
	isoFies.add(expressionParamCO);
	
	expressionParamCO = new ExpressionParamCO();
	expressionParamCO.setParameterName("Trx Number");
	expressionParamCO.setParameterValue("[TRXNB]");
	isoFies.add(expressionParamCO);
	
	expressionParamCO = new ExpressionParamCO();
	expressionParamCO.setParameterName("Trx Type");
	expressionParamCO.setParameterValue("[TRXTYPE]");
	isoFies.add(expressionParamCO);
	
	expressionParamCO = new ExpressionParamCO();
	expressionParamCO.setParameterName("Pws Request Id");
	expressionParamCO.setParameterValue("[PWSREQID]");
	isoFies.add(expressionParamCO);
	
    }
    
    
    /**
     * initialize the field type
     * @param fieldsInfo
     * @param fldsco
     * @param fieldLength
     */
    public static void initFieldType(HashMap<Integer, FieldParseInfo> fieldsInfo, AtmInterfaceCO fldsco, int fieldLength)
    {
	/** Check field Type and add in Configuration map */
	// If type is Nemeric
	if(ATMCommonConstants.ISO_FIELD_TYPE_NUMERIC.equals(fldsco.getIso_INT_FLDSVO().getFIELD_TYPE()))
	{
	    fieldsInfo.put(fldsco.getIso_INT_FLDSVO().getFIELD_CODE().intValue(), new NumericParseInfo(fieldLength));
	}
	// Binary Type
	else if(ATMCommonConstants.ISO_FIELD_TYPE_BINARY.equals(fldsco.getIso_INT_FLDSVO().getFIELD_TYPE()))
	{
	    fieldsInfo.put(fldsco.getIso_INT_FLDSVO().getFIELD_CODE().intValue(), new BinaryParseInfo(fieldLength));
	}
	//Alpha Numeric Type
	else if(ATMCommonConstants.ISO_FIELD_TYPE_ALPHA.equals(fldsco.getIso_INT_FLDSVO().getFIELD_TYPE()))
	{
	    fieldsInfo.put(fldsco.getIso_INT_FLDSVO().getFIELD_CODE().intValue(), new AlphaParseInfo(fieldLength));
	}
	// Amount Type
	else if(ATMCommonConstants.ISO_FIELD_TYPE_AMOUNT.equals(fldsco.getIso_INT_FLDSVO().getFIELD_TYPE()))
	{
	    fieldsInfo.put(fldsco.getIso_INT_FLDSVO().getFIELD_CODE().intValue(), new AmountParseInfo());
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
	// Time Type
	else if(ATMCommonConstants.ISO_FIELD_TYPE_TIME.equals(fldsco.getIso_INT_FLDSVO().getFIELD_TYPE()))
	{
	    fieldsInfo.put(fldsco.getIso_INT_FLDSVO().getFIELD_CODE().intValue(), new TimeParseInfo());
	}
	// Expiration Date(mm/yy) Type
	else if(ATMCommonConstants.ISO_FIELD_TYPE_EXP_DATE.equals(fldsco.getIso_INT_FLDSVO().getFIELD_TYPE()))
	{
	    fieldsInfo.put(fldsco.getIso_INT_FLDSVO().getFIELD_CODE().intValue(), new DateExpParseInfo());
	}
    }
    
    
    /**
     * add Iso type and value for sub fields
     * @param subFieldList
     */
    public static ArrayList<IsoValue> returnISOTypeAndValueListForSubFields(List<AtmInterfaceCO> subFieldList)
    {
	ArrayList<IsoValue> customFieldList = new ArrayList<IsoValue>();
	customFieldList = new ArrayList<>();
	for(AtmInterfaceCO subFldsCo : subFieldList)
	{
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
	    else if(ATMCommonConstants.ISO_FIELD_TYPE_EXP_DATE.equals(subFldsCo.getSub_FLDSVO().getSUB_FIELD_TYPE()))
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
	return customFieldList;
    }
    
    /**
     * Fill Sub Grid
     * @param customFields
     * @param subFieldList
     * @return
     */
    public static List fillSubFieldsList(List<IsoValue> customFields, List subFieldList)
    {
	AtmInterfaceCO subFldsCo = null;
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
	return subFieldList;
    }
    
    /**
     * message type integer to hexa
     * @param messageType
     * @return
     */
    public static int messageTypeIntToHexa(int messageType)
    {
        String hex = Integer.toHexString(messageType);
        return (int) Long.parseLong(hex, 16);
    }
    
    /**
     * return message type to message type format
     * @param mti
     * @return
     */
    public static int returnMessageTypeHexa(String mti)
    {
	switch (mti)
	{
	    case "0100":
		return 0x100;
	    case "0110":
		return 0x110;
	    case "0120":
		return 0x120;
	    case "0121":
		return 0x121;
	    case "0130":
	  	return 0x130;
	    case "0200":
	  	return 0x200;
	    case "0210":
	  	return 0x210;
	    case "0220":
		return 0x220;
	    case "0221":
		return 0x221;
	    case "0230":
	  	return 0x230;
	    case "0320":
	  	return 0x320;
	    case "0330":
	  	return 0x330;
	    case "0400":
	  	return 0x400;
	    case "0420":
		return 0x420;
	    case "0430":
		return 0x430;
	    case "0510":
		return 0x510;
	    case "0800":
		return 0x800;
	    case "0810":
		return 0x810;
	    case "0820":
		return 0x820;
	}
	 return 0;
    }
}
