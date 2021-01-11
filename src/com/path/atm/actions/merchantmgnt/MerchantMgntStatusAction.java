package com.path.atm.actions.merchantmgnt;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletContext;

import org.apache.struts2.ServletActionContext;

import com.path.atm.bo.merchantmgnt.MerchantMgntConstant;
import com.path.atm.dbmaps.vo.GTW_ATM_MERCHANTVO;
import com.path.atm.vo.merchantmgnt.MerchantMgntSC;
import com.path.struts2.lib.common.base.LookupBaseAction;
import com.path.vo.common.SessionCO;
import com.path.vo.common.select.SelectSC;
import com.path.vo.common.status.StatusCO;

public class MerchantMgntStatusAction extends LookupBaseAction {

    private MerchantMgntSC merchantMgntSC = new MerchantMgntSC();
    private List<StatusCO> statusList = new ArrayList<StatusCO>();
    private String url;
    
    
    /**
     * Set the status Grid URL and load the Common Status Jsp Page...
     * 
     * @return
     */
    public String search()
    {
	try
	{
	   
	    ServletContext application = ServletActionContext.getServletContext();
	    String theRealPath = application.getContextPath();

	    url = theRealPath + "/path/merchants/MerchantMgntStatus_loadStatusGrid.action?code="+merchantMgntSC.getCode();
	}
	catch(Exception ex)
	{
	    ex.printStackTrace();
	}
	return "SUCCESS_STATUS";
    }
    
    
    /**
     * get data from Database, convert them to be compatible with statusCO, get
     * HTML and set the Model.
     * 
     * @return
     */
    public String loadStatusGrid()
    {
	String[] searchCol = { "userName", "status_desc", "status_date" };
	try
	{
	    SessionCO sessionCO = returnSessionObject();
	    BigDecimal compCode = sessionCO.getCompanyCode();
	    BigDecimal brancheCode = sessionCO.getBranchCode();

	    List<String> colList = MerchantMgntConstant.MERCHANTMGNT_STATUS_LST;

	    SelectSC lovCriteria = new SelectSC();
	    lovCriteria.setLanguage(sessionCO.getLanguage());
	    lovCriteria.setCompCode(compCode);
	    lovCriteria.setLovTypeId(MerchantMgntConstant.MERCHANTMGNT_STATUS_SYS_PARAM_LOV_TYPE);

	    merchantMgntSC.setSearchCols(searchCol);
	    copyproperties(merchantMgntSC);
	    setSearchFilter(merchantMgntSC);
	    GTW_ATM_MERCHANTVO merchantMgntVO = new GTW_ATM_MERCHANTVO();
	    merchantMgntVO.setCOMP_CODE(compCode);
	    merchantMgntVO.setMERCHANT_CODE(merchantMgntSC.getCode());

	    List<StatusCO> resultList = returnCommonLibBO().generateStatusList(merchantMgntVO, colList, lovCriteria);
	    setGridModel(resultList);
	}
	catch(Exception ex)
	{
	    log.error("Error in the loadStatusGrid method");
	    ex.printStackTrace();
	}
	return "loadGrid";
    }
    
    
    /**
     * getModel.
     */
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


    public String getUrl()
    {
        return url;
    }


    public void setUrl(String url)
    {
        this.url = url;
    }


    public List<StatusCO> getStatusList()
    {
        return statusList;
    }


    public void setStatusList(List<StatusCO> statusList)
    {
        this.statusList = statusList;
    }


}
