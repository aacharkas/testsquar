export interface DataElement {
  text: string;
  textSize: number;
  page: number;
  bounds: Bounds;
}

export interface Bounds {
  top: number;
  left: number;
  right: number;
  bottom: number;
}
