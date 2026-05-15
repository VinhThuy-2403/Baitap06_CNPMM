const { Product, ProductImage } = require("../models/index");
const { Op } = require("sequelize");

const getProducts = async ({ where = {}, page = 1, limit = 6 }) => {
  const offset = (page - 1) * limit;
  const { count, rows } = await Product.findAndCountAll({
    where,
    limit,
    offset,
    order: [["createdAt", "DESC"]],
  });
  return {
    data: rows,
    pagination: {
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit),
    },
  };
};

const getSaleProducts = async ({ page, limit }) => {
  return getProducts({ where: { isSale: true }, page, limit });
};

const getNewProducts = async ({ page, limit }) => {
  return getProducts({ where: { isNew: true }, page, limit });
};

const getBestSellerProducts = async ({ page, limit }) => {
  return getProducts({ where: { isBestSeller: true }, page, limit });
};

const getAllProducts = async ({ page, limit, brand, category }) => {
  const where = {};
  if (brand) where.brand = brand;
  if (category) where.category = category;
  return getProducts({ where, page, limit });
};

// Lấy chi tiết 1 sản phẩm kèm ảnh
const getProductById = async (id) => {
  const product = await Product.findByPk(id, {
    include: [
      {
        model: ProductImage,
        as: "images",
        attributes: ["url", "order"],
        order: [["order", "ASC"]],
      },
    ],
  });
  if (!product) {
    const error = new Error("Sản phẩm không tồn tại");
    error.status = 404;
    throw error;
  }
  return product;
};

// Lấy sản phẩm tương tự (cùng danh mục, khác id)
const getRelatedProducts = async ({ category, excludeId, limit = 6 }) => {
  const rows = await Product.findAll({
    where: {
      category,
      id: { [Op.ne]: excludeId },
    },
    limit,
    order: [["sold", "DESC"]],
  });
  return rows;
};

module.exports = {
  getSaleProducts,
  getNewProducts,
  getBestSellerProducts,
  getAllProducts,
  getProductById,
  getRelatedProducts,
};