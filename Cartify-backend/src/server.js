// src/server.js
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './app.js';

const app = express();

// --- CORS config (single use) ---
const ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://127.0.0.1:3000'
];

app.use(cors({
  origin: function(origin, callback) {
    // allow non-browser tools (curl, server-to-server) which have no origin
    if (!origin) return callback(null, true);
    if (ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
    // for dev you may want to allow everything: return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization','X-Requested-With','Accept']
}));

// Lightweight middleware to respond to OPTIONS preflight without using app.options('*')
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    // If we reach here, cors() has already set headers for allowed origins.
    return res.sendStatus(204);
  }
  next();
});

// JSON body parser
app.use(express.json());

// Mount API router under /api
app.use('/api', router);

// Optional health check
app.get('/', (req, res) => res.json({ ok: true }));

// Start server
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cartify';

async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');

    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();
