const routes = require("express").Router();
const productRoutes = require("./product");

routes.use("/product", productRoutes);

module.exports = routes;
