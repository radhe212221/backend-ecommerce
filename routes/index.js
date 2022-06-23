const { users, products, cart, orders } = require("../models");
const { encode } = require("../utils");

const login = (req, res, next) => {
  let { email, password } = req.body;
  users
    .findOne({ email, password })
    .then((d) => (d ? Promise.resolve(d) : Promise.reject("invalid user")))
    .then((d) =>
      encode(d?.id)
        ? Promise.resolve(encode(d?.id))
        : Promise.reject("invalid token")
    )
    .then((d) => res.json({ status: true, data: d, err: null }))
    .catch((err) => res.json({ status: false, data: null, err }));
};
const signup = (req, res, next) => {
  let { name, email, phone, password } = req.body;
  let createdOn = Date.now();
  users
    .findOne({ email })
    .then((d) =>
      d
        ? Promise.reject("already exists")
        : Promise.resolve({ ...req.body, createdOn })
    )
    .then((d) => users.create(d))
    .then((d) => res.json({ status: true, data: d, err: null }))
    .catch((err) => res.json({ status: false, data: null, err }));
};
const getProducts = (req, res, next) => {
  products
    .find()
    .then((d) => res.json({ status: true, data: d, err: null }))
    .catch((err) => res.json({ status: false, data: null, err }));
};
const getTags = (req, res, next) => {
  products
    .find()
    .then((d) => {
      let temp = Array.from(new Set(d?.map((x) => x?.tags)));
      temp = temp?.map((x) => ({
        t: x,
        c: d?.filter((y) => y.tags === x)?.length,
      }));
      return temp;
    })
    .then((d) => res.json({ status: true, data: d, err: null }))
    .catch((err) => res.json({ status: false, data: null, err }));
};
const getCart = (req, res, next) => {
  let uid = req.uid;
  cart
    .find({ uid })
    .then((d) => res.json({ status: true, data: d, err: null }))
    .catch((err) => res.json({ status: false, data: null, err }));
};
const getOrders = (req, res, next) => {
  let uid = req.uid;
  orders
    .find({ uid })
    .then((d) => res.json({ status: true, data: d, err: null }))
    .catch((err) => res.json({ status: false, data: null, err }));
};
const checkout = (req, res, next) => {
  res.json({ msg: "checkout" });
};
const addtocart = (req, res, next) => {
  let uid = req.uid;
  let {
    pid,
    qty,
    title,
    desc,
    price,
    discount,
    tags,
    image,
    addedOn,
    updatedOn,
  } = req.body;

  cart
    .findOne({ pid, uid })
    .then((d) => {
      if (d?.id) {
        return cart.findByIdAndUpdate(d?.id, { qty: d?.qty + 1 });
      } else {
        return cart.create({ ...req.body, uid, addedOn: Date.now(), qty: 1 });
      }
    })
    .then((d) => res.json({ status: true, data: d, err: null }))
    .catch((err) => res.json({ status: false, data: null, err }));
};
const removefromcart = (req, res, next) => {
  let { id } = req.params;
  cart
    .findByIdAndDelete(id)
    .then((d) => res.json({ status: true, data: d, err: null }))
    .catch((err) => res.json({ status: false, data: null, err }));
};
const updateCart = (req, res, next) => {
  let { id } = req.params;
  let { qty } = req.body;
  cart
    .findByIdAndUpdate(id, { qty })
    .then((d) => res.json({ status: true, data: d, err: null }))
    .catch((err) => res.json({ status: false, data: null, err }));
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
