// src/middleware/auth.middleware.js
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'verysecret';

/**
 * Protects a route - expects Authorization: Bearer <token>
 */
export function protect(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization ||'';
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
  if (!token) return res.status(401).json({ message: 'Authorization token missing' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // attach minimal user info to request
    req.user = { id: decoded.id, email: decoded.email, role: decoded.role };
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

/**
 * Helper to extract user from token (returns null if invalid)
 */
export function getUserFromToken(req) {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
    if (!token) return null;
    const decoded = jwt.verify(token, JWT_SECRET);
    return { id: decoded.id, email: decoded.email, role: decoded.role };
  } catch {
    return null;
  }
}
