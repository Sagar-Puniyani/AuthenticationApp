import mongoose from "mongoose";

export async function connect(){
    try {
        await mongoose.connect(process.env.MONGODB_URL!);

        const connection = mongoose.connection;
        connection.on("connected" , () => {
            console.log("Mongo DB is Connected");
        })

        connection.on( "error" , (error  )=>{
            console.log("Error " , error);
            
        })

        process.exit(1);

    } catch (error) {
        console.log("DB Connection Error");
        console.log(error);
        
        
    }
}