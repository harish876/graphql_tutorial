require('dotenv').config();
const {ApolloServer}=require('apollo-server-express');
const express=require("express")
const models = require("./src/models")

const schema=require("./src/schema/index")
const controllers= require("./src/resolver")

//middleware
const cors=require("cors");

const PORT =4000

//connectDB
const connectDB=require("./src/db/connect")

const app = express()
app.use(cors());

const server = new ApolloServer({
  introspection:true, 
  typeDefs:schema,
  resolvers:controllers,
  context:{
    models
  }
});
server.applyMiddleware({ app })

const start = async () => {
    try {
      await connectDB(process.env.MONGO_URI);
      app.listen({port:PORT}, () =>{
            console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
        }
      )
    } catch (error) {
      console.log(error);
    }
};
start()
  