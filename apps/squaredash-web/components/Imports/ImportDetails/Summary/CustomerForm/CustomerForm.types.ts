import { TRelatedUser } from '../../../../../../../apps/squaredash-web/components/Customers/Customer/CustomerForm.types';
import { IItem } from '../../../../../../../libs/web/components/Select/SelectControlled';

export type TCustomerForm = {
  [x: string]:
    | string
    | number
    | boolean
    | IItem
    | TRelatedUser
    | TRelatedUser[];
};

export type TCustomerErrors = {
  [x: string]: string | boolean;
};
