package com.path.atm.vo.atmenginecontrol;

import java.util.Date;
import com.path.dbmaps.vo.ATM_ENG_ACTION_LOGVO;
import com.path.dbmaps.vo.ATM_ENG_INCOMING_REQUESTVO;
import com.path.dbmaps.vo.ATM_ENG_INCOMING_REQ_DETAILVO;
import com.path.dbmaps.vo.ATM_ENG_INTERFACEVO;
import com.path.dbmaps.vo.ATM_ENG_OUTGOING_RESPONSEVO;
import com.path.atm.vo.common.ATMBaseCO;

/**
 * Used as engine data holder
 * 
 * @author MohammadAliMezzawi
 *
 */
public class ATMEngineControlCO extends ATMBaseCO {

	private static final long serialVersionUID = 1L;

	/**
	 * Incoming Request
	 */
	private ATM_ENG_INCOMING_REQUESTVO incoming_ReqVO = new ATM_ENG_INCOMING_REQUESTVO();

	/**
	 * Incoming request details
	 */
	private ATM_ENG_INCOMING_REQ_DETAILVO incoming_Req_DetailVO = new ATM_ENG_INCOMING_REQ_DETAILVO();

	/**
	 * Outgoing response
	 */
	private ATM_ENG_OUTGOING_RESPONSEVO outgoing_RespVO = new ATM_ENG_OUTGOING_RESPONSEVO();

	private ATM_ENG_INTERFACEVO atm_ENG_INTERFACEVO = new ATM_ENG_INTERFACEVO();
	private ATM_ENG_ACTION_LOGVO atm_ENG_ACTIONLOGVO = new ATM_ENG_ACTION_LOGVO();

	private String response;
	private String STATUS;
	private String STATUS_DESC;

	// filter record
	private Date startDate;
	private Date endDate;

	public ATM_ENG_INCOMING_REQUESTVO getIncoming_ReqVO() {
		return incoming_ReqVO;
	}

	public void setIncoming_ReqVO(ATM_ENG_INCOMING_REQUESTVO incoming_ReqVO) {
		this.incoming_ReqVO = incoming_ReqVO;
	}

	public ATM_ENG_INCOMING_REQ_DETAILVO getIncoming_Req_DetailVO() {
		return incoming_Req_DetailVO;
	}

	public void setIncoming_Req_DetailVO(ATM_ENG_INCOMING_REQ_DETAILVO incoming_Req_DetailVO) {
		this.incoming_Req_DetailVO = incoming_Req_DetailVO;
	}

	public ATM_ENG_OUTGOING_RESPONSEVO getOutgoing_RespVO() {
		return outgoing_RespVO;
	}

	public void setOutgoing_RespVO(ATM_ENG_OUTGOING_RESPONSEVO outgoing_RespVO) {
		this.outgoing_RespVO = outgoing_RespVO;
	}

	public ATM_ENG_INTERFACEVO getAtm_ENG_INTERFACEVO() {
		return atm_ENG_INTERFACEVO;
	}

	public void setAtm_ENG_INTERFACEVO(ATM_ENG_INTERFACEVO atm_ENG_INTERFACEVO) {
		this.atm_ENG_INTERFACEVO = atm_ENG_INTERFACEVO;
	}

	public ATM_ENG_ACTION_LOGVO getAtm_ENG_ACTIONLOGVO() {
		return atm_ENG_ACTIONLOGVO;
	}

	public void setAtm_ENG_ACTIONLOGVO(ATM_ENG_ACTION_LOGVO atm_ENG_ACTIONLOGVO) {
		this.atm_ENG_ACTIONLOGVO = atm_ENG_ACTIONLOGVO;
	}

	public String getResponse() {
		return response;
	}

	public void setResponse(String response) {
		this.response = response;
	}

	public String getSTATUS() {
		return STATUS;
	}

	public void setSTATUS(String sTATUS) {
		STATUS = sTATUS;
	}

	public String getSTATUS_DESC() {
		return STATUS_DESC;
	}

	public void setSTATUS_DESC(String sTATUS_DESC) {
		STATUS_DESC = sTATUS_DESC;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

}
