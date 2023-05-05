-- Rename column depreciation -> depreciationPercentage
ALTER TABLE "InsuranceScopeLineItemDraft" RENAME COLUMN "depreciation" TO "depreciationPercentage";

-- Rename column isDeprecationRefundable -> isDepreciationRefundable
ALTER TABLE "InsuranceScopeLineItemDraft" RENAME COLUMN "isDeprecationRefundable" TO "isDepreciationRefundable";
