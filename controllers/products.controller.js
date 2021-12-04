const Product = require('../models/Product.model');

async function getAllProducts(req, res, next) {
  try {
    const products = await Product.findAll();
    res.render('customer/products/all-products', { products });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getAllProducts,
};
