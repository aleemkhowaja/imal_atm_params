package com.path.atm.actions.common.base;

import java.util.ArrayList;
import java.util.List;
import com.path.atm.bo.common.ATMCommonConstants;
import com.path.atm.vo.common.ATMBaseCO;
import com.path.bo.common.ConstantsCommon;
import com.path.bo.common.audit.AuditConstant;
import com.path.expression.common.PBFunc.BaseException;
import com.path.lib.common.util.StringUtil;
import com.path.struts2.lib.common.base.BaseAction;
import com.path.vo.common.SessionCO;
import com.path.vo.common.audit.AuditRefCO;
import com.path.vo.common.select.SelectCO;
import com.path.vo.common.select.SelectSC;

/**
 * 
 * Copyright 2019, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: Alim Khowaja
 *
 * ATMBaseAction.java used to
 */
public class ATMBaseAction extends BaseAction
{
    private ATMBaseCO atmBaseCO = new ATMBaseCO();
    private String _recStatus;
    
    /**
     * Returns the RGB color for status code
     *
     * @param status
     */
    protected String getStatusColorCode(String status, String space)
    {
	String colorCode = "";

	if("A".equals(status)) // Active
	{
	    colorCode = ATMCommonConstants.STATUS_COLOR_CODE_B.equals(space) ? "RGB(000,128,000)" : "RGB(255,255,255)";// GREEN
	}
	else if("P".equals(status)) // Approved
	{
	    colorCode = ATMCommonConstants.STATUS_COLOR_CODE_B.equals(space) ? "RGB(000,000,255)" : "RGB(255,255,255)"; // BLUE
	}
	else if("CR".equals(status)) // Create new record in maintance screen 
	{
	    colorCode = ATMCommonConstants.STATUS_COLOR_CODE_B.equals(space) ? "RGB(31,73,125)"
		    : "RGB(255,255,255)"; // BLUE
	}
	else // Deleted,Reversed
	{
	    colorCode = ATMCommonConstants.STATUS_COLOR_CODE_B.equals(space) ? "RGB(255,000,000)" : "RGB(255,255,255)";
	}
	return colorCode;

    }
    
    /**
     * 
     * @param atmBaseCO
     * required params
     * set value for runningDate   in atmBaseCO
     * set value for particular screen auditKey in atmBaseCO
     * @return
     */
    public AuditRefCO fillAuditDetails(ATMBaseCO atmBaseCO)
    {
	AuditRefCO refCO = initAuditRefCO();
	try
	{
	    
	    //set Key of particular screen
	    refCO.setKeyRef(atmBaseCO.getAuditKey());
	    refCO.setRunningDate(atmBaseCO.getRunningDate());
	    
	    if(StringUtil.isEmptyString(atmBaseCO.getUpdateMode()) ||
		    atmBaseCO.getUpdateMode().equals(ConstantsCommon.NO))
	    {
		refCO.setOperationType(AuditConstant.CREATED);

	    }
	    // set params for Add Audit
	    else
	    {
		refCO.setOperationType(AuditConstant.UPDATE);
		atmBaseCO.setAuditObj(returnAuditObject(atmBaseCO.getClass()));
	    }
	    
	    atmBaseCO.setAuditRefCO(refCO);
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return refCO;
    }
    
    
    /**
     * common method to fill dropdown
     * @param selSC
     * set lovid from your action and set into argument of selSC
     * @return
     */
    public   List<SelectCO> fillDropDown( SelectSC selSC)
    {
	List<SelectCO> dropDownList = new ArrayList<SelectCO>();
 	try
 	{
 	    SessionCO sessionCO = returnSessionObject();
 	    selSC.setLanguage(sessionCO.getLanguage());
 	    selSC.setOrderCriteria("ORDER");
 	    dropDownList.add(new SelectCO("", " "));
 	    dropDownList.addAll(returnLOV(selSC));
 	}
 	catch(Exception ex)
 	{
 	    handleException(ex, null, null);
 	}
 	return dropDownList;
     }
    
    /**
     * fill common session Data
     * @param atmBaseCO
     * @throws BaseException
     */
    public void fillSessionData(ATMBaseCO atmBaseCO) throws BaseException
    {
	SessionCO sessionCO = returnSessionObject();
	atmBaseCO.setCompCode(sessionCO.getCompanyCode());
	atmBaseCO.setBranchCode(sessionCO.getBranchCode());
	atmBaseCO.setAppName(sessionCO.getCurrentAppName());
	atmBaseCO.setProgRef(get_pageRef());
	atmBaseCO.setUserID(sessionCO.getUserName());
	atmBaseCO.setLanguage(sessionCO.getLanguage());
	try
	{
	    atmBaseCO.setRunningDate(returnCommonLibBO().addSystemTimeToDate(sessionCO.getRunningDateRET()));
	}
	catch(com.path.lib.common.exception.BaseException e)
	{
	    handleException(e, null, null);
	}
    }

    /**
     * load Dialog Page
     */
    public String returnDialogPage()
    {
	return atmBaseCO.getPageResult();
    }


    public ATMBaseCO getAtmBaseCO()
    {
	return atmBaseCO;
    }

    public void setAtmBaseCO(ATMBaseCO atmBaseCO)
    {
	this.atmBaseCO = atmBaseCO;
    }

    public String get_recStatus()
    {
        return _recStatus;
    }

    public void set_recStatus(String _recStatus)
    {
        this._recStatus = _recStatus;
    }
}