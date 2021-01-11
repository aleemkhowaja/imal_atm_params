package com.path.atm.bo.atminterface.isoutils;

import java.util.List;

import com.path.atm.bo.acquirer.AcquirerBO;
import com.path.atm.bo.acquirer.impl.AcquirerBOImpl;
import com.path.atm.vo.acquirer.AcquirerCO;
import com.path.atm.vo.acquirer.AcquirerSC;
import com.path.lib.common.exception.BaseException;

public class AcquirerList
{
    
    public static void main(String[] args)
    {
	AcquirerBO acquirerBO = new AcquirerBOImpl();
	AcquirerSC criteria = new AcquirerSC();
	criteria.setNbRec(-1);
	
	List<AcquirerCO> acquirerCOs;
	try
	{
	    acquirerCOs = acquirerBO.returnAcquirerList(criteria);
	    System.out.println("acquirer cos ="+acquirerCOs.size());
	}
	catch(BaseException e)
	{
	    // TODO Auto-generated catch block
	    e.printStackTrace();
	}
	
    }

}
