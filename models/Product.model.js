const mongodb = require('mongodb');

const db = require('../data/database');

class Product {
  constructor(productData) {
    this.title = productData.title;
    this.summary = productData.summary;
    this.price = +productData.price;
    this.description = productData.description;
    this.image = productData.image;
    this.updateImageData();
    this.id = productData._id ? productData._id.toString() : undefined;
  }

  static async findById(productId) {
    let prodId;
    try {
      // let hex = /[0-9A-Fa-f]{6}/g;
      // prodId = hex.test(productId)
      //   ? new mongodb.ObjectId(productId)
      //   : productId;
      prodId = new mongodb.ObjectId(productId.trim());
    } catch (error) {
      error.code = 404;
      throw error;
    }
    const product = await db
      .getDb()
      .collection('products')
      .findOne({ _id: prodId });

    // console.log('FIND PRODUCT', product);

    if (!product) {
      const error = new Error(`Could not find product with provided id.`);
      error.code = 404;
      throw error;
    }

    return new Product(product);
  }

  static async findAll() {
    const allProducts = await db
      .getDb()
      .collection('products')
      .find()
      .toArray();

    return allProducts.map(function (productDocument) {
      return new Product(productDocument);
    });
  }

  updateImageData() {
    this.imagePath = `product-data/images/${this.image}`;
    this.imageUrl = `/products/assets/images/${this.image}`;
  }

  async save() {
    const productData = {
      title: this.title,
      summary: this.summary,
      price: this.price,
      description: this.description,
      image: this.image,
    };

    if (this.id) {
      const productId = new mongodb.ObjectId(this.id);

      if (!this.image) {
        delete productData.image;
      }

      await db
        .getDb()
        .collection('products')
        .updateOne({ _id: productId }, { $set: productData });
    } else {
      await db.getDb().collection('products').insertOne(productData);
    }
  }

  replaceImage(newImage) {
    this.image = newImage;
    this.updateImageData();
  }

  async remove() {
    const productId = new mongodb.ObjectId(this.id);

    await db.getDb().collection('products').deleteOne({ _id: productId });
  }
}

module.exports = Product;
