import {
  AddressComponent,
  AddressType,
  PlaceDetailsAddressComponentType,
  PlaceDetailsResult,
  createClient,
} from '@google/maps';
import { transformAndValidate } from 'class-transformer-validator';

import { Config } from '@squaredash/shared/util';

import { Address } from './models/address';

const googleMapsClient = createClient({
  key: Config.GOOGLE.googleMapsApiKey,
  Promise: Promise,
});

export async function getAddressByText(text: string) {
  try {
    const response = await googleMapsClient
      .geocode({ address: text })
      .asPromise();
    return getAddressByPlaceId(response.json.results[0].place_id);
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getAddressByPlaceId(
  placeId: string
): Promise<Address | null> {
  try {
    const response = await googleMapsClient
      .place({ placeid: placeId })
      .asPromise();
    return placeDetailsToAddressData(response.json.result);
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function placeDetailsToAddressData(
  geocodingResult: PlaceDetailsResult
): Promise<Address> {
  const placeId = geocodingResult.place_id;

  const components = geocodingResult.address_components;

  const address = {
    placeId: placeId,
    country: findComponentOfType(components, 'country'),
    state: findComponentOfType(components, 'administrative_area_level_1'),
    city: findComponentOfType(components, 'locality'),
    zipCode: findComponentOfType(components, 'postal_code'),
    streetAddress1: findComponentOfType(components, 'route'),
    streetAddress2: findComponentOfType(components, 'street_number') || null,
    apartment: findComponentOfType(components, 'subpremise') || null,
    formattedAddress: geocodingResult.formatted_address,
    latitude: geocodingResult.geometry.location.lat,
    longitude: geocodingResult.geometry.location.lng,
  };

  return transformAndValidate(Address, address);
}

function findComponentOfType(
  components: AddressComponent<
    AddressType | PlaceDetailsAddressComponentType
  >[],
  type: AddressType | PlaceDetailsAddressComponentType
) {
  return components.find((component) => component.types.includes(type))
    ?.long_name;
}
