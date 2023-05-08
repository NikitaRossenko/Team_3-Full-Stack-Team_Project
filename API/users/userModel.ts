import mongoose  , {Schema} from 'mongoose'

export interface User{
    firstName:string , 
    lastName:string,
    userName:string,
    email:string,
    highScore?:number,
    coin?:number
}

export enum ROLE{
    NORMAL = "normal",
    ADMIN = "admin"
}

export const UserSchema = new Schema({
    firstName:{
        type:String,
        require:true
    } ,
    lastName:{
        type:String,
        require:true
    } ,
    userName:{
        type:String,
        require:true
    } ,
    email:{
        type:String,
        require:true
    } ,
    src: {
        type:String ,
        required:true 

    } ,
    highScore:{
        type:String,
        require:false
    } ,
    coin:{
        type:String,
        require:false
    } ,
    ROLE:{
        type:String ,
        enum:ROLE ,
        default:ROLE.NORMAL        
    }

})

const UserModel = mongoose.model("users" , UserSchema)

export default UserModel
