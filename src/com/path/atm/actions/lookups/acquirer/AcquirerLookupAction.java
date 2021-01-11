package com.path.atm.actions.lookups.acquirer;

import java.util.List;

import com.path.atm.bo.acquirer.AcquirerBO;
import com.path.atm.bo.common.ATMCommonConstants;
import com.path.atm.vo.acquirer.AcquirerCO;
import com.path.atm.vo.acquirer.AcquirerSC;
import com.path.lib.vo.LookupGrid;
import com.path.struts2.lib.common.base.LookupBaseAction;
import com.path.vo.common.SessionCO;

/**
 * 
 * Copyright 2020, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: Alim Khowaja
 *
 * AcquirerLookupAction.java used to populate th Acquirer Lookup/Livesearch
 */
public class AcquirerLookupAction extends LookupBaseAction
{

    private AcquirerSC acquirerSC = new AcquirerSC();
    private AcquirerBO acquirerBO;

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
	    String[] name = { "gtw_ATM_ACQUIRER.ACQUIRER_ID", "gtw_ATM_ACQUIRER.DESCRIPTION",
		    "bankATMDescription", "gtw_ATM_ACQUIRER.TERMINAL_TYPE","atmInterfaceDescription" };
	    String[] colType = { "number", "text", "text", "text" , "text"};
	    String[] titles = { getText("acquirer_code_key"), getText("Description_key"), getText("bankATM_key"), 
		    			getText("terminal_type_key"), getText("interface_key")};

	    // Defining the Grid
	    LookupGrid grid = new LookupGrid();
	    grid.setCaption(getText("acquirerLookup.acquirer"));
	    grid.setRowNum("5");
	    grid.setUrl("/path/atm/common/lookups/AcquirerLookupAction_populateAcquirerLookup");
	    lookup(grid, acquirerSC, name, colType, titles);
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
    public String populateAcquirerLookup()
    {
	try
	{
	    setSearchFilter(acquirerSC);
	    copyproperties(acquirerSC);
	    SessionCO sessionCO = returnSessionObject();
	    acquirerSC.setStatus(ATMCommonConstants.STATUS_APPROVED);
	    acquirerSC.setCompCode(sessionCO.getCompanyCode());
	    acquirerSC.setBranchCode(sessionCO.getBranchCode());
	    acquirerSC.setPreferredLanguage(sessionCO.getLanguage());
	    if(getRecords() == 0)
	    {
		setRecords(acquirerBO.returnAcquirerListCount(acquirerSC));
	    }
	    List<AcquirerCO> acquirerCOs = acquirerBO.returnAcquirerList(acquirerSC);
	    setGridModel(acquirerCOs);

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
	return acquirerSC;
    }

    public AcquirerSC getAcquirerSC()
    {
        return acquirerSC;
    }

    public void setAcquirerSC(AcquirerSC acquirerSC)
    {
        this.acquirerSC = acquirerSC;
    }

    public void setAcquirerBO(AcquirerBO acquirerBO)
    {
        this.acquirerBO = acquirerBO;
    }
}