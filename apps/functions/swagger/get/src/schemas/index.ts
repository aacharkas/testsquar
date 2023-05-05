import { FunctionSchemasGroup } from '../types/function-schemas-group';
import { authSchemasGroup } from './auth';
import { claimItemSchemasGroup } from './claim-item';
import { companySchemasGroup } from './company';
import { customerSchemasGroup } from './customer';
import { emailTemplateSchemasGroup } from './email-template';
import { fileSchemasGroup } from './file';
import { insuranceCarrierSchemasGroup } from './insurance-carrier';
import { insuranceScopeSchemasGroup } from './insurance-scope';
import { invitationSchemasGroup } from './invitation';
import { jobSchemasGroup } from './job';
import { jobContractSchemasGroup } from './job-contract';
import { superAdminSchemasGroup } from './super-admin';
import { unitOfMeasurementSchemasGroup } from './unit-of-measurement';
import { userSchemasGroup } from './user';

export const schemas: FunctionSchemasGroup[] = [
  authSchemasGroup,
  companySchemasGroup,
  userSchemasGroup,
  invitationSchemasGroup,
  fileSchemasGroup,
  customerSchemasGroup,
  insuranceCarrierSchemasGroup,
  superAdminSchemasGroup,
  unitOfMeasurementSchemasGroup,
  claimItemSchemasGroup,
  insuranceScopeSchemasGroup,
  emailTemplateSchemasGroup,
  jobSchemasGroup,
  jobContractSchemasGroup,
];
