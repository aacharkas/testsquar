import { useMutation, useQuery } from '@apollo/client';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import { ROUTES } from '../../../../../../apps/squaredash-web/constants/routes';
import { captureSentryError } from '../../../../../../libs/web/helpers/captureSentryError';
import { useUnload } from '../../../../../../libs/web/hooks/useUnload';
import { localIssueText } from '../../../Components/ErrorMessage';
import {
  DEFAULT_TEMPLATE,
  TEMPLATE_FIELDS,
} from '../../EmailTemplates.constants';
import { getTemplateData } from '../../EmailTemplates.helper';
import { TEMPLATE_GET, TEMPLATE_UPSERT } from '../EmailTemplateForm.api';
import { ERROR_TEXT } from '../EmailTemplateForm.constants';
import type {
  TTemplateErrors,
  TTemplateForm,
} from '../EmailTemplateForm.types';
import {
  checkTemplateFormError,
  formatEditData,
} from './useEmailTemplateData.helper';

const useEmailTemplateData = () => {
  const router = useRouter();
  const { id } = router.query;
  const { t } = useTranslation(['email_templates', 'system_errors']);

  const [openCancelModal, setOpenCancelModal] = useState<boolean>(false);
  const [bodyInitialValue, setBodyInitialValue] = useState<string>('');
  const [templateForm, setTemplateForm] =
    useState<TTemplateForm>(DEFAULT_TEMPLATE);
  const [templateFormErrors, setTemplateFormErrors] = useState<TTemplateErrors>(
    {}
  );

  const [upsertTemplate, { loading: upsertLoading }] =
    useMutation(TEMPLATE_UPSERT);
  const {
    data,
    loading: loadingGet,
    refetch,
  } = useQuery(TEMPLATE_GET, {
    variables: { uuid: id },
    skip: !id,
  });
  const { isOpenWarning, openNextRoute, removeNextRoute, setUpdateState } =
    useUnload(true);

  useEffect(() => {
    const templateData = getTemplateData(data?.templateGet);
    setBodyInitialValue(templateData[TEMPLATE_FIELDS.BODY]);
    setTemplateForm(templateData);
  }, [data]);

  const handleChange = (value, name: string) => {
    handleErrorFix(name);
    const updateInfo = {
      [name]: value,
    };
    setTemplateForm((prevState) => ({ ...prevState, ...updateInfo }));
  };

  const handleErrorFix = (name: string) => {
    if (templateFormErrors?.[name]) {
      const { [name]: omitted, ...errors } = templateFormErrors;
      setTemplateFormErrors(errors);
    }
  };

  const formatError = useCallback((name: string): string => {
    return `${ERROR_TEXT}${name}.`;
  }, []);

  const checkTemplateForm = (): boolean => {
    const errors = checkTemplateFormError(templateForm, formatError);
    setTemplateFormErrors(errors);
    return !!Object.keys(errors).length;
  };

  const handleSubmitClick = async () => {
    const formattedRequest = formatEditData(data?.templateGet, templateForm);
    try {
      setUpdateState(false);
      const { data: dataTemplate } = await upsertTemplate({
        variables: { input: { ...formattedRequest } },
      });
      await refetch();
      router.push(`/${ROUTES.EMAIL_TEMPLATES}`);
      if (!dataTemplate?.templateUpsert) {
        throw new Error();
      }
    } catch (error) {
      captureSentryError(error, {
        entityId: id,
        payload: formattedRequest,
      });
      setUpdateState(true);
      setTemplateFormErrors(error?.networkError?.message);
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

  const localErrorText = useCallback(
    (text: string, field: string, options?: object): string =>
      localIssueText(text, t, { component: field, ...options }),
    [t]
  );

  const loading = loadingGet || upsertLoading;

  return {
    localState: {
      openCancelModal: openCancelModal || isOpenWarning,
      bodyInitialValue,
    },
    localActions: {
      setOpenCancelModal,
    },
    handlers: {
      handleChange,
      handleSubmitClick,
      handleCancelButton,
      handleCloseCancelModal,
    },
    checkTemplateForm,
    templateFormErrors,
    templateForm,
    localErrorText,
    formattedData: {
      loading,
      data: data?.templateGet,
    },
  };
};

export default useEmailTemplateData;
