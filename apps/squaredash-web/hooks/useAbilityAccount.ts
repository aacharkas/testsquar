import { useQuery } from '@apollo/client';
import { AbilityBuilder } from '@casl/ability';
import { useEffect } from 'react';

import { useToken } from '../../../libs/web/hooks/useToken';
import { GET_USER } from '../components/Companies/CompanyProfile/CompanyProfile.api';
import { PERMISSIONS, PERMISSION_ACTIONS } from '../constants/permissions';
import { ROLES } from '../constants/roles';
import { ability } from '../lib/ability';

export function useAbilityAccount() {
  const { loading: loadingUser, data: dataUser } = useQuery(GET_USER, {
    skip: !useToken(),
  });

  useEffect(() => {
    if (!dataUser) {
      return;
    }

    const { permissions, role } = dataUser?.get_user ?? {};

    ability.update([]);

    const { can, rules } = new AbilityBuilder(null);

    can(PERMISSION_ACTIONS.ALL, role);

    setPermissions(permissions, can);
    setRolePermissions(role, can);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ability.update(rules);
  }, [dataUser]);
}

// setup specific roles permisssion
function setRolePermissions(role, can) {
  switch (role) {
    case ROLES.COMPANY_OWNER:
      break;
    case ROLES.COMPANY_USER:
      break;
    case ROLES.COMPANY_ADMIN:
      break;
    case ROLES.SUPER_ADMIN:
      can(PERMISSION_ACTIONS.ALL, PERMISSIONS.ALGORITHM_ACCURACY);
      can(PERMISSION_ACTIONS.GET, PERMISSIONS.ALGORITHM_ACCURACY);
      break;
    case ROLES.INITIAL_ADMIN:
      can(PERMISSION_ACTIONS.ALL, PERMISSIONS.ALGORITHM_ACCURACY);
      can(PERMISSION_ACTIONS.GET, PERMISSIONS.ALGORITHM_ACCURACY);
      break;
  }
}

