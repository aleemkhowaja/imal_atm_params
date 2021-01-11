<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@taglib uri="/path-struts-tags" prefix="ps"%>



<ps:set name="yes_key" value="%{getEscText('yes_key')}" />
<ps:set name="no_key" value="%{getEscText('no_key')}" />
<ps:set name="Ok_key" value="%{getEscText('Ok_key')}" />
<ps:set name="Cancel_key" value="%{getEscText('Cancel_key')}" />
<ps:set name="The_Mob_Nb_cont_AlpCh_Proceed_key"  value="%{getEscText('The_Mob_Nb_cont_AlpCh_Proceed_key')}" />
<ps:set name="Record_was_Deleted_Successfully_key"
	value="%{getEscText('record_was_Deleted_Successfully_key')}" />
<ps:set name="Confirm_Authorize_Process_key"
	value="%{getEscText('Confirm_Approve_Record_key')}" />
<ps:set name="evt_miss_not_appr_proc_for_appr_key"
	value="%{getEscText('evt_miss_not_appr_proc_for_appr')}" />
<ps:set name="fail_ins_alrt_queue_wish_proc_key"
	value="%{getEscText('fail_ins_alrt_queue_wish_proc')}" />
<ps:set name="update_subscriptions_parameters_key"  value="%{getEscText('update_subscriptions_parameters_key')}" />		
<ps:set name="subscriptions_related_Event_key"  value="%{getEscText('subscriptions_related_Event_key')}" />	
<ps:set name="Confirm_Delete_All_subscriptions_key"
	value="%{getEscText('Confirm_Delete_All_subscriptions_key')}" />
<ps:set name="subscriptions_key"
	value="%{getEscText('subscription_audit_details_key')}" />

<ps:set name="subscription_details_key"
	value="%{getEscText('Subscription_Details_key')}" />
<ps:set name="fixed_event_parameter_key"
	value="%{getEscText('fixed_event_parameter_key')}" />
<ps:set name="subscription_audit_details_key"
	value="%{getEscText('subscription_audit_details_key')}" />
<ps:set name="no_det_for_populated_sub_key"
	value="%{getEscText('no_det_for_populated_sub_key')}" />
<ps:set name="information_key"
	value="%{getEscText('information_key')}" />
<ps:set name="please_select_a_sub_key"
	value="%{getEscText('please_select_a_sub_key')}" />
<ps:set name="missing_info_key"
	value="%{getEscText('missing_info_key')}" />
<ps:set name="no_det_available_to_be_del_key"
	value="%{getEscText('no_det_available_to_be_del_key')}" />
<ps:hidden type="hidden" id="Confirm_Save_Process_key" value="%{getText('Confirm_Save_Process_key')}"/>
<ps:set name="no_sub_grps_sel_for_population"
	value="%{getEscText('no_sub_grps_sel_for_population')}" />
<ps:set name="no_evt_pkg_sel_for_population"
	value="%{getEscText('no_evt_pkg_sel_for_population')}" />
<ps:set name="no_sub_sel_for_delt"
	value="%{getEscText('no_sub_sel_for_delt')}" />
<ps:set name="are_you_sure_to_dlt_subs"
	value="%{getEscText('are_you_sure_to_dlt_subs')}" />
<ps:set name="are_you_sure_want_to_process_Retrieve_key"
	value="%{getEscText('are_you_sure_want_to_process_Retrieve_key')}" />
<ps:set name="are_you_sure_want_to_suspending_subscriptions_key"
	value="%{getEscText('are_you_sure_want_to_suspending_subscriptions_key')}" />
<ps:set name="are_you_sure_want_to_activating_subscriptions_key"
	value="%{getEscText('are_you_sure_want_to_activating_subscriptions_key')}" />
<ps:set name="record_reactivated_successfully_key"
	value="%{getEscText('record_reactivated_successfully_key')}" />
<ps:set name="Record_was_Suspended_Successfully_key"
	value="%{getEscText('Record_was_Suspended_Successfully_key')}" />
