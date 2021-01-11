package com.path.atm.bo.acquirer.impl;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;

import com.path.atm.bo.acquirer.AcquirerBO;
import com.path.atm.bo.teller.TellerBO;
import com.path.atm.dao.acquirer.AcquirerDAO;
import com.path.atm.dbmaps.vo.GTW_ATM_ACQUIRERVO;
import com.path.atm.dbmaps.vo.GTW_ATM_ACQUIRER_TRX_TYPEVO;
import com.path.atm.vo.acquirer.AcquirerCO;
import com.path.atm.vo.acquirer.AcquirerSC;
import com.path.atm.vo.teller.TellerSC;
import com.path.bo.common.ConstantsCommon;
import com.path.bo.common.MessageCodes;
import com.path.bo.customexpression.CustomExpressionBO;
import com.path.dbmaps.vo.SYS_PARAM_SCREEN_DISPLAYVO;
import com.path.lib.common.base.BaseBO;
import com.path.lib.common.exception.BOException;
import com.path.lib.common.exception.BaseException;
import com.path.lib.common.util.StringUtil;

/**
 * 
 * Copyright 2019, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: Alim Khowaja
 *
 * AcquirerBOImpl.java used to
 */
public class AcquirerBOImpl extends BaseBO implements AcquirerBO
{
    private AcquirerDAO acquirerDAO;
    
    private TellerBO tellerBo;
    
    private CustomExpressionBO customExpressionBO;

    @Override
    public List returnAcquirerList(AcquirerSC criteria) throws BaseException
    {
	return acquirerDAO.returnAcquirerList(criteria);
    }

    @Override
    public int returnAcquirerListCount(AcquirerSC criteria) throws BaseException
    {
	return acquirerDAO.returnAcquirerListCount(criteria);
    }

    @Override
    public AcquirerCO save(AcquirerCO acquirerCO) throws BaseException
    {
	//validate Acquirer Data
	validateAcquirerData(acquirerCO);
	GTW_ATM_ACQUIRERVO gtw_ATM_ACQUIRERVO = acquirerCO.getGtw_ATM_ACQUIRER();
	
	gtw_ATM_ACQUIRERVO.setCOMP_CODE(acquirerCO.getCompCode());

	if(StringUtil.nullToEmpty(gtw_ATM_ACQUIRERVO.getBANK_ATM_YN()).equalsIgnoreCase(ConstantsCommon.YES)
		&& !StringUtil.nullToEmpty(acquirerCO.getOldTerminalType()).equals(gtw_ATM_ACQUIRERVO.getTERMINAL_TYPE()))
	{
	    AcquirerSC criteria = new AcquirerSC();
	    criteria.setTerminaltype(gtw_ATM_ACQUIRERVO.getTERMINAL_TYPE()); 
	    criteria.setBankAtmYN(ConstantsCommon.YES);
	    criteria.setInterfaceCode(gtw_ATM_ACQUIRERVO.getINTERFACE_CODE());
	    int count = acquirerDAO.validateBankAtmByTerminalTypeCount(criteria);
	    if(count > 0)
	    {
		throw new BOException(MessageCodes.INVALID_MISSING,
			new String[] { "bank_atm_already_defined_for_this_terminal_type_key" });
	    }
	}
	
	if(gtw_ATM_ACQUIRERVO.getACQUIRER_ID() == null
		|| gtw_ATM_ACQUIRERVO.getACQUIRER_ID().equals(ConstantsCommon.EMPTY_BIGDECIMAL_VALUE))
	{

	    gtw_ATM_ACQUIRERVO.setCREATED_BY(acquirerCO.getUserID());
	    gtw_ATM_ACQUIRERVO.setCREATED_DATE(acquirerCO.getRunningDate());
	    // insert Channel Record
	    acquirerDAO.saveGTW_ATM_ACQUIRERVO(gtw_ATM_ACQUIRERVO);
	    acquirerCO.setGtw_ATM_ACQUIRER(gtw_ATM_ACQUIRERVO);

	    // call audit for insert
	    auditBO.callAudit(null, gtw_ATM_ACQUIRERVO, acquirerCO.getAuditRefCO());

	}
	else
	{
	    gtw_ATM_ACQUIRERVO.setMODIFIED_BY(acquirerCO.getUserID());
	    gtw_ATM_ACQUIRERVO.setMODIFIED_DATE(acquirerCO.getRunningDate());

	    // Update Channel Record
	    Integer row = genericDAO.update(gtw_ATM_ACQUIRERVO);
	    if(row == null || row < 1)
	    {
		throw new BOException(MessageCodes.RECORD_CHANGED);
	    }
	    //retrieve old Audit Object
	    AcquirerCO auditObj = (AcquirerCO) acquirerCO.getAuditObj();
	    
	    //call Audit
	    auditBO.callAudit(auditObj.getGtw_ATM_ACQUIRER(), gtw_ATM_ACQUIRERVO, acquirerCO.getAuditRefCO());
	}
	  
	//save Acquier Transaction
	saveTransactions(acquirerCO);
	
	// insert Audit
	auditBO.insertAudit(acquirerCO.getAuditRefCO());
	
	return acquirerCO;
    }
    
