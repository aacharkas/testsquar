export interface Contact {
  name: string;
  value: string;
}

export interface Entity {
  name: string;
  type: string;
  phones: Contact[];
  emails: Contact[];
  addresses: Contact[];
}
