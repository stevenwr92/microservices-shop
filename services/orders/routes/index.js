const routes = require("express").Router();
const orderRoutes = require("./order");

routes.use("/order", orderRoutes);

module.exports = routes;
