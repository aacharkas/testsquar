export interface Geocode {
  locationId: string;
  locationType: 'point';
  displayPosition: GeoLocation;
  navigationPosition: GeoLocation[];
  mapView: {
    topLeft: GeoLocation;
    bottomRight: GeoLocation;
  };
  address: GeoAddress;
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
}

export interface GeoAddress {
  label: string;
  country: string;
  state: string;
  county: string;
  city: string;
  district: string;
  street: string;
  houseNumber: string;
  postalCode: string;
  additionalData: {
    value: string;
    key: string;
  }[];
}
