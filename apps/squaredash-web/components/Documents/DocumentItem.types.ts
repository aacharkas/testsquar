export type TDocuments = {
  id: string;
  name: string;
  fileSize: string;
};
export type TDocumentForm = {
  [x: string]: string | boolean;
};
export type TDocumentErrors = {
  [x: string]: string;
};
