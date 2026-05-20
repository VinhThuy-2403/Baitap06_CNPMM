const { Cart, Product } = require("../models/index");

// Lấy giỏ hàng của user
const getCart = async (userId) => {
  const items = await Cart.findAll({
    where: { userId },
    include: [
      {
        model: Product,
        as: "product",
        attributes: [
          "id", "name", "price", "salePrice",
          "image", "stock", "brand", "category",
        ],
      },
    ],
    order: [["createdAt", "DESC"]],
  });

  const total = items.reduce((sum, item) => {
    const price = item.product.salePrice || item.product.price;
    return sum + price * item.quantity;
  }, 0);

  return { items, total, count: items.length };
};

// Thêm sản phẩm vào giỏ
const addToCart = async (userId, productId, quantity) => {
  // Kiểm tra sản phẩm tồn tại
  const product = await Product.findByPk(productId);
  if (!product) {
    const error = new Error("Sản phẩm không tồn tại");
    error.status = 404;
    throw error;
  }

  // Kiểm tra tồn kho
  if (product.stock === 0) {
    const error = new Error("Sản phẩm đã hết hàng");
    error.status = 400;
    throw error;
  }

  // Kiểm tra đã có trong giỏ chưa
  const existing = await Cart.findOne({ where: { userId, productId } });

  if (existing) {
    // Kiểm tra số lượng không vượt stock
    const newQty = existing.quantity + quantity;
    if (newQty > product.stock) {
      const error = new Error(`Chỉ còn ${product.stock} sản phẩm trong kho`);
      error.status = 400;
      throw error;
    }
    await existing.update({ quantity: newQty });
    return existing;
  }

  // Kiểm tra quantity không vượt stock
  if (quantity > product.stock) {
    const error = new Error(`Chỉ còn ${product.stock} sản phẩm trong kho`);
    error.status = 400;
    throw error;
  }

  const cartItem = await Cart.create({ userId, productId, quantity });
  return cartItem;
};

// Cập nhật số lượng
const updateCartItem = async (userId, cartItemId, quantity) => {
  const cartItem = await Cart.findOne({
    where: { id: cartItemId, userId },
    include: [{ model: Product, as: "product" }],
  });

  if (!cartItem) {
    const error = new Error("Không tìm thấy sản phẩm trong giỏ hàng");
    error.status = 404;
    throw error;
  }

  if (quantity > cartItem.product.stock) {
    const error = new Error(`Chỉ còn ${cartItem.product.stock} sản phẩm trong kho`);
    error.status = 400;
    throw error;
  }

  if (quantity <= 0) {
    await cartItem.destroy();
    return null;
  }

  await cartItem.update({ quantity });
  return cartItem;
};

// Xóa 1 sản phẩm khỏi giỏ
const removeFromCart = async (userId, cartItemId) => {
  const cartItem = await Cart.findOne({ where: { id: cartItemId, userId } });
  if (!cartItem) {
    const error = new Error("Không tìm thấy sản phẩm trong giỏ hàng");
    error.status = 404;
    throw error;
  }
  await cartItem.destroy();
};

// Xóa toàn bộ giỏ hàng
const clearCart = async (userId) => {
  await Cart.destroy({ where: { userId } });
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};