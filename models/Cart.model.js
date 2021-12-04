class Cart {
  constructor(items = []) {
    this.items = items;
  }

  addItem(product) {
    const cartItem = {
      product: product,
      quantity: 1,
      totalPrice: product.price,
    };

    for (let index = 0; index < this.items.length; index++) {
      const item = this.items[index];
      if (item.product.id === product.id) {
        cartItem.quantity = cartItem.quantity + 1;
        cartItem.totalPrice = cartItem.totalPrice + product.price;
        this.items[i] = cartItem;
        return;
      }
    }
    this.items.push(cartItem);
  }
}
