import nodemailer from "nodemailer";
//step1 create transporter i used barvo as the email provider
const transporter = nodemailer.createTransport({
    host:"smtp-relay.brevo.com",
    port:587,
    auth:{
        user:"8807ef001@smtp-brevo.com",
        pass:"02SfZdzsxNWcPwJ4" , 
    
    }
}



)

console.log("Auth Object:", transporter.options.auth);
export const sendWelcomeEmail=async(email)=>{
    console.log(process.env.SMTP_USER);
    console.log(process.env.SMTP_PASS);
    try{
        const logoUrl = "https://i.imgur.com/LqQ2BTf.jpeg"; // Replace with your hosted image URL

        const mailOptions = {
            from:"hussienzoughaib@gmail.com",
            to: email,
            subject: "Welcome to Quantum Code Academy!",
            text: "Welcome to Quantum Code Academy! Let's start your coding journey.",
            html: `
                <div style="text-align: center; font-family: Arial, sans-serif;">
                    <img src="${logoUrl}" alt="Quantum Code Academy Logo" style="width: 150px; height: auto; margin-bottom: 20px;">
                    <h1 style="color: #2c3e50;">Welcome to Quantum Code Academy!</h1>
                    <p style="font-size: 16px; color: #34495e;">
                        We're thrilled to have you on board. Let's start your coding journey and unlock the future of technology together!
                    </p>
                </div>
            `,
        };
    await transporter.sendMail(mailOptions);
    console.log("email sent");
    }
    catch(error){
        console.log(error);
    }
}

export const sendotpemail=async(email,otp)=>{
    try{
        const mailOptions = {
            from:"hussienzoughaib@gmail.com",
            to: email,
            subject: "Account Verification",
        text: `Your OTP is : ${otp}.Verfy your account using it `
       
        };
        await transporter.sendMail(mailOptions);
        console.log("Otp email sent");
    }
    catch(error){
        console.log(error);
    }
}