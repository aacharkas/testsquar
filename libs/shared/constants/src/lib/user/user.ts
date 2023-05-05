import { User as UserEntity } from '@prisma/client';

export type User = Omit<UserEntity, 'password' | 'techStatus'>;
