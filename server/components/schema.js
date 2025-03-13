const { buildSchema } = require("graphql");

const schema = buildSchema(`
    type loginData
    {
        id:Int
        user:String
    }
   type Query {
        login(email: String!, password: String!): loginData
    }
    
    type Mutation
    {
        register(first_name: String!,last_name: String!, email: String!, password: String!): String
    }
`);

module.exports=schema;