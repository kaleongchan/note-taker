import React, { ChangeEvent, useState } from 'react';
import { useUpdateNote } from '../hooks/update-note';
import styles from './note.module.css';

export const Note = ({ id }: { id: string; }) => {
  const [note, setNote] = useState('');
  const { updateNote } = useUpdateNote(id);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
  };

  const onUpdate = () => {
    updateNote(note);
  };

  return (
    <div>
      <label>Notes:</label>
      <div>
        <textarea className={styles.textarea} onChange={onChange} value={note} />
      </div>
      <button onClick={onUpdate}>Save</button>
    </div>
  );
};