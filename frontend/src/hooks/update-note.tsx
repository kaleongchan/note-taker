import { useCallback, useState } from 'react';
import { NOTE_TAKER_SERVICE_BASE_URL } from './constants';

export const useUpdateNote = (id: string) => {
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateNote = useCallback((note: string) => {
    const url = `${NOTE_TAKER_SERVICE_BASE_URL}/consultations/${id}`;
    setIsLoading(true);
    setError(undefined);
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: 'PATCH',
      body: JSON.stringify({ note })
    }).catch(err => {
      setError(new Error(err.message || 'something went wrong'));
    }).finally(() => {
      setIsLoading(false);
    });
  }, [id]);
  return { updateNote, error, isLoading };
};