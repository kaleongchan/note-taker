import express from 'express';
import * as consultationController from '../controllers/consultationController';

const router = express.Router();

// create new consultation
router.post('/', consultationController.create);

// update consultation
router.patch('/:consultationId', consultationController.updateConsultation);

// upload recording blob
router.post('/:consultationId/recording', consultationController.updateRecording);


export default router;