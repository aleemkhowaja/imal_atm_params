package com.path.atm.actions.lookups.branch;

import java.util.List;

import com.path.atm.bo.branch.BranchBO;
import com.path.atm.bo.common.ATMCommonConstants;
import com.path.atm.vo.branch.BranchCO;
import com.path.atm.vo.branch.BranchSC;
import com.path.lib.vo.LookupGrid;
import com.path.struts2.lib.common.base.LookupBaseAction;

/**
 * 
 * Copyright 2020, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: USER
 *
 * BranchLookupAction.java used to
 */
public class BranchLookupAction extends LookupBaseAction
{

    private BranchSC branchSC = new BranchSC();
    private BranchBO atmBranchBO;

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
	    String[] name = { "branchCode", "briefNameEnglish", "longNameEnglish", "briefNameArabic", "longNameArabic",
		    "remarks", "baseCurrency" };
	    String[] colType = { "text", "text", "text", "text", "text", "text", "text" };
	    String[] titles = { getText("branchCode"), getText("briefDesc"), getText("Long_Description_key"),
		    getText("Brief_Name_Arab_key"), getText("Long_Desc_Arab_key"), getText("remarks_key"),
		    getText("Currency_key") };

	    
	    // Defining the Grid
	    LookupGrid grid = new LookupGrid();
	    grid.setCaption(getText("branches.branchList"));
	    grid.setRowNum("5");
	    grid.setUrl("/path/atm/common/lookups/BranchLookupAction_populateBranchLookup");
	    lookup(grid, branchSC, name, colType, titles);
	}
	catch(Exception e)
	{
	    log.error(e, "Error in constructLookup of BranchLookupAction");
	    handleException(e, null, null);
	}

	return SUCCESS;
    }

    /**
     * Fill the lookup vault data filtered by the defined criteria
     * 
     * @return
     */
    public String populateBranchLookup()
    {
	try
	{
	    setSearchFilter(branchSC);
	    copyproperties(branchSC);
	    
	    branchSC.setStatus(ATMCommonConstants.STATUS_ACTIVE);

	    if(getRecords() == 0)
	    {
		setRecords(atmBranchBO.returnBranchByCompCodeCount(branchSC));
	    }
	    List<BranchCO> branchCOs = atmBranchBO.returnBranchByCompCodeList(branchSC);
	    setGridModel(branchCOs);

	}
	catch(Exception e)
	{
	    log.error(e, "Error in populateBranchLookup of BranchLookupAction");
	    handleException(e, null, null);
	}
	return SUCCESS;
    }

    @Override
    public Object getModel()
    {
	return branchSC;
    }

    public BranchSC getBranchSC()
    {
        return branchSC;
    }

    public void setAtmBranchBO(BranchBO atmBranchBO)
    {
        this.atmBranchBO = atmBranchBO;
    }
}