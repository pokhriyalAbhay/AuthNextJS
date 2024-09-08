import mongoose from "mongoose";
export async function connect()
{
    try
    {
        await mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection
        connection.on('connected',()=>{
            console.log("mongodb conncected");
            
        })
        connection.on('error',(err)=>{
            console.log('monogdb connection error' +err);
            process.exit()
            
        })

    }
    catch(error)
    {
        console.log("something went wrong");
        console.log(error);
        
        

    }
}