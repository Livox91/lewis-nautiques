import { Request, Response } from 'express';
import { createInquiry } from '../services/inquiryService';
import { CreateInquiryDto } from '../types';
import { logger } from '../utils/logger';

export async function submitInquiry(req: Request, res: Response): Promise<void> {
  try {
    const dto: CreateInquiryDto = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      message: req.body.message,
      boat_id: req.body.boat_id,
    };
    const inquiry = await createInquiry(dto);
    logger.info('New inquiry received', { id: inquiry.id, boat: inquiry.boat_name });
    res.status(201).json({
      success: true,
      data: { id: inquiry.id },
      message: 'Inquiry submitted successfully. Our team will be in touch shortly.',
    });
  } catch (err) {
    logger.error('Error submitting inquiry', { err });
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
}
