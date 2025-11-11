// src/controllers/admin.controller.js
import User from '../models/user.model.js';
import { logAdminActionDirect } from '../middleware/adminLogger.middleware.js';

/**
 * GET /api/admin/users
 * Query: page, limit, q (search by email/username)
 * Admin-only: lists users with pagination
 */
export async function listUsers(req, res) {
  try {
    const { page = 1, limit = 50, q } = req.query;
    const filter = {};
    if (q) {
      const re = new RegExp(q, 'i');
      filter.$or = [{ email: re }, { username: re }];
    }
    const skip = (Math.max(1, Number(page)) - 1) * Number(limit);
    const items = await User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)).select('-password');
    const total = await User.countDocuments(filter);
    res.json({ items, total, page: Number(page), limit: Number(limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

/**
 * POST /api/admin/promote
 * body: { email } or { userId }
 * Admin-only: promote a user to admin
 */
export async function promoteToAdmin(req, res) {
  try {
    const { email, userId } = req.body;
    if (!email && !userId) return res.status(400).json({ message: 'email or userId required' });

    const filter = email ? { email } : { _id: userId };
    const user = await User.findOneAndUpdate(filter, { $set: { role: 'admin' } }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // log admin action
    await logAdminActionDirect({ adminId: req.user.id, action: 'promote', targetType: 'User', targetId: user._id.toString(), metadata: { byEmail: req.user.email }, req });

    res.json({ success: true, user: { id: user._id, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

/**
 * POST /api/admin/demote
 * body: { email } or { userId }
 * Admin-only: demote admin to user
 */
export async function demoteAdmin(req, res) {
  try {
    const { email, userId } = req.body;
    if (!email && !userId) return res.status(400).json({ message: 'email or userId required' });

    const filter = email ? { email } : { _id: userId };
    const user = await User.findOneAndUpdate(filter, { $set: { role: 'user' } }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });

    await logAdminActionDirect({ adminId: req.user.id, action: 'demote', targetType: 'User', targetId: user._id.toString(), metadata: {}, req });

    res.json({ success: true, user: { id: user._id, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

/**
 * DELETE /api/admin/user
 * body: { email } or { userId }
 * Admin-only: delete a user (use with caution)
 */
export async function deleteUser(req, res) {
  try {
    const { email, userId } = req.body;
    if (!email && !userId) return res.status(400).json({ message: 'email or userId required' });

    const filter = email ? { email } : { _id: userId };
    const user = await User.findOne(filter);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // avoid self-deleting admin accidentally
    if (user._id.toString() === req.user.id) return res.status(400).json({ message: 'You cannot delete yourself' });

    await User.deleteOne({ _id: user._id });

    await logAdminActionDirect({ adminId: req.user.id, action: 'delete-user', targetType: 'User', targetId: user._id.toString(), metadata: { deletedEmail: user.email }, req });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
