package com.path.atm.dbmaps.vo;

import com.path.lib.vo.BaseVO;
import java.math.BigDecimal;

public class GTW_ATM_SYS_PARAM_ISO_FLDSVO extends BaseVO {
    /**
     * This field corresponds to the database column GTW_ATM_SYS_PARAM_ISO_FLDS.ID
     */
    private BigDecimal SYS_PARAM_ISO_FLDS_ID;

    /**
     * This field corresponds to the database column GTW_ATM_SYS_PARAM_ISO_FLDS.LENGTH
     */
    private BigDecimal LENGTH;

    /**
     * This field corresponds to the database column GTW_ATM_SYS_PARAM_ISO_FLDS.NAME
     */
    private String NAME;

    /**
     * This field corresponds to the database column GTW_ATM_SYS_PARAM_ISO_FLDS.FIELD_TYPE
     */
    private String FIELD_TYPE;
    
    /**
     * This field corresponds to the database column GTW_ATM_SYS_PARAM_ISO_FLDS.DYNAMIC_LENGTH
     */
    private BigDecimal DYNAMIC_LENGTH;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column GTW_ATM_SYS_PARAM_ISO_FLDS.SYS_PARAM_ISO_FLDS_ID
     *
     * @return the value of GTW_ATM_SYS_PARAM_ISO_FLDS.SYS_PARAM_ISO_FLDS_ID
     */
    public BigDecimal getSYS_PARAM_ISO_FLDS_ID() {
        return SYS_PARAM_ISO_FLDS_ID;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column GTW_ATM_SYS_PARAM_ISO_FLDS.SYS_PARAM_ISO_FLDS_ID
     *
     * @param SYS_PARAM_ISO_FLDS_ID the value for GTW_ATM_SYS_PARAM_ISO_FLDS.SYS_PARAM_ISO_FLDS_ID
     */
    public void setSYS_PARAM_ISO_FLDS_ID(BigDecimal SYS_PARAM_ISO_FLDS_ID) {
        this.SYS_PARAM_ISO_FLDS_ID = SYS_PARAM_ISO_FLDS_ID;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column GTW_ATM_SYS_PARAM_ISO_FLDS.LENGTH
     *
     * @return the value of GTW_ATM_SYS_PARAM_ISO_FLDS.LENGTH
     */
    public BigDecimal getLENGTH() {
        return LENGTH;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column GTW_ATM_SYS_PARAM_ISO_FLDS.LENGTH
     *
     * @param LENGTH the value for GTW_ATM_SYS_PARAM_ISO_FLDS.LENGTH
     */
    public void setLENGTH(BigDecimal LENGTH) {
        this.LENGTH = LENGTH;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column GTW_ATM_SYS_PARAM_ISO_FLDS.NAME
     *
     * @return the value of GTW_ATM_SYS_PARAM_ISO_FLDS.NAME
     */
    public String getNAME() {
        return NAME;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column GTW_ATM_SYS_PARAM_ISO_FLDS.NAME
     *
     * @param NAME the value for GTW_ATM_SYS_PARAM_ISO_FLDS.NAME
     */
    public void setNAME(String NAME) {
        this.NAME = NAME == null ? null : NAME.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column GTW_ATM_SYS_PARAM_ISO_FLDS.FIELD_TYPE
     *
     * @return the value of GTW_ATM_SYS_PARAM_ISO_FLDS.FIELD_TYPE
     */
    public String getFIELD_TYPE() {
        return FIELD_TYPE;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column GTW_ATM_SYS_PARAM_ISO_FLDS.FIELD_TYPE
     *
     * @param FIELD_TYPE the value for GTW_ATM_SYS_PARAM_ISO_FLDS.FIELD_TYPE
     */
    public void setFIELD_TYPE(String FIELD_TYPE) {
        this.FIELD_TYPE = FIELD_TYPE == null ? null : FIELD_TYPE.trim();
    }
    
    
    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column GTW_ATM_SYS_PARAM_ISO_FLDS.DYNAMIC_LENGTH
     *
     * @return the value of GTW_ATM_SYS_PARAM_ISO_FLDS.DYNAMIC_LENGTH
     */
    public BigDecimal getDYNAMIC_LENGTH() {
        return DYNAMIC_LENGTH;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column GTW_ATM_SYS_PARAM_ISO_FLDS.DYNAMIC_LENGTH
     *
     * @param LENGTH the value for GTW_ATM_SYS_PARAM_ISO_FLDS.DYNAMIC_LENGTH
     */
    public void setDYNAMIC_LENGTH(BigDecimal DYNAMIC_LENGTH) {
        this.DYNAMIC_LENGTH = DYNAMIC_LENGTH;
    }
}