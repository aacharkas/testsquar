import type { ReactNode } from 'react';

export type Tab = {
  name: string;
  id: string;
  children?: ReactNode;
};
