import nodemailer from 'nodemailer';
import Jwt, { Secret } from 'jsonwebtoken';
import jwt_decode from "jwt-decode";
import dotenv from "dotenv";
import { Employer } from "../db/models/employer.model";
import { Worker } from "../db/models/worker-model.model";

dotenv.config();

import { env } from 'process';
import { Request } from 'express';

const SecretKey: Secret = env.JWT_SECURITY_KEY as Secret;

export const RULES = {
    ADMIN: 'ADMIN',
    USER: 'USER',
    DEVElOPPER: 'DEVELOPPER'
};

export const GenerateToken: Function = (user: Employer | Worker ) => {
    const Token = Jwt.sign({
        email: user.email, firstName: user.firstName, lastName: user.lastName
    }, SecretKey,
        { expiresIn: 60 * 60 }
    );
    return Token;
}

export const decodeToken = (req: Request, header: boolean=false, token: boolean | string =true) => { 
  // if (header) return jwt_decode(req?.headers?.authorization?.split(" ")[1]);
  if (token) return jwt_decode(req.params.token);
};

const sendEmail = async (emailOptions: any) => {
    const transporter = await nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: env.EMAIL_ADDRESS,
          pass: env.EMAIL_PASSWORD
        }
      });

    await transporter.sendMail(emailOptions, function(error: any, info: any){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
        transporter.close();
      });;
    
  };

export const SendUserToken = async (clientsDeatils: any ) => {   

    const { email, confirmationToken } = clientsDeatils;

    const mailOptions = {
        from: env.EMAIL_ADDRESS,
        to: email,
        subject: '[IMPORTANT] Confirmer votre address email',
        html: `
            <body>
            Dear user, please use this link <a href="http://localhost:8000/email/validation/${confirmationToken}">click here</a>  to activate your account.
            <a href="http://localhost:8000/email/validation/${confirmationToken}"><button>click here</button></a>
            </body>`
      };
      
    sendEmail(mailOptions); 
}