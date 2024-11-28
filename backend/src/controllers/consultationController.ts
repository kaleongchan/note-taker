import { Request, Response } from "express";
import * as consultationService from '../services/consultationService';
import { ConsultationId } from "../services/consultationService";

type ConsultationIdRequestParam = {
  consultationId: ConsultationId;
};

export const create = async (req: Request, res: Response) => {

  const newConsultation = await consultationService.createConsultation(req.body);

  res.status(201).json(newConsultation);
};

export const updateRecording = async (req: Request<ConsultationIdRequestParam>, res: Response) => {
  const { consultationId } = req.params;

  req.on('readable', () => {
    const data = req.read();
    if (data) {
      consultationService.updateConsultationRecording(consultationId, data);
    }
  });

  res.sendStatus(204);

};

type UpdateConsultationRequestBody = {
  note: string | undefined;
  status: 'complete' | undefined;
};
export const updateConsultation = async (req: Request<ConsultationIdRequestParam, {}, UpdateConsultationRequestBody>, res: Response) => {
  const { consultationId } = req.params;
  const data = req.body;

  if (data.note) {
    const consultation = await consultationService.updateConsultationNote(consultationId, data.note);
    res.status(200).json(consultation);
    return;
  }

  if (data.status === 'complete') {
    const consultation = await consultationService.completeConsultation(consultationId);
    res.status(200).json(consultation);
    return;
  }

  res.sendStatus(400);
};
