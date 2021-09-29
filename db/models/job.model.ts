import { Schema, model } from 'mongoose';

interface Job {
    employeeId: string,
    jobDescription: string,
    skills: (string)[],
    jobTitle: string,
    numberOfWorker?: number,
    numberOfApplication?: number,
};

const JobSchema = new Schema<Job> ({
    employeeId: { type: String, required: true},
    jobDescription: { type: String, required: true},
    skills: { type: [], required: true},
    jobTitle: { type: String, required: true},
    numberOfApplication: { type: Number, required: false},
    numberOfWorker: { type: Number, required: false},
})

const JobModel = model<Job>('jobs', JobSchema);

export { Job, JobModel };
