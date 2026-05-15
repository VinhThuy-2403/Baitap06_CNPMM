const Product = require("./product.model");
const ProductImage = require("./productImage.model");

Product.hasMany(ProductImage, {
  foreignKey: "productId",
  as: "images",
});

ProductImage.belongsTo(Product, {
  foreignKey: "productId",
  as: "product",
});

module.exports = { Product, ProductImage };