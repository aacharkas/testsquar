import { useMutation, useQuery } from '@apollo/client';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useCallback, useMemo, useState } from 'react';

import { useUnload } from '../../../../../../../libs/web/hooks/useUnload';
import { localIssueText } from '../../../../Components/ErrorMessage';
import { ERROR_TEXT } from '../../../../Members/Member/MemberForm.constants';
import { GET_UOMS } from '../../../../UOM/UOM.api';
import { TLoadingData } from '../../ImportDetails.types';
import {
  CREATE_IMPORT_GROUP,
  CREATE_IMPORT_LINE_ITEM,
  DELETE_IMPORT_GROUP,
  DELETE_IMPORT_LINE_ITEM,
  UPDATE_IMPORT_GROUP,
  UPDATE_IMPORT_LINE_ITEM,
} from '../Items.api';
import {
  DEFAULT_GROUP,
  DEFAULT_GROUP_ITEM,
  GROUP_ACTIONS,
  GROUP_FIELDS,
} from '../Items.constants';
import { TGroupErrors, TGroupForm } from '../Items.types';
import {
  checkGroupFormError,
  checkGroupItemFormError,
  formatCreateGroupData,
  formatCreateGroupItemData,
  formatUnitsData,
} from './useImportItemsData.helper';

const useImportItemsData = () => {
  const router = useRouter();
  const { id } = router.query;
  const { t } = useTranslation(['imports', 'system_errors']);

  const [groupsFieldsLoading, setGroupsFieldsLoading] = useState<TLoadingData>(
    {}
  );
  const [itemsFieldsLoading, setItemsFieldsLoading] = useState<TLoadingData>(
    {}
  );

  const [createGroupModal, setCreateGroupModal] = useState<boolean>(false);
  const [deleteGroupModal, setDeleteGroupModal] = useState<boolean>(false);
  const [groupForm, setGroupForm] = useState<TGroupForm>(DEFAULT_GROUP);
  const [groupFormErrors, setGroupFormErrors] = useState<TGroupErrors>({});

  const [createGroupItemModal, setCreateGroupItemModal] =
    useState<boolean>(false);
  const [groupItemForm, setGroupItemForm] =
    useState<TGroupForm>(DEFAULT_GROUP_ITEM);
  const [groupItemFormErrors, setGroupItemFormErrors] = useState<TGroupErrors>(
    {}
  );

  const { loading: loadingGetUOMs, data: UOMS } = useQuery(GET_UOMS, {
    variables: {
      search: null,
    },
    fetchPolicy: 'cache-and-network',
  });

  const [createGroup, { loading: loadingGroupCreate }] = useMutation(
    CREATE_IMPORT_GROUP,
    {
      refetchQueries: ['GET_IMPORT_DETAILS'],
      awaitRefetchQueries: true,
    }
  );
  const [updateGroup, { loading: loadingGroupUpdate }] = useMutation(
    UPDATE_IMPORT_GROUP,
    {
      refetchQueries: ['GET_IMPORT_DETAILS'],
      awaitRefetchQueries: true,
    }
  );
  const [deleteGroup, { loading: loadingGroupDelete }] = useMutation(
    DELETE_IMPORT_GROUP,
    {
      refetchQueries: ['GET_IMPORT_DETAILS'],
      awaitRefetchQueries: true,
    }
  );

  const [createGroupItem, { loading: loadingGroupItemCreate }] = useMutation(
    CREATE_IMPORT_LINE_ITEM,
    {
      refetchQueries: ['GET_IMPORT_DETAILS'],
      awaitRefetchQueries: true,
    }
  );
  const [updateGroupItem, { loading: loadingGroupItemUpdate }] = useMutation(
    UPDATE_IMPORT_LINE_ITEM,
    {
      refetchQueries: ['GET_IMPORT_DETAILS'],
      awaitRefetchQueries: true,
    }
  );
  const [deleteGroupItem, { loading: loadingGroupItemDelete }] = useMutation(
    DELETE_IMPORT_LINE_ITEM,
    {
      refetchQueries: ['GET_IMPORT_DETAILS'],
      awaitRefetchQueries: true,
    }
  );
  const [showFields, setShowFields] = useState(false);

  const loading =
    loadingGroupUpdate || loadingGroupItemDelete || loadingGetUOMs;
  const modalLoading =
    loadingGroupCreate || loadingGroupDelete || loadingGroupItemCreate;

  const unitsData = useMemo(() => formatUnitsData(UOMS?.uoms?.rows), [UOMS]);

  const handleErrorGroupFix = (name: string) => {
    if (groupFormErrors?.[name]) {
      const { [name]: omitted, ...errors } = groupFormErrors;
      setGroupFormErrors(errors);
    }
  };

  const handleErrorGroupItemFix = (name: string) => {
    if (groupItemFormErrors?.[name]) {
      const { [name]: omitted, ...errors } = groupItemFormErrors;
      setGroupItemFormErrors(errors);
    }
  };

  const formatError = useCallback((name: string): string => {
    return `${ERROR_TEXT}${name}.`;
  }, []);

  const localErrorText = useCallback(
    (text: string, field: string, options?: object): string =>
      localIssueText(text, t, { component: field, ...options }),
    [t]
  );

  const checkGroupForm = (): boolean => {
    const errors = checkGroupFormError(groupForm, formatError);
    setGroupFormErrors(errors);
    return !!Object.keys(errors).length;
  };

  const checkGroupItemForm = (isFieldsNeeded = false): boolean => {
    const errors = checkGroupItemFormError(
      groupItemForm,
      formatError,
      isFieldsNeeded
    );
    setGroupItemFormErrors(errors);
    return !!Object.keys(errors).length;
  };

  const handleChangeGroupForm = (value, name: string) => {
    handleErrorGroupFix(name);
    const updateInfo = {
      [name]: value,
    };
    setGroupForm((prevState) => ({ ...prevState, ...updateInfo }));
  };

  const handleChangeGroupItemForm = (value, name: string) => {
    handleErrorGroupItemFix(name);
    const updateInfo = {
      [name]: value,
    };
    setGroupItemForm((prevState) => ({ ...prevState, ...updateInfo }));
  };

  const closeCreateGroupModal = () => {
    setGroupForm(DEFAULT_GROUP);
    setGroupFormErrors({});
    setCreateGroupModal(false);
  };

  const closeCreateGroupItemModal = () => {
    setGroupItemForm(DEFAULT_GROUP_ITEM);
    setGroupItemFormErrors({});
    setCreateGroupItemModal(false);
  };

  const handleCreateGroup = async () => {
    try {
      if (!checkGroupForm()) {
        const formattedRequest = formatCreateGroupData(groupForm);
        await createGroup({
          variables: { input: { ...formattedRequest }, scopeId: id },
        });
        closeCreateGroupModal();
        setGroupForm(DEFAULT_GROUP);
      }
    } catch (error) {
      setGroupFormErrors(error?.networkError?.message);
    }
  };

  const handleCreateGroupItem = async (isFieldsNeeded = false) => {
    try {
      if (!checkGroupItemForm(isFieldsNeeded)) {
        const groupId = groupForm[GROUP_FIELDS.GROUP_PARENT_ID];
        const formattedRequest = formatCreateGroupItemData(
          groupItemForm,
          isFieldsNeeded
        );
        await createGroupItem({
          variables: {
            input: { ...formattedRequest },
            scopeId: id,
            groupId: groupId,
          },
        });
        closeCreateGroupItemModal();
        setGroupItemForm(DEFAULT_GROUP_ITEM);
        setShowFields(false);
      }
    } catch (error) {
      setGroupItemFormErrors(error?.networkError?.message);
    }
  };

  const handleDeleteGroup = async () => {
    try {
      const groupId = groupForm[GROUP_FIELDS.GROUP_PARENT_ID];
      await deleteGroup({ variables: { uuid: groupId, scopeId: id } });
      setDeleteGroupModal(false);
    } catch (error) {
      setGroupFormErrors(error?.networkError?.message);
    }
  };

  const handleDeleteGroupItem = async (
    groupId: string,
    groupItemId: string
  ) => {
    try {
      await deleteGroupItem({
        variables: { groupId: groupId, scopeId: id, uuid: groupItemId },
      });
    } catch (error) {
      setGroupItemFormErrors(error?.networkError?.message);
    }
  };

  const handleChangeGroupData = async (
    value,
    name: string,
    isPrice: boolean,
    isDate: boolean,
    groupId: string
  ) => {
    if (isPrice && !!value) {
      value = Number(value.replace(/[,]+/g, ''));
    }
    setGroupsFieldsLoading({
      ...groupsFieldsLoading,
      [name]: true,
      id: groupId,
    });
    await updateGroup({
      variables: {
        input: { [name]: value },
        uuid: groupId,
        scopeId: id,
      },
    });
    setGroupsFieldsLoading({
      ...groupsFieldsLoading,
      [name]: false,
    });
  };

  const handleChangeGroupItemData = async (
    value,
    name: string,
    isPrice: boolean,
    isDate: boolean,
    groupId: string,
    groupItemId: string
  ) => {
    if (isPrice && !!value) {
      value = Number(value.replace(/[,]+/g, ''));
    }
    setItemsFieldsLoading({
      ...itemsFieldsLoading,
      [name]: true,
      id: groupItemId,
    });
    await updateGroupItem({
      variables: {
        input: { [name]: value },
        uuid: groupItemId,
        groupId: groupId,
        scopeId: id,
      },
    });
    setItemsFieldsLoading({
      ...itemsFieldsLoading,
      [name]: false,
    });
  };

  const handleAction = async (item, parentId?: string) => {
    if (parentId) {
      setGroupForm({
        ...groupForm,
        [GROUP_FIELDS.GROUP_PARENT_ID]: parentId,
      });
    }
    if (item?.actionId === GROUP_ACTIONS.ADD_GROUP) {
      setCreateGroupModal(true);
    } else if (item?.actionId === GROUP_ACTIONS.ADD_ITEM) {
      setCreateGroupItemModal(true);
    } else if (item?.actionId === GROUP_ACTIONS.DELETE_GROUP) {
      setDeleteGroupModal(true);
    } else {
      console.log('Type not found!');
    }
  };

  return {
    localState: {
      createGroupModal,
      createGroupItemModal,
      deleteGroupModal,
      showFields,
    },
    localActions: {
      handleAction,
      closeCreateGroupModal,
      closeCreateGroupItemModal,
      setDeleteGroupModal,
      setShowFields,
      setCreateGroupItemModal,
      setGroupItemForm,
    },
    formattedData: {
      loading,
      modalLoading,
      groupsFieldsLoading,
      itemsFieldsLoading,
    },
    handlers: {
      handleChangeGroupForm,
      handleCreateGroup,
      handleChangeGroupData,
      handleDeleteGroup,
      handleChangeGroupItemForm,
      handleCreateGroupItem,
      handleChangeGroupItemData,
      handleDeleteGroupItem,
    },
    unitsData,
    groupForm,
    groupFormErrors,
    groupItemForm,
    groupItemFormErrors,
    localErrorText,
  };
};

export default useImportItemsData;