    /**
     * save/upate/delete Acquirer Transactions
     * @param acquirerCO
     * @throws Exception
     */
    private void saveTransactions(AcquirerCO acquirerCO) throws BaseException
    {
	
	 BigDecimal acquirerId = acquirerCO.getGtw_ATM_ACQUIRER().getACQUIRER_ID();
	 List<GTW_ATM_ACQUIRER_TRX_TYPEVO> addGridList = acquirerCO.getAddGridList();
	 List<GTW_ATM_ACQUIRER_TRX_TYPEVO> modifyGridList = acquirerCO.getModifyGridList();
	 List<GTW_ATM_ACQUIRER_TRX_TYPEVO> deleteGridList = acquirerCO.getDeleteGridList();
	 
	 //insert Transactions
	 if(addGridList != null && addGridList.size() > 0)
	 {
	     addGridList.forEach((obj) -> {
		 try
		{
		    obj.setACQUIRER_ID(acquirerId);
		    obj.setCREATED_BY(acquirerCO.getUserID());
		    obj.setCREATED_DATE(acquirerCO.getRunningDate());
		    if(obj.getCHARGES_TRX_TYPE() != null && obj.getCHARGES_TRX_TYPE().equals(ConstantsCommon.EMPTY_BIGDECIMAL_VALUE))
		    {
			obj.setCHARGES_TRX_TYPE(null);
		    }
		    genericDAO.insert(obj);
		}
		catch(BaseException e)
		{
		    log.error(e, "Error while saving Transaction Types in Acquirer"+e);
		}
	     });
	 }
	 //modify Transactions
	 if(modifyGridList != null && modifyGridList.size() >0)
	 {
	     modifyGridList.forEach((obj) -> {
		try
		{
		    obj.setACQUIRER_ID(acquirerId);
		    if(obj.getCHARGES_TRX_TYPE() != null && obj.getCHARGES_TRX_TYPE().equals(ConstantsCommon.EMPTY_BIGDECIMAL_VALUE))
		    {
			obj.setCHARGES_TRX_TYPE(null);
		    }
		    genericDAO.update(obj);
		}
		catch(BaseException e)
		{
		    log.error(e, "Error while updating Transaction Types in Acquirer"+e);
		}
	     }); 
	 }
	//delete Transactions
	 if(deleteGridList != null && deleteGridList.size() >0)
	 {
	     deleteGridList.forEach((obj) -> {
		 try
		 {
		     obj.setACQUIRER_ID(acquirerId);
		     genericDAO.delete(obj);
		 }
		 catch(BaseException e)
		 {
		     log.error(e, "Error while deleting Transaction Types in Acquirer"+e);
		 }
	     });  
	 }
    }
    
    
    /**
     * set empty value while Bank ATM selected
     * @param acquirerCO
     * @return
     */
    private AcquirerCO validateAcquirerData(AcquirerCO acquirerCO)
    {
	GTW_ATM_ACQUIRERVO gtw_ATM_ACQUIRERVO = acquirerCO.getGtw_ATM_ACQUIRER();
	if(StringUtil.nullToEmpty(gtw_ATM_ACQUIRERVO.getBANK_ATM_YN()).equalsIgnoreCase(ConstantsCommon.YES))
	{
	    gtw_ATM_ACQUIRERVO.setTRANSACTION_BRANCH_CODE(null);
	    gtw_ATM_ACQUIRERVO.setTELLER_CODE(null);
	}
	acquirerCO.setGtw_ATM_ACQUIRER(gtw_ATM_ACQUIRERVO);
	return acquirerCO;
    }

