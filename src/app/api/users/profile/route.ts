import { connect } from '@/Database/index';
import User from '@/Models/user.models';
import { getDataFromToken } from '@/helpers/getDataToken';
import { NextRequest , NextResponse } from 'next/server';

connect();
export async function GET( req : NextRequest ){
    try {
        // extract payload from the Token 
        const userId = getDataFromToken(req);

        const userInstance = await User.findById(userId);
        userInstance.select("-password -verifyToken -forgotPasswordToken -forgotPasswwordTokenExpiry -verifyTokenExpiry");
        
        return NextResponse.json({
            status : 203,
            message : "Profile Accessed Successfully",
            success : true,
            data: userInstance
        })
        

    } catch (error :  any ) {
        return NextResponse
            .json({
                status : 509,
                message : "🧐 " + error.message,
            })
        
    }
    
}