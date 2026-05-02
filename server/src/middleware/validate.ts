import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

/**
 * Audit Comment: Security Hardening - Centralized Schema Validation
 * This middleware ensures all incoming data matches expected types/shapes.
 */
export const validateRequest = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: 'Validation Failed',
          details: error.issues.map(e => ({ path: e.path, message: e.message }))
        });
      }
      return res.status(500).json({ error: 'Internal Server Error during validation' });
    }
  };
};
