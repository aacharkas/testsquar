import type { IItem } from '../../../../../libs/web/components/Select/SelectControlled';

export type TMemberForm = {
  [x: string]: string | boolean | IItem | Date;
};

export type TMemberErrors = {
  [x: string]: string;
};
