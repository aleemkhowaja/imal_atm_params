package com.path.atm.dbmaps.vo;

import com.path.lib.vo.BaseVO;
import java.math.BigDecimal;
import java.util.Date;

public class GTW_ATM_MERCHANTVO extends BaseVO {
    /**
     * This field corresponds to the database column GTW_ATM_MERCHANT.COMP_CODE
     */
    private BigDecimal COMP_CODE;

    /**
     * This field corresponds to the database column GTW_ATM_MERCHANT.MERCHANT_CODE
     */
    private BigDecimal MERCHANT_CODE;

    /**
     * This field corresponds to the database column GTW_ATM_MERCHANT.ADDITIONAL_REFERENCE
     */
    private String ADDITIONAL_REFERENCE;

    /**
     * This field corresponds to the database column GTW_ATM_MERCHANT.IBAN_ACC_NO
     */
    private String IBAN_ACC_NO;

    /**
     * This field corresponds to the database column GTW_ATM_MERCHANT.REMARK
     */
    private String REMARK;

    /**
     * This field corresponds to the database column GTW_ATM_MERCHANT.STATUS
     */
    private String STATUS;

    /**
     * This field corresponds to the database column GTW_ATM_MERCHANT.CREATED_BY
     */
    private String CREATED_BY;

    /**
     * This field corresponds to the database column GTW_ATM_MERCHANT.CREATED_DATE
     */
    private Date CREATED_DATE;

    /**
     * This field corresponds to the database column GTW_ATM_MERCHANT.MODIFIED_BY
     */
    private String MODIFIED_BY;

    /**
     * This field corresponds to the database column GTW_ATM_MERCHANT.MODIFIED_DATE
     */
    private Date MODIFIED_DATE;

    /**
     * This field corresponds to the database column GTW_ATM_MERCHANT.APPROVED_BY
     */
    private String APPROVED_BY;

    /**
     * This field corresponds to the database column GTW_ATM_MERCHANT.APPROVED_DATE
     */
    private Date APPROVED_DATE;

    /**
     * This field corresponds to the database column GTW_ATM_MERCHANT.SUSPENDED_BY
     */
    private String SUSPENDED_BY;

    /**
     * This field corresponds to the database column GTW_ATM_MERCHANT.SUSPENDED_DATE
     */
    private Date SUSPENDED_DATE;

    /**
     * This field corresponds to the database column GTW_ATM_MERCHANT.TO_BE_STATUS
     */
    private String TO_BE_STATUS;

    /**
     * This field corresponds to the database column GTW_ATM_MERCHANT.TO_BE_STATUS_BY
     */
    private String TO_BE_STATUS_BY;

    /**
     * This field corresponds to the database column GTW_ATM_MERCHANT.TO_BE_STATUS_DATE
     */
    private Date TO_BE_STATUS_DATE;

    /**
     * This field corresponds to the database column GTW_ATM_MERCHANT.DELETED_BY
     */
    private String DELETED_BY;

