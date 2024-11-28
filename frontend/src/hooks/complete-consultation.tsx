import { useCallback, useState } from 'react';
import { NOTE_TAKER_SERVICE_BASE_URL } from './constants';
import { Consultation, ConsultationId } from '../shared';

export type OnCompletedFn = (consultation: Consultation) => void;

export const useCompleteConsultation = (onCompleted: OnCompletedFn) => {
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const completeConsultation = useCallback((id: ConsultationId) => {
    const url = `${NOTE_TAKER_SERVICE_BASE_URL}/consultations/${id}`;
    setIsLoading(true);
    setError(undefined);
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: 'PATCH',
      body: JSON.stringify({ status: 'complete' })
    }).then(res => (res.json()))
      .then(onCompleted)
      .catch(err => {
        setError(new Error(err.message || 'something went wrong'));
      }).finally(() => {
        setIsLoading(false);
      });
  }, [onCompleted]);
  return { completeConsultation, error, isLoading, };
};