const routes = require("express").Router();
const productController = require("../controller/product");

routes.post("/add", productController.createProduct);

routes.get("/", productController.getProduct);

routes.get("/:product_id", productController.findProduct);

routes.put("/:product_id", productController.update);

routes.delete("/:product_id", productController.deleteProduct);

module.exports = routes;
