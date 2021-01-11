package com.path.atm.bo.isomessageparsing;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;

import org.apache.struts2.json.JSONException;

import com.path.atm.vo.isomessageparsing.ISOMessageParseCO;
import com.path.atm.vo.isomessageparsing.ISOMessageParseSC;
import com.path.lib.common.exception.BaseException;

public interface ISOMessageParseBO
{
    
    /**
     * run Request ISO Message
     * @param criteria
     * @return
     * @throws BaseException
     */
    public ISOMessageParseCO parseAndRunISOMessage(ISOMessageParseSC criteria) throws BaseException;
    
    
    /**
     * 
     * @param responseMap
     * @param interfaceId
     * @return
     * @throws Exception
     */
    public List<ISOMessageParseCO> prepareISOFieldsDetail(HashMap<String, Object> responseMap, BigDecimal interfaceId)
	    throws BaseException, JSONException;
}
