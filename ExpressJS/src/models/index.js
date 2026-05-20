const Product = require("./product.model");
const ProductImage = require("./productImage.model");
const Cart = require("./cart.model");
const User = require("./user.model");

// Product - ProductImage
Product.hasMany(ProductImage, { foreignKey: "productId", as: "images" });
ProductImage.belongsTo(Product, { foreignKey: "productId", as: "product" });

// User - Cart
User.hasMany(Cart, { foreignKey: "userId", as: "carts" });
Cart.belongsTo(User, { foreignKey: "userId", as: "user" });

// Product - Cart
Product.hasMany(Cart, { foreignKey: "productId", as: "carts" });
Cart.belongsTo(Product, { foreignKey: "productId", as: "product" });

module.exports = { Product, ProductImage, Cart, User };