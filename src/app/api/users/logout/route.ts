import { connect } from '@/Database/index';
import { NextRequest , NextResponse } from 'next/server';

connect();
export async function GET( req : NextRequest ){
    try {
        
        // operation of removing Cookies 
        const response = NextResponse.json({
            message : "User Logged Out Successfully",
            success : true
        })

        response.cookies.delete("token")

        return response;

    } catch (error :  any ) {
        return NextResponse
            .json({
                status : 509,
                message : "🧐 " + error.message,
            })
        
    }
    
}