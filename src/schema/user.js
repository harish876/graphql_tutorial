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
	me: User
  } 
 extend type Mutation {
	createUser(name:String,email:String,password:String,status: Boolean): User
	updateUser(name:String,email:String): User
	deleteUser(email:String): User
	signup(name:String,email:String,password:String,status: Boolean): Token
	login(email:String,password:String): Token
  }
`;
module.exports=userSchema