import User from '@/models/userModel';
import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'
import { Hash } from 'crypto';
export const sendEmail = async ({ email, emailType, userId }:any) => {
    try {
       const hashedToken =  await bcryptjs.hash(userId.toString(),10)
        //TODO configure mail for usage
        if (emailType === "VERIFIY") {
            await User.findByIdAndUpdate(userId,{$set:{verifyToken:hashedToken,
            verifyTokenExpiry:Date.now()+3600000}});
            
        }
        else if(emailType === "RESET")
        {
        await User.findByIdAndUpdate(userId,{$set:{forgotpasswordToken:hashedToken,
                forgotpasswordTokenExpiry:Date.now()+3600000}})

        }
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "d9b9ba80999ba5",
              pass: "0b2dfd9e97e9ef"
            }
          });
        const mailoption =
        {
            from: 'SWAYAM.ai', // sender address
            to: email, // list of receivers
            subject: emailType === 'VERIFY'?"verify your email" : "NIeCer 102: Ethics Review of Health Research", // Subject line
            html: `<h2>Dear ABHAY POKHRIYAL</h2><p>Greeting</p> <p>we are congraulation you on completing the 
            NIE-ICMR-WHO online course NIeCer 102: Ethics Review of Health Research,with a self assessment score of 
            >50% <br>
            <p>Your e-Certificate of course completion is attached as a PDF <a>click here</a></p><br>
            <p>We wish you all the best in your future endeavors</p><br>
            <p>DO NOT REPLY TO THIS MAIL AS IT IS AUTO GENERATED</p><br>
            <p>for any queries write to <a>nieethiscourse@gmail.com</a></p>
            </p>`,
        }
        const mailResponse = await transport.sendMail(mailoption)
        return mailResponse

    }
    catch (error:any) {
        throw new Error(error.message)

    }

}
