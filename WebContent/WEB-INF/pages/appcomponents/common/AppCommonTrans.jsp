<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@taglib uri="/path-struts-tags" prefix="ps"%>

<%/*Place all global script variables and its assigned trans messages */%>
<ps:hidden id="Break_of_Deposit_key_id" value="%{getText('Break_of_Deposit_key')}"/>
<ps:hidden id="cannot_be_less_than_or_equal_zero_key_id" value="%{getText('cannot_be_less_than_or_equal_zero_key')}"/>
<ps:hidden id="Market_Value_key_id" value="%{getText('Market_Value_key')}"/>
<ps:hidden id="Book_Value_key_id" value="%{getText('Book_Value_key')}"/>
<ps:hidden id="app_title_not_defined_id" value="%{getText('app_title_not_def_key')}"/>
<ps:hidden id="grid_addLabel_id" value="%{getText('btn.add')}"/>
<ps:hidden id="grid_editLabel_id" value="%{getText('btn.edit')}"/>
<ps:hidden id="grid_delLabel_id" value="%{getText('btn.del')}"/>
<ps:hidden id="grid_approveLabel_id" value="%{getText('Approve_key')}"/>
<ps:hidden id="grid_rejectLabel_id" value="%{getText('btn.reject')}"/>
<ps:hidden id="grid_createFromLabel_id" value="%{getText('btn.createFrom')}"/>
<ps:hidden id="saveLabel_id" value="%{getText('btn.save')}"/>
<ps:hidden id="msg_progDefaultLabel_id" value="%{getText('msg.pleaseWait')}"/>
<ps:hidden id="Change_running_date_key_id" value="%{getText('Change_running_date_key')}"/>
<ps:hidden id="invalid_widget_url_key" value="%{getText('invalid_widget_url')}"/>

<ps:hidden id="SMART_System_Maintenance_Additional_Reference_Table_key_id" value="%{getText('SMART_System_Maintenance_Additional_Reference_Table_key')}"/> 
<ps:hidden id="Smart_Details_not_defined_key_id" value="%{getText('Smart_Details_not_defined_key')}"/> 
<ps:hidden id="SMART_must_be_related_to_a_record_key_id" value="%{getText('SMART_must_be_related_to_a_record_key')}"/>
<ps:hidden id="Error_retrieving_file_from_database_key_id" value="%{getText('Error_retrieving_file_from_database_key')}"/>
<ps:hidden id="Preview_image_key_id" value="%{getText('Preview_image_key')}"/>
<ps:hidden id="Mandatory_Field_key_id" value="%{getText('Mandatory_Field_key')}"/>

<ps:hidden id="msg_noRecordSelectedLabel_id" value="%{getText('msg.no_record_selected')}"/>

<ps:hidden id="Total_Amount_key_id" value="%{getText('Total_Amount_key')}"/>
<ps:hidden id="Warning_key_id" value="%{getText('Warning_key')}"/>
<ps:hidden id="total_All_id" value="%{getText('Total_All')}"/>

<ps:hidden id="Confirm_Approve_Process_key_id" value="%{getText('Confirm_Approve_Process_key')}"/>
<ps:hidden id="Confirm_Reject_Process_key_id" value="%{getText('Confirm_Reject_Process_key')}"/>
<ps:hidden id="Confirm_Reinstate_Process_key_id" value="%{getText('Confirm_Reinstate_Process_key')}"/>
<ps:hidden id="Confirm_Reactivate_Process_key_id" value="%{getText('Confirm_Reactivate_Process_key')}"/>
<ps:hidden id="Confirm_Suspend_Process_key_id" value="%{getText('Confirm_Suspend_Process_key')}"/>
<ps:hidden id="Confirm_Proceed_key_id" value="%{getText('Confirm_Proceed_key')}"/>
<ps:hidden id="Confirm_Delete_Process_key_id" value="%{getText('Confirm_Delete_Process_key')}"/>
<ps:hidden id="Confirm_Export_Process_key_id" value="%{getText('Confirm_Export_Process_key')}"/>
<ps:hidden id="Confirm_Save_Process_key" value="%{getEscText('Confirm_Save_Process_key')}"/>
<%/* below id added by Marie-Joe for tp#681235 */%>
<ps:hidden id="Confirm_Reverse_Process_key_id" value="%{getEscText('Confirm_Reverse_Process_key')}"/>

<ps:hidden id="date_of_birth_label_id" value="%{getText('Date_of_Birth_key')}"/>
<ps:hidden id="birthDate_label_id" value="%{getText('Birth_Date_key')}"/>
<ps:hidden id="estbDate_label_id" value="%{getText('Establishment_Date_key')}"/>

<%/* info/error/warning/confirm Messages */%>
<ps:hidden id="error_msg_title_id" value="%{getText('error_title_key')}"/>
<ps:hidden id="success_msg_title_id" value="%{getText('success_title_key')}"/>
<ps:hidden id="confirm_msg_title_id" value="%{getText('confirm_title_key')}"/>
<ps:hidden id="warning_msg_title_id" value="%{getText('warning_title_key')}"/>
<ps:hidden id="info_msg_title_id" value="%{getText('info_title_key')}"/>
<ps:hidden id="proceed_msg_title_id" value="%{getText('proceed_key')}"/>
<ps:hidden id="changes_made_confirm_msg_id" value="%{getText('changes_made_confirm_key')}"/>
<ps:hidden id="changes_not_available_key_id" value="%{getText('changes_not_available_key')}"/>
<ps:hidden id="missing_selection_type_key_id" value="%{getText('missing_selection_type_key')}"/>
<ps:hidden id="cache_cleared_success_key_id" value="%{getText('cache_cleared_success_key')}"/>
<ps:hidden id="close_all_opened_screen_key_id" value="%{getText('close_all_opened_screen_key')}"/>

