import mongoose from "mongoose";
import { WorkerModel } from "./worker-model.model.js";
import { jobOpportunity } from "./job-opportunity.model.js";

const JobApplicationSchema = new mongoose.Schema({
    id: { type: String, required: true },
    candidateId: { type: String, required: true },
    jobId: { type: String, required: true },
    coverLetter: { type: String, required: false },
    status: { type: String, required: false }
});

JobApplicationSchema.statics.FindApplicationsForJob = async (jobId) => {
    const documents = await this.find({ jobId: jobId });
    return documents
}

JobApplicationSchema.statics.FindCandidatesProfil = async (jobId) => {
    const applications = await this.find({ jobId: jobId });
    let candidates = applications.map((application) => {
        const data = await WorkerModel.findOne({ id: application.candidateId })
        return data;
    });

    return candidates;
}

JobApplicationSchema.statics.FindCandidateByStatus = async (jobId, status) => {
    const applications = await this.find({ jobId: jobId, status: status });
    let candidates = applications.map((application) => {
        const data = await WorkerModel.findOne({ id: application.candidateId })
        return data;
    });
    return candidates;
}

JobApplicationSchema.statics.SeeApplicationHistory = (candidateId) => {
    const applications = await this.find({ candidateId: candidateId });
    return applications;
}

JobApplicationModel.statics.selectCandidate = async(candidateList, jobId) => {
    try {
        const applications = await this.find();
        candidateList.map((candidateId) => {
            this.updateOne({ candidateId: candidateId}, { status: "SELECTED"});
        })
        applications.map((application) => {
            if (!candidateList.includes(application.candidateId)){
                application.statsu = "REJECTED";
                application.save();
            }
        })

        jobOpportunity.updateOne({ id: jobId}, {status: "CLOSED"})

        return 1;

    }catch(error){
        return -1
    }
}


export const JobApplicationModel = new mongoose.model("jobApplications", JobApplicationSchema);

