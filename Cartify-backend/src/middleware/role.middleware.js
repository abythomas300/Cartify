// src/middleware/role.middleware.js
/**
 * requireRole(roleString)
 * Usage: router.post('/', protect, requireRole('admin'), createProduct)
 */
export function requireRole(role) {
  return (req, res, next) => {
    try {
      if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
      if (req.user.role !== role) return res.status(403).json({ message: 'Forbidden: insufficient role' });
      return next();
    } catch (err) {
      return res.status(500).json({ message: 'Role check error' });
    }
  };
}

export const requireAdmin = requireRole('admin');