<ps:hidden id="period_label_id" value="%{getText('Period_key')}"/>
<ps:hidden id="creditRating_label_id" value="%{getText('Credit_Rating_key')}"/>
<ps:hidden id="trx_type_label_id" value="%{getText('Trx_Type_key')}"/>
<ps:hidden id="reason_code_label_id" value="%{getText('Reason_Code_key')}"/>
<ps:hidden id="charges_schema_details_label_id" value="%{getText('Charges_Schema_Details_key')}"/>
<ps:hidden id="cash_account_label_id" value="%{getText('Cash_Account_key')}"/>
<ps:hidden id="missing_elt_msg_key_id" value="%{getText('missing_elt_key')}"/>
<ps:hidden id="account_Position_key_id" value="%{getText('Account_Position_key')}"/>

<%/*Change Password screen*/%>
<ps:hidden id="relogin_btn_key_id" value="%{getText('relogin_key')}"/>
<ps:hidden id="fill_old_pwd_msg_key_id" value="%{getText('fill_old_pwd_key')}"/>
<ps:hidden id="fill_both_msg_key_id" value="%{getText('fill_both_key')}"/>

<ps:hidden id="charges_Details_key_id" value="%{getText('charges_details_key')}"/>
<ps:hidden id="choose_a_schema_first_msg_id" value="%{getText('choose_a_schema_first_key')}"/>

<ps:hidden id="calculation_done_msg_id" value="%{getText('calc_done_key')}"/>
<ps:hidden id="charges_Schema_key_id" value="%{getText('Charges_Schema_key')}"/>
<ps:hidden id="account_Type_key_id" value="%{getText('Account_Type_key')}"/>
<ps:hidden id="acc_nb_key_id" value="%{getText('acc_no_key')}"/>

<ps:hidden id="record_was_Approved_Successfully_key_id" value="%{getText('Record_was_Approved_Successfully_key')}"/>
<ps:hidden id="record_was_Suspended_Successfully_key_id" value="%{getText('Record_was_Suspended_Successfully_key')}"/>
<ps:hidden id="record_was_Deleted_Successfully_key_id" value="%{getText('Record_was_Deleted_Successfully_key')}"/>
<ps:hidden id="record_was_Updated_Successfully_key_id" value="%{getText('Record_was_Updated_Successfully_key')}"/>
<ps:hidden id="record_was_Reinstated_Successfully_key_id" value="%{getText('Record_was_Reinstated_Successfully_key')}"/>
<ps:hidden id="record_was_Validated_Successfully_key_id" value="%{getText('Record_was_Validated_Successfully_key')}"/>
<ps:hidden id="record_saved_Successfully_key_id" value="%{getText('Record_Saved_Successfully_key')}"/>
<ps:hidden id="Authorized_Suspended_Successfully_key_id" value="%{getText('Authorized_Suspended_Successfully_key')}"/>
<ps:hidden id="record_reactivated_successfully_key_id" value="%{getText('record_reactivated_successfully_key')}"/>
<ps:hidden id="authorized_reactivated_successfully_key_id" value="%{getText('authorized_reactivated_successfully_key')}"/>
<ps:hidden id="record_rejected_Successfully_key_id" value="%{getText('record_rejected_Successfully_key')}"/>
<ps:hidden id="authorized_rejected_successfully_key_id" value="%{getText('authorized_rejected_successfully_key')}"/>
<ps:hidden id="record_closed_successfully_key_id" value="%{getText('record_closed_successfully_key')}"/>
<ps:hidden id="authorized_closed_successfully_key_id" value="%{getText('authorized_closed_successfully_key')}"/>
<ps:hidden id="record_was_Authorized_Successfully_key_id" value="%{getText('Record_was_Authorized_Successfully_key')}"/>

<%/* Common Labels*/%>
<ps:hidden id="themes_transl_id" value="%{getText('themes_key')}"/>
<ps:hidden id="ok_label_trans_id" value="%{getText('Ok_key')}"/>
<ps:hidden id="forward_label_trans_id" value="%{getText('forward.btn')}"/>
<ps:hidden id="print_label_trans_id" value="%{getText('btn.print')}"/>
<ps:hidden id="dismiss_label_trans_id" value="%{getText('dismiss')}"/>
<ps:hidden id="openItem_label_trans_id" value="%{getText('openItem')}"/>
<ps:hidden id="cancel_label_trans_id" value="%{getText('Cancel_key')}"/>
<ps:hidden id="reset_label_trans_id" value="%{getText('Reset_key')}"/>

<ps:hidden id="max_val_trans_id" value="%{getText('max_val_key')}"/>
<ps:hidden id="min_val_trans_id" value="%{getText('min_val_key')}"/>
<ps:hidden id="max_length_trans_id" value="%{getText('max_length_key')}"/>
<ps:hidden id="min_length_trans_id" value="%{getText('min_length_key')}"/>

