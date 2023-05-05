export type ValidationNotification = {
  id: string;
  code: string;
  type: InsuranceScopeValidationType;
  property: string;
};

export enum InsuranceScopeValidationType {
  warning = 'warning',
  error = 'error',
  log = 'log',
}
