import User from '@/Models/user.models';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs'

export const EmailSend = async({email , emailtype , userId } : any ) =>{
    try {

        const HashToken = await bcryptjs.hash(userId.toString() , 10 )

        if ( emailtype === 'VERIFY'){
            await User.findByIdAndUpdate( userId , {
                isVerified : true ,
                verifyToken :  HashToken,
                verifyTokenExpiry : ((Date.now()) + (3600000 * 6))
            })
        }
        else if (emailtype === 'RESET'){
            await User.findByIdAndUpdate( userId , {
                isVerified : true ,
                forgotPasswordToken :  HashToken,
                forgotPasswwordTokenExpiry : ((Date.now()) + (3600000 * 6))
            })
        }

        const  transport = nodemailer.createTransport({
            host : process.env.MAILER_HOST,
            port: process.env.MAILER_PORT || 2525 ,
            auth: {
                user: process.env.MAILER_USER,
                pass: process.env.MAILER_PASS
            }
        } as any  );

            const mailOptions =  {
                from: process.env.ADMIN_EMAIL,
                to: email,
                subject: emailtype === 'VERIFY' ? "Verify your emial Account" : "Rest your Password",
                html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token='${HashToken}'" >Here</a>
                to ${emailtype === 'VERIFY' ? "Verify your emial ": "Reset your Password"} <br>
                or copy paste link in browser  <br> 
                ${process.env.DOMAIN}/verify/${HashToken}</p>`, // html body
                }

            const mailResponse = await transport.sendMail(mailOptions);
            return mailResponse;


    } catch (error : any ) {
        throw new Error(error)
    }
}