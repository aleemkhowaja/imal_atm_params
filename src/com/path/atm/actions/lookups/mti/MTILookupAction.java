package com.path.atm.actions.lookups.mti;

import java.util.List;

import com.path.atm.bo.atminterface.AtmInterfaceBO;
import com.path.atm.vo.atminterface.AtmInterfaceCO;
import com.path.atm.vo.atminterface.AtmInterfaceSC;
import com.path.bo.atminterfaces.AtmInterfacesConstants;
import com.path.lib.vo.LookupGrid;
import com.path.struts2.lib.common.base.LookupBaseAction;
import com.path.vo.common.SessionCO;

public class MTILookupAction extends LookupBaseAction
{

   
   private AtmInterfaceBO atmInterfaceBO;
    
   private AtmInterfaceSC atmInterfaceSC = new AtmInterfaceSC();

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
	    String[] name = { "iso_INT_MSGSVO.ATM_ISO_MSGS_CODE", "iso_INT_MSGSVO.REQUEST_MTI","iso_INT_MSGSVO.RESPONSE_MTI"};
	    String[] colType = { "text", "text", "text"};
	    String[] titles = { getText("atm_iso_msg_code_key"), getText("request_mti_key"), getText("response_mti_key")};

	    // Defining the Grid
	    LookupGrid grid = new LookupGrid();
	    grid.setCaption(getText("mti_key"));
	    grid.setRowNum("5");
	    grid.setUrl("/path/atm/common/lookups/MTILookupAction_populateMTILookup");
	    lookup(grid, atmInterfaceSC, name, colType, titles);
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
    public String populateMTILookup()
    {
	try
	{
	    setSearchFilter(atmInterfaceSC);
	    copyproperties(atmInterfaceSC);
	    SessionCO sessionCO = returnSessionObject();
	    atmInterfaceSC.setStatus(AtmInterfacesConstants.STATUS_APPROVED);
	    if(getRecords() == 0)
	    {
		setRecords(atmInterfaceBO.returnMessageListCount(atmInterfaceSC));
	    }
	    
	    List<AtmInterfaceCO> atmInterfaceCOs = atmInterfaceBO.returnMessageList(atmInterfaceSC);
	    setGridModel(atmInterfaceCOs);
	}
	catch(Exception e)
	{
	    log.error(e, "Error in fillLookupData of AtmInterfacesLookupAction");
	    handleException(e, null, null);
	}
	return SUCCESS;
    }

    @Override
    public Object getModel()
    {
	return atmInterfaceSC;
    }

    public AtmInterfaceSC getAtmInterfaceSC()
    {
        return atmInterfaceSC;
    }

    public void setAtmInterfaceSC(AtmInterfaceSC atmInterfaceSC)
    {
        this.atmInterfaceSC = atmInterfaceSC;
    }

    public void setAtmInterfaceBO(AtmInterfaceBO atmInterfaceBO)
    {
        this.atmInterfaceBO = atmInterfaceBO;
    }
}