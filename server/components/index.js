const express=require('express')
const cors=require('cors')
const { graphqlHTTP } = require("express-graphql");
const schema =require('./schema')
const rootValue =require('./resolver')
const connectDB =require('./mongodb')
const app=express();
connectDB;
app.use(express.json());
app.use(cors());

  app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        rootValue,
        graphiql: true,
    })  
);



app.listen(3000,()=>console.log("running on 3000"));

module.exports=app;