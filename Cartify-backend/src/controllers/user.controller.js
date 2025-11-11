import User from '../models/user.model.js';


export async function listUsers(req, res) {
const { page = 1, limit = 50, q } = req.query;
const filter = {};
if (q) filter.$or = [{ email: { $regex: q, $options: 'i' } }, { username: { $regex: q, $options: 'i' } }];
const skip = (Math.max(1, Number(page)) - 1) * Number(limit);
const items = await User.find(filter).select('-password').skip(skip).limit(Number(limit)).sort({ createdAt: -1 });
const total = await User.countDocuments(filter);
res.json({ items, total, page: Number(page), limit: Number(limit) });
}


export async function getUser(req, res) {
const u = await User.findById(req.params.id).select('-password');
if (!u) return res.status(404).json({ message: 'User not found' });
res.json(u);
}


export async function updateUser(req, res) {
// allow user to update own profile or admin
const updates = { ...req.body };
if (updates.password) delete updates.password; // password change should be separate
const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
if (!user) return res.status(404).json({ message: 'User not found' });
res.json(user);
}


export async function deleteUser(req, res) {
const user = await User.findByIdAndDelete(req.params.id);
if (!user) return res.status(404).json({ message: 'User not found' });
res.json({ success: true });
}