import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { localIssueText } from '../../Components/ErrorMessage';
import {
  GET_ALGORITHM_DOCUMENTS,
  GET_VALIDATE_ALGORITHM_DOCUMENTS,
  VALIDATE_ALGORITHM_DOCUMENTS,
} from '../AlgorithmAccuracy.api';
import { CHANNEL_ALGORITHM_DOCUMENTS } from '../AlgorithmAccuracy.constants';
import { TAlgorithmDocument } from '../AlgorithmAccuracy.types';

const useAlgorithmAccuracyData = () => {
  const { t } = useTranslation(['system_errors']);

  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [processedDocuments, setProcessedDocuments] = useState<
    TAlgorithmDocument[]
  >([]);
  const [disableAll, setDisableAll] = useState<boolean>(false);

  const { loading, data } = useQuery(GET_ALGORITHM_DOCUMENTS, {
    variables: {
      take: 5,
      skip: 0,
    },
    fetchPolicy: 'cache-and-network',
  });

  const [getValidatedDocuments] = useLazyQuery(
    GET_VALIDATE_ALGORITHM_DOCUMENTS
  );

  const [validateAlgorithm, { loading: loadingValidateAlgorithm }] =
    useMutation(VALIDATE_ALGORITHM_DOCUMENTS);

  const averageCorrect = useMemo(
    () => processedDocuments.find((item) => item?.name === '*'),
    [processedDocuments]
  );

  const requestAlgorithmResults = async () => {
    try {
      const { data } = await getValidatedDocuments();
      if (data) {
        console.log(
          'verified data',
          data?.validateAlgorithmDocuments?.[0]?.documents
        );
        setProcessedDocuments(data?.validateAlgorithmDocuments?.[0]?.documents);
      }
    } catch (er) {
      console.log('er', er);
    } finally {
      setDisableAll(false);
    }
  };

  useEffect(() => {
    const ws = new WebSocket(process.env.NX_API_GW_DOMAIN_NAME);
    ws.onclose = () => {
      console.log('Socket closed');
    };
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          action: 'subscribe-to-channel',
          channel: CHANNEL_ALGORITHM_DOCUMENTS,
        })
      );
    };
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('socket data', data);
      if (data?.data?.notification?.finished) {
        requestAlgorithmResults();
      }
      // add if initial data will be necessary
      // else if (data?.data?.documents) {
      //   setProcessedDocuments(data?.data?.documents ?? []);
      // }
    };
  }, []);

  const algorithmAccuracyData = useMemo(() => data?.templates, [data]);
  const allSelected =
    selectedDocuments.length === algorithmAccuracyData?.length;

  const handleStartChecking = () => {
    setDisableAll(true);
    try {
      validateAlgorithm({
        variables: { input: { documents: selectedDocuments } },
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleChangeSelectedDocuments = (id) => {
    if (disableAll) return;
    if (selectedDocuments.includes(id)) {
      setSelectedDocuments(selectedDocuments.filter((key) => key !== id));
    } else {
      setSelectedDocuments([...selectedDocuments, id]);
    }
  };

  const handleChangeAll = () => {
    if (disableAll) return;
    if (allSelected) {
      setSelectedDocuments([]);
    } else {
      setSelectedDocuments(algorithmAccuracyData.map((item) => item?.key));
    }
  };

  const localErrorText = useCallback(
    (text: string, field: string): string =>
      localIssueText(text, t, { component: field }),
    [t]
  );

  return {
    localState: {
      selectedDocuments,
      disableAll,
    },
    localActions: {},
    localErrorText,
    handlers: {
      handleChangeSelectedDocuments,
      handleChangeAll,
      handleStartChecking,
    },
    formattedData: {
      allSelected,
      processedDocuments,
      algorithmAccuracyData,
      averageCorrect,
      loading,
    },
  };
};

export default useAlgorithmAccuracyData;
