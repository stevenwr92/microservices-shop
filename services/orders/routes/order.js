const routes = require("express").Router();
const orderController = require("../controller/index");

routes.post("/add", orderController.createOrder);

routes.get("/:userId", orderController.getOrder);

routes.get("/no/:orderId", orderController.findOrder);

// routes.put("/:product_id", productController.update);

// routes.delete("/:product_id", productController.deleteProduct);

module.exports = routes;
