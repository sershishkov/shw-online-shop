const Product = require('../models/Product.model');

function getGart(req, res) {
  res.render('customer/cart/cart');
}

async function addCartItem(req, res, next) {
  let product;
  // console.log('req.body.productId??', req.body.productId);
  // console.log('req.body._csrf??', req.body._csrf);
  try {
    product = await Product.findById(req.body.productId);
    // console.log(product);
  } catch (error) {
    next(error);
    return;
  }

  const cart = res.locals.cart;
  cart.addItem(product);
  req.session.cart = cart;

  res.status(201).json({
    message: 'Cart updated',
    newTotalItems: cart.totalQuantity,
  });
}

function updateCartItem(req, res, next) {
  const cart = res.locals.cart;
  const updatedItemData = cart.updateItem(
    req.body.productId,
    req.body.quantity
  );
  req.session.cart = cart;

  res.status(201).json({
    message: 'Item updated',
    updatedCartData: {
      newTotalQuantity: cart.totalQuantity,
      newTotalPrice: cart.totalPrice,
      updatedItemPrice: updatedItemData.updatedItemPrice,
    },
  });
}

module.exports = {
  addCartItem,
  getGart,
  updateCartItem,
};
