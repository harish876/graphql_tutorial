const mongoose = require("mongoose")
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
                return await models.User.findAll({});
            } catch (error) {
                console.log({"msg":error.message});
            }
        },
    },
    Mutation:{
        createUser: async(parent,{name,email,password,status},{models})=>{
            try {
                const user=await models.User.create({name,email,password,status});
                console.log(user)
            } catch (error) {
                console.log({"msg":error.message});
            }
            

        }
    }
}

module.exports = userResolver