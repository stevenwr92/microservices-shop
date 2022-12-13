const routes = require("express").Router();
const userController = require("../controller/user");

routes.post("/register", userController.register);

routes.post("/login", userController.login);

routes.get("/", userController.findUsers);

routes.get("/:user_id", userController.findById);

routes.put("/:user_id", userController.update);

routes.delete("/:user_id", userController.deleteUser);

module.exports = routes;
