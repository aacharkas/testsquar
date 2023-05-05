import React from 'react';

import { LAYOUT_ELEMENT_TYPE } from '../SideMenu/SideMenu';

export type Options = {
  id: number | string;
  name: string;
  icon?: React.ElementType;
  href: string;
  options?: Options[];
  type?: string | LAYOUT_ELEMENT_TYPE | null;
  hide?: boolean | null;
  style?: string;
};
