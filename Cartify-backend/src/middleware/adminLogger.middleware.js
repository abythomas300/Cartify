// src/middleware/adminLogger.middleware.js
import AdminAction from '../models/adminAction.model.js';

/**
 * logAdminAction(action, options)
 * Usage:
 *   router.post('/promote', protect, requireAdmin, logAdminAction('promote'), promoteToAdmin)
 * Or call directly inside controllers: await logAdminActionDirect(...)
 */
export function logAdminAction(action, { targetType } = {}) {
  return async (req, res, next) => {
    // We defer saving until after controller completes so we can know success/failure.
    // Instead, attach a helper to res so controller can call res.logAdminSuccess(...)
    res.logAdminSuccess = async function (targetId = null, metadata = {}) {
      try {
        if (!req.user || !req.user.id) return;
        const entry = await AdminAction.create({
          admin: req.user.id,
          action,
          targetType,
          targetId,
          metadata,
          ip: req.ip || req.headers['x-forwarded-for'] || '',
          userAgent: req.get('User-Agent') || ''
        });
        return entry;
      } catch (err) {
        console.error('AdminAction logging failed', err);
      }
    };
    next();
  };
}

/**
 * helper to log inside code (not middleware)
 */
export async function logAdminActionDirect({ adminId, action, targetType, targetId = null, metadata = {}, req = null }) {
  try {
    const entry = await AdminAction.create({
      admin: adminId,
      action,
      targetType,
      targetId,
      metadata,
      ip: req ? (req.ip || req.headers['x-forwarded-for'] || '') : '',
      userAgent: req ? (req.get('User-Agent') || '') : ''
    });
    return entry;
  } catch (err) {
    console.error('logAdminActionDirect error', err);
  }
}