function setPermissions(per, can) {
  can(PERMISSION_ACTIONS.GET, PERMISSIONS.TAX_RATES);
  // DASHBOARD
  if (per?.company_dashboard_get)
    can(PERMISSION_ACTIONS.GET, PERMISSIONS.DASHBOARD);
  // COMPANY
  if (per?.company_create) can(PERMISSION_ACTIONS.CREATE, PERMISSIONS.COMPANY);
  if (per?.company_invite) can(PERMISSION_ACTIONS.INVITE, PERMISSIONS.COMPANY);
  if (per?.company_get) can(PERMISSION_ACTIONS.GET, PERMISSIONS.COMPANY);
  if (per?.company_update) can(PERMISSION_ACTIONS.UPDATE, PERMISSIONS.COMPANY);
  // COMPANY LIST
  if (per?.company_list_get)
    can(PERMISSION_ACTIONS.GET, PERMISSIONS.COMPANY_LIST);
  // LOCATION
  if (per?.company_location_create)
    can(PERMISSION_ACTIONS.CREATE, PERMISSIONS.COMPANY_LOCATION);
  if (per?.company_location_update)
    can(PERMISSION_ACTIONS.UPDATE, PERMISSIONS.COMPANY_LOCATION);
  if (per?.company_location_get)
    can(PERMISSION_ACTIONS.GET, PERMISSIONS.COMPANY_LOCATION);
  if (per?.company_location_delete)
    can(PERMISSION_ACTIONS.DELETE, PERMISSIONS.COMPANY_LOCATION);
  if (per?.company_settings_get)
    can(PERMISSION_ACTIONS.GET, PERMISSIONS.COMPANY_SETTINGS);
  // USER
  if (per?.company_user_invite)
    can(PERMISSION_ACTIONS.INVITE, PERMISSIONS.COMPANY_USER);
  if (per?.user_role_company_user_set)
    can(PERMISSION_ACTIONS.SET, PERMISSIONS.COMPANY_USER);
  if (per?.user_update) can(PERMISSION_ACTIONS.UPDATE, PERMISSIONS.USER);
  // USER LIST
  if (per?.user_list_get) can(PERMISSION_ACTIONS.GET, PERMISSIONS.USER_LIST);
  // USER STATUS
  if (per?.user_status_update)
    can(PERMISSION_ACTIONS.UPDATE, PERMISSIONS.USER_STATUS);
  // USER PROFILE
  if (per?.user_profile_get)
    can(PERMISSION_ACTIONS.GET, PERMISSIONS.USER_PROFILE);
  if (per?.user_profile_get_by_id)
    can(PERMISSION_ACTIONS.GET_BY_ID, PERMISSIONS.USER_PROFILE);
  if (per?.user_email_change)
    can(PERMISSION_ACTIONS.CHANGE, PERMISSIONS.USER_EMAIL);
  // PASSWORD
  if (per?.password_change)
    can(PERMISSION_ACTIONS.CHANGE, PERMISSIONS.PASSWORD);
  // FILE
  if (per?.file_upload) can(PERMISSION_ACTIONS.UPLOAD, PERMISSIONS.FILE);
  // CUSTOMER
  if (per?.customer_create)
    can(PERMISSION_ACTIONS.CREATE, PERMISSIONS.CUSTOMER);
  if (per?.customer_update)
    can(PERMISSION_ACTIONS.UPDATE, PERMISSIONS.CUSTOMER);
  if (per?.customer_delete)
    can(PERMISSION_ACTIONS.DELETE, PERMISSIONS.CUSTOMER);
  if (per?.customer_get) can(PERMISSION_ACTIONS.GET, PERMISSIONS.CUSTOMER);
  // CUSTOMER LIST
  if (per?.customer_list_get)
    can(PERMISSION_ACTIONS.GET, PERMISSIONS.CUSTOMER_LIST);
  // SUPER ADMIN LIST
  if (per?.super_admin_list_get)
    can(PERMISSION_ACTIONS.GET, PERMISSIONS.SUPER_ADMIN_LIST);
  // SUPER ADMIN LIST
  if (per?.super_admin_invite)
    can(PERMISSION_ACTIONS.INVITE, PERMISSIONS.SUPER_ADMIN);
  // COMPANY OWNER
  if (per?.company_owner_invite)
    can(PERMISSION_ACTIONS.INVITE, PERMISSIONS.COMPANY_OWNER);
  if (per?.user_role_company_owner_set)
    can(PERMISSION_ACTIONS.SET, PERMISSIONS.COMPANY_OWNER);
  // COMPANY ADMIN
  if (per?.user_role_company_admin_set)
    can(PERMISSION_ACTIONS.SET, PERMISSIONS.COMPANY_ADMIN);
  // INSURANCE CARRIER
  if (per?.insurance_carrier_create)
    can(PERMISSION_ACTIONS.CREATE, PERMISSIONS.INSURANCE_CARRIERS);
  if (per?.insurance_carrier_get)
    can(PERMISSION_ACTIONS.GET, PERMISSIONS.INSURANCE_CARRIERS);
  if (per?.insurance_carrier_update)
    can(PERMISSION_ACTIONS.UPDATE, PERMISSIONS.INSURANCE_CARRIERS);
  if (per?.insurance_carrier_remove)
    can(PERMISSION_ACTIONS.DELETE, PERMISSIONS.INSURANCE_CARRIERS);
  // UNIT OF MEASUREMENT
  if (per?.unit_of_measurement_create)
    can(PERMISSION_ACTIONS.CREATE, PERMISSIONS.MEASUREMENT_UNITS);
  if (per?.unit_of_measurement_update)
    can(PERMISSION_ACTIONS.UPDATE, PERMISSIONS.MEASUREMENT_UNITS);
  if (per?.unit_of_measurement_get)
    can(PERMISSION_ACTIONS.GET_BY_ID, PERMISSIONS.MEASUREMENT_UNITS);
  if (per?.unit_of_measurement_list)
    can(PERMISSION_ACTIONS.GET, PERMISSIONS.MEASUREMENT_UNITS);
  if (per?.unit_of_measurement_delete)
    can(PERMISSION_ACTIONS.DELETE, PERMISSIONS.MEASUREMENT_UNITS);
  // CLAIM ITEMS
  if (per?.claim_item_approve)
    can(PERMISSION_ACTIONS.APPROVE, PERMISSIONS.CLAIM_ITEMS);
  if (per?.claim_item_create)
    can(PERMISSION_ACTIONS.CREATE, PERMISSIONS.CLAIM_ITEMS);
  if (per?.claim_item_list)
    can(PERMISSION_ACTIONS.GET, PERMISSIONS.CLAIM_ITEMS);
  if (per?.claim_item_remove)
    can(PERMISSION_ACTIONS.DELETE, PERMISSIONS.CLAIM_ITEMS);
  if (per?.claim_item_update)
    can(PERMISSION_ACTIONS.UPDATE, PERMISSIONS.CLAIM_ITEMS);
  // IMPORTS
  if (per?.insurance_scope_get)
    can(PERMISSION_ACTIONS.GET, PERMISSIONS.IMPORTS);
  if (per?.insurance_scope_import)
    can(PERMISSION_ACTIONS.IMPORT, PERMISSIONS.IMPORTS);
  // EMAIL TEMPLATES
  if (per?.email_template_list_get)
    can(PERMISSION_ACTIONS.GET, PERMISSIONS.EMAIL_TEMPLATES);
  if (per?.email_template_upsert)
    can(PERMISSION_ACTIONS.UPDATE, PERMISSIONS.EMAIL_TEMPLATES);
  // ALGORITHM_ACCURACY
  if (per?.algorithm_accuracy_all)
    can(PERMISSION_ACTIONS.ALL, PERMISSIONS.ALGORITHM_ACCURACY);
  if (per?.algorithm_accuracy_get)
    can(PERMISSION_ACTIONS.GET, PERMISSIONS.ALGORITHM_ACCURACY);
}
