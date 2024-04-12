import User from '@/Models/user.models.js';
import { NextRequest , NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connect } from '@/Database/index';

interface RequestBody  {
    email : string,
    password : string
    
} 
connect();

export const  POST = async ( req : NextRequest )=> {
    try {
        const requestBody : RequestBody  = await  req.json();
        console.log("try to log in User " , requestBody);
        const { email , password }  = requestBody;


        // Validation
        console.log("Email : " , email );

        const userInstance = await User.findOne({email});
        if ( !userInstance){
            return NextResponse.json({
                status : 409,
                message : "User is Not Found"
            })
        }

        const CorrectPassword : boolean= await bcryptjs.compare(password , userInstance.password);

        if ( !CorrectPassword){
            return NextResponse.json({
                status : 409,
                message : "Password or Email is wrong 🤷🤔"
            })
        }

        // creation of token and send it to database 
        const tokenpayload = {
            id  : userInstance._id,
            username : userInstance.username,
            email : userInstance.email
        }

        const token = jwt.sign(
            tokenpayload, process.env.TOKEN_SECRET!, { expiresIn: "30d" });

        const response = NextResponse.json({
            message : "User Logged In Successfully",
            status : 200,
            success : true
        })

        response.cookies.set("token" , token ,{
            httpOnly : true
        })

        return response;

    }catch (error : any ) {
        return NextResponse
            .json({
                status : 510,
                message : "🧐 " + error.message,
            })
    }
}