import { v4 } from "uuid";
import { jobOpportunity } from "../db/models/job-opportunity.model.js";

export const createJobOpportunity = async (req, res) => {
    try {
        const { id } = req.session.user;
        const jobDetails = { ...req.body, employerId: id, status: "AVAILABLE", id: v4() }
        if ( jobDetails.skills ) {
            jobDetails.skills = jobDetails.skills.split(' ');
        }
        const newJob = await jobOpportunity.create(jobDetails);
        if (!newJob) {
            return res.status(400).json({ message: 'Job Opportunity was not created'})
        }
        res.status(200).json({ message: "SUCCESFULLY CREATED A JOB OPPORTUNITY", data: newJob})
    } catch(error) {
        console.log(error)
        return res.status(500).json({message: "server error"})
    }
}

export const findJobByEmployer = async (req, res) => {
    try {
        const { id } = req.session.user;
        const jobs = await jobOpportunity.findJobByEmployer(id);
        return res.status(200).json({ message: "SUCCESFULLY FOUND JOB OPPORTUNITIS", data: jobs})
    } catch(error) {
        console.log(error)
        return res.status(500).json({message: "server error"})
    }
}

export const findJobs = async(req, res) => {
    try {
        const jobs = await jobOpportunity.find({});
        return res.status(200).json({ message: "SUCCESFULLY CREATED A JOB OPPORTUNITY", data: jobs})
    } catch(error) {
        console.log(error)
        return res.status(500).json({message: "server error"})
    }
}
