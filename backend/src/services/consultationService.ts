import { updateRecording, getRecording } from './recordingService';
import { UUIDTypes } from 'uuid';
import * as consultationStore from '../stores/consultationStore';
import { transcribeRecording } from './transcriptionService';



export type ConsultationId = UUIDTypes;
export type ConsultationStatus = 'new' | 'complete';
export type Consultation = {
  id: ConsultationId;
  name: string;
  age: number;
  note: string;
  transcription: string;
  status: ConsultationStatus;
};


type NewConsultationInput = {
  name: string;
  age: number;
};
export const createConsultation = async ({ name, age }: NewConsultationInput): Promise<Consultation> => {
  return consultationStore.create({
    id: '',
    name,
    age,
    note: '',
    transcription: '',
    status: 'new'
  });
};

export const updateConsultationRecording = async (id: ConsultationId, data: any) => {
  const consultation = await consultationStore.getById(id);
  if (!consultation) {
    throw new Error("not found");
  }

  const key = `recording-${id}`;
  updateRecording(key, data);
};

export const updateConsultationNote = async (id: ConsultationId, note: string): Promise<Consultation> => {
  const consultation = await consultationStore.getById(id);
  if (!consultation) {
    throw new Error("not found");
  }

  consultation.note = note;
  await consultationStore.updateConsultation(consultation);

  return consultation;
};

export const completeConsultation = async (id: ConsultationId): Promise<Consultation> => {
  const consultation = await consultationStore.getById(id);

  if (!consultation) {
    throw new Error("not found");
  }

  if (consultation.status === 'complete') {
    return consultation;
  }

  const key = `recording-${id}`;
  const recording = getRecording(key);
  const transcription = await transcribeRecording(recording);
  consultation.transcription = transcription;
  consultation.status = 'complete';
  await consultationStore.updateConsultation(consultation);

  return consultation;
}

