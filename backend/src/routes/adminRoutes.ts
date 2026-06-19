import { Router } from 'express';
import { listInquiries, patchInquiry, removeInquiry } from '../controllers/adminController';
import { adminAuth } from '../middleware/auth';

const router = Router();

router.use(adminAuth);

router.get('/inquiries', listInquiries);
router.patch('/inquiries/:id', patchInquiry);
router.delete('/inquiries/:id', removeInquiry);

export default router;