<%/* Limit Schema*/%>
<ps:hidden id="limit_key_id" value="%{getText('Limit_key')}"/>
<ps:hidden id="transaction_key_id" value="%{getText('Transaction_key')}"/>
<ps:hidden id="trx_Type_Charges_trans_id" value="%{getText('Trx_Type_Charges_key')}"/>
<ps:hidden id="Trx_No_key_id" value="%{getText('Trx_No_key')}"/>
<ps:hidden id="void_Reason_Charges_trans_id" value="%{getText('Void_Reason_Charges_key')}"/>
<ps:hidden id="msg_duplicate_entry_Of_record_key_id" value="%{getText('Duplicate_Entry_Of_Record_key')}"/>
<ps:hidden id="msg_please_fill_Trx_Type_Code_for_already_added_record_id" value="%{getText('Please_fill_Trx_Type_Code_for_already_added_record')}"/>
<ps:hidden id="msg_please_fill_Charge_Code_for_already_added_record_id" value="%{getText('Please_fill_Charge_Code_for_already_added_record')}"/>
<ps:hidden id="msg_please_fill_Reason_Code_for_already_added_record_id" value="%{getText('Please_fill_Reason_Code_for_already_added_record')}"/>
<ps:hidden id="msg_please_fill_Currency_for_already_added_record_id" value="%{getText('Please_fill_Currency_for_already_added_record')}"/>
<ps:hidden id="msg_please_fill_Limit_for_already_added_record_id" value="%{getText('Please_fill_Limit_for_already_added_record')}"/>
<ps:hidden id="msg_please_fill_Account_Type_for_already_added_record_id" value="%{getText('Please_fill_Account_Type_for_already_added_record')}"/>
<ps:hidden id="msg_please_fill_Code_for_added_record_id" value="%{getText('Please_fill_Code_for_added_record')}"/>
<ps:hidden id="msg_please_fill_Line_No_for_already_added_record_id" value="%{getText('Please_fill_Line_No_for_already_added_record')}"/>
<ps:hidden id="msg_please_fill_Credit_Rating_for_already_added_record_id" value="%{getText('Please_fill_Credit_Rating_for_already_added_record')}"/>
<ps:hidden id="msg_please_fill_From_Date_for_already_added_record_id" value="%{getText('Please_fill_From_Date_for_already_added_record')}"/>
<ps:hidden id="msg_please_fill_To_Date_for_already_added_record_id" value="%{getText('Please_fill_To_Date_for_already_added_record')}"/>
<ps:hidden id="msg_please_add_Account_Type_for_already_added_record_id" value="%{getText('Please_add_Account_Type_for_already_added_record')}"/>
<ps:hidden id="msg_enter_CIF_before_Proceeding_id" value="%{getText('Enter_CIF_before_Proceeding_key')}"/>

<ps:hidden id="dr_suffix_key_trans_id" value="%{getText('dr_suffix_key')}"/>
<ps:hidden id="cr_suffix_key_trans_id" value="%{getText('cr_suffix_key')}"/>

<%/*Alert title*/%>
<ps:hidden id="send_alert_title_id" value="%{getText('send_alert_key')}"/>
<ps:hidden id="approve_item_key_id" value="%{getText('approve_item_key')}"/>
<ps:hidden id="usr_inf_key_id" value="%{getText('usr_inf_key')}"/>
<ps:hidden id="modify_button_id" value="%{getText('Modify_key')}"/> 
<ps:hidden id="open_multiple_item_confirmation_id" value="%{getText('Open_Multiple_Item_Confirmation_key')}"/>
<ps:hidden id="ack_ok_warning_id" value="%{getText('ack_ok_warning_key')}"/> 
<ps:hidden id="trs_timeout_openitem_warning_id" value="%{getText('trs_timeout_openitem_warning_key')}"/>
<ps:hidden id="void_button_id" value="%{getText('Void_key')}"/>
<ps:hidden id="scan_button_id" value="%{getText('Scan_key')}"/>

<ps:hidden id="deduct_Charges_From_Account_key_id" value="%{getText('Deduct_Charges_From_Account_key')}"/>
<ps:hidden id="drawdown_key_id" value="%{getText('Drawdown_key')}"/>
<ps:hidden id="investment_Account_key_id" value="%{getText('Investment_Account_key')}"/>
<ps:hidden id="More_Addresses_key_id" value="%{getText('More_Addresses_key')}"/>
<ps:hidden id="Current_Account_key_id" value="%{getText('Current_Account_key')}"/>

<%/* Additional Fields*/%>
<ps:hidden id="Additional_Fields_key_id" value="%{getText('Additional_Fields_key')}"/>

<%/* IRIS Screen, CIF choice person icon */%>
<ps:hidden id="error_IRIS_Enrol_Key_id" value="%{getText('Error_IRIS_Enrol_Key')}"/>
<ps:hidden id="Choose_customer_key_id" value="%{getText('choose_customer_key')}"/>
<ps:hidden id="Clear_customer_key_id" value="%{getText('clear_customer_key')}"/>

<ps:hidden id="imgNotAvailable_id" value="%{getText('imgNotAvailable_key')}"/>

<%/*Print Swift Management*/%>
<ps:hidden id="Print_Swift_key_id" value="%{getText('Print_Swift_key')}"/>
<ps:hidden id="Print_Swift_must_be_related_to_a_record_key_id" value="%{getText('Print_Swift_must_be_related_to_a_record_key')}"/>

<%/* Signature Management*/%>
<ps:hidden id="signature_popup_title_id" value="%{getText('Sign_Signature_Management_key')}"/>
<ps:hidden id="signature_close_btn_id" value="%{getText('Close_key')}"/>
<ps:hidden id="signature_action_title_id" value="%{getText('actions_key')}"/>
<ps:hidden id="no_appr_sign_msg_id" value="%{getText('no_appr_sign_msg')}"/>
<ps:hidden id="sign_signature_msg_id" value="%{getText('sign_signature_msg')}"/>
<ps:hidden id="gen_ann_saved_msg_id" value="%{getText('gen_ann_saved_msg')}"/>
<ps:hidden id="desc_mandatory_msg_id" value="%{getText('desc_mandatory_msg')}"/>
<ps:hidden id="choose_doc_msg_id" value="%{getText('choose_doc_msg')}"/>
<ps:hidden id="sign_copied_id" value="%{getText('sign_copied')}"/>
<ps:hidden id="signature_key_id" value="%{getText('signature_key')}"/>
<ps:hidden id="jvs_list_key_id" value="%{getText('jvs_list_key')}"/>
<ps:hidden id="Accept_key_id" value="%{getText('Accept_key')}"/> 
<ps:hidden id="Reject_Deleted_key_id" value="%{getText('Reject_Deleted_key')}"/>
<ps:hidden id="Reject_Active_Deleted_key_id" value="%{getText('Reject_Active_Deleted_key')}"/>
<%/*Advice language selection popup */%>
<ps:hidden id="english_key_id" value="%{getText('english_key')}"/>
<ps:hidden id="arabic_key_id" value="%{getText('arabic_key')}"/>
<ps:hidden id="french_key_id" value="%{getText('french_key')}"/>
<ps:hidden id="choose_language_key_id" value="%{getText('choose_language_key')}"/>

