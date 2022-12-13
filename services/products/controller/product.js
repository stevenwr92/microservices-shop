const { Products } = require("../models");

class productController {
  static async getProduct(req, res, next) {
    try {
      const product = await Products.findAll();
      res.status(200).json(product);
    } catch (err) {
      console.log(err);
    }
  }

  static async createProduct(req, res, next) {
    try {
      let body = {
        name: req.body.name,
        imgUrl: req.body.imgUrl,
        weight: req.body.weight,
        price: req.body.price,
      };
      console.log(body);
      let newProduct = await Products.create(body);
      res.status(201).json(newProduct);
    } catch (err) {
      console.log(err);
    }
  }

  static async update(req, res, next) {
    try {
      const id = req.params.product_id;
      let body = {
        name: req.body.name,
        imgUrl: req.body.imgUrl,
        weight: req.body.weight,
        price: req.body.price,
      };

      const product = await Products.findByPk(id);
      console.log(product);
      await Products.update(body, { where: { id } });

      res.status(201).json({
        id,
        name: req.body.name,
        imgUrl: req.body.imgUrl,
        weight: req.body.weight,
        price: req.body.price,
      });
    } catch (err) {
      console.log(err);
    }
  }

  static async findProduct(req, res, next) {
    try {
      const id = req.params.product_id;
      let data = await Products.findByPk(id);
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const id = req.params.product_id;
      const product = await Products.findByPk(id);
      console.log(product);
      const result = await Products.destroy({ where: { id } });

      if (result !== 0) {
        res.status(200).json({
          message: `SUCCESS delete ${product.name}`,
        });
      } else {
        throw { name: "NotFound" };
      }
    } catch (err) {
      console.log(err);
    }
  }
}

//   static async deletePost(req, res, next) {
//     try {
//       const id = req.params.id;
//       const result = await Post.destroy({ where: { id } });

//       if (result !== 0) {
//         res.status(200).json({
//           message: `SUCCESS delete`,
//         });
//       } else {
//         throw { name: "NotFound" };
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   }

module.exports = productController;
