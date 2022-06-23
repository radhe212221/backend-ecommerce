require('dotenv').config()

const PORT = process.env.PORT || 4000;
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes");
const { authMiddleware,logger } = require("./utils");

const app = express();
app.use(logger);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/login", routes.login);
app.post("/signup", routes.signup);
app.get("/products", routes.getProducts);
app.get("/tags", routes.getTags);
app.get("/cart", authMiddleware, routes.getCart);
app.get("/orders", authMiddleware, routes.getOrders);
app.post("/checkout", authMiddleware, routes.checkout);
app.post("/add-to-cart", authMiddleware, routes.addtocart);
app.delete("/remove-from-cart/:id", authMiddleware, routes.removefromcart);
app.patch("/update-cart/:id", authMiddleware, routes.updateCart);

app.listen(PORT, () => console.log("server started in " + PORT));
