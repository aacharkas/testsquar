import { useMutation, useQuery } from '@apollo/client';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { useDebounce } from '../../../../../libs/web/hooks/useDebounce';
import { ROUTES } from '../../../constants/routes';
import { GET_USER } from '../../Companies/CompanyProfile/CompanyProfile.api';
import { localIssueText } from '../../Components/ErrorMessage';
import { CHANGE_MEMBER_STATUS, GET_MEMBERS } from '../Members.api';
import {
  DEFAULT_MEMBERS_FILTERS,
  ITEMS_PER_PAGE,
  MEMBER_ACTIONS,
} from '../Members.constants';
import { Member, TFilters } from '../Members.types';
import { fillRoles, fillStatuses } from './useMembersData.helper';

const useMembersData = () => {
  const router = useRouter();
  const { t } = useTranslation(['system_errors']);

  const [filters, setFilters] = useState<TFilters>(DEFAULT_MEMBERS_FILTERS);
  const [search, setSearch] = useState<string>('');
  const [membersData, setMembersData] = useState(null);
  const [totalPages, setTotalPages] = useState<number>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const { loading: loadingUser, data: dataUser } = useQuery(GET_USER);
  const companyId = useMemo(
    () => dataUser && dataUser?.get_user?.companyId,
    [dataUser]
  );
  const userId = useMemo(() => dataUser && dataUser?.get_user?.id, [dataUser]);

  const roles = useMemo(() => fillRoles(filters.resRoles), [filters.resRoles]);
  const statuses = useMemo(
    () => fillStatuses(filters.resTechStatuses),
    [filters.resTechStatuses]
  );

  const { loading: loadingMembers, data } = useQuery(GET_MEMBERS, {
    variables: {
      roles: roles.join(','),
      statuses: statuses.join(','),
      sortOrder: filters.sortOrder,
      sortCol: 'name',
      take: ITEMS_PER_PAGE,
      skip: filters.skip,
      search: filters.search,
      companyId,
    },
    fetchPolicy: 'cache-and-network',
  });
  const [changeStatus, { loading: loadingChangeStatus }] = useMutation(
    CHANGE_MEMBER_STATUS,
    { refetchQueries: ['GET_MEMBERS'], awaitRefetchQueries: true }
  );

  const membersCount = useMemo(
    () => data?.members?.totalCount,
    [data?.members?.totalCount]
  );
  const loading =
    (loadingMembers && !membersData?.length) ||
    loadingUser ||
    loadingChangeStatus;

  useEffect(() => {
    if (data) {
      setMembersData(data.members.rows);
      setTotalPages(Math.ceil(data.members.totalCount / ITEMS_PER_PAGE));
    } else {
      setMembersData([]);
    }
  }, [data]);

  const handleOnClickRow = (item) => {
    setSelectedMember(item);
    setOpenModal(true);
  };

  const handleAction = async (item, selectedItem: Member) => {
    if (item?.actionId === MEMBER_ACTIONS.EDIT) {
      router.push(`/${ROUTES.MEMBER}?id=${item?.id}`);
    } else if (item?.actionId === MEMBER_ACTIONS.CHANGE_STATUS) {
      await changeStatus({
        variables: {
          input: item.id,
          uuid: item.id,
        },
      });
    } else if (item?.actionId === MEMBER_ACTIONS.VIEW) {
      handleOnMemberClick(selectedItem);
    } else {
      console.log('Type not found!');
    }
  };

  const handleOnMemberClick = (item) => {
    setSelectedMember(item);
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
    if (!search || search?.length > 2) searchMembersDebounce(search);
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
      membersData,
      membersCount,
      totalPages,
      currentPage,
      openModal,
      selectedMember,
    },
    localActions: {
      setSearch,
      setFilters,
      setCurrentPage,
      setOpenModal,
    },
    formattedData: {
      userId,
      loading,
      totalPages,
    },
    handlers: {
      handleOnClickRow,
      handleAction,
    },
    localErrorText,
  };
};

export { useMembersData };
