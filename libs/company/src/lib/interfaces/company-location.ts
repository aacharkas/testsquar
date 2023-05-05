import { CompanyLocation as CompanyLocationEntity } from '@prisma/client';

export type CompanyLocation = Omit<CompanyLocationEntity, 'techStatus'>;
