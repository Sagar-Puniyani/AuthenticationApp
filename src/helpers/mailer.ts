import nodemail from 'nodemailer';

export const EmailSend = async({email , emailtype , userId } : any ) =>{
    try {
        const nodemailer = require("nodemailer");

        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
                user: "maddison53@ethereal.email",
                pass: "jn7jnAPss4f63QBp6D",
            },
            });

            const mailOptions =  {
                from: "One@gmail.com",
                to: email,
                subject: emailtype === 'VERIFY' ? "Verify your emial Account" : "Rest your Password",
                html: "<b>Hello world?</b>", // html body
                }

            const mailResponse = await transporter.sendMail(mailOptions);
            return mailResponse;


    } catch (error : any ) {
        throw new Error(error)
    }
}