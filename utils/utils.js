import nodemailer from 'nodemailer';
import Jwt from 'jsonwebtoken';
import jwt_decode from "jwt-decode";
import dotenv from "dotenv";

dotenv.config();

import { env } from 'process';

const SecretKey = env.JWT_SECURITY_KEY;

export const GenerateToken = (user ) => {
    const Token = Jwt.sign({
        email: user.email, firstName: user.firstName, lastName: user.lastName
    }, SecretKey,
        { expiresIn: 60 * 60 }
    );
    return Token;
}

export const decodeToken = (req, header=false, token =true) => { 
  // if (header) return jwt_decode(req?.headers?.authorization?.split(" ")[1]);
  if (token) return jwt_decode(req.params.token);
};

const sendEmail = async (emailOptions) => {
    const transporter = await nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: env.EMAIL_ADDRESS,
          pass: env.EMAIL_PASSWORD
        }
      });

    await transporter.sendMail(emailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
        transporter.close();
      });;
    
  };

export const SendUserToken = async (clientsDeatils, typeOfUser ) => {   

    const { email, confirmationToken } = clientsDeatils;

    const mailOptions = {
        from: env.EMAIL_ADDRESS,
        to: email,
        subject: '[IMPORTANT] Confirmer votre address email',
        html: `
            <body>
            Dear user, please use this link <a href="http://localhost:8000/${typeOfUser}/email/validation/${confirmationToken}">click here</a>  to activate your account.

            <a href="http://localhost:8000/${typeOfUser}/email/validation/${confirmationToken}"><button>click here</button></a>
            </body>`
      };
      
    sendEmail(mailOptions); 
}
