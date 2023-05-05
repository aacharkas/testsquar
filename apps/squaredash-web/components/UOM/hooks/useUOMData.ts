import { useMutation, useQuery } from '@apollo/client';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { captureSentryError } from '../../../../../libs/web/helpers/captureSentryError';
import { useDebounce } from '../../../../../libs/web/hooks/useDebounce';
import { localIssueText } from '../../Components/ErrorMessage';
import { GET_UOMS, UPDATE_UOM } from '../UOM.api';
import { CREATE_UOM, DELETE_UOM } from '../UOM.api';
import {
  DEFAULT_UOM,
  DEFAULT_UOM_FILTERS,
  ITEMS_PER_PAGE,
  UOM_ACTIONS,
} from '../UOM.constants';
import type {
  TDropdownItem,
  TFilters,
  TUOM,
  TUOMErrors,
  TUOMForm,
} from '../UOM.types';
import {
  checkUOMFormError,
  formatCreateData,
  formatEditData,
  formatGetData,
} from './useUOMData.helper';

const useUOMData = () => {
  const { t } = useTranslation(['system_errors']);
  const [UOMData, setUOMData] = useState(null);
  const [UOMCount, setUOMCount] = useState<number>(null);
  const [totalPages, setTotalPages] = useState<number>(null);
  const [search, setSearch] = useState<string>('');
  const [filters, setFilters] = useState<TFilters>(DEFAULT_UOM_FILTERS);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openWarningModal, setOpenWarningModal] = useState<boolean | string>(
    false
  );
  const [openCreateModal, setOpenCreateModal] = useState<boolean | string>(
    false
  );
  const [openCancelModal, setOpenCancelModal] = useState<boolean>(false);
  const [changedItem, setChangedItem] = useState<TUOM>(null);
  const [openMessage, setOpenMessage] = useState<boolean | string>(false);
  const [UOMForm, setUOMForm] = useState<TUOMForm>(DEFAULT_UOM);
  const [UOMFormErrors, setUOMFormErrors] = useState<TUOMErrors>({});
  const [createUOM, { loading: loadingCreate }] = useMutation(CREATE_UOM, {
    refetchQueries: ['GET_UOMS'],
  });
  const [updateUOM, { loading: loadingUpdate }] = useMutation(UPDATE_UOM, {
    refetchQueries: ['GET_UOMS'],
  });
  const [deleteUOM, { loading: loadingDelete }] = useMutation(DELETE_UOM, {
    refetchQueries: ['GET_UOMS'],
  });
  const { loading: loadingGet, data } = useQuery(GET_UOMS, {
    variables: {
      take: ITEMS_PER_PAGE,
      skip: filters.skip,
      search: filters.search,
    },
    fetchPolicy: 'cache-and-network',
  });

  const loading = (loadingGet && !UOMData?.length) || loadingDelete;
  const loadingCreateUpdate = loadingCreate || loadingUpdate;
  useEffect(() => {
    if (data) {
      const totalCount = data?.uoms?.totalCount;
      setUOMData(data?.uoms?.rows);
      setUOMCount(totalCount);
      setTotalPages(Math.ceil(totalCount / ITEMS_PER_PAGE));
    } else {
      setUOMData([]);
    }
  }, [data]);

  const searchUOMDebounce = useDebounce((value) => {
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
    if (search && search.length < 3) {
      return;
    }
    searchUOMDebounce(search);
  }, [search]);

  const handleActionOnTableItem = (
    item: TDropdownItem,
    uomItem?: TUOM
  ): void => {
    setChangedItem(uomItem);
    if (item.type === UOM_ACTIONS.EDIT) {
      handleOpenCreateEditModal(uomItem);
    } else if (item.type === UOM_ACTIONS.DELETE) {
      setOpenWarningModal(item?.id);
    }
  };

  const handleDeleteButton = async () => {
    const uuid = openWarningModal;
    try {
      if (uuid) {
        setOpenWarningModal(false);
        await deleteUOM({ variables: { uuid } });
        setOpenMessage(changedItem?.name);
      }
    } catch (error) {
      captureSentryError(error, {
        entityId: uuid,
      });
      setUOMFormErrors({
        deleteError: true,
        ...(error?.networkError?.message ?? {}),
      });
      console.log(error);
    }
  };

  const handleChange = (value, name: string) => {
    handleErrorFix(name);
    const updateInfo = {
      ...UOMForm,
      [name]: value,
    };
    setUOMForm(updateInfo);
  };

  const handleErrorFix = (name: string) => {
    if (UOMFormErrors?.[name]) {
      const { [name]: omitted, ...errors } = UOMFormErrors;
      setUOMFormErrors(errors);
    }
  };

  const checkUOMForm = (): boolean => {
    const errors = checkUOMFormError(UOMForm, localErrorText);
    setUOMFormErrors(errors);
    return !!Object.keys(errors).length;
  };

  const localErrorText = useCallback(
    (text: string, field: string): string =>
      localIssueText(text, t, { component: field }),
    [t]
  );

  const handleSubmitClick = async () => {
    let formattedRequest = {};
    try {
      if (!checkUOMForm()) {
        if (UOMForm?.id) {
          formattedRequest = formatEditData(changedItem, UOMForm);
          await updateUOM({
            variables: {
              input: { ...formattedRequest, id: UOMForm?.id },
              uuid: UOMForm?.id,
            },
          });
        } else {
          formattedRequest = formatCreateData(UOMForm);
          await createUOM({
            variables: { input: { ...formattedRequest } },
          });
        }

        setOpenCreateModal(false);
      }
    } catch (error) {
      captureSentryError(error, {
        entityId: UOMForm?.id,
        payload: formattedRequest,
      });
      const message = error?.networkError?.message;
      console.log('error', message);
      setUOMFormErrors(message);
    }
  };

  const handleOpenCreateEditModal = (item?: TUOM) => {
    if (item) {
      const formattedDatea = formatGetData(item);
      setUOMForm(formattedDatea);
    } else {
      setUOMForm(DEFAULT_UOM);
    }
    setOpenCreateModal(true);
  };

  const handleCancelButton = () => {
    setOpenCancelModal(false);
    setOpenCreateModal(false);
  };

  const handleCloseCancelModal = () => {
    setOpenCancelModal(false);
  };

  return {
    localState: {
      filters,
      search,
      openWarningModal,
      openCreateModal,
      openMessage,
      UOMForm,
      UOMFormErrors,
      currentPage,
      openCancelModal,
    },
    localActions: {
      setFilters,
      setSearch,
      setOpenWarningModal,
      setOpenCreateModal,
      setOpenMessage,
      searchUOMDebounce,
      setUOMFormErrors,
      setCurrentPage,
      setOpenCancelModal,
    },
    localErrorText,
    handlers: {
      handleChange,
      handleActionOnTableItem,
      handleSubmitClick,
      handleDeleteButton,
      handleOpenCreateEditModal,
      handleCancelButton,
      handleCloseCancelModal,
    },
    formattedData: {
      UOMData,
      UOMCount,
      totalPages,
      loading,
      loadingCreateUpdate,
    },
  };
};

export default useUOMData;
