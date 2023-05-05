export class CreateAddress {
  country: string;
  state: string;
  city: string;
  zipCode: string;
  streetAddress1: string;
  streetAddress2: string | null;
  apartment: string | null;
  latitude: number;
  longitude: number;
  placeId: string;
  formattedAddress: string;
}
