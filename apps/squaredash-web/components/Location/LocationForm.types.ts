export type TLocationForm = {
  [x: string]: string | boolean;
};

export type TLocationErrors = {
  [x: string]: string | boolean;
};

export type TCompanyLocation = {
  address: {
    city: string;
    country: string;
    formattedAddress: string;
    state: string;
    streetAddress1: string;
    zipCode: string;
  };
  addressId: string;
  id: string;
  companyId: string;
  email: string;
  isMain: boolean;
  name: string;
  phone: string;
};
