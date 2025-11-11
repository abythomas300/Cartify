// src/routes/admin.routes.js
import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { requireAdmin } from '../middleware/role.middleware.js';
import { listUsers, promoteToAdmin, demoteAdmin, deleteUser } from '../controllers/admin.controller.js';

const router = express.Router();

// All routes are protected + admin-only
router.use(protect, requireAdmin);

router.get('/users', listUsers);
router.post('/promote', promoteToAdmin);
router.post('/demote', demoteAdmin);
router.delete('/user', deleteUser);

export default router;
