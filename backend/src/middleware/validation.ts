import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import xss from 'xss';

export const inquiryValidationRules = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-ZÀ-ÿ\s'\-]+$/)
    .withMessage('Name contains invalid characters'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail()
    .isLength({ max: 254 })
    .withMessage('Email is too long'),
  body('phone')
    .trim()
    .matches(/^\+?[\d\s\-().]{7,20}$/)
    .withMessage('Please provide a valid phone number'),
  body('message')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Message cannot exceed 2000 characters'),
  body('boat_id')
    .optional({ nullable: true, checkFalsy: true })
    .isUUID()
    .withMessage('Invalid boat reference'),
];

export function validateRequest(req: Request, res: Response, next: NextFunction): void {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      success: false,
      error: 'Validation failed',
      details: errors.array().map((e) => ({ field: (e as any).path ?? 'unknown', message: e.msg })),
    });
    return;
  }
  if (typeof req.body.name === 'string') req.body.name = xss(req.body.name.trim());
  if (typeof req.body.message === 'string') req.body.message = xss(req.body.message.trim());
  next();
}
