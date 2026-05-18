const productService = require("../services/product.service");

const getSaleProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const result = await productService.getSaleProducts({ page, limit });
    return res.json({ success: true, ...result });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getNewProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const result = await productService.getNewProducts({ page, limit });
    return res.json({ success: true, ...result });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getBestSellerProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const result = await productService.getBestSellerProducts({ page, limit });
    return res.json({ success: true, ...result });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const { brand, category } = req.query;
    const result = await productService.getAllProducts({ page, limit, brand, category });
    return res.json({ success: true, ...result });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);

    // Chỉ tăng views ở đây, không ở getRelatedProducts
    await productService.incrementViews(id);

    return res.json({ success: true, data: product });
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};

const getRelatedProducts = async (req, res) => {
  try {
    const { id } = req.params;

    // Dùng getProductById nhưng KHÔNG tăng views
    const product = await productService.getProductById(id);
    const related = await productService.getRelatedProducts({
      category: product.category,
      excludeId: id,
      limit: 6,
    });
    return res.json({ success: true, data: related });
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};

const searchProducts = async (req, res) => {
  try {
    const {
      keyword, brand, category,
      minPrice, maxPrice,
      isNew, isBestSeller, isSale, sortBy,
    } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const result = await productService.searchProducts({
      keyword, brand, category,
      minPrice, maxPrice,
      isNew, isBestSeller, isSale,
      sortBy, page, limit,
    });
    return res.json({ success: true, ...result });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getTopBestSeller = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const data = await productService.getTopBestSeller({ limit });
    return res.json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getTopMostViewed = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const data = await productService.getTopMostViewed({ limit });
    return res.json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const { category } = req.query;
    const result = await productService.getProductsByCategory({ category, page, limit });
    return res.json({ success: true, ...result });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getSaleProducts,
  getNewProducts,
  getBestSellerProducts,
  getAllProducts,
  getProductById,
  getRelatedProducts,
  searchProducts,
  getTopBestSeller,
  getTopMostViewed,
  getProductsByCategory,
};