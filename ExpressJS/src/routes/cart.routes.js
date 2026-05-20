const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

// Tất cả routes đều cần đăng nhập
router.use(authMiddleware);

router.get("/", cartController.getCart);
router.post("/", cartController.addToCart);
router.put("/:id", cartController.updateCartItem);
router.delete("/:id", cartController.removeFromCart);
router.delete("/", cartController.clearCart);

module.exports = router;