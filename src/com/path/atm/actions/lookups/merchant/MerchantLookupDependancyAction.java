package com.path.atm.actions.lookups.merchant;

import java.math.BigDecimal;

import com.path.atm.bo.common.ATMCommonConstants;
import com.path.atm.bo.merchantmgnt.MerchantMgntBO;
import com.path.atm.bo.merchantmgnt.MerchantMgntConstant;
import com.path.atm.vo.merchantmgnt.MerchantMgntCO;
import com.path.atm.vo.merchantmgnt.MerchantMgntSC;
import com.path.bo.common.ConstantsCommon;
import com.path.bo.common.MessageCodes;
import com.path.lib.common.exception.BOException;
import com.path.lib.common.util.StringUtil;
import com.path.struts2.lib.common.base.LookupBaseAction;
import com.path.vo.common.SessionCO;

/**
 * 
 * Copyright 2019, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: Alim Khowaja
 *
 * MerchantLookupDependancyAction.java used to
 */
public class MerchantLookupDependancyAction extends LookupBaseAction
{

    private MerchantMgntSC merchantMgntSC = new MerchantMgntSC();
    private MerchantMgntBO merchantMgntBO;
    private MerchantMgntCO merchantMgntCO;

    /**
     * Construct vault Lookup based on the VO returned in the resultMap.
     * 
     * @return
     */
    public String returnMerchantDetails()
    {

	try
	{

	    SessionCO sessionCO = returnSessionObject();
	    merchantMgntSC.setStatus(ATMCommonConstants.STATUS_APPROVED);
	    merchantMgntSC.setNbRec(-1);
	    merchantMgntSC.setCompCode(sessionCO.getCompanyCode());
	    merchantMgntSC.setBranchCode(new BigDecimal(0));
	    merchantMgntSC.setLovType(MerchantMgntConstant.MERCHANTMGNT_STATUS_SYS_PARAM_LOV_TYPE);
	    merchantMgntSC.setLang(sessionCO.getLanguage());
	    merchantMgntSC.setIvCrud(ConstantsCommon.CRUD_MAINTAIN);
	    merchantMgntSC.setStatus(MerchantMgntConstant.STATUS_APPROVED);
	    // return Dependancy by teller code
	    merchantMgntCO = merchantMgntBO.returnMerchantMgntDetails(merchantMgntSC);
	    if(merchantMgntCO != null && merchantMgntCO.getGtwAtmMerchantVO() != null)
	    {
		if(StringUtil.isEmptyString(merchantMgntCO.getGtwAtmMerchantVO().getADDITIONAL_REFERENCE()))
		{
		    merchantMgntCO.setMerchantDescription(merchantMgntCO.getGtwAtmMerchantVO().getIBAN_ACC_NO());
		}
		else
		{
		    merchantMgntCO.setMerchantDescription(merchantMgntCO.getGtwAtmMerchantVO().getADDITIONAL_REFERENCE());
		}
	    }
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return SUCCESS;
    }
    
    /**
     * validate IBAN or Additional Refernece
     * @return
     */
    public String validateIBANOrAddRef() 
    {
	try
	{
	    merchantMgntCO = new MerchantMgntCO();
	    Integer messageCode = 0;
	    /**
	     * check 
	     * if dependency call from iban then set lookupname = additonalReference for disable
	     * if dependency call from additional Reference then set lookup name = IBAN for disable
	     */
	    if(merchantMgntSC.getDependencyType().equals(MerchantMgntConstant.IBAN))
	    {
		// disable acc_additional_ref text filed
		merchantMgntCO.setLookupName(MerchantMgntConstant.Additional_Ref);
		merchantMgntSC.setAdditionalRef("");
		messageCode = MessageCodes.INVALID_MISSING_IBAN;
	    }
	    else
	    {
		// disable iban number text filed
		merchantMgntCO.setLookupName(MerchantMgntConstant.IBAN);
		merchantMgntSC.setIBAN("");
		messageCode = MessageCodes.ADDITIONAL_REFERENCE_IS_NOT_VALID;
	    }

	    
	    if(StringUtil.isNotEmpty(merchantMgntSC.getIBAN())
		    || StringUtil.isNotEmpty(merchantMgntSC.getAdditionalRef()))
	    {
		SessionCO sessionCO = returnSessionObject();
		merchantMgntSC.setPreferredLanguage(sessionCO.getPreferredLanguage());
		merchantMgntSC.setCompCode(sessionCO.getCompanyCode());
		merchantMgntSC.setLang(sessionCO.getLanguage());

		/**
		 * count the IBAN and Account Additional Reference
		 */
		int count = merchantMgntBO.countAccountByIbanORAddRef(merchantMgntSC);

		/**
		 * if count of iban number greater or equat to 1 then
		 * 1 - For iban number field additional Reference field will be disable
		 * 2 - For Additional Reference field the IBAN number field will disable
		 */
		if(count >= 1)
		{
		    merchantMgntCO = merchantMgntBO.applySysParamSettings(merchantMgntCO, BigDecimal.ONE);
		    setAdditionalScreenParams(merchantMgntCO.getElementMap());
		}
		else
		{
		    /**
		     * set field empty if there 0 count return
		     */
		    if(merchantMgntSC.getDependencyType().equals(MerchantMgntConstant.IBAN))
		    {
			merchantMgntSC.setIBAN("");
		    }
		    else
		    {
			merchantMgntSC.setAdditionalRef("");
		    }

		    throw new BOException(messageCode);
		}
	    }
	    else
	    {
		merchantMgntCO = merchantMgntBO.applySysParamSettings(merchantMgntCO, BigDecimal.ZERO);
		setAdditionalScreenParams(merchantMgntCO.getElementMap());
	    }
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return SUCCESS;
    }
    
    @Override
    public Object getModel()
    {
	return merchantMgntSC;
    }

    public MerchantMgntSC getMerchantMgntSC()
    {
	return merchantMgntSC;
    }

    public void setMerchantMgntSC(MerchantMgntSC merchantMgntSC)
    {
	this.merchantMgntSC = merchantMgntSC;
    }

    public MerchantMgntCO getMerchantMgntCO()
    {
	return merchantMgntCO;
    }

    public void setMerchantMgntCO(MerchantMgntCO merchantMgntCO)
    {
	this.merchantMgntCO = merchantMgntCO;
    }

    public void setMerchantMgntBO(MerchantMgntBO merchantMgntBO)
    {
	this.merchantMgntBO = merchantMgntBO;
    }

}
