import { useCallback, useState } from 'react';
import { NOTE_TAKER_SERVICE_BASE_URL } from './constants';
import { Consultation } from '../shared';

type NewConsultationInputType = {
  name: string;
  age: number;
};

export type OnCreatedFn = (newConsultation: Consultation) => void;

export const useCreateNewConsultation = ({ onCreated }: { onCreated: OnCreatedFn; }) => {
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createNewConsultation = useCallback(({ name, age }: NewConsultationInputType) => {
    const url = `${NOTE_TAKER_SERVICE_BASE_URL}/consultations`;
    setIsLoading(true);
    setError(undefined);
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: 'POST',
      body: JSON.stringify({ name, age })
    }).then(res => (res.json()))
      .then(onCreated)
      .catch(err => {
        setError(new Error(err.message || 'something went wrong'));
      }).finally(() => {
        setIsLoading(false);
      });
  }, [onCreated]);
  return { createNewConsultation, error, isLoading };
};