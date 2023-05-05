export type Member = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  techStatus: string;

  avatar: string;
  addressId: string;
  address: {
    apartment: string;
    city: string;
    country: string;

    createdAt: string;
    formattedAddress: string;
    id: string;
    latitude: number;
    longitude: number;
    placeId: string;
    state: string;
    streetAddress1: string;
    streetAddress2: string;
    techStatus: string;
    zipCode: string;
  };
  birthDate: string;
  companyId: string;
  createdAt: string;
  status: string;
  tShirtSize: string;
  timezone: string;
  updatedAt: string;
};

export type TFilters = {
  search: string;
  sortOrder: string;
  resRoles: { id: number; name: string }[];
  resTechStatuses: { id: number; name: string }[];
  skip: number;
};
