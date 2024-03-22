import { connect } from '@/Database';
import User from '@/Models/user.models.js';
import { NextRequest , NextResponse } from 'next/server';

connect()

export async function POST( req : NextRequest ){
    try {
        
    } catch (error : any ) {
        NextResponse
            .json({
                status : 500,
                message : error.message,
            })
        
    }
}