<ps:set name="record_must_be_saved_key"
	value="%{getEscText('record_must_be_saved_key')}" />
	
<ps:set name="other_lang_dialog_title_key" value="%{getEscText('other_lang_dialog_title_key')}" />
<ps:hidden type="hidden" id="duplicate_entry_of_email_key" value="%{getText('duplicate_entry_of_email_key')}"/>
<ps:hidden type="hidden" id="duplicate_entry_of_mobile_key" value="%{getText('duplicate_entry_of_mobile_key')}"/>

<ps:hidden type="hidden" id="duplicate_entry_of_mobile_key" value="%{getText('duplicate_entry_of_mobile_key')}"/>
<ps:hidden type="hidden" id="duplicate_entry_of_mobile_key" value="%{getText('duplicate_entry_of_mobile_key')}"/>

<!-- Event Screen Hidden for translations -->
<ps:hidden type="hidden" id="select_report_key" value="%{getText('select_report_key')}"/>
<ps:hidden type="hidden" id="select_query_key" value="%{getText('select_query_key')}"/>

<ps:hidden type="hidden" id="missing_email_report_default_subject_key" value="%{getText('missing_email_report_default_subject_key')}"/>
<ps:hidden type="hidden" id="missing_email_query_default_subject_Body_key" value="%{getText('missing_email_query_default_subject_Body_key')}"/>
<ps:hidden type="hidden" id="missing_sms_query_default_Msg_key" value="%{getText('missing_sms_query_default_Msg_key')}"/>
<ps:hidden type="hidden" id="missing_omniInbox_query_default_Msg_key" value="%{getText('missing_omniInbox_query_default_Msg_key')}"/>

<ps:hidden type="hidden" id="suspended_record_approved_successfully_key" value="%{getText('suspended_record_approved_successfully_key')}"/>
<ps:hidden type="hidden" id="reactivated_record_approved_successfully_key" value="%{getText('reactivated_record_approved_successfully_key')}"/>
<ps:hidden type="hidden" id="suspended_record_rejected_successfully_key" value="%{getText('suspended_record_rejected_successfully_key')}"/>
<ps:hidden type="hidden" id="reactivated_record_rejected_successfully_key" value="%{getText('reactivated_record_rejected_successfully_key')}"/>
<ps:hidden type="hidden" id="duplicate_entry_report_key" value="%{getText('duplicate_entry_report_key')}"/>
<ps:hidden type="hidden" id="fill_empty_report_attachment_key" value="%{getText('fill_empty_report_attachment_key')}"/>

<ps:hidden type="hidden" id="fill_empty_tag_key" value="%{getText('fill_empty_tag_key')}"/>
<ps:hidden type="hidden" id="customization_key" value="%{getText('customization_key')}"/>
<ps:hidden type="hidden" id="selected_records_approved_successfully_key" value="%{getText('selected_records_approved_successfully_key')}"/>
<ps:hidden type="hidden" id="conform_selected_records_approved_key" value="%{getText('conform_selected_records_approved_key')}"/>
<ps:hidden type="hidden" id="main_info_other_languages_key" value="%{getText('main_info_other_languages_key')}"/>
<ps:hidden type="hidden" id="fill_empty_row_key" value="%{getText('fill_empty_row_key')}"/>

<ps:hidden type="hidden" id="duplicate_entry_fixed_param_key" value="%{getText('duplicate_entry_fixed_param_key')}"/>
<ps:hidden type="hidden" id="confirm_remove_fixed_params_key" value="%{getText('confirm_remove_fixed_params_key')}"/>
<ps:hidden type="hidden" id="select_fixed_event_key" value="%{getText('select_fixed_event_key')}"/>
<ps:hidden type="hidden" id="select_message_body_for_adding_tags_key" value="%{getText('select_message_body_for_adding_tags_key')}"/>
<ps:hidden type="hidden" id="duplicate_entry_cif_key" value="%{getText('duplicate_entry_cif_key')}"/>

<ps:hidden type="hidden" id="query_tags_not_used_conform_key" value="%{getText('query_tags_not_used_conform_key')}"/>

