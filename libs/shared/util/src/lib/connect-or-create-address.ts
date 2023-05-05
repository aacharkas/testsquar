import { AddressBody } from '@squaredash/shared/models';

// TODO: create AddressBody interface instead of class validator
export function addressCreateOrConnect(payload: AddressBody) {
  return {
    connectOrCreate: {
      where: {
        country_state_city_zipCode_streetAddress1_formattedAddress: {
          country: payload.country,
          state: payload.state,
          city: payload.city,
          zipCode: payload.zipCode,
          streetAddress1: payload.streetAddress1,
          formattedAddress: payload.formattedAddress,
        },
      },
      create: payload,
    },
  };
}
