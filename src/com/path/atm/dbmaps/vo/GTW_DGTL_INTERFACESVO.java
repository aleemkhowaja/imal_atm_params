package com.path.atm.dbmaps.vo;

import com.path.lib.vo.BaseVO;
import java.math.BigDecimal;
import java.util.Date;

public class GTW_DGTL_INTERFACESVO extends BaseVO {
    /**
     * This field corresponds to the database column GTW_DGTL_INTERFACES.CODE
     */
    private BigDecimal CODE;

    /**
     * This field corresponds to the database column GTW_DGTL_INTERFACES.COMP_CODE
     */
    private BigDecimal COMP_CODE;

    /**
     * This field corresponds to the database column GTW_DGTL_INTERFACES.BRIEF_DESCRIPTION
     */
    private String BRIEF_DESCRIPTION;

    /**
     * This field corresponds to the database column GTW_DGTL_INTERFACES.LONG_DESCRIPTION
     */
    private String LONG_DESCRIPTION;

    /**
     * This field corresponds to the database column GTW_DGTL_INTERFACES.INTERFACE_TYPE
     */
    private String INTERFACE_TYPE;

    /**
     * This field corresponds to the database column GTW_DGTL_INTERFACES.STATUS
     */
    private String STATUS;

    /**
     * This field corresponds to the database column GTW_DGTL_INTERFACES.CREATED_BY
     */
    private String CREATED_BY;

    /**
     * This field corresponds to the database column GTW_DGTL_INTERFACES.CREATED_DATE
     */
    private Date CREATED_DATE;

    /**
     * This field corresponds to the database column GTW_DGTL_INTERFACES.MODIFIED_BY
     */
    private String MODIFIED_BY;

    /**
     * This field corresponds to the database column GTW_DGTL_INTERFACES.MODIFIED_DATE
     */
    private Date MODIFIED_DATE;

    /**
     * This field corresponds to the database column GTW_DGTL_INTERFACES.APPROVED_BY
     */
    private String APPROVED_BY;

    /**
     * This field corresponds to the database column GTW_DGTL_INTERFACES.APPROVED_DATE
     */
    private Date APPROVED_DATE;

    /**
     * This field corresponds to the database column GTW_DGTL_INTERFACES.DELETED_BY
     */
    private String DELETED_BY;

    /**
     * This field corresponds to the database column GTW_DGTL_INTERFACES.DELETED_DATE
     */
    private Date DELETED_DATE;

    /**
     * This field corresponds to the database column GTW_DGTL_INTERFACES.SUSPENDED_BY
     */
    private String SUSPENDED_BY;

    /**
     * This field corresponds to the database column GTW_DGTL_INTERFACES.SUSPENDED_DATE
     */
    private Date SUSPENDED_DATE;

    /**
     * This field corresponds to the database column GTW_DGTL_INTERFACES.REACTIVATED_BY
     */
    private String REACTIVATED_BY;

