import { JobApplicationModel } from "../db/models/job.model.js";

export const createJobApplication = async(req, res) => {
    try{
        const applicationDetails = { ...req.body, candidateId: req.session.user.id }
        const newApplication = JobApplicationModel.create(applicationDetails);

        if (newApplication) {
            return res.status(200).json({ message: "You have successfully apply for the job"});
        } else {
            return res.status(200).json({ message: "Your application was not send"});
        }

    }catch(error){
        console.log(error);
        return res.status(500).json({ message: "server error" });
    }
}


export const findAllApplications = async(req, res) => {
    try{
        const documents = JobApplicationModel.find();
        return res.status(200).json({ message: "Data founds", data: documents })
    }catch(error){
        console.log(error);
        return res.status(500).json({ message: "server error" });
    }
} 

export const findCandidatesProfil = async(req, res) => {
    try{
        const documents = JobApplicationModel.FindCandidatesProfil(req.params.jobId);
        return res.status(200).json({ message: "Data founds", data: documents })
    }catch(error){
        console.log(error);
        return res.status(500).json({ message: "server error" });
    }
}

export const findCandidateProfilByStatus = async(req, res) => {
    try{
        const { jobId, status } = req.body;
        if ( !jobId || !status) {
            return res.status(400).json({ message: "Incorrect inputs "});
        }
        const document = JobApplicationModel.FindCandidateByStatus(jobId, status);
        return res.status(200).json({ message: "Data founds", data: document })
    }catch(error){
        console.log(error);
        return res.status(500).json({ message: "server error" });
    }
}

export const findApplicationsForJob = async(req, res) => {
    try{
        const documents = JobApplicationModel.FindApplicationsForJob(req.params.jobId);
        return res.status(200).json({ message: "Data founds", data: documents })
    }catch(error){
        console.log(error);
        return res.status(500).json({ message: "server error" });
    }
}

export const CandidateApplicationHistory = async(req, res) => {
    try{
        const document = JobApplicationModel.SeeApplicationHistory(req.session.user.id);
        return res.status(200).json({ message: "Data founds", data: document })
    }catch(error){
        console.log(error);
        return res.status(500).json({ message: "server error" });
    }
}

export const selectCandidate = async(req, res) => {
    try {
        const candidates = req.body;
        
        const result = JobApplicationModel.selectCandidate(candidates, req.params.jobId);

        if (result === 1) {
            return res.status(200).json({ message: "success"})
        } else {
            return res.status(200).json({ message: "failed"})
        }
    }catch(error){
        console.log(error);
        return res.status(500).json({ message: "server error" });
    }
}