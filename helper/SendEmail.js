const nodemailer = require('nodemailer');
const env = require('dotenv').config();
async function SendEmail(email,text){
   try {
       const transporter = nodemailer.createTransport({
         service: 'gmail',
         auth: {
           user: process.env.EMAIL,
           pass: process.env.PASSWORD
         }
       });
   
       const mailOptions = {
         from: process.env.EMAIL,
         to: email,
         subject: 'Change Password',
         html: text
       };
       const info = await transporter.sendMail(mailOptions);
       console.log('Email sent:', info.response);
       return true;
     } catch (error) {
       console.error('Email sending failed:', error);
       return false;
     }
}
module.exports = SendEmail;