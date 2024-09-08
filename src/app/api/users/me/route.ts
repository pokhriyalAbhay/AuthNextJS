import {connect} from '@/dbConfig/dbConfig'
import { getdatafromtoken } from '@/helpers/getdatafromtoken'
import User from '@/models/userModel'
import {NextRequest,NextResponse} from 'next/server'

connect()
export async function POST(request:NextRequest)
{
    //extract data form token 
   const userid = await getdatafromtoken(request)
  const user =  User.findOne({_id:userid}).select("-password")
   //check if there is no user
   if(!user)
    {
        return NextResponse.json({
            message: "User Found",
            success: true
        })
    }
}