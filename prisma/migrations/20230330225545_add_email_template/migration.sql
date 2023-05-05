INSERT INTO public."EmailTemplate" ("id", "templateId", "name", "defaultSubject", "defaultBody", "customFields",
                                    "defaultButtonText", "updatedAt")
VALUES ('43fe6f4c-fd92-40b6-a2e6-7a0ffc6f00c9',
        'd-092ee5c7cac9407aad8468bbe1579268',
        'Payment schedule',
        e 'New payment schedule from {{displayName}}',
        e 'You have received a new payment schedule from {{displayName}}.\n With Squaredash Payments, you can view the certificate of completion, confirm job completion, and pay by ACH all in one place.',
        e '{
           "groups": [
               {
                   "id": 1,
                   "name": "Customers",
                   "items": [
                       {
                           "displayName": "Display name",
                           "field": "{{customerDispalyName}}"
                       },
                       {
                           "displayName": "Contact first and last name",
                           "field": "{{customerContactFirstAndLastName}}"
                       },
                       {
                           "displayName": "Email",
                           "field": "{{customerEmail}}"
                       },
                       {
                           "displayName": "Billing Address",
                           "field": "{{customerBillingAddressCountry}}{{customerBillingAddressState}}{{customerBillingAddressCity}}{{customerBillingAddressAddressStreet1}}{{customerBillingAddressZipCode}}"
                       },
                       {
                           "displayName": "Shipping Address",
                           "field": "{{customerShippingAddressCountry}}{{customerShippingAddressState}}{{customerShippingAddressCity}}{{customerShippingAddressAddressStreet1}}{{customerShippingAddressZipCode}}"
                       }
                   ]
               },
               {
                   "id": 2,
                   "name": "Company",
                   "items": [
                       {
                           "displayName": "Display Name",
                           "field": "{{companyDispalyName}}"
                       },
                       {
                           "displayName": "Legal name",
                           "field": "{{companyLegalName}}"
                       },
                       {
                           "displayName": "Billing Address",
                           "field": "{{companyBillingAddressCountry}}{{companyBillingAddressState}}{{ccompanyBillingAddressCity}}{{companyBillingAddressAddressStreet1}}{{companyBillingAddressZipCode}}"
                       },
                       {
                           "displayName": "Shipping Address",
                           "field": "{{companyShippingAddressCountry}}{{companyShippingAddressState}}{{companyShippingAddressCity}}{{companyShippingAddressAddressStreet1}}{{companyShippingAddressZipCode}}"
                       }
                   ]
               },
               {
                   "id": 3,
                   "name": "Payment information",
                   "items": [
                       {
                           "displayName": "Due Date",
                           "field": "{{paymentDueDate}}"
                       },
                       {
                           "displayName": "Due balance",
                           "field": "{{paymentDueBalance}}"
                       },
                       {
                           "displayName": "Deductible",
                           "field": "{{paymentDeductible}}"
                       },
                       {
                           "displayName": "First check",
                           "field": "{{paymentFirstCheck}}"
                       },
                       {
                           "displayName": "Upgrades",
                           "field": "{{paymentUpgrades}}"
                       },
                       {
                           "displayName": "Final check",
                           "field": "{{paymentFinalCheck}}"
                       },

                       {
                           "displayName": "Insurance scope number/Claim number",
                           "field": "{{paymentInsuranceScopeNumber}}{{paymentClaimNumber}}"
                       }
                   ]
               }
           ]
         }',
        'View payment schedule',
        current_timestamp);

INSERT INTO public."EmailTemplate" ("id", "templateId", "name", "defaultSubject", "defaultBody", "customFields",
                                    "defaultButtonText", "updatedAt")
