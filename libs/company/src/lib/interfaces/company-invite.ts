import { Prisma } from '@prisma/client';

export interface CompanyInvite {
  data: Prisma.CompanyCreateInput;
  ownerName: string;
  ownerEmail: string;
}
