/* Required external modules and interfaces */

import { WorkerModel, skillsModel } from "../db/models/worker-model.model.js";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt";
import { GenerateToken, SendUserToken, decodeToken } from "../utils/utils.js";


export const CreateWorker = async ( req, res) => {
    try {
        // we verify an already existing worker
        const worker = {...req.body, user: "WORKER", confirmed: false, id: uuidv4()};
        let existingWorker = await WorkerModel.findOne({ email: req.body.email });

        if (existingWorker) {
            res.status(200);
            res.send({ message: "WORKER ALREADY EXISTS" });
            return;
        }

        // create new skill document for the user if provided.

        let skills;
        
        if ( worker.skills ) { skills = await skillsModel.create(worker.skills)};

        if ( skills ) {
            worker.skills = [ skills ]
        } else {
            worker.skills = []
        }

        // Here we generate a confirmation and reset token
        worker.confirmationToken = GenerateToken(worker);
        worker.resetToken = GenerateToken(worker);

        // Password encryption
        bcrypt.hash(worker.password, bcrypt.genSaltSync(8), async (err, hash) => {
            if(!err) {
                worker.password = hash;
                const createdWorker = await WorkerModel.create(worker);
                if (createdWorker) {
                    SendUserToken(createdWorker, "worker");
                    const response = "WORKER ADDED";
                    res.status(200);
                    res.send({ message: "WORKER ADDED TO THE SYSTEM", 'data' : createdWorker});
                } else {
                    const response = "WORKER NOT ADDED";
                    res.status(400);
                    res.send({ message: "WORKER NOT ADDED TO THE SYSTEM"});
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

export const loginWorker = async (req, res) => {
    try {
        const { password, email } = req.body;
        if ( !password || !email ) {
            return res.status(400).json({message: "Incorrect values"});
        }
        
        let worker = await WorkerModel.findOne({ email: email })
        
        if (!worker) {
            return res.status(401).json({
                status: false,
                message: "Authentication Failed"
            })
        }

        if (!worker.confirmed) {
            return res.status(401).json({
                status: false,
                message: "You need to confirm your email address"
            })
        }
        bcrypt.compare(password, worker.password).then(response => {
            if (!response) {
                console.log("I am here")
                return res.status(401).json({
                    status: false,
                    message: "Authentication Failed"
                })
            }
            req.session.user = {
                id: worker.id,
                user: worker.user
            }

            return res.status(200).json({
                status: true,
                message: "User Authenticated",
                data :worker
            })
        })
    } catch (err) {
        console.log(err);
        res.status(500).json("SERVER_ERROR")
    }
}

export const confirmWorkerEmailAddress = async (req, res) => {
    try{
        // const token = req.params.token;
        const user = decodeToken(req);
        if (user) {
            const userTofind = await WorkerModel.updateOne({ email: user.email }, { confirmed: true });
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

export const GetWorkers = async (req, res ) => {
    try {
        const Users = await WorkerModel.find();
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

export const RejectWorker = (req, res) => {
    try {
        const userId = req.session.user ? req.session.user.id : req.params.id;
    
        // Find the student
        WorkerModel.deleteOne({ id: userId }, function(err) {
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
