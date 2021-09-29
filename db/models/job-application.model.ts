import { Schema, model } from 'mongoose';

interface JobApplication {
    jobId: string,
    document: string,
    workerId: string,
}

const JobApplicationSchema = new Schema<JobApplication> ({
    jobId: { type: String, required: true},
    workerId: { type: String, required: true},
    document: { type: String, required: true},
});

const JobApplicationModel = model<JobApplication>('job_application', JobApplicationSchema);

export { JobApplication, JobApplicationModel };