VALUES ('f952ddb0-3166-48d0-8e44-fcfa4b4eecd0',
        'd-20c1caa99c28460ba6243b517e24583e',
        'Work completion',
        e 'Work completion notification from {{displayName}}',
        e 'You have received a new work completion notification from {{displayName}}.\n Please review and approve.',
        e '{
                         "groups": [
                             {
                                 "id": 1,
                                 "name": "Customers",
                                 "items": [
                                     {
                                         "displayName": "Display name",
                                         "field": "{{customerDispalyName}}"
                                     },
                                     {
                                         "displayName": "Contact first and last name",
                                         "field": "{{customerContactFirstAndLastName}}"
                                     },
                                     {
                                         "displayName": "Email",
                                         "field": "{{customerEmail}}"
                                     },
                                     {
                                         "displayName": "Billing Address",
                                         "field": "{{customerBillingAddressCountry}}{{customerBillingAddressState}}{{customerBillingAddressCity}}{{customerBillingAddressAddressStreet1}}{{customerBillingAddressZipCode}}"
                                     },
                                     {
                                         "displayName": "Shipping Address",
                                         "field": "{{customerShippingAddressCountry}}{{customerShippingAddressState}}{{customerShippingAddressCity}}{{customerShippingAddressAddressStreet1}}{{customerShippingAddressZipCode}}"
                                     }
                                 ]
                             },
                             {
                                 "id": 2,
                                 "name": "Company",
                                 "items": [
                                     {
                                         "displayName": "Display Name",
                                         "field": "{{companyDispalyName}}"
                                     },
                                     {
                                         "displayName": "Legal name",
                                         "field": "{{companyLegalName}}"
                                     },
                                     {
                                         "displayName": "Billing Address",
                                         "field": "{{companyBillingAddressCountry}}{{companyBillingAddressState}}{{ccompanyBillingAddressCity}}{{companyBillingAddressAddressStreet1}}{{companyBillingAddressZipCode}}"
                                     },
                                     {
                                         "displayName": "Shipping Address",
                                         "field": "{{companyShippingAddressCountry}}{{companyShippingAddressState}}{{companyShippingAddressCity}}{{companyShippingAddressAddressStreet1}}{{companyShippingAddressZipCode}}"
                                     }
                                 ]
                             },
                             {
                                 "id": 3,
                                 "name": "Payment information",
                                 "items": [
                                     {
                                         "displayName": "Due Date",
                                         "field": "{{paymentDueDate}}"
                                     },
                                     {
                                         "displayName": "Due balance",
                                         "field": "{{paymentDueBalance}}"
                                     },
                                     {
                                         "displayName": "Deductible",
                                         "field": "{{paymentDeductible}}"
                                     },
                                     {
                                         "displayName": "First check",
                                         "field": "{{paymentFirstCheck}}"
                                     },
                                     {
                                         "displayName": "Upgrades",
                                         "field": "{{paymentUpgrades}}"
                                     },
                                     {
                                         "displayName": "Final check",
                                         "field": "{{paymentFinalCheck}}"
                                     },

                                     {
                                         "displayName": "Insurance scope number/Claim number",
                                         "field": "{{paymentInsuranceScopeNumber}}{{paymentClaimNumber}}"
                                     }
                                 ]
                             }
                         ]
                     }',
        'Review',
        current_timestamp);

INSERT INTO public."EmailTemplate" ("id", "templateId", "name", "defaultSubject", "defaultBody", "customFields",
                                    "defaultButtonText", "updatedAt")
VALUES ('d7b8ca93-5a06-4242-8a01-fc37b782f7f6',
        'd-5fd026755e4f41e89a36b8c26eec0e56',
        'Certificate of completion',
        e 'Certificate of completion from {{displayName}}',
        e 'You have received a certificate of completion from {{displayName}}.',
        e '{
                         "groups": [
                             {
                                 "id": 1,
                                 "name": "Customers",
                                 "items": [
                                     {
                                         "displayName": "Display name",
                                         "field": "{{customerDispalyName}}"
                                     },
                                     {
                                         "displayName": "Contact first and last name",
                                         "field": "{{customerContactFirstAndLastName}}"
                                     },
                                     {
                                         "displayName": "Email",
                                         "field": "{{customerEmail}}"
                                     },
                                     {
                                         "displayName": "Billing Address",
                                         "field": "{{customerBillingAddressCountry}}{{customerBillingAddressState}}{{customerBillingAddressCity}}{{customerBillingAddressAddressStreet1}}{{customerBillingAddressZipCode}}"
                                     },
                                     {
                                         "displayName": "Shipping Address",
                                         "field": "{{customerShippingAddressCountry}}{{customerShippingAddressState}}{{customerShippingAddressCity}}{{customerShippingAddressAddressStreet1}}{{customerShippingAddressZipCode}}"
                                     }
                                 ]
                             },
                             {
                                 "id": 2,
                                 "name": "Company",
                                 "items": [
                                     {
                                         "displayName": "Display Name",
                                         "field": "{{companyDispalyName}}"
                                     },
                                     {
                                         "displayName": "Legal name",
                                         "field": "{{companyLegalName}}"
                                     },
                                     {
                                         "displayName": "Billing Address",
                                         "field": "{{companyBillingAddressCountry}}{{companyBillingAddressState}}{{ccompanyBillingAddressCity}}{{companyBillingAddressAddressStreet1}}{{companyBillingAddressZipCode}}"
                                     },
                                     {
                                         "displayName": "Shipping Address",
                                         "field": "{{companyShippingAddressCountry}}{{companyShippingAddressState}}{{companyShippingAddressCity}}{{companyShippingAddressAddressStreet1}}{{companyShippingAddressZipCode}}"
                                     }
                                 ]
                             },
                             {
                                 "id": 3,
                                 "name": "Payment information",
                                 "items": [
                                     {
                                         "displayName": "Due Date",
                                         "field": "{{paymentDueDate}}"
                                     },
                                     {
                                         "displayName": "Due balance",
                                         "field": "{{paymentDueBalance}}"
                                     },
                                     {
                                         "displayName": "Deductible",
                                         "field": "{{paymentDeductible}}"
                                     },
                                     {
                                         "displayName": "First check",
                                         "field": "{{paymentFirstCheck}}"
                                     },
                                     {
                                         "displayName": "Upgrades",
                                         "field": "{{paymentUpgrades}}"
                                     },
                                     {
                                         "displayName": "Final check",
                                         "field": "{{paymentFinalCheck}}"
                                     },

                                     {
                                         "displayName": "Insurance scope number/Claim number",
                                         "field": "{{paymentInsuranceScopeNumber}}{{paymentClaimNumber}}"
                                     }
                                 ]
                             }
                         ]
                     }',
        '',
        current_timestamp);

