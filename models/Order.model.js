const db = require('../data/database');

class Order {
  constructor(cart, userData, status = 'pending', date, orderId) {
    this.productData = cart;
    this.userData = userData;
    this.status = status;
    this.date = new Date(date);
    if (this.date) {
      this.formattedDate = this.date.toLocaleDateString('ua-UA', {
        weekday: 'short',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    }

    this.id = orderId;
  }

  save() {
    if (this.id) {
      //Updating
    } else {
      const orderDocument = {
        userData: this.userData,
        productData: this.productData,
        status: this.status,
        date: new Date(),
      };

      return db.getDb().collection('orders').insertOne(orderDocument);
    }
  }
}

module.exports = Order;
