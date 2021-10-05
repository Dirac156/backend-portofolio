import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { EmployerModel } from "../db/models/employer.model";
import { GenerateToken, SendUserToken } from "../utils/utils";


export const CreateEmployer = async (req:Request, res: Response) => {
    try {
        // verify existing user
        const employer = { ...req.body, user: "EMPLOYER", confirmed: false };

        let existingEmployer = await EmployerModel.findOne({ email: req.body.email });

        if ( existingEmployer ) {
            res.status(200);
            res.send({ message: "USER ALREADY EXIST "});
            return;
        }

        // generate token
        employer.confirmationToken = GenerateToken(employer);
        employer.resetToken = GenerateToken(employer);

        // encrypt password using hash
        bcrypt.hash(employer.password, 8, async (err, hash) => {
            if (!err) {
                employer.password = hash;
                const createdUser = await EmployerModel.create(employer);
                if (createdUser) {
                    SendUserToken(createdUser);
                    const response =  "ROW ADDED";
                    res.status(200);
                    res.send({ message: "ROW ADDED", 'data' : createdUser });
                } else {
                    const response =  "ROW_NOT_ADDED";
                    res.status(400);
                    res.send({ message: "ROW NOT ADDED" });
                }
            } else {
                return res.status(500).json({ message: "SERVER ERROR" })
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500);
        res.send("Internal Error");
    } 





} 