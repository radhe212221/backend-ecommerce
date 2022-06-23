const url = process.env.MONGODB_URL;
const mongoose = require("mongoose");
mongoose.connect(url);

const productsSchema = new mongoose.Schema({
  title: String,
  desc: String,
  price: String,
  discount: String,
  tags: String,
  image: String,
});
const cartSchema = new mongoose.Schema({
  pid: String,
  uid: String,
  qty: String,
  title: String,
  desc: String,
  price: String,
  discount: String,
  tags: String,
  image: String,
  addedOn: String,
});
const ordersSchema = new mongoose.Schema({
  pid: String,
  uid: String,
  qty: String,
  title: String,
  desc: String,
  price: String,
  discount: String,
  tags: String,
  image: String,
  orderedOn: String,
});
const usersSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String,
  createdOn: String,
});
const products = new mongoose.model("products", productsSchema);
const cart = new mongoose.model("cart", cartSchema);
const orders = new mongoose.model("orders", ordersSchema);
const users = new mongoose.model("users", usersSchema);

module.exports = {
  products,
  cart,
  orders,
  users,
};
