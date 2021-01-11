/**
 * 
 */
package com.path.atm.bo.common;

import java.io.File;
import java.util.HashMap;
import org.apache.commons.io.FileUtils;
import org.codehaus.jackson.annotate.JsonAutoDetect.Visibility;
import org.codehaus.jackson.annotate.JsonMethod;
import org.codehaus.jackson.map.DeserializationConfig;
import org.codehaus.jackson.map.ObjectMapper;
import com.path.atm.vo.common.ATMBaseCO;
import com.path.bo.common.ConstantsCommon;
import com.path.bo.common.MessageCodes;
import com.path.bo.common.WebServiceCommonBO;
import com.path.lib.common.exception.BOException;
import com.path.lib.common.exception.BaseException;
import com.path.lib.common.util.FileUtil;
import com.path.lib.common.util.FileZipUtil;
import com.path.lib.common.util.PathFileSecure;
import com.path.lib.common.util.PathPropertyUtil;
import com.path.lib.common.util.StringUtil;
import com.path.lib.log.Log;
import com.path.lib.remote.RmiServiceCaller;
import com.path.struts2.json.PathJSONUtil;

import net.sf.json.JSONException;

/**
 * 
 * Copyright 2019, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: Alim Khowaja
 *
 * ATMCommonUtil.java used to
 */
public class ATMCommonUtil
{
    protected final static Log log = Log.getInstance();
    
    /*
     * validate Email Address
     */
    public static void validateEmail(String email) throws BaseException
    {

	if(StringUtil.isNotEmpty(email))
	{
	    int indexOfAt, indexOfDot, indexOfSpace;
	    indexOfAt = email.indexOf("@");
	    indexOfDot = email.indexOf(".");
	    indexOfSpace = email.indexOf(" ");
	    if(indexOfDot <= 0 || indexOfAt <= 0)
	    {
		throw new BOException(MessageCodes.INVALID_MISSING,new String[]{"please_enter_valid_email_key"});
	    }
	    else if(indexOfSpace != 0 && indexOfSpace != -1)
	    {
		throw new BOException(MessageCodes.INVALID_MISSING,new String[]{"email_address_should_not_contains_spaces_key"});

	    }
	}

    }
    
    /**
     * 
     * @return
     */
    public static String returnRmiUrlByApplication(String appName)
    {
	
	String rmiUrl = null;
	try
	{
	    if(StringUtil.nullToEmpty(appName).equalsIgnoreCase(ATMCommonConstants.APP_NAME_GTW))
	    {
		rmiUrl = PathPropertyUtil.returnPathPropertyFromFile(ATMCommonConstants.GTW_SERVICE_REMOTING, ATMCommonConstants.GTW_SERVICE_URL);
	    }
	    else
		if(StringUtil.nullToEmpty(appName).equalsIgnoreCase(ATMCommonConstants.APP_NAME_RET))
		{
		    rmiUrl = PathPropertyUtil.returnPathPropertyFromFile(ATMCommonConstants.RET_SERVICE_REMOTING, ATMCommonConstants.RET_SERVICE_URL);
		}
	    else
		if(StringUtil.nullToEmpty(appName).equalsIgnoreCase(ATMCommonConstants.APP_NAME_ATME))
		{
		    rmiUrl = PathPropertyUtil.returnPathPropertyFromFile(ATMCommonConstants.ATME_SERVICE_REMOTING, ATMCommonConstants.ATME_SERVICE_URL);
		}
	    rmiUrl = (rmiUrl == null) ? "" : rmiUrl;
	}
	catch(Exception e)
	{
	    e.printStackTrace();
	}
	return rmiUrl;
    }
    
    
    /**
     * return Cluster Urls
     * @return
     */
    public static String[] returnClusterUrls()
    {
	
	String clusterUrls[] = null;
	try
	{
	    String rmiUrl = PathPropertyUtil.returnPathPropertyFromFile(ATMCommonConstants.ATME_SERVICE_REMOTING, ATMCommonConstants.ATME_SERVICE_URL);
	    if(rmiUrl != null)
	    {
		clusterUrls = rmiUrl.split(",");
	    }
	}
	catch(Exception e)
	{
	    e.printStackTrace();
	}
	return clusterUrls;
    }
    