INSERT INTO public."EmailTemplate" ("id", "templateId", "name", "defaultSubject", "defaultBody", "customFields",
                                    "defaultButtonText", "updatedAt")
VALUES ('45586f2a-220f-40b5-9513-3b535a98f1aa',
        'd-a73e74b16f6c484094593e364be4d7db',
        'Release of undisputed funds',
        e 'Release of undisputed funds for {{claimNumber}}',
        e 'You have received a release of undisputed funds from {{displayName}} for the claim number {{claimNumber}}.',
        e '{
                         "groups": [
                             {
                                 "id": 1,
                                 "name": "Customers",
                                 "items": [
                                     {
                                         "displayName": "Display name",
                                         "field": "{{customerDispalyName}}"
                                     },
                                     {
                                         "displayName": "Contact first and last name",
                                         "field": "{{customerContactFirstAndLastName}}"
                                     },
                                     {
                                         "displayName": "Email",
                                         "field": "{{customerEmail}}"
                                     },
                                     {
                                         "displayName": "Billing Address",
                                         "field": "{{customerBillingAddressCountry}}{{customerBillingAddressState}}{{customerBillingAddressCity}}{{customerBillingAddressAddressStreet1}}{{customerBillingAddressZipCode}}"
                                     },
                                     {
                                         "displayName": "Shipping Address",
                                         "field": "{{customerShippingAddressCountry}}{{customerShippingAddressState}}{{customerShippingAddressCity}}{{customerShippingAddressAddressStreet1}}{{customerShippingAddressZipCode}}"
                                     }
                                 ]
                             },
                             {
                                 "id": 2,
                                 "name": "Company",
                                 "items": [
                                     {
                                         "displayName": "Display Name",
                                         "field": "{{companyDispalyName}}"
                                     },
                                     {
                                         "displayName": "Legal name",
                                         "field": "{{companyLegalName}}"
                                     },
                                     {
                                         "displayName": "Billing Address",
                                         "field": "{{companyBillingAddressCountry}}{{companyBillingAddressState}}{{ccompanyBillingAddressCity}}{{companyBillingAddressAddressStreet1}}{{companyBillingAddressZipCode}}"
                                     },
                                     {
                                         "displayName": "Shipping Address",
                                         "field": "{{companyShippingAddressCountry}}{{companyShippingAddressState}}{{companyShippingAddressCity}}{{companyShippingAddressAddressStreet1}}{{companyShippingAddressZipCode}}"
                                     }
                                 ]
                             },
                             {
                                 "id": 3,
                                 "name": "Payment information",
                                 "items": [
                                     {
                                         "displayName": "Due Date",
                                         "field": "{{paymentDueDate}}"
                                     },
                                     {
                                         "displayName": "Due balance",
                                         "field": "{{paymentDueBalance}}"
                                     },
                                     {
                                         "displayName": "Deductible",
                                         "field": "{{paymentDeductible}}"
                                     },
                                     {
                                         "displayName": "First check",
                                         "field": "{{paymentFirstCheck}}"
                                     },
                                     {
                                         "displayName": "Upgrades",
                                         "field": "{{paymentUpgrades}}"
                                     },
                                     {
                                         "displayName": "Final check",
                                         "field": "{{paymentFinalCheck}}"
                                     },

                                     {
                                         "displayName": "Insurance scope number/Claim number",
                                         "field": "{{paymentInsuranceScopeNumber}}{{paymentClaimNumber}}"
                                     }
                                 ]
                             }
                         ]
                     }',
        '',
        current_timestamp);

INSERT INTO public."EmailTemplate" ("id", "templateId", "name", "defaultSubject", "defaultBody", "customFields",
                                    "defaultButtonText", "updatedAt")
VALUES ('6c259f98-6e31-4e10-a48a-8b4a704f62fc',
        'd-4aeb3c17b12b4ec292581797734ce248',
        'Payment reminder',
        e 'Reminder to pay to {{displayName}}',
        e 'This is a friendly reminder to provide payment for the claim number {{claimNumber}}.',
        e '{
                         "groups": [
                             {
                                 "id": 1,
                                 "name": "Customers",
                                 "items": [
                                     {
                                         "displayName": "Display name",
                                         "field": "{{customerDispalyName}}"
                                     },
                                     {
                                         "displayName": "Contact first and last name",
                                         "field": "{{customerContactFirstAndLastName}}"
                                     },
                                     {
                                         "displayName": "Email",
                                         "field": "{{customerEmail}}"
                                     },
                                     {
                                         "displayName": "Billing Address",
                                         "field": "{{customerBillingAddressCountry}}{{customerBillingAddressState}}{{customerBillingAddressCity}}{{customerBillingAddressAddressStreet1}}{{customerBillingAddressZipCode}}"
                                     },
                                     {
                                         "displayName": "Shipping Address",
                                         "field": "{{customerShippingAddressCountry}}{{customerShippingAddressState}}{{customerShippingAddressCity}}{{customerShippingAddressAddressStreet1}}{{customerShippingAddressZipCode}}"
                                     }
                                 ]
                             },
                             {
                                 "id": 2,
                                 "name": "Company",
                                 "items": [
                                     {
                                         "displayName": "Display Name",
                                         "field": "{{companyDispalyName}}"
                                     },
                                     {
                                         "displayName": "Legal name",
                                         "field": "{{companyLegalName}}"
                                     },
                                     {
                                         "displayName": "Billing Address",
                                         "field": "{{companyBillingAddressCountry}}{{companyBillingAddressState}}{{ccompanyBillingAddressCity}}{{companyBillingAddressAddressStreet1}}{{companyBillingAddressZipCode}}"
                                     },
                                     {
                                         "displayName": "Shipping Address",
                                         "field": "{{companyShippingAddressCountry}}{{companyShippingAddressState}}{{companyShippingAddressCity}}{{companyShippingAddressAddressStreet1}}{{companyShippingAddressZipCode}}"
                                     }
                                 ]
                             },
                             {
                                 "id": 3,
                                 "name": "Payment information",
                                 "items": [
                                     {
                                         "displayName": "Due Date",
                                         "field": "{{paymentDueDate}}"
                                     },
                                     {
                                         "displayName": "Due balance",
                                         "field": "{{paymentDueBalance}}"
                                     },
                                     {
                                         "displayName": "Deductible",
                                         "field": "{{paymentDeductible}}"
                                     },
                                     {
                                         "displayName": "First check",
                                         "field": "{{paymentFirstCheck}}"
                                     },
                                     {
                                         "displayName": "Upgrades",
                                         "field": "{{paymentUpgrades}}"
                                     },
                                     {
                                         "displayName": "Final check",
                                         "field": "{{paymentFinalCheck}}"
                                     },

                                     {
                                         "displayName": "Insurance scope number/Claim number",
                                         "field": "{{paymentInsuranceScopeNumber}}{{paymentClaimNumber}}"
                                     }
                                 ]
                             }
                         ]
                     }',
        'Pay',
        current_timestamp);

UPDATE public."EmailTemplate" SET "defaultBody" = e'You have received a new payment schedule from {{displayName}}.
                     With SquareDash Payments, you can view the details of your job, confirm job completion, and pay by your bill all in one place.'
                    WHERE id LIKE '43fe6f4c-fd92-40b6-a2e6-7a0ffc6f00c9' ESCAPE '#'

UPDATE public."EmailTemplate" SET "defaultBody" = e'Please see attached for the release of undisputed funds from {{displayName}} for the claim number {{claimNumber}}.

                     All work has been substantially completed, and we request you release the undisputed recoverable depreciation to the insured.

                     There may be supplements still pending.' WHERE id LIKE '45586f2a-220f-40b5-9513-3b535a98f1aa' ESCAPE '#'

UPDATE public."EmailTemplate" SET "defaultBody" = e'Please see attached for the certificate of completion from {{displayName}} for claim number {{claimNumber}}.
                     All work has been substantially completed. Please release all non-recoverable depreciation to the insured. ' WHERE id LIKE 'd7b8ca93-5a06-4242-8a01-fc37b782f7f6' ESCAPE '#'
