import { useCallback, useState } from 'react';
import { NOTE_TAKER_SERVICE_BASE_URL } from './constants';

export const useUpdateRecording = (id: string) => {
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateRecording = useCallback((data: Blob) => {
    const url = `${NOTE_TAKER_SERVICE_BASE_URL}/consultations/${id}/recording`;
    setIsLoading(true);
    setError(undefined);
    fetch(url, {
      method: 'POST',
      body: data
    }).catch(err => {
      setError(new Error(err.message || 'something went wrong'));
    }).finally(() => {
      setIsLoading(false);
    });
  }, [id]);
  return { updateRecording, error, isLoading };
};