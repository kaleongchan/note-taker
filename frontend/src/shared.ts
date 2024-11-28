export type ConsultationId = string;
export type ConsultationStatus = 'new' | 'complete';
export type Consultation = {
  id: ConsultationId;
  name: string;
  age: number;
  note: string;
  transcription: string;
  status: ConsultationStatus;
};
