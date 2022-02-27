import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import { typeDefs } from "../models";
import { resolvers } from "../resolvers";

const port = process.env.PORT || 3001;
const server = new ApolloServer({ typeDefs, resolvers });
const app = express();

const main = async () => {
  await server.start();
  server.applyMiddleware({ app });
  app.use(cors({ origin: true, credentials: true }));

  app.listen(port, () =>
    console.log(`CORS-enabled web server listening on ${port}`)
  );
};

main();
