import { Router } from 'express';
import { submitInquiry } from '../controllers/inquiryController';
import { inquiryValidationRules, validateRequest } from '../middleware/validation';
import { inquiryLimiter } from '../middleware/rateLimiter';

const router = Router();

router.post('/', inquiryLimiter, inquiryValidationRules, validateRequest, submitInquiry);

export default router;
