const { ApolloServer } = require("apollo-server");
const port = 4001;
const { orderTypeDefs, orderResolvers } = require("./schema/order");
const { productTypeDefs, productResolvers } = require("./schema/product");
const { userTypeDefs, userResolvers } = require("./schema/user");

const server = new ApolloServer({
  resolvers: [userResolvers, productResolvers, orderResolvers],
  typeDefs: [userTypeDefs, productTypeDefs, orderTypeDefs],
});

server.listen({ port }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
