const { ForbiddenError } = require("apollo-server-express");
const {skip,combineResolvers} = require("graphql-resolvers")

const isAuthenticated=(parent,args,{me})=>{
    if(me)
        return skip;
    
    return new ForbiddenError("User is not authenticated");
}

const isAdmin=combineResolvers(
    isAuthenticated,
    (parent, args , { me : {status}}) => {
        return status === true ? skip : new ForbiddenError('user is not authz for this operation');
    }
)

module.export={isAuthenticated,isAdmin}