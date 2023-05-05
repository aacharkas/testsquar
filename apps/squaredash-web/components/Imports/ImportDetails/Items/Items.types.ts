import { IItem } from '../../../../../../libs/web/components/Select/SelectControlled';

export type TGroupForm = {
  [x: string]: string | boolean | number | IItem | object;
};
export type TGroupErrors = {
  [x: string]: string;
};
