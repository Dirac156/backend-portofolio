import { JobModel } from "../db/models/job-application-model.model.js";
import bcrypt from "bcrypt";
import { GenerateToken, sendUserToken } from "../utils/utils";


export const CreateJob = async ( req, res ) => {
    try {
        // confirm if job already exists
        const worker = {...req.body, user: "JOB", confirmed: false};
        let existingJob = await JobModel.findOne({ email: req.body.email})

        if (existingJob) {
            res.status(200);
            res.send({ message: "JOB ALREADY EXISTS"});
            return;
        }

        // Generate a confirmation and reset token
        job.confrimationToken = GenerateToken(job);
        job.resetToken = GenerateToken(job);

        // Password encryption
        bcrypt.hash(job.password, 8, async (err, hash) => {
            if(!err) {
                job.password = hash;
                const createdJob = await JobModel.create(job);
                if (createdJob) {
                    SendUserToken(createdJob);
                    const response = "JOB ADDED";
                    res.status(200);
                    res.send({ message: "NEW JOB ADDED TO THE SYSTEM", 'data' : createdJob});
                } else {
                    return res.status(500).json({ message: "SERVER ERROR" })
                }
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500);
        res.send("Internal Error");
    }
}