<ps:hidden type="hidden" id="SMS_key" value="%{getText('SMS_key')}"/>
<ps:hidden type="hidden" id="email_key" value="%{getText('email_key')}"/>
<ps:hidden type="hidden" id="omni_inbox_key" value="%{getText('omni_inbox_key')}"/>
<ps:hidden type="hidden" id="sub_in_grp_key" value="%{getText('sub_in_grp_key')}"/>
<ps:hidden type="hidden" id="evt_in_pkg_key" value="%{getText('evt_in_pkg_key')}"/>
<ps:hidden type="hidden" id="cancel_key" value="%{getText('cancel_key')}"/>
<ps:hidden type="hidden" id="no_record_selected" value="%{getText('msg.no_record_selected')}"/>
<ps:hidden type="hidden" id="fill_fixed_event_param_empty_row_key" value="%{getText('fill_fixed_event_empty_row_key')}"/>
<ps:hidden type="hidden" id="sms_should_be_less_than_160_charachters_key" value="%{getText('sms_should_be_less_than_160_charachters_key')}"/>
<ps:hidden type="hidden" id="invalid_email_key" value="%{getText('invalid_email_key')}"/>
<ps:hidden type="hidden" id="invalid_mobile_no_key" value="%{getText('invalid_mobile_no_key')}"/>
<ps:hidden type="hidden" id="fill_empty_mobile_no_key" value="%{getText('fill_empty_mobile_no_key')}"/>
<ps:hidden type="hidden" id="fill_empty_email_key" value="%{getText('fill_empty_email_key')}"/>
<ps:hidden type="hidden" id="confirm_suspended_approve_key" value="%{getText('confirm_suspended_approve_key')}"/>
<ps:hidden type="hidden" id="confirm_reactivated_approve_key" value="%{getText('confirm_reactivated_approve_key')}"/>
<ps:hidden type="hidden" id="please_select_atm_interface_key" value="%{getText('please_select_atm_interface_key')}"/>
<ps:hidden type="hidden" id="expression_dialog_key" value="%{getText('expression_dialog_key')}"/>
<ps:hidden type="hidden" id="fill_expression_short_name_key" value="%{getText('fill_expression_short_name_key')}"/>
<ps:hidden type="hidden" id="fill_expression_description_name_key" value="%{getText('fill_expression_description_name_key')}"/>
<ps:hidden type="hidden" id="fill_expression_key" value="%{getText('fill_expression_key')}"/>

<ps:hidden type="hidden" id="fill_trx_type_expression_key" value="%{getText('fill_trx_type_expression_key')}"/>
<ps:hidden type="hidden" id="fill_charges_trx_type_expression_key" value="%{getText('fill_charges_trx_type_expression_key')}"/>

<ps:hidden type="hidden" id="please_select_trx_type_key" value="%{getText('please_select_trx_type_key')}"/>
<ps:hidden type="hidden" id="please_select_charges_trx_type_key" value="%{getText('please_select_charges_trx_type_key')}"/>
<ps:hidden type="hidden" id="please_select_mti_key" value="%{getText('please_select_mti_key')}"/>
<ps:hidden type="hidden" id="please_select_interface_and_mti_key" value="%{getText('please_select_interface_and_mti_key')}"/>

<ps:hidden type="hidden" id="expression_details_key" value="%{getText('expression_details_key')}"/>
<ps:hidden type="hidden" id="Formula_Key" value="%{getText('Formula_Key')}"/>
<ps:hidden type="hidden" id="msg_not_found_key" value="%{getText('msg_not_found_key')}"/>
<ps:hidden type="hidden" id="sub_field_length_error_key" value="%{getText('sub_field_length_error_key')}"/>
<ps:hidden type="hidden" id="test_message_key" value="%{getText('test_message_key')}"/>
<ps:hidden type="hidden" id="message_sample_key" value="%{getText('message_sample_key')}"/>
<ps:hidden type="hidden" id="field_distribution_key" value="%{getText('field_distribution_key')}"/>
<ps:hidden type="hidden" id="mti_not_found_key" value="%{getText('mti_not_found_key')}"/>
<ps:hidden type="hidden" id="servive_map_key" value="%{getText('servive_map_key')}"/>
<ps:hidden type="hidden" id="parameters_key" value="%{getText('parameters_key')}"/>
<ps:hidden type="hidden" id="ws_mapping_dialog_title_key" value="%{getText('ws_mapping_dialog_title_key')}"/>
<ps:hidden type="hidden" id="please_select_request_response_fields_of_all_mti_key" value="%{getText('please_select_request_response_fields_of_all_mti_key')}"/>