<ps:hidden id="status_list_key_id" value="%{getText('status_list_key')}"/>
<ps:hidden id="stat_of_account_key_id" value="%{getText('stat_of_account_key')}"/>

<ps:hidden id="advice_key_id" value="%{getText('advice_key')}"/>
<ps:hidden id="opening_acc_key_id" value="%{getText('opening_acc_key')}"/>
<ps:hidden id="specify_report_key_id" value="%{getText('specify_report_key')}"/>
<ps:hidden id="whiteListed_key_id" value="%{getText('whiteListed_key')}"/>
<ps:hidden id="company_key_id" value="%{getText('companyKey')}"/>
<ps:hidden id="branch_key_id" value="%{getText('branchKey')}"/>
<ps:hidden id="cif_key_id" value="%{getText('CIF_No_key')}"/>
<ps:hidden id="acc_key_id" value="%{getText('Acc_No_key')}"/>
<ps:hidden id="savedMsg_id" value="%{getText('savedMsg_key')}"/>
<ps:hidden id="show_picture_title_id" value="%{getText('Show_Picture_key')}"/>
<%/* Dashboard */%>
<ps:hidden id="No_Data_Found_key_id" value="%{getText('No_Data_Found_key')}"/>
<ps:hidden id="details_key_id" value="%{getText('details')}"/>
<ps:hidden id="Repayment_Plan_details_not_available_key_id" value="%{getText('Repayment_Plan_details_not_available_key')}"/>

<ps:hidden id="alerts_key_id" value="%{getText('Alerts_key')}"/>
<ps:hidden id="suspicious_list_key_id" value="%{getText('suspicious_list_key')}"/>

<ps:hidden id="passbook_pages_exhausted_key_id" value="%{getText('passbook_pages_exhausted_key')}"/>
<ps:hidden id="passbook_flip_pages_key_id" value="%{getText('passbook_flip_pages_key')}"/>
<ps:hidden id="brought_forward_amount_key_id" value="%{getText('brought_forward_amount_key')}"/>

<%/* Dynamic Files */%>
<ps:hidden id="Missing_File_Code_key_id" value="%{getText('Missing_File_Code_key')}"/>
<ps:hidden id="File_Names_Do_Not_Match_key_id" value="%{getText('File_Names_Do_Not_Match_key')}"/>
<ps:hidden id="Process_Executed_Successfully_key_id" value="%{getText('Process_Executed_Successfully_key')}"/>
<ps:hidden id="File_Input_Parameters_Mandatory_key_id" value="%{getText('File_Input_Parameters_Mandatory_key')}"/>
<ps:hidden id="Input_Tag_values_Mandatory_key_id" value="%{getText('Input_Tag_Values_Mandatory_key')}"/>
<ps:hidden id="Missing_File_Location_key_id" value="%{getText('Missing_File_Location_key')}"/>

<%/* Dashboard Portal*/%>
<ps:hidden id="fav_maint_title_key_id" value="%{getText('fav_maint_title_key')}"/>
<ps:hidden id="select_fav_screen_key_id" value="%{getText('select_fav_screen_key')}"/>
<ps:hidden id="selection_leaf_node_key_id" value="%{getText('selection_leaf_node_key')}"/>
<ps:hidden id="app_infos_title_key_id" value="%{getText('about_key')}"/>
<ps:hidden id="confirm_del_widget_key_id" value="%{getText('confirm_del_widget_key')}"/>
<ps:hidden id="widget_not_avail_key_id" value="%{getText('widget_not_avail_key')}"/>
<ps:hidden id="drag_widget_key_id" value="%{getText('drag_widget_key')}"/>
<ps:hidden id="loading_key_id" value="%{getText('loading_key')}"/>
<ps:hidden id="app_not_found_key_id" value="%{getText('application_not_found_key')}"/>
<ps:hidden id="no_alert_found_key_id" value="%{getText('no_alert_found_key')}"/>
<ps:hidden id="resize_widget_key_id" value="%{getText('resize_widget_key')}"/>
<ps:hidden id="custom_wkspce_key_id" value="%{getText('custom_wkspce_key')}"/>
<ps:hidden id="add_custom_widget_key_id" value="%{getText('add_custom_widget_key')}"/>
<%/* Settings Customization*/%>
<ps:hidden id="trans_key_id" value="%{getText('trans_key')}"/>
<ps:hidden id="branch_is_now_opened_key_id" value="%{getText('branch_is_now_opened_key')}"/>
<ps:hidden id="branch_is_now_closed_key" value="%{getText('branch_is_now_closed_key')}"/>
<ps:hidden id="no_widgets_key_id" value="%{getText('no_widgets_key')}"/>
<ps:hidden id="change_pass_id" value="%{getText('change_pwd_key')}"/>

<ps:hidden id="description_label_key_id" value="%{getText('description_label_key')}"/>
<ps:hidden id="select_screen_help_key_id" value="%{getText('select_screen_help_key')}"/>

<%/*Record logs screens titles*/ %>
<ps:hidden id="record_lvl_att_key_id" value="%{getText('record_lvl_att_key')}"/>
<ps:hidden id="record_lvl_att_wlog_key_id" value="%{getText('record_lvl_att_wlog_key')}"/>
<ps:hidden id="entity_lvl_att_key_id" value="%{getText('entity_lvl_att_key')}"/>
<ps:hidden id="entity_lvl_att_wlog_key_id" value="%{getText('entity_lvl_att_wlog_key')}"/>
<ps:hidden id="Record_Logs_Key_id" value="%{getText('Record_Logs_Key')}"/>

