import { useMutation, useQuery } from '@apollo/client';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { captureSentryError } from '../../../../../libs/web/helpers/captureSentryError';
import { useDebounce } from '../../../../../libs/web/hooks/useDebounce';
import { ROUTES } from '../../../constants/routes';
import { localIssueText } from '../../Components/ErrorMessage';
import { GET_USER } from '../../Layout/Header/Header.api';
import { DELETE_ADMIN, GET_ADMINS } from '../Admins.api';
import {
  ADMIN_ACTIONS,
  DEFAULT_ADMINS_FILTERS,
  ITEMS_PER_PAGE,
} from '../Admins.constants';
import { Admin, TFilters } from '../Admins.types';

const useAdminsData = () => {
  const router = useRouter();
  const { t } = useTranslation(['system_errors']);
  const [filters, setFilters] = useState<TFilters>(DEFAULT_ADMINS_FILTERS);
  const [search, setSearch] = useState<string>('');
  const [adminsData, setAdminsData] = useState(null);
  const [totalPages, setTotalPages] = useState<number>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);

  const { data: currentUser } = useQuery(GET_USER);
  const { loading: loadingAdmins, data } = useQuery(GET_ADMINS, {
    variables: {
      sortOrder: filters.sortOrder,
      sortCol: 'name',
      take: ITEMS_PER_PAGE,
      skip: filters.skip,
      search: filters.search,
    },
    fetchPolicy: 'cache-and-network',
  });
  const [deleteAdmin, { loading: deleteAdminLoading }] = useMutation(
    DELETE_ADMIN,
    { refetchQueries: ['GET_ADMINS'] }
  );

  const adminsCount = useMemo(
    () => data?.admins?.totalCount,
    [data?.admins?.totalCount]
  );

  const loading = (loadingAdmins && !adminsData?.length) || deleteAdminLoading;
  useEffect(() => {
    if (data) {
      setAdminsData(data.admins.rows);
      setTotalPages(Math.ceil(data.admins.totalCount / ITEMS_PER_PAGE));
    } else {
      setAdminsData([]);
    }
  }, [data]);

  const handleOnClickRow = (item) => {
    setSelectedAdmin(item);
    setOpenModal(true);
  };

  const handleAction = async (item, selectedItem: Admin) => {
    if (item?.actionId === ADMIN_ACTIONS.EDIT) {
      router.push(`/${ROUTES.MEMBER}?id=${item?.id}`);
    } else if (item?.actionId === ADMIN_ACTIONS.VIEW) {
      handleOnAdminClick(selectedItem);
    } else if (item?.actionId === ADMIN_ACTIONS.DELETE) {
      try {
        await deleteAdmin({ variables: { uuid: item?.id } });
      } catch (error) {
        captureSentryError(error, {
          entityId: item?.id,
        });
        console.log(error);
      }
    } else {
      console.log('Type not found!');
    }
  };

  const handleOnAdminClick = (item) => {
    setSelectedAdmin(item);
    setOpenModal(true);
  };

  const searchMembersDebounce = useDebounce((value) => {
    if (!value) {
      setFilters({
        ...filters,
        search: value,
        skip: (currentPage - 1) * ITEMS_PER_PAGE,
      });
    } else {
      setFilters({ ...filters, search: value, skip: 0 });
    }
  });

  useEffect(() => {
    searchMembersDebounce(search);
  }, [search]);

  const localErrorText = useCallback(
    (text: string, field: string): string =>
      localIssueText(text, t, { component: field }),
    [t]
  );

  return {
    localState: {
      search,
      filters,
      adminsData,
      adminsCount,
      totalPages,
      currentPage,
      openModal,
      selectedAdmin,
    },
    localActions: {
      setSearch,
      setFilters,
      setCurrentPage,
      setOpenModal,
    },
    formattedData: {
      currentUserId: currentUser?.get_user?.id,
      loading,
      totalPages,
      localErrorText,
    },
    handlers: {
      handleOnClickRow,
      handleAction,
    },
  };
};

export { useAdminsData };
