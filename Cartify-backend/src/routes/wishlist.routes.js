import express from 'express';
import { getWishlist, addToWishlist, removeFromWishlist, toggleWishlist } from '../controllers/wishlist.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);

router.get('/', getWishlist);                     // GET /api/wishlist
router.post('/add', addToWishlist);               // POST /api/wishlist/add  { productId }
router.post('/toggle', toggleWishlist);           // POST /api/wishlist/toggle { productId }
router.delete('/remove/:productId', removeFromWishlist); // DELETE /api/wishlist/remove/:productId

export default router;
