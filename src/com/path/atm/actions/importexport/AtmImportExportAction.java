package com.path.atm.actions.importexport;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import com.path.atm.actions.common.base.ATMBaseAction;
import com.path.atm.bo.importexport.AtmImportExportBO;
import com.path.atm.vo.atminterface.AtmInterfaceCO;
import com.path.atm.vo.atminterface.AtmInterfaceSC;
import com.path.bo.common.ConstantsCommon;
import com.path.lib.common.util.FileUtil;
import com.path.lib.common.util.NumberUtil;
import com.path.vo.common.SessionCO;

/**
 * 
 * Copyright 2020, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: Alim Khowaja
 *
 * AtmImportExportMaintAction.java used to import/export functionality
 */
public class AtmImportExportAction extends ATMBaseAction
{
    private AtmInterfaceCO atmInterfaceCO;
    private AtmInterfaceSC criteria = new AtmInterfaceSC();
    private AtmImportExportBO atmImportExportBO;
    private File uploadFile;

    
    /**
     * Import Interface with all details in zip file
     * 
     * @return
     */
    public String importAtmInterface()
    {
	try
	{
	    /**
	     * Fill Audit Details
	     */
	    atmInterfaceCO = new AtmInterfaceCO();
	    fillAuditDetails(atmInterfaceCO);

	    if(getUploadFile() != null && getUploadFile().isFile() && getUploadFile().length() > 0)
	    {
		// Add session values in criteria for upload
		applySessionValues();

		/**
		 * Import File
		 */
		atmImportExportBO.importAtmInterface(atmInterfaceCO, criteria, getUploadFile());
	    }
	}
	catch(Exception e)
	{
	    log.error(e, "Error in Import Interface File");
	    handleException(e, null, null);
	}
	return "fileSuccess";
    }
    
    /**
     * Export Interface with all details to zip file
     * 
     * @return
     */
    public String exportAtmInterface()
    {
	HttpServletResponse response = ServletActionContext.getResponse();
	// Only enter if there is a batch code
	if(!NumberUtil.isEmptyDecimal(this.criteria.getInterfaceId()))
	{
	    try
	    {
		// fill session data
		applySessionValues();

		byte[] zipBytes = atmImportExportBO.exportAtmInterface(criteria);

		// add the zip file to the response
		response.addHeader("content-disposition", "attachment;filename=\"" + criteria.getInterfaceId() + "_"
			+ criteria.getDescription() + "." + ConstantsCommon.ZIP_EXT);
		response.setContentType("application/zip");
		response.setHeader("Set-Cookie", "fileDownload=true; path=/");

		response.getOutputStream().write(zipBytes);
		response.getOutputStream().flush();
		response.getOutputStream().close();

	    }
	    catch(Exception e)
	    {
		handleException(e, null, null);
		try
		{
		    response.getOutputStream().write(get_error().getBytes(FileUtil.DEFAULT_FILE_ENCODING));
		    response.getOutputStream().flush();
		    response.getOutputStream().close();
		}
		catch(UnsupportedEncodingException e1)
		{
		    log.error(e1, "Error in export Interface Details");
		}
		catch(IOException e1)
		{
		    log.error(e1, "Error in export Interface Details");
		}
	    }
	}
	return SUCCESS;

    }

    /**
     * Method to Apply Session values
     * 
     * @return
     */
    private void applySessionValues()
    {
	if(atmInterfaceCO == null)
	{
	    atmInterfaceCO = new AtmInterfaceCO();
	}
	SessionCO sessionCO = returnSessionObject();
	atmInterfaceCO.setCompCode(sessionCO.getCompanyCode());
	atmInterfaceCO.setUserId(sessionCO.getUserName());
	atmInterfaceCO.setRunningDate(sessionCO.getRunningDateRET());
	atmInterfaceCO.setBranchCode(sessionCO.getBranchCode());
	atmInterfaceCO.setAppName(sessionCO.getCurrentAppName());
	atmInterfaceCO.setLanguage(sessionCO.getLanguage());
	
	criteria.setUserId(sessionCO.getUserName());
	criteria.setRunningDate(sessionCO.getRunningDateRET());
	criteria.setCompCode(sessionCO.getCompanyCode());
    }

    public void setAtmInterfaceCO(AtmInterfaceCO atmInterfaceCO)
    {
	this.atmInterfaceCO = atmInterfaceCO;
    }

    public void setCriteria(AtmInterfaceSC criteria)
    {
	this.criteria = criteria;
    }

    public AtmInterfaceCO getAtmInterfaceCO()
    {
	return atmInterfaceCO;
    }

    public AtmInterfaceSC getCriteria()
    {
	return criteria;
    }

    public File getUploadFile()
    {
	return uploadFile;
    }

    public void setAtmImportExportBO(AtmImportExportBO atmImportExportBO)
    {
	this.atmImportExportBO = atmImportExportBO;
    }

    public void setUploadFile(File uploadFile)
    {
	this.uploadFile = uploadFile;
    }
}