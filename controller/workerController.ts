/* Required external modules and interfaces */

import { Request, Response } from "express";
import { WorkerModel, skillsModel } from "../db/models/worker-model.model";
import bcrypt from "bcrypt";
import { GenerateToken, SendUserToken } from "../utils/utils";


export const CreateWorker = async ( req: Request, res: Response) => {
    try {
        // we verify an already existing worker
        const worker = {...req.body, user: "WORKER", confirmed: false};
        let existingWorker = await WorkerModel.findOne({ email: req.body.email });

        if (existingWorker) {
            res.status(200);
            res.send({ message: "WORKER ALREADY EXISTS" });
            return;
        }

        const skills = await skillsModel.create(worker.skills);

        if ( skills ) {
            worker.skills = [ skills ]
        } else {
            worker.skills = []
        }

        // Here we generate a confirmation and reset token
        worker.confirmationToken = GenerateToken(worker);
        worker.resetToken = GenerateToken(worker);

        // Password encryption
        bcrypt.hash(worker.password, 8, async (err, hash) => {
            if(!err) {
                worker.password = hash;
                const createdWorker = await WorkerModel.create(worker);
                if (createdWorker) {
                    SendUserToken(createdWorker);
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