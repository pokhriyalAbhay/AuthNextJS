import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import {NextRequest,NextResponse} from 'next/server'

connect()
export async function POST(request:NextRequest)
{
    try
    {
        const reqBody = await request.json() // yaha se json ke through data le rahe hain or us saare data ko reqbody mai store kar raha hain  
        const {token} = reqBody // or reqbody  se bhi token le rahe hain 
        console.log(token);
      const user = await User.findOne({ verifyToken: token,verifyTokenExpiry:{$gt: Date.now()}})// yaha pe mongodb ki query laga reha hain ki find karo user ko 
        if(!user){
            
                return NextResponse.json({error: "invalid token"},{status:400})
           
            }
            console.log(user);
            user.iscerifiy = true // yeh teeno hmm fir se set kar rahe hainn 
            user.verifyToken = undefined
            user.verifyTokenExpiry = undefined
            await user.save()
            return NextResponse.json({
                message: "Email verfied sucessfully",
                success: true
            },{status:500})

            

    }
    catch(error:any)
    {
        return NextResponse.json({error: error.message},{status:500})

    }
}