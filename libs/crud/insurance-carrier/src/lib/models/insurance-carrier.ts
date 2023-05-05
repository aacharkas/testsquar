import { InsuranceCarrier as InsuranceCarrierModel } from '@prisma/client';

export type InsuranceCarrier = Omit<InsuranceCarrierModel, 'techStatus'>;
