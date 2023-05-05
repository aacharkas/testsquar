import { ValueOf } from 'next/constants';

import type { TCompanyLocation } from '../../Location/LocationForm.types';

export type Company = {
  name: string;
  img: string;
  owners: string[];
  items: CompanyItem[];
};

export type CompanyItem = {
  id: number;
  title: string;
  address: string;
  email: string;
  phone: string;
  tags: string[];
};

export type TCompanyOwner = {
  id: string;
  name: string;
};

export type TCompany = {
  id: string;
  name: string;
  avatar: string;
  avatar_id: string;
  locations?: TCompanyLocation[];
  owners: TCompanyOwner[];
  status: string;
};

export type TCompanyForm = ValueOf<TCompany>;

export type TCompanyFormDefault = {
  [x: string]: string | boolean | [] | object | number;
};

export type TCompanyErrors = {
  [x: string]: string;
};

export type TCompanyDataState = {
  editMode: boolean;
  openModal: boolean;
};

export type TCompanyDataAction = {
  setEditMode: (boolean: boolean) => void;
  setOpenModal: (boolean: boolean) => void;
};

export type TCompanyDataHandlers = {
  handleChange: (
    value: string | boolean | [] | object | null,
    name: string
  ) => void;
  handleUpdate: (id: string) => Promise<void>;
  handleAction: (item: TCompanyLocation) => void;
  handleUploadAvatar: (val: TCompanyAvatar) => void;
  handleSaveChanges: () => void;
  handleCloseModal: () => void;
};

export type TCompanyDataFormattedDataUpdated = {
  loading: boolean;
  companyFormErrors: TCompanyErrors;
  companyForm: TCompany;
  isMoreDetailed: boolean;
};

export type TCompanyAvatar = {
  id: string;
  link: string;
};
