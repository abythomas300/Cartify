// src/routes/auth.routes.js
import express from 'express';
import { register, login } from '../controllers/auth.controller.js';

const router = express.Router();

/**
 * POST /api/auth/register
 * body: { username, email, password }
 */
router.post('/register', register);

/**
 * POST /api/auth/login
 * body: { email, password }
 */
router.post('/login', login);

export default router;
