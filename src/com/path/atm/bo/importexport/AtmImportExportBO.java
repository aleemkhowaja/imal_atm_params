package com.path.atm.bo.importexport;

import java.io.File;

import com.path.atm.vo.atminterface.AtmInterfaceCO;
import com.path.atm.vo.atminterface.AtmInterfaceSC;
import com.path.lib.common.exception.BaseException;

/**
 * 
 * Copyright 2020, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * @author: Alim Khowaja
 *
 * AtmImportExportBO.java used to
 */
public interface AtmImportExportBO
{
    
    /**
     * export file
     * @param criteria
     * @return
     * @throws BaseException
     */
    public byte[] exportAtmInterface(AtmInterfaceSC criteria) throws BaseException;
    
    /**
     * import file
     * @param criteria
     * @param importedFile
     * @param operationType
     * @return
     * @throws BaseException
     */
    public void importAtmInterface(AtmInterfaceCO atmInterfaceCO, AtmInterfaceSC criteria, File importedFile) throws BaseException;
}
