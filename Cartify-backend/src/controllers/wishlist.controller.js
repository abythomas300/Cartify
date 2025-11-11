// src/controllers/wishlist.controller.js
import Wishlist from '../models/wishlist.model.js';
import Product from '../models/product.model.js';

/**
 * Get wishlist for current user (populated)
 */
export async function getWishlist(req, res) {
  try {
    const userId = req.user.id;
    let wishlist = await Wishlist.findOne({ user: userId }).populate({
      path: 'products',
      select: 'name price images stock category isActive'
    });

    if (!wishlist) {
      wishlist = await Wishlist.create({ user: userId, products: [] });
      // repopulate for consistent response shape
      wishlist = await Wishlist.findById(wishlist._id).populate({
        path: 'products',
        select: 'name price images stock category isActive'
      });
    }

    res.json(wishlist);
  } catch (err) {
    console.error('getWishlist error', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

/**
 * Add a product to wishlist (idempotent)
 * body: { productId }
 */
export async function addToWishlist(req, res) {
  try {
    const userId = req.user.id;
    const { productId } = req.body;
    if (!productId) return res.status(400).json({ message: 'productId required' });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    let wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) wishlist = await Wishlist.create({ user: userId, products: [] });

    // if already present, return current wishlist
    if (wishlist.products.find(p => p.toString() === productId)) {
      await wishlist.populate({ path: 'products', select: 'name price images stock category isActive' }).execPopulate?.();
      // execPopulate for older mongoose; populate returns a Query in some versions
      wishlist = await Wishlist.findById(wishlist._id).populate({ path: 'products', select: 'name price images stock category isActive' });
      return res.json({ message: 'Already in wishlist', wishlist });
    }

    wishlist.products.push(productId);
    await wishlist.save();
    wishlist = await Wishlist.findById(wishlist._id).populate({ path: 'products', select: 'name price images stock category isActive' });

    res.status(201).json({ message: 'Added to wishlist', wishlist });
  } catch (err) {
    console.error('addToWishlist error', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

/**
 * Remove a product from wishlist
 * params: productId
 */
export async function removeFromWishlist(req, res) {
  try {
    const userId = req.user.id;
    const { productId } = req.params;
    if (!productId) return res.status(400).json({ message: 'productId required' });

    const wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) return res.status(404).json({ message: 'Wishlist not found' });

    const before = wishlist.products.length;
    wishlist.products = wishlist.products.filter(p => p.toString() !== productId);

    if (wishlist.products.length === before) {
      // nothing removed
      return res.status(404).json({ message: 'Product not in wishlist' });
    }

    await wishlist.save();
    const populated = await Wishlist.findById(wishlist._id).populate({ path: 'products', select: 'name price images stock category isActive' });
    res.json({ message: 'Removed from wishlist', wishlist: populated });
  } catch (err) {
    console.error('removeFromWishlist error', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

/**
 * Toggle product in wishlist
 * body: { productId }
 * Returns new wishlist and action: 'added' | 'removed'
 */
export async function toggleWishlist(req, res) {
  try {
    const userId = req.user.id;
    const { productId } = req.body;
    if (!productId) return res.status(400).json({ message: 'productId required' });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    let wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) wishlist = await Wishlist.create({ user: userId, products: [] });

    const idx = wishlist.products.findIndex(p => p.toString() === productId);
    let action;
    if (idx === -1) {
      wishlist.products.push(productId);
      action = 'added';
    } else {
      wishlist.products.splice(idx, 1);
      action = 'removed';
    }
    await wishlist.save();
    wishlist = await Wishlist.findById(wishlist._id).populate({ path: 'products', select: 'name price images stock category isActive' });

    res.json({ message: `Product ${action}`, action, wishlist });
  } catch (err) {
    console.error('toggleWishlist error', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}
