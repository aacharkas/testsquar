import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../../../../apps/squaredash-web/constants/routes';
import { localIssueText } from '../../Components/ErrorMessage';
import { TEMPLATE_GET } from '../EmailTemplate/EmailTemplateForm.api';
import { GET_EMAIL_TEMPLATES } from '../EmailTemplates.api';
import { EMAIL_TEMPLATE_ACTIONS } from '../EmailTemplates.constants';
import { getTemplateData } from '../EmailTemplates.helper';
import { TDropdownItem, TTemplate } from '../EmailTemplates.types';

const useEmailTemplatesData = () => {
  const { t } = useTranslation(['system_errors']);
  const router = useRouter();

  const [templatesData, setTemplatesData] = useState(null);
  const [templatesCount, setTemplatesCount] = useState<number>(null);
  const [openPreviewModal, setOpenPreviewModal] = useState<boolean>(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');

  const { loading, data } = useQuery(GET_EMAIL_TEMPLATES, {
    variables: {
      take: 5,
      skip: 0,
    },
    fetchPolicy: 'cache-and-network',
  });

  const { data: templatePreview, loading: loadingGetPreview } = useQuery(
    TEMPLATE_GET,
    {
      variables: { uuid: selectedTemplate },
      skip: !selectedTemplate,
    }
  );

  const templateData = useMemo(
    () => getTemplateData(templatePreview?.templateGet),
    [templatePreview]
  );

  useEffect(() => {
    if (data) {
      const totalCount = data?.templates?.totalCount;
      setTemplatesData(data?.templates?.rows);
      setTemplatesCount(totalCount);
    } else {
      setTemplatesData([]);
    }
  }, [data]);

  const handleActionOnTableItem = (
    item: TDropdownItem,
    templateItem?: TTemplate
  ): void => {
    if (item.type === EMAIL_TEMPLATE_ACTIONS.VIEW) {
      setSelectedTemplate(item.id);
      setOpenPreviewModal(true);
    } else if (item.type === EMAIL_TEMPLATE_ACTIONS.EDIT) {
      router.push(item.href);
    }
  };

  const handleActionEdit = (id: string): void => {
    router.push(`/${ROUTES.EMAIL_TEMPLATE}?id=${id}`);
  };

  const localErrorText = useCallback(
    (text: string, field: string): string =>
      localIssueText(text, t, { component: field }),
    [t]
  );

  return {
    localState: {
      openPreviewModal,
      selectedTemplate,
    },
    localActions: {
      setOpenPreviewModal,
      setSelectedTemplate,
    },
    localErrorText,
    handlers: {
      handleActionOnTableItem,
      handleActionEdit,
    },
    formattedData: {
      templateData,
      loadingGetPreview,
      templatesData,
      templatesCount,
      loading,
    },
  };
};

export default useEmailTemplatesData;
