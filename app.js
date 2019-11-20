const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");



const usersRoutes = require("./routes/api/users");
const productsRoutes = require("./routes/api/products");
const orderRoutes = require("./routes/api/orders");

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use("/users", usersRoutes);
app.use("/products", productsRoutes);
app.use("/orders", orderRoutes);

module.exports = app;