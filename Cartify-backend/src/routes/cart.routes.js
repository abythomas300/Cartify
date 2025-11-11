import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart
} from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/", authMiddleware, addToCart);
router.get("/", authMiddleware, getCart);
router.put("/", authMiddleware, updateCartItem);
router.delete("/:productId", authMiddleware, removeFromCart);
router.delete("/", authMiddleware, clearCart);

export default router;
