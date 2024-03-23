import mongoose from "mongoose";
import { DB_NAME } from "@/helpers/constant";
export async function connect(){
    try {
        const DB_NAME = `AuthenticationDB`;
        await mongoose.connect(`${process.env.MONGODB_URL}${DB_NAME}`);

        const connection = mongoose.connection;
        console.log("Trying to connect with Database ");
        
        connection.on("connected" , () => {
            console.log("Mongo DB is Connected");
        })

        connection.on( "error" , (error  )=>{
            console.log("Error " , error);
            
        })

        
    } catch (error) {
        console.log("DB Connection Error");
        console.log(error);
        process.exit(1); 
    }
}