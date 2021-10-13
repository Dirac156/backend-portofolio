import { Schema, model } from 'mongoose';
import { JobApplication } from './job-application.model';

const JobSchema = new Schema ({
    employeeId: { type: String, required: true},
    jobDescription: { type: String, required: true},
    skills: { type: [], required: true},
    jobTitle: { type: String, required: true},
    numberOfApplication: { type: Number, required: false},
    numberOfWorker: { type: Number, required: false},
    jobApplication: { type: [], required: false },
})

const JobModel = model('jobs', JobSchema);

export { JobModel };
