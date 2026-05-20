const cartService = require("../services/cart.service");

const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await cartService.getCart(userId);
    return res.json({ success: true, ...result });
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};

const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "productId là bắt buộc",
      });
    }

    const cartItem = await cartService.addToCart(userId, productId, quantity);
    return res.status(201).json({
      success: true,
      message: "Đã thêm vào giỏ hàng",
      data: cartItem,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { quantity } = req.body;

    if (quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: "quantity là bắt buộc",
      });
    }

    const cartItem = await cartService.updateCartItem(userId, id, quantity);
    return res.json({
      success: true,
      message: quantity <= 0 ? "Đã xóa sản phẩm khỏi giỏ" : "Đã cập nhật số lượng",
      data: cartItem,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    await cartService.removeFromCart(userId, id);
    return res.json({
      success: true,
      message: "Đã xóa sản phẩm khỏi giỏ hàng",
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};

const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;
    await cartService.clearCart(userId);
    return res.json({
      success: true,
      message: "Đã xóa toàn bộ giỏ hàng",
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};