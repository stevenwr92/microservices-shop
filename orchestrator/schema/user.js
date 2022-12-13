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

  type DeleteMessage {
    acknowledged: Boolean
    deletedCount: Int
  }

  type Query {
    getUsers: [User]
    findUserById(id: String!): User
  }

  input newUser {
    name: String
    address: String
    email: String
    password: String
  }
  input editUser {
    name: String
    address: String
    email: String
    password: String
  }

  type Mutation {
    addUser(newUser: newUser): User
    editUser(editUser: editUser, id: String!): User
    deleteUser(id: String!): DeleteMessage
  }
`;

const resolvers = {
  Query: {
    getUsers: async () => {
      try {
        const { data } = await axios.get("http://localhost:3000");
        return data;
      } catch (err) {
        throw err;
      }
    },
    findUserById: async (parent, args) => {
      try {
        const { data } = await axios.get(`http://localhost:3000/${args.id}`);
        console.log(data);
        return data;
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    addUser: async (_, args) => {
      try {
        const { data } = await axios.post(
          `http://localhost:3000/register`,
          args.newUser
        );
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    editUser: async (_, args) => {
      try {
        console.log(args);
        const { data } = await axios.put(
          `http://localhost:3000/${args.id}`,
          args.editUser
        );
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    deleteUser: async (parent, args) => {
      try {
        const { data } = await axios.delete(`http://localhost:3000/${args.id}`);
        return data;
      } catch (err) {
        console.log(err);
      }
    },
  },
};

module.exports = {
  userTypeDefs: typeDefs,
  userResolvers: resolvers,
};
