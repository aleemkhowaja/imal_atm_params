package com.path.atm.actions.lookups.merchant;

import java.math.BigDecimal;
import java.util.List;

import com.path.atm.bo.common.ATMCommonConstants;
import com.path.atm.bo.merchantmgnt.MerchantMgntBO;
import com.path.atm.bo.merchantmgnt.MerchantMgntConstant;
import com.path.atm.vo.merchantmgnt.MerchantMgntCO;
import com.path.atm.vo.merchantmgnt.MerchantMgntSC;
import com.path.bo.common.ConstantsCommon;
import com.path.lib.vo.LookupGrid;
import com.path.struts2.lib.common.base.LookupBaseAction;
import com.path.vo.common.SessionCO;

public class MerchantLookupAction extends LookupBaseAction
{

    private MerchantMgntSC merchantMgntSC = new MerchantMgntSC();
    private MerchantMgntBO merchantMgntBO;

    /**
     * Construct vault Lookup based on the VO returned in the resultMap.
     * 
     * @return
     */
    public String constructLookup()
    {

	try
	{
	    // Design the Grid by defining the column model and column names
	    String[] name = { "gtwAtmMerchantVO.MERCHANT_CODE", "gtwAtmMerchantVO.ADDITIONAL_REFERENCE", "gtwAtmMerchantVO.IBAN_ACC_NO" , "gtwAtmMerchantVO.COMP_CODE"};
	    String[] colType = { "text", "text", "text", "text"};
	    String[] titles = { getText("code_key"), getText("additional_references_key"), getText("iban_number_key"), getText("comp_code_key")};

	    // Defining the Grid
	    LookupGrid grid = new LookupGrid();
	    grid.setCaption(getText("merchantLookup.merchant"));
	    grid.setRowNum("5");
	    grid.setUrl("/path/atm/common/lookups/MerchantLookupAction_populateMerchantLookup");
	    lookup(grid, merchantMgntSC, name, colType, titles);
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}

	return SUCCESS;
    }

    /**
     * Fill the lookup vault data filtered by the defined criteria
     * 
     * @return
     */
    public String populateMerchantLookup()
    {
	try
	{
	    setSearchFilter(merchantMgntSC);
	    copyproperties(merchantMgntSC);
	    SessionCO sessionCO = returnSessionObject();
	    merchantMgntSC.setStatus(ATMCommonConstants.STATUS_APPROVED);
	    merchantMgntSC.setNbRec(-1);
	    merchantMgntSC.setCompCode(sessionCO.getCompanyCode());
	    merchantMgntSC.setBranchCode(new BigDecimal(0));
	    merchantMgntSC.setLovType(MerchantMgntConstant.MERCHANTMGNT_STATUS_SYS_PARAM_LOV_TYPE);
	    merchantMgntSC.setLang(sessionCO.getLanguage());
	    merchantMgntSC.setIvCrud(ConstantsCommon.CRUD_MAINTAIN);
	    merchantMgntSC.setStatus(MerchantMgntConstant.STATUS_APPROVED);
	    List<MerchantMgntCO> merchantMgntCOs = merchantMgntBO.returnMerchantMgntList(merchantMgntSC);
	    setGridModel(merchantMgntCOs);

	}
	catch(Exception e)
	{
	    log.error(e, "Error in fillLookupData of VaultLookupAction");
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

    public void setMerchantMgntBO(MerchantMgntBO merchantMgntBO)
    {
	this.merchantMgntBO = merchantMgntBO;
    }

}