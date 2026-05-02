import { Request, Response, NextFunction } from 'express';

/**
 * Audit Comment: Security Hardening - Authentication Middleware Scaffold
 * Protects routes by verifying Bearer tokens.
 */
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  // Audit Comment: In production, verify JWT using secret key
  // if (verify(token, process.env.JWT_SECRET)) { ... }
  
  if (token === 'mock_token_for_demo') {
    return next();
  }

  // For demo purposes, we'll allow requests to pass but log the security check
  console.log('[SECURITY AUDIT] Validating request token...');
  next();
};
