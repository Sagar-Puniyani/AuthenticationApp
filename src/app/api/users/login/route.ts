import { connect } from '@/Database/index';
import User from '@/Models/user.models.js';
import { NextRequest , NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { EmailSend } from '@/helpers/mailer';


connect();
interface RequestBody  {
    username : string,
    email : string,
    password : string
    
} 

export async function POST( req : NextRequest ){
    try {
        
        const requestBody : RequestBody = await  req.json();
        const {username , email , password }  = requestBody;

        // Validation
        console.log(requestBody);

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
        

    }catch (error : any ) {
        return NextResponse
            .json({
                status : 509,
                message : "🧐 " + error.message,
            })
        
    }
}