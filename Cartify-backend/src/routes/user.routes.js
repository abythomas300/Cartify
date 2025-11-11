// src/routes/user.routes.js
import express from 'express';
import { listUsers, getUser, updateUser, deleteUser } from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { requireAdmin } from '../middleware/role.middleware.js';

const router = express.Router();

router.get('/', protect, requireAdmin, listUsers); // admin only
router.get('/:id', protect, getUser); // user or admin
router.put('/:id', protect, updateUser);
router.delete('/:id', protect, requireAdmin, deleteUser);

export default router;
