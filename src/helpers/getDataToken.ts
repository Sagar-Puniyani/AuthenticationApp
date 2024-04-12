import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export const getDataFromToken = (req : NextRequest) =>  {
    try {
        console.log("Getting Token Data");
        
        const token = req.cookies.get("token")?.value   || ""  
        const decodedToken : any   = jwt.verify(token , process.env.TOKEN_SECRET! );
        console.log("Decoded Token ✅ : " , decodedToken);
        
        return decodedToken.id

    } catch (error :  any ) {
            throw new Error(
                error.message
            )
    }
}