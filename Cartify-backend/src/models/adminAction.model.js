// src/models/adminAction.model.js
import mongoose from 'mongoose';

const AdminActionSchema = new mongoose.Schema({
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true }, // e.g., 'promote', 'delete-user', 'create-product'
  targetType: { type: String }, // e.g., 'User','Product','Order'
  targetId: { type: String }, // id of the target resource (as string)
  metadata: { type: mongoose.Schema.Types.Mixed }, // optional extra data
  ip: String,
  userAgent: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('AdminAction', AdminActionSchema);
