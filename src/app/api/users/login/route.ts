import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import {NextRequest,NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken"

connect()
export async function POST(request:NextRequest)
{
    try
    {
        const reqBody = await request.json() // yaha se json ke through data le rahe hain or us saare data ko reqbody mai store kar raha hain  
        const {email,password} = reqBody // or reqbody  se bhi email,password le rahe hain 
        console.log(reqBody);
       const user = await User.findOne({email})
       if(!user)
        {
            return NextResponse.json({error: "user doesn't exsit"},{status:400})

        }
        console.log("user exsit");
       const validpassword = await bcryptjs.compare(password,user.password)
       if(!validpassword)
        {
            return NextResponse.json({error: "check your condential"},{status:400})

        }
        const tokendata = {
            id: user._id,
            username:user.username,
            email:user.email
        }
       const token =  jwt.sign(tokendata,process.env.TOKEN_SECRET!,{expiresIn:'id'})
      const reponse =  NextResponse.json({
        message: "Logged in success",
        success: true
       })
       reponse.cookies.set("token",token,{httpOnly:true})
       return reponse
        

    }
    catch(error:any)
    {
        return NextResponse.json({error: error.message},{status:500})
        

    }
}
