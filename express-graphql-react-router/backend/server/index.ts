import { Post } from "@types";
import { ApolloServer, gql } from "apollo-server-express";
import cors from "cors";
import express from "express";
import fs from "fs";
import path from "path";

// api models
export const typeDefs = gql`
  type Post {
    id: String
    title: String
    author: String
  }

  type Query {
    getUnique(id: String!): Post
    getMany: [Post]
  }

  type Mutation {
    post(title: String!, author: String!): Post
    delete(id: String!): Post
    update(id: String!, author: String!, title: String!): Post
  }
`;

let filePath, data;
let post: Post | null = null;
const dataPath = path.resolve(".", "backend", "data");

// helper functions for resolvers
export const parseFile = (path: string) => {
  return JSON.parse(fs.readFileSync(path, "utf-8"));
};

const kebab = (string: string) => {
  return string
    .replace(/[^a-zA-Z\s]/g, "")
    .replace(/\s/g, "-")
    .toLowerCase();
};

// api resolvers
export const resolvers = {
  Query: {
    getUnique(parent: any, args: any, context: any, info: any) {
      filePath = path.resolve(dataPath, args.id, "index.json");
      post = parseFile(filePath);

      return post;
    },
    getMany: async () => {
      let posts: Post[] = [];
      let dirs = fs.readdirSync(dataPath);
      dirs.forEach((dir) => {
        filePath = path.resolve(dataPath, dir, "index.json");
        posts.push(parseFile(filePath) as Post);
      });

      return posts;
    },
  },
  Mutation: {
    post: async (parent: any, args: any, context: any, info: any) => {
      const id = kebab(args.title);
      try {
        filePath = path.resolve(dataPath, id);
        fs.mkdirSync(filePath);
        filePath = path.resolve(filePath, "index.json");
        data = { ...args, id };
        fs.writeFileSync(filePath, JSON.stringify(data));

        return data;
      } catch (error) {
        console.log(error);
        return { ...args, id: "" };
      }
    },
    delete: async (parent: any, args: any, context: any, info: any) => {
      try {
        filePath = path.resolve(dataPath, args.id, "index.json");
        post = parseFile(filePath);
        filePath = path.resolve(dataPath, args.id);
        fs.rmdirSync(filePath, { recursive: true });

        return post;
      } catch (error) {
        console.log(error);
        return { ...args, title: "", author: "" };
      }
    },
    update: async (parent: any, args: any, context: any, info: any) => {
      try {
        filePath = path.resolve(dataPath, args.id, "index.json");
        data = { ...args };
        fs.writeFileSync(filePath, JSON.stringify(data));

        return data;
      } catch (error) {
        console.log(error);
        return { ...args, id: "" };
      }
    },
  },
};

// server instance
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
