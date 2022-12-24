let users=[
    {
        id:1,
        name: "Harish",
		email: "harishgokul01@gmai.com",
        status: true
    },
    {
        id:2,
        name: "Sarish",
		email: "sarishgokul01@gmai.com",
        status: true
    },
    {
        id:3,
        name: "Rarish",
		email: "rarishgokul01@gmai.com",
        status: false
    },
    {
        id:4,
        name: "Garish",
		email: "garishgokul01@gmai.com",
        status: false
    },
]
const userResolver={
    Query:{
        getUser: async(root,{id}) => {return users[id-1]},
        getAllUsers: async() => {return users},
    },
    Mutation:{
        createUser: async(root,{id,name,email,status})=>{
            const newUser = new Object({id,name,email,status})
            users.push(newUser)
            console.log(users)
            return {...newUser}
        }
    }
}

module.exports = userResolver