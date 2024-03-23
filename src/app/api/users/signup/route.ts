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
        if ( userInstance ){
            return NextResponse.json({
                message : "🧐 User has Already Registered",
                status : 409
            })
        }
        
        const salt = await bcryptjs.genSalt(12);
        const passwordHash: string = await bcryptjs.hash(password, salt);
        console.log("Password Hash : " , passwordHash);
        



        const newUser = new  User({
            username,
            email,
            password : passwordHash
        });

        const userDbInstance = await newUser.save();

        if ( ! userDbInstance ){
            return NextResponse.json({
                status : 405, 
                error : "User is Not Register Properly"
            })
        }

        console.log(userDbInstance);
        

        //  Send Verification email 
        await EmailSend({
            email,
            emailtype : 'VERIFY',
            userId : userDbInstance._id
        })


        return NextResponse.json( {
            status : 250 ,
            success : true ,
            message : "User Registered Successfully",
            userDbInstance
        })



    } catch (error : any ) {
        return NextResponse
            .json({
                status : 509,
                message : "🧐 " + error.message,
            })
        
    }
}