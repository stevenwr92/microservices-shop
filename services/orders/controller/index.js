const { test } = require("../models");

class orderController {
  static async getOrder(req, res, next) {
    try {
      const id = req.params.userId;
      const Order = await test.findAll({ where: { userId: id } });
      res.status(200).json(Order);
    } catch (err) {
      console.log(err);
    }
  }

  static async createOrder(req, res, next) {
    try {
      let items = req.body.productId;
      const array = [items];
      let body = {
        userId: req.body.userId,
        productsId: array,
      };
      let newOrder = await test.create(body);
      res.status(201).json(newOrder);
    } catch (err) {
      console.log(err);
    }
  }

  //   static async update(req, res, next) {
  //     try {
  //       const id = req.params.product_id;
  //       let body = {
  //         name: req.body.name,
  //         imgUrl: req.body.imgUrl,
  //         weight: req.body.weight,
  //         price: req.body.price,
  //       };

  //       const product = await Products.findByPk(id);
  //       console.log(product);
  //       await Products.update(body, { where: { id } });

  //       res.status(201).json({
  //         id,
  //         name: req.body.name,
  //         imgUrl: req.body.imgUrl,
  //         weight: req.body.weight,
  //         price: req.body.price,
  //       });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }

  static async findOrder(req, res, next) {
    try {
      const id = req.params.orderId;
      let data = await test.findByPk(id);
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
    }
  }

  //   static async deleteProduct(req, res, next) {
  //     try {
  //       const id = req.params.product_id;
  //       const product = await Products.findByPk(id);
  //       console.log(product);
  //       const result = await Products.destroy({ where: { id } });

  //       if (result !== 0) {
  //         res.status(200).json({
  //           message: `SUCCESS delete ${product.name}`,
  //         });
  //       } else {
  //         throw { name: "NotFound" };
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
}

module.exports = orderController;
