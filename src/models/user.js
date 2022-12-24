const mongoose=require("mongoose");


const userSchema=new mongoose.Schema({

    name:{
        type:String,
        required:[true,'please provide the user name'],
        minLength:3,
        maxLength:50
    },
    email:{
        type:String,
        required:[true,'please provide the user email'],
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please fill a valid email address'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'please provide the password'],
        minLength:6,
    },
    status:{
        type: Boolean,
        required:[true,'please provide the user status']
    }

});

module.exports=mongoose.model('User',userSchema);