<ps:hidden type="hidden" id="request_iso_meesage_required_for_parsing_key" value="%{getText('request_iso_meesage_required_for_parsing_key')}"/>
<ps:hidden type="hidden" id="mti_or_process_code_required_key" value="%{getText('mti_or_process_code_required_key')}"/>
<ps:hidden type="hidden" id="mti_or_process_code_required_key" value="%{getText('mti_or_process_code_required_key')}"/>
<ps:hidden type="hidden" id="mti_or_process_code_required_key" value="%{getText('mti_or_process_code_required_key')}"/>

<ps:hidden type="hidden" id="confirm_approve_delete_process_key" value="%{getText('confirm_approve_delete_process_key')}"/>
<ps:hidden type="hidden" id="confirm_approve_suspend_process_key" value="%{getText('confirm_approve_suspend_process_key')}"/>
<ps:hidden type="hidden" id="confirm_approve_reactivate_process_key" value="%{getText('confirm_approve_reactivate_process_key')}"/>
<ps:hidden type="hidden" id="deleted_record_approved_successfully_key" value="%{getText('deleted_record_approved_successfully_key')}"/>

<ps:hidden type="hidden" id="export_key_var" value="%{getText('export_key')}"/>
<ps:hidden type="hidden" id="import_key_var" value="%{getText('import_key')}"/>
<ps:hidden type="hidden" id="invalid_zipfile_key_var" value="%{getText('invalid_zipfile_key')}"/>
<ps:hidden type="hidden" id="file_imported_successfully_key_var" value="%{getText('file_imported_successfully_key')}"/>
<ps:hidden type="hidden" id="failed_to_run_the_interface_reload_the_grid_to_display_reason_key" value="%{getText('failed_to_run_the_interface_reload_the_grid_to_display_reason_key')}"/>

