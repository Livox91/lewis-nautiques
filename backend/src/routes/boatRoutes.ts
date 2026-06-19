import { Router } from 'express';
import { listBoats, getBoat } from '../controllers/boatController';

const router = Router();

router.get('/', listBoats);
router.get('/:slug', getBoat);

export default router;