    /**
     * send RMI Call
     * @param serviceRmi
     * @param boWebServiceName
     * @param methodName
     * @param rmiObjectInputParamMap
     * @return
     */
    public static HashMap<String, Object> sendRMICall(String serviceRmi, String boWebServiceName, String methodName, HashMap<String, Object> rmiObjectInputParamMap)
    throws Exception
    {
		HashMap<String, Object> responseMap = new HashMap<String, Object>();
		WebServiceCommonBO rmiCallerBO = null;
		// return RMI interface
		rmiCallerBO = (WebServiceCommonBO) RmiServiceCaller.returnRmiInterface(serviceRmi, WebServiceCommonBO.class,
				"webServiceCommonBOService");
		// call the method through RMI
		responseMap = rmiCallerBO.executeBoMethod(boWebServiceName, methodName, rmiObjectInputParamMap);
		return responseMap;
    }
    
    
    public static byte[] returnDownloadFileByte(ATMBaseCO atmBaseCO, String fileName) throws BaseException
    {

	long currentTime = System.currentTimeMillis();

	// get the repository location
	String repositoryPath = FileUtil.getFileURLByName("repository");
	String name = File.separator+  ATMCommonConstants.APP_NAME_ATMP + "-"+fileName+ " - " + currentTime;
	String txtFileName = name + "." + ConstantsCommon.TXT_EXT;
	String txtFilePath = repositoryPath + txtFileName;
	String zipFileName = name + "." + ConstantsCommon.ZIP_EXT;
	String zipFilePath = repositoryPath + zipFileName;
	
	 byte[] zipBytes = null;
	try
	{
	    // serialize object to JSON
	    String exporterCOValue = null;
	    try
	    {
		exporterCOValue = PathJSONUtil.serialize(atmBaseCO, null, null, false, true);
	    }
	    catch(JSONException e)
	    {
		throw new BaseException("Unable to Serialize Object");
	    }
	    byte[] fileContent = exporterCOValue.getBytes();

	    // save the file to repository in order to be zipped
	    FileUtil.saveToRepository(fileContent, "repository", txtFileName);
	    // create a password protected zip file
	    FileZipUtil.generateProtectedZipFile(txtFilePath, zipFilePath, ATMCommonConstants.FILE_EXPORT_PASS, false);
	    zipBytes = FileUtil.readFileBytes(zipFilePath);
	}
	catch(Exception e)
	{
	    log.error(e, "Error in returnInterfaceExporter");
	    throw new BaseException("Unable to Generate Protected Zip File");
	}
	finally
	{
	    // delete files before return
	    deleteFileFromPath(txtFilePath);
	    deleteFileFromPath(zipFilePath);
	}
	return zipBytes;

    }
    
    public static  Object convertImportedFileToObject(File importedFile, String fileName , Class<?> c) throws BaseException
    {

	String repositoryPath = FileUtil.getFileURLByName("repository");
	long currentTime = System.currentTimeMillis();

	String name = File.separator + ATMCommonConstants.APP_NAME_ATMP + "-" + fileName + " - " + currentTime;
	String txtFileName = name + "." + ConstantsCommon.TXT_EXT;
	String txtFilePath = repositoryPath + txtFileName;
	String zipFileName = name + "." + ConstantsCommon.ZIP_EXT;
	String zipFilePath = repositoryPath + zipFileName;
	String unZipFilePath = repositoryPath + name;

	try
	{
	    FileUtils.copyFile(importedFile, new PathFileSecure(zipFilePath));
	    String destinationPath = FileZipUtil.extractProtectedZipFile(zipFilePath,
		    ATMCommonConstants.FILE_EXPORT_PASS, false);
	    File destinationFolder = new PathFileSecure(destinationPath);
	    File destinationFile = destinationFolder.listFiles()[0];
	    // limit the size of the file to be below of 200 MB = 200000000
	    // bytes
	    byte[] content = PathFileSecure.readFileToByteArray(destinationFile, 200000000);
	    String result = new String(content);
	    ObjectMapper mapper = new ObjectMapper();
	    mapper.setVisibility(JsonMethod.ALL, Visibility.NONE);
	    mapper.setVisibility(JsonMethod.FIELD, Visibility.ANY);
	    mapper.configure(DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES, false);
	   // AcquirerCO acquirerCO = new AcquirerCO();
	    Object ob = mapper.readValue(result, c);
	    return ob;

	}
	catch(Exception e)
	{
	    log.error(e, "error in convertImportedInterfaceFileToObject");
	    throw new BaseException("Unable to Import Zip File - Corrupted");
	}
	finally
	{
	    try
	    {

		deleteFileFromPath(zipFilePath);
		FileUtil.deleteFolder(unZipFilePath);

	    }
	    catch(Exception e)
	    {
		log.error(e, "error in convertImportedinterfaceFileToObject");
		throw new BaseException("Unable to delete Imported File");
	    }
	}
    }
    
    /**
     * @param filePath
     */
    private static void deleteFileFromPath(String filePath)
    {
	File flZip;
	try
	{
	    flZip = new PathFileSecure(filePath);
	    if(flZip.exists())
	    {
		boolean isDel = flZip.delete();
		if(!isDel)
		{
		    log.debug("The following file has not been deleted :" + filePath);
		}
	    }
	}
	catch(Exception e)
	{
	    log.error(e, "error while deleting file:" + filePath);
	}
    }
}