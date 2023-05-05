import { UnitOfMeasurement as UnitOfMeasurementModel } from '@prisma/client';

export type UnitOfMeasurement = Omit<UnitOfMeasurementModel, 'techStatus'>;
