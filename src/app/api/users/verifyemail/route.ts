import { connect } from "@/Database";
import User from "@/Models/user.models";
import { NextRequest, NextResponse } from "next/server";

connect();

interface RequestBody{
    token : string
}

export  const  POST = async ( req : NextRequest) => {
    try {
        
        const requestBody : RequestBody = await req.json();
        const { token } = requestBody;
        console.log("Login Token : " , token);
        
        if ( !token ){
            return NextResponse.json({
                status : 459,
                message : "User Never Logged In"
            })
        }

        const userDbInstance = await User.findOne( {verifyToken : token ,
            verifyTokenExpiry : {$gt : Date.now()}}).select("-password");
        
        if ( !userDbInstance ){
            return NextResponse.json({
                status : 409,
                message : "User is Not Found"
            })
        }
        console.log(userDbInstance);
        
        // verification is Complete and now, verify related token are cleared 
        userDbInstance.isVerified = true,
        userDbInstance.verifyToken = undefined ,
        userDbInstance.verifyTokenExpiry = undefined

        await userDbInstance.save()

        return NextResponse.json({
            status : 200,
            message : "Email Verification Successfully",
            success : true,
            user : userDbInstance
        })


    } catch (error : any ) {
        return NextResponse.json({
            status : 500,
            error : error.message
        })
    }
}