import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import {NextRequest,NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs' // use for hashing 
import { sendEmail } from '@/helpers/mailer'
connect()
export async function POST(request: NextRequest){
    try
    {
        const reqBody = await request.json()
        const{username,email,password} = reqBody
        console.log(reqBody);
      const user =   await User.findOne({email})
      if(user)
        {
            return NextResponse.json(({error: "user already exits"}),{status:400})
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedpassword = await bcryptjs.hash(password,salt)
        const newUser = new User({
            username,
            email,
            password: hashedpassword
        })
        const savedUser = await newUser.save()
        console.log(savedUser);
        //send verification email 
        await sendEmail({email, emailType: "VERIFIY",userId:savedUser._id})
        return NextResponse.json({
            mesaage: "user register sucessfully",
            success: true,
            savedUser
        })
        

        

    }
    catch(error:any)
    {
        return NextResponse.json((error.message),{status:500})

    }

}