<script type="text/javascript">
	var yes_key = "${yes_key}";
	var no_key = "${no_key}";
	var Ok_key = "${Ok_key}";
	var Cancel_key = "${Cancel_key}";
	var The_Mob_Nb_cont_AlpCh_Proceed_key = "${The_Mob_Nb_cont_AlpCh_Proceed_key}";
	var update_subscriptions_parameters_key = "${update_subscriptions_parameters_key}";
	var subscriptions_related_Event_key =     "${subscriptions_related_Event_key}";
	var Record_was_Deleted_Successfully_key="${Record_was_Deleted_Successfully_key}";
	var Confirm_Authorize_Process_key = "${Confirm_Authorize_Process_key}";
	var evt_miss_not_appr_proc_for_appr_key =  "${evt_miss_not_appr_proc_for_appr_key}";
	var fail_ins_alrt_queue_wish_proc_key =  "${fail_ins_alrt_queue_wish_proc_key}";
	var Confirm_Delete_All_subscriptions_key = "${Confirm_Delete_All_subscriptions_key}";
	var subscriptions_key="${subscriptions_key}";
	var subscription_details_key="${subscription_details_key}";
	var fixed_event_parameter_key="${fixed_event_parameter_key}";
	var subscription_audit_details_key="${subscription_audit_details_key}";
	var no_det_for_populated_sub_key="${no_det_for_populated_sub_key}";
	var information_key="${information_key}";
	var please_select_a_sub_key="${please_select_a_sub_key}";
	var missing_info_key="${missing_info_key}";
	var no_det_available_to_be_del_key="${no_det_available_to_be_del_key}";
	var Confirm_Save_Process_key = document.getElementById("Confirm_Save_Process_key").value;
	var no_sub_grps_sel_for_population="${no_sub_grps_sel_for_population}";
	var no_evt_pkg_sel_for_population="${no_evt_pkg_sel_for_population}";
	var no_sub_sel_for_delt="${no_sub_sel_for_delt}";
	var are_you_sure_to_dlt_subs="${are_you_sure_to_dlt_subs}";
	var are_you_sure_want_to_process_Retrieve_key="${are_you_sure_want_to_process_Retrieve_key}";
	var are_you_sure_want_to_suspending_subscriptions_key="${are_you_sure_want_to_suspending_subscriptions_key}";
	var are_you_sure_want_to_activating_subscriptions_key="${are_you_sure_want_to_activating_subscriptions_key}";
	var record_reactivated_successfully_key="${record_reactivated_successfully_key}";
	var Record_was_Suspended_Successfully_key="${Record_was_Suspended_Successfully_key}";
	
	var other_lang_dialog_title  = "${other_lang_dialog_title_key}";
	var record_must_be_saved_key	= "${record_must_be_saved_key}";
	
	var duplicate_entry_of_email  = document.getElementById("duplicate_entry_of_email_key").value;
	var duplicate_entry_of_mobile = document.getElementById("duplicate_entry_of_mobile_key").value;
	
	/* Event Screen */
	var select_query_key = document.getElementById("select_query_key").value;
	var select_report_key = document.getElementById("select_report_key").value;
	
	var missing_email_report_default_subject_key = document.getElementById("missing_email_report_default_subject_key").value;
	var missing_email_query_default_subject_Body_key = document.getElementById("missing_email_query_default_subject_Body_key").value;
	var missing_sms_query_default_Msg_key = document.getElementById("missing_sms_query_default_Msg_key").value;
	var missing_omniInbox_query_default_Msg_key = document.getElementById("missing_omniInbox_query_default_Msg_key").value;

	var suspended_record_approved_successfully_key = document.getElementById("suspended_record_approved_successfully_key").value;
	var reactivated_record_approved_successfully_key = document.getElementById("reactivated_record_approved_successfully_key").value;
	var suspended_record_rejected_successfully_key = document.getElementById("suspended_record_rejected_successfully_key").value;
	var reactivated_record_rejected_successfully_key = document.getElementById("reactivated_record_rejected_successfully_key").value;
	var duplicate_entry_report_key = document.getElementById("duplicate_entry_report_key").value;
	var fill_empty_report_attachment_key = document.getElementById("fill_empty_report_attachment_key").value;
	
	var fill_empty_tag_key = document.getElementById("fill_empty_tag_key").value;
	var customization_key = document.getElementById("customization_key").value;
	var selected_records_approved_successfully_key = document.getElementById("selected_records_approved_successfully_key").value;
	var conform_selected_records_approved_key = document.getElementById("conform_selected_records_approved_key").value;
	var main_info_other_languages_key = document.getElementById("main_info_other_languages_key").value;
	var fill_empty_row_key = document.getElementById("fill_empty_row_key").value;
	var duplicate_entry_fixed_param_key = document.getElementById("duplicate_entry_fixed_param_key").value;
	var confirm_remove_fixed_params_key = document.getElementById("confirm_remove_fixed_params_key").value;
	var select_fixed_event_key = document.getElementById("select_fixed_event_key").value;
	var select_message_body_for_adding_tags_key = document.getElementById("select_message_body_for_adding_tags_key").value;
	var duplicate_entry_cif_key = document.getElementById("duplicate_entry_cif_key").value;
	
	var query_tags_not_used_conform_key = document.getElementById("query_tags_not_used_conform_key").value;
	
	var SMS_key = document.getElementById("SMS_key").value;
	var email_key = document.getElementById("email_key").value;
	var omni_inbox_key = document.getElementById("omni_inbox_key").value;
	var sub_in_grp_key = document.getElementById("sub_in_grp_key").value;
	var evt_in_pkg_key = document.getElementById("evt_in_pkg_key").value;
	var cancel_key = document.getElementById("cancel_key").value;
	var no_record_selected = document.getElementById("no_record_selected").value;
	var fill_fixed_event_param_empty_row_key = document.getElementById("fill_fixed_event_param_empty_row_key").value;
	var sms_should_be_less_than_160_charachters_key = document.getElementById("sms_should_be_less_than_160_charachters_key").value;
	var invalid_email_key = document.getElementById("invalid_email_key").value;
	var invalid_mobile_no_key = document.getElementById("invalid_mobile_no_key").value;
	var fill_empty_email_key = document.getElementById("fill_empty_email_key").value;
	var fill_empty_mobile_no_key = document.getElementById("fill_empty_mobile_no_key").value;
	
	var confirm_suspended_approve_key = document.getElementById("confirm_suspended_approve_key").value;
	var confirm_reactivated_approve_key = document.getElementById("confirm_reactivated_approve_key").value;
	var please_select_atm_interface_key = document.getElementById("please_select_atm_interface_key").value;
	var expression_dialog_key = document.getElementById("expression_dialog_key").value;
	var please_select_trx_type_key = document.getElementById("please_select_trx_type_key").value;
	var please_select_charges_trx_type_key = document.getElementById("please_select_charges_trx_type_key").value;
	
	var fill_expression_short_name_key = document.getElementById("fill_expression_short_name_key").value;
	var fill_expression_description_name_key = document.getElementById("fill_expression_description_name_key").value;
	var fill_expression_key = document.getElementById("fill_expression_key").value;
	var fill_trx_type_expression_key = document.getElementById("fill_trx_type_expression_key").value;
	var fill_charges_trx_type_expression_key = document.getElementById("fill_charges_trx_type_expression_key").value;
	
	var expression_details_key 	= document.getElementById("expression_details_key").value;
	var Formula_Key 			= document.getElementById("Formula_Key").value;
	var msg_not_found_key 		= document.getElementById("msg_not_found_key").value;
	var sub_field_length_error_key 	= document.getElementById("sub_field_length_error_key").value;
	var test_message_key 	= document.getElementById("test_message_key").value;
	var message_sample_key 	= document.getElementById("message_sample_key").value;
	var field_distribution_key 	= document.getElementById("field_distribution_key").value;
	var mti_not_found_key 	= document.getElementById("mti_not_found_key").value;
	var servive_map_key 	= document.getElementById("servive_map_key").value;
	var parameters_key 	= document.getElementById("parameters_key").value;
	var ws_mapping_dialog_title_key 	= document.getElementById("ws_mapping_dialog_title_key").value;
	var please_select_request_response_fields_of_all_mti_key 	= document.getElementById("please_select_request_response_fields_of_all_mti_key").value;
	var please_select_mti_key 	= document.getElementById("please_select_mti_key").value;
	var please_select_interface_and_mti_key 	= document.getElementById("please_select_interface_and_mti_key").value;
	var request_iso_meesage_required_for_parsing_key 	= document.getElementById("request_iso_meesage_required_for_parsing_key").value;
	var mti_or_process_code_required_key 	= document.getElementById("mti_or_process_code_required_key").value;
	
	var confirm_approve_delete_process_key 	= document.getElementById("confirm_approve_delete_process_key").value;
	var confirm_approve_suspend_process_key 	= document.getElementById("confirm_approve_suspend_process_key").value;
	var confirm_approve_reactivate_process_key 	= document.getElementById("confirm_approve_reactivate_process_key").value;
	var deleted_record_approved_successfully_key 	= document.getElementById("deleted_record_approved_successfully_key").value;
	
	
	var export_key =  document.getElementById("export_key_var").value;
	var import_key = document.getElementById("import_key_var").value;
	var invalid_zipfile_key = document.getElementById("invalid_zipfile_key_var").value;
	var file_imported_successfully_key = document.getElementById("file_imported_successfully_key_var").value;
	var failed_to_run_the_interface_reload_the_grid_to_display_reason_key = document.getElementById("failed_to_run_the_interface_reload_the_grid_to_display_reason_key").value;
</script>