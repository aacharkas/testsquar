import { IItem } from '../../../../../libs/web/components/Select/SelectControlled';

export type TAdminForm = {
  [x: string]: string | boolean | IItem;
};
export type TAdminErrors = {
  [x: string]: string;
};

export type TAdminResponse = {
  name: string;
  role: string;
  email: string;
  status: string;
  timezone: string;
  avatarId: string | null;
  avatar: string | null;
};
