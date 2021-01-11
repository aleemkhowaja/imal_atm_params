package com.path.atm.actions.lookups.teller;

import java.util.List;

import com.path.atm.bo.common.ATMCommonConstants;
import com.path.atm.bo.teller.TellerBO;
import com.path.atm.vo.teller.TellerCO;
import com.path.atm.vo.teller.TellerSC;
import com.path.lib.vo.LookupGrid;
import com.path.struts2.lib.common.base.LookupBaseAction;

/**
 * 
 * Copyright 2019, Path Solutions Path Solutions retains all ownership rights to
 * this source code
 * 
 * @author: Alim Khowaja
 *
 *TellerLookupAction.java used to
 */
public class TellerLookupAction extends LookupBaseAction
{

    private TellerSC tellerSC = new TellerSC();
    private TellerBO atmTellerBO;

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
	    String[] name = { "tellerCode", "userID", "companyCode", "branchCode", "briefNameEnglish",
		    "briefNameArabic", "longNameEnglish", "longNameArabic" };
	    String[] colType = { "text", "text", "text", "text", "text", "text", "text", "text" };
	    String[] titles = { getText("teller_code_key"), getText("User_Id_key"), getText("comp_code_key"),
		    getText("branch_code_key"), getText("brief_name_eng_key"), getText("brief_name_arab_key"),
		    getText("long_name_eng_key"), getText("long_name_arab_key") };

	    // Defining the Grid
	    LookupGrid grid = new LookupGrid();
	    grid.setCaption(getText("tellerLookup.teller"));
	    grid.setRowNum("5");
	    grid.setUrl("/path/atm/common/lookups/TellerLookupAction_populateTellerLookup");
	    lookup(grid, tellerSC, name, colType, titles);
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
    public String populateTellerLookup()
    {
	try
	{
	    setSearchFilter(tellerSC);
	    copyproperties(tellerSC);
	    tellerSC.setStatus(ATMCommonConstants.STATUS_ACTIVE);

	    if(getRecords() == 0)
	    {
		setRecords(atmTellerBO.returnTellerCount(tellerSC));
	    }
	    List<TellerCO> ctstellervos = atmTellerBO.returnTellerList(tellerSC);
	    setGridModel(ctstellervos);

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
	return tellerSC;
    }

    public TellerSC getTellerSC()
    {
	return tellerSC;
    }

    public void setTellerSC(TellerSC tellerSC)
    {
	this.tellerSC = tellerSC;
    }

    public void setAtmTellerBO(TellerBO atmTellerBO)
    {
        this.atmTellerBO = atmTellerBO;
    }
}