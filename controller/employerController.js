import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import { EmployerModel } from "../db/models/employer.model.js";
import { GenerateToken, SendUserToken, decodeToken } from "../utils/utils.js";

dotenv.config();

export const CreateEmployer = async (req, res) => {
    try {
        // verify existing user
        const employer = { ...req.body, user: "EMPLOYER", confirmed: false, id: uuidv4() };

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
        bcrypt.hash(employer.password, bcrypt.genSaltSync(8), async (err, hash) => {
            if (!err) {
                employer.password = hash;
                const createdUser = await EmployerModel.create(employer);
                if (createdUser) {
                    SendUserToken(createdUser);
                    const response =  "ROW ADDED";
                    res.status(200);
                    res.send({ message: "ROW ADDED", data : createdUser });
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
    };
} 

export const login = async (req, res) => {
    try {
        const { password, email } = req.body;
        let employer = await EmployerModel.findOne({ where: { email: email } })
        if (!employer) {
            return res.status(401).json({
                status: false,
                message: "Authentication Failed"
            })
        }

        if (!employer.confirmed) {
            return res.status(401).json({
                status: false,
                message: "You need to confirm your email address"
            })
        }
        bcrypt.compare(password, employer.password).then(response => {
            if (!response) {
                return res.status(401).json({
                    status: false,
                    message: "Authentication Failed"
                })
            }
            req.session.user = {
                id: employer.id
            }

            return res.status(200).json({
                status: true,
                message: "User Authenticated",
                data :employer
            })
        })
    } catch (err) {
        console.log(err);
        res.status(500).json("SERVER_ERROR")
    }
}

export const confirmEmployerEmailAddress = async (req, res) => {
    try{
        // const token = req.params.token;
        const user = decodeToken(req);
        if (user) {
            const userTofind = await EmployerModel.updateOne({ email: user.email }, { confirmed: true });
            if (userTofind.modifiedCount === 0 ) {
                res.status(400).json({ message: "EMAIL ADDRESS NOT CONFIRMED" });
            } else {
                res.status(200).json({ message: "EMAIL ADDRESS CONFIRMED" });
            }
        } else {
            res.send('<body>Error</body>')
        }
    }catch(error) {
        console.log(error)
        res.status(500);
        res.send("SERVER ERROR");
    }
}

export const GetEmployers = async (req, res ) => {
    try {
        const Users = await EmployerModel.find();
        if (Users.length) {
            const response = { message: "Data found" };
            res.status(200);
            res.send({ ...response, 'count': Users.length, 'data' : Users });
        } else {
            const response = { message: "Data not found" };
            res.status(400);
            res.send({ ...response });
        }
    } catch(error) {
        const response = "Server error";
        res.status(500);
        res.send(response);
        console.log(error);
    }
}

export const RejectEmployer = (req, res) => {
    try {
        const userId = req.session.user ? req.session.user.id : req.params.id;

        console.log(userId);
        // Find the student
        EmployerModel.deleteOne({ id: userId }, function(err) {
            if (!err) {
                res.status(200).json({ message: "Account succesfuly deleted"})
            }
            else {
                res.status(400).json({ message: "Account was not deleted" })
            }
        });
    } catch(error) {
        const response = "Server error";
        res.status(500);
        res.send(response);
        console.log(error);
    }
};