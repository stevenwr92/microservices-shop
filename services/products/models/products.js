"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Products.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "name is required",
          },
          notEmpty: {
            msg: "name is required",
          },
        },
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "imgUrl is required",
          },
          notEmpty: {
            msg: "imgUrl is required",
          },
        },
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "weight is required",
          },
          notEmpty: {
            msg: "weight is required",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "price is required",
          },
          notEmpty: {
            msg: "price is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Products",
    }
  );
  return Products;
};
