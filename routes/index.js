const { users, products, cart, orders } = require("../models");

const login = (req, res, next) => {
  res.json({ msg: "login" });
};
const signup = (req, res, next) => {
  res.json({ msg: "signup" });
};
const getProducts = (req, res, next) => {
  res.json({ msg: "getProducts" });
};
const getTags = (req, res, next) => {
  res.json({ msg: "getTags" });
};
const getCart = (req, res, next) => {
  res.json({ msg: "getCart" });
};
const getOrders = (req, res, next) => {
  res.json({ msg: "getOrders" });
};
const checkout = (req, res, next) => {
  res.json({ msg: "checkout" });
};
const addtocart = (req, res, next) => {
  res.json({ msg: "addtocart" });
};
const removefromcart = (req, res, next) => {
  res.json({ msg: "removefromcart" });
};
const updateCart = (req, res, next) => {
  res.json({ msg: "updateCart" });
};

module.exports = {
  login,
  signup,
  getProducts,
  getTags,
  getCart,
  getOrders,
  checkout,
  addtocart,
  removefromcart,
  updateCart,
};
