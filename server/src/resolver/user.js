const mongoose = require("mongoose")
const {AuthenticationError,UserInputError} = require("apollo-server")
const jwt= require("jsonwebtoken")
const {isAdmin,isAuthenticated}=require("./auth")
const {combineResolvers} = require("graphql-resolvers")
const createToken = async (user, secret, expiresIn) => {
    const { email, name } = user;
    return await jwt.sign({ email, name}, secret, {
      expiresIn,
    });
  };

const userResolver={
    Query:{
        getUser: async(parent,{email},{models}) => {
            try {
                return await models.User.findOne({email});
            } catch (error) {
                console.log({"msg":error.message});
            }
            
        },
        getAllUsers: async(parent,args,{models}) => {
            try {
                return await models.User.find({});
            } catch (error) {
                console.log({"msg":error.message});
            }
        },
        me: async(parent,args,{models}) => {
            if (!me) {
                return null;
              }
              return await models.User.findById(me.email);
        }
    },
    Mutation:{
        signup: async (
            parent,
            { name, email, password, status },
            { models, secret },
          ) => {
            const user = await models.User.create({
              name,
              email,
              password,
              status
            });
            console.log(user)
            return { token: createToken(user, secret, '30m') };
          },
        login:async(parent,{email,password},{models,me,secret})=>{
            const user=await models.User.findOne({email});
            if(!user)
            {
                throw new UserInputError('invalid credentials');
            }
            const isPasswordCorrect=await user.comparePassword(password)
            if(!isPasswordCorrect)
            {
                throw new AuthenticationError('Invalid password.');
            }
            return { token: createToken(user, secret, '30m') };
        },
        createUser: async(parent,{name,email,password,status},{models})=>{
            try {
                const user=await models.User.create({name,email,password,status});
                console.log(user)
            } catch (error) {
                console.log({"msg":error.message});
            }

        },
        updateUser:
            async(parent,{name,email},{models})=>{
                try {
                    return await models.User.findOneAndUpdate({email},{name},{
                        new:true,
                        runValidators:true
                    });
                } catch (error) {
                    console.log({"msg":error.message});
                }
            },
        deleteUser:
            async(parent,{email},{models,me})=>{
                try {
                    return await models.User.findOneAndRemove({email});
                } catch (error) {
                    console.log({"msg":error.message});
                }
            } 
    }
}

module.exports = userResolver