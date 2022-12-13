const { gql } = require("apollo-server");
const axios = require("axios");
// const redis = require("./config/redis");

const typeDefs = gql`
  type User {
    _id: String
    name: String
    address: String
    email: String
  }

  type Order {
    userId: String
    productsId: [String]
  }

  type Product {
    name: String
    imgUrl: String
    weight: Int
    price: Int
  }
  type OrderById {
    User: User
    Products: [Product]
  }

  type Query {
    getOrders(id: String!): [Order]
    getOrdersById(id: Int!): OrderById
  }

  input newOrder {
    userId: String
    productId: String
  }

  type Mutation {
    addOrder(newOrder: newOrder): Order
    # editUser(editUser: editUser, id: String!): User
    # deleteUser(id: String!): DeleteMessage
  }
`;

const resolvers = {
  Query: {
    getOrders: async (parent, args) => {
      try {
        const { data: order } = await axios.get(
          `http://localhost:3003/order/${args.id}`
        );
        return order;
      } catch (err) {
        throw err;
      }
    },

    getOrdersById: async (parent, args) => {
      try {
        const { data: order } = await axios.get(
          `http://localhost:3003/order/no/${args.id}`
        );

        let { data: user } = await axios.get(
          `http://localhost:3000/${order.userId}`
        );

        let { data: product } = await axios.get(
          `http://localhost:3000/${order.userId}`
        );
        order.User = user;
        console.log(order.productsId);
        return order;
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    addOrder: async (_, args) => {
      try {
        const { data } = await axios.post(
          `http://localhost:3003/order/add`,
          args.newOrder
        );
        console.log(args);
        console.log(data);
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    // editUser: async (_, args) => {
    //   try {
    //     console.log(args);
    //     const { data } = await axios.put(
    //       `http://localhost:3000/${args.id}`,
    //       args.editUser
    //     );
    //     return data;
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
    // deleteUser: async (parent, args) => {
    //   try {
    //     const { data } = await axios.delete(`http://localhost:3000/${args.id}`);
    //     return data;
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
  },
};

module.exports = {
  orderTypeDefs: typeDefs,
  orderResolvers: resolvers,
};