    /**
     * This field corresponds to the database column GTW_ATM_MERCHANT.DELETED_DATE
     */
    private Date DELETED_DATE;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column GTW_ATM_MERCHANT.COMP_CODE
     *
     * @return the value of GTW_ATM_MERCHANT.COMP_CODE
     */
    public BigDecimal getCOMP_CODE() {
        return COMP_CODE;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column GTW_ATM_MERCHANT.COMP_CODE
     *
     * @param COMP_CODE the value for GTW_ATM_MERCHANT.COMP_CODE
     */
    public void setCOMP_CODE(BigDecimal COMP_CODE) {
        this.COMP_CODE = COMP_CODE;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column GTW_ATM_MERCHANT.MERCHANT_CODE
     *
     * @return the value of GTW_ATM_MERCHANT.MERCHANT_CODE
     */
    public BigDecimal getMERCHANT_CODE() {
        return MERCHANT_CODE;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column GTW_ATM_MERCHANT.MERCHANT_CODE
     *
     * @param MERCHANT_CODE the value for GTW_ATM_MERCHANT.MERCHANT_CODE
     */
    public void setMERCHANT_CODE(BigDecimal MERCHANT_CODE) {
        this.MERCHANT_CODE = MERCHANT_CODE;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column GTW_ATM_MERCHANT.ADDITIONAL_REFERENCE
     *
     * @return the value of GTW_ATM_MERCHANT.ADDITIONAL_REFERENCE
     */
    public String getADDITIONAL_REFERENCE() {
        return ADDITIONAL_REFERENCE;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column GTW_ATM_MERCHANT.ADDITIONAL_REFERENCE
     *
     * @param ADDITIONAL_REFERENCE the value for GTW_ATM_MERCHANT.ADDITIONAL_REFERENCE
     */
    public void setADDITIONAL_REFERENCE(String ADDITIONAL_REFERENCE) {
        this.ADDITIONAL_REFERENCE = ADDITIONAL_REFERENCE == null ? null : ADDITIONAL_REFERENCE.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column GTW_ATM_MERCHANT.IBAN_ACC_NO
     *
     * @return the value of GTW_ATM_MERCHANT.IBAN_ACC_NO
     */
    public String getIBAN_ACC_NO() {
        return IBAN_ACC_NO;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column GTW_ATM_MERCHANT.IBAN_ACC_NO
     *
     * @param IBAN_ACC_NO the value for GTW_ATM_MERCHANT.IBAN_ACC_NO
     */
    public void setIBAN_ACC_NO(String IBAN_ACC_NO) {
        this.IBAN_ACC_NO = IBAN_ACC_NO == null ? null : IBAN_ACC_NO.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column GTW_ATM_MERCHANT.REMARK
     *
     * @return the value of GTW_ATM_MERCHANT.REMARK
     */
    public String getREMARK() {
        return REMARK;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column GTW_ATM_MERCHANT.REMARK
     *
     * @param REMARK the value for GTW_ATM_MERCHANT.REMARK
     */
    public void setREMARK(String REMARK) {
        this.REMARK = REMARK == null ? null : REMARK.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column GTW_ATM_MERCHANT.STATUS
     *
     * @return the value of GTW_ATM_MERCHANT.STATUS
     */
    public String getSTATUS() {
        return STATUS;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column GTW_ATM_MERCHANT.STATUS
     *
     * @param STATUS the value for GTW_ATM_MERCHANT.STATUS
     */
    public void setSTATUS(String STATUS) {
        this.STATUS = STATUS == null ? null : STATUS.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column GTW_ATM_MERCHANT.CREATED_BY
     *
     * @return the value of GTW_ATM_MERCHANT.CREATED_BY
     */
    public String getCREATED_BY() {
        return CREATED_BY;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column GTW_ATM_MERCHANT.CREATED_BY
     *
     * @param CREATED_BY the value for GTW_ATM_MERCHANT.CREATED_BY
     */
    public void setCREATED_BY(String CREATED_BY) {
        this.CREATED_BY = CREATED_BY == null ? null : CREATED_BY.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column GTW_ATM_MERCHANT.CREATED_DATE
     *
     * @return the value of GTW_ATM_MERCHANT.CREATED_DATE
     */
    public Date getCREATED_DATE() {
        return CREATED_DATE;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column GTW_ATM_MERCHANT.CREATED_DATE
     *
     * @param CREATED_DATE the value for GTW_ATM_MERCHANT.CREATED_DATE
     */
    public void setCREATED_DATE(Date CREATED_DATE) {
        this.CREATED_DATE = CREATED_DATE;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column GTW_ATM_MERCHANT.MODIFIED_BY
     *
     * @return the value of GTW_ATM_MERCHANT.MODIFIED_BY
     */
    public String getMODIFIED_BY() {
        return MODIFIED_BY;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column GTW_ATM_MERCHANT.MODIFIED_BY
     *
     * @param MODIFIED_BY the value for GTW_ATM_MERCHANT.MODIFIED_BY
     */
    public void setMODIFIED_BY(String MODIFIED_BY) {
        this.MODIFIED_BY = MODIFIED_BY == null ? null : MODIFIED_BY.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column GTW_ATM_MERCHANT.MODIFIED_DATE
     *
     * @return the value of GTW_ATM_MERCHANT.MODIFIED_DATE
     */
    public Date getMODIFIED_DATE() {
        return MODIFIED_DATE;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column GTW_ATM_MERCHANT.MODIFIED_DATE
     *
     * @param MODIFIED_DATE the value for GTW_ATM_MERCHANT.MODIFIED_DATE
     */
    public void setMODIFIED_DATE(Date MODIFIED_DATE) {
        this.MODIFIED_DATE = MODIFIED_DATE;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column GTW_ATM_MERCHANT.APPROVED_BY
     *
     * @return the value of GTW_ATM_MERCHANT.APPROVED_BY
     */
    public String getAPPROVED_BY() {
        return APPROVED_BY;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column GTW_ATM_MERCHANT.APPROVED_BY
     *
     * @param APPROVED_BY the value for GTW_ATM_MERCHANT.APPROVED_BY
     */
    public void setAPPROVED_BY(String APPROVED_BY) {
        this.APPROVED_BY = APPROVED_BY == null ? null : APPROVED_BY.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column GTW_ATM_MERCHANT.APPROVED_DATE
     *
     * @return the value of GTW_ATM_MERCHANT.APPROVED_DATE
     */
    public Date getAPPROVED_DATE() {
        return APPROVED_DATE;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column GTW_ATM_MERCHANT.APPROVED_DATE
     *
     * @param APPROVED_DATE the value for GTW_ATM_MERCHANT.APPROVED_DATE
     */
    public void setAPPROVED_DATE(Date APPROVED_DATE) {
        this.APPROVED_DATE = APPROVED_DATE;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column GTW_ATM_MERCHANT.SUSPENDED_BY
     *
     * @return the value of GTW_ATM_MERCHANT.SUSPENDED_BY
     */
    public String getSUSPENDED_BY() {
        return SUSPENDED_BY;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column GTW_ATM_MERCHANT.SUSPENDED_BY
     *
     * @param SUSPENDED_BY the value for GTW_ATM_MERCHANT.SUSPENDED_BY
     */
    public void setSUSPENDED_BY(String SUSPENDED_BY) {
        this.SUSPENDED_BY = SUSPENDED_BY == null ? null : SUSPENDED_BY.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column GTW_ATM_MERCHANT.SUSPENDED_DATE
     *
     * @return the value of GTW_ATM_MERCHANT.SUSPENDED_DATE
     */
    public Date getSUSPENDED_DATE() {
        return SUSPENDED_DATE;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column GTW_ATM_MERCHANT.SUSPENDED_DATE
     *
     * @param SUSPENDED_DATE the value for GTW_ATM_MERCHANT.SUSPENDED_DATE
     */
    public void setSUSPENDED_DATE(Date SUSPENDED_DATE) {
        this.SUSPENDED_DATE = SUSPENDED_DATE;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column GTW_ATM_MERCHANT.TO_BE_STATUS
     *
     * @return the value of GTW_ATM_MERCHANT.TO_BE_STATUS
     */
    public String getTO_BE_STATUS() {
        return TO_BE_STATUS;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column GTW_ATM_MERCHANT.TO_BE_STATUS
     *
     * @param TO_BE_STATUS the value for GTW_ATM_MERCHANT.TO_BE_STATUS
     */
    public void setTO_BE_STATUS(String TO_BE_STATUS) {
        this.TO_BE_STATUS = TO_BE_STATUS == null ? null : TO_BE_STATUS.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column GTW_ATM_MERCHANT.TO_BE_STATUS_BY
     *
     * @return the value of GTW_ATM_MERCHANT.TO_BE_STATUS_BY
     */
    public String getTO_BE_STATUS_BY() {
        return TO_BE_STATUS_BY;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column GTW_ATM_MERCHANT.TO_BE_STATUS_BY
     *
     * @param TO_BE_STATUS_BY the value for GTW_ATM_MERCHANT.TO_BE_STATUS_BY
     */
    public void setTO_BE_STATUS_BY(String TO_BE_STATUS_BY) {
        this.TO_BE_STATUS_BY = TO_BE_STATUS_BY == null ? null : TO_BE_STATUS_BY.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column GTW_ATM_MERCHANT.TO_BE_STATUS_DATE
     *
     * @return the value of GTW_ATM_MERCHANT.TO_BE_STATUS_DATE
     */
    public Date getTO_BE_STATUS_DATE() {
        return TO_BE_STATUS_DATE;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column GTW_ATM_MERCHANT.TO_BE_STATUS_DATE
     *
     * @param TO_BE_STATUS_DATE the value for GTW_ATM_MERCHANT.TO_BE_STATUS_DATE
     */
    public void setTO_BE_STATUS_DATE(Date TO_BE_STATUS_DATE) {
        this.TO_BE_STATUS_DATE = TO_BE_STATUS_DATE;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column GTW_ATM_MERCHANT.DELETED_BY
     *
     * @return the value of GTW_ATM_MERCHANT.DELETED_BY
     */
    public String getDELETED_BY() {
        return DELETED_BY;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column GTW_ATM_MERCHANT.DELETED_BY
     *
     * @param DELETED_BY the value for GTW_ATM_MERCHANT.DELETED_BY
     */
    public void setDELETED_BY(String DELETED_BY) {
        this.DELETED_BY = DELETED_BY == null ? null : DELETED_BY.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column GTW_ATM_MERCHANT.DELETED_DATE
     *
     * @return the value of GTW_ATM_MERCHANT.DELETED_DATE
     */
    public Date getDELETED_DATE() {
        return DELETED_DATE;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column GTW_ATM_MERCHANT.DELETED_DATE
     *
     * @param DELETED_DATE the value for GTW_ATM_MERCHANT.DELETED_DATE
     */
    public void setDELETED_DATE(Date DELETED_DATE) {
        this.DELETED_DATE = DELETED_DATE;
    }
}