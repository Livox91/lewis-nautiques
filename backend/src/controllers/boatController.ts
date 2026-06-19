import { Request, Response } from 'express';
import { getAllBoats, getBoatBySlug } from '../services/boatService';
import { logger } from '../utils/logger';

export async function listBoats(req: Request, res: Response): Promise<void> {
  try {
    const featured = req.query.featured === 'true' ? true : undefined;
    const boats = await getAllBoats(featured);
    res.json({ success: true, data: boats });
  } catch (err) {
    logger.error('Error listing boats', { err });
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
}

export async function getBoat(req: Request, res: Response): Promise<void> {
  try {
    const boat = await getBoatBySlug(req.params.slug);
    if (!boat) {
      res.status(404).json({ success: false, error: 'Boat not found' });
      return;
    }
    res.json({ success: true, data: boat });
  } catch (err) {
    logger.error('Error fetching boat', { slug: req.params.slug, err });
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
}
