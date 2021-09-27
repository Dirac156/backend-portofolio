import { buildSchema } from "graphql";

export const schema = buildSchema(`
  type Query {
    profile(ukey: String!): Profile
  }
  type Mutation {
    register(email: String!, password: String!, confirmation: String!): RegisteredUser
    login(email: String!, password: String!): AccessToken
    confirm(email: String!): Boolean
  }
  type Profile {
    ukey: ID
    email: String
  }
  type RegisteredUser {
    ukey: ID
    tmp_confirm_token: ID
  }
  type AccessToken {
    ukey: ID
    access_token: ID
  }
`);

export const root = {

}
