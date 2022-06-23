require("dotenv").config()
const models = require("./models");
const { products } = models;

let temp = [];

for (let i = 1; i <= 50; i++) {
  let data = {};
  data = { ...data, title: `title${i}` };
  data = { ...data, desc: `desc${i}` };
  data = { ...data, price: `${Math.ceil(Math.random() * 555)}` };
  data = { ...data, discount: `${Math.ceil(Math.random() * 25)}` };
  data = { ...data, tags: `${i % 2 === 0 ? "men" : "women"}` };
  data = { ...data, image: `/img/a (${i}).jpg` };
  temp.push(data);
}

products
  .insertMany(temp)
  .then((d) => console.log(d))
  .catch((e) => console.log(e));
