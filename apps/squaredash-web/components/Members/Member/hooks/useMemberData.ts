import { useMutation, useQuery } from '@apollo/client';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { captureSentryError } from '../../../../../../libs/web/helpers/captureSentryError';
import { useUnload } from '../../../../../../libs/web/hooks/useUnload';
import {
  PERMISSIONS,
  PERMISSION_ACTIONS,
} from '../../../../constants/permissions';
import { ROUTES } from '../../../../constants/routes';
import { useAbility } from '../../../../lib/ability';
import { localIssueText } from '../../../Components/ErrorMessage';
import { GET_USER } from '../../../Layout/Header/Header.api';
import {
  GET_MEMBER,
  INVITE_MEMBER,
  UPDATE_EMAIL,
  UPDATE_MEMBER,
} from '../MemberForm.api';
import {
  DEFAULT_MEMBER,
  ERROR_TEXT,
  MEMBER_FIELDS,
  ROLES,
} from '../MemberForm.constants';
import type { TMemberErrors, TMemberForm } from '../MemberForm.types';
import {
  checkMemberFormError,
  formatCreateData,
  formatGetData,
  formatUpdateData,
  processGoogleAddress,
} from './useMemberData.helper';

const useMemberData = () => {
  const router = useRouter();
  const { id } = router.query;
  const { t } = useTranslation(['members', 'system_errors']);
  const ability = useAbility();

  const editMode = useMemo(() => id !== 'new' && !!id, [id]);
  const rolesList = useMemo(
    () =>
      ROLES.filter((role) =>
        role?.permitAct && role?.permitUsr
          ? ability.can(role?.permitAct, role?.permitUsr)
          : true
      ),
    []
  );

  const [openCancelModal, setOpenCancelModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [memberForm, setMemberForm] = useState<TMemberForm>(DEFAULT_MEMBER);
  const [memberFormErrors, setMemberFormErrors] = useState<TMemberErrors>({});
  const [openEmailModal, setOpenEmailModal] = useState<boolean>(false);
  const [openMessage, setOpenMessage] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<boolean>(false);

  const { loading: loadingUser, data: currentUser } = useQuery(GET_USER, {
    fetchPolicy: 'cache-and-network',
  });
  const isCurrentUser = useMemo(
    () => currentUser?.get_user?.id == id,
    [currentUser, id]
  );
  const canChangeEmail = useMemo(
    () => ability.can(PERMISSION_ACTIONS.CHANGE, PERMISSIONS.USER_EMAIL),
    [ability]
  );
  const isAbleToSuspend = useMemo(
    () => ability.can(PERMISSION_ACTIONS.UPDATE, PERMISSIONS.USER_STATUS),
    [ability]
  );

  const pageTitle = useMemo(() => {
    if (isCurrentUser) return t('edit_account');
    else if (editMode) return t('edit_member');
    else return t('new_member');
  }, [editMode, isCurrentUser, t]);

  const [inviteMember, { loading: inviteLoading }] = useMutation(INVITE_MEMBER);
  const [updateMember, { loading: updateLoading }] = useMutation(
    UPDATE_MEMBER,
    {
      refetchQueries: ['GET_USER'],
      awaitRefetchQueries: true,
    }
  );
  const [updateEmail, { loading: updateEmailLoading }] =
    useMutation(UPDATE_EMAIL);

  const { loading: getLoading, data } = useQuery(GET_MEMBER, {
    skip: !editMode,
    variables: { uuid: id },
    fetchPolicy: 'cache-and-network',
  });
  const loading =
    loadingUser ||
    inviteLoading ||
    updateLoading ||
    getLoading ||
    updateEmailLoading;

  const { isOpenWarning, openNextRoute, removeNextRoute, setUpdateState } =
    useUnload(true);

  useEffect(() => {
    setMemberForm(formatGetData(data?.get_member));
  }, [data]);
  const emailValue = useMemo(() => data?.get_member?.email, [data]);
  const isEmailChangeLinkValid = useMemo(
    () => data?.get_member?.changeEmailRequest,
    [data]
  );
  const updatedEmail = useMemo(
    () => data?.get_member?.changeEmailRequest?.newEmail,
    [data]
  );

  const handleChange = (value, name: string) => {
    handleErrorFix(name);
    let updateInfo = {
      [name]: value,
    };
    if (name === MEMBER_FIELDS.ADDRESS) {
      updateInfo = {
        ...updateInfo,
        ...processGoogleAddress(value),
      };
    } else if (name === MEMBER_FIELDS.ADDRESS_NAME && !value) {
      updateInfo = {
        ...updateInfo,
        ...processGoogleAddress({}),
      };
    }
    setMemberForm((prevState) => ({ ...prevState, ...updateInfo }));
  };

  const handleUploadImages = (image) => {
    const updateInfo = {
      ...memberForm,
      [MEMBER_FIELDS.IMAGE_LINK]: image.link,
      [MEMBER_FIELDS.IMAGE]: image.id,
    };
    setMemberForm(updateInfo);
  };

  const handleErrorFix = (name: string) => {
    if (memberFormErrors?.[name]) {
      const { [name]: omitted, ...errors } = memberFormErrors;
      setMemberFormErrors(errors);
    }
  };

  const formatError = useCallback((name: string): string => {
    return `${ERROR_TEXT}${name}.`;
  }, []);

  const checkMemberForm = (): boolean => {
    const errors = checkMemberFormError(memberForm, formatError);
    setMemberFormErrors(errors);
    return !!Object.keys(errors).length;
  };

  const handleSubmitClick = async (formInfo) => {
    let formattedRequest = {};
    try {
      setUpdateState(false);
      if (editMode) {
        formattedRequest = formatUpdateData(memberForm);
        await updateMember({
          variables: { input: { ...formattedRequest, id }, uuid: id },
        });
      } else {
        formattedRequest = formatCreateData(memberForm);
        await inviteMember({
          variables: { input: { ...formattedRequest } },
        });
      }
      await router.push(`/${ROUTES.MEMBERS}`);
    } catch (error) {
      captureSentryError(error, {
        entityId: id,
        payload: formattedRequest,
      });
      setUpdateState(true);
      setMemberFormErrors(error?.networkError?.message);
    }
  };

  const handleCancelButton = () => {
    setUpdateState(false);
    if (isOpenWarning) openNextRoute();
    else router.back();
  };

  const handleCloseCancelModal = () => {
    setOpenCancelModal(false);
    if (isOpenWarning) removeNextRoute();
  };

  const handleInactivate = async () => {
    // TODO add inactivate
  };

  const handleDeleteButton = () => {
    setOpenDeleteModal(true);
  };

  const localErrorText = useCallback(
    (text: string, field: string, options?: object): string =>
      localIssueText(text, t, { component: field, ...options }),
    [t]
  );
  const handleEmailChange = async () => {
    let formattedRequest = {};
    try {
      setUpdateState(false);
      if (editMode) {
        formattedRequest = {
          [MEMBER_FIELDS.EMAIL]: memberForm?.[MEMBER_FIELDS.EMAIL],
        };
        await updateEmail({
          variables: { input: { ...formattedRequest, userId: id } },
        });
        setOpenEmailModal(false);
        setOpenCancelModal(false);
        setOpenMessage(true);
        setShowNotification(true);
      }
      // refetch();
    } catch (error) {
      captureSentryError(error, {
        entityId: id,
        payload: formattedRequest,
      });
      setUpdateState(true);
      setMemberFormErrors(error?.networkError?.message);
    }
  };
  const resendEmail = async () => {
    let input = {};
    try {
      if (showNotification) {
        const formattedRequest = {
          [MEMBER_FIELDS.EMAIL]: memberForm?.[MEMBER_FIELDS.EMAIL],
        };
        input = { ...formattedRequest, userId: id };
        await updateEmail({
          variables: { input },
        });
      } else {
        input = { email: updatedEmail, userId: id };
        await updateEmail({
          variables: { input },
        });
      }
    } catch (error) {
      captureSentryError(error, {
        payload: input,
      });
      setMemberFormErrors(error?.networkError?.message);
    }
  };
  return {
    localState: {
      openCancelModal: openCancelModal || isOpenWarning,
      openDeleteModal,
      openEmailModal,
      openMessage,
      showNotification,
    },
    localActions: {
      setOpenCancelModal,
      setOpenDeleteModal,
      setOpenEmailModal,
      setOpenMessage,
      setMemberForm,
    },
    handlers: {
      handleChange,
      handleSubmitClick,
      handleCancelButton,
      handleUploadImages,
      handleInactivate,
      handleDeleteButton,
      handleCloseCancelModal,
      handleEmailChange,
      resendEmail,
    },
    checkMemberForm,
    memberFormErrors,
    memberForm,
    localErrorText,
    formattedData: {
      pageTitle,
      editMode,
      isCurrentUser,
      loading,
      rolesList,
      isAbleToSuspend,
      emailValue,
      canChangeEmail,
      isEmailChangeLinkValid,
      updatedEmail,
    },
  };
};

export default useMemberData;
