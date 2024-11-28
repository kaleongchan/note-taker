import { v4 as uuidv4 } from 'uuid';
import { Consultation, ConsultationId } from '../services/consultationService';

/**
 * This is a fake store. Should be a proper database.
 */

const store: Record<string, Consultation> = {};


export const create = async (consultation: Consultation): Promise<Consultation> => {
  const newId = uuidv4();
  consultation.id = newId;
  store[newId.toString()] = consultation;
  return consultation;
};

export const getById = async (id: ConsultationId): Promise<Consultation | undefined> => {
  return store[id.toString()];
};

export const updateConsultation = async (consultation: Consultation) => {
  store[consultation.id.toString()] = consultation;
};