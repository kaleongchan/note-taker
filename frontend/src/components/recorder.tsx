import React, { useState } from 'react';
import { useUpdateRecording } from '../hooks/update-recording';
import styles from './recorder.module.css';
import { ConsultationId } from '../shared';

const RECORDING_TIME_SLICE_MILLIS = 2000;
const mediaConstraints: MediaStreamConstraints = { audio: true };
const mediaOptions: MediaRecorderOptions = {
  audioBitsPerSecond: 128000,
  mimeType: 'audio/webm'
};

const setupRecorder = async (): Promise<MediaRecorder> => {

  if (!navigator.mediaDevices.getUserMedia) {
    throw new Error("unsupported");
  }
  const stream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
  const mediaRecorder = new MediaRecorder(stream, mediaOptions);

  return mediaRecorder;
};

// using event to "guess" the state to get around `recorder.state` not being reliable for some reason.
const RecorderEventToState: Record<string, string> = {
  "start": 'recording',
  "pause": 'paused',
  "resume": 'recording',
  "stop": 'inactive'
};

type Props = {
  id: ConsultationId;
  onStopped: () => void;
};

export const Recorder = ({ id, onStopped }: Props) => {

  const [recorder, setRecorder] = useState<MediaRecorder | undefined>(undefined);
  const [recorderState, setRecorderState] = useState<string | undefined>(undefined);
  const { updateRecording } = useUpdateRecording(id);

  const onData = (e: BlobEvent) => {
    updateRecording(e.data);
  };

  const handleEvent = (e: Event) => {
    setRecorderState(RecorderEventToState[e.type] ?? "error");

    if (e.type === 'stop') {
      onStopped();
    }
  };

  const startRecord = async () => {
    try {
      const recorder = await setupRecorder();
      recorder.ondataavailable = onData;
      recorder.onstart = handleEvent;
      recorder.onstop = handleEvent;
      recorder.onpause = handleEvent;
      recorder.onresume = handleEvent;
      recorder.onerror = handleEvent;
      recorder.start(RECORDING_TIME_SLICE_MILLIS);
      setRecorder(recorder);
    } catch (error) {
      console.error(error);
    }
  };

  const pauseRecord = () => {
    try {
      recorder?.pause();
    } catch (error) {
      console.error(error);
    }
  };

  const resumeRecord = () => {
    try {
      recorder?.resume();
    } catch (error) {
      console.error(error);
    }
  };

  const stopRecord = () => {

    // eslint-disable-next-line no-restricted-globals
    if (confirm("Stop recoding will trigger transcription to start, are you sure?")) {

      recorder?.stop();
    }
  };

  if (!navigator.mediaDevices.getUserMedia) {
    return <h3>Not supported</h3>;
  }


  return (
    <div className={styles.container}>

      {recorderState === 'recording' && <div className={styles.loader}></div>}

      <div className={styles.buttonsContainer}>
        {(recorderState === undefined) &&
          <button className={styles.button} onClick={startRecord}>Record</button>
        }

        {recorderState === 'recording' &&
          <button className={styles.button} onClick={pauseRecord}>Pause</button>
        }

        {recorderState === 'paused' &&
          <button className={styles.button} onClick={resumeRecord}>Resume</button>
        }

        {
          (recorderState === 'recording' || recorderState === 'paused') &&
          <button className={styles.button} onClick={stopRecord}>Stop</button>
        }
      </div>
    </div>
  );

};