    /**
     * This field corresponds to the database column GTW_DGTL_INTERFACES.REACTIVATED_DATE
     */
    private Date REACTIVATED_DATE;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column GTW_DGTL_INTERFACES.CODE
     *
     * @return the value of GTW_DGTL_INTERFACES.CODE
     */
    public BigDecimal getCODE() {
        return CODE;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column GTW_DGTL_INTERFACES.CODE
     *
     * @param CODE the value for GTW_DGTL_INTERFACES.CODE
     */
    public void setCODE(BigDecimal CODE) {
        this.CODE = CODE;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column GTW_DGTL_INTERFACES.COMP_CODE
     *
     * @return the value of GTW_DGTL_INTERFACES.COMP_CODE
     */
    public BigDecimal getCOMP_CODE() {
        return COMP_CODE;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column GTW_DGTL_INTERFACES.COMP_CODE
     *
     * @param COMP_CODE the value for GTW_DGTL_INTERFACES.COMP_CODE
     */
    public void setCOMP_CODE(BigDecimal COMP_CODE) {
        this.COMP_CODE = COMP_CODE;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column GTW_DGTL_INTERFACES.BRIEF_DESCRIPTION
     *
     * @return the value of GTW_DGTL_INTERFACES.BRIEF_DESCRIPTION
     */
    public String getBRIEF_DESCRIPTION() {
        return BRIEF_DESCRIPTION;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column GTW_DGTL_INTERFACES.BRIEF_DESCRIPTION
     *
     * @param BRIEF_DESCRIPTION the value for GTW_DGTL_INTERFACES.BRIEF_DESCRIPTION
     */
    public void setBRIEF_DESCRIPTION(String BRIEF_DESCRIPTION) {
        this.BRIEF_DESCRIPTION = BRIEF_DESCRIPTION == null ? null : BRIEF_DESCRIPTION.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column GTW_DGTL_INTERFACES.LONG_DESCRIPTION
     *
     * @return the value of GTW_DGTL_INTERFACES.LONG_DESCRIPTION
     */
    public String getLONG_DESCRIPTION() {
        return LONG_DESCRIPTION;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column GTW_DGTL_INTERFACES.LONG_DESCRIPTION
     *
     * @param LONG_DESCRIPTION the value for GTW_DGTL_INTERFACES.LONG_DESCRIPTION
     */
    public void setLONG_DESCRIPTION(String LONG_DESCRIPTION) {
        this.LONG_DESCRIPTION = LONG_DESCRIPTION == null ? null : LONG_DESCRIPTION.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column GTW_DGTL_INTERFACES.INTERFACE_TYPE
     *
     * @return the value of GTW_DGTL_INTERFACES.INTERFACE_TYPE
     */
    public String getINTERFACE_TYPE() {
        return INTERFACE_TYPE;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column GTW_DGTL_INTERFACES.INTERFACE_TYPE
     *
     * @param INTERFACE_TYPE the value for GTW_DGTL_INTERFACES.INTERFACE_TYPE
     */
    public void setINTERFACE_TYPE(String INTERFACE_TYPE) {
        this.INTERFACE_TYPE = INTERFACE_TYPE == null ? null : INTERFACE_TYPE.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column GTW_DGTL_INTERFACES.STATUS
     *
     * @return the value of GTW_DGTL_INTERFACES.STATUS
     */
    public String getSTATUS() {
        return STATUS;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column GTW_DGTL_INTERFACES.STATUS
     *
     * @param STATUS the value for GTW_DGTL_INTERFACES.STATUS
     */
    public void setSTATUS(String STATUS) {
        this.STATUS = STATUS == null ? null : STATUS.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column GTW_DGTL_INTERFACES.CREATED_BY
     *
     * @return the value of GTW_DGTL_INTERFACES.CREATED_BY
     */
    public String getCREATED_BY() {
        return CREATED_BY;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column GTW_DGTL_INTERFACES.CREATED_BY
     *
     * @param CREATED_BY the value for GTW_DGTL_INTERFACES.CREATED_BY
     */
    public void setCREATED_BY(String CREATED_BY) {
        this.CREATED_BY = CREATED_BY == null ? null : CREATED_BY.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column GTW_DGTL_INTERFACES.CREATED_DATE
     *
     * @return the value of GTW_DGTL_INTERFACES.CREATED_DATE
     */
    public Date getCREATED_DATE() {
        return CREATED_DATE;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column GTW_DGTL_INTERFACES.CREATED_DATE
     *
     * @param CREATED_DATE the value for GTW_DGTL_INTERFACES.CREATED_DATE
     */
    public void setCREATED_DATE(Date CREATED_DATE) {
        this.CREATED_DATE = CREATED_DATE;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column GTW_DGTL_INTERFACES.MODIFIED_BY
     *
     * @return the value of GTW_DGTL_INTERFACES.MODIFIED_BY
     */
    public String getMODIFIED_BY() {
        return MODIFIED_BY;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column GTW_DGTL_INTERFACES.MODIFIED_BY
     *
     * @param MODIFIED_BY the value for GTW_DGTL_INTERFACES.MODIFIED_BY
     */
    public void setMODIFIED_BY(String MODIFIED_BY) {
        this.MODIFIED_BY = MODIFIED_BY == null ? null : MODIFIED_BY.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column GTW_DGTL_INTERFACES.MODIFIED_DATE
     *
     * @return the value of GTW_DGTL_INTERFACES.MODIFIED_DATE
     */
    public Date getMODIFIED_DATE() {
        return MODIFIED_DATE;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column GTW_DGTL_INTERFACES.MODIFIED_DATE
     *
     * @param MODIFIED_DATE the value for GTW_DGTL_INTERFACES.MODIFIED_DATE
     */
    public void setMODIFIED_DATE(Date MODIFIED_DATE) {
        this.MODIFIED_DATE = MODIFIED_DATE;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column GTW_DGTL_INTERFACES.APPROVED_BY
     *
     * @return the value of GTW_DGTL_INTERFACES.APPROVED_BY
     */
    public String getAPPROVED_BY() {
        return APPROVED_BY;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column GTW_DGTL_INTERFACES.APPROVED_BY
     *
     * @param APPROVED_BY the value for GTW_DGTL_INTERFACES.APPROVED_BY
     */
    public void setAPPROVED_BY(String APPROVED_BY) {
        this.APPROVED_BY = APPROVED_BY == null ? null : APPROVED_BY.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column GTW_DGTL_INTERFACES.APPROVED_DATE
     *
     * @return the value of GTW_DGTL_INTERFACES.APPROVED_DATE
     */
    public Date getAPPROVED_DATE() {
        return APPROVED_DATE;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column GTW_DGTL_INTERFACES.APPROVED_DATE
     *
     * @param APPROVED_DATE the value for GTW_DGTL_INTERFACES.APPROVED_DATE
     */
    public void setAPPROVED_DATE(Date APPROVED_DATE) {
        this.APPROVED_DATE = APPROVED_DATE;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column GTW_DGTL_INTERFACES.DELETED_BY
     *
     * @return the value of GTW_DGTL_INTERFACES.DELETED_BY
     */
    public String getDELETED_BY() {
        return DELETED_BY;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column GTW_DGTL_INTERFACES.DELETED_BY
     *
     * @param DELETED_BY the value for GTW_DGTL_INTERFACES.DELETED_BY
     */
    public void setDELETED_BY(String DELETED_BY) {
        this.DELETED_BY = DELETED_BY == null ? null : DELETED_BY.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column GTW_DGTL_INTERFACES.DELETED_DATE
     *
     * @return the value of GTW_DGTL_INTERFACES.DELETED_DATE
     */
    public Date getDELETED_DATE() {
        return DELETED_DATE;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column GTW_DGTL_INTERFACES.DELETED_DATE
     *
     * @param DELETED_DATE the value for GTW_DGTL_INTERFACES.DELETED_DATE
     */
    public void setDELETED_DATE(Date DELETED_DATE) {
        this.DELETED_DATE = DELETED_DATE;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column GTW_DGTL_INTERFACES.SUSPENDED_BY
     *
     * @return the value of GTW_DGTL_INTERFACES.SUSPENDED_BY
     */
    public String getSUSPENDED_BY() {
        return SUSPENDED_BY;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column GTW_DGTL_INTERFACES.SUSPENDED_BY
     *
     * @param SUSPENDED_BY the value for GTW_DGTL_INTERFACES.SUSPENDED_BY
     */
    public void setSUSPENDED_BY(String SUSPENDED_BY) {
        this.SUSPENDED_BY = SUSPENDED_BY == null ? null : SUSPENDED_BY.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column GTW_DGTL_INTERFACES.SUSPENDED_DATE
     *
     * @return the value of GTW_DGTL_INTERFACES.SUSPENDED_DATE
     */
    public Date getSUSPENDED_DATE() {
        return SUSPENDED_DATE;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column GTW_DGTL_INTERFACES.SUSPENDED_DATE
     *
     * @param SUSPENDED_DATE the value for GTW_DGTL_INTERFACES.SUSPENDED_DATE
     */
    public void setSUSPENDED_DATE(Date SUSPENDED_DATE) {
        this.SUSPENDED_DATE = SUSPENDED_DATE;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column GTW_DGTL_INTERFACES.REACTIVATED_BY
     *
     * @return the value of GTW_DGTL_INTERFACES.REACTIVATED_BY
     */
    public String getREACTIVATED_BY() {
        return REACTIVATED_BY;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column GTW_DGTL_INTERFACES.REACTIVATED_BY
     *
     * @param REACTIVATED_BY the value for GTW_DGTL_INTERFACES.REACTIVATED_BY
     */
    public void setREACTIVATED_BY(String REACTIVATED_BY) {
        this.REACTIVATED_BY = REACTIVATED_BY == null ? null : REACTIVATED_BY.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column GTW_DGTL_INTERFACES.REACTIVATED_DATE
     *
     * @return the value of GTW_DGTL_INTERFACES.REACTIVATED_DATE
     */
    public Date getREACTIVATED_DATE() {
        return REACTIVATED_DATE;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column GTW_DGTL_INTERFACES.REACTIVATED_DATE
     *
     * @param REACTIVATED_DATE the value for GTW_DGTL_INTERFACES.REACTIVATED_DATE
     */
    public void setREACTIVATED_DATE(Date REACTIVATED_DATE) {
        this.REACTIVATED_DATE = REACTIVATED_DATE;
    }
}