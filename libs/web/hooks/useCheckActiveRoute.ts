import { useRouter } from 'next/router';
import { useMemo } from 'react';

interface IProps {
  path: string;
}
export const useCheckActiveRoute = ({ path }: IProps): boolean => {
  const { pathname } = useRouter();
  return useMemo(() => pathname.includes(path.slice(0, -1)), [pathname, path]);
};
