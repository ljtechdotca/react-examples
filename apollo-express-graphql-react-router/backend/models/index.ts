import { gql } from "apollo-server-express";

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
