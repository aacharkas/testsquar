import * as insuranceScopeService from '@squaredash/crud/insurance-scope';
import { InsuranceScopeWithMeta } from '@squaredash/crud/insurance-scope';
import * as insuranceScopeValidationRunService from '@squaredash/crud/insurance-scope-validation-run';
import { ValidationNotification } from '@squaredash/shared/models';

import { customerValidate } from './validators/customer';
import { generalInformationValidate } from './validators/general-information';
import { insuranceCarrierValidate } from './validators/insurance-carrier';
import { lineItemValidate } from './validators/line-item';
import { totalValidate } from './validators/total';

type ValidationRule = (
  insuranceScope: InsuranceScopeWithMeta
) => Promise<ValidationNotification[]>;

// todo: move it to the separate file.
const generalScope = generalInformationValidate;
const totalScope = totalValidate;
const lineItemScope = lineItemValidate;
const insuranceCarrierScope = insuranceCarrierValidate;
const customerScope = customerValidate;
const validationRulesMap = new Map<string, ValidationRule[]>([
  ['claimNumber', [generalScope]],
  ['typeOfLoss', [generalScope]],
  ['dateOfLoss', [generalScope]],
  ['dateInspected', [generalScope]],
  ['dateContacted', [generalScope]],
  ['dateReceived', [generalScope]],
  ['dateEntered', [generalScope]],
  ['policyNumber', [generalScope]],
  ['priceList', [generalScope]],
  ['totalLineItems', [totalScope]],
  ['totalTax', [totalScope]],
  ['totalRcv', [totalScope]],
  ['totalAcv', [totalScope]],
  ['totalOverhead', [lineItemScope]],
  ['totalDepreciation', [totalScope]],
  ['deductible', [totalScope]],
  ['netClaimSum', [totalScope]],
  ['totalRecoverableDepreciationSum', [totalScope]],
  ['totalNonRecoverableDepreciationSum', [totalScope]],
  ['netClaimIfDepreciationIsRecovered', [totalScope]],
  ['group', [totalScope, lineItemScope]],
  ['lineItem', [totalScope, lineItemScope]],
  ['insuranceCarrier', [insuranceCarrierScope]],
  ['adjuster', [insuranceCarrierScope]],
  ['customer', [customerScope]],
]);

export async function validate(
  insuranceScopeId: string,
  property?: string
): Promise<void> {
  const insuranceScope = await getInsuranceScopeById(insuranceScopeId);

  const response = await runValidation(insuranceScope, property);
  const notifications = flatNotifications(response);

  await storeInsuranceScopeValidationRun(insuranceScopeId, notifications);
}

// todo: need to migrate from PostgreSQL to Redis,
async function storeInsuranceScopeValidationRun(
  insuranceScopeId: string,
  notifications: ValidationNotification[],
  property?: string
): Promise<void> {
  if (property) {
    return updateInsuranceScopeValidationRun(insuranceScopeId, notifications);
  }

  await insuranceScopeValidationRunService.remove(insuranceScopeId);
  await createInsuranceScopeValidationRun(insuranceScopeId, notifications);
}

async function runValidation(
  insuranceScope: InsuranceScopeWithMeta,
  property?: string
): Promise<ValidationNotification[][]> {
  if (property) {
    const validationRules = validationRulesMap.get(property);
    return Promise.all(validationRules.map((rule) => rule(insuranceScope)));
  } else {
    return runValidationRules(insuranceScope);
  }
}

async function getInsuranceScopeById(insuranceScopeId: string) {
  return insuranceScopeService.findWithMeta({
    id: insuranceScopeId,
  });
}

async function runValidationRules(
  insuranceScope
): Promise<ValidationNotification[][]> {
  return Promise.all([
    generalInformationValidate(insuranceScope),
    customerValidate(insuranceScope),
    insuranceCarrierValidate(insuranceScope),
    lineItemValidate(insuranceScope),
    totalValidate(insuranceScope),
  ]);
}

function flatNotifications(
  data: ValidationNotification[][]
): ValidationNotification[] {
  return data.flat();
}

// todo: replace functionality with Map structure to optimize update process.
async function updateInsuranceScopeValidationRun(
  insuranceScopeId: string,
  notifications: ValidationNotification[]
): Promise<void> {
  const previousRun = await insuranceScopeValidationRunService.findMany({
    where: {
      insuranceScopeDraftId: insuranceScopeId,
    },
  });
  const previousNotifications = previousRun[0]
    .notifications as ValidationNotification[];
  const notUpdatedNotifications = previousNotifications.filter(
    (notification) =>
      !notifications.find(
        (n) => n.id === notification.id && n.property === notification.property
      )
  );
  notifications.push(...notUpdatedNotifications);
  await insuranceScopeValidationRunService.update(
    { id: previousRun[0].id },
    { notifications: notifications }
  );
}

async function createInsuranceScopeValidationRun(
  insuranceScopeId: string,
  notifications: ValidationNotification[]
): Promise<void> {
  await insuranceScopeValidationRunService.create({
    data: {
      insuranceScopeDraftId: insuranceScopeId,
      notifications: notifications,
    },
  });
}
