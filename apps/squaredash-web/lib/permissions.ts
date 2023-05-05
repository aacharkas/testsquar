import { AbilityBuilder } from '@casl/ability';
import { AppAbility } from './ability';

export default function defineRulesFor(role: string) {
  const { can, rules } = new AbilityBuilder(AppAbility);

  switch (role) {
  case 'superAdmin':
    can('update', 'all');
    can('create', 'all');
    can('delete', 'all');
    can('read', 'all');
    can('manage', 'all');
    break;
  case 'owner':
    can('create', 'Company');
    can('create', 'Estimate');
    can('create', 'Customer');
    can('create', 'Vendor');
    can('create', 'Item');
    can('create', 'User');
    can('manage', 'User');
    can('update', 'all');
    can('delete', 'all');
    can('read', 'all');
    break;
  case 'admin':
    can('create', 'Company');
    can('create', 'Estimate');
    can('create', 'Customer');
    can('create', 'Vendor');
    can('create', 'Item');
    can('create', 'User');
    can('manage', 'User');
    can('update', 'User');
    can('update', 'Estimate');
    can('update', 'Customer');
    can('update', 'Vendor');
    can('update', 'Item');
    can('delete', 'User');
    can('delete', 'Estimate');
    can('delete', 'Vendor');
    can('delete', 'Item');
    can('read', 'all');
    break;
  case 'member':
    can('create', 'Company');
    can('create', 'Estimate');
    can('create', 'Customer');
    can('create', 'Vendor');
    can('create', 'Item');
    can('update', 'Estimate');
    can('update', 'Customer');
    can('update', 'Vendor');
    can('update', 'Item');
    can('delete', 'Estimate');
    can('read', 'Estimate');
    can('read', 'Customer');
    can('read', 'Vendor');
    can('read', 'Item');
    can('read', 'Company');
    break;
  default:
    can('read', 'Estimate');
    can('read', 'Vendor');
    can('read', 'Item');
  }

  return rules;
}
