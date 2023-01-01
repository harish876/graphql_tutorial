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
//createUser(name:String,email:String,password:String,status: Boolean): User