import mongoose from "mongoose";

const UserSchema = new  mongoose.Schema(
    {
        username : {
            type : String,
            required : [true , "Please provide a username"],
            trim : true,
            unique : true,
            lowercase : true,
            index : true
        },
        email : {
            type : String,
            required : [true , "Please provide a email"],
            trim : true,
            unique : true,
            lowercase : true,
            index : true
        },
        password : {
            type : String,
            required : [true , 'Password is required '],
        },
        isVerified : {
            type : Boolean ,
            default : false             
        },
        isAdmin : {
            type : Boolean ,
            default : false 
        },
        forgotPasswordToken : String ,
        forgotPasswwordTokenExpiry : Date,
        verifyToken : String,
        verifyTokenExpiry : Date 
    },
    {
        timestamps : true
    }
)

const User = mongoose.model.users ||  mongoose.model("users" , UserSchema);

export default User;