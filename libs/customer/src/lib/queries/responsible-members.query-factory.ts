import { Prisma } from '@prisma/client';

export const responsibleMembersQueryFactory = (
  customerId: string
) => Prisma.sql`
        SELECT "U"."id", "U"."name"
        FROM "CustomerUser"
        INNER JOIN "User" AS "U" ON "U"."id" = "CustomerUser"."userId"
        WHERE "CustomerUser"."customerId" = ${customerId} AND "U"."techStatus" = 'ACTIVE'
`;
