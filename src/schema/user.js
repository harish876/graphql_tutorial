const {gql} = require("apollo-server-express")

const userSchema=gql`
 scalar date
 type Token {
    token: String
 }
 type User {
	id: Int
	name: String
	email: String
    password: String
	status: Boolean
 }
 extend type Query {
	getUser(email: String): User
	getAllUsers: [User]
  } 
 extend type Mutation {
	createUser(id:Int,name:String,email:String,password:String,status: Boolean): User
  }
`;
module.exports=userSchema