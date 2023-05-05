import { TechStatus } from '@prisma/client';

export type PopulatedCustomer = {
  customer_id: string;
  customer_displayName: string;
  customer_phone: string;
  customer_email: string;
  customer_billingName: string;
  customer_billingAddressId: string;
  customer_parentId: string | null;
  customer_createdAt: Date;
  customer_updatedAt: Date;
  billingAddress_id: string;
  billingAddress_placeId: string;
  billingAddress_country: string;
  billingAddress_state: string;
  billingAddress_city: string;
  billingAddress_zipCode: string;
  billingAddress_streetAddress1: string;
  billingAddress_streetAddress2: string | null;
  billingAddress_apartment: string | null;
  billingAddress_formattedAddress: string;
  billingAddress_latitude: number;
  billingAddress_longitude: number;
  billingAddress_createdAt: Date;
  billingAddress_techStatus: TechStatus;
  customer_shippingAddress_id: string;
  shippingAddress_id: string;
  shippingAddress_placeId: string;
  shippingAddress_country: string;
  shippingAddress_state: string;
  shippingAddress_city: string;
  shippingAddress_zipCode: string;
  shippingAddress_streetAddress1: string;
  shippingAddress_streetAddress2: string | null;
  shippingAddress_apartment: string | null;
  shippingAddress_formattedAddress: string;
  shippingAddress_latitude: number;
  shippingAddress_longitude: number;
  shippingAddress_createdAt: Date;
  shippingAddress_techStatus: TechStatus;
  responsibleMembers: ResponsibleMember[];
};

export type ResponsibleMember = {
  id: string;
  name: string;
};
