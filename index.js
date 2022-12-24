const {ApolloServer}=require('apollo-server-express');
const express=require("express")

const schema=require("./src/schema/index")
const resolvers=require("./src/resolver")

const PORT =4000

const app = express()
const server = new ApolloServer({
  introspection:true, 
  typeDefs:schema,
  resolvers,
});
server.applyMiddleware({ app })

app.listen({port:PORT},()=>{
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
})
  