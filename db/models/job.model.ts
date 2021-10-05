import { Schema, model } from 'mongoose';
import { JobApplication } from './job-application.model';

interface Job {
    employeeId: string,
    jobDescription: string,
    skills: (string)[],
    jobTitle: string,
    numberOfWorker?: number,
    numberOfApplication?: number,
    jobApplication: (JobApplication)[] 
};

const JobSchema = new Schema<Job> ({
    employeeId: { type: String, required: true},
    jobDescription: { type: String, required: true},
    skills: { type: [], required: true},
    jobTitle: { type: String, required: true},
    numberOfApplication: { type: Number, required: false},
    numberOfWorker: { type: Number, required: false},
    jobApplication: { type: [], required: false },
})

const JobModel = model<Job>('jobs', JobSchema);

export { Job, JobModel };
