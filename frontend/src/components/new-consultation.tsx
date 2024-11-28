import React, { useState, useCallback, ChangeEvent } from 'react';
import { OnCreatedFn, useCreateNewConsultation } from '../hooks/create-new-consultation';
import styles from './new-consultation.module.css';

type Props = {
  onNewConsultation: OnCreatedFn;
};

export const NewConsultation = ({ onNewConsultation }: Props) => {

  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number | undefined>(undefined);
  const onCreated = useCallback<OnCreatedFn>((newConsultation) => {
    onNewConsultation(newConsultation);

    setName("");
    setAge(undefined);
  }, [onNewConsultation]);
  const { createNewConsultation } = useCreateNewConsultation({ onCreated });

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onChangeAge = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value);
    if (value > 0 && value < 150) {
      setAge(value);
    }
  };

  const onSubmit = () => {
    if (name && age)
      createNewConsultation({ name, age });
  };

  return (
    <div>
      <h4>Patient</h4>
      <span className={styles.field}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" onChange={onChangeName} value={name} />
      </span>

      <span className={styles.field}>
        <label htmlFor="age">Age:</label>
        <input type="number" min="0" id="age" onChange={onChangeAge} value={age || ""} />
      </span>

      <button disabled={!name || !age} onClick={onSubmit}>New Consultation</button>
    </div >
  );
};