<ps:hidden id="for_key_id" value="%{getText('For')}"/>
<ps:hidden id="toolTipTrans_key_id" value="%{getText('toolTipTran_key')}"/>
<ps:hidden id="grid_user_pref_key_id" value="%{getText('grid_user_pref_key')}"/>
<ps:hidden id="grid_user_def_key_id" value="%{getText('grid_user_def_key')}"/>
<%/*Common for IslamicCalculator used in lot of screens, REquested By Libin VV*/ %>
<ps:hidden id="tentative_Schedule_Created_msg_key_id" value="%{getText('Tentative_Schedule_Created_key')}"/>
<ps:hidden id="finalSignOffChecking_key_id" value="%{getText('finalSignOffChecking_key')}"/>
<ps:hidden id="report_Return_Data_key_id" value="%{getText('report_return_data_key')}"/>
<ps:hidden id="server_request_completes_key_id" value="%{getText('server_request_completes_key')}"/>
<ps:hidden id="download_key_id" value="%{getText('Download_key')}"/>
<ps:hidden id="elemIdAndNameChecking_key_id" value="%{getText('elemIdAndNameChecking_key')}"/>
<ps:hidden id="Selected_key_id" value="%{getText('Selected_key')}"/>
<ps:hidden id="oldValKey_id" value="%{getText('oldValKey')}"/>
<ps:hidden id="status_cust_key_id" value="%{getText('status_cust_key')}"/>

<ps:hidden id="token_key_id" value="%{getText('token_key')}"/>
<ps:hidden id="closeDynScreen_key_id" value="%{getText('closedynscreen_key')}"/>
<ps:hidden id="smartLabel_title_key_id" value="%{getText('smartLabel_title_key')}"/>
<ps:hidden id="View_Memo_key_id" value="%{getText('View_Memo_key')}"/>
<ps:hidden id="January_key_id" value="%{getText('January_key')}"/>
<ps:hidden id="February_key_id" value="%{getText('February_key')}"/>
<ps:hidden id="March_key_id" value="%{getText('March_key')}"/>
<ps:hidden id="April_key_id" value="%{getText('April_key')}"/>
<ps:hidden id="May_key_id" value="%{getText('May_key')}"/>
<ps:hidden id="June_key_id" value="%{getText('June_key')}"/>
<ps:hidden id="July_key_id" value="%{getText('July_key')}"/>
<ps:hidden id="August_key_id" value="%{getText('August_key')}"/>
<ps:hidden id="September_key_id" value="%{getText('September_key')}"/>
<ps:hidden id="October_key_id" value="%{getText('October_key')}"/>
<ps:hidden id="November_key_id" value="%{getText('November_key')}"/>
<ps:hidden id="December_key_id" value="%{getText('December_key')}"/>
<ps:hidden id="defemptyrepconfirm_key" value="%{getText('defemptyrepconfirm_key')}"/>
<ps:hidden id="defemptyrep_key" value="%{getText('defemptyrep_key')}"/>

<%/* TP 474201 detecting the Server Down and showing the corresponding Message*/ %>
<ps:hidden id="server_conn_drop_key_id" value="%{getText('server_conn_drop_key')}"/>
<%/*Moved from rep as per Elie Rached request*/ %>
<ps:hidden id="yes_key_id" value="%{getEscText('yes_key')}"/>
<ps:hidden id="no_key_id" value="%{getEscText('no_key')}"/>
<ps:hidden id="activex_disabled_key_id" value="%{getText('activex_disabled_key')}"/>
<ps:hidden id="cannot_proceed_key" value="%{getText('Cannot_Proceed_Key')}"/>
<ps:hidden id="hijriDate_cust_key" value="%{getText('hijriDate_cust_key')}"/>
<ps:hidden id="view_grid_key" value="%{getText('View_Grid_key')}"/>
<ps:hidden id="live_search_key" value="%{getText('live_search_key')}"/>
<%/*TP 715899 Notification Functionality*/ %>
<ps:hidden id="notifications_key" value="%{getText('iMAL_Notifications_key')}"/>
<script type="text/javascript">
var view_Memo_key = document.getElementById("View_Memo_key_id").value;
var Break_of_Deposit_key= document.getElementById("Break_of_Deposit_key_id").value;
var cannot_be_less_than_or_equal_zero_key= document.getElementById("cannot_be_less_than_or_equal_zero_key_id").value;

var Market_Value_key= document.getElementById("Market_Value_key_id").value;
var Book_Value_key= document.getElementById("Book_Value_key_id").value;
var app_title_not_defined= document.getElementById("app_title_not_defined_id").value;
var grid_addLabel= document.getElementById("grid_addLabel_id").value;
var grid_editLabel= document.getElementById("grid_editLabel_id").value;
var grid_delLabel= document.getElementById("grid_delLabel_id").value;
var grid_approveLabel = document.getElementById("grid_approveLabel_id").value;
var grid_rejectLabel = document.getElementById("grid_rejectLabel_id").value;
var grid_createFromLabel = document.getElementById("grid_createFromLabel_id").value;
var saveLabel 	= document.getElementById("saveLabel_id").value;
var msg_progDefaultLabel= document.getElementById("msg_progDefaultLabel_id").value;
var Change_running_date_key= document.getElementById("Change_running_date_key_id").value;
var SMART_System_Maintenance_Additional_Reference_Table_key= document.getElementById("SMART_System_Maintenance_Additional_Reference_Table_key_id").value; 
var Smart_Details_not_defined_key= document.getElementById("Smart_Details_not_defined_key_id").value; 
var SMART_must_be_related_to_a_record_key= document.getElementById("SMART_must_be_related_to_a_record_key_id").value;
var Error_retrieving_file_from_database_key= document.getElementById("Error_retrieving_file_from_database_key_id").value;
var Preview_image_key= document.getElementById("Preview_image_key_id").value;
var Mandatory_Field_key= document.getElementById("Mandatory_Field_key_id").value;
var msg_noRecordSelectedLabel= document.getElementById("msg_noRecordSelectedLabel_id").value;
var Total_Amount_key= document.getElementById("Total_Amount_key_id").value;
var Warning_key= document.getElementById("Warning_key_id").value;
var total_All= document.getElementById("total_All_id").value;
var Confirm_Approve_Process_key= document.getElementById("Confirm_Approve_Process_key_id").value;
var Confirm_Reject_Process_key= document.getElementById("Confirm_Reject_Process_key_id").value;
var Confirm_Reinstate_Process_key= document.getElementById("Confirm_Reinstate_Process_key_id").value;
var Confirm_Reactivate_Process_key= document.getElementById("Confirm_Reactivate_Process_key_id").value;
var Confirm_Suspend_Process_key= document.getElementById("Confirm_Suspend_Process_key_id").value;
var Confirm_Proceed_key = document.getElementById("Confirm_Proceed_key_id").value;
var Confirm_Delete_Process_key = document.getElementById("Confirm_Delete_Process_key_id").value;
var confirm_Export_Process_key = document.getElementById("Confirm_Export_Process_key_id").value;
var Confirm_Save_Process_key = document.getElementById("Confirm_Save_Process_key").value;
var date_of_birth_label= document.getElementById("date_of_birth_label_id").value;
var birthDate_label= document.getElementById("birthDate_label_id").value;
var estbDate_label= document.getElementById("estbDate_label_id").value;
var error_msg_title= document.getElementById("error_msg_title_id").value;
var success_msg_title= document.getElementById("success_msg_title_id").value;
var confirm_msg_title= document.getElementById("confirm_msg_title_id").value;
var warning_msg_title= document.getElementById("warning_msg_title_id").value;
var info_msg_title= document.getElementById("info_msg_title_id").value;
var proceed_msg_title= document.getElementById("proceed_msg_title_id").value;
var changes_made_confirm_msg= document.getElementById("changes_made_confirm_msg_id").value;
var changes_not_available_key= document.getElementById("changes_not_available_key_id").value;
var missing_selection_type_key= document.getElementById("missing_selection_type_key_id").value;
var cache_cleared_success_key= document.getElementById("cache_cleared_success_key_id").value;
var close_all_opened_screen_key= document.getElementById("close_all_opened_screen_key_id").value;
var period_label= document.getElementById("period_label_id").value;
var creditRating_label= document.getElementById("creditRating_label_id").value;
var trx_type_label= document.getElementById("trx_type_label_id").value;
var reason_code_label= document.getElementById("reason_code_label_id").value;
var charges_schema_details_label= document.getElementById("charges_schema_details_label_id").value;
var cash_account_label= document.getElementById("cash_account_label_id").value;
var missing_elt_msg_key= document.getElementById("missing_elt_msg_key_id").value;
var account_Position_key= document.getElementById("account_Position_key_id").value;
var relogin_btn_key= document.getElementById("relogin_btn_key_id").value;
var fill_old_pwd_msg_key= document.getElementById("fill_old_pwd_msg_key_id").value;
var fill_both_msg_key= document.getElementById("fill_both_msg_key_id").value;
var charges_Details_key= document.getElementById("charges_Details_key_id").value;
var choose_a_schema_first_msg= document.getElementById("choose_a_schema_first_msg_id").value;
var calculation_done_msg= document.getElementById("calculation_done_msg_id").value;
var charges_Schema_key= document.getElementById("charges_Schema_key_id").value;
var account_Type_key= document.getElementById("account_Type_key_id").value;
var acc_nb_key= document.getElementById("acc_nb_key_id").value;
var record_was_Approved_Successfully_key= document.getElementById("record_was_Approved_Successfully_key_id").value;
var record_was_Suspended_Successfully_key= document.getElementById("record_was_Suspended_Successfully_key_id").value;
var record_was_Deleted_Successfully_key= document.getElementById("record_was_Deleted_Successfully_key_id").value;
var record_was_Updated_Successfully_key= document.getElementById("record_was_Updated_Successfully_key_id").value;
var record_was_Reinstated_Successfully_key= document.getElementById("record_was_Reinstated_Successfully_key_id").value;
var record_was_Validated_Successfully_key= document.getElementById("record_was_Validated_Successfully_key_id").value;
var record_saved_Successfully_key= document.getElementById("record_saved_Successfully_key_id").value;
var Authorized_Suspended_Successfully_key= document.getElementById("Authorized_Suspended_Successfully_key_id").value;
var record_reactivated_successfully_key= document.getElementById("record_reactivated_successfully_key_id").value;
var authorized_reactivated_successfully_key= document.getElementById("authorized_reactivated_successfully_key_id").value;
var record_rejected_Successfully_key= document.getElementById("record_rejected_Successfully_key_id").value;
var authorized_rejected_successfully_key= document.getElementById("authorized_rejected_successfully_key_id").value;
var record_closed_successfully_key= document.getElementById("record_closed_successfully_key_id").value;
var authorized_closed_successfully_key= document.getElementById("authorized_closed_successfully_key_id").value;
var record_was_Authorized_Successfully_key= document.getElementById("record_was_Authorized_Successfully_key_id").value;
var themes_transl= document.getElementById("themes_transl_id").value;
var ok_label_trans= document.getElementById("ok_label_trans_id").value;
var reset_label_trans= document.getElementById("reset_label_trans_id").value;
var forward_label_trans= document.getElementById("forward_label_trans_id").value;
var print_label_trans= document.getElementById("print_label_trans_id").value;
var dismiss_label_trans= document.getElementById("dismiss_label_trans_id").value;
var openItem_label_trans= document.getElementById("openItem_label_trans_id").value;
var cancel_label_trans= document.getElementById("cancel_label_trans_id").value;
var max_val_trans= document.getElementById("max_val_trans_id").value;
var min_val_trans= document.getElementById("min_val_trans_id").value;
var max_length_trans= document.getElementById("max_length_trans_id").value;
var min_length_trans= document.getElementById("min_length_trans_id").value;
var limit_key= document.getElementById("limit_key_id").value;
var transaction_key= document.getElementById("transaction_key_id").value;
var trx_Type_Charges_trans= document.getElementById("trx_Type_Charges_trans_id").value;
var Trx_No_key= document.getElementById("Trx_No_key_id").value;
var void_Reason_Charges_trans= document.getElementById("void_Reason_Charges_trans_id").value;
var msg_duplicate_entry_Of_record_key= document.getElementById("msg_duplicate_entry_Of_record_key_id").value;
var msg_please_fill_Trx_Type_Code_for_already_added_record= document.getElementById("msg_please_fill_Trx_Type_Code_for_already_added_record_id").value;
var msg_please_fill_Charge_Code_for_already_added_record= document.getElementById("msg_please_fill_Charge_Code_for_already_added_record_id").value;
var msg_please_fill_Reason_Code_for_already_added_record= document.getElementById("msg_please_fill_Reason_Code_for_already_added_record_id").value;
var msg_please_fill_Currency_for_already_added_record= document.getElementById("msg_please_fill_Currency_for_already_added_record_id").value;
var msg_please_fill_Limit_for_already_added_record= document.getElementById("msg_please_fill_Limit_for_already_added_record_id").value;
var msg_please_fill_Account_Type_for_already_added_record= document.getElementById("msg_please_fill_Account_Type_for_already_added_record_id").value;
var msg_please_fill_Code_for_added_record= document.getElementById("msg_please_fill_Code_for_added_record_id").value;
var msg_please_fill_Line_No_for_already_added_record= document.getElementById("msg_please_fill_Line_No_for_already_added_record_id").value;
var msg_please_fill_Credit_Rating_for_already_added_record= document.getElementById("msg_please_fill_Credit_Rating_for_already_added_record_id").value;
var msg_please_fill_From_Date_for_already_added_record= document.getElementById("msg_please_fill_From_Date_for_already_added_record_id").value;
var msg_please_fill_To_Date_for_already_added_record= document.getElementById("msg_please_fill_To_Date_for_already_added_record_id").value;
var msg_please_add_Account_Type_for_already_added_record= document.getElementById("msg_please_add_Account_Type_for_already_added_record_id").value;
var msg_enter_CIF_before_Proceeding= document.getElementById("msg_enter_CIF_before_Proceeding_id").value;
var dr_suffix_key_trans= document.getElementById("dr_suffix_key_trans_id").value;
var cr_suffix_key_trans= document.getElementById("cr_suffix_key_trans_id").value;
var send_alert_title= document.getElementById("send_alert_title_id").value;
var approve_item_key= document.getElementById("approve_item_key_id").value;
var usr_inf_key= document.getElementById("usr_inf_key_id").value;
var modify_button= document.getElementById("modify_button_id").value; 
var open_multiple_item_confirmation= document.getElementById("open_multiple_item_confirmation_id").value;
var ack_ok_warning= document.getElementById("ack_ok_warning_id").value; 
var trs_timeout_openitem_warning= document.getElementById("trs_timeout_openitem_warning_id").value; 
var void_button= document.getElementById("void_button_id").value;
var scan_button= document.getElementById("scan_button_id").value;
var deduct_Charges_From_Account_key= document.getElementById("deduct_Charges_From_Account_key_id").value;
var drawdown_key= document.getElementById("drawdown_key_id").value;
var investment_Account_key= document.getElementById("investment_Account_key_id").value;
var More_Addresses_key= document.getElementById("More_Addresses_key_id").value;
var Current_Account_key= document.getElementById("Current_Account_key_id").value;
var Additional_Fields_key= document.getElementById("Additional_Fields_key_id").value;
var error_IRIS_Enrol_Key= document.getElementById("error_IRIS_Enrol_Key_id").value;
var Choose_customer_key = document.getElementById("Choose_customer_key_id").value;
var Clear_customer_key = document.getElementById("Clear_customer_key_id").value;
var imgNotAvailable= document.getElementById("imgNotAvailable_id").value;
var Print_Swift_key= document.getElementById("Print_Swift_key_id").value;
var Print_Swift_must_be_related_to_a_record_key= document.getElementById("Print_Swift_must_be_related_to_a_record_key_id").value;
var signature_popup_title= document.getElementById("signature_popup_title_id").value;
var signature_close_btn= document.getElementById("signature_close_btn_id").value;
var signature_action_title= document.getElementById("signature_action_title_id").value;
var no_appr_sign_msg= document.getElementById("no_appr_sign_msg_id").value;
var sign_signature_msg = document.getElementById("sign_signature_msg_id").value;
var gen_ann_saved_msg = document.getElementById("gen_ann_saved_msg_id").value;
var desc_mandatory_msg = document.getElementById("desc_mandatory_msg_id").value;
var choose_doc_msg = document.getElementById("choose_doc_msg_id").value;
var sign_copied = document.getElementById("sign_copied_id").value;
var signature_key= document.getElementById("signature_key_id").value;
var jvs_list_key= document.getElementById("jvs_list_key_id").value;
var Accept_key = document.getElementById("Accept_key_id").value; 
var Reject_Deleted_key= document.getElementById("Reject_Deleted_key_id").value;
var Reject_Active_Deleted_key= document.getElementById("Reject_Active_Deleted_key_id").value;
var english_key= document.getElementById("english_key_id").value;
var arabic_key= document.getElementById("arabic_key_id").value;
var french_key= document.getElementById("french_key_id").value;
var choose_language_key= document.getElementById("choose_language_key_id").value;
var status_list_key= document.getElementById("status_list_key_id").value;
var stat_of_account_key= document.getElementById("stat_of_account_key_id").value;
var advice_key= document.getElementById("advice_key_id").value;
var opening_acc_key= document.getElementById("opening_acc_key_id").value;
var specify_report_key= document.getElementById("specify_report_key_id").value;
var whiteListed_key= document.getElementById("whiteListed_key_id").value;
var company_key= document.getElementById("company_key_id").value;
var branch_key= document.getElementById("branch_key_id").value;
var cif_key= document.getElementById("cif_key_id").value;
var acc_key = document.getElementById("acc_key_id").value;
var savedMsg = document.getElementById("savedMsg_id").value;
var show_picture_title = document.getElementById("show_picture_title_id").value;
var No_Data_Found_key= document.getElementById("No_Data_Found_key_id").value;
var details_key= document.getElementById("details_key_id").value;
var  Repayment_Plan_details_not_available_key= document.getElementById("Repayment_Plan_details_not_available_key_id").value;
var alerts_key= document.getElementById("alerts_key_id").value;
var suspicious_list_key= document.getElementById("suspicious_list_key_id").value;
var passbook_pages_exhausted_key= document.getElementById("passbook_pages_exhausted_key_id").value;
var passbook_flip_pages_key= document.getElementById("passbook_flip_pages_key_id").value;
var brought_forward_amount_key= document.getElementById("brought_forward_amount_key_id").value;
var Missing_File_Code_key= document.getElementById("Missing_File_Code_key_id").value;
var File_Names_Do_Not_Match_key= document.getElementById("File_Names_Do_Not_Match_key_id").value;
var Process_Executed_Successfully_key= document.getElementById("Process_Executed_Successfully_key_id").value;
var File_Input_Parameters_Mandatory_key= document.getElementById("File_Input_Parameters_Mandatory_key_id").value;
var Input_Tag_values_Mandatory_key= document.getElementById("Input_Tag_values_Mandatory_key_id").value;
var Missing_File_Location_key= document.getElementById("Missing_File_Location_key_id").value;
var dyn_import_File_Loc_key= document.getElementById("Missing_File_Location_key_id").value;
var fav_maint_title_key = document.getElementById("fav_maint_title_key_id").value;
var select_fav_screen_key= document.getElementById("select_fav_screen_key_id").value;
var selection_leaf_node_key= document.getElementById("selection_leaf_node_key_id").value;
var app_infos_title_key= document.getElementById("app_infos_title_key_id").value;
var confirm_del_widget_key= document.getElementById("confirm_del_widget_key_id").value;
var widget_not_avail_key= document.getElementById("widget_not_avail_key_id").value;
var drag_widget_key= document.getElementById("drag_widget_key_id").value;
var loading_key= document.getElementById("loading_key_id").value;
var app_not_found_key= document.getElementById("app_not_found_key_id").value;
var no_alert_found_key = document.getElementById("no_alert_found_key_id").value;
var resize_widget_key= document.getElementById("resize_widget_key_id").value;
var custom_wkspce_key= document.getElementById("custom_wkspce_key_id").value;
var add_custom_widget_key= document.getElementById("add_custom_widget_key_id").value;
var trans_key= document.getElementById("trans_key_id").value;
var branch_is_now_opened_key= document.getElementById("branch_is_now_opened_key_id").value;
var branch_is_now_closed_key= document.getElementById("branch_is_now_closed_key").value;
var no_widgets_key= document.getElementById("no_widgets_key_id").value;
var change_pass= document.getElementById("change_pass_id").value;
var description_label_key=document.getElementById("description_label_key_id").value;
var select_screen_help_key=document.getElementById("select_screen_help_key_id").value;
var record_lvl_att_key= document.getElementById("record_lvl_att_key_id").value;
var record_lvl_att_wlog_key= document.getElementById("record_lvl_att_wlog_key_id").value;
var entity_lvl_att_key= document.getElementById("entity_lvl_att_key_id").value;
var entity_lvl_att_wlog_key= document.getElementById("entity_lvl_att_wlog_key_id").value;
var record_Logs_Key= document.getElementById("Record_Logs_Key_id").value;
var for_key = document.getElementById("for_key_id").value;
var toolTipTrans_key = document.getElementById("toolTipTrans_key_id").value;
var grid_user_pref_key = document.getElementById("grid_user_pref_key_id").value;
var tentative_Schedule_Created_msg_key= document.getElementById("tentative_Schedule_Created_msg_key_id").value;
var finalSignOffChecking_key = document.getElementById("finalSignOffChecking_key_id").value;
var report_Return_Data_key = document.getElementById("report_Return_Data_key_id").value;
var server_request_completes_key = document.getElementById("server_request_completes_key_id").value;
var download_key = document.getElementById("download_key_id").value;
var elemIdAndNameChecking_key = document.getElementById("elemIdAndNameChecking_key_id").value;
var Selected_key= document.getElementById("Selected_key_id").value;
var oldValKey= document.getElementById("oldValKey_id").value;
var grid_user_def_key= document.getElementById("grid_user_def_key_id").value;
var status_cust_key = document.getElementById("status_cust_key_id").value;
var token_key=document.getElementById("token_key_id").value;
var closeDynScreen_key = document.getElementById("closeDynScreen_key_id").value;
var smartLabel_title_key = document.getElementById("smartLabel_title_key_id").value;
var January_key = document.getElementById("January_key_id").value;
var February_key = document.getElementById("February_key_id").value;
var March_key = document.getElementById("March_key_id").value;
var April_key = document.getElementById("April_key_id").value;
var May_key = document.getElementById("May_key_id").value;
var June_key = document.getElementById("June_key_id").value;
var July_key = document.getElementById("July_key_id").value;
var August_key = document.getElementById("August_key_id").value;
var September_key = document.getElementById("September_key_id").value;
var October_key = document.getElementById("October_key_id").value;
var November_key = document.getElementById("November_key_id").value;
var December_key = document.getElementById("December_key_id").value;
var invalid_widget_url = document.getElementById("invalid_widget_url_key").value;
// TP 474201 server down message
var server_conn_drop_key = document.getElementById("server_conn_drop_key_id").value;
// Moved from rep file as per Elie Rached request
var yes_confirm 			= document.getElementById("yes_key_id").value;
var no_confirm 				= document.getElementById("no_key_id").value;
//Empty Report
var defEmptyRepConfirm_key 	= document.getElementById("defemptyrepconfirm_key").value;
var defEmptyRep_key 		= document.getElementById("defemptyrep_key").value;
var activex_disabled_key 	= document.getElementById("activex_disabled_key_id").value;
var cannotProceed_key = document.getElementById("cannot_proceed_key").value;
var hijriDate_cust_key = document.getElementById("hijriDate_cust_key").value;

var view_grid_key = document.getElementById("view_grid_key").value;
var live_search_key= document.getElementById("live_search_key").value;
var Confirm_Reverse_Process_key = document.getElementById("Confirm_Reverse_Process_key_id").value;
var notifications_key = document.getElementById("notifications_key").value;
</script>