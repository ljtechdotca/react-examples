import { Post } from "@types";
import fs from "fs";
import path from "path";
import { kebab, parseFile } from "../helpers";

let filePath, data;
let post: Post | null = null;
const dataPath = path.resolve(".", "backend", "data");

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
        console.log("CREATED", { data });
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
        console.log("UPDATED", { data });
        return data;
      } catch (error) {
        console.log(error);
        return { ...args, id: "" };
      }
    },
  },
};
