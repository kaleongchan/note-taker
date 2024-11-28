import React, { useState } from 'react';
import styles from './main.module.css';
import { Note } from './components/note';
import { Recorder } from './components/recorder';
import { NewConsultation } from './components/new-consultation';
import { useCompleteConsultation } from './hooks/complete-consultation';
import { Consultation } from './shared';


function App() {
  const [consultation, setConsultation] = useState<Consultation | undefined>(undefined);

  const { completeConsultation, isLoading: isCompleting } = useCompleteConsultation(setConsultation);
  const onStoppedRecording = () => {
    if (consultation) {
      completeConsultation(consultation.id);
    }
  };


  return (
    <div className={styles.app}>
      {!consultation &&
        <NewConsultation onNewConsultation={setConsultation} />
      }

      {consultation &&

        <div>
          <h3>Name: {consultation.name}  <button onClick={() => setConsultation(undefined)}>Close consultation</button></h3>

          {isCompleting && <div className={styles.loader}><span>transcribing</span></div>}

          {!isCompleting && consultation.status === 'new' &&
            <div className={styles.newConsultation}>
              <div className={styles.flexItem}>
                <Note id={consultation.id} />
              </div>
              <div className={styles.flexItem}>
                <Recorder id={consultation.id} onStopped={onStoppedRecording} />
              </div>
            </div>

          }

          {!isCompleting && consultation.status === 'complete' &&
            <div className={styles.completedConsultation}>
              <h3>Note:</h3>
              <p>{consultation.note}</p>

              <h3>Transcription</h3>
              <p>{consultation.transcription}</p>
            </div>
          }

        </div>

      }

    </div>
  );
}

export default App;
