import { Request, Response } from 'express';
import { getAllInquiries, updateInquiryStatus, deleteInquiry } from '../services/inquiryService';
import { logger } from '../utils/logger';

const VALID_STATUSES = ['new', 'contacted', 'closed'] as const;
type Status = (typeof VALID_STATUSES)[number];

export async function listInquiries(req: Request, res: Response): Promise<void> {
  try {
    const { status, search } = req.query as { status?: string; search?: string };
    const inquiries = await getAllInquiries({ status, search });
    res.json({ success: true, data: inquiries });
  } catch (err) {
    logger.error('Error listing inquiries', { err });
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
}

export async function patchInquiry(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { status } = req.body as { status?: string };
    if (!status || !(VALID_STATUSES as readonly string[]).includes(status)) {
      res.status(422).json({ success: false, error: `Status must be one of: ${VALID_STATUSES.join(', ')}` });
      return;
    }
    const inquiry = await updateInquiryStatus(id, status as Status);
    if (!inquiry) {
      res.status(404).json({ success: false, error: 'Inquiry not found' });
      return;
    }
    res.json({ success: true, data: inquiry });
  } catch (err) {
    logger.error('Error updating inquiry', { id: req.params.id, err });
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
}

export async function removeInquiry(req: Request, res: Response): Promise<void> {
  try {
    const deleted = await deleteInquiry(req.params.id);
    if (!deleted) {
      res.status(404).json({ success: false, error: 'Inquiry not found' });
      return;
    }
    res.json({ success: true, message: 'Inquiry deleted successfully' });
  } catch (err) {
    logger.error('Error deleting inquiry', { id: req.params.id, err });
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
}
