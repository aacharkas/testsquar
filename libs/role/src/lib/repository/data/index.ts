import { RolePermission } from '../../interfaces/role-permission';

export const ROLE_PERMISSIONS: { [key: string]: RolePermission } = {
  INITIAL_ADMIN: {
    company_get: true,
    company_invite: true,
    company_create: false,
    company_update: true,
    company_location_create: true,
    company_location_update: true,
    company_location_delete: true,
    company_location_get: true,
    company_list_get: true,
    company_status_update: true,
    company_dashboard_get: false,
    company_settings_get: false,

    company_user_invite: true,
    user_update: true,
    user_list_get: true,
    user_status_update: true,
    user_profile_get: true,
    user_profile_get_by_id: true,
    user_delete: true,

    user_role_company_owner_set: true,
    user_role_company_admin_set: true,
    user_role_company_user_set: true,

    password_change: true,

    file_upload: true,

    company_owner_invite: true,
    company_admin_invite: true,

    customer_create: true,
    customer_update: true,
    customer_delete: true,
    customer_get: true,
    customer_list_get: false,

    claim_item_create: true,
    claim_item_list: true,
    admin_claim_item_list: true,
    claim_item_update: true,
    claim_item_approve: true,
    claim_item_remove: true,

    super_admin_list_get: true,
    super_admin_invite: true,

    insurance_carrier_create: true,
    insurance_carrier_update: true,
    insurance_carrier_remove: true,
    insurance_carrier_list: true,
    insurance_carrier_get: true,

    unit_of_measurement_create: true,
    unit_of_measurement_update: true,
    unit_of_measurement_get: true,
    unit_of_measurement_list: true,
    admin_unit_of_measurement_list: true,
    unit_of_measurement_delete: true,

    insurance_scope_save: false,

    algorithm_accuracy_check: true,
    s3_files_list: true,
    job_list: true,
  },
  SUPER_ADMIN: {
    company_invite: true,
    company_create: false,
    company_get: true,
    company_update: true,
    company_location_create: true,
    company_location_update: true,
    company_location_get: true,
    company_location_delete: true,
    company_list_get: true,
    company_user_invite: true,
    company_status_update: true,
    company_dashboard_get: false,
    company_settings_get: false,

    user_status_update: true,
    user_delete: true,

    user_role_company_owner_set: true,
    user_role_company_admin_set: true,
    user_role_company_user_set: true,

    user_update: true,
    user_list_get: true,
    user_profile_get: true,
    user_profile_get_by_id: true,
    password_change: true,

    file_upload: true,

    company_admin_invite: true,

    company_owner_invite: true,

    customer_create: true,
    customer_update: true,
    customer_delete: true,
    customer_get: true,
    customer_list_get: false,

    claim_item_create: true,
    claim_item_list: true,
    admin_claim_item_list: true,
    claim_item_update: true,
    claim_item_approve: true,
    claim_item_remove: true,

    super_admin_list_get: true,
    super_admin_invite: true,

    insurance_carrier_create: true,
    insurance_carrier_update: true,
    insurance_carrier_remove: true,
    insurance_carrier_list: true,
    insurance_carrier_get: true,

    insurance_scope_list: true,

    unit_of_measurement_create: true,
    unit_of_measurement_update: true,
    unit_of_measurement_get: true,
    unit_of_measurement_list: true,
    admin_unit_of_measurement_list: true,
    unit_of_measurement_delete: true,

    algorithm_accuracy_check: true,
    s3_files_list: true,
    job_list: true,
  },
  COMPANY_OWNER: {
    company_create: true,
    company_get: true,
    company_update: true,
    company_location_create: true,
    company_location_update: true,
    company_location_get: true,
    company_location_delete: true,

    user_role_company_owner_set: true,
    user_role_company_admin_set: true,
    user_role_company_user_set: true,

    user_email_change: true,

    email_template_list_get: true,
    email_template_upsert: true,
    email_template_get: true,

    claim_item_list: true,

    company_dashboard_get: true,
    company_settings_get: true,

    company_user_invite: true,
    user_status_update: true,
    user_update: true,
    user_list_get: true,
    user_profile_get: true,
    user_profile_get_by_id: true,
    user_delete: false,

    password_change: true,

    file_upload: true,

    company_admin_invite: true,

    company_owner_invite: true,

    customer_create: true,
    customer_update: true,
    customer_delete: true,
    customer_get: true,
    customer_list_get: true,

    super_admin_list_get: false,
    super_admin_invite: false,

    insurance_carrier_list: true,
    insurance_carrier_get: true,

    insurance_scope_import: true,
    insurance_scope_list: true,
    insurance_scope_get: true,
    insurance_scope_mark_verified: true,
    insurance_scope_save_customer: true,
    insurance_scope_update: true,
    insurance_scope_carrier_update: true,
    insurance_carrier_adjuster_create: true,
    insurance_carrier_adjuster_update: true,
    insurance_carrier_adjuster_delete: true,
    insurance_scope_customer_update: true,
    insurance_scope_group_create: true,
    insurance_scope_group_update: true,
    insurance_scope_group_delete: true,
    insurance_scope_line_item_create: true,
    insurance_scope_line_item_update: true,
    insurance_scope_line_item_delete: true,
    unit_of_measurement_list: true,

    job_create: true,
    job_get: true,
    job_update: true,
    job_contract_create: true,
    job_contract_list: true,
    job_contract_download: true,
    job_contract_delete: true,
    job_status_update: true,
    job_version_submit: true,
    job_list: true,
  },
  COMPANY_ADMIN: {
    company_create: true,
    company_user_invite: true,
    company_dashboard_get: true,
    company_settings_get: true,

    user_status_update: true,

    user_role_company_owner_set: false,
    user_role_company_admin_set: false,
    user_role_company_user_set: false,

    user_list_get: true,
    user_update: true,
    user_profile_get: true,
    user_profile_get_by_id: true,
    user_delete: false,
    password_change: true,

    file_upload: true,

    company_admin_invite: false,

    company_owner_invite: false,

    customer_create: true,
    customer_update: true,
    customer_get: true,
    customer_list_get: true,

    super_admin_list_get: false,
    super_admin_invite: false,

    insurance_carrier_list: true,
    insurance_carrier_get: true,

    insurance_scope_import: true,
    insurance_scope_list: true,
    insurance_scope_get: true,
    insurance_scope_mark_verified: true,
    insurance_scope_save_customer: true,
    insurance_scope_update: true,
    insurance_scope_carrier_update: true,
    insurance_carrier_adjuster_create: true,
    insurance_carrier_adjuster_update: true,
    insurance_carrier_adjuster_delete: true,
    insurance_scope_customer_update: true,
    insurance_scope_group_create: true,
    insurance_scope_group_update: true,
    insurance_scope_group_delete: true,
    insurance_scope_line_item_create: true,
    insurance_scope_line_item_update: true,
    insurance_scope_line_item_delete: true,
    unit_of_measurement_list: true,

    job_create: true,
    job_get: true,
    job_update: true,
    job_contract_create: true,
    job_contract_list: true,
    job_contract_download: true,
    job_contract_delete: true,
    job_status_update: true,
    job_version_submit: true,
    job_list: true,

    claim_item_list: true,
  },
  COMPANY_USER: {
    company_create: false,

    user_role_company_owner_set: false,
    user_role_company_admin_set: false,
    user_role_company_user_set: false,

    user_list_get: false,
    user_update: true,
    user_profile_get: true,
    user_profile_get_by_id: true,
    user_delete: false,
    password_change: true,

    company_dashboard_get: true,
    company_settings_get: false,

    file_upload: true,

    company_admin_invite: false,

    company_owner_invite: false,

    customer_create: true,
    customer_update: true,
    customer_get: true,
    customer_list_get: true,

    super_admin_list_get: false,
    super_admin_invite: false,

    insurance_carrier_list: true,
    insurance_carrier_get: true,

    insurance_scope_import: true,
    insurance_scope_list: true,
    insurance_scope_get: true,
    insurance_scope_save: true,
    insurance_scope_mark_verified: true,
    insurance_scope_save_customer: true,
    insurance_scope_update: true,
    insurance_scope_carrier_update: true,
    insurance_carrier_adjuster_create: true,
    insurance_carrier_adjuster_update: true,
    insurance_carrier_adjuster_delete: true,
    insurance_scope_customer_update: true,
    insurance_scope_group_create: true,
    insurance_scope_group_update: true,
    insurance_scope_group_delete: true,
    insurance_scope_line_item_create: true,
    insurance_scope_line_item_update: true,
    insurance_scope_line_item_delete: true,

    job_create: true,
    job_get: true,
    job_update: true,
    job_status_update: true,
    job_contract_create: true,
    job_contract_list: true,
    job_contract_download: true,
    job_contract_delete: true,
    job_version_submit: true,
    job_list: true,

    unit_of_measurement_list: true,
    claim_item_list: true,
  },
};
