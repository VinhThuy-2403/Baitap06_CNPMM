const Product = require("../models/product.model");

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

module.exports = {
  getSaleProducts,
  getNewProducts,
  getBestSellerProducts,
  getAllProducts,
};