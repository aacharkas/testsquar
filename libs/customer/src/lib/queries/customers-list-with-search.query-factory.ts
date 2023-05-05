import { CUSTOMER_CATEGORY } from '@squaredash/shared/constants';

import { ListCustomerPayload } from '../models';

const customersListBaseQueryFactory = (searchOptions: ListCustomerPayload) => `
        SELECT DISTINCT ON ("C"."${searchOptions.sortCol}", "C"."id")
            "C"."id" AS "customer_id",
            "C"."displayName" AS "customer_displayName",
            "C"."phone" AS "customer_phone",
            "C"."email" AS "customer_email",
            "C"."billingName" AS "customer_billingName",
            "C"."billingAddressId" AS "customer_billingAddressId",
            "C"."shippingAddressId" AS "customer_shippingAddress_id",
            "C"."parentId" AS "customer_parentId",
            "C"."createdAt" AS "customer_createdAt",
            "C"."updatedAt" AS "customer_updatedAt",
            "A"."id" AS "billingAddress_id",
            "A"."placeId" AS "billingAddress_placeId",
            "A"."country" AS "billingAddress_country",
            "A"."state" AS "billingAddress_state",
            "A"."city" AS "billingAddress_city",
            "A"."zipCode" AS "billingAddress_zipCode",
            "A"."streetAddress1" AS "billingAddress_streetAddress1",
            "A"."streetAddress2" AS "billingAddress_streetAddress2",
            "A"."apartment" AS "billingAddress_apartment",
            "A"."formattedAddress" AS "billingAddress_formattedAddress",
            "A"."latitude" AS "billingAddress_latitude",
            "A"."longitude" AS "billingAddress_longitude",
            "A"."createdAt" AS "billingAddress_createdAt",
            "A"."techStatus" AS "billingAddress_techStatus",
            "ShippingAddress"."id" AS "shippingAddress_id",
            "ShippingAddress"."placeId" AS "shippingAddress_placeId",
            "ShippingAddress"."country" AS "shippingAddress_country",
            "ShippingAddress"."state" AS "shippingAddress_state",
            "ShippingAddress"."city" AS "shippingAddress_city",
            "ShippingAddress"."zipCode" AS "shippingAddress_zipCode",
            "ShippingAddress"."streetAddress1" AS "shippingAddress_streetAddress1",
            "ShippingAddress"."streetAddress2" AS "shippingAddress_streetAddress2",
            "ShippingAddress"."apartment" AS "shippingAddress_apartment",
            "ShippingAddress"."formattedAddress" AS "shippingAddress_formattedAddress",
            "ShippingAddress"."latitude" AS "shippingAddress_latitude",
            "ShippingAddress"."longitude" AS "shippingAddress_longitude",
            "ShippingAddress"."createdAt" AS "shippingAddress_createdAt",
            "ShippingAddress"."techStatus" AS "shippingAddress_techStatus"
        FROM "Customer" AS "C"
        JOIN "Address" "A" ON "C"."billingAddressId" = "A"."id"
        JOIN "Address" "ShippingAddress" ON "C"."shippingAddressId" = "ShippingAddress"."id"
        JOIN "CustomerUser" "CU" ON "C"."id" = "CU"."customerId"
        JOIN "User" "U" ON "CU"."userId" = "U"."id"
        ${
          searchOptions.parents
            ? 'JOIN "Customer" "P" ON "P"."id" = "C"."parentId"'
            : ''
        }
        WHERE ${
          searchOptions.search
            ? `(
          levenshtein(LOWER("C"."displayName"), LOWER($1)) <= 1 OR LOWER("C"."displayName") LIKE '%' || LOWER($1) || '%'
          OR levenshtein(LOWER("C"."email"), LOWER($1)) <= 1 OR LOWER("C"."email") LIKE '%' || LOWER($1) || '%'
          OR levenshtein(LOWER("ShippingAddress"."formattedAddress"), LOWER($1)) <= 1 OR LOWER("ShippingAddress"."formattedAddress") LIKE '%' || LOWER($1) || '%'
          OR levenshtein(regexp_replace(LOWER("C"."phone"), '[\\(|\\)|\\ |-]', '', 'g'), regexp_replace(LOWER($1), '[\\(|\\)|\\ |-]', '', 'g')) <= 1 OR regexp_replace(LOWER("C"."phone"), '[\\(|\\)|\\ |-]', '', 'g')  LIKE '%' || regexp_replace(LOWER($1), '[\\(|\\)|\\ |-]', '', 'g') || '%'
        ) AND`
            : ''
        } "C"."companyId" = $2
        ${
          searchOptions.category
            ? `AND "C"."parentId" IS ${
                searchOptions.category === CUSTOMER_CATEGORY.PARENT ? '' : 'NOT'
              } NULL`
            : ''
        }
        AND "C"."techStatus" != 'DELETED'
        ${searchOptions.parents ? `AND "P"."displayName" = ANY($6)` : ''}
        ${
          searchOptions.responsibleMembers
            ? `AND "U"."name" = ANY($5) AND "U"."techStatus" = 'ACTIVE'`
            : ''
        }
        ${
          searchOptions.userId
            ? `AND "U"."id" = '${searchOptions.userId}' AND "U"."techStatus" = 'ACTIVE'`
            : ''
        }
        ${searchOptions.type ? `AND "C"."type"::varchar = $7` : ''}
        ORDER BY "C"."${searchOptions.sortCol}" ${
  searchOptions.sortOrder
}, "C"."id" ASC
`;

export const customersListWithSearchQueryFactory = (
  searchOptions: ListCustomerPayload
) => `
        ${customersListBaseQueryFactory(searchOptions)}
        LIMIT $3 OFFSET $4
`;

export const customersListWithSearchCountQueryFactory = (
  searchOptions: ListCustomerPayload
) => `
  SELECT COUNT(*) as "count" FROM (${customersListBaseQueryFactory(
    searchOptions
  )}) AS "source";
`;
