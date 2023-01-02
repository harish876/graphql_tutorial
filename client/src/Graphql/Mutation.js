import {gql} from '@apollo/client'

export const CREATE_USER = gql`
    mutation createUser(
        $name:String,
        $email:String,
        $password:String,
        $status: Boolean){
            createUser(
                name: $name,
                email: $email,
                password: $password,
                status: $status
            ){
                name
            }
        }
`
export const UPDATE_USER=gql`
    mutation updateUser(
        $name:String,
        $email:String,
        $status:Boolean
    ){
        updateUser(
            name:$name,
            email:$email,
            status:$status
        ){
            name
        }
    }
`
export const DELETE_USER=gql`
    mutation deleteUser(
        $email:String
    ){
        deleteUser(
            email:$email
        ){
            name
        }
    }
`