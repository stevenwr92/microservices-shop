const { gql } = require("apollo-server");
const axios = require("axios");
const redis = require("../config/redis");

const typeDefs = gql`
  type Product {
    id: Int
    name: String
    imgUrl: String
    weight: Int
    price: Int
  }

  type SuccessDelete {
    message: String
  }

  type Query {
    getProducts: [Product]
    findProduct(id: String!): Product
  }

  input newProduct {
    name: String
    imgUrl: String
    weight: Int
    price: Int
  }
  input editProduct {
    name: String
    imgUrl: String
    weight: Int
    price: Int
  }

  type Mutation {
    addProduct(newProduct: newProduct): Product
    editProduct(editProduct: editProduct, id: String!): Product
    deleteProduct(id: String!): SuccessDelete
  }
`;

const resolvers = {
  Query: {
    getProducts: async () => {
      try {
        const productCache = await redis.get("app:product");

        if (productCache) return JSON.parse(productCache);
        const { data } = await axios.get("http://localhost:3001/product");

        await redis.set("app:product", JSON.stringify(data));
        return data;
      } catch (err) {
        throw err;
      }
    },
    findProduct: async (parent, args) => {
      try {
        const { data } = await axios.get(
          `http://localhost:3001/product/${args.id}`
        );
        return data;
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    addProduct: async (_, args) => {
      try {
        const { data } = await axios.post(
          `http://localhost:3001/product/add`,
          args.newProduct
        );
        await redis.del("app:product");
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    editProduct: async (_, args) => {
      try {
        const { data } = await axios.put(
          `http://localhost:3001/product/${args.id}`,
          args.editProduct
        );
        await redis.del("app:product");
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    deleteProduct: async (parent, args) => {
      try {
        const { data } = await axios.delete(
          `http://localhost:3001/product/${args.id}`
        );
        await redis.del("app:product");
        return data;
      } catch (err) {
        console.log(err);
      }
    },
  },
};

module.exports = {
  productTypeDefs: typeDefs,
  productResolvers: resolvers,
};