    @Override
    public AcquirerCO edit(AcquirerSC criteria) throws BaseException, Exception
    {
	AcquirerCO acquirerCO = acquirerDAO.edit(criteria);
	if(acquirerCO != null)
	{
	    TellerSC tellerSC = new TellerSC();
	    // set parameter for retrieve teller details
	    tellerSC.setBranchCode(acquirerCO.getGtw_ATM_ACQUIRER().getTRANSACTION_BRANCH_CODE());
	    tellerSC.setCompCode(criteria.getCompCode());
	    tellerSC.setTellerCode(acquirerCO.getGtw_ATM_ACQUIRER().getTELLER_CODE());
	    
	    //set Old Interface Code for Validation
	    acquirerCO.setOldTerminalType(acquirerCO.getGtw_ATM_ACQUIRER().getTERMINAL_TYPE());
	}
	return acquirerCO;
    }

    @Override
    public void delete(AcquirerCO acquirerCO) throws BaseException
    {
	
	AcquirerSC acquirerSC = new AcquirerSC();
	acquirerSC.setAcquirerId(acquirerCO.getGtw_ATM_ACQUIRER().getACQUIRER_ID());
	
	//delete acquirer and trx types
	int rows = acquirerDAO.deleteAcquirer(acquirerSC);
	
	if(StringUtil.nullToEmpty(acquirerCO.getGtw_ATM_ACQUIRER().getBANK_ATM_YN()).equalsIgnoreCase("Y"))
	{
	    acquirerSC.setInterfaceCode(acquirerCO.getGtw_ATM_ACQUIRER().getINTERFACE_CODE());
	    //delete terminals by interface code if the bank atm check in acquirer
	    acquirerDAO.deleteTerminalsByInterfaceCode(acquirerSC);
	}
	
    }
    

    @Override
    public AcquirerCO applySysParamSettings(AcquirerCO acquirerCO) throws BaseException
    {
	HashMap<String, SYS_PARAM_SCREEN_DISPLAYVO> elementMap = acquirerCO.getElementMap();

	SYS_PARAM_SCREEN_DISPLAYVO sysParam = new SYS_PARAM_SCREEN_DISPLAYVO();
	sysParam.setIS_READONLY(BigDecimal.ONE);
	elementMap.put("acquirerCode_id", sysParam);
	
	SYS_PARAM_SCREEN_DISPLAYVO bankAtmFieldsParams = new SYS_PARAM_SCREEN_DISPLAYVO();
	
	String ids[] = {"terminalType_id"};
	if(StringUtil.nullToEmpty(acquirerCO.getBankAtmYN()).equalsIgnoreCase(ConstantsCommon.YES))
	{
	    bankAtmFieldsParams.setIS_VISIBLE(BigDecimal.ZERO);
	    bankAtmFieldsParams.setIS_MANDATORY(BigDecimal.ZERO);
	    applyDynScreenDisplay(ids,ConstantsCommon.ACTION_TYPE_VISIBLE, "1", acquirerCO.getElementMap(), null);
	    applyDynScreenDisplay(ids,ConstantsCommon.ACTION_TYPE_MANDATORY, "1", acquirerCO.getElementMap(), null);
	}
	else
	{
	    bankAtmFieldsParams.setIS_VISIBLE(BigDecimal.ONE);
	    bankAtmFieldsParams.setIS_MANDATORY(BigDecimal.ONE);
	    applyDynScreenDisplay(ids,ConstantsCommon.ACTION_TYPE_VISIBLE, "0", acquirerCO.getElementMap(), null);
	    applyDynScreenDisplay(ids,ConstantsCommon.ACTION_TYPE_MANDATORY, "0", acquirerCO.getElementMap(), null);
	}
	
	elementMap.put("lookuptxt_transaction_branch", bankAtmFieldsParams);
	elementMap.put("lookuptxt_teller", bankAtmFieldsParams);
	
	return acquirerCO;
    }
    
    @Override
    public List returnAcquirerTransactionsList(AcquirerSC criteria) throws BaseException
    {
	return acquirerDAO.returnAcquirerTransactionsList(criteria);
    }

    @Override
    public int returnAcquirerTransactionsListCount(AcquirerSC criteria) throws BaseException
    {
	return acquirerDAO.returnAcquirerTransactionsListCount(criteria);
    }

    public void setCustomExpressionBO(CustomExpressionBO customExpressionBO)
    {
        this.customExpressionBO = customExpressionBO;
    }

    public void setTellerBo(TellerBO tellerBo)
    {
	this.tellerBo = tellerBo;
    }

    public void setAcquirerDAO(AcquirerDAO acquirerDAO)
    {
	this.acquirerDAO = acquirerDAO;
    }
}
