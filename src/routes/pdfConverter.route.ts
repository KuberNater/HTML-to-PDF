import express from 'express';
import { generatePDF } from '../controllers/pdfConverter.controller';

const router = express.Router();

router.post('/create', generatePDF);